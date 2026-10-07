// Dana Pendidikan Anak: 1 Bulan 1 Gram — ~96s motion piece over family footage (@taufik.pg)
const DUR = 96;
const IMG = {};
const SEG = [
  ['s1', 0, 7], ['s2', 7, 15], ['s3', 15, 22], ['s4', 22, 30], ['s5', 30, 39], ['s6', 39, 46],
  ['s7', 46, 60], ['s8', 60, 73], ['s9', 73, 81], ['s10', 81, 88], ['s11', 88, 91.5], ['s12', 91.5, 96],
];
const CHAP = { s1: 'SOALAN', s2: 'KESILAPAN', s3: 'MASALAH #1', s4: 'MASALAH #2', s5: 'HOUSEL', s6: 'CANFIELD', s7: 'PESAN GURU', s8: 'PENGAJARAN', s9: 'ANALOGI', s10: 'BEZANYA', s11: 'KESIMPULAN', s12: '' };

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

function heart(s) { X.beginPath(); X.moveTo(0, s * .35); X.bezierCurveTo(-s * 1.1, -s * .3, -s * .45, -s * 1.05, 0, -s * .45); X.bezierCurveTo(s * .45, -s * 1.05, s * 1.1, -s * .3, 0, s * .35); X.closePath(); }

// ---------- extra pieces ----------
function postCard(cx, cy, p, typed, lt) { // generic social-post card (no platform branding)
  if (p <= 0) return; const w = 900, h = 380;
  X.save(); X.translate(cx, cy); X.scale(E.oB(p), E.oB(p)); X.globalAlpha *= cl(p * 3);
  X.save(); X.filter = 'blur(30px)'; X.fillStyle = 'rgba(0,0,0,.5)'; rr(-w / 2 + 10, -h / 2 + 30, w, h, 36); X.fill(); X.restore();
  rr(-w / 2, -h / 2, w, h, 36); X.fillStyle = '#fff'; X.fill();
  X.beginPath(); X.arc(-w / 2 + 70, -h / 2 + 70, 34, 0, 7); X.fillStyle = '#d6dbe4'; X.fill();
  X.beginPath(); X.arc(-w / 2 + 70, -h / 2 + 60, 12, 0, 7); X.fillStyle = '#9aa3b2'; X.fill(); X.beginPath(); X.ellipse(-w / 2 + 70, -h / 2 + 92, 20, 12, 0, Math.PI, 0); X.fill();
  txt('follower', -w / 2 + 124, -h / 2 + 64, font('IN', 800, 32), C.navy, 'left'); txt('baru sahaja', -w / 2 + 124, -h / 2 + 100, font('IN', 500, 26), C.muted, 'left');
  const ls = wrap(typed, font('IN', 800, 44), w - 90);
  ls.forEach((l, i) => txt(l, -w / 2 + 44, -h / 2 + 180 + i * 58, font('IN', 800, 44), '#111', 'left'));
  if (Math.floor(lt * 4) % 2 === 0 && typed.length < 74) { X.save(); X.font = font('IN', 800, 44); const lw = X.measureText(ls[ls.length - 1]).width; X.restore(); X.fillStyle = '#1D63FF'; X.fillRect(-w / 2 + 48 + lw, -h / 2 + 140 + (ls.length - 1) * 58, 4, 50); }
  X.fillStyle = C.muted; [-w / 2 + 50, -w / 2 + 130, -w / 2 + 210].forEach(x => { X.beginPath(); X.arc(x, h / 2 - 40, 12, 0, 7); X.fill(); });
  X.restore();
}
function packet(x, y, s, rot, kind) { // duit raya / hadiah / tabung icons
  X.save(); X.translate(x, y); X.rotate(rot); X.scale(s, s);
  if (kind === 'raya') { rr(-60, -85, 120, 170, 10); X.fillStyle = '#0f8a4a'; X.fill(); X.fillStyle = C.y; X.beginPath(); X.arc(0, -10, 24, 0, 7); X.fill(); X.strokeStyle = C.y; X.lineWidth = 4; X.strokeRect(-48, -73, 96, 146); }
  if (kind === 'hadiah') { rr(-75, -55, 150, 120, 10); X.fillStyle = '#e74c8b'; X.fill(); X.fillStyle = C.y; X.fillRect(-12, -55, 24, 120); X.fillRect(-75, -10, 150, 20); X.beginPath(); X.ellipse(-22, -66, 24, 14, -.5, 0, 7); X.ellipse(22, -66, 24, 14, .5, 0, 7); X.fill(); }
  if (kind === 'tabung') { X.fillStyle = '#ff9fc6'; X.beginPath(); X.ellipse(0, 0, 90, 66, 0, 0, 7); X.fill(); X.fillRect(-60, 50, 22, 30); X.fillRect(38, 50, 22, 30); X.beginPath(); X.ellipse(88, -4, 18, 22, 0, 0, 7); X.fill(); X.fillStyle = C.navy; X.fillRect(-26, -64, 52, 10); X.beginPath(); X.arc(40, -16, 7, 0, 7); X.fill(); }
  X.restore();
}
function book(cx, cy, s, title, author, col, p) {
  if (p <= 0) return; X.save(); X.translate(cx, cy); X.rotate(lerp(.5, -.06, E.oB(p))); X.scale(s * E.oB(p), s * E.oB(p));
  X.save(); X.filter = 'blur(20px)'; X.fillStyle = 'rgba(0,0,0,.5)'; X.fillRect(-150, -190, 320, 420); X.restore();
  X.fillStyle = '#e8e2d4'; X.fillRect(-140, -200, 300, 410); X.fillStyle = col; X.fillRect(-160, -210, 300, 410); X.fillStyle = 'rgba(0,0,0,.25)'; X.fillRect(-160, -210, 18, 410);
  const ls = wrap(title, font('PF', 900, 40), 240); ls.forEach((l, i) => txt(l, -10, -100 + i * 46, font('PF', 900, 40), '#fff', 'center'));
  X.fillStyle = C.y; X.fillRect(-60, 70, 100, 4); txt(author.toUpperCase(), -10, 130, font('MO', 700, 18), 'rgba(255,255,255,.85)', 'center', 1, 3);
  X.restore();
}
function cap(x, y, s, rot) { // mortarboard
  X.save(); X.translate(x, y); X.rotate(rot); X.scale(s, s);
  X.fillStyle = '#111'; X.beginPath(); X.moveTo(-110, 0); X.lineTo(0, -50); X.lineTo(110, 0); X.lineTo(0, 50); X.closePath(); X.fill();
  X.beginPath(); X.moveTo(-60, 20); X.lineTo(-60, 70); X.quadraticCurveTo(0, 100, 60, 70); X.lineTo(60, 20); X.fill();
  X.strokeStyle = C.y; X.lineWidth = 6; X.beginPath(); X.moveTo(0, 0); X.lineTo(80, 20); X.lineTo(80, 80); X.stroke(); X.fillStyle = C.y; X.fillRect(70, 76, 20, 30);
  X.restore();
}
function srcAt(s) { return cl(s, 0, 76.5); }

