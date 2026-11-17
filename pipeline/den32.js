// ===== Short #32: Same bucket, mercury (Density & weight, `den`) =====
// App defaults: water, rho = 1000 kg/m3, V = 1 m3, g = 9.81. Mercury S = 13.6. Bucket 10 L for the hook.
const PUNCH=[[0.15,.12],[7.4,.06],[17.4,.06],[37.6,.05],[44.6,.04]];
const HOOK='Same bucket.<br>Fill it with <span>MERCURY</span>…<br>and you can’t lift it!';
const T_END=66;
const G=9.81, RHOW=1000, S_HG=13.6, VB=0.010, S_OIL=0.8; // bucket 10 L
const RHOHG=S_HG*RHOW, MW=RHOW*VB, MHG=RHOHG*VB, W1=RHOW*1*G/1000, SPW=RHOW*G/1000; // computed, never typed
const CAPS=[
[3.0,6.0,'10 litres of <i>water</i>: <b>10 kg</b>. Easy.'],
[6.0,9.0,'10 litres of <b>mercury</b>: <b>136 kg</b>!'],
[9.2,15.0,'<i>Density</i> ρ = how much mass fits in <b>1 m³</b>.'],
[15.2,22.0,'Mercury’s atoms are much <b>heavier</b>…'],
[22.0,31.0,'…so the same space holds <b>13.6 ×</b> the mass.'],
[52.4,56.8,'Same pressure: the water column must be <b>13.6 ×</b> taller.'],
[57.6,61.6,'An oil with S = <b>0.8</b>. What is its specific weight?'],
];
const CAMS=[[0,.15,1.3,300],[3,.15,1.3,300],[8.6,.25,1.3,290],[9.6,7,1.9,210],[10.4,7,1.9,210],[31,7,1.9,210],[33,7,2.2,210],[33.8,7,2.2,210],[51,7,2.2,210],[52.6,14,2.6,150],[53.4,14,2.6,150],[56.6,14,2.6,150],[57.4,.3,1.3,300],[58.2,.3,1.3,300],[66,.3,1.3,300]];
const WATER='#4aa3d6',HG1='#d9dde3',HG2='#8a929c',OIL='#e0b23c';
function bucket(x,y,fill,a=1,shake=0,label=''){if(a<=0)return;const s=.42,w0=.34,w1=.26;g.save();g.globalAlpha=a;g.translate(K(shake),0);
 const P=(dx,dy)=>[X(x+dx),Y(y+dy)];g.beginPath();g.moveTo(...P(-w0/2,s));g.lineTo(...P(w0/2,s));g.lineTo(...P(w1/2,0));g.lineTo(...P(-w1/2,0));g.closePath();g.fillStyle='#c8ced6';g.fill();g.lineWidth=4;g.strokeStyle='#5d6b7a';g.stroke();
 g.beginPath();g.moveTo(...P(-w0/2*.92,s*.86));g.lineTo(...P(w0/2*.92,s*.86));g.lineTo(...P(w1/2*.95,.04));g.lineTo(...P(-w1/2*.95,.04));g.closePath();
 if(fill==='hg'){const gr=g.createLinearGradient(X(x-.15),0,X(x+.15),0);gr.addColorStop(0,HG2);gr.addColorStop(.5,'#f4f6f8');gr.addColorStop(1,HG2);g.fillStyle=gr}else g.fillStyle=fill;g.fill();
 g.beginPath();g.ellipse(X(x),Y(y+s*.86),K(w0/2*.92),K(.03),0,0,7);g.fillStyle='rgba(255,255,255,.5)';g.fill();
 g.beginPath();g.moveTo(...P(-w0/2,s));g.quadraticCurveTo(X(x),Y(y+s+.28),...P(w0/2,s));g.lineWidth=5;g.strokeStyle='#4a4f58';g.stroke();g.restore()}
