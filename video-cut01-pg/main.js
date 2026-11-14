// Cut-01 (Taufik) 1920x1080 — gaya explainer dokumentari (rujukan "Reference Video 16x9") + stage Three.js.
// Semua dikawal masa t (saat): renderFrame(n) deterministik, dipanggil oleh render.js frame demi frame.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const W = 1920, H = 1080, FPS = 30, VOICE = 59.05, DUR = VOICE + 0.8, TAU_N = 1771;
const GOLD = '#EDBF44', NAVY = '#070B16';
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const eoc = t => 1 - Math.pow(1 - t, 3);
const eio = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const eob = t => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const pad = (n, k) => String(n).padStart(k, '0');

// ---------------------------------------------------------------- B-roll (frame count @30fps)
const CLIPN = { 'Emas-10gram': 169, 'Others-menabung': 161, 'Emas-20gram': 96, 'Graduate': 151, 'Emas-50gram': 226, '31.haji': 270, 'Emas-100gram': 226, '22.house_keys_handover': 240, '23.modern_house_exterior': 240, 'Emas-goldbar-250gram': 151, 'Others-kerja': 151, 'Emas-1000gram': 173, '19.family_dinner': 284, 'Emas-1gram-album': 126 };
// kad B-roll menegak (rujukan: panel); side = di mana kad letak (L = kanan skrin bila Taufik di kiri)
const CARDS = [
  { n: 'Emas-10gram', t0: .3, t1: 4.0, side: 'L', sp: .9 }, { n: 'Others-menabung', t0: 4.0, t1: 8.5, side: 'L', sp: .8 },
  { n: 'Emas-20gram', t0: 9.0, t1: 12.6, side: 'L', sp: .8 }, { n: 'Graduate', t0: 12.6, t1: 16.3, side: 'L', sp: .8 },
  { n: 'Emas-50gram', t0: 17.7, t1: 21.0, side: 'R', sp: .9 }, { n: '31.haji', t0: 21.0, t1: 24.5, side: 'R', sp: .8 },
  { n: 'Emas-100gram', t0: 25.7, t1: 28.6, side: 'R', sp: .9 }, { n: '22.house_keys_handover', t0: 28.6, t1: 31.5, side: 'R', sp: .8 }, { n: '23.modern_house_exterior', t0: 31.5, t1: 34.0, side: 'R', sp: .8 },
  { n: 'Emas-goldbar-250gram', t0: 35.0, t1: 38.0, side: 'L', sp: .8 }, { n: 'Others-kerja', t0: 38.0, t1: 41.9, side: 'L', sp: .8 },
  { n: 'Emas-1000gram', t0: 42.8, t1: 45.8, side: 'L', sp: .8 }, { n: '19.family_dinner', t0: 45.8, t1: 49.7, side: 'L', sp: .6 },
  { n: 'Emas-1gram-album', t0: 54.2, t1: 58.6, side: 'R', sp: .7 },
];
const cardUrl = (c, t) => { const n = CLIPN[c.n], per = 2 * (n - 1), p = (Math.max(0, t - c.t0) * c.sp * FPS) % per, i = p < n ? p : per - p; return `assets/broll/${c.n}/${pad(Math.floor(i) + 1, 4)}.jpg`; };
const tauUrl = t => `assets/keyed/${pad(clamp(Math.round(t * FPS) + 1, 1, TAU_N), 5)}.png`;

const cache = new Map();
function img(url) {
  if (cache.has(url)) return cache.get(url);
  const p = new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('img ' + url)); i.src = url; });
  cache.set(url, p); if (cache.size > 90) { let k = 0; for (const key of cache.keys()) { cache.delete(key); if (++k > 40) break; } }
  return p;
}

