// carousel-komik engine — comic pop-art carousel (1080x1350 per slide).
// Cream halftone paper, thick-bordered panels, jagged starbursts with speed lines, Bangers headlines
// with heavy black outline, speech bubbles, red marker circles, cartoon Taufik stickers.
// slides.js defines: N, ASSETS {key:'file'}, SLIDES [fn(x, i)].  DO NOT EDIT per carousel.
const SW = 1080, SH = 1350;
const K = { paper: '#F6EEDC', ink: '#111', red: '#E3262E', yel: '#FFD21F', yelLt: '#FFF0A0', blue: '#2F6FD6', white: '#fff' };
const cv = document.getElementById('c'); cv.width = SW * N; cv.height = SH; cv.style.width = (SW * N / 4) + 'px';
const X = cv.getContext('2d');
const IMG = {};
const F = { bang: s => `${s}px BG`, block: s => `${s}px AN`, b: s => `900 ${s}px IN`, m: s => `800 ${s}px IN`, r: s => `500 ${s}px IN` };
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function txt(s, x, y, f, fill = K.ink, align = 'left', ls = 0) { X.save(); X.font = f; X.textAlign = align; X.letterSpacing = ls + 'px'; X.fillStyle = fill; X.fillText(s, x, y); X.restore(); }
function tw(s, f) { X.save(); X.font = f; const w = X.measureText(s).width; X.restore(); return w; }
function rr(x, y, w, h, r) { X.beginPath(); X.roundRect(x, y, w, h, r); }
function wrap(s, f, maxW) { const out = []; let line = ''; for (const w of s.split(' ')) { const t = line ? line + ' ' + w : w; if (tw(t, f) > maxW && line) { out.push(line); line = w; } else line = t; } out.push(line); return out; }

