/* scenes.js — "SISI GELAP BULAN": Chang'e-4 (2019) + 3 pengajaran + analogi emas.
 * Grade: biru angkasa (sejarah) -> merah misi China -> cyan (pengajaran) -> emas (kewangan). */

// ------------------------------------------------------------ colour grade
const KEYS = [
  [0, [160, 185, 255], [100, 110, 255]],
  [28, [160, 185, 255], [100, 110, 255]],
  [34, [255, 96, 80], [255, 190, 90]],
  [50, [255, 96, 80], [255, 190, 90]],
  [53, [235, 238, 255], [170, 180, 255]],
  [57, [90, 225, 255], [170, 120, 255]],
  [62, [90, 225, 255], [170, 120, 255]],
  [64.5, [255, 204, 96], [255, 140, 60]],
  [90, [255, 204, 96], [255, 140, 60]],
];

// ------------------------------------------------------------ config
const CFG = {
  hud: {
    fromBar: ACT1, toBar: PIVOT, start: 1959, end: 2019,
    levels: [2018, 2018, 2018, 2019, 2019],           // bar isyarat menyala selepas Queqiao
    tag: (bars) => bars ? 'ISYARAT: ADA' : 'ISYARAT: TIADA',
  },
  glitchFromBar: ACT3,
};

