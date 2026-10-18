// scenes.js — "5 Persiapan Sebelum Sambut Bayi Pertama" (92.18s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 92.183220, DUR = VOICE + 6, HEADN = 2765;
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
const ASSETS = { ...PH, sTimang: 'stk-timang.png', sKelahiran: 'stk-kelahiran.png', sTabung: 'stk-tabung.png', sGandakan: 'stk-gandakan.png', sLindungi: 'stk-lindungi.png', sPasangan: 'stk-pasangan.png', sAnugerah: 'stk-anugerah.png', sSambut: 'stk-sambut.png', sBina: 'stk-bina.png' };

const SEG = [
  [0, 3.6, '*5 *persiapan sebelum sambut *bayi *pertama'],
  [3.6, 6.0, 'Menerima khabar bakal menimang *cahaya *mata'],
  [6.0, 8.32, '*pertama adalah detik'],
  [8.32, 11.61, 'paling *membahagiakan bagi pasangan suami isteri.'],
  [11.61, 14.0, 'Namun *kegembiraan ini perlu diiringi'],
  [14.0, 16.6, 'dengan persediaan *kewangan yang rapi'],
  [16.6, 18.88, 'demi menyambut si *comel.'],
  [18.88, 21.5, '*Pertama, *kos *kelahiran dan tahun pertama'],
  [21.5, 24.21, 'bayi memerlukan *dana *khusus.'],
  [24.21, 27.0, '*Kos *hospital, peralatan bayi,'],
  [27.0, 30.1, 'lampin dan susu bertambah dengan pantas.'],
  [30.1, 32.5, '*Kedua, mulakan *tabung *pendidikan'],
  [32.5, 34.82, 'seawal kandungan disahkan.'],
  [34.82, 36.84, 'Lebih *awal kita bermula,'],
  [36.84, 40.96, 'lebih *ringan berbanding bayaran bulanan yang perlu diperuntukkan.'],
  [40.96, 45.27, '*Ketiga, *gandakan saiz *dana *kecemasan keluarga.'],
  [45.27, 48.24, 'Kehadiran anak kecil meningkatkan *tanggungjawab.'],
  [48.24, 52.62, 'Tabung kecemasan memberi *perlindungan bila anak kurang sihat.'],
  [52.62, 55.0, '*Keempat, *lindungi simpanan masa depan'],
  [55.0, 57.59, 'daripada hakisan *inflasi.'],
  [57.59, 61.52, 'Simpanan tunai mudah *susut *nilai, mudah terguna.'],
  [61.52, 64.87, 'Tukarkan sebahagian kepada bentuk *emas *fizikal.'],
  [64.87, 69.13, '*Dan *kelima, bina *persefahaman bersama *pasangan.'],
  [69.13, 72.2, 'Kerjasama suami isteri mengumpul *gram *emas'],
  [72.2, 74.99, 'setiap bulan mengukuhkan *ikatan rumah tangga.'],
  [74.99, 77.06, 'Kehadiran anak adalah'],
  [77.06, 79.36, '*anugerah *rezeki yang terindah.'],
  [79.36, 82.1, 'Sambutlah *zuriat anda dengan perancangan yang *tenang.'],
  [82.1, 84.96, 'Bina *masa *depan anak bermula *hari *ini.'],
  [84.96, 87.52, 'Tuan puan yang dah ready nak mulakan *simpan *emas?'],
  [87.52, 89.47, 'Boleh rujuk *pin *video saya.'],
  [89.47, 92.18, '*Dulu *ragu, *kini *tahu. Jom *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'PERSIAPAN');
const SCENES = [
  Hh(0, 3.6, (lt) => { const out = clamp((lt - 3.1) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'BAKAL IBU BAPA', lines: ['5 PERSIAPAN', 'BAYI PERTAMA'], sub: 'SEBELUM SAMBUT KELAHIRAN' }); X.restore(); }, 1, WC.ma),
  B(3.6, 11.61, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Cahaya Mata Pertama', 90);
    row(lt, .8, 440, 'Bakal timang', 'CAHAYA MATA'); row(lt, 3.2, 590, 'Detik paling', 'MEMBAHAGIAKAN'); row(lt, 5.4, 740, 'Suami isteri', 'BERBAHAGIA');
    stk(lt, .4, IMG.sTimang, 540, SB, 600);
  }),
  B(11.61, 18.88, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Persediaan Kewangan', 90);
    row(lt, .8, 440, 'Kegembiraan', 'PERLU PERSEDIAAN'); row(lt, 2.8, 590, 'Kewangan', 'YANG RAPI'); row(lt, 5.0, 740, 'Sambut', 'SI COMEL');
    stk(lt, .4, IMG.sAnugerah, 540, SB, 600);
  }),
  Hh(18.88, 24.21, CH(1, 'Kos Kelahiran', 'Tahun Pertama', null), -1, WC.ma),
  B(24.21, 30.1, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Dana Khusus Bayi', 96);
    row(lt, .8, 440, 'Hospital &', 'PERALATAN BAYI'); row(lt, 2.8, 590, 'Lampin &', 'SUSU'); row(lt, 4.2, 740, 'Bertambah', 'DENGAN PANTAS');
    stk(lt, .4, IMG.sKelahiran, 540, SB, 600);
  }),
  Hh(30.1, 34.82, CH(2, 'Tabung Pendidikan', 'Seawal Kandungan', null), 1, WC.ma),
  B(34.82, 40.96, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Mula Lebih Awal', 96);
    row(lt, .8, 440, 'Lebih awal', 'BERMULA'); row(lt, 2.2, 590, 'Bayaran bulanan', 'LEBIH RINGAN');
    stk(lt, .4, IMG.sTabung, 540, SB, 620);
  }),
  Hh(40.96, 45.27, CH(3, 'Gandakan Dana', 'Kecemasan', null), -1, WC.ma),
  B(45.27, 52.62, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Tanggungjawab Bertambah', 78);
    row(lt, .8, 440, 'Anak kecil', 'TANGGUNGJAWAB NAIK'); row(lt, 3.0, 590, 'Anak kurang sihat', 'ADA PERLINDUNGAN');
    stk(lt, .4, IMG.sGandakan, 540, SB, 620);
  }),
  Hh(52.62, 57.59, CH(4, 'Lindungi Simpanan', 'Dari Inflasi', null), 1, WC.ma),
  B(57.59, 64.87, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Tukar Kepada Emas', 90);
    row(lt, .8, 440, 'Simpanan tunai', 'MUDAH SUSUT NILAI'); row(lt, 3.3, 590, 'Tukar kepada', 'EMAS FIZIKAL');
    stk(lt, .4, IMG.sLindungi, 540, SB, 620);
  }),
  Hh(64.87, 69.13, CH(5, 'Persefahaman', 'Bersama Pasangan', null), -1, WC.ma),
  B(69.13, 74.99, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Simpan Bersama', 100);
    row(lt, .8, 440, 'Suami isteri', 'KUMPUL EMAS'); row(lt, 3.0, 590, 'Setiap bulan', 'IKATAN KUKUH');
    stk(lt, .4, IMG.sPasangan, 540, SB, 620);
  }),
  B(74.99, 79.36, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Anugerah Rezeki', 100); stk(lt, .3, IMG.sAnugerah, 540, SB, 680); }),
  B(79.36, 82.1, 'merak5', WC.ma, (lt) => { ttl(lt, 'Perancangan Tenang', 90); stk(lt, .3, IMG.sSambut, 540, SB, 680); }),
  B(82.1, 84.96, 'ipad', WC.ma, (lt) => { ttl(lt, 'Bermula Hari Ini', 96); stk(lt, .3, IMG.sBina, 540, SB, 680); }),
  B(84.96, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sBina, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sTimang, IMG.sKelahiran, IMG.sTabung, IMG.sGandakan, IMG.sLindungi, IMG.sPasangan, IMG.sAnugerah, IMG.sSambut, IMG.sBina])), { nobk: true }),
];
