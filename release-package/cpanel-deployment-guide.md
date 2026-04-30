# cPanel Deployment Guide for DiwanSuite

**Build Date:** April 30, 2026  
**Archive:** `diwansuite-build-production-cpanel.tar.gz`  
**Size:** 7.0 MB (688 files)

---

## Pre-Deployment Checklist

- [ ] Backup existing `public_html` directory
- [ ] Verify SSL certificate is active for diwansuite.com
- [ ] Note current .htaccess rules for preservation

---

## Deployment Steps

### Step 1: Upload Archive

1. Login to cPanel
2. Navigate to **File Manager** → `public_html`
3. Upload `diwansuite-build-production-cpanel.tar.gz`

### Step 2: Extract Archive

1. Right-click the uploaded `.tar.gz` file
2. Select **Extract**
3. Extract to `public_html` (overwrite existing files)

### Step 3: Verify .htaccess

Ensure the following rules are in `public_html/.htaccess`:

```apache
# Enable Rewrite Engine
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Language Redirects (URL rewriting from /ar to /lang/ar)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(ar|en|hi|ur)(/.*)?$ /lang/$1$2 [L]

# Trailing Slash Normalization
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ /$1/ [L,R=301]

# SPA Fallback for each language
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^lang/(ar|en|hi|ur)/(.*)$ /lang/$1/index.html [L]

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
  AddOutputFilterByType DEFLATE application/javascript application/json
</IfModule>

# Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

### Step 4: Verify Deployment

Test the following URLs:

| URL | Expected Status |
|-----|-----------------|
| https://diwansuite.com/ar | 200 OK |
| https://diwansuite.com/en | 200 OK |
| https://diwansuite.com/hi | 200 OK |
| https://diwansuite.com/ur | 200 OK |
| https://diwansuite.com/sitemap.xml | 200 OK |
| https://diwansuite.com/robots.txt | 200 OK |

### Step 5: Verify Schema Markup

1. Go to https://search.google.com/test/rich-results
2. Test: `https://diwansuite.com/ar`
3. Confirm: **No errors detected**

---

## Directory Structure

```
public_html/
├── lang/
│   ├── ar/           # Arabic pages (79 pages)
│   ├── en/           # English pages (79 pages)
│   ├── hi/           # Hindi pages (79 pages)
│   └── ur/           # Urdu pages (79 pages)
├── assets/           # JS, CSS, images
├── sitemap.xml       # Main sitemap index
├── sitemap-ar.xml    # Arabic sitemap
├── sitemap-en.xml    # English sitemap
├── sitemap-hi.xml    # Hindi sitemap
├── sitemap-ur.xml    # Urdu sitemap
├── robots.txt        # Robots configuration
└── .htaccess         # Apache configuration
```

---

## Post-Deployment Actions

### 1. Submit Sitemaps to Search Console

```
https://diwansuite.com/sitemap.xml
https://diwansuite.com/sitemap-ar.xml
https://diwansuite.com/sitemap-en.xml
https://diwansuite.com/sitemap-hi.xml
https://diwansuite.com/sitemap-ur.xml
```

### 2. Request Indexing

Submit these priority URLs for immediate indexing:
- https://diwansuite.com/ar
- https://diwansuite.com/en
- https://diwansuite.com/ar/about
- https://diwansuite.com/en/about

### 3. Monitor Rich Results

Check Google Search Console → Enhancements for:
- FAQ rich results
- Breadcrumbs
- Sitelinks searchbox

---

## Rollback Procedure

If issues occur:

1. Navigate to **File Manager** → `public_html`
2. Delete extracted files
3. Restore from backup

---

## Support

For issues, refer to:
- `SEO-AUDIT-REMEDIATION-REPORT.md` - Full audit documentation
- `performance-slow-pages-evidence.md` - TTFB analysis
- `final-go-no-go.md` - Release decision rationale
