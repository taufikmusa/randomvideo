/* scenes.js — "EMAS 20 TAHUN": 3 sebab emas fizikal (copywriting mode, SLOW PACING).
 * Slow mode: Act 2 = 5 x 2 bars, Act 3 = 6 x 1 bar, 3 word slams, no 8-beat recap — more reading time.
 * Grade: emas (hook) -> merah inflasi -> magenta boros -> biru kawalan -> emas. CTA kecil premium. */

// ------------------------------------------------------------ colour grade
const KEYS = [
  [0, [255, 204, 96], [255, 140, 60]],
  [20, [255, 204, 96], [255, 140, 60]],
  [22, [255, 95, 95], [255, 160, 90]],
  [30, [255, 95, 95], [255, 160, 90]],
  [32, [255, 80, 170], [255, 170, 90]],
  [39, [255, 80, 170], [255, 170, 90]],
  [41, [110, 200, 255], [120, 140, 255]],
  [51, [110, 200, 255], [120, 140, 255]],
  [54, [255, 204, 96], [255, 140, 60]],
  [90, [255, 204, 96], [255, 140, 60]],
];

// ------------------------------------------------------------ config
const CFG = {
  hud: null,
  glitchFromBar: null,                        // slow mode: no glitch, calmer cuts
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
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = a;
  ctx.fillStyle = '#070a12'; rr(-150, -75, 300, 150, 12); ctx.fill(); neon(6, 18); ctx.stroke();
  neon(3, 6, 0.7); ctx.beginPath(); ctx.arc(0, 0, 42, 0, TAU); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.shadowBlur = 0; ctx.font = '900 34px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('RM', 0, 2);
  ctx.restore();
}
function coin(x, y, r = 20) { fillA(1, 14); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 0.65, 0, TAU); ctx.stroke(); }
function lock(x, y, s = 1, col = null) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = col || '#fff'; ctx.lineWidth = 12; ctx.shadowColor = col || ca(1); ctx.shadowBlur = 24; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -50, 50, Math.PI, 0); ctx.lineTo(50, 0); ctx.moveTo(-50, -50); ctx.lineTo(-50, 0); ctx.stroke();
  ctx.fillStyle = col || '#fff'; rr(-75, 0, 150, 110, 16); ctx.fill();
  ctx.fillStyle = '#070a12'; ctx.shadowBlur = 0; ctx.beginPath(); ctx.arc(0, 45, 14, 0, TAU); ctx.fill(); ctx.fillRect(-5, 50, 10, 30);
  ctx.restore();
}
function bank(x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); neon(7);
  ctx.beginPath(); ctx.moveTo(-200, -90); ctx.lineTo(0, -190); ctx.lineTo(200, -90); ctx.closePath(); ctx.stroke();
  for (let i = 0; i < 5; i++) { const cx = -160 + i * 80; ctx.beginPath(); ctx.moveTo(cx, -70); ctx.lineTo(cx, 110); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(-220, 130); ctx.lineTo(220, 130); ctx.stroke();
  ctx.restore();
}
function bubble(x, y, w, h, txt, size = 44, tailLeft = true) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = '#070a12'; rr(-w / 2, -h / 2, w, h, 40); ctx.fill(); neon(7); ctx.stroke();
  ctx.beginPath(); const tx = tailLeft ? -w / 2 + 70 : w / 2 - 70; ctx.moveTo(tx - 30, h / 2 - 2); ctx.lineTo(tx - (tailLeft ? 40 : -40), h / 2 + 60); ctx.lineTo(tx + 30, h / 2 - 2); neon(7); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.shadowColor = ca(1); ctx.shadowBlur = 14; ctx.font = `700 ${size}px Grot`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 0);
  ctx.restore();
}
// 20-year comparison chart (approx. average annual %, 2005–2025, MYR)
const RETURNS = [['EMAS', 11, true], ['ASB', 7, false], ['KWSP', 6, false], ['FD', 3, false]];
function returnsChart(lt, disclaimer = true) {
  RETURNS.forEach(([n, v, gold], i) => {
    const y = -210 + i * 120, p = eo(lt * 1.2 - i * 0.15), w = v * 44 * p;
    label(n, -250, y, 34, gold ? '#ffcc60' : '#dfe9f2', 1, 'right');
    ctx.save();
    if (gold) { const g = ctx.createLinearGradient(-220, 0, -220 + w, 0); g.addColorStop(0, '#e0892e'); g.addColorStop(1, '#fff3c4'); ctx.fillStyle = g; ctx.shadowColor = 'rgba(255,190,80,1)'; ctx.shadowBlur = 30; }
    else { ctx.fillStyle = 'rgba(255,255,255,0.28)'; }
    rr(-220, y - 34, Math.max(4, w), 68, 10); ctx.fill(); ctx.restore();
    label('≈' + Math.round(v * p) + '%', -220 + w + 70, y, 34, '#fff', p);
  });
  if (disclaimer) { label('ANGGARAN PURATA SETAHUN · 2005–2025 · RM', 0, 280, 22, '#aab6c4'); }
}

