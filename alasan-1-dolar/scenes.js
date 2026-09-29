/* scenes.js — "ALASAN $1": Festinger & Carlsmith 1959 (disonans kognitif) + 3 pengajaran + emas.
 * Grade: sepia makmal 1959 -> ungu disonans -> cyan pengajaran -> merah bocor -> emas. Finale CTA kecil & premium. */

// ------------------------------------------------------------ colour grade
const KEYS = [
  [0, [255, 190, 110], [255, 120, 60]],
  [30, [255, 190, 110], [255, 120, 60]],
  [36, [200, 120, 255], [255, 80, 180]],
  [50, [200, 120, 255], [255, 80, 180]],
  [53, [240, 235, 255], [190, 170, 255]],
  [57, [90, 225, 255], [140, 150, 255]],
  [62, [90, 225, 255], [140, 150, 255]],
  [63, [255, 95, 95], [255, 160, 90]],
  [64.5, [255, 95, 95], [255, 160, 90]],
  [66, [255, 204, 96], [255, 140, 60]],
  [90, [255, 204, 96], [255, 140, 60]],
];

// ------------------------------------------------------------ config
const CFG = {
  hud: null,
  glitchFromBar: ACT3,
  watermark: { text: '@taufik.pg', y: 1700, alpha: 0.6, fromBar: 0.5, toBar: FINALE },
};
useImage('taufik', 'taufik.png');

