// scenes.js — "5 Realiti Anak Muda Wajib Tahu Sebelum Membeli Rumah" (83.5s). Mix: thumbnail, pastel, red, editorial, maroon.
const DUR = 83.545011, HEADN = 2506;
const ASSETS = {
  wallet: 'dompet-wealthcard-safari.jpg', tiers: 'set-jongkong-bertingkat-bungamas.jpg', kg: 'jongkong-1kg-tapak-tangan.jpg', ipad: 'kad-dinar-dan-app-gap-ipad.jpg', shop: 'kad-taifook-depan-kedai-public-gold.jpg',
  bungamas: 'jongkong-100g-kad-bungamas-ungu.jpg', binder: 'koleksi-binder-kad.jpg',
  bBuka: 'baba-tangan-terbuka.png', bFikir: 'baba-berfikir-polo.png', bTunjuk: 'baba-tunjuk-atas.png', baba: 'baba-semi-realistik-jom.png', bHati: 'baba-peluk-hati.png', bThumbs: 'baba-dua-thumbs-2.png',
  mOk: 'mami-ok.png', mJari: 'mami-jari-hati.png', mPeluk: 'mami-peluk-hati.png', aPeluk: 'amani-peluk-hati.png', lPeluk: 'aileen-peluk-hati.png',
};
const SEG = [
  [0, 4.08, '*5 *Realiti anak muda wajib tahu sebelum *membeli *rumah'],
  [4.08, 7.76, 'Membeli rumah adalah *impian besar setiap anak muda.'],
  [7.76, 10.94, 'Tapi jika terjun tanpa *persediaan rapi,'],
  [10.94, 14.41, 'impian boleh bertukar menjadi *mimpi *ngeri.'],
  [14.41, 18.28, '*Pertama, kos *tersembunyi selain deposit.'],
  [18.28, 20.48, 'Kos *peguam, duti *setem,'],
  [20.48, 24.51, '*renovasi dan *perabot memerlukan tunai yang sangat banyak.'],
  [24.51, 29.05, '*Kedua, kumpul deposit dalam aset yang *kalis *inflasi.'],
  [29.05, 31.81, 'Duit tunai yang disimpan *bertahun-tahun'],
  [31.81, 35.55, 'dalam akaun bank *rugi mengejar kenaikan harga rumah.'],
  [35.55, 40.53, '*Ketiga, jangan *licinkan semua simpanan untuk deposit rumah.'],
  [40.53, 46.75, 'Menyapu bersih akaun bank untuk beli rumah akan buatkan anda *terdedah kepada *kecemasan.'],
  [46.75, 50.71, '*Keempat, komitmen *pinjaman selama *30 *tahun'],
  [50.71, 52.81, 'Pastikan kewangan anda *stabil'],
  [52.81, 57.68, 'dan ada *dana *kecemasan sebelum tandatangan perjanjian pinjaman.'],
  [57.68, 61.73, '*Kelima, simpan *emas seiring menabung deposit,'],
  [61.73, 67.79, 'supaya bila kunci rumah di tangan, poket kita tidak *kosong daripada aset lain.'],
  [67.79, 70.74, 'Beli rumah dari posisi kewangan yang *kukuh.'],
  [70.74, 72.92, 'Agar rumah jadi tempat *berteduh'],
  [72.92, 76.87, 'yang *menenangkan, bukan *beban yang menyesakkan.'],
  [76.87, 81.0, '*Dulu *ragu, *kini *tahu. Tuan puan yang dah ready nak mulakan simpan emas,'],
  [81.0, 83.55, 'boleh rujuk *video saya untuk bermula.'],
];
const fadeOut = (lt, t0) => { X.globalAlpha *= 1 - clamp((lt - t0) / .3); };
function house(cx, cy, s) {  // rumah pastel ringkas
  const K = PA.K; X.save(); X.translate(cx, cy); X.scale(s / 300, s / 300); X.lineWidth = 7; X.lineJoin = 'round'; X.strokeStyle = K.ink;
  rr(-110, -20, 220, 150, 12); X.fillStyle = K.white; X.fill(); X.stroke();
  X.beginPath(); X.moveTo(-140, -20); X.lineTo(0, -130); X.lineTo(140, -20); X.closePath(); X.fillStyle = K.red; X.fill(); X.stroke();
  rr(-28, 40, 56, 90, 8); X.fillStyle = K.butter; X.fill(); X.stroke();
  rr(-90, 5, 48, 44, 6); X.fillStyle = K.sky; X.fill(); X.stroke(); rr(42, 5, 48, 44, 6); X.fill(); X.stroke();
  rr(60, -120, 30, 60, 4); X.fillStyle = K.peach; X.fill(); X.stroke(); X.restore();
}

