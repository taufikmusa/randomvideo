/* scenes.js — "5 SEBAB JUAL EMAS KE PUBLIC GOLD" (copywriting mode, segmentation post, SLOW PACING).
 * Slow mode: Act 2 = 5 x 2 bars, Act 3 = 6 x 1 bar (recap 5 sebab + komen), 3 word slams, no 8-beat recap.
 * Grade: merah (terperangkap) -> teal (01 semua jenama) -> hijau (02 tunai) -> ungu (03 tanpa resit)
 *        -> bara (04 kilang) -> emas (05 dua hala). Act 3 recap kitar semula warna setiap sebab. */

// ------------------------------------------------------------ colour grade
const C_RED = [[255, 95, 95], [255, 160, 90]];
const C_TEAL = [[80, 225, 230], [70, 140, 255]];
const C_GREEN = [[110, 240, 150], [60, 200, 200]];
const C_VIOLET = [[190, 140, 255], [255, 110, 220]];
const C_EMBER = [[255, 130, 60], [255, 210, 90]];
const C_GOLD = [[255, 204, 96], [255, 140, 60]];
const C_WHITE = [[235, 238, 255], [170, 180, 255]];
const K = (t, c) => [t, c[0], c[1]];
const KEYS = [
  K(0, C_RED), K(15, C_RED), K(16.5, C_TEAL), K(23, C_TEAL), K(24.5, C_GREEN), K(31, C_GREEN),
  K(32.5, C_VIOLET), K(39, C_VIOLET), K(40.5, C_EMBER), K(47, C_EMBER), K(48.5, C_GOLD), K(51, C_GOLD),
  K(52.5, C_WHITE), K(55, C_WHITE),
  // act 3 recap: one colour per sebab
  K(56, C_TEAL), K(57.8, C_TEAL), K(58.1, C_GREEN), K(59.8, C_GREEN), K(60.1, C_VIOLET), K(61.8, C_VIOLET),
  K(62.1, C_EMBER), K(63.8, C_EMBER), K(64.1, C_GOLD), K(90, C_GOLD),
];

// ------------------------------------------------------------ config
const CFG = {
  hud: null,
  glitchFromBar: null,
  watermark: { text: '@taufik.pg', y: 1700, alpha: 0.6, fromBar: 0.5, toBar: FINALE },
};
useImage('taufik', 'taufik.png');

