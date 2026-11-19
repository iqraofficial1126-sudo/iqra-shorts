# Replace words in a voice take with the same voice's words from elsewhere in the take.
# Boundaries snap to the quietest 10 ms inside +-60 ms, so cuts land in the gaps between words.
import subprocess,sys,json,numpy as np
src,dst,plan=sys.argv[1],sys.argv[2],json.loads(sys.argv[3])
SR=44100
raw=subprocess.run(['ffmpeg','-loglevel','error','-i',src,'-ac','1','-ar',str(SR),'-f','f32le','-'],capture_output=True).stdout
x=np.frombuffer(raw,dtype=np.float32).copy()
def snap(t,w=0.06):
    a,b=int((t-w)*SR),int((t+w)*SR);win=int(0.01*SR);best=t;bv=1e9
    for i in range(a,b-win,int(0.002*SR)):
        e=float(np.mean(x[i:i+win]**2))
        if e<bv:bv=e;best=(i+win/2)/SR
    return best
def fade(s,n=int(0.008*SR)):
    s=s.copy();r=np.linspace(0,1,n);s[:n]*=r;s[-n:]*=r[::-1];return s
out=[];cur=0.0
for (c0,c1),(s0,s1) in sorted(((tuple(p[0]),tuple(p[1])) for p in plan)):
    c0,c1,s0,s1=snap(c0),snap(c1),snap(s0),snap(s1)
    out.append(x[int(cur*SR):int(c0*SR)]);out.append(fade(x[int(s0*SR):int(s1*SR)]));cur=c1
    print(f'cut {c0:.3f}-{c1:.3f} ({c1-c0:.3f}s)  <- {s0:.3f}-{s1:.3f} ({s1-s0:.3f}s)')
out.append(x[int(cur*SR):]);y=np.concatenate(out)
subprocess.run(['ffmpeg','-loglevel','error','-y','-f','f32le','-ar',str(SR),'-ac','1','-i','-','-c:a','libmp3lame','-q:a','2',dst],input=y.astype(np.float32).tobytes(),check=True)
print('dur',len(y)/SR)