// ---------- S1 hook: soalan follower ----------
const Q1 = 'Hi i nak tanya, saving untuk future anak better simpan/invest dekat mana eh?';
function s1(t) {
  foot(srcAt(2 + t), 0, 0, W, H, { zoom: 1.15, fy: .3 });
  X.fillStyle = `rgba(7,21,43,${lerp(.1, .55, E.o3(P(t, .8, 1.5)))})`; X.fillRect(0, 0, W, H);
  txt('LALU DI FEED THREADS SAYA HARI INI', 540, 560, font('MO', 700, 30), C.y, 'center', E.o3(P(t, .9, 1.3)), 5);
  postCard(540, 860, P(t, 1.0, 1.5), Q1.slice(0, Math.floor(P(t, 1.5, 4.2) * Q1.length)), t);
  bottomShade(.9, 1150);
  reveal('Setiap ibu bapa', 540, 1430, font('PF', 900, 96), 96, '#fff', t, 4.5, .02);
  reveal('mahukan yang terbaik.', 540, 1550, font('PF', 700, 96, true), 96, gold, t, 4.9, .02);
}

// ---------- S2 kesilapan biasa: duit anak terbiar dalam akaun bank ----------
function s2(t) {
  const lt = t - 7; navyBg(t);
  foot(srcAt(9 + lt), 160, 170, 760, 560, { r: 40, border: C.y, fy: .45 });
  tag('KESILAPAN PALING BIASA', 540, 820, C.red, '#fff', P(lt, .2, .5));
  const items = [['hadiah', 'Hadiah kelahiran'], ['raya', 'Duit raya'], ['tabung', 'Simpanan anak']];
  const bank = { x: 540, y: 1420 };
  items.forEach(([k, lab], i) => {
    const p0 = 1.0 + i * .5, ap = E.oB(P(lt, p0, p0 + .4)), fly = E.io3(P(lt, 3.6 + i * .15, 4.4 + i * .15));
    if (ap <= 0) return; const sx = 220 + i * 320, sy = 1030;
    X.save(); X.globalAlpha = 1 - P(lt, 4.2 + i * .15, 4.45 + i * .15);
    packet(lerp(sx, bank.x, fly), lerp(sy, bank.y - 40, fly), ap * lerp(.9, .4, fly), Math.sin(lt * 2 + i) * .08, k);
    txt(lab, sx, 1160, font('IN', 800, 36), '#fff', 'center', 1 - fly);
    X.restore();
  });
  // the bank account box
  const bp = E.oB(P(lt, 2.6, 3.1));
  if (bp > 0) {
    X.save(); X.translate(bank.x, bank.y); X.scale(bp, bp);
    rr(-330, -120, 660, 240, 30); X.fillStyle = '#1E3050'; X.fill(); X.strokeStyle = 'rgba(255,255,255,.35)'; X.lineWidth = 4; X.stroke();
    // bank columns icon
    X.fillStyle = '#fff'; X.beginPath(); X.moveTo(-270, -40); X.lineTo(-210, -80); X.lineTo(-150, -40); X.closePath(); X.fill(); [-260, -222, -184].forEach(x => X.fillRect(x, -30, 18, 70)); X.fillRect(-275, 44, 130, 12);
    txt('AKAUN BANK BIASA', -110, -8, font('IN', 900, 50), '#fff', 'left'); txt('terbiar bertahun-tahun', -110, 48, font('IN', 500, 34), 'rgba(255,255,255,.65)', 'left');
    X.restore();
  }
  txt('Duit anak terbiar di sini.', 540, 1720, font('PF', 700, 70, true), '#ff8a80', 'center', E.o3(P(lt, 5.0, 5.4)));
}

