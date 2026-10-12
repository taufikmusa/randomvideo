// scenes.js — "5 Persediaan Sebelum Berhenti Kerja Untuk Berniaga" (88.63s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 88.63, DUR = VOICE + 6, HEADN = 2658;
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
const ASSETS = { ...PH, sNak: 'stk-nak-berniaga.png', sJangan: 'stk-jangan-terjun-terus.png', sDana: 'stk-dana-kecemasan.png', sModal: 'stk-asingkan-modal-peribadi.png', sAset: 'stk-bina-aset.png', sHutang: 'stk-kurangkan-hutang.png', sGaji: 'stk-mula-waktu-bergaji.png', sBerani: 'stk-berani-tapi-bersiap.png', sAsas: 'stk-bina-asas-dulu.png' };

const SEG = [
  [0, 4.23, '*5 *persediaan sebelum *berhenti kerja untuk *berniaga'],
  [4.23, 9.72, 'Berhenti kerja makan gaji dan bina perniagaan sendiri memang *impian yang hebat,'],
  [9.72, 12.85, 'tapi melompat tanpa *payung *terjun'],
  [12.85, 15.4, 'kewangan adalah tindakan *berbahaya.'],
  [15.4, 20.75, '*Pertama, sediakan *dana *kecemasan sara hidup sekurang-kurangnya *satu *tahun.'],
  [20.75, 24.25, 'Bisnes baru jarang *untung serta-merta,'],
  [24.25, 27.04, 'anda perlukan wang untuk *terus *hidup.'],
  [27.04, 31.6, '*Kedua, *asingkan *modal niaga daripada duit poket *peribadi.'],
  [31.6, 37.13, 'Jangan sesekali *campur aduk keuntungan bisnes dengan perbelanjaan *dapur keluarga.'],
  [37.13, 39.53, '*Ketiga, bina *aset'],
  [39.53, 41.28, 'sebelum ambil *risiko besar.'],
  [41.28, 48.3, 'Kumpul aset seperti *emas *fizikal semasa anda masih mempunyai *pendapatan *tetap bulanan.'],
  [48.3, 51.99, '*Keempat, kurangkan komitmen *hutang peribadi.'],
  [51.99, 56.19, 'Tekanan *angsuran bulanan kereta ataupun *kad *kredit boleh'],
  [56.19, 59.31, 'membantutkan *fokus perniagaan anda.'],
  [59.31, 63.39, '*Dan *kelima, mulakan langkah waktu masih *bergaji.'],
  [63.39, 66.2, 'Simpan *sebahagian gaji ke dalam bentuk *aset'],
  [66.2, 70.26, '*kalis *inflasi sebagai modal keselamatan masa depan.'],
  [70.26, 73.16, 'Berniaga memerlukan *keberanian yang tinggi,'],
  [73.16, 77.45, 'tapi keberanian sebenarnya datang daripada *persediaan yang *kukuh.'],
  [77.45, 80.13, 'Bina *asas sebelum melangkah keluar.'],
  [80.13, 82.12, 'Tuan puan yang dah ready nak'],
  [82.12, 83.99, '*simpan *emas *fizikal di *Public *Gold'],
  [83.99, 86.5, 'boleh rujuk *video saya.'],
  [86.5, 88.63, '*Dulu *ragu, *kini *tahu. Jom *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'PERSEDIAAN');
const SCENES = [
  Hh(0, 4.23, (lt) => { const out = clamp((lt - 3.7) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'IMPIAN BERNIAGA', lines: ['5 PERSEDIAAN', 'NAK BERNIAGA'], sub: 'SEBELUM BERHENTI KERJA' }); X.restore(); }, 1, WC.ma),
  B(4.23, 15.4, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Impian Berniaga', 100);
    if (lt < 5.5) { row(lt, .6, 440, 'Berhenti kerja', 'IMPIAN HEBAT'); row(lt, 3.0, 590, 'Bina', 'PERNIAGAAN SENDIRI'); stk(lt, .4, IMG.sNak, 540, SB, 640); }
    else { anim(lt, 5.8, 540, 560, () => mWhite(130, 440, 820, ['Melompat tanpa', '*payung terjun?'], 52)); stk(lt, 5.6, IMG.sJangan, 540, SB, 640); }
  }),
  Hh(15.4, 20.75, CH(1, 'Dana Kecemasan', null, 'sara hidup sekurang-kurangnya 1 tahun'), -1, WC.ma),
  B(20.75, 27.04, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Dana Kecemasan', 96);
    row(lt, .8, 440, 'Bisnes baru', 'TAK TERUS UNTUNG'); row(lt, 3.3, 590, 'Wang untuk', 'TERUS HIDUP');
    stk(lt, .4, IMG.sDana, 540, SB, 640);
  }),
  Hh(27.04, 31.6, CH(2, 'Asingkan Modal', 'Dari Duit Peribadi', null), 1, WC.ma),
  B(31.6, 37.13, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Jangan Campur Aduk', 90);
    row(lt, .8, 440, 'Untung bisnes', 'ASING'); row(lt, 3.0, 590, 'Belanja dapur', 'ASING JUGA');
    stk(lt, .4, IMG.sModal, 540, SB, 620);
  }),
  Hh(37.13, 41.28, CH(3, 'Bina Aset', null, 'sebelum ambil risiko besar'), -1, WC.ma),
  B(41.28, 48.3, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Kumpul Emas Fizikal', 86);
    row(lt, 1.2, 440, 'Aset', 'EMAS FIZIKAL'); row(lt, 4.2, 590, 'Pendapatan', 'TETAP BULANAN');
    stk(lt, .4, IMG.sAset, 540, SB, 640);
  }),
  Hh(48.3, 51.99, CH(4, 'Kurangkan Hutang', null, 'komitmen peribadi'), 1, WC.ma),
  B(51.99, 59.31, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Hutang Bebankan', 96);
    row(lt, .8, 440, 'Angsuran', 'KERETA'); row(lt, 2.4, 590, 'Kad', 'KREDIT'); row(lt, 4.6, 740, 'Fokus bisnes', 'TERGANGGU');
    stk(lt, .4, IMG.sHutang, 540, SB, 600);
  }),
  Hh(59.31, 63.39, CH(5, 'Mula Waktu', 'Masih Bergaji', null), -1, WC.ma),
  B(63.39, 70.26, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Simpan Dalam Aset', 90);
    anim(lt, 2.2, 540, 560, () => mWhite(130, 440, 820, ['Simpan sebahagian', '*gaji jadi aset'], 52));
    stk(lt, .4, IMG.sGaji, 540, SB, 640);
  }),
  B(70.26, 77.45, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Berani Berniaga', 100);
    anim(lt, .8, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'BERNIAGA', 'BERANI', 'perlu keberanian'));
    anim(lt, 3.5, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'KEBERANIAN', 'PERSEDIAAN', 'yang kukuh'));
    stk(lt, 4.8, IMG.sBerani, 540, SB, 600);
  }),
  B(77.45, 80.13, 'kg', WC.ma, (lt) => { ttl(lt, 'Bina Asas Dulu', 100); stk(lt, .3, IMG.sAsas, 540, SB, 700); }),
  B(80.13, 83.99, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Simpan Emas Fizikal', 88);
    row(lt, 1.0, 440, 'Di', 'PUBLIC GOLD'); row(lt, 2.6, 590, 'Mula', 'HARI INI');
    stk(lt, .4, IMG.sAset, 540, SB, 640);
  }),
  B(83.99, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sAsas, 640)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sNak, IMG.sJangan, IMG.sDana, IMG.sModal, IMG.sAset, IMG.sHutang, IMG.sGaji, IMG.sBerani, IMG.sAsas])), { nobk: true }),
];
