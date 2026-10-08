// carousel-maroon: "Harga mahal kerja gig" (8 slaid). Selfie Taufik hanya slaid terakhir.
var N = 8;
var ASSETS = { taufik: 'thumb-dada.png', stand: 'jongkong-berdiri-meja-hitam.jpg', dinar: 'dinar-10-closeup-koleksi-hitam.jpg', tikar: 'jongkong-50g-100g-atas-kad-tikar.jpg',
  timbun: 'timbunan-jongkong-50g-100g-tikar.jpg', d10: 'kad-10-dinar-dulang-hitam.jpg', wallet: 'dompet-wealthcard-safari.jpg', sizes: 'jongkong-1kg-250g-100g-50g-buku-guru.jpg', taifook: 'kad-taifook-4-saiz-tangan.jpg' };

const ic = {
  moto: () => { X.beginPath(); X.arc(-24, 18, 14, 0, 7); X.stroke(); X.beginPath(); X.arc(26, 18, 14, 0, 7); X.stroke(); X.beginPath(); X.moveTo(-24, 18); X.lineTo(-6, -6); X.lineTo(16, -6); X.lineTo(26, 18); X.moveTo(10, -6); X.lineTo(4, -22); X.lineTo(16, -22); X.stroke(); },
  boss: () => { X.beginPath(); X.arc(0, -14, 14, 0, 7); X.stroke(); X.beginPath(); X.moveTo(-26, 30); X.quadraticCurveTo(0, 0, 26, 30); X.stroke(); X.beginPath(); X.moveTo(-34, -40); X.lineTo(34, 40); X.stroke(); },
  wave: () => { X.beginPath(); for (let i = 0; i <= 60; i++) { const xx = -34 + i * 68 / 60, yy = Math.sin(i / 60 * Math.PI * 2) * 20; i ? X.lineTo(xx, yy) : X.moveTo(xx, yy); } X.stroke(); },
  bolt: () => { X.beginPath(); X.moveTo(6, -36); X.lineTo(-18, 6); X.lineTo(2, 6); X.lineTo(-6, 36); X.lineTo(20, -8); X.lineTo(0, -8); X.closePath(); X.fill(); },
  net: () => { X.beginPath(); X.moveTo(-34, -10); X.quadraticCurveTo(0, 40, 34, -10); X.stroke(); for (let i = -2; i <= 2; i++) { X.beginPath(); X.moveTo(i * 14, -10); X.lineTo(i * 9, 20); X.stroke(); } X.beginPath(); X.moveTo(-26, 4); X.quadraticCurveTo(0, 20, 26, 4); X.stroke(); },
  flex: () => { X.beginPath(); X.arc(0, 0, 28, .3, 5.9); X.stroke(); X.beginPath(); X.moveTo(24, -24); X.lineTo(28, -4); X.lineTo(8, -8); X.stroke(); },
};
function moonBars(x, y) { // bulan lebat vs kemarau mini chart
  const vals = [.9, .35, .8, .25, .95, .3];
  vals.forEach((v, i) => { const bx = x + i * 130, h = v * 260; shadow(() => { rr(bx, y - h, 90, h, 14); X.fillStyle = v > .5 ? K.gold : K.maroon; X.fill(); }, 12, .4, 6); txt(v > .5 ? 'lebat' : 'kemarau', bx + 45, y + 40, F.b(24), K.white, 'center'); });
}

