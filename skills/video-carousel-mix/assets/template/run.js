// run.js — HARD CUT (tiada transisi), hud, render(t), ready. JANGAN EDIT per video. Tiada muzik; SFX hanya jika projek ada sfx.py.
buildCaps();
const BK = .885;   // B-roll dimampatkan (BK) supaya kandungan tak masuk zon kapsyen (y≈1390)
function sceneAt(t) { return SCENES.find(s => t >= s.a && t < s.b) || SCENES[SCENES.length - 1]; }
function drawScene(s, t) {
  const lt = Math.max(0, t - s.a), d = s.b - s.a;
  if (s.k === 'H') { head(lt, d, s.dir); s.ov(lt, d); return; }
  const c = BGS[s.bg]; if (c.width > W) { const p = lt / d - .5; X.drawImage(c, -110 - p * 50, -195 - p * 40); } else X.drawImage(c, 0, 0);
  X.save(); X.translate(540, 110); X.scale(BK, BK); X.translate(-540, -110); s.draw(lt, d); X.restore();
}
function hud(t) {
  X.fillStyle = CK.gold; X.fillRect(0, 0, W * t / DUR, 8);
  X.save(); rr(40, 44, 250, 54, 27); X.fillStyle = 'rgba(0,0,0,.55)'; X.fill(); X.beginPath(); X.arc(70, 71, 9, 0, 7); X.fillStyle = CK.gold; X.fill(); X.restore();
  MA.txt('@taufik.pg', 88, 82, MA.F.b(26), '#fff');
}
window.render = t => {   // HARD CUT (tiada transisi) — sticker pop-up sudah cukup animasi
  X.clearRect(0, 0, W, H); drawScene(sceneAt(t), t); caption(t); hud(t);
};
window.SFX = { tears: [], pops: SCENES.filter(s => s.k === 'B').flatMap(s => s.pops.map(p => +(s.a + p).toFixed(2))) };   // dipakai hanya bila projek ada sfx.py
window.ready = Promise.all([
  ...['italic 800 40px PP', 'italic 900 40px PP', '700 40px PP', '600 40px PP', '900 40px PF', '700 40px FR', '600 40px FR', '700 40px NU', '900 40px NU', '40px AN', '40px BG', '800 40px IN', '900 40px IN', '500 40px IN', '700 40px CV', '40px PM', '700 40px MO'].map(f => document.fonts.load(f)),
  ...Object.entries(ASSETS).map(([k, f]) => new Promise((res, rej) => { const i = new Image(); i.onload = () => { IMG[k] = i; res(); }; i.onerror = () => rej(new Error('missing img/' + f)); i.src = 'img/' + f; })),
]).then(() => { bakeAll(); return true; });
