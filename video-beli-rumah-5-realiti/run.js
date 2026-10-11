// run.js — transisi API (burn), hud, render(t), ready. JANGAN EDIT per video. TIADA SFX/muzik.
buildCaps();
const BK = .885, FIRE_PRE = .25, FIRE_POST = .35;   // B-roll dimampatkan (BK) supaya kandungan tak masuk zon kapsyen (y≈1390)
function sceneAt(t) { return SCENES.find(s => t >= s.a && t < s.b) || SCENES[SCENES.length - 1]; }
function drawScene(s, t) {
  const lt = Math.max(0, t - s.a), d = s.b - s.a;
  if (s.k === 'H') { head(lt, d, s.dir); s.ov(lt, d); return; }
  const c = BGS[s.bg]; if (c.width > W) { const p = lt / d - .5; X.drawImage(c, -110 - p * 50, -195 - p * 40); } else X.drawImage(c, 0, 0);
  X.save(); X.translate(540, 110); X.scale(BK, BK); X.translate(-540, -110); s.draw(lt, d); X.restore();
}
function edgeY(x, p, seed) { return H + 170 - p * (H + 380) + Math.sin(x * .013 + p * 8 + seed) * 34 + Math.sin(x * .034 - p * 14 + seed * 2) * 20 + Math.sin(x * .081 + p * 23) * 9; }
function fireOverlay(p, seed) {
  X.save(); X.globalCompositeOperation = 'lighter';
  for (let x = -10; x <= W + 10; x += 9) {   // lidah api
    const y = edgeY(x, p, seed), n = (Math.sin(x * .21 + p * 40 + seed) + Math.sin(x * .09 - p * 27) * .7 + 1.7) / 3.4, h = 100 + n * 230, lean = Math.sin(x * .05 + p * 30) * 20;
    const g = X.createLinearGradient(0, y, 0, y - h); g.addColorStop(0, 'rgba(255,245,180,.95)'); g.addColorStop(.25, 'rgba(255,170,40,.85)'); g.addColorStop(.65, 'rgba(235,70,20,.5)'); g.addColorStop(1, 'rgba(150,20,0,0)');
    X.fillStyle = g; X.beginPath(); X.moveTo(x - 10, y + 16); X.quadraticCurveTo(x - 6 + lean * .3, y - h * .55, x + lean, y - h); X.quadraticCurveTo(x + 6 + lean * .3, y - h * .55, x + 10, y + 16); X.closePath(); X.fill();
  }
  const R = rng(seed * 7 + 3);   // bara api
  for (let i = 0; i < 52; i++) { const x = R() * W, ph = R(), sp = .6 + R() * .8, r = 2 + R() * 4.5, u = (p * sp * 3 + ph) % 1, y = edgeY(x, p, seed) - u * 560 + 30; X.fillStyle = `rgba(255,${150 + R() * 80 | 0},50,${(1 - u) * .9})`; X.beginPath(); X.arc(x + Math.sin(u * 9 + ph * 6) * 28, y, r * (1 - u * .5), 0, 7); X.fill(); }
  X.fillStyle = `rgba(255,120,20,${.2 * Math.sin(Math.PI * p)})`; X.fillRect(0, 0, W, H); X.restore();
}
function charGlow(p, seed) {   // kawasan baru yang baru "terbakar": bara + arang
  for (let x = 0; x < W; x += 10) { const y = edgeY(x, p, seed), g = X.createLinearGradient(0, y, 0, y + 130); g.addColorStop(0, 'rgba(255,150,30,.65)'); g.addColorStop(.25, 'rgba(70,14,0,.55)'); g.addColorStop(1, 'rgba(0,0,0,0)'); X.fillStyle = g; X.fillRect(x, y, 10, 130); }
}
function hud(t) {
  X.fillStyle = CK.gold; X.fillRect(0, 0, W * t / DUR, 8);
  X.save(); rr(40, 44, 250, 54, 27); X.fillStyle = 'rgba(0,0,0,.55)'; X.fill(); X.beginPath(); X.arc(70, 71, 9, 0, 7); X.fillStyle = CK.gold; X.fill(); X.restore();
  MA.txt('@taufik.pg', 88, 82, MA.F.b(26), '#fff');
}
window.render = t => {
  X.clearRect(0, 0, W, H);
  let tr = null; for (let k = 1; k < SCENES.length; k++) { const T = SCENES[k].a; if (t >= T - FIRE_PRE && t < T + FIRE_POST) { const q = (t - (T - FIRE_PRE)) / (FIRE_PRE + FIRE_POST); tr = { k, p: q * q * (3 - 2 * q), seed: k * 3.7 }; break; } }
  if (!tr) drawScene(sceneAt(t), t);
  else {
    drawScene(SCENES[tr.k - 1], t);
    X.save(); X.beginPath(); X.moveTo(-10, H + 500); for (let x = -10; x <= W + 10; x += 12) X.lineTo(x, edgeY(x, tr.p, tr.seed)); X.lineTo(W + 10, H + 500); X.closePath(); X.clip();
    drawScene(SCENES[tr.k], t); charGlow(tr.p, tr.seed); X.restore();
    fireOverlay(tr.p, tr.seed);
  }
  caption(t); hud(t);
};
window.ready = Promise.all([
  ...['italic 800 40px PP', 'italic 900 40px PP', '700 40px PP', '600 40px PP', '900 40px PF', '700 40px FR', '600 40px FR', '700 40px NU', '900 40px NU', '40px AN', '40px BG', '800 40px IN', '900 40px IN', '500 40px IN', '700 40px CV', '40px PM', '700 40px MO'].map(f => document.fonts.load(f)),
  ...Object.entries(ASSETS).map(([k, f]) => new Promise((res, rej) => { const i = new Image(); i.onload = () => { IMG[k] = i; res(); }; i.onerror = () => rej(new Error('missing img/' + f)); i.src = 'img/' + f; })),
]).then(() => { bakeAll(); return true; });
