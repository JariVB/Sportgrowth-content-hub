# Reel 10 v12 · Beeble-beeld (2 delen) -> 1080p, huidskleur corrigeren, titel ACHTER Jari (RVM-masker), punch-zoom op de naad
# python3.13 beeble_comp.py deel1.mp4 deel2.mp4 titel.png rvm.onnx uit.mp4
import sys, subprocess, numpy as np, onnxruntime as ort
from PIL import Image
d1, d2, titp, model, out = sys.argv[1:6]
W, H = 1080, 1920
SEAM = 329 / 30            # naad tussen deel 1 en 2
T_HOOK = (0.0, 3.15)
s = ort.InferenceSession(model)
TIT = np.asarray(Image.open(titp).convert('RGBA'), np.float32) / 255
rd = subprocess.Popen(['ffmpeg','-v','error','-i',d1,'-i',d2,'-filter_complex','[0:v][1:v]concat=n=2:v=1[v];[v]scale=1080:1920:flags=lanczos,unsharp=5:5:0.6:5:5:0','-map','[v]','-r','30','-f','rawvideo','-pix_fmt','rgb24','-'], stdout=subprocess.PIPE)
wr = subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','30','-i','-','-c:v','libx264','-crf','16','-preset','fast','-pix_fmt','yuv420p',out], stdin=subprocess.PIPE)
rec = [np.zeros([1,1,1,1], np.float32)] * 4; dr = np.array([0.25], np.float32)
rng = np.random.default_rng(1); n = 0
def ease(x): x = min(max(x, 0), 1); return 1 - (1 - x) ** 3
while True:
    b = rd.stdout.read(W*H*3)
    if len(b) < W*H*3: break
    t = n / 30
    f = np.frombuffer(b, np.uint8).reshape(H, W, 3).astype(np.float32) / 255
    # huid minder rood/oranje: warme, verzadigde pixels richting grijs + rood iets terug
    r, g, bl = f[:,:,0], f[:,:,1], f[:,:,2]
    warm = np.clip((r - bl - .08) / .25, 0, 1) * np.clip((r - g) / .15, 0, 1)
    lum = (.299*r + .587*g + .114*bl)[:,:,None]
    k = (warm * .28)[:,:,None]
    f = f * (1 - k) + lum * k
    f = f * (1 - warm[:,:,None] * np.array([.05, 0, -.02], np.float32))
    f = np.clip(f * 1.03 + .01, 0, 1)
    o = f
    if t < T_HOOK[1]:
        fgr, pha, *rec = s.run(None, {'src': f.transpose(2,0,1)[None], 'r1i': rec[0], 'r2i': rec[1], 'r3i': rec[2], 'r4i': rec[3], 'downsample_ratio': dr})
        A = pha[0,0][:,:,None]
        kk = ease(t / .3); op = kk * (1 - min(max((t - (T_HOOK[1]-.25)) / .25, 0), 1))
        sc = 1.12 - .12 * kk; tw, th = round(W*sc), round(H*sc)
        ti = np.asarray(Image.fromarray((TIT*255).astype(np.uint8)).resize((tw, th), Image.BICUBIC), np.float32) / 255
        ox, oy = (tw - W)//2, round((th - H) * 360/1920); ti = ti[oy:oy+H, ox:ox+W]
        ta = ti[:,:,3:4] * op * (1 - A)
        o = o * (1 - ta) + ti[:,:,:3] * ta
    # punch-zoom op de naad (verbergt de sprong tussen de 2 Beeble-renders)
    if SEAM <= t < SEAM + .7:
        z = 1 + .07 * (1 - ease((t - SEAM) / .7))
        zw, zh = round(W*z), round(H*z)
        im = np.asarray(Image.fromarray((o*255).astype(np.uint8)).resize((zw, zh), Image.BICUBIC), np.float32) / 255
        x0, y0 = (zw - W)//2, round((zh - H) * .4); o = im[y0:y0+H, x0:x0+W]
    o = o + rng.normal(0, 2/255, (H, W, 1)).astype(np.float32)
    wr.stdin.write((np.clip(o, 0, 1) * 255).astype(np.uint8).tobytes()); n += 1
wr.stdin.close(); wr.wait(); print('frames', n)
