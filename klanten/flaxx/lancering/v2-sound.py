# Sounddesign lanceringsvideo v2 (zuiver Python, 48 kHz stereo)
import math, random, struct, wave, sys
SR=48000; DUR=24.1; N=int(SR*DUR)
L=[0.0]*N; R=[0.0]*N
random.seed(7)
def add(t0, gen, dur, gain=1.0, pan=0.0):
    s0=int(t0*SR)
    for i in range(int(dur*SR)):
        j=s0+i
        if j>=N: break
        v=gen(i/SR)*gain
        L[j]+=v*(1-pan)*0.5*2**0.5; R[j]+=v*(1+pan)*0.5*2**0.5
# drone
def drone(t):
    env=min(1,t/2.0)*min(1,max(0,(DUR-0.2-t)/3.0))
    trem=0.85+0.15*math.sin(2*math.pi*0.25*t)
    return env*trem*(0.5*math.sin(2*math.pi*55*t)+0.3*math.sin(2*math.pi*82.41*t+1)+0.15*math.sin(2*math.pi*110*t+2))
add(0,drone,DUR,0.22)
def kick(t,f0=110,f1=42,d=7):
    f=f1+(f0-f1)*math.exp(-t*30)
    return math.exp(-t*d)*math.sin(2*math.pi*f*t)
def click(t): return math.exp(-t*90)*(random.random()*2-1)
lp=[0.0]
def noise_lp(t,a=0.15):
    lp[0]=lp[0]+a*((random.random()*2-1)-lp[0]); return lp[0]
# zachte hits bij het begin
for t0 in (0.6,2.6): add(t0,lambda t:kick(t,80,40,4),1.2,0.55)
# ritme: kick + tick op elke snede
for k in range(8):
    t0=4.2+0.5*k
    add(t0,lambda t:kick(t,120,45,9),0.45,0.75)
    add(t0,click,0.06,0.25,0.3 if k%2 else -0.3)
# riser naar hero
def riser(t):
    x=t/1.0
    return (x**2.2)*(random.random()*2-1)*(0.6+0.4*math.sin(2*math.pi*(200+900*x)*t))
add(7.2,riser,1.0,0.32)
# impact hero
def impact(t): return kick(t,140,36,3.2)+0.35*math.exp(-t*6)*noise_lp(t,0.08)
add(8.2,impact,2.2,0.95)
for t0 in (11.7,15.2): add(t0,lambda t:kick(t,110,40,4.5),1.4,0.6)
for t0 in (10.3,13.8): add(t0,lambda t:kick(t,100,45,8),0.6,0.4)
# whoosh
def whoosh(t,d=0.6):
    x=t/d; env=math.sin(math.pi*min(1,x))**2
    return env*noise_lp(t,0.05+0.25*x)
for t0 in (11.4,14.9,16.9,18.4): add(t0,whoosh,0.6,0.55)
add(20.9,lambda t:whoosh(t,1.0),1.0,0.35)
# eindimpact + staart
add(19.9,impact,3.5,1.0)
def shimmer(t): return math.exp(-t*0.9)*(0.5*math.sin(2*math.pi*440*t)+0.3*math.sin(2*math.pi*659.3*t)+0.2*math.sin(2*math.pi*880*t))*min(1,t/0.3)
add(20.2,shimmer,3.8,0.08)
# normaliseren + zachte limiter
pk=max(max(abs(x) for x in L),max(abs(x) for x in R))
g=0.89/pk
w=wave.open(sys.argv[1],'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
fr=bytearray()
for a,b in zip(L,R):
    a=math.tanh(a*g*1.2)/math.tanh(1.2); b=math.tanh(b*g*1.2)/math.tanh(1.2)
    fr+=struct.pack('<hh',int(a*32000),int(b*32000))
w.writeframes(bytes(fr)); w.close()
