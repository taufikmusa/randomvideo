// carousel-editorial engine — white "magazine" carousel (1080x1350 per slide).
// Giant orange number, brush-marker title, condensed block title, handwritten notes,
// peach sticky notes & checklists, doodle bursts/arrows, real photos & white-outline portraits.
// slides.js defines: TITLE, N, ASSETS {key:'file'}, SLIDES [fn(x, i)].  DO NOT EDIT per carousel.
const SW = 1080, SH = 1350;
const K = { bg: '#FBFAF7', ink: '#111111', red: '#E8522F', peach: '#F7E2D6', muted: '#4b4b4b', gold: '#C9971C' };
const cv = document.getElementById('c'); cv.width = SW * N; cv.height = SH; cv.style.width = (SW * N / 4) + 'px'; cv.style.height = (SH / 4) + 'px';
const X = cv.getContext('2d');
const IMG = {};
const F = {
  num: s => `900 ${s}px IN`, brush: s => `${s}px PM`, block: s => `${s}px AN`, body: s => `500 ${s}px IN`, bodyB: s => `800 ${s}px IN`,
  hand: s => `700 ${s}px CV`, mono: s => `700 ${s}px MO`,
};
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function txt(s, x, y, f, fill = K.ink, align = 'left', ls = 0) { X.save(); X.font = f; X.textAlign = align; X.letterSpacing = ls + 'px'; X.fillStyle = fill; X.fillText(s, x, y); X.restore(); }
function tw(s, f) { X.save(); X.font = f; const w = X.measureText(s).width; X.restore(); return w; }
function rr(x, y, w, h, r) { X.beginPath(); X.roundRect(x, y, w, h, r); }
function wrap(s, f, maxW) { const out = []; let line = ''; for (const w of s.split(' ')) { const t = line ? line + ' ' + w : w; if (tw(t.replace(/\*/g, ''), f) > maxW && line) { out.push(line); line = w; } else line = t; } out.push(line); return out; }

