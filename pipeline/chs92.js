// ===== Short #92: Your chain is 30 mm too long (Chain survey, `chs`) =====
// App defaults: nominal chain 20 m, actual 20.030 m, 7 chains (140 m), slope 3°, offset 6.5 m, scale 1:500.
const PUNCH=[[0.15,.12],[12.4,.06],[22.4,.06],[45.2,.05],[50.2,.04]];
const HOOK='Your <span>20 m</span> chain is<br><span>30 mm</span> too long.<br>How wrong is <span>140&nbsp;m</span>?';
const T_END=66;
const NOM=20, ACT=20.030, NCH=7, SLOPE=3, OFF=6.5, SCALE=500;
const LBOOK=NCH*NOM, LTRUE=LBOOK*ACT/NOM, LHOR=LTRUE*Math.cos(SLOPE*Math.PI/180), OFFMM=OFF*1000/SCALE; // computed, never typed
const SHORT=19.970;
const CAPS=[
[3.0,7.8,'Measure a straight line from <b>A</b> to <b>B</b>.'],
[8.0,12.8,'<i>Ranging</i>: wave the middle rod <b>into line</b>.'],
[13.0,18.0,'<i>Chaining</i>: one <b>arrow</b> at the end of every 20 m chain.'],
[18.0,22.2,'<b>7 chains</b> = 140 m.'],
[22.6,27.0,'A right-angle <i>offset</i> fixes the building corner.'],
[27.2,31.2,'On paper at <b>1 : 500</b>, that is <i>13 mm</i>.'],
[32.2,36.0,'But this chain is <b>30 mm too long</b>: 20.030 m.'],
[36.0,40.4,'Every “20 m” you book is really <b>20.03 m</b>.'],
[52.4,56.8,'Like a short tape, with a <b>coin</b> at every tape length.'],
[57.6,61.6,'Now the chain is <b>30 mm short</b>. What is the true length?'],
];
const CAMS=[[0,0,3.6,58],[3,0,3.8,61],[8,0,3.9,62],[13,0,3.9,62],[22,0,3.9,62],[23.6,2.4,.45,175],[31,2.4,.45,175],[32,0,3.9,62],[52,0,3.9,62],[57,0,3.9,62],[66,0,3.9,62]];
const AX=-7, BX=7; // 1 world unit = 10 m on the ground
function field(t){const gy=Y(-6),top=Y(6);const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#7cc46c');gr.addColorStop(1,'#5aa851');g.fillStyle=gr;g.fillRect(0,0,W,H);
 g.fillStyle='rgba(255,255,255,.06)';for(let i=-30;i<30;i++){const y=Y(i*.6);if(i%2)g.fillRect(0,y,W,K(.6))}
 for(const[tx,td,ts]of[[-6,4.2,1],[-2.5,5.2,.8],[1.5,4.6,1.1],[5.5,5.0,.9],[8,3.8,1],[-8.5,3.4,.9]]){const x=X(tx),y=Y(td),r=K(.7)*ts;g.fillStyle='rgba(0,0,0,.15)';g.beginPath();g.ellipse(x+10,y+4,r*.9,r*.3,0,0,7);g.fill();g.fillStyle='#6a4a30';g.fillRect(x-r*.12,y-r*1.1,r*.24,r*1.1);circ(x,y-r*1.5,r,'#3f8f47');circ(x-r*.5,y-r*1.1,r*.6,'#4c9c52');circ(x+r*.5,y-r*1.1,r*.65,'#45954c')}
 g.fillStyle='rgba(30,70,30,.18)';for(let i=0;i<70;i++){const x=X(((i*2.37)%20)-10),y=Y(((i*1.73)%14)-7);g.fillRect(x,y,10,4)}}
function rod(x,d,a=1,s=1){if(a<=0)return;const bx=X(x),by=Y(d),h=K(2.1)*s,w=K(.11);g.save();g.globalAlpha=a;
 g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(bx+6,by+2,w*1.6,w*.6,0,0,7);g.fill();
 for(let i=0;i<6;i++){g.fillStyle=i%2?'#ffffff':'#e8392b';g.fillRect(bx-w/2,by-h*(i+1)/6,w,h/6)}g.lineWidth=2;g.strokeStyle='rgba(0,0,0,.35)';g.strokeRect(bx-w/2,by-h,w,h);
 g.beginPath();g.moveTo(bx-w/2,by);g.lineTo(bx,by+8);g.lineTo(bx+w/2,by);g.fillStyle='#333';g.fill();g.restore()}
