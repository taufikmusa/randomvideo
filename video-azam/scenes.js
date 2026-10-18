// scenes.js — "5 Azam Kewangan Tahun Baru" (93.04s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 93.042358, DUR = VOICE + 6, HEADN = 2791;
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
const ASSETS = { ...PH, sAzam: 'stk-azam.png', sBayar: 'stk-bayar.png', sDana: 'stk-dana.png', sTukar: 'stk-tukar.png', sTutup: 'stk-tutup.png', sEmas100: 'stk-emas100.png', sSihir: 'stk-sihir.png', sKonsisten: 'stk-konsisten.png', sJadikan: 'stk-jadikan.png' };

const SEG = [
  [0, 4.04, '*5 *azam *wajib ada dalam senarai tahun baru anda'],
  [4.04, 6.8, 'Tahun baru, kita datang dengan *semangat *baru'],
  [6.8, 9.47, 'dan senarai *azam yang panjang berjela.'],
  [9.47, 11.9, 'Namun pastikan tahun ini'],
  [11.9, 16.14, '*azam *kewangan bukan sekadar *angan-angan kosong atas kertas.'],
  [16.14, 18.5, '*Pertama, amalkan peraturan'],
  [18.5, 21.17, '*bayar *diri *sendiri terlebih dahulu.'],
  [21.17, 23.21, 'Setiap kali menerima *gaji,'],
  [23.21, 27.36, 'asingkan *simpanan sebelum bayar bil dan komitmen lain.'],
  [27.36, 31.53, '*Kedua, wujudkan *dana *kecemasan sekurang-kurangnya'],
  [31.53, 33.44, '*6 *bulan perbelanjaan.'],
  [33.44, 36.5, 'Mempunyai *jaring *keselamatan menghalang kita'],
  [36.5, 39.7, 'daripada terjebak *hutang *baru bila diuji.'],
  [39.7, 43.97, '*Ketiga, tukarkan *simpanan *tunai kepada *aset *fizikal.'],
  [43.97, 46.8, 'Jangan biarkan lebihan wang *tidur'],
  [46.8, 49.81, 'dalam akaun bank yang dimamah *inflasi sepanjang tahun.'],
  [49.81, 53.58, '*Keempat, tutup satu punca *kebocoran'],
  [53.58, 56.5, '*wang *harian anda. Hentikan *langganan'],
  [56.5, 60.12, 'yang tidak digunakan ataupun kurangkan perbelanjaan'],
  [60.12, 62.08, 'harian yang *mahal.'],
  [62.08, 65.03, '*Dan *kelima, mulakan *simpan *emas'],
  [65.03, 68.81, 'walaupun dengan *1 *gram ataupun *RM100.'],
  [68.81, 71.43, 'Mulakan dengan *permulaan yang rendah,'],
  [71.43, 73.84, 'tapi *istiqamah dan *konsisten.'],
  [73.84, 77.59, 'Tahun baru tidak akan mengubah hidup anda secara *magik.'],
  [77.59, 81.7, 'Hanya tindakan yang *konsisten mampu membina'],
  [81.7, 84.51, '*perbezaan. Jadikan *azam simpanan'],
  [84.51, 86.5, 'anda satu *kenyataan.'],
  [86.5, 88.49, 'Tuan puan yang dah nak mulakan *simpan *emas,'],
  [88.49, 90.0, 'boleh rujuk *pin *video saya.'],
  [90.0, 91.44, '*Dulu *ragu, *kini *tahu.'],
  [91.44, 93.04, 'Jom *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'AZAM');
const SCENES = [
  Hh(0, 4.04, (lt) => { const out = clamp((lt - 3.5) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'AZAM TAHUN BARU', lines: ['5 AZAM', 'WAJIB ADA'], sub: 'DALAM SENARAI TAHUN BARU' }); X.restore(); }, 1, WC.ma),
  B(4.04, 11.9, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Tahun Baru', 100);
    row(lt, .8, 440, 'Semangat', 'BARU'); row(lt, 3.0, 590, 'Senarai azam', 'PANJANG BERJELA');
    stk(lt, .4, IMG.sJadikan, 540, SB, 620);
  }),
  B(11.9, 16.14, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Bukan Angan-Angan', 90);
    row(lt, .8, 440, 'Azam kewangan', 'BUKAN ANGAN-ANGAN'); row(lt, 2.4, 590, 'Atas kertas', 'KOSONG');
    stk(lt, .4, IMG.sAzam, 540, SB, 620);
  }),
  Hh(16.14, 21.17, CH(1, 'Bayar Diri', 'Sendiri Dahulu', null), -1, WC.ma),
  B(21.17, 27.36, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Bayar Diri Dahulu', 96);
    row(lt, .8, 440, 'Terima gaji', 'ASINGKAN SIMPANAN'); row(lt, 3.0, 590, 'Sebelum bayar', 'BIL & KOMITMEN');
    stk(lt, .4, IMG.sBayar, 540, SB, 620);
  }),
  Hh(27.36, 33.44, CH(2, 'Dana Kecemasan', '6 Bulan', null), 1, WC.ma),
  B(33.44, 39.7, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Jaring Keselamatan', 92);
    row(lt, .8, 440, 'Jaring', 'KESELAMATAN'); row(lt, 3.0, 590, 'Elak terjebak', 'HUTANG BARU');
    stk(lt, .4, IMG.sDana, 540, SB, 620);
  }),
  Hh(39.7, 43.97, CH(3, 'Tukar Tunai', 'Kepada Aset Fizikal', null), -1, WC.ma),
  B(43.97, 49.81, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Wang Tidur', 100);
    row(lt, .8, 440, 'Wang tidur', 'DIMAMAH INFLASI'); row(lt, 2.9, 590, 'Sepanjang', 'TAHUN');
    stk(lt, .4, IMG.sTukar, 540, SB, 620);
  }),
  Hh(49.81, 53.58, CH(4, 'Tutup Kebocoran', 'Wang Harian', null), 1, WC.ma),
  B(53.58, 62.08, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Tutup Kebocoran', 96);
    row(lt, .8, 440, 'Hentikan', 'LANGGANAN TAK GUNA'); row(lt, 3.2, 590, 'Kurangkan', 'PERBELANJAAN MAHAL');
    stk(lt, .4, IMG.sTutup, 540, SB, 620);
  }),
  Hh(62.08, 65.03, CH(5, 'Mulakan', 'Simpan Emas', null), -1, WC.ma),
  B(65.03, 73.84, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Mula Kecil', 100);
    row(lt, .8, 440, '1 gram atau', 'RM100'); row(lt, 3.0, 590, 'Permulaan', 'RENDAH'); row(lt, 5.4, 740, 'Istiqamah &', 'KONSISTEN');
    stk(lt, .4, IMG.sEmas100, 540, SB, 600);
  }),
  B(73.84, 77.59, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Bukan Sihir Ajaib', 96); stk(lt, .3, IMG.sSihir, 540, SB, 680); }),
  B(77.59, 84.51, 'merak5', WC.ma, (lt) => {
    ttl(lt, 'Tindakan Konsisten', 92);
    anim(lt, 1.2, 540, 560, () => mWhite(130, 440, 820, ['Hanya tindakan konsisten', '*mampu bina perbezaan'], 50));
    stk(lt, .3, IMG.sKonsisten, 540, SB, 620);
  }),
  B(84.51, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sJadikan, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sAzam, IMG.sBayar, IMG.sDana, IMG.sTukar, IMG.sTutup, IMG.sEmas100, IMG.sSihir, IMG.sKonsisten, IMG.sJadikan])), { nobk: true }),
];