// ------------------------------------------------------------ shared bits
const RED = '#ff5a5a', GREEN = '#6ef096';
function label(txt, x, y, size = 32, color = null, a = 1, align = 'center') {
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = color || '#fff'; ctx.shadowColor = color || ca(1); ctx.shadowBlur = 16;
  ctx.font = `700 ${size}px Mono`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y); ctx.restore();
}
function big(txt, x, y, size, color = '#fff', align = 'center') {
  ctx.save(); ctx.fillStyle = color; ctx.shadowColor = ca(1); ctx.shadowBlur = 24; ctx.font = `900 ${size}px Orb`;
  ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y); ctx.restore();
}
function goldbar(x, y, s = 1, glow = 40, txt = '999.9') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const g = ctx.createLinearGradient(0, -60, 0, 60); g.addColorStop(0, '#fff3c4'); g.addColorStop(0.45, '#ffcc60'); g.addColorStop(1, '#e0892e');
  ctx.fillStyle = g; ctx.shadowColor = 'rgba(255,190,80,1)'; ctx.shadowBlur = glow;
  ctx.beginPath(); ctx.moveTo(-150, 60); ctx.lineTo(-110, -60); ctx.lineTo(110, -60); ctx.lineTo(150, 60); ctx.closePath(); ctx.fill();
  ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(80,40,0,0.55)'; ctx.font = '900 34px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 5);
  ctx.restore();
}
function goldcoin(x, y, r = 60) {
  ctx.save(); const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 4, x, y, r); g.addColorStop(0, '#fff3c4'); g.addColorStop(1, '#e0892e');
  ctx.fillStyle = g; ctx.shadowColor = 'rgba(255,190,80,1)'; ctx.shadowBlur = 26; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(90,50,0,0.5)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r * 0.78, 0, TAU); ctx.stroke(); ctx.restore();
}
function goldring(x, y, r = 50) {
  ctx.save(); ctx.strokeStyle = '#ffcc60'; ctx.shadowColor = 'rgba(255,190,80,1)'; ctx.shadowBlur = 26; ctx.lineWidth = 16;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(x, y - r - 34); ctx.lineTo(x + 18, y - r - 14); ctx.lineTo(x, y - r + 4); ctx.lineTo(x - 18, y - r - 14); ctx.closePath(); ctx.fill(); ctx.restore();
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
function tick(x, y, r = 40, a = 1, col = GREEN) {
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 22; ctx.lineWidth = 11; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x - r * 0.3, y + r * 0.7); ctx.lineTo(x + r, y - r * 0.7); ctx.stroke(); ctx.restore();
}
function lock(x, y, s = 1, col = null) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = col || '#fff'; ctx.lineWidth = 12; ctx.shadowColor = col || ca(1); ctx.shadowBlur = 24; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -50, 50, Math.PI, 0); ctx.lineTo(50, 0); ctx.moveTo(-50, -50); ctx.lineTo(-50, 0); ctx.stroke();
  ctx.fillStyle = col || '#fff'; rr(-75, 0, 150, 110, 16); ctx.fill();
  ctx.fillStyle = '#070a12'; ctx.shadowBlur = 0; ctx.beginPath(); ctx.arc(0, 45, 14, 0, TAU); ctx.fill(); ctx.fillRect(-5, 50, 10, 30);
  ctx.restore();
}
function bubble(x, y, w, h, txt, size = 40, tailLeft = true) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = '#070a12'; rr(-w / 2, -h / 2, w, h, 36); ctx.fill(); neon(6); ctx.stroke();
  ctx.beginPath(); const tx = tailLeft ? -w / 2 + 70 : w / 2 - 70; ctx.moveTo(tx - 24, h / 2 - 2); ctx.lineTo(tx - (tailLeft ? 34 : -34), h / 2 + 50); ctx.lineTo(tx + 24, h / 2 - 2); neon(6); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 12; ctx.font = `700 ${size}px Grot`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  String(txt).split('\n').forEach((l, i, a) => ctx.fillText(l, 0, (i - (a.length - 1) / 2) * size * 1.25));
  ctx.restore();
}
function phone(x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); slab(230, 420, 34); ctx.restore();
}

