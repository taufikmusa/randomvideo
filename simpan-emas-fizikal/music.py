"""Score + sound design for the 30s 'Simpan Emas Fizikal' motion piece.
120 BPM (1 beat = 0.5s), A minor -> resolves to C major at the end card (25s).
Every SFX is locked to the animation timeline in main.js.
Run: python3 music.py -> music.wav
"""
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR, DUR = 44100, 30.0
N = int(SR * DUR)
rng = np.random.default_rng(3)
L, R, VL, VR = (np.zeros(N) for _ in range(4))


def mtof(m): return 440.0 * 2 ** ((m - 69) / 12)
def filt(x, kind, f, order=2): return sosfilt(butter(order, f, kind, fs=SR, output='sos'), x)
def tt(d): return np.arange(int(d * SR)) / SR
def env(d, a=.005, rel=None, k=None):
    t = tt(d); e = np.minimum(1, t / max(a, 1e-4))
    return e * (np.exp(-t * k) if k else np.clip((d - t) / (rel or d), 0, 1))


def add(sig, at, g=1.0, pan=0.0, verb=0.0):
    i = int(at * SR)
    if i >= N or i + len(sig) <= 0: return
    if i < 0: sig, i = sig[-i:], 0
    sig = sig[:N - i]
    gl, gr = g * np.sqrt(.5 * (1 - pan)), g * np.sqrt(.5 * (1 + pan))
    L[i:i + len(sig)] += sig * gl; R[i:i + len(sig)] += sig * gr
    VL[i:i + len(sig)] += sig * gl * verb; VR[i:i + len(sig)] += sig * gr * verb


# ---------- instruments ----------
def kick(g=1.0):
    t = tt(.45); f = 45 + 110 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7) * g + rng.normal(0, 1, len(t)) * np.exp(-t * 300) * .3
def clap():
    t = tt(.3); n = rng.normal(0, 1, len(t)); e = np.exp(-t * 18)
    for d in (.0, .012, .024): e += (t >= d) * np.exp(-np.maximum(t - d, 0) * 120) * .6
    return filt(n * e, 'bandpass', [900, 4000]) * .8
def hat(open_=False):
    d = .25 if open_ else .06; t = tt(d)
    return filt(rng.normal(0, 1, len(t)), 'highpass', 7000) * np.exp(-t * (12 if open_ else 70))
def saw(f, t, det=0.0): return 2 * ((t * f * (1 + det)) % 1) - 1
def pad(notes, d, g=.12):
    t = tt(d); s = sum(saw(mtof(m), t, dt) for m in notes for dt in (-.004, 0, .005))
    s = filt(s, 'lowpass', 1400) * np.minimum(1, t / .6) * np.clip((d - t) / .5, 0, 1)
    return s * g / len(notes)
def bass(m, d):
    t = tt(d); s = saw(mtof(m), t) + .5 * np.sin(2 * np.pi * mtof(m - 12) * t)
    return filt(s, 'lowpass', 380) * env(d, .004, k=3.5) * .5
def pluck(m, d=.4):
    t = tt(d); s = saw(mtof(m), t) * .6 + np.sin(2 * np.pi * mtof(m) * 2 * t) * .3
    return filt(s, 'lowpass', 2600) * env(d, .002, k=9)
def bell(m, d=2.2, g=1.0):
    t = tt(d); f = mtof(m)
    return sum(a * np.sin(2 * np.pi * f * r * t) * np.exp(-t * k) for r, a, k in ((1, 1, 2.2), (2.76, .5, 4), (5.4, .25, 7), (8.9, .12, 11))) * g * np.minimum(1, t / .002)
def noise(d): return rng.normal(0, 1, int(d * SR))
def whoosh(d=.6, lo=400, hi=5000, g=.5):
    t = tt(d); n = noise(d); out = np.zeros_like(n); seg = 512
    for i in range(0, len(n), seg):
        u = i / len(n); fc = lo * (hi / lo) ** np.sin(u * np.pi)
        out[i:i + seg] = filt(n[max(0, i - 2048):i + seg], 'bandpass', [fc * .7, min(fc * 1.4, 20000)])[-len(n[i:i + seg]):]
    return out * np.sin(np.pi * t / d) ** 2 * g
