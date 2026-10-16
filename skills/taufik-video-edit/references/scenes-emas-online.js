// scenes.js — "5 Bukti Beli Emas Online Sebenarnya Selamat" (89.21s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 89.210998, DUR = VOICE + 6, HEADN = 2676;
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
const ASSETS = { ...PH, sSelamat: 'stk-selamat-ke.png', sSebenar: 'stk-emas-sebenar.png', sSampai: 'stk-sampai-rumah.png', sSemak: 'stk-semak-bila-bila.png', sBoleh: 'stk-boleh-ambil-sendiri.png', sLindung: 'stk-emas-dilindungi.png', sJudi: 'stk-bukan-judi.png', sMudah: 'stk-mudah-pantas.png', sHujung: 'stk-di-hujung-jari.png' };

const SEG = [
  [0, 3.33, '*5 *bukti beli *emas *online sebenarnya *selamat'],
  [3.33, 5.63, 'Beli emas dalam telefon ni *selamat ke?'],
  [5.63, 8.93, 'Kita bayar duit tapi emas fizikalnya kita *tak *nampak.'],
  [8.93, 10.93, 'Rasa *sangsi itu perkara biasa.'],
  [10.93, 16.06, 'Namun fahami bagaimana *teknologi *moden menjamin *keselamatan simpanan anda.'],
  [16.06, 21.6, '*Pertama, setiap *gram *digital disandarkan kepada *emas *fizikal tulen.'],
  [21.6, 27.28, 'Wang anda tidak bertukar jadi *nombor *maya semata-mata, tapi membeli emas fizikal sebenar.'],
  [27.28, 31.56, '*Kedua, emas fizikal *Public *Gold boleh *dipos terus ke *pintu *rumah'],
  [31.56, 33.86, 'bila berat emas sudah mencukupi.'],
  [33.86, 38.58, 'Anda boleh *request untuk tukar gram kepada emas fizikal.'],
  [38.58, 42.86, '*Dan *ketiga, transaksi direkodkan secara *telus dalam aplikasi.'],
  [42.86, 44.79, 'Kita boleh semak *baki *gram,'],
  [44.79, 48.01, '*sejarah belian dan juga *harga *emas'],
  [48.01, 50.49, 'pada bila-bila masa. *Dan *keempat,'],
  [50.49, 54.54, '*cawangan *fizikal *Public *Gold sedia dikunjungi di seluruh negara.'],
  [54.54, 57.42, 'Jika emas dah melebihi *5 *dinar,'],
  [57.42, 60.07, 'boleh *ambil *sendiri emas di'],
  [60.07, 62.57, 'cawangan Public Gold. *Dan *kelima,'],
  [62.57, 65.41, '*kemudahan *teknologi tidak mengubah *nilai *emas.'],
  [65.41, 71.3, 'Ia membawa *kepantasan urusan moden tanpa mengorbankan nilai aset fizikal.'],
  [71.3, 74.79, 'Beli emas online sebenarnya lebih *mudah dan juga *selamat.'],
  [74.79, 77.55, 'Ia kemudahan yang *menjimatkan masa anda.'],
  [77.55, 79.82, 'Uruskan *aset *fizikal di *hujung *jari.'],
  [79.82, 82.29, 'Tuan puan yang dah ready nak mulakan *simpan *emas'],
  [82.29, 85.4, 'boleh mulakan di *Akaun *Emas *GAP *Public *Gold.'],
  [85.4, 89.21, '*Dulu *ragu, *kini *tahu. Jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'BUKTI');
const SCENES = [
  Hh(0, 3.33, (lt) => { const out = clamp((lt - 2.8) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'BELI EMAS ONLINE', lines: ['5 BUKTI', 'SELAMAT'], sub: 'EMAS ONLINE SEBENARNYA SELAMAT' }); X.restore(); }, 1, WC.ma),
  B(3.33, 10.93, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Selamat Ke?', 100);
    row(lt, .8, 440, 'Beli emas', 'DALAM TELEFON'); row(lt, 2.4, 590, 'Bayar duit', 'EMAS TAK NAMPAK'); row(lt, 5.6, 740, 'Rasa sangsi', 'PERKARA BIASA');
    stk(lt, .4, IMG.sSelamat, 540, SB, 600);
  }),
  B(10.93, 16.06, 'kg', WC.ma, (lt) => { ttl(lt, 'Teknologi Moden', 100); anim(lt, .5, 540, 560, () => mWhite(130, 440, 820, ['Teknologi moden', '*jamin keselamatan simpanan'], 48)); stk(lt, .3, IMG.sLindung, 540, SB, 620); }),
  Hh(16.06, 19.6, CH(1, 'Setiap Gram', 'Disandar Emas Fizikal', null), -1, WC.ma),
  B(19.6, 27.28, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Emas Fizikal Tulen', 96);
    row(lt, .8, 440, 'Setiap gram digital', 'DISANDAR EMAS'); row(lt, 2.4, 590, 'Bukan', 'NOMBOR MAYA'); row(lt, 5.4, 740, 'Beli', 'EMAS SEBENAR');
    if (lt < 4.0) stk(lt, .4, IMG.sJudi, 540, SB, 600); else stk(lt, 4.0, IMG.sSebenar, 540, SB, 600);
  }),
  Hh(27.28, 30.8, CH(2, 'Dipos Ke', 'Pintu Rumah', null), 1, WC.ma),
  B(30.8, 38.58, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Sampai Rumah', 100);
    row(lt, .8, 440, 'Emas fizikal', 'DIPOS KE RUMAH'); row(lt, 2.8, 590, 'Bila berat', 'MENCUKUPI'); row(lt, 5.2, 740, 'Tukar gram', 'KE EMAS FIZIKAL');
    stk(lt, .4, IMG.sSampai, 540, SB, 600);
  }),
  Hh(38.58, 42.0, CH(3, 'Transaksi Telus', 'Dalam Aplikasi', null), -1, WC.ma),
  B(42.0, 50.49, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Semak Bila-Bila', 100);
    row(lt, .9, 440, 'Semak', 'BAKI GRAM'); row(lt, 2.9, 590, 'Sejarah', 'BELIAN'); row(lt, 5.0, 740, 'Harga emas', 'BILA-BILA MASA');
    stk(lt, .4, IMG.sSemak, 540, SB, 600);
  }),
  Hh(50.49, 54.0, CH(4, 'Cawangan Fizikal', 'Seluruh Negara', null), 1, WC.ma),
  B(54.0, 62.57, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Ambil Sendiri', 100);
    row(lt, 1.0, 440, 'Lebih 5 dinar', 'BOLEH AMBIL'); row(lt, 3.4, 590, 'Di cawangan', 'PUBLIC GOLD');
    stk(lt, .4, IMG.sBoleh, 540, SB, 620);
  }),
  Hh(62.57, 66.0, CH(5, 'Teknologi Tak', 'Ubah Nilai Emas', null), -1, WC.ma),
  B(66.0, 74.79, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Pantas & Selamat', 96);
    row(lt, 1.0, 440, 'Urusan moden', 'LEBIH PANTAS'); row(lt, 3.8, 590, 'Nilai aset', 'KEKAL FIZIKAL'); row(lt, 5.5, 740, 'Beli online', 'MUDAH & SELAMAT');
    stk(lt, .4, IMG.sMudah, 540, SB, 600);
  }),
  B(74.79, 79.82, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Di Hujung Jari', 100); anim(lt, 2.8, 540, 560, () => mWhite(130, 440, 820, ['Uruskan aset fizikal,', '*di hujung jari'], 50)); stk(lt, .3, IMG.sHujung, 540, SB, 620); }),
  B(79.82, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sSebenar, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sSelamat, IMG.sSebenar, IMG.sSampai, IMG.sSemak, IMG.sBoleh, IMG.sLindung, IMG.sJudi, IMG.sMudah, IMG.sHujung])), { nobk: true }),
];
