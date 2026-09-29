#!/usr/bin/env bash
# Tile every still in <project>/stills (time order) into one JPG for quick visual review.
# Usage: bash scripts/contact_sheet.sh <project-dir> [out.jpg]
set -euo pipefail
P="${1:?usage: contact_sheet.sh <project-dir> [out.jpg]}"
OUT="${2:-$P/stills/_sheet.jpg}"
TMP="$(mktemp -d)"
i=0
for f in $(ls "$P/stills" | grep -E '^t[0-9.]+\.jpg$' | sed 's/^t//; s/\.jpg$//' | sort -n); do
  cp "$P/stills/t$f.jpg" "$TMP/s$(printf %03d $i).jpg"; i=$((i+1))
done
[ "$i" -gt 0 ] || { echo "no stills in $P/stills" >&2; exit 1; }
COLS=$(( i < 7 ? i : 7 )); ROWS=$(( (i + COLS - 1) / COLS ))
ffmpeg -hide_banner -loglevel error -y -i "$TMP/s%03d.jpg" -vf "scale=240:427,tile=${COLS}x${ROWS}" -frames:v 1 "$OUT"
rm -rf "$TMP"
echo "$OUT"
