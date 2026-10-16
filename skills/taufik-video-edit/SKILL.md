---
name: taufik-video-edit
description: 'Edit video talking-head Taufik (@taufik.pg, Public Gold G100) jadi video menegak 1080x1920 30fps gaya MAROON-EMAS dengan B-roll slaid animasi + sticker kartun pop-up. Guna bila Taufik attach 1 atau lebih klip video (.mp4/.mov, copywriting 5 poin dalam Bahasa Melayu) dan sering sekali satu helaian sticker 3x3, dan minta "edit video ni", "buat jadi video macam tadi", "edit ni next". Hasil: footage Taufik sebagai asas, hook tajuk merah stroke putih, chapter ikut poin, B-roll maroon (latar foto emas kabur, pil tajuk, baris label>>>nilai, kad, sticker pop-up elastik), kapsyen Poppins ExtraBold Italic putih (kata kunci emas), hard cut (TIADA transisi), audio = suara asal SAHAJA (TANPA muzik, TANPA SFX), outro 6s (semua sticker + "Tahniah tonton sampai habis!" + Like|Share|Follow + @taufik.pg).'
---

# taufik-video-edit — talking head + B-roll maroon + sticker pop-up

Skill ini membina video dengan enjin kanvas HTML (Playwright) → frame JPEG → ffmpeg. Semua fail ada dalam folder skill ini (template enjin, 14 foto emas, skrip, 21 contoh `references/scenes-*.js`).

## Keperluan (semak dulu!)
Perlu **code execution + internet**. Jalankan `sh scripts/check_env.sh`; kalau ada yang tiada: `sh scripts/setup.sh` kemudian `. ~/.video_env` (set NODE_PATH untuk playwright). Memerlukan: ffmpeg, node + playwright chromium, python (numpy scipy pillow), sherpa-onnx + model Whisper-small (muat turun dari GitHub release k2-fsa/sherpa-onnx; HuggingFace mungkin disekat).
- Kalau persekitaran TAK boleh pasang (tiada internet / tiada chromium): **beritahu Taufik terus**, jangan pura-pura render. Tawar: dia guna Claude Code (ada repo randomvideo) untuk render.
- Kalau tiada ASR sahaja: `python3 -I scripts/silence_segments.py voice.wav` untuk sempadan ayat, dan minta Taufik tampal naskhah ayat demi ayat.

## Input yang diharapkan
- 1+ klip video Taufik (urutan ikut masa rakaman) + **helaian sticker 3x3** (gambar) untuk topik tu. Kalau tiada helaian sticker: tanya (jangan reka watak lain). Footage biasanya 720x1280 — output tetap 1080x1920; beritahu bahawa footage tak jadi lebih tajam kalau sumber 720p.

## Aliran kerja
1. **Gabung klip** (kalau >1): `sh scripts/join_clips.sh work/full.mp4 klip1.mov klip2.mov ...` (susun ikut creation_time, seragamkan 720x1280@30, audio 44100 stereo). Beritahu Taufik susunan yang dipakai.
2. **Projek**: `sh scripts/new_video.sh work/video-<topik> work/full.mp4` → salin template + 14 foto emas ke `img/`, ekstrak `src/` frame + `voice.wav`, cetak `VOICE` & `HEADN`.
3. **Sticker**: simpan helaian → `python3 -I scripts/make_stickers.py sheet.jpg work/video-<topik>/img nama1 ... nama9` (tertib baca, nama pendek ikut teks sticker). **Buka `stickers-check.jpg`** dan sahkan nama = teks sticker (susunan tak dijamin). Helaian bersentuhan (outline putih bersambung) pun okay kerana potong ikut grid.
4. **Transkrip**: `python3 -I scripts/transcribe.py work/video-<topik>/voice.wav <folder-model>` (hasilkan `segs.json`). Ejaan Whisper SALAH banyak — betulkan ikut konteks (kewangan, emas fizikal, Public Gold, GAP, dsb.). Ayat kabur: `python3 -I scripts/retranscribe.py voice.wav <model> 20-25 ...` (bandingkan ms & id). Yang masih ragu → **senaraikan dalam laporan**.
5. **Tulis `scenes.js`** (mula dari `references/scenes-skeleton.js`; contoh terkini: `references/scenes-nelayan.js`, `scenes-skeptik.js`, `scenes-usia40.js`). Peraturan reka bentuk di bawah.
6. **Semak stills**: `cd work/video-<topik> && node render.js stills 1 7 16 ...` (pilih masa hook, B-roll, chapter, CTA) → `python3 -I scripts/contact_sheet.py stills sheet.jpg` → LIHAT sheet: teks keluar tepi? pil bertindih? sticker tutup kapsyen (y>1330 mesti kosong selepas BK)? Betulkan.
7. **Render penuh**: `node render.js` (~3–5 min). Semak `ffprobe` durasi == VOICE+6 dan `ffmpeg -af volumedetect` (tiada clipping).
8. **Hantar**: MP4 sebagai fail (attach/output chat). Kalau terlalu besar untuk dihantar, mampatkan (libx264 CRF 23, 1080x1920) dan beritahu saiz. Sertakan durasi + saiz.
9. **Laporan wajib**: (a) teks/dialog yang AKU reka (hook, label chapter, isi baris/kad, CTA); (b) perkataan transkrip yang tak pasti; (c) susunan klip + resolusi sumber; (d) apa-apa pilihan sticker yang tak padan.

