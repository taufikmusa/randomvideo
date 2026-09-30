/* scenes.js — "PLATYPUS": haiwan paling 'celaru' identiti + 3 pengajaran + emas (copywriting mode, SLOW PACING).
 * Slow mode: Act 2 = 5 x 2 bars, Act 3 = 6 x 1 bar, 3 word slams, no 8-beat recap.
 * Grade: teal sungai (hook) -> sepia muzium 1798 -> magenta biologi pelik -> putih pivot -> cyan pengajaran
 *        -> emas -> merah (tunai ikut arus) -> emas. CTA kecil premium. */

// ------------------------------------------------------------ colour grade
const KEYS = [
  [0, [90, 230, 210], [60, 150, 255]],
  [7, [90, 230, 210], [60, 150, 255]],
  [9, [255, 190, 120], [255, 120, 80]],
  [30, [255, 190, 120], [255, 120, 80]],
  [33, [235, 110, 255], [120, 140, 255]],
  [50, [235, 110, 255], [120, 140, 255]],
  [52.5, [235, 238, 255], [170, 180, 255]],
  [55, [90, 225, 255], [170, 120, 255]],
  [63, [90, 225, 255], [170, 120, 255]],
  [64.5, [255, 204, 96], [255, 140, 60]],
  [71.5, [255, 204, 96], [255, 140, 60]],
  [72.5, [255, 95, 95], [255, 160, 90]],
  [75, [255, 95, 95], [255, 160, 90]],
  [76.5, [255, 204, 96], [255, 140, 60]],
  [90, [255, 204, 96], [255, 140, 60]],
];

// ------------------------------------------------------------ config
const CFG = {
  hud: null,
  glitchFromBar: null,                        // slow mode: calmer cuts
  watermark: { text: '@taufik.pg', y: 1700, alpha: 0.6, fromBar: 0.5, toBar: FINALE },
};
useImage('taufik', 'taufik.png');

// ------------------------------------------------------------ shared bits
const RED = '#ff5a5a';
function label(txt, x, y, size = 32, color = null, a = 1, align = 'center') {
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = color || '#fff'; ctx.shadowColor = color || ca(1); ctx.shadowBlur = 16;
  ctx.font = `700 ${size}px Mono`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y); ctx.restore();
}
function big(txt, x, y, size, color = '#fff', align = 'center') {
  ctx.save(); ctx.fillStyle = color; ctx.shadowColor = ca(1); ctx.shadowBlur = 24; ctx.font = `900 ${size}px Orb`;
  ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y); ctx.restore();
}
function goldbar(x, y, s = 1, glow = 40) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const g = ctx.createLinearGradient(0, -60, 0, 60); g.addColorStop(0, '#fff3c4'); g.addColorStop(0.45, '#ffcc60'); g.addColorStop(1, '#e0892e');
  ctx.fillStyle = g; ctx.shadowColor = 'rgba(255,190,80,1)'; ctx.shadowBlur = glow;
  ctx.beginPath(); ctx.moveTo(-150, 60); ctx.lineTo(-110, -60); ctx.lineTo(110, -60); ctx.lineTo(150, 60); ctx.closePath(); ctx.fill();
  ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(80,40,0,0.55)'; ctx.font = '900 34px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('999.9', 0, 5);
  ctx.restore();
}
function note(x, y, s = 1, a = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a;
  ctx.fillStyle = '#070a12'; rr(-150, -75, 300, 150, 12); ctx.fill(); neon(6, 18); ctx.stroke();
  neon(3, 6, 0.7); ctx.beginPath(); ctx.arc(0, 0, 42, 0, TAU); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.shadowBlur = 0; ctx.font = '900 34px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('RM', 0, 2);
  ctx.restore();
}
function coin(x, y, r = 20) { fillA(1, 14); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 0.65, 0, TAU); ctx.stroke(); }
function arrowTo(x0, y0, x1, y1, lt, col = null) {
  ctx.save(); ctx.strokeStyle = col || ca(1); ctx.shadowColor = col || ca(1); ctx.shadowBlur = 16; ctx.lineWidth = 5;
  ctx.setLineDash([14, 12]); ctx.lineDashOffset = -lt * 50;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.setLineDash([]);
  const a = Math.atan2(y1 - y0, x1 - x0); ctx.fillStyle = col || ca(1);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - Math.cos(a - 0.45) * 26, y1 - Math.sin(a - 0.45) * 26); ctx.lineTo(x1 - Math.cos(a + 0.45) * 26, y1 - Math.sin(a + 0.45) * 26); ctx.closePath(); ctx.fill();
  ctx.restore();
}
function redX(x, y, r = 40, a = 1) {
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 22; ctx.lineWidth = 10; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x + r, y + r); ctx.moveTo(x + r, y - r); ctx.lineTo(x - r, y + r); ctx.stroke(); ctx.restore();
}