// ------------------------------------------------------------ icons
const ICON = {
  hookChart(lt) { returnsChart(lt, false); },
  chart20(lt) { returnsChart(lt, true); },
  price(lt) {
    const p = eo(lt / 1.6);
    goldbar(-200, 120, 0.55); goldbar(170, 60, lerp(0.55, 1.3, p));
    label('2005', -200, 230, 32); label('2025', 170, 230, 32);
    label('≈RM1,700', -200, -20, 34, '#dfe9f2'); big('≈RM' + Math.round(lerp(1700, 14700, p)).toLocaleString('en-US'), 170, -130, 48);
    label('SEAUNS · PURATA SETAHUN', 0, 310, 24, '#aab6c4');
  },
  vault(lt) {
    neon(10); ctx.beginPath(); ctx.arc(0, 0, 250, 0, TAU); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, 205, 0, TAU); ctx.stroke();
    ctx.save(); ctx.rotate(eo(lt / 1.5) * Math.PI); ctx.lineWidth = 12;
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -140); ctx.stroke(); ctx.rotate(TAU / 3); }
    ctx.restore(); goldbar(0, 0, 0.5, 30);
    big('1,000+ TAN', 0, 330, 44);
  },
  three(lt) {
    ['01', '02', '03'].forEach((n, i) => { const p = eback(lt * 2 - i * 0.3); if (p <= 0) return; ctx.save(); ctx.translate(-230 + i * 230, 0); ctx.scale(p, p); neon(6); ctx.beginPath(); ctx.arc(0, 0, 95, 0, TAU); ctx.stroke(); big(n, 0, 4, 64); ctx.restore(); });
  },
  inflation(lt) {
    const p = eo(lt / 2);
    note(0, -40, lerp(1.4, 0.6, p));
    ctx.save(); ctx.strokeStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 24; ctx.lineWidth = 7;
    for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + lt * 0.8, r1 = 280, r2 = lerp(280, 150, p); ctx.beginPath(); ctx.moveTo(Math.cos(a) * r1, -40 + Math.sin(a) * r1); ctx.lineTo(Math.cos(a) * r2, -40 + Math.sin(a) * r2); ctx.stroke(); }
    ctx.restore();
    label('KUASA BELI ' + Math.round(lerp(100, 55, p)) + '%', 0, 290, 34, RED);
  },
  rise(lt) {
    neon(4, 0, 0.3); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-320, -200 + i * 100); ctx.lineTo(320, -200 + i * 100); ctx.stroke(); }
    const n = Math.floor(eo(lt / 1.8) * 40); const r = mulberry(9);
    ctx.save(); ctx.strokeStyle = '#ffcc60'; ctx.shadowColor = 'rgba(255,190,80,1)'; ctx.shadowBlur = 26; ctx.lineWidth = 10; ctx.lineJoin = 'round';
    ctx.beginPath(); let ex = 0, ey = 0;
    for (let i = 0; i <= n; i++) { ex = -320 + i * 16; ey = 200 - Math.pow(i / 40, 1.7) * 400 + (r() - 0.5) * 36; i ? ctx.lineTo(ex, ey) : ctx.moveTo(ex, ey); }
    ctx.stroke(); ctx.fillStyle = '#fff3c4'; ctx.beginPath(); ctx.arc(ex, ey, 14, 0, TAU); ctx.fill(); ctx.restore();
    label('2005', -300, 260, 26, '#aab6c4'); label('2025', 300, 260, 26, '#aab6c4');
  },
  leak(lt) {
    ctx.fillStyle = '#070a12'; rr(-240, -200, 480, 300, 40); ctx.fill(); neon(8); ctx.stroke();
    const n = 1500 - Math.floor(eo(lt / 2.5) * 1380);
    big('RM' + n, 0, -60, 64);
    for (let i = 0; i < 5; i++) { const ph = (lt * 0.9 + i / 5) % 1; ctx.save(); ctx.globalAlpha = 1 - ph; coin(-120 + i * 60, 110 + ph * 200, 16 + (i % 2) * 4); ctx.restore(); }
  },
  goldlock(lt) {
    goldbar(0, 90, 1.5);
    const p = eback(lt * 1.5 - 0.3);
    if (p > 0) { ctx.save(); ctx.translate(0, -120); ctx.scale(p, p); lock(0, 0, 1.2); ctx.restore(); }
  },
  hand(lt) {
    ctx.save(); ctx.translate(0, 120); neon(9, 26);
    ctx.beginPath(); ctx.moveTo(-280, 60); ctx.quadraticCurveTo(-200, -40, -80, -30); ctx.lineTo(160, -30); ctx.quadraticCurveTo(210, -30, 200, 10); ctx.quadraticCurveTo(190, 40, 140, 40); ctx.lineTo(20, 40);
    ctx.moveTo(-280, 60); ctx.lineTo(-280, 200); ctx.stroke(); ctx.restore();
    goldbar(0, 10 + Math.sin(lt * 2) * 8, 1.1);
    big('100%', 0, -230, 80);
  },
  nothird(lt) {
    goldbar(160, 60, 1);
    bank(-230, 40, 0.55);
    const p = eo(lt * 1.2);
    ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 6; ctx.setLineDash([14, 12]);
    ctx.beginPath(); ctx.moveTo(-100, 40); ctx.lineTo(lerp(-100, 20, 1), 40); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 24; ctx.lineWidth = 12; ctx.globalAlpha = p;
    ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-10, 80); ctx.moveTo(-10, 0); ctx.lineTo(-70, 80); ctx.stroke(); ctx.restore();
  },
  rome(lt) {
    neon(5, 14, 0.8); ctx.beginPath(); ctx.arc(0, 0, 280, 0, TAU); ctx.stroke();
    ctx.globalAlpha = 0.5; for (let i = -2; i <= 2; i++) { const y = i * 95; const r = Math.sqrt(280 * 280 - y * y); ctx.beginPath(); ctx.ellipse(0, y, r, r * 0.12, 0, 0, TAU); ctx.stroke(); }
    for (let i = 0; i < 5; i++) { const ph = (lt * 0.4 + i / 5) % 1; ctx.beginPath(); ctx.ellipse(0, 0, Math.abs(Math.cos(ph * Math.PI)) * 280, 280, 0, 0, TAU); ctx.stroke(); }
    ctx.globalAlpha = 1;
    const sx = Math.max(0.08, Math.abs(Math.cos(lt * 1.5)));
    ctx.save(); ctx.scale(sx, 1); const g = ctx.createRadialGradient(0, -20, 10, 0, 0, 130); g.addColorStop(0, '#fff3c4'); g.addColorStop(1, '#e0892e');
    ctx.fillStyle = g; ctx.shadowColor = 'rgba(255,190,80,1)'; ctx.shadowBlur = 40; ctx.beginPath(); ctx.arc(0, 0, 120, 0, TAU); ctx.fill();
    ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(90,50,0,0.6)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, 100, 0, TAU); ctx.stroke();
    ctx.fillStyle = 'rgba(90,50,0,0.7)'; ctx.font = '900 40px Orb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('AV', 0, 4); ctx.restore();
  },
  comment(lt) { const p = eback(lt * 2); ctx.save(); ctx.scale(p, p); bubble(0, -40, 600, 170, 'Aset saya lebih banyak...', 44); ctx.restore(); },
  paper(lt) { note(0, 0, lerp(1.6, 1.1, eo(lt / 2)), lerp(1, 0.55, eo(lt / 2))); big('?', 230, -170, 90); },
  goldq(lt) { goldbar(0, 0, 1.5); big('?', 250, -170, 90); },
  ab(lt) {
    const p = eback(lt * 2); ctx.save(); ctx.scale(p, p);
    ctx.save(); ctx.translate(-190, 0); note(0, 0, 0.9); label('A', 0, -140, 56); ctx.restore();
    ctx.save(); ctx.translate(190, 0); goldbar(0, 0, 0.9); label('B', 0, -140, 56); ctx.restore(); ctx.restore();
  },
  nofast(lt) {
    ctx.save(); ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.shadowColor = ca(1); ctx.shadowBlur = 20;
    ctx.beginPath(); ctx.moveTo(40, -270); ctx.lineTo(-120, 30); ctx.lineTo(0, 30); ctx.lineTo(-60, 270); ctx.lineTo(140, -40); ctx.lineTo(20, -40); ctx.lineTo(90, -270); ctx.closePath(); ctx.fill(); ctx.restore();
    const p = eback(lt * 2 - 0.3);
    if (p > 0) { ctx.save(); ctx.scale(p, p); ctx.strokeStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 30; ctx.lineWidth = 20; ctx.beginPath(); ctx.arc(0, 0, 280, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-198, -198); ctx.lineTo(198, 198); ctx.stroke(); ctx.restore(); }
  },
  shieldhands(lt) {
    ctx.save(); neonA(9, 30);
    ctx.beginPath(); ctx.moveTo(0, -270); ctx.quadraticCurveTo(210, -240, 240, -180); ctx.quadraticCurveTo(240, 120, 0, 280); ctx.quadraticCurveTo(-240, 120, -240, -180); ctx.quadraticCurveTo(-210, -240, 0, -270); ctx.closePath(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(0, -30); ctx.fillStyle = 'rgba(160,220,255,0.95)'; ctx.shadowColor = 'rgba(140,200,255,1)'; ctx.shadowBlur = 26;
    const d = Math.sin(lt * 3) * 6; ctx.beginPath(); ctx.moveTo(0, -70 + d); ctx.quadraticCurveTo(60, 20, 0, 60); ctx.quadraticCurveTo(-60, 20, 0, -70 + d); ctx.fill(); ctx.restore();
    goldbar(0, 150, 0.7, 30);
  },
};

