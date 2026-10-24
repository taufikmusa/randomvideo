---
name: video-papercut
description: 'Edit video talking-head Taufik (@taufik.pg, Public Gold G100) jadi video menegak 1080x1920 gaya PAPER-CUT TERKINI: adegan bila Taufik bercakap = badan dipotong keluar (paper-cut, garis putih tebal + bayang) atas latar maroon dengan HEADLINE WALL (baris tajuk berulang memenuhi dinding), tajuk kecil dalam pil GLASS (kaca beku) di depan; slaid B-roll maroon-emas + sticker kartun pop-up (helaian 3x3) + klip screen-recording app Public Gold (assets/video/) dalam bingkai telefon; footage HD (1080x1920 Lanczos); SFX minimum (woosh -> pop -> ding), tiada muzik. Rujukan = video-5-langkah-app. Guna bila Taufik attach klip video + helaian sticker dan kata "edit ni", "macam video 5 langkah", "paper cut", "headline wall", "gaya glass", "gaya terkini", atau sekadar minta edit video talking-head tanpa sebut gaya (INI DEFAULT sekarang; video-sticker-edit lama = hanya bila dia minta gaya lama/honey/acid).'
---

# video-papercut — talking head paper-cut + headline wall + glass + sticker + klip app + SFX minimum

Ini gaya video lalai Taufik (ditetapkan 24 Okt 2026, "next time aku nak macamni"). Ia **membina atas skill `video-sticker-edit`** (join klip, sticker, Whisper, enjin canvas, laporan, cleanup). **Baca `skills/video-sticker-edit/SKILL.md` dahulu** (§1 bahan, §3 aliran, §4 peraturan reka bentuk, §5 scenes.js, §7 hantar/laporan/cleanup) — semua masih terpakai kecuali perkara di bawah yang MENGGANTIKAN.

## Apa yang berbeza (ringkas)
| Perkara | video-sticker-edit (lama) | video-papercut (DEFAULT) |
|---|---|---|
| Adegan Taufik bercakap (hook, chapter, kesimpulan) | footage penuh + tajuk di atas | **talkScene**: badan paper-cut garis putih atas maroon + headline wall + pil glass |
| Tajuk kecil (tag/sub) | pil emas/maroon | **pil glass** (blur backdrop, tint putih, border cahaya) di depan badan |
| Footage | 720p dibesarkan enjin | **frame HD 1080x1920** (Lanczos+sharpen) diekstrak untuk adegan bercakap sahaja |
| Klip app | tiada | **`Cl()`**: klip dalam bingkai telefon + sticker di bawah |
| Audio | suara asal sahaja | suara asal + **SFX minimum** (woosh x3 -> pop -> ding), TIADA muzik |
| Gradient gelap footage | .72 | lebih nipis (jelas) — sudah dalam `engine.js` template |

## Fail
```
skills/video-papercut/
  assets/template/engine.js        engine HD (naturalWidth, gradient nipis) — tindih enjin projek
  assets/template/render.js        render.js + hook loadClip(t) + JPEG .97 + CRF 16
  assets/template/scenes-head.js   kepala scenes.js (PH, ttl, row, CTA, phone, Cl, glassPill, talkScene, CH) — SALIN, ubah ASSETS/CLIPN
  references/scenes-5-langkah-app.js  scenes.js penuh yang dah disahkan Taufik (RUJUKAN UTAMA: SEG, SCENES, tempoh, kiraan baris)
  scripts/new_project.sh           new_video.sh + tindih engine/render
  scripts/hd_frames.sh             frame HD untuk julat adegan bercakap
  scripts/cutout.py                paper-cut: segmentasi badan -> RGBA WebP + garis putih
  scripts/clip_frames.sh           frame klip app -> clip/<kunci>/
  scripts/mix_sfx.sh               campur SFX selepas render (suara asal sahaja), semak peak
  scripts/setup_models.sh          model u2net (GitHub) + semakan model whisper
```
Skrip dalam `video-sticker-edit/scripts/` (join_clips, make_stickers, transcribe, retranscribe, contact_sheet) diguna terus. Aset: `assets/sfx/` (woosh, pop=sfx-1, bell/ding, swish, click, punch, typing), `assets/video/` (5 klip tutorial app: daftar, install, login, topup, withdraw — e-mel & IC dah diblur).

