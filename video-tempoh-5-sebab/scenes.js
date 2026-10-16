// scenes.js — "5 Perkara Wajib Tahu Tentang Tempoh Simpan Emas" (93.55s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 93.552993, DUR = VOICE + 6, HEADN = 2806;
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
const ASSETS = { ...PH, sLama: 'stk-berapa-lama.png', sPanjang: 'stk-jangka-panjang.png', sJurang: 'stk-jurang-susut-nilai.png', sTahun: 'stk-pegangan-3-5-tahun.png', sFokus: 'stk-fokus-kumpul-gram.png', sMatlamat: 'stk-matlamat-jelas.png', sSabar: 'stk-perlu-kesabaran.png', sKaya: 'stk-kekayaan-sejati.png', sMasa: 'stk-biar-masa.png' };

const SEG = [
  [0, 1.96, '*5 *perkara wajib tahu'],
  [1.96, 4.25, 'tentang *tempoh simpan *emas.'],
  [4.25, 6.41, '*Berapa *lama saya kena simpan emas'],
  [6.41, 9.24, 'sebelum boleh nampak *keuntungan yang'],
  [9.24, 12.17, 'saya dapat daripada menyimpan emas?'],
  [12.17, 14.0, 'Jawapan kepada soalan ini'],
  [14.0, 17.51, 'akan membetulkan *jangkaan dan *matlamat sebenar'],
  [17.51, 19.33, 'anda dalam *menabung.'],
  [19.33, 22.91, '*Pertama, *emas adalah tabungan *jangka *panjang.'],
  [22.91, 29.73, 'Emas bukan *skim *cepat *kaya: beli hari ini, jual minggu depan untuk kaut keuntungan.'],
  [29.73, 33.76, '*Kedua, fahami perbezaan harga *belian dan *jualan.'],
  [33.76, 36.69, 'Dalam jangka pendek, wujud *jurang *spread'],
  [36.69, 42.71, 'dengan emas. Jadi, kenaikan harga emas *memerlukan *masa untuk mengatasi spread.'],
  [42.71, 47.11, '*Ketiga, pegangan *3 hingga *5 *tahun memberi'],
  [47.11, 54.9, '*kenaikan *nilai emas terbukti sangat *ketara apabila disimpan merentasi tempoh beberapa tahun.'],
  [54.9, 57.74, '*Keempat, *fokus mengumpul jumlah *gram,'],
  [57.74, 60.05, 'bukan melihat *harga *harian.'],
  [60.05, 64.21, 'Penyimpan yang *tenang tidak *cemas melihat naik turun harga emas.'],
  [64.21, 67.65, '*Dan *kelima, *tetapkan *matlamat kewangan yang *jelas.'],
  [67.65, 69.43, 'Simpan emas untuk'],
  [69.43, 72.55, 'matlamat *2 *tahun ataupun lebih lama lebih baik,'],
  [72.55, 74.81, 'seperti dana *persaraan,'],
  [74.81, 78.4, '*pendidikan anak-anak ataupun membeli *rumah *impian.'],
  [78.4, 82.42, 'Emas memerlukan *kesabaran untuk membuahkan hasil.'],
  [82.42, 85.95, 'Jadi simpan emas dengan *matlamat yang *betul.'],
  [85.95, 88.29, 'Tuan puan yang dah ready nak mulakan *simpan *emas'],
  [88.29, 90.02, 'boleh rujuk *pin *video saya.'],
  [90.02, 93.55, '*Dulu *ragu, *kini *tahu. Jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'PERKARA');
const SCENES = [
  Hh(0, 4.25, (lt) => { const out = clamp((lt - 3.7) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'WAJIB TAHU', lines: ['5 PERKARA', 'TEMPOH SIMPAN'], sub: 'BERAPA LAMA SIMPAN EMAS?' }); X.restore(); }, 1, WC.ma),
  B(4.25, 19.33, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Berapa Lama?', 100);
    row(lt, .6, 440, 'Berapa lama', 'KENA SIMPAN EMAS'); row(lt, 3.4, 590, 'Sebelum nampak', 'KEUNTUNGAN'); row(lt, 9.4, 740, 'Jawapan ini', 'BETULKAN JANGKAAN');
    stk(lt, .4, IMG.sLama, 540, SB, 600);
  }),
  Hh(19.33, 22.91, CH(1, 'Tabungan', 'Jangka Panjang', null), -1, WC.ma),
  B(22.91, 29.73, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Bukan Skim Cepat Kaya', 80);
    row(lt, 1.0, 440, 'Beli hari ini', 'JUAL MINGGU DEPAN'); row(lt, 3.8, 590, 'Itu bukan', 'CARA EMAS');
    stk(lt, .4, IMG.sPanjang, 540, SB, 620);
  }),
  Hh(29.73, 33.76, CH(2, 'Beza Harga', 'Beli & Jual', null), 1, WC.ma),
  B(33.76, 42.71, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Jurang Spread', 100);
    row(lt, 1.0, 440, 'Jangka pendek', 'ADA JURANG SPREAD'); row(lt, 4.6, 590, 'Kenaikan harga', 'PERLU MASA');
    stk(lt, .4, IMG.sJurang, 540, SB, 620);
  }),
  Hh(42.71, 46.0, CH(3, 'Pegangan', '3-5 Tahun', null), -1, WC.ma),
  B(46.0, 54.9, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Pegangan 3-5 Tahun', 90);
    anim(lt, .4, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'PEGANG', '3-5', 'tahun'));
    anim(lt, 2.0, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'NILAI', 'NAIK', 'lebih ketara'));
    stk(lt, 4.2, IMG.sTahun, 540, SB, 580);
  }),
  Hh(54.9, 58.0, CH(4, 'Fokus Kumpul', 'Jumlah Gram', null), 1, WC.ma),
  B(58.0, 64.21, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Jangan Cemas', 100);
    row(lt, .8, 440, 'Bukan lihat', 'HARGA HARIAN'); row(lt, 2.9, 590, 'Penyimpan tenang', 'TAK CEMAS');
    stk(lt, .4, IMG.sFokus, 540, SB, 620);
  }),
  Hh(64.21, 67.65, CH(5, 'Tetapkan Matlamat', 'Kewangan Jelas', null), -1, WC.ma),
  B(67.65, 78.4, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Matlamat 2 Tahun+', 96);
    row(lt, 1.4, 440, 'Matlamat', '2 TAHUN KE ATAS'); row(lt, 4.9, 590, 'Dana', 'PERSARAAN'); row(lt, 7.2, 740, 'Anak & rumah', 'IMPIAN');
    stk(lt, .4, IMG.sMatlamat, 540, SB, 600);
  }),
  B(78.4, 82.42, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Perlu Kesabaran', 100); stk(lt, .3, IMG.sSabar, 540, SB, 680); }),
  B(82.42, 85.95, 'merak5', WC.ma, (lt) => { ttl(lt, 'Matlamat Yang Betul', 92); anim(lt, .5, 540, 560, () => mWhite(130, 440, 820, ['Simpan emas dengan', '*matlamat yang betul'], 50)); stk(lt, .3, IMG.sKaya, 540, SB, 620); }),
  B(85.95, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sMasa, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sLama, IMG.sPanjang, IMG.sJurang, IMG.sTahun, IMG.sFokus, IMG.sMatlamat, IMG.sSabar, IMG.sKaya, IMG.sMasa])), { nobk: true }),
];
