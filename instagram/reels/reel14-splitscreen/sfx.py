import math,random,struct,wave,sys
SR=48000;DUR=19.7;N=int(SR*DUR);L=[0.0]*N;random.seed(7)
def add(t0,g,d,gain):
    s=int(t0*SR)
    for i in range(int(d*SR)):
        if 0<=s+i<N:L[s+i]+=g(i/SR)*gain
nz=lambda:random.random()*2-1
thud=lambda t:math.exp(-t*9)*math.sin(2*math.pi*(55+120*math.exp(-t*30))*t)+0.4*math.exp(-t*40)*nz()
whoosh=lambda d:(lambda t:math.sin(math.pi*min(1,t/d))*nz()*0.6)
pop=lambda t:math.exp(-t*25)*math.sin(2*math.pi*(500+700*math.exp(-t*20))*t)
ding=lambda t:math.exp(-t*6)*(math.sin(2*math.pi*1320*t)+0.5*math.sin(2*math.pi*1980*t))
buzz=lambda t:math.exp(-t*5)*(1 if math.sin(2*math.pi*90*t)>0 else -1)*0.5
add(0.0,thud,0.6,0.8); add(2.3,buzz,0.4,0.35); add(2.4,pop,0.3,0.5)
add(4.65,whoosh(.35),0.35,0.5); add(4.7,ding,0.6,0.35)
add(6.3,pop,0.3,0.5); add(8.65,whoosh(.3),0.3,0.4); add(8.75,pop,0.3,0.5); add(10.65,pop,0.3,0.5)
add(13.25,whoosh(.4),0.4,0.55); add(13.6,pop,0.3,0.5); add(17.3,thud,0.8,0.9)
pk=max(abs(x) for x in L);g=0.8/pk
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR)
w.writeframes(b''.join(struct.pack('<hh',int(x*g*32000),int(x*g*32000)) for x in L));w.close()
