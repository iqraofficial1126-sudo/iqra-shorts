// ===== Short #96 (SG): Map projection =====
// Script time (estimated from the narration, ~16 chars/s). When the voice arrives, warp96.json maps these times to the audio.
const PUNCH=[[0.15,.12]];
const HOOK='The Earth is <span>ROUND</span>.<br>Maps are <span>FLAT</span>. How?';
const T_END=80.5;
const CAPS=[
[6.0,12.0,'Turning the curved Earth into a flat map: that is a <b>map projection</b>.'],
[12.2,20.4,'No projection keeps <b>shape, area, distance and direction</b> all correct at once.'],
[20.7,33.8,'So each projection protects one property.'],
[34.0,40.2,'By the surface used: <b>cylinder</b>, <b>cone</b> or <b>flat plane</b>.'],
[40.3,46.7,'Mercator: true near the equator, <b>Greenland</b> looks huge near the poles.'],
[46.9,52.2,'A cone on the globe: good for <b>mid-latitude</b> countries.'],
[52.4,58.6,'A plane touching one point: used for <b>polar maps</b>.'],
[58.8,65.0,'In surveying: <b>UTM</b>, Universal Transverse Mercator.'],
];
const CAMS=[[0,0,0,150],[80.5,0,0,150]];
const DEG=Math.PI/180;
function bg(){const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#0f1f3d');gr.addColorStop(1,'#07101f');g.fillStyle=gr;g.fillRect(0,0,W,H);
 g.fillStyle='rgba(255,255,255,.5)';for(let i=0;i<70;i++){const x=(i*233)%W,y=(i*541)%H;g.fillRect(x,y,2,2)}}
// globe: orthographic, centre (cx,cy), radius r, spin = longitude shift
function globe(cx,cy,r,spin,a,opt={}){if(a<=0)return;g.save();g.globalAlpha=a;
 const gr=g.createRadialGradient(cx-r*.35,cy-r*.35,r*.1,cx,cy,r);gr.addColorStop(0,'#5fb3e8');gr.addColorStop(1,'#1d5f9e');circ(cx,cy,r,'#000');g.beginPath();g.arc(cx,cy,r,0,Math.PI*2);g.fillStyle=gr;g.fill();
 // land blobs (stylised, not real coastlines)
 g.save();g.beginPath();g.arc(cx,cy,r,0,Math.PI*2);g.clip();
 for(const[lon,lat,s]of[[20,10,.30],[80,25,.26],[-60,-15,.24],[-100,40,.28],[130,-25,.18],[-40,72,.16]]){const L=(lon+spin)*DEG,P=lat*DEG;if(Math.cos(L)*Math.cos(P)<0)continue;
  const x=cx+r*Math.cos(P)*Math.sin(L),y=cy-r*Math.sin(P);g.beginPath();g.ellipse(x,y,r*s*Math.max(.25,Math.cos(L)),r*s*.75,0,0,Math.PI*2);g.fillStyle='#7cc46a';g.fill()}
 g.lineWidth=2;g.strokeStyle='rgba(255,255,255,.45)';
 for(let lat=-60;lat<=60;lat+=30){const y=cy-r*Math.sin(lat*DEG),w=r*Math.cos(lat*DEG);g.beginPath();g.ellipse(cx,y,w,w*.12,0,0,Math.PI*2);g.stroke()}
 for(let lon=0;lon<180;lon+=30){const L=(lon+spin)*DEG;g.beginPath();g.ellipse(cx,cy,Math.abs(r*Math.sin(L)),r,0,0,Math.PI*2);g.stroke()}
 if(opt.zones){for(let z=0;z<12;z++){const L1=(z*30+spin)*DEG;if(Math.cos(L1)<0)continue;g.fillStyle=z%2?'rgba(255,176,32,.28)':'rgba(255,90,42,.28)';g.beginPath();
   for(let k=0;k<=20;k++){const P=(-80+160*k/20)*DEG;g.lineTo(cx+r*Math.cos(P)*Math.sin(L1),cy-r*Math.sin(P))}for(let k=20;k>=0;k--){const P=(-80+160*k/20)*DEG,L2=L1+12*DEG;g.lineTo(cx+r*Math.cos(P)*Math.sin(L2),cy-r*Math.sin(P))}g.fill()}}
 if(opt.band){g.fillStyle='rgba(255,194,68,.35)';g.fillRect(cx-r,cy-r*Math.sin(37*DEG),2*r,r*(Math.sin(37*DEG)-Math.sin(8*DEG)))}
 g.restore();g.lineWidth=4;g.strokeStyle='rgba(255,255,255,.8)';g.beginPath();g.arc(cx,cy,r,0,Math.PI*2);g.stroke();g.restore()}
