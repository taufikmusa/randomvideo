// scenes.js — "5 Cara Selamatkan Duit Raya Anak" (84.20s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 84.195556, DUR = VOICE + 6, HEADN = 2525;
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
const ASSETS = { ...PH, sDuitraya: 'stk-duitraya.png', sSimpan: 'stk-simpan.png', sJunior: 'stk-junior.png', sRekod: 'stk-rekod.png', sBeza: 'stk-beza.png', sTradisi: 'stk-tradisi.png', sMainan: 'stk-mainan.png', sMembesar: 'stk-membesar.png', sBenih: 'stk-benih.png' };

const SEG = [
  [0, 1.72, '*5 *cara selamatkan'],
  [1.72, 3.53, '*duit *raya anak daripada *lesap.'],
  [3.53, 7.97, 'Balik kampung sambut Hari Raya, anak-anak seronok kutip *sampul *duit'],
  [7.97, 10.88, 'penuh kocek. Tapi bila cuti tamat,'],
  [10.88, 14.5, 'duit itu *lesap dibelanjakan untuk barang *mainan yang rosak.'],
  [14.5, 19.68, '*Pertama, *asingkan *tabung *simpanan sebelum nak mula berbelanja.'],
  [19.68, 21.37, 'Terapkan peraturan mudah.'],
  [21.37, 23.38, '*Simpan *dahulu sebahagian,'],
  [23.38, 25.25, 'baru *belanja bakinya.'],
  [25.25, 28.85, '*Kedua, *tukar duit raya jadi *emas *fizikal.'],
  [28.85, 31.17, 'Buka *akaun *emas *junior untuk anak'],
  [31.17, 34.59, 'supaya duit kertas menjadi *gram *emas.'],
  [34.59, 37.89, '*Ketiga, tunjukkan *rekod *gram *emas kepada anak.'],
  [37.89, 40.31, 'Bila mereka nampak gram emas *bertambah,'],
  [40.31, 43.69, 'setiap musim raya, minat mereka *menabung akan *subur.'],
  [43.69, 45.99, '*Keempat, didik anak'],
  [45.99, 48.98, 'beza antara *keperluan dan *kehendak.'],
  [48.98, 52.32, 'Bimbing mereka berfikir sebelum membeli *mainan'],
  [52.32, 55.65, 'yang hanya memberikan keseronokan beberapa hari.'],
  [55.65, 59.37, '*Dan *kelima, jadikan *tradisi *kewangan keluarga'],
  [59.37, 62.65, 'setiap tahun mengumpul *emas setiap kali Hari Raya.'],
  [62.65, 64.8, 'Melatih mereka menghargai'],
  [64.8, 67.13, '*aset bernilai sejak kecil.'],
  [67.13, 69.97, '*Mainan *plastik akan patah dan dibuang,'],
  [69.97, 73.62, 'tapi *simpanan *emas *membesar bersama diri mereka.'],
  [73.62, 76.71, 'Tanam *benih *kekayaan anak bermula *sekarang!'],
  [76.71, 79.3, 'Ibu ayah yang nak mulakan *simpan *emas?'],
  [79.3, 81.5, 'Boleh rujuk *pin *video saya.'],
  [81.5, 82.9, '*Dulu *ragu, *kini *tahu,'],
  [82.9, 84.2, 'jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'CARA');
const SCENES = [
  Hh(0, 3.53, (lt) => { const out = clamp((lt - 3.0) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'HARI RAYA', lines: ['5 CARA', 'DUIT RAYA ANAK'], sub: 'SELAMATKAN DARIPADA LESAP' }); X.restore(); }, 1, WC.ma),
  B(3.53, 10.88, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Duit Raya Anak', 100);
    row(lt, .8, 440, 'Balik kampung', 'SAMBUT RAYA'); row(lt, 3.3, 590, 'Kutip sampul', 'PENUH KOCEK');
    stk(lt, .4, IMG.sDuitraya, 540, SB, 620);
  }),
  B(10.88, 14.5, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Duit Lesap', 100);
    row(lt, .8, 440, 'Cuti tamat', 'DUIT LESAP'); row(lt, 2.0, 590, 'Beli mainan', 'YANG ROSAK');
    stk(lt, .4, IMG.sMainan, 540, SB, 620);
  }),
  Hh(14.5, 19.68, CH(1, 'Asingkan Tabung', 'Simpanan', null), -1, WC.ma),
  B(19.68, 24.9, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Simpan Dahulu', 100);
    row(lt, .8, 440, 'Simpan dahulu', 'SEBAHAGIAN'); row(lt, 3.0, 590, 'Baru belanja', 'BAKINYA');
    stk(lt, .4, IMG.sSimpan, 540, SB, 620);
  }),
  Hh(24.9, 28.85, CH(2, 'Tukar Duit Raya', 'Jadi Emas', null), 1, WC.ma),
  B(28.85, 34.59, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Akaun Emas Junior', 92);
    row(lt, .8, 440, 'Buka akaun', 'EMAS JUNIOR'); row(lt, 3.0, 590, 'Duit kertas', 'JADI GRAM EMAS');
    stk(lt, .4, IMG.sJunior, 540, SB, 620);
  }),
  Hh(34.59, 37.89, CH(3, 'Tunjuk Rekod', 'Gram Emas', null), -1, WC.ma),
  B(37.89, 43.69, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Gram Bertambah', 100);
    row(lt, .8, 440, 'Gram emas', 'BERTAMBAH'); row(lt, 3.0, 590, 'Minat menabung', 'AKAN SUBUR');
    stk(lt, .4, IMG.sRekod, 540, SB, 620);
  }),
  Hh(43.69, 48.98, CH(4, 'Beza Keperluan', 'Dan Kehendak', null), 1, WC.ma),
  B(48.98, 55.65, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Keperluan vs Kehendak', 84);
    row(lt, .8, 440, 'Berfikir sebelum', 'BELI MAINAN'); row(lt, 3.0, 590, 'Keseronokan', 'BEBERAPA HARI');
    stk(lt, .4, IMG.sBeza, 540, SB, 620);
  }),
  Hh(55.65, 59.37, CH(5, 'Tradisi', 'Kewangan Keluarga', null), -1, WC.ma),
  B(59.37, 67.13, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Tradisi Setiap Raya', 90);
    row(lt, .8, 440, 'Kumpul emas', 'SETIAP RAYA'); row(lt, 3.3, 590, 'Hargai aset', 'BERNILAI');
    stk(lt, .4, IMG.sTradisi, 540, SB, 620);
  }),
  B(67.13, 69.97, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Mainan Plastik', 100); stk(lt, .3, IMG.sMainan, 540, SB, 680); }),
  B(69.97, 73.62, 'merak5', WC.ma, (lt) => { ttl(lt, 'Emas Membesar', 100); stk(lt, .3, IMG.sMembesar, 540, SB, 680); }),
  B(73.62, 76.71, 'ipad', WC.ma, (lt) => { ttl(lt, 'Tanam Benih Kekayaan', 84); stk(lt, .3, IMG.sBenih, 540, SB, 680); }),
  B(76.71, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sBenih, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sDuitraya, IMG.sSimpan, IMG.sJunior, IMG.sRekod, IMG.sBeza, IMG.sTradisi, IMG.sMainan, IMG.sMembesar, IMG.sBenih])), { nobk: true }),
];
