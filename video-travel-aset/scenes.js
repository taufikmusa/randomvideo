// scenes.js — "5 Cara Kaki Travel Bina Aset" (96.43s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 96.432472, DUR = VOICE + 6, HEADN = 2893;
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
  anim(lt, 1.2, 540, 640, () => { shadow(() => { rr(180, 590, 720, 110, 55); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Rujuk Pin Video', 540, 618, MA.F.h(54), '#fff', 'center'); });
  stk(lt, .6, hero, 540, SB, h);
};
const BAKE = ['tiers', 'kg', 'dulang', 'merak100', 'bunga50', 'syiling', 'g250', 'dinarPantai', 'shop', 'ipad', 'binder', 'bungamas', 'wallet', 'merak5'];
function bakeAll() { BAKE.forEach(k => { BGS[k] = MA.bgPhoto(k, 16, .45); }); }
const ASSETS = { ...PH, sTravel: 'stk-travel.png', sSimpandulu: 'stk-simpandulu.png', sBajet: 'stk-bajet.png', sKenangan: 'stk-kenangan.png', sAsetbebas: 'stk-asetbebas.png', sRm100: 'stk-rm100.png', sMinat: 'stk-minat.png', sMasadepan: 'stk-masadepan.png', sKukuh: 'stk-kukuh.png' };
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'CARA');
const SEG = [
  [0, 5.85, '*5 *cara kaki *travel terus *explore sambil *bina *aset *fizikal.'],
  [5.85, 9.71, 'Generasi muda hari ini sangat *mementingkan pengalaman'],
  [9.71, 14.12, '*mengembara ke luar negara dan mencipta *memori indah.'],
  [14.12, 16.27, 'Memang seronok menikmati hidup,'],
  [16.27, 18.34, 'tapi pastikan *poket anda'],
  [18.34, 21.22, 'tidak kosong bila pulang ke *tanah *air.'],
  [21.22, 26.9, '*Pertama, utamakan *simpanan *masa *depan sebelum bajet tiket penerbangan.'],
  [26.9, 29.28, 'Bayar masa depan anda *dahulu'],
  [29.28, 33.18, 'sebelum membiayai *percutian *impian.'],
  [33.18, 37.86, '*Kedua, tetapkan *bajet *mengembara daripada baki simpanan.'],
  [37.86, 40.22, 'Melancong *mengikut *kemampuan'],
  [40.22, 43.12, 'tanpa perlu *berhutang kat kredit.'],
  [43.12, 46.78, '*Ketiga, *kenangan *masa *muda itu indah'],
  [46.78, 49.14, 'tapi *hari *tua akan tiba.'],
  [49.14, 52.2, 'Seimbangkan nikmat melihat dunia hari ini'],
  [52.2, 55.02, 'dengan *persiapan hari esok.'],
  [55.02, 60.59, '*Keempat, *bina *aset memberikan *kebebasan melancong lebih tenang.'],
  [60.59, 63.21, 'Apabila simpanan anda *kukuh,'],
  [63.21, 66.66, 'percutian terasa jauh lebih *membahagiakan.'],
  [66.66, 70.41, 'Dan *kelima, *simpan *emas *RM100 *sebulan'],
  [70.41, 72.32, 'tidak menghalang percutian.'],
  [72.32, 73.93, 'Jumlah kecil ini'],
  [73.93, 78.34, 'membina *aset di belakang tabir tanpa mengganggu *gaya *hidup.'],
  [78.34, 81.64, 'Anda tidak perlu korbankan *minat *mengembara,'],
  [81.64, 84.44, 'cuma pastikan *masa *depan turut'],
  [84.44, 88.27, '*terpelihara. Nikmati dunia dengan *simpanan yang *kukuh.'],
  [88.27, 90.99, 'Tuan puan yang dah ready nak mulakan *simpan *emas,'],
  [90.99, 92.65, 'boleh rujuk *pin *video saya.'],
  [92.65, 96.43, '*Dulu *ragu, *kini *tahu. Jom *simpan *emas.'],
];
const SCENES = [
  Hh(0, 5.85, (lt) => { const out = clamp((lt - 5.3) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'KAKI TRAVEL', lines: ['TRAVEL TERUS', 'BINA ASET'], sub: '5 CARA EXPLORE TANPA RISAU' }); X.restore(); }, 1, WC.ma),
  B(5.85, 21.22, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Kaki Travel', 100);
    row(lt, 3.9, 440, 'Mengembara', 'KE LUAR NEGARA'); row(lt, 10.4, 590, 'Poket anda', 'JANGAN KOSONG');
    stk(lt, .4, IMG.sTravel, 540, SB, 600);
  }),
  Hh(21.22, 25.0, CH(1, 'Simpanan Masa Depan', 'Dahulu', null), -1, WC.ma),
  B(25.0, 33.18, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Simpanan Dahulu', 100);
    row(lt, 1.9, 440, 'Bayar masa depan', 'DAHULU'); row(lt, 4.5, 590, 'Sebelum biayai', 'PERCUTIAN IMPIAN');
    stk(lt, .4, IMG.sSimpandulu, 540, SB, 620);
  }),
  Hh(33.18, 37.86, CH(2, 'Bajet Mengembara', 'Ikut Kemampuan', null), 1, WC.ma),
  B(37.86, 43.12, 'bungamas', WC.ma, (lt) => {
    ttl(lt, 'Bajet Realistik', 100);
    row(lt, .4, 440, 'Melancong ikut', 'KEMAMPUAN'); row(lt, 2.4, 590, 'Tanpa berhutang', 'KREDIT');
    stk(lt, .4, IMG.sBajet, 540, SB, 620);
  }),
  Hh(43.12, 46.78, CH(3, 'Kenangan Muda', 'Hari Tua Juga', null), -1, WC.ma),
  B(46.78, 55.02, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Seimbangkan', 100);
    row(lt, .5, 440, 'Hari tua', 'AKAN TIBA'); row(lt, 2.5, 590, 'Nikmat dunia', 'HARI INI'); row(lt, 5.4, 740, 'Persiapan', 'HARI ESOK');
    stk(lt, .4, IMG.sKenangan, 540, SB, 600);
  }),
  Hh(55.02, 58.5, CH(4, 'Bina Aset', 'Lebih Tenang', null), 1, WC.ma),
  B(58.5, 66.66, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Bina Aset', 100);
    row(lt, .4, 440, 'Bina aset', 'KEBEBASAN'); row(lt, 2.1, 590, 'Simpanan kukuh', 'LEBIH TENANG'); row(lt, 4.7, 740, 'Percutian', 'LEBIH BAHAGIA');
    stk(lt, .4, IMG.sAsetbebas, 540, SB, 600);
  }),
  Hh(66.66, 70.0, CH(5, 'Simpan Emas', 'RM100 Sebulan', null), -1, WC.ma),
  B(70.0, 78.34, 'g250', WC.ma, (lt) => {
    ttl(lt, 'RM100 Sebulan', 100);
    row(lt, 2.3, 440, 'Jumlah kecil', 'TAK HALANG TRAVEL'); row(lt, 3.9, 590, 'Bina aset', 'BELAKANG TABIR'); row(lt, 6.0, 740, 'Tanpa ganggu', 'GAYA HIDUP');
    stk(lt, .4, IMG.sRm100, 540, SB, 600);
  }),
  B(78.34, 81.64, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Minat Mengembara', 92); stk(lt, .3, IMG.sMinat, 540, SB, 680); }),
  B(81.64, 84.44, 'tiers', WC.ma, (lt) => { ttl(lt, 'Masa Depan', 100); stk(lt, .3, IMG.sMasadepan, 540, SB, 680); }),
  B(84.44, 88.27, 'syiling', WC.ma, (lt) => { ttl(lt, 'Kewangan Kukuh', 96); stk(lt, .3, IMG.sKukuh, 540, SB, 680); }),
  B(88.27, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sKukuh, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sTravel, IMG.sSimpandulu, IMG.sBajet, IMG.sKenangan, IMG.sAsetbebas, IMG.sRm100, IMG.sMinat, IMG.sMasadepan, IMG.sKukuh])), { nobk: true }),
];