function lbl(x,y,html,cls,a,size=40){if(a<=0)return;OV.push(`<div class="chip ${cls}" style="left:${x}px;top:${y}px;opacity:${a};transform:translate(-50%,-50%) scale(${.85+.15*a});font-size:${size}px">${html}</div>`)}
function card(x,y,w,title,sub,col,a){if(a<=0)return;OV.push(`<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;transform:translate(-50%,0) scale(${.9+.1*a});opacity:${a};padding:20px 24px;border-radius:24px;background:rgba(8,13,26,.82);border:3px solid ${col};text-align:center;color:#fff;font:800 38px/1.2 Inter">${title}<div style="font:600 30px Inter;color:${col};margin-top:8px">${sub}</div></div>`)}
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};g.clearRect(0,0,W,H);bg();
 const CX=540,CY=860;
 // A: globe and a flat sheet
 const ga=sm(0,.6,t)*(1-sm(7.0,7.6,t));globe(CX,CY,250,t*25,ga);
 const sa=sm(3.0,3.6,t)*(1-sm(7.0,7.6,t));if(sa>0){g.save();g.globalAlpha=sa;rr(CX-300,CY+330,600,170,10);g.fillStyle='#efe6c8';g.fill();g.restore();lbl(CX,CY+415,'flat map ?','am',sa)}
 // B: the orange peel: gores laid flat leave gaps (tears) or must stretch
 const pb=sm(7.3,8.2,t)*(1-sm(20.2,20.7,t));if(pb>0){const n=8,gw=110,gh=480,x0=CX-n*gw/2,y0=CY-gh/2;const st=sm(14.5,16.5,t);
  for(let i=0;i<n;i++){const xm=x0+gw*(i+.5);g.save();g.globalAlpha=pb;g.beginPath();g.moveTo(xm,y0);
   g.quadraticCurveTo(xm+gw/2+st*gw*.5,y0+gh*(.5-st*.5),xm+gw/2,y0+gh/2);g.quadraticCurveTo(xm+gw/2+st*gw*.5,y0+gh*(.5+st*.5),xm,y0+gh);
   g.quadraticCurveTo(xm-gw/2-st*gw*.5,y0+gh*(.5+st*.5),xm-gw/2,y0+gh/2);g.quadraticCurveTo(xm-gw/2-st*gw*.5,y0+gh*(.5-st*.5),xm,y0);
   g.fillStyle=i%2?'#ff9a3c':'#ffb054';g.fill();g.lineWidth=3;g.strokeStyle='#c4621a';g.stroke();g.restore()}
  lbl(CX,y0-50,'gaps = tears','am',sm(9.5,10.1,t)*(1-sm(14.3,14.7,t))*pb);lbl(CX,y0-50,'filled in = stretched','te',sm(15.5,16.1,t)*pb);
  const ch=['shape','area','distance','direction'];ch.forEach((s,i)=>lbl(150+i*260,y0+gh+90,s+' ✗','wh',sm(13.0+i*.5,13.5+i*.5,t)*pb,34))}
 // C: each projection protects one property
 const pc=sm(20.7,21.3,t)*(1-sm(33.6,34.0,t));if(pc>0){globe(CX,640,180,t*20,pc);
  card(CX,900,820,'Conformal','keeps shape ✓','#3df0d8',sm(25.4,26.0,t)*pc);card(CX,1060,820,'Equal area','keeps area ✓','#ffc244',sm(28.1,28.7,t)*pc);card(CX,1220,820,'Equidistant','keeps distance ✓','#ff8a6a',sm(30.9,31.5,t)*pc)}
 // D1: cylinder → Mercator grid
 const d1=sm(36.2,36.8,t)*(1-sm(46.5,46.9,t));if(d1>0){globe(300,700,150,t*20,d1);g.save();g.globalAlpha=d1;g.setLineDash([12,8]);g.lineWidth=4;g.strokeStyle='#ffc244';g.strokeRect(150,450,300,500);g.restore();
  lbl(300,410,'cylinder','am',d1);const u=sm(38.0,40.0,t)*d1;if(u>0){const x0=560,w=440,yc=700;g.save();g.globalAlpha=u;g.fillStyle='rgba(29,95,158,.85)';g.fillRect(x0,yc-300,w,600);g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=2;
   for(let i=0;i<=8;i++){const x=x0+w*i/8;line([[x,yc-300],[x,yc+300]],2,'rgba(255,255,255,.55)')}
   for(const lat of[-75,-60,-45,-30,-15,0,15,30,45,60,75]){const yM=Math.log(Math.tan(Math.PI/4+lat*DEG/2))/Math.log(Math.tan(Math.PI/4+80*DEG/2));line([[x0,yc-300*yM],[x0+w,yc-300*yM]],lat===0?4:2,lat===0?'#ffc244':'rgba(255,255,255,.55)')}
   const gl=sm(42.3,44.0,t);const s0=26,yG=yc-300*Math.log(Math.tan(Math.PI/4+72*DEG/2))/Math.log(Math.tan(Math.PI/4+80*DEG/2));
   circ(x0+120,yc,s0,'#7cc46a');circ(x0+300,yG,s0*(1+gl*(1/Math.cos(72*DEG)-1)*.55),'#7cc46a');g.restore();
   lbl(x0+w/2,yc+350,'Mercator','am',u);lbl(x0+120,yc+70,'at the equator','wh',sm(42.3,42.9,t)*u,28);lbl(x0+300,yG+120,'Greenland: looks huge','am',sm(43.0,43.6,t)*u,28)}}
 // D2: cone → fan
 const d2=sm(46.9,47.5,t)*(1-sm(52.2,52.6,t));if(d2>0){globe(300,780,150,t*20,d2);g.save();g.globalAlpha=d2;g.setLineDash([12,8]);g.lineWidth=4;g.strokeStyle='#ffc244';g.beginPath();g.moveTo(300,480);g.lineTo(120,790);g.lineTo(480,790);g.closePath();g.stroke();g.restore();lbl(300,440,'cone','am',d2);
  const u=sm(48.5,50.0,t)*d2;if(u>0){const ax=740,ay=470;g.save();g.globalAlpha=u;g.beginPath();g.arc(ax,ay,480,(90-34)*DEG,(90+34)*DEG);g.arc(ax,ay,170,(90+34)*DEG,(90-34)*DEG,true);g.closePath();g.fillStyle='rgba(29,95,158,.85)';g.fill();
   for(const rad of[240,310,380,450])g.beginPath(),g.arc(ax,ay,rad,(90-34)*DEG,(90+34)*DEG),g.lineWidth=2,g.strokeStyle='rgba(255,255,255,.55)',g.stroke();
   for(let k=-3;k<=3;k++){const a=(90+k*11)*DEG;line([[ax+170*Math.cos(a),ay+170*Math.sin(a)],[ax+480*Math.cos(a),ay+480*Math.sin(a)]],2,'rgba(255,255,255,.55)')}g.restore();
   lbl(ax,ay+540,'mid-latitude countries','te',sm(50.3,50.9,t)*u,34)}}
 // D3: plane → azimuthal disc
 const d3=sm(52.4,53.0,t)*(1-sm(58.4,58.8,t));if(d3>0){globe(300,820,150,t*20,d3);line([[150,668],[450,668]],6,'#ffc244');circ(300,670,10,'#ffc244');lbl(300,620,'plane touches one point','am',d3,30);
  const u=sm(54.0,55.6,t)*d3;if(u>0){const cx=780,cy=820;g.save();g.globalAlpha=u;circ(cx,cy,230,'rgba(29,95,158,.85)');for(const rad of[60,120,180,230]){g.beginPath();g.arc(cx,cy,rad,0,Math.PI*2);g.lineWidth=2;g.strokeStyle='rgba(255,255,255,.55)';g.stroke()}
   for(let k=0;k<12;k++){const a=k*30*DEG;line([[cx,cy],[cx+230*Math.cos(a),cy+230*Math.sin(a)]],2,'rgba(255,255,255,.55)')}circ(cx,cy,9,'#ffc244');g.restore();lbl(cx,cy+290,'polar maps','te',sm(56.7,57.3,t)*u,34)}}
 // E: UTM
 const e1=sm(58.8,59.4,t)*(1-sm(64.8,65.2,t));if(e1>0){globe(CX,820,260,t*12,e1,{zones:true});lbl(CX,500,'UTM · Universal Transverse Mercator','am',e1,36);lbl(CX,1140,'zones 6° wide, 60 around the Earth','wh',sm(60.5,61.1,t)*e1,32);lbl(CX,1220,'GPS · Survey of India Open Series Maps','te',sm(63.5,64.1,t)*e1,32)}
 // F: your turn
 if(t>65.0&&t<73.8){const a=sm(65.0,65.5,t)*(1-sm(73.4,73.8,t));globe(CX,900,250,80,a,{band:true});lbl(CX+330,900-250*Math.sin(22*DEG),'India<br><small>8° N – 37° N</small>','am',a*sm(66.0,66.6,t),32);
  ['cylindrical ?','conical ?','azimuthal ?'].forEach((s,i)=>lbl(200+i*340,1240,s,'wh',a*sm(68+i*.5,68.5+i*.5,t),34));
  OV.push(`<div id="q" style="top:330px;opacity:${a}">Best projection<br>for <span>India</span>?</div>`)}
 OV.unshift(`<div id="top" style="opacity:${t<73.6?1:0}"><span>MAP PROJECTION</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,6.0,'THE IDEA');sticker(t,34.0,'THE TYPES');sticker(t,58.8,'REAL LIFE');sticker(t,65.0,'YOUR TURN');
 wipe(t,34.0);wipe(t,58.8);wipe(t,65.0);
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 const e=sm(73.6,74.4,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)">
  <img src="wm/iqra_big.png" style="width:560px">
  <div class="cta" style="margin-top:20px;font-size:64px"><span>Engineering Guide</span><br>Surveying</div>
  <div style="margin-top:60px;padding:22px 44px;border-radius:56px;background:#FF5A2A;color:#fff;font:800 52px/1.25 Inter;text-align:center;opacity:${sm(74.4,75.0,t)}">Like &amp; Subscribe<br><span style="font-weight:600;font-size:38px">for more Engineering Guide videos</span></div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
window.renderAt=render;
