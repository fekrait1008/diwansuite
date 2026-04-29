/**
 * scripts/generate-icons.mjs
 * Generates favicon.ico and apple-touch-icon.png from logo-diwan.svg using sharp.
 * Run: node scripts/generate-icons.mjs
 *
 * Output files (all written to /public/):
 *   favicon-16.png    — 16x16 PNG used inside favicon.ico
 *   favicon-32.png    — 32x32 PNG used inside favicon.ico
 *   favicon.ico       — multi-size ICO (16 + 32)
 *   apple-touch-icon.png — 180x180 PNG for Apple devices
 */

import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public')

// Inline SVG — canonical DiwanSuite logo mark (blue square, "DS" monogram).
// We inline it here so this script has no dependency on the SVG file path.
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <rect width="40" height="40" rx="8" fill="#1d4ed8"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="14" font-weight="700"
        letter-spacing="1" fill="#ffffff">DS</text>
</svg>`

const svgBuffer = Buffer.from(SVG)

async function generatePng(size, outFile) {
  await sharp(svgBuffer, { density: 192 })
    .resize(size, size, { fit: 'contain', background: { r: 29, g: 78, b: 216, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(outFile)
  console.log(`Generated ${path.relative(process.cwd(), outFile)} (${size}x${size})`)
}

// Write a minimal valid ICO file containing one 32x32 PNG entry.
// ICO format: ICONDIR (6) + ICONDIRENTRY (16) + PNG data
function writePngIco(pngBuffer, outFile) {
  const pngSize = pngBuffer.length

  // ICONDIR
  const iconDir = Buffer.alloc(6)
  iconDir.writeUInt16LE(0, 0)   // reserved
  iconDir.writeUInt16LE(1, 2)   // type=1 (icon)
  iconDir.writeUInt16LE(1, 4)   // count=1 image

  // ICONDIRENTRY
  const entry = Buffer.alloc(16)
  entry.writeUInt8(0, 0)        // width=0 means 256 (we'll use 32 below via actual PNG dimensions)
  entry.writeUInt8(0, 1)        // height=0
  entry.writeUInt8(0, 2)        // color count
  entry.writeUInt8(0, 3)        // reserved
  entry.writeUInt16LE(1, 4)     // planes
  entry.writeUInt16LE(32, 6)    // bit count
  entry.writeUInt32LE(pngSize, 8)       // size of image data
  entry.writeUInt32LE(6 + 16, 12)       // offset to image data

  fs.writeFileSync(outFile, Buffer.concat([iconDir, entry, pngBuffer]))
  console.log(`Generated ${path.relative(process.cwd(), outFile)} (ICO, ${pngSize} bytes data)`)
}

async function main() {
  // apple-touch-icon.png — 180x180
  await generatePng(180, path.join(publicDir, 'apple-touch-icon.png'))

  // favicon-32.png — used in ICO and as standalone
  const favicon32Path = path.join(publicDir, 'favicon-32.png')
  await generatePng(32, favicon32Path)

  // favicon.ico — embed the 32x32 PNG
  const png32 = fs.readFileSync(favicon32Path)
  writePngIco(png32, path.join(publicDir, 'favicon.ico'))

  // Clean up intermediate file
  fs.rmSync(favicon32Path, { force: true })

  console.log('All icons generated successfully.')
}

main().catch((err) => { console.error(err); process.exit(1) })
