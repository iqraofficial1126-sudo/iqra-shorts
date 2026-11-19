import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import { spawn } from 'child_process'; import fs from 'fs';
const [i,a0,a1]=process.argv.slice(2).map(Number);
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file:///home/claude/p3d/long/ld81b.html');
const c=await p.context().newCDPSession(p);const tmp=`d_${i}.tmp.mp4`;
const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-r','30',tmp],{stdio:['pipe','inherit','inherit']});
for(let f=Math.round(a0*30);f<Math.round(a1*30);f++){await p.evaluate(t=>window.renderAt(t),f/30);
 const r=await c.send('Page.captureScreenshot',{format:'jpeg',quality:92});
 if(!ff.stdin.write(Buffer.from(r.data,'base64')))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();const code=await new Promise(r=>ff.on('close',r));if(code===0)fs.renameSync(tmp,`d_${i}.mp4`);console.log('done',i,code);await b.close();
