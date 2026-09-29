# THE PHONE — 150 Years (90s, 9:16)

`phone-history.mp4` — 1080x1920, 30fps, 90s. From Bell's first call (1876) to on-device AI, with a colour grade that evolves from sepia amber (wired era) to mint (mobile) to neon cyan/magenta (smartphone era). 120 BPM procedural score with period sound design: mechanical bell ring, rotary clicks, DTMF, SMS beeps, camera shutter.

Rebuild:
```
python3 music.py              # -> music.wav
node render.js                # -> phone-history.mp4 (needs playwright + ffmpeg)
node render.js stills 10 60   # preview frames
```
