// 9 Soalan Lazim Sebelum Daftar Public Gold GAP — 57s motion piece (@taufik.pg)
const DUR = 57;
const SEG = [
  ['hook', 0, 4.5], ['q', 4.5, 9], ['q', 9, 13.5], ['q', 13.5, 18], ['q', 18, 22.5], ['q', 22.5, 27],
  ['q', 27, 33.5], ['q', 33.5, 38], ['q', 38, 42.5], ['q', 42.5, 47], ['close', 47, 51], ['cta', 51, 57],
];
const IMG = {};
const NAVY = 0, YEL = 1, RED = 2;
const BG = [C.navy, C.y, '#1a0509'];
const FG = [ '#fff', C.navy, '#fff'];

// ---------- shared pieces ----------
function bgFill(kind, t) {
  if (kind === RED) {
    const g = X.createRadialGradient(540, 900, 0, 540, 900, 1200); g.addColorStop(0, '#4a0a12'); g.addColorStop(1, '#14040a'); X.fillStyle = g; X.fillRect(0, 0, W, H);
    X.save(); X.globalAlpha = .08; X.fillStyle = C.red; for (let y = -200; y < H + 200; y += 120) { X.save(); X.translate(0, y + (t * 60) % 120); X.transform(1, -.5, 0, 1, 0, 0); X.fillRect(0, 0, W, 40); X.restore(); } X.restore();
    return;
  }
  X.fillStyle = BG[kind]; X.fillRect(0, 0, W, H);
  if (kind === YEL) {
    X.fillStyle = 'rgba(7,21,43,.09)'; const off = (t * 40) % 60;
    for (let y = -60; y < H + 60; y += 60) for (let x = -60; x < W + 60; x += 60) { X.beginPath(); X.arc(x + off, y + off * .5, 3, 0, 7); X.fill(); }
  } else {
    const g = X.createRadialGradient(540, 1000, 0, 540, 1000, 1000); g.addColorStop(0, 'rgba(30,48,80,.9)'); g.addColorStop(1, 'rgba(7,21,43,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H);
    X.save(); X.translate(990, 300); X.rotate(t * .25); X.strokeStyle = 'rgba(255,206,50,.10)'; X.lineWidth = 3;
    for (let i = 0; i < 6; i++) { X.beginPath(); X.arc(0, 0, 120 + i * 70, i, i + 2.4); X.stroke(); } X.restore();
  }
}
function photo(img, cx, cy, w, rot, a = 1, tape = true) {
  if (!img || a <= 0) return;
  const h = w * img.height / img.width, b = 16;
  X.save(); X.globalAlpha *= a; X.translate(cx, cy); X.rotate(rot);
  X.save(); X.filter = 'blur(26px)'; X.fillStyle = 'rgba(0,0,0,.45)'; X.fillRect(-w / 2 - b + 14, -h / 2 - b + 30, w + 2 * b, h + 2 * b + 50); X.restore();
  X.fillStyle = '#fbfaf6'; X.fillRect(-w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b + 50);
  X.drawImage(img, -w / 2, -h / 2, w, h);
  if (tape) { X.save(); X.rotate(-.06); X.fillStyle = 'rgba(255,214,90,.78)'; X.fillRect(-80, -h / 2 - b - 26, 160, 48); X.restore(); }
  X.restore();
}
function tick(x, y, r, p, col = C.green) {
  if (p <= 0) return; X.save(); X.translate(x, y); X.scale(E.oB(cl(p * 1.6)), E.oB(cl(p * 1.6)));
  X.beginPath(); X.arc(0, 0, r, 0, 7); X.fillStyle = col; X.fill();
  X.strokeStyle = '#fff'; X.lineWidth = r * .22; X.lineCap = 'round'; X.lineJoin = 'round'; X.setLineDash([r * 2.2 * E.o3(P(p, .3, 1)), r * 3]);
  X.beginPath(); X.moveTo(-r * .42, r * .04); X.lineTo(-r * .12, r * .34); X.lineTo(r * .45, -r * .3); X.stroke(); X.restore();
}
function cross(x, y, r, p) {
  if (p <= 0) return; const s = lerp(2.2, 1, E.oX(p)); X.save(); X.translate(x, y); X.scale(s, s);
  X.beginPath(); X.arc(0, 0, r, 0, 7); X.fillStyle = C.red; X.fill();
  X.strokeStyle = '#fff'; X.lineWidth = r * .22; X.lineCap = 'round';
  X.beginPath(); X.moveTo(-r * .35, -r * .35); X.lineTo(r * .35, r * .35); X.moveTo(r * .35, -r * .35); X.lineTo(-r * .35, r * .35); X.stroke(); X.restore();
}
function stamp(lines, x, y, rot, p, col, w = 640, h = 190) {
  if (p <= 0) return; const s = lerp(2.4, 1, E.oX(p)), a = cl(p * 4);
  X.save(); X.globalAlpha *= a; X.translate(x, y); X.rotate(rot); X.scale(s, s);
  X.strokeStyle = col; X.lineWidth = 9; rr(-w / 2, -h / 2, w, h, 18); X.stroke(); X.lineWidth = 3; rr(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 10); X.stroke();
  if (lines.length === 1) txt(lines[0], 0, 30, font('IN', 900, 84), col, 'center', 1, 2);
  else { txt(lines[0], 0, 6, font('IN', 900, 76), col, 'center', 1, 2); txt(lines[1], 0, 58, font('MO', 700, 26), col, 'center', 1, 4); }
  X.restore();
}
function pill(s, x, y, f, bg, fg, p, padX = 34, h = 80) {
  if (p <= 0) return; X.save(); X.font = f; X.letterSpacing = '2px'; const w = X.measureText(s).width + padX * 2; X.restore();
  X.save(); X.translate(x, y); X.scale(E.oB(p), E.oB(p)); rr(-w / 2, -h / 2, w, h, h / 2); X.fillStyle = bg; X.fill();
  txt(s, 0, h * .17, f, fg, 'center', 1, 2); X.restore();
}
// marker-highlighted answer lines
function answer(lines, lt, t0, kind, yy = 1600) {
  lines.forEach((s, i) => {
    const p = E.o3(P(lt, t0 + i * .25, t0 + i * .25 + .4)); if (p <= 0) return;
    const y = yy + i * 82;
    X.save(); X.font = font('IN', 800, 56); const w = X.measureText(s).width; X.restore();
    const hp = E.io3(P(lt, t0 + i * .25 + .1, t0 + i * .25 + .5));
    X.fillStyle = kind === YEL ? 'rgba(255,255,255,.65)' : kind === RED ? 'rgba(239,68,68,.55)' : 'rgba(255,206,50,.28)';
    X.fillRect(540 - w / 2 - 14, y - 46, (w + 28) * hp, 64);
    txt(s, 540, y + (1 - p) * 26, font('IN', 800, 56), FG[kind], 'center', p);
  });
}
// header: "SOALAN" + big number + question
function header(n, q, lt, kind) {
  const fg = FG[kind], acc = kind === YEL ? C.navy : kind === RED ? C.red : C.y;
  txt('SOALAN', 90, 250, font('MO', 700, 34), acc, 'left', E.o3(P(lt, 0, .3)), 10);
  const sp = P(lt, .05, .4);
  if (sp > 0) for (let k = 2; k >= 0; k--) {
    const s = lerp(2.6, 1, E.oX(cl(sp - k * .1)));
    X.save(); X.translate(90, 470); X.scale(s, s);
    txt('#' + n, 0, 0, font('PF', 900, 230), kind === NAVY ? gold(0, -200, 300, 0) : acc, 'left', k ? .15 : 1); X.restore();
  }
  q.forEach((s, i) => reveal(s, 90, 600 + i * 92, font('PF', 900, 82), 82, fg, lt, .3 + i * .18, .018, .45, 'left'));
}
function slab(p, col) { // outgoing diagonal wipe in the next scene's colour
  if (p <= 0) return; const e = E.ioX(p);
  X.save(); X.transform(1, 0, -.35, 1, 0, 0);
  X.fillStyle = col === C.y ? C.navy : C.y; X.fillRect(lerp(-1700, 900, e) + 360, 0, 2200, H);
  X.fillStyle = col; X.fillRect(lerp(-1700, 900, e) + 320, 0, 2200, H); X.fillRect(lerp(-1700, 900, e) - 1500, 0, 1900, H);
  X.restore();
}
function slot(str, cx, by, size, lt, t0, stopGap, col) {
  X.save(); X.font = font('IN', 900, size); const ws = [...str].map(c => X.measureText(/\d/.test(c) ? '0' : c).width); X.restore();
  const tot = ws.reduce((a, b) => a + b, 0); let x = cx - tot / 2; const ap = E.o3(P(lt, t0, t0 + .25));
  [...str].forEach((c, i) => {
    if (!/\d/.test(c)) { txt(c, x, by, font('IN', 900, size), col, 'left', ap); x += ws[i]; return; }
    const d = +c, p = E.oB(P(lt, t0, t0 + .4 + i * stopGap)), pos = p * (20 + i * 10 + d);
    X.save(); X.beginPath(); X.rect(x - 10, by - size * .85, ws[i] + 20, size * 1.02); X.clip();
    for (let j = Math.floor(pos) - 1; j <= Math.floor(pos) + 1; j++) txt(String(((j % 10) + 10) % 10), x + ws[i] / 2, by + (j - pos) * size * .98, font('IN', 900, size), col, 'center', ap);
    X.restore(); x += ws[i];
  });
  return tot;
}

// ---------- the 9 questions ----------
const Q = [
  { kind: YEL, q: ['Berapa modal', 'minimum nak mula?'], a: ['Serendah RM100 setiap belian.', 'Ikut kelapangan bajet sendiri.'], v(lt) {
    txt('SERENDAH', 540, 900, font('MO', 700, 36), C.navy, 'center', E.o3(P(lt, .7, 1)), 12);
    const tot = slot('RM100', 540, 1140, 260, lt, .8, .18, C.navy);
    const ul = E.o3(P(lt, 1.6, 1.9)); if (ul > 0) { X.strokeStyle = C.navy; X.lineWidth = 16; X.lineCap = 'round'; X.beginPath(); X.moveTo(540 - tot / 2, 1200); X.lineTo(lerp(540 - tot / 2, 540 + tot / 2, ul), 1192); X.stroke(); }
    pill('TIADA PAKSAAN BULANAN', 540, 1330, font('MO', 700, 34), C.navy, C.y, P(lt, 2.0, 2.4));
  } },
  { kind: NAVY, q: ['Ada yuran daftar', 'atau caj simpanan?'], a: ['Buka akaun 100% percuma.'], v(lt) {
    ['Yuran daftar', 'Caj dealer', 'Kos simpanan'].forEach((s, i) => {
      const p = E.oX(P(lt, .7 + i * .15, 1.1 + i * .15)), y = 860 + i * 120; if (p <= 0) return;
      X.save(); X.globalAlpha = p; X.translate((1 - p) * 200, 0);
      txt(s, 150, y, font('IN', 800, 62), '#fff', 'left'); txt('RM0', 930, y, font('IN', 900, 62), C.y, 'right', P(lt, 1.6 + i * .2, 1.8 + i * .2));
      X.save(); X.font = font('IN', 800, 62); const w = X.measureText(s).width; X.restore();
      const sp = E.o3(P(lt, 1.4 + i * .2, 1.6 + i * .2)); X.strokeStyle = C.red; X.lineWidth = 10; X.lineCap = 'round';
      if (sp > 0) { X.beginPath(); X.moveTo(140, y - 20); X.lineTo(140 + (w + 20) * sp, y - 24); X.stroke(); }
      X.restore();
    });
    stamp(['100% PERCUMA'], 540, 1320, -.08, P(lt, 2.4, 2.75), C.y, 700, 170);
  } },
  { kind: NAVY, q: ['Betul ke boleh keluar', 'emas fizikal?'], a: ['Kumpul sikit-sikit,', 'keluarkan seawal 0.25 gram.'], v(lt) {
    const p = E.oB(P(lt, .6, 1.3));
    photo(IMG.bar, 470, lerp(1900, 1050, p), 470, lerp(.3, -.06, p), cl(p * 3));
    const bp = E.oB(P(lt, 1.6, 2.0));
    if (bp > 0) {
      X.save(); X.translate(820, 1260); X.scale(bp, bp); X.rotate(.1);
      X.beginPath(); X.arc(0, 0, 145, 0, 7); X.fillStyle = C.y; X.fill(); X.strokeStyle = C.navy; X.lineWidth = 6; X.setLineDash([12, 10]); X.beginPath(); X.arc(0, 0, 125, t0r(lt), t0r(lt) + 7); X.stroke(); X.setLineDash([]);
      txt('SEAWAL', 0, -48, font('MO', 700, 26), C.navy, 'center', 1, 4);
      txt((.25 * E.o3(P(lt, 1.7, 2.5))).toFixed(2), 0, 36, font('IN', 900, 92), C.navy);
      txt('GRAM', 0, 84, font('MO', 700, 26), C.navy, 'center', 1, 6); X.restore();
    }
    sparkle(300, 860, 44 * Math.sin(P(lt, 1.3, 1.9) * Math.PI), 1); sparkle(640, 1180, 30 * Math.sin(P(lt, 1.6, 2.1) * Math.PI), 1);
  } },
  { kind: YEL, q: ['Emas Public Gold', 'patuh syariah tak?'], a: ['Akaun GAP disahkan', 'patuh syariah sepenuhnya.'], v(lt) {
    const p = E.oB(P(lt, .6, 1.1)); if (p <= 0) return;
    X.save(); X.translate(540, 1060); X.scale(p, p);
    X.beginPath(); X.arc(0, 0, 200, 0, 7); X.fillStyle = C.navy; X.fill();
    X.strokeStyle = C.y; X.lineWidth = 14; X.lineCap = 'round'; X.setLineDash([900 * E.o3(P(lt, .9, 1.7)), 900]);
    X.beginPath(); X.arc(-20, 0, 110, .9, 5.4); X.arc(20, -16, 86, 4.9, 1.2, true); X.closePath(); X.stroke(); X.setLineDash([]);
    X.restore();
    sparkle(620, 980, 40 * P(lt, 1.5, 1.8), 1);
    stamp(['PATUH SYARIAH', 'DISAHKAN · AMANIE ADVISORS'], 540, 1330, -.1, P(lt, 2.0, 2.35), '#0f7a3a', 700, 190);
  } },
  { kind: NAVY, q: ['Boleh jual beli', 'bila-bila masa?'], a: ['Online 24 jam sehari,', '365 hari setahun.'], v(lt) {
    const p = E.oB(P(lt, .5, 1.0)); if (p <= 0) return;
    X.save(); X.translate(540, 1050); X.scale(p, p);
    X.beginPath(); X.arc(0, 0, 230, 0, 7); X.fillStyle = '#fff'; X.fill(); X.strokeStyle = C.y; X.lineWidth = 14; X.stroke();
    for (let i = 0; i < 12; i++) { X.save(); X.rotate(i * Math.PI / 6); X.fillStyle = C.navy; X.fillRect(-4, -205, 8, i % 3 ? 22 : 40); X.restore(); }
    const sp = E.io3(P(lt, .8, 2.2)), mA = sp * Math.PI * 2 * 6, hA = sp * (Math.PI * 2 * .5 + Math.PI / 2);
    X.lineCap = 'round'; X.strokeStyle = C.navy;
    X.save(); X.rotate(hA); X.lineWidth = 18; X.beginPath(); X.moveTo(0, 20); X.lineTo(0, -120); X.stroke(); X.restore();
    X.save(); X.rotate(mA); X.lineWidth = 10; X.beginPath(); X.moveTo(0, 26); X.lineTo(0, -180); X.stroke(); X.restore();
    X.beginPath(); X.arc(0, 0, 18, 0, 7); X.fillStyle = C.red; X.fill();
    // orbiting progress ring
    X.strokeStyle = 'rgba(255,206,50,.9)'; X.lineWidth = 8; X.beginPath(); X.arc(0, 0, 268, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * sp); X.stroke();
    X.restore();
    // moon
    const mp = E.oB(P(lt, 2.0, 2.4)); if (mp > 0) { X.save(); X.translate(880, 760); X.scale(mp, mp); X.beginPath(); X.arc(0, 0, 60, 0, 7); X.fillStyle = C.y; X.fill(); X.globalCompositeOperation = 'destination-out'; X.beginPath(); X.arc(26, -18, 52, 0, 7); X.fill(); X.restore(); }
    pill('3:00 PAGI PUN BOLEH', 540, 1380, font('MO', 700, 34), C.y, C.navy, P(lt, 2.2, 2.6));
  } },
  { kind: RED, q: ['Duit pendaftaran', 'masuk akaun siapa?'], a: null, v(lt) {
    // warning badge
    const bp = P(lt, .1, .4), blink = .75 + .25 * Math.sin(lt * 14);
    if (bp > 0) { X.save(); X.globalAlpha = blink; pill('!  PALING PENTING · ELAK SCAM', 720, 400, font('MO', 700, 24), C.red, '#fff', bp, 26, 62); X.restore(); }
    const A = [540, 860], L = [290, 1200], R = [790, 1200];
    const node = (x, y, p, w, h, fill, stroke, l1, l2, c1, c2) => { if (p <= 0) return; X.save(); X.translate(x, y); X.scale(E.oB(p), E.oB(p)); rr(-w / 2, -h / 2, w, h, 26); X.fillStyle = fill; X.fill(); X.strokeStyle = stroke; X.lineWidth = 6; X.stroke(); txt(l1, 0, l2 ? -6 : 16, font('IN', 900, 44), c1); if (l2) txt(l2, 0, 40, font('MO', 700, 22), c2, 'center', 1, 3); X.restore(); };
    node(A[0], A[1], P(lt, .7, 1.0), 260, 110, '#fff', '#fff', 'ANDA', '', C.navy);
    const arrow = (a, b, p, col, dash) => { if (p <= 0) return; X.save(); X.strokeStyle = col; X.lineWidth = 10; X.lineCap = 'round'; if (dash) X.setLineDash([22, 18]);
      const ex = lerp(a[0], b[0], p), ey = lerp(a[1], b[1], p); X.beginPath(); X.moveTo(a[0], a[1]); X.lineTo(ex, ey); X.stroke(); X.setLineDash([]);
      const an = Math.atan2(b[1] - a[1], b[0] - a[0]); X.translate(ex, ey); X.rotate(an); X.fillStyle = col; X.beginPath(); X.moveTo(10, 0); X.lineTo(-26, -20); X.lineTo(-26, 20); X.closePath(); X.fill(); X.restore(); };
    arrow([A[0] - 40, A[1] + 60], [L[0] + 20, L[1] - 90], E.io3(P(lt, 1.0, 1.5)), '#22c55e');
    // coin travelling to Public Gold
    const cp = P(lt, 1.0, 1.55); if (cp > 0 && cp < 1) { const cx = lerp(A[0] - 40, L[0] + 20, E.io3(cp)), cy = lerp(A[1] + 60, L[1] - 90, E.io3(cp)); X.beginPath(); X.arc(cx, cy, 34, 0, 7); X.fillStyle = gold(cx - 34, cy - 34, cx + 34, cy + 34); X.fill(); txt('RM', cx, cy + 10, font('IN', 900, 24), '#7d5210'); }
    node(L[0], L[1], P(lt, 1.3, 1.7), 400, 150, '#fff', '#22c55e', 'PUBLIC GOLD', 'AKAUN SYARIKAT', C.navy, C.green);
    tick(L[0] + 180, L[1] - 70, 46, P(lt, 1.7, 2.1));
    arrow([A[0] + 40, A[1] + 60], [R[0] - 20, R[1] - 90], E.io3(P(lt, 2.2, 2.6)), 'rgba(255,255,255,.55)', true);
    node(R[0], R[1], P(lt, 2.4, 2.8), 400, 150, 'rgba(255,255,255,.12)', 'rgba(255,255,255,.4)', 'DEALER', 'AKAUN PERIBADI', '#fff', 'rgba(255,255,255,.7)');
    cross(R[0] + 180, R[1] - 70, 46, P(lt, 2.85, 3.1));
    stamp(['JANGAN'], R[0], R[1] + 10, .14, P(lt, 3.0, 3.3), C.red, 360, 130);
    const a1 = 1 - P(lt, 4.1, 4.3);
    X.save(); X.globalAlpha = a1; answer(['Bayar TERUS ke akaun', 'syarikat Public Gold.'], lt, 1.8, RED, 1560); X.restore();
    if (lt > 4.2) answer(['Dealer hanya pemudah cara.', 'Tak pegang duit Anda walau 1 sen.'], lt, 4.3, RED, 1560);
    flash((1 - P(lt, 0, .3)) * .6, C.red); flash((1 - P(lt, 2.85, 3.15)) * .35, C.red);
  } },
  { kind: YEL, q: ['Selamat ke simpan', 'dalam sistem syarikat?'], a: ['Gram dah banyak?', 'Keluarkan, simpan sendiri.'], v(lt) {
    txt('BEROPERASI SEJAK', 540, 830, font('MO', 700, 34), C.navy, 'center', E.o3(P(lt, .6, .9)), 10);
    slot('2008', 540, 1010, 190, lt, .7, .15, C.navy);
    const p1 = E.oB(P(lt, 1.8, 2.4)), p2 = E.oB(P(lt, 2.0, 2.6));
    photo(IMG.purple, 360, lerp(2000, 1290, p1), 270, lerp(.4, -.13, p1), cl(p1 * 3));
    photo(IMG.blue, 720, lerp(2100, 1300, p2), 270, lerp(-.4, .12, p2), cl(p2 * 3));
  } },
  { kind: NAVY, q: ['Boleh buat akaun', 'untuk anak tak?'], a: ['Akaun Junior GAP,', 'daftar guna MyKid.'], v(lt) {
    const fp = E.oB(P(lt, .6, 1.2)); if (fp <= 0) return;
    X.save(); X.translate(540, 1080); X.scale(Math.max(.02, fp), 1); X.rotate((1 - fp) * .2);
    X.save(); X.filter = 'blur(26px)'; X.fillStyle = 'rgba(0,0,0,.5)'; rr(-300, -170, 620, 400, 30); X.fill(); X.restore();
    const g = X.createLinearGradient(-300, -190, 300, 190); g.addColorStop(0, '#e3efff'); g.addColorStop(1, '#93bdf2');
    rr(-310, -195, 620, 390, 28); X.fillStyle = g; X.fill();
    X.fillStyle = '#1E3A8A'; X.fillRect(-310, -195 + 28, 620, 70); rr(-310, -195, 620, 98, 28); X.save(); X.clip(); X.fillRect(-310, -195, 620, 98); X.restore();
    txt('MyKid', -270, -128, font('IN', 900, 50), '#fff', 'left'); txt('KAD PENGENALAN KANAK-KANAK', 270, -134, font('MO', 700, 16), 'rgba(255,255,255,.8)', 'right', 1, 2);
    rr(-270, -70, 180, 220, 16); X.fillStyle = '#c7dcf7'; X.fill();
    X.fillStyle = '#5b7fb5'; X.beginPath(); X.arc(-180, -5, 44, 0, 7); X.fill(); X.beginPath(); X.ellipse(-180, 120, 74, 62, 0, Math.PI, 0); X.fill();
    X.fillStyle = 'rgba(30,58,138,.35)'; [[-40, -40, 300], [-40, 10, 240], [-40, 60, 280], [-40, 110, 180]].forEach(([x, y, w]) => { rr(x, y, w, 20, 10); X.fill(); });
    X.restore();
    pill('JUNIOR GAP', 540, 830, font('IN', 900, 44), C.y, C.navy, P(lt, 1.4, 1.8), 40, 90);
    const bp = E.oB(P(lt, 1.9, 2.3)); if (bp > 0) { X.save(); X.translate(840, 1300); X.rotate(-.15); X.scale(bp, bp); X.beginPath(); X.arc(0, 0, 105, 0, 7); X.fillStyle = C.red; X.fill(); txt('BAWAH', 0, -18, font('MO', 700, 22), '#fff', 'center', 1, 4); txt('18 THN', 0, 34, font('IN', 900, 46), '#fff'); X.restore(); }
  } },
  { kind: YEL, q: ['Kena denda kalau', 'terlepas sebulan?'], a: ['Tiada denda, tiada penalti,', 'tiada tarikh luput.'], v(lt) {
    const M = ['JAN', 'FEB', 'MAC', 'APR', 'MEI', 'JUN', 'JUL', 'OGO', 'SEP', 'OKT', 'NOV', 'DIS'], buy = [1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0];
    M.forEach((m, i) => {
      const cx = 540 + ((i % 4) - 1.5) * 220, cy = 880 + Math.floor(i / 4) * 170, p = E.oB(P(lt, .5 + i * .06, .9 + i * .06)); if (p <= 0) return;
      X.save(); X.translate(cx, cy); X.scale(p, p); rr(-95, -70, 190, 140, 18); X.fillStyle = buy[i] ? C.navy : 'rgba(7,21,43,.12)'; X.fill();
      txt(m, 0, -20, font('MO', 700, 28), buy[i] ? C.y : 'rgba(7,21,43,.55)', 'center', 1, 3); X.restore();
      const tp = P(lt, 1.2 + i * .08, 1.45 + i * .08);
      if (buy[i]) tick(cx, cy + 28, 26, tp); else txt('—', cx, cy + 44, font('IN', 900, 44), 'rgba(7,21,43,.45)', 'center', tp);
    });
    stamp(['RM0 DENDA'], 540, 1080, -.12, P(lt, 2.4, 2.75), C.red, 620, 170);
  } },
];
function t0r(lt) { return lt * 1.5; }

function qScene(i, lt) {
  const d = Q[i];
  bgFill(d.kind, lt + i * 3);
  header(i + 1, d.q, lt, d.kind);
  d.v(lt);
  if (d.a) answer(d.a, lt, 2.3, d.kind);
}

// ---------- hook ----------
function hook(t) {
  bgFill(NAVY, t);
  // drifting question marks
  const R = rng(4);
  for (let i = 0; i < 16; i++) { const x = R() * W, y = ((R() * H - t * (30 + R() * 50)) % H + H) % H, s = 60 + R() * 120; txt('?', x, y, font('PF', 900, s), 'rgba(255,206,50,.10)', 'center'); }
  // photo fan
  [[IMG.blue, 260, -.22, .2], [IMG.green, 820, .22, .3], [IMG.bar, 540, 0, .4]].forEach(([im, x, r, t0]) => {
    const p = E.oB(P(t, t0, t0 + .8)); photo(im, x, lerp(2300, 1560, p) + Math.sin(t * 1.3 + x) * 8, 340, lerp(r * 2.5, r, p), cl(p * 3));
  });
  const sp = P(t, .15, .5);
  for (let k = 2; k >= 0; k--) { const s = lerp(3, 1, E.oX(cl(sp - k * .1))); if (sp <= 0) break; X.save(); X.translate(540, 600); X.scale(s, s); txt('9', 0, 150, font('PF', 900, 520), gold(-150, -300, 150, 150), 'center', k ? .15 : 1); X.restore(); }
  txt('SOALAN LAZIM', 540, 860, font('MO', 700, 44), C.y, 'center', E.o3(P(t, .5, .8)), 14);
  reveal('sebelum daftar', 540, 980, font('PF', 700, 100, true), 100, '#fff', t, .7, .03);
  reveal('Public Gold GAP', 540, 1100, font('IN', 900, 104), 104, '#fff', t, 1.0, .03);
  const tp = P(t, 2.3, 2.6);
  if (tp > 0) {
    X.save(); X.translate(540, 1250); X.rotate(-.05); const s = lerp(2.2, 1, E.oX(tp)); X.scale(s, s);
    rr(-370, -64, 740, 128, 20); X.fillStyle = C.red; X.fill(); txt('#6 ELAK KENA SCAM', 0, 22, font('IN', 900, 62), '#fff'); X.restore();
  }
  flash((1 - P(t, .15, .45)) * .5, '#fff8d6'); if (t > 2.3) flash((1 - P(t, 2.3, 2.6)) * .3, C.red);
}

// ---------- closing ----------
function closing(t) {
  const lt = t - 47; bgFill(NAVY, t);
  const p = E.oB(P(lt, 0, .7));
  photo(IMG.green, 540, lerp(1900, 760, p) + Math.sin(lt * 1.4) * 8, 430, lerp(.35, -.04, p), cl(p * 3));
  sparkle(560, 690, 50 * Math.sin(P(lt, .8, 1.4) * Math.PI), 1);
  const o1 = 1 - P(lt, 2.0, 2.2);
  X.save(); X.globalAlpha = o1;
  reveal('Emas ni sebenarnya', 540, 1270, font('PF', 900, 76), 76, '#fff', lt, .5, .02);
  reveal('duit tunai', 540, 1410, font('PF', 700, 140, true), 140, gold, lt, .8, .04);
  reveal('yang lebih kebal.', 540, 1510, font('PF', 900, 76), 76, '#fff', lt, 1.1, .02);
  X.restore();
  if (lt > 2.1) {
    reveal('Soalan nombor berapa', 540, 1260, font('PF', 900, 76), 76, '#fff', lt, 2.2, .015);
    reveal('yang bermain dalam fikiran Anda?', 540, 1350, font('PF', 700, 58, true), 58, C.y, lt, 2.4, .012);
    for (let i = 0; i < 9; i++) {
      const cp = E.oB(P(lt, 2.7 + i * .06, 3.0 + i * .06)); if (cp <= 0) continue;
      const x = 540 + (i - 4) * 104, hl = i === 5;
      X.save(); X.translate(x, 1480 + (hl ? Math.sin(lt * 8) * 6 : 0)); X.scale(cp, cp); X.beginPath(); X.arc(0, 0, 42, 0, 7); X.fillStyle = hl ? C.red : C.y; X.fill();
      txt(String(i + 1), 0, 16, font('IN', 900, 44), hl ? '#fff' : C.navy); X.restore();
    }
    const ap = P(lt, 3.1, 3.4);
    if (ap > 0) { txt('KOMEN DI BAWAH', 540, 1610, font('MO', 700, 32), '#fff', 'center', ap, 8); X.save(); X.globalAlpha = ap; X.translate(540, 1680 + Math.abs(Math.sin(lt * 6)) * 16); X.fillStyle = C.y; X.beginPath(); X.moveTo(-26, -14); X.lineTo(26, -14); X.lineTo(0, 18); X.closePath(); X.fill(); X.restore(); }
  }
}

// ---------- CTA ----------
function heart(s) { X.beginPath(); X.moveTo(0, s * .35); X.bezierCurveTo(-s * 1.1, -s * .3, -s * .45, -s * 1.05, 0, -s * .45); X.bezierCurveTo(s * .45, -s * 1.05, s * 1.1, -s * .3, 0, s * .35); X.closePath(); }
function cta(t) {
  const lt = t - 51; bgFill(NAVY, t);
  const g = X.createRadialGradient(540, 620, 0, 540, 620, 800); g.addColorStop(0, 'rgba(255,206,50,.25)'); g.addColorStop(1, 'rgba(255,206,50,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H);
  // avatar
  const ap = E.oB(P(lt, .25, .8));
  if (ap > 0 && IMG.taufik) {
    X.save(); X.translate(540, 600); X.scale(ap, ap);
    X.beginPath(); X.arc(0, 0, 196, 0, 7); X.fillStyle = gold(-196, -196, 196, 196); X.fill();
    X.save(); X.beginPath(); X.arc(0, 0, 180, 0, 7); X.clip(); X.drawImage(IMG.taufik, -180, -180, 360, 360); X.restore();
    X.restore();
    const rp = P(lt, .5, 1.3); if (rp < 1) { X.strokeStyle = `rgba(255,206,50,${1 - rp})`; X.lineWidth = 8; X.beginPath(); X.arc(540, 600, 196 + rp * 160, 0, 7); X.stroke(); }
  }
  reveal('@taufik.pg', 540, 940, font('IN', 900, 120), 120, '#fff', lt, .7, .04);
  txt('Taufik Bin Musa · Dealer Public Gold G100', 540, 1020, font('IN', 500, 34), 'rgba(255,255,255,.7)', 'center', E.o3(P(lt, 1.0, 1.4)));
  // buttons
  const B = [['LIKE', 1.3, 2.2], ['SHARE', 1.45, 3.0], ['FOLLOW', 1.6, 3.8]];
  B.forEach(([lab, tin, tap], i) => {
    const p = E.oB(P(lt, tin, tin + .45)); if (p <= 0) return;
    const x = 540 + (i - 1) * 320, y = 1250, done = lt > tap, press = 1 - .1 * Math.sin(P(lt, tap - .05, tap + .2) * Math.PI);
    X.save(); X.translate(x, y); X.scale(p * press, p * press);
    rr(-145, -110, 290, 220, 40); X.fillStyle = done ? (i === 2 ? C.y : '#fff') : 'rgba(255,255,255,.1)'; X.fill(); X.strokeStyle = C.y; X.lineWidth = 4; X.stroke();
    const ic = done ? (i === 0 ? C.red : C.navy) : '#fff';
    X.save(); X.translate(0, -30);
    if (i === 0) { heart(52); if (done) { X.fillStyle = ic; X.fill(); } else { X.strokeStyle = ic; X.lineWidth = 7; X.stroke(); } }
    if (i === 1) { X.strokeStyle = ic; X.lineWidth = 8; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath(); X.moveTo(-34, 30); X.quadraticCurveTo(-30, -20, 22, -20); X.stroke(); X.beginPath(); X.moveTo(8, -40); X.lineTo(32, -20); X.lineTo(8, 0); X.stroke(); }
    if (i === 2) { X.strokeStyle = ic; X.lineWidth = 8; X.lineCap = 'round'; if (done) { X.lineJoin = 'round'; X.beginPath(); X.moveTo(-26, 0); X.lineTo(-6, 20); X.lineTo(28, -22); X.stroke(); } else { X.beginPath(); X.moveTo(-28, 0); X.lineTo(28, 0); X.moveTo(0, -28); X.lineTo(0, 28); X.stroke(); } }
    X.restore();
    txt(i === 2 && done ? 'FOLLOWED' : lab, 0, 72, font('IN', 900, 36), done ? C.navy : '#fff', 'center', 1, 2);
    X.restore();
    // burst on tap
    const bp = P(lt, tap, tap + .6);
    if (bp > 0 && bp < 1) for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2, r = 120 + 120 * E.o3(bp); X.fillStyle = i === 0 ? `rgba(239,68,68,${1 - bp})` : `rgba(255,206,50,${1 - bp})`; X.beginPath(); X.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, 12 * (1 - bp) + 2, 0, 7); X.fill(); }
    if (i === 0 && bp > 0 && bp < 1) { X.save(); X.globalAlpha = 1 - bp; X.translate(x, y - 140 - bp * 120); heart(30); X.fillStyle = C.red; X.fill(); X.restore(); }
  });
  // finger
  if (lt > 1.9 && lt < 4.5) {
    const pts = [[860, 1700], [220, 1290], [540, 1290], [860, 1290], [900, 1700]], ts = [1.9, 2.2, 3.0, 3.8, 4.4];
    let k = 0; while (k < ts.length - 2 && lt > ts[k + 1]) k++;
    const e = E.io3(P(lt, ts[k] + (k ? .25 : 0), ts[k + 1] - .02)), fx = lerp(pts[k][0], pts[k + 1][0], e), fy = lerp(pts[k][1], pts[k + 1][1], e);
    X.save(); X.globalAlpha = 1 - P(lt, 4.1, 4.4); X.fillStyle = 'rgba(255,255,255,.35)'; X.beginPath(); X.arc(fx, fy, 36, 0, 7); X.fill(); X.strokeStyle = '#fff'; X.lineWidth = 4; X.stroke(); X.restore();
  }
  const fp = E.o3(P(lt, 4.2, 4.6));
  txt('Like | Share | Follow', 540, 1530 + (1 - fp) * 30, font('IN', 900, 74), '#fff', 'center', fp);
  txt('@taufik.pg', 540, 1650 + (1 - fp) * 30, font('IN', 900, 96), gold(300, 1570, 780, 1660), 'center', E.o3(P(lt, 4.35, 4.75)));
  const sw = P(lt, 5.0, 5.7);
  if (sw > 0 && sw < 1) { X.save(); X.font = font('IN', 900, 96); X.textAlign = 'center'; X.globalCompositeOperation = 'lighter'; const sx = lerp(260, 820, sw), sg = X.createLinearGradient(sx - 80, 0, sx + 80, 0); sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(.5, 'rgba(255,255,255,.8)'); sg.addColorStop(1, 'rgba(255,255,255,0)'); X.fillStyle = sg; X.fillText('@taufik.pg', 540, 1650); X.restore(); }
  // iris in from the previous scene
  const ip = E.oX(P(lt, 0, .55));
  if (ip < 1) { X.save(); X.beginPath(); X.rect(0, 0, W, H); X.arc(540, 600, lerp(0, 1400, ip), 0, 7, true); X.fillStyle = C.y; X.fill('evenodd'); X.restore(); }
}

