// ===== Short #38: Absolute, gauge, atmospheric and vacuum pressure (FM) =====
// No app lesson; end card = IQRA logo + Like & Subscribe. Timed to voice38.mp3 (92.26 s, audio seconds).
const PUNCH=[[0.15,.12],[55.0,.05],[68.8,.05]];
const HOOK='Flat tyre, gauge reads <span>ZERO</span>.<br>Is the pressure zero?';
const T_END=92.26;
// all values computed here, never typed into the picture
const P_ATM=101.3, MMHG=Math.round(P_ATM*1000/(13.595*9.81)), HW=(P_ATM/9.81).toFixed(1);
const TYRE_G=200, TYRE_ABS=P_ATM+TYRE_G, PUMP_VAC=40, PUMP_ABS=P_ATM-PUMP_VAC;
const f1=v=>v.toFixed(1);
const CAPS=[
[3.0,10.1,'A flat tyre: the gauge reads <b>zero</b>… but there is still <b>air</b> inside.'],
[10.3,15.0,'The air around us presses on everything: <i>atmospheric pressure</i>.'],
[15.1,23.6,`At sea level: <b>${f1(P_ATM)} kPa</b> = <b>${MMHG} mm</b> of mercury = <b>${HW} m</b> of water.`],
[23.8,29.3,'<i>Absolute pressure</i> is measured from a <b>perfect vacuum</b> (absolute zero).'],
[29.4,35.0,'<i>Gauge pressure</i> is measured from <b>atmospheric</b>. Gauges show this.'],
[39.7,46.6,'Below atmospheric, the gap is the <i>vacuum pressure</i>: a <b>negative</b> gauge pressure.'],
[70.9,75.4,'Absolute pressure is <b>never</b> negative. Gauge pressure can be.'],
[75.5,82.8,'In a straw, <b>atmospheric pressure</b> pushes the drink up into the low pressure.'],
];
const CAMS=[[0,0,1.6,150],[92.3,0,1.6,150]];
// pressure scale (screen px)
const SX=320, Y0=1350, PX=2.03; const PY=p=>Y0-p*PX; const YATM=PY(P_ATM);
function dial(cx,cy,r,val,lab,a,col='#ffb020'){if(a<=0)return;const ang=v=>(-135+270*(v+50)/400)*Math.PI/180;let ticks='';
 for(let v=-50;v<=350;v+=50){const q=ang(v);ticks+=`<line x1="${cx+Math.sin(q)*r*.78}" y1="${cy-Math.cos(q)*r*.78}" x2="${cx+Math.sin(q)*r*.92}" y2="${cy-Math.cos(q)*r*.92}" stroke="#15171A" stroke-width="${v===0?7:4}"/>`}
 const q=ang(val);SV.push(`<g opacity="${a}"><circle cx="${cx}" cy="${cy}" r="${r+14}" fill="#5d6b7a"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#f4f2ee" stroke="#2b303c" stroke-width="6"/>${ticks}
 <text x="${cx+Math.sin(ang(0))*r*.6}" y="${cy-Math.cos(ang(0))*r*.6+10}" font-family="Inter" font-weight="900" font-size="${r*.2}" fill="#15171A" text-anchor="middle">0</text>
 <line x1="${cx}" y1="${cy}" x2="${cx+Math.sin(q)*r*.8}" y2="${cy-Math.cos(q)*r*.8}" stroke="#e8361f" stroke-width="9" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="14" fill="#2b303c"/>
 <text x="${cx}" y="${cy+r*.5}" font-family="Inter" font-weight="800" font-size="${r*.17}" fill="#15171A" text-anchor="middle">${lab}</text></g>`)}
function varrow(x,y1,y2,col,w,a,label,side=1){if(a<=0||Math.abs(y2-y1)<4)return;const d=Math.sign(y2-y1),h=26;
 SV.push(`<g opacity="${a}"><line x1="${x}" y1="${y1}" x2="${x}" y2="${y2-d*h*.8}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x},${y2} L${x-h*.7},${y2-d*h} L${x+h*.7},${y2-d*h}Z" fill="${col}"/></g>`);
 if(label)OV.push(`<div class="chip" style="left:${x+side*24}px;top:${(y1+y2)/2}px;transform:translate(${side>0?'0':'-100%'},-50%);opacity:${a};border-color:${col};color:#fff;font-size:34px;padding:6px 14px">${label}</div>`)}
