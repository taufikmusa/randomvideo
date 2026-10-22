// scenes.js — "5 Sebab Umur 40 Bukan Terlambat Bina Harta" (97.47s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 97.466667, DUR = VOICE + 6, HEADN = 2924;
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
const ASSETS = { ...PH, sUsia: 'stk-usia-40-terlambat.png', sHari: 'stk-hari-ini-terbaik.png', sKemuncak: 'stk-waktu-kemuncak.png', sBaki: 'stk-baki-15-20-tahun.png', sMatang: 'stk-lebih-matang.png', sBertindak: 'stk-bertindak-sekarang.png', sBersalah: 'stk-jangan-rasa-bersalah.png', sRezeki: 'stk-selagi-ada-rezeki.png', sKukuh: 'stk-mula-kukuhkan.png' };

const SEG = [
  [0, 2.48, '*5 *sebab *umur *40 tahun'],
  [2.48, 5.18, '*bukan *terlambat untuk bina harta.'],
  [5.18, 8.0, 'Usia sudah mencecah *40 tahun,'],
  [8.0, 11.39, 'tapi *simpanan di bank masih belum seberapa.'],
  [11.39, 14.06, 'Ramai yang mula *putus *asa dan fikir'],
  [14.06, 16.68, 'sudah *terlambat untuk bermula.'],
  [16.68, 18.98, 'Hakikatnya, *tanggapan itu *salah.'],
  [18.98, 23.14, '*Pertama, *masa *terbaik *kedua adalah *hari *ini.'],
  [23.14, 25.44, 'Masa lalu tak boleh diputar,'],
  [25.44, 27.46, 'tapi *menangguhkannya'],
  [27.46, 30.76, 'lagi hanya *merugikan masa depan anda.'],
  [30.76, 34.56, '*Kedua, waktu *kemuncak *pendapatan *kerjaya.'],
  [34.56, 41.48, 'Di usia ini, gaji dan kemahiran anda selalu berada pada tahap *paling *tinggi untuk'],
  [41.48, 43.8, '*menabung secara *agresif.'],
  [43.8, 48.37, '*Ketiga, masih ada *baki *15 hingga *20 *tahun.'],
  [48.37, 52.6, 'Tempoh ini masih cukup panjang untuk melihat *simpanan *emas'],
  [52.6, 55.76, '*membesar sebelum waktu *bersara tiba.'],
  [55.76, 60.17, '*Keempat, anda sekarang lebih *matang dan *berdisiplin,'],
  [60.17, 63.21, 'tidak lagi *ghairah berbelanja perkara *sia-sia'],
  [63.21, 64.87, 'seperti waktu muda,'],
  [64.87, 67.88, 'menjadikannya *kelebihan yang besar.'],
  [67.88, 70.51, '*Dan *kelima, *bertindak *sekarang,'],
  [70.51, 72.55, 'elak masa tua *derita.'],
  [72.55, 75.24, 'Setiap bulan yang anda mulakan hari ini'],
  [75.24, 78.08, 'menyelamatkan *maruah di hari *tua nanti.'],
  [78.08, 81.15, 'Jangan biarkan *rasa *bersalah masa lalu'],
  [81.15, 88.02, '*melemahkan anda. Selagi masih ada *rezeki yang mengalir masuk, mula *kukuhkan *kewangan anda hari ini'],
  [88.02, 92.0, 'dengan *simpanan *emas. Tuan puan yang dah ready nak mulakan simpanan'],
  [92.0, 93.71, 'boleh rujuk *pin *video saya,'],
  [93.71, 95.91, '*Dulu *ragu, *kini *tahu. Jom'],
  [95.91, 97.47, 'mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'SEBAB');
const SCENES = [
  Hh(0, 5.18, (lt) => { const out = clamp((lt - 4.6) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'MASIH BELUM LEWAT', lines: ['5 SEBAB', 'UMUR 40'], sub: 'BUKAN TERLAMBAT BINA HARTA' }); X.restore(); }, 1, WC.ma),
  B(5.18, 18.98, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Usia 40 Tahun', 100);
    row(lt, .8, 440, 'Usia', 'MENCECAH 40'); row(lt, 3.0, 590, 'Simpanan bank', 'BELUM SEBERAPA'); row(lt, 6.4, 740, 'Ramai', 'PUTUS ASA');
    stk(lt, .4, IMG.sUsia, 540, SB, 600);
  }),
  Hh(18.98, 23.14, CH(1, 'Masa Terbaik Kedua', 'Adalah Hari Ini', null), -1, WC.ma),
  B(23.14, 30.76, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Mula Hari Ini', 100);
    row(lt, 1.0, 440, 'Masa lalu', 'TAK BOLEH DIPUTAR'); row(lt, 3.8, 590, 'Menangguh lagi', 'RUGI MASA DEPAN');
    stk(lt, .4, IMG.sHari, 540, SB, 620);
  }),
  Hh(30.76, 34.56, CH(2, 'Waktu Kemuncak', 'Pendapatan Kerjaya', null), 1, WC.ma),
  B(34.56, 43.8, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Kemuncak Kerjaya', 96);
    row(lt, 1.0, 440, 'Gaji', 'TAHAP TINGGI'); row(lt, 3.2, 590, 'Kemahiran', 'PALING MATANG'); row(lt, 6.8, 740, 'Menabung', 'SECARA AGRESIF');
    stk(lt, .4, IMG.sKemuncak, 540, SB, 600);
  }),
  Hh(43.8, 48.37, CH(3, 'Masih Ada Baki', '15-20 Tahun', null), -1, WC.ma),
  B(48.37, 55.76, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Masa Masih Panjang', 90);
    anim(lt, 1.0, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'BAKI MASA', '15-20', 'tahun lagi'));
    anim(lt, 4.0, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'SEBELUM', 'BERSARA', 'emas membesar'));
    stk(lt, 5.6, IMG.sBaki, 540, SB, 600);
  }),
  Hh(55.76, 60.17, CH(4, 'Lebih Matang', 'Dan Berdisiplin', null), 1, WC.ma),
  B(60.17, 67.88, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Kurang Sia-Sia', 100);
    row(lt, 1.0, 440, 'Tak lagi', 'GHAIRAH BELANJA'); row(lt, 3.2, 590, 'Tak seperti', 'WAKTU MUDA'); row(lt, 5.4, 740, 'Jadi', 'KELEBIHAN BESAR');
    stk(lt, .4, IMG.sMatang, 540, SB, 600);
  }),
  Hh(67.88, 72.55, CH(5, 'Bertindak Sekarang', null, 'elak masa tua derita'), -1, WC.ma),
  B(72.55, 78.08, 'g250', WC.ma, (lt) => { ttl(lt, 'Setiap Bulan Berharga', 88); anim(lt, 1.0, 540, 560, () => mWhite(130, 440, 820, ['Mulakan hari ini,', '*maruah hari tua terjaga'], 46)); stk(lt, .4, IMG.sBertindak, 540, SB, 620); }),
  B(78.08, 83.9, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Jangan Rasa Bersalah', 88); anim(lt, 1.0, 540, 560, () => mWhite(130, 440, 820, ['Masa lalu tak', '*lemahkan anda'], 52)); stk(lt, .3, IMG.sBersalah, 540, SB, 620); }),
  B(83.9, 87.5, 'merak5', WC.ma, (lt) => { ttl(lt, 'Rezeki Mengalir Masuk', 84); stk(lt, .3, IMG.sRezeki, 540, SB, 660); }),
  B(87.5, 92.0, 'ipad', WC.ma, (lt) => { ttl(lt, 'Kukuhkan Kewangan', 92); row(lt, 1.2, 440, 'Dengan', 'SIMPANAN EMAS'); stk(lt, .3, IMG.sKukuh, 540, SB, 640); }),
  B(92.0, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sKukuh, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sUsia, IMG.sHari, IMG.sKemuncak, IMG.sBaki, IMG.sMatang, IMG.sBertindak, IMG.sBersalah, IMG.sRezeki, IMG.sKukuh])), { nobk: true }),
];
