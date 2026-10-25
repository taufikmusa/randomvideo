// scenes.js — "5 Langkah Bina Tabung Kecemasan Emas Dari Rumah" (94.95s + outro 6s). Gaya video-papercut.
const VOICE = 94.946395, DUR = VOICE + 6, HEADN = 2848;
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
const ASSETS = { ...PH, sBekerja: 'stk-bekerja.png', sBina: 'stk-bina.png', sDaftar: 'stk-daftar.png', sInstall: 'stk-install.png', sLogin: 'stk-login.png', sTopup: 'stk-topup.png', sTambah: 'stk-tambah.png', sMula: 'stk-mula.png', sBenteng: 'stk-benteng.png' };

// ---------- klip app (frame jpg dalam clip/<kunci>/%04d.jpg @30fps) ----------
const CLIPN = { daftar: 223, install: 241, login: 189, topup: 233, withdraw: 289, cut: 2900 };
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
  [0, 5.1, 'Dah *bekerja *lebih *5 *tahun tapi masih *tiada *tabung *kecemasan'],
  [5.1, 7.86, 'sebab simpanan tersebut asyik terguna balik.'],
  [7.86, 11.71, 'Saya kongsikan *5 *langkah bina tabung kecemasan pertama anda'],
  [11.71, 14.45, 'dari rumah. Pesan guru emas saya,'],
  [14.45, 17.39, 'zaman sekarang kita boleh bina *tabung *kecemasan'],
  [17.39, 19.84, 'dalam bentuk *emas sambil berehat di rumah'],
  [19.84, 21.49, 'melalui lima langkah ini.'],
  [21.49, 25.18, '*Pertama, tuan puan boleh *daftar ikut emas *percuma.'],
  [25.18, 27.14, 'Linknya saya kongsikan di bawah.'],
  [27.14, 29.69, '*Kedua, tuan puan dah boleh'],
  [29.69, 33.83, 'muat turun apps Public Gold sama ada di *App *Store ataupun di *Play *Store.'],
  [33.83, 36.37, 'Tak perlu pun nak pergi *cawangan Public Gold.'],
  [36.37, 38.18, '*Ketiga, tuan puan'],
  [38.18, 40.35, 'dah boleh *log *masuk ke dalam apps tersebut'],
  [40.35, 42.67, 'menggunakan nombor *IC tanpa dash'],
  [42.67, 45.56, 'sebagai username dan password sementara.'],
  [45.56, 49.32, 'Dan *keempat, tuan puan boleh *aktifkan akaun tuan puan sendiri'],
  [49.32, 51.26, 'dengan buat belian yang pertama,'],
  [51.26, 55.32, 'sama ada *100 *ringgit ataupun *1 *gram mengikut kemampuan.'],
  [55.32, 59.77, 'Selesai buat belian, tuan puan akan terima gram dalam akaun emas tuan puan sendiri'],
  [59.77, 62.25, 'dan akan dapat official *PG *code,'],
  [62.25, 65.24, 'iaitu official username daripada Public Gold.'],
  [65.24, 68.92, 'Dan yang *kelima, tuan puan boleh *tambah tabungan bila-bila masa.'],
  [68.92, 71.78, 'Di dalam app tersebut, bukan sekadar boleh beli emas,'],
  [71.78, 73.6, 'tuan puan boleh *jual *balik emas.'],
  [73.6, 77.09, 'Tuan puan boleh tukarkan emas kepada *emas *fizikal'],
  [77.09, 80.41, 'bila mana gram dah cukup dan rasa nak pegang sendiri.'],
  [80.41, 85.42, 'Bermula dengan *langkah *betul hari ini untuk perjalanan kumpul aset dengan lebih *tenang.'],
  [85.42, 87.54, 'Jadi tuan puan yang nak bina'],
  [87.54, 89.53, '*aset *kecemasan dengan emas,'],
  [89.53, 91.68, 'boleh daftar ikut emas *percuma.'],
  [91.68, 93.38, '*Dulu *ragu, *kini *tahu.'],
  [93.38, 94.95, 'Jom mulakan *simpan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 5.1, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 5.1, 'tiers', WC.ma, talkScene({ wall: ['TIADA TABUNG', 'KECEMASAN?'], tag: '5  LANGKAH', sub: 'BEKERJA LEBIH 5 TAHUN' })), { nobk: true })),
  B(5.1, 11.71, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Dah Bekerja 5 Tahun', 92);
    row(lt, 0.4, 440, 'Tiada', 'TABUNG KECEMASAN'); row(lt, 2.8, 590, 'Simpanan', 'ASYIK TERGUNA BALIK');
    stk(lt, .4, IMG.sBekerja, 540, SB, 600);
  }),
  B(11.71, 21.49, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Bina Tabung Kecemasan', 88);
    row(lt, 0.5, 440, 'Dalam bentuk emas', 'DARI RUMAH'); row(lt, 5.2, 590, 'Melalui', '5 LANGKAH MUDAH');
    stk(lt, .4, IMG.sBina, 540, SB, 600);
  }),
  Cl(21.49, 29.69, 'merak100', 'Daftar Percuma', 'daftar', 'daftar', 0.9, 100),
  Cl(29.69, 36.37, 'bunga50', 'Pasang App Public Gold', 'install', 'install', 1.2, 86),
  Cl(36.37, 45.56, 'syiling', 'Log Masuk Guna IC', 'login', 'login', 0.7, 92),
  Cl(45.56, 55.32, 'g250', 'Belian Pertama RM100', 'topup', 'topup', 0.8, 86),
  B(55.32, 65.24, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Terima Gram Emas', 96);
    row(lt, 0.4, 440, 'Terima', 'GRAM EMAS'); row(lt, 4.5, 590, 'Dapat', 'PG CODE RASMI');
    stk(lt, .4, IMG.sTopup, 540, SB, 600);
  }),
  B(65.24, 73.6, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Tambah Bila-Bila Masa', 92);
    row(lt, 0.4, 440, 'Tambah tabungan', 'BILA-BILA MASA'); row(lt, 6.5, 590, 'Jual balik', 'EMAS');
    stk(lt, .4, IMG.sTambah, 540, SB, 600);
  }),
  Cl(73.6, 80.41, 'shop', 'Tukar Ke Emas Fizikal', 'bina', 'withdraw', 1.0, 92),
  B(80.41, 85.42, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Langkah Betul', 100);
    row(lt, 0.4, 440, 'Mula dengan', 'LANGKAH BETUL'); row(lt, 2.6, 590, 'Kumpul aset', 'LEBIH TENANG');
    stk(lt, .4, IMG.sMula, 540, SB, 600);
  }),
  (CLIPS.push({ a: 85.42, b: 89.53, key: 'cut', rate: 1, ext: 'webp', off: 2563 }), Object.assign(B(85.42, 89.53, 'tiers', WC.ma, talkScene({ wall: ['TABUNG KECEMASAN', 'DARI EMAS'], tag: 'KESIMPULAN', sub: 'BERMULA HARI INI' })), { nobk: true })),
  B(89.53, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sBenteng, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sBekerja, IMG.sBina, IMG.sDaftar, IMG.sInstall, IMG.sLogin, IMG.sTopup, IMG.sTambah, IMG.sMula, IMG.sBenteng])), { nobk: true }),
];