// ------------------------------------------------------------ shared drawing bits
function moon(r, lt = 0, dark = 0) {
  ctx.save();
  ctx.fillStyle = '#0b0e16'; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill();
  neon(6, 22, 0.9); ctx.stroke();
  ctx.clip();
  const cr = mulberry(12);
  for (let i = 0; i < 14; i++) {
    const a = cr() * TAU, d = Math.sqrt(cr()) * r * 0.85, s = r * (0.05 + cr() * 0.13);
    neon(3, 6, 0.45); ctx.beginPath(); ctx.arc(Math.cos(a) * d, Math.sin(a) * d, s, 0, TAU); ctx.stroke();
  }
  if (dark > 0) { ctx.fillStyle = `rgba(2,3,8,${0.85 * dark})`; ctx.fillRect(-r * 1.1 + r * 1.1 * (1 - dark) * 0, -r, r * 2.2, r * 2); }
  ctx.restore();
}
function earth(x, y, r) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = '#06101f'; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill();
  ctx.strokeStyle = 'rgba(120,200,255,0.95)'; ctx.lineWidth = 5; ctx.shadowColor = 'rgba(80,170,255,1)'; ctx.shadowBlur = 24; ctx.stroke();
  ctx.clip(); ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(90,200,140,0.55)';
  [[-0.3, -0.2, 0.35], [0.35, 0.25, 0.3], [0.1, -0.55, 0.2]].forEach(([a, b, c]) => { ctx.beginPath(); ctx.ellipse(a * r, b * r, c * r, c * r * 0.7, 0.5, 0, TAU); ctx.fill(); });
  ctx.restore();
}
function sat(x, y, s = 1, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  fillA(0.9, 22); rr(-26, -26, 52, 52, 6); ctx.fill();
  neon(4, 10);
  [-1, 1].forEach(k => { ctx.strokeRect(k > 0 ? 36 : -106, -18, 70, 36); ctx.beginPath(); ctx.moveTo(k * 26, 0); ctx.lineTo(k * 36, 0); ctx.stroke(); });
  ctx.beginPath(); ctx.arc(0, -46, 22, Math.PI * 0.15, Math.PI * 0.85); ctx.stroke();
  ctx.restore();
}
function lander(x, y, s = 1, flame = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (flame > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(0, 40, 0, 40 + 170 * flame); g.addColorStop(0, cb(0.9)); g.addColorStop(1, cb(0)); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-26, 40); ctx.lineTo(0, 40 + 170 * flame); ctx.lineTo(26, 40); ctx.fill(); ctx.restore(); }
  ctx.fillStyle = '#070a12'; rr(-80, -60, 160, 100, 8); ctx.fill(); neon(7); ctx.stroke();
  fillA(0.85, 16); ctx.fillRect(-60, -44, 120, 22);
  neon(6, 12);
  [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(k * 60, 40); ctx.lineTo(k * 120, 110); ctx.lineTo(k * 145, 110); ctx.stroke(); });
  ctx.beginPath(); ctx.moveTo(30, -60); ctx.lineTo(60, -130); ctx.stroke();
  ctx.beginPath(); ctx.arc(60, -150, 26, Math.PI * 0.1, Math.PI * 0.9, true); ctx.stroke();
  ctx.restore();
}
function rover(x, y, s = 1, lt = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  neon(6, 14);
  ctx.fillStyle = '#070a12'; rr(-110, -40, 220, 60, 8); ctx.fill(); ctx.stroke();
  fillA(0.8, 16); ctx.fillRect(-150, -62, 90, 14); ctx.fillRect(60, -62, 90, 14);
  neon(5, 10); ctx.beginPath(); ctx.moveTo(-10, -40); ctx.lineTo(-10, -110); ctx.stroke(); rr(-40, -140, 60, 32, 6); ctx.stroke();
  for (let i = 0; i < 3; i++) {
    const wx = -85 + i * 85;
    ctx.save(); ctx.translate(wx, 45); ctx.rotate(lt * 4);
    neon(5, 10); ctx.beginPath(); ctx.arc(0, 0, 26, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}
function ground(y = 200, w = 380) {
  neon(5, 14, 0.8); ctx.beginPath(); ctx.moveTo(-w, y);
  for (let x = -w; x <= w; x += 40) ctx.lineTo(x, y + Math.sin(x * 0.05) * 6);
  ctx.stroke();
}
function goldbar(x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const g = ctx.createLinearGradient(0, -60, 0, 60); g.addColorStop(0, '#fff3c4'); g.addColorStop(0.45, ca(1)); g.addColorStop(1, cb(1));
  ctx.fillStyle = g; ctx.shadowColor = ca(1); ctx.shadowBlur = 40;
  ctx.beginPath(); ctx.moveTo(-150, 60); ctx.lineTo(-110, -60); ctx.lineTo(110, -60); ctx.lineTo(150, 60); ctx.closePath(); ctx.fill();
  ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(80,40,0,0.55)'; ctx.font = '900 34px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('999.9', 0, 5);
  ctx.restore();
}

// ------------------------------------------------------------ icons (centred at 0,0, radius ~300)
const ICON = {
  hook(lt) {            // bulan separuh gelap, isyarat putus
    moon(250, lt);
    ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 252, -Math.PI / 2, Math.PI / 2); ctx.closePath(); ctx.fillStyle = 'rgba(0,0,0,0.88)'; ctx.fill(); ctx.restore();
    const on = Math.floor(lt * 3) % 2;
    ctx.save(); ctx.globalAlpha = on ? 1 : 0.25; ctx.fillStyle = cb(1); ctx.font = '700 34px Mono'; ctx.textAlign = 'center'; ctx.fillText('× NO SIGNAL', 125, 12); ctx.restore();
  },
  luna3(lt) {
    moon(210, lt);
    ctx.save(); ctx.translate(-250 + Math.sin(lt) * 10, -230);
    neon(6, 14); ctx.beginPath(); ctx.ellipse(0, 0, 40, 60, 0.6, 0, TAU); ctx.stroke();
    [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(k * 30, 40); ctx.lineTo(k * 60, 90); ctx.stroke(); });
    ctx.restore();
    const f = Math.max(0, 1 - Math.abs((lt % 2) - 0.6) / 0.12);
    if (f > 0) { ctx.save(); ctx.globalAlpha = f * 0.6; fillA(1, 60); ctx.beginPath(); ctx.moveTo(-230, -200); ctx.lineTo(-120, 200); ctx.lineTo(160, -120); ctx.closePath(); ctx.fill(); ctx.restore(); }
  },
  apollo8(lt) {
    moon(170, lt);
    earth(-300, 220, 60);
    neon(3, 8, 0.5); ctx.setLineDash([10, 14]); ctx.beginPath(); ctx.ellipse(0, 0, 260, 110, -0.25, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
    const a = lt * 1.6, x = Math.cos(a) * 260, y = Math.sin(a) * 110;
    const rx = x * Math.cos(-0.25) - y * Math.sin(-0.25), ry = x * Math.sin(-0.25) + y * Math.cos(-0.25);
    const behind = rx > 60;
    fillA(1, 26); ctx.beginPath(); ctx.moveTo(rx - 18, ry + 14); ctx.lineTo(rx, ry - 20); ctx.lineTo(rx + 18, ry + 14); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.strokeStyle = behind ? 'rgba(255,80,80,0.9)' : ca(0.9); ctx.lineWidth = 4; ctx.setLineDash([8, 10]);
    ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(-300, 220); ctx.stroke(); ctx.restore();
    if (behind) { ctx.save(); ctx.fillStyle = '#ff5a5a'; ctx.font = '700 32px Mono'; ctx.textAlign = 'center'; ctx.fillText('LOSS OF SIGNAL', 0, -230); ctx.restore(); }
  },
  nearside(lt) {
    moon(250, lt);
    earth(0, 330, 50);
    const pts = [[-90, 60], [-30, 120], [40, 70], [100, 20], [-120, -30], [20, -10]];
    pts.forEach(([x, y], i) => { const p = eback(lt * 2.5 - i * 0.15); if (p <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(p, p); neonA(4, 12); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -40); ctx.stroke(); fillA(1, 12); ctx.fillRect(0, -40, 24, 16); ctx.restore(); });
  },
  deadzone(lt) {
    earth(-280, 0, 70);
    moon(120, lt);
    lander(290, 20, 0.45);
    for (let i = 0; i < 4; i++) {
      const ph = (lt * 0.9 + i / 4) % 1, x = lerp(-200, 170, ph);
      if (x > -130) continue;
      ctx.save(); ctx.globalAlpha = 1 - ph; neonA(5, 18); ctx.beginPath(); ctx.arc(x, 0, 40, -0.6, 0.6); ctx.stroke(); ctx.restore();
    }
    ctx.save(); ctx.strokeStyle = '#ff5a5a'; ctx.lineWidth = 10; ctx.shadowColor = '#ff3030'; ctx.shadowBlur = 20;
    ctx.beginPath(); ctx.moveTo(-170, -40); ctx.lineTo(-130, 40); ctx.moveTo(-130, -40); ctx.lineTo(-170, 40); ctx.stroke(); ctx.restore();
  },
  rocket(lt) {
    const y = -eo(lt / 3) * 160;
    ctx.save(); ctx.translate(0, y);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const fl = 180 + Math.sin(lt * 40) * 20; const g = ctx.createLinearGradient(0, 200, 0, 200 + fl); g.addColorStop(0, 'rgba(255,240,200,0.95)'); g.addColorStop(0.3, cb(0.8)); g.addColorStop(1, cb(0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-40, 200); ctx.lineTo(0, 200 + fl); ctx.lineTo(40, 200); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#070a12'; ctx.beginPath(); ctx.moveTo(-50, 200); ctx.lineTo(-50, -120); ctx.quadraticCurveTo(0, -260, 50, -120); ctx.lineTo(50, 200); ctx.closePath(); ctx.fill(); neon(8); ctx.stroke();
    [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(k * 50, 120); ctx.lineTo(k * 100, 210); ctx.lineTo(k * 50, 200); ctx.stroke(); });
    fillA(1, 20); ctx.beginPath(); ctx.arc(0, -60, 20, 0, TAU); ctx.fill();
    ctx.restore();
    ctx.save(); ctx.globalAlpha = 0.5; neon(4, 8, 0.6);
    for (let i = 0; i < 8; i++) { const r = mulberry(i + 5); const cx = (r() - 0.5) * 300, s = 40 + r() * 50 + lt * 30; ctx.beginPath(); ctx.arc(cx, 330 + r() * 30, s, Math.PI, 0); ctx.stroke(); }
    ctx.restore();
  },
  relay(lt) {
    earth(-300, 160, 64);
    ctx.save(); ctx.translate(40, 60); moon(110, lt); ctx.restore();
    lander(40, -30, 0.28);
    const p = eo(lt * 0.9);
    const qx = 260, qy = -200;
    sat(qx, qy, 0.9, Math.sin(lt) * 0.1);
    ctx.save(); neonA(5, 24); ctx.setLineDash([16, 12]); ctx.lineDashOffset = -lt * 60;
    ctx.beginPath(); ctx.moveTo(-300, 160); ctx.lineTo(lerp(-300, qx, clamp(p * 2)), lerp(160, qy, clamp(p * 2))); ctx.stroke();
    if (p > 0.5) { ctx.beginPath(); ctx.moveTo(qx, qy); ctx.lineTo(lerp(qx, 40, (p - 0.5) * 2), lerp(qy, -40, (p - 0.5) * 2)); ctx.stroke(); }
    ctx.restore();
    ctx.save(); ctx.fillStyle = ca(1); ctx.font = '700 30px Mono'; ctx.textAlign = 'center'; ctx.fillText('L2', qx, qy + 70); ctx.restore();
  },
  descend(lt) {
    ground(230);
    const y = lerp(-260, 110, eo(lt / 1.8));
    lander(0, y, 0.9, 1 - eo(lt / 1.8) * 0.6);
  },
  landed(lt) {
    ground(230);
    lander(0, 110, 0.9);
    for (let i = 0; i < 16; i++) { const r = mulberry(i + 40); const a = Math.PI + r() * Math.PI, d = 60 + eo(lt * 1.5) * (120 + r() * 160); ctx.save(); ctx.globalAlpha = clamp(1 - lt * 0.6); fillA(0.8, 10); ctx.beginPath(); ctx.arc(Math.cos(a) * d, 225 + Math.sin(a) * d * 0.25, 5, 0, TAU); ctx.fill(); ctx.restore(); }
    ctx.save(); ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 20; ctx.font = '700 36px Mono'; ctx.textAlign = 'center'; ctx.globalAlpha = eo(lt * 2 - 0.6); ctx.fillText('TOUCHDOWN ✓', 0, -150); ctx.restore();
  },
  basin(lt) {
    const p = eo(lt * 1.2);
    neon(7); ctx.beginPath(); ctx.moveTo(-380, -40);
    for (let i = 0; i <= 40; i++) { const x = lerp(-380, 380, i / 40); const d = Math.pow(Math.sin(i / 40 * Math.PI), 1.4) * 280 * p; ctx.lineTo(x, -40 + d + Math.sin(i * 1.7) * 8); }
    ctx.stroke();
    ctx.save(); neonA(4, 14); ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(-360, -110); ctx.lineTo(360, -110); ctx.stroke(); ctx.setLineDash([]);
    [-360, 360].forEach(x => { ctx.beginPath(); ctx.moveTo(x, -130); ctx.lineTo(x, -90); ctx.stroke(); }); ctx.restore();
    lander(40, 190 * p + 10, 0.25);
  },
  yutu(lt) {
    ground(200);
    const x = lerp(-120, 80, eo(lt / 2));
    neonA(3, 8); ctx.globalAlpha = 0.6;
    for (let k = -200; k < x - 120; k += 24) { ctx.beginPath(); ctx.moveTo(k, 205); ctx.lineTo(k + 12, 205); ctx.stroke(); }
    ctx.globalAlpha = 1;
    lander(-250, 90, 0.5);
    rover(x, 135, 0.9, lt);
  },
  biosphere(lt) {
    ctx.fillStyle = '#070a12'; rr(-150, -220, 300, 440, 40); ctx.fill(); neon(8); ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.roundRect(-150, -220, 300, 440, 40); ctx.clip();
    fillA(0.2, 0); ctx.fillRect(-150, 80, 300, 140);
    const items = [[-80, 130, 'fill'], [-20, 150, 'fill'], [50, 130, 'fill'], [90, 160, 'fill']];
    items.forEach(([x, y], i) => { const p = eback(lt * 2.5 - i * 0.15); if (p <= 0) return; fillA(1, 14); ctx.beginPath(); ctx.ellipse(x, y, 16 * p, 11 * p, 0.4, 0, TAU); ctx.fill(); });
    for (let i = 0; i < 6; i++) { fillB(0.9, 10); ctx.beginPath(); ctx.arc(-90 + i * 34, -120 + Math.sin(lt * 3 + i) * 6, 7, 0, TAU); ctx.fill(); }
    ctx.restore();
    neon(5, 10); ctx.beginPath(); ctx.moveTo(-150, 80); ctx.lineTo(150, 80); ctx.stroke();
  },
  sprout(lt) {
    const p = eo(lt / 1.6);
    neon(6, 14, 0.8); ctx.beginPath(); ctx.moveTo(-220, 200); ctx.lineTo(220, 200); ctx.stroke();
    ctx.save(); ctx.strokeStyle = 'rgba(140,255,150,1)'; ctx.shadowColor = 'rgba(80,255,120,1)'; ctx.shadowBlur = 30; ctx.lineWidth = 12; ctx.lineCap = 'round';
    const h = 280 * p;
    ctx.beginPath(); ctx.moveTo(0, 200); ctx.quadraticCurveTo(-30, 200 - h / 2, 0, 200 - h); ctx.stroke();
    if (p > 0.5) {
      const l = (p - 0.5) * 2; ctx.fillStyle = 'rgba(140,255,150,0.9)';
      [-1, 1].forEach(k => { ctx.save(); ctx.translate(0, 200 - h); ctx.rotate(k * 0.7); ctx.beginPath(); ctx.ellipse(k * 50 * l, -10, 60 * l, 24 * l, 0, 0, TAU); ctx.fill(); ctx.restore(); });
    }
    ctx.restore();
  },
  radar(lt) {
    for (let i = 0; i < 6; i++) {
      const y = -120 + i * 60;
      ctx.save(); ctx.globalAlpha = 0.35 + i * 0.1; neon(4, 8, 0.7); ctx.beginPath(); ctx.moveTo(-340, y);
      for (let x = -340; x <= 340; x += 34) ctx.lineTo(x, y + Math.sin(x * 0.02 + i) * 14);
      ctx.stroke(); ctx.restore();
    }
    rover(0, -210, 0.6, lt);
    const ph = (lt * 1.2) % 1;
    ctx.save(); neonA(6, 24); ctx.globalAlpha = 1 - ph; ctx.beginPath(); ctx.arc(0, -170, 60 + ph * 420, Math.PI * 0.2, Math.PI * 0.8); ctx.stroke(); ctx.restore();
  },
  cold(lt) {
    const p = eo(lt / 1.5);
    neon(8); rr(-50, -280, 100, 440, 50); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 220, 80, 0, TAU); ctx.stroke();
    ctx.save(); ctx.fillStyle = 'rgba(140,200,255,0.95)'; ctx.shadowColor = 'rgba(120,190,255,1)'; ctx.shadowBlur = 30;
    ctx.beginPath(); ctx.arc(0, 220, 60, 0, TAU); ctx.fill(); ctx.fillRect(-24, lerp(-230, 150, p), 48, 150 - lerp(-230, 150, p) + 30); ctx.restore();
    for (let i = 0; i < 8; i++) { neon(4, 6, 0.6); ctx.beginPath(); ctx.moveTo(60, -220 + i * 45); ctx.lineTo(90, -220 + i * 45); ctx.stroke(); }
  },
  record(lt) {
    rover(0, 40, 1.1, lt * 2);
    ground(120, 380);
    const n = Math.floor(eo(lt / 1.6) * 1000);
    ctx.save(); ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 24; ctx.font = '900 70px Orb'; ctx.textAlign = 'center'; ctx.fillText(n + '+ HARI', 0, -200); ctx.restore();
  },
  // --- pengajaran & emas
  bridge(lt) { ICON.relay(lt + 1.5); },
  flag(lt) {
    ctx.save(); ctx.translate(-40, 0); moon(230, lt); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.arc(-40, 0, 232, -Math.PI / 2, Math.PI / 2); ctx.closePath(); ctx.fillStyle = 'rgba(0,0,0,0.8)'; ctx.fill(); ctx.restore();
    const p = eback(lt * 2);
    ctx.save(); ctx.translate(90, 60); ctx.scale(p, p); neonA(7, 20); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -170); ctx.stroke(); fillA(1, 30); ctx.beginPath(); ctx.moveTo(0, -170); ctx.lineTo(110, -140); ctx.lineTo(0, -110); ctx.closePath(); ctx.fill(); ctx.restore();
  },
  tree(lt) {
    const p = eo(lt / 1.2);
    ctx.save(); ctx.strokeStyle = ca(1); ctx.shadowColor = ca(1); ctx.shadowBlur = 26; ctx.lineCap = 'round';
    const br = (x, y, a, len, d) => { if (d > 6 * p) return; const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len; ctx.lineWidth = 12 - d * 1.6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2); ctx.stroke(); br(x2, y2, a - 0.45, len * 0.74, d + 1); br(x2, y2, a + 0.45, len * 0.74, d + 1); };
    br(0, 260, -Math.PI / 2, 150, 0); ctx.restore();
    ctx.save(); ctx.translate(0, 265); ctx.scale(0.25, 0.25); ICON.sprout(9); ctx.restore();
  },
  lost(lt) {
    ground(200);
    rover(0, 135, 0.9, 0);
    const on = Math.floor(lt * 4) % 2;
    ctx.save(); ctx.globalAlpha = on ? 1 : 0.3; ctx.fillStyle = '#ff6060'; ctx.font = '700 40px Mono'; ctx.textAlign = 'center'; ctx.fillText('× NO SIGNAL', 0, -150); ctx.restore();
    ctx.save(); ctx.strokeStyle = 'rgba(255,90,90,0.8)'; ctx.lineWidth = 5; ctx.setLineDash([10, 12]); ctx.beginPath(); ctx.moveTo(-10, 25); ctx.lineTo(-10, -90); ctx.stroke(); ctx.restore();
  },
  chartdown(lt) {
    neon(4, 0, 0.3); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-320, -200 + i * 100); ctx.lineTo(320, -200 + i * 100); ctx.stroke(); }
    const n = Math.floor(eo(lt * 1.5) * 30); const r = mulberry(4);
    ctx.save(); ctx.strokeStyle = '#ff6060'; ctx.shadowColor = '#ff3030'; ctx.shadowBlur = 24; ctx.lineWidth = 10; ctx.lineJoin = 'round';
    ctx.beginPath(); let ex = 0, ey = 0;
    for (let i = 0; i <= n; i++) { ex = -320 + i * 21; ey = -200 + Math.pow(i / 30, 1.4) * 380 + (r() - 0.5) * 40; i ? ctx.lineTo(ex, ey) : ctx.moveTo(ex, ey); }
    ctx.stroke(); ctx.fillStyle = '#ff6060'; ctx.beginPath(); ctx.arc(ex, ey, 14, 0, TAU); ctx.fill(); ctx.restore();
  },
  note(lt) {
    const f = 1 - 0.75 * eo(lt / 1.2);
    ctx.save(); ctx.globalAlpha = f; ctx.rotate(-0.08);
    ctx.fillStyle = '#070a12'; rr(-280, -140, 560, 280, 16); ctx.fill(); neon(7, 20, f); ctx.stroke();
    neon(4, 8, f); ctx.beginPath(); ctx.arc(0, 0, 80, 0, TAU); ctx.stroke();
    ctx.fillStyle = `rgba(255,255,255,${f})`; ctx.font = '900 70px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('RM', 0, 4);
    ctx.restore();
  },
  goldsat(lt) {
    goldbar(0, 40, 1.2);
    waves(0, -40, 4, lt, -Math.PI / 2, 60, 0.9);
  },
  shield(lt) {
    ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.3)'; neonA(9, 30);
    ctx.beginPath(); ctx.moveTo(0, -260); ctx.quadraticCurveTo(200, -230, 230, -170); ctx.quadraticCurveTo(230, 120, 0, 270); ctx.quadraticCurveTo(-230, 120, -230, -170); ctx.quadraticCurveTo(-200, -230, 0, -260); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    goldbar(0, 10, 0.9);
    for (let i = 0; i < 8; i++) { const a = lt * 2 + i / 8 * TAU; const x = Math.cos(a) * 340, y = Math.sin(a) * 340; ctx.save(); ctx.strokeStyle = 'rgba(255,90,90,0.7)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x * 0.85, y * 0.85); ctx.stroke(); ctx.restore(); }
  },
  globe(lt) {
    neon(6, 16); ctx.beginPath(); ctx.arc(0, 0, 250, 0, TAU); ctx.stroke();
    ctx.lineWidth = 3; ctx.globalAlpha = 0.6;
    for (let i = -2; i <= 2; i++) { const y = i * 85; const r = Math.sqrt(250 * 250 - y * y); ctx.beginPath(); ctx.ellipse(0, y, r, r * 0.12, 0, 0, TAU); ctx.stroke(); }
    for (let i = 0; i < 5; i++) { const ph = (lt * 0.5 + i / 5) % 1; ctx.beginPath(); ctx.ellipse(0, 0, Math.abs(Math.cos(ph * Math.PI)) * 250, 250, 0, 0, TAU); ctx.stroke(); }
    ctx.globalAlpha = 1;
    goldbar(0, 0, 0.6 + 0.03 * Math.sin(lt * 6));
  },
  link(lt) {     // hari ini —(emas)— masa depan
    const p = eo(lt * 0.8);
    [[-300, 'KINI'], [300, 'MASA DEPAN']].forEach(([x, t], k) => {
      ctx.save(); ctx.globalAlpha = k ? p : 1; neon(6, 20); ctx.beginPath(); ctx.arc(x, 120, 60, 0, TAU); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = '700 30px Mono'; ctx.textAlign = 'center'; ctx.fillText(t, x, 230); ctx.restore();
    });
    goldbar(0, -150, 0.8);
    ctx.save(); neonA(5, 24); ctx.setLineDash([16, 12]); ctx.lineDashOffset = -lt * 60;
    ctx.beginPath(); ctx.moveTo(-300, 60); ctx.lineTo(-40, -90); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, -90); ctx.lineTo(lerp(40, 300, p), lerp(-90, 60, p)); ctx.stroke(); ctx.restore();
  },
  mission(lt) {  // roket + emas: persediaan
    ctx.save(); ctx.translate(-170, 0); ctx.scale(0.75, 0.75); ICON.rocket(lt * 0.5); ctx.restore();
    ctx.save(); ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 30; ctx.font = '900 110px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', 170, -30); ctx.restore();
    goldbar(170, 170, 0.6);
  },
};

