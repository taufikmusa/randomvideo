"""Score + SFX for '9 Soalan Lazim GAP' (57s). 120 BPM, A minor groove,
tense drone under Soalan #6, resolves to C major on the @taufik.pg end card.
Every hit is locked to the SEG timeline in main.js.  Run: python3 music.py
"""
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR, DUR = 44100, 57.0
N = int(SR * DUR)
rng = np.random.default_rng(9)
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


def thud(g=.8): return impact(g)[:int(.6 * SR)] * np.linspace(1, 0, int(.6 * SR)) ** 2
def alarm(d=.9, g=.25):
    t = tt(d); f = np.where((t * 6) % 1 < .5, 880, 660)
    return np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * g * .3 * np.minimum(1, (d - t) / .1)
def buzz(g=.35): t = tt(.35); return filt(saw(110, t) + saw(116, t), 'lowpass', 1800) * np.exp(-t * 4) * g


# ---------- arrangement ----------
Am, F, Cm, G = [57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]
Cmaj9 = [48, 55, 59, 62, 64]
SEG = [(0, 4.5), (4.5, 9), (9, 13.5), (13.5, 18), (18, 22.5), (22.5, 27), (27, 33.5), (33.5, 38), (38, 42.5), (42.5, 47), (47, 51), (51, 57)]
Q = SEG[1:10]

# hook
add(pad([45, 52, 57], 4.6, .14), 0, 1, 0, .5)
add(impact(1.0), .15, 1, 0, .4)
for k, at in enumerate((.2, .3, .4)): add(whoosh(.7, 300, 4000, .3), at, 1, (k - 1) * .6, .3)
for at in (.5, .7, 1.0): add(pop(79, .25), at, 1, 0, .3)
for b in range(2, 9): add(kick(.6), b * .5, 1, 0, .1); add(hat(), b * .5 + .25, .15, .2, .1)
add(thud(.9), 2.3, 1, 0, .3); add(alarm(.6, .2), 2.35, 1, 0, .2)
add(riser(1.2, .5), 3.3, 1, 0, .3)

# groove 4.5 -> 51 (drops to a tense drone for #6, 27 -> 33.5)
prog = [Am, F, Cm, G]
for k, bar in enumerate(np.arange(4.5, 51, 2.0)):
    ch = prog[k % 4]
    if 27 <= bar < 33.5: continue
    add(pad(ch, 2.05, .09), bar, 1, 0, .5)
    for st, dd in ((0, .75), (.75, .25), (1.0, .5), (1.5, .5)): add(bass(ch[0] - 12, dd), bar + st, 1, 0, 0)
    for s in range(16): add(pluck(ch[s % 3] + 12 + (12 if s % 4 == 3 else 0), .3), bar + s * .125, .18, (-.5 if s % 2 else .5), .3)
for b in np.arange(4.5, 51, .5):
    if 27 <= b < 33.5 or 46.6 <= b < 47: continue
    i = int(round((b - 4.5) * 2))
    add(kick(.9), b, 1, 0, .05)
    if i % 2: add(clap(), b, .5, 0, .3)
    add(hat(i % 4 == 3), b + .25, .22, .25, .1); add(hat(), b, .1, -.25, .05)
# soalan #6: drone + heartbeat pulse
add(pad([45, 46, 52], 6.6, .2), 27, 1, 0, .6)
add(filt(noise(6.5), 'bandpass', [60, 240]) * .12, 27, 1, 0, .2)
for b in np.arange(27, 33.5, 1.0): add(kick(.8), b, 1, 0, .2); add(kick(.5), b + .25, 1, 0, .2)
for b in np.arange(31, 33.5, .25): add(hat(), b, .18, .3, .1)
add(riser(1.0, .5), 32.5, 1, 0, .3)

# per-question sfx
for n, (s, e) in enumerate(Q):
    add(whoosh(.5, 500, 8000, .45), s - .45, 1, -.4 + .1 * n, .3)
    add(thud(.55), s, 1, 0, .3); add(pop(72 + n, .3), s + .08, 1, 0, .3)
    add(pop(88, .2), s + 2.3, 1, .3, .4)
