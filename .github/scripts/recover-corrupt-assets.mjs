import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dir = path.join(root, 'public/assets/sprites')
const outDir = path.join(root, 'test-results/recovered')
fs.mkdirSync(outDir, { recursive: true })

const pngSig = Buffer.from([137,80,78,71,13,10,26,10])
const files = fs.readdirSync(dir).filter(name => name.endsWith('.png')).sort()
const report = []

for (const name of files) {
  const sourcePath = path.join(dir, name)
  const buf = fs.readFileSync(sourcePath)
  const validSig = buf.length >= 24 && buf.subarray(0, 8).equals(pngSig)
  const asciiPrefix = buf.subarray(0, Math.min(buf.length, 96)).toString('latin1').replace(/[^ -~]/g, '.')
  const hexPrefix = buf.subarray(0, Math.min(buf.length, 48)).toString('hex')
  const text = buf.toString('utf8')
  const b64Marker = text.indexOf('iVBORw0KGgo')
  let recovery = null

  if (!validSig && b64Marker >= 0) {
    // Keep only the base64 alphabet from the embedded payload. The corrupt
    // files were accidentally stored as textual base64 with a short error
    // prefix rather than as the decoded PNG bytes.
    const candidateText = text.slice(b64Marker)
    const match = candidateText.match(/^[A-Za-z0-9+/=\r\n]+/)
    const cleaned = (match?.[0] ?? '').replace(/\s+/g, '')
    try {
      const decoded = Buffer.from(cleaned, 'base64')
      const decodedSig = decoded.length >= 24 && decoded.subarray(0, 8).equals(pngSig)
      const recoveredPath = path.join(outDir, name)
      if (decodedSig) fs.writeFileSync(recoveredPath, decoded)
      recovery = {
        markerOffset: b64Marker,
        base64Chars: cleaned.length,
        decodedBytes: decoded.length,
        decodedHasPngSignature: decodedSig,
        decodedWidth: decodedSig ? decoded.readUInt32BE(16) : null,
        decodedHeight: decodedSig ? decoded.readUInt32BE(20) : null,
        written: decodedSig,
      }
    } catch (error) {
      recovery = { markerOffset: b64Marker, error: String(error) }
    }
  }

  report.push({
    name,
    bytes: buf.length,
    validPngSignature: validSig,
    asciiPrefix,
    hexPrefix,
    embeddedBase64Marker: b64Marker,
    recovery,
  })
}

fs.writeFileSync(path.join(outDir, 'recovery-report.json'), JSON.stringify(report, null, 2) + '\n')
console.log('RECOVERY_REPORT_START')
console.log(JSON.stringify(report, null, 2))
console.log('RECOVERY_REPORT_END')
