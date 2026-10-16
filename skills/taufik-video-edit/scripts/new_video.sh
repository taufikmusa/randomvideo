#!/bin/sh
# Cipta projek video baru. Guna: sh scripts/new_video.sh <folder-projek> <video.mp4>
# Salin template enjin + 14 foto emas ke img/, ekstrak frame (720x1280@30) ke src/ + suara ke voice.wav, cetak DUR/HEADN.
set -e
SK=$(cd "$(dirname "$0")/.." && pwd); P="$1"; SRC="$2"
mkdir -p "$P/img" "$P/src"; cp -r "$SK/assets/template/." "$P/"; cp "$SK/assets/photos/"*.jpg "$P/img/"; cp "$SRC" "$P/src.mp4"
ffmpeg -v error -y -i "$P/src.mp4" -vf "fps=30,scale=720:1280" -q:v 3 "$P/src/%05d.jpg"
ffmpeg -v error -y -i "$P/src.mp4" -vn -ac 2 -ar 44100 "$P/voice.wav"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$P/voice.wav"); N=$(ls "$P/src" | wc -l)
echo "siap: $P"; echo "scenes.js:  const VOICE = $D, DUR = VOICE + 6, HEADN = $N;"
