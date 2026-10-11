// scenes.js — "5 Kesilapan Bila Tiba-tiba Dapat Duit Terpijak" (88.1s). Mix gaya + sticker Taufik (duit-terpijak) + transisi kertas terkoyak + SFX lembut.
const DUR = 88.142993, HEADN = 2644;
const ASSETS = {
  wallet: 'dompet-wealthcard-safari.jpg', tiers: 'set-jongkong-bertingkat-bungamas.jpg', kg: 'jongkong-1kg-tapak-tangan.jpg', ipad: 'kad-dinar-dan-app-gap-ipad.jpg', shop: 'kad-taifook-depan-kedai-public-gold.jpg',
  bungamas: 'jongkong-100g-kad-bungamas-ungu.jpg', merak5: 'kad-ungu-merak-5g.jpg', g250: 'jongkong-250g-merah.jpg',
  sHook: 'stk-hook.png', sBelanja: 'stk-belanja-emosi.png', sSkim: 'stk-skim-cepat-kaya.png', sTunai: 'stk-duit-tunai-terbiar.png', sLebur: 'stk-pelaburan-lebur.png',
  sLupa: 'stk-lupa-masa-depan.png', sBijak: 'stk-urus-bijak.png', sAset: 'stk-tukar-aset.png', sKunci: 'stk-kunci-kebebasan.png',
};
const SEG = [
  [0, 4.46, '*5 *Kesilapan bila tiba-tiba dapat duit *terpijak'],
  [4.46, 9.59, 'Dapat *bonus besar, *pampasan, duit peninggalan ataupun rezeki terpijak?'],
  [9.59, 12.21, 'Tiba-tiba akaun bank *penuh dengan duit.'],
  [12.21, 16.05, 'Tapi statistik *membuktikan kebanyakan orang habiskan'],
  [16.05, 18.25, 'duit tersebut dalam masa *singkat.'],
  [18.25, 21.41, '*Pertama, *belanja ikut *emosi.'],
  [21.41, 23.19, 'Terus tukar *kereta baru,'],
  [23.19, 25.86, 'bercuti *mewah dan beli *gadget mahal'],
  [25.86, 28.61, 'sebelum sempat merancang dengan bijak.'],
  [28.61, 30.76, '*Kedua, pegang duit'],
  [30.76, 32.53, 'tanpa *ilmu *kewangan.'],
  [32.53, 37.5, 'Masa inilah anda jadi sasaran *skim *cepat *kaya ataupun terjebak'],
  [37.5, 39.32, 'pelaburan yang *mengarut.'],
  [39.32, 43.24, '*Ketiga, biar duit *tunai terbiar dalam akaun.'],
  [43.24, 49.54, 'Tunai mudah dibelanjakan dan nilainya dimakan *inflasi jika tidak ditukarkan kepada aset fizikal.'],
  [49.54, 51.86, '*Keempat,'],
  [51.86, 55.25, '*Gopoh melabur tanpa faham *risiko,'],
  [55.25, 58.06, 'terburu-buru mengejar untuk menggandakan duit'],
  [58.06, 61.34, 'akhirnya buatkan modal *lebur *sekelip mata.'],
  [61.34, 65.1, 'Dan *kelima, *lupa asingkan untuk *masa *depan.'],
  [65.1, 69.47, 'Anggap duit tersebut semuanya boleh dibelanjakan tanpa memikirkan'],
  [69.47, 73.85, '*simpanan *kecemasan. Duit terpijak adalah *peluang seumur hidup.'],
  [73.85, 76.88, '*Urus dengan *bijak, ia ubah *masa *depan anda.'],
  [76.88, 79.12, 'Tukarkan kepada *aset *fizikal'],
  [79.12, 83.03, 'seperti *emas. Tuan puan yang dah ready nak mulakan *simpan *emas,'],
  [83.03, 86.16, 'boleh rujuk *video saya. *Dulu *ragu, *kini *tahu.'],
  [86.16, 88.14, 'Jom mulakan *simpan *emas.'],
];

