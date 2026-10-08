// Carousel "RM100 makin tak cukup" — inflasi vs emas (gaya editorial)
var N = 6;
var ASSETS = { point: 'tunjuk-kamera.png', thumbs: 'thumbs-up.png', kg: 'jongkong-1kg-tapak-tangan.jpg', dinar: 'dinar-10-closeup-koleksi-hitam.jpg', dinarCards: 'kad-dinar-hijau-dua-pantai.jpg' };

// ---- line-art props (hand-drawn feel) ----
function ink(fn, th = 7, col = K.ink) { X.save(); X.strokeStyle = col; X.lineWidth = th; X.lineCap = 'round'; X.lineJoin = 'round'; fn(); X.restore(); }
function trolley(cx, cy, s, full) {
  X.save(); X.translate(cx, cy); X.scale(s, s);
  if (full) { const R = rng(4), cols = ['#E8522F', '#F4B400', '#3A74CC', '#16A34A', '#7C3AED', '#F7E2D6'];
    for (let i = 0; i < 16; i++) { const x = -150 + (i % 6) * 52 + R() * 10, y = -150 - Math.floor(i / 6) * 58 - R() * 10; X.fillStyle = cols[i % 6]; rr(x, y, 46 + R() * 12, 56 + R() * 22, 8); X.fill(); X.strokeStyle = K.ink; X.lineWidth = 4; X.stroke(); } }
  ink(() => { X.beginPath(); X.moveTo(-240, -170); X.lineTo(-180, -170); X.lineTo(-150, 30); X.lineTo(170, 30); X.lineTo(200, -130); X.lineTo(-165, -130); X.stroke();
    for (let i = 1; i < 6; i++) { X.beginPath(); X.moveTo(-160 + i * 60, -128); X.lineTo(-140 + i * 54, 28); X.stroke(); }
    X.beginPath(); X.moveTo(-150, 30); X.lineTo(-130, 80); X.lineTo(150, 80); X.stroke();
    [-110, 120].forEach(x => { X.beginPath(); X.arc(x, 105, 22, 0, 7); X.stroke(); }); });
  X.restore();
}
function basket(cx, cy, s) {
  X.save(); X.translate(cx, cy); X.scale(s, s);
  [['#E8522F', -50], ['#F4B400', 10]].forEach(([c, x]) => { X.fillStyle = c; rr(x - 20, -110, 54, 64, 8); X.fill(); X.strokeStyle = K.ink; X.lineWidth = 4; X.stroke(); });
  ink(() => { X.beginPath(); X.moveTo(-130, -50); X.lineTo(130, -50); X.lineTo(105, 70); X.lineTo(-105, 70); X.closePath(); X.stroke();
    for (let i = -2; i <= 2; i++) { X.beginPath(); X.moveTo(i * 45, -48); X.lineTo(i * 38, 68); X.stroke(); }
    X.beginPath(); X.moveTo(-95, -50); X.quadraticCurveTo(0, -200, 95, -50); X.stroke(); });
  X.restore();
}
function tag(cx, cy, s, label, rot) {
  X.save(); X.translate(cx, cy); X.rotate(rot); X.scale(s, s);
  X.fillStyle = '#fff'; X.beginPath(); X.moveTo(-90, -45); X.lineTo(60, -45); X.lineTo(100, 0); X.lineTo(60, 45); X.lineTo(-90, 45); X.closePath(); X.fill();
  ink(() => { X.stroke(); X.beginPath(); X.arc(58, 0, 9, 0, 7); X.stroke(); }, 5);
  txt(label, -12, 18, F.block(52), K.red, 'center');
  X.restore();
}
function goat(cx, cy, s) {
  X.save(); X.translate(cx, cy); X.scale(s, s);
  ink(() => {
    X.beginPath(); X.ellipse(0, 0, 120, 62, 0, 0, 7); X.stroke();                                  // body
    [[-80, 50], [-45, 58], [55, 58], [90, 48]].forEach(([x, y]) => { X.beginPath(); X.moveTo(x, y); X.lineTo(x + 4, y + 90); X.stroke(); });
    X.beginPath(); X.moveTo(100, -30); X.quadraticCurveTo(140, -70, 160, -100); X.stroke();        // neck
    X.beginPath(); X.ellipse(178, -112, 42, 26, -.4, 0, 7); X.stroke();                            // head
    X.beginPath(); X.moveTo(165, -132); X.quadraticCurveTo(140, -190, 105, -180); X.stroke();      // horn
    X.beginPath(); X.moveTo(150, -118); X.lineTo(118, -100); X.stroke();                          // ear
    X.beginPath(); X.moveTo(205, -95); X.lineTo(210, -60); X.stroke();                            // beard
    X.beginPath(); X.moveTo(-118, -15); X.quadraticCurveTo(-150, -40, -140, -60); X.stroke();      // tail
  }, 8);
  X.beginPath(); X.arc(190, -118, 6, 0, 7); X.fillStyle = K.ink; X.fill();
  X.restore();
}
function coin(cx, cy, r, label) {
  const g = X.createLinearGradient(cx - r, cy - r, cx + r, cy + r); [[0, '#b07a12'], [.35, '#ffd23f'], [.5, '#fff3b0'], [.7, '#f4c54a'], [1, '#a8741a']].forEach(([o, c]) => g.addColorStop(o, c));
  X.beginPath(); X.arc(cx, cy, r, 0, 7); X.fillStyle = g; X.fill(); X.strokeStyle = '#7d5210'; X.lineWidth = 5; X.stroke();
  X.beginPath(); X.arc(cx, cy, r * .8, 0, 7); X.lineWidth = 3; X.stroke();
  txt('1', cx, cy + 14, F.block(r * .9), '#7d5210', 'center'); txt(label, cx, cy + r * .55, F.mono(r * .2), '#7d5210', 'center', 2);
}

