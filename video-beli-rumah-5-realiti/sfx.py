# SFX sahaja (TANPA muzik latar): whoosh di setiap wipe + pop di setiap elemen. Baca sfx.json (dijana render.js) -> sfx.wav
import numpy as np, json, wave
from scipy.signal import butter, lfilter
SR = 44100; sfx = json.load(open('sfx.json')); DUR = sfx['dur']; n = int(SR * DUR); rng = np.random.default_rng(7)
L = np.zeros(n); R = np.zeros(n)
def add(sig, at, g=1.0):
    i = int(at * SR)
    if i < 0: return
    sig = sig[:max(0, n - i)]; L[i:i+len(sig)] += sig * g; R[i:i+len(sig)] += sig * g
for w in sfx['wipes']:  # whoosh: bunyi angin naik + sapuan
    ln = int(.55 * SR); tt = np.arange(ln) / SR; nz = rng.standard_normal(ln); sw = np.zeros(ln)
    for k in range(0, ln, 512):
        fc = 300 + 5200 * (k / ln) ** 1.5; b, a = butter(2, min(fc, 9000) / (SR / 2), 'low'); sw[k:k+512] = lfilter(b, a, nz[k:k+512])
    add(sw * np.sin(np.pi * np.clip(tt / .55, 0, 1)) ** 2 * .35, w - .22)
for p in sfx['pops']:   # pop: nada naik pendek
    tp = np.arange(int(.18 * SR)) / SR; f = 520 + 380 * np.exp(-tp * 30)
    add(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tp * 22) * .22, p)
pk = max(np.abs(L).max(), 1e-6); st = (np.stack([L, R], 1) / pk * .85 * 32767).astype(np.int16)
with wave.open('sfx.wav', 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('sfx.wav', DUR, 'saat,', len(sfx['wipes']), 'whoosh,', len(sfx['pops']), 'pop')
