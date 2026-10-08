// Carousel kartun keluarga "5 Sebab Buka Akaun Emas Junior Untuk Anak Hari Ini" (8 slaid)
// Watak: Baba, Mami, Amani (kakak sulung), Aileen (adik)
var N = 8;
var BG = ['#FFF6E5', '#FFD1DC', '#CFE6FA', '#CFEFDF', '#FFEFA8', '#E6DAFB', '#CFE6FA', '#FFF6E5'];
var ASSETS = {
  amUp: 'amani-tangan-atas-gembira.png', amHeart: 'amani-peluk-hati.png', amThumb: 'amani-thumb-ungu.png', amPoint: 'amani-tunjuk-tepi.png',
  aiSulk: 'aileen-merajuk.png', aiOpen: 'aileen-depa-tangan.png', aiHeart: 'aileen-peluk-hati.png', aiWave: 'aileen-lambai-belang.png', aiFinger: 'aileen-jari-hati.png',
  maThink: 'mami-headphone-berfikir.png', maFinger: 'mami-jari-hati.png', maHeart: 'mami-peluk-hati.png', maThumbs: 'mami-dua-thumbs.png',
  baThink: 'baba-berfikir-polo.png', baOpen: 'baba-tangan-terbuka.png', baHeart: 'baba-peluk-hati.png', baCheer: 'baba-sorak-polo.png',
  dinar: 'kad-dinar-hijau-dua-pantai.jpg', tiers: 'set-jongkong-bertingkat-bunga-raya.jpg', bar100: 'jongkong-100g-kad-bunga-raya-meja.jpg', aurora: 'app-withdraw-aurora-kartun.jpg', binder: 'binder-kad-durian.jpg',
};
function sebab(n, x) { // big round number badge
  X.save(); X.translate(x + 140, 210); soft(() => { X.beginPath(); X.arc(0, 0, 80, 0, 7); }, 14, .2, 8);
  X.beginPath(); X.arc(0, 0, 80, 0, 7); X.fillStyle = K.white; X.fill(); X.lineWidth = 5; X.strokeStyle = K.ink; X.stroke();
  txt('SEBAB', 0, -22, F.t(26), K.brown, 'center'); txt('#' + n, 0, 44, F.t(70), K.red, 'center'); X.restore();
}
function sampul(cx, cy, s, rot) { // duit raya envelope
  X.save(); X.translate(cx, cy); X.rotate(rot); X.scale(s, s);
  soft(() => rr(-80, -110, 160, 220, 16), 12, .2, 8); rr(-80, -110, 160, 220, 16); X.fillStyle = '#3FA36B'; X.fill(); X.lineWidth = 4; X.strokeStyle = K.ink; X.stroke();
  X.beginPath(); X.moveTo(-80, -70); X.lineTo(0, -20); X.lineTo(80, -70); X.stroke();
  X.beginPath(); X.arc(0, 30, 30, 0, 7); X.fillStyle = K.gold; X.fill(); X.stroke(); txt('RM', 0, 40, F.t(26), K.ink, 'center'); X.restore();
}
function mykid(cx, cy, s, rot) {
  X.save(); X.translate(cx, cy); X.rotate(rot); X.scale(s, s);
  card(-200, -125, 400, 250, '#BFD9F5', 26); X.lineWidth = 4; X.strokeStyle = K.ink; rr(-200, -125, 400, 250, 26); X.stroke();
  X.save(); rr(-200, -125, 400, 250, 26); X.clip(); X.fillStyle = '#2F5FA8'; X.fillRect(-200, -125, 400, 64); X.restore();
  txt('MyKid', -175, -78, F.t(40), K.white);
  rr(-175, -40, 110, 140, 14); X.fillStyle = K.white; X.fill(); X.stroke();
  X.fillStyle = '#9DB6D8'; X.beginPath(); X.arc(-120, 5, 24, 0, 7); X.fill(); X.beginPath(); X.ellipse(-120, 85, 40, 32, 0, Math.PI, 0); X.fill();
  X.fillStyle = 'rgba(47,95,168,.4)'; [[-40, -20, 200], [-40, 20, 160], [-40, 60, 190]].forEach(([x, y, w]) => { rr(x, y, w, 16, 8); X.fill(); });
  X.restore();
}
function mathRow(x, y, items) { // [ [big, small], op, ... ]
  let cx = x;
  items.forEach(it => {
    if (typeof it === 'string') { txt(it, cx + 30, y + 30, F.t(70), K.red, 'center'); cx += 60; return; }
    const [big, small, hot] = it, w = Math.max(tw(big, F.t(76)), tw(small, F.b(26))) + 50;
    card(cx, y - 70, w, 150, hot ? K.butter : K.white, 28); X.lineWidth = 4; X.strokeStyle = K.ink; rr(cx, y - 70, w, 150, 28); X.stroke();
    txt(big, cx + w / 2, y + 22, F.t(76), hot ? K.red : K.ink, 'center'); txt(small, cx + w / 2, y + 60, F.b(26), K.brown, 'center');
    cx += w;
  });
}

