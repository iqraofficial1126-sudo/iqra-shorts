import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});const p=await b.newPage({viewport:{width:1920,height:1080}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file:///home/claude/p3d/long/te99b.html');
for(const t of process.argv.slice(2)){await p.evaluate(t=>window.renderAt(+t),t);await p.screenshot({path:`st99/s_${t}.jpg`,type:'jpeg',quality:80})}
console.log('errors:',errs.length?errs:'none');await b.close();
