// ===== Short #79: Deflection at any point with one unit load (Unit load method, `uld`) =====
// App defaults: simply supported, L = 6 m, P = 20 kN at a = 2 m, deflection wanted at c = 3 m, EI = 20000 kN·m².
// Timed straight to the voice (voice79g.mp3, 70.7 s): t here = audio seconds.
const PUNCH=[[0.15,.12],[9.4,.07],[48.3,.06]];
const HOOK='The <span>DEFLECTION</span> at any point?<br>One <span>1 kN</span> load does it!';
const T_END=72.6;
const L=6, P=20, A_=2, C_=3, EI=20000;
// all values computed here, never typed
const Mx=x=>{const b=L-A_;return x<=A_?P*b*x/L:P*A_*(L-x)/L};           // real moment, x from the left support
const mx=x=>x<=C_?(L-C_)*x/L:C_*(L-x)/L;                                   // moment from 1 kN at c
let INT=0;const NI=6000;for(let i=0;i<NI;i++){const x=(i+.5)*L/NI;INT+=Mx(x)*mx(x)*L/NI}
const DEFL_MM=INT/EI*1000;                                                  // ∫ M m dx / EI
const DI_MM=P*A_*(L-C_)*(C_*(2*L-C_)-A_*A_)/(6*L*EI)*1000;                 // double integration check (x ≥ a)
const MMAX=Mx(A_), mMAX=mx(C_);let PMAX=0;for(let i=0;i<=600;i++){const x=i*L/600;PMAX=Math.max(PMAX,Mx(x)*mx(x))}
const f2=v=>v.toFixed(2);
const CAPS=[
[5.3,10.9,`A <b>${L} m</b> beam, <b>${P} kN</b> at <b>${A_} m</b> from the left support.`],
[11.1,14.5,`We want the deflection at mid span, <b>c = ${C_} m</b>.`],
[14.7,19.9,'Step 1: real load → bending moment <b>M</b>. Diagram 1.'],
[20.1,29.7,'Step 2: remove it. Put <i>1 kN</i> at the point → moment <i>m</i>. Diagram 2.'],
[29.9,35.5,'<i>m</i> shows how much each part of the beam affects that point.'],
[35.8,41.9,'Step 3: <b>M × m</b> at every section, integrate over the span, divide by <b>EI</b>.'],
[50.6,55.5,'Most of the deflection comes where <b>M</b> and <i>m</i> are both big.'],
[55.7,58.9,`Double integration gives the same: <b>${f2(DI_MM)} mm</b>.`],
[59.2,63.5,'Trusses, frames, curved members: the same method.'],
];
const CAMS=[[0,0,.3,140],[35.8,0,.3,140],[36.8,0,.9,140],[37.6,0,.9,140],[59.0,0,.9,140],[59.6,0,.6,140],[60.4,0,.6,140],[72.6,0,.6,140]];
const YR=2.6, D1=1.3, D2=-.5, D3=1.0, DH=.85;   // beam level, the three diagram baselines, diagram height
const xw=x=>x-L/2;                                   // beam coordinate (0..L) → world x
function beamLine(y,col,a=1,sagAmp=0,dashed=false){if(a<=0)return;g.save();g.globalAlpha=a;const pts=[];
 for(let i=0;i<=60;i++){const x=L*i/60;const d=sagAmp*mx(x)/mMAX;pts.push([X(xw(x)),Y(y-d)])}
 if(dashed)g.setLineDash([16,10]);g.lineCap='round';g.beginPath();pts.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));
 g.lineWidth=K(.22);g.strokeStyle='#2b303c';g.stroke();g.lineWidth=K(.16);g.strokeStyle=col;g.stroke();g.restore()}
function diag(y,f,fmax,col,a,p=1,label,cls,ta=a){if(a<=0)return;g.save();g.globalAlpha=a;const n=120,m=Math.round(n*clamp(p));
 g.beginPath();g.moveTo(X(xw(0)),Y(y));for(let i=0;i<=m;i++){const x=L*i/n;g.lineTo(X(xw(x)),Y(y-DH*f(x)/fmax))}g.lineTo(X(xw(L*m/n)),Y(y));g.closePath();
 g.fillStyle=col;g.fill();g.lineWidth=4;g.strokeStyle='rgba(255,255,255,.8)';g.stroke();
 line([[X(xw(0)),Y(y)],[X(xw(L)),Y(y)]],4,'rgba(255,255,255,.85)');g.restore();
 if(label)chip([0,y-DH-.08],label,cls,ta,'below')}