function tyre(cx,cy,a,fill){if(a<=0)return;let dots='';for(let i=0;i<14;i++){const ang=i*2.4+T*.9*(i%3+1),rr=60+((i*37)%55);dots+=`<circle cx="${cx+Math.cos(ang)*rr}" cy="${cy+Math.sin(ang)*rr*(.55+.45*fill)}" r="7" fill="#8fd0f2"/>`}
 SV.push(`<g opacity="${a}"><ellipse cx="${cx}" cy="${cy}" rx="190" ry="${120+70*fill}" fill="#20242e"/><ellipse cx="${cx}" cy="${cy}" rx="140" ry="${80+60*fill}" fill="#3a4250"/>${dots}<ellipse cx="${cx}" cy="${cy}" rx="55" ry="${30+25*fill}" fill="#9aa3ad"/></g>`)}
let T=0;
function render(t){OV=[];SV=[];T=t;
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};
 g.clearRect(0,0,W,H);{const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#1a2a4a');gr.addColorStop(1,'#0a1122');g.fillStyle=gr;g.fillRect(0,0,W,H);const rg=g.createRadialGradient(540,900,50,540,900,900);rg.addColorStop(0,'rgba(80,140,220,.18)');rg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=rg;g.fillRect(0,0,W,H)}
 // 1) flat tyre with a gauge reading zero
 const ta=sm(0.2,0.8,t)*(1-sm(10.0,10.5,t));tyre(560,1050,ta,0);dial(820,800,130,0,'kPa (gauge)',ta*sm(2.4,3.0,t));
 OV.push(`<div class="chip am big" style="left:560px;top:1250px;transform:translate(-50%,0);opacity:${ta*sm(7.0,7.5,t)}">p = 0 ?</div>`);
 // 2) atmosphere pressing down; mercury barometer
 const at=sm(10.2,10.8,t)*(1-sm(23.4,23.9,t));
 if(at>0){for(let i=0;i<7;i++){const x=150+i*130,y=520+((t*90+i*60)%160);varrow(x,y,y+110,'#bfe8ff',8,at*.85)}
  const bx=760,by0=1330,hb=sm(17.6,19.0,t)*380;SV.push(`<g opacity="${at*sm(17.2,17.8,t)}"><rect x="${bx-120}" y="${by0-40}" width="240" height="70" rx="14" fill="#9aa3ad"/><rect x="${bx-22}" y="${by0-470}" width="44" height="480" rx="20" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="4"/><rect x="${bx-16}" y="${by0-hb}" width="32" height="${hb}" fill="#c9ced6"/></g>`);
  OV.push(`<div class="chip wh" style="left:${bx+50}px;top:${by0-hb}px;transform:translate(0,-50%);opacity:${at*sm(18.4,19.0,t)}">${MMHG} mm Hg</div>`)}
 OV.push(`<div class="chip am big" style="left:540px;top:820px;transform:translate(-50%,-50%);opacity:${at*sm(15.1,15.7,t)}">p<sub>atm</sub> = ${f1(P_ATM)} kPa</div>`);
 OV.push(`<div class="chip te" style="left:540px;top:940px;transform:translate(-50%,-50%);opacity:${at*sm(21.2,21.8,t)}">= ${HW} m of water</div>`);
 // 3) the pressure scale
 const sa=sm(23.7,24.4,t)*(1-sm(75.1,75.5,t));
 if(sa>0){SV.push(`<g opacity="${sa}"><line x1="${SX}" y1="${Y0}" x2="${SX}" y2="${PY(330)}" stroke="#fff" stroke-width="6"/>
  <line x1="${SX-40}" y1="${Y0}" x2="${SX+700}" y2="${Y0}" stroke="#15171A" stroke-width="16"/><line x1="${SX-40}" y1="${Y0}" x2="${SX+700}" y2="${Y0}" stroke="#ff3b2a" stroke-width="6" opacity="${.5+.5*sm(70.8,71.4,t)*(1-sm(73.2,73.6,t))}"/>
  <line x1="${SX-40}" y1="${YATM}" x2="${SX+700}" y2="${YATM}" stroke="#3df0d8" stroke-width="6" stroke-dasharray="20 12" opacity="${sm(29.3,29.9,t)}"/></g>`);
  OV.push(`<div class="chip wh" style="left:${SX-14}px;top:${Y0}px;transform:translate(-100%,-50%);opacity:${sa*sm(24.9,25.5,t)};font-size:32px">0 abs<br><small>perfect<br>vacuum</small></div>`);
  OV.push(`<div class="chip te" style="left:${SX-14}px;top:${YATM}px;transform:translate(-100%,-50%);opacity:${sa*sm(29.4,30.0,t)};font-size:28px;padding:5px 12px;text-align:right">atm<br>${f1(P_ATM)}</div>`)}
 // definitions: abs (from zero) and gauge (from atm) for a sample point
 const dA=sm(24.0,26.0,t)*(1-sm(51.2,51.6,t));const PS=180;
 if(dA>0){varrow(SX+60,Y0,PY(PS)+0,'#ffb020',12,dA,'absolute',1);SV.push(`<circle cx="${SX+250}" cy="${PY(PS)}" r="16" fill="#ffb020" opacity="${dA}"/>`);
  const gA=sm(29.6,31.4,t)*(1-sm(51.2,51.6,t));varrow(SX+250,YATM,PY(PS),'#3df0d8',12,gA,'gauge',1)}
 // vacuum point below atm
 const vA=sm(39.7,41.0,t)*(1-sm(51.2,51.6,t));const PV=55;
 if(vA>0){SV.push(`<circle cx="${SX+520}" cy="${PY(PV)}" r="16" fill="#ff7a6a" opacity="${vA}"/>`);varrow(SX+520,YATM,PY(PV),'#ff7a6a',12,vA*sm(42.4,43.4,t),'vacuum',1);
  OV.push(`<div class="chip am" style="left:${SX+520}px;top:${PY(PV)+30}px;transform:translate(-50%,0);opacity:${vA*sm(44.8,45.4,t)};font-size:32px">gauge &lt; 0</div>`)}
 // example: tyre and pump on the same scale
 const eA=sm(51.4,52.0,t)*(1-sm(70.6,71.0,t));
 if(eA>0){const yT=PY(TYRE_ABS);varrow(SX+250,YATM,yT,'#3df0d8',12,eA*sm(52.2,53.4,t),`gauge ${TYRE_G}`,-1);
  varrow(SX+60,Y0,yT,'#ffb020',12,eA*sm(55.0,57.0,t),'',1);SV.push(`<circle cx="${SX+250}" cy="${yT}" r="18" fill="#ffb020" opacity="${eA*sm(53.2,53.6,t)}"/>`);
  OV.push(`<div class="chip am" style="left:${SX+290}px;top:${yT}px;transform:translate(0,-50%);opacity:${eA*sm(59.0,59.6,t)}">tyre: ${f1(TYRE_ABS)} kPa abs</div>`);
  const yP=PY(PUMP_ABS);varrow(SX+520,YATM,yP,'#ff7a6a',12,eA*sm(61.1,62.3,t),`vacuum ${PUMP_VAC}`,-1);varrow(SX+460,Y0,yP,'#ffb020',10,eA*sm(64.9,66.6,t),'',1);SV.push(`<circle cx="${SX+520}" cy="${yP}" r="16" fill="#ff7a6a" opacity="${eA*sm(62.0,62.4,t)}"/>`);
  OV.push(`<div class="chip am" style="left:${SX+500}px;top:${Y0+16}px;transform:translate(-50%,0);opacity:${eA*sm(68.8,69.4,t)};font-size:34px">pump: ${f1(PUMP_ABS)} kPa abs</div>`)}
 // equations
 eqPanel(t,35.0,39.6,[[35.6,'p<sub>abs</sub> = p<sub>atm</sub> + p<sub>gauge</sub>','hi']]);
 eqPanel(t,46.6,51.3,[[35.6,'p<sub>abs</sub> = p<sub>atm</sub> + p<sub>gauge</sub>',''],[46.8,'p<sub>abs</sub> = p<sub>atm</sub> − p<sub>vac</sub>','hi']]);
 eqPanel(t,54.9,70.6,[[55.1,`${f1(P_ATM)} + ${TYRE_G} = ${f1(TYRE_ABS)} kPa`,'hi'],[64.9,`${f1(P_ATM)} − ${PUMP_VAC} = ${f1(PUMP_ABS)} kPa`,'hi']]);
 // never negative
 OV.push(`<div class="chip am big" style="left:540px;top:560px;transform:translate(-50%,0);opacity:${sm(70.9,71.5,t)*(1-sm(75.2,75.6,t))}">absolute ≥ 0 · gauge can be &lt; 0</div>`);
 // straw: atmosphere pushes the drink up
 const st=sm(75.4,76.0,t)*(1-sm(82.7,83.1,t));
 if(st>0){const cx=780,lv=1180,rise=sm(76.5,79.5,t)*260;SV.push(`<g opacity="${st}"><path d="M${cx-130},${lv-180} L${cx-105},${lv+170} L${cx+105},${lv+170} L${cx+130},${lv-180}" fill="rgba(255,255,255,.15)" stroke="#fff" stroke-width="5"/>
   <path d="M${cx-122},${lv} L${cx-105},${lv+170} L${cx+105},${lv+170} L${cx+122},${lv}Z" fill="#e8762a"/><rect x="${cx-14}" y="${lv-420}" width="28" height="580" fill="rgba(255,255,255,.3)" stroke="#fff" stroke-width="4"/><rect x="${cx-10}" y="${lv-rise}" width="20" height="${rise}" fill="#e8762a"/></g>`);
  for(const dx of[-90,-55,55,90])varrow(cx+dx,lv-150,lv-6,'#bfe8ff',8,st*sm(78.7,79.3,t));
  OV.push(`<div class="chip te" style="left:${cx}px;top:${lv-440}px;opacity:${st*sm(76.9,77.5,t)}">low pressure</div>`);
  OV.push(`<div class="chip am" style="left:${cx}px;top:${lv-170}px;opacity:${st*sm(78.9,79.5,t)};font-size:32px">p<sub>atm</sub> pushes</div>`)}
 // your turn
 if(t>82.9&&t<87.0){const a=sm(82.9,83.4,t)*(1-sm(86.5,87.0,t));dial(540,1050,170,0,'perfect vacuum',a);OV.push(`<div class="chip am big" style="left:540px;top:1290px;transform:translate(-50%,0);opacity:${a*sm(84.5,85.0,t)}">gauge reads ?</div>`);
  OV.push(`<div id="q" style="top:300px;opacity:${a}">In a <span>perfect vacuum</span>,<br>what does a gauge read?</div>`)}
 OV.unshift(`<div id="top" style="opacity:${t<86.7?1:0}"><span>ABSOLUTE · GAUGE · VACUUM</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,10.3,'THE IDEA');sticker(t,51.4,'THE MATH');sticker(t,70.9,'REAL LIFE');sticker(t,82.9,'YOUR TURN');
 wipe(t,10.3);wipe(t,51.4);wipe(t,70.9);wipe(t,82.9);
 if(t>=59.0&&t<59.7)burst(SX+250,PY(TYRE_ABS),59.0,t,'#ffc244');if(t>=68.8&&t<69.5)burst(SX+520,PY(PUMP_ABS),68.8,t,'#ff7a6a');
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 const e=sm(86.7,87.5,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)">
  <img src="wm/iqra_big.png" style="width:560px">
  <div class="cta" style="margin-top:20px;font-size:64px"><span>Engineering Guide</span><br>Fluid Mechanics</div>
  <div style="margin-top:60px;padding:22px 44px;border-radius:56px;background:#FF5A2A;color:#fff;font:800 52px/1.25 Inter;text-align:center;opacity:${sm(87.5,88.1,t)}">Like &amp; Subscribe<br><span style="font-weight:600;font-size:38px">for more Engineering Guide videos</span></div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
function eqPanel(t,t0,t1,lines){const pa=sm(t0,t0+.4,t)*(1-sm(t1-.4,t1,t));if(pa<=0)return;let h='';
 for(const[st,txt,cl]of lines){const k=lin(st,st+1.0,t);if(k<=0){h+='<div class="l"></div>';continue}
  const plain=txt.replace(/<[^>]+>/g,'');const n=Math.ceil(plain.length*k);let out='',cnt=0;for(let i=0;i<txt.length;i++){if(txt[i]==='<'){const j=txt.indexOf('>',i);out+=txt.slice(i,j+1);i=j;continue}if(cnt>=n)break;out+=txt[i];cnt++}
  for(const tg of['sub','sup'])if((out.match(new RegExp('<'+tg+'>','g'))||[]).length>(out.match(new RegExp('</'+tg+'>','g'))||[]).length)out+='</'+tg+'>';h+=`<div class="l ${cl}">${out}</div>`}
 OV.push(`<div id="eq" style="opacity:${pa};transform:translateY(${(1-sm(t0,t0+.5,t))*30}px);font-size:48px">${h}</div>`)}
window.renderAt=render;
