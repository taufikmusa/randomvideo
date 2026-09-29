/* scenes.js — THE ONLY FILE TO WRITE PER VIDEO.
 * Reference example: "THE PHONE — 150 Years" (1876 → 2026). Replace KEYS, CFG, ICON and the scene list. */

// ------------------------------------------------------------ colour grade: sepia amber (wired) -> mint (mobile) -> cyan/magenta (smartphone)
const KEYS = [
  [0, [255, 178, 80], [255, 110, 40]],
  [30, [255, 178, 80], [255, 110, 40]],
  [40, [120, 255, 190], [60, 200, 255]],
  [50, [90, 255, 210], [60, 190, 255]],
  [54, [210, 245, 255], [120, 200, 255]],
  [58, [62, 226, 255], [255, 70, 230]],
  [90, [62, 226, 255], [255, 70, 230]],
];

// ------------------------------------------------------------ config
const CFG = {
  // top HUD: timeline from start→end year with a glowing marker, plus optional 5-level bars
  hud: {
    fromBar: ACT1, toBar: DROP, start: 1876, end: 2026,
    levels: [1946, 1973, 1991, 2001, 2009],            // year thresholds that light each bar
    tag: (bars) => bars ? 'MOBILE' : 'WIRED',          // small label top-left
  },
  glitchFromBar: ACT3,                                   // RGB-slice glitch on cuts from here on
};