// ------------------------------------------------------------ scenes
// COLD OPEN — hook
sc(0, 2, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ctx.scale(0.95, 0.95); ctx.globalAlpha = eo(lt / 0.6); ICON.hook(lt); ctx.restore(); ctx.globalAlpha = 1;
  mono('TAHU TAK?', 380, 40, eo(lt / 0.4), null, 18);
  htext('SATU-SATUNYA\nNEGARA', 1320, 72, { font: 'Grot', weight: 700, alpha: eo((lt - 1.0) / 0.5), glow: 24 });
  ptext('yang pernah mendarat di sisi jauh Bulan', 1480, 40, eo((lt - 1.8) / 0.5));
}, '1959');
// TITLE
sc(2, 4, (lt) => {
  const s = eo(lt / 1.0);
  mono('JAWAPANNYA: CHINA', 640, 36, eo(lt / 0.5), null, 10);
  htext('SISI GELAP\nBULAN', 820, 124 - 16 * (1 - s), { alpha: s, track: lerp(30, 6, s), glow: 50, lh: 1.1 });
  ctx.save(); ctx.fillStyle = ca(0.9); ctx.shadowColor = ca(1); ctx.shadowBlur = 20; const w = 520 * eo((lt - 0.4) / 0.8); ctx.fillRect(CX - w / 2, 1000, w, 4); ctx.restore();
  mono("MISI CHANG'E-4 · 2019", 1070, 34, eo((lt - 0.7) / 0.6), null, 8);
  ptext('Misi yang semua orang elak\n— dan apa kaitannya dengan duit anda', 1230, 44, eo((lt - 1.3) / 0.7), { weight: 700 });
}, '1959');

