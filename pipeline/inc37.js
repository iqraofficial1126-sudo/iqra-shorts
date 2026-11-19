// ===== Short #37: Water force on an inclined gate (Pressure on an inclined plane, `inc`) =====
// App defaults: plate 2 m wide × 3 m long, θ = 30°, top edge 1.5 m deep, water ρ = 1000 kg/m³, g = 9.81.
// Timed straight to the voice (voice37.mp3, 73.6 s): t here = audio seconds.
const PUNCH=[[0.15,.12],[45.9,.06],[57.0,.05]];
const HOOK='How hard does water <span>PUSH</span><br>on a tilted gate?';
const T_END=75.2;
const RHO=1000, G=9.81, TH=30, A0=1.5, B=2, LP=3;
// all values computed here, never typed
const s30=Math.sin(TH*Math.PI/180), AREA=B*LP, HBAR=A0+LP/2*s30, F_KN=RHO*G*HBAR*AREA/1000, IG=B*LP**3/12,
      HSTAR=HBAR+IG*s30*s30/(AREA*HBAR), SHIFT=IG/(AREA*(HBAR/s30));
const f2=v=>v.toFixed(2);
const CAPS=[
[6.6,14.6,`A <b>${B} m × ${LP} m</b> gate at <b>${TH}°</b>, its top edge <b>${A0} m</b> deep.`],
[14.95,21.6,'Water pushes at <b>right angles</b> to the plate, and harder deeper down: <i>p = ρgh</i>.'],
[21.85,26.2,'Deeper means longer arrows: a <b>trapezoid</b> pressure diagram.'],
[26.45,33.9,'Total force = pressure at the <b>centroid</b> × area.'],
[48.4,52.3,'But the force does not act at the centroid…'],
[52.5,61.6,'…it acts at the <i>centre of pressure</i>, a little lower.'],
[62.2,66.3,'Sluice gate hinges and lock gates are designed with this.'],
];
const CAMS=[[0,0,1.6,150],[75.2,0,1.6,150]];
const SURF=3.5, X0=-1.4, YT=SURF-A0;     // water surface level, top edge of the plate
function plate(th){const r=th*Math.PI/180;return{d:[Math.cos(r),-Math.sin(r)],n:[Math.sin(r),Math.cos(r)]}}
const at=(s,th)=>{const{d}=plate(th);return[X0+s*d[0],YT+s*d[1]]};
function sarrow(tail,tip,col,w,a){if(a<=0)return;const[x1,y1]=proj(tail),[x2,y2]=proj(tip);const ang=Math.atan2(y2-y1,x2-x1),h=w*3;
 SV.push(`<g opacity="${a}"><line x1="${x1}" y1="${y1}" x2="${x2-Math.cos(ang)*h*.8}" y2="${y2-Math.sin(ang)*h*.8}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x2},${y2} L${x2-h*Math.cos(ang)+h*.6*Math.sin(ang)},${y2-h*Math.sin(ang)-h*.6*Math.cos(ang)} L${x2-h*Math.cos(ang)-h*.6*Math.sin(ang)},${y2-h*Math.sin(ang)+h*.6*Math.cos(ang)}Z" fill="${col}"/></g>`)}
function vdim(x,y0,y1,label,a,col){if(a<=0)return;const A=proj([x,y0]),Bp=proj([x,y1]);const e=A[1]+(Bp[1]-A[1])*a;
 SV.push(`<g opacity="${Math.min(1,a*1.5)}" stroke="${col}" stroke-width="5" stroke-linecap="round"><line x1="${A[0]}" y1="${A[1]}" x2="${A[0]}" y2="${e}"/><line x1="${A[0]-18}" y1="${A[1]}" x2="${A[0]+18}" y2="${A[1]}"/>${a>.98?`<line x1="${A[0]-18}" y1="${Bp[1]}" x2="${A[0]+18}" y2="${Bp[1]}"/>`:''}</g>`);
 if(a>.5)OV.push(`<div class="chip wh" style="left:${A[0]-14}px;top:${(A[1]+Bp[1])/2}px;transform:translate(-100%,-50%);font-size:34px;padding:6px 14px;opacity:${(a-.5)*2};border-color:${col}">${label}</div>`)}
