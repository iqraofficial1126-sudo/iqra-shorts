// ===== Short #39: Water force on a curved surface (`crv`) =====
// App defaults: quarter circle R = 2 m, width b = 1 m, top 1.5 m deep, water above the curve, ρ = 1000, g = 9.81.
// Timed to voice39.mp3 (67.4 s, audio seconds).
const PUNCH=[[0.15,.12],[36.1,.05],[50.8,.06]];
const HOOK='How hard does water push<br>on a <span>CURVED</span> gate?';
const T_END=67.4;
const RHO=1000,G=9.81,R=2,B=1,A0=1.5;
// all values computed here
const HBAR=A0+R/2, AP=R*B, FX=RHO*G*HBAR*AP/1000, HCP=HBAR+(B*R**3/12)/(AP*HBAR);
const VOL=(R*A0+Math.PI*R*R/4)*B, FY=RHO*G*VOL/1000, F=Math.hypot(FX,FY), ALPHA=Math.atan2(FY,FX)*180/Math.PI;
const f2=v=>v.toFixed(2);
const CAPS=[
[3.0,8.9,'Water presses on <b>every point</b> of the curve, each in a <b>different direction</b>.'],
[9.0,15.5,'Pressure acts at <b>right angles</b> to the surface: every arrow lies along a <i>radius</i>.'],
[15.6,21.1,'So split the force into a <b>horizontal</b> and a <b>vertical</b> part.'],
[21.2,26.6,`Quarter circle: <b>R = ${R} m</b>, <b>${B} m</b> wide, top <b>${A0} m</b> deep.`],
[26.7,30.4,'<i>Horizontal part</i>: the force on the curve seen <b>from the side</b>.'],
[38.4,43.7,'<i>Vertical part</i>: the <b>weight of water above</b> the curve.'],
[47.6,52.8,'<b>Add the two at right angles.</b>'],
[52.9,56.5,'Every push lies along a radius, so the total passes through the <b>centre</b>.'],
[56.6,58.9,'Radial gates on dams are designed this way.'],
];
const CAMS=[[0,0.6,1.75,185],[67.4,0.6,1.75,185]];
const SURF=3.5, CX=1, CY=SURF-A0, XL=CX-R, XR=3.3;
const arcPt=th=>[CX+R*Math.cos(th),CY+R*Math.sin(th)];   // th from π to 3π/2
// centroid x of the water above the curve (rectangle + quarter disc)
const XBAR=((R*A0)*(CX-R/2)+(Math.PI*R*R/4)*(CX-4*R/(3*Math.PI)))/(R*A0+Math.PI*R*R/4);
function sarrow(tail,tip,col,w,a){if(a<=0)return;const[x1,y1]=proj(tail),[x2,y2]=proj(tip);const ang=Math.atan2(y2-y1,x2-x1),h=w*3;
 SV.push(`<g opacity="${a}"><line x1="${x1}" y1="${y1}" x2="${x2-Math.cos(ang)*h*.8}" y2="${y2-Math.sin(ang)*h*.8}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x2},${y2} L${x2-h*Math.cos(ang)+h*.6*Math.sin(ang)},${y2-h*Math.sin(ang)-h*.6*Math.cos(ang)} L${x2-h*Math.cos(ang)-h*.6*Math.sin(ang)},${y2-h*Math.sin(ang)+h*.6*Math.cos(ang)}Z" fill="${col}"/></g>`)}
function vdim(x,y0,y1,label,a,col){if(a<=0)return;const A=proj([x,y0]),Bp=proj([x,y1]);const e=A[1]+(Bp[1]-A[1])*a;
 SV.push(`<g opacity="${Math.min(1,a*1.5)}" stroke="${col}" stroke-width="5" stroke-linecap="round"><line x1="${A[0]}" y1="${A[1]}" x2="${A[0]}" y2="${e}"/><line x1="${A[0]-18}" y1="${A[1]}" x2="${A[0]+18}" y2="${A[1]}"/>${a>.98?`<line x1="${A[0]-18}" y1="${Bp[1]}" x2="${A[0]+18}" y2="${Bp[1]}"/>`:''}</g>`);
 if(a>.5)OV.push(`<div class="chip wh" style="left:${A[0]-14}px;top:${(A[1]+Bp[1])/2}px;transform:translate(-100%,-50%);font-size:32px;padding:6px 12px;opacity:${(a-.5)*2};border-color:${col}">${label}</div>`)}
