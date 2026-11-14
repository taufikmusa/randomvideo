// Cut-06 (Taufik) 1920x1080 — "Kenapa ramai nak jadi dealer Public Gold" (pendapatan pasif vs aktif).
// Gaya explainer dokumentari (rujukan) + stage Three.js. Semua dikawal masa t (saat); renderFrame(n) deterministik.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const W = 1920, H = 1080, FPS = 30, VOICE = 78.44, DUR = VOICE + 0.8, TAU_N = 2353;
const GOLD = '#EDBF44', NAVY = '#070B16';
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const eoc = t => 1 - Math.pow(1 - t, 3);
const eio = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const eob = t => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const pad = (n, k) => String(n).padStart(k, '0');

// ---------------------------------------------------------------- B-roll (bilangan frame @30fps)
const CLIPN = { 'Selfie-Public_Gold-Menara-Enterance': 284, 'Doodly-Gaji-1': 226, 'Others-kerja': 151, 'Doodly-Gaji-5': 135, 'Bank-3': 196, 'Doodly-Gaji-3': 135, 'Others-tiap_bulan': 121, 'Website-Saya': 274, 'Selfie-Public_Gold-Menara-01': 171, 'Others-masa_berlalu': 121, 'Others-anak': 151, 'Guru-1': 135, 'Emas-goldbar': 151, 'Selfie-Public_Gold-Menara': 169, 'Check-1': 196 };
// side = sisi Taufik semasa kad (L: Taufik kiri, kad di kanan). sp = kelajuan main (elak ping-pong pada doodle).
const CARDS = [
  { n: 'Selfie-Public_Gold-Menara-Enterance', t0: .3, t1: 3.7, side: 'L', sp: .9 }, { n: 'Doodly-Gaji-1', t0: 3.9, t1: 8.2, side: 'L', sp: 1 },
  { n: 'Others-kerja', t0: 8.4, t1: 12.4, side: 'L', sp: .9 }, { n: 'Doodly-Gaji-5', t0: 12.6, t1: 15.5, side: 'L', sp: 1 }, { n: 'Bank-3', t0: 15.7, t1: 20.4, side: 'L', sp: 1 },
  { n: 'Doodly-Gaji-3', t0: 21.6, t1: 26.7, side: 'R', sp: .85 }, { n: 'Others-tiap_bulan', t0: 27.0, t1: 32.8, side: 'R', sp: .65 }, { n: 'Website-Saya', t0: 34.0, t1: 41.0, side: 'R', sp: 1 },
  { n: 'Selfie-Public_Gold-Menara-01', t0: 42.4, t1: 47.5, side: 'L', sp: 1 }, { n: 'Others-masa_berlalu', t0: 47.8, t1: 51.9, side: 'L', sp: .9 }, { n: 'Others-anak', t0: 52.3, t1: 56.5, side: 'L', sp: 1 },
  { n: 'Guru-1', t0: 59.0, t1: 63.8, side: 'L', sp: .9 },
  { n: 'Emas-goldbar', t0: 65.2, t1: 68.6, side: 'R', sp: 1 }, { n: 'Selfie-Public_Gold-Menara', t0: 69.0, t1: 72.3, side: 'R', sp: 1 }, { n: 'Check-1', t0: 72.5, t1: 78.2, side: 'R', sp: .95 },
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

// ---------------------------------------------------------------- stage: 0 hero, 1 faucet (aktif), 2 rumah sewa (pasif), 3 PGBO, 4 infiniti (royalti), 5 timbunan emas, 6 tangga 5 langkah
const XS = [-7, 0, 7, 14, 21, 28, 35], TY = [1.2, 1.9, 1.7, 1.5, 2.0, 1.5, 1.3];
const UKEY = [[7.8, 9.2, 0, 1], [20.2, 21.4, 1, 2], [32.7, 33.9, 2, 3], [41.0, 42.3, 3, 4], [56.2, 57.5, 4, 5], [67.8, 69.0, 5, 6]];
function tween(keys, t, init) { let v = init; for (const [a, b, f, g] of keys) { if (t >= b) v = g; else if (t >= a) { v = lerp(f, g, eio((t - a) / (b - a))); break; } else break; } return v; }
const SIDEK = [[20.3, 21.4, 0, 1], [41.1, 42.2, 1, 0], [63.8, 64.9, 0, 1]];
const sideP = t => tween(SIDEK, t, 0);
const TAU_X = p => lerp(-8, 1172, p), PED_SX = p => lerp(1090, 830, p);
// masa kunci (saat) — ditala dengan sebutan
const T_STOP = 17.9, T_FLOW0 = 8.7;

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

// stage 0 — hero bar
const P0 = pedestal(XS[0], .5, 1.5), HERO = makeBar('PUBLIC GOLD', 'FINE GOLD  999.9', 1.35); HERO.position.set(0, .5 + .21 * 1.35 + .04, .2); P0.add(HERO);
for (const [cx, cz, n] of [[-1.0, .55, 5], [1.05, .45, 3]]) for (let k = 0; k < n; k++) { const c = new THREE.Mesh(coinGeo, goldFlat); c.position.set(cx, .52 + k * .05, cz); P0.add(c); }

// stage 1 — faucet (pendapatan aktif)
const P1 = pedestal(XS[1], .45, 1.5), JAR1 = jar(0, .45);
{
  const pipe = new THREE.Mesh(new THREE.CylinderGeometry(.18, .18, 3.4, 16), metalM); pipe.rotation.z = Math.PI / 2; pipe.position.set(-1.7, 3.7, 0); scene.add(pipe); pipe.position.x += XS[1];
  const nz = new THREE.Mesh(new THREE.CylinderGeometry(.2, .12, .6, 16), metalM); nz.position.set(XS[1], 3.45, 0); scene.add(nz);
  const el = new THREE.Mesh(new THREE.SphereGeometry(.2, 16, 12), metalM); el.position.set(XS[1], 3.7, 0); scene.add(el);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.2, .025, 8, 24), new THREE.MeshBasicMaterial({ color: 0xedbf44 })); ring.rotation.x = Math.PI / 2; ring.position.set(XS[1], 3.16, 0); scene.add(ring);
}
const VALVE = new THREE.Group(); VALVE.position.set(XS[1] - 1.1, 4.0, 0);
{ const st = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, .3, 8), metalM); st.position.y = -.1; VALVE.add(st); const w = new THREE.Mesh(new THREE.TorusGeometry(.36, .04, 8, 32), new THREE.MeshStandardMaterial({ color: 0xedbf44, metalness: .8, roughness: .3 })); w.rotation.x = Math.PI / 2; w.position.y = .12; VALVE.add(w); for (let k = 0; k < 3; k++) { const sp = new THREE.Mesh(new THREE.BoxGeometry(.72, .04, .04), new THREE.MeshStandardMaterial({ color: 0xedbf44, metalness: .8, roughness: .3 })); sp.position.y = .12; sp.rotation.y = k * Math.PI / 3; VALVE.add(sp); } scene.add(VALVE); }
const NC = 60, COINS = new THREE.InstancedMesh(coinGeo, goldFlat, NC); COINS.frustumCulled = false; scene.add(COINS);
const dummy = new THREE.Object3D();

