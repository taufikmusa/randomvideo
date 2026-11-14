// Render 1920x1080 frame demi frame (Playwright + WebGL SwiftShader) -> ffmpeg (suara asal Cut-01 sahaja).
//   node render.js stills 1.5 7 12.4   -> stills/t*.jpg (masa dalam saat)
//   node render.js [mula akhir]        -> <folder>.mp4   (frame mula..akhir untuk ujian)
const http = require('http'), fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const pw = require('/opt/node22/lib/node_modules/playwright');
const root = __dirname, WORKERS = +(process.env.WORKERS || 4), OUT = path.basename(root) + '.mp4', FPS = 30;
const AUDIO = process.env.AUDIO || '/tmp/claude-0/-home-user-randomvideo/40cb5a6b-871a-54ac-aedd-2f85610bae62/scratchpad/dl/cut06.mp4';
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const server = http.createServer((q, s) => { const f = path.join(root, decodeURIComponent(q.url.split('?')[0])); if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.writeHead(404); return s.end(); } s.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(s); });
(async () => {
  await new Promise(r => server.listen(0, r)); const url = `http://127.0.0.1:${server.address().port}/index.html`;
  const browser = await pw.chromium.launch({ args: ['--use-angle=swiftshader', '--use-gl=angle', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const mk = async () => { const p = await browser.newPage({ viewport: { width: 1920, height: 1080 } }); p.on('pageerror', e => { console.error('pageerror', e.message); process.exit(1); }); p.on('console', m => { if (m.type() === 'error') console.error('console.error', m.text()); }); await p.goto(url); await p.waitForFunction('window.ready', null, { timeout: 120000 }); return p; };
  const grab = (p, n) => p.evaluate(n => window.renderFrame(n), n);
  if (process.argv[2] === 'stills') {
    const p = await mk(); fs.mkdirSync(path.join(root, 'stills'), { recursive: true });
    for (const s of process.argv.slice(3).map(Number)) fs.writeFileSync(path.join(root, 'stills', `t${s.toFixed(2)}.jpg`), Buffer.from((await grab(p, Math.round(s * FPS))).split(',')[1], 'base64'));
    await browser.close(); server.close(); console.log('stills done'); return;
  }
  const p0 = await mk(), DUR = await p0.evaluate(() => window.DUR);
  const a = +(process.argv[2] || 0), b = +(process.argv[3] || Math.round(DUR * FPS)); const fr = path.join(root, 'out', 'frames'); fs.mkdirSync(fr, { recursive: true });
  let next = a, done = 0;
  await Promise.all(Array.from({ length: WORKERS }, async (_, w) => { const p = w ? await mk() : p0; for (;;) { const n = next++; if (n >= b) break; fs.writeFileSync(path.join(fr, `${String(n - a + 1).padStart(5, '0')}.jpg`), Buffer.from((await grab(p, n)).split(',')[1], 'base64')); if (++done % 100 === 0) console.log('frame', done + '/' + (b - a)); } }));
  await browser.close(); server.close();
  const t0 = a / FPS, d = (b - a) / FPS;
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(fr, '%05d.jpg'), '-ss', String(t0), '-t', String(d), '-i', AUDIO, '-map', '0:v', '-map', '1:a', '-vf', 'format=yuv420p', '-af', 'loudnorm=I=-16:TP=-1.5:LRA=9,apad=pad_dur=2', '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-c:a', 'aac', '-b:a', '192k', '-t', String(d), '-movflags', '+faststart', path.join(root, OUT)], { stdio: 'inherit' });
  console.log('done ->', OUT);
})().catch(e => { console.error(e); process.exit(1); });
