// scenes.js — "5 Fakta Sebenar Menuju Kebebasan Kewangan (pendapatan pasif)" (91.88s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 91.880998, DUR = VOICE + 6, HEADN = 2756;
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
const ASSETS = { ...PH, sImpian: 'stk-impian-semua.png', sIbu: 'stk-ibu-pasif-simpanan.png', sBenteng: 'stk-benteng-pertahanan.png', sSelamat: 'stk-selamatkan-modal.png', sMaraton: 'stk-maraton-disiplin.png', sPelbagai: 'stk-pelbagaikan-aset.png', sAsas: 'stk-asas-kukuh.png', sAngan: 'stk-bukan-angan.png', sMula: 'stk-mula-hari-ini.png' };

const SEG = [
  [0, 3.96, '*5 *fakta *sebenar menuju *kebebasan *kewangan'],
  [3.96, 9.75, 'Kebebasan kewangan dan hidup atas *pendapatan *pasif adalah *impian kita semua.'],
  [9.75, 13.05, 'Namun, ada *asas penting yang ramai *terlepas,'],
  [13.05, 14.78, 'sebelum sampai ke sana.'],
  [14.78, 19.11, '*Pertama, *simpanan adalah *ibu kepada pendapatan pasif.'],
  [19.11, 22.94, 'Kita mustahil memiliki aset yang *menjana *tunai'],
  [22.94, 26.04, 'tanpa modal simpanan yang *kukuh terlebih dahulu.'],
  [26.04, 29.79, '*Kedua, *benteng *pertahanan sebelum menyerang.'],
  [29.79, 33.84, 'Sebelum meletakkan wang dalam pelaburan *berisiko,'],
  [33.84, 38.87, 'pastikan anda mempunyai *aset *perlindung *nilai seperti *emas *fizikal.'],
  [38.87, 42.88, '*Ketiga, *selamatkan *modal daripada *inflasi.'],
  [42.88, 45.85, 'Modal yang *susut nilai dimakan inflasi'],
  [45.85, 50.05, 'tidak akan mampu menghasilkan pendapatan pasif yang *bernilai.'],
  [50.05, 55.1, '*Keempat, *maraton *disiplin, bukan perlumbaan pecut.'],
  [55.1, 59.68, 'Kebebasan kewangan dibina daripada *tabiat *konsisten bertahun-tahun,'],
  [59.68, 62.47, 'bukan skim *kaya *semalaman.'],
  [62.47, 66.68, '*Dan *kelima, bina *kepelbagaian aset yang *kukuh.'],
  [66.68, 72.81, 'Gabungkan aset *pendapatan, aset *pertumbuhan dan aset *keselamatan untuk'],
  [72.81, 74.94, 'portfolio yang *tahan *krisis.'],
  [74.94, 77.93, 'Kebebasan kewangan bukan *angan-angan kosong,'],
  [77.93, 82.27, 'ia bermula dengan kita membina *asas *simpanan yang tidak mudah goyang.'],
  [82.27, 84.55, '*Kukuhkan asas kewangan anda *hari *ini.'],
  [84.55, 87.02, 'Tuan puan yang nak mulakan *simpan *emas'],
  [87.02, 88.71, 'boleh rujuk *pin *video saya.'],
  [88.71, 91.88, '*Dulu *ragu, *kini *tahu. Jom mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'FAKTA');
const SCENES = [
  Hh(0, 3.96, (lt) => { const out = clamp((lt - 3.4) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'PENDAPATAN PASIF', lines: ['5 FAKTA', 'SEBENAR'], sub: 'MENUJU KEBEBASAN KEWANGAN' }); X.restore(); }, 1, WC.ma),
  B(3.96, 14.78, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Impian Kita Semua', 92);
    row(lt, .8, 440, 'Kebebasan kewangan', 'IMPIAN SEMUA'); row(lt, 3.6, 590, 'Hidup atas', 'PENDAPATAN PASIF'); row(lt, 6.4, 740, 'Asas penting', 'RAMAI TERLEPAS');
    stk(lt, .4, IMG.sImpian, 540, SB, 600);
  }),
  Hh(14.78, 19.11, CH(1, 'Simpanan Ibu', 'Pendapatan Pasif', null), -1, WC.ma),
  B(19.11, 26.04, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Modal Dulu', 100);
    row(lt, 1.0, 440, 'Aset jana tunai', 'PERLU MODAL'); row(lt, 3.4, 590, 'Simpanan kukuh', 'TERLEBIH DAHULU');
    stk(lt, .4, IMG.sIbu, 540, SB, 620);
  }),
  Hh(26.04, 29.79, CH(2, 'Benteng Pertahanan', 'Sebelum Menyerang', null), 1, WC.ma),
  B(29.79, 38.87, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Lindung Nilai', 100);
    row(lt, 1.0, 440, 'Pelaburan', 'BERISIKO'); row(lt, 3.8, 590, 'Pastikan ada', 'ASET LINDUNG NILAI'); row(lt, 6.4, 740, 'Contoh', 'EMAS FIZIKAL');
    stk(lt, .4, IMG.sBenteng, 540, SB, 600);
  }),
  Hh(38.87, 42.88, CH(3, 'Selamatkan Modal', 'Daripada Inflasi', null), -1, WC.ma),
  B(42.88, 50.05, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Inflasi Makan Nilai', 92);
    row(lt, 1.0, 440, 'Modal susut', 'DIMAKAN INFLASI'); row(lt, 3.8, 590, 'Tak mampu', 'HASILKAN PASIF');
    stk(lt, .4, IMG.sSelamat, 540, SB, 620);
  }),
  Hh(50.05, 55.1, CH(4, 'Maraton Disiplin', 'Bukan Pecut', null), 1, WC.ma),
  B(55.1, 62.47, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Tabiat Konsisten', 100);
    row(lt, 1.0, 440, 'Dibina', 'BERTAHUN-TAHUN'); row(lt, 3.8, 590, 'Bukan skim', 'KAYA SEMALAMAN');
    stk(lt, .4, IMG.sMaraton, 540, SB, 620);
  }),
  Hh(62.47, 66.68, CH(5, 'Kepelbagaian Aset', 'Yang Kukuh', null), -1, WC.ma),
  B(66.68, 74.94, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Tiga Jenis Aset', 100);
    row(lt, 1.0, 440, 'Aset', 'PENDAPATAN'); row(lt, 3.0, 590, 'Aset', 'PERTUMBUHAN'); row(lt, 4.8, 740, 'Aset', 'KESELAMATAN');
    stk(lt, .4, IMG.sPelbagai, 540, SB, 600);
  }),
  B(74.94, 82.27, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Bukan Angan-Angan', 92);
    if (lt < 3.0) stk(lt, .3, IMG.sAngan, 540, SB, 620);
    else { anim(lt, 3.2, 540, 560, () => mWhite(130, 440, 820, ['Bina asas simpanan', '*yang tidak mudah goyang'], 48)); stk(lt, 3.0, IMG.sAsas, 540, SB, 620); }
  }),
  B(82.27, 84.55, 'merak5', WC.ma, (lt) => { ttl(lt, 'Mula Hari Ini', 100); stk(lt, .3, IMG.sMula, 540, SB, 680); }),
  B(84.55, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sAsas, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sImpian, IMG.sIbu, IMG.sBenteng, IMG.sSelamat, IMG.sMaraton, IMG.sPelbagai, IMG.sAsas, IMG.sAngan, IMG.sMula])), { nobk: true }),
];
