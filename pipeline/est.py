import sys,re,subprocess
mp3,txt=sys.argv[1],sys.argv[2]
dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',mp3],capture_output=True,text=True).stdout)
o=subprocess.run(['ffmpeg','-hide_banner','-i',mp3,'-af','silencedetect=noise=-38dB:d=0.18','-f','null','-'],capture_output=True,text=True).stderr
ends=[float(x) for x in re.findall(r'silence_end: ([0-9.]+)',o)];starts=[float(x) for x in re.findall(r'silence_start: ([0-9.]+)',o)]
pauses=list(zip(starts,ends))
s=open(txt).read().strip();clean=re.sub(r'\[[a-z]+\]\s*','',s)
# sentence pieces
pieces=re.split(r'(?<=[.?,])\s+',clean)
tot=sum(len(p) for p in pieces);t0=pauses[0][1] if pauses and pauses[0][0]<0.05 else 0;t1=pauses[-1][0] if pauses and pauses[-1][1]>dur-0.05 else dur
c=0
for p in pieces:
    est=t0+(t1-t0)*c/tot
    near=min(pauses,key=lambda q:abs(q[1]-est)) if pauses else (0,est)
    print(f'{est:6.2f} ~{near[1]:6.2f}  {p[:70]}')
    c+=len(p)
print('dur',dur,'pauses',' '.join(f'{b:.2f}' for a,b in pauses if b-a>0.3))
