// scenes.js — "5 Sebab Ansuran Kereta Boleh Mencekik" (104.05s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 104.048617, DUR = VOICE + 6, HEADN = 3121;
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
const ASSETS = { ...PH, sAnsuran: 'stk-ansuran.png', sSusut: 'stk-susut.png', sKos: 'stk-kos.png', sGaya: 'stk-gaya.png', sMewah: 'stk-mewah.png', sRm500: 'stk-rm500.png', sFungsi: 'stk-fungsi.png', sBebas: 'stk-bebas.png', sBijak: 'stk-bijak.png' };
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'CARA');
const SEG = [
  [0, 3.81, '*5 *sebab *ansuran *kereta boleh *mencekik.'],
  [3.81, 8.89, 'Kereta adalah satu *keperluan asas untuk bergerak'],
  [8.89, 11.1, 'ke tempat kerja di Malaysia.'],
  [11.1, 18.34, 'Namun, tersilap memilih model kereta boleh *menyesakkan kita pada masa depan.'],
  [18.34, 23.97, '*Pertama, *ansuran *bulanan menelan *peratusan gaji yang terlalu besar.'],
  [23.97, 25.73, 'Komitmen *mencecah'],
  [25.73, 28.6, '*ribuan *ringgit sebulan, menyekat peluang'],
  [28.6, 31.15, 'untuk *menabung.'],
  [31.15, 35.76, '*Kedua, kereta adalah aset yang *susut *nilai sebaik keluar pusat'],
  [35.76, 40.25, 'pameran. Nilainya jatuh setiap tahun bersama kos'],
  [40.25, 42.7, '*penyelenggaraan yang makin meningkat.'],
  [42.7, 46.13, '*Kos *sampingan yang tersembunyi:'],
  [46.13, 48.66, '*insurans tahunan, *cukai *jalan,'],
  [48.66, 52.18, '*tayar, *servis, *tol dan *minyak menambah'],
  [52.18, 53.83, 'beban poket anda.'],
  [53.83, 57.53, '*Keempat, pilih kenderaan mengikut *fungsi *sebenar'],
  [57.53, 59.85, 'bukan kerana *martabat.'],
  [59.85, 63.38, 'Kereta mewah memberikan *kepuasan *sementara,'],
  [63.38, 66.36, 'tapi mencuri *kebebasan *kewangan.'],
  [66.36, 71.03, 'Dan *kelima, pilih model kereta yang sesuai dengan *budget anda,'],
  [71.03, 74.15, 'dan alihkan sebahagian daripada *pendapatan'],
  [74.15, 77.94, 'ke dalam bentuk simpanan seperti *aset *emas.'],
  [77.94, 81.98, 'Anda boleh memiliki kereta yang *biasa-biasa,'],
  [81.98, 85.33, 'tapi memiliki *aset yang *luar *biasa.'],
  [85.33, 87.97, 'Kereta membawa anda ke tempat kerja,'],
  [87.97, 90.16, 'tapi *simpanan *aset *emas'],
  [90.16, 92.11, 'membawa anda ke arah'],
  [92.11, 93.87, '*kebebasan *kewangan.'],
  [93.87, 96.06, 'Jadi, pilih kenderaan dengan *bijak.'],
  [96.06, 98.81, 'Tuan puan yang dah ready nak mulakan *simpan *emas,'],
  [98.81, 102.29, 'boleh rujuk *pin *video saya. *Dulu *ragu, *kini *tahu. Jom,'],
  [102.29, 104.05, 'mulakan *simpan *emas.'],
];
const SCENES = [
  Hh(0, 3.81, (lt) => { const out = clamp((lt - 3.3) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: '5 SEBAB', lines: ['ANSURAN KERETA', 'BOLEH MENCEKIK'], sub: 'TERSILAP PILIH MODEL?' }); X.restore(); }, 1, WC.ma),
  B(3.81, 18.34, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Kereta Keperluan', 90);
    row(lt, 0.4, 440, 'Kereta', 'KEPERLUAN ASAS'); row(lt, 3.9, 590, 'Bergerak ke', 'TEMPAT KERJA'); row(lt, 7.3, 740, 'Silap pilih model', 'MENYESAKKAN MASA DEPAN');
    stk(lt, .4, IMG.sFungsi, 540, SB, 560);
  }),
  Hh(18.34, 22.5, CH(1, 'Ansuran Bulanan', 'Menelan Gaji', null), -1, WC.ma),
  B(22.5, 30.9, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Ansuran Bulanan', 96);
    row(lt, 1.5, 440, 'Komitmen', 'MENCECAH RIBUAN RM'); row(lt, 3.7, 590, 'Ribuan ringgit', 'SEBULAN'); row(lt, 5.8, 740, 'Menyekat peluang', 'UNTUK MENABUNG');
    stk(lt, .4, IMG.sAnsuran, 540, SB, 600);
  }),
  Hh(30.9, 34.6, CH(2, 'Kereta Aset', 'Susut Nilai', null), 1, WC.ma),
  B(34.6, 42.7, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Susut Nilai', 100);
    row(lt, 1.2, 440, 'Sebaik keluar', 'PUSAT PAMERAN'); row(lt, 3.0, 590, 'Nilai jatuh', 'SETIAP TAHUN'); row(lt, 5.7, 740, 'Kos penyelenggaraan', 'MENINGKAT');
    stk(lt, .4, IMG.sSusut, 540, SB, 600);
  }),
  Hh(42.7, 46.7, CH(3, 'Kos Sampingan', 'Tersembunyi', null), -1, WC.ma),
  B(46.7, 53.83, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Kos Sampingan', 96);
    row(lt, 0.2, 440, 'Insurans', 'CUKAI JALAN'); row(lt, 1.9, 590, 'Tayar', 'SERVIS'); row(lt, 3.4, 740, 'Tol', 'MINYAK');
    stk(lt, .4, IMG.sKos, 540, SB, 600);
  }),
  Hh(53.83, 57.0, CH(4, 'Pilih Ikut', 'Fungsi Sebenar', null), 1, WC.ma),
  B(57.0, 59.85, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Bukan Martabat', 100);
    
    stk(lt, .4, IMG.sGaya, 540, SB, 680);
  }),
  B(59.85, 66.36, 'bungamas', WC.ma, (lt) => {
    ttl(lt, 'Kepuasan Sementara', 90);
    row(lt, 0.5, 440, 'Kereta mewah', 'KEPUASAN SEMENTARA'); row(lt, 3.3, 590, 'Mencuri', 'KEBEBASAN KEWANGAN');
    stk(lt, .4, IMG.sMewah, 540, SB, 600);
  }),
  Hh(66.36, 70.5, CH(5, 'Pilih Ikut', 'Budget Anda', null), -1, WC.ma),
  B(70.5, 85.33, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Alih Ke Emas', 100);
    row(lt, 0.5, 440, 'Model kereta ikut', 'BUDGET ANDA'); row(lt, 3.6, 590, 'Alih pendapatan', 'KE SIMPANAN EMAS'); row(lt, 7.5, 740, 'Kereta biasa', 'ASET LUAR BIASA');
    stk(lt, .4, IMG.sRm500, 540, SB, 600);
  }),
  B(85.33, 87.97, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Ke Tempat Kerja', 100);
    
    stk(lt, .4, IMG.sFungsi, 540, SB, 680);
  }),
  B(87.97, 96.06, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Ke Kebebasan', 100);
    row(lt, 0.4, 440, 'Simpanan aset emas', 'KE KEBEBASAN KEWANGAN'); row(lt, 5.9, 590, 'Pilih kenderaan', 'DENGAN BIJAK');
    stk(lt, .4, IMG.sBebas, 540, SB, 600);
  }),
  B(96.06, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sBijak, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sAnsuran, IMG.sSusut, IMG.sKos, IMG.sGaya, IMG.sMewah, IMG.sRm500, IMG.sFungsi, IMG.sBebas, IMG.sBijak])), { nobk: true }),
];
