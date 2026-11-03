# geluid onder de hook (2e arg "anim" = timing van de getekende versie; standaard: echte clip, slag op de snede 0,75 s)
#: tik van de bal (0,25 s), zoemende trilling (0,3-1,0 s), slag op de "4" (1,0 s)
import math, random, struct, wave, sys
SR=48000; DUR=34.8; N=int(SR*DUR); L=[0.0]*N; random.seed(5)
def add(t0,g,d,gain):
    s0=int(t0*SR)
    for i in range(int(d*SR)):
        if s0+i<N: L[s0+i]+=g(i/SR)*gain
add(0.0,lambda t:(t/0.25)**2*(random.random()*2-1)*0.5,0.25,0.25)                                   # aanzwellende whoosh van de bal
add(0.25,lambda t:math.exp(-t*60)*(random.random()*2-1)+math.exp(-t*25)*math.sin(2*math.pi*900*t),0.3,0.9)  # tik op het racket
def buzz(t):
    env=min(1,t/0.08)*max(0,1-max(0,t-0.55)/0.2); tr=0.55+0.45*math.sin(2*math.pi*32*t)
    return env*tr*(0.6*math.sin(2*math.pi*(170+60*t)*t)+0.3*math.sin(2*math.pi*(340+120*t)*t))
add(0.3,buzz,0.75,0.55 if len(sys.argv)>2 else 0.3)
add(1.0 if len(sys.argv)>2 else 0.75,lambda t:math.exp(-t*3.5)*math.sin(2*math.pi*(38+100*math.exp(-t*28))*t),1.2,1.0)            # slag op de "4"
if len(sys.argv)<3:  # brug 2,2-4,0: tik + zoemende trilling met de animatie
    add(2.2+0.25/0.95,lambda t:math.exp(-t*60)*(random.random()*2-1)+math.exp(-t*25)*math.sin(2*math.pi*900*t),0.3,0.7)
    add(2.2+0.3/0.95,buzz,0.75,0.5)
pk=max(abs(x) for x in L) or 1; g=0.85/pk
w=wave.open(sys.argv[1],'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes(b''.join(struct.pack('<hh',int(x*g*32000),int(x*g*32000)) for x in L)); w.close()
