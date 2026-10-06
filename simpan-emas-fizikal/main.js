// Simpan Emas Fizikal — 30s motion graphics (1080x1920, 30fps)
// render(t) is a pure function of time: deterministic, frame-accurate.
const W = 1080, H = 1920, DUR = 30, FPS = 30;
const C = { navy: '#07152B', navy2: '#1E3050', y: '#FFCE32', ydk: '#E6B600', ylt: '#FFF8D6', green: '#16A34A', muted: '#6B7280' };

const out = document.getElementById('c');
const O = out.getContext('2d');
const sc = document.createElement('canvas'); sc.width = W; sc.height = H;
const X = sc.getContext('2d');

// ---------- math ----------
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const P = (t, a, b) => cl((t - a) / (b - a));
const lerp = (a, b, p) => a + (b - a) * p;
const E = {
  o2: p => 1 - (1 - p) * (1 - p),
  o3: p => 1 - Math.pow(1 - p, 3),
  i3: p => p * p * p,
  io3: p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2,
  oX: p => p >= 1 ? 1 : 1 - Math.pow(2, -10 * p),
  iX: p => p <= 0 ? 0 : Math.pow(2, 10 * p - 10),
  ioX: p => p <= 0 ? 0 : p >= 1 ? 1 : p < .5 ? Math.pow(2, 20 * p - 10) / 2 : (2 - Math.pow(2, -20 * p + 10)) / 2,
  oB: p => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); },
  oEl: p => p <= 0 ? 0 : p >= 1 ? 1 : Math.pow(2, -10 * p) * Math.sin((p * 10 - .75) * (2 * Math.PI / 3)) + 1,
};
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

// ---------- drawing helpers ----------
function gold(x0, y0, x1, y1, ctx = X) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  [[0, '#7d5210'], [.2, '#e2ad3b'], [.42, '#fff0b3'], [.58, '#f4c54a'], [.8, '#a8741a'], [1, '#f2d27a']].forEach(([o, c]) => g.addColorStop(o, c));
  return g;
}
function font(fam, wt, size, italic = false) { return `${italic ? 'italic ' : ''}${wt} ${size}px ${fam}`; }
function txt(s, x, y, f, fill, align = 'center', alpha = 1, ls = 0) {
  X.save(); X.globalAlpha *= alpha; X.font = f; X.textAlign = align; X.textBaseline = 'alphabetic';
  X.letterSpacing = ls + 'px'; X.fillStyle = fill; X.fillText(s, x, y); X.restore();
}
// per-letter mask reveal (letters rise out of a clip window)
function reveal(s, x, y, f, size, fill, t, t0, stag = .045, dur = .55, align = 'center', ls = 0) {
  X.save(); X.font = f; X.letterSpacing = '0px';
  const ws = [...s].map(ch => X.measureText(ch).width + ls);
  const tot = ws.reduce((a, b) => a + b, 0) - ls;
  let cx = align === 'center' ? x - tot / 2 : align === 'right' ? x - tot : x;
  X.textAlign = 'left'; X.textBaseline = 'alphabetic';
  X.fillStyle = typeof fill === 'function' ? fill(x - tot / 2, y - size, x + tot / 2, y) : fill;
  [...s].forEach((ch, i) => {
    const p = E.oX(P(t, t0 + i * stag, t0 + i * stag + dur));
    if (p > 0 && ch !== ' ') {
      X.save(); X.beginPath(); X.rect(cx - size * .25, y - size * 1.05, ws[i] + size * .5, size * 1.32); X.clip();
      X.fillText(ch, cx, y + (1 - p) * size * 1.15); X.restore();
    }
    cx += ws[i];
  });
  X.restore();
  return tot;
}
function rr(x, y, w, h, r) { X.beginPath(); X.roundRect(x, y, w, h, r); }
function flash(a, col = '#fff6d8') { if (a <= 0) return; X.save(); X.globalAlpha = cl(a); X.fillStyle = col; X.fillRect(0, 0, W, H); X.restore(); }

// ---------- precomputed assets ----------
// Banknote (stylised RM100), 760x380
const NW = 760, NH = 380;
const note = document.createElement('canvas'); note.width = NW; note.height = NH;
let noteData, burnBuf, burnCan, NZ;
function buildNote() {
  const n = note.getContext('2d');
  const g = n.createLinearGradient(0, 0, NW, NH); g.addColorStop(0, '#8b4fc9'); g.addColorStop(.5, '#6a2fa6'); g.addColorStop(1, '#4a1d7e');
  n.fillStyle = g; n.beginPath(); n.roundRect(0, 0, NW, NH, 18); n.fill();
  n.save(); n.beginPath(); n.roundRect(0, 0, NW, NH, 18); n.clip();
  n.strokeStyle = 'rgba(255,255,255,.12)'; n.lineWidth = 1.5;
  for (let k = 0; k < 26; k++) { n.beginPath(); for (let x = 0; x <= NW; x += 8) { const yy = 40 + k * 13 + Math.sin(x * .02 + k * .5) * 18 + Math.sin(x * .007 + k) * 10; x ? n.lineTo(x, yy) : n.moveTo(x, yy); } n.stroke(); }
  n.strokeStyle = 'rgba(255,255,255,.18)';
  for (let k = 0; k < 14; k++) { n.beginPath(); n.arc(560, 190, 30 + k * 9, 0, Math.PI * 2); n.stroke(); }
  n.restore();
  n.strokeStyle = 'rgba(255,230,255,.55)'; n.lineWidth = 3; n.beginPath(); n.roundRect(16, 16, NW - 32, NH - 32, 10); n.stroke();
  n.fillStyle = '#f7ecff'; n.font = font('IN', 900, 120); n.textAlign = 'left'; n.fillText('100', 44, 150);
  n.font = font('IN', 900, 64); n.textAlign = 'right'; n.fillText('100', NW - 44, NH - 44);
  n.font = font('MO', 700, 26); n.textAlign = 'left'; n.letterSpacing = '6px'; n.fillText('RINGGIT MALAYSIA', 48, NH - 52);
  n.fillStyle = 'rgba(255,255,255,.85)'; n.font = font('PF', 900, 90); n.textAlign = 'center'; n.letterSpacing = '0px'; n.fillText('RM', 560, 222);
  n.fillStyle = 'rgba(255,255,255,.5)'; n.font = font('MO', 700, 20); n.fillText('SEF 0000100', 560, 300);
  noteData = n.getImageData(0, 0, NW, NH);
  // fbm value noise + directional bias -> burn order
  const R = rng(11); NZ = new Float32Array(NW * NH);
  for (const [cells, amp] of [[6, .5], [14, .3], [34, .2]]) {
    const gx = cells + 1, gy = Math.ceil(cells * NH / NW) + 1, grid = Array.from({ length: gx * gy }, R);
    for (let y = 0; y < NH; y++) for (let x = 0; x < NW; x++) {
      const fx = x / NW * cells, fy = y / NW * cells, ix = fx | 0, iy = fy | 0;
      let ux = fx - ix, uy = fy - iy; ux = ux * ux * (3 - 2 * ux); uy = uy * uy * (3 - 2 * uy);
      const a = grid[iy * gx + ix], b = grid[iy * gx + ix + 1], c = grid[(iy + 1) * gx + ix], d = grid[(iy + 1) * gx + ix + 1];
      NZ[y * NW + x] += amp * lerp(lerp(a, b, ux), lerp(c, d, ux), uy);
    }
  }
  let mn = 9, mx = -9;
  for (let y = 0; y < NH; y++) for (let x = 0; x < NW; x++) { const i = y * NW + x; NZ[i] = .55 * NZ[i] + .45 * (1 - (x / NW + y / NH) / 2); mn = Math.min(mn, NZ[i]); mx = Math.max(mx, NZ[i]); }
  for (let i = 0; i < NZ.length; i++) NZ[i] = (NZ[i] - mn) / (mx - mn);
  burnCan = document.createElement('canvas'); burnCan.width = NW; burnCan.height = NH;
  burnBuf = burnCan.getContext('2d').createImageData(NW, NH);
}
const BURN0 = 1.55, BURN1 = 3.75;
const burnTh = t => lerp(-.03, 1.06, P(t, BURN0, BURN1));
let lastTh = null;
function burnNote(th) {
  if (th === lastTh) return burnCan; lastTh = th;
  const s = noteData.data, d = burnBuf.data, EDGE = .045;
  for (let i = 0, j = 0; i < NZ.length; i++, j += 4) {
    const n = NZ[i];
    if (n < th) { d[j + 3] = 0; continue; }
    let r = s[j], g = s[j + 1], b = s[j + 2];
    const k = (n - th) / EDGE;
    if (k < 1) { // glowing edge: white-hot -> orange -> char
      const hot = 1 - k;
      if (hot > .55) { r = 255; g = 230; b = 150; } else if (hot > .25) { r = 255; g = 120 + hot * 150; b = 30; } else { r *= .35; g *= .25; b *= .25; }
    } else if (k < 2.2) { const c = .4 + .6 * (k - 1) / 1.2; r *= c; g *= c; b *= c; }
    d[j] = r; d[j + 1] = g; d[j + 2] = b; d[j + 3] = s[j + 3];
  }
  burnCan.getContext('2d').putImageData(burnBuf, 0, 0);
  return burnCan;
}
const NOTE_C = [540, 1010], NOTE_ROT = -.06;
function noteToWorld(x, y) {
  const dx = x - NW / 2, dy = y - NH / 2, c = Math.cos(NOTE_ROT), s = Math.sin(NOTE_ROT);
  return [NOTE_C[0] + dx * c - dy * s, NOTE_C[1] + dx * s + dy * c];
}

