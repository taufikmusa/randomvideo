// Shared motion toolkit (same engine as simpan-emas-fizikal): easing, type reveal, gold, motion-blur compositor.
const W = 1080, H = 1920, FPS = 30;
const C = { navy: '#07152B', navy2: '#1E3050', y: '#FFCE32', ydk: '#E6B600', ylt: '#FFF8D6', green: '#16A34A', red: '#EF4444', muted: '#6B7280' };
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

function sparkle(x, y, s, a) {
  if (a <= 0 || s <= 0) return; X.save(); X.globalAlpha = a; X.globalCompositeOperation = 'lighter'; X.translate(x, y); X.fillStyle = '#fff6cf';
  X.beginPath(); X.moveTo(0, -s); X.quadraticCurveTo(0, 0, s, 0); X.quadraticCurveTo(0, 0, 0, s); X.quadraticCurveTo(0, 0, -s, 0); X.quadraticCurveTo(0, 0, 0, -s); X.fill(); X.restore();
}
const grains = [];
{ const R = rng(99); for (let k = 0; k < 4; k++) { const g = document.createElement('canvas'); g.width = 270; g.height = 480; const c = g.getContext('2d'), im = c.createImageData(270, 480); for (let i = 0; i < im.data.length; i += 4) { const v = R() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; } c.putImageData(im, 0, 0); grains.push(g); } }
const SUBS = [-1 / 90, 0, 1 / 90]; // 3-sample motion blur
function render(t) {
  O.globalCompositeOperation = 'source-over';
  SUBS.forEach((d, k) => { frame(cl(t + d, 0, DUR - .001)); O.globalAlpha = 1 / (k + 1); O.drawImage(sc, 0, 0); });
  O.globalAlpha = .07; O.globalCompositeOperation = 'overlay'; O.drawImage(grains[Math.floor(t * FPS) % 4], 0, 0, W, H);
  O.globalCompositeOperation = 'source-over'; O.globalAlpha = 1;
  const v = O.createRadialGradient(540, 960, 500, 540, 960, 1250); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.42)');
  O.fillStyle = v; O.fillRect(0, 0, W, H);
  const fb = 1 - P(t, 0, .25) + P(t, DUR - .4, DUR);
  if (fb > 0) { O.fillStyle = `rgba(0,0,0,${cl(fb)})`; O.fillRect(0, 0, W, H); }
}
function loadImg(src) { return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; }); }