// ------------------------------------------------------------ icons (centred at 0,0, radius ~300)
const ICON = {
  hook(lt) {
    const p1 = eback(lt * 2.2), p2 = eback(lt * 2.2 - 1.4);
    if (p1 > 0) { ctx.save(); ctx.translate(-40, -150); ctx.scale(p1, p1); bubble(0, 0, 680, 150, '"Emas tetap emas,\nkedai mana pun sama je kan?"', 36, true); ctx.restore(); }
    if (p2 > 0) { ctx.save(); ctx.translate(40, 110); ctx.scale(p2, p2); bubble(0, 0, 680, 150, '"Nak jual nanti, mesti kedai\nasal ambil balik tanpa soal?"', 36, false); ctx.restore(); }
  },
  trapped(lt) {
    goldbar(0, 60, 1.3);
    const p = eo(lt / 0.9);
    ctx.save(); neon(8, 20); rr(-300, -240, 600, 460, 20); ctx.stroke();
    ctx.beginPath(); ctx.rect(-300, -240, 600, 460); ctx.clip();
    for (let i = 0; i < 9; i++) { const x = -260 + i * 65; ctx.beginPath(); ctx.moveTo(x, -240); ctx.lineTo(x, lerp(-240, 220, p)); ctx.stroke(); }
    ctx.restore();
    const q = eback(lt * 1.6 - 1.0); if (q > 0) { ctx.save(); ctx.translate(0, 230); ctx.scale(q, q); lock(0, 0, 0.75, RED); ctx.restore(); }
  },
  rules(lt) {
    ctx.fillStyle = '#070a12'; rr(-280, -280, 560, 560, 24); ctx.fill(); neon(7); ctx.stroke();
    neon(6, 14); rr(-90, -305, 180, 50, 12); ctx.stroke();
    ['RESIT ASAL WAJIB', 'KAD TAK BOLEH BUKA', 'MESTI TRADE-IN', 'JENAMA KAMI SAHAJA'].forEach((t, i) => {
      const a = eo(lt * 2.5 - i * 0.45); if (a <= 0) return;
      const y = -180 + i * 115;
      ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 16; ctx.font = '900 44px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('!', -220, y); ctx.restore();
      label(t, -180, y, 30, '#fff', a, 'left');
    });
  },
  brands(lt) {
    const items = [[-260, -200, 'bar'], [260, -200, 'coin'], [-260, 200, 'ring'], [260, 200, 'wafer']];
    const p = eo(lt / 1.6);
    items.forEach(([x, y, k], i) => {
      const xx = lerp(x, x * 0.5, p), yy = lerp(y, y * 0.5, p);
      if (k === 'bar') goldbar(xx, yy, 0.5, 20, 'A');
      if (k === 'coin') goldcoin(xx, yy, 56);
      if (k === 'ring') goldring(xx, yy + 10, 44);
      if (k === 'wafer') { ctx.save(); ctx.fillStyle = '#ffcc60'; ctx.shadowColor = 'rgba(255,190,80,1)'; ctx.shadowBlur = 24; rr(xx - 50, yy - 70, 100, 140, 8); ctx.fill(); ctx.fillStyle = 'rgba(80,40,0,0.55)'; ctx.font = '900 30px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowBlur = 0; ctx.fillText('B', xx, yy); ctx.restore(); }
    });
    const q = eback(lt * 1.5 - 1.6);
    if (q > 0) { ctx.save(); ctx.scale(q, q); ctx.fillStyle = '#070a12'; neonA(7, 30); ctx.beginPath(); ctx.arc(0, 0, 95, 0, TAU); ctx.fill(); ctx.stroke(); tick(0, 0, 44, 1, '#fff'); ctx.restore(); label('TULEN', 0, 140, 30, null, q > 0 ? 1 : 0); }
  },
  exchange(lt) {
    goldbar(0, 0, 1.0);
    ['$', '€', '¥', '£', 'RM', '₩'].forEach((s, i) => {
      const a = lt * 0.6 + i / 6 * TAU, x = Math.cos(a) * 280, y = Math.sin(a) * 240;
      ctx.save(); ctx.fillStyle = '#070a12'; neon(5, 18); ctx.beginPath(); ctx.arc(x, y, 58, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 16; ctx.font = `900 ${s.length > 1 ? 34 : 50}px Orb`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y + 2); ctx.restore();
    });
  },
  tradein(lt) {
    goldbar(-230, -120, 0.65);
    goldbar(-230, 150, 0.65);
    arrowTo(-110, -120, 120, -120, lt, 'rgba(255,255,255,0.5)');
    goldring(240, -110, 50);
    redX(240, -120, 80, eo(lt * 1.5 - 0.4));
    label('PAKSA TRADE-IN', 240, -10, 24, RED, eo(lt * 1.5 - 0.4));
    const p = eo(lt * 1.2 - 0.9);
    if (p > 0) { arrowTo(-110, 150, 120, 150, lt); note(240, 150, 0.6, p); tick(240, 260, 30, p); label('TUNAI', 240, 320, 24, GREEN, p); }
  },
  bankcash(lt) {
    goldbar(-250, 0, 0.6);
    arrowTo(-140, 0, 60, 0, lt);
    phone(210, 0, 1);
    ctx.save(); ctx.translate(210, 0);
    label('AKAUN BANK', 0, -150, 22, '#aab6c4');
    const p = eo(lt / 1.6);
    ctx.save(); ctx.globalAlpha = p; ctx.fillStyle = GREEN; ctx.shadowColor = GREEN; ctx.shadowBlur = 24; ctx.font = '900 54px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('+RM', 0, -30); ctx.restore();
    if (lt > 1.2) { tick(0, 80, 34, eo((lt - 1.2) / 0.3)); label('DITERIMA', 0, 150, 24, GREEN, eo((lt - 1.2) / 0.3)); }
    ctx.restore();
  },
  receipt(lt) {
    const f = 1 - 0.8 * eo(lt / 1.8);
    ctx.save(); ctx.rotate(-0.06); ctx.globalAlpha = f;
    ctx.fillStyle = '#e9e4d8'; ctx.beginPath(); ctx.moveTo(-170, -260);
    ctx.lineTo(170, -260); for (let x = 170; x >= -170; x -= 34) ctx.lineTo(x - 17, 260 + ((x / 34) % 2 ? 14 : 0));
    ctx.lineTo(-170, 260); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#3a3428'; ctx.font = '700 30px Mono'; ctx.textAlign = 'center'; ctx.fillText('RESIT', 0, -200);
    for (let i = 0; i < 7; i++) { ctx.fillRect(-130, -140 + i * 50, 140 + (i * 37 % 100), 12); }
    ctx.restore();
    big('?', 210, -200, 110);
  },
  scanner(lt) {
    goldbar(0, 40, 1.4);
    const y = 40 + Math.sin(lt * 2.4) * 110;
    ctx.save(); ctx.fillStyle = ca(0.18); ctx.fillRect(-260, y - 40, 520, 80);
    ctx.strokeStyle = ca(1); ctx.shadowColor = ca(1); ctx.shadowBlur = 30; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-280, y); ctx.lineTo(280, y); ctx.stroke(); ctx.restore();
    neon(6, 16); [[-280, -160], [280, -160], [-280, 240], [280, 240]].forEach(([x, yy]) => { const sx = Math.sign(x), sy = Math.sign(yy - 40); ctx.beginPath(); ctx.moveTo(x, yy - sy * 50); ctx.lineTo(x, yy); ctx.lineTo(x - sx * 50, yy); ctx.stroke(); });
    const ok = eo((lt - 1.1) / 0.4);
    if (ok > 0) { ctx.save(); ctx.globalAlpha = ok; ctx.fillStyle = '#070a12'; rr(-190, -280, 380, 80, 14); ctx.fill(); ctx.strokeStyle = GREEN; ctx.lineWidth = 4; ctx.shadowColor = GREEN; ctx.shadowBlur = 18; ctx.stroke(); ctx.restore(); label('TULEN ✓', 0, -240, 36, GREEN, ok); }
  },
  damaged(lt) {
    // opened card
    ctx.save(); ctx.translate(-190, 0); ctx.rotate(-0.12);
    ctx.fillStyle = '#070a12'; rr(-120, -190, 240, 380, 18); ctx.fill(); neon(6, 16); ctx.stroke();
    ctx.save(); ctx.translate(-120, -190); ctx.rotate(-0.5 * eo(lt / 1.2)); neon(5, 12, 0.8); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(240, 0); ctx.lineTo(240, 120); ctx.lineTo(0, 120); ctx.stroke(); ctx.restore();
    neon(4, 0, 0.4); rr(-70, -40, 140, 190, 10); ctx.stroke();
    ctx.restore();
    // scratched, dented, cracked bar
    ctx.save(); ctx.translate(150, 20); ctx.rotate(0.15);
    goldbar(0, 0, 1);
    ctx.strokeStyle = 'rgba(80,40,0,0.7)'; ctx.lineWidth = 3;
    [[-90, -30, -20, 20], [-60, -40, 10, 10], [20, 30, 90, -10]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); });
    ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(60, -60); ctx.lineTo(48, -30); ctx.lineTo(70, -5); ctx.lineTo(56, 25); ctx.lineTo(80, 60); ctx.stroke();
    ctx.fillStyle = '#03050a'; ctx.beginPath(); ctx.arc(-40, 62, 26, Math.PI, 0); ctx.fill();
    ctx.restore();
    const q = eback(lt * 1.5 - 1.3); if (q > 0) { ctx.save(); ctx.translate(150, -210); ctx.scale(q, q); tick(0, 0, 50); ctx.restore(); label('TETAP LAKU', 150, -110, 26, GREEN, clamp(q)); }
  },
  refinery(lt) {
    // crucible tilting, molten stream into mould
    const tilt = eo(lt / 1.2) * 0.7;
    ctx.save(); ctx.translate(-120, -150); ctx.rotate(tilt);
    ctx.fillStyle = '#070a12'; ctx.beginPath(); ctx.moveTo(-110, -90); ctx.lineTo(110, -90); ctx.lineTo(80, 90); ctx.lineTo(-80, 90); ctx.closePath(); ctx.fill(); neon(8); ctx.stroke();
    ctx.save(); ctx.clip(); const g = ctx.createLinearGradient(0, -60, 0, 90); g.addColorStop(0, '#fff3c4'); g.addColorStop(1, '#ff8a30'); ctx.fillStyle = g; ctx.shadowColor = '#ffb050'; ctx.shadowBlur = 30; ctx.fillRect(-120, -50, 240, 150); ctx.restore();
    ctx.restore();
    if (tilt > 0.4) {
      ctx.save(); ctx.strokeStyle = '#ffd27a'; ctx.shadowColor = '#ff9a40'; ctx.shadowBlur = 30; ctx.lineWidth = 16 + Math.sin(lt * 20) * 3; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-10, -170); ctx.quadraticCurveTo(40, -100, 50, 80); ctx.stroke(); ctx.restore();
    }
    // mould with bar forming
    ctx.save(); ctx.translate(60, 170); neon(8); ctx.beginPath(); ctx.moveTo(-190, -70); ctx.lineTo(-170, 70); ctx.lineTo(170, 70); ctx.lineTo(190, -70); ctx.stroke(); ctx.restore();
    const f = eo((lt - 0.9) / 1.2); if (f > 0) { ctx.save(); ctx.globalAlpha = f; goldbar(60, 175, 0.95, 50); ctx.restore(); }
    // flames
    for (let i = 0; i < 5; i++) { const x = -200 + i * 40, h = 40 + 20 * Math.sin(lt * 9 + i * 2); ctx.save(); ctx.fillStyle = cb(0.8); ctx.shadowColor = cb(1); ctx.shadowBlur = 20; ctx.beginPath(); ctx.moveTo(x - 14, 20); ctx.quadraticCurveTo(x, 20 - h * 2, x + 14, 20); ctx.fill(); ctx.restore(); }
  },
  highway(lt) {
    neon(6, 16, 0.9); ctx.beginPath(); ctx.moveTo(-380, -170); ctx.lineTo(380, -170); ctx.moveTo(-380, 170); ctx.lineTo(380, 170); ctx.stroke();
    ctx.save(); ctx.strokeStyle = ca(0.8); ctx.lineWidth = 6; ctx.setLineDash([40, 30]); ctx.lineDashOffset = -lt * 120; ctx.beginPath(); ctx.moveTo(-380, 0); ctx.lineTo(380, 0); ctx.stroke(); ctx.restore();
    for (let k = 0; k < 3; k++) {
      const q = (lt * 0.5 + k / 3) % 1;
      goldbar(lerp(-340, 340, q), -85, 0.35, 16);
      note(lerp(340, -340, q), 85, 0.35);
    }
    label('BELI  →', -250, -230, 30, '#ffcc60');
    label('←  JUAL', 250, 230, 30, '#ffffff');
    label('GAP · DARI RM100', 0, 290, 26, null);
  },
  // act 3 + drop
  comment(lt) { const p = eback(lt * 2); ctx.save(); ctx.scale(p, p); bubble(0, -20, 640, 170, 'Resit hilang?\nKad dah rosak?', 44); ctx.restore(); },
  tag(lt) {
    ctx.save(); ctx.rotate(Math.sin(lt * 2.4) * 0.15 - 0.1);
    neon(4, 10); ctx.beginPath(); ctx.moveTo(0, -300); ctx.lineTo(-60, -200); ctx.stroke();
    ctx.translate(-60, -200); ctx.rotate(0.35);
    ctx.fillStyle = '#070a12'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(150, 70); ctx.lineTo(150, 320); ctx.lineTo(-150, 320); ctx.lineTo(-150, 70); ctx.closePath(); ctx.fill(); neon(7); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 50, 16, 0, TAU); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 20; ctx.font = '900 54px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('MURAH', 0, 190);
    ctx.restore();
    big('?', 250, -150, 110);
  },
  buyback(lt) {
    goldbar(0, 0, 1.3, 60);
    ctx.save(); ctx.rotate(lt * 1.2); neonA(8, 30);
    for (let k = 0; k < 2; k++) { ctx.save(); ctx.rotate(k * Math.PI); ctx.beginPath(); ctx.arc(0, 0, 280, 0.25, Math.PI - 0.25); ctx.stroke();
      const a = Math.PI - 0.25, x = Math.cos(a) * 280, y = Math.sin(a) * 280; ctx.fillStyle = ca(1); ctx.beginPath(); ctx.moveTo(x - 26, y - 6); ctx.lineTo(x + 6, y - 36); ctx.lineTo(x + 18, y + 14); ctx.closePath(); ctx.fill(); ctx.restore(); }
    ctx.restore();
  },
};

