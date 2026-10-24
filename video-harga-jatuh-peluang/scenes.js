// scenes.js — "Harga Jatuh = Peluang? 5 Pesan Guru" (149.84s + outro 6s). Gaya video-papercut: adegan bercakap = paper-cut + headline wall + glass; SFX minimum (mix_sfx.sh).
const VOICE = 149.838367, DUR = VOICE + 6, HEADN = 4495;
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
const ASSETS = { ...PH, sPeluang: 'stk-peluang.png', sRendah: 'stk-rendah.png', sGram: 'stk-gram.png', sMatlamat: 'stk-matlamat.png', sBenteng: 'stk-benteng.png', sTenang: 'stk-tenang.png', sRm100: 'stk-rm100.png', sIstiqamah: 'stk-istiqamah.png', sRagu: 'stk-ragu.png' };

// ---------- klip app (frame jpg dalam clip/<kunci>/%04d.jpg @30fps) ----------
const CLIPN = { cut: 4600 };
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
  [0, 5.73, '*Harga *emas tengah *jatuh. Bila tengok harga emas turun macam ni, saya percaya ada yang mula *risau.'],
  [5.73, 11.55, 'Ada juga yang ambil keputusan untuk *tunggu dulu dengan harapan harga emas jatuh *lebih *rendah'],
  [11.55, 14.35, 'sebelum mereka nak mula beli emas balik.'],
  [14.35, 17.53, 'Sebenarnya benda ini buat saya teringat *pesan *guru saya'],
  [17.53, 21.98, 'tentang bagaimana kita sepatutnya melihat *kejatuhan harga emas.'],
  [21.98, 27.94, '*Pertama, anggap harga jatuh sebagai *peluang untuk kita kumpul *lebih *banyak *gram.'],
  [27.94, 31.23, 'Bagi orang yang menyimpan emas untuk jangka masa panjang,'],
  [31.23, 33.69, 'harga turun tak semestinya *berita *buruk.'],
  [33.69, 37.76, 'Masa harga naik kita gembira, nilai simpanan kita meningkat.'],
  [37.76, 42.72, 'Bila harga turun, itulah peluang untuk kita dapatkan *lebih *banyak *gram'],
  [42.72, 44.6, 'dengan jumlah wang yang sama.'],
  [44.6, 48.83, 'Cuma kita kena faham *matlamat sebenarnya kita simpan emas.'],
  [48.83, 52.92, '*Kedua, jangan terlalu sibuk mencari *harga *emas *paling *rendah.'],
  [52.92, 56.56, 'Sejujurnya, siapa yang tak nak beli emas pada harga paling murah?'],
  [56.56, 61.25, 'Tapi masalahnya, kita *tak *tahu bila harga paling rendah itu akan berlaku.'],
  [61.25, 65.41, 'Hari ini tunggu harga turun lagi, bila esok turun kita tunggu lagi.'],
  [65.41, 70.44, 'Akhirnya harga dah naik semula, kita masih belum mula menyimpan.'],
  [70.44, 75.71, '*Ketiga, *fokus *tambah *gram, bukan risau tentang naik turun harga emas.'],
  [75.71, 80.68, 'Jika *matlamat kita nak bina simpanan untuk *5 ataupun *10 *tahun,'],
  [80.68, 85.9, 'turun naik harga dalam sehari, dua, seminggu, sebulan, bukanlah sesuatu yang'],
  [85.9, 87.84, 'perkara kita perlu fikirkan.'],
  [87.84, 89.7, 'Apa yang lebih penting adalah'],
  [89.7, 94.5, '*berapa *banyak *gram yang berjaya kita kumpul dari semasa ke semasa.'],
  [94.5, 99.51, 'Bila kita *konsisten, sedikit demi sedikit simpanan itu akan *bertambah lama-lama.'],
  [99.51, 103.42, '*Keempat, fahami *fungsi *emas dalam *kewangan *keluarga.'],
  [103.42, 107.13, 'Emas adalah salah satu bentuk *simpanan *jangka *masa *panjang,'],
  [107.13, 109.68, 'bukan untuk cepat kaya sebulan dua.'],
  [109.68, 111.8, 'Kita tak tahu apa akan berlaku,'],
  [111.8, 117.41, 'mungkin ada *kecemasan, *kehilangan *pendapatan atau keperluan besar yang memaksa kita'],
  [117.41, 121.5, 'menggunakan simpanan. Dan yang *kelima,'],
  [121.5, 126.06, 'harga emas boleh turun, tapi itu tak bermakna kita perlu membuat keputusan berdasarkan *emosi.'],
  [126.06, 133.49, 'Kalau kita membeli emas untuk jangka masa panjang, pastikan kita *faham *risiko turun naik harga dan gunakan *wang *lebihan,'],
  [133.49, 138.06, 'bukan wang yang kita perlukan untuk belanja harian ataupun kecemasan.'],
  [138.06, 140.78, 'Jadi tuan puan, simpan emas dengan *ilmu yang betul.'],
  [140.78, 143.14, 'Bagi mereka yang nak mulakan *simpan *emas,'],
  [143.14, 144.98, 'boleh mula serendah *RM100.'],
  [144.98, 149.84, 'Boleh rujuk *pin *video saya. *Dulu *ragu, *kini *tahu. Jom mulakan *simpan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 5.73, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 5.73, 'tiers', WC.ma, talkScene({ wall: ['HARGA EMAS', 'TENGAH JATUH'], tag: 'HARGA EMAS', sub: 'RAMAI MULA RISAU' })), { nobk: true })),
  B(5.73, 21.98, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Tunggu Dulu?', 100);
    row(lt, 0.6, 440, 'Ramai yang', 'MULA RISAU'); row(lt, 3.6, 590, 'Tunggu harga', 'JATUH LEBIH RENDAH'); row(lt, 11.0, 740, 'Pesan guru', 'KEJATUHAN HARGA EMAS');
    stk(lt, .4, IMG.sRendah, 540, SB, 600);
  }),
  (CLIPS.push({ a: 21.98, b: 25.5, key: 'cut', rate: 1, ext: 'webp', off: 659 }), Object.assign(B(21.98, 25.5, 'tiers', WC.ma, talkScene({ wall: ['HARGA JATUH', 'SATU PELUANG'], tag: 'CARA  1', sub: 'KUMPUL LEBIH BANYAK GRAM' })), { nobk: true })),
  B(25.5, 48.83, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Harga Jatuh = Peluang', 84);
    row(lt, 2.2, 440, 'Harga turun', 'BUKAN BERITA BURUK'); row(lt, 12.3, 590, 'Harga turun', 'LEBIH BANYAK GRAM'); row(lt, 17.2, 740, 'Jumlah wang', 'YANG SAMA');
    stk(lt, .4, IMG.sPeluang, 540, SB, 600);
  }),
  (CLIPS.push({ a: 48.83, b: 52.5, key: 'cut', rate: 1, ext: 'webp', off: 1465 }), Object.assign(B(48.83, 52.5, 'tiers', WC.ma, talkScene({ wall: ['JANGAN CARI', 'HARGA TERENDAH'], tag: 'CARA  2', sub: 'TAK TAHU BILA PALING RENDAH' })), { nobk: true })),
  B(52.5, 70.44, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Harga Paling Rendah', 90);
    row(lt, 0.4, 440, 'Siapa tak nak', 'HARGA PALING MURAH'); row(lt, 4.1, 590, 'Tak tahu bila', 'HARGA TERENDAH'); row(lt, 8.7, 740, 'Tunggu lagi', 'HARGA NAIK SEMULA');
    stk(lt, .4, IMG.sRendah, 540, SB, 600);
  }),
  (CLIPS.push({ a: 70.44, b: 73.8, key: 'cut', rate: 1, ext: 'webp', off: 2113 }), Object.assign(B(70.44, 73.8, 'tiers', WC.ma, talkScene({ wall: ['FOKUS TAMBAH', 'GRAM'], tag: 'CARA  3', sub: 'BUKAN RISAU NAIK TURUN HARGA' })), { nobk: true })),
  B(73.8, 80.68, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Fokus Tambah Gram', 90);
    row(lt, 0.5, 440, 'Bukan risau', 'NAIK TURUN HARGA'); row(lt, 2.4, 590, 'Matlamat simpanan', '5 ATAU 10 TAHUN');
    stk(lt, .4, IMG.sMatlamat, 540, SB, 600);
  }),
  B(80.68, 94.5, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Berapa Banyak Gram', 84);
    row(lt, 0.6, 440, 'Naik turun harian', 'BUKAN FOKUS UTAMA'); row(lt, 7.0, 590, 'Berapa banyak', 'GRAM DIKUMPUL');
    stk(lt, .4, IMG.sGram, 540, SB, 600);
  }),
  B(94.5, 99.51, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Konsisten', 100);
    
    stk(lt, .4, IMG.sIstiqamah, 540, SB, 680);
  }),
  (CLIPS.push({ a: 99.51, b: 103.0, key: 'cut', rate: 1, ext: 'webp', off: 2985 }), Object.assign(B(99.51, 103.0, 'tiers', WC.ma, talkScene({ wall: ['FUNGSI EMAS', 'DALAM KELUARGA'], tag: 'CARA  4', sub: 'SIMPANAN JANGKA PANJANG' })), { nobk: true })),
  B(103.0, 117.41, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Benteng Keluarga', 96);
    row(lt, 0.5, 440, 'Simpanan', 'JANGKA PANJANG'); row(lt, 4.1, 590, 'Bukan untuk', 'CEPAT KAYA'); row(lt, 8.8, 740, 'Kecemasan', 'KEHILANGAN PENDAPATAN');
    stk(lt, .4, IMG.sBenteng, 540, SB, 600);
  }),
  (CLIPS.push({ a: 117.41, b: 121.5, key: 'cut', rate: 1, ext: 'webp', off: 3522 }), Object.assign(B(117.41, 121.5, 'tiers', WC.ma, talkScene({ wall: ['JANGAN IKUT', 'EMOSI'], tag: 'CARA  5', sub: 'KEPUTUSAN BUKAN ATAS EMOSI' })), { nobk: true })),
  B(121.5, 140.78, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Keputusan Tenang', 100);
    row(lt, 0.4, 440, 'Harga turun', 'JANGAN IKUT EMOSI'); row(lt, 4.6, 590, 'Faham risiko', 'TURUN NAIK HARGA'); row(lt, 10.0, 740, 'Guna wang', 'LEBIHAN SAHAJA');
    stk(lt, .4, IMG.sTenang, 540, SB, 600);
  }),
  B(140.78, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sRm100, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sPeluang, IMG.sRendah, IMG.sGram, IMG.sMatlamat, IMG.sBenteng, IMG.sTenang, IMG.sRm100, IMG.sIstiqamah, IMG.sRagu])), { nobk: true }),
];