function pin(x,d,a=1){if(a<=0)return;const bx=X(x),by=Y(d),h=K(.42);g.save();g.globalAlpha=a;g.lineWidth=4;g.strokeStyle='#4a4f58';g.beginPath();g.moveTo(bx,by);g.lineTo(bx,by-h);g.stroke();
 g.beginPath();g.arc(bx,by-h-6,7,0,7);g.stroke();g.fillStyle='#ff5a2a';g.beginPath();g.moveTo(bx,by-h*.95);g.lineTo(bx+16,by-h*.82);g.lineTo(bx,by-h*.68);g.fill();g.restore()}
function chain(x0,x1,d,a=1){if(a<=0||x1<=x0)return;const A=X(x0),B=X(x1),y=Y(d);g.save();g.globalAlpha=a;g.lineWidth=5;g.strokeStyle='#5a5f69';g.beginPath();g.moveTo(A,y);g.lineTo(B,y);g.stroke();
 g.strokeStyle='#c9a34a';g.lineWidth=3;for(let x=x0;x<=x1+1e-6;x+=.2){g.beginPath();g.moveTo(X(x),y-5);g.lineTo(X(x),y+5);g.stroke()}
 circ(A,y,6,'#c9a34a');circ(B,y,6,'#c9a34a');g.restore()}
function building(){const x0=2.0,x1=3.7,d0=.65,d1=1.7,hh=.9;// footprint corner nearest the line at (2.0, 0.65)
 g.fillStyle='rgba(0,0,0,.15)';g.fillRect(X(x0)+8,Y(d1),X(x1)-X(x0),Y(d0)-Y(d1)+6);
 g.fillStyle='#e9dcc4';g.fillRect(X(x0),Y(d1)-K(hh),X(x1)-X(x0),Y(d0)-Y(d1));// top (roof plan)
 g.fillStyle='#b5523b';g.beginPath();g.moveTo(X(x0),Y(d1)-K(hh));g.lineTo(X(x1),Y(d1)-K(hh));g.lineTo(X(x1),Y(d0)-K(hh));g.lineTo(X(x0),Y(d0)-K(hh));g.closePath();g.fill();
 g.fillStyle='#f3e6cf';g.fillRect(X(x0),Y(d0)-K(hh),X(x1)-X(x0),K(hh));g.lineWidth=3;g.strokeStyle='rgba(60,40,20,.4)';g.strokeRect(X(x0),Y(d0)-K(hh),X(x1)-X(x0),K(hh));
 for(const wx of[2.3,3.1]){g.fillStyle='#9fd3f0';g.fillRect(X(wx),Y(d0)-K(hh*.75),K(.3),K(.3))}
 circ(X(x0),Y(d0),K(.05),'#ff3b2a')}
function eqPanel(t,t0,t1,lines){const pa=sm(t0,t0+.4,t)*(1-sm(t1-.4,t1,t));if(pa<=0)return;let h='';
 for(const[st,txt,cl]of lines){const k=lin(st,st+1.0,t);if(k<=0){h+='<div class="l"></div>';continue}
  const plain=txt.replace(/<[^>]+>/g,'');const n=Math.ceil(plain.length*k);let out='',cnt=0;for(let i=0;i<txt.length;i++){if(txt[i]==='<'){const j=txt.indexOf('>',i);out+=txt.slice(i,j+1);i=j;continue}if(cnt>=n)break;out+=txt[i];cnt++}
  if((out.match(/<sub>/g)||[]).length>(out.match(/<\/sub>/g)||[]).length)out+='</sub>';h+=`<div class="l ${cl}">${out}</div>`}
 OV.push(`<div id="eq" style="opacity:${pa};transform:translateY(${(1-sm(t0,t0+.5,t))*30}px)">${h}</div>`)}
