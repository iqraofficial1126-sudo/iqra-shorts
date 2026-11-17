// ===== Short #36: Why are dam walls thicker at the bottom? (Hydrostatic force, `hyd`) =====
// App defaults (lesson hyd): vertical rectangular gate, top edge a = 1 m below the surface, height H = 2 m, width b = 1.5 m.
// App result: F = 58.86 kN. Checked independently: F = rho g hbar A = 1000*9.81*2*3 = 58,860 N.
// Centre of pressure: h* = hbar + IG/(A hbar) = 2 + (1.5*2^3/12)/(3*2) = 2.167 m.
const PUNCH=[[0.15,.12],[13.2,.08],[16.6,.10],[36.6,.07],[44.2,.06],[55.4,.06]];
const HOOK='Why are dam walls<br><span>THICKER</span> at the bottom?';
const T_END=66;
const CAPS=[
[3.0,6.6,'A dam holds back a whole <b>lake</b>.'],
[6.6,10.2,'But the water does not push <i>equally</i> everywhere.'],
[10.6,14.2,'The <b>deeper</b> you go, the harder it pushes.'],
[14.2,18.2,'<i>p = ρ g h</i>: pressure grows in a straight line with depth.'],
[18.6,22.4,'A thin wall would bend most at its <b>base</b>…'],
[22.4,26.0,'…and crack on the <b>water side</b>, where it is stretched.'],
[26.4,30.4,'So engineers make the base <i>thick</i>, and the top thin.'],
[33.2,36.6,'Now a <b>gate</b> in the wall: 1.5 m wide, 2 m tall.'],
[36.6,40.4,'Its top edge is <b>1 m</b> below the water.'],
[44.6,47.0,'h̄ = depth of the gate’s <i>centroid</i>.'],[47.2,51.2,'The push acts <b>lower</b>, at h*: the <i>centre of pressure</i>.'],
[51.2,55.0,'…because the <b>bottom</b> is pushed harder than the top.'],
[57.6,61.6,'Move the gate <b>1 m deeper</b>. What are h̄, h* and F?'],
];
const CAMS=[[0,-.6,6.5,62],[3,-.8,6.4,64],[10,-1.8,6.0,60],[18,-.6,6.2,62],[26,-.8,6.4,62],[31,-.8,6.4,62],[34,-1.2,8.1,190],[44,-1.2,8.0,200],[52,-1.0,7.9,205],[57,-1.2,7.4,150],[62,-1.2,7.2,150],[66,-1.2,7.2,150]];
const RHO=1000,GV=9.81,SURF=10,DAMH=12;
function harrow(tip,len,col,a=1,w=.12,hw=.24,hlmax=.6){ // horizontal arrow pointing +x, tip at world point
 if(len<.03||a<=0)return;const hl=Math.min(hlmax,len*.45);const tx=X(tip[0]),ty=Y(tip[1]),bx=X(tip[0]-len),nx=X(tip[0]-hl);
 g.save();g.globalAlpha=a;g.shadowColor=col;g.shadowBlur=18;g.beginPath();g.moveTo(bx,ty-K(w/2));g.lineTo(nx,ty-K(w/2));g.lineTo(nx,ty-K(hw));g.lineTo(tx,ty);g.lineTo(nx,ty+K(hw));g.lineTo(nx,ty+K(w/2));g.lineTo(bx,ty+K(w/2));g.closePath();
 g.fillStyle=col;g.fill();g.shadowBlur=0;g.lineWidth=2;g.strokeStyle='rgba(255,255,255,.7)';g.stroke();g.restore()}
function water(t){const top=Y(SURF),x0=0,x1=X(0);const gr=g.createLinearGradient(0,top,0,Y(0));gr.addColorStop(0,'#5fb6e6');gr.addColorStop(1,'#1f5f93');
 g.fillStyle=gr;g.fillRect(x0,top,x1-x0,Y(0)-top);
 g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=4;g.beginPath();for(let x=0;x<=x1;x+=12){const yy=top+Math.sin(x*.03+t*2.2)*4;x?g.lineTo(x,yy):g.moveTo(x,yy)}g.stroke();
 g.fillStyle='rgba(255,255,255,.12)';for(let i=0;i<14;i++){const bx=((i*137+t*30)%Math.max(1,x1));const by=Y(SURF-1-(i*1.7)%8.5);g.beginPath();g.arc(bx,by,6+(i%3)*3,0,7);g.fill()}}
