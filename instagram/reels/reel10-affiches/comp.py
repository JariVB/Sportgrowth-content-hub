# Reel 10 v3 · studio-composiet in Python: MODNet-alfa verfijnd met een lege-muurplaat, bureau achter de armen,
# contactschaduw op het bureau, light wrap. python3.13 comp.py bron.mov SS D alpha.mp4 studio.png uit.mp4 bg_uit.png
import sys, subprocess, numpy as np
from PIL import Image, ImageFilter
src, ss, d, amp, bgp, out, bgout = sys.argv[1:8]
W, H = 1080, 1920
import os
K, X0, Y0 = float(os.environ.get('K', 1.0)), int(os.environ.get('X0', 0)), int(os.environ.get('Y0', 0))
SC, PX, PY = float(os.environ.get('SC', 1.0)), int(os.environ.get('PX', 0)), os.environ.get('PY')  # schaal en plaats persoon
DESK = round(1573 * K) - Y0       # bovenkant bureau in beeld (1700)
OFF = DESK - 1542                 # echte tafelrand (y 1542 in de take) op de bureaurand
PY = int(PY) if PY is not None else OFF
DARK = float(os.environ.get('DARK', 0))  # achtergrond achter romp/armen donkerder (schaduw)
def rd(path, w, h, fmt, step=1, extra=''):
    vf = f'scale={w}:{h}:flags=lanczos' + (f',select=not(mod(n\\,{step}))' if step > 1 else '') + extra
    args = ['ffmpeg', '-v', 'error'] + (['-ss', ss, '-t', d] if path == src else []) + ['-i', path, '-vf', vf] + (['-vsync', '0'] if step > 1 else []) + ['-f', 'rawvideo', '-pix_fmt', fmt, '-']
    return subprocess.Popen(args, stdout=subprocess.PIPE)
# 1. lege-muurplaat (mediaan van pixels waar de persoon niet staat), halve resolutie
hw, hh = W // 2, H // 2
ps, pa = rd(src, hw, hh, 'rgb24', 5), rd(amp, hw, hh, 'gray', 5)
fr, al = [], []
while True:
    b, a = ps.stdout.read(hw*hh*3), pa.stdout.read(hw*hh)
    if len(b) < hw*hh*3 or len(a) < hw*hh: break
    fr.append(np.frombuffer(b, np.uint8).reshape(hh, hw, 3)); al.append(np.frombuffer(a, np.uint8).reshape(hh, hw))
fr = np.stack(fr).astype(np.float32); al = np.stack(al)
fr[al > 12] = np.nan
plate = np.nanmedian(fr, axis=0); known = (np.sum(al <= 12, axis=0) >= 4)
plate = np.nan_to_num(plate)
plate = np.asarray(Image.fromarray(plate.astype(np.uint8)).resize((W, H), Image.BILINEAR), np.float32)
known = np.asarray(Image.fromarray((known*255).astype(np.uint8)).resize((W, H), Image.BILINEAR).filter(ImageFilter.MinFilter(5)), np.float32) / 255
print('plaat klaar, bekend:', round(float(known.mean()), 2), flush=True)
pl = plate.mean(axis=2); tk = (known > 0.9); tk[:1560] = False
TREF0 = float(np.median(pl[tk])) if tk.any() else 170.0
TREF = np.where(known > 0.9, np.maximum(pl, 40), TREF0).astype(np.float32)
TREF[:1540] = TREF0
TREF = np.asarray(Image.fromarray(np.clip(TREF, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(6)), np.float32)
print('tafel ref', TREF0, flush=True)
# 2. achtergrond
bg = Image.open(bgp).convert('RGB'); bg = bg.resize((round(bg.width*K), round(bg.height*K)), Image.LANCZOS).crop((X0, Y0, X0+W, Y0+H))
BLUR = float(os.environ.get('BLUR', 0))   # scherptediepte: studio onscherp zoals portretmodus
if BLUR:
    bg = bg.filter(ImageFilter.GaussianBlur(BLUR))
    bga = np.asarray(bg, np.float32)
    xx = np.arange(W)[None, :, None]
    bga = bga * (1 - 0.35 * np.clip((380 - xx) / 380, 0, 1))   # kast links iets donkerder
    bg = Image.fromarray(np.clip(bga, 0, 255).astype(np.uint8))
    if os.environ.get('NEON'):   # neonlogo scherp bovenop de onscherpe studio (een fel neonbord blijft leesbaar)
        ne = Image.open(os.environ['NEON']).convert('RGBA')
        ne = ne.resize((round(ne.width*K), round(ne.height*K)), Image.LANCZOS).crop((X0, Y0, X0+W, Y0+H)).filter(ImageFilter.GaussianBlur(0.8))
        bg = Image.alpha_composite(bg.convert('RGBA'), ne).convert('RGB')
bg.save(bgout); BG = np.asarray(bg, np.float32) / 255
WOOD = np.zeros_like(BG); WOOD[:H-OFF] = BG[OFF:]
BGD = BG * (1 - DARK * np.clip((np.arange(H)[:, None, None] - 1350) / 250, 0, 1)).astype(np.float32)
BGB = np.asarray(bg.filter(ImageFilter.GaussianBlur(28)), np.float32) / 255
yy = np.arange(H)[:, None]
LOW = np.clip((yy - 1150) / 80, 0, 1).astype(np.float32) * (1 - np.clip((yy - 1530) / 6, 0, 1)).astype(np.float32)  # gebied naast de romp, boven de tafel
TAB = np.clip((yy - 1538) / 8, 0, 1).astype(np.float32)  # gebied van de echte tafel in de take
deskmask = np.clip((yy - DESK + 4) / 10, 0, 1).astype(np.float32)[:, :, None]
# 3. per frame
s, a = rd(src, W, H, 'rgb24'), rd(amp, W, H, 'gray')
wr = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', '30', '-i', '-',
    '-vf', "scale=w='trunc(1080*(1+0.05*between(t\\,8.66\\,9.76))/2)*2':h=-2:eval=frame,crop=1080:1920:(iw-1080)/2:(ih-1920)/2.4,format=yuv420p",
    '-c:v', 'libx264', '-crf', '16', '-preset', 'fast', out], stdin=subprocess.PIPE)