// ------------------------------------------------------------ icons (neon line-art, centred at 0,0, radius ~300)
const ICON = {
  bell(lt) {
    const ring = (lt % 2) < 1.25 ? 1 : 0;
    const sh = ring * Math.sin(lt * 130) * 7;
    ctx.save(); ctx.translate(sh, 0);
    neon(9);
    [-1, 1].forEach(s => { ctx.beginPath(); ctx.arc(s * 120, 0, 110, Math.PI, 0); ctx.closePath(); ctx.stroke(); fillA(0.15, 0); ctx.fill(); });
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 150); ctx.stroke();
    ctx.save(); ctx.translate(0, 0); ctx.rotate(ring * Math.sin(lt * 130) * 0.5);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -90); ctx.stroke(); fillA(1, 30); ctx.beginPath(); ctx.arc(0, -100, 20, 0, TAU); ctx.fill();
    ctx.restore(); ctx.restore();
    if (ring) { waves(-120, -40, 3, lt, -Math.PI * 0.75, 140, 0.5); waves(120, -40, 3, lt, -Math.PI * 0.25, 140, 0.5); }
  },
  candlestick(lt) {
    neon(9);
    ctx.beginPath(); ctx.ellipse(0, 260, 130, 30, 0, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-30, 240); ctx.lineTo(-18, -150); ctx.moveTo(30, 240); ctx.lineTo(18, -150); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-18, -150); ctx.lineTo(-70, -250); ctx.lineTo(70, -250); ctx.lineTo(18, -150); ctx.stroke();
    fillA(0.2, 0); ctx.fill();
    // receiver on hook
    ctx.save(); ctx.translate(90, -60); ctx.rotate(Math.sin(lt * 3) * 0.05);
    neon(9); ctx.beginPath(); ctx.moveTo(-60, -50); ctx.lineTo(0, -50); ctx.stroke();
    rr(0, -80, 40, 170, 18); ctx.stroke(); ctx.restore();
    // cord
    neonA(4, 12); ctx.beginPath(); ctx.moveTo(110, 110); ctx.bezierCurveTo(200, 250, 60, 320, 200, 330); ctx.stroke();
    waves(0, -250, 3, lt, -Math.PI / 2, 60);
  },
  switchboard(lt) {
    neon(7); rr(-300, -260, 600, 520, 20); ctx.stroke();
    const r = mulberry(3);
    const J = []; for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) J.push([-240 + i * 96, -190 + j * 90]);
    J.forEach(([x, y]) => { neon(4, 8, 0.7); ctx.beginPath(); ctx.arc(x, y, 14, 0, TAU); ctx.stroke(); });
    for (let k = 0; k < 7; k++) {
      const a = J[Math.floor(r() * 30)], b = J[Math.floor(r() * 30)];
      const p = eo(lt * 1.3 - k * 0.12); if (p <= 0) continue;
      ctx.save(); neonA(6, 20);
      ctx.beginPath(); ctx.moveTo(a[0], a[1]);
      const mx = lerp(a[0], b[0], p), my = lerp(a[1], b[1], p);
      ctx.quadraticCurveTo((a[0] + mx) / 2, Math.max(a[1], my) + 120, mx, my); ctx.stroke();
      fillA(1, 20); ctx.beginPath(); ctx.arc(mx, my, 10, 0, TAU); ctx.fill(); ctx.restore();
    }
  },
  rotary(lt) {
    neon(9); ctx.beginPath(); ctx.arc(0, 0, 260, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 90, 0, TAU); ctx.stroke();
    const spin = lt < 0.6 ? -eo(lt / 0.6) * 1.6 : -1.6 * (1 - eo((lt - 0.6) / 0.9));
    ctx.save(); ctx.rotate(spin);
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI * 0.35 + i * (Math.PI * 1.45 / 9);
      neon(6, 14); ctx.beginPath(); ctx.arc(Math.cos(a) * 180, Math.sin(a) * 180, 42, 0, TAU); ctx.stroke();
    }
    ctx.restore();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI * 0.35 + i * (Math.PI * 1.45 / 9);
      ctx.save(); ctx.fillStyle = ca(0.9); ctx.font = '700 36px Mono'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(String((i + 1) % 10), Math.cos(a) * 180, Math.sin(a) * 180); ctx.restore();
    }
    neonA(10); ctx.beginPath(); ctx.moveTo(200, 130); ctx.lineTo(250, 190); ctx.stroke();
  },
  coast(lt) {
    const p = eo(lt * 0.9);
    neon(6, 14);
    for (let i = 0; i < 6; i++) {
      const x = -330 + i * 132;
      ctx.beginPath(); ctx.moveTo(x, 200); ctx.lineTo(x, -40); ctx.moveTo(x - 36, -20); ctx.lineTo(x + 36, -20); ctx.stroke();
    }
    ctx.save(); ctx.beginPath(); ctx.rect(-400, -200, 800 * p, 500); ctx.clip();
    neonA(5, 22);
    for (let i = 0; i < 5; i++) { const x = -330 + i * 132; ctx.beginPath(); ctx.moveTo(x - 30, -20); ctx.quadraticCurveTo(x + 66, 30, x + 132 - 30, -20); ctx.stroke(); }
    ctx.restore();
    fillA(1, 30); ctx.beginPath(); ctx.arc(-330, 240, 14, 0, TAU); ctx.fill();
    ctx.globalAlpha = p; ctx.beginPath(); ctx.arc(330, 240, 14, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
    ctx.save(); ctx.fillStyle = '#fff'; ctx.font = '700 34px Mono'; ctx.textAlign = 'center'; ctx.shadowBlur = 0;
    ctx.fillText('NEW YORK', -300, 300); ctx.globalAlpha = p; ctx.fillText('SAN FRANCISCO', 250, 300); ctx.restore();
  },
  ocean(lt) {
    neon(6, 14); ctx.beginPath(); ctx.arc(0, 420, 480, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
    for (let i = 0; i < 5; i++) { ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.moveTo(-200 + i * 90, 110 + (i % 2) * 10); ctx.quadraticCurveTo(-170 + i * 90, 90, -140 + i * 90, 110); ctx.stroke(); }
    ctx.globalAlpha = 1;
    const p = eo(lt * 0.9);
    neonA(6, 24); ctx.setLineDash([18, 16]); ctx.lineDashOffset = -lt * 80;
    ctx.beginPath(); ctx.moveTo(-280, 20);
    const steps = 30; for (let i = 1; i <= steps * p; i++) { const x = lerp(-280, 280, i / steps); ctx.lineTo(x, 20 - Math.sin(i / steps * Math.PI) * 260); } ctx.stroke(); ctx.setLineDash([]);
    [[-280, 'NEW YORK'], [280, 'LONDON']].forEach(([x, n], k) => {
      ctx.save(); ctx.globalAlpha = k ? p : 1; fillA(1, 30); ctx.beginPath(); ctx.arc(x, 20, 16, 0, TAU); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.shadowBlur = 0; ctx.font = '700 34px Mono'; ctx.textAlign = 'center'; ctx.fillText(n, x, 80); ctx.restore();
    });
    waves(-280, 20, 3, lt, -Math.PI / 2, 30, 0.8);
  },
  car(lt) {
    neon(8);
    ctx.beginPath(); ctx.moveTo(-320, 180); ctx.lineTo(-320, 100); ctx.quadraticCurveTo(-300, 60, -220, 50); ctx.lineTo(-140, -30); ctx.quadraticCurveTo(-60, -80, 80, -40); ctx.lineTo(180, 50); ctx.quadraticCurveTo(310, 60, 320, 120); ctx.lineTo(320, 180); ctx.closePath(); ctx.stroke();
    [-190, 190].forEach(x => { ctx.beginPath(); ctx.arc(x, 180, 55, 0, TAU); ctx.fillStyle = '#03050a'; ctx.fill(); ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(250, 50); ctx.lineTo(260, -160); ctx.stroke();
    waves(260, -170, 3, lt, -Math.PI / 2, 30, 0.9);
    ctx.save(); ctx.translate(-40, -230); ctx.rotate(-0.3 + Math.sin(lt * 3) * 0.05); neonA(10, 26);
    ctx.beginPath(); ctx.moveTo(-90, 0); ctx.quadraticCurveTo(0, -40, 90, 0); ctx.stroke();
    rr(-120, -10, 60, 40, 14); ctx.stroke(); rr(60, -10, 60, 40, 14); ctx.stroke(); ctx.restore();
  },
  touchtone(lt) {
    ctx.save(); slab(380, 560, 40, false); ctx.restore();
    keypad(-100, -150, 100, 100, [0, 1, 5, 7, 10, 3, 2, 6][Math.floor(lt * 4) % 8], 34);
  },
  brick(lt, battery = false) {
    ctx.save(); ctx.translate(0, 40);
    neon(8); ctx.beginPath(); ctx.moveTo(60, -250); ctx.lineTo(60, -380); ctx.stroke();
    fillA(1, 30); ctx.beginPath(); ctx.arc(60, -385, 12, 0, TAU); ctx.fill();
    ctx.save(); slab(200, 520, 30, false); ctx.restore();
    neon(5, 10); rr(-70, -200, 140, 70, 8); ctx.stroke();
    if (battery) { const p = clamp(lt / 1.6); fillA(0.9, 18); ctx.fillRect(-60, -190, 120 * p, 50); }
    else { ctx.save(); ctx.fillStyle = ca(1); ctx.font = '700 30px Mono'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('CALL'.slice(0, 1 + Math.floor(lt * 5) % 5), 0, -165); ctx.restore(); }
    keypad(-60, -60, 60, 62, Math.floor(lt * 6) % 12, 18);
    ctx.restore();
    if (!battery) waves(60, -345, 3, lt, -Math.PI / 2, 40, 0.8);
  },
  tower(lt) {
    const hx = (x, y, r) => { ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } ctx.closePath(); };
    const r = 110;
    const cells = [[0, 0]]; for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + Math.PI / 6; cells.push([Math.cos(a) * r * Math.sqrt(3), Math.sin(a) * r * Math.sqrt(3)]); }
    cells.forEach(([x, y], i) => { const p = eo(lt * 2.5 - i * 0.1); if (p <= 0) return; ctx.save(); ctx.globalAlpha = p; neonA(4, 14); hx(x, y, r - 6); ctx.stroke(); ctx.globalAlpha = p * 0.12; fillA(1, 0); ctx.fill(); ctx.restore(); });
    neon(8); ctx.beginPath(); ctx.moveTo(-40, 100); ctx.lineTo(0, -90); ctx.lineTo(40, 100); ctx.moveTo(-26, 40); ctx.lineTo(26, 40); ctx.moveTo(-14, -20); ctx.lineTo(14, -20); ctx.stroke();
    waves(0, -95, 3, lt, -Math.PI / 2, 30, 1.2);
  },
  sms(lt) {
    const txt = 'Merry Christmas', n = Math.floor(clamp(lt / 1.2) * txt.length);
    ctx.save(); ctx.translate(0, -40);
    neon(8); rr(-330, -110, 660, 200, 50); ctx.stroke(); fillA(0.12, 0); ctx.fill();
    ctx.beginPath(); ctx.moveTo(200, 90); ctx.lineTo(260, 170); ctx.lineTo(120, 90); neon(8); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 14; ctx.font = '700 64px Grot'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(txt.slice(0, n) + ((Math.floor(lt * 4) % 2 && n < txt.length) ? '|' : ''), 0, -10);
    ctx.restore();
    ctx.save(); ctx.globalAlpha = eo(lt * 2 - 2.4); ctx.fillStyle = ca(1); ctx.font = '700 30px Mono'; ctx.letterSpacing = '6px'; ctx.textAlign = 'center'; ctx.fillText('✓ DELIVERED', 0, 260); ctx.restore();
  },
  simon(lt) {
    ctx.save(); slab(260, 580, 30, false); ctx.restore();
    neon(5, 10); rr(-100, -230, 200, 330, 10); ctx.stroke();
    for (let i = 0; i < 8; i++) { const p = eback(lt * 3 - i * 0.08); if (p <= 0) continue; ctx.save(); ctx.translate(-50 + (i % 2) * 100, -180 + Math.floor(i / 2) * 75); ctx.scale(p, p); fillA(0.85, 16); rr(-32, -24, 64, 48, 8); ctx.fill(); ctx.restore(); }
    neonA(6, 16); ctx.beginPath(); ctx.moveTo(180, 260); ctx.lineTo(60 + Math.sin(lt * 3) * 30, -60); ctx.stroke();
  },
  berry(lt) {
    ctx.save(); slab(360, 520, 40, false); ctx.restore();
    neon(5, 10); rr(-140, -220, 280, 190, 10); ctx.stroke();
    for (let k = 0; k < 4; k++) { const w = eo(lt * 2 - k * 0.15) * (220 - k * 40); fillA(0.8, 10); ctx.fillRect(-120, -195 + k * 40, w, 14); }
    for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) { const lit = (Math.floor(lt * 10) % 28) === j * 7 + i; if (lit) { fillA(1, 20); rr(-150 + i * 43, 10 + j * 50, 34, 36, 8); ctx.fill(); } else { neon(3, 6, 0.7); rr(-150 + i * 43, 10 + j * 50, 34, 36, 8); ctx.stroke(); } }
  },
  candybar(lt) {
    ctx.save(); slab(240, 560, 90, false); ctx.restore();
    neon(5, 10); rr(-80, -200, 160, 130, 12); ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.rect(-78, -198, 156, 126); ctx.clip();
    fillA(1, 10); const sx = ((lt * 120) % 180) - 90; for (let k = 0; k < 5; k++) ctx.fillRect(sx - k * 18, -140, 14, 14);
    ctx.fillRect(40, -110, 14, 14); ctx.restore();
    keypad(-55, 0, 55, 55, Math.floor(lt * 5) % 12, 16);
  },
  camera(lt) {
    ctx.save(); slab(300, 560, 40, false); ctx.restore();
    neon(7); ctx.beginPath(); ctx.arc(0, -120, 80, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(0, -120, 44, 0, TAU); ctx.stroke();
    fillA(1, 20); ctx.beginPath(); ctx.arc(80, -220, 14, 0, TAU); ctx.fill();
    const f = Math.max(0, 1 - Math.abs(lt - 0.5) / 0.15);
    if (f > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(80, -220, 0, 80, -220, 340); g.addColorStop(0, `rgba(255,255,255,${0.75 * f})`); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(-540, -900, 1080, 1800); ctx.restore(); }
    ctx.save(); ctx.fillStyle = ca(1); ctx.shadowColor = ca(1); ctx.shadowBlur = 14; ctx.font = '700 40px Mono'; ctx.textAlign = 'center'; ctx.fillText('0.11 MP', 0, 140); ctx.restore();
  },
  signal(lt, label = '3G') {
    for (let i = 0; i < 5; i++) { const h = 60 + i * 70, p = eo(lt * 3 - i * 0.15); ctx.save(); ctx.globalAlpha = 0.25 + 0.75 * p; fillA(1, 26); rr(-260 + i * 110, 200 - h * p, 80, h * p, 10); ctx.fill(); ctx.restore(); }
    ctx.save(); ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 30; ctx.font = '900 150px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, 0, -170); ctx.restore();
  },
  iphone(lt) {
    const p = eo(lt / 1.2);
    ctx.save(); ctx.globalAlpha = p;
    ctx.fillStyle = '#05080f'; rr(-190, -380, 380, 760, 60); ctx.fill();
    ctx.setLineDash([2400 * p, 3000]); neon(8, 40); ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
    const s = eo((lt - 1.1) / 0.8);
    if (s > 0) {
      ctx.save(); rr(-165, -320, 330, 620, 20); ctx.clip();
      const g = ctx.createLinearGradient(0, -320, 0, 300); g.addColorStop(0, ca(0.5 * s)); g.addColorStop(1, cb(0.4 * s)); ctx.fillStyle = g; ctx.fillRect(-170, -330, 340, 640);
      for (let i = 0; i < 16; i++) { const q = eback((lt - 1.3) * 3 - i * 0.05); if (q <= 0) continue; ctx.save(); ctx.translate(-105 + (i % 4) * 70, -250 + Math.floor(i / 4) * 90); ctx.scale(q, q); ctx.fillStyle = 'rgba(255,255,255,0.92)'; rr(-24, -24, 48, 48, 12); ctx.fill(); ctx.restore(); }
      ctx.restore();
    }
    neon(4, 10, p); ctx.beginPath(); ctx.arc(0, 340, 18, 0, TAU); ctx.stroke();
  },
  mpesa(lt) {
    ctx.save(); ctx.translate(-150, 0); slab(200, 380, 30, false); ctx.restore();
    ctx.save(); ctx.translate(150, 0); slab(200, 380, 30, false); ctx.restore();
    const p = (lt * 1.2) % 1;
    fillA(1, 30); ctx.beginPath(); ctx.arc(lerp(-150, 150, p), -Math.sin(p * Math.PI) * 180, 34, 0, TAU); ctx.fill();
    ctx.save(); ctx.fillStyle = '#03050a'; ctx.font = '900 34px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowBlur = 0; ctx.fillText('$', lerp(-150, 150, p), -Math.sin(p * Math.PI) * 180 + 2); ctx.restore();
  },
  apps(lt) {
    for (let i = 0; i < 20; i++) { const q = eback(lt * 3 - i * 0.04); if (q <= 0) continue; ctx.save(); ctx.translate(-240 + (i % 5) * 120, -240 + Math.floor(i / 5) * 120 + 60); ctx.scale(q, q); (i % 3 ? fillA : fillB)(0.9, 20); rr(-44, -44, 88, 88, 22); ctx.fill(); ctx.restore(); }
  },
  robot(lt) {
    neon(9); ctx.beginPath(); ctx.arc(0, 40, 200, Math.PI, 0); ctx.closePath(); ctx.stroke(); fillA(0.12, 0); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-110, -120); ctx.lineTo(-160, -220); ctx.moveTo(110, -120); ctx.lineTo(160, -220); neon(9); ctx.stroke();
    const bl = (lt % 1.2) < 0.1 ? 0.2 : 1;
    fillA(1, 30); [-80, 80].forEach(x => { ctx.beginPath(); ctx.ellipse(x, -40, 26, 26 * bl, 0, 0, TAU); ctx.fill(); });
    neon(9); rr(-200, 70, 400, 200, 30); ctx.stroke();
  },
  chat(lt) {
    const b = (x, y, w, s, k) => { const p = eback(lt * 3 - k * 0.25); if (p <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(p, p); (s ? fillB : fillA)(0.9, 20); rr(-w / 2, -50, w, 100, 40); ctx.fill(); ctx.restore(); };
    b(-90, -200, 420, 0, 0); b(90, -60, 380, 1, 1); b(-110, 80, 340, 0, 2); b(60, 220, 460, 1, 3);
  },
  video(lt) {
    ctx.save(); ctx.rotate(-Math.PI / 2); slab(420, 700, 40, true); ctx.restore();
    fillA(1, 30); ctx.beginPath(); ctx.moveTo(-50, -80); ctx.lineTo(80, 0); ctx.lineTo(-50, 80); ctx.closePath(); ctx.fill();
    neon(6, 10, 0.6); ctx.beginPath(); ctx.moveTo(-300, 170); ctx.lineTo(300, 170); ctx.stroke();
    neonA(8, 20); ctx.beginPath(); ctx.moveTo(-300, 170); ctx.lineTo(-300 + 600 * ((lt * 0.5) % 1), 170); ctx.stroke();
  },
  selfie(lt) {
    ctx.save(); slab(320, 600, 50, true); ctx.restore();
    fillA(1, 20); ctx.beginPath(); ctx.arc(0, -260, 10, 0, TAU); ctx.fill();
    neon(8); ctx.beginPath(); ctx.arc(0, -40, 90, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 180, 140, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, -20, 40, 0.2, Math.PI - 0.2); ctx.stroke();
  },
  finger(lt) {
    for (let i = 0; i < 8; i++) {
      const p = eo(lt * 2.5 - i * 0.08); if (p <= 0) continue;
      neonA(7, 18); ctx.globalAlpha = p;
      ctx.beginPath(); ctx.ellipse(0, 20 + i * 6, 40 + i * 28, 60 + i * 34, 0, Math.PI * (1.05 + i * 0.02), Math.PI * (1.95 + (i % 2) * 0.5 - i * 0.02)); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    const sy = -260 + ((lt * 400) % 560);
    ctx.save(); ctx.fillStyle = cb(0.6); ctx.shadowColor = cb(1); ctx.shadowBlur = 30; ctx.fillRect(-300, sy, 600, 4); ctx.restore();
  },
  pay(lt) {
    ctx.save(); ctx.translate(-80, 60); ctx.rotate(-0.12); fillA(0.15, 0); rr(-230, -140, 460, 280, 26); ctx.fill(); neon(8); ctx.stroke();
    fillB(0.9, 20); rr(-180, -70, 80, 60, 10); ctx.fill(); neon(4, 8, 0.6); ctx.beginPath(); ctx.moveTo(-180, 70); ctx.lineTo(120, 70); ctx.stroke(); ctx.restore();
    waves(200, -120, 4, lt, -Math.PI / 4, 30, 0.7);
  },
  face(lt) {
    neonA(9, 26);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => { ctx.beginPath(); ctx.moveTo(sx * 250, sy * 150); ctx.lineTo(sx * 250, sy * 250); ctx.lineTo(sx * 150, sy * 250); ctx.stroke(); });
    const r = mulberry(8);
    for (let i = 0; i < 40; i++) { const a = r() * TAU, d = r() * 170; const x = Math.cos(a) * d * 0.8, y = Math.sin(a) * d; const on = r() < eo(lt * 2); if (!on) continue; fillA(1, 12); ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill(); }
    const ok = eo(lt * 2 - 1.5); if (ok > 0) { ctx.save(); ctx.globalAlpha = ok; neon(12, 30); ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-10, 50); ctx.lineTo(80, -60); ctx.stroke(); ctx.restore(); }
  },
  g5(lt) { ICON.signal(lt, '5G'); },
  fold(lt) {
    const a = lerp(0.15, 1, eo(lt * 1.5));
    ctx.save(); ctx.translate(-130 * a - 4, 0); ctx.scale(a, 1); slab(260, 560, 30, true); ctx.restore();
    ctx.save(); ctx.translate(134, 0); slab(260, 560, 30, true); ctx.restore();
    neonA(6, 20); ctx.beginPath(); ctx.moveTo(0, -270); ctx.lineTo(0, 270); ctx.stroke();
  },
  ai(lt) {
    neon(8); rr(-150, -150, 300, 300, 30); ctx.stroke();
    for (let i = 0; i < 5; i++) { const o = -100 + i * 50; [[o, -150, o, -210], [o, 150, o, 210], [-150, o, -210, o], [150, o, 210, o]].forEach(([a, b, c, d]) => { neon(5, 8, 0.8); ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); }); }
    const s = 1 + 0.12 * Math.sin(lt * 8);
    ctx.save(); ctx.scale(s, s); fillA(1, 40);
    ctx.beginPath(); ctx.moveTo(0, -80); ctx.quadraticCurveTo(10, -10, 80, 0); ctx.quadraticCurveTo(10, 10, 0, 80); ctx.quadraticCurveTo(-10, 10, -80, 0); ctx.quadraticCurveTo(-10, -10, 0, -80); ctx.fill(); ctx.restore();
    fillB(1, 20); ctx.beginPath(); ctx.arc(80, -80, 14 + 4 * Math.sin(lt * 6), 0, TAU); ctx.fill();
  },
  globe(lt) {
    neon(6, 16); ctx.beginPath(); ctx.arc(0, 0, 260, 0, TAU); ctx.stroke();
    ctx.lineWidth = 3; ctx.globalAlpha = 0.6;
    for (let i = -2; i <= 2; i++) { const y = i * 90; const r = Math.sqrt(260 * 260 - y * y); ctx.beginPath(); ctx.ellipse(0, y, r, r * 0.12, 0, 0, TAU); ctx.stroke(); }
    for (let i = 0; i < 6; i++) { const ph = (lt * 0.5 + i / 6) % 1; ctx.beginPath(); ctx.ellipse(0, 0, Math.abs(Math.cos(ph * Math.PI)) * 260, 260, 0, 0, TAU); ctx.stroke(); }
    ctx.globalAlpha = 1;
    const r = mulberry(21); const P = []; for (let i = 0; i < 14; i++) { const a = r() * TAU, d = Math.sqrt(r()) * 240; P.push([Math.cos(a) * d, Math.sin(a) * d]); }
    for (let i = 0; i < 18; i++) {
      const a = P[i % 14], b = P[(i * 5 + 3) % 14], p = ((lt * 1.5 + i * 0.13) % 1);
      ctx.save(); ctx.strokeStyle = i % 2 ? ca(0.8) : cb(0.8); ctx.lineWidth = 3; ctx.shadowColor = ca(1); ctx.shadowBlur = 12;
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - 120;
      ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo(mx, my, b[0], b[1]); ctx.stroke();
      const x = (1 - p) ** 2 * a[0] + 2 * (1 - p) * p * mx + p * p * b[0], y = (1 - p) ** 2 * a[1] + 2 * (1 - p) * p * my + p * p * b[1];
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, 6, 0, TAU); ctx.fill(); ctx.restore();
    }
    P.forEach(([x, y]) => { fillA(1, 16); ctx.beginPath(); ctx.arc(x, y, 8, 0, TAU); ctx.fill(); });
  },
  apollo(lt) {
    ctx.save(); ctx.translate(-150, -40);
    ctx.fillStyle = '#0c0f16'; ctx.beginPath(); ctx.arc(0, 0, 190, 0, TAU); ctx.fill(); neon(5, 12, 0.6); ctx.stroke();
    [[-60, -50, 30], [50, 40, 42], [-20, 90, 20], [80, -80, 18]].forEach(([x, y, r]) => { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); });
    ctx.restore();
    ctx.save(); ctx.translate(210, 90 + Math.sin(lt * 2) * 10); ctx.rotate(0.15); slab(180, 360, 28, true);
    ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 20; ctx.font = '900 64px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('×10⁶', 0, 0); ctx.restore();
  },
  // evolution silhouettes for the recap
  rotaryphone(lt) {
    neon(8); ctx.beginPath(); ctx.moveTo(-220, 200); ctx.lineTo(-170, 0); ctx.lineTo(170, 0); ctx.lineTo(220, 200); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 100, 70, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-230, -60); ctx.quadraticCurveTo(0, -150, 230, -60); ctx.stroke();
    rr(-270, -80, 90, 70, 20); ctx.stroke(); rr(180, -80, 90, 70, 20); ctx.stroke();
  },
  flip(lt) {
    ctx.save(); ctx.translate(0, 120); slab(200, 280, 30, false); keypad(-50, -70, 50, 45, Math.floor(lt * 6) % 12, 12); ctx.restore();
    ctx.save(); ctx.translate(0, -150); ctx.rotate(-0.08); slab(200, 260, 30, false); neon(5, 10); rr(-70, -90, 140, 150, 10); ctx.stroke(); ctx.restore();
  },
  smart(lt) { ctx.save(); slab(300, 600, 50, true); ctx.restore(); ICON.apps(1 + lt); },
};


