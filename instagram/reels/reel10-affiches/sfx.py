# geluid onder de animaties (tijden na trim)
import math,random,struct,wave,sys
import os
WARP=[[0,0],[1.5,1.15],[3.65,3.15],[5.1,3.81],[8.45,7.5],[9.55,7.95],[10.7,9.19],[12.1,10.65],[12.9,11.31],[13.75,12.21],[14.8,13.15],[15.45,13.7],[16.05,14.15],[17.2,16.87],[18.45,19.03],[19.6,20.4],[22.2,21.6]] if os.environ.get('V10') else [[0,0],[22.2,22.2]]
def wp(t):
    for a,b in zip(WARP,WARP[1:]):
        if t<=b[0]: return a[1]+(t-a[0])*(b[1]-a[1])/(b[0]-a[0])
    return t
SR=48000;DUR=WARP[-1][1];N=int(SR*DUR);L=[0.0]*N;random.seed(3)
def add(t0,g,d,gain):
    s0=int(wp(t0)*SR)
    for i in range(int(d*SR)):
        if 0<=s0+i<N:L[s0+i]+=g(i/SR)*gain
nz=lambda: random.random()*2-1
thud=lambda t:math.exp(-t*9)*math.sin(2*math.pi*(55+120*math.exp(-t*30))*t)+0.4*math.exp(-t*40)*nz()
whoosh=lambda d:(lambda t:math.sin(math.pi*min(1,t/d))*nz()*0.6)
tick=lambda t:math.exp(-t*90)*math.sin(2*math.pi*2400*t)
pop=lambda t:math.exp(-t*25)*math.sin(2*math.pi*(500+700*math.exp(-t*20))*t)
add(0.0,thud,0.6,0.9)                      # titel slaat in
add(1.45,whoosh(.35),0.35,0.35)            # affiche schuift in
add(1.95,thud,0.6,1.0)                     # STOP-stempel
add(4.95,whoosh(.4),0.4,0.35)              # gsm
for k in range(28): add(5.4+k*0.1,tick,0.05,0.12)   # scrollen
add(9.5,whoosh(.3),0.3,0.5)                # punch zoom
add(10.55,whoosh(.35),0.35,0.35)           # gsm 2
for k in range(11): add(10.7+k*0.13,tick,0.05,0.25)  # teller
for a in (12.9,13.75,14.8): add(a,pop,0.3,0.6)
for k in range(10): add(16.0+k*0.1,lambda t:math.exp(-t*30)*math.sin(2*math.pi*(900+k*80)*t),0.15,0.25)
for k in range(8): add(17.2+k*0.15,tick,0.05,0.35) # klok
add(18.45,lambda t:(0.5+0.5*math.sin(2*math.pi*12*t))*math.sin(2*math.pi*120*t)*min(1,t/0.05)*max(0,1-t/1.0),1.0,0.3) # neon zoem
add(19.6,thud,0.8,0.9)                     # eindkaart
pk=max(abs(x) for x in L) or 1;g=0.8/pk
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR)
w.writeframes(b''.join(struct.pack('<hh',int(x*g*32000),int(x*g*32000)) for x in L));w.close()
