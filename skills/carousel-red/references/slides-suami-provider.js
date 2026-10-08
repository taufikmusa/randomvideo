// carousel-red: "5 Sebab Suami Wajib Jadi Provider Walaupun Gaji Kecil" (8 slaid)
var N = 8;
var ASSETS = {
  baArms: 'baba-peluk-tubuh-sengih.png', baBooks: 'baba-buku-guru.png', baThink: 'baba-berfikir-polo.png', baOpen: 'baba-tangan-terbuka.png',
  baHeart: 'baba-peluk-hati.png', baThumbs: 'baba-dua-thumbs-2.png', baLaugh: 'baba-hahaha-tanpa-teks.png', baSalute: 'baba-tabik-sengih.png',
  maThink: 'mami-headphone-berfikir.png', maFinger: 'mami-jari-hati.png', maArms: 'mami-peluk-tubuh-senyum.png', maHeart: 'mami-peluk-hati.png', maThumbs: 'mami-dua-thumbs.png',
  amUp: 'amani-tangan-atas-gembira.png', aiOpen: 'aileen-depa-tangan.png',
  tiers: 'set-jongkong-bertingkat-bungamas.jpg', dinar: 'kad-dinar-hijau-dua-pantai.jpg',
};
function sebabTag(n, x) { label('SEBAB #' + n, x + 200, 130, 56, n === 2 ? K.red : K.yel, n === 2 ? '#fff' : K.ink); }
function crossItem(s, x, y, w) {
  panel(x, y, w, 100, '#fff', 0); txt(s, x + 40, y + 66, F.bang(52), K.ink, 'left', 1);
  X.save(); X.strokeStyle = K.red; X.lineWidth = 12; X.lineCap = 'round'; X.beginPath(); X.moveTo(x + 24, y + 50); X.lineTo(x + w - 90, y + 46); X.stroke();
  X.beginPath(); X.arc(x + w - 50, y + 50, 30, 0, 7); X.fillStyle = K.red; X.fill(); X.strokeStyle = '#fff'; X.lineWidth = 7; X.beginPath(); X.moveTo(x + w - 62, y + 38); X.lineTo(x + w - 38, y + 62); X.moveTo(x + w - 38, y + 38); X.lineTo(x + w - 62, y + 62); X.stroke(); X.restore();
}

