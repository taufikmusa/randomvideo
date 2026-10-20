// scenes.js — "5 Realiti Pahit Harga Rumah Untuk Anak Muda" (85.05s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 85.054694, DUR = VOICE + 6, HEADN = 2551;
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
const ASSETS = { ...PH, sImpian: 'stk-impian.png', sHarga: 'stk-harga.png', sDeposit: 'stk-deposit.png', sTunai: 'stk-tunai.png', sEmas: 'stk-emas.png', sBina: 'stk-bina.png', sKubur: 'stk-kubur.png', sLawan: 'stk-lawan.png', sMulakan: 'stk-mulakan.png' };

const SEG = [
  [0, 3.39, '*5. *Realiti *pahit - *harga *rumah untuk anak muda'],
  [3.39, 6.2, '*Impian memiliki rumah pertama'],
  [6.2, 8.95, 'semakin hari semakin jauh daripada *jangkauan anak muda.'],
  [8.95, 11.0, 'Kenaikan harga *hartanah melompat jauh'],
  [11.0, 13.0, 'meninggalkan kenaikan *gaji.'],
  [13.0, 15.9, '*Pertama, harga rumah naik jauh lebih laju'],
  [15.9, 18.1, 'daripada kenaikan *gaji.'],
  [18.1, 23.0, 'Rumah kos sederhana dulu kini sudah mencecah *setengah *juta *ringgit.'],
  [23.0, 26.61, '*Kedua, *beban mengumpul *deposit tunai.'],
  [26.61, 29.6, '*Deposit *10% bersama kos guaman, duti setem,'],
  [29.6, 32.64, 'memerlukan *puluhan *ribu *ringgit.'],
  [32.64, 35.32, '*Ketiga, simpan *tunai dalam bank'],
  [35.32, 38.59, 'semakin membuatkan simpanan kita *ketinggalan,'],
  [38.59, 41.53, 'sementara kita terkial-kial mengumpul duit,'],
  [41.53, 43.5, 'harga rumah idaman terus *melonjak.'],
  [43.5, 47.34, '*Keempat, *simpan *emas fizikal untuk'],
  [47.34, 49.94, 'mengimbangi kenaikan harga *hartanah.'],
  [49.94, 53.99, 'Nilai emas yang meningkat secara purata *10% setahun'],
  [53.99, 58.47, 'membantu melindungi deposit anda daripada hakisan *inflasi.'],
  [58.47, 62.4, '*Dan *kelima, *bina *deposit bermula dengan langkah kecil hari ini.'],
  [62.4, 65.0, 'Setiap bulan yang anda tangguh,'],
  [65.0, 67.75, 'menjadikan matlamat memiliki rumah semakin *mustahil.'],
  [67.75, 71.09, 'Jangan biarkan *impian memiliki rumah sendiri *terkubur.'],
  [71.09, 73.9, '*Lawan kenaikan harga rumah dengan aset'],
  [73.9, 76.59, '*fizikal *emas yang kalis inflasi.'],
  [76.59, 78.61, 'Mulakan *tabung *emas anda hari ini.'],
  [78.61, 80.6, 'Tuan puan yang dah ready nak mulakan *simpan *emas,'],
  [80.6, 82.45, 'boleh rujuk *pin *video saya.'],
  [82.45, 85.05, '*Dulu *ragu, *kini *tahu. Jom *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'REALITI');
const SCENES = [
  Hh(0, 3.39, (lt) => { const out = clamp((lt - 2.9) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'RUMAH PERTAMA', lines: ['5 REALITI PAHIT', 'HARGA RUMAH'], sub: 'UNTUK ANAK MUDA' }); X.restore(); }, 1, WC.ma),
  B(3.39, 8.95, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Impian Rumah Pertama', 86);
    row(lt, .8, 440, 'Semakin hari', 'SEMAKIN JAUH'); row(lt, 2.9, 590, 'Daripada', 'JANGKAUAN');
    stk(lt, .4, IMG.sImpian, 540, SB, 620);
  }),
  B(8.95, 13.0, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Hartanah Melompat', 94);
    row(lt, .8, 440, 'Harga hartanah', 'MELOMPAT JAUH'); row(lt, 2.4, 590, 'Tinggalkan', 'KENAIKAN GAJI');
    stk(lt, .4, IMG.sHarga, 540, SB, 620);
  }),
  Hh(13.0, 18.1, CH(1, 'Harga Rumah', 'Lebih Laju Dari Gaji', null), -1, WC.ma),
  B(18.1, 23.0, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Setengah Juta Ringgit', 86);
    row(lt, .8, 440, 'Rumah sederhana', 'MENCECAH SETENGAH JUTA');
    stk(lt, .4, IMG.sHarga, 540, SB, 620);
  }),
  Hh(23.0, 26.61, CH(2, 'Beban Kumpul', 'Deposit Tunai', null), 1, WC.ma),
  B(26.61, 32.64, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Deposit 10%', 100);
    row(lt, .8, 440, 'Deposit', '10%'); row(lt, 1.8, 590, 'Kos guaman', 'DUTI SETEM'); row(lt, 4.0, 740, 'Perlukan', 'PULUHAN RIBU');
    stk(lt, .4, IMG.sDeposit, 540, SB, 600);
  }),
  Hh(32.64, 35.32, CH(3, 'Simpan Tunai', 'Dalam Bank', null), -1, WC.ma),
  B(35.32, 43.5, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Semakin Ketinggalan', 90);
    row(lt, .8, 440, 'Simpanan', 'KETINGGALAN'); row(lt, 3.3, 590, 'Kumpul duit', 'TERKIAL-KIAL'); row(lt, 6.2, 740, 'Harga rumah', 'TERUS MELONJAK');
    stk(lt, .4, IMG.sTunai, 540, SB, 600);
  }),
  Hh(43.5, 47.34, CH(4, 'Simpan Emas', 'Fizikal', null), 1, WC.ma),
  B(47.34, 58.47, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Emas Kejar Hartanah', 90);
    row(lt, .8, 440, 'Imbang', 'HARGA HARTANAH'); row(lt, 2.6, 590, 'Emas purata', '10% SETAHUN'); row(lt, 5.5, 740, 'Lindungi', 'DEPOSIT ANDA');
    stk(lt, .4, IMG.sEmas, 540, SB, 600);
  }),
  Hh(58.47, 62.4, CH(5, 'Bina Deposit', 'Langkah Kecil', null), -1, WC.ma),
  B(62.4, 67.75, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Mula Hari Ini', 100);
    row(lt, .8, 440, 'Setiap bulan', 'DITANGGUH'); row(lt, 3.0, 590, 'Matlamat rumah', 'SEMAKIN MUSTAHIL');
    stk(lt, .4, IMG.sBina, 540, SB, 620);
  }),
  B(67.75, 71.09, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Impian Terkubur', 96); stk(lt, .3, IMG.sKubur, 540, SB, 680); }),
  B(71.09, 76.59, 'merak5', WC.ma, (lt) => {
    ttl(lt, 'Lawan Harga Rumah', 92);
    row(lt, .8, 440, 'Lawan kenaikan', 'HARGA RUMAH'); row(lt, 2.9, 590, 'Dengan aset', 'EMAS KALIS INFLASI');
    stk(lt, .4, IMG.sLawan, 540, SB, 620);
  }),
  B(76.59, 78.61, 'ipad', WC.ma, (lt) => { ttl(lt, 'Mulakan Tabung', 100); stk(lt, .3, IMG.sMulakan, 540, SB, 680); }),
  B(78.61, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sMulakan, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sImpian, IMG.sHarga, IMG.sDeposit, IMG.sTunai, IMG.sEmas, IMG.sBina, IMG.sKubur, IMG.sLawan, IMG.sMulakan])), { nobk: true }),
];
