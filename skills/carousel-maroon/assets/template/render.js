// Render the 7560x1350 panorama and slice into N IG slides (1080x1350 JPG).
// Usage: node render.js  -> out/01.jpg … out/0N.jpg (N = window.N in index.html)
const http = require('http'), fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }
const root = __dirname, types = { '.html': 'text/html', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.png': 'image/png', '.ttf': 'font/ttf', '.js': 'text/javascript' };
const server = http.createServer((req, res) => { const f = path.join(root, decodeURIComponent(req.url.split('?')[0])); if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); });
(async () => {
  await new Promise(r => server.listen(0, r));
  const browser = await pw.chromium.launch(), page = await browser.newPage();
  page.on('pageerror', e => { console.error(e); process.exit(1); });
  await page.goto(`http://127.0.0.1:${server.address().port}/index.html`); await page.evaluate(() => window.ready);
  const png = await page.evaluate(() => document.getElementById('c').toDataURL('image/png'));
  fs.mkdirSync(path.join(root, 'out'), { recursive: true });
  const pano = path.join(root, 'out', 'panorama.png'); fs.writeFileSync(pano, Buffer.from(png.split(',')[1], 'base64'));
  const n = await page.evaluate(() => window.N || 7);
  for (let i = 0; i < n; i++) execFileSync('convert', [pano, '-crop', `1080x1350+${i * 1080}+0`, '+repage', '-quality', '93', path.join(root, 'out', `0${i + 1}.jpg`)]);
  await browser.close(); server.close(); console.log('done');
})();
