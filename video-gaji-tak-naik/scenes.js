// scenes.js — "5 Cara Selamatkan Poket Bila Gaji Tak Naik" (100.54s + outro 6s). Maroon-emas + sticker pop-up. Hard cut.
// (dibina semula guna skill video-papercut: adegan bercakap = paper-cut + headline wall + glass)
const VOICE = 100.542404, DUR = VOICE + 6, HEADN = 3016;
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
const ASSETS = { ...PH, sSlip: 'stk-slip.png', sKuasa: 'stk-kuasa.png', sKawal: 'stk-kawal.png', sAsetinflasi: 'stk-asetinflasi.png', sTambahan: 'stk-tambahan.png', sLindung: 'stk-lindung.png', sGajitaknaik: 'stk-gajitaknaik.png', sBijaksana: 'stk-bijaksana.png', sPerisai: 'stk-perisai.png' };

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
  [0, 3.97, '*5 *cara *selamatkan *poket bila *gaji tak naik.'],
  [3.97, 7.09, 'Gaji pada *slip tidak berubah bertahun-tahun,'],
  [7.09, 9.15, 'tapi harga makanan,'],
  [9.15, 12.07, 'harga barang keperluan *melambung naik.'],
  [12.07, 15.84, 'Realiti ini pasti menyesakkan dada ramai orang.'],
  [15.84, 18.46, 'Namun, kita boleh ambil langkah.'],
  [18.46, 20.72, '*Pertama,'],
  [20.72, 24.42, 'fahami hakikat *kuasa *beli yang semakin mengecil.'],
  [24.42, 30.4, 'Gaji yang sama bermaksud kita semakin miskin kerana harga barang meningkat.'],
  [30.4, 35.93, '*Kedua, fokus kepada perkara yang berada dalam *kawalan kita.'],
  [35.93, 38.75, 'Kita tak boleh kawal *inflasi negara,'],
  [38.75, 41.24, 'tapi kita boleh kawal corak'],
  [41.24, 43.07, '*belanja kita sendiri.'],
  [43.07, 47.91, '*Ketiga, *simpan *aset yang nilainya meningkat bersama *inflasi.'],
  [47.91, 50.8, '*Emas *fizikal adalah *perisai'],
  [50.8, 55.25, 'kerana harganya naik seiring kenaikan kos sara hidup.'],
  [55.25, 59.31, '*Keempat, *terokai punca *pendapatan *tambahan.'],
  [59.31, 65.9, 'Membina aliran wang baru membantu kita mengurangkan tekanan kenaikan kos harian.'],
  [65.9, 69.52, 'Dan *kelima, *lindungi *simpanan yang ada'],
  [69.52, 72.45, 'sebelum nilainya makin *terhakis.'],
  [72.45, 78.05, 'Jangan biarkan wang tunai reput dimamah *inflasi dalam akaun.'],
  [78.05, 81.39, 'Gaji mungkin tak naik seperti yang kita harapkan.'],
  [81.39, 84.98, 'Namun, *kebijaksanaan kita urus *aset'],
  [84.98, 89.57, 'melindungi nilai pendapatan yang kita kerja keras sebelum ini.'],
  [89.57, 93.22, 'Jadi, *bina *perisai *kewangan anda hari ini.'],
  [93.22, 96.92, 'Tuan puan yang dah ready nak mulakan *simpan *emas, boleh rujuk *pin *video saya.'],
  [96.92, 98.53, '*Dulu *ragu, *kini *tahu.'],
  [98.53, 100.54, 'Jom mulakan *simpan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 3.97, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 3.97, 'tiers', WC.ma, talkScene({ wall: ['GAJI TAK NAIK', 'POKET SELAMAT'], tag: '5  CARA', sub: 'SELAMATKAN POKET ANDA' })), { nobk: true })),
  B(3.97, 18.46, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Gaji Tak Berubah', 90);
    row(lt, 0.5, 440, 'Gaji pada slip', 'TAK BERUBAH'); row(lt, 5.2, 590, 'Harga barang', 'MELAMBUNG NAIK');
    stk(lt, .4, IMG.sSlip, 540, SB, 580);
  }),
  (CLIPS.push({ a: 18.46, b: 22.0, key: 'cut', rate: 1, ext: 'webp', off: 554 }), Object.assign(B(18.46, 22.0, 'tiers', WC.ma, talkScene({ wall: ['KUASA BELI', 'MENGECIL'], tag: 'CARA  1', sub: 'GAJI SAMA, HARGA NAIK' })), { nobk: true })),
  B(22.0, 30.4, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Kuasa Beli', 100);
    row(lt, 0.3, 440, 'Kuasa beli', 'MENGECIL'); row(lt, 3.0, 590, 'Gaji sama', 'HARGA BARANG NAIK');
    stk(lt, .4, IMG.sKuasa, 540, SB, 620);
  }),
  (CLIPS.push({ a: 30.4, b: 34.0, key: 'cut', rate: 1, ext: 'webp', off: 912 }), Object.assign(B(30.4, 34.0, 'tiers', WC.ma, talkScene({ wall: ['FOKUS DALAM', 'KAWALAN KITA'], tag: 'CARA  2', sub: 'BUKAN RISAU INFLASI' })), { nobk: true })),
  B(34.0, 43.07, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Dalam Kawalan', 100);
    row(lt, 1.9, 440, 'Tak boleh kawal', 'INFLASI NEGARA'); row(lt, 5.0, 590, 'Boleh kawal', 'CORAK BELANJA');
    stk(lt, .4, IMG.sKawal, 540, SB, 620);
  }),
  (CLIPS.push({ a: 43.07, b: 46.5, key: 'cut', rate: 1, ext: 'webp', off: 1292 }), Object.assign(B(43.07, 46.5, 'tiers', WC.ma, talkScene({ wall: ['SIMPAN ASET', 'LAWAN INFLASI'], tag: 'CARA  3', sub: 'NILAI NAIK BERSAMA INFLASI' })), { nobk: true })),
  B(46.5, 55.25, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Aset Fizikal', 100);
    row(lt, 1.5, 440, 'Emas fizikal', 'ADALAH PERISAI'); row(lt, 4.3, 590, 'Harga naik', 'SEIRING KOS HIDUP');
    stk(lt, .4, IMG.sAsetinflasi, 540, SB, 620);
  }),
  (CLIPS.push({ a: 55.25, b: 58.5, key: 'cut', rate: 1, ext: 'webp', off: 1658 }), Object.assign(B(55.25, 58.5, 'tiers', WC.ma, talkScene({ wall: ['PENDAPATAN', 'TAMBAHAN'], tag: 'CARA  4', sub: 'KURANGKAN TEKANAN KOS HARIAN' })), { nobk: true })),
  B(58.5, 65.9, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Aliran Wang Baru', 96);
    row(lt, 0.8, 440, 'Aliran wang baru', 'KURANGKAN TEKANAN'); row(lt, 4.0, 590, 'Kos harian', 'MENINGKAT');
    stk(lt, .4, IMG.sTambahan, 540, SB, 620);
  }),
  (CLIPS.push({ a: 65.9, b: 69.0, key: 'cut', rate: 1, ext: 'webp', off: 1977 }), Object.assign(B(65.9, 69.0, 'tiers', WC.ma, talkScene({ wall: ['LINDUNGI', 'SIMPANAN ADA'], tag: 'CARA  5', sub: 'SEBELUM NILAI TERHAKIS' })), { nobk: true })),
  B(69.0, 78.05, 'merak5', WC.ma, (lt) => {
    ttl(lt, 'Simpanan Terhakis', 92);
    row(lt, 0.6, 440, 'Sebelum nilai', 'TERHAKIS'); row(lt, 3.6, 590, 'Wang tunai', 'DIMAMAH INFLASI');
    stk(lt, .4, IMG.sLindung, 540, SB, 620);
  }),
  B(78.05, 81.39, 'dinarPantai', WC.ma, (lt) => {
    ttl(lt, 'Gaji Tak Naik', 100);
    
    stk(lt, .4, IMG.sGajitaknaik, 540, SB, 680);
  }),
  B(81.39, 89.57, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Kebijaksanaan', 100);
    row(lt, 3.6, 440, 'Urus aset', 'LINDUNG NILAI');
    stk(lt, .4, IMG.sBijaksana, 540, SB, 620);
  }),
  B(89.57, 93.22, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Bina Perisai', 100);
    
    stk(lt, .4, IMG.sPerisai, 540, SB, 680);
  }),
  B(93.22, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sAsetinflasi, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sSlip, IMG.sKuasa, IMG.sKawal, IMG.sAsetinflasi, IMG.sTambahan, IMG.sLindung, IMG.sGajitaknaik, IMG.sBijaksana, IMG.sPerisai])), { nobk: true }),
];
