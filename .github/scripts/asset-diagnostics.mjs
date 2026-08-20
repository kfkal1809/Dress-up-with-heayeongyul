import fs from 'node:fs'
import path from 'node:path'
import { PNG } from 'pngjs'
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
  const png = PNG.sync.read(buffer)
  let minX = png.width, minY = png.height, maxX = -1, maxY = -1, nonTransparent = 0
  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const alpha = png.data[(y * png.width + x) * 4 + 3]
      if (alpha > 8) {
        nonTransparent++
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  return {
    file: name,
    bytes: buffer.length,
    width: png.width,
    height: png.height,
    alphaCoverage: Number((nonTransparent / (png.width * png.height)).toFixed(4)),
    alphaBounds: maxX >= 0 ? { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 } : null,
  }
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

  const assetHttp = []
  for (const name of ['haenam-hair.png', 'haenyeo-hair.png', 'haenam-sailor-outfits.png']) {
    const url = `${baseUrl}/assets/sprites/${name}`
    try {
      const res = await context.request.get(url, { failOnStatusCode: false })
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
  }

  const response = await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 })
  const initial = await page.evaluate(() => ({
    href: location.href,
    title: document.title,
    bodyText: document.body.innerText.slice(0, 500),
    images: [...document.images].map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      width: img.getBoundingClientRect().width,
      height: img.getBoundingClientRect().height,
    })),
  }))

  async function clickCards(count) {
    const cards = page.locator('.item-card')
    const n = Math.min(count, await cards.count())
    for (let i = 0; i < n; i++) {
      await cards.nth(i).click()
      await page.waitForTimeout(120)
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
    const outfitTab = page.getByRole('button', { name: /^.*옷$/ })
    if (await outfitTab.count()) {
      await outfitTab.first().click()
      await clickCards(3)
      interactions.push('outfit x3')
    }
    const hatTab = page.getByRole('button', { name: /모자/ })
    if (await hatTab.count()) {
      await hatTab.first().click()
      await clickCards(2)
      interactions.push('hat x2')
    }
    const accessoryTab = page.getByRole('button', { name: /소품/ })
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
    initial,
    interactions,
    after,
    consoleErrors,
    pageErrors,
    failedRequests,
  }
}

const diskAssets = assetNames.map(analyzePng)
console.log('ASSET_DISK_REPORT_START')
console.log(JSON.stringify(diskAssets, null, 2))
console.log('ASSET_DISK_REPORT_END')

const browser = await chromium.launch({ headless: true })
try {
  const results = []
  results.push(await diagnoseSite(browser, 'local', 'http://127.0.0.1:4173'))
  results.push(await diagnoseSite(browser, 'production', 'https://dress-up-with-heayeongyul.vercel.app'))
  console.log('BROWSER_DIAGNOSTICS_START')
  console.log(JSON.stringify(results, null, 2))
  console.log('BROWSER_DIAGNOSTICS_END')
} finally {
  await browser.close()
}
