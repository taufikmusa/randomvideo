"""Procedural cinematic score for 'GOLD' — 60s, 128 BPM, D major (vi-IV-I-V).

Structure (bars, 0-indexed, 1 bar = 1.875s):
  0-3   intro     pad + booms + bells
  4-11  ancient   half-time kick, timpani, pluck arp, bass
  12-19 empire    four-on-floor, claps, off-beat hats, 16th arp
  20-25 build     16th hats, accelerating snare roll, riser, gap before drop
  26-29 drop      full band, brass stabs, crash
  30-31 finale    huge hit on D major, ring out
"""
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR = 44100
BPM = 128
BEAT = 60 / BPM
BAR = BEAT * 4
DUR = 60.0
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
    e = np.full(n, s)
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


# ---------------------------------------------------------------- harmony
# vi - IV - I - V in D major
CHORDS = [
    [59, 62, 66, 71],  # Bm
    [55, 59, 62, 67],  # G
    [57, 62, 66, 69],  # D (A-D-F#-A voicing)
    [57, 61, 64, 69],  # A
]
ROOTS = [47, 43, 38, 45]  # B2 G2 D2 A2
D_MAJOR_BIG = [50, 57, 62, 66, 69, 74, 78]


def bar_t(b, beat=0.0):
    return b * BAR + beat * BEAT


