// Simpan, Lupa, Dan Tenang — 90s motion piece built around Taufik's unboxing footage (@taufik.pg)
const DUR = 90;
const IMG = {};
const SEG = [
  ['s1', 0, 6], ['s2', 6, 13], ['s3', 13, 22], ['s4', 22, 29], ['s5', 29, 37], ['s6', 37, 51],
  ['s7', 51, 58], ['s8', 58, 67], ['s9', 67, 74], ['s10', 74, 81], ['s11', 81, 85.5], ['s12', 85.5, 90],
];
const CHAP = { s1: 'PEMBUKA', s2: 'NALURI', s3: 'TERBALIK', s4: 'NILAI', s5: 'INGAT', s6: 'EMAS VS KERTAS', s7: 'EMOSI', s8: 'JANGKA PANJANG', s9: 'TERSENYUM', s10: 'MASALAH', s11: 'AKAUN GAP', s12: '' };

// ---------- small kit ----------
function wrap(s, f, maxW) {
  X.save(); X.font = f; const out = []; let line = '';
  for (const w of s.split(' ')) { const tst = line ? line + ' ' + w : w; if (X.measureText(tst).width > maxW && line) { out.push(line); line = w; } else line = tst; }
  out.push(line); X.restore(); return out;
}
function navyBg(t, glowY = 1000) {
  X.fillStyle = C.navy; X.fillRect(0, 0, W, H);
  const g = X.createRadialGradient(540, glowY, 0, 540, glowY, 1050); g.addColorStop(0, 'rgba(30,48,80,.95)'); g.addColorStop(1, 'rgba(7,21,43,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H);
  X.save(); X.translate(990, 300); X.rotate(t * .2); X.strokeStyle = 'rgba(255,206,50,.09)'; X.lineWidth = 3;
  for (let i = 0; i < 6; i++) { X.beginPath(); X.arc(0, 0, 120 + i * 70, i, i + 2.4); X.stroke(); } X.restore();
}
function yelBg(t) {
  X.fillStyle = C.y; X.fillRect(0, 0, W, H); X.fillStyle = 'rgba(7,21,43,.09)'; const off = (t * 40) % 60;
  for (let y = -60; y < H + 60; y += 60) for (let x = -60; x < W + 60; x += 60) { X.beginPath(); X.arc(x + off, y + off * .5, 3, 0, 7); X.fill(); }
}
function photoPrint(drawFn, cx, cy, w, h, rot, a = 1) {
  if (a <= 0) return; const b = 16;
  X.save(); X.globalAlpha *= a; X.translate(cx, cy); X.rotate(rot);
  X.save(); X.filter = 'blur(24px)'; X.fillStyle = 'rgba(0,0,0,.5)'; X.fillRect(-w / 2 - b + 14, -h / 2 - b + 30, w + 2 * b, h + 2 * b + 50); X.restore();
  X.fillStyle = '#fbfaf6'; X.fillRect(-w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b + 50);
  drawFn(-w / 2, -h / 2, w, h);
  X.save(); X.rotate(-.06); X.fillStyle = 'rgba(255,214,90,.78)'; X.fillRect(-80, -h / 2 - b - 26, 160, 48); X.restore();
  X.restore();
}
function brackets(x, y, w, h, a, col = '#fff', len = 50) {
  if (a <= 0) return; X.save(); X.globalAlpha *= a; X.strokeStyle = col; X.lineWidth = 6;
  for (const [px, py, dx, dy] of [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]]) { X.beginPath(); X.moveTo(px + dx * len, py); X.lineTo(px, py); X.lineTo(px, py + dy * len); X.stroke(); }
  X.restore();
}
function tickMark(x, y, r, p, col = C.green) {
  if (p <= 0) return; const s = E.oB(cl(p * 1.6)); X.save(); X.translate(x, y); X.scale(s, s);
  X.beginPath(); X.arc(0, 0, r, 0, 7); X.fillStyle = col; X.fill();
  X.strokeStyle = '#fff'; X.lineWidth = r * .22; X.lineCap = 'round'; X.lineJoin = 'round'; X.setLineDash([r * 2.2 * E.o3(P(p, .3, 1)), r * 3]);
  X.beginPath(); X.moveTo(-r * .42, r * .04); X.lineTo(-r * .12, r * .34); X.lineTo(r * .45, -r * .3); X.stroke(); X.restore();
}
function crossMark(x, y, r, p) {
  if (p <= 0) return; const s = lerp(2, 1, E.oX(p)); X.save(); X.translate(x, y); X.scale(s, s); X.globalAlpha *= cl(p * 3);
  X.beginPath(); X.arc(0, 0, r, 0, 7); X.fillStyle = C.red; X.fill(); X.strokeStyle = '#fff'; X.lineWidth = r * .22; X.lineCap = 'round';
  X.beginPath(); X.moveTo(-r * .35, -r * .35); X.lineTo(r * .35, r * .35); X.moveTo(r * .35, -r * .35); X.lineTo(-r * .35, r * .35); X.stroke(); X.restore();
}
function tag(s, x, y, bg, fg, p, f = font('MO', 700, 30), h = 70) {
  if (p <= 0) return; X.save(); X.font = f; X.letterSpacing = '4px'; const w = X.measureText(s).width + 60; X.restore();
  X.save(); X.translate(x, y); X.scale(E.oB(p), E.oB(p)); rr(-w / 2, -h / 2, w, h, h / 2); X.fillStyle = bg; X.fill(); txt(s, 0, h * .16, f, fg, 'center', 1, 4); X.restore();
}
function lines(arr, x, y, lh, t, t0, f, size, fill, align = 'center', stag = .022, gap = .16) {
  arr.forEach((s, i) => reveal(s, x, y + i * lh, f, size, fill, t, t0 + i * gap, stag, .5, align));
}
function goldBar(cx, cy, w, h, rot = 0, a = 1, label = '999.9') {
  if (a <= 0) return; X.save(); X.globalAlpha *= a; X.translate(cx, cy); X.rotate(rot);
  const r = h * .12;
  rr(-w / 2, -h / 2 + h * .1, w, h, r); X.fillStyle = '#6b440c'; X.fill();
  rr(-w / 2, -h / 2, w, h, r); X.fillStyle = gold(-w / 2, -h / 2, w / 2, h / 2); X.fill();
  rr(-w / 2 + h * .1, -h / 2 + h * .1, w - h * .2, h - h * .2, r * .6); X.fillStyle = gold(w / 2, h / 2, -w / 2, -h / 2); X.fill();
  if (label) txt(label, 0, h * .13, font('PF', 900, h * .36), '#7d5210');
  X.restore();
}
function shine(s, x, y, f, sw, wd = 90) {
  if (sw <= 0 || sw >= 1) return; X.save(); X.font = f; X.textAlign = 'center'; X.globalCompositeOperation = 'lighter';
  const w = X.measureText(s).width, sx = lerp(x - w / 2 - 100, x + w / 2 + 100, sw), g = X.createLinearGradient(sx - wd, 0, sx + wd, 0);
  g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.5, 'rgba(255,255,255,.8)'); g.addColorStop(1, 'rgba(255,255,255,0)'); X.fillStyle = g; X.fillText(s, x, y); X.restore();
}
function bottomShade(a = .9, from = 900) { const g = X.createLinearGradient(0, from, 0, H); g.addColorStop(0, 'rgba(7,21,43,0)'); g.addColorStop(.55, `rgba(7,21,43,${a * .85})`); g.addColorStop(1, `rgba(7,21,43,${a})`); X.fillStyle = g; X.fillRect(0, from, W, H - from); }

