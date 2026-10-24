// scenes.js — "5 Langkah Selamatkan Gaji Yang Selalu Licin Awal" (97.83s + outro 6s). Gaya video-papercut.
const VOICE = 97.825669, DUR = VOICE + 6, HEADN = 2934;
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
const ASSETS = { ...PH, sGajibaru: 'stk-gajibaru.png', sJom: 'stk-jom.png', sDaftar: 'stk-daftar.png', sInstall: 'stk-install.png', sLogin: 'stk-login.png', sTopup: 'stk-topup.png', sKumpul: 'stk-kumpul.png', sUbah: 'stk-ubah.png', sSelamat: 'stk-selamat.png' };

// ---------- klip app (frame jpg dalam clip/<kunci>/%04d.jpg @30fps) ----------
const CLIPN = { daftar: 223, install: 241, login: 189, topup: 233, withdraw: 289, cut: 3000 };
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
  [0, 3.53, '*5 *langkah *selamatkan *gaji yang selalu *licin awal.'],
  [3.53, 9.41, 'Baru *15 *hari tapi baki gaji dalam bank dah *kering kontang, tak tahu pergi ke mana.'],
  [9.41, 15.19, 'Pesan guru emas saya, selamatkan gaji anda daripada terus *bocor dengan *5 *langkah mudah ini'],
  [15.19, 17.56, 'untuk simpan emas di *Public *Gold.'],
  [17.56, 21.93, '*Pertama, tuan puan boleh buka *akaun emas secara *percuma sahaja,'],
  [21.93, 23.79, 'tiada apa-apa caj.'],
  [23.79, 26.42, 'Yang *kedua, selesai daftar akaun,'],
  [26.42, 28.98, 'boleh *install *apps Public Gold'],
  [28.98, 33.64, 'dan tuan puan ada apps yang boleh gunakan untuk menabung emas.'],
  [33.64, 36.4, '*Ketiga, bagaimana nak *log *in dalam apps?'],
  [36.4, 40.63, 'Untuk pertama sekali, tuan puan boleh gunakan nombor *IC tanpa dash'],
  [40.63, 43.27, 'sebagai password dan juga username.'],
  [43.27, 46.17, 'Dan *keempat, tuan puan dah berjaya log in,'],
  [46.17, 49.53, 'tuan puan terima nombor *TAC dalam telefon sendiri.'],
  [49.53, 55.59, 'Kemudian tuan puan dah boleh mulakan simpanan emas *serendah *RM100 ataupun *1 *gram'],
  [55.59, 57.45, 'untuk aktifkan akaun.'],
  [57.45, 63.75, 'Bila akaun dah aktif, tuan puan akan terima *PG *Code iaitu username official tuan puan di Public Gold.'],
  [63.75, 67.22, 'Dan yang *kelima, kekal *konsisten tambah tabungan emas.'],
  [67.22, 70.4, 'Setiap kali beli emas, *gram emas tuan puan akan *bertambah.'],
  [70.4, 73.8, 'Di dalam app tersebut, tuan puan bukan sekadar boleh *beli emas,'],
  [73.8, 75.57, 'kita boleh *jual balik emas,'],
  [75.57, 78.05, 'kita boleh *keluarkan emas fizikal.'],
  [78.05, 83.32, 'Ia adalah aplikasi simpanan emas berasaskan emas fizikal yang mudah,'],
  [83.32, 85.32, '*selamat dan *patuh *syariah.'],
  [85.32, 90.22, 'Jadi *selamatkan *gaji daripada terbuang, ataupun tak tahu hilang ke mana,'],
  [90.22, 92.26, 'tukarkan menjadi *gram *emas.'],
  [92.26, 97.83, 'Tuan puan yang dah ready boleh buka akaun emas. *Dulu *ragu, *kini *tahu. Jom mulakan *simpanan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 3.53, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 3.53, 'tiers', WC.ma, talkScene({ wall: ['GAJI LICIN', '15 HARI'], tag: '5  LANGKAH', sub: 'SELAMATKAN GAJI ANDA' })), { nobk: true })),
  B(3.53, 9.41, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Gaji Baru 15 Hari', 92);
    row(lt, 0.4, 440, 'Baru 15 hari', 'BAKI GAJI KERING'); row(lt, 3.6, 590, 'Tak tahu', 'PERGI KE MANA');
    stk(lt, .4, IMG.sGajibaru, 540, SB, 600);
  }),
  B(9.41, 17.56, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Selamatkan Gaji', 96);
    row(lt, 0.5, 440, 'Gaji anda', 'JANGAN TERUS BOCOR'); row(lt, 4.0, 590, '5 langkah mudah', 'SIMPAN EMAS PUBLIC GOLD');
    stk(lt, .4, IMG.sJom, 540, SB, 600);
  }),
  Cl(17.56, 23.79, 'merak100', 'Daftar Percuma', 'daftar', 'daftar', 1.2, 100),
  Cl(23.79, 33.64, 'bunga50', 'Pasang App Public Gold', 'install', 'install', 0.82, 86),
  Cl(33.64, 43.27, 'syiling', 'Log Masuk & TAC', 'login', 'login', 0.7, 92),
  Cl(43.27, 55.59, 'g250', 'Topup RM100 / 1 Gram', 'topup', 'topup', 0.65, 86),
  B(55.59, 63.75, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Akaun Aktif', 100);
    row(lt, 0.4, 440, 'Akaun aktif', 'TERIMA PG CODE'); row(lt, 3.0, 590, 'PG Code', 'USERNAME OFFICIAL');
    stk(lt, .4, IMG.sTopup, 540, SB, 600);
  }),
  B(63.75, 70.4, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Konsisten Tambah', 100);
    row(lt, 0.4, 440, 'Setiap kali beli emas', 'GRAM BERTAMBAH');
    stk(lt, .4, IMG.sKumpul, 540, SB, 600);
  }),
  Cl(70.4, 78.05, 'shop', 'Beli, Jual, Keluarkan', 'jom', 'withdraw', 1.0, 84),
  B(78.05, 85.32, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Mudah & Selamat', 96);
    row(lt, 0.4, 440, 'Berasaskan', 'EMAS FIZIKAL'); row(lt, 3.8, 590, 'Selamat', 'PATUH SYARIAH');
    stk(lt, .4, IMG.sSelamat, 540, SB, 600);
  }),
  (CLIPS.push({ a: 85.32, b: 90.22, key: 'cut', rate: 1, ext: 'webp', off: 2560 }), Object.assign(B(85.32, 90.22, 'tiers', WC.ma, talkScene({ wall: ['SELAMATKAN GAJI', 'HARI INI'], tag: 'KESIMPULAN', sub: 'TUKARKAN MENJADI GRAM EMAS' })), { nobk: true })),
  B(90.22, 92.26, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Jadi Gram Emas', 100);
    
    stk(lt, .4, IMG.sUbah, 540, SB, 680);
  }),
  B(92.26, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sJom, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sGajibaru, IMG.sJom, IMG.sDaftar, IMG.sInstall, IMG.sLogin, IMG.sTopup, IMG.sKumpul, IMG.sUbah, IMG.sSelamat])), { nobk: true }),
];
