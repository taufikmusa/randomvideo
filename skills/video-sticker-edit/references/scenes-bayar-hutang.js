// scenes.js — "5 Langkah Penting Selepas Selesai Bayar Hutang" (91.9s). Mix: thumbnail, pastel, red, editorial, maroon. Watak utama: Baba kartun.
const DUR = 91.903991, HEADN = 2757;
const ASSETS = {
  wallet: 'dompet-wealthcard-safari.jpg', tiers: 'set-jongkong-bertingkat-bungamas.jpg', kg: 'jongkong-1kg-tapak-tangan.jpg', ipad: 'kad-dinar-dan-app-gap-ipad.jpg', shop: 'kad-taifook-depan-kedai-public-gold.jpg',
  bungamas: 'jongkong-100g-kad-bungamas-ungu.jpg', g250: 'jongkong-250g-merah.jpg',
  bAlham: 'baba-alhamdulillah-tanpa-teks.png', bFikir: 'baba-berfikir-polo.png', bSorak: 'baba-sorak-polo.png', bBuka: 'baba-tangan-terbuka.png', bJongkong: 'baba-jongkong-250g.png',
  bThumbs: 'baba-dua-thumbs-2.png', bKenyit: 'baba-kenyit-tunjuk.png', bTunjuk: 'baba-tunjuk-atas.png', baba: 'baba-semi-realistik-jom.png', bHati: 'baba-peluk-hati.png',
};
const SEG = [
  [0, 4.09, '*5 *Langkah *Penting selepas selesai bayar *hutang.'],
  [4.09, 11.55, 'Bayaran ansuran terakhir dah *langsai, rasa *lega macam terlepas satu beban berat dari bahu.'],
  [11.55, 15.62, 'Tapi fasa ini paling *bahaya jika anda tak berhati-hati.'],
  [15.62, 18.75, '*Pertama, jangan terus naikkan *gaya *hidup.'],
  [18.75, 22.74, 'Godaan untuk belanja duit yang tiba-tiba lebih memang *kuat,'],
  [22.74, 26.36, 'tapi ini *peluang untuk bina *kekayaan.'],
  [26.36, 32.0, '*Kedua, bina *dana *kecemasan 6 hingga 12 bulan pendapatan.'],
  [32.0, 34.2, 'Punca utama orang *berhutang'],
  [34.2, 37.81, 'adalah sebab tiada *simpanan bila kecemasan melanda.'],
  [37.81, 43.1, '*Ketiga, alihkan bayaran bulanan ke dalam bentuk *aset *fizikal.'],
  [43.1, 48.27, 'Duit yang dulu anda beri pada bank, sekarang masukkan ke dalam *emas'],
  [48.27, 50.17, 'untuk *diri *sendiri.'],
  [50.17, 53.8, '*Keempat, ingat *peritnya bayar faedah dahulu.'],
  [53.8, 57.18, 'Jadikan kepayahan dahulu sebagai *pembakar *semangat'],
  [57.18, 59.75, 'untuk tidak lagi *terjerumus ke dalam'],
  [59.75, 61.48, 'lubang hutang yang sama.'],
  [61.48, 64.34, '*Kelima, bayar *diri *sendiri dahulu.'],
  [64.34, 66.58, 'Dulu bank yang *kebas duit anda'],
  [66.58, 69.34, 'awal bulan. Kini *giliran anda untuk'],
  [69.34, 72.65, 'beli *emas, jadikan emas sebagai *simpanan.'],
  [72.65, 75.18, 'Bebas hutang bukanlah *garisan *penamat,'],
  [75.18, 78.92, 'ia adalah garis *permulaan membina *kekayaan sebenar.'],
  [78.92, 80.92, 'Kunci *kebebasan adalah'],
  [80.92, 84.11, 'jadikan *emas sebagai *aset *masa *depan.'],
  [84.11, 87.09, 'Tuan puan yang dah ready nak mulakan *simpan *emas,'],
  [87.09, 90.07, 'boleh rujuk *video saya. *Dulu *ragu, *kini *tahu.'],
  [90.07, 91.9, 'Jom mulakan *simpan *emas.'],
];
const fadeOut = (lt, t0) => { X.globalAlpha *= 1 - clamp((lt - t0) / .3); };
function bankIcon(cx, cy, s) {  // ikon bank ringkas (pastel)
  const K = PA.K; X.save(); X.translate(cx, cy); X.scale(s, s); X.lineWidth = 6; X.strokeStyle = K.ink; X.fillStyle = K.sky;
  X.beginPath(); X.moveTo(-70, -30); X.lineTo(0, -80); X.lineTo(70, -30); X.closePath(); X.fill(); X.stroke();
  for (let i = -1; i <= 1; i++) { rr(i * 42 - 13, -22, 26, 70, 6); X.fillStyle = K.white; X.fill(); X.stroke(); }
  rr(-78, 52, 156, 18, 6); X.fillStyle = K.sky; X.fill(); X.stroke(); X.restore();
}

