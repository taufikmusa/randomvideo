#!/bin/sh
# Ekstrak frame footage HD (1080x1920, Lanczos + sharpen, JPEG q1) HANYA untuk julat saat adegan bercakap. Index fail = round(t*30)+1 (sama seperti enjin).
# Guna: sh hd_frames.sh <joined.mp4> <folder-projek>/src 0-6.7 65.7-70.0 ...   (julat = adegan bercakap +/- 0.1s)
set -e
V="$1"; D="$2"; shift 2; mkdir -p "$D"
for r in "$@"; do a=${r%-*}; b=${r#*-}
  i0=$(python3 -c "print(round($a*30)+1)"); n=$(python3 -c "print(round($b*30)+1-round($a*30))"); ss=$(python3 -c "print(($i0-1)/30)")
  ffmpeg -v error -y -ss "$ss" -i "$V" -frames:v "$n" -vf "scale=1080:1920:flags=lanczos+accurate_rnd,unsharp=5:5:0.9:3:3:0.35" -q:v 1 -start_number "$i0" "$D/%05d.jpg"
done
echo "siap: $(ls "$D" | wc -l) fail dalam $D"
