// Thumbnail 1920x1080: node thumb.js <video-dir> -> <video-dir>/thumb/thumbnail.jpg  (butiran dalam config.THUMB)
// THUMB = { l1:'Kenapa ramai nak jadi', big:'DEALER', l3:'Public Gold?', pill:'PENDAPATAN PASIF & ROYALTI', broll:'Emas-goldbar', pose: 1400 }
const fs = require('fs'), path = require('path'), pw = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const VD = path.resolve(process.argv[2]), eng = path.resolve(__dirname, '..');
  const src = fs.readFileSync(path.join(VD, 'config.js'), 'utf8'); const m = src.match(/THUMB:\s*(\{[\s\S]*?\n?\s*\}),?\s*\n/); const T = new Function('return ' + m[1])();
  const out = path.join(VD, 'thumb'); fs.mkdirSync(out, { recursive: true });
  const bigS = T.big.length <= 6 ? 262 : (T.big.length <= 9 ? 210 : 160);
  let h = fs.readFileSync(path.join(eng, 'thumb/thumb.tpl.html'), 'utf8');
  const R = { __DIR__: 'file://' + path.join(eng, 'thumb'), __L1__: T.l1, __S1__: T.s1 || 84, __BIG__: T.big, __SB__: bigS, __L3__: T.l3, __S3__: T.s3 || 128, __Y3__: bigS > 240 ? 560 : 520, __PILL__: T.pill.replace(/&/g, '&amp;'), __SP__: T.pill.length > 30 ? 36 : 46, __GB__: 'file://' + path.join(eng, 'assets/broll', T.broll, String(T.bf || 30).padStart(4, '0') + '.jpg'), __TAU__: 'file://' + fs.realpathSync(path.join(VD, 'keyed', String(T.pose || 1400).padStart(5, '0') + '.png')) };
  for (const [k, v] of Object.entries(R)) h = h.split(k).join(v);
  fs.writeFileSync(path.join(out, 'thumb.html'), h);
  const b = await pw.chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + path.join(out, 'thumb.html')); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(out, 'thumbnail.jpg'), type: 'jpeg', quality: 95 }); await b.close(); console.log('thumbnail ->', path.join(out, 'thumbnail.jpg'));
})();
