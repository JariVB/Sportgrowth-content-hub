# Alfamasker per frame met MODNet (ONNX, Apache-2.0): python3.13 matte.py bron.mov SS D uit.mp4 model.onnx
import sys, subprocess, numpy as np, onnxruntime as ort
src, ss, d, out, model = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]
W, H, w, h = 1080, 1920, 576, 1024
s = ort.InferenceSession(model)
rd = subprocess.Popen(['ffmpeg','-v','error','-ss',ss,'-t',d,'-i',src,'-vf',f'scale={w}:{h}','-r','30','-f','rawvideo','-pix_fmt','rgb24','-'], stdout=subprocess.PIPE)
wr = subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','gray','-s',f'{w}x{h}','-r','30','-i','-','-vf',f'scale={W}:{H}:flags=bicubic','-c:v','libx264','-crf','8','-pix_fmt','yuv420p',out], stdin=subprocess.PIPE)
n = 0
while True:
    b = rd.stdout.read(w*h*3)
    if len(b) < w*h*3: break
    x = np.frombuffer(b, np.uint8).reshape(h, w, 3).astype(np.float32)/255
    a = s.run(None, {'input': ((x-0.5)/0.5).transpose(2,0,1)[None]})[0][0,0]
    wr.stdin.write((np.clip(a,0,1)*255).astype(np.uint8).tobytes()); n += 1
wr.stdin.close(); wr.wait(); print('frames', n)