// ---------- S3 masalah #1: duit terpinjam ----------
function s3(t) {
  const lt = t - 15; X.fillStyle = '#1a0509'; X.fillRect(0, 0, W, H);
  tag('MASALAH #1', 540, 240, C.red, '#fff', P(lt, .05, .35), font('IN', 900, 34), 80);
  lines(['Terlalu mudah', '“terpinjam”.'], 540, 440, 120, lt, .2, font('PF', 900, 110), 110, '#fff', 'center', .02, .25);
  // balance draining into family expenses
  const bal = Math.round(lerp(5000, 640, E.io3(P(lt, 1.6, 5.4))));
  rr(190, 690, 700, 230, 30); X.fillStyle = 'rgba(255,255,255,.08)'; X.fill();
  txt('TABUNG ANAK', 250, 760, font('MO', 700, 26), 'rgba(255,255,255,.6)', 'left', 1, 4);
  txt('RM ' + bal.toLocaleString('en'), 250, 870, font('IN', 900, 100), bal < 2000 ? C.red : '#fff', 'left');
  const drains = [['Bil elektrik', 2.0], ['Barang dapur', 2.8], ['Ansuran kereta', 3.6], ['Yuran tadika', 4.4]];
  drains.forEach(([lab, t0], i) => {
    const p = P(lt, t0, t0 + 1.0); if (p <= 0) return;
    const x = 200 + (i % 2) * 400, y = 1150 + Math.floor(i / 2) * 200;
    // coin drops from the balance card to the expense chip
    if (p < .6) { const q = E.i3(p / .6); X.beginPath(); X.arc(lerp(540, x + 160, q), lerp(930, y - 20, q), 26, 0, 7); X.fillStyle = gold(0, 900, 0, 960); X.fill(); }
    const cp = E.oB(P(lt, t0 + .5, t0 + .85)); if (cp <= 0) return;
    X.save(); X.translate(x + 160, y + 40); X.scale(cp, cp); rr(-180, -60, 360, 120, 24); X.fillStyle = 'rgba(239,68,68,.25)'; X.fill(); X.strokeStyle = C.red; X.lineWidth = 3; X.stroke();
    txt(lab, 0, 12, font('IN', 800, 38), '#fff'); X.restore();
  });
  txt('“Pinjam sekejap” jadi tak berganti.', 540, 1660, font('IN', 800, 44), '#ff8a80', 'center', E.o3(P(lt, 5.4, 5.8)));
}

// ---------- S4 masalah #2: inflasi kos pendidikan ----------
function s4(t) {
  const lt = t - 22; navyBg(t);
  foot(srcAt(22 + lt), 700, 160, 320, 420, { r: 30, border: C.y });
  tag('MASALAH #2', 290, 230, C.red, '#fff', P(lt, .05, .35), font('IN', 900, 34), 80);
  lines(['Inflasi makan', 'kuasa beli.'], 90, 420, 104, lt, .2, font('PF', 900, 96), 96, '#fff', 'left', .02, .2);
  // two bars: yuran hari ini vs 18 tahun lagi + shrinking note
  const gp = E.io3(P(lt, 1.6, 4.0));
  const base = 1380;
  X.fillStyle = 'rgba(255,255,255,.25)'; X.fillRect(120, base, 840, 4);
  const bar = (x, h, col, lab, sub) => { rr(x, base - h, 260, h, 18); X.fillStyle = col; X.fill(); txt(lab, x + 130, base + 60, font('IN', 800, 38), '#fff'); txt(sub, x + 130, base + 105, font('MO', 700, 24), 'rgba(255,255,255,.6)', 'center', 1, 3); };
  if (lt > 1.4) {
    bar(170, 220 * E.oB(P(lt, 1.4, 1.9)), '#3A74CC', 'Yuran', 'HARI INI');
    bar(650, lerp(220, 600, gp) * E.oB(P(lt, 1.6, 2.1)), C.red, 'Yuran', '18 TAHUN LAGI');
    txt('× ' + lerp(1, 2, gp).toFixed(1), 780, base - lerp(220, 600, gp) - 30, font('IN', 900, 70), '#ff8a80', 'center', P(lt, 2.0, 2.3));
  }
  txt('ILUSTRASI', 120, 760, font('MO', 700, 22), 'rgba(255,255,255,.45)', 'left', P(lt, 1.6, 2), 4);
  txt('Kos pengajian & sara hidup berganda lebih mahal.', 540, 1640, font('IN', 800, 40), C.y, 'center', E.o3(P(lt, 4.2, 4.6)));
  txt('Wang tunai 15–18 tahun? Terhakis teruk.', 540, 1720, font('IN', 500, 40), 'rgba(255,255,255,.8)', 'center', E.o3(P(lt, 4.8, 5.2)));
}

