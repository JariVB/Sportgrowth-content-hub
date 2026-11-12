# Reel 10 v10 · grote studio · RobustVideoMatting (ONNX) + echte tafel weg (enkel huid) + titel achter Jari + kleur koel->warm
# python3.13 comp3.py bron.mov SS D studio.png titel.png rvm.onnx uit.mp4
import sys, os, subprocess, numpy as np, onnxruntime as ort
from PIL import Image, ImageFilter
src, ss, d, bgp, titp, model, out = sys.argv[1:8]
W, H = 1080, 1920
SC, PX, PY = float(os.environ.get('SC', .8)), int(os.environ.get('PX', 108)), int(os.environ.get('PY', 87))
DESKF = int(os.environ.get('DESKF', 1592))   # voorrand studiobureau
TABY = int(os.environ.get('TABY', 1545))       # bovenkant echte tafel in de take
T_HOOK, T_WARM = (0.0, 3.15), float(os.environ.get('TWARM', 7.95))
s = ort.InferenceSession(model)
BG = np.asarray(Image.open(bgp).convert('RGB').resize((W, H), Image.LANCZOS), np.float32) / 255
TIT = np.asarray(Image.open(titp).convert('RGBA'), np.float32) / 255
yy = np.arange(H)[:, None]
# voorwerpen op het studiobureau (laptop, micro, tas) liggen VOOR de persoon
from PIL import ImageDraw
_m = Image.new('L', (W, H), 0); _d = ImageDraw.Draw(_m)
_d.polygon([(20,1243),(258,1280),(298,1383),(438,1410),(432,1425),(305,1470),(110,1415),(55,1330)], fill=255)   # laptop
_mm = Image.new('L', (W, H), 0); ImageDraw.Draw(_mm).polygon([(346,1172),(360,1163),(400,1163),(412,1178),(398,1298),(382,1306),(384,1342),(410,1352),(410,1374),(370,1381),(318,1374),(318,1352),(355,1342),(360,1306),(350,1296)], fill=255)   # micro (enkel donkere pixels)
_d.polygon([(813,1280),(902,1276),(898,1370),(870,1382),(845,1380),(820,1365),(813,1320)], fill=255)   # tas
_bgl = np.asarray(Image.open(bgp).convert('L').resize((W, H)), np.float32)
_mic = np.asarray(_mm, np.float32) * (_bgl < 70)
_m = Image.fromarray(np.maximum(np.asarray(_m, np.float32), _mic).astype(np.uint8))
FGM = (np.asarray(_m.filter(ImageFilter.GaussianBlur(1.2)), np.float32) / 255)[:,:,None]
TAB = np.clip((yy - TABY) / 10, 0, 1).astype(np.float32)
rd = subprocess.Popen(['ffmpeg','-v','error','-ss',ss,'-t',d,'-i',src,'-vf',f'scale={W}:{H}:flags=lanczos','-r','30','-f','rawvideo','-pix_fmt','rgb24','-'], stdout=subprocess.PIPE)
wr = subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','30','-i','-',
  '-vf', f"scale=w='trunc(1080*(1+0.04*between(t\\,{T_WARM}\\,{T_WARM+1.1}))/2)*2':h=-2:eval=frame,crop=1080:1920:(iw-1080)/2:(ih-1920)/2.4,format=yuv420p",
  '-c:v','libx264','-crf','16','-preset','fast',out], stdin=subprocess.PIPE)