// ------------------------------------------------------------ scenes (SLOW pacing)
// COLD OPEN
sc(0, 2, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ctx.globalAlpha = eo(lt / 0.5); ctx.scale(0.9, 0.9); ICON.hookChart(lt * 0.9); ctx.restore(); ctx.globalAlpha = 1;
  mono('TAHU TAK?', 380, 40, eo(lt / 0.4), null, 18);
  htext('20 TAHUN LEPAS', 1330, 70, { font: 'Grot', weight: 700, alpha: eo((lt - 0.7) / 0.5), glow: 24 });
  ptext('emas mengatasi ASB, KWSP\n& simpanan tetap', 1470, 42, eo((lt - 1.2) / 0.5));
}, '2025');
// TITLE
sc(2, 4, (lt) => {
  const s = eo(lt / 1.0);
  mono('2005 → 2025', 640, 34, eo(lt / 0.5), null, 10);
  htext('3 SEBAB\nEMAS FIZIKAL', 820, 100 - 14 * (1 - s), { alpha: s, track: lerp(30, 6, s), glow: 50, lh: 1.14 });
  ctx.save(); ctx.fillStyle = ca(0.9); ctx.shadowColor = ca(1); ctx.shadowBlur = 20; const w = 520 * eo((lt - 0.4) / 0.8); ctx.fillRect(CX - w / 2, 1000, w, 4); ctx.restore();
  ptext('yang ramai orang\nterlepas pandang', 1130, 48, eo((lt - 0.9) / 0.7), { weight: 700 });
}, '2025');