// ---------- banknote + burn + particles (from the 'Simpan Emas Fizikal' engine) ----------
const NW = 760, NH = 380;
const note = document.createElement('canvas'); note.width = NW; note.height = NH;
let noteData, burnCan, burnBuf, NZ, lastTh = null;
function buildNote() {
  const n = note.getContext('2d');
  const g = n.createLinearGradient(0, 0, NW, NH); g.addColorStop(0, '#8b4fc9'); g.addColorStop(.5, '#6a2fa6'); g.addColorStop(1, '#4a1d7e');
  n.fillStyle = g; n.beginPath(); n.roundRect(0, 0, NW, NH, 18); n.fill();
  n.save(); n.beginPath(); n.roundRect(0, 0, NW, NH, 18); n.clip(); n.strokeStyle = 'rgba(255,255,255,.12)'; n.lineWidth = 1.5;
  for (let k = 0; k < 26; k++) { n.beginPath(); for (let x = 0; x <= NW; x += 8) { const yy = 40 + k * 13 + Math.sin(x * .02 + k * .5) * 18; x ? n.lineTo(x, yy) : n.moveTo(x, yy); } n.stroke(); }
  n.strokeStyle = 'rgba(255,255,255,.18)'; for (let k = 0; k < 14; k++) { n.beginPath(); n.arc(560, 190, 30 + k * 9, 0, Math.PI * 2); n.stroke(); }
  n.restore();
  n.strokeStyle = 'rgba(255,230,255,.55)'; n.lineWidth = 3; n.beginPath(); n.roundRect(16, 16, NW - 32, NH - 32, 10); n.stroke();
  n.fillStyle = '#f7ecff'; n.font = font('IN', 900, 120); n.textAlign = 'left'; n.fillText('100', 44, 150);
  n.font = font('IN', 900, 64); n.textAlign = 'right'; n.fillText('100', NW - 44, NH - 44);
  n.font = font('MO', 700, 26); n.textAlign = 'left'; n.letterSpacing = '6px'; n.fillText('RINGGIT MALAYSIA', 48, NH - 52);
  n.fillStyle = 'rgba(255,255,255,.85)'; n.font = font('PF', 900, 90); n.textAlign = 'center'; n.letterSpacing = '0px'; n.fillText('RM', 560, 222);
  noteData = n.getImageData(0, 0, NW, NH);
  const R = rng(11); NZ = new Float32Array(NW * NH);
  for (const [cells, amp] of [[6, .5], [14, .3], [34, .2]]) {
    const gx = cells + 1, gy = Math.ceil(cells * NH / NW) + 1, grid = Array.from({ length: gx * gy }, R);
    for (let y = 0; y < NH; y++) for (let x = 0; x < NW; x++) {
      const fx = x / NW * cells, fy = y / NW * cells, ix = fx | 0, iy = fy | 0; let ux = fx - ix, uy = fy - iy; ux = ux * ux * (3 - 2 * ux); uy = uy * uy * (3 - 2 * uy);
      NZ[y * NW + x] += amp * lerp(lerp(grid[iy * gx + ix], grid[iy * gx + ix + 1], ux), lerp(grid[(iy + 1) * gx + ix], grid[(iy + 1) * gx + ix + 1], ux), uy);
    }
  }
  let mn = 9, mx = -9;
  for (let y = 0; y < NH; y++) for (let x = 0; x < NW; x++) { const i = y * NW + x; NZ[i] = .55 * NZ[i] + .45 * (1 - (x / NW + y / NH) / 2); mn = Math.min(mn, NZ[i]); mx = Math.max(mx, NZ[i]); }
  for (let i = 0; i < NZ.length; i++) NZ[i] = (NZ[i] - mn) / (mx - mn);
  burnCan = document.createElement('canvas'); burnCan.width = NW; burnCan.height = NH; burnBuf = burnCan.getContext('2d').createImageData(NW, NH);
}
function burnNote(th) {
  if (th <= -.03) return note; if (th === lastTh) return burnCan; lastTh = th;
  const s = noteData.data, d = burnBuf.data, EDGE = .045;
  for (let i = 0, j = 0; i < NZ.length; i++, j += 4) {
    const n = NZ[i]; if (n < th) { d[j + 3] = 0; continue; }
    let r = s[j], g = s[j + 1], b = s[j + 2]; const k = (n - th) / EDGE;
    if (k < 1) { const hot = 1 - k; if (hot > .55) { r = 255; g = 230; b = 150; } else if (hot > .25) { r = 255; g = 120 + hot * 150; b = 30; } else { r *= .35; g *= .25; b *= .25; } }
    else if (k < 2.2) { const c = .4 + .6 * (k - 1) / 1.2; r *= c; g *= c; b *= c; }
    d[j] = r; d[j + 1] = g; d[j + 2] = b; d[j + 3] = s[j + 3];
  }
  burnCan.getContext('2d').putImageData(burnBuf, 0, 0); return burnCan;
}
const parts = [];
function buildParts() {
  const R = rng(5);
  for (let i = 0; i < 900; i++) {
    const nx = R() * NW, ny = R() * NH;
    let tx, ty; if (R() < .55) { const per = R() * 2 * 960; if (per < 640) { tx = per; ty = 0; } else if (per < 960) { tx = 640; ty = per - 640; } else if (per < 1600) { tx = per - 960; ty = 320; } else { tx = 0; ty = (per - 1600) / 2; } } else { tx = R() * 640; ty = R() * 320; }
    const a = R() * 6.28;
    parts.push({ nx, ny, n: NZ[(ny | 0) * NW + (nx | 0)], vx: (R() - .5) * 90, vy: 70 + R() * 160, ph: R() * 6.28, sz: 1.6 + R() * 3.4, ex: Math.cos(a) * (200 + R() * 500), ey: Math.sin(a) * (200 + R() * 600), tx: tx - 320, ty: ty - 160, d: R(), dir: R() < .5 ? -1 : 1, hue: R() });
  }
}
function drawNote(img, cx, cy, sc, rot, a = 1) { X.save(); X.globalAlpha *= a; X.translate(cx, cy); X.rotate(rot); X.scale(sc, sc); X.drawImage(img, -NW / 2, -NH / 2); X.restore(); }
function embers(t, b0, b1, cx, cy, sc, rot, life = 1.4) {
  X.save(); X.globalCompositeOperation = 'lighter'; const c = Math.cos(rot), s = Math.sin(rot);
  for (const p of parts) {
    const tb = b0 + (p.n + .03) / 1.09 * (b1 - b0); if (t < tb) continue; const a = t - tb; if (a > life) continue;
    const dx = (p.nx - NW / 2) * sc, dy = (p.ny - NH / 2) * sc, wx = cx + dx * c - dy * s, wy = cy + dx * s + dy * c;
    X.fillStyle = `rgba(255,${110 + 120 * p.hue | 0},40,${1 - a / life})`;
    X.beginPath(); X.arc(wx + p.vx * a + Math.sin(a * 3 + p.ph) * 20 * a, wy - p.vy * a - 30 * a * a, p.sz, 0, 7); X.fill();
  }
  X.restore();
}

// ---------- S1: hook — flash-forward, rewind, unboxing ----------
function srcS1(t) { return t < 1.6 ? 55.0 + t : t < 2.3 ? lerp(56.6, .2, E.io3(P(t, 1.6, 2.3))) : .2 + (t - 2.3); }
const PANEL = { x: 160, y: 200, w: 760, h: 620 };
function s1(t) {
  X.fillStyle = '#000'; X.fillRect(0, 0, W, H);
  const k = E.ioX(P(t, 5.3, 6.0)); // shrink into the S2 panel
  const x = lerp(0, PANEL.x, k), y = lerp(0, PANEL.y, k), w = lerp(W, PANEL.w, k), h = lerp(H, PANEL.h, k);
  if (k > 0) navyBg(t);
  const rew = t > 1.6 && t < 2.3;
  foot(srcS1(t), x, y, w, h, { r: 40 * k, zoom: t < 1.6 ? lerp(1.25, 1.1, t / 1.6) : 1, fy: t < 1.6 ? .4 : .45, filter: rew ? 'contrast(1.3) saturate(.4) brightness(1.1)' : undefined });
  if (rew) { // tape rewind artefacts
    X.save(); X.globalAlpha = .55; const R = rng(Math.floor(t * 30));
    for (let i = 0; i < 9; i++) { const yy = R() * H; X.fillStyle = `rgba(255,255,255,${.2 + R() * .5})`; X.fillRect(0, yy, W, 2 + R() * 10); }
    X.restore();
    X.save(); X.fillStyle = '#fff'; X.translate(120, 250); for (const o of [0, 46]) { X.beginPath(); X.moveTo(o, 0); X.lineTo(o + 44, -30); X.lineTo(o + 44, 30); X.closePath(); X.fill(); } X.restore();
    txt('REWIND', 240, 264, font('MO', 700, 40), '#fff', 'left', 1, 8);
  }
  if (k < 1) {
    X.save(); X.globalAlpha = 1 - k;
    if (t < 1.6) { brackets(300, 480, 480, 520, E.o3(P(t, .1, .5)), C.y); txt('REC ●', 900, 260, font('MO', 700, 30), C.red, 'right', Math.floor(t * 3) % 2 ? 1 : .3, 4); }
    bottomShade(.9, 1000);
    const out1 = P(t, 1.45, 1.65);
    X.save(); X.globalAlpha *= 1 - out1; X.translate(out1 * -300, 0);
    reveal('Simpan,', 540, 1330, font('PF', 900, 170), 170, '#fff', t, .1, .04, .5);
    reveal('Lupa,', 540, 1500, font('PF', 700, 190, true), 190, gold, t, .45, .05, .5);
    reveal('Dan Tenang.', 540, 1660, font('PF', 900, 150), 150, '#fff', t, .8, .04, .5);
    X.restore();
    if (t > 2.3) {
      txt('UBAH NALURI', 540, 1250, font('MO', 700, 40), C.y, 'center', E.o3(P(t, 2.4, 2.7)), 12);
      const a1 = E.oX(P(t, 2.7, 3.1)), st = E.o3(P(t, 3.5, 3.8)), a2 = P(t, 3.9, 4.25);
      X.save(); X.translate(540, 1420); X.scale(lerp(1.4, 1, a1), lerp(1.4, 1, a1));
      txt('“habiskan duit”', 0, 0, font('PF', 700, 110, true), `rgba(255,255,255,${.9 - .5 * st})`, 'center', a1);
      if (st > 0) { X.strokeStyle = C.red; X.lineWidth = 12; X.lineCap = 'round'; X.beginPath(); X.moveTo(-330, -34); X.lineTo(-330 + 660 * st, -40); X.stroke(); }
      X.restore();
      if (a2 > 0) { const s = lerp(2.2, 1, E.oX(a2)); X.save(); X.translate(540, 1600); X.scale(s, s); txt('“kumpul harta”', 0, 0, font('PF', 900, 130), gold(-400, -100, 400, 0), 'center', cl(a2 * 3)); X.restore(); }
      shine('“kumpul harta”', 540, 1600, font('PF', 900, 130), P(t, 4.5, 5.2));
    }
    X.restore();
  }
  if (k > 0) X.save(), rr(x, y, w, h, 40 * k), X.strokeStyle = `rgba(255,206,50,${k})`, X.lineWidth = 6, X.stroke(), X.restore();
  flash((1 - P(t, 2.3, 2.5)) * (t > 2.3 ? .7 : 0));
}

