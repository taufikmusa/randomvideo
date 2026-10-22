// scenes.js — "5 Realiti Memenatkan Generasi Sandwich" (100.22s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 100.217007, DUR = VOICE + 6, HEADN = 3006;
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
const ASSETS = { ...PH, sTersepit: 'stk-tersepit-tengah.png', sTiga: 'stk-pendapatan-tiga-arah.png', sAbai: 'stk-abai-persaraan.png', sKecemasan: 'stk-risiko-kecemasan-serentak.png', sSimpan: 'stk-simpan-untuk-diri.png', sTiang: 'stk-diri-tiang-utama.png', sKorban: 'stk-pengorbanan-besar.png', sTumbang: 'stk-jangan-biar-tumbang.png', sSayangi: 'stk-sayangi-diri-berbakti.png' };

const SEG = [
  [0, 4.08, '*5 *realiti *memenatkan generasi *sandwich'],
  [4.08, 8.29, 'Tergolong dalam generasi sandwich bermakna anda *tersepit'],
  [8.29, 11.39, 'di tengah-tengah menyara *anak yang membesar'],
  [11.39, 14.2, 'dan menjaga *ibu *bapa yang *uzur,'],
  [14.2, 18.17, 'dan *diri *sendiri selalu diletakkan *paling *belakang.'],
  [18.17, 22.15, '*Pertama, *pendapatan *terbahagi *tiga *arah.'],
  [22.15, 26.75, 'Gaji yang sama terpaksa menampung belanja *persekolahan anak,'],
  [26.75, 30.49, '*ubat *mak *ayah dan komitmen diri sendiri.'],
  [30.49, 34.03, '*Kedua, *mengabaikan *persaraan sendiri.'],
  [34.03, 37.62, 'Jika anda tidak menyediakan *dana *hari *tua,'],
  [37.62, 42.43, 'anda berisiko *memindahkan beban ini kepada *anak kelak.'],
  [42.43, 46.23, '*Ketiga, *risiko *kecemasan *serentak.'],
  [46.23, 50.75, 'Ujian kesihatan *anak dan *ibu *bapa boleh datang'],
  [50.75, 55.23, '*serentak dan ia berisiko melumpuhkan kestabilan'],
  [55.23, 57.63, 'simpanan. *Keempat,'],
  [57.63, 60.23, '*simpan *sedikit untuk *diri *sendiri.'],
  [60.23, 63.52, 'Asingkan *RM100 ke dalam bentuk *emas,'],
  [63.52, 65.68, 'tidak mengabaikan *tanggungjawab,'],
  [65.68, 67.93, 'tapi melindungi *benteng'],
  [67.93, 70.84, 'simpanan anda. *Dan *kelima,'],
  [70.84, 73.17, '*diri anda adalah *tiang *utama.'],
  [73.17, 77.36, 'Anda wajib kekal *sihat dan *kukuh dari segi kewangan'],
  [77.36, 81.17, 'untuk terus memayungi *dua *generasi.'],
  [81.17, 84.42, '*Pengorbanan anda *sangat *besar di sisi keluarga,'],
  [84.42, 88.1, 'tapi jangan biar diri sendiri *tumbang tanpa'],
  [88.1, 91.88, '*perlindungan. *Sayangi diri anda untuk terus *berbakti.'],
  [91.88, 95.26, 'InsyaAllah, tuan puan yang dah ready nak mulakan *simpan *emas'],
  [95.26, 96.88, 'boleh rujuk *pin *video saya.'],
  [96.88, 98.81, '*Dulu *ragu, *kini *tahu.'],
  [98.81, 100.22, 'Jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'REALITI');
const SCENES = [
  Hh(0, 4.08, (lt) => { const out = clamp((lt - 3.6) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'GENERASI SANDWICH', lines: ['5 REALITI', 'SANDWICH'], sub: 'GENERASI YANG MEMENATKAN' }); X.restore(); }, 1, WC.ma),
  B(4.08, 18.17, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Generasi Sandwich', 94);
    row(lt, 1.5, 440, 'Anda', 'TERSEPIT'); row(lt, 4.6, 590, 'Menyara', 'ANAK MEMBESAR'); row(lt, 7.6, 740, 'Menjaga', 'IBU BAPA UZUR');
    stk(lt, .5, IMG.sTersepit, 540, SB, 600);
  }),
  Hh(18.17, 22.15, CH(1, 'Pendapatan Terbahagi', 'Tiga Arah', null), -1, WC.ma),
  B(22.15, 30.49, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Gaji Dibahagi 3 Arah', 88);
    row(lt, 1.0, 440, 'Belanja', 'SEKOLAH ANAK'); row(lt, 3.8, 590, 'Ubat', 'MAK AYAH'); row(lt, 5.6, 740, 'Komitmen', 'DIRI SENDIRI');
    stk(lt, .4, IMG.sTiga, 540, SB, 600);
  }),
  Hh(30.49, 34.03, CH(2, 'Abai Persaraan', 'Sendiri', null), 1, WC.ma),
  B(34.03, 42.43, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Dana Hari Tua', 100);
    row(lt, 1.0, 440, 'Tiada dana', 'HARI TUA'); row(lt, 4.2, 590, 'Beban pindah', 'KEPADA ANAK');
    stk(lt, .4, IMG.sAbai, 540, SB, 620);
  }),
  Hh(42.43, 46.23, CH(3, 'Risiko Kecemasan', 'Serentak', null), -1, WC.ma),
  B(46.23, 55.23, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Sakit Serentak', 100);
    row(lt, 1.0, 440, 'Anak sakit', 'IBU BAPA SAKIT'); row(lt, 3.4, 590, 'Datang', 'SERENTAK'); row(lt, 5.6, 740, 'Kestabilan simpanan', 'LUMPUH');
    stk(lt, .4, IMG.sKecemasan, 540, SB, 600);
  }),
  Hh(55.23, 60.23, CH(4, 'Simpan Sedikit', 'Untuk Diri Sendiri', null), 1, WC.ma),
  B(60.23, 67.93, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'RM100 Dalam Emas', 94);
    anim(lt, .8, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'ASINGKAN', 'RM100', 'ke dalam emas'));
    anim(lt, 4.6, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'MELINDUNGI', 'BENTENG', 'simpanan anda'));
    stk(lt, 6.0, IMG.sSimpan, 540, SB, 600);
  }),
  Hh(67.93, 73.17, CH(5, 'Diri Anda', 'Tiang Utama', null), -1, WC.ma),
  B(73.17, 81.17, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Kekal Kukuh', 100);
    row(lt, 1.0, 440, 'Kekal', 'SIHAT'); row(lt, 2.6, 590, 'Kukuh', 'DARI SEGI KEWANGAN'); row(lt, 5.2, 740, 'Payungi', 'DUA GENERASI');
    stk(lt, .4, IMG.sTiang, 540, SB, 600);
  }),
  B(81.17, 84.42, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Pengorbanan Besar', 92); stk(lt, .3, IMG.sKorban, 540, SB, 680); }),
  B(84.42, 88.1, 'merak5', WC.ma, (lt) => { ttl(lt, 'Jangan Tumbang', 100); stk(lt, .3, IMG.sTumbang, 540, SB, 680); }),
  B(88.1, 91.88, 'ipad', WC.ma, (lt) => { ttl(lt, 'Sayangi Diri', 100); anim(lt, .4, 540, 560, () => mWhite(130, 440, 820, ['Sayangi diri anda', '*untuk terus berbakti'], 50)); stk(lt, .3, IMG.sSayangi, 540, SB, 640); }),
  B(91.88, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sTiang, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sTersepit, IMG.sTiga, IMG.sAbai, IMG.sKecemasan, IMG.sSimpan, IMG.sTiang, IMG.sKorban, IMG.sTumbang, IMG.sSayangi])), { nobk: true }),
];
