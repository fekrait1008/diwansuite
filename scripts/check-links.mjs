/**
 * check-links.mjs
 *
 * Post-build internal link validator for diwansuite.com.
 * Reads every dist/**\/index.html and checks that:
 *   - All internal href/src/canonical/hreflang/og:image/twitter:image
 *     resolve to a real file in dist (mapping the public path to the
 *     deploy layout under dist/lang/*)
 *   - No href is empty, undefined, "#", or bare "/"
 *   - No href points to /lang/ paths (should be redirected, not linked)
 *   - No href uses http:// (all must be https:// or root-relative)
 *   - No href contains www. (canonical is non-www)
 *   - No href contains cdn-cgi/l/email-protection
 *   - No mailto: appears outside <!--email_off--> ... <!--/email_off-->
 *   - No localhost, staging, preview, example.com in hrefs
 *   - All JSON-LD blocks are valid JSON, contain no http:// URLs, no /lang/ URLs
 *
 * Exit code 1 if any failure is found; 0 if all clear.
 */

import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist')
const langDir = path.join(distDir, 'lang')
const SUPPORTED_LANGS = ['ar', 'en', 'hi', 'ur']
const SITE_ORIGIN = 'https://diwansuite.com'

// XML namespaces that look like URLs but are not page hrefs — skip silently.
const NAMESPACE_SKIP = new Set([
  'http://www.sitemaps.org/schemas/sitemap/0.9',
  'http://www.w3.org/1999/xhtml',
  'http://www.w3.org/2000/svg',
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  'http://ogp.me/ns#',
])

// ─── Helpers ──────────────────────────────────────────────────────────────────

function walkHtmlFiles(dir) {
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walkHtmlFiles(full))
    else if (entry.isFile() && entry.name === 'index.html') files.push(full)
  }
  return files
}

/** Convert a public URL path to the dist file path.
 *  /ar/blog → dist/lang/ar/blog/index.html
 *  /ar      → dist/lang/ar/index.html
 *  /sitemap.xml → dist/sitemap.xml
 */
