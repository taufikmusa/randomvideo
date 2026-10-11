// video-kahwin-5-keputusan — Taufik cakap (footage asal) + B-roll gaya carousel-maroon (1080x1920, 30fps).
// Font: Poppins ExtraBold Italic (tajuk/kapsyen), Poppins Bold/SemiBold (sub). Warna: maroon #7A1626 + emas.
const W = 1080, H = 1920, FPS = 30, DUR = 83.04, HEADN = 2491;
const K = { maroon: '#7A1626', maroon2: '#3A0710', gold: '#F5C542', gold2: '#E9A91C', white: '#fff', ink: '#2A1A12', cream: '#FFF6E8' };
const cv = document.getElementById('c'); cv.width = W; cv.height = H;
const X = cv.getContext('2d');
const IMG = {}, BG = {};
const ASSETS = { wallet: 'dompet-wealthcard-safari.jpg', balloon: 'dinar-10-atas-hutan-belon.jpg', tiers: 'set-jongkong-bertingkat-bungamas.jpg', kg: 'jongkong-1kg-tapak-tangan.jpg',
  dulang: 'dulang-merah-1kg-koleksi-penuh.jpg', ipad: 'kad-dinar-dan-app-gap-ipad.jpg', bar100: 'jongkong-100g-kad-bungamas-meja.jpg', shop: 'kad-taifook-depan-kedai-public-gold.jpg', binder: 'koleksi-binder-kad.jpg' };
const F = { h: s => `italic 800 ${s}px PP`, hh: s => `italic 900 ${s}px PP`, b: s => `700 ${s}px PP`, m: s => `600 ${s}px PP` };