function cube(x,y,sz,kind,a=1,t=0){if(a<=0)return;g.save();g.globalAlpha=a;const d=sz*.32;// front + top + side (oblique)
 const f=kind==='hg'?'#c9cfd6':'#9fd3f0';const tp=kind==='hg'?'#e6eaee':'#c6e6f8';const sd=kind==='hg'?'#9aa2ac':'#6fb7e0';
 g.fillStyle=f;g.fillRect(X(x),Y(y+sz),K(sz),K(sz));
 g.beginPath();g.moveTo(X(x),Y(y+sz));g.lineTo(X(x+d),Y(y+sz+d));g.lineTo(X(x+sz+d),Y(y+sz+d));g.lineTo(X(x+sz),Y(y+sz));g.closePath();g.fillStyle=tp;g.fill();
 g.beginPath();g.moveTo(X(x+sz),Y(y+sz));g.lineTo(X(x+sz+d),Y(y+sz+d));g.lineTo(X(x+sz+d),Y(y+d));g.lineTo(X(x+sz),Y(y));g.closePath();g.fillStyle=sd;g.fill();
 g.lineWidth=3;g.strokeStyle='rgba(30,40,60,.5)';g.strokeRect(X(x),Y(y+sz),K(sz),K(sz));
 // particles: same count, mercury atoms bigger and heavier-looking
 const n=5,r=kind==='hg'?.075:.045;for(let i=0;i<n;i++)for(let j=0;j<n;j++){const px=x+(i+.5)*sz/n+Math.sin(t*3+i*1.7+j)*.012,py=y+(j+.5)*sz/n+Math.cos(t*2.6+j*2.1+i)*.012;
  if(kind==='hg'){const gr=g.createRadialGradient(X(px-r*.3),Y(py+r*.3),1,X(px),Y(py),K(r));gr.addColorStop(0,'#ffffff');gr.addColorStop(1,'#59616c');g.fillStyle=gr;g.beginPath();g.arc(X(px),Y(py),K(r),0,7);g.fill()}
  else circ(X(px),Y(py),K(r),'rgba(30,110,180,.75)')}
 g.restore()}