// ACT 1 — konteks (2 bar setiap satu)
sc(4, 6, era('1959', 'luna3', 'KALI PERTAMA\nDILIHAT', 'Luna 3 merakam gambar pertama\nsisi Bulan yang tak pernah nampak dari Bumi', { place: 'KESATUAN SOVIET' }), '1959');
sc(6, 8, era('1968', 'apollo8', 'ISYARAT\nTERPUTUS', 'Di belakang Bulan, Apollo 8\nhilang hubungan radio sepenuhnya', { place: 'APOLLO 8' }), '1968');
sc(8, 10, era('1969', 'nearside', 'SEMUA DI\nSISI DEPAN', 'Setiap pendaratan manusia\ndibuat di sisi yang menghadap Bumi', { place: 'APOLLO 11 — 17' }), '1972');
sc(10, 12, era('ZON MATI', 'deadzone', 'TIADA TALIAN\nKE BUMI', 'Bulan sendiri menghalang isyarat radio\n— mendarat di situ = putus hubungan', { place: 'MASALAHNYA', yearSize: 120 }), '2000');
sc(12, 14, era('2018', 'rocket', 'SATELIT DULU', 'Queqiao dilancarkan lebih awal\n— sebelum kapal pendarat', { place: 'XICHANG, CHINA' }), '2018');
sc(14, 16, era('QUEQIAO', 'relay', 'JAMBATAN\nISYARAT', 'Bertapak di titik L2, ia pantulkan\nisyarat antara Bumi dan sisi jauh', { place: '"JAMBATAN BURUNG MURAI"', yearSize: 130 }), '2018');

