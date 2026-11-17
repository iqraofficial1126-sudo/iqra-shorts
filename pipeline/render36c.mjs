import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import { spawn } from 'child_process'; import fs from 'fs';
const A=JSON.parse(fs.readFileSync('warp36c.json'));
const warp=tau=>{for(let i=0;i<A.length-1;i++){const[s0,a0]=A[i],[s1,a1]=A[i+1];if(tau<=a1||i==A.length-2)return s0+(s1-s0)*(tau-a0)/(a1-a0)}};
const chunks=JSON.parse(process.argv[2]);
const b = await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p = await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file:///home/claude/p3d/dam36.html');
const c=await p.context().newCDPSession(p);
for(const [i,a0,a1] of chunks){const tmp=`d36c${i}.tmp.mp4`;
  const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-r','30',tmp],{stdio:['pipe','inherit','inherit']});
  for(let f=Math.round(a0*30);f<Math.round(a1*30);f++){const t=Math.min(65.99,warp(f/30));await p.evaluate(t=>window.renderAt(t),t);
    const r=await c.send('Page.captureScreenshot',{format:'jpeg',quality:92});
    if(!ff.stdin.write(Buffer.from(r.data,'base64')))await new Promise(r=>ff.stdin.once('drain',r));}
  ff.stdin.end();const code=await new Promise(r=>ff.on('close',r));if(code===0)fs.renameSync(tmp,`d36c${i}.mp4`);console.log('done',i,code)}
await b.close();
