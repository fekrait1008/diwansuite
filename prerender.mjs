import { loadEnv } from 'vite'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
const serverBundle = path.join(distDir, 'server', 'entry-server.js')
const clientHtml = path.join(distDir, 'index.html')
const env = loadEnv('production', process.cwd(), '')
const siteUrl = (env.VITE_SITE_URL || process.env.VITE_SITE_URL || 'https://diwansuite.com').replace(/\/+$/, '')
const gaMeasurementId = (env.VITE_GA_MEASUREMENT_ID || process.env.VITE_GA_MEASUREMENT_ID || '').trim()
const gtmId = (env.VITE_GTM_ID || process.env.VITE_GTM_ID || '').trim()
const publicLangSegment = 'lang'
const languagePattern = 'ar|en|hi|ur'
const pagePattern = '[a-z0-9-]+'
const removedLangs = ['de', 'fr', 'zh', 'ku', 'ja']

function buildCspHeader() {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "frame-src 'self' https://www.googletagmanager.com",
    "form-action 'self' mailto: https://wa.me",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://assets.apollo.io https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https:",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://assets.apollo.io https://aplo-evnt.com https://static.cloudflareinsights.com https://cloudflareinsights.com",
    "worker-src 'self' blob: https://assets.apollo.io",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ].join('; ')
}
const cspHeader = buildCspHeader()

function ensureDir(dirPath) { fs.mkdirSync(dirPath, { recursive: true }) }
function writeFileSafe(filePath, content) { ensureDir(path.dirname(filePath)); fs.writeFileSync(filePath, content, 'utf-8') }
function syncPublicFile(relativePath) {
  const sourcePath = path.join(distDir, relativePath)
  const targetPath = path.join(__dirname, 'public', relativePath)
  if (!fs.existsSync(sourcePath)) return
  try {
    ensureDir(path.dirname(targetPath))
    fs.copyFileSync(sourcePath, targetPath)
  } catch (error) {
    if (error && (error.code === 'EACCES' || error.code === 'EPERM')) {
      console.warn(`[warn] skipped syncing ${relativePath} to public: ${error.code}`)
      return
    }
    throw error
  }
}
function removeSourceMaps(rootDir) {
  if (!fs.existsSync(rootDir)) return
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    const fullPath = path.join(rootDir, entry.name)
    if (entry.isDirectory()) removeSourceMaps(fullPath)
    else if (entry.isFile() && fullPath.endsWith('.map')) fs.rmSync(fullPath, { force: true })
  }
}
function escapeHtml(value = '') { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;') }
function escapeJsonForTemplate(value) { return JSON.stringify(value).replace(/</g, '\\u003C').replace(/>/g, '\\u003E').replace(/&/g, '\\u0026') }

function getFontHref(lang) {
  const fontsByLang = {
    ar: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Tajawal:wght@400;500;700&display=swap',
    en: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
    hi: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;700&display=swap',
    ur: 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap',
  }
  return fontsByLang[lang] || fontsByLang.ar
}

function getFontHead(lang) {
  const href = getFontHref(lang)
  return [
    '<link rel="preconnect" href="https://fonts.googleapis.com" />',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
    `<link rel="stylesheet" href="${href}" />`,
  ].join('\n    ')
}

function buildAnalyticsHead() {
  if (!gaMeasurementId && !gtmId) return ''
  const snippets = []
  if (gtmId) {
    snippets.push(`<!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script><!-- End Google Tag Manager -->`)
  }
  if (gaMeasurementId) {
    snippets.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}"></script>`)
    snippets.push(`<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaMeasurementId}',{anonymize_ip:true});</script>`)
  }
  return snippets.join('\n    ')
}

function buildAnalyticsBodyStart() {
  if (!gtmId) return ''
  return `<!-- Google Tag Manager (noscript) --><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><!-- End Google Tag Manager (noscript) -->`
}

