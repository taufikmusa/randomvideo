#!/bin/sh
# Guna: sh embed_thumb.sh <video.mp4> <thumbnail.jpg> [saat=0.1]
# 1) tampal thumbnail pada 0.1s pertama (skala ikut saiz video), audio disalin tanpa ubah
# 2) letak thumbnail sebagai cover (attached_pic) dalam MP4
set -e
V="$1"; T="$2"; D="${3:-0.1}"; TMP="${V%.mp4}.thumb.tmp.mp4"
W=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$V")
H=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$V")
ffmpeg -v error -y -i "$V" -loop 1 -i "$T" \
  -filter_complex "[1:v]scale=${W}:${H},format=yuv420p[t];[0:v][t]overlay=enable='lt(t,${D})':shortest=1,format=yuv420p[v]" \
  -map "[v]" -map 0:a -c:v libx264 -crf 17 -preset medium -c:a copy -movflags +faststart "$TMP"
ffmpeg -v error -y -i "$TMP" -i "$T" -map 0 -map 1 -c copy -disposition:v:1 attached_pic -movflags +faststart "$V"
rm -f "$TMP"
