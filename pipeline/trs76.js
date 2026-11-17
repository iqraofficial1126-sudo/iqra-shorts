// ===== Short #76: How does a roof truss hold 20 kN? (Truss: method of joints, `trs`) =====
// App defaults: P = 20 kN at apex, span L = 6 m, rise h = 3 m. tan(alpha) = 2h/L.
const PUNCH=[[0.15,.12],[8.6,.09],[19.8,.06],[24.9,.05],[46.6,.05],[50.6,.04]];
const HOOK='A roof truss is just <span>STICKS</span>.<br>How does it<br>hold <span>20&nbsp;kN</span>?';
const T_END=66;
const P=20,SPAN=6,RISE=3,YS=3.0; // joints: A(-3,3) B(3,3) apex(0,6)
const ALPHA=Math.atan2(2*RISE,SPAN);
const RA=P/2, CF=P/(2*Math.sin(ALPHA)), TF=CF*Math.cos(ALPHA); // computed here, never typed in
const CAPS=[
[3.0,7.8,'A roof truss: two <b>rafters</b> and a <b>tie</b>.'],
[8.0,11.8,'<b>20 kN</b> on top. Each support pushes up <i>10 kN</i>.'],
[12.2,17.8,'Each member is only <b>pushed</b> or <b>pulled</b>. No bending.'],
[18.2,23.8,'Take away the tie: the feet <b>spread</b> and the roof drops.'],
[24.2,27.6,'So the tie <b>pulls</b> them back.'],
[27.6,31.2,'Rafters: <i>compression</i>. Tie: <b>tension</b>.'],
[32.2,36.2,'<i>Method of joints</i>: one joint at a time.'],
[36.4,42.8,'At A: <i>10 kN</i> up, rafter <b>C</b> and tie <b>T</b>.'],
[52.4,56.8,'Roofs, bridge girders, bicycle frames: all <b>triangles</b>.'],
[57.6,61.6,'Make the roof flatter: rise <b>1.5 m</b>. What are C and T?'],
];
const CAMS=[[0,0,4.2,118],[3,0,4.0,124],[8,0,4.3,124],[12,0,4.2,128],[18,.5,4.0,116],[24,.5,4.0,116],[31,0,4.2,124],[33,-2.2,3.7,250],[43,-2.2,3.7,255],[51,-2.2,3.7,255],[53,0,4.1,120],[56.7,0,4.1,122],[57.15,0,5.0,124],[62,0,5.0,128],[66,0,5.0,128]];
const BLUE='#3d84e0',ORG='#ff9a1a',WOOD='#b07a48';
function arrowV(p0,p1,col,a=1,w=.11){if(a<=0)return;const A=proj(p0),B=proj(p1);const dx=B[0]-A[0],dy=B[1]-A[1],L=Math.hypot(dx,dy);if(L<4)return;const ux=dx/L,uy=dy/L,hl=Math.min(K(.34),L*.5),hw=K(.17),ww=K(w)/2;
 const nx=B[0]-ux*hl,ny=B[1]-uy*hl;g.save();g.globalAlpha=a;g.shadowColor=col;g.shadowBlur=24;g.beginPath();
 g.moveTo(A[0]-uy*ww,A[1]+ux*ww);g.lineTo(nx-uy*ww,ny+ux*ww);g.lineTo(nx-uy*hw,ny+ux*hw);g.lineTo(B[0],B[1]);g.lineTo(nx+uy*hw,ny-ux*hw);g.lineTo(nx+uy*ww,ny-ux*ww);g.lineTo(A[0]+uy*ww,A[1]-ux*ww);g.closePath();
 g.fillStyle=col;g.fill();g.shadowBlur=0;g.lineWidth=3;g.strokeStyle='rgba(255,255,255,.8)';g.stroke();g.restore()}
