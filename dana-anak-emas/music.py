"""Score + SFX for 'Dana Anak: 1 Bulan 1 Gram' (96s). 120 BPM, warm F major (F-C-Dm-Bb), tense minor
pocket for the two problems, emotional lift under the running footage, resolve on the
@taufik.pg end card. Original footage audio (a music track) is NOT used.
Every hit is locked to the SEG timeline in main.js.  Run: python3 music.py
"""
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR, DUR = 44100, 96.0
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


def drip(g=.25):
    t = tt(.18); f = 1400 * np.exp(-t * 18) + 500
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 22) * g


# ---------- arrangement ----------
Fm_, Cc, Dm, Bb = [53, 57, 60], [48, 52, 55], [50, 53, 57], [46, 50, 53]
prog = [Fm_, Cc, Dm, Bb]
Fmaj9 = [41, 48, 52, 55, 57, 60]

def groove(a, b, level=1.0, clap_=True, arp=True, half=False, chords=None):
    chords = chords or prog
    for bar in np.arange(a, b - .01, 2.0):
        ch = chords[int(bar / 2) % len(chords)]
        add(pad(ch, 2.05, .09), bar, 1, 0, .5)
        for st, dd in ((0, .75), (.75, .25), (1.0, .5), (1.5, .5)): add(bass(ch[0] - 12, dd), bar + st, level, 0, 0)
        if arp:
            for s in range(16): add(pluck(ch[s % 3] + 12 + (12 if s % 4 == 3 else 0), .3), bar + s * .125, .16 * level, (-.5 if s % 2 else .5), .3)
    for b in np.arange(a, b - .01, .5):
        i = int(round(b * 2))
        if half and i % 2: continue
        add(kick(.9 * level), b, 1, 0, .05)
        if clap_ and i % 2: add(clap(), b, .45 * level, 0, .3)
        add(hat(i % 4 == 3), b + .25, .2 * level, .25, .1); add(hat(), b, .09 * level, -.25, .05)

def soft(a, b, chords=None):  # pads + gentle plucks, no drums
    chords = chords or prog
    for bar in np.arange(a, b - .01, 2.0):
        ch = chords[int(bar / 2) % len(chords)]
        add(pad(ch, 2.1, .13), bar, 1, 0, .6); add(bass(ch[0] - 12, 1.9), bar, .6, 0, 0)
        for s in range(8): add(pluck(ch[s % 3] + 12 + (12 if s % 4 == 3 else 0), .5), bar + s * .25, .14, (-.4 if s % 2 else .4), .5)

