// Enjin explainer 1920x1080: Taufik cutout kiri/kanan berselang + stage Three.js + overlay kinetik. Semua kandungan dari video/config.js.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { makeProps } from './props.js';
const C = (await import('./video/config.js')).default;
const W = 1920, H = 1080, FPS = 30, VOICE = C.VOICE, DUR = VOICE + 0.8, TAU_N = C.TAU_N;
const GOLD = '#EDBF44', NAVY = '#070B16';
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const eoc = t => 1 - Math.pow(1 - t, 3);
const eio = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const eob = t => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const pad = (n, k) => String(n).padStart(k, '0');

const CLIPN = await (await fetch('assets/broll/index.json')).json();
// sisi Taufik: C.SIDES = [[0,'L'],[t,'R'],...] (t = mula glide 1.1s)
const SIDES = C.SIDES || [[0, 'L']];
const SIDEK = SIDES.slice(1).map(([t, s], i) => [t, t + 1.1, SIDES[i][1] === 'L' ? 0 : 1, s === 'L' ? 0 : 1]);
const sideAt = t => { let s = SIDES[0][1]; for (const [a, b] of SIDES) if (t >= a - .01) s = b; return s; };
const CARDS = C.CARDS.map(c => ({ sp: 1, ...c, side: c.side || sideAt(c.t0 + .1) }));
const cardUrl = (c, t) => { const n = CLIPN[c.n], per = 2 * (n - 1), p = (Math.max(0, t - c.t0) * c.sp * FPS) % per, i = p < n ? p : per - p; return `assets/broll/${c.n}/${pad(Math.floor(i) + 1, 4)}.jpg`; };
const tauUrl = t => `video/keyed/${pad(clamp(Math.round(t * FPS) + 1, 1, TAU_N), 5)}.png`;
const cache = new Map();
function img(url) {
  if (cache.has(url)) return cache.get(url);
  const p = new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('img ' + url)); i.src = url; });
  cache.set(url, p); if (cache.size > 90) { let k = 0; for (const key of cache.keys()) { cache.delete(key); if (++k > 40) break; } }
  return p;
}
function tween(keys, t, init) { let v = init; for (const [a, b, f, g] of keys) { if (t >= b) v = g; else if (t >= a) { v = lerp(f, g, eio((t - a) / (b - a))); break; } else break; } return v; }
const sideP = t => tween(SIDEK, t, 0);
const TAU_X = p => lerp(-8, 1172, p), PED_SX = p => lerp(1090, 830, p);

// ---------------------------------------------------------------- Three.js
const glc = document.getElementById('gl');
const Q = new URLSearchParams(location.search), GS = +(Q.get('gs') || 1);
const renderer = new THREE.WebGLRenderer({ canvas: glc, antialias: Q.get('aa') !== '0', preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(Math.round(W * GS), Math.round(H * GS), false);
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0; renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene(); scene.fog = new THREE.Fog(0x04070f, 14, 50);
const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(new RoomEnvironment(), .04).texture;
const cam = new THREE.PerspectiveCamera(32, W / H, .1, 200);
const mat = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, flatShading: true, roughness: .7, metalness: .05, ...o });
const goldM = new THREE.MeshStandardMaterial({ color: 0xf0b93a, metalness: 1, roughness: .2, envMapIntensity: 1.5 });
const goldFlat = mat(0xf0b93a, { metalness: .9, roughness: .3 });
const metalM = new THREE.MeshStandardMaterial({ color: 0x2c3d63, metalness: .85, roughness: .35 });
{
  const c = document.createElement('canvas'); c.width = 512; c.height = 512; const g = c.getContext('2d');
  const gr = g.createRadialGradient(256, 330, 20, 256, 330, 330); gr.addColorStop(0, '#0f1b38'); gr.addColorStop(.55, '#08102a'); gr.addColorStop(1, '#03050c'); g.fillStyle = gr; g.fillRect(0, 0, 512, 512);
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(260, 130), new THREE.MeshBasicMaterial({ map: Object.assign(new THREE.CanvasTexture(c), { colorSpace: THREE.SRGBColorSpace }), fog: false, toneMapped: false })); bg.position.set(14, 20, -30); scene.add(bg);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(140, 64), new THREE.MeshStandardMaterial({ color: 0x070c1a, roughness: .8, metalness: .1, envMapIntensity: .15 })); floor.rotation.x = -Math.PI / 2; floor.position.set(14, 0, 0); scene.add(floor);
  const grid = new THREE.GridHelper(220, 110, 0x7a5a1a, 0x16203a); grid.position.set(14, .004, 0); grid.material.transparent = true; grid.material.opacity = .28; scene.add(grid);
}
const key = new THREE.DirectionalLight(0xfff0d8, 2.4), rim = new THREE.DirectionalLight(0x78a9ff, 1.5), hemi = new THREE.HemisphereLight(0x9db8ff, 0x1a1408, .55);
scene.add(key, rim, hemi, key.target, rim.target);