// a member: state +1 compression (thicker, chevrons squeeze inward), -1 tension (thinner, chevrons pull outward)
function member(p,q,col,state,amt,t,a=1){if(a<=0)return;const A=proj(p),B=proj(q);const w=K(.17)*(1+.22*state*amt);
 g.save();g.globalAlpha=a;g.lineCap='round';g.beginPath();g.moveTo(A[0],A[1]);g.lineTo(B[0],B[1]);g.lineWidth=w+8;g.strokeStyle='#2b303c';g.stroke();g.lineWidth=w;g.strokeStyle=col;g.stroke();
 if(amt>0&&state!==0){const dx=B[0]-A[0],dy=B[1]-A[1],L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L,s=K(.07);g.strokeStyle=`rgba(255,255,255,${.85*amt})`;g.lineWidth=5;
  for(let i=0;i<6;i++){let f=((i/6)+t*.35)%1;// position from 0..1 along half
   for(const side of[0,1]){let u=state>0?f*.5:.5-f*.5;const pos=side?1-u:u;if(pos<.06||pos>.94)continue;const cx=A[0]+dx*pos,cy=A[1]+dy*pos;
    let d=(side?-1:1)*(state>0?1:-1);// direction the chevron points along the bar
    g.beginPath();g.moveTo(cx-ux*s*d-uy*s,cy-uy*s*d+ux*s);g.lineTo(cx,cy);g.lineTo(cx-ux*s*d+uy*s,cy-uy*s*d-ux*s);g.stroke()}}}
 g.restore()}
function joint(p,a=1,r=.11){if(a<=0)return;g.save();g.globalAlpha=a;circ(X(p[0]),Y(p[1]),K(r),'#2b303c');circ(X(p[0]),Y(p[1]),K(r*.5),'#d9dde3');g.restore()}
function pillar(x0,x1,top){rr(X(x0),Y(top),K(x1-x0),K(top),6);g.fillStyle='#c98a63';g.fill();g.lineWidth=4;g.strokeStyle='rgba(60,30,20,.4)';g.stroke();
 g.strokeStyle='rgba(90,45,30,.35)';g.lineWidth=2;for(let r=1;r<top/.3;r++){g.beginPath();g.moveTo(X(x0),Y(r*.3));g.lineTo(X(x1),Y(r*.3));g.stroke()}}
function house(){g.fillStyle='#f3e6cf';g.fillRect(X(-2.65),Y(2.55),K(5.3),K(2.55));
 rr(X(-.45),Y(1.5),K(.9),K(1.5),6);g.fillStyle='#8a5a36';g.fill();
 for(const wx of[-1.9,1.3]){rr(X(wx),Y(1.9),K(.6),K(.6),6);g.fillStyle='#9fd3f0';g.fill();g.lineWidth=5;g.strokeStyle='#fff';g.stroke()}
 pillar(-3.35,-2.65,2.7);pillar(2.65,3.35,2.7);rr(X(2.6),Y(2.72),K(1.9),K(.14),4);g.fillStyle='#8b8f97';g.fill()}
function dimV(x,y0,y1,label,col,a){if(a<=0)return;const A=proj([x,y0]),B=proj([x,y1]);
 SV.push(`<g opacity="${a}" stroke="${col}" stroke-width="5" stroke-linecap="round"><line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}"/><line x1="${A[0]-18}" y1="${A[1]}" x2="${A[0]+18}" y2="${A[1]}"/><line x1="${B[0]-18}" y1="${B[1]}" x2="${B[0]+18}" y2="${B[1]}"/></g>`);
 OV.push(`<div class="chip wh" style="left:${A[0]+28}px;top:${(A[1]+B[1])/2}px;transform:translate(0,-50%);font-size:36px;padding:6px 16px;opacity:${a}">${label}</div>`)}
