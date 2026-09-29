"""video-timeline score — 90s, 120 BPM, vi-IV-I-V (E major, transposable).

Topic-specific sound design comes from sfx.json (same folder):
  {"key_shift": 0,                      # semitones, e.g. -2 = D major, +1 = F major
   "events": [{"type": "ring", "bar": 0, "beat": 0.3}, ...]}
Event types: ring, clicks (count), dtmf, beep2, shutter, coin, whoosh, typing (count), boom, bell (note).
Run: python3 music.py  -> music.wav

1 bar = 2.0s. Structure (bars, 0-indexed):
  0-1   cold open   pad (+ your sfx hook)
  2-3   title       boom, pad, bells
  4-15  act 1       half-time kick, pluck arp, timpani
  16-25 act 2       four-on-floor, 16th arp
  26-27 pivot       breakdown, riser
  28-35 act 3       brighter groove, snare roll build, gap before the drop
  36-41 drop        full band + lead + brass stabs
  42-44 finale      huge tonic hit, soft tail at bar 44 (put a callback sfx there)
"""
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR = 44100
BPM = 120
BEAT = 60 / BPM
BAR = BEAT * 4
DUR = 90.0
N = int(SR * DUR)
rng = np.random.default_rng(7)

L = np.zeros(N)
R = np.zeros(N)
VERB_L = np.zeros(N)
VERB_R = np.zeros(N)


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def lp(x, fc, order=2):
    return sosfilt(butter(order, min(fc, SR / 2 - 100) / (SR / 2), 'low', output='sos'), x)


def hp(x, fc, order=2):
    return sosfilt(butter(order, fc / (SR / 2), 'high', output='sos'), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo / (SR / 2), hi / (SR / 2)], 'band', output='sos'), x)


def add(sig, start, gain=1.0, pan=0.0, verb=0.0):
    i = int(start * SR)
    if i >= N:
        return
    sig = sig[: N - i]
    gl = gain * np.sqrt(0.5 * (1 - pan))
    gr = gain * np.sqrt(0.5 * (1 + pan))
    L[i:i + len(sig)] += sig * gl
    R[i:i + len(sig)] += sig * gr
    if verb:
        VERB_L[i:i + len(sig)] += sig * gl * verb
        VERB_R[i:i + len(sig)] += sig * gr * verb


def env_adsr(n, a, d, s, r):
    a, d, r = int(a * SR), int(d * SR), int(r * SR)
    e = np.full(n, float(s))
    a = min(a, n)
    e[:a] = np.linspace(0, 1, a, endpoint=False)
    dd = min(d, n - a)
    e[a:a + dd] = np.linspace(1, s, dd, endpoint=False)
    if r > 0 and n > r:
        e[-r:] *= np.linspace(1, 0, r)
    return e


def saw(freq, n, phase=0.0):
    t = np.arange(n) / SR
    return 2 * ((t * freq + phase) % 1.0) - 1


# ---------------------------------------------------------------- instruments
def pad(notes, length, bright=1800, gain=0.12, detune=0.12):
    n = int(length * SR)
    outL = np.zeros(n)
    outR = np.zeros(n)
    for m in notes:
        f = mtof(m)
        for k, dt in enumerate((-detune, 0, detune)):
            s = saw(f * 2 ** (dt / 12), n, phase=rng.random())
            if k != 2:
                outL += s
            if k != 0:
                outR += s
    e = env_adsr(n, 0.6, 0.4, 0.85, 0.7)
    outL = lp(outL, bright) * e
    outR = lp(outR, bright) * e
    return outL * gain / len(notes), outR * gain / len(notes)


def pluck(m, length=0.35, gain=0.18):
    n = int(length * SR)
    t = np.arange(n) / SR
    f = mtof(m)
    s = 0.6 * np.sin(2 * np.pi * f * t) + 0.25 * np.sin(4 * np.pi * f * t) + 0.12 * np.sin(6 * np.pi * f * t)
    s += 0.15 * saw(f, n)
    return s * np.exp(-t * 9) * gain


def bell(m, length=2.5, gain=0.10):
    n = int(length * SR)
    t = np.arange(n) / SR
    f = mtof(m)
    s = np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 3) \
        + 0.3 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t * 6)
    return s * np.exp(-t * 1.6) * gain


