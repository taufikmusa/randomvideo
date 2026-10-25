// video-carousel-mix engine — footage Taufik bercakap + B-roll MIX 5 gaya carousel (1080x1920, 30fps). JANGAN EDIT per video.
// Gaya: MA maroon · PA pastel (kartun keluarga) · RD red komik · ED editorial · TH thumbnail. Kapsyen sentiasa Poppins ExtraBold Italic.
// Dimuat: engine.js → scenes.js (DUR, HEADN, ASSETS, SEG, SCENES, bakeAll) → run.js
const W = 1080, H = 1920, SW = W, SH = H, FPS = 30;
const cv = document.getElementById('c'); cv.width = W; cv.height = H;
let X = cv.getContext('2d');
const IMG = {}, BGS = {};

// ---------- asas dikongsi ----------
const clamp = v => Math.max(0, Math.min(1, v));
const easeOut = p => 1 - Math.pow(1 - p, 3);
const back = p => { p = clamp(p); const c = 1.70158; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function tw(s, f) { X.save(); X.font = f; const w = X.measureText(s).width; X.restore(); return w; }
function rr(x, y, w, h, r) { X.beginPath(); X.roundRect(x, y, w, h, r); }
function shadow(fn, blur = 30, a = .45, dy = 14) { X.save(); X.shadowColor = `rgba(0,0,0,${a})`; X.shadowBlur = blur; X.shadowOffsetY = dy; fn(); X.restore(); }
function fitSize(lines, size, maxW, fn) { while (Math.max(...lines.map(l => tw(l, fn(size)))) > maxW && size > 24) size -= 2; return size; }
function bake(key, fn) { const c = document.createElement('canvas'); c.width = W; c.height = H; const old = X; X = c.getContext('2d'); fn(); X = old; BGS[key] = c; }
function anim(lt, at, cx, cy, fn, o = {}) {
  if (lt < at) return; const p = back((lt - at) / (o.dur || .42));
  X.save(); X.globalAlpha = clamp((lt - at) / .2); X.translate(cx, cy + (1 - clamp(p)) * (o.dy ?? 50)); X.scale(.88 + .12 * p, .88 + .12 * p); X.translate(-cx, -cy); fn(p); X.restore();
}
const bob = (lt, a = 8, sp = 2.2, ph = 0) => Math.sin(lt * sp + ph) * a;

// ======================= MAROON (carousel-maroon) =======================
const MA = (() => {
  const K = { maroon: '#7A1626', maroon2: '#3A0710', gold: '#F5C542', gold2: '#E9A91C', white: '#fff', ink: '#2A1A12', cream: '#FFF6E8' };
  const F = { h: s => `italic 800 ${s}px PP`, hh: s => `italic 900 ${s}px PP`, b: s => `700 ${s}px PP`, m: s => `600 ${s}px PP` };
  function txt(s, x, y, f, fill = K.white, align = 'left', ls = 0) { X.save(); X.font = f; X.textAlign = align; X.letterSpacing = ls + 'px'; X.fillStyle = fill; X.fillText(s, x, y); X.restore(); }
  function wrap(s, f, maxW) { const out = []; let line = ''; for (const w of s.split(' ')) { const t = line ? line + ' ' + w : w; if (tw(t, f) > maxW && line) { out.push(line); line = w; } else line = t; } out.push(line); return out; }
  function goldGrad(y0, y1) { const g = X.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#FFE79A'); g.addColorStop(.5, K.gold); g.addColorStop(1, K.gold2); return g; }
  let PW = 600;
  function headline(s, cx, y, size, fill = K.white, maxW = 980) { size = fitSize([s], size, maxW, F.h); shadow(() => txt(s, cx, y, F.h(size), fill, 'center'), 22, .55, 8); }
  function pillTitle(lines, cx, y, size, rot = -.02) {
    size = fitSize(lines, size, 900, F.h);
    const lh = size * 1.1, w = Math.max(...lines.map(l => tw(l, F.h(size)))) + size * 1.1, h = lines.length * lh + size * .45;
    X.save(); X.translate(cx, y + h / 2 - size * .95); X.rotate(rot);
    shadow(() => { rr(-w / 2, -h / 2, w, h, size * .45); X.fillStyle = K.maroon; X.fill(); }, 30, .45, 14); X.restore();
    lines.forEach((l, i) => txt(l, cx, y + i * lh, F.h(size), K.white, 'center')); PW = w; return y + lines.length * lh;
  }
  function strokes(cx, cy, s = 1, rot = 0) { X.save(); X.translate(cx, cy); X.rotate(rot); X.strokeStyle = K.gold; X.lineCap = 'round'; X.lineWidth = 9 * s; [[-.5, 0], [0, -.15], [.5, -.05]].forEach(([a], i) => { X.save(); X.rotate(a); X.beginPath(); X.moveTo(0, -30 * s); X.lineTo(0, -70 * s - (i === 1 ? 10 : 0)); X.stroke(); X.restore(); }); X.restore(); }
  function side(cy, s = 1) { const o = Math.min(PW / 2 + 55, 490); strokes(540 - o, cy, s, -.9); strokes(540 + o, cy, s, .9); }
  function sub(s, cx, y, w, size = 34, fill = K.white) { const ls = wrap(s, F.b(size), w); ls.forEach((l, i) => shadow(() => txt(l, cx, y + i * size * 1.25, F.b(size), fill, 'center'), 12, .6, 4)); return y + ls.length * size * 1.25; }
  function sparkle(x, y, s, col = K.white) { X.save(); X.translate(x, y); X.strokeStyle = col; X.lineWidth = 4; X.beginPath(); X.moveTo(0, -s); X.quadraticCurveTo(0, 0, s, 0); X.quadraticCurveTo(0, 0, 0, s); X.quadraticCurveTo(0, 0, -s, 0); X.quadraticCurveTo(0, 0, 0, -s); X.stroke(); X.restore(); }
  function curlyArrow(x1, y1, x2, y2) { X.save(); X.strokeStyle = K.gold; X.lineWidth = 7; X.lineCap = 'round'; X.lineJoin = 'round'; const mx = (x1 + x2) / 2 + 60, my = (y1 + y2) / 2; X.beginPath(); X.moveTo(x1, y1); X.quadraticCurveTo(mx, my, x2, y2); X.stroke(); const a = Math.atan2(y2 - my, x2 - mx); X.beginPath(); X.moveTo(x2 - 26 * Math.cos(a - .5), y2 - 26 * Math.sin(a - .5)); X.lineTo(x2, y2); X.lineTo(x2 - 26 * Math.cos(a + .5), y2 - 26 * Math.sin(a + .5)); X.stroke(); X.restore(); }
  function photoCard(im, cx, cy, w, h, rot = 0, fx = .5, fy = .5) {
    X.save(); X.translate(cx, cy); X.rotate(rot);
    shadow(() => { rr(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24, 28); X.fillStyle = K.white; X.fill(); }, 30, .5, 16);
    X.save(); rr(-w / 2, -h / 2, w, h, 20); X.clip(); const s = Math.max(w / im.width, h / im.height), sw = w / s, sh = h / s;
    X.drawImage(im, Math.max(0, Math.min(im.width - sw, fx * im.width - sw / 2)), Math.max(0, Math.min(im.height - sh, fy * im.height - sh / 2)), sw, sh, -w / 2, -h / 2, w, h); X.restore(); X.restore();
  }
  function whiteCard(x, y, w, lines, size = 34) {
    const lh = size * 1.35, h = lines.length * lh + size * 1.2;
    shadow(() => { rr(x, y, w, h, 30); X.fillStyle = K.cream; X.fill(); }, 28, .4, 12);
    lines.forEach((l, i) => { const hot = l.startsWith('*'), t = hot ? l.slice(1) : l; txt(t, x + w / 2, y + size * 1.25 + i * lh, hot ? F.h(size) : F.m(size), hot ? K.maroon : K.ink, 'center'); });
    return y + h;
  }
  function rowPill(x, y, w, left, right) {
    shadow(() => { rr(x, y, w, 110, 24); X.fillStyle = K.maroon; X.fill(); }, 20, .4, 8);
    const lw = w * .36; rr(x + 8, y + 8, lw, 94, 20); X.fillStyle = K.white; X.fill();
    txt(left, x + 8 + lw / 2, y + 70, F.b(fitSize([left], 36, lw - 24, F.b)), K.ink, 'center');
    txt('›››', x + lw + 26, y + 74, F.hh(40), K.gold, 'left');
    const rx = x + lw + 100, rs = fitSize([right], 46, x + w - rx - 20, F.hh); txt(right, rx, y + 72, F.hh(rs), K.gold);
  }
  function chip(label, cx, cy, size = 40) {   // pil maroon kecil bergaris emas
    const f = F.h(size); X.save(); X.font = f; const w = X.measureText(label).width + size * 1.4, h = size * 1.7; X.restore();
    shadow(() => { rr(cx - w / 2, cy - h / 2, w, h, h / 2); X.fillStyle = K.maroon; X.fill(); }, 20, .45, 8); rr(cx - w / 2 + 4, cy - h / 2 + 4, w - 8, h - 8, h / 2 - 4); X.lineWidth = 3; X.strokeStyle = K.gold; X.stroke();
    txt(label, cx, cy + size * .36, f, K.white, 'center');
  }
  function bgPhoto(imKey, blur = 16, dark = .45) {
    const im = IMG[imKey], c = document.createElement('canvas'); c.width = 1300; c.height = 2310; const g = c.getContext('2d');
    const s = Math.max(1300 / im.width, 2310 / im.height) * 1.1, w = im.width * s, h = im.height * s;
    g.filter = `blur(${blur}px) saturate(1.1)`; g.drawImage(im, 650 - w / 2, 1155 - h / 2, w, h); g.filter = 'none';
    g.fillStyle = `rgba(20,8,6,${dark})`; g.fillRect(0, 0, 1300, 2310);
    const rg = g.createRadialGradient(650, 1000, 300, 650, 1155, 1300); rg.addColorStop(0, 'rgba(0,0,0,0)'); rg.addColorStop(1, 'rgba(0,0,0,.5)'); g.fillStyle = rg; g.fillRect(0, 0, 1300, 2310);
    return c;
  }
  function chapter(lt, n, l1, l2, subtxt, tag = 'BENTENG') {
    anim(lt, .05, 540, 270, () => { shadow(() => { rr(540 - 190, 215, 380, 66, 33); X.fillStyle = K.gold; X.fill(); }, 20, .4, 8); txt(tag + ' ' + n, 540, 262, F.hh(34), K.maroon2, 'center', 2); });
    anim(lt, .22, 540, 420, () => pillTitle(l2 ? [l1, l2] : [l1], 540, 365, 78));
    if (subtxt) anim(lt, .5, 540, 560, () => sub(subtxt, 540, 566 + (l2 ? 70 : 0), 860, 38));
    anim(lt, .22, 540, 420, () => side(400));
  }
  function tierCard(x, y, w, h, head, big, small) {
    shadow(() => { rr(x, y, w, h, 28); X.fillStyle = K.cream; X.fill(); }, 26, .45, 12);
    txt(head, x + w / 2, y + 78, F.h(fitSize([head], 54, w - 40, F.h)), K.ink, 'center');
    rr(x + 20, y + 110, w - 40, h - 130, 22); X.fillStyle = K.maroon; X.fill();
    let bs = Math.min(100, w * .3); while (tw(big, F.hh(bs)) > w - 70 && bs > 30) bs -= 2;
    txt(big, x + w / 2, y + h * .58, F.hh(bs), goldGrad(y + h * .4, y + h * .62), 'center');
    wrap(small, F.b(32), w - 80).forEach((l, i) => txt(l, x + w / 2, y + h * .58 + 62 + i * 40, F.b(32), K.white, 'center'));
  }
  function badge(cx, cy, r, fn) { shadow(() => { X.beginPath(); X.arc(cx, cy, r, 0, 7); X.fillStyle = K.white; X.fill(); }, 16, .35, 6); X.beginPath(); X.arc(cx, cy, r - 6, 0, 7); X.fillStyle = K.maroon; X.fill(); X.save(); X.translate(cx, cy); X.scale(r / 80, r / 80); X.strokeStyle = K.white; X.fillStyle = K.white; X.lineWidth = 6; X.lineCap = 'round'; X.lineJoin = 'round'; fn(r); X.restore(); }
  return { K, F, txt, headline, pillTitle, side, sub, strokes, sparkle, curlyArrow, photoCard, whiteCard, rowPill, tierCard, badge, chip, bgPhoto, chapter };
})();

// ======================= PASTEL (carousel-pastel) =======================
const PA = (() => {
  const K = { ink: '#3B2A20', brown: '#6B4A33', cream: '#FFF6E5', peach: '#FFD9C2', pink: '#FFD1DC', mint: '#CFEFDF', sky: '#CFE6FA', butter: '#FFEFA8', lilac: '#E6DAFB', white: '#fff', gold: '#E9B23A', red: '#E2574C', green: '#3FA36B' };
  const F = { t: s => `700 ${s}px FR`, t6: s => `600 ${s}px FR`, b: s => `700 ${s}px NU`, bb: s => `900 ${s}px NU` };
  function txt(s, x, y, f, fill = K.ink, align = 'left', ls = 0) { X.save(); X.font = f; X.textAlign = align; X.letterSpacing = ls + 'px'; X.fillStyle = fill; X.fillText(s, x, y); X.restore(); }
  function wrap(s, f, maxW) { const out = []; let line = ''; for (const w of s.split(' ')) { const t = line ? line + ' ' + w : w; if (tw(t.replace(/\*/g, ''), f) > maxW && line) { out.push(line); line = w; } else line = t; } out.push(line); return out; }
  function soft(fn, blur = 26, a = .16, dy = 14) { X.save(); X.filter = `blur(${blur}px)`; X.globalAlpha = a; X.translate(0, dy); X.fillStyle = '#5a3a20'; fn(); X.fill(); X.restore(); }
  function bg(col, seed) {
    X.fillStyle = col; X.fillRect(0, 0, SW, SH);
    const R = rng(seed + 3); X.save(); X.globalAlpha = .45;
    for (let i = 0; i < 6; i++) { X.fillStyle = [K.white, K.peach, K.pink, K.mint, K.butter, K.white][i]; X.beginPath(); X.ellipse(R() * SW, R() * SH, 160 + R() * 220, 130 + R() * 180, R() * 3, 0, 7); X.fill(); }
    X.restore(); X.save(); X.globalAlpha = .18; X.fillStyle = K.brown;
    for (let y = 40; y < SH; y += 56) for (let x = 40 + (y / 56 % 2) * 28; x < SW; x += 56) { X.beginPath(); X.arc(x, y, 3, 0, 7); X.fill(); }
    X.restore();
  }
  function title(s, x, y, size, maxW = 940, align = 'left', lh = 1.08) {
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
  function pill(s, cx, cy, size = 44, fg = K.ink, bgc = K.white, rot = 0) {
    const w = tw(s, F.t(size)) + size * 1.2, h = size * 1.5; X.save(); X.translate(cx, cy); X.rotate(rot);
    soft(() => rr(-w / 2, -h / 2, w, h, h / 2), 14, .2, 8);
    rr(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, h / 2 + 8); X.fillStyle = K.white; X.fill();
    rr(-w / 2, -h / 2, w, h, h / 2); X.fillStyle = bgc; X.fill(); X.lineWidth = 4; X.strokeStyle = K.ink; X.stroke();
    txt(s, 0, size * .36, F.t(size), fg, 'center'); X.restore(); return w;
  }
  function bubble(lines, cx, cy, w, h, tx, ty, size = 48) {
    const path = () => { X.beginPath(); X.roundRect(cx - w / 2, cy - h / 2, w, h, Math.min(h / 2, 60)); const a = Math.atan2(ty - cy, tx - cx), bx = cx + Math.cos(a) * w * .25, by = cy + Math.sin(a) * h * .3;
      X.moveTo(bx - 34, by); X.quadraticCurveTo(tx * .4 + bx * .6, ty * .4 + by * .6, tx, ty); X.quadraticCurveTo(tx * .3 + bx * .7 + 10, ty * .3 + by * .7, bx + 34, by); };
    soft(path, 18, .18, 10); path(); X.fillStyle = K.white; X.fill(); X.lineWidth = 4; X.strokeStyle = K.ink; X.stroke();
    X.beginPath(); X.roundRect(cx - w / 2 + 3, cy - h / 2 + 3, w - 6, h - 6, Math.min(h / 2, 60)); X.fillStyle = K.white; X.fill();
    const lh = size * 1.15, y0 = cy - (lines.length - 1) * lh / 2 + size * .36;
    lines.forEach((l, i) => { const hot = l.startsWith('*'); txt(hot ? l.slice(1) : l, cx, y0 + i * lh, F.t(size), hot ? K.red : K.ink, 'center'); });
  }
  function card(x, y, w, h, fill = K.white, r = 40) { soft(() => rr(x, y, w, h, r), 30, .16, 18); rr(x, y, w, h, r); X.fillStyle = fill; X.fill(); }
  function chara(im, cx, by, h, flip = false) {
    const w = h * im.width / im.height;
    X.save(); X.globalAlpha = .18; X.fillStyle = '#5a3a20'; X.beginPath(); X.ellipse(cx, by - 6, w * .38, 18, 0, 0, 7); X.filter = 'blur(10px)'; X.fill(); X.restore();
    X.save(); X.translate(cx, by); if (flip) X.scale(-1, 1); X.drawImage(im, -w / 2, -h, w, h); X.restore();
  }
  function goldBar(cx, cy, w, rot = 0, label = '') {
    const h = w * .5; X.save(); X.translate(cx, cy); X.rotate(rot);
    soft(() => rr(-w / 2, -h / 2, w, h, h * .22), 12, .2, 8);
    rr(-w / 2, -h / 2, w, h, h * .22); X.fillStyle = '#F6C94C'; X.fill(); X.lineWidth = Math.max(3, w * .025); X.strokeStyle = K.ink; X.stroke();
    rr(-w / 2 + w * .1, -h / 2 + h * .18, w * .8, h * .64, h * .14); X.fillStyle = '#FFE38A'; X.fill();
    X.fillStyle = '#fff'; X.globalAlpha = .8; rr(-w / 2 + w * .14, -h / 2 + h * .24, w * .22, h * .1, 6); X.fill(); X.globalAlpha = 1;
    if (label) txt(label, 0, h * .14, F.t(h * .34), K.brown, 'center'); X.restore();
  }
  function coin(cx, cy, r, label = '') { soft(() => { X.beginPath(); X.arc(cx, cy, r, 0, 7); }, 10, .2, 6); X.beginPath(); X.arc(cx, cy, r, 0, 7); X.fillStyle = '#F6C94C'; X.fill(); X.lineWidth = 4; X.strokeStyle = K.ink; X.stroke(); X.beginPath(); X.arc(cx, cy, r * .74, 0, 7); X.strokeStyle = '#D79A1E'; X.stroke(); if (label) txt(label, cx, cy + r * .28, F.t(r * .8), K.brown, 'center'); }
  function photoCard(im, cx, cy, w, h, rot = 0, caption = '', fx = .5, fy = .5) {
    X.save(); X.translate(cx, cy); X.rotate(rot);
    soft(() => rr(-w / 2 - 16, -h / 2 - 16, w + 32, h + 32, 30), 24, .2, 14);
    rr(-w / 2 - 16, -h / 2 - 16, w + 32, h + 32, 30); X.fillStyle = K.white; X.fill(); X.lineWidth = 3; X.strokeStyle = 'rgba(59,42,32,.25)'; X.stroke();
    X.save(); rr(-w / 2, -h / 2, w, h, 20); X.clip(); const s = Math.max(w / im.width, h / im.height), sw = w / s, sh = h / s;
    X.drawImage(im, Math.max(0, Math.min(im.width - sw, fx * im.width - sw / 2)), Math.max(0, Math.min(im.height - sh, fy * im.height - sh / 2)), sw, sh, -w / 2, -h / 2, w, h); X.restore();
    X.save(); X.rotate(-.08); X.globalAlpha = .85; X.fillStyle = K.butter; X.fillRect(-70, -h / 2 - 38, 140, 44); X.restore(); X.restore();
    if (caption) pill(caption, cx, cy + h / 2 + 50, 30, K.ink, K.white, rot);
  }
  function sparkle(x, y, s, col = '#FFC93C') { X.save(); X.translate(x, y); X.fillStyle = col; X.beginPath(); X.moveTo(0, -s); X.quadraticCurveTo(0, 0, s, 0); X.quadraticCurveTo(0, 0, 0, s); X.quadraticCurveTo(0, 0, -s, 0); X.quadraticCurveTo(0, 0, 0, -s); X.fill(); X.restore(); }
  function heart(x, y, s, col = K.red) { X.save(); X.translate(x, y); X.fillStyle = col; X.beginPath(); X.moveTo(0, s * .35); X.bezierCurveTo(-s * 1.1, -s * .3, -s * .45, -s * 1.05, 0, -s * .45); X.bezierCurveTo(s * .45, -s * 1.05, s * 1.1, -s * .3, 0, s * .35); X.fill(); X.restore(); }
  return { K, F, txt, bg, title, pill, bubble, card, chara, goldBar, coin, photoCard, sparkle, heart };
})();

// ======================= RED (carousel-red komik pop-art) =======================
const RD = (() => {
  const K = { paper: '#F6EEDC', ink: '#111', red: '#E3262E', yel: '#FFD21F', yelLt: '#FFF0A0', blue: '#2F6FD6', white: '#fff' };
  const F = { bang: s => `${s}px BG`, m: s => `800 ${s}px IN` };
  function txt(s, x, y, f, fill = K.ink, align = 'left', ls = 0) { X.save(); X.font = f; X.textAlign = align; X.letterSpacing = ls + 'px'; X.fillStyle = fill; X.fillText(s, x, y); X.restore(); }
  function halftone(x, y, w, h, col, step = 22, maxR = 7, fromX = 0, fromY = 0) {
    X.fillStyle = col;
    for (let yy = y; yy < y + h; yy += step) for (let xx = x + ((yy / step) % 2 ? step / 2 : 0); xx < x + w; xx += step) { const d = Math.hypot(xx - fromX, yy - fromY) / Math.hypot(w, h); const r = maxR * Math.max(.15, 1 - d); X.beginPath(); X.arc(xx, yy, r, 0, 7); X.fill(); }
  }
  function paper() { X.fillStyle = K.paper; X.fillRect(0, 0, SW, SH); X.save(); X.globalAlpha = .07; halftone(0, 0, SW, SH, '#a2865c', 26, 4, 0, 0); X.restore(); }
  function panel(x, y, w, h, fill = K.white, rot = 0) { X.save(); X.translate(x + w / 2, y + h / 2); X.rotate(rot); X.fillStyle = K.ink; X.fillRect(-w / 2 + 10, -h / 2 + 12, w, h); X.fillStyle = fill; X.fillRect(-w / 2, -h / 2, w, h); X.lineWidth = 9; X.strokeStyle = K.ink; X.strokeRect(-w / 2, -h / 2, w, h); X.restore(); }
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
  function pow(s, x, y, size, fill = K.yel, align = 'center', rot = 0) {
    X.save(); X.translate(x, y); X.rotate(rot); X.font = F.bang(size); X.textAlign = align; X.lineJoin = 'round'; X.letterSpacing = '2px';
    X.fillStyle = K.ink; X.fillText(s, size * .05, size * .06); X.strokeStyle = K.ink; X.lineWidth = size * .14; X.strokeText(s, 0, 0); X.fillStyle = fill; X.fillText(s, 0, 0); X.restore();
  }
  function bubble(lines, cx, cy, w, h, tx, ty, size = 64, colMap = {}) {
    X.save();
    const tail = () => { X.beginPath(); X.moveTo(cx - w * .12, cy + h * .3); X.quadraticCurveTo(cx, cy + h * .4, tx, ty); X.lineTo(cx + w * .08, cy + h * .32); X.closePath(); };
    X.fillStyle = K.ink; X.save(); X.translate(8, 10); X.beginPath(); X.ellipse(cx, cy, w / 2, h / 2, 0, 0, 7); X.fill(); tail(); X.fill(); X.restore();
    X.fillStyle = K.white; X.beginPath(); X.ellipse(cx, cy, w / 2, h / 2, 0, 0, 7); X.fill(); tail(); X.fill();
    X.lineWidth = 8; X.strokeStyle = K.ink; X.beginPath(); X.ellipse(cx, cy, w / 2, h / 2, 0, 0, 7); X.stroke(); tail(); X.stroke();
    X.fillStyle = K.white; X.beginPath(); X.ellipse(cx, cy, w / 2 - 4, h / 2 - 4, 0, 0, 7); X.fill();
    const lh = size * .95, y0 = cy - (lines.length - 1) * lh / 2 + size * .33;
    lines.forEach((l, i) => txt(l, cx, y0 + i * lh, F.bang(size), colMap[i] || K.ink, 'center', 1)); X.restore();
  }
  function label(s, cx, cy, size = 44, bgc = K.yel, fg = K.ink, rot = -.03) {
    X.font = F.bang(size); const w = tw(s, F.bang(size)) + 60, h = size * 1.25; X.save(); X.translate(cx, cy); X.rotate(rot);
    X.fillStyle = K.ink; X.beginPath(); X.moveTo(-w / 2 + 8, -h / 2 + 14); X.lineTo(w / 2 + 8, -h / 2 + 10); X.lineTo(w / 2, h / 2 + 10); X.lineTo(-w / 2 + 14, h / 2 + 7); X.closePath(); X.fill();
    X.fillStyle = bgc; X.beginPath(); X.moveTo(-w / 2, -h / 2 + 4); X.lineTo(w / 2, -h / 2); X.lineTo(w / 2 - 8, h / 2); X.lineTo(-w / 2 + 6, h / 2 - 3); X.closePath(); X.fill();
    txt(s, 0, size * .36, F.bang(size), fg, 'center', 1); X.restore();
  }
  function circleMark(cx, cy, rx, ry, rot = -.08) { X.save(); X.translate(cx, cy); X.rotate(rot); X.strokeStyle = K.red; X.lineWidth = 9; X.lineCap = 'round'; X.beginPath(); X.ellipse(0, 0, rx, ry, 0, .3, Math.PI * 2 + .1); X.stroke(); X.beginPath(); X.ellipse(4, 3, rx * 1.03, ry * 1.06, 0, 1.2, 3.4); X.lineWidth = 5; X.stroke(); X.restore(); }
  function ticks(cx, cy, r = 80, seed = 2) { const R = rng(seed); X.save(); X.strokeStyle = K.ink; X.lineWidth = 7; X.lineCap = 'round'; for (let i = 0; i < 5; i++) { const a = -2.6 + i * .5 + R() * .1; X.beginPath(); X.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); X.lineTo(cx + Math.cos(a) * (r + 40), cy + Math.sin(a) * (r + 40)); X.stroke(); } X.restore(); }
  function img(im, cx, by, h, flip = false) { const w = h * im.width / im.height; X.save(); X.translate(cx, by); if (flip) X.scale(-1, 1); X.drawImage(im, -w / 2, -h, w, h); X.restore(); }
  function photoPanel(im, x, y, w, h, fx = .5, fy = .5, rot = 0) {
    panel(x, y, w, h, K.white, rot);
    X.save(); X.translate(x + w / 2, y + h / 2); X.rotate(rot); X.beginPath(); X.rect(-w / 2 + 5, -h / 2 + 5, w - 10, h - 10); X.clip();
    const s = Math.max(w / im.width, h / im.height), sw = w / s, sh = h / s;
    X.drawImage(im, Math.max(0, Math.min(im.width - sw, fx * im.width - sw / 2)), Math.max(0, Math.min(im.height - sh, fy * im.height - sh / 2)), sw, sh, -w / 2, -h / 2, w, h); X.restore();
  }
  return { K, F, txt, paper, panel, burst, pow, bubble, label, circleMark, ticks, img, photoPanel };
})();

// ======================= EDITORIAL (carousel-editorial) =======================
const ED = (() => {
  const K = { bg: '#FBFAF7', ink: '#111111', red: '#E8522F', peach: '#F7E2D6', muted: '#4b4b4b', gold: '#C9971C' };
  const F = { num: s => `900 ${s}px IN`, brush: s => `${s}px PM`, block: s => `${s}px AN`, body: s => `500 ${s}px IN`, bodyB: s => `800 ${s}px IN`, hand: s => `700 ${s}px CV` };
  function txt(s, x, y, f, fill = K.ink, align = 'left', ls = 0) { X.save(); X.font = f; X.textAlign = align; X.letterSpacing = ls + 'px'; X.fillStyle = fill; X.fillText(s, x, y); X.restore(); }
  function swoosh(x1, y, x2, col = K.red, th = 9, seed = 1, p = 1) {
    const R = rng(seed); X.save(); X.strokeStyle = col; X.lineCap = 'round';
    for (let q = 0; q < 2; q++) { X.lineWidth = th * (q ? .55 : 1); const xe = x1 + (x2 - x1) * p; X.beginPath(); X.moveTo(x1 + q * 30, y + q * 9); X.quadraticCurveTo((x1 + xe) / 2, y - 10 + R() * 8 + q * 6, xe - q * 60 * p, y + 2 + q * 10); X.stroke(); }
    X.restore();
  }
  function burst(x, y, s = 1, rot = 0) { X.save(); X.translate(x, y); X.rotate(rot); X.strokeStyle = K.ink; X.lineWidth = 6 * s; X.lineCap = 'round'; [[-.9, 0], [-.35, -.2], [.25, -.1]].forEach(([a], i) => { X.save(); X.rotate(a); X.beginPath(); X.moveTo(0, -30 * s); X.lineTo(0, -70 * s - i * 6 * s); X.stroke(); X.restore(); }); X.restore(); }
  function arrow(x1, y1, x2, y2, bend = 60, col = K.ink, th = 5) {
    X.save(); X.strokeStyle = col; X.lineWidth = th; X.lineCap = 'round'; X.lineJoin = 'round';
    const mx = (x1 + x2) / 2 + bend, my = (y1 + y2) / 2 - bend * .3; X.beginPath(); X.moveTo(x1, y1); X.quadraticCurveTo(mx, my, x2, y2); X.stroke();
    const a = Math.atan2(y2 - my, x2 - mx); X.beginPath(); X.moveTo(x2 - 26 * Math.cos(a - .5), y2 - 26 * Math.sin(a - .5)); X.lineTo(x2, y2); X.lineTo(x2 - 26 * Math.cos(a + .5), y2 - 26 * Math.sin(a + .5)); X.stroke(); X.restore();
  }
  function bigNum(s, x, y, size, outline = false) { X.save(); X.translate(x, y); if (outline) { X.font = F.num(size); X.lineJoin = 'round'; X.lineWidth = size * .09; X.strokeStyle = '#fff'; X.strokeText(s, 0, 0); } txt(s, 0, 0, F.num(size), K.red); X.restore(); }
  function brushTitle(s, x, y, size, rot = -.03, under = true, col = K.ink, p = 1) { X.save(); X.translate(x, y); X.rotate(rot); txt(s, 0, 0, F.brush(size), col); if (under) swoosh(10, size * .22, tw(s, F.brush(size)) - 10, K.red, size * .09, s.length, p); X.restore(); }
  function note(lines, x, y, size = 46, rot = -.08, under = true, col = K.ink) {
    X.save(); X.translate(x, y); X.rotate(rot); lines.forEach((l, i) => txt(l, 0, i * size * 1.05, F.hand(size), col));
    if (under) { const w = tw(lines[lines.length - 1], F.hand(size)); swoosh(0, (lines.length - 1) * size * 1.05 + size * .28, Math.max(w, 80), K.red, 6, lines.length); } X.restore();
  }
  function sticky(lines, x, y, w = 250, rot = -.06, size = 44) {
    const h = lines.length * size * 1.02 + 56; X.save(); X.translate(x, y); X.rotate(rot);
    shadow(() => { X.fillStyle = K.peach; X.beginPath(); X.moveTo(0, 6); X.lineTo(w, 0); X.lineTo(w - 4, h); X.lineTo(4, h + 5); X.closePath(); X.fill(); }, 14, .2, 6);
    lines.forEach((l, i) => txt(l, 26, 50 + i * size * 1.02, F.hand(size), K.ink)); swoosh(26, h - 18, w - 30, K.ink, 4, 3); X.restore();
  }
  function photoBox(im, x, y, w, h, r = 26, fx = .5, fy = .5, rot = 0) {
    X.save(); X.translate(x + w / 2, y + h / 2); X.rotate(rot);
    X.save(); X.filter = 'blur(28px)'; X.fillStyle = 'rgba(0,0,0,.28)'; rr(-w / 2 + 14, -h / 2 + 30, w, h, r); X.fill(); X.restore();
    rr(-w / 2, -h / 2, w, h, r); X.clip(); const s = Math.max(w / im.width, h / im.height), sw = w / s, sh = h / s;
    X.drawImage(im, Math.max(0, Math.min(im.width - sw, fx * im.width - sw / 2)), Math.max(0, Math.min(im.height - sh, fy * im.height - sh / 2)), sw, sh, -w / 2, -h / 2, w, h); X.restore();
  }
  function paper() { X.fillStyle = K.bg; X.fillRect(0, 0, SW, SH); const R = rng(7); X.save(); X.globalAlpha = .035; for (let i = 0; i < 6000; i++) { X.fillStyle = R() < .5 ? '#000' : '#a07a50'; X.fillRect(R() * SW, R() * SH, 2, 2); } X.restore(); }
  return { K, F, txt, swoosh, burst, arrow, bigNum, brushTitle, note, sticky, photoBox, paper };
})();

// ======================= THUMBNAIL (carousel-thumbnail) =======================
const TH = (() => {
  const C = { navy: '#07152B', y: '#FFCE32', red: '#E0262E', ink: '#0b0b0b', green: '#16A34A' };
  const AN = s => `${s}px AN`, MO = s => `700 ${s}px MO`;
  function txt(s, x, y, f, fill, align = 'left', ls = 0) { X.save(); X.font = f; X.textAlign = align; X.letterSpacing = ls + 'px'; X.fillStyle = fill; X.fillText(s, x, y); X.restore(); }
  function brush(x, y, w, h, col, seed = 1) {
    const R = rng(seed); X.save(); X.fillStyle = col; X.beginPath(); X.moveTo(x + R() * 14, y + R() * 10);
    for (let i = 1; i <= 24; i++) X.lineTo(x + w * i / 24, y + (R() - .5) * 14);
    for (let i = 1; i <= 10; i++) X.lineTo(x + w + (R() - .3) * 26, y + h * i / 10);
    for (let i = 23; i >= 0; i--) X.lineTo(x + w * i / 24, y + h + (R() - .5) * 14);
    for (let i = 9; i > 0; i--) X.lineTo(x - (R() - .3) * 26, y + h * i / 10);
    X.closePath(); X.fill(); for (let i = 0; i < 40; i++) { X.globalAlpha = .5 + R() * .5; X.fillRect(x + w + 10 + R() * 40, y + R() * h, 3 + R() * 12, 2 + R() * 4); } X.restore();
  }
  function head(s, x, y, size, fill, sh = C.ink, align = 'left') { X.save(); X.font = AN(size); X.textAlign = align; X.lineJoin = 'round'; X.fillStyle = sh; X.fillText(s, x + size * .05, y + size * .06); X.strokeStyle = sh; X.lineWidth = size * .07; X.strokeText(s, x, y); X.fillStyle = fill; X.fillText(s, x, y); X.restore(); }
  function brushHead(s, cx, y, size, fill, bgc, seed) { const w = tw(s, AN(size)); brush(cx - w / 2 - 26, y - size * .9, w + 52, size * 1.05, bgc, seed); txt(s, cx - w / 2, y, AN(size), fill); return w; }
  function pill(s, cx, y, bgc, fg, size = 26, h = 60, ls = 4) { const f = MO(size); X.save(); X.font = f; X.letterSpacing = ls + 'px'; const w = X.measureText(s).width + 56; X.restore(); rr(cx - w / 2, y, w, h, h / 2); X.fillStyle = bgc; X.fill(); txt(s, cx - w / 2 + 28, y + h * .66, f, fg, 'left', ls); return w; }
  function photo(im, cx, cy, w, rot) {
    const h = w * im.height / im.width, b = 16; X.save(); X.translate(cx, cy); X.rotate(rot);
    X.save(); X.filter = 'blur(26px)'; X.fillStyle = 'rgba(0,0,0,.55)'; X.fillRect(-w / 2 - b + 16, -h / 2 - b + 30, w + 2 * b, h + 2 * b + 50); X.restore();
    X.fillStyle = '#fbfaf6'; X.fillRect(-w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b + 50); X.drawImage(im, -w / 2, -h / 2, w, h);
    X.save(); X.rotate(-.06); X.fillStyle = 'rgba(255,214,90,.85)'; X.fillRect(-80, -h / 2 - b - 26, 160, 48); X.restore(); X.restore();
  }
  function stamp(lines, cx, cy, rot, col, w, h) {
    X.save(); X.translate(cx, cy); X.rotate(rot); X.globalAlpha = .95; X.strokeStyle = col; X.lineWidth = 9; rr(-w / 2, -h / 2, w, h, 16); X.stroke(); X.lineWidth = 3; rr(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 10); X.stroke();
    txt(lines[0], 0, 4, AN(64), col, 'center', 2); txt(lines[1], 0, 50, MO(22), col, 'center', 4); X.restore();
  }
  function bg(kind) {
    const [a, b] = kind === 'red' ? ['#5c0d14', '#14040a'] : ['#1E3050', C.navy];
    const g = X.createRadialGradient(540, 800, 0, 540, 800, 1300); g.addColorStop(0, a); g.addColorStop(1, b); X.fillStyle = g; X.fillRect(0, 0, SW, SH);
    const R = rng(9); X.save(); X.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 40; i++) { const x = R() * SW, y = R() * SH, r = 30 + R() * 110, gg = X.createRadialGradient(x, y, 0, x, y, r); gg.addColorStop(0, `rgba(255,${150 + R() * 80 | 0},60,${.08 + R() * .1})`); gg.addColorStop(1, 'rgba(255,150,60,0)'); X.fillStyle = gg; X.fillRect(x - r, y - r, r * 2, r * 2); }
    X.restore(); X.save(); X.globalAlpha = .06; for (let i = 0; i < 30000; i++) { X.fillStyle = R() < .5 ? '#000' : '#fff'; X.fillRect(R() * SW, R() * SH, 2, 2); } X.restore();
  }
  return { C, txt, brush, head, brushHead, pill, photo, stamp, bg };
})();


// ---------- kapsyen (Poppins 800 italic, kata kunci emas) ----------
const CF = s => `italic 800 ${s}px PP`, CK = { gold: '#F5C542', maroon2: '#3A0710' };
const CAPS = [];
function buildCaps() {
  SEG.forEach(([a, b, s]) => {
  const words = s.split(' ').map(w => ({ t: w.replace('*', ''), hl: w.startsWith('*') }));
    const chunks = []; let cur = []; const len = c => c.map(w => w.t).join(' ').length;
    words.forEach(w => { if (cur.length && (cur.length >= 4 || len(cur) + w.t.length + 1 > 24)) { chunks.push(cur); cur = []; } cur.push(w); });
    if (cur.length) chunks.push(cur);
    if (chunks.length > 1 && chunks[chunks.length - 1].length === 1 && chunks[chunks.length - 2].length < 4) chunks[chunks.length - 2].push(...chunks.pop());
    const tot = chunks.reduce((s, c) => s + len(c) + 3, 0); let t = a;
    chunks.forEach(c => { const d = (b - a) * (len(c) + 3) / tot; CAPS.push({ a: t, b: t + d, w: c }); t += d; });
  });
}
function caption(t) {
  const c = CAPS.find(c => t >= c.a && t < c.b); if (!c) return;
  const lt = t - c.a, p = back(lt / .16), y = 1390;  // dinaikkan ±90% dari jarak bawah asal (1640 → 1390)
  const full = c.w.map(w => w.t).join(' '), size = fitSize([full], 68, 960, CF);
  X.save(); X.font = CF(size); X.letterSpacing = '0px';
  const widths = c.w.map(w => X.measureText(w.t).width), sp = X.measureText(' ').width, total = widths.reduce((a, b) => a + b, 0) + sp * (c.w.length - 1);
  X.translate(540, y - size * .35); X.scale(.9 + .1 * clamp(p), .9 + .1 * clamp(p)); X.translate(-540, -(y - size * .35)); X.globalAlpha = clamp(lt / .08);
  X.textAlign = 'left'; X.lineJoin = 'round'; let x = 540 - total / 2;
  c.w.forEach((w, i) => { X.save(); X.shadowColor = 'rgba(0,0,0,.6)'; X.shadowBlur = 18; X.shadowOffsetY = 6; X.lineWidth = size * .2; X.strokeStyle = CK.maroon2; X.strokeText(w.t, x, y); X.restore(); X.fillStyle = w.hl ? CK.gold : '#fff'; X.fillText(w.t, x, y); x += widths[i] + sp; });
  X.restore();
}

// ---------- footage kepala ----------
let curHead = null;
window.loadHead = i => new Promise(res => { i = Math.max(1, Math.min(HEADN, i)); const im = new Image(); im.onload = () => { curHead = im; res(); }; im.onerror = () => res(); im.src = 'src/' + String(i).padStart(5, '0') + '.jpg'; });
function head(lt, d, dir = 1) {
  const s = dir > 0 ? 1.02 + .07 * (lt / d) : 1.09 - .07 * (lt / d);
  if (curHead) { X.save(); X.translate(540, 820); X.scale(s, s); X.translate(-540, -820); X.drawImage(curHead, 0, 0, curHead.naturalWidth, curHead.naturalHeight, 0, 0, W, H); X.restore(); }
  let g = X.createLinearGradient(0, 0, 0, 560); g.addColorStop(0, 'rgba(24,8,12,.5)'); g.addColorStop(1, 'rgba(24,8,12,0)'); X.fillStyle = g; X.fillRect(0, 0, W, 560);   // lebih nipis supaya footage jelas
  g = X.createLinearGradient(0, 1200, 0, 1500); g.addColorStop(0, 'rgba(24,8,12,0)'); g.addColorStop(1, 'rgba(24,8,12,.6)'); X.fillStyle = g; X.fillRect(0, 1200, W, 300); X.fillStyle = 'rgba(24,8,12,.6)'; X.fillRect(0, 1500, W, H - 1500);
}


// ---------- HOOK TITLE (adegan pertama): Anton MERAH + stroke PUTIH tebal + pil tag emas + pil maroon ----------
function hookTitle(lt, o) {
  const K = MA.K, goldV = (y0, y1) => { const g = X.createLinearGradient(0, y0, 0, y1); [[0, '#FFF6C8'], [.3, '#FFD95A'], [.62, '#F5C542'], [1, '#B97A12']].forEach(([a, c]) => g.addColorStop(a, c)); return g; };
  anim(lt, .05, 540, 155, () => {  // tag
    const f = `italic 800 34px PP`; X.save(); X.font = f; X.letterSpacing = '8px'; const w = X.measureText(o.tag).width + 90; X.restore();
    shadow(() => { rr(540 - w / 2, 120, w, 66, 33); const g = X.createLinearGradient(0, 120, 0, 186); g.addColorStop(0, '#FFE79A'); g.addColorStop(1, K.gold2); X.fillStyle = g; X.fill(); }, 22, .5, 8);
    MA.txt(o.tag, 540 + 4, 165, f, K.maroon2, 'center', 8);
  });
  o.lines.forEach((ln, i) => anim(lt, .25 + i * .22, 540, 360 + i * 140, () => {   // judul besar: Anton MERAH + stroke PUTIH tebal (jelas dibaca)
    const size = fitSize([ln], 150, 960, s => `${s}px AN`), by = 362 + i * 132, f = `${size}px AN`;
    X.save(); X.font = f; X.textAlign = 'center'; X.lineJoin = 'round'; X.miterLimit = 2; X.letterSpacing = '2px';
    X.shadowColor = 'rgba(0,0,0,.65)'; X.shadowBlur = 22; X.shadowOffsetY = 14; X.lineWidth = size * .26; X.strokeStyle = '#1a0408'; X.strokeText(ln, 540, by);
    X.shadowColor = 'transparent'; X.lineWidth = size * .2; X.strokeStyle = '#fff'; X.strokeText(ln, 540, by);
    const rg = X.createLinearGradient(0, by - size * .8, 0, by + size * .05); rg.addColorStop(0, '#FF4D4D'); rg.addColorStop(.55, '#E3262E'); rg.addColorStop(1, '#B30E18'); X.fillStyle = rg; X.fillText(ln, 540, by);
    const bp = ((lt * .55 + i * .18) % 1.7 - .35) * 1200, hg = X.createLinearGradient(bp - 120, 0, bp + 120, 0); hg.addColorStop(0, 'rgba(255,255,255,0)'); hg.addColorStop(.5, 'rgba(255,255,255,.55)'); hg.addColorStop(1, 'rgba(255,255,255,0)');
    X.fillStyle = hg; X.fillText(ln, 540, by); X.restore();
  }));
  anim(lt, .75, 540, 575, () => {  // sub
    const f = `italic 900 50px PP`; X.save(); X.font = f; X.letterSpacing = '3px'; const sz = fitSize([o.sub], 50, 840, s => `italic 900 ${s}px PP`), ff = `italic 900 ${sz}px PP`; X.font = ff; const w = X.measureText(o.sub).width + 110; X.restore();
    shadow(() => { rr(540 - w / 2, 535, w, 86, 43); X.fillStyle = K.maroon; X.fill(); }, 26, .5, 10); rr(540 - w / 2 + 5, 540, w - 10, 76, 38); X.lineWidth = 3; X.strokeStyle = K.gold; X.stroke();
    MA.txt(o.sub, 540, 535 + 58, ff, '#fff', 'center', 3); MA.sparkle(540 - w / 2 - 6, 535, 22, K.gold); MA.sparkle(540 + w / 2 + 6, 621, 18, K.gold);
  });
  [[120, 330], [960, 270], [90, 470], [990, 440]].forEach(([x, y], i) => { const a = .5 + .5 * Math.sin(lt * 4 + i * 1.7); if (lt > .5) MA.sparkle(x, y, 14 + 12 * a, i % 2 ? '#fff' : K.gold); });
}


// ---------- STICKER POP-UP (elastik + percikan emas + bayang) — animasi utama sticker kartun ----------
const elasticOut = p => p <= 0 ? 0 : p >= 1 ? 1 : Math.pow(2, -10 * p) * Math.sin((p * 10 - .75) * (2 * Math.PI) / 3) + 1;
function stk(lt, at, im, cx, by, h, o = {}) {   // im, tengah-bawah (cx,by), tinggi h; o.flip, o.float
  if (lt < at) return; const t = lt - at, p = clamp(t / .7), sc = elasticOut(p), w = h * im.width / im.height, fl = o.float === false ? 0 : Math.sin(t * 2.2) * 7 * clamp((t - .7) / .5);
  X.save(); X.globalAlpha = clamp(t / .1); X.translate(cx, by + fl); X.rotate(-.2 * (1 - elasticOut(clamp(t / .8)))); X.scale(sc * (o.flip ? -1 : 1), sc); X.translate(0, 0);
  shadow(() => X.drawImage(im, -w / 2, -h, w, h), 30, .5, 14); X.restore();
  if (t < .65) { const q = easeOut(t / .65); for (let i = 0; i < 7; i++) { const a = -Math.PI * (.1 + .8 * i / 6), r = h * (.42 + .22 * q), x = cx + Math.cos(a) * r * 1.1, y = by - h * .5 + Math.sin(a) * r * .9; X.save(); X.globalAlpha = 1 - q; MA.sparkle(x, y, 10 + 16 * (1 - q), i % 2 ? '#fff' : MA.K.gold); X.restore(); } }
}


// ---------- OUTRO: semua sticker pop-up berturut-turut + CTA (Tahniah / Like | Share | Follow / @taufik.pg) ----------
function outroScene(lt, imgs) {
  const K = MA.K;
  anim(lt, .05, 540, 250, () => MA.headline('Tahniah tonton sampai habis!', 540, 270, 66, K.gold));
  imgs.forEach((im, i) => stk(lt, .3 + i * .22, im, 205 + (i % 3) * 335, 650 + Math.floor(i / 3) * 370, 355));
  anim(lt, 2.8, 540, 1590, () => { const f = `italic 900 70px PP`; X.save(); X.font = f; const w = X.measureText('Like  |  Share  |  Follow').width + 100; X.restore(); shadow(() => { rr(540 - w / 2, 1530, w, 112, 56); X.fillStyle = K.maroon; X.fill(); }, 24, .5, 10); rr(540 - w / 2 + 5, 1535, w - 10, 102, 51); X.lineWidth = 3; X.strokeStyle = K.gold; X.stroke(); MA.txt('Like  |  Share  |  Follow', 540, 1608, f, '#fff', 'center'); });
  anim(lt, 3.3, 540, 1730, () => { const f = `italic 800 52px PP`; X.save(); X.font = f; const w = X.measureText('@taufik.pg').width + 90; X.restore(); shadow(() => { rr(540 - w / 2, 1685, w, 86, 43); X.fillStyle = 'rgba(0,0,0,.6)'; X.fill(); }, 20, .4, 8); X.beginPath(); X.arc(540 - w / 2 + 38, 1728, 11, 0, 7); X.fillStyle = K.gold; X.fill(); MA.txt('@taufik.pg', 540 + 16, 1745, f, K.gold, 'center'); });
}

// ---------- pembantu adegan ----------
const { pillTitle: mPill, headline: mHead, whiteCard: mWhite, rowPill: mRow, sub: mSub, strokes: mStrokes, side: mSide } = MA;
const mamiY = 1500;
const B = (a, b, bg, wc, draw, pops) => ({ a, b, k: 'B', bg, wc, draw, pops: pops || [] });
const Hh = (a, b, ov, dir, wc) => ({ a, b, k: 'H', ov, dir, wc });
const WC = { pa: ['#FFD9C2', '#E9B23A'], rd: ['#E3262E', '#FFD21F'], ed: ['#E8522F', '#111111'], ma: ['#7A1626', '#F5C542'], th: ['#07152B', '#FFCE32'] };

