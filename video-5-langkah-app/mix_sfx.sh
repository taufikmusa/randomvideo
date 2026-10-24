#!/bin/sh
# Mix SFX minimum ke atas video yang dah render (suara asal + woosh pada setiap langkah + loceng pada CTA). Tiada muzik.
# Guna (dari folder projek): sh mix_sfx.sh   -> video-5-langkah-app.mp4 diganti dengan versi ber-SFX
set -e
V=video-5-langkah-app.mp4; SFX=../assets/sfx; [ -f voice-only.mp4 ] || mv "$V" voice-only.mp4   # simpan versi suara-sahaja supaya skrip boleh diulang
ffmpeg -v error -y -i voice-only.mp4 -i $SFX/sfx-woosh.wav -i $SFX/sfx-bell.wav -filter_complex \
"[0:a]volume=.85[v];\
[1:a]asplit=5[w1][w2][w3][w4][w5];\
[w1]volume=2,adelay=15890|15890[a1];[w2]volume=2,adelay=22550|22550[a2];[w3]volume=2,adelay=32750|32750[a3];[w4]volume=2,adelay=45280|45280[a4];[w5]volume=2,adelay=51360|51360[a5];\
[2:a]volume=2.2,adelay=77400|77400[b1];\
[v][a1][a2][a3][a4][a5][b1]amix=inputs=7:normalize=0:duration=first,alimiter=limit=.85:level=0,aresample=44100[a]" \
-map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -ar 44100 -movflags +faststart "$V"
