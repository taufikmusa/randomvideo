// scenes.js — "5 Cara Tukar Side Income Jadi Kekayaan Kekal" (93.14s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
// (dibina semula guna skill video-papercut: adegan bercakap = paper-cut + headline wall + glass)
const VOICE = 93.135238, DUR = VOICE + 6, HEADN = 2794;
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
const ASSETS = { ...PH, sLesap: 'stk-lesap.png', sAkaun: 'stk-akaun.png', sMatlamat: 'stk-matlamat.png', sGayahidup: 'stk-gayahidup.png', sKonsisten: 'stk-konsisten.png', sEmasfizikal: 'stk-emasfizikal.png', sHasil: 'stk-hasil.png', sAsetkekal: 'stk-asetkekal.png', sKunci: 'stk-kunci.png' };

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
  [0, 4.56, '*5 *cara tukar *side *income jadi *kekayaan kekal.'],
  [4.56, 7.88, 'Ramai rakyat Malaysia gigih buat *kerja *sampingan,'],
  [7.88, 11.85, '*berniaga *online, bawa *Grab dan buat *dropship.'],
  [11.85, 14.35, 'Tapi jika tidak diurus dengan bijak,'],
  [14.35, 17.85, 'wang kerja lebih masa ini akan *lesap begitu saja.'],
  [17.85, 20.72, '*Pertama, *asingkan *akaun'],
  [20.72, 23.27, '*side *income daripada akaun *gaji utama.'],
  [23.27, 25.84, 'Jangan biarkan duit hasil *titik *peluh'],
  [25.84, 28.16, 'bercampur dengan *belanja harian.'],
  [28.16, 32.2, '*Kedua, tetapkan *matlamat *jelas untuk setiap *ringgit.'],
  [32.2, 35.71, 'Tentukan berapa *peratus untuk *pusing *modal'],
  [35.71, 39.23, 'dan berapa peratus untuk dikunci jadi *aset.'],
  [39.23, 44.32, '*Ketiga, elak guna duit sampingan untuk naikkan *gaya *hidup.'],
  [44.32, 49.31, 'Beli barang mewah dengan *side *income hanya menambah *komitmen *baru.'],
  [49.31, 53.44, '*Keempat, *konsisten dalam *menabung mengalahkan'],
  [53.44, 55.27, 'menyimpan dalam *jumlah'],
  [55.27, 57.74, '*besar tapi hanya sekali-sekala.'],
  [57.74, 61.67, 'Disiplin menyimpan *sedikit setiap minggu *membina *kekayaan.'],
  [61.67, 66.13, 'Dan *kelima, *salurkan keuntungan kerja sampingan'],
  [66.13, 68.48, 'ke dalam bentuk *emas *fizikal.'],
  [68.48, 70.91, 'Tukar usaha penat anda'],
  [70.91, 73.66, 'menjadi *aset yang tidak *susut *nilai'],
  [73.66, 75.63, 'dalam jangka masa panjang.'],
  [75.63, 78.84, 'Penat lelah kerja sampingan, *mesti ada *hasilnya.'],
  [78.84, 83.31, 'Biar setiap *titis *peluh anda bertukar menjadi *aset *emas.'],
  [83.31, 87.99, '*Kunci *keuntungan dengan *simpan *emas. Tuan puan yang dah ready nak mulakan,'],
  [87.99, 91.0, 'boleh rujuk *pin *video saya. *Dulu *ragu, *kini *tahu.'],
  [91.0, 93.14, 'Jom mulakan *simpan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 4.56, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 4.56, 'tiers', WC.ma, talkScene({ wall: ['SIDE INCOME', 'JADI KEKAL'], tag: '5  CARA', sub: 'KEKAYAAN YANG TAK LESAP' })), { nobk: true })),
  B(4.56, 17.85, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Kerja Sampingan', 96);
    row(lt, 3.3, 440, 'Berniaga', 'ONLINE'); row(lt, 4.7, 590, 'Bawa', 'GRAB'); row(lt, 6.0, 740, 'Buat', 'DROPSHIP');
    stk(lt, .4, IMG.sLesap, 540, SB, 560);
  }),
  (CLIPS.push({ a: 17.85, b: 21.5, key: 'cut', rate: 1, ext: 'webp', off: 536 }), Object.assign(B(17.85, 21.5, 'tiers', WC.ma, talkScene({ wall: ['ASINGKAN AKAUN', 'SIDE INCOME'], tag: 'CARA  1', sub: 'DARI AKAUN GAJI UTAMA' })), { nobk: true })),
  B(21.5, 28.16, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Akaun Berasingan', 96);
    row(lt, .3, 440, 'Side income', 'AKAUN LAIN'); row(lt, 2.8, 590, 'Hasil titik peluh', 'JANGAN BERCAMPUR');
    stk(lt, .4, IMG.sAkaun, 540, SB, 620);
  }),
  (CLIPS.push({ a: 28.16, b: 32.2, key: 'cut', rate: 1, ext: 'webp', off: 845 }), Object.assign(B(28.16, 32.2, 'tiers', WC.ma, talkScene({ wall: ['MATLAMAT JELAS', 'SETIAP RINGGIT'], tag: 'CARA  2', sub: 'UNTUK SETIAP RINGGIT' })), { nobk: true })),
  B(32.2, 39.23, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Matlamat Jelas', 100);
    row(lt, .5, 440, 'Setiap ringgit', 'ADA MATLAMAT'); row(lt, 2.0, 590, 'Peratus untuk', 'PUSING MODAL'); row(lt, 4.4, 740, 'Peratus untuk', 'DIKUNCI JADI ASET');
    stk(lt, .4, IMG.sMatlamat, 540, SB, 600);
  }),
  (CLIPS.push({ a: 39.23, b: 42.8, key: 'cut', rate: 1, ext: 'webp', off: 1177 }), Object.assign(B(39.23, 42.8, 'tiers', WC.ma, talkScene({ wall: ['ELAK NAIK', 'GAYA HIDUP'], tag: 'CARA  3', sub: 'JANGAN TAMBAH KOMITMEN BARU' })), { nobk: true })),
  B(42.8, 49.31, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Gaya Hidup', 100);
    row(lt, 1.6, 440, 'Barang mewah', 'TAMBAH KOMITMEN');
    stk(lt, .4, IMG.sGayahidup, 540, SB, 620);
  }),
  (CLIPS.push({ a: 49.31, b: 53.44, key: 'cut', rate: 1, ext: 'webp', off: 1479 }), Object.assign(B(49.31, 53.44, 'tiers', WC.ma, talkScene({ wall: ['KONSISTEN', 'MENABUNG'], tag: 'CARA  4', sub: 'SEDIKIT SETIAP MINGGU' })), { nobk: true })),
  B(53.44, 61.67, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Konsisten Menabung', 90);
    row(lt, 1.8, 440, 'Bukan jumlah besar', 'SEKALI-SEKALA'); row(lt, 4.3, 590, 'Simpan sedikit', 'SETIAP MINGGU'); row(lt, 6.4, 740, 'Membina', 'KEKAYAAN');
    stk(lt, .4, IMG.sKonsisten, 540, SB, 600);
  }),
  (CLIPS.push({ a: 61.67, b: 66.13, key: 'cut', rate: 1, ext: 'webp', off: 1850 }), Object.assign(B(61.67, 66.13, 'tiers', WC.ma, talkScene({ wall: ['SALUR KE', 'EMAS FIZIKAL'], tag: 'CARA  5', sub: 'ASET YANG TAK SUSUT NILAI' })), { nobk: true })),
  B(66.13, 75.63, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Emas Fizikal', 100);
    row(lt, .6, 440, 'Salur keuntungan', 'KE EMAS FIZIKAL'); row(lt, 3.0, 590, 'Usaha penat', 'JADI ASET'); row(lt, 5.0, 740, 'Tidak susut', 'NILAI');
    stk(lt, .4, IMG.sEmasfizikal, 540, SB, 600);
  }),
  B(75.63, 78.84, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Penat Lelah', 100); stk(lt, .3, IMG.sHasil, 540, SB, 680); }),
  B(78.84, 83.31, 'merak5', WC.ma, (lt) => { ttl(lt, 'Jadi Aset Emas', 100); stk(lt, .3, IMG.sAsetkekal, 540, SB, 680); }),
  B(83.31, 87.99, 'bungamas', WC.ma, (lt) => { ttl(lt, 'Kunci Keuntungan', 96); stk(lt, .3, IMG.sKunci, 540, SB, 680); }),
  B(87.99, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sEmasfizikal, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sLesap, IMG.sAkaun, IMG.sMatlamat, IMG.sGayahidup, IMG.sKonsisten, IMG.sEmasfizikal, IMG.sHasil, IMG.sAsetkekal, IMG.sKunci])), { nobk: true }),
];