// ------------------------------------------------------------ scenes
// COLD OPEN — the ring
sc(0, 2, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ctx.scale(0.9, 0.9); ctx.globalAlpha = eo(lt / 0.5); ICON.bell(lt); ctx.restore(); ctx.globalAlpha = 1;
  mono('INCOMING CALL', 380, 36, (Math.floor(lt * 2.5) % 2 ? 0.4 : 1) * eo(lt / 0.4), null, 16);
  htext('1876', 1330, 110, { alpha: eo((lt - 1.4) / 0.6), track: 14 });
}, '1876');
// TITLE
sc(2, 4, (lt) => {
  const s = eo(lt / 1.0);
  htext('THE PHONE', 820, 130 - 16 * (1 - s), { alpha: s, track: lerp(30, 6, s), glow: 50 });
  ctx.save(); ctx.fillStyle = ca(0.9); ctx.shadowColor = ca(1); ctx.shadowBlur = 20; const w = 520 * eo((lt - 0.4) / 0.8); ctx.fillRect(CX - w / 2, 925, w, 4); ctx.restore();
  mono('150 YEARS · 1876 — 2026', 1000, 34, eo((lt - 0.7) / 0.6), null, 8);
  ptext('How one invention\nconnected all of humanity', 1180, 48, eo((lt - 1.3) / 0.7), { weight: 700 });
}, '1876');

