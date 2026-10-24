// scenes.js — "5 Sebab Ansuran Kereta Boleh Mencekik" (104.05s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
// (dibina semula guna skill video-papercut: adegan bercakap = paper-cut + headline wall + glass)
const VOICE = 104.048617, DUR = VOICE + 6, HEADN = 3121;
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
const ASSETS = { ...PH, sAnsuran: 'stk-ansuran.png', sSusut: 'stk-susut.png', sKos: 'stk-kos.png', sGaya: 'stk-gaya.png', sMewah: 'stk-mewah.png', sRm500: 'stk-rm500.png', sFungsi: 'stk-fungsi.png', sBebas: 'stk-bebas.png', sBijak: 'stk-bijak.png' };

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
  [0, 3.81, '*5 *sebab *ansuran *kereta boleh *mencekik.'],
  [3.81, 8.89, 'Kereta adalah satu *keperluan asas untuk bergerak'],
  [8.89, 11.1, 'ke tempat kerja di Malaysia.'],
  [11.1, 18.34, 'Namun, tersilap memilih model kereta boleh *menyesakkan kita pada masa depan.'],
  [18.34, 23.97, '*Pertama, *ansuran *bulanan menelan *peratusan gaji yang terlalu besar.'],
  [23.97, 25.73, 'Komitmen *mencecah'],
  [25.73, 28.6, '*ribuan *ringgit sebulan, menyekat peluang'],
  [28.6, 31.15, 'untuk *menabung.'],
  [31.15, 35.76, '*Kedua, kereta adalah aset yang *susut *nilai sebaik keluar pusat'],
  [35.76, 40.25, 'pameran. Nilainya jatuh setiap tahun bersama kos'],
  [40.25, 42.7, '*penyelenggaraan yang makin meningkat.'],
  [42.7, 46.13, '*Kos *sampingan yang tersembunyi:'],
  [46.13, 48.66, '*insurans tahunan, *cukai *jalan,'],
  [48.66, 52.18, '*tayar, *servis, *tol dan *minyak menambah'],
  [52.18, 53.83, 'beban poket anda.'],
  [53.83, 57.53, '*Keempat, pilih kenderaan mengikut *fungsi *sebenar'],
  [57.53, 59.85, 'bukan kerana *martabat.'],
  [59.85, 63.38, 'Kereta mewah memberikan *kepuasan *sementara,'],
  [63.38, 66.36, 'tapi mencuri *kebebasan *kewangan.'],
  [66.36, 71.03, 'Dan *kelima, pilih model kereta yang sesuai dengan *budget anda,'],
  [71.03, 74.15, 'dan alihkan sebahagian daripada *pendapatan'],
  [74.15, 77.94, 'ke dalam bentuk simpanan seperti *aset *emas.'],
  [77.94, 81.98, 'Anda boleh memiliki kereta yang *biasa-biasa,'],
  [81.98, 85.33, 'tapi memiliki *aset yang *luar *biasa.'],
  [85.33, 87.97, 'Kereta membawa anda ke tempat kerja,'],
  [87.97, 90.16, 'tapi *simpanan *aset *emas'],
  [90.16, 92.11, 'membawa anda ke arah'],
  [92.11, 93.87, '*kebebasan *kewangan.'],
  [93.87, 96.06, 'Jadi, pilih kenderaan dengan *bijak.'],
  [96.06, 98.81, 'Tuan puan yang dah ready nak mulakan *simpan *emas,'],
  [98.81, 102.29, 'boleh rujuk *pin *video saya. *Dulu *ragu, *kini *tahu. Jom,'],
  [102.29, 104.05, 'mulakan *simpan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 3.81, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 3.81, 'tiers', WC.ma, talkScene({ wall: ['ANSURAN KERETA', 'BOLEH MENCEKIK'], tag: '5  SEBAB', sub: 'TERSILAP PILIH MODEL?' })), { nobk: true })),
  B(3.81, 18.34, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Kereta Keperluan', 90);
    row(lt, 0.4, 440, 'Kereta', 'KEPERLUAN ASAS'); row(lt, 3.9, 590, 'Bergerak ke', 'TEMPAT KERJA'); row(lt, 7.3, 740, 'Silap pilih model', 'MENYESAKKAN MASA DEPAN');
    stk(lt, .4, IMG.sFungsi, 540, SB, 560);
  }),
  (CLIPS.push({ a: 18.34, b: 22.5, key: 'cut', rate: 1, ext: 'webp', off: 550 }), Object.assign(B(18.34, 22.5, 'tiers', WC.ma, talkScene({ wall: ['ANSURAN BULANAN', 'MENELAN GAJI'], tag: 'SEBAB  1', sub: 'MENYEKAT PELUANG MENABUNG' })), { nobk: true })),
  B(22.5, 30.9, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Ansuran Bulanan', 96);
    row(lt, 1.5, 440, 'Komitmen', 'MENCECAH RIBUAN RM'); row(lt, 3.7, 590, 'Ribuan ringgit', 'SEBULAN'); row(lt, 5.8, 740, 'Menyekat peluang', 'UNTUK MENABUNG');
    stk(lt, .4, IMG.sAnsuran, 540, SB, 600);
  }),
  (CLIPS.push({ a: 30.9, b: 34.6, key: 'cut', rate: 1, ext: 'webp', off: 927 }), Object.assign(B(30.9, 34.6, 'tiers', WC.ma, talkScene({ wall: ['KERETA ASET', 'SUSUT NILAI'], tag: 'SEBAB  2', sub: 'SEBAIK KELUAR PUSAT PAMERAN' })), { nobk: true })),
  B(34.6, 42.7, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Susut Nilai', 100);
    row(lt, 1.2, 440, 'Sebaik keluar', 'PUSAT PAMERAN'); row(lt, 3.0, 590, 'Nilai jatuh', 'SETIAP TAHUN'); row(lt, 5.7, 740, 'Kos penyelenggaraan', 'MENINGKAT');
    stk(lt, .4, IMG.sSusut, 540, SB, 600);
  }),
  (CLIPS.push({ a: 42.7, b: 46.7, key: 'cut', rate: 1, ext: 'webp', off: 1281 }), Object.assign(B(42.7, 46.7, 'tiers', WC.ma, talkScene({ wall: ['KOS SAMPINGAN', 'TERSEMBUNYI'], tag: 'SEBAB  3', sub: 'INSURANS, TOL, MINYAK' })), { nobk: true })),
  B(46.7, 53.83, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Kos Sampingan', 96);
    row(lt, 0.2, 440, 'Insurans', 'CUKAI JALAN'); row(lt, 1.9, 590, 'Tayar', 'SERVIS'); row(lt, 3.4, 740, 'Tol', 'MINYAK');
    stk(lt, .4, IMG.sKos, 540, SB, 600);
  }),
  (CLIPS.push({ a: 53.83, b: 57.0, key: 'cut', rate: 1, ext: 'webp', off: 1615 }), Object.assign(B(53.83, 57.0, 'tiers', WC.ma, talkScene({ wall: ['PILIH IKUT', 'FUNGSI SEBENAR'], tag: 'SEBAB  4', sub: 'BUKAN KERANA MARTABAT' })), { nobk: true })),
  B(57.0, 59.85, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Bukan Martabat', 100);
    
    stk(lt, .4, IMG.sGaya, 540, SB, 680);
  }),
  B(59.85, 66.36, 'bungamas', WC.ma, (lt) => {
    ttl(lt, 'Kepuasan Sementara', 90);
    row(lt, 0.5, 440, 'Kereta mewah', 'KEPUASAN SEMENTARA'); row(lt, 3.3, 590, 'Mencuri', 'KEBEBASAN KEWANGAN');
    stk(lt, .4, IMG.sMewah, 540, SB, 600);
  }),
  (CLIPS.push({ a: 66.36, b: 70.5, key: 'cut', rate: 1, ext: 'webp', off: 1991 }), Object.assign(B(66.36, 70.5, 'tiers', WC.ma, talkScene({ wall: ['PILIH IKUT', 'BUDGET ANDA'], tag: 'SEBAB  5', sub: 'ALIH KE SIMPANAN EMAS' })), { nobk: true })),
  B(70.5, 85.33, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Alih Ke Emas', 100);
    row(lt, 0.5, 440, 'Model kereta ikut', 'BUDGET ANDA'); row(lt, 3.6, 590, 'Alih pendapatan', 'KE SIMPANAN EMAS'); row(lt, 7.5, 740, 'Kereta biasa', 'ASET LUAR BIASA');
    stk(lt, .4, IMG.sRm500, 540, SB, 600);
  }),
  B(85.33, 87.97, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Ke Tempat Kerja', 100);
    
    stk(lt, .4, IMG.sFungsi, 540, SB, 680);
  }),
  B(87.97, 96.06, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Ke Kebebasan', 100);
    row(lt, 0.4, 440, 'Simpanan aset emas', 'KE KEBEBASAN KEWANGAN'); row(lt, 5.9, 590, 'Pilih kenderaan', 'DENGAN BIJAK');
    stk(lt, .4, IMG.sBebas, 540, SB, 600);
  }),
  B(96.06, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sBijak, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sAnsuran, IMG.sSusut, IMG.sKos, IMG.sGaya, IMG.sMewah, IMG.sRm500, IMG.sFungsi, IMG.sBebas, IMG.sBijak])), { nobk: true }),
];
