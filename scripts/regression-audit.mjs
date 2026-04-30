#!/usr/bin/env node
/**
 * Comprehensive Post-Fix Regression Audit Script
 * Generates all required validation reports for SEO audit compliance
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const REPORTS_DIR = path.join(ROOT, 'audit-reports')

// Ahrefs affected URLs from the CSV (300 URLs with schema errors)
const AHREFS_AFFECTED_URLS = [
  // Arabic pages
  '/ar', '/ar/about', '/ar/blog', '/ar/privacy', '/ar/terms',
  '/ar/erp-software', '/ar/hr-software', '/ar/accounting-software', '/ar/crm-software',
  '/ar/pos-software', '/ar/warehouse-management', '/ar/project-management',
  '/ar/payroll-software', '/ar/invoice-software', '/ar/purchase-orders',
  '/ar/leave-management', '/ar/attendance-software', '/ar/self-service-portal',
  '/ar/recruitment-software', '/ar/asset-management', '/ar/construction-erp',
  '/ar/manufacturing-erp', '/ar/retail-erp', '/ar/restaurant-pos',
  '/ar/e-invoicing-saudi-arabia', '/ar/zatca-phase-2', '/ar/qr-code-invoice',
  '/ar/bnpl-integration', '/ar/real-estate-erp', '/ar/trading-erp',
  '/ar/contractor-erp', '/ar/transport-management', '/ar/fleet-management',
  '/ar/healthcare-erp', '/ar/clinic-management', '/ar/hospitality-erp',
  '/ar/school-management', '/ar/university-erp', '/ar/masjid-management',
  '/ar/association-management', '/ar/club-management', '/ar/charity-management',
  '/ar/endowment-management', '/ar/loan-management', '/ar/saudi-vat-compliance',
  '/ar/multi-branch-management', '/ar/multi-currency', '/ar/offline-pos',
  '/ar/ecommerce-integration', '/ar/delivery-app-integration',
  '/ar/biometric-attendance', '/ar/mobile-attendance', '/ar/gps-tracking',
  '/ar/document-management', '/ar/contract-management', '/ar/maintenance-management',
  '/ar/quality-control', '/ar/production-planning', '/ar/bill-of-materials',
  '/ar/job-costing', '/ar/budget-management', '/ar/financial-reports',
  '/ar/bank-reconciliation', '/ar/cheque-management', '/ar/letter-of-credit',
  '/ar/fixed-assets', '/ar/inventory-valuation', '/ar/batch-tracking',
  '/ar/serial-number-tracking', '/ar/barcode-scanning', '/ar/rfid-tracking',
  '/ar/demand-forecasting', '/ar/purchase-requisition', '/ar/vendor-management',
  '/ar/customer-portal', '/ar/vendor-portal', '/ar/sales-pipeline',
  '/ar/quotation-management', '/ar/sales-orders', '/ar/delivery-notes',
  '/ar/returns-management', '/ar/commission-management', '/ar/loyalty-program',
  
  // English pages
  '/en', '/en/about', '/en/blog', '/en/privacy', '/en/terms',
  '/en/erp-software', '/en/hr-software', '/en/accounting-software', '/en/crm-software',
  '/en/pos-software', '/en/warehouse-management', '/en/project-management',
  '/en/payroll-software', '/en/invoice-software', '/en/purchase-orders',
  '/en/leave-management', '/en/attendance-software', '/en/self-service-portal',
  '/en/recruitment-software', '/en/asset-management', '/en/construction-erp',
  '/en/manufacturing-erp', '/en/retail-erp', '/en/restaurant-pos',
  '/en/e-invoicing-saudi-arabia', '/en/zatca-phase-2', '/en/qr-code-invoice',
  '/en/bnpl-integration', '/en/real-estate-erp', '/en/trading-erp',
  '/en/contractor-erp', '/en/transport-management', '/en/fleet-management',
  '/en/healthcare-erp', '/en/clinic-management', '/en/hospitality-erp',
  '/en/school-management', '/en/university-erp', '/en/masjid-management',
  '/en/association-management', '/en/club-management', '/en/charity-management',
  '/en/endowment-management', '/en/loan-management', '/en/saudi-vat-compliance',
  '/en/multi-branch-management', '/en/multi-currency', '/en/offline-pos',
  '/en/ecommerce-integration', '/en/delivery-app-integration',
  '/en/biometric-attendance', '/en/mobile-attendance', '/en/gps-tracking',
  '/en/document-management', '/en/contract-management', '/en/maintenance-management',
  '/en/quality-control', '/en/production-planning', '/en/bill-of-materials',
  '/en/job-costing', '/en/budget-management', '/en/financial-reports',
  '/en/bank-reconciliation', '/en/cheque-management', '/en/letter-of-credit',
  '/en/fixed-assets', '/en/inventory-valuation', '/en/batch-tracking',
  '/en/serial-number-tracking', '/en/barcode-scanning', '/en/rfid-tracking',
  '/en/demand-forecasting', '/en/purchase-requisition', '/en/vendor-management',
  '/en/customer-portal', '/en/vendor-portal', '/en/sales-pipeline',
  '/en/quotation-management', '/en/sales-orders', '/en/delivery-notes',
  '/en/returns-management', '/en/commission-management', '/en/loyalty-program',
  
  // Hindi pages
  '/hi', '/hi/about', '/hi/blog', '/hi/privacy', '/hi/terms',
  '/hi/erp-software', '/hi/hr-software', '/hi/accounting-software', '/hi/crm-software',
  '/hi/pos-software', '/hi/warehouse-management', '/hi/project-management',
  '/hi/payroll-software', '/hi/invoice-software', '/hi/purchase-orders',
  '/hi/leave-management', '/hi/attendance-software', '/hi/self-service-portal',
  '/hi/recruitment-software', '/hi/asset-management', '/hi/construction-erp',
  '/hi/manufacturing-erp', '/hi/retail-erp', '/hi/restaurant-pos',
  '/hi/e-invoicing-saudi-arabia', '/hi/zatca-phase-2', '/hi/qr-code-invoice',
  '/hi/bnpl-integration', '/hi/real-estate-erp', '/hi/trading-erp',
  '/hi/contractor-erp', '/hi/transport-management', '/hi/fleet-management',
  '/hi/healthcare-erp', '/hi/clinic-management', '/hi/hospitality-erp',
  '/hi/school-management', '/hi/university-erp', '/hi/masjid-management',
  '/hi/association-management', '/hi/club-management', '/hi/charity-management',
  '/hi/endowment-management', '/hi/loan-management', '/hi/saudi-vat-compliance',
  '/hi/multi-branch-management', '/hi/multi-currency', '/hi/offline-pos',
  '/hi/ecommerce-integration', '/hi/delivery-app-integration',
  '/hi/biometric-attendance', '/hi/mobile-attendance', '/hi/gps-tracking',
  '/hi/document-management', '/hi/contract-management', '/hi/maintenance-management',
  '/hi/quality-control', '/hi/production-planning', '/hi/bill-of-materials',
  '/hi/job-costing', '/hi/budget-management', '/hi/financial-reports',
  '/hi/bank-reconciliation', '/hi/cheque-management', '/hi/letter-of-credit',
  '/hi/fixed-assets', '/hi/inventory-valuation', '/hi/batch-tracking',
  '/hi/serial-number-tracking', '/hi/barcode-scanning', '/hi/rfid-tracking',
  '/hi/demand-forecasting', '/hi/purchase-requisition', '/hi/vendor-management',
  '/hi/customer-portal', '/hi/vendor-portal', '/hi/sales-pipeline',
  '/hi/quotation-management', '/hi/sales-orders', '/hi/delivery-notes',
  '/hi/returns-management', '/hi/commission-management', '/hi/loyalty-program',
  
  // Urdu pages
  '/ur', '/ur/about', '/ur/blog', '/ur/privacy', '/ur/terms',
  '/ur/erp-software', '/ur/hr-software', '/ur/accounting-software', '/ur/crm-software',
  '/ur/pos-software', '/ur/warehouse-management', '/ur/project-management',
  '/ur/payroll-software', '/ur/invoice-software', '/ur/purchase-orders',
  '/ur/leave-management', '/ur/attendance-software', '/ur/self-service-portal',
  '/ur/recruitment-software', '/ur/asset-management', '/ur/construction-erp',
  '/ur/manufacturing-erp', '/ur/retail-erp', '/ur/restaurant-pos',
  '/ur/e-invoicing-saudi-arabia', '/ur/zatca-phase-2', '/ur/qr-code-invoice',
  '/ur/bnpl-integration', '/ur/real-estate-erp', '/ur/trading-erp',
  '/ur/contractor-erp', '/ur/transport-management', '/ur/fleet-management',
  '/ur/healthcare-erp', '/ur/clinic-management', '/ur/hospitality-erp',
  '/ur/school-management', '/ur/university-erp', '/ur/masjid-management',
  '/ur/association-management', '/ur/club-management', '/ur/charity-management',
  '/ur/endowment-management', '/ur/loan-management', '/ur/saudi-vat-compliance',
  '/ur/multi-branch-management', '/ur/multi-currency', '/ur/offline-pos',
  '/ur/ecommerce-integration', '/ur/delivery-app-integration',
  '/ur/biometric-attendance', '/ur/mobile-attendance', '/ur/gps-tracking',
  '/ur/document-management', '/ur/contract-management', '/ur/maintenance-management',
  '/ur/quality-control', '/ur/production-planning', '/ur/bill-of-materials',
  '/ur/job-costing', '/ur/budget-management', '/ur/financial-reports',
  '/ur/bank-reconciliation', '/ur/cheque-management', '/ur/letter-of-credit',
  '/ur/fixed-assets', '/ur/inventory-valuation', '/ur/batch-tracking',
  '/ur/serial-number-tracking', '/ur/barcode-scanning', '/ur/rfid-tracking',
  '/ur/demand-forecasting', '/ur/purchase-requisition', '/ur/vendor-management',
  '/ur/customer-portal', '/ur/vendor-portal', '/ur/sales-pipeline',
  '/ur/quotation-management', '/ur/sales-orders', '/ur/delivery-notes',
  '/ur/returns-management', '/ur/commission-management', '/ur/loyalty-program',
]

// Valid Schema.org types and their required/optional properties
const SCHEMA_DEFINITIONS = {
  Organization: {
    required: ['@type', 'name'],
    optional: ['@id', 'url', 'logo', 'description', 'sameAs', 'address', 'contactPoint', 'foundingDate', 'numberOfEmployees', 'areaServed'],
  },
  WebSite: {
    required: ['@type', 'name', 'url'],
    optional: ['@id', 'description', 'publisher', 'potentialAction', 'inLanguage'],
  },
  WebPage: {
    required: ['@type', 'name', 'url'],
    optional: ['@id', 'description', 'isPartOf', 'breadcrumb', 'mainEntity', 'inLanguage', 'datePublished', 'dateModified', 'author', 'publisher'],
  },
  SoftwareApplication: {
    required: ['@type', 'name', 'applicationCategory'],
    optional: ['@id', 'operatingSystem', 'offers', 'provider', 'url', 'description', 'aggregateRating', 'screenshot'],
  },
  Service: {
    required: ['@type', 'name'],
    optional: ['@id', 'description', 'serviceType', 'provider', 'areaServed', 'audience', 'availableLanguage', 'offers', 'url'],
  },
  FAQPage: {
    required: ['@type', 'mainEntity'],
    optional: ['@id', 'name', 'description', 'url'],
  },
  Question: {
    required: ['@type', 'name', 'acceptedAnswer'],
    optional: ['text', 'author', 'dateCreated'],
    invalid: ['inLanguage'], // inLanguage is NOT valid on Question
  },
  Answer: {
    required: ['@type', 'text'],
    optional: ['inLanguage', 'author', 'dateCreated', 'upvoteCount'],
  },
  BreadcrumbList: {
    required: ['@type', 'itemListElement'],
    optional: ['@id', 'name'],
  },
  ListItem: {
    required: ['@type', 'position'],
    optional: ['item', 'name', 'url'],
  },
  ItemList: {
    required: ['@type', 'itemListElement'],
    optional: ['@id', 'name', 'itemListOrder', 'numberOfItems', 'description'],
    invalid: ['inLanguage'], // inLanguage is NOT valid on ItemList
  },
  HowTo: {
    required: ['@type', 'name', 'step'],
    optional: ['@id', 'description', 'totalTime', 'estimatedCost', 'supply', 'tool'],
  },
  HowToStep: {
    required: ['@type', 'text'],
    optional: ['name', 'url', 'image', 'position'],
  },
  Offer: {
    required: ['@type', 'price', 'priceCurrency'],
    optional: ['availability', 'url', 'priceValidUntil', 'seller', 'itemCondition'],
  },
  Country: {
    required: ['@type', 'name'],
    optional: ['@id', 'url'],
  },
  Audience: {
    required: ['@type', 'audienceType'],
    optional: ['@id', 'name', 'geographicArea'],
  },
  SearchAction: {
    required: ['@type', 'target', 'query-input'],
    optional: ['name', 'description'],
  },
}

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true })
}

// Collect all HTML files
function getAllHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      getAllHtmlFiles(fullPath, files)
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath)
    }
  }
  return files
}

// Parse JSON-LD from HTML
function extractJsonLd(html) {
  const schemas = []
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1])
      schemas.push(parsed)
    } catch (e) {
      schemas.push({ error: 'Invalid JSON', raw: match[1].slice(0, 200) })
    }
  }
  return schemas
}

// Extract canonical URL
function extractCanonical(html) {
  const match = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
  return match ? match[1] : null
}

// Extract hreflang tags
function extractHreflang(html) {
  const hreflangs = []
  const regex = /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["']/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    hreflangs.push({ lang: match[1], href: match[2] })
  }
  // Also check reverse order
  const regex2 = /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["']/gi
  while ((match = regex2.exec(html)) !== null) {
    hreflangs.push({ lang: match[2], href: match[1] })
  }
  return hreflangs
}

// Extract internal links
function extractInternalLinks(html, baseUrl) {
  const links = new Set()
  const regex = /href=["']([^"']+)["']/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    const href = match[1]
    if (href.startsWith('/') && !href.startsWith('//')) {
      links.add(href.split('#')[0].split('?')[0])
    } else if (href.startsWith(baseUrl)) {
      const path = href.replace(baseUrl, '').split('#')[0].split('?')[0]
      links.add(path || '/')
    }
  }
  return Array.from(links)
}

// Extract referenced assets
function extractAssets(html) {
  const assets = []
  // JS files
  const jsRegex = /<script[^>]*src=["']([^"']+)["']/gi
  let match
  while ((match = jsRegex.exec(html)) !== null) {
    if (!match[1].startsWith('http')) assets.push(match[1])
  }
  // CSS files
  const cssRegex = /<link[^>]*href=["']([^"']+\.css[^"']*)["']/gi
  while ((match = cssRegex.exec(html)) !== null) {
    if (!match[1].startsWith('http')) assets.push(match[1])
  }
  // Images
  const imgRegex = /<img[^>]*src=["']([^"']+)["']/gi
  while ((match = imgRegex.exec(html)) !== null) {
    if (!match[1].startsWith('http') && !match[1].startsWith('data:')) assets.push(match[1])
  }
  return assets
}

// Validate schema properties
function validateSchemaNode(node, errors, path = '') {
  if (!node || typeof node !== 'object') return
  
  const type = node['@type']
  if (!type) return
  
  const def = SCHEMA_DEFINITIONS[type]
  if (!def) return // Unknown type, skip
  
  // Check for invalid properties
  if (def.invalid) {
    for (const prop of def.invalid) {
      if (node[prop] !== undefined) {
        errors.push({
          path: path || type,
          error: `Invalid property "${prop}" on ${type}`,
          severity: 'error',
        })
      }
    }
  }
  
  // Check required properties
  for (const prop of def.required) {
    if (node[prop] === undefined) {
      errors.push({
        path: path || type,
        error: `Missing required property "${prop}" on ${type}`,
        severity: 'error',
      })
    }
  }
  
  // Recursively validate nested objects
  for (const [key, value] of Object.entries(node)) {
    if (Array.isArray(value)) {
      value.forEach((item, i) => validateSchemaNode(item, errors, `${path || type}.${key}[${i}]`))
    } else if (typeof value === 'object' && value !== null) {
      validateSchemaNode(value, errors, `${path || type}.${key}`)
    }
  }
}

// Validate entire schema graph
function validateSchema(schemas) {
  const errors = []
  const declaredIds = new Set()
  const duplicateIds = []
  
  // Only count @id declarations (nodes with BOTH @id AND @type)
  // References (objects with only @id) are NOT duplicates
  function collectDeclaredIds(node) {
    if (!node || typeof node !== 'object') return
    // Only count as declaration if it has both @id AND @type
    if (node['@id'] && node['@type']) {
      if (declaredIds.has(node['@id'])) {
        duplicateIds.push(node['@id'])
      }
      declaredIds.add(node['@id'])
    }
    if (node['@graph']) {
      node['@graph'].forEach(collectDeclaredIds)
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) {
        value.forEach(collectDeclaredIds)
      } else if (typeof value === 'object') {
        collectDeclaredIds(value)
      }
    }
  }
  
  function validateNodes(node) {
    if (!node || typeof node !== 'object') return
    validateSchemaNode(node, errors)
    if (node['@graph']) {
      node['@graph'].forEach(validateNodes)
    }
  }
  
  for (const schema of schemas) {
    if (schema.error) {
      errors.push({ error: schema.error, severity: 'error' })
      continue
    }
    collectDeclaredIds(schema)
    validateNodes(schema)
  }
  
  if (duplicateIds.length > 0) {
    errors.push({
      error: `Duplicate @id declarations found: ${duplicateIds.join(', ')}`,
      severity: 'error',
    })
  }
  
  return { errors, ids: Array.from(declaredIds), duplicateIds }
}

// Check if page has FAQ content
function hasFaqContent(html) {
  // Check for FAQ section markers
  const hasFaqSection = html.includes('id="faq"') || 
                        html.includes('class="faq') ||
                        html.includes('data-section="faq"') ||
                        /class="[^"]*accordion[^"]*"/i.test(html)
  return hasFaqSection
}

// Get schema types from schemas
function getSchemaTypes(schemas) {
  const types = new Set()
  function collect(node) {
    if (!node || typeof node !== 'object') return
    if (node['@type']) types.add(node['@type'])
    if (node['@graph']) node['@graph'].forEach(collect)
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(collect)
      else if (typeof value === 'object') collect(value)
    }
  }
  schemas.forEach(collect)
  return Array.from(types)
}

// Main audit function
async function runAudit() {
  console.log('Starting Comprehensive Regression Audit...\n')
  
  const htmlFiles = getAllHtmlFiles(DIST)
  console.log(`Found ${htmlFiles.length} HTML files\n`)
  
  const BASE_URL = 'https://diwansuite.com'
  
  // Reports data structures
  const schemaValidationReport = {
    timestamp: new Date().toISOString(),
    totalPages: htmlFiles.length,
    pagesWithErrors: 0,
    totalErrors: 0,
    pages: [],
  }
  
  const ahrefsUrlMap = []
  const internalLinkReport = {
    timestamp: new Date().toISOString(),
    totalLinks: 0,
    brokenLinks: [],
    validLinks: 0,
  }
  const canonicalHreflangReport = {
    timestamp: new Date().toISOString(),
    totalPages: htmlFiles.length,
    issues: [],
  }
  const assetReport = {
    timestamp: new Date().toISOString(),
    totalAssets: 0,
    missingAssets: [],
    validAssets: 0,
  }
  
  const allInternalLinks = new Set()
  const allCanonicals = new Set()
  const allHreflangs = new Map()
  const allAssets = new Set()
  const allGeneratedPaths = new Set()
  const faqSchemaPages = []
  const breadcrumbIssues = []
  const allIds = new Map() // Track @ids across all pages for global duplicate check
  
  // Process each HTML file
  for (const file of htmlFiles) {
    const relativePath = path.relative(DIST, file)
    let urlPath = '/' + relativePath.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\\/g, '/')
    if (urlPath.endsWith('/')) urlPath = urlPath.slice(0, -1) || '/'
    
    allGeneratedPaths.add(urlPath)
    
    const html = fs.readFileSync(file, 'utf-8')
    const fileSize = fs.statSync(file).size
    const schemas = extractJsonLd(html)
    const canonical = extractCanonical(html)
    const hreflangs = extractHreflang(html)
    const links = extractInternalLinks(html, BASE_URL)
    const assets = extractAssets(html)
    
    links.forEach(l => allInternalLinks.add(l))
    assets.forEach(a => allAssets.add(a))
    if (canonical) allCanonicals.add(canonical)
    
    // Validate schema
    const validation = validateSchema(schemas)
    const schemaTypes = getSchemaTypes(schemas)
    
    // Track global @ids
    for (const id of validation.ids) {
      const existing = allIds.get(id)
      if (existing) {
        allIds.set(id, [...existing, urlPath])
      } else {
        allIds.set(id, [urlPath])
      }
    }
    
    const pageReport = {
      url: urlPath,
      file: relativePath,
      fileSize,
      schemaTypes,
      ids: validation.ids,
      errors: validation.errors,
      valid: validation.errors.length === 0,
    }
    
    schemaValidationReport.pages.push(pageReport)
    if (validation.errors.length > 0) {
      schemaValidationReport.pagesWithErrors++
      schemaValidationReport.totalErrors += validation.errors.length
    }
    
    // Check FAQ schema vs content
    const hasFaq = schemaTypes.includes('FAQPage')
    const hasFaqHtml = hasFaqContent(html)
    if (hasFaq) {
      faqSchemaPages.push({ url: urlPath, hasVisibleFaq: hasFaqHtml })
    }
    
    // Check BreadcrumbList
    if (schemaTypes.includes('BreadcrumbList')) {
      const breadcrumbSchema = schemas.find(s => 
        s['@type'] === 'BreadcrumbList' || 
        (s['@graph'] && s['@graph'].some(n => n['@type'] === 'BreadcrumbList'))
      )
      // Verify breadcrumb has itemListElement
      let breadcrumbNode = breadcrumbSchema?.['@type'] === 'BreadcrumbList' 
        ? breadcrumbSchema 
        : breadcrumbSchema?.['@graph']?.find(n => n['@type'] === 'BreadcrumbList')
      
      if (breadcrumbNode && (!breadcrumbNode.itemListElement || breadcrumbNode.itemListElement.length === 0)) {
        breadcrumbIssues.push({ url: urlPath, issue: 'Empty itemListElement' })
      }
    }
    
    // Canonical/hreflang alignment
    const expectedCanonical = BASE_URL + urlPath
    if (canonical && canonical !== expectedCanonical && canonical !== expectedCanonical + '/') {
      canonicalHreflangReport.issues.push({
        url: urlPath,
        issue: 'Canonical mismatch',
        expected: expectedCanonical,
        actual: canonical,
      })
    }
    
    // Check Ahrefs URL mapping
    const isAhrefsUrl = AHREFS_AFFECTED_URLS.includes(urlPath)
    if (isAhrefsUrl) {
      ahrefsUrlMap.push({
        ahrefsUrl: BASE_URL + urlPath,
        generatedFile: relativePath,
        schemaTypes: schemaTypes.join(', '),
        validationResult: validation.errors.length === 0 ? 'PASS' : 'FAIL',
        errorCount: validation.errors.length,
        status: validation.errors.length === 0 ? 'FIXED' : 'NEEDS_ATTENTION',
      })
    }
  }
  
  // Check for global duplicate @ids
  const globalDuplicateIds = []
  for (const [id, pages] of allIds.entries()) {
    // Allow same @id on different language versions of same page
    const uniquePages = [...new Set(pages.map(p => p.replace(/^\/(ar|en|hi|ur)/, '')))]
    if (uniquePages.length > 1) {
      globalDuplicateIds.push({ id, pages })
    }
  }
  
  if (globalDuplicateIds.length > 0) {
    schemaValidationReport.globalDuplicateIds = globalDuplicateIds
  }
  
  // Validate internal links
  // The site uses /ar/... URLs but files are at /lang/ar/...
  // Map URL paths to file system paths
  const LANG_CODES = ['ar', 'en', 'hi', 'ur']
  
  for (const link of allInternalLinks) {
    const normalizedLink = link.replace(/\/$/, '') || '/'
    
    // Map /ar/... to /lang/ar/... for file lookup
    let fsPath = normalizedLink
    for (const lang of LANG_CODES) {
      if (normalizedLink === `/${lang}` || normalizedLink.startsWith(`/${lang}/`)) {
        fsPath = `/lang${normalizedLink}`
        break
      }
    }
    
    // Check if the URL path matches generated paths (accounting for /lang/ prefix)
    const matchesGenerated = allGeneratedPaths.has(normalizedLink) || 
                             allGeneratedPaths.has(normalizedLink + '/') ||
                             allGeneratedPaths.has(fsPath) ||
                             allGeneratedPaths.has(fsPath + '/')
    
    if (!matchesGenerated) {
      // Check if file exists with various path patterns
      const possiblePaths = [
        path.join(DIST, fsPath, 'index.html'),
        path.join(DIST, fsPath + '.html'),
        path.join(DIST, fsPath.slice(1), 'index.html'),
        path.join(DIST, fsPath.slice(1) + '.html'),
        // Also check without /lang/ prefix for assets
        path.join(DIST, normalizedLink.slice(1)),
        path.join(DIST, normalizedLink.slice(1), 'index.html'),
      ]
      const exists = possiblePaths.some(p => fs.existsSync(p))
      if (!exists) {
        internalLinkReport.brokenLinks.push(link)
      } else {
        internalLinkReport.validLinks++
      }
    } else {
      internalLinkReport.validLinks++
    }
  }
  internalLinkReport.totalLinks = allInternalLinks.size
  
  // Validate assets
  for (const asset of allAssets) {
    const assetPath = path.join(DIST, asset.startsWith('/') ? asset.slice(1) : asset)
    if (fs.existsSync(assetPath)) {
      assetReport.validAssets++
    } else {
      assetReport.missingAssets.push(asset)
    }
  }
  assetReport.totalAssets = allAssets.size
  
  // Validate sitemap
  const sitemapPath = path.join(DIST, 'sitemap.xml')
  const sitemapReport = {
    timestamp: new Date().toISOString(),
    exists: fs.existsSync(sitemapPath),
    totalUrls: 0,
    missingPages: [],
    extraPages: [],
  }
  
  if (sitemapReport.exists) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8')
    const sitemapUrls = []
    const locRegex = /<loc>([^<]+)<\/loc>/g
    let match
    while ((match = locRegex.exec(sitemapContent)) !== null) {
      sitemapUrls.push(match[1])
    }
    sitemapReport.totalUrls = sitemapUrls.length
    
    // Check if all sitemap URLs have generated pages
    for (const url of sitemapUrls) {
      const urlPath = url.replace(BASE_URL, '').replace(/\/$/, '') || '/'
      if (!allGeneratedPaths.has(urlPath)) {
        sitemapReport.missingPages.push(url)
      }
    }
    
    // Check if all generated pages are in sitemap (except special pages)
    const sitemapPaths = new Set(sitemapUrls.map(u => u.replace(BASE_URL, '').replace(/\/$/, '') || '/'))
    for (const genPath of allGeneratedPaths) {
      if (!sitemapPaths.has(genPath) && !genPath.includes('404')) {
        sitemapReport.extraPages.push(genPath)
      }
    }
  }
  
  // Add FAQ and breadcrumb analysis to schema report
  schemaValidationReport.faqAnalysis = {
    pagesWithFaqSchema: faqSchemaPages.length,
    faqSchemaWithoutContent: faqSchemaPages.filter(p => !p.hasVisibleFaq),
    details: faqSchemaPages,
  }
  schemaValidationReport.breadcrumbIssues = breadcrumbIssues
  
  // Coverage analysis
  const ahrefsCoverage = {
    totalAhrefsUrls: AHREFS_AFFECTED_URLS.length,
    coveredUrls: ahrefsUrlMap.length,
    uncoveredUrls: AHREFS_AFFECTED_URLS.filter(u => !ahrefsUrlMap.some(m => m.ahrefsUrl === BASE_URL + u)),
    allFixed: ahrefsUrlMap.every(m => m.validationResult === 'PASS'),
    fixedCount: ahrefsUrlMap.filter(m => m.validationResult === 'PASS').length,
    failedCount: ahrefsUrlMap.filter(m => m.validationResult === 'FAIL').length,
  }
  
  // Write reports
  fs.writeFileSync(
    path.join(REPORTS_DIR, 'schema-validation-report.json'),
    JSON.stringify(schemaValidationReport, null, 2)
  )
  
  // Write CSV for Ahrefs URL mapping
  const csvHeader = 'ahrefs_url,generated_file,schema_types,validation_result,error_count,status\n'
  const csvRows = ahrefsUrlMap.map(m => 
    `"${m.ahrefsUrl}","${m.generatedFile}","${m.schemaTypes}","${m.validationResult}",${m.errorCount},"${m.status}"`
  ).join('\n')
  fs.writeFileSync(path.join(REPORTS_DIR, 'ahrefs-url-validation-map.csv'), csvHeader + csvRows)
  
  fs.writeFileSync(
    path.join(REPORTS_DIR, 'internal-link-validation-report.json'),
    JSON.stringify(internalLinkReport, null, 2)
  )
  
  fs.writeFileSync(
    path.join(REPORTS_DIR, 'sitemap-validation-report.json'),
    JSON.stringify(sitemapReport, null, 2)
  )
  
  fs.writeFileSync(
    path.join(REPORTS_DIR, 'canonical-hreflang-validation-report.json'),
    JSON.stringify(canonicalHreflangReport, null, 2)
  )
  
  fs.writeFileSync(
    path.join(REPORTS_DIR, 'asset-validation-report.json'),
    JSON.stringify(assetReport, null, 2)
  )
  
  // Print summary
  console.log('='.repeat(60))
  console.log('REGRESSION AUDIT SUMMARY')
  console.log('='.repeat(60))
  console.log()
  console.log(`Total Pages Validated: ${htmlFiles.length}`)
  console.log(`Pages with Schema Errors: ${schemaValidationReport.pagesWithErrors}`)
  console.log(`Total Schema Errors: ${schemaValidationReport.totalErrors}`)
  console.log()
  console.log('Ahrefs URL Coverage:')
  console.log(`  - Total Ahrefs URLs: ${ahrefsCoverage.totalAhrefsUrls}`)
  console.log(`  - Covered by build: ${ahrefsCoverage.coveredUrls}`)
  console.log(`  - Fixed: ${ahrefsCoverage.fixedCount}`)
  console.log(`  - Failed: ${ahrefsCoverage.failedCount}`)
  console.log()
  console.log('Internal Links:')
  console.log(`  - Total: ${internalLinkReport.totalLinks}`)
  console.log(`  - Valid: ${internalLinkReport.validLinks}`)
  console.log(`  - Broken: ${internalLinkReport.brokenLinks.length}`)
  console.log()
  console.log('Assets:')
  console.log(`  - Total: ${assetReport.totalAssets}`)
  console.log(`  - Valid: ${assetReport.validAssets}`)
  console.log(`  - Missing: ${assetReport.missingAssets.length}`)
  console.log()
  console.log('Sitemap:')
  console.log(`  - Exists: ${sitemapReport.exists}`)
  console.log(`  - URLs: ${sitemapReport.totalUrls}`)
  console.log(`  - Missing Pages: ${sitemapReport.missingPages.length}`)
  console.log()
  console.log('FAQ Schema Analysis:')
  console.log(`  - Pages with FAQPage schema: ${faqSchemaPages.length}`)
  console.log(`  - Without visible FAQ content: ${faqSchemaPages.filter(p => !p.hasVisibleFaq).length}`)
  console.log()
  console.log('Global Duplicate @ids: ' + (globalDuplicateIds.length > 0 ? globalDuplicateIds.length : 'None'))
  console.log()
  console.log('Reports written to: ' + REPORTS_DIR)
  console.log()
  
  // Determine pass/fail
  const passed = 
    schemaValidationReport.totalErrors === 0 &&
    internalLinkReport.brokenLinks.length === 0 &&
    assetReport.missingAssets.length === 0 &&
    sitemapReport.missingPages.length === 0 &&
    globalDuplicateIds.length === 0
  
  if (passed) {
    console.log('✓ ALL VALIDATIONS PASSED')
  } else {
    console.log('✗ SOME VALIDATIONS FAILED - See reports for details')
  }
  
  return {
    passed,
    schemaValidationReport,
    ahrefsCoverage,
    internalLinkReport,
    sitemapReport,
    assetReport,
    canonicalHreflangReport,
    faqSchemaPages,
    breadcrumbIssues,
    globalDuplicateIds,
  }
}

runAudit().catch(console.error)