// ---------- HUD: @taufik.pg watermark + progress ----------
function hud(t, kind, qi) {
  const a = E.o3(P(t, .2, .7)) * (1 - P(t, 50.8, 51.2));
  if (a <= 0) return;
  const col = kind === YEL ? C.navy : '#fff';
  X.save(); X.globalAlpha = a;
  X.save(); X.font = font('IN', 800, 32); const w = X.measureText('@taufik.pg').width; X.restore();
  rr(56, 64, w + 70, 60, 30); X.fillStyle = kind === YEL ? 'rgba(7,21,43,.9)' : 'rgba(255,255,255,.12)'; X.fill();
  X.beginPath(); X.arc(88, 94, 10, 0, 7); X.fillStyle = C.y; X.fill();
  txt('@taufik.pg', 108, 105, font('IN', 800, 32), kind === YEL ? '#fff' : '#fff', 'left');
  if (qi >= 0) txt(`0${qi + 1} / 09`, W - 70, 106, font('MO', 700, 28), col, 'right', 1, 4);
  X.fillStyle = kind === YEL ? C.navy : C.y; X.fillRect(70, H - 70, (W - 140) * (t / DUR), 5);
  X.globalAlpha *= .3; X.fillRect(70, H - 70, W - 140, 5);
  X.restore();
}