const SCENES = [
  // 1 hook (thumbnail)
  Hh(0, 4.08, (lt) => {
    const out = clamp((lt - 3.6) / .3); X.save(); X.globalAlpha = 1 - out;
    anim(lt, .1, 540, 280, () => TH.head('5 REALITI', 540, 310, 150, '#fff', TH.C.ink, 'center'));
    anim(lt, .35, 540, 440, () => TH.brushHead('SEBELUM BELI RUMAH', 540, 460, 100, TH.C.y, TH.C.red, 5));
    anim(lt, .8, 540, 560, () => TH.pill('ANAK MUDA WAJIB TAHU', 540, 520, TH.C.y, TH.C.ink, 30));
    X.restore();
  }, 1, WC.th),
  // 2 impian besar (pastel)
  B(4.08, 10.94, 'pa1', WC.pa, (lt) => {
    anim(lt, .1, 540, 310, () => PA.title('Impian *Besar*', 540, 310, 110, 980, 'center'));
    anim(lt, .3, 540, 410, () => PA.txt('setiap anak muda', 540, 410, PA.F.b(52), PA.K.brown, 'center'));
    anim(lt, .6, 540, 760, () => { house(540, 790, 380); PA.heart(540, 600 + bob(lt, 8), 36); });
    anim(lt, 1.0, 200, 1300, () => PA.chara(IMG.bBuka, 200, mamiY, 460));
    anim(lt, 1.2, 880, 1300, () => PA.chara(IMG.mJari, 880, mamiY, 460));
    anim(lt, 3.7, 540, 1150, () => PA.bubble(['*Eh, tunggu', 'dulu...'], 540, 1130, 380, 190, 420, 1260, 52));
    PA.sparkle(130, 700, 28); PA.sparkle(950, 650, 24);
  }, [.1, .3, .6, 1.0, 1.2, 3.7]),
  // 3 mimpi ngeri (red komik)
  B(10.94, 14.41, 'rd', WC.rd, (lt) => {
    anim(lt, .05, 540, 230, () => RD.label('TAPI...', 540, 230, 64));
    anim(lt, .3, 540, 650, () => { RD.burst(540, 650, 440, 280, RD.K.red, 18, 3, true); RD.pow('MIMPI', 540, 630, 150, RD.K.yel, 'center', -.04); RD.pow('NGERI!', 540, 770, 150, '#fff', 'center', -.04); });
    anim(lt, 1.2, 240, 1300, () => RD.img(IMG.bFikir, 240, mamiY, 480));
    anim(lt, 1.7, 720, 1170, () => RD.bubble(['ALAMAK!'], 720, 1140, 300, 130, 440, 1230, 56));
  }, [.05, .3, 1.2, 1.7]),
  // 4 ch1 editorial
  Hh(14.41, 18.28, (lt) => {
    anim(lt, .05, 300, 360, () => ED.bigNum('1', 70, 470, 330, true));
    anim(lt, .3, 700, 400, () => { ED.txt('REALITI', 340, 310, ED.F.bodyB(44), '#fff', 'left', 6); ED.brushTitle('Kos Tersembunyi', 340, 410, 64, -.03, false, '#fff'); });
    anim(lt, .8, 700, 450, () => ED.swoosh(340, 440, 930, ED.K.red, 10, 3));
  }, 1, WC.ed),
  // 5 kos peguam dll (maroon)
  B(18.28, 24.51, 'ma1', WC.ma, (lt) => {
    anim(lt, .05, 540, 270, () => mPill(['Kos Tersembunyi'], 540, 270, 92)); anim(lt, .05, 540, 270, () => MA.side(300));
    anim(lt, .3, 540, 560, () => mRow(60, 440, 960, 'Kos', 'PEGUAM'));
    anim(lt, 1.2, 540, 710, () => mRow(60, 590, 960, 'Duti', 'SETEM'));
    anim(lt, 2.4, 540, 860, () => mRow(60, 740, 960, 'Kos', 'RENOVASI'));
    anim(lt, 3.2, 540, 1010, () => mRow(60, 890, 960, 'Kos', 'PERABOT'));
    anim(lt, 4.4, 540, 1180, () => mWhite(90, 1090, 900, ['Semua perlukan', '*tunai yang sangat banyak.'], 50));
  }, [.05, .3, 1.2, 2.4, 3.2, 4.4]),
  // 6 ch2 pastel
  Hh(24.51, 29.05, (lt) => {
    anim(lt, .05, 540, 330, () => { PA.card(70, 190, 940, 330, PA.K.white); PA.pill('REALITI 2', 540, 150, 40, PA.K.ink, PA.K.butter, -.03); PA.title('Kumpul *Deposit*', 540, 370, 96, 900, 'center'); PA.txt('dalam aset kalis inflasi', 540, 460, PA.F.b(42), PA.K.brown, 'center'); });
  }, -1, WC.pa),
  // 7 duit tunai vs harga rumah (editorial)
  B(29.05, 35.55, 'ed', WC.ed, (lt) => {
    anim(lt, .05, 300, 220, () => ED.txt('REALITI 2', 70, 200, ED.F.bodyB(40), ED.K.ink, 'left', 6));
    anim(lt, .1, 540, 340, () => ED.brushTitle('Rugi mengejar harga rumah', 60, 340, 62, -.02, true, ED.K.ink, easeOut(clamp((lt - 3) / .6))));
    anim(lt, .4, 540, 800, () => { X.save(); X.strokeStyle = 'rgba(17,17,17,.35)'; X.lineWidth = 5; X.lineCap = 'round'; X.beginPath(); X.moveTo(100, 480); X.lineTo(100, 1100); X.lineTo(980, 1100); X.stroke(); X.restore(); ED.txt('masa →', 980, 1150, ED.F.hand(46), ED.K.muted, 'right'); });
    const p1 = easeOut(clamp((lt - .6) / 2.2)), p2 = easeOut(clamp((lt - 3.0) / 2.4));
    X.save(); X.lineCap = 'round'; X.lineJoin = 'round';
    if (p1 > 0) { X.strokeStyle = ED.K.ink; X.lineWidth = 12; X.beginPath(); X.moveTo(100, 900); X.lineTo(100 + 840 * p1, 900 + 40 * p1); X.stroke(); }
    if (p2 > 0) { X.strokeStyle = ED.K.red; X.lineWidth = 14; X.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30 * p2; const x = 100 + 840 * u, y = 940 - 480 * (u * u * .6 + u * .4); i ? X.lineTo(x, y) : X.moveTo(x, y); } X.stroke(); }
    X.restore();
    anim(lt, 1.2, 300, 1000, () => ED.note(['duit tunai', 'di bank'], 140, 1010, 56, -.03, false));
    anim(lt, 3.2, 300, 560, () => ED.note(['harga rumah', 'naik!'], 520, 560, 66, -.05, true, ED.K.red));
    anim(lt, 5.0, 840, 1300, () => PA.chara(IMG.bTunjuk, 850, mamiY, 340));
  }, [.05, .1, .4, 1.2, 3.2, 5.0]),
  // 8 ch3 thumbnail
  Hh(35.55, 40.53, (lt) => {
    anim(lt, .05, 540, 280, () => TH.pill('REALITI 3', 540, 230, TH.C.y, TH.C.ink, 32));
    anim(lt, .3, 540, 440, () => TH.brushHead('JANGAN LICINKAN', 540, 430, 104, '#fff', TH.C.red, 21));
    anim(lt, .9, 540, 570, () => TH.head('SEMUA SIMPANAN', 540, 570, 90, TH.C.y, TH.C.ink, 'center'));
  }, 1, WC.th),
  // 9 akaun bank licin (pastel)
  B(40.53, 46.75, 'pa2', WC.pa, (lt) => {
    anim(lt, .1, 540, 310, () => PA.title('Akaun Bank *Licin?*', 540, 310, 100, 980, 'center'));
    anim(lt, .4, 540, 640, () => {
      PA.card(120, 440, 840, 340, PA.K.white); PA.txt('Akaun Bank', 540, 530, PA.F.t(56), PA.K.brown, 'center');
      [.8, 1.4, 1.9, 2.4, 2.9].forEach((t0, i) => { const a = 1 - clamp((lt - t0) / .35); if (a > 0) { X.save(); X.globalAlpha *= a; PA.coin(230 + i * 125, 660 - clamp((lt - t0) / .35) * 30, 52); X.restore(); } });
    });
    anim(lt, 3.6, 300, 1300, () => PA.chara(IMG.bFikir, 300, mamiY + bob(lt, 5), 560));
    anim(lt, 3.9, 800, 1300, () => PA.chara(IMG.mOk, 830, mamiY, 480));
    anim(lt, 4.3, 540, 1060, () => PA.bubble(['*Kalau', 'kecemasan?'], 560, 1010, 420, 200, 360, 1140, 52));
  }, [.1, .4, 3.6, 3.9, 4.3]),
  // 9b ch4 red
  Hh(46.75, 50.71, (lt) => {
    anim(lt, .05, 540, 270, () => RD.label('REALITI 4', 540, 270, 64));
    anim(lt, .25, 540, 420, () => RD.pow('PINJAMAN 30 TAHUN', 540, 440, 104, RD.K.yel, 'center', -.03));
  }, -1, WC.rd),
  // 10 pinjaman vs stabil (maroon)
  B(50.71, 57.68, 'ma1', WC.ma, (lt) => {
    anim(lt, .05, 540, 270, () => mPill(['Komitmen Pinjaman'], 540, 270, 88)); anim(lt, .05, 540, 270, () => MA.side(300));
    anim(lt, .3, 290, 800, () => MA.tierCard(50, 450, 480, 560, 'PINJAMAN', '30 TAHUN', 'komitmen jangka panjang'));
    anim(lt, 2.0, 790, 800, () => MA.tierCard(550, 450, 480, 560, 'KEWANGAN', 'STABIL', 'dan ada dana kecemasan'));
    anim(lt, 4.6, 540, 1200, () => mWhite(90, 1100, 900, ['Sebelum tandatangan', '*perjanjian pinjaman.'], 52));
  }, [.05, .3, 2.0, 4.6]),
  // 11 ch5 pastel
  Hh(57.68, 61.73, (lt) => {
    anim(lt, .05, 540, 330, () => { PA.card(70, 190, 940, 330, PA.K.white); PA.pill('REALITI 5', 540, 150, 40, PA.K.ink, PA.K.butter, -.03); PA.title('Simpan *Emas*', 540, 370, 100, 900, 'center'); PA.txt('seiring menabung deposit', 540, 460, PA.F.b(42), PA.K.brown, 'center'); });
  }, 1, WC.pa),
  // 12 kunci rumah, poket tak kosong (thumbnail)
  B(61.73, 67.79, 'th', WC.th, (lt) => {
    anim(lt, .1, 540, 300, () => TH.head('KUNCI RUMAH', 540, 330, 150, TH.C.y, TH.C.ink, 'center'));
    anim(lt, .5, 540, 480, () => TH.brushHead('DI TANGAN', 540, 490, 120, '#fff', TH.C.red, 5));
    anim(lt, 3.0, 540, 690, () => TH.head('POKET TAK KOSONG', 540, 700, 110, '#fff', TH.C.ink, 'center'));
    anim(lt, 3.6, 540, 1180, () => TH.photo(IMG.bungamas, 540, 1190, 400, -.04));
    anim(lt, 4.4, 760, 1380, () => TH.stamp(['ADA ASET LAIN', 'SIMPAN EMAS'], 720, 1390, .1, TH.C.y, 560, 210));
  }, [.1, .5, 3.0, 3.6, 4.4]),
  // 13 rumah = tempat berteduh (pastel keluarga)
  B(67.79, 76.87, 'pa3', WC.pa, (lt) => {
    anim(lt, .1, 540, 280, () => PA.pill('Posisi kewangan kukuh', 540, 260, 50, PA.K.ink, PA.K.butter, -.02));
    anim(lt, 1.0, 540, 620, () => { house(540, 610, 300); PA.heart(540, 450 + bob(lt, 8), 32); });
    anim(lt, 2.95, 540, 980, () => PA.title('Tempat *Berteduh*', 540, 850, 96, 980, 'center'));
    anim(lt, 5.1, 300, 960, () => PA.pill('Menenangkan', 300, 950, 52, PA.K.ink, PA.K.mint, -.03));
    anim(lt, 6.0, 780, 960, () => { PA.pill('Bukan beban', 780, 950, 52, PA.K.ink, PA.K.pink, .03); X.save(); X.strokeStyle = PA.K.red; X.lineWidth = 8; X.lineCap = 'round'; X.beginPath(); X.moveTo(640, 954); X.lineTo(925, 946); X.stroke(); X.restore(); });
    anim(lt, 1.4, 170, 1300, () => PA.chara(IMG.aPeluk, 170, mamiY, 360));
    anim(lt, 1.6, 410, 1300, () => PA.chara(IMG.bHati, 410, mamiY + bob(lt, 5), 440));
    anim(lt, 1.8, 680, 1300, () => PA.chara(IMG.mPeluk, 680, mamiY + bob(lt, 5, 2.2, 1), 420));
    anim(lt, 2.0, 910, 1300, () => PA.chara(IMG.lPeluk, 910, mamiY, 340, true));
  }, [.1, 1.0, 1.4, 1.6, 1.8, 2.0, 2.95, 5.1, 6.0]),
  // 14 dulu ragu kini tahu (red komik)
  Hh(76.87, 79.3, (lt) => {
    anim(lt, .1, 540, 330, () => RD.pow('DULU RAGU,', 540, 340, 140, RD.K.yel, 'center', -.04));
    anim(lt, .45, 540, 480, () => RD.pow('KINI TAHU!', 540, 500, 160, '#fff', 'center', .03));
    anim(lt, .9, 540, 560, () => RD.label('@taufik.pg', 540, 600, 54, RD.K.red, '#fff', .02));
  }, -1, WC.rd),
  // 15 CTA (maroon + Baba Jom)
  B(79.3, 83.55, 'ma2', WC.ma, (lt) => {
    anim(lt, .05, 540, 250, () => mHead('Dah Ready Nak Mula?', 540, 260, 84));
    anim(lt, .4, 540, 430, () => mPill(['Mula Simpan Emas', 'Hari Ini'], 540, 380, 100)); anim(lt, .4, 540, 430, () => MA.side(450));
    anim(lt, 1.0, 380, 1010, () => MA.photoCard(IMG.ipad, 380, 1010, 560, 380, -.03, .5, .45));
    anim(lt, 1.3, 800, 1300, () => PA.chara(IMG.baba, 800, mamiY - 20 + bob(lt, 6), 560));
    anim(lt, 2.2, 370, 1300, () => { shadow(() => { rr(50, 1270, 640, 120, 60); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Rujuk Pin Video', 370, 1350, MA.F.h(54), '#fff', 'center'); });
    MA.sparkle(160, 780, 28); MA.sparkle(930, 700, 24);
  }, [.05, .4, 1.0, 1.3, 2.2]),
];

function bakeAll() {
  bake('pa1', () => PA.bg('#FFF6E5', 1)); bake('pa2', () => PA.bg('#DDF3E8', 4)); bake('pa3', () => PA.bg('#FFE1E8', 8));
  bake('rd', () => RD.paper()); bake('ed', () => ED.paper()); bake('th', () => TH.bg('navy'));
  BGS.ma1 = MA.bgPhoto('kg', 16, .45); BGS.ma2 = MA.bgPhoto('shop', 16, .45);
}
