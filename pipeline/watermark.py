# Adds the moving IQRA watermark (logo as the Q) to a finished Short.
# usage: python3 watermark.py in.mp4 out.mp4
import sys,subprocess
src,dst=sys.argv[1],sys.argv[2]
W,H,w,h,m=1080,1920,178,64,36
P=[(m,120),(W-w-m,1700),(m,980),(W-w-m,120),(m,1700),(W-w-m,980)]  # corners and mid-sides, away from the captions
SLOT,GLIDE=5.0,0.6
def pick(idx,i):  # nested if over the slot index
    e=str(P[-1][i])
    for k in range(len(P)-2,-1,-1): e=f"if(eq({idx},{k}),{P[k][i]},{e})"
    return e
n=f"mod(floor(t/{SLOT}),{len(P)})"; n1=f"mod(floor(t/{SLOT})+1,{len(P)})"
s=f"clip((t-floor(t/{SLOT})*{SLOT}-{SLOT-GLIDE})/{GLIDE},0,1)"
x=f"{pick(n,0)}+({pick(n1,0)}-{pick(n,0)})*{s}"; y=f"{pick(n,1)}+({pick(n1,1)}-{pick(n,1)})*{s}"
fc=f"[1:v]format=rgba,colorchannelmixer=aa=0.42[wm];[0:v][wm]overlay=x='{x}':y='{y}':eval=frame[v]"
subprocess.run(['ffmpeg','-loglevel','error','-y','-i',src,'-loop','1','-i','iqra_wm.png','-filter_complex',fc,'-map','[v]','-map','0:a','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-c:a','copy','-shortest',dst],check=True)
