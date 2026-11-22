import math,random,struct,wave,sys
SR=48000;DUR=17.39;N=int(SR*DUR);L=[0.0]*N;random.seed(8)
def add(t0,g,d,gain):
    s=int(t0*SR)
    for i in range(int(d*SR)):
        if 0<=s+i<N:L[s+i]+=g(i/SR)*gain
nz=lambda:random.random()*2-1
thud=lambda t:math.exp(-t*9)*math.sin(2*math.pi*(55+120*math.exp(-t*30))*t)+0.4*math.exp(-t*40)*nz()
pop=lambda t:math.exp(-t*25)*math.sin(2*math.pi*(500+700*math.exp(-t*20))*t)
tick=lambda t:math.exp(-t*60)*nz()
buzz=lambda t:math.exp(-t*5)*(1 if math.sin(2*math.pi*90*t)>0 else -1)*0.5
ding=lambda t:math.exp(-t*6)*(math.sin(2*math.pi*1320*t)+0.5*math.sin(2*math.pi*1980*t))
add(0.0,thud,0.6,0.7)
for t in [2.07,5.47,6.23,7.85,8.93]: add(t,tick,0.12,0.5)
add(1.0,buzz,0.4,0.3); add(3.45,pop,0.3,0.5); add(6.6,pop,0.3,0.5); add(10.3,ding,0.6,0.35)
add(11.5,pop,0.3,0.5); add(14.99,thud,0.8,0.9)
pk=max(abs(x) for x in L);g=0.8/pk
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR)
w.writeframes(b''.join(struct.pack('<hh',int(x*g*32000),int(x*g*32000)) for x in L));w.close()
