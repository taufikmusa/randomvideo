#!/bin/sh
# Campur SFX minimum ke atas MP4 yang dah render (suara asal sahaja). Tiada muzik. Boleh diulang (versi suara-sahaja disimpan sebagai voice-only.mp4 di sebelah fail).
# Guna: sh mix_sfx.sh <video.mp4> woosh@15.89 woosh@22.55 woosh@32.75 pop@45.28 pop@51.36 bell@77.4     (nama@saat; letak ~0.1s SEBELUM adegan bermula)
# Nama: woosh swish pop(=sfx-1) bell click punch typing sfx-2
set -e
HERE=$(cd "$(dirname "$0")" && pwd); SFX="$HERE/../../../assets/sfx"; V="$1"; shift
D=$(dirname "$V"); VO="$D/voice-only.mp4"; [ -f "$VO" ] || mv "$V" "$VO"
IN="-i $VO"; FC="[0:a]volume=.85[v];"; MIX="[v]"; n=0
for s in "$@"; do
  name=${s%@*}; t=${s#*@}; n=$((n+1)); ms=$(awk "BEGIN{printf \"%d\", $t*1000}")
  case $name in woosh) f=sfx-woosh; g=2;; swish) f=sfx-swish; g=2;; pop) f=sfx-1; g=.9;; bell) f=sfx-bell; g=2.2;; click) f=sfx-click-mouse; g=2.5;; punch) f=sfx-punch-damage; g=.5;; typing) f=sfx-typing; g=1.8;; sfx-2) f=sfx-2; g=1;; *) echo "SFX tak dikenali: $name"; exit 1;; esac
  IN="$IN -i $SFX/$f.wav"; FC="$FC[$n:a]volume=$g,adelay=$ms|$ms[s$n];"; MIX="$MIX[s$n]"
done
# alimiter WAJIB level=0 (auto-level menaikkan bunyi) + aresample 44100 (keluaran jadi 96kHz kalau tak)
ffmpeg -v error -y $IN -filter_complex "${FC}${MIX}amix=inputs=$((n+1)):normalize=0:duration=first,alimiter=limit=.85:level=0,aresample=44100[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -ar 44100 -movflags +faststart "$V"
python3 -I - "$V" <<'PY'
import subprocess, sys, numpy as np
o=subprocess.run(['ffmpeg','-v','error','-i',sys.argv[1],'-vn','-f','f32le','-'],capture_output=True).stdout
x=np.frombuffer(o,dtype=np.float32).reshape(-1,2); pk=20*np.log10(np.abs(x).max(0)); print('peak L/R %.2f %.2f dB (mesti < -1 dB)'%tuple(pk))
PY
echo "siap: $V  (jangan commit $VO)"