s = Q[0][0]; [add(click(.3), s + .8 + i * .03 + i * i * .0012, 1, .2, .1) for i in range(20)]; [add(pop(76, .4), s + 1.2 + k * .18) for k in range(3)]
s = Q[1][0]; [add(whoosh(.25, 2000, 9000, .25), s + 1.4 + k * .2, 1, .3, .2) for k in range(3)]; add(thud(1.0), s + 2.4, 1, 0, .4)
s = Q[2][0]; add(whoosh(.6, 300, 5000, .4), s + .6, 1, 0, .3); [add(click(.25), s + 1.7 + k * .06) for k in range(13)]; add(bell(96, 1.2, .15), s + 2.5, 1, .3, .6)
s = Q[3][0]; add(bell(84, 2.0, .2), s + 1.5, 1, 0, .6); add(thud(1.0), s + 2.0, 1, 0, .4)
s = Q[4][0]; [add(click(.35), s + .8 + k * (1.4 / 28)) for k in range(28)]; add(bell(88, 2.0, .22), s + 2.2, 1, 0, .6); add(bell(95, 2.0, .15), s + 2.25, 1, .3, .6)
s = Q[5][0]; add(alarm(.9, .28), s, 1, 0, .2); add(clink(93, .45), s + 1.55, 1, -.3, .3); add(bell(91, 1.2, .2), s + 1.7, 1, -.3, .5)
add(buzz(.45), s + 2.85, 1, .3, .2); add(thud(1.1), s + 3.0, 1, .3, .4); add(pop(70, .3), s + 4.3, 1, 0, .3)
s = Q[6][0]; [add(click(.3), s + .7 + i * .03 + i * i * .0012, 1, .2, .1) for i in range(18)]; add(whoosh(.6, 300, 5000, .4), s + 1.8, 1, -.3, .3); add(whoosh(.6, 300, 5000, .4), s + 2.0, 1, .3, .3)
s = Q[7][0]; add(whoosh(.6, 600, 9000, .4), s + .6, 1, 0, .3); add(pop(84, .35), s + 1.4, 1, 0, .3); add(pop(91, .35), s + 1.9, 1, .3, .3)
s = Q[8][0]; [add(pop(79 + (k % 4) * 3, .15), s + .5 + k * .06, 1, (k % 4 - 1.5) * .3, .2) for k in range(12)]
[add(pop(96, .15), s + 1.2 + k * .08, 1, .2, .3) for k in (0, 1, 3, 6, 7, 9, 10)]; add(thud(1.0), s + 2.4, 1, 0, .4)
# closing
add(whoosh(.7, 300, 5000, .4), 47, 1, 0, .3); add(bell(96, 1.5, .18), 47.9, 1, .3, .7)
[add(pop(79 + k * 2, .2), 49.7 + k * .06, 1, (k - 4) * .1, .3) for k in range(9)]
add(riser(.5, .5), 50.55, 1, 0, .3)
# CTA (C major resolve)
add(impact(1.2), 51, 1, 0, .6); add(pad(Cmaj9, 6.0, .2), 51, 1, 0, .7); add(bass(36, 5.5), 51, 1.1, 0, 0)
for k, m in enumerate((72, 76, 79, 83, 84)): add(bell(m, 2.5, .12), 51.3 + k * .15, 1, (k % 2 - .5) * .8, .7)
for k in range(3): add(pop(80 + k * 3, .3), 52.3 + k * .15, 1, (k - 1) * .5, .3)
add(pop(84, .45), 53.2); add(bell(96, 1.2, .2), 53.2, 1, -.4, .5)
add(whoosh(.4, 1500, 9000, .35), 54.0, 1, 0, .3); add(pop(88, .45), 54.0)
add(pop(91, .45), 54.8, 1, .4); add(bell(100, 1.5, .22), 54.8, 1, .4, .6)
for b in np.arange(53, 56.5, .5): add(kick(.55), b, 1, 0, .1); add(hat(), b + .25, .15, .2, .1)
add(whoosh(.8, 3000, 14000, .2), 56.0, 1, 0, .6)

# ---------- mix ----------
t = tt(2.2)
def mkir():
    ir = filt(rng.normal(0, 1, len(t)) * np.exp(-t * 3.0), 'lowpass', 6000)
    return ir / (np.abs(ir).sum() / 6)
L += fftconvolve(VL, mkir())[:N] * .35
R += fftconvolve(VR, mkir())[:N] * .35
mix = filt(np.stack([L, R]), 'highpass', 28).T
fade = np.ones(N); nf = int(.5 * SR); fade[-nf:] = np.linspace(1, 0, nf) ** 2
mix *= fade[:, None]
mix = np.tanh(mix / np.max(np.abs(mix)) * 1.8) / np.tanh(1.8) * .89
wavfile.write('music.wav', SR, (mix * 32767).astype(np.int16))
print('music.wav', mix.shape[0] / SR, 's')