# S1 hook (soft) + typing
soft(0, 8)
add(pop(84, .3), 1.0, 1, 0, .3)
for i in range(30): add(click(.22), 1.5 + i * .09 + rng.uniform(0, .02), 1, .2, .05)
add(bell(89, 1.8, .16), 4.5, 1, -.3, .7); add(bell(93, 1.8, .14), 4.9, 1, .3, .7)
# S2 kesilapan
groove(8, 15, .8, clap_=False)
add(whoosh(.5, 500, 7000, .35), 6.6, 1, 0, .3); add(alarm(.4, .12), 7.2, 1, 0, .2)
for k in range(3): add(pop(79 + k * 3, .3), 8.0 + k * .5, 1, (k - 1) * .5, .3)
add(thud(.6), 9.6, 1, 0, .3)
for k in range(3): add(whoosh(.5, 800, 6000, .25), 10.6 + k * .15, 1, (k - 1) * .4, .3); add(clink(89 + k * 2, .3), 11.35 + k * .15, 1, 0, .3)
add(buzz(.3), 12.0)
# S3 terpinjam (minor, tense)
mn = [[45, 48, 52], [41, 45, 48]]
groove(15, 22, .85, arp=False, half=True, chords=mn)
add(pad([45, 48, 52, 58], 7.0, .1), 15, 1, 0, .6)
add(impact(.7), 15.0, 1, 0, .4)
for k in range(4): add(clink(84 - k * 2, .35), 17.0 + k * .8 + .5, 1, (k % 2 - .5) * .6, .3); add(buzz(.22), 17.0 + k * .8 + .55, 1, (k % 2 - .5) * .6, .2)
add(whoosh(.5, 500, 6000, .4), 21.6, 1, 0, .3)
# S4 inflasi
groove(22, 30, .9, chords=mn)
add(impact(.6), 22.0, 1, 0, .4); add(riser(2.4, .35), 23.6, 1, 0, .3)
add(thud(.6), 24.1, 1, 0, .3)
# S5 Housel (breakdown, emotional)
soft(30, 39)
add(whoosh(.8, 300, 5000, .3), 29.8, 1, 0, .4); add(pop(76, .3), 30.2, 1, -.3, .3)
for a in range(19): add(click(.25 if a % 6 else .45), 31.6 + 2.8 * (a / 18), 1, (a / 18 - .5), .1)
add(pop(84, .35), 34.3, 1, .4, .3); add(bell(96, 1.4, .18), 34.3, 1, .4, .7)
for k, m in enumerate((77, 81, 84, 89)): add(bell(m, 2.4, .12), 35.0 + k * .12, 1, (k - 1.5) * .4, .8)
# S6 Canfield
groove(39, 46, 1.0)
add(whoosh(.5, 500, 7000, .35), 38.6, 1, 0, .3); add(pop(76, .3), 39.2)
for i in range(12): add(pop(88 + (i % 4) * 2, .2), 41.6 + i * .2, 1, ((i % 4) - 1.5) * .3, .3)
add(thud(1.0), 44.4, 1, 0, .4)
# S7 1 bulan 1 gram (build)
groove(46, 60, 1.0)
add(impact(1.0), 46.3, 1, 0, .4); add(impact(1.0), 46.8, 1, 0, .5)
add(whoosh(.8, 3000, 14000, .25), 47.4, 1, 0, .6)
for m, d in ((81, 0), (88, .08), (93, .16)): add(bell(m, 2.2, .18), 46.8 + d, 1, (d - .08) * 6, .6)
for k, t0 in enumerate((50.0, 52.4, 55.0)): add(whoosh(.5, 600, 7000, .35), t0, 1, .4, .3); add(pop(79 + k * 4, .3), t0 + .3, 1, .3, .3)
for k in range(18): add(click(.22), 53.0 + k * .1, 1, .3, .05)
for k in range(6): add(clink(89 + (k % 3) * 3, .3), 55.6 + k * .18, 1, .3, .3)
add(pop(91, .35), 56.8); add(bell(96, 1.6, .18), 57.0, 1, -.3, .7)
# S8 tiga pengajaran
groove(60, 73, 1.0)
for k, t0 in enumerate((60.0, 64.3, 68.6)): add(whoosh(.5, 500, 8000, .4), t0 - .4, 1, -.3, .3); add(thud(.7), t0, 1, 0, .3); add(pop(74 + k * 3, .3), t0 + .08)
add(click(.6), 65.7); add(pop(70, .4), 65.7); add(clink(93, .35), 70.0, 1, .3, .4)
# S9 analogi (light, drips)
soft(73, 81)
for b in np.arange(73, 81, 1.0): add(kick(.4), b, 1, 0, .1)
for k in range(14): add(drip(.22), 74.2 + k * .5 + (k % 3) * .07, 1, -.4, .4)
add(bell(93, 2.0, .14), 74.0, 1, .4, .7); add(pop(76, .35), 78.4); add(buzz(.2), 78.8)
# S10 menara gading (emotional peak)
for k, ch in enumerate(([53, 57, 60, 64], [48, 55, 60, 64], [50, 57, 62, 65], [46, 53, 58, 62])):
    add(pad(ch, 1.8, .17), 81.0 + k * 1.75, 1, 0, .7); add(bass(ch[0] - 12, 1.7), 81.0 + k * 1.75, .9, 0, 0)
    for s in range(14): add(pluck(ch[s % 4] + 12, .4), 81.0 + k * 1.75 + s * .125, .12, (-.4 if s % 2 else .4), .5)
for b in np.arange(81, 88, .5): add(kick(.6), b, 1, 0, .1); add(hat(), b + .25, .14, .3, .1)
add(whoosh(.6, 2000, 12000, .2), 80.85, 1, 0, .5)
add(whoosh(.6, 400, 6000, .35), 83.9, 1, 0, .3); add(pop(84, .4), 84.4); add(bell(96, 2.0, .2), 84.5, 1, .3, .7)
add(whoosh(.8, 3000, 14000, .2), 85.5, 1, 0, .6)
# S11 kesimpulan
add(pad([41, 48, 53, 57, 60], 3.6, .17), 88.0, 1, 0, .7)
for k in range(5): add(clink(89 + k * 2, .28), 90.2 + k * .12, 1, (k - 2) * .2, .4)
add(riser(.6, .5), 90.9, 1, 0, .3)
# S12 CTA resolve
add(impact(1.2), 91.5, 1, 0, .6); add(pad(Fmaj9, 4.5, .2), 91.5, 1, 0, .7); add(bass(41, 4.0), 91.5, 1.1, 0, 0)
for k, m in enumerate((77, 81, 84, 88, 89)): add(bell(m, 2.5, .12), 91.7 + k * .15, 1, (k % 2 - .5) * .8, .7)
for k in range(3): add(pop(80 + k * 3, .3), 92.2 + k * .1, 1, (k - 1) * .5, .3)
add(pop(84, .45), 92.9); add(bell(96, 1.2, .2), 92.9, 1, -.4, .5); add(whoosh(.4, 1500, 9000, .3), 93.4); add(pop(88, .45), 93.4)
add(pop(91, .45), 93.9, 1, .4); add(bell(100, 1.5, .22), 93.9, 1, .4, .6)
for b in np.arange(94, 95.5, .5): add(kick(.5), b, 1, 0, .1); add(hat(), b + .25, .15, .2, .1)
add(whoosh(.8, 3000, 14000, .2), 94.9, 1, 0, .6)

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
