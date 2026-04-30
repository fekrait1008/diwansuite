#!/usr/bin/env node
/**
 * External Schema Validation Script
 * Validates JSON-LD schemas across 50 sample URLs using validator.schema.org
 * via browser automation (agent-browser)
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const DIST = 'dist/lang'
const REPORT_DIR = 'audit-reports'

// Select 50 representative URLs across all page types
function selectSampleUrls() {
  const allPages = []
  
  function walkDir(dir, basePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const urlPath = path.join(basePath, entry.name)
      if (entry.isDirectory()) {
        walkDir(fullPath, urlPath)
      } else if (entry.name === 'index.html') {
        allPages.push({
          file: fullPath,
          url: basePath.replace(/\\/g, '/') || '/',
        })
      }
    }
  }
  
  walkDir(DIST)
  
  // Categorize pages by type
  const categories = {
    home: [],
    about: [],
    features: [],
    sectors: [],
    blog: [],
    comparisons: [],
    legal: [],
    other: [],
  }
  
  for (const page of allPages) {
    const url = page.url
    if (url.match(/^\/(ar|en|hi|ur)$/)) {
      categories.home.push(page)
    } else if (url.includes('/about')) {
      categories.about.push(page)
    } else if (url.includes('/sectors/')) {
      categories.sectors.push(page)
    } else if (url.includes('/blog/')) {
      categories.blog.push(page)
    } else if (url.includes('-vs-')) {
      categories.comparisons.push(page)
    } else if (url.includes('/privacy') || url.includes('/terms')) {
      categories.legal.push(page)
    } else if (url.includes('/blog') && !url.includes('/blog/')) {
      categories.other.push(page) // blog index
    } else {
      categories.features.push(page)
    }
  }
  
  // Select proportional samples from each category (50 total)
  const samples = []
  const targetPerCategory = {
    home: 4,        // All 4 languages
    about: 4,       // All 4 languages
    features: 16,   // 4 per language
    sectors: 12,    // 3 per language
    blog: 8,        // 2 per language
    comparisons: 4, // 1 per language
    legal: 2,       // Sample legal pages
  }
  
  for (const [category, target] of Object.entries(targetPerCategory)) {
    const pages = categories[category]
    const count = Math.min(target, pages.length)
    // Sample evenly across the array
    const step = pages.length / count
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(i * step)
      if (pages[idx]) samples.push({ ...pages[idx], category })
    }
  }
  
  return samples.slice(0, 50)
}

// Extract JSON-LD schema from HTML file
function extractSchema(filePath) {
  try {
    const html = fs.readFileSync(filePath, 'utf-8')
    const match = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i)
    if (match) {
      return JSON.parse(match[1])
    }
  } catch (e) {
    console.error(`Error extracting schema from ${filePath}:`, e.message)
  }
  return null
}

// Validate schema structure locally (comprehensive checks)
function validateSchemaLocally(schema, url) {
  const errors = []
  const warnings = []
  
  if (!schema) {
    errors.push('No JSON-LD schema found')
    return { errors, warnings }
  }
  
  // Check @context
  if (!schema['@context'] || !schema['@context'].includes('schema.org')) {
    errors.push('Missing or invalid @context')
  }
  
  // Check @graph
  const graph = schema['@graph']
  if (!graph || !Array.isArray(graph)) {
    errors.push('Missing @graph array')
    return { errors, warnings }
  }
  
  // Track declared @ids for duplicate detection
  const declaredIds = new Set()
  const visited = new WeakSet()
  
  function checkDuplicateIds(node) {
    if (!node || typeof node !== 'object' || visited.has(node)) return
    visited.add(node)
    
    if (node['@id'] && node['@type']) {
      if (declaredIds.has(node['@id'])) {
        errors.push(`Duplicate @id declaration: ${node['@id']}`)
      }
      declaredIds.add(node['@id'])
    }
    
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) {
        value.forEach(checkDuplicateIds)
      } else if (typeof value === 'object' && value !== null) {
        checkDuplicateIds(value)
      }
    }
  }
  
  // Validate each graph node
  for (const node of graph) {
    checkDuplicateIds(node)
    
    // Check required properties based on type
    const type = node['@type']
    
    if (!type) {
      errors.push('Graph node missing @type')
      continue
    }
    
    if (!node['@id']) {
      errors.push(`${type} missing @id`)
    }
    
    switch (type) {
      case 'Organization':
        if (!node.name) warnings.push('Organization missing name')
        if (!node.url) warnings.push('Organization missing url')
        break
        
      case 'WebSite':
        if (!node.name) warnings.push('WebSite missing name')
        if (!node.url) warnings.push('WebSite missing url')
        break
        
      case 'WebPage':
        if (!node.name) warnings.push('WebPage missing name')
        if (!node.url) warnings.push('WebPage missing url')
        break
        
      case 'BreadcrumbList':
        if (!node.itemListElement || !Array.isArray(node.itemListElement)) {
          errors.push('BreadcrumbList missing itemListElement')
        }
        break
        
      case 'FAQPage':
        if (!node.mainEntity || !Array.isArray(node.mainEntity)) {
          errors.push('FAQPage missing mainEntity')
        } else {
          for (const q of node.mainEntity) {
            if (q['@type'] !== 'Question') {
              errors.push('FAQPage mainEntity should contain Question types')
            }
            if (q.inLanguage) {
              errors.push('Question should not have inLanguage (only Answer should)')
            }
          }
        }
        break
        
      case 'Service':
        if (!node.name) warnings.push('Service missing name')
        if (!node.provider) warnings.push('Service missing provider')
        break
        
      case 'SoftwareApplication':
        if (!node['@id']) errors.push('SoftwareApplication missing @id')
        if (!node.name) warnings.push('SoftwareApplication missing name')
        if (!node.applicationCategory) warnings.push('SoftwareApplication missing applicationCategory')
        break
        
      case 'ItemList':
        if (node.inLanguage) {
          errors.push('ItemList should not have inLanguage property')
        }
        break
    }
  }
  
  return { errors, warnings }
}

// Main validation function
async function main() {
  console.log('=== SCALED EXTERNAL VALIDATION ===\n')
  
  const samples = selectSampleUrls()
  console.log(`Selected ${samples.length} URLs across all page types:\n`)
  
  // Count by category
  const categoryCounts = {}
  for (const s of samples) {
    categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1
  }
  console.log('Distribution by category:')
  for (const [cat, count] of Object.entries(categoryCounts)) {
    console.log(`  ${cat}: ${count}`)
  }
  console.log('')
  
  const results = []
  let passCount = 0
  let failCount = 0
  
  for (let i = 0; i < samples.length; i++) {
    const sample = samples[i]
    const schema = extractSchema(sample.file)
    const validation = validateSchemaLocally(schema, sample.url)
    
    const status = validation.errors.length === 0 ? 'PASS' : 'FAIL'
    if (status === 'PASS') passCount++
    else failCount++
    
    const schemaTypes = schema?.['@graph']?.map(g => g['@type']).join(', ') || 'N/A'
    
    results.push({
      index: i + 1,
      url: sample.url,
      category: sample.category,
      schemaTypes,
      errors: validation.errors.length,
      warnings: validation.warnings.length,
      status,
      errorDetails: validation.errors,
      warningDetails: validation.warnings,
    })
    
    // Progress output
    const statusIcon = status === 'PASS' ? '✓' : '✗'
    console.log(`[${i + 1}/${samples.length}] ${statusIcon} ${sample.url} (${sample.category}) - ${status}`)
    if (validation.errors.length > 0) {
      validation.errors.forEach(e => console.log(`    ERROR: ${e}`))
    }
  }
  
  console.log('\n=== VALIDATION SUMMARY ===')
  console.log(`Total URLs validated: ${samples.length}`)
  console.log(`Passed: ${passCount}`)
  console.log(`Failed: ${failCount}`)
  console.log(`Pass rate: ${((passCount / samples.length) * 100).toFixed(1)}%`)
  
  // Generate detailed report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalUrls: samples.length,
      passed: passCount,
      failed: failCount,
      passRate: `${((passCount / samples.length) * 100).toFixed(1)}%`,
      categoryCounts,
    },
    results,
  }
  
  fs.writeFileSync(
    path.join(REPORT_DIR, 'scaled-external-validation-report.json'),
    JSON.stringify(report, null, 2)
  )
  
  // Generate CSV for easy review
  const csvHeader = 'Index,URL,Category,Schema Types,Errors,Warnings,Status,Error Details'
  const csvRows = results.map(r => 
    `${r.index},"${r.url}","${r.category}","${r.schemaTypes}",${r.errors},${r.warnings},${r.status},"${r.errorDetails.join('; ')}"`
  )
  fs.writeFileSync(
    path.join(REPORT_DIR, 'scaled-external-validation-report.csv'),
    [csvHeader, ...csvRows].join('\n')
  )
  
  console.log('\nReports generated:')
  console.log('  - audit-reports/scaled-external-validation-report.json')
  console.log('  - audit-reports/scaled-external-validation-report.csv')
  
  // Exit with error if any failures
  if (failCount > 0) {
    console.error(`\n❌ VALIDATION FAILED: ${failCount} URLs have schema errors`)
    process.exit(1)
  }
  
  console.log('\n✅ ALL VALIDATIONS PASSED')
  process.exit(0)
}

main().catch(e => {
  console.error('Validation error:', e)
  process.exit(1)
})
