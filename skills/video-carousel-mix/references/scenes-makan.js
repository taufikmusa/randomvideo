// scenes.js — "5 Jawapan Bila Orang Kata Emas Tak Boleh Makan" (98.04s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 98.035011, DUR = VOICE + 6, HEADN = 2941;
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
const ASSETS = { ...PH, sTanya: 'stk-emas-tak-boleh-makan.png', sKertas: 'stk-wang-kertas-tak-boleh-makan.png', sPenukar: 'stk-emas-alat-penukar.png', sKalis: 'stk-kalis-krisis-kebuluran.png', sRumah: 'stk-rumah-tanah-tak-boleh-makan.png', sKuasa: 'stk-kekalkan-kuasa-beli.png', sBukan: 'stk-emas-bukan-makanan.png', sLindung: 'stk-lindungi-bekalan.png', sTerjamin: 'stk-simpan-emas-terjamin.png' };

const SEG = [
  [0, 3.61, '*5 *jawapan bila orang kata "*emas tak boleh *makan"'],
  [3.61, 6.5, 'Buat apa *bazir duit simpan emas?'],
  [6.5, 9.36, 'Bukannya emas boleh *dimakan bila kita lapar.'],
  [9.36, 11.33, 'Alasan ini kedengaran *lucu,'],
  [11.33, 16.07, 'namun ia membongkar *kekeliruan besar tentang erti *aset *kewangan.'],
  [16.07, 20.6, '*Pertama, *wang *kertas dalam dompet kita pun tak boleh dimakan.'],
  [20.6, 23.43, 'Kita menyimpan wang bukan untuk *mengunyahnya,'],
  [23.43, 25.64, 'tapi untuk *digunakan'],
  [25.64, 28.01, 'membeli *makanan dan keperluan'],
  [28.01, 30.07, 'seharian. *Kedua,'],
  [30.07, 33.72, '*emas adalah *alat *penukar *makanan paling berkuasa.'],
  [33.72, 35.78, 'Bila perlukan *beras dan *lauk,'],
  [35.78, 37.8, 'emas kita boleh *jual *balik,'],
  [37.8, 42.02, 'kita boleh *gadai, dapat *tunai, kita boleh beli perkara tersebut.'],
  [42.02, 44.78, '*Ketiga, *kuasa *beli emas'],
  [44.78, 46.86, '*kalis *krisis *kebuluran.'],
  [46.86, 49.68, 'Sejarah membuktikan sewaktu *zaman *perang,'],
  [49.68, 52.31, 'sekeping emas mampu membeli *makanan'],
  [52.31, 53.96, 'ketika wang kertas'],
  [53.96, 56.54, 'tidak bernilai. *Keempat,'],
  [56.54, 59.06, '*rumah dan *tanah juga tak boleh dimakan,'],
  [59.06, 62.12, 'namun tiada siapa menolak untuk memilikinya'],
  [62.12, 65.34, 'kerana ia adalah *penyimpan *nilai kekayaan.'],
  [65.34, 69.95, '*Dan *kelima, emas *mengekalkan *kuasa *beli anda.'],
  [69.95, 75.71, 'Emas memastikan simpanan tetap mampu membeli makanan pada masa akan datang.'],
  [75.71, 78.52, 'Jadi, emas memang bukan *makanan untuk'],
  [78.52, 81.86, 'perut kita, tapi ia adalah *perisai yang'],
  [81.86, 84.64, 'digunakan untuk membeli makanan'],
  [84.64, 87.45, 'dan sentiasa ada *makanan di *atas *meja.'],
  [87.45, 90.5, '*Lindungi bekalan masa depan dengan *simpanan *emas,'],
  [90.5, 92.94, 'tuan puan yang dah ready nak mulakan *simpan *emas'],
  [92.94, 95.99, 'boleh rujuk *pin *video saya. *Dulu *ragu, *kini *tahu,'],
  [95.99, 98.03, 'jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'JAWAPAN');
const SCENES = [
  Hh(0, 3.61, (lt) => { const out = clamp((lt - 3.1) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'ALASAN LUCU?', lines: ['5 JAWAPAN', 'TAK BOLEH MAKAN'], sub: 'BILA ORANG KATA BEGITU' }); X.restore(); }, 1, WC.ma),
  B(3.61, 16.07, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Emas Tak Boleh Makan?', 80);
    row(lt, .8, 440, 'Buat apa', 'BAZIR DUIT?'); row(lt, 3.4, 590, 'Bukannya emas', 'BOLEH DIMAKAN'); row(lt, 6.8, 740, 'Alasan ini', 'KEDENGARAN LUCU');
    stk(lt, .4, IMG.sTanya, 540, SB, 600);
  }),
  Hh(16.07, 19.5, CH(1, 'Wang Kertas Pun', 'Tak Boleh Dimakan', null), -1, WC.ma),
  B(19.5, 28.01, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Guna Untuk Beli', 96);
    row(lt, 1.0, 440, 'Simpan wang', 'BUKAN UNTUK DIKUNYAH'); row(lt, 3.8, 590, 'Tapi untuk', 'DIGUNAKAN'); row(lt, 6.4, 740, 'Beli makanan', 'DAN KEPERLUAN');
    stk(lt, .4, IMG.sKertas, 540, SB, 600);
  }),
  Hh(28.01, 31.5, CH(2, 'Alat Penukar', 'Makanan', null), 1, WC.ma),
  B(31.5, 42.02, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Penukar Makanan', 100);
    row(lt, 1.0, 440, 'Perlu beras & lauk', 'JUAL BALIK EMAS'); row(lt, 4.6, 590, 'Boleh', 'GADAI, DAPAT TUNAI');
    stk(lt, .4, IMG.sPenukar, 540, SB, 620);
  }),
  Hh(42.02, 45.5, CH(3, 'Kalis Krisis', 'Kebuluran', null), -1, WC.ma),
  B(45.5, 54.7, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Zaman Perang', 100);
    row(lt, 1.0, 440, 'Sejarah', 'BUKTI ZAMAN PERANG'); row(lt, 3.6, 590, 'Sekeping emas', 'BELI MAKANAN'); row(lt, 6.4, 740, 'Wang kertas', 'TAK BERNILAI');
    stk(lt, .4, IMG.sKalis, 540, SB, 600);
  }),
  Hh(54.7, 58.0, CH(4, 'Rumah & Tanah', 'Pun Tak Boleh Makan', null), 1, WC.ma),
  B(58.0, 65.34, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Penyimpan Nilai', 100);
    row(lt, 1.0, 440, 'Tiada siapa', 'MENOLAK MEMILIKI'); row(lt, 3.8, 590, 'Ia adalah', 'PENYIMPAN NILAI');
    stk(lt, .4, IMG.sRumah, 540, SB, 620);
  }),
  Hh(65.34, 68.8, CH(5, 'Kekalkan', 'Kuasa Beli', null), -1, WC.ma),
  B(68.8, 75.71, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Kuasa Beli Kekal', 100);
    row(lt, 1.0, 440, 'Simpanan', 'MAMPU BELI MAKANAN'); row(lt, 3.8, 590, 'Pada', 'MASA AKAN DATANG');
    stk(lt, .4, IMG.sKuasa, 540, SB, 620);
  }),
  B(75.71, 84.64, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Emas = Perisai', 100); anim(lt, 2.5, 540, 560, () => mWhite(130, 440, 820, ['Emas bukan makanan,', '*tapi perisai makanan'], 48)); stk(lt, .3, IMG.sBukan, 540, SB, 620); }),
  B(84.64, 87.45, 'merak5', WC.ma, (lt) => { ttl(lt, 'Makanan Di Meja', 100); stk(lt, .3, IMG.sLindung, 540, SB, 660); }),
  B(87.45, 90.5, 'ipad', WC.ma, (lt) => { ttl(lt, 'Lindungi Bekalan', 100); stk(lt, .3, IMG.sTerjamin, 540, SB, 660); }),
  B(90.5, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sLindung, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sTanya, IMG.sKertas, IMG.sPenukar, IMG.sKalis, IMG.sRumah, IMG.sKuasa, IMG.sBukan, IMG.sLindung, IMG.sTerjamin])), { nobk: true }),
];
