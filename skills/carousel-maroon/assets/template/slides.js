// carousel-maroon: "5 Kesilapan Fresh Grad" (9 slaid). Selfie Taufik hanya slaid terakhir.
var N = 9;
var ASSETS = { taufik: 'taufik-thumbs-up.png', dulang: 'dulang-merah-1kg-koleksi-penuh.jpg', standing: 'jongkong-berdiri-meja-hitam.jpg', ipad: 'kad-dinar-dan-app-gap-ipad.jpg',
  bar100: 'jongkong-100g-kad-bungamas-meja.jpg', tiers: 'set-jongkong-bertingkat-bungamas.jpg', wallet: 'dompet-wealthcard-safari.jpg', balloon: 'dinar-10-atas-hutan-belon.jpg', kg: 'jongkong-1kg-tapak-tangan.jpg', app: 'app-gap-taufik-harga-8okt2026.jpg' };

const icon = {
  car: () => { X.beginPath(); X.moveTo(-30, 8); X.lineTo(-22, -12); X.lineTo(22, -12); X.lineTo(30, 8); X.stroke(); X.strokeRect(-36, 8, 72, 20); X.beginPath(); X.arc(-20, 30, 7, 0, 7); X.arc(20, 30, 7, 0, 7); X.fill(); },
  phone: () => { rr(-18, -32, 36, 64, 8); X.stroke(); X.beginPath(); X.arc(0, 22, 3, 0, 7); X.fill(); },
  zero: () => { txt('0', 0, 18, F.hh(52), K.gold, 'center'); },
  clock: () => { X.beginPath(); X.arc(0, 0, 30, 0, 7); X.stroke(); X.beginPath(); X.moveTo(0, 0); X.lineTo(0, -18); X.moveTo(0, 0); X.lineTo(14, 8); X.stroke(); },
  repeat: () => { X.beginPath(); X.arc(0, 0, 26, .5, 5.5); X.stroke(); X.beginPath(); X.moveTo(22, -26); X.lineTo(24, -12); X.lineTo(10, -12); X.stroke(); },
  split: () => { X.strokeRect(-34, -22, 30, 44); X.strokeRect(4, -22, 30, 44); },
};

