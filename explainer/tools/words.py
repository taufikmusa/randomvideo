#!/usr/bin/env python3
# Anggar masa setiap perkataan: agihan berkadar panjang huruf pada paksi "masa bersuara" (jeda senyap dibuang) dalam setiap segmen.
# python3 -I words.py segs.json voice.wav  -> cetak "mula-tamat | perkataan@masa ..." dan tulis words.json
import sys, json, wave, numpy as np
segs = json.load(open(sys.argv[1])); w = wave.open(sys.argv[2]); sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
hop = int(sr * .01); n = len(x) // hop; rms = np.sqrt((x[:n * hop].reshape(n, hop) ** 2).mean(1)); out = []
for a, b, txt in segs:
    ws = txt.split()
    if not ws: continue
    i0, i1 = int(a * 100), min(n, int(b * 100)); r = rms[i0:i1]
    if len(r) < 5: continue
    thr = max(.004, np.percentile(r, 90) * .12); v = (r > thr).astype(float)
    for i in range(1, len(v) - 1):  # tutup jurang < 80 ms
        pass
    k = 0
    while k < len(v):
        if v[k] == 0:
            j = k
            while j < len(v) and v[j] == 0: j += 1
            if j - k < 8 and k > 0 and j < len(v): v[k:j] = 1
            k = j
        else: k += 1
    cum = np.cumsum(v); V = cum[-1] or 1; tot = sum(len(t) + 1 for t in ws); acc = 0; row = []
    for t in ws:
        s_v = acc / tot * V; acc += len(t) + 1; e_v = acc / tot * V
        ts = a + (np.searchsorted(cum, s_v) / 100); te = a + (np.searchsorted(cum, e_v) / 100)
        out.append([t, round(float(ts), 2), round(float(te), 2)]); row.append(f'{t}@{ts:.1f}')
    print(f'{a:5.1f}-{b:5.1f} | ' + ' '.join(row))
json.dump(out, open(sys.argv[1].replace('segs', 'words'), 'w'), ensure_ascii=False)