// stage 2 — rumah sewa (pasif)
const P2 = pedestal(XS[2], .45, 1.6), HOUSE = new THREE.Group(); HOUSE.position.set(XS[2] - 1.0, .45, -.2); scene.add(HOUSE);
{
  const wl = new THREE.Mesh(new THREE.BoxGeometry(1.6, .95, 1.2), mat(0xf1e6d2)); wl.position.y = .48; HOUSE.add(wl);
  const rf = new THREE.Mesh(new THREE.ConeGeometry(1.35, .75, 4), mat(0xb5412b)); rf.rotation.y = Math.PI / 4; rf.scale.z = .8; rf.position.y = 1.32; HOUSE.add(rf);
  const dr = new THREE.Mesh(new THREE.BoxGeometry(.3, .55, .05), mat(0x5b3a22)); dr.position.set(0, .28, .62); HOUSE.add(dr);
  for (const s of [-1, 1]) { const w = new THREE.Mesh(new THREE.BoxGeometry(.32, .3, .05), mat(0xffd98a, { emissive: 0xffc860, emissiveIntensity: .8 })); w.position.set(s * .5, .55, .62); HOUSE.add(w); }
  for (const [tx, tz, s] of [[-1.3, .3, .9]]) { for (let k = 0; k < 3; k++) { const c = new THREE.Mesh(new THREE.ConeGeometry(.42 * s * (1 - k * .2), .5 * s, 6), mat(0x2f8f3a)); c.position.set(tx, (.55 + k * .3) * s, tz); HOUSE.add(c); } const tr = new THREE.Mesh(new THREE.CylinderGeometry(.06, .08, .35 * s, 5), mat(0x6b4423)); tr.position.set(tx, .17 * s, tz); HOUSE.add(tr); }
}
const JAR2 = jar(XS[2] + 1.9, .45);
const NR = 4, RCOINS = new THREE.InstancedMesh(coinGeo, goldFlat, NR); RCOINS.frustumCulled = false; scene.add(RCOINS);

