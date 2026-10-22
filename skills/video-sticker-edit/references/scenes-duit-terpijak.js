// scenes.js — "5 Kesilapan Bila Tiba-tiba Dapat Duit Terpijak" (88.1s).
// SATU design konsisten (maroon-emas: latar foto emas kabur + pil/kad maroon) + sticker kartun pop-up elastik. Hard cut (tiada transisi). SFX pop lembut.
const DUR = 88.142993, HEADN = 2644;
const ASSETS = {
  wallet: 'dompet-wealthcard-safari.jpg', tiers: 'set-jongkong-bertingkat-bungamas.jpg', kg: 'jongkong-1kg-tapak-tangan.jpg', ipad: 'kad-dinar-dan-app-gap-ipad.jpg', shop: 'kad-taifook-depan-kedai-public-gold.jpg',
  bungamas: 'jongkong-100g-kad-bungamas-ungu.jpg', merak5: 'kad-ungu-merak-5g.jpg', g250: 'jongkong-250g-merah.jpg', dulang: 'dulang-merah-1kg-koleksi-penuh.jpg', merak100: 'jongkong-merak-100g-dulang-merah.jpg',
  bunga50: 'kad-50g-bunga-raya.jpg', syiling: 'kad-hijau-syiling-pantai.jpg', dinarPantai: 'kad-dinar-hijau-dua-pantai.jpg', binder: 'koleksi-binder-kad.jpg',
  sHook: 'stk-hook.png', sBelanja: 'stk-belanja-emosi.png', sSkim: 'stk-skim-cepat-kaya.png', sTunai: 'stk-duit-tunai-terbiar.png', sLebur: 'stk-pelaburan-lebur.png',
  sLupa: 'stk-lupa-masa-depan.png', sBijak: 'stk-urus-bijak.png', sAset: 'stk-tukar-aset.png', sKunci: 'stk-kunci-kebebasan.png',
};
const SEG = [
  [0, 4.46, '*5 *Kesilapan bila tiba-tiba dapat duit *terpijak'],
  [4.46, 9.59, 'Dapat *bonus besar, *pampasan, duit peninggalan ataupun rezeki terpijak?'],
  [9.59, 12.21, 'Tiba-tiba akaun bank *penuh dengan duit.'],
  [12.21, 16.05, 'Tapi statistik *membuktikan kebanyakan orang habiskan'],
  [16.05, 18.25, 'duit tersebut dalam masa *singkat.'],
  [18.25, 21.41, '*Pertama, *belanja ikut *emosi.'],
  [21.41, 23.19, 'Terus tukar *kereta baru,'],
  [23.19, 25.86, 'bercuti *mewah dan beli *gadget mahal'],
  [25.86, 28.61, 'sebelum sempat merancang dengan bijak.'],
  [28.61, 30.76, '*Kedua, pegang duit'],
  [30.76, 32.53, 'tanpa *ilmu *kewangan.'],
  [32.53, 37.5, 'Masa inilah anda jadi sasaran *skim *cepat *kaya ataupun terjebak'],
  [37.5, 39.32, 'pelaburan yang *mengarut.'],
  [39.32, 43.24, '*Ketiga, biar duit *tunai terbiar dalam akaun.'],
  [43.24, 49.54, 'Tunai mudah dibelanjakan dan nilainya dimakan *inflasi jika tidak ditukarkan kepada aset fizikal.'],
  [49.54, 51.86, '*Keempat,'],
  [51.86, 55.25, '*Gopoh melabur tanpa faham *risiko,'],
  [55.25, 58.06, 'terburu-buru mengejar untuk menggandakan duit'],
  [58.06, 61.34, 'akhirnya buatkan modal *lebur *sekelip mata.'],
  [61.34, 65.1, 'Dan *kelima, *lupa asingkan untuk *masa *depan.'],
  [65.1, 69.47, 'Anggap duit tersebut semuanya boleh dibelanjakan tanpa memikirkan'],
  [69.47, 73.85, '*simpanan *kecemasan. Duit terpijak adalah *peluang seumur hidup.'],
  [73.85, 76.88, '*Urus dengan *bijak, ia ubah *masa *depan anda.'],
  [76.88, 79.12, 'Tukarkan kepada *aset *fizikal'],
  [79.12, 83.03, 'seperti *emas. Tuan puan yang dah ready nak mulakan *simpan *emas,'],
  [83.03, 86.16, 'boleh rujuk *video saya. *Dulu *ragu, *kini *tahu.'],
  [86.16, 88.14, 'Jom mulakan *simpan *emas.'],
];