// ---- the platypus (side view, facing right, ~760px wide, centred at 0,0)
// o.hi = 'bill' | 'tail' | 'feet' | 'spur' (accent + glow), o.off = {bill:[dx,dy], tail:[..], feet:[..]} for the "cantuman" scene,
// o.sil = silhouette (dark), o.a = alpha
function platypus(o = {}) {
  const hi = o.hi, off = o.off || {}, a = o.a ?? 1, sil = o.sil;
  const st = (part, w = 7) => { if (sil) { ctx.strokeStyle = 'rgba(255,255,255,0.22)'; ctx.lineWidth = 4; ctx.shadowBlur = 0; return; } if (part && part === hi) neonA(w + 2, 34); else neon(w, 22, 0.95); };
  const fillDark = () => { ctx.fillStyle = sil ? '#000' : '#070a12'; ctx.shadowBlur = 0; };
  const part = (name, fn) => { const d = off[name] || [0, 0]; ctx.save(); ctx.translate(d[0], d[1]); fn(); ctx.restore(); };
  ctx.save(); ctx.globalAlpha *= a;
  // tail (beaver-like flat paddle)
  part('tail', () => {
    ctx.beginPath(); ctx.moveTo(-200, -42); ctx.bezierCurveTo(-300, -64, -392, -44, -395, -2); ctx.bezierCurveTo(-392, 40, -300, 52, -200, 36); ctx.closePath();
    fillDark(); ctx.fill(); st('tail'); ctx.stroke();
    if (!sil) { ctx.save(); ctx.clip(); neon(2, 0, 0.25); for (let i = -6; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-400 + i * 30, -60); ctx.lineTo(-300 + i * 30, 60); ctx.moveTo(-300 + i * 30, -60); ctx.lineTo(-400 + i * 30, 60); ctx.stroke(); } ctx.restore(); }
  });
  // feet (webbed) — back then front
  part('feet', () => {
    [[-130, -150, 1], [115, 138, 0]].forEach(([hx, fx, back]) => {
      ctx.beginPath(); ctx.moveTo(hx, 70); ctx.lineTo(fx, 112); st('feet', 7); ctx.stroke();
      const toes = [[fx - 38, 142], [fx, 152], [fx + 38, 142]];
      ctx.beginPath(); ctx.moveTo(fx, 112); toes.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.closePath();
      if (!sil) { ctx.save(); ctx.fillStyle = hi === 'feet' ? ca(0.45) : 'rgba(255,255,255,0.12)'; ctx.fill(); ctx.restore(); }
      st('feet', 6); ctx.beginPath(); toes.forEach(([x, y]) => { ctx.moveTo(fx, 112); ctx.lineTo(x, y); }); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(toes[0][0], toes[0][1]); ctx.quadraticCurveTo(fx - 18, 136, toes[1][0], toes[1][1]); ctx.quadraticCurveTo(fx + 18, 136, toes[2][0], toes[2][1]); ctx.stroke();
    });
  });
  // spur (males only) on the back ankle
  if (!sil) { ctx.beginPath(); ctx.moveTo(-160, 100); ctx.lineTo(-212, 88); ctx.lineTo(-158, 116); ctx.closePath(); if (hi === 'spur') { fillA(1, 34); ctx.fill(); } st('spur', 4); ctx.stroke(); }
  // body
  ctx.beginPath(); ctx.ellipse(-15, 0, 205, 92, 0, 0, TAU); fillDark(); ctx.fill(); st(null, 8); ctx.stroke();
  if (!sil) { neon(2, 0, 0.22); const r = mulberry(3); for (let i = 0; i < 26; i++) { const x = -190 + r() * 340, y = -60 + r() * 110; ctx.beginPath(); ctx.arc(x, y, 18, 0.2, 1.1); ctx.stroke(); } }
  // head
  part('bill', () => {
    ctx.beginPath(); ctx.ellipse(178, -18, 72, 58, 0, 0, TAU); fillDark(); ctx.fill(); st(null, 8); ctx.stroke();
    // bill (duck-like)
    ctx.beginPath(); ctx.moveTo(226, -50); ctx.bezierCurveTo(300, -66, 378, -52, 382, -22); ctx.bezierCurveTo(384, 6, 320, 16, 226, 8); ctx.closePath();
    fillDark(); ctx.fill(); st('bill'); ctx.stroke();
    if (!sil) {
      neon(3, 0, 0.5); ctx.beginPath(); ctx.moveTo(244, -20); ctx.quadraticCurveTo(310, -16, 370, -22); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(342, -40, 4, 0, TAU); ctx.arc(356, -40, 4, 0, TAU); ctx.fill();
      ctx.shadowColor = ca(1); ctx.shadowBlur = 14; ctx.beginPath(); ctx.arc(196, -36, 8, 0, TAU); ctx.fill();
    }
  });
  ctx.restore();
}
// comparison animals
function duckHead(x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); neon(6, 16);
  ctx.beginPath(); ctx.moveTo(-40, 120); ctx.quadraticCurveTo(-60, 40, -30, 20); ctx.stroke();
  ctx.fillStyle = '#070a12'; ctx.beginPath(); ctx.arc(0, 0, 58, 0, TAU); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(48, -12); ctx.quadraticCurveTo(120, -22, 128, 6); ctx.quadraticCurveTo(120, 26, 48, 18); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(14, -16, 7, 0, TAU); ctx.fill();
  ctx.restore();
}
function beaverTail(x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.5); neon(6, 16);
  ctx.beginPath(); ctx.ellipse(0, 20, 52, 95, 0, 0, TAU); ctx.fillStyle = '#070a12'; ctx.fill(); ctx.stroke();
  ctx.save(); ctx.clip(); neon(2, 0, 0.45); for (let i = -6; i < 6; i++) { ctx.beginPath(); ctx.moveTo(i * 22 - 60, -80); ctx.lineTo(i * 22 + 60, 120); ctx.moveTo(i * 22 + 60, -80); ctx.lineTo(i * 22 - 60, 120); ctx.stroke(); } ctx.restore();
  neon(6, 16); ctx.beginPath(); ctx.arc(0, -120, 60, 0.25 * Math.PI, 0.75 * Math.PI); ctx.stroke();
  ctx.restore();
}
function frogFoot(x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); neon(6, 16);
  ctx.beginPath(); ctx.moveTo(0, 110); ctx.lineTo(0, 20); ctx.stroke();
  const tips = [[-80, -70], [-28, -100], [28, -100], [80, -70]];
  ctx.beginPath(); ctx.moveTo(0, 20); tips.forEach(([tx, ty]) => ctx.lineTo(tx, ty)); ctx.closePath(); ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fill();
  tips.forEach(([tx, ty]) => { ctx.beginPath(); ctx.moveTo(0, 20); ctx.lineTo(tx, ty); ctx.stroke(); ctx.beginPath(); ctx.arc(tx, ty, 11, 0, TAU); ctx.stroke(); });
  ctx.restore();
}
function person(x, y, s = 1, a = 0.5) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a; neon(5, 8, 0.9);
  ctx.beginPath(); ctx.arc(0, -40, 26, 0, TAU); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-44, 50); ctx.quadraticCurveTo(-44, -6, 0, -6); ctx.quadraticCurveTo(44, -6, 44, 50); ctx.stroke();
  ctx.restore();
}
function bag(x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); neon(5, 14, 0.8);
  ctx.fillStyle = '#070a12'; rr(-55, -40, 110, 110, 8); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -40, 30, Math.PI, 0); ctx.stroke(); ctx.restore();
}
function shield(sc_ = 1) {
  ctx.save(); ctx.scale(sc_, sc_); neonA(9, 30); ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath(); ctx.moveTo(0, -270); ctx.quadraticCurveTo(210, -240, 240, -180); ctx.quadraticCurveTo(240, 120, 0, 280); ctx.quadraticCurveTo(-240, 120, -240, -180); ctx.quadraticCurveTo(-210, -240, 0, -270); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
}
function scissors(x, y, s = 1, open = 0.4, col = '#fff') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = col; ctx.shadowColor = ca(1); ctx.shadowBlur = 18; ctx.lineWidth = 7; ctx.lineCap = 'round';
  [-1, 1].forEach(k => { ctx.save(); ctx.rotate(k * open * 0.5); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(110, 0); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-40, k * 18); ctx.stroke(); ctx.beginPath(); ctx.arc(-66, k * 26, 24, 0, TAU); ctx.stroke(); ctx.restore(); });
  ctx.restore();
}

