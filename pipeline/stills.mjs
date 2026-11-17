import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
const [page,pre,...ts]=process.argv.slice(2);
const b = await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p = await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///home/claude/p3d/'+page);
for(const t of ts.map(Number)){await p.evaluate(t=>window.renderAt(t),t);await p.screenshot({path:`${pre}_${t}.jpg`,type:'jpeg',quality:85});}
await b.close();