## Persediaan (sekali setiap session)
```
sh skills/video-sticker-edit/scripts/check_env.sh      # ffmpeg, node, playwright, sherpa-onnx, model whisper
sh skills/video-sticker-edit/scripts/setup.sh          # kalau whisper tiada (muat turun dari GitHub)
sh skills/video-papercut/scripts/setup_models.sh       # u2net_human_seg.onnx -> /root/seg (170MB, GitHub). HuggingFace DISEKAT (403).
unset NODE_PATH                                        # sebelum node render.js
```

## Aliran kerja
1. **Bahan** (video-sticker-edit §1): susun klip ikut ISI suara; helaian sticker .webp -> .jpg (PIL). Tanya jika sticker tiada.
2. `NOSORT=1 sh skills/video-sticker-edit/scripts/join_clips.sh work/full.mp4 klip1 klip2 ...`
3. `sh skills/video-papercut/scripts/new_project.sh video-<topik> work/full.mp4` (cetak VOICE/HEADN)
4. Sticker: `python3 -I skills/video-sticker-edit/scripts/make_stickers.py sheet.jpg video-<topik>/img n1..n9` (tertib baca) -> **buka `stickers-check.jpg` dan sahkan nama**.
5. Transkrip: `python3 -I skills/video-sticker-edit/scripts/transcribe.py video-<topik>/voice.wav /root/asr/sherpa-onnx-whisper-small`; ayat kabur -> `retranscribe.py` (ms vs id). Padam `segs.json`.
6. **Tentukan adegan bercakap** (SEMUA adegan Taufik atas kamera: hook, chapter/kesimpulan). Julat = mula/tamat adegan +/- 0.1s.
7. `sh skills/video-papercut/scripts/hd_frames.sh work/full.mp4 video-<topik>/src <julat...>` (HD, tindih frame 720p).
8. **Paper-cut** (di background, ~1.3s/frame; 200 frame ≈ 5 min): `python3 -I skills/video-papercut/scripts/cutout.py video-<topik>/src video-<topik>/clip/cut /root/seg/u2net_human_seg.onnx <julat...>` -> `clip/cut/%04d.webp` (nombor = index frame src). Semua julat dalam satu panggilan atau panggilan berasingan, folder sama.
9. Klip app (jika topik tentang app): `sh skills/video-papercut/scripts/clip_frames.sh video-<topik> daftar:app-01-daftar.mp4 install:app-02-install.mp4 ...` (cetak `CLIPN`).
10. **Tulis `scenes.js`**: salin `assets/template/scenes-head.js` + ikut `references/scenes-5-langkah-app.js`. Ubah VOICE/DUR/HEADN, ASSETS (sticker), CLIPN. Lihat "scenes.js" di bawah.
11. Stills: `node render.js stills <masa...>` -> `python3 -I skills/video-sticker-edit/scripts/contact_sheet.py stills sheet.jpg` -> LIHAT. Semak: teks keluar tepi? pil bertindih? kapsyen (y>1330) bersih? phone/ sticker bertindih?
12. `node render.js` (~4-5 min). Hasil = voice-only. Kemudian **SFX**: `sh skills/video-papercut/scripts/mix_sfx.sh video-<topik>/video-<topik>.mp4 woosh@.. woosh@.. woosh@.. pop@.. pop@.. bell@..` (lihat SFX).
13. Semak: `ffprobe` durasi == VOICE+6 (+/-0.1s), peak SFX output < -1 dB (skrip cetak), sample rate 44100.
14. Hantar/laporan/cleanup: video-sticker-edit §7 (link GitHub raw; TIDAK hantar MP4 dalam chat).

## scenes.js — komponen
- `talkScene({wall:[baris1, baris2], tag, sub})` — adegan bercakap. Daftarkan klip paper-cut: `CLIPS.push({ a, b, key:'cut', rate:1, ext:'webp', off: Math.round(a*30) })` (off = 0 jika a=0) lalu `Object.assign(B(a, b, 'tiers', WC.ma, talkScene({...})), { nobk: true })`.
  - Wall: Anton 150px, pitch 165, 12 baris berselang-seli `wall[0]/wall[1]`; 2 baris atas PEPEJAL (emas gradien + putih, stroke maroon gelap), selebihnya garis putih (alpha .36 -> .09), masuk berselang dari kiri/kanan + goyang perlahan. `wall` ≤ ~13 aksara/baris (fit lebar). Kata wall = tajuk hook / label chapter.
  - Badan: skala .94 berpaut bawah-tengah, bayang jatuh; pop-in .55s.
  - Pil glass: `tag` (atas, y=62) dan `sub` (atas badan, y=1235; pilih ayat PENDEK dari suara sebenar).
