"""Potong helaian sticker 3x3 (latar krim) ikut grid; garis potong dicari di lembah jumlah piksel (sesuai bila sticker bersentuhan).
Guna: python3 assets/potong_grid.py helaian.jpg folder_output nama1 nama2 ... nama9   -> <folder>/<nama>.png (outline putih ditebalkan)"""
import sys, os, numpy as np
from PIL import Image
from scipy import ndimage as nd
src, out, names = sys.argv[1], sys.argv[2], sys.argv[3:]
os.makedirs(out, exist_ok=True)
im = np.asarray(Image.open(src).convert('RGB')).astype(np.float32); H, W, _ = im.shape
edge = np.concatenate([im[:, :14], im[:, -14:]], axis=1); bg = nd.uniform_filter1d(np.median(edge, axis=1), 61, axis=0)
mask = np.linalg.norm(im - bg[:, None, :], axis=2) > 40
mask = nd.binary_closing(mask, iterations=3); mask = nd.binary_fill_holes(mask); mask = nd.binary_opening(mask, iterations=2)
best = lambda a, lo, hi: lo + int(np.argmin(a[lo:hi]))
def emit(keep, k):
    ys, xs = np.where(keep); y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1; pad = 16
    mm = np.pad(keep[y0:y1, x0:x1], pad); col = np.pad(rgb[y0:y1, x0:x1], ((pad, pad), (pad, pad), (0, 0)))
    mm = nd.binary_fill_holes(nd.binary_closing(mm, iterations=3)); big = nd.binary_dilation(mm, iterations=4)
    o = np.dstack([col, np.zeros(mm.shape, np.uint8)]); o[big & ~mm, :3] = 255
    o[..., 3] = np.clip(nd.gaussian_filter(big.astype(np.float32), 1.0) * 255, 0, 255).astype(np.uint8)
    Image.fromarray(o).save(f'{out}/{names[k]}.png')
rgb = im.astype(np.uint8)
# 1) Cuba komponen terpisah dulu (tepi tak terpotong): kalau tepat 9 -> guna; 2) kalau bersentuhan -> potong ikut grid
lab, nl = nd.label(mask); objs = nd.find_objects(lab)
comps = [(i, sl) for i, sl in enumerate(objs, 1) if (lab[sl] == i).sum() > 9000]
if len(comps) == len(names):
    comps.sort(key=lambda c: (int(((c[1][0].start + c[1][0].stop) / 2) / (H / 3.0)), (c[1][1].start + c[1][1].stop) / 2))
    for k, (i, sl) in enumerate(comps): emit(lab == i, k)
    print(len(comps), 'sticker (komponen terpisah)'); sys.exit(0)
rs = mask.sum(1); r1 = best(rs, int(H * .30), int(H * .36)); r2 = best(rs, int(H * .60), int(H * .66)); rgb = im.astype(np.uint8); k = 0
for ya, yb in [(0, r1), (r1, r2), (r2, H)]:
    cs = mask[ya:yb].sum(0); c1 = best(cs, int(W * .31), int(W * .39)); c2 = best(cs, int(W * .64), int(W * .72))
    for xa, xb in [(0, c1), (c1, c2), (c2, W)]:
        cell = np.zeros_like(mask); cell[ya:yb, xa:xb] = mask[ya:yb, xa:xb]; l2, nn = nd.label(cell); keep = np.zeros_like(mask)
        for i in range(1, nn + 1):
            if (l2 == i).sum() > 400: keep |= (l2 == i)
        ys, xs = np.where(keep); y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1; pad = 16
        mm = np.pad(keep[y0:y1, x0:x1], pad); col = np.pad(rgb[y0:y1, x0:x1], ((pad, pad), (pad, pad), (0, 0)))
        mm = nd.binary_fill_holes(nd.binary_closing(mm, iterations=3)); big = nd.binary_dilation(mm, iterations=4)
        o = np.dstack([col, np.zeros(mm.shape, np.uint8)]); o[big & ~mm, :3] = 255
        o[..., 3] = np.clip(nd.gaussian_filter(big.astype(np.float32), 1.0) * 255, 0, 255).astype(np.uint8)
        Image.fromarray(o).save(f'{out}/{names[k]}.png'); k += 1
print(k, 'sticker')
