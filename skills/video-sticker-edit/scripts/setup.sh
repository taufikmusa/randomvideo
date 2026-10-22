#!/bin/sh
# Pasang kebergantungan (perlu internet). Guna: sh scripts/setup.sh
set -e
command -v ffmpeg >/dev/null || (apt-get update -qq && apt-get install -y -qq ffmpeg) || echo "PASANG ffmpeg secara manual"
pip install -q numpy scipy pillow sherpa-onnx
D=$HOME/pwdeps; mkdir -p "$D"; cd "$D"; [ -f package.json ] || npm init -y >/dev/null
npm i playwright >/dev/null 2>&1 || npm i playwright
npx playwright install chromium || echo "Kalau chromium sudah ada di /opt/pw-browsers, abaikan."
echo "export NODE_PATH=$D/node_modules" > "$HOME/.video_env"; echo "Jalankan: . $HOME/.video_env   (supaya render.js jumpa playwright)"
M=$HOME/asr; mkdir -p "$M"; cd "$M"
if [ ! -f sherpa-onnx-whisper-small/small-encoder.int8.onnx ]; then
  curl -L -o small.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.tar.bz2 && tar xjf small.tar.bz2 && rm small.tar.bz2
fi
echo "Model: $M/sherpa-onnx-whisper-small"