function eqPanel(t,t0,t1,lines){const pa=sm(t0,t0+.4,t)*(1-sm(t1-.4,t1,t));if(pa<=0)return;let h='';
 for(const[st,txt,cl]of lines){const k=lin(st,st+1.0,t);if(k<=0){h+='<div class="l"></div>';continue}
  const plain=txt.replace(/<[^>]+>/g,'');const n=Math.ceil(plain.length*k);let out='',cnt=0;for(let i=0;i<txt.length;i++){if(txt[i]==='<'){const j=txt.indexOf('>',i);out+=txt.slice(i,j+1);i=j;continue}if(cnt>=n)break;out+=txt[i];cnt++}
  for(const tg of['sub','sup'])if((out.match(new RegExp('<'+tg+'>','g'))||[]).length>(out.match(new RegExp('</'+tg+'>','g'))||[]).length)out+='</'+tg+'>';h+=`<div class="l ${cl}">${out}</div>`}
 OV.push(`<div id="eq" style="opacity:${pa};transform:translateY(${(1-sm(t0,t0+.5,t))*30}px);font-size:44px">${h}</div>`)}
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};
 g.clearRect(0,0,W,H);{const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#1a2a4a');gr.addColorStop(1,'#0a1122');g.fillStyle=gr;g.fillRect(0,0,W,H)}
 // water above the curve
 const n=40;const arc=[];for(let i=0;i<=n;i++)arc.push(arcPt(Math.PI+Math.PI/2*i/n));
 g.save();g.globalAlpha=sm(0.2,1.0,t);g.beginPath();g.moveTo(...proj([XL,SURF]));g.lineTo(...proj([XL,CY]));for(const p of arc)g.lineTo(...proj(p));g.lineTo(...proj([XR,0]));g.lineTo(...proj([XR,SURF]));g.closePath();
 const wg=g.createLinearGradient(0,Y(SURF),0,Y(0));wg.addColorStop(0,'rgba(74,163,214,.80)');wg.addColorStop(1,'rgba(20,70,130,.95)');g.fillStyle=wg;g.fill();
 line([proj([XL,SURF]),proj([XR,SURF])],5,'#bfe8ff');for(let i=0;i<5;i++){const xx=XL+.2+((i*1.0+t*.25)%4.2);line([[X(xx),Y(SURF)+8],[X(xx+.3),Y(SURF)+8]],3,'rgba(255,255,255,.5)')}
 // the concrete wall and the curved gate
 g.beginPath();g.moveTo(...proj([XL-.5,SURF+.4]));g.lineTo(...proj([XL,SURF+.4]));g.lineTo(...proj([XL,CY]));for(const p of arc)g.lineTo(...proj(p));g.lineTo(...proj([XR,0]));g.lineTo(...proj([XR,-.45]));g.lineTo(...proj([XL-.5,-.45]));g.closePath();g.fillStyle='#8f887c';g.fill();
 g.beginPath();g.moveTo(...proj(arc[0]));for(const p of arc)g.lineTo(...proj(p));g.lineWidth=K(.1);g.strokeStyle='#c9ced6';g.stroke();g.restore();
 // shaded volume above the curve (vertical part)
 const va=sm(39.4,40.4,t)*(1-sm(47.4,47.8,t));if(va>0){let d=`M${proj([XL,SURF])} L${proj([XL,CY])}`;for(const p of arc)d+=` L${proj(p)}`;d+=` L${proj([CX,SURF])}Z`;
  SV.push(`<path d="${d}" fill="rgba(255,194,68,.35)" stroke="#ffc244" stroke-width="5" stroke-dasharray="14 9" opacity="${va}"/>`);chip([CX-.85,SURF-.6],`V = ${f2(VOL)} m<sup>3</sup>`,'am big',va*sm(41.5,42.1,t)*(1-sm(43.6,44.0,t)),0)}
 // pressure arrows along radii, longer with depth
 const ar=sm(9.6,11.6,t)*(1-sm(26.4,26.8,t)*.7)*(1-sm(47.4,47.8,t));
 if(ar>0)for(let i=0;i<=8;i++){const th=Math.PI+Math.PI/2*i/8;if(i/8>sm(9.6,11.6,t)*1.01)break;const p=arcPt(th);const L=.22*(SURF-p[1]);const u=[Math.cos(th),Math.sin(th)];
  sarrow([p[0]-u[0]*L,p[1]-u[1]*L],[p[0]-u[0]*.03,p[1]-u[1]*.03],'#ffb020',7,ar)}
 const rd=sm(12.1,13.0,t)*(1-sm(15.6,16.2,t));if(rd>0){for(let i=0;i<=8;i+=2){const p=arcPt(Math.PI+Math.PI/2*i/8);SV.push(`<line x1="${proj([CX,CY])[0]}" y1="${proj([CX,CY])[1]}" x2="${proj(p)[0]}" y2="${proj(p)[1]}" stroke="#fff" stroke-width="3" stroke-dasharray="10 8" opacity="${rd}"/>`)}}
 const ca=sm(12.6,13.2,t)*(1-sm(62.4,62.8,t));if(ca>0){SV.push(`<circle cx="${proj([CX,CY])[0]}" cy="${proj([CX,CY])[1]}" r="14" fill="#fff" stroke="#15171A" stroke-width="4" opacity="${ca}"/>`);chip([CX+.1,CY+.12],'centre C','wh',ca*(1-sm(21.0,21.4,t))+ca*sm(55.0,55.6,t),0)}
 // split one push into two parts
 const sp=sm(15.7,16.5,t)*(1-sm(21.0,21.4,t));if(sp>0){const th=Math.PI*1.3,p=arcPt(th),u=[Math.cos(th),Math.sin(th)],L=1.1;
  sarrow([p[0]-u[0]*L,p[1]-u[1]*L],p,'#ffb020',10,sp);sarrow([p[0]-u[0]*L,p[1]],p.map((v,j)=>j?p[1]:v),'#3df0d8',10,sp*sm(16.5,17.3,t));sarrow([p[0],p[1]-u[1]*L],[p[0],p[1]],'#ff7a6a',10,sp*sm(18.3,19.1,t));
  chip([p[0]-u[0]*L-.1,p[1]+.15],'horizontal','te',sp*sm(16.5,17.3,t),0);chip([p[0]+.45,p[1]-u[1]*L+.1],'vertical','am',sp*sm(18.3,19.1,t),0)}
 // dimensions
 const dm=sm(22.4,23.2,t)*(1-sm(38.2,38.6,t));if(dm>0){const q=arcPt(Math.PI*1.25);SV.push(`<line x1="${proj([CX,CY])[0]}" y1="${proj([CX,CY])[1]}" x2="${proj(q)[0]}" y2="${proj(q)[1]}" stroke="#ffc244" stroke-width="6" opacity="${dm}"/>`);
  chip([(CX+q[0])/2+.35,(CY+q[1])/2+.1],`R = ${R} m`,'am',dm,0);chip([1.75,3.05],`width ${B} m (into the screen)`,'wh',sm(22.9,23.5,t)*(1-sm(26.4,26.8,t)),0)}
 vdim(XL-.25,SURF,CY,`${A0} m`,sm(24.5,25.4,t)*(1-sm(38.2,38.6,t)),'#ffffff');
 // horizontal part: the projection seen from the side
 const hp=sm(27.8,28.8,t)*(1-sm(47.4,47.8,t));if(hp>0){const x0=XL-.05;SV.push(`<g opacity="${hp}"><rect x="${proj([x0-.12,CY])[0]}" y="${proj([x0,CY])[1]}" width="${K(.12)}" height="${K(R)}" fill="#3df0d8"/></g>`);
  chip([XL+.62,CY-.55],'projection<br>R × b','te',hp*(1-sm(38.2,38.6,t)),0);vdim(CX+.35,SURF,SURF-HBAR,`h̄ = ${f2(HBAR)} m`,sm(31.4,32.4,t)*(1-sm(38.2,38.6,t)),'#3df0d8')}
 const fxa=sm(36.1,36.7,t)*(1-sm(47.4,47.8,t));const ycp=SURF-HCP;sarrow([XL+1.25,ycp],[XL+.02,ycp],'#3df0d8',13,fxa);chip([XL+.75,ycp+.05],`F<sub>x</sub> = ${f2(FX)} kN`,'te big',fxa,-6);
 const fya=sm(43.8,44.4,t)*(1-sm(47.4,47.8,t));sarrow([XBAR,SURF-.15],[XBAR,1.05],'#ff7a6a',13,fya);chip([XBAR+1.25,2.3],`F<sub>y</sub> = ${f2(FY)} kN`,'am big',fya,0);
 if(fya>0)chip([XBAR+.95,1.4],'downward','wh',sm(46.9,47.4,t)*(1-sm(47.6,48.0,t)),0);
 // the resultant through the centre
 const ra=sm(50.8,51.6,t);const rr=ALPHA*Math.PI/180,u=[-Math.cos(rr),-Math.sin(rr)],tip=[CX+u[0]*R,CY+u[1]*R],tail=[CX-u[0]*.9,CY-u[1]*.9];
 if(ra>0){SV.push(`<line x1="${proj(tail)[0]}" y1="${proj(tail)[1]}" x2="${proj([CX,CY])[0]}" y2="${proj([CX,CY])[1]}" stroke="#ff3b2a" stroke-width="5" stroke-dasharray="12 8" opacity="${ra*sm(55.2,55.8,t)}"/>`);
  sarrow([CX,CY],tip,'#ff3b2a',15,ra*(1-sm(58.8,59.2,t)));chip([CX+.1,CY+.95],`F = ${F.toFixed(1)} kN`,'am big',ra*(1-sm(58.8,59.2,t)),0);chip([tip[0]+.95,tip[1]+.05],`${Math.round(ALPHA)}° below horizontal`,'wh',sm(52.9,53.5,t)*(1-sm(58.8,59.2,t)),0)}
 // equations
 eqPanel(t,30.4,38.2,[[30.5,'F<sub>x</sub> = ρ g h̄ A<sub>projected</sub>',''],[33.2,`= 9.81 × ${f2(HBAR)} × ${AP}`,''],[36.1,`= ${f2(FX)} kN`,'hi']]);
 eqPanel(t,41.4,47.5,[[41.5,`F<sub>y</sub> = ρ g V = 9.81 × ${f2(VOL)}`,''],[43.8,`= ${f2(FY)} kN`,'hi']]);
 eqPanel(t,47.6,56.5,[[47.7,'F = √(F<sub>x</sub>² + F<sub>y</sub>²)',''],[50.8,`= ${F.toFixed(1)} kN`,'hi'],[52.9,`tan α = F<sub>y</sub>/F<sub>x</sub> → α = ${ALPHA.toFixed(1)}°`,'am2']]);
 // real life
 const rl=sm(56.6,57.1,t)*(1-sm(58.8,59.2,t));if(rl>0)OV.push(`<div class="chip am big" style="left:540px;top:520px;transform:translate(-50%,0);opacity:${rl}">radial gates on dams</div>`);
 // your turn
 if(t>59.0&&t<63.0){const a=sm(59.0,59.5,t)*(1-sm(62.5,63.0,t));chip([XBAR,1.4],'F<sub>y</sub> = ?','am big',a*sm(61.0,61.5,t),0);
  OV.push(`<div id="q" style="top:430px;opacity:${a}">Water <span>below</span> the curve:<br>which way is F<sub>y</sub>?</div>`)}
 OV.unshift(`<div id="top" style="opacity:${t<62.6?1:0}"><span>PRESSURE ON A CURVED SURFACE</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,9.0,'THE IDEA');sticker(t,21.2,'THE MATH');sticker(t,56.6,'REAL LIFE');sticker(t,59.0,'YOUR TURN');
 wipe(t,21.2);wipe(t,56.6);wipe(t,59.0);
 if(t>=36.1&&t<36.8){const p=proj([XL+.1,ycp]);burst(p[0],p[1],36.1,t,'#3df0d8')}if(t>=50.8&&t<51.5){const p=proj(tip);burst(p[0],p[1],50.8,t,'#ff3b2a')}
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 const e=sm(62.6,63.4,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)"><div class="phone" style="height:860px"><div class="scr">
  <div class="hd">Engineering Guide<br>by IQRA<small>FLUID MECHANICS · LESSON</small></div>
  <div class="card"><h3>Pressure on a curved surface</h3>
  <svg viewBox="0 0 400 200" width="100%"><rect x="0" y="20" width="400" height="180" fill="#2d6fa8"/><line x1="0" y1="20" x2="400" y2="20" stroke="#bfe8ff" stroke-width="4"/><path d="M60,60 A140,140 0 0 0 200,200 L400,200 L400,230 L0,230 L0,60Z" fill="#8f887c"/><path d="M60,60 A140,140 0 0 0 200,200" stroke="#c9ced6" stroke-width="10" fill="none"/>
  <text x="170" y="110" fill="#ffb020" font-size="34" font-weight="900" font-family="Inter">F = ?</text></svg>
  <div class="sl"></div><div style="font:600 22px Inter;color:#9fb0cc">Change the radius and the depth</div></div>
  <div class="card" style="font:700 30px/1.6 Inter"><span style="color:#fff">Water below: F<sub>y</sub> <b style="color:#ffb020">?</b></span></div>
  </div></div><div class="cta" style="margin-top:36px;font-size:56px">Try it in the<br><span>Engineering Guide<br>by IQRA</span> app</div>
  <div style="margin-top:30px;padding:16px 34px;border-radius:44px;background:#FF5A2A;color:#fff;font:800 40px/1.25 Inter;text-align:center;opacity:${sm(63.4,64.0,t)}">Like &amp; Subscribe<br><span style="font-weight:600;font-size:32px">for more Engineering Guide videos</span></div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
window.renderAt=render;
