// scenes.js — "5 Langkah Selamat Jika Syarikat Buat Retrenchment" (98.8s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 98.800998, DUR = VOICE + 6, HEADN = 2964;
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
const ASSETS = { ...PH, sAda: 'stk-ada-berita-retrenchment.png', sDana: 'stk-siapkan-dana-kecemasan.png', sJangan: 'stk-jangan-bebas-belanja.png', sAset: 'stk-bina-aset-sendiri.png', sHutang: 'stk-kawal-hutang-bulanan.png', sSimpan: 'stk-simpan-sekarang.png', sPersediaan: 'stk-kawal-persediaan-diri.png', sPayung: 'stk-bina-payung-kewangan.png', sTenang: 'stk-tenang-bersedia.png' };

const SEG = [
  [0, 3.3, '*5 *Langkah *selamat jika syarikat buat'],
  [3.3, 7.11, '*Retrenchment, berita *pemberhentian kerja dan'],
  [7.11, 10.81, '*penstrukturan syarikat makin kerap kita dengar hari ini.'],
  [10.81, 13.93, 'Tiada pekerjaan yang *100% *kebal,'],
  [13.93, 17.36, 'tapi mereka yang bersedia akan kekal *tenang.'],
  [17.36, 23.11, '*Pertama, siapkan *dana *kecemasan *6 hingga *12 bulan perbelanjaan.'],
  [23.11, 25.26, 'Jika gaji terputus esok,'],
  [25.26, 28.37, 'anda ada masa mencari kerja baru'],
  [28.37, 30.97, 'tanpa rasa *panik. *Kedua,'],
  [30.97, 34.95, 'elak simpan semua duit dalam bentuk yang *mudah dibelanjakan.'],
  [34.95, 36.78, 'Tunai dalam akaun bank'],
  [36.78, 39.79, 'mudah *susut bila emosi kita tertekan.'],
  [39.79, 44.18, '*Ketiga, bina *aset yang *tidak terikat pada majikan.'],
  [44.18, 46.83, 'Gaji adalah pendapatan *sementara,'],
  [46.83, 52.35, 'tapi *emas *fizikal yang anda miliki kekal milik anda *selamanya.'],
  [52.35, 55.77, '*Keempat, kawal komitmen *hutang bulanan.'],
  [55.77, 57.83, 'Hidup di bawah *kemampuan'],
  [57.83, 60.51, 'supaya jika berlaku pemotongan,'],
  [60.51, 62.74, 'kita tidak terus *terhimpit.'],
  [62.74, 66.9, '*Kelima, mula *menyimpan waktu masih *bergaji.'],
  [66.9, 72.99, 'Masa terbaik membina tabung atau *payung *kewangan adalah *sebelum hari hujan,'],
  [72.99, 76.03, 'bukan waktu ribut dah melanda.'],
  [76.03, 79.23, 'Anda tak mampu kawal keputusan syarikat,'],
  [79.23, 83.05, 'tapi anda mampu kawal *persediaan diri sendiri.'],
  [83.05, 87.35, 'Bina tabungan *emas di *Public *Gold dengan serendah *RM100.'],
  [87.35, 90.02, 'Hari ini kita boleh kumpul *sedikit-sedikit,'],
  [90.02, 91.67, 'jadi *emas *fizikal.'],
  [91.67, 94.36, 'Tuan puan yang dah ready nak mulakan *simpan *emas'],
  [94.36, 96.03, 'boleh rujuk *video saya.'],
  [96.03, 98.8, '*Dulu *ragu, *kini *tahu. Jom *simpan!'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'LANGKAH');
const SCENES = [
  Hh(0, 3.3, (lt) => { const out = clamp((lt - 2.8) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'WAJIB BERSEDIA', lines: ['5 LANGKAH', 'SELAMAT'], sub: 'JIKA SYARIKAT BUAT RETRENCHMENT' }); X.restore(); }, 1, WC.ma),
  B(3.3, 13.93, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Retrenchment', 100);
    row(lt, .3, 440, 'Berita', 'PEMBERHENTIAN KERJA'); row(lt, 2.2, 590, 'Syarikat', 'PENSTRUKTURAN'); row(lt, 6.0, 740, 'Tiada kerja', '100% KEBAL');
    stk(lt, .5, IMG.sAda, 540, SB, 580);
  }),
  B(13.93, 17.36, 'kg', WC.ma, (lt) => { ttl(lt, 'Yang Bersedia', 96); anim(lt, .3, 540, 560, () => mWhite(130, 440, 820, ['Kekal tenang', '*bila ribut datang'], 52)); stk(lt, .3, IMG.sTenang, 540, SB, 640); }),
  Hh(17.36, 23.11, CH(1, 'Dana Kecemasan', null, '6 hingga 12 bulan perbelanjaan'), -1, WC.ma),
  B(23.11, 28.37, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Dana Kecemasan', 96);
    row(lt, .3, 440, 'Simpan', '6-12 BULAN'); row(lt, 2.2, 590, 'Ada masa cari', 'KERJA BARU');
    stk(lt, .4, IMG.sDana, 540, SB, 640);
  }),
  Hh(28.37, 34.95, CH(2, 'Jangan Simpan', 'Semua Dalam Tunai', 'mudah dibelanjakan'), 1, WC.ma),
  B(34.95, 39.79, 'merak100', WC.ma, (lt) => { ttl(lt, 'Tunai Mudah Susut', 88); anim(lt, 1.0, 540, 560, () => mWhite(130, 440, 820, ['Bila emosi', '*tertekan, duit susut'], 50)); stk(lt, .3, IMG.sJangan, 540, SB, 640); }),
  Hh(39.79, 44.18, CH(3, 'Bina Aset', null, 'tidak terikat pada majikan'), -1, WC.ma),
  B(44.18, 52.35, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Aset Sendiri', 100);
    row(lt, .3, 440, 'Gaji', 'SEMENTARA'); row(lt, 3.8, 590, 'Emas fizikal', 'KEKAL SELAMANYA');
    stk(lt, 1.0, IMG.sAset, 540, SB, 640);
  }),
  Hh(52.35, 55.77, CH(4, 'Kawal Hutang', null, 'komitmen bulanan'), 1, WC.ma),
  B(55.77, 62.74, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Hidup Bawah Kemampuan', 78);
    row(lt, 1.2, 440, 'Gaji dipotong', 'TAK TERHIMPIT');
    stk(lt, .4, IMG.sHutang, 540, SB, 640);
  }),
  Hh(62.74, 66.9, CH(5, 'Mula Menyimpan', null, 'waktu masih bergaji'), -1, WC.ma),
  B(66.9, 76.03, 'g250', WC.ma, (lt) => { ttl(lt, 'Payung Kewangan', 96); anim(lt, 2.0, 540, 560, () => mWhite(130, 440, 820, ['Bina payung', '*sebelum hari hujan'], 52)); stk(lt, .4, IMG.sPayung, 540, SB, 640); }),
  B(76.03, 83.05, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Kawal Diri Sendiri', 92);
    anim(lt, .8, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'KEPUTUSAN', 'SYARIKAT', 'tak boleh kawal'));
    anim(lt, 3.5, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'PERSEDIAAN', 'DIRI', 'anda yang kawal'));
    stk(lt, 4.6, IMG.sPersediaan, 540, SB, 600);
  }),
  B(83.05, 91.67, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Mula Hari Ini', 100);
    row(lt, 1.0, 440, 'Tabung emas', 'PUBLIC GOLD'); row(lt, 3.6, 590, 'Serendah', 'RM100'); row(lt, 5.8, 740, 'Sedikit-sedikit', 'JADI EMAS FIZIKAL');
    stk(lt, .4, IMG.sSimpan, 540, SB, 600);
  }),
  B(91.67, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sTenang, 640)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sAda, IMG.sDana, IMG.sJangan, IMG.sAset, IMG.sHutang, IMG.sSimpan, IMG.sPersediaan, IMG.sPayung, IMG.sTenang])), { nobk: true }),
];