// hand-drawn swoosh underline (two passes, tapered)
function swoosh(x1, y, x2, col = K.red, th = 9, seed = 1) {
  const R = rng(seed); X.save(); X.strokeStyle = col; X.lineCap = 'round';
  for (let p = 0; p < 2; p++) { X.lineWidth = th * (p ? .55 : 1); X.beginPath(); X.moveTo(x1 + p * 30, y + p * 9); X.quadraticCurveTo((x1 + x2) / 2, y - 10 + R() * 8 + p * 6, x2 - p * 60, y + 2 + p * 10); X.stroke(); }
  X.restore();
}
// 3 short emphasis strokes around a point ( \ | / )
function burst(x, y, s = 1, rot = 0) {
  X.save(); X.translate(x, y); X.rotate(rot); X.strokeStyle = K.ink; X.lineWidth = 6 * s; X.lineCap = 'round';
  [[-.9, 0], [-.35, -.2], [.25, -.1]].forEach(([a], i) => { X.save(); X.rotate(a); X.beginPath(); X.moveTo(0, -30 * s); X.lineTo(0, -70 * s - i * 6 * s); X.stroke(); X.restore(); });
  X.restore();
}
// hand-drawn curved arrow
function arrow(x1, y1, x2, y2, bend = 60, col = K.ink, th = 5) {
  X.save(); X.strokeStyle = col; X.lineWidth = th; X.lineCap = 'round'; X.lineJoin = 'round';
  const mx = (x1 + x2) / 2 + bend, my = (y1 + y2) / 2 - bend * .3;
  X.beginPath(); X.moveTo(x1, y1); X.quadraticCurveTo(mx, my, x2, y2); X.stroke();
  const a = Math.atan2(y2 - my, x2 - mx); X.beginPath(); X.moveTo(x2 - 26 * Math.cos(a - .5), y2 - 26 * Math.sin(a - .5)); X.lineTo(x2, y2); X.lineTo(x2 - 26 * Math.cos(a + .5), y2 - 26 * Math.sin(a + .5)); X.stroke();
  X.restore();
}
// giant orange number / word (left side hero)
function bigNum(s, x, y, size, italic = false) { X.save(); X.translate(x, y); if (italic) X.transform(1, 0, -.12, 1, 0, 0); txt(s, 0, 0, italic ? F.brush(size) : F.num(size), K.red); X.restore(); }
// brush-marker word with red underline
function brushTitle(s, x, y, size, rot = -.03, under = true) { X.save(); X.translate(x, y); X.rotate(rot); txt(s, 0, 0, F.brush(size), K.ink); if (under) swoosh(10, size * .22, tw(s, F.brush(size)) - 10, K.red, size * .09, s.length); X.restore(); }
// condensed black block title, one line per entry
function blockTitle(lines, x, y, size, lh = .98, col = K.ink) { lines.forEach((l, i) => txt(l, x, y + i * size * lh, F.block(size), col)); return y + lines.length * size * lh; }
// body paragraph; wrap *word* to colour it orange+bold
function body(s, x, y, w, size = 38, lh = 1.3) {
  // tokens keep their highlight state across line wraps: *a b c* -> 3 hot words
  let hot = false; const words = s.split(' ').map(t => { let h = hot || t.startsWith('*'); if (t.startsWith('*')) hot = true; if (t.endsWith('*') || t.endsWith('*.') || t.endsWith('*,') || t.endsWith('*?')) { hot = false; } return { t: t.replace(/\*/g, ''), h }; });
  let cx = x, cy = y; const sp = tw(' ', F.body(size));
  words.forEach(({ t, h }) => { const f = h ? F.bodyB(size) : F.body(size), ww = tw(t, f); if (cx + ww > x + w && cx > x) { cx = x; cy += size * lh; } txt(t, cx, cy, f, h ? K.red : '#222'); cx += ww + sp; });
  return cy + size * lh;
}
// handwritten note (Caveat) with red underline on the last line
function note(lines, x, y, size = 46, rot = -.08, under = true, col = K.ink) {
  X.save(); X.translate(x, y); X.rotate(rot);
  lines.forEach((l, i) => txt(l, 0, i * size * 1.05, F.hand(size), col));
  if (under) { const w = tw(lines[lines.length - 1], F.hand(size)); swoosh(0, (lines.length - 1) * size * 1.05 + size * .28, Math.max(w, 80), K.red, 6, lines.length); }
  X.restore();
}
// peach sticky note with handwriting (top-right)
function sticky(lines, x, y, w = 250, rot = -.06, size = 44) {
  const h = lines.length * size * 1.02 + 56;
  X.save(); X.translate(x, y); X.rotate(rot);
  X.fillStyle = K.peach; X.beginPath(); X.moveTo(0, 6); X.lineTo(w, 0); X.lineTo(w - 4, h); X.lineTo(4, h + 5); X.closePath(); X.fill();
  lines.forEach((l, i) => txt(l, 26, 50 + i * size * 1.02, F.hand(size), K.ink));
  swoosh(26, h - 18, w - 30, K.ink, 4, 3);
  X.restore();
}
// peach checklist box with ☑ items
function checklist(items, x, y, w = 420, rot = -.06, size = 44) {
  const h = items.length * size * 1.18 + 40;
  X.save(); X.translate(x, y); X.rotate(rot);
  X.fillStyle = K.peach; X.beginPath(); X.moveTo(0, 8); X.lineTo(w, 0); X.lineTo(w - 6, h); X.lineTo(6, h + 6); X.closePath(); X.fill();
  items.forEach((it, i) => {
    const yy = 30 + i * size * 1.18;
    X.strokeStyle = K.ink; X.lineWidth = 3.5; X.strokeRect(24, yy, size * .62, size * .62);
    X.lineWidth = 5; X.lineCap = 'round'; X.beginPath(); X.moveTo(30, yy + size * .3); X.lineTo(24 + size * .28, yy + size * .55); X.lineTo(24 + size * .75, yy - size * .08); X.stroke();
    txt(it, 24 + size * .95, yy + size * .58, F.hand(size), K.ink);
  });
  X.restore();
}
// slide counter "1/5" with underline (top-left)
function counter(x0, i, n) { txt(`${i}/${n}`, x0 + 60, 120, F.hand(54), K.ink); swoosh(x0 + 56, 140, x0 + 170, K.ink, 4, 9); }
// photo: rounded, soft shadow
function photo(im, cx, cy, w, rot = 0, r = 26) {
  const h = w * im.height / im.width; X.save(); X.translate(cx, cy); X.rotate(rot);
  X.save(); X.filter = 'blur(28px)'; X.fillStyle = 'rgba(0,0,0,.28)'; rr(-w / 2 + 14, -h / 2 + 30, w, h, r); X.fill(); X.restore();
  X.save(); rr(-w / 2, -h / 2, w, h, r); X.clip(); X.drawImage(im, -w / 2, -h / 2, w, h); X.restore();
  X.restore();
}
// photo cropped to a box (object-fit: cover), focus fx/fy
function photoBox(im, x, y, w, h, r = 26, fx = .5, fy = .5, rot = 0) {
  X.save(); X.translate(x + w / 2, y + h / 2); X.rotate(rot);
  X.save(); X.filter = 'blur(28px)'; X.fillStyle = 'rgba(0,0,0,.28)'; rr(-w / 2 + 14, -h / 2 + 30, w, h, r); X.fill(); X.restore();
  rr(-w / 2, -h / 2, w, h, r); X.clip();
  const s = Math.max(w / im.width, h / im.height), sw = w / s, sh = h / s;
  X.drawImage(im, Math.max(0, Math.min(im.width - sw, fx * im.width - sw / 2)), Math.max(0, Math.min(im.height - sh, fy * im.height - sh / 2)), sw, sh, -w / 2, -h / 2, w, h);
  X.restore();
}
// white-outline portrait cutout, anchored bottom-centre
function cutout(im, x, y, h) { const w = h * im.width / im.height; X.drawImage(im, x - w / 2, y - h, w, h); }
// footer: handle pill + swipe hint
function footer(x0, last) {
  rr(x0 + 56, SH - 104, 250, 56, 28); X.fillStyle = K.ink; X.fill();
  X.beginPath(); X.arc(x0 + 86, SH - 76, 9, 0, 7); X.fillStyle = K.red; X.fill();
  txt('@taufik.pg', x0 + 104, SH - 65, F.bodyB(28), '#fff');
  if (!last) { txt('swipe', SW + x0 - 190, SH - 62, F.hand(46), K.ink); arrow(SW + x0 - 180, SH - 48, SW + x0 - 60, SH - 76, 10, K.red, 6); }
}
function paper(x0) {
  X.fillStyle = K.bg; X.fillRect(x0, 0, SW, SH);
  const R = rng(x0 + 7); X.save(); X.globalAlpha = .035; for (let i = 0; i < 5000; i++) { X.fillStyle = R() < .5 ? '#000' : '#a07a50'; X.fillRect(x0 + R() * SW, R() * SH, 2, 2); } X.restore();
}

window.ready = Promise.all([
  ...[F.num(40), F.brush(40), F.block(40), F.body(40), F.bodyB(40), F.hand(40), F.mono(40)].map(f => document.fonts.load(f)),
  ...Object.entries(ASSETS).map(([k, f]) => new Promise((res, rej) => { const i = new Image(); i.onload = () => { IMG[k] = i; res(); }; i.onerror = () => rej(new Error('missing img/' + f)); i.src = 'img/' + f; })),
]).then(() => {
  SLIDES.forEach((fn, i) => { const x0 = i * SW; paper(x0); X.save(); X.beginPath(); X.rect(x0, 0, SW, SH); X.clip(); fn(x0, i); footer(x0, i === N - 1); X.restore(); });
  return true;
});
