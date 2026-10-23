// Render 1080x1920 frame-by-frame (4 page selari) -> out/frames, kemudian ffmpeg gabung audio (suara asal; SFX lembut hanya jika projek ada sfx.py — tiada muzik).
// Guna: node render.js stills 3 9 20   -> stills/t*.jpg
//       node render.js                 -> <nama-folder>.mp4
const http = require('http'), fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }
const root = __dirname, FPS = 30, WORKERS = 4, OUT = path.basename(root) + '.mp4';
const types = { '.html': 'text/html', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.png': 'image/png', '.js': 'text/javascript' };
const server = http.createServer((req, res) => { const f = path.join(root, decodeURIComponent(req.url.split('?')[0])); if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); });
(async () => {
  await new Promise(r => server.listen(0, r));
  const url = `http://127.0.0.1:${server.address().port}/index.html`;
  const browser = await pw.chromium.launch({ args: ['--disable-gpu-vsync'] });
  const mk = async () => { const p = await browser.newPage({ viewport: { width: 540, height: 960 } }); p.on('pageerror', e => { console.error(e); process.exit(1); }); await p.goto(url); await p.evaluate(() => window.ready); return p; };
  const grab = (p, t) => p.evaluate(async t => { await loadHead(Math.round(t * 30) + 1); render(t); return document.getElementById('c').toDataURL('image/jpeg', 0.97); }, t);
  if (process.argv[2] === 'stills') {
    const p = await mk(); fs.mkdirSync(path.join(root, 'stills'), { recursive: true });
    for (const s of process.argv.slice(3).map(Number)) fs.writeFileSync(path.join(root, 'stills', `t${s.toFixed(2)}.jpg`), Buffer.from((await grab(p, s)).split(',')[1], 'base64'));
    await browser.close(); server.close(); console.log('stills done'); return;
  }
  const p0 = await mk(), DUR = await p0.evaluate(() => DUR), useSfx = fs.existsSync(path.join(root, 'sfx.py'));
  if (useSfx) { const sfx = await p0.evaluate(() => window.SFX); sfx.dur = DUR; fs.writeFileSync(path.join(root, 'sfx.json'), JSON.stringify(sfx)); }
  const total = Math.round(DUR * FPS), fr = path.join(root, 'out', 'frames'); fs.mkdirSync(fr, { recursive: true });
  let next = 0;
  await Promise.all(Array.from({ length: WORKERS }, async (_, w) => {
    const p = w ? await mk() : p0;
    for (;;) { const f = next++; if (f >= total) break; const d = await grab(p, f / FPS); fs.writeFileSync(path.join(fr, String(f).padStart(5, '0') + '.jpg'), Buffer.from(d.split(',')[1], 'base64')); if (f % 150 === 0) console.log(`frame ${f}/${total}`); }
  }));
  await browser.close(); server.close();
  if (useSfx) execFileSync('python3', ['sfx.py'], { cwd: root, stdio: 'inherit' });
  // loudnorm kadang potong ekor audio → apad + -t DUR
  execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(root, 'out', 'frames', '%05d.jpg'), '-i', path.join(root, 'voice.wav'), ...(useSfx ? ['-i', path.join(root, 'sfx.wav')] : []),
    '-filter_complex', useSfx ? '[1:a]loudnorm=I=-16:TP=-1.5:LRA=9,apad=pad_dur=5[v];[2:a]volume=.4[s];[v][s]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[a]' : '[1:a]loudnorm=I=-16:TP=-1.5:LRA=9,apad=pad_dur=5[a]',
    '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-c:a', 'aac', '-b:a', '192k', '-t', String(DUR), '-movflags', '+faststart', path.join(root, OUT)], { stdio: 'inherit' });
  console.log('done -> ' + OUT);
})();
