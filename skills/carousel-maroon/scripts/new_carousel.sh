#!/bin/sh
# Guna: sh skills/<skill>/scripts/new_carousel.sh <nama-projek> [pose1 pose2 ...]
# Salin template ke <repo>/<nama-projek>/, jana potret outline putih (assets/sticker.sh) ke img/.
set -e
SK=$(cd "$(dirname "$0")/.." && pwd); REPO=$(cd "$SK/../.." && pwd); P="$REPO/$1"; shift
mkdir -p "$P/img"; cp -r "$SK/assets/template/." "$P/"; printf 'out/\n' > "$P/.gitignore"
for pose in "$@"; do sh "$REPO/assets/sticker.sh" "$REPO/assets/taufik/taufik-$pose.png" "$P/img/$pose.png" 16; done
echo "siap: $P  (salin gambar emas: cp $REPO/assets/emas/<fail>.jpg $P/img/)"
