#!/usr/bin/env node
/**
 * Ahrefs URL Validation Script
 * Validates that all indexed URLs from Ahrefs CSV exist in the dist folder
 * and contain proper JSON-LD structured data.
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const DIST_DIR = './dist'
const BASE_URL = 'https://diwansuite.com'

// All URLs from Ahrefs CSV (extracted from the structured data report)
const AHREFS_URLS = [
  '/ar',
  '/en',
  '/hi',
  '/ur',
  '/ar/ai-governance-assistant',
  '/ar/ai-governance-decision-support',
  '/ar/attendance-quorum-qr',
  '/ar/banking-financial-governance',
  '/ar/board-management-system',
  '/ar/board-secretary-system',
  '/ar/committee-management-software',
  '/ar/decision-management-tracking',
  '/ar/general-assembly-management',
  '/ar/government-governance-platform',
  '/ar/governance-reports',
  '/ar/governance-reports-dashboards',
  '/ar/integrations-board-governance',
  '/ar/listed-companies-governance',
  '/ar/meeting-minutes-e-signature',
  '/ar/roi-board-governance',
  '/ar/sectors',
  '/ar/sectors/authorities-organizations-governance',
  '/ar/sectors/charitable-entities-governance',
  '/ar/sectors/general-assemblies-governance',
  '/ar/sectors/government-companies-governance',
  '/ar/sectors/holding-companies-governance',
  '/ar/sectors/homeowners-associations-governance',
  '/ar/sectors/hospitals-clinics-governance',
  '/ar/sectors/ministries-government-entities-governance',
  '/ar/sectors/municipalities-governance',
  '/ar/sectors/universities-institutes-governance',
  '/ar/support',
  '/en/ai-governance-assistant',
  '/en/ai-governance-decision-support',
  '/en/attendance-quorum-qr',
  '/en/banking-financial-governance',
  '/en/board-management-system',
  '/en/board-secretary-system',
  '/en/committee-management-software',
  '/en/decision-management-tracking',
  '/en/general-assembly-management',
  '/en/government-governance-platform',
  '/en/governance-reports',
  '/en/governance-reports-dashboards',
  '/en/integrations-board-governance',
  '/en/listed-companies-governance',
  '/en/meeting-minutes-e-signature',
  '/en/roi-board-governance',
  '/en/sectors',
  '/en/sectors/authorities-organizations-governance',
  '/en/sectors/charitable-entities-governance',
  '/en/sectors/general-assemblies-governance',
  '/en/sectors/government-companies-governance',
  '/en/sectors/holding-companies-governance',
  '/en/sectors/homeowners-associations-governance',
  '/en/sectors/hospitals-clinics-governance',
  '/en/sectors/ministries-government-entities-governance',
  '/en/sectors/municipalities-governance',
  '/en/sectors/universities-institutes-governance',
  '/en/support',
  '/hi/ai-governance-assistant',
  '/hi/ai-governance-decision-support',
  '/hi/attendance-quorum-qr',
  '/hi/banking-financial-governance',
  '/hi/board-management-system',
  '/hi/board-secretary-system',
  '/hi/committee-management-software',
  '/hi/decision-management-tracking',
  '/hi/general-assembly-management',
  '/hi/government-governance-platform',
  '/hi/governance-reports',
  '/hi/governance-reports-dashboards',
  '/hi/integrations-board-governance',
  '/hi/listed-companies-governance',
  '/hi/meeting-minutes-e-signature',
  '/hi/roi-board-governance',
  '/hi/sectors',
  '/hi/sectors/authorities-organizations-governance',
  '/hi/sectors/charitable-entities-governance',
  '/hi/sectors/general-assemblies-governance',
  '/hi/sectors/government-companies-governance',
  '/hi/sectors/holding-companies-governance',
  '/hi/sectors/homeowners-associations-governance',
  '/hi/sectors/hospitals-clinics-governance',
  '/hi/sectors/ministries-government-entities-governance',
  '/hi/sectors/municipalities-governance',
  '/hi/sectors/universities-institutes-governance',
  '/hi/support',
  '/ur/ai-governance-assistant',
  '/ur/ai-governance-decision-support',
  '/ur/attendance-quorum-qr',
  '/ur/banking-financial-governance',
  '/ur/board-management-system',
  '/ur/board-secretary-system',
  '/ur/committee-management-software',
  '/ur/decision-management-tracking',
  '/ur/general-assembly-management',
  '/ur/government-governance-platform',
  '/ur/governance-reports',
  '/ur/governance-reports-dashboards',
  '/ur/integrations-board-governance',
  '/ur/listed-companies-governance',
  '/ur/meeting-minutes-e-signature',
  '/ur/roi-board-governance',
  '/ur/sectors',
  '/ur/sectors/authorities-organizations-governance',
  '/ur/sectors/charitable-entities-governance',
  '/ur/sectors/general-assemblies-governance',
  '/ur/sectors/government-companies-governance',
  '/ur/sectors/holding-companies-governance',
  '/ur/sectors/homeowners-associations-governance',
  '/ur/sectors/hospitals-clinics-governance',
  '/ur/sectors/ministries-government-entities-governance',
  '/ur/sectors/municipalities-governance',
  '/ur/sectors/universities-institutes-governance',
  '/ur/support',
]

// Required JSON-LD schema types per page type
const REQUIRED_SCHEMAS = {
  homepage: ['Organization', 'SoftwareApplication', 'WebSite', 'WebPage', 'BreadcrumbList'],
  feature: ['Organization', 'Service', 'WebSite', 'WebPage', 'BreadcrumbList'],
  sector: ['Organization', 'Service', 'WebSite', 'WebPage', 'BreadcrumbList'],
  sectorsIndex: ['Organization', 'Service', 'WebSite', 'WebPage', 'BreadcrumbList'],
}

function getPageType(url) {
  if (url.match(/^\/(ar|en|hi|ur)$/)) return 'homepage'
  if (url.includes('/sectors/')) return 'sector'
  if (url.endsWith('/sectors')) return 'sectorsIndex'
  return 'feature'
}

function urlToFilePath(url) {
  // /ar -> dist/lang/ar/index.html
  // /ar/sectors -> dist/lang/ar/sectors/index.html
  const parts = url.split('/').filter(Boolean)
  const locale = parts[0]
  const rest = parts.slice(1)
  
  if (rest.length === 0) {
    return join(DIST_DIR, 'lang', locale, 'index.html')
  }
  return join(DIST_DIR, 'lang', locale, ...rest, 'index.html')
}

function extractJsonLdTypes(html) {
  const types = []
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let match
  
  while ((match = regex.exec(html)) !== null) {
    try {
      const json = JSON.parse(match[1])
      if (json['@type']) {
        types.push(json['@type'])
      }
      // Handle @graph
      if (json['@graph']) {
        for (const item of json['@graph']) {
          if (item['@type']) {
            types.push(item['@type'])
          }
        }
      }
    } catch (e) {
      // Invalid JSON-LD
    }
  }
  
  return types.flat()
}

function validateUrl(url) {
  const filePath = urlToFilePath(url)
  const pageType = getPageType(url)
  const result = {
    url,
    filePath,
    pageType,
    exists: false,
    hasJsonLd: false,
    jsonLdTypes: [],
    missingTypes: [],
    errors: [],
  }
  
  if (!existsSync(filePath)) {
    result.errors.push(`File not found: ${filePath}`)
    return result
  }
  
  result.exists = true
  
  const html = readFileSync(filePath, 'utf-8')
  const types = extractJsonLdTypes(html)
  result.jsonLdTypes = types
  result.hasJsonLd = types.length > 0
  
  // Check required types
  const required = REQUIRED_SCHEMAS[pageType] || REQUIRED_SCHEMAS.feature
  for (const type of required) {
    if (!types.includes(type)) {
      result.missingTypes.push(type)
    }
  }
  
  if (result.missingTypes.length > 0) {
    result.errors.push(`Missing JSON-LD types: ${result.missingTypes.join(', ')}`)
  }
  
  // Check for FAQPage on feature/sector pages (except support/sectors index)
  if ((pageType === 'feature' || pageType === 'sector') && 
      !url.endsWith('/support') && 
      !url.endsWith('/sectors') &&
      !types.includes('FAQPage')) {
    // This is a warning, not an error - FAQPage is recommended but not required
    // result.errors.push('Missing recommended FAQPage schema')
  }
  
  return result
}

// Main validation
console.log('='.repeat(60))
console.log('AHREFS URL VALIDATION REPORT')
console.log('='.repeat(60))
console.log(`Total URLs to validate: ${AHREFS_URLS.length}`)
console.log('')

let passed = 0
let failed = 0
const failures = []

for (const url of AHREFS_URLS) {
  const result = validateUrl(url)
  
  if (result.errors.length === 0) {
    passed++
    console.log(`[PASS] ${url}`)
  } else {
    failed++
    failures.push(result)
    console.log(`[FAIL] ${url}`)
    for (const error of result.errors) {
      console.log(`       - ${error}`)
    }
  }
}

console.log('')
console.log('='.repeat(60))
console.log('SUMMARY')
console.log('='.repeat(60))
console.log(`Passed: ${passed}/${AHREFS_URLS.length}`)
console.log(`Failed: ${failed}/${AHREFS_URLS.length}`)

if (failures.length > 0) {
  console.log('')
  console.log('FAILURES:')
  for (const f of failures) {
    console.log(`  ${f.url}: ${f.errors.join('; ')}`)
  }
  process.exit(1)
} else {
  console.log('')
  console.log('All Ahrefs URLs validated successfully!')
  process.exit(0)
}
