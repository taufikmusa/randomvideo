"""Fallback TANPA ASR: cari sempadan ayat dari jeda senyap. Guna: python3 -I silence_segments.py voice.wav
Cetak [mula, tamat] — padankan dengan naskhah yang Taufik beri (ayat demi ayat) untuk isi SEG."""
import sys, re, subprocess
out = subprocess.run(['ffmpeg', '-i', sys.argv[1], '-af', 'silencedetect=noise=-32dB:d=0.22', '-f', 'null', '-'], capture_output=True, text=True).stderr
st = [float(m) for m in re.findall(r'silence_start: ([\d.]+)', out)]; en = [float(m) for m in re.findall(r'silence_end: ([\d.]+)', out)]
dur = float(re.findall(r'Duration: (\d+):(\d+):([\d.]+)', out)[0][2]) + 60 * float(re.findall(r'Duration: (\d+):(\d+):([\d.]+)', out)[0][1])
b = [0.0] + [round((s + e) / 2, 2) for s, e in zip(st, en)] + [round(dur, 2)]
for a, c in zip(b[:-1], b[1:]): print([a, c])