// ---------- S5 Housel: time horizon + freedom & time ----------
function s5(t) {
  const lt = t - 30;
  foot(srcAt(30 + lt), 0, 0, W, H, { zoom: 1.1, fy: .5 });
  X.fillStyle = 'rgba(7,21,43,.35)'; X.fillRect(0, 0, W, H);
  const g = X.createLinearGradient(0, 0, 0, 900); g.addColorStop(0, 'rgba(7,21,43,.95)'); g.addColorStop(1, 'rgba(7,21,43,0)'); X.fillStyle = g; X.fillRect(0, 0, W, 900);
  bottomShade(.95, 1050);
  book(230, 470, .8, 'The Psychology of Money', 'Morgan Housel', '#0e7c66', P(lt, .1, .7));
  txt('CONFOUNDING COMPOUNDING', 430, 330, font('MO', 700, 24), C.y, 'left', E.o3(P(lt, .4, .7)), 3);
  lines(['Kelebihan anak', 'kecil: masa.'], 430, 430, 84, lt, .5, font('PF', 900, 76), 76, '#fff', 'left', .02, .18);
  txt('(time horizon yang sangat panjang)', 430, 610, font('IN', 500, 32), 'rgba(255,255,255,.75)', 'left', E.o3(P(lt, 1.2, 1.5)));
  // 18-year ruler
  const rp = E.io3(P(lt, 1.6, 4.4)), x0 = 100, x1 = 980, y = 1300;
  if (lt > 1.5) {
    X.strokeStyle = 'rgba(255,255,255,.4)'; X.lineWidth = 4; X.beginPath(); X.moveTo(x0, y); X.lineTo(x1, y); X.stroke();
    X.strokeStyle = C.y; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(x0, y); X.lineTo(lerp(x0, x1, rp), y); X.stroke();
    for (let a = 0; a <= 18; a++) { const x = lerp(x0, x1, a / 18), on = a / 18 <= rp; X.fillStyle = on ? C.y : 'rgba(255,255,255,.4)'; X.fillRect(x - 2, y - (a % 6 ? 14 : 26), 4, a % 6 ? 28 : 52); if (a % 6 === 0) txt(String(a), x, y + 70, font('IN', 900, 40), on ? C.y : 'rgba(255,255,255,.5)'); }
    txt('TAHUN', x1, y + 120, font('MO', 700, 24), 'rgba(255,255,255,.6)', 'right', 1, 4);
    cap(lerp(x0, x1, rp), y - 80, .45 * E.oB(P(lt, 4.2, 4.6)), -.1);
  }
  // freedom & time
  if (lt > 5.0) {
    const fp = E.oB(P(lt, 5.0, 5.4));
    txt('HADIAH TERBAIK IBU BAPA', 540, 1500, font('MO', 700, 28), C.y, 'center', E.o3(P(lt, 5.0, 5.3)), 5);
    X.save(); X.translate(540, 1620); X.scale(fp, fp); txt('Freedom & Time', 0, 0, font('PF', 700, 110, true), gold(-400, -90, 400, 0), 'center'); X.restore();
    txt('Mula dewasa tanpa hutang pinjaman pendidikan.', 540, 1730, font('IN', 800, 38), '#fff', 'center', E.o3(P(lt, 6.0, 6.4)));
  }
}