// stage 3 — PGBO 3D
const FONT = new FontLoader().parse(await (await fetch('assets/vendor/three/addons/fonts/helvetiker_bold.typeface.json')).json());
const P3 = pedestal(XS[3], .5, 1.8);
const PG = (() => { const g = new TextGeometry('PGBO', { font: FONT, size: 1.0, depth: .42, curveSegments: 8, bevelEnabled: true, bevelThickness: .05, bevelSize: .035, bevelSegments: 3 }); g.computeBoundingBox(); const bb = g.boundingBox; g.translate(-(bb.max.x + bb.min.x) / 2, 0, -.21); const m = new THREE.Mesh(g, goldM); m.position.set(XS[3], .5 + .2, 0); scene.add(m); return m; })();
const ORB = new THREE.Mesh(new THREE.TorusGeometry(1.7, .025, 8, 80), new THREE.MeshBasicMaterial({ color: 0xedbf44, transparent: true, opacity: .8 })); ORB.position.set(XS[3], 1.5, 0); ORB.rotation.x = Math.PI / 2.4; scene.add(ORB);
const ORB2 = ORB.clone(); ORB2.scale.setScalar(1.18); ORB2.rotation.x = Math.PI / 2.1; ORB2.rotation.y = .6; scene.add(ORB2);

// stage 4 — infiniti (royalti tidak berhenti) + keluarga (waris)
const P4 = pedestal(XS[4], .4, 1.5);
const LEM = new THREE.CatmullRomCurve3(Array.from({ length: 160 }, (_, i) => { const a = i / 160 * Math.PI * 2, d = 1 + Math.sin(a) ** 2; return new THREE.Vector3(2.3 * Math.cos(a) / d, 2.3 * Math.sin(a) * Math.cos(a) / d, 0); }), true);
const LOOP = new THREE.Mesh(new THREE.TubeGeometry(LEM, 200, .075, 10, true), goldM); LOOP.position.set(XS[4], 2.3, 0); scene.add(LOOP);
const NL = 9, LCOINS = new THREE.InstancedMesh(new THREE.SphereGeometry(.17, 16, 12), goldM, NL); LCOINS.frustumCulled = false; scene.add(LCOINS);
const FAM = new THREE.Group(); FAM.position.set(XS[4], .4, .6); scene.add(FAM);
for (const [fx, h, c] of [[-.7, .62, 0x2d8fae], [0, .46, 0xe35d6a], [.7, .62, 0xf0b93a]]) { const b = new THREE.Mesh(new THREE.CapsuleGeometry(.17, h, 4, 8), mat(c)); b.position.set(fx, h / 2 + .17, 0); FAM.add(b); const hd = new THREE.Mesh(new THREE.SphereGeometry(.16, 10, 8), mat(0xf6c9a0)); hd.position.set(fx, h + .5, 0); FAM.add(hd); }

