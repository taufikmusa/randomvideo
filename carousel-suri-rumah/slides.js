// carousel-maroon: "Suri rumah tanpa gaji pun boleh menyimpan" (8 slaid). Selfie Taufik hanya slaid terakhir.
var N = 8;
var ASSETS = { taufik: 'peluk-tubuh.png', binder: 'koleksi-binder-kad.jpg', green: 'kad-hijau-syiling-pantai.jpg', kg: 'jongkong-1kg-tapak-tangan.jpg',
  tiers: 'set-jongkong-bertingkat-bunga-raya.jpg', bar100: 'jongkong-100g-kad-bunga-raya-meja.jpg', wallet: 'dompet-wealthcard-safari.jpg', k50: 'kad-50g-bunga-raya.jpg', merak: 'jongkong-merak-100g-dulang-merah.jpg', app: 'app-gap-taufik-harga-8okt2026.jpg' };

const ic = {
  basket: () => { X.beginPath(); X.moveTo(-34, -8); X.lineTo(34, -8); X.lineTo(24, 30); X.lineTo(-24, 30); X.closePath(); X.stroke(); X.beginPath(); X.arc(0, -8, 22, Math.PI, 0); X.stroke(); },
  gift: () => { X.strokeRect(-28, -6, 56, 38); X.strokeRect(-32, -18, 64, 14); X.beginPath(); X.moveTo(0, -18); X.lineTo(0, 32); X.stroke(); X.beginPath(); X.ellipse(-12, -26, 12, 8, -.5, 0, 7); X.ellipse(12, -26, 12, 8, .5, 0, 7); X.stroke(); },
  shield: () => { X.beginPath(); X.moveTo(0, -34); X.lineTo(28, -22); X.lineTo(26, 8); X.quadraticCurveTo(18, 28, 0, 36); X.quadraticCurveTo(-18, 28, -26, 8); X.lineTo(-28, -22); X.closePath(); X.stroke(); X.beginPath(); X.moveTo(-12, 0); X.lineTo(-2, 10); X.lineTo(14, -10); X.stroke(); },
  phone: () => { rr(-20, -34, 40, 68, 8); X.stroke(); X.beginPath(); X.arc(0, 24, 3, 0, 7); X.fill(); },
  up: () => { X.beginPath(); X.moveTo(-30, 26); X.lineTo(-8, 2); X.lineTo(6, 14); X.lineTo(30, -16); X.stroke(); X.beginPath(); X.moveTo(14, -18); X.lineTo(30, -16); X.lineTo(28, 0); X.stroke(); },
};

