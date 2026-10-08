// Carousel komik "Bila masa terbaik mula dana emas anak?"
var N = 6;
var ASSETS = { bar: 'kartun-taufik-jongkong-250g.png', books: 'kartun-taufik-buku-guru.png', laugh: 'kartun-taufik-hahaha-tanpa-teks.png', salute: 'kartun-taufik-siap-tabik-tanpa-teks.png', thanks: 'kartun-taufik-terima-kasih-tanpa-teks.png', taifook: 'kad-taifook-4-saiz-tangan.jpg', stack: 'jongkong-1kg-250g-100g-50g-buku-guru.jpg' };

function calendar(cx, cy, s, top, big, col) {
  X.save(); X.translate(cx, cy); X.scale(s, s);
  X.fillStyle = K.ink; X.fillRect(-120 + 8, -110 + 10, 240, 240);
  X.fillStyle = '#fff'; X.fillRect(-120, -110, 240, 240); X.fillStyle = col; X.fillRect(-120, -110, 240, 66);
  X.lineWidth = 8; X.strokeStyle = K.ink; X.strokeRect(-120, -110, 240, 240); X.beginPath(); X.moveTo(-120, -44); X.lineTo(120, -44); X.stroke();
  [-60, 60].forEach(x => { X.fillStyle = K.ink; rr(x - 9, -132, 18, 44, 9); X.fill(); });
  txt(top, 0, -60, F.bang(40), '#fff', 'center', 2); txt(big, 0, 90, F.bang(big.length > 3 ? 70 : 110), K.ink, 'center');
  X.restore();
}
function hourglass(cx, cy, s) {
  X.save(); X.translate(cx, cy); X.scale(s, s); X.lineWidth = 9; X.strokeStyle = K.ink; X.lineJoin = 'round';
  X.fillStyle = '#8B5A2B'; X.fillRect(-110, -170, 220, 26); X.fillRect(-110, 144, 220, 26); X.strokeRect(-110, -170, 220, 26); X.strokeRect(-110, 144, 220, 26);
  X.fillStyle = '#fff'; X.beginPath(); X.moveTo(-85, -144); X.lineTo(85, -144); X.lineTo(10, 0); X.lineTo(85, 144); X.lineTo(-85, 144); X.lineTo(-10, 0); X.closePath(); X.fill(); X.stroke();
  X.fillStyle = K.yel; X.beginPath(); X.moveTo(-40, -60); X.lineTo(40, -60); X.lineTo(8, 0); X.lineTo(-8, 0); X.closePath(); X.fill();
  X.beginPath(); X.moveTo(-80, 140); X.quadraticCurveTo(0, 50, 80, 140); X.closePath(); X.fill();
  X.restore();
}
function rising(x, y, w, h) {
  X.save(); X.lineWidth = 7; X.strokeStyle = K.ink; X.beginPath(); X.moveTo(x, y); X.lineTo(x, y + h); X.lineTo(x + w, y + h); X.stroke();
  const pts = [[0, .9], [.15, .82], [.28, .86], [.42, .66], [.55, .7], [.7, .45], [.82, .5], [1, .08]];
  X.lineWidth = 14; X.strokeStyle = K.red; X.lineJoin = 'round'; X.beginPath(); pts.forEach(([u, v], i) => i ? X.lineTo(x + u * w, y + v * h) : X.moveTo(x + u * w, y + v * h)); X.stroke();
  X.restore();
}
function cap(cx, cy, s) {
  X.save(); X.translate(cx, cy); X.scale(s, s); X.lineWidth = 7; X.strokeStyle = K.ink;
  X.fillStyle = K.ink; X.beginPath(); X.moveTo(-60, 10); X.lineTo(-60, 60); X.quadraticCurveTo(0, 90, 60, 60); X.lineTo(60, 10); X.fill();
  X.beginPath(); X.moveTo(-130, 0); X.lineTo(0, -55); X.lineTo(130, 0); X.lineTo(0, 55); X.closePath(); X.fill();
  X.strokeStyle = K.yel; X.lineWidth = 8; X.beginPath(); X.moveTo(0, 0); X.lineTo(95, 25); X.lineTo(95, 90); X.stroke(); X.fillStyle = K.yel; X.fillRect(84, 86, 22, 34);
  X.restore();
}