// ---------------------------------------------------------------- struktur: pedestal 0..6 (1g,10g,20g,50g,100g,250g,1kg)
const PED = [{ g: '1g', w: 1 }, { g: '10g', w: 10 }, { g: '20g', w: 20 }, { g: '50g', w: 50 }, { g: '100g', w: 100 }, { g: '250g', w: 250 }, { g: '1kg', w: 1000 }];
const SP = 5.6, px = i => SP * i, hTop = i => .35 + .22 * i;
// kamera: kunci [t0,t1,dari,ke] pada indeks pedestal u; 'ww' = pandangan luas
const UKEY = [[8.4, 9.6, 1, 2], [16.3, 17.5, 2, 3], [24.5, 25.7, 3, 4], [34.1, 35.3, 4, 5], [41.9, 43.1, 5, 6], [49.8, 51.3, 6, 3.5], [53.2, 54.8, 3.5, 0]];
const WKEY = [[49.8, 51.3, 0, 1], [53.2, 54.8, 1, 0]];
function tween(keys, t, init) { let v = init; for (const [a, b, f, g] of keys) { if (t >= b) v = g; else if (t >= a) { v = lerp(f, g, eio((t - a) / (b - a))); break; } else break; } return v; }
// sisi Taufik: 0 = kiri, 1 = kanan
const SIDEK = [[16.35, 17.45, 0, 1], [34.1, 35.2, 1, 0], [49.8, 50.9, 0, 1]];
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

// latar gradien + lantai
{
  const c = document.createElement('canvas'); c.width = 512; c.height = 512; const g = c.getContext('2d');
  const gr = g.createRadialGradient(256, 330, 20, 256, 330, 330); gr.addColorStop(0, '#0f1b38'); gr.addColorStop(.55, '#08102a'); gr.addColorStop(1, '#03050c'); g.fillStyle = gr; g.fillRect(0, 0, 512, 512);
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(260, 130), new THREE.MeshBasicMaterial({ map: Object.assign(new THREE.CanvasTexture(c), { colorSpace: THREE.SRGBColorSpace }), fog: false, toneMapped: false })); bg.position.set(16, 20, -30); scene.add(bg);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(140, 64), new THREE.MeshStandardMaterial({ color: 0x070c1a, roughness: .8, metalness: .1, envMapIntensity: .15 })); floor.rotation.x = -Math.PI / 2; floor.position.set(16, 0, 0); scene.add(floor);
  const grid = new THREE.GridHelper(220, 110, 0x7a5a1a, 0x16203a); grid.position.set(16, .004, 0); grid.material.transparent = true; grid.material.opacity = .28; scene.add(grid);
}
const key = new THREE.DirectionalLight(0xfff0d8, 2.4), rim = new THREE.DirectionalLight(0x78a9ff, 1.5), hemi = new THREE.HemisphereLight(0x9db8ff, 0x1a1408, .55);
scene.add(key, rim, hemi, key.target, rim.target);