const SCENES = [
  // 1 hook (thumbnail)
  Hh(0, 4.09, (lt) => {
    const out = clamp((lt - 3.6) / .3); X.save(); X.globalAlpha = 1 - out;
    anim(lt, .1, 540, 280, () => TH.head('5 LANGKAH PENTING', 540, 300, 120, '#fff', TH.C.ink, 'center'));
    anim(lt, .35, 540, 440, () => TH.brushHead('SELEPAS BAYAR HUTANG', 540, 450, 90, TH.C.y, TH.C.red, 5));
    anim(lt, .8, 540, 560, () => TH.pill('BEBAS HUTANG, SEKARANG APA?', 540, 510, TH.C.y, TH.C.ink, 28));
    X.restore();
  }, 1, WC.th),
  // 2 ansuran terakhir langsai (pastel)
  B(4.09, 11.55, 'pa1', WC.pa, (lt) => {
    anim(lt, .1, 540, 330, () => PA.title('Ansuran *Terakhir* Langsai!', 540, 320, 92, 980, 'center'));
    anim(lt, .8, 540, 700, () => { PA.card(150, 540, 780, 250, PA.K.white); X.beginPath(); X.arc(300, 665, 70, 0, 7); X.fillStyle = PA.K.green; X.fill(); X.strokeStyle = '#fff'; X.lineWidth = 16; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath(); X.moveTo(268, 668); X.lineTo(292, 695); X.lineTo(336, 636); X.stroke(); PA.txt('Hutang', 420, 640, PA.F.t(52), PA.K.brown); PA.txt('LUNAS', 420, 740, PA.F.t(100), PA.K.green); });
    anim(lt, 1.2, 380, 1300, () => PA.chara(IMG.bAlham, 380, mamiY + bob(lt, 6), 640));
    anim(lt, 3.8, 770, 1060, () => PA.bubble(['*Lega!', 'Beban terangkat'], 770, 1060, 440, 220, 560, 1130, 52));
    PA.sparkle(130, 920, 28); PA.sparkle(960, 1300, 24); anim(lt, 1.6, 900, 900, () => PA.heart(920, 920 + bob(lt, 10, 2.4), 40));
  }, [.1, .8, 1.2, 3.8, 1.6]),
  // 3 amaran + ch1 (red → pastel), satu footage
  Hh(11.55, 18.75, (lt) => {
    if (lt < 4.07) {
      X.save(); fadeOut(lt, 3.75);
      anim(lt, .05, 540, 270, () => RD.label('BERHATI-HATI!', 540, 270, 64));
      anim(lt, .25, 540, 430, () => RD.pow('FASA PALING BAHAYA', 540, 450, 104, RD.K.yel, 'center', -.03));
      X.restore();
    } else {
      const l = lt - 4.07;
      anim(l, .05, 540, 330, () => { PA.card(70, 190, 940, 330, PA.K.white); PA.pill('LANGKAH 1', 540, 150, 40, PA.K.ink, PA.K.butter, -.03); PA.title('Jangan Naik *Gaya Hidup*', 540, 370, 78, 900, 'center'); PA.txt('tahan godaan belanja', 540, 460, PA.F.b(42), PA.K.brown, 'center'); });
    }
  }, 1, WC.rd),
  // 4 godaan vs peluang (red komik)
  B(18.75, 26.36, 'rd', WC.rd, (lt) => {
    anim(lt, .05, 540, 230, () => RD.label('GODAAN BELANJA!', 540, 230, 64));
    anim(lt, .4, 330, 600, () => { fadeOut(lt, 3.7); RD.burst(330, 580, 250, 190, RD.K.red, 16, 4, true); RD.pow('KERETA?!', 330, 605, 90, RD.K.yel, 'center', -.06); });
    anim(lt, 1.3, 770, 700, () => { fadeOut(lt, 3.7); RD.burst(770, 720, 250, 190, RD.K.yel, 16, 7, true); RD.pow('GAJET?!', 770, 745, 90, RD.K.red, 'center', .05); });
    anim(lt, 3.9, 540, 640, () => { RD.burst(540, 640, 400, 250, RD.K.yel, 18, 11, true); RD.pow('PELUANG!', 540, 665, 140, RD.K.red, 'center', -.04); });
    anim(lt, 4.6, 540, 1000, () => RD.label('BINA KEKAYAAN', 540, 1010, 70, RD.K.red, '#fff', .03));
    anim(lt, 5.0, 700, 1180, () => RD.photoPanel(IMG.kg, 590, 1100, 380, 340, .5, .45, .04));
    anim(lt, .8, 240, 1300, () => { if (lt < 3.8) RD.img(IMG.bFikir, 240, mamiY + bob(lt, 5, 3), 540); else RD.img(IMG.bSorak, 240, mamiY + bob(lt, 5, 3), 540); });
    anim(lt, 2.0, 400, 1100, () => { fadeOut(lt, 3.7); RD.bubble(['TAHAN', 'DULU...'], 420, 1060, 300, 190, 300, 1180, 52); });
  }, [.05, .4, 1.3, .8, 2.0, 3.9, 4.6, 5.0]),
  // 5 ch2 maroon
  Hh(26.36, 32.0, (lt) => MA.chapter(lt, 2, 'Dana Kecemasan', null, '6 hingga 12 bulan pendapatan', 'LANGKAH'), -1, WC.ma),
  // 6 punca berhutang (editorial)
  B(32.0, 37.81, 'ed', WC.ed, (lt) => {
    anim(lt, .05, 300, 220, () => ED.txt('LANGKAH 2', 70, 200, ED.F.bodyB(40), ED.K.ink, 'left', 6));
    anim(lt, .1, 400, 520, () => ED.bigNum('6-12', 60, 540, 300));
    anim(lt, .6, 400, 680, () => ED.brushTitle('bulan pendapatan', 80, 690, 84, -.03, true, ED.K.ink, easeOut(clamp((lt - .8) / .6))));
    anim(lt, 2.2, 300, 860, () => ED.note(['punca utama', 'orang berhutang:'], 80, 850, 62, -.04, false));
    anim(lt, 3.3, 760, 900, () => ED.sticky(['tiada simpanan', 'bila kecemasan', 'melanda'], 560, 800, 420, -.05, 50));
    anim(lt, 4.3, 300, 1200, () => ED.photoBox(IMG.wallet, 60, 1030, 440, 380, 26, .5, .5, -.03));
    anim(lt, 4.6, 840, 1300, () => PA.chara(IMG.bTunjuk, 840, mamiY, 400));
  }, [.05, .1, .6, 2.2, 3.3, 4.3, 4.6]),
  // 7 ch3 thumbnail
  Hh(37.81, 43.1, (lt) => {
    anim(lt, .05, 540, 280, () => TH.pill('LANGKAH 3', 540, 230, TH.C.y, TH.C.ink, 32));
    anim(lt, .3, 540, 440, () => TH.brushHead('ALIH BAYARAN BULANAN', 540, 430, 92, '#fff', TH.C.red, 21));
    anim(lt, 1.0, 540, 540, () => TH.pill('KE ASET FIZIKAL', 540, 500, TH.C.y, TH.C.ink, 28));
  }, 1, WC.th),
  // 8 dulu bank, sekarang emas (maroon)
  B(43.1, 50.17, 'ma1', WC.ma, (lt) => {
    anim(lt, .05, 540, 270, () => mPill(['Bayaran Bulanan'], 540, 270, 92)); anim(lt, .05, 540, 270, () => MA.side(300));
    anim(lt, .3, 540, 560, () => mRow(60, 480, 960, 'Dulu', 'BANK'));
    anim(lt, 2.6, 540, 710, () => mRow(60, 630, 960, 'Sekarang', 'EMAS'));
    anim(lt, 5.1, 540, 860, () => mRow(60, 780, 960, 'Untuk', 'DIRI SENDIRI'));
    anim(lt, 3.4, 540, 1180, () => MA.photoCard(IMG.bungamas, 540, 1190, 620, 380, .02, .5, .45));
    MA.sparkle(120, 1000, 28); MA.sparkle(960, 1420, 24);
  }, [.05, .3, 2.6, 3.4, 5.1]),
  // 9 ch4 pastel
  Hh(50.17, 53.8, (lt) => {
    anim(lt, .05, 540, 330, () => { PA.card(70, 190, 940, 330, PA.K.white); PA.pill('LANGKAH 4', 540, 150, 40, PA.K.ink, PA.K.butter, -.03); PA.title('Ingat *Peritnya*', 540, 370, 96, 900, 'center'); PA.txt('bayar faedah dahulu', 540, 460, PA.F.b(42), PA.K.brown, 'center'); });
  }, -1, WC.pa),
  // 10 pembakar semangat (thumbnail)
  B(53.8, 61.48, 'th', WC.th, (lt) => {
    anim(lt, .1, 540, 300, () => TH.head('PEMBAKAR SEMANGAT', 540, 330, 120, TH.C.y, TH.C.ink, 'center'));
    anim(lt, .7, 540, 1130, () => TH.photo(IMG.tiers, 540, 1130, 440, -.04));
    anim(lt, 3.4, 540, 520, () => TH.brushHead('JANGAN TERJERUMUS', 540, 520, 90, '#fff', TH.C.red, 8));
    anim(lt, 5.9, 540, 700, () => TH.head('LUBANG HUTANG SAMA', 540, 690, 100, '#fff', TH.C.ink, 'center'));
    anim(lt, 6.3, 760, 1380, () => TH.stamp(['TAK ULANG', 'LUBANG YANG SAMA'], 700, 1400, .1, TH.C.y, 560, 210));
  }, [.1, .7, 3.4, 5.9, 6.3]),
  // 11 ch5 red
  Hh(61.48, 64.34, (lt) => {
    anim(lt, .05, 540, 270, () => RD.label('LANGKAH 5', 540, 270, 64));
    anim(lt, .25, 540, 420, () => RD.pow('BAYAR DIRI SENDIRI', 540, 440, 110, RD.K.yel, 'center', -.03));
  }, 1, WC.rd),
  // 12 dulu bank vs kini emas (pastel)
  B(64.34, 72.65, 'pa2', WC.pa, (lt) => {
    anim(lt, .05, 540, 250, () => PA.pill('Dulu vs Kini', 540, 250, 52, PA.K.ink, PA.K.butter, -.02));
    anim(lt, .3, 290, 620, () => { PA.card(60, 380, 450, 400, PA.K.white); PA.txt('DULU', 285, 460, PA.F.t(50), PA.K.brown, 'center'); bankIcon(285, 590, 1.2); PA.txt('Bank kebas duit awal bulan', 285, 735, PA.F.b(30), PA.K.ink, 'center'); });
    anim(lt, 2.4, 790, 620, () => { PA.card(570, 380, 450, 400, PA.K.white); PA.txt('KINI', 795, 460, PA.F.t(50), PA.K.red, 'center'); PA.goldBar(795, 590, 260, -.05); PA.txt('Giliran anda beli emas', 795, 735, PA.F.b(30), PA.K.ink, 'center'); });
    anim(lt, 3.8, 330, 1300, () => PA.chara(IMG.bJongkong, 330, mamiY + bob(lt, 6), 600));
    anim(lt, 5.2, 780, 1060, () => PA.bubble(['Jadikan emas', '*simpanan!'], 780, 1060, 440, 220, 560, 1180, 52));
    PA.sparkle(930, 1300, 26); PA.sparkle(120, 900, 22);
  }, [.05, .3, 2.4, 3.8, 5.2]),
  // 13 garisan penamat vs permulaan (editorial)
  B(72.65, 78.92, 'ed', WC.ed, (lt) => {
    anim(lt, .2, 300, 400, () => ED.note(['garisan', 'penamat'], 90, 360, 100, -.04, false));
    anim(lt, 1.2, 300, 420, () => { ED.swoosh(70, 400, 420, ED.K.red, 16, 4, easeOut(clamp((lt - 1.2) / .4))); ED.swoosh(70, 500, 450, ED.K.red, 16, 7, easeOut(clamp((lt - 1.4) / .4))); });
    anim(lt, 2.6, 400, 920, () => ED.bigNum('MULA!', 60, 920, 270));
    anim(lt, 4.0, 400, 1100, () => ED.brushTitle('kekayaan sebenar', 80, 1090, 78, -.03, true, ED.K.ink, easeOut(clamp((lt - 4.2) / .6))));
    anim(lt, 3.0, 840, 1300, () => PA.chara(IMG.bSorak, 850, mamiY + bob(lt, 6, 3), 440));
    ED.burst(560, 800, .9, .3);
  }, [.2, 1.2, 2.6, 3.0, 4.0]),
  // 14 kunci kebebasan (red komik)
  B(78.92, 84.11, 'rd', WC.rd, (lt) => {
    anim(lt, .05, 540, 230, () => RD.label('KUNCI KEBEBASAN', 540, 230, 66));
    anim(lt, 2.0, 540, 650, () => { RD.burst(540, 640, 430, 270, RD.K.red, 18, 3, true); RD.pow('EMAS', 540, 620, 150, RD.K.yel, 'center', -.04); RD.pow('ASET MASA DEPAN', 540, 740, 78, '#fff', 'center', -.04); });
    anim(lt, 3.0, 740, 1150, () => RD.photoPanel(IMG.g250, 560, 1010, 360, 340, .5, .5, .05));
    anim(lt, 3.3, 220, 1300, () => RD.img(IMG.bKenyit, 230, mamiY, 500));
  }, [.05, 2.0, 3.0, 3.3]),
  // 15 CTA (maroon + Baba Jom)
  B(84.11, 90.07, 'ma2', WC.ma, (lt) => {
    anim(lt, .05, 540, 250, () => mHead('Dah Ready Nak Mula?', 540, 260, 84));
    anim(lt, .5, 540, 430, () => mPill(['Mula Simpan Emas', 'Hari Ini'], 540, 380, 100)); anim(lt, .5, 540, 430, () => MA.side(450));
    anim(lt, 3.9, 540, 760, () => mHead('Dulu Ragu, Kini Tahu!', 540, 770, 80, MA.K.gold));
    anim(lt, 1.4, 380, 1010, () => MA.photoCard(IMG.ipad, 380, 1030, 560, 380, -.03, .5, .45));
    anim(lt, 1.8, 800, 1300, () => PA.chara(IMG.baba, 800, mamiY - 20 + bob(lt, 6), 560));
    anim(lt, 3.0, 370, 1300, () => { shadow(() => { rr(50, 1290, 640, 120, 60); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Rujuk Pin Video', 370, 1370, MA.F.h(54), '#fff', 'center'); });
    MA.sparkle(160, 820, 28); MA.sparkle(930, 700, 24);
  }, [.05, .5, 1.4, 1.8, 3.0, 3.9]),
  // 16 penutup (red komik)
  Hh(90.07, 91.9, (lt) => {
    anim(lt, .05, 540, 330, () => RD.pow('JOM MULAKAN', 540, 350, 130, RD.K.yel, 'center', -.04));
    anim(lt, .3, 540, 480, () => RD.pow('SIMPAN EMAS!', 540, 500, 130, '#fff', 'center', .03));
  }, -1, WC.rd),
];

function bakeAll() {
  bake('pa1', () => PA.bg('#FFF6E5', 1)); bake('pa2', () => PA.bg('#DDF3E8', 4)); bake('pa3', () => PA.bg('#FFE1E8', 8));
  bake('rd', () => RD.paper()); bake('ed', () => ED.paper()); bake('th', () => TH.bg('navy'));
  BGS.ma1 = MA.bgPhoto('kg', 16, .45); BGS.ma2 = MA.bgPhoto('shop', 16, .45);
}
