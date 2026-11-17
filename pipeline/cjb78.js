// ===== Short #78: How far does a beam sag? (Conjugate beam method, `cjb`) =====
// App defaults: simply supported, centre load P = 20 kN, span L = 6 m, EI = 20000 kN·m².
const PUNCH=[[0.15,.12],[3.9,.07],[15.2,.05],[40.2,.05],[46.4,.05]];
const HOOK='How far does a beam <span>SAG</span>?<br>Use the <span>reactions</span> trick!';
const T_END=66;
const P=20, L=6, EI=20000;
const MMAX=P*L/4, AREA=0.5*L*MMAX/EI, RC=AREA/2, MMID=RC*(L/2)-RC*(L/6), DEFL_MM=MMID*1000, THETA_MRAD=RC*1000; // computed, never typed
const CAPS=[
[3.0,7.8,'A <b>6 m</b> beam, <b>20 kN</b> at the middle. How much does it sag?'],
[8.0,12.8,'Its bending moment diagram: a <b>triangle</b>, <i>30 kN·m</i> at the top.'],
[13.0,17.0,'Divide by <b>EI</b>, and put it as a load on an imaginary <i>conjugate beam</i>.'],
[17.2,22.0,'Conjugate <b>shear</b> = real <i>slope</i>. Conjugate <b>moment</b> = real <i>deflection</i>.'],
[22.2,31.2,'At a pin: no deflection, but a slope. So a pin stays a <b>pin</b>.'],
[52.4,56.8,'This is how engineers check how much a floor beam sags.'],
[57.6,61.6,'A <b>cantilever</b>: what does its conjugate beam look like?'],
];
const CAMS=[[0,0,1.6,140],[3,0,1.6,140],[31,0,1.6,140],[32,0,.3,150],[32.8,0,.3,150],[51,0,.3,150],[52.4,0,1.8,140],[53.2,0,1.8,140],[56.6,0,1.8,140],[57.4,0,2.6,140],[58.2,0,2.6,140],[66,0,2.6,140]];
const YR=3.0, YC=-.6, HB=1.2; // real beam level, conjugate beam level, diagram height
function beamPath(y,sag,col,a=1,dashed=false,x0=-L/2,x1=L/2){if(a<=0)return;g.save();g.globalAlpha=a;const pts=[];for(let i=0;i<=40;i++){const x=x0+(x1-x0)*i/40;const u=(x-x0)/(x1-x0);const s=u<.5?(3*u-4*u*u*u):(3*(1-u)-4*Math.pow(1-u,3));pts.push([X(x),Y(y-sag*s)])}
 if(dashed)g.setLineDash([16,10]);g.lineCap='round';g.beginPath();pts.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));g.lineWidth=K(.22);g.strokeStyle='#2b303c';g.stroke();g.lineWidth=K(.16);g.strokeStyle=col;g.stroke();g.restore()}
function supports(y,a=1,kind='pin'){if(a<=0)return;g.save();g.globalAlpha=a;pinSup(-L/2,y-.12,1);pinSup(L/2,y-.12,1);g.restore()}
function tri(y,h,col,a,dir=-1,arrows=false){if(a<=0)return;g.save();g.globalAlpha=a;g.beginPath();g.moveTo(X(-L/2),Y(y));g.lineTo(X(0),Y(y+dir*h));g.lineTo(X(L/2),Y(y));g.closePath();g.fillStyle=col;g.fill();g.lineWidth=4;g.strokeStyle='rgba(255,255,255,.7)';g.stroke();
 if(arrows){for(let i=1;i<12;i++){const x=-L/2+L*i/12;const hh=h*(1-Math.abs(x)/(L/2));if(hh<.12)continue;line([[X(x),Y(y+hh)],[X(x),Y(y+.12)]],3,'#ffffff');g.beginPath();g.moveTo(X(x)-7,Y(y+.2));g.lineTo(X(x)+7,Y(y+.2));g.lineTo(X(x),Y(y+.06));g.fillStyle='#fff';g.fill()}}g.restore()}
function varrow(x,y0,y1,col,a=1){if(a<=0)return;arrow([x,y1],Math.sign(y1-y0),Math.abs(y1-y0),col,a)}
function eqPanel(t,t0,t1,lines){const pa=sm(t0,t0+.4,t)*(1-sm(t1-.4,t1,t));if(pa<=0)return;let h='';
 for(const[st,txt,cl]of lines){const k=lin(st,st+1.0,t);if(k<=0){h+='<div class="l"></div>';continue}
  const plain=txt.replace(/<[^>]+>/g,'');const n=Math.ceil(plain.length*k);let out='',cnt=0;for(let i=0;i<txt.length;i++){if(txt[i]==='<'){const j=txt.indexOf('>',i);out+=txt.slice(i,j+1);i=j;continue}if(cnt>=n)break;out+=txt[i];cnt++}
  for(const tg of['sub','sup'])if((out.match(new RegExp('<'+tg+'>','g'))||[]).length>(out.match(new RegExp('</'+tg+'>','g'))||[]).length)out+='</'+tg+'>';h+=`<div class="l ${cl}">${out}</div>`}
 OV.push(`<div id="eq" style="opacity:${pa};transform:translateY(${(1-sm(t0,t0+.5,t))*30}px);font-size:44px">${h}</div>`)}
