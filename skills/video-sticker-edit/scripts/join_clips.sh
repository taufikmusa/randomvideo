#!/bin/sh
# Gabung beberapa klip (.mov/.mp4 iPhone, fps/resolusi bercampur) jadi SATU mp4 720x1280@30 + audio 44100 stereo.
# Susun ikut creation_time (kalau tiada, ikut susunan hujah). NOSORT=1 untuk kekal susunan hujah.
# Guna: sh scripts/join_clips.sh <output.mp4> klip1 klip2 klip3 ...
set -e
OUT="$1"; shift
if [ "$#" -eq 1 ]; then ffmpeg -v error -y -i "$1" -vf "scale=720:1280:flags=lanczos,fps=30,setsar=1" -c:v libx264 -crf 14 -preset fast -pix_fmt yuv420p -ar 44100 -ac 2 -c:a aac -b:a 256k "$OUT"; exit 0; fi
if [ -z "$NOSORT" ]; then
  LIST=$(for f in "$@"; do t=$(ffprobe -v error -show_entries format_tags=creation_time -of csv=p=0 "$f" 2>/dev/null | head -1); echo "${t:-0}|$f"; done | sort | cut -d'|' -f2-)
else LIST=$(for f in "$@"; do echo "$f"; done); fi
I=""; FC=""; CC=""; n=0
OLDIFS=$IFS; IFS='
'
for f in $LIST; do I="$I -i \"$f\""; FC="$FC[$n:v]scale=720:1280:flags=lanczos,fps=30,setsar=1[v$n];[$n:a]aresample=44100,aformat=channel_layouts=stereo[a$n];"; CC="$CC[v$n][a$n]"; echo "klip $((n+1)): $f"; n=$((n+1)); done
IFS=$OLDIFS
eval ffmpeg -v error -y $I -filter_complex "\"${FC}${CC}concat=n=$n:v=1:a=1[v][a]\"" -map "[v]" -map "[a]" -c:v libx264 -crf 14 -preset fast -pix_fmt yuv420p -c:a aac -b:a 256k "\"$OUT\""
echo "siap: $OUT  ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT")s)"