// ------------------------------------------------------------ shared bits
const RED = '#ff5a5a';
function label(txt, x, y, size = 32, color = null, a = 1) {
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = color || '#fff'; ctx.shadowColor = color || ca(1); ctx.shadowBlur = 16;
  ctx.font = `700 ${size}px Mono`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y); ctx.restore();
}
function big(txt, x, y, size, color = '#fff') {
  ctx.save(); ctx.fillStyle = color; ctx.shadowColor = ca(1); ctx.shadowBlur = 24; ctx.font = `900 ${size}px Orb`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y); ctx.restore();
}
function goldbar(x, y, s = 1, glow = 40) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const g = ctx.createLinearGradient(0, -60, 0, 60); g.addColorStop(0, '#fff3c4'); g.addColorStop(0.45, '#ffcc60'); g.addColorStop(1, '#e0892e');
  ctx.fillStyle = g; ctx.shadowColor = 'rgba(255,190,80,1)'; ctx.shadowBlur = glow;
  ctx.beginPath(); ctx.moveTo(-150, 60); ctx.lineTo(-110, -60); ctx.lineTo(110, -60); ctx.lineTo(150, 60); ctx.closePath(); ctx.fill();
  ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(80,40,0,0.55)'; ctx.font = '900 34px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('999.9', 0, 5);
  ctx.restore();
}
function bill(x, y, s = 1, txt = '$1', a = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = a;
  ctx.fillStyle = '#070a12'; rr(-170, -80, 340, 160, 12); ctx.fill(); neon(6, 18); ctx.stroke();
  neon(3, 6, 0.6); rr(-150, -62, 300, 124, 8); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 18; ctx.font = '900 64px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 4);
  ctx.restore();
}
function bubble(x, y, w, h, txt, size = 44, tailLeft = true) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = '#070a12'; rr(-w / 2, -h / 2, w, h, 40); ctx.fill(); neon(7); ctx.stroke();
  ctx.beginPath(); const tx = tailLeft ? -w / 2 + 70 : w / 2 - 70; ctx.moveTo(tx - 30, h / 2 - 2); ctx.lineTo(tx - (tailLeft ? 40 : -40), h / 2 + 60); ctx.lineTo(tx + 30, h / 2 - 2); neon(7); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 14; ctx.font = `700 ${size}px Grot`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 0);
  ctx.restore();
}
function brain(x, y, s = 1, crack = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); neon(8, 26);
  ctx.beginPath();
  ctx.moveTo(0, -180); ctx.bezierCurveTo(-90, -230, -220, -170, -210, -60); ctx.bezierCurveTo(-280, 0, -230, 130, -130, 140);
  ctx.bezierCurveTo(-90, 200, -10, 190, 0, 150); ctx.bezierCurveTo(10, 190, 90, 200, 130, 140);
  ctx.bezierCurveTo(230, 130, 280, 0, 210, -60); ctx.bezierCurveTo(220, -170, 90, -230, 0, -180); ctx.closePath(); ctx.stroke();
  neon(5, 12, 0.7); ctx.beginPath(); ctx.moveTo(0, -180); ctx.lineTo(0, 150); ctx.stroke();
  [[-1, -80], [-1, 30], [1, -80], [1, 30]].forEach(([k, yy]) => { ctx.beginPath(); ctx.moveTo(k * 40, yy); ctx.quadraticCurveTo(k * 120, yy - 40, k * 170, yy + 10); ctx.stroke(); });
  if (crack > 0) { ctx.strokeStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 24; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-20, -190); ctx.lineTo(20 * crack, -100 * crack - 90 * (1 - crack)); ctx.lineTo(-25 * crack, -20 * crack - 90 * (1 - crack)); ctx.lineTo(15 * crack, 70 * crack - 90 * (1 - crack)); ctx.stroke(); }
  ctx.restore();
}
function pegboard(lt, rot = true) {
  ctx.fillStyle = '#070a12'; rr(-280, -220, 560, 440, 24); ctx.fill(); neon(7); ctx.stroke();
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) {
    const x = -200 + i * 80, y = -150 + j * 100, k = j * 6 + i;
    const turn = rot ? Math.min(1, Math.max(0, (lt * 6 - k) )) : 0;
    ctx.save(); ctx.translate(x, y); ctx.rotate(turn * Math.PI / 2);
    neon(4, 8, 0.8); ctx.beginPath(); ctx.arc(0, 0, 24, 0, TAU); ctx.stroke();
    fillA(k < lt * 6 ? 1 : 0.4, 10); ctx.fillRect(-4, -24, 8, 20); ctx.restore();
  }
}
function scaleBal(lt, gold = true) {
  neon(7); ctx.beginPath(); ctx.moveTo(0, -200); ctx.lineTo(0, 200); ctx.moveTo(-120, 200); ctx.lineTo(120, 200); ctx.stroke();
  const tilt = Math.sin(lt * 2) * 0.05;
  ctx.save(); ctx.translate(0, -200); ctx.rotate(tilt); ctx.beginPath(); ctx.moveTo(-240, 0); ctx.lineTo(240, 0); ctx.stroke();
  [-240, 240].forEach((x, k) => { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - 70, 140); ctx.moveTo(x, 0); ctx.lineTo(x + 70, 140); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 90, 140); ctx.quadraticCurveTo(x, 190, x + 90, 140); ctx.stroke(); });
  if (gold) goldbar(-240, 115, 0.45, 20);
  ctx.restore();
  ctx.save(); ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 20; ctx.font = '900 54px Orb'; ctx.textAlign = 'center'; ctx.fillText('100.00 g', 0, 290); ctx.restore();
}
function mirror(lt, withGold = false) {
  ctx.fillStyle = '#070a12'; ctx.beginPath(); ctx.ellipse(0, -30, 190, 250, 0, 0, TAU); ctx.fill(); neonA(10, 30); ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, -30, 180, 240, 0, 0, TAU); ctx.clip();
  const sx = ((lt * 300) % 700) - 350; const g = ctx.createLinearGradient(sx - 60, 0, sx + 60, 0); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,255,255,0.35)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(-200, -300, 400, 540);
  if (withGold) goldbar(0, -20, 0.8);
  ctx.restore();
  neon(8); ctx.beginPath(); ctx.moveTo(0, 220); ctx.lineTo(0, 290); ctx.moveTo(-90, 290); ctx.lineTo(90, 290); ctx.stroke();
}
function coin(x, y, r = 20) { fillA(1, 14); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 0.65, 0, TAU); ctx.stroke(); }
function person(x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); neon(6, 16);
  ctx.beginPath(); ctx.arc(0, -60, 34, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 60, 70, Math.PI, 0); ctx.stroke(); ctx.restore();
}