// ---------- helpers (sama dengan engine carousel-maroon) ----------
const clamp = v => Math.max(0, Math.min(1, v));
const easeOut = p => 1 - Math.pow(1 - p, 3);
const back = p => { p = clamp(p); const c = 1.70158; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
function txt(s, x, y, f, fill = K.white, align = 'left', ls = 0) { X.save(); X.font = f; X.textAlign = align; X.letterSpacing = ls + 'px'; X.fillStyle = fill; X.fillText(s, x, y); X.restore(); }
function tw(s, f) { X.save(); X.font = f; const w = X.measureText(s).width; X.restore(); return w; }
function rr(x, y, w, h, r) { X.beginPath(); X.roundRect(x, y, w, h, r); }
function wrap(s, f, maxW) { const out = []; let line = ''; for (const w of s.split(' ')) { const t = line ? line + ' ' + w : w; if (tw(t, f) > maxW && line) { out.push(line); line = w; } else line = t; } out.push(line); return out; }
function shadow(fn, blur = 30, a = .45, dy = 14) { X.save(); X.shadowColor = `rgba(0,0,0,${a})`; X.shadowBlur = blur; X.shadowOffsetY = dy; fn(); X.restore(); }
function goldGrad(y0, y1) { const g = X.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#FFE79A'); g.addColorStop(.5, K.gold); g.addColorStop(1, K.gold2); return g; }
function fitSize(lines, size, maxW, fn = F.h) { while (Math.max(...lines.map(l => tw(l, fn(size)))) > maxW && size > 24) size -= 2; return size; }
function headline(s, cx, y, size, fill = K.white, maxW = 980) { size = fitSize([s], size, maxW); shadow(() => txt(s, cx, y, F.h(size), fill, 'center'), 22, .55, 8); }
function pillTitle(lines, cx, y, size, rot = -.02) {
  size = fitSize(lines, size, 900);
  const lh = size * 1.1, w = Math.max(...lines.map(l => tw(l, F.h(size)))) + size * 1.1, h = lines.length * lh + size * .45;
  X.save(); X.translate(cx, y + h / 2 - size * .95); X.rotate(rot);
  shadow(() => { rr(-w / 2, -h / 2, w, h, size * .45); X.fillStyle = K.maroon; X.fill(); }, 30, .45, 14);
  X.restore();
  lines.forEach((l, i) => txt(l, cx, y + i * lh, F.h(size), K.white, 'center'));
  PW = w; return y + lines.length * lh;
}
let PW = 600;
function side(cy, s = 1) { const o = Math.min(PW / 2 + 55, 490); strokes(540 - o, cy, s, -.9); strokes(540 + o, cy, s, .9); }
function sub(s, cx, y, w, size = 34, fill = K.white) { const ls = wrap(s, F.b(size), w); ls.forEach((l, i) => shadow(() => txt(l, cx, y + i * size * 1.25, F.b(size), fill, 'center'), 12, .6, 4)); return y + ls.length * size * 1.25; }
function strokes(cx, cy, s = 1, rot = 0) { X.save(); X.translate(cx, cy); X.rotate(rot); X.strokeStyle = K.gold; X.lineCap = 'round'; X.lineWidth = 9 * s; [[-.5, 0], [0, -.15], [.5, -.05]].forEach(([a], i) => { X.save(); X.rotate(a); X.beginPath(); X.moveTo(0, -30 * s); X.lineTo(0, -70 * s - (i === 1 ? 10 : 0)); X.stroke(); X.restore(); }); X.restore(); }
function underline(x1, x2, y, p = 1) { X.save(); X.strokeStyle = K.gold; X.lineWidth = 8; X.lineCap = 'round'; X.beginPath(); X.moveTo(x1, y); X.quadraticCurveTo((x1 + x2) / 2, y - 12, x1 + (x2 - x1) * p, y + 2 * p); X.stroke(); X.restore(); }
function sparkle(x, y, s, col = K.white) { X.save(); X.translate(x, y); X.strokeStyle = col; X.lineWidth = 4; X.beginPath(); X.moveTo(0, -s); X.quadraticCurveTo(0, 0, s, 0); X.quadraticCurveTo(0, 0, 0, s); X.quadraticCurveTo(0, 0, -s, 0); X.quadraticCurveTo(0, 0, 0, -s); X.stroke(); X.restore(); }
function curlyArrow(x1, y1, x2, y2) { X.save(); X.strokeStyle = K.gold; X.lineWidth = 7; X.lineCap = 'round'; X.lineJoin = 'round'; const mx = (x1 + x2) / 2 + 60, my = (y1 + y2) / 2; X.beginPath(); X.moveTo(x1, y1); X.quadraticCurveTo(mx, my, x2, y2); X.stroke(); const a = Math.atan2(y2 - my, x2 - mx); X.beginPath(); X.moveTo(x2 - 26 * Math.cos(a - .5), y2 - 26 * Math.sin(a - .5)); X.lineTo(x2, y2); X.lineTo(x2 - 26 * Math.cos(a + .5), y2 - 26 * Math.sin(a + .5)); X.stroke(); X.restore(); }
function photoCard(im, cx, cy, w, h, rot = 0, fx = .5, fy = .5) {
  X.save(); X.translate(cx, cy); X.rotate(rot);
  shadow(() => { rr(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24, 28); X.fillStyle = K.white; X.fill(); }, 30, .5, 16);
  X.save(); rr(-w / 2, -h / 2, w, h, 20); X.clip(); const s = Math.max(w / im.width, h / im.height), sw = w / s, sh = h / s;
  X.drawImage(im, Math.max(0, Math.min(im.width - sw, fx * im.width - sw / 2)), Math.max(0, Math.min(im.height - sh, fy * im.height - sh / 2)), sw, sh, -w / 2, -h / 2, w, h); X.restore();
  X.restore();
}
function whiteCard(x, y, w, lines, size = 34) {
  const lh = size * 1.35, h = lines.length * lh + size * 1.2;
  shadow(() => { rr(x, y, w, h, 30); X.fillStyle = K.cream; X.fill(); }, 28, .4, 12);
  lines.forEach((l, i) => { const hot = l.startsWith('*'), t = hot ? l.slice(1) : l; txt(t, x + w / 2, y + size * 1.25 + i * lh, hot ? F.h(size) : F.m(size), hot ? K.maroon : K.ink, 'center'); });
  return y + h;
}
function tierCard(x, y, w, h, head, big, small) {
  shadow(() => { rr(x, y, w, h, 28); X.fillStyle = K.cream; X.fill(); }, 26, .45, 12);
  txt(head, x + w / 2, y + 78, F.h(fitSize([head], 54, w - 40)), K.ink, 'center');
  rr(x + 20, y + 110, w - 40, h - 130, 22); X.fillStyle = K.maroon; X.fill();
  let bs = Math.min(100, w * .3); while (tw(big, F.hh(bs)) > w - 70 && bs > 30) bs -= 2;
  txt(big, x + w / 2, y + h * .58, F.hh(bs), goldGrad(y + h * .4, y + h * .62), 'center');
  wrap(small, F.b(32), w - 80).forEach((l, i) => txt(l, x + w / 2, y + h * .58 + 62 + i * 40, F.b(32), K.white, 'center'));
}
function rowPill(x, y, w, left, right) {
  shadow(() => { rr(x, y, w, 110, 24); X.fillStyle = K.maroon; X.fill(); }, 20, .4, 8);
  const lw = w * .36; rr(x + 8, y + 8, lw, 94, 20); X.fillStyle = K.white; X.fill();
  txt(left, x + 8 + lw / 2, y + 70, F.b(fitSize([left], 36, lw - 24, F.b)), K.ink, 'center');
  txt('›››', x + lw + 26, y + 74, F.hh(40), K.gold, 'left');
  const rx = x + lw + 100, rs = fitSize([right], 46, x + w - rx - 20, F.hh); txt(right, rx, y + 72, F.hh(rs), K.gold);
}
function badge(cx, cy, r, fn) { shadow(() => { X.beginPath(); X.arc(cx, cy, r, 0, 7); X.fillStyle = K.white; X.fill(); }, 16, .35, 6); X.beginPath(); X.arc(cx, cy, r - 6, 0, 7); X.fillStyle = K.maroon; X.fill(); X.save(); X.translate(cx, cy); X.scale(r / 80, r / 80); X.strokeStyle = K.white; X.fillStyle = K.white; X.lineWidth = 6; X.lineCap = 'round'; X.lineJoin = 'round'; fn(r); X.restore(); }
const icon = {
  car: () => { X.beginPath(); X.moveTo(-30, 8); X.lineTo(-22, -12); X.lineTo(22, -12); X.lineTo(30, 8); X.stroke(); X.strokeRect(-36, 8, 72, 20); X.beginPath(); X.arc(-20, 30, 7, 0, 7); X.arc(20, 30, 7, 0, 7); X.fill(); },
  sofa: () => { rr(-34, -18, 68, 26, 8); X.stroke(); rr(-44, -4, 24, 34, 8); X.stroke(); rr(20, -4, 24, 34, 8); X.stroke(); X.beginPath(); X.moveTo(-20, 22); X.lineTo(20, 22); X.stroke(); },
};
function drawCross(cx, cy, s) { X.save(); X.strokeStyle = K.gold; X.lineWidth = 14; X.lineCap = 'round'; X.beginPath(); X.moveTo(cx - s, cy - s); X.lineTo(cx + s, cy + s); X.moveTo(cx + s, cy - s); X.lineTo(cx - s, cy + s); X.stroke(); X.restore(); }

// ---------- background foto kabur (dibake sekali) ----------
function bake(key, imKey, blur = 16, dark = .42) {
  const im = IMG[imKey], c = document.createElement('canvas'); c.width = 1300; c.height = 2310; const g = c.getContext('2d');
  const s = Math.max(1300 / im.width, 2310 / im.height) * 1.1, w = im.width * s, h = im.height * s;
  g.filter = `blur(${blur}px) saturate(1.1)`; g.drawImage(im, 650 - w / 2, 1155 - h / 2, w, h); g.filter = 'none';
  g.fillStyle = `rgba(20,8,6,${dark})`; g.fillRect(0, 0, 1300, 2310);
  const rg = g.createRadialGradient(650, 1000, 300, 650, 1155, 1300); rg.addColorStop(0, 'rgba(0,0,0,0)'); rg.addColorStop(1, 'rgba(0,0,0,.5)'); g.fillStyle = rg; g.fillRect(0, 0, 1300, 2310);
  BG[key] = c;
}
function bg(key, lt, d) { const p = lt / d - .5; X.drawImage(BG[key], -110 - p * 50, -195 - p * 40); }

// ---------- animasi ----------
function anim(lt, at, cx, cy, fn, o = {}) {
  const p = back((lt - at) / (o.dur || .42)); if (lt < at) return;
  X.save(); X.globalAlpha = clamp((lt - at) / .2); X.translate(cx, cy + (1 - clamp(p)) * (o.dy ?? 50)); X.scale(.88 + .12 * p, .88 + .12 * p); X.translate(-cx, -cy); fn(p); X.restore();
}

// ---------- kapsyen (Poppins 800 italic, kata kunci emas) ----------
const SEG = [
  [0, 3.87, '*5 *Keputusan *Kewangan Wajib Tahun Pertama Kahwin'],
  [3.87, 6.32, 'Tahun pertama kahwin penuh *kemanisan,'],
  [6.32, 12.96, 'tapi *silap urus duit tahun tersebut, kesannya boleh *menghantui rumah tangga bertahun-tahun.'],
  [12.96, 18.49, '*Pertama, bina *simpanan kecemasan sebelum tambah hutang besar.'],
  [18.49, 24.31, 'Jangan terburu-buru beli *perabot mewah atau *kereta baru tanpa tabung kecemasan.'],
  [24.31, 27.54, '*Dua, bincang *kewangan secara telus.'],
  [27.54, 31.81, 'Tekanan duit adalah *punca utama *pergaduhan suami dan isteri.'],
  [31.81, 35.28, 'Ada *matlamat bersama buat hati lebih *tenang.'],
  [35.28, 39.21, '*Tiga, mula tabung *pendidikan sebelum anak lahir.'],
  [39.21, 43.74, '*RM100 sebulan hari ini jauh lebih mudah berbanding cari'],
  [43.74, 47.36, '*puluhan *ribu waktu anak nak masuk universiti.'],
  [47.36, 51.82, '*Empat, kunci nilai simpanan daripada dimakan *inflasi.'],
  [51.82, 56.32, 'Duit tunai yang duduk diam dalam bank *susut nilainya setiap tahun.'],
  [56.32, 59.97, '*Lima, *simpan *emas rapatkan hubungan.'],
  [59.97, 63.87, 'Menabung bersama setiap bulan, membina *disiplin dan'],
  [63.87, 66.17, '*persefahaman dalam rumah tangga.'],
  [66.17, 68.73, 'Perkahwinan bukan sekadar tentang *cinta,'],
  [68.73, 71.93, 'tapi tentang membina *masa *depan yang *stabil.'],
  [71.93, 74.21, 'Mula *kukuhkan kewangan bersama.'],
  [74.21, 79.67, 'Tuan puan yang dah ready nak mulakan *simpan *emas di *Public *Gold, boleh rujuk *pin *video untuk bermula.'],
  [79.67, 83.04, '*Dulu *ragu, *kini *tahu. Jom mulakan simpan emas.'],
];
const CAPS = [];
SEG.forEach(([a, b, s]) => {
  const words = s.split(' ').map(w => ({ t: w.replace('*', ''), hl: w.startsWith('*') }));
  const chunks = []; let cur = [];
  const len = c => c.map(w => w.t).join(' ').length;
  words.forEach(w => { if (cur.length && (cur.length >= 4 || len(cur) + w.t.length + 1 > 24)) { chunks.push(cur); cur = []; } cur.push(w); });
  if (cur.length) chunks.push(cur);
  // gabung chunk 1 patah yang tinggal sorang
  if (chunks.length > 1 && chunks[chunks.length - 1].length === 1 && chunks[chunks.length - 2].length < 4) chunks[chunks.length - 2].push(...chunks.pop());
  const tot = chunks.reduce((s, c) => s + len(c) + 3, 0); let t = a;
  chunks.forEach(c => { const d = (b - a) * (len(c) + 3) / tot; CAPS.push({ a: t, b: t + d, w: c }); t += d; });
});
function caption(t) {
  const c = CAPS.find(c => t >= c.a && t < c.b); if (!c) return;
  const lt = t - c.a, p = back(lt / .16), y = 1640;
  let size = 68; const full = c.w.map(w => w.t).join(' '); size = fitSize([full], size, 960);
  const f = F.h(size); X.save(); X.font = f; X.letterSpacing = '0px';
  const widths = c.w.map(w => X.measureText(w.t).width), sp = X.measureText(' ').width, total = widths.reduce((a, b) => a + b, 0) + sp * (c.w.length - 1);
  X.translate(540, y - size * .35); X.scale(.9 + .1 * clamp(p), .9 + .1 * clamp(p)); X.translate(-540, -(y - size * .35)); X.globalAlpha = clamp(lt / .08);
  X.textAlign = 'left'; X.lineJoin = 'round'; let x = 540 - total / 2;
  c.w.forEach((w, i) => {
    X.save(); X.shadowColor = 'rgba(0,0,0,.6)'; X.shadowBlur = 18; X.shadowOffsetY = 6; X.lineWidth = size * .2; X.strokeStyle = K.maroon2; X.strokeText(w.t, x, y); X.restore();
    X.fillStyle = w.hl ? K.gold : K.white; X.fillText(w.t, x, y); x += widths[i] + sp;
  });
  X.restore();
}

// ---------- footage kepala ----------
const HEADIMGS = {};
let curHead = null;
window.loadHead = i => new Promise(res => { i = Math.max(1, Math.min(HEADN, i)); const im = new Image(); im.onload = () => { curHead = im; res(); }; im.onerror = () => res(); im.src = 'src/' + String(i).padStart(5, '0') + '.jpg'; });
function head(lt, d, zoomDir = 1) {
  const s = zoomDir > 0 ? 1.02 + .07 * (lt / d) : 1.09 - .07 * (lt / d);
  if (curHead) { X.save(); X.translate(540, 820); X.scale(s, s); X.translate(-540, -820); X.drawImage(curHead, 0, 0, 720, 1280, 0, 0, W, H); X.restore(); }
  let g = X.createLinearGradient(0, 0, 0, 700); g.addColorStop(0, 'rgba(30,6,10,.72)'); g.addColorStop(1, 'rgba(30,6,10,0)'); X.fillStyle = g; X.fillRect(0, 0, W, 700);
  g = X.createLinearGradient(0, 1250, 0, H); g.addColorStop(0, 'rgba(30,6,10,0)'); g.addColorStop(1, 'rgba(30,6,10,.78)'); X.fillStyle = g; X.fillRect(0, 1250, W, H - 1250);
}
function chapter(lt, n, l1, l2, subtxt) {
  anim(lt, .05, 540, 270, () => { shadow(() => { rr(540 - 190, 215, 380, 66, 33); X.fillStyle = K.gold; X.fill(); }, 20, .4, 8); txt('KEPUTUSAN ' + n, 540, 262, F.hh(34), K.maroon2, 'center', 2); });
  anim(lt, .22, 540, 420, () => pillTitle(l2 ? [l1, l2] : [l1], 540, 365, 78));
  if (subtxt) anim(lt, .5, 540, 560, () => sub(subtxt, 540, 566 + (l2 ? 70 : 0), 860, 38));
  anim(lt, .22, 540, 420, () => side(400));
}

// ---------- adegan ----------
const B = (a, b, bgk, draw, pops) => ({ a, b, k: 'B', bg: bgk, draw, pops: pops || [] });
const Hh = (a, b, ov, dir) => ({ a, b, k: 'H', ov, dir });
const SCENES = [
  Hh(0, 6.32, (lt) => {
    const out = clamp((lt - 4.1) / .3), dy = -out * 80; X.save(); X.globalAlpha = 1 - out; X.translate(0, dy);
    anim(lt, .1, 540, 260, () => headline('5 Keputusan', 540, 300, 112));
    anim(lt, .35, 540, 420, () => pillTitle(['Kewangan Wajib'], 540, 400, 92));
    anim(lt, .8, 540, 520, () => sub('Tahun Pertama Kahwin', 540, 535, 900, 52, K.gold));
    anim(lt, .35, 540, 420, () => side(420, 1.1)); anim(lt, 1.1, 540, 500, () => underline(300, 780, 578, 1));
    X.restore();
  }, 1),
  B(6.32, 12.96, 'wallet', (lt) => {
    anim(lt, .1, 540, 250, () => headline('Tahun Pertama Kahwin', 540, 250, 68));
    anim(lt, .45, 540, 360, () => headline('Penuh Kemanisan', 540, 370, 100, K.gold));
    anim(lt, 2.3, 540, 560, () => pillTitle(['Silap Urus Duit'], 540, 570, 96)); anim(lt, 2.3, 540, 560, () => side(600));
    anim(lt, .7, 540, 1150, () => photoCard(IMG.wallet, 540, 1180, 620, 400, -.03));
    anim(lt, 3.9, 540, 860, () => whiteCard(90, 760, 900, ['Kesannya boleh menghantui', '*rumah tangga bertahun-tahun.'], 48));
    sparkle(230, 1000, 30); sparkle(880, 1390, 26);
  }, [.1, .45, .7, 2.3, 3.9]),
  Hh(12.96, 18.49, (lt) => chapter(lt, 1, 'Simpanan Kecemasan', null, 'sebelum tambah hutang besar'), -1),
  B(18.49, 24.31, 'balloon', (lt) => {
    anim(lt, .05, 540, 270, () => pillTitle(['Jangan Terburu-buru'], 540, 270, 88)); anim(lt, .05, 540, 270, () => side(300));
    anim(lt, 1.5, 300, 640, () => { badge(300, 640, 130, icon.sofa); txt('Perabot mewah', 300, 830, F.b(40), K.white, 'center'); });
    anim(lt, 3.0, 780, 640, () => { badge(780, 640, 130, icon.car); txt('Kereta baru', 780, 830, F.b(40), K.white, 'center'); });
    anim(lt, 3.9, 540, 640, () => { drawCross(300, 640, 70); drawCross(780, 640, 70); });
    anim(lt, 4.3, 540, 1020, () => whiteCard(90, 930, 900, ['Tanpa tabung kecemasan,', '*simpan dulu!'], 56));
    anim(lt, 5.0, 540, 1290, () => photoCard(IMG.wallet, 540, 1290, 440, 220, .03));
  }, [.05, 1.5, 3.0, 3.9, 4.3, 5.0]),
  Hh(24.31, 27.54, (lt) => chapter(lt, 2, 'Bincang Kewangan', 'Secara Telus'), 1),
  B(27.54, 35.28, 'tiers', (lt) => {
    anim(lt, .05, 540, 270, () => pillTitle(['Suami & Isteri'], 540, 270, 88));
    anim(lt, .35, 290, 800, () => tierCard(50, 480, 480, 560, 'TEKANAN', 'GADUH', 'punca utama pergaduhan suami & isteri'));
    anim(lt, 4.3, 790, 800, () => tierCard(550, 480, 480, 560, 'MATLAMAT', 'TENANG', 'bersama, hati lebih tenang'));
    anim(lt, 6.0, 540, 1230, () => whiteCard(90, 1130, 900, ['Satu matlamat bersama,', '*dua hati tenang.'], 52));
    strokes(540, 500, .9, 0);
  }, [.05, .35, 4.3, 6.0]),
  Hh(35.28, 39.21, (lt) => chapter(lt, 3, 'Tabung Pendidikan', null, 'sebelum anak lahir'), -1),
  B(39.21, 47.36, 'kg', (lt) => {
    anim(lt, .05, 540, 270, () => pillTitle(['Tabung Pendidikan Anak'], 540, 270, 84));
    anim(lt, .35, 290, 800, () => tierCard(50, 480, 480, 560, 'HARI INI', 'RM100', 'sebulan, jauh lebih mudah'));
    anim(lt, 4.2, 790, 800, () => tierCard(550, 480, 480, 560, 'UNIVERSITI', 'PULUHAN RIBU', 'waktu anak nak masuk'));
    anim(lt, 3.6, 540, 500, () => { shadow(() => { X.beginPath(); X.arc(540, 500, 42, 0, 7); X.fillStyle = K.gold; X.fill(); }, 16, .4, 6); txt('vs', 540, 516, F.hh(40), K.maroon2, 'center'); });
    anim(lt, 6.2, 540, 1230, () => whiteCard(90, 1130, 900, ['Mula sebelum anak lahir,', '*lagi ringan.'], 52));
  }, [.05, .35, 3.6, 4.2, 6.2]),
  Hh(47.36, 51.82, (lt) => chapter(lt, 4, 'Kunci Nilai Simpanan', null, 'daripada dimakan inflasi'), 1),
  B(51.82, 56.32, 'dulang', (lt, d) => {
    anim(lt, .05, 540, 270, () => pillTitle(['Duit Tunai Diam', 'Dalam Bank'], 540, 250, 84));
    anim(lt, .4, 540, 860, () => { shadow(() => { rr(80, 560, 920, 560, 36); X.fillStyle = K.cream; X.fill(); }, 28, .4, 12); });
    anim(lt, .4, 540, 600, () => txt('Nilai duit tunai', 130, 640, F.h(40), K.maroon));
    const p = easeOut(clamp((lt - 1) / 2.2)); if (p > 0) {
      X.save(); X.strokeStyle = K.gold2; X.lineWidth = 14; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath();
      const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([150 + u * 640, 700 + 330 * (u * u * .55 + u * .45)]); }
      const n = Math.floor(p * 40); pts.slice(0, n + 1).forEach(([x, y], i) => i ? X.lineTo(x, y) : X.moveTo(x, y)); X.stroke();
      const [ex, ey] = pts[n]; X.beginPath(); X.arc(ex, ey, 20, 0, 7); X.fillStyle = K.maroon; X.fill(); X.restore();
      X.save(); X.strokeStyle = 'rgba(122,22,38,.35)'; X.lineWidth = 4; X.beginPath(); X.moveTo(130, 1060); X.lineTo(960, 1060); X.moveTo(130, 690); X.lineTo(130, 1060); X.stroke(); X.restore();
      txt('setiap tahun', 960, 1100, F.b(30), K.ink, 'right');
    }
    anim(lt, 3.0, 540, 1290, () => whiteCard(90, 1190, 900, ['Kunci nilai simpanan', '*daripada inflasi.'], 50));
  }, [.05, .4, 1.0, 3.0]),
  Hh(56.32, 59.97, (lt) => chapter(lt, 5, 'Simpan Emas', 'Rapatkan Hubungan'), -1),
  B(59.97, 66.17, 'ipad', (lt) => {
    anim(lt, .05, 540, 270, () => pillTitle(['Menabung Bersama'], 540, 270, 92)); anim(lt, .05, 540, 270, () => side(300));
    anim(lt, .6, 540, 560, () => rowPill(60, 500, 960, 'Setiap bulan', 'MENABUNG BERSAMA'));
    anim(lt, 2.4, 540, 710, () => rowPill(60, 660, 960, 'Membina', 'DISIPLIN'));
    anim(lt, 3.9, 540, 860, () => rowPill(60, 820, 960, 'Dalam rumah tangga', 'PERSEFAHAMAN'));
    anim(lt, 4.6, 540, 1130, () => photoCard(IMG.ipad, 540, 1180, 640, 330, -.02, .5, .45));
  }, [.05, .6, 2.4, 3.9, 4.6]),
  B(66.17, 71.93, 'bar100', (lt) => {
    anim(lt, .05, 540, 280, () => headline('Perkahwinan Bukan', 540, 280, 84));
    anim(lt, .45, 540, 410, () => headline('Sekadar Cinta', 540, 420, 112, K.gold));
    anim(lt, 2.6, 540, 640, () => pillTitle(['Tapi Membina', 'Masa Depan Stabil'], 540, 590, 92)); anim(lt, 2.6, 540, 640, () => side(680));
    anim(lt, 3.6, 540, 1200, () => photoCard(IMG.tiers, 540, 1190, 640, 380, .02, .5, .55));
    sparkle(180, 1000, 28); sparkle(900, 1010, 24);
  }, [.05, .45, 2.6, 3.6]),
  Hh(71.93, 74.21, (lt) => { anim(lt, .05, 540, 360, () => pillTitle(['Kukuhkan Kewangan', 'Bersama'], 540, 330, 82)); anim(lt, .05, 540, 360, () => side(390)); }, 1),
  B(74.21, 79.67, 'shop', (lt) => {
    anim(lt, .05, 540, 250, () => headline('Dah Ready Nak Mula?', 540, 260, 84));
    anim(lt, .5, 540, 430, () => pillTitle(['Simpan Emas', 'di Public Gold'], 540, 380, 104)); anim(lt, .5, 540, 430, () => side(450));
    anim(lt, 1.4, 540, 960, () => photoCard(IMG.ipad, 540, 960, 600, 400, -.03, .5, .45));
    anim(lt, 3.0, 540, 1280, () => { shadow(() => { rr(120, 1210, 840, 130, 65); X.fillStyle = K.maroon; X.fill(); }, 22, .45, 10); txt('Rujuk Pin Video', 540, 1295, F.h(60), K.white, 'center'); });
    anim(lt, 3.4, 840, 1130, () => curlyArrow(930, 1120, 880, 1010));
    sparkle(160, 780, 28); sparkle(930, 700, 24);
  }, [.05, .5, 1.4, 3.0]),
  Hh(79.67, 83.04, (lt) => { anim(lt, .15, 540, 380, () => pillTitle(['Dulu Ragu,', 'Kini Tahu!'], 540, 330, 100)); anim(lt, .15, 540, 380, () => side(400, 1.1)); }, -1),
];
const WIPES = SCENES.slice(1).map(s => s.a);
window.SFX = { wipes: WIPES, pops: SCENES.filter(s => s.k === 'B').flatMap(s => s.pops.map(p => +(s.a + p).toFixed(2))) };

function wipe(t) {
  for (const T of WIPES) {
    const p = (t - T + .2) / .4; if (p < 0 || p > 1) continue;
    const L = -1.25 * W + p * 2.5 * W, w = 1.25 * W;
    const g = X.createLinearGradient(L, 0, L + w, 0); g.addColorStop(0, K.maroon2); g.addColorStop(.85, K.maroon); g.addColorStop(1, K.maroon);
    X.save(); X.transform(1, 0, -.18, 1, 0, 0); X.fillStyle = g; X.fillRect(L, -50, w, H + 100);
    X.fillStyle = K.gold; X.fillRect(L + w - 14, -50, 14, H + 100); X.restore();
  }
}
function hud(t) {
  X.fillStyle = K.gold; X.fillRect(0, 0, W * t / DUR, 8);
  X.save(); rr(40, 44, 250, 54, 27); X.fillStyle = 'rgba(0,0,0,.55)'; X.fill(); X.beginPath(); X.arc(70, 71, 9, 0, 7); X.fillStyle = K.gold; X.fill(); X.restore();
  txt('@taufik.pg', 88, 82, F.b(26), K.white);
}
window.render = t => {
  X.clearRect(0, 0, W, H);
  const s = SCENES.find(s => t >= s.a && t < s.b) || SCENES[SCENES.length - 1], lt = t - s.a, d = s.b - s.a;
  if (s.k === 'H') { head(lt, d, s.dir); s.ov(lt, d); }
  else { bg(s.bg, lt, d); s.draw(lt, d); }
  caption(t); hud(t); wipe(t);
};
window.ready = Promise.all([
  ...[F.h(40), F.hh(40), F.b(40), F.m(40)].map(f => document.fonts.load(f)),
  ...Object.entries(ASSETS).map(([k, f]) => new Promise((res, rej) => { const i = new Image(); i.onload = () => { IMG[k] = i; res(); }; i.onerror = () => rej(new Error('missing img/' + f)); i.src = 'img/' + f; })),
]).then(() => { SCENES.filter(s => s.k === 'B').forEach(s => { if (!BG[s.bg]) bake(s.bg, s.bg, 16, .45); }); return true; });
