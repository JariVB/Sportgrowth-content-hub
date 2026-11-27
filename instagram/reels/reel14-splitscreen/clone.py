# Kloon-split-screen: P (zwart, links) en A (rood, rechts) aan dezelfde tafel. Wie spreekt = live, de ander = rustige loop.
import sys, json, subprocess, numpy as np, cv2, mediapipe as mp
from mediapipe.tasks.python import vision, BaseOptions
S, MODEL = sys.argv[1], sys.argv[2]
FPS=30
SEG=[('A',2.20,5.30),('P',0.00,4.30),('A',7.15,8.50),('P',5.90,8.00),('A',10.90,12.40),('P',10.15,11.70),('P',13.55,15.20)]
IDLE={'A':[(5.30,6.60),(9.30,10.70)],'P':[(16.0,20.0)]}
END_Q, END_C = 3.6, 2.4
def bounce(a,b,n,off=0):
    L=int(round((b-a)*FPS)); seq=list(range(L))+list(range(L-2,0,-1))
    return [a+seq[(i+off)%len(seq)]/FPS for i in range(n)]
plan=[]; timeline=[]; t=0; audio=[]; ic={'A':0,'P':0}; off={'A':0,'P':0}
for w,a,b in SEG:
    n=int(round((b-a)*FPS)); o='P' if w=='A' else 'A'
    rng=IDLE[o][ic[o]%len(IDLE[o])]; ic[o]+=1
    idle=bounce(*rng,n,off[o]); off[o]+=n
    for i in range(n):
        live=a+i/FPS
        plan.append({'A':live if w=='A' else idle[i],'P':live if w=='P' else idle[i]})
    timeline.append([w,round(t,3),round(t+n/FPS,3)]); audio.append((w,a,a+n/FPS)); t+=n/FPS
nq=int(END_Q*FPS); qa=bounce(*IDLE['A'][0],nq,7); qp=bounce(*IDLE['P'][0],nq,11)
plan+= [{'A':qa[i],'P':qp[i]} for i in range(nq)]
# frames lezen
caps={k:cv2.VideoCapture(f'{S}/src{n}.mov') for k,n in (('A','3717'),('P','3719'))}
cache={}
def frame(k,tt):
    idx=int(round(tt*FPS)); key=(k,idx)
    if key not in cache:
        c=caps[k]; c.set(cv2.CAP_PROP_POS_FRAMES,idx); ok,f=c.read()
        cache[key]=cv2.cvtColor(f,cv2.COLOR_BGR2RGB)
    return cache[key], idx
seg=vision.ImageSegmenter.create_from_options(vision.ImageSegmenterOptions(base_options=BaseOptions(model_asset_path=MODEL),output_confidence_masks=True))
mcache={}
def mask(k,img,idx):
    if (k,idx) not in mcache:
        r=seg.segment(mp.Image(image_format=mp.ImageFormat.SRGB,data=np.ascontiguousarray(img)))
        m=1-np.squeeze(r.confidence_masks[0].numpy_view())
        m=cv2.GaussianBlur(np.clip((m-0.3)/0.4,0,1).astype(np.float32),(9,9),0)
        mcache[(k,idx)]=m
    return mcache[(k,idx)]
W,H=1080,1920
x=np.arange(W,dtype=np.float32)[None,:,None]; seam=np.clip((x-W/2)/80+0.5,0,1)
out=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-c:v','libx264','-crf','15','-preset','fast','-pix_fmt','yuv420p',f'{S}/clone.mp4'],stdin=subprocess.PIPE)
last=None
for i,p in enumerate(plan):
    a,ia=frame('A',p['A']); pp,ip=frame('P',p['P'])
    mA=mask('A',a,ia)[...,None]; mP=mask('P',pp,ip)[...,None]
    af=a.astype(np.float32); pf=pp.astype(np.float32)
    bg=pf*(1-seam)+af*seam
    o=bg*(1-mP)+pf*mP
    o=o*(1-mA)+af*mA
    last=o.astype(np.uint8); out.stdin.write(last.tobytes())
    if len(cache)>400: cache.clear()
blur=cv2.GaussianBlur(last,(0,0),30); blur=(blur*0.75).astype(np.uint8)
for i in range(int(END_C*FPS)): out.stdin.write(blur.tobytes())
out.stdin.close(); out.wait()
# audio
fc=[]; 
for i,(w,a,b) in enumerate(audio): fc.append(f"[{0 if w=='A' else 1}:a]atrim={a}:{b},asetpts=PTS-STARTPTS[a{i}]")
total=t+END_Q+END_C
fc.append(''.join(f'[a{i}]' for i in range(len(audio)))+f"concat=n={len(audio)}:v=0:a=1,apad,atrim=0:{total:.3f}[a]")
subprocess.run(['ffmpeg','-v','error','-y','-i',f'{S}/src3717.mov','-i',f'{S}/src3719.mov','-filter_complex',';'.join(fc),'-map','[a]','-c:a','pcm_s16le',f'{S}/clone.wav'],check=True)
json.dump({'timeline':timeline,'Q':round(t,3),'E':round(t+END_Q,3),'DUR':round(total,3)},open(f'{S}/clone.json','w'))
print(timeline,t,total)