function damShape(thin,bendA){ // thin: 0 = trapezoid dam, 1 = thin uniform wall. bendA: tip deflection (m, exaggerated)
 const pts=[];const n=24;const wTop=lerp(2,1,thin),wBase=lerp(9,1,thin);
 const def=y=>bendA*Math.pow(y/DAMH,2)*(3-y/DAMH)/2; // cantilever-like deflected shape
 for(let i=0;i<=n;i++){const y=DAMH*i/n;pts.push([0+def(y),y])}
 for(let i=n;i>=0;i--){const y=DAMH*i/n;const w=lerp(wBase,wTop,y/DAMH);pts.push([w+def(y),y])}
 g.beginPath();pts.forEach((p,i)=>i?g.lineTo(X(p[0]),Y(p[1])):g.moveTo(X(p[0]),Y(p[1])));g.closePath();
 const gr=g.createLinearGradient(X(0),0,X(9),0);gr.addColorStop(0,'#cfc9be');gr.addColorStop(1,'#a8a093');g.fillStyle=gr;g.fill();g.lineWidth=5;g.strokeStyle='rgba(40,40,50,.55)';g.stroke();
 g.strokeStyle='rgba(60,50,40,.18)';g.lineWidth=2;for(let y=1.5;y<DAMH;y+=1.5){const w=lerp(wBase,wTop,y/DAMH);g.beginPath();g.moveTo(X(def(y)),Y(y));g.lineTo(X(w+def(y)),Y(y));g.stroke()}}
function pressureArrows(t0,t,maxDepth,scale,step=1,yTop=SURF,a=1){let k=0;
 for(let d=step;d<=maxDepth+1e-6;d+=step){const ap=sm(t0+k*.12,t0+k*.12+.35,t)*a;k++;if(ap<=0)continue;harrow([0,yTop-d],d*scale*ap,C.AM,1)}}