// ---------- S2: bukan paksaan, tapi kefahaman ----------
function s2(t) {
  const lt = t - 6; navyBg(t);
  const exitK = E.ioX(P(t, 12.3, 13.0));
  const py = lerp(PANEL.y, 160, exitK), ph = lerp(PANEL.h, 520, exitK);
  foot(8 + lt, PANEL.x, py, PANEL.w, ph, { r: 40, border: C.y });
  txt('BUKAN DENGAN', 540, 1000, font('MO', 700, 38), 'rgba(255,255,255,.7)', 'center', E.o3(P(lt, .3, .6)) * (1 - exitK), 12);
  const pk = E.oX(P(lt, .5, .9)), st = E.o3(P(lt, 1.4, 1.7));
  X.save(); X.globalAlpha = (1 - exitK); X.translate(540, 1160); X.scale(lerp(1.5, 1, pk), lerp(1.5, 1, pk));
  txt('PAKSAAN', 0, 0, font('IN', 900, 150), `rgba(255,255,255,${1 - .55 * st})`, 'center', cl(pk * 2), 4);
  if (st > 0) { X.strokeStyle = C.red; X.lineWidth = 16; X.lineCap = 'round'; X.beginPath(); X.moveTo(-370, -50); X.lineTo(-370 + 740 * st, -58); X.stroke(); }
  X.restore();
  txt('TAPI DENGAN', 540, 1330, font('MO', 700, 38), C.y, 'center', E.o3(P(lt, 1.9, 2.2)) * (1 - exitK), 12);
  X.save(); X.globalAlpha = 1 - exitK;
  reveal('kefahaman.', 540, 1520, font('PF', 700, 190, true), 190, gold, lt, 2.2, .05, .55);
  // lightbulb
  const bp = E.oB(P(lt, 2.9, 3.4));
  if (bp > 0) {
    X.save(); X.translate(900, 1330); X.scale(bp, bp);
    const gl = X.createRadialGradient(0, 0, 0, 0, 0, 160); gl.addColorStop(0, `rgba(255,214,90,${.5 + .2 * Math.sin(lt * 6)})`); gl.addColorStop(1, 'rgba(255,214,90,0)'); X.fillStyle = gl; X.fillRect(-160, -160, 320, 320);
    X.beginPath(); X.arc(0, -10, 50, Math.PI * .8, Math.PI * 2.2); X.lineTo(22, 50); X.lineTo(-22, 50); X.closePath(); X.fillStyle = C.y; X.fill();
    X.fillStyle = '#cfd5df'; X.fillRect(-22, 56, 44, 12); X.fillRect(-18, 72, 36, 10); X.restore();
  }
  txt('Faham dulu. Baru tenang.', 540, 1700, font('IN', 800, 50), '#fff', 'center', E.o3(P(lt, 3.8, 4.2)));
  X.restore();
}

// ---------- S3: semuanya jadi TERBALIK (180° camera roll) ----------
const ICONS = {
  bag(c) { X.strokeStyle = c; X.lineWidth = 7; rr(-34, -18, 68, 60, 8); X.stroke(); X.beginPath(); X.arc(0, -18, 20, Math.PI, 0); X.stroke(); },
  phone(c) { X.strokeStyle = c; X.lineWidth = 7; rr(-24, -42, 48, 84, 10); X.stroke(); X.fillStyle = c; X.fillRect(-8, 30, 16, 5); },
  cup(c) { X.strokeStyle = c; X.lineWidth = 7; X.beginPath(); X.moveTo(-28, -30); X.lineTo(-20, 38); X.lineTo(20, 38); X.lineTo(28, -30); X.closePath(); X.stroke(); X.beginPath(); X.moveTo(-34, -30); X.lineTo(34, -30); X.stroke(); X.beginPath(); X.moveTo(6, -30); X.lineTo(16, -54); X.stroke(); },
  shoe(c) { X.strokeStyle = c; X.lineWidth = 7; X.lineJoin = 'round'; X.beginPath(); X.moveTo(-40, 24); X.lineTo(-40, -20); X.lineTo(-8, -20); X.lineTo(4, 2); X.lineTo(40, 10); X.lineTo(40, 24); X.closePath(); X.stroke(); },
  tag(c) { X.strokeStyle = c; X.lineWidth = 7; X.lineJoin = 'round'; X.beginPath(); X.moveTo(-36, -36); X.lineTo(4, -36); X.lineTo(40, 0); X.lineTo(4, 36); X.lineTo(-36, 0); X.closePath(); X.stroke(); X.beginPath(); X.arc(-16, -16, 7, 0, 7); X.stroke(); },
};
function s3before(t) {
  const lt = t - 13; navyBg(t);
  foot(15 + lt * .75, PANEL.x, 160, PANEL.w, 520, { r: 40, border: C.y });
  lines(['Bila faham', 'sifat emas,'], 540, 900, 120, lt, .1, font('PF', 900, 120), 120, '#fff');
  reveal('semuanya jadi', 540, 1220, font('IN', 800, 70), 70, 'rgba(255,255,255,.8)', lt, 1.0, .02);
  const tp = P(lt, 1.45, 1.75);
  if (tp > 0) { const s = lerp(2.5, 1, E.oX(tp)); X.save(); X.translate(540, 1440); X.scale(s, s); txt('TERBALIK', 0, 0, font('IN', 900, 200), C.y, 'center', cl(tp * 3), 4); X.restore(); }
}
function s3after(t) {
  const lt = t - 16.2; navyBg(t, 900);
  foot(15 + (t - 13) * .75, 760, 170, 260, 340, { r: 130, border: C.y });
  // DULU
  tag('DULU', 220, 230, 'rgba(255,255,255,.14)', '#fff', P(lt, .1, .4));
  lines(['Ada duit lebih,', 'fikir nak beli apa.'], 90, 400, 84, lt, .2, font('PF', 900, 76), 76, '#fff', 'left', .015, .15);
  // thought bubble of spending icons
  const keys = Object.keys(ICONS), done = 1 - P(lt, 2.4, 2.8);
  keys.forEach((k, i) => {
    const p = E.oB(P(lt, .6 + i * .12, 1.0 + i * .12)); if (p <= 0) return;
    const a = -Math.PI * .9 + i * Math.PI * .45, x = 300 + Math.cos(a) * 220 + Math.sin(lt * 2 + i) * 8, y = 730 + Math.sin(a) * 120;
    X.save(); X.translate(x, y); X.scale(p, p); X.globalAlpha = done; X.beginPath(); X.arc(0, 0, 66, 0, 7); X.fillStyle = 'rgba(239,68,68,.18)'; X.fill(); ICONS[k]('#ff8a80'); X.restore();
  });
  const rp = E.o3(P(lt, 1.7, 2.0)); if (rp > 0) { txt('RM', 300, 760, font('IN', 900, 70), `rgba(255,138,128,${rp * done})`); }
  // SEKARANG
  const sp = P(lt, 2.6, 3.0);
  if (sp > 0) {
    X.save(); X.globalAlpha = cl(sp * 2); X.strokeStyle = 'rgba(255,206,50,.4)'; X.lineWidth = 3; X.setLineDash([12, 12]); X.beginPath(); X.moveTo(90, 940); X.lineTo(990, 940); X.stroke(); X.restore();
    tag('SEKARANG', 270, 1020, C.y, C.navy, sp);
    lines(['Fikir macam mana', 'nak tambah gram.'], 90, 1190, 84, lt, 2.8, font('PF', 900, 76), 76, gold, 'left', .015, .15);
    // stacking bars + gram counter
    const n = Math.floor(cl((lt - 3.3) / .38, 0, 8));
    for (let i = 0; i < 8; i++) { const p = E.oB(P(lt, 3.3 + i * .38, 3.6 + i * .38)); if (p <= 0) continue; goldBar(300 + (i % 2) * 22, 1640 - i * 46 - (1 - p) * 300, 300, 70, 0, cl(p * 3), ''); }
    const g = n * .25 + .25 * E.o3(cl((lt - 3.3) / .38 % 1));
    txt('+ ' + (lt > 3.3 ? g.toFixed(2) : '0.00') + ' g', 760, 1520, font('IN', 900, 96), C.y, 'center', E.o3(P(lt, 3.2, 3.5)));
    txt('lagi dan lagi.', 760, 1620, font('PF', 700, 64, true), '#fff', 'center', E.o3(P(lt, 4.6, 5.0)));
  }
}
function s3(t) {
  const roll = E.ioX(P(t, 15.4, 16.2)), ang = roll * Math.PI;
  X.fillStyle = C.navy; X.fillRect(0, 0, W, H);
  if (t < 16.2) { X.save(); X.translate(540, 960); X.rotate(ang); X.scale(1 - .25 * Math.sin(roll * Math.PI), 1 - .25 * Math.sin(roll * Math.PI)); X.translate(-540, -960); s3before(t); X.restore(); }
  const xa = P(t, 15.85, 16.2);
  if (xa > 0) { X.save(); X.globalAlpha = xa; X.translate(540, 960); X.rotate(ang - Math.PI); X.scale(1 - .25 * Math.sin(roll * Math.PI), 1 - .25 * Math.sin(roll * Math.PI)); X.translate(-540, -960); s3after(t); X.restore(); }
}

