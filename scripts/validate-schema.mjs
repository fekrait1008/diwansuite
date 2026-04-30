/**
 * Schema.org Validation Script
 * 
 * Validates all JSON-LD structured data in the generated dist folder.
 * This script ensures schema compliance before deployment.
 * 
 * Usage: node scripts/validate-schema.mjs
 * 
 * Exit codes:
 *   0 - All validations passed
 *   1 - Validation errors found
 */

import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist')
const langDir = path.join(distDir, 'lang')
const reportPath = path.join(distDir, 'schema-validation-report.json')

const SUPPORTED_LANGS = ['ar', 'en', 'hi', 'ur']

// Valid schema.org types we use
const VALID_TYPES = new Set([
  'Organization',
  'WebSite',
  'WebPage',
  'BreadcrumbList',
  'ListItem',
  'FAQPage',
  'Question',
  'Answer',
  'Service',
  'SoftwareApplication',
  'ItemList',
  'Offer',
  'ImageObject',
  'ContactPoint',
  'PostalAddress',
  'Audience',
  'Country',
])

// Required properties by type
const REQUIRED_PROPERTIES = {
  Organization: ['name', 'url'],
  WebSite: ['url', 'name'],
  WebPage: ['url', 'name'],
  BreadcrumbList: ['itemListElement'],
  ListItem: ['position'],
  FAQPage: ['mainEntity'],
  Question: ['name', 'acceptedAnswer'],
  Answer: ['text'],
  Service: ['name', 'provider'],
  SoftwareApplication: ['name', 'applicationCategory'],
  ItemList: ['itemListElement'],
}

// Properties that are invalid on certain types
const INVALID_PROPERTIES = {
  Question: ['inLanguage'], // inLanguage is only valid on Answer, not Question
  ItemList: ['inLanguage'], // inLanguage is not a standard ItemList property
}

function walkHtmlFiles(dir) {
  const files = []
  if (!fs.existsSync(dir)) return files
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walkHtmlFiles(fullPath))
    else if (entry.isFile() && entry.name === 'index.html') files.push(fullPath)
  }
  return files
}

function extractJsonLdBlocks(html) {
  const blocks = []
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  let match
  while ((match = regex.exec(html)) !== null) {
    blocks.push(match[1])
  }
  return blocks
}

