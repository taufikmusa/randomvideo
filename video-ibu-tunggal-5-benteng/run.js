// run.js — WIPES, SFX, wipe/hud/render/ready. JANGAN EDIT per video.
buildCaps();
const WIPES = SCENES.slice(1).map(s => ({ t: s.a, c: s.wc }));
window.SFX = { wipes: WIPES.map(w => w.t), pops: SCENES.filter(s => s.k === 'B').flatMap(s => s.pops.map(p => +(s.a + p).toFixed(2))) };

function wipe(t) {
  for (const { t: T, c } of WIPES) {
    const p = (t - T + .2) / .4; if (p < 0 || p > 1) continue;
    const L = -1.25 * W + p * 2.5 * W, w = 1.25 * W;
    X.save(); X.transform(1, 0, -.18, 1, 0, 0); X.fillStyle = c[0]; X.fillRect(L, -50, w, H + 100); X.fillStyle = c[1]; X.fillRect(L + w - 18, -50, 18, H + 100); X.fillRect(L + w - 60, -50, 8, H + 100); X.restore();
  }
}
function hud(t) {
  X.fillStyle = CK.gold; X.fillRect(0, 0, W * t / DUR, 8);
  X.save(); rr(40, 44, 250, 54, 27); X.fillStyle = 'rgba(0,0,0,.55)'; X.fill(); X.beginPath(); X.arc(70, 71, 9, 0, 7); X.fillStyle = CK.gold; X.fill(); X.restore();
  MA.txt('@taufik.pg', 88, 82, MA.F.b(26), '#fff');
}
window.render = t => {
  X.clearRect(0, 0, W, H);
  const s = SCENES.find(s => t >= s.a && t < s.b) || SCENES[SCENES.length - 1], lt = t - s.a, d = s.b - s.a;
  if (s.k === 'H') { head(lt, d, s.dir); s.ov(lt, d); }
  else {
    const c = BGS[s.bg]; if (c.width > W) { const p = lt / d - .5; X.drawImage(c, -110 - p * 50, -195 - p * 40); } else X.drawImage(c, 0, 0);
    s.draw(lt, d);
  }
  caption(t); hud(t); wipe(t);
};
window.ready = Promise.all([
  ...['italic 800 40px PP', 'italic 900 40px PP', '700 40px PP', '600 40px PP', '700 40px FR', '600 40px FR', '700 40px NU', '900 40px NU', '40px AN', '40px BG', '800 40px IN', '900 40px IN', '500 40px IN', '700 40px CV', '40px PM', '700 40px MO'].map(f => document.fonts.load(f)),
  ...Object.entries(ASSETS).map(([k, f]) => new Promise((res, rej) => { const i = new Image(); i.onload = () => { IMG[k] = i; res(); }; i.onerror = () => rej(new Error('missing img/' + f)); i.src = 'img/' + f; })),
]).then(() => { bakeAll(); return true; });
