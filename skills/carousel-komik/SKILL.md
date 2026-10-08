---
name: carousel-komik
description: 'Carousel IG 1080x1350 gaya KOMIK POP-ART untuk content emas Taufik (@taufik.pg, Public Gold G100): kertas krim halftone, panel komik border hitam tebal + bayang offset, burst letupan merah/kuning dengan garis laju, tajuk Bangers outline hitam tebal, belon cakap, label marker kuning, bulatan merah, anak panah merah komik, dan WATAK KARTUN TAUFIK (assets/kartun/). Guna bila Taufik sebut "gaya komik", "pop art", "macam poster turun RM180", "guna kartun aku", "cartoon", atau beri copywriting dan minta gaya ni. BERBEZA daripada carousel-thumbnail (default gelap) dan carousel-editorial (putih majalah).'
---

# carousel-komik — komik pop-art (1080x1350)

Rujukan gaya: `assets/rujukan-gaya/komik-popart-turun-rm180.jpg`.

- **Watak = kartun Taufik**, bukan selfie. Kartun boleh muncul di mana-mana slaid (dia maskot, bukan iklan). Pilih dari `assets/kartun/` (versi `-tanpa-teks` bila mahu letak belon sendiri):
  jongkong-250g (cover/emas), buku-guru (pesan guru), hahaha (lucu/reaksi), siap-tabik (tindakan/setuju), terima-kasih / alhamdulillah (CTA, syukur).
- **Setiap slaid**: 1 label kuning (bab) → 1 tajuk `pow()` besar (atau dalam `burst()`) → 1 panel/visual → 1 belon cakap kartun.
- Warna: merah `K.red`, kuning `K.yel`, hitam `K.ink`, kertas `K.paper`. Footer: pil @taufik.pg, `i/N`, butang SWIPE kuning.

## Fail
```
assets/template/engine.js   JANGAN EDIT. paper, panel, burst, pow, bubble, label, circleMark, ticks, bigArrow, img, photoPanel
assets/template/slides.js   FAIL YANG DITULIS: N, ASSETS, SLIDES[]  (contoh: dana anak 6 slaid)
references/slides-dana-anak-komik.js
scripts/new_carousel.sh     salin template (abaikan argumen pose — kartun disalin manual)
```

## Aliran kerja
1. `sh skills/carousel-komik/scripts/new_carousel.sh carousel-<topik>`
2. `cp assets/kartun/kartun-taufik-<pose>.png assets/emas/<foto>.jpg carousel-<topik>/img/`
3. Tulis slides.js → `node render.js` → semak `out/panorama.png` → betulkan tindihan (belon vs footer y>1230, bulatan merah vs teks, kartun vs teks).
4. Hantar `out/0*.jpg` TERUS dalam chat. Commit kod sahaja.

## API
`panel(x,y,w,h,fill,rot)` · `burst(cx,cy,rx,ry,fill,spikes,seed,rays)` · `pow(s,x,y,size,fill,align,rot)` · `bubble([lines],cx,cy,w,h,tailX,tailY,size,{lineIdx:colour})` ·
`label(s,cx,cy,size,bg,fg)` · `circleMark(cx,cy,rx,ry)` · `ticks(cx,cy,r)` · `bigArrow(x1,y1,x2,y2,th)` · `img(im,cx,bottomY,h)` · `photoPanel(im,x,y,w,h,fx,fy,rot)`

## Peraturan isi
Ayat dari copywriting; belon cakap pendek boleh rekaan (senaraikan dalam laporan). Harga/angka bertarikh. Graf tanpa data = ILUSTRASI. Bahasa Melayu Malaysia.