function txt(s,x,y,size,col,align='center',w=800){g.font=`${w} ${size}px Inter`;g.fillStyle=col;g.textAlign=align;g.textBaseline='middle';g.fillText(s,x,y)}
// ---- the maths diagram (plain ivory page) ----
function mathPage(t){g.fillStyle='#171c2a';g.fillRect(0,0,W,H);
 const L0=120,PX=820/NOM*.9; // bar scale
 // nominal vs actual chain
 const b1=sm(32.6,33.2,t),b2=sm(33.6,34.2,t);const ex=60; // the 30 mm drawn 60 px: not to scale
 if(b1>0){g.globalAlpha=b1;rr(L0,760,760*b1,34,10);g.fillStyle='#7d8794';g.fill();txt('chain should be 20.000 m',L0,735,32,'#F4F2EE','left',700);g.globalAlpha=1}
 if(b2>0){g.globalAlpha=b2;rr(L0,850,760*b2,34,10);g.fillStyle='#d9dde3';g.fill();if(b2>.99){rr(L0+760,850,ex*sm(34.2,34.8,t),34,10);g.fillStyle='#FF5A2A';g.fill()}
  txt(`your chain is ${ACT.toFixed(3)} m`,L0,825,32,'#F4F2EE','left',700);g.globalAlpha=1;
  const xa=sm(34.6,35.2,t);if(xa>0){g.globalAlpha=xa;txt('+30 mm',L0+760+ex/2,915,30,'#FF5A2A','center',900);g.globalAlpha=1}}
 // 7 chains along the line: booked vs true end
 const r=sm(35.8,36.2,t);if(r>0){g.globalAlpha=r;const y=1060,S=760/LBOOK;g.lineWidth=6;g.strokeStyle='#F4F2EE';g.beginPath();g.moveTo(L0,y);g.lineTo(L0+760,y);g.stroke();
  for(let i=0;i<=NCH;i++){const k=sm(36.2+i*.32,36.5+i*.32,t);if(k<=0)continue;const x=L0+i*NOM*S;g.globalAlpha=r*k;g.beginPath();g.moveTo(x,y-22);g.lineTo(x,y+22);g.stroke();txt(`${i*NOM}`,x,y+50,26,'#F4F2EE','center',700)}
  g.globalAlpha=r;const tb=sm(38.8,39.3,t);if(tb>0){g.globalAlpha=tb;txt('booked: 140 m',L0+760,y-60,32,'#F4F2EE','right',800)}
  const tr=sm(39.4,40,t);if(tr>0){g.globalAlpha=tr;g.strokeStyle='#FF5A2A';g.lineWidth=8;g.beginPath();g.moveTo(L0+760,y);g.lineTo(L0+760+70,y);g.stroke();g.beginPath();g.moveTo(L0+830,y-22);g.lineTo(L0+830,y+22);g.stroke();
   txt('true end: further!',L0+830,y+95,28,'#FF5A2A','right',900)}
  g.globalAlpha=1}
 const nts=sm(34.6,35.2,t)*(1-sm(47,47.4,t));if(nts>0){g.globalAlpha=nts*.8;txt('(the extra length is drawn bigger so you can see it)',W/2,1180,26,'#9fb0cc','center',600);g.globalAlpha=1}
 // slope: horizontal = slope length × cos θ (angle drawn steeper)
 const sa=sm(47.4,48.0,t);if(sa>0){g.globalAlpha=sa;const x0=160,y0=1330,x1=900,ang=10*Math.PI/180,yy=y0-(x1-x0)*Math.tan(ang);
  g.fillStyle='rgba(124,196,108,.35)';g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,yy);g.lineTo(x1,y0+30);g.lineTo(x0,y0+30);g.fill();
  g.lineWidth=8;g.strokeStyle='#F4F2EE';g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,yy);g.stroke();
  g.setLineDash([16,12]);g.lineWidth=6;g.strokeStyle='#FF5A2A';g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y0);g.stroke();g.setLineDash([]);
  g.lineWidth=5;g.strokeStyle='#ffb020';g.beginPath();g.arc(x0,y0,120,-ang,0);g.stroke();
  txt(`${SLOPE}°`,x0+150,y0-14,32,'#c47a00','left',900);
  txt(`along the slope: ${LTRUE.toFixed(2)} m`,(x0+x1)/2-20,(y0+yy)/2-50,32,'#F4F2EE','center',800);
  txt(`horizontal: ${LHOR.toFixed(2)} m`,(x0+x1)/2,y0+55,32,'#FF8a5a','center',800);g.globalAlpha=1}}
