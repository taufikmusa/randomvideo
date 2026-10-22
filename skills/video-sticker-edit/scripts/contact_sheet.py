"""Gabung stills jadi satu contact sheet. Guna: python3 -I contact_sheet.py <folder-stills> <out.jpg> [lajur=9]"""
import sys, glob
from PIL import Image
d, out = sys.argv[1], sys.argv[2]; c = int(sys.argv[3]) if len(sys.argv) > 3 else 9
fs = sorted(glob.glob(d + '/t*.jpg'), key=lambda f: float(f.split('/t')[-1][:-4])); W, H = 270, 480
m = Image.new('RGB', (W * c, H * ((len(fs) + c - 1) // c)))
for i, f in enumerate(fs): m.paste(Image.open(f).resize((W, H)), ((i % c) * W, (i // c) * H))
m.save(out, quality=75); print(out, len(fs), 'stills')
