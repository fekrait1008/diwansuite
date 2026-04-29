import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const sourceDir = fileURLToPath(new URL('../assets-src/og/', import.meta.url))
const publicDir = fileURLToPath(new URL('../public/', import.meta.url))

const targets = [
  { input: 'home-source.webp', output: 'og-home.webp', width: 1200, height: 630, quality: 74 },
  { input: 'about-source.webp', output: 'og-about.webp', width: 1200, height: 630, quality: 72 },
  { input: 'privacy-source.webp', output: 'og-privacy.webp', width: 1200, height: 630, quality: 72 },
  { input: 'terms-source.webp', output: 'og-terms.webp', width: 1200, height: 630, quality: 72 },
]

function shouldGenerate(inputFile, outputFile) {
  if (!fs.existsSync(outputFile)) {
    return true
  }

  return fs.statSync(inputFile).mtimeMs > fs.statSync(outputFile).mtimeMs
}

let generatedCount = 0

for (const { input, output, width, height, quality } of targets) {
  const inputFile = path.join(sourceDir, input)
  const outputFile = path.join(publicDir, output)

  if (!shouldGenerate(inputFile, outputFile)) {
    continue
  }

  await sharp(inputFile)
    .resize(width, height, { fit: 'cover', position: 'attention' })
    .webp({ quality, effort: 6 })
    .toFile(outputFile)

  generatedCount += 1
}

const homeImage = path.join(publicDir, 'og-home.webp')
const socialFallback = path.join(publicDir, 'og-image.webp')

if (shouldGenerate(homeImage, socialFallback)) {
  fs.copyFileSync(homeImage, socialFallback)
}

const totalKb = fs
  .readdirSync(publicDir)
  .filter((file) => file.endsWith('.webp'))
  .reduce((sum, file) => sum + fs.statSync(path.join(publicDir, file)).size, 0) / 1024

console.log(`[OK] optimized OG assets (${Math.round(totalKb)} KB total, ${generatedCount} regenerated)`)
