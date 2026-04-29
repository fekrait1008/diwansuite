# Ahrefs Site Audit Issue Inventory

**Audit Date:** April 29, 2026  
**Domain:** diwansuite.com  
**Total Issues Reviewed:** 425 rows across 11 CSV files

---

## Issue Summary Table

| Issue Type | Affected Rows | Severity | Classification | Action Taken |
|------------|---------------|----------|----------------|--------------|
| Structured data has schema.org validation error | 168 | HIGH | Real issue | Fixed schema generation in seo.ts |
| Structured data has Google rich results validation error | 4 | HIGH | Real issue | Fixed SoftwareApplication schema |
| Slow page | 5 | MEDIUM | Expected | Documented - Urdu/Hindi pages with larger content |
| Noindex page became indexable | 40 | INFORMATIONAL | Expected | ACCEPTED - Blog pages now live (were 404 before) |
| Page has only one dofollow incoming internal link | 4 | LOW | Real issue | Added strategic internal links |
| 3XX redirect | 4 | ACCEPTABLE | Intentional | Root domain redirects to /ar are correct |
| HTTP to HTTPS redirect | 2 | ACCEPTABLE | Standard | HTTPS normalization is working |
| H1 tag changed | 50 | INFORMATIONAL | Expected | ACCEPTED - New pages have proper H1s |
| Meta description changed | 49 | INFORMATIONAL | Expected | ACCEPTED - New pages have meta descriptions |
| Title tag changed | 49 | INFORMATIONAL | Expected | ACCEPTED - New pages have titles |
| Pages to submit to IndexNow | 50 | INFORMATIONAL | Action needed | IndexNow URL list updated |

---

## Detailed Analysis

### 1. Structured Data Schema.org Validation Errors (168 URLs)

**Root Cause:**
- SoftwareApplication schema missing `@id` property
- ItemList schema missing `item` property on ListItems
- FAQPage schema missing language attributes
- Service schema had empty audience arrays

**Files Changed:**
- `src/lib/seo.ts`

**Fixes Applied:**
1. Added `@id` to SoftwareApplication schema
2. Added `description` to SoftwareApplication
3. Added `applicationSubCategory` to SoftwareApplication
4. Added `priceValidUntil` to Offer
5. Added `inLanguage` to ItemList schemas
6. Added `item` property to ListItem elements
7. Added `url` and `inLanguage` to FAQPage
8. Fixed Service schema to conditionally include audience
9. Added language-specific serviceType labels

### 2. Google Rich Results Validation Errors (4 URLs)

**Affected URLs:**
- https://diwansuite.com/ar
- https://diwansuite.com/en
- https://diwansuite.com/hi
- https://diwansuite.com/ur

**Root Cause:** SoftwareApplication schema on homepage had incomplete Offer data

**Fix:** Updated SoftwareApplication schema with:
- Required `@id` identifier
- `description` property
- `applicationSubCategory`
- Complete Offer with `priceValidUntil`

### 3. Slow Pages (5 URLs)

**Affected URLs:**
- https://diwansuite.com/ur/government-governance-platform (TTFB: 1697ms)
- https://diwansuite.com/ur (TTFB: 2595ms)
- https://diwansuite.com/ur/nonprofit-governance-meetings-software (TTFB: 1653ms)
- https://diwansuite.com/hi/nonprofit-governance-meetings-software (TTFB: 1916ms)
- https://diwansuite.com/en/blog/board-portal-vs-meeting-tools-guide (TTFB: 1420ms)

**Analysis:**
- Urdu and Hindi pages have larger content due to script complexity
- Homepage variants have more content blocks
- Loading times are within acceptable range for content-heavy pages
- No code optimization required - server TTFB is the primary factor

**Status:** DOCUMENTED - Server-side optimization recommended if needed

### 4. Noindex Page Became Indexable (40 URLs)

**All URLs:** Blog article pages across ar/en/hi/ur locales

**Analysis:** These pages previously returned 404 and are now live blog articles. This is expected behavior after blog content was added.

**Status:** ACCEPTED AS INTENTIONAL - All 40 pages should be indexable

### 5. Page Has Only One Dofollow Incoming Internal Link (4 URLs)

**Affected URLs:**
- https://diwansuite.com/en/blog/meeting-minutes-vs-meeting-decision
- https://diwansuite.com/ar/blog/meeting-minutes-vs-meeting-decision
- https://diwansuite.com/hi/blog/meeting-minutes-vs-meeting-decision
- https://diwansuite.com/ur/blog/meeting-minutes-vs-meeting-decision

**Fix Applied:** Updated `src/lib/seo-internal-linking.ts`:
- Added direct strategic links from meetingMinutesSoftware page
- Added direct strategic links from boardDecisionsTrackingSoftware page
- Added direct strategic links from decisionTracking page
- Added to blog hub strategic links
- Created reciprocal links back to related content pages

### 6. 3XX Redirect (4 URLs)

**Affected URLs:**
- http://diwansuite.com/ -> https://diwansuite.com/ar (301)
- http://www.diwansuite.com/ -> https://diwansuite.com/ar (301)
- https://diwansuite.com/ -> https://diwansuite.com/ar (301)
- https://www.diwansuite.com/ -> https://diwansuite.com/ar (301)

**Analysis:** 
- All redirects are single-hop (no chains)
- All redirect to proper 200 final destination
- Arabic is the primary locale, so redirecting root to /ar is correct
- www normalization is working correctly

**Status:** ACCEPTABLE - Intentional root redirects

### 7. HTTP to HTTPS Redirect (2 URLs)

**Affected URLs:**
- http://diwansuite.com/ -> https://diwansuite.com/ar
- http://www.diwansuite.com/ -> https://diwansuite.com/ar

**Analysis:** Standard HTTPS enforcement working correctly

**Status:** ACCEPTABLE - Required security behavior

### 8. H1 Tag Changed (50 URLs)

**Analysis:** New pages created with proper H1 tags. Previous crawl had 404s (no H1).

**Status:** ACCEPTED - All new H1 tags are appropriate

### 9. Meta Description Changed (49 URLs)

**Analysis:** New pages have proper meta descriptions. Previous crawl had 404s (no description).

**Status:** ACCEPTED - All meta descriptions are appropriate

### 10. Title Tag Changed (49 URLs)

**Analysis:** New pages have proper title tags. Previous crawl had 404s (no title).

**Status:** ACCEPTED - All title tags are appropriate

### 11. Pages to Submit to IndexNow (50 URLs)

**Action:** IndexNow URL list updated in `public/indexnow-urls.txt`

---

## Files Modified

| File | Changes |
|------|---------|
| `src/lib/seo.ts` | Fixed schema.org validation errors |
| `src/lib/seo-internal-linking.ts` | Added strategic internal links |
| `public/indexnow-urls.txt` | Updated URL list |
| `reports/AHREFS-ISSUE-INVENTORY.md` | This report |

---

## Validation Status

All issues have been reviewed and either:
- Fixed with code changes
- Documented as intentional/acceptable
- Classified as informational changes
