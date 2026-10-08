---
name: carousel-pastel
description: 'Carousel IG 1080x1350 gaya STICKER KARTUN KELUARGA comel pastel untuk content emas Taufik (@taufik.pg, Public Gold G100). Watak keluarga: BABA (Taufik), MAMI (isteri, tudung pink + cermin mata), AMANI (kakak sulung, rambut bob berponi) dan AILEEN (adik, rambut belah tepi) dari assets/kartun/{baba,mami,amani,aileen}. Latar pastel (krim/biru/kuning/pink/mint) dengan blob lembut & titik, tajuk Fredoka bulat coklat gelap dengan *kata* diserlah kuning, pil label sticker, belon cakap bulat putih, kad putih bayang lembut, emas comel (jongkong/syiling), titik halaman + swipe. Guna bila Taufik sebut "gaya kartun", "kartun keluarga", "guna kartun wife/anak", "sticker comel", atau topik keluarga/anak/isteri. BERBEZA daripada carousel-red (pop-art merah/kuning) — ini lembut & mesra keluarga.'
---

# carousel-pastel — sticker keluarga pastel (1080x1350)

- **Watak & nama panggilan** (WAJIB guna nama ni dalam dialog):
  | Watak | Folder | Rupa |
  |---|---|---|
  | **Baba** (Taufik) | `assets/kartun/baba/` | kot gelap/kemeja coklat, polo navy, batik; `baba-semi-realistik-*` = versi muka sebenar dengan belon (Siap Bosskuu, Mantul, Semangat, Padu siot, Jom, Terima kasih) |
  | **Mami** (isteri) | `assets/kartun/mami/` | tudung pink, cermin mata, kadang headphone |
  | **Amani** (kakak sulung) | `assets/kartun/amani/` | rambut bob berponi rata |
  | **Aileen** (adik) | `assets/kartun/aileen/` | rambut belah tepi tanpa poni |
  Anak panggil Taufik "Baba" (BUKAN Abah). Guna nama panggilan sahaja — jangan nama penuh.
- **Foto emas SEBENAR bila sesuai**: `photoCard(IMG.x, cx, cy, w, h, rot, caption, fx, fy)` — bingkai putih + tape washi. Pilih dari `assets/emas/` (kad dinar, set bertingkat, jongkong 100g, binder) atau `assets/app/` (Aurora kartun = topik anak). Guna untuk bukti/gram/hasil; kekalkan kartun untuk emosi.
- **Struktur slaid**: pil bab (atas kiri) → `title()` besar dengan `*kata*` diserlah → kad/belon → watak di bawah (bottomY 1215). Ruang footer y>1230.
- BG slaid: hex pastel dalam `var BG = [...]` (slides.js dimuat SEBELUM engine — jangan guna `K.` dalam BG).
- Tajuk: `*frasa diserlah*` boleh merentas baris. Panjang carousel 5–9 slaid ikut copywriting (cover → isi → penutup).
- Dialog dalam belon boleh rekaan pendek yang sesuai watak (senaraikan dalam laporan).

## Fail
```
assets/template/engine.js   JANGAN EDIT: bg, title, para, pill, bubble, card, chara, goldBar, coin, sparkle, heart, footer
assets/template/slides.js   FAIL YANG DITULIS: N, BG[], ASSETS, SLIDES[]  (contoh: dana anak 6 slaid)
fonts/                       Fredoka 600/700, Nunito 700/900
```

## Aliran kerja
1. `sh skills/carousel-pastel/scripts/new_carousel.sh carousel-<topik>`
2. `cp assets/kartun/{baba,mami,amani,aileen}/<watak>-<pose>.png assets/emas/<foto>.jpg carousel-<topik>/img/`
3. Tulis slides.js → `node render.js` → semak `out/panorama.png` (tajuk terkeluar tepi? kurangkan maxW) → betulkan.
4. Hantar `out/0*.jpg` TERUS dalam chat. Commit kod sahaja.

## API
`title(s,x,y,size,maxW,align)` · `para(s,x,y,w,size)` · `pill(s,cx,cy,size,fg,bg,rot)` · `bubble([lines],cx,cy,w,h,tailX,tailY,size)` (baris bermula `*` = merah) ·
`card(x,y,w,h,fill)` · `photoCard(img,cx,cy,w,h,rot,caption,fx,fy)` · `chara(img,cx,bottomY,h,flip)` · `goldBar(cx,cy,w,rot,label)` · `coin(cx,cy,r,label)` · `sparkle` · `heart`

## Potong sticker baru
`python3 assets/potong_sticker.py helaian.png assets/kartun/<watak> <prefix> [THR=26] [ERO=0]` — jika sticker bercantum guna `60 14`. Semak contact sheet, buang serpihan, namakan ikut pose.