var SLIDES = [
  // COVER
  function (x) {
    pill('AKAUN EMAS JUNIOR', x + 250, 140, 40, K.ink, K.butter, -.03);
    title('*5 Sebab* buka akaun emas untuk anak hari ini', x + 80, 290, 96, 920);
    pill('Sebab #3 buat ramai ibu bapa terdiam', x + 400, 600, 32, K.white, K.red, .02);
    photoCard(IMG.aurora, x + 770, 860, 330, 330, .06, '', .5, .62);
    chara(IMG.amUp, x + 260, 1215, 440); chara(IMG.aiOpen, x + 600, 1215, 330);
    sparkle(x + 950, 700, 26); sparkle(x + 560, 760, 20);
  },
  // HOOK
  function (x) {
    title('Duit raya anak tahun lepas, *mana dia sekarang?*', x + 80, 200, 86, 920);
    card(x + 80, 460, 600, 120); txt('🧸', x + 140, 540, F.t(54), K.ink, 'center'); txt('Sebahagian jadi mainan.', x + 200, 535, F.b(38), K.ink);
    card(x + 80, 610, 600, 160); txt('🏠', x + 140, 710, F.t(54), K.ink, 'center'); txt('Sebahagian “tumpang”', x + 200, 680, F.b(38), K.ink); txt('belanja rumah.', x + 200, 730, F.b(38), K.ink);
    sampul(x + 850, 560, 1, .12);
    chara(IMG.aiSulk, x + 270, 1215, 380); chara(IMG.maThink, x + 760, 1215, 380);
    bubble(['Tahun ini boleh jadi', '*tahun ceritanya berubah.'], x + 540, 880, 640, 170, x + 700, 980, 40);
  },
  // SEBAB 1
  function (x) {
    sebab(1, x);
    title('Boleh mula seawal *usia sehari*', x + 260, 200, 80, 700);
    para('Satu anak, satu akaun, guna MyKid. Tak perlu tunggu anak besar untuk mula bina asetnya.', x + 80, 470, 900, 40);
    mykid(x + 740, 800, 1, .05);
    chara(IMG.aiFinger, x + 260, 1215, 400); chara(IMG.maFinger, x + 760, 1215, 300);
    heart(x + 470, 900, 26);
  },
  // SEBAB 2
  function (x) {
    sebab(2, x);
    title('Duit raya jadi *aset*, bukan jadi habuk', x + 260, 200, 80, 700);
    para('Duit raya yang ditukar jadi gram emas tak akan “tumpang belanja” sesiapa.', x + 80, 470, 900, 40);
    sampul(x + 180, 760, .9, -.1);
    X.save(); X.lineWidth = 8; X.strokeStyle = K.ink; X.lineCap = 'round'; X.beginPath(); X.moveTo(x + 280, 760); X.quadraticCurveTo(x + 360, 700, x + 440, 760); X.stroke(); X.beginPath(); X.moveTo(x + 420, 735); X.lineTo(x + 445, 762); X.lineTo(x + 412, 774); X.stroke(); X.restore();
    photoCard(IMG.dinar, x + 700, 760, 420, 300, .04, 'gram emas sebenar', .5, .5);
    chara(IMG.amThumb, x + 260, 1215, 330);
    bubble(['Setiap raya, gram', '*bertambah. Tradisi cantik!'], x + 700, 1080, 560, 150, x + 400, 1100, 36);
  },
  // SEBAB 3 (matematik)
  function (x) {
    sebab(3, x);
    title('Matematik yang buat *ramai terdiam*', x + 260, 200, 80, 700);
    mathRow(x + 80, 520, [['1g', 'sebulan'], '×', ['12', 'bulan'], '×', ['18', 'tahun'], '=', ['216g', 'umur 18', true]]);
    para('Modal pendidikan yang mengekalkan kuasa beli.', x + 80, 700, 900, 40, K.ink);
    photoCard(IMG.tiers, x + 760, 960, 360, 280, .05, '', .5, .55);
    chara(IMG.baThink, x + 280, 1215, 420);
    bubble(['Masuk universiti', '*tanpa PTPTN?'], x + 560, 830, 380, 150, x + 400, 900, 38);
  },
  // SEBAB 4
  function (x) {
    sebab(4, x);
    title('Simpanan tunai *kalah* dengan kos pendidikan', x + 260, 200, 74, 700);
    para('Kos universiti naik setiap tahun. Simpanan nombor tak mampu kejar.', x + 80, 470, 900, 40);
    card(x + 80, 600, 920, 200, K.white);
    txt('Emas naik purata', x + 540, 670, F.b(38), K.brown, 'center');
    txt('~10% setahun', x + 540, 750, F.t(72), K.green, 'center');
    txt('dalam rekod 20 tahun · prestasi lalu bukan jaminan', x + 540, 790, F.b(24), K.brown, 'center');
    photoCard(IMG.bar100, x + 790, 1020, 300, 240, .06, '', .5, .5);
    chara(IMG.baOpen, x + 330, 1215, 360);
  },
  // SEBAB 5
  function (x) {
    sebab(5, x);
    title('Didik anak simpan *nilai*, bukan nombor', x + 260, 200, 80, 700);
    para('Anak yang tengok gram emasnya bertambah belajar sesuatu yang sekolah tak ajar.', x + 80, 470, 900, 40);
    pill('Warisan ilmu > emas itu sendiri', x + 540, 640, 40, K.ink, K.butter);
    photoCard(IMG.binder, x + 800, 900, 300, 260, -.05, '', .5, .5);
    chara(IMG.amPoint, x + 250, 1215, 400); chara(IMG.aiWave, x + 560, 1215, 320);
  },
  // CLOSING / CTA
  function (x) {
    para('Anak takkan ingat mainan yang dibeli dengan duit raya tahun ini.', x + 540, 170, 880, 40, K.brown, 'center');
    title('Tapi 18 tahun lagi, dia akan *berterima kasih*', x + 540, 330, 84, 900, 'center');
    title('atas gram yang Anda simpan hari ini.', x + 540, 520, 56, 900, 'center');
    chara(IMG.baHeart, x + 170, 1215, 400); chara(IMG.maHeart, x + 900, 1215, 390);
    chara(IMG.amHeart, x + 420, 1215, 320); chara(IMG.aiHeart, x + 660, 1215, 290);
    sparkle(x + 540, 780, 30); heart(x + 300, 800, 22); heart(x + 780, 800, 22);
  },
];