// ---------- S4: nilai terpelihara (freeze-frame + note burns vs gold holds) ----------
function s4(t) {
  const lt = t - 22; navyBg(t);
  const FR = 22.95;
  const s = lt < 1.0 ? 21.5 + lt * 1.45 : FR;
  const k = E.ioX(P(lt, 1.15, 1.9));
  if (lt < 1.15) {
    const w = 860, h = 1100; foot(s, 110, 260, w, h, { r: 30 });
    brackets(240, 420, 600, 560, E.o3(P(lt, .1, .4)), C.y, 70); txt('FOKUS', 540, 400, font('MO', 700, 28), C.y, 'center', E.o3(P(lt, .2, .5)) * (Math.floor(lt * 8) % 2 ? 1 : .4), 6);
  } else {
    photoPrint((x, y, w, h) => foot(FR, x, y, w, h, {}), lerp(540, 300, k), lerp(810, 520, k), lerp(860, 380, k), lerp(1100, 486, k), lerp(0, -.08, k));
  }
  flash((1 - P(lt, 1.0, 1.3)) * (lt > 1 ? 1 : 0));
  lines(['Bukan kerana', 'tamak.'], 760, 420, 92, lt, 1.6, font('PF', 900, 84), 84, '#fff', 'center', .02, .2);
  txt('Sebab kita faham:', 760, 640, font('IN', 500, 40), 'rgba(255,255,255,.7)', 'center', E.o3(P(lt, 2.2, 2.5)));
  // split: paper vs gold
  const sp = E.o3(P(lt, 2.3, 2.7));
  if (sp > 0) {
    X.save(); X.globalAlpha = sp;
    rr(60, 860, 460, 700, 30); X.fillStyle = 'rgba(239,68,68,.10)'; X.fill(); X.strokeStyle = 'rgba(239,68,68,.5)'; X.lineWidth = 3; X.stroke();
    rr(560, 860, 460, 700, 30); X.fillStyle = 'rgba(255,206,50,.10)'; X.fill(); X.strokeStyle = 'rgba(255,206,50,.6)'; X.stroke();
    txt('WANG KERTAS', 290, 930, font('MO', 700, 30), '#ff8a80', 'center', 1, 6); txt('EMAS', 790, 930, font('MO', 700, 30), C.y, 'center', 1, 6);
    X.restore();
    const th = lerp(-.03, 1.06, P(lt, 2.9, 5.6));
    drawNote(burnNote(th), 290, 1180, .52, -.08, sp); embers(t, 22 + 2.9, 22 + 5.6, 290, 1180, .52, -.08);
    txt('boleh lesap', 290, 1480, font('PF', 700, 64, true), '#ff8a80', 'center', E.o3(P(lt, 4.6, 5.0)));
    for (let i = 0; i < 4; i++) { const p = E.oB(P(lt, 3.0 + i * .35, 3.3 + i * .35)); goldBar(790 + (i % 2 ? 10 : -10), 1320 - i * 60 - (1 - p) * 200, 300, 76, 0, cl(p * 3), i === 3 ? '999.9' : ''); }
    sparkle(880, 1100, 40 * Math.sin(P(lt, 4.4, 5.0) * Math.PI), 1);
    txt('terpelihara', 790, 1480, font('PF', 700, 64, true), C.y, 'center', E.o3(P(lt, 4.6, 5.0)));
  }
  txt('InsyaAllah.', 540, 1700, font('PF', 700, 80, true), gold(300, 1640, 780, 1700), 'center', E.o3(P(lt, 5.6, 6.0)));
}

