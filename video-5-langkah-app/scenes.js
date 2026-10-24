// scenes.js — "5 Langkah Rawat Tangan Gatal Guna Simpanan Emas" (84.85s + outro 6s). Maroon-emas + sticker + klip app Public Gold. SFX minimum (lihat mix_sfx.sh).
const VOICE = 84.845714, DUR = VOICE + 6, HEADN = 2545;
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
  anim(lt, 1.2, 540, 640, () => { shadow(() => { rr(180, 590, 720, 110, 55); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Daftar Percuma', 540, 618, MA.F.h(54), '#fff', 'center'); });
  stk(lt, .6, hero, 540, SB, h);
};
const BAKE = ['tiers', 'kg', 'dulang', 'merak100', 'bunga50', 'syiling', 'g250', 'dinarPantai', 'shop', 'ipad', 'binder', 'bungamas', 'wallet', 'merak5'];
function bakeAll() { BAKE.forEach(k => { BGS[k] = MA.bgPhoto(k, 16, .45); }); }
const ASSETS = { ...PH, sGatal: 'stk-gatal.png', sJom: 'stk-jom.png', sDaftar: 'stk-daftar.png', sInstall: 'stk-install.png', sLogin: 'stk-login.png', sTopup: 'stk-topup.png', sTambah: 'stk-tambah.png', sTebus: 'stk-tebus.png', sRumah: 'stk-rumah.png' };

// ---------- klip app (frame jpg dalam clip/<kunci>/%04d.jpg @30fps) ----------
const CLIPN = { daftar: 223, install: 241, login: 189, topup: 233, withdraw: 289 };
const CLIPS = [];   // [{a, b, key, rate}] diisi oleh Cl()
let curClipImg = null;
window.loadClip = (t) => new Promise(res => {
  const c = CLIPS.find(c => t >= c.a && t < c.b); if (!c) { curClipImg = null; return res(); }
  const i = Math.max(1, Math.min(CLIPN[c.key], Math.floor((t - c.a) * c.rate * 30) + 1)); const im = new Image();
  im.onload = () => { curClipImg = im; res(); }; im.onerror = () => res(); im.src = 'clip/' + c.key + '/' + String(i).padStart(4, '0') + '.jpg';
});
const phone = (lt, at) => anim(lt, at, 540, 712, () => {
  const w = 432, h = 768, x = 540 - w / 2, y = 328;
  shadow(() => { rr(x - 12, y - 12, w + 24, h + 24, 46); X.fillStyle = '#16090d'; X.fill(); }, 28, .55, 12);
  X.save(); rr(x, y, w, h, 34); X.clip(); X.fillStyle = '#fff'; X.fillRect(x, y, w, h); if (curClipImg) X.drawImage(curClipImg, x, y, w, h); X.restore();
});
// adegan B dengan klip app: telefon di tengah + sticker di bawah
const Cl = (a, b, bg, title, sticker, key, rate, size = 100, h = 360) => { CLIPS.push({ a, b, key, rate }); return B(a, b, bg, WC.ma, (lt) => { ttl(lt, title, size); phone(lt, .2); stk(lt, .5, IMG['s' + sticker[0].toUpperCase() + sticker.slice(1)], 540, SB, h); }); };
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'CARA');
const SEG = [
  [0, 1.63, '*5 *langkah rawat'],
  [1.63, 6.63, '*tangan *gatal guna *simpanan *emas. Pantang nampak baki duit dalam akaun bank,'],
  [6.63, 9.21, 'tangan mula gatal nak tekan *beli barang.'],
  [9.21, 11.33, 'Pesan *guru *emas saya, rawat'],
  [11.33, 14.14, 'penyakit *tangan *gatal ini dengan *lima *langkah'],
  [14.14, 15.99, 'simpanan emas di *Public *Gold.'],
  [15.99, 19.05, '*Pertama, *daftar akaun *percuma'],
  [19.05, 22.65, 'melalui link yang saya kongsikan di bawah.'],
  [22.65, 26.95, 'Yang *kedua, tuan puan dah boleh *memuat *turun aplikasi rasmi Public Gold'],
  [26.95, 30.2, 'di telefon sendiri yang berfungsi seperti'],
  [30.2, 32.85, '*kedai *emas *peribadi di dalam poket anda.'],
  [32.85, 36.32, 'Yang *ketiga, tuan puan dah boleh *log *masuk ke dalam aplikasi'],
  [36.32, 39.02, 'menggunakan nombor *IC sendiri tanpa dash'],
  [39.02, 43.23, 'dan masukkan kod *TAC untuk pengesahan keselamatan.'],
  [43.23, 45.38, '*Keempat, tuan puan boleh'],
  [45.38, 47.74, '*top *up simpanan emas serendah *RM100'],
  [47.74, 51.46, 'ataupun *1 *gram dan nanti akan terima *PG *code sendiri'],
  [51.46, 56.53, 'melalui e-mel. Dan yang *kelima, *konsisten menambah *gram *emas,'],
  [56.53, 59.3, 'serta bebas untuk tukarkan gram emas'],
  [59.3, 61.03, 'kepada item *fizikal.'],
  [61.03, 62.63, 'Tak perlu nak ke cawangan,'],
  [62.63, 65.81, '*stay di *rumah sahaja boleh kumpul emas fizikal.'],
  [65.81, 69.92, 'Jadi tuan puan, *kunci *duit daripada *tangan *gatal daripada terus terbelanja.'],
  [69.92, 72.63, 'Simpan emas di Public Gold sangat *mudah untuk semua,'],
  [72.63, 75.4, '*selamat, *patuh *syariah dan juga mudah.'],
  [75.4, 77.48, 'Jadi untuk tuan puan yang dah'],
  [77.48, 79.17, 'bersedia, boleh *daftar akaun *percuma'],
  [79.17, 81.68, 'dan mulakan *simpanan *emas anda hari ini.'],
  [81.68, 84.85, '*Dulu *ragu, *kini *tahu. Jom mulakan *simpan *emas.'],
];
const SCENES = [
  Hh(0, 6.63, (lt) => { const out = clamp((lt - 6.1) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: '5 LANGKAH', lines: ['TANGAN GATAL?', 'SIMPAN EMAS'], sub: 'RAWAT DENGAN 5 LANGKAH' }); X.restore(); }, 1, WC.ma),
  B(6.63, 11.33, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Tangan Gatal?', 96);
    row(lt, 0.3, 440, 'Tangan mula gatal', 'NAK BELI BARANG'); row(lt, 2.6, 590, 'Pesan guru emas', 'RAWAT TANGAN GATAL');
    stk(lt, .4, IMG.sGatal, 540, SB, 600);
  }),
  B(11.33, 15.99, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Rawat 5 Langkah', 96);
    row(lt, 0.3, 440, 'Simpanan emas di', 'PUBLIC GOLD');
    stk(lt, .4, IMG.sJom, 540, SB, 600);
  }),
  Cl(15.99, 22.65, 'merak100', 'Daftar Percuma', 'daftar', 'daftar', 1.12),
  Cl(22.65, 32.85, 'bunga50', 'Muat Turun App', 'install', 'install', .79),
  Cl(32.85, 45.38, 'syiling', 'Log Masuk & TAC', 'login', 'login', .8, 92),
  Cl(45.38, 51.46, 'g250', 'Topup RM100', 'topup', 'topup', 1.28),
  B(51.46, 56.53, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Tambah Gram', 100);
    row(lt, 0.5, 440, 'Konsisten menambah', 'GRAM EMAS');
    stk(lt, .4, IMG.sTambah, 540, SB, 600);
  }),
  Cl(56.53, 62.63, 'binder', 'Tukar Ke Fizikal', 'tebus', 'withdraw', 1.0, 96),
  B(62.63, 65.81, 'shop', WC.ma, (lt) => {
    ttl(lt, 'Dari Rumah', 100);
    
    stk(lt, .4, IMG.sRumah, 540, SB, 680);
  }),
  Hh(65.81, 69.92, (lt) => MA.chapter(lt, '', 'Kunci Duit', 'Tangan Gatal', null, 'KESIMPULAN'), -1, WC.ma),
  B(69.92, 77.48, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Mudah Untuk Semua', 92);
    row(lt, 0.5, 440, 'Simpan emas', 'SANGAT MUDAH'); row(lt, 2.7, 590, 'Selamat', 'PATUH SYARIAH');
    stk(lt, .4, IMG.sJom, 540, SB, 600);
  }),
  B(77.48, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sRumah, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sGatal, IMG.sJom, IMG.sDaftar, IMG.sInstall, IMG.sLogin, IMG.sTopup, IMG.sTambah, IMG.sTebus, IMG.sRumah])), { nobk: true }),
];
