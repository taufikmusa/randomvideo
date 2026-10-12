// scenes.js — "5 Risiko Simpan Duit Semua Dalam Tunai (FD & ASB)" (94.13s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 94.133991, DUR = VOICE + 6, HEADN = 2824;
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
const ASSETS = { ...PH, sSemua: 'stk-semua-duit-fd-asb.png', sDividen: 'stk-dividen-tewas-inflasi.png', sRisiko: 'stk-risiko-satu-aset.png', sPerisai: 'stk-tiada-perisai-krisis.png', sPotensi: 'stk-emas-potensi-lonjakan.png', sSeimbang: 'stk-seimbangkan-portfolio.png', sBijak: 'stk-penyimpan-bijak.png', sImbang: 'stk-imbangkan-tunai-emas.png', sLindungi: 'stk-lindungi-titik-peluh.png' };

const SEG = [
  [0, 2.4, '*5 *risiko simpan duit'],
  [2.4, 4.84, 'semuanya dalam bentuk *tunai.'],
  [4.84, 14.96, 'Walaupun anda seorang penyimpan yang *berdisiplin tinggi, namun jika *100% simpanan hanya berada dalam instrumen *tunai'],
  [14.96, 18.47, 'dan *deposit tetap ada *risiko *tersembunyi.'],
  [18.47, 23.14, '*Pertama, kadar *dividen sering *tewas kepada kadar *inflasi'],
  [23.14, 26.26, 'barang harian, walaupun dividen bertambah,'],
  [26.26, 29.89, '*kuasa *membeli makin *berkurangan sebenarnya.'],
  [29.89, 33.3, '*Kedua, *risiko *satu *jenis *aset.'],
  [33.3, 37.01, 'Meletakkan semua simpanan dalam *satu *bakul tunai'],
  [37.01, 39.08, 'mendedahkan anda kepada'],
  [39.08, 40.93, '*kejatuhan nilai *matawang.'],
  [40.93, 44.45, '*Ketiga, tiada *perisai *krisis *kewangan.'],
  [44.45, 46.9, 'Ketika krisis ekonomi melanda,'],
  [46.9, 51.84, '*mata *wang *kertas terdedah kepada risiko *susut *nilai yang drastik.'],
  [51.84, 56.11, '*Keempat, *potensi *lonjakan nilai *jangka *panjang.'],
  [56.11, 59.89, '*Emas terbukti mencatatkan kenaikan purata'],
  [59.89, 61.73, '*10% *setahun'],
  [61.73, 64.3, 'merentasi tempoh *dua *dekad.'],
  [64.3, 67.63, '*Kelima, *seimbangkan *portfolio anda.'],
  [67.63, 71.01, 'Bukan bermakna perlu keluarkan semua simpanan,'],
  [71.01, 73.28, 'tapi *alihkan *sebahagian'],
  [73.28, 77.02, 'menjadi *aset *emas untuk lindungi nilai simpanan.'],
  [77.02, 80.53, '*Penyimpan *bijak tidak bergantung pada *satu *bakul.'],
  [80.53, 83.91, '*Imbangkan simpanan *tunai dengan *emas *fizikal.'],
  [83.91, 86.58, '*Lindungi hasil *titik *peluh anda.'],
  [86.58, 89.28, 'Tuan puan yang dah ready nak mulakan *simpan *emas'],
  [89.28, 90.95, 'boleh rujuk *pin *video saya.'],
  [90.95, 94.13, '*Dulu *ragu, *kini *tahu. Jom, mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'RISIKO');
const SCENES = [
  Hh(0, 4.84, (lt) => { const out = clamp((lt - 4.3) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'RISIKO TERSEMBUNYI', lines: ['5 RISIKO', 'SIMPAN TUNAI'], sub: 'SEMUA DUIT DALAM FD & ASB?' }); X.restore(); }, 1, WC.ma),
  B(4.84, 18.47, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'FD & ASB Selamat Ke?', 82);
    row(lt, 1.0, 440, 'Penyimpan', 'BERDISIPLIN TINGGI'); row(lt, 5.4, 590, '100% simpanan', 'DALAM TUNAI'); row(lt, 10.4, 740, 'Deposit tetap', 'RISIKO TERSEMBUNYI');
    stk(lt, .5, IMG.sSemua, 540, SB, 600);
  }),
  Hh(18.47, 23.14, CH(1, 'Dividen Tewas', 'Kepada Inflasi', null), -1, WC.ma),
  B(23.14, 29.89, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Kuasa Beli Susut', 96);
    row(lt, 1.0, 440, 'Dividen', 'BERTAMBAH'); row(lt, 3.4, 590, 'Kuasa beli', 'MAKIN BERKURANG');
    stk(lt, .4, IMG.sDividen, 540, SB, 620);
  }),
  Hh(29.89, 33.3, CH(2, 'Risiko Satu', 'Jenis Aset', null), 1, WC.ma),
  B(33.3, 40.93, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Satu Bakul Tunai', 96);
    row(lt, 1.0, 440, 'Semua simpanan', 'SATU BAKUL'); row(lt, 4.6, 590, 'Risiko', 'NILAI MATAWANG JATUH');
    stk(lt, .4, IMG.sRisiko, 540, SB, 620);
  }),
  Hh(40.93, 44.45, CH(3, 'Tiada Perisai', 'Krisis Kewangan', null), -1, WC.ma),
  B(44.45, 51.84, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Krisis Ekonomi', 100);
    row(lt, 1.0, 440, 'Krisis', 'EKONOMI MELANDA'); row(lt, 2.8, 590, 'Wang kertas', 'SUSUT NILAI DRASTIK');
    stk(lt, .4, IMG.sPerisai, 540, SB, 620);
  }),
  Hh(51.84, 56.11, CH(4, 'Potensi Lonjakan', 'Jangka Panjang', null), 1, WC.ma),
  B(56.11, 64.3, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Prestasi Emas', 100);
    anim(lt, 3.4, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'PURATA NAIK', '10%', 'setahun'));
    anim(lt, 5.6, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'MERENTASI', '2 DEKAD', 'jangka panjang'));
    stk(lt, .4, IMG.sPotensi, 540, SB, 600);
  }),
  Hh(64.3, 67.63, CH(5, 'Seimbangkan', 'Portfolio Anda', null), -1, WC.ma),
  B(67.63, 77.02, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Imbangkan Simpanan', 92);
    row(lt, 1.0, 440, 'Bukan keluar', 'SEMUA SIMPANAN'); row(lt, 3.8, 590, 'Alihkan', 'SEBAHAGIAN'); row(lt, 5.8, 740, 'Jadi', 'ASET EMAS');
    stk(lt, .4, IMG.sSeimbang, 540, SB, 600);
  }),
  B(77.02, 80.53, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Penyimpan Bijak', 100); stk(lt, .3, IMG.sBijak, 540, SB, 680); }),
  B(80.53, 83.91, 'ipad', WC.ma, (lt) => { ttl(lt, 'Tunai & Emas Fizikal', 88); anim(lt, .3, 540, 560, () => mWhite(130, 440, 820, ['Imbangkan tunai', '*dengan emas fizikal'], 50)); stk(lt, .3, IMG.sImbang, 540, SB, 640); }),
  B(83.91, 86.58, 'kg', WC.ma, (lt) => { ttl(lt, 'Lindungi Hasil', 100); stk(lt, .3, IMG.sLindungi, 540, SB, 680); }),
  B(86.58, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sBijak, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sSemua, IMG.sDividen, IMG.sRisiko, IMG.sPerisai, IMG.sPotensi, IMG.sSeimbang, IMG.sBijak, IMG.sImbang, IMG.sLindungi])), { nobk: true }),
];
