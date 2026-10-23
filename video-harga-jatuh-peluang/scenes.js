// scenes.js — "Harga Jatuh = Peluang? 5 Pesan Guru" (149.84s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 149.838367, DUR = VOICE + 6, HEADN = 4495;
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
  anim(lt, 1.2, 540, 640, () => { shadow(() => { rr(180, 590, 720, 110, 55); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Rujuk Pin Video', 540, 618, MA.F.h(54), '#fff', 'center'); });
  stk(lt, .6, hero, 540, SB, h);
};
const BAKE = ['tiers', 'kg', 'dulang', 'merak100', 'bunga50', 'syiling', 'g250', 'dinarPantai', 'shop', 'ipad', 'binder', 'bungamas', 'wallet', 'merak5'];
function bakeAll() { BAKE.forEach(k => { BGS[k] = MA.bgPhoto(k, 16, .45); }); }
const ASSETS = { ...PH, sPeluang: 'stk-peluang.png', sRendah: 'stk-rendah.png', sGram: 'stk-gram.png', sMatlamat: 'stk-matlamat.png', sBenteng: 'stk-benteng.png', sTenang: 'stk-tenang.png', sRm100: 'stk-rm100.png', sIstiqamah: 'stk-istiqamah.png', sRagu: 'stk-ragu.png' };
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'CARA');
const SEG = [
  [0, 5.73, '*Harga *emas tengah *jatuh. Bila tengok harga emas turun macam ni, saya percaya ada yang mula *risau.'],
  [5.73, 11.55, 'Ada juga yang ambil keputusan untuk *tunggu dulu dengan harapan harga emas jatuh *lebih *rendah'],
  [11.55, 14.35, 'sebelum mereka nak mula beli emas balik.'],
  [14.35, 17.53, 'Sebenarnya benda ini buat saya teringat *pesan *guru saya'],
  [17.53, 21.98, 'tentang bagaimana kita sepatutnya melihat *kejatuhan harga emas.'],
  [21.98, 27.94, '*Pertama, anggap harga jatuh sebagai *peluang untuk kita kumpul *lebih *banyak *gram.'],
  [27.94, 31.23, 'Bagi orang yang menyimpan emas untuk jangka masa panjang,'],
  [31.23, 33.69, 'harga turun tak semestinya *berita *buruk.'],
  [33.69, 37.76, 'Masa harga naik kita gembira, nilai simpanan kita meningkat.'],
  [37.76, 42.72, 'Bila harga turun, itulah peluang untuk kita dapatkan *lebih *banyak *gram'],
  [42.72, 44.6, 'dengan jumlah wang yang sama.'],
  [44.6, 48.83, 'Cuma kita kena faham *matlamat sebenarnya kita simpan emas.'],
  [48.83, 52.92, '*Kedua, jangan terlalu sibuk mencari *harga *emas *paling *rendah.'],
  [52.92, 56.56, 'Sejujurnya, siapa yang tak nak beli emas pada harga paling murah?'],
  [56.56, 61.25, 'Tapi masalahnya, kita *tak *tahu bila harga paling rendah itu akan berlaku.'],
  [61.25, 65.41, 'Hari ini tunggu harga turun lagi, bila esok turun kita tunggu lagi.'],
  [65.41, 70.44, 'Akhirnya harga dah naik semula, kita masih belum mula menyimpan.'],
  [70.44, 75.71, '*Ketiga, *fokus *tambah *gram, bukan risau tentang naik turun harga emas.'],
  [75.71, 80.68, 'Jika *matlamat kita nak bina simpanan untuk *5 ataupun *10 *tahun,'],
  [80.68, 85.9, 'turun naik harga dalam sehari, dua, seminggu, sebulan, bukanlah sesuatu yang'],
  [85.9, 87.84, 'perkara kita perlu fikirkan.'],
  [87.84, 89.7, 'Apa yang lebih penting adalah'],
  [89.7, 94.5, '*berapa *banyak *gram yang berjaya kita kumpul dari semasa ke semasa.'],
  [94.5, 99.51, 'Bila kita *konsisten, sedikit demi sedikit simpanan itu akan *bertambah lama-lama.'],
  [99.51, 103.42, '*Keempat, fahami *fungsi *emas dalam *kewangan *keluarga.'],
  [103.42, 107.13, 'Emas adalah salah satu bentuk *simpanan *jangka *masa *panjang,'],
  [107.13, 109.68, 'bukan untuk cepat kaya sebulan dua.'],
  [109.68, 111.8, 'Kita tak tahu apa akan berlaku,'],
  [111.8, 117.41, 'mungkin ada *kecemasan, *kehilangan *pendapatan atau keperluan besar yang memaksa kita'],
  [117.41, 121.5, 'menggunakan simpanan. Dan yang *kelima,'],
  [121.5, 126.06, 'harga emas boleh turun, tapi itu tak bermakna kita perlu membuat keputusan berdasarkan *emosi.'],
  [126.06, 133.49, 'Kalau kita membeli emas untuk jangka masa panjang, pastikan kita *faham *risiko turun naik harga dan gunakan *wang *lebihan,'],
  [133.49, 138.06, 'bukan wang yang kita perlukan untuk belanja harian ataupun kecemasan.'],
  [138.06, 140.78, 'Jadi tuan puan, simpan emas dengan *ilmu yang betul.'],
  [140.78, 143.14, 'Bagi mereka yang nak mulakan *simpan *emas,'],
  [143.14, 144.98, 'boleh mula serendah *RM100.'],
  [144.98, 149.84, 'Boleh rujuk *pin *video saya. *Dulu *ragu, *kini *tahu. Jom mulakan *simpan *emas.'],
];
const SCENES = [
  Hh(0, 5.73, (lt) => { const out = clamp((lt - 5.2) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'HARGA EMAS', lines: ['HARGA EMAS', 'TENGAH JATUH'], sub: 'RAMAI MULA RISAU' }); X.restore(); }, 1, WC.ma),
  B(5.73, 21.98, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Tunggu Dulu?', 100);
    row(lt, 0.6, 440, 'Ramai yang', 'MULA RISAU'); row(lt, 3.6, 590, 'Tunggu harga', 'JATUH LEBIH RENDAH'); row(lt, 11.0, 740, 'Pesan guru', 'KEJATUHAN HARGA EMAS');
    stk(lt, .4, IMG.sRendah, 540, SB, 600);
  }),
  Hh(21.98, 25.5, CH(1, 'Harga Jatuh', 'Satu Peluang', null), -1, WC.ma),
  B(25.5, 48.83, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Harga Jatuh = Peluang', 84);
    row(lt, 2.2, 440, 'Harga turun', 'BUKAN BERITA BURUK'); row(lt, 12.3, 590, 'Harga turun', 'LEBIH BANYAK GRAM'); row(lt, 17.2, 740, 'Jumlah wang', 'YANG SAMA');
    stk(lt, .4, IMG.sPeluang, 540, SB, 600);
  }),
  Hh(48.83, 52.5, CH(2, 'Jangan Cari', 'Harga Terendah', null), 1, WC.ma),
  B(52.5, 70.44, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Harga Paling Rendah', 90);
    row(lt, 0.4, 440, 'Siapa tak nak', 'HARGA PALING MURAH'); row(lt, 4.1, 590, 'Tak tahu bila', 'HARGA TERENDAH'); row(lt, 8.7, 740, 'Tunggu lagi', 'HARGA NAIK SEMULA');
    stk(lt, .4, IMG.sRendah, 540, SB, 600);
  }),
  Hh(70.44, 73.8, CH(3, 'Fokus Tambah', 'Gram', null), -1, WC.ma),
  B(73.8, 80.68, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Fokus Tambah Gram', 90);
    row(lt, 0.5, 440, 'Bukan risau', 'NAIK TURUN HARGA'); row(lt, 2.4, 590, 'Matlamat simpanan', '5 ATAU 10 TAHUN');
    stk(lt, .4, IMG.sMatlamat, 540, SB, 600);
  }),
  B(80.68, 94.5, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Berapa Banyak Gram', 84);
    row(lt, 0.6, 440, 'Naik turun harian', 'BUKAN FOKUS UTAMA'); row(lt, 7.0, 590, 'Berapa banyak', 'GRAM DIKUMPUL');
    stk(lt, .4, IMG.sGram, 540, SB, 600);
  }),
  B(94.5, 99.51, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Konsisten', 100);
    
    stk(lt, .4, IMG.sIstiqamah, 540, SB, 680);
  }),
  Hh(99.51, 103.0, CH(4, 'Fungsi Emas', 'Kewangan Keluarga', null), 1, WC.ma),
  B(103.0, 117.41, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Benteng Keluarga', 96);
    row(lt, 0.5, 440, 'Simpanan', 'JANGKA PANJANG'); row(lt, 4.1, 590, 'Bukan untuk', 'CEPAT KAYA'); row(lt, 8.8, 740, 'Kecemasan', 'KEHILANGAN PENDAPATAN');
    stk(lt, .4, IMG.sBenteng, 540, SB, 600);
  }),
  Hh(117.41, 121.5, CH(5, 'Jangan Ikut', 'Emosi', null), -1, WC.ma),
  B(121.5, 140.78, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Keputusan Tenang', 100);
    row(lt, 0.4, 440, 'Harga turun', 'JANGAN IKUT EMOSI'); row(lt, 4.6, 590, 'Faham risiko', 'TURUN NAIK HARGA'); row(lt, 10.0, 740, 'Guna wang', 'LEBIHAN SAHAJA');
    stk(lt, .4, IMG.sTenang, 540, SB, 600);
  }),
  B(140.78, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sRm100, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sPeluang, IMG.sRendah, IMG.sGram, IMG.sMatlamat, IMG.sBenteng, IMG.sTenang, IMG.sRm100, IMG.sIstiqamah, IMG.sRagu])), { nobk: true }),
];