// WIRED ERA — 2 bars each
sc(4, 6, era('1876', 'candlestick', '"MR. WATSON,\nCOME HERE"', 'Alexander Graham Bell\nmakes the first phone call', { place: 'BOSTON, USA', subOff: 175 }), '1876');
sc(6, 8, era('1878', 'switchboard', 'THE FIRST\nEXCHANGE', 'Operators connect\nevery call by hand', { place: 'NEW HAVEN, USA' }), '1878');
sc(8, 10, era('1891', 'rotary', 'NO OPERATOR\nNEEDED', 'Strowger patents the automatic\nexchange — dialing is born', { place: 'KANSAS CITY, USA' }), '1891');
sc(10, 12, era('1915', 'coast', 'COAST TO COAST', 'The first transcontinental\ncall crosses America', { place: 'USA' }), '1915');
sc(12, 14, era('1927', 'ocean', 'ACROSS\nTHE OCEAN', 'The first commercial call\nfrom New York to London', { place: 'TRANSATLANTIC' }), '1927');
sc(14, 16, era('1946', 'car', 'THE CAR PHONE', 'The first mobile service —\nits gear weighed 36 kg', { place: 'ST. LOUIS, USA' }), '1946');

// MOBILE ERA — 1 bar each
sc(16, 17, era('1963', 'touchtone', 'PUSH-BUTTON', 'Touch-tone replaces the dial', { place: 'USA' }), '1963');
sc(17, 18, era('1973', 'brick', 'THE FIRST\nMOBILE CALL', 'Martin Cooper dials from\na New York sidewalk', { place: 'NEW YORK, USA' }), '1973');
sc(18, 19, era('1983', 'brick', 'ON SALE: $3,995', '30 min talk time.\n10 hours to charge.', { place: 'DynaTAC 8000X', arg: true }), '1983');
sc(19, 20, era('1991', 'tower', '2G GOES DIGITAL', 'The first GSM call', { place: 'FINLAND' }), '1991');
sc(20, 21, era('1992', 'sms', 'THE FIRST TEXT', 'The SMS is born', { place: 'UNITED KINGDOM' }), '1992');
sc(21, 22, era('1994', 'simon', 'THE FIRST\nSMARTPHONE', 'IBM Simon: touchscreen,\napps and email', { place: 'USA' }), '1994');
sc(22, 23, era('1999', 'berry', 'EMAIL IN\nYOUR POCKET', 'BlackBerry takes\nbusiness mobile', { place: 'CANADA' }), '1999');
sc(23, 24, era('2000', 'candybar', 'THE UNBREAKABLE', 'Nokia 3310 — 126 million sold', { place: 'FINLAND', titleSize: 70 }), '2000');
sc(24, 25, era('2000', 'camera', 'THE CAMERA\nPHONE', 'Sharp J-SH04 takes\nthe first mobile photos', { place: 'JAPAN' }), '2000');
sc(25, 26, era('2001', 'signal', 'MOBILE INTERNET', 'The 3G network goes live', { place: 'JAPAN', arg: '3G' }), '2001');

