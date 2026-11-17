# Witte pluisjes/haren op een donker shirt wegwerken: pixels die >18 lichter zijn dan de mediaan
# in een donkere omgeving (mediaan <70) vervangen door de mediaan. Huid, baard en micro blijven.
# python3.13 pluisjes.py in.mp4 uit.mp4
import sys, subprocess, numpy as np
from PIL import Image, ImageFilter
src, out = sys.argv[1:3]
W, H = map(int, subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','csv=p=0',src]).decode().split(','))
rd = subprocess.Popen(['ffmpeg','-v','error','-i',src,'-f','rawvideo','-pix_fmt','rgb24','-'], stdout=subprocess.PIPE)
wr = subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','30','-i','-','-i',src,'-map','0:v','-map','1:a?','-c:v','libx264','-crf','14','-pix_fmt','yuv420p','-c:a','copy',out], stdin=subprocess.PIPE)
mf = lambda a: np.asarray(Image.fromarray(a).filter(ImageFilter.MedianFilter(7)), np.float32)
while True:
    b = rd.stdout.read(W*H*3)
    if len(b) < W*H*3: break
    im = np.frombuffer(b, np.uint8).reshape(H, W, 3)
    med = np.stack([mf(np.ascontiguousarray(im[:,:,c])) for c in range(3)], 2)
    lum, ml = im.astype(np.float32).mean(2), med.mean(2)
    m = ((lum - ml) > 18) & (ml < 70)
    m = np.asarray(Image.fromarray((m*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)), bool)
    o = im.copy(); o[m] = med[m].astype(np.uint8)
    wr.stdin.write(o.tobytes())
wr.stdin.close(); wr.wait()
