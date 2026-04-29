import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const distDir = path.resolve('dist')
const assetsDir = path.join(distDir, 'assets')
const manifestPath = path.join(distDir, '.vite', 'manifest.json')
const thresholds = {
  totalJsGzipKb: 210,
  largestJsGzipKb: 130,
  internalPageChunkGzipKb: 20,
  largestLazyJsGzipKb: 22,
  totalCssGzipKb: 12,
  totalWebpKb: 500,
  largestWebpKb: 180,
}

function listFiles(dir, predicate) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .map((file) => path.join(dir, file))
    .filter((file) => fs.statSync(file).isFile() && predicate(file))
}
function toKb(bytes) { return Number((bytes / 1024).toFixed(2)) }
function gzipSize(file) { return zlib.gzipSync(fs.readFileSync(file)).length }

function readManifest() {
  if (!fs.existsSync(manifestPath)) return null
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
}

function getInitialEntryJsFiles(manifest) {
  if (!manifest) return listFiles(assetsDir, (file) => file.endsWith('.js'))
  const seen = new Set()
  const files = []
  const rootDynamic = new Set((manifest['index.html']?.dynamicImports || []).map((key) => key))
  function walk(key) {
    const entry = manifest[key]
    if (!entry || seen.has(key) || rootDynamic.has(key)) return
    seen.add(key)
    if (entry.file?.endsWith('.js')) files.push(path.join(distDir, entry.file))
    for (const dep of entry.imports || []) walk(dep)
  }
  walk('index.html')
  return files.filter((f) => fs.existsSync(f))
}

function getLazyJsFiles(manifest, initialFiles) {
  const initialSet = new Set(initialFiles.map((file) => path.basename(file)))
  const allJs = listFiles(assetsDir, (file) => file.endsWith('.js'))
  return allJs.filter((file) => !initialSet.has(path.basename(file)))
}

const manifest = readManifest()
const initialJsFiles = getInitialEntryJsFiles(manifest)
const lazyJsFiles = getLazyJsFiles(manifest, initialJsFiles)
const internalPageChunk = lazyJsFiles.find((file) => path.basename(file).includes('internal-pages'))
const allCssFiles = listFiles(assetsDir, (file) => file.endsWith('.css'))
const webpFiles = listFiles(distDir, (file) => file.endsWith('.webp'))

const metrics = {
  js: initialJsFiles.map((file) => ({ file: path.basename(file), sizeKb: toKb(fs.statSync(file).size), gzipKb: toKb(gzipSize(file)) })),
  lazyJs: lazyJsFiles.map((file) => ({ file: path.basename(file), sizeKb: toKb(fs.statSync(file).size), gzipKb: toKb(gzipSize(file)) })),
  css: allCssFiles.map((file) => ({ file: path.basename(file), sizeKb: toKb(fs.statSync(file).size), gzipKb: toKb(gzipSize(file)) })),
  webp: webpFiles.map((file) => ({ file: path.basename(file), sizeKb: toKb(fs.statSync(file).size) })),
}

const summary = {
  totalJsGzipKb: Number(metrics.js.reduce((sum, file) => sum + file.gzipKb, 0).toFixed(2)),
  largestJsGzipKb: Math.max(0, ...metrics.js.map((file) => file.gzipKb)),
  internalPageChunkGzipKb: internalPageChunk ? toKb(gzipSize(internalPageChunk)) : 0,
  largestLazyJsGzipKb: Math.max(0, ...metrics.lazyJs.map((file) => file.gzipKb)),
  totalCssGzipKb: Number(metrics.css.reduce((sum, file) => sum + file.gzipKb, 0).toFixed(2)),
  totalWebpKb: Number(metrics.webp.reduce((sum, file) => sum + file.sizeKb, 0).toFixed(2)),
  largestWebpKb: Math.max(0, ...metrics.webp.map((file) => file.sizeKb)),
}

const failures = [
  ['totalJsGzipKb', summary.totalJsGzipKb > thresholds.totalJsGzipKb],
  ['largestJsGzipKb', summary.largestJsGzipKb > thresholds.largestJsGzipKb],
  ['internalPageChunkGzipKb', summary.internalPageChunkGzipKb > thresholds.internalPageChunkGzipKb],
  ['largestLazyJsGzipKb', summary.largestLazyJsGzipKb > thresholds.largestLazyJsGzipKb],
  ['totalCssGzipKb', summary.totalCssGzipKb > thresholds.totalCssGzipKb],
  ['totalWebpKb', summary.totalWebpKb > thresholds.totalWebpKb],
  ['largestWebpKb', summary.largestWebpKb > thresholds.largestWebpKb],
].filter(([, failed]) => failed).map(([name]) => name)

const report = {
  thresholds,
  summary,
  failures,
  metrics,
  note: 'Budgets now validate both the initial home-route graph and lazy route chunks, including the internal-pages chunk used by public content pages.',
}
fs.writeFileSync(path.join(distDir, 'performance-budget.json'), JSON.stringify(report, null, 2))

if (failures.length > 0) {
  console.error('[BUDGET] Failed:', failures.join(', '))
  process.exit(1)
}
console.log('[BUDGET] Passed')
