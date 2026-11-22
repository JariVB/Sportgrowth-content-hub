# Reel 14 v5 "pingpong": amateur (links) en pro (rechts) zeggen om beurten één zin. Wie zwijgt, staat stil (idle-loop).
import subprocess, sys, json
S = sys.argv[1]
CR = "crop=600:1920:240:0,crop=540:1920:30:0"
PRO = "eq=contrast=1.06:saturation=1.06:brightness=-0.01,colorbalance=rs=0.04:gs=0.01:bs=-0.04:rh=0.03:bh=-0.03,vignette=PI/5,unsharp=5:5:0.4"
AM = "eq=saturation=0.92"
SEG = [('A',0.55,2.62),('P',1.80,5.20),('A',2.72,3.48),('P',5.44,7.06),('A',3.92,5.00),('P',7.44,9.90)]
IDLE = {'A':(5.0,7.4),'P':(9.95,12.3)}
END_Q, END_C = 3.6, 2.4
parts, fc, t, timeline = [], [], 0.0, []
for i,(w,a,b) in enumerate(SEG):
    d = b - a
    sp = '0' if w=='A' else '1'; ot = '1' if w=='A' else '0'
    ia, ib = IDLE['P' if w=='A' else 'A']
    fc.append(f"[{sp}:v]trim={a}:{b},setpts=PTS-STARTPTS,{CR},{AM if w=='A' else PRO}[s{i}]")
    fc.append(f"[{ot}:v]trim={ia}:{ib},setpts=PTS-STARTPTS,{CR},{PRO if w=='A' else AM},loop=-1:size=200,trim=0:{d:.3f},setpts=PTS-STARTPTS[o{i}]")
    fc.append(f"[s{i}][o{i}]hstack[v{i}]" if w=='A' else f"[o{i}][s{i}]hstack[v{i}]")
    fc.append(f"[{sp}:a]atrim={a}:{b},asetpts=PTS-STARTPTS[a{i}]")
    timeline.append([w, round(t,3), round(t+d,3)]); t += d
n=len(SEG)
fc.append(f"[0:v]trim={IDLE['A'][0]}:{IDLE['A'][1]},setpts=PTS-STARTPTS,{CR},{AM},loop=-1:size=200,trim=0:{END_Q},setpts=PTS-STARTPTS[qa]")
fc.append(f"[1:v]trim={IDLE['P'][0]}:{IDLE['P'][1]},setpts=PTS-STARTPTS,{CR},{PRO},loop=-1:size=200,trim=0:{END_Q},setpts=PTS-STARTPTS[qp]")
fc.append("[qa][qp]hstack[vq]")
fc.append(f"[1:v]trim=9.4:9.45,setpts=PTS-STARTPTS,gblur=sigma=30,eq=brightness=-0.25,tpad=stop_mode=clone:stop_duration={END_C},trim=0:{END_C},setpts=PTS-STARTPTS[vc]")
fc.append(''.join(f"[v{i}]" for i in range(n)) + f"[vq][vc]concat=n={n+2}:v=1,fps=30,format=yuv420p[v]")
fc.append(''.join(f"[a{i}]" for i in range(n)) + f"concat=n={n}:v=0:a=1,apad,atrim=0:{t+END_Q+END_C:.3f}[a]")
total = t + END_Q + END_C
subprocess.run(['ffmpeg','-nostdin','-v','error','-y','-i',f'{S}/am.mp4','-i',f'{S}/pr.mp4','-filter_complex',';\n'.join(fc),'-map','[v]','-map','[a]','-c:v','libx264','-crf','16','-preset','fast','-c:a','pcm_s16le','-t',f'{total:.3f}',f'{S}/pp.mkv'],check=True)
json.dump({'timeline':timeline,'Q':round(t,3),'E':round(t+END_Q,3),'DUR':round(total,3)},open(f'{S}/pp.json','w'))
print(timeline, t, total)
