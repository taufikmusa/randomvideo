"""Score + SFX for 'Simpan, Lupa, Dan Tenang' (90s). 120 BPM, A minor groove with a tape-rewind
hook, a breakdown for the quote, an emotional lift under the footage, and a C major
resolve on the @taufik.pg end card.
Every hit is locked to the SEG timeline in main.js.  Run: python3 music.py
"""
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR, DUR = 44100, 90.0
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


def tapestop(d=.5, g=.4):
    t = tt(d); f = 400 * (1 - t / d) ** 2 + 30
    return filt(np.sin(2 * np.pi * np.cumsum(f) / SR), 'lowpass', 2000) * (1 - t / d) * g
def rewind(d=.7, g=.35):
    t = tt(d); n = noise(d); out = np.zeros_like(n); seg = 256
    for i in range(0, len(n), seg):
        fc = 1500 + 1200 * np.sin(i / SR * 90)
        out[i:i + seg] = filt(n[max(0, i - 2048):i + seg], 'bandpass', [fc * .7, fc * 1.4])[-len(n[i:i + seg]):]
    chirp = np.sin(2 * np.pi * np.cumsum(900 + 700 * np.sin(t * 70)) / SR) * .3
    return (out + chirp) * g * np.minimum(1, t / .05) * np.minimum(1, (d - t) / .05)
def shutter(g=.6):
    out = np.zeros(int(.14 * SR)); c = click(1.0); out[:len(c)] += c; out[int(.06 * SR):int(.06 * SR) + len(c)] += c * .8
    b = filt(noise(.08), 'bandpass', [800, 5000]) * np.exp(-tt(.08) * 40); out[:len(b)] += b * .5
    return out * g
def crackle(d, g=.5):
    c = np.zeros(int(d * SR))
    for _ in range(int(110 * d)):
        i = rng.integers(0, len(c) - 400); c[i:i + 400] += filt(noise(400 / SR), 'highpass', 1500) * np.exp(-np.arange(400) / 40) * rng.uniform(.2, 1)
    return (c + filt(noise(d), 'bandpass', [200, 1200]) * .08 * np.sin(np.linspace(0, np.pi, len(c)))) * g


# ---------- arrangement ----------
Am, F, Cm, G = [57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]
Cmaj9 = [48, 55, 59, 62, 64]
prog = [Am, F, Cm, G]

def groove(a, b, level=1.0, clap_=True, arp=True, half=False):
    for bar in np.arange(a, b - .01, 2.0):
        ch = prog[int(bar / 2) % 4]
        add(pad(ch, 2.05, .09), bar, 1, 0, .5)
        for st, dd in ((0, .75), (.75, .25), (1.0, .5), (1.5, .5)): add(bass(ch[0] - 12, dd), bar + st, level, 0, 0)
        if arp:
            for s in range(16): add(pluck(ch[s % 3] + 12 + (12 if s % 4 == 3 else 0), .3), bar + s * .125, .17 * level, (-.5 if s % 2 else .5), .3)
    for b in np.arange(a, b - .01, .5):
        i = int(round(b * 2))
        if half and i % 2: continue
        add(kick(.9 * level), b, 1, 0, .05)
        if clap_ and i % 2: add(clap(), b, .5 * level, 0, .3)
        add(hat(i % 4 == 3), b + .25, .22 * level, .25, .1); add(hat(), b, .1 * level, -.25, .05)

# S1 hook
add(pad([45, 52, 57, 64], 2.0, .12), 0, 1, 0, .6)
for k, m in enumerate((88, 91, 95)): add(bell(m, 1.5, .14), .1 + k * .35, 1, (k - 1) * .5, .7)
add(tapestop(.5, .5), 1.55); add(rewind(.7, .4), 1.6, 1, 0, .2)
add(impact(1.0), 2.3, 1, 0, .4)
groove(2.0, 13.0, .75, clap_=False, arp=False)
add(whoosh(.3, 2000, 9000, .3), 3.45, 1, .3, .2); add(thud(.7), 3.9, 1, 0, .3); add(whoosh(.8, 3000, 14000, .2), 4.5, 1, 0, .5)
add(whoosh(.8, 300, 4000, .4), 5.2, 1, 0, .3)
# S2
add(thud(.6), 6.5, 1, 0, .3); add(whoosh(.3, 2000, 9000, .3), 7.4, 1, -.3, .2); add(pop(79, .3), 8.2, 1, 0, .3); add(bell(93, 1.6, .2), 8.9, 1, .3, .6)
add(riser(.9, .4), 12.1, 1, 0, .3)
# S3
add(whoosh(.5, 500, 8000, .4), 12.6, 1, 0, .3); add(impact(.9), 14.45, 1, 0, .4)
add(riser(1.0, .5), 14.6, 1, 0, .3); add(whoosh(1.0, 200, 9000, .6), 15.3, 1, -.5, .5); add(whoosh(1.0, 200, 9000, .6), 15.5, 1, .5, .5)
groove(16.0, 29.0)
add(impact(.8), 16.2, 1, 0, .4)
for k in range(5): add(pop(76 + k * 2, .22), 16.8 + k * .12, 1, (k - 2) * .3, .3)
add(whoosh(.5, 500, 6000, .35), 18.75, 1, 0, .3)
for k in range(8): add(clink(89 + (k % 4) * 2, .3), 19.6 + k * .38, 1, .2, .3)
# S4
add(shutter(.8), 23.0, 1, 0, .3); add(whoosh(.6, 400, 5000, .3), 23.15, 1, -.3, .3)
add(crackle(2.8, .45), 24.9, 1, -.4, .2)
for k in range(4): add(clink(91 + k * 2, .3), 25.25 + k * .35, 1, .4, .4)
add(bell(88, 2.2, .2), 27.6, 1, 0, .7)
# S5 breakdown -> forge
add(pad([45, 52, 57, 60, 64], 4.6, .16), 29.0, 1, 0, .7)
for b in np.arange(29, 33.4, 1.0): add(kick(.45), b, 1, 0, .2)
add(riser(1.8, .45), 31.6, 1, 0, .3); add(crackle(.7, .4), 32.4, 1, 0, .2); add(whoosh(1.0, 300, 7000, .5), 33.2, 1, 0, .4)
add(impact(1.2), 34.35, 1, 0, .5)
for m, d in ((81, 0), (88, .08), (93, .16)): add(bell(m, 2.5, .22), 34.4 + d, 1, (d - .08) * 6, .6)
groove(35.0, 51.0)
# S6 comparison rows
for i in range(4):
    tg = 38.4 + i * 3.0; add(pop(88, .3), tg + .1, 1, -.4, .3); add(bell(96, .9, .1), tg + .15, 1, -.4, .6)
    tp = 39.9 + i * 3.0; add(buzz(.3), tp + .1, 1, .4, .2)
