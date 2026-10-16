// scenes.js — "5 Cara Kaki Shopping Simpan Duit Tanpa Derita" (95.13s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 95.133333, DUR = VOICE + 6, HEADN = 2854;
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
const ASSETS = { ...PH, sKaki: 'stk-kaki-shopping.png', sTukar: 'stk-tukar-barang-emas.png', sBeli: 'stk-beli-emas-dulu.png', sPuas: 'stk-puas-lihat-gram.png', sSantai: 'stk-mula-santai.png', sTabiat: 'stk-jadi-tabiat.png', sTakPerlu: 'stk-tak-perlu-berhenti.png', sUbah: 'stk-ubah-apa-yang-beli.png', sNafsu: 'stk-tukar-nafsu-kekayaan.png' };

const SEG = [
  [0, 4.57, '*5 *cara *kaki *shopping simpan duit tanpa *derita.'],
  [4.57, 7.25, '*Pantang tengok *promosi jualan murah.'],
  [7.25, 10.49, 'Jari terus gatal menekan butang nak beli.'],
  [10.49, 12.59, 'Bagi si kaki shopping,'],
  [12.59, 16.99, 'ada cara *bijak untuk *menabung tanpa rasa terseksa.'],
  [16.99, 21.2, '*Pertama, *tukar *barang *shopping kepada *emas.'],
  [21.2, 24.66, 'Anda masih dapat rasa *kepuasan membeli.'],
  [24.66, 29.61, 'Bezanya, emas adalah *aset yang nilainya sentiasa *bertambah.'],
  [29.61, 32.38, '*Kedua,'],
  [32.38, 35.79, '*peraturan *beli *emas *dulu baru berbelanja.'],
  [35.79, 41.72, 'Setiap kali dapat gaji, beli *emas *RM100 sebelum mula shopping barang lain.'],
  [41.72, 45.58, '*Ketiga, *kepuasan melihat *gram *emas meningkat.'],
  [45.58, 50.24, 'Rasa seronok melihat gram emas bertambah dalam akaun jauh lebih'],
  [50.24, 53.38, '*memuaskan daripada barang yang kita beli'],
  [53.38, 55.35, 'yang akan *susut nilainya.'],
  [55.35, 58.33, '*Keempat, mulakan secara *bersantai.'],
  [58.33, 61.31, 'Tidak perlu *berhenti shopping serta-merta.'],
  [61.31, 63.77, 'Mulakan dengan jumlah emas yang *kecil,'],
  [63.77, 66.36, 'langsung tidak *membebankan.'],
  [66.36, 68.05, '*Dan *kelima,'],
  [68.05, 73.68, '*tabiat membina masa depan. Lama-lama, tabiat mengumpul aset akan mengatasi'],
  [73.68, 75.29, '*nafsu berbelanja'],
  [75.29, 77.17, 'barang yang tidak perlu.'],
  [77.17, 80.34, 'Anda tak perlu buang *kegembiraan berbelanja,'],
  [80.34, 82.85, 'cuma *ubah apa yang anda *beli.'],
  [82.85, 85.1, 'Tukar *nafsu *shopping kepada'],
  [85.1, 86.92, '*mengumpul *kekayaan.'],
  [86.92, 88.66, 'Tuan puan yang dah ready'],
  [88.66, 90.47, 'kumpul *emas di *Public *Gold,'],
  [90.47, 93.22, 'boleh rujuk *pin *video. *Dulu *ragu, *kini *tahu.'],
  [93.22, 95.13, 'Jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'CARA');
const SCENES = [
  Hh(0, 4.57, (lt) => { const out = clamp((lt - 4.0) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'KAKI SHOPPING', lines: ['5 CARA', 'SIMPAN DUIT'], sub: 'TANPA DERITA, TANPA TERSEKSA' }); X.restore(); }, 1, WC.ma),
  B(4.57, 16.99, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Kaki Shopping', 100);
    row(lt, .8, 440, 'Pantang', 'PROMOSI JUALAN'); row(lt, 3.2, 590, 'Jari gatal', 'TEKAN BELI'); row(lt, 8.4, 740, 'Ada cara', 'BIJAK MENABUNG');
    stk(lt, .4, IMG.sKaki, 540, SB, 600);
  }),
  Hh(16.99, 21.2, CH(1, 'Tukar Barang', 'Shopping Kepada Emas', null), -1, WC.ma),
  B(21.2, 29.61, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Kepuasan Yang Sama', 90);
    row(lt, 1.0, 440, 'Masih dapat', 'KEPUASAN MEMBELI'); row(lt, 4.0, 590, 'Emas', 'ASET BERTAMBAH NILAI');
    stk(lt, .4, IMG.sTukar, 540, SB, 620);
  }),
  Hh(29.61, 35.79, CH(2, 'Beli Emas Dulu', 'Baru Berbelanja', null), 1, WC.ma),
  B(35.79, 41.72, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Peraturan Gaji', 100);
    row(lt, .8, 440, 'Dapat gaji', 'BELI EMAS RM100'); row(lt, 3.8, 590, 'Baru', 'SHOPPING LAIN');
    stk(lt, .4, IMG.sBeli, 540, SB, 620);
  }),
  Hh(41.72, 45.58, CH(3, 'Puas Lihat', 'Gram Emas Naik', null), -1, WC.ma),
  B(45.58, 55.35, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Gram Emas Bertambah', 90);
    row(lt, 1.0, 440, 'Seronok lihat', 'GRAM BERTAMBAH'); row(lt, 3.6, 590, 'Lebih puas', 'DARIPADA BARANG'); row(lt, 6.4, 740, 'Barang', 'SUSUT NILAI');
    stk(lt, .4, IMG.sPuas, 540, SB, 600);
  }),
  Hh(55.35, 58.33, CH(4, 'Mula Secara', 'Bersantai', null), 1, WC.ma),
  B(58.33, 66.36, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Tak Perlu Berhenti', 96);
    row(lt, .4, 440, 'Berhenti shopping', 'TAK PERLU'); row(lt, 3.2, 590, 'Mula dengan', 'EMAS KECIL'); row(lt, 5.4, 740, 'Langsung', 'TAK MEMBEBANKAN');
    if (lt < 2.97) stk(lt, .4, IMG.sTakPerlu, 540, SB, 600); else stk(lt, 3.0, IMG.sSantai, 540, SB, 600);
  }),
  Hh(66.36, 70.84, CH(5, 'Jadi Tabiat', 'Bina Masa Depan', null), -1, WC.ma),
  B(70.84, 77.17, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Tabiat Mengumpul', 96);
    row(lt, 1.0, 440, 'Tabiat', 'KUMPUL ASET'); row(lt, 3.4, 590, 'Atasi', 'NAFSU BERBELANJA');
    stk(lt, .4, IMG.sTabiat, 540, SB, 620);
  }),
  B(77.17, 82.85, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Ubah Apa Dibeli', 96); anim(lt, 1.2, 540, 560, () => mWhite(130, 440, 820, ['Bukan buang kegembiraan,', '*ubah apa yang dibeli'], 46)); stk(lt, .3, IMG.sUbah, 540, SB, 640); }),
  B(82.85, 86.92, 'merak5', WC.ma, (lt) => { ttl(lt, 'Nafsu Jadi Kekayaan', 88); stk(lt, .3, IMG.sNafsu, 540, SB, 680); }),
  B(86.92, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sUbah, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sKaki, IMG.sTukar, IMG.sBeli, IMG.sPuas, IMG.sSantai, IMG.sTabiat, IMG.sTakPerlu, IMG.sUbah, IMG.sNafsu])), { nobk: true }),
];