// ACT 2 — misi (1 bar setiap satu)
sc(16, 17, era('DIS 2018', 'rocket', "CHANG'E-4 BERLEPAS", 'Kapal pendarat + robot perayau', { place: 'XICHANG, CHINA', yearSize: 120, titleSize: 68 }), '2018');
sc(17, 18, era('3.1.2019', 'descend', 'TURUN KE KAWAH', 'Kawah Von Kármán, 186 km lebar', { place: 'SISI JAUH BULAN', yearSize: 120 }), '2019');
sc(18, 19, era('PERTAMA', 'landed', 'DALAM SEJARAH', 'Pendaratan pertama di sisi jauh Bulan', { place: '3 JANUARI 2019', yearSize: 130 }), '2019');
sc(19, 20, era('2,500 KM', 'basin', 'LEMBANGAN PURBA', 'Kutub Selatan–Aitken: antara kawah\nhentaman terbesar & tertua', { place: 'LOKASI PENDARATAN', yearSize: 120, subOff: 125 }), '2019');
sc(20, 21, era('YUTU-2', 'yutu', 'ROBOT PERAYAU', 'Turun dan mula meneroka', { place: '"ARNAB JED"', yearSize: 140 }), '2019');
sc(21, 22, era('BIOSFERA', 'biosphere', 'TIN KEHIDUPAN', 'Benih kapas, kentang, sawi minyak,\ntelur lalat buah & yis', { place: 'EKSPERIMEN MINI', yearSize: 120, subOff: 125 }), '2019');
sc(22, 23, era('KAPAS', 'sprout', 'BENIH BERCAMBAH', 'Tumbuhan pertama yang bercambah\ndi Bulan', { place: 'SEJARAH BIOLOGI', yearSize: 140, subOff: 125 }), '2019');
sc(23, 24, era('RADAR', 'radar', 'BATU PURBA', 'Mengimbas lapisan bawah tanah\nsisi jauh Bulan', { place: 'RAHSIA SISTEM SURIA', yearSize: 140, subOff: 125 }), '2019');
sc(24, 25, era('-190°C', 'cold', 'MALAM BULAN', 'Lebih sejuk daripada jangkaan', { place: 'SUHU DIREKOD', yearSize: 140 }), '2019');
sc(25, 26, era('REKOD', 'record', 'PERAYAU TERLAMA', 'Yutu-2 kekal beroperasi\nbertahun-tahun di Bulan', { place: 'YUTU-2', yearSize: 140, subOff: 125 }), '2019');