var SLIDES = [
  // ---------- COVER ----------
  function (x) {
    sticky(['Duit sama.', 'Nilai lain.'], x + 770, 60, 260, .06, 46);
    burst(x + 120, 300, 1.1, -.3); burst(x + 600, 260, 1.1, .6);
    bigNum('RM100', x + 60, 470, 230, true);
    brushTitle('YANG SAMA', x + 80, 600, 112, -.03);
    blockTitle(['KENAPA MAKIN', 'TAK CUKUP?'], x + 70, 750, 112, .95);
    note(['Perasan tak?'], x + 70, 1000, 58, -.06);
    note(['Inflasi makan', 'senyap-senyap.'], x + 70, 1140, 46, -.05, true);
    cutout(IMG.point, x + 860, SH - 40, 700);
  },
  // ---------- 1. troli vs bakul ----------
  function (x) {
    counter(x, 1, 5); sticky(['Troli', '→ bakul'], x + 790, 50, 230, .06, 46);
    bigNum('1', x + 30, 620, 520);
    brushTitle('DULU vs KINI', x + 330, 300, 90);
    blockTitle(['SEKEPING RM100', 'DAPAT APA?'], x + 330, 450, 120, .95);
    body('10 tahun lalu, sekeping RM100 mampu *memenuhkan satu troli* pasar raya. Hari ini? Barang dapur cuma *muat sebakul kecil*.', x + 335, 630, 680, 36);
    trolley(x + 300, 1070, .95, true); basket(x + 790, 1060, 1.0);
    note(['10 tahun lalu'], x + 60, 770, 46, -.05, false); note(['Hari ini'], x + 720, 900, 46, -.05, false);
    tag(x + 330, 1180, .8, 'RM100', -.08); tag(x + 800, 1180, .8, 'RM100', .06);
    arrow(x + 520, 1020, x + 660, 1010, 30, K.red, 7);
  },
  // ---------- 2. raksasa inflasi ----------
  function (x) {
    counter(x, 2, 5); sticky(['Bayar lebih,', 'dapat sama'], x + 760, 50, 270, .06, 42);
    bigNum('2', x + 10, 620, 520);
    brushTitle('RAKSASA', x + 380, 320, 110);
    blockTitle(['INFLASI'], x + 380, 470, 170);
    body('Anda *dipaksa bayar lebih banyak* semata-mata untuk dapat *kuantiti barang yang sama*. Itulah wajah sebenar inflasi.', x + 385, 560, 650, 36);
    // growing price tags
    [[.55, -.12], [.8, -.05], [1.08, .04]].forEach(([s, r], i) => tag(x + 260 + i * 250, 980 - i * 40, s, '?', r));
    arrow(x + 200, 1120, x + 860, 900, -40, K.red, 8);
    checklist(['Harga naik', 'Barang sama', 'Duit makin kecil'], x + 80, 1080, 470, -.05, 40);
    note(['Tak nampak,', 'tapi terasa.'], x + 640, 1170, 48, -.06);
  },
  // ---------- 3. kertas vs emas ----------
  function (x) {
    counter(x, 3, 5); sticky(['Kertas susut.', 'Emas kekal.'], x + 740, 50, 300, .06, 42);
    bigNum('3', x + 10, 620, 520);
    brushTitle('WANG KERTAS', x + 380, 320, 88);
    blockTitle(['DICIPTA', 'UNTUK SUSUT'], x + 380, 460, 130, .95);
    body('Sifat wang kertas memang *susut dimamah zaman*. Sebaliknya, sejarah ribuan tahun dah buktikan *ketahanan emas fizikal*.', x + 385, 680, 650, 36);
    photoBox(IMG.kg, x + 420, 850, 560, 380, 30, .5, .45, .03);
    note(['Ribuan tahun,', 'masih bernilai.'], x + 70, 960, 52, -.07);
    arrow(x + 300, 1060, x + 410, 1010, 40, K.ink, 6);
    burst(x + 1010, 850, .9, .7);
  },
  // ---------- 4. dinar & kambing ----------
  function (x) {
    counter(x, 4, 5); sticky(['Bukti sejak', 'zaman Nabi'], x + 760, 50, 280, .06, 42);
    bigNum('4', x + 10, 620, 520);
    brushTitle('1 DINAR', x + 380, 320, 110);
    blockTitle(['= SEEKOR', 'KAMBING'], x + 380, 460, 130, .95);
    body('Zaman Rasulullah, *seekor kambing* dibeli dengan *satu dinar emas*. Hari ini, sekeping dinar yang sama masih mampu beli kambing yang serupa.', x + 385, 680, 650, 34);
    coin(x + 230, 1000, 120, 'DINAR');
    txt('=', x + 420, 1030, F.block(110), K.red, 'center');
    goat(x + 640, 1030, 1.1);
    note(['Dulu & sekarang'], x + 80, 1170, 44, -.05);
  },
  // ---------- 5. CTA ----------
  function (x) {
    counter(x, 5, 5); sticky(['Lindungi', 'kuasa beli'], x + 60, 190, 250, -.06, 44);
    cutout(IMG.thumbs, x + 870, SH - 40, 680);
    brushTitle('SIMPANAN TUNAI', x + 70, 440, 76);
    blockTitle(['MAMPU LAWAN', 'KOS SARA', 'HIDUP?'], x + 70, 570, 104, .95);
    note(['Komen pandangan', 'anda di bawah ↓'], x + 70, 930, 50, -.05, false);
    body('Penyelamat kuasa beli wang anda hanyalah...', x + 75, 1050, 440, 32);
    bigNum('EMAS!', x + 60, 1225, 150, true);
    burst(x + 520, 1120, 1, .5);
  },
];
