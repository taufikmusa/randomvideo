---
name: video-explainer-3d
description: 'Edit video talking-head Taufik (@taufik.pg) LANDSCAPE 1920x1080 gaya EXPLAINER DOKUMENTARI + graphic Three.js, dari folder Google Drive (Reference video, Cut-NN green-screen, B-roll). Taufik (cutout) di kiri/kanan berselang perlahan, teks kinetik Inter + counter emas, kad B-roll menegak, stage 3D (pedestal/bar emas/ikon low-poly) dengan kamera dolly. Guna bila Taufik kongsi pautan Google Drive (folder reference + Cut-NN + B-roll) dan kata "tiru gaya video ni frame by frame", "guna Three.js", "size 1920x1080", "cut out aku di kiri/kanan". BERBEZA daripada video-sticker-edit (menegak 1080x1920 + helaian sticker).'
---

# video-explainer-3d — explainer 16:9 + cutout kiri/kanan + Three.js

Projek rujukan (kod kekal dalam repo): **`video-cut01-pg/`** (`main.js` = semua adegan/overlay/3D, `render.js`, `index.html`, `tools/`). Salin folder tu sebagai titik mula; ganti garis masa teks, kad B-roll dan ikon 3D mengikut skrip baru.

## 1. Bahan dari Google Drive
- Taufik beri 3 folder: **Reference** (1 MP4 gaya yang ditiru), **Cut-NN** (video yang diedit; biasanya `Cut-01.mp4`), **B-roll** (ratusan klip menegak 720x1280).
- Senarai fail: `mcp__Google_Drive__search_files` dengan `parentId = '<folderId>'` (ID dalam URL folder). Hasil besar disimpan ke fail `tool-results/*.json` → ekstrak `id`/`title` dengan `python3 -I` (jangan baca terus). Halaman seterusnya: `pageToken`.
- **Muat turun: `curl -L -o fail.mp4 "https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t"`** (jalan melalui proxy, saiz byte tepat). JANGAN guna `download_file_content` (base64 dalam konteks).
- Simpan dalam scratchpad, bukan repo. B-roll: tarik yang perlu sahaja (nama klip menunjukkan isi: `Emas-10gram`, `Emas-100gram`, `Emas-1000gram`, `Others-kaabah`, `Graduate`, `23.modern house exterior`, `22.house keys handover`, `19.family dinner`, `Others-kerja`, `Others-menabung`, `Emas-1gram-album` dsb.). Semua B-roll **menegak** → guna sebagai kad menegak, bukan latar penuh.

