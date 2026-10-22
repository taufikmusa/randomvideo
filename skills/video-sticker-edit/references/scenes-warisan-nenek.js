// scenes.js — "5 Hadiah Warisan Paling Bernilai untuk Cucu" (91.9s + outro 6s). Design maroon konsisten + sticker nenek pop-up. Hard cut.
const VOICE = 91.880998, DUR = VOICE + 6, HEADN = 2756;
const ASSETS = {
  wallet: 'dompet-wealthcard-safari.jpg', tiers: 'set-jongkong-bertingkat-bungamas.jpg', kg: 'jongkong-1kg-tapak-tangan.jpg', ipad: 'kad-dinar-dan-app-gap-ipad.jpg', shop: 'kad-taifook-depan-kedai-public-gold.jpg',
  bungamas: 'jongkong-100g-kad-bungamas-ungu.jpg', merak5: 'kad-ungu-merak-5g.jpg', g250: 'jongkong-250g-merah.jpg', dulang: 'dulang-merah-1kg-koleksi-penuh.jpg', merak100: 'jongkong-merak-100g-dulang-merah.jpg',
  bunga50: 'kad-50g-bunga-raya.jpg', syiling: 'kad-hijau-syiling-pantai.jpg', dinarPantai: 'kad-dinar-hijau-dua-pantai.jpg', binder: 'koleksi-binder-kad.jpg',
  sWarisan: 'stk-warisan-bernilai.png', sSusut: 'stk-duit-susut.png', sKukuh: 'stk-emas-lebih-kukuh.png', sBayi: 'stk-simpan-seawal-bayi.png', sCepat: 'stk-cepat-mudah.png',
  sKasih: 'stk-kasih-sayang-abadi.png', sRosak: 'stk-baju-mainan-rosak.png', sKekal: 'stk-emas-kekal-berharga.png', sLegasi: 'stk-legasi-terbaik.png',
};
const SEG = [
  [0, 4.18, '*5 *Hadiah *Warisan paling bernilai untuk *cucu'],
  [4.18, 10.52, 'Setiap datuk dan nenek pasti mahu tinggalkan sesuatu yang bermakna untuk cucu tersayang.'],
  [10.52, 12.2, 'Bukan sekadar *kenangan,'],
  [12.2, 15.08, 'tapi *bekalan untuk *masa *depan mereka.'],
  [15.08, 19.42, '*Pertama, duit kertas *susut nilai ditelan masa.'],
  [19.42, 22.0, '*Tunai yang anda simpan hari ini'],
  [22.0, 26.42, 'kuasa belinya jauh lebih *rendah 20 tahun akan datang.'],
  [26.42, 31.92, '*Kedua, *emas adalah warisan yang membesar seiring usia cucu.'],
  [31.92, 34.75, 'Nilai emas terjaga dan bertambah *kukuh'],
  [34.75, 37.36, 'sepanjang proses mereka membesar.'],
  [37.36, 44.42, '*Ketiga, akaun simpanan *emas untuk anak-anak boleh dibuka seawal *7 *hari usia mereka.'],
  [44.42, 47.43, 'Kumpul *gram demi gram sejak kecil.'],
  [47.43, 49.22, 'Bila cucu dewasa,'],
  [49.22, 51.51, 'sudah menjadi *dana yang *besar.'],
  [51.51, 55.59, '*Keempat, pemilikan emas fizikal *mudah diserah.'],
  [55.59, 59.14, 'Emas fizikal boleh diserahkan *terus ke tangan cucu'],
  [59.14, 62.46, 'tanpa proses undang-undang yang *berbelit-belit.'],
  [62.46, 66.16, 'Dan *kelima, simbol *kasih *sayang yang kekal.'],
  [66.16, 68.66, 'Emas adalah *tanda *ingatan'],
  [68.66, 74.32, 'yang akan terus bercakap tentang kasih sayang anda walaupun anda sudah tiada lagi.'],
  [74.32, 77.92, '*Baju dan mainan akan *rosak ditelan zaman,'],
  [77.92, 81.41, 'tapi warisan emas fizikal *kekal *bernilai.'],
  [81.41, 84.31, 'Tinggalkan *legasi *terbaik untuk cucu anda.'],
  [84.31, 86.88, 'Tuan puan yang dah ready nak mulakan *simpan *emas?'],
  [86.88, 88.53, 'Boleh rujuk *pin *video saya.'],
  [88.53, 90.76, '*Dulu *ragu, *kini *tahu. Jom'],
  [90.76, 91.88, '*simpan *emas.'],
];
const ttl = (lt, label, size = 96) => { anim(lt, .05, 540, 270, () => mPill([label], 540, 270, size)); anim(lt, .05, 540, 270, () => MA.side(300)); };
const row = (lt, at, y, l, r) => anim(lt, at, 540, y + 55, () => mRow(60, y, 960, l, r));
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'HADIAH');
const SCENES = [
  Hh(0, 4.18, (lt) => { const out = clamp((lt - 3.6) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'HADIAH TERBAIK', lines: ['5 HADIAH', 'WARISAN'], sub: 'PALING BERNILAI UNTUK CUCU' }); X.restore(); }, 1, WC.ma),
  B(4.18, 15.08, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Warisan Untuk Cucu', 92);
    row(lt, 6.3, 440, 'Bukan sekadar', 'KENANGAN'); row(lt, 8.1, 590, 'Tapi', 'BEKALAN MASA DEPAN');
    stk(lt, .5, IMG.sWarisan, 540, mamiY - 45, 700);
  }),
  Hh(15.08, 19.42, CH(1, 'Duit Kertas', 'Susut Nilai', 'ditelan masa'), -1, WC.ma),
  B(19.42, 26.42, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Tunai Hari Ini', 100);
    anim(lt, .4, 290, 650, () => MA.tierCard(50, 430, 480, 420, 'HARI INI', 'TUNAI', 'yang anda simpan'));
    anim(lt, 3.0, 790, 650, () => MA.tierCard(550, 430, 480, 420, '20 TAHUN', 'SUSUT', 'kuasa beli lebih rendah'));
    stk(lt, 4.0, IMG.sSusut, 540, mamiY - 45, 640);
  }),
  Hh(26.42, 31.92, CH(2, 'Emas Warisan', 'Membesar', 'seiring usia cucu'), 1, WC.ma),
  B(31.92, 37.36, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Nilai Emas Kukuh', 92);
    row(lt, .2, 440, 'Nilai emas', 'TERJAGA'); row(lt, 1.6, 590, 'Bertambah', 'KUKUH'); row(lt, 3.2, 740, 'Sepanjang', 'MEREKA MEMBESAR');
    stk(lt, 1.2, IMG.sKukuh, 540, mamiY - 45, 600);
  }),
  Hh(37.36, 41.0, CH(3, 'Akaun Simpanan Emas', null, 'seawal 7 hari'), -1, WC.ma),
  B(41.0, 51.51, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Simpan Seawal Bayi', 92);
    row(lt, .5, 440, 'Dibuka seawal', '7 HARI USIA'); row(lt, 3.4, 590, 'Kumpul', 'GRAM DEMI GRAM'); row(lt, 6.6, 740, 'Bila dewasa', 'DANA YANG BESAR');
    stk(lt, 1.0, IMG.sBayi, 540, mamiY - 45, 600);
  }),
  Hh(51.51, 55.59, CH(4, 'Mudah Diserah', null, 'pemilikan emas fizikal'), 1, WC.ma),
  B(55.59, 62.46, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Diserah Terus', 100);
    row(lt, .3, 440, 'Ke tangan', 'CUCU'); row(lt, 3.0, 590, 'Tanpa proses', 'BERBELIT-BELIT');
    stk(lt, 1.0, IMG.sCepat, 540, mamiY - 45, 760);
  }),
  Hh(62.46, 66.16, CH(5, 'Simbol Kasih Sayang', null, 'yang kekal'), -1, WC.ma),
  B(66.16, 74.32, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Tanda Ingatan', 100);
    anim(lt, .3, 540, 520, () => mWhite(130, 430, 820, ['Emas bercakap tentang', '*kasih sayang anda'], 48));
    anim(lt, 4.0, 540, 740, () => mWhite(130, 650, 820, ['Walaupun anda', '*sudah tiada lagi.'], 48));
    stk(lt, 1.5, IMG.sKasih, 540, mamiY - 45, 560);
  }),
  B(74.32, 81.41, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Warisan Yang Kekal', 92);
    row(lt, .3, 440, 'Baju & mainan', 'AKAN ROSAK'); row(lt, 3.6, 590, 'Warisan emas', 'KEKAL BERNILAI');
    if (lt < 3.5) stk(lt, .8, IMG.sRosak, 540, mamiY - 45, 740, { float: lt > 3 ? false : true });
    stk(lt, 3.6, IMG.sKekal, 540, mamiY - 45, 740);
  }),
  B(81.41, 84.31, 'g250', WC.ma, (lt) => { ttl(lt, 'Legasi Terbaik', 100); stk(lt, .3, IMG.sLegasi, 540, mamiY - 45, 800); }),
  B(84.31, VOICE, 'shop', WC.ma, (lt) => {
    anim(lt, .05, 540, 250, () => mHead('Dah Ready Nak Mula?', 540, 260, 84));
    anim(lt, .3, 540, 430, () => mPill(['Mula Simpan Emas', 'Hari Ini'], 540, 380, 100)); anim(lt, .3, 540, 430, () => MA.side(450));
    anim(lt, 4.2, 540, 760, () => mHead('Dulu Ragu, Kini Tahu!', 540, 770, 80, MA.K.gold));
    anim(lt, 2.4, 540, 900, () => { shadow(() => { rr(180, 850, 720, 120, 60); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Rujuk Pin Video', 540, 930, MA.F.h(54), '#fff', 'center'); });
    stk(lt, .6, IMG.sWarisan, 540, mamiY - 45, 640);
  }),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sWarisan, IMG.sSusut, IMG.sKukuh, IMG.sBayi, IMG.sCepat, IMG.sKasih, IMG.sRosak, IMG.sKekal, IMG.sLegasi])), { nobk: true }),
];
function bakeAll() { ['tiers', 'kg', 'dinarPantai', 'merak100', 'bunga50', 'dulang', 'syiling', 'g250', 'shop'].forEach(k => { BGS[k] = MA.bgPhoto(k, 16, .45); }); }
