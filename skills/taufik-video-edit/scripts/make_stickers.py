"""Potong helaian sticker 3x3 -> img/stk-<nama>.png (upscale 2x Lanczos + tajam) + contact sheet semakan.
Guna: python3 -I make_stickers.py <helaian.jpg> <folder-img> nama1 nama2 ... nama9   (tertib baca: baris atas kiri->kanan, dst)
Lepas jalan: BUKA <folder-img>/../stickers-check.jpg dan sahkan nama padan dengan teks pada sticker."""
import sys, os, subprocess, tempfile
from PIL import Image, ImageFilter
sheet, img, names = sys.argv[1], sys.argv[2], sys.argv[3:]
here = os.path.dirname(os.path.abspath(__file__)); tmp = tempfile.mkdtemp()
subprocess.run([sys.executable, '-I', os.path.join(here, 'potong_grid.py'), sheet, tmp] + names, check=True)
cells = []
for n in names:
    im = Image.open(f'{tmp}/{n}.png').convert('RGBA'); im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2)); im.save(f'{img}/stk-{n}.png'); cells.append((n, im))
m = Image.new('RGB', (3 * 340, ((len(cells) + 2) // 3) * 400), (120, 40, 50))
for i, (n, im) in enumerate(cells):
    t = im.copy(); t.thumbnail((330, 380)); m.paste(t, ((i % 3) * 340, (i // 3) * 400), t)
m.save(os.path.join(img, '..', 'stickers-check.jpg'), quality=80); print('siap', len(cells), 'sticker ->', img)