rec = [np.zeros([1,1,1,1], np.float32)] * 4; dr = np.array([0.25], np.float32)
rng = np.random.default_rng(1); n = 0
sw, sh = round(W*SC), round(H*SC)
def ease(x): x = min(max(x, 0), 1); return 1 - (1 - x) ** 3
while True:
    b = rd.stdout.read(W*H*3)
    if len(b) < W*H*3: break
    t = n / 30
    f = np.frombuffer(b, np.uint8).reshape(H, W, 3).astype(np.float32) / 255
    fgr, pha, *rec = s.run(None, {'src': f.transpose(2,0,1)[None], 'r1i': rec[0], 'r2i': rec[1], 'r3i': rec[2], 'r4i': rec[3], 'downsample_ratio': dr})
    a = pha[0,0]; fg = fgr[0].transpose(1,2,0)
    # echte tafel: enkel huid (armen/handen) houden
    skin = np.clip(((f[:,:,0]-f[:,:,2])*255 - 22) / 14, 0, 1)
    skin = np.asarray(Image.fromarray((skin*255).astype(np.uint8)).filter(ImageFilter.MedianFilter(5)).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.BoxBlur(1)), np.float32) / 255
    a = a * (1 - TAB) + np.minimum(a, skin) * TAB
    # kleur persoon (iets warmer, zoals de studio)
    fg = np.clip((fg - .5) * 1.04 + .5 - .015, 0, 1) * np.array([1.0, .98, .955], np.float32)
    # schalen en plaatsen
    A = np.zeros((H, W), np.float32); P = np.zeros((H, W, 3), np.float32)
    aS = np.asarray(Image.fromarray((a*255).astype(np.uint8)).resize((sw, sh), Image.BICUBIC), np.float32) / 255
    fS = np.asarray(Image.fromarray((fg*255).astype(np.uint8)).resize((sw, sh), Image.LANCZOS), np.float32) / 255
    y0, x0 = max(0, PY), max(0, PX); sy, sx = y0 - PY, x0 - PX; hh, ww = min(H-y0, sh-sy), min(W-x0, sw-sx)
    A[y0:y0+hh, x0:x0+ww] = aS[sy:sy+hh, sx:sx+ww]; P[y0:y0+hh, x0:x0+ww] = fS[sy:sy+hh, sx:sx+ww]
    A *= np.clip((DESKF - yy) / 12, 0, 1)   # niets onder de voorrand van het bureau
    # achtergrond + titel achter de persoon
    base = BG.copy()
    if T_HOOK[0] <= t < T_HOOK[1]:
        k = ease((t - T_HOOK[0]) / .3); op = k * (1 - min(max((t - (T_HOOK[1]-.25)) / .25, 0), 1))
        sc = 1.12 - .12 * k
        ti = Image.fromarray((TIT*255).astype(np.uint8)); tw, th = round(W*sc), round(H*sc)
        ti = np.asarray(ti.resize((tw, th), Image.BICUBIC), np.float32) / 255
        ox, oy = (tw - W)//2, round((th - H) * 360/1920)
        ti = ti[oy:oy+H, ox:ox+W]
        ta = ti[:,:,3:4] * op
        base = base * (1 - ta) + ti[:,:,:3] * ta
    # contactschaduw op het bureau + light wrap
    shd = Image.fromarray((A*255).astype(np.uint8)).resize((W//4, H//4)).filter(ImageFilter.GaussianBlur(5)).resize((W, H))
    shd = np.roll(np.asarray(shd, np.float32) / 255, 12, axis=0)[:,:,None] * np.clip((yy - 1320) / 20, 0, 1)[:,:,None] * .5
    base = base * (1 - shd)
    A3 = A[:,:,None]; o = P * A3 + base * (1 - A3)
    o = o * (1 - FGM) + BG * FGM
    # kleur: koel tot 'Wat wel werkt?', dan in 0,6 s naar warm
    w = min(max((t - T_WARM) / .6, 0), 1)
    cool = np.array([.94, .98, 1.06], np.float32); warm = np.array([1.05, 1.0, .93], np.float32)
    o = o * (cool * (1 - w) + warm * w)
    o = o + rng.normal(0, 2.5/255, (H, W, 1)).astype(np.float32)
    wr.stdin.write((np.clip(o, 0, 1) * 255).astype(np.uint8).tobytes()); n += 1
wr.stdin.close(); wr.wait(); print('frames', n)
