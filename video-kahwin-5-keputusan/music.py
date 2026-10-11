# Muzik latar halus + SFX (whoosh di setiap wipe, pop di setiap elemen). Baca sfx.json (dijana render.js). -> music.wav
import numpy as np, json, wave, os
SR = 44100; DUR = 83.04; n = int(SR * DUR); rng = np.random.default_rng(7)
sfx = json.load(open('sfx.json')) if os.path.exists('sfx.json') else {'wipes': [], 'pops': []}
t = np.arange(n) / SR; L = np.zeros(n); R = np.zeros(n)
def add(sig, at, g=1.0, pan=0.0):
    i = int(at * SR); sig = sig[:max(0, n - i)]
    if i < 0 or len(sig) == 0: return
    L[i:i+len(sig)] += sig * g * (1 - max(0, pan)); R[i:i+len(sig)] += sig * g * (1 + min(0, pan))
# --- bed: 96 BPM, Am-F-C-G pad + pluck arpeggio + kick/hat lembut
bpm = 96; beat = 60 / bpm; chords = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
mf = lambda m: 440 * 2 ** ((m - 69) / 12)
for bar in range(int(DUR / (beat * 4)) + 1):
    t0 = bar * beat * 4; ch = chords[bar % 4]; ln = int(beat * 4 * SR); tt = np.arange(ln) / SR
    env = np.minimum(1, tt / .6) * np.minimum(1, (beat * 4 - tt) / .6)
    pad = sum(np.sin(2 * np.pi * mf(m) * tt) + .4 * np.sin(2 * np.pi * mf(m) * 2.003 * tt) for m in ch) * env * .035
    add(pad, t0, 1, -.2); add(pad, t0, 1, .2)
    for k in range(8):
        m = ch[k % 3] + 12 * (k % 2 == 1); tp = np.arange(int(.5 * SR)) / SR
        add((np.sin(2 * np.pi * mf(m) * tp) * np.exp(-tp * 7)) * .05, t0 + k * beat / 2, 1, (-.3 if k % 2 else .3))
    for b in range(4):
        tk = np.arange(int(.25 * SR)) / SR; f = 110 * np.exp(-tk * 18) + 45
        add(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tk * 11) * .22, t0 + b * beat)
        th = np.arange(int(.05 * SR)) / SR; add(rng.standard_normal(len(th)) * np.exp(-th * 90) * .012, t0 + b * beat + beat / 2)
# --- whoosh
for w in sfx['wipes']:
    ln = int(.55 * SR); tt = np.arange(ln) / SR; nz = rng.standard_normal(ln)
    from scipy.signal import butter, lfilter
    sw = np.zeros(ln); a = 0
    for k in range(0, ln, 512):
        fc = 300 + 5200 * (k / ln) ** 1.5; bb, aa = butter(2, min(fc, 9000) / (SR / 2), 'low'); sw[k:k+512] = lfilter(bb, aa, nz[k:k+512])
    env = np.sin(np.pi * np.clip(tt / .55, 0, 1)) ** 2
    add(sw * env * .35, w - .22, 1, 0)
# --- pop
for p in sfx['pops']:
    tp = np.arange(int(.18 * SR)) / SR; f = 520 + 380 * np.exp(-tp * 30)
    add(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tp * 22) * .22, p, 1, 0)
# fade in/out, normalise
fade = np.minimum(1, t / 1.0) * np.minimum(1, (DUR - t) / 1.2); L *= fade; R *= fade
pk = max(np.abs(L).max(), np.abs(R).max(), 1e-6); st = (np.stack([L, R], 1) / pk * .85 * 32767).astype(np.int16)
with wave.open('music.wav', 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('music.wav', DUR)
