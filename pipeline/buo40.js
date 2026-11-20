// ===== Short #40: Buoyancy and the stability of a floating cube (`buo`) =====
// App defaults: 1 m wooden cube, specific gravity 0.6, water ρ = 1000, g = 9.81 → GM < 0 (unstable).
// Timed to voice40.mp3 (69.15 s, audio seconds).
const PUNCH=[[0.15,.12],[47.6,.06],[53.9,.05]];
const HOOK='Will a wooden cube float<br><span>UPRIGHT</span>… or tip over?';
const T_END=69.15;
const RHO=1000,G=9.81,S=0.6,BW=1,HT=1;
// all values computed here
const D=S*HT, W_KN=S*RHO*G*BW*BW*HT/1000, KG=HT/2, KB=D/2, BM=BW*BW/(12*D), BG=KG-KB, GM=BM-BG;
const f2=v=>v.toFixed(2), f3=v=>v.toFixed(3);
const CAPS=[
[2.9,7.6,'Will it stay <b>upright</b>, or <b>tip over</b>?'],
[9.2,13.7,'<i>Archimedes</i>: buoyant force = <b>weight of the water pushed aside</b>.'],
[13.8,21.5,`A <b>${BW} m</b> cube, S = <b>${S}</b>, weighs <b>${f2(W_KN)} kN</b> and sinks to <b>${D.toFixed(1)} m</b>.`],
[21.6,32.3,'<b>G</b>: centre of gravity. <i>B</i>: centre of buoyancy (centre of the water pushed aside).'],
[32.4,38.7,'Tilt it: B moves. Where the upward force cuts the axis is the <b>metacentre M</b>.'],
[49.8,54.5,'<b>GM negative</b>: M is below G, so the cube is <b>unstable</b>.'],
[54.6,60.7,'M above G = stable. That is why ships have a <b>wide</b> base.'],
];
const CAMS=[[0,0,1.85,430],[31.4,0,1.85,430],[32.6,0,2.1,600],[33.4,0,2.1,600],[52.6,0,2.1,600],[53.8,0,1.85,430],[54.6,0,1.85,430],[69.2,0,1.85,430]];
const WL=2.0, PIV=[0,WL];
const rot=(p,th)=>{const c=Math.cos(th),s=Math.sin(th),dx=p[0]-PIV[0],dy=p[1]-PIV[1];return[PIV[0]+dx*c-dy*s,PIV[1]+dx*s+dy*c]};
function body(th,w){const y0=WL-D;return[[-w/2,y0],[w/2,y0],[w/2,y0+HT],[-w/2,y0+HT]].map(p=>rot(p,th))}
function clipBelow(poly,yc){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length];const ia=a[1]<=yc,ib=b[1]<=yc;
 if(ia)out.push(a);if(ia!==ib){const k=(yc-a[1])/(b[1]-a[1]);out.push([a[0]+k*(b[0]-a[0]),yc])}}return out}
function centroid(P){let A=0,cx=0,cy=0;for(let i=0;i<P.length;i++){const[x0,y0]=P[i],[x1,y1]=P[(i+1)%P.length];const c=x0*y1-x1*y0;A+=c;cx+=(x0+x1)*c;cy+=(y0+y1)*c}A/=2;return[cx/(6*A),cy/(6*A)]}
function sarrow(tail,tip,col,w,a){if(a<=0)return;const[x1,y1]=proj(tail),[x2,y2]=proj(tip);const ang=Math.atan2(y2-y1,x2-x1),h=w*3;
 SV.push(`<g opacity="${a}"><line x1="${x1}" y1="${y1}" x2="${x2-Math.cos(ang)*h*.8}" y2="${y2-Math.sin(ang)*h*.8}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x2},${y2} L${x2-h*Math.cos(ang)+h*.6*Math.sin(ang)},${y2-h*Math.sin(ang)-h*.6*Math.cos(ang)} L${x2-h*Math.cos(ang)-h*.6*Math.sin(ang)},${y2-h*Math.sin(ang)+h*.6*Math.cos(ang)}Z" fill="${col}"/></g>`)}