// ---------- compositor ----------
const HITS = [[.15, .8], ...SEG.slice(1).map(s => [s[1], .45]), [27.0, .9], [29.85, .7], [51, .6]];
function impact(t) { let k = 0; for (const [h, a] of HITS) if (t >= h) k = Math.max(k, a * Math.exp(-(t - h) * 7)); return k; }
function segAt(t) { let i = SEG.findIndex(s => t >= s[1] && t < s[2]); return i < 0 ? SEG.length - 1 : i; }
function kindAt(i) { const s = SEG[i]; return s[0] === 'q' ? Q[i - 1].kind : NAVY; }
function frame(t) {
  X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.filter = 'none';
  const i = segAt(t), [type, s0, s1] = SEG[i];
  const k = impact(t), shx = Math.sin(t * 91) * 20 * k, shy = Math.cos(t * 83) * 18 * k, pu = 1 + .04 * k;
  X.save(); X.translate(540 + shx, 960 + shy); X.scale(pu, pu); X.translate(-540, -960);
  if (type === 'hook') hook(t); else if (type === 'q') qScene(i - 1, t - s0); else if (type === 'close') closing(t); else cta(t);
  // outgoing wipe into the next segment (cta uses its own iris)
  if (i + 1 < SEG.length && SEG[i + 1][0] !== 'cta') slab(P(t, s1 - .42, s1), BG[kindAt(i + 1)]);
  if (SEG[i + 1] && SEG[i + 1][0] === 'cta') { const z = P(t, s1 - .4, s1); if (z > 0) { X.beginPath(); X.arc(540, 960, E.i3(z) * 1300, 0, 7); X.fillStyle = C.y; X.fill(); } }
  X.restore();
  hud(t, kindAt(i), type === 'q' ? i - 1 : -1);
}

window.ready = Promise.all([
  ...[font('PF', 900, 40), font('PF', 700, 40, true), font('IN', 500, 40), font('IN', 800, 40), font('IN', 900, 40), font('MO', 700, 40)].map(f => document.fonts.load(f)),
  ...Object.entries({ blue: 'card-blue', purple: 'card-purple', bar: 'bar-10g', green: 'coin-green', taufik: 'taufik' }).map(([k, f]) => loadImg(`img/${f}.jpg`).then(im => IMG[k] = im)),
]).then(() => { render(0); return true; });
