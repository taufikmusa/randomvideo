// scenes.js — "5 Sebab Simpan Emas Cara Terbaik Ke Tanah Suci" (97.012993s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 97.012993, DUR = VOICE + 6, HEADN = 2910;
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
const ASSETS = { ...PH, sImpian: 'stk-impian-tanah-suci.png', sKos: 'stk-kos-pakej-meningkat.png', sPenyelamat: 'stk-emas-penyelamat-kuasa-beli.png', sBebasRiba: 'stk-bebas-riba-tenang-jiwa.png', sKumpul: 'stk-kumpul-sedikit-demi-sedikit.png', sBekalan: 'stk-bekalan-keluarga.png', sMula: 'stk-mula-merancang-sekarang.png', sSetiap: 'stk-setiap-gram-dekatkan-langkah.png', sMoga: 'stk-moga-impian-tercapai.png' };

const SEG = [
  [0, 5.23, '*5 *sebab *simpan *emas adalah antara cara terbaik ke *tanah *suci.'],
  [5.23, 11.82, 'Menjejakkan kaki ke tanah suci untuk menunaikan *haji ataupun *umrah adalah *impian setiap muslim.'],
  [11.82, 15.35, 'Namun, *kos pakej terus *meningkat setiap tahun.'],
  [15.35, 19.69, 'Ini adalah *lima sebab kenapa emas antara jalan terbaik.'],
  [19.69, 23.08, '*Pertama, kos *umrah dan *haji *meningkat'],
  [23.08, 30.77, 'saban musim. Kenaikan kos pakej sukar dikejar jika kita hanya bergantung pada *simpanan *tunai biasa.'],
  [30.77, 34.55, '*Kedua, *emas memelihara *kuasa *beli.'],
  [34.55, 38.42, 'Nilai emas meningkat seiring kenaikan kos semasa,'],
  [38.42, 43.47, 'memastikan nilai simpanan kita sentiasa seiring dengan *harga *pakej.'],
  [43.47, 47.6, '*Ketiga, kaedah *patuh *syariah untuk niat yang suci.'],
  [47.6, 49.28, 'Menyimpan *emas *fizikal'],
  [49.28, 51.42, 'memberikan kita *ketenangan *jiwa'],
  [51.42, 54.26, 'kerana ia disahkan *patuh *syariah'],
  [54.26, 56.77, 'dan tiada unsur *keraguan.'],
  [56.77, 61.64, '*Keempat, menabung *sedikit demi sedikit tanpa rasa beban'],
  [61.64, 63.46, 'di *Akaun *Emas *GAP *Public *Gold.'],
  [63.46, 67.0, 'Kita boleh kumpul emas sikit-sikit tanpa komitmen.'],
  [67.0, 71.15, '*Kelima, *lebihan *emas jadi *bekalan *keluarga.'],
  [71.15, 73.55, 'Jika ada lebihan simpanan emas,'],
  [73.55, 75.61, 'ia boleh menjadi tabung'],
  [75.61, 78.24, 'keluarga yang ditinggalkan di tanah air.'],
  [78.24, 80.75, 'Ibadah suci wajar dimulakan'],
  [80.75, 83.13, 'dengan *perancangan yang rapi.'],
  [83.13, 86.51, 'Biarkan setiap *gram *emas mendekatkan langkah anda.'],
  [86.51, 89.47, 'Moga impian ke *Baitullah *tercapai.'],
  [89.47, 94.11, 'InsyaAllah, tuan puan yang dah ready nak mulakan *simpan *emas boleh rujuk *pin *video saya.'],
  [94.11, 95.9, '*Dulu *ragu, *kini *tahu.'],
  [95.9, 97.01, 'Jom *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'SEBAB');
const SCENES = [
  Hh(0, 5.23, (lt) => { const out = clamp((lt - 4.7) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'IMPIAN TANAH SUCI', lines: ['5 SEBAB', 'SIMPAN EMAS'], sub: 'CARA TERBAIK KE TANAH SUCI' }); X.restore(); }, 1, WC.ma),
  B(5.23, 15.35, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Impian Setiap Muslim', 84);
    row(lt, 1.0, 440, 'Tunai', 'HAJI & UMRAH'); row(lt, 6.2, 590, 'Kos pakej', 'TERUS NAIK');
    stk(lt, .4, IMG.sImpian, 540, SB, 640);
  }),
  Hh(15.35, 19.69, (lt) => { anim(lt, .1, 540, 560, () => mHead('Lima Sebab Kenapa', 540, 560, 80)); anim(lt, .5, 540, 760, () => mPill(['Emas Jalan', 'Terbaik'], 540, 700, 100)); anim(lt, .5, 540, 760, () => MA.side(770)); }, 1, WC.ma),
  Hh(19.69, 23.08, CH(1, 'Kos Haji & Umrah', 'Meningkat', 'saban musim'), -1, WC.ma),
  B(23.08, 30.77, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Kos Pakej Naik', 100);
    row(lt, 1.2, 440, 'Simpanan tunai', 'SUKAR KEJAR'); row(lt, 4.6, 590, 'Kenaikan', 'SETIAP TAHUN');
    stk(lt, .4, IMG.sKos, 540, SB, 640);
  }),
  Hh(30.77, 34.55, CH(2, 'Emas Pelihara', 'Kuasa Beli', null), 1, WC.ma),
  B(34.55, 43.47, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Nilai Seiring Kos', 96);
    anim(lt, 1.5, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'NILAI EMAS', 'NAIK', 'seiring kos semasa'));
    anim(lt, 4.5, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'HARGA PAKEJ', 'SEIRING', 'nilai terpelihara'));
    stk(lt, 5.6, IMG.sPenyelamat, 540, SB, 600);
  }),
  Hh(43.47, 47.6, CH(3, 'Patuh Syariah', null, 'untuk niat yang suci'), -1, WC.ma),
  B(47.6, 56.77, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Emas Fizikal', 100);
    row(lt, .3, 440, 'Jiwa', 'TENANG'); row(lt, 2.6, 590, 'Disahkan', 'PATUH SYARIAH'); row(lt, 6.0, 740, 'Unsur', 'TIADA KERAGUAN');
    stk(lt, .6, IMG.sBebasRiba, 540, SB, 600);
  }),
  Hh(56.77, 61.64, CH(4, 'Menabung Sedikit', 'Demi Sedikit', 'tanpa rasa beban'), 1, WC.ma),
  B(61.64, 67.0, 'ipad', WC.ma, (lt) => { ttl(lt, 'Akaun Emas GAP', 96); anim(lt, 1.8, 540, 560, () => mWhite(130, 440, 820, ['Kumpul sikit-sikit', '*tanpa komitmen'], 50)); stk(lt, .3, IMG.sKumpul, 540, SB, 640); }),
  Hh(67.0, 71.15, CH(5, 'Lebihan Emas', 'Bekalan Keluarga', null), -1, WC.ma),
  B(71.15, 78.24, 'bunga50', WC.ma, (lt) => { ttl(lt, 'Tabung Keluarga', 96); anim(lt, 2.5, 540, 560, () => mWhite(130, 440, 820, ['Bekalan untuk', '*keluarga di tanah air'], 50)); stk(lt, .4, IMG.sBekalan, 540, SB, 640); }),
  B(78.24, 83.13, 'syiling', WC.ma, (lt) => { ttl(lt, 'Ibadah Suci', 100); anim(lt, 2.4, 540, 560, () => mWhite(130, 440, 820, ['Mulakan dengan', '*perancangan rapi'], 52)); stk(lt, .4, IMG.sMula, 540, SB, 640); }),
  B(83.13, 89.47, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Setiap Gram', 100);
    if (lt < 3.3) stk(lt, .3, IMG.sSetiap, 540, SB, 640); else stk(lt, 3.4, IMG.sMoga, 540, SB, 640);
    anim(lt, 3.6, 540, 560, () => mWhite(130, 440, 820, ['Moga impian', '*Baitullah tercapai'], 52));
  }),
  B(89.47, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sMoga, 640)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sImpian, IMG.sKos, IMG.sPenyelamat, IMG.sBebasRiba, IMG.sKumpul, IMG.sBekalan, IMG.sMula, IMG.sSetiap, IMG.sMoga])), { nobk: true }),
];
