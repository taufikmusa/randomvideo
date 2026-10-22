// scenes.js — "5 Cara Tukar Side Income Jadi Kekayaan Kekal" (93.14s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 93.135238, DUR = VOICE + 6, HEADN = 2794;
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
const ASSETS = { ...PH, sLesap: 'stk-lesap.png', sAkaun: 'stk-akaun.png', sMatlamat: 'stk-matlamat.png', sGayahidup: 'stk-gayahidup.png', sKonsisten: 'stk-konsisten.png', sEmasfizikal: 'stk-emasfizikal.png', sHasil: 'stk-hasil.png', sAsetkekal: 'stk-asetkekal.png', sKunci: 'stk-kunci.png' };
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'CARA');
const SEG = [
  [0, 4.56, '*5 *cara tukar *side *income jadi *kekayaan kekal.'],
  [4.56, 7.88, 'Ramai rakyat Malaysia gigih buat *kerja *sampingan,'],
  [7.88, 11.85, '*berniaga *online, bawa *Grab dan buat *dropship.'],
  [11.85, 14.35, 'Tapi jika tidak diurus dengan bijak,'],
  [14.35, 17.85, 'wang kerja lebih masa ini akan *lesap begitu saja.'],
  [17.85, 20.72, '*Pertama, *asingkan *akaun'],
  [20.72, 23.27, '*side *income daripada akaun *gaji utama.'],
  [23.27, 25.84, 'Jangan biarkan duit hasil *titik *peluh'],
  [25.84, 28.16, 'bercampur dengan *belanja harian.'],
  [28.16, 32.2, '*Kedua, tetapkan *matlamat *jelas untuk setiap *ringgit.'],
  [32.2, 35.71, 'Tentukan berapa *peratus untuk *pusing *modal'],
  [35.71, 39.23, 'dan berapa peratus untuk dikunci jadi *aset.'],
  [39.23, 44.32, '*Ketiga, elak guna duit sampingan untuk naikkan *gaya *hidup.'],
  [44.32, 49.31, 'Beli barang mewah dengan *side *income hanya menambah *komitmen *baru.'],
  [49.31, 53.44, '*Keempat, *konsisten dalam *menabung mengalahkan'],
  [53.44, 55.27, 'menyimpan dalam *jumlah'],
  [55.27, 57.74, '*besar tapi hanya sekali-sekala.'],
  [57.74, 61.67, 'Disiplin menyimpan *sedikit setiap minggu *membina *kekayaan.'],
  [61.67, 66.13, 'Dan *kelima, *salurkan keuntungan kerja sampingan'],
  [66.13, 68.48, 'ke dalam bentuk *emas *fizikal.'],
  [68.48, 70.91, 'Tukar usaha penat anda'],
  [70.91, 73.66, 'menjadi *aset yang tidak *susut *nilai'],
  [73.66, 75.63, 'dalam jangka masa panjang.'],
  [75.63, 78.84, 'Penat lelah kerja sampingan, *mesti ada *hasilnya.'],
  [78.84, 83.31, 'Biar setiap *titis *peluh anda bertukar menjadi *aset *emas.'],
  [83.31, 87.99, '*Kunci *keuntungan dengan *simpan *emas. Tuan puan yang dah ready nak mulakan,'],
  [87.99, 91.0, 'boleh rujuk *pin *video saya. *Dulu *ragu, *kini *tahu.'],
  [91.0, 93.14, 'Jom mulakan *simpan *emas.'],
];
const SCENES = [
  Hh(0, 4.56, (lt) => { const out = clamp((lt - 4.0) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: '5 CARA', lines: ['SIDE INCOME', 'JADI KEKAL'], sub: 'KEKAYAAN YANG TAK LESAP' }); X.restore(); }, 1, WC.ma),
  B(4.56, 17.85, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Kerja Sampingan', 96);
    row(lt, 3.3, 440, 'Berniaga', 'ONLINE'); row(lt, 4.7, 590, 'Bawa', 'GRAB'); row(lt, 6.0, 740, 'Buat', 'DROPSHIP');
    stk(lt, .4, IMG.sLesap, 540, SB, 560);
  }),
  Hh(17.85, 21.5, CH(1, 'Asingkan Akaun', 'Side Income', null), -1, WC.ma),
  B(21.5, 28.16, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Akaun Berasingan', 96);
    row(lt, .3, 440, 'Side income', 'AKAUN LAIN'); row(lt, 2.8, 590, 'Hasil titik peluh', 'JANGAN BERCAMPUR');
    stk(lt, .4, IMG.sAkaun, 540, SB, 620);
  }),
  Hh(28.16, 32.2, CH(2, 'Matlamat Jelas', 'Setiap Ringgit', null), 1, WC.ma),
  B(32.2, 39.23, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Matlamat Jelas', 100);
    row(lt, .5, 440, 'Setiap ringgit', 'ADA MATLAMAT'); row(lt, 2.0, 590, 'Peratus untuk', 'PUSING MODAL'); row(lt, 4.4, 740, 'Peratus untuk', 'DIKUNCI JADI ASET');
    stk(lt, .4, IMG.sMatlamat, 540, SB, 600);
  }),
  Hh(39.23, 42.8, CH(3, 'Elak Naik', 'Gaya Hidup', null), -1, WC.ma),
  B(42.8, 49.31, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Gaya Hidup', 100);
    row(lt, 1.6, 440, 'Barang mewah', 'TAMBAH KOMITMEN');
    stk(lt, .4, IMG.sGayahidup, 540, SB, 620);
  }),
  Hh(49.31, 53.44, CH(4, 'Konsisten', 'Menabung', null), 1, WC.ma),
  B(53.44, 61.67, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Konsisten Menabung', 90);
    row(lt, 1.8, 440, 'Bukan jumlah besar', 'SEKALI-SEKALA'); row(lt, 4.3, 590, 'Simpan sedikit', 'SETIAP MINGGU'); row(lt, 6.4, 740, 'Membina', 'KEKAYAAN');
    stk(lt, .4, IMG.sKonsisten, 540, SB, 600);
  }),
  Hh(61.67, 66.13, CH(5, 'Salur Ke', 'Emas Fizikal', null), -1, WC.ma),
  B(66.13, 75.63, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Emas Fizikal', 100);
    row(lt, .6, 440, 'Salur keuntungan', 'KE EMAS FIZIKAL'); row(lt, 3.0, 590, 'Usaha penat', 'JADI ASET'); row(lt, 5.0, 740, 'Tidak susut', 'NILAI');
    stk(lt, .4, IMG.sEmasfizikal, 540, SB, 600);
  }),
  B(75.63, 78.84, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Penat Lelah', 100); stk(lt, .3, IMG.sHasil, 540, SB, 680); }),
  B(78.84, 83.31, 'merak5', WC.ma, (lt) => { ttl(lt, 'Jadi Aset Emas', 100); stk(lt, .3, IMG.sAsetkekal, 540, SB, 680); }),
  B(83.31, 87.99, 'bungamas', WC.ma, (lt) => { ttl(lt, 'Kunci Keuntungan', 96); stk(lt, .3, IMG.sKunci, 540, SB, 680); }),
  B(87.99, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sEmasfizikal, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sLesap, IMG.sAkaun, IMG.sMatlamat, IMG.sGayahidup, IMG.sKonsisten, IMG.sEmasfizikal, IMG.sHasil, IMG.sAsetkekal, IMG.sKunci])), { nobk: true }),
];