// ------------------------------------------------------------ icons
const ICON = {
  hook(lt) {
    bill(-250, -60, 0.7, '$1'); bill(230, -60, 0.95, '$20');
    const p = eback(lt * 2 - 0.8);
    if (p > 0) { ctx.save(); ctx.translate(-250, 150); ctx.scale(p, p); label('"SERONOK!"', 0, 0, 40); ctx.restore(); ctx.save(); ctx.translate(230, 150); ctx.scale(p, p); label('"BOSAN."', 0, 0, 40, RED); ctx.restore(); }
    big('VS', 0, -60, 50);
  },
  lab(lt) {
    person(-150, 20, 1.3); person(150, 20, 1.3);
    ctx.save(); ctx.translate(150, 90); ctx.rotate(-0.15); ctx.fillStyle = '#070a12'; rr(-45, -60, 90, 120, 8); ctx.fill(); neon(5, 10); ctx.stroke();
    for (let i = 0; i < 4; i++) { neon(3, 4, 0.7); ctx.beginPath(); ctx.moveTo(-28, -30 + i * 22); ctx.lineTo(28 * eo(lt * 2 - i * 0.2), -30 + i * 22); ctx.stroke(); } ctx.restore();
    label('F', -150, -240, 40); label('C', 150, -240, 40);
  },
  spools(lt) {
    ctx.fillStyle = '#070a12'; rr(-300, -120, 600, 240, 20); ctx.fill(); neon(7); ctx.stroke();
    for (let i = 0; i < 12; i++) {
      const x = -250 + (i % 6) * 100, y = -50 + Math.floor(i / 6) * 100;
      const out = ((lt * 3 + i * 0.37) % 2) > 1;
      ctx.save(); ctx.translate(x, y - (out ? 50 : 0)); ctx.globalAlpha = out ? 0.5 : 1;
      neonA(5, 14); rr(-26, -30, 52, 60, 10); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-34, -30); ctx.lineTo(34, -30); ctx.moveTo(-34, 30); ctx.lineTo(34, 30); ctx.stroke(); ctx.restore();
    }
    label('1:00:00', 0, 220, 44, null, 1);
  },
  pegs(lt) { pegboard(lt); label('¼ ↻', 200, -270, 44); },
  lie(lt) {
    person(-170, 120, 1.2); person(200, 120, 1.2);
    const p = eback(lt * 2 - 0.3); if (p > 0) { ctx.save(); ctx.translate(-20, -160); ctx.scale(p, p); bubble(0, 0, 440, 130, 'SERONOK!', 60); ctx.restore(); }
    ctx.save(); ctx.globalAlpha = eo(lt * 2 - 1); ctx.strokeStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 20; ctx.lineWidth = 7; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(-170, 20); ctx.bezierCurveTo(-170, -60, 200, -60, 200, 20); ctx.stroke(); ctx.restore();
  },
  twenty(lt) { const s = eback(lt * 2); bill(0, -40, 1.3 * s, '$20'); for (let i = 0; i < 5; i++) coin(-160 + i * 80, 160 + Math.sin(lt * 4 + i) * 6, 24); },
  one(lt) { const s = eback(lt * 2); bill(0, 0, 0.75 * s, '$1'); label('...', 0, 150, 60, null, eo(lt * 2 - 0.6)); },
  interview(lt) {
    ctx.fillStyle = '#070a12'; rr(-200, -260, 400, 520, 20); ctx.fill(); neon(7); ctx.stroke();
    neon(6, 10); rr(-70, -290, 140, 60, 12); ctx.stroke();
    ['Menarik?', 'Berguna?', 'Ulang lagi?'].forEach((q, i) => {
      ctx.save(); ctx.fillStyle = '#fff'; ctx.font = '700 38px Grot'; ctx.textAlign = 'left'; ctx.fillText(q, -150, -150 + i * 120); ctx.restore();
      neon(4, 8, 0.7); ctx.strokeRect(100, -178 + i * 120, 44, 44);
      if (lt * 2 > i + 0.5) label('✓', 122, -155 + i * 120, 40);
    });
  },
  meter(lt, v = -0.05, col = null) {
    neon(6, 12); ctx.beginPath(); ctx.arc(0, 120, 260, Math.PI, 0); ctx.stroke();
    for (let i = -5; i <= 5; i++) { const a = Math.PI + (i + 5) / 10 * Math.PI; neon(4, 6, 0.7); ctx.beginPath(); ctx.moveTo(Math.cos(a) * 230 + 0, 120 + Math.sin(a) * 230); ctx.lineTo(Math.cos(a) * 260, 120 + Math.sin(a) * 260); ctx.stroke(); }
    label('-5', -290, 170, 28); label('+5', 290, 170, 28); label('0', 0, -175, 28);
    const val = v * eo(lt * 1.5), a = Math.PI + (val + 5) / 10 * Math.PI;
    ctx.save(); ctx.strokeStyle = col || ca(1); ctx.shadowColor = col || ca(1); ctx.shadowBlur = 24; ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 120); ctx.lineTo(Math.cos(a) * 210, 120 + Math.sin(a) * 210); ctx.stroke(); ctx.restore();
    fillA(1, 20); ctx.beginPath(); ctx.arc(0, 120, 16, 0, TAU); ctx.fill();
    big((val >= 0 ? '+' : '') + val.toFixed(2), 0, 230, 60);
  },
  weird(lt) { brain(0, 0, 1); big('?', 0, -10 + Math.sin(lt * 5) * 8, 150); },
  praise(lt) {
    const p = eback(lt * 2); ctx.save(); ctx.scale(p, p); bubble(0, -40, 560, 170, 'MENARIK SANGAT!', 56); ctx.restore();
    for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.45; label('★', Math.cos(a) * 330, -40 + Math.sin(a) * 250, 54, null, eo(lt * 3 - i * 0.2)); }
    bill(0, 240, 0.5, '$1');
  },
  results(lt) {
    const rows = [['KAWALAN', -0.45], ['$20', -0.05], ['$1', 1.35]];
    neon(4, 6, 0.6); ctx.beginPath(); ctx.moveTo(0, -230); ctx.lineTo(0, 230); ctx.stroke();
    rows.forEach(([n, v], i) => {
      const y = -150 + i * 150, p = eo(lt * 1.6 - i * 0.25), w = v * 170 * p;
      ctx.save(); if (v > 0) fillA(1, 26); else { ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.shadowBlur = 0; }
      ctx.fillRect(Math.min(0, w), y - 34, Math.abs(w), 68); ctx.restore();
      label(n, v < 0 ? 170 : -170, y, 36, v > 0 ? null : '#dfe9f2');
      label((v > 0 ? '+' : '') + (v * p).toFixed(2), v < 0 ? w - 90 : w + 100, y, 34, '#fff', p);
    });
    label('SKALA -5 → +5', 0, 280, 28);
  },
  ego(lt) { brain(0, 0, 1, eo(lt * 1.5)); },
  mask(lt) {
    bill(0, 170, 0.6, '$1');
    ctx.save(); ctx.translate(0, -90); neonA(9, 30);
    ctx.beginPath(); ctx.moveTo(-230, -40); ctx.quadraticCurveTo(0, -120, 230, -40); ctx.quadraticCurveTo(220, 90, 60, 90); ctx.quadraticCurveTo(0, 40, -60, 90); ctx.quadraticCurveTo(-220, 90, -230, -40); ctx.closePath(); ctx.stroke();
    fillA(0.9, 16); [-110, 110].forEach(x => { ctx.beginPath(); ctx.ellipse(x, 0, 55, 28, 0, 0, TAU); ctx.fill(); }); ctx.restore();
  },
  rewrite(lt) {
    brain(0, -150, 0.55);
    const t1 = 'Sebab duit', t2 = 'Sebab menarik!';
    const p = clamp(lt / 1.4);
    ctx.save(); ctx.font = '700 60px Grot'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillText(t1, 0, 90);
    const w = ctx.measureText(t1).width; ctx.strokeStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 16; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-w / 2 - 10, 90); ctx.lineTo(-w / 2 - 10 + (w + 20) * clamp(p * 2), 90); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 18; ctx.fillText(t2.slice(0, Math.floor(clamp(p * 2 - 1) * t2.length)), 0, 200); ctx.restore();
  },
  clash(lt) {
    const p = eo(lt * 2);
    ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 16;
    ctx.strokeStyle = ca(1); ctx.shadowColor = ca(1); ctx.shadowBlur = 30; ctx.beginPath(); ctx.moveTo(-330, 0); ctx.lineTo(-330 + 300 * p, 0); ctx.stroke();
    ctx.strokeStyle = cb(1); ctx.shadowColor = cb(1); ctx.beginPath(); ctx.moveTo(330, 0); ctx.lineTo(330 - 300 * p, 0); ctx.stroke(); ctx.restore();
    label('TINDAKAN', -200, -70, 32); label('KEPERCAYAAN', 200, -70, 32);
    if (p > 0.95) { for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; ctx.save(); neonA(4, 20); ctx.beginPath(); ctx.moveTo(Math.cos(a) * 30, Math.sin(a) * 30); ctx.lineTo(Math.cos(a) * (60 + (lt % 0.5) * 200), Math.sin(a) * (60 + (lt % 0.5) * 200)); ctx.stroke(); ctx.restore(); } }
  },
  excuse(lt) {
    ctx.save(); ctx.translate(0, 0); neonA(9, 30);
    ctx.beginPath(); ctx.moveTo(0, -260); ctx.quadraticCurveTo(200, -230, 230, -170); ctx.quadraticCurveTo(230, 120, 0, 270); ctx.quadraticCurveTo(-230, 120, -230, -170); ctx.quadraticCurveTo(-200, -230, 0, -260); ctx.closePath(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.scale(0.6, 0.6); ICON.mask(lt); ctx.restore();
  },
  chartdown(lt) {
    neon(4, 0, 0.3); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-320, -200 + i * 100); ctx.lineTo(320, -200 + i * 100); ctx.stroke(); }
    const n = Math.floor(eo(lt * 1.5) * 30); const r = mulberry(4);
    ctx.save(); ctx.strokeStyle = RED; ctx.shadowColor = '#ff3030'; ctx.shadowBlur = 24; ctx.lineWidth = 10; ctx.lineJoin = 'round';
    ctx.beginPath(); let ex = 0, ey = 0;
    for (let i = 0; i <= n; i++) { ex = -320 + i * 21; ey = -200 + Math.pow(i / 30, 1.4) * 380 + (r() - 0.5) * 40; i ? ctx.lineTo(ex, ey) : ctx.moveTo(ex, ey); }
    ctx.stroke(); ctx.restore();
  },
  bubbleNoProfit(lt) { const p = eback(lt * 2); ctx.save(); ctx.scale(p, p); bubble(0, -60, 640, 170, '"Bukan nak untung..."', 48); ctx.restore(); ctx.save(); ctx.translate(0, 190); ctx.scale(0.45, 0.45); ICON.chartdown(lt); ctx.restore(); },
  mirror(lt) { mirror(lt); person(0, -10, 1.2); },
  compass(lt) {
    neon(8); ctx.beginPath(); ctx.arc(0, 0, 260, 0, TAU); ctx.stroke();
    const a = lerp(2.2, 0, eo(lt * 1.2)) + Math.sin(lt * 6) * 0.05 * (1 - eo(lt));
    ctx.save(); ctx.rotate(a); fillA(1, 30); ctx.beginPath(); ctx.moveTo(0, -210); ctx.lineTo(30, 0); ctx.lineTo(-30, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.moveTo(0, 210); ctx.lineTo(30, 0); ctx.lineTo(-30, 0); ctx.closePath(); ctx.fill(); ctx.restore();
    label('U', 0, -290, 36);
  },
  leak(lt) {
    ctx.fillStyle = '#070a12'; rr(-240, -200, 480, 300, 40); ctx.fill(); neon(8); ctx.stroke();
    const n = 1500 - Math.floor(eo(lt / 2) * 1380);
    big('RM' + n, 0, -60, 64);
    for (let i = 0; i < 5; i++) { const ph = (lt * 1.1 + i / 5) % 1; ctx.save(); ctx.globalAlpha = 1 - ph; coin(-120 + i * 60, 110 + ph * 200, 16 + (i % 2) * 4); ctx.restore(); }
  },
  cart(lt) {
    const x = Math.sin(lt * 2) * 30;
    ctx.save(); ctx.translate(x, 0); neon(9, 26);
    ctx.beginPath(); ctx.moveTo(-300, -200); ctx.lineTo(-220, -200); ctx.lineTo(-160, 100); ctx.lineTo(220, 100); ctx.lineTo(270, -120); ctx.lineTo(-200, -120); ctx.stroke();
    [-120, 180].forEach(cx => { ctx.beginPath(); ctx.arc(cx, 170, 34, 0, TAU); ctx.stroke(); });
    for (let i = 0; i < 4; i++) { fillA(0.85, 14); rr(-150 + i * 95, -110 - (i % 2) * 50, 70, 90 + (i % 2) * 50, 10); ctx.fill(); }
    ctx.restore();
    label('"PUAS HARI INI"', 0, 290, 34);
  },
  loop(lt) {
    ctx.save(); ctx.rotate(lt * 1.5); neonA(12, 30); ctx.beginPath(); ctx.arc(0, 0, 230, 0.3, TAU - 0.3); ctx.stroke();
    fillA(1, 30); ctx.beginPath(); ctx.moveTo(230 * Math.cos(-0.3), 230 * Math.sin(-0.3)); ctx.lineTo(230 * Math.cos(-0.3) + 50, 230 * Math.sin(-0.3) - 40); ctx.lineTo(230 * Math.cos(-0.3) - 30, 230 * Math.sin(-0.3) - 60); ctx.closePath(); ctx.fill(); ctx.restore();
    big('RM', 0, 0, 90);
    label('TAHUN 1 · 2 · 3 ·...', 0, 320, 30);
  },
  goldmirror(lt) { mirror(lt, true); },
  gram(lt) { scaleBal(lt); },
  stack(lt) {
    const n = Math.floor(eo(lt / 1.3) * 10);
    const rows = [4, 3, 2, 1]; let k = 0;
    rows.forEach((c, j) => { for (let i = 0; i < c; i++) { if (k++ >= n) return; goldbar(-(c - 1) * 80 + i * 160, 200 - j * 100, 0.48, 20); } });
  },
  question(lt) {
    ctx.save(); ctx.translate(-60, -60); const p = eback(lt * 2); ctx.scale(p, p); bubble(0, 0, 520, 150, 'Beli sebab perlu...', 44); ctx.restore();
    ctx.save(); ctx.translate(90, 150); const q = eback(lt * 2 - 0.6); if (q > 0) { ctx.scale(q, q); bubble(0, 0, 460, 130, '...atau alasan?', 44, false); } ctx.restore();
  },
};

