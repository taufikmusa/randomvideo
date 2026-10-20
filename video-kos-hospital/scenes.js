// scenes.js — "5 Sebab Kos Hospital Boleh Mufliskan Keluarga" (83.29s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 83.289977, DUR = VOICE + 6, HEADN = 2499;
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
const ASSETS = { ...PH, sRawatan: 'stk-rawatan.png', sInsurans: 'stk-insurans.png', sKritikal: 'stk-kritikal.png', sKorek: 'stk-korek.png', sEmas: 'stk-emas.png', sNikmat: 'stk-nikmat.png', sPayung: 'stk-payung.png', sLindungi: 'stk-lindungi.png', sMasadepan: 'stk-masadepan.png' };

const SEG = [
  [0, 4.15, '*5 *sebab *kos *hospital boleh membuatkan keluarga *muflis'],
  [4.15, 6.5, '*Kesihatan adalah nikmat yang paling bernilai,'],
  [6.5, 9.76, 'tapi ia boleh berubah dalam masa *satu *saat.'],
  [9.76, 12.5, 'Satu kemasukan hospital boleh *melumpuhkan'],
  [12.5, 15.88, 'seluruh simpanan keluarga yang dibina bertahun-tahun.'],
  [15.88, 19.68, '*Pertama, *kos *rawatan *pakar *swasta sangat tinggi.'],
  [19.68, 22.53, 'Pembedahan mendadak dan rawatan'],
  [22.53, 25.89, 'intensif boleh menelan bil *puluhan *ribu *ringgit.'],
  [25.89, 30.68, '*Kedua, *takaful ataupun *insurans ada had dan syarat tersendiri.'],
  [30.68, 33.69, 'Tidak semua kos perubatan dilindungi penuh,'],
  [33.69, 36.95, 'ada jurang *tunai yang kita perlu bayar sendiri.'],
  [36.95, 40.74, '*Ketiga, *penyakit *kritikal datang tanpa *amaran.'],
  [40.74, 43.0, 'Ujian kesihatan tidak menunggu'],
  [43.0, 45.51, 'akaun bank kita penuh sebelum ia melanda.'],
  [45.51, 49.89, '*Keempat, terpaksa *korek *tabung *persaraan ataupun meminjam.'],
  [49.89, 52.8, 'Ramai keluarga terpaksa mengorbankan'],
  [52.8, 55.87, 'masa depan hari tua demi melangsaikan bil hospital.'],
  [55.87, 61.25, '*Dan *kelima, *emas adalah *aset *kecemasan paling pantas untuk dicairkan.'],
  [61.25, 63.5, 'Bila perlukan *tunai segera,'],
  [63.5, 65.83, 'kita boleh *jual balik emas dan *gadai emas.'],
  [65.83, 68.53, '*Emas mudah dijual, mudah digadai.'],
  [68.53, 71.1, '*Kesihatan tidak boleh ditawar-menawar.'],
  [71.1, 74.32, 'Sediakan *payung sebelum ribut kesihatan melanda.'],
  [74.32, 76.52, '*Lindungi keselamatan keluarga anda.'],
  [76.52, 78.4, 'Tuan puan yang dah ready nak mulakan *simpan *emas'],
  [78.4, 80.22, 'boleh rujuk *pin *video saya.'],
  [80.22, 81.92, '*Dulu *ragu, *kini *tahu, jom'],
  [81.92, 83.29, 'mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'SEBAB');
const SCENES = [
  Hh(0, 4.15, (lt) => { const out = clamp((lt - 3.65) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'BIL HOSPITAL', lines: ['5 SEBAB', 'KELUARGA MUFLIS'], sub: 'DALAM MASA SATU SAAT' }); X.restore(); }, 1, WC.ma),
  B(4.15, 9.76, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Nikmat Kesihatan', 96);
    row(lt, .8, 440, 'Paling', 'BERNILAI'); row(lt, 2.8, 590, 'Berubah dalam', 'SATU SAAT');
    stk(lt, .4, IMG.sNikmat, 540, SB, 620);
  }),
  B(9.76, 15.88, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Simpanan Lumpuh', 100);
    row(lt, .8, 440, 'Kemasukan hospital', 'LUMPUHKAN SIMPANAN'); row(lt, 3.5, 590, 'Dibina', 'BERTAHUN-TAHUN');
    stk(lt, .4, IMG.sKorek, 540, SB, 620);
  }),
  Hh(15.88, 19.68, CH(1, 'Kos Rawatan', 'Pakar Swasta', null), -1, WC.ma),
  B(19.68, 25.4, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Puluhan Ribu Ringgit', 90);
    row(lt, .8, 440, 'Pembedahan', 'MENDADAK'); row(lt, 1.8, 590, 'Rawatan', 'INTENSIF'); row(lt, 3.2, 740, 'Bil', 'PULUHAN RIBU RINGGIT');
    stk(lt, .4, IMG.sRawatan, 540, SB, 600);
  }),
  Hh(25.4, 30.68, CH(2, 'Takaful & Insurans', 'Ada Had', null), 1, WC.ma),
  B(30.68, 36.5, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Had & Syarat', 100);
    row(lt, .8, 440, 'Tidak semua kos', 'DILINDUNGI PENUH'); row(lt, 3.0, 590, 'Jurang tunai', 'BAYAR SENDIRI');
    stk(lt, .4, IMG.sInsurans, 540, SB, 620);
  }),
  Hh(36.5, 40.74, CH(3, 'Penyakit Kritikal', 'Tanpa Amaran', null), -1, WC.ma),
  B(40.74, 45.51, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Tanpa Amaran', 100);
    row(lt, .8, 440, 'Kesihatan', 'TIDAK MENUNGGU'); row(lt, 2.5, 590, 'Sebelum', 'IA MELANDA');
    stk(lt, .4, IMG.sKritikal, 540, SB, 620);
  }),
  Hh(45.51, 49.89, CH(4, 'Korek Tabung', 'Persaraan', null), 1, WC.ma),
  B(49.89, 55.4, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Masa Depan Hari Tua', 90);
    row(lt, .8, 440, 'Korbankan', 'HARI TUA'); row(lt, 3.0, 590, 'Langsai', 'BIL HOSPITAL');
    stk(lt, .4, IMG.sMasadepan, 540, SB, 620);
  }),
  Hh(55.4, 61.25, CH(5, 'Emas Aset', 'Kecemasan', null), -1, WC.ma),
  B(61.25, 68.53, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Tunai Segera', 100);
    row(lt, .8, 440, 'Tunai segera', 'JUAL BALIK EMAS'); row(lt, 2.3, 590, 'Atau', 'GADAI EMAS'); row(lt, 4.6, 740, 'Mudah', 'DIJUAL, DIGADAI');
    stk(lt, .4, IMG.sEmas, 540, SB, 600);
  }),
  B(68.53, 71.1, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Tak Boleh Ditawar', 96); stk(lt, .3, IMG.sNikmat, 540, SB, 680); }),
  B(71.1, 74.32, 'merak5', WC.ma, (lt) => { ttl(lt, 'Sediakan Payung', 100); stk(lt, .3, IMG.sPayung, 540, SB, 680); }),
  B(74.32, 76.52, 'ipad', WC.ma, (lt) => { ttl(lt, 'Lindungi Keluarga', 96); stk(lt, .3, IMG.sLindungi, 540, SB, 680); }),
  B(76.52, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sLindungi, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sRawatan, IMG.sInsurans, IMG.sKritikal, IMG.sKorek, IMG.sEmas, IMG.sNikmat, IMG.sPayung, IMG.sLindungi, IMG.sMasadepan])), { nobk: true }),
];
