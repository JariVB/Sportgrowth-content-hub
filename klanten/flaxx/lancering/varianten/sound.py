# generieke sounddesign: python3 sound.py out.wav duur "cut1,cut2,.." eindimpact [riser_eind]
import math, random, struct, wave, sys
out=sys.argv[1]; DUR=float(sys.argv[2]); cuts=[float(x) for x in sys.argv[3].split(',') if x]; END=float(sys.argv[4])
SR=48000; N=int(SR*DUR); L=[0.0]*N; R=[0.0]*N; random.seed(3)
def add(t0,g,d,gain=1,pan=0):
    s0=int(t0*SR)
    for i in range(int(d*SR)):
        j=s0+i
        if j>=N or j<0: continue
        v=g(i/SR)*gain; L[j]+=v*(1-pan)*.7; R[j]+=v*(1+pan)*.7
def drone(t):
    env=min(1,t/1.5)*min(1,max(0,(DUR-.1-t)/2.5))
    return env*(.85+.15*math.sin(2*math.pi*.25*t))*(.5*math.sin(2*math.pi*55*t)+.3*math.sin(2*math.pi*82.41*t+1)+.15*math.sin(2*math.pi*110*t+2))
add(0,drone,DUR,.2)
def kick(t,f0=110,f1=42,d=7): return math.exp(-t*d)*math.sin(2*math.pi*(f1+(f0-f1)*math.exp(-t*30))*t)
lp=[0.0]
def nlp(a):
    lp[0]+=a*((random.random()*2-1)-lp[0]); return lp[0]
for k,c in enumerate(cuts): add(c,lambda t:kick(t,110,44,6),.8,.6); add(c,lambda t:math.exp(-t*90)*(random.random()*2-1),.06,.2,.3 if k%2 else -.3)
add(END-1.0,lambda t:(t**2.2)*(random.random()*2-1),1.0,.3)
add(END,lambda t:kick(t,140,36,3.2)+.35*math.exp(-t*6)*nlp(.08),3.5,1.0)
add(END+.3,lambda t:math.exp(-t*.9)*(.5*math.sin(2*math.pi*440*t)+.3*math.sin(2*math.pi*659.3*t))*min(1,t/.3),3.5,.08)
pk=max(max(map(abs,L)),max(map(abs,R))); g=.89/pk
w=wave.open(out,'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); fr=bytearray()
for a,b in zip(L,R): fr+=struct.pack('<hh',int(math.tanh(a*g*1.2)/math.tanh(1.2)*32000),int(math.tanh(b*g*1.2)/math.tanh(1.2)*32000))
w.writeframes(bytes(fr)); w.close()