// ---------- S5: satu perkara kena ingat (note -> particles -> gold bar) ----------
function s5(t) {
  const lt = t - 29;
  foot(24.5 + lt, 0, 0, W, H, { filter: 'blur(14px) brightness(.55) saturate(.8)', zoom: 1.1 });
  X.fillStyle = 'rgba(7,21,43,.72)'; X.fillRect(0, 0, W, H);
  // bulb + label
  const lp = P(lt, .15, .5);
  if (lp > 0) { X.save(); X.translate(250, 250); X.scale(E.oB(lp), E.oB(lp)); X.beginPath(); X.arc(0, -6, 22, Math.PI * .8, Math.PI * 2.2); X.lineTo(10, 22); X.lineTo(-10, 22); X.closePath(); X.fillStyle = C.y; X.fill(); X.restore(); }
  txt('SATU PERKARA KENA INGAT', 290, 262, font('MO', 700, 32), C.y, 'left', E.o3(lp), 6);
  txt('“', 70, 520, font('PF', 900, 300), gold(70, 300, 250, 520), 'left', E.o3(P(lt, .3, .7)));
  lines(['Membeli emas bukan', 'menghabiskan duit.'], 540, 480, 96, lt, .5, font('PF', 900, 84), 84, '#fff', 'center', .015, .2);
  reveal('Kita cuma MENUKAR duit', 540, 720, font('IN', 800, 60), 60, '#fff', lt, 1.6, .012);
  reveal('kepada bentuk yang', 540, 800, font('IN', 800, 60), 60, '#fff', lt, 1.85, .012);
  reveal('lebih kukuh.', 540, 920, font('PF', 700, 120, true), 120, gold, lt, 2.1, .04);
  shine('lebih kukuh.', 540, 920, font('PF', 700, 120, true), P(lt, 6.2, 7.0));
  // note -> particles -> bar
  const NC = [540, 1340], SC = .6;
  const ap = E.oB(P(lt, 2.6, 3.2));
  if (lt < 4.0) drawNote(burnNote(lerp(-.03, 1.06, P(lt, 3.4, 4.0)) ), NC[0], NC[1] + (1 - ap) * 500, SC, -.04, cl(ap * 2));
  if (lt > 3.4 && lt < 6.0) {
    X.save(); X.globalCompositeOperation = 'lighter';
    const c = Math.cos(-.04), s = Math.sin(-.04);
    for (const p of parts) {
      const tb = 3.4 + (p.n + .03) / 1.09 * .6; if (lt < tb) continue;
      const dx = (p.nx - NW / 2) * SC, dy = (p.ny - NH / 2) * SC, sx = NC[0] + dx * c - dy * s, sy = NC[1] + dx * s + dy * c;
      const ex = E.oX(P(lt, tb, tb + .5)), e = E.io3(P(lt, 4.2 + p.d * .2, 5.2 + p.d * .2));
      const x0 = sx + p.ex * .5 * ex, y0 = sy + p.ey * .4 * ex, tx = NC[0] + p.tx * .7, ty = NC[1] + p.ty * .7;
      const ddx = lerp(x0 - NC[0], tx - NC[0], e), ddy = lerp(y0 - NC[1], ty - NC[1], e), a = (1 - e) * 2 * p.dir;
      X.fillStyle = `rgba(255,${190 + 60 * p.hue | 0},${80 + 100 * p.hue | 0},${(1 - P(lt, 5.4, 5.8)) * .9})`;
      X.beginPath(); X.arc(NC[0] + ddx * Math.cos(a) - ddy * Math.sin(a), NC[1] + ddx * Math.sin(a) + ddy * Math.cos(a), p.sz * (1.1 - .4 * e), 0, 7); X.fill();
    }
    X.restore();
  }
  const bp = P(lt, 5.35, 5.6);
  if (bp > 0) { goldBar(540, 1340 + Math.sin(lt * 1.6) * 6, 448 * lerp(1.15, 1, E.oB(P(lt, 5.4, 5.9))), 224, Math.sin(lt) * .03, bp); sparkle(720, 1240, 40 * Math.sin(P(lt, 5.8, 6.4) * Math.PI), 1); }
  const rp = P(lt, 5.4, 6.1); if (rp > 0 && rp < 1) { X.strokeStyle = `rgba(255,206,50,${1 - rp})`; X.lineWidth = 20 * (1 - rp) + 2; X.beginPath(); X.arc(540, 1340, E.oX(rp) * 700, 0, 7); X.stroke(); }
  if (lt > 5.4) flash((1 - P(lt, 5.4, 5.7)) * .6, '#fff1b3');
  txt('Wang kertas boleh lesap sekelip mata.', 540, 1640, font('IN', 500, 40), 'rgba(255,255,255,.75)', 'center', E.o3(P(lt, 6.0, 6.4)));
  txt('Emas kekal nilainya.', 540, 1720, font('IN', 900, 56), C.y, 'center', E.o3(P(lt, 6.3, 6.7)));
}

// ---------- S6: Naluri Emas vs Naluri Duit Kertas ----------
const GOLDROWS = ['Rasa sayang nak jual walaupun ada tekanan.', 'Rasa nak kumpul banyak-banyak secara konsisten.', 'Tak terlintas nak guna untuk boros.', 'Nilai terpelihara walaupun harga barang naik.'];
const PAPROWS = ['Dicipta untuk memudahkan transaksi, mudah keluar.', 'Naluri semula jadi manusia nak membelanjakannya.', '“Simpan sikit, lama-lama habis dikorek.”', 'Nilai susut setiap tahun akibat inflasi.'];
function s6(t) {
  const lt = t - 37; navyBg(t, 1100);
  reveal('Naluri', 540, 270, font('PF', 900, 120), 120, '#fff', lt, .1, .04);
  txt('EMAS  VS  DUIT KERTAS', 540, 340, font('MO', 700, 32), C.y, 'center', E.o3(P(lt, .4, .7)), 6);
  const cp = [E.oX(P(lt, .3, .9)), E.oX(P(lt, .45, 1.05))];
  const cols = [
    { x: 40, rows: GOLDROWS, title: 'Naluri Emas', sub: 'ASET KUKUH', col: C.y, bg: 'rgba(255,206,50,.10)', bd: 'rgba(255,206,50,.75)' },
    { x: 550, rows: PAPROWS, title: 'Naluri Kertas', sub: 'MUDAH BOCOR', col: '#ff8a80', bg: 'rgba(239,68,68,.09)', bd: 'rgba(239,68,68,.55)' },
  ];
  cols.forEach((c, ci) => {
    const p = cp[ci]; if (p <= 0) return;
    X.save(); X.translate(0, (1 - p) * 1200);
    rr(c.x, 410, 490, 1370, 34); X.fillStyle = c.bg; X.fill(); X.strokeStyle = c.bd; X.lineWidth = 4; X.stroke();
    // header icon: medal / leaking drop
    X.save(); X.translate(c.x + 80, 500);
    if (ci === 0) { X.fillStyle = '#c0392b'; X.beginPath(); X.moveTo(-18, -44); X.lineTo(0, -10); X.lineTo(18, -44); X.closePath(); X.fill(); X.beginPath(); X.arc(0, 10, 32, 0, 7); X.fillStyle = gold(-32, -22, 32, 42); X.fill(); txt('1', 0, 24, font('IN', 900, 36), '#7d5210'); }
    else { X.fillStyle = '#ff8a80'; X.beginPath(); X.moveTo(0, -34); X.bezierCurveTo(30, 6, 30, 34, 0, 34); X.bezierCurveTo(-30, 34, -30, 6, 0, -34); X.fill(); }
    X.restore();
    txt(c.sub, c.x + 135, 482, font('MO', 700, 22), c.col, 'left', 1, 4);
    txt(c.title, c.x + 135, 532, font('PF', 900, 46), '#fff', 'left');
    c.rows.forEach((r, i) => {
      const t0 = 1.4 + (i * 2 + ci) * 1.5, rp = E.o3(P(lt, t0, t0 + .4)); if (rp <= 0) return;
      const y = 620 + i * 285, active = lt > t0 && lt < t0 + 1.5;
      X.save(); X.globalAlpha = rp; X.translate((1 - rp) * (ci ? 60 : -60), 0);
      if (active) { rr(c.x + 14, y, 462, 262, 22); X.fillStyle = ci ? 'rgba(239,68,68,.16)' : 'rgba(255,206,50,.16)'; X.fill(); }
      const ls = wrap(r, font('IN', 800, 38), 330);
      ls.forEach((l, k) => txt(l, c.x + 130, y + 70 + k * 50, font('IN', 800, 38), ci && i === 3 ? '#ffd0cc' : '#fff', 'left'));
      X.restore();
      if (ci === 0) tickMark(c.x + 66, y + 58, 34, P(lt, t0 + .1, t0 + .5)); else crossMark(c.x + 66, y + 58, 34, P(lt, t0 + .1, t0 + .4));
    });
    X.restore();
  });
  // leak drips under the paper card, sparkles over the gold card
  if (lt > 2.5) {
    for (let i = 0; i < 6; i++) { const ph = ((lt * .8 + i * .37) % 1), x = 600 + i * 75; X.fillStyle = `rgba(255,138,128,${(1 - ph) * .8})`; X.beginPath(); X.arc(x, 1780 + ph * 120, 8, 0, 7); X.fill(); }
    for (let i = 0; i < 5; i++) { const ph = ((lt * .6 + i * .29) % 1); sparkle(90 + i * 95, 1760 - ph * 1300, 18 * Math.sin(ph * Math.PI), .8); }
  }
}

