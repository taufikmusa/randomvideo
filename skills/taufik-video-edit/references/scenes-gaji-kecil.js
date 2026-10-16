// scenes.js — "5 Sebab Gaji Kecil Pun Wajib Simpan Emas" (100.87s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 100.867007, DUR = VOICE + 6, HEADN = 3026;
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
const ASSETS = { ...PH, sGaji: 'stk-gaji-kecil-simpan-emas.png', sInflasi: 'stk-mangsa-utama-inflasi.png', sSeratus: 'stk-mula-seratus-ringgit.png', sKebocoran: 'stk-tutup-kebocoran-harian.png', sSyarat: 'stk-tiada-syarat-bulanan.png', sLangkah: 'stk-langkah-pertama.png', sTakKaya: 'stk-tak-perlu-kaya.png', sUbah: 'stk-perlu-mula-ubah-nasib.png', sMulakan: 'stk-mulakan-hari-ini.png' };

const SEG = [
  [0, 3.37, '*5 *sebab orang yang *bergaji *kecil paling *wajib'],
  [3.37, 8.97, 'simpan *emas. Gaji sendiri pun cukup-cukup makan, mana mampu nak simpan emas?'],
  [8.97, 11.47, 'Ini *salah *faham paling biasa.'],
  [11.47, 14.56, 'Hakikatnya, golongan *berpendapatan *rendah'],
  [14.56, 16.6, 'paling *perlu ada *emas.'],
  [16.6, 20.26, '*Pertama, *mangsa *utama *inflasi.'],
  [20.26, 22.33, 'Bila harga *makanan *naik,'],
  [22.33, 25.7, 'golongan berpendapatan kecil paling *terhimpit.'],
  [25.7, 29.82, 'Emas *melindungi nilai duit yang sedikit itu.'],
  [29.82, 34.2, '*Kedua, boleh mula cuma dengan *100 *ringgit.'],
  [34.2, 39.52, 'Nilai ini bersamaan kira-kira *RM3.50 *sehari,'],
  [39.52, 43.17, 'kurang daripada harga sebungkus *makanan *ringan.'],
  [43.17, 45.41, '*Ketiga, *tutup'],
  [45.41, 47.36, '*kebocoran *kecil *harian.'],
  [47.36, 52.55, 'Duit kopi, duit beli jajan, jika dialihkan ke dalam *simpanan *emas,'],
  [52.55, 55.77, 'mampu membina *grab emas yang *bernilai.'],
  [55.77, 59.41, '*Keempat, tiada syarat *komitmen *bulanan.'],
  [59.41, 61.46, '*Public *Gold'],
  [61.46, 64.11, 'Kita boleh simpan *bila-bila *masa,'],
  [64.11, 68.92, 'bila mana kita ada *lebihan yang kita nak jadikan *emas.'],
  [68.92, 73.43, '*Dan *kelima, *perjalanan *jauh bermula dengan *langkah *pertama.'],
  [73.43, 76.72, 'Orang yang ada simpanan besar hari ini'],
  [76.72, 79.39, 'semuanya bermula dengan jumlah yang *kecil.'],
  [79.39, 82.36, 'Tak perlu *kaya untuk mula menyimpan emas,'],
  [82.36, 85.29, 'tapi kita perlu *bermula menyimpan emas'],
  [85.29, 86.99, 'untuk *ubah *nasib.'],
  [86.99, 89.84, 'Mulakan *langkah *pertama anda *hari *ini.'],
  [89.84, 91.91, 'Boleh rujuk *video saya,'],
  [91.91, 93.52, 'saya kongsikan'],
  [93.52, 97.41, '*cara *mudah untuk mulakan *simpan *emas di *Public *Gold.'],
  [97.41, 99.01, '*Dulu *ragu, *kini *tahu.'],
  [99.01, 100.87, 'Jom *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'SEBAB');
const SCENES = [
  Hh(0, 3.37, (lt) => { const out = clamp((lt - 2.9) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'MITOS GAJI KECIL', lines: ['5 SEBAB', 'GAJI KECIL'], sub: 'PUN WAJIB SIMPAN EMAS' }); X.restore(); }, 1, WC.ma),
  B(3.37, 8.97, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Gaji Kecil?', 100);
    row(lt, .6, 440, 'Gaji sendiri', 'CUKUP-CUKUP MAKAN'); row(lt, 3.0, 590, 'Mana mampu', 'SIMPAN EMAS?');
    stk(lt, .4, IMG.sGaji, 540, SB, 640);
  }),
  B(8.97, 16.6, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Salah Faham Biasa', 92);
    row(lt, .4, 440, 'Salah faham', 'PALING BIASA'); row(lt, 2.7, 590, 'Pendapatan rendah', 'PALING PERLU EMAS');
    stk(lt, 2.9, IMG.sUbah, 540, SB, 640);
  }),
  Hh(16.6, 20.26, CH(1, 'Mangsa Utama', 'Inflasi', null), -1, WC.ma),
  B(20.26, 29.82, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Harga Makanan Naik', 90);
    row(lt, 1.0, 440, 'Harga makanan', 'NAIK'); row(lt, 3.0, 590, 'Gaji kecil', 'PALING TERHIMPIT'); row(lt, 5.7, 740, 'Emas', 'LINDUNG NILAI DUIT');
    stk(lt, .4, IMG.sInflasi, 540, SB, 600);
  }),
  Hh(29.82, 34.2, CH(2, 'Mula Cuma', 'RM100', null), 1, WC.ma),
  B(34.2, 43.17, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Mula RM100', 100);
    anim(lt, .8, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'MULA CUMA', 'RM100', 'bukan mustahil'));
    anim(lt, 3.8, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'SEHARI KIRA-KIRA', 'RM3.50', 'kurang dari snek'));
    stk(lt, 5.8, IMG.sSeratus, 540, SB, 600);
  }),
  Hh(43.17, 47.36, CH(3, 'Tutup Kebocoran', 'Kecil Harian', null), -1, WC.ma),
  B(47.36, 55.77, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Duit Kopi & Jajan', 96);
    row(lt, 1.0, 440, 'Duit kopi', 'ALIH KE SIMPANAN'); row(lt, 2.8, 590, 'Duit jajan', 'ALIH KE SIMPANAN'); row(lt, 5.4, 740, 'Hasilnya', 'EMAS BERNILAI');
    stk(lt, .4, IMG.sKebocoran, 540, SB, 600);
  }),
  Hh(55.77, 59.41, CH(4, 'Tiada Syarat', 'Komitmen Bulanan', null), 1, WC.ma),
  B(59.41, 68.92, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Simpan Fleksibel', 96);
    row(lt, .4, 440, 'Di', 'PUBLIC GOLD'); row(lt, 2.0, 590, 'Simpan', 'BILA-BILA MASA'); row(lt, 5.4, 740, 'Ada lebihan', 'TERUS SIMPAN');
    stk(lt, .4, IMG.sSyarat, 540, SB, 600);
  }),
  Hh(68.92, 73.43, CH(5, 'Langkah Pertama', null, 'perjalanan jauh bermula'), -1, WC.ma),
  B(73.43, 79.39, 'g250', WC.ma, (lt) => { ttl(lt, 'Bermula Kecil', 100); anim(lt, 1.5, 540, 560, () => mWhite(130, 440, 820, ['Simpanan besar hari ini', '*bermula dari kecil'], 48)); stk(lt, .4, IMG.sLangkah, 540, SB, 640); }),
  B(79.39, 82.36, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Tak Perlu Kaya', 100); anim(lt, .3, 540, 560, () => mWhite(130, 440, 820, ['Tak perlu kaya', '*untuk mula'], 54)); stk(lt, .3, IMG.sTakKaya, 540, SB, 640); }),
  B(82.36, 86.99, 'merak5', WC.ma, (lt) => { ttl(lt, 'Ubah Nasib', 100); anim(lt, .5, 540, 560, () => mWhite(130, 440, 820, ['Mula menyimpan emas', '*ubah nasib'], 50)); stk(lt, .3, IMG.sUbah, 540, SB, 640); }),
  B(86.99, 93.52, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Langkah Pertama', 92);
    row(lt, 1.0, 440, 'Mulakan', 'HARI INI'); row(lt, 4.9, 590, 'Cara mudah di', 'PUBLIC GOLD');
    stk(lt, .4, IMG.sMulakan, 540, SB, 620);
  }),
  B(93.52, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sSeratus, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sGaji, IMG.sInflasi, IMG.sSeratus, IMG.sKebocoran, IMG.sSyarat, IMG.sLangkah, IMG.sTakKaya, IMG.sUbah, IMG.sMulakan])), { nobk: true }),
];
