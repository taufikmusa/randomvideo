// scenes.js — "5 Cara Bantu Keluarga Tanpa Korbankan Diri Sendiri" (91.12s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
// (dibina semula guna skill video-papercut: adegan bercakap = paper-cut + headline wall + glass)
const VOICE = 91.115102, DUR = VOICE + 6, HEADN = 2733;
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
const ASSETS = { ...PH, sNilai: 'stk-nilai.png', sHad: 'stk-had.png', sPoket: 'stk-poket.png', sMendidik: 'stk-mendidik.png', sAsingkan: 'stk-asingkan.png', sKekayaan: 'stk-kekayaan.png', sBerenang: 'stk-berenang.png', sTiang: 'stk-tiang.png', sMemberi: 'stk-memberi.png' };

// ---------- klip app (frame jpg dalam clip/<kunci>/%04d.jpg @30fps) ----------
const CLIPN = { cut: 4000 };
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
  [0, 4.63, '*5 *cara *bantu *keluarga tanpa korbankan *diri *sendiri.'],
  [4.63, 11.61, 'Menghulur bantuan kewangan kepada ibu bapa dan saudara adalah *nilai *murni masyarakat kita.'],
  [11.61, 16.85, 'Namun, membantu tanpa *sempadan yang jelas boleh *menjerat diri sendiri.'],
  [16.85, 21.67, '*Pertama, tetapkan *had *kemampuan bantuan yang *realistik.'],
  [21.67, 24.21, 'Membantu melebihi kemampuan'],
  [24.21, 26.36, 'bukanlah satu tindakan yang'],
  [26.36, 28.32, 'baik. *Kedua,'],
  [28.32, 30.98, '*kukuhkan *poket *sendiri terlebih dahulu.'],
  [30.98, 33.31, '*Mustahil kita nak selamatkan orang'],
  [33.31, 36.78, 'yang lemas jika kita sendiri *tak *tahu *berenang.'],
  [36.78, 42.37, '*Ketiga, hulurkan bantuan yang *mendidik, bukan sekadar memberi tunai.'],
  [42.37, 46.17, 'Bantu saudara membina *kemahiran *berdikari'],
  [46.17, 48.58, 'agar tidak bergantung selamanya.'],
  [48.58, 52.39, '*Keempat, *asingkan bahagian *simpanan *peribadi'],
  [52.39, 54.54, 'sebelum mengagihkan bantuan.'],
  [54.54, 56.47, 'Pastikan *masa *depan anda'],
  [56.47, 60.38, 'tidak terabai dalam usaha membantu orang lain.'],
  [60.38, 65.77, 'Dan *kelima, *bina *kekayaan agar mampu memberi lebih banyak *manfaat'],
  [65.77, 72.73, 'pada masa depan. Kedudukan kewangan yang *teguh membolehkan anda menjadi *tiang *pelindung keluarga.'],
  [72.73, 77.46, 'Membantu saudara dan keluarga adalah amalan yang sangat *terpuji,'],
  [77.46, 81.3, 'tapi pastikan *benteng diri tetap *kukuh berdiri.'],
  [81.3, 83.64, '*Kukuhkan diri untuk terus *memberi.'],
  [83.64, 87.92, 'Tuan puan yang dah ready nak mulakan *simpan *emas, boleh rujuk *pin *video saya.'],
  [87.92, 91.12, '*Dulu *ragu, *kini *tahu. Jom *simpan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 4.63, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 4.63, 'tiers', WC.ma, talkScene({ wall: ['BANTU KELUARGA', 'TANPA KORBAN'], tag: '5  CARA', sub: 'JANGAN KORBANKAN DIRI SENDIRI' })), { nobk: true })),
  B(4.63, 16.85, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Bantu Keluarga', 96);
    row(lt, 2.0, 440, 'Bantu ibu bapa', 'NILAI MURNI'); row(lt, 7.2, 590, 'Tanpa sempadan', 'MENJERAT DIRI');
    stk(lt, .4, IMG.sNilai, 540, SB, 600);
  }),
  (CLIPS.push({ a: 16.85, b: 20.5, key: 'cut', rate: 1, ext: 'webp', off: 506 }), Object.assign(B(16.85, 20.5, 'tiers', WC.ma, talkScene({ wall: ['TETAPKAN HAD', 'KEMAMPUAN'], tag: 'CARA  1', sub: 'BANTUAN YANG REALISTIK' })), { nobk: true })),
  B(20.5, 26.4, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Had Realistik', 100);
    row(lt, 1.2, 440, 'Melebihi kemampuan', 'BUKAN TINDAKAN BAIK');
    stk(lt, .4, IMG.sHad, 540, SB, 620);
  }),
  (CLIPS.push({ a: 26.4, b: 30.98, key: 'cut', rate: 1, ext: 'webp', off: 792 }), Object.assign(B(26.4, 30.98, 'tiers', WC.ma, talkScene({ wall: ['KUKUHKAN POKET', 'SENDIRI DAHULU'], tag: 'CARA  2', sub: 'TERLEBIH DAHULU' })), { nobk: true })),
  B(30.98, 33.31, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Poket Sendiri', 100);
    
    stk(lt, .4, IMG.sPoket, 540, SB, 680);
  }),
  B(33.31, 36.78, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Tahu Berenang', 100);
    
    stk(lt, .4, IMG.sBerenang, 540, SB, 680);
  }),
  (CLIPS.push({ a: 36.78, b: 40.5, key: 'cut', rate: 1, ext: 'webp', off: 1103 }), Object.assign(B(36.78, 40.5, 'tiers', WC.ma, talkScene({ wall: ['BANTUAN YANG', 'MENDIDIK'], tag: 'CARA  3', sub: 'BUKAN SEKADAR BERI TUNAI' })), { nobk: true })),
  B(40.5, 48.58, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Bantuan Mendidik', 92);
    row(lt, 1.9, 440, 'Bantu saudara', 'BINA KEMAHIRAN'); row(lt, 5.7, 590, 'Tak bergantung', 'SELAMANYA');
    stk(lt, .4, IMG.sMendidik, 540, SB, 600);
  }),
  (CLIPS.push({ a: 48.58, b: 52.2, key: 'cut', rate: 1, ext: 'webp', off: 1457 }), Object.assign(B(48.58, 52.2, 'tiers', WC.ma, talkScene({ wall: ['ASINGKAN SIMPANAN', 'PERIBADI'], tag: 'CARA  4', sub: 'SEBELUM AGIHKAN BANTUAN' })), { nobk: true })),
  B(52.2, 60.38, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Simpanan Peribadi', 92);
    row(lt, 0.2, 440, 'Sebelum agih', 'BANTUAN'); row(lt, 2.3, 590, 'Masa depan', 'JANGAN TERABAI');
    stk(lt, .4, IMG.sAsingkan, 540, SB, 600);
  }),
  (CLIPS.push({ a: 60.38, b: 63.5, key: 'cut', rate: 1, ext: 'webp', off: 1811 }), Object.assign(B(60.38, 63.5, 'tiers', WC.ma, talkScene({ wall: ['BINA KEKAYAAN', 'BERI LEBIH'], tag: 'CARA  5', sub: 'BANYAK MANFAAT' })), { nobk: true })),
  B(63.5, 66.6, 'bungamas', WC.ma, (lt) => {
    ttl(lt, 'Bina Kekayaan', 100);
    
    stk(lt, .4, IMG.sKekayaan, 540, SB, 680);
  }),
  B(66.6, 72.73, 'merak5', WC.ma, (lt) => {
    ttl(lt, 'Tiang Pelindung', 96);
    row(lt, 1.0, 440, 'Kewangan teguh', 'TIANG PELINDUNG');
    stk(lt, .4, IMG.sTiang, 540, SB, 620);
  }),
  B(72.73, 77.46, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Amalan Terpuji', 100);
    
    stk(lt, .4, IMG.sNilai, 540, SB, 680);
  }),
  B(77.46, 83.64, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Benteng Diri Kukuh', 100);
    
    stk(lt, .4, IMG.sPoket, 540, SB, 680);
  }),
  B(83.64, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sMemberi, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sNilai, IMG.sHad, IMG.sPoket, IMG.sMendidik, IMG.sAsingkan, IMG.sKekayaan, IMG.sBerenang, IMG.sTiang, IMG.sMemberi])), { nobk: true }),
];