function barGeo() {
  const s = new THREE.Shape(); s.moveTo(-.5, 0); s.lineTo(.5, 0); s.lineTo(.39, .42); s.lineTo(-.39, .42); s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 1.7, bevelEnabled: true, bevelThickness: .035, bevelSize: .035, bevelSegments: 3 }); g.translate(0, 0, -.85); g.rotateY(Math.PI / 2); return g;
}
const BARG = barGeo();
function engrave(l1, l2) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256; const g = c.getContext('2d'); g.textAlign = 'center'; g.fillStyle = 'rgba(110,70,8,.85)';
  g.font = '800 82px Inter'; g.fillText(l1, 256, 130); g.font = '700 34px Inter'; g.fillText(l2, 256, 200); const t = new THREE.CanvasTexture(c); t.anisotropy = 4; return t;
}
function makeBar(l1, l2, sc) {
  const bar = new THREE.Group(); bar.add(new THREE.Mesh(BARG, goldM));
  if (l1) { const top = new THREE.Mesh(new THREE.PlaneGeometry(1.4, .7), new THREE.MeshBasicMaterial({ map: engrave(l1, l2), transparent: true, depthWrite: false, toneMapped: false })); top.rotation.x = -Math.PI / 2; top.position.y = .425; bar.add(top); }
  bar.scale.setScalar(sc); return bar;
}
function pedestal(x, h, r = 1.3) {
  const g = new THREE.Group(); g.position.x = x;
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.12, h, 48), new THREE.MeshStandardMaterial({ color: 0x111b36, metalness: .65, roughness: .32 })); ped.position.y = h / 2; g.add(ped);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r, .03, 8, 72), new THREE.MeshBasicMaterial({ color: 0xedbf44 })); ring.rotation.x = Math.PI / 2; ring.position.y = h; g.add(ring);
  const glow = new THREE.Mesh(new THREE.RingGeometry(r * 1.1, r * 2, 64), new THREE.MeshBasicMaterial({ color: 0xedbf44, transparent: true, opacity: .1, blending: THREE.AdditiveBlending, depthWrite: false })); glow.rotation.x = -Math.PI / 2; glow.position.y = .012; g.add(glow);
  scene.add(g); return g;
}
const coinGeo = new THREE.CylinderGeometry(.16, .16, .045, 16);
function jar(x, h) {
  const g = new THREE.Group(); g.position.set(x, h, 0);
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(.85, .85, 1.7, 32, 1, true), new THREE.MeshPhysicalMaterial({ color: 0xbfe6ff, transparent: true, opacity: .16, roughness: .05, metalness: 0, side: THREE.DoubleSide, depthWrite: false })); glass.position.y = .85; g.add(glass);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(.85, .85, .06, 32), new THREE.MeshStandardMaterial({ color: 0x9cc4e6, transparent: true, opacity: .4 })); g.add(base);
  const lid = new THREE.Mesh(new THREE.TorusGeometry(.85, .035, 8, 40), new THREE.MeshStandardMaterial({ color: 0xdff2ff, metalness: .5, roughness: .2 })); lid.rotation.x = Math.PI / 2; lid.position.y = 1.7; g.add(lid);
  const pile = new THREE.Mesh(new THREE.CylinderGeometry(.72, .72, 1, 24), goldM); pile.scale.y = .001; g.add(pile); g.userData.pile = pile;
  scene.add(g); return g;
}
// ---------------------------------------------------------------- stage: C.STAGES = [{type, at, ...opsyen}] ; kamera dolly ke stage seterusnya pada 'at'
const FONT = new FontLoader().parse(await (await fetch('assets/vendor/three/addons/fonts/helvetiker_bold.typeface.json')).json());
const PROPS = makeProps({ THREE, scene, mat, goldM, goldFlat, metalM, pedestal, jar, makeBar, coinGeo, clamp, lerp, eob, eoc, eio, FONT, TextGeometry });
const XS = C.STAGES.map((_, i) => -7 + 7 * i);
const STG = C.STAGES.map((s, i) => PROPS[s.type](XS[i], s));
const TY = STG.map(s => s.ty);
const UKEY = C.STAGES.slice(1).map((s, i) => [s.at - .7, s.at + .5, i, i + 1]);
const NSTG = C.STAGES.length - 1;
const anchor = (si, name) => { const a = STG[si].anchors && STG[si].anchors[name]; return a || [XS[si], 2, 0]; };

