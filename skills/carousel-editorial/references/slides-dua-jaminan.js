// Carousel "2 jaminan orang makan gaji" — simpanan kecemasan (gaya editorial). Potret hanya slaid terakhir.
var N = 6;
var ASSETS = { arms: 'peluk-tubuh.png', stack: 'set-jongkong-bertingkat-bungamas.jpg' };

function ink(fn, th = 7, col = K.ink) { X.save(); X.strokeStyle = col; X.lineWidth = th; X.lineCap = 'round'; X.lineJoin = 'round'; fn(); X.restore(); }
function idCard(cx, cy, s, rot) { // office ID on lanyard
  X.save(); X.translate(cx, cy); X.rotate(rot); X.scale(s, s);
  ink(() => { X.beginPath(); X.moveTo(-60, -320); X.lineTo(-20, -150); X.moveTo(60, -320); X.lineTo(20, -150); X.stroke(); }, 10, K.red);
  X.fillStyle = '#fff'; rr(-140, -150, 280, 360, 24); X.fill(); ink(() => { rr(-140, -150, 280, 360, 24); X.stroke(); rr(-40, -135, 80, 18, 9); X.stroke(); }, 6);
  X.fillStyle = K.peach; rr(-80, -95, 160, 150, 16); X.fill();
  ink(() => { X.beginPath(); X.arc(0, -40, 34, 0, 7); X.stroke(); X.beginPath(); X.arc(0, 50, 60, Math.PI * 1.15, Math.PI * 1.85); X.stroke(); }, 6);
  txt('PEKERJA', 0, 110, F.block(46), K.ink, 'center'); X.fillStyle = '#d4d4d4'; rr(-90, 135, 180, 14, 7); X.fill(); rr(-60, 162, 120, 14, 7); X.fill();
  X.restore();
}
function letter(cx, cy, s, rot) { // surat letak jawatan + pen
  X.save(); X.translate(cx, cy); X.rotate(rot); X.scale(s, s);
  X.fillStyle = '#fff'; X.fillRect(-170, -220, 340, 440); ink(() => X.strokeRect(-170, -220, 340, 440), 6);
  txt('SURAT', 0, -150, F.block(46), K.ink, 'center'); txt('LETAK JAWATAN', 0, -100, F.block(46), K.red, 'center');
  X.fillStyle = '#d4d4d4'; for (let i = 0; i < 6; i++) { X.fillRect(-130, -40 + i * 34, 260 - (i % 3) * 40, 12); }
  X.strokeStyle = '#1D4ED8'; X.lineWidth = 5; X.lineCap = 'round'; X.beginPath(); X.moveTo(-120, 175); X.bezierCurveTo(-90, 120, -70, 200, -40, 160); X.bezierCurveTo(-10, 120, 10, 190, 60, 165); X.stroke();
  X.save(); X.translate(140, 140); X.rotate(-.7); X.fillStyle = K.ink; rr(-14, -150, 28, 220, 8); X.fill(); X.beginPath(); X.moveTo(-14, 70); X.lineTo(0, 110); X.lineTo(14, 70); X.fill(); X.restore();
  X.restore();
}
function officeBox(cx, cy, s) { // kotak barang pejabat — diberhentikan
  X.save(); X.translate(cx, cy); X.scale(s, s);
  // items sticking out
  X.fillStyle = '#16A34A'; X.beginPath(); X.moveTo(-90, -90); X.quadraticCurveTo(-130, -200, -60, -230); X.quadraticCurveTo(-60, -150, -70, -90); X.fill();
  X.fillStyle = '#fff'; rr(-20, -200, 120, 150, 8); X.fill(); ink(() => { rr(-20, -200, 120, 150, 8); X.stroke(); }, 5); X.fillStyle = '#F4B400'; rr(-5, -185, 90, 60, 6); X.fill();
  X.fillStyle = '#C8A27A'; X.beginPath(); X.moveTo(-200, -90); X.lineTo(200, -90); X.lineTo(180, 140); X.lineTo(-180, 140); X.closePath(); X.fill();
  ink(() => { X.beginPath(); X.moveTo(-200, -90); X.lineTo(200, -90); X.lineTo(180, 140); X.lineTo(-180, 140); X.closePath(); X.stroke(); X.beginPath(); X.moveTo(-200, -90); X.lineTo(-250, -150); X.moveTo(200, -90); X.lineTo(250, -150); X.stroke(); }, 7);
  X.save(); X.rotate(-.06); X.fillStyle = '#fff'; X.fillRect(-120, -20, 240, 100); ink(() => X.strokeRect(-120, -20, 240, 100), 5, K.red); txt('NOTIS', 0, 50, F.block(60), K.red, 'center'); X.restore();
  X.restore();
}
function payslip(cx, cy, s, rot) {
  X.save(); X.translate(cx, cy); X.rotate(rot); X.scale(s, s);
  X.fillStyle = '#fff'; X.fillRect(-150, -180, 300, 360); ink(() => X.strokeRect(-150, -180, 300, 360), 6);
  txt('SLIP GAJI', 0, -120, F.block(44), K.ink, 'center'); txt('RM 8,888', 0, 0, F.block(70), K.ink, 'center');
  X.fillStyle = '#d4d4d4'; [60, 95, 130].forEach(y => X.fillRect(-110, y, 220, 12));
  ink(() => { X.beginPath(); X.moveTo(-170, -190); X.lineTo(170, 190); X.moveTo(170, -190); X.lineTo(-170, 190); X.stroke(); }, 12, K.red);
  X.restore();
}
function monthStrip(x0, y0, filled) { // 12 bulan, berapa yang "bertahan"
  const M = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'O', 'S', 'O', 'N', 'D'];
  M.forEach((m, i) => { const x = x0 + (i % 6) * 100, y = y0 + Math.floor(i / 6) * 110;
    X.fillStyle = i < filled ? K.red : '#fff'; rr(x, y, 84, 92, 12); X.fill(); ink(() => { rr(x, y, 84, 92, 12); X.stroke(); }, 4);
    txt(m, x + 42, y + 62, F.block(46), i < filled ? '#fff' : '#bbb', 'center'); });
}
function crashChart(x0, y0, w, h) {
  ink(() => { X.beginPath(); X.moveTo(x0, y0); X.lineTo(x0, y0 + h); X.lineTo(x0 + w, y0 + h); X.stroke(); }, 5);
  const pts = [[0, .35], [.15, .25], [.3, .32], [.45, .2], [.55, .3], [.62, .78], [.75, .7], [.88, .9], [1, .85]];
  ink(() => { X.beginPath(); pts.forEach(([u, v], i) => { const px = x0 + u * w, py = y0 + v * h; i ? X.lineTo(px, py) : X.moveTo(px, py); }); X.stroke(); }, 9, K.red);
  burst(x0 + .62 * w, y0 + .55 * h, .9, 2.4);
}
function wall(x0, y0) { // benteng bata
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const x = x0 + c * 110 + (r % 2 ? 55 : 0), y = y0 - r * 62; X.fillStyle = r % 2 ? '#F7E2D6' : '#fff'; X.fillRect(x, y, 104, 56); ink(() => X.strokeRect(x, y, 104, 56), 5); }
}