def bass(m, length, gain=0.35):
    n = int(length * SR)
    t = np.arange(n) / SR
    f = mtof(m)
    s = np.sin(2 * np.pi * f * t) + 0.35 * lp(saw(f, n), 600)
    return s * env_adsr(n, 0.005, 0.1, 0.8, min(0.08, length / 3)) * gain


def kick(gain=0.9):
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    f = 45 + 110 * np.exp(-t * 30)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * np.exp(-t * 7)
    s += 0.3 * hp(rng.standard_normal(n), 3000) * np.exp(-t * 150)
    return np.tanh(s * 1.6) * gain


def snare(gain=0.4, tone=190):
    n = int(0.3 * SR)
    t = np.arange(n) / SR
    s = 0.5 * np.sin(2 * np.pi * tone * t) * np.exp(-t * 25)
    s += bp(rng.standard_normal(n), 1200, 9000) * np.exp(-t * 14)
    return s * gain


def clap(gain=0.35):
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    noise = bp(rng.standard_normal(n), 900, 5000)
    e = np.zeros(n)
    for o in (0, 0.011, 0.022):
        i = int(o * SR)
        e[i:] += np.exp(-(t[: n - i]) * (60 if o < 0.02 else 12))
    return noise * e * gain


def hat(gain=0.12, open_=False):
    n = int((0.25 if open_ else 0.06) * SR)
    t = np.arange(n) / SR
    s = hp(rng.standard_normal(n), 7000, 4)
    return s * np.exp(-t * (14 if open_ else 70)) * gain


def boom(gain=1.0, length=3.5):
    n = int(length * SR)
    t = np.arange(n) / SR
    f = 32 + 70 * np.exp(-t * 6)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.1)
    s += 0.5 * lp(rng.standard_normal(n), 400) * np.exp(-t * 4)
    return np.tanh(s * 1.5) * gain


def timpani(m, gain=0.5):
    n = int(1.6 * SR)
    t = np.arange(n) / SR
    f = mtof(m)
    s = np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 1.5 * t) * np.exp(-t * 3)
    s += 0.4 * lp(rng.standard_normal(n), 800) * np.exp(-t * 20)
    return s * np.exp(-t * 2.2) * gain


def crash(gain=0.25, length=3.0):
    n = int(length * SR)
    t = np.arange(n) / SR
    s = hp(rng.standard_normal(n), 4000, 2)
    return s * np.exp(-t * 1.3) * gain


def riser(length, gain=0.3):
    n = int(length * SR)
    t = np.arange(n) / SR
    x = t / length
    noise = rng.standard_normal(n)
    out = np.zeros(n)
    # sweep a band-pass by processing in chunks
    chunk = 2048
    for i in range(0, n, chunk):
        c = x[i]
        lo = 300 + 5000 * c ** 2
        out[i:i + chunk] = bp(noise[i:i + chunk], lo, lo * 2.2, 1)
    f = 110 * 2 ** (x * 3)
    s = 0.3 * np.sin(2 * np.pi * np.cumsum(f) / SR)
    return (out + s) * (x ** 2) * gain


