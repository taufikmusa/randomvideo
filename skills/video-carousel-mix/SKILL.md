---
name: video-carousel-mix
description: 'Video menegak 1080x1920 (TikTok/Reels) dari FOOTAGE TAUFIK BERCAKAP (talking head) di mana carousel jadi B-ROLL: setiap poin/bab dipotong ke slaid animasi dalam gaya carousel yang BERLAINAN (mix carousel-pastel kartun keluarga Baba/Mami/Amani/Aileen, carousel-red komik pop-art, carousel-editorial putih majalah, carousel-maroon impian, carousel-thumbnail gelap Anton), dengan kapsyen Poppins ExtraBold Italic (kata kunci emas) dinaikkan ke y≈1390, hook title Playfair emas berkilau, hard cut (tiada transisi) dengan sticker pop-up elastik, audio = suara asal SAHAJA (TANPA muzik, TANPA SFX), sticker kartun Taufik sebagai watak. Guna bila Taufik upload video dia bercakap (copywriting 5 poin) dan minta "buat jadi video", "carousel jadi b-roll", "mix semua skill carousel", "gaya video ibu tunggal / video kahwin tu". Suara asal Taufik dikekalkan. BERBEZA daripada video-timeline (motion graphics tanpa suara) dan carousel-* (gambar statik).'
---

# video-carousel-mix — talking head + B-roll carousel (1080x1920, 30fps)

> **HOOK TERKINI**: judul besar `hookTitle` = Anton MERAH + stroke PUTIH tebal (+ bayang gelap, kilauan) dengan pil tag emas di atas & pil maroon di bawah. **OUTRO WAJIB** (Taufik minta): selepas suara tamat tambah ±6s adegan `Object.assign(B(VOICE, DUR, bg, WC.ma, lt => outroScene(lt, [9 sticker])), { nobk: true })` — semua sticker pop-up berturut-turut + "Tahniah tonton sampai habis! / Like | Share | Follow / @taufik.pg". `DUR = VOICE + 6` dalam scenes.js.
>
> **GAYA TERKINI (video duit-terpijak, disahkan Taufik): SATU design konsisten = MAROON-EMAS** (latar foto emas kabur, `ttl()` pil maroon + `row()`/`tierCard`/`chip`/`whiteCard`, chapter `MA.chapter`, hook `hookTitle`) + sticker kartun sebagai wira dengan **pop-up elastik `stk(lt, at, img, cx, by, h)`** (bounce + putaran + percikan emas + bayang). Tujuan: nampak PRO walaupun guna sticker kartun. Mix 5 gaya (di bawah) hanya jika Taufik minta; lalai sekarang = maroon konsisten. Rujukan: `references/scenes-duit-terpijak.js`.

Taufik suka gaya ni (4 video siap: ibu tunggal, kahwin, bayar hutang, beli rumah — lihat `references/`). Formula yang berjaya:

- **Footage Taufik = asas.** Setiap poin: ayat tajuk ("Pertama, tabung kecemasan") kekal atas footage dengan **chapter overlay** (pil/label ikut gaya), kemudian **potong ke B-roll** slaid animasi semasa isi poin diceritakan, kemudian balik ke footage. ±50% masa = B-roll.
- (Gaya lama, hanya jika diminta) **setiap bab guna gaya carousel lain** (mix): pastel → red → editorial → maroon → thumbnail → pastel… Kapsyen bawah SENTIASA Poppins ExtraBold Italic putih, outline maroon gelap, kata kunci emas — lapisan jenama yang menyatukan semua gaya. **Transisi = TIADA (hard cut)** — Taufik: kertas koyak & api tak best; sticker pop-up elastik (`stk()`) sudah cukup animasi.
- **Audio = suara asal (loudnorm).** TIADA muzik. SFX DEFAULT tiada (Taufik: whoosh/pop mengganggu); SFX lembut (kertas koyak) hanya jika Taufik minta — salin `sfx.py.optional` → `sfx.py`.
- Kartun keluarga di B-roll pastel/red/CTA. Topik ibu tunggal: Mami sebagai "ibu" + Amani & Aileen (laporkan pilihan ni). Topik suami-isteri: Baba + Mami. Topik anak: Amani + Aileen. CTA: `baba-semi-realistik-jom`. Potret/selfie sebenar TIDAK digunakan (footage dah ada Taufik).
- **Sticker Taufik (assets/kartun/stiker/<topik>/)**: Taufik beri helaian sticker 3x3 per video (teks dalam sticker). Guna sebagai watak utama di B-roll yang sepadan (`PA.chara(IMG.sX, cx, mamiY, h)`; `new` helper: `convert … -filter Lanczos -resize 200% -unsharp 0x.8` ke `img/stk-*.png`). Potong dengan `assets/potong_sticker.py` dan SEMAK susunan sebenar (tertib baca TIDAK dijamin) sebelum namakan.
- **Hook (adegan pertama)**: `hookTitle(lt,{tag,lines:[l1,l2],sub})` — pil tag emas + 2 baris Playfair 900 emas berkilau + pil maroon sub + sparkle. Fade-out dengan `X.globalAlpha`.
- **Struktur 5 poin (≈80–100s):** hook (H, thumbnail) → intro/konteks (B) → [chapter H → isi B] ×5 → "ibu/hakikat" B → H penutup ayat → CTA B (maroon + Baba "Jom!" + "Rujuk Pin Video") → H akhir "Dulu Ragu, Kini Tahu!" (red komik).

