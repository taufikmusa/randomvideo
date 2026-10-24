#!/bin/sh
# Model segmentasi badan (~170MB) dari GitHub (HuggingFace disekat dalam persekitaran ni). Whisper: guna video-sticker-edit/scripts/setup.sh
set -e
mkdir -p /root/seg; [ -s /root/seg/u2net_human_seg.onnx ] || curl -sSL -o /root/seg/u2net_human_seg.onnx https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net_human_seg.onnx
ls -la /root/seg/u2net_human_seg.onnx
[ -f /root/asr/sherpa-onnx-whisper-small/small-encoder.int8.onnx ] || echo "Model whisper tiada -> sh skills/video-sticker-edit/scripts/setup.sh"
