---
name: video-sticker-edit
description: 'Edit video talking-head Taufik (@taufik.pg, Public Gold G100) jadi video menegak 1080x1920 30fps dengan B-roll slaid + sticker kartun pop-up (helaian sticker 3x3). DEFAULT = maroon-emas. Guna bila Taufik attach 1-4 klip video (S1-1, S1-2 ...) + helaian sticker 3x3 dan kata "edit ni", "next", "proceed", "buat video ni", atau sebut warna lain (honey gold, acid yellow). Termasuk aliran cleanup bila dia kata "dah download"/"cleanup".'
---

# video-sticker-edit — talking head + B-roll + sticker pop-up

> **NOTA (24 Okt 2026):** gaya lalai SEKARANG ialah `skills/video-papercut/` (paper-cut + headline wall + glass + klip app + SFX minimum). Skill ni kekal sebagai asas (skrip, enjin, laporan) dan untuk gaya lama bila diminta.

Enjin kanvas HTML (Playwright) → frame JPEG → ffmpeg. Semua fail dalam folder skill ni (`SK=skills/video-sticker-edit`). Salinan skill akaun `taufik-video-edit` pun ada, tapi yang dalam repo ni lebih lengkap (tema warna, nota Whisper, aliran hantar/cleanup). **Jangan edit `assets/template/` ni**; tema warna dibuat pada SALINAN `engine.js` dalam folder projek.

## 1. Bila Taufik hantar bahan
- **Satu mesej boleh ada banyak video** (cth 2 helaian sticker + 4 klip). Padankan pasangan klip ↔ helaian ikut ISI suara (transkrip dulu, lihat topik), bukan ikut urutan lampiran.
- **Susunan klip** dalam satu video: ikut nombor fail (`S5-1` dulu, `S5-2` kemudian), BUKAN urutan lampiran (dia selalu lampir `-2` dulu). Guna `NOSORT=1` pada `join_clips.sh`. Beritahu susunan dalam laporan.
- **Warna**: DEFAULT **maroon**. Warna lain HANYA bila dia sebut (lihat §6). "macam tadi" = guna warna terakhir yang dia minta; "maroon as default ya" = kembali maroon.
- Footage biasanya 720x1280, output 1080x1920 (tak jadi lebih tajam; sebut dalam laporan sekali-sekala).
- Helaian sticker tiada → tanya. Jangan reka watak lain.

## 2. Persediaan persekitaran (sekali setiap session)
```
sh $SK/scripts/check_env.sh        # ffmpeg, node, playwright, python, sherpa-onnx, model whisper
sh $SK/scripts/setup.sh            # kalau model whisper tiada (muat turun ~600MB). "playwright install" gagal = ABAIKAN (chromium dah ada di /opt/pw-browsers)
```
- **`unset NODE_PATH` sebelum `node render.js`** (NODE_PATH dari `~/.video_env` tunjuk playwright baru yang chromium-nya tiada; fallback `/opt/node22` berfungsi).
- Model: `/root/asr/sherpa-onnx-whisper-small`.
- Jalankan skrip Python dengan `-I`. `transcribe.py` menulis `segs.json` dalam cwd → **padam `segs.json`** (stop-hook git akan marah kalau tertinggal sebagai untracked).