// ---------- S7: jangan tewas dengan emosi ----------
function brain(cx, cy, s, p) {
  X.save(); X.translate(cx, cy); X.scale(s, s); X.strokeStyle = '#ff9fc6'; X.lineWidth = 8; X.lineCap = 'round'; X.setLineDash([700 * p, 700]);
  X.beginPath(); X.arc(-30, -20, 46, Math.PI * .9, Math.PI * 1.9); X.arc(30, -20, 46, Math.PI * 1.1, Math.PI * .1); X.arc(36, 30, 36, -.6, Math.PI * .6); X.arc(-36, 30, 36, Math.PI * .4, Math.PI * 1.6); X.stroke();
  X.beginPath(); X.moveTo(0, -60); X.lineTo(0, 60); X.stroke(); X.restore();
}
function s7(t) {
  const lt = t - 51; navyBg(t);
  foot(33 + lt, 740, 170, 280, 280, { r: 140, border: '#ff9fc6', fy: .35 });
  brain(170, 300, 1.2, E.o3(P(lt, .1, .9)));
  lines(['Jangan tewas', 'dengan emosi.'], 90, 520, 110, lt, .3, font('PF', 900, 104), 104, '#fff', 'left', .02, .2);
  // flow: nafsu -> logik
  const f1 = E.oB(P(lt, 1.4, 1.8)), f2 = E.oB(P(lt, 2.0, 2.4)), ar = E.io3(P(lt, 1.7, 2.1));
  if (f1 > 0) { X.save(); X.translate(290, 840); X.scale(f1, f1); rr(-200, -70, 400, 140, 26); X.fillStyle = 'rgba(239,68,68,.2)'; X.fill(); X.strokeStyle = C.red; X.lineWidth = 4; X.stroke(); txt('BELI IKUT', 0, -12, font('MO', 700, 24), '#ff8a80', 'center', 1, 4); txt('NAFSU', 0, 44, font('IN', 900, 56), '#fff'); X.restore(); }
  if (ar > 0) { X.strokeStyle = '#fff'; X.lineWidth = 8; X.lineCap = 'round'; X.beginPath(); X.moveTo(500, 840); X.lineTo(lerp(500, 570, ar), 840); X.stroke(); X.fillStyle = '#fff'; X.beginPath(); X.moveTo(lerp(500, 570, ar) + 14, 840); X.lineTo(lerp(500, 570, ar) - 10, 822); X.lineTo(lerp(500, 570, ar) - 10, 858); X.fill(); }
  if (f2 > 0) { X.save(); X.translate(790, 840); X.scale(f2, f2); rr(-200, -70, 400, 140, 26); X.fillStyle = 'rgba(255,255,255,.08)'; X.fill(); X.strokeStyle = 'rgba(255,255,255,.5)'; X.lineWidth = 4; X.stroke(); txt('LEPAS TU CARI', 0, -12, font('MO', 700, 24), 'rgba(255,255,255,.7)', 'center', 1, 4); txt('ALASAN', 0, 44, font('IN', 900, 56), '#fff'); X.restore(); }
  // chart: gaji naik, simpanan flat
  const cp = P(lt, 2.7, 4.6);
  if (cp > 0) {
    const x0 = 120, x1 = 960, yb = 1420;
    X.strokeStyle = 'rgba(255,255,255,.25)'; X.lineWidth = 3; X.beginPath(); X.moveTo(x0, 1060); X.lineTo(x0, yb); X.lineTo(x1, yb); X.stroke();
    const e = E.io3(cp); X.lineCap = 'round'; X.lineJoin = 'round';
    X.lineWidth = 10; X.strokeStyle = '#22c55e'; X.beginPath(); for (let i = 0; i <= 50 * e; i++) { const u = i / 50, y = yb - 40 - u * 300 + Math.sin(u * 12) * 8; i ? X.lineTo(lerp(x0, x1, u), y) : X.moveTo(lerp(x0, x1, u), y); } X.stroke();
    X.strokeStyle = C.red; X.beginPath(); for (let i = 0; i <= 50 * e; i++) { const u = i / 50, y = yb - 40 - Math.sin(u * 18) * 22 * (1 - u) - u * 10; i ? X.lineTo(lerp(x0, x1, u), y) : X.moveTo(lerp(x0, x1, u), y); } X.stroke();
    txt('GAJI NAIK', x1, yb - 370, font('MO', 700, 30), '#22c55e', 'right', P(lt, 4.2, 4.5), 4);
    txt('SIMPANAN TAK KE MANA', x1, yb - 80, font('MO', 700, 30), '#ff8a80', 'right', P(lt, 4.4, 4.7), 4);
  }
  // solution
  tag('SOLUSI', 540, 1540, '#22c55e', '#fff', P(lt, 5.0, 5.3));
  reveal('Tukar bentuk aset.', 540, 1690, font('PF', 900, 96), 96, gold, lt, 5.3, .025);
}

// ---------- S8: menyesal beli vs menyesal tak beli ----------
function s8(t) {
  const lt = t - 58; yelBg(t);
  txt('02 · PERSPEKTIF JANGKA PANJANG', 540, 230, font('MO', 700, 30), C.navy, 'center', E.o3(P(lt, .1, .4)), 6);
  const big = 1 - E.ioX(P(lt, 2.4, 3.0)); // header shrinks up for the chart
  X.save(); X.translate(540, 300); X.scale(lerp(.62, 1, big), lerp(.62, 1, big)); X.translate(-540, -300 + lerp(-120, 0, big));
  reveal('“Menyesal beli”', 540, 520, font('PF', 900, 112), 112, C.navy, lt, .2, .025);
  txt('lebih baik daripada', 540, 640, font('IN', 800, 50), 'rgba(7,21,43,.7)', 'center', E.o3(P(lt, .8, 1.1)));
  const ms = P(lt, 1.2, 1.5);
  if (ms > 0) { const s = lerp(2, 1, E.oX(ms)); X.save(); X.translate(540, 800); X.scale(s, s); txt('“Menyesal TAK beli”', 0, 0, font('PF', 900, 108), C.red, 'center', cl(ms * 3)); X.restore(); }
  X.restore();
  // chart: price climbs, "rekod tertinggi" flags, "terendah?" never
  const cp = P(lt, 2.9, 6.2);
  if (cp > 0) {
    const x0 = 110, x1 = 970, y0 = 1460, e = E.io3(cp), fy = u => y0 - 40 - Math.pow(u, 1.6) * 520 - Math.sin(u * 20) * 18 * (1 - u * .3);
    X.save(); rr(70, 800, 940, 760, 30); X.fillStyle = 'rgba(255,255,255,.55)'; X.fill(); X.restore();
    txt('HARGA EMAS (ILUSTRASI)', x0, 870, font('MO', 700, 24), 'rgba(7,21,43,.6)', 'left', 1, 4);
    X.strokeStyle = C.navy; X.lineWidth = 9; X.lineJoin = 'round'; X.lineCap = 'round';
    X.beginPath(); let px, py; for (let i = 0; i <= 80 * e; i++) { const u = i / 80; px = lerp(x0, x1, u); py = fy(u); i ? X.lineTo(px, py) : X.moveTo(px, py); } X.stroke();
    X.fillStyle = C.red; X.beginPath(); X.arc(px, py, 14, 0, 7); X.fill();
    [.22, .42, .6, .78, .95].forEach((u, i) => {
      if (e < u) return; const fp = E.oB(P(lt, 2.9 + u * 3.3, 3.2 + u * 3.3)), fx = lerp(x0, x1, u), yy = fy(u);
      X.save(); X.translate(fx, yy - 30); X.scale(fp, fp); X.fillStyle = C.navy; X.fillRect(-2, -80, 4, 80);
      rr(-6, -128, 176, 50, 8); X.fillStyle = C.red; X.fill(); txt('REKOD!', 82, -94, font('IN', 900, 28), '#fff'); X.restore();
    });
    const lo = P(lt, 5.4, 5.8);
    if (lo > 0) { X.save(); X.globalAlpha = lo; X.setLineDash([10, 12]); X.strokeStyle = 'rgba(7,21,43,.5)'; X.lineWidth = 4; X.beginPath(); X.moveTo(x0, y0 + 20); X.lineTo(x1, y0 + 20); X.stroke(); X.restore(); txt('“Terendah dalam sejarah?” — tak pernah dengar.', 540, y0 + 70, font('IN', 800, 34), C.navy, 'center', lo); }
  }
  lines(['Harga tinggi hari ini akan dianggap', 'murah beberapa tahun akan datang.'], 540, 1650, 64, lt, 6.3, font('IN', 800, 50), 50, C.navy, 'center', .008, .2);
  txt('— FB Mohd Zulkifli Shafie, 17 Jul 2024', 540, 1790, font('IN', 500, 32), 'rgba(7,21,43,.65)', 'center', E.o3(P(lt, 7.2, 7.6)));
}

