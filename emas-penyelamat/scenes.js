/* scenes.js — "EMAS: BOT PENYELAMAT" — 3 golongan yang perlu emas (copywriting mode).
 * Grade: amber (hook) -> magenta (01 boros) -> teal (02 inflasi) -> biru ais (03 Titanic) -> emas (formula + CTA). */

// ------------------------------------------------------------ colour grade
const KEYS = [
  [0, [255, 200, 90], [255, 120, 60]],
  [13, [255, 200, 90], [255, 120, 60]],
  [16, [255, 70, 165], [255, 170, 90]],
  [23, [255, 70, 165], [255, 170, 90]],
  [25, [80, 240, 200], [120, 160, 255]],
  [31, [80, 240, 200], [120, 160, 255]],
  [33, [140, 205, 255], [90, 120, 255]],
  [50, [140, 205, 255], [90, 120, 255]],
  [53, [240, 240, 255], [180, 190, 255]],
  [57, [255, 204, 96], [255, 140, 60]],
  [90, [255, 204, 96], [255, 140, 60]],
];

// ------------------------------------------------------------ config
const CFG = {
  hud: { fromBar: ACT2 + 1, toBar: PIVOT, start: 1912, end: 2026 },
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
function note(x, y, s = 1, a = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = a;
  ctx.fillStyle = '#070a12'; rr(-150, -75, 300, 150, 12); ctx.fill(); neon(6, 18); ctx.stroke();
  neon(3, 6, 0.7); ctx.beginPath(); ctx.arc(0, 0, 42, 0, TAU); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.shadowBlur = 0; ctx.font = '900 34px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('RM', 0, 2);
  ctx.restore();
}
function coin(x, y, r = 22) { fillA(1, 16); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 0.65, 0, TAU); ctx.stroke(); }
function ship(tilt = 0, s = 1) {
  ctx.save(); ctx.scale(s, s); ctx.rotate(tilt);
  ctx.fillStyle = '#070a12';
  ctx.beginPath(); ctx.moveTo(-340, 0); ctx.lineTo(320, 0); ctx.lineTo(360, -70); ctx.lineTo(-360, -70); ctx.closePath(); ctx.fill(); neon(7); ctx.stroke();
  neon(4, 8, 0.8); ctx.beginPath(); ctx.moveTo(-330, -95); ctx.lineTo(300, -95); ctx.lineTo(300, -70); ctx.moveTo(-330, -95); ctx.lineTo(-330, -70); ctx.stroke();
  for (let i = 0; i < 4; i++) { const x = -200 + i * 115; ctx.fillStyle = '#070a12'; ctx.beginPath(); ctx.moveTo(x - 24, -95); ctx.lineTo(x - 16, -190); ctx.lineTo(x + 24, -190); ctx.lineTo(x + 30, -95); ctx.closePath(); ctx.fill(); neonA(5, 14); ctx.stroke(); }
  for (let i = 0; i < 16; i++) { fillA(0.9, 8); ctx.fillRect(-300 + i * 38, -45, 12, 10); }
  ctx.restore();
}
function sea(y, lt, w = 420) {
  neon(4, 10, 0.7);
  for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let x = -w; x <= w; x += 20) { const yy = y + k * 26 + Math.sin(x * 0.03 + lt * 3 + k) * 8; x === -w ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.globalAlpha = 1 - k * 0.3; ctx.stroke(); }
  ctx.globalAlpha = 1;
}
function boat(x, y, s = 1, gold = false) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-80, -20); ctx.lineTo(80, -20); ctx.quadraticCurveTo(70, 30, 0, 32); ctx.quadraticCurveTo(-70, 30, -80, -20); ctx.closePath();
  if (gold) { const g = ctx.createLinearGradient(0, -20, 0, 32); g.addColorStop(0, '#fff3c4'); g.addColorStop(1, '#e0892e'); ctx.fillStyle = g; ctx.shadowColor = 'rgba(255,190,80,1)'; ctx.shadowBlur = 40; ctx.fill(); }
  else { ctx.fillStyle = '#070a12'; ctx.fill(); neon(5, 12); ctx.stroke(); }
  ctx.restore();
}
function bank(x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); neon(7);
  ctx.beginPath(); ctx.moveTo(-200, -90); ctx.lineTo(0, -190); ctx.lineTo(200, -90); ctx.closePath(); ctx.stroke();
  for (let i = 0; i < 5; i++) { const cx = -160 + i * 80; ctx.beginPath(); ctx.moveTo(cx, -70); ctx.lineTo(cx, 110); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(-220, 130); ctx.lineTo(220, 130); ctx.stroke();
  ctx.restore();
}
function person(x, y, s = 1, lit = true) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (lit) { neon(6, 16); } else { ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 6; ctx.shadowBlur = 0; }
  ctx.beginPath(); ctx.arc(0, -60, 34, 0, TAU); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 60, 70, Math.PI, 0); ctx.stroke();
  ctx.restore();
}
function lock(x, y, s = 1, col = null) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = col || '#fff'; ctx.lineWidth = 12; ctx.shadowColor = col || ca(1); ctx.shadowBlur = 24; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -50, 50, Math.PI, 0); ctx.lineTo(50, 0); ctx.moveTo(-50, -50); ctx.lineTo(-50, 0); ctx.stroke();
  ctx.fillStyle = col || '#fff'; rr(-75, 0, 150, 110, 16); ctx.fill();
  ctx.fillStyle = '#070a12'; ctx.shadowBlur = 0; ctx.beginPath(); ctx.arc(0, 45, 14, 0, TAU); ctx.fill(); ctx.fillRect(-5, 50, 10, 30);
  ctx.restore();
}

