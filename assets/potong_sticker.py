"""Potong setiap sticker dari helaian sticker (latar krim/biru/gradient) jadi PNG lutsinar.
Guna: python3 assets/potong_sticker.py helaian.png folder_output prefix [THR=26] [ERO=0]
Latar dianggar setiap baris dari tepi kiri & kanan; sticker = piksel yang jauh dari warna latar."""
import sys, os, numpy as np
from PIL import Image
from scipy import ndimage as nd

src, out, prefix = sys.argv[1], sys.argv[2], sys.argv[3]
THR = float(sys.argv[4]) if len(sys.argv) > 4 else 26   # naikkan (40-60) jika sticker bercantum
ERO = int(sys.argv[5]) if len(sys.argv) > 5 else 0       # hakis dulu untuk pisahkan sticker yang bersentuh
os.makedirs(out, exist_ok=True)
im = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
H, W, _ = im.shape
edge = np.concatenate([im[:, :14], im[:, -14:]], axis=1)          # per-row background samples
bg = np.median(edge, axis=1)                                        # (H,3)
bg = nd.uniform_filter1d(bg, 61, axis=0)
d = np.linalg.norm(im - bg[:, None, :], axis=2)
mask = d > THR
mask = nd.binary_closing(mask, iterations=3)
mask = nd.binary_fill_holes(mask)
mask = nd.binary_opening(mask, iterations=2)
core = nd.binary_erosion(mask, iterations=ERO) if ERO else mask
lab, n = nd.label(core)
if ERO:  # grow each core back inside the original mask
    dist, (iy, ix) = nd.distance_transform_edt(lab == 0, return_indices=True)
    lab = np.where(mask & (dist <= ERO + 2), lab[iy, ix], 0)
objs = nd.find_objects(lab)
keep = []
for i, sl in enumerate(objs, 1):
    area = (lab[sl] == i).sum()
    if area < 9000: continue
    keep.append((sl[0].start, sl[1].start, i, sl))
keep.sort(key=lambda k: (round(k[0] / 120), k[1]))                 # reading order
alpha_full = nd.gaussian_filter((lab > 0).astype(np.float32), .8)
rgba = np.dstack([im, np.zeros((H, W))]).astype(np.uint8)
for k, (_, _, i, sl) in enumerate(keep, 1):
    m = nd.binary_dilation(lab == i, iterations=1)
    a = np.clip(nd.gaussian_filter(m.astype(np.float32), .8) * 255, 0, 255)
    y0, y1 = max(0, sl[0].start - 4), min(H, sl[0].stop + 4); x0, x1 = max(0, sl[1].start - 4), min(W, sl[1].stop + 4)
    crop = np.dstack([im[y0:y1, x0:x1], a[y0:y1, x0:x1]]).astype(np.uint8)
    Image.fromarray(crop, 'RGBA').save(f'{out}/{prefix}-{k:02d}.png')
print(f'{prefix}: {len(keep)} sticker')