// ACT 1 — bukti (2 bar = 4s)
sc(4, 6, era('20 TAHUN', 'chart20', 'PURATA SETAHUN', 'Emas dalam ringgit berbanding\nASB, KWSP dan simpanan tetap', { place: '2005 → 2025', yearSize: 120, subOff: 125 }), '2025');
sc(6, 8, era('×8.7', 'price', 'HARGA SEAUNS', 'Purata harga emas tahun 2005\nberbanding tahun 2025', { place: 'DALAM RINGGIT', yearSize: 160, subOff: 125 }), '2025');
sc(8, 10, era('SENYAP', 'vault', 'BANK PUSAT BORONG', 'Lebih 1,000 tan emas setahun\nsejak 2022', { place: 'PEMAIN BESAR DUNIA', yearSize: 140, titleSize: 70, subOff: 125 }), '2025');
sc(10, 12, era('SEBAB APA?', 'three', '3 SEBAB UTAMA', 'Kenapa emas fizikal\nlayak dalam simpanan anda', { place: 'JOM KUPAS', yearSize: 110, subOff: 125 }), '2025');
sc(12, 14, era('01', 'inflation', 'INFLASI SENYAP', 'Duit simpanan bank dihakis\ntanpa kita sedar', { place: 'SEBAB PERTAMA', subOff: 125 }), '2025');
sc(14, 16, era('10%+', 'rise', 'SETAHUN', 'Purata kenaikan harga emas\n(dalam RM) sepanjang 20 tahun', { place: 'SEBAB PERTAMA', yearSize: 160, subOff: 125 }), '2025');

