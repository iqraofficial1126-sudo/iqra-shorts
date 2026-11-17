// ===== Short #33: Why is honey hard to stir? (Viscosity, `vis`) =====
// App defaults: SAE 30 oil mu = 0.29 N·s/m², plate speed U = 1 m/s, gap y = 5 mm, plate area A = 0.5 m².
const PUNCH=[[0.15,.12],[5.0,.05],[22.4,.05],[44.6,.05],[48.2,.04]];
const HOOK='Why is <span>HONEY</span><br>so hard to stir?';
const T_END=66;
const MU=0.29, U=1, GAP=0.005, AREA=0.5;
const DUDY=U/GAP, TAU=MU*DUDY, F=TAU*AREA; // computed, never typed
const CAPS=[
[3.0,9.8,'Oil between two plates: the bottom <b>stays</b>, the top <b>moves</b>.'],
[10.0,16.0,'The oil sticks to both plates. Layers slide like a <b>deck of cards</b>.'],
[16.0,22.0,'Speed grows in a <i>straight line</i>: 0 at the bottom, U at the top.'],
[22.0,31.0,'<b>Viscosity</b> resists the sliding: <i>τ = μ du/dy</i>.'],
[52.4,56.8,'Engine oil keeps a shaft off its bearing the same way.'],
[57.6,61.6,'Halve the gap. What force is needed now?'],
];
const CAMS=[[0,.3,1.7,160],[3,.3,1.7,160],[31,.3,1.7,160],[32,.3,2.5,150],[32.8,.3,2.5,150],[51,.3,2.5,150],[52.4,0,1.0,170],[53.2,0,1.0,170],[56.6,0,1.0,170],[57.4,.3,1.7,160],[58.2,.3,1.7,160],[66,.3,1.7,160]];
const X0=-2.5,X1=2.5,YB=.3,YT=2.9; // gap drawn far bigger than 5 mm
function bg(){const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#1d2436');gr.addColorStop(1,'#11151f');g.fillStyle=gr;g.fillRect(0,0,W,H);
 const rg=g.createRadialGradient(W/2,H*.45,50,W/2,H*.45,900);rg.addColorStop(0,'rgba(255,170,60,.10)');rg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=rg;g.fillRect(0,0,W,H)}
function plates(t,move,gapS=1){const yt=YB+(YT-YB)*gapS;
 // oil layers (cards): each layer slides at a speed proportional to its height
 const n=8;for(let i=0;i<n;i++){const y0=YB+(yt-YB)*i/n,y1=YB+(yt-YB)*(i+1)/n,f=(i+.5)/n;
  g.fillStyle=i%2?'rgba(230,170,50,.85)':'rgba(214,150,40,.85)';g.fillRect(X(X0),Y(y1),X(X1)-X(X0),Y(y0)-Y(y1));
  const off=(move*f)%0.8;g.fillStyle='rgba(255,240,200,.55)';for(let x=X0-.8+off;x<X1;x+=.8){if(x<X0)continue;rr(X(x),Y(y1)+3,K(.12),Y(y0)-Y(y1)-6,3);g.fill()}}
 rr(X(X0-.2),Y(YB),X(X1+.2)-X(X0-.2),K(.3),6);g.fillStyle='#6b7480';g.fill();
 const sh=Math.min(move*.04,.0);rr(X(X0-.2+sh),Y(yt+.3),X(X1+.2)-X(X0-.2),K(.3),6);g.fillStyle='#3d84e0';g.fill();
 for(let x=X0;x<X1;x+=.6){const xx=x+(move%0.6);if(xx<X1)circ(X(xx),Y(yt+.15),K(.04),'rgba(255,255,255,.6)')}}
function harrow(x0,x1,y,col,a=1,w=.09){if(a<=0||Math.abs(x1-x0)<.03)return;const A=[X(x0),Y(y)],B=[X(x1),Y(y)];const d=Math.sign(x1-x0),hl=Math.min(K(.3),Math.abs(B[0]-A[0])*.5),hw=K(.14),ww=K(w)/2;
 g.save();g.globalAlpha=a;g.shadowColor=col;g.shadowBlur=20;g.beginPath();g.moveTo(A[0],A[1]-ww);g.lineTo(B[0]-d*hl,B[1]-ww);g.lineTo(B[0]-d*hl,B[1]-hw);g.lineTo(B[0],B[1]);g.lineTo(B[0]-d*hl,B[1]+hw);g.lineTo(B[0]-d*hl,B[1]+ww);g.lineTo(A[0],A[1]+ww);g.closePath();g.fillStyle=col;g.fill();g.shadowBlur=0;g.lineWidth=3;g.strokeStyle='rgba(255,255,255,.8)';g.stroke();g.restore()}
