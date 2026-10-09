// carousel-maroon engine — "impian" promo style (1080x1350 per slide).
// Blurred real-photo background + dark vignette, Poppins ExtraBold Italic white headlines with
// maroon pill highlight, yellow doodle strokes/sparkles, maroon info cards with gold numbers,
// white-bordered photo cards, white cutout portrait. slides.js: N, ASSETS, SLIDES[]. DO NOT EDIT per carousel.
const SW = 1080, SH = 1350;
const K = { maroon: '#7A1626', maroon2: '#5C0F1C', gold: '#F5C542', gold2: '#E9A91C', white: '#fff', ink: '#2A1A12', cream: '#FFF6E8' };
const cv = document.getElementById('c'); cv.width = SW * N; cv.height = SH; cv.style.width = (SW * N / 4) + 'px';
const X = cv.getContext('2d');
const IMG = {};
const F = { h: s => `italic 800 ${s}px PP`, hh: s => `italic 900 ${s}px PP`, b: s => `700 ${s}px PP`, m: s => `600 ${s}px PP` };
function txt(s, x, y, f, fill = K.white, align = 'left', ls = 0) { X.save(); X.font = f; X.textAlign = align; X.letterSpacing = ls + 'px'; X.fillStyle = fill; X.fillText(s, x, y); X.restore(); }
function tw(s, f) { X.save(); X.font = f; const w = X.measureText(s).width; X.restore(); return w; }
function rr(x, y, w, h, r) { X.beginPath(); X.roundRect(x, y, w, h, r); }
function wrap(s, f, maxW) { const out = []; let line = ''; for (const w of s.split(' ')) { const t = line ? line + ' ' + w : w; if (tw(t, f) > maxW && line) { out.push(line); line = w; } else line = t; } out.push(line); return out; }
function shadow(fn, blur = 30, a = .45, dy = 14) { X.save(); X.shadowColor = `rgba(0,0,0,${a})`; X.shadowBlur = blur; X.shadowOffsetY = dy; fn(); X.restore(); }
function goldGrad(y0, y1) { const g = X.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#FFE79A'); g.addColorStop(.5, K.gold); g.addColorStop(1, K.gold2); return g; }

// blurred photo background + warm vignette
function bgPhoto(x0, im, blur = 16, dark = .35, fx = .5, fy = .5) {
  X.save(); X.beginPath(); X.rect(x0, 0, SW, SH); X.clip();
  const s = Math.max(SW / im.width, SH / im.height) * 1.12, w = im.width * s, h = im.height * s;
  X.filter = `blur(${blur}px) saturate(1.1)`; X.drawImage(im, x0 + SW / 2 - w * fx, SH / 2 - h * fy, w, h); X.filter = 'none';
  X.fillStyle = `rgba(20,8,6,${dark})`; X.fillRect(x0, 0, SW, SH);
  const g = X.createRadialGradient(x0 + SW / 2, SH * .45, 200, x0 + SW / 2, SH * .5, 900); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.45)'); X.fillStyle = g; X.fillRect(x0, 0, SW, SH);
  X.restore();
}
// white bold-italic headline line with soft shadow
function headline(s, cx, y, size, fill = K.white) { shadow(() => txt(s, cx, y, F.h(size), fill, 'center'), 22, .55, 8); }
// maroon rounded pill behind white headline line(s)
function pillTitle(lines, cx, y, size, rot = -.02) {
  const lh = size * 1.1, w = Math.max(...lines.map(l => tw(l, F.h(size)))) + size * 1.1, h = lines.length * lh + size * .45;
  X.save(); X.translate(cx, y + h / 2 - size * .95); X.rotate(rot);
  shadow(() => { rr(-w / 2, -h / 2, w, h, size * .45); X.fillStyle = K.maroon; X.fill(); }, 30, .45, 14);
  X.restore();
  lines.forEach((l, i) => txt(l, cx, y + i * lh, F.h(size), K.white, 'center'));
  return y + lines.length * lh;
}
// thin subtitle (white bold) with wrap, centred
function sub(s, cx, y, w, size = 34, fill = K.white) { const ls = wrap(s, F.b(size), w); ls.forEach((l, i) => shadow(() => txt(l, cx, y + i * size * 1.25, F.b(size), fill, 'center'), 12, .6, 4)); return y + ls.length * size * 1.25; }
// yellow doodles
function strokes(cx, cy, s = 1, rot = 0) { X.save(); X.translate(cx, cy); X.rotate(rot); X.strokeStyle = K.gold; X.lineCap = 'round'; X.lineWidth = 9 * s; [[-.5, 0], [0, -.15], [.5, -.05]].forEach(([a], i) => { X.save(); X.rotate(a); X.beginPath(); X.moveTo(0, -30 * s); X.lineTo(0, -70 * s - (i === 1 ? 10 : 0)); X.stroke(); X.restore(); }); X.restore(); }
function underline(x1, x2, y) { X.save(); X.strokeStyle = K.gold; X.lineWidth = 8; X.lineCap = 'round'; X.beginPath(); X.moveTo(x1, y); X.quadraticCurveTo((x1 + x2) / 2, y - 12, x2, y + 2); X.stroke(); X.restore(); }
function sparkle(x, y, s, col = K.white) { X.save(); X.translate(x, y); X.strokeStyle = col; X.lineWidth = 4; X.fillStyle = 'rgba(255,255,255,0)'; X.beginPath(); X.moveTo(0, -s); X.quadraticCurveTo(0, 0, s, 0); X.quadraticCurveTo(0, 0, 0, s); X.quadraticCurveTo(0, 0, -s, 0); X.quadraticCurveTo(0, 0, 0, -s); X.stroke(); X.restore(); }
function curlyArrow(x1, y1, x2, y2) { X.save(); X.strokeStyle = K.gold; X.lineWidth = 7; X.lineCap = 'round'; X.lineJoin = 'round'; const mx = (x1 + x2) / 2 + 60, my = (y1 + y2) / 2; X.beginPath(); X.moveTo(x1, y1); X.quadraticCurveTo(mx, my, x2, y2); X.stroke(); const a = Math.atan2(y2 - my, x2 - mx); X.beginPath(); X.moveTo(x2 - 26 * Math.cos(a - .5), y2 - 26 * Math.sin(a - .5)); X.lineTo(x2, y2); X.lineTo(x2 - 26 * Math.cos(a + .5), y2 - 26 * Math.sin(a + .5)); X.stroke(); X.restore(); }
// photo card with thick white border
function photoCard(im, cx, cy, w, h, rot = 0, fx = .5, fy = .5) {
  X.save(); X.translate(cx, cy); X.rotate(rot);
  shadow(() => { rr(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24, 28); X.fillStyle = K.white; X.fill(); }, 30, .5, 16);
  X.save(); rr(-w / 2, -h / 2, w, h, 20); X.clip(); const s = Math.max(w / im.width, h / im.height), sw = w / s, sh = h / s;
  X.drawImage(im, Math.max(0, Math.min(im.width - sw, fx * im.width - sw / 2)), Math.max(0, Math.min(im.height - sh, fy * im.height - sh / 2)), sw, sh, -w / 2, -h / 2, w, h); X.restore();
  X.restore();
}
// white card with text lines; lines starting with '*' are maroon bold
function whiteCard(x, y, w, lines, size = 34, align = 'center') {
  const lh = size * 1.35, h = lines.length * lh + size * 1.2;
  shadow(() => { rr(x, y, w, h, 30); X.fillStyle = K.cream; X.fill(); }, 28, .4, 12);
  lines.forEach((l, i) => { const hot = l.startsWith('*'), t = hot ? l.slice(1) : l; txt(t, align === 'center' ? x + w / 2 : x + 40, y + size * 1.25 + i * lh, hot ? F.h(size) : F.m(size), hot ? K.maroon : K.ink, align); });
  return y + h;
}
// maroon info card (tier style): head label, big gold value, small caption
function tierCard(x, y, w, h, head, big, small) {
  shadow(() => { rr(x, y, w, h, 28); X.fillStyle = K.cream; X.fill(); }, 26, .45, 12);
  txt(head, x + w / 2, y + 78, F.h(54), K.ink, 'center');
  rr(x + 20, y + 110, w - 40, h - 130, 22); X.fillStyle = K.maroon; X.fill();
  let bs = Math.min(86, w * .3); while (tw(big, F.hh(bs)) > w - 70 && bs > 30) bs -= 2;
  txt(big, x + w / 2, y + h * .62, F.hh(bs), goldGrad(y + h * .45, y + h * .65), 'center');
  wrap(small, F.b(28), w - 70).forEach((l, i) => txt(l, x + w / 2, y + h * .62 + 50 + i * 34, F.b(28), K.white, 'center'));
}
// maroon row pill: left white box label → right maroon value (like dana kahwin)
function rowPill(x, y, w, left, right, small) {
  shadow(() => { rr(x, y, w, 100, 22); X.fillStyle = K.maroon; X.fill(); }, 20, .4, 8);
  const lw = w * .42; rr(x + 8, y + 8, lw, 84, 18); X.fillStyle = K.white; X.fill();
  txt(left, x + 8 + lw / 2, y + 63, F.b(34), K.ink, 'center');
  txt('›››', x + lw + 34, y + 66, F.hh(40), K.gold, 'left');
  txt(right, x + lw + 110, y + 64, F.hh(44), K.gold); if (small) txt(small, x + lw + 110 + tw(right, F.hh(44)) + 14, y + 62, F.b(26), K.white);
}
// round icon badge (maroon circle, white stroke icon drawn by fn)
function badge(cx, cy, r, fn) { shadow(() => { X.beginPath(); X.arc(cx, cy, r, 0, 7); X.fillStyle = K.white; X.fill(); }, 16, .35, 6); X.beginPath(); X.arc(cx, cy, r - 6, 0, 7); X.fillStyle = K.maroon; X.fill(); X.save(); X.translate(cx, cy); X.strokeStyle = K.white; X.fillStyle = K.white; X.lineWidth = 6; X.lineCap = 'round'; X.lineJoin = 'round'; fn(r); X.restore(); }
function cutout(im, cx, by, h) { const w = h * im.width / im.height; shadow(() => X.drawImage(im, cx - w / 2, by - h, w, h), 30, .45, 10); }
function footer(x0, i, last) {
  rr(x0 + 40, SH - 92, 240, 54, 27); X.fillStyle = 'rgba(0,0,0,.55)'; X.fill(); X.beginPath(); X.arc(x0 + 70, SH - 65, 9, 0, 7); X.fillStyle = K.gold; X.fill();
  txt('@taufik.pg', x0 + 88, SH - 54, F.b(26), K.white);
  if (!last) { rr(x0 + SW - 230, SH - 92, 190, 54, 27); X.fillStyle = K.maroon; X.fill(); txt('Swipe ›', x0 + SW - 135, SH - 54, F.h(28), K.gold, 'center'); }
}

window.ready = Promise.all([
  ...[F.h(40), F.hh(40), F.b(40), F.m(40)].map(f => document.fonts.load(f)),
  ...Object.entries(ASSETS).map(([k, f]) => new Promise((res, rej) => { const i = new Image(); i.onload = () => { IMG[k] = i; res(); }; i.onerror = () => rej(new Error('missing img/' + f)); i.src = 'img/' + f; })),
]).then(() => {
  SLIDES.forEach((fn, i) => { const x0 = i * SW; X.save(); X.beginPath(); X.rect(x0, 0, SW, SH); X.clip(); fn(x0, i); footer(x0, i, i === N - 1); X.restore(); });
  return true;
});