// ---------- S6 Canfield: small disciplines ----------
function s6(t) {
  const lt = t - 39; yelBg(t);
  book(240, 440, .78, 'The Success Principles', 'Jack Canfield', '#b8322a', P(lt, .1, .7));
  txt('THE POWER OF', 450, 330, font('MO', 700, 26), C.navy, 'left', E.o3(P(lt, .4, .7)), 5);
  lines(['Small', 'Disciplines.'], 450, 440, 100, lt, .5, font('PF', 900, 100), 100, C.navy, 'left', .03, .15);
  txt('Bukan puluhan ribu sekali gus.', 540, 820, font('IN', 800, 46), C.navy, 'center', E.o3(P(lt, 1.4, 1.8)));
  // 12-month grid, ticking every month
  const M = ['JAN', 'FEB', 'MAC', 'APR', 'MEI', 'JUN', 'JUL', 'OGO', 'SEP', 'OKT', 'NOV', 'DIS'];
  M.forEach((m, i) => {
    const cx = 540 + ((i % 4) - 1.5) * 220, cy = 980 + Math.floor(i / 4) * 160, p = E.oB(P(lt, 1.8 + i * .05, 2.2 + i * .05)); if (p <= 0) return;
    X.save(); X.translate(cx, cy); X.scale(p, p); rr(-95, -62, 190, 124, 18); X.fillStyle = C.navy; X.fill(); txt(m, 0, -12, font('MO', 700, 28), C.y, 'center', 1, 3); X.restore();
    tickMark(cx, cy + 28, 24, P(lt, 2.6 + i * .2, 2.85 + i * .2));
  });
  const st = P(lt, 5.4, 5.75);
  if (st > 0) { const s = lerp(2.3, 1, E.oX(st)); X.save(); X.translate(540, 1560); X.rotate(-.07); X.scale(s, s); X.globalAlpha = cl(st * 3); X.strokeStyle = C.red; X.lineWidth = 9; rr(-380, -80, 760, 160, 16); X.stroke(); txt('NO-EXCEPTIONS RULE', 0, 22, font('IN', 900, 62), C.red, 'center', 1, 2); X.restore(); }
  txt('Setiap bulan. Tanpa kompromi.', 540, 1730, font('PF', 700, 60, true), C.navy, 'center', E.o3(P(lt, 6.0, 6.4)));
}

// ---------- S7 Pesan guru: 1 bulan 1 gram ----------
function s7(t) {
  const lt = t - 46; navyBg(t, 800);
  foot(srcAt(50 + lt * .7), 0, 0, W, H, { filter: 'blur(12px) brightness(.5) saturate(.8)', zoom: 1.1 });
  X.fillStyle = 'rgba(7,21,43,.7)'; X.fillRect(0, 0, W, H);
  txt('PESAN GURU EMAS SAYA', 540, 230, font('MO', 700, 30), C.y, 'center', E.o3(P(lt, .1, .4)), 6);
  const big = 1 - E.ioX(P(lt, 3.2, 3.9));
  X.save(); X.translate(540, 560); X.scale(lerp(.55, 1, big), lerp(.55, 1, big)); X.translate(-540, -560 + lerp(-230, 0, big));
  const p1 = P(lt, .3, .65); if (p1 > 0) { const s = lerp(2.2, 1, E.oX(p1)); X.save(); X.translate(540, 520); X.scale(s, s); txt('1 Bulan', 0, 0, font('PF', 900, 170), '#fff', 'center', cl(p1 * 3)); X.restore(); }
  const p2 = P(lt, .8, 1.15); if (p2 > 0) { const s = lerp(2.2, 1, E.oX(p2)); X.save(); X.translate(540, 720); X.scale(s, s); txt('1 Gram Emas', 0, 0, font('PF', 700, 150, true), gold(-450, -120, 450, 0), 'center', cl(p2 * 3)); X.restore(); }
  shine('1 Gram Emas', 540, 720, font('PF', 700, 150, true), P(lt, 1.4, 2.1));
  txt('Tn Mohd Zulkifli Shafie · Pengasas G100 Network', 540, 840, font('IN', 500, 34), 'rgba(255,255,255,.75)', 'center', E.o3(P(lt, 1.6, 2.0)));
  X.restore();
  // 3-step plan
  const steps = [
    ['Buka Akaun GAP Junior', 'Seawal hari pertama kelahiran.', 4.0],
    ['1 gram setiap bulan', 'Umur 1 hingga 18 tahun (atau tukar duit raya ke gram).', 6.4],
    ['Kalis kenaikan yuran', 'Umur 18: sekitar 150 hingga 200 gram emas.', 9.0],
  ];
  steps.forEach(([h, s, t0], i) => {
    const p = E.oX(P(lt, t0, t0 + .5)); if (p <= 0) return;
    const y = 690 + i * 270;
    X.save(); X.globalAlpha = cl(p * 2); X.translate((1 - p) * 300, 0);
    rr(70, y, 940, 240, 28); X.fillStyle = 'rgba(255,255,255,.08)'; X.fill(); X.strokeStyle = 'rgba(255,206,50,.6)'; X.lineWidth = 3; X.stroke();
    X.beginPath(); X.arc(160, y + 120, 56, 0, 7); X.fillStyle = C.y; X.fill(); txt(String(i + 1), 160, y + 143, font('IN', 900, 64), C.navy);
    txt(h, 250, y + 105, font('IN', 900, 50), '#fff', 'left');
    wrap(s, font('IN', 500, 34), 720).forEach((l, k) => txt(l, 250, y + 160 + k * 44, font('IN', 500, 34), 'rgba(255,255,255,.75)', 'left'));
    X.restore();
  });
  // step 2 visual: age counter + gram counter
  if (lt > 7.0 && lt < 9.0) {
    const e = E.io3(P(lt, 7.0, 8.8)), age = Math.round(1 + 17 * e);
    txt(`UMUR ${age}  ·  ${Math.round(e * 204)} g`, 980, 1010, font('MO', 700, 26), C.y, 'right', 1, 3);
  }
  // step 3: grams stack + cap
  if (lt > 9.4) {
    for (let i = 0; i < 6; i++) { const p = E.oB(P(lt, 9.5 + i * .18, 9.8 + i * .18)); goldBar(860 + (i % 2 ? 8 : -8), 1760 - i * 40 - (1 - p) * 200, 220, 54, 0, cl(p * 3), ''); }
    cap(860, 1500, .55 * E.oB(P(lt, 10.7, 11.1)), -.12);
    txt('Pandangan beliau: nilai kepingan emas', 90, 1640, font('IN', 500, 32), 'rgba(255,255,255,.7)', 'left', E.o3(P(lt, 11.0, 11.4)));
    txt('cukup untuk biaya pengajian.', 90, 1690, font('IN', 800, 34), C.y, 'left', E.o3(P(lt, 11.2, 11.6)));
  }
}