// ------------------------------------------------------------ scenes (SLOW pacing)
// COLD OPEN — hook (2 andaian)
sc(0, 2, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ctx.globalAlpha = eo(lt / 0.4); ICON.hook(lt); ctx.restore(); ctx.globalAlpha = 1;
  mono('BETUL KE?', 380, 40, eo(lt / 0.4), null, 18);
  ptext('Ramai sangka semua kedai emas\nada polisi yang adil & telus', 1400, 42, eo((lt - 2.4) / 0.5), { weight: 700 });
}, '');
// TITLE
sc(2, 4, (lt) => {
  const s = eo(lt / 1.0);
  mono('SEBAB #2 RAMAI PERNAH TERKENA', 560, 30, eo(lt / 0.5), null, 6);
  htext('5 SEBAB', 720, 150 - 20 * (1 - s), { alpha: s, track: lerp(30, 8, s), glow: 50 });
  htext('RAMAI BERALIH\nJUAL EMAS KE\nPUBLIC GOLD', 960, 70, { font: 'Grot', weight: 700, alpha: eo((lt - 0.4) / 0.6), glow: 30, lh: 1.15 });
  ctx.save(); ctx.fillStyle = ca(0.9); ctx.shadowColor = ca(1); ctx.shadowBlur = 20; const w = 520 * eo((lt - 0.6) / 0.8); ctx.fillRect(CX - w / 2, 1120, w, 4); ctx.restore();
  ptext('Sebelum anda pula "terperangkap"\nbila nak cairkan aset sendiri', 1250, 42, eo((lt - 1.2) / 0.7));
}, '');

