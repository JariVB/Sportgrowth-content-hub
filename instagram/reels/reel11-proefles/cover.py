import sys,subprocess,numpy as np
from PIL import Image
v,a,tit,t,out=sys.argv[1:6]
W,H=1080,1920
def fr(f,fmt,c):
    b=subprocess.run(['ffmpeg','-v','error','-ss',t,'-i',f,'-frames:v','1','-vf','scale=1080:1920:flags=lanczos','-f','rawvideo','-pix_fmt',fmt,'-'],capture_output=True).stdout
    return np.frombuffer(b,np.uint8).reshape(H,W,c).astype(np.float32)/255
o=fr(v,'rgb24',3);A=fr(a,'gray',1)
T=np.asarray(Image.open(tit).convert('RGBA'),np.float32)/255
ta=T[:,:,3:4]*(1-A);o=o*(1-ta)+T[:,:,:3]*ta
Image.fromarray((np.clip(o,0,1)*255).astype(np.uint8)).save(out)