// stage 5 — timbunan emas (customer kaya)
const P5 = pedestal(XS[5], .4, 1.9), STACK = [];
{ const rows = [4, 3, 2, 1], sc = .55; let k = 0; for (let z = 0; z < 2; z++) for (let r = 0; r < rows.length; r++) for (let i = 0; i < rows[r]; i++) { const b = makeBar(null, null, sc); b.position.set(XS[5] + (i - (rows[r] - 1) / 2) * 1.0, .4 + .23 * sc / .55 * r + .115 * sc / .55 * 1.0 + .01, (z - .5) * .62); b.userData.k = k++; scene.add(b); STACK.push(b); } }
STACK.forEach((b, i) => { b.userData.t = 58.9 + i * .26; });

// stage 6 — tangga 5 langkah
const P6 = pedestal(XS[6], .3, 2.5), STEPS = [];
for (let k = 0; k < 5; k++) { const h = .22 * (k + 1) + .3, st = new THREE.Mesh(new THREE.BoxGeometry(.8, h, 1.7), new THREE.MeshStandardMaterial({ color: 0x142048, metalness: .55, roughness: .35, emissive: 0xedbf44, emissiveIntensity: 0 })); st.position.set(XS[6] + (k - 2) * .82, h / 2, 0); scene.add(st); const lip = new THREE.Mesh(new THREE.BoxGeometry(.8, .05, 1.7), new THREE.MeshBasicMaterial({ color: 0xedbf44 })); lip.position.set(XS[6] + (k - 2) * .82, h + .005, 0); scene.add(lip); STEPS.push(st); }
const TOP_BAR = makeBar('PUBLIC GOLD', '999.9', .55); TOP_BAR.position.set(XS[6] + 2 * .82, .22 * 5 + .3 + .13, 0); scene.add(TOP_BAR);

// debu emas
const DN = 320, dpos = new Float32Array(DN * 3), dseed = []; for (let i = 0; i < DN; i++) { dseed.push([Math.random(), Math.random(), Math.random(), Math.random()]); }
const dgeo = new THREE.BufferGeometry(); dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
const dust = new THREE.Points(dgeo, new THREE.PointsMaterial({ size: .06, color: 0xf2c14e, transparent: true, opacity: .55, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false })); dust.frustumCulled = false; scene.add(dust);