var SLIDES = [
  // ---------- COVER ----------
  function (x) {
    panel(x + 50, 70, 470, 330, K.yelLt, -.02); panel(x + 560, 70, 470, 330, '#fff', .02);
    label('10 TAHUN LALU', x + 285, 140, 46); label('HARI INI', x + 795, 140, 46, K.red, '#fff');
    pow('?', x + 285, 340, 170, K.yel); pow('?', x + 795, 340, 170, K.red);
    bigArrow(x + 470, 235, x + 620, 235, 34);
    burst(x + 540, 690, 470, 260, K.red, 20, 3);
    pow('BILA MASA', x + 540, 650, 120, '#fff');
    pow('TERBAIK?', x + 540, 790, 150, K.yel);
    img(IMG.bar, x + 250, 1270, 520);
    bubble(['MULA DANA', 'EMAS ANAK?'], x + 750, 1040, 560, 300, x + 470, 1130, 78, { 1: K.red });
  },
  // ---------- 1. 10 tahun lalu ----------
  function (x) {
    label('JAWAPAN #1', x + 220, 130, 56);
    pow('10 TAHUN', x + 540, 300, 150, K.yel); pow('YANG LALU!', x + 540, 450, 150, K.red);
    panel(x + 90, 540, 900, 330, '#fff', -.01);
    txt('Harga segram emas masih', x + 540, 630, F.m(44), K.ink, 'center');
    txt('JAUH BAWAH', x + 540, 730, F.bang(80), K.ink, 'center', 2);
    pow('RM200!', x + 540, 835, 100, K.red);
    circleMark(x + 540, 800, 190, 62);
    bubble(['KALAU TAHU,', 'DAH BORONG!'], x + 720, 1060, 520, 250, x + 470, 1130, 60, { 1: K.red });
    img(IMG.laugh, x + 260, 1260, 400);
    ticks(x + 260, 940, 150, 5);
  },
  // ---------- 2. hari ini ----------
  function (x) {
    label('MASA KEDUA TERBAIK?', x + 330, 130, 52);
    burst(x + 540, 420, 440, 250, K.yel, 20, 11);
    pow('HARI INI', x + 540, 400, 160, K.red);
    pow('JUGA!', x + 540, 540, 120, '#fff');
    calendar(x + 800, 930, 1.05, 'HARI', 'INI', K.red);
    img(IMG.salute, x + 300, 1260, 520);
    bubble(['SIAP!'], x + 570, 760, 260, 160, x + 420, 840, 80);
  },
  // ---------- 3. silap menunggu ----------
  function (x) {
    label('SILAP RAMAI IBU BAPA', x + 340, 130, 52, K.red, '#fff');
    pow('ASYIK', x + 330, 310, 140, K.yel); pow('TANGGUH...', x + 540, 450, 140, '#fff');
    panel(x + 70, 530, 440, 440, '#fff', -.02); hourglass(x + 290, 750, .9);
    panel(x + 560, 530, 450, 440, '#fff', .02); rising(x + 610, 590, 360, 300);
    txt('HARGA EMAS (ILUSTRASI)', x + 785, 950, F.m(22), K.ink, 'center');
    bubble(['TUNGGU HARGA', 'TURUN DULU...'], x + 330, 1110, 560, 230, x + 300, 980, 58);
    panel(x + 640, 1030, 380, 190, K.yel, .03);
    txt('Emas akan sentiasa', x + 830, 1100, F.m(30), K.ink, 'center');
    txt('dianggap MAHAL,', x + 830, 1145, F.b(34), K.red, 'center');
    txt('tahun ke tahun.', x + 830, 1188, F.m(30), K.ink, 'center');
  },
  // ---------- 4. 1 gram sebulan ----------
  function (x) {
    label('PELAN DISIPLIN', x + 260, 130, 52);
    burst(x + 540, 360, 420, 200, K.red, 18, 13);
    pow('1 GRAM', x + 540, 350, 140, K.yel); pow('SEBULAN', x + 540, 470, 100, '#fff');
    photoPanel(IMG.taifook, x + 70, 620, 420, 440, .5, .45, -.03);
    panel(x + 530, 620, 480, 440, '#fff', .02);
    txt('Bila anak ke', x + 770, 720, F.m(38), K.ink, 'center'); pow('MENARA GADING', x + 770, 800, 64, K.yel);
    txt('yuran & kos hidup', x + 770, 870, F.m(34), K.ink, 'center'); txt('dah melambung.', x + 770, 915, F.m(34), K.ink, 'center');
    cap(x + 770, 990, .7);
    bubble(['TAK PERLU RUNSING', 'PINJAMAN PENDIDIKAN!'], x + 540, 1170, 860, 150, x + 300, 1100, 46, { 1: K.red });
  },
  // ---------- 5. CTA ----------
  function (x) {
    bubble(['BERAPA UMUR', 'ANAK ANDA?'], x + 540, 230, 820, 300, x + 760, 400, 92, { 1: K.red });
    panel(x + 80, 440, 560, 200, '#fff', -.02);
    txt('Dah ada simpanan emas?', x + 360, 525, F.m(36), K.ink, 'center');
    txt('Nyatakan di KOMEN ↓', x + 360, 590, F.b(40), K.red, 'center');
    txt('Masa depan anak', x + 80, 730, F.m(38), K.ink); txt('menuntut...', x + 80, 778, F.m(38), K.ink);
    burst(x + 360, 990, 320, 160, K.yel, 18, 19);
    pow('TINDAKAN!', x + 360, 1030, 110, K.red);
    img(IMG.thanks, x + 850, 1250, 560);
  },
];
