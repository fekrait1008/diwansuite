/**
 * scripts/check-text-integrity.mjs
 *
 * Scans source and (optionally) dist files for:
 *   - Unicode replacement characters: U+FFFD (U+FFFD, i.e. \u{FFFD}) and U+FFFx sequences
 *   - Mojibake patterns from mis-decoded UTF-8 Arabic text
 *
 * Exit code 1 if any replacement characters are found.
 * Mojibake patterns emit warnings (non-fatal) because some patterns
 * like Ø and Ù are ambiguous — they are only errors when clearly garbled.
 *
 * Usage:
 *   node scripts/check-text-integrity.mjs
 *   node scripts/check-text-integrity.mjs --include-dist
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join, extname, relative } from 'path'

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '')
const INCLUDE_DIST = process.argv.includes('--include-dist')

// ---------------------------------------------------------------------------
// File extensions to check
// ---------------------------------------------------------------------------

const SOURCE_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.mjs', '.cjs',
  '.html', '.css', '.json', '.md', '.php', '.txt',
])

const DIST_EXTENSIONS = new Set([
  '.html', '.js', '.css', '.json',
])

// ---------------------------------------------------------------------------
// Directories to scan
// ---------------------------------------------------------------------------

const SOURCE_DIRS = ['src', 'api', 'public', 'scripts'].map(d => join(ROOT, d))
const DIST_DIRS   = INCLUDE_DIST ? [join(ROOT, 'dist')] : []

// Directories to always skip (node_modules, .git, dist when not opted-in)
const SKIP_DIRS = new Set([
  join(ROOT, 'node_modules'),
  join(ROOT, '.git'),
  join(ROOT, 'dist'),  // removed from skip if INCLUDE_DIST
])

if (INCLUDE_DIST) {
  SKIP_DIRS.delete(join(ROOT, 'dist'))
}

// ---------------------------------------------------------------------------
// Patterns
// ---------------------------------------------------------------------------

/** U+FFFD replacement character — always a hard error */
const REPLACEMENT_CHAR  = '\uFFFD'
const REPLACEMENT_CHAR2 = '\uFFFD\uFFFD'

/**
 * Mojibake patterns that appear when UTF-8 Arabic text is decoded as
 * ISO-8859-1 / Windows-1252 and then re-encoded. These are warnings,
 * not hard errors, because single occurrences can be legitimate.
 *
 * Each pattern includes a minimum run length to reduce false positives:
 * a lone 'Ã' can appear in French text but 'Ã Ã' is very likely mojibake.
 */
const MOJIBAKE_PATTERNS = [
  // Arabic decoded as Latin-1: common sequences
  { pattern: /Ã[\u0080-\u00BF]{2,}/u,  label: 'Arabic mojibake (Ã + continuation bytes)' },
  { pattern: /Ù[\u0080-\u009F]/u,       label: 'Arabic mojibake (Ù + continuation)' },
  { pattern: /Ø[\u0080-\u00BF]/u,       label: 'Arabic mojibake (Ø + continuation)' },
  // Double-encoded UTF-8 sequences (UTF-8 of UTF-8)
  { pattern: /Ã\u00A2Ã\u00A2/u,         label: 'Double-encoded UTF-8' },
  { pattern: /â\u0080\u0099/u,          label: 'Smart-quote mojibake (U+2019 mis-decoded)' },
  { pattern: /â\u0080\u009C/u,          label: 'Smart-quote mojibake (U+201C mis-decoded)' },
  { pattern: /â\u0080\u009D/u,          label: 'Smart-quote mojibake (U+201D mis-decoded)' },
]

// ---------------------------------------------------------------------------
// Scanner
// ---------------------------------------------------------------------------

let errors   = 0
let warnings = 0
const errorLines   = []
const warningLines = []

function scanFile(filePath, allowedExtensions) {
  const ext = extname(filePath).toLowerCase()
  if (!allowedExtensions.has(ext)) return

  let content
  try {
    content = readFileSync(filePath, 'utf8')
  } catch {
    return // Binary or unreadable — skip
  }

  const lines = content.split('\n')
  const rel   = relative(ROOT, filePath)

  lines.forEach((line, i) => {
    const lineNum = i + 1

    // Hard error: replacement character
    if (line.includes(REPLACEMENT_CHAR)) {
      errors++
      const snippet = line.trim().slice(0, 120)
      errorLines.push(`  ERROR  ${rel}:${lineNum}  →  ${snippet}`)
    }

    // Warning: mojibake patterns
    for (const { pattern, label } of MOJIBAKE_PATTERNS) {
      if (pattern.test(line)) {
        warnings++
        const snippet = line.trim().slice(0, 120)
        warningLines.push(`  WARN   ${rel}:${lineNum}  [${label}]  →  ${snippet}`)
        break // one warning per line is enough
      }
    }
  })
}

function scanDir(dirPath, allowedExtensions) {
  if (!existsSync(dirPath)) return

  let entries
  try {
    entries = readdirSync(dirPath)
  } catch {
    return
  }

  for (const entry of entries) {
    const full = join(dirPath, entry)
    if (SKIP_DIRS.has(full)) continue

    let stat
    try { stat = statSync(full) } catch { continue }

    if (stat.isDirectory()) {
      scanDir(full, allowedExtensions)
    } else if (stat.isFile()) {
      scanFile(full, allowedExtensions)
    }
  }
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

console.log(`[check:text] Scanning source files in: ${SOURCE_DIRS.map(d => relative(ROOT, d)).join(', ')}`)
for (const dir of SOURCE_DIRS) {
  scanDir(dir, SOURCE_EXTENSIONS)
}

if (INCLUDE_DIST) {
  console.log(`[check:text] Scanning dist files in: ${DIST_DIRS.map(d => relative(ROOT, d)).join(', ')}`)
  for (const dir of DIST_DIRS) {
    scanDir(dir, DIST_EXTENSIONS)
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

if (warningLines.length > 0) {
  console.warn('\n[check:text] WARNINGS (possible mojibake — review manually):')
  warningLines.forEach(l => console.warn(l))
}

if (errorLines.length > 0) {
  console.error('\n[check:text] ERRORS (replacement character U+FFFD found):')
  errorLines.forEach(l => console.error(l))
  console.error(`\n[check:text] FAILED: ${errors} error(s), ${warnings} warning(s)`)
  process.exit(1)
}

if (warnings > 0) {
  console.warn(`\n[check:text] PASSED with ${warnings} warning(s) — review warnings above.`)
} else {
  console.log('[check:text] PASSED — no replacement characters or mojibake patterns found.')
}