var SLIDES = [
  // COVER
  function (x) {
    burst(x + 540, 470, 470, 290, K.red, 20, 31);
    label('WALAUPUN GAJI KECIL', x + 300, 120, 54, K.ink, K.yel, -.03);
    pow('5 SEBAB SUAMI', x + 540, 420, 112, '#fff');
    pow('WAJIB JADI', x + 540, 530, 96, K.yel);
    pow('PROVIDER', x + 540, 660, 140, K.yel);
    img(IMG.baArms, x + 270, 1250, 520);
    bubble(['SEBAB #2 PALING', 'KERAP DIABAIKAN!'], x + 760, 1010, 520, 230, x + 520, 1080, 54, { 1: K.red });
    ticks(x + 270, 760, 120, 4);
  },
  // HOOK
  function (x) {
    label('RAMAI SUAMI BUAT NI...', x + 330, 120, 54);
    panel(x + 70, 210, 940, 300, '#fff', -.01);
    txt('Gaji rasa tak cukup, terus minta isteri', x + 540, 300, F.m(40), K.ink, 'center');
    pow('BAYAR DAPUR 50-50?', x + 540, 420, 96, K.red);
    img(IMG.maThink, x + 230, 950, 360);
    burst(x + 700, 760, 300, 160, K.yel, 16, 33, false);
    txt('HAKIKATNYA', x + 700, 720, F.bang(48), K.ink, 'center', 2);
    pow('100% SUAMI', x + 700, 810, 90, K.red);
    img(IMG.baBooks, x + 820, 1245, 340);
    panel(x + 70, 1010, 560, 200, '#fff', .01);
    txt('Nasihat guru emas saya,', x + 350, 1080, F.m(32), K.ink, 'center');
    txt('Tn Mohd Zulkifli Shafie,', x + 350, 1125, F.b(34), K.red, 'center');
    txt('tentang prinsip nafkah keluarga.', x + 350, 1170, F.m(30), K.ink, 'center');
  },
  // SEBAB 1
  function (x) {
    sebabTag(1, x);
    pow('IKUT KEMAMPUAN', x + 540, 290, 110, K.yel);
    pow('POKET SEMASA', x + 540, 410, 110, K.red);
    panel(x + 70, 480, 940, 260, '#fff', -.01);
    txt('Nafkah wajib disediakan ikut kemampuan', x + 540, 560, F.m(38), K.ink, 'center');
    txt('poket sendiri pada waktu tersebut,', x + 540, 610, F.m(38), K.ink, 'center');
    txt('ikut saiz pendapatan sedia ada.', x + 540, 690, F.b(42), K.red, 'center');
    img(IMG.baOpen, x + 330, 1250, 440);
    burst(x + 790, 960, 200, 130, K.red, 14, 35, false); pow('100%', x + 790, 995, 110, '#fff');
  },
  // SEBAB 2
  function (x) {
    sebabTag(2, x);
    pow('KECILKAN', x + 540, 290, 130, K.yel); pow('GAYA HIDUP!', x + 540, 420, 120, K.red);
    crossItem('KERETA MAHAL', x + 80, 480, 560); crossItem('MAKAN DI LUAR', x + 80, 610, 560);
    img(IMG.baThink, x + 840, 780, 330);
    bubble(['Bila gaji mengecil,', 'kecilkan GAYA HIDUP,', 'bukan tanggungjawab!'], x + 540, 900, 900, 230, x + 760, 760, 54, { 2: K.red });
    panel(x + 80, 1060, 920, 140, K.yel, -.01);
    txt('Hidup sekadar apa yang ada.', x + 540, 1150, F.bang(64), K.ink, 'center', 1);
  },
  // SEBAB 3
  function (x) {
    sebabTag(3, x);
    pow('DUIT ISTERI', x + 540, 290, 130, K.yel); pow('HAK ISTERI', x + 540, 420, 130, K.red);
    panel(x + 70, 490, 600, 330, '#fff', -.01);
    txt('Bantuan isteri yang bekerja', x + 370, 570, F.m(34), K.ink, 'center');
    txt('dikira sebagai', x + 370, 620, F.m(34), K.ink, 'center');
    pow('IHSAN', x + 370, 720, 90, K.red); txt('& BONUS TAMBAHAN', x + 370, 780, F.bang(44), K.ink, 'center', 1);
    img(IMG.maFinger, x + 860, 900, 400);
    bubble(['Suami wajib lindungi', 'hak isteri.'], x + 420, 1050, 640, 200, x + 220, 1210, 52, { 1: K.red });
    img(IMG.baSalute, x + 880, 1250, 320);
  },
  // SEBAB 4
  function (x) {
    sebabTag(4, x);
    pow('TARAF HIDUP', x + 540, 290, 120, K.yel); pow('IKUT SAIZ GAJI', x + 540, 410, 110, K.red);
    panel(x + 70, 480, 440, 300, K.red, -.02);
    pow('NAFKAH', x + 290, 590, 80, '#fff'); pow('TETAP 100%', x + 290, 690, 70, K.yel); txt('susah atau senang', x + 290, 750, F.m(30), '#fff', 'center');
    panel(x + 570, 480, 440, 300, '#fff', .02);
    txt('YANG BERUBAH', x + 790, 550, F.bang(42), K.ink, 'center', 2);
    ['Kualiti rumah', 'Makanan', 'Pakaian'].forEach((s, i) => txt('• ' + s, x + 640, 620 + i * 50, F.m(38), K.ink));
    img(IMG.baThumbs, x + 300, 1250, 400); img(IMG.maThumbs, x + 780, 1250, 380);
    bubble(['IKUT POKET', 'SEMASA!'], x + 540, 900, 380, 170, x + 400, 990, 52, { 1: K.red });
  },
  // SEBAB 5
  function (x) {
    burst(x + 540, 380, 450, 220, K.yel, 20, 41);
    sebabTag(5, x);
    pow('KEBERKATAN', x + 540, 370, 120, K.red); pow('BESAR', x + 540, 480, 90, '#fff');
    panel(x + 70, 620, 940, 220, '#fff', -.01);
    txt('Rezeki keluarga makin lapang bila suami', x + 540, 700, F.m(36), K.ink, 'center');
    txt('galas tugas provider dengan jujur.', x + 540, 750, F.m(36), K.ink, 'center');
    txt('Tuhan luaskan rezeki & kemampuan kewangan.', x + 540, 805, F.b(34), K.red, 'center');
    img(IMG.baHeart, x + 210, 1250, 340); img(IMG.amUp, x + 450, 1250, 290); img(IMG.aiOpen, x + 660, 1250, 250); img(IMG.maHeart, x + 890, 1250, 330);
  },
  // KESIMPULAN + CTA
  function (x) {
    label('KESIMPULAN', x + 200, 120, 56, K.ink, K.yel);
    panel(x + 70, 190, 940, 230, '#fff', -.01);
    txt('Berani berbelanja ikut saiz poket sendiri.', x + 540, 270, F.m(36), K.ink, 'center');
    txt('Ketegasan kawal belanja = ekonomi', x + 540, 330, F.b(38), K.red, 'center');
    txt('keluarga kukuh jangka panjang.', x + 540, 380, F.b(38), K.red, 'center');
    bubble(['SETUJU ISTERI BANTU', 'BAYAR KOMITMEN?'], x + 540, 560, 860, 230, x + 300, 700, 62, { 1: K.red });
    txt('Kongsi di KOMEN ↓', x + 540, 735, F.bang(54), K.ink, 'center', 2);
    photoPanel(IMG.tiers, x + 560, 790, 450, 300, .5, .5, .02);
    label('Emas bulanan: kecil tapi konsisten', x + 785, 1135, 34, K.yel, K.ink, .02);
    img(IMG.baArms, x + 280, 1250, 440);
  },
];
