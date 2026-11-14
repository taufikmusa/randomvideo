#!/usr/bin/env python3
# Cari masa (saat) sesuatu perkataan/angka mula DITUTURKAN dengan decode awalan + carian binari (Whisper tiada timestamp perkataan).
# python3 -I align_words.py <voice16k.wav> <model_dir> <model_prefix> '<json: [[segA, segB, "label", ["pola1","pola2"]], ...]>'
import sys, json, wave, re, numpy as np, sherpa_onnx
wavp, d, pre, spec = sys.argv[1], sys.argv[2].rstrip('/') + '/', sys.argv[3], json.loads(sys.argv[4])
r = sherpa_onnx.OfflineRecognizer.from_whisper(encoder=d + pre + '-encoder.int8.onnx', decoder=d + pre + '-decoder.int8.onnx', tokens=d + pre + '-tokens.txt', language='ms', task='transcribe', num_threads=4)
w = wave.open(wavp); sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
cache = {}
def txt(a, b):
    k = (round(a, 2), round(b, 2))
    if k not in cache:
        s = r.create_stream(); s.accept_waveform(sr, x[int(a * sr):int(b * sr)]); r.decode_stream(s); cache[k] = s.result.text.lower()
    return cache[k]
out = {}
for a, b, label, pats in spec:
    pats = [re.compile(p) for p in pats]; lo, hi = a + 0.3, b + 0.3
    if not any(p.search(txt(a, hi)) for p in pats): out[label] = None; print(label, 'TAK JUMPA', txt(a, hi)); continue
    while hi - lo > 0.06:
        m = (lo + hi) / 2
        if any(p.search(txt(a, m)) for p in pats): hi = m
        else: lo = m
    out[label] = round(hi, 2); print(label, out[label], '|', txt(a, hi))
json.dump(out, open('/tmp/align_out.json', 'w'))