// PIVOT
sc(26, 28, (lt) => {
  ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(CX, IY); ctx.globalAlpha = eo(lt / 1.2); ICON.flag(lt); ctx.restore(); ctx.globalAlpha = 1;
  mono('APA KITA BOLEH BELAJAR?', 330, 36, eo((lt - 0.2) / 0.6), null, 8);
  htext('3 PENGAJARAN', 1420, 88, { font: 'Grot', weight: 700, alpha: eo((lt - 1.4) / 0.5), glow: 40, scale: 1 + 0.02 * lt });
  ptext('dari sisi gelap Bulan', 1540, 44, eo((lt - 2.2) / 0.5));
}, '2019');

// ACT 3 — pengajaran + emas (setengah bar)
const act3 = [
  ['01', 'bridge', 'BINA JAMBATAN\nDULU', 'Sistem dulu, baru redah pasaran'],
  ['01', 'relay', 'PESAING TAKUT?', 'Anda dah bersedia'],
  ['02', 'flag', 'REDAH ZON\nSUKAR', 'Tempat yang orang lain elak'],
  ['02', 'flag', 'KELEBIHAN\nMONOPOLI', 'Kerana hanya anda di situ'],
  ['03', 'sprout', 'UJI BENIH\nKECIL', 'Walau persekitaran ekstrem'],
  ['03', 'tree', 'EMPAYAR\nLEGASI', 'Untuk generasi akan datang'],
  ['WANG', 'lost', 'TUNAI SEMATA?', 'Macam perayau tanpa satelit'],
  ['INFLASI', 'chartdown', 'NILAI TERPUTUS', 'Bila badai inflasi melanda'],
  ['KUASA BELI', 'note', 'DITELAN GELAP', 'Susut nilai yang tak terkawal'],
  ['EMAS', 'goldsat', 'SATELIT PEMANCAR', 'Kewangan anda yang sebenar'],
  ['KRISIS', 'shield', 'NILAI KEKAL', 'Walau ekonomi bergolak'],
  ['DUNIA', 'globe', 'TETAP BERSINAR', 'Walau geopolitik tak menentu'],
];
act3.forEach(([top, icon, title, sub], i) => {
  sc(28 + i * 0.5, 28.5 + i * 0.5, (lt, d) => {
    const T = lt / d;
    ctx.save(); ctx.translate(CX, IY); const z = lerp(1.3, 0.95, eo(T * 3)); ctx.scale(z, z); ICON[icon](lt * 1.8 + 0.4); ctx.restore();
    const isNum = /^\d/.test(top);
    htext(isNum ? top : top, 320, isNum ? 170 : 110, { track: 10, scale: lerp(1.15, 1, eo(T * 4)) });
    mono(isNum ? 'PENGAJARAN' : 'BEZANYA...', 440, 32, 1);
    htext(title, 1400, 84, { font: 'Grot', weight: 700, track: 2, alpha: eo(T * 6), glow: 26 });
    ptext(sub, title.includes('\n') ? 1560 : 1510, 42, eo(T * 6 - 0.4));
  }, '2019');
});
// word slams
const words = ['SEDIA', 'SAMBUNG', 'REDAH', 'UJI', 'SIMPAN', 'LINDUNG', 'WARISKAN'];
words.forEach((w, i) => {
  sc(WORDS + i / 4, WORDS + (i + 1) / 4, (lt, d) => {
    const T = lt / d;
    htext(w, 960, w.length > 6 ? 140 : 180, { track: 10, scale: lerp(1.6, 1, eo(T * 4)) + T * 0.05, glow: 60 });
    mono(String(i + 1).padStart(2, '0') + ' / 07', 1130, 34, 0.9, null, 8);
  }, '2019');
});
sc(BREATH, DROP, (lt, d) => {
  ctx.fillStyle = 'rgba(0,0,0,0.75)'; ctx.fillRect(0, 0, W, H);
  const r = 4 + 36 * (lt / d) ** 2; fillA(1, 80); ctx.beginPath(); ctx.arc(CX, 960, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
}, '2019');

// DROP
sc(36, 38, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ICON.link(lt); ctx.restore();
  mono('ANALOGINYA', 330, 40, eo(lt * 3), null, 20);
  htext('EMAS =\nQUEQIAO ANDA', 1340, 96, { track: 2, glow: 50, lh: 1.15, scale: lerp(1.2, 1, eo(lt * 2)) });
  ptext('Menghubungkan simpanan hari ini\ndengan kestabilan masa depan', 1580, 42, eo(lt * 2 - 0.8));
}, '2019');
sc(38, 40, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ICON.mission(lt); ctx.restore();
  mono('KALAU MISI ANGKASA PUN', 330, 36, eo(lt * 3), null, 6);
  htext('PERLU\nPERSEDIAAN', 1340, 100, { track: 4, glow: 50, scale: lerp(1.2, 1, eo(lt * 2)) });
  ptext('Kenapa biarkan simpanan anda\nterdedah tanpa perlindungan emas?', 1580, 42, eo(lt * 2 - 0.6));
}, '2019');
const evo = [['luna3', '1959'], ['apollo8', '1968'], ['rocket', '2018'], ['relay', 'QUEQIAO'], ['landed', '2019'], ['sprout', 'KAPAS'], ['goldsat', 'EMAS'], ['link', 'ANDA']];
evo.forEach(([icon, label], i) => {
  sc(40 + i / 4, 40 + (i + 1) / 4, (lt, d) => {
    const T = lt / d;
    htext(i < 4 ? 'DARI ZON GELAP' : 'KE MASA DEPAN', 360, 70, { font: 'Grot', weight: 700, track: 6, glow: 30 });
    ctx.save(); ctx.translate(CX, IY + 20); const z = lerp(0.95, 0.8, eo(T * 3)); ctx.scale(z, z); ICON[icon](1 + lt); ctx.restore();
    htext(label, 1420, label.length > 5 ? 120 : 150, { track: 12, scale: lerp(1.3, 1, eo(T * 4)), glow: 40 });
  }, '2019');
});

