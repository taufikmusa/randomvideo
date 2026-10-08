// Carousel "Aset tanpa tandatangan" — emas fizikal bebas institusi (gaya editorial)
var N = 6;
var ASSETS = { chest: 'thumb-dada.png', kg: 'jongkong-1kg-tapak-tangan.jpg', bar100: 'jongkong-100g-kad-bungamas-meja.jpg', balloon: 'dinar-10-atas-hutan-belon.jpg', bar250: 'jongkong-250g-merah.jpg' };

function ink(fn, th = 7, col = K.ink) { X.save(); X.strokeStyle = col; X.lineWidth = th; X.lineCap = 'round'; X.lineJoin = 'round'; fn(); X.restore(); }
function scribbleSign(x, y, s = 1, col = '#1D4ED8') { // a handwritten signature squiggle
  X.save(); X.translate(x, y); X.scale(s, s); X.strokeStyle = col; X.lineWidth = 5; X.lineCap = 'round'; X.beginPath();
  X.moveTo(0, 0); X.bezierCurveTo(20, -50, 40, 30, 60, -10); X.bezierCurveTo(80, -60, 90, 40, 120, 0); X.bezierCurveTo(140, -30, 160, 20, 200, -5); X.stroke(); X.restore();
}
function docStack(cx, cy, s) { // thick S&P + geran
  X.save(); X.translate(cx, cy); X.scale(s, s);
  for (let i = 5; i >= 0; i--) { X.save(); X.translate(i * 10, -i * 12); X.rotate(-.04 + i * .015); X.fillStyle = '#fff'; X.fillRect(-150, -190, 300, 380); ink(() => X.strokeRect(-150, -190, 300, 380), 5); X.restore(); }
  txt('PERJANJIAN', 0, -120, F.block(44), K.ink, 'center'); txt('JUAL BELI', 0, -72, F.block(44), K.ink, 'center');
  X.fillStyle = '#cfcfcf'; for (let i = 0; i < 6; i++) X.fillRect(-110, -30 + i * 30, 220 - (i % 3) * 30, 10);
  scribbleSign(-90, 160, .9);
  X.save(); X.translate(150, 120); X.rotate(.2); X.beginPath(); X.arc(0, 0, 58, 0, 7); X.strokeStyle = K.red; X.lineWidth = 6; X.stroke(); txt('GERAN', 0, 10, F.block(30), K.red, 'center'); X.restore();
  X.restore();
}
function lockedPhone(cx, cy, s) {
  X.save(); X.translate(cx, cy); X.scale(s, s);
  X.fillStyle = '#fff'; rr(-130, -250, 260, 500, 36); X.fill(); ink(() => { rr(-130, -250, 260, 500, 36); X.stroke(); rr(-110, -215, 220, 420, 18); X.stroke(); }, 7);
  txt('AKAUN', 0, -140, F.block(40), K.ink, 'center'); txt('DIBEKUKAN', 0, -95, F.block(40), K.red, 'center');
  ink(() => { X.beginPath(); X.arc(0, 20, 42, Math.PI, 0); X.stroke(); }, 10, K.red);
  X.fillStyle = K.red; rr(-62, 20, 124, 100, 14); X.fill(); X.fillStyle = '#fff'; X.beginPath(); X.arc(0, 60, 12, 0, 7); X.fill(); X.fillRect(-5, 62, 10, 30);
  txt('RM ••••••', 0, 175, F.block(36), '#aaa', 'center');
  X.restore();
}
function scale(cx, cy, s) { // neraca with gold bar on one pan
  X.save(); X.translate(cx, cy); X.scale(s, s);
  ink(() => { X.beginPath(); X.moveTo(0, -160); X.lineTo(0, 150); X.moveTo(-90, 150); X.lineTo(90, 150); X.moveTo(-190, -120); X.lineTo(190, -120); X.stroke();
    [-190, 190].forEach(x => { X.beginPath(); X.moveTo(x, -120); X.lineTo(x - 60, 10); X.moveTo(x, -120); X.lineTo(x + 60, 10); X.stroke(); X.beginPath(); X.moveTo(x - 75, 10); X.quadraticCurveTo(x, 60, x + 75, 10); X.stroke(); }); }, 7);
  const g = X.createLinearGradient(-240, -20, -140, 10); [[0, '#b07a12'], [.5, '#fff0b3'], [1, '#c98e12']].forEach(([o, c]) => g.addColorStop(o, c));
  X.fillStyle = g; rr(-240, -25, 100, 38, 6); X.fill(); X.strokeStyle = '#7d5210'; X.lineWidth = 3; X.stroke();
  txt('999.9', 140, 120, F.block(50), K.red, 'center');
  X.restore();
}
function globe(cx, cy, r) {
  ink(() => { X.beginPath(); X.arc(cx, cy, r, 0, 7); X.stroke(); X.beginPath(); X.ellipse(cx, cy, r * .45, r, 0, 0, 7); X.stroke(); X.beginPath(); X.moveTo(cx - r, cy); X.lineTo(cx + r, cy); X.stroke();
    [-.5, .5].forEach(k => { X.beginPath(); X.ellipse(cx, cy + k * r, r * Math.sqrt(1 - k * k), r * .12, 0, 0, 7); X.stroke(); }); }, 6);
}
function phoneNumbers(cx, cy, s) {
  X.save(); X.translate(cx, cy); X.scale(s, s);
  X.fillStyle = '#fff'; rr(-110, -210, 220, 420, 30); X.fill(); ink(() => { rr(-110, -210, 220, 420, 30); X.stroke(); }, 6);
  txt('BAKI', 0, -110, F.mono(24), '#888', 'center', 3); txt('RM 0,000.00', 0, -50, F.block(40), K.ink, 'center');
  X.fillStyle = '#e5e5e5'; [0, 50, 100].forEach(y => { rr(-80, y, 160, 30, 8); X.fill(); });
  X.restore();
}

