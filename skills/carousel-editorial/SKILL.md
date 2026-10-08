---
name: carousel-editorial
description: 'Carousel IG 1080x1350 gaya EDITORIAL PUTIH (macam "9 Money Milestones Before 40") untuk content emas & kewangan Taufik (@taufik.pg, Public Gold G100). Latar kertas putih, NOMBOR OREN GERGASI di kiri, tajuk berus marker hitam + garis merah, tajuk blok condensed Anton, perenggan Inter dengan *kata kunci oren*, nota tulisan tangan Caveat, sticky note peach, kotak checklist peach, doodle burst & anak panah, foto emas sebenar, potret Taufik outline putih. Guna bila Taufik sebut "carousel editorial", "gaya putih", "gaya nombor besar", "macam 9 money milestones", "gaya magazine", atau beri copywriting dan minta carousel gaya ni. BERBEZA daripada carousel-thumbnail (gaya default: latar gelap, Anton + blok berus merah/kuning, bokeh).'
---

# carousel-editorial — carousel putih gaya majalah (1080x1350)

Taufik pilih gaya ni dari rujukan "9 Money Milestones To Accomplish Before 40". Apa yang buat ia jadi:

- **Satu idea satu slaid**, bernombor besar (1, 2, 3...) warna oren `#E8522F`, dengan kaunter `1/5` tulisan tangan di kiri atas.
- **Tiga lapis tipografi**: tajuk berus (Permanent Marker) + garis merah → tajuk blok (Anton) → perenggan Inter 34–38px, kata kunci dibalut `*...*` jadi oren tebal.
- **Rasa tangan manusia**: nota Caveat condong, sticky note peach di kanan atas, checklist peach ☑, burst `\ | /`, anak panah melengkung.
- **Visual sebenar**: foto emas dari `assets/emas/` (photoBox) atau line-art yang dilukis dalam slides.js (troli, bakul, tag harga, kambing, syiling). Potret Taufik WAJIB outline putih.
- Footer setiap slaid: pil `@taufik.pg` + "swipe →" (kecuali slaid terakhir).

## Fail

```
assets/template/
  engine.js     JANGAN EDIT. Kit lukisan + loader + footer.
  slides.js     FAIL YANG DITULIS: N, ASSETS, SLIDES[]
  index.html    muat slides.js dahulu, kemudian engine.js
  render.js     node render.js → out/01.jpg … out/0N.jpg (+ out/panorama.png)
  fonts/        Anton, Permanent Marker, Caveat 700, Inter 500/800/900, JetBrains Mono
references/slides-inflasi-rm100.js   contoh lengkap 6 slaid (cover + 4 + CTA)
scripts/new_carousel.sh              salin template + jana potret sticker
```

## Aliran kerja

1. `sh skills/carousel-editorial/scripts/new_carousel.sh carousel-<topik> tunjuk-kamera thumbs-up` (pose dari `assets/README.md`).
2. Salin foto emas yang sesuai: `cp assets/emas/<fail>.jpg carousel-<topik>/img/`.
3. Tulis `slides.js`: `var N`, `var ASSETS = {key:'fail'}`, `var SLIDES = [function (x) {...}, ...]` (x = offset slaid, tambah pada setiap koordinat x).
4. `cd carousel-<topik> && node render.js`, semak `out/panorama.png` (resize 3300px) — betulkan semua yang bertindih.
5. Hantar `out/0*.jpg` TERUS dalam chat (SendUserFile). Commit kod sahaja (out/ di-gitignore).

## Struktur slaid (ikut copywriting)

- **Potret Taufik HANYA di slaid TERAKHIR (CTA).** Cover dan slaid isi TANPA potret (Taufik: nampak macam iklan). Cover guna hook + line-art / foto emas: brushTitle + blockTitle + bigNum + photoBox.
- **Slaid isi (1..n)**: `counter(x,i,n)`, `sticky([...], x+760, 50)`, `bigNum('1', x+10, 620, 520)`, tajuk mula x+380, body x+385 lebar ≈650, visual di separuh bawah (y 850–1230), satu nota/checklist kecil.
- **CTA terakhir**: soalan komen (dari copywriting) + kata punchline besar oren (contoh `EMAS!`) + potret thumbs-up. Tiada "swipe".
- Ruang selamat: jangan letak apa-apa di bawah y=1230 (footer) atau kanan atas (sticky).

## API engine.js

`bigNum(s,x,y,size,italic)` · `brushTitle(s,x,y,size,rot)` · `blockTitle([lines],x,y,size,lh)` · `body(s,x,y,w,size)` (`*kata*` = oren) ·
`note([lines],x,y,size,rot,underline)` · `sticky([lines],x,y,w,rot,size)` · `checklist([items],x,y,w,rot,size)` · `counter(x,i,n)` ·
`burst(x,y,scale,rot)` · `arrow(x1,y1,x2,y2,bend,col,th)` · `swoosh(x1,y,x2,col,th)` · `photo(img,cx,cy,w,rot)` · `photoBox(img,x,y,w,h,r,fx,fy,rot)` · `cutout(img,cx,bottomY,h)` ·
warna `K.red K.ink K.peach K.bg`, font `F.block() F.brush() F.hand() F.body() F.bodyB() F.num()`.

## Peraturan isi

- Ayat dari copywriting Taufik; boleh ringkaskan, jangan tambah fakta. Sticky/nota pendek (2–4 perkataan) boleh rekaan gaya — senaraikan dalam laporan sebagai "teks rekaan".
- Angka harga/peratus: hanya dari Taufik atau sumber bertarikh; tulis tarikhnya. Graf tanpa data = label ILUSTRASI.
- Bahasa Melayu Malaysia, bukan Indonesia.