function vdim(x,y0,y1,label,col,a){const A=proj([x,y0]),B=proj([x,y1]);SV.push(`<g opacity="${a}" stroke="${col}" stroke-width="5" fill="${col}"><line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]-14}"/><path d="M${B[0]-12} ${B[1]-18} L${B[0]+12} ${B[1]-18} L${B[0]} ${B[1]}z" stroke="none"/><line x1="${A[0]-16}" y1="${A[1]}" x2="${A[0]+16}" y2="${A[1]}"/></g>`);OV.push(`<div class="chip" style="left:${B[0]}px;top:${B[1]+16}px;transform:translate(-50%,0);text-align:center;border-color:${col};color:${col};opacity:${a};font-size:34px;padding:6px 14px">${label}</div>`)}
function dashH(x0,x1,y,col,a){const A=proj([x0,y]),B=proj([x1,y]);SV.push(`<line opacity="${a*.7}" x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="${col}" stroke-width="3" stroke-dasharray="10 8"/>`)}
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};
 if(t>13.2&&t<14){CAM.cy+=Math.sin((t-13.2)*60)*Math.exp(-(t-13.2)*6)*.12}
 g.clearRect(0,0,W,H);background(t);
 water(t);
 // ---- phase A: whole dam, pressure grows with depth ----
 const thin=sm(18.4,19.6,t)*(1-sm(26.2,27.6,t));
 const bend=thin>0?1.6*sm(19.6,21.8,t)*(1-sm(26.0,26.8,t)):0;
 damShape(thin,bend);
 if(t<32){
  const pa=1-sm(30.5,31.5,t);
  pressureArrows(10.6,t,10,.55,1,SURF,pa);
  // pressure triangle outline
  const tri=sm(14.4,15.6,t)*pa;if(tri>0){g.save();g.globalAlpha=tri;g.setLineDash([14,10]);g.lineWidth=5;g.strokeStyle='#FF5A2A';g.beginPath();g.moveTo(X(0),Y(SURF));g.lineTo(X(-10*.55),Y(0));g.lineTo(X(0),Y(0));g.stroke();g.restore()}
  // depth chips (p = rho g h, computed here)
  for(const[d,t0]of[[2,15.2],[6,15.8],[10,16.6]]){const p=RHO*GV*d/1000;chip([-d*.55-.4,SURF-d+.35],`<small>${d} m</small>${p.toFixed(1)} kPa`,'am',sm(t0,t0+.4,t)*pa,0)}
  // thin wall: stress at base, crack on the water side
  if(thin>.5){const s=sm(20.6,21.6,t)*(1-sm(26,26.6,t));
   if(s>0){g.save();g.globalAlpha=s;const gr=g.createRadialGradient(X(0),Y(.3),5,X(0),Y(.3),K(2.2));gr.addColorStop(0,'rgba(255,60,40,.85)');gr.addColorStop(1,'rgba(255,60,40,0)');g.fillStyle=gr;g.fillRect(X(-2.4),Y(2.5),K(5),K(2.5));g.restore();
    chip([.5,2.6],'tension → crack','am',s,0);
    const cr2=sm(22.6,23.4,t);if(cr2>0){g.save();g.strokeStyle='#2b1a14';g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(X(0),Y(.6));g.lineTo(X(.25*cr2),Y(.9));g.lineTo(X(.15*cr2),Y(1.2));g.lineTo(X(.45*cr2),Y(1.5));g.stroke();g.restore()}}}
  const dl=sm(27.4,28.4,t)*(1-sm(30.4,31.2,t));if(dl>0){dimLine([0,-.6],[9,-.6],'thick base',dl,'#ffffff');dimLine([0,DAMH+.9],[2,DAMH+.9],'thin top',dl,'#26303f')}
 }
 // ---- phase B: the gate ----
 const gA=sm(32.2,33.4,t)*(1-sm(61.6,62,t));const gDrop=sm(57.6,58.8,t);const phaseB=1-sm(56.4,57.0,t);
 if(gA>0){
  const gt=SURF-1-gDrop,gb=SURF-3-gDrop; // gate top y=9, bottom y=7
  g.save();g.globalAlpha=gA;rr(X(-.12),Y(gt),K(.24),K(2),6);g.fillStyle='#4a5566';g.fill();g.lineWidth=4;g.strokeStyle='#ffb020';g.stroke();g.restore();
  // pressure on gate: trapezoid arrows from depth 1 to 3
  const ar=sm(40.6,41.8,t)*gA*phaseB;
  for(let i=0;i<=8;i++){const d=1+2*i/8;const ap=sm(40.6+i*.08,41.2+i*.08,t)*gA*phaseB;if(ap>0)harrow([-.14,SURF-d],d*.55*ap,C.AM,1,.045,.1,.22)}
  if(ar>0){g.save();g.globalAlpha=ar;g.setLineDash([10,8]);g.lineWidth=4;g.strokeStyle='#FF5A2A';g.beginPath();g.moveTo(X(-.14-.55),Y(gt));g.lineTo(X(-.14-1.65),Y(gb));g.stroke();g.restore()}
  chip([-.14,gt+.15],gDrop>.5?'top: 2 m deep':'top: 1 m deep','wh',sm(37.2,37.8,t)*gA*(1-sm(43.2,43.6,t)+sm(57.6,58.2,t)),-6);
  dimLine([.45,gt],[.45,gb],'',0);
  // centroid and centre of pressure
  const cA=sm(44.6,45.2,t)*gA*phaseB;if(cA>0){circ(X(0),Y(SURF-2),K(.09),'#ffffff');vdim(-3.1,SURF,SURF-2,'h̄ = 2 m<br><span style="font-size:24px">centroid depth</span>','#ffffff',cA);dashH(-3.1,0,SURF-2,'#ffffff',cA)}
  const pA=sm(48.6,49.4,t)*gA*phaseB;if(pA>0){circ(X(0),Y(SURF-2.167),K(.11),'#ff3b2a');harrow([-.05,SURF-2.167],.55,'#ff3b2a',pA,.06,.13,.25);vdim(-1.8,SURF,SURF-2.167,'h* = 2.17 m<br><span style="font-size:24px">centre of pressure</span>','#ffc244',pA);dashH(-1.8,0,SURF-2.167,'#ffc244',pA)}
  const qA=sm(58.8,59.4,t)*gA;if(qA>0){chip([.9,SURF-1.5-gDrop],'h̄ = ?','wh big',qA,0);chip([.9,SURF-2.6-gDrop],'h* = ?','am big',qA,0)}
 }
 // ---- equation panel ----
 const eqA=sm(43.6,44.1,t)*phaseB;
 if(eqA>0){const lines=[[43.8,'F = ρ g h̄ A',''],[44.8,'h̄ = 2 m,   A = 1.5 × 2 = 3 m²',''],[45.4,'F = 1000 × 9.81 × 2 × 3',''],[46.2,'   = 58.86 kN','hi'],[49.6,'h* = h̄ + I<sub>G</sub> ÷ (A h̄) = 2.17 m','am2']];
  let h='';for(const[st,txt,cl]of lines){const k=lin(st,st+1.0,t);if(k<=0){h+='<div class="l"></div>';continue}
   const plain=txt.replace(/<[^>]+>/g,'');const n=Math.ceil(plain.length*k);let out='',cnt=0;for(let i=0;i<txt.length;i++){if(txt[i]==='<'){const j=txt.indexOf('>',i);out+=txt.slice(i,j+1);i=j;continue}if(cnt>=n)break;out+=txt[i];cnt++}
   if((out.match(/<sub>/g)||[]).length>(out.match(/<\/sub>/g)||[]).length)out+='</sub>';h+=`<div class="l ${cl}">${out}</div>`}
  OV.push(`<div id="eq" style="opacity:${eqA};transform:translateY(${(1-sm(43.6,44.2,t))*30}px)">${h}</div>`)}
 if(t>41.8&&t<43.6)OV.push(`<div id="q" style="top:430px;opacity:${sm(41.8,42.1,t)*(1-sm(43.3,43.6,t))}">F = <span>?</span></div>`);
 // ---- your turn ----
 if(t>57.2&&t<62){const a=sm(57.2,57.6,t)*(1-sm(61.6,62,t));OV.push(`<div id="q" style="top:500px;opacity:${a}">Gate 1 m deeper:<br>h̄ = <span>?</span>&nbsp; h* = <span>?</span>&nbsp; F = <span>?</span></div>`)}
 // ---- overlays & fx ----
 const topA=t<62?1:0;
 OV.unshift(`<div id="top" style="opacity:${topA}"><span>HYDROSTATIC FORCE</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,3.0,'THE IDEA');sticker(t,31.6,'THE MATH');sticker(t,57.0,'YOUR TURN');
 wipe(t,32);wipe(t,57);
 if(t>=46.4&&t<47.1)burst(330,520,46.4,t,'#3df0d8');if(t>=13.2&&t<13.9){const p=proj([0,0]);burst(p[0],p[1]-40,13.2,t,'#FF5A2A')}
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 // end card
 const e=sm(62,62.8,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)"><div class="phone"><div class="scr">
  <div class="hd">Engineering Guide<br>by IQRA<small>FLUID MECHANICS · LESSON</small></div>
  <div class="card"><h3>Hydrostatic force</h3>
  <svg viewBox="0 0 400 220" width="100%"><rect x="0" y="20" width="250" height="190" fill="#3b8fc6" opacity=".7"/><path d="M250 20 L250 210 L390 210 L280 20z" fill="#bdb8ae"/>
  <path d="M250 40 L240 40 M250 90 L215 90 M250 140 L190 140 M250 190 L165 190" stroke="#ffb020" stroke-width="7" stroke-linecap="round"/><path d="M250 20 L160 210" stroke="#FF5A2A" stroke-width="3" stroke-dasharray="8 6"/></svg>
  <div class="sl"></div><div style="font:600 22px Inter;color:#9fb0cc">Depth of top edge = 2.0 m</div></div>
  <div class="card" style="font:700 30px/1.6 Inter;font-variant-numeric:tabular-nums"><span style="color:#fff">h̄ = <b style="color:#ffb020">?</b></span><br><span style="color:#fff">h* = <b style="color:#ffb020">?</b></span><br><span style="color:#fff">F = <b style="color:#ffb020">?</b></span></div>
  </div></div><div class="cta">Try it in the<br><span>Engineering Guide<br>by IQRA</span> app</div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
window.renderAt=render;