var SLIDES = [
  // ---------- COVER (tiada potret) ----------
  function (x) {
    sticky(['Sepanjang', 'hayat kerja.'], x + 770, 60, 270, .06, 44);
    note(['Tahukah anda?'], x + 70, 190, 54, -.05, false);
    brushTitle('MAKAN GAJI?', x + 70, 330, 110, -.04);
    blockTitle(['ANDA CUMA ADA'], x + 70, 490, 124);
    bigNum('2', x + 40, 1010, 520);
    blockTitle(['JAMINAN', 'MUTLAK.'], x + 400, 700, 130, .95);
    burst(x + 850, 620, 1, .6);
    idCard(x + 880, 1050, .62, .06);
    note(['Yang mana satu', 'akan jadi dulu?'], x + 400, 950, 46, -.05);
  },
  // ---------- 1. berhenti sendiri ----------
  function (x) {
    counter(x, 1, 5); sticky(['Pilihan', 'anda.'], x + 810, 50, 220, .06, 46);
    bigNum('1', x + 30, 620, 520);
    brushTitle('JAMINAN #1', x + 380, 320, 96);
    blockTitle(['ANDA BERHENTI', 'SENDIRI'], x + 380, 460, 120, .95);
    body('Jaminan pertama: *anda sendiri* yang akan buat keputusan untuk *berhenti kerja*.', x + 385, 660, 650, 38);
    letter(x + 330, 1020, .78, -.06);
    note(['Satu hari nanti,', 'pasti berlaku.'], x + 640, 960, 52, -.06);
  },
  // ---------- 2. diberhentikan ----------
  function (x) {
    counter(x, 2, 5); sticky(['Paling', 'digeruni'], x + 790, 50, 240, .06, 46);
    bigNum('2', x + 10, 620, 520);
    brushTitle('JAMINAN #2', x + 380, 320, 96);
    blockTitle(['ANDA', 'DIBERHENTIKAN'], x + 380, 460, 120, .95, K.red);
    body('Ramai *terperangkap di zon selesa* gaji bulanan, sehinggalah krisis syarikat melanda dan *punca rezeki terputus* dalam sekelip mata.', x + 385, 660, 650, 34);
    officeBox(x + 330, 1060, .85);
    note(['Tanpa sempat', 'bersedia.'], x + 660, 1000, 54, -.06);
  },
  // ---------- 3. kekayaan sebenar ----------
  function (x) {
    counter(x, 3, 5); sticky(['Ukur dengan', 'BULAN'], x + 770, 50, 270, .06, 44);
    bigNum('3', x + 10, 620, 520);
    brushTitle('KAYA SEBENAR', x + 380, 320, 86);
    blockTitle(['BUKAN SAIZ', 'GAJI'], x + 380, 460, 130, .95);
    body('Kekayaan sebenar diukur daripada *berapa bulan keluarga anda mampu bertahan* hidup dengan maruah, *bila gaji dah tiada*.', x + 385, 680, 650, 34);
    payslip(x + 210, 1020, .62, -.08);
    monthStrip(x + 420, 900, 3);
    note(['Berapa kotak boleh anda warnakan?'], x + 400, 1180, 40, -.03, false);
  },
  // ---------- 4. tiada simpanan ----------
  function (x) {
    counter(x, 4, 5); sticky(['Jangan', 'tunggu krisis'], x + 760, 50, 280, .06, 42);
    bigNum('4', x + 10, 620, 520);
    brushTitle('TIADA SIMPANAN?', x + 370, 320, 76);
    blockTitle(['MIMPI', 'NGERI'], x + 380, 460, 130, .95);
    body('Tanpa *simpanan kecemasan*, kejatuhan ekonomi boleh *memusnahkan masa depan* keluarga anda.', x + 385, 680, 650, 36);
    crashChart(x + 80, 870, 420, 280);
    photoBox(IMG.stack, x + 590, 860, 400, 330, 26, .5, .5, .04);
    note(['Benteng anda?'], x + 120, 1235, 46, -.04, false);
    arrow(x + 520, 1010, x + 585, 990, 20, K.ink, 6);
  },
  // ---------- 5. CTA (potret di sini sahaja) ----------
  function (x) {
    counter(x, 5, 5); sticky(['Semak', 'sekarang'], x + 60, 190, 230, -.06, 44);
    cutout(IMG.arms, x + 860, SH - 40, 680);
    brushTitle('BERAPA BULAN', x + 70, 450, 80);
    blockTitle(['SIMPANAN', 'KECEMASAN', 'ANDA?'], x + 70, 590, 104, .95);
    ['0', '1-3', '3-6', '6+'].forEach((l, i) => { const cx = x + 70 + i * 130; rr(cx, 830, 116, 70, 35); X.fillStyle = i === 3 ? K.red : K.peach; X.fill(); txt(l, cx + 58, 878, F.block(38), i === 3 ? '#fff' : K.ink, 'center'); });
    note(['Beritahu di komen ↓'], x + 70, 980, 48, -.04, false);
    body('Ketenangan hidup menuntut benteng yang...', x + 75, 1040, 540, 30);
    bigNum('KUKUH!', x + 60, 1225, 150, true);
  },
];
