// scenes.js — "Harga Emas Pernah RM764, Kini RM571: Panik Atau Tambah Simpanan?" (181.93s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
const VOICE = 181.928345, DUR = VOICE + 6, HEADN = 5458;
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
  anim(lt, 1.2, 540, 640, () => { shadow(() => { rr(180, 590, 720, 110, 55); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Rujuk Pin Video', 540, 618, MA.F.h(54), '#fff', 'center'); });
  stk(lt, .6, hero, 540, SB, h);
};
const BAKE = ['tiers', 'kg', 'dulang', 'merak100', 'bunga50', 'syiling', 'g250', 'dinarPantai', 'shop', 'ipad', 'binder', 'bungamas', 'wallet', 'merak5'];
function bakeAll() { BAKE.forEach(k => { BGS[k] = MA.bgPhoto(k, 16, .45); }); }
const ASSETS = { ...PH, sPanik: 'stk-panik.png', sJatuh: 'stk-jatuh.png', sMatlamat: 'stk-matlamat.png', sDuatahun: 'stk-duatahun.png', sDca: 'stk-dca.png', sGram: 'stk-gram.png', sNilai: 'stk-nilai.png', sMulakan: 'stk-mulakan.png', sBijak: 'stk-bijak.png' };
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'CARA');
const SEG = [
  [0, 4.5, 'Harga emas pernah *cecah *RM764 pada *awal *2026.'],
  [4.5, 8.6, 'Kini harga emas berlegar sekitar *RM571 segram.'],
  [8.6, 12.03, 'Masa untuk *panik, ataupun *tambah *simpanan?'],
  [12.03, 16.75, 'Bila kita tengok harga emas jatuh macam ni, saya percaya ramai yang mula *gelisah.'],
  [16.75, 20.8, 'Ada yang risau sebab nilai simpanan nampak semakin *berkurangan.'],
  [20.8, 25.47, 'Ada juga yang memilih untuk *tunggu dulu, berharap harga emas akan'],
  [25.47, 31.0, 'turun lebih rendah. Sekadar berkongsi *pesan *guru saya,'],
  [31.0, 36.81, '"*Reaksi kita apabila harga emas jatuh sebenarnya bergantung kepada *posisi kita terhadap emas."'],
  [36.81, 41.63, '*Pertama, posisi *penyimpan ataupun *pelabur emas.'],
  [41.63, 49.24, 'Bagi pelabur jangka pendek, harga jatuh mungkin sesuatu yang *membimbangkan kerana mereka fokus kepada pergerakan harga.'],
  [49.24, 58.34, 'Tapi bagi penyimpan emas yang ada *matlamat *jangka *panjang, harga turun boleh menjadi *peluang untuk tambah simpanan pada harga lebih rendah.'],
  [58.34, 63.66, 'Sebab itu penting untuk kita faham *kenapa kita menyimpan emas dari awal.'],
  [63.66, 66.46, '*Kedua, simpan emas mesti ada *matlamat.'],
  [66.46, 70.69, 'Kita bukan beli emas semata-mata sebab nak tengok harganya *naik.'],
  [70.69, 75.14, 'Emas hanyalah *alat untuk membantu kita capai *matlamat *kewangan.'],
  [75.14, 81.83, 'Contoh, matlamat untuk *dana *pendidikan anak-anak, *deposit *rumah, ataupun *haji,'],
  [81.83, 84.13, 'ataupun keperluan *masa *depan.'],
  [84.13, 90.4, 'Bila kita jelas dengan matlamat, kita tak mudah terbawa-bawa dengan *emosi setiap kali harga berubah.'],
  [90.4, 95.5, 'Yang *ketiga, beri masa *sekurang-kurangnya *dua *tahun ke atas, lagi lama lagi baik.'],
  [95.5, 100.55, 'Kalau setiap hari kita tengok *graf, memang mudah untuk kita rasa risau.'],
  [100.55, 104.09, 'Hari ini naik kita gembira, esok turun kita *gelisah.'],
  [104.09, 110.18, 'Sasaran *dua *tahun ke atas boleh dijadikan panduan untuk simpanan jangka masa sederhana dan panjang.'],
  [110.18, 114.58, '*Keempat, gunakan teknik *DCA, *Dollar *Cost *Averaging.'],
  [114.58, 120.66, 'Hakikatnya, tiada siapa pun tahu dengan tepat bila harga emas akan berada di *paras *paling *rendah.'],
  [120.66, 127.69, 'Sebab itu, daripada terlalu sibuk menekan harga, kita amalkan *belian *emas secara *konsisten setiap bulan.'],
  [127.69, 133.0, 'Contohnya di *GAP *Public *Gold, kita simpan sekitar *100 - *200 setiap bulan,'],
  [133.0, 137.52, 'akhirnya nanti kita akan dapat *harga *purata emas sepanjang tahun.'],
  [137.52, 142.1, 'Dan *kelima, *fokus pada *gram, bukan semata-mata nilai ringgit.'],
  [142.1, 146.8, 'Ini antara perkara penting yang selalu ditekankan dalam ilmu simpanan emas.'],
  [146.8, 152.02, 'Bila kita asyik fokus pada nilai harga naik turun emas,'],
  [152.02, 154.71, 'kita tak sedar, *gram emas kita *tak *bertambah.'],
  [154.71, 161.16, 'Jadi jangan sampai terlalu sibuk memikirkan harga tanpa *menambah simpanan *gram emas.'],
  [161.16, 167.23, 'Kalau selama ni kita asyik tangguh sebab rasa duit tak cukup, sebenarnya kita boleh bermula *sikit *demi *sedikit.'],
  [167.23, 174.2, 'Di GAP Public Gold, tuan puan yang belum memulakan simpan emas boleh mulakan dengan serendah *1 *gram ataupun *RM100.'],
  [174.2, 176.97, 'Untuk tuan puan yang ready nak mulakan *simpan *emas,'],
  [176.97, 181.93, 'boleh rujuk *pin *video saya. *Dulu *ragu, *kini *tahu. Jom mulakan *simpan *emas!'],
];
const SCENES = [
  Hh(0, 8.6, (lt) => { const out = clamp((lt - 8.1) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'HARGA EMAS', lines: ['PERNAH RM764', 'KINI RM571'], sub: 'PANIK ATAU TAMBAH SIMPANAN?' }); X.restore(); }, 1, WC.ma),
  B(8.6, 25.47, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Panik Atau Tambah?', 90);
    row(lt, 3.5, 440, 'Harga emas jatuh', 'RAMAI GELISAH'); row(lt, 8.2, 590, 'Nilai simpanan', 'BERKURANGAN'); row(lt, 12.2, 740, 'Ada yang', 'TUNGGU DULU');
    stk(lt, .4, IMG.sPanik, 540, SB, 600);
  }),
  B(25.47, 36.81, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Pesan Guru', 100);
    anim(lt, 1.0, 540, 600, () => mWhite(130, 440, 820, ['Reaksi kita bergantung', '*pada posisi kita', 'terhadap emas'], 50));
  }),
  Hh(36.81, 41.0, CH(1, 'Penyimpan Atau', 'Pelabur Emas', null), -1, WC.ma),
  B(41.0, 49.24, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Pelabur Jangka Pendek', 80);
    row(lt, 0.6, 440, 'Harga jatuh', 'MEMBIMBANGKAN'); row(lt, 4.6, 590, 'Fokus pada', 'PERGERAKAN HARGA');
    stk(lt, .4, IMG.sPanik, 540, SB, 600);
  }),
  B(49.24, 63.66, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Penyimpan Emas', 100);
    row(lt, 1.0, 440, 'Matlamat jangka panjang', 'HARGA TURUN = PELUANG'); row(lt, 5.5, 590, 'Tambah simpanan', 'HARGA LEBIH RENDAH'); row(lt, 9.1, 740, 'Faham kenapa', 'KITA SIMPAN EMAS');
    stk(lt, .4, IMG.sJatuh, 540, SB, 560);
  }),
  Hh(63.66, 67.0, CH(2, 'Simpan Emas', 'Ada Matlamat', null), 1, WC.ma),
  B(67.0, 90.4, 'merak5', WC.ma, (lt) => {
    ttl(lt, 'Emas Alat Matlamat', 90);
    row(lt, 0.5, 440, 'Bukan sekadar', 'TENGOK HARGA NAIK'); row(lt, 4.0, 590, 'Emas alat capai', 'MATLAMAT KEWANGAN'); row(lt, 9.0, 740, 'Pendidikan anak', 'RUMAH & HAJI');
    stk(lt, .4, IMG.sMatlamat, 540, SB, 600);
  }),
  Hh(90.4, 94.5, CH(3, 'Beri Masa', 'Dua Tahun Ke Atas', null), -1, WC.ma),
  B(94.5, 110.18, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Beri Masa', 100);
    row(lt, 3.2, 440, 'Tengok graf', 'SETIAP HARI'); row(lt, 6.2, 590, 'Naik gembira', 'TURUN GELISAH'); row(lt, 10.2, 740, 'Sasaran', '2 TAHUN KE ATAS');
    stk(lt, .4, IMG.sDuatahun, 540, SB, 600);
  }),
  Hh(110.18, 114.0, CH(4, 'Teknik DCA', 'Beli Konsisten', null), 1, WC.ma),
  B(114.0, 137.52, 'bungamas', WC.ma, (lt) => {
    ttl(lt, 'Beli Konsisten', 100);
    row(lt, 0.6, 440, 'Tiada siapa tahu', 'PARAS TERENDAH'); row(lt, 6.5, 590, 'Beli emas', 'SETIAP BULAN'); row(lt, 13.7, 740, 'Simpan sekitar', 'RM100 - RM200');
    stk(lt, .4, IMG.sDca, 540, SB, 600);
  }),
  Hh(137.52, 141.5, CH(5, 'Fokus Pada Gram', 'Bukan Ringgit', null), -1, WC.ma),
  B(141.5, 154.71, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Fokus Pada Gram', 100);
    row(lt, 5.0, 440, 'Asyik fokus harga', 'NAIK TURUN'); row(lt, 11.0, 590, 'Gram emas', 'TAK BERTAMBAH');
    stk(lt, .4, IMG.sGram, 540, SB, 600);
  }),
  B(154.71, 167.23, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Tambah Gram', 100);
    row(lt, 0.5, 440, 'Jangan fikir harga', 'TANPA TAMBAH GRAM'); row(lt, 6.8, 590, 'Rasa duit', 'TAK CUKUP'); row(lt, 9.5, 740, 'Bermula', 'SIKIT DEMI SEDIKIT');
    stk(lt, .4, IMG.sNilai, 540, SB, 600);
  }),
  B(167.23, 174.2, 'shop', WC.ma, (lt) => {
    ttl(lt, 'Mula Serendah RM100', 84);
    row(lt, 2.2, 440, 'Serendah', '1 GRAM / RM100');
    stk(lt, .4, IMG.sMulakan, 540, SB, 600);
  }),
  B(174.2, VOICE, 'bunga50', WC.ma, (lt) => CTA(lt, IMG.sBijak, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sPanik, IMG.sJatuh, IMG.sMatlamat, IMG.sDuatahun, IMG.sDca, IMG.sGram, IMG.sNilai, IMG.sMulakan, IMG.sBijak])), { nobk: true }),
];
