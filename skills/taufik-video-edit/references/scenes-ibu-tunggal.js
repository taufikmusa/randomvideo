// scenes.js — FAIL YANG DITULIS per video: DUR, HEADN (jumlah frame src/), ASSETS, SEG (kapsyen), SCENES, bakeAll().
const DUR = 97.7, HEADN = 2931;
const ASSETS = {
  wallet: 'dompet-wealthcard-safari.jpg', tiers: 'set-jongkong-bertingkat-bungamas.jpg', kg: 'jongkong-1kg-tapak-tangan.jpg', ipad: 'kad-dinar-dan-app-gap-ipad.jpg', shop: 'kad-taifook-depan-kedai-public-gold.jpg',
  merak5: 'kad-ungu-merak-5g.jpg', g250: 'jongkong-250g-merah.jpg', dinarPantai: 'kad-dinar-hijau-dua-pantai.jpg', syiling: 'kad-hijau-syiling-pantai.jpg', merak100: 'jongkong-merak-100g-dulang-merah.jpg', bunga50: 'kad-50g-bunga-raya.jpg', bungamas: 'jongkong-100g-kad-bungamas-ungu.jpg',
  mPeluk: 'mami-peluk-hati.png', mSemangat: 'mami-semangat.png', mJari: 'mami-jari-hati.png', mDoa: 'mami-doa-senyum.png', mOk: 'mami-ok.png', mTubuh: 'mami-peluk-tubuh-senyum.png',
  aPeluk: 'amani-peluk-hati.png', aJari: 'amani-jari-hati.png', aTabik: 'amani-tabik-senyum.png', aGembira: 'amani-tangan-atas-gembira.png',
  lPeluk: 'aileen-peluk-hati.png', lJari: 'aileen-jari-hati.png', lPeace: 'aileen-peace-jelir.png', lDepa: 'aileen-depa-tangan.png', lLambai: 'aileen-lambai-belang.png', baba: 'baba-semi-realistik-jom.png',
};