// 2007 — the pivot
sc(26, 28, (lt) => {
  ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(CX, IY); ctx.scale(0.95, 0.95); ICON.iphone(lt); ctx.restore();
  htext('2007', 300, 170, { alpha: eo((lt - 0.2) / 0.6), track: 14 });
  htext('EVERYTHING\nCHANGED', 1430, 96, { font: 'Grot', weight: 700, alpha: eo((lt - 1.6) / 0.5), glow: 40, scale: 1 + 0.02 * lt });
  ptext('One screen. No keyboard.\nThe internet in your hand.', 1640, 42, eo((lt - 2.4) / 0.5));
}, '2007');

// SMARTPHONE ERA — half-bar cuts
const smart = [
  ['2007', 'mpesa', 'M-PESA', 'Mobile money for millions', 'KENYA'],
  ['2008', 'apps', 'APP STORE', '500 apps on day one', 'GLOBAL'],
  ['2008', 'robot', 'ANDROID', 'Open to every phone maker', 'GLOBAL'],
  ['2009', 'chat', 'WHATSAPP', 'Messages go free, worldwide', 'GLOBAL'],
  ['2009', 'video', '4G LTE', 'Video, anywhere', 'SWEDEN · NORWAY'],
  ['2010', 'selfie', 'FRONT CAMERA', 'The selfie era begins', 'GLOBAL'],
  ['2013', 'finger', 'FINGERPRINT', 'Your touch is the key', 'GLOBAL'],
  ['2014', 'pay', 'TAP TO PAY', 'Wallets go digital', 'GLOBAL'],
  ['2017', 'face', 'FACE UNLOCK', 'Your face is the password', 'GLOBAL'],
  ['2019', 'g5', '5G', 'The next-gen network arrives', 'SOUTH KOREA'],
  ['2019', 'fold', 'FOLDABLES', 'Phones that open like books', 'GLOBAL'],
  ['2020s', 'ai', 'ON-DEVICE AI', 'A genius in your pocket', 'EVERYWHERE'],
];
smart.forEach(([year, icon, title, sub, place], i) => {
  sc(28 + i * 0.5, 28.5 + i * 0.5, (lt, d) => {
    const T = lt / d;
    ctx.save(); ctx.translate(CX, IY); const z = lerp(1.3, 0.95, eo(T * 3)); ctx.scale(z, z); ICON[icon](lt * 1.8 + 0.3); ctx.restore();
    htext(year, 320, 150, { track: 10, scale: lerp(1.15, 1, eo(T * 4)) });
    mono(place, 430, 32, 1);
    htext(title, 1390, 88, { font: 'Grot', weight: 700, track: 2, alpha: eo(T * 6), glow: 26 });
    ptext(sub, 1500, 42, eo(T * 6 - 0.4));
  }, year);
});
// word slams — beat cuts
const words = ['CALL', 'TEXT', 'SNAP', 'PAY', 'NAVIGATE', 'STREAM', 'CREATE'];
words.forEach((w, i) => {
  sc(34 + i / 4, 34 + (i + 1) / 4, (lt, d) => {
    const T = lt / d;
    htext(w, 960, w.length > 6 ? 130 : 180, { track: 10, scale: lerp(1.6, 1, eo(T * 4)) + T * 0.05, glow: 60 });
    mono(String(i + 1).padStart(2, '0') + ' / 07', 1130, 34, 0.9, null, 8);
  }, '2026');
});
sc(35.75, 36, (lt, d) => {
  ctx.fillStyle = 'rgba(0,0,0,0.75)'; ctx.fillRect(0, 0, W, H);
  const r = 4 + 36 * (lt / d) ** 2; fillA(1, 80); ctx.beginPath(); ctx.arc(CX, 960, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
}, '2026');

// DROP
sc(36, 38, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ICON.globe(lt); ctx.restore();
  mono('TODAY', 330, 40, eo(lt * 3), null, 20);
  const n = (8 * eo(lt / 1.3)).toFixed(1);
  htext(n + ' BILLION+', 1320, 110, { track: 4, glow: 50 });
  htext('MOBILE CONNECTIONS', 1440, 54, { font: 'Grot', weight: 700, track: 6, alpha: eo(lt * 2), glow: 20 });
  ptext('More than there are\npeople on Earth', 1570, 44, eo(lt * 2 - 0.8));
}, '2026');
sc(38, 40, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ICON.apollo(lt); ctx.restore();
  mono('YOUR PHONE vs APOLLO 11', 330, 36, eo(lt * 3), null, 8);
  htext('MILLIONS\nOF TIMES', 1360, 100, { track: 4, glow: 50, scale: lerp(1.2, 1, eo(lt * 2)) });
  ptext('more computing power than the\ncomputer that landed on the Moon', 1580, 42, eo(lt * 2 - 0.6));
}, '2026');
const evo = [['candlestick', '1876'], ['rotaryphone', '1919'], ['touchtone', '1963'], ['brick', '1983'], ['flip', '1996'], ['candybar', '2000'], ['smart', '2007'], ['fold', '2019']];
evo.forEach(([icon, year], i) => {
  sc(40 + i / 4, 40 + (i + 1) / 4, (lt, d) => {
    const T = lt / d;
    htext(i < 4 ? 'FROM WIRES' : 'TO WIRELESS', 360, 76, { font: 'Grot', weight: 700, track: 8, glow: 30 });
    ctx.save(); ctx.translate(CX, IY + 20); const z = lerp(0.95, 0.8, eo(T * 3)); ctx.scale(z, z); ICON[icon](0.8 + lt, icon === 'brick'); ctx.restore();
    htext(year, 1420, 150, { track: 12, scale: lerp(1.3, 1, eo(T * 4)), glow: 40 });
  }, year);
});