const e3=v=>(v*1000).toFixed(2)+' × 10<sup>−3</sup>';
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};
 g.clearRect(0,0,W,H);background(t);
 const cant=sm(57.6,58.6,t);
 if(cant<1){const ra=(1-cant)*(1-sm(31.6,32.2,t)+sm(51.8,52.4,t));const rc=(1-cant)*(1-sm(52.0,52.4,t));
  // real beam
  const sag=.45*sm(3.9,5.0,t)*ra;supports(YR,ra);beamPath(YR,sag,C.concrete,ra);
  const drop=Math.max(0,3.9-t)*5;const la=sm(3.5,3.7,t)*ra*(1-sm(52.2,52.6,t));if(la>0){arrow([0,YR+.15-sag+drop],-1,1.1,C.AM,la);chip([0,YR+1.35-sag+drop],`${P} kN`,'am big',la,-4)}
  const qa=sm(5.4,6.0,t)*(1-sm(31.2,31.6,t))*ra;if(qa>0){chip([-L/2+.5,YR+.55],t>40.4?`θ = ${THETA_MRAD.toFixed(2)} mrad`:'θ = ?','te',qa,0);chip([0,YR-sag-.35],t>46.4?`δ = ${DEFL_MM.toFixed(2)} mm`:'δ = ?','am',qa,'below');
   g.save();g.globalAlpha=qa;g.beginPath();g.arc(X(-L/2),Y(YR),K(.7),-0.0,0.42);g.lineWidth=4;g.strokeStyle='#3df0d8';g.stroke();g.restore()}
  const dl=sm(4.4,5.0,t)*(1-sm(7.8,8.2,t))*ra;dimLine([-L/2,YR-.9],[L/2,YR-.9],`L = ${L} m`,dl,'#ffffff');
  // bending moment diagram under the real beam, then it moves down onto the conjugate beam as M/EI
  const bm=sm(8.2,9.2,t)*(1-cant)*(t>15.4?rc:1)*(t<15.4?ra:1);const mv=smr(13.8,15.4,t);const yy=lerp(YR-.6,YC,mv);
  if(bm>0){tri(yy,HB*(mv>0?1:1),mv>.02?'rgba(61,132,224,.75)':'rgba(232,57,43,.7)',bm,mv>.02?1:-1,mv>.95);
   chip([0,(mv>.02?yy+HB:yy-HB)+(mv>.02?.15:-.1)],mv>.5?'M ÷ EI':`M<sub>max</sub> = PL/4 = ${MMAX.toFixed(0)} kN·m`,mv>.5?'te':'am',bm*(1-sm(13.2,13.8,t)+sm(15.2,15.8,t)),mv>.02?0:'below')}
  const ea=sm(13.0,13.4,t)*(1-sm(15.4,15.8,t));if(ea>0)OV.push(`<div class="chip wh big" style="left:540px;top:${Y(YR-1.4)}px;opacity:${ea}">÷ EI</div>`);
  // conjugate beam
  const cb=sm(14.0,14.8,t)*rc;beamPath(YC,0,'#9fd3f0',cb,true);supports(YC,cb);chip([L/2-1.4,YC-.6],'conjugate beam','te',cb*(1-sm(31,31.6,t)),'below');
  const r1=sm(17.4,18.0,t)*(1-sm(31,31.6,t)),r2=sm(19.0,19.6,t)*(1-sm(31,31.6,t));
  if(r1>0)OV.push(`<div class="chip te" style="left:540px;top:330px;opacity:${r1}">conjugate shear = real slope θ</div>`);
  if(r2>0)OV.push(`<div class="chip am" style="left:540px;top:420px;opacity:${r2}">conjugate moment = real deflection δ</div>`);
  const pr=sm(22.4,23.0,t)*(1-sm(31,31.6,t));if(pr>0){for(const[yy2,txt,cls]of[[YR+.1,'real: δ = 0, θ ≠ 0','wh'],[YC+.1,'conjugate: M = 0, V ≠ 0','te']]){const p=proj([-L/2,yy2]);OV.push(`<div class="chip ${cls}" style="left:${p[0]+30}px;top:${p[1]-K(.45)}px;transform:translate(0,-100%);opacity:${pr};font-size:32px">${txt}</div>`)}
   const p2=proj([L/2-.2,(YR+YC)/2]);OV.push(`<div class="chip am big" style="left:${p2[0]-60}px;top:${p2[1]}px;opacity:${sm(26,26.6,t)*pr}">pin ↔ pin</div>`)}
  // the maths on the conjugate beam
  const cr1=sm(38.2,38.8,t)*(1-sm(51.6,52.2,t));if(cr1>0){for(const x of[-L/2,L/2])varrow(x,YC-1.5,YC-.3,C.TE,cr1);chip([-L/2+1.2,YC-1.0],e3(RC),'te',cr1,0);chip([L/2-1.2,YC-1.0],e3(RC),'te',cr1,0)}
  const cm=sm(44.0,44.6,t)*(1-sm(51.6,52.2,t));if(cm>0){SV.push(`<line x1="${X(0)}" y1="${Y(YC+HB+.6)}" x2="${X(0)}" y2="${Y(YC-.5)}" stroke="#ff3b2a" stroke-width="5" stroke-dasharray="12 8" opacity="${cm}"/>`);
   dimLine([-L/2,YC-2.3],[0,YC-2.3],'3 m',cm,'#ffd36b');dimLine([-L/6-0.0,YC+HB+.9],[0,YC+HB+.9],'1 m',cm,'#ffd36b');circ(X(-L/6),Y(YC+HB/3),K(.08),'#ffd36b')}
  // real life: a person on the beam
  if(t>52.2&&t<57.6){figure(.0,YR+.06-sag,1,{shirt:C.you,a:sm(52.4,53,t)*(1-sm(57.2,57.6,t))})}
 }
 if(cant>0){// your turn: a cantilever and its conjugate beam with unknown supports
  g.save();g.globalAlpha=cant;rr(X(-L/2-.5),Y(YR+1.2),K(.5),K(2.4),4);g.fillStyle='#9aa3ad';g.fill();g.restore();
  beamPath(YR,0,C.concrete,cant,false,-L/2,L/2);arrow([L/2-.1,YR+.15],-1,1.0,C.AM,cant);chip([L/2-.1,YR+1.25],`${P} kN`,'am',cant*(1-sm(61.6,62,t)),-4);
  const YCc=.9;beamPath(YCc,0,'#9fd3f0',cant,true);const qa=sm(59.0,59.6,t)*(1-sm(61.6,62,t));chip([-L/2,YCc-.25],'?','am big',qa,'below');chip([L/2,YCc-.25],'?','am big',qa,'below');chip([0,YCc+.4],'conjugate beam','te',cant*(1-sm(61.6,62,t)),0)}
 eqPanel(t,32.8,52.0,[[33.2,`M/EI area = ½ × ${L} × ${MMAX.toFixed(0)} ÷ ${EI}`,''],[34.6,`   = ${e3(AREA)}`,'hi'],[38.4,`support = ${e3(RC)} → θ = ${THETA_MRAD.toFixed(2)} mrad`,''],[44.2,`M<sub>mid</sub> = ${e3(RC)} × (3 − 1)`,''],[45.8,`   = ${e3(MMID)} m → δ = ${DEFL_MM.toFixed(2)} mm`,'am2']]);
 if(t>57.3&&t<62){const a=sm(57.3,57.7,t)*(1-sm(61.6,62,t));OV.push(`<div id="q" style="top:440px;opacity:${a}">Cantilever:<br>conjugate supports = <span>?</span></div>`)}
 OV.unshift(`<div id="top" style="opacity:${t<62?1:0}"><span>CONJUGATE BEAM METHOD</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,3.0,'THE IDEA');sticker(t,31.6,'THE MATH');sticker(t,52.2,'REAL LIFE');sticker(t,57.0,'YOUR TURN');
 wipe(t,32);wipe(t,52.2);wipe(t,57);
 if(t>=3.9&&t<4.6){const p=proj([0,YR]);burst(p[0],p[1],3.9,t,'#FF5A2A')}
 if(t>=40.2&&t<40.9)burst(420,560,40.2,t,'#3df0d8');if(t>=46.4&&t<47.1)burst(420,640,46.4,t,'#ffc244');
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 const e=sm(62,62.8,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)"><div class="phone"><div class="scr">
  <div class="hd">Engineering Guide<br>by IQRA<small>STRUCTURAL ANALYSIS I · LESSON</small></div>
  <div class="card"><h3>Conjugate beam method</h3>
  <svg viewBox="0 0 400 170" width="100%"><rect x="10" y="10" width="22" height="80" fill="#9aa3ad"/><rect x="32" y="40" width="340" height="16" rx="4" fill="#bdb8ae"/><line x1="360" y1="0" x2="360" y2="34" stroke="#ffb020" stroke-width="7"/>
  <line x1="32" y1="130" x2="372" y2="130" stroke="#9fd3f0" stroke-width="10" stroke-dasharray="14 8"/><text x="20" y="165" fill="#ffb020" font-size="30" font-weight="900" font-family="Inter">?</text><text x="360" y="165" fill="#ffb020" font-size="30" font-weight="900" font-family="Inter">?</text></svg>
  <div class="sl"></div><div style="font:600 22px Inter;color:#9fb0cc">Real beam: cantilever, end load P</div></div>
  <div class="card" style="font:700 30px/1.6 Inter"><span style="color:#fff">Conjugate supports = <b style="color:#ffb020">?</b></span></div>
  </div></div><div class="cta">Try it in the<br><span>Engineering Guide<br>by IQRA</span> app</div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
window.renderAt=render;