// ACT 1 — masalah + sebab 1 & 2 (2 bar = 4s)
sc(4, 6, era('TERPERANGKAP', 'trapped', 'NAK JUAL, TAK BOLEH', 'Emas sendiri, tapi susah\nnak dicairkan', { place: 'HAKIKATNYA', yearSize: 92, subOff: 125 }), '');
sc(6, 8, era('SYARAT', 'rules', 'SYARAT CEREWET', 'Macam-macam alasan untuk\ntolak atau potong harga', { place: 'KEDAI LUAR', yearSize: 140, subOff: 125 }), '');
sc(8, 10, era('01', 'brands', 'SEMUA JENAMA', 'Emas kedai atau jenama lain —\nasalkan disahkan tulen', { place: 'SEBAB PERTAMA', subOff: 125 }), '');
sc(10, 12, era('01', 'exchange', 'MACAM PENGURUP WANG', 'Terima pelbagai "mata wang",\nnilai ikut harga semasa', { place: 'KEDAI ASAL DAH TUTUP? TAK APA', titleSize: 64, subOff: 125 }), '');
sc(12, 14, era('02', 'tradein', 'TANPA PAKSA TRADE-IN', 'Perlu duit kecemasan, tapi\ndipaksa tukar barang kemas baru?', { place: 'SEBAB #2 RAMAI TERKENA', titleSize: 64, subOff: 125 }), '');
sc(14, 16, era('02', 'bankcash', 'TERUS KE AKAUN BANK', 'Jual emas, terima wang —\ntanpa syarat tersembunyi', { place: 'BAYARAN TUNAI', titleSize: 66, subOff: 125 }), '');

