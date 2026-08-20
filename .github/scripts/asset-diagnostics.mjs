import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const ROOT = process.cwd()
const assetNames = [
  'haenam-hair.png',
  'haenyeo-hair.png',
  'haenam-sailor-outfits.png',
  'haenam-engineer-outfits.png',
  'haenam-items.png',
  'haenam-extra-outfits.png',
  'haenam-wedding-outfits.png',
  'haenyeo-outfits.png',
  'haenyeo-items.png',
  'haenyeo-extra-outfits.png',
  'haenyeo-wedding-outfits.png',
  'haenam-extra-items.png',
  'haenyeo-extra-items.png',
  'wedding-items.png',
]

function analyzePng(name) {
  const filePath = path.join(ROOT, 'public', 'assets', 'sprites', name)
  const buffer = fs.readFileSync(filePath)
  const signature = Buffer.from([137,80,78,71,13,10,26,10])
  const hasPngSignature = buffer.length >= 24 && buffer.subarray(0, 8).equals(signature)
  const result = {
    file: name,
    bytes: buffer.length,
    hasPngSignature,
    width: hasPngSignature ? buffer.readUInt32BE(16) : null,
    height: hasPngSignature ? buffer.readUInt32BE(20) : null,
    chunks: [],
    iendFound: false,
    trailingBytes: null,
    structureError: null,
  }

  if (!hasPngSignature) return result

  try {
    let offset = 8
    let safety = 0
    while (offset + 12 <= buffer.length && safety++ < 10000) {
      const length = buffer.readUInt32BE(offset)
      const type = buffer.subarray(offset + 4, offset + 8).toString('ascii')
      const end = offset + 12 + length
      if (end > buffer.length) {
        result.structureError = `chunk ${type} length ${length} exceeds file at offset ${offset}`
        break
      }
      result.chunks.push({ type, length })
      offset = end
      if (type === 'IEND') {
        result.iendFound = true
        result.trailingBytes = buffer.length - offset
        if (result.trailingBytes > 0) {
          result.trailingPrefixHex = buffer.subarray(offset, Math.min(buffer.length, offset + 32)).toString('hex')
          result.trailingPrefixAscii = buffer.subarray(offset, Math.min(buffer.length, offset + 32)).toString('ascii').replace(/[^ -~]/g, '.')
        }
        break
      }
    }
    if (!result.iendFound && !result.structureError) result.structureError = 'IEND not found'
  } catch (error) {
    result.structureError = String(error)
  }

  return result
}

async function decodeImageInBrowser(page, url) {
  return page.evaluate((src) => new Promise((resolve) => {
    const img = new Image()
    const timer = setTimeout(() => resolve({ src, loaded: false, timeout: true, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight }), 15000)
    img.onload = () => {
      clearTimeout(timer)
      resolve({ src, loaded: true, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight })
    }
    img.onerror = () => {
      clearTimeout(timer)
      resolve({ src, loaded: false, error: true, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight })
    }
    img.src = src
  }), url)
}

async function diagnoseSite(browser, label, baseUrl) {
  const context = await browser.newContext({ viewport: { width: 430, height: 900 } })
  const page = await context.newPage()
  const consoleErrors = []
  const pageErrors = []
  const failedRequests = []

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', err => pageErrors.push(String(err)))
  page.on('requestfailed', req => failedRequests.push({ url: req.url(), error: req.failure()?.errorText ?? 'unknown' }))

  await page.goto('about:blank')

  const assetHttp = []
  const imageDecode = []
  for (const name of assetNames) {
    const url = `${baseUrl}/assets/sprites/${name}`
    try {
      const res = await context.request.get(url, { failOnStatusCode: false, timeout: 30000 })
      const body = await res.body()
      assetHttp.push({
        name,
        url,
        status: res.status(),
        contentType: res.headers()['content-type'] ?? null,
        contentLength: body.length,
        pngSignature: body.length >= 8 && body.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])),
      })
    } catch (error) {
      assetHttp.push({ name, url, error: String(error) })
    }
    imageDecode.push({ name, ...(await decodeImageInBrowser(page, url)) })
  }

  const response = await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 })
  const initial = await page.evaluate(() => ({
    href: location.href,
    title: document.title,
    bodyText: document.body.innerText.slice(0, 800),
    images: [...document.images].map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      width: img.getBoundingClientRect().width,
      height: img.getBoundingClientRect().height,
    })),
    categoryButtons: [...document.querySelectorAll('.category-tabs button')].map(el => el.textContent?.trim()),
  }))

  async function clickCards(count) {
    const cards = page.locator('.item-card')
    const n = Math.min(count, await cards.count())
    for (let i = 0; i < n; i++) {
      await cards.nth(i).click()
      await page.waitForTimeout(150)
    }
  }

  const interactions = []
  try {
    await clickCards(3)
    interactions.push('haenam hair x3')
    const femaleTab = page.getByRole('tab', { name: /해녀 꾸미기/ })
    if (await femaleTab.count()) {
      await femaleTab.click()
      await clickCards(3)
      interactions.push('haenyeo hair x3')
    }
    const outfitTab = page.locator('.category-tabs button').filter({ hasText: '옷' })
    if (await outfitTab.count()) {
      await outfitTab.first().click()
      await clickCards(3)
      interactions.push('outfit x3')
    }
    const hatTab = page.locator('.category-tabs button').filter({ hasText: '모자' })
    if (await hatTab.count()) {
      await hatTab.first().click()
      await clickCards(2)
      interactions.push('hat x2')
    }
    const accessoryTab = page.locator('.category-tabs button').filter({ hasText: '소품' })
    if (await accessoryTab.count()) {
      await accessoryTab.first().click()
      await clickCards(2)
      interactions.push('accessory x2')
    }
  } catch (error) {
    interactions.push(`interaction error: ${String(error)}`)
  }

  await page.waitForTimeout(500)
  const after = await page.evaluate(() => ({
    images: [...document.images].map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      width: img.getBoundingClientRect().width,
      height: img.getBoundingClientRect().height,
    })),
    characterCanvases: [...document.querySelectorAll('.character-canvas')].map(el => ({
      className: el.className,
      rect: { width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height },
      imgCount: el.querySelectorAll('img').length,
    })),
  }))

  fs.mkdirSync('test-results', { recursive: true })
  await page.screenshot({ path: `test-results/${label}.png`, fullPage: true })
  await context.close()

  return {
    label,
    baseUrl,
    documentStatus: response?.status() ?? null,
    assetHttp,
    imageDecode,
    initial,
    interactions,
    after,
    consoleErrors,
    pageErrors,
    failedRequests,
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  commit: process.env.GITHUB_SHA ?? null,
  diskAssets: assetNames.map(analyzePng),
  browser: [],
}

const browser = await chromium.launch({ headless: true })
try {
  report.browser.push(await diagnoseSite(browser, 'local', 'http://127.0.0.1:4173'))
  report.browser.push(await diagnoseSite(browser, 'production', 'https://dress-up-with-heayeongyul.vercel.app'))
} finally {
  await browser.close()
}

fs.mkdirSync('.github/diagnostics', { recursive: true })
fs.writeFileSync('.github/diagnostics/latest.json', JSON.stringify(report, null, 2) + '\n')

console.log('ASSET_DIAGNOSTICS_START')
console.log(JSON.stringify(report, null, 2))
console.log('ASSET_DIAGNOSTICS_END')