// --- komponen reka bentuk maroon (konsisten di semua B-roll) ---
const ttl = (lt, label, size = 96) => { anim(lt, .05, 540, 270, () => mPill([label], 540, 270, size)); anim(lt, .05, 540, 270, () => MA.side(300)); };
const row = (lt, at, y, l, r) => anim(lt, at, 540, y + 55, () => mRow(60, y, 960, l, r));
const SCENES = [
  // 1 hook
  Hh(0, 4.46, (lt) => {
    const out = clamp((lt - 3.9) / .3); X.save(); X.globalAlpha = 1 - out;
    hookTitle(lt, { tag: 'WAJIB ELAK', lines: ['5 KESILAPAN', 'DUIT TERPIJAK'], sub: 'BILA TIBA-TIBA DAPAT DUIT' });
    X.restore();
  }, 1, WC.ma),
  // 2 tiba-tiba dapat duit
  B(4.46, 12.21, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Tiba-tiba Dapat Duit?', 88);
    anim(lt, .35, 300, 430, () => MA.chip('Bonus besar', 300, 450, 46));
    anim(lt, 1.4, 780, 430, () => MA.chip('Pampasan', 780, 450, 46));
    anim(lt, 2.6, 310, 560, () => MA.chip('Duit peninggalan', 310, 580, 46));
    anim(lt, 3.9, 780, 560, () => MA.chip('Rezeki terpijak', 780, 580, 46));
    anim(lt, 5.2, 540, 730, () => mWhite(130, 680, 820, ['Akaun bank', '*PENUH dengan duit!'], 50));
    stk(lt, .8, IMG.sHook, 540, mamiY - 45, 640);
  }, [.05, .35, 1.4, 2.6, 3.9, 5.2, .8]),
  // 3 statistik: habis dalam masa singkat
  B(12.21, 18.25, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Statistik Membuktikan', 84);
    anim(lt, .4, 540, 660, () => MA.tierCard(190, 430, 700, 430, 'KEBANYAKAN', 'HABISKAN', 'duit dalam masa singkat'));
    [0, 1, 2, 3, 4].forEach(i => { const t0 = 2.9 + i * .4, a = 1 - clamp((lt - t0) / .35); anim(lt, 1.0 + i * .15, 200 + i * 170, 1000, () => { X.globalAlpha *= a; const y = 1060 - clamp((lt - t0) / .35) * 70; MA.badge(200 + i * 170, y, 62, () => { MA.txt('RM', 0, 14, MA.F.hh(40), MA.K.gold, 'center'); }); }); });
    anim(lt, 4.2, 540, 1250, () => mWhite(160, 1170, 760, ['Lesap dalam', '*masa singkat!'], 48));
  }, [.05, .4, 1.0, 4.2]),
  // 4 ch1
  Hh(18.25, 21.41, (lt) => MA.chapter(lt, 1, 'Belanja Ikut Emosi', null, null, 'KESILAPAN'), -1, WC.ma),
  // 5 kereta, cuti, gadget
  B(21.41, 28.61, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Belanja Ikut Emosi', 92);
    row(lt, .2, 440, 'Terus tukar', 'KERETA BARU');
    row(lt, 1.8, 590, 'Bercuti', 'MEWAH');
    row(lt, 3.4, 740, 'Beli', 'GADGET MAHAL');
    stk(lt, 4.4, IMG.sBelanja, 540, mamiY - 45, 640);
  }, [.05, .2, 1.8, 3.4, 4.4]),
  // 6 ch2
  Hh(28.61, 32.53, (lt) => MA.chapter(lt, 2, 'Pegang Duit', 'Tanpa Ilmu Kewangan', null, 'KESILAPAN'), 1, WC.ma),
  // 7 skim cepat kaya
  B(32.53, 39.32, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Sasaran Penipu', 96);
    row(lt, .3, 440, 'Sasaran', 'SKIM CEPAT KAYA');
    row(lt, 3.2, 590, 'Atau', 'TERJEBAK');
    row(lt, 4.8, 740, 'Pelaburan', 'MENGARUT');
    stk(lt, 1.2, IMG.sSkim, 540, mamiY - 45, 640);
  }, [.05, .3, 3.2, 4.8, 1.2]),
  // 8 ch3
  Hh(39.32, 43.24, (lt) => MA.chapter(lt, 3, 'Duit Tunai Terbiar', null, 'dalam akaun', 'KESILAPAN'), -1, WC.ma),
  // 9 inflasi
  B(43.24, 49.54, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Dimakan Inflasi', 100);
    anim(lt, .4, 290, 650, () => MA.tierCard(50, 430, 480, 420, 'TUNAI', 'MUDAH', 'dibelanjakan'));
    anim(lt, 2.6, 790, 650, () => MA.tierCard(550, 430, 480, 420, 'NILAI', 'SUSUT', 'dimakan inflasi'));
    stk(lt, 4.0, IMG.sTunai, 540, mamiY - 45, 640);
  }, [.05, .4, 2.6, 4.0]),
  // 10 ch4
  Hh(49.54, 55.25, (lt) => MA.chapter(lt, 4, 'Gopoh Melabur', 'Tanpa Faham Risiko', null, 'KESILAPAN'), 1, WC.ma),
  // 11 modal lebur
  B(55.25, 61.34, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Gandakan Duit?', 100);
    row(lt, .2, 440, 'Terburu-buru', 'MENGEJAR UNTUNG');
    row(lt, 3.3, 590, 'Akhirnya', 'MODAL LEBUR');
    row(lt, 4.5, 740, 'Dalam', 'SEKELIP MATA');
    stk(lt, 1.2, IMG.sLebur, 540, mamiY - 45, 640);
  }, [.05, .2, 3.3, 4.5, 1.2]),
  // 12 ch5
  Hh(61.34, 65.1, (lt) => MA.chapter(lt, 5, 'Lupa Asingkan', 'Untuk Masa Depan', null, 'KESILAPAN'), -1, WC.ma),
  // 13 tak fikir simpanan, peluang seumur hidup
  B(65.1, 73.85, 'wallet', WC.ma, (lt) => {
    ttl(lt, 'Duit Terpijak', 100);
    row(lt, .4, 440, 'Anggap', 'BOLEH BELANJA');
    row(lt, 2.4, 590, 'Tanpa fikir', 'SIMPANAN KECEMASAN');
    row(lt, 5.4, 740, 'Duit terpijak', 'PELUANG SEUMUR HIDUP');
    stk(lt, 3.4, IMG.sLupa, 540, mamiY - 45, 620);
  }, [.05, .4, 2.4, 5.4, 3.4]),
  // 14 urus dengan bijak
  B(73.85, 76.88, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Urus Dengan Bijak', 96);
    anim(lt, .3, 540, 560, () => mWhite(150, 440, 780, ['Ia ubah', '*masa depan anda.'], 52));
    stk(lt, .35, IMG.sBijak, 540, mamiY - 45, 720);
  }, [.05, .3, .35]),
  // 15 tukar kepada aset fizikal / emas
  B(76.88, 83.03, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Tukar Kepada Aset', 92);
    anim(lt, .5, 290, 650, () => MA.tierCard(50, 430, 480, 430, 'ASET', 'FIZIKAL', 'seperti emas'));
    anim(lt, 2.4, 790, 650, () => MA.photoCard(IMG.bungamas, 800, 650, 380, 400, .04, .5, .5));
    stk(lt, 3.6, IMG.sAset, 540, mamiY - 45, 640);
  }, [.05, .5, 2.4, 3.6]),
  // 16 CTA
  B(83.03, 86.16, 'shop', WC.ma, (lt) => {
    anim(lt, .05, 540, 250, () => mHead('Dah Ready Nak Mula?', 540, 260, 84));
    anim(lt, .3, 540, 430, () => mPill(['Mula Simpan Emas', 'Hari Ini'], 540, 380, 100)); anim(lt, .3, 540, 430, () => MA.side(450));
    anim(lt, .9, 540, 760, () => mHead('Dulu Ragu, Kini Tahu!', 540, 770, 80, MA.K.gold));
    anim(lt, 1.2, 540, 900, () => { shadow(() => { rr(180, 850, 720, 120, 60); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Rujuk Pin Video', 540, 930, MA.F.h(54), '#fff', 'center'); });
    stk(lt, .6, IMG.sKunci, 540, mamiY - 45, 640);
  }, [.05, .3, .9, 1.2, .6]),
  // 17 penutup
  Hh(86.16, 88.14, (lt) => { anim(lt, .1, 540, 380, () => mPill(['Jom Mulakan', 'Simpan Emas!'], 540, 330, 96)); anim(lt, .1, 540, 380, () => MA.side(400)); }, -1, WC.ma),
];

function bakeAll() {
  ['tiers', 'kg', 'dinarPantai', 'merak100', 'bunga50', 'dulang', 'wallet', 'syiling', 'g250', 'shop'].forEach(k => { BGS[k] = MA.bgPhoto(k, 16, .45); });
}
