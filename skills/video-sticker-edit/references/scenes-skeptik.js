// scenes.js — "5 Jawapan Jujur Untuk Golongan Skeptik Emas" (104.51s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 104.512993, DUR = VOICE + 6, HEADN = 3135;
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
const ASSETS = { ...PH, sSkeptik: 'stk-skeptik-bagus.png', sKekal: 'stk-kekal-kuasa-beli.png', sDulu: 'stk-dulu-mahal-esok-murah.png', sLima: 'stk-lima-ribu-tahun.png', sJaring: 'stk-jaring-keselamatan.png', sBank: 'stk-pilihan-bank-pusat.png', sMagis: 'stk-bukan-skim-magis.png', sPenyimpan: 'stk-penyimpan-nilai-terbukti.png', sFahami: 'stk-fahami-dulu.png' };

const SEG = [
  [0, 4.26, '*5 *jawapan *jujur untuk golongan *skeptik'],
  [4.26, 8.23, 'Rasa ragu-ragu dan *skeptik terhadap simpanan emas.'],
  [8.23, 11.22, '*Bagus kerana sikap *berhati-hati'],
  [11.22, 14.1, 'melindungi anda daripada tersilap *langkah.'],
  [14.1, 16.77, 'Mari kita rungkaikan *5'],
  [16.77, 18.5, '*bantahan paling popular.'],
  [18.5, 20.92, 'Secara jujur. *Pertama,'],
  [20.92, 23.28, '*emas *tiada *dividen.'],
  [23.28, 29.15, 'Betul. Fungsi emas bukan memberi *dividen tahunan ataupun *pendapatan *bulanan,'],
  [29.15, 32.09, 'tetapi emas *mengekalkan *kuasa *beli.'],
  [32.09, 35.22, 'Kenaikan harga emas *10% *setahun'],
  [35.22, 37.11, 'secara purata.'],
  [37.11, 40.4, '*Kedua, harga emas sekarang dah *terlalu *mahal.'],
  [40.4, 43.02, 'Sejak berdekad orang berkata begitu,'],
  [43.02, 46.04, 'dan setiap tahun harga *mahal menjadi *murah'],
  [46.04, 48.78, 'dan harga murah menjadi *sejarah.'],
  [48.78, 52.0, '*Ketiga, emas sekadar *logam *biasa.'],
  [52.0, 55.76, 'Emas sebenarnya dah menjadi *wang sebenar selama'],
  [55.76, 61.47, '*5,000 *tahun. Sedangkan tiada *mata *wang *kertas yang bertahan selama itu.'],
  [61.47, 65.31, '*Keempat, lebih baik labur dalam *perniagaan.'],
  [65.31, 69.32, 'Berniaga memang bagus, namun emas berfungsi sebagai'],
  [69.32, 73.99, '*jaring *keselamatan jika perniagaan menghadapi kegagalan.'],
  [73.99, 76.3, '*Dan *kelima, emas'],
  [76.3, 78.09, 'cuma untuk *golongan *tua?'],
  [78.09, 80.18, 'Hakikatnya, *bank *pusat'],
  [80.18, 83.81, 'dunia dan juta global menyimpan emas sebagai'],
  [83.81, 85.85, '*aset *strategik mereka.'],
  [85.85, 89.49, 'Emas bukan alat *magik untuk kaya *sekelip mata,'],
  [89.49, 93.46, 'ia adalah *penyimpan *nilai *terbukti sepanjang zaman.'],
  [93.46, 96.96, '*Fahami fungsi emas sebelum anda menolak emas.'],
  [96.96, 99.63, 'Tuan puan yang dah ready nak mulakan *simpan *emas'],
  [99.63, 101.31, 'boleh rujuk *pin *video saya.'],
  [101.31, 104.51, '*Dulu *ragu, *kini *tahu. Jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'BANTAHAN');
const SCENES = [
  Hh(0, 4.26, (lt) => { const out = clamp((lt - 3.7) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'UNTUK SKEPTIK', lines: ['5 JAWAPAN', 'JUJUR'], sub: 'UNTUK GOLONGAN SKEPTIK EMAS' }); X.restore(); }, 1, WC.ma),
  B(4.26, 14.1, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Skeptik? Bagus!', 100);
    row(lt, .8, 440, 'Ragu-ragu', 'SKEPTIK EMAS'); row(lt, 3.9, 590, 'Berhati-hati', 'LINDUNGI ANDA'); row(lt, 7.0, 740, 'Elak tersilap', 'LANGKAH');
    stk(lt, .4, IMG.sSkeptik, 540, SB, 600);
  }),
  B(14.1, 18.5, 'kg', WC.ma, (lt) => { ttl(lt, '5 Bantahan Popular', 92); anim(lt, .4, 540, 560, () => mWhite(130, 440, 820, ['Rungkai 5 bantahan', '*secara jujur'], 50)); stk(lt, .3, IMG.sFahami, 540, SB, 620); }),
  Hh(18.5, 23.28, CH(1, 'Emas Tiada', 'Dividen?', null), -1, WC.ma),
  B(23.28, 37.11, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Emas Tiada Dividen', 92);
    row(lt, 1.0, 440, 'Bukan beri', 'DIVIDEN TAHUNAN'); row(lt, 3.6, 590, 'Atau', 'PENDAPATAN BULANAN'); row(lt, 8.8, 740, 'Harga emas', 'NAIK 10% SETAHUN');
    if (lt > 5.9) stk(lt, 5.9, IMG.sKekal, 540, SB, 600);
  }),
  Hh(37.11, 40.4, CH(2, 'Emas Terlalu', 'Mahal?', null), 1, WC.ma),
  B(40.4, 48.78, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Dulu Mahal, Esok Murah', 80);
    row(lt, 1.0, 440, 'Berdekad', 'ORANG KATA MAHAL'); row(lt, 3.4, 590, 'Harga mahal', 'JADI MURAH'); row(lt, 5.8, 740, 'Harga murah', 'JADI SEJARAH');
    stk(lt, .4, IMG.sDulu, 540, SB, 600);
  }),
  Hh(48.78, 52.0, CH(3, 'Emas Sekadar', 'Logam Biasa?', null), -1, WC.ma),
  B(52.0, 61.47, 'merak100', WC.ma, (lt) => {
    ttl(lt, '5,000 Tahun Bertahan', 86);
    anim(lt, 2.0, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'EMAS', '5,000', 'tahun jadi wang'));
    anim(lt, 5.8, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'MATA WANG KERTAS', 'TIADA', 'bertahan selama itu'));
    stk(lt, .4, IMG.sLima, 540, SB, 600);
  }),
  Hh(61.47, 65.31, CH(4, 'Lebih Baik Labur', 'Dalam Perniagaan?', null), 1, WC.ma),
  B(65.31, 73.99, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Jaring Keselamatan', 92);
    row(lt, 1.0, 440, 'Berniaga', 'MEMANG BAGUS'); row(lt, 3.6, 590, 'Emas', 'JARING KESELAMATAN'); row(lt, 6.0, 740, 'Jika niaga', 'GAGAL');
    stk(lt, .4, IMG.sJaring, 540, SB, 600);
  }),
  Hh(73.99, 78.09, CH(5, 'Emas Cuma Untuk', 'Golongan Tua?', null), -1, WC.ma),
  B(78.09, 85.85, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Pilihan Bank Pusat', 96);
    row(lt, 1.0, 440, 'Bank pusat dunia', 'SIMPAN EMAS'); row(lt, 4.2, 590, 'Aset', 'STRATEGIK');
    stk(lt, .4, IMG.sBank, 540, SB, 620);
  }),
  B(85.85, 89.49, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Bukan Skim Magik', 96); stk(lt, .3, IMG.sMagis, 540, SB, 680); }),
  B(89.49, 93.46, 'merak5', WC.ma, (lt) => { ttl(lt, 'Nilai Terbukti', 100); stk(lt, .3, IMG.sPenyimpan, 540, SB, 680); }),
  B(93.46, 96.96, 'ipad', WC.ma, (lt) => { ttl(lt, 'Fahami Dulu', 100); anim(lt, .4, 540, 560, () => mWhite(130, 440, 820, ['Fahami fungsi emas', '*sebelum menolaknya'], 50)); stk(lt, .3, IMG.sFahami, 540, SB, 620); }),
  B(96.96, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sPenyimpan, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sSkeptik, IMG.sKekal, IMG.sDulu, IMG.sLima, IMG.sJaring, IMG.sBank, IMG.sMagis, IMG.sPenyimpan, IMG.sFahami])), { nobk: true }),
];