// ACT 2 — sebab 2 & 3 (slow: 2 bar setiap satu)
sc(16, 18, era('02', 'leak', 'DUIT BOCOR', 'Nampak baki dalam bank,\npantang ada lebih — belanja', { place: 'SEBAB KEDUA', subOff: 125 }), '2025');
sc(18, 20, era('02', 'goldlock', 'NAFSU TERKUNCI', 'Pegang emas fizikal —\nsayang nak jual', { place: 'UBAT PALING MUJARAB', subOff: 125 }), '2025');
sc(20, 22, era('03', 'hand', 'KAWALAN 100%', 'Kekayaan di tangan anda sendiri', { place: 'SEBAB PALING MAHAL' }), '2025');
sc(22, 24, era('03', 'nothird', 'TIADA RISIKO\nPIHAK KETIGA', 'Tak bergantung pada sistem bank\natau jaminan mana-mana pihak', { place: 'SEBAB PALING MAHAL', subOff: 175 }), '2025');
sc(24, 26, era('ROM → KINI', 'rome', 'LAKU SEDUNIA', 'Dari zaman empayar Rom\nsampai hari ini', { place: 'NILAI SEJAGAT', yearSize: 110, subOff: 125 }), '2025');

// PIVOT
sc(26, 28, (lt) => {
  ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(CX, IY); ctx.globalAlpha = eo(lt / 1.2); ICON.inflation(lt * 0.6); ctx.restore(); ctx.globalAlpha = 1;
  mono('SEBELUM TERLAMBAT', 330, 36, eo((lt - 0.2) / 0.6), null, 10);
  htext('SEBELUM NILAI TUNAI\nMAKIN MENGECUT...', 1420, 66, { font: 'Grot', weight: 700, alpha: eo((lt - 1.0) / 0.5), glow: 40 });
}, '2025');

