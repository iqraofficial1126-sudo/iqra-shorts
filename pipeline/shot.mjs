import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});const p=await b.newPage({viewport:{width:600,height:200},deviceScaleFactor:1});
await p.goto('file:///home/claude/p3d/wm/wm.html');const el=await p.$('#m');await el.screenshot({path:'iqra_wm.png',omitBackground:true});await b.close();