// halftone dot field clipped to current path region (call inside save/clip)
function halftone(x, y, w, h, col, step = 22, maxR = 7, fromX = 0, fromY = 0) {
  X.fillStyle = col;
  for (let yy = y; yy < y + h; yy += step) for (let xx = x + ((yy / step) % 2 ? step / 2 : 0); xx < x + w; xx += step) {
    const d = Math.hypot(xx - fromX, yy - fromY) / Math.hypot(w, h); const r = maxR * Math.max(.15, 1 - d);
    X.beginPath(); X.arc(xx, yy, r, 0, 7); X.fill();
  }
}
function paper(x0) {
  X.fillStyle = K.paper; X.fillRect(x0, 0, SW, SH);
  X.save(); X.globalAlpha = .07; halftone(x0, 0, SW, SH, '#a2865c', 26, 4, x0, 0); X.restore();
}
// comic panel: thick black border, optional fill, offset shadow
function panel(x, y, w, h, fill = K.white, rot = 0) {
  X.save(); X.translate(x + w / 2, y + h / 2); X.rotate(rot);
  X.fillStyle = K.ink; X.fillRect(-w / 2 + 10, -h / 2 + 12, w, h);
  X.fillStyle = fill; X.fillRect(-w / 2, -h / 2, w, h);
  X.lineWidth = 9; X.strokeStyle = K.ink; X.strokeRect(-w / 2, -h / 2, w, h);
  X.restore();
}
// jagged starburst with optional speed lines + halftone
function burst(cx, cy, rx, ry, fill = K.red, spikes = 18, seed = 1, rays = true) {
  const R = rng(seed);
  if (rays) { X.save(); X.strokeStyle = K.ink; X.lineCap = 'round';
    for (let i = 0; i < 46; i++) { const a = i / 46 * Math.PI * 2 + R() * .05, r0 = Math.max(rx, ry) * (1.05 + R() * .1), r1 = r0 + 60 + R() * 140; X.lineWidth = 3 + R() * 6; X.beginPath(); X.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0 * ry / rx); X.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1 * ry / rx); X.stroke(); }
    X.restore(); }
  const pts = []; for (let i = 0; i < spikes * 2; i++) { const a = i / (spikes * 2) * Math.PI * 2, k = i % 2 ? .72 + R() * .08 : 1 + R() * .12; pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
  const path = () => { X.beginPath(); pts.forEach(([px, py], i) => i ? X.lineTo(px, py) : X.moveTo(px, py)); X.closePath(); };
  X.save(); X.translate(10, 12); path(); X.fillStyle = K.ink; X.fill(); X.restore();
  path(); X.fillStyle = fill; X.fill();
  X.save(); path(); X.clip(); X.globalAlpha = .28; halftone(cx - rx * 1.2, cy - ry * 1.2, rx * 2.4, ry * 2.4, fill === K.yel ? K.red : K.yel, 20, 6, cx + rx, cy - ry); X.restore();
  path(); X.lineWidth = 9; X.strokeStyle = K.ink; X.lineJoin = 'round'; X.stroke();
}
// comic headline: heavy black outline + offset shadow, Bangers
function pow(s, x, y, size, fill = K.yel, align = 'center', rot = 0) {
  X.save(); X.translate(x, y); X.rotate(rot); X.font = F.bang(size); X.textAlign = align; X.lineJoin = 'round'; X.letterSpacing = '2px';
  X.fillStyle = K.ink; X.fillText(s, size * .05, size * .06);
  X.strokeStyle = K.ink; X.lineWidth = size * .14; X.strokeText(s, 0, 0);
  X.fillStyle = fill; X.fillText(s, 0, 0); X.restore();
}
// speech bubble with tail pointing to (tx,ty); lines in Bangers
function bubble(lines, cx, cy, w, h, tx, ty, size = 64, colMap = {}) {
  X.save();
  const tail = () => { X.beginPath(); X.moveTo(cx - w * .12, cy + h * .3); X.quadraticCurveTo(cx, cy + h * .4, tx, ty); X.lineTo(cx + w * .08, cy + h * .32); X.closePath(); };
  X.fillStyle = K.ink; X.save(); X.translate(8, 10); X.beginPath(); X.ellipse(cx, cy, w / 2, h / 2, 0, 0, 7); X.fill(); tail(); X.fill(); X.restore();
  X.fillStyle = K.white; X.beginPath(); X.ellipse(cx, cy, w / 2, h / 2, 0, 0, 7); X.fill(); tail(); X.fill();
  X.lineWidth = 8; X.strokeStyle = K.ink; X.beginPath(); X.ellipse(cx, cy, w / 2, h / 2, 0, 0, 7); X.stroke(); tail(); X.stroke();
  X.fillStyle = K.white; X.beginPath(); X.ellipse(cx, cy, w / 2 - 4, h / 2 - 4, 0, 0, 7); X.fill();
  const lh = size * .95, y0 = cy - (lines.length - 1) * lh / 2 + size * .33;
  lines.forEach((l, i) => txt(l, cx, y0 + i * lh, F.bang(size), colMap[i] || K.ink, 'center', 1));
  X.restore();
}
// yellow marker label (like "29 JAN 2026")
function label(s, cx, cy, size = 44, bg = K.yel, fg = K.ink, rot = -.03) {
  const w = tw(s, F.bang(size)) + 60, h = size * 1.25; X.save(); X.translate(cx, cy); X.rotate(rot);
  X.fillStyle = bg; X.beginPath(); X.moveTo(-w / 2, -h / 2 + 4); X.lineTo(w / 2, -h / 2); X.lineTo(w / 2 - 8, h / 2); X.lineTo(-w / 2 + 6, h / 2 - 3); X.closePath(); X.fill();
  txt(s, 0, size * .36, F.bang(size), fg, 'center', 1); X.restore();
}
// red hand-drawn ellipse circling something
function circleMark(cx, cy, rx, ry, rot = -.08) { X.save(); X.translate(cx, cy); X.rotate(rot); X.strokeStyle = K.red; X.lineWidth = 9; X.lineCap = 'round'; X.beginPath(); X.ellipse(0, 0, rx, ry, 0, .3, Math.PI * 2 + .1); X.stroke(); X.beginPath(); X.ellipse(4, 3, rx * 1.03, ry * 1.06, 0, 1.2, 3.4); X.lineWidth = 5; X.stroke(); X.restore(); }
// little action ticks "! ! !" around a point
function ticks(cx, cy, r = 80, seed = 2) { const R = rng(seed); X.save(); X.strokeStyle = K.ink; X.lineWidth = 7; X.lineCap = 'round'; for (let i = 0; i < 5; i++) { const a = -2.6 + i * .5 + R() * .1; X.beginPath(); X.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); X.lineTo(cx + Math.cos(a) * (r + 40), cy + Math.sin(a) * (r + 40)); X.stroke(); } X.restore(); }
// big red comic arrow
function bigArrow(x1, y1, x2, y2, th = 40) {
  const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1);
  X.save(); X.translate(x1, y1); X.rotate(a);
  const p = () => { X.beginPath(); X.moveTo(0, -th / 2); X.lineTo(L - th * 1.4, -th / 2); X.lineTo(L - th * 1.4, -th * 1.2); X.lineTo(L, 0); X.lineTo(L - th * 1.4, th * 1.2); X.lineTo(L - th * 1.4, th / 2); X.lineTo(0, th / 2); X.closePath(); };
  X.save(); X.translate(6, 8); p(); X.fillStyle = K.ink; X.fill(); X.restore(); p(); X.fillStyle = K.red; X.fill(); X.lineWidth = 6; X.strokeStyle = K.ink; X.stroke(); X.restore();
}
function img(im, cx, by, h) { const w = h * im.width / im.height; X.drawImage(im, cx - w / 2, by - h, w, h); }
function photoPanel(im, x, y, w, h, fx = .5, fy = .5, rot = 0) {
  panel(x, y, w, h, K.white, rot);
  X.save(); X.translate(x + w / 2, y + h / 2); X.rotate(rot); X.beginPath(); X.rect(-w / 2 + 5, -h / 2 + 5, w - 10, h - 10); X.clip();
  const s = Math.max(w / im.width, h / im.height), sw = w / s, sh = h / s;
  X.drawImage(im, Math.max(0, Math.min(im.width - sw, fx * im.width - sw / 2)), Math.max(0, Math.min(im.height - sh, fy * im.height - sh / 2)), sw, sh, -w / 2, -h / 2, w, h); X.restore();
}
function footer(x0, i, last) {
  rr(x0 + 40, SH - 92, 250, 56, 28); X.fillStyle = K.ink; X.fill(); X.beginPath(); X.arc(x0 + 70, SH - 64, 9, 0, 7); X.fillStyle = K.yel; X.fill();
  txt('@taufik.pg', x0 + 88, SH - 53, F.m(28), '#fff');
  if (!last) { const ax = x0 + SW - 90, ay = SH - 64; X.beginPath(); X.arc(ax, ay, 40, 0, 7); X.fillStyle = K.yel; X.fill(); X.lineWidth = 6; X.strokeStyle = K.ink; X.stroke();
    X.lineWidth = 8; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath(); X.moveTo(ax - 14, ay); X.lineTo(ax + 14, ay); X.moveTo(ax, ay - 14); X.lineTo(ax + 15, ay); X.lineTo(ax, ay + 14); X.stroke();
    txt('SWIPE', ax - 58, ay + 12, F.bang(36), K.ink, 'right', 2); }
  txt(`${i + 1}/${N}`, x0 + SW / 2, SH - 52, F.bang(34), K.ink, 'center', 2);
}

window.ready = Promise.all([
  ...[F.bang(40), F.block(40), F.b(40), F.m(40), F.r(40)].map(f => document.fonts.load(f)),
  ...Object.entries(ASSETS).map(([k, f]) => new Promise((res, rej) => { const i = new Image(); i.onload = () => { IMG[k] = i; res(); }; i.onerror = () => rej(new Error('missing img/' + f)); i.src = 'img/' + f; })),
]).then(() => {
  SLIDES.forEach((fn, i) => { const x0 = i * SW; paper(x0); X.save(); X.beginPath(); X.rect(x0, 0, SW, SH); X.clip(); fn(x0, i); footer(x0, i, i === N - 1); X.restore(); });
  return true;
});