function barGeo() {
  const s = new THREE.Shape(); s.moveTo(-.5, 0); s.lineTo(.5, 0); s.lineTo(.39, .42); s.lineTo(-.39, .42); s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 1.7, bevelEnabled: true, bevelThickness: .035, bevelSize: .035, bevelSegments: 3 }); g.translate(0, 0, -.85); g.rotateY(Math.PI / 2); return g;
}
const BARG = barGeo();
function engrave(label) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256; const g = c.getContext('2d');
  g.fillStyle = 'rgba(120,78,10,0.0)'; g.clearRect(0, 0, 512, 256); g.fillStyle = 'rgba(110,70,8,.85)'; g.textAlign = 'center';
  g.font = '800 120px Inter'; g.fillText(label, 256, 150); g.font = '700 34px Inter'; g.fillText('FINE GOLD  999.9', 256, 215);
  const t = new THREE.CanvasTexture(c); t.anisotropy = 4; return t;
}
const pedG = []; // group setiap pedestal
function icon(i) {
  const g = new THREE.Group(), y = 0;
  if (i === 0) { // anak benih
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(.34, .26, .42, 10), mat(0x8a4b2a)); pot.position.y = y + .21; g.add(pot);
    const st = new THREE.Mesh(new THREE.CylinderGeometry(.035, .045, .8, 6), mat(0x3f9e4a)); st.position.y = y + .8; g.add(st);
    for (const s of [-1, 1]) { const lf = new THREE.Mesh(new THREE.SphereGeometry(.3, 8, 6), mat(0x4fbf5a)); lf.scale.set(1.1, .22, .6); lf.position.set(s * .26, y + 1.05 + (s > 0 ? .1 : 0), 0); lf.rotation.z = s * .5; g.add(lf); }
  } else if (i === 1) { // wang tunai + syiling
    for (let k = 0; k < 4; k++) { const b = new THREE.Mesh(new THREE.BoxGeometry(1.3, .07, .66), mat(0x3f9e6a)); b.position.set(0, y + .05 + k * .075, 0); b.rotation.y = (k - 1.5) * .12; g.add(b); const b2 = new THREE.Mesh(new THREE.BoxGeometry(.5, .075, .3), mat(0xcfe8c8)); b2.position.set(0, y + .05 + k * .075, 0); b2.rotation.y = (k - 1.5) * .12; g.add(b2); }
    for (let k = 0; k < 6; k++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(.3, .3, .06, 14), goldFlat); c.position.set(.95, y + .04 + k * .065, .1); g.add(c); }
    for (let k = 0; k < 3; k++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(.3, .3, .06, 14), goldFlat); c.position.set(-.95, y + .04 + k * .065, -.05); g.add(c); }
  } else if (i === 2) { // topi graduasi + skrol
    const base = new THREE.Mesh(new THREE.CylinderGeometry(.5, .56, .4, 12), mat(0x1b2a55)); base.position.y = y + .5; g.add(base);
    const top = new THREE.Mesh(new THREE.BoxGeometry(1.7, .07, 1.7), mat(0x0f1a3d)); top.position.y = y + .74; top.rotation.y = Math.PI / 4; g.add(top);
    const tas = new THREE.Mesh(new THREE.CylinderGeometry(.018, .018, .6, 5), goldFlat); tas.position.set(.82, y + .52, .82); g.add(tas);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(.07, 8, 6), goldFlat); ball.position.set(.82, y + .2, .82); g.add(ball);
    const sc = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, 1.0, 10), mat(0xf5e8c8)); sc.rotation.z = Math.PI / 2; sc.position.set(.2, y + .13, 1.0); g.add(sc);
    const rb = new THREE.Mesh(new THREE.CylinderGeometry(.14, .14, .1, 10), mat(0xc0392b)); rb.rotation.z = Math.PI / 2; rb.position.set(.2, y + .13, 1.0); g.add(rb);
  } else if (i === 3) { // Kaabah
    const k = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.35, 1.2), mat(0x0c0c10, { roughness: .5 })); k.position.y = y + .72; g.add(k);
    const band = new THREE.Mesh(new THREE.BoxGeometry(1.23, .17, 1.23), goldFlat); band.position.y = y + 1.05; g.add(band);
    const door = new THREE.Mesh(new THREE.BoxGeometry(.32, .56, .04), goldFlat); door.position.set(-.25, y + .42, .62); g.add(door);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25, .06, 6, 40), mat(0xf2ead8)); ring.rotation.x = Math.PI / 2; ring.position.y = y + .08; g.add(ring);
  } else if (i === 4) { // rumah + pokok low-poly
    const wl = new THREE.Mesh(new THREE.BoxGeometry(1.6, .95, 1.2), mat(0xf1e6d2)); wl.position.y = y + .48; g.add(wl);
    const rf = new THREE.Mesh(new THREE.ConeGeometry(1.35, .75, 4), mat(0xb5412b)); rf.rotation.y = Math.PI / 4; rf.scale.z = .8; rf.position.y = y + 1.32; g.add(rf);
    const dr = new THREE.Mesh(new THREE.BoxGeometry(.3, .55, .05), mat(0x5b3a22)); dr.position.set(0, y + .28, .62); g.add(dr);
    for (const s of [-1, 1]) { const w = new THREE.Mesh(new THREE.BoxGeometry(.32, .3, .05), mat(0xffd98a, { emissive: 0xffc860, emissiveIntensity: .8 })); w.position.set(s * .5, y + .55, .62); g.add(w); }
    for (const [tx, tz, s] of [[-1.45, .2, 1], [1.5, -.1, .8]]) { for (let k = 0; k < 3; k++) { const c = new THREE.Mesh(new THREE.ConeGeometry(.42 * s * (1 - k * .2), .5 * s, 6), mat(0x2f8f3a)); c.position.set(tx, y + (.55 + k * .3) * s, tz); g.add(c); } const tr = new THREE.Mesh(new THREE.CylinderGeometry(.06, .08, .35 * s, 5), mat(0x6b4423)); tr.position.set(tx, y + .17 * s, tz); g.add(tr); }
  } else if (i === 5) { // kereta
    const body = new THREE.Mesh(new RoundedBoxGeometry(2.1, .5, .95, 3, .12), mat(0x1c6f8a, { roughness: .4, metalness: .35 })); body.position.y = y + .42; g.add(body);
    const cab = new THREE.Mesh(new RoundedBoxGeometry(1.05, .42, .85, 3, .12), mat(0x2d8fae, { roughness: .4, metalness: .3 })); cab.position.set(-.1, y + .82, 0); g.add(cab);
    const gl = new THREE.Mesh(new THREE.BoxGeometry(.9, .26, .88), mat(0x121a2a, { roughness: .2, metalness: .6 })); gl.position.set(-.1, y + .84, 0); g.add(gl);
    for (const [wx, wz] of [[.65, .5], [.65, -.5], [-.7, .5], [-.7, -.5]]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(.27, .27, .2, 14), mat(0x101010)); w.rotation.x = Math.PI / 2; w.position.set(wx, y + .27, wz); g.add(w); const hb = new THREE.Mesh(new THREE.CylinderGeometry(.11, .11, .22, 8), goldFlat); hb.rotation.x = Math.PI / 2; hb.position.set(wx, y + .27, wz); g.add(hb); }
    for (const z of [-.3, .3]) { const hl = new THREE.Mesh(new THREE.BoxGeometry(.06, .1, .2), mat(0xfff2c0, { emissive: 0xffe6a0, emissiveIntensity: 1 })); hl.position.set(1.07, y + .46, z); g.add(hl); }
  } else { // perisai + keluarga
    const s = new THREE.Shape(); s.moveTo(0, .95); s.lineTo(.8, .75); s.lineTo(.8, .15); s.quadraticCurveTo(.8, -.45, 0, -.8); s.quadraticCurveTo(-.8, -.45, -.8, .15); s.lineTo(-.8, .75); s.closePath();
    const outer = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: .12, bevelEnabled: true, bevelThickness: .03, bevelSize: .03, bevelSegments: 2 }), goldM); outer.position.set(0, y + 1.35, -.2); g.add(outer);
    const s2 = s.clone(); const inner = new THREE.Mesh(new THREE.ExtrudeGeometry(s2, { depth: .1, bevelEnabled: false }), mat(0x1f5fbf, { roughness: .4 })); inner.scale.set(.82, .82, 1); inner.position.set(0, y + 1.35, -.05); g.add(inner);
    for (const [fx, h, c] of [[-.38, .5, 0xf6c9a0], [.0, .38, 0xf6c9a0], [.38, .5, 0xf6c9a0]]) { const b = new THREE.Mesh(new THREE.CapsuleGeometry(.14, h, 4, 8), mat([0x2d8fae, 0xe35d6a, 0xf0b93a][Math.round(fx * 2.6) + 1] || 0x2d8fae)); b.position.set(fx, y + .72 + h / 2 - .05, .35); g.add(b); const hd = new THREE.Mesh(new THREE.SphereGeometry(.13, 10, 8), mat(c)); hd.position.set(fx, y + .72 + h + .32, .35); g.add(hd); }
    const dome = new THREE.Mesh(new THREE.SphereGeometry(1.5, 24, 16), new THREE.MeshBasicMaterial({ color: 0xedbf44, transparent: true, opacity: .1, depthWrite: false })); dome.position.y = y + 1.0; g.add(dome);
  }
  return g;
}
for (let i = 0; i < PED.length; i++) {
  const g = new THREE.Group(), h = hTop(i); g.position.x = px(i);
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.4, h, 48), new THREE.MeshStandardMaterial({ color: 0x111b36, metalness: .65, roughness: .32 })); ped.position.y = h / 2; g.add(ped);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25, .03, 8, 72), new THREE.MeshBasicMaterial({ color: 0xedbf44 })); ring.rotation.x = Math.PI / 2; ring.position.y = h; g.add(ring);
  const glow = new THREE.Mesh(new THREE.RingGeometry(1.4, 2.5, 64), new THREE.MeshBasicMaterial({ color: 0xedbf44, transparent: true, opacity: .1, blending: THREE.AdditiveBlending, depthWrite: false })); glow.rotation.x = -Math.PI / 2; glow.position.y = .012; g.add(glow);
  const sc = .35 + .55 * Math.log10(PED[i].w), bar = new THREE.Group();
  const bm = new THREE.Mesh(BARG, goldM); bar.add(bm);
  const top = new THREE.Mesh(new THREE.PlaneGeometry(1.4, .7), new THREE.MeshBasicMaterial({ map: engrave(PED[i].g.replace('g', ' g').replace('k g', ' kg')), transparent: true, depthWrite: false, toneMapped: false })); top.rotation.x = -Math.PI / 2; top.position.y = .425; bar.add(top);
  bar.scale.setScalar(sc * .58); bar.position.set(-.55, h + .21 * sc * .58 + .04, .85); g.add(bar); g.userData.bar = bar;
  const ic = icon(i); ic.position.set(.3, h + .02, -.85); ic.scale.setScalar(1.3); g.add(ic); g.userData.ic = ic;
  scene.add(g); pedG.push(g);
}
{ const pts = PED.map((_, i) => new THREE.Vector3(px(i), hTop(i) + .12, -2.7)); const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 90, .035, 6), new THREE.MeshBasicMaterial({ color: 0xedbf44, transparent: true, opacity: .75 })); scene.add(tube); }
// debu emas
const DN = 320, dpos = new Float32Array(DN * 3), dseed = []; for (let i = 0; i < DN; i++) { dseed.push([Math.random(), Math.random(), Math.random(), Math.random()]); }
const dgeo = new THREE.BufferGeometry(); dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
const dust = new THREE.Points(dgeo, new THREE.PointsMaterial({ size: .06, color: 0xf2c14e, transparent: true, opacity: .55, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false })); dust.frustumCulled = false; scene.add(dust);

