// carousel-maroon: "Bahagia dengan diri sendiri — laluan sendiri" (7 slaid). Selfie Taufik hanya slaid terakhir.
var N = 7;
var ASSETS = { taufik: 'peluk-tubuh.png', balloon: 'dinar-10-atas-hutan-belon.jpg', stand: 'jongkong-berdiri-meja-hitam.jpg', tiers: 'set-jongkong-bertingkat-bungamas.jpg',
  taifook: 'kad-taifook-4-saiz-tangan.jpg', dulang: 'dulang-merah-1kg-koleksi-penuh.jpg', dinar: 'kad-dinar-hijau-dua-pantai.jpg', merak: 'jongkong-merak-100g-dulang-merah.jpg' };

const ic = {
  phone: () => { rr(-20, -34, 40, 68, 8); X.stroke(); X.beginPath(); X.moveTo(-34, -40); X.lineTo(34, 40); X.stroke(); },
  ruler: () => { X.strokeRect(-36, -14, 72, 28); for (let i = -2; i <= 2; i++) { X.beginPath(); X.moveTo(i * 14, -14); X.lineTo(i * 14, i % 2 ? -4 : 2); X.stroke(); } },
  path: () => { X.beginPath(); X.moveTo(-30, 30); X.quadraticCurveTo(-30, -6, 0, -6); X.quadraticCurveTo(30, -6, 30, -34); X.stroke(); X.beginPath(); X.arc(-30, 30, 6, 0, 7); X.fill(); X.beginPath(); X.moveTo(22, -26); X.lineTo(30, -36); X.lineTo(38, -26); X.stroke(); },
  step: () => { X.beginPath(); X.moveTo(-34, 30); X.lineTo(-34, 14); X.lineTo(-12, 14); X.lineTo(-12, -4); X.lineTo(10, -4); X.lineTo(10, -22); X.lineTo(32, -22); X.stroke(); },
  heart: () => { X.beginPath(); X.moveTo(0, 26); X.bezierCurveTo(-40, -6, -20, -34, 0, -14); X.bezierCurveTo(20, -34, 40, -6, 0, 26); X.fill(); },
};

var SLIDES = [
  // COVER
  function (x) {
    bgPhoto(x, IMG.balloon, 14, .45);
    sub('Satu perkara yang saya belajar tentang', x + 540, 190, 860, 38);
    headline('Orang Yang Bahagia', x + 540, 300, 84);
    pillTitle(['Dengan Diri', 'Sendiri'], x + 540, 430, 100);
    strokes(x + 130, 480, 1, -.9); strokes(x + 950, 480, 1, .9);
    sub('Mereka tak runsing melihat kejayaan orang lain di media sosial.', x + 540, 720, 860, 38, K.gold);
    photoCard(IMG.balloon, x + 540, 1040, 520, 260, -.03, .5, .5);
    sparkle(x + 210, 960, 26); sparkle(x + 860, 1150, 22);
  },
  // 1 media sosial
  function (x) {
    bgPhoto(x, IMG.stand, 16, .5);
    pillTitle(['Tak Runsing Tengok', 'Orang Lain'], x + 540, 180, 76);
    badge(x + 540, 520, 100, ic.phone);
    whiteCard(x + 110, 680, 860, ['Mereka tak jadikan kehidupan', 'orang luar sebagai', '*piawaian hidup sendiri.'], 42);
  },
  // 2 permulaan vs kemuncak
  function (x) {
    bgPhoto(x, IMG.tiers, 16, .5);
    pillTitle(['Jangan Bandingkan...'], x + 540, 190, 78);
    tierCard(x + 110, 360, 400, 440, 'ANDA', 'MULA', 'langkah pertama anda');
    tierCard(x + 570, 360, 400, 440, 'ORANG LAIN', 'PUNCAK', 'hasil bertahun mereka');
    badge(x + 540, 580, 56, ic.ruler);
    whiteCard(x + 110, 880, 860, ['Mereka tidak membandingkan', '*permulaan mereka', 'dengan kemuncak orang lain.'], 42);
  },
  // 3 laluan sendiri
  function (x) {
    bgPhoto(x, IMG.dinar, 16, .5);
    pillTitle(['Sibuk Bina', 'Laluan Sendiri'], x + 540, 180, 84);
    badge(x + 540, 520, 100, ic.path);
    rowPill(x + 110, 680, 860, 'Ikut', 'RENTAK', 'sendiri');
    rowPill(x + 110, 800, 860, 'Ikut', 'KEMAMPUAN', 'yang ada');
    photoCard(IMG.dinar, x + 540, 1080, 520, 200, .02, .5, .5);
  },
  // 4 kemajuan kecil
  function (x) {
    bgPhoto(x, IMG.taifook, 16, .5);
    pillTitle(['Hargai Kemajuan', 'Kecil'], x + 540, 180, 84);
    badge(x + 540, 520, 100, ic.step);
    sub('Setiap langkah kecil yang dicapai, hari demi hari.', x + 540, 690, 860, 38);
    photoCard(IMG.taifook, x + 540, 960, 560, 300, -.02, .5, .45);
    whiteCard(x + 110, 1140, 860, ['*Sikit-sikit, lama-lama jadi bukit.'], 36);
  },
  // 5 kepuasan peribadi
  function (x) {
    bgPhoto(x, IMG.merak, 16, .5);
    pillTitle(['Kepuasan Hidup'], x + 540, 190, 88);
    badge(x + 540, 440, 90, ic.heart);
    tierCard(x + 110, 580, 400, 400, 'SEBENARNYA', 'PERIBADI', 'milik anda seorang');
    tierCard(x + 570, 580, 400, 400, 'BUKANNYA', 'LUMBA', 'perlumbaan umum');
  },
  // CTA (selfie di sini sahaja)
  function (x) {
    bgPhoto(x, IMG.dulang, 16, .5);
    sub('Jadi tuan puan, berjaya ni bukan tentang siapa sampai paling pantas.', x + 540, 150, 920, 34);
    headline('Berjaya Ni Tentang', x + 540, 320, 74);
    pillTitle(['Kesetiaan', 'Menempuh Proses', 'Sendiri'], x + 540, 440, 72);
    strokes(x + 110, 520, 1, -.9); strokes(x + 970, 520, 1, .9);
    cutout(IMG.taufik, x + 790, SH - 40, 560);
    shadow(() => { rr(x + 60, 840, 520, 250, 30); X.fillStyle = 'rgba(20,8,6,.75)'; X.fill(); }, 20, .4, 8);
    txt('Saya doakan langkah', x + 90, 905, F.b(32), K.white);
    txt('kita sentiasa diberkati', x + 90, 955, F.b(32), K.gold); txt('menuju matlamat hidup,', x + 90, 1005, F.b(32), K.gold); txt('insyaAllah.', x + 90, 1055, F.h(34), K.white);
    shadow(() => { rr(x + 60, 1110, 520, 110, 55); X.fillStyle = K.maroon; X.fill(); }, 20, .4, 8);
    txt('Teruskan langkah anda!', x + 320, 1180, F.h(38), K.white, 'center');
  },
];