// ------------------------------------------------------------ scenes
// COLD OPEN
sc(0, 2, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ctx.globalAlpha = eo(lt / 0.5); ICON.hook(lt); ctx.restore(); ctx.globalAlpha = 1;
  mono('TAHU TAK?', 380, 40, eo(lt / 0.4), null, 18);
  htext('YANG DIBAYAR $1\nLEBIH MEMUJI', 1320, 66, { font: 'Grot', weight: 700, alpha: eo((lt - 1.0) / 0.5), glow: 24 });
  ptext('kerja membosankan berbanding yang dibayar $20', 1480, 38, eo((lt - 1.8) / 0.5));
}, '1959');
// TITLE
sc(2, 4, (lt) => {
  const s = eo(lt / 1.0);
  mono('EKSPERIMEN STANFORD · 1959', 640, 32, eo(lt / 0.5), null, 8);
  htext('PERANGKAP\nALASAN', 820, 116 - 14 * (1 - s), { alpha: s, track: lerp(30, 6, s), glow: 50, lh: 1.12 });
  ctx.save(); ctx.fillStyle = ca(0.9); ctx.shadowColor = ca(1); ctx.shadowBlur = 20; const w = 520 * eo((lt - 0.4) / 0.8); ctx.fillRect(CX - w / 2, 1000, w, 4); ctx.restore();
  ptext('Bagaimana otak menipu diri sendiri\n— dan duit anda ikut bocor', 1130, 46, eo((lt - 1.0) / 0.7), { weight: 700 });
}, '1959');

