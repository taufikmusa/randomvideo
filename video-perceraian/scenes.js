// scenes.js — "5 Langkah Bangkit Kewangan Selepas Perceraian" (92.30s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 92.299320, DUR = VOICE + 6, HEADN = 2769;
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
const ASSETS = { ...PH, sCerai: 'stk-cerai.png', sAkaun: 'stk-akaun.png', sDana: 'stk-dana.png', sAsas: 'stk-asas.png', sInflasi: 'stk-inflasi.png', sRm100: 'stk-rm100.png', sBab: 'stk-bab.png', sBangkit: 'stk-bangkit.png', sLembaran: 'stk-lembaran.png' };

const SEG = [
  [0, 4.01, '*5 *langkah *bangkit bina *kewangan selepas bercerai'],
  [4.01, 6.2, 'Perpisahan dalam perkahwinan'],
  [6.2, 8.46, 'adalah satu fasa *ujian yang sangat *berat'],
  [8.46, 11.01, 'dari segi *emosi dan juga *kewangan.'],
  [11.01, 13.8, 'Namun, ia juga merupakan *peluang'],
  [13.8, 16.34, 'untuk *bangkit berdiri di atas *kaki *sendiri'],
  [16.34, 18.23, 'dengan *kekuatan *baru.'],
  [18.23, 21.98, '*Pertama, bina *kewangan atas *nama *sendiri.'],
  [21.98, 24.56, 'Memiliki *akaun *simpanan peribadi'],
  [24.56, 26.5, 'yang *berasingan memberikan anda'],
  [26.5, 28.58, '*kawalan dan *keselamatan penuh.'],
  [28.58, 33.12, '*Kedua, utamakan pembinaan *dana *kecemasan asas.'],
  [33.12, 36.17, 'bermula semula dengan satu punca *pendapatan.'],
  [36.17, 40.4, 'Memerlukan *jaring *keselamatan yang kukuh untuk keluarga.'],
  [40.4, 45.37, '*Ketiga, mulakan *simpanan *aset untuk membina masa depan baru.'],
  [45.37, 48.59, 'Kumpul *gram *emas sedikit demi sedikit'],
  [48.59, 52.24, 'dan bina tapak *kestabilan anda.'],
  [52.24, 56.25, '*Keempat, lindungi setiap *ringgit hasil titik peluh.'],
  [56.25, 58.7, 'Nilai wang simpanan perlu dipelihara'],
  [58.7, 61.08, 'agar tidak *susut nilainya,'],
  [61.08, 63.03, 'dimakan oleh *inflasi.'],
  [63.03, 66.0, '*Dan *kelima, setiap *simpanan'],
  [66.0, 68.25, 'membina kembali *keyakinan.'],
  [68.25, 71.87, 'Mampu menyimpan *RM100 sebulan membuktikan anda'],
  [71.87, 74.81, '*berdikari tanpa bergantung pada sesiapa.'],
  [74.81, 78.21, '*Perceraian mungkin menutup satu *bab dalam hidup.'],
  [78.21, 80.0, 'Namun *lembaran *masa *depan'],
  [80.0, 82.06, 'yang indah masih *milik *anda.'],
  [82.06, 85.25, '*Bangkit bina *kebebasan hidup anda hari ini.'],
  [85.25, 87.5, 'Tuan puan yang dah ready nak mulakan *simpan *emas'],
  [87.5, 89.16, 'boleh rujuk *pin *video saya.'],
  [89.16, 90.96, '*Dulu *ragu, *kini *tahu. Jom'],
  [90.96, 92.3, 'mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'LANGKAH');
const SCENES = [
  Hh(0, 4.01, (lt) => { const out = clamp((lt - 3.5) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'SELEPAS PERCERAIAN', lines: ['5 LANGKAH', 'BANGKIT SEMULA'], sub: 'BINA KEWANGAN ANDA' }); X.restore(); }, 1, WC.ma),
  B(4.01, 11.01, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Fasa Ujian Berat', 96);
    row(lt, .8, 440, 'Perpisahan', 'FASA UJIAN'); row(lt, 3.0, 590, 'Berat dari segi', 'EMOSI & KEWANGAN');
    stk(lt, .4, IMG.sCerai, 540, SB, 620);
  }),
  B(11.01, 18.23, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Bangkit Semula', 100);
    row(lt, .8, 440, 'Peluang', 'BANGKIT BERDIRI'); row(lt, 3.0, 590, 'Di atas', 'KAKI SENDIRI'); row(lt, 5.4, 740, 'Dengan kekuatan', 'BARU');
    stk(lt, .4, IMG.sBangkit, 540, SB, 600);
  }),
  Hh(18.23, 21.98, CH(1, 'Kewangan Atas', 'Nama Sendiri', null), -1, WC.ma),
  B(21.98, 28.58, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Akaun Sendiri', 100);
    row(lt, .8, 440, 'Akaun simpanan', 'PERIBADI'); row(lt, 2.6, 590, 'Berasingan', 'KAWALAN PENUH'); row(lt, 4.4, 740, 'Beri anda', 'KESELAMATAN');
    stk(lt, .4, IMG.sAkaun, 540, SB, 600);
  }),
  Hh(28.58, 33.12, CH(2, 'Dana Kecemasan', 'Asas', null), 1, WC.ma),
  B(33.12, 40.4, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Jaring Keselamatan', 92);
    row(lt, .8, 440, 'Satu punca', 'PENDAPATAN'); row(lt, 3.2, 590, 'Jaring keselamatan', 'UNTUK KELUARGA');
    stk(lt, .4, IMG.sDana, 540, SB, 620);
  }),
  Hh(40.4, 45.37, CH(3, 'Mulakan', 'Simpanan Aset', null), -1, WC.ma),
  B(45.37, 52.24, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Aset Masa Depan', 96);
    row(lt, .8, 440, 'Kumpul', 'GRAM EMAS'); row(lt, 1.8, 590, 'Sedikit', 'DEMI SEDIKIT'); row(lt, 3.5, 740, 'Bina tapak', 'KESTABILAN');
    stk(lt, .4, IMG.sAsas, 540, SB, 600);
  }),
  Hh(52.24, 56.25, CH(4, 'Lindungi Setiap', 'Ringgit', null), 1, WC.ma),
  B(56.25, 63.03, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Lindungi Nilai Wang', 90);
    row(lt, .8, 440, 'Hasil', 'TITIK PELUH'); row(lt, 2.5, 590, 'Nilai wang', 'JANGAN SUSUT'); row(lt, 4.8, 740, 'Dimakan', 'INFLASI');
    stk(lt, .4, IMG.sInflasi, 540, SB, 600);
  }),
  Hh(63.03, 66.0, CH(5, 'Setiap Simpanan', 'Bina Keyakinan', null), -1, WC.ma),
  B(66.0, 74.81, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Bina Keyakinan', 100);
    row(lt, .8, 440, 'Bina kembali', 'KEYAKINAN'); row(lt, 2.3, 590, 'Simpan', 'RM100 SEBULAN'); row(lt, 5.0, 740, 'Berdikari', 'TANPA BERGANTUNG');
    stk(lt, .4, IMG.sRm100, 540, SB, 600);
  }),
  B(74.81, 78.21, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Satu Bab Berakhir', 96); stk(lt, .3, IMG.sBab, 540, SB, 680); }),
  B(78.21, 82.06, 'merak5', WC.ma, (lt) => { ttl(lt, 'Masa Depan Milik Anda', 80); stk(lt, .3, IMG.sLembaran, 540, SB, 680); }),
  B(82.06, 85.25, 'ipad', WC.ma, (lt) => { ttl(lt, 'Bina Kebebasan Hidup', 84); stk(lt, .3, IMG.sBangkit, 540, SB, 680); }),
  B(85.25, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sLembaran, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sCerai, IMG.sAkaun, IMG.sDana, IMG.sAsas, IMG.sInflasi, IMG.sRm100, IMG.sBab, IMG.sBangkit, IMG.sLembaran])), { nobk: true }),
];
