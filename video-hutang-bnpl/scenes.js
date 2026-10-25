// scenes.js — "5 Langkah Bebas Ketagihan Beli Dulu Bayar Kemudian" (99.75s + outro 6s). Gaya video-papercut.
const VOICE = 99.752925, DUR = VOICE + 6, HEADN = 2992;
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
const ASSETS = { ...PH, sHutang: 'stk-hutang.png', sHentikan: 'stk-hentikan.png', sDaftar: 'stk-daftar.png', sInstall: 'stk-install.png', sLogin: 'stk-login.png', sTopup: 'stk-topup.png', sKonsisten: 'stk-konsisten.png', sBerhenti: 'stk-berhenti.png', sDisiplin: 'stk-disiplin.png' };

// ---------- klip app (frame jpg dalam clip/<kunci>/%04d.jpg @30fps) ----------
const CLIPN = { daftar: 223, install: 241, login: 189, topup: 233, cut: 3000 };
const CLIPS = [];   // [{a, b, key, rate}] diisi oleh Cl()
let curClipImg = null;
window.loadClip = (t) => new Promise(res => {
  const c = CLIPS.find(c => t >= c.a && t < c.b); if (!c) { curClipImg = null; return res(); }
  const i = Math.max(1, Math.min(CLIPN[c.key], Math.floor((t - c.a) * c.rate * 30) + 1 + (c.off || 0))); const im = new Image();
  im.onload = () => { curClipImg = im; res(); }; im.onerror = () => res(); im.src = 'clip/' + c.key + '/' + String(i).padStart(4, '0') + '.' + (c.ext || 'jpg');
});
const phone = (lt, at) => anim(lt, at, 540, 712, () => {
  const w = 432, h = 768, x = 540 - w / 2, y = 328;
  shadow(() => { rr(x - 12, y - 12, w + 24, h + 24, 46); X.fillStyle = '#16090d'; X.fill(); }, 28, .55, 12);
  X.save(); rr(x, y, w, h, 34); X.clip(); X.fillStyle = '#fff'; X.fillRect(x, y, w, h); if (curClipImg) X.drawImage(curClipImg, x, y, w, h); X.restore();
});
// adegan B dengan klip app: telefon di tengah + sticker di bawah
const Cl = (a, b, bg, title, sticker, key, rate, size = 100, h = 360) => { CLIPS.push({ a, b, key, rate }); return B(a, b, bg, WC.ma, (lt) => { ttl(lt, title, size); phone(lt, .2); stk(lt, .5, IMG['s' + sticker[0].toUpperCase() + sticker.slice(1)], 540, SB, h); }); };