// ---------- S8 tiga pengajaran ----------
const LESSONS = [
  ['Manfaatkan garis masa 18 tahun', 'Mula seawal kelahiran. Sikit-sikit dari awal jauh lebih ringan.', 58],
  ['Elak perangkap “duit terpinjam”', 'Alihkan dana anak ke aset fizikal yang terkunci selamat.', 61.5],
  ['Sasarkan gram, bukan ringgit', 'Emas fizikal jaga kuasa beli tabung pendidikan anak.', 66],
];
function s8(t) {
  const lt = t - 60; navyBg(t);
  txt('3 PENGAJARAN', 540, 230, font('MO', 700, 32), C.y, 'center', E.o3(P(lt, .05, .35)), 8);
  const k = Math.min(2, Math.floor(lt / 4.3)), l2 = lt - k * 4.3;
  const [h, s, src] = LESSONS[k];
  foot(srcAt(src + l2), 160, 300, 760, 640, { r: 40, border: C.y, fy: .5 });
  // big number flip
  const np = P(l2, 0, .35), sN = lerp(2.4, 1, E.oX(np));
  X.save(); X.translate(160, 960); X.scale(sN, sN); X.beginPath(); X.arc(0, 0, 90, 0, 7); X.fillStyle = C.y; X.fill(); txt('#' + (k + 1), 0, 30, font('PF', 900, 90), C.navy); X.restore();
  wrap(h, font('PF', 900, 84), 880).forEach((l, i) => reveal(l, 90, 1180 + i * 96, font('PF', 900, 84), 84, '#fff', l2, .3 + i * .15, .015, .45, 'left'));
  wrap(s, font('IN', 500, 44), 900).forEach((l, i) => txt(l, 90, 1440 + i * 58, font('IN', 500, 44), 'rgba(255,255,255,.8)', 'left', E.o3(P(l2, 1.0 + i * .15, 1.4 + i * .15))));
  // lesson-specific accent
  if (k === 1) { const lk = E.oB(P(l2, 1.4, 1.8)); if (lk > 0) { X.save(); X.translate(880, 980); X.scale(lk, lk); X.strokeStyle = C.y; X.lineWidth = 12; X.beginPath(); X.arc(0, -40, 40, Math.PI, 0); X.stroke(); rr(-60, -40, 120, 100, 16); X.fillStyle = C.y; X.fill(); X.restore(); } }
  if (k === 2) { const gp = E.oB(P(l2, 1.4, 1.8)); if (gp > 0) { goldBar(860, 980, 260 * gp, 100 * gp, -.08, 1, 'gram'); } }
  if (k === 0) { txt('0 → 18', 880, 1000, font('IN', 900, 70), C.y, 'center', E.o3(P(l2, 1.4, 1.8))); }
  if (l2 > 3.95 && k < 2) flash((P(l2, 3.95, 4.3)) * .25, '#fff8d6');
}

