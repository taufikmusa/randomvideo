#!/usr/bin/env python3
# Tukar warna enjin (maroon -> tema lain) pada SALINAN engine.js dalam folder projek. JANGAN guna pada template skill.
# Guna: python3 -I retheme.py <projek/engine.js> --theme honey|acid [--title-font inter]
#   honey = Honey Gold #FEC40B (overlay foto .80, pil hitam)
#   acid  = Acid Yellow #EFFF00 (overlay foto .50 supaya foto emas masih nampak, pil hitam)
#   --title-font inter = hook title Inter 900 Title Case (rujukan "Luxury . Confident . Premium"), baris 1 putih, baris 2 warna tema, extrude 3D
# Kedua-dua tema tambah gradient gelap di bawah latar B-roll supaya kapsyen putih/kuning jelas.
import sys, argparse
ap = argparse.ArgumentParser(); ap.add_argument('engine'); ap.add_argument('--theme', choices=['honey', 'acid'], required=True); ap.add_argument('--title-font', choices=['inter'])
a = ap.parse_args(); s = open(a.engine).read()
T = {'honey': dict(gold='#FEC40B', gold2='#E0A500', hi='#FFE79A', ov='rgba(254,196,11,.80)', v0='rgba(255,214,70,0)', v1='rgba(150,100,0,.45)'),
     'acid': dict(gold='#EFFF00', gold2='#C4D400', hi='#F8FF8A', ov='rgba(239,255,0,.50)', v0='rgba(239,255,0,0)', v1='rgba(90,95,0,.40)')}[a.theme]
def rep(old, new, must=True):
    global s
    if old not in s:
        if must: sys.exit('TAK JUMPA (engine bukan maroon asal?): ' + old[:70])
        return
    s = s.replace(old, new)
rep("maroon: '#7A1626', maroon2: '#3A0710', gold: '#F5C542', gold2: '#E9A91C'", f"maroon: '#15110A', maroon2: '#000000', gold: '{T['gold']}', gold2: '{T['gold2']}'")
rep("CK = { gold: '#F5C542', maroon2: '#3A0710' }", f"CK = {{ gold: '{T['gold']}', maroon2: '#000000' }}")
rep("ma: ['#7A1626', '#F5C542']", f"ma: ['#15110A', '{T['gold']}']")
rep("g.addColorStop(0, '#FFE79A'); g.addColorStop(.5, K.gold)", f"g.addColorStop(0, '{T['hi']}'); g.addColorStop(.5, K.gold)")
rep("g.addColorStop(0, '#FFE79A'); g.addColorStop(1, K.gold2)", f"g.addColorStop(0, '{T['hi']}'); g.addColorStop(1, K.gold2)")
rep("g.fillStyle = `rgba(20,8,6,${dark})`; g.fillRect(0, 0, 1300, 2310);", f"g.fillStyle = '{T['ov']}'; g.fillRect(0, 0, 1300, 2310);")
rep("rg.addColorStop(0, 'rgba(0,0,0,0)'); rg.addColorStop(1, 'rgba(0,0,0,.5)')", f"rg.addColorStop(0, '{T['v0']}'); rg.addColorStop(1, '{T['v1']}')")
rep("g.fillStyle = rg; g.fillRect(0, 0, 1300, 2310);", "g.fillStyle = rg; g.fillRect(0, 0, 1300, 2310); const bg2 = g.createLinearGradient(0, 2310 * .64, 0, 2310); bg2.addColorStop(0, 'rgba(25,16,0,0)'); bg2.addColorStop(.45, 'rgba(25,16,0,.72)'); bg2.addColorStop(1, 'rgba(15,9,0,.9)'); g.fillStyle = bg2; g.fillRect(0, 2310 * .64, 1300, 2310 * .36);")
if a.title_font == 'inter':
    i = s.index("  o.lines.forEach((ln, i) => anim(lt, .25 + i * .22"); j = s.index("  anim(lt, .75, 540, 575, () => {  // sub")
    new = '''  o.lines.forEach((ln, i) => anim(lt, .25 + i * .22, 540, 360 + i * 140, () => {   // judul: baris 1 putih kecil, baris 2 warna tema besar; Inter 900 + stroke hitam + extrude 3D + kilat
    const size = fitSize([ln], i ? 150 : 104, 900, s => `900 ${s}px IN`), by = i ? 486 : 350, f = `900 ${size}px IN`;
    X.save(); X.translate(540, by); X.rotate(-.025); X.font = f; X.textAlign = 'center'; X.lineJoin = 'round'; X.miterLimit = 2; X.letterSpacing = '-2px';
    X.strokeStyle = '#000'; X.lineWidth = size * .24; for (let k = 16; k >= 1; k -= 1) X.strokeText(ln, k * .8, k * .95);
    X.shadowColor = 'rgba(0,0,0,.6)'; X.shadowBlur = 26; X.shadowOffsetY = 16; X.strokeText(ln, 14, 16); X.shadowColor = 'transparent';
    X.lineWidth = size * .24; X.strokeText(ln, 0, 0);
    const g = X.createLinearGradient(0, -size * .8, 0, size * .06);
    if (i) { g.addColorStop(0, '@HI@'); g.addColorStop(.35, '@GOLD@'); g.addColorStop(1, '@GOLD2@'); } else { g.addColorStop(0, '#FFFFFF'); g.addColorStop(1, '#D9D9D9'); }
    X.fillStyle = g; X.fillText(ln, 0, 0);
    const bp = ((lt * .55 + i * .18) % 1.7 - .35) * 1200 - 540, hg = X.createLinearGradient(bp - 120, 0, bp + 120, 0); hg.addColorStop(0, 'rgba(255,255,255,0)'); hg.addColorStop(.5, 'rgba(255,255,255,.6)'); hg.addColorStop(1, 'rgba(255,255,255,0)');
    X.fillStyle = hg; X.fillText(ln, 0, 0); X.restore();
  }));
'''.replace('@HI@', T['hi']).replace('@GOLD@', T['gold']).replace('@GOLD2@', T['gold2'])
    s = s[:i] + new + s[j:]
open(a.engine, 'w').write(s); print('siap:', a.engine, a.theme, a.title_font or '')