var SLIDES = [
  // ---------- COVER (tiada potret) ----------
  function (x) {
    sticky(['Tanpa', 'syarat.'], x + 790, 60, 240, .06, 46);
    burst(x + 640, 340, 1.1, .9);
    brushTitle('ASET APA', x + 70, 300, 110, -.04);
    blockTitle(['YANG NILAINYA', 'KEKAL UTUH'], x + 70, 470, 140, .95);
    txt('tanpa', x + 74, 790, F.hand(70), K.ink);
    blockTitle(['TANDATANGAN', '& GERAN?'], x + 250, 790, 100, .95, K.red);
    // crossed-out signature line
    X.save(); X.translate(x + 90, 1010); X.fillStyle = '#c9c9c9'; X.fillRect(0, 0, 380, 4); txt('Tandatangan:', 0, -60, F.mono(22), '#888'); scribbleSign(20, -20, 1.4); ink(() => { X.beginPath(); X.moveTo(-10, -70); X.lineTo(390, 20); X.stroke(); }, 9, K.red); X.restore();
    photoBox(IMG.kg, x + 590, 900, 420, 310, 30, .5, .45, .04);
    note(['Nilai kekal utuh.'], x + 90, 1130, 52, -.05);
    arrow(x + 470, 1120, x + 590, 1080, -30, K.ink, 6);
  },
  // ---------- 1. hartanah ----------
  function (x) {
    counter(x, 1, 5); sticky(['Berbulan-', 'bulan...'], x + 790, 50, 240, .06, 44);
    bigNum('1', x + 30, 620, 520);
    brushTitle('HARTANAH?', x + 380, 320, 96);
    blockTitle(['BANYAK', 'SYARATNYA'], x + 380, 460, 130, .95);
    body('Perlu *surat perjanjian jual beli* yang tebal, *geran rasmi* pejabat tanah, dan *proses guaman berbulan-bulan* semata-mata nak jadikan tunai.', x + 385, 680, 650, 34);
    docStack(x + 330, 1030, .78);
    checklist(['Perjanjian tebal', 'Geran rasmi', 'Guaman berbulan'], x + 600, 940, 420, .04, 42);
  },
  // ---------- 2. bank ----------
  function (x) {
    counter(x, 2, 5); sticky(['Tanpa', 'amaran.'], x + 800, 50, 230, .06, 46);
    bigNum('2', x + 10, 620, 520);
    brushTitle('DUIT BANK?', x + 380, 320, 96);
    blockTitle(['BOLEH', 'TERSEKAT'], x + 380, 460, 130, .95);
    body('Jika *sistem perbankan tergendala* atau *akaun dibekukan*, akses kepada harta anda boleh tersekat *serta-merta*.', x + 385, 680, 650, 36);
    lockedPhone(x + 300, 1030, .78);
    note(['Harta ada,', 'tapi tak boleh', 'sentuh.'], x + 560, 950, 56, -.06);
    burst(x + 1000, 900, 1, .4);
  },
  // ---------- 3. emas berdiri sendiri ----------
  function (x) {
    counter(x, 3, 5); sticky(['Berat +', 'ketulenan'], x + 780, 50, 250, .06, 44);
    bigNum('3', x + 10, 620, 520);
    brushTitle('EMAS FIZIKAL', x + 380, 320, 84);
    blockTitle(['BERDIRI', 'SENDIRI'], x + 380, 460, 130, .95);
    body('Tak bergantung kepada jaminan *mana-mana institusi* atau *kerajaan*. Nilainya melekat pada *berat timbangan* dan *ketulenan* logam itu sendiri.', x + 385, 680, 650, 34);
    scale(x + 290, 1050, .9);
    photoBox(IMG.bar100, x + 610, 860, 380, 360, 26, .5, .6, .04);
  },
  // ---------- 4. tiga sifat ----------
  function (x) {
    counter(x, 4, 5); sticky(['Laku', 'di mana-mana'], x + 770, 50, 270, .06, 42);
    bigNum('4', x + 10, 620, 520);
    brushTitle('SEBAB ITU', x + 380, 320, 96);
    blockTitle(['EMAS TETAP', 'BERNILAI'], x + 380, 460, 130, .95);
    checklist(['Tak boleh dicipta sesuka hati', 'Tak boleh dicairkan pihak ketiga', 'Laku di mana-mana ceruk dunia'], x + 380, 600, 650, -.02, 40);
    photoBox(IMG.balloon, x + 470, 860, 520, 360, 28, .5, .5, -.03);
    globe(x + 240, 1040, 120);
    note(['Bila-bila masa.'], x + 90, 1215, 46, -.04, false);
    arrow(x + 330, 960, x + 460, 920, -30, K.ink, 6);
  },
  // ---------- 5. CTA ----------
  function (x) {
    counter(x, 5, 5); sticky(['Jujur', 'jawab ya'], x + 60, 190, 230, -.06, 44);
    cutout(IMG.chest, x + 870, SH - 40, 660);
    brushTitle('ANDA LEBIH PERCAYA', x + 70, 450, 66);
    blockTitle(['ANGKA DI', 'SKRIN?'], x + 70, 580, 104, .95);
    txt('atau', x + 74, 790, F.hand(64), K.red);
    blockTitle(['ASET DI', 'TANGAN?'], x + 200, 790, 104, .95);
    note(['Kongsi jawapan di komen ↓'], x + 70, 1000, 46, -.04, false);
    body('Kekayaan mutlak adalah aset yang...', x + 75, 1070, 560, 30);
    bigNum('BEBAS!', x + 60, 1225, 150, true);
  },
];