function update3D(t) {
  const p = sideP(t), u = tween(UKEY, t, 0), i0 = Math.floor(clamp(u, 0, 6)), i1 = Math.min(6, i0 + 1), f = clamp(u, 0, 6) - i0;
  const tx = lerp(XS[i0], XS[i1], f), ty = lerp(TY[i0], TY[i1], f), sway = Math.sin(t * .4) * .45;
  cam.position.set(tx + sway - 1.2, ty + 2.5, 10.8); cam.lookAt(tx, ty, 0);
  const shx = PED_SX(p) - 960; cam.setViewOffset(W, H, -shx, -200, W, H); cam.updateProjectionMatrix();
  key.position.set(tx + 5, 9, 8); key.target.position.set(tx, 1, 0); rim.position.set(tx - 6, 5, -9); rim.target.position.set(tx, 1, 0);
  HERO.rotation.y = .5 * Math.sin(t * .5);
  // faucet: koin jatuh sepanjang T_FLOW0..T_STOP
  const landedN = clamp(Math.floor((t - T_FLOW0 - .7) / .22) + 1, 0, 45);
  for (let i = 0; i < NC; i++) {
    const ts = T_FLOW0 + .22 * i, dt = t - ts; dummy.rotation.set(1.1, dt * 5, 0); dummy.scale.setScalar(1.5);
    if (ts > T_STOP || dt < 0) { dummy.position.set(0, -50, 0); } else { const y = 3.2 - 4.5 * dt * dt; const ground = .45 + .08 + (landedN / 45) * 1.1; if (y <= ground) { dummy.position.set(0, -50, 0); } else dummy.position.set(XS[1] + Math.sin(i * 7) * .08, y, Math.cos(i * 5) * .08); }
    dummy.updateMatrix(); COINS.setMatrixAt(i, dummy.matrix);
  }
  COINS.instanceMatrix.needsUpdate = true;
  JAR1.userData.pile.scale.y = Math.max(.001, landedN / 45 * 1.1); JAR1.userData.pile.position.y = JAR1.userData.pile.scale.y / 2 + .03;
  const open = t >= T_FLOW0 && t < T_STOP; VALVE.rotation.y = open ? (t - T_FLOW0) * 2.2 : (T_STOP - T_FLOW0) * 2.2; VALVE.children[1].material.color.set(t >= T_STOP ? 0xc0392b : 0xedbf44);
  // rumah sewa: koin melengkung dari rumah ke balang (bulanan)
  for (let i = 0; i < NR; i++) { const per = 1.15, ph = ((t - 21.0) / per + i / NR); const u2 = ph - Math.floor(ph); const sx = XS[2] - 1.0, ex = XS[2] + 1.9; dummy.position.set(lerp(sx, ex, u2), .45 + .9 + Math.sin(Math.PI * u2) * 1.3 - u2 * .3, .5); dummy.rotation.set(1.1, u2 * 8, 0); dummy.scale.setScalar(1.7); dummy.updateMatrix(); RCOINS.setMatrixAt(i, dummy.matrix); }
  RCOINS.instanceMatrix.needsUpdate = true;
  JAR2.userData.pile.scale.y = Math.max(.001, Math.min(1.15, (t - 21.0) * .045)); JAR2.userData.pile.position.y = JAR2.userData.pile.scale.y / 2 + .03;
  // PGBO
  PG.rotation.y = .4 * Math.sin(t * .6); ORB.rotation.z = t * .5; ORB2.rotation.z = -t * .4; ORB.position.y = 1.5 + Math.sin(t) * .1;
  // infiniti
  LOOP.rotation.y = .35 * Math.sin(t * .45); for (let i = 0; i < NL; i++) { const q = ((t * .09 + i / NL) % 1), pt = LEM.getPoint(q); dummy.position.set(XS[4] + pt.x * Math.cos(LOOP.rotation.y), 2.3 + pt.y, pt.x * Math.sin(LOOP.rotation.y)); dummy.rotation.set(0, 0, 0); dummy.scale.setScalar(1); dummy.updateMatrix(); LCOINS.setMatrixAt(i, dummy.matrix); }
  LCOINS.instanceMatrix.needsUpdate = true;
  FAM.scale.setScalar(eob(clamp((t - 52.0) / .7)) * 1 + .0001);
  // timbunan
  STACK.forEach(b => { const a = clamp((t - b.userData.t) / .45); b.scale.setScalar(Math.max(.0001, eob(a) * .55)); b.position.y += 0; });
  // tangga
  const t5 = 72.6; STEPS.forEach((s, k) => { const a = clamp((t - (t5 + k * .55)) / .4); s.material.emissiveIntensity = a * .55; });
  TOP_BAR.scale.setScalar(Math.max(.0001, eob(clamp((t - 75.3) / .6)) * .55)); TOP_BAR.rotation.y = t * .6;
  const a = dgeo.attributes.position.array; for (let i = 0; i < DN; i++) { const s = dseed[i]; a[i * 3] = -10 + s[0] * 52 + Math.sin(t * .3 + s[3] * 6) * .6; a[i * 3 + 1] = (s[1] * 9 + t * (.12 + s[3] * .15)) % 9; a[i * 3 + 2] = -8 + s[2] * 15; }
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

// ---------------------------------------------------------------- garis masa teks (saat; mengikut sebutan, ditala dengan align_words)
const AL = { pasif1: 7.9, aktif: 12.0, gaji: 15.05, gajiPunBerhenti: 20.1, pasif2: 23.2, sewa: 28.4, bulan: 29.34, pgbo: 39.14, royalti: 45.65, meninggal: 51.2, waris: 53.27, kunci: 60.0, kaya: 66.5, step5: 74.92 };
function textLayer(t) {
  const L = s => (s === 'L' ? 800 : 520);
  let x = L('L');
  const num = (xx, y, from, to, t0, c0, c1, tEx, suf, label, fmt, s = 200) => counter({ x: xx, y, from, to, t0, c0, c1, tEx, suf, label, fmt, s, ls: label && label.length > 18 ? .165 : .3 }, t);
  // hook (L)
  block([{ t: 'Kenapa ramai orang', s: 50, w: 800 }, { t: 'nak jadi dealer', s: 80, w: 900 }, { t: '*Public Gold?', s: 100, w: 900 }], x, 92, t, .25, 3.55);
  // pasif (L)
  block([{ t: 'Dealer Public Gold dapat', s: 50, w: 800 }], x, 92, t, 4.5, 8.4);
  block([{ t: 'pendapatan', s: 86, w: 900 }], x, 150, t, 6.3, 8.4);
  num(x, 240, 0, 1, AL.pasif1 - .8, 1, 1, 8.4, '', null, () => 'PASIF', 170);
  // aktif (L)
  block([{ t: 'Majoriti kita yang bekerja', s: 50, w: 800 }], x, 92, t, 8.5, 12.5);
  block([{ t: 'pendapatan', s: 86, w: 900 }], x, 150, t, 10.5, 12.5);
  num(x, 240, 0, 1, AL.aktif - .8, 1, 1, 12.5, '', null, () => 'AKTIF', 170);
  // gaji (L)
  block([{ t: 'Kena kerja,', s: 86, w: 900 }], x, 92, t, 12.75, 15.45);
  block([{ t: 'baru ada *gaji', s: 86, w: 900 }], x, 186, t, 13.9, 15.45);
  // manager bank (L)
  block([{ t: 'Contoh:', s: 50, w: 800 }], x, 92, t, 15.8, 20.3);
  block([{ t: '*manager di bank', s: 70, w: 900 }], x, 152, t, 16.3, 20.3);
  block([{ t: 'bila berhenti kerja,', s: 50, w: 800 }], x, 238, t, 17.6, 20.3);
  stamp('GAJI PUN BERHENTI', x + 330, 360, 58, t, AL.gajiPunBerhenti - .75, 20.3);
  // pasif (R)
  x = L('R');
  block([{ t: 'Berbeza dengan', s: 50, w: 800 }], x, 92, t, 21.5, 23.4);
  block([{ t: 'pendapatan', s: 86, w: 900 }], x, 150, t, 22.1, 23.4);
  num(x, 240, 0, 1, AL.pasif2 - .8, 1, 1, 23.4, '', null, () => 'PASIF', 170);
  block([{ t: 'Tetap ada', s: 86, w: 900 }], x, 92, t, 23.5, 26.7);
  block([{ t: 'walaupun kita tak mampu', s: 50, w: 800 }], x, 190, t, 24.4, 26.7);
  block([{ t: '*bekerja', s: 86, w: 900 }], x, 250, t, 25.6, 26.7);
  // rumah sewa (R)
  block([{ t: 'Macam', s: 50, w: 800 }], x, 92, t, 26.95, 28.5);
  block([{ t: 'rumah *sewa', s: 110, w: 900 }], x, 150, t, 27.3, 28.5);
  block([{ t: 'Setiap bulan', s: 50, w: 800 }], x, 92, t, 28.6, 32.9);
  block([{ t: 'duit *masuk', s: 110, w: 900 }], x, 150, t, AL.bulan + .35, 32.9);
  block([{ t: 'walaupun kita tak buat apa-apa', s: 50, w: 800 }], x, 290, t, 31.4, 32.9);
  // PGBO (R)
  block([{ t: 'Dealer Public Gold ni', s: 50, w: 800 }], x, 92, t, 33.2, 41.2);
  block([{ t: 'sebenarnya bukan', s: 50, w: 800 }], x, 150, t, 33.8, 36.0);
  block([{ t: 'AGEN', s: 140, w: 900 }], x, 190, t, 34.6, 36.2);
  strike('AGEN', x, 190 + 12, 140, t, 35.45, 35.85, 36.2);
  block([{ t: 'tetapi adalah', s: 50, w: 800 }], x, 150, t, 36.3, 41.2);
  num(x, 195, 0, 1, AL.pgbo - .8, 1, 1, 41.2, '', 'PUBLIC GOLD BUSINESS OWNER', () => 'PGBO', 200);
  // royalti (L)
  x = L('L');
  block([{ t: 'Kita rakan bisnes', s: 70, w: 900 }], x, 92, t, 41.6, 43.8);
  block([{ t: 'dengan *Public Gold', s: 50, w: 800 }], x, 180, t, 42.3, 43.8);
  block([{ t: 'dan kita dapat', s: 50, w: 800 }], x, 92, t, 44.0, 47.4);
  block([{ t: '*ROYALTI', s: 150, w: 900 }], x, 150, t, AL.royalti - .8, 47.4);
  block([{ t: 'sebagai pendapatan pasif', s: 50, w: 800 }], x, 316, t, 46.2, 47.4);
  block([{ t: 'Royalti', s: 86, w: 900 }], x, 92, t, 47.8, 52.0);
  block([{ t: '*tak berhenti', s: 86, w: 900 }], x, 186, t, 48.5, 52.0);
  block([{ t: 'walaupun dah meninggal dunia', s: 50, w: 800 }], x, 290, t, AL.meninggal - .9, 52.0);
  block([{ t: '*Waris', s: 110, w: 900 }], x, 92, t, 52.2, 56.4);
  block([{ t: 'boleh teruskan', s: 70, w: 900 }], x, 210, t, 53.2, 56.4);
  block([{ t: 'mewarisi pendapatan tersebut', s: 50, w: 800 }], x, 290, t, 54.4, 56.4);
  // kunci (L)
  block([{ t: 'Menjadi dealer di Public Gold', s: 50, w: 800 }], x, 92, t, 56.8, 58.7);
  block([{ t: '*Kuncinya', s: 110, w: 900 }], x, 92, t, AL.kunci - .6, 63.7);
  block([{ t: 'sentiasa *sabar', s: 62, w: 900 }], x, 212, t, 60.5, 63.7);
  block([{ t: 'dan *konsisten', s: 62, w: 900 }], x, 280, t, 61.4, 63.7);
  block([{ t: 'menyampaikan *ilmu emas yang betul', s: 46, w: 800 }], x, 356, t, 62.3, 63.7);
  // customer kaya (R)
  x = L('R');
  block([{ t: 'supaya customer', s: 50, w: 800 }], x, 92, t, 65.0, 67.9);
  block([{ t: '*KAYA', s: 170, w: 900 }], x, 150, t, AL.kaya - .45, 67.95);
  block([{ t: 'dengan simpanan emas', s: 60, w: 900 }], x, 330, t, 66.8, 67.95);
  // mula (R)
  block([{ t: 'Tuan puan yang nak mulakan', s: 50, w: 800 }], x, 92, t, 68.3, 72.3);
  block([{ t: 'simpanan *emas', s: 86, w: 900 }], x, 150, t, 69.0, 72.3);
  block([{ t: 'boleh bermula *hari ini', s: 70, w: 900 }], x, 256, t, 70.8, 72.3);
  // 5 step (R)
  block([{ t: 'Rujuk *pin video saya', s: 70, w: 900 }], x, 92, t, 72.55, 78.3);
  num(x, 175, 0, 5, AL.step5 - 1.2, AL.step5 - 1.0, AL.step5 - .1, 78.3, ' step', null, v => String(Math.round(v)), 150);
  block([{ t: 'Bagaimana nak mulakan', s: 46, w: 800 }], x, 360, t, 75.3, 78.3);
  block([{ t: 'simpanan emas di *Public Gold', s: 54, w: 900 }], x, 414, t, 75.9, 78.3);
}
async function overlay(t) {
  let q0 = performance.now(); const P = window.__prof || (window.__prof = {}), lp = k => { if (Q.get('prof') === '1') X.getImageData(0, 0, 1, 1); P[k] = (P[k] || 0) + performance.now() - q0; q0 = performance.now(); };
  for (const c of CARDS) await drawCard(c, t);
  lp('o_cards'); textLayer(t); lp('o_text');
  const p = sideP(t), sgn = p < .5 ? 1 : -1;
  const T = (wx, wy, wz, txt, sub, t0, t1, dx = 150, dy = -120) => { const [ax, ay] = proj(wx, wy, wz); tag(txt, sub, ax, ay, ax + sgn * dx, ay + dy, t, t0, t1); };
  T(XS[1], 3.45, 0, 'Pendapatan aktif', null, 9.0, 12.3, 150, 40);
  T(XS[1], 1.3, 0, 'Gaji', 'masuk selagi bekerja', 12.8, 15.4, 170, -30);
  T(XS[1] - 1.1, 4.0, 0, 'Berhenti kerja', 'gaji pun berhenti', 18.1, 20.3, 170, 80);
  T(XS[2] - 1.0, 1.9, -.2, 'Pendapatan pasif', null, 22.0, 26.6, 140, -90);
  T(XS[2] - 1.0, 1.9, -.2, 'Rumah sewa', 'duit masuk setiap bulan', 27.3, 32.8, 140, -60);
  T(XS[4] + 1.7, 2.3, 0, 'Royalti', null, 44.8, 47.4, 160, -80);
  T(XS[4], 1.35, .6, 'Waris', 'boleh teruskan', 52.8, 56.4, 150, -110);
  T(XS[5], 1.9, 0, 'Customer', 'kaya dengan simpanan emas', 66.0, 67.9, 150, -100);
  lp('o_tags');
  if (t > 72.5 && t < 78.3) { // nombor langkah 1..5 di atas anak tangga
    for (let k = 0; k < 5; k++) { const a0 = 72.6 + k * .55, a = clamp((t - a0) / .35) * (1 - clamp((t - 78.0) / .3)); if (a <= .01) continue; const h = .22 * (k + 1) + .3, [sx, sy] = proj(XS[6] + (k - 2) * .82, h + .35, 0); X.save(); X.globalAlpha = a; X.font = F(900, 40 + a * 8); setLS(0); X.textAlign = 'center'; X.fillStyle = GOLD; X.shadowColor = 'rgba(0,0,0,.6)'; X.shadowBlur = 8; X.fillText(String(k + 1), sx, sy - (1 - a) * 12); X.restore(); }
  }
  if (t > 76.6) { const a = clamp((t - 76.6) / .5); X.save(); X.globalAlpha = a; X.font = F(800, 22); setLS(2); X.fillStyle = 'rgba(255,255,255,.88)'; X.textAlign = 'left'; X.fillText('PUBLIC GOLD', sgn > 0 ? 70 : 520, H - 52); X.fillStyle = GOLD; X.font = F(800, 20); X.fillText('@taufik.pg', sgn > 0 ? 70 : 520, H - 22); X.restore(); }
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