// ACT 1 — eksperimen (2 bar)
sc(4, 6, era('1959', 'lab', 'FESTINGER &\nCARLSMITH', 'Dua ahli psikologi merangka\nsatu eksperimen yang pelik', { place: 'UNIVERSITI STANFORD' }), '1959');
sc(6, 8, era('1 JAM', 'spools', 'SANGAT\nMEMBOSANKAN', 'Isi dan kosongkan dulang gelendong,\nberulang-ulang', { place: 'TUGASAN PERTAMA', yearSize: 150 }), '1959');
sc(8, 10, era('¼ PUSING', 'pegs', 'PUTAR PASAK', 'Suku pusingan, sebelah tangan,\nsatu demi satu — monoton', { place: 'TUGASAN KEDUA', yearSize: 130, subOff: 125 }), '1959');
sc(10, 12, era('BOHONG', 'lie', 'PENIPUAN KECIL', 'Beritahu peserta seterusnya:\n"Tugasan ini seronok!"', { place: 'PERMINTAAN PENGKAJI', yearSize: 140, subOff: 125 }), '1959');
sc(12, 14, era('$20', 'twenty', 'KUMPULAN A', 'Upah yang lumayan pada zaman itu', { place: 'UPAH BERBOHONG', yearSize: 170 }), '1959');
sc(14, 16, era('$1', 'one', 'KUMPULAN B', 'Upah yang hampir tak bernilai', { place: 'UPAH BERBOHONG', yearSize: 170 }), '1959');

