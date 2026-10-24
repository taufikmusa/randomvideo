#!/bin/sh
# Ekstrak frame klip app (assets/video/*.mp4) ke <projek>/clip/<kunci>/%04d.jpg (540px, 30fps) - SEMENTARA, jangan commit. Cetak baris CLIPN untuk scenes.js.
# Guna: sh clip_frames.sh <folder-projek> daftar:app-01-daftar.mp4 install:app-02-install.mp4 login:app-03-login.mp4 topup:app-04-topup-simpanan.mp4 withdraw:app-05-withdraw.mp4
set -e
HERE=$(cd "$(dirname "$0")" && pwd); AV="$HERE/../../../assets/video"; P="$1"; shift; OUT="const CLIPN = {"
for c in "$@"; do k=${c%%:*}; f=${c#*:}; mkdir -p "$P/clip/$k"
  ffmpeg -v error -y -i "$AV/$f" -vf "fps=30,scale=540:-1:flags=lanczos" -q:v 2 "$P/clip/$k/%04d.jpg"; OUT="$OUT $k: $(ls "$P/clip/$k" | wc -l),"; done
echo "$OUT cut: 2200 };   // 'cut' = frame paper-cut (nombor = index frame src)"