def brass(notes, length, gain=0.16):
    n = int(length * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for m in notes:
        f = mtof(m)
        out += saw(f, n) + saw(f * 1.004, n, 0.3)
    cutoff_env = 600 + 3500 * np.exp(-t * 6)
    # crude time-varying filter: two filtered versions crossfaded
    bright = lp(out, 4200)
    dark = lp(out, 700)
    mix = (cutoff_env - 600) / 3500
    out = bright * mix + dark * (1 - mix)
    return out * env_adsr(n, 0.01, 0.15, 0.6, 0.08) * gain / len(notes)




def ring(length=1.3, gain=0.35):
    """Old mechanical telephone bell: two detuned bells hammered at ~20 Hz."""
    n = int(length * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for f in (1180, 1245):
        s += np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 2.7 * t)
    trem = 0.55 + 0.45 * np.sign(np.sin(2 * np.pi * 20 * t))
    e = np.minimum(1, t / 0.01) * np.minimum(1, (length - t) / 0.12)
    return s * trem * e * gain / 3


def click(gain=0.3):
    n = int(0.03 * SR)
    t = np.arange(n) / SR
    return bp(rng.standard_normal(n), 1500, 6000) * np.exp(-t * 250) * gain


def dtmf(lo, hi, length=0.16, gain=0.12):
    n = int(length * SR)
    t = np.arange(n) / SR
    return (np.sin(2 * np.pi * lo * t) + np.sin(2 * np.pi * hi * t)) * env_adsr(n, 0.005, 0.01, 1, 0.02) * gain


def beep(f, length=0.09, gain=0.12):
    n = int(length * SR)
    t = np.arange(n) / SR
    return np.sign(np.sin(2 * np.pi * f * t)) * 0.5 * env_adsr(n, 0.002, 0.01, 1, 0.01) * gain


def lead(m, length, gain=0.12):
    n = int(length * SR)
    s = saw(mtof(m), n) + saw(mtof(m) * 1.006, n, 0.4) + 0.5 * saw(mtof(m) * 0.5, n, 0.7)
    return lp(s, 3500) * env_adsr(n, 0.01, 0.1, 0.7, 0.05) * gain


# ---------------------------------------------------------------- harmony (E major, vi-IV-I-V)
CHORDS = [
    [61, 64, 68, 73],  # C#m
    [57, 61, 64, 69],  # A
    [59, 64, 68, 71],  # E
    [59, 63, 66, 71],  # B
]
ROOTS = [49, 45, 52, 47]
E_BIG = [40, 52, 59, 64, 68, 71, 76, 80]

import json, os
_cfg_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sfx.json')
CFG = json.load(open(_cfg_path)) if os.path.exists(_cfg_path) else {}
KS = int(CFG.get('key_shift', 0))
CHORDS = [[n + KS for n in c] for c in CHORDS]
ROOTS = [n + KS for n in ROOTS]
E_BIG = [n + KS for n in E_BIG]


def bar_t(b, beat=0.0):
    return b * BAR + beat * BEAT


def chord_idx(b):
    return (b // 2) % 4 if b < 16 else b % 4


def pads(b0, b1, span, bright, gain):
    b = b0
    while b < b1:
        ci = chord_idx(b)
        pl, pr = pad([n - 12 for n in CHORDS[ci]] + CHORDS[ci], BAR * span + 0.5, bright=bright, gain=gain)
        add(pl, bar_t(b), pan=-1, verb=0.4)
        add(pr, bar_t(b), pan=1, verb=0.4)
        b += span


def groove(b, kick_on=True, hats16=False, arp_oct=12, bass_g=0.28, clap_g=0.4):
    ci = chord_idx(b)
    for q in range(4):
        if kick_on:
            add(kick(0.9), bar_t(b, q))
            add(bass(ROOTS[ci] - 12 + (12 if q % 2 else 0), BEAT * 0.45, bass_g), bar_t(b, q + 0.5))
        add(hat(0.12, open_=True), bar_t(b, q + 0.5), pan=0.2)
    if hats16:
        for s in range(16):
            add(hat(0.07), bar_t(b, s * 0.25), pan=-0.3)
    add(clap(clap_g), bar_t(b, 1), verb=0.3)
    add(clap(clap_g), bar_t(b, 3), verb=0.3)
    arp = CHORDS[ci] + [CHORDS[ci][1] + 12, CHORDS[ci][2] + 12]
    for i in range(16):
        add(pluck(arp[(i * 2) % len(arp)] + arp_oct, 0.22, gain=0.09), bar_t(b, i * 0.25), pan=(0.4 if i % 2 else -0.4), verb=0.3)


# ---------------------------------------------------------------- arrangement
# Cold open
pl, pr = pad([n - 12 for n in CHORDS[0]], BAR * 2 + 0.5, bright=500, gain=0.1)
add(pl, 0, pan=-1, verb=0.5); add(pr, 0, pan=1, verb=0.5)

# Title
add(boom(0.8), bar_t(2), verb=0.6)
add(crash(0.2), bar_t(2), verb=0.4)
pads(2, 4, 2, 1000, 0.16)
for i, m in enumerate([76, 80, 83, 88, 83, 80, 76, 71]):
    add(bell(m), bar_t(2, i), gain=0.8, pan=(-0.5 if i % 2 else 0.5), verb=0.8)

# Wired era 4-15
pads(4, 16, 2, 1300, 0.15)
for b in range(4, 16):
    ci = chord_idx(b)
    add(kick(0.75), bar_t(b, 0))
    add(kick(0.55), bar_t(b, 2.5))
    add(snare(0.26, 170), bar_t(b, 2), verb=0.35)
    add(bass(ROOTS[ci] - 12, BAR * 0.95, 0.3), bar_t(b))
    arp = CHORDS[ci] + [CHORDS[ci][1] + 12]
    for i in range(8):
        add(pluck(arp[i % len(arp)] + 12, gain=0.11), bar_t(b, i * 0.5), pan=(0.3 if i % 2 else -0.3), verb=0.35)
    if b % 2 == 0:
        add(timpani(ROOTS[ci] - 12, 0.4), bar_t(b), verb=0.4)

# Mobile era 16-25
pads(16, 26, 1, 2200, 0.14)
for b in range(16, 26):
    groove(b)
    if b == 16:
        add(crash(0.22), bar_t(b), verb=0.3)

# Pivot breakdown 26-27
add(boom(0.9, 3.0), bar_t(26), verb=0.7)
pl, pr = pad([n - 12 for n in CHORDS[2]] + CHORDS[2], BAR * 2 + 0.3, bright=2600, gain=0.2)
add(pl, bar_t(26), pan=-1, verb=0.7); add(pr, bar_t(26), pan=1, verb=0.7)
for i, m in enumerate([76, 83, 80, 88, 83, 92, 88, 95]):
    add(bell(m, 2.0, 0.09), bar_t(26, i * 0.5), pan=(-0.4 if i % 2 else 0.4), verb=0.8)
add(riser(BAR * 1.5, 0.3), bar_t(26, 2), verb=0.3)
for s in range(8):
    add(snare(0.15 + 0.03 * s, 180 + 12 * s), bar_t(27, 2 + s * 0.25), verb=0.3)

# Smartphone era 28-35
add(boom(0.8), bar_t(28), verb=0.5)
add(crash(0.3), bar_t(28), verb=0.4)
pads(28, 36, 1, 3000, 0.15)
for b in range(28, 36):
    if b < 35:
        groove(b, hats16=True, arp_oct=12 if b < 32 else 24)
    else:
        for s in range(16):
            add(hat(0.12), bar_t(b, s * 0.25), pan=(0.3 if s % 2 else -0.3))
    if b >= 32:
        div = {32: 1, 33: 0.5, 34: 0.25, 35: 0.125}[b]
        for s in range(int(4 / div)):
            if b == 35 and s * div >= 3.5:
                break
            prog = (b - 32 + s * div / 4) / 4
            add(snare(0.18 + 0.25 * prog, 170 + 130 * prog), bar_t(b, s * div), verb=0.25)
add(riser(BAR * 2 - BEAT * 0.5, 0.35), bar_t(34), verb=0.3)

# Drop 36-41
add(boom(1.0), bar_t(36), verb=0.6)
add(crash(0.35), bar_t(36), verb=0.4)
pads(36, 42, 1, 4000, 0.18)
STAB = [0, 0.75, 1.5, 2.5, 3.0]
MEL = [3, 2, 1, 2, 3, 4, 2, 1]
for b in range(36, 42):
    ci = chord_idx(b)
    groove(b, hats16=True, arp_oct=24, bass_g=0.32, clap_g=0.45)
    for st in STAB:
        bl = brass(CHORDS[ci] + [CHORDS[ci][0] + 12], BEAT * 0.6, 0.2)
        add(bl, bar_t(b, st), pan=-0.2, verb=0.35)
        add(bl, bar_t(b, st) + 0.012, pan=0.2, verb=0.35)
    notes = CHORDS[ci] + [CHORDS[ci][1] + 12]
    for i, k in enumerate(MEL):
        add(lead(notes[k] + 12, BEAT * 0.45, 0.1), bar_t(b, i * 0.5), pan=(0.15 if i % 2 else -0.15), verb=0.45)
    if b % 2 == 0:
        add(timpani(ROOTS[ci] - 12, 0.5), bar_t(b), verb=0.4)
    if b == 40:
        add(boom(0.6, 2.0), bar_t(b), verb=0.5)
for s in range(8):
    add(snare(0.25 + 0.04 * s, 200 + 15 * s), bar_t(41, 2 + s * 0.25), verb=0.3)

# Finale 42-44
fin = bar_t(42)
add(boom(1.1, 4.0), fin, verb=0.8)
add(crash(0.4, 4.0), fin, verb=0.5)
add(kick(1.0), fin)
pl, pr = pad(E_BIG, BAR * 2.2, bright=3200, gain=0.3, detune=0.15)
add(pl, fin, pan=-1, verb=0.7); add(pr, fin, pan=1, verb=0.7)
bl = brass([52, 59, 64, 68, 71], 3.0, 0.3)
add(bl * env_adsr(len(bl), 0.01, 0.5, 0.7, 1.8), fin, verb=0.6)
add(bass(28, BAR * 2, 0.4), fin)
for i, m in enumerate([88, 92, 95, 100]):
    add(bell(m, 3.0, 0.1), fin + 0.12 * i + 0.5, pan=(-0.4 if i % 2 else 0.4), verb=0.9)
add(timpani(40, 0.6), fin, verb=0.5)
# soft tail under the closing callback
pl, pr = pad([n - 12 + KS for n in [59, 64, 68, 71]], BAR + 0.1, bright=900, gain=0.12)
add(pl, bar_t(44), pan=-1, verb=0.6); add(pr, bar_t(44), pan=1, verb=0.6)

# ---------------------------------------------------------------- topic sfx
DTMF = [(697, 1209), (697, 1336), (770, 1477), (852, 1336), (941, 1336), (770, 1209), (697, 1477), (852, 1209)]


def coin(gain=0.12):
    n = int(0.6 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 1976 * t) * (t < 0.07) + np.sin(2 * np.pi * 2637 * t) * (t >= 0.07)) * np.exp(-t * 6) * gain


def whoosh(length=0.8, gain=0.3):
    n = int(length * SR); t = np.arange(n) / SR; x = t / length
    return bp(rng.standard_normal(n), 400, 6000) * np.sin(np.pi * x) ** 2 * gain


for ev in CFG.get('events', []):
    at = bar_t(ev['bar'], ev.get('beat', 0.0))
    kind = ev['type']
    if kind == 'ring':
        add(ring(ev.get('length', 1.3), ev.get('gain', 0.35)), at, verb=0.5)
    elif kind == 'clicks':
        for k in range(ev.get('count', 7)):
            add(click(0.25), at + k * 0.1, pan=0.3)
    elif kind == 'typing':
        r = np.random.default_rng(ev['bar'])
        for k in range(ev.get('count', 12)):
            add(click(0.15 + 0.1 * r.random()), at + k * 0.09 + r.random() * 0.03, pan=0.2)
    elif kind == 'dtmf':
        for i, (lo, hi) in enumerate(DTMF):
            add(dtmf(lo, hi), at + i * BEAT * 0.5, pan=-0.2)
    elif kind == 'beep2':
        for k in range(2):
            add(beep(2100), at + k * 0.14, pan=0.3)
    elif kind == 'shutter':
        add(click(0.5), at); add(click(0.4), at + 0.07)
    elif kind == 'coin':
        add(coin(ev.get('gain', 0.12)), at, verb=0.3)
    elif kind == 'whoosh':
        add(whoosh(ev.get('length', 0.8), ev.get('gain', 0.3)), at, verb=0.2)
    elif kind == 'boom':
        add(boom(ev.get('gain', 0.6), 2.5), at, verb=0.5)
    elif kind == 'bell':
        add(bell(ev.get('note', 88), 2.5, ev.get('gain', 0.1)), at, verb=0.8)
    else:
        raise SystemExit('unknown sfx type: ' + kind)

# ---------------------------------------------------------------- mix
ir_n = int(2.8 * SR)
t = np.arange(ir_n) / SR
irL = rng.standard_normal(ir_n) * np.exp(-t * 2.4)
irR = rng.standard_normal(ir_n) * np.exp(-t * 2.4)
irL = lp(irL, 5000)
irR = lp(irR, 5000)
vl = fftconvolve(hp(VERB_L, 200), irL)[:N] * 0.06
vr = fftconvolve(hp(VERB_R, 200), irR)[:N] * 0.06

outL = L + vl
outR = R + vr
out = np.stack([outL, outR], 1)
out = hp(out.T, 25).T
out /= np.max(np.abs(out)) + 1e-9
out = np.tanh(out * 1.6) / np.tanh(1.6)  # glue / soft clip
fade = int(0.8 * SR)
out[-fade:] *= np.linspace(1, 0, fade)[:, None] ** 1.5
out *= 0.89
wavfile.write(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'music.wav'), SR, (out * 32767).astype(np.int16))
print('music.wav written', out.shape[0] / SR, 's')