// FINALE
sc(42, 45, (lt) => {
  const s = eo(lt / 0.9);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(CX, 820, 0, CX, 820, 560); g.addColorStop(0, ca(0.35 * s)); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
  htext('THE PHONE', 800, 124, { alpha: s, track: lerp(30, 6, s), glow: 70, scale: 1 + lt * 0.008 });
  ctx.save(); ctx.fillStyle = ca(0.9); ctx.shadowColor = ca(1); ctx.shadowBlur = 20; const w = 560 * eo((lt - 0.3) / 0.8); ctx.fillRect(CX - w / 2, 905, w, 4); ctx.restore();
  mono('150 YEARS OF CONNECTION', 980, 36, eo((lt - 0.6) / 0.6), null, 8);
  ptext('The whole world,\nin the palm of your hand.', 1130, 50, eo((lt - 1.2) / 0.6), { weight: 700 });
  if (lt > 4) {
    const k = lt - 4;
    ctx.save(); ctx.translate(CX, 1450); ctx.scale(0.35, 0.35); ctx.globalAlpha = eo(k / 0.3); ICON.bell(k * 1.0 + 0.0); ctx.restore(); ctx.globalAlpha = 1;
    mono('WHO WILL YOU CALL NEXT?', 1620, 34, eo((k - 0.2) / 0.4), '#ffffff', 8);
  }
  if (lt > 5.3) { ctx.fillStyle = `rgba(0,0,0,${clamp((lt - 5.3) / 0.65)})`; ctx.fillRect(0, 0, W, H); }
}, '2026');