// debu emas
const DN = 320, dpos = new Float32Array(DN * 3), dseed = []; for (let i = 0; i < DN; i++) { dseed.push([Math.random(), Math.random(), Math.random(), Math.random()]); }
const dgeo = new THREE.BufferGeometry(); dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
const dust = new THREE.Points(dgeo, new THREE.PointsMaterial({ size: .06, color: 0xf2c14e, transparent: true, opacity: .55, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false })); dust.frustumCulled = false; scene.add(dust);

function update3D(t) {
  const p = sideP(t), u = clamp(tween(UKEY, t, 0), 0, NSTG), i0 = Math.min(NSTG, Math.floor(u)), i1 = Math.min(NSTG, i0 + 1), f = u - i0;
  const tx = lerp(XS[i0], XS[i1], f), ty = lerp(TY[i0], TY[i1], f), sway = Math.sin(t * .4) * .45;
  cam.position.set(tx + sway - 1.2, ty + 2.5, 10.8); cam.lookAt(tx, ty, 0);
  const shx = PED_SX(p) - 960; cam.setViewOffset(W, H, -shx, -200, W, H); cam.updateProjectionMatrix();
  key.position.set(tx + 5, 9, 8); key.target.position.set(tx, 1, 0); rim.position.set(tx - 6, 5, -9); rim.target.position.set(tx, 1, 0);
  for (const s of STG) s.update(t);
  const a = dgeo.attributes.position.array; for (let i = 0; i < DN; i++) { const s = dseed[i]; a[i * 3] = XS[0] - 3 + s[0] * (XS[NSTG] - XS[0] + 20) + Math.sin(t * .3 + s[3] * 6) * .6; a[i * 3 + 1] = (s[1] * 9 + t * (.12 + s[3] * .15)) % 9; a[i * 3 + 2] = -8 + s[2] * 15; }
  dgeo.attributes.position.needsUpdate = true;
  scene.updateMatrixWorld(); if (Q.get('nogl') !== '1') renderer.render(scene, cam);
}
const proj = (x, y, z) => { const v = new THREE.Vector3(x, y, z).project(cam); return [(v.x * .5 + .5) * W, (-v.y * .5 + .5) * H]; };