var SLIDES = [
  // COVER
  function (x) {
    bgPhoto(x, IMG.dulang, 14, .4);
    headline('Gaji Pertama Masuk,', x + 540, 190, 76);
    headline('Rasa Dunia', x + 540, 290, 92);
    pillTitle(['Milik Kita!'], x + 540, 410, 96);
    strokes(x + 120, 350, 1, -.9); strokes(x + 960, 350, 1, .9);
    sub('Tapi bila genap setahun kerja, baki akaun bank masih kosong?', x + 540, 540, 820, 38);
    underline(x + 400, x + 680, 640);
    photoCard(IMG.app, x + 540, 960, 380, 470, -.04, .5, .32);
    sparkle(x + 260, 820, 30); sparkle(x + 830, 1080, 24); curlyArrow(x + 880, 760, x + 760, 880);
  },
  // PUNCA
  function (x) {
    bgPhoto(x, IMG.standing, 16, .45);
    headline('Puncanya Bukan', x + 540, 190, 80);
    headline('Sebab Gaji Kecil.', x + 540, 290, 80);
    pillTitle(['5 Kesilapan', 'Fresh Grad'], x + 540, 420, 100);
    strokes(x + 140, 470, 1, -.9); strokes(x + 940, 470, 1, .9);
    ['Upgrade gaya hidup dulu', 'Tunggu "dah stabil"', 'Tunggu gaji naik', 'Duit campur satu akaun', '"Muda untuk enjoy"'].forEach((s, i) => {
      const y = 700 + i * 106; shadow(() => { rr(x + 130, y, 820, 88, 22); X.fillStyle = K.cream; X.fill(); }, 16, .4, 6);
      X.beginPath(); X.arc(x + 180, y + 44, 30, 0, 7); X.fillStyle = K.maroon; X.fill(); txt(String(i + 1), x + 180, y + 58, F.hh(36), K.gold, 'center');
      txt(s, x + 235, y + 57, F.b(34), K.ink);
    });
  },
  // 1
  function (x) {
    bgPhoto(x, IMG.kg, 16, .45);
    pillTitle(['1- Upgrade Gaya Hidup'], x + 540, 190, 70);
    sub('Gaji baru masuk, terus tukar kereta dan gajet...', x + 540, 330, 860, 38);
    [['car', 'Kereta baru'], ['phone', 'Gajet baru'], ['zero', 'Tabung kecemasan']].forEach(([k, l], i) => { const cx = x + 220 + i * 320; badge(cx, 520, 80, icon[k]); txt(l, cx, 650, F.b(32), K.white, 'center'); });
    X.save(); X.strokeStyle = K.gold; X.lineWidth = 8; X.beginPath(); X.ellipse(x + 860, 560, 150, 120, -.1, 0, 7); X.stroke(); X.restore();
    whiteCard(x + 110, 760, 860, ['Upgrade gaya hidup', '*sebelum upgrade simpanan.', 'Tabung kecemasan: SIFAR.'], 42);
    photoCard(IMG.wallet, x + 540, 1150, 360, 150, .03, .5, .5);
  },
  // 2
  function (x) {
    bgPhoto(x, IMG.balloon, 16, .4);
    pillTitle(['2- "Tunggu Dah Stabil"'], x + 540, 190, 70);
    sub('Fikir simpan emas kena tunggu hidup stabil dulu.', x + 540, 330, 860, 38);
    tierCard(x + 110, 450, 400, 420, 'UMUR', '23', 'masa terbaik untuk mula');
    tierCard(x + 570, 450, 400, 420, 'ASET', 'MASA', 'paling mahal yang anda ada');
    strokes(x + 540, 470, .9, 0);
    whiteCard(x + 110, 940, 860, ['Aset paling mahal', '*bukan duit, tapi MASA.'], 46);
  },
  // 3
  function (x) {
    bgPhoto(x, IMG.bar100, 16, .45);
    pillTitle(['3- Tunggu Gaji Naik'], x + 540, 190, 74);
    sub('Baru nak menabung bila gaji naik nanti...', x + 540, 330, 860, 38);
    badge(x + 540, 520, 100, icon.clock);
    headline('"Nanti" tu jarang sampai.', x + 540, 720, 64, K.gold);
    rowPill(x + 110, 800, 860, 'Yang penting', 'TABIAT', '');
    rowPill(x + 110, 920, 860, 'Bukan', 'JUMLAH', '');
    photoCard(IMG.tiers, x + 540, 1150, 380, 140, -.02, .5, .55);
  },
  // 4
  function (x) {
    bgPhoto(x, IMG.ipad, 16, .45);
    pillTitle(['4- Duit Campur', 'Satu Akaun'], x + 540, 180, 72);
    sub('Duit belanja dan duit simpan dalam akaun yang sama.', x + 540, 420, 860, 38);
    tierCard(x + 110, 520, 400, 400, 'BELANJA', 'BANK', 'untuk guna harian');
    tierCard(x + 570, 520, 400, 400, 'SIMPAN', 'GRAM', 'asingkan ke akaun emas');
    badge(x + 540, 720, 54, icon.split);
    whiteCard(x + 110, 980, 860, ['Bila tak diasingkan,', '*semuanya lesap jadi belanja.'], 40);
  },
  // 5
  function (x) {
    bgPhoto(x, IMG.dulang, 18, .5);
    pillTitle(['5- "Muda Untuk', 'Enjoy Je"'], x + 540, 180, 80);
    sub('Anggap waktu muda cuma untuk enjoy, simpanan tolak tepi.', x + 540, 440, 860, 38);
    photoCard(IMG.balloon, x + 330, 760, 380, 300, -.05, .5, .5);
    photoCard(IMG.standing, x + 760, 780, 360, 300, .05, .5, .5);
    txt('ENJOY', x + 330, 960, F.hh(40), K.white, 'center'); txt('SIMPAN', x + 760, 980, F.hh(40), K.gold, 'center');
    whiteCard(x + 110, 1020, 860, ['Enjoy boleh,', '*tapi simpan dulu sebahagian.'], 40);
  },
  // HAKIKAT (tier comparison)
  function (x) {
    bgPhoto(x, IMG.kg, 16, .5);
    pillTitle(['Hakikatnya...'], x + 540, 180, 84);
    sub('Siapa lebih senang kumpul aset?', x + 540, 320, 860, 40);
    tierCard(x + 90, 400, 430, 470, 'UMUR 23', 'RM100', 'sebulan, mula awal');
    tierCard(x + 560, 400, 430, 470, 'UMUR 35', 'RM500', 'sebulan, mula lambat');
    strokes(x + 540, 420, .9, 0);
    whiteCard(x + 90, 930, 900, ['Mula umur 23 dengan RM100', '*jauh lebih senang', 'daripada RM500 pada umur 35.'], 42);
  },
  // CTA (selfie di sini sahaja)
  function (x) {
    bgPhoto(x, IMG.tiers, 16, .45);
    headline('Bukan Sebab Dia', x + 540, 180, 80);
    headline('Simpan Lebih.', x + 540, 280, 80);
    pillTitle(['Tapi Sebab Dia', 'Mula Awal!'], x + 540, 400, 92);
    strokes(x + 110, 450, 1, -.9); strokes(x + 970, 450, 1, .9);
    cutout(IMG.taufik, x + 760, SH - 40, 700);
    shadow(() => { rr(x + 60, 820, 520, 260, 30); X.fillStyle = 'rgba(20,8,6,.75)'; X.fill(); }, 20, .4, 8);
    txt('Tak perlu tunggu duit banyak.', x + 90, 880, F.b(30), K.white);
    txt('Mula serendah', x + 90, 935, F.b(32), K.gold); txt('RM100 melalui', x + 90, 985, F.b(32), K.gold); txt('Akaun Emas GAP.', x + 90, 1035, F.b(32), K.gold);
    shadow(() => { rr(x + 60, 1110, 520, 110, 55); X.fillStyle = K.maroon; X.fill(); }, 20, .4, 8);
    txt('Nak mula? DM saya!', x + 320, 1180, F.h(40), K.white, 'center');
  },
];