def chord_idx(b):
    return (b // 2) % 4 if b < 12 else b % 4


# ---------------------------------------------------------------- arrangement
# Intro bars 0-3
add(boom(0.65), 0, verb=0.5)
add(boom(0.5), bar_t(2), verb=0.5)
for b in range(0, 4, 2):
    pl, pr = pad([n - 12 for n in CHORDS[chord_idx(b)]] + CHORDS[chord_idx(b)], BAR * 2 + 0.6, bright=900, gain=0.16)
    add(pl, bar_t(b), pan=-1, verb=0.6)
    add(pr, bar_t(b), pan=1, verb=0.6)
for i, m in enumerate([74, 78, 81, 86, 81, 78, 74, 69]):
    add(bell(m), bar_t(0, i * 2), gain=0.8, pan=(-0.5 if i % 2 else 0.5), verb=0.8)

# Pads for the rest of the song
b = 4
while b < 30:
    span = 2 if b < 12 else 1
    ci = chord_idx(b)
    bright = 1400 if b < 12 else (2400 if b < 26 else 3800)
    g = 0.15 if b < 26 else 0.2
    pl, pr = pad([n - 12 for n in CHORDS[ci]] + CHORDS[ci], BAR * span + 0.5, bright=bright, gain=g)
    add(pl, bar_t(b), pan=-1, verb=0.4)
    add(pr, bar_t(b), pan=1, verb=0.4)
    b += span

# Ancient bars 4-11: half-time kick, timpani, bass, pluck arp 8ths
for b in range(4, 12):
    ci = chord_idx(b)
    add(kick(0.8), bar_t(b, 0))
    add(kick(0.6), bar_t(b, 2.5))
    add(timpani(ROOTS[ci] - 12 + 12, 0.45), bar_t(b, 0), verb=0.4)
    add(snare(0.28, 170), bar_t(b, 2), verb=0.35)
    add(bass(ROOTS[ci] - 12, BAR * 0.95, 0.3), bar_t(b))
    arp = CHORDS[ci] + [CHORDS[ci][1] + 12]
    for i in range(8):
        add(pluck(arp[i % len(arp)] + 12, gain=0.12), bar_t(b, i * 0.5), pan=(0.3 if i % 2 else -0.3), verb=0.35)

# Empire bars 12-19: four on floor, claps, off hats, 8th bass, 16th arp
for b in range(12, 20):
    ci = chord_idx(b)
    for q in range(4):
        add(kick(0.9), bar_t(b, q))
        add(hat(0.13, open_=True), bar_t(b, q + 0.5), pan=0.2)
        add(bass(ROOTS[ci] - 12 + (12 if q % 2 else 0), BEAT * 0.45, 0.28), bar_t(b, q + 0.5))
    add(clap(0.4), bar_t(b, 1), verb=0.3)
    add(clap(0.4), bar_t(b, 3), verb=0.3)
    arp = CHORDS[ci] + [CHORDS[ci][1] + 12, CHORDS[ci][2] + 12]
    for i in range(16):
        add(pluck(arp[(i * 2) % len(arp)] + 12, 0.25, gain=0.1), bar_t(b, i * 0.25), pan=(0.4 if i % 2 else -0.4), verb=0.3)
    if b == 12:
        add(crash(0.22), bar_t(b), verb=0.3)
    if b % 4 == 0:
        add(timpani(ROOTS[ci], 0.4), bar_t(b), verb=0.4)

# Build bars 20-25
for b in range(20, 26):
    ci = chord_idx(b)
    if b < 25:
        for q in range(4):
            add(kick(0.9), bar_t(b, q))
            add(bass(ROOTS[ci] - 12 + (12 if q % 2 else 0), BEAT * 0.45, 0.28), bar_t(b, q + 0.5))
    for s in range(16):
        add(hat(0.09 + 0.05 * (b - 20) / 5), bar_t(b, s * 0.25), pan=(0.3 if s % 2 else -0.3))
    arp = CHORDS[ci] + [CHORDS[ci][1] + 12, CHORDS[ci][2] + 12]
    for i in range(16):
        add(pluck(arp[(i * 3) % len(arp)] + 12, 0.2, gain=0.09 + 0.02 * (b - 20) / 5), bar_t(b, i * 0.25), pan=(0.4 if i % 2 else -0.4), verb=0.3)
    # accelerating snare roll
    div = {20: 1, 21: 1, 22: 0.5, 23: 0.5, 24: 0.25, 25: 0.125}[b]
    steps = int(4 / div)
    for s in range(steps):
        pos = b + s * div / 4
        if b == 25 and s * div >= 3.5:
            break  # silence just before the drop
        prog = (pos - 20) / 6
        add(snare(0.18 + 0.25 * prog, 170 + 120 * prog), bar_t(b, s * div), verb=0.25)
add(riser(BAR * 2 - BEAT * 0.5, 0.35), bar_t(24), verb=0.3)
add(boom(0.5, 1.5), bar_t(22), verb=0.4)

# Drop bars 26-29
add(boom(1.0), bar_t(26), verb=0.6)
add(crash(0.35), bar_t(26), verb=0.4)
STAB = [0, 0.75, 1.5, 2.5, 3.0]
for b in range(26, 30):
    ci = chord_idx(b)
    for q in range(4):
        add(kick(1.0), bar_t(b, q))
        add(hat(0.14, open_=True), bar_t(b, q + 0.5), pan=0.2)
        add(bass(ROOTS[ci] - 12 + (12 if q % 2 else 0), BEAT * 0.45, 0.32), bar_t(b, q + 0.5))
    for s in range(16):
        add(hat(0.07), bar_t(b, s * 0.25), pan=-0.3)
    add(clap(0.45), bar_t(b, 1), verb=0.3)
    add(clap(0.45), bar_t(b, 3), verb=0.3)
    for st in STAB:
        bl, = [brass(CHORDS[ci] + [CHORDS[ci][0] + 12], BEAT * 0.6, 0.22)]
        add(bl, bar_t(b, st), pan=-0.2, verb=0.35)
        add(bl, bar_t(b, st) + 0.012, pan=0.2, verb=0.35)
    arp = CHORDS[ci] + [CHORDS[ci][1] + 12, CHORDS[ci][2] + 12]
    for i in range(16):
        add(pluck(arp[(i * 2) % len(arp)] + 24, 0.2, gain=0.07), bar_t(b, i * 0.25), pan=(0.5 if i % 2 else -0.5), verb=0.4)
    if b % 2 == 0:
        add(timpani(ROOTS[ci], 0.5), bar_t(b), verb=0.4)
# snare fill into the finale
for s in range(8):
    add(snare(0.25 + 0.04 * s, 200 + 15 * s), bar_t(29, 2 + s * 0.25), verb=0.3)

# Finale bars 30-31: huge D major hit, ring out
fin = bar_t(30)
add(boom(1.1, 4.0), fin, verb=0.8)
add(crash(0.4, 3.8), fin, verb=0.5)
add(kick(1.0), fin)
pl, pr = pad(D_MAJOR_BIG, DUR - fin, bright=3000, gain=0.3, detune=0.15)
add(pl, fin, pan=-1, verb=0.7)
add(pr, fin, pan=1, verb=0.7)
bl = brass([50, 57, 62, 66, 69], 2.6, 0.3)
add(bl * env_adsr(len(bl), 0.01, 0.5, 0.7, 1.5), fin, verb=0.6)
add(bass(26, DUR - fin - 0.05, 0.4), fin)
for i, m in enumerate([86, 90, 93, 98]):
    add(bell(m, 3.0, 0.1), fin + 0.12 * i + 0.5, pan=(-0.4 if i % 2 else 0.4), verb=0.9)
add(timpani(38, 0.6), fin, verb=0.5)
add(timpani(38, 0.45), fin + BEAT * 1.5, verb=0.5)

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
wavfile.write('music.wav', SR, (out * 32767).astype(np.int16))
print('music.wav written', out.shape[0] / SR, 's')
