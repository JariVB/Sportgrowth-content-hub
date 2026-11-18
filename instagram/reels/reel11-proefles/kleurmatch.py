# Kleur/licht van clip B afstemmen op clip A (histogram matching per kanaal, LUT uit 5 frames van elk)
# python3.13 kleurmatch.py A.mp4 B.mp4 uit.mp4
import sys, subprocess, numpy as np
A, B, out = sys.argv[1:4]
def frames(p, n=5):
    d = float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',p]))
    fs = []
    for i in range(n):
        b = subprocess.check_output(['ffmpeg','-v','error','-ss',str(d*(i+.5)/n),'-i',p,'-frames:v','1','-f','rawvideo','-pix_fmt','rgb24','-'])
        fs.append(np.frombuffer(b, np.uint8))
    return np.concatenate(fs).reshape(-1, 3)
fa, fb = frames(A), frames(B)
lut = []
for c in range(3):
    ha = np.cumsum(np.bincount(fa[:, c], minlength=256)).astype(float); ha /= ha[-1]
    hb = np.cumsum(np.bincount(fb[:, c], minlength=256)).astype(float); hb /= hb[-1]
    m = np.interp(hb, ha, np.arange(256))
    lut.append(np.clip(m, 0, 255).astype(np.uint8))
lut = np.stack(lut, 1)
W, H = map(int, subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','csv=p=0',B]).decode().split(','))
rd = subprocess.Popen(['ffmpeg','-v','error','-i',B,'-f','rawvideo','-pix_fmt','rgb24','-'], stdout=subprocess.PIPE)
wr = subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','30','-i','-','-i',B,'-map','0:v','-map','1:a?','-c:v','libx264','-crf','14','-pix_fmt','yuv420p','-c:a','copy',out], stdin=subprocess.PIPE)
while True:
    b = rd.stdout.read(W*H*3)
    if len(b) < W*H*3: break
    im = np.frombuffer(b, np.uint8).reshape(-1, 3)
    o = np.stack([lut[im[:, c], c] for c in range(3)], 1)
    wr.stdin.write(o.astype(np.uint8).tobytes())
wr.stdin.close(); wr.wait()
