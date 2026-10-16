// scenes.js — "5 Sebab Mangsa Kena Tipu Tak Patut Putus Asa" (105.7s + outro 6s). Design maroon konsisten + sticker (wanita berkaca mata) pop-up. Hard cut.
const VOICE = 105.650998, DUR = VOICE + 6, HEADN = 3169;
const ASSETS = {
  wallet: 'dompet-wealthcard-safari.jpg', tiers: 'set-jongkong-bertingkat-bungamas.jpg', kg: 'jongkong-1kg-tapak-tangan.jpg', ipad: 'kad-dinar-dan-app-gap-ipad.jpg', shop: 'kad-taifook-depan-kedai-public-gold.jpg',
  bungamas: 'jongkong-100g-kad-bungamas-ungu.jpg', merak5: 'kad-ungu-merak-5g.jpg', g250: 'jongkong-250g-merah.jpg', dulang: 'dulang-merah-1kg-koleksi-penuh.jpg', merak100: 'jongkong-merak-100g-dulang-merah.jpg',
  bunga50: 'kad-50g-bunga-raya.jpg', syiling: 'kad-hijau-syiling-pantai.jpg', dinarPantai: 'kad-dinar-hijau-dua-pantai.jpg', binder: 'koleksi-binder-kad.jpg',
  sPutus: 'stk-jangan-putus-asa.png', sTakut: 'stk-rasa-takut-normal.png', sJanji: 'stk-janji-bulan-bintang.png', sFizikal: 'stk-emas-fizikal-nyata.png', sSyarikat: 'stk-syarikat-kukuh.png',
  sKontrak: 'stk-tiada-kontrak.png', sGuru: 'stk-guru-paling-mahal.png', sBerilmu: 'stk-biar-berilmu.png', sPilih: 'stk-pilih-selamat.png',
};
const SEG = [
  [0, 4.38, '*5 *Sebab mangsa kena tipu tak patut *putus *asa'],
  [4.38, 10.28, 'Anda pernah rugi besar dalam pelaburan ataupun pernah jadi mangsa skim penipuan?'],
  [10.28, 12.49, 'Rasa *serik dan *takut tu normal,'],
  [12.49, 17.06, 'tapi jangan sampai pintu membina *kekayaan tertutup terus.'],
  [17.06, 19.08, '*Pertama, *skim'],
  [19.08, 20.97, '*tipu janji *bulan dan *bintang.'],
  [20.97, 24.32, 'Mereka memberikan tawaran keuntungan'],
  [24.32, 26.41, '*30% sebulan'],
  [26.41, 28.41, 'adalah *perangkap samar.'],
  [28.41, 31.37, 'Aset sebenar tiada pulangan yang'],
  [31.37, 33.41, '*tetap. *Kedua,'],
  [33.41, 36.82, '*Emas adalah aset *fizikal yang kita pegang sendiri.'],
  [36.82, 41.51, 'Skim tipu biasanya cuma nombor atas skrin yang akan *lesap,'],
  [41.51, 44.11, 'tapi emas fizikal kita boleh *pegang sendiri.'],
  [44.11, 47.45, 'Ia harta di bawah *kawalan kita sendiri.'],
  [47.45, 51.16, '*Ketiga, berurusan dengan syarikat yang berreputasi'],
  [51.16, 56.08, '*kukuh. Pilih syarikat yang beroperasi *berbelas *tahun,'],
  [56.08, 59.44, 'ada cawangan emas fizikal di *seluruh *negara.'],
  [59.44, 63.01, '*Keempat, tiada *kontrak yang mengunci'],
  [63.01, 66.71, 'duit anda. Simpanan emas memberikan anda *kuasa *penuh'],
  [66.71, 69.94, 'untuk *beli, *simpan atau *jual bila-bila masa,'],
  [69.94, 72.47, 'di mana-mana. *Kelima,'],
  [72.47, 76.68, '*Pengalaman dah rugi adalah *guru yang *paling *mahal.'],
  [76.68, 82.78, 'Anda kini lebih matang untuk membezakan antara skim auta dengan aset sebenar.'],
  [82.78, 86.63, 'Kena tipu sekali bukan bermakna semua pelaburan salah.'],
  [86.63, 89.47, 'Ia tanda anda perlu lebih *berilmu.'],
  [89.47, 92.83, 'Pilih aset emas yang *nyata dan *selamat.'],
  [92.83, 96.43, 'Boleh mulakan *simpan *emas di *Public *Gold dengan serendah *RM100.'],
  [96.43, 99.22, 'Simpan gram, keluarkan *emas *fizikal.'],
  [99.22, 101.14, 'Tuan puan yang dah ready nak bermula'],
  [101.14, 102.74, 'boleh rujuk *video saya.'],
  [102.74, 105.65, '*Dulu *ragu, *kini *tahu. Jom mulakan *simpan *emas.'],
];
const ttl = (lt, label, size = 96) => { anim(lt, .05, 540, 270, () => mPill([label], 540, 270, size)); anim(lt, .05, 540, 270, () => MA.side(300)); };
const row = (lt, at, y, l, r) => anim(lt, at, 540, y + 55, () => mRow(60, y, 960, l, r));
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'SEBAB');
const SCENES = [
  Hh(0, 4.38, (lt) => { const out = clamp((lt - 3.8) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'JANGAN PUTUS ASA', lines: ['5 SEBAB', 'MANGSA TIPU'], sub: 'TAK PATUT PUTUS ASA' }); X.restore(); }, 1, WC.ma),
  B(4.38, 17.06, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Pernah Kena Tipu?', 92);
    row(lt, .3, 440, 'Rugi besar', 'DALAM PELABURAN'); row(lt, 3.0, 590, 'Mangsa', 'SKIM PENIPUAN');
    if (lt < 8.0) stk(lt, 5.9, IMG.sTakut, 540, mamiY - 45, 640, { float: lt < 7.5 });
    else { anim(lt, 8.3, 540, 790, () => mWhite(130, 730, 820, ['Jangan sampai pintu', '*kekayaan tertutup!'], 46)); stk(lt, 8.1, IMG.sPutus, 540, mamiY - 45, 560); }
  }),
  Hh(17.06, 20.97, CH(1, 'Skim Tipu', 'Janji Bulan & Bintang', null), -1, WC.ma),
  B(20.97, 33.41, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Tawaran 30% Sebulan', 88);
    anim(lt, 3.3, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'TAWARAN', '30%', 'sebulan'));
    anim(lt, 5.4, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'ITU ADALAH', 'PERANGKAP', 'tiada pulangan tetap'));
    stk(lt, .6, IMG.sJanji, 540, mamiY - 45, 600);
  }),
  Hh(33.41, 36.82, CH(2, 'Emas Aset Fizikal', null, 'yang kita pegang sendiri'), 1, WC.ma),
  B(36.82, 47.45, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Skim Vs Emas', 100);
    row(lt, .3, 440, 'Skim tipu', 'NOMBOR DI SKRIN'); row(lt, 4.7, 590, 'Emas fizikal', 'BOLEH DIPEGANG'); row(lt, 7.3, 740, 'Harta di bawah', 'KAWALAN SENDIRI');
    stk(lt, 5.0, IMG.sFizikal, 540, mamiY - 45, 600);
  }),
  Hh(47.45, 51.16, CH(3, 'Syarikat Kukuh', null, 'reputasi dipercayai'), -1, WC.ma),
  B(51.16, 59.44, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Pilih Syarikat Kukuh', 88);
    row(lt, .8, 440, 'Beroperasi', 'BERBELAS TAHUN'); row(lt, 4.9, 590, 'Ada cawangan', 'DI SELURUH NEGARA');
    stk(lt, .4, IMG.sSyarikat, 540, mamiY - 45, 760);
  }),
  Hh(59.44, 63.01, CH(4, 'Tiada Kontrak', null, 'yang mengunci duit anda'), 1, WC.ma),
  B(63.01, 72.47, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Kuasa Penuh', 100);
    anim(lt, 3.7, 300, 520, () => MA.chip('Beli', 300, 460, 54)); anim(lt, 4.4, 540, 520, () => MA.chip('Simpan', 540, 460, 54)); anim(lt, 5.1, 780, 520, () => MA.chip('Jual', 780, 460, 54));
    anim(lt, 6.5, 540, 640, () => mWhite(130, 540, 820, ['*Bila-bila masa,', '*di mana-mana'], 52));
    stk(lt, 1.0, IMG.sKontrak, 540, mamiY - 45, 680);
  }),
  Hh(72.47, 76.68, CH(5, 'Pengalaman', 'Guru Paling Mahal', null), -1, WC.ma),
  B(76.68, 86.63, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Lebih Matang', 100);
    anim(lt, 1.5, 290, 640, () => MA.tierCard(50, 430, 480, 400, 'SKIM AUTA', 'PALSU', 'dapat dibezakan'));
    anim(lt, 3.5, 790, 640, () => MA.tierCard(550, 430, 480, 400, 'ASET SEBENAR', 'NYATA', 'emas fizikal'));
    stk(lt, 6.3, IMG.sGuru, 540, mamiY - 45, 600);
  }),
  B(86.63, 89.47, 'g250', WC.ma, (lt) => { ttl(lt, 'Lebih Berilmu', 100); stk(lt, .3, IMG.sBerilmu, 540, mamiY - 45, 760); }),
  B(89.47, 96.43, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Pilih Yang Selamat', 92);
    row(lt, 3.4, 440, 'Mula simpan', 'EMAS'); row(lt, 3.9, 590, 'Di', 'PUBLIC GOLD'); row(lt, 5.4, 740, 'Serendah', 'RM100');
    stk(lt, .3, IMG.sPilih, 540, mamiY - 45, 600);
  }),
  B(96.43, 99.22, 'kg', WC.ma, (lt) => { ttl(lt, 'Simpan Gram', 100); anim(lt, .3, 540, 560, () => mWhite(130, 440, 820, ['Simpan gram,', '*keluarkan emas fizikal'], 50)); stk(lt, .4, IMG.sFizikal, 540, mamiY - 45, 700); }),
  B(99.22, VOICE, 'shop', WC.ma, (lt) => {
    anim(lt, .05, 540, 250, () => mHead('Dah Ready Nak Mula?', 540, 260, 84));
    anim(lt, .3, 540, 430, () => mPill(['Mula Simpan Emas', 'Hari Ini'], 540, 380, 100)); anim(lt, .3, 540, 430, () => MA.side(450));
    anim(lt, 3.6, 540, 760, () => mHead('Dulu Ragu, Kini Tahu!', 540, 770, 80, MA.K.gold));
    anim(lt, 2.0, 540, 900, () => { shadow(() => { rr(180, 850, 720, 120, 60); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Rujuk Pin Video', 540, 930, MA.F.h(54), '#fff', 'center'); });
    stk(lt, .6, IMG.sPutus, 540, mamiY - 45, 640);
  }),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sPutus, IMG.sTakut, IMG.sJanji, IMG.sFizikal, IMG.sSyarikat, IMG.sKontrak, IMG.sGuru, IMG.sBerilmu, IMG.sPilih])), { nobk: true }),
];
function bakeAll() { ['tiers', 'kg', 'dulang', 'merak100', 'bunga50', 'syiling', 'g250', 'dinarPantai', 'shop'].forEach(k => { BGS[k] = MA.bgPhoto(k, 16, .45); }); }
