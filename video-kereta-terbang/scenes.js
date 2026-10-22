// scenes.js — "Nak tunggu kereta terbang baru simpan emas?" (86.66s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 86.656871, DUR = VOICE + 6, HEADN = 2600;
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
  anim(lt, 1.2, 540, 640, () => { shadow(() => { rr(180, 590, 720, 110, 55); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Semudah 5 Langkah', 540, 618, MA.F.h(54), '#fff', 'center'); });
  stk(lt, .6, hero, 540, SB, h);
};
const BAKE = ['tiers', 'kg', 'dulang', 'merak100', 'bunga50', 'syiling', 'g250', 'dinarPantai', 'shop', 'ipad', 'binder', 'bungamas', 'wallet', 'merak5'];
function bakeAll() { BAKE.forEach(k => { BGS[k] = MA.bgPhoto(k, 16, .45); }); }
const ASSETS = { ...PH, sKereta: 'stk-kereta.png', sTesla: 'stk-tesla.png', sLapuk: 'stk-lapuk.png', sRm270: 'stk-rm270.png', sGaji: 'stk-gaji.png', sInflasi: 'stk-inflasi.png', sSikit: 'stk-sikit.png', sKomen: 'stk-komen.png', sFizikal: 'stk-fizikal.png' };

const SEG = [
  [0, 2.1, 'Ada tak yang dulu guna *alasan?'],
  [2.1, 6.34, '*Tunggu *kereta boleh *terbang dahulu, barulah nak mula *simpan *emas.'],
  [6.34, 9.14, 'Kelakar, tapi *Tesla baru-baru ni'],
  [9.14, 12.17, 'dah umum projek *kereta *terbang mereka.'],
  [12.17, 14.61, 'Benda yang kita sangka *gurauan dahulu?'],
  [14.61, 16.5, 'sekarang ada *depan *mata.'],
  [16.5, 19.23, 'Peliknya, ramai yang masih *bertangguh'],
  [19.23, 22.39, 'nak mulakan simpanan dengan *aset *emas'],
  [22.39, 25.65, 'dengan alasan nak tunggu *harga *emas *turun dahulu.'],
  [25.65, 27.71, 'Tahun *2021 dulu,'],
  [27.71, 32.4, '*harga *emas sekitar *240 ke 280.'],
  [32.4, 34.28, 'Makin lama kita *tunggu,'],
  [34.28, 37.09, '*harga *emas makin laju, *tinggalkan'],
  [37.09, 39.0, 'nilai *pendapatan kita.'],
  [39.0, 44.05, '*Emas pernah *mencecah *764.'],
  [44.05, 48.42, 'Hari ini *harga *emas sekitar *590 lebih,'],
  [48.42, 50.33, 'hampir *mencecah *600.'],
  [50.33, 54.1, 'Jadi nak *tunggu, ataupun nak mulakan *simpan *emas?'],
  [54.1, 56.16, 'Sebab dalam *simpan *emas, yang penting'],
  [56.16, 60.81, 'adalah kita tahu *duit mana yang kita nak *asingkan kepada emas.'],
  [60.81, 62.74, 'Kemudian kita tahu'],
  [62.74, 65.44, '*tujuan kita nak *simpan *emas adalah untuk'],
  [65.44, 67.15, '*jangka *masa dua tahun,'],
  [67.15, 69.1, 'dan *lebih *lama *lebih *baik.'],
  [69.1, 71.86, 'Jadi tuan puan yang ada masalah sebelum ni,'],
  [71.86, 73.84, '*simpan *sikit-sikit.'],
  [73.84, 75.67, 'Boleh mulakan dengan'],
  [75.67, 77.5, '*1 *gram *emas di Public Gold'],
  [77.5, 80.13, 'ataupun boleh bermula dengan *RM100 saja.'],
  [80.13, 83.36, 'Boleh mulakan *simpan *emas dengan semudah *lima *langkah.'],
  [83.36, 85.56, '*Dulu *ragu, *kini *tahu. Jom!'],
  [85.56, 86.66, '*Simpan *emas.'],
];
const SCENES = [
  Hh(0, 6.34, (lt) => { const out = clamp((lt - 5.8) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'ALASAN LAPUK', lines: ['KERETA TERBANG', 'BARU SIMPAN EMAS?'], sub: 'MASIH NAK TUNGGU?' }); X.restore(); }, 1, WC.ma),
  B(6.34, 12.17, 'shop', WC.ma, (lt) => {
    ttl(lt, 'Tesla Umum', 100);
    row(lt, .8, 440, 'Projek', 'KERETA TERBANG');
    stk(lt, .4, IMG.sTesla, 540, SB, 620);
  }),
  B(12.17, 16.5, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Dulu Gurauan', 100);
    row(lt, .6, 440, 'Dulu', 'GURAUAN'); row(lt, 2.4, 590, 'Sekarang', 'DEPAN MATA');
    stk(lt, .4, IMG.sKereta, 540, SB, 620);
  }),
  B(16.5, 25.65, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Alasan Lapuk', 100);
    row(lt, .8, 440, 'Ramai masih', 'BERTANGGUH'); row(lt, 4.0, 590, 'Tunggu harga emas', 'TURUN DAHULU');
    stk(lt, .4, IMG.sLapuk, 540, SB, 620);
  }),
  B(25.65, 32.4, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Tahun 2021', 100);
    row(lt, .8, 440, 'Harga emas', 'RM240 - RM280'); 
    stk(lt, .4, IMG.sRm270, 540, SB, 620);
  }),
  B(32.4, 39.0, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Makin Lama Tunggu', 90);
    row(lt, .8, 440, 'Harga emas', 'MAKIN LAJU'); row(lt, 3.2, 590, 'Pendapatan kita', 'DITINGGALKAN');
    stk(lt, .4, IMG.sGaji, 540, SB, 620);
  }),
  B(39.0, 50.33, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Harga Hari Ini', 100);
    row(lt, .8, 440, 'Pernah mencecah', '764'); row(lt, 5.0, 590, 'Hari ini', '590 LEBIH'); row(lt, 9.4, 740, 'Hampir', '600');
    stk(lt, .4, IMG.sRm270, 540, SB, 600);
  }),
  B(50.33, 56.16, 'bungamas', WC.ma, (lt) => {
    ttl(lt, 'Tunggu Atau Mula?', 92);
    stk(lt, .4, IMG.sKomen, 540, SB, 640);
  }),
  B(56.16, 69.1, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Tahu Tujuan', 100);
    row(lt, .8, 440, 'Asingkan duit', 'KHAS UNTUK EMAS'); row(lt, 5.5, 590, 'Jangka masa', 'DUA TAHUN'); row(lt, 10.0, 740, 'Lebih lama', 'LEBIH BAIK');
    stk(lt, .4, IMG.sInflasi, 540, SB, 600);
  }),
  B(69.1, 80.13, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Simpan Sikit-Sikit', 92);
    row(lt, 2.8, 440, 'Mula dengan', '1 GRAM'); row(lt, 6.4, 590, 'Atau bermula', 'RM100 SAJA');
    stk(lt, .4, IMG.sSikit, 540, SB, 620);
  }),
  B(80.13, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sFizikal, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sKereta, IMG.sTesla, IMG.sLapuk, IMG.sRm270, IMG.sGaji, IMG.sInflasi, IMG.sSikit, IMG.sKomen, IMG.sFizikal])), { nobk: true }),
];
