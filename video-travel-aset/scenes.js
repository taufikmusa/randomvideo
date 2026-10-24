// scenes.js — "5 Cara Kaki Travel Bina Aset" (96.43s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
// (dibina semula guna skill video-papercut: adegan bercakap = paper-cut + headline wall + glass)
const VOICE = 96.432472, DUR = VOICE + 6, HEADN = 2893;
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
const ASSETS = { ...PH, sTravel: 'stk-travel.png', sSimpandulu: 'stk-simpandulu.png', sBajet: 'stk-bajet.png', sKenangan: 'stk-kenangan.png', sAsetbebas: 'stk-asetbebas.png', sRm100: 'stk-rm100.png', sMinat: 'stk-minat.png', sMasadepan: 'stk-masadepan.png', sKukuh: 'stk-kukuh.png' };

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
  [0, 5.85, '*5 *cara kaki *travel terus *explore sambil *bina *aset *fizikal.'],
  [5.85, 9.71, 'Generasi muda hari ini sangat *mementingkan pengalaman'],
  [9.71, 14.12, '*mengembara ke luar negara dan mencipta *memori indah.'],
  [14.12, 16.27, 'Memang seronok menikmati hidup,'],
  [16.27, 18.34, 'tapi pastikan *poket anda'],
  [18.34, 21.22, 'tidak kosong bila pulang ke *tanah *air.'],
  [21.22, 26.9, '*Pertama, utamakan *simpanan *masa *depan sebelum bajet tiket penerbangan.'],
  [26.9, 29.28, 'Bayar masa depan anda *dahulu'],
  [29.28, 33.18, 'sebelum membiayai *percutian *impian.'],
  [33.18, 37.86, '*Kedua, tetapkan *bajet *mengembara daripada baki simpanan.'],
  [37.86, 40.22, 'Melancong *mengikut *kemampuan'],
  [40.22, 43.12, 'tanpa perlu *berhutang kat kredit.'],
  [43.12, 46.78, '*Ketiga, *kenangan *masa *muda itu indah'],
  [46.78, 49.14, 'tapi *hari *tua akan tiba.'],
  [49.14, 52.2, 'Seimbangkan nikmat melihat dunia hari ini'],
  [52.2, 55.02, 'dengan *persiapan hari esok.'],
  [55.02, 60.59, '*Keempat, *bina *aset memberikan *kebebasan melancong lebih tenang.'],
  [60.59, 63.21, 'Apabila simpanan anda *kukuh,'],
  [63.21, 66.66, 'percutian terasa jauh lebih *membahagiakan.'],
  [66.66, 70.41, 'Dan *kelima, *simpan *emas *RM100 *sebulan'],
  [70.41, 72.32, 'tidak menghalang percutian.'],
  [72.32, 73.93, 'Jumlah kecil ini'],
  [73.93, 78.34, 'membina *aset di belakang tabir tanpa mengganggu *gaya *hidup.'],
  [78.34, 81.64, 'Anda tidak perlu korbankan *minat *mengembara,'],
  [81.64, 84.44, 'cuma pastikan *masa *depan turut'],
  [84.44, 88.27, '*terpelihara. Nikmati dunia dengan *simpanan yang *kukuh.'],
  [88.27, 90.99, 'Tuan puan yang dah ready nak mulakan *simpan *emas,'],
  [90.99, 92.65, 'boleh rujuk *pin *video saya.'],
  [92.65, 96.43, '*Dulu *ragu, *kini *tahu. Jom *simpan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 5.85, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 5.85, 'tiers', WC.ma, talkScene({ wall: ['TRAVEL TERUS', 'BINA ASET'], tag: 'KAKI TRAVEL', sub: '5 CARA EXPLORE TANPA RISAU' })), { nobk: true })),
  B(5.85, 21.22, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Kaki Travel', 100);
    row(lt, 3.9, 440, 'Mengembara', 'KE LUAR NEGARA'); row(lt, 10.4, 590, 'Poket anda', 'JANGAN KOSONG');
    stk(lt, .4, IMG.sTravel, 540, SB, 600);
  }),
  (CLIPS.push({ a: 21.22, b: 25.0, key: 'cut', rate: 1, ext: 'webp', off: 637 }), Object.assign(B(21.22, 25.0, 'tiers', WC.ma, talkScene({ wall: ['SIMPANAN MASA DEPAN', 'DAHULU'], tag: 'CARA  1', sub: 'SEBELUM BAJET TIKET' })), { nobk: true })),
  B(25.0, 33.18, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Simpanan Dahulu', 100);
    row(lt, 1.9, 440, 'Bayar masa depan', 'DAHULU'); row(lt, 4.5, 590, 'Sebelum biayai', 'PERCUTIAN IMPIAN');
    stk(lt, .4, IMG.sSimpandulu, 540, SB, 620);
  }),
  (CLIPS.push({ a: 33.18, b: 37.86, key: 'cut', rate: 1, ext: 'webp', off: 995 }), Object.assign(B(33.18, 37.86, 'tiers', WC.ma, talkScene({ wall: ['BAJET MENGEMBARA', 'IKUT KEMAMPUAN'], tag: 'CARA  2', sub: 'TANPA BERHUTANG KREDIT' })), { nobk: true })),
  B(37.86, 43.12, 'bungamas', WC.ma, (lt) => {
    ttl(lt, 'Bajet Realistik', 100);
    row(lt, .4, 440, 'Melancong ikut', 'KEMAMPUAN'); row(lt, 2.4, 590, 'Tanpa berhutang', 'KREDIT');
    stk(lt, .4, IMG.sBajet, 540, SB, 620);
  }),
  (CLIPS.push({ a: 43.12, b: 46.78, key: 'cut', rate: 1, ext: 'webp', off: 1294 }), Object.assign(B(43.12, 46.78, 'tiers', WC.ma, talkScene({ wall: ['KENANGAN MUDA', 'HARI TUA JUGA'], tag: 'CARA  3', sub: 'SEIMBANGKAN HARI INI & ESOK' })), { nobk: true })),
  B(46.78, 55.02, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Seimbangkan', 100);
    row(lt, .5, 440, 'Hari tua', 'AKAN TIBA'); row(lt, 2.5, 590, 'Nikmat dunia', 'HARI INI'); row(lt, 5.4, 740, 'Persiapan', 'HARI ESOK');
    stk(lt, .4, IMG.sKenangan, 540, SB, 600);
  }),
  (CLIPS.push({ a: 55.02, b: 58.5, key: 'cut', rate: 1, ext: 'webp', off: 1651 }), Object.assign(B(55.02, 58.5, 'tiers', WC.ma, talkScene({ wall: ['BINA ASET', 'LEBIH TENANG'], tag: 'CARA  4', sub: 'KEBEBASAN MELANCONG' })), { nobk: true })),
  B(58.5, 66.66, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Bina Aset', 100);
    row(lt, .4, 440, 'Bina aset', 'KEBEBASAN'); row(lt, 2.1, 590, 'Simpanan kukuh', 'LEBIH TENANG'); row(lt, 4.7, 740, 'Percutian', 'LEBIH BAHAGIA');
    stk(lt, .4, IMG.sAsetbebas, 540, SB, 600);
  }),
  (CLIPS.push({ a: 66.66, b: 70.0, key: 'cut', rate: 1, ext: 'webp', off: 2000 }), Object.assign(B(66.66, 70.0, 'tiers', WC.ma, talkScene({ wall: ['SIMPAN EMAS', 'RM100 SEBULAN'], tag: 'CARA  5', sub: 'TAK HALANG PERCUTIAN' })), { nobk: true })),
  B(70.0, 78.34, 'g250', WC.ma, (lt) => {
    ttl(lt, 'RM100 Sebulan', 100);
    row(lt, 2.3, 440, 'Jumlah kecil', 'TAK HALANG TRAVEL'); row(lt, 3.9, 590, 'Bina aset', 'BELAKANG TABIR'); row(lt, 6.0, 740, 'Tanpa ganggu', 'GAYA HIDUP');
    stk(lt, .4, IMG.sRm100, 540, SB, 600);
  }),
  B(78.34, 81.64, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Minat Mengembara', 92); stk(lt, .3, IMG.sMinat, 540, SB, 680); }),
  B(81.64, 84.44, 'tiers', WC.ma, (lt) => { ttl(lt, 'Masa Depan', 100); stk(lt, .3, IMG.sMasadepan, 540, SB, 680); }),
  B(84.44, 88.27, 'syiling', WC.ma, (lt) => { ttl(lt, 'Kewangan Kukuh', 96); stk(lt, .3, IMG.sKukuh, 540, SB, 680); }),
  B(88.27, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sKukuh, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sTravel, IMG.sSimpandulu, IMG.sBajet, IMG.sKenangan, IMG.sAsetbebas, IMG.sRm100, IMG.sMinat, IMG.sMasadepan, IMG.sKukuh])), { nobk: true }),
];