// ---------------------------------------------------------------- overlay 2D
const cv = document.getElementById('c'), X = cv.getContext('2d', { willReadFrequently: true });
const F = (w, s) => `${w} ${s}px Inter, sans-serif`;
function setLS(px) { X.letterSpacing = px + 'px'; }
const OFF = document.createElement('canvas'), OX = OFF.getContext('2d');
// teks berkabur murah: lukis pada kanvas kecil (1/k) kemudian skala semula (elak ctx.filter yang lambat pada raster CPU)
function blurText(txt, x, y, font, fill, ls, blur, alpha) {
  const k = 1 + blur * .45; X.save(); X.font = font; X.letterSpacing = ls + 'px'; const w = Math.ceil(X.measureText(txt).width) + 60, h = Math.ceil(parseFloat(font.match(/(\d+)px/)[1]) * 1.5);
  X.restore(); OFF.width = Math.ceil(w / k); OFF.height = Math.ceil(h / k); OX.setTransform(1 / k, 0, 0, 1 / k, 0, 0); OX.font = font; OX.letterSpacing = ls + 'px'; OX.fillStyle = fill; OX.textBaseline = 'alphabetic'; OX.fillText(txt, 30, h * .78);
  X.save(); X.globalAlpha = alpha; X.imageSmoothingEnabled = true; X.imageSmoothingQuality = 'high'; X.drawImage(OFF, 0, 0, OFF.width, OFF.height, x - 30, y - h * .78, OFF.width * k, OFF.height * k); X.restore();
}
function word(txt, x, y, font, col, t, t0, tEx, size) {
  const p = eoc(clamp((t - t0) / .5)), o = clamp((t - tEx) / .35), a = p * (1 - o); if (a <= .01) return;
  const bl = (1 - p) * 10 + o * 8, yy = y + (1 - p) * 26 - o * 10;
  if (bl > .8) { blurText(txt, x, yy, font, col, -size * .028, bl, a); return; }
  X.save(); X.globalAlpha = a; X.font = font; setLS(-size * .028); X.fillStyle = 'rgba(0,0,0,.35)'; X.fillText(txt, x + 2, yy + 4); X.fillStyle = col; X.fillText(txt, x, yy); X.restore();
}
// lines: [{t:'teks *emas', s:size, w:weight, c:color}]
function block(lines, x, y, t, t0, tEx, gap = 0) {
  if (t < t0 - .02 || t > tEx + .45) return y;
  let yy = y, wi = 0;
  for (const L of lines) {
    const f = F(L.w || 800, L.s); X.save(); X.font = f; setLS(-L.s * .028); let xx = x;
    for (const wd of L.t.split(' ')) { const gold = wd[0] === '*', s = gold ? wd.slice(1) : wd; const adv = X.measureText(s + ' ').width; word(s, xx, yy + L.s * .86, f, gold ? GOLD : (L.c || '#fff'), t, t0 + wi * .075, tEx, L.s); xx += adv; wi++; }
    X.restore(); yy += L.s * (L.lh || 1.06) + gap;
  }
  return yy;
}
function counter(o, t) { // nombor emas besar + label (rujukan "23 TAHUN KEMUDIAN")
  if (t < o.t0 - .02 || t > o.tEx + .45) return;
  const p = eoc(clamp((t - o.t0) / .55)), out = clamp((t - o.tEx) / .35), a = p * (1 - out); if (a <= .01) return;
  const v = lerp(o.from, o.to, eio(clamp((t - o.c0) / (o.c1 - o.c0)))), txt = (o.fmt ? o.fmt(v) : String(Math.round(v))) + (o.suf || ''), bl = (1 - p) * 10 + out * 8, dy = (1 - p) * 30, by = o.y + o.s * .8;
  if (bl > .8) { blurText(txt, o.x, by + dy, F(900, o.s), GOLD, -o.s * .035, bl, a); if (o.label) blurText(o.label, o.x + 4, by + o.s * .47 + dy, F(800, o.s * (o.ls || .3)), '#fff', o.s * .02, bl, a); return; }
  X.save(); X.globalAlpha = a; X.font = F(900, o.s); setLS(-o.s * .035); X.fillStyle = 'rgba(0,0,0,.4)'; X.fillText(txt, o.x + 4, by + 7 + dy); X.fillStyle = GOLD; X.fillText(txt, o.x, by + dy);
  if (o.label) { X.font = F(800, o.s * (o.ls || .3)); setLS(o.s * .02); X.fillStyle = '#fff'; X.fillText(o.label, o.x + 4, by + o.s * .47 + dy); }
  X.restore();
}
function stamp(txt, cx, cy, s, t, t0, tEx, rot = -3) {
  if (t < t0 - .02 || t > tEx + .35) return; // kotak emas dicop (rujukan "KERJA GILA?")
  const p = clamp((t - t0) / .5), out = clamp((t - tEx) / .3), a = Math.min(1, p * 2.2) * (1 - out); if (a <= .01) return;
  const k = lerp(1.7, 1, eoc(p)); X.save(); X.translate(cx, cy); X.rotate(rot * Math.PI / 180); X.scale(k, k); X.globalAlpha = a;
  X.font = F(900, s); setLS(-s * .03); const w = X.measureText(txt).width + s * .9, h = s * 1.35;
  X.fillStyle = 'rgba(0,0,0,.4)'; X.fillRect(-w / 2 + 8, -h / 2 + 12, w, h); X.fillStyle = GOLD; X.fillRect(-w / 2, -h / 2, w, h); X.fillStyle = '#0b0f1a'; X.textAlign = 'center'; X.fillText(txt, 0, s * .36); X.restore();
}
function tag(txt, sub, ax, ay, bx, by, t, t0, tEx) {
  if (t < t0 - .02 || t > tEx + .35) return; // label putih + garis penunjuk (rujukan tooltip)
  const p = clamp((t - t0) / .5), out = clamp((t - tEx) / .3), a = p * (1 - out); if (a <= .01) return;
  X.save(); X.globalAlpha = a; X.font = F(800, 26); setLS(0); const w1 = X.measureText(txt).width, w = Math.max(w1, sub ? (X.font = F(500, 18), X.measureText(sub).width) : 0) + 34, h = sub ? 66 : 46;
  const lx = bx - w / 2, ly = by - h / 2; const pr = eoc(p);
  X.strokeStyle = 'rgba(255,255,255,.85)'; X.lineWidth = 2; X.beginPath(); X.moveTo(bx, by + h / 2); X.lineTo(lerp(bx, ax, pr), lerp(by + h / 2, ay, pr)); X.stroke();
  X.fillStyle = '#fff'; X.beginPath(); X.arc(lerp(bx, ax, pr), lerp(by + h / 2, ay, pr), 5, 0, 7); X.fill();
  X.beginPath(); X.roundRect(lx + 3, ly + 6 + (1 - p) * 8, w, h, 7); X.fillStyle = 'rgba(0,0,0,.35)'; X.fill(); X.beginPath(); X.roundRect(lx, ly + (1 - p) * 8, w, h, 7); X.fillStyle = '#fff'; X.fill();
  X.fillStyle = '#0b0f1a'; X.font = F(800, 26); X.textAlign = 'left'; X.fillText(txt, lx + 17, ly + (sub ? 30 : 31) + (1 - p) * 8); if (sub) { X.font = F(500, 18); X.fillStyle = '#4a5160'; X.fillText(sub, lx + 17, ly + 54 + (1 - p) * 8); }
  X.restore();
}
let CARD_SH = null;
function cardShadow() { if (CARD_SH) return CARD_SH; const c = document.createElement('canvas'); c.width = 420 + 240; c.height = 747 + 240; const g = c.getContext('2d'); g.filter = 'blur(26px)'; g.fillStyle = 'rgba(0,0,0,.62)'; g.beginPath(); g.roundRect(120, 120 + 20, 420, 747, 26); g.fill(); return (CARD_SH = c); }
async function drawCard(c, t) { // kad B-roll menegak
  const L = c.side === 'L', w = 420, h = 747, y0 = 150, x0 = L ? 1440 : 60;
  const pin = clamp((t - c.t0) / .55), pout = clamp((t - (c.t1 - .35)) / .35); if (pin <= 0 || pout >= 1) return;
  const a = eoc(pin) * (1 - pout), sl = (1 - eob(pin)) * (L ? 90 : -90) + pout * (L ? 70 : -70), bob = Math.sin(t * 1.1 + c.t0) * 6;
  const im = await img(cardUrl(c, t));
  X.save(); X.globalAlpha = a; X.translate(x0 + w / 2 + sl, y0 + h / 2 + bob); X.rotate((L ? 1 : -1) * .018 * (1 - pin * .6)); X.translate(-w / 2, -h / 2);
  X.drawImage(cardShadow(), -120, -120); X.beginPath(); X.roundRect(0, 0, w, h, 26); X.fillStyle = '#000'; X.fill();
  X.save(); X.clip(); X.drawImage(im, 0, 0, im.width, im.height, 0, 0, w, h);
  const g = X.createLinearGradient(0, h * .6, 0, h); g.addColorStop(0, 'rgba(5,8,16,0)'); g.addColorStop(1, 'rgba(5,8,16,.55)'); X.fillStyle = g; X.fillRect(0, 0, w, h); X.restore();
  X.lineWidth = 3; X.strokeStyle = 'rgba(237,191,68,.9)'; X.beginPath(); X.roundRect(1.5, 1.5, w - 3, h - 3, 25); X.stroke(); X.restore();
}
function likeBadge(t) {
  const x = W - 74, y = H - 74, r = 44, a = clamp((t - .6) / .5); X.save(); X.globalAlpha = a; X.beginPath(); X.arc(x + 2, y + 4, r, 0, 7); X.fillStyle = 'rgba(0,0,0,.35)'; X.fill(); X.beginPath(); X.arc(x, y, r, 0, 7); X.fillStyle = '#1877F2'; X.fill();
  X.translate(x, y); X.scale(r / 30, r / 30); X.fillStyle = '#fff'; X.beginPath(); X.moveTo(-14, -2); X.lineTo(-7, -2); X.lineTo(-7, 15); X.lineTo(-14, 15); X.closePath(); X.fill();
  X.beginPath(); X.moveTo(-4, -1); X.lineTo(2, -13); X.bezierCurveTo(5.5, -15, 9, -11, 8, -7); X.lineTo(6.5, -2); X.lineTo(13, -2); X.bezierCurveTo(16, -2, 17.5, .5, 16.5, 3.5); X.lineTo(14, 12); X.bezierCurveTo(13.4, 14, 12, 15, 10, 15); X.lineTo(-4, 15); X.closePath(); X.fill(); X.restore();
}

