// scenes.js — "5 Keputusan Kewangan Wajib Tahun Pertama Kahwin" (83s). Mix gaya: thumbnail, pastel, red, editorial, maroon.
const DUR = 83.033991, HEADN = 2491;
const ASSETS = {
  wallet: 'dompet-wealthcard-safari.jpg', tiers: 'set-jongkong-bertingkat-bungamas.jpg', kg: 'jongkong-1kg-tapak-tangan.jpg', ipad: 'kad-dinar-dan-app-gap-ipad.jpg', shop: 'kad-taifook-depan-kedai-public-gold.jpg',
  dinarPantai: 'kad-dinar-hijau-dua-pantai.jpg', binder: 'koleksi-binder-kad.jpg',
  mPeluk: 'mami-peluk-hati.png', mJari: 'mami-jari-hati.png', mSemangat: 'mami-semangat.png', mOk: 'mami-ok.png',
  bPeluk: 'baba-peluk-hati.png', bTubuh: 'baba-peluk-tubuh-senyum.png', bBuka: 'baba-tangan-terbuka.png', baba: 'baba-semi-realistik-jom.png',
  aPeluk: 'amani-peluk-hati.png', aGembira: 'amani-tangan-atas-gembira.png', lPeluk: 'aileen-peluk-hati.png', lDepa: 'aileen-depa-tangan.png',
};
Object.assign(ASSETS, { sHook: 'stk-hook.png', sTahun: 'stk-tahun-pertama.png', sSimpanan: 'stk-simpanan-kecemasan.png', sBincang: 'stk-bincang-telus.png', sPendidikan: 'stk-pendidikan-anak.png', sInflasi: 'stk-kawal-inflasi.png', sEmas: 'stk-emas-bersama.png', sMasa: 'stk-masa-depan-stabil.png', sKukuh: 'stk-kukuhkan.png' });
const SEG = [
  [0, 3.87, '*5 *Keputusan *Kewangan Wajib Tahun Pertama Kahwin'],
  [3.87, 6.32, 'Tahun pertama kahwin penuh *kemanisan,'],
  [6.32, 12.96, 'tapi *silap urus duit tahun tersebut, kesannya boleh *menghantui rumah tangga bertahun-tahun.'],
  [12.96, 18.49, '*Pertama, bina *simpanan *kecemasan sebelum tambah hutang besar.'],
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

const SCENES = [
  // 1 hook (thumbnail)
  Hh(0, 3.87, (lt) => {
    const out = clamp((lt - 3.4) / .3); X.save(); X.globalAlpha = 1 - out;
    hookTitle(lt, { tag: 'WAJIB TAHU', lines: ['5 KEPUTUSAN', 'KEWANGAN'], sub: 'TAHUN PERTAMA KAHWIN' });


    X.restore();
  }, 1, WC.th),
  // 2 penuh kemanisan (pastel)
  B(3.87, 6.32, 'pa1', WC.pa, (lt) => {
    anim(lt, .05, 540, 300, () => PA.title('Penuh *Kemanisan*', 540, 320, 108, 980, 'center'));
    anim(lt, .2, 540, 1300, () => PA.chara(IMG.sHook, 540, mamiY + bob(lt, 7), 760));

    [[130, 800], [940, 760], [540, 880]].forEach(([x, y], i) => anim(lt, .3 + i * .15, x, y, () => PA.heart(x, y + bob(lt, 10, 2.4, i), 34 + i * 8)));
    PA.sparkle(160, 1000, 28); PA.sparkle(930, 1060, 24);
  }, [.05, .2, .35]),
  // 3 silap urus duit (red komik)
  B(6.32, 12.96, 'rd', WC.rd, (lt) => {
    anim(lt, .05, 540, 230, () => RD.label('TAPI...', 540, 230, 64));
    anim(lt, .3, 540, 560, () => { RD.burst(540, 520, 400, 220, RD.K.red, 18, 3, true); RD.pow('SILAP URUS', 540, 505, 112, RD.K.yel, 'center', -.04); RD.pow('DUIT!', 540, 625, 112, '#fff', 'center', -.04); });
    anim(lt, 2.6, 540, 1000, () => { RD.burst(540, 820, 330, 150, RD.K.yel, 16, 9, true); RD.pow('MENGHANTUI', 540, 832, 96, RD.K.red, 'center', .04); });

    anim(lt, 3.4, 540, 1300, () => RD.img(IMG.sTahun, 540, mamiY, 552));

    anim(lt, 4.2, 540, 1400, () => RD.bubble(['ALAMAK!'], 850, 1200, 260, 120, 700, 1290, 56));
  }, [.05, .3, 2.6, 3.4, 3.6, 4.2, 4.8]),
  // 4 ch1 pastel
  Hh(12.96, 18.49, (lt) => {
    anim(lt, .05, 540, 330, () => { PA.card(70, 190, 940, 330, PA.K.white); PA.pill('KEPUTUSAN 1', 540, 150, 40, PA.K.ink, PA.K.butter, -.03); PA.title('Simpanan *Kecemasan*', 540, 370, 80, 900, 'center'); PA.txt('sebelum tambah hutang besar', 540, 460, PA.F.b(42), PA.K.brown, 'center'); });
  }, -1, WC.pa),
  // 5 perabot & kereta (editorial)
  B(18.49, 24.31, 'ed', WC.ed, (lt) => {
    anim(lt, .05, 300, 220, () => ED.txt('KEPUTUSAN 1', 70, 200, ED.F.bodyB(40), ED.K.ink, 'left', 6));
    anim(lt, .15, 540, 400, () => ED.brushTitle('Jangan terburu-buru', 70, 400, 86, -.02, true, ED.K.ink, easeOut(clamp((lt - .5) / .6))));
    anim(lt, 1.5, 300, 640, () => { ED.note(['Perabot', 'mewah'], 90, 640, 96, -.04, false); });
    anim(lt, 2.4, 300, 640, () => ED.swoosh(70, 700, 480, ED.K.red, 14, 4, easeOut(clamp((lt - 2.4) / .4))));
    anim(lt, 3.0, 800, 640, () => { ED.note(['Kereta', 'baru'], 590, 640, 96, .03, false); });
    anim(lt, 3.9, 800, 640, () => ED.swoosh(570, 700, 960, ED.K.red, 14, 6, easeOut(clamp((lt - 3.9) / .4))));
    anim(lt, 4.4, 800, 1000, () => ED.sticky(['tabung', 'kecemasan', 'dulu!'], 620, 960, 360, -.05, 62));
    anim(lt, 5.0, 300, 1100, () => PA.chara(IMG.sSimpanan, 300, mamiY, 644));
  }, [.05, .15, 1.5, 2.4, 3.0, 3.9, 4.4, 5.0]),
  // 6 ch2 red
  Hh(24.31, 27.54, (lt) => {
    anim(lt, .05, 540, 270, () => RD.label('KEPUTUSAN 2', 540, 270, 64));
    anim(lt, .25, 540, 420, () => RD.pow('BINCANG TELUS', 540, 440, 124, RD.K.yel, 'center', -.03));
  }, 1, WC.rd),
  // 7 gaduh vs tenang (maroon)
  B(27.54, 35.28, 'ma1', WC.ma, (lt) => {
    anim(lt, .05, 540, 270, () => mPill(['Suami & Isteri'], 540, 270, 92)); anim(lt, .05, 540, 270, () => MA.side(300));
    anim(lt, .35, 290, 800, () => MA.tierCard(50, 480, 480, 560, 'TEKANAN', 'GADUH', 'punca utama pergaduhan suami & isteri'));
    anim(lt, 4.3, 790, 800, () => MA.tierCard(550, 480, 480, 560, 'MATLAMAT', 'TENANG', 'bersama, hati lebih tenang'));
    anim(lt, 6.0, 540, 1300, () => PA.chara(IMG.sBincang, 540, mamiY, 483));
  }, [.05, .35, 4.3, 6.0]),
  // 8 ch3 editorial
  Hh(35.28, 39.21, (lt) => {
    anim(lt, .05, 300, 360, () => ED.bigNum('3', 70, 470, 330, true));
    anim(lt, .3, 700, 400, () => { ED.txt('KEPUTUSAN', 390, 310, ED.F.bodyB(44), '#fff', 'left', 6); ED.brushTitle('Tabung Pendidikan', 390, 410, 60, -.03, false, '#fff'); });
    anim(lt, .8, 700, 450, () => ED.swoosh(390, 440, 940, ED.K.red, 10, 3));
  }, -1, WC.ed),
  // 9 RM100 vs puluhan ribu (pastel + anak)
  B(39.21, 47.36, 'pa2', WC.pa, (lt) => {
    anim(lt, .05, 540, 250, () => PA.pill('Dana pendidikan anak', 540, 250, 52, PA.K.ink, PA.K.butter, -.02));
    anim(lt, .35, 290, 640, () => { PA.card(60, 420, 450, 360, PA.K.white); PA.txt('HARI INI', 285, 500, PA.F.t(46), PA.K.brown, 'center'); PA.txt('RM100', 285, 625, PA.F.t(100), PA.K.red, 'center'); PA.txt('sebulan, jauh lebih mudah', 285, 710, PA.F.b(34), PA.K.ink, 'center'); });
    anim(lt, 4.2, 790, 640, () => { PA.card(570, 420, 450, 360, PA.K.white); PA.txt('UNIVERSITI', 795, 500, PA.F.t(46), PA.K.brown, 'center'); PA.txt('PULUHAN', 795, 600, PA.F.t(70), PA.K.red, 'center'); PA.txt('RIBU', 795, 680, PA.F.t(70), PA.K.red, 'center'); PA.txt('waktu anak nak masuk', 795, 745, PA.F.b(32), PA.K.ink, 'center'); });
    anim(lt, 3.6, 540, 420, () => PA.coin(540, 430, 46, 'vs'));
    anim(lt, .8, 540, 1300, () => PA.chara(IMG.sPendidikan, 540, mamiY + bob(lt, 7), 640));


    PA.sparkle(540, 1200, 26);
  }, [.05, .35, .8, 1.0, 3.6, 4.2, 6.2]),
  // 10 ch4 thumbnail
  Hh(47.36, 51.82, (lt) => {
    anim(lt, .05, 540, 280, () => TH.pill('KEPUTUSAN 4', 540, 230, TH.C.y, TH.C.ink, 32));
    anim(lt, .3, 540, 440, () => TH.brushHead('KUNCI NILAI SIMPANAN', 540, 430, 100, '#fff', TH.C.red, 21));
  }, 1, WC.th),
  // 11 duit tunai susut (red komik)
  B(51.82, 56.32, 'rd', WC.rd, (lt) => {
    anim(lt, .05, 540, 230, () => RD.label('DUIT TUNAI DIAM', 540, 230, 64));
    anim(lt, .3, 540, 600, () => { RD.panel(80, 330, 920, 520, '#fff', -.01); RD.txt('NILAI DUIT TUNAI', 130, 410, RD.F.bang(52), RD.K.ink); });
    const p = easeOut(clamp((lt - 1) / 2)); if (p > 0) {
      X.save(); X.strokeStyle = RD.K.red; X.lineWidth = 16; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath();
      const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([150 + u * 700, 460 + 300 * (u * u * .55 + u * .45)]); }
      const n = Math.floor(p * 40); pts.slice(0, n + 1).forEach(([x, y], i) => i ? X.lineTo(x, y) : X.moveTo(x, y)); X.stroke();
      const [ex, ey] = pts[n]; X.beginPath(); X.arc(ex, ey, 22, 0, 7); X.fillStyle = RD.K.yel; X.fill(); X.lineWidth = 7; X.strokeStyle = RD.K.ink; X.stroke(); X.restore();
    }
    anim(lt, 3.0, 760, 1050, () => { RD.burst(760, 1030, 230, 150, RD.K.red, 14, 5, true); RD.pow('SUSUT!', 760, 1055, 100, RD.K.yel, 'center', .05); });
    anim(lt, .9, 240, 1300, () => RD.img(IMG.sInflasi, 250, mamiY, 667));

  }, [.05, .3, .9, 1.6, 3.0]),
  // 12 ch5 maroon
  Hh(56.32, 59.97, (lt) => MA.chapter(lt, 5, 'Simpan Emas', 'Rapatkan Hubungan', null, 'KEPUTUSAN'), -1, WC.ma),
  // 13 menabung bersama (pastel Baba + Mami)
  B(59.97, 66.17, 'pa3', WC.pa, (lt) => {
    anim(lt, .05, 540, 300, () => PA.title('Menabung *Bersama*', 540, 300, 100, 980, 'center'));
    anim(lt, .6, 540, 520, () => PA.pill('Setiap bulan', 540, 470, 56, PA.K.ink, PA.K.butter, -.02));
    anim(lt, 2.4, 540, 640, () => PA.pill('Bina disiplin', 540, 620, 56, PA.K.ink, PA.K.mint, .02));
    anim(lt, 3.9, 540, 770, () => PA.pill('Persefahaman', 540, 770, 56, PA.K.ink, PA.K.lilac, -.02));
    anim(lt, 1.0, 540, 1300, () => PA.chara(IMG.sEmas, 540, mamiY + bob(lt, 7), 700));

    [[130, 1000], [950, 960]].forEach(([x, y], i) => anim(lt, 1.4 + i * .2, x, y, () => PA.heart(x, y + bob(lt, 10, 2.4, i), 40 + i * 8)));
  }, [.05, .6, 1.0, 1.2, 2.4, 3.9]),
  // 14 bukan sekadar cinta (thumbnail)
  B(66.17, 71.93, 'th', WC.th, (lt) => {
    anim(lt, .1, 540, 300, () => TH.head('BUKAN SEKADAR', 540, 330, 130, '#fff', TH.C.ink, 'center'));
    anim(lt, .45, 540, 500, () => TH.brushHead('CINTA', 540, 540, 200, TH.C.y, TH.C.red, 5));
    anim(lt, 2.6, 540, 780, () => TH.head('MASA DEPAN', 540, 780, 150, TH.C.y, TH.C.ink, 'center'));
    anim(lt, 3.0, 540, 930, () => TH.brushHead('YANG STABIL', 540, 930, 110, '#fff', TH.C.red, 8));
    anim(lt, 3.8, 540, 1230, () => PA.chara(IMG.sMasa, 540, 1490, 598));
  }, [.1, .45, 2.6, 3.0, 3.8]),
  // 15 kukuhkan (maroon overlay)
  Hh(71.93, 74.21, (lt) => { anim(lt, .05, 540, 360, () => mPill(['Kukuhkan Kewangan', 'Bersama'], 540, 330, 82)); anim(lt, .05, 540, 360, () => MA.side(390)); }, 1, WC.ma),
  // 16 CTA (maroon + Baba kartun)
  B(74.21, 79.67, 'ma2', WC.ma, (lt) => {
    anim(lt, .05, 540, 250, () => mHead('Dah Ready Nak Mula?', 540, 260, 84));
    anim(lt, .5, 540, 430, () => mPill(['Simpan Emas', 'di Public Gold'], 540, 380, 104)); anim(lt, .5, 540, 430, () => MA.side(450));
    anim(lt, 1.4, 380, 960, () => MA.photoCard(IMG.ipad, 380, 960, 560, 400, -.03, .5, .45));
    anim(lt, 1.8, 860, 1300, () => PA.chara(IMG.sKukuh, 800, mamiY - 20 + bob(lt, 7), 600));
    anim(lt, 3.0, 370, 1300, () => { shadow(() => { rr(50, 1250, 640, 120, 60); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Rujuk Pin Video', 370, 1330, MA.F.h(54), '#fff', 'center'); });
    MA.sparkle(160, 780, 28); MA.sparkle(930, 700, 24);
  }, [.05, .5, 1.4, 1.8, 3.0]),
  // 17 penutup (red komik)
  Hh(79.67, 83.04, (lt) => {
    anim(lt, .1, 540, 330, () => RD.pow('DULU RAGU,', 540, 340, 140, RD.K.yel, 'center', -.04));
    anim(lt, .45, 540, 480, () => RD.pow('KINI TAHU!', 540, 500, 160, '#fff', 'center', .03));
    anim(lt, .9, 540, 560, () => RD.label('@taufik.pg', 540, 600, 54, RD.K.red, '#fff', .02));
  }, -1, WC.rd),
];

function bakeAll() {
  bake('pa1', () => PA.bg('#FFF6E5', 1)); bake('pa2', () => PA.bg('#DDF3E8', 4)); bake('pa3', () => PA.bg('#FFE1E8', 8));
  bake('rd', () => RD.paper()); bake('ed', () => ED.paper()); bake('th', () => TH.bg('navy'));
  BGS.ma1 = MA.bgPhoto('tiers', 16, .45); BGS.ma2 = MA.bgPhoto('shop', 16, .45);
}