var SLIDES = [
  // COVER
  function (x) {
    bgPhoto(x, IMG.stand, 14, .45);
    headline('Kerja Gig Memang Seronok.', x + 540, 170, 70);
    sub('Tiada bos. Tiada waktu pejabat. Pendapatan ikut usaha sendiri.', x + 540, 250, 860, 34);
    pillTitle(['Tapi Ada', 'Harga Mahal...'], x + 540, 430, 96);
    strokes(x + 110, 470, 1, -.9); strokes(x + 970, 470, 1, .9);
    sub('yang ramai rider & freelancer tak sedar.', x + 540, 690, 860, 36, K.gold);
    [['moto', 'Rider'], ['boss', 'Tiada bos'], ['flex', 'Bebas masa']].forEach(([k, l], i) => { const cx = x + 220 + i * 320; badge(cx, 880, 80, ic[k]); txt(l, cx, 1010, F.b(32), K.white, 'center'); });
    sparkle(x + 120, 760, 26); sparkle(x + 960, 1080, 22);
  },
  // SENARAI
  function (x) {
    bgPhoto(x, IMG.dinar, 16, .5);
    headline('5 Harga Mahal', x + 540, 190, 84);
    pillTitle(['Kerja Gig'], x + 540, 320, 100);
    strokes(x + 190, 330, 1, -.9); strokes(x + 890, 330, 1, .9);
    ['Tiada potongan automatik', 'Pendapatan pasang surut', 'Rasa kaya bila order kencang', 'Tiada jaring keselamatan', 'Penyelesaian: emas fleksibel'].forEach((s, i) => {
      const y = 500 + i * 118; shadow(() => { rr(x + 110, y, 860, 96, 24); X.fillStyle = K.cream; X.fill(); }, 16, .4, 6);
      X.beginPath(); X.arc(x + 162, y + 48, 32, 0, 7); X.fillStyle = i === 4 ? K.gold : K.maroon; X.fill(); txt(String(i + 1), x + 162, y + 63, F.hh(38), i === 4 ? K.maroon : K.gold, 'center');
      txt(s, x + 220, y + 61, F.b(35), K.ink);
    });
  },
  // 1
  function (x) {
    bgPhoto(x, IMG.tikar, 16, .5);
    pillTitle(['1- Tiada Potongan', 'Automatik'], x + 540, 180, 80);
    sub('Tiada majikan tolong potongkan simpanan hari tua.', x + 540, 440, 860, 38);
    tierCard(x + 110, 540, 400, 400, 'PEKERJA GAJI', 'AUTO', 'majikan potong simpanan');
    tierCard(x + 570, 540, 400, 400, 'KERJA GIG', 'ANDA', 'kena potong sendiri');
    whiteCard(x + 110, 1010, 860, ['*Jadi majikan untuk diri sendiri.'], 44);
  },
  // 2
  function (x) {
    bgPhoto(x, IMG.timbun, 16, .5);
    pillTitle(['2- Pendapatan', 'Pasang Surut'], x + 540, 180, 82);
    sub('Duit bulan lebat selalu habis sebelum sampai bulan kemarau.', x + 540, 440, 860, 36);
    moonBars(x + 170, 900);
    whiteCard(x + 110, 1010, 860, ['Simpan masa lebat,', '*untuk tampung masa kemarau.'], 40);
  },
  // 3
  function (x) {
    bgPhoto(x, IMG.d10, 16, .5);
    pillTitle(['3- Rasa Kaya Bila', 'Order Kencang'], x + 540, 180, 76);
    badge(x + 540, 520, 100, ic.bolt);
    rowPill(x + 110, 680, 860, 'Duit masuk', 'LAJU', '');
    rowPill(x + 110, 800, 860, 'Belanja', 'LAJU', 'juga');
    whiteCard(x + 110, 950, 860, ['Simpan waktu lebat,', '*supaya tak sesak waktu gawat.'], 42);
  },
  // 4
  function (x) {
    bgPhoto(x, IMG.sizes, 16, .5);
    pillTitle(['4- Tiada Jaring', 'Keselamatan'], x + 540, 180, 82);
    badge(x + 540, 520, 100, ic.net);
    sub('Bila motor rosak atau badan jatuh sakit...', x + 540, 690, 860, 38);
    headline('Pendapatan Terus Terhenti', x + 540, 820, 58, K.gold);
    headline('Hari Itu Juga.', x + 540, 900, 58, K.gold);
    photoCard(IMG.wallet, x + 540, 1100, 520, 180, .02, .5, .5);
  },
  // 5
  function (x) {
    bgPhoto(x, IMG.taifook, 16, .5);
    pillTitle(['5- Emas Padan', 'Dengan Kerja Gig'], x + 540, 180, 80);
    sub('Fleksibiliti emas sama macam fleksibiliti kerja anda.', x + 540, 440, 860, 36);
    tierCard(x + 110, 540, 400, 400, 'KOMITMEN', 'TIADA', 'bulanan wajib');
    tierCard(x + 570, 540, 400, 400, 'ADA UNTUNG', 'SIMPAN', 'waktu ketat boleh rehat');
    photoCard(IMG.taifook, x + 540, 1100, 520, 180, -.02, .5, .45);
  },
  // CTA (selfie di sini sahaja)
  function (x) {
    bgPhoto(x, IMG.stand, 16, .5);
    sub('Kebebasan kerja gig hanya bermakna kalau poket anda juga bebas daripada kebimbangan.', x + 540, 150, 920, 34);
    headline('Kuncinya Bukan Bawa', x + 540, 320, 72);
    headline('Order Laju.', x + 540, 410, 72);
    pillTitle(['Tapi Disiplin', 'Menabung!'], x + 540, 540, 92);
    strokes(x + 110, 590, 1, -.9); strokes(x + 970, 590, 1, .9);
    cutout(IMG.taufik, x + 800, SH - 40, 540);
    shadow(() => { rr(x + 60, 860, 520, 230, 30); X.fillStyle = 'rgba(20,8,6,.75)'; X.fill(); }, 20, .4, 8);
    txt('Tiada komitmen wajib.', x + 90, 920, F.b(30), K.white);
    txt('Mula serendah RM100', x + 90, 975, F.b(32), K.gold); txt('melalui Akaun Emas GAP.', x + 90, 1025, F.b(32), K.gold);
    shadow(() => { rr(x + 60, 1110, 520, 110, 55); X.fillStyle = K.maroon; X.fill(); }, 20, .4, 8);
    txt('Nak mula? DM saya!', x + 320, 1180, F.h(40), K.white, 'center');
  },
];
