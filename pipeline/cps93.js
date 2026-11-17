// ===== Short #93: Fore bearing 52°, back bearing 236° (Prismatic compass, `cps`) =====
// App defaults: FB of AB = 52°, local attraction at A = 0°, at B = 4°, declination 2.5° E.
const PUNCH=[[0.15,.12],[8.6,.05],[15.0,.06],[19.6,.06],[24.0,.05],[46.4,.05]];
const HOOK='Fore bearing <span>52°</span>.<br>Back bearing <span>236°</span>.<br>Something is wrong!';
const T_END=66;
const FB=52, LA_B=4, DECL=2.5;
const BB=FB+180+LA_B, DIFF=BB-FB, ERR=DIFF-180, TRUE=FB+DECL, TRUE_W=FB-DECL; // computed, never typed (TRUE_W is the hidden answer)
const rad=d=>d*Math.PI/180;
const AXY=[-3,-2.3], LEN=7.6, BXY=[AXY[0]+LEN*Math.sin(rad(FB)),AXY[1]+LEN*Math.cos(rad(FB))];
const CAPS=[
[3.0,10.0,'At A, sight the rod at B. Fore bearing: <b>52°</b>.'],
[10.0,16.0,'At B, sight back to A. Back bearing: <b>236°</b>.'],
[16.0,22.0,'A clean line gives exactly <i>180°</i>. Here: <b>184°</b>.'],
[22.0,28.0,'Iron or a current near B pulls the needle: <b>local attraction</b>.'],
[28.0,31.4,'Correct every bearing taken <b>at B</b>.'],
[32.2,38.0,'<i>Declination</i>: the angle between true and magnetic north.'],
[52.4,56.8,'Keys or a phone near a compass do the same thing.'],
[57.6,61.6,'If the declination were <b>2.5° west</b>, what is the true bearing?'],
];
const CAMS=[[0,0,-1.0,104],[3,0,-1.1,110],[9.6,0,-1.1,110],[10.4,.4,-.9,110],[31,.4,-.9,110],[32,0,-1.1,110],[66,0,-1.1,110]];
function field(t){const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#7cc46c');gr.addColorStop(1,'#5aa851');g.fillStyle=gr;g.fillRect(0,0,W,H);
 g.fillStyle='rgba(255,255,255,.06)';for(let i=-30;i<30;i++){const y=Y(i*.6);if(i%2)g.fillRect(0,y,W,K(.6))}
 for(const[tx,td,ts]of[[-4.5,3.6,1],[-1.5,4.6,.8],[4.6,4.2,.9],[-4.8,-.4,.8],[4.8,-1.6,1]]){const x=X(tx),y=Y(td),r=K(.6)*ts;g.fillStyle='rgba(0,0,0,.15)';g.beginPath();g.ellipse(x+10,y+4,r*.9,r*.3,0,0,7);g.fill();g.fillStyle='#6a4a30';g.fillRect(x-r*.12,y-r*1.1,r*.24,r*1.1);circ(x,y-r*1.5,r,'#3f8f47');circ(x-r*.5,y-r*1.1,r*.6,'#4c9c52');circ(x+r*.5,y-r*1.1,r*.65,'#45954c')}}
function rod(x,d,a=1){if(a<=0)return;const bx=X(x),by=Y(d),h=K(2.0),w=K(.1);g.save();g.globalAlpha=a;g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(bx+6,by+2,w*1.6,w*.6,0,0,7);g.fill();
 for(let i=0;i<6;i++){g.fillStyle=i%2?'#ffffff':'#e8392b';g.fillRect(bx-w/2,by-h*(i+1)/6,w,h/6)}g.lineWidth=2;g.strokeStyle='rgba(0,0,0,.35)';g.strokeRect(bx-w/2,by-h,w,h);g.restore()}
function tripod(x,d,a=1){if(a<=0)return;const bx=X(x),by=Y(d),h=K(1.3);g.save();g.globalAlpha=a;g.lineWidth=6;g.strokeStyle='#8a5a36';for(const dx of[-.35,0,.35]){g.beginPath();g.moveTo(bx,by-h);g.lineTo(bx+K(dx),by);g.stroke()}
 g.beginPath();g.ellipse(bx,by-h,K(.3),K(.12),0,0,7);g.fillStyle='#2b303c';g.fill();g.beginPath();g.ellipse(bx,by-h-4,K(.26),K(.1),0,0,7);g.fillStyle='#d9dde3';g.fill();g.restore()}
