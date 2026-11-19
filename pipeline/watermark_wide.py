# Adds the blinking IQRA watermark (logo as the Q) to a finished Short.
# The mark sits still in one spot, fades out, then fades back in at a different side. It never travels across the screen.
# usage: python3 watermark.py in.mp4 out.mp4
import sys,subprocess
src,dst=sys.argv[1],sys.argv[2]
W,H,w,h,m=1920,1080,178,64,40
P=[(m,1000-h),(W-w-m,124),(m,240),(W-w-m,1000-h)]  # corners, clear of the board header and text
SLOT,FADE,ALPHA=5.0,0.35,0.42
def pick(idx,i):
    e=str(P[-1][i])
    for k in range(len(P)-2,-1,-1): e=f"if(eq({idx},{k}),{P[k][i]},{e})"
    return e
n=f"mod(floor(t/{SLOT}),{len(P)})"
u=f"(T-floor(T/{SLOT})*{SLOT})"   # time inside the slot
a=f"alpha(X,Y)*{ALPHA}*min(1,min({u}/{FADE},({SLOT}-{u})/{FADE}))"
fc=(f"[1:v]format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='{a}'[wm];"
    f"[0:v][wm]overlay=x='{pick(n,0)}':y='{pick(n,1)}':eval=frame:shortest=1[v]")
subprocess.run(['ffmpeg','-loglevel','error','-y','-i',src,'-loop','1','-framerate','30','-i','iqra_wm.png','-filter_complex',fc,'-map','[v]','-map','0:a','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-c:a','copy',dst],check=True)
