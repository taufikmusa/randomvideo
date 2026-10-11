// run.js — transisi KERTAS TERKOYAK, hud, render(t), ready. JANGAN EDIT per video. Tiada muzik; SFX hanya jika projek ada sfx.py.
buildCaps();
const BK = .885, FIRE_PRE = .25, FIRE_POST = .35;   // B-roll dimampatkan (BK) supaya kandungan tak masuk zon kapsyen (y≈1390)
function sceneAt(t) { return SCENES.find(s => t >= s.a && t < s.b) || SCENES[SCENES.length - 1]; }
function drawScene(s, t) {
  const lt = Math.max(0, t - s.a), d = s.b - s.a;
  if (s.k === 'H') { head(lt, d, s.dir); s.ov(lt, d); return; }
  const c = BGS[s.bg]; if (c.width > W) { const p = lt / d - .5; X.drawImage(c, -110 - p * 50, -195 - p * 40); } else X.drawImage(c, 0, 0);
  X.save(); X.translate(540, 110); X.scale(BK, BK); X.translate(-540, -110); s.draw(lt, d); X.restore();
}
// ---- transisi KERTAS TERKOYAK: adegan lama koyak ikut garis bergerigi (hinge di kanan), dua kepingan terbuka & terbang keluar, dedah adegan baru ----
const TEAR_PRE = .2, TEAR_POST = .35, TEARS = {};
function mkCanvas() { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; }
const TC_A = mkCanvas(), TC_P = mkCanvas();
function tearLine(seed) {
  if (TEARS[seed]) return TEARS[seed]; const R = rng(seed * 13 + 5), pts = []; let j = 0, base = H * (.42 + R() * .16);
  for (let x = -40; x <= W + 40; x += 7) { j = (j + (R() - .5) * 16) * .9; pts.push([x, base + (x - W / 2) * .05 * (R() > .5 ? 1 : -1) + Math.sin(x * .011 + seed) * 36 + Math.sin(x * .043 + seed * 2) * 9 + j]); }
  return TEARS[seed] = pts;
}
function drawTear(oldS, newS, t, p, seed) {
  drawScene(newS, t);
  const keep = X, ca = TC_A.getContext('2d'); ca.clearRect(0, 0, W, H); X = ca; drawScene(oldS, t); X = keep;
  const L = tearLine(seed), hy = L[Math.floor(L.length / 2)][1], ease = q => q * q, th = .36 * ease(clamp(p / .75)), sl = H * .8 * Math.pow(clamp((p - .12) / .88), 2);
  [['top', -1], ['bot', 1]].forEach(([k, dir]) => {
    const cp = TC_P.getContext('2d'); cp.setTransform(1, 0, 0, 1, 0, 0); cp.clearRect(0, 0, W, H); cp.save(); cp.beginPath();
    if (k === 'top') { cp.moveTo(-60, -60); cp.lineTo(W + 60, -60); for (let i = L.length - 1; i >= 0; i--) cp.lineTo(L[i][0], L[i][1]); }
    else { L.forEach(([x, y], i) => i ? cp.lineTo(x, y) : cp.moveTo(x, y)); cp.lineTo(W + 60, H + 60); cp.lineTo(-60, H + 60); }
    cp.closePath(); cp.clip(); cp.drawImage(TC_A, 0, 0);
    cp.lineJoin = 'round'; cp.beginPath(); L.forEach(([x, y], i) => i ? cp.lineTo(x, y) : cp.moveTo(x, y)); cp.strokeStyle = '#fbf7ef'; cp.lineWidth = 26; cp.stroke();   // tepi kertas putih
    cp.beginPath(); L.forEach(([x, y], i) => { const yy = y + dir * 12 + Math.sin(i * 1.7) * 3; i ? cp.lineTo(x, yy) : cp.moveTo(x, yy); }); cp.strokeStyle = 'rgba(220,208,185,.8)'; cp.lineWidth = 5; cp.stroke(); cp.restore();   // serat
    X.save(); X.translate(W, hy); X.rotate(dir * th); X.translate(-W, -hy); X.translate(0, dir * sl); X.filter = 'drop-shadow(0px ' + (dir * 10) + 'px 16px rgba(0,0,0,.55))'; X.drawImage(TC_P, 0, 0); X.restore();
  });
}
function hud(t) {
  X.fillStyle = CK.gold; X.fillRect(0, 0, W * t / DUR, 8);
  X.save(); rr(40, 44, 250, 54, 27); X.fillStyle = 'rgba(0,0,0,.55)'; X.fill(); X.beginPath(); X.arc(70, 71, 9, 0, 7); X.fillStyle = CK.gold; X.fill(); X.restore();
  MA.txt('@taufik.pg', 88, 82, MA.F.b(26), '#fff');
}
window.render = t => {
  X.clearRect(0, 0, W, H);
  let tr = null; for (let k = 1; k < SCENES.length; k++) { const T = SCENES[k].a; if (t >= T - TEAR_PRE && t < T + TEAR_POST) { tr = { k, p: (t - (T - TEAR_PRE)) / (TEAR_PRE + TEAR_POST) }; break; } }
  if (!tr) drawScene(sceneAt(t), t); else drawTear(SCENES[tr.k - 1], SCENES[tr.k], t, tr.p, tr.k * 3.7);
  caption(t); hud(t);
};
window.SFX = { tears: SCENES.slice(1).map(s => +(s.a - TEAR_PRE + .06).toFixed(2)), pops: SCENES.filter(s => s.k === 'B').flatMap(s => s.pops.map(p => +(s.a + p).toFixed(2))) };   // dipakai hanya bila projek ada sfx.py
window.ready = Promise.all([
  ...['italic 800 40px PP', 'italic 900 40px PP', '700 40px PP', '600 40px PP', '900 40px PF', '700 40px FR', '600 40px FR', '700 40px NU', '900 40px NU', '40px AN', '40px BG', '800 40px IN', '900 40px IN', '500 40px IN', '700 40px CV', '40px PM', '700 40px MO'].map(f => document.fonts.load(f)),
  ...Object.entries(ASSETS).map(([k, f]) => new Promise((res, rej) => { const i = new Image(); i.onload = () => { IMG[k] = i; res(); }; i.onerror = () => rej(new Error('missing img/' + f)); i.src = 'img/' + f; })),
]).then(() => { bakeAll(); return true; });
