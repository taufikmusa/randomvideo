// scenes.js — "Emas Dividen 5% Sebulan? Semak Dulu" (103.05s + outro 6s). Gaya video-papercut.
const VOICE = 103.050159, DUR = VOICE + 6, HEADN = 3091;
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
const ASSETS = { ...PH, sDividen: 'stk-dividen.png', sDatang: 'stk-datang.png', sMenarik: 'stk-menarik.png', sLombong: 'stk-lombong.png', sHakikatnya: 'stk-hakikatnya.png', sPercaya: 'stk-percaya.png', sGap: 'stk-gap.png', sNilai: 'stk-nilai.png', sJom: 'stk-jom.png' };

// ---------- klip app (frame jpg dalam clip/<kunci>/%04d.jpg @30fps) ----------
const CLIPN = { cut: 2700 };
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
  [0, 1.95, 'Kalau ada orang tawarkan'],
  [1.95, 5.18, 'pelaburan *emas dengan *dividen *tetap setiap bulan,'],
  [5.18, 8.12, 'satu soalan yang tuan puan wajib tanya diri sendiri adalah:'],
  [8.12, 10.33, '*duit tersebut *datang daripada *mana?'],
  [10.33, 14.4, 'Ramai orang terpedaya bukan sebab mereka tak bijak, tetapi sebab'],
  [14.4, 17.39, '*tergoda dengan tawaran yang terlalu *menarik.'],
  [17.39, 19.15, '*Modal kononnya selamat,'],
  [19.15, 21.61, 'emas ada, setiap bulan dapat pulangan.'],
  [21.61, 27.18, 'Kemudian, mulalah cerita tentang *AI, *lombong *emas dan *pelaburan *antarabangsa.'],
  [27.18, 33.31, 'Bunyi canggih sampai kita sendiri segan nak bertanya macam mana keuntungan itu sebenarnya dijana.'],
  [33.31, 37.91, '*Hakikatnya, tuan puan memiliki emas bukan bermaksud kita akan terima *dividen *bulanan.'],
  [37.91, 39.77, 'Keuntungan daripada emas'],
  [39.77, 44.09, 'hanyalah bergantung kepada perubahan *harga jual beli emas.'],
  [44.09, 46.2, 'Harga tersebut juga boleh *jatuh.'],
  [46.2, 49.57, 'Sebab itu, kalau ada pihak menjanjikan *pulangan *tetap,'],
  [49.57, 55.08, '*jangan *terus *percaya. *Semak syarikat, fahami model perniagaan dan jangan serahkan'],
  [55.08, 58.92, 'duit ataupun emas berdasarkan *testimoni ataupun janji manis.'],
  [58.92, 62.38, 'Jadi tuan puan, pegang prinsip: beli emas, dapat emas.'],
  [62.38, 68.42, 'Nak kaya itu bagus, tuan puan, tapi yang lebih penting sebenarnya *selamatkan diri kita daripada jatuh *miskin.'],
  [68.42, 72.46, 'Di akaun emas *GAP *Public *Gold, tuan puan sebenarnya boleh kumpul emas'],
  [72.46, 77.9, 'sedikit demi sedikit gram untuk dikeluarkan menjadi *item *emas *fizikal.'],
  [77.9, 85.37, 'Jadi tuan puan, *biar *lambat *asal *selamat. Kita simpan emas bukan nak cari duit lebih, tapi kita nak selamatkan duit yang ada.'],
  [85.37, 89.4, 'Ingat, jangan kejar pulangan sampai modal sendiri jadi taruhan.'],
  [89.4, 95.43, '*Dulu *ragu, *kini *tahu, jom mulakan *simpan *emas. Tuan puan yang dah ready boleh daftar ikut emas *percuma.'],
  [95.43, 97.4, 'Simpan emas di Public Gold'],
  [97.4, 102.88, 'dan boleh keluarkan emas tersebut menjadi item emas fizikal yang boleh tuan puan pegang sendiri.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 5.18, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 5.18, 'tiers', WC.ma, talkScene({ wall: ['EMAS DIVIDEN', 'TETAP SEBULAN?'], tag: 'SEMAK  DULU', sub: 'TAWARAN YANG TERLALU MENARIK' })), { nobk: true })),
  B(5.18, 10.33, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Duit Datang Dari Mana?', 88);
    row(lt, 0.4, 440, 'Satu soalan', 'WAJIB TANYA DIRI'); row(lt, 2.9, 590, 'Duit tersebut', 'DATANG DARI MANA?');
    stk(lt, .4, IMG.sDatang, 540, SB, 600);
  }),
  B(10.33, 21.61, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Tawaran Terlalu Menarik', 84);
    row(lt, 0.5, 440, 'Ramai terpedaya', 'TAWARAN MENARIK'); row(lt, 4.2, 590, 'Modal', 'KONONNYA SELAMAT'); row(lt, 8.8, 740, 'Setiap bulan', 'DAPAT PULANGAN');
    stk(lt, .4, IMG.sMenarik, 540, SB, 600);
  }),
  B(21.61, 33.31, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Cerita Yang Canggih', 92);
    row(lt, 0.5, 440, 'Cerita AI', 'LOMBONG EMAS'); row(lt, 3.2, 590, 'Pelaburan', 'ANTARABANGSA'); row(lt, 7.5, 740, 'Segan nak tanya', 'MACAM MANA UNTUNG?');
    stk(lt, .4, IMG.sLombong, 540, SB, 600);
  }),
  B(33.31, 39.77, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Bukan Dividen Bulanan', 84);
    row(lt, 0.5, 440, 'Memiliki emas', 'BUKAN DIVIDEN BULANAN'); row(lt, 4.6, 590, 'Untung emas', 'IKUT HARGA');
    stk(lt, .4, IMG.sHakikatnya, 540, SB, 600);
  }),
  B(39.77, 46.2, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Harga Boleh Jatuh', 96);
    row(lt, 0.5, 440, 'Untung bergantung', 'HARGA JUAL BELI'); row(lt, 4.3, 590, 'Harga', 'BOLEH JATUH');
    stk(lt, .4, IMG.sNilai, 540, SB, 600);
  }),
  B(46.2, 49.57, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Pulangan Tetap?', 100);
    
    stk(lt, .4, IMG.sDividen, 540, SB, 680);
  }),
  B(49.57, 58.92, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Jangan Terus Percaya', 92);
    row(lt, 0.4, 440, 'Semak', 'SYARIKAT'); row(lt, 3.4, 590, 'Fahami', 'MODEL PERNIAGAAN'); row(lt, 6.4, 740, 'Jangan ikut', 'TESTIMONI SAHAJA');
    stk(lt, .4, IMG.sPercaya, 540, SB, 600);
  }),
  (CLIPS.push({ a: 58.92, b: 66.0, key: 'cut', rate: 1, ext: 'webp', off: 1768 }), Object.assign(B(58.92, 66.0, 'tiers', WC.ma, talkScene({ wall: ['BELI EMAS', 'DAPAT EMAS'], tag: 'PRINSIP', sub: 'SELAMATKAN DIRI DARI JATUH MISKIN' })), { nobk: true })),
  B(66.0, 77.9, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Kumpul Emas Fizikal', 88);
    row(lt, 2.4, 440, 'Akaun GAP', 'PUBLIC GOLD'); row(lt, 6.5, 590, 'Kumpul sedikit demi sedikit', 'ITEM EMAS FIZIKAL');
    stk(lt, .4, IMG.sGap, 540, SB, 600);
  }),
  (CLIPS.push({ a: 77.9, b: 85.37, key: 'cut', rate: 1, ext: 'webp', off: 2337 }), Object.assign(B(77.9, 85.37, 'tiers', WC.ma, talkScene({ wall: ['BIAR LAMBAT', 'ASAL SELAMAT'], tag: 'KESIMPULAN', sub: 'SELAMATKAN DUIT YANG ADA' })), { nobk: true })),
  B(85.37, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sJom, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sDividen, IMG.sDatang, IMG.sMenarik, IMG.sLombong, IMG.sHakikatnya, IMG.sPercaya, IMG.sGap, IMG.sNilai, IMG.sJom])), { nobk: true }),
];