// ------------------------------------------------------------ icons
const ICON = {
  nostop(lt) {
    goldbar(0, 0, 1.4);
    const p = eback(lt * 2 - 0.6);
    if (p > 0) { ctx.save(); ctx.scale(p, p); ctx.strokeStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 30; ctx.lineWidth = 22;
      ctx.beginPath(); ctx.arc(0, 0, 260, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-184, -184); ctx.lineTo(184, 184); ctx.stroke(); ctx.restore(); }
  },
  choices(lt) {
    const cols = [['ASB', 200], ['TABUNG\nHAJI', 240], ['EMAS', 280]];
    cols.forEach(([t, h], i) => {
      const x = -230 + i * 230, p = eo(lt * 2 - i * 0.2), hh = h * p;
      if (i === 2) { const g = ctx.createLinearGradient(0, 200 - hh, 0, 200); g.addColorStop(0, '#fff3c4'); g.addColorStop(1, '#e0892e'); ctx.fillStyle = g; ctx.shadowColor = 'rgba(255,190,80,1)'; ctx.shadowBlur = 30; rr(x - 70, 200 - hh, 140, hh, 12); ctx.fill(); }
      else { fillA(0.25, 0); rr(x - 70, 200 - hh, 140, hh, 12); ctx.fill(); neon(5, 14); ctx.stroke(); }
      t.split('\n').forEach((l, k, a) => label(l, x, 250 + k * 36, 30));
    });
    label('?', 230, -170, 70, '#fff', eo(lt * 2 - 1));
  },
  three(lt) {
    [-230, 0, 230].forEach((x, i) => { const p = eback(lt * 2.5 - i * 0.2); if (p <= 0) return; ctx.save(); ctx.translate(x, 30); ctx.scale(p, p); person(0, 0, 1.3); big(String(i + 1).padStart(2, '0'), 0, -190, 56); ctx.restore(); });
  },
  swipe(lt) {
    const x = lerp(-120, 120, (Math.sin(lt * 5) + 1) / 2);
    neon(6, 12); rr(-260, -30, 520, 60, 30); ctx.stroke();
    ctx.save(); ctx.translate(x, -120); ctx.rotate(-0.1);
    ctx.fillStyle = '#12061a'; rr(-200, -120, 400, 240, 24); ctx.fill(); neonA(8, 26); ctx.stroke();
    fillB(0.9, 12); rr(-160, -60, 70, 50, 8); ctx.fill();
    label('•••• 0412', 40, 60, 34);
    ctx.restore();
    for (let i = 0; i < 6; i++) { const ph = (lt * 1.4 + i / 6) % 1; ctx.save(); ctx.globalAlpha = 1 - ph; coin(-200 + i * 80, 80 + ph * 260, 20); ctx.restore(); }
    label('BAYAR ✓', 0, 330, 34, RED, Math.floor(lt * 4) % 2 ? 1 : 0.4);
  },
  leak(lt) {
    ctx.fillStyle = '#070a12'; rr(-240, -200, 480, 300, 40); ctx.fill(); neon(8); ctx.stroke();
    neon(5, 10); rr(120, -80, 150, 80, 20); ctx.stroke();
    const n = 1500 - Math.floor(eo(lt / 2) * 1380);
    big('RM' + n, -30, -60, 64);
    for (let i = 0; i < 5; i++) { const ph = (lt * 1.1 + i / 5) % 1; ctx.save(); ctx.globalAlpha = 1 - ph; coin(-120 + i * 60, 110 + ph * 200, 16 + (i % 2) * 4); ctx.restore(); }
  },
  goldlock(lt) {
    goldbar(0, 90, 1.5);
    const p = eback(lt * 2 - 0.3);
    if (p > 0) { ctx.save(); ctx.translate(0, -120); ctx.scale(p, p); lock(0, 0, 1.2); ctx.restore(); }
  },
  cash(lt) {
    for (let i = 0; i < 6; i++) note(0, 140 - i * 36, 1.2, 0.6 + i * 0.07);
    const p = eo(lt * 1.5);
    ctx.save(); ctx.globalAlpha = p; neonA(8, 28);
    ctx.beginPath(); ctx.moveTo(0, -300); ctx.quadraticCurveTo(200, -280, 250, -220); ctx.quadraticCurveTo(250, 80, 0, 260); ctx.quadraticCurveTo(-250, 80, -250, -220); ctx.quadraticCurveTo(-200, -280, 0, -300); ctx.closePath(); ctx.stroke(); ctx.restore();
    label('"SELAMAT"', 0, -330, 34, null, p);
  },
  shrink(lt) {
    const p = eo(lt / 2);
    const d = (3 + p * 2).toFixed(2);
    big('+' + d + '%', 0, -230, 80);
    label('DIVIDEN', 0, -150, 30);
    note(0, 120, lerp(1.5, 0.75, p));
    ctx.save(); ctx.strokeStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 20; ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(280, 0); ctx.lineTo(280, 200); ctx.moveTo(250, 170); ctx.lineTo(280, 200); ctx.lineTo(310, 170); ctx.stroke(); ctx.restore();
    label('NILAI', 280, 250, 26, RED);
  },
  warn(lt) {
    const on = Math.floor(lt * 4) % 2;
    ctx.save(); ctx.strokeStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = on ? 50 : 20; ctx.lineWidth = 16; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(0, -250); ctx.lineTo(270, 220); ctx.lineTo(-270, 220); ctx.closePath(); ctx.stroke();
    ctx.fillStyle = RED; rr(-14, -110, 28, 200, 14); ctx.fill(); ctx.beginPath(); ctx.arc(0, 150, 20, 0, TAU); ctx.fill(); ctx.restore();
  },
  titanic(lt) { ctx.save(); ctx.translate(0, 40 + Math.sin(lt * 1.5) * 6); ship(0, 0.95); ctx.restore(); sea(60, lt); },
  crowd(lt) {
    const n = Math.floor(eo(lt / 1.5) * 2224);
    big(n.toLocaleString('en-US'), 0, -240, 96);
    for (let j = 0; j < 8; j++) for (let i = 0; i < 16; i++) { const k = j * 16 + i; if (k > eo(lt / 1.5) * 128) continue; fillA(0.9, 6); ctx.beginPath(); ctx.arc(-300 + i * 40, -110 + j * 44, 9, 0, TAU); ctx.fill(); }
  },
  boats(lt) {
    const n = Math.floor(eo(lt / 1.2) * 20);
    for (let i = 0; i < n; i++) boat(-300 + (i % 5) * 150, -150 + Math.floor(i / 5) * 110, 0.8);
    sea(310, lt, 380);
  },
  capacity(lt) {
    for (let j = 0; j < 8; j++) for (let i = 0; i < 16; i++) { const k = j * 16 + i; const saved = k < 68; ctx.save(); if (saved) fillA(0.95, 10); else { ctx.fillStyle = 'rgba(255,90,90,0.55)'; ctx.shadowBlur = 0; } ctx.beginPath(); ctx.arc(-300 + i * 40, -170 + j * 44, 9, 0, TAU); ctx.fill(); ctx.restore(); }
    const p = eo(lt * 1.5);
    ctx.save(); neonA(5, 20); ctx.setLineDash([12, 10]); ctx.strokeRect(-322, -192, 644 * 0.53 * p + 10, 356); ctx.restore();
    label('MUAT', -150, 240, 30, null, p); label('TIDAK', 170, 240, 30, RED, p);
  },
  sinking(lt) {
    const p = eo(lt / 1.8);
    ctx.save(); ctx.beginPath(); ctx.rect(-500, -500, 1000, 570); ctx.clip();
    ctx.translate(0, 20 + p * 140); ship(-0.35 * p, 0.85); ctx.restore();
    sea(70, lt);
  },
  cyprus(lt) {
    bank(0, 0, 1.1);
    const p = eback(lt * 2 - 0.4);
    if (p > 0) { ctx.save(); ctx.translate(0, 240); ctx.scale(p, p); ctx.fillStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 30; rr(-190, -50, 380, 100, 20); ctx.fill(); ctx.fillStyle = '#fff'; ctx.shadowBlur = 0; ctx.font = '900 60px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('-47.5%', 0, 4); ctx.restore(); }
  },
  atm(lt) {
    ctx.fillStyle = '#070a12'; rr(-200, -280, 400, 520, 30); ctx.fill(); neon(8); ctx.stroke();
    neon(5, 10); rr(-150, -220, 300, 180, 12); ctx.stroke();
    const on = Math.floor(lt * 3) % 2;
    label('HAD DICAPAI', 0, -130, 34, RED, on ? 1 : 0.45);
    keypad(-70, 30, 70, 50, -1, 16);
    neon(5, 10); rr(-120, 190, 240, 20, 8); ctx.stroke();
  },
  frozen(lt) {
    bank(0, 30, 0.9);
    const p = eo(lt * 1.6);
    ctx.save(); ctx.globalAlpha = p; ctx.strokeStyle = 'rgba(170,220,255,1)'; ctx.shadowColor = 'rgba(140,200,255,1)'; ctx.shadowBlur = 30; ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.translate(0, 0); ctx.rotate(lt * 0.4);
    for (let i = 0; i < 6; i++) { ctx.rotate(TAU / 6); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -270); ctx.moveTo(0, -170); ctx.lineTo(-50, -220); ctx.moveTo(0, -170); ctx.lineTo(50, -220); ctx.stroke(); }
    ctx.restore();
    ctx.save(); ctx.translate(0, 20); lock(0, 0, 0.9, 'rgba(190,230,255,1)'); ctx.restore();
  },
  // --- formula
  cal3(lt) {
    for (let i = 0; i < 3; i++) {
      const p = eback(lt * 3 - i * 0.2); if (p <= 0) continue;
      ctx.save(); ctx.translate(-220 + i * 220, 0); ctx.scale(p, p);
      ctx.fillStyle = '#070a12'; rr(-90, -110, 180, 220, 16); ctx.fill(); neon(6); ctx.stroke();
      fillA(0.9, 10); ctx.fillRect(-90, -110, 180, 50);
      big(String(i + 1), 0, 30, 90); ctx.restore();
    }
    note(0, 250, 0.8);
  },
  umbrella(lt) {
    neonA(9, 30);
    ctx.beginPath(); ctx.arc(0, -40, 260, Math.PI, 0); ctx.stroke();
    for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(-195 + i * 130, -40, 65, Math.PI, 0, true); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(0, 220); ctx.quadraticCurveTo(0, 270, -50, 260); ctx.stroke();
    for (let i = 0; i < 10; i++) { const ph = (lt * 1.5 + i / 10) % 1; const x = -380 + (i * 83) % 760; if (Math.abs(x) < 280) continue; ctx.save(); ctx.globalAlpha = 1 - ph; neon(3, 6, 0.7); ctx.beginPath(); ctx.moveTo(x, -300 + ph * 600); ctx.lineTo(x - 10, -270 + ph * 600); ctx.stroke(); ctx.restore(); }
  },
  convert(lt) {
    const p = eo(lt * 1.3);
    note(-210, 0, 0.9, 1 - p * 0.6);
    goldbar(220, 0, 0.9 * (0.4 + 0.6 * p));
    neonA(8, 24); ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(40, 0); ctx.moveTo(15, -25); ctx.lineTo(40, 0); ctx.lineTo(15, 25); ctx.stroke();
  },
  rm100(lt) {
    big('RM100', 0, -120, 150);
    label('SEBULAN', 0, 10, 40);
    goldbar(0, 180, 0.9);
  },
  months(lt) {
    const n = Math.floor(eo(lt / 1.2) * 12);
    for (let i = 0; i < 12; i++) { const x = -240 + (i % 4) * 160, y = -150 + Math.floor(i / 4) * 150; ctx.save(); ctx.fillStyle = '#070a12'; rr(x - 60, y - 55, 120, 110, 12); ctx.fill(); neon(4, 8, 0.7); ctx.stroke(); if (i < n) { ctx.fillStyle = '#ffcc60'; ctx.shadowColor = 'rgba(255,190,80,1)'; ctx.shadowBlur = 20; ctx.font = '900 56px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('✓', x, y + 4); } ctx.restore(); }
  },
  hill(lt) {
    const n = Math.floor(eo(lt / 1.3) * 15);
    const rows = [5, 4, 3, 2, 1]; let k = 0;
    rows.forEach((c, j) => { for (let i = 0; i < c; i++) { if (k++ >= n) return; goldbar(-(c - 1) * 75 + i * 150, 220 - j * 95, 0.45, 20); } });
  },
  comment(lt) {
    ctx.save(); ctx.translate(0, -30);
    ctx.fillStyle = '#070a12'; rr(-300, -150, 600, 260, 50); ctx.fill(); neon(8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-200, 110); ctx.lineTo(-240, 200); ctx.lineTo(-130, 110); neon(8); ctx.stroke();
    const txt = 'Saya kumpulan 0' + (1 + Math.floor(lt * 1.5) % 3), n = Math.floor(clamp((lt % 2) / 1.2) * txt.length);
    ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 14; ctx.font = '700 48px Grot'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(txt.slice(0, n) + (Math.floor(lt * 4) % 2 ? '|' : ''), 0, -20);
    ctx.restore();
  },
  lifeboat(lt) {
    sea(150, lt, 400);
    ctx.save(); ctx.translate(0, 110 + Math.sin(lt * 2) * 10); ctx.rotate(Math.sin(lt * 1.5) * 0.05); boat(0, 0, 3, true);
    ctx.fillStyle = 'rgba(80,40,0,0.6)'; ctx.font = '900 30px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('999.9', 0, 6); ctx.restore();
    waves(0, -60, 3, lt, -Math.PI / 2, 70, 0.8);
  },
};

// ------------------------------------------------------------ scenes
// COLD OPEN — hook kontra
sc(0, 2, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ctx.scale(0.9, 0.9); ctx.globalAlpha = eo(lt / 0.5); ICON.nostop(lt); ctx.restore(); ctx.globalAlpha = 1;
  mono('SEBENARNYA...', 360, 40, eo(lt / 0.4), null, 16);
  htext('TAK SEMUA ORANG\nPERLU SIMPAN EMAS!', 1360, 66, { font: 'Grot', weight: 700, alpha: eo((lt - 0.9) / 0.5), glow: 24 });
}, '2026');
// TITLE
sc(2, 4, (lt) => {
  const s = eo(lt / 1.0);
  mono('TAPI KALAU ANDA DALAM', 620, 34, eo(lt / 0.5), null, 8);
  htext('3 GOLONGAN\nINI...', 820, 100 - 14 * (1 - s), { alpha: s, track: lerp(30, 6, s), glow: 50, lh: 1.12 });
  ctx.save(); ctx.fillStyle = ca(0.9); ctx.shadowColor = ca(1); ctx.shadowBlur = 20; const w = 520 * eo((lt - 0.4) / 0.8); ctx.fillRect(CX - w / 2, 1000, w, 4); ctx.restore();
  ptext('emas adalah\npenyelamat mutlak anda', 1130, 50, eo((lt - 1.0) / 0.7), { weight: 700 });
}, '2026');

// ACT 1 — pengenalan + golongan 01 & 02 (2 bar setiap satu)
sc(4, 6, era('JUJURNYA', 'choices', 'BUKAN UNTUK\nSEMUA', 'Ada situasi ASB atau Tabung Haji\njauh lebih baik', { place: 'PERSPEKTIF', yearSize: 120 }), '2026');
sc(6, 8, era('TAPI...', 'three', '3 GOLONGAN', 'Yang emas jadi penyelamat mutlak', { place: 'SEMAK DIRI ANDA', yearSize: 150 }), '2026');
sc(8, 10, era('01', 'swipe', "TANGAN 'GATAL'", 'Golongan yang suka berbelanja', { place: 'GOLONGAN PERTAMA', titleSize: 76 }), '2026');
sc(10, 12, era('01', 'leak', 'ADA DUIT,\nMESTI BOCOR', 'Duit dalam bank — sekejap je hilang', { place: 'GOLONGAN PERTAMA' }), '2026');
sc(12, 14, era('01', 'goldlock', 'EMAS MATIKAN\nNAFSU BOROS', 'Fitrah kita — sayang nak jual!', { place: 'PENYELESAIAN' }), '2026');
sc(14, 16, era('02', 'cash', 'RASA SELAMAT\nSIMPAN TUNAI', 'Tapi tak sedar kuasa beli\ndihakis inflasi setiap tahun', { place: 'GOLONGAN KEDUA', subOff: 170 }), '2026');

// ACT 2 — golongan 02 penutup + 03 Titanic (1 bar setiap satu)
sc(16, 17, era('02', 'shrink', 'NILAI MENGECUT', 'Nombor dividen bertambah,\nnilai duit makin kecil', { place: 'GOLONGAN KEDUA', subOff: 125 }), '2026');
sc(17, 18, era('03', 'warn', 'PALING BAHAYA', 'Orang kaya tanpa emas fizikal', { place: 'GOLONGAN KETIGA' }), '1912');
sc(18, 19, era('1912', 'titanic', 'TITANIC', 'Kapal paling mewah zamannya', { place: 'ATLANTIK UTARA' }), '1912');
sc(19, 20, era('1912', 'crowd', 'DI ATAS KAPAL', 'Kira-kira 2,224 penumpang & kru', { place: 'TITANIC' }), '1912');
sc(20, 21, era('20', 'boats', 'BOT PENYELAMAT', 'Hanya 20 buah', { place: 'TITANIC', yearSize: 170 }), '1912');
sc(21, 22, era('1,178', 'capacity', 'MUAT SEPARUH', 'Tak sampai separuh yang ada di atas kapal', { place: 'KAPASITI BOT' }), '1912');
sc(22, 23, era('15.4.1912', 'sinking', 'MEWAH, TAPI KARAM', 'Kemewahan tak menyelamatkan', { place: 'MALAM ITU', yearSize: 110, titleSize: 70 }), '1912');
sc(23, 24, era('2013', 'cyprus', 'DEPOSIT DIPOTONG', 'Simpanan besar di bank ditukar\nsebahagian demi selamatkan bank', { place: 'CYPRUS', titleSize: 70, subOff: 125 }), '2013');
sc(24, 25, era('2019', 'atm', 'PENGELUARAN DISEKAT', 'Bank hadkan duit yang boleh dikeluarkan', { place: 'LUBNAN', titleSize: 62 }), '2019');
sc(25, 26, era('BEKU', 'frozen', 'SEMUA LUMPUH', 'Bila akaun dibekukan atau krisis berlaku', { place: 'RISIKO SEBENAR', yearSize: 150 }), '2026');

// PIVOT
sc(26, 28, (lt) => {
  ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(CX, IY); ctx.globalAlpha = eo(lt / 1.2); goldbar(0, 0, 1.6 * eo(lt / 1.5), 60); ctx.restore(); ctx.globalAlpha = 1;
  mono('SEBAB ITU', 330, 38, eo((lt - 0.2) / 0.6), null, 14);
  htext('FORMULANYA\nMUDAH', 1420, 90, { font: 'Grot', weight: 700, alpha: eo((lt - 1.3) / 0.5), glow: 40, scale: 1 + 0.02 * lt });
}, '2026');

// ACT 3 — formula + soalan komen (setengah bar)
const act3 = [
  ['3 BULAN', 'cal3', 'GAJI', 'Simpan dalam tunai', 'LANGKAH 1'],
  ['KECEMASAN', 'umbrella', 'CUKUP SEKADAR ITU', 'Untuk hari hujan', 'LANGKAH 1'],
  ['SELEBIHNYA', 'convert', 'TUKAR KE EMAS', 'Emas fizikal', 'LANGKAH 2'],
  ['RM100', 'rm100', 'SERENDAH ITU', 'Setiap bulan', 'LANGKAH 2'],
  ['KONSISTEN', 'months', 'SETIAP BULAN', 'Tanpa tunggu duit lebih', 'LANGKAH 3'],
  ['SIKIT-SIKIT', 'hill', 'JADI BUKIT', 'Lama-lama terkumpul', 'LANGKAH 3'],
  ['SOALAN', 'comment', 'DROP DI KOMEN', 'Anda kumpulan mana?', 'SEBELUM GAJI LESAP'],
  ['01', 'swipe', "TANGAN 'GATAL'?", 'Duit selalu bocor', 'KUMPULAN'],
  ['02', 'cash', 'SELESA DENGAN TUNAI?', 'Tapi inflasi tak tidur', 'KUMPULAN'],
  ['03', 'titanic', 'KAYA TANPA EMAS?', 'Kapal tanpa bot', 'KUMPULAN'],
  ['KOMEN', 'comment', '01, 02 ATAU 03?', 'Tulis di ruangan komen', 'SEKARANG'],
  ['BULAN INI', 'leak', 'SEBELUM LESAP', 'Mulakan sebelum gaji habis', 'JANGAN TANGGUH'],
];
act3.forEach(([top, icon, title, sub, lab], i) => {
  sc(28 + i * 0.5, 28.5 + i * 0.5, (lt, d) => {
    const T = lt / d;
    ctx.save(); ctx.translate(CX, IY); const z = lerp(1.3, 0.95, eo(T * 3)); ctx.scale(z, z); ICON[icon](lt * 1.8 + 0.4); ctx.restore();
    htext(top, 320, top.length > 6 ? 110 : 150, { track: 8, scale: lerp(1.15, 1, eo(T * 4)) });
    mono(lab, 440, 32, 1);
    htext(title, 1400, title.length > 16 ? 66 : 80, { font: 'Grot', weight: 700, track: 2, alpha: eo(T * 6), glow: 26 });
    ptext(sub, 1510, 42, eo(T * 6 - 0.4));
  }, '2026');
});
// word slams
const words = ['TAHAN', 'SIMPAN', 'KUMPUL', 'LINDUNG', 'SEDIA', 'SELAMAT', 'WARISKAN'];
words.forEach((w, i) => {
  sc(WORDS + i / 4, WORDS + (i + 1) / 4, (lt, d) => {
    const T = lt / d;
    htext(w, 960, w.length > 6 ? 140 : 170, { track: 10, scale: lerp(1.6, 1, eo(T * 4)) + T * 0.05, glow: 60 });
    mono(String(i + 1).padStart(2, '0') + ' / 07', 1130, 34, 0.9, null, 8);
  }, '2026');
});
sc(BREATH, DROP, (lt, d) => {
  ctx.fillStyle = 'rgba(0,0,0,0.75)'; ctx.fillRect(0, 0, W, H);
  const r = 4 + 36 * (lt / d) ** 2; fillA(1, 80); ctx.beginPath(); ctx.arc(CX, 960, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
}, '2026');

// DROP
sc(36, 38, (lt) => {
  ctx.save(); ctx.translate(CX, IY); goldbar(0, 0, 1.6 + 0.04 * beatPulse(curT), 70); ctx.restore();
  mono('BAGI MEREKA YANG BERSEDIA', 330, 34, eo(lt * 3), null, 6);
  htext('EMAS BUKAN\nSEKADAR LOGAM', 1360, 84, { track: 2, glow: 50, lh: 1.15, scale: lerp(1.2, 1, eo(lt * 2)) });
}, '2026');
sc(38, 40, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ICON.lifeboat(lt); ctx.restore();
  mono('TAPI IA ADALAH', 330, 38, eo(lt * 3), null, 10);
  htext('BOT...', 1300, 130, { track: 8, glow: 50, alpha: eo(lt * 3) });
  const p = lt > BAR * 0.9 ? eback((lt - BAR * 0.9) * 3) : 0;
  if (p > 0) htext('PENYELAMAT!', 1480, 110, { track: 6, glow: 80, scale: lerp(1.8, 1, clamp(p)) });
}, '2026');
const evo = [['swipe', '01'], ['cash', '02'], ['titanic', '03'], ['frozen', 'KRISIS'], ['cal3', '3 BULAN'], ['rm100', 'RM100'], ['hill', 'KUMPUL'], ['lifeboat', 'SELAMAT']];
evo.forEach(([icon, lab], i) => {
  sc(40 + i / 4, 40 + (i + 1) / 4, (lt, d) => {
    const T = lt / d;
    htext(i < 4 ? 'DARI RISIKO' : 'KE SELAMAT', 360, 76, { font: 'Grot', weight: 700, track: 8, glow: 30 });
    ctx.save(); ctx.translate(CX, IY + 20); const z = lerp(0.95, 0.8, eo(T * 3)); ctx.scale(z, z); ICON[icon](1 + lt); ctx.restore();
    htext(lab, 1420, lab.length > 5 ? 120 : 150, { track: 12, scale: lerp(1.3, 1, eo(T * 4)), glow: 40 });
  }, '2026');
});

// FINALE — CTA dengan gambar Taufik
sc(42, 45, (lt) => {
  const s = eo(lt / 0.9);
  // halo emas di belakang
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(CX, 1150, 0, CX, 1150, 700); g.addColorStop(0, ca(0.45 * s)); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
  ctx.save(); ctx.globalAlpha = s * 0.8; neonA(6, 40); ctx.beginPath(); ctx.arc(CX, 1130, 420 * lerp(0.9, 1, s), 0, TAU); ctx.stroke(); ctx.restore();
  // gambar
  const im = IMG.taufik, iw = 900, ih = iw * im.height / im.width;
  const y0 = lerp(1920, 700, eo(lt / 1.1));
  ctx.save(); ctx.shadowColor = ca(0.9); ctx.shadowBlur = 50; ctx.drawImage(im, CX - iw / 2 - 20, y0, iw, ih); ctx.restore();
  // pudar bawah supaya teks jelas
  const fg = ctx.createLinearGradient(0, 1450, 0, 1920); fg.addColorStop(0, 'rgba(3,5,10,0)'); fg.addColorStop(0.5, 'rgba(3,5,10,0.85)'); fg.addColorStop(1, 'rgba(3,5,10,1)');
  ctx.fillStyle = fg; ctx.fillRect(0, 1450, W, 470);
  // CTA
  const words = ['SHARE.', 'LIKE.', 'FOLLOW'];
  words.forEach((w, i) => { const p = eback((lt - 0.6 - i * 0.25) * 3); if (p > 0) htext(w, 230 + i * 125, 118, { track: 8, glow: 50, scale: lerp(1.6, 1, clamp(p)) }); });
  htext('@taufik.pg', 1640, 88, { font: 'Grot', weight: 700, track: 4, glow: 40, alpha: eo((lt - 1.5) / 0.5) });
  mono('DEALER PUBLIC GOLD', 1740, 30, eo((lt - 1.8) / 0.5), null, 8);
  if (lt > 5.3) { ctx.fillStyle = `rgba(0,0,0,${clamp((lt - 5.3) / 0.65)})`; ctx.fillRect(0, 0, W, H); }
}, '2026');