function dot(p,col,a,lab,dx){if(a<=0)return;const q=proj(p);SV.push(`<circle cx="${q[0]}" cy="${q[1]}" r="16" fill="${col}" stroke="#15171A" stroke-width="4" opacity="${a}"/>`);
 if(lab)OV.push(`<div class="chip" style="left:${q[0]+dx}px;top:${q[1]}px;transform:translate(${dx>0?'0':'-100%'},-50%);opacity:${a};border-color:${col};color:#fff;font-size:36px;padding:6px 14px">${lab}</div>`)}
function eqPanel(t,t0,t1,lines){const pa=sm(t0,t0+.4,t)*(1-sm(t1-.4,t1,t));if(pa<=0)return;let h='';
 for(const[st,txt,cl]of lines){const k=lin(st,st+1.0,t);if(k<=0){h+='<div class="l"></div>';continue}
  const plain=txt.replace(/<[^>]+>/g,'');const n=Math.ceil(plain.length*k);let out='',cnt=0;for(let i=0;i<txt.length;i++){if(txt[i]==='<'){const j=txt.indexOf('>',i);out+=txt.slice(i,j+1);i=j;continue}if(cnt>=n)break;out+=txt[i];cnt++}
  for(const tg of['sub','sup'])if((out.match(new RegExp('<'+tg+'>','g'))||[]).length>(out.match(new RegExp('</'+tg+'>','g'))||[]).length)out+='</'+tg+'>';h+=`<div class="l ${cl}">${out}</div>`}
 OV.push(`<div id="eq" style="opacity:${pa};transform:translateY(${(1-sm(t0,t0+.5,t))*30}px);font-size:44px">${h}</div>`)}
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};
 g.clearRect(0,0,W,H);{const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#1a2a4a');gr.addColorStop(1,'#0a1122');g.fillStyle=gr;g.fillRect(0,0,W,H)}
 // tilt: a gentle rock (hook), a small test tilt (metacentre), then it tips over
 const rock=t<8?Math.sin(t*2.2)*.05*sm(3,4,t)*(1-sm(7,8,t)):0;
 const test=smr(32.5,33.8,t)*(1-smr(47.9,49.4,t))*0.20;
 const tip=smr(53.9,56.2,t)*(1-sm(58.0,58.6,t))*0.62;
 const th=rock+test+tip;const sink=(1-sm(17.0,19.5,t))*0.35*(t>13.6?1:0);
 const ws=sm(0.2,1.0,t);
 // water
 g.save();g.globalAlpha=ws;const wg=g.createLinearGradient(0,Y(WL),0,Y(WL-3.2));wg.addColorStop(0,'rgba(74,163,214,.85)');wg.addColorStop(1,'rgba(20,70,130,.95)');g.fillStyle=wg;g.fillRect(0,Y(WL),W,K(3.2));g.restore();
 // the cube (wood); during "sinking" it starts higher, then settles at depth D
 const cubeA=sm(0.3,1.0,t)*(1-sm(58.2,58.6,t));
 if(cubeA>0){const P=body(th,BW).map(p=>[p[0],p[1]+sink]);g.save();g.globalAlpha=cubeA;g.beginPath();g.moveTo(...proj(P[0]));for(const p of P.slice(1))g.lineTo(...proj(p));g.closePath();
  const wd=g.createLinearGradient(...proj(P[0]),...proj(P[2]));wd.addColorStop(0,'#a86a3c');wd.addColorStop(1,'#c8894f');g.fillStyle=wd;g.fill();g.lineWidth=5;g.strokeStyle='#5a3418';g.stroke();
  for(let i=1;i<4;i++){const a=P[0].map((v,j)=>v+(P[3][j]-v)*i/4),b=P[1].map((v,j)=>v+(P[2][j]-v)*i/4);line([proj(a),proj(b)],2,'rgba(90,52,24,.45)')}g.restore();
  // water in front (transparent) so the cube looks submerged
  g.save();g.globalAlpha=.35*ws;g.fillStyle='#2d6fa8';g.fillRect(0,Y(WL),W,K(3.2));g.restore();line([[0,Y(WL)],[W,Y(WL)]],5,'#bfe8ff');
  // displaced water outline
  const sub=clipBelow(P,WL);const da=sm(10.0,11.0,t)*(1-sm(21.5,22.0,t))+sm(27.0,27.6,t)*(1-sm(58.0,58.4,t));
  if(da>0&&sub.length>2)SV.push(`<path d="M${sub.map(proj).join(' L')}Z" fill="rgba(61,240,216,.18)" stroke="#3df0d8" stroke-width="4" stroke-dasharray="12 8" opacity="${Math.min(1,da)}"/>`);
  // weight down, buoyancy up
  const fa=sm(11.0,11.8,t)*(1-sm(21.5,22.0,t));const Bc=centroid(sub);const Gc=rot([0,WL-D+KG],th).map((v,j)=>j?v+sink:v);
  sarrow(Gc,[Gc[0],Gc[1]-.75],'#ff7a6a',12,fa);sarrow([Bc[0],Bc[1]-.05],[Bc[0],Bc[1]+.95],'#3df0d8',12,fa);
  chip([Gc[0]+.55,Gc[1]-.55],`W = ${f2(W_KN)} kN`,'am',fa*sm(16.7,17.3,t),0);chip([Bc[0]-.5,Bc[1]+.95],`F<sub>B</sub> = ${f2(W_KN)} kN`,'te',fa*sm(19.0,19.6,t),0);
  // depth and size labels
  const dl=sm(18.7,19.5,t)*(1-sm(21.5,22.0,t));if(dl>0){const A=proj([BW/2+.18,WL]),Bp=proj([BW/2+.18,WL-D]);SV.push(`<g opacity="${dl}" stroke="#fff" stroke-width="5"><line x1="${A[0]}" y1="${A[1]}" x2="${Bp[0]}" y2="${Bp[1]}"/><line x1="${A[0]-16}" y1="${A[1]}" x2="${A[0]+16}" y2="${A[1]}"/><line x1="${Bp[0]-16}" y1="${Bp[1]}" x2="${Bp[0]+16}" y2="${Bp[1]}"/></g>`);
   OV.push(`<div class="chip wh" style="left:${A[0]+24}px;top:${(A[1]+Bp[1])/2}px;transform:translate(0,-50%);opacity:${dl}">d = ${D.toFixed(1)} m</div>`)}
  chip([0,WL-D+HT+sink+.05],`${BW} m cube · S = ${S}`,'wh',sm(13.8,14.4,t)*(1-sm(18.6,19.0,t)),-14);
  // G, B, M
  const ga=sm(21.7,22.3,t)*(1-sm(58.0,58.4,t));dot(Gc,'#ff7a6a',ga,'G'+(t<32.3?' · '+KG+' m':''),-30);
  const ba=sm(27.1,27.7,t)*(1-sm(58.0,58.4,t));dot(Bc,'#3df0d8',ba,'B'+(t<32.3?' · '+KB+' m':''),30);
  if(t>32.4&&t<58.4){const ax0=rot([0,WL-D],th),ax1=rot([0,WL-D+HT+.35],th);const aa=sm(32.5,33.2,t)*(1-sm(58.0,58.4,t));
   SV.push(`<line x1="${proj(ax0)[0]}" y1="${proj(ax0)[1]}" x2="${proj(ax1)[0]}" y2="${proj(ax1)[1]}" stroke="#fff" stroke-width="3" stroke-dasharray="10 8" opacity="${aa}"/>`);
   // vertical line through B meets the axis at M
   const ux=ax1[0]-ax0[0],uy=ax1[1]-ax0[1];const k=Math.abs(ux)>1e-4?(Bc[0]-ax0[0])/ux:null;
   if(k!==null&&th>0.05){const M=[ax0[0]+k*ux,ax0[1]+k*uy];const ma=sm(34.6,35.4,t)*(1-sm(58.0,58.4,t));
    SV.push(`<line x1="${proj(Bc)[0]}" y1="${proj(Bc)[1]}" x2="${proj(Bc)[0]}" y2="${proj([0,Math.max(M[1],Bc[1])+.25])[1]}" stroke="#3df0d8" stroke-width="4" opacity="${ma}"/>`);dot(M,'#ffc244',ma,'M',30)}}
  // "tips over" label
  if(tip>0.02)OV.push(`<div class="chip am big" style="left:540px;top:1330px;transform:translate(-50%,0);opacity:${sm(53.9,54.5,t)*(1-sm(57.8,58.2,t))}">tips over!</div>`)}
 // ship: M above G (stable)
 const sh=sm(58.2,58.8,t)*(1-sm(60.6,61.0,t));if(sh>0){const cx=540,cy=Y(WL);SV.push(`<g opacity="${sh}"><path d="M${cx-330},${cy-90} L${cx+330},${cy-90} L${cx+250},${cy+80} L${cx-250},${cy+80}Z" fill="#c9ced6" stroke="#2b303c" stroke-width="6"/><rect x="${cx-120}" y="${cy-200}" width="240" height="110" fill="#e8762a" stroke="#2b303c" stroke-width="5"/></g>`);
  dot([0,WL+1.0],'#ffc244',sh,'M',30);dot([0,WL+.25],'#ff7a6a',sh,'G',30);OV.push(`<div class="chip te big" style="left:540px;top:${cy+120}px;transform:translate(-50%,0);opacity:${sh}">wide base: M above G</div>`)}
 // equations
 eqPanel(t,38.7,49.6,[[38.8,'BM = I/V = b²/(12 d)',''],[40.4,`= 1/(12 × ${D.toFixed(1)}) = ${f3(BM)} m`,'hi'],[44.9,`BG = ${KG} − ${KB} = ${BG.toFixed(1)} m`,''],[46.0,`GM = BM − BG = ${f2(GM)} m`,'am2']]);
 if(t>=47.6&&t<49.6)OV.push(`<div class="chip am big" style="left:540px;top:1330px;transform:translate(-50%,0);opacity:${sm(47.6,48.0,t)*(1-sm(49.2,49.6,t))}">GM &lt; 0 → unstable</div>`);
 // your turn: a wide, flat block
 if(t>60.8&&t<64.6){const a=sm(60.8,61.3,t)*(1-sm(64.1,64.6,t));const cx=540,cy=Y(WL);SV.push(`<g opacity="${a}"><rect x="${cx-360}" y="${cy-K(.24)}" width="720" height="${K(.4)}" fill="#c8894f" stroke="#5a3418" stroke-width="5"/></g>`);
  OV.push(`<div class="chip am big" style="left:540px;top:${cy+K(.35)}px;transform:translate(-50%,0);opacity:${a*sm(62.2,62.7,t)}">GM = ?</div>`);
  OV.push(`<div id="q" style="top:430px;opacity:${a}">A <span>wide, flat</span> block:<br>how does GM change?</div>`)}
 OV.unshift(`<div id="top" style="opacity:${t<64.2?1:0}"><span>BUOYANCY · METACENTRE</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,9.15,'THE IDEA');sticker(t,38.8,'THE MATH');sticker(t,58.2,'REAL LIFE');sticker(t,60.8,'YOUR TURN');
 wipe(t,38.8);wipe(t,58.2);wipe(t,60.8);
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 const e=sm(64.3,65.1,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)"><div class="phone" style="height:860px"><div class="scr">
  <div class="hd">Engineering Guide<br>by IQRA<small>FLUID MECHANICS · LESSON</small></div>
  <div class="card"><h3>Buoyancy</h3>
  <svg viewBox="0 0 400 190" width="100%"><rect x="0" y="90" width="400" height="100" fill="#2d6fa8"/><line x1="0" y1="90" x2="400" y2="90" stroke="#bfe8ff" stroke-width="4"/><rect x="140" y="40" width="120" height="120" fill="#c8894f" stroke="#5a3418" stroke-width="5"/>
  <text x="200" y="30" fill="#ffb020" font-size="32" font-weight="900" font-family="Inter" text-anchor="middle">GM = ?</text></svg>
  <div class="sl"></div><div style="font:600 22px Inter;color:#9fb0cc">Change the width and the density</div></div>
  <div class="card" style="font:700 30px/1.6 Inter"><span style="color:#fff">Wide, flat block: GM <b style="color:#ffb020">?</b></span></div>
  </div></div><div class="cta" style="margin-top:36px;font-size:56px">Try it in the<br><span>Engineering Guide<br>by IQRA</span> app</div>
  <div style="margin-top:30px;padding:16px 34px;border-radius:44px;background:#FF5A2A;color:#fff;font:800 40px/1.25 Inter;text-align:center;opacity:${sm(65.1,65.7,t)}">Like &amp; Subscribe<br><span style="font-weight:600;font-size:32px">for more Engineering Guide videos</span></div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
window.renderAt=render;