const SEG = [
  [0, 3.68, '*5 *Benteng *Kewangan *Ibu *Tunggal Wajib Bina'],
  [3.68, 8.1, 'Menjadi ibu tunggal bermakna memikul *dua *tugas serentak,'],
  [8.1, 10.61, 'mencari *nafkah dan menjaga *anak.'],
  [10.61, 14.53, 'Dalam keadaan ini, keselamatan kewangan adalah'],
  [14.53, 16.3, '*perlindungan *utama.'],
  [16.3, 18.8, '*Pertama, *tabung *kecemasan.'],
  [18.8, 20.74, '*Penjamin *ketenangan.'],
  [20.74, 23.57, 'Bila anda *satu-satunya punca *rezeki,'],
  [23.57, 28.35, 'simpanan kecemasan beri ruang *bernafas jika berlaku ujian.'],
  [28.35, 31.88, '*Kedua, *aset atas *nama *sendiri.'],
  [31.88, 36.11, 'Memiliki simpanan sendiri membina *maruah dan *keyakinan'],
  [36.11, 38.97, 'tanpa perlu *bergantung harap pada sesiapa.'],
  [38.97, 42.24, '*Ketiga, bina *masa *depan *anak'],
  [42.24, 46.04, 'secara konsisten. Simpan serendah *RM100 sebulan'],
  [46.04, 49.82, 'dalam bentuk *emas untuk jadi *dana *pendidikan anak'],
  [49.82, 51.75, 'bila mereka dewasa kelak.'],
  [51.75, 55.51, '*Keempat, urusan *fleksibel tanpa buang masa.'],
  [55.51, 61.27, 'Sistem simpanan di *Akaun *Emas *GAP *Public *Gold sangat mudah diurus dari *telefon sahaja'],
  [61.27, 64.07, 'tanpa mengganggu urusan harian.'],
  [64.07, 67.2, '*Kelima, *langkah *kecil membina'],
  [67.2, 70.29, '*benteng *kukuh. Tak perlu tunggu ada wang'],
  [70.29, 72.4, 'berkepuk untuk bermula.'],
  [72.4, 75.83, 'Setiap *gram emas yang kecil adalah *pelindung'],
  [75.83, 80.07, 'masa hadapan. Kekuatan seorang *ibu tiada tandingannya.'],
  [80.07, 84.04, '*Lindungi *masa *depan anak dengan tindakan bijak hari ini.'],
  [84.04, 88.92, 'Bina *benteng keselamatan simpanan dengan *simpan *emas.'],
  [88.92, 93.47, 'Tuan puan yang dah ready nak mulakan simpan emas, boleh rujuk *pin *video saya.'],
  [93.47, 95.33, '*Dulu *ragu, *kini *tahu.'],
  [95.33, 97.7, 'Jom mulakan *simpan *emas.'],
];
const SCENES = [
  // 1 — hook (thumbnail)
  Hh(0, 3.68, (lt) => {
    const out = clamp((lt - 3.2) / .3); X.save(); X.globalAlpha = 1 - out;
    anim(lt, .1, 540, 280, () => TH.head('5 BENTENG KEWANGAN', 540, 300, 112, '#fff', TH.C.ink, 'center'));
    anim(lt, .35, 540, 440, () => TH.brushHead('IBU TUNGGAL', 540, 460, 170, TH.C.y, TH.C.red, 5));
    anim(lt, .8, 540, 560, () => TH.pill('WAJIB BINA', 540, 520, TH.C.y, TH.C.ink, 30));
    X.restore();
  }, 1, WC.th),
  // 2 — dua tugas serentak (pastel)
  B(3.68, 10.61, 'pa1', WC.pa, (lt) => {
    anim(lt, .1, 540, 250, () => PA.pill('Dua tugas serentak', 540, 250, 52, PA.K.ink, PA.K.butter, -.02));
    anim(lt, .3, 540, 420, () => PA.title('Ibu tunggal pikul *dua tugas*', 540, 400, 88, 980, 'center'));
    anim(lt, 4.3, 300, 760, () => { PA.card(70, 600, 450, 330, PA.K.white); PA.coin(300, 720, 60); PA.coin(350, 750, 50); PA.txt('Cari nafkah', 295, 860, PA.F.t(50), PA.K.ink, 'center'); });
    anim(lt, 5.5, 780, 760, () => { PA.card(560, 600, 450, 330, PA.K.white); PA.heart(785, 735, 70); PA.txt('Jaga anak', 785, 860, PA.F.t(50), PA.K.ink, 'center'); });
    anim(lt, .7, 540, 1300, () => { PA.chara(IMG.aJari, 190, mamiY, 400); PA.chara(IMG.lJari, 890, mamiY, 380, true); });
    anim(lt, .5, 540, 1300, () => PA.chara(IMG.mTubuh, 540, mamiY + bob(lt, 6), 640));
    PA.sparkle(120, 1020, 26); PA.sparkle(960, 1030, 22);
  }, [.1, .3, .5, .7, 4.3, 5.5]),
  // 3 — perlindungan utama (thumbnail overlay on head)
  Hh(10.61, 16.3, (lt) => {
    anim(lt, .05, 540, 280, () => TH.pill('KESELAMATAN KEWANGAN', 540, 230, TH.C.y, TH.C.ink, 30));
    anim(lt, .35, 540, 420, () => TH.brushHead('PERLINDUNGAN UTAMA', 540, 420, 104, '#fff', TH.C.red, 11));
  }, -1, WC.th),
  // 4 — ch1 pastel
  Hh(16.3, 20.74, (lt) => {
    anim(lt, .05, 540, 330, () => { PA.card(70, 190, 940, 330, PA.K.white); PA.pill('BENTENG 1', 540, 150, 40, PA.K.ink, PA.K.butter, -.03); PA.title('Tabung *Kecemasan*', 540, 370, 84, 900, 'center'); PA.txt('penjamin ketenangan', 540, 460, PA.F.b(42), PA.K.brown, 'center'); });
  }, 1, WC.pa),
  // 5 — tabung kecemasan (pastel mint)
  B(20.74, 28.35, 'pa2', WC.pa, (lt) => {
    anim(lt, .1, 540, 330, () => PA.title('Satu-satunya *Punca Rezeki*', 540, 330, 98, 940, 'center'));
    anim(lt, 2.8, 540, 760, () => { PA.card(90, 600, 900, 300, PA.K.white); PA.txt('Tabung Kecemasan', 540, 700, PA.F.t(62), PA.K.ink, 'center'); PA.coin(330, 810, 44); PA.coin(410, 810, 44); PA.coin(490, 810, 44); PA.goldBar(690, 810, 190, -.05); });
    anim(lt, .6, 300, 1300, () => PA.chara(IMG.mPeluk, 300, mamiY + bob(lt, 6), 600));
    anim(lt, 3.9, 730, 1150, () => PA.bubble(['*Ruang bernafas', 'bila diuji'], 730, 1120, 480, 220, 480, 1230, 50));
    anim(lt, 1.0, 900, 1300, () => PA.heart(930, 1010 + bob(lt, 10, 2.5), 50)); PA.sparkle(880, 1330, 26);
  }, [.1, .6, 2.8, 3.9]),
  // 6 — ch2 red comic
  Hh(28.35, 31.88, (lt) => {
    anim(lt, .05, 540, 270, () => RD.label('BENTENG 2', 540, 270, 64));
    anim(lt, .25, 540, 420, () => RD.pow('ASET NAMA SENDIRI', 540, 440, 118, RD.K.yel, 'center', -.03));
  }, -1, WC.rd),
  // 7 — maruah & keyakinan (red comic)
  B(31.88, 38.97, 'rd', WC.rd, (lt) => {
    anim(lt, .05, 540, 230, () => RD.label('ASET NAMA SENDIRI', 540, 230, 66, RD.K.yel, RD.K.ink, -.04));
    anim(lt, .5, 340, 620, () => { RD.burst(300, 500, 240, 180, RD.K.red, 16, 4, true); RD.pow('MARUAH!', 300, 525, 100, RD.K.yel, 'center', -.06); });
    anim(lt, 2.3, 760, 760, () => { RD.burst(770, 700, 250, 200, RD.K.yel, 18, 7, true); RD.pow('YAKIN!', 770, 725, 110, RD.K.red, 'center', .05); });
    anim(lt, 3.8, 540, 1000, () => RD.photoPanel(IMG.merak5, 690, 1090, 320, 350, .5, .5, .05));
    anim(lt, .8, 300, 1300, () => RD.img(IMG.mSemangat, 300, mamiY + bob(lt, 6, 3), 600));
    anim(lt, 4.6, 540, 1100, () => RD.bubble(['TAK PERLU', 'BERGANTUNG!'], 640, 960, 440, 190, 450, 1040, 54, { 1: RD.K.red }));
    RD.ticks(420, 1000, 70);
  }, [.05, .5, .8, 2.3, 3.8, 4.6]),
  // 8 — ch3 editorial
  Hh(38.97, 42.24, (lt) => {
    anim(lt, .05, 300, 360, () => ED.bigNum('3', 70, 470, 330, true));
    anim(lt, .3, 700, 400, () => { ED.txt('BENTENG', 390, 310, ED.F.bodyB(44), '#fff', 'left', 6); ED.brushTitle('Masa Depan Anak', 390, 410, 62, -.03, false, '#fff'); });
    anim(lt, .8, 700, 450, () => ED.swoosh(390, 440, 900, ED.K.red, 10, 3));
  }, 1, WC.ed),
  // 9 — RM100 sebulan (editorial)
  B(42.24, 51.75, 'ed', WC.ed, (lt) => {
    anim(lt, .05, 540, 240, () => ED.txt('BENTENG 3', 70, 200, ED.F.bodyB(40), ED.K.ink, 'left', 6));
    anim(lt, 1.2, 400, 420, () => ED.bigNum('RM100', 60, 470, 250));
    anim(lt, 1.7, 400, 620, () => ED.brushTitle('sebulan', 80, 650, 120, -.03, true, ED.K.ink, easeOut(clamp((lt - 1.9) / .6))));
    anim(lt, 3.8, 320, 900, () => ED.photoBox(IMG.dinarPantai, 60, 740, 500, 400, 26, .5, .55, -.03));
    anim(lt, 3.9, 800, 820, () => { ED.note(['dalam bentuk', 'emas!'], 620, 820, 66, -.06); ED.arrow(760, 930, 580, 960, 40, ED.K.red, 6); });
    anim(lt, 6.0, 800, 1010, () => ED.sticky(['dana', 'pendidikan', 'anak'], 640, 1020, 340, -.05, 58));
    anim(lt, 7.4, 540, 1300, () => { PA.chara(IMG.aGembira, 250, mamiY, 400); PA.chara(IMG.lDepa, 520, mamiY, 330); });
    ED.burst(580, 1000, .8, .4);
  }, [.05, 1.2, 1.7, 3.8, 3.9, 6.0, 7.4]),
  // 10 — ch4 maroon
  Hh(51.75, 55.51, (lt) => MA.chapter(lt, 4, 'Urusan Fleksibel', 'Tanpa Buang Masa'), 1, WC.ma),
  // 11 — GAP dari telefon (maroon)
  B(55.51, 64.07, 'ma1', WC.ma, (lt) => {
    anim(lt, .05, 540, 270, () => mPill(['Akaun Emas GAP'], 540, 270, 92)); anim(lt, .05, 540, 270, () => MA.side(300));
    anim(lt, .5, 540, 420, () => mSub('Public Gold', 540, 440, 900, 46, MA.K.gold));
    anim(lt, .9, 540, 880, () => MA.photoCard(IMG.ipad, 540, 880, 640, 450, -.02, .5, .45));
    anim(lt, 3.8, 540, 1230, () => mRow(60, 1180, 960, 'Diurus dari', 'TELEFON SAHAJA'));
    anim(lt, 5.8, 540, 1360, () => mRow(60, 1320, 960, 'Tanpa ganggu', 'URUSAN HARIAN'));
    MA.sparkle(130, 700, 28); MA.sparkle(950, 1120, 24);
  }, [.05, .5, .9, 3.8, 5.8]),
  // 12 — ch5 thumbnail
  Hh(64.07, 67.2, (lt) => {
    anim(lt, .05, 540, 280, () => TH.pill('BENTENG 5', 540, 230, TH.C.y, TH.C.ink, 32));
    anim(lt, .3, 540, 440, () => TH.brushHead('LANGKAH KECIL', 540, 430, 130, '#fff', TH.C.red, 21));
  }, -1, WC.th),
  // 13 — benteng kukuh (thumbnail)
  B(67.2, 75.83, 'th', WC.th, (lt) => {
    anim(lt, .1, 540, 300, () => TH.head('BENTENG KUKUH', 540, 330, 170, TH.C.y, TH.C.ink, 'center'));
    anim(lt, 3.0, 540, 480, () => TH.brushHead('TAK PERLU TUNGGU', 540, 520, 84, '#fff', TH.C.red, 8));
    anim(lt, 3.3, 540, 640, () => TH.head('WANG BERKEPUK', 540, 650, 126, '#fff', TH.C.ink, 'center'));
    anim(lt, 4.4, 540, 1050, () => TH.photo(IMG.tiers, 540, 1100, 470, -.04));
    anim(lt, 5.4, 760, 1330, () => TH.stamp(['PELINDUNG', 'SETIAP GRAM KECIL'], 700, 1400, .1, TH.C.y, 560, 210));
  }, [.1, 3.0, 3.3, 4.4, 5.4]),
  // 14 — kekuatan ibu (pastel pink)
  B(75.83, 84.04, 'pa3', WC.pa, (lt) => {
    anim(lt, .1, 540, 280, () => PA.title('Kekuatan Seorang *Ibu*', 540, 300, 84, 980, 'center'));
    anim(lt, 2.0, 540, 420, () => PA.pill('tiada tandingannya', 540, 440, 50, PA.K.ink, PA.K.butter, -.02));
    anim(lt, .6, 540, 1300, () => PA.chara(IMG.mPeluk, 540, mamiY + bob(lt, 6), 700));
    anim(lt, .9, 190, 1300, () => PA.chara(IMG.aPeluk, 190, mamiY, 440));
    anim(lt, 1.1, 890, 1300, () => PA.chara(IMG.lPeluk, 890, mamiY, 420, true));
    anim(lt, 4.3, 540, 860, () => PA.bubble(['*Lindungi masa depan', 'anak, hari ini!'], 540, 760, 760, 220, 540, 880, 54));
    [[120, 700], [960, 640], [220, 560], [880, 1000]].forEach(([x, y], i) => anim(lt, .8 + i * .2, x, y, () => PA.heart(x, y + bob(lt, 10, 2.4, i), 34 + i * 6, i % 2 ? '#F28BA8' : PA.K.red)));
  }, [.1, .6, .9, 1.1, 2.0, 4.3]),
  // 15 — bina benteng (maroon overlay)
  Hh(84.04, 88.92, (lt) => { anim(lt, .1, 540, 380, () => mPill(['Bina Benteng', 'Keselamatan Simpanan'], 540, 330, 82)); anim(lt, .1, 540, 380, () => MA.side(400)); }, 1, WC.ma),
  // 16 — CTA (maroon + Baba kartun)
  B(88.92, 93.47, 'ma2', WC.ma, (lt) => {
    anim(lt, .05, 540, 250, () => mHead('Dah Ready Nak Mula?', 540, 260, 84));
    anim(lt, .5, 540, 430, () => mPill(['Simpan Emas', 'di Public Gold'], 540, 380, 104)); anim(lt, .5, 540, 430, () => MA.side(450));
    anim(lt, 1.4, 380, 960, () => MA.photoCard(IMG.ipad, 380, 960, 560, 400, -.03, .5, .45));
    anim(lt, 1.8, 860, 1300, () => PA.chara(IMG.baba, 800, mamiY - 20 + bob(lt, 6), 560));
    anim(lt, 3.0, 370, 1300, () => { shadow(() => { rr(50, 1250, 640, 120, 60); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Rujuk Pin Video', 370, 1330, MA.F.h(54), '#fff', 'center'); });
    MA.sparkle(160, 780, 28); MA.sparkle(930, 700, 24);
  }, [.05, .5, 1.4, 1.8, 3.0]),
  // 17 — penutup (red comic overlay)
  Hh(93.47, 97.7, (lt) => {
    anim(lt, .1, 540, 330, () => RD.pow('DULU RAGU,', 540, 340, 140, RD.K.yel, 'center', -.04));
    anim(lt, .45, 540, 480, () => RD.pow('KINI TAHU!', 540, 500, 160, '#fff', 'center', .03));
    anim(lt, .9, 540, 560, () => RD.label('@taufik.pg', 540, 600, 54, RD.K.red, '#fff', .02));
  }, -1, WC.rd),
];

function bakeAll() {
  bake('pa1', () => PA.bg('#FFF6E5', 1)); bake('pa2', () => PA.bg('#DDF3E8', 4)); bake('pa3', () => PA.bg('#FFE1E8', 8));
  bake('rd', () => RD.paper()); bake('ed', () => ED.paper()); bake('th', () => TH.bg('navy'));
  BGS.ma1 = MA.bgPhoto('ipad', 16, .45); BGS.ma2 = MA.bgPhoto('shop', 16, .45);
}
