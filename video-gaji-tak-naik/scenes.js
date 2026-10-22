// scenes.js — "5 Cara Selamatkan Poket Bila Gaji Tak Naik" (100.54s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 100.542404, DUR = VOICE + 6, HEADN = 3016;
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
const ASSETS = { ...PH, sSlip: 'stk-slip.png', sKuasa: 'stk-kuasa.png', sKawal: 'stk-kawal.png', sAsetinflasi: 'stk-asetinflasi.png', sTambahan: 'stk-tambahan.png', sLindung: 'stk-lindung.png', sGajitaknaik: 'stk-gajitaknaik.png', sBijaksana: 'stk-bijaksana.png', sPerisai: 'stk-perisai.png' };
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'CARA');
const SEG = [
  [0, 3.97, '*5 *cara *selamatkan *poket bila *gaji tak naik.'],
  [3.97, 7.09, 'Gaji pada *slip tidak berubah bertahun-tahun,'],
  [7.09, 9.15, 'tapi harga makanan,'],
  [9.15, 12.07, 'harga barang keperluan *melambung naik.'],
  [12.07, 15.84, 'Realiti ini pasti menyesakkan dada ramai orang.'],
  [15.84, 18.46, 'Namun, kita boleh ambil langkah.'],
  [18.46, 20.72, '*Pertama,'],
  [20.72, 24.42, 'fahami hakikat *kuasa *beli yang semakin mengecil.'],
  [24.42, 30.4, 'Gaji yang sama bermaksud kita semakin miskin kerana harga barang meningkat.'],
  [30.4, 35.93, '*Kedua, fokus kepada perkara yang berada dalam *kawalan kita.'],
  [35.93, 38.75, 'Kita tak boleh kawal *inflasi negara,'],
  [38.75, 41.24, 'tapi kita boleh kawal corak'],
  [41.24, 43.07, '*belanja kita sendiri.'],
  [43.07, 47.91, '*Ketiga, *simpan *aset yang nilainya meningkat bersama *inflasi.'],
  [47.91, 50.8, '*Emas *fizikal adalah *perisai'],
  [50.8, 55.25, 'kerana harganya naik seiring kenaikan kos sara hidup.'],
  [55.25, 59.31, '*Keempat, *terokai punca *pendapatan *tambahan.'],
  [59.31, 65.9, 'Membina aliran wang baru membantu kita mengurangkan tekanan kenaikan kos harian.'],
  [65.9, 69.52, 'Dan *kelima, *lindungi *simpanan yang ada'],
  [69.52, 72.45, 'sebelum nilainya makin *terhakis.'],
  [72.45, 78.05, 'Jangan biarkan wang tunai reput dimamah *inflasi dalam akaun.'],
  [78.05, 81.39, 'Gaji mungkin tak naik seperti yang kita harapkan.'],
  [81.39, 84.98, 'Namun, *kebijaksanaan kita urus *aset'],
  [84.98, 89.57, 'melindungi nilai pendapatan yang kita kerja keras sebelum ini.'],
  [89.57, 93.22, 'Jadi, *bina *perisai *kewangan anda hari ini.'],
  [93.22, 96.92, 'Tuan puan yang dah ready nak mulakan *simpan *emas, boleh rujuk *pin *video saya.'],
  [96.92, 98.53, '*Dulu *ragu, *kini *tahu.'],
  [98.53, 100.54, 'Jom mulakan *simpan *emas.'],
];
const SCENES = [
  Hh(0, 3.97, (lt) => { const out = clamp((lt - 3.5) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: '5 CARA', lines: ['GAJI TAK NAIK', 'POKET SELAMAT'], sub: 'SELAMATKAN POKET ANDA' }); X.restore(); }, 1, WC.ma),
  B(3.97, 18.46, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Gaji Tak Berubah', 90);
    row(lt, 0.5, 440, 'Gaji pada slip', 'TAK BERUBAH'); row(lt, 5.2, 590, 'Harga barang', 'MELAMBUNG NAIK');
    stk(lt, .4, IMG.sSlip, 540, SB, 580);
  }),
  Hh(18.46, 22.0, CH(1, 'Kuasa Beli', 'Mengecil', null), -1, WC.ma),
  B(22.0, 30.4, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Kuasa Beli', 100);
    row(lt, 0.3, 440, 'Kuasa beli', 'MENGECIL'); row(lt, 3.0, 590, 'Gaji sama', 'HARGA BARANG NAIK');
    stk(lt, .4, IMG.sKuasa, 540, SB, 620);
  }),
  Hh(30.4, 34.0, CH(2, 'Fokus Dalam', 'Kawalan Kita', null), 1, WC.ma),
  B(34.0, 43.07, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Dalam Kawalan', 100);
    row(lt, 1.9, 440, 'Tak boleh kawal', 'INFLASI NEGARA'); row(lt, 5.0, 590, 'Boleh kawal', 'CORAK BELANJA');
    stk(lt, .4, IMG.sKawal, 540, SB, 620);
  }),
  Hh(43.07, 46.5, CH(3, 'Simpan Aset', 'Lawan Inflasi', null), -1, WC.ma),
  B(46.5, 55.25, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Aset Fizikal', 100);
    row(lt, 1.5, 440, 'Emas fizikal', 'ADALAH PERISAI'); row(lt, 4.3, 590, 'Harga naik', 'SEIRING KOS HIDUP');
    stk(lt, .4, IMG.sAsetinflasi, 540, SB, 620);
  }),
  Hh(55.25, 58.5, CH(4, 'Pendapatan', 'Tambahan', null), 1, WC.ma),
  B(58.5, 65.9, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Aliran Wang Baru', 96);
    row(lt, 0.8, 440, 'Aliran wang baru', 'KURANGKAN TEKANAN'); row(lt, 4.0, 590, 'Kos harian', 'MENINGKAT');
    stk(lt, .4, IMG.sTambahan, 540, SB, 620);
  }),
  Hh(65.9, 69.0, CH(5, 'Lindungi', 'Simpanan Ada', null), -1, WC.ma),
  B(69.0, 78.05, 'merak5', WC.ma, (lt) => {
    ttl(lt, 'Simpanan Terhakis', 92);
    row(lt, 0.6, 440, 'Sebelum nilai', 'TERHAKIS'); row(lt, 3.6, 590, 'Wang tunai', 'DIMAMAH INFLASI');
    stk(lt, .4, IMG.sLindung, 540, SB, 620);
  }),
  B(78.05, 81.39, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Gaji Tak Naik', 100);
    
    stk(lt, .4, IMG.sGajitaknaik, 540, SB, 680);
  }),
  B(81.39, 89.57, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Kebijaksanaan', 100);
    row(lt, 3.6, 440, 'Urus aset', 'LINDUNG NILAI');
    stk(lt, .4, IMG.sBijaksana, 540, SB, 620);
  }),
  B(89.57, 93.22, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Bina Perisai', 100);
    
    stk(lt, .4, IMG.sPerisai, 540, SB, 680);
  }),
  B(93.22, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sAsetinflasi, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sSlip, IMG.sKuasa, IMG.sKawal, IMG.sAsetinflasi, IMG.sTambahan, IMG.sLindung, IMG.sGajitaknaik, IMG.sBijaksana, IMG.sPerisai])), { nobk: true }),
];
