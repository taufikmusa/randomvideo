/* video-timeline engine — do not edit per video; write scenes.js instead.
 * Exposes: htext/ptext/mono (text), neon/neonA/fillA/fillB/rr/waves/slab/keypad (painters),
 * ca()/cb() (current grade colours), eo/eback/lerp/clamp/mulberry, sc()/era() (scenes), beatPulse(). */
const W = 1080, H = 1920, CX = W / 2, IY = 860;
const BPM = 120, BEAT = 60 / BPM, BAR = BEAT * 4, DUR = 90;
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const buf = document.createElement('canvas'); buf.width = W; buf.height = H;
const bx = buf.getContext('2d');

// ------------------------------------------------------------ utils
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const eo = x => 1 - Math.pow(1 - clamp(x), 3);
const eback = x => { x = clamp(x); const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const TAU = Math.PI * 2;

// ------------------------------------------------------------ standard 90s structure (bars; 1 bar = 2s at 120 BPM)
// 0-1 cold open | 2-3 title | 4-15 ACT 1 (6 scenes x 2 bars) | 16-25 ACT 2 (10 x 1 bar)
// 26-27 PIVOT (breakdown) | 28-33 ACT 3 (12 x half bar) | 34-35 WORD SLAMS (7 beats + breath)
// 36-41 DROP | 42-44 FINALE. music.py follows the same map.
const ACT1 = 4, ACT2 = 16, PIVOT = 26, ACT3 = 28, WORDS = 34, BREATH = 35.75, DROP = 36, FINALE = 42;

let A = [255, 255, 255], B = [255, 255, 255];
function grade(t) {
  let i = 0; while (i < KEYS.length - 2 && t > KEYS[i + 1][0]) i++;
  const [t0, a0, b0] = KEYS[i], [t1, a1, b1] = KEYS[i + 1];
  const x = clamp((t - t0) / (t1 - t0));
  A = a0.map((v, k) => Math.round(lerp(v, a1[k], x)));
  B = b0.map((v, k) => Math.round(lerp(v, b1[k], x)));
}
const ca = (a = 1) => `rgba(${A[0]},${A[1]},${A[2]},${a})`;
const cb = (a = 1) => `rgba(${B[0]},${B[1]},${B[2]},${a})`;

// ------------------------------------------------------------ text
function htext(str, y, size, o = {}) {
  const { font = 'Orb', weight = 900, alpha = 1, track = 0, glow = 34, scale = 1, lh = 1.08, grad = true, color = null } = o;
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = clamp(alpha);
  ctx.font = `${weight} ${size}px ${font}`; ctx.letterSpacing = track + 'px';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const lines = String(str).split('\n');
  lines.forEach((ln, i) => {
    const yy = y + (i - (lines.length - 1) / 2) * size * lh;
    ctx.save(); ctx.translate(CX, yy); ctx.scale(scale, scale);
    if (color) ctx.fillStyle = color;
    else if (grad) {
      const g = ctx.createLinearGradient(0, -size / 2, 0, size / 2);
      g.addColorStop(0, '#ffffff'); g.addColorStop(0.55, '#ffffff'); g.addColorStop(1, ca(1));
      ctx.fillStyle = g;
    } else ctx.fillStyle = '#fff';
    ctx.shadowColor = ca(0.85); ctx.shadowBlur = glow;
    ctx.fillText(ln, 0, 0);
    ctx.shadowBlur = 0; ctx.fillText(ln, 0, 0);
    ctx.restore();
  });
  ctx.restore();
}
function ptext(str, y, size, alpha = 1, o = {}) {
  const { color = '#dfe9f2', weight = 500, font = 'Grot', track = 1, lh = 1.32 } = o;
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = clamp(alpha); ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px ${font}`; ctx.letterSpacing = track + 'px';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.95)'; ctx.shadowBlur = 16;
  String(str).split('\n').forEach((l, i, a) => ctx.fillText(l, CX, y + (i - (a.length - 1) / 2) * size * lh));
  ctx.restore();
}
function mono(str, y, size, alpha = 1, color = null, track = 10) { ptext(str, y, size, alpha, { font: 'Mono', weight: 700, color: color || ca(1), track }); }

// ------------------------------------------------------------ background
function intensity(t) {
  if (t < ACT1 * BAR) return 0.15;
  if (t < ACT2 * BAR) return 0.3;
  if (t < PIVOT * BAR) return 0.55;
  if (t < ACT3 * BAR) return 0.25;
  if (t < 32 * BAR) return 0.75;
  if (t < DROP * BAR) return lerp(0.8, 1.1, (t - 32 * BAR) / (4 * BAR));
  if (t < FINALE * BAR) return 1.2;
  return 0.4;
}
const TRAV = []; { let s = 0; for (let f = 0; f <= DUR * 30 + 2; f++) { TRAV.push(s); s += intensity(f / 30) / 30; } }
function beatPulse(t) {
  if (t < ACT1 * BAR) return 0;
  if (t >= PIVOT * BAR && t < (PIVOT + 1) * BAR) return 0;
  if (t >= (DROP - 0.125) * BAR && t < DROP * BAR) return 0;
  const ph = (t % BEAT) / BEAT;
  const every = t < ACT2 * BAR ? (Math.floor(t / BEAT) % 2 === 0 ? 1 : 0) : 1;
  return Math.exp(-ph * 7) * every;
}
const PTS = []; { const r = mulberry(42); for (let i = 0; i < 180; i++) PTS.push({ x: r() * W, y: r() * H, z: 0.3 + r() * 1.2, s: r() * TAU, k: r() }); }

function background(t) {
  const I = intensity(t), tr = TRAV[Math.min(TRAV.length - 1, Math.round(t * 30))], bp = beatPulse(t);
  ctx.fillStyle = '#03050a'; ctx.fillRect(0, 0, W, H);
  const g = ctx.createRadialGradient(CX, IY, 0, CX, IY, H * 0.7);
  g.addColorStop(0, cb(0.16 + 0.14 * I + 0.1 * bp)); g.addColorStop(0.5, ca(0.05)); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // perspective grid floor
  const hz = 1180;
  ctx.save();
  ctx.strokeStyle = ca(0.10 + 0.08 * I); ctx.lineWidth = 2;
  for (let i = -12; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(CX + i * 20, hz); ctx.lineTo(CX + i * 260, H); ctx.stroke(); }
  for (let k = 0; k < 14; k++) {
    const z = ((k / 14 + tr * 0.9) % 1);
    const y = hz + (H - hz) * z * z;
    ctx.globalAlpha = z; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  ctx.restore();
  const hg = ctx.createLinearGradient(0, hz - 140, 0, hz + 60);
  hg.addColorStop(0, 'rgba(3,5,10,0)'); hg.addColorStop(0.7, 'rgba(3,5,10,0.9)'); hg.addColorStop(1, 'rgba(3,5,10,0)');
  ctx.fillStyle = hg; ctx.fillRect(0, hz - 140, W, 200);
  // signal rings on the beat
  if (t >= ACT2 * BAR && t < FINALE * BAR) {
    const ph = (t % BEAT) / BEAT;
    ctx.save(); ctx.strokeStyle = ca(0.35 * (1 - ph) * I); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(CX, IY, 340 + ph * 260, 0, TAU); ctx.stroke(); ctx.restore();
  }
  // data particles
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const p of PTS) {
    const y = ((p.y - tr * 300 * p.z) % H + H) % H;
    const x = p.x + Math.sin(tr + p.s) * 20;
    const a = 0.2 + 0.5 * (0.5 + 0.5 * Math.sin(t * 5 + p.s * 4));
    ctx.fillStyle = p.k > 0.8 ? cb(a) : ca(a);
    const s = 2 + p.z * 2.5;
    if (I > 0.7 && p.k > 0.6) ctx.fillRect(x, y, 2, s * 6 * I); else ctx.fillRect(x, y, s, s);
  }
  ctx.restore();
}

const SCAN = document.createElement('canvas'); SCAN.width = W; SCAN.height = H;
{ const s = SCAN.getContext('2d'); s.fillStyle = 'rgba(0,0,0,0.16)'; for (let y = 0; y < H; y += 4) s.fillRect(0, y, W, 2); }
const GR = [];
for (let k = 0; k < 6; k++) {
  const c = document.createElement('canvas'); c.width = 360; c.height = 640;
  const x = c.getContext('2d'), im = x.createImageData(360, 640), rr = mulberry(7 + k);
  for (let i = 0; i < im.data.length; i += 4) { const v = rr() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
  x.putImageData(im, 0, 0); GR.push(c);
}
function finish(t, frame) {
  ctx.drawImage(SCAN, 0, 0);
  const v = ctx.createRadialGradient(CX, H / 2, H * 0.28, CX, H / 2, H * 0.72);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.8)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = 0.05; ctx.globalCompositeOperation = 'overlay';
  ctx.drawImage(GR[frame % GR.length], 0, 0, W, H); ctx.restore();
  // HUD corner brackets
  ctx.save(); ctx.strokeStyle = ca(0.5); ctx.lineWidth = 3; const m = 44, L = 60;
  [[m, m, 1, 1], [W - m, m, -1, 1], [m, H - m, 1, -1], [W - m, H - m, -1, -1]].forEach(([x, y, sx, sy]) => {
    ctx.beginPath(); ctx.moveTo(x, y + sy * L); ctx.lineTo(x, y); ctx.lineTo(x + sx * L, y); ctx.stroke();
  });
  ctx.restore();
}

// ------------------------------------------------------------ neon painters
function neon(w = 8, blur = 26, a = 1) { ctx.strokeStyle = `rgba(255,255,255,${a})`; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.shadowColor = ca(1); ctx.shadowBlur = blur; }
function neonA(w = 8, blur = 26) { ctx.strokeStyle = ca(1); ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.shadowColor = ca(1); ctx.shadowBlur = blur; }
function fillA(a = 1, blur = 26) { ctx.fillStyle = ca(a); ctx.shadowColor = ca(1); ctx.shadowBlur = blur; }
function fillB(a = 1, blur = 26) { ctx.fillStyle = cb(a); ctx.shadowColor = cb(1); ctx.shadowBlur = blur; }
function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
function waves(x, y, n, t, dir = 0, r0 = 40, spread = 0.7) {
  for (let i = 0; i < n; i++) {
    const ph = (t * 1.2 + i / n) % 1;
    ctx.save(); ctx.globalAlpha = 1 - ph; neonA(6, 20);
    ctx.beginPath(); ctx.arc(x, y, r0 + ph * 120, dir - spread, dir + spread); ctx.stroke(); ctx.restore();
  }
}
function slab(w, h, r, glass = true) {
  ctx.fillStyle = '#060a12'; rr(-w / 2, -h / 2, w, h, r); ctx.fill();
  neon(8); ctx.stroke();
  if (glass) { ctx.save(); ctx.clip(); ctx.shadowBlur = 0; const g = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); g.addColorStop(0, ca(0.12)); g.addColorStop(0.5, 'rgba(255,255,255,0.03)'); g.addColorStop(1, cb(0.1)); ctx.fillStyle = g; ctx.fill(); ctx.restore(); }
}
function keypad(x0, y0, dx, dy, lit = -1, r = 16) {
  for (let i = 0; i < 12; i++) {
    const x = x0 + (i % 3) * dx, y = y0 + Math.floor(i / 3) * dy;
    if (i === lit) { fillA(1, 30); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
    else { neon(4, 10, 0.8); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); }
  }
}

// ------------------------------------------------------------ scene helpers
const S = [];
function sc(b0, b1, fn, year = null) { S.push({ t0: b0 * BAR, t1: b1 * BAR, fn, year }); }
let curT = 0;

function era(year, icon, title, sub, o = {}) {
  const fn = (lt, d) => {
    const k = Math.min(1, d / 1.4), T = lt / k;
    ctx.save(); ctx.translate(CX, IY); const z = lerp(1.2, 1, eo(T * 2.2)) + 0.02 * beatPulse(curT); ctx.scale(z * (o.s || 1), z * (o.s || 1));
    ctx.globalAlpha = eo(T * 3); ICON[icon](lt, o.arg); ctx.restore(); ctx.globalAlpha = 1;
    htext(year, 330 + (1 - eo(T * 3)) * 50, o.yearSize || 170, { alpha: eo(T * 3), track: 10 });
    if (o.place) mono(o.place, 450, 34, eo(T * 3 - 0.3));
    htext(title, 1390 + (1 - eo(T * 3 - 0.2)) * 40, o.titleSize || 76, { font: 'Grot', weight: 700, alpha: eo(T * 3 - 0.2), track: 2, glow: 22 });
    if (sub) ptext(sub, 1390 + (o.subOff || (title.includes('\n') ? 160 : 115)), 42, eo(T * 3 - 0.45));
  };
  return fn;
}

// ------------------------------------------------------------ HUD: era timeline + signal bars
function hud(t, s) {
  const h = CFG.hud; if (!h) return;
  if (t < h.fromBar * BAR || t >= h.toBar * BAR) return;
  const yr = parseInt(s.year) || h.end;
  const p = clamp((yr - h.start) / (h.end - h.start));
  ctx.save();
  ctx.strokeStyle = ca(0.3); ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(150, 170); ctx.lineTo(W - 150, 170); ctx.stroke();
  ctx.fillStyle = ca(0.9); ctx.fillRect(150, 168, (W - 300) * p, 4);
  ctx.shadowColor = ca(1); ctx.shadowBlur = 20; ctx.beginPath(); ctx.arc(150 + (W - 300) * p, 170, 9, 0, TAU); ctx.fill();
  ctx.restore();
  const lbl = (txt, x, y, align) => { ctx.save(); ctx.font = '700 24px Mono'; ctx.fillStyle = ca(0.7); ctx.textAlign = align; ctx.letterSpacing = '4px'; ctx.fillText(txt, x, y); ctx.restore(); };
  lbl(h.startLabel || String(h.start), 150, 205, 'left'); lbl(h.endLabel || String(h.end), W - 150, 205, 'right');
  // level bars (0-5): how many of CFG.hud.levels thresholds the current year has passed
  if (!h.levels) return;
  const bars = h.levels.filter(y => yr >= y).length;
  ctx.save(); ctx.translate(W - 222, 96);
  for (let i = 0; i < 5; i++) { ctx.fillStyle = i < bars ? ca(1) : 'rgba(255,255,255,0.15)'; ctx.fillRect(i * 16, 30 - i * 7, 10, 8 + i * 7); }
  ctx.restore();
  if (h.tag) lbl(h.tag(bars, yr), 150, 132, 'left');
}

// ------------------------------------------------------------ main render
function render(t, frame = Math.round(t * 30)) {
  curT = t;
  grade(t);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.shadowBlur = 0; ctx.globalCompositeOperation = 'source-over';
  background(t);
  const s = S.find(x => t >= x.t0 && t < x.t1) || S[S.length - 1];
  const lt = t - s.t0, d = s.t1 - s.t0;
  const I = intensity(t), bp = beatPulse(t);
  const sh = (t >= DROP * BAR && t < FINALE * BAR) ? 10 * bp : (t >= WORDS * BAR && t < BREATH * BAR ? 6 * bp + 3 : 0);
  const r = mulberry(frame + 3);
  ctx.save();
  ctx.translate(CX + (r() - 0.5) * sh * 2, H / 2 + (r() - 0.5) * sh * 2);
  const zoom = 1 + 0.015 * bp * I; ctx.scale(zoom, zoom); ctx.translate(-CX, -H / 2);
  s.fn(lt, d);
  ctx.restore();
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  hud(t, s);
  // digital glitch on cuts from CFG.glitchFromBar on
  if (CFG.glitchFromBar != null && t >= CFG.glitchFromBar * BAR && lt < 0.1 && s.t0 !== BREATH * BAR) {
    bx.clearRect(0, 0, W, H); bx.drawImage(cv, 0, 0);
    const g = mulberry(frame * 7 + 1), amt = 90 * (1 - lt / 0.1);
    for (let i = 0; i < 9; i++) { const y = g() * H, h = 16 + g() * 110, dx = (g() - 0.5) * amt * 2; ctx.drawImage(buf, 0, y, W, h, dx, y, W, h); }
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.35 * (1 - lt / 0.1); ctx.drawImage(buf, 8, 0); ctx.restore();
  }
  // cut flash
  const flashLen = t < ACT2 * BAR ? 0.3 : 0.16;
  const big = [PIVOT, ACT3, DROP, FINALE].some(b => Math.abs(s.t0 - b * BAR) < 1e-6);
  if (s.t0 > 0 && lt < flashLen && s.t0 !== BREATH * BAR) {
    const a = (1 - lt / flashLen) ** 2 * (big ? 0.95 : 0.45);
    ctx.fillStyle = `rgba(235,248,255,${a})`; ctx.fillRect(0, 0, W, H);
  }
  finish(t, frame);
  if (t < 0.5) { ctx.fillStyle = `rgba(0,0,0,${1 - t / 0.5})`; ctx.fillRect(0, 0, W, H); }
}
window.render = render;
window.ready = (async () => {
  await Promise.all(['900 40px Orb', '700 40px Orb', '500 40px Grot', '700 40px Grot', '400 40px Mono', '700 40px Mono'].map(f => document.fonts.load(f)));
  await document.fonts.ready;
  render(0);
  return true;
})();
