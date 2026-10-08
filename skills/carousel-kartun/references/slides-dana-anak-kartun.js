// Carousel kartun keluarga "Bila masa terbaik mula dana emas anak?"
var N = 6;
var BG = ['#FFF6E5', '#CFE6FA', '#FFEFA8', '#FFD1DC', '#CFEFDF', '#FFF6E5']; // cream sky butter pink mint cream
var ASSETS = { tLaugh: 'taufik-hahaha-tanpa-teks.png', tSalute: 'taufik-tabik.png', tArms: 'taufik-peluk-tubuh-senyum.png', tWave: 'taufik-lambai.png',
  wPray: 'isteri-doa.png', wExcited: 'isteri-teruja.png', wWave: 'isteri-lambai.png',
  kJump: 'anak-3d-lompat-gembira.png', kCheek: 'anak-pipi-tangan.png', kJumpBlue: 'anak-lompat-biru.png', kPoint: 'anak-3d-telunjuk.png',
  kOverall: 'anak-overall.png', kFist: 'anak-semangat-kuning.png', kStand: 'anak-3d-berdiri.png', kWave: 'anak-lambai-ungu.png' };

function calendar(cx, cy, s) {
  X.save(); X.translate(cx, cy); X.scale(s, s);
  card(-120, -110, 240, 240, K.white, 30); X.lineWidth = 4; X.strokeStyle = K.ink; rr(-120, -110, 240, 240, 30); X.stroke();
  X.save(); rr(-120, -110, 240, 240, 30); X.clip(); X.fillStyle = K.red; X.fillRect(-120, -110, 240, 70); X.restore();
  [-60, 60].forEach(x => { X.fillStyle = K.ink; rr(x - 9, -132, 18, 44, 9); X.fill(); });
  txt('HARI', 0, -62, F.t(40), K.white, 'center'); txt('INI', 0, 80, F.t(100), K.ink, 'center');
  X.restore();
}
function cap(cx, cy, s) { X.save(); X.translate(cx, cy); X.scale(s, s); X.fillStyle = K.ink; X.beginPath(); X.moveTo(-60, 10); X.lineTo(-60, 55); X.quadraticCurveTo(0, 85, 60, 55); X.lineTo(60, 10); X.fill(); X.beginPath(); X.moveTo(-130, 0); X.lineTo(0, -55); X.lineTo(130, 0); X.lineTo(0, 55); X.closePath(); X.fill(); X.strokeStyle = K.gold; X.lineWidth = 8; X.lineCap = 'round'; X.beginPath(); X.moveTo(0, 0); X.lineTo(95, 25); X.lineTo(95, 90); X.stroke(); X.restore(); }

var SLIDES = [
  // COVER
  function (x) {
    pill('DANA EMAS ANAK', x + 250, 150, 40, K.ink, K.butter, -.03);
    title('Bila masa *terbaik* nak mula simpan emas untuk anak?', x + 80, 300, 92, 920);
    chara(IMG.kPoint, x + 300, 1215, 470);
    goldBar(x + 690, 1040, 300, -.12, '1g');
    sparkle(x + 870, 920, 30); sparkle(x + 560, 900, 20);
    bubble(['Baba, bila', 'nak mula?'], x + 720, 790, 380, 190, x + 450, 880, 50);
  },
  // 1. 10 tahun lalu
  function (x) {
    pill('JAWAPAN PERTAMA', x + 270, 150, 40);
    title('*10 tahun* yang lalu!', x + 80, 310, 104, 920);
    card(x + 80, 400, 920, 260);
    txt('Masa tu harga segram emas', x + 540, 490, F.b(42), K.brown, 'center');
    txt('jauh bawah RM200', x + 540, 590, F.t(84), K.red, 'center');
    chara(IMG.tLaugh, x + 290, 1215, 470);
    bubble(['Kalau tahu,', '*dah borong!'], x + 750, 900, 420, 210, x + 470, 980, 54);
  },
  // 2. hari ini
  function (x) {
    pill('MASA KEDUA TERBAIK?', x + 300, 150, 40, K.ink, K.white, .02);
    title('*Hari ini* juga!', x + 80, 320, 120, 920);
    para('Tak perlu tunggu. Langkah pertama hari ni lebih baik dari menyesal esok.', x + 80, 430, 900, 40);
    calendar(x + 790, 820, 1.1);
    chara(IMG.tSalute, x + 330, 1215, 560);
    chara(IMG.kFist, x + 790, 1215, 300);
  },
  // 3. silap menunggu
  function (x) {
    pill('SILAP RAMAI IBU BAPA', x + 300, 150, 40, K.white, K.red);
    title('Asyik *tangguh*, tunggu harga turun...', x + 80, 310, 88, 820);
    chara(IMG.wPray, x + 280, 1215, 520);
    bubble(['Tunggu harga', 'turun dulu lah...'], x + 700, 700, 500, 200, x + 430, 820, 46);
    card(x + 560, 880, 440, 300, K.white);
    txt('Hakikatnya,', x + 780, 950, F.b(36), K.brown, 'center');
    txt('emas sentiasa', x + 780, 1020, F.t(48), K.ink, 'center');
    txt('dianggap mahal', x + 780, 1085, F.t(48), K.red, 'center');
    txt('dari tahun ke tahun.', x + 780, 1145, F.b(32), K.brown, 'center');
  },
  // 4. 1 gram sebulan -> menara gading
  function (x) {
    pill('PELAN DISIPLIN', x + 240, 150, 40, K.ink, K.white);
    title('*1 gram* sebulan sejak anak kecil', x + 80, 310, 92, 920);
    [[IMG.kStand, 200, 1215, 250, 'kecil'], [IMG.kOverall, 450, 1215, 330, 'sekolah'], [IMG.kWave, 720, 1215, 400, 'remaja']].forEach(([im, cx, by, h, l]) => chara(im, x + cx, by, h));
    [[200, 900], [450, 820], [720, 750]].forEach(([cx, cy], i) => { for (let k = 0; k <= i; k++) goldBar(x + cx + (k % 2 ? 14 : -14), cy - k * 40, 120); });
    cap(x + 930, 700, .6);
    card(x + 80, 430, 920, 190, K.white);
    txt('Bila anak ke menara gading,', x + 540, 505, F.b(40), K.brown, 'center');
    txt('tak perlu runsing pinjaman!', x + 540, 580, F.t(52), K.green, 'center');
  },
  // CTA
  function (x) {
    title('Berapa *umur anak* anda sekarang?', x + 80, 260, 88, 920);
    para('Dah ada simpanan emas? Nyatakan di ruangan komen.', x + 80, 470, 900, 40);
    pill('Masa depan anak menuntut...', x + 400, 630, 38);
    title('*TINDAKAN!*', x + 540, 800, 130, 900, 'center');
    chara(IMG.tWave, x + 250, 1215, 420); chara(IMG.wWave, x + 830, 1215, 400); chara(IMG.kJumpBlue, x + 540, 1215, 330);
    heart(x + 540, 860, 26); sparkle(x + 400, 880, 22); sparkle(x + 690, 880, 22);
  },
];
