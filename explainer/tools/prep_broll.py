#!/usr/bin/env python3
# Ekstrak frame B-roll (-> 720x1280) ke assets/broll/<nama>/%04d.jpg @30fps + kemas kini assets/broll/index.json.
# python3 -I prep_broll.py <folder-mp4> <assets/broll> [nama ...]   (tanpa nama = semua mp4 dalam folder)
import sys, os, json, subprocess
src, out = sys.argv[1], sys.argv[2]; names = sys.argv[3:] or sorted(f[:-4] for f in os.listdir(src) if f.endswith('.mp4'))
os.makedirs(out, exist_ok=True); ip = os.path.join(out, 'index.json'); idx = json.load(open(ip)) if os.path.exists(ip) else {}
for c in names:
    d = os.path.join(out, c)
    if not (os.path.isdir(d) and os.listdir(d)):
        os.makedirs(d, exist_ok=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(src, c + '.mp4'), '-vf', 'fps=30,scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280', '-q:v', '4', os.path.join(d, '%04d.jpg')], check=True)
    idx[c] = len(os.listdir(d)); print(c, idx[c], flush=True)
json.dump(idx, open(ip, 'w'), indent=0)
