// scenes.js — "Bila Masa Terbaik Simpan Emas Untuk Anak?" (76.16s + outro 6s). Gaya video-papercut.
const VOICE = 76.161451, DUR = VOICE + 6, HEADN = 2284;
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
const ASSETS = { ...PH, sMasa: 'stk-masa.png', sSepuluh: 'stk-sepuluh.png', sHariini: 'stk-hariini.png', sJangan: 'stk-jangan.png', sMahal: 'stk-mahal.png', sKos: 'stk-kos.png', sSatugram: 'stk-satugram.png', sPinjaman: 'stk-pinjaman.png', sKomen: 'stk-komen.png' };

// ---------- klip app (frame jpg dalam clip/<kunci>/%04d.jpg @30fps) ----------
const CLIPN = { cut: 2300 };
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
  [0, 4.01, 'Bila *masa *terbaik untuk *simpan *emas untuk *anak-anak?'],
  [4.01, 5.85, 'Sebenarnya masa terbaik'],
  [5.85, 10.29, 'untuk anda bermula membina simpanan untuk anak-anak ialah'],
  [10.29, 16.14, '*sepuluh *tahun *yang *lalu. Waktu itu harga emas masih jauh di bawah *RM200.'],
  [16.14, 18.86, 'Tapi masa *kedua terbaik adalah *sekarang.'],
  [18.86, 25.99, 'Ramai ibu bapa *tersilap *langkah kerana *menangguh dan menunggu harga emas turun sebelum nak mula menabung.'],
  [25.99, 33.12, 'Hakikatnya emas adalah *aset *bernilai *tinggi yang orang anggap sentiasa mahal.'],
  [33.12, 38.61, 'Dari dulu orang menganggap emas ini *mahal, tak pernah orang menganggap emas ini murah.'],
  [38.61, 41.7, 'Apabila anak-anak melangkah ke *menara *gading,'],
  [41.7, 45.57, '*kos *sara *hidup dan *yuran *pengajian sudah *melambung *tinggi.'],
  [45.57, 50.87, 'Mereka yang disiplin diri menyimpan *satu *gram *emas sejak anak kecil'],
  [50.87, 52.54, 'ataupun *RM100.'],
  [52.54, 58.51, 'Tak perlu *runsing meminjam *pinjaman *pendidikan yang akan membebankan masa depan.'],
  [58.51, 60.78, '*Berapa *umur anak-anak sekarang?'],
  [60.78, 63.13, 'Dan sudahkah mereka ada *simpanan *emas?'],
  [63.13, 67.84, 'Tuan puan yang dah ready nak kukuhkan simpanan masa depan anak dengan emas,'],
  [67.84, 72.7, 'boleh rujuk *pin *video saya. Di sana tuan puan boleh bermula dengan *5 *langkah mudah.'],
  [72.7, 76.16, '*Dulu *ragu, *kini *tahu. Jom mulakan *simpan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 4.01, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 4.01, 'tiers', WC.ma, talkScene({ wall: ['MASA TERBAIK', 'EMAS UNTUK ANAK'], tag: 'EMAS  ANAK', sub: 'BILA MASA TERBAIK BERMULA?' })), { nobk: true })),
  B(4.01, 10.29, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Masa Terbaik', 100);
    row(lt, 0.5, 440, 'Bina simpanan', 'UNTUK ANAK-ANAK');
    stk(lt, .4, IMG.sMasa, 540, SB, 600);
  }),
  B(10.29, 16.14, 'dulang', WC.ma, (lt) => {
    ttl(lt, '10 Tahun Yang Lalu', 96);
    row(lt, 0.5, 440, 'Masa terbaik', '10 TAHUN LALU'); row(lt, 2.8, 590, 'Harga emas', 'BAWAH RM200');
    stk(lt, .4, IMG.sSepuluh, 540, SB, 600);
  }),
  B(16.14, 18.86, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Hari Ini Juga', 100);
    
    stk(lt, .4, IMG.sHariini, 540, SB, 680);
  }),
  B(18.86, 25.99, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Jangan Menunggu', 96);
    row(lt, 0.5, 440, 'Ramai ibu bapa', 'TERSILAP LANGKAH'); row(lt, 3.8, 590, 'Tunggu harga emas', 'TURUN');
    stk(lt, .4, IMG.sJangan, 540, SB, 600);
  }),
  B(25.99, 38.61, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Emas Dianggap Mahal', 92);
    row(lt, 0.5, 440, 'Emas', 'ASET BERNILAI TINGGI'); row(lt, 7.1, 590, 'Dari dulu', 'SENTIASA MAHAL');
    stk(lt, .4, IMG.sMahal, 540, SB, 600);
  }),
  B(38.61, 45.57, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Kos Melambung', 100);
    row(lt, 0.4, 440, 'Anak ke menara gading', 'KOS MELAMBUNG'); row(lt, 3.1, 590, 'Yuran & sara hidup', 'MELAMBUNG TINGGI');
    stk(lt, .4, IMG.sKos, 540, SB, 600);
  }),
  B(45.57, 52.54, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Simpan Sejak Kecil', 96);
    row(lt, 0.5, 440, 'Disiplin simpan', '1 GRAM SEJAK KECIL'); row(lt, 5.3, 590, 'Ataupun', 'RM100');
    stk(lt, .4, IMG.sSatugram, 540, SB, 600);
  }),
  B(52.54, 58.51, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Tak Perlu Runsing', 92);
    row(lt, 0.5, 440, 'Pinjaman pendidikan', 'MEMBEBANKAN MASA DEPAN');
    stk(lt, .4, IMG.sPinjaman, 540, SB, 600);
  }),
  (CLIPS.push({ a: 58.51, b: 63.13, key: 'cut', rate: 1, ext: 'webp', off: 1755 }), Object.assign(B(58.51, 63.13, 'tiers', WC.ma, talkScene({ wall: ['UMUR ANAK', 'ANDA SEKARANG?'], tag: 'KESIMPULAN', sub: 'SUDAH ADA SIMPANAN EMAS?' })), { nobk: true })),
  B(63.13, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sKomen, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sMasa, IMG.sSepuluh, IMG.sHariini, IMG.sJangan, IMG.sMahal, IMG.sKos, IMG.sSatugram, IMG.sPinjaman, IMG.sKomen])), { nobk: true }),
];
