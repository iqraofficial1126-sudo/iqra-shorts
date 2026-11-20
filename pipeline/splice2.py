# Multi-source splice: replace [c0,c1] in the main take with a sequence of pieces (file,t0,t1) or silences (None,dur).
import subprocess,sys,json,numpy as np
SR=44100
def load(f): return np.frombuffer(subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','1','-ar',str(SR),'-f','f32le','-'],capture_output=True).stdout,dtype=np.float32).copy()
src,dst,plan=sys.argv[1],sys.argv[2],json.load(open(sys.argv[3]))
x=load(src);cache={src:x}
def get(f):
    if f not in cache: cache[f]=load(f)
    return cache[f]
def snap(y,t,w=0.03):
    a,b=int((t-w)*SR),int((t+w)*SR);win=int(0.006*SR);best=t;bv=1e9
    for i in range(max(0,a),b-win,int(0.001*SR)):
        e=float(np.mean(y[i:i+win]**2))
        if e<bv:bv=e;best=(i+win/2)/SR
    return best
def fade(s,n=int(0.006*SR)):
    s=s.copy();n=min(n,len(s)//2);r=np.linspace(0,1,n);s[:n]*=r;s[-n:]*=r[::-1];return s
rms=lambda s: float(np.sqrt(np.mean(s**2))+1e-9)
out=[];cur=0.0
for c0,c1,pieces in sorted(plan,key=lambda p:p[0]):
    c0,c1=snap(x,c0),snap(x,c1)
    ref=rms(x[int((c0-1.0)*SR):int(c0*SR)])
    out.append(x[int(cur*SR):int(c0*SR)])
    for p in pieces:
        if p[0] is None: out.append(np.zeros(int(p[1]*SR),dtype=np.float32));continue
        y=get(p[0]);t0,t1=snap(y,p[1]),snap(y,p[2]);seg=y[int(t0*SR):int(t1*SR)]
        if p[0]!=src: seg=seg*min(2.0,ref/rms(y[int((t0-1.0)*SR):int(t0*SR)]))
        out.append(fade(seg))
    cur=c1;print(f'cut {c0:.3f}-{c1:.3f}')
out.append(x[int(cur*SR):]);y=np.concatenate(out)
subprocess.run(['ffmpeg','-loglevel','error','-y','-f','f32le','-ar',str(SR),'-ac','1','-i','-','-c:a','libmp3lame','-q:a','2',dst],input=y.astype(np.float32).tobytes(),check=True)
print('dur',len(y)/SR)