// Particles: embers (scene 1) -> gold dust that forges the bar (scene 2)
const NP = 1500, parts = [];
const BAR = { cx: 540, cy: 960, w: 640, h: 330 };
function buildParts() {
  const R = rng(5);
  for (let i = 0; i < NP; i++) {
    const nx = R() * NW, ny = R() * NH, n = NZ[(ny | 0) * NW + (nx | 0)];
    const [wx, wy] = noteToWorld(nx, ny);
    // target on the bar: 55% on the outline, rest inside
    let tx, ty;
    if (R() < .55) {
      const per = R() * 2 * (BAR.w + BAR.h);
      if (per < BAR.w) { tx = per; ty = 0; } else if (per < BAR.w + BAR.h) { tx = BAR.w; ty = per - BAR.w; }
      else if (per < 2 * BAR.w + BAR.h) { tx = per - BAR.w - BAR.h; ty = BAR.h; } else { tx = 0; ty = per - 2 * BAR.w - BAR.h; }
    } else { tx = R() * BAR.w; ty = R() * BAR.h; }
    const ang = R() * Math.PI * 2;
    parts.push({
      wx, wy, n, tb: BURN0 + (n + .03) / 1.09 * (BURN1 - BURN0),
      vx: (R() - .5) * 90, vy: 70 + R() * 160, ph: R() * 6.28, sz: 1.6 + R() * 3.6,
      ex: Math.cos(ang) * (260 + R() * 700), ey: Math.sin(ang) * (260 + R() * 900),
      tx: BAR.cx - BAR.w / 2 + tx, ty: BAR.cy - BAR.h / 2 + ty, d: R(), dir: R() < .5 ? -1 : 1, hue: R(),
    });
  }
}
// gold dust for finale
const dust = [];
{ const R = rng(23); for (let i = 0; i < 240; i++) dust.push({ x: R() * W, y: R() * H, v: 20 + R() * 70, s: 1 + R() * 3.5, ph: R() * 6.28, w: R() * 30 }); }
// film grain
const grains = [];
{ const R = rng(99); for (let k = 0; k < 4; k++) { const g = document.createElement('canvas'); g.width = 270; g.height = 480; const c = g.getContext('2d'), im = c.createImageData(270, 480); for (let i = 0; i < im.data.length; i += 4) { const v = R() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; } c.putImageData(im, 0, 0); grains.push(g); } }

// ---------- camera ----------
const HITS = [[4.0, 1], [6.0, 1.1], [8.0, .7], [14.0, .5], [20.0, .4], [25.0, .9]];
function impact(t) { let k = 0; for (const [h, a] of HITS) if (t >= h) k = Math.max(k, a * Math.exp(-(t - h) * 7)); return k; }
function shake(t) { const k = impact(t); return [Math.sin(t * 91) * 22 * k + Math.sin(t * 57) * 9 * k, Math.cos(t * 83) * 20 * k]; }

// ---------- gold bar ----------
function drawBar(cx, cy, w, h, rot, scl, sweep, alpha = 1) {
  X.save(); X.globalAlpha *= alpha; X.translate(cx, cy); X.rotate(rot); X.scale(scl, scl);
  // shadow
  X.save(); X.filter = 'blur(28px)'; X.fillStyle = 'rgba(0,0,0,.55)'; X.beginPath(); X.ellipse(0, h / 2 + 60, w * .5, 34, 0, 0, Math.PI * 2); X.fill(); X.restore();
  // slab thickness
  rr(-w / 2, -h / 2 + 30, w, h, 34); X.fillStyle = '#6b440c'; X.fill();
  rr(-w / 2, -h / 2 + 18, w, h, 34); X.fillStyle = gold(-w / 2, 0, w / 2, 0); X.fill();
  // body + bevels
  rr(-w / 2, -h / 2, w, h, 34); X.fillStyle = gold(-w / 2, -h / 2, w / 2, h / 2); X.fill();
  rr(-w / 2 + 24, -h / 2 + 24, w - 48, h - 48, 22); X.fillStyle = gold(w / 2, h / 2, -w / 2, -h / 2); X.fill();
  rr(-w / 2 + 42, -h / 2 + 42, w - 84, h - 84, 14); X.fillStyle = gold(-w / 2, -h / 2 - 80, w / 2, h / 2 + 80); X.fill();
  X.strokeStyle = 'rgba(255,248,214,.6)'; X.lineWidth = 2; X.stroke();
  // engraving (debossed: dark text + light offset)
  const eng = (s, y, f) => { txt(s, 0, y + 2, f, 'rgba(255,248,214,.75)'); txt(s, 0, y, f, '#6b440c'); };
  eng('999.9', 22, font('PF', 900, 112));
  eng('FINE GOLD', -78, font('MO', 700, 26));
  eng('EMAS FIZIKAL · SEF 2026', 92, font('MO', 700, 22));
  // light sweep
  if (sweep > 0 && sweep < 1) {
    X.save(); rr(-w / 2, -h / 2, w, h, 34); X.clip(); X.globalCompositeOperation = 'lighter';
    const sx = lerp(-w * 1.2, w * 1.2, sweep), g = X.createLinearGradient(sx - 160, 0, sx + 160, 0);
    g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.5, 'rgba(255,250,220,.75)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    X.fillStyle = g; X.transform(1, 0, -.45, 1, 0, 0); X.fillRect(-w * 2, -h, w * 4, h * 2); X.restore();
  }
  X.restore();
}
function sparkle(x, y, s, a) {
  if (a <= 0) return; X.save(); X.globalAlpha = a; X.globalCompositeOperation = 'lighter'; X.translate(x, y); X.fillStyle = '#fff6cf';
  X.beginPath(); X.moveTo(0, -s); X.quadraticCurveTo(0, 0, s, 0); X.quadraticCurveTo(0, 0, 0, s); X.quadraticCurveTo(0, 0, -s, 0); X.quadraticCurveTo(0, 0, 0, -s); X.fill(); X.restore();
}