## 3. Aliran kerja (satu video)
Projek = `video-<topik>/` di akar repo (nama folder = nama MP4). Fail sementara dalam `work/` (padam di hujung).
```
mkdir -p work
NOSORT=1 sh $SK/scripts/join_clips.sh work/full.mp4 klip-1.mp4 klip-2.mp4
sh $SK/scripts/new_video.sh video-<topik> work/full.mp4     # salin enjin+fonts+14 foto emas, ekstrak src/ + voice.wav; cetak VOICE & HEADN
# helaian sticker .webp -> .jpg dulu (PIL), kemudian:
python3 -I $SK/scripts/make_stickers.py sheet.jpg video-<topik>/img nama1 ... nama9   # 9 nama pendek, TERTIB BACA (kiri->kanan, atas->bawah)
#   -> BUKA video-<topik>/stickers-check.jpg dan sahkan nama = teks sticker
python3 -I $SK/scripts/transcribe.py video-<topik>/voice.wav /root/asr/sherpa-onnx-whisper-small    # segs
python3 -I $SK/scripts/retranscribe.py voice.wav <model> 20-25 ...   # ayat kabur; banding versi ms & id
# tulis video-<topik>/scenes.js  (lihat §5)
cd video-<topik> && unset NODE_PATH
node render.js stills 1 7 14 ... && python3 -I ../$SK/scripts/contact_sheet.py stills sheet.jpg   # LIHAT sheet.jpg
node render.js                                              # ~3-5 min -> video-<topik>.mp4
ffprobe -v error -show_entries format=duration,size -of compact video-<topik>.mp4   # mesti == VOICE+6
ffmpeg -i video-<topik>.mp4 -af volumedetect -vn -f null - 2>&1 | grep max_vol        # jangan clipping (> -1.0 dB = beritahu)
```
Semak stills: teks keluar tepi? pil bertindih? baris hook terlalu rapat tepi? kapsyen (y>1330) bersih? Betulkan sebelum render penuh.

## 4. Peraturan reka bentuk (disahkan Taufik)
- **Satu design konsisten.** **Hard cut sahaja** (tiada transisi). Animasi = sticker pop-up `stk()`.
- **Audio = suara asal sahaja** (loudnorm, apad, `-t DUR`). TIADA muzik/SFX. Enjin dah uruskan. Pengecualian: bila Taufik MINTA SFX, guna `assets/sfx/*.wav` (lihat `assets/README.md`: bell, click-mouse, punch-damage, sfx-1/2) dan mix selepas render dengan `adelay`+`amix`+`alimiter`.
- **Struktur**: hook → B konteks (1-2 slaid) → [chapter H (footage) → B isi] × 5 → B penutup (sticker pendek 2-4s) → B CTA → **outro 6s WAJIB** (`DUR = VOICE + 6`).
- **Chapter** `Hh(mula, tamat, CH(n,'Baris1','Baris2',null), dir, WC.ma)`: mula pada awal ayat yang ada "Pertama/Kedua/...", biasanya 3-5s; `dir` selang `-1`/`1`. Tag chapter ikut topik (`SEBAB`, `CARA`, `AZAM`, `MITOS`...). Teks chapter ringkas (≤ ~20 aksara/baris).
- **B-roll** `B(mula, tamat, 'foto', WC.ma, lt => {...})`: `ttl(lt,'Tajuk',size)` (size 80-110, kecil bila tajuk panjang), max 3 baris `row(lt, at, y, 'label', 'NILAI')` pada y **440/590/740**, atau `mWhite` kad (tanda `*` emas hanya di AWAL baris), + `stk(lt, .4, IMG.sX, 540, SB, 600-680)` di bawah. `at` = saat ayat itu dituturkan − mula adegan. Tukar foto latar antara adegan (kunci `PH`: tiers kg dulang merak100 bunga50 syiling g250 dinarPantai shop ipad binder bungamas wallet merak5). **Jangan letak apa-apa di y>1330** pada B-roll (kapsyen).
- Satu sticker satu slaid; sticker boleh diguna semula jika bilangan slaid > 9 (sebut dalam laporan). Slaid pendek (2-4s) = tajuk + sticker sahaja.
- **Hook** (adegan pertama, sehingga hujung ayat pertama ~3-5s): `hookTitle(lt,{tag,lines:[l1,l2],sub})`, baris ≤ ~14 aksara (ditolak tepi kalau lebih), fade keluar di hujung. Anton MERAH + stroke putih (maroon). Tema lain: lihat §6.
- **Kapsyen** `SEG=[mula,tamat,'teks *kata *kunci']`: Poppins ExtraBold Italic putih, y=1390, `*` di depan perkataan = emas. Pecahkan ayat panjang ikut jeda (≤ ~4s setiap segmen). Tulis ejaan BETUL (bukan ejaan Whisper).
- **CTA** bermula pada ayat "Tuan puan yang dah ready nak mulakan simpan emas..." hingga akhir suara; `CTA(lt, IMG.sHero, 620)`; outro `outroScene(lt,[9 sticker])`.
- **Kandungan**: Bahasa Melayu Malaysia. Angka/harga HANYA yang Taufik sebut (RM100, 30 tahun, 10% ...). Jangan reka pulangan. "Public Gold/GAP" hanya kalau dia sebut. Topik sensitif (cerai, hospital, ibadah): nada hormat, jangan tambah dakwaan. Teks rekaan pendek dibenarkan tapi WAJIB dilaporkan.
- Rujukan lengkap: `references/scenes-maroon-azam.js` (terkini, maroon), `scenes-skeleton.js`, dan 20 contoh lain. Mulakan `scenes.js` dengan menyalin kepala fail (PH, ttl, row, CTA, BAKE, bakeAll) dari rujukan itu.

