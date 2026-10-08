---
name: carousel-kartun
description: 'Carousel IG 1080x1350 gaya STICKER KARTUN KELUARGA comel pastel untuk content emas Taufik (@taufik.pg, Public Gold G100). Watak: kartun Taufik, ISTERI (tudung pink, cermin mata) dan ANAK PEREMPUAN (rambut bob) dari assets/kartun/{taufik,isteri,anak}. Latar pastel (krim/biru/kuning/pink/mint) dengan blob lembut & titik, tajuk Fredoka bulat coklat gelap dengan *kata* diserlah kuning, pil label sticker, belon cakap bulat putih, kad putih bayang lembut, emas comel (jongkong/syiling), titik halaman + swipe. Guna bila Taufik sebut "gaya kartun", "kartun keluarga", "guna kartun wife/anak", "sticker comel", atau topik keluarga/anak/isteri. BERBEZA daripada carousel-komik (pop-art keras merah/kuning) — ini lembut & mesra keluarga.'
---

# carousel-kartun — sticker keluarga pastel (1080x1350)

- **Watak** (PNG lutsinar, outline putih sedia ada): `assets/kartun/taufik/`, `isteri/` (isteri Taufik), `anak/` (anak perempuan Taufik). Senarai pose ikut nama fail (doa, lambai, teruja, peace, lompat, semangat, pipi...). Kartun boleh di mana-mana slaid.
- **Privasi anak**: JANGAN letak nama sebenar anak/isteri dalam slaid (label nama dah dibuang dari cutout). Helaian asal ada nama — jangan guna terus.
- **Struktur slaid**: pil bab (atas kiri) → `title()` besar dengan `*kata*` diserlah → kad/belon → watak di bawah (bottomY 1215). Ruang footer y>1230.
- BG slaid: hex pastel dalam `var BG = [...]` (slides.js dimuat SEBELUM engine — jangan guna `K.` dalam BG).
- Dialog dalam belon boleh rekaan pendek yang sesuai watak (senaraikan dalam laporan).

## Fail
```
assets/template/engine.js   JANGAN EDIT: bg, title, para, pill, bubble, card, chara, goldBar, coin, sparkle, heart, footer
assets/template/slides.js   FAIL YANG DITULIS: N, BG[], ASSETS, SLIDES[]  (contoh: dana anak 6 slaid)
fonts/                       Fredoka 600/700, Nunito 700/900
```

## Aliran kerja
1. `sh skills/carousel-kartun/scripts/new_carousel.sh carousel-<topik>`
2. `cp assets/kartun/{taufik,isteri,anak}/<pose>.png carousel-<topik>/img/`
3. Tulis slides.js → `node render.js` → semak `out/panorama.png` (tajuk terkeluar tepi? kurangkan maxW) → betulkan.
4. Hantar `out/0*.jpg` TERUS dalam chat. Commit kod sahaja.

## API
`title(s,x,y,size,maxW,align)` · `para(s,x,y,w,size)` · `pill(s,cx,cy,size,fg,bg,rot)` · `bubble([lines],cx,cy,w,h,tailX,tailY,size)` (baris bermula `*` = merah) ·
`card(x,y,w,h,fill)` · `chara(img,cx,bottomY,h,flip)` · `goldBar(cx,cy,w,rot,label)` · `coin(cx,cy,r,label)` · `sparkle` · `heart`

## Potong sticker baru
`python3 assets/potong_sticker.py helaian.png assets/kartun/<watak> <prefix> [THR=26] [ERO=0]` — jika sticker bercantum guna `60 14`. Semak contact sheet, buang serpihan, namakan ikut pose.
