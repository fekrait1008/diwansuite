import http from 'node:http'
import https from 'node:https'

// ── Root entry-point candidates → must resolve to https://diwansuite.com/ar in ≤1 hop ──
const rootCandidates = [
  { url: 'http://diwansuite.com/', expectedFinal: 'https://diwansuite.com/ar', maxHops: 1 },
  { url: 'http://www.diwansuite.com/', expectedFinal: 'https://diwansuite.com/ar', maxHops: 1 },
  { url: 'https://diwansuite.com/', expectedFinal: 'https://diwansuite.com/ar', maxHops: 1 },
  { url: 'https://www.diwansuite.com/', expectedFinal: 'https://diwansuite.com/ar', maxHops: 1 },
]

// ── /lang/ paths → must 301 to canonical in ≤1 hop (no chain) ──
const langCandidates = [
  { url: 'https://diwansuite.com/lang/ar/', expectedFinal: 'https://diwansuite.com/ar', maxHops: 1 },
  { url: 'https://diwansuite.com/lang/en/', expectedFinal: 'https://diwansuite.com/en', maxHops: 1 },
  { url: 'https://diwansuite.com/lang/hi/', expectedFinal: 'https://diwansuite.com/hi', maxHops: 1 },
  { url: 'https://diwansuite.com/lang/ur/', expectedFinal: 'https://diwansuite.com/ur', maxHops: 1 },
  { url: 'https://diwansuite.com/lang/ar/blog', expectedFinal: 'https://diwansuite.com/ar/blog', maxHops: 1 },
]

// ── Canonical pages → must return 200 with 0 hops ──
const canonicalCandidates = [
  { url: 'https://diwansuite.com/ar', expectedFinal: 'https://diwansuite.com/ar', maxHops: 0 },
  { url: 'https://diwansuite.com/en', expectedFinal: 'https://diwansuite.com/en', maxHops: 0 },
  { url: 'https://diwansuite.com/hi', expectedFinal: 'https://diwansuite.com/hi', maxHops: 0 },
  { url: 'https://diwansuite.com/ur', expectedFinal: 'https://diwansuite.com/ur', maxHops: 0 },
  { url: 'https://diwansuite.com/ar/blog', expectedFinal: 'https://diwansuite.com/ar/blog', maxHops: 0 },
  { url: 'https://diwansuite.com/en/blog', expectedFinal: 'https://diwansuite.com/en/blog', maxHops: 0 },
  { url: 'https://diwansuite.com/hi/blog', expectedFinal: 'https://diwansuite.com/hi/blog', maxHops: 0 },
  { url: 'https://diwansuite.com/ur/blog', expectedFinal: 'https://diwansuite.com/ur/blog', maxHops: 0 },
]

// ── Trailing slash → must 301 to no-trailing-slash canonical in ≤1 hop ──
const trailingSlashCandidates = [
  { url: 'https://diwansuite.com/ar/', expectedFinal: 'https://diwansuite.com/ar', maxHops: 1 },
  { url: 'https://diwansuite.com/en/', expectedFinal: 'https://diwansuite.com/en', maxHops: 1 },
  { url: 'https://diwansuite.com/ar/blog/', expectedFinal: 'https://diwansuite.com/ar/blog', maxHops: 1 },
]

const ALL_CHECKS = [
  ...rootCandidates.map((c) => ({ ...c, group: 'root' })),
  ...langCandidates.map((c) => ({ ...c, group: '/lang/ redirect' })),
  ...canonicalCandidates.map((c) => ({ ...c, group: 'canonical 200' })),
  ...trailingSlashCandidates.map((c) => ({ ...c, group: 'trailing slash' })),
]

function requestOnce(url) {
  const client = url.startsWith('https:') ? https : http
  return new Promise((resolve, reject) => {
    const req = client.request(
      url,
      { method: 'GET', headers: { 'user-agent': 'DiwanSuiteLiveRedirectCheck/1.0' } },
      (res) => {
        res.resume()
        resolve({ url, statusCode: res.statusCode || 0, location: res.headers.location || '' })
      },
    )
    req.on('error', reject)
    req.setTimeout(15000, () => req.destroy(new Error(`Timeout for ${url}`)))
    req.end()
  })
}

function toAbsoluteUrl(currentUrl, location) {
  if (!location) return ''
  if (/^https?:\/\//i.test(location)) return location
  return new URL(location, currentUrl).toString()
}

async function traceRedirects(startUrl, limit = 5) {
  const chain = []
  let current = startUrl
  for (let i = 0; i < limit; i += 1) {
    const step = await requestOnce(current)
    chain.push(step)
    if (step.statusCode < 300 || step.statusCode >= 400 || !step.location) break
    current = toAbsoluteUrl(current, step.location)
  }
  return chain
}

async function main() {
  const results = []

  for (const check of ALL_CHECKS) {
    const chain = await traceRedirects(check.url)
    const redirectHops = Math.max(0, chain.length - 1)
    const finalStep = chain[chain.length - 1]
    const finalUrl = finalStep?.url || check.url
    const finalStatusCode = finalStep?.statusCode || 0

    // Canonical 200 checks need finalStatusCode === 200
    // Redirect checks need finalStatusCode === 200 at the destination
    const passed =
      redirectHops <= check.maxHops &&
      finalUrl === check.expectedFinal &&
      finalStatusCode === 200

    results.push({
      group: check.group,
      url: check.url,
      expectedFinal: check.expectedFinal,
      maxHops: check.maxHops,
      redirectHops,
      finalUrl,
      finalStatusCode,
      passed,
      chain: chain.map((s) => `${s.statusCode} ${s.url}${s.location ? ' → ' + s.location : ''}`),
    })
  }

  const failed = results.filter((r) => !r.passed)
  const passed = results.filter((r) => r.passed)

  console.log('\n=== LIVE REDIRECT AUDIT ===\n')

  const groups = [...new Set(results.map((r) => r.group))]
  for (const group of groups) {
    const groupResults = results.filter((r) => r.group === group)
    const groupPassed = groupResults.filter((r) => r.passed).length
    const icon = groupPassed === groupResults.length ? 'PASS' : 'FAIL'
    console.log(`[${icon}] ${group} (${groupPassed}/${groupResults.length})`)
    for (const r of groupResults) {
      const rowIcon = r.passed ? '  OK  ' : '  FAIL'
      console.log(`  ${rowIcon}  ${r.url}`)
      console.log(`         hops=${r.redirectHops}/${r.maxHops}  final=${r.finalUrl}  status=${r.finalStatusCode}`)
      if (!r.passed) {
        for (const step of r.chain) console.log(`         chain: ${step}`)
      }
    }
  }

  console.log(`\nPassed: ${passed.length}/${results.length}`)
  if (failed.length > 0) {
    console.log(`Failed: ${failed.length}`)
    process.exit(1)
  } else {
    console.log('All checks passed.')
  }
}

main().catch((error) => {
  console.error('[LIVE-REDIRECTS] Fatal error:', error.message)
  process.exit(1)
})
