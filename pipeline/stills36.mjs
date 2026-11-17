import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p = await b.newPage({viewport:{width:1080,height:1920}});
p.on('console',m=>console.log('C:',m.text())); p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///home/claude/p3d/dam36.html');
const ts=process.argv.slice(2).map(Number);
for(const t of ts){const t0=Date.now();await p.evaluate(t=>window.renderAt(t),t);await p.screenshot({path:`d36_${t}.jpg`,type:'jpeg',quality:88});console.log(t,Date.now()-t0,'ms');}
await b.close();
