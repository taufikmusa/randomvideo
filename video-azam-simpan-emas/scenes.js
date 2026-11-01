// scenes.js — "Azam Kewangan Tahun Baru Yang Hilang" (95.36s + outro 6s). Gaya video-papercut.
const VOICE = 95.364354, DUR = VOICE + 6, HEADN = 2860;
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
const ASSETS = { ...PH, sAzam: 'stk-azam.png', sKembali: 'stk-kembali.png', sKomitmen: 'stk-komitmen.png', sDisiplin: 'stk-disiplin.png', sKonsisten: 'stk-konsisten.png', sSimpandulu: 'stk-simpandulu.png', sMula: 'stk-mula.png', sSasaran: 'stk-sasaran.png', sJom: 'stk-jom.png' };

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
  [0, 3.23, '*Azam *kewangan *tahun *baru yang hilang.'],
  [3.23, 8.79, 'Pernah tak kita masuk tahun baru dengan *semangat nak betulkan kewangan tapi'],
  [8.79, 12.45, 'barulah kita tersedar dah nak *tamat pun tahun ini.'],
  [12.45, 14.73, 'Semuanya dah *kembali macam biasa.'],
  [14.73, 18.11, 'Awal tahun dahulu kita berazam nak *menyimpan,'],
  [18.11, 19.9, 'tapi bila ada *sale,'],
  [19.9, 26.48, 'bila ada *komitmen, bila mana kita gunakan duit untuk enjoy,'],
  [26.48, 29.25, 'duit simpanan kita pula yang kita usik sendiri.'],
  [29.25, 32.25, 'Masalahnya, kita terlalu fokus pada *target'],
  [32.25, 35.65, 'tapi kita tak membina *disiplin dalam menyimpan.'],
  [35.65, 39.23, 'Jadi tuan puan, pesan guru saya, kalau kita nak ubah'],
  [39.23, 43.05, 'kewangan, kita kena mula melihat diri kita dengan cara berbeza.'],
  [43.05, 47.78, 'Bukan sekadar nak kumpul simpanan, tetapi menjadi seorang yang'],
  [47.78, 55.79, '*konsisten, *berdisiplin membina simpanan. Setiap kali kita *asingkan duit sebelum berbelanja, kita sedang membina *tabiat *baru.'],
  [55.79, 57.46, 'Tak perlu ada duit banyak.'],
  [57.46, 59.47, 'Melalui akaun emas GAP Public Gold,'],
  [59.47, 63.98, 'semua orang boleh mulakan simpanan emas *serendah *RM100 tanpa'],
  [63.98, 67.36, '*komitmen *bulanan. Ikut kemampuan sendiri.'],
  [67.36, 70.91, 'Jadi cuba tetapkan satu *sasaran *kecil bulan ini.'],
  [70.91, 73.53, 'Yang penting, jangan sekadar berazam.'],
  [73.53, 77.69, 'Bina *sistem supaya kita boleh teruskan *konsisten walaupun semangat'],
  [77.69, 82.38, 'dah hilang. Sebab kewangan yang kukuh bukan dibina dalam sehari dua,'],
  [82.38, 84.82, 'tetapi melalui *tindakan *kecil'],
  [84.82, 87.0, 'yang kita ulang setiap bulan.'],
  [87.0, 90.84, '*Dulu *ragu, *kini *tahu. Tuan puan yang dah ready nak mulakan simpan emas,'],
  [90.84, 93.48, 'boleh daftar ikut emas *percuma di bawah.'],
  [93.48, 95.36, 'Jom *simpan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 3.23, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 3.23, 'tiers', WC.ma, talkScene({ wall: ['AZAM KEWANGAN', 'TAHUN BARU'], tag: 'AZAM  HILANG', sub: 'YANG HILANG DI TENGAH JALAN' })), { nobk: true })),
  B(3.23, 8.79, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Azam Tahun Baru', 92);
    row(lt, 0.4, 440, 'Tahun baru', 'SEMANGAT BETULKAN KEWANGAN');
    stk(lt, .4, IMG.sAzam, 540, SB, 600);
  }),
  B(8.79, 14.73, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Dah Kembali Biasa?', 92);
    row(lt, 0.4, 440, 'Dah nak tamat', 'TAHUN INI'); row(lt, 3.0, 590, 'Semuanya', 'KEMBALI MACAM BIASA');
    stk(lt, .4, IMG.sKembali, 540, SB, 600);
  }),
  B(14.73, 29.25, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Duit Simpanan Diusik', 92);
    row(lt, 0.5, 440, 'Berazam nak', 'MENYIMPAN'); row(lt, 3.4, 590, 'Bila ada sale', 'DAN KOMITMEN'); row(lt, 11.8, 740, 'Duit simpanan', 'KITA USIK SENDIRI');
    stk(lt, .4, IMG.sKomitmen, 540, SB, 600);
  }),
  B(29.25, 39.23, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Fokus Target Sahaja', 92);
    row(lt, 0.4, 440, 'Terlalu fokus', 'PADA TARGET'); row(lt, 3.0, 590, 'Tak bina', 'DISIPLIN MENYIMPAN');
    stk(lt, .4, IMG.sDisiplin, 540, SB, 600);
  }),
  (CLIPS.push({ a: 39.23, b: 43.05, key: 'cut', rate: 1, ext: 'webp', off: 1177 }), Object.assign(B(39.23, 43.05, 'tiers', WC.ma, talkScene({ wall: ['LIHAT DIRI', 'CARA BERBEZA'], tag: 'PESAN  GURU', sub: 'KEWANGAN BERMULA DARI DIRI' })), { nobk: true })),
  B(43.05, 49.2, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Bina Disiplin', 96);
    row(lt, 0.4, 440, 'Bukan sekadar', 'KUMPUL SIMPANAN'); row(lt, 4.7, 590, 'Jadi', 'KONSISTEN & BERDISIPLIN');
    stk(lt, .4, IMG.sKonsisten, 540, SB, 600);
  }),
  B(49.2, 55.79, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Simpan Dulu', 100);
    row(lt, 0.4, 440, 'Asingkan duit', 'SEBELUM BERBELANJA'); row(lt, 3.6, 590, 'Bina', 'TABIAT BARU');
    stk(lt, .4, IMG.sSimpandulu, 540, SB, 600);
  }),
  B(55.79, 67.36, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Mula Serendah RM100', 92);
    row(lt, 0.4, 440, 'Tak perlu', 'DUIT BANYAK'); row(lt, 3.7, 590, 'Mula serendah', 'RM100'); row(lt, 8.2, 740, 'Tanpa', 'KOMITMEN BULANAN');
    stk(lt, .4, IMG.sMula, 540, SB, 600);
  }),
  B(67.36, 77.69, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Sasaran Kecil', 100);
    row(lt, 0.4, 440, 'Satu sasaran kecil', 'BULAN INI'); row(lt, 3.6, 590, 'Jangan sekadar', 'BERAZAM'); row(lt, 6.2, 740, 'Bina', 'SISTEM');
    stk(lt, .4, IMG.sSasaran, 540, SB, 600);
  }),
  (CLIPS.push({ a: 77.69, b: 84.82, key: 'cut', rate: 1, ext: 'webp', off: 2331 }), Object.assign(B(77.69, 84.82, 'tiers', WC.ma, talkScene({ wall: ['TINDAKAN KECIL', 'ULANG SETIAP BULAN'], tag: 'KESIMPULAN', sub: 'KEWANGAN KUKUH BUKAN SEHARI DUA' })), { nobk: true })),
  B(84.82, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sJom, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sAzam, IMG.sKembali, IMG.sKomitmen, IMG.sDisiplin, IMG.sKonsisten, IMG.sSimpandulu, IMG.sMula, IMG.sSasaran, IMG.sJom])), { nobk: true }),
];
