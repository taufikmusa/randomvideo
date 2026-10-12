# SFX LEMBUT (pilihan — salin ke <projek>/sfx.py untuk aktifkan): bunyi kertas terkoyak pada setiap transisi + pop halus.
# Baca sfx.json (dijana render.js) -> sfx.wav. render.js campur pada volume .4 (tak kuat).
import numpy as np, json, wave
from scipy.signal import butter, lfilter
SR = 44100; sfx = json.load(open('sfx.json')); DUR = sfx['dur']; n = int(SR * DUR); rng = np.random.default_rng(11); L = np.zeros(n)
def add(sig, at, g=1.0):
    i = int(at * SR)
    if i < 0 or i >= n: return
    sig = sig[:n - i]; L[i:i + len(sig)] += sig * g
def bp(x, lo, hi): b, a = butter(2, [lo / (SR / 2), hi / (SR / 2)], 'band'); return lfilter(b, a, x)
for t in sfx['tears']:   # kertas koyak: bunyi serak + retak-retak halus, dari kiri ke kanan (menurun)
    ln = int(.55 * SR); tt = np.arange(ln) / SR; nz = rng.standard_normal(ln)
    crack = (rng.random(ln) < .012) * rng.standard_normal(ln) * 4; crack = lfilter([1], [1, -.6], crack)
    body = bp(nz, 1800, 7500) * (.5 + .5 * np.sin(tt * 90 + rng.random() * 6)) ** 2
    env = np.minimum(1, tt / .05) * np.exp(-tt * 4.5) * (tt < .5)
    add((body * .55 + bp(crack, 1500, 9000) * .5) * env, t)
for t in sfx['pops']:    # pop halus
    tp = np.arange(int(.14 * SR)) / SR; add(np.sin(2 * np.pi * (480 + 260 * np.exp(-tp * 30)) * tp) * np.exp(-tp * 26) * .35, t)
pk = max(np.abs(L).max(), 1e-6); st = (np.stack([L, L], 1) / pk * .6 * 32767).astype(np.int16)
with wave.open('sfx.wav', 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('sfx.wav', DUR, 'saat,', len(sfx['tears']), 'tear,', len(sfx['pops']), 'pop')
