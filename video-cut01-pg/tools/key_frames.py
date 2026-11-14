#!/usr/bin/env python3
# Cut-01 (green screen #00FF00 + outline putih) -> RGBA PNG berpotong (badan sahaja), bintik kecil dibuang.
# python3 -I key_frames.py <video.mp4> <outdir> [crop_y=370]
import sys, os, subprocess, glob, numpy as np, cv2
src, out = sys.argv[1], sys.argv[2]; cy = int(sys.argv[3]) if len(sys.argv) > 3 else 370
os.makedirs(out, exist_ok=True); tmp = out + '_raw'; os.makedirs(tmp, exist_ok=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-vf', f'fps=30,crop=720:{1280 - cy}:0:{cy},format=rgba,chromakey=0x00FF00:0.22:0.08,despill=type=green:mix=0.5:expand=0.1', f'{tmp}/%05d.png'], check=True)
for f in sorted(glob.glob(tmp + '/*.png')):
    im = cv2.imread(f, cv2.IMREAD_UNCHANGED); a = im[..., 3]
    n, lab, st, _ = cv2.connectedComponentsWithStats((a > 40).astype(np.uint8), connectivity=8)
    keep = np.zeros(n, bool)
    if n > 1:
        big = st[1:, cv2.CC_STAT_AREA].max()
        for i in range(1, n): keep[i] = st[i, cv2.CC_STAT_AREA] > max(1500, big * 0.02)
    m = keep[lab]; im[..., 3] = np.where(m, a, 0)
    cv2.imwrite(os.path.join(out, os.path.basename(f)), im, [cv2.IMWRITE_PNG_COMPRESSION, 1])
    os.remove(f)
os.rmdir(tmp); print('frames', len(os.listdir(out)))
