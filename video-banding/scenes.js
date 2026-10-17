// scenes.js — "5 Sebab Jangan Banding Harta Dengan Orang Lain" (92.58s + outro 6s). Acid yellow #EFFF00 + sticker pop-up. Hard cut.
const VOICE = 92.577959, DUR = VOICE + 6, HEADN = 2777;
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
const ASSETS = { ...PH, sTengok: 'stk-tengok.png', sHutang: 'stk-hutang.png', sGaris: 'stk-garis.png', sBanding: 'stk-banding.png', sUkur: 'stk-ukur.png', sLangkah: 'stk-langkah.png', sKeluarga: 'stk-keluarga.png', sBenteng: 'stk-benteng.png', sMaju: 'stk-maju.png' };

const SEG = [
  [0, 4.51, '*5 *sebab *bandingkan *harta dengan orang lain itu *berbahaya'],
  [4.51, 8.62, 'Tengok rakan sebaya tukar *kereta baru dan beli *rumah besar?'],
  [8.62, 11.38, 'Hati mula rasa *rendah *diri dan cemas.'],
  [11.38, 13.06, 'Namun, *membandingkan'],
  [13.06, 14.66, '*perjalanan *kewangan anda'],
  [14.66, 16.78, 'dengan orang lain adalah satu *perangkap'],
  [16.78, 19.06, 'yang merosakkan *jiwa. *Pertama,'],
  [19.06, 23.47, 'anda tidak lihat timbunan *hutang disebalik *kemewahan mereka.'],
  [23.47, 25.41, 'Ramai yang kelihatan *bergaya'],
  [25.41, 29.4, 'sebenarnya menanggung beban *ansuran *bank yang menyesakkan.'],
  [29.4, 32.5, '*Kedua, setiap individu memulakan hidup'],
  [32.5, 35.57, 'daripada *garis *permulaan yang *berbeza.'],
  [35.57, 38.23, 'Ada yang bermula dengan *sokongan *keluarga,'],
  [38.23, 41.65, 'ada yang terpaksa bermula dari *kosong.'],
  [41.65, 44.4, '*Ketiga, perbandingan mencuri *fokus'],
  [44.4, 47.24, 'terhadap *kemajuan diri sendiri.'],
  [47.24, 50.5, 'Membuang masa memikirkan *pencapaian orang lain'],
  [50.5, 53.83, 'melalaikan diri kita membina *kubu sendiri.'],
  [53.83, 58.06, '*Dan *keempat, satu-satunya *kayu *ukur sebenar adalah'],
  [58.06, 59.94, '*diri anda *semalam.'],
  [59.94, 62.7, 'Pastikan kedudukan *kewangan lebih baik'],
  [62.7, 65.17, 'dan lebih kukuh daripada *tahun *lepas.'],
  [65.17, 68.63, '*Dan *kelima, *langkah *kecil yang *konsisten'],
  [68.63, 71.37, 'membina *kemenangan jangka masa panjang.'],
  [71.37, 73.39, 'Simpanan yang *istiqamah'],
  [73.39, 76.23, 'menewaskan *kemewahan *palsu pinjaman.'],
  [76.23, 80.01, '*Keluarga anda tidak bergantung kepada *kejayaan orang lain.'],
  [80.01, 82.7, 'Fokus membina *benteng anda sendiri.'],
  [82.7, 85.68, '*Maju mengikut *rentak kita sendiri.'],
  [85.68, 87.9, 'Tuan puan yang dah ready nak mulakan *simpan *emas,'],
  [87.9, 89.8, 'boleh rujuk *pin *video saya.'],
  [89.8, 92.58, '*Dulu *ragu, *kini *tahu. Jom *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'SEBAB');
const SCENES = [
  Hh(0, 4.51, (lt) => { const out = clamp((lt - 4.0) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'BERBAHAYA', lines: ['5 SEBAB', 'JANGAN BANDING'], sub: 'HARTA DENGAN ORANG LAIN' }); X.restore(); }, 1, WC.ma),
  B(4.51, 11.38, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Tengok Orang Lain', 96);
    row(lt, .8, 440, 'Rakan beli', 'KERETA BARU'); row(lt, 2.5, 590, 'Beli', 'RUMAH BESAR'); row(lt, 4.1, 740, 'Hati rasa', 'RENDAH DIRI');
    stk(lt, .4, IMG.sTengok, 540, SB, 600);
  }),
  B(11.38, 18.7, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Satu Perangkap', 100);
    row(lt, .8, 440, 'Bandingkan', 'PERJALANAN KEWANGAN'); row(lt, 3.3, 590, 'Dengan orang lain', 'SATU PERANGKAP'); row(lt, 5.4, 740, 'Merosakkan', 'JIWA');
    stk(lt, .4, IMG.sBanding, 540, SB, 600);
  }),
  Hh(18.7, 23.47, CH(1, 'Hutang Disebalik', 'Kemewahan', null), -1, WC.ma),
  B(23.47, 29.4, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Nampak Bergaya', 96);
    row(lt, .8, 440, 'Kelihatan', 'BERGAYA'); row(lt, 2.2, 590, 'Beban', 'ANSURAN BANK');
    stk(lt, .4, IMG.sHutang, 540, SB, 620);
  }),
  Hh(29.4, 35.57, CH(2, 'Garis Permulaan', 'Berbeza', null), 1, WC.ma),
  B(35.57, 41.65, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Garis Permulaan', 96);
    row(lt, .8, 440, 'Ada bermula', 'SOKONGAN KELUARGA'); row(lt, 3.2, 590, 'Ada bermula', 'DARI KOSONG');
    stk(lt, .4, IMG.sGaris, 540, SB, 620);
  }),
  Hh(41.65, 47.24, CH(3, 'Perbandingan Curi', 'Fokus Diri', null), -1, WC.ma),
  B(47.24, 53.83, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Fokus Diri Sendiri', 92);
    row(lt, .8, 440, 'Buang masa', 'LIHAT ORANG LAIN'); row(lt, 3.5, 590, 'Bina', 'KUBU SENDIRI');
    stk(lt, .4, IMG.sBanding, 540, SB, 620);
  }),
  Hh(53.83, 58.06, CH(4, 'Kayu Ukur', 'Sebenar', null), 1, WC.ma),
  B(58.06, 65.17, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Kayu Ukur Sebenar', 92);
    row(lt, .8, 440, 'Diri anda', 'SEMALAM'); row(lt, 1.9, 590, 'Kedudukan kewangan', 'LEBIH BAIK'); row(lt, 4.5, 740, 'Lebih kukuh dari', 'TAHUN LEPAS');
    stk(lt, .4, IMG.sUkur, 540, SB, 600);
  }),
  Hh(65.17, 68.63, CH(5, 'Langkah Kecil', 'Konsisten', null), -1, WC.ma),
  B(68.63, 76.23, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Langkah Kecil', 100);
    row(lt, .8, 440, 'Membina', 'JANGKA PANJANG'); row(lt, 2.7, 590, 'Simpanan', 'ISTIQAMAH'); row(lt, 4.8, 740, 'Tewaskan', 'KEMEWAHAN PALSU');
    stk(lt, .4, IMG.sLangkah, 540, SB, 600);
  }),
  B(76.23, 80.01, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Keluarga Anda', 100);
    anim(lt, 1.3, 540, 560, () => mWhite(130, 440, 820, ['Tidak bergantung', '*pada kejayaan orang lain'], 50));
    stk(lt, .3, IMG.sKeluarga, 540, SB, 620);
  }),
  B(80.01, 82.7, 'merak5', WC.ma, (lt) => { ttl(lt, 'Benteng Sendiri', 100); stk(lt, .3, IMG.sBenteng, 540, SB, 680); }),
  B(82.7, 85.68, 'ipad', WC.ma, (lt) => { ttl(lt, 'Maju Ikut Rentak', 96); stk(lt, .3, IMG.sMaju, 540, SB, 680); }),
  B(85.68, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sMaju, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sTengok, IMG.sHutang, IMG.sGaris, IMG.sBanding, IMG.sUkur, IMG.sLangkah, IMG.sKeluarga, IMG.sBenteng, IMG.sMaju])), { nobk: true }),
];