n, prev = 0, None
GRAIN = float(os.environ.get('GRAIN', 0)) / 255; RNG = np.random.default_rng(1)
while True:
    b, ab = s.stdout.read(W*H*3), a.stdout.read(W*H)
    if len(b) < W*H*3 or len(ab) < W*H: break
    f = np.frombuffer(b, np.uint8).reshape(H, W, 3).astype(np.float32)
    al = np.frombuffer(ab, np.uint8).reshape(H, W).astype(np.float32) / 255
    al = np.clip((al - 0.1) / 0.8, 0, 1)
    diff = np.abs(f - plate).max(axis=2)
    key = np.clip((diff - 22) / 22, 0, 1)
    key = np.asarray(Image.fromarray((key*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.BoxBlur(1)), np.float32) / 255
    al = al * (known * key + (1 - known))
    # onderaan naast de romp: donkere stoel altijd mee (stabiel), witte muur altijd weg (geen grijze randen of geflikker)
    lum0 = f.mean(axis=2); chrom = np.abs(f[:, :, 0] - f[:, :, 2]) + np.abs(f[:, :, 1] - f[:, :, 2])
    neutral = np.clip((22 - chrom) / 10, 0, 1)
    chair = np.clip((80 - lum0) / 25, 0, 1) * neutral * LOW
    wall = np.clip((lum0 - 115) / 30, 0, 1) * neutral * LOW
    al = np.maximum(al, chair) * (1 - wall)
    # echte tafel blijft in beeld: armen rusten er echt op, enkel de muur wordt studio
    al = al * (1 - TAB) + TAB
    # kleur ontmengen: halfdoorzichtige randen (bewegingsonscherpte) zonder grijze muur
    am = al[:, :, None]
    un = (f - (1 - am) * plate) / np.maximum(am, 0.15)
    w = (known[:, :, None] * (am < 0.97))
    fg = np.clip(f * (1 - w) + un * w, 0, 255) / 255
    fg = np.clip((fg - 0.5) * 1.04 + 0.5 - 0.025, 0, 1)
    gr = fg.mean(axis=2, keepdims=True); fg = gr + (fg - gr) * 0.94
    fg = fg * np.array([1.0, 0.985, 0.975], np.float32)   # iets warmer, zoals de spot in de studio
    # tafel: donkerder en warmer, naar onder toe nog iets donkerder (sfeer studio)
    # tafel -> houten studiobureau, met de echte schaduwen van armen en handen (huid en tattoo blijven)
    lum = f.mean(axis=2)
    tbl = np.clip((24 - (f[:, :, 0] - f[:, :, 2])) / 12, 0, 1) * np.clip((lum - 65) / 25, 0, 1) * TAB
    tbl = np.asarray(Image.fromarray((tbl * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(5)).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.BoxBlur(1)), np.float32)[:, :, None] / 255
    shade = np.clip(lum / TREF, 0.3, 1.12)[:, :, None]
    fg = fg * (1 - tbl) + WOOD * shade * tbl
    # persoon verschuiven naar zijn plaats in de studio
    if SC != 1.0:
        sw, sh_ = round(W * SC), round(H * SC)
        alS = np.asarray(Image.fromarray((al * 255).astype(np.uint8)).resize((sw, sh_), Image.BICUBIC), np.float32) / 255
        fgS = np.asarray(Image.fromarray((np.clip(fg, 0, 1) * 255).astype(np.uint8)).resize((sw, sh_), Image.LANCZOS), np.float32) / 255
    else:
        sw, sh_, alS, fgS = W, H, al, fg
    A = np.zeros((H, W), np.float32); P = np.zeros((H, W, 3), np.float32)
    y0, x0 = max(0, PY), max(0, PX); sy, sx = y0 - PY, x0 - PX
    hh_, ww_ = min(H - y0, sh_ - sy), min(W - x0, sw - sx)
    A[y0:y0+hh_, x0:x0+ww_] = alS[sy:sy+hh_, sx:sx+ww_]; P[y0:y0+hh_, x0:x0+ww_] = fgS[sy:sy+hh_, sx:sx+ww_]
    # contactschaduw op het bureau
    sh = Image.fromarray((A*255).astype(np.uint8)).resize((W//4, H//4), Image.BILINEAR).filter(ImageFilter.GaussianBlur(5)).resize((W, H), Image.BILINEAR)
    sh = np.roll(np.asarray(sh, np.float32) / 255, 14, axis=0)[:, :, None] * deskmask * 0.6
    base = BGD * (1 - sh)
    A3 = A[:, :, None]
    o = P * A3 + base * (1 - A3)
    wrap = (4 * A3 * (1 - A3)) * 0.35
    o = o * (1 - wrap) + BGB * wrap
    if GRAIN: o = o + RNG.normal(0, GRAIN, (H, W, 1)).astype(np.float32)
    wr.stdin.write((np.clip(o, 0, 1) * 255).astype(np.uint8).tobytes()); n += 1
wr.stdin.close(); wr.wait(); print('frames', n, 'OFF', OFF, 'DESK', DESK)
