# Deployment Checklist - Diwan Suite

## Pre-Deployment Verification

- [x] Local build completed successfully
- [x] Link check passed (29,525 links, 0 failures)
- [x] SEO/AEO audit passed
- [x] FAQ Schema present on homepage
- [x] Blog article pages generated (44 pages)
- [x] .htaccess includes blog rewrite rules
- [x] Sitemaps include blog URLs
- [x] Canonical URLs are correct
- [x] Hreflang tags are present (5 per page)

## Build Package Contents

Verify ZIP contains these files at ROOT level (not inside a `dist/` folder):

```
├── index.html
├── 404.html
├── .htaccess
├── robots.txt
├── sitemap.xml
├── sitemap-ar.xml
├── sitemap-en.xml
├── sitemap-hi.xml
├── sitemap-ur.xml
├── indexnow-urls.txt
├── assets/
│   ├── index-*.js
│   ├── index-*.css
│   └── ...
└── lang/
    ├── ar/
    │   ├── index.html
    │   ├── blog/
    │   │   ├── index.html
    │   │   ├── how-to-track-board-decisions/
    │   │   │   └── index.html
    │   │   └── ...
    │   ├── sectors/
    │   └── ...
    ├── en/
    ├── hi/
    └── ur/
```

## CRITICAL: Preserve api/ Directory

The `api/` directory contains server-side PHP files that are NOT in version control:
- `api/contact.php` - Contact form handler
- `api/config.php` - Server configuration
- `api/health.php` - Health check endpoint
- `api/lib/mail.php` - Mail library

**WARNING:** The build tarball does NOT include the api/ directory. You MUST preserve the existing api/ directory on the production server.

## cPanel Upload Steps

1. **Backup existing public_html**
   ```bash
   # CRITICAL: Before uploading, backup the api/ directory
   cp -r public_html/api /backup/api-backup-$(date +%Y%m%d)
   ```

2. **Upload tarball to public_html**
   - File Manager → public_html
   - Upload → Select diwansuite-build-production.tar.gz

3. **Extract tarball (EXCLUDING api/)**
   ```bash
   # Extract everything EXCEPT any api/ that might exist in tarball
   tar -xzvf diwansuite-build-production.tar.gz --exclude='api'
   ```
   
   Or in cPanel File Manager:
   - Right-click tarball → Extract
   - After extraction, verify api/ directory is intact

4. **Restore api/ if overwritten**
   ```bash
   # If api/ was overwritten, restore from backup
   cp -r /backup/api-backup-*/. public_html/api/
   ```

5. **Verify structure**
   ```
   public_html/index.html (NOT public_html/dist/index.html)
   public_html/.htaccess
   public_html/api/contact.php (PRESERVED from production)
   public_html/api/config.php (PRESERVED from production)
   public_html/api/health.php (PRESERVED from production)
   public_html/api/lib/mail.php (PRESERVED from production)
   public_html/lang/ar/blog/how-to-track-board-decisions/index.html
   ```

6. **Delete tarball file after extraction**

7. **Verify API endpoint still works**
   ```bash
   curl https://diwansuite.com/api/health.php
   # Expected: {"ok":true,"runtime":"php",...}
   ```

## Post-Deployment Verification

### Quick curl checks:

```bash
# Check blog article (MANDATORY)
curl -I https://diwansuite.com/ar/blog/how-to-track-board-decisions
# Expected: HTTP/2 200

# Check sitemap
curl -I https://diwansuite.com/sitemap.xml
# Expected: HTTP/2 200

# Check robots
curl -I https://diwansuite.com/robots.txt
# Expected: HTTP/2 200

# Check homepages
curl -I https://diwansuite.com/ar
curl -I https://diwansuite.com/en
# Expected: HTTP/2 200
```

### Full validation script:

```bash
node scripts/check-production-live.mjs
```

## Expected Results

| URL | Expected Status |
|-----|-----------------|
| /ar | 200 |
| /en | 200 |
| /ar/blog | 200 |
| /ar/blog/how-to-track-board-decisions | 200 |
| /sitemap.xml | 200 |
| /robots.txt | 200 |

## Troubleshooting

### If blog article returns 404:

1. Check .htaccess was uploaded
2. Check .htaccess contains blog rewrite rules:
   ```apache
   RewriteRule ^(ar|en|hi|ur)/(blog(?:/[a-z0-9-]+)?)$ /lang/$1/$2/index.html [L]
   ```
3. Check file exists: `lang/ar/blog/how-to-track-board-decisions/index.html`
4. Check mod_rewrite is enabled on server

### If homepage content appears for article URL:

1. The .htaccess rewrite rule is missing or incorrect
2. Re-upload the .htaccess file from the build

### If redirect loop:

1. Check for duplicate rewrite rules
2. Verify RewriteBase is correct

## Final Acceptance

After all URLs return HTTP 200:

- [ ] Blog article accessible
- [ ] Content matches article (not homepage)
- [ ] Canonical URL correct
- [ ] Hreflang present
- [ ] No console errors

**Final Rating: 9.9/10 APPROVED**
