// scenes.js — "5 Sebab Duduk Kampung Pun Senang Simpan Emas" (101.146009s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 101.146009, DUR = VOICE + 6, HEADN = 3034;
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
const ASSETS = { ...PH, sDuduk: 'stk-duduk-kampung-boleh.png', sTakPerlu: 'stk-tak-perlu-pekan.png', sOnline: 'stk-sekarang-online.png', sDipos: 'stk-dipos-ke-rumah.png', sKos: 'stk-kos-sara-hidup-rendah.png', sSelamat: 'stk-lebih-selamat-tunai.png', sTradisi: 'stk-tradisi-tanah-emas.png', sTakAda: 'stk-tak-ada-alasan-lagi.png', sMula: 'stk-mula-simpan-dari-kampung.png' };

const SEG = [
  [0, 3.56, '*5 *sebab *duduk *kampung pun senang nak *simpan *emas.'],
  [3.56, 8.31, 'Ramai orang kampung ingat simpan emas ini cuma urusan *orang *bandar besar.'],
  [8.31, 13.35, 'Jauh kedai emas pun *berbatu-batu, macam mana nak simpan emas?'],
  [13.35, 16.75, 'Hakikatnya hari ini *jarak bukan lagi *penghalang.'],
  [16.75, 20.93, '*Pertama, urusan *100% melalui *telefon.'],
  [20.93, 25.44, 'Tak perlu habiskan minyak motor, pergi ke pekan, pergi ke bandar.'],
  [25.44, 28.77, 'Semuanya boleh dibuat secara *online dari rumah.'],
  [28.77, 33.15, '*Kedua, emas fizikal *dipos terus ke *pintu *pagar.'],
  [33.15, 36.18, 'Emas boleh dihantar terus ke *alamat *kampung'],
  [36.18, 39.2, 'dengan perlindungan *insurans sepenuhnya.'],
  [39.2, 42.97, '*Ketiga, *kos *sara *hidup kampung lebih *rendah.'],
  [42.97, 45.55, 'Kelebihan ini memberikan anda ruang'],
  [45.55, 50.46, 'perbelanjaan yang lebih luas untuk *menyimpan berbanding warga kota.'],
  [50.46, 54.43, '*Keempat, lebih *selamat daripada simpan tunai di rumah.'],
  [54.43, 58.47, 'Menyimpan wang tunai bawah tilam berisiko *kecurian'],
  [58.47, 60.67, 'atau dimakan *anai-anai.'],
  [60.67, 63.75, '*Emas *fizikal boleh disimpan *selamat,'],
  [63.75, 66.31, 'sama ada pegang sendiri emas fizikal'],
  [66.31, 69.48, 'ataupun simpan di dalam *Akaun *Emas *GAP *Public *Gold.'],
  [69.48, 73.04, '*Kelima, *gabungan *tradisi *tanah dan *emas.'],
  [73.04, 75.84, 'Orang kampung sangat faham tentang *nilai.'],
  [75.84, 80.39, 'Emas adalah pilihan terbaik yang boleh dikumpul *sedikit-sedikit.'],
  [80.39, 83.25, 'Tinggal jauh di kampung *bukan lagi *alasan.'],
  [83.25, 85.27, 'Selagi ada *telefon di tangan'],
  [85.27, 88.56, 'internet pun ada, boleh bina *kekayaan emas'],
  [88.56, 92.3, 'dari kampung melalui *Akaun *Emas *GAP *Public *Gold.'],
  [92.3, 96.5, 'Tuan puan yang dah ready nak mulakan simpan emas boleh rujuk *pin *video saya.'],
  [96.5, 98.31, '*Dulu *ragu, *kini *tahu. Jom'],
  [98.31, 101.15, 'bina *kekayaan dengan *emas *fizikal.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'SEBAB');
const SCENES = [
  Hh(0, 3.56, (lt) => { const out = clamp((lt - 3.1) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'DUDUK KAMPUNG', lines: ['5 SEBAB', 'SIMPAN EMAS'], sub: 'DUDUK KAMPUNG PUN SENANG' }); X.restore(); }, 1, WC.ma),
  B(3.56, 16.75, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Orang Kampung?', 100);
    row(lt, 1.5, 440, 'Ingat emas', 'URUSAN BANDAR'); row(lt, 5.0, 590, 'Kedai emas', 'BERBATU-BATU'); row(lt, 9.8, 740, 'Jarak', 'BUKAN PENGHALANG');
    stk(lt, .5, IMG.sDuduk, 540, SB, 600);
  }),
  Hh(16.75, 20.93, CH(1, 'Urusan 100%', 'Melalui Telefon', null), -1, WC.ma),
  B(20.93, 28.77, 'ipad', WC.ma, (lt) => {
    ttl(lt, 'Semua Online', 100);
    if (lt < 4.5) { row(lt, 1.0, 440, 'Tak perlu', 'KE PEKAN'); stk(lt, .3, IMG.sTakPerlu, 540, SB, 640); }
    else { anim(lt, 4.7, 540, 560, () => mWhite(130, 440, 820, ['Semua boleh online', '*dari rumah'], 52)); stk(lt, 4.6, IMG.sOnline, 540, SB, 640); }
  }),
  Hh(28.77, 33.15, CH(2, 'Emas Dipos', 'Ke Pintu Pagar', null), 1, WC.ma),
  B(33.15, 39.2, 'kg', WC.ma, (lt) => {
    ttl(lt, 'Hantar Ke Rumah', 100);
    row(lt, .8, 440, 'Alamat', 'KAMPUNG'); row(lt, 3.0, 590, 'Perlindungan', 'INSURANS PENUH');
    stk(lt, .4, IMG.sDipos, 540, SB, 640);
  }),
  Hh(39.2, 42.97, CH(3, 'Kos Sara Hidup', 'Lebih Rendah', 'di kampung'), -1, WC.ma),
  B(42.97, 50.46, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Ruang Menyimpan', 100);
    row(lt, 1.5, 440, 'Kos hidup', 'LEBIH RENDAH'); row(lt, 4.0, 590, 'Ruang simpan', 'LEBIH LUAS');
    stk(lt, .4, IMG.sKos, 540, SB, 640);
  }),
  Hh(50.46, 54.43, CH(4, 'Lebih Selamat', 'Daripada Tunai', null), 1, WC.ma),
  B(54.43, 63.75, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Tunai Bawah Tilam?', 88);
    row(lt, 1.0, 440, 'Risiko', 'KECURIAN'); row(lt, 3.8, 590, 'Atau', 'ANAI-ANAI'); row(lt, 6.6, 740, 'Emas fizikal', 'SELAMAT');
    stk(lt, .4, IMG.sSelamat, 540, SB, 600);
  }),
  B(63.75, 69.48, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Simpan Selamat', 100);
    anim(lt, .8, 290, 650, () => MA.tierCard(50, 430, 480, 400, 'PEGANG', 'SENDIRI', 'emas fizikal'));
    anim(lt, 3.3, 790, 650, () => MA.tierCard(550, 430, 480, 400, 'AKAUN EMAS', 'GAP', 'Public Gold'));
  }),
  Hh(69.48, 73.04, CH(5, 'Tradisi Tanah', 'Dan Emas', null), -1, WC.ma),
  B(73.04, 80.39, 'syiling', WC.ma, (lt) => { ttl(lt, 'Faham Nilai', 100); anim(lt, 2.8, 540, 560, () => mWhite(130, 440, 820, ['Kumpul emas', '*sedikit-sedikit'], 52)); stk(lt, .4, IMG.sTradisi, 540, SB, 640); }),
  B(80.39, 88.56, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Bukan Lagi Alasan', 88);
    row(lt, 3.0, 440, 'Ada telefon', 'ADA INTERNET'); row(lt, 5.4, 590, 'Boleh bina', 'KEKAYAAN EMAS');
    stk(lt, .4, IMG.sTakAda, 540, SB, 640);
  }),
  B(88.56, 92.3, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Mula Dari Kampung', 92); anim(lt, 1.0, 540, 560, () => mWhite(130, 440, 820, ['Akaun Emas GAP', '*Public Gold'], 52)); stk(lt, .3, IMG.sMula, 540, SB, 640); }),
  B(92.3, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sDuduk, 600)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sDuduk, IMG.sTakPerlu, IMG.sOnline, IMG.sDipos, IMG.sKos, IMG.sSelamat, IMG.sTradisi, IMG.sTakAda, IMG.sMula])), { nobk: true }),
];
