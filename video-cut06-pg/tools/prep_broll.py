#!/usr/bin/env python3
# Ekstrak frame B-roll (720x1280 menegak) -> assets/broll/<nama>/%04d.jpg @30fps.  python3 -I prep_broll.py <folder-klip> <assets/broll> [nama-klip ...]
import sys, os, subprocess
src, out = sys.argv[1], sys.argv[2]
CLIPS = sys.argv[3:] or ['Emas-10gram', 'Others-menabung', 'Emas-20gram', 'Graduate', 'Emas-50gram', '31.haji', 'Emas-100gram', '22.house_keys_handover', '23.modern_house_exterior', 'Emas-goldbar-250gram', 'Others-kerja', 'Emas-1000gram', '19.family_dinner', 'Emas-1gram-album']
for c in CLIPS:
    d = os.path.join(out, c); os.makedirs(d, exist_ok=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(src, c + '.mp4'), '-vf', 'fps=30,scale=720:1280:flags=lanczos', '-q:v', '3', os.path.join(d, '%04d.jpg')], check=True)
    print(c, len(os.listdir(d)))
