#!/bin/sh
# Guna: sh skills/video-carousel-mix/scripts/prep_src.sh <folder-projek> <video-taufik.mp4>
# Ekstrak frame (720x1280 @30fps) ke src/ + suara ke voice.wav tanpa timpa scenes.js. Cetak DUR/HEADN.
set -e
P="$1"; SRC="$2"; mkdir -p "$P/src"; cp "$SRC" "$P/src.mp4"
ffmpeg -v error -y -i "$P/src.mp4" -vf "fps=30,scale=720:1280" -q:v 3 "$P/src/%05d.jpg"
ffmpeg -v error -y -i "$P/src.mp4" -vn -ac 2 -ar 44100 "$P/voice.wav"
echo "const DUR = $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$P/src.mp4"), HEADN = $(ls "$P/src" | wc -l);"
