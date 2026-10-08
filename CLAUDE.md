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