function eqPanel(t,t0,t1,lines){const pa=sm(t0,t0+.4,t)*(1-sm(t1-.4,t1,t));if(pa<=0)return;let h='';
 for(const[st,txt,cl]of lines){const k=lin(st,st+1.0,t);if(k<=0){h+='<div class="l"></div>';continue}
  const plain=txt.replace(/<[^>]+>/g,'');const n=Math.ceil(plain.length*k);let out='',cnt=0;for(let i=0;i<txt.length;i++){if(txt[i]==='<'){const j=txt.indexOf('>',i);out+=txt.slice(i,j+1);i=j;continue}if(cnt>=n)break;out+=txt[i];cnt++}
  for(const tg of['sub','sup'])if((out.match(new RegExp('<'+tg+'>','g'))||[]).length>(out.match(new RegExp('</'+tg+'>','g'))||[]).length)out+='</'+tg+'>';h+=`<div class="l ${cl}">${out}</div>`}
 OV.push(`<div id="eq" style="opacity:${pa};transform:translateY(${(1-sm(t0,t0+.5,t))*30}px);font-size:40px">${h}</div>`)}
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};
 g.clearRect(0,0,W,H);background(t);g.fillStyle='rgba(10,20,40,.30)';g.fillRect(0,0,W,H);
 // the water and the dam wall
 const wa=sm(0.2,1.2,t);g.save();g.globalAlpha=wa;const wg=g.createLinearGradient(0,Y(SURF),0,Y(0));wg.addColorStop(0,'rgba(74,163,214,.78)');wg.addColorStop(1,'rgba(20,70,130,.92)');
 g.fillStyle=wg;g.fillRect(X(-3.3),Y(SURF),X(3.4)-X(-3.3),Y(0)-Y(SURF));line([[X(-3.3),Y(SURF)],[X(3.4),Y(SURF)]],5,'#bfe8ff');
 for(let i=0;i<6;i++){const xx=-3+((i*1.1+t*.25)%6.3);line([[X(xx),Y(SURF)+8],[X(xx+.35),Y(SURF)+8]],3,'rgba(255,255,255,.55)')}
 rr(X(-3.75),Y(SURF+.7),K(.45),Y(0)-Y(SURF+.7),6);g.fillStyle=C.concreteD;g.fill();g.fillStyle=C.dark;g.fillRect(X(-3.3),Y(0),X(3.4)-X(-3.3),K(.12));g.restore();
 // the plate (it swings to vertical in "your turn")
 const th=TH+60*smr(66.9,68.2,t);const pa=sm(6.6,7.2,t);const{d,n}=plate(th);
 const p0=at(0,th),p1=at(LP,th);if(pa>0){g.save();g.globalAlpha=pa;line([proj(p0),proj(p1)],K(.16),'#2b303c');line([proj(p0),proj(p1)],K(.11),'#c9ced6');circ(...proj(p0),K(.09),C.dark);g.restore()}
 const live=1-sm(62.0,62.4,t);
 chip([X0+1.9,YT+.55],`width ${B} m (into the screen)`,'wh',sm(8.0,8.6,t)*(1-sm(14.6,15,t)),0);
 const lm=at(LP/2,th);chip([lm[0]-n[0]*.55,lm[1]-n[1]*.55],`${LP} m`,'wh',sm(9.2,9.8,t)*(1-sm(14.6,15,t)),'below');
 const aa=sm(10.3,10.9,t)*(1-sm(14.6,15,t));if(aa>0){const[cx,cy]=proj(p0);SV.push(`<g opacity="${aa}"><line x1="${cx}" y1="${cy}" x2="${cx+K(1.3)}" y2="${cy}" stroke="#ffffff" stroke-width="4" stroke-dasharray="10 8"/><path d="M ${cx+K(1)} ${cy} A ${K(1)} ${K(1)} 0 0 1 ${cx+K(1)*Math.cos(TH*Math.PI/180)} ${cy+K(1)*Math.sin(TH*Math.PI/180)}" stroke="#ffc244" stroke-width="6" fill="none"/></g>`);chip([X0+1.45,YT-.05],`${TH}°`,'am',aa,0)}
 vdim(X0-.35,SURF,YT,`${A0} m`,sm(12.5,13.4,t)*(1-sm(26.2,26.6,t)),'#ffffff');
 // pressure arrows at right angles to the plate, longer with depth
 const ar=sm(15.0,17.0,t)*live;const grow=.55+.45*sm(17.6,19.4,t);const pulse=t>21.8&&t<24.4?1+.12*Math.sin((t-21.8)*9):1;
 if(ar>0){for(let i=0;i<=8;i++){const s=LP*i/8;if(i/8>ar*1.01)break;const pt=at(s,th);const depth=SURF-pt[1];const len=.36*depth*grow*pulse;
   sarrow([pt[0]+n[0]*len,pt[1]+n[1]*len],[pt[0]+n[0]*.04,pt[1]+n[1]*.04],'#ffb020',7,ar*(1-sm(26.0,26.4,t)*.55))}
  const tz=sm(24.3,25.2,t)*(1-sm(48.0,48.4,t))*live;if(tz>0){const q=[p0,p1].map(p=>[p[0]+n[0]*.36*(SURF-p[1])*grow,p[1]+n[1]*.36*(SURF-p[1])*grow]);
   SV.push(`<path d="M${proj(p0)} L${proj(q[0])} L${proj(q[1])} L${proj(p1)}" stroke="#ffffff" stroke-width="5" fill="rgba(255,194,68,.18)" stroke-dasharray="14 9" opacity="${tz}"/>`);chip([q[1][0]+.2,q[1][1]],'trapezoid','am',tz,0)}
  chip([X0+2.6,YT+1.25],'p = ρgh','am',sm(19.8,20.4,t)*(1-sm(26.2,26.6,t)),0)}
 // centroid (white) and centre of pressure (red)
 const cg=at(LP/2,th),cp=at(LP/2+SHIFT,th);const ca=sm(29.7,30.3,t)*live;
 if(ca>0){SV.push(`<circle cx="${proj(cg)[0]}" cy="${proj(cg)[1]}" r="15" fill="#ffffff" stroke="#15171A" stroke-width="4" opacity="${ca}"/>`);chip([cg[0]-.3,cg[1]-.25],'centroid','wh',ca*(1-sm(50.9,51.3,t)),'below')}
 vdim(cg[0]+.25,SURF,cg[1],`h̄ = ${f2(HBAR)} m`,sm(38.5,39.4,t)*(1-sm(48.0,48.4,t))*live,'#3df0d8');
 const mv=smr(48.6,50.8,t);const fp=[cg[0]+(cp[0]-cg[0])*mv,cg[1]+(cp[1]-cg[1])*mv];const fa=sm(45.8,46.4,t)*live;
 sarrow([fp[0]+n[0]*1.5,fp[1]+n[1]*1.5],[fp[0]+n[0]*.05,fp[1]+n[1]*.05],'#ff3b2a',13,fa);
 chip([fp[0]+n[0]*1.55,fp[1]+n[1]*1.55],`F = ${f2(F_KN)} kN`,'am big',fa,-6);
 const ra=sm(51.0,51.6,t)*live;if(ra>0){SV.push(`<circle cx="${proj(cp)[0]}" cy="${proj(cp)[1]}" r="15" fill="#ff3b2a" stroke="#ffffff" stroke-width="4" opacity="${ra}"/>`);chip([cp[0]+.15,cp[1]-.3],'centre of pressure','am',ra,'below')}
 vdim(cp[0]+.35,SURF,cp[1],`h* = ${f2(HSTAR)} m`,sm(56.9,57.8,t)*live,'#ff7a6a');
 // the maths
 eqPanel(t,26.3,48.3,[[26.5,'F = ρ g h̄ A   (h̄ = centroid depth)',''],[34.2,`h̄ = ${A0} + ${LP/2} sin ${TH}° = ${f2(HBAR)} m`,''],[40.0,`A = ${B} × ${LP} = ${AREA} m<sup>2</sup>`,''],[42.1,`F = 9810 × ${f2(HBAR)} × ${AREA} = ${f2(F_KN)} kN`,'hi']]);
 eqPanel(t,48.4,61.9,[[52.5,'h* = h̄ + I<sub>G</sub> sin<sup>2</sup>θ ÷ (A h̄)',''],[54.4,`I<sub>G</sub> = bL<sup>3</sup>/12 = ${IG.toFixed(1)} m<sup>4</sup> (about the centroid)`,''],[57.0,`h* = ${f2(HSTAR)} m`,'hi'],[58.5,`${f2(SHIFT)} m below the centroid, along the plate`,'am2']]);
 // real life: a hinged sluice gate
 const rl=sm(62.2,62.8,t)*(1-sm(66.3,66.7,t));if(rl>0){SV.push(`<circle cx="${proj(p0)[0]}" cy="${proj(p0)[1]}" r="${26+6*Math.sin(t*6)}" fill="none" stroke="#ffc244" stroke-width="6" opacity="${rl}"/>`);
  chip([X0,YT+.5],'hinge','am',rl,0);chip([1.6,SURF+1.2],'sluice gates · lock gates','wh',sm(62.8,63.4,t)*rl,0)}
 // your turn
 if(t>66.5&&t<71.0){const a=sm(66.5,67.0,t)*(1-sm(70.6,71.0,t));const mid=at(LP/2,th);
  SV.push(`<circle cx="${proj(mid)[0]}" cy="${proj(mid)[1]}" r="15" fill="#ffffff" stroke="#15171A" stroke-width="4" opacity="${a*sm(68.2,68.6,t)}"/>`);chip([mid[0]+.45,mid[1]],'h* − h̄ = ?','am big',a*sm(68.4,68.9,t),0);
  OV.push(`<div id="q" style="top:300px;opacity:${a}">Plate <span>vertical</span>:<br>how far below the centroid?</div>`)}
 OV.unshift(`<div id="top" style="opacity:${t<70.9?1:0}"><span>PRESSURE ON AN INCLINED PLANE</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,14.95,'THE IDEA');sticker(t,26.45,'THE MATH');sticker(t,62.2,'REAL LIFE');sticker(t,66.5,'YOUR TURN');
 wipe(t,26.45);wipe(t,62.2);wipe(t,66.5);
 if(t>=45.9&&t<46.6){const p=proj(cg);burst(p[0],p[1],45.9,t,'#ffc244')}if(t>=57.0&&t<57.7){const p=proj(cp);burst(p[0],p[1],57.0,t,'#ff3b2a')}
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 const e=sm(70.9,71.7,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)"><div class="phone" style="height:900px"><div class="scr">
  <div class="hd">Engineering Guide<br>by IQRA<small>FLUID MECHANICS · LESSON</small></div>
  <div class="card"><h3>Pressure on an inclined plane</h3>
  <svg viewBox="0 0 400 190" width="100%"><rect x="0" y="40" width="400" height="150" fill="#2d6fa8"/><line x1="0" y1="40" x2="400" y2="40" stroke="#bfe8ff" stroke-width="4"/><line x1="90" y1="80" x2="300" y2="170" stroke="#c9ced6" stroke-width="12" stroke-linecap="round"/>
  <circle cx="195" cy="125" r="9" fill="#fff"/><text x="225" y="110" fill="#ffb020" font-size="32" font-weight="900" font-family="Inter">F = ?</text></svg>
  <div class="sl"></div><div style="font:600 22px Inter;color:#9fb0cc">Change the angle and the depth</div></div>
  <div class="card" style="font:700 30px/1.6 Inter"><span style="color:#fff">Vertical plate: h* − h̄ = <b style="color:#ffb020">?</b></span></div>
  </div></div><div class="cta" style="margin-top:44px;font-size:60px">Try it in the<br><span>Engineering Guide<br>by IQRA</span> app</div>
  <div style="margin-top:34px;padding:16px 34px;border-radius:44px;background:#FF5A2A;color:#fff;font:800 40px/1.25 Inter;text-align:center;opacity:${sm(71.7,72.3,t)}">Like &amp; Subscribe<br><span style="font-weight:600;font-size:32px">for more Engineering Guide videos</span></div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
window.renderAt=render;
