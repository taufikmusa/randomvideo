---
name: carousel-thumbnail
description: 'Carousel IG DEFAULT Taufik (@taufik.pg, Public Gold G100), 1080x1350, 5 slaid, gaya THUMBNAIL YOUTUBE: latar gelap merah/navy/kuning dengan bokeh & grain, tajuk Anton besar huruf besar dengan bayang keras, blok berus merah/kuning/hitam, potret Taufik OUTLINE PUTIH di kanan, foto emas sebenar bertape, cop (MITOS!), panorama bersambung bila swipe, anak panah SWIPE, CTA Like/Share/Follow. Guna bila Taufik beri copywriting dan minta "carousel" tanpa sebut gaya lain, atau sebut "gaya thumbnail", "gaya macam sabar/resit". BERBEZA daripada carousel-editorial (latar putih, nombor oren gergasi, tulisan tangan).'
---

# carousel-thumbnail — gaya default (1080x1350 × 5)

Gaya ni ikut thumbnail Taufik sendiri (`assets/rujukan-gaya/thumb-*.jpg`). Dah diguna untuk carousel Sabar, Resit→Aset, Resit Hilang.

- **Panorama bersambung**: semua slaid dilukis atas satu kanvas 5400px (garis putus kuning di bawah, bokeh merentas sambungan) kemudian dipotong.
- **Tajuk**: `head()` = Anton + bayang hitam keras; `brushHead()` = Anton atas blok berus kasar (merah/kuning/hitam).
- **Potret**: cutout outline putih (`assets/sticker.sh`) di kanan, x≈+860, tinggi 700–960. Pilih pose ikut babak (lihat `assets/README.md`). **Potret HANYA di slaid TERAKHIR (CTA)** (Taufik: nampak macam iklan). Slaid lain guna foto emas / visual.
- **Bukti**: foto emas sebenar `photo()` bertape kuning; `stamp()` untuk cop; `pill()` untuk label bab.
- **Chrome**: pil @taufik.pg kiri atas, `0i / 05` + SWIPE → bawah, CTA Like/Share/Follow pada slaid akhir.
- Susunan latar biasa: `['red','navy','yel','navy','red']` (atau `dark`). Slaid kuning guna teks hitam.

## Fail

```
assets/template/index.html   engine + contoh slaid (Resit Hilang). Ganti BG[], blok `const S = [...]`, dan senarai Object.entries({...}) gambar
assets/template/render.js    node render.js → out/01.jpg … (N dari window.N)
references/*.html            Sabar, Resit→Aset, Resit Hilang — contoh lengkap
scripts/new_carousel.sh      salin template + jana potret sticker
```

## Aliran kerja

1. `sh skills/carousel-thumbnail/scripts/new_carousel.sh carousel-<topik> peluk-tubuh thumbs-up`
2. `cp assets/emas/<fail>.jpg carousel-<topik>/img/`
3. Edit `index.html`: slaid dalam `const S = [function s1(x){...}, ...]`, gambar dalam `Object.entries({...})`.
4. `node render.js`, semak panorama → betulkan tindihan (biasanya: teks vs potret, tape foto vs teks, CTA vs tangan).
5. Hantar `out/0*.jpg` TERUS dalam chat. Commit kod sahaja.

## Peraturan isi

Sama macam carousel-editorial: ayat dari copywriting, angka bertarikh, rekaan disenaraikan, Bahasa Melayu Malaysia.
