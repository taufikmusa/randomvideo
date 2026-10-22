#!/bin/sh
# Semak persekitaran sebelum mula. Guna: sh scripts/check_env.sh [folder-model-whisper]
ok(){ printf '  [OK]   %s\n' "$1"; }; no(){ printf '  [TIADA] %s -> %s\n' "$1" "$2"; MISS=1; }
MISS=0; echo "Semak alat:"
command -v ffmpeg >/dev/null && ok ffmpeg || no ffmpeg "apt-get install -y ffmpeg"
command -v node >/dev/null && ok "node $(node -v)" || no node "pasang nodejs"
node -e "require('playwright')" 2>/dev/null && ok "playwright (npm)" || no "playwright (npm)" "sh scripts/setup.sh"
python3 -I -c "import numpy,scipy,PIL" 2>/dev/null && ok "python numpy/scipy/pillow" || no "python numpy/scipy/pillow" "pip install numpy scipy pillow"
python3 -I -c "import sherpa_onnx" 2>/dev/null && ok "sherpa-onnx" || no "sherpa-onnx" "pip install sherpa-onnx"
M=${1:-$HOME/asr/sherpa-onnx-whisper-small}; [ -f "$M/small-encoder.int8.onnx" ] && ok "model whisper: $M" || no "model whisper" "sh scripts/setup.sh  (atau guna scripts/silence_segments.py + minta naskhah dari Taufik)"
[ $MISS = 0 ] && echo "Semua siap." || echo "Ada yang tiada — lihat arahan di atas."
