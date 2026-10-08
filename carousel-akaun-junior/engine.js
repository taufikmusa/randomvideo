// carousel-kartun engine — soft pastel sticker-storybook carousel (1080x1350 per slide).
// Family cartoon stickers (assets/kartun/{taufik,isteri,anak}), rounded Fredoka type, sticker pill labels,
// soft speech bubbles, rounded white cards, cute drawn gold. slides.js defines N, ASSETS, BG[], SLIDES[]. DO NOT EDIT per carousel.
const SW = 1080, SH = 1350;
const K = { ink: '#3B2A20', brown: '#6B4A33', cream: '#FFF6E5', peach: '#FFD9C2', pink: '#FFD1DC', mint: '#CFEFDF', sky: '#CFE6FA', butter: '#FFEFA8', lilac: '#E6DAFB', white: '#fff', gold: '#E9B23A', red: '#E2574C', green: '#3FA36B' };
const cv = document.getElementById('c'); cv.width = SW * N; cv.height = SH; cv.style.width = (SW * N / 4) + 'px';
const X = cv.getContext('2d');
const IMG = {};
const F = { t: s => `700 ${s}px FR`, t6: s => `600 ${s}px FR`, b: s => `700 ${s}px NU`, bb: s => `900 ${s}px NU` };
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function txt(s, x, y, f, fill = K.ink, align = 'left', ls = 0) { X.save(); X.font = f; X.textAlign = align; X.letterSpacing = ls + 'px'; X.fillStyle = fill; X.fillText(s, x, y); X.restore(); }
function tw(s, f) { X.save(); X.font = f; const w = X.measureText(s).width; X.restore(); return w; }
function rr(x, y, w, h, r) { X.beginPath(); X.roundRect(x, y, w, h, r); }
function wrap(s, f, maxW) { const out = []; let line = ''; for (const w of s.split(' ')) { const t = line ? line + ' ' + w : w; if (tw(t.replace(/\*/g, ''), f) > maxW && line) { out.push(line); line = w; } else line = t; } out.push(line); return out; }
function soft(fn, blur = 26, a = .16, dy = 14) { X.save(); X.filter = `blur(${blur}px)`; X.globalAlpha = a; X.translate(0, dy); X.fillStyle = '#5a3a20'; fn(); X.fill(); X.restore(); }