// ACT 2 — sebab 3, 4, 5 (slow: 2 bar)
sc(16, 18, era('03', 'receipt', 'RESIT HILANG?', 'Kertas resit lama pudar\natau hilang ditelan zaman', { place: 'SEBAB KETIGA', subOff: 125 }), '');
sc(18, 20, era('03', 'scanner', 'UJI SECARA SAINTIFIK', 'Ketulenan diuji dengan alat moden —\nbukan bergantung pada kertas resit', { place: 'TANPA RESIT PUN DITERIMA', titleSize: 64, subOff: 125 }), '');
sc(20, 22, era('04', 'damaged', 'CALAR, KEMEK, PATAH', 'Kad dah dibuka pun\ntetap diterima', { place: 'SEBAB KEEMPAT', titleSize: 70, subOff: 125 }), '');
sc(22, 24, era('04', 'refinery', 'KILANG SENDIRI', 'Ada refinery sendiri untuk lebur semula —\nnilai emas pada berat & ketulenan', { place: 'BUKAN PADA SARUNG PLASTIK', subOff: 125 }), '');
sc(24, 26, era('05', 'highway', 'LEBUH RAYA DUA HALA', 'Senang beli, senang jual —\npatuh syariah', { place: 'EKOSISTEM LENGKAP', titleSize: 68, subOff: 125 }), '');