function figS(x,d,face,o,sc=1.55){const fx=X(x),fy=Y(d);g.save();g.translate(fx,fy);g.scale(sc,sc);g.translate(-fx,-fy);figure(x,d,face,o);g.restore()}
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};
 g.clearRect(0,0,W,H);
 const page=sm(31.8,32.2,t)*(1-sm(52.0,52.4,t));
 if(t>32.1&&t<52.1){mathPage(t)}
 else{
  field(t);
  // survey line
  const la=sm(4.2,5.2,t);if(la>0){g.save();g.globalAlpha=la*.8;g.setLineDash([14,12]);g.lineWidth=4;g.strokeStyle='#ffffff';g.beginPath();g.moveTo(X(AX),Y(0));g.lineTo(X(AX+(BX-AX)*la),Y(0));g.stroke();g.restore()}
  // chained distance so far
  const ct=t-14.0, per=1.0; let n=Math.max(0,Math.min(NCH,Math.floor(ct/per))); let frac=ct<0?0:(n>=NCH?0:clamp((ct-n*per)/(per*.7)));
  if(t>22.4)n=NCH,frac=0;
  for(let i=0;i<n;i++)pin(AX+2*(i+1),0,1);
  // the chain being pulled
  if(t>13.6&&t<22.6){const xs=AX+2*n, xe=n>=NCH?xs:xs+2*frac;const ca=sm(13.6,14,t)*(1-sm(22.2,22.6,t));chain(n>=NCH?AX+2*(NCH-1):xs,n>=NCH?BX:xe,0,ca);
   const fx=n>=NCH?AX+2*(NCH-1):xs, lx=n>=NCH?BX:xe;
   figS(fx-.25,-.25,1,{shirt:C.fr,a:ca,walk:frac>0&&frac<1?t*8:undefined});figS(lx+.25,-.25,1,{shirt:C.you,a:ca,walk:frac>0&&frac<1?t*8:undefined})}
  // rods
  const ra=sm(3.2,3.8,t),rb=sm(3.7,4.3,t);rod(AX,0,ra,easeOutBack(clamp(ra)));rod(BX,0,rb,easeOutBack(clamp(rb)));
  chip([AX,-.35],'A','wh big',ra*(1-sm(22.6,23.2,t)+sm(52.4,53,t))*(1-sm(61.6,62,t)),'below');chip([BX,-.35],'B','wh big',rb*(1-sm(22.6,23.2,t)+sm(52.4,53,t))*(1-sm(61.6,62,t)),'below');
  // ranging: assistant waves the middle rod into line
  const rg=sm(8.0,8.6,t)*(1-sm(13.4,13.9,t));
  if(rg>0){const off=t<9?1.0:t<10.2?lerp(1.0,-.45,sm(9,10.2,t)):t<11.3?lerp(-.45,.18,sm(10.2,11.3,t)):lerp(.18,0,sm(11.3,12.2,t));
   g.save();g.globalAlpha=rg*.9;g.setLineDash([6,10]);g.lineWidth=3;g.strokeStyle='#ffe08a';g.beginPath();g.moveTo(X(AX-1),Y(0)-K(1.2));g.lineTo(X(BX),Y(0)-K(1.0));g.stroke();g.restore();
   figS(AX-1.0,-.05,1,{shirt:C.you,a:rg});rod(0,off,rg);figS(.45,off-.05,-1,{shirt:C.fr,a:rg});
   if(off>.05||off<-.05){const dir=off>0?-1:1;const p=proj([0,off]);OV.push(`<div class="chip am" style="left:${p[0]-150}px;top:${p[1]-K(1.5)}px;opacity:${rg}">${dir<0?'↓':'↑'} move</div>`)}
   const ok=sm(12.2,12.5,t)*rg;chip([0,-.35],'in line ✓','te big',ok,'below')}
  if(t>13.4&&t<22.6)rod(0,0,1);
  // chain counter
  const cnt=sm(14.0,14.4,t)*(1-sm(22.4,22.8,t));if(cnt>0){OV.push(`<div class="chip te big" style="left:540px;top:1250px;opacity:${cnt}">chains ${n} · ${n*NOM} m</div>`)}
  const done=sm(21.4,21.8,t)*(1-sm(22.4,22.8,t));if(done>0)OV.push(`<div class="chip am big" style="left:540px;top:1350px;opacity:${done}">${NCH} chains = ${LBOOK} m</div>`);
  // offset to the building corner
  const bA=sm(22.4,23.2,t)*(1-sm(31.6,32,t));if(bA>0){g.save();g.globalAlpha=bA;building();g.restore();
   for(let i=0;i<NCH;i++)pin(AX+2*(i+1),0,bA);
   const of=sm(24.0,25.2,t)*bA;if(of>0){g.save();g.globalAlpha=of;g.setLineDash([10,8]);g.lineWidth=5;g.strokeStyle='#ffd36b';g.beginPath();g.moveTo(X(2.0),Y(0));g.lineTo(X(2.0),Y(.65*of));g.stroke();g.setLineDash([]);
     g.lineWidth=4;g.strokeStyle='#ffffff';g.strokeRect(X(2.0),Y(.12),K(.12),K(.12));g.restore();
     chip([1.55,.32],`offset ${OFF} m`,'am',of,0)}
   const pa=sm(27.2,27.8,t)*(1-sm(31.2,31.6,t));if(pa>0)OV.push(`<div style="position:absolute;left:150px;right:150px;top:290px;padding:28px 36px;border-radius:28px;background:#fff;box-shadow:0 20px 50px rgba(0,0,0,.3);opacity:${pa};font:700 40px/1.35 Inter;color:#15171A;text-align:center">On the sheet at 1 : ${SCALE}<br><span style="color:#FF5A2A;font-weight:900">${OFF} × 1000 ÷ ${SCALE} = ${OFFMM.toFixed(0)} mm</span></div>`)}
  // real life & your turn: the line with its arrows
  if(t>52){for(let i=0;i<NCH;i++)pin(AX+2*(i+1),0,sm(52.4,52.8,t));const sh=sm(58.0,58.6,t)*(1-sm(61.6,62,t));
   if(sh>0){chip([0,-.9],`chain = ${SHORT.toFixed(3)} m`,'am big',sh,'below')}}
 }
 // ---- equations ----
 eqPanel(t,41.0,52.0,[[41.2,'L<sub>true</sub> = L × (actual ÷ nominal)',''],[42.8,`   = ${LBOOK} × ${ACT.toFixed(3)} ÷ ${NOM}`,''],[44.4,`   = ${LTRUE.toFixed(2)} m`,'hi'],[47.6,`horizontal = ${LTRUE.toFixed(2)} × cos ${SLOPE}°`,''],[49.4,`   = ${LHOR.toFixed(2)} m`,'am2']]);
 if(t>40.2&&t<41.2)OV.push(`<div id="q" style="top:430px;opacity:${sm(40.2,40.5,t)*(1-sm(40.9,41.2,t))}">True length = <span>?</span></div>`);
 if(t>57.2&&t<62){const a=sm(57.2,57.6,t)*(1-sm(61.6,62,t));OV.push(`<div id="q" style="top:500px;opacity:${a}">Chain 30 mm <span>short</span>:<br>true length = <span>?</span></div>`)}
 // ---- overlays & fx ----
 OV.unshift(`<div id="top" style="opacity:${t<62?1:0}"><span>CHAIN SURVEY</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,3.0,'THE IDEA');sticker(t,31.6,'THE MATH');sticker(t,52.2,'REAL LIFE');sticker(t,57.0,'YOUR TURN');
 wipe(t,32);wipe(t,52.2);wipe(t,57);
 if(t>=12.2&&t<12.9){const p=proj([0,0]);burst(p[0],p[1]-K(.7),12.2,t,'#3df0d8')}
 if(t>=45.2&&t<45.9)burst(330,520,45.2,t,'#3df0d8');if(t>=50.2&&t<50.9)burst(330,665,50.2,t,'#ffc244');
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 const e=sm(62,62.8,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)"><div class="phone"><div class="scr">
  <div class="hd">Engineering Guide<br>by IQRA<small>SURVEYING · LESSON</small></div>
  <div class="card"><h3>Chain survey</h3>
  <svg viewBox="0 0 400 160" width="100%"><rect x="0" y="0" width="400" height="160" rx="16" fill="#3f8a46"/><line x1="40" y1="110" x2="360" y2="110" stroke="#fff" stroke-width="4" stroke-dasharray="10 8"/>
  <rect x="34" y="40" width="12" height="70" fill="#e8392b"/><rect x="34" y="54" width="12" height="14" fill="#fff"/><rect x="34" y="82" width="12" height="14" fill="#fff"/>
  <rect x="354" y="40" width="12" height="70" fill="#e8392b"/><rect x="354" y="54" width="12" height="14" fill="#fff"/><rect x="354" y="82" width="12" height="14" fill="#fff"/>
  <g stroke="#ff5a2a" stroke-width="4"><line x1="85" y1="110" x2="85" y2="92"/><line x1="130" y1="110" x2="130" y2="92"/><line x1="175" y1="110" x2="175" y2="92"/><line x1="220" y1="110" x2="220" y2="92"/><line x1="265" y1="110" x2="265" y2="92"/><line x1="310" y1="110" x2="310" y2="92"/></g></svg>
  <div class="sl"></div><div style="font:600 22px Inter;color:#9fb0cc">Actual chain length = ${SHORT.toFixed(3)} m</div></div>
  <div class="card" style="font:700 30px/1.6 Inter;font-variant-numeric:tabular-nums"><span style="color:#fff">True length = <b style="color:#ffb020">?</b></span></div>
  </div></div><div class="cta">Try it in the<br><span>Engineering Guide<br>by IQRA</span> app</div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
window.renderAt=render;