// ---------- OPENING: headline wall + badan paper-cut (garis putih) + pil glass di depan ----------
const glassPill = (label, cx, cy, size, tint = 'rgba(255,255,255,.16)') => {
  X.save(); X.font = `italic 800 ${size}px PP`; X.letterSpacing = '4px'; const tw_ = X.measureText(label).width, w = tw_ + size * 2.1, h = size * 2.1, x = cx - w / 2, y = cy - h / 2; X.restore();
  X.save(); rr(x, y, w, h, h / 2); X.clip(); X.filter = 'blur(18px) brightness(1.12) saturate(1.35)'; X.drawImage(X.canvas, 0, 0); X.filter = 'none';
  const g = X.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, 'rgba(255,255,255,.38)'); g.addColorStop(.5, tint); g.addColorStop(1, 'rgba(255,255,255,.08)'); X.fillStyle = g; X.fillRect(x, y, w, h);
  const hl = X.createLinearGradient(x, 0, x + w, 0); hl.addColorStop(0, 'rgba(255,255,255,0)'); hl.addColorStop(.5, 'rgba(255,255,255,.55)'); hl.addColorStop(1, 'rgba(255,255,255,0)'); X.fillStyle = hl; X.fillRect(x + h * .4, y + 3, w - h * .8, 2); X.restore();
  X.save(); rr(x + 1, y + 1, w - 2, h - 2, h / 2 - 1); X.lineWidth = 2.5; X.strokeStyle = 'rgba(255,255,255,.65)'; X.stroke(); X.restore();
  X.save(); X.font = `italic 800 ${size}px PP`; X.letterSpacing = '4px'; X.textAlign = 'center'; X.shadowColor = 'rgba(40,0,10,.55)'; X.shadowBlur = 10; X.shadowOffsetY = 3; X.fillStyle = '#fff'; X.fillText(label, cx + 2, cy + size * .36); X.restore();
};
const talkScene = (cfg) => (lt) => {
  const WALL = cfg.wall;
  const rg = X.createRadialGradient(540, 760, 120, 540, 960, 1250); rg.addColorStop(0, '#8E1B30'); rg.addColorStop(.6, '#661225'); rg.addColorStop(1, '#3A0914'); X.fillStyle = rg; X.fillRect(0, 0, W, H);
  // headline wall: baris tajuk berulang memenuhi dinding; 2 baris atas pepejal, selebihnya garis (makin pudar ke bawah)
  X.save(); X.font = '150px AN'; X.letterSpacing = '3px'; const mw = Math.max(...WALL.map(t => X.measureText(t).width)); X.restore();   // auto-fit: baris terpanjang muat 1000px
  const SZ = Math.min(150, Math.floor(150 * 1000 / mw)), PITCH = Math.round(SZ * 1.1);
  for (let i = 0; i < 12; i++) {
    const txt_ = WALL[i % 2], base = 105 + SZ + i * PITCH, dir = i % 2 ? 1 : -1, p = clamp((lt - i * .06) / .5), e = 1 - Math.pow(1 - p, 3);
    const sway = Math.sin(lt * 1.1 + i * .9) * 14, x = 540 + dir * (1 - e) * 520 + sway;
    X.save(); X.globalAlpha = e; X.font = `${SZ}px AN`; X.textAlign = 'center'; X.lineJoin = 'round'; X.letterSpacing = '3px';
    if (i < 2) {
      X.shadowColor = 'rgba(0,0,0,.5)'; X.shadowBlur = 20; X.shadowOffsetY = 10; X.lineWidth = 14; X.strokeStyle = '#26050d'; X.strokeText(txt_, x, base); X.shadowColor = 'transparent';
      if (i === 0) { const gg = X.createLinearGradient(0, base - SZ * .75, 0, base); gg.addColorStop(0, '#FFF1B8'); gg.addColorStop(.5, '#FFD34D'); gg.addColorStop(1, '#E8A91C'); X.fillStyle = gg; } else X.fillStyle = '#fff';
      X.fillText(txt_, x, base);
    } else { X.lineWidth = 3.5; X.strokeStyle = `rgba(255,255,255,${Math.max(.09, .36 - (i - 2) * .035)})`; X.strokeText(txt_, x, base); }
    X.restore();
  }
  // badan paper-cut: garis putih (dibakar dalam PNG) + bayang jatuh
  if (curClipImg) {
    const pop = back(clamp(lt / .55)), sc = .94 * (.9 + .1 * pop);
    X.save(); X.globalAlpha = clamp(lt / .12); X.translate(540, 1920); X.scale(sc, sc); X.translate(-540, -1920);
    X.shadowColor = 'rgba(20,0,6,.6)'; X.shadowBlur = 34; X.shadowOffsetY = 18; X.drawImage(curClipImg, 0, 0, W, H); X.restore();
  }
  // tajuk kecil: kaca (glass) di depan
  anim(lt, .45, 540, 120, () => glassPill(cfg.tag, 540, 62, 38));
  anim(lt, .8, 540, 1230, () => glassPill(cfg.sub, 540, 1235, 40));
};
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'CARA');
const SEG = [
  [0, 4.6, '*5 *langkah *bebas *ketagihan beli dahulu bayar kemudian.'],
  [4.6, 6.66, 'Asyik *terperangkap dengan *hutang'],
  [6.66, 8.31, 'beli dulu bayar kemudian,'],
  [8.31, 10.99, 'sampai tiada satu sen pun untuk'],
  [10.99, 15.5, 'wang simpanan. Pesan guru emas saya, *hentikan *tabiat *berhutang barang remeh'],
  [15.5, 21.96, 'dan *bina *aset *sebenar melalui *lima *langkah'],
  [21.96, 26.25, 'untuk simpan emas di *Public *Gold.'],
  [26.25, 28.94, 'Yang *pertama, *daftar akaun *percuma.'],
  [28.94, 33.62, 'Tuan puan boleh rujuk *pin *video saya ataupun klik link di bawah.'],
  [33.62, 36.46, 'Yang *kedua, tuan puan sebenarnya dah boleh'],
  [36.46, 38.24, '*install apps Public Gold'],
  [38.24, 42.65, 'dan boleh gunakan app tersebut untuk mula menabung emas.'],
  [42.65, 48.51, 'Yang *ketiga, nak masuk ke dalam app tersebut, gunakan *IC sendiri sebagai *username'],
  [48.51, 50.35, 'dan password sementara.'],
  [50.35, 53.97, 'Pastikan masukkan nombor IC *tanpa *dash.'],
  [53.97, 58.45, 'Yang *keempat, tuan puan sebenarnya dah boleh *beli *emas dalam app tersebut.'],
  [58.45, 65.08, 'Tuan puan boleh mulakan dengan *serendah *RM100 ataupun jika mampu boleh bermula dengan *gram yang tuan puan'],
  [65.08, 69.74, 'inginkan. Nanti tuan puan akan terima terus *gram *emas di dalam akaun sendiri.'],
  [69.74, 72.67, 'Dan yang *kelima, *konsisten tambah tabungan.'],
  [72.67, 76.59, 'Tuan puan sebenarnya boleh tambah bila-bila ada duit boleh tambah,'],
  [76.59, 82.31, 'tak ada duit boleh skip. Jadi *berhenti *mengikat *gaji masa depan dengan *hutang hari ini.'],
  [82.31, 88.51, 'Sebab hakikatnya *hutang ialah kita membelanjakan pendapatan yang kita masih belum dapat.'],
  [88.51, 91.96, '*Bina *disiplin untuk kumpul *aset *emas, gunakan apps Public Gold'],
  [91.96, 94.9, 'supaya gaji tuan puan'],
  [94.9, 99.75, 'menjadi *simpanan. *Dulu *ragu, *kini *tahu, jom mulakan *simpanan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 4.6, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 4.6, 'tiers', WC.ma, talkScene({ wall: ['BELI DULU', 'BAYAR KEMUDIAN'], tag: '5  LANGKAH', sub: 'BEBAS DARIPADA KETAGIHAN' })), { nobk: true })),
  B(4.6, 10.99, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Terperangkap Hutang', 92);
    row(lt, 0.4, 440, 'Beli dulu', 'BAYAR KEMUDIAN'); row(lt, 3.8, 590, 'Tiada satu sen', 'UNTUK SIMPANAN');
    stk(lt, .4, IMG.sHutang, 540, SB, 600);
  }),
  B(10.99, 26.25, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Hentikan Tabiat Berhutang', 80);
    row(lt, 0.5, 440, 'Barang remeh', 'HENTIKAN BERHUTANG'); row(lt, 4.5, 590, 'Bina', 'ASET SEBENAR'); row(lt, 10.0, 740, '5 langkah simpan emas', 'PUBLIC GOLD');
    stk(lt, .4, IMG.sHentikan, 540, SB, 600);
  }),
  Cl(26.25, 33.62, 'merak100', 'Daftar Percuma', 'daftar', 'daftar', 1.0, 100),
  Cl(33.62, 42.65, 'bunga50', 'Pasang App Public Gold', 'install', 'install', 0.9, 86),
  Cl(42.65, 53.97, 'syiling', 'Log Masuk Guna IC', 'login', 'login', 0.6, 92),
  Cl(53.97, 65.08, 'g250', 'Topup Serendah RM100', 'topup', 'topup', 0.7, 86),
  B(65.08, 69.74, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Terima Terus', 100);
    row(lt, 0.4, 440, 'Terima terus', 'GRAM EMAS');
    stk(lt, .4, IMG.sTopup, 540, SB, 600);
  }),
  B(69.74, 76.59, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Konsisten Tambah', 96);
    row(lt, 0.4, 440, 'Ada duit', 'BOLEH TAMBAH'); row(lt, 3.0, 590, 'Tak ada duit', 'BOLEH SKIP');
    stk(lt, .4, IMG.sKonsisten, 540, SB, 600);
  }),
  B(76.59, 88.51, 'shop', WC.ma, (lt) => {
    ttl(lt, 'Berhenti Ikat Gaji', 96);
    row(lt, 0.4, 440, 'Berhenti ikat', 'GAJI MASA DEPAN'); row(lt, 5.7, 590, 'Hutang ialah', 'BELANJA DUIT BELUM DAPAT');
    stk(lt, .4, IMG.sBerhenti, 540, SB, 600);
  }),
  (CLIPS.push({ a: 88.51, b: 91.96, key: 'cut', rate: 1, ext: 'webp', off: 2655 }), Object.assign(B(88.51, 91.96, 'tiers', WC.ma, talkScene({ wall: ['BINA DISIPLIN', 'KUMPUL ASET EMAS'], tag: 'KESIMPULAN', sub: 'GUNA APPS PUBLIC GOLD' })), { nobk: true })),
  B(91.96, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sDisiplin, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sHutang, IMG.sHentikan, IMG.sDaftar, IMG.sInstall, IMG.sLogin, IMG.sTopup, IMG.sKonsisten, IMG.sBerhenti, IMG.sDisiplin])), { nobk: true }),
];