## 2. Analisis rujukan (tiru "frame by frame")
- `ffmpeg -vf fps=1,scale=480:270` → contact sheet 12 frame; zum halus (`-ss` setiap 0.12-0.14s) pada animasi masuk teks/stamp/counter. Sampel warna dengan PIL. Rujukan "Reference Video 16x9" (1280x720):
  - Teks kiri-selaras, **Inter ExtraBold/Black**, tracking rapat (-0.028em), putih + sorotan **gold #EDBF44**; masuk perkataan demi perkataan (blur+naik), keluar fade+blur.
  - **Counter** nombor emas besar (count-up) + label putih kapital di bawah ("23 / TAHUN KEMUDIAN").
  - **Stamp** kotak emas condong -3° (teks hitam Inter 900) masuk besar+kabur lalu mendarat.
  - **Tag** putih dengan garis penunjuk (tooltip), skrol/triptych panel, gradient gelap, globe 3D / adegan low-poly 3D.
  - Lencana "like" biru (#1877F2) bulat kanan-bawah sepanjang video (ada dalam rujukan; kekal tapi sebut dalam laporan, mudah buang: fungsi `likeBadge`).
- Audio rujukan: tak tiru muzik; guna suara asal sahaja (peraturan Taufik).

## 3. Cutout Taufik
- **Cut-NN sudah green screen (#00FF00) + outline putih** (720x1280, badan di bahagian bawah, kepala mula ~y=385). Guna chroma-key, BUKAN matting AI:
  `python3 -I video-cut01-pg/tools/key_frames.py Cut-01.mp4 <scratch>/keyed 370` → RGBA PNG 720x910 ber-crop, bintik kecil dibuang (~3 min untuk 1,771 frame, ~1.4 GB). Symlink ke `assets/keyed` (jangan commit).
- Susunan: Taufik skala 1.05, bawah-selaras, kiri `x=-8` / kanan `x=1172`. **Berselang perlahan**: tukar sisi hanya pada sempadan topik besar (≥ ~15s antara tukar), glide 1.1s (`eio`), kamera 3D mengikut (offset pedestal 1090↔830 px).
- (RVM `rvm.onnx` dari GitHub release `PeterL1n/RobustVideoMatting` + `mediapipe` boleh dipasang bila bahan BUKAN green screen; skrip `tools/rvm_matte.py` tiada dalam repo, tulis semula jika perlu.)

## 4. Transkrip + sync (PENTING: angka)
- Guna **Whisper medium** (jauh lebih tepat daripada small untuk angka gram/RM): `curl -L -o medium.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-medium.tar.bz2` (1.9 GB, ~1-2 min) → `/root/asr/`. `transcribe.py`/`retranscribe.py` dalam `skills/video-sticker-edit/scripts` hardkod awalan `small-` → `sed 's/small-/medium-/g'`. Banding versi `ms` vs `id`.
- Whisper tiada timestamp perkataan → `tools/align_words.py` (decode awalan + carian binari) beri saat perkataan/angka ditutur; ~25s setiap pola. Anggar perkataan lain secara berkadar dalam segmen.
- Betulkan ejaan ikut konteks; senarai yang ragu dalam laporan ("sekeping 10g", "pembiayaan", "Ekosistem GAP Public Gold").

## 5. Enjin (video-cut01-pg)
- Playwright chromium + **WebGL SwiftShader**: args `--use-angle=swiftshader --use-gl=angle --enable-unsafe-swiftshader --ignore-gpu-blocklist`; `require('/opt/node22/lib/node_modules/playwright')`. `three@0.170.0` disalin ke `assets/vendor/three` (import map dalam `index.html`; `npm install three@0.170.0` kemudian salin `build/three.module.js` + `examples/jsm/environments/RoomEnvironment.js` + `geometries/RoundedBoxGeometry.js`). Font Inter 500/800/900 dari `taufik-video-edit/assets/template/fonts`.
- `renderFrame(n)` deterministik (semua ikut `t`): Three.js → vignette → Taufik → kad B-roll → teks/counter/stamp/tag → lencana → fade. 4 worker, ~1 frame/saat (1,800 frame ≈ 27 min), kemudian ffmpeg (CRF 17, suara asal `loudnorm`).
- Stage 3D: pedestal berundak (tinggi naik), bar emas ExtrudeGeometry (trapezoid) + RoomEnvironment (gold metalness 1), ikon low-poly per tier (tunai/syiling, topi graduasi, Kaabah, rumah+pokok, kereta, perisai+keluarga, anak benih), garis laluan emas, debu emas, kamera dolly `UKEY`, `setViewOffset` untuk letak 3D dalam separuh skrin kosong, pandangan luas untuk rekap (fog dinamik).
- Susun atur 1920x1080 (Taufik kiri): zon teks `x=800` (kanan: 520) `y=92..~560`; kad B-roll 420x747 di `x=1440` (kanan: 60), `y=150`; zon 3D `y>=540`, pedestal di `x≈1090` (kanan: 830). Teks maks ~600px lebar; jangan langgar kad.

## 6. Perangkap yang dah kena
- Pra-muat kad sebelum `t0` → indeks frame negatif → 404: guna `Math.max(0, t - t0)`.
- `CanvasTexture` latar mesti `colorSpace = SRGBColorSpace` (kalau tak, latar kelabu-biru terang).
- `scene.fog` jauh mematikan pandangan luas: tingkatkan `near/far` bila `ww` (wide) naik.
- Bar emas besar menutup ikon: bar di depan-kiri (z .85, skala .58), ikon belakang-kanan skala 1.3, kamera tinggi (+2.5).
- Teks tertindih: pastikan blok teks keluar (`tEx`) sebelum blok seterusnya masuk; tag/stamp elak zon sama.
- Counter label `y + .8s + .47s` (elak langgar descender "g").
- Whisper "sekeping 10g" ditranskrip "skrping/scoping".


## 6b. Prestasi render (SwiftShader, 4 teras) — dah diukur
- Asal ~4 s CPU/frame (≈ 2 jam). Selepas optimum **~0.75 s/frame**, 3 worker ≈ 1.6 fps → 1,800 frame ≈ 19 min.
- **`ctx.filter = blur()` pada kanvas 2D raster CPU = sangat lambat** (proses seluruh kanvas setiap panggilan, ~50 ms/teks). Ganti dengan `blurText()` (lukis teks pada kanvas 1/k lalu skala semula) → teks 308 ms → 14 ms.
- `shadowBlur` pada kotak/kad/teks: ganti bayang offset gelap (tanpa blur) atau cache bayang pada kanvas luar skrin (kad). Vignette: cache kanvas.
- `measureText` untuk beat tak aktif setiap frame: early-return mengikut tetingkap `[t0, tEx]`.
- `getContext('2d', { willReadFrequently: true })` (raster CPU) lebih laju daripada kanvas GPU perisian di sini.
- Profil: `?prof=1` paksa `getImageData` selepas setiap peringkat (operasi kanvas ditangguh, kos muncul pada `toDataURL`), `?nogl=1`, `?noov=1`, `?gs=0.75`, `?aa=0` ialah suis ujian dalam `main.js`; bench: render 7 frame berturutan di satu page dan ukur ms/frame.

## 6c. Thumbnail terbenam (WAJIB, setiap video)
- Taufik mahu SETIAP video ada thumbnail (tajuk + topik) di **0.1s pertama** supaya masa upload (IG/FB/TikTok) pilihan cover nampak thumbnail + tajuk video.
- Templat 16:9: `scripts/thumb.html` + `shot.js` (Playwright screenshot 1920x1080). Gaya: latar navy + bokeh emas, chip `@taufik.pg`, tajuk Poppins 800/900 italic (krim + emas), pil putih fon Mono (subtopik), polaroid B-roll emas condong, cutout Taufik besar di kanan (pilih frame `assets/keyed/NNNNN.png` mata terbuka, pegang gold bar; mask pudar tepi kiri sebab crop tangan). Warna ikut tema video (navy/emas); contoh rujukan Taufik = thumbnail menegak maroon/oren (Poppins italic, pil mono) — warna ditukar, fon sama.
- Tajuk = soalan/hook video (cth "Kenapa ramai nak jadi DEALER Public Gold?"). Hantar JPG dalam chat (SendUserFile) supaya Taufik nampak.
- Selepas render siap: `sh scripts/embed_thumb.sh <video.mp4> <thumbnail.jpg>` (tampal 0.1s + cover MP4). Video menegak 1080x1920 (video-sticker-edit): sama, buat thumbnail menegak ikut helaian rujukan; skrip skala automatik.
- Thumbnail JPG disimpan dalam folder projek (`thumb/`) dan dicommit.

## 7. Hantar
- MP4 1920x1080 ~60s (~40-60 MB): commit + push, link raw GitHub, durasi + saiz + max audio (peraturan CLAUDE.md). "dah download"/"cleanup" → `git rm` MP4 + buang `assets/broll`, `assets/keyed`, `out/`, `stills/`, `segs.json`.
- Laporan: sumber Drive dipakai, susunan sisi Taufik (masa tukar), teks yang saya reka, angka yang Taufik sebut, transkrip yang ragu, B-roll dipilih per tier, lencana like (boleh buang).