- Slaid B-roll biasa: `ttl()`, `row()` (y 440/590/740, max 3), `stk()` — sama seperti video-sticker-edit §4. Jangan letak apa-apa y>1330.
- Klip app: `Cl(a, b, bg, tajuk, sticker, kunci, rate, size, h)`. `rate` = kelajuan klip: **jangan lebih 1.3x**; klip lebih pendek berhenti di frame akhir; lebih panjang dipotong. Pilih rate ~ tempoh klip / tempoh adegan.
- CTA: `CTA(lt, hero, 620)` (teks butang ikut suara sebenar: "Daftar Percuma" / "Rujuk Pin Video").
- Mula dengan hook adegan bercakap (0 - ayat pertama ~4-7s). Susunan: hook(talk) -> 1-2 slaid konteks -> langkah/poin (B atau Cl) -> kesimpulan(talk) -> CTA -> outro 6s (`DUR = VOICE + 6`).
- Kapsyen `SEG`, `*` = perkataan emas — ejaan BETUL, bukan ejaan Whisper.

## SFX minimum (peraturan Taufik)
- 3 bunyi sahaja: **woosh** pada 3 peralihan poin pertama -> **pop** (`sfx-1.wav`) pada poin ke-4, ke-5 dan seterusnya -> **ding/loceng** (`sfx-bell.wav`) pada CTA. TIADA muzik. Letak SFX ~0.1s SEBELUM adegan bermula.
- Jangan tambah SFX lain melainkan diminta. Gain lalai dalam skrip: woosh 2, pop .9, bell 2.2 (suara .85). Untuk "pop": Taufik belum sahkan sfx-1 vs sfx-2 — kalau dia kata salah, tukar `pop` dalam `mix_sfx.sh` kepada `sfx-2`.
- `alimiter=...:level=0` WAJIB (auto-level menaikkan bunyi) dan `aresample=44100` + `-ar 44100` (tanpa itu AAC jadi 96 kHz). Peak < -1 dB. Skrip sudah buat semua ini.
- `voice-only.mp4` disimpan di sebelah MP4 supaya `mix_sfx.sh` boleh diulang; JANGAN commit.

## Perangkap yang dah dilalui
- Frame `src/` 720p (dari new_video.sh) mesti diganti dengan HD untuk julat adegan bercakap, dan enjin `engine.js` template ini guna `naturalWidth/Height` supaya HD & 720p boleh bercampur.
- Mask AI: tepi licin (rasa gunting kertas); sofa putih di bawah-kiri kadang termasuk. Mic di depan badan dikepung (isi lubang). Semak 2-3 frame sebelum render penuh; kalau teruk, naikkan `CUT_STROKE` atau potong kawasan.
- `glassPill` melukis canvas ke dirinya sendiri dengan `filter: blur()` — berfungsi di Chromium Playwright; kekalkan 2D canvas 1080x1920.
- Klip app: `clip/` (~70MB), `src/`, `voice.wav`, `voice-only.mp4`, `out/`, `stills/` = sementara — BUANG sebelum commit (atau `.git/info/exclude`). Stop-hook git akan minta commit; commit kod sahaja (scenes.js, engine.js, render.js, mix_sfx command dalam laporan).
- Klip app: e-mel & IC dalam `assets/video/` sudah diblur; rakaman baru WAJIB diperiksa dan diblur sebelum disimpan.
- GitHub amaran fail >50MB: tak apa (had 100MB). Video ~40MB biasanya.
- Taufik kadang tukar rancangan: "tak lama ada glow tu" -> buang. Ikut kehendak terkini; jangan kekalkan efek yang dia kata tak perlu.

## Projek rujukan (kod kekal dalam repo)
`video-5-langkah-app` (klip app + 3 woosh/2 pop/ding + paper-cut hook & kesimpulan), `video-harga-jatuh-peluang` (HD + footage chapter lama), `video-ansuran-kereta`, `video-bantu-keluarga`, `video-gaji-tak-naik` (gaya lama maroon-sticker).