## 5. Menulis scenes.js (cara cepat)
1. `VOICE`, `HEADN` dari output `new_video.sh`. `ASSETS = {...PH, sNama:'stk-nama.png', ...}`.
2. Dari transkrip yang dibetulkan, sempadan segmen Whisper jadi sempadan `SEG`; sempadan adegan = hujung/mula ayat (ordinal "Pertama"... mula chapter).
3. Jangan percaya masa chapter 100%: ordinal biasanya bermula ~0.5-1s sebelum akhir segmen sebelumnya.
4. Render stills di tengah setiap jenis adegan (hook, B, chapter, CTA, outro) sebelum render penuh.

### Pembetulan Whisper (kerap salah)
`simpan emas` → "si panak mas / simpat mas" · `Public Gold` → "pabrikol/public goal" · `kewangan` → "keuangan" · `kahwin` → "kawin" · `ansuran`, `peribadi`, `hartanah`, `inflasi`, `kecemasan`, `akaun`, `aset`, `fizikal`, `istiqamah`, `kuasa beli`, `gram emas` ("GrabMask") · `Tuan puan` → "tumpuan/tompan" · `rujuk pin video` → "rujok/rujut" · `Dulu ragu kini tahu` · `puluhan ribu ringgit`. Ayat kabur: `retranscribe.py` (banding ms vs id). Yang masih ragu → **senarai dalam laporan**.

## 6. Tema warna (hanya bila Taufik sebut)
Pada SALINAN `video-<topik>/engine.js` (sebelum render), kemudian guna `copy` foto/aset sama:
```
python3 -I $SK/scripts/retheme.py video-<topik>/engine.js --theme honey                 # Honey Gold #FEC40B
python3 -I $SK/scripts/retheme.py video-<topik>/engine.js --theme acid --title-font inter  # Acid Yellow #EFFF00
```
- `honey`: aksen #FEC40B, pil/baris hitam, overlay foto .80. `acid`: aksen #EFFF00, overlay .50 (sengaja kurang supaya foto emas masih nampak). Dua-dua tambah gradient gelap di bawah supaya kapsyen jelas.
- `--title-font inter`: hook Inter ExtraBold Title Case (rujukan "Luxury • Confident • Premium" yang Taufik tunjuk), baris 1 putih, baris 2 warna tema, extrude 3D + kilat. Tanpa flag = Anton. Boleh digabung dengan `honey`.
- Warna baru lain: tambah entri `T[...]` dalam `retheme.py`.
- Projek rujukan (kod kekal dalam repo): `video-mitos` (honey), `video-pendidikan` (acid + Inter), `video-azam` (maroon).

## 7. Hantar, laporan, cleanup
- **MP4 JANGAN hantar dalam chat.** Commit + push ke branch sesi, beri link raw: `https://github.com/taufikmusa/randomvideo/raw/<branch>/<projek>/<projek>.mp4` + durasi (suara + 6s) + saiz + max audio. (iPhone: buka link → Share → Save Video.)
- Sebelum commit buang: `src/ src.mp4 out/ stills/ voice.wav sheet.jpg stickers-check.jpg segs.json work/`. Commit kekalkan `scenes.js`, `engine.js`, `fonts/`, `img/`, `index.html`, `render.js`, `run.js` + MP4.
- **Laporan wajib** (Melayu Malaysia santai, istilah teknikal English, terus ke point, tak terlalu empati): (a) susunan klip; (b) teks yang AKU reka (hook tag/tajuk/sub, label chapter, tajuk+baris slaid, CTA); (c) transkrip yang tak pasti (ayat + apa Whisper dengar); (d) sticker yang diguna dua kali; (e) catatan lain (audio dekat ceiling, slaid nipis).
- Bila Taufik kata **"dah download" / "ok" / "cleanup"**: terus `git rm <projek>/<projek>.mp4`, buang fail sementara, commit `Cleanup <projek> (Taufik dah download)`, push. Tak perlu tanya. Kod/fonts/img kekal untuk revisi.
- Banyak video dalam satu mesej: proses satu demi satu (transkrip + sticker ikut pasangan), render berturut-turut, satu commit, satu laporan dengan seksyen setiap video.
- Hantar gambar/carousel guna skill carousel (lain). Skill ni hanya untuk video.