function eqPanel(t,t0,t1,lines){const pa=sm(t0,t0+.4,t)*(1-sm(t1-.4,t1,t));if(pa<=0)return;let h='';
 for(const[st,txt,cl]of lines){const k=lin(st,st+1.0,t);if(k<=0){h+='<div class="l"></div>';continue}
  const plain=txt.replace(/<[^>]+>/g,'');const n=Math.ceil(plain.length*k);let out='',cnt=0;for(let i=0;i<txt.length;i++){if(txt[i]==='<'){const j=txt.indexOf('>',i);out+=txt.slice(i,j+1);i=j;continue}if(cnt>=n)break;out+=txt[i];cnt++}
  if((out.match(/<sub>/g)||[]).length>(out.match(/<\/sub>/g)||[]).length)out+='</sub>';h+=`<div class="l ${cl}">${out}</div>`}
 OV.push(`<div id="eq" style="opacity:${pa};transform:translateY(${(1-sm(t0,t0+.5,t))*30}px);font-size:48px">${h}</div>`)}
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};
 g.clearRect(0,0,W,H);background(t);
 // ---- hook & idea: the two buckets ----
 if(t<9.6){
  const lift=sm(3.4,4.2,t)*(1-sm(5.2,5.8,t));const wx=-.3+lerp(0,0,0),hx=.95;
  const walk=sm(6.0,6.8,t);const fx=lerp(-.75,.5,walk);
  const tryA=sm(6.8,7.2,t)*(1-sm(8.8,9.2,t));const shake=tryA*Math.sin(t*40)*.006;
  bucket(wx,lift*.62,WATER,1);bucket(hx,0,'hg',1,shake);
  const hands=walk<.99?[[wx-.12,.36+lift*.62+.18],[wx+.1,.36+lift*.62+.18]]:[[hx-.12,.58],[hx+.1,.58]];
  figure(fx,0,1,{shirt:C.you,hands:t>2.9&&t<9.2?hands:undefined,lean:tryA*.6,walk:walk>0&&walk<1?t*8:undefined});
  if(tryA>0){for(let i=0;i<3;i++){const u=((t*1.5+i/3)%1);circ(X(fx+.25+i*.06),Y(1.75-u*.4),K(.025),`rgba(120,190,255,${1-u})`)}chip([hx+.25,1.25],'!!','am big',tryA,0)}
  chip([wx,.95+lift*.62],`10 L water = <b>${MW.toFixed(0)} kg</b>`,'te',sm(3.6,4.1,t)*(1-sm(5.8,6.2,t)),0);
  chip([hx,.95],`10 L mercury = <b>${MHG.toFixed(0)} kg</b>`,'am',sm(7.4,7.9,t)*(1-sm(8.8,9.2,t)),0);
   }
 if(t>57.2){const oa=sm(57.4,58.0,t);figure(-.5,0,1,{shirt:C.you,a:oa});bucket(.35,0,OIL,oa);chip([.35,.95],`oil: S = ${S_OIL}`,'am big',oa*(1-sm(61.6,62,t)),0)}
 // ---- density: cubes and a balance ----
 if(t>9.4&&t<52.8){
  const ca=sm(9.6,10.2,t)*(1-sm(52.2,52.8,t));
  if(t<31.6){const tilt=sm(17.2,18.6,t)*.2;const px=7,py=1.25,L=1.55;// balance
   g.save();g.globalAlpha=ca;line([[X(px),Y(0)],[X(px),Y(py)]],K(.08),'#5d6b7a');
   const lx=px-L*Math.cos(tilt),ly=py-L*Math.sin(tilt)*-1,rx=px+L*Math.cos(tilt),ry=py-L*Math.sin(tilt);
   line([[X(lx),Y(ly)],[X(rx),Y(ry)]],K(.07),'#2b303c');circ(X(px),Y(py),K(.08),'#2b303c');
   for(const[x,y]of[[lx,ly],[rx,ry]]){line([[X(x),Y(y)],[X(x),Y(y-.35)]],K(.02),'#2b303c');line([[X(x-.6),Y(y-.35)],[X(x+.6),Y(y-.35)]],K(.06),'#5d6b7a')}
   g.restore();
   cube(lx-.5,ly-.33,1.0,'w',ca,t);const hgA=sm(15.4,16.2,t)*ca;cube(rx-.5,ry-.33,1.0,'hg',hgA,t);
   chip([lx+.3,ly+1.2],`1 m³ water: <b>${(RHOW).toFixed(0)} kg</b>`,'te',sm(11.0,11.6,t)*ca,0);
   chip([rx-.35,ry+1.2],`1 m³ mercury: <b>${(RHOHG).toFixed(0)} kg</b>`,'am',sm(18.2,18.8,t)*ca,0);
   chip([7,3.1],'ρ = m ÷ V','wh big',sm(12.6,13.2,t)*(1-sm(21.6,22.2,t)),0);
   const xa=sm(23.0,23.6,t)*(1-sm(31,31.6,t));chip([7,3.1],`${RHOHG.toFixed(0)} ÷ ${RHOW} = <b>${(RHOHG/RHOW).toFixed(1)} ×</b>`,'am big',xa,0)}
  else{// the maths: 1 m3 of water on a weighing scale
   const sa=sm(32.2,32.8,t)*(1-sm(51.8,52.4,t));g.save();g.globalAlpha=sa;rr(X(6.1),Y(.18),K(1.8),K(.18),8);g.fillStyle='#3a4250';g.fill();
   rr(X(6.55),Y(.14),K(.9),K(.1),4);g.fillStyle='#0c1a12';g.fill();g.restore();cube(6.5,.18,1.0,'w',sa,t);
   const wv=sm(40.4,41.0,t);OV.push(`<div class="chip te" style="left:${X(7)}px;top:${Y(.09)}px;transform:translate(-50%,-50%);font-size:30px;padding:4px 12px;opacity:${sa}">${wv>0?(W1*wv).toFixed(2)+' kN':'0.00 kN'}</div>`);
   arrowW(sa*sm(40.4,41,t))}
 }
 // ---- real life: columns (same pressure, water 13.6x taller) ----
 if(t>52.2&&t<57.4){const a=sm(52.6,53.2,t)*(1-sm(56.8,57.4,t));const h=.35,x0=13.2,x1=14.8;
  g.save();g.globalAlpha=a;for(const[x,hh,col]of[[x0,h,'hg'],[x1,h*S_HG*sm(53.0,54.6,t),'w']]){rr(X(x-.14),Y(.1+Math.max(hh,h*S_HG)+.2),K(.28),K(Math.max(hh,h*S_HG)+.3),10);g.strokeStyle='#5d6b7a';g.lineWidth=5;g.stroke();
   const top=.1+hh;if(col==='hg'){g.fillStyle='#b9c0c8'}else g.fillStyle=WATER;g.fillRect(X(x-.11),Y(top),K(.22),K(hh))}
  g.restore();chip([x0,.1+h+.35],'mercury: h','am',a,0);chip([x1,.1+h*S_HG*sm(53,54.6,t)+.35],'water: 13.6 h','te',a*sm(54.4,54.8,t),0)}
 // ---- equations (values computed above) ----
 eqPanel(t,33.0,52.0,[[33.4,'ρ = m ÷ V',''],[35.0,`water: ρ = ${RHOW} kg/m³`,''],[38.0,'W = m g',''],[39.4,`  = ${RHOW} × ${G} = ${W1.toFixed(2)} kN`,'hi'],[42.6,`w = ρ g = ${SPW.toFixed(2)} kN/m³`,'hi'],[45.6,`S = ρ ÷ ρ<sub>w</sub>: water 1, mercury ${S_HG}`,'am2']]);
 if(t>57.3&&t<62){const a=sm(57.3,57.7,t)*(1-sm(61.6,62,t));OV.push(`<div id="q" style="top:440px;opacity:${a}">Oil, S = 0.8:<br>w = <span>?</span></div>`)}
 OV.unshift(`<div id="top" style="opacity:${t<62?1:0}"><span>DENSITY &amp; WEIGHT</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,3.0,'THE IDEA');sticker(t,31.6,'THE MATH');sticker(t,52.2,'REAL LIFE');sticker(t,57.0,'YOUR TURN');
 wipe(t,32);wipe(t,52.2);wipe(t,57);
 if(t>=7.4&&t<8.1){const p=proj([.95,.6]);burst(p[0],p[1],7.4,t,'#FF5A2A')}
 if(t>=17.4&&t<18.1){const p=proj([8.7,1.0]);burst(p[0],p[1],17.4,t,'#FF5A2A')}
 if(t>=40.4&&t<41.1)burst(420,560,40.4,t,'#3df0d8');if(t>=43.6&&t<44.3)burst(420,630,43.6,t,'#3df0d8');
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 const e=sm(62,62.8,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)"><div class="phone"><div class="scr">
  <div class="hd">Engineering Guide<br>by IQRA<small>FLUID MECHANICS · LESSON</small></div>
  <div class="card"><h3>Density &amp; weight</h3>
  <svg viewBox="0 0 400 170" width="100%"><rect x="120" y="40" width="120" height="120" fill="#e0b23c" opacity=".85"/><path d="M120 40 L160 10 L280 10 L240 40z" fill="#f0cd6c"/><path d="M240 40 L280 10 L280 130 L240 160z" fill="#b88f22"/><text x="300" y="100" fill="#fff" font-size="30" font-weight="800" font-family="Inter">1 m³</text></svg>
  <div class="sl"></div><div style="font:600 22px Inter;color:#9fb0cc">Liquid: oil, S = 0.8</div></div>
  <div class="card" style="font:700 30px/1.6 Inter;font-variant-numeric:tabular-nums"><span style="color:#fff">ρ = <b style="color:#ffb020">?</b></span><br><span style="color:#fff">w = <b style="color:#ffb020">?</b></span></div>
  </div></div><div class="cta">Try it in the<br><span>Engineering Guide<br>by IQRA</span> app</div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
function arrowW(a){if(a<=0)return;arrow([7,.2],-1,.0,C.AM,0);const p0=[7,1.75],p1=[7,1.25];g.save();g.globalAlpha=a;line([[X(7),Y(1.9)],[X(7),Y(1.35)]],K(.06),C.AM);g.beginPath();g.moveTo(X(6.88),Y(1.42));g.lineTo(X(7.12),Y(1.42));g.lineTo(X(7),Y(1.25));g.fillStyle=C.AM;g.fill();g.restore();chip([7.55,1.75],`W = ${W1.toFixed(2)} kN`,'am',a,0)}
window.renderAt=render;
