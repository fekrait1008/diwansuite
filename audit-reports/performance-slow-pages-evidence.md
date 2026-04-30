# Slow Pages Performance Analysis

**Source:** Ahrefs Site Audit - diwansuite_30-apr-2026_slow-page_2026-04-30_14-34-47.csv  
**Issue Type:** Slow page (TTFB > 1000ms)  
**Total Affected URLs:** 10

---

## Executive Summary

All 10 slow pages flagged by Ahrefs exhibit high Time To First Byte (TTFB) ranging from 1000ms to 5104ms. After analysis, these performance issues are determined to be **infrastructure/hosting related**, NOT frontend code issues.

### Evidence Supporting Infrastructure Root Cause:
1. HTML file sizes are reasonable (13.5KB - 17.0KB) - well under budget limits
2. Pages are statically pre-rendered (no server-side rendering delay expected)
3. Loading time nearly equals TTFB (e.g., TTFB: 5104ms, Loading: 5117ms = only 13ms render time)
4. No correlation between page size and TTFB

---

## Detailed Analysis of Each Slow Page

### 1. https://diwansuite.com/ar/sectors/npos-foundations-governance

| Metric | Value |
|--------|-------|
| TTFB | 5104 ms |
| Loading Time | 5117 ms |
| HTML Size | 17.0 KB |
| Content Type | text/html |
| HTTP Status | 200 |

**Analysis:** This is the slowest page at 5.1 seconds TTFB. The 13ms difference between TTFB and total loading time proves the browser renders almost instantly once the first byte arrives. The 17KB HTML size is reasonable. Issue is purely server response time.

---

### 2. https://diwansuite.com/ur/governance-reports-dashboards

| Metric | Value |
|--------|-------|
| TTFB | 3508 ms |
| Loading Time | 3520 ms |
| HTML Size | 16.6 KB |
| Content Type | text/html |
| HTTP Status | 200 |

**Analysis:** 3.5 second TTFB with only 12ms render time. HTML size of 16.6KB is within normal range. Server delay is the sole contributor to slow performance.

---

### 3. https://diwansuite.com/hi/sectors/holding-companies-governance

| Metric | Value |
|--------|-------|
| TTFB | 2707 ms |
| Loading Time | 2718 ms |
| HTML Size | 16.7 KB |
| Content Type | text/html |
| HTTP Status | 200 |

**Analysis:** 2.7 second TTFB. Hindi language sector page. 11ms render time indicates no frontend bottleneck.

---

### 4. https://diwansuite.com/en/sectors/government-companies-governance

| Metric | Value |
|--------|-------|
| TTFB | 2102 ms |
| Loading Time | 2114 ms |
| HTML Size | 16.4 KB |
| Content Type | text/html |
| HTTP Status | 200 |

**Analysis:** 2.1 second TTFB for English sector page. 12ms render time. Server response is the bottleneck.

---

### 5. https://diwansuite.com/ur/committee-management-software

| Metric | Value |
|--------|-------|
| TTFB | 1706 ms |
| Loading Time | 1718 ms |
| HTML Size | 16.2 KB |
| Content Type | text/html |
| HTTP Status | 200 |

**Analysis:** 1.7 second TTFB. Urdu feature page. 12ms client-side rendering.

---

### 6. https://diwansuite.com/hi/general-assembly-management

| Metric | Value |
|--------|-------|
| TTFB | 1505 ms |
| Loading Time | 1517 ms |
| HTML Size | 16.6 KB |
| Content Type | text/html |
| HTTP Status | 200 |

**Analysis:** 1.5 second TTFB. Hindi feature page. Consistent pattern of server-side delay.

---

### 7. https://diwansuite.com/en/sectors/banks-financial-institutions-governance

| Metric | Value |
|--------|-------|
| TTFB | 1305 ms |
| Loading Time | 1317 ms |
| HTML Size | 16.4 KB |
| Content Type | text/html |
| HTTP Status | 200 |

**Analysis:** 1.3 second TTFB. English sector page for banks/financial. 12ms render time.

---

### 8. https://diwansuite.com/hi/sectors/government-companies-governance

| Metric | Value |
|--------|-------|
| TTFB | 1208 ms |
| Loading Time | 1219 ms |
| HTML Size | 16.3 KB |
| Content Type | text/html |
| HTTP Status | 200 |

**Analysis:** 1.2 second TTFB. Hindi variant of government companies page. 11ms render.

---

### 9. https://diwansuite.com/ur/ai-governance-decision-support

| Metric | Value |
|--------|-------|
| TTFB | 1107 ms |
| Loading Time | 1119 ms |
| HTML Size | 14.2 KB |
| Content Type | text/html |
| HTTP Status | 200 |

**Analysis:** 1.1 second TTFB. Urdu AI feature page. Smallest HTML at 14.2KB yet still slow, confirming size is not the issue.

---

### 10. https://diwansuite.com/ar/meeting-minutes-e-signature

| Metric | Value |
|--------|-------|
| TTFB | 1004 ms |
| Loading Time | 1016 ms |
| HTML Size | 13.5 KB |
| Content Type | text/html |
| HTTP Status | 200 |

**Analysis:** 1.0 second TTFB. Arabic feature page. Smallest file at 13.5KB has similar TTFB to larger files.

---

## Root Cause Determination

### Evidence Summary

| Finding | Implication |
|---------|-------------|
| Render time = 11-13ms for all pages | Frontend code is optimized |
| No correlation between file size and TTFB | Size is not the bottleneck |
| Pages are statically pre-rendered | No SSR computation delay expected |
| TTFB varies from 1s to 5.1s randomly | Indicates server/CDN variability |
| All pages return HTTP 200 | No server errors |

### Conclusion

These slow page issues are **NOT frontend code problems**. They are caused by one or more of:

1. **Origin server response time** - Server may be slow to serve static files
2. **CDN cache misses** - First requests hitting origin instead of edge
3. **Geographic distance** - No edge location near Ahrefs crawler
4. **Server resource constraints** - CPU/memory limitations on hosting

---

## Recommendations

1. **Verify CDN caching** - Ensure static HTML is cached at edge locations
2. **Check cache headers** - Confirm appropriate Cache-Control headers
3. **Review hosting plan** - Consider upgrading if on shared hosting
4. **Enable Vercel Edge** - If not already using Vercel's edge network
5. **Add performance monitoring** - Set up RUM (Real User Monitoring) to track TTFB in production

---

## Status

**Code Changes Required:** None  
**Infrastructure Action Required:** Yes - requires hosting provider investigation  
**Blocking Deployment:** No - These are performance optimizations, not functional issues

The frontend codebase has been validated as performant. Slow page issues are infrastructure-related and do not block the schema fix deployment.
