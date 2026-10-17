// scenes.js — "5 Pengajaran Kos Sekolah Anak" (98.59s + outro 6s). Acid yellow #EFFF00 + sticker pop-up. Hard cut.
const VOICE = 98.591927, DUR = VOICE + 6, HEADN = 2957;
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
const ASSETS = { ...PH, sMusim: 'stk-musim.png', sKos: 'stk-kos.png', sSekolah: 'stk-sekolah.png', sTunai: 'stk-tunai.png', sAwal: 'stk-awal.png', sJunior: 'stk-junior.png', sAnak: 'stk-anak.png', sImpian: 'stk-impian.png', sSedia: 'stk-sedia.png' };

const SEG = [
  [0, 4.76, '*5 *pengajaran daripada *kos *sekolah anak yang makin meningkat'],
  [4.76, 7.58, 'Setiap kali *musim persekolahan bermula,'],
  [7.58, 11.2, 'dompet ibu bapa pasti terasa *berat dan tertekan.'],
  [11.2, 14.0, '*Yuran, baju seragam, buku teks dan beg sekolah'],
  [14.0, 17.29, 'mengajar kita satu *hakikat penting.'],
  [17.29, 19.92, '*Pertama, *kos *pendidikan anak'],
  [19.92, 22.25, 'meningkat lebih *laju daripada'],
  [22.25, 25.66, 'kenaikan *gaji. Perbelanjaan persekolahan'],
  [25.66, 29.42, 'terus naik saban tahun tanpa menunggu *persediaan.'],
  [29.42, 31.69, '*Kedua,'],
  [31.69, 34.0, 'kos *sekolah *rendah cuma *permulaan'],
  [34.0, 36.23, 'kepada kos *universiti.'],
  [36.23, 39.16, 'Jika belanja sekolah sudah terasa *sesak,'],
  [39.16, 41.63, 'yuran pengajian tinggi kelak menuntut'],
  [41.63, 43.35, '*puluhan *ribu *ringgit.'],
  [43.35, 46.0, '*Ketiga, *simpanan *tunai biasanya tak mampu'],
  [46.0, 49.14, 'nak kejar *inflasi *pendidikan.'],
  [49.14, 50.98, 'Duit tunai yang disimpan'],
  [50.98, 54.29, 'rugi *kuasa *beli apabila anak dah melangkah'],
  [54.29, 56.98, 'ke universiti. *Keempat,'],
  [56.98, 60.59, 'memulakan *simpanan *awal jauh lebih *ringan bebannya'],
  [60.59, 65.16, 'daripada menyimpan di saat anak mula masuk universiti.'],
  [65.16, 69.72, '*Dan *kelima, tuan puan boleh buka *akaun *emas *junior'],
  [69.72, 73.27, 'sebagai persediaan untuk bina *tabungan'],
  [73.27, 77.62, '*emas anak-anak bagi menampung *perbelanjaan mereka'],
  [77.62, 79.57, 'melanjutkan pelajaran.'],
  [79.57, 82.96, '*Pendidikan anak adalah *pelaburan masa depan mereka.'],
  [82.96, 86.32, 'Jangan biarkan *impian mereka *terhalang kerana'],
  [86.32, 87.7, '*kekangan kewangan.'],
  [87.7, 89.81, 'Sediakan *tabung *pendidikan anak'],
  [89.81, 91.6, 'dari *sekarang. Tuan puan yang dah ready'],
  [91.6, 93.25, 'nak mulakan *simpan *emas,'],
  [93.25, 95.0, 'boleh rujuk *pin *video saya.'],
  [95.0, 97.01, '*Dulu *ragu, *kini *tahu. Jom'],
  [97.01, 98.59, 'mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'PENGAJARAN');
const SCENES = [
  Hh(0, 4.76, (lt) => { const out = clamp((lt - 4.25) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'DOMPET IBU BAPA', lines: ['5 Pengajaran', 'Kos Sekolah Anak'], sub: 'MAKIN MENINGKAT' }); X.restore(); }, 1, WC.ma),
  B(4.76, 11.2, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Musim Sekolah', 100);
    row(lt, .8, 440, 'Musim', 'PERSEKOLAHAN'); row(lt, 2.9, 590, 'Dompet ibu bapa', 'TERASA BERAT'); row(lt, 4.6, 740, 'Rasa', 'TERTEKAN');
    stk(lt, .4, IMG.sMusim, 540, SB, 600);
  }),
  B(11.2, 17.29, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Yuran & Keperluan', 90);
    row(lt, .8, 440, 'Yuran', 'BAJU SERAGAM'); row(lt, 2.0, 590, 'Buku teks', 'DAN BEG SEKOLAH'); row(lt, 3.8, 740, 'Satu', 'HAKIKAT PENTING');
    stk(lt, .4, IMG.sMusim, 540, SB, 600);
  }),
  Hh(17.29, 22.25, CH(1, 'Kos Pendidikan', 'Lebih Laju', null), -1, WC.ma),
  B(22.25, 30.5, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Lebih Laju Dari Gaji', 86);
    row(lt, .8, 440, 'Kos pendidikan', 'LEBIH LAJU'); row(lt, 2.0, 590, 'Daripada', 'KENAIKAN GAJI'); row(lt, 4.5, 740, 'Naik', 'SABAN TAHUN');
    stk(lt, .4, IMG.sKos, 540, SB, 600);
  }),
  Hh(30.5, 36.23, CH(2, 'Sekolah Rendah', 'Cuma Permulaan', null), 1, WC.ma),
  B(36.23, 43.35, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Kos Universiti', 100);
    row(lt, .8, 440, 'Sekolah rendah', 'CUMA PERMULAAN'); row(lt, 3.0, 590, 'Yuran pengajian tinggi', 'PULUHAN RIBU');
    stk(lt, .4, IMG.sSekolah, 540, SB, 620);
  }),
  Hh(43.35, 49.14, CH(3, 'Simpanan Tunai', 'Kalah Inflasi', null), -1, WC.ma),
  B(49.14, 55.9, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Kuasa Beli Susut', 96);
    row(lt, .8, 440, 'Duit tunai', 'DISIMPAN'); row(lt, 1.9, 590, 'Rugi', 'KUASA BELI');
    stk(lt, .4, IMG.sTunai, 540, SB, 620);
  }),
  Hh(55.9, 60.59, CH(4, 'Simpan Awal', 'Lebih Ringan', null), 1, WC.ma),
  B(60.59, 65.16, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Mula Awal', 100);
    row(lt, .8, 440, 'Simpanan awal', 'LEBIH RINGAN'); row(lt, 2.4, 590, 'Berbanding', 'ANAK MASUK UNIVERSITI');
    stk(lt, .4, IMG.sAwal, 540, SB, 620);
  }),
  Hh(65.16, 69.72, CH(5, 'Akaun Emas', 'Junior', null), -1, WC.ma),
  B(69.72, 79.57, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Tabung Emas Anak', 96);
    row(lt, .8, 440, 'Persediaan', 'BINA TABUNGAN'); row(lt, 3.5, 590, 'Tabungan', 'EMAS ANAK-ANAK'); row(lt, 6.2, 740, 'Tampung', 'PERBELANJAAN PELAJARAN');
    stk(lt, .4, IMG.sJunior, 540, SB, 600);
  }),
  B(79.57, 82.96, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Pelaburan Masa Depan', 84);
    anim(lt, 1.2, 540, 560, () => mWhite(130, 440, 820, ['Pendidikan anak', '*pelaburan masa depan mereka'], 50));
    stk(lt, .3, IMG.sAnak, 540, SB, 620);
  }),
  B(82.96, 89.81, 'merak5', WC.ma, (lt) => {
    ttl(lt, 'Impian Mereka', 100);
    row(lt, .8, 440, 'Jangan biar impian', 'TERHALANG'); row(lt, 3.4, 590, 'Kerana', 'KEKANGAN KEWANGAN');
    stk(lt, .4, IMG.sImpian, 540, SB, 620);
  }),
  B(89.81, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sSedia, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sMusim, IMG.sKos, IMG.sSekolah, IMG.sTunai, IMG.sAwal, IMG.sJunior, IMG.sAnak, IMG.sImpian, IMG.sSedia])), { nobk: true }),
];
