# randomvideo — nota untuk Claude

Setiap folder = satu video motion graphics (canvas `main.js` + `music.py` + `render.js`).
Render: `python3 music.py && node render.js` dalam folder projek.

## Hantar hasil (WAJIB)
- **Gambar** (JPG/PNG, carousel, post IG): hantar terus dalam chat (SendUserFile). Tak perlu commit ke repo.
- **Jangan** hantar MP4 dalam chat (SendUserFile). Commit + push MP4, kemudian beri **link GitHub raw sahaja**:
  `https://github.com/taufikmusa/randomvideo/raw/<branch>/<projek>/<projek>.mp4`
  (iPhone: buka link → video main → Share → Save Video). Sertakan durasi + saiz.
- Bila Taufik kata "dah download" / "ok" / "dah simpan": terus padam MP4 projek tu (`git rm`),
  buang fail sementara (frames/, src.mp4, stills/, music.wav), commit "Cleanup <projek> (Taufik dah download)", push. Tak perlu tanya.
- Kod, font dan gambar projek kekal untuk revisi.

## Aset
- Pustaka gambar Taufik ada dalam `assets/` (baca `assets/README.md`). Guna semula, jangan minta upload lagi.
- Potret Taufik WAJIB outline putih: `sh assets/sticker.sh`.
- Gambar baru dari Taufik: tambah ke `assets/` + kemas kini README.

## Skill carousel (dalam skills/)
- `carousel-thumbnail` = DEFAULT bila Taufik minta "carousel" tanpa sebut gaya (latar gelap, Anton + blok berus, potret outline putih).
- `carousel-pastel` = sticker kartun KELUARGA pastel lembut: Baba (Taufik), Mami, Amani (kakak sulung), Aileen (adik). Guna foto emas sebenar bila sesuai.
- `carousel-red` = komik pop-art merah/kuning (burst, Bangers, belon) dengan kartun Baba + pilihan Mami/Amani/Aileen + foto emas sebenar (photoPanel). Kartun boleh di mana-mana slaid.
- `carousel-maroon` = promo impian: latar foto emas kabur, tajuk Poppins italic putih + pil maroon, kad tier angka emas, doodle kuning.
- `carousel-editorial` = gaya putih majalah, nombor oren gergasi, tulisan tangan (rujukan "9 Money Milestones").
- Potret/selfie Taufik HANYA di slaid TERAKHIR (CTA). Cover & slaid isi tanpa potret (nampak macam iklan).
- Baca SKILL.md skill tu dahulu; mula dengan `sh skills/<skill>/scripts/new_carousel.sh carousel-<topik> <pose...>`.

## Skill video (dalam skills/)
- `video-sticker-edit` = edit video talking-head Taufik + helaian sticker 3x3 -> video menegak 1080x1920 (hook, chapter, B-roll, sticker pop-up, kapsyen). **DEFAULT maroon-emas**; warna lain (honey gold #FEC40B, acid yellow #EFFF00) HANYA bila Taufik sebut.
- Bila Taufik lampir klip video + helaian sticker (cth "edit ni", "next", "proceed"): baca `skills/video-sticker-edit/SKILL.md` dahulu, ikut aliran dalamnya. Pasangkan klip dengan helaian ikut isi suara; susun klip ikut nombor fail (`S5-1` sebelum `S5-2`).
- Hantar MP4 sebagai link raw (peraturan di atas). "dah download"/"cleanup" = `git rm` MP4 + buang fail sementara + push, tanpa tanya.
- Fail sementara (`segs.json`, `work/`, `src/`, `out/`, `stills/`) mesti dipadam sebelum commit (stop-hook git marah kalau ada untracked).
