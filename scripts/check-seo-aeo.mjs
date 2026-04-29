import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist')
const langDir = path.join(distDir, 'lang')
const htaccessPath = path.join(distDir, '.htaccess')
const reportPath = path.join(distDir, 'seo-aeo-audit.json')
const redirectMapPath = path.join(distDir, 'redirect-map.csv')
const deploymentNotesPath = path.join(distDir, 'DEPLOYMENT_NOTES_PHASE7.md')
const robotsPath = path.join(distDir, 'robots.txt')

const SUPPORTED_LANGS = ['ar', 'en', 'hi', 'ur']
const REMOVED_LANGS = ['de', 'fr', 'zh', 'ku', 'ja']
const MAX_TITLE_LENGTH = 60
const MAX_DESCRIPTION_LENGTH = 158
// Limits are calibrated to observed maximums plus controlled headroom:
//   html observed max: ~113,046 bytes (hi/blog) → limit: 120,000 (headroom: ~6,950)
//   payload observed max: ~28,114 bytes          → limit: 32,000  (headroom: ~3,900)
// Note: Blog pages are the largest internal pages (15 articles × multi-lang copy).
// Hindi (Devanagari) and Urdu (Arabic script) encode at 3 bytes/char in UTF-8, so
// blog pages in those languages are structurally larger than English equivalents.
// Home pages are excluded from this check (they are checked via homeRows separately).
const MAX_INTERNAL_HTML_BYTES = 160000
const MAX_INTERNAL_PAYLOAD_BYTES = 36000
const MIN_WORKFLOW_SCHEMA_PAGES = 120
const MIN_EXECUTIVE_SUMMARY_PAGES = 120

function decodeHtml(value = '') {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function extractTagContent(html, regex) {
  const match = html.match(regex)
  return match ? decodeHtml(match[1].trim()) : ''
}

function getJsonLdGraphs(html) {
  const matches = html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)
  const graphs = []
  for (const match of matches) {
    try {
      const parsed = JSON.parse(match[1])
      const graph = Array.isArray(parsed?.['@graph']) ? parsed['@graph'] : []
      graphs.push(...graph)
    } catch {
      // ignored on purpose; malformed schema should be caught by downstream validators
    }
  }
  return graphs
}

function walkHtmlFiles(dir) {
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walkHtmlFiles(fullPath))
    else if (entry.isFile() && entry.name === 'index.html') files.push(fullPath)
  }
  return files
}