// ---------- S9 analogi: botol bocor vs perigi ----------
function s9(t) {
  const lt = t - 73; yelBg(t);
  txt('ANALOGI', 540, 230, font('MO', 700, 32), C.navy, 'center', E.o3(P(lt, .05, .35)), 8);
  const prog = E.io3(P(lt, 1.2, 5.2)), yrs = Math.round(18 * prog);
  // bottle (left)
  const bx = 300, by = 1000, bp = E.oB(P(lt, .3, .8));
  if (bp > 0) {
    X.save(); X.translate(bx, by); X.scale(bp, bp);
    X.save(); X.beginPath(); X.roundRect(-110, -240, 220, 480, 50); X.clip();
    const lvl = lerp(420, 60, prog); X.fillStyle = 'rgba(58,116,204,.85)'; X.fillRect(-110, 240 - lvl, 220, lvl + 10); X.restore();
    X.strokeStyle = C.navy; X.lineWidth = 10; X.beginPath(); X.roundRect(-110, -240, 220, 480, 50); X.stroke(); X.fillStyle = C.navy; X.fillRect(-45, -300, 90, 60);
    for (let i = 0; i < 3; i++) { const ph = (lt * 1.6 + i * .33) % 1; X.fillStyle = `rgba(58,116,204,${1 - ph})`; X.beginPath(); X.arc(80, 200 + ph * 260, 12, 0, 7); X.fill(); }
    X.restore();
    txt('Tunai di bank', bx, 1340, font('IN', 900, 46), C.navy); txt('bocor halus', bx, 1395, font('PF', 700, 46, true), C.red);
  }
  // well (right)
  const wx = 780, wp = E.oB(P(lt, .6, 1.1));
  if (wp > 0) {
    X.save(); X.translate(wx, 1060); X.scale(wp, wp);
    X.fillStyle = C.navy; X.fillRect(-150, -60, 300, 220); X.fillStyle = 'rgba(255,255,255,.2)'; for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) X.fillRect(-140 + c * 75 + (r % 2) * 30, -50 + r * 55, 60, 40);
    X.fillStyle = C.navy; X.fillRect(-140, -330, 18, 280); X.fillRect(122, -330, 18, 280); X.beginPath(); X.moveTo(-180, -320); X.lineTo(0, -420); X.lineTo(180, -320); X.closePath(); X.fill();
    X.save(); X.beginPath(); X.rect(-120, -70, 240, 30); X.clip(); X.fillStyle = gold(-120, -70, 120, -40); X.fillRect(-120, -70 + Math.sin(lt * 3) * 3, 240, 40); X.restore();
    sparkle(60, -100, 26 * (.5 + .5 * Math.sin(lt * 4)), 1);
    X.restore();
    txt('Emas', wx, 1340, font('IN', 900, 46), C.navy); txt('perigi kekal', wx, 1395, font('PF', 700, 46, true), '#0f7a3a');
  }
  txt('Perjalanan ' + yrs + ' tahun', 540, 600, font('IN', 900, 64), C.navy, 'center', E.o3(P(lt, 1.0, 1.3)));
  X.fillStyle = 'rgba(7,21,43,.2)'; X.fillRect(140, 640, 800, 10); X.fillStyle = C.navy; X.fillRect(140, 640, 800 * prog, 10);
  // duit raya RM500 example
  const rp = E.o3(P(lt, 5.4, 5.8));
  if (rp > 0) {
    X.save(); X.globalAlpha = rp; rr(90, 1500, 900, 250, 30); X.fillStyle = C.navy; X.fill(); X.restore();
    txt('Duit raya RM500 hari ini', 540, 1580, font('IN', 800, 44), '#fff', 'center', rp);
    txt('≈ separuh kuasa beli, 15 tahun lagi', 540, 1650, font('IN', 900, 46), '#ff8a80', 'center', E.o3(P(lt, 5.8, 6.2)));
    txt('jika dibiarkan dalam bentuk tunai (anggaran)', 540, 1705, font('IN', 500, 30), 'rgba(255,255,255,.6)', 'center', E.o3(P(lt, 6.0, 6.4)));
  }
}

// ---------- S10 menara gading (full-bleed running) ----------
function s10(t) {
  const lt = t - 81;
  foot(srcAt(66.5 + lt), 0, 0, W, H, { zoom: lerp(1.05, 1.2, lt / 7), fy: .5 });
  X.fillStyle = 'rgba(7,21,43,.15)'; X.fillRect(0, 0, W, H);
  const g = X.createLinearGradient(0, 0, 0, 760); g.addColorStop(0, 'rgba(7,21,43,.95)'); g.addColorStop(1, 'rgba(7,21,43,0)'); X.fillStyle = g; X.fillRect(0, 0, W, 760);
  bottomShade(.9, 1150);
  txt('BEZANYA... EMAS?', 540, 260, font('MO', 700, 34), C.y, 'center', E.o3(P(lt, .1, .4)), 8);
  lines(['Duit raya & simpanan', 'jadi gram emas fizikal.'], 540, 380, 84, lt, .3, font('PF', 900, 72), 72, '#fff', 'center', .015, .2);
  txt('Akaun GAP Junior · kunci nilai sebenar', 540, 580, font('IN', 800, 40), C.y, 'center', E.o3(P(lt, 1.2, 1.6)));
  reveal('Melangkah ke', 540, 1450, font('PF', 900, 100), 100, '#fff', lt, 2.2, .025);
  reveal('menara gading', 540, 1590, font('PF', 700, 130, true), 130, gold, lt, 2.5, .03);
  txt('dengan yakin, tanpa beban pinjaman pelajaran.', 540, 1690, font('IN', 800, 40), '#fff', 'center', E.o3(P(lt, 3.4, 3.8)));
  const cp = E.oB(P(lt, 3.0, 3.5)); if (cp > 0) cap(540, lerp(-200, 1060, cp) + Math.sin(lt * 2) * 10, .9, Math.sin(lt * 1.5) * .1);
  shine('menara gading', 540, 1590, font('PF', 700, 130, true), P(lt, 4.5, 5.3));
}