// FINALE
sc(42, 45, (lt) => {
  const s = eo(lt / 0.9);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(CX, 700, 0, CX, 700, 560); g.addColorStop(0, ca(0.35 * s)); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
  ctx.save(); ctx.translate(CX, 560); ctx.scale(0.8, 0.8); ctx.globalAlpha = s; goldbar(0, 0, 1.2); ctx.restore(); ctx.globalAlpha = 1;
  htext('SAMBUNGKAN\nMASA DEPAN ANDA', 860, 68, { alpha: s, track: lerp(20, 4, s), glow: 60, lh: 1.15 });
  ctx.save(); ctx.fillStyle = ca(0.9); ctx.shadowColor = ca(1); ctx.shadowBlur = 20; const w = 560 * eo((lt - 0.3) / 0.8); ctx.fillRect(CX - w / 2, 1000, w, 4); ctx.restore();
  ptext('Moga perkongsian ini bermanfaat.', 1080, 40, eo((lt - 0.8) / 0.6));
  htext('TAUFIK MUSA', 1190, 64, { font: 'Grot', weight: 700, alpha: eo((lt - 1.2) / 0.6), track: 6, glow: 24 });
  mono('DEALER PUBLIC GOLD', 1260, 32, eo((lt - 1.4) / 0.6), null, 8);
  mono('SIMPANEMASFIZIKAL.COM', 1320, 36, eo((lt - 1.6) / 0.6), '#ffffff', 6);
  if (lt > 4) {
    const k = lt - 4;
    ctx.save(); ctx.translate(CX, 1500); ctx.scale(0.5, 0.5); ctx.globalAlpha = eo(k / 0.3); sat(0, 0, 1, Math.sin(k * 3) * 0.1); waves(0, -60, 3, k, -Math.PI / 2, 40, 0.8); ctx.restore(); ctx.globalAlpha = 1;
    mono('ISYARAT ANDA DAH TERSAMBUNG?', 1620, 30, eo((k - 0.2) / 0.4), '#ffffff', 6);
  }
  if (lt > 5.3) { ctx.fillStyle = `rgba(0,0,0,${clamp((lt - 5.3) / 0.65)})`; ctx.fillRect(0, 0, W, H); }
}, '2019');