// ACT 3 — soalan komen + mesej (1 bar = 2s)
const act3 = [
  ['SOALAN', 'comment', 'ASET ANDA SEKARANG?', 'Jujur dari hati', 'DROP DI KOMEN'],
  ['A', 'paper', 'DUIT KERTAS?', 'Nilai makin mengecut', 'PILIHAN'],
  ['B', 'goldq', 'ATAU EMAS?', 'Nilai terpelihara', 'PILIHAN'],
  ['KOMEN', 'ab', 'A ATAU B?', 'Tulis di ruangan komen', 'SEKARANG'],
  ['BUKAN', 'nofast', 'KAYA SEKELIP MATA', 'Emas bukan skim cepat kaya', 'INGAT'],
  ['TAPI', 'shieldhands', 'LINDUNGI TITIK PELUH', 'Hasil kerja keras anda', 'TUJUAN SEBENAR'],
];
act3.forEach(([top, icon, title, sub, lab], i) => {
  sc(28 + i, 29 + i, (lt, d) => {
    const T = lt / d;
    ctx.save(); ctx.translate(CX, IY); const z = lerp(1.2, 0.95, eo(T * 3)); ctx.scale(z, z); ICON[icon](lt + 0.3); ctx.restore();
    htext(top, 320, top.length > 4 ? 120 : 160, { track: 8, scale: lerp(1.1, 1, eo(T * 4)) });
    mono(lab, 440, 32, 1);
    htext(title, 1400, title.length > 16 ? 64 : 78, { font: 'Grot', weight: 700, track: 2, alpha: eo(T * 5), glow: 26 });
    ptext(sub, 1510, 42, eo(T * 5 - 0.3));
  }, '2025');
});
// word slams (slow: 3 words)
[['LINDUNG', 34, 34.5], ['KAWAL', 34.5, 35], ['SIMPAN', 35, BREATH]].forEach(([w, a, b], i) => {
  sc(a, b, (lt, d) => {
    const T = lt / d;
    htext(w, 960, w.length > 6 ? 140 : 170, { track: 10, scale: lerp(1.4, 1, eo(T * 3)) + T * 0.04, glow: 60 });
    mono(String(i + 1).padStart(2, '0') + ' / 03', 1130, 34, 0.9, null, 8);
  }, '2025');
});
sc(BREATH, DROP, (lt, d) => {
  ctx.fillStyle = 'rgba(0,0,0,0.75)'; ctx.fillRect(0, 0, W, H);
  const r = 4 + 36 * (lt / d) ** 2; fillA(1, 80); ctx.beginPath(); ctx.arc(CX, 960, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
}, '2025');

// DROP (slow: 3 x 2 bar)
sc(36, 38, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ICON.shieldhands(lt); ctx.restore();
  mono('SEBAB EMAS', 330, 36, eo(lt * 3), null, 12);
  htext('LINDUNGI\nTITIK PELUH ANDA', 1360, 80, { track: 2, glow: 50, lh: 1.15, scale: lerp(1.15, 1, eo(lt * 2)) });
}, '2025');
sc(38, 40, (lt) => {
  ctx.save(); ctx.translate(CX, IY - 40); goldbar(0, 0, 1.7 + 0.04 * beatPulse(curT), 80); ctx.restore();
  htext('SELAMANYA!', 1330, 108, { track: 8, glow: 80, scale: lerp(1.5, 1, eo(lt * 2.5)) });
  ptext('Dari empayar Rom hingga hari ini', 1500, 42, eo(lt * 2 - 0.6));
}, '2025');
sc(40, 42, (lt) => {
  ctx.save(); ctx.translate(CX, IY); ctx.scale(0.95, 0.95); ICON.chart20(lt); ctx.restore();
  mono('ANGKA 20 TAHUN', 330, 36, eo(lt * 3), null, 12);
  htext('ANDA PILIH\nYANG MANA?', 1400, 80, { font: 'Grot', weight: 700, glow: 40, alpha: eo(lt * 2 - 0.5), lh: 1.15 });
}, '2025');

// FINALE — CTA kecil & premium
sc(42, 45, (lt) => {
  const s = eo(lt / 1.0);
  htext('LINDUNGI\nTITIK PELUH ANDA', 640, 62, { alpha: s, track: lerp(24, 6, s), glow: 40, lh: 1.2 });
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
  mono('Prestasi lalu bukan jaminan pulangan masa depan.', 1640, 20, eo((lt - 2.2) / 0.5) * 0.7, '#aab6c4', 2);
  if (lt > 5.3) { ctx.fillStyle = `rgba(0,0,0,${clamp((lt - 5.3) / 0.65)})`; ctx.fillRect(0, 0, W, H); }
}, '2025');
