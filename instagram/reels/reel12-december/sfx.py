import math,random,struct,wave,sys
SR=48000;DUR=30.7;N=int(SR*DUR);L=[0.0]*N;random.seed(5)
def add(t0,g,d,gain):
    s=int(t0*SR)
    for i in range(int(d*SR)):
        if 0<=s+i<N:L[s+i]+=g(i/SR)*gain
nz=lambda:random.random()*2-1
thud=lambda t:math.exp(-t*9)*math.sin(2*math.pi*(55+120*math.exp(-t*30))*t)+0.4*math.exp(-t*40)*nz()
whoosh=lambda d:(lambda t:math.sin(math.pi*min(1,t/d))*nz()*0.6)
pop=lambda t:math.exp(-t*25)*math.sin(2*math.pi*(500+700*math.exp(-t*20))*t)
ding=lambda t:math.exp(-t*6)*(math.sin(2*math.pi*1320*t)+0.5*math.sin(2*math.pi*1980*t))
add(0.0,thud,0.6,0.8); add(0.4,whoosh(.35),0.35,0.35)
for t in [7.95,10.54,15.7,20.14]: add(t-0.05,whoosh(.3),0.3,0.4); add(t+0.25,pop,0.3,0.55)
for t in [10.3,19.8]: add(t,thud,0.5,0.5)
for t in [22.98,23.84,24.66]: add(t-0.1,pop,0.3,0.35)
add(25.5,ding,0.6,0.35); add(29.0,thud,0.8,0.9)
pk=max(abs(x) for x in L);g=0.8/pk
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR)
w.writeframes(b''.join(struct.pack('<hh',int(x*g*32000),int(x*g*32000)) for x in L));w.close()