## Peraturan reka bentuk (disahkan Taufik)
- **Satu design konsisten maroon-emas.** Jangan guna transisi (kertas koyak/api ditolak) — **hard cut sahaja**; animasi = sticker pop-up `stk()`.
- **Audio = suara asal sahaja** (`loudnorm=I=-16:TP=-1.5:LRA=9,apad=pad_dur=5`, `-t DUR`). TIADA muzik, TIADA SFX.
- **Hook** (adegan pertama, H): `hookTitle(lt,{tag,lines:[l1,l2],sub})` — Anton MERAH + stroke PUTIH tebal, pil tag emas di atas, pil maroon sub di bawah. Baris pendek (≤ ~14 aksara).
- **Struktur**: hook → B konteks → [chapter H → isi B] × 5 → B kesimpulan → B CTA (`CTA(lt, hero, h)` = "Dah Ready Nak Mula? / Mula Simpan Emas Hari Ini / Dulu Ragu, Kini Tahu! / Rujuk Pin Video") → **outro WAJIB**. Chapter = `MA.chapter(lt,n,l1,l2,sub,tag)` pada footage (`Hh`).
- **Outro WAJIB**: selepas suara tamat tambah 6s: `Object.assign(B(VOICE, DUR, 'tiers', WC.ma, lt => outroScene(lt, [9 sticker])), {nobk:true})`. `DUR = VOICE + 6`.
- B-roll: tajuk `ttl()`; max 3 baris `row()` (y 440/590/740) atau 2 `MA.tierCard` atau `mWhite` kad; sticker `stk(lt, at, IMG.x, 540, SB, 580–660)` di bawah. Masa `at` ikut masa ayat dituturkan. Tukar sticker dalam satu B-roll: `if (lt < t) stk(...) else stk(...)`. `mWhite` : tanda `*` (emas) hanya berfungsi di AWAL baris. Jangan guna nama pemboleh ubah `top`.
- **Kapsyen** `SEG` = `[mula, tamat, 'teks *kata *kunci']`, Poppins ExtraBold Italic putih, y=1390; bahagi ayat panjang kepada beberapa segmen mengikut jeda. Setiap B-roll tak boleh letak apa-apa di y>1330.
- Foto emas B-roll: kunci dalam `PH` (`tiers kg dulang merak100 bunga50 syiling g250 dinarPantai shop ipad binder bungamas wallet merak5`), `bakeAll()` sudah bake semua. Ubah antara adegan supaya tak ulang latar sama berturut-turut.
- **Kandungan**: Bahasa Melayu Malaysia; angka & harga HANYA dari apa yang Taufik sebut (cth RM100). Jangan reka pulangan/harga. Sebut "Public Gold/GAP" hanya kalau dia sebut. Teks rekaan pendek dibenarkan tapi WAJIB dilaporkan. Kandungan sensitif: nada hormat.
- Jangan edit `engine.js`, `run.js`, `render.js`, `index.html`.

## Fail dalam skill
```
assets/template/    engine.js run.js render.js index.html fonts/ (enjin; disalin ke projek oleh new_video.sh)
assets/photos/      14 foto emas (latar B-roll)
scripts/            check_env.sh setup.sh join_clips.sh new_video.sh make_stickers.py potong_grid.py transcribe.py retranscribe.py silence_segments.py contact_sheet.py
references/         scenes-skeleton.js + 21 contoh scenes-*.js
```

## Petua
- Nama folder projek = nama MP4 output (`work/video-<topik>/video-<topik>.mp4`).
- Kalau `render.js` tak jumpa playwright: `export NODE_PATH=$HOME/pwdeps/node_modules`.
- Loudnorm boleh potong ekor audio — sudah diatasi `apad` + `-t DUR`.
- Footage iPhone ada latar/ pantulan sendiri (cth cermin mata hijau) — itu dari rakaman, bukan ralat edit.
