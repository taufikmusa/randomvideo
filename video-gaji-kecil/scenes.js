// scenes.js — "5 Langkah Mula Simpan Emas Walaupun Gaji Kecil" (89.30s + outro 6s). Gaya video-papercut.
const VOICE = 89.303946, DUR = VOICE + 6, HEADN = 2679;
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
const ASSETS = { ...PH, sGajikecil: 'stk-gajikecil.png', sJom: 'stk-jom.png', sDaftar: 'stk-daftar.png', sInstall: 'stk-install.png', sLogin: 'stk-login.png', sBeli: 'stk-beli.png', sKonsisten: 'stk-konsisten.png', sTunggu: 'stk-tunggu.png', sMula: 'stk-mula.png' };

// ---------- klip app (frame jpg dalam clip/<kunci>/%04d.jpg @30fps) ----------
const CLIPN = { daftar: 223, install: 241, login: 189, topup: 233, withdraw: 289, cut: 2600 };
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
  [0, 4.08, '*5 *langkah mula *simpan *emas walaupun *gaji masih tak besar mana.'],
  [4.08, 10.6, 'Rasa mustahil kadang-kadang nak simpan emas ni sebab *gaji *kecil dan selalu tak cukup sampai *hujung *bulan.'],
  [10.6, 12.62, 'Guru emas saya selalu berpesan,'],
  [12.62, 15.8, 'dalam simpanan emas, kita mesti *bermula walaupun *sedikit.'],
  [15.8, 21.61, 'Orang yang bergaji kecil pun sebenarnya mampu untuk kumpul emas melalui *lima *langkah mudah ini.'],
  [21.61, 24.78, '*Pertama, buka *akaun emas secara *percuma.'],
  [24.78, 27.53, '*Kedua, bila mana dah buka akaun emas,'],
  [27.53, 29.52, 'boleh *install *apps Public Gold.'],
  [29.52, 35.39, '*Ketiga, *log *in dalam apps tersebut menggunakan nombor *IC sendiri tanpa dash.'],
  [35.39, 38.55, 'Dan *keempat, bila mana tuan puan dah berjaya log in,'],
  [38.55, 40.41, 'tuan puan akan terima nombor *TAC'],
  [40.41, 46.42, 'untuk pengesahan. Tuan puan boleh top up simpanan emas untuk aktifkan akaun di Public Gold.'],
  [46.42, 50.64, 'Boleh top up simpanan emas *serendah *RM100 ataupun *1 *gram jika mampu.'],
  [50.64, 54.97, 'Nanti tuan puan, baki emas tuan puan akan kelihatan di dalam app tersebut.'],
  [54.97, 58.92, 'Dan *tiada *komitmen untuk simpan bulan-bulan.'],
  [58.92, 62.57, 'Namun jika tuan puan nak pastikan simpanan emas bertambah,'],
  [62.57, 67.4, '*kekal *tambah simpanan emas bila mana dapat *gaji.'],
  [67.4, 70.81, 'Tuan puan, simpanan emas bermula dengan *tindakan,'],
  [70.81, 76.24, 'bukan sekadar takut sahaja. Jadi tuan puan yang dah ready untuk bertindak, boleh buka akaun emas secara *percuma.'],
  [76.24, 80.16, 'Mulakan *langkah *pertama walaupun *kecil, sebab langkah pertama'],
  [80.16, 84.75, 'menentukan sama ada di masa hadapan tuan puan ada simpanan emas ataupun'],
  [84.75, 89.3, 'tidak ada simpanan emas. *Dulu *ragu, *kini *tahu, jom mulakan *simpanan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 4.08, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 4.08, 'tiers', WC.ma, talkScene({ wall: ['GAJI KECIL', 'SIMPAN EMAS'], tag: '5  LANGKAH', sub: 'WALAUPUN GAJI TAK BESAR' })), { nobk: true })),
  B(4.08, 10.6, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Gaji Kecil Tak Cukup?', 88);
    row(lt, 0.4, 440, 'Gaji kecil', 'SELALU TAK CUKUP'); row(lt, 4.5, 590, 'Sampai', 'HUJUNG BULAN');
    stk(lt, .4, IMG.sGajikecil, 540, SB, 600);
  }),
  B(10.6, 21.61, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Mula Walaupun Sedikit', 88);
    row(lt, 0.5, 440, 'Dalam simpanan emas', 'MULA WALAUPUN SEDIKIT'); row(lt, 5.4, 590, 'Gaji kecil pun', 'MAMPU KUMPUL EMAS');
    stk(lt, .4, IMG.sJom, 540, SB, 600);
  }),
  Cl(21.61, 24.78, 'merak100', 'Daftar Percuma', 'daftar', 'daftar', 1.3, 100),
  Cl(24.78, 29.52, 'bunga50', 'Pasang App Public Gold', 'install', 'install', 1.3, 86),
  Cl(29.52, 35.39, 'syiling', 'Log Masuk & TAC', 'login', 'login', 1.0, 92),
  Cl(35.39, 50.64, 'g250', 'Topup Serendah RM100', 'beli', 'topup', 0.55, 86),
  B(50.64, 58.92, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Baki Dalam App', 96);
    row(lt, 0.4, 440, 'Baki emas', 'DALAM APP'); row(lt, 4.3, 590, 'Tiada komitmen', 'SIMPAN BULAN-BULAN');
    stk(lt, .4, IMG.sBeli, 540, SB, 600);
  }),
  B(58.92, 67.4, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Konsisten Tambah', 96);
    row(lt, 0.4, 440, 'Dapat gaji', 'TAMBAH SIMPANAN EMAS');
    stk(lt, .4, IMG.sKonsisten, 540, SB, 600);
  }),
  B(67.4, 76.24, 'shop', WC.ma, (lt) => {
    ttl(lt, 'Mulakan Dengan Tindakan', 84);
    row(lt, 0.5, 440, 'Simpanan emas', 'BERMULA DENGAN TINDAKAN'); row(lt, 3.0, 590, 'Bukan sekadar', 'TAKUT SAHAJA');
    stk(lt, .4, IMG.sTunggu, 540, SB, 600);
  }),
  (CLIPS.push({ a: 76.24, b: 80.16, key: 'cut', rate: 1, ext: 'webp', off: 2287 }), Object.assign(B(76.24, 80.16, 'tiers', WC.ma, talkScene({ wall: ['LANGKAH PERTAMA', 'WALAUPUN KECIL'], tag: 'KESIMPULAN', sub: 'BUKA AKAUN EMAS PERCUMA' })), { nobk: true })),
  B(80.16, 84.75, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Langkah Pertama', 96);
    row(lt, 0.4, 440, 'Langkah pertama', 'MENENTUKAN MASA DEPAN');
    stk(lt, .4, IMG.sMula, 540, SB, 600);
  }),
  B(84.75, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sMula, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sGajikecil, IMG.sJom, IMG.sDaftar, IMG.sInstall, IMG.sLogin, IMG.sBeli, IMG.sKonsisten, IMG.sTunggu, IMG.sMula])), { nobk: true }),
];
