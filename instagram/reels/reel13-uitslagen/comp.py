# Reel 13 · deel 1 (Beeble, schoon) + alpha -> 1080p, titel achter Jari (0-3,1 s), lichte zoom 0-3 s.
# Deel 2 = grafisch (wazige studio als achtergrond). python3.13 comp.py d1 a1 titel.png bg2.png uit.mp4
import sys, subprocess, numpy as np
from PIL import Image
d1, a1, titp, bgp, out = sys.argv[1:6]
W, H = 1080, 1920; TH = (0.0, 3.1); P2 = 11.1 + 1.5; CUT = 9.0  # vanaf 'Wat wel werkt?' grafisch
TIT = np.asarray(Image.open(titp).convert('RGBA'), np.float32) / 255
BG = np.asarray(Image.open(bgp).convert('RGB').resize((1080, 1920)), np.uint8).tobytes()
def rd(f, fmt):
    return subprocess.Popen(['ffmpeg','-v','error','-i',f,'-vf','scale=1080:1920:flags=lanczos','-r','30','-f','rawvideo','-pix_fmt',fmt,'-'], stdout=subprocess.PIPE)
rv, ra = rd(d1, 'rgb24'), rd(a1, 'gray')
wr = subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','30','-i','-','-c:v','libx264','-crf','16','-preset','fast','-pix_fmt','yuv420p',out], stdin=subprocess.PIPE)
ease = lambda x: 1 - (1 - min(max(x, 0), 1)) ** 3
n = 0
while True:
    b, a = rv.stdout.read(W*H*3), ra.stdout.read(W*H)
    if len(b) < W*H*3 or len(a) < W*H: break
    t = n / 30
    if t >= CUT:
        wr.stdin.write(BG); n += 1; continue
    o = np.frombuffer(b, np.uint8).reshape(H, W, 3).astype(np.float32) / 255
    A = (np.frombuffer(a, np.uint8).reshape(H, W).astype(np.float32) / 255)[:, :, None]
    if t < TH[1]:
        k = ease(t / .3); op = k * (1 - min(max((t - (TH[1] - .3)) / .3, 0), 1))
        sc = 1.12 - .12 * k; tw, th = round(W*sc), round(H*sc)
        ti = np.asarray(Image.fromarray((TIT*255).astype(np.uint8)).resize((tw, th), Image.BICUBIC), np.float32) / 255
        ox, oy = (tw - W)//2, round((th - H) * 330/1920); ti = ti[oy:oy+H, ox:ox+W]
        ta = ti[:, :, 3:4] * op * (1 - A)
        o = o * (1 - ta) + ti[:, :, :3] * ta
    if t < 3.0:  # trage inzoom tijdens de hook (verbergt het kijken naar beneden)
        z = 1.0 + 0.06 * ease(t / 3.0); zw, zh = round(W*z), round(H*z)
        im = np.asarray(Image.fromarray((o*255).astype(np.uint8)).resize((zw, zh), Image.BICUBIC), np.float32) / 255
        x0, y0 = (zw - W)//2, round((zh - H) * .38); o = im[y0:y0+H, x0:x0+W]
    wr.stdin.write((np.clip(o, 0, 1)*255).astype(np.uint8).tobytes()); n += 1
bg = np.asarray(Image.open(bgp).convert('RGB').resize((W, H)), np.uint8).tobytes()
for _ in range(round(P2 * 30)): wr.stdin.write(bg)
wr.stdin.close(); wr.wait(); print('frames', n)
