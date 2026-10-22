// scenes.js — "5 Sebab Petani & Nelayan Paling Perlu Emas Fizikal" (96.0s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 96.000998, DUR = VOICE + 6, HEADN = 2880;
const PH = {
  wallet: 'dompet-wealthcard-safari.jpg', tiers: 'set-jongkong-bertingkat-bungamas.jpg', kg: 'jongkong-1kg-tapak-tangan.jpg', ipad: 'kad-dinar-dan-app-gap-ipad.jpg', shop: 'kad-taifook-depan-kedai-public-gold.jpg',
  bungamas: 'jongkong-100g-kad-bungamas-ungu.jpg', merak5: 'kad-ungu-merak-5g.jpg', g250: 'jongkong-250g-merah.jpg', dulang: 'dulang-merah-1kg-koleksi-penuh.jpg', merak100: 'jongkong-merak-100g-dulang-merah.jpg',
  bunga50: 'kad-50g-bunga-raya.jpg', syiling: 'kad-hijau-syiling-pantai.jpg', dinarPantai: 'kad-dinar-hijau-dua-pantai.jpg', binder: 'koleksi-binder-kad.jpg',
};
const ttl = (lt, label, size = 96) => { anim(lt, .05, 540, 270, () => mPill([label], 540, 270, size)); anim(lt, .05, 540, 270, () => MA.side(300)); };
const row = (lt, at, y, l, r) => anim(lt, at, 540, y + 55, () => mRow(60, y, 960, l, r));
const SB = mamiY - 45;
const CTA = (lt, hero, h) => {
  anim(lt, .05, 540, 250, () => mHead('Dah Ready Nak Mula?', 540, 260, 84));
  anim(lt, .3, 540, 430, () => mPill(['Mula Simpan Emas', 'Hari Ini'], 540, 380, 100)); anim(lt, .3, 540, 430, () => MA.side(450));
  anim(lt, 3.6, 540, 760, () => mHead('Dulu Ragu, Kini Tahu!', 540, 770, 80, MA.K.gold));
  anim(lt, 2.0, 540, 900, () => { shadow(() => { rr(180, 850, 720, 120, 60); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Rujuk Pin Video', 540, 930, MA.F.h(54), '#fff', 'center'); });
  stk(lt, .6, hero, 540, SB, h);
};
const BAKE = ['tiers', 'kg', 'dulang', 'merak100', 'bunga50', 'syiling', 'g250', 'dinarPantai', 'shop', 'ipad', 'binder', 'bungamas', 'wallet', 'merak5'];
function bakeAll() { BAKE.forEach(k => { BGS[k] = MA.bgPhoto(k, 16, .45); }); }
const ASSETS = { ...PH, sPenampan: 'stk-penampan-kecemasan.png', sTabung: 'stk-tabung-persaraan.png', sSelamat: 'stk-emas-lebih-selamat.png', sKemampuan: 'stk-simpan-ikut-kemampuan.png', sTradisi: 'stk-tradisi-tanah-emas.png', sTengkujuh: 'stk-musim-tengkujuh.png', sTerhimpit: 'stk-jangan-terhimpit.png', sBertimbun: 'stk-emas-bertimbun.png', sKunci: 'stk-kunci-hasil-tuaian.png' };

const SEG = [
  [0, 4.54, '*5 *sebab *pertani dan *nelayan paling perlu *emas *fizikal.'],
  [4.54, 7.57, '*Rezeki petani dan nelayan sangat bergantung'],
  [7.57, 9.96, 'pada pusingan *musim dan cuaca.'],
  [9.96, 12.36, 'Ada waktu hasil *melimpah ruah,'],
  [12.36, 16.45, 'ada ketika *laut *bergelora dan kebun dilanda *kemarau.'],
  [16.45, 22.17, '*Pertama, *pendapatan *bermusim memerlukan kita ada *simpanan *kecemasan.'],
  [22.17, 25.57, 'Simpanan *lebihan tunai waktu hasil banyak'],
  [25.57, 28.21, 'untuk menampung hidup waktu *sukar.'],
  [28.21, 33.29, '*Kedua, ketiadaan skim *pencen ataupun *KWSP daripada majikan,'],
  [33.29, 36.49, 'anda perlu membina *tabung *persaraan sendiri'],
  [36.49, 38.62, 'sepanjang bertahun-tahun'],
  [38.62, 41.05, 'ketika *kudrat masih ada.'],
  [41.05, 45.7, '*Ketiga, *emas *fizikal lebih *selamat daripada tunai di rumah.'],
  [45.7, 48.01, 'Menyimpan *wang *kertas di rumah'],
  [48.01, 49.93, '*berisiko rosak,'],
  [49.93, 51.66, 'dimakan *anai-anai.'],
  [51.66, 56.39, '*Keempat, *fleksibiliti menabung mengikut *kemampuan *poket.'],
  [56.39, 58.07, 'Di *Akaun *Emas *GAP *Public *Gold'],
  [58.07, 60.55, 'kita boleh menyimpan serendah *100'],
  [60.55, 64.01, '*tanpa *komitmen. Simpan bila ada hasil,'],
  [64.01, 66.13, 'rehat bila ada *gawat.'],
  [66.13, 70.0, '*Dan *kelima, *gabungan *tradisi *tanah dan *emas.'],
  [70.0, 72.74, 'Petani sudah lama faham *nilai *tanah,'],
  [72.74, 74.58, 'dan emas adalah *aset'],
  [74.58, 76.78, '*fizikal, pelengkap paling mudah'],
  [76.78, 80.6, 'untuk dikumpul. *Musim *tengkujuh pasti akan tiba lagi.'],
  [80.6, 82.74, 'Jangan biarkan diri anda *terhimpit'],
  [82.74, 86.22, 'tanpa persediaan. *Kunci hasil *tuaian anda'],
  [86.22, 88.09, 'dengan *emas *fizikal.'],
  [88.09, 90.68, 'Tuan puan yang dah ready nak mulakan *simpan *emas'],
  [90.68, 93.74, 'boleh rujuk *pin *video saya. *Dulu *ragu, *kini *tahu.'],
  [93.74, 96.0, 'Jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'SEBAB');
const SCENES = [
  Hh(0, 4.54, (lt) => { const out = clamp((lt - 4.0) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'PETANI & NELAYAN', lines: ['5 SEBAB', 'EMAS FIZIKAL'], sub: 'PALING PERLU UNTUK ANDA' }); X.restore(); }, 1, WC.ma),
  B(4.54, 16.45, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Rezeki Bermusim', 100);
    row(lt, .8, 440, 'Rezeki', 'BERGANTUNG MUSIM'); row(lt, 5.4, 590, 'Hasil', 'MELIMPAH RUAH'); row(lt, 7.9, 740, 'Laut bergelora', 'KEMARAU');
    stk(lt, .4, IMG.sBertimbun, 540, SB, 600);
  }),
  Hh(16.45, 22.17, CH(1, 'Simpanan Kecemasan', null, 'pendapatan bermusim'), -1, WC.ma),
  B(22.17, 28.21, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Simpan Lebihan', 100);
    row(lt, 1.0, 440, 'Hasil banyak', 'SIMPAN LEBIHAN'); row(lt, 3.4, 590, 'Untuk waktu', 'SUKAR');
    stk(lt, .4, IMG.sPenampan, 540, SB, 620);
  }),
  Hh(28.21, 33.29, CH(2, 'Tabung Persaraan', 'Sendiri', null), 1, WC.ma),
  B(33.29, 41.05, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Tiada Pencen', 100);
    row(lt, 1.0, 440, 'Tiada', 'PENCEN / KWSP'); row(lt, 3.2, 590, 'Bina', 'TABUNG SENDIRI'); row(lt, 5.4, 740, 'Selagi', 'KUDRAT ADA');
    stk(lt, .4, IMG.sTabung, 540, SB, 600);
  }),
  Hh(41.05, 45.7, CH(3, 'Emas Fizikal', 'Lebih Selamat', null), -1, WC.ma),
  B(45.7, 51.66, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Tunai Di Rumah?', 100);
    row(lt, 1.0, 440, 'Wang kertas', 'BERISIKO ROSAK'); row(lt, 3.6, 590, 'Dimakan', 'ANAI-ANAI');
    stk(lt, .4, IMG.sSelamat, 540, SB, 620);
  }),
  Hh(51.66, 56.39, CH(4, 'Menabung Fleksibel', 'Ikut Poket', null), 1, WC.ma),
  B(56.39, 66.13, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Serendah RM100', 100);
    row(lt, .8, 440, 'Akaun Emas GAP', 'PUBLIC GOLD'); row(lt, 2.6, 590, 'Serendah', 'RM100'); row(lt, 4.2, 740, 'Tanpa', 'KOMITMEN');
    stk(lt, .4, IMG.sKemampuan, 540, SB, 600);
  }),
  Hh(66.13, 70.0, CH(5, 'Tradisi Tanah', 'Dan Emas', null), -1, WC.ma),
  B(70.0, 76.78, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Faham Nilai Tanah', 96);
    row(lt, 1.0, 440, 'Petani faham', 'NILAI TANAH'); row(lt, 3.2, 590, 'Emas', 'ASET PELENGKAP');
    stk(lt, .4, IMG.sTradisi, 540, SB, 620);
  }),
  B(76.78, 80.6, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Musim Tengkujuh', 96); stk(lt, .3, IMG.sTengkujuh, 540, SB, 680); }),
  B(80.6, 86.22, 'merak5', WC.ma, (lt) => {
    ttl(lt, 'Jangan Terhimpit', 100);
    if (lt < 2.14) stk(lt, .3, IMG.sTerhimpit, 540, SB, 640); else stk(lt, 2.14, IMG.sKunci, 540, SB, 640);
  }),
  B(86.22, 88.09, 'ipad', WC.ma, (lt) => { ttl(lt, 'Emas Fizikal', 100); stk(lt, .2, IMG.sBertimbun, 540, SB, 640); }),
  B(88.09, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sKunci, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sPenampan, IMG.sTabung, IMG.sSelamat, IMG.sKemampuan, IMG.sTradisi, IMG.sTengkujuh, IMG.sTerhimpit, IMG.sBertimbun, IMG.sKunci])), { nobk: true }),
];