function eqPanel(t,t0,t1,lines){const pa=sm(t0,t0+.4,t)*(1-sm(t1-.4,t1,t));if(pa<=0)return;let h='';
 for(const[st,txt,cl]of lines){const k=lin(st,st+1.0,t);if(k<=0){h+='<div class="l"></div>';continue}
  const plain=txt.replace(/<[^>]+>/g,'');const n=Math.ceil(plain.length*k);let out='',cnt=0;for(let i=0;i<txt.length;i++){if(txt[i]==='<'){const j=txt.indexOf('>',i);out+=txt.slice(i,j+1);i=j;continue}if(cnt>=n)break;out+=txt[i];cnt++}
  if((out.match(/<sub>/g)||[]).length>(out.match(/<\/sub>/g)||[]).length)out+='</sub>';h+=`<div class="l ${cl}">${out}</div>`}
 OV.push(`<div id="eq" style="opacity:${pa};transform:translateY(${(1-sm(t0,t0+.5,t))*30}px)">${h}</div>`)}
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};
 if(t>8.6&&t<9.4){CAM.cy+=Math.sin((t-8.6)*60)*Math.exp(-(t-8.6)*6)*.08}
 g.clearRect(0,0,W,H);background(t);house();
 // ---- geometry: roller B slides (tie stretch, collapse, flatter roof) ----
 const Lr=Math.hypot(SPAN/2,RISE);
 const flat=sm(57.8,59.2,t); const rise=lerp(RISE,1.5,flat);
 let s=.15*sm(12.6,14,t)*(1-sm(18.2,18.8,t)) + 1.2*smr(19.4,22.4,t)*(1-smr(24.6,26,t)) + .15*sm(25.6,26.4,t);
 const Ax=-SPAN/2, Bx=SPAN/2+s;
 let hs=(Bx-Ax)/2, apx=(Ax+Bx)/2, apy;
 if(flat>0){ // flatter roof for "your turn": same span, new rise
  apy=YS+rise; } else apy=YS+Math.sqrt(Math.max(.01,Lr*Lr-hs*hs));
 const A=[Ax,YS],B=[Bx,YS],T=[apx,apy];
 // supports
 pinSup(Ax,2.72,1);rollSup(Bx,2.72,1);
 // member states
 const loaded=sm(12.6,13.6,t);const tieA=1-sm(18.4,19.0,t)+sm(24.2,24.8,t);
 const tieShow=clamp(tieA);
 const cc=loaded>0?BLUE:WOOD, tc=ORG;
 const rafCol=t<12.6?WOOD:BLUE, tieCol=t<13.4?WOOD:ORG;
 const stA=sm(12.6,13.4,t)*(1-sm(18.4,19,t))+sm(25,25.8,t);
 const stT=sm(13.4,14.2,t)*(1-sm(18.4,19,t))+sm(25,25.8,t);
 const focus=sm(32.4,33.4,t)*(1-sm(51.6,52.6,t)); // dim the far members in the joint close-up
 member(A,T,rafCol,1,clamp(stA),t,1);member(T,B,rafCol,1,clamp(stA),t,1-.55*focus);
 // the tie
 if(tieShow>0){let tB=B;if(t>24.2&&t<25.2){const u=sm(24.2,25,t);tB=[lerp(A[0]+.3,B[0],u),YS]}member(A,tB,tieCol,-1,clamp(stT),t,tieShow*(1-.55*focus*0))}
 joint(A);joint(B);joint(T);
 // collapse cue
 const cl=sm(19.6,20.2,t)*(1-sm(23.6,24.2,t));if(cl>0){arrowV([Bx+.2,YS+.25],[Bx+1.1,YS+.25],'#ff3b2a',cl,.1);arrowV([Ax-.2,YS+.25],[Ax-.9,YS+.25],'#ff3b2a',cl*.5,.1);chip([apx,YS+.35],'feet spread → roof drops','am',cl,0)}
 // tie pulls back
 const pb=sm(24.8,25.4,t)*(1-sm(27.4,28,t));if(pb>0){arrowV([Bx-.1,YS-.45],[Bx-1.0,YS-.45],ORG,pb,.1);arrowV([Ax+.1,YS-.45],[Ax+1.0,YS-.45],ORG,pb,.1)}
 // labels
 const la=sm(4.0,4.6,t)*(1-sm(11.6,12.2,t));chip([-1.9,4.9],'rafter','wh',la,0);chip([1.9,4.9],'rafter','wh',la,0);chip([-1.2,YS-.05],'tie','wh',la,'below');
 const dl=sm(5.2,6.0,t)*(1-sm(11.6,12.2,t));dimLine([Ax,.9],[SPAN/2,.9],'span 6 m',dl,'#ffffff');dimV(0,YS+.12,YS+RISE-.12,'rise 3 m','#ffffff',dl);
 chip([Ax,YS-.62],'A','wh big',sm(5.0,5.6,t)*(1-sm(11.6,12.2,t))+0,'below');chip([Ax-.75,YS+.45],'A','wh big',sm(33.6,34.2,t)*(1-sm(51.4,52,t)),0);chip([SPAN/2,YS-.62],'B','wh big',sm(5.0,5.6,t)*(1-sm(11.6,12.2,t)),'below');
 const cs=sm(27.8,28.4,t)*(1-sm(31,31.6,t));chip([-1.7,5.3],'compression','wh',cs,0);chip([0,YS-.12],'tension','am',cs,'below');
 // load and reactions
 const drop=t<8.6?Math.max(0,(8.6-t))*6:0;const ly=apy+.02+Math.min(drop,10);const lA=sm(7.9,8.1,t)*(1-sm(31.4,32,t)+sm(52.4,53,t))*(1-sm(61.4,61.8,t));
 if(lA>0){g.save();g.globalAlpha=lA;rr(X(apx-.4),Y(ly+.7),K(.8),K(.6),8);g.fillStyle='#3a4250';g.fill();g.fillStyle=C.AM;g.fillRect(X(apx-.4),Y(ly+.7),K(.8),K(.08));g.restore();
  chip([apx,ly+.75],`${P} kN`,'am big',lA*sm(8.6,9,t),-4)}
 const rr0=sm(9.6,10.6,t)*(1-sm(31.4,32,t)+sm(35.6,36.4,t)*(1-sm(51.4,52,t))+sm(52.6,53.2,t))*(1-sm(57.4,57.8,t));
 if(rr0>0&&!(t>32&&t<52)){arrow([Ax,2.0],1,1.0*rr0,C.TE);arrow([SPAN/2,2.0],1,1.0*rr0,C.TE);
  chip([Ax-.15,.95],`${RA.toFixed(0)} kN`,'te',rr0,'below');chip([SPAN/2+.15,.95],`${(P-RA).toFixed(0)} kN`,'te',rr0,'below')}
 // ---- joint A close-up: free-body ----
 if(t>32&&t<52.4){const fa=sm(33.2,33.8,t)*(1-sm(51.6,52.2,t));
  if(fa>0){g.save();g.globalAlpha=fa*.9;g.beginPath();g.arc(X(Ax),Y(YS),K(1.15),0,7);g.setLineDash([12,10]);g.lineWidth=4;g.strokeStyle='#ffffff';g.stroke();g.restore()}
  const r=sm(36.4,37.0,t)*fa;if(r>0){arrowV([Ax,YS-1.6],[Ax,YS-.16],C.TE,r,.12);chip([Ax-.85,YS-.95],`${RA.toFixed(0)} kN`,'te',r,0)}
  const ca=sm(37.4,38.0,t)*fa;if(ca>0){const ux=Math.cos(ALPHA),uy=Math.sin(ALPHA);const ox=-uy*.32,oy=ux*.32;arrowV([Ax+ux*1.55+ox,YS+uy*1.55+oy],[Ax+ux*.2+ox,YS+uy*.2+oy],BLUE,ca,.12);chip([Ax+ux*1.2-.55,YS+uy*1.2+.25],'C','wh big',ca,0)}
  const ta=sm(38.4,39.0,t)*fa;if(ta>0){arrowV([Ax+.18,YS],[Ax+1.6,YS],ORG,ta,.12);chip([Ax+1.25,YS-.12],'T','am big',ta,'below')}
  const aa=sm(40.4,41.0,t)*fa;if(aa>0){g.save();g.globalAlpha=aa;g.beginPath();g.arc(X(Ax),Y(YS),K(.7),-ALPHA,0);g.lineWidth=5;g.strokeStyle='#ffd36b';g.stroke();g.restore();
   chip([Ax+.95,YS+.32],`α = ${(ALPHA*180/Math.PI).toFixed(0)}°`,'am',aa,0)}}
 // ---- equations ----
 const deg=(ALPHA*180/Math.PI).toFixed(0);
 eqPanel(t,43.6,52.2,[[43.8,`ΣF<sub>y</sub> = 0:  C sin α = ${RA.toFixed(0)} kN`,''],[45.2,`C = ${P} ÷ (2 × sin ${deg}°)`,''],[46.2,`   = ${CF.toFixed(2)} kN  compression`,'hi'],[48.6,'ΣF<sub>x</sub> = 0:  T = C cos α',''],[49.8,`   = ${TF.toFixed(2)} kN  tension`,'am2']]);
 if(t>42.2&&t<43.8)OV.push(`<div id="q" style="top:430px;opacity:${sm(42.2,42.5,t)*(1-sm(43.5,43.8,t))}">C = <span>?</span>&nbsp; T = <span>?</span></div>`);
 // ---- your turn ----
 const qa=sm(59.0,59.6,t)*(1-sm(61.6,62,t));
 if(qa>0){dimV(0,YS+.12,YS+rise-.12,'rise 1.5 m','#ffd36b',qa);chip([-1.6,YS+rise/2+.45],'C = ?','wh big',qa,0);chip([0,YS-.12],'T = ?','am big',qa,'below')}
 if(t>57.3&&t<62){const a=sm(57.3,57.7,t)*(1-sm(61.6,62,t));OV.push(`<div id="q" style="top:500px;opacity:${a}">Rise 3 m → 1.5 m:<br>C = <span>?</span>&nbsp; T = <span>?</span></div>`)}
 // ---- overlays & fx ----
 OV.unshift(`<div id="top" style="opacity:${t<62?1:0}"><span>TRUSS · METHOD OF JOINTS</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,3.0,'THE IDEA');sticker(t,31.6,'THE MATH');sticker(t,52.2,'REAL LIFE');sticker(t,57.0,'YOUR TURN');
 wipe(t,32);wipe(t,57);
 if(t>=8.6&&t<9.3){const p=proj([apx,apy+.3]);burst(p[0],p[1],8.6,t,'#FF5A2A')}
 if(t>=46.6&&t<47.3)burst(420,520,46.6,t,'#3df0d8');if(t>=50.4&&t<51.1)burst(420,670,50.4,t,'#ffc244');
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 // end card (asks, never answers)
 const e=sm(62,62.8,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)"><div class="phone"><div class="scr">
  <div class="hd">Engineering Guide<br>by IQRA<small>STRUCTURAL ANALYSIS I · LESSON</small></div>
  <div class="card"><h3>Truss: method of joints</h3>
  <svg viewBox="0 0 400 200" width="100%"><path d="M40 160 L200 100 L360 160" fill="none" stroke="#3d84e0" stroke-width="12" stroke-linejoin="round"/><path d="M40 160 L360 160" stroke="#ff9a1a" stroke-width="10"/>
  <circle cx="40" cy="160" r="9" fill="#d9dde3"/><circle cx="200" cy="100" r="9" fill="#d9dde3"/><circle cx="360" cy="160" r="9" fill="#d9dde3"/>
  <line x1="200" y1="20" x2="200" y2="82" stroke="#ffb020" stroke-width="7"/><path d="M188 76 L212 76 L200 96z" fill="#ffb020"/><text x="214" y="46" fill="#ffc244" font-size="26" font-weight="800" font-family="Inter">20 kN</text></svg>
  <div class="sl"></div><div style="font:600 22px Inter;color:#9fb0cc">Rise h = 1.5 m</div></div>
  <div class="card" style="font:700 30px/1.6 Inter;font-variant-numeric:tabular-nums"><span style="color:#fff">C = <b style="color:#ffb020">?</b></span><br><span style="color:#fff">T = <b style="color:#ffb020">?</b></span></div>
  </div></div><div class="cta">Try it in the<br><span>Engineering Guide<br>by IQRA</span> app</div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
window.renderAt=render;