## Fail
```
assets/template/engine.js   JANGAN EDIT: 5 modul gaya (MA PA RD ED TH), anim(), kapsyen, head(), pembantu adegan (B, Hh, WC, mamiY, bob)
assets/template/scenes.js   FAIL YANG DITULIS: DUR, HEADN, ASSETS, SEG (kapsyen), SCENES[], bakeAll()  (contoh = ibu tunggal)
assets/template/run.js      JANGAN EDIT: hard cut, hud (@taufik.pg + progress), render(t) (B-roll dimampatkan BK=.885 supaya kandungan tak masuk zon kapsyen), ready
assets/template/render.js   node render.js [stills t1 t2…] — 4 page selari, ffmpeg + suara asal (+ SFX jika projek ada sfx.py)
assets/template/sfx.py.optional   SFX LEMBUT pilihan: salin ke <projek>/sfx.py → bunyi kertas koyak pada setiap transisi + pop halus (volume .4). DEFAULT: TIADA SFX; aktifkan hanya bila Taufik minta (video duit-terpijak sahaja).
fonts/                       Poppins, Fredoka, Nunito, Anton, Bangers, Inter, Caveat, PermanentMarker, Mono
scripts/new_video.sh         salin template + ekstrak frame src/ + voice.wav + cetak DUR/HEADN
scripts/prep_src.sh          ekstrak frame/suara sahaja (tanpa timpa scenes.js) — guna bila re-render projek lama
scripts/transcribe.py        transkrip Whisper-small (sherpa-onnx, offline) ikut jeda senyap
references/scenes-*.js   lima belas contoh lengkap (ibu-tunggal, kahwin, bayar-hutang, beli-rumah, duit-terpijak, warisan-nenek, mangsa-tipu, retrenchment, haji, kampung, berniaga, gaji-kecil, anak, fd-asb, sandwich)
  (warisan-nenek, mangsa-tipu, retrenchment, haji, kampung, berniaga, gaji-kecil, anak, fd-asb & sandwich = TERKINI (guna helper `ttl/row/CTA/SB` & `bakeAll`, mWhite: `*` hanya berfungsi di AWAL baris): maroon konsisten + sticker + outro; bayar-hutang & beli-rumah: Baba kartun sebagai watak utama; ada `fadeOut(lt,t0)`, ikon `bankIcon`/`house`, graf animasi editorial, syiling hilang satu-satu — salin snippet dari situ)
```