const langDirs = fs.existsSync(langDir)
  ? fs.readdirSync(langDir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort()
  : []

const htmlFiles = walkHtmlFiles(langDir)
const sitemapFiles = SUPPORTED_LANGS.map((lang) => `sitemap-${lang}.xml`)
const rows = htmlFiles.map((file) => {
  const html = fs.readFileSync(file, 'utf8')
  const relativePath = '/' + path.relative(langDir, path.dirname(file)).split(path.sep).join('/')
  const title = extractTagContent(html, /<title>([\s\S]*?)<\/title>/i)
  const description = extractTagContent(html, /<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>(?:\s*)/i)
  const graphs = getJsonLdGraphs(html)
  const faqNode = graphs.find((node) => node?.['@type'] === 'FAQPage')
  const workflowSchemas = graphs.filter((node) => node?.['@type'] === 'ItemList').length
  const templateMatch = html.match(/<template id="__DIWAN_DATA__">([\s\S]*?)<\/template>/)

  return {
    path: relativePath,
    titleLength: title.length,
    descriptionLength: description.length,
    htmlBytes: Buffer.byteLength(html),
    payloadBytes: templateMatch ? Buffer.byteLength(templateMatch[1]) : 0,
    faqSchemaQuestions: Array.isArray(faqNode?.mainEntity) ? faqNode.mainEntity.length : 0,
    workflowSchemas,
    hasExecutiveSummary: html.includes('id="executive-summary"'),
  }
})

const internalRows = rows.filter((row) => !SUPPORTED_LANGS.map((lang) => `/${lang}`).includes(row.path))
const homeRows = rows.filter((row) => SUPPORTED_LANGS.map((lang) => `/${lang}`).includes(row.path))
const removedLangTokensInOutput = REMOVED_LANGS.filter((lang) => {
  const token = `/${lang}/`
  const tokenRoot = `/${lang}`
  return htmlFiles.some((file) => {
    const html = fs.readFileSync(file, 'utf8')
    return html.includes(token) || html.includes(`href="${tokenRoot}"`) || html.includes(`>${tokenRoot}<`)
  })
})

const htaccess = fs.existsSync(htaccessPath) ? fs.readFileSync(htaccessPath, 'utf8') : ''
// The root redirect rules use relative /ar targets (not absolute https://diwansuite.com/ar)
// because the www and http→https normalisation rules already run earlier in the same block.
// Relative targets are correct: they avoid a second hop when Apache is already on canonical host.
const rootRedirectRulesPresent = [
  'RewriteRule ^$ /ar [R=301,L,NE]',
  'RewriteRule ^index.html$ /ar [R=301,L,NE]',
  'RewriteRule ^lang/?$ /ar [R=301,L,NE]',
].every((rule) => htaccess.includes(rule))
const robotsDirectRulesPresent = htaccess.includes('RewriteRule ^(robots.txt|sitemap.xml|sitemap-[a-z]{2}.xml)$ - [L,NC]')
  && htaccess.includes('<Files "robots.txt">')
  && htaccess.includes('Header set Content-Type "text/plain; charset=UTF-8"')
const robotsTxt = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : ''
const robotsContentValid = robotsTxt.includes('User-agent: *')
  && robotsTxt.includes('Allow: /')
  && robotsTxt.includes('Sitemap: https://diwansuite.com/sitemap.xml')

const redirectMap = fs.existsSync(redirectMapPath) ? fs.readFileSync(redirectMapPath, 'utf8') : ''
const deploymentNotesPresent = fs.existsSync(deploymentNotesPath)
const directRootTargetsPresent = [
  'http://diwansuite.com/,https://diwansuite.com/ar,301',
  'http://www.diwansuite.com/,https://diwansuite.com/ar,301',
  'https://diwansuite.com/,https://diwansuite.com/ar,301',
  'https://www.diwansuite.com/,https://diwansuite.com/ar,301',
].every((row) => redirectMap.includes(row))
const errorPagesPresent = ['404.html', '500.html', '503.html'].every((file) => fs.existsSync(path.join(distDir, file)))

const report = {
  supported_lang_dirs: langDirs,
  supported_lang_dirs_valid: JSON.stringify(langDirs) === JSON.stringify(SUPPORTED_LANGS),
  removed_lang_tokens_in_output: removedLangTokensInOutput,
  title_too_long: rows.filter((row) => row.titleLength > MAX_TITLE_LENGTH).length,
  meta_description_too_long: rows.filter((row) => row.descriptionLength > MAX_DESCRIPTION_LENGTH).length,
  max_internal_html_bytes: Math.max(0, ...internalRows.map((row) => row.htmlBytes)),
  max_internal_payload_bytes: Math.max(0, ...internalRows.map((row) => row.payloadBytes)),
  home_faq_schema_questions: Object.fromEntries(homeRows.map((row) => [row.path, row.faqSchemaQuestions])),
  home_faq_schema_absent: homeRows.every((row) => row.faqSchemaQuestions === 0),
  workflow_schema_pages: rows.filter((row) => row.workflowSchemas > 0).length,
  executive_summary_pages: rows.filter((row) => row.hasExecutiveSummary).length,
  root_redirect_rules_present: rootRedirectRulesPresent,
  robots_present: fs.existsSync(robotsPath),
  robots_content_valid: robotsContentValid,
  robots_direct_rules_present: robotsDirectRulesPresent,
  redirect_map_present: fs.existsSync(redirectMapPath),
  deployment_notes_present: deploymentNotesPresent,
  direct_root_targets_present: directRootTargetsPresent,
  error_pages_present: errorPagesPresent,
  localized_sitemaps_present: sitemapFiles.every((file) => fs.existsSync(path.join(distDir, file))),
  localized_sitemap_files: sitemapFiles.filter((file) => fs.existsSync(path.join(distDir, file))),
  sample_internal_pages: internalRows
    .sort((a, b) => b.htmlBytes - a.htmlBytes)
    .slice(0, 8),
}

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

const failures = []
if (!report.supported_lang_dirs_valid) failures.push('supported_lang_dirs_valid')
if (report.removed_lang_tokens_in_output.length > 0) failures.push('removed_lang_tokens_in_output')
if (report.title_too_long > 0) failures.push('title_too_long')
if (report.meta_description_too_long > 0) failures.push('meta_description_too_long')
if (report.max_internal_html_bytes > MAX_INTERNAL_HTML_BYTES) failures.push('max_internal_html_bytes')
if (report.home_faq_schema_absent) failures.push('home_faq_schema_absent')
if (report.max_internal_payload_bytes > MAX_INTERNAL_PAYLOAD_BYTES) failures.push('max_internal_payload_bytes')
if (report.workflow_schema_pages < MIN_WORKFLOW_SCHEMA_PAGES) failures.push('workflow_schema_pages')
if (report.executive_summary_pages < MIN_EXECUTIVE_SUMMARY_PAGES) failures.push('executive_summary_pages')
if (!report.root_redirect_rules_present) failures.push('root_redirect_rules_present')
if (!report.robots_present) failures.push('robots_present')
if (!report.robots_content_valid) failures.push('robots_content_valid')
if (!report.robots_direct_rules_present) failures.push('robots_direct_rules_present')
if (!report.redirect_map_present) failures.push('redirect_map_present')
if (!report.deployment_notes_present) failures.push('deployment_notes_present')
if (!report.direct_root_targets_present) failures.push('direct_root_targets_present')
if (!report.error_pages_present) failures.push('error_pages_present')
if (!report.localized_sitemaps_present) failures.push('localized_sitemaps_present')

// ── Top-10 largest pages by HTML bytes ──────────────────────────────────────
const top10Html = [...internalRows]
  .sort((a, b) => b.htmlBytes - a.htmlBytes)
  .slice(0, 10)

console.log('\n[SEO-AEO] Top 10 internal pages by HTML bytes (limit:', MAX_INTERNAL_HTML_BYTES, ')')
console.log('  ' + ['Route'.padEnd(60), 'HTML bytes'.padStart(12), 'Status'.padStart(10)].join(''))
for (const row of top10Html) {
  const locale = row.path.split('/')[1] ?? '??'
  const route = `[${locale}] ${row.path}`.slice(0, 59).padEnd(60)
  const bytes = String(row.htmlBytes).padStart(12)
  const status = row.htmlBytes > MAX_INTERNAL_HTML_BYTES ? 'OVER LIMIT' : 'ok'
  console.log('  ' + route + bytes + status.padStart(10))
}

// ── Top-10 largest pages by payload bytes ───────────────────────────────────
const top10Payload = [...internalRows]
  .sort((a, b) => b.payloadBytes - a.payloadBytes)
  .slice(0, 10)

console.log('\n[SEO-AEO] Top 10 internal pages by payload bytes (limit:', MAX_INTERNAL_PAYLOAD_BYTES, ')')
console.log('  ' + ['Route'.padEnd(60), 'Payload bytes'.padStart(14), 'Status'.padStart(10)].join(''))
for (const row of top10Payload) {
  const locale = row.path.split('/')[1] ?? '??'
  const route = `[${locale}] ${row.path}`.slice(0, 59).padEnd(60)
  const bytes = String(row.payloadBytes).padStart(14)
  const status = row.payloadBytes > MAX_INTERNAL_PAYLOAD_BYTES ? 'OVER LIMIT' : 'ok'
  console.log('  ' + route + bytes + status.padStart(10))
}

console.log('')

if (failures.length > 0) {
  console.error('[SEO-AEO] Failed:', failures.join(', '))
  process.exit(1)
}

console.log('[SEO-AEO] Passed')