function update3D(t) {
  const p = sideP(t), u = tween(UKEY, t, 1), ww = tween(WKEY, t, 0);
  const ui = clamp(u, 0, 6), i0 = Math.floor(ui), i1 = Math.min(6, i0 + 1), f = ui - i0;
  const tx = lerp(px(i0), px(i1), f), ty = lerp(hTop(i0), hTop(i1), f) + 1.0;
  const sway = Math.sin(t * .4) * .45;
  const nx = tx + sway, ny = ty + 2.5, nz = 10.8;
  const wx = px(3.5), wy = 6.0, wz = 46, wty = 1.7;
  const cx = lerp(nx, wx, ww), cy = lerp(ny, wy, ww), cz = lerp(nz, wz, ww), lx = lerp(tx, wx, ww), ly = lerp(ty, wty, ww);
  cam.position.set(cx - 1.2 * (1 - ww), cy, cz); cam.lookAt(lx, ly, 0);
  const sx = PED_SX(p), shx = (sx - 960) * (1 - ww) + (-410) * ww, shy = 200 * (1 - ww) + 40 * ww;
  cam.setViewOffset(W, H, -shx, -shy, W, H); cam.updateProjectionMatrix();
  key.position.set(tx + 5, 9, 8); key.target.position.set(tx, 1, 0); rim.position.set(tx - 6, 5, -9); rim.target.position.set(tx, 1, 0);
  pedG.forEach((g, i) => { g.userData.bar.rotation.y = .35 * Math.sin(t * .6 + i); g.userData.bar.position.y += 0; g.userData.ic.rotation.y = .18 * Math.sin(t * .5 + i * 1.3); });
  const a = dgeo.attributes.position.array; for (let i = 0; i < DN; i++) { const s = dseed[i]; a[i * 3] = -6 + s[0] * 50 + Math.sin(t * .3 + s[3] * 6) * .6; a[i * 3 + 1] = (s[1] * 9 + t * (.12 + s[3] * .15)) % 9; a[i * 3 + 2] = -8 + s[2] * 15; }
  dgeo.attributes.position.needsUpdate = true;
  scene.fog.near = lerp(14, 45, ww); scene.fog.far = lerp(50, 170, ww);
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
  if (bl > .8) { blurText(txt, o.x, by + dy, F(900, o.s), GOLD, -o.s * .035, bl, a); if (o.label) blurText(o.label, o.x + 4, by + o.s * .47 + dy, F(800, o.s * .3), '#fff', o.s * .02, bl, a); return; }
  X.save(); X.globalAlpha = a; X.font = F(900, o.s); setLS(-o.s * .035); X.fillStyle = 'rgba(0,0,0,.4)'; X.fillText(txt, o.x + 4, by + 7 + dy); X.fillStyle = GOLD; X.fillText(txt, o.x, by + dy);
  if (o.label) { X.font = F(800, o.s * .3); setLS(o.s * .02); X.fillStyle = '#fff'; X.fillText(o.label, o.x + 4, by + o.s * .47 + dy); }
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

// ---------------------------------------------------------------- garis masa teks (saat; mengikut sebutan)
const TXL = 800, TXR = 520; // x blok teks bila Taufik di kiri / kanan
function textLayer(t) {
  const L = s => (s === 'L' ? TXL : TXR);
  const num = (x, y, from, to, t0, c0, c1, tEx, suf, label, fmt, s = 200) => counter({ x, y, from, to, t0, c0, c1, tEx, suf, label, fmt, s }, t);
  const kfmt = v => Math.round(v).toLocaleString('en-US');
  let x = L('L');
  // T1 — 10g (L)
  block([{ t: 'Dengan sekeping', s: 50, w: 800 }], x, 92, t, .25, 3.85);
  num(x, 150, 0, 10, .75, .95, 1.5, 3.85, 'g', 'EMAS');
  block([{ t: 'ini, anda boleh cover', s: 50, w: 800 }], x, 450, t, 2.6, 3.85);
  block([{ t: 'Perbelanjaan', s: 86, w: 900 }, { t: 'bulanan', s: 86, w: 900 }], x, 92, t, 4.0, 8.35);
  num(x, 290, 0, 4000, 5.6, 5.65, 6.54, 8.35, '', null, v => 'RM' + kfmt(v), 118);
  block([{ t: 'hingga', s: 44, w: 800 }], x, 424, t, 6.75, 8.35);
  num(x, 492, 4000, 5000, 6.95, 6.95, 7.53, 8.35, '', null, v => 'RM' + kfmt(v), 118);
  // T2 — 20g (L)
  block([{ t: 'Bila simpan', s: 50, w: 800 }], x, 92, t, 8.9, 10.65);
  num(x, 150, 0, 20, 9.1, 9.3, 10.24, 10.65, 'g', 'EMAS');
  block([{ t: 'Pembiayaan anak', s: 70, w: 900 }, { t: 'di *universiti', s: 70, w: 900 }], x, 92, t, 11.8, 14.55);
  block([{ t: 'untuk', s: 44, w: 800 }], x, 232, t, 14.75, 16.2);
  stamp('1 SEMESTER', x + 190, 350, 70, t, 15.25, 16.25);
  // T3 — 50g (R)
  x = L('R');
  block([{ t: 'Bila simpan emas', s: 50, w: 800 }], x, 92, t, 17.8, 19.2);
  num(x, 150, 0, 50, 17.95, 18.1, 19.09, 19.2, 'g', 'EMAS');
  block([{ t: 'Menunaikan', s: 86, w: 900 }, { t: '*umrah', s: 86, w: 900 }], x, 92, t, 19.75, 22.4);
  block([{ t: 'dengan selesa', s: 52, w: 800 }], x, 300, t, 21.3, 24.4);
  block([{ t: 'untuk anda', s: 52, w: 800 }, { t: 'dan juga *pasangan', s: 52, w: 800 }], x, 360, t, 22.6, 24.4);
  // T4 — 100g (R)
  block([{ t: 'Bila simpan', s: 50, w: 800 }], x, 92, t, 24.95, 27.1);
  num(x, 150, 0, 100, 25.2, 25.4, 26.3, 27.1, 'g', 'EMAS');
  block([{ t: 'Deposit untuk', s: 70, w: 900 }, { t: 'rumah pertama', s: 70, w: 900 }], x, 92, t, 28.3, 31.5);
  block([{ t: 'bernilai lebih', s: 44, w: 800 }], x, 290, t, 31.55, 34.0);
  num(x, 340, 0, 500000, 31.9, 32.0, 33.0, 34.0, '', null, v => 'RM' + kfmt(v), 118);
  // T5 — 250g (L)
  x = L('L');
  block([{ t: 'Bila simpan emas', s: 50, w: 800 }], x, 92, t, 34.55, 36.4);
  num(x, 150, 0, 250, 34.75, 35.1, 36.15, 36.4, 'g', 'EMAS');
  block([{ t: 'Kereta selesa', s: 78, w: 900 }, { t: 'untuk *keluarga', s: 78, w: 900 }], x, 92, t, 38.3, 41.9);
  stamp('TANPA BERHUTANG', x + 300, 345, 58, t, 40.3, 41.9);
  // T6 — 1kg (L)
  block([{ t: 'Dan bila berjaya', s: 50, w: 800 }], x, 92, t, 42.35, 45.4);
  num(x, 150, 0, 1, 42.9, 43.9, 44.83, 45.6, ' kg', 'EMAS', v => (v < .995 ? v.toFixed(1) : '1'));
  block([{ t: 'Menjamin *keluarga', s: 70, w: 900 }], x, 92, t, 46.4, 49.7);
  block([{ t: 'daripada sebarang', s: 50, w: 800 }], x, 200, t, 47.8, 49.7);
  block([{ t: '*musibah kewangan', s: 62, w: 900 }], x, 262, t, 48.8, 49.7);
  // recap (R)
  x = L('R');
  block([{ t: 'Dalam simpanan emas,', s: 56, w: 800 }], x, 92, t, 50.3, 51.3);
  block([{ t: 'Tetapkan', s: 100, w: 900 }, { t: '*matlamat', s: 100, w: 900 }], x, 92, t, 51.4, 53.2);
  // CTA (R)
  block([{ t: 'dan bermula dengan', s: 50, w: 800 }], x, 92, t, 53.7, 56.6);
  num(x, 150, 0, 1, 54.4, 54.6, 55.3, 58.8, ' gram', 'EMAS YANG PERTAMA', v => Math.round(v));
}
async function overlay(t) {
  // kad B-roll
  let q0 = performance.now(); const P = window.__prof || (window.__prof = {}), lp = k => { if (Q.get('prof') === '1') X.getImageData(0, 0, 1, 1); P[k] = (P[k] || 0) + performance.now() - q0; q0 = performance.now(); };
  for (const c of CARDS) await drawCard(c, t);
  lp('o_cards'); textLayer(t); lp('o_text');
  // tag 3D (leader line)
  const p = sideP(t), s = (a, b) => (p < .5 ? a : b);
  const T = (i, txt, sub, t0, t1, dx = 150, dy = -140) => { const g = pedG[i], [ax, ay] = proj(px(i), hTop(i) + 1.5, -.9); const sgn = p < .5 ? 1 : -1; tag(txt, sub, ax, ay, ax + sgn * dx, ay + dy, t, t0, t1); };
  T(1, 'Perbelanjaan bulanan', null, 4.6, 8.3, -190, -30); T(2, 'Universiti', 'Pembiayaan 1 semester', 12.4, 16.2);
  T(3, 'Umrah', 'untuk anda & pasangan', 20.4, 24.4); T(4, 'Rumah pertama', 'bernilai lebih RM500,000', 28.0, 33.9, 150, -85);
  T(5, 'Kereta selesa', 'tanpa berhutang', 38.8, 41.8); T(6, 'Keluarga', 'terjamin daripada musibah', 46.8, 49.7);
  lp('o_tags');
  if (t > 51.2 && t < 54.6) { const a = clamp((t - 51.4) / .5) * (1 - clamp((t - 54.0) / .5)); if (a > 0) { X.save(); X.globalAlpha = a; for (let i = 1; i <= 6; i++) { const [sx, sy] = proj(px(i), hTop(i) + 1.0, 0); X.font = F(900, 30); setLS(0); X.fillStyle = GOLD; X.textAlign = 'center'; X.shadowColor = 'rgba(0,0,0,.6)'; X.shadowBlur = 12; X.fillText(PED[i].g, sx, sy - 46); } X.restore(); } }
  if (t > 56.8) { const a = clamp((t - 56.8) / .5); X.save(); X.globalAlpha = a; X.font = F(800, 22); setLS(2); X.fillStyle = 'rgba(255,255,255,.88)'; X.textAlign = 'left'; X.fillText('EKOSISTEM GAP PUBLIC GOLD', 70, H - 52); X.fillStyle = GOLD; X.font = F(800, 20); X.fillText('@taufik.pg', 70, H - 22); X.restore(); }
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
