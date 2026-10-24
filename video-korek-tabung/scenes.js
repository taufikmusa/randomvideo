// scenes.js — "5 Langkah Hentikan Tabiat Korek Tabung" (112.99s + outro 6s). Gaya video-papercut.
const VOICE = 112.988299, DUR = VOICE + 6, HEADN = 3390;
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
const ASSETS = { ...PH, sLebur: 'stk-lebur.png', sJom: 'stk-jom.png', sDaftar: 'stk-daftar.png', sInstall: 'stk-install.png', sLogin: 'stk-login.png', sTopup: 'stk-topup.png', sKonsisten: 'stk-konsisten.png', sTabiat: 'stk-tabiat.png', sBenteng: 'stk-benteng.png' };

// ---------- klip app (frame jpg dalam clip/<kunci>/%04d.jpg @30fps) ----------
const CLIPN = { daftar: 223, install: 241, login: 189, topup: 233, withdraw: 289, cut: 3400 };
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
  [0, 3.78, '*5 *langkah *hentikan *tabiat suka *korek *tabung.'],
  [3.78, 11.09, 'Penat menabung *tiga *bulan dalam bank, tapi akhirnya *lebur dalam *3 *minit waktu *promosi jualan murah.'],
  [11.09, 16.64, 'Guru emas saya sarankan *kaki *korek *tabung beralih kepada *simpanan *emas *fizikal'],
  [16.64, 20.04, 'di Public Gold melalui *lima *langkah mudah ini.'],
  [20.04, 24.5, 'Yang *pertama, *daftar akaun emas *percuma tanpa sebarang yuran.'],
  [24.5, 29.41, 'Better daftar bersama *dealer, sebab dealer boleh jadi *hotline peribadi anda'],
  [29.41, 34.27, 'dan anda boleh tanya apa-apa tentang transaksi di Public Gold.'],
  [34.27, 38.24, '*Kedua, tuan puan sebenarnya dah boleh *install *apps Public Gold.'],
  [38.24, 42.57, 'Sebab nanti melalui apps tersebut, tuan puan boleh *pantau *harga *emas,'],
  [42.57, 47.64, 'pantau baki simpanan emas dan rekod *history tuan puan beli emas.'],
  [47.64, 52.53, '*Ketiga, untuk pertama kali tuan puan boleh *login ke dalam apps Public Gold'],
  [52.53, 56.23, 'menggunakan nombor *IC tanpa dash.'],
  [56.23, 62.47, 'Bila dah berjaya log in, tuan puan isi nombor *TAC yang tuan puan akan terima di telefon sendiri.'],
  [62.47, 67.65, '*Keempat, tuan puan dah boleh mulakan dengan *top *up simpanan emas serendah *RM100'],
  [67.65, 73.71, 'ataupun jika tuan puan mampu boleh top up *satu *gram. Dan yang *kelima, *konsisten tambah gram emas'],
  [73.71, 77.16, 'bila mana tuan puan ada *duit *lebihan yang nak diselamatkan.'],
  [77.16, 83.68, 'Setiap kali buat belian, simpanan emas akan *meningkat mengikut nilai emas semasa.'],
  [83.68, 88.75, 'Dan tuan puan, nanti bila ready nak *keluarkan emas, boleh keluarkan melalui *telefon sahaja.'],
  [88.75, 93.01, 'Emas fizikal dari *dinar dan ke bawah boleh *dipos terus ke rumah.'],
  [93.01, 98.21, 'Jadi bila duit ini ditukar menjadi emas, kita rasa tak berduit.'],
  [98.21, 103.49, '*Emas adalah duit juga sebenarnya, dah *selamat dijadikan sebagai *simpanan.'],
  [103.49, 107.73, '*Mulakan *simpanan *emas hari ini di *hujung *jari. Tuan puan yang dah ready nak simpan emas,'],
  [107.73, 109.59, 'boleh buka akaun emas *percuma.'],
  [109.59, 112.99, '*Dulu *ragu, *kini *tahu. Jom mulakan *simpanan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 3.78, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 3.78, 'tiers', WC.ma, talkScene({ wall: ['HENTIKAN TABIAT', 'KOREK TABUNG'], tag: '5  LANGKAH', sub: 'BERALIH KE SIMPANAN EMAS' })), { nobk: true })),
  B(3.78, 11.09, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Lebur 3 Minit', 96);
    row(lt, 0.4, 440, 'Penat menabung', 'LEBUR 3 MINIT'); row(lt, 5.0, 590, 'Waktu promosi', 'JUALAN MURAH');
    stk(lt, .4, IMG.sLebur, 540, SB, 600);
  }),
  B(11.09, 20.04, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Jom Alih Ke Emas', 92);
    row(lt, 0.6, 440, 'Kaki korek tabung', 'BERALIH KE EMAS FIZIKAL'); row(lt, 5.6, 590, 'Melalui', '5 LANGKAH MUDAH');
    stk(lt, .4, IMG.sJom, 540, SB, 600);
  }),
  Cl(20.04, 34.27, 'merak100', 'Daftar Percuma', 'daftar', 'daftar', 0.75, 100),
  Cl(34.27, 47.64, 'bunga50', 'Pasang App Public Gold', 'install', 'install', 0.7, 86),
  Cl(47.64, 62.47, 'syiling', 'Log Masuk & TAC', 'login', 'login', 0.6, 92),
  Cl(62.47, 73.71, 'g250', 'Topup Serendah RM100', 'topup', 'topup', 0.8, 86),
  B(73.71, 83.68, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Konsisten Menabung', 92);
    row(lt, 0.6, 440, 'Duit lebihan', 'BELI EMAS'); row(lt, 3.5, 590, 'Setiap belian', 'SIMPANAN NAIK');
    stk(lt, .4, IMG.sKonsisten, 540, SB, 600);
  }),
  Cl(83.68, 95.95, 'binder', 'Keluarkan Emas', 'benteng', 'withdraw', 0.8, 96),
  B(95.95, 103.49, 'shop', WC.ma, (lt) => {
    ttl(lt, 'Tabiat Korek Tabung', 92);
    row(lt, 2.0, 440, 'Emas adalah duit', 'DAH SELAMAT');
    stk(lt, .4, IMG.sTabiat, 540, SB, 600);
  }),
  (CLIPS.push({ a: 103.49, b: 107.73, key: 'cut', rate: 1, ext: 'webp', off: 3105 }), Object.assign(B(103.49, 107.73, 'tiers', WC.ma, talkScene({ wall: ['MULAKAN HARI INI', 'HUJUNG JARI'], tag: 'KESIMPULAN', sub: 'BUKA AKAUN EMAS PERCUMA' })), { nobk: true })),
  B(107.73, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sBenteng, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sLebur, IMG.sJom, IMG.sDaftar, IMG.sInstall, IMG.sLogin, IMG.sTopup, IMG.sKonsisten, IMG.sTabiat, IMG.sBenteng])), { nobk: true }),
];
