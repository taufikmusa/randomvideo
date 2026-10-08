---
name: carousel-maroon
description: 'Carousel IG 1080x1350 gaya PROMO IMPIAN MAROON-EMAS (rujukan assets/rujukan-gaya/maroon-impian-0*.jpg): latar FOTO SEBENAR dikaburkan + vignette gelap, tajuk Poppins ExtraBold Italic putih berbayang, pil maroon (#7A1626) di belakang frasa utama, doodle kuning (garis \ | /, garis bawah, anak panah), sparkle putih, kad krim berteks, kad tier maroon dengan angka emas besar (macam B40/M40/T20), pil baris "label ››› nilai", lencana ikon bulat maroon, kad foto bingkai putih tebal, potret Taufik outline putih (SLAID TERAKHIR sahaja). Guna bila Taufik sebut "gaya maroon", "gaya impian", "macam poster dana haji/kahwin", "gaya promo emas", atau beri copywriting dan minta gaya ni. BERBEZA daripada carousel-thumbnail (gelap Anton berus), carousel-red (komik), carousel-pastel (kartun), carousel-editorial (putih).'
---

# carousel-maroon — promo impian maroon-emas (1080x1350)

- **Latar**: setiap slaid = foto sebenar dari `assets/emas/` dikaburkan (`bgPhoto(x, IMG.k, blur, dark)`). Tukar foto antara slaid supaya rasa berbeza.
- **Tajuk**: `headline()` putih italic + `pillTitle([lines])` maroon untuk frasa paling penting. Format bab: "1- Tajuk Kesilapan".
- **Isi**: `sub()` (putih bold, wrap), `whiteCard(x,y,w,[lines])` (baris `*` = maroon italic), `tierCard()` untuk perbandingan/angka besar, `rowPill()` untuk senarai "label ››› nilai", `badge(cx,cy,r,fnIcon)` ikon bulat.
- **Hiasan**: `strokes()` kuning di kiri-kanan tajuk, `underline()`, `curlyArrow()`, `sparkle()`.
- **Foto**: `photoCard(img,cx,cy,w,h,rot,fx,fy)` bingkai putih tebal.
- **Potret Taufik**: `cutout(IMG.taufik, cx, SH-40, h)` — HANYA slaid terakhir (CTA) + kotak gelap "Mula serendah RM100 melalui Akaun Emas GAP" + pil maroon "DM saya".
- Footer: pil @taufik.pg + pil maroon "Swipe ›".
- Panjang 5–9 slaid: cover (hook) → senarai/ringkasan → 1 slaid setiap poin → hakikat/perbandingan → CTA.

## Fail
```
assets/template/engine.js   JANGAN EDIT
assets/template/slides.js   N, ASSETS, SLIDES[]  (contoh: 5 kesilapan fresh grad, 9 slaid)
fonts/                       Poppins 600/700/800i/900i
```

## Aliran kerja
1. `sh skills/carousel-maroon/scripts/new_carousel.sh carousel-<topik> thumbs-up` (potret sticker untuk CTA)
2. `cp assets/emas/<foto>.jpg carousel-<topik>/img/` (5–8 foto untuk latar & kad)
3. Tulis slides.js → `node render.js` → semak `out/panorama.png` → betulkan tindihan.
4. Hantar `out/0*.jpg` TERUS dalam chat. Commit kod sahaja.

## Peraturan isi
- Angka dari copywriting sahaja (kiraan mudah seperti RM500 = 5× RM100 boleh). Jangan reka pulangan/harga.
- Screenshot app bertarikh: sebut dalam laporan. Bahasa Melayu Malaysia.
