// scenes.js — "Sebab 5: Tekanan Sosial Rosakkan Poket Orang Muda" (93.41s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 93.413878, DUR = VOICE + 6, HEADN = 2802;
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
const ASSETS = { ...PH, sSosial: 'stk-sosial.png', sFomo: 'stk-fomo.png', sBelanja: 'stk-belanja.png', sIlusi: 'stk-ilusi.png', sSenyap: 'stk-senyap.png', sLesap: 'stk-lesap.png', sRm100: 'stk-rm100.png', sEgo: 'stk-ego.png', sBina: 'stk-bina.png' };

const SEG = [
  [0, 3.91, '*Sebab *5: *tekanan *sosial yang merosakkan *poket orang muda'],
  [3.91, 8.65, 'Buka *media *sosial penuh dengan gambar kawan beli *kereta *mewah,'],
  [8.65, 10.25, 'bercuti ke *Eropah,'],
  [10.25, 12.57, 'dan lepak *kafe *hipster.'],
  [12.57, 16.14, 'Tekanan rasa takut *ketinggalan atau *FOMO'],
  [16.14, 20.22, 'adalah punca utama *simpanan orang muda kekal *kosong.'],
  [20.22, 22.9, '*Pertama, berbelanja semata-mata'],
  [22.9, 25.45, 'demi membina *persepsi orang lain.'],
  [25.45, 27.89, 'Anda menghabiskan *duit penat lelah'],
  [27.89, 31.23, 'yang anda dapat untuk memuaskan *pandangan'],
  [31.23, 33.14, 'mata orang yang tak *peduli pun.'],
  [33.14, 35.5, '*Kedua, *ilusi kemewahan'],
  [35.5, 38.21, 'yang dibina atas timbunan *hutang.'],
  [38.21, 41.24, 'Ramai yang nampak bergaya di *media *sosial'],
  [41.24, 45.97, 'tapi bergelut membayar *ansuran, *kad *kredit dan juga *hutang.'],
  [45.97, 49.62, '*Ketiga, kekayaan sejati dibina secara *senyap'],
  [49.62, 51.63, 'tanpa *pameran.'],
  [51.63, 54.8, 'Jutawan sebenar menumpukan wang mereka ke dalam *aset'],
  [54.8, 57.97, 'yang tidak kelihatan di *media *sosial.'],
  [57.97, 60.3, '*Keempat, setiap ringgit yang dibelanjakan untuk *imej,'],
  [60.3, 62.68, '*lesap *selamanya.'],
  [62.68, 65.0, 'Duit yang hangus untuk menunjuk-nunjuk'],
  [65.0, 67.36, 'merampas *kebebasan masa depan.'],
  [67.36, 70.31, '*Kelima, abaikan *pandangan orang'],
  [70.31, 72.56, 'dan fokus pada *matlamat sendiri.'],
  [72.56, 75.71, 'Konsisten menabung membina *kebebasan'],
  [75.71, 77.6, '*kewangan sebenar.'],
  [77.6, 80.68, 'Jangan biarkan *ego orang lain menguruskan *dompet kita.'],
  [80.68, 83.9, 'Kebebasan pasti membawa *kebahagiaan.'],
  [83.9, 86.01, 'Jadi bina *kekayaan secara *senyap.'],
  [86.01, 88.2, 'Tuan puan yang dah ready nak mulakan *simpan *emas'],
  [88.2, 90.01, 'boleh rujuk *pin *video saya.'],
  [90.01, 93.41, '*Dulu *ragu, *kini *tahu. Jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'PUNCA');
const SCENES = [
  Hh(0, 3.91, (lt) => { const out = clamp((lt - 3.4) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'SEBAB NO. 5', lines: ['TEKANAN', 'SOSIAL'], sub: 'ROSAK POKET ORANG MUDA' }); X.restore(); }, 1, WC.ma),
  B(3.91, 12.57, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Media Sosial', 100);
    row(lt, .8, 440, 'Gambar kawan', 'KERETA MEWAH'); row(lt, 4.74, 590, 'Bercuti', 'KE EROPAH'); row(lt, 6.4, 740, 'Lepak', 'KAFE HIPSTER');
    stk(lt, .4, IMG.sSosial, 540, SB, 600);
  }),
  B(12.57, 20.22, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Takut Ketinggalan', 92);
    row(lt, .8, 440, 'Takut', 'KETINGGALAN (FOMO)'); row(lt, 3.6, 590, 'Punca utama', 'SIMPANAN KOSONG');
    stk(lt, .4, IMG.sFomo, 540, SB, 620);
  }),
  Hh(20.22, 25.45, CH(1, 'Belanja Demi', 'Persepsi Orang', null), -1, WC.ma),
  B(25.45, 33.14, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Demi Persepsi Orang', 90);
    row(lt, .8, 440, 'Belanja demi', 'PERSEPSI ORANG'); row(lt, 2.6, 590, 'Duit penat lelah', 'DIHABISKAN'); row(lt, 5.8, 740, 'Orang lain', 'TAK PEDULI PUN');
    stk(lt, .4, IMG.sBelanja, 540, SB, 600);
  }),
  Hh(33.14, 38.21, CH(2, 'Ilusi Kemewahan', 'Atas Hutang', null), 1, WC.ma),
  B(38.21, 45.97, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Nampak Bergaya', 96);
    row(lt, .8, 440, 'Di media sosial', 'NAMPAK BERGAYA'); row(lt, 3.2, 590, 'Tapi bayar', 'ANSURAN'); row(lt, 5.0, 740, 'Kad kredit', 'DAN HUTANG');
    stk(lt, .4, IMG.sIlusi, 540, SB, 600);
  }),
  Hh(45.97, 49.62, CH(3, 'Kekayaan Sejati', 'Dibina Senyap', null), -1, WC.ma),
  B(49.62, 57.97, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Kekayaan Senyap', 96);
    row(lt, .8, 440, 'Tanpa', 'PAMERAN'); row(lt, 3.2, 590, 'Jutawan sebenar', 'ASET TAK NAMPAK');
    stk(lt, .4, IMG.sSenyap, 540, SB, 620);
  }),
  Hh(57.97, 62.68, CH(4, 'Belanja Untuk', 'Imej Lesap', null), 1, WC.ma),
  B(62.68, 67.36, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Imej Lesap Selamanya', 86);
    row(lt, .8, 440, 'Duit hangus', 'MENUNJUK-NUNJUK'); row(lt, 2.5, 590, 'Rampas kebebasan', 'MASA DEPAN');
    stk(lt, .4, IMG.sLesap, 540, SB, 620);
  }),
  Hh(67.36, 70.31, CH(5, 'Abaikan', 'Pandangan Orang', null), -1, WC.ma),
  B(70.31, 75.71, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Fokus Matlamat Sendiri', 80);
    row(lt, .5, 440, 'Abaikan', 'PANDANGAN ORANG'); row(lt, 1.7, 590, 'Fokus', 'MATLAMAT SENDIRI'); row(lt, 2.4, 740, 'Konsisten', 'MENABUNG');
    stk(lt, .4, IMG.sRm100, 540, SB, 600);
  }),
  B(75.71, 80.68, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Ego Orang Lain', 96);
    anim(lt, 1.9, 540, 560, () => mWhite(130, 440, 820, ['Jangan biarkan ego orang', '*uruskan dompet kita'], 50));
    stk(lt, .3, IMG.sEgo, 540, SB, 620);
  }),
  B(80.68, 86.01, 'merak5', WC.ma, (lt) => {
    ttl(lt, 'Bina Kekayaan Senyap', 88);
    row(lt, .8, 440, 'Kebebasan', 'KEWANGAN'); row(lt, 3.4, 590, 'Bina kekayaan', 'SECARA SENYAP');
    stk(lt, .4, IMG.sBina, 540, SB, 620);
  }),
  B(86.01, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sBina, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sSosial, IMG.sFomo, IMG.sBelanja, IMG.sIlusi, IMG.sSenyap, IMG.sLesap, IMG.sRm100, IMG.sEgo, IMG.sBina])), { nobk: true }),
];
