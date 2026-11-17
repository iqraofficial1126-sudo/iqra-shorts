import numpy as np, wave
SR=44100; D=81.6; N=int(SR*D); out=np.zeros((N,2))
rng=np.random.default_rng(1)
import json
A=json.load(open('warp76.json'))
def fwd(s):
    for k in range(len(A)-1):
        s0,a0=A[k];s1,a1=A[k+1]
        if s<=s1 or k==len(A)-2: return a0+(a1-a0)*(s-s0)/(s1-s0)
def add(t,sig,g=1,pan=0,raw=False):
    i=int((t if raw else fwd(t))*SR); s=sig[:max(0,min(len(sig),N-i))]*g
    out[i:i+len(s),0]+=s*(1-pan)*.5*2**.5/1.414; out[i:i+len(s),1]+=s*(1+pan)*.5*2**.5/1.414
def env(n,a,r): e=np.ones(n); ai=int(a*SR); e[:ai]=np.linspace(0,1,ai) if ai else 1; ri=int(r*SR); e[-ri:]*=np.linspace(1,0,ri); return e
def lp(x,k): # one-pole lowpass
    y=np.empty_like(x); acc=0
    for i,v in enumerate(x): acc+=k*(v-acc); y[i]=acc
    return y
def whoosh(d=.7,g=.25):
    n=int(d*SR); x=rng.standard_normal(n); t=np.arange(n)/n
    k=.02+.25*np.sin(np.pi*t)**2; y=np.empty(n); acc=0
    for i in range(n): acc+=k[i]*(x[i]-acc); y[i]=acc
    return y*np.sin(np.pi*t)**1.5*g*3
def thud():
    n=int(.9*SR); t=np.arange(n)/SR; f=55*np.exp(-t*3)+38
    s=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*6)
    s+=lp(rng.standard_normal(n),.08)*np.exp(-t*25)*1.5
    return s*.9
def chime(f=880,d=1.2,g=.18):
    n=int(d*SR); t=np.arange(n)/SR
    return (np.sin(2*np.pi*f*t)+.5*np.sin(2*np.pi*f*2.01*t)+.25*np.sin(2*np.pi*f*3*t))*np.exp(-t*4)*g
def tick(g=.12):
    n=int(.04*SR); t=np.arange(n)/SR; return np.sin(2*np.pi*2400*t)*np.exp(-t*160)*g
def step(g=.25):
    n=int(.12*SR); t=np.arange(n)/SR; return (lp(rng.standard_normal(n),.15)*1.5+np.sin(2*np.pi*120*t))*np.exp(-t*40)*g
def pop(g=.2):
    n=int(.15*SR); t=np.arange(n)/SR; f=600*np.exp(-t*20)+300; return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*30)*g

t=np.arange(N)/SR
chords=[[220,277.18,329.63],[196,246.94,293.66],[174.61,220,261.63],[196,246.94,293.66]]
pad=np.zeros(N)
for ci in range(int(D/4)+1):
    ch=chords[ci%4]; s0=int(ci*4*SR); n=min(int(4.6*SR),N-s0)
    if n<=0: break
    tt=np.arange(n)/SR; e=np.minimum(1,tt/1.2)*np.minimum(1,(4.6-tt)/1.2)
    for f in ch: pad[s0:s0+n]+=(np.sin(2*np.pi*f*tt)+.3*np.sin(2*np.pi*f*2*tt+1))*e*.022
out[:,0]+=pad; out[:,1]+=pad
for k in np.arange(0,80.5,0.5):
    n=int(.18*SR); tt=np.arange(n)/SR; add(k,np.sin(2*np.pi*55*tt)*np.exp(-tt*22)*(.12 if (k*2)%2==0 else .06),raw=True)
add(0.1,thud(),.8); add(0.15,whoosh(.6,.3))
for s_ in [3.0,31.6,52.2,57.0]: add(s_,whoosh(.6,.3))
for k in np.arange(4.0,4.6,.12): add(k,pop(.12))
add(8.6,thud(),.9)
add(9.7,chime(660,.6,.08)); add(9.9,chime(660,.6,.08))
add(12.6,whoosh(.8,.12)); add(13.4,whoosh(.8,.12))
add(19.6,whoosh(2,.1)); add(22.2,thud(),.5); add(24.9,thud(),.35)
add(27.9,pop(.15)); add(28.1,pop(.15))
add(36.4,pop(.18)); add(37.4,pop(.18)); add(38.4,pop(.18)); add(40.5,pop(.15))
for st in [43.8,45.2,46.2,48.6,49.8]:
    for k in np.arange(st,st+1.0,.07): add(k,tick(.05))
add(46.6,chime(1046,1.4,.2)); add(50.4,chime(880,1.2,.16)); add(58.0,whoosh(1.2,.12)); add(59.0,pop(.18)); add(62.0,chime(784,1.6,.18)); add(62.2,chime(1175,1.6,.12))
fade=np.ones(N); fi=int(1.5*SR); fade[-fi:]=np.linspace(1,0,fi); out*=fade[:,None]
out/=max(1,np.abs(out).max()/0.85)
w=wave.open('sfx76.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype('<i2').tobytes()); w.close()
