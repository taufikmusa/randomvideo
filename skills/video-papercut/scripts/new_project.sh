#!/bin/sh
# Cipta projek video-papercut: guna new_video.sh (video-sticker-edit) kemudian tindih engine.js + render.js dengan versi paper-cut/HD/klip.
# Guna: sh skills/video-papercut/scripts/new_project.sh <folder-projek> <joined.mp4>
set -e
HERE=$(cd "$(dirname "$0")" && pwd); SK=$HERE/../..; P="$1"; SRC="$2"
[ -n "$P" ] && [ -f "$SRC" ] || { echo "guna: new_project.sh <folder-projek> <joined.mp4>"; exit 1; }
sh "$SK/video-sticker-edit/scripts/new_video.sh" "$P" "$SRC"
cp "$HERE/../assets/template/engine.js" "$HERE/../assets/template/render.js" "$P/"
mkdir -p "$P/clip"
echo "OK. Seterusnya: foto sticker -> make_stickers.py, transkrip, tulis scenes.js (mula dari references/scenes-5-langkah-app.js)."