function buildHead(payload) {
  const alternates = payload.alternates.map((alternate) => `<link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`).join('\n    ')
  const alternateLocales = payload.alternates.filter((alternate) => alternate.locale !== payload.locale).map((alternate) => `<meta property="og:locale:alternate" content="${alternate.locale}" />`).join('\n    ')
  const scripts = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': payload.structuredData })}</script>`

  return `
    <title>${escapeHtml(payload.title)}</title>
    <meta name="description" content="${escapeHtml(payload.description)}" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="author" content="${escapeHtml(payload.siteName)}" />
    <meta name="application-name" content="${escapeHtml(payload.siteName)}" />
    <meta name="apple-mobile-web-app-title" content="${escapeHtml(payload.siteName)}" />
    <meta name="language" content="${payload.htmlLang}" />
    <meta http-equiv="content-language" content="${payload.htmlLang}" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="theme-color" content="#1d4ed8" />
    <link rel="canonical" href="${payload.canonical}" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${payload.xDefaultHref}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${payload.canonical}" />
    <meta property="og:title" content="${escapeHtml(payload.ogTitle)}" />
    <meta property="og:description" content="${escapeHtml(payload.ogDescription)}" />
    <meta property="og:image" content="${payload.ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(payload.ogImageAlt)}" />
    <meta property="og:locale" content="${payload.locale}" />
    ${alternateLocales}
    <meta property="og:site_name" content="${escapeHtml(payload.siteNameCombined)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${payload.canonical}" />
    <meta name="twitter:title" content="${escapeHtml(payload.ogTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(payload.ogDescription)}" />
    <meta name="twitter:image" content="${payload.ogImage}" />
    <meta name="twitter:image:alt" content="${escapeHtml(payload.ogImageAlt)}" />
    ${buildAnalyticsHead()}
    ${scripts}`
}

function addIntegrityAttributes(html) {
  return html.replace(/<(script|link)([^>]+(?:src|href)="([^"]+)"[^>]*)>/g, (match, tag, attrs, url) => {
    if (!url.startsWith('/') || url.startsWith('//') || url.includes('://')) return match
    if (!(url.endsWith('.js') || url.endsWith('.css'))) return match
    const assetPath = path.join(distDir, url.replace(/^\//, ''))
    if (!fs.existsSync(assetPath)) return match
    const hash = crypto.createHash('sha384').update(fs.readFileSync(assetPath)).digest('base64')
    if (attrs.includes('integrity=')) return match
    // Only add crossorigin if not already present
    const needsCrossorigin = !attrs.includes('crossorigin')
    const integrity = ` integrity="sha384-${hash}"${needsCrossorigin ? ' crossorigin="anonymous"' : ''}`
    return `<${tag}${attrs}${integrity}>`
  })
}

function renderRedirectHtml() {
  return `<!doctype html>\n<html lang="ar-SA" dir="rtl">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <meta http-equiv="refresh" content="0; url=https://diwansuite.com/ar" />\n    <meta name="robots" content="noindex, follow" />\n    <link rel="canonical" href="${siteUrl}/ar" />\n    <link rel="alternate" hreflang="x-default" href="${siteUrl}/ar" />\n    <title>Redirecting…</title>\n  </head>\n  <body></body>\n</html>`
}