// ---------------------------------------------------------------- primitif tambahan: garis coret (rujukan "LONGKANG KONKRIT" dicoret)
function strike(txt, x, y, s, t, t0, t1, tEx) {
  const p = eoc(clamp((t - t0) / (t1 - t0))), out = clamp((t - tEx) / .35), a = 1 - out; if (p <= 0 || a <= .01) return;
  X.save(); X.globalAlpha = a; X.font = F(900, s); setLS(-s * .035); const w = X.measureText(txt).width; X.fillStyle = GOLD; X.fillRect(x - 6, y + s * .52, (w + 12) * p, Math.max(8, s * .075)); X.restore();
}
// ---------------------------------------------------------------- garis masa teks: C.TEXT = [{k:'b'|'n'|'s'|'x', ...}] (lihat SKILL.md)
const XL = s => (s === 'L' ? 800 : 520);
function textLayer(t) {
  for (const e of C.TEXT) {
    if (t < e.t0 - .05 || t > e.t1 + .5) continue;
    const x = e.x ?? XL(e.side || sideAt(e.t0 + .1));
    if (e.k === 'b') block(e.lines, x, e.y, t, e.t0, e.t1, e.gap || 0);
    else if (e.k === 'n') counter({ x, y: e.y, from: e.from ?? 0, to: e.to ?? 1, t0: e.t0, c0: e.c0 ?? e.t0, c1: e.c1 ?? e.t0 + .8, tEx: e.t1, suf: e.suf || '', label: e.label || null, fmt: e.word ? (() => e.word) : (e.fmt === 'int' ? (v => (e.pre || '') + String(Math.round(v))) : (e.fmt === 'sep' ? (v => (e.pre || '') + Math.round(v).toLocaleString('en-US')) : null)), s: e.s || 170, ls: e.label && e.label.length > 18 ? .165 : .3 }, t);
    else if (e.k === 's') stamp(e.txt, x + (e.dx ?? 330), e.y, e.s || 58, t, e.t0, e.t1);
    else if (e.k === 'x') strike(e.txt, x, e.y + 12, e.s, t, e.tA, e.tB, e.t1);
  }
}
async function overlay(t) {
  let q0 = performance.now(); const P = window.__prof || (window.__prof = {}), lp = k => { if (Q.get('prof') === '1') X.getImageData(0, 0, 1, 1); P[k] = (P[k] || 0) + performance.now() - q0; q0 = performance.now(); };
  for (const c of CARDS) await drawCard(c, t);
  lp('o_cards'); textLayer(t); lp('o_text');
  const p = sideP(t), sgn = p < .5 ? 1 : -1;
  // tag: {s: indeks stage, a: nama anchor, o:[dx,dy,dz], txt, sub, t0, t1, dx, dy}
  for (const g of (C.TAGS || [])) { if (t < g.t0 - .02 || t > g.t1 + .35) continue; const an = anchor(g.s, g.a), [ax, ay] = proj(an[0] + (g.o ? g.o[0] : 0), an[1] + (g.o ? g.o[1] : 0), an[2] + (g.o ? g.o[2] : 0)); tag(g.txt, g.sub || null, ax, ay, ax + sgn * (g.dx ?? 150), ay + (g.dy ?? -100), t, g.t0, g.t1); }
  lp('o_tags');
  const ctx = { proj, numAt: (s, sx, sy, a) => { X.save(); X.globalAlpha = a; X.font = F(900, 40 + a * 8); setLS(0); X.textAlign = 'center'; X.fillStyle = GOLD; X.shadowColor = 'rgba(0,0,0,.6)'; X.shadowBlur = 8; X.fillText(s, sx, sy); X.restore(); } };
  for (const s of STG) if (s.overlay) s.overlay(t, ctx);
  if (C.CREDIT !== false && t > (C.CREDIT_AT ?? VOICE - 2)) { const a = clamp((t - (C.CREDIT_AT ?? VOICE - 2)) / .5); X.save(); X.globalAlpha = a; X.font = F(800, 22); setLS(2); X.fillStyle = 'rgba(255,255,255,.88)'; X.textAlign = 'left'; X.fillText('PUBLIC GOLD', sgn > 0 ? 70 : 520, H - 52); X.fillStyle = GOLD; X.font = F(800, 20); X.fillText('@taufik.pg', sgn > 0 ? 70 : 520, H - 22); X.restore(); }
}