function parseJsonLd(jsonString) {
  try {
    return { success: true, data: JSON.parse(jsonString) }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

function validateNode(node, errors, pageUrl) {
  if (!node || typeof node !== 'object') return

  const type = node['@type']
  const nodeId = node['@id'] || 'unknown'

  // Check if type is valid
  if (type && !VALID_TYPES.has(type)) {
    errors.push({
      type: 'unknown_type',
      message: `Unknown schema.org type: ${type}`,
      nodeId,
      pageUrl,
    })
  }

  // Check required properties
  if (type && REQUIRED_PROPERTIES[type]) {
    for (const prop of REQUIRED_PROPERTIES[type]) {
      if (!(prop in node) || node[prop] === null || node[prop] === undefined) {
        errors.push({
          type: 'missing_required_property',
          message: `${type} missing required property: ${prop}`,
          nodeId,
          pageUrl,
        })
      }
    }
  }

  // Check for invalid properties
  if (type && INVALID_PROPERTIES[type]) {
    for (const prop of INVALID_PROPERTIES[type]) {
      if (prop in node) {
        errors.push({
          type: 'invalid_property',
          message: `${type} has invalid property: ${prop}`,
          nodeId,
          pageUrl,
        })
      }
    }
  }

  // Validate @id format (should be a valid URL or URL fragment)
  if (node['@id']) {
    const id = node['@id']
    if (!id.startsWith('http') && !id.startsWith('#')) {
      errors.push({
        type: 'invalid_id_format',
        message: `Invalid @id format: ${id}`,
        nodeId,
        pageUrl,
      })
    }
  }

  // Validate URL properties
  const urlProps = ['url', 'item', 'logo', 'image']
  for (const prop of urlProps) {
    if (node[prop]) {
      const url = typeof node[prop] === 'string' ? node[prop] : node[prop].url
      if (url && typeof url === 'string' && !url.startsWith('http') && !url.startsWith('/') && !url.startsWith('#')) {
        errors.push({
          type: 'invalid_url',
          message: `Invalid URL in ${prop}: ${url}`,
          nodeId,
          pageUrl,
        })
      }
    }
  }

  // BreadcrumbList specific validations
  if (type === 'BreadcrumbList') {
    const elements = node.itemListElement || []
    const positions = new Set()
    for (const element of elements) {
      if (element.position) {
        if (positions.has(element.position)) {
          errors.push({
            type: 'duplicate_position',
            message: `Duplicate breadcrumb position: ${element.position}`,
            nodeId,
            pageUrl,
          })
        }
        positions.add(element.position)
      }
      validateNode(element, errors, pageUrl)
    }
  }

  // FAQPage specific validations
  if (type === 'FAQPage') {
    const questions = node.mainEntity || []
    if (!Array.isArray(questions)) {
      errors.push({
        type: 'invalid_faq_structure',
        message: 'FAQPage mainEntity must be an array',
        nodeId,
        pageUrl,
      })
    } else {
      for (const question of questions) {
        validateNode(question, errors, pageUrl)
        if (question.acceptedAnswer) {
          validateNode(question.acceptedAnswer, errors, pageUrl)
        }
      }
    }
  }

  // ItemList specific validations
  if (type === 'ItemList') {
    const elements = node.itemListElement || []
    for (const element of elements) {
      validateNode(element, errors, pageUrl)
    }
  }

  // Service specific validations
  if (type === 'Service') {
    if (node.areaServed && Array.isArray(node.areaServed)) {
      for (const area of node.areaServed) {
        validateNode(area, errors, pageUrl)
      }
    }
    if (node.audience && Array.isArray(node.audience)) {
      for (const audience of node.audience) {
        validateNode(audience, errors, pageUrl)
      }
    }
  }

  // SoftwareApplication specific validations
  if (type === 'SoftwareApplication') {
    if (!node['@id']) {
      errors.push({
        type: 'missing_id',
        message: 'SoftwareApplication should have an @id',
        nodeId,
        pageUrl,
      })
    }
    if (node.offers) {
      validateNode(node.offers, errors, pageUrl)
    }
  }

  // Offer specific validations
  if (type === 'Offer') {
    if (node.availability && !node.availability.startsWith('https://schema.org/')) {
      errors.push({
        type: 'invalid_availability',
        message: `Offer availability should be a schema.org URL: ${node.availability}`,
        nodeId,
        pageUrl,
      })
    }
  }
}

function validateGraph(graph, pageUrl) {
  const errors = []
  const ids = new Set()

  if (!Array.isArray(graph)) {
    errors.push({
      type: 'invalid_graph',
      message: '@graph is not an array',
      pageUrl,
    })
    return errors
  }

  // Check for duplicate @ids
  for (const node of graph) {
    if (node['@id']) {
      if (ids.has(node['@id'])) {
        errors.push({
          type: 'duplicate_id',
          message: `Duplicate @id found: ${node['@id']}`,
          pageUrl,
        })
      }
      ids.add(node['@id'])
    }
    validateNode(node, errors, pageUrl)
  }

  // Validate @id references exist
  for (const node of graph) {
    const refs = findIdReferences(node)
    for (const ref of refs) {
      if (ref.startsWith('http') && ref.includes('#') && !ids.has(ref)) {
        // Only warn if the reference is to the same page
        const baseUrl = pageUrl.split('#')[0]
        if (ref.startsWith(baseUrl)) {
          errors.push({
            type: 'broken_id_reference',
            message: `Reference to non-existent @id: ${ref}`,
            pageUrl,
          })
        }
      }
    }
  }

  return errors
}

function findIdReferences(obj, refs = []) {
  if (!obj || typeof obj !== 'object') return refs

  if (obj['@id'] && !obj['@type']) {
    // This is a reference, not a definition
    refs.push(obj['@id'])
  }

  for (const value of Object.values(obj)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        findIdReferences(item, refs)
      }
    } else if (typeof value === 'object') {
      findIdReferences(value, refs)
    }
  }

  return refs
}