var SLIDES = [
  // COVER
  function (x) {
    bgPhoto(x, IMG.binder, 14, .42);
    headline('"Saya Mana Ada', x + 540, 190, 84);
    headline('Gaji Sendiri..."', x + 540, 295, 84);
    pillTitle(['Macam Mana', 'Nak Menyimpan?'], x + 540, 430, 88);
    strokes(x + 110, 470, 1, -.9); strokes(x + 970, 470, 1, .9);
    sub('Keluhan ramai suri rumah. Padahal anda ada kuasa kewangan luar biasa yang ramai tak perasan.', x + 540, 690, 860, 36);
    photoCard(IMG.k50, x + 540, 1030, 360, 260, -.04, .5, .5);
    sparkle(x + 250, 950, 28); sparkle(x + 840, 1130, 22); curlyArrow(x + 870, 880, x + 760, 980);
  },
  // SENARAI
  function (x) {
    bgPhoto(x, IMG.merak, 16, .45);
    headline('5 Kuasa Kewangan', x + 540, 190, 80);
    pillTitle(['Suri Rumah'], x + 540, 320, 100);
    strokes(x + 170, 330, 1, -.9); strokes(x + 910, 330, 1, .9);
    ['Lebihan duit dapur', 'Duit hadiah & duit raya', 'Maruah & ketenangan', 'Urus 100% dari telefon', 'Paling faham harga naik'].forEach((s, i) => {
      const y = 500 + i * 118; shadow(() => { rr(x + 130, y, 820, 96, 24); X.fillStyle = K.cream; X.fill(); }, 16, .4, 6);
      X.beginPath(); X.arc(x + 182, y + 48, 32, 0, 7); X.fillStyle = K.maroon; X.fill(); txt(String(i + 1), x + 182, y + 63, F.hh(38), K.gold, 'center');
      txt(s, x + 240, y + 61, F.b(36), K.ink);
    });
  },
  // 1 duit dapur
  function (x) {
    bgPhoto(x, IMG.bar100, 16, .45);
    pillTitle(['1- Lebihan Duit Dapur'], x + 540, 190, 70);
    sub('Pengurusan belanja rumah yang teliti selalu ada baki.', x + 540, 330, 860, 38);
    badge(x + 540, 530, 100, ic.basket);
    tierCard(x + 290, 680, 500, 420, 'MULA DENGAN', 'RM100', 'sebulan dah cukup untuk mula');
  },
  // 2 duit hadiah
  function (x) {
    bgPhoto(x, IMG.green, 16, .45);
    pillTitle(['2- Duit Hadiah', '& Duit Raya'], x + 540, 180, 76);
    sub('Duit yang masuk sekali-sekala...', x + 540, 430, 860, 38);
    badge(x + 540, 600, 100, ic.gift);
    rowPill(x + 110, 760, 860, 'Tak disimpan', 'LESAP', 'tanpa kesan');
    rowPill(x + 110, 880, 860, 'Tukar jadi', 'GRAM', 'emas kekal');
    photoCard(IMG.green, x + 540, 1130, 400, 130, .02, .5, .5);
  },
  // 3 maruah
  function (x) {
    bgPhoto(x, IMG.kg, 16, .5);
    pillTitle(['3- Maruah &', 'Ketenangan'], x + 540, 180, 82);
    badge(x + 540, 520, 100, ic.shield);
    whiteCard(x + 110, 660, 860, ['Ada aset atas nama sendiri', '*bukan sebab tak percaya suami,', 'tapi persediaan bila', 'berlaku kecemasan.'], 42);
    photoCard(IMG.kg, x + 540, 1130, 400, 130, -.02, .5, .45);
  },
  // 4 telefon
  function (x) {
    bgPhoto(x, IMG.wallet, 16, .45);
    pillTitle(['4- Urus 100%', 'Dari Telefon'], x + 540, 180, 82);
    sub('Tak perlu keluar rumah atau beratur di bank. Semuanya di hujung jari.', x + 540, 440, 860, 36);
    photoCard(IMG.app, x + 340, 870, 360, 480, -.05, .5, .3);
    badge(x + 800, 740, 90, ic.phone);
    [['Tak keluar', 'rumah'], ['Tak beratur', 'di bank']].forEach(([a, b], i) => { const y = 880 + i * 150; shadow(() => { rr(x + 640, y, 340, 120, 24); X.fillStyle = K.cream; X.fill(); }, 14, .4, 6); txt(a, x + 810, y + 52, F.b(32), K.ink, 'center'); txt(b, x + 810, y + 94, F.h(32), K.maroon, 'center'); });
  },
  // 5 harga naik
  function (x) {
    bgPhoto(x, IMG.tiers, 16, .5);
    pillTitle(['5- Paling Faham', 'Harga Naik'], x + 540, 180, 82);
    sub('Anda yang rasa sendiri kuasa beli wang kertas makin menyusut setiap minggu.', x + 540, 440, 860, 36);
    badge(x + 540, 640, 90, ic.up);
    rowPill(x + 110, 780, 860, 'Barang dapur', 'NAIK', 'setiap minggu');
    rowPill(x + 110, 900, 860, 'Wang kertas', 'SUSUT', 'kuasa belinya');
    whiteCard(x + 110, 1030, 860, ['*Anda lebih tahu dari sesiapa.'], 40);
  },
  // CTA (selfie di sini sahaja)
  function (x) {
    bgPhoto(x, IMG.merak, 16, .45);
    headline('Tak Ada Gaji Bukan', x + 540, 170, 74);
    headline('Penghalang Kaya.', x + 540, 265, 74);
    sub('Yang membina simpanan bukan status pekerjaan,', x + 540, 360, 980, 32);
    pillTitle(['Tapi', 'Kebijaksanaan!'], x + 540, 520, 92);
    strokes(x + 110, 570, 1, -.9); strokes(x + 970, 570, 1, .9);
    cutout(IMG.taufik, x + 790, SH - 40, 560);
    shadow(() => { rr(x + 60, 840, 520, 250, 30); X.fillStyle = 'rgba(20,8,6,.75)'; X.fill(); }, 20, .4, 8);
    txt('Mula dari duit dapur.', x + 90, 900, F.b(30), K.white);
    txt('Serendah RM100', x + 90, 955, F.b(32), K.gold); txt('melalui Akaun', x + 90, 1005, F.b(32), K.gold); txt('Emas GAP.', x + 90, 1055, F.b(32), K.gold);
    shadow(() => { rr(x + 60, 1110, 520, 110, 55); X.fillStyle = K.maroon; X.fill(); }, 20, .4, 8);
    txt('Nak mula? DM saya!', x + 320, 1180, F.h(40), K.white, 'center');
  },
];