function pole(x,d,a=1,t=0){if(a<=0)return;const bx=X(x),by=Y(d),h=K(2.3);g.save();g.globalAlpha=a;g.lineWidth=K(.12);g.strokeStyle='#59616c';g.beginPath();g.moveTo(bx,by);g.lineTo(bx,by-h);g.stroke();
 g.lineWidth=K(.06);g.beginPath();g.moveTo(bx-K(.6),by-h+K(.2));g.lineTo(bx+K(.6),by-h+K(.2));g.stroke();
 g.strokeStyle=`rgba(255,215,90,${.5+.5*Math.sin(t*20)})`;g.lineWidth=3;for(let i=0;i<3;i++){g.beginPath();g.arc(bx,by-h*.5,K(.5+i*.35+(t*.6%0.35)),-.9,.9);g.stroke()}g.restore()}
// compass dial (plan view): N up. needle = magnetic north + deflection; sight line at the bearing; reading drawn on the ring
function dial(cx,cy,r,dev,sight,read,a,label){if(a<=0)return;let s=`<g opacity="${a}" transform="translate(${cx},${cy})"><circle r="${r+16}" fill="#15171A" opacity=".88"/><circle r="${r}" fill="#F4F2EE"/>`;
 for(let d=0;d<360;d+=10){const L=d%30?10:20;const x1=Math.sin(rad(d))*r,y1=-Math.cos(rad(d))*r,x2=Math.sin(rad(d))*(r-L),y2=-Math.cos(rad(d))*(r-L);s+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#15171A" stroke-width="${d%30?2:4}"/>`;
  if(d%90===0)s+=`<text x="${Math.sin(rad(d))*(r-42)}" y="${-Math.cos(rad(d))*(r-42)+10}" text-anchor="middle" font-size="28" font-weight="900" font-family="Inter" fill="#15171A">${['N','E','S','W'][d/90]}</text>`}
 const nx=Math.sin(rad(dev))*(r-30),ny=-Math.cos(rad(dev))*(r-30);s+=`<line x1="${-nx}" y1="${-ny}" x2="${nx}" y2="${ny}" stroke="#2b303c" stroke-width="10" stroke-linecap="round"/><line x1="0" y1="0" x2="${nx}" y2="${ny}" stroke="#e8392b" stroke-width="10" stroke-linecap="round"/>`;
 if(sight!==null){const sx=Math.sin(rad(sight))*(r+40),sy=-Math.cos(rad(sight))*(r+40);s+=`<line x1="0" y1="0" x2="${sx}" y2="${sy}" stroke="#FF5A2A" stroke-width="6" stroke-dasharray="12 8"/>`;
  const big=read>180?1:0;const ar=r*.42;const ax0=Math.sin(rad(dev))*ar,ay0=-Math.cos(rad(dev))*ar,ax1=Math.sin(rad(dev+read))*ar,ay1=-Math.cos(rad(dev+read))*ar;s+=`<path d="M${ax0} ${ay0} A${ar} ${ar} 0 ${big} 1 ${ax1} ${ay1}" fill="none" stroke="#ffb020" stroke-width="7"/>`}
 s+=`<circle r="10" fill="#15171A"/></g>`;SV.push(s);
 if(label)OV.push(`<div class="chip am big" style="left:${cx}px;top:${cy+r+30}px;transform:translate(-50%,0);opacity:${a}">${label}</div>`)}