def riser(d, g=.4):
    t = tt(d); n = noise(d); out = np.zeros_like(n); seg = 1024
    for i in range(0, len(n), seg):
        fc = 300 * (40 ** (i / len(n)))
        out[i:i + seg] = filt(n[max(0, i - 4096):i + seg], 'bandpass', [fc * .8, min(fc * 1.3, 20000)])[-len(n[i:i + seg]):]
    tone = np.sin(2 * np.pi * np.cumsum(200 * 8 ** (t / d)) / SR) * .25
    return (out + tone) * (t / d) ** 2 * g
def impact(g=1.0):
    t = tt(2.5); sub = np.sin(2 * np.pi * np.cumsum(30 + 60 * np.exp(-t * 8)) / SR) * np.exp(-t * 1.6)
    crack = filt(noise(2.5), 'lowpass', 3000) * np.exp(-t * 6)
    return (sub * 1.1 + crack * .5) * g
def clink(m=96, g=.5):
    t = tt(.6); f = mtof(m)
    return sum(a * np.sin(2 * np.pi * f * r * t) for r, a in ((1, 1), (1.51, .6), (2.33, .4))) * np.exp(-t * 14) * g
def click(g=.3): t = tt(.02); return filt(noise(.02), 'highpass', 2000) * np.exp(-t * 400) * g
def pop(m=84, g=.4):
    t = tt(.12); f = mtof(m) * (1 + 1.5 * np.exp(-t * 60))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 30) * g


# ---------- arrangement ----------
Am, F, Cm, G = [57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]
Cmaj9 = [48, 55, 59, 62, 64]

# 0-4  tension: drone, clock tick, fire
add(pad([45, 52, 57], 4.2, .16), 0, 1, 0, .4)
for b in range(8): add(click(.35 if b % 2 == 0 else .2), b * .5, 1, -.3 if b % 2 else .3, .1)
add(whoosh(.7, 300, 2500, .35), .1, 1, .2, .3)
add(kick(.6), .95, .9, 0, .2)                                  # note lands
for w, at in ((.5, 2.0), (.5, 2.5), (.7, 3.0)): add(impact(.35)[:int(.5 * SR)], at, w, 0, .2)
crackle = np.zeros(int(2.4 * SR))
for _ in range(260):
    i = rng.integers(0, len(crackle) - 400); crackle[i:i + 400] += filt(noise(400 / SR), 'highpass', 1500) * np.exp(-np.arange(400) / 40) * rng.uniform(.2, 1)
add(crackle + filt(noise(2.4), 'bandpass', [200, 1200]) * .08 * np.sin(np.linspace(0, np.pi, int(2.4 * SR))), 1.5, .5, 0, .2)
add(riser(.9, .55), 3.1, 1, 0, .3)

# 4-8  forge
add(impact(1.0), 4.0, 1, 0, .4)
add(whoosh(1.2, 200, 6000, .6), 4.55, 1, -.4, .4)
add(whoosh(1.0, 300, 7000, .5), 4.95, 1, .4, .4)
add(riser(1.4, .5), 4.6, 1, 0, .3)
for b in range(8): add(kick(.7), 4.0 + b * .5, 1, 0, .1)
add(pad(F, 2.0), 4.0, 1, 0, .5); add(pad(G, 2.0), 6.0, 1, 0, .5)
add(impact(1.2), 6.0, 1, 0, .5)
for m, d in ((81, 0), (88, .08), (93, .16)): add(bell(m, 2.5, .25), 6.0 + d, 1, (d - .08) * 6, .6)
add(whoosh(.9, 2000, 12000, .25), 6.35, 1, 0, .5)               # light sweep
for at in (6.45, 6.7, 7.0): add(bell(100, .8, .12), at, 1, .3, .7)
add(riser(.55, .45), 7.45, 1, 0, .2)

