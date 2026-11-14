// Pustaka prop 3D untuk stage explainer. Setiap prop: (E, x, o) -> { ty, update(t), overlay?(t, ctx) }
//   E = persekitaran dari main.js (THREE, scene, bahan, pembantu). x = kedudukan X dunia. o = pilihan dari config.js
// Semua animasi ikut masa t (saat) supaya renderFrame(n) deterministik.
export function makeProps(E) {
  const { THREE, scene, mat, goldM, goldFlat, metalM, pedestal, jar, makeBar, coinGeo, clamp, lerp, eob, eoc, eio, FONT, TextGeometry } = E;
  const D = new THREE.Object3D();
  const GOLDC = 0xedbf44;
  const ringM = () => new THREE.MeshBasicMaterial({ color: GOLDC });
  const imesh = (geo, m, n) => { const im = new THREE.InstancedMesh(geo, m, n); im.frustumCulled = false; scene.add(im); return im; };
  const P = {};

  // ---- hero: bar emas atas pedestal + syiling
  P.hero = (x, o = {}) => {
    const ped = pedestal(x, .5, 1.5), bar = makeBar(o.l1 || 'PUBLIC GOLD', o.l2 || 'FINE GOLD  999.9', 1.35); bar.position.set(0, .5 + .21 * 1.35 + .04, .2); ped.add(bar);
    for (const [cx, cz, n] of [[-1.0, .55, 5], [1.05, .45, 3]]) for (let k = 0; k < n; k++) { const c = new THREE.Mesh(coinGeo, goldFlat); c.position.set(cx, .52 + k * .05, cz); ped.add(c); }
    return { ty: 1.2, update: t => { bar.rotation.y = .5 * Math.sin(t * .5); } };
  };

  // ---- faucet: paip + koin jatuh ke balang; injap jadi merah selepas t1
  P.faucet = (x, o = {}) => {
    const t0 = o.t0 ?? 1, t1 = o.t1 ?? 9, NC = 60, full = 45;
    pedestal(x, .45, 1.5); const J = jar(x, .45);
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(.18, .18, 3.4, 16), metalM); pipe.rotation.z = Math.PI / 2; pipe.position.set(x - 1.7, 3.7, 0); scene.add(pipe);
    const nz = new THREE.Mesh(new THREE.CylinderGeometry(.2, .12, .6, 16), metalM); nz.position.set(x, 3.45, 0); scene.add(nz);
    const el = new THREE.Mesh(new THREE.SphereGeometry(.2, 16, 12), metalM); el.position.set(x, 3.7, 0); scene.add(el);
    const rg = new THREE.Mesh(new THREE.TorusGeometry(.2, .025, 8, 24), ringM()); rg.rotation.x = Math.PI / 2; rg.position.set(x, 3.16, 0); scene.add(rg);
    const V = new THREE.Group(); V.position.set(x - 1.1, 4.0, 0);
    const vm = new THREE.MeshStandardMaterial({ color: GOLDC, metalness: .8, roughness: .3 }), rm = new THREE.MeshStandardMaterial({ color: 0xc0392b, metalness: .8, roughness: .3 });
    const st = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, .3, 8), metalM); st.position.y = -.1; V.add(st);
    const w = new THREE.Mesh(new THREE.TorusGeometry(.36, .04, 8, 32), vm); w.rotation.x = Math.PI / 2; w.position.y = .12; V.add(w);
    for (let k = 0; k < 3; k++) { const sp = new THREE.Mesh(new THREE.BoxGeometry(.72, .04, .04), vm); sp.position.y = .12; sp.rotation.y = k * Math.PI / 3; V.add(sp); } scene.add(V);
    const C = imesh(coinGeo, goldFlat, NC);
    return {
      ty: 1.9, anchors: { pipe: [x, 3.45, 0], jar: [x, 1.3, 0], valve: [x - 1.1, 4.0, 0] },
      update: t => {
        const landed = clamp(Math.floor((t - t0 - .7) / .22) + 1, 0, full);
        for (let i = 0; i < NC; i++) {
          const ts = t0 + .22 * i, dt = t - ts; D.rotation.set(1.1, dt * 5, 0); D.scale.setScalar(1.5);
          if (ts > t1 || dt < 0) D.position.set(0, -50, 0); else { const y = 3.2 - 4.5 * dt * dt, ground = .45 + .08 + (landed / full) * 1.1; if (y <= ground) D.position.set(0, -50, 0); else D.position.set(x + Math.sin(i * 7) * .08, y, Math.cos(i * 5) * .08); }
          D.updateMatrix(); C.setMatrixAt(i, D.matrix);
        }
        C.instanceMatrix.needsUpdate = true;
        J.userData.pile.scale.y = Math.max(.001, landed / full * 1.1); J.userData.pile.position.y = J.userData.pile.scale.y / 2 + .03;
        V.rotation.y = (t >= t0 && t < t1) ? (t - t0) * 2.2 : (t >= t1 ? (t1 - t0) * 2.2 : 0); w.material = (t >= t1) ? rm : vm;
      },
    };
  };

  // ---- house: rumah + koin melengkung ke balang (pasif bulanan)
  P.house = (x, o = {}) => {
    const t0 = o.t0 ?? 1; pedestal(x, .45, 1.6);
    const H = new THREE.Group(); H.position.set(x - 1.0, .45, -.2); scene.add(H);
    const wl = new THREE.Mesh(new THREE.BoxGeometry(1.6, .95, 1.2), mat(0xf1e6d2)); wl.position.y = .48; H.add(wl);
    const rf = new THREE.Mesh(new THREE.ConeGeometry(1.35, .75, 4), mat(0xb5412b)); rf.rotation.y = Math.PI / 4; rf.scale.z = .8; rf.position.y = 1.32; H.add(rf);
    const dr = new THREE.Mesh(new THREE.BoxGeometry(.3, .55, .05), mat(0x5b3a22)); dr.position.set(0, .28, .62); H.add(dr);
    for (const s of [-1, 1]) { const w = new THREE.Mesh(new THREE.BoxGeometry(.32, .3, .05), mat(0xffd98a, { emissive: 0xffc860, emissiveIntensity: .8 })); w.position.set(s * .5, .55, .62); H.add(w); }
    for (let k = 0; k < 3; k++) { const c = new THREE.Mesh(new THREE.ConeGeometry(.42 * .9 * (1 - k * .2), .45, 6), mat(0x2f8f3a)); c.position.set(-1.3, (.55 + k * .3) * .9, .3); H.add(c); }
    const tr = new THREE.Mesh(new THREE.CylinderGeometry(.06, .08, .32, 5), mat(0x6b4423)); tr.position.set(-1.3, .15, .3); H.add(tr);
    const J = jar(x + 1.9, .45), NR = 4, R = imesh(coinGeo, goldFlat, NR);
    return {
      ty: 1.7, anchors: { house: [x - 1.0, 1.9, -.2], jar: [x + 1.9, 1.3, 0] },
      update: t => {
        for (let i = 0; i < NR; i++) { const ph = (t - t0) / 1.15 + i / NR, u = ph - Math.floor(ph); D.position.set(lerp(x - 1, x + 1.9, u), .45 + .9 + Math.sin(Math.PI * u) * 1.3 - u * .3, .5); D.rotation.set(1.1, u * 8, 0); D.scale.setScalar(t < t0 ? .0001 : 1.7); D.updateMatrix(); R.setMatrixAt(i, D.matrix); }
        R.instanceMatrix.needsUpdate = true;
        J.userData.pile.scale.y = Math.max(.001, Math.min(1.15, (t - t0) * .045)); J.userData.pile.position.y = J.userData.pile.scale.y / 2 + .03;
      },
    };
  };

  // ---- text3d: perkataan emas 3D + dua gelang orbit
  P.text3d = (x, o = {}) => {
    pedestal(x, .5, o.r || 1.8);
    const g = new TextGeometry(o.text || 'PGBO', { font: FONT, size: o.size || 1.0, depth: .42, curveSegments: 8, bevelEnabled: true, bevelThickness: .05, bevelSize: .035, bevelSegments: 3 });
    g.computeBoundingBox(); const bb = g.boundingBox; g.translate(-(bb.max.x + bb.min.x) / 2, 0, -.21);
    const m = new THREE.Mesh(g, goldM); m.position.set(x, .5 + .2, 0); scene.add(m);
    const w = (bb.max.x - bb.min.x), ob = Math.max(1.7, w * .62);
    const A = new THREE.Mesh(new THREE.TorusGeometry(ob, .025, 8, 80), new THREE.MeshBasicMaterial({ color: GOLDC, transparent: true, opacity: .8 })); A.position.set(x, 1.5, 0); A.rotation.x = Math.PI / 2.4; scene.add(A);
    const B = A.clone(); B.scale.setScalar(1.18); B.rotation.x = Math.PI / 2.1; B.rotation.y = .6; scene.add(B);
    return { ty: 1.5, update: t => { m.rotation.y = .4 * Math.sin(t * .6); A.rotation.z = t * .5; B.rotation.z = -t * .4; A.position.y = 1.5 + Math.sin(t) * .1; } };
  };

  // ---- infinity: gelung infiniti emas + koin mengalir; o.fam = masa keluarga muncul (waris)
  P.infinity = (x, o = {}) => {
    pedestal(x, .4, 1.5);
    const LEM = new THREE.CatmullRomCurve3(Array.from({ length: 160 }, (_, i) => { const a = i / 160 * Math.PI * 2, d = 1 + Math.sin(a) ** 2; return new THREE.Vector3(2.3 * Math.cos(a) / d, 2.3 * Math.sin(a) * Math.cos(a) / d, 0); }), true);
    const LOOP = new THREE.Mesh(new THREE.TubeGeometry(LEM, 200, .075, 10, true), goldM); LOOP.position.set(x, 2.3, 0); scene.add(LOOP);
    const NL = 9, LC = imesh(new THREE.SphereGeometry(.17, 16, 12), goldM, NL);
    const FAM = new THREE.Group(); FAM.position.set(x, .4, .6); scene.add(FAM);
    for (const [fx, h, c] of [[-.7, .62, 0x2d8fae], [0, .46, 0xe35d6a], [.7, .62, 0xf0b93a]]) { const b = new THREE.Mesh(new THREE.CapsuleGeometry(.17, h, 4, 8), mat(c)); b.position.set(fx, h / 2 + .17, 0); FAM.add(b); const hd = new THREE.Mesh(new THREE.SphereGeometry(.16, 10, 8), mat(0xf6c9a0)); hd.position.set(fx, h + .5, 0); FAM.add(hd); }
    return {
      ty: 2.0, anchors: { loop: [x + 1.7, 2.3, 0], fam: [x, 1.35, .6] },
      update: t => {
        LOOP.rotation.y = .35 * Math.sin(t * .45);
        for (let i = 0; i < NL; i++) { const q = ((t * .09 + i / NL) % 1), pt = LEM.getPoint(q); D.position.set(x + pt.x * Math.cos(LOOP.rotation.y), 2.3 + pt.y, pt.x * Math.sin(LOOP.rotation.y)); D.rotation.set(0, 0, 0); D.scale.setScalar(1); D.updateMatrix(); LC.setMatrixAt(i, D.matrix); }
        LC.instanceMatrix.needsUpdate = true;
        FAM.scale.setScalar(o.fam == null ? .0001 : eob(clamp((t - o.fam) / .7)) + .0001);
      },
    };
  };

  // ---- pyramid: timbunan bar emas muncul satu-satu
  P.pyramid = (x, o = {}) => {
    const t0 = o.t0 ?? 1, dt = o.dt ?? .26; pedestal(x, .4, 1.9); const S = [];
    const rows = [4, 3, 2, 1], sc = .55; let k = 0;
    for (let z = 0; z < 2; z++) for (let r = 0; r < rows.length; r++) for (let i = 0; i < rows[r]; i++) { const b = makeBar(null, null, sc); b.position.set(x + (i - (rows[r] - 1) / 2) * 1.0, .4 + .23 * r + .115 + .01, (z - .5) * .62); b.userData.t = t0 + (k++) * dt; scene.add(b); S.push(b); }
    return { ty: 1.5, anchors: { top: [x, 1.9, 0] }, update: t => { S.forEach(b => { b.scale.setScalar(Math.max(.0001, eob(clamp((t - b.userData.t) / .45)) * .55)); }); } };
  };

  // ---- steps: tangga N langkah menyala satu-satu + bar di puncak; overlay nombor 1..N
  P.steps = (x, o = {}) => {
    const t0 = o.t0 ?? 1, dt = o.dt ?? .55, N = o.n ?? 5, tEnd = o.tEnd ?? 999, topAt = o.top ?? (t0 + N * dt + .3); pedestal(x, .3, 2.5); const ST = [], sw = N > 5 ? .66 : .82;
    for (let k = 0; k < N; k++) {
      const h = .22 * (k + 1) * (5 / N) + .3, s = new THREE.Mesh(new THREE.BoxGeometry(sw - .02, h, 1.7), new THREE.MeshStandardMaterial({ color: 0x142048, metalness: .55, roughness: .35, emissive: GOLDC, emissiveIntensity: 0 })); s.position.set(x + (k - (N - 1) / 2) * sw, h / 2, 0); scene.add(s);
      const lip = new THREE.Mesh(new THREE.BoxGeometry(sw - .02, .05, 1.7), ringM()); lip.position.set(x + (k - (N - 1) / 2) * sw, h + .005, 0); scene.add(lip); ST.push(s);
    }
    const hTop = .22 * 5 + .3, TB = makeBar('PUBLIC GOLD', '999.9', .55); TB.position.set(x + ((N - 1) / 2) * sw, hTop + .13, 0); scene.add(TB);
    return {
      ty: 1.3,
      update: t => { ST.forEach((s, k) => { s.material.emissiveIntensity = clamp((t - (t0 + k * dt)) / .4) * .55; }); TB.scale.setScalar(Math.max(.0001, eob(clamp((t - topAt) / .6)) * .55)); TB.rotation.y = t * .6; },
      overlay: (t, c) => {
        if (t < t0 || t > tEnd) return;
        for (let k = 0; k < N; k++) { const a0 = t0 + k * dt, a = clamp((t - a0) / .35) * (1 - clamp((t - (tEnd - .3)) / .3)); if (a <= .01) continue; const h = .22 * (k + 1) * (5 / N) + .3, [sx, sy] = c.proj(x + (k - (N - 1) / 2) * sw, h + .35, 0); c.numAt(String(k + 1), sx, sy - (1 - a) * 12, a); }
      },
    };
  };

  // ---- growth: carta palang menaik (pertumbuhan / simpanan bertambah)
  P.growth = (x, o = {}) => {
    const t0 = o.t0 ?? 1, dt = o.dt ?? .45, N = o.n ?? 6; pedestal(x, .3, 2.3); const B = [];
    for (let k = 0; k < N; k++) { const h = .55 + k * .5, m = new THREE.Mesh(new THREE.BoxGeometry(.58, 1, .8), k === N - 1 ? goldM : new THREE.MeshStandardMaterial({ color: 0x1b2d63, metalness: .6, roughness: .35, emissive: GOLDC, emissiveIntensity: .12 })); m.userData = { h, t: t0 + k * dt }; m.position.set(x + (k - (N - 1) / 2) * .8, .3, 0); scene.add(m); B.push(m); }
    return { ty: 1.8, anchors: { top: [x + ((N - 1) / 2) * .8, .3 + .55 + (N - 1) * .5 + .3, 0] }, update: t => { B.forEach(m => { const a = eob(clamp((t - m.userData.t) / .5)), h = Math.max(.001, m.userData.h * a); m.scale.y = h; m.position.y = .3 + h / 2; }); } };
  };

  // ---- shield: perisai (perlindungan / keselamatan) + bar emas di dalam
  P.shield = (x, o = {}) => {
    const t0 = o.t0 ?? 1; pedestal(x, .4, 1.7);
    const s = new THREE.Shape(); s.moveTo(0, 1.5); s.bezierCurveTo(1.0, 1.4, 1.35, 1.35, 1.35, 1.2); s.lineTo(1.35, .35); s.bezierCurveTo(1.35, -.7, .5, -1.2, 0, -1.55); s.bezierCurveTo(-.5, -1.2, -1.35, -.7, -1.35, .35); s.lineTo(-1.35, 1.2); s.bezierCurveTo(-1.35, 1.35, -1.0, 1.4, 0, 1.5);
    const g = new THREE.ExtrudeGeometry(s, { depth: .3, bevelEnabled: true, bevelThickness: .06, bevelSize: .06, bevelSegments: 3 }); g.translate(0, 0, -.15);
    const body = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: 0x1b2d63, metalness: .8, roughness: .3 })), rim = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: .05, bevelEnabled: false }), goldM);
    rim.scale.set(1.08, 1.06, 1); rim.position.z = -.26; const grp = new THREE.Group(); grp.add(body, rim); const bar = makeBar('PG', '999.9', .62); bar.position.set(0, -.2, .3); bar.rotation.x = -.3; grp.add(bar);
    grp.position.set(x, 2.35, 0); scene.add(grp);
    return { ty: 2.0, anchors: { shield: [x, 3.2, .3] }, update: t => { grp.rotation.y = .35 * Math.sin(t * .6); const a = eob(clamp((t - t0) / .7)); grp.scale.setScalar(Math.max(.0001, a * 1.05)); } };
  };

  // ---- coins: tiga tiang syiling tumbuh berperingkat (simpanan sikit-sikit)
  P.coins = (x, o = {}) => {
    const t0 = o.t0 ?? 1, dt = o.dt ?? .1, N = o.n ?? 24; pedestal(x, .35, 2.0); const cg = new THREE.CylinderGeometry(.3, .3, .07, 20), C = imesh(cg, goldFlat, N * 3);
    return { ty: 1.5, anchors: { top: [x, 2.4, 0] }, update: t => { for (let c = 0; c < 3; c++) for (let i = 0; i < N; i++) { const k = c * N + i, ts = t0 + i * dt + c * dt * .35, a = clamp((t - ts) / .25); D.position.set(x + (c - 1) * 1.05, .35 + i * .08 + (1 - eoc(a)) * 1.2, (c % 2) * .1); D.rotation.set(0, i * .3, 0); D.scale.setScalar(a <= 0 ? .0001 : 1); D.updateMatrix(); C.setMatrixAt(k, D.matrix); } C.instanceMatrix.needsUpdate = true; } };
  };

  // ---- clock: jam (masa) dengan jarum laju
  P.clock = (x, o = {}) => {
    const t0 = o.t0 ?? 0, sp = o.speed ?? 3; pedestal(x, .35, 1.7); const g = new THREE.Group(); g.position.set(x, 2.35, 0); scene.add(g);
    const face = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, .22, 48), new THREE.MeshStandardMaterial({ color: 0xf1e6d2, roughness: .6 })); face.rotation.x = Math.PI / 2; g.add(face);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.4, .09, 12, 64), goldM); g.add(rim);
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2, tk = new THREE.Mesh(new THREE.BoxGeometry(.06, i % 3 ? .16 : .28, .05), mat(0x222a44)); tk.position.set(Math.sin(a) * 1.15, Math.cos(a) * 1.15, .13); tk.rotation.z = -a; g.add(tk); }
    const hand = (len, w, col) => { const h = new THREE.Mesh(new THREE.BoxGeometry(w, len, .06), mat(col)); h.geometry.translate(0, len / 2 - .1, 0); h.position.z = .17; g.add(h); return h; };
    const hh = hand(.8, .1, 0x1a2342), mh = hand(1.1, .07, 0x1a2342), sh = hand(1.15, .03, 0xc0392b);
    return { ty: 2.0, anchors: { clock: [x, 3.9, 0] }, update: t => { g.rotation.y = .3 * Math.sin(t * .5); const u = Math.max(0, t - t0) * sp; mh.rotation.z = -u * 2; hh.rotation.z = -u * 2 / 12; sh.rotation.z = -u * 24; } };
  };

  // ---- globe: glob wayar emas
  P.globe = (x, o = {}) => {
    pedestal(x, .4, 1.6); const g = new THREE.Group(); g.position.set(x, 2.3, 0); scene.add(g);
    g.add(new THREE.Mesh(new THREE.SphereGeometry(1.35, 32, 24), new THREE.MeshStandardMaterial({ color: 0x14275a, metalness: .5, roughness: .4 })));
    g.add(new THREE.Mesh(new THREE.SphereGeometry(1.37, 20, 14), new THREE.MeshBasicMaterial({ color: GOLDC, wireframe: true, transparent: true, opacity: .5 })));
    for (const [la, lo] of [[.5, 1], [-.2, 2.4], [.1, -.8], [.7, -2]]) { const m = new THREE.Mesh(new THREE.SphereGeometry(.09, 10, 8), goldM); m.position.set(1.4 * Math.cos(la) * Math.cos(lo), 1.4 * Math.sin(la), 1.4 * Math.cos(la) * Math.sin(lo)); g.add(m); }
    return { ty: 2.0, anchors: { globe: [x, 3.8, 0] }, update: t => { g.rotation.y = t * .35; } };
  };

  // ---- chart: garis harga melukis diri (o.dir 'up' | 'down')
  P.chart = (x, o = {}) => {
    const t0 = o.t0 ?? 1, t1 = o.t1 ?? 4, up = (o.dir || 'up') === 'up'; pedestal(x, .3, 2.4);
    const base = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.8, .12), new THREE.MeshStandardMaterial({ color: 0x0f1a3a, metalness: .4, roughness: .5, transparent: true, opacity: .85 })); base.position.set(x, 2.05, -.2); scene.add(base);
    for (let i = 0; i < 5; i++) { const l = new THREE.Mesh(new THREE.BoxGeometry(4.2, .015, .02), new THREE.MeshBasicMaterial({ color: 0x2a3b6e })); l.position.set(x, .9 + i * .58, -.12); scene.add(l); }
    const pts = [], n = 10; for (let i = 0; i <= n; i++) { const u = i / n, wob = Math.sin(i * 2.3) * .22 + Math.sin(i * 5.1) * .1; pts.push(new THREE.Vector3(x - 1.9 + u * 3.8, (up ? .95 + u * 2.0 : 3.0 - u * 2.0) + wob, 0)); }
    const cur = new THREE.CatmullRomCurve3(pts), geo = new THREE.TubeGeometry(cur, 120, .07, 8, false), cnt = geo.index.count; const line = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: up ? GOLDC : 0xe0503c, emissive: up ? GOLDC : 0xe0503c, emissiveIntensity: .5, metalness: .6, roughness: .3 })); scene.add(line);
    const head = new THREE.Mesh(new THREE.SphereGeometry(.15, 12, 10), up ? goldM : new THREE.MeshBasicMaterial({ color: 0xe0503c })); scene.add(head);
    return { ty: 2.0, anchors: { end: [x + 1.9, up ? 3.0 : 1.0, 0] }, update: t => { const p = eio(clamp((t - t0) / (t1 - t0))); geo.setDrawRange(0, Math.floor(cnt * p / 3) * 3); const q = cur.getPoint(clamp(p, 0, 1)); head.position.copy(q); head.scale.setScalar(p > 0 ? 1 : .0001); } };
  };

  return P;
}