function eqPanel(t,t0,t1,lines){const pa=sm(t0,t0+.4,t)*(1-sm(t1-.4,t1,t));if(pa<=0)return;let h='';
 for(const[st,txt,cl]of lines){const k=lin(st,st+1.0,t);if(k<=0){h+='<div class="l"></div>';continue}
  const plain=txt.replace(/<[^>]+>/g,'');const n=Math.ceil(plain.length*k);let out='',cnt=0;for(let i=0;i<txt.length;i++){if(txt[i]==='<'){const j=txt.indexOf('>',i);out+=txt.slice(i,j+1);i=j;continue}if(cnt>=n)break;out+=txt[i];cnt++}
  if((out.match(/<sub>/g)||[]).length>(out.match(/<\/sub>/g)||[]).length)out+='</sub>';if((out.match(/<sup>/g)||[]).length>(out.match(/<\/sup>/g)||[]).length)out+='</sup>';h+=`<div class="l ${cl}">${out}</div>`}
 OV.push(`<div id="eq" style="opacity:${pa};transform:translateY(${(1-sm(t0,t0+.5,t))*30}px);font-size:48px">${h}</div>`)}
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};
 g.clearRect(0,0,W,H);bg();
 const real=t>52.2&&t<57.4;
 if(!real){
  const run=t<5?0:(t-5)*.9;const gapS=t>57.6?lerp(1,.5,sm(58.0,59.2,t)):1;
  plates(t,run,gapS);const yt=YB+(YT-YB)*gapS;
  chip([X0+.9,YB-.05],'fixed','wh',sm(3.4,4,t)*(1-sm(31,31.6,t)),'below');chip([X1-1.0,yt+.75],'moves →','te',sm(4.6,5.2,t)*(1-sm(21.8,22.3,t)),0);
  // pulling force and the oil's drag
  const fa=sm(5.0,5.6,t)*(1-sm(61.6,62,t));harrow(X1+.2,X1+.95,yt+.15,C.AM,fa);if(fa>0)chip([X1+.4,yt+.6],t>44.6?`F = ${F.toFixed(1)} N`:'F','am',fa*(t>57.6?0:1),0);
  const da=sm(22.4,23.0,t)*(1-sm(31.2,31.8,t));harrow(-.6,-1.8,yt+.55,'#ff3b2a',da);if(da>0)chip([-1.2,yt+.95],'oil drags back','am',da,0);
  // sticking at the walls
  const st=sm(10.2,10.8,t)*(1-sm(15.6,16,t));if(st>0){chip([-1.4,YB+.15],'sticks: u = 0','wh',st,0);chip([-1.4,yt-.05],'sticks: u = U','te',st,'below')}
  // velocity profile: arrows grow linearly with height
  const vp=sm(16.2,17.4,t)*(1-sm(51.6,52.2,t)+(t>57.6?1:0))*(t>57.6?1:1);if(vp>0){const xp=-1.0;for(let i=0;i<=6;i++){const yy=YB+(yt-YB)*i/6;harrow(xp,xp+2.0*i/6*vp+.001,yy,'#3df0d8',1,.06)}
   SV.push(`<line x1="${X(xp)}" y1="${Y(YB)}" x2="${X(xp+2.0*vp)}" y2="${Y(yt)}" stroke="#3df0d8" stroke-width="4" stroke-dasharray="10 8" opacity="${vp}"/>`);
   chip([xp+1.2,(YB+yt)/2-.5],'slope = du/dy','te',sm(18.6,19.2,t)*(1-sm(31.2,31.6,t)),0)}
  const tq=sm(25.0,25.6,t)*(1-sm(31.2,31.6,t));if(tq>0)OV.push(`<div class="chip wh big" style="left:540px;top:1260px;opacity:${tq}">τ = μ × du/dy</div>`);
  const gn=sm(3.6,4.2,t)*(1-sm(15.6,16,t));if(gn>0)OV.push(`<div style="position:absolute;left:0;right:0;top:1330px;text-align:center;font:600 26px Inter;color:#9fb0cc;opacity:${gn}">(the ${GAP*1000} mm gap is drawn much bigger)</div>`);
  if(t>57.6){const qa=sm(59.2,59.8,t)*(1-sm(61.6,62,t));chip([X1-1.0,yt+.75],'gap 2.5 mm','am big',qa,0)}
 } else {// real life: a shaft turning in a bearing on an oil film
  const a=sm(52.4,53.0,t)*(1-sm(57,57.4,t));const cx=0,cy=1.0,R=1.5,r=1.25;g.save();g.globalAlpha=a;
  g.beginPath();g.arc(X(cx),Y(cy),K(R+.35),0,7);g.fillStyle='#6b7480';g.fill();g.beginPath();g.arc(X(cx),Y(cy),K(R),0,7);g.fillStyle='#e0a832';g.fill();
  g.beginPath();g.arc(X(cx),Y(cy+.06),K(r),0,7);g.fillStyle='#9aa3ad';g.fill();const ang=t*3;
  for(let i=0;i<6;i++){const q=ang+i*Math.PI/3;line([[X(cx),Y(cy+.06)],[X(cx+Math.cos(q)*r*.85),Y(cy+.06+Math.sin(q)*r*.85)]],K(.05),'#5d6b7a')}g.restore();
  chip([cx,cy+R+.75],'oil film','am',a,0)}
 eqPanel(t,32.8,52.0,[[33.2,`SAE 30 oil: μ = ${MU} N·s/m²`,''],[36.0,`du/dy = ${U} ÷ ${GAP} = ${DUDY.toFixed(0)} s<sup>−1</sup>`,''],[38.4,`τ = ${MU} × ${DUDY.toFixed(0)} = ${TAU.toFixed(1)} Pa`,'hi'],[42.6,`F = τ A = ${TAU.toFixed(0)} × ${AREA}`,''],[44.2,`   = ${F.toFixed(1)} N`,'am2']]);
 if(t>57.3&&t<62){const a=sm(57.3,57.7,t)*(1-sm(61.6,62,t));OV.push(`<div id="q" style="top:440px;opacity:${a}">Gap 5 mm → 2.5 mm:<br>F = <span>?</span></div>`)}
 OV.unshift(`<div id="top" style="opacity:${t<62?1:0}"><span>VISCOSITY</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,3.0,'THE IDEA');sticker(t,31.6,'THE MATH');sticker(t,52.2,'REAL LIFE');sticker(t,57.0,'YOUR TURN');
 wipe(t,32);wipe(t,52.2);wipe(t,57);
 if(t>=39.0&&t<39.7)burst(420,560,39.0,t,'#3df0d8');if(t>=44.6&&t<45.3)burst(420,630,44.6,t,'#ffc244');
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 const e=sm(62,62.8,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)"><div class="phone"><div class="scr">
  <div class="hd">Engineering Guide<br>by IQRA<small>FLUID MECHANICS · LESSON</small></div>
  <div class="card"><h3>Viscosity</h3>
  <svg viewBox="0 0 400 150" width="100%"><rect x="20" y="20" width="360" height="18" rx="5" fill="#3d84e0"/><rect x="20" y="40" width="360" height="70" fill="#e0a832" opacity=".85"/><rect x="20" y="112" width="360" height="18" rx="5" fill="#6b7480"/>
  <g stroke="#3df0d8" stroke-width="5"><line x1="200" y1="105" x2="210" y2="105"/><line x1="200" y1="85" x2="235" y2="85"/><line x1="200" y1="65" x2="260" y2="65"/><line x1="200" y1="45" x2="285" y2="45"/></g></svg>
  <div class="sl"></div><div style="font:600 22px Inter;color:#9fb0cc">Gap y = 2.5 mm</div></div>
  <div class="card" style="font:700 30px/1.6 Inter;font-variant-numeric:tabular-nums"><span style="color:#fff">F = <b style="color:#ffb020">?</b></span></div>
  </div></div><div class="cta">Try it in the<br><span>Engineering Guide<br>by IQRA</span> app</div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
window.renderAt=render;
