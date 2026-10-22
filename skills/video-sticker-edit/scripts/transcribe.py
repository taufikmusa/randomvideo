#!/usr/bin/env python3
# Transkrip video Taufik (Bahasa Melayu) -> senarai [mula, tamat, teks] ikut jeda senyap. Offline, guna sherpa-onnx + Whisper small.
# Setup sekali: pip install sherpa-onnx ; muat turun model dari GitHub (HuggingFace disekat dalam sandbox):
#   curl -L -o small.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.tar.bz2 && tar xjf small.tar.bz2
# Guna: python3 transcribe.py <voice.wav> <folder-model sherpa-onnx-whisper-small>
# Output ada ejaan salah (cth "keuangan", "Tunggar") — BETULKAN ikut konteks sebelum letak dalam SEG.
import sys, re, subprocess, wave, json, numpy as np, sherpa_onnx
wav, d = sys.argv[1], sys.argv[2].rstrip('/') + '/'
tmp = '/tmp/_v16k.wav'; subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', wav, '-ac', '1', '-ar', '16000', tmp], check=True)
w = wave.open(tmp); sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768; dur = len(x) / sr
out = subprocess.run(['ffmpeg', '-i', tmp, '-af', 'silencedetect=noise=-32dB:d=0.22', '-f', 'null', '-'], capture_output=True, text=True).stderr
st = [float(m) for m in re.findall(r'silence_start: ([\d.]+)', out)]; en = [float(m) for m in re.findall(r'silence_end: ([\d.]+)', out)]
b = [0.0] + [(s + e) / 2 for s, e in zip(st, en)] + [dur]; segs = []
for a, c in zip(b[:-1], b[1:]):
    if segs and (segs[-1][1] - segs[-1][0]) < 1.6: segs[-1][1] = c
    else: segs.append([a, c])
r = sherpa_onnx.OfflineRecognizer.from_whisper(encoder=d + 'small-encoder.int8.onnx', decoder=d + 'small-decoder.int8.onnx', tokens=d + 'small-tokens.txt', language='ms', task='transcribe', num_threads=4)
res = []
for a, c in segs:
    s = r.create_stream(); s.accept_waveform(sr, x[int(a * sr):int(c * sr)]); r.decode_stream(s); res.append([round(a, 2), round(c, 2), s.result.text.strip()]); print(res[-1], flush=True)
json.dump(res, open('segs.json', 'w'), ensure_ascii=False)
