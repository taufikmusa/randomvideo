// Render index.html frame-by-frame with Playwright and pipe JPEGs into ffmpeg.
// Usage: node render.js            -> <folder-name>.mp4
//        node render.js stills 1 9 -> preview PNGs at given seconds
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
let pw;
try { pw = require(process.env.PW || 'playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }
const { chromium } = pw;

const FPS = 30;
const OUT = path.basename(__dirname) + '.mp4';
const root = __dirname;
const types = { '.html': 'text/html', '.woff2': 'font/woff2', '.js': 'text/javascript' };

const server = http.createServer((req, res) => {
  const f = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});

(async () => {
  await new Promise(r => server.listen(0, r));
  const url = `http://127.0.0.1:${server.address().port}/index.html`;
  const browser = await chromium.launch({ args: ['--disable-gpu-vsync'] });
  const page = await browser.newPage({ viewport: { width: 400, height: 700 } });
  page.on('console', m => console.log('[page]', m.text()));
  page.on('pageerror', e => { console.error('[pageerror]', e); process.exit(1); });
  await page.goto(url);
  await page.evaluate(() => window.ready);

  const DUR = await page.evaluate(() => DUR);
  const grab = t => page.evaluate(t => { render(t); return document.getElementById('c').toDataURL('image/jpeg', 0.93); }, t);

  if (process.argv[2] === 'stills') {
    fs.mkdirSync(path.join(root, 'stills'), { recursive: true });
    for (const s of process.argv.slice(3).map(Number)) {
      const d = await grab(s);
      fs.writeFileSync(path.join(root, 'stills', `t${s.toFixed(2)}.jpg`), Buffer.from(d.split(',')[1], 'base64'));
    }
  } else {
    const ff = spawn('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error',
      '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
      '-i', path.join(root, 'music.wav'),
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-maxrate', '7M', '-bufsize', '14M', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
      '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart',
      path.join(root, OUT)], { stdio: ['pipe', 'inherit', 'inherit'] });
    const total = FPS * DUR;
    for (let f = 0; f < total; f++) {
      const d = await grab(f / FPS);
      const buf = Buffer.from(d.split(',')[1], 'base64');
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (f % 150 === 0) console.log(`frame ${f}/${total}`);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
    console.log('done -> ' + OUT);
  }
  await browser.close();
  server.close();
})();