// ------------------------------------------------------------ icons (centred at 0,0, radius ~300)
const ICON = {
  hook(lt) {            // siluet misteri dalam sungai
    ctx.save(); ctx.translate(0, 20); ctx.scale(0.8, 0.8); platypus({ sil: true }); ctx.restore();
    for (let i = 0; i < 4; i++) { const y = 170 + i * 34; ctx.save(); ctx.globalAlpha = 0.7 - i * 0.14; neonA(4, 14); ctx.beginPath(); for (let x = -380; x <= 380; x += 20) { const yy = y + Math.sin(x * 0.03 + lt * 3 + i) * 8; x === -380 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); ctx.restore(); }
    big('?', 0, -200 + Math.sin(lt * 3) * 8, 150);
  },
  reveal(lt) {
    const p = eo(lt / 1.2);
    ctx.save(); ctx.beginPath(); ctx.rect(-420, -300, 840 * p, 600); ctx.clip(); platypus({}); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(-420 + 840 * p, -300, 840, 600); ctx.clip(); platypus({ sil: true }); ctx.restore();
    if (p < 1) { neonA(4, 30); ctx.beginPath(); ctx.moveTo(-420 + 840 * p, -220); ctx.lineTo(-420 + 840 * p, 220); ctx.stroke(); }
  },
  specimen(lt) {        // kulit spesimen dipin atas papan, tag 1798
    ctx.fillStyle = '#0a0806'; rr(-360, -230, 720, 440, 16); ctx.fill(); neon(5, 14, 0.6); ctx.stroke();
    ctx.save(); ctx.scale(0.78, 0.78); platypus({}); ctx.restore();
    [[-300, -170], [300, -170], [-300, 150], [300, 150]].forEach(([x, y]) => { fillA(1, 12); ctx.beginPath(); ctx.arc(x, y, 9, 0, TAU); ctx.fill(); });
    const p = eback(lt * 1.5 - 0.5);
    if (p > 0) { ctx.save(); ctx.translate(210, 190); ctx.rotate(-0.08); ctx.scale(p, p); ctx.fillStyle = '#e9dcc0'; rr(-90, -30, 180, 60, 6); ctx.fill(); ctx.fillStyle = '#3a2a14'; ctx.font = '700 30px Mono'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('N.S.W.', 0, 2); ctx.restore(); }
    const f = Math.max(0, 1 - Math.abs((lt % 2.5) - 1.0) / 0.12);
    if (f > 0) { ctx.save(); ctx.globalAlpha = f * 0.5; ctx.fillStyle = '#fff'; ctx.fillRect(-360, -230, 720, 440); ctx.restore(); }
  },
  hoax(lt) {            // saintis cari kesan jahitan
    ctx.save(); ctx.scale(0.8, 0.8); platypus({ hi: 'bill' }); ctx.restore();
    ctx.save(); ctx.strokeStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 14; ctx.lineWidth = 4;
    for (let i = 0; i < 6; i++) { const y = -50 + i * 16; ctx.beginPath(); ctx.moveTo(172, y); ctx.lineTo(188, y + 8); ctx.stroke(); }
    ctx.restore();
    const mx = 180 + Math.sin(lt * 1.6) * 40, my = -10 + Math.cos(lt * 2.1) * 20;
    ctx.save(); neon(8, 20); ctx.beginPath(); ctx.arc(mx, my, 80, 0, TAU); ctx.stroke(); ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(mx + 57, my + 57); ctx.lineTo(mx + 140, my + 140); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.beginPath(); ctx.arc(mx, my, 76, 0, TAU); ctx.fill(); ctx.restore();
    label('PALSU?', -190, -210, 44, RED, Math.floor(lt * 3) % 2 ? 1 : 0.35);
  },
  cmpBill(lt) {
    const p = eo(lt / 1.2);
    ctx.save(); ctx.globalAlpha = p; duckHead(-240, -190, 0.85); label('ITIK', -240, -40, 30, null, p); ctx.restore();
    ctx.save(); ctx.translate(-30, 110); ctx.scale(0.72, 0.72); platypus({ hi: 'bill' }); ctx.restore();
    if (p > 0.4) arrowTo(-130, -190, 190, 70, lt);
  },
  cmpTail(lt) {
    const p = eo(lt / 1.2);
    ctx.save(); ctx.globalAlpha = p; beaverTail(230, -190, 0.8); label('MEMERANG', 230, -40, 30, null, p); ctx.restore();
    ctx.save(); ctx.translate(40, 110); ctx.scale(0.72, 0.72); platypus({ hi: 'tail' }); ctx.restore();
    if (p > 0.4) arrowTo(160, -170, -190, 90, lt);
  },
  cmpFeet(lt) {
    const p = eo(lt / 1.2);
    ctx.save(); ctx.globalAlpha = p; frogFoot(-240, -200, 0.8); label('KATAK', -240, -60, 30, null, p); ctx.restore();
    ctx.save(); ctx.translate(0, 80); ctx.scale(0.72, 0.72); platypus({ hi: 'feet' }); ctx.restore();
    if (p > 0.4) arrowTo(-190, -110, 80, 170, lt);
  },
  assemble(lt) {        // bahagian terbang masuk & bercantum
    const p = eo(lt / 1.4), q = 1 - p;
    ctx.save(); ctx.scale(0.85, 0.85);
    platypus({ off: { bill: [260 * q, -200 * q], tail: [-260 * q, -160 * q], feet: [0, 220 * q] }, hi: p < 1 ? null : null });
    ctx.restore();
    const s = eback(lt * 1.5 - 1.6);
    if (s > 0) { ctx.save(); ctx.translate(0, -250); ctx.rotate(-0.08); ctx.scale(s, s); ctx.strokeStyle = ca(1); ctx.lineWidth = 6; ctx.shadowColor = ca(1); ctx.shadowBlur = 24; rr(-190, -42, 380, 84, 10); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.font = '700 40px Mono'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('✓ MAMALIA', 0, 3); ctx.restore(); }
  },
  eggs(lt) {
    neon(7, 20, 0.8); ctx.beginPath(); ctx.arc(0, 180, 330, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke();
    neon(6, 14, 0.8); ctx.beginPath(); ctx.moveTo(-380, 180); ctx.lineTo(380, 180); ctx.stroke();
    neonA(5, 18); ctx.beginPath(); ctx.ellipse(0, 170, 190, 40, 0, 0, Math.PI); ctx.stroke();
    [[-60, 110], [60, 118]].forEach(([x, y], i) => {
      const w = Math.sin(lt * 6 + i) * (lt > 1.2 ? 0.06 : 0.02);
      ctx.save(); ctx.translate(x, y); ctx.rotate(w);
      const g = ctx.createRadialGradient(-12, -20, 4, 0, 0, 70); g.addColorStop(0, '#ffffff'); g.addColorStop(1, ca(0.8));
      ctx.fillStyle = g; ctx.shadowColor = ca(1); ctx.shadowBlur = 34; ctx.beginPath(); ctx.ellipse(0, 0, 46, 60, 0, 0, TAU); ctx.fill();
      if (i === 1 && lt > 1.4) { ctx.shadowBlur = 0; ctx.strokeStyle = '#2a0a30'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-40, -8); ctx.lineTo(-20, -20); ctx.lineTo(-6, -4); ctx.lineTo(10, -22); ctx.lineTo(26, -6); ctx.lineTo(40, -14); ctx.stroke(); }
      ctx.restore();
    });
    label('BUKAN MELAHIRKAN', 0, -215, 30, null, eo(lt / 0.8));
  },
  milk(lt) {            // bulu + titisan susu dari liang kulit
    ctx.save(); rr(-320, -200, 640, 380, 40); ctx.fillStyle = '#070a12'; ctx.fill(); neon(6, 18); ctx.stroke(); ctx.clip();
    neon(3, 0, 0.45);
    for (let r = 0; r < 9; r++) for (let c = 0; c < 12; c++) { const x = -300 + c * 54 + (r % 2) * 27, y = -170 + r * 42; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 14, y + 6, x + 22, y + 26); ctx.stroke(); }
    ctx.restore();
    const pores = [[-180, -40], [-60, 30], [60, -60], [170, 20], [-120, 110], [110, 120]];
    pores.forEach(([x, y], i) => {
      const ph = (lt * 0.7 + i * 0.17) % 1, s = eo(ph * 2.5), drop = Math.max(0, ph - 0.45) * 220;
      ctx.save(); ctx.fillStyle = '#ffffff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 20; ctx.globalAlpha = 1 - Math.max(0, ph - 0.8) * 5;
      ctx.beginPath(); ctx.moveTo(x, y + drop - 22 * s); ctx.quadraticCurveTo(x + 16 * s, y + drop, x, y + drop + 12 * s); ctx.quadraticCurveTo(x - 16 * s, y + drop, x, y + drop - 22 * s); ctx.fill(); ctx.restore();
    });
    ctx.save(); ctx.globalAlpha = eo(lt / 0.8); label('TIADA PUTING', 0, -260, 32, RED); ctx.restore();
  },
  stomach(lt) {         // esofagus terus ke usus, perut "hilang"
    const pts = [];
    for (let y = -230; y <= -20; y += 10) pts.push([0, y]);
    const rows = [-20, 30, 80, 130, 180], X = 150;
    let x0 = 0;
    rows.forEach((y, r) => {
      const dir = r % 2 ? -1 : 1, x1 = r === rows.length - 1 ? 0 : dir * X;
      for (let k = 0; k <= 12; k++) pts.push([lerp(x0, x1, k / 12), y]);
      if (r < rows.length - 1) for (let k = 1; k < 8; k++) { const a = -Math.PI / 2 + k / 8 * Math.PI; pts.push([x1 + dir * Math.cos(a) * 25, y + 25 + Math.sin(a) * 25]); }
      x0 = x1;
    });
    ctx.save(); neon(12, 22, 0.9); ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); ctx.restore();
    // the missing stomach (ghost, dashed)
    ctx.save(); ctx.setLineDash([12, 12]); ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.ellipse(130, -120, 95, 60, 0.4, 0, TAU); ctx.stroke(); ctx.restore();
    redX(130, -120, 36, eo(lt * 1.5 - 0.3));
    label('PERUT', 270, -200, 26, '#aab6c4');
    label('USUS', -250, 80, 26, '#aab6c4');
    // food dot
    const ph = (lt * 0.45) % 1, idx = Math.floor(ph * (pts.length - 1)), [fx, fy] = pts[idx];
    fillA(1, 30); ctx.beginPath(); ctx.arc(fx, fy, 16, 0, TAU); ctx.fill();
    ctx.save(); ctx.translate(0, -240); ctx.scale(0.5, 0.5); ctx.rotate(-Math.PI / 2); ctx.translate(-300, 20);
    ctx.beginPath(); ctx.moveTo(226, -50); ctx.bezierCurveTo(300, -66, 378, -52, 382, -22); ctx.bezierCurveTo(384, 6, 320, 16, 226, 8); ctx.closePath(); ctx.fillStyle = '#070a12'; ctx.fill(); neonA(7, 20); ctx.stroke(); ctx.restore();
  },
  spur(lt) {
    ctx.save(); ctx.translate(40, -20); ctx.scale(0.8, 0.8); platypus({ hi: 'spur' }); ctx.restore();
    const sx = 40 + -212 * 0.8, sy = -20 + 88 * 0.8;
    const ph = (lt * 1.2) % 1;
    ctx.save(); neonA(4, 20); ctx.globalAlpha = 1 - ph; ctx.beginPath(); ctx.arc(sx + 20, sy + 10, 40 + ph * 90, 0, TAU); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 3; i++) { const q = (lt * 0.8 + i / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - q; fillA(1, 16); ctx.beginPath(); ctx.arc(sx, sy + 20 + q * 150, 9 - q * 3, 0, TAU); ctx.fill(); ctx.restore(); }
    label('JANTAN SAHAJA', 0, -240, 32, null, eo(lt / 0.8));
  },
  ancient(lt) {         // strata: platypus hari ini, fosil & tapak dinosaur di bawah
    for (let i = 0; i < 4; i++) {
      const y = -30 + i * 80;
      ctx.save(); ctx.globalAlpha = 0.9 - i * 0.15; neon(4, 10, 0.8); ctx.beginPath();
      for (let x = -380; x <= 380; x += 20) { const yy = y + Math.sin(x * 0.02 + i * 2) * 10; x === -380 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); }
      ctx.stroke(); ctx.restore();
    }
    ctx.save(); ctx.translate(Math.sin(lt) * 20, -110); ctx.scale(0.4, 0.4); platypus({}); ctx.restore();
    // fossil jaw
    ctx.save(); ctx.translate(-170, 100); ctx.globalAlpha = eo(lt - 0.2); neonA(5, 16);
    ctx.beginPath(); ctx.moveTo(-70, 0); ctx.quadraticCurveTo(0, 26, 80, -6); ctx.lineTo(80, 10); ctx.quadraticCurveTo(0, 44, -70, 16); ctx.closePath(); ctx.stroke();
    for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 28, 10); ctx.lineTo(-34 + i * 28, -4); ctx.lineTo(-28 + i * 28, 12); ctx.stroke(); }
    ctx.restore();
    // dinosaur footprint
    ctx.save(); ctx.translate(170, 230); ctx.globalAlpha = eo(lt - 0.6); fillA(0.9, 20);
    ctx.beginPath(); ctx.ellipse(0, 10, 22, 26, 0, 0, TAU); ctx.fill();
    [[-0.5, 1], [0, 1.2], [0.5, 1]].forEach(([a, l]) => { ctx.save(); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(0, -44 * l, 9, 30 * l, 0, 0, TAU); ctx.fill(); ctx.restore(); });
    ctx.restore();
  },
  // --- pengajaran & emas
  crowd(lt) {
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
      const x = -270 + c * 180, y = -150 + r * 220;
      if (r === 1 && c === 2) continue;
      person(x, y, 1, 0.45);
    }
    const p = eback(lt * 1.6);
    ctx.save(); ctx.translate(-270 + 2 * 180, 70 + 10); ctx.scale(0.26 * p, 0.26 * p); platypus({ hi: 'bill' }); ctx.restore();
    ctx.save(); neonA(4, 24); ctx.globalAlpha = 0.6 + 0.4 * Math.sin(lt * 5); ctx.beginPath(); ctx.arc(-270 + 2 * 180, 80, 110, 0, TAU); ctx.stroke(); ctx.restore();
  },
  quiet(lt) {
    ctx.save(); ctx.globalAlpha = 0.55; bag(-280, -40, 1); bag(-170, 20, 0.8); bag(-280, 110, 0.7);
    for (let i = 0; i < 5; i++) { const r = mulberry(i + 3); const x = -360 + r() * 260, y = -180 + r() * 340, s = 8 + 8 * Math.abs(Math.sin(lt * 4 + i)); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(x, y - s); ctx.lineTo(x + s * 0.3, y); ctx.lineTo(x, y + s); ctx.lineTo(x - s * 0.3, y); ctx.fill(); }
    ctx.restore(); label('MENUNJUK', -230, 230, 26, '#aab6c4');
    neon(3, 0, 0.3); ctx.beginPath(); ctx.moveTo(0, -220); ctx.lineTo(0, 220); ctx.stroke();
    const n = Math.min(4, Math.floor(lt * 3) + 1);
    for (let i = 0; i < n; i++) goldbar(210, 150 - i * 70, 0.55, 26);
    label('DIAM-DIAM', 210, 230, 26, '#ffcc60');
  },
  goldshield(lt) {
    shield(1);
    goldbar(0, 10, 0.95);
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * TAU + 0.3, ph = (lt * 0.9 + i / 6) % 1, d = ph < 0.6 ? lerp(420, 270, ph / 0.6) : lerp(270, 420, (ph - 0.6) / 0.4);
      const x = Math.cos(a) * d, y = Math.sin(a) * d;
      ctx.save(); ctx.strokeStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 18; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * 50, y + Math.sin(a) * 50); ctx.stroke(); ctx.restore();
    }
    label('BISA INFLASI', 0, -320, 28, RED);
  },
  cut(lt) {
    ctx.save(); neon(14, 20); ctx.beginPath(); ctx.moveTo(-360, -80); ctx.lineTo(360, -80); ctx.stroke(); ctx.restore();
    arrowTo(250, -80, 360, -80, lt);
    [-200, 0, 200].forEach((x, i) => {
      const cutAt = 0.4 + i * 0.45, done = lt > cutAt;
      ctx.save(); neon(8, 14, 0.8); ctx.beginPath(); ctx.moveTo(x, -80); ctx.lineTo(x, done ? -30 : 20); ctx.stroke(); ctx.restore();
      if (!done) for (let k = 0; k < 3; k++) { const q = (lt * 1.1 + k / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - q; coin(x, 40 + q * 200, 16); ctx.restore(); }
      else { redX(x, 0, 22, 1); }
      if (Math.abs(lt - cutAt) < 0.35) scissors(x - 20, -10, 0.7, Math.abs(Math.sin((lt - cutAt) * 18)), '#fff');
    });
    label('BELANJA BOCOR', 0, -200, 30, RED);
  },
  gap(lt) {
    note(-230, -40, 0.7);
    const p = eo(lt / 1.4);
    ctx.save(); ctx.translate(200, 0);
    ctx.fillStyle = '#070a12'; rr(-120, -190, 240, 360, 26); ctx.fill(); neon(7); ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.roundRect(-120, -190, 240, 360, 26); ctx.clip();
    const h = 300 * p; const g = ctx.createLinearGradient(0, 170 - h, 0, 170); g.addColorStop(0, '#fff3c4'); g.addColorStop(1, '#e0892e');
    ctx.fillStyle = g; ctx.shadowColor = 'rgba(255,190,80,1)'; ctx.shadowBlur = 20; ctx.fillRect(-120, 170 - h, 240, h); ctx.restore();
    ctx.fillStyle = '#fff'; ctx.font = '900 56px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowColor = ca(1); ctx.shadowBlur = 20; ctx.fillText('GAP', 0, -130);
    ctx.restore();
    arrowTo(-120, -40, 70, -40, lt);
    for (let k = 0; k < 3; k++) { const q = (lt * 1.2 + k / 3) % 1; coin(lerp(-110, 60, q), -40, 12); }
  },
  river(lt) {           // tunai ikut arus ke gaung inflasi
    for (let i = 0; i < 5; i++) { const y = -60 + i * 40; ctx.save(); ctx.globalAlpha = 0.8 - i * 0.1; neon(4, 12, 0.8); ctx.beginPath(); for (let x = -380; x <= 150; x += 20) { const yy = y + Math.sin(x * 0.03 - lt * 5 + i) * 7; x === -380 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.strokeStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 20; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(150, -80); ctx.lineTo(150, 300); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 3; i++) {
      const q = (lt * 0.45 + i / 3) % 1;
      let x, y, s, a;
      if (q < 0.6) { x = lerp(-340, 150, q / 0.6); y = 0 + Math.sin(q * 20) * 8; s = 0.4; a = 1; }
      else { const f = (q - 0.6) / 0.4; x = 150 + f * 120; y = f * f * 320; s = 0.4 * (1 - f * 0.6); a = 1 - f; }
      note(x, y, s, a);
    }
    label('GAUNG INFLASI', 270, -140, 26, RED);
  },
  fortress(lt) {
    const rows = [4, 3, 2, 1];
    let k = 0;
    rows.forEach((n, r) => { for (let i = 0; i < n; i++) { const p = eback(lt * 2.2 - k * 0.08); k++; if (p <= 0) continue; ctx.save(); ctx.translate((i - (n - 1) / 2) * 125, 170 - r * 58); ctx.scale(p, p); goldbar(0, 0, 0.4, 20); ctx.restore(); } });
    ctx.save(); ctx.translate(-10, 300); ctx.scale(0.3, 0.3); platypus({ hi: 'bill' }); ctx.restore();
  },
};

// ------------------------------------------------------------ scenes (SLOW pacing)
// COLD OPEN — hook
sc(0, 2, (lt) => {
  ctx.save(); ctx.translate(CX, IY - 40); ctx.globalAlpha = eo(lt / 0.5); ICON.hook(lt); ctx.restore(); ctx.globalAlpha = 1;
  mono('TAHU TAK?', 380, 40, eo(lt / 0.4), null, 18);
  ptext('Ada MAMALIA yang...', 1250, 44, eo((lt - 0.4) / 0.4), { weight: 700 });
  [['BERTELUR', 0.8], ['TIADA PERUT', 1.3], ['SUSU DARI BULU', 1.8], ['TAJI BERACUN', 2.3]].forEach(([t, d], i) => {
    mono('• ' + t, 1340 + i * 58, 34, eo((lt - d) / 0.3), i % 2 ? '#ffffff' : null, 6);
  });
}, '');
// TITLE — jawapan
sc(2, 4, (lt) => {
  const s = eo(lt / 1.0);
  ctx.save(); ctx.translate(CX, 600); ctx.scale(0.85, 0.85); ICON.reveal(lt); ctx.restore();
  htext('PLATYPUS', 930, 124 - 16 * (1 - s), { alpha: s, track: lerp(30, 6, s), glow: 50 });
  ctx.save(); ctx.fillStyle = ca(0.9); ctx.shadowColor = ca(1); ctx.shadowBlur = 20; const w = 520 * eo((lt - 0.4) / 0.8); ctx.fillRect(CX - w / 2, 1025, w, 4); ctx.restore();
  mono('TIMUR AUSTRALIA & TASMANIA', 1090, 30, eo((lt - 0.7) / 0.6), null, 6);
  ptext("Hidupan paling 'celaru' identiti\ndi muka bumi", 1230, 46, eo((lt - 1.2) / 0.7), { weight: 700 });
  ptext('— dan rahsia kewangan di sebaliknya', 1360, 36, eo((lt - 1.9) / 0.6), { color: '#aab6c4' });
}, '');

// ACT 1 — 1798: disangka palsu (2 bar = 4s)
sc(4, 6, era('1798', 'specimen', 'SPESIMEN PERTAMA', 'Kulitnya dihantar dari Australia\nke Britain untuk dikaji', { place: 'NEW SOUTH WALES', subOff: 125 }), '');
sc(6, 8, era('PALSU?', 'hoax', 'DISANGKA JENAKA', 'Saintis cari kesan jahitan —\nsangka haiwan dicantum-cantum', { place: 'BRITAIN · 1799', yearSize: 140, subOff: 125 }), '');
sc(8, 10, era('ITIK', 'cmpBill', 'PARUH SEPERTI ITIK', 'Lembut, bergetah — boleh kesan\narus elektrik mangsa dalam air', { place: 'CANTUMAN 1/3', yearSize: 150, titleSize: 70, subOff: 125 }), '');
sc(10, 12, era('MEMERANG', 'cmpTail', 'EKOR LEPER', 'Ekor lebar macam memerang —\nsimpan lemak untuk tenaga', { place: 'CANTUMAN 2/3', yearSize: 120, subOff: 125 }), '');
sc(12, 14, era('KATAK', 'cmpFeet', 'KAKI BERSELAPUT', 'Kaki depan berselaput\nuntuk mendayung dalam sungai', { place: 'CANTUMAN 3/3', yearSize: 150, subOff: 125 }), '');
sc(14, 16, era('SAH!', 'assemble', 'MEMANG MAMALIA', 'Tapi hampir semua "peraturan"\nmamalia, ia langgar', { place: 'BUKAN PALSU', yearSize: 150, subOff: 125 }), '');

// ACT 2 — anatomi paling pelik (slow: 2 bar setiap satu)
sc(16, 18, era('BERTELUR', 'eggs', 'MAMALIA BERTELUR', 'Biasanya 1–3 biji, dieram\ndalam lubang di tebing sungai', { place: 'MONOTREM', yearSize: 120, subOff: 125 }), '');
sc(18, 20, era('SUSU', 'milk', 'MEREMBES DARI BULU', 'Susu keluar melalui liang kulit —\nanak menjilatnya dari bulu ibu', { place: 'TANPA PUTING', yearSize: 150, titleSize: 68, subOff: 125 }), '');
sc(20, 22, era('0 PERUT', 'stomach', 'TERUS KE USUS', 'Tiada perut penghasil asid —\nesofagus bersambung terus ke usus', { place: 'SISTEM HADAM', yearSize: 130, subOff: 125 }), '');
sc(22, 24, era('BISA', 'spur', 'TAJI BERACUN', 'Di pergelangan kaki belakang —\nsenjata rahsia platypus jantan', { place: 'SENJATA RAHSIA', yearSize: 150, subOff: 125 }), '');
sc(24, 26, era('PURBA', 'ancient', 'KEKAL BERTAHAN', 'Keturunannya dah wujud\nsejak zaman dinosaur', { place: 'JUTAAN TAHUN', yearSize: 150, subOff: 125 }), '');

// PIVOT
sc(26, 28, (lt) => {
  ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(CX, IY); ctx.scale(0.85, 0.85); ICON.reveal(lt * 0.6); ctx.restore();
  mono('PELIK, TAPI TAHAN LASAK', 330, 34, eo((lt - 0.2) / 0.6), null, 8);
  htext('3 PENGAJARAN', 1380, 88, { font: 'Grot', weight: 700, alpha: eo((lt - 1.2) / 0.5), glow: 40, scale: 1 + 0.02 * lt });
  ptext('untuk cara kita urus wang', 1500, 44, eo((lt - 2.0) / 0.5));
}, '');

// ACT 3 — pengajaran + emas (1 bar = 2s)
const act3 = [
  ['01', 'crowd', 'JANGAN IKUT\nSTANDARD ORANG', 'Pelik tak apa, asal tahan lasak', 'PENGAJARAN'],
  ['01', 'quiet', 'DIAM-DIAM\nBINA EMAS', 'Biar orang lain menunjuk', 'PENGAJARAN'],
  ['02', 'spur', 'SEDIA SENJATA\nKECEMASAN', 'Macam taji platypus jantan', 'PENGAJARAN'],
  ['02', 'goldshield', 'EMAS FIZIKAL', 'Tepis bisa inflasi & sempit hidup', 'PENGAJARAN'],
  ['03', 'cut', 'POTONG\nBELANJA BOCOR', 'Buang yang melambatkan', 'PENGAJARAN'],
  ['03', 'gap', 'TERUS KE\nAKAUN GAP', 'Tanpa singgah — macam hadam platypus', 'PENGAJARAN'],
];
act3.forEach(([top, icon, title, sub, lab], i) => {
  sc(28 + i, 29 + i, (lt, d) => {
    const T = lt / d;
    ctx.save(); ctx.translate(CX, IY); const z = lerp(1.2, 0.95, eo(T * 3)); ctx.scale(z, z); ICON[icon](lt + 0.3); ctx.restore();
    htext(top, 320, 160, { track: 8, scale: lerp(1.1, 1, eo(T * 4)) });
    mono(lab, 440, 32, 1);
    const two = title.includes('\n');
    htext(title, 1390, two ? 68 : 78, { font: 'Grot', weight: 700, track: 2, alpha: eo(T * 5), glow: 26 });
    ptext(sub, two ? 1540 : 1500, 40, eo(T * 5 - 0.3));
  }, '');
});
// word slams (slow: 3 words)
[['BERANI', 34, 34.5], ['SEDIA', 34.5, 35], ['SIMPAN', 35, BREATH]].forEach(([w, a, b], i) => {
  sc(a, b, (lt, d) => {
    const T = lt / d;
    htext(w, 960, 170, { track: 10, scale: lerp(1.4, 1, eo(T * 3)) + T * 0.04, glow: 60 });
    mono(String(i + 1).padStart(2, '0') + ' / 03', 1130, 34, 0.9, null, 8);
  }, '');
});
sc(BREATH, DROP, (lt, d) => {
  ctx.fillStyle = 'rgba(0,0,0,0.75)'; ctx.fillRect(0, 0, W, H);
  const r = 4 + 36 * (lt / d) ** 2; fillA(1, 80); ctx.beginPath(); ctx.arc(CX, 960, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
}, '');

// DROP (slow: 3 x 2 bar)
sc(36, 38, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ICON.river(lt); ctx.restore();
  mono('IKUT ARUS?', 330, 38, eo(lt * 3), null, 14);
  htext('SIMPAN TUNAI\nSEMATA-MATA', 1360, 80, { track: 2, glow: 50, lh: 1.15, scale: lerp(1.15, 1, eo(lt * 2)) });
  ptext('Nilainya susut tanpa disedari', 1540, 42, eo(lt * 2 - 0.6));
}, '');
sc(38, 40, (lt) => {
  ctx.save(); ctx.translate(CX, IY - 40); goldbar(0, 0, 1.7 + 0.04 * beatPulse(curT), 80); ctx.restore();
  mono('BEZANYA...', 400, 38, eo(lt * 3), null, 14);
  htext('EMAS', 1300, 150, { track: 14, glow: 80, scale: lerp(1.5, 1, eo(lt * 2.5)) });
  ptext('Identiti pertahanan kewangan\nyang sebenar', 1480, 44, eo(lt * 2 - 0.6), { weight: 700 });
}, '');
sc(40, 42, (lt) => {
  ctx.save(); ctx.translate(CX, IY - 60); ICON.fortress(lt); ctx.restore();
  mono('SOALAN UNTUK ANDA', 330, 36, eo(lt * 3), null, 12);
  htext('BERANI NAMPAK\nBERBEZA?', 1380, 80, { font: 'Grot', weight: 700, glow: 40, alpha: eo(lt * 2 - 0.3), lh: 1.15 });
  ptext('Demi bina kubu emas\nyang kebal untuk keluarga', 1560, 40, eo(lt * 2 - 0.9));
}, '');

// FINALE — CTA kecil & premium
sc(42, 45, (lt) => {
  const s = eo(lt / 1.0);
  htext('BERANI\nJADI BERBEZA', 640, 62, { alpha: s, track: lerp(24, 6, s), glow: 40, lh: 1.2 });
  ptext('Moga perkongsian ini bermanfaat.', 790, 32, eo((lt - 0.5) / 0.6), { color: '#cfd8e3' });
  const p = eo((lt - 0.7) / 0.8), R = 150, cy = 1060;
  ctx.save(); ctx.globalAlpha = p;
  ctx.strokeStyle = ca(0.9); ctx.lineWidth = 3; ctx.shadowColor = ca(1); ctx.shadowBlur = 24;
  ctx.beginPath(); ctx.arc(CX, cy, R + 12, -Math.PI / 2, -Math.PI / 2 + TAU * p); ctx.stroke();
  ctx.shadowBlur = 0; ctx.beginPath(); ctx.arc(CX, cy, R, 0, TAU); ctx.clip();
  const g = ctx.createRadialGradient(CX, cy - 40, 0, CX, cy, R); g.addColorStop(0, 'rgba(60,45,20,1)'); g.addColorStop(1, 'rgba(12,10,8,1)');
  ctx.fillStyle = g; ctx.fillRect(CX - R, cy - R, R * 2, R * 2);
  ctx.drawImage(IMG.taufik, 180, 20, 640, 640, CX - R, cy - R + 10, R * 2, R * 2);
  ctx.restore();
  htext('TAUFIK MUSA', 1285, 46, { font: 'Grot', weight: 700, alpha: eo((lt - 1.1) / 0.5), track: 8, glow: 18 });
  mono('DEALER PUBLIC GOLD', 1340, 22, eo((lt - 1.3) / 0.5), null, 10);
  ctx.save(); ctx.globalAlpha = eo((lt - 1.5) / 0.5); ctx.fillStyle = ca(0.6); ctx.fillRect(CX - 60, 1390, 120, 2); ctx.restore();
  mono('SHARE  ·  LIKE  ·  FOLLOW', 1450, 26, eo((lt - 1.7) / 0.5), '#ffffff', 10);
  htext('@taufik.pg', 1510, 40, { font: 'Grot', weight: 700, alpha: eo((lt - 1.9) / 0.5), track: 4, glow: 20 });
  if (lt > 4) { ctx.save(); ctx.translate(CX, 1630); ctx.scale(0.16, 0.16); ctx.globalAlpha = eo((lt - 4) / 0.4); platypus({ hi: 'bill' }); ctx.restore(); }
  if (lt > 5.3) { ctx.fillStyle = `rgba(0,0,0,${clamp((lt - 5.3) / 0.65)})`; ctx.fillRect(0, 0, W, H); }
}, '');
