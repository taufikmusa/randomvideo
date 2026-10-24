"""Paper-cut badan: python3 -I cutout.py <src_dir> <out_dir> <model.onnx> <t0-t1> [t0-t1 ...]
Segmentasi badan (u2net_human_seg) -> kontur licin + garis putih tebal -> RGBA WebP (out_dir/%04d.webp, nombor = nombor frame src).
Bayang & latar dilukis oleh enjin (canvas). Env: CUT_STROKE (px pada lebar 720, lalai 15)."""
import sys, os, numpy as np, cv2, onnxruntime as ort
src, out, model = sys.argv[1:4]; rngs = [tuple(map(float, a.split('-'))) for a in sys.argv[4:]]
os.makedirs(out, exist_ok=True); STROKE = float(os.environ.get('CUT_STROKE', '15'))
so = ort.SessionOptions(); so.intra_op_num_threads = os.cpu_count() or 4
sess = ort.InferenceSession(model, so, providers=['CPUExecutionProvider']); inp = sess.get_inputs()[0].name
MEAN = np.array([0.485, 0.456, 0.406], np.float32); STD = np.array([0.229, 0.224, 0.225], np.float32)
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
    img = cv2.imread(p); h, w = img.shape[:2]; k = w / 720.
    m = seg(img)
    if prev is not None: m = .55 * m + .45 * prev       # lembutkan antara frame (kurang bergegar di tepi)
    prev = m
    mb = (cv2.GaussianBlur(m, (0, 0), 5 * k) > .5).astype(np.uint8)          # kontur licin = rasa gunting kertas
    mb = cv2.morphologyEx(mb, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (int(61 * k) | 1, int(61 * k) | 1)))
    xs = np.where(mb.any(axis=0))[0]
    if len(xs): mb[-4:, xs.min():xs.max() + 1] = 1
    cs, _ = cv2.findContours(mb, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE); fill = np.zeros_like(mb); cv2.drawContours(fill, cs, -1, 1, -1)
    person = cv2.GaussianBlur(fill.astype(np.float32), (0, 0), 1.0 * k)
    r = int(STROKE * k); ring = cv2.dilate(fill, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r + 1, 2 * r + 1)))
    ring = cv2.GaussianBlur(ring.astype(np.float32), (0, 0), 1.2 * k)
    alpha = np.maximum(person, ring)
    rgb = img.astype(np.float32) * person[:, :, None] + 255. * (1 - person[:, :, None])      # luar badan = putih (garis)
    bgra = np.dstack([rgb.clip(0, 255), (alpha * 255).clip(0, 255)]).astype(np.uint8)
    cv2.imwrite(f'{out}/{i:04d}.webp', bgra, [cv2.IMWRITE_WEBP_QUALITY, 96])
    if n % 50 == 0: print(n, '/', len(frames), flush=True)
print('siap', len(frames))