// ACT 2 — keputusan & kenapa (1 bar)
sc(16, 17, era('SELEPAS ITU', 'interview', 'PERASAAN SEBENAR', 'Mereka ditemu duga tentang tugasan tadi', { place: 'TEMU DUGA', yearSize: 110 }), '1959');
sc(17, 18, era('$20', 'meter', 'MENGAKU BOSAN', 'Mereka ada alasan: dibayar mahal', { place: 'KUMPULAN A', arg: -0.05, yearSize: 170 }), '1959');
sc(18, 19, era('$1', 'weird', 'TAPI YANG INI...', 'Sesuatu yang pelik berlaku', { place: 'KUMPULAN B', yearSize: 170 }), '1959');
sc(19, 20, era('$1', 'praise', 'MEREKA MEMUJI', 'Tugasan itu "menarik" kata mereka', { place: 'KUMPULAN B', yearSize: 170 }), '1959');
sc(20, 21, era('SKOR', 'results', 'KEPUTUSAN SEBENAR', 'Kumpulan $1 paling tinggi menilai tugasan', { place: 'FESTINGER & CARLSMITH, 1959', yearSize: 150 }), '1959');
sc(21, 22, era('KENAPA?', 'ego', 'EGO TAK TERIMA', 'Minda sukar menelan hakikat', { place: 'SOALAN BESAR', yearSize: 140 }), '1959');
sc(22, 23, era('$1', 'mask', 'BOHONG DEMI $1?', 'Maruah terasa murah sangat', { place: 'KETEGANGAN DALAMAN', yearSize: 170 }), '1959');
sc(23, 24, era('OTAK', 'rewrite', 'UBAH CERITA', '"Aku buat sebab ia menarik,\nbukan sebab duit"', { place: 'JALAN PINTAS MINDA', yearSize: 150, subOff: 125 }), '1959');
sc(24, 25, era('DISONANS', 'clash', 'KOGNITIF', 'Bila tindakan bercanggah\ndengan kepercayaan', { place: 'NAMA SAINTIFIKNYA', yearSize: 120, subOff: 125 }), '1959');
sc(25, 26, era('HASILNYA', 'excuse', 'ALASAN PALSU', 'Direka demi menjaga maruah diri', { place: 'OTAK MELINDUNGI EGO', yearSize: 120 }), '1959');

