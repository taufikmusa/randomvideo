// scenes.js — "5 Sebab Emas Permudah Ibadah Korban dan Akikah" (87.91s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 87.910748, DUR = VOICE + 6, HEADN = 2637;
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
const ASSETS = { ...PH, sKos: 'stk-kos.png', sKuasabeli: 'stk-kuasabeli.png', sSyariah: 'stk-syariah.png', sBeransur: 'stk-beransur.png', sAwal: 'stk-awal.png', sMudahkan: 'stk-mudahkan.png', sTenang: 'stk-tenang.png', sNiat: 'stk-niat.png', sJalan: 'stk-jalan.png' };

const SEG = [
  [0, 4.56, '*5 *sebab *emas permudah cara *ibadah *korban dan *akikah'],
  [4.56, 8.38, 'Banyak tuntutan ibadah sebenarnya memerlukan *sokongan *kewangan.'],
  [8.38, 11.18, 'Ibadah *korban tahunan, *akikah anak,'],
  [11.18, 12.84, 'serta menunaikan *umrah.'],
  [12.84, 15.5, 'Ia memerlukan *kewangan yang kukuh.'],
  [15.5, 19.41, 'Ramai tertangguh *niat murni ini disebabkan tiada *tabung khusus.'],
  [19.41, 23.56, '*Pertama, *kos bahagian *lembu *korban meningkat setiap tahun.'],
  [23.56, 26.8, 'Tanpa persediaan awal, kita sering kali terlepas peluang'],
  [26.8, 29.74, 'berkorban setiap kali *Raya *Haji.'],
  [29.74, 33.89, '*Kedua, *emas mengekalkan *kuasa *membeli ternakan.'],
  [33.89, 36.7, 'Simpanan emas meningkat seiring dengan'],
  [36.7, 39.4, 'kenaikan harga pasaran *haiwan ternakan.'],
  [39.4, 43.0, '*Ketiga, kaedah *patuh *syariah untuk niat yang suci.'],
  [43.0, 46.5, 'Menyimpan emas fizikal memberikan kita *ketenangan hati'],
  [46.5, 49.33, 'kerana ia bebas daripada unsur *syubhah.'],
  [49.33, 51.98, '*Dan *keempat, simpan secara'],
  [51.98, 54.06, '*beransur tanpa rasa terbeban.'],
  [54.06, 57.14, 'Asingkan *RM100-200 setiap bulan'],
  [57.14, 59.1, 'bila tiba bulan *Zulhijjah,'],
  [59.1, 61.45, 'dan simpanan kita sudah mencukupi.'],
  [61.45, 65.41, '*Dan *kelima, *bersedia membolehkan ibadah dilaksanakan'],
  [65.41, 69.65, '*tepat pada masanya. Kita tak perlu lagi mencari wang mengejut'],
  [69.65, 71.25, 'masa pelaksanaan'],
  [71.25, 75.35, 'itu tiba. Ibadah yang dituntut wajar dirancang dengan *tenang.'],
  [75.35, 78.55, 'Biarkan simpanan *emas *melicinkan *jalan *ibadah kita.'],
  [78.55, 81.52, '*Sempurnakan *niat kerana *Allah Subhanahu wa Ta\'ala.'],
  [81.52, 83.5, 'Tuan puan yang nak mudahkan *simpan *emas,'],
  [83.5, 84.96, 'boleh rujuk *pin *video saya.'],
  [84.96, 86.3, '*Dulu *ragu, *kini *tahu,'],
  [86.3, 87.91, 'jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'SEBAB');
const SCENES = [
  Hh(0, 4.56, (lt) => { const out = clamp((lt - 4.05) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'IBADAH', lines: ['5 SEBAB', 'EMAS & IBADAH'], sub: 'KORBAN, AKIKAH, UMRAH' }); X.restore(); }, 1, WC.ma),
  B(4.56, 11.18, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Ibadah Perlu Kewangan', 88);
    row(lt, .8, 440, 'Tuntutan ibadah', 'PERLU SOKONGAN'); row(lt, 3.8, 590, 'Korban, akikah', 'DAN UMRAH');
    stk(lt, .4, IMG.sMudahkan, 540, SB, 620);
  }),
  B(11.18, 19.41, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Niat Murni', 100);
    row(lt, .8, 440, 'Perlu kewangan', 'YANG KUKUH'); row(lt, 4.3, 590, 'Niat tertangguh', 'TIADA TABUNG');
    stk(lt, .4, IMG.sNiat, 540, SB, 620);
  }),
  Hh(19.41, 23.56, CH(1, 'Kos Korban', 'Makin Meningkat', null), -1, WC.ma),
  B(23.56, 29.74, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Kos Bahagian Lembu', 92);
    row(lt, .8, 440, 'Tanpa persediaan', 'TERLEPAS PELUANG'); row(lt, 3.0, 590, 'Setiap kali', 'RAYA HAJI');
    stk(lt, .4, IMG.sKos, 540, SB, 620);
  }),
  Hh(29.74, 33.89, CH(2, 'Emas Kekal', 'Kuasa Beli', null), 1, WC.ma),
  B(33.89, 39.4, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Kuasa Beli Ternakan', 92);
    row(lt, .8, 440, 'Simpanan emas', 'MENINGKAT'); row(lt, 2.8, 590, 'Seiring harga', 'HAIWAN TERNAKAN');
    stk(lt, .4, IMG.sKuasabeli, 540, SB, 620);
  }),
  Hh(39.4, 43.0, CH(3, 'Kaedah Patuh', 'Syariah', null), -1, WC.ma),
  B(43.0, 49.33, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Ketenangan Hati', 100);
    row(lt, .8, 440, 'Emas fizikal', 'KETENANGAN HATI'); row(lt, 3.0, 590, 'Bebas daripada', 'UNSUR SYUBHAH');
    stk(lt, .4, IMG.sSyariah, 540, SB, 620);
  }),
  Hh(49.33, 51.98, CH(4, 'Simpan', 'Beransur', null), 1, WC.ma),
  B(51.98, 61.45, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Tanpa Terbeban', 100);
    row(lt, .8, 440, 'Tanpa rasa', 'TERBEBAN'); row(lt, 2.1, 590, 'Asingkan', 'RM100-200 SEBULAN'); row(lt, 5.1, 740, 'Bulan', 'ZULHIJJAH');
    stk(lt, .4, IMG.sBeransur, 540, SB, 600);
  }),
  Hh(61.45, 65.41, CH(5, 'Bersedia Awal', 'Tepat Masanya', null), -1, WC.ma),
  B(65.41, 71.25, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Tepat Pada Masanya', 92);
    row(lt, .8, 440, 'Tak perlu cari', 'WANG MENGEJUT');
    stk(lt, .4, IMG.sAwal, 540, SB, 620);
  }),
  B(71.25, 75.35, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Ibadah Dengan Tenang', 90); stk(lt, .3, IMG.sTenang, 540, SB, 680); }),
  B(75.35, 78.55, 'merak5', WC.ma, (lt) => { ttl(lt, 'Licinkan Jalan Ibadah', 86); stk(lt, .3, IMG.sJalan, 540, SB, 680); }),
  B(78.55, 81.52, 'ipad', WC.ma, (lt) => { ttl(lt, 'Sempurnakan Niat', 96); stk(lt, .3, IMG.sNiat, 540, SB, 680); }),
  B(81.52, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sJalan, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sKos, IMG.sKuasabeli, IMG.sSyariah, IMG.sBeransur, IMG.sAwal, IMG.sMudahkan, IMG.sTenang, IMG.sNiat, IMG.sJalan])), { nobk: true }),
];
