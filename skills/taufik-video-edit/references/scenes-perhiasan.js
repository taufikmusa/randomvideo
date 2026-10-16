// scenes.js — "5 Sebab Peminat Barang Kemas Wajib Tahu Emas Pelaburan" (102.27s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 102.266667, DUR = VOICE + 6, HEADN = 3068;
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
const ASSETS = { ...PH, sCita: 'stk-citarasa-tinggi.png', sPerhiasan: 'stk-perhiasan-pelaburan.png', sUpah: 'stk-upah-tukang-hangus.png', sKetulenan: 'stk-ketulenan-999.png', sJual: 'stk-jual-balik-telus.png', sGaya: 'stk-gaya-bina-harta.png', sMiliki: 'stk-miliki-dua-dua.png', sKekal: 'stk-kekalkan-kekayaan.png', sLengkap: 'stk-lengkapkan-koleksi.png' };

const SEG = [
  [0, 4.56, '*5 *sebab peminat barang kemas *wajib tahu *emas *pelaburan'],
  [4.56, 7.95, 'Peminat barang kemas memang ada *citarasa *tinggi.'],
  [7.95, 12.53, 'Rantai, gelang, cincin emas sentiasa *memikat pandangan mata.'],
  [12.53, 14.94, 'Namun, ada *perbezaan ketara'],
  [14.94, 20.19, 'antara *emas *perhiasan dengan *emas *pelaburan gold bar dan dinar.'],
  [20.19, 23.33, '*Pertama, kos *upah *tukang yang *tinggi.'],
  [23.33, 26.23, 'Barang kemas melibatkan kos reka bentuk,'],
  [26.23, 30.6, 'dan kos ini selalu *hangus apabila kita jual balik emas.'],
  [30.6, 34.37, '*Kedua, *ketulenan emas pelaburan *lebih *tinggi.'],
  [34.37, 37.28, 'Emas pelaburan seperti gold bar dan dinar'],
  [37.28, 40.12, 'menggunakan emas *999.9,'],
  [40.12, 43.81, 'manakala barang kemas lazimnya emas *916.'],
  [43.81, 46.24, ''],
  [46.24, 48.63, '*Ketiga, harga jualan balik lebih *telus.'],
  [48.63, 52.45, 'Emas pelaburan dinilai mengikut *harga *pasaran'],
  [52.45, 55.64, 'tanpa potongan *spread yang terlalu tinggi.'],
  [55.64, 59.56, '*Keempat, *tujuan pembelian emas yang *berbeza.'],
  [59.56, 64.01, 'Barang kemas untuk *hiasan dan dipakai untuk bergaya.'],
  [64.01, 68.17, 'Emas pelaburan untuk membina dan melipatgandakan'],
  [68.17, 70.82, '*kekayaan. *Dan *kelima,'],
  [70.82, 73.47, '*minat kedua-duanya secara *seimbang.'],
  [73.47, 76.11, 'Minat pada *perhiasan diteruskan'],
  [76.11, 80.27, 'sambil *portfolio simpanan diperkukuhkan dengan emas'],
  [80.27, 83.04, 'pelaburan seperti gold bar dan dinar.'],
  [83.04, 86.21, '*Kecantikan barang kemas memang *mempesonakan,'],
  [86.21, 90.56, 'tapi nilai emas gold bar dan dinar *mengekalkan *kekayaan.'],
  [90.56, 94.3, '*Lengkapkan koleksi emas dengan emas *gold *bar dan *dinar.'],
  [94.3, 96.99, 'Tuan puan yang dah ready nak mulakan *simpan *emas'],
  [96.99, 98.76, 'boleh rujuk *pin *video saya.'],
  [98.76, 100.81, '*Dulu *ragu, *kini *tahu. Jom'],
  [100.81, 102.27, 'mulakan *simpan *emas.'],
].filter(s => s[2]);
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'SEBAB');
const SCENES = [
  Hh(0, 4.56, (lt) => { const out = clamp((lt - 4.0) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'WAJIB TAHU', lines: ['5 SEBAB', 'EMAS PELABURAN'], sub: 'PEMINAT BARANG KEMAS' }); X.restore(); }, 1, WC.ma),
  B(4.56, 20.19, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Peminat Barang Kemas', 82);
    row(lt, .8, 440, 'Citarasa', 'TINGGI'); row(lt, 3.6, 590, 'Rantai & cincin', 'MEMIKAT'); row(lt, 8.2, 740, 'Perhiasan vs', 'PELABURAN');
    if (lt < 7.97) stk(lt, .4, IMG.sCita, 540, SB, 600); else stk(lt, 8.0, IMG.sPerhiasan, 540, SB, 600);
  }),
  Hh(20.19, 23.33, CH(1, 'Upah Tukang', 'Yang Tinggi', null), -1, WC.ma),
  B(23.33, 30.6, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Kos Upah Hangus', 96);
    row(lt, 1.0, 440, 'Barang kemas', 'KOS REKA BENTUK'); row(lt, 3.4, 590, 'Jual balik', 'KOS HANGUS');
    stk(lt, .4, IMG.sUpah, 540, SB, 620);
  }),
  Hh(30.6, 34.37, CH(2, 'Ketulenan Emas', 'Pelaburan Lebih Tinggi', null), 1, WC.ma),
  B(34.37, 46.24, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Ketulenan Emas', 100);
    anim(lt, 2.2, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'EMAS PELABURAN', '999.9', 'gold bar & dinar'));
    anim(lt, 5.8, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'BARANG KEMAS', '916', 'ketulenan lebih rendah'));
    stk(lt, 8.5, IMG.sKetulenan, 540, SB, 580);
  }),
  Hh(46.24, 50.0, CH(3, 'Harga Jual Balik', 'Lebih Telus', null), -1, WC.ma),
  B(50.0, 55.64, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Jual Balik Telus', 100);
    row(lt, .8, 440, 'Harga', 'IKUT PASARAN'); row(lt, 2.6, 590, 'Potongan spread', 'TIDAK TINGGI');
    stk(lt, .4, IMG.sJual, 540, SB, 620);
  }),
  Hh(55.64, 59.56, CH(4, 'Tujuan Beli', 'Yang Berbeza', null), 1, WC.ma),
  B(59.56, 68.17, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Dua Tujuan', 100);
    anim(lt, 1.0, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'PERHIASAN', 'GAYA', 'untuk dipakai'));
    anim(lt, 5.0, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'PELABURAN', 'KEKAYAAN', 'untuk digandakan'));
    stk(lt, 6.4, IMG.sGaya, 540, SB, 580);
  }),
  Hh(68.17, 73.47, CH(5, 'Minat Kedua-Duanya', 'Secara Seimbang', null), -1, WC.ma),
  B(73.47, 80.27, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Minat Diteruskan', 100);
    row(lt, 1.0, 440, 'Perhiasan', 'DITERUSKAN'); row(lt, 3.4, 590, 'Portfolio', 'DIPERKUKUH EMAS');
    stk(lt, .4, IMG.sMiliki, 540, SB, 620);
  }),
  B(80.27, 86.21, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Cantik Memukau', 100); anim(lt, 2.8, 540, 560, () => mWhite(130, 440, 820, ['Kecantikan perhiasan', '*memang mempesonakan'], 48)); stk(lt, .3, IMG.sCita, 540, SB, 620); }),
  B(86.21, 90.56, 'merak5', WC.ma, (lt) => { ttl(lt, 'Kekalkan Kekayaan', 92); stk(lt, .3, IMG.sKekal, 540, SB, 660); }),
  B(90.56, 94.3, 'ipad', WC.ma, (lt) => { ttl(lt, 'Lengkapkan Koleksi', 92); row(lt, 1.2, 440, 'Koleksi emas', 'LENGKAP'); stk(lt, .3, IMG.sLengkap, 540, SB, 640); }),
  B(94.3, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sLengkap, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sCita, IMG.sPerhiasan, IMG.sUpah, IMG.sKetulenan, IMG.sJual, IMG.sGaya, IMG.sMiliki, IMG.sKekal, IMG.sLengkap])), { nobk: true }),
];
