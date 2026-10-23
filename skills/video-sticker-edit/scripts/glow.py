"""Glow body effect: python3 -I glow.py <src_dir> <out_dir> <model.onnx> <t0-t1> [t0-t1 ...]  (saat; frame = round(t*30)+1)
Segmentasi badan (u2net_human_seg) -> glow emas di luar siluet. Tulis frame JPEG ke out_dir (nama sama)."""
import sys, os, numpy as np, cv2, onnxruntime as ort
src, out, model = sys.argv[1:4]; rngs = [tuple(map(float, a.split('-'))) for a in sys.argv[4:]]
os.makedirs(out, exist_ok=True)
so = ort.SessionOptions(); so.intra_op_num_threads = os.cpu_count() or 4
sess = ort.InferenceSession(model, so, providers=['CPUExecutionProvider']); inp = sess.get_inputs()[0].name
MEAN = np.array([0.485, 0.456, 0.406], np.float32); STD = np.array([0.229, 0.224, 0.225], np.float32)
GOLD = np.array([255, 196, 64], np.float32)[::-1]  # BGR
def seg(img):
    h, w = img.shape[:2]; x = cv2.resize(img[:, :, ::-1], (320, 320), interpolation=cv2.INTER_AREA).astype(np.float32) / 255.
    x = ((x / max(x.max(), 1e-6) - MEAN) / STD).transpose(2, 0, 1)[None].astype(np.float32)
    m = sess.run(None, {inp: x})[0][0, 0]; m = (m - m.min()) / max(m.max() - m.min(), 1e-6)
    return cv2.resize(m, (w, h), interpolation=cv2.INTER_CUBIC).clip(0, 1)
frames = sorted({i for a, b in rngs for i in range(int(round(a * 30)) + 1, int(round(b * 30)) + 2)})
prev = None
for n, i in enumerate(frames):
    p = f'{src}/{i:05d}.jpg'
    if not os.path.exists(p): continue
    img = cv2.imread(p); m = seg(img)
    if prev is not None and i - 1 in frames: m = .6 * m + .4 * prev   # smoothing masa
    prev = m
    mb = (m > .4).astype(np.uint8)
    mb = cv2.morphologyEx(mb, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (61, 61)))
    xs = np.where(mb.any(axis=0))[0]
    if len(xs): mb[-4:, xs.min():xs.max() + 1] = 1   # tutup bawah supaya lubang (mic) terkepung
    cs, _ = cv2.findContours(mb, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE); filled = np.zeros_like(mb); cv2.drawContours(filled, cs, -1, 1, -1); mb = filled
    mb = cv2.GaussianBlur(mb.astype(np.float32), (0, 0), 2)
    g1 = cv2.GaussianBlur(mb, (0, 0), 10); g2 = cv2.GaussianBlur(mb, (0, 0), 34)
    glow = (g1 * .9 + g2 * .75) * (1 - mb * .85)
    pulse = 0.9 + 0.1 * np.sin(i / 30 * 2 * np.pi * .8)
    bgsoft = cv2.GaussianBlur(mb, (0, 0), 40)
    base = img.astype(np.float32) * (1 - (1 - bgsoft) * .30)[:, :, None]   # latar digelapkan sedikit
    res = base + (GOLD[None, None, :] * glow[:, :, None] * pulse * 1.0)
    # rim light halus di tepi dalam
    edge = (cv2.GaussianBlur(mb, (0, 0), 3) - cv2.GaussianBlur(mb, (0, 0), 9)).clip(0, 1) * mb
    res += GOLD[None, None, :] * edge[:, :, None] * .5
    cv2.imwrite(f'{out}/{i:05d}.jpg', res.clip(0, 255).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 95])
    if n % 100 == 0: print(n, '/', len(frames), flush=True)
print('siap', len(frames))
