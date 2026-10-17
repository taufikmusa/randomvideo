// scenes.js — "5 Mitos Mengarut Tentang Simpan Emas" (90.21s + outro 6s). Honey gold #FEC40B + sticker pop-up. Hard cut.
const VOICE = 90.209524, DUR = VOICE + 6, HEADN = 2706;
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
const ASSETS = { ...PH, sMitos: 'stk-mitos.png', sKaya: 'stk-kaya.png', sTinggi: 'stk-tinggi.png', sCairkan: 'stk-cairkan.png', sRisiko: 'stk-risiko.png', sModal: 'stk-modal.png', sKarut: 'stk-karut.png', sIlmu: 'stk-ilmu.png', sMulakan: 'stk-mulakan.png' };

const SEG = [
  [0, 3.14, '*5 *mitos *mengarut tentang *simpan *emas'],
  [3.14, 6.92, 'Ramai orang teragak-agak mahu memulakan *simpanan *emas,'],
  [6.92, 9.76, 'kerana percaya pada *mitos tersebut.'],
  [9.76, 12.4, 'Mari kita bongkarkan *5 *salah *faham'],
  [12.4, 15.16, 'paling popular yang *merugikan penyimpan.'],
  [15.16, 19.05, '*Pertama, mitos emas hanya untuk *orang *kaya.'],
  [19.05, 20.87, 'Hakikatnya hari ini'],
  [20.87, 23.98, 'di *Public *Gold kita boleh mulakan *simpanan *emas'],
  [23.98, 26.88, 'dengan komitmen serendah *RM100.'],
  [26.88, 31.11, '*Kedua, mitos harga emas sudah terlalu *tinggi'],
  [31.11, 33.55, 'sejak berdekad orang berkata begitu,'],
  [33.55, 37.23, 'dan setiap tahun harga tinggi itu menjadi *sejarah.'],
  [37.23, 39.5, 'Harga *murah *emas.'],
  [39.5, 43.6, '*Ketiga, mitos *sukar untuk cairkan emas kepada *tunai.'],
  [43.6, 47.47, 'Jualan balik emas kini boleh dibuat secara *pantas,'],
  [47.47, 49.4, 'malah boleh dibuat secara *online'],
  [49.4, 51.9, 'pada *bila-bila *masa.'],
  [51.9, 55.89, '*Keempat, emas adalah instrumen *berisiko *tinggi?'],
  [55.89, 58.7, 'Hakikatnya, emas adalah *aset'],
  [58.7, 63.08, 'paling *stabil merentasi sejarah krisis dunia.'],
  [63.08, 65.38, '*Dan *kelima, mitos'],
  [65.38, 67.3, 'perlu tunggu *modal *berkepuk.'],
  [67.3, 71.71, 'Kejayaan membina *simpanan *emas bermula dengan'],
  [71.71, 74.89, '*disiplin mengumpul *gram secara sikit-sikit.'],
  [74.89, 77.28, 'Jangan biarkan *mitos menghalang'],
  [77.28, 79.87, '*masa *depan anda, *ilmu yang tepat'],
  [79.87, 81.65, 'membuka pintu *kekayaan.'],
  [81.65, 84.4, 'Tuan puan yang dah ready nak mulakan *simpan *emas'],
  [84.4, 87.15, 'boleh mulakan di *Public *Gold.'],
  [87.15, 90.21, '*Dulu *ragu, *kini *tahu. Jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'MITOS');
const SCENES = [
  Hh(0, 3.14, (lt) => { const out = clamp((lt - 2.65) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'MITOS EMAS', lines: ['5 MITOS', 'MENGARUT'], sub: 'TENTANG SIMPAN EMAS' }); X.restore(); }, 1, WC.ma),
  B(3.14, 9.76, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Mitos Simpan Emas', 94);
    row(lt, .8, 440, 'Ramai orang', 'TERAGAK-AGAK'); row(lt, 3.8, 590, 'Percaya', 'MITOS TERSEBUT');
    stk(lt, .4, IMG.sMitos, 540, SB, 620);
  }),
  B(9.76, 15.16, 'kg', WC.ma, (lt) => {
    ttl(lt, '5 Salah Faham Popular', 82);
    row(lt, .8, 440, 'Paling popular', 'SALAH FAHAM'); row(lt, 3.0, 590, 'Merugikan', 'PENYIMPAN');
    stk(lt, .4, IMG.sKarut, 540, SB, 620);
  }),
  Hh(15.16, 19.05, CH(1, 'Emas Hanya Untuk', 'Orang Kaya?', null), -1, WC.ma),
  B(19.05, 26.88, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Bukan Untuk Orang Kaya', 80);
    row(lt, .8, 440, 'Mulakan simpanan', 'DI PUBLIC GOLD'); row(lt, 4.9, 590, 'Komitmen serendah', 'RM100');
    stk(lt, .4, IMG.sKaya, 540, SB, 600);
  }),
  Hh(26.88, 31.11, CH(2, 'Harga Emas', 'Terlalu Tinggi?', null), 1, WC.ma),
  B(31.11, 39.5, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Harga Emas Tinggi?', 94);
    row(lt, .8, 440, 'Sejak berdekad', 'ORANG KATA BEGITU'); row(lt, 2.5, 590, 'Setiap tahun', 'JADI SEJARAH'); row(lt, 6.1, 740, 'Harga', 'MURAH EMAS');
    stk(lt, .4, IMG.sTinggi, 540, SB, 600);
  }),
  Hh(39.5, 43.6, CH(3, 'Sukar Cairkan', 'Emas?', null), -1, WC.ma),
  B(43.6, 51.9, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Mudah Cairkan Emas', 90);
    row(lt, .8, 440, 'Jualan balik', 'PANTAS'); row(lt, 3.9, 590, 'Boleh buat', 'SECARA ONLINE'); row(lt, 5.8, 740, 'Bila-bila', 'MASA');
    stk(lt, .4, IMG.sCairkan, 540, SB, 600);
  }),
  Hh(51.9, 55.89, CH(4, 'Emas Berisiko', 'Tinggi?', null), 1, WC.ma),
  B(55.89, 63.08, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Aset Paling Stabil', 94);
    row(lt, .8, 440, 'Emas adalah', 'ASET'); row(lt, 2.8, 590, 'Paling stabil', 'KRISIS DUNIA');
    stk(lt, .4, IMG.sRisiko, 540, SB, 620);
  }),
  Hh(63.08, 67.3, CH(5, 'Perlu Modal', 'Berkepuk?', null), -1, WC.ma),
  B(67.3, 74.89, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Mula Sikit-Sikit', 96);
    row(lt, .8, 440, 'Bina simpanan', 'EMAS'); row(lt, 4.4, 590, 'Disiplin kumpul', 'GRAM SIKIT-SIKIT');
    stk(lt, .4, IMG.sModal, 540, SB, 620);
  }),
  B(74.89, 77.28, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Jangan Biar Mitos', 96); stk(lt, .3, IMG.sKarut, 540, SB, 680); }),
  B(77.28, 81.65, 'merak5', WC.ma, (lt) => {
    ttl(lt, 'Ilmu Yang Tepat', 100);
    anim(lt, 2.2, 540, 560, () => mWhite(130, 440, 820, ['Ilmu yang tepat', '*buka pintu kekayaan'], 50));
    stk(lt, .3, IMG.sIlmu, 540, SB, 620);
  }),
  B(81.65, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sMulakan, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sMitos, IMG.sKaya, IMG.sTinggi, IMG.sCairkan, IMG.sRisiko, IMG.sModal, IMG.sKarut, IMG.sIlmu, IMG.sMulakan])), { nobk: true }),
];
