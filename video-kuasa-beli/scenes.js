// scenes.js — "5 Langkah Selamatkan Simpanan Daripada Hakisan Inflasi" (100.64s + outro 6s). Gaya video-papercut.
const VOICE = 100.635283, DUR = VOICE + 6, HEADN = 3019;
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
const ASSETS = { ...PH, sRajin: 'stk-rajin.png', sAlih: 'stk-alih.png', sDaftar: 'stk-daftar.png', sInstall: 'stk-install.png', sLogin: 'stk-login.png', sTopup: 'stk-topup.png', sKonsisten: 'stk-konsisten.png', sKuasa: 'stk-kuasa.png', sKunci: 'stk-kunci.png' };

// ---------- klip app (frame jpg dalam clip/<kunci>/%04d.jpg @30fps) ----------
const CLIPN = { daftar: 223, install: 241, login: 189, topup: 233, withdraw: 289, cut: 3100 };
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
  [0, 5.7, '*Rajin *menabung duit dalam bank bertahun-tahun, tapi sedar tak *kuasa *beli simpanan semakin'],
  [5.7, 7.55, 'dihakis oleh *inflasi.'],
  [7.55, 13.8, 'Dengan inflasi, kita kena gunakan duit yang lebih banyak untuk dapat barang yang sama.'],
  [13.8, 18.69, 'Jadi saya kongsikan *5 *langkah untuk selamatkan simpanan jangka panjang'],
  [18.69, 20.54, 'daripada *hakisan inflasi.'],
  [20.54, 24.56, 'Tuan puan boleh *alihkan simpanan jangka masa panjang *2 *tahun'],
  [24.56, 29.62, 'dan ke atas kepada bentuk emas. *Pertama, *daftar akaun secara *percuma.'],
  [29.62, 33.73, 'Linknya saya kongsikan di bawah untuk pembukaan akaun emas percuma di Public Gold.'],
  [33.73, 37.12, '*Kedua, tuan puan boleh *install apps Public Gold,'],
  [37.12, 40.99, 'sebab kita gunakan app tersebut untuk mulakan tabungan emas.'],
  [40.99, 49.83, '*Ketiga, bagaimana nak *log *masuk? Tuan puan boleh gunakan *IC sendiri tanpa dash sebagai username dan password sementara.'],
  [49.83, 55.27, '*Keempat, tuan puan dah boleh *top *up simpanan emas yang pertama untuk aktifkan akaun.'],
  [55.27, 64.75, 'Jangan bimbang, tuan puan beli emas *RM100 hari ini dapat gram emas, tuan puan beli *satu *gram tuan puan akan dapat gram emas tersebut dalam akaun emas sendiri.'],
  [64.75, 68.98, 'Dan yang *kelima, boleh *kekal *konsisten untuk tambah tabungan.'],
  [68.98, 70.66, 'Tiap kali tambah tabungan,'],
  [70.66, 72.6, 'simpanan gram emas akan bertambah.'],
  [72.6, 75.57, 'Dan tuan puan boleh *tukar gram emas tersebut'],
  [75.57, 78.66, 'kepada *wang *tunai balik, ataupun tuan puan nak'],
  [78.66, 84.77, 'dapatkan *item *emas *fizikal yang pelbagai saiz di Public Gold, boleh tukar gram kepada item emas.'],
  [84.77, 89.67, 'Jadi menyimpan nombor wang kertas membuatkan *kuasa *beli simpanan kita makin *mengecil.'],
  [89.67, 93.32, '*Kunci nilai simpanan tersebut dengan *emas *fizikal.'],
  [93.32, 95.34, 'Tuan puan yang dah ready nak bermula,'],
  [95.34, 100.64, 'boleh daftar ikut emas percuma. *Dulu *ragu, *kini *tahu, jom mulakan *simpanan *emas.'],
];
const SCENES = [
  (CLIPS.push({ a: 0, b: 5.7, key: 'cut', rate: 1, ext: 'webp' }), Object.assign(B(0, 5.7, 'tiers', WC.ma, talkScene({ wall: ['KUASA BELI', 'DIHAKIS INFLASI'], tag: '5  LANGKAH', sub: 'RAJIN MENABUNG BERTAHUN-TAHUN' })), { nobk: true })),
  B(5.7, 13.8, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Kuasa Beli Dihakis', 92);
    row(lt, 0.4, 440, 'Rajin menabung', 'BERTAHUN-TAHUN'); row(lt, 1.9, 590, 'Kuasa beli', 'DIHAKIS INFLASI'); row(lt, 5.0, 740, 'Duit lebih banyak', 'BARANG YANG SAMA');
    stk(lt, .4, IMG.sRajin, 540, SB, 600);
  }),
  B(13.8, 24.56, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Alih Ke Emas', 100);
    row(lt, 0.5, 440, 'Alih simpanan', 'JANGKA PANJANG'); row(lt, 5.5, 590, '2 tahun', 'DAN KE ATAS');
    stk(lt, .4, IMG.sAlih, 540, SB, 600);
  }),
  Cl(24.56, 33.73, 'merak100', 'Daftar Percuma', 'daftar', 'daftar', 0.8, 100),
  Cl(33.73, 40.99, 'bunga50', 'Pasang App Public Gold', 'install', 'install', 1.1, 86),
  Cl(40.99, 49.83, 'syiling', 'Log Masuk Guna IC', 'login', 'login', 0.72, 92),
  Cl(49.83, 58.0, 'g250', 'Topup Pertama', 'topup', 'topup', 0.95, 96),
  B(58.0, 64.75, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Dapat Gram Emas', 92);
    row(lt, 0.4, 440, 'Beli RM100', 'DAPAT GRAM EMAS'); row(lt, 3.2, 590, 'Beli 1 gram', '1 GRAM DALAM AKAUN');
    stk(lt, .4, IMG.sTopup, 540, SB, 600);
  }),
  B(64.75, 75.57, 'binder', WC.ma, (lt) => {
    ttl(lt, 'Konsisten Tambah', 92);
    row(lt, 0.4, 440, 'Tambah tabungan', 'GRAM BERTAMBAH'); row(lt, 6.5, 590, 'Tukar gram', 'KEPADA WANG TUNAI');
    stk(lt, .4, IMG.sKonsisten, 540, SB, 600);
  }),
  Cl(75.57, 84.77, 'shop', 'Item Emas Fizikal', 'alih', 'withdraw', 1.0, 92),
  B(84.77, 89.67, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Kuasa Beli Mengecil', 92);
    row(lt, 0.4, 440, 'Wang kertas', 'KUASA BELI MENGECIL');
    stk(lt, .4, IMG.sKuasa, 540, SB, 600);
  }),
  (CLIPS.push({ a: 89.67, b: 93.32, key: 'cut', rate: 1, ext: 'webp', off: 2690 }), Object.assign(B(89.67, 93.32, 'tiers', WC.ma, talkScene({ wall: ['KUNCI NILAI', 'EMAS FIZIKAL'], tag: 'KESIMPULAN', sub: 'TITIK PELUH ANDA' })), { nobk: true })),
  B(93.32, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sKunci, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sRajin, IMG.sAlih, IMG.sDaftar, IMG.sInstall, IMG.sLogin, IMG.sTopup, IMG.sKonsisten, IMG.sKuasa, IMG.sKunci])), { nobk: true }),
];
