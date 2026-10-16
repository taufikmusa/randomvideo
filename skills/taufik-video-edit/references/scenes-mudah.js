// scenes.js — "5 Sebab Simpan Emas Sebenarnya Sangat Mudah" (89.58s + outro 6s). Maroon konsisten + sticker pop-up. Hard cut.
const VOICE = 89.581995, DUR = VOICE + 6, HEADN = 2687;
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
const ASSETS = { ...PH, sRumit: 'stk-rumit-sangat.png', sBank: 'stk-semudah-akaun-bank.png', sPakar: 'stk-tak-perlu-pakar.png', sAset: 'stk-aset-jelas-terbukti.png', sBimbing: 'stk-bimbingan-berpengalaman.png', sKecil: 'stk-mulakan-langkah-kecil.png', sElit: 'stk-bukan-golongan-elit.png', sSistem: 'stk-sistem-memudahkan.png', sMula: 'stk-mulakan-hari-ini.png' };

const SEG = [
  [0, 3.0, '*5 *sebab *simpan *emas sebenarnya sangat *mudah'],
  [3.0, 4.85, 'Saya nak simpan emas tapi rasa *rumit sangat'],
  [4.85, 8.71, 'sebab ada beberapa *istilah yang saya tak faham.'],
  [8.71, 11.3, 'Jangan biarkan rasa *takut menghalang anda'],
  [11.3, 14.58, 'menyimpan emas sebab ia jauh lebih *mudah'],
  [14.58, 16.82, 'dan lebih *selamat'],
  [16.82, 19.03, 'daripada apa yang anda sangka.'],
  [19.03, 22.66, '*Pertama, konsepnya *semudah *akaun *bank biasa.'],
  [22.66, 24.85, 'Kita masukkan *duit,'],
  [24.85, 26.47, 'sistem secara *automatik'],
  [26.47, 29.71, 'menukarkan kepada bentuk berat *gram *emas'],
  [29.71, 31.57, 'mengikut *harga *harian.'],
  [31.57, 35.38, '*Kedua, tak perlu menjadi *pakar *analisis pasaran.'],
  [35.38, 38.95, 'Kita tak perlu *pening kepala membaca *carta teknikal rumit'],
  [38.95, 40.56, 'seperti pelaburan saham.'],
  [40.56, 44.39, '*Ketiga, satu *keputusan *mudah tanpa pening kepala.'],
  [44.39, 48.92, 'Emas adalah satu *aset yang *jelas fungsinya sejak *beribu *tahun dahulu.'],
  [48.92, 52.02, '*Dan *keempat, *bimbingan terus daripada'],
  [52.02, 54.83, '*dealer *emas. Anda tidak *sendirian,'],
  [54.83, 59.02, 'sentiasa ada pihak yang sedia membimbing langkah permulaan.'],
  [59.02, 64.0, '*Dan *kelima, mulakan dengan *langkah *kecil untuk belajar secara *praktikal.'],
  [64.0, 65.98, 'Pengalaman menabung *gram *emas'],
  [65.98, 69.72, 'mengajar anda lebih banyak daripada membaca teori sahaja.'],
  [69.72, 72.07, 'Menyimpan emas bukanlah untuk *golongan'],
  [72.07, 75.74, '*elit semata-mata. Mula hari ini dengan *bajet *kecil.'],
  [75.74, 78.48, 'Mulakan di *Akaun *Emas *GAP *Public *Gold,'],
  [78.48, 81.43, 'sebab *langkah *pertama menentukan'],
  [81.43, 84.32, 'simpanan anda bertambah ataupun'],
  [84.32, 86.49, 'langsung tak ada emas. Jadi...'],
  [86.49, 88.34, '*Dulu *ragu, *kini *tahu, jom'],
  [88.34, 89.58, 'mulakan *simpan *emas.'],
];
const CH = (n, l1, l2, sub) => (lt) => MA.chapter(lt, n, l1, l2, sub, 'SEBAB');
const SCENES = [
  Hh(0, 3.0, (lt) => { const out = clamp((lt - 2.5) / .3); X.save(); X.globalAlpha = 1 - out; hookTitle(lt, { tag: 'JANGAN RUMITKAN', lines: ['5 SEBAB', 'SIMPAN EMAS'], sub: 'SEBENARNYA SANGAT MUDAH' }); X.restore(); }, 1, WC.ma),
  B(3.0, 19.03, 'tiers', WC.ma, (lt) => {
    ttl(lt, 'Rasa Rumit?', 100);
    row(lt, 1.8, 440, 'Rasa', 'RUMIT SANGAT'); row(lt, 4.6, 590, 'Istilah', 'TAK FAHAM'); row(lt, 9.0, 740, 'Hakikatnya', 'LEBIH MUDAH & SELAMAT');
    stk(lt, .4, IMG.sRumit, 540, SB, 600);
  }),
  Hh(19.03, 22.66, CH(1, 'Semudah', 'Akaun Bank', null), -1, WC.ma),
  B(22.66, 31.57, 'dulang', WC.ma, (lt) => {
    ttl(lt, 'Masuk Duit, Dapat Emas', 80);
    row(lt, 1.0, 440, 'Kita masukkan', 'DUIT'); row(lt, 3.4, 590, 'Sistem tukar', 'KE GRAM EMAS'); row(lt, 6.0, 740, 'Ikut', 'HARGA HARIAN');
    stk(lt, .4, IMG.sBank, 540, SB, 600);
  }),
  Hh(31.57, 35.0, CH(2, 'Tak Perlu', 'Pakar Analisis', null), 1, WC.ma),
  B(35.0, 40.56, 'bunga50', WC.ma, (lt) => {
    ttl(lt, 'Tak Perlu Pening', 100);
    row(lt, 1.0, 440, 'Carta teknikal', 'TAK PERLU'); row(lt, 3.6, 590, 'Bukan seperti', 'SAHAM');
    stk(lt, .4, IMG.sPakar, 540, SB, 620);
  }),
  Hh(40.56, 44.39, CH(3, 'Satu Keputusan', 'Mudah', null), -1, WC.ma),
  B(44.39, 48.92, 'merak100', WC.ma, (lt) => {
    ttl(lt, 'Aset Yang Jelas', 100);
    row(lt, .8, 440, 'Emas', 'ASET JELAS'); row(lt, 2.6, 590, 'Berfungsi', 'BERIBU TAHUN');
    stk(lt, .4, IMG.sAset, 540, SB, 620);
  }),
  Hh(48.92, 52.02, CH(4, 'Bimbingan', 'Daripada Dealer', null), 1, WC.ma),
  B(52.02, 59.02, 'syiling', WC.ma, (lt) => {
    ttl(lt, 'Anda Tak Sendirian', 92);
    row(lt, 1.0, 440, 'Bimbingan', 'TERUS DARI DEALER'); row(lt, 3.6, 590, 'Sentiasa ada', 'PIHAK MEMBIMBING');
    stk(lt, .4, IMG.sBimbing, 540, SB, 620);
  }),
  Hh(59.02, 62.5, CH(5, 'Langkah Kecil', 'Belajar Praktikal', null), -1, WC.ma),
  B(62.5, 69.72, 'g250', WC.ma, (lt) => {
    ttl(lt, 'Belajar Praktikal', 100);
    row(lt, 1.0, 440, 'Menabung', 'GRAM EMAS'); row(lt, 3.4, 590, 'Lebih ajar', 'DARI TEORI');
    stk(lt, .4, IMG.sKecil, 540, SB, 620);
  }),
  B(69.72, 75.74, 'dinarPantai', WC.ma, (lt) => { ttl(lt, 'Bukan Untuk Elit', 100); stk(lt, .3, IMG.sElit, 540, SB, 680); }),
  B(75.74, 81.43, 'merak5', WC.ma, (lt) => {
    ttl(lt, 'Mula Hari Ini', 100);
    row(lt, 1.2, 440, 'Bajet', 'KECIL'); row(lt, 3.0, 590, 'Akaun Emas GAP', 'PUBLIC GOLD');
    stk(lt, .4, IMG.sSistem, 540, SB, 620);
  }),
  B(81.43, 84.0, 'ipad', WC.ma, (lt) => { ttl(lt, 'Langkah Pertama', 100); stk(lt, .3, IMG.sMula, 540, SB, 660); }),
  B(84.0, VOICE, 'shop', WC.ma, (lt) => CTA(lt, IMG.sMula, 620)),
  Object.assign(B(VOICE, DUR, 'tiers', WC.ma, (lt) => outroScene(lt, [IMG.sRumit, IMG.sBank, IMG.sPakar, IMG.sAset, IMG.sBimbing, IMG.sKecil, IMG.sElit, IMG.sSistem, IMG.sMula])), { nobk: true }),
];