function renderSitemap(entries) {
  const rows = entries.map((entry) => {
    const { loc, alternates, xDefaultHref, page, dateModified } = entry
    const alternateLinks = alternates.map((alternate) => `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}"/>`).join('\n')
    // dateModified comes from PAGE_REGISTRY and reflects actual content changes,
    // not the build timestamp. This prevents every URL showing today's date on every deploy.
    const lastmod = dateModified || new Date().toISOString().slice(0, 10)
    const sitemapMeta = entry.sitemapMeta || {}
    const changefreq = sitemapMeta.changefreq || (page === 'home' ? 'weekly' : page === 'blog' ? 'weekly' : 'monthly')
    const priority = sitemapMeta.priority || (page === 'home' ? '1.0' : page === 'blog' || page === 'about' ? '0.8' : '0.7')
    return `  <url>\n    <loc>${loc}</loc>\n${alternateLinks}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultHref}"/>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  }).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${rows}\n</urlset>`
}


function renderSitemapIndex(sitemaps) {
  // Use the most recent dateModified across all pages in each sub-sitemap,
  // not the build timestamp, so the index only changes when content changes.
  const rows = sitemaps
    .map((sitemap) => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.latestMod}</lastmod>
  </sitemap>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows}
</sitemapindex>`
}

function buildRobotsTxt() { return `User-agent: *
Disallow: /lang/
Disallow: /server/
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
` }

function csvCell(value) {
  const stringValue = String(value ?? '')
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return '"' + stringValue.replace(/"/g, '""') + '"'
  }
  return stringValue
}

function buildIndexNowUrlList(pageEntries) {
  return pageEntries.map((entry) => entry.loc).filter(Boolean).sort().join('\n') + '\n'
}

function buildRedirectMap({ pageEntries }) {
  const rows = [
    ['source', 'target', 'status', 'reason'],
    ['http://diwansuite.com/', 'https://diwansuite.com/ar', '301', 'Single-hop canonical root'],
    ['http://www.diwansuite.com/', 'https://diwansuite.com/ar', '301', 'Single-hop canonical root'],
    ['https://diwansuite.com/', 'https://diwansuite.com/ar', '301', 'Canonical language root'],
    ['https://www.diwansuite.com/', 'https://diwansuite.com/ar', '301', 'Canonical host + language root'],
    ['https://diwansuite.com/index.html', 'https://diwansuite.com/ar', '301', 'Index root normalization'],
    ['https://diwansuite.com/lang', 'https://diwansuite.com/ar', '301', 'Legacy lang root normalization'],
  ]

  const seen = new Set(rows.map((row) => `${row[0]}=>${row[1]}`))
  for (const entry of pageEntries) {
    const routePath = entry.routePath || '/ar'
    const legacySource = `${siteUrl}/${publicLangSegment}${routePath}`
    const canonicalTarget = `${siteUrl}${routePath}`
    const legacyKey = `${legacySource}=>${canonicalTarget}`
    if (!seen.has(legacyKey)) {
      rows.push([legacySource, canonicalTarget, '301', 'Normalize legacy /lang path'])
      seen.add(legacyKey)
    }

    if (entry.lang === 'ar') {
      for (const removedLang of removedLangs) {
        const removedSource = `${siteUrl}/${removedLang}${routePath.slice(3)}`
        const removedTarget = canonicalTarget
        const removedKey = `${removedSource}=>${removedTarget}`
        if (!seen.has(removedKey)) {
          rows.push([removedSource, removedTarget, '301', 'Redirect removed language to Arabic equivalent'])
          seen.add(removedKey)
        }

        const legacyRemovedSource = `${siteUrl}/${publicLangSegment}/${removedLang}${routePath.slice(3)}`
        const legacyRemovedKey = `${legacyRemovedSource}=>${removedTarget}`
        if (!seen.has(legacyRemovedKey)) {
          rows.push([legacyRemovedSource, removedTarget, '301', 'Redirect removed legacy /lang path to Arabic equivalent'])
          seen.add(legacyRemovedKey)
        }
      }
    }
  }

  return rows.map((row) => row.map(csvCell).join(',')).join('\n') + '\n'
}

function buildDeploymentNotes() {
  return `# Phase 7 deployment notes\n\n## Goal\nKeep the production site on a single canonical destination for the root entry points:\n- http://diwansuite.com/ -> https://diwansuite.com/ar\n- http://www.diwansuite.com/ -> https://diwansuite.com/ar\n- https://diwansuite.com/ -> https://diwansuite.com/ar\n- https://www.diwansuite.com/ -> https://diwansuite.com/ar\n\n## What is already generated in dist\n- .htaccess\n- robots.txt\n- sitemap.xml and localized sitemap files\n- redirect-map.csv\n- error pages: 404.html, 500.html, 503.html\n\n## Mandatory deployment rules\n1. Upload the full dist folder contents to public_html.\n2. Make sure the generated .htaccess replaces any old root redirect rules.\n3. Remove or disable conflicting cPanel Redirects rules that force:\n   - http -> https on the root first\n   - www -> non-www in a separate hop\n   - / -> /ar in a second hop\n4. In Cloudflare, avoid stacking a separate Always Use HTTPS or Bulk Redirect rule that causes:\n   - http://diwansuite.com/ -> https://diwansuite.com/ -> https://diwansuite.com/ar\n5. Keep exactly one canonical root destination: https://diwansuite.com/ar\n\n## Live verification after deployment\nRun:\n\nnode scripts/check-live-redirects.mjs\n\nExpected result:\n- each root variant finishes in at most 1 redirect hop before the final 200\n- final URL is always https://diwansuite.com/ar\n\n## Rollback\n- restore the previous .htaccess only if the new upload breaks localized routes\n- do not restore any old redirect manager rule that creates a second hop on the root\n`
}

function buildHtaccess() {
  return `Options -Indexes
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html
ErrorDocument 503 /503.html

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Serve robots and sitemap files directly without rewrite hops.
  RewriteRule ^(robots\.txt|sitemap\.xml|sitemap-[a-z]{2}\.xml)$ - [L,NC]

  RewriteRule ^server(?:/.*)?$ - [R=404,L]

  # Single-hop: www + http → canonical non-www https (no trailing slash on root).
  RewriteCond %{HTTP_HOST} ^www\\.diwansuite\\.com$ [NC]
  RewriteRule ^$ https://diwansuite.com/ar [R=301,L,NE]

  RewriteCond %{HTTP_HOST} ^www\\.diwansuite\\.com$ [NC]
  RewriteRule ^(.*)$ https://diwansuite.com/$1 [R=301,L,NE]

  # Single-hop: http (non-www) → https canonical.
  RewriteCond %{HTTPS} !=on
  RewriteRule ^$ https://diwansuite.com/ar [R=301,L,NE]

  RewriteCond %{HTTPS} !=on
  RewriteRule ^(.*)$ https://diwansuite.com/$1 [R=301,L,NE]

  # Root canonical path on the canonical host.
  RewriteRule ^$ /ar [R=301,L,NE]
  RewriteRule ^index\.html$ /ar [R=301,L,NE]
  RewriteRule ^lang/?$ /ar [R=301,L,NE]

  # Legacy removed languages redirect to the closest supported Arabic path.
  RewriteRule ^(de|fr|zh|ku|ja)/?$ /ar [R=301,L,NE]
  RewriteRule ^(de|fr|zh|ku|ja)/(sectors(?:/${pagePattern})?)$ /ar/$2 [R=301,L,NE]
  RewriteRule ^(de|fr|zh|ku|ja)/(${pagePattern})$ /ar/$2 [R=301,L,NE]
  RewriteRule ^lang/(de|fr|zh|ku|ja)/?$ /ar [R=301,L,NE]
  RewriteRule ^lang/(de|fr|zh|ku|ja)/(sectors(?:/${pagePattern})?)$ /ar/$2 [R=301,L,NE]
  RewriteRule ^lang/(de|fr|zh|ku|ja)/(${pagePattern})$ /ar/$2 [R=301,L,NE]

  # Normalize legacy /lang paths for supported languages.
  RewriteRule ^lang/(${languagePattern})/?$ /$1 [R=301,L,NE]
  RewriteRule ^lang/(${languagePattern})/(sectors(?:/${pagePattern})?)$ /$1/$2 [R=301,L,NE]
  RewriteRule ^lang/(${languagePattern})/(${pagePattern})$ /$1/$2 [R=301,L,NE]

  # Collapse trailing slashes on canonical localized paths.
  RewriteCond %{THE_REQUEST} \\s/+((?:${languagePattern})(?:/(?:sectors(?:/${pagePattern})?|${pagePattern}))?)/+[\\s?] [NC]
  RewriteRule ^ https://diwansuite.com/%1 [R=301,L,NE]

  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(${languagePattern})/(sectors(?:/${pagePattern})?)$ /${publicLangSegment}/$1/$2/index.html [L]

  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(${languagePattern})/(${pagePattern})$ /${publicLangSegment}/$1/$2/index.html [L]

  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(${languagePattern})$ /${publicLangSegment}/$1/index.html [L]
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "accelerometer=(), autoplay=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()"
  Header always set Content-Security-Policy "${cspHeader}"
  Header always set Vary "Accept-Encoding"

  <FilesMatch "^(404|500|503)\.html$">
    Header set X-Robots-Tag "noindex, nofollow"
  </FilesMatch>

  <Files "robots.txt">
    Header set Content-Type "text/plain; charset=UTF-8"
    Header set Cache-Control "public, max-age=300, must-revalidate"
  </Files>

  <FilesMatch "^sitemap(?:-[a-z]{2})?\.xml$">
    Header set Content-Type "application/xml; charset=UTF-8"
    Header set Cache-Control "public, max-age=300, must-revalidate"
  </FilesMatch>

  <FilesMatch "\.html$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>

  <FilesMatch "\.(css|js)$">
    Header set Cache-Control "public, max-age=2592000, immutable"
  </FilesMatch>

  <FilesMatch "\.(webp|png|jpg|jpeg|svg|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
`
}

function renderErrorPage(statusCode, title, description, actionHref, actionLabel) {
  return `<!doctype html>\n<html lang="ar-SA" dir="rtl">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <meta name="robots" content="noindex, nofollow" />\n    <meta name="theme-color" content="#1d4ed8" />\n    <link rel="icon" type="image/svg+xml" href="/logo-diwan.svg" />\n    ${getFontHead('ar')}\n    <title>${escapeHtml(title)}</title>\n    <style>:root{color-scheme:light;background:#fff;color:#0f172a}*{box-sizing:border-box}body{margin:0;font-family:'Cairo','Tajawal',system-ui,sans-serif;background:#f8fafc;color:#0f172a}.page{min-height:100vh;display:flex;flex-direction:column}.shell{width:min(100%,1120px);margin-inline:auto;padding-inline:24px}.header,.footer{background:rgba(255,255,255,.94);backdrop-filter:blur(12px)}.header{border-bottom:1px solid #e2e8f0}.footer{border-top:1px solid #e2e8f0;margin-top:auto}.header-inner,.footer-inner{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 0}.brand{display:flex;align-items:center;gap:12px;color:inherit;text-decoration:none}.brand-mark{width:40px;height:40px;border-radius:12px;background:#0f172a;color:#fff;display:grid;place-items:center;font-weight:800;font-size:12px}.brand-copy strong{display:block;font-size:1rem;line-height:1.1}.brand-copy span{display:block;font-size:.72rem;color:#475569;letter-spacing:.08em}.content{display:grid;place-items:center;padding:56px 0 72px}.card{width:min(100%,760px);background:#fff;border:1px solid #e2e8f0;border-radius:28px;box-shadow:0 18px 50px rgba(15,23,42,.08);padding:40px 28px;text-align:center}.badge{display:inline-flex;align-items:center;justify-content:center;padding:8px 14px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-weight:700;font-size:.85rem;margin-bottom:18px}h1{margin:0 0 14px;font-size:clamp(1.9rem,4vw,3rem);line-height:1.15}p{margin:0 auto 26px;max-width:58ch;font-size:1rem;line-height:1.9;color:#475569}.actions{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;border-radius:14px;font-weight:700;text-decoration:none;border:1px solid transparent}.btn-primary{background:#1d4ed8;color:#fff}.btn-secondary{background:#fff;color:#0f172a;border-color:#cbd5e1}.footer-inner{font-size:.85rem;color:#64748b}@media (max-width:640px){.header-inner,.footer-inner{flex-direction:column;align-items:flex-start}.card{padding:32px 22px}.actions{flex-direction:column}.btn{width:100%}}</style>\n  </head>\n  <body>\n    <div class="page">\n      <header class="header">\n        <div class="shell header-inner">\n          <a class="brand" href="/ar" aria-label="Diwan Suite">\n            <span class="brand-mark">DS</span>\n            <span class="brand-copy">\n              <strong>ديوان سويت</strong>\n              <span>BOARD GOVERNANCE PLATFORM</span>\n            </span>\n          </a>\n        </div>\n      </header>\n      <main class="content shell">\n        <section class="card" aria-labelledby="error-title">\n          <div class="badge">${statusCode}</div>\n          <h1 id="error-title">${escapeHtml(title)}</h1>\n          <p>${escapeHtml(description)}</p>\n          <div class="actions">\n            <a class="btn btn-primary" href="${actionHref}">${escapeHtml(actionLabel)}</a>\n            <a class="btn btn-secondary" href="/en">Go to English home</a>\n          </div>\n        </section>\n      </main>\n      <footer class="footer">\n        <div class="shell footer-inner">\n          <span>© ${new Date().getFullYear()} Diwan Suite</span>\n          <span>${escapeHtml(siteUrl)}</span>\n        </div>\n      </footer>\n    </div>\n  </body>\n</html>`
}

function getOutputFile(routePath) {
  const clean = routePath.replace(/^\/+|\/+$/g, '')
  const segments = clean.split('/').filter(Boolean)
  return path.join(distDir, publicLangSegment, ...segments, 'index.html')
}

async function prerender() {
  if (!fs.existsSync(serverBundle)) { console.error(`Server bundle not found: ${serverBundle}`); process.exit(1) }
  const { render, getSeoPayload, getInitialPageData, preloadInternalPageLayout, SUPPORTED_LANGS, STATIC_PAGES, buildLocalizedPath, SITE_CONFIG, PAGE_DATE_MODIFIED, PAGE_SITEMAP_META } = await import(pathToFileURL(serverBundle).href)
  const template = fs.readFileSync(clientHtml, 'utf-8')
  const pageEntries = []

  for (const lang of SUPPORTED_LANGS) {
    for (const page of STATIC_PAGES) {
      const routePath = buildLocalizedPath(lang, page)
      const seo = getSeoPayload(lang, page)
      const initialData = getInitialPageData(routePath)
      if (page !== 'home' && typeof preloadInternalPageLayout === 'function') {
        await preloadInternalPageLayout()
      }
      const appHtml = await render(routePath)
      const headHtml = buildHead({ ...seo, siteName: SITE_CONFIG.name, siteNameCombined: `${SITE_CONFIG.name} – ${SITE_CONFIG.arabicName}` })
      const fontHead = getFontHead(lang)
      const payloadTemplate = `<template id="__DIWAN_DATA__">${escapeJsonForTemplate(initialData)}</template>`

      const html = addIntegrityAttributes(template.replace('<html lang="ar-SA" dir="rtl">', `<html lang="${seo.htmlLang}" dir="${seo.dir}">`).replace('<!--app-fonts-->', fontHead).replace('<!--app-head-->', headHtml).replace('<body>', `<body>\n    ${buildAnalyticsBodyStart()}`).replace('<div id="root"></div>', `<div id="root">${appHtml}</div>${payloadTemplate}`))
      writeFileSafe(getOutputFile(routePath), html)
      // Use the static dateModified from PAGE_REGISTRY (via server bundle export).
      // Falls back to today only if the page somehow lacks a registry entry.
      const dateModified = (PAGE_DATE_MODIFIED && PAGE_DATE_MODIFIED[page]) || new Date().toISOString().slice(0, 10)
      pageEntries.push({ lang, routePath, loc: seo.canonical, alternates: seo.alternates, xDefaultHref: seo.xDefaultHref, page, dateModified, sitemapMeta: PAGE_SITEMAP_META?.[page] })
    }
  }

  fs.rmSync(clientHtml, { force: true })
  writeFileSafe(path.join(distDir, 'index.html'), renderRedirectHtml())
  writeFileSafe(path.join(distDir, '404.html'), renderErrorPage('404', 'الصفحة غير موجودة', 'الصفحة التي تبحث عنها غير متاحة أو تم نقلها إلى مسار آخر. استخدم الرابط التالي للوصول إلى النسخة الصحيحة من الموقع.', '/ar', 'العودة إلى الصفحة الرئيسية'))
  writeFileSafe(path.join(distDir, '500.html'), renderErrorPage('500', 'حدث خطأ داخلي في الخادم', 'تعذر إكمال الطلب الآن بسبب خطأ داخلي. حاول مرة أخرى بعد قليل أو عد إلى الصفحة الرئيسية.', '/ar', 'العودة إلى الصفحة الرئيسية'))
  writeFileSafe(path.join(distDir, '503.html'), renderErrorPage('503', 'الخدمة غير متاحة مؤقتًا', 'قد تكون المنصة تحت الصيانة أو تواجه ضغطًا مؤقتًا. يرجى المحاولة مرة أخرى بعد قليل.', '/ar', 'إعادة المحاولة من الصفحة الرئيسية'))
  const localizedSitemaps = SUPPORTED_LANGS.map((lang) => {
    const entries = pageEntries.filter((entry) => entry.lang === lang)
    const fileName = `sitemap-${lang}.xml`
    writeFileSafe(path.join(distDir, fileName), renderSitemap(entries))
    // latestMod = most recent dateModified across all pages in this sub-sitemap
    const latestMod = entries
      .map((e) => e.dateModified || '2026-01-01')
      .sort()
      .at(-1) ?? new Date().toISOString().slice(0, 10)
    return { loc: `${siteUrl}/${fileName}`, fileName, count: entries.length, latestMod }
  })

  writeFileSafe(path.join(distDir, 'sitemap.xml'), renderSitemapIndex(localizedSitemaps))
  writeFileSafe(path.join(distDir, 'robots.txt'), buildRobotsTxt())
  writeFileSafe(path.join(distDir, '.htaccess'), buildHtaccess())
  writeFileSafe(path.join(distDir, 'redirect-map.csv'), buildRedirectMap({ pageEntries }))
  writeFileSafe(path.join(distDir, 'indexnow-urls.txt'), buildIndexNowUrlList(pageEntries))
  writeFileSafe(path.join(distDir, 'DEPLOYMENT_NOTES_PHASE7.md'), buildDeploymentNotes())
  removeSourceMaps(distDir)
  syncPublicFile('sitemap.xml')
  syncPublicFile('robots.txt')
  syncPublicFile('indexnow-urls.txt')

  const serverOutputDir = path.join(distDir, 'server')
  if (fs.existsSync(serverOutputDir)) {
    fs.rmSync(serverOutputDir, { recursive: true, force: true })
  }

  console.log(`Pre-render complete: ${pageEntries.length} localized pages generated.`)
}

prerender().catch((error) => { console.error('Pre-render failed:', error); process.exit(1) })
