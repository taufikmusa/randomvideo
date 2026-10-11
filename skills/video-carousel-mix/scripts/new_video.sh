#!/bin/sh
# Guna: sh skills/video-carousel-mix/scripts/new_video.sh <nama-projek> <video-taufik.mp4>
# Salin template, ekstrak frame (720x1280 @30fps) ke src/, suara ke voice.wav, dan cetak DUR/HEADN untuk scenes.js.
set -e
SK=$(cd "$(dirname "$0")/.." && pwd); REPO=$(cd "$SK/../.." && pwd); P="$REPO/$1"; SRC="$2"
mkdir -p "$P/img" "$P/src"; cp -r "$SK/assets/template/." "$P/"; cp "$SRC" "$P/src.mp4"
ffmpeg -v error -y -i "$P/src.mp4" -vf "fps=30,scale=720:1280" -q:v 3 "$P/src/%05d.jpg"
ffmpeg -v error -y -i "$P/src.mp4" -vn -ac 2 -ar 44100 "$P/voice.wav"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$P/src.mp4"); N=$(ls "$P/src" | wc -l)
echo "siap: $P"; echo "scenes.js:  const DUR = $D, HEADN = $N;"
echo "seterusnya: transcribe (scripts/transcribe.py), salin aset ke $1/img/, tulis scenes.js"
