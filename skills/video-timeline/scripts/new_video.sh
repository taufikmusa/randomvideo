#!/usr/bin/env bash
# Copy the video-timeline template into a new project folder.
# Usage: bash scripts/new_video.sh <dest-dir>     e.g. bash scripts/new_video.sh ~/randomvideo/internet-history
set -euo pipefail
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${1:?usage: new_video.sh <dest-dir>}"
[ -e "$DEST" ] && { echo "refusing: $DEST already exists" >&2; exit 1; }
mkdir -p "$DEST"
cp -r "$SKILL_DIR/assets/template/." "$DEST/"
echo "created $DEST — now rewrite scenes.js and sfx.json, then:"
echo "  cd $DEST && python3 music.py && node render.js stills 1 7 33 53 57 69 73 80 86"
echo "  bash $SKILL_DIR/scripts/contact_sheet.sh $DEST"
echo "  node render.js   # -> $(basename "$DEST").mp4"
