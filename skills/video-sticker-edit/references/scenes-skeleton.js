// scenes.js SKELETON — salin ke <projek>/scenes.js, ganti isi. Contoh lengkap: references/scenes-*.js (21 video).
// Susunan fail dimuat: engine.js -> scenes.js -> run.js. Jangan edit engine.js / run.js / render.js.
const VOICE = 0 /* dari new_video.sh */, DUR = VOICE + 6, HEADN = 0 /* dari new_video.sh */;
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
  anim(lt, 3.6, 540, 760, () => mHead('Dulu Ragu, Kini Tahu!', 540, 770, 80, MA.K.gold));
  anim(lt, 2.0, 540, 900, () => { shadow(() => { rr(180, 850, 720, 120, 60); X.fillStyle = MA.K.maroon; X.fill(); }, 22, .45, 10); MA.txt('Rujuk Pin Video', 540, 930, MA.F.h(54), '#fff', 'center'); });
  stk(lt, .6, hero, 540, SB, h);
};
const BAKE = ['tiers', 'kg', 'dulang', 'merak100', 'bunga50', 'syiling', 'g250', 'dinarPantai', 'shop', 'ipad', 'binder', 'bungamas', 'wallet', 'merak5'];
function bakeAll() { BAKE.forEach(k => { BGS[k] = MA.bgPhoto(k, 16, .45); }); }

// 1) Sticker: ASSETS = { ...PH, sNama: 'stk-<nama>.png', ... }   (PH = 14 foto emas, kunci: tiers kg dulang merak100 bunga50 syiling g250 dinarPantai shop ipad binder bungamas wallet merak5)
const ASSETS = { ...PH, sA: 'stk-nama-a.png', sB: 'stk-nama-b.png' /* ... 9 sticker */ };

// 2) SEG = kapsyen: [mula, tamat, 'teks dengan *kata *kunci'] ; '*' di depan perkataan = emas. Betulkan ejaan ikut konteks.
const SEG = [
  [0, 4.0, '*5 *sebab ... (tajuk)'],
  // ...
];

// 3) SCENES: H = footage + overlay (hook/chapter), B = B-roll slaid maroon + sticker pop-up. Hard cut. Masa 'at' = saat sejak mula adegan.
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'SEBAB');
const SCENES = [
  // Hook: tag + 2 baris Anton merah/stroke putih + sub maroon; fade keluar di hujung
  Hh(0, 4.0, (lt) => { const out = clamp((lt - 3.5) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'TAG', lines: ['5 SEBAB', 'TAJUK'], sub: 'SUB TAJUK' }); X.restore(); }, 1, WC.ma),
  // B-roll: tajuk pil + max 3 baris (y 440/590/740) + sticker di bawah (SB). cardsnya: MA.tierCard(50|550,430,480,400,'ATAS','BESAR','kecil') pada anim(lt,at,290|790,650,...)
  B(4.0, 14.0, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Tajuk Slaid', 100);
    row(lt, 1.0, 440, 'Label', 'NILAI'); row(lt, 3.5, 590, 'Label', 'NILAI');
    stk(lt, .4, IMG.sA, 540, SB, 620);
  }),
  // Chapter (footage + pil nombor): dir -1/1 = zum masuk/keluar
  Hh(14.0, 18.0, CH(1, 'Baris Satu', 'Baris Dua', null), -1, WC.ma),
  // Kad putih: anim(lt, 1.0, 540, 560, () => mWhite(130, 440, 820, ['Baris satu', '*baris dua emas'], 50))  (tanda * hanya di AWAL baris)
  // CTA + outro WAJIB di hujung:
  B(VOICE - 8, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sA, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sA /* ... semua 9 sticker */])), { nobk: true }),
];
