import math,random,struct,wave,sys
SR=48000;DUR=24.0;N=int(SR*DUR);L=[0.0]*N;random.seed(6)
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
add(3.75,whoosh(.3),0.3,0.4); add(5.15,whoosh(.3),0.3,0.4)
add(6.65,thud,0.6,1.0); add(9.0,ding,0.6,0.35)
add(10.25,pop,0.3,0.4); add(11.1,whoosh(.4),0.4,0.55)
for t in [11.45,11.75,13.1]: add(t+0.2,pop,0.3,0.45)
add(15.0,whoosh(.4),0.4,0.4); add(17.15,thud,0.6,0.8); add(17.4,pop,0.3,0.5); add(20.9,thud,0.8,0.9)
pk=max(abs(x) for x in L);g=0.8/pk
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR)
w.writeframes(b''.join(struct.pack('<hh',int(x*g*32000),int(x*g*32000)) for x in L));w.close()