function eqPanel(t,t0,t1,lines){const pa=sm(t0,t0+.4,t)*(1-sm(t1-.4,t1,t));if(pa<=0)return;let h='';
 for(const[st,txt,cl]of lines){const k=lin(st,st+1.0,t);if(k<=0){h+='<div class="l"></div>';continue}
  const plain=txt.replace(/<[^>]+>/g,'');const n=Math.ceil(plain.length*k);let out='',cnt=0;for(let i=0;i<txt.length;i++){if(txt[i]==='<'){const j=txt.indexOf('>',i);out+=txt.slice(i,j+1);i=j;continue}if(cnt>=n)break;out+=txt[i];cnt++}
  for(const tg of['sub','sup'])if((out.match(new RegExp('<'+tg+'>','g'))||[]).length>(out.match(new RegExp('</'+tg+'>','g'))||[]).length)out+='</'+tg+'>';h+=`<div class="l ${cl}">${out}</div>`}
 OV.push(`<div id="eq" style="opacity:${pa};transform:translateY(${(1-sm(t0,t0+.5,t))*30}px);font-size:44px">${h}</div>`)}
function sketch(kind,cx,cy,s,a){if(a<=0)return;g.save();g.globalAlpha=a;const P2=(x,y)=>[X(cx+x*s),Y(cy+y*s)];const col='#ffffff',w=6;
 if(kind==='truss'){const b=[[-1,0],[-.5,0],[0,0],[.5,0],[1,0]],tp=[[-.5,.55],[0,.55],[.5,.55]];line([P2(...b[0]),P2(...b[4])],w,col);line([P2(...tp[0]),P2(...tp[2])],w,col);
  line([P2(-1,0),P2(-.5,.55)],w,col);line([P2(1,0),P2(.5,.55)],w,col);for(let i=0;i<3;i++){line([P2(...tp[i]),P2(...b[i+1])],w,col);line([P2(...tp[i]),P2(...b[i])],w,col)}}
 if(kind==='frame'){line([P2(-.8,0),P2(-.8,1),P2(.8,1),P2(.8,0)],w*1.6,col)}
 if(kind==='arch'){g.beginPath();for(let i=0;i<=40;i++){const u=-1+2*i/40;const p=P2(u*.9,1.0*(1-u*u));i?g.lineTo(...p):g.moveTo(...p)}g.lineWidth=w*1.6;g.strokeStyle=col;g.stroke()}
 g.restore()}
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};
 g.clearRect(0,0,W,H);background(t);g.fillStyle='rgba(10,20,40,.38)';g.fillRect(0,0,W,H);   // mid-dark so white captions read
 const scene=(1-sm(59.0,59.5,t));                    // everything about the beam fades for real life
 const ba=sm(5.3,5.9,t)*scene;
 // the beam and its supports
 if(ba>0){g.save();g.globalAlpha=ba;pinSup(xw(0),YR-.12,1);rollSup(xw(L),YR-.12,1);g.restore();beamLine(YR,C.concrete,ba)}
 // the real load (step 2 takes it away)
 const la=sm(9.0,9.4,t)*(1-sm(21.0,22.0,t))*scene;const drop=Math.max(0,9.4-t)*6;
 if(la>0){arrow([xw(A_),YR+.15+drop],-1,1.1,C.AM,la);chip([xw(A_),YR+1.35+drop],`${P} kN`,'am big',la,-4)}
 dimLine([xw(0),YR-.6],[xw(A_),YR-.6],`${A_} m`,sm(7.6,8.4,t)*(1-sm(14.4,14.8,t))*scene,'#ffffff');
 // the point we want: green
 const ga=sm(11.1,11.7,t)*scene;if(ga>0){beamLine(YR,'#7cf0c0',ga*.0);SV.push(`<circle cx="${X(xw(C_))}" cy="${Y(YR)}" r="16" fill="#3df0d8" opacity="${ga}"/>`);
  const shown=t>48.3?`δ = ${f2(DEFL_MM)} mm`:'δ = ?';chip([xw(C_),YR-.35],shown,'te',ga*(t>35.8&&t<48.3?0:1),'below')}
 dimLine([xw(0),YR-1.15],[xw(C_),YR-1.15],`c = ${C_} m`,sm(12.8,13.6,t)*(1-sm(14.4,14.8,t))*scene,'#3df0d8');
 const sg=sm(11.6,12.6,t)*(1-sm(14.4,14.8,t))*scene;beamLine(YR,'#9fd3f0',sg*.8,.32,true);
 // Step 1: diagram 1, M from the real load
 const d1=sm(15.0,15.4,t)*scene*(1-sm(36.0,36.8,t));diag(D1,Mx,MMAX,'rgba(232,57,43,.72)',d1,sm(15.2,17.0,t),`diagram 1: M  (max ${MMAX.toFixed(1)} kN·m)`,'am',d1*sm(18.6,19.2,t));
 // Step 2: 1 kN at the point, diagram 2
 const ua=sm(23.5,24.0,t)*scene*(1-sm(41.0,41.8,t));const udrop=Math.max(0,24.0-t)*6;if(ua>0){arrow([xw(C_),YR+.15+udrop],-1,1.0,C.TE,ua);chip([xw(C_),YR+1.25+udrop],'1 kN','te big',ua*(1-sm(35.6,36,t)),-4)}
 const pulse=t>29.9&&t<35.6?.5+.5*Math.sin((t-29.9)*5):0;
 const d2=sm(27.8,28.2,t)*scene*(1-sm(36.0,36.8,t));diag(D2,mx,mMAX,`rgba(19,209,187,${.6+.3*pulse})`,d2,sm(27.9,29.3,t),`diagram 2: m  (max ${mMAX.toFixed(1)} kN·m)`,'te',d2*sm(29.2,29.8,t));
 // Step 3: diagram 3 = M × m
 const PM=x=>Mx(x)*mx(x);const d3=sm(37.4,37.8,t)*scene;const glow=t>50.6&&t<55.6?.5+.5*Math.sin((t-50.6)*5):0;
 diag(D3,PM,PMAX,`rgba(255,176,32,${.65+.3*glow})`,d3,sm(37.5,39.4,t),'diagram 3: M × m','am',d3*sm(39.2,39.8,t));
 // the maths
 eqPanel(t,41.8,58.9,[[42.2,'δ = ∫ M · m dx ÷ EI',''],[45.8,`EI = ${EI} kN·m<sup>2</sup>`,''],[48.3,`δ = ${f2(DEFL_MM)} mm`,'hi'],[55.7,`check, double integration: ${f2(DI_MM)} mm ✓`,'am2']]);
 // real life
 const ra=sm(59.2,59.8,t)*(1-sm(63.6,64.0,t));if(ra>0){sketch('truss',-1.9,2.6,1.15,sm(59.2,59.8,t)*ra);sketch('frame',1.7,2.6,1.0,sm(60.0,60.6,t)*ra);sketch('arch',0,.2,1.35,sm(60.4,61.0,t)*ra);
  chip([-1.9,2.3],'truss','wh',sm(59.4,60,t)*ra,'below');chip([1.7,2.3],'frame','wh',sm(60.1,60.7,t)*ra,'below');chip([0,-.1],'curved member','wh',sm(60.6,61.2,t)*ra,'below')}
 // your turn: slope instead of deflection
 if(t>63.8&&t<68.2){const a=sm(63.8,64.3,t)*(1-sm(67.8,68.2,t));beamLine(YR,C.concrete,a);g.save();g.globalAlpha=a;pinSup(xw(0),YR-.12,1);rollSup(xw(L),YR-.12,1);g.restore();
  SV.push(`<path d="M ${X(xw(C_))-70} ${Y(YR)+10} A 70 70 0 0 1 ${X(xw(C_))+70} ${Y(YR)+10}" stroke="#ffc244" stroke-width="7" fill="none" opacity="${a}"/>`);chip([xw(C_),YR+.5],'?','am big',a,-4);
  OV.push(`<div id="q" style="top:300px;opacity:${a}">Need the <span>SLOPE</span> here?<br>What replaces the 1 kN?</div>`)}
 OV.unshift(`<div id="top" style="opacity:${t<68.1?1:0}"><span>UNIT LOAD METHOD</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,14.7,'THE IDEA');sticker(t,35.8,'THE MATH');sticker(t,59.2,'REAL LIFE');sticker(t,63.8,'YOUR TURN');
 wipe(t,35.8);wipe(t,59.2);wipe(t,63.8);
 if(t>=9.4&&t<10.1){const p=proj([xw(A_),YR]);burst(p[0],p[1],9.4,t,'#FF5A2A')}
 if(t>=48.3&&t<49.0)burst(300,560,48.3,t,'#3df0d8');if(t>=55.7&&t<56.4)burst(300,630,55.7,t,'#ffc244');
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 const e=sm(68.1,68.9,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)"><div class="phone" style="height:900px"><div class="scr">
  <div class="hd">Engineering Guide<br>by IQRA<small>STRUCTURAL ANALYSIS I · LESSON</small></div>
  <div class="card"><h3>Unit load method</h3>
  <svg viewBox="0 0 400 170" width="100%"><line x1="20" y1="50" x2="380" y2="50" stroke="#bdb8ae" stroke-width="14" stroke-linecap="round"/><path d="M20 58 L4 86 L36 86Z" fill="#9aa3ad"/><path d="M380 58 L364 86 L396 86Z" fill="#9aa3ad"/>
  <line x1="140" y1="0" x2="140" y2="34" stroke="#ffb020" stroke-width="7"/><path d="M20 110 L140 160 L380 110Z" fill="rgba(232,57,43,.6)"/><text x="190" y="40" fill="#3df0d8" font-size="34" font-weight="900" font-family="Inter">δ = ?</text></svg>
  <div class="sl"></div><div style="font:600 22px Inter;color:#9fb0cc">Drag the load and the point</div></div>
  <div class="card" style="font:700 30px/1.6 Inter"><span style="color:#fff">Slope at the point = <b style="color:#ffb020">?</b></span></div>
  </div></div><div class="cta" style="margin-top:44px;font-size:60px">Try it in the<br><span>Engineering Guide<br>by IQRA</span> app</div>
  <div style="margin-top:34px;padding:16px 34px;border-radius:44px;background:#FF5A2A;color:#fff;font:800 40px/1.25 Inter;text-align:center;opacity:${sm(68.9,69.5,t)}">Like &amp; Subscribe<br><span style="font-weight:600;font-size:32px">for more Engineering Guide videos</span></div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
window.renderAt=render;
