#!/usr/bin/env python3
# Muat turun klip B-roll dari Drive (nama guna _ ganti ruang) ke <src-dir> lalu ekstrak frame.
# python3 -I fetch_broll.py <drive_ids.json> <src-dir> <assets/broll> Nama_Klip ...
import sys, os, json, subprocess
ids = json.load(open(sys.argv[1])); src, out = sys.argv[2], sys.argv[3]; need = []
norm = {k[:-4].replace(' ', '_'): (k, v) for k, v in ids.items()}
for n in sys.argv[4:]:
    if n not in norm: print('TIADA dalam Drive:', n); continue
    f = os.path.join(src, n + '.mp4')
    if not os.path.exists(f): subprocess.run(['curl', '-sL', '-o', f, f'https://drive.usercontent.google.com/download?id={norm[n][1]}&export=download&confirm=t'], check=True)
    need.append(n)
if need: subprocess.run([sys.executable, '-I', os.path.join(os.path.dirname(__file__), 'prep_broll.py'), src, out] + need, check=True)
