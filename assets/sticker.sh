#!/bin/sh
# Outline putih ala sticker untuk potret cutout Taufik (WAJIB pada setiap potret).
# Guna: sh assets/sticker.sh in.png out.png [tebal=16]
T=${3:-16}
convert "$1" -channel A -level 50%,62% +channel -bordercolor none -border $((T*3)) \
  \( +clone -channel A -morphology Dilate Disk:$T +channel -fill white -colorize 100 \) \
  +swap -compose over -composite -trim +repage "$2"
