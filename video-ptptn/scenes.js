// scenes.js — "5 Cara Graduan Bina Aset Sambil Bayar PTPTN" (80.22s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 80.224943, DUR = VOICE + 6, HEADN = 2406;
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
const ASSETS = { ...PH, sGraduan: 'stk-graduan.png', sTunggu: 'stk-tunggu.png', sStrategi: 'stk-strategi.png', sDiskaun: 'stk-diskaun.png', sTabiat: 'stk-tabiat.png', sEmas100: 'stk-emas100.png', sPenjara: 'stk-penjara.png', sKunci: 'stk-kunci.png', sMula: 'stk-mula.png' };

const SEG = [
  [0, 4.16, '*5 *cara *graduan bina *aset sambil bayar *PTPTN'],
  [4.16, 6.86, 'Baru tamat belajar, dapat segulung *ijazah'],
  [6.86, 10.01, 'tapi pakej sekali dengan *hutang *PTPTN.'],
  [10.01, 13.0, 'Ramai graduan rasa *terperangkap, ingat'],
  [13.0, 15.12, 'kena tunggu *hutang *langsai dahulu'],
  [15.12, 17.5, 'baru boleh menabung. *Pertama,'],
  [17.5, 20.08, 'Jangan tunggu *hutang *kosong baru nak mula.'],
  [20.08, 22.89, 'Jika tunggu *PTPTN habis *sedekad lagi,'],
  [22.89, 26.5, 'anda terlepas *kuasa *masa untuk membina *aset.'],
  [26.5, 30.63, '*Kedua, *strategi *seimbang *bayar dan *simpan.'],
  [30.63, 33.62, 'Bayar *ansuran pinjaman secara *konsisten'],
  [33.62, 36.78, 'sambil asingkan sebahagian untuk *simpanan.'],
  [36.78, 39.76, '*Ketiga, *rebut *diskaun bayaran balik,'],
  [39.76, 42.2, 'manfaatkan tawaran *insentif pembayaran'],
  [42.2, 44.87, 'untuk memendekkan *tempoh pinjaman.'],
  [44.87, 48.97, '*Keempat, bina *tabiat *kewangan sihat dari *gaji *pertama.'],
  [48.97, 53.1, 'Disiplin awal *kerjaya akan menentukan *kestabilan poket anda'],
  [53.1, 55.3, 'untuk *30 *tahun akan datang.'],
  [55.3, 57.99, '*Dan *kelima, *simpan *emas di Public Gold'],
  [57.99, 60.6, 'kita boleh bermula dengan serendah *RM100.'],
  [60.6, 63.6, 'Ini boleh digunakan untuk membina *momentum'],
  [63.6, 66.0, 'mengumpul aset simpanan *emas *fizikal.'],
  [66.0, 68.72, '*Hutang pelajaran bukanlah *penjara kewangan.'],
  [68.72, 72.5, '*Kuncinya adalah *mengimbangkan komitmen dengan membina *aset.'],
  [72.5, 74.33, 'Mula *menabung *emas hari ini.'],
  [74.33, 76.0, 'Tuan puan yang dah ready nak mulakan *simpan *emas'],
  [76.0, 77.67, 'boleh rujuk *pin *video saya.'],
  [77.67, 80.22, '*Dulu *ragu, *kini *tahu. Jom *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'CARA');
const SCENES = [
  Hh(0, 4.16, (lt) => { const out = clamp((lt - 3.65) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: '5 CARA GRADUAN', lines: ['BINA ASET', 'SAMBIL BAYAR'], sub: 'HUTANG PTPTN' }); X.restore(); }, 1, WC.ma),
  B(4.16, 10.01, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Baru Tamat Belajar', 96);
    row(lt, .8, 440, 'Segulung', 'IJAZAH'); row(lt, 2.7, 590, 'Pakej sekali', 'HUTANG PTPTN');
    stk(lt, .4, IMG.sGraduan, 540, SB, 620);
  }),
  B(10.01, 16.7, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Rasa Terperangkap', 96);
    row(lt, .8, 440, 'Ramai graduan', 'TERPERANGKAP'); row(lt, 3.0, 590, 'Kena tunggu', 'HUTANG LANGSAI');
    stk(lt, .4, IMG.sPenjara, 540, SB, 620);
  }),
  Hh(16.7, 20.08, CH(1, 'Jangan Tunggu', 'Hutang Kosong', null), -1, WC.ma),
  B(20.08, 26.5, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Jangan Tunggu', 100);
    row(lt, .8, 440, 'Tunggu PTPTN', 'HABIS SEDEKAD'); row(lt, 2.8, 590, 'Terlepas', 'KUASA MASA');
    stk(lt, .4, IMG.sTunggu, 540, SB, 620);
  }),
  Hh(26.5, 30.63, CH(2, 'Strategi', 'Seimbang', null), 1, WC.ma),
  B(30.63, 36.78, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Bayar & Simpan', 100);
    row(lt, .8, 440, 'Bayar ansuran', 'KONSISTEN'); row(lt, 3.2, 590, 'Asingkan', 'UNTUK SIMPANAN');
    stk(lt, .4, IMG.sStrategi, 540, SB, 620);
  }),
  Hh(36.78, 39.76, CH(3, 'Rebut Diskaun', 'Bayaran Balik', null), -1, WC.ma),
  B(39.76, 44.87, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Tawaran Insentif', 100);
    row(lt, .8, 440, 'Manfaatkan', 'TAWARAN INSENTIF'); row(lt, 2.4, 590, 'Pendekkan', 'TEMPOH PINJAMAN');
    stk(lt, .4, IMG.sDiskaun, 540, SB, 620);
  }),
  Hh(44.87, 48.97, CH(4, 'Tabiat Kewangan', 'Sihat', null), 1, WC.ma),
  B(48.97, 55.3, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Disiplin Awal Kerjaya', 86);
    row(lt, .8, 440, 'Disiplin awal', 'KERJAYA'); row(lt, 3.2, 590, 'Kestabilan poket', '30 TAHUN');
    stk(lt, .4, IMG.sTabiat, 540, SB, 620);
  }),
  Hh(55.3, 57.99, CH(5, 'Simpan Emas', 'Modal Kecil', null), -1, WC.ma),
  B(57.99, 66.0, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Mula Serendah RM100', 90);
    row(lt, .8, 440, 'Mula serendah', 'RM100'); row(lt, 3.0, 590, 'Bina', 'MOMENTUM'); row(lt, 5.0, 740, 'Kumpul aset', 'EMAS FIZIKAL');
    stk(lt, .4, IMG.sEmas100, 540, SB, 600);
  }),
  B(66.0, 68.72, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Bukan Penjara', 100); stk(lt, .3, IMG.sPenjara, 540, SB, 680); }),
  B(68.72, 72.5, 'merak5', WC.ma, (lt) => { ttl(lt, 'Imbang Komitmen & Aset', 84); stk(lt, .3, IMG.sKunci, 540, SB, 680); }),
  B(72.5, 74.33, 'ipad', WC.ma, (lt) => { ttl(lt, 'Mula Menabung', 100); stk(lt, .3, IMG.sMula, 540, SB, 680); }),
  B(74.33, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sMula, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sGraduan, IMG.sTunggu, IMG.sStrategi, IMG.sDiskaun, IMG.sTabiat, IMG.sEmas100, IMG.sPenjara, IMG.sKunci, IMG.sMula])), { nobk: true }),
];