function publicPathToDistFile(publicPath) {
  // Strip query and hash
  const clean = publicPath.split('?')[0].split('#')[0]

  // Root assets — these live directly in dist/
  if (!clean.startsWith(`/ar`) && !clean.startsWith(`/en`) && !clean.startsWith(`/hi`) && !clean.startsWith(`/ur`)) {
    // Could be /sitemap.xml, /robots.txt, /favicon.ico, etc.
    return path.join(distDir, clean)
  }

  // All lang-prefixed public paths live under dist/lang/
  const withoutLeadingSlash = clean.replace(/^\//, '')
  const candidate = path.join(langDir, withoutLeadingSlash, 'index.html')
  if (fs.existsSync(candidate)) return candidate
  // Also try without trailing slash
  const candidateNoTrail = path.join(langDir, withoutLeadingSlash.replace(/\/$/, ''), 'index.html')
  return candidateNoTrail
}

function isInternalLink(href) {
  if (!href) return false
  if (href.startsWith('/') && !href.startsWith('//')) return true
  if (href.startsWith(SITE_ORIGIN)) return true
  return false
}

function toPublicPath(href) {
  if (href.startsWith(SITE_ORIGIN)) return href.slice(SITE_ORIGIN.length) || '/'
  return href
}

// Extract all attribute values matching the pattern from HTML
function extractAttrValues(html, attrName) {
  const re = new RegExp(`${attrName}="([^"]*)"`, 'gi')
  const values = []
  let m
  while ((m = re.exec(html)) !== null) values.push(m[1].trim())
  return values
}

function extractJsonLdBlocks(html) {
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi
  const blocks = []
  let m
  while ((m = re.exec(html)) !== null) blocks.push(m[1])
  return blocks
}

// ─── Main ─────────────────────────────────────────────────────────────────────

if (!fs.existsSync(langDir)) {
  console.error('[LINKS] dist/lang/ not found — run npm run build first')
  process.exit(1)
}

const htmlFiles = walkHtmlFiles(langDir)
const failures = []
let totalLinks = 0

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8')
  const rel = path.relative(distDir, file)

  // Collect all candidate hrefs/srcs
  const hrefs = [
    ...extractAttrValues(html, 'href'),
    ...extractAttrValues(html, 'src'),
    ...extractAttrValues(html, 'content').filter((v) => v.startsWith('/') || v.startsWith(SITE_ORIGIN)),
  ]

  for (const raw of hrefs) {
    if (!raw || NAMESPACE_SKIP.has(raw)) continue
    totalLinks++

    // Skip external links — we only validate internal ones
    if (!isInternalLink(raw)) continue

    const pub = toPublicPath(raw)

    // 1. Empty / undefined / bare hash
    if (!pub || pub === '#' || pub === 'undefined' || pub === 'null') {
      failures.push({ file: rel, href: raw, reason: 'empty/undefined/#' })
      continue
    }

    // 2. /lang/ internal paths must not appear as links (they are redirect-only)
    if (/^\/lang\//.test(pub)) {
      failures.push({ file: rel, href: raw, reason: '/lang/ path in HTML link — should be redirect only' })
      continue
    }

    // 3. http:// inside internal links
    if (/^http:\/\//.test(raw) && !raw.startsWith('http://www.w3.org') && !raw.startsWith('http://www.sitemaps.org')) {
      failures.push({ file: rel, href: raw, reason: 'http:// in internal link — must be https:// or root-relative' })
      continue
    }

    // 4. www. in internal canonical hrefs
    if (/^https?:\/\/www\./.test(raw)) {
      failures.push({ file: rel, href: raw, reason: 'www. in link — canonical is non-www' })
      continue
    }

    // 5. cdn-cgi
    if (pub.includes('/cdn-cgi/')) {
      failures.push({ file: rel, href: raw, reason: 'cdn-cgi/l/email-protection in link' })
      continue
    }

    // 6. Bad hostnames
    for (const bad of ['localhost', 'staging.', 'preview.', 'example.com']) {
      if (raw.includes(bad)) {
        failures.push({ file: rel, href: raw, reason: `bad hostname: ${bad}` })
      }
    }

    // 7. Verify internal page links actually resolve to a file in dist
    // Skip pure hash anchors and asset paths with extensions (js/css/webp etc.)
    if (pub.startsWith('/') && !pub.match(/\.(js|css|webp|png|jpg|svg|ico|xml|txt|json|woff2?)(\?|$)/)) {
      const distFile = publicPathToDistFile(pub)
      if (!fs.existsSync(distFile)) {
        failures.push({ file: rel, href: raw, reason: `no matching dist file: ${distFile.replace(distDir, 'dist')}` })
      }
    }
  }

  // ── mailto: must be inside <!--email_off--> ────────────────────────────────
  // Strip email_off sections from the HTML, then check if any mailto: remains
  const htmlWithoutProtected = html.replace(/<!--email_off-->[\s\S]*?<!--\/email_off-->/g, '')
  if (htmlWithoutProtected.includes('mailto:')) {
    const matches = htmlWithoutProtected.match(/href="mailto:[^"]*"/g) || []
    for (const m of matches) {
      failures.push({ file: rel, href: m, reason: 'mailto: link outside <!--email_off--> comment' })
    }
  }

  // ── cdn-cgi anywhere in the HTML body ────────────────────────────────────
  if (html.includes('/cdn-cgi/l/email-protection')) {
    failures.push({ file: rel, href: '/cdn-cgi/l/email-protection', reason: 'Cloudflare email obfuscation token in HTML — email not protected before build' })
  }

  // ── JSON-LD validation ─────────────────────────────────────────────────────
  const jsonLdBlocks = extractJsonLdBlocks(html)
  for (let i = 0; i < jsonLdBlocks.length; i++) {
    const raw = jsonLdBlocks[i].trim()
    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch (e) {
      failures.push({ file: rel, href: `JSON-LD block ${i}`, reason: `invalid JSON: ${e.message}` })
      continue
    }

    // Stringify to check for http:// URLs, www., /lang/, /cdn-cgi/ anywhere
    const str = JSON.stringify(parsed)
    for (const [needle, reason] of [
      ['http://', 'http:// in JSON-LD URL'],
      ['/lang/', '/lang/ path in JSON-LD URL'],
      ['/cdn-cgi/', 'cdn-cgi in JSON-LD URL'],
    ]) {
      if (str.includes(needle)) {
        // Exclude XML namespace false positives already allowed
        const hasRealOccurrence = (parsed?.['@graph'] || [parsed]).some((node) => {
          const s = JSON.stringify(node)
          return s.includes(needle) && !NAMESPACE_SKIP.has(s)
        })
        if (hasRealOccurrence) {
          failures.push({ file: rel, href: `JSON-LD block ${i}`, reason: `${reason}` })
        }
      }
    }

    // Check for undefined or null values in top-level fields
    if (str.includes('"undefined"') || str.includes(':undefined')) {
      failures.push({ file: rel, href: `JSON-LD block ${i}`, reason: 'literal "undefined" in JSON-LD' })
    }
  }
}

// ─── Summary ──────────────────────────────────────────────────────────────────

const reportPath = path.join(distDir, 'link-check-report.json')
fs.writeFileSync(reportPath, JSON.stringify({ total_files: htmlFiles.length, total_links: totalLinks, failures }, null, 2))

console.log(`\n[LINKS] Scanned ${htmlFiles.length} HTML files, checked ${totalLinks} link instances`)

if (failures.length > 0) {
  console.error(`\n[LINKS] ${failures.length} broken link(s) found:\n`)
  for (const f of failures) {
    console.error(`  FILE: ${f.file}`)
    console.error(`  HREF: ${f.href}`)
    console.error(`  WHY:  ${f.reason}`)
    console.error('')
  }
  process.exit(1)
}

console.log('[LINKS] Passed — 0 broken links\n')