// PIVOT
sc(26, 28, (lt) => {
  ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(CX, IY); ctx.globalAlpha = eo(lt / 1.2); ICON.mirror(lt); ctx.restore(); ctx.globalAlpha = 1;
  mono('APA KITA BOLEH BELAJAR?', 330, 36, eo((lt - 0.2) / 0.6), null, 8);
  htext('3 PENGAJARAN', 1420, 88, { font: 'Grot', weight: 700, alpha: eo((lt - 1.4) / 0.5), glow: 40, scale: 1 + 0.02 * lt });
  ptext('dari pelajar $1', 1540, 44, eo((lt - 2.2) / 0.5));
}, '1959');

// ACT 3 (setengah bar)
const act3 = [
  ['01', 'rewrite', 'KITA REKA ALASAN', 'Untuk benarkan kesilapan sendiri', 'PENGAJARAN'],
  ['01', 'ego', 'ENGGAN MENGAKU', 'Walau kerugian depan mata', 'PENGAJARAN'],
  ['02', 'bubbleNoProfit', '"BUKAN NAK UNTUNG"', 'Ayat penyedap bila bisnes rugi', 'PENGAJARAN'],
  ['02', 'chartdown', 'RUGI TETAP RUGI', 'Baca nombor, bukan alasan', 'PENGAJARAN'],
  ['03', 'mirror', 'TERIMA HAKIKAT', 'Berani akui kesilapan', 'PENGAJARAN'],
  ['03', 'compass', 'SYARAT PERTAMA', 'Untuk pulihkan halatuju hidup', 'PENGAJARAN'],
  ['WANG', 'leak', 'SIMPANAN BOCOR', 'Pun kita reka alasan', 'SAMA JUGA'],
  ['ALASAN', 'cart', '"REZEKI BOLEH CARI"', 'Yang penting puas hari ini', 'AYAT PENYEDAP'],
  ['KITARAN', 'loop', 'TERPERANGKAP', 'Masalah sama bertahun-tahun', 'AKIBATNYA'],
  ['EMAS', 'goldmirror', 'CERMIN KEJUJURAN', 'Tiada ruang alasan palsu', 'BEZANYA...'],
  ['GRAM', 'gram', 'NOMBOR SEBENAR', 'Tak boleh dimanipulasi ayat', 'BEZANYA...'],
  ['ASET', 'stack', 'BUKAN ILUSI', 'Aset sebenar, bukan puas sekejap', 'BEZANYA...'],
];
act3.forEach(([top, icon, title, sub, lab], i) => {
  sc(28 + i * 0.5, 28.5 + i * 0.5, (lt, d) => {
    const T = lt / d;
    ctx.save(); ctx.translate(CX, IY); const z = lerp(1.3, 0.95, eo(T * 3)); ctx.scale(z, z); ICON[icon](lt * 1.8 + 0.4); ctx.restore();
    htext(top, 320, top.length > 4 ? 120 : 160, { track: 8, scale: lerp(1.15, 1, eo(T * 4)) });
    mono(lab, 440, 32, 1);
    htext(title, 1400, title.length > 16 ? 64 : 78, { font: 'Grot', weight: 700, track: 2, alpha: eo(T * 6), glow: 26 });
    ptext(sub, 1510, 42, eo(T * 6 - 0.4));
  }, '1959');
});
// word slams
const words = ['JUJUR', 'AKUI', 'TERIMA', 'UKUR', 'SIMPAN', 'BINA', 'TELUS'];
words.forEach((w, i) => {
  sc(WORDS + i / 4, WORDS + (i + 1) / 4, (lt, d) => {
    const T = lt / d;
    htext(w, 960, 180, { track: 10, scale: lerp(1.6, 1, eo(T * 4)) + T * 0.05, glow: 60 });
    mono(String(i + 1).padStart(2, '0') + ' / 07', 1130, 34, 0.9, null, 8);
  }, '1959');
});
sc(BREATH, DROP, (lt, d) => {
  ctx.fillStyle = 'rgba(0,0,0,0.75)'; ctx.fillRect(0, 0, W, H);
  const r = 4 + 36 * (lt / d) ** 2; fillA(1, 80); ctx.beginPath(); ctx.arc(CX, 960, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
}, '1959');

// DROP
sc(36, 38, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ICON.goldmirror(lt); ctx.restore();
  mono('KALAU ANDA MAHU', 330, 36, eo(lt * 3), null, 10);
  htext('BERHENTI MENIPU\nDIRI SENDIRI', 1360, 80, { track: 2, glow: 50, lh: 1.15, scale: lerp(1.2, 1, eo(lt * 2)) });
  ptext('Mulakan simpanan yang telus\ndalam emas fizikal, hari ini', 1580, 42, eo(lt * 2 - 0.8));
}, '1959');
sc(38, 40, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ICON.question(lt); ctx.restore();
  mono('KAWAN-KAWAN, JUJUR DARI HATI', 330, 32, eo(lt * 3), null, 6);
  htext('PERNAH?', 1330, 150, { track: 8, glow: 60, scale: lerp(1.3, 1, eo(lt * 2)) });
  ptext('Beli barang tak berfaedah, lepas tu\nreka alasan depan kawan? Komen di bawah.', 1540, 40, eo(lt * 2 - 0.6));
}, '1959');
const evo = [['pegs', '1959'], ['twenty', '$20'], ['one', '$1'], ['rewrite', 'ALASAN'], ['leak', 'BOCOR'], ['mirror', 'JUJUR'], ['gram', 'GRAM'], ['stack', 'ASET']];
evo.forEach(([icon, lab], i) => {
  sc(40 + i / 4, 40 + (i + 1) / 4, (lt, d) => {
    const T = lt / d;
    htext(i < 4 ? 'DARI ALASAN' : 'KE KEJUJURAN', 360, 72, { font: 'Grot', weight: 700, track: 8, glow: 30 });
    ctx.save(); ctx.translate(CX, IY + 20); const z = lerp(0.95, 0.8, eo(T * 3)); ctx.scale(z, z); ICON[icon](1 + lt, -0.05); ctx.restore();
    htext(lab, 1420, lab.length > 5 ? 120 : 150, { track: 12, scale: lerp(1.3, 1, eo(T * 4)), glow: 40 });
  }, '1959');
});