// pastel background with soft blobs + dots
function bg(x0, col, seed) {
  X.fillStyle = col; X.fillRect(x0, 0, SW, SH);
  const R = rng(seed + 3); X.save(); X.globalAlpha = .45;
  for (let i = 0; i < 5; i++) { X.fillStyle = [K.white, K.peach, K.pink, K.mint, K.butter][i]; X.beginPath(); X.ellipse(x0 + R() * SW, R() * SH, 160 + R() * 220, 130 + R() * 180, R() * 3, 0, 7); X.fill(); }
  X.restore(); X.save(); X.globalAlpha = .18; X.fillStyle = K.brown;
  for (let y = 40; y < SH; y += 56) for (let x = 40 + (y / 56 % 2) * 28; x < SW; x += 56) { X.beginPath(); X.arc(x0 + x, y, 3, 0, 7); X.fill(); }
  X.restore();
}
// title: rounded, dark brown, optional highlight words wrapped in *...* get a butter swash
function title(s, x, y, size, maxW = 940, align = 'left', lh = 1.08) {
  // word-level highlight: *a b c* stays highlighted across line wraps
  let hot = false; const words = s.split(' ').map(t => { const h = hot || t.startsWith('*'); if (t.startsWith('*')) hot = true; if (/\*[.,!?:]?$/.test(t)) hot = false; return { t: t.replace(/\*/g, ''), h }; });
  const f = F.t(size), sp = tw(' ', f), lines = [[]]; let lw = 0;
  words.forEach(w => { const ww = tw(w.t, f) + (w.h ? 20 : 0); if (lw + ww > maxW && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push(w); lw += ww + sp; });
  lines.forEach((ln, i) => {
    const yy = y + i * size * lh, total = ln.reduce((a, w) => a + tw(w.t, f) + sp, -sp);
    let cx = align === 'center' ? x - total / 2 : x;
    ln.forEach((w, j) => { const ww = tw(w.t, f), nextHot = ln[j + 1] && ln[j + 1].h;
      if (w.h) { X.save(); X.fillStyle = K.butter; rr(cx - 10, yy - size * .62, ww + 20 + (nextHot ? sp : 0), size * .78, size * .3); X.fill(); X.restore(); }
      txt(w.t, cx, yy, f, w.h ? K.red : K.ink); cx += ww + sp; });
  });
  return y + lines.length * size * lh;
}
function para(s, x, y, w, size = 38, col = K.brown, align = 'left') { const ls = wrap(s, F.b(size), w); ls.forEach((l, i) => txt(l, x, y + i * size * 1.32, F.b(size), col, align)); return y + ls.length * size * 1.32; }
// sticker pill label (white, brown outline, like the sticker sheets)
function pill(s, cx, cy, size = 44, fg = K.ink, bg = K.white, rot = 0) {
  const w = tw(s, F.t(size)) + size * 1.2, h = size * 1.5; X.save(); X.translate(cx, cy); X.rotate(rot);
  soft(() => rr(-w / 2, -h / 2, w, h, h / 2), 14, .2, 8);
  rr(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, h / 2 + 8); X.fillStyle = K.white; X.fill();
  rr(-w / 2, -h / 2, w, h, h / 2); X.fillStyle = bg; X.fill(); X.lineWidth = 4; X.strokeStyle = K.ink; X.stroke();
  txt(s, 0, size * .36, F.t(size), fg, 'center'); X.restore(); return w;
}
// soft rounded speech bubble; tail points to (tx,ty)
function bubble(lines, cx, cy, w, h, tx, ty, size = 48) {
  const path = () => { X.beginPath(); X.roundRect(cx - w / 2, cy - h / 2, w, h, Math.min(h / 2, 60)); const a = Math.atan2(ty - cy, tx - cx), bx = cx + Math.cos(a) * w * .25, by = cy + Math.sin(a) * h * .3;
    X.moveTo(bx - 34, by); X.quadraticCurveTo(tx * .4 + bx * .6, ty * .4 + by * .6, tx, ty); X.quadraticCurveTo(tx * .3 + bx * .7 + 10, ty * .3 + by * .7, bx + 34, by); };
  soft(path, 18, .18, 10); path(); X.fillStyle = K.white; X.fill(); X.lineWidth = 4; X.strokeStyle = K.ink; X.stroke();
  X.beginPath(); X.roundRect(cx - w / 2 + 3, cy - h / 2 + 3, w - 6, h - 6, Math.min(h / 2, 60)); X.fillStyle = K.white; X.fill();
  const lh = size * 1.15, y0 = cy - (lines.length - 1) * lh / 2 + size * .36;
  lines.forEach((l, i) => { const hot = l.startsWith('*'); txt(hot ? l.slice(1) : l, cx, y0 + i * lh, F.t(size), hot ? K.red : K.ink, 'center'); });
}
// rounded white card with soft shadow
function card(x, y, w, h, fill = K.white, r = 40) { soft(() => rr(x, y, w, h, r), 30, .16, 18); rr(x, y, w, h, r); X.fillStyle = fill; X.fill(); }
// cartoon sticker (bottom-centre anchor) with soft ground shadow
function chara(im, cx, by, h, flip = false) {
  const w = h * im.width / im.height;
  X.save(); X.globalAlpha = .18; X.fillStyle = '#5a3a20'; X.beginPath(); X.ellipse(cx, by - 6, w * .38, 18, 0, 0, 7); X.filter = 'blur(10px)'; X.fill(); X.restore();
  X.save(); X.translate(cx, by); if (flip) X.scale(-1, 1); X.drawImage(im, -w / 2, -h, w, h); X.restore();
}
// cute gold: bar / coin / stack
function goldBar(cx, cy, w, rot = 0, label = '') {
  const h = w * .5; X.save(); X.translate(cx, cy); X.rotate(rot);
  soft(() => rr(-w / 2, -h / 2, w, h, h * .22), 12, .2, 8);
  rr(-w / 2, -h / 2, w, h, h * .22); X.fillStyle = '#F6C94C'; X.fill(); X.lineWidth = Math.max(3, w * .025); X.strokeStyle = K.ink; X.stroke();
  rr(-w / 2 + w * .1, -h / 2 + h * .18, w * .8, h * .64, h * .14); X.fillStyle = '#FFE38A'; X.fill();
  X.fillStyle = '#fff'; X.globalAlpha = .8; rr(-w / 2 + w * .14, -h / 2 + h * .24, w * .22, h * .1, 6); X.fill(); X.globalAlpha = 1;
  if (label) txt(label, 0, h * .14, F.t(h * .34), K.brown, 'center');
  X.restore();
}
function coin(cx, cy, r, label = '') { soft(() => { X.beginPath(); X.arc(cx, cy, r, 0, 7); }, 10, .2, 6); X.beginPath(); X.arc(cx, cy, r, 0, 7); X.fillStyle = '#F6C94C'; X.fill(); X.lineWidth = 4; X.strokeStyle = K.ink; X.stroke(); X.beginPath(); X.arc(cx, cy, r * .74, 0, 7); X.strokeStyle = '#D79A1E'; X.stroke(); if (label) txt(label, cx, cy + r * .28, F.t(r * .8), K.brown, 'center'); }
// real photo (assets/emas) in a rounded white frame with washi tape + optional caption pill
function photoCard(im, cx, cy, w, h, rot = 0, caption = '', fx = .5, fy = .5) {
  X.save(); X.translate(cx, cy); X.rotate(rot);
  soft(() => rr(-w / 2 - 16, -h / 2 - 16, w + 32, h + 32, 30), 24, .2, 14);
  rr(-w / 2 - 16, -h / 2 - 16, w + 32, h + 32, 30); X.fillStyle = K.white; X.fill(); X.lineWidth = 3; X.strokeStyle = 'rgba(59,42,32,.25)'; X.stroke();
  X.save(); rr(-w / 2, -h / 2, w, h, 20); X.clip(); const s = Math.max(w / im.width, h / im.height), sw = w / s, sh = h / s;
  X.drawImage(im, Math.max(0, Math.min(im.width - sw, fx * im.width - sw / 2)), Math.max(0, Math.min(im.height - sh, fy * im.height - sh / 2)), sw, sh, -w / 2, -h / 2, w, h); X.restore();
  X.save(); X.rotate(-.08); X.globalAlpha = .85; X.fillStyle = K.butter; X.fillRect(-70, -h / 2 - 38, 140, 44); X.restore();
  X.restore();
  if (caption) pill(caption, cx, cy + h / 2 + 30, 30, K.ink, K.white, rot);
}
function sparkle(x, y, s, col = '#FFC93C') { X.save(); X.translate(x, y); X.fillStyle = col; X.beginPath(); X.moveTo(0, -s); X.quadraticCurveTo(0, 0, s, 0); X.quadraticCurveTo(0, 0, 0, s); X.quadraticCurveTo(0, 0, -s, 0); X.quadraticCurveTo(0, 0, 0, -s); X.fill(); X.restore(); }
function heart(x, y, s, col = K.red) { X.save(); X.translate(x, y); X.fillStyle = col; X.beginPath(); X.moveTo(0, s * .35); X.bezierCurveTo(-s * 1.1, -s * .3, -s * .45, -s * 1.05, 0, -s * .45); X.bezierCurveTo(s * .45, -s * 1.05, s * 1.1, -s * .3, 0, s * .35); X.fill(); X.restore(); }
function footer(x0, i, last) {
  rr(x0 + 48, SH - 96, 250, 58, 29); X.fillStyle = K.white; X.fill(); X.lineWidth = 3; X.strokeStyle = K.ink; X.stroke();
  X.beginPath(); X.arc(x0 + 80, SH - 67, 10, 0, 7); X.fillStyle = K.gold; X.fill(); txt('@taufik.pg', x0 + 100, SH - 55, F.t(28), K.ink);
  for (let k = 0; k < N; k++) { X.beginPath(); X.arc(x0 + SW / 2 - (N - 1) * 14 + k * 28, SH - 67, k === i ? 10 : 6, 0, 7); X.fillStyle = k === i ? K.ink : 'rgba(59,42,32,.3)'; X.fill(); }
  if (!last) { txt('swipe', x0 + SW - 150, SH - 55, F.t(34), K.ink, 'right'); const ax = x0 + SW - 100, ay = SH - 67; X.beginPath(); X.arc(ax, ay, 30, 0, 7); X.fillStyle = K.butter; X.fill(); X.lineWidth = 3; X.strokeStyle = K.ink; X.stroke(); X.lineWidth = 6; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath(); X.moveTo(ax - 11, ay); X.lineTo(ax + 11, ay); X.moveTo(ax, ay - 11); X.lineTo(ax + 12, ay); X.lineTo(ax, ay + 11); X.stroke(); }
}

window.ready = Promise.all([
  ...[F.t(40), F.t6(40), F.b(40), F.bb(40)].map(f => document.fonts.load(f)),
  ...Object.entries(ASSETS).map(([k, f]) => new Promise((res, rej) => { const i = new Image(); i.onload = () => { IMG[k] = i; res(); }; i.onerror = () => rej(new Error('missing img/' + f)); i.src = 'img/' + f; })),
]).then(() => {
  SLIDES.forEach((fn, i) => { const x0 = i * SW; bg(x0, BG[i % BG.length], i); X.save(); X.beginPath(); X.rect(x0, 0, SW, SH); X.clip(); fn(x0, i); footer(x0, i, i === N - 1); X.restore(); });
  return true;
});
