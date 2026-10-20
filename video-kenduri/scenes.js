// scenes.js — "5 Sebab Kos Perkahwinan Wajib Dirancang Awal" (79.90s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 79.899864, DUR = VOICE + 6, HEADN = 2396;
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
const ASSETS = { ...PH, sMurah: 'stk-murah.png', sPuluhan: 'stk-puluhan.png', sKos30k: 'stk-kos30k.png', sPakej: 'stk-pakej.png', sJerat: 'stk-jerat.png', sEmas: 'stk-emas.png', sLebihan: 'stk-lebihan.png', sBahagia: 'stk-bahagia.png', sRancang: 'stk-rancang.png' };

const SEG = [
  [0, 2.23, '*5 *sebab *kos *perkahwinan'],
  [2.23, 4.47, '*wajib dirancang *3 *tahun awal.'],
  [4.47, 7.52, '*Kenduri kahwin di Malaysia hari ini bukan lagi *murah.'],
  [7.52, 10.5, '*Katering, dewan, pelamin, jurugambar'],
  [10.5, 13.59, 'boleh menelan belanja *puluhan *ribu *ringgit untuk'],
  [13.59, 15.19, 'hanya majlis *sehari.'],
  [15.19, 19.15, '*Satu, *kos *kenduri sederhana mencecah *RM30,000.'],
  [19.15, 23.09, 'Jumlah ini mustahil dikumpul dalam masa beberapa bulan'],
  [23.09, 25.38, 'tanpa *perancangan. *Kedua,'],
  [25.38, 28.34, 'harga *pakej perkahwinan *melambung setiap tahun.'],
  [28.34, 31.3, 'Simpanan tunai biasanya sukar mengejar'],
  [31.3, 34.21, 'kenaikan harga katering dan sewaan dewan.'],
  [34.21, 38.28, '*Ketiga, *jerat pinjaman *peribadi untuk satu hari.'],
  [38.28, 42.43, 'Ramai pasangan sanggup *berhutang bank semata-mata demi majlis'],
  [42.43, 45.01, 'akhirnya, *sengsara bertahun-tahun.'],
  [45.01, 49.03, '*Keempat, *simpanan *emas mengekalkan *kuasa *belanja.'],
  [49.03, 51.8, 'Nilai emas yang dikumpul awal meningkat'],
  [51.8, 54.56, 'seiring dengan kenaikan *kos persiapan majlis.'],
  [54.56, 58.48, '*Dan *kelima, *lebihan *aset jadi *modal selepas kahwin.'],
  [58.48, 60.56, '*Emas tak habis begitu saja.'],
  [60.56, 62.7, 'Baki simpanan emas boleh menjadi'],
  [62.7, 64.94, '*dana permulaan rumah tangga baru.'],
  [64.94, 67.66, '*Hari *bahagia sepatutnya membawa *ketenangan,'],
  [67.66, 70.54, 'bukan *bebanan *hutang yang berpanjangan.'],
  [70.54, 72.88, '*Rancang *awal, kahwin tanpa *hutang.'],
  [72.88, 75.25, 'Tuan puan yang dah ready nak mulakan *simpan *emas?'],
  [75.25, 77.0, 'Boleh rujuk *pin *video saya,'],
  [77.0, 78.1, '*dulu *ragu *kini *tahu.'],
  [78.1, 79.9, 'Jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'SEBAB');
const SCENES = [
  Hh(0, 4.47, (lt) => { const out = clamp((lt - 3.95) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'PERKAHWINAN', lines: ['5 SEBAB', 'RANCANG AWAL'], sub: 'KOS KAHWIN 3 TAHUN AWAL' }); X.restore(); }, 1, WC.ma),
  B(4.47, 7.52, 'tiers', WC.ma, (lt) => { ttl(lt, 'Kenduri Kahwin', 100); stk(lt, .3, IMG.sMurah, 540, SB, 680); }),
  B(7.52, 15.19, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Puluhan Ribu Ringgit', 90);
    row(lt, .8, 440, 'Katering & dewan', 'PELAMIN'); row(lt, 3.0, 590, 'Jurugambar', 'PULUHAN RIBU'); row(lt, 6.0, 740, 'Hanya', 'MAJLIS SEHARI');
    stk(lt, .4, IMG.sPuluhan, 540, SB, 600);
  }),
  Hh(15.19, 19.15, CH(1, 'Kos Kenduri', 'Mencecah RM30,000', null), -1, WC.ma),
  B(19.15, 24.6, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'RM30,000', 110);
    row(lt, .8, 440, 'Mustahil kumpul', 'BEBERAPA BULAN'); row(lt, 3.0, 590, 'Tanpa', 'PERANCANGAN');
    stk(lt, .4, IMG.sKos30k, 540, SB, 620);
  }),
  Hh(24.6, 28.34, CH(2, 'Harga Pakej', 'Melambung', null), 1, WC.ma),
  B(28.34, 33.8, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Harga Naik Setiap Tahun', 80);
    row(lt, .8, 440, 'Simpanan tunai', 'SUKAR MENGEJAR'); row(lt, 3.0, 590, 'Harga katering', 'SEWAAN DEWAN');
    stk(lt, .4, IMG.sPakej, 540, SB, 620);
  }),
  Hh(33.8, 38.28, CH(3, 'Jerat Pinjaman', 'Peribadi', null), -1, WC.ma),
  B(38.28, 44.5, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Untuk Satu Hari', 100);
    row(lt, .8, 440, 'Berhutang bank', 'DEMI MAJLIS'); row(lt, 2.8, 590, 'Akhirnya', 'SENGSARA BERTAHUN');
    stk(lt, .4, IMG.sJerat, 540, SB, 620);
  }),
  Hh(44.5, 49.03, CH(4, 'Simpanan Emas', 'Kekal Kuasa Beli', null), 1, WC.ma),
  B(49.03, 54.2, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Nilai Emas Meningkat', 90);
    row(lt, .8, 440, 'Nilai emas', 'MENINGKAT'); row(lt, 2.6, 590, 'Seiring kos', 'PERSIAPAN MAJLIS');
    stk(lt, .4, IMG.sEmas, 540, SB, 620);
  }),
  Hh(54.2, 58.48, CH(5, 'Lebihan Aset', 'Modal Selepas Kahwin', null), -1, WC.ma),
  B(58.48, 64.94, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Emas Tak Habis', 100);
    row(lt, .8, 440, 'Emas', 'TAK HABIS'); row(lt, 2.2, 590, 'Baki simpanan', 'DANA RUMAH TANGGA');
    stk(lt, .4, IMG.sLebihan, 540, SB, 620);
  }),
  B(64.94, 70.54, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Hari Bahagia', 100);
    row(lt, .8, 440, 'Bawa', 'KETENANGAN'); row(lt, 2.8, 590, 'Bukan', 'BEBANAN HUTANG');
    stk(lt, .4, IMG.sBahagia, 540, SB, 620);
  }),
  B(70.54, 72.88, 'merak5', WC.ma, (lt) => { ttl(lt, 'Kahwin Tanpa Hutang', 90); stk(lt, .3, IMG.sRancang, 540, SB, 680); }),
  B(72.88, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sRancang, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sMurah, IMG.sPuluhan, IMG.sKos30k, IMG.sPakej, IMG.sJerat, IMG.sEmas, IMG.sLebihan, IMG.sBahagia, IMG.sRancang])), { nobk: true }),
];