## Fail
```
assets/template/   engine.js run.js render.js index.html fonts/  (maroon asal; jangan edit)
assets/photos/     14 foto emas untuk B-roll
scripts/           check_env.sh setup.sh join_clips.sh new_video.sh make_stickers.py potong_grid.py transcribe.py
                   retranscribe.py silence_segments.py contact_sheet.py retheme.py
references/        scenes-maroon-azam.js (terkini) + scenes-skeleton.js + contoh lain
```

## 8. Glow body effect (bila Taufik minta "glow body")
Glow emas di luar siluet badan, dibakar terus ke frame `src/` (engine tak perlu diubah). Hanya untuk adegan footage `Hh(...)` (hook + chapter).
```
# model (sekali, ~170MB; GitHub boleh, HuggingFace disekat): /root/seg/u2net_human_seg.onnx
curl -sSL -o /root/seg/u2net_human_seg.onnx https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net_human_seg.onnx
python3 -I $SK/scripts/glow.py video-<topik>/src <out_dir> /root/seg/u2net_human_seg.onnx 0-5.9 21.9-25.6 ...   # julat saat = semua Hh(mula,tamat) +/- 0.1
cp <out_dir>/*.jpg video-<topik>/src/        # kemudian render stills/penuh seperti biasa
```
- ~1 saat/frame (CPU). Jalankan di background (`run_in_background`), 750 frame ≈ 12 min. Proses HANYA julat Hh, bukan semua frame.
- Skrip isi lubang mask (mic di depan badan), gelapkan latar 30% supaya glow nampak pada dinding putih, dan lembutkan mask antara frame. Glow berdenyut halus.
- Selepas projek siap & dihantar, fail `src/` dibuang seperti biasa.

## 9. Klip app + SFX minimum (rujukan: `video-5-langkah-app/`)
- **Klip app sebagai B-roll**: ekstrak frame `assets/video/app-*.mp4` ke `clip/<kunci>/%04d.jpg` (`ffmpeg -vf fps=30,scale=540:-1 -q:v 2`, SEMENTARA, jangan commit). `scenes.js` ada pembantu `Cl(a,b,bg,tajuk,sticker,kunci,rate)` + `phone()` (telefon di tengah, sticker di bawah) dan `window.loadClip(t)`; `render.js` projek memanggil `loadClip(t)` selepas `loadHead`. `rate` = kelajuan klip (1.0 = asal; klip lebih pendek daripada adegan akan berhenti pada frame akhir). Salin `scenes.js`/`render.js`/`engine.js` dari projek tu.
- **Footage HD**: `engine.js` projek itu guna `curHead.naturalWidth/Height` dan gradient lebih nipis; frame H diekstrak terus 1080x1920 (`scale=1080:1920:flags=lanczos+accurate_rnd,unsharp=5:5:0.9:3:3:0.35 -q:v 1`) hanya untuk julat `Hh`.
- **SFX minimum** (bila Taufik minta "sound effect minimal, tiada muzik"): woosh pada awal setiap langkah + loceng pada CTA, dicampur SELEPAS render dengan `mix_sfx.sh` (simpan `voice-only.mp4`, boleh diulang). Wajib `alimiter=...:level=0` (auto-level menaikkan bunyi) dan `-ar 44100` / `aresample=44100`; semak peak (`< -1 dB`). Jangan commit `voice-only.mp4`.