const VIG = document.createElement('canvas'); VIG.width = W; VIG.height = H; { const g = VIG.getContext('2d'), v = g.createRadialGradient(W / 2, H / 2, H * .45, W / 2, H / 2, H * 1.05); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.5)'); g.fillStyle = v; g.fillRect(0, 0, W, H); }
// ---------------------------------------------------------------- bingkai
async function renderFrame(n) {
  const t = n / FPS, P = window.__prof || (window.__prof = {}), lap = (k, t0) => { if (Q.get('prof') === '1') X.getImageData(0, 0, 1, 1); P[k] = (P[k] || 0) + performance.now() - t0; return performance.now(); };
  let q = performance.now();
  const tau = img(tauUrl(t)); const pre = []; for (const c of CARDS) if (t >= c.t0 - .05 && t < c.t1) pre.push(img(cardUrl(c, t)));
  await Promise.all([tau, ...pre]); q = lap('load', q);
  update3D(t); q = lap('gl', q); X.clearRect(0, 0, W, H); X.imageSmoothingQuality = 'high'; X.drawImage(glc, 0, 0, W, H); q = lap('blit', q);
  X.drawImage(VIG, 0, 0); q = lap('vig', q);
  const im = await tau, sc = 1.05, tw = im.width * sc, th = im.height * sc, tx = TAU_X(sideP(t));
  X.save(); X.shadowColor = 'rgba(0,0,0,.55)'; X.shadowBlur = 28; X.shadowOffsetX = sideP(t) < .5 ? 14 : -14; X.drawImage(im, tx, H - th + 28, tw, th); X.restore(); q = lap('tau', q);
  if (Q.get('noov') !== '1') await overlay(t); q = lap('overlay', q); likeBadge(t);
  const f = Math.max(1 - t / .5, clamp((t - VOICE) / .6)); if (f > 0) { X.fillStyle = `rgba(7,11,22,${f})`; X.fillRect(0, 0, W, H); }
  const out = cv.toDataURL('image/jpeg', .93); lap('jpeg', q); return out;
}
window.renderFrame = renderFrame; window.DUR = DUR; window.FPS = FPS;
await document.fonts.load('900 40px Inter'); await document.fonts.load('800 40px Inter'); await document.fonts.load('500 20px Inter');
window.ready = true;
