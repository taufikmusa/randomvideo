// scenes.js — "5 Cara Bantu Keluarga Tanpa Korbankan Diri Sendiri" (91.12s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 91.115102, DUR = VOICE + 6, HEADN = 2733;
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
const ASSETS = { ...PH, sNilai: 'stk-nilai.png', sHad: 'stk-had.png', sPoket: 'stk-poket.png', sMendidik: 'stk-mendidik.png', sAsingkan: 'stk-asingkan.png', sKekayaan: 'stk-kekayaan.png', sBerenang: 'stk-berenang.png', sTiang: 'stk-tiang.png', sMemberi: 'stk-memberi.png' };
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'CARA');
const SEG = [
  [0, 4.63, '*5 *cara *bantu *keluarga tanpa korbankan *diri *sendiri.'],
  [4.63, 11.61, 'Menghulur bantuan kewangan kepada ibu bapa dan saudara adalah *nilai *murni masyarakat kita.'],
  [11.61, 16.85, 'Namun, membantu tanpa *sempadan yang jelas boleh *menjerat diri sendiri.'],
  [16.85, 21.67, '*Pertama, tetapkan *had *kemampuan bantuan yang *realistik.'],
  [21.67, 24.21, 'Membantu melebihi kemampuan'],
  [24.21, 26.36, 'bukanlah satu tindakan yang'],
  [26.36, 28.32, 'baik. *Kedua,'],
  [28.32, 30.98, '*kukuhkan *poket *sendiri terlebih dahulu.'],
  [30.98, 33.31, '*Mustahil kita nak selamatkan orang'],
  [33.31, 36.78, 'yang lemas jika kita sendiri *tak *tahu *berenang.'],
  [36.78, 42.37, '*Ketiga, hulurkan bantuan yang *mendidik, bukan sekadar memberi tunai.'],
  [42.37, 46.17, 'Bantu saudara membina *kemahiran *berdikari'],
  [46.17, 48.58, 'agar tidak bergantung selamanya.'],
  [48.58, 52.39, '*Keempat, *asingkan bahagian *simpanan *peribadi'],
  [52.39, 54.54, 'sebelum mengagihkan bantuan.'],
  [54.54, 56.47, 'Pastikan *masa *depan anda'],
  [56.47, 60.38, 'tidak terabai dalam usaha membantu orang lain.'],
  [60.38, 65.77, 'Dan *kelima, *bina *kekayaan agar mampu memberi lebih banyak *manfaat'],
  [65.77, 72.73, 'pada masa depan. Kedudukan kewangan yang *teguh membolehkan anda menjadi *tiang *pelindung keluarga.'],
  [72.73, 77.46, 'Membantu saudara dan keluarga adalah amalan yang sangat *terpuji,'],
  [77.46, 81.3, 'tapi pastikan *benteng diri tetap *kukuh berdiri.'],
  [81.3, 83.64, '*Kukuhkan diri untuk terus *memberi.'],
  [83.64, 87.92, 'Tuan puan yang dah ready nak mulakan *simpan *emas, boleh rujuk *pin *video saya.'],
  [87.92, 91.12, '*Dulu *ragu, *kini *tahu. Jom *simpan *emas.'],
];
const SCENES = [
  Hh(0, 4.63, (lt) => { const out = clamp((lt - 4.1) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: '5 CARA', lines: ['BANTU KELUARGA', 'TANPA KORBAN'], sub: 'JANGAN KORBANKAN DIRI SENDIRI' }); X.restore(); }, 1, WC.ma),
  B(4.63, 16.85, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Bantu Keluarga', 96);
    row(lt, 2.0, 440, 'Bantu ibu bapa', 'NILAI MURNI'); row(lt, 7.2, 590, 'Tanpa sempadan', 'MENJERAT DIRI');
    stk(lt, .4, IMG.sNilai, 540, SB, 600);
  }),
  Hh(16.85, 20.5, CH(1, 'Tetapkan Had', 'Kemampuan', null), -1, WC.ma),
  B(20.5, 26.4, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Had Realistik', 100);
    row(lt, 1.2, 440, 'Melebihi kemampuan', 'BUKAN TINDAKAN BAIK');
    stk(lt, .4, IMG.sHad, 540, SB, 620);
  }),
  Hh(26.4, 30.98, CH(2, 'Kukuhkan Poket', 'Sendiri Dahulu', null), 1, WC.ma),
  B(30.98, 33.31, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Poket Sendiri', 100);
    
    stk(lt, .4, IMG.sPoket, 540, SB, 680);
  }),
  B(33.31, 36.78, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Tahu Berenang', 100);
    
    stk(lt, .4, IMG.sBerenang, 540, SB, 680);
  }),
  Hh(36.78, 40.5, CH(3, 'Bantuan Yang', 'Mendidik', null), -1, WC.ma),
  B(40.5, 48.58, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Bantuan Mendidik', 92);
    row(lt, 1.9, 440, 'Bantu saudara', 'BINA KEMAHIRAN'); row(lt, 5.7, 590, 'Tak bergantung', 'SELAMANYA');
    stk(lt, .4, IMG.sMendidik, 540, SB, 600);
  }),
  Hh(48.58, 52.2, CH(4, 'Asingkan Simpanan', 'Peribadi', null), 1, WC.ma),
  B(52.2, 60.38, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Simpanan Peribadi', 92);
    row(lt, 0.2, 440, 'Sebelum agih', 'BANTUAN'); row(lt, 2.3, 590, 'Masa depan', 'JANGAN TERABAI');
    stk(lt, .4, IMG.sAsingkan, 540, SB, 600);
  }),
  Hh(60.38, 63.5, CH(5, 'Bina Kekayaan', 'Beri Lebih', null), -1, WC.ma),
  B(63.5, 66.6, 'bungamas', WC.ma, (lt) => {
    ttl(lt, 'Bina Kekayaan', 100);
    
    stk(lt, .4, IMG.sKekayaan, 540, SB, 680);
  }),
  B(66.6, 72.73, 'merak5', WC.ma, (lt) => {
    ttl(lt, 'Tiang Pelindung', 96);
    row(lt, 1.0, 440, 'Kewangan teguh', 'TIANG PELINDUNG');
    stk(lt, .4, IMG.sTiang, 540, SB, 620);
  }),
  B(72.73, 77.46, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Amalan Terpuji', 100);
    
    stk(lt, .4, IMG.sNilai, 540, SB, 680);
  }),
  B(77.46, 83.64, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Benteng Diri Kukuh', 100);
    
    stk(lt, .4, IMG.sPoket, 540, SB, 680);
  }),
  B(83.64, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sMemberi, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sNilai, IMG.sHad, IMG.sPoket, IMG.sMendidik, IMG.sAsingkan, IMG.sKekayaan, IMG.sBerenang, IMG.sTiang, IMG.sMemberi])), { nobk: true }),
];