# S7 tense half-time
groove(51.0, 58.0, .8, clap_=True, arp=False, half=True)
add(pad([45, 48, 52, 58], 7.0, .1), 51, 1, 0, .6)
add(pop(72, .3), 52.4); add(whoosh(.3, 1500, 7000, .25), 52.7); add(pop(76, .3), 53.0)
t_ = tt(1.9); add(np.sin(2 * np.pi * np.cumsum(300 + 500 * t_ / 1.9) / SR) * .06 * np.sin(np.pi * t_ / 1.9), 53.7, 1, 0, .3)
add(pop(84, .35), 56.0); add(bell(91, 1.4, .18), 56.3, 1, 0, .6)
# S8
groove(58.0, 67.0, .9)
add(impact(.9), 59.2, 1, 0, .4)
for u in (.22, .42, .6, .78, .95): add(pop(84 + int(u * 10), .3), 60.9 + u * 3.3, 1, u - .5, .3)
add(whoosh(.5, 600, 6000, .3), 60.4, 1, 0, .3)
# S9 emotional lift over footage (major colour)
for k, ch in enumerate(([53, 57, 60, 64], [48, 55, 60, 64], [55, 59, 62, 67], [57, 60, 64, 67])):
    add(pad(ch, 1.85, .16), 67.0 + k * 1.75, 1, 0, .7); add(bass(ch[0] - 12, 1.7), 67.0 + k * 1.75, .9, 0, 0)
for b in np.arange(67, 74, .5): add(hat(), b + .25, .14, .3, .2)
for b in np.arange(67, 74, 1.0): add(kick(.5), b, 1, 0, .1)
add(click(.4), 68.2); add(click(.4), 68.25)
for k in range(10): add(click(.25), 69.0 + k * .12, 1, .4)
for k, m in enumerate((84, 88, 91, 96)): add(bell(m, 2.0, .13), 70.3 + k * .12, 1, (k - 1.5) * .4, .7)
add(whoosh(.8, 3000, 14000, .2), 71.6, 1, 0, .5); add(bell(100, 1.5, .2), 73.2, 1, .3, .7)
# S10 slams
for k in range(4): add(impact(.7), 74.35 + k * .5, 1, (k % 2 - .5) * .4, .3)
groove(76.0, 81.0, 1.0)
for k in range(6): add(click(.3), 74.5 + k * .4, 1, .3)
add(bell(93, 1.5, .2), 77.3, 1, 0, .6)
for k in range(7): add(clink(89 + (k % 4) * 2, .28), 78.1 + k * .25, 1, .2, .3)
add(click(.6), 79.9); add(pop(70, .4), 79.9)
# S11
add(pop(79, .3), 81.7); add(whoosh(.5, 1000, 9000, .35), 82.55, 1, 0, .3); add(whoosh(.6, 400, 5000, .3), 83.2, 1, -.4, .3); add(pop(86, .35), 83.65, 1, .4, .3)
add(riser(.8, .5), 84.75, 1, 0, .3)
# S12 resolve
add(impact(1.2), 85.5, 1, 0, .6); add(pad(Cmaj9, 4.5, .2), 85.5, 1, 0, .7); add(bass(36, 4.0), 85.5, 1.1, 0, 0)
for k, m in enumerate((72, 76, 79, 83, 84)): add(bell(m, 2.5, .12), 85.7 + k * .15, 1, (k % 2 - .5) * .8, .7)
for k in range(3): add(pop(80 + k * 3, .3), 86.2 + k * .1, 1, (k - 1) * .5, .3)
add(pop(84, .45), 86.9); add(bell(96, 1.2, .2), 86.9, 1, -.4, .5); add(whoosh(.4, 1500, 9000, .3), 87.4); add(pop(88, .45), 87.4)
add(pop(91, .45), 87.9, 1, .4); add(bell(100, 1.5, .22), 87.9, 1, .4, .6)
for b in np.arange(88, 89.5, .5): add(kick(.5), b, 1, 0, .1); add(hat(), b + .25, .15, .2, .1)
add(whoosh(.8, 3000, 14000, .2), 88.9, 1, 0, .6)

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