function validatePage(filePath) {
  const html = fs.readFileSync(filePath, 'utf8')
  const relativePath = '/' + path.relative(langDir, path.dirname(filePath)).split(path.sep).join('/')
  const jsonLdBlocks = extractJsonLdBlocks(html)

  const pageErrors = []
  let schemaCount = 0

  for (const block of jsonLdBlocks) {
    const parsed = parseJsonLd(block)

    if (!parsed.success) {
      pageErrors.push({
        type: 'json_parse_error',
        message: `Invalid JSON: ${parsed.error}`,
        pageUrl: relativePath,
      })
      continue
    }

    const data = parsed.data

    if (data['@context'] !== 'https://schema.org') {
      pageErrors.push({
        type: 'invalid_context',
        message: `Invalid @context: ${data['@context']}`,
        pageUrl: relativePath,
      })
    }

    if (data['@graph']) {
      schemaCount = data['@graph'].length
      pageErrors.push(...validateGraph(data['@graph'], relativePath))
    }
  }

  return {
    path: relativePath,
    errors: pageErrors,
    schemaCount,
    hasJsonLd: jsonLdBlocks.length > 0,
  }
}

// Main execution
console.log('[Schema Validation] Starting validation...\n')

if (!fs.existsSync(langDir)) {
  console.error('[Schema Validation] dist/lang directory not found. Run build first.')
  process.exit(1)
}

const htmlFiles = walkHtmlFiles(langDir)
const results = []
let totalErrors = 0
let totalPages = 0

for (const file of htmlFiles) {
  const result = validatePage(file)
  results.push(result)
  totalPages++
  totalErrors += result.errors.length
}

// Group errors by type
const errorsByType = {}
for (const result of results) {
  for (const error of result.errors) {
    if (!errorsByType[error.type]) {
      errorsByType[error.type] = []
    }
    errorsByType[error.type].push(error)
  }
}

// Generate report
const report = {
  summary: {
    totalPages,
    pagesWithErrors: results.filter((r) => r.errors.length > 0).length,
    totalErrors,
    errorsByType: Object.fromEntries(
      Object.entries(errorsByType).map(([type, errors]) => [type, errors.length])
    ),
  },
  validationRules: {
    validTypes: Array.from(VALID_TYPES),
    requiredProperties: REQUIRED_PROPERTIES,
    invalidProperties: INVALID_PROPERTIES,
  },
  pagesWithErrors: results
    .filter((r) => r.errors.length > 0)
    .map((r) => ({
      path: r.path,
      errorCount: r.errors.length,
      errors: r.errors,
    })),
  allPages: results.map((r) => ({
    path: r.path,
    hasJsonLd: r.hasJsonLd,
    schemaCount: r.schemaCount,
    errorCount: r.errors.length,
  })),
}

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

// Print summary
console.log('[Schema Validation] Summary:')
console.log(`  Total pages validated: ${totalPages}`)
console.log(`  Pages with errors: ${report.summary.pagesWithErrors}`)
console.log(`  Total errors: ${totalErrors}`)

if (Object.keys(errorsByType).length > 0) {
  console.log('\n[Schema Validation] Errors by type:')
  for (const [type, errors] of Object.entries(errorsByType)) {
    console.log(`  ${type}: ${errors.length}`)
  }
}

if (totalErrors > 0) {
  console.log('\n[Schema Validation] Sample errors:')
  const sampleErrors = results
    .flatMap((r) => r.errors)
    .slice(0, 10)
  for (const error of sampleErrors) {
    console.log(`  - [${error.type}] ${error.message}`)
    console.log(`    Page: ${error.pageUrl}`)
  }
}

console.log(`\n[Schema Validation] Full report written to: ${reportPath}`)

if (totalErrors > 0) {
  console.error(`\n[Schema Validation] FAILED: ${totalErrors} error(s) found`)
  process.exit(1)
}

console.log('\n[Schema Validation] PASSED: All schemas are valid')
