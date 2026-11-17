# Reel 11 · Beeble-delen (schoon) + alpha -> 1080p, titel achter Jari (0-3,9 s), punch-zoom op de naad
# python3.13 comp.py d1.mp4 d2.mp4 a1.mp4 a2.mp4 titel.png uit.mp4
import sys, subprocess, numpy as np
from PIL import Image
d1, d2, a1, a2, titp, out = sys.argv[1:7]
W, H = 1080, 1920; SEAM = 276/30; TH = (0.0, 3.9)
TIT = np.asarray(Image.open(titp).convert('RGBA'), np.float32) / 255
def rd(a, b, fmt):
    return subprocess.Popen(['ffmpeg','-v','error','-i',a,'-i',b,'-filter_complex','[0:v][1:v]concat=n=2:v=1[c];[c]scale=1080:1920:flags=lanczos[o]','-map','[o]','-r','30','-f','rawvideo','-pix_fmt',fmt,'-'], stdout=subprocess.PIPE)
rv, ra = rd(d1, d2, 'rgb24'), rd(a1, a2, 'gray')
wr = subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','30','-i','-','-c:v','libx264','-crf','16','-preset','fast','-pix_fmt','yuv420p',out], stdin=subprocess.PIPE)
ease = lambda x: 1 - (1 - min(max(x, 0), 1)) ** 3
n = 0
while True:
    b, a = rv.stdout.read(W*H*3), ra.stdout.read(W*H)
    if len(b) < W*H*3 or len(a) < W*H: break
    t = n / 30
    o = np.frombuffer(b, np.uint8).reshape(H, W, 3).astype(np.float32) / 255
    A = (np.frombuffer(a, np.uint8).reshape(H, W).astype(np.float32) / 255)[:, :, None]
    if t < TH[1]:
        k = ease(t / .3); op = k * (1 - min(max((t - (TH[1] - .3)) / .3, 0), 1))
        sc = 1.12 - .12 * k; tw, th = round(W*sc), round(H*sc)
        ti = np.asarray(Image.fromarray((TIT*255).astype(np.uint8)).resize((tw, th), Image.BICUBIC), np.float32) / 255
        ox, oy = (tw - W)//2, round((th - H) * 330/1920); ti = ti[oy:oy+H, ox:ox+W]
        ta = ti[:, :, 3:4] * op * (1 - A)
        o = o * (1 - ta) + ti[:, :, :3] * ta
    if SEAM <= t < SEAM + .6:
        z = 1 + .09 * (1 - ease((t - SEAM) / .6)); zw, zh = round(W*z), round(H*z)
        im = np.asarray(Image.fromarray((o*255).astype(np.uint8)).resize((zw, zh), Image.BICUBIC), np.float32) / 255
        x0, y0 = (zw - W)//2, round((zh - H) * .38); o = im[y0:y0+H, x0:x0+W]
    wr.stdin.write((np.clip(o, 0, 1)*255).astype(np.uint8).tobytes()); n += 1
wr.stdin.close(); wr.wait(); print('frames', n)