# 8-25 groove (A minor loop), drums + bass + arp
chords = [Am, F, Cm, G, Am, F, Cm, G, Am]
for bar in range(8, 25, 2):
    ch = chords[(bar - 8) // 2]
    add(pad(ch, 2.05, .1), bar, 1, 0, .5)
    root = ch[0] - 12
    for k, (st, dd) in enumerate(((0, .75), (.75, .25), (1.0, .5), (1.5, .5))): add(bass(root, dd), bar + st, 1, 0, 0)
    for s in range(16): add(pluck(ch[s % 3] + 12 + (12 if s % 4 == 3 else 0), .3), bar + s * .125, .22, (-.5 if s % 2 else .5), .3)
for b in range(16, 50):                                           # 8.0 .. 25.0
    at = b * .5
    if 24.4 <= at < 25: continue
    add(kick(.95), at, 1, 0, .05)
    if b % 2: add(clap(), at, .55, 0, .3)
    add(hat(b % 4 == 3), at + .25, .25, .25, .1); add(hat(), at, .12, -.25, .05)
add(impact(.8), 8.0, 1, 0, .4)
for i in range(18): add(click(.3), 8.35 + i * .035 + i * i * .0012, 1, .2, .1)   # slot reels
for at in (8.75, 8.95, 9.15): add(pop(76, .5), at, 1, 0, .2)
add(whoosh(.6, 400, 4000, .35), 9.55, 1, 0, .3)
for k in range(8):
    tl = 10.35 + k * .44 + .32
    add(whoosh(.3, 2000, 8000, .12), tl - .32, 1, .2, .2)
    add(clink(91 + (k % 4) * 2, .4), tl, 1, .3, .4); add(kick(.25), tl, 1, 0, .1)
add(whoosh(.5, 500, 9000, .5), 13.5, 1, -.5, .3)
for i in range(4):
    t0 = 14.55 + i * 1.2
    add(whoosh(.45, 600, 7000, .4), t0, 1, .6, .3)
    add(pop(88 + i * 2, .35), t0 + .78, 1, .4, .4); add(bell(96 + i * 2, .9, .08), t0 + .8, 1, .4, .6)
add(whoosh(.6, 300, 6000, .45), 19.35, 1, -.6, .3)
add(whoosh(.8, 200, 3000, .45), 20.0, 1, 0, .4)
for i in range(21): add(click(.35), 20.85 + i * (1.05 / 21) + rng.uniform(0, .015), 1, .1, .05)  # typing
add(pop(93, .3), 22.3, 1, 0, .3)
for k in range(8): add(pop(79 + k * 2, .18), 22.35 + k * .12, 1, (k % 3 - 1) * .4, .3)
add(pop(72, .5), 24.12, 1, 0, .3); add(click(.5), 24.12)
add(riser(.65, .6), 24.35, 1, 0, .3)

# 25-30 resolve: big hit, C major, coin shimmer
add(impact(1.3), 25.0, 1, 0, .6)
add(pad(Cmaj9, 5.0, .2), 25.0, 1, 0, .7)
add(bass(36, 4.5), 25.0, 1.2, 0, 0)
for k, m in enumerate((72, 76, 79, 83, 84, 88, 91)): add(bell(m, 3.0, .14), 25.3 + k * .18, 1, (k % 2 - .5) * .8, .7)   # coin spin
for at in (26.85, 27.0): add(pop(84, .35), at, 1, 0, .3)
for i in range(21): add(click(.25), 27.2 + i * (.8 / 21), 1, -.1, .05)
for b in range(54, 58): add(kick(.6), b * .5, 1, 0, .1); add(hat(), b * .5 + .25, .15, .2, .1)
add(whoosh(.8, 3000, 14000, .2), 28.2, 1, 0, .6); add(bell(96, 2.0, .2), 28.6, 1, .2, .8)

# ---------- mix ----------
t = tt(2.2)
def mkir():
    ir = filt(rng.normal(0, 1, len(t)) * np.exp(-t * 3.0), 'lowpass', 6000)
    return ir / (np.abs(ir).sum() / 6)
L += fftconvolve(VL, mkir())[:N] * .35
R += fftconvolve(VR, mkir())[:N] * .35
mix = np.stack([L, R], 1)
mix = filt(mix.T, 'highpass', 28).T
fade = np.ones(N); nf = int(.6 * SR); fade[-nf:] = np.linspace(1, 0, nf) ** 2
mix *= fade[:, None]
mix = np.tanh(mix / np.max(np.abs(mix)) * 1.6) / np.tanh(1.6) * .89
wavfile.write('music.wav', SR, (mix * 32767).astype(np.int16))
print('music.wav', mix.shape[0] / SR, 's, peak', np.abs(mix).max())
