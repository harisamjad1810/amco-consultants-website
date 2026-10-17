// Serves the BUILT site (`out/`) the way the live server will: compressed,
// with `/en/` resolving to `out/en/index.html` and unknown addresses getting
// the 404 page. Use this — not `npm run dev` — to judge how fast the site is.
// `npm run dev` compiles each page the first time you open it, which is far
// slower than anything a visitor will ever see.
//
//   npm run preview        ->  http://localhost:4600

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const OUT = path.resolve('out')
const PORT = Number(process.env.PORT) || 4600

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
}
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.txt', '.json', '.svg'])

if (!fs.existsSync(path.join(OUT, 'index.html'))) {
  console.error('No build found in out/. Run `npm run build` first.')
  process.exit(1)
}

function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '')
  let file = path.join(OUT, clean)
  if (!file.startsWith(OUT)) return null
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
  else if (!fs.existsSync(file) && fs.existsSync(path.join(file, 'index.html'))) file = path.join(file, 'index.html')
  return fs.existsSync(file) && fs.statSync(file).isFile() ? file : null
}

http
  .createServer((req, res) => {
    const found = resolve(req.url || '/')
    const file = found || path.join(OUT, '404.html')
    const ext = path.extname(file)
    const headers = { 'content-type': TYPES[ext] || 'application/octet-stream' }
    if (found && req.url?.startsWith('/_next/static/')) headers['cache-control'] = 'public, max-age=31536000, immutable'
    const gzip = COMPRESSIBLE.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')
    if (gzip) headers['content-encoding'] = 'gzip'
    res.writeHead(found ? 200 : 404, headers)
    const stream = fs.createReadStream(file)
    ;(gzip ? stream.pipe(zlib.createGzip()) : stream).pipe(res)
  })
  .listen(PORT, () => console.log(`Built site at http://localhost:${PORT}  (Ctrl+C to stop)`))
