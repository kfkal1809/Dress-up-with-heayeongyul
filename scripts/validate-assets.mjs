import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const itemsPath = resolve(root, 'src/data/items.ts')
const source = readFileSync(itemsPath, 'utf8')
const assetPaths = [...new Set(source.match(/\/assets\/sprites\/[A-Za-z0-9._-]+\.png/g) ?? [])]

if (assetPaths.length === 0) {
  throw new Error('No dress-up PNG assets are referenced from src/data/items.ts')
}

const missing = []
const invalid = []

for (const assetPath of assetPaths) {
  const filePath = resolve(root, 'public', assetPath.slice(1))
  if (!existsSync(filePath)) {
    missing.push(assetPath)
    continue
  }

  const file = readFileSync(filePath)
  const isPng = file.length >= 24 && file.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  if (!isPng) {
    invalid.push(`${assetPath} (invalid PNG)`)
    continue
  }

  const width = file.readUInt32BE(16)
  const height = file.readUInt32BE(20)
  if (width <= 0 || height <= 0) invalid.push(`${assetPath} (${width}x${height})`)
}

if (missing.length || invalid.length) {
  const details = [
    missing.length ? `Missing assets:\n${missing.map((p) => `- ${p}`).join('\n')}` : '',
    invalid.length ? `Invalid assets:\n${invalid.map((p) => `- ${p}`).join('\n')}` : '',
  ].filter(Boolean).join('\n\n')
  throw new Error(`Dress-up asset validation failed.\n${details}`)
}

console.log(`Validated ${assetPaths.length} uploaded dress-up PNG atlases.`)
