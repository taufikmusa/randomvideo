// scenes.js — "5 Didikan Duit Wajib Ajar Anak" (93.37s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 93.367438, DUR = VOICE + 6, HEADN = 2800;
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
const ASSETS = { ...PH, sRumah: 'stk-rumah.png', sUsaha: 'stk-usaha.png', sTunda: 'stk-tunda.png', sDisiplin: 'stk-disiplin.png', sNilai: 'stk-nilai.png', sJunior: 'stk-junior.png', sBekal: 'stk-bekal.png', sTabiat: 'stk-tabiat.png', sBina: 'stk-bina.png' };

const SEG = [
  [0, 5.36, '*5 *didikan *duit *wajib ajar pada anak sebelum mereka meningkat dewasa'],
  [5.36, 7.4, 'Pihak sekolah mengajar anak-anak'],
  [7.4, 9.23, 'subject *science, *mathematics,'],
  [9.23, 11.77, 'dan *sejarah untuk peperiksaan.'],
  [11.77, 14.64, 'Namun, *tanggungjawab mendidik perkara paling penting'],
  [14.64, 16.61, 'iaitu menguruskan *kewangan'],
  [16.61, 19.04, 'terletak pada bahu *ibu *bapa.'],
  [19.04, 20.91, '*Pertama, *wang'],
  [20.91, 23.35, 'hadir daripada *usaha dan titik peluh.'],
  [23.35, 25.79, 'Jadi anak memahami bahawa'],
  [25.79, 27.66, 'wang tidak jatuh dari *langit,'],
  [27.66, 30.95, 'melalui pemberian *wang *saku berhemah.'],
  [30.95, 33.5, '*Kedua, latih konsep'],
  [33.5, 35.67, 'menunda *kepuasan kehendak.'],
  [35.67, 38.8, 'Mengajar anak *bersabar dan *menabung'],
  [38.8, 41.96, 'untuk barang *impian membentuk jati diri yang kuat.'],
  [41.96, 44.5, '*Ketiga, *disiplin menabung jauh lebih penting'],
  [44.5, 46.88, 'daripada jumlah *wang.'],
  [46.88, 50.0, 'Anak yang dibiasakan menyimpan dari *kecil'],
  [50.0, 53.38, 'akan mengekalkan *tabiat itu sehingga dewasa.'],
  [53.38, 55.5, '*Keempat, dedahkan hakikat'],
  [55.5, 58.51, '*nilai *wang yang susut dimakan masa.'],
  [58.51, 61.79, 'Terangkan kepada mereka mengapa *harga barang'],
  [61.79, 63.7, 'makin *meningkat setiap tahun.'],
  [63.7, 66.57, '*Dan *kelima, ajar melalui'],
  [66.57, 70.21, '*pengalaman *praktikal memegang *aset *fizikal *emas.'],
  [70.21, 73.0, 'Membuka *akaun *emas *junior'],
  [73.0, 76.05, 'membolehkan anak melihat sendiri simpanan mereka makin *bertambah.'],
  [76.05, 79.54, '*Didikan *kewangan terbaik bermula dari *rumah *sendiri.'],
  [79.54, 83.46, 'Bekalkan anak-anak dengan *kebijaksanaan mengurus *harta.'],
  [83.46, 85.97, 'Tanamkan *tabiat *menabung sejak kecil.'],
  [85.97, 88.91, 'Tuan puan yang dah ready nak mulakan *simpan *emas,'],
  [88.91, 90.3, 'boleh rujuk *pin *video,'],
  [90.3, 91.8, '*dulu *ragu, *kini *tahu.'],
  [91.8, 93.37, 'Jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'DIDIKAN');
const SCENES = [
  Hh(0, 5.36, (lt) => { const out = clamp((lt - 4.85) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'DIDIKAN DUIT', lines: ['5 DIDIKAN', 'DUIT ANAK'], sub: 'WAJIB AJAR SEBELUM DEWASA' }); X.restore(); }, 1, WC.ma),
  B(5.36, 11.77, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Ilmu Di Sekolah', 96);
    row(lt, .8, 440, 'Subjek', 'SAINS & MATEMATIK'); row(lt, 3.9, 590, 'Serta', 'SEJARAH PEPERIKSAAN');
    stk(lt, .4, IMG.sRumah, 540, SB, 620);
  }),
  B(11.77, 19.04, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Tanggungjawab Ibu Bapa', 80);
    row(lt, .8, 440, 'Perkara penting', 'URUS KEWANGAN'); row(lt, 3.5, 590, 'Terletak pada', 'BAHU IBU BAPA');
    stk(lt, .4, IMG.sBina, 540, SB, 620);
  }),
  Hh(19.04, 23.35, CH(1, 'Wang Hadir', 'Dari Usaha', null), -1, WC.ma),
  B(23.35, 30.95, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Bukan Dari Langit', 96);
    row(lt, .8, 440, 'Usaha &', 'TITIK PELUH'); row(lt, 2.4, 590, 'Wang tak jatuh', 'DARI LANGIT'); row(lt, 5.0, 740, 'Pemberian', 'WANG SAKU BERHEMAH');
    stk(lt, .4, IMG.sUsaha, 540, SB, 600);
  }),
  Hh(30.95, 35.67, CH(2, 'Tunda', 'Kepuasan', null), 1, WC.ma),
  B(35.67, 41.96, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Sabar & Menabung', 96);
    row(lt, .8, 440, 'Bersabar &', 'MENABUNG'); row(lt, 2.2, 590, 'Barang impian', 'JATI DIRI KUAT');
    stk(lt, .4, IMG.sTunda, 540, SB, 620);
  }),
  Hh(41.96, 46.88, CH(3, 'Disiplin Menabung', 'Lebih Penting', null), -1, WC.ma),
  B(46.88, 53.38, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Biasakan Dari Kecil', 90);
    row(lt, .8, 440, 'Biasakan', 'SIMPAN DARI KECIL'); row(lt, 3.2, 590, 'Kekal tabiat', 'SEHINGGA DEWASA');
    stk(lt, .4, IMG.sDisiplin, 540, SB, 620);
  }),
  Hh(53.38, 58.51, CH(4, 'Nilai Wang', 'Susut Dimakan Masa', null), 1, WC.ma),
  B(58.51, 63.7, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Harga Terus Naik', 96);
    row(lt, .8, 440, 'Harga barang', 'MAKIN MENINGKAT'); row(lt, 3.2, 590, 'Setiap', 'TAHUN');
    stk(lt, .4, IMG.sNilai, 540, SB, 620);
  }),
  Hh(63.7, 66.57, CH(5, 'Ajar Melalui', 'Pengalaman', null), -1, WC.ma),
  B(66.57, 76.05, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Akaun Emas Junior', 92);
    row(lt, .8, 440, 'Pegang', 'ASET FIZIKAL EMAS'); row(lt, 3.6, 590, 'Buka', 'AKAUN EMAS JUNIOR'); row(lt, 6.5, 740, 'Lihat simpanan', 'BERTAMBAH');
    stk(lt, .4, IMG.sJunior, 540, SB, 600);
  }),
  B(76.05, 79.54, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Didikan Dari Rumah', 90); stk(lt, .3, IMG.sRumah, 540, SB, 680); }),
  B(79.54, 83.46, 'merak5', WC.ma, (lt) => { ttl(lt, 'Bijak Urus Harta', 96); stk(lt, .3, IMG.sBekal, 540, SB, 680); }),
  B(83.46, 85.97, 'ipad', WC.ma, (lt) => { ttl(lt, 'Tabiat Menabung', 96); stk(lt, .3, IMG.sTabiat, 540, SB, 680); }),
  B(85.97, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sBina, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sRumah, IMG.sUsaha, IMG.sTunda, IMG.sDisiplin, IMG.sNilai, IMG.sJunior, IMG.sBekal, IMG.sTabiat, IMG.sBina])), { nobk: true }),
];