## Aliran kerja
1. `sh skills/video-carousel-mix/scripts/new_video.sh video-<topik> <upload.mp4>` → cetak `DUR`/`HEADN`.
2. **Transkrip**: `python3 skills/video-carousel-mix/scripts/transcribe.py video-<topik>/voice.wav <model>` (setup model dalam header skrip; `pip install sherpa-onnx`; model dari GitHub release k2-fsa/sherpa-onnx, HuggingFace disekat). Output ada ejaan salah → **betulkan ikut konteks** (kewangan bukan keuangan, nafkah, maruah…). Ayat yang kabur: cuba semula chunk dengan bahasa `ms`/`id`, kalau masih ragu tanya Taufik / laporkan.
3. `cp assets/emas/*.jpg assets/kartun/<watak>/*.png video-<topik>/img/` (guna `assets/README.md`).
4. Tulis `scenes.js`: `SEG` = [mula, tamat, 'teks *kata *kunci'] ikut jeda; `SCENES` = `Hh(a,b,overlay,dir,WC.x)` (footage + overlay) dan `B(a,b,bgKey,WC.x,draw,pops)` (B-roll). Masa reveal dalam `draw` (`anim(lt, at, cx, cy, fn)`) ikut masa perkataan dituturkan (`at` = saat sejak mula adegan). `pops` = tidak lagi digunakan (SFX dibuang) — boleh dikosongkan. `bakeAll()` bake latar.
5. `node render.js stills <masa…>` → contact sheet (`montage … -tile 5x`) → semak: pil/doodle bertindih, teks keluar tepi, ruang kapsyen (y>1530 mesti kosong), aksara kartun vs teks.
6. `node render.js` (~3 min, 4 worker). Semak `ffprobe` duration == DUR (loudnorm pernah potong ekor → dah diatasi `apad` + `-t`).
7. Hantar: commit + push MP4, beri link GitHub raw sahaja (peraturan CLAUDE.md). Laporkan dialog/teks rekaan.

## Petua tambahan (dari video 3 & 4)
- Transkrip kabur: ulang chunk sempit (±3s) dengan `language='ms'` dan `'id'`, bandingkan; "di bozik" = deposit, "ekon bank" = akaun bank. Guna `silencedetect` (d=0.12) untuk cari sempadan tajuk bab ("Kedua,") yang Whisper tak tangkap. Ayat yang masih ragu → senaraikan dalam laporan.
- Satu footage `Hh` boleh tukar overlay ikut `lt` (cth amaran → chapter) tanpa transisi.
- Elemen B-roll yang perlu hilang sebelum elemen baru: `X.globalAlpha *= 1 - clamp((lt - t0)/.3)` di awal fungsi `anim` (helper `fadeOut`).
- Watak utama topik hutang/rumah/duit = Baba (alhamdulillah = lega, berfikir-polo = godaan, sorak-polo = bebas, jongkong-250g = emas, tangan-terbuka = impian). Jangan sebut "Public Gold" kecuali Taufik sebut dalam audio.
- Nama folder = nama MP4 (`video-<topik>/video-<topik>.mp4`) — beri nama sebenar SEBELUM render.

## API ringkas (dalam scenes.js)
- Struktur: `Hh(a,b,ov,dir,wc)` footage+overlay (dir ±1 = zum masuk/keluar), `B(a,b,bg,wc,draw,pops)`. `WC.*` = warna lama (tidak digunakan lagi oleh transisi api; kekalkan sebagai hujah).
- Latar B: `pa1/pa2/pa3` (pastel krim/mint/pink), `rd` (kertas komik), `ed` (putih), `th` (navy bokeh), `ma1/ma2` (foto kabur — set `BGS.ma1 = MA.bgPhoto('<kunciAset>', 16, .45)` dalam `bakeAll`).
- **PA** pastel: `bg title pill bubble card chara goldBar coin photoCard sparkle heart` · **RD** red: `paper panel burst pow bubble label circleMark ticks img photoPanel` · **ED** editorial: `swoosh bigNum brushTitle note sticky photoBox arrow burst` · **TH** thumbnail: `head brushHead pill photo stamp` · **MA** maroon: `headline pillTitle side sub whiteCard rowPill tierCard badge photoCard chapter(lt,n,l1,l2,sub,tag)`. Alias: `mPill mHead mWhite mRow mSub`.
- Pembantu: `anim clamp easeOut back bob(lt,amp,speed,phase) shadow rr fitSize`, `mamiY=1500` (garis kaki kartun), `IMG.<kunci>` dari `ASSETS`.

## Peraturan
- Bahasa Melayu Malaysia; angka hanya dari skrip Taufik (RM100 sebulan dsb). Jangan reka harga/pulangan. Screenshot app bertarikh: jangan paparkan baki/angka.
- Dialog/teks rekaan pendek (belon, nota) dibenarkan — SENARAIKAN dalam laporan.
- Maksimum 1 gaya per bab; jangan ulang gaya yang sama dua bab berturut-turut.
- Kapsyen, transisi api & hud tidak diedit — itu yang menyatukan mix. Kapsyen y=1390 (Taufik: "tinggikan 90%" dari jarak bawah asal 1640); B-roll jangan letak apa-apa di y>1330 (selepas BK).
- Kandungan sensitif (ibu tunggal): nada hormat, jangan label negatif; Mami sebagai wakil "ibu" — beritahu Taufik.