// ---------- SCENE 1: duit kertas terbakar (0-4s) ----------
function scene1(t) {
  X.fillStyle = C.navy; X.fillRect(0, 0, W, H);
  // grid draws in
  X.save(); X.strokeStyle = 'rgba(255,206,50,.07)'; X.lineWidth = 2;
  const gp = E.o3(P(t, 0, 1.2));
  for (let x = 0; x <= W; x += 90) { X.beginPath(); X.moveTo(x, 0); X.lineTo(x, H * gp); X.stroke(); }
  for (let y = 0; y <= H; y += 90) { X.beginPath(); X.moveTo(0, y); X.lineTo(W * gp, y); X.stroke(); }
  X.restore();
  // warm glow as it burns
  const glow = P(t, 1.6, 2.6) * (1 - P(t, 3.5, 4));
  if (glow > 0) { const g = X.createRadialGradient(540, 1010, 0, 540, 1010, 700); g.addColorStop(0, `rgba(255,120,30,${.35 * glow})`); g.addColorStop(1, 'rgba(255,120,30,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H); }

  // headline
  reveal('RM100 anda', 540, 430, font('IN', 900, 110), 110, '#fff', t, .25, .04);
  reveal('hari ini.', 540, 560, font('PF', 700, 120, true), 120, C.y, t, .55, .05);

  // falling line chart: kuasa beli
  const lp = E.io3(P(t, 1.4, 3.4));
  if (lp > 0) {
    X.save(); X.globalAlpha = 1 - P(t, 3.5, 3.9);
    const x0 = 140, x1 = 940, y0 = 1330;
    X.strokeStyle = 'rgba(255,255,255,.18)'; X.lineWidth = 2; X.beginPath(); X.moveTo(x0, 1560); X.lineTo(x1, 1560); X.stroke();
    X.strokeStyle = '#ff5a4f'; X.lineWidth = 8; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath();
    let px, py;
    for (let i = 0; i <= 60 * lp; i++) { const u = i / 60; px = lerp(x0, x1, u); py = y0 + u * u * 200 + Math.sin(u * 22) * 14 * u; i ? X.lineTo(px, py) : X.moveTo(px, py); }
    X.stroke();
    X.fillStyle = '#ff5a4f'; X.beginPath(); X.arc(px, py, 14, 0, 7); X.fill();
    txt('KUASA BELI', x0, 1300, font('MO', 700, 28), 'rgba(255,255,255,.6)', 'left', 1, 6);
    X.restore();
  }

  // the note
  const drop = E.oB(P(t, .15, 1.05));
  if (t < BURN1 + .1) {
    const th = burnTh(t), img = th > -.03 ? burnNote(th) : note;
    X.save(); X.translate(NOTE_C[0], lerp(-400, NOTE_C[1], drop) + Math.sin(t * 2) * 6);
    X.rotate(lerp(-.6, NOTE_ROT, drop)); X.scale(1, lerp(.6, 1, E.o3(P(t, .15, 1.2))));
    if (th < 0) { X.save(); X.filter = 'blur(30px)'; X.fillStyle = 'rgba(0,0,0,.5)'; X.fillRect(-NW / 2 + 20, -NH / 2 + 50, NW, NH); X.restore(); }
    X.drawImage(img, -NW / 2, -NH / 2); X.restore();
  }

  // embers
  const suck = E.i3(P(t, 3.35, 4.0));
  X.save(); X.globalCompositeOperation = 'lighter';
  for (const p of parts) {
    if (t < p.tb) continue;
    const a = t - p.tb;
    let x = p.wx + p.vx * a + Math.sin(a * 3 + p.ph) * 26 * a, y = p.wy - p.vy * a - 30 * a * a;
    x = lerp(x, 540, suck); y = lerp(y, 980, suck);
    const life = Math.max(.15, 1 - a / 1.6), al = lerp(life, 1, suck);
    X.fillStyle = suck > .3 ? `rgba(255,${200 + 40 * p.hue | 0},90,${al})` : `rgba(255,${110 + 120 * p.hue * life | 0},40,${al})`;
    X.beginPath(); X.arc(x, y, p.sz * (1 - .5 * suck), 0, 7); X.fill();
  }
  X.restore();

  // kinetic slams
  const words = [['NILAINYA', 2.0], ['MAKIN', 2.5], ['SUSUT.', 3.0]];
  words.forEach(([w, t0], i) => {
    const p = P(t, t0, t0 + .28); if (p <= 0) return;
    const s = lerp(1.9, 1, E.oX(p)), a = (1 - P(t, 3.55, 3.85));
    X.save(); X.translate(540, 1660 + i * 0); X.scale(s, s);
    const last = i === 2;
    const on = i === words.filter(([, tt]) => t >= tt).length - 1;
    if (on || last) txt(w, 0, 60, font('IN', 900, last ? 170 : 150), last ? '#ff5a4f' : '#fff', 'center', a * cl(p * 3), 2);
    X.restore();
  });
  // implode glow
  if (suck > 0) { const g = X.createRadialGradient(540, 980, 0, 540, 980, 260 * (1 - suck) + 40); g.addColorStop(0, `rgba(255,236,170,${suck})`); g.addColorStop(1, 'rgba(255,206,50,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H); }
}

// ---------- SCENE 2: tempa emas (4-8s) ----------
function scene2(t) {
  const g = X.createRadialGradient(540, 960, 0, 540, 960, 1100);
  g.addColorStop(0, '#1E3050'); g.addColorStop(1, C.navy); X.fillStyle = g; X.fillRect(0, 0, W, H);
  // god rays after the forge
  const ray = P(t, 6.0, 6.6);
  if (ray > 0) {
    X.save(); X.translate(540, 960); X.rotate(t * .12); X.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 14; i++) { X.rotate(Math.PI * 2 / 14); X.fillStyle = `rgba(255,206,50,${.06 * ray})`; X.beginPath(); X.moveTo(0, 0); X.lineTo(-90, -1500); X.lineTo(90, -1500); X.closePath(); X.fill(); }
    X.restore();
  }
  // shockwave rings
  for (const [h, col] of [[4.0, '255,236,170'], [6.0, '255,206,50']]) {
    const p = P(t, h, h + .7); if (p <= 0 || p >= 1) continue;
    X.save(); X.strokeStyle = `rgba(${col},${1 - p})`; X.lineWidth = 30 * (1 - p) + 2;
    X.beginPath(); X.arc(540, h === 4 ? 980 : 960, E.oX(p) * 900, 0, 7); X.stroke(); X.restore();
  }
  // particles: explode -> vortex -> lock
  const solid = P(t, 5.85, 6.05);
  if (t < 6.3) {
    X.save(); X.globalCompositeOperation = 'lighter';
    const ex = E.oX(P(t, 4.0, 4.7));
    for (const p of parts) {
      const sx = 540 + p.ex * ex, sy = 980 + p.ey * ex;
      const e = E.io3(P(t, 4.6 + p.d * .2, 5.75 + p.d * .2));
      const dx = lerp(sx - 540, p.tx - 540, e), dy = lerp(sy - 960, p.ty - 960, e);
      const a = (1 - e) * 2.4 * p.dir, c = Math.cos(a), s = Math.sin(a);
      const x = 540 + dx * c - dy * s, y = 960 + dx * s + dy * c;
      X.fillStyle = `rgba(255,${190 + 60 * p.hue | 0},${80 + 100 * p.hue | 0},${(1 - P(t, 6.0, 6.3)) * .9})`;
      X.beginPath(); X.arc(x, y, p.sz * (1.2 - .5 * e), 0, 7); X.fill();
    }
    X.restore();
  }
  // the bar
  if (solid > 0) {
    const pop = E.oB(P(t, 6.0, 6.55));
    drawBar(540, 960 + Math.sin((t - 6) * 1.6) * 10, BAR.w, BAR.h, Math.sin((t - 6) * .9) * .035, lerp(1.14, 1, pop), P(t, 6.35, 7.25), solid);
    [[230, 790, 6.45], [860, 1120, 6.7], [820, 800, 7.0]].forEach(([x, y, t0]) => { const p = P(t, t0, t0 + .5); sparkle(x, y, 46 * Math.sin(p * Math.PI), Math.sin(p * Math.PI)); });
  }
  // typography
  reveal('EMAS', 540, 690, font('PF', 900, 260), 260, (a, b, c, d) => gold(a, b, c, d), t, 6.1, .07, .6);
  reveal('fizikal.', 540, 1390, font('PF', 700, 170, true), 170, '#fff', t, 6.35, .05, .6);
  const sub = E.o3(P(t, 6.9, 7.3));
  txt('Disimpan manusia sejak ribuan tahun.', 540, 1530 + (1 - sub) * 30, font('IN', 500, 42), 'rgba(255,255,255,.75)', 'center', sub);
  flash(1 - P(t, 4.0, 4.35));
  if (t >= 6.0) flash((1 - P(t, 6.0, 6.3)) * .85, '#fff1b3');
}

// ---------- SCENE 3: mula RM100, simpan sikit-sikit (8-14s) ----------
const DROPS = Array.from({ length: 8 }, (_, k) => 10.35 + k * .44);
const JAR = { x: 330, y: 960, w: 420, h: 660 };
function jarPath(inset = 0) {
  const { x, y, w, h } = JAR, r = 90;
  X.beginPath(); X.moveTo(x + inset, y); X.lineTo(x + inset, y + h - r); X.quadraticCurveTo(x + inset, y + h - inset, x + r, y + h - inset);
  X.lineTo(x + w - r, y + h - inset); X.quadraticCurveTo(x + w - inset, y + h - inset, x + w - inset, y + h - r); X.lineTo(x + w - inset, y);
}
function scene3(t) {
  X.fillStyle = C.y; X.fillRect(0, 0, W, H);
  // drifting dot grid
  X.fillStyle = 'rgba(7,21,43,.10)';
  const off = (t * 40) % 60;
  for (let y = -60; y < H + 60; y += 60) for (let x = -60; x < W + 60; x += 60) { X.beginPath(); X.arc(x + off, y + off * .5, 3, 0, 7); X.fill(); }

  // MULA / RM100 group
  const up = E.ioX(P(t, 9.55, 10.15));
  X.save(); X.translate(540, 780); X.scale(lerp(1, .6, up), lerp(1, .6, up)); X.translate(-540, -780 + lerp(0, -600, up));
  const sl = P(t, 8.0, 8.35);
  if (sl > 0) {
    for (let k = 2; k >= 0; k--) { // ghost trails for the slam
      const s = lerp(3.2, 1, E.oX(cl(sl - k * .08)));
      X.save(); X.translate(540, 620); X.scale(s, s); txt('MULA', 0, 70, font('IN', 900, 230), C.navy, 'center', k ? .12 : 1, -4); X.restore();
    }
  }
  txt('DENGAN SERENDAH', 540, 730, font('MO', 700, 34), C.navy, 'center', E.o3(P(t, 8.3, 8.6)), 10);
  // slot-machine digits
  X.save(); X.font = font('IN', 900, 250);
  const rmW = X.measureText('RM').width, dW = X.measureText('0').width, tot = rmW + 3 * dW, x0 = 540 - tot / 2, by = 1040;
  const ap = E.o3(P(t, 8.35, 8.6));
  txt('RM', x0, by, font('IN', 900, 250), C.navy, 'left', ap);
  [1, 0, 0].forEach((d, i) => {
    const stop = 8.75 + i * .2, p = E.oB(P(t, 8.35, stop)), pos = p * (20 + i * 10 + d);
    X.save(); X.beginPath(); X.rect(x0 + rmW + i * dW - 10, by - 215, dW + 20, 260); X.clip();
    for (let j = Math.floor(pos) - 1; j <= Math.floor(pos) + 1; j++) txt(String(((j % 10) + 10) % 10), x0 + rmW + i * dW + dW / 2, by + (j - pos) * 245, font('IN', 900, 250), C.navy, 'center', ap);
    X.restore();
  });
  X.restore();
  // marker underline
  const ul = E.o3(P(t, 9.2, 9.5));
  if (ul > 0) { X.save(); X.strokeStyle = C.navy; X.lineWidth = 18; X.lineCap = 'round'; X.beginPath(); X.moveTo(540 - tot / 2, 1100); X.quadraticCurveTo(540, 1080 + 20, lerp(540 - tot / 2, 540 + tot / 2, ul), 1094 - ul * 10); X.stroke(); X.restore(); }
  X.restore();

  // the jar
  if (t > 9.8) {
    const dp = E.io3(P(t, 9.8, 10.4)), sX = lerp(0, -900, E.iX(P(t, 13.4, 13.9)));
    X.save(); X.translate(sX, 0);
    // fill level
    let lvl = 0, splash = 0;
    DROPS.forEach(td => { const tl = td + .32; lvl += .105 * JAR.h * E.oB(P(t, tl, tl + .35)); if (t > tl) splash = Math.max(splash, Math.exp(-(t - tl) * 5)); });
    if (lvl > 0) {
      X.save(); jarPath(10); X.closePath(); X.clip();
      const top = JAR.y + JAR.h - lvl;
      X.beginPath(); X.moveTo(JAR.x, H);
      for (let x = JAR.x; x <= JAR.x + JAR.w; x += 10) X.lineTo(x, top + Math.sin(x * .03 + t * 7) * (4 + 16 * splash));
      X.lineTo(JAR.x + JAR.w, H); X.closePath(); X.fillStyle = gold(JAR.x, top, JAR.x + JAR.w, JAR.y + JAR.h); X.fill();
      // granules
      const R = rng(3); for (let i = 0; i < 70; i++) { const gx = JAR.x + R() * JAR.w, gy = top + 20 + R() * (JAR.h); if (gy < JAR.y + JAR.h) sparkle(gx, gy, 6 + R() * 8, .4 + .4 * Math.sin(t * 4 + i)); }
      X.restore();
    }
    // glass
    X.save(); X.lineWidth = 12; X.strokeStyle = C.navy; X.lineCap = 'round'; X.lineJoin = 'round';
    X.setLineDash([2200 * dp, 2200]); jarPath(); X.stroke();
    X.setLineDash([]); X.globalAlpha = dp; X.fillStyle = 'rgba(255,255,255,.25)'; X.fillRect(JAR.x + 40, JAR.y + 40, 26, JAR.h - 200);
    X.lineWidth = 12; X.beginPath(); X.moveTo(JAR.x - 30, JAR.y); X.lineTo(JAR.x + JAR.w + 30, JAR.y); X.stroke();
    X.restore();
    // falling coins
    DROPS.forEach((td, k) => {
      const tl = td + .32, p = P(t, td, tl); if (p <= 0) return;
      const lvlNow = DROPS.slice(0, k).reduce((a, d) => a + .105 * JAR.h * E.oB(P(t, d + .32, d + .67)), 0);
      const ty = JAR.y + JAR.h - lvlNow - 30;
      if (p < 1) {
        const y = lerp(560, ty, p * p), x = 540 + Math.sin(k * 2.1) * 80 * (1 - p);
        X.save(); X.translate(x, y); X.rotate(k + p * 4); X.scale(1, .35 + .65 * Math.abs(Math.cos(p * 9 + k)));
        X.beginPath(); X.arc(0, 0, 54, 0, 7); X.fillStyle = gold(-54, -54, 54, 54); X.fill(); X.strokeStyle = '#8a5a12'; X.lineWidth = 5; X.stroke();
        txt('RM', 0, 14, font('IN', 900, 38), '#7d5210'); X.restore();
      }
      // +RM100 tag
      const q = P(t, tl, tl + .8);
      if (q > 0 && q < 1) txt('+RM100', JAR.x + JAR.w + 50, ty - 40 - q * 120, font('IN', 900, 52), C.navy, 'left', Math.sin(q * Math.PI) * 1.4);
      // splash drops
      const sp = P(t, tl, tl + .45);
      if (sp > 0 && sp < 1) for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * .35; X.fillStyle = `rgba(230,182,0,${1 - sp})`; X.beginPath(); X.arc(540 + Math.cos(a) * 220 * sp, ty + Math.sin(a) * 200 * sp + 500 * sp * sp, 10 * (1 - sp) + 3, 0, 7); X.fill(); }
    });
    // month counter
    const n = DROPS.filter(d => t > d + .32).length;
    if (n > 0) {
      txt('BULAN', 170, 1180, font('MO', 700, 30), C.navy, 'center', 1, 6);
      const bump = 1 + .25 * Math.exp(-(t - (DROPS[n - 1] + .32)) * 9);
      X.save(); X.translate(170, 1320); X.scale(bump, bump); txt(String(n), 0, 0, font('IN', 900, 170), C.navy); X.restore();
    }
    X.restore();
  }
  // captions
  const c1 = E.o3(P(t, 10.5, 10.9)) * (1 - P(t, 12.0, 12.2)), c2 = E.o3(P(t, 12.2, 12.6));
  txt('Sikit-sikit. Konsisten.', 540, 1790 + (1 - c1) * 30, font('PF', 900, 72), C.navy, 'center', c1 * (1 - P(t, 13.4, 13.7)));
  txt('Jadi simpanan emas.', 540, 1790 + (1 - c2) * 30, font('PF', 900, 72), C.navy, 'center', c2 * (1 - P(t, 13.4, 13.7)));
  flash((1 - P(t, 8.0, 8.25)) * .9, '#fff8d6');
  // slab wipe -> navy
  const wp = E.ioX(P(t, 13.55, 14.0));
  if (wp > 0) {
    X.save(); X.transform(1, 0, -.35, 1, 0, 0);
    X.fillStyle = '#fff'; X.fillRect(lerp(-1600, 900, wp) + 340, 0, 2000, H);
    X.fillStyle = C.navy; X.fillRect(lerp(-1600, 900, wp) + 300, 0, 2000, H);
    X.fillStyle = C.navy; X.fillRect(lerp(-1600, 900, wp) - 1200, 0, 1600, H);
    X.restore();
  }
}

// ---------- SCENE 4: 4 sebab (14-20s) ----------
const CARDS = [
  ['Mula RM100', 'Tak perlu modal besar', 'coin'],
  ['Tiada komitmen', 'Simpan ikut kemampuan', 'lock'],
  ['Tukar emas fizikal', 'Bila anda perlukan', 'bar'],
  ['Patuh syariah', 'Tiada caj dealer', 'moon'],
];
function icon(kind, cx, cy, p, t) {
  X.save(); X.translate(cx, cy); X.strokeStyle = C.navy; X.fillStyle = C.navy; X.lineWidth = 8; X.lineCap = 'round'; X.lineJoin = 'round';
  X.setLineDash([520 * p, 520]);
  if (kind === 'coin') { X.beginPath(); X.arc(0, 0, 38, 0, 7); X.stroke(); X.beginPath(); X.arc(0, 0, 26, 0, 7); X.lineWidth = 4; X.stroke(); X.setLineDash([]); txt('RM', 0, 10, font('IN', 900, 26), C.navy, 'center', P(p, .6, 1)); }
  if (kind === 'lock') { X.beginPath(); X.roundRect(-34, -6, 68, 50, 8); X.stroke(); X.beginPath(); X.arc(18 + 8 * P(p, .7, 1), -14, 20, Math.PI, 0); X.lineTo(38 + 8 * P(p, .7, 1), -6); X.stroke(); }
  if (kind === 'bar') { X.beginPath(); X.moveTo(-34, 20); X.lineTo(34, 20); X.lineTo(24, -6); X.lineTo(-24, -6); X.closePath(); X.stroke(); X.beginPath(); X.arc(0, 6, 46, -2.6, -.6); X.stroke(); X.beginPath(); X.moveTo(30, -40); X.lineTo(38, -28); X.lineTo(24, -24); X.stroke(); }
  if (kind === 'moon') { X.beginPath(); X.arc(-6, 0, 36, .9, 5.4); X.arc(8, -6, 28, 4.9, 1.2, true); X.closePath(); X.stroke(); X.setLineDash([]); sparkle(28, -22, 14 * P(p, .6, 1), 1); X.globalCompositeOperation = 'source-over'; }
  X.restore();
}
function scene4(t) {
  X.fillStyle = C.navy; X.fillRect(0, 0, W, H);
  // rotating arc ornament
  X.save(); X.translate(980, 260); X.rotate(t * .25); X.strokeStyle = 'rgba(255,206,50,.12)'; X.lineWidth = 3;
  for (let i = 0; i < 6; i++) { X.beginPath(); X.arc(0, 0, 120 + i * 70, i, i + 2.4); X.stroke(); } X.restore();
  const out = k => E.iX(P(t, 19.35 + k * .07, 19.85 + k * .07));
  const hp = E.o3(P(t, 14.05, 14.5));
  X.save(); X.translate(0, -out(0) * 200); X.globalAlpha = 1 - out(0);
  txt('KENAPA RAMAI MULA', 90, 300, font('MO', 700, 32), C.y, 'left', hp, 8);
  reveal('Simpan dengan', 90, 420, font('PF', 900, 104), 104, '#fff', t, 14.1, .03, .5, 'left');
  reveal('tenang.', 90, 540, font('PF', 700, 120, true), 120, (a, b, c, d) => gold(a, b, c, d), t, 14.35, .04, .5, 'left');
  X.restore();
  CARDS.forEach(([ttl, sub, kind], i) => {
    const t0 = 14.55 + i * 1.2, p = P(t, t0, t0 + .6); if (p <= 0) return;
    const e = E.oB(p), o = out(i + 1);
    const x = lerp(1150, 80, e) - o * 1300, y = 650 + i * 285;
    const active = t < t0 + 1.2 || i === 3, k = active ? 1 : .55;
    X.save(); X.translate(x + 460, y + 120); X.rotate(lerp(.25, 0, e) - o * .2); X.translate(-460, -120);
    X.save(); X.filter = 'blur(24px)'; X.fillStyle = 'rgba(0,0,0,.45)'; rr(10, 30, 920, 240, 34); X.fill(); X.restore();
    rr(0, 0, 920, 240, 34); X.fillStyle = active ? '#fff' : '#E8ECF3'; X.fill();
    if (active) { X.strokeStyle = C.y; X.lineWidth = 6; X.stroke(); }
    X.beginPath(); X.arc(130, 120, 78, 0, 7); X.fillStyle = C.y; X.fill();
    icon(kind, 130, 120, E.o3(P(t, t0 + .25, t0 + .95)), t);
    txt(ttl, 250, 112, font('IN', 800, 54), C.navy, 'left', k);
    txt(sub, 250, 168, font('IN', 500, 34), C.muted, 'left', k);
    const cp = E.oB(P(t, t0 + .7, t0 + 1.0));
    if (cp > 0) {
      X.save(); X.translate(830, 120); X.scale(cp, cp); X.beginPath(); X.arc(0, 0, 40, 0, 7); X.fillStyle = C.green; X.fill();
      X.strokeStyle = '#fff'; X.lineWidth = 9; X.lineCap = 'round'; X.lineJoin = 'round'; X.setLineDash([80 * E.o3(P(t, t0 + .8, t0 + 1.05)), 80]);
      X.beginPath(); X.moveTo(-17, 2); X.lineTo(-5, 14); X.lineTo(18, -12); X.stroke(); X.restore();
    }
    X.restore();
  });
}

// ---------- SCENE 5: the website on a phone (20-25s) ----------
const URL_TXT = 'simpanemasfizikal.com';
const PH = { x: 240, y: 380, w: 600, h: 1230 };
const BTN = { x: 60, y: 690, w: 300, h: 84 }; // screen-local
function scene5(t) {
  const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.navy); g.addColorStop(1, '#13264a'); X.fillStyle = g; X.fillRect(0, 0, W, H);
  const glow = X.createRadialGradient(540, 1000, 0, 540, 1000, 800); glow.addColorStop(0, 'rgba(255,206,50,.22)'); glow.addColorStop(1, 'rgba(255,206,50,0)'); X.fillStyle = glow; X.fillRect(0, 0, W, H);
  // side labels
  txt('LAWATI', 540, 200, font('MO', 700, 34), C.y, 'center', E.o3(P(t, 20.3, 20.7)), 12);
  reveal('Semua ilmu emas,', 540, 300, font('PF', 900, 76), 76, '#fff', t, 20.4, .025, .5);
  reveal('satu tempat.', 540, 1760, font('PF', 700, 84, true), 84, (a, b, c, d) => gold(a, b, c, d), t, 22.6, .035, .5);

  const ent = E.oX(P(t, 20.0, 20.9));
  const sx = PH.x, sy = PH.y;
  X.save();
  X.translate(540, 995 + (1 - ent) * 1300); X.rotate((1 - ent) * .3 + Math.sin(t * 1.2) * .012); X.scale(lerp(.8, 1, ent), lerp(.8, 1, ent)); X.translate(-540, -995);
  // phone body
  X.save(); X.filter = 'blur(40px)'; X.fillStyle = 'rgba(0,0,0,.6)'; rr(sx + 20, sy + 60, PH.w, PH.h, 80); X.fill(); X.restore();
  rr(sx, sy, PH.w, PH.h, 80); X.fillStyle = '#0b0c10'; X.fill(); X.strokeStyle = gold(sx, sy, sx + PH.w, sy + PH.h); X.lineWidth = 5; X.stroke();
  const S = { x: sx + 18, y: sy + 18, w: PH.w - 36, h: PH.h - 36 };
  X.save(); rr(S.x, S.y, S.w, S.h, 62); X.clip(); X.fillStyle = '#FAFAFA'; X.fillRect(S.x, S.y, S.w, S.h);
  X.translate(S.x, S.y);
  txt('9:41', 60, 48, font('IN', 800, 24), C.navy, 'center');
  X.fillStyle = '#000'; rr(S.w / 2 - 70, 18, 140, 38, 19); X.fill();
  // url bar
  rr(24, 76, S.w - 48, 66, 33); X.fillStyle = '#EEF0F3'; X.fill();
  X.strokeStyle = C.green; X.lineWidth = 4; X.beginPath(); X.roundRect(52, 100, 20, 18, 4); X.stroke(); X.beginPath(); X.arc(62, 100, 7, Math.PI, 0); X.stroke();
  const nch = Math.floor(P(t, 20.85, 21.9) * URL_TXT.length);
  const typed = URL_TXT.slice(0, nch);
  X.save(); X.font = font('IN', 500, 30); X.fillStyle = C.navy; X.textAlign = 'left'; X.fillText(typed, 88, 120);
  const cw = X.measureText(typed).width; X.restore();
  if (t < 22.2 && Math.floor(t * 4) % 2 === 0) { X.fillStyle = '#1D63FF'; X.fillRect(90 + cw, 92, 3, 36); }
  const lp = E.o3(P(t, 21.95, 22.35));
  if (lp > 0 && lp < 1) { X.fillStyle = C.y; X.fillRect(24, 148, (S.w - 48) * lp, 6); }
  // page sections staggered in
  const el = k => E.oB(P(t, 22.3 + k * .12, 22.75 + k * .12));
  const sec = (k, fn) => { const e = el(k); if (e <= 0) return; X.save(); X.globalAlpha = cl(e * 1.5); X.translate(0, (1 - e) * 60); fn(); X.restore(); };
  sec(0, () => { X.fillStyle = C.navy; X.fillRect(0, 160, S.w, 90); X.beginPath(); X.arc(48, 205, 16, 0, 7); X.fillStyle = C.y; X.fill(); txt('Simpan Emas Fizikal', 76, 214, font('IN', 800, 26), '#fff', 'left'); txt('MENU ▾', S.w - 30, 213, font('IN', 800, 20), C.y, 'right'); });
  sec(1, () => { const hg = X.createLinearGradient(0, 250, 0, 820); hg.addColorStop(0, C.navy); hg.addColorStop(1, C.navy2); X.fillStyle = hg; X.fillRect(0, 250, S.w, 570); });
  sec(2, () => { rr(40, 300, 360, 46, 23); X.fillStyle = C.ylt; X.fill(); txt('DEALER PUBLIC GOLD · G100', 220, 331, font('IN', 800, 18), C.navy, 'center', 1, 1); });
  sec(3, () => { txt('Simpan Emas', 40, 450, font('PF', 900, 78), '#fff', 'left'); txt('Fizikal.', 40, 540, font('PF', 700, 84, true), gold(40, 470, 300, 540), 'left'); });
  sec(4, () => { X.fillStyle = 'rgba(255,255,255,.25)'; [[40, 590, 440], [40, 626, 380], [40, 662, 300]].forEach(([x, y, w]) => { rr(x, y, w, 14, 7); X.fill(); }); });
  sec(5, () => {
    const press = 1 - .06 * Math.sin(P(t, 24.12, 24.35) * Math.PI);
    X.save(); X.translate(BTN.x + BTN.w / 2, BTN.y + BTN.h / 2); X.scale(press, press);
    rr(-BTN.w / 2, -BTN.h / 2, BTN.w, BTN.h, 14); X.fillStyle = C.y; X.fill(); txt('Daftar Percuma →', 0, 11, font('IN', 800, 30), C.navy); X.restore();
  });
  [0, 1].forEach(i => sec(6 + i, () => {
    const cx = 30 + i * 262;
    rr(cx, 850, 244, 310, 20); X.fillStyle = '#fff'; X.fill(); X.strokeStyle = '#E5E7EB'; X.lineWidth = 2; X.stroke();
    rr(cx + 14, 864, 216, 130, 12); X.fillStyle = i ? '#3A74CC' : '#7C2D12'; X.globalAlpha *= .15; X.fill(); X.globalAlpha /= .15;
    X.save(); X.translate(cx + 122, 930); X.scale(.17, .17); rr(-320, -165, 640, 330, 34); X.fillStyle = gold(-320, -165, 320, 165); X.fill(); X.restore();
    X.fillStyle = '#D1D5DB'; [[1014, 200], [1046, 160], [1100, 110]].forEach(([y, w]) => { rr(cx + 16, y, w, 14, 7); X.fill(); });
  }));
  // touch + ripple
  const tp = E.io3(P(t, 23.6, 24.12));
  if (t > 23.5) {
    const bx = BTN.x + BTN.w / 2, byy = BTN.y + BTN.h / 2;
    const hx = lerp(S.w - 40, bx, tp), hy = lerp(S.h - 80, byy, tp);
    const rp = P(t, 24.12, 24.6);
    if (rp > 0) { X.strokeStyle = `rgba(7,21,43,${1 - rp})`; X.lineWidth = 6; X.beginPath(); X.arc(bx, byy, 20 + rp * 140, 0, 7); X.stroke(); }
    X.fillStyle = 'rgba(7,21,43,.35)'; X.beginPath(); X.arc(hx, hy, 34 - 8 * Math.sin(P(t, 24.12, 24.35) * Math.PI), 0, 7); X.fill();
    X.strokeStyle = '#fff'; X.lineWidth = 4; X.stroke();
  }
  X.restore(); X.restore();
}
// world position of the CTA button (for the zoom-through)
const BTN_W = [PH.x + 18 + BTN.x + BTN.w / 2, PH.y + 18 + BTN.y + BTN.h / 2];

// ---------- SCENE 6: end card (25-30s) ----------
function coin(cx, cy, r, ang) {
  const c = Math.cos(ang), sx = Math.max(.04, Math.abs(c)), th = Math.sin(ang) * 18;
  X.save(); X.translate(cx, cy);
  X.beginPath(); X.ellipse(th, 0, r * sx, r, 0, 0, 7); X.fillStyle = '#7d5210'; X.fill();
  X.beginPath(); X.ellipse(0, 0, r * sx, r, 0, 0, 7); X.fillStyle = gold(-r, -r, r, r); X.fill();
  X.beginPath(); X.ellipse(0, 0, r * .82 * sx, r * .82, 0, 0, 7); X.strokeStyle = 'rgba(125,82,16,.7)'; X.lineWidth = 5; X.stroke();
  X.scale(sx, 1);
  txt('999.9', 0, 22, font('PF', 900, 70), '#7d5210');
  txt('EMAS', 0, -48, font('MO', 700, 22), '#7d5210', 'center', 1, 6);
  txt('FIZIKAL', 0, 78, font('MO', 700, 22), '#7d5210', 'center', 1, 6);
  X.restore();
}
function scene6(t) {
  X.fillStyle = C.navy; X.fillRect(0, 0, W, H);
  const g = X.createRadialGradient(540, 520, 0, 540, 520, 900); g.addColorStop(0, 'rgba(255,206,50,.28)'); g.addColorStop(1, 'rgba(255,206,50,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H);
  // dust
  X.save(); X.globalCompositeOperation = 'lighter';
  for (const d of dust) { const y = ((d.y - (t - 25) * d.v) % H + H) % H, x = d.x + Math.sin(t + d.ph) * d.w; X.fillStyle = `rgba(255,214,110,${.25 + .35 * Math.sin(t * 3 + d.ph) ** 2})`; X.beginPath(); X.arc(x, y, d.s, 0, 7); X.fill(); }
  X.restore();
  // iris from the yellow button down to the coin
  const ip = E.oX(P(t, 25.0, 25.6));
  const cA = (1 - E.o3(P(t, 25.3, 26.8))) * Math.PI * 6;
  const fl = 1 + .03 * Math.sin((t - 25) * 2);
  if (ip < 1) { X.beginPath(); X.arc(lerp(540, 540, ip), lerp(960, 520, ip), lerp(1400, 160, ip), 0, 7); X.fillStyle = C.y; X.fill(); }
  if (t > 25.35) { X.save(); X.globalAlpha = P(t, 25.35, 25.6); coin(540, 520 + Math.sin(t * 1.4) * 8, 160 * fl, cA); X.restore(); }
  sparkle(650, 400, 40 * Math.sin(P(t, 26.7, 27.2) * Math.PI), 1);

  reveal('Simpan Emas', 540, 900, font('PF', 900, 132), 132, '#fff', t, 25.45, .04, .6);
  reveal('Fizikal.', 540, 1075, font('PF', 700, 180, true), 180, (a, b, c, d) => gold(a, b, c, d), t, 25.75, .05, .6);
  // sweep over Fizikal.
  const sw = P(t, 28.2, 29.0);
  if (sw > 0 && sw < 1) {
    X.save(); X.font = font('PF', 700, 180, true); X.textAlign = 'center'; X.globalCompositeOperation = 'lighter';
    const sx = lerp(200, 880, sw), sg = X.createLinearGradient(sx - 90, 0, sx + 90, 0);
    sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(.5, 'rgba(255,255,255,.8)'); sg.addColorStop(1, 'rgba(255,255,255,0)');
    X.fillStyle = sg; X.fillText('Fizikal.', 540, 1075); X.restore();
  }
  const ln = E.io3(P(t, 26.2, 26.7));
  X.strokeStyle = C.y; X.lineWidth = 4; X.beginPath(); X.moveTo(540 - 260 * ln, 1150); X.lineTo(540 + 260 * ln, 1150); X.stroke();
  const a1 = E.o3(P(t, 26.4, 26.8)), a2 = E.o3(P(t, 26.55, 26.95));
  txt('Taufik Bin Musa', 540, 1250 + (1 - a1) * 30, font('IN', 800, 56), '#fff', 'center', a1);
  txt('Dealer Public Gold · G100 Network', 540, 1312 + (1 - a2) * 30, font('IN', 500, 36), 'rgba(255,255,255,.7)', 'center', a2);
  // CTA pill
  const cp = E.oB(P(t, 26.85, 27.35));
  if (cp > 0) {
    const pulse = t > 27.5 ? ((t - 27.5) % 1.1) / 1.1 : -1;
    X.save(); X.translate(540, 1460);
    if (pulse >= 0) { X.save(); X.globalAlpha = 1 - pulse; X.strokeStyle = C.y; X.lineWidth = 5; const s = 1 + pulse * .18; X.scale(s, s * 1.25); rr(-380, -66, 760, 132, 66); X.stroke(); X.restore(); }
    X.scale(cp, cp); rr(-380, -66, 760, 132, 66); X.fillStyle = C.y; X.fill();
    txt('Ikut 4 Langkah Bermula →', 0, 16, font('IN', 800, 46), C.navy); X.restore();
  }
  const nu = Math.floor(P(t, 27.2, 28.0) * URL_TXT.length);
  txt(URL_TXT.slice(0, nu) + (t > 27.2 && t < 28.6 && Math.floor(t * 4) % 2 ? '▌' : ''), 540, 1640, font('MO', 700, 46), C.y, 'center', 1, 1);
  txt('Penafian: bukan website rasmi Public Gold Marketing Sdn. Bhd.', 540, 1830, font('IN', 500, 24), 'rgba(255,255,255,.4)', 'center', P(t, 27.8, 28.3));
  flash((1 - P(t, 25.0, 25.25)) * .6, '#fff8d6');
}

// ---------- HUD (designer chrome) ----------
function hud(t) {
  const sceneIdx = t < 4 ? 1 : t < 8 ? 2 : t < 14 ? 3 : t < 20 ? 4 : t < 25 ? 5 : 6;
  const a = E.o3(P(t, .2, .8)) * (1 - P(t, 24.7, 25.0));
  if (a <= 0) return;
  const col = (t >= 8 && t < 13.85) ? C.navy : 'rgba(255,255,255,.75)';
  X.save(); X.globalAlpha = a;
  txt('SIMPAN · EMAS · FIZIKAL', 70, 104, font('MO', 700, 22), col, 'left', 1, 5);
  txt(`0${sceneIdx} / 06`, W - 70, 104, font('MO', 700, 22), col, 'right', 1, 4);
  X.strokeStyle = col; X.lineWidth = 3;
  for (const [x, y, dx, dy] of [[40, 40, 1, 1], [W - 40, 40, -1, 1], [40, H - 40, 1, -1], [W - 40, H - 40, -1, -1]]) { X.beginPath(); X.moveTo(x + dx * 40, y); X.lineTo(x, y); X.lineTo(x, y + dy * 40); X.stroke(); }
  X.fillStyle = (t >= 8 && t < 13.85) ? C.navy : C.y; X.fillRect(70, H - 70, (W - 140) * (t / DUR), 4);
  X.globalAlpha *= .3; X.fillRect(70, H - 70, W - 140, 4);
  X.restore();
}

// ---------- compositor ----------
function frame(t) {
  X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.filter = 'none';
  X.fillStyle = '#000'; X.fillRect(0, 0, W, H);
  const [shx, shy] = shake(t), punch = 1 + .045 * impact(t);
  X.save(); X.translate(540 + shx, 960 + shy); X.scale(punch, punch); X.translate(-540, -960);
  if (t < 4) scene1(t);
  else if (t < 8) {
    // zoom-through into the bar at the end
    const z = E.i3(P(t, 7.45, 8.0));
    X.save(); X.translate(540, 990); X.scale(1 + z * 18, 1 + z * 18); X.translate(-540, -990); scene2(t); X.restore();
    flash(P(t, 7.75, 8.0), C.y);
  } else if (t < 14) scene3(t);
  else if (t < 20) scene4(t);
  else if (t < 25) {
    const z = E.i3(P(t, 24.4, 25.0));
    X.save(); X.translate(BTN_W[0], BTN_W[1]); X.scale(1 + z * 22, 1 + z * 22); X.translate(-BTN_W[0], -BTN_W[1]); scene5(t); X.restore();
    flash(P(t, 24.8, 25.0), C.y);
  } else scene6(t);
  X.restore();
  hud(t);
}
const SUBS = [-1 / 90, 0, 1 / 90]; // 3-sample motion blur (~240° shutter)
function render(t) {
  O.globalCompositeOperation = 'source-over';
  SUBS.forEach((d, k) => { frame(cl(t + d, 0, DUR - .001)); O.globalAlpha = 1 / (k + 1); O.drawImage(sc, 0, 0); });
  // post: grain + vignette
  O.globalAlpha = .07; O.globalCompositeOperation = 'overlay'; O.drawImage(grains[Math.floor(t * FPS) % 4], 0, 0, W, H);
  O.globalCompositeOperation = 'source-over'; O.globalAlpha = 1;
  const v = O.createRadialGradient(540, 960, 500, 540, 960, 1250); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.45)');
  O.fillStyle = v; O.fillRect(0, 0, W, H);
  // fade from/to black
  const fb = 1 - P(t, 0, .25) + P(t, 29.6, 30);
  if (fb > 0) { O.fillStyle = `rgba(0,0,0,${cl(fb)})`; O.fillRect(0, 0, W, H); }
}

window.ready = document.fonts.load(font('PF', 900, 40)).then(() => Promise.all([
  document.fonts.load(font('PF', 700, 40, true)), document.fonts.load(font('IN', 500, 40)), document.fonts.load(font('IN', 800, 40)),
  document.fonts.load(font('IN', 900, 40)), document.fonts.load(font('MO', 700, 40)),
])).then(() => { buildNote(); buildParts(); render(0); return true; });