// ---------- S9: jadi yang tersenyum (full-bleed footage) ----------
function s9(t) {
  const lt = t - 67, s = 49 + lt;
  const zoom = lt > 5.6 ? lerp(1, 1.35, E.io3(P(lt, 5.6, 6.6))) : 1;
  foot(s, 0, 0, W, H, { zoom, fx: .52, fy: .4 });
  X.fillStyle = 'rgba(7,21,43,.12)'; X.fillRect(0, 0, W, H);
  bottomShade(.95, 980);
  // card-to-camera moment: viewfinder
  const vf = P(lt, 1.2, 1.5) * (1 - P(lt, 2.6, 2.9)); brackets(110, 620, 860, 560, vf, C.y, 80);
  // title
  txt('NASIHAT GURU EMAS SAYA', 540, 1230, font('MO', 700, 30), C.y, 'center', E.o3(P(lt, .2, .5)) * (1 - P(lt, 2.8, 3.0)), 6);
  X.save(); X.globalAlpha = 1 - P(lt, 2.8, 3.0);
  lines(['Jangan buang masa', 'monitor harga emas.'], 540, 1360, 100, lt, .4, font('PF', 900, 92), 92, '#fff', 'center', .015, .2);
  const st = E.o3(P(lt, 1.6, 1.9)); if (st > 0) { X.strokeStyle = C.red; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(150, 1440); X.lineTo(150 + 780 * st, 1432); X.stroke(); }
  txt('Lepas 10 tahun, yang penting: konsisten tambah kepingan.', 540, 1560, font('IN', 800, 40), C.y, 'center', E.o3(P(lt, 2.0, 2.3)));
  X.restore();
  if (lt > 2.9) {
    reveal('Jadi yang', 540, 1350, font('PF', 900, 96), 96, '#fff', lt, 3.0, .03);
    reveal('tersenyum,', 540, 1510, font('PF', 700, 170, true), 170, gold, lt, 3.3, .04);
    reveal('bukan yang menyesal.', 540, 1630, font('PF', 900, 80), 80, '#fff', lt, 3.7, .02);
    shine('tersenyum,', 540, 1510, font('PF', 700, 170, true), P(lt, 4.6, 5.3));
  }
  // 10-year counter badge
  const bp = E.oB(P(lt, 2.0, 2.4));
  if (bp > 0) { X.save(); X.translate(880, 260); X.scale(bp, bp); X.beginPath(); X.arc(0, 0, 110, 0, 7); X.fillStyle = C.y; X.fill(); txt(String(Math.round(10 * E.o3(P(lt, 2.0, 3.2)))), 0, 26, font('IN', 900, 96), C.navy); txt('TAHUN', 0, 70, font('MO', 700, 22), C.navy, 'center', 1, 4); X.restore(); }
  // the tiny gold piece
  const gp = P(lt, 6.2, 6.6); if (gp > 0) { brackets(470, 560, 260, 200, gp, C.y, 40); tag('999.9 EMAS', 600, 520, C.y, C.navy, gp); }
}

// ---------- S10: masalah vs penyelesaian ----------
function s10(t) {
  const lt = t - 74, half = lt < 3.3;
  if (half) {
    X.fillStyle = '#1a0509'; X.fillRect(0, 0, W, H);
    tag('✗  MASALAH', 540, 260, C.red, '#fff', P(lt, .05, .35), font('IN', 900, 34), 80);
    const words = ['SIMPAN,', 'KOREK,', 'SIMPAN,', 'KOREK!'];
    words.forEach((w, i) => { const p = P(lt, .35 + i * .5, .6 + i * .5); if (p <= 0) return; const s = lerp(1.8, 1, E.oX(p)); X.save(); X.translate(540, 470 + i * 150); X.scale(s, s); txt(w, 0, 0, font('IN', 900, 140), i % 2 ? C.red : '#fff', 'center', cl(p * 3)); X.restore(); });
    // bank balance bouncing
    const bp = P(lt, .5, 3.2), bal = 1200 + Math.sin(lt * Math.PI * 2) * 900 * (1 - bp * .3) - bp * 600;
    X.save(); X.globalAlpha = E.o3(P(lt, .4, .7)); rr(140, 1140, 800, 330, 30); X.fillStyle = 'rgba(255,255,255,.08)'; X.fill();
    txt('BAKI AKAUN BANK', 200, 1210, font('MO', 700, 26), 'rgba(255,255,255,.6)', 'left', 1, 4);
    txt('RM ' + Math.max(0, Math.round(bal)).toLocaleString('en'), 200, 1330, font('IN', 900, 110), lt > 2.5 ? C.red : '#fff', 'left');
    X.fillStyle = C.red; X.fillRect(200, 1390, 680 * cl(bal / 2400), 24); X.restore();
    txt('Akhirnya simpanan tak ke mana.', 540, 1620, font('PF', 700, 66, true), '#ff8a80', 'center', E.o3(P(lt, 2.4, 2.8)));
  } else {
    const l2 = lt - 3.3; navyBg(t);
    tag('✓  PENYELESAIAN', 540, 260, '#22c55e', '#fff', P(l2, 0, .3), font('IN', 900, 34), 80);
    lines(['Bila nampak gram,', 'kita sayang nak jual.'], 540, 470, 110, l2, .2, font('PF', 900, 96), 96, '#fff', 'center', .015, .2);
    for (let i = 0; i < 7; i++) { const p = E.oB(P(l2, .8 + i * .25, 1.1 + i * .25)); goldBar(540 + (i % 2 ? 14 : -14), 1300 - i * 60 - (1 - p) * 300, 380, 86, 0, cl(p * 3), i === 6 ? '999.9' : ''); }
    // lock around the stack
    const lk = E.oB(P(l2, 2.6, 3.0)); if (lk > 0) { X.save(); X.translate(830, 1000); X.scale(lk, lk); X.strokeStyle = C.y; X.lineWidth = 12; X.beginPath(); X.arc(0, -40, 40, Math.PI, 0); X.stroke(); rr(-60, -40, 120, 100, 16); X.fillStyle = C.y; X.fill(); X.restore(); }
    txt('Tak dijual, melainkan benar-benar mendesak.', 540, 1520, font('IN', 800, 42), C.y, 'center', E.o3(P(l2, 2.2, 2.6)));
  }
  if (lt > 3.3) flash((1 - P(lt, 3.3, 3.55)) * .5, '#fff8d6');
}

// ---------- S11: akaun GAP ----------
function s11(t) {
  const lt = t - 81; yelBg(t);
  txt('GOLD ACCUMULATION PROGRAM', 540, 230, font('MO', 700, 30), C.navy, 'center', E.o3(P(lt, .05, .35)), 6);
  lines(['Macam akaun bank,', 'tapi paparkan gram.'], 540, 400, 100, lt, .2, font('PF', 900, 92), 92, C.navy, 'center', .015, .18);
  // flip card: RM -> gram
  const fl = P(lt, 1.6, 2.2), sx = Math.abs(Math.cos(fl * Math.PI)), back = fl > .5;
  X.save(); X.translate(540, 840); X.scale(Math.max(.02, sx) * E.oB(P(lt, .6, 1.1)), E.oB(P(lt, .6, 1.1)));
  X.save(); X.filter = 'blur(24px)'; X.fillStyle = 'rgba(0,0,0,.35)'; rr(-380, -160, 780, 340, 34); X.fill(); X.restore();
  rr(-390, -180, 780, 360, 34); X.fillStyle = back ? C.navy : '#fff'; X.fill();
  if (!back) { txt('AKAUN BANK', -330, -100, font('MO', 700, 26), C.muted, 'left', 1, 4); txt('RM 100.00', -330, 40, font('IN', 900, 120), C.navy, 'left'); txt('baki dalam duit', -330, 120, font('IN', 500, 34), C.muted, 'left'); }
  else { txt('AKAUN GAP', -330, -100, font('MO', 700, 26), C.y, 'left', 1, 4); txt('gram emas', -330, 40, font('PF', 700, 96, true), gold(-330, -60, 200, 40), 'left'); txt('ikut harga semasa', -330, 120, font('IN', 500, 34), 'rgba(255,255,255,.7)', 'left'); goldBar(280, -20, 150, 76, -.1, 1, ''); }
  X.restore();
  // footage freeze of the gold piece
  const pp = E.oB(P(lt, 2.2, 2.8));
  photoPrint((x, y, w, h) => foot(55.8, x, y, w, h, { fy: .38, zoom: 1.4 }), 300, lerp(2100, 1360, pp), 340, 340, -.08, cl(pp * 3));
  tag('MULA RM100', 760, 1260, C.navy, C.y, P(lt, 2.6, 3.0), font('IN', 900, 44), 96);
  txt('secara online', 760, 1350, font('IN', 800, 38), C.navy, 'center', E.o3(P(lt, 2.9, 3.2)));
  // callback tagline
  const cb = P(lt, 3.2, 3.6);
  txt('Simpan, Lupa, Dan Tenang.', 540, 1710, font('PF', 900, 76), C.navy, 'center', E.o3(cb));
}