// FINALE — CTA kecil & premium
sc(42, 45, (lt) => {
  const s = eo(lt / 1.0);
  htext('JUJUR DENGAN\nNOMBOR ANDA', 640, 64, { alpha: s, track: lerp(24, 6, s), glow: 40, lh: 1.2 });
  ptext('Moga perkongsian ini bermanfaat.', 790, 32, eo((lt - 0.5) / 0.6), { color: '#cfd8e3' });
  // potret bulat kecil
  const p = eo((lt - 0.7) / 0.8), R = 150, cy = 1060;
  ctx.save(); ctx.globalAlpha = p;
  ctx.strokeStyle = ca(0.9); ctx.lineWidth = 3; ctx.shadowColor = ca(1); ctx.shadowBlur = 24;
  ctx.beginPath(); ctx.arc(CX, cy, R + 12, -Math.PI / 2, -Math.PI / 2 + TAU * p); ctx.stroke();
  ctx.shadowBlur = 0; ctx.beginPath(); ctx.arc(CX, cy, R, 0, TAU); ctx.clip();
  const g = ctx.createRadialGradient(CX, cy - 40, 0, CX, cy, R); g.addColorStop(0, 'rgba(60,45,20,1)'); g.addColorStop(1, 'rgba(12,10,8,1)');
  ctx.fillStyle = g; ctx.fillRect(CX - R, cy - R, R * 2, R * 2);
  const im = IMG.taufik, sw = 640, sx = 180, sy = 20;
  ctx.drawImage(im, sx, sy, sw, sw, CX - R, cy - R + 10, R * 2, R * 2);
  ctx.restore();
  htext('TAUFIK MUSA', 1285, 46, { font: 'Grot', weight: 700, alpha: eo((lt - 1.1) / 0.5), track: 8, glow: 18 });
  mono('DEALER PUBLIC GOLD', 1340, 22, eo((lt - 1.3) / 0.5), null, 10);
  ctx.save(); ctx.globalAlpha = eo((lt - 1.5) / 0.5); ctx.fillStyle = ca(0.6); ctx.fillRect(CX - 60, 1390, 120, 2); ctx.restore();
  mono('SHARE  ·  LIKE  ·  FOLLOW', 1450, 26, eo((lt - 1.7) / 0.5), '#ffffff', 10);
  htext('@taufik.pg', 1510, 40, { font: 'Grot', weight: 700, alpha: eo((lt - 1.9) / 0.5), track: 4, glow: 20 });
  if (lt > 5.3) { ctx.fillStyle = `rgba(0,0,0,${clamp((lt - 5.3) / 0.65)})`; ctx.fillRect(0, 0, W, H); }
}, '1959');