function eqPanel(t,t0,t1,lines){const pa=sm(t0,t0+.4,t)*(1-sm(t1-.4,t1,t));if(pa<=0)return;let h='';
 for(const[st,txt,cl]of lines){const k=lin(st,st+1.0,t);if(k<=0){h+='<div class="l"></div>';continue}
  const plain=txt.replace(/<[^>]+>/g,'');const n=Math.ceil(plain.length*k);let out='',cnt=0;for(let i=0;i<txt.length;i++){if(txt[i]==='<'){const j=txt.indexOf('>',i);out+=txt.slice(i,j+1);i=j;continue}if(cnt>=n)break;out+=txt[i];cnt++}
  if((out.match(/<sub>/g)||[]).length>(out.match(/<\/sub>/g)||[]).length)out+='</sub>';h+=`<div class="l ${cl}">${out}</div>`}
 OV.push(`<div id="eq" style="opacity:${pa};transform:translateY(${(1-sm(t0,t0+.5,t))*30}px);font-size:46px">${h}</div>`)}
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};
 g.clearRect(0,0,W,H);field(t);
 const math=t>32.1&&t<52.1;
 if(!math){
  // north arrow (magnetic) on the field
  const na=sm(3.4,4.0,t)*(1-sm(16,16.4,t));if(na>0){const p=proj([-4.2,3.0]);OV.push(`<div class="chip wh" style="left:${p[0]}px;top:${p[1]}px;opacity:${na};font-size:34px">↑ N</div>`)}
  // survey line
  const la=sm(4.0,5.0,t);if(la>0){g.save();g.globalAlpha=.85;g.setLineDash([14,12]);g.lineWidth=5;g.strokeStyle='#ffffff';g.beginPath();g.moveTo(X(AXY[0]),Y(AXY[1]));g.lineTo(X(lerp(AXY[0],BXY[0],la)),Y(lerp(AXY[1],BXY[1],la)));g.stroke();g.restore()}
  const atB=sm(10.2,11.4,t);
  // iron pole near B
  const pa=sm(22.2,22.8,t)*(1-sm(51.8,52.4,t));pole(BXY[0]-1.4,BXY[1]+.2,pa,t);if(pa>0){const p=proj([BXY[0]-1.4,BXY[1]+.2]);OV.push(`<div class="chip am" style="left:${p[0]-30}px;top:${p[1]-K(1.6)}px;transform:translate(-100%,-50%);opacity:${pa}">iron + current</div>`)}
  rod(BXY[0],BXY[1],sm(3.2,3.7,t)*(1-atB));rod(AXY[0],AXY[1],sm(3.4,3.9,t)*atB);
  const sx=lerp(AXY[0],BXY[0],atB),sy=lerp(AXY[1],BXY[1],atB);tripod(sx,sy,sm(3.2,3.7,t));
  figure(sx-.55,sy-.05,1,{shirt:C.you,a:sm(3.2,3.7,t),walk:atB>0&&atB<1?t*8:undefined});
  chip([AXY[0],AXY[1]-.35],'A','wh big',sm(3.4,3.9,t),'below');chip([BXY[0],BXY[1]-.35],'B','wh big',sm(3.2,3.7,t),'below');
  // dial readings
  const fbA=sm(5.6,8.4,t);const bbA=sm(12.6,14.8,t);const devB=sm(23.4,24.4,t)*LA_B;
  if(t<10.4){dial(540,1120,140,0,FB*fbA,FB*fbA,sm(5,5.5,t)*(1-sm(10,10.4,t)),fbA>.99?`FB = ${FB}°`:'')}
  else if(t<31.6){// at B: the needle is pulled by local attraction, so the reading is off by LA_B
   const shown=lerp(0,BB,bbA);dial(540,1120,140,-LA_B*(t<22?1:1),shown,shown,sm(10.6,11.2,t)*(1-sm(31.2,31.6,t)),bbA>.99?`BB = ${BB}°`:'')}
  else if(t>52.2&&t<57.4){const a=sm(52.6,53.2,t)*(1-sm(57,57.4,t));const jit=Math.sin(t*9)*18*sm(53.4,54.2,t);dial(540,1120,140,jit,null,0,a);
   OV.push(`<div style="position:absolute;left:${720-sm(53,54,t)*60}px;top:1090px;font-size:110px;opacity:${a}">🔑</div>`)}
  else if(t>57.2){dial(540,1120,140,0,FB,FB,sm(57.6,58.2,t)*(1-sm(61.6,62,t)),'')}
  // compare
  const cmp=sm(16.4,17.0,t)*(1-sm(31.2,31.6,t));if(cmp>0)OV.push(`<div class="chip wh big" style="left:330px;top:520px;opacity:${cmp}">${BB}° − ${FB}° = <b style="color:#ffb020">${DIFF}°</b></div>`);
  const cm2=sm(18.6,19.2,t)*(1-sm(31.2,31.6,t));if(cm2>0)OV.push(`<div class="chip am" style="left:330px;top:620px;opacity:${cm2}">should be 180° → ${ERR}° out at B</div>`);
 } else {
  // declination diagram on a dark page
  g.fillStyle='#171c2a';g.fillRect(0,0,W,H);const ox=540,oy=1330,L=520;const dd=10;// declination drawn wider than 2.5° so it can be seen
  const a1=sm(32.6,33.2,t),a2=sm(34.0,34.6,t),a3=sm(38.4,39.0,t);
  const ln=(ang,col,w,dash,a,len=L)=>{if(a>0)SV.push(`<line x1="${ox}" y1="${oy}" x2="${ox+Math.sin(rad(ang))*len}" y2="${oy-Math.cos(rad(ang))*len}" stroke="${col}" stroke-width="${w}" ${dash?'stroke-dasharray="14 10"':''} opacity="${a}" stroke-linecap="round"/>`)};
  ln(0,'#F4F2EE',7,false,a1);ln(dd,'#e8392b',7,false,a2);ln(dd+FB,'#FF5A2A',8,true,a3,L*.95);
  if(a1>0)OV.push(`<div class="chip wh" style="left:${ox-120}px;top:${oy-L+60}px;opacity:${a1};font-size:34px">★ true N</div>`);
  if(a2>0)OV.push(`<div class="chip" style="left:${ox+Math.sin(rad(dd))*L+150}px;top:${oy-Math.cos(rad(dd))*L+20}px;opacity:${a2};font-size:34px;border-color:#e8392b;color:#ff8a7a">magnetic N</div>`);
  const arc=(a0,a1_,r,col,lab,a,dy=0)=>{if(a<=0)return;const x0=ox+Math.sin(rad(a0))*r,y0=oy-Math.cos(rad(a0))*r,x1=ox+Math.sin(rad(a1_))*r,y1=oy-Math.cos(rad(a1_))*r;SV.push(`<path d="M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}" fill="none" stroke="${col}" stroke-width="7" opacity="${a}"/>`);
   const m=(a0+a1_)/2;OV.push(`<div class="chip" style="left:${ox+Math.sin(rad(m))*(r+70)}px;top:${oy-Math.cos(rad(m))*(r+70)+dy}px;opacity:${a};font-size:32px;border-color:${col};color:${col}">${lab}</div>`)};
  arc(0,dd,400,'#ff8a7a',`${DECL}° E`,sm(35.0,35.6,t),-10);arc(dd,dd+FB,250,'#ffb020',`${FB}° magnetic`,sm(39.2,39.8,t));arc(0,dd+FB,170,'#3df0d8',`${TRUE}° true`,sm(46.2,46.8,t),40);
  const nt=sm(35.0,35.6,t);if(nt>0)OV.push(`<div style="position:absolute;left:0;right:0;top:1400px;text-align:center;font:600 26px Inter;color:#9fb0cc;opacity:${nt}">(the ${DECL}° angle is drawn wider so you can see it)</div>`)}
 eqPanel(t,38.6,52.0,[[39.0,`magnetic bearing of AB = ${FB}°`,''],[41.0,'true = magnetic + declination (E +)',''],[43.6,`   = ${FB}° + ${DECL}°`,''],[45.2,`   = ${TRUE}°  →  N ${TRUE}° E`,'hi']]);
 if(t>57.3&&t<62){const a=sm(57.3,57.7,t)*(1-sm(61.6,62,t));OV.push(`<div id="q" style="top:440px;opacity:${a}">Declination 2.5° <span>W</span>:<br>true bearing = <span>?</span></div>`)}
 OV.unshift(`<div id="top" style="opacity:${t<62?1:0}"><span>PRISMATIC COMPASS</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,3.0,'THE IDEA');sticker(t,31.6,'THE MATH');sticker(t,52.2,'REAL LIFE');sticker(t,57.0,'YOUR TURN');
 wipe(t,32);wipe(t,52.2);wipe(t,57);
 if(t>=19.6&&t<20.3)burst(540,680,19.6,t,'#FF5A2A');if(t>=46.4&&t<47.1)burst(420,520,46.4,t,'#3df0d8');
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 const e=sm(62,62.8,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)"><div class="phone"><div class="scr">
  <div class="hd">Engineering Guide<br>by IQRA<small>SURVEYING · LESSON</small></div>
  <div class="card"><h3>Prismatic compass</h3>
  <svg viewBox="0 0 400 200" width="100%"><circle cx="200" cy="100" r="90" fill="#F4F2EE"/><line x1="200" y1="100" x2="200" y2="22" stroke="#e8392b" stroke-width="9" stroke-linecap="round"/><line x1="200" y1="100" x2="270" y2="45" stroke="#FF5A2A" stroke-width="6" stroke-dasharray="10 7"/><circle cx="200" cy="100" r="8" fill="#15171A"/></svg>
  <div class="sl"></div><div style="font:600 22px Inter;color:#9fb0cc">Declination = 2.5° W</div></div>
  <div class="card" style="font:700 30px/1.6 Inter;font-variant-numeric:tabular-nums"><span style="color:#fff">True bearing = <b style="color:#ffb020">?</b></span></div>
  </div></div><div class="cta">Try it in the<br><span>Engineering Guide<br>by IQRA</span> app</div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
window.renderAt=render;