// ---------- S12: CTA ----------
function heart(s) { X.beginPath(); X.moveTo(0, s * .35); X.bezierCurveTo(-s * 1.1, -s * .3, -s * .45, -s * 1.05, 0, -s * .45); X.bezierCurveTo(s * .45, -s * 1.05, s * 1.1, -s * .3, 0, s * .35); X.closePath(); }
function s12(t) {
  const lt = t - 85.5; navyBg(t, 600);
  const g = X.createRadialGradient(540, 560, 0, 540, 560, 800); g.addColorStop(0, 'rgba(255,206,50,.25)'); g.addColorStop(1, 'rgba(255,206,50,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H);
  const ap = E.oB(P(lt, .15, .6));
  if (ap > 0) { X.save(); X.translate(540, 560); X.scale(ap, ap); X.beginPath(); X.arc(0, 0, 196, 0, 7); X.fillStyle = gold(-196, -196, 196, 196); X.fill(); X.save(); X.beginPath(); X.arc(0, 0, 180, 0, 7); X.clip(); X.drawImage(IMG.taufik, -180, -180, 360, 360); X.restore(); X.restore(); }
  reveal('@taufik.pg', 540, 900, font('IN', 900, 120), 120, '#fff', lt, .4, .035);
  const B = [['LIKE', .7, 1.4], ['SHARE', .8, 1.9], ['FOLLOW', .9, 2.4]];
  B.forEach(([lab, tin, tap], i) => {
    const p = E.oB(P(lt, tin, tin + .4)); if (p <= 0) return;
    const x = 540 + (i - 1) * 320, y = 1180, done = lt > tap, press = 1 - .1 * Math.sin(P(lt, tap - .05, tap + .2) * Math.PI);
    X.save(); X.translate(x, y); X.scale(p * press, p * press);
    rr(-145, -110, 290, 220, 40); X.fillStyle = done ? (i === 2 ? C.y : '#fff') : 'rgba(255,255,255,.1)'; X.fill(); X.strokeStyle = C.y; X.lineWidth = 4; X.stroke();
    const ic = done ? (i === 0 ? C.red : C.navy) : '#fff';
    X.save(); X.translate(0, -30);
    if (i === 0) { heart(52); if (done) { X.fillStyle = ic; X.fill(); } else { X.strokeStyle = ic; X.lineWidth = 7; X.stroke(); } }
    if (i === 1) { X.strokeStyle = ic; X.lineWidth = 8; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath(); X.moveTo(-34, 30); X.quadraticCurveTo(-30, -20, 22, -20); X.stroke(); X.beginPath(); X.moveTo(8, -40); X.lineTo(32, -20); X.lineTo(8, 0); X.stroke(); }
    if (i === 2) { X.strokeStyle = ic; X.lineWidth = 8; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath(); if (done) { X.moveTo(-26, 0); X.lineTo(-6, 20); X.lineTo(28, -22); } else { X.moveTo(-28, 0); X.lineTo(28, 0); X.moveTo(0, -28); X.lineTo(0, 28); } X.stroke(); }
    X.restore();
    txt(i === 2 && done ? 'FOLLOWED' : lab, 0, 72, font('IN', 900, 36), done ? C.navy : '#fff', 'center', 1, 2);
    X.restore();
    const bp = P(lt, tap, tap + .5);
    if (bp > 0 && bp < 1) for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2, r = 120 + 110 * E.o3(bp); X.fillStyle = i === 0 ? `rgba(239,68,68,${1 - bp})` : `rgba(255,206,50,${1 - bp})`; X.beginPath(); X.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, 12 * (1 - bp) + 2, 0, 7); X.fill(); }
  });
  const fp = E.o3(P(lt, 2.7, 3.1));
  txt('Like | Share | Follow', 540, 1480 + (1 - fp) * 30, font('IN', 900, 74), '#fff', 'center', fp);
  txt('@taufik.pg', 540, 1600 + (1 - fp) * 30, font('IN', 900, 96), gold(300, 1520, 780, 1610), 'center', E.o3(P(lt, 2.85, 3.25)));
  shine('@taufik.pg', 540, 1600, font('IN', 900, 96), P(lt, 3.4, 4.1));
  const ip = E.oX(P(lt, 0, .5));
  if (ip < 1) { X.save(); X.beginPath(); X.rect(0, 0, W, H); X.arc(540, 560, lerp(0, 1400, ip), 0, 7, true); X.fillStyle = C.y; X.fill('evenodd'); X.restore(); }
}

// ---------- HUD ----------
function hud(t, id) {
  const a = E.o3(P(t, .3, .8)) * (1 - P(t, 85.2, 85.5)); if (a <= 0) return;
  const yel = id === 's8' || id === 's11';
  X.save(); X.globalAlpha = a;
  X.save(); X.font = font('IN', 800, 32); const w = X.measureText('@taufik.pg').width; X.restore();
  rr(56, 64, w + 70, 60, 30); X.fillStyle = yel ? 'rgba(7,21,43,.9)' : 'rgba(7,21,43,.55)'; X.fill();
  X.beginPath(); X.arc(88, 94, 10, 0, 7); X.fillStyle = C.y; X.fill();
  txt('@taufik.pg', 108, 105, font('IN', 800, 32), '#fff', 'left');
  if (CHAP[id]) txt(CHAP[id], W - 70, 106, font('MO', 700, 26), yel ? C.navy : '#fff', 'right', 1, 4);
  X.fillStyle = yel ? C.navy : C.y; X.fillRect(70, H - 70, (W - 140) * (t / DUR), 5);
  X.globalAlpha *= .3; X.fillRect(70, H - 70, W - 140, 5);
  X.restore();
}

// ---------- compositor ----------
const SCN = { s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12 };
const HITS = [[.1, .6], [2.3, .9], [3.9, .6], [7.5, .5], [14.45, .7], [16.2, .6], [23.0, .8], [34.35, .9], [55.3, .4], [59.2, .7], [74.35, .5], [74.85, .5], [75.35, .5], [75.85, .6], [77.3, .6], [85.5, .6]];
function impact(t) { let k = 0; for (const [h, a] of HITS) if (t >= h) k = Math.max(k, a * Math.exp(-(t - h) * 7)); return k; }
function wipe(p, col) {
  if (p <= 0) return; const e = E.ioX(p); X.save(); X.transform(1, 0, -.35, 1, 0, 0);
  X.fillStyle = col === C.y ? C.navy : C.y; X.fillRect(lerp(-1700, 900, e) + 360, 0, 2200, H);
  X.fillStyle = col; X.fillRect(lerp(-1700, 900, e) + 320, 0, 2200, H); X.fillRect(lerp(-1700, 900, e) - 1500, 0, 1900, H); X.restore();
}
const WIPES = { s3: C.navy, s5: C.navy, s6: C.navy, s7: C.navy, s8: C.y, s9: C.navy, s10: '#1a0509', s11: C.y }; // wipe colour into each scene
function frame(t) {
  X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.filter = 'none';
  let i = SEG.findIndex(s => t >= s[1] && t < s[2]); if (i < 0) i = SEG.length - 1;
  const [id, , s1e] = SEG[i];
  const k = impact(t), shx = Math.sin(t * 91) * 20 * k, shy = Math.cos(t * 83) * 18 * k, pu = 1 + .04 * k;
  X.save(); X.translate(540 + shx, 960 + shy); X.scale(pu, pu); X.translate(-540, -960);
  SCN[id](t);
  const nx = SEG[i + 1];
  if (nx && WIPES[nx[0]]) wipe(P(t, s1e - .42, s1e), WIPES[nx[0]]);
  if (nx && nx[0] === 's12') { const z = P(t, s1e - .4, s1e); if (z > 0) { X.beginPath(); X.arc(540, 960, E.i3(z) * 1300, 0, 7); X.fillStyle = C.y; X.fill(); } }
  X.restore();
  hud(t, id);
}

window.ready = Promise.all([
  ...[font('PF', 900, 40), font('PF', 700, 40, true), font('IN', 500, 40), font('IN', 800, 40), font('IN', 900, 40), font('MO', 700, 40)].map(f => document.fonts.load(f)),
  loadImg('img/taufik.jpg').then(im => IMG.taufik = im),
]).then(() => { buildNote(); buildParts(); return true; });