// PIVOT
sc(26, 28, (lt) => {
  ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(CX, IY); ctx.globalAlpha = eo(lt / 1.2); ICON.buyback(lt * 0.5); ctx.restore(); ctx.globalAlpha = 1;
  mono('BILA MULA KUMPUL EMAS', 330, 34, eo((lt - 0.2) / 0.6), null, 8);
  htext('FIKIR HARI\nANDA MENJUAL', 1400, 76, { font: 'Grot', weight: 700, alpha: eo((lt - 1.0) / 0.5), glow: 40, lh: 1.15 });
}, '');

// ACT 3 — ringkasan 5 sebab + komen (1 bar = 2s)
const act3 = [
  ['01', 'brands', 'SEMUA JENAMA', 'Asalkan tulen'],
  ['02', 'tradein', 'TUNAI, BUKAN TRADE-IN', 'Terus ke akaun bank'],
  ['03', 'scanner', 'TANPA RESIT', 'Diuji secara saintifik'],
  ['04', 'damaged', 'APA JUA KEADAAN', 'Calar, kemek, kad terbuka'],
  ['05', 'highway', 'BELI & JUAL', 'Bina semula dari RM100'],
  ['ANDA?', 'comment', 'PERNAH KENA TOLAK?', 'Kongsi di ruangan komen'],
];
act3.forEach(([top, icon, title, sub], i) => {
  sc(28 + i, 29 + i, (lt, d) => {
    const T = lt / d;
    ctx.save(); ctx.translate(CX, IY); const z = lerp(1.2, 0.95, eo(T * 3)); ctx.scale(z, z); ICON[icon](lt + 0.8); ctx.restore();
    htext(top, 320, top.length > 2 ? 120 : 160, { track: 8, scale: lerp(1.1, 1, eo(T * 4)) });
    mono(i < 5 ? 'SEBAB' : 'SOALAN', 440, 32, 1);
    htext(title, 1400, title.length > 16 ? 64 : 78, { font: 'Grot', weight: 700, track: 2, alpha: eo(T * 5), glow: 26 });
    ptext(sub, 1510, 42, eo(T * 5 - 0.3));
  }, '');
});
// word slams (slow: 3 words)
[['TULEN', 34, 34.5], ['TUNAI', 34.5, 35], ['TENANG', 35, BREATH]].forEach(([w, a, b], i) => {
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
  ctx.save(); ctx.translate(CX, IY); ICON.tag(lt); ctx.restore();
  mono('BILA MULA KUMPUL', 330, 36, eo(lt * 3), null, 12);
  htext('JANGAN TERPUKAU\nHARGA MURAH', 1380, 74, { track: 2, glow: 50, lh: 1.15, scale: lerp(1.15, 1, eo(lt * 2)) });
  ptext('Harga beli cuma separuh cerita', 1550, 42, eo(lt * 2 - 0.6));
}, '');
sc(38, 40, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ICON.buyback(lt); ctx.restore();
  mono('PASTIKAN ADA', 330, 36, eo(lt * 3), null, 12);
  htext('JAMINAN\nBELIAN BALIK', 1380, 96, { track: 4, glow: 70, lh: 1.12, scale: lerp(1.4, 1, eo(lt * 2.5)) });
  ptext('Yang tak menyusahkan anda\ndi kemudian hari', 1580, 42, eo(lt * 2 - 0.6));
}, '');
sc(40, 42, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ICON.comment(lt); ctx.restore();
  mono('KONGSI DI KOMEN', 330, 36, eo(lt * 3), null, 12);
  htext('PERNAH ADA\nPENGALAMAN PAHIT?', 1380, 74, { font: 'Grot', weight: 700, glow: 40, alpha: eo(lt * 2 - 0.3), lh: 1.15 });
  ptext('Kedai tolak beli emas anda?', 1550, 42, eo(lt * 2 - 0.9));
}, '');

// FINALE — CTA kecil & premium
sc(42, 45, (lt) => {
  const s = eo(lt / 1.0);
  htext('SENANG BELI\nSENANG JUAL', 640, 62, { alpha: s, track: lerp(24, 6, s), glow: 40, lh: 1.2 });
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
  mono('Tertakluk kepada polisi & ujian ketulenan semasa.', 1640, 20, eo((lt - 2.2) / 0.5) * 0.7, '#aab6c4', 2);
  if (lt > 5.3) { ctx.fillStyle = `rgba(0,0,0,${clamp((lt - 5.3) / 0.65)})`; ctx.fillRect(0, 0, W, H); }
}, '');
