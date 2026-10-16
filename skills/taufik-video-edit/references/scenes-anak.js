// scenes.js — "5 Hadiah Paling Bernilai Untuk Anak Baru Lahir" (95.88s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 95.875011, DUR = VOICE + 6, HEADN = 2876;
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
const ASSETS = { ...PH, sAnak: 'stk-anak-anugerah.png', sAset: 'stk-aset-masa-panjang.png', sSeratus: 'stk-seratus-sebulan.png', sAkaun: 'stk-akaun-atas-nama-anak.png', sKalis: 'stk-kalis-hakisan.png', sDidik: 'stk-didikan-kewangan.png', sPakaian: 'stk-pakaian-comel.png', sBesar: 'stk-emas-membesar.png', sMasaDepan: 'stk-masa-depan-anak.png' };

const SEG = [
  [0, 4.34, '*5 *hadiah paling *bernilai untuk anak *baru *lahir'],
  [4.34, 9.4, 'Kelahiran *cahaya *mata membawa *kegembiraan yang sukar digambarkan.'],
  [9.4, 12.57, 'Tapi selain daripada *lampin dan pakaian comel,'],
  [12.57, 15.3, 'ada hadiah jauh lebih *bermakna untuk'],
  [15.3, 17.68, '*masa *depan mereka. *Pertama,'],
  [17.68, 20.91, '*aset *masa selama *belasan *tahun.'],
  [20.91, 27.77, 'Memulakan simpanan sejak anak masih kecil memberi tempoh masa yang *sangat *panjang untuk nilainya berkembang.'],
  [27.77, 31.51, '*Kedua, *RM100 *sebulan impaknya *besar.'],
  [31.51, 34.94, 'Menabung secara *konsisten dari umur *sehari'],
  [34.94, 39.51, 'akan menjadi *dana *universiti yang kukuh bila anak dah dewasa.'],
  [39.51, 43.31, '*Ketiga, *akaun simpanan rasmi *atas *nama *anak.'],
  [43.31, 45.27, 'Membuka *Akaun *Emas *GAP'],
  [45.27, 48.11, '*Public *Gold *Junior membolehkan ibu bapa'],
  [48.11, 51.75, 'membina tabungan emas khas yang *tidak *terusik.'],
  [51.75, 55.75, '*Keempat, *kalis daripada *hakisan *kuasa *beli.'],
  [55.75, 60.64, 'Wang tunai yang disimpan untuk anak, *rugi nilainya selepas *18 *tahun.'],
  [60.64, 62.25, 'Tetapi, *emas'],
  [62.25, 64.43, 'mengekalkan *kuasa *beli tersebut.'],
  [64.43, 69.81, '*Dan *kelima, *didikan *kewangan sejak kecil apabila anak membesar'],
  [69.81, 72.23, 'dan melihat simpanan emas mereka.'],
  [72.23, 75.69, 'Mereka belajar *menghargai erti *aset *sebenar.'],
  [75.69, 79.63, '*Pakaian *comel akan *sempit dan *mainan akan *rosak,'],
  [79.63, 81.39, 'tapi *simpanan *emas'],
  [81.39, 84.4, '*membesar seiring *usia anak anda.'],
  [84.4, 87.26, 'Bina *masa *depan anak bermula *hari *ini.'],
  [87.26, 90.52, 'Tuan puan yang dah ready nak mulakan *simpan *emas untuk anak,'],
  [90.52, 92.36, 'boleh rujuk *pin *video saya.'],
  [92.36, 94.43, '*Dulu *ragu, *kini *tahu. Jom'],
  [94.43, 95.88, 'mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'HADIAH');
const SCENES = [
  Hh(0, 4.34, (lt) => { const out = clamp((lt - 3.8) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'HADIAH BAYI', lines: ['5 HADIAH', 'UNTUK ANAK'], sub: 'BARU LAHIR PALING BERNILAI' }); X.restore(); }, 1, WC.ma),
  B(4.34, 12.57, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Anak Baru Lahir', 100);
    row(lt, .8, 440, 'Cahaya mata', 'KEGEMBIRAAN'); row(lt, 5.2, 590, 'Selain lampin', 'PAKAIAN COMEL');
    stk(lt, .4, IMG.sAnak, 540, SB, 620);
  }),
  B(12.57, 15.3, 'kg', WC.ma, (lt) => { ttl(lt, 'Hadiah Bermakna', 100); anim(lt, .3, 540, 560, () => mWhite(130, 440, 820, ['Hadiah jauh lebih', '*bermakna'], 52)); stk(lt, .3, IMG.sMasaDepan, 540, SB, 620); }),
  Hh(15.3, 20.91, CH(1, 'Aset Masa', 'Belasan Tahun', null), -1, WC.ma),
  B(20.91, 27.77, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Aset Masa', 100);
    row(lt, 1.0, 440, 'Mula sejak kecil', 'TEMPOH PANJANG'); row(lt, 4.2, 590, 'Nilai', 'BERKEMBANG');
    stk(lt, .4, IMG.sAset, 540, SB, 620);
  }),
  Hh(27.77, 31.51, CH(2, 'RM100 Sebulan', 'Impak Besar', null), 1, WC.ma),
  B(31.51, 39.51, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Menabung Konsisten', 90);
    row(lt, 1.0, 440, 'Dari umur', 'SEHARI'); row(lt, 3.6, 590, 'Jadi', 'DANA UNIVERSITI');
    stk(lt, .4, IMG.sSeratus, 540, SB, 620);
  }),
  Hh(39.51, 43.31, CH(3, 'Akaun Atas', 'Nama Anak', null), -1, WC.ma),
  B(43.31, 51.75, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Akaun Emas GAP Junior', 80);
    row(lt, 1.0, 440, 'Atas nama', 'ANAK'); row(lt, 3.0, 590, 'Public Gold', 'JUNIOR'); row(lt, 5.5, 740, 'Tabung emas khas', 'TIDAK TERUSIK');
    stk(lt, .4, IMG.sAkaun, 540, SB, 600);
  }),
  Hh(51.75, 55.75, CH(4, 'Kalis Hakisan', 'Kuasa Beli', null), 1, WC.ma),
  B(55.75, 64.43, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Tunai Rugi Nilai', 100);
    row(lt, .8, 440, 'Tunai 18 tahun', 'RUGI NILAI'); row(lt, 5.0, 590, 'Emas', 'KEKAL KUASA BELI');
    stk(lt, .4, IMG.sKalis, 540, SB, 620);
  }),
  Hh(64.43, 69.81, CH(5, 'Didikan Kewangan', 'Sejak Kecil', null), -1, WC.ma),
  B(69.81, 75.69, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Belajar Hargai Aset', 90);
    row(lt, 1.0, 440, 'Anak membesar', 'LIHAT SIMPANAN'); row(lt, 3.0, 590, 'Belajar', 'ERTI ASET SEBENAR');
    stk(lt, .4, IMG.sDidik, 540, SB, 620);
  }),
  B(75.69, 81.39, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Pakaian Sempit', 100);
    anim(lt, .8, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'PAKAIAN COMEL', 'SEMPIT', 'cepat muat'));
    anim(lt, 2.5, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'MAINAN', 'ROSAK', 'tak tahan lama'));
    stk(lt, 3.6, IMG.sPakaian, 540, SB, 600);
  }),
  B(81.39, 84.4, 'merak5', WC.ma, (lt) => { ttl(lt, 'Emas Membesar', 100); anim(lt, .3, 540, 560, () => mWhite(130, 440, 820, ['Simpanan emas', '*membesar bersama anak'], 50)); stk(lt, .3, IMG.sBesar, 540, SB, 620); }),
  B(84.4, 87.26, 'ipad', WC.ma, (lt) => { ttl(lt, 'Mula Hari Ini', 100); stk(lt, .3, IMG.sMasaDepan, 540, SB, 700); }),
  B(87.26, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sBesar, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sAnak, IMG.sAset, IMG.sSeratus, IMG.sAkaun, IMG.sKalis, IMG.sDidik, IMG.sPakaian, IMG.sBesar, IMG.sMasaDepan])), { nobk: true }),
];