// ---------- S11 kesimpulan ----------
function s11(t) {
  const lt = t - 88;
  foot(srcAt(73.5 + lt * .6), 0, 0, W, H, { filter: 'blur(10px) brightness(.55)', zoom: 1.15 });
  X.fillStyle = 'rgba(7,21,43,.65)'; X.fillRect(0, 0, W, H);
  tag('KESIMPULAN', 540, 400, C.y, C.navy, P(lt, .05, .35));
  lines(['Hadiahkan', 'masa depan'], 540, 640, 130, lt, .3, font('PF', 900, 120), 120, '#fff', 'center', .03, .2);
  reveal('bebas hutang.', 540, 920, font('PF', 700, 150, true), 150, gold, lt, .8, .04);
  shine('bebas hutang.', 540, 920, font('PF', 700, 150, true), P(lt, 1.8, 2.6));
  txt('Mulakan tabung emas anak', 540, 1180, font('IN', 800, 54), '#fff', 'center', E.o3(P(lt, 1.6, 2.0)));
  txt('bermula hari ini.', 540, 1260, font('IN', 900, 64), C.y, 'center', E.o3(P(lt, 1.9, 2.3)));
  for (let i = 0; i < 5; i++) { const p = E.oB(P(lt, 2.0 + i * .12, 2.3 + i * .12)); goldBar(540 + (i % 2 ? 10 : -10), 1620 - i * 46 - (1 - p) * 200, 300, 64, 0, cl(p * 3), i === 4 ? '999.9' : ''); }
}

// ---------- S12 CTA ----------
function s12(t) {
  const lt = t - 91.5; navyBg(t, 600);
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

// ---------- HUD + compositor ----------
function hud(t, id) {
  const a = E.o3(P(t, .3, .8)) * (1 - P(t, 91.2, 91.5)); if (a <= 0) return;
  const yel = id === 's6' || id === 's9';
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
const SCN = { s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12 };
const HITS = [[1.0, .5], [7, .5], [15, .7], [16.0, .4], [22, .6], [30, .5], [39, .5], [46.3, .8], [46.8, .8], [60, .5], [64.3, .4], [68.6, .4], [73, .5], [81, .5], [84.0, .5], [88, .5], [91.5, .6]];
function impact(t) { let k = 0; for (const [h, a] of HITS) if (t >= h) k = Math.max(k, a * Math.exp(-(t - h) * 7)); return k; }
function wipe(p, col) {
  if (p <= 0) return; const e = E.ioX(p); X.save(); X.transform(1, 0, -.35, 1, 0, 0);
  X.fillStyle = col === C.y ? C.navy : C.y; X.fillRect(lerp(-1700, 900, e) + 360, 0, 2200, H);
  X.fillStyle = col; X.fillRect(lerp(-1700, 900, e) + 320, 0, 2200, H); X.fillRect(lerp(-1700, 900, e) - 1500, 0, 1900, H); X.restore();
}
const WIPES = { s2: C.navy, s3: '#1a0509', s4: C.navy, s6: C.y, s7: C.navy, s8: C.navy, s9: C.y };
function frame(t) {
  X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.filter = 'none';
  let i = SEG.findIndex(s => t >= s[1] && t < s[2]); if (i < 0) i = SEG.length - 1;
  const [id, , e1] = SEG[i];
  const k = impact(t), shx = Math.sin(t * 91) * 20 * k, shy = Math.cos(t * 83) * 18 * k, pu = 1 + .04 * k;
  X.save(); X.translate(540 + shx, 960 + shy); X.scale(pu, pu); X.translate(-540, -960);
  X.fillStyle = '#000'; X.fillRect(0, 0, W, H);
  SCN[id](t);
  const nx = SEG[i + 1];
  if (nx && WIPES[nx[0]]) wipe(P(t, e1 - .42, e1), WIPES[nx[0]]);
  else if (nx && nx[0] !== 's12') flash(P(t, e1 - .25, e1) * .9, '#fff8d6'); // light-leak cut into footage scenes
  if (nx && nx[0] === 's12') { const z = P(t, e1 - .4, e1); if (z > 0) { X.beginPath(); X.arc(540, 960, E.i3(z) * 1300, 0, 7); X.fillStyle = C.y; X.fill(); } }
  if (['s5', 's10', 's11'].includes(id)) flash((1 - P(t, SEG[i][1], SEG[i][1] + .3)) * .9, '#fff8d6');
  X.restore();
  hud(t, id);
}

window.ready = Promise.all([
  ...[font('PF', 900, 40), font('PF', 700, 40, true), font('IN', 500, 40), font('IN', 800, 40), font('IN', 900, 40), font('MO', 700, 40)].map(f => document.fonts.load(f)),
  loadImg('img/taufik.jpg').then(im => IMG.taufik = im),
]).then(() => true);
