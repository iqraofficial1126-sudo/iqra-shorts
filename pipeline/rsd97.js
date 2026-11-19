// ===== Short #97 (SG): Data types in remote sensing: raster and vector =====
// Script time (estimated from the narration, ~16 chars/s). When the voice arrives, warp97.json maps these times to the audio.
const PUNCH=[[0.15,.12]];
const HOOK='How does a computer <span>STORE</span><br>a satellite image?';
const T_END=73.0;
const CAPS=[
[4.8,9.0,'Remote sensing and GIS use two data types: <b>raster</b> and <i>vector</i>.'],
[9.1,18.2,'<b>Raster</b>: a grid of rows and columns. Each cell is a <b>pixel</b> with one value.'],
[18.3,28.2,'Pixel size = <b>spatial resolution</b>: a 30 m pixel holds one value for 30 m × 30 m of ground.'],
[28.4,37.6,'<i>Vector</i>: <i>points</i>, <i>lines</i> and <i>polygons</i>.'],
[37.8,41.3,'Each feature has coordinates and an <i>attribute table</i>.'],
[41.5,45.7,'<b>Raster</b> suits continuous data: land cover, elevation.'],
[45.9,54.0,'<i>Vector</i> suits sharp boundaries, small files, and stays sharp when you zoom.'],
[54.2,62.3,'Satellite image → land use raster → vector polygons → town planning maps.'],
];
const CAMS=[[0,0,0,150],[73,0,0,150]];
function bg(){const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#13233f');gr.addColorStop(1,'#0a1426');g.fillStyle=gr;g.fillRect(0,0,W,H)}
function lbl(x,y,html,cls,a,size=40){if(a<=0)return;OV.push(`<div class="chip ${cls}" style="left:${x}px;top:${y}px;opacity:${a};transform:translate(-50%,-50%) scale(${.85+.15*a});font-size:${size}px">${html}</div>`)}
// a small "land" scene used by both data types: river, lake, road, town, fields
const N=14;
function cls(i,j){const x=(i+.5)/N,y=(j+.5)/N;
 const river=Math.abs(y-(.25+.5*x+.08*Math.sin(x*9)))<.055;const lake=(x-.75)**2+(y-.28)**2<.018;const town=x<.38&&y>.62;const road=Math.abs(x-.5)<.035;
 return lake||river?0:road?3:town?2:(i+j*3)%5===0?4:1}
const COL=['#2f7fd0','#5cb85c','#9aa3ad','#e7d7a8','#3e9a4a'];
function raster(x0,y0,s,a,zoom=1,hi=-1){if(a<=0)return;g.save();g.globalAlpha=a;const c=s/N;
 g.beginPath();g.rect(x0,y0,s,s);g.clip();
 for(let i=0;i<N;i++)for(let j=0;j<N;j++){const cx=x0+s/2+(i*c-s/2)*zoom,cy=y0+s/2+(j*c-s/2)*zoom;g.fillStyle=COL[cls(i,j)];g.fillRect(cx,cy,c*zoom+1,c*zoom+1)}
 g.lineWidth=1;g.strokeStyle='rgba(0,0,0,.25)';for(let k=0;k<=N;k++){const p=x0+s/2+(k*c-s/2)*zoom;line([[p,y0],[p,y0+s]],1,'rgba(0,0,0,.25)');const q=y0+s/2+(k*c-s/2)*zoom;line([[x0,q],[x0+s,q]],1,'rgba(0,0,0,.25)')}
 if(hi>=0){const i=hi%N,j=Math.floor(hi/N);g.lineWidth=6;g.strokeStyle='#ffc244';g.strokeRect(x0+i*c,y0+j*c,c,c)}g.restore();
 g.save();g.globalAlpha=a;g.lineWidth=4;g.strokeStyle='rgba(255,255,255,.8)';g.strokeRect(x0,y0,s,s);g.restore()}
function vector(x0,y0,s,a,zoom=1,parts=[1,1,1]){if(a<=0)return;g.save();g.globalAlpha=a;g.beginPath();g.rect(x0,y0,s,s);g.clip();g.fillStyle='#1d2c45';g.fillRect(x0,y0,s,s);
 const P=(x,y)=>[x0+s/2+(x*s-s/2)*zoom,y0+s/2+(y*s-s/2)*zoom];
 if(parts[2]>0){g.globalAlpha=a*parts[2];g.beginPath();const c=P(.75,.28);g.ellipse(c[0],c[1],s*.134*zoom,s*.134*zoom,0,0,Math.PI*2);g.fillStyle='rgba(47,127,208,.85)';g.fill();g.lineWidth=4;g.strokeStyle='#9fd3f0';g.stroke();
  const b=[P(.05,.64),P(.36,.64),P(.36,.95),P(.05,.95)];g.beginPath();b.forEach((p,k)=>k?g.lineTo(...p):g.moveTo(...p));g.closePath();g.fillStyle='rgba(154,163,173,.35)';g.fill();g.lineWidth=4;g.strokeStyle='#ffc244';g.stroke()}
 if(parts[1]>0){g.globalAlpha=a*parts[1];const rv=[];for(let k=0;k<=30;k++){const x=k/30;rv.push(P(x,.25+.5*x+.08*Math.sin(x*9)))}line(rv,7*Math.max(1,zoom*.6),'#5fb3e8');line([P(.5,0),P(.5,1)],8*Math.max(1,zoom*.6),'#e7d7a8')}
 if(parts[0]>0){g.globalAlpha=a*parts[0];for(const[x,y]of[[.2,.3],[.62,.78],[.85,.6]]){const p=P(x,y);circ(p[0],p[1],11,'#ff5a2a');g.lineWidth=3;g.strokeStyle='#fff';g.beginPath();g.arc(p[0],p[1],11,0,Math.PI*2);g.stroke()}}
 g.restore();g.save();g.globalAlpha=a;g.lineWidth=4;g.strokeStyle='rgba(255,255,255,.8)';g.strokeRect(x0,y0,s,s);g.restore()}
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};g.clearRect(0,0,W,H);bg();
 // hook: a satellite over the ground
 const ha=1-sm(4.6,5.0,t);if(ha>0){g.save();g.globalAlpha=ha;const sx=540+180*Math.sin(t*.6),sy=640;g.fillStyle='#c9ced6';g.fillRect(sx-40,sy-25,80,50);g.fillStyle='#3d84e0';g.fillRect(sx-150,sy-18,100,36);g.fillRect(sx+50,sy-18,100,36);
  g.fillStyle='rgba(255,194,68,.18)';g.beginPath();g.moveTo(sx-20,sy+25);g.lineTo(sx-260,1150);g.lineTo(sx+260,1150);g.lineTo(sx+20,sy+25);g.fill();g.restore();raster(240,1150,600,ha*.9)}
 // the two titles
 const two=sm(4.8,5.4,t)*(1-sm(9.0,9.4,t));lbl(290,760,'RASTER','am big',two,64);lbl(790,760,'VECTOR','te big',two,64);raster(140,860,300,two);vector(640,860,300,two);
 // raster
 const ra=sm(9.1,9.8,t)*(1-sm(28.2,28.6,t));const hi=t>13.4?7*N+9:-1;const rz=1+2.2*sm(20.5,22.5,t)*(1-sm(26.5,27.8,t));
 raster(190,560,700,ra,rz,t>13.4&&t<20.5?hi:-1);
 lbl(540,520,'rows × columns = a grid of pixels','wh',sm(9.6,10.2,t)*ra*(1-sm(13.2,13.6,t)),34);
 if(t>13.4&&t<20.5){const k=Math.floor((t-13.4)/1.6)%3;const v=['reflectance = 0.42','temperature = 31 °C','elevation = 112 m'][k];lbl(540,1320,'one pixel, one value: '+v,'am',sm(13.4,14.0,t)*ra,34)}
 lbl(540,1320,'satellite images are raster','te',sm(18.3,18.9,t)*(1-sm(20.3,20.5,t))*ra,36);
 lbl(540,1320,'pixel size = spatial resolution · 30 m × 30 m → one value','am',sm(21.5,22.1,t)*ra,32);
 // vector
 const va=sm(28.4,29.0,t)*(1-sm(41.3,41.7,t));const vp=[sm(31.2,31.8,t),sm(34.1,34.7,t),sm(35.6,36.2,t)];vector(190,560,700,va,1,vp);
 lbl(540,520,'points · lines · polygons','wh',va*(1-sm(37.6,38.0,t)),36);
 lbl(330,690,'well / station: point','am',vp[0]*va*(1-sm(37.6,38,t)),28);lbl(700,1000,'road, river: lines','te',vp[1]*va*(1-sm(37.6,38,t)),28);lbl(300,1150,'plot, lake: polygons','am',vp[2]*va*(1-sm(37.6,38,t)),28);
 const ta=sm(37.8,38.4,t)*va;if(ta>0)OV.push(`<div style="position:absolute;left:140px;top:300px;width:800px;opacity:${ta};font:600 30px/1.5 Inter;color:#fff;background:rgba(8,13,26,.85);border:2px solid #3df0d8;border-radius:20px;padding:16px 24px">
  <div style="color:#3df0d8;font-weight:800">attribute table</div><div>lake · polygon · area, depth</div><div>road · line · name, width</div><div>well · point · x, y, depth</div></div>`);
 // compare and zoom
 const ca=sm(41.5,42.1,t)*(1-sm(54.0,54.4,t));const z=1+3*sm(49.6,52.0,t);raster(70,620,450,ca,z);vector(560,620,450,ca,z);
 lbl(295,580,'raster: continuous data','am',ca,30);lbl(785,580,'vector: sharp boundaries','te',ca,30);
 lbl(785,1120,'small file · sharp when zoomed','te',sm(46.5,47.1,t)*ca,30);lbl(295,1120,'zoom → blocky pixels','am',sm(52.1,52.7,t)*ca,30);
 // real life: image → raster → polygons → plan
 const rl=sm(54.2,54.8,t)*(1-sm(62.3,62.7,t));if(rl>0){raster(90,620,260,rl*sm(54.2,54.8,t));vector(730,620,260,rl*sm(58.9,59.5,t),1,[0,1,1]);
  lbl(220,940,'land use raster','am',rl,28);lbl(860,940,'vector polygons','te',sm(58.9,59.5,t)*rl,28);SV.push(`<text x="540" y="770" fill="#ffc244" font-size="90" font-weight="900" text-anchor="middle" opacity="${sm(58,58.6,t)*rl}">→</text>`);
  lbl(540,1100,'town planning maps','wh',sm(60.5,61.1,t)*rl,34)}
 // your turn: a DEM
 if(t>62.3&&t<66.2){const a=sm(62.3,62.8,t)*(1-sm(65.8,66.2,t));g.save();g.globalAlpha=a;g.beginPath();g.moveTo(140,1150);for(let x=0;x<=800;x+=10)g.lineTo(140+x,1150-260*Math.exp(-(((x-420)/170)**2))-80*Math.exp(-(((x-160)/90)**2)));g.lineTo(940,1150);g.closePath();
  const gr=g.createLinearGradient(0,880,0,1150);gr.addColorStop(0,'#e8e2d0');gr.addColorStop(1,'#5a8c4a');g.fillStyle=gr;g.fill();g.restore();
  lbl(540,1240,'DEM = Digital Elevation Model','wh',a,34);OV.push(`<div id="q" style="top:470px;opacity:${a}">A <span>DEM</span>:<br>raster or vector?</div>`)}
 OV.unshift(`<div id="top" style="opacity:${t<65.8?1:0}"><span>REMOTE SENSING · DATA TYPES</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,9.1,'RASTER');sticker(t,28.4,'VECTOR');sticker(t,54.2,'REAL LIFE');sticker(t,62.3,'YOUR TURN');
 wipe(t,28.4);wipe(t,41.5);wipe(t,54.2);wipe(t,62.3);
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 const e=sm(65.8,66.6,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)">
  <img src="wm/iqra_big.png" style="width:560px">
  <div class="cta" style="margin-top:20px;font-size:64px"><span>Engineering Guide</span><br>Surveying</div>
  <div style="margin-top:60px;padding:22px 44px;border-radius:56px;background:#FF5A2A;color:#fff;font:800 52px/1.25 Inter;text-align:center;opacity:${sm(66.6,67.2,t)}">Like &amp; Subscribe<br><span style="font-weight:600;font-size:38px">for more Engineering Guide videos</span></div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
window.renderAt=render;