const SCENES = [
  // 1 hook
  Hh(0, 4.46, (lt) => {
    const out = clamp((lt - 3.9) / .3); X.save(); X.globalAlpha = 1 - out;
    hookTitle(lt, { tag: 'WAJIB ELAK', lines: ['5 KESILAPAN', 'DUIT TERPIJAK'], sub: 'BILA TIBA-TIBA DAPAT DUIT' });
    X.restore();
  }, 1, WC.th),
  // 2 bonus, pampasan... (pastel)
  B(4.46, 12.21, 'pa1', WC.pa, (lt) => {
    anim(lt, .05, 540, 250, () => PA.pill('Tiba-tiba dapat duit?', 540, 250, 52, PA.K.ink, PA.K.butter, -.02));
    anim(lt, .35, 300, 430, () => PA.pill('Bonus besar', 300, 430, 50, PA.K.ink, PA.K.mint, -.03));
    anim(lt, 1.4, 760, 430, () => PA.pill('Pampasan', 760, 430, 50, PA.K.ink, PA.K.pink, .03));
    anim(lt, 2.6, 330, 560, () => PA.pill('Duit peninggalan', 330, 560, 50, PA.K.ink, PA.K.sky, .02));
    anim(lt, 3.9, 760, 560, () => PA.pill('Rezeki terpijak', 760, 560, 50, PA.K.ink, PA.K.lilac, -.02));
    anim(lt, 5.2, 540, 720, () => { PA.card(110, 650, 860, 160, PA.K.white); PA.txt('Akaun bank', 150, 740, PA.F.t(48), PA.K.brown); const w = 480 * easeOut(clamp((lt - 5.3) / 1.4)); rr(440, 700, 480, 46, 23); X.fillStyle = '#e6efe9'; X.fill(); rr(440, 700, Math.max(24, w), 46, 23); X.fillStyle = PA.K.green; X.fill(); });
    anim(lt, .8, 540, 1300, () => PA.chara(IMG.sHook, 540, mamiY + bob(lt, 6), 740));
    PA.sparkle(130, 900, 28); PA.sparkle(950, 960, 24);
  }, [.05, .35, 1.4, 2.6, 3.9, 5.2, .8]),
  // 3 statistik: habis dalam masa singkat (red komik)
  B(12.21, 18.25, 'rd', WC.rd, (lt) => {
    anim(lt, .05, 540, 230, () => RD.label('STATISTIK MEMBUKTIKAN', 540, 230, 62));
    anim(lt, .4, 540, 560, () => { RD.burst(540, 560, 420, 250, RD.K.red, 18, 5, true); RD.pow('KEBANYAKAN', 540, 545, 100, RD.K.yel, 'center', -.04); RD.pow('HABISKAN!', 540, 660, 118, '#fff', 'center', -.04); });
    [0, 1, 2, 3, 4].forEach(i => { const t0 = 2.6 + i * .5, a = 1 - clamp((lt - t0) / .4); anim(lt, .8 + i * .15, 200 + i * 170, 1000, () => { X.globalAlpha *= a; const y = 1010 - clamp((lt - t0) / .4) * 60; X.beginPath(); X.ellipse(200 + i * 170, y, 62, 62, 0, 0, 7); X.fillStyle = '#F6C94C'; X.fill(); X.lineWidth = 8; X.strokeStyle = RD.K.ink; X.stroke(); X.beginPath(); X.arc(200 + i * 170, y, 40, 0, 7); X.strokeStyle = '#D79A1E'; X.lineWidth = 6; X.stroke(); }); });
    anim(lt, 4.0, 540, 1180, () => RD.label('DALAM MASA SINGKAT', 540, 1180, 66, RD.K.red, '#fff', .03));
  }, [.05, .4, .8, 4.0]),
  // 4 ch1 pastel
  Hh(18.25, 21.41, (lt) => {
    anim(lt, .05, 540, 330, () => { PA.card(70, 190, 940, 330, PA.K.white); PA.pill('KESILAPAN 1', 540, 150, 40, PA.K.ink, PA.K.butter, -.03); PA.title('Belanja Ikut *Emosi*', 540, 370, 92, 900, 'center'); });
  }, -1, WC.pa),
  // 5 kereta, cuti, gadget (editorial)
  B(21.41, 28.61, 'ed', WC.ed, (lt) => {
    anim(lt, .05, 300, 220, () => ED.txt('KESILAPAN 1', 70, 200, ED.F.bodyB(40), ED.K.ink, 'left', 6));
    anim(lt, .1, 300, 420, () => ED.note(['Kereta baru', '+ cuti mewah', '+ gadget mahal'], 80, 380, 78, -.03, false));
    anim(lt, 1.8, 300, 500, () => ED.swoosh(70, 462, 480, ED.K.red, 11, 4, easeOut(clamp((lt - 1.8) / .5))));
    anim(lt, 3.3, 300, 640, () => ED.swoosh(70, 548, 540, ED.K.red, 11, 5, easeOut(clamp((lt - 3.3) / .5))));
    anim(lt, 3.8, 300, 760, () => ED.swoosh(70, 634, 520, ED.K.red, 11, 6, easeOut(clamp((lt - 3.8) / .5))));
    anim(lt, 4.6, 780, 1000, () => ED.sticky(['sebelum sempat', 'merancang', 'dengan bijak'], 600, 760, 380, -.05, 54));
    anim(lt, 3.0, 300, 1300, () => PA.chara(IMG.sBelanja, 300, mamiY + bob(lt, 5), 640));
  }, [.05, .1, 1.8, 3.3, 3.8, 4.6, 3.0]),
  // 6 ch2 maroon
  Hh(28.61, 32.53, (lt) => MA.chapter(lt, 2, 'Pegang Duit', 'Tanpa Ilmu Kewangan', null, 'KESILAPAN'), 1, WC.ma),
  // 7 skim cepat kaya (thumbnail)
  B(32.53, 39.32, 'th', WC.th, (lt) => {
    anim(lt, .1, 540, 300, () => TH.head('SASARAN SKIM', 540, 320, 130, TH.C.y, TH.C.ink, 'center'));
    anim(lt, .6, 540, 500, () => TH.brushHead('CEPAT KAYA', 540, 500, 130, '#fff', TH.C.red, 5));
    anim(lt, 1.2, 540, 1000, () => PA.chara(IMG.sSkim, 540, 1460, 700));
    anim(lt, 4.8, 760, 1000, () => TH.stamp(['AWAS!', 'PELABURAN MENGARUT'], 740, 1330, .1, TH.C.y, 600, 210));
  }, [.1, .6, 1.2, 4.8]),
  // 8 ch3 editorial
  Hh(39.32, 43.24, (lt) => {
    anim(lt, .05, 300, 360, () => ED.bigNum('3', 70, 470, 330, true));
    anim(lt, .3, 700, 400, () => { ED.txt('KESILAPAN', 390, 310, ED.F.bodyB(44), '#fff', 'left', 6); ED.brushTitle('Duit Tunai Terbiar', 390, 410, 62, -.03, false, '#fff'); });
    anim(lt, .8, 700, 450, () => ED.swoosh(390, 440, 960, ED.K.red, 10, 3));
  }, -1, WC.ed),
  // 9 inflasi makan duit tunai (pastel)
  B(43.24, 49.54, 'pa2', WC.pa, (lt) => {
    anim(lt, .1, 540, 310, () => PA.title('Nilainya Dimakan *Inflasi*', 540, 310, 90, 980, 'center'));
    anim(lt, .4, 540, 1300, () => PA.chara(IMG.sTunai, 540, mamiY + bob(lt, 5), 780));
    anim(lt, 3.9, 540, 560, () => PA.pill('tukar kepada aset fizikal', 540, 540, 54, PA.K.ink, PA.K.butter, -.02));
    PA.sparkle(120, 760, 26); PA.sparkle(960, 800, 24);
  }, [.1, .4, 3.9]),
  // 10 ch4 thumbnail (merangkumi "gopoh melabur tanpa faham risiko")
  Hh(49.54, 55.25, (lt) => {
    anim(lt, .05, 540, 280, () => TH.pill('KESILAPAN 4', 540, 230, TH.C.y, TH.C.ink, 32));
    anim(lt, .3, 540, 440, () => TH.brushHead('GOPOH MELABUR', 540, 430, 118, '#fff', TH.C.red, 21));
    anim(lt, 2.4, 540, 540, () => TH.pill('TANPA FAHAM RISIKO', 540, 500, TH.C.y, TH.C.ink, 28));
  }, 1, WC.th),
  // 11 modal lebur (red komik)
  B(55.25, 61.34, 'rd', WC.rd, (lt) => {
    anim(lt, .05, 540, 230, () => RD.label('GANDAKAN DUIT?', 540, 230, 64));
    anim(lt, .5, 280, 1300, () => RD.img(IMG.sLebur, 330, mamiY, 780));
    anim(lt, 3.3, 700, 700, () => { RD.burst(720, 640, 330, 220, RD.K.red, 16, 7, true); RD.pow('LEBUR!', 720, 670, 130, RD.K.yel, 'center', .05); });
    anim(lt, 4.4, 720, 960, () => RD.label('SEKELIP MATA', 720, 960, 62, RD.K.yel, RD.K.ink, -.03));
  }, [.05, .5, 3.3, 4.4]),
  // 12 ch5 pastel
  Hh(61.34, 65.1, (lt) => {
    anim(lt, .05, 540, 330, () => { PA.card(70, 190, 940, 330, PA.K.white); PA.pill('KESILAPAN 5', 540, 150, 40, PA.K.ink, PA.K.butter, -.03); PA.title('Lupa Asingkan *Masa Depan*', 540, 370, 78, 900, 'center'); });
  }, -1, WC.pa),
  // 13 tak fikir simpanan, peluang seumur hidup (maroon)
  B(65.1, 73.85, 'ma1', WC.ma, (lt) => {
    anim(lt, .05, 540, 270, () => mPill(['Duit Terpijak'], 540, 270, 96)); anim(lt, .05, 540, 270, () => MA.side(300));
    anim(lt, .4, 540, 560, () => mRow(60, 440, 960, 'Anggap', 'BOLEH BELANJA'));
    anim(lt, 2.4, 540, 710, () => mRow(60, 590, 960, 'Tanpa fikir', 'SIMPANAN KECEMASAN'));
    anim(lt, 5.4, 540, 860, () => mRow(60, 740, 960, 'Duit terpijak', 'PELUANG SEUMUR HIDUP'));
    anim(lt, 3.4, 540, 1300, () => PA.chara(IMG.sLupa, 540, mamiY, 560));
  }, [.05, .4, 2.4, 5.4, 3.4]),
  // 14 urus dengan bijak (pastel pink)
  B(73.85, 76.88, 'pa3', WC.pa, (lt) => {
    anim(lt, .05, 540, 300, () => PA.title('Urus Dengan *Bijak*', 540, 300, 104, 980, 'center'));
    anim(lt, .3, 540, 1300, () => PA.chara(IMG.sBijak, 540, mamiY + bob(lt, 5), 780));
    [[130, 800], [950, 760]].forEach(([x, y], i) => anim(lt, .6 + i * .2, x, y, () => PA.heart(x, y + bob(lt, 10, 2.4, i), 38 + i * 8)));
  }, [.05, .3, .6]),
  // 15 tukar kepada aset fizikal, emas (editorial)
  B(76.88, 83.03, 'ed', WC.ed, (lt) => {
    anim(lt, .05, 300, 300, () => ED.brushTitle('Tukarkan kepada', 70, 300, 76, -.02, false));
    anim(lt, .4, 300, 480, () => ED.bigNum('ASET', 60, 520, 270));
    anim(lt, .8, 300, 600, () => ED.brushTitle('fizikal', 80, 650, 90, -.03, true, ED.K.ink, easeOut(clamp((lt - 1.0) / .5))));
    anim(lt, 2.4, 300, 860, () => ED.photoBox(IMG.bungamas, 60, 740, 440, 360, 26, .5, .5, -.03));
    anim(lt, 2.6, 800, 880, () => { ED.note(['seperti', 'EMAS!'], 560, 800, 84, -.06); ED.arrow(700, 940, 520, 960, 40, ED.K.red, 6); });
    anim(lt, 3.4, 800, 1300, () => PA.chara(IMG.sAset, 800, mamiY, 600));
  }, [.05, .4, .8, 2.4, 2.6, 3.4]),
  // 16 CTA (maroon)
  B(83.03, 86.16, 'ma2', WC.ma, (lt) => {
    anim(lt, .05, 540, 250, () => mHead('Dah Ready Nak Mula?', 540, 260, 84));
    anim(lt, .3, 540, 430, () => mPill(['Mula Simpan Emas', 'Hari Ini'], 540, 380, 100)); anim(lt, .3, 540, 430, () => MA.side(450));
    anim(lt, .9, 540, 760, () => mHead('Dulu Ragu, Kini Tahu!', 540, 770, 80, MA.K.gold));
    anim(lt, .7, 760, 1300, () => PA.chara(IMG.sKunci, 790, mamiY, 640));
    anim(lt, 1.2, 370, 1300, () => { shadow(() => { rr(50, 1190, 640, 120, 60); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Rujuk Pin Video', 370, 1270, MA.F.h(54), '#fff', 'center'); });
  }, [.05, .3, .9, .7, 1.2]),
  // 17 penutup (red komik)
  Hh(86.16, 88.14, (lt) => {
    anim(lt, .05, 540, 330, () => RD.pow('JOM MULAKAN', 540, 350, 130, RD.K.yel, 'center', -.04));
    anim(lt, .25, 540, 480, () => RD.pow('SIMPAN EMAS!', 540, 500, 130, '#fff', 'center', .03));
  }, -1, WC.rd),
];

function bakeAll() {
  bake('pa1', () => PA.bg('#FFF6E5', 1)); bake('pa2', () => PA.bg('#DDF3E8', 4)); bake('pa3', () => PA.bg('#FFE1E8', 8));
  bake('rd', () => RD.paper()); bake('ed', () => ED.paper()); bake('th', () => TH.bg('navy'));
  BGS.ma1 = MA.bgPhoto('wallet', 16, .45); BGS.ma2 = MA.bgPhoto('shop', 16, .45);
}
