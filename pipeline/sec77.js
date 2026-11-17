// ===== Short #77: Cut the truss (Truss: method of sections, `sec`) =====
// App defaults: Warren truss, 4 panels of 3 m, height 3 m, 40 kN at x = 6 m, 20 kN at x = 9 m, pin at A, roller at B, cut at x = 5.25 m.
const PUNCH=[[0.15,.12],[8.6,.08],[9.0,.05],[25.0,.07],[36.8,.05],[42.8,.04],[48.2,.04]];
const HOOK='Need <span>ONE</span> member force?<br>Don’t solve every joint.<br><span>CUT</span> the truss.';
const T_END=66;
const YS=2.0, HT=3, PW=3, NP=4, SPAN=NP*PW;
const LOADS=[[2,40],[3,20]]; // bottom joint index, kN
// joints: bottom 0..4 at x=0,3,6,9,12; top 5..8 at x=1.5,4.5,7.5,10.5
const JN=[];for(let i=0;i<=NP;i++)JN.push([i*PW,YS]);for(let i=0;i<NP;i++)JN.push([i*PW+PW/2,YS+HT]);
const MB=[[0,1],[1,2],[2,3],[3,4],[5,6],[6,7],[7,8],[0,5],[5,1],[1,6],[6,2],[2,7],[7,3],[3,8],[8,4]];
// ---- solve the truss (method of joints as one linear system); tension positive ----
function solveTruss(){const nj=JN.length,nm=MB.length,n=nm+3;const A=[],b=[];for(let r=0;r<2*nj;r++){A.push(new Array(n).fill(0));b.push(0)}
 MB.forEach(([i,j],k)=>{const[xi,yi]=JN[i],[xj,yj]=JN[j];const l=Math.hypot(xj-xi,yj-yi),ux=(xj-xi)/l,uy=(yj-yi)/l;A[2*i][k]+=ux;A[2*i+1][k]+=uy;A[2*j][k]-=ux;A[2*j+1][k]-=uy});
 A[0][nm]=1;A[1][nm+1]=1;A[2*NP+1][nm+2]=1;for(const[j,p]of LOADS)b[2*j+1]+=p;
 // least squares via normal equations (system is square-consistent: 18 eq, 18 unknowns)
 const M=A.map((r,i)=>[...r,b[i]]);const R=M.length,Cn=n;let row=0;const piv=[];
 for(let c=0;c<Cn&&row<R;c++){let p=row;for(let r=row+1;r<R;r++)if(Math.abs(M[r][c])>Math.abs(M[p][c]))p=r;if(Math.abs(M[p][c])<1e-9)continue;[M[row],M[p]]=[M[p],M[row]];
  for(let r=0;r<R;r++)if(r!==row){const f=M[r][c]/M[row][c];for(let k=c;k<=Cn;k++)M[r][k]-=f*M[row][k]}piv.push([row,c]);row++}
 const x=new Array(n).fill(0);for(const[r,c]of piv)x[c]=M[r][Cn]/M[r][c];return x}
const SOL=solveTruss();const FM=SOL.slice(0,MB.length);const RA=SOL[MB.length+1],RB=SOL[MB.length+2];
const kTop=MB.findIndex(([i,j])=>i===6&&j===7), kBot=MB.findIndex(([i,j])=>i===1&&j===2), kDia=MB.findIndex(([i,j])=>i===6&&j===2);
const kTop2=MB.findIndex(([i,j])=>i===7&&j===8);
const SINT=HT/Math.hypot(PW/2,HT);
const CAPS=[
[3.0,7.8,'A <b>Warren truss</b> bridge: 4 panels, 3 m each.'],
[8.0,12.8,'<b>40 kN</b> and <b>20 kN</b>. Reactions: <i>25 kN</i> and <i>35 kN</i>.'],
[13.0,18.8,'15 members: top chord <i>compression</i>, bottom chord <b>tension</b>.'],
[19.0,23.8,'Method of joints: <b>joint after joint</b>…'],
[24.0,31.2,'Instead, <b>cut</b> through 3 members and keep the <i>left part</i>.'],
[32.2,36.4,'Take moments where <b>two unknowns meet</b>.'],
[52.4,56.8,'Railway bridges, roof trusses, crane booms.'],
[57.6,61.6,'Move the cut <b>one panel right</b>. What is F<sub>top</sub> now?'],
];
const CAMS=[[0,6,3.4,70],[3,6,3.2,72],[8,6,3.3,72],[13,6,3.2,74],[24,6,3.2,74],[31,6,3.2,74],[33,3.2,4.75,104],[51,3.2,4.75,104],[53,6,3.2,72],[57,6,3.2,74],[66,6,3.2,74]];
const BLUE='#3d84e0',ORG='#ff9a1a',GREY='#8b929c';
function arrowV(p0,p1,col,a=1,w=.11){if(a<=0)return;const A=proj(p0),B=proj(p1);const dx=B[0]-A[0],dy=B[1]-A[1],L=Math.hypot(dx,dy);if(L<4)return;const ux=dx/L,uy=dy/L,hl=Math.min(K(.34),L*.5),hw=K(.17),ww=K(w)/2;
 const nx=B[0]-ux*hl,ny=B[1]-uy*hl;g.save();g.globalAlpha=a;g.shadowColor=col;g.shadowBlur=24;g.beginPath();
 g.moveTo(A[0]-uy*ww,A[1]+ux*ww);g.lineTo(nx-uy*ww,ny+ux*ww);g.lineTo(nx-uy*hw,ny+ux*hw);g.lineTo(B[0],B[1]);g.lineTo(nx+uy*hw,ny-ux*hw);g.lineTo(nx+uy*ww,ny-ux*ww);g.lineTo(A[0]+uy*ww,A[1]-ux*ww);g.closePath();
 g.fillStyle=col;g.fill();g.shadowBlur=0;g.lineWidth=3;g.strokeStyle='rgba(255,255,255,.8)';g.stroke();g.restore()}
function member(p,q,col,state,amt,t,a=1,glow=0){if(a<=0)return;const A=proj(p),B=proj(q);const w=K(.16)*(1+.22*state*amt);
 g.save();g.globalAlpha=a;g.lineCap='round';if(glow>0){g.shadowColor='#ffffff';g.shadowBlur=30*glow}g.beginPath();g.moveTo(A[0],A[1]);g.lineTo(B[0],B[1]);g.lineWidth=w+8;g.strokeStyle='#2b303c';g.stroke();g.shadowBlur=0;g.lineWidth=w;g.strokeStyle=col;g.stroke();
 if(amt>0&&state!==0){const dx=B[0]-A[0],dy=B[1]-A[1],L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L,s=K(.06);g.strokeStyle=`rgba(255,255,255,${.85*amt})`;g.lineWidth=4;
  for(let i=0;i<4;i++){let f=((i/4)+t*.35)%1;for(const side of[0,1]){let u=state>0?f*.5:.5-f*.5;const pos=side?1-u:u;if(pos<.1||pos>.9)continue;const cx=A[0]+dx*pos,cy=A[1]+dy*pos;
    let d=(side?-1:1)*(state>0?1:-1);g.beginPath();g.moveTo(cx-ux*s*d-uy*s,cy-uy*s*d+ux*s);g.lineTo(cx,cy);g.lineTo(cx-ux*s*d+uy*s,cy-uy*s*d-ux*s);g.stroke()}}}
 g.restore()}
function joint(p,a=1,r=.1){if(a<=0)return;g.save();g.globalAlpha=a;circ(X(p[0]),Y(p[1]),K(r),'#2b303c');circ(X(p[0]),Y(p[1]),K(r*.5),'#d9dde3');g.restore()}
function dimV(x,y0,y1,label,col,a,left=false){if(a<=0)return;const A=proj([x,y0]),B=proj([x,y1]);
 SV.push(`<g opacity="${a}" stroke="${col}" stroke-width="5" stroke-linecap="round"><line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}"/><line x1="${A[0]-16}" y1="${A[1]}" x2="${A[0]+16}" y2="${A[1]}"/><line x1="${B[0]-16}" y1="${B[1]}" x2="${B[0]+16}" y2="${B[1]}"/></g>`);
 OV.push(`<div class="chip wh" style="left:${left?A[0]-20:A[0]+22}px;top:${(A[1]+B[1])/2}px;transform:translate(${left?'-100%':'0'},-50%);font-size:34px;padding:6px 14px;opacity:${a};color:${col};border-color:${col}">${label}</div>`)}
function dimH(x0,x1,y,label,col,a){if(a<=0)return;const A=proj([x0,y]),B=proj([x1,y]);
 SV.push(`<g opacity="${a}" stroke="${col}" stroke-width="5" stroke-linecap="round"><line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}"/><line x1="${A[0]}" y1="${A[1]-16}" x2="${A[0]}" y2="${A[1]+16}"/><line x1="${B[0]}" y1="${B[1]-16}" x2="${B[0]}" y2="${B[1]+16}"/></g>`);
 OV.push(`<div class="chip wh" style="left:${(A[0]+B[0])/2}px;top:${A[1]+18}px;transform:translate(-50%,0);font-size:34px;padding:6px 14px;opacity:${a};color:${col};border-color:${col}">${label}</div>`)}
function eqPanel(t,t0,t1,lines){const pa=sm(t0,t0+.4,t)*(1-sm(t1-.4,t1,t));if(pa<=0)return;let h='';
 for(const[st,txt,cl]of lines){const k=lin(st,st+1.0,t);if(k<=0){h+='<div class="l"></div>';continue}
  const plain=txt.replace(/<[^>]+>/g,'');const n=Math.ceil(plain.length*k);let out='',cnt=0;for(let i=0;i<txt.length;i++){if(txt[i]==='<'){const j=txt.indexOf('>',i);out+=txt.slice(i,j+1);i=j;continue}if(cnt>=n)break;out+=txt[i];cnt++}
  if((out.match(/<sub>/g)||[]).length>(out.match(/<\/sub>/g)||[]).length)out+='</sub>';h+=`<div class="l ${cl}">${out}</div>`}
 OV.push(`<div id="eq" style="opacity:${pa};transform:translateY(${(1-sm(t0,t0+.5,t))*30}px);font-size:46px">${h}</div>`)}
function scenery(t){// river and abutments
 g.fillStyle='#3f8fc6';g.fillRect(X(0),Y(0)-2,X(SPAN)-X(0),K(1.6));g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=4;
 for(let i=0;i<8;i++){const wx=((i*1.7+t*.6)%SPAN);g.beginPath();g.moveTo(X(wx),Y(-.3-(i%3)*.35));g.lineTo(X(Math.min(wx+.8,SPAN)),Y(-.3-(i%3)*.35));g.stroke()}
 for(const[x0,x1]of[[-1.2,0],[SPAN,SPAN+1.2]]){rr(X(x0),Y(YS),K(x1-x0),K(YS+1.6),6);g.fillStyle='#c9c3b8';g.fill();g.lineWidth=4;g.strokeStyle='rgba(40,40,50,.35)';g.stroke()}}
function train(x,a){if(a<=0)return;g.save();g.globalAlpha=a;for(let c=0;c<3;c++){const x0=x-c*2.6;rr(X(x0-2.4),Y(YS+1.25),K(2.4),K(1.0),10);g.fillStyle=c?'#2f6db3':'#d8452e';g.fill();
  for(let w=0;w<3;w++){rr(X(x0-2.2+w*.75),Y(YS+1.1),K(.5),K(.35),5);g.fillStyle='#cfe8ff';g.fill()}
  circ(X(x0-1.9),Y(YS+.2),K(.16),'#222');circ(X(x0-.5),Y(YS+.2),K(.16),'#222')}g.restore()}
function render(t){OV=[];SV=[];
 const c=cr(CAMS,t);CAM={cx:c[0],cy:c[1],k:c[2]*punch(t)};
 if(t>8.6&&t<9.4){CAM.cy+=Math.sin((t-8.6)*60)*Math.exp(-(t-8.6)*6)*.06}
 g.clearRect(0,0,W,H);background(t);scenery(t);
 // deck
 g.fillStyle='#6b6f78';g.fillRect(X(-.2),Y(YS-.05),X(SPAN+.2)-X(-.2),K(.25));
 const colOn=sm(13.2,14.2,t);const cut=sm(24.6,25.6,t);const split=sm(26.4,27.8,t)*(1-sm(52.0,52.8,t));
 const cutX=lerp(5.25,8.25,sm(57.8,59.0,t));
 const cutSet=t<57.6?[kTop,kDia,kBot]:[kTop2,MB.findIndex(([i,j])=>i===7&&j===3),MB.findIndex(([i,j])=>i===2&&j===3)];
 MB.forEach(([i,j],k)=>{const bt=3.2+k*.18;const a=sm(bt,bt+.3,t);if(a<=0)return;const P=JN[i],Q=JN[j];
  const st=FM[k]<0?1:-1;const col=colOn>.5?(st>0?BLUE:ORG):GREY;const off=split*2.2,fr=1-.75*split;
  const isCut=cutSet.includes(k)&&cut>0;const glow=isCut?cut*(.6+.4*Math.sin(t*6)):0;
  const xl=Math.min(P[0],Q[0]),xr=Math.max(P[0],Q[0]);
  if(xr<=cutX+1e-6){member(P,Q,col,st,colOn,t,a,glow)}
  else if(xl>=cutX-1e-6){member([P[0]+off,P[1]],[Q[0]+off,Q[1]],col,st,colOn,t,a*fr,glow)}
  else{const u=(cutX-P[0])/(Q[0]-P[0]);const I=[cutX,P[1]+(Q[1]-P[1])*u];const L=P[0]<Q[0]?P:Q,Rr=P[0]<Q[0]?Q:P;
   if(split<=0)member(P,Q,col,st,colOn,t,a,glow);else{member(L,[I[0]-.04,I[1]],col,st,colOn,t,a,glow);member([I[0]+off+.04,I[1]],[Rr[0]+off,Rr[1]],col,st,colOn,t,a*fr,0)}}});
 JN.forEach((p,i)=>{const a=sm(3.0+i*.12,3.3+i*.12,t);const right=p[0]>cutX;joint(right?[p[0]+split*2.2,p[1]]:p,a*(right?1-.75*split:1))});
 // joint-by-joint tour (method of joints = many steps)
 if(t>19&&t<24){const order=[0,5,1,6,2,7,3,8,4];const k=Math.floor((t-19.2)/.5);order.forEach((ji,n)=>{if(n<=k){const p=JN[ji];const a=n===k?1:.45;g.save();g.globalAlpha=a*(1-sm(23.4,23.8,t));g.lineWidth=6;g.strokeStyle='#ffd36b';g.beginPath();g.arc(X(p[0]),Y(p[1]),K(.32),0,7);g.stroke();g.restore()}});
  const kk=Math.min(9,Math.max(0,k+1));OV.push(`<div class="chip am big" style="left:540px;top:620px;opacity:${sm(19.2,19.5,t)*(1-sm(23.4,23.8,t))}">joint ${kk} of 9 …</div>`)}
 // supports
 pinSup(0,YS-.3,1);rollSup(SPAN+split*2.2,YS-.3,1);
 // loads & reactions
 for(const[jn,p]of LOADS){const x=JN[jn][0]+(JN[jn][0]>cutX?split*2.2:0);const t0=jn===2?8.2:8.6;const drop=Math.max(0,t0+.4-t)*8;const la=sm(t0,t0+.15,t)*(1-sm(52.0,52.4,t)+sm(57.2,57.6,t));
  if(la>0){arrowV([x,YS+1.6+drop],[x,YS+.15+drop],C.AM,la*(JN[jn][0]>cutX?1-.75*split:1),.12);chip([x,YS+1.65+drop],`${p} kN`,'am',la*(JN[jn][0]>cutX?1-.75*split:1),-4)}}
 const ra=sm(10.0,10.8,t)*(1-sm(56.8,57.2,t));if(ra>0){arrowV([0,YS-1.7],[0,YS-.35],C.TE,ra,.12);chip([1.05,YS-.9],`R<sub>A</sub> ${RA.toFixed(0)} kN`,'te',ra,0);
  const rb=ra*(1-split*.75);arrowV([SPAN+split*2.2,YS-1.7],[SPAN+split*2.2,YS-.35],C.TE,rb,.12);chip([SPAN+split*2.2-1.05,YS-.9],`R<sub>B</sub> ${RB.toFixed(0)} kN`,'te',rb,0)}
 const dl=sm(5.6,6.4,t)*(1-sm(12.4,13,t));if(dl>0){dimH(0,PW,YS+HT+.7,'3 m','#ffffff',dl);dimV(3,YS+.12,YS+HT-.12,'3 m','#ffffff',dl)}
 const lg=sm(14.2,14.8,t)*(1-sm(18.6,19.2,t));if(lg>0){chip([6,YS+HT+.95],'top chord: compression','te',lg,0);chip([6,YS-.55],'bottom chord: tension','am',lg,'below')}
 // the cut
 if(cut>0){const yTop=YS+HT+1.0,yBot=YS-.8;const yy=lerp(yTop,yBot,cut);g.save();g.setLineDash([18,12]);g.lineWidth=7;g.strokeStyle='#ff3b2a';g.beginPath();g.moveTo(X(cutX),Y(yTop));g.lineTo(X(cutX),Y(yy));g.stroke();g.restore();
  const p=proj([cutX,yy]);OV.push(`<div style="position:absolute;left:${p[0]-34}px;top:${p[1]-34}px;font-size:60px;opacity:${(1-sm(26,26.6,t))*cut}">✂️</div>`)}
 // unknown forces at the cut (left part) — arrows pointing away from the joint = assumed tension
 const fa=sm(28.2,28.8,t)*(1-sm(51.6,52.2,t));
 if(fa>0&&t<57.6){const xl=cutX-.05;
  const val=(k,lab,t0)=>{const v=FM[k];const known=sm(t0,t0+.5,t);return known>0?`${lab} = ${Math.abs(v).toFixed(2)} kN ${v<0?'C':'T'}`:`${lab} = ?`};
  arrowV([xl-.9,YS+HT],[xl+.25,YS+HT],'#ffffff',fa,.09);chip([xl+.1,YS+HT+.35],val(kTop,'F<sub>top</sub>',36.6),FM[kTop]<0&&t>36.6?'te':'wh',fa,0);
  const dy=(YS+HT)-(YS+HT-(cutX-4.5)*2);const pd=[cutX,YS+HT-(cutX-4.5)*2];arrowV([pd[0]-.45,pd[1]+.9],[pd[0]+.25,pd[1]-.5],'#ffffff',fa,.09);chip([pd[0]+.95,pd[1]-.2],val(kDia,'F<sub>d</sub>',48.4),t>48.4?'am':'wh',fa,0);
  arrowV([xl-.9,YS],[xl+.25,YS],'#ffffff',fa,.09);chip([xl+.1,YS-.25],val(kBot,'F<sub>bot</sub>',42.6),t>42.6?'am':'wh',fa,'below')}
 // moment points & lever arms
 const m1=sm(34.0,34.6,t)*(1-sm(40.6,41.0,t));if(m1>0){const p=proj([6,YS]);SV.push(`<circle cx="${p[0]}" cy="${p[1]}" r="${K(.34)}" fill="none" stroke="#ffd36b" stroke-width="7" opacity="${m1}"/>`);
  dimH(0,6,YS-1.0,'6 m','#ffd36b',m1);dimV(-.6,YS,YS+HT,'3 m','#ffd36b',m1)}
 const m2=sm(40.8,41.4,t)*(1-sm(46.6,47.0,t));if(m2>0){const p=proj([4.5,YS+HT]);SV.push(`<circle cx="${p[0]}" cy="${p[1]}" r="${K(.34)}" fill="none" stroke="#ffd36b" stroke-width="7" opacity="${m2}"/>`);
  dimH(0,4.5,YS-1.0,'4.5 m','#ffd36b',m2);dimV(-.6,YS,YS+HT,'3 m','#ffd36b',m2)}
 // equations (numbers from the solver and the geometry)
 eqPanel(t,33.4,52.0,[[34.0,'ΣM about the diagonal’s lower joint:',''],[35.2,`${RA.toFixed(0)} × 6 = F<sub>top</sub> × 3`,''],[36.4,`F<sub>top</sub> = ${Math.abs(FM[kTop]).toFixed(2)} kN  compression`,'hi'],[41.2,`${RA.toFixed(0)} × 4.5 = F<sub>bot</sub> × 3`,''],[42.4,`F<sub>bot</sub> = ${Math.abs(FM[kBot]).toFixed(2)} kN  tension`,'am2'],[47.4,`ΣF<sub>y</sub>: F<sub>d</sub> sin θ = ${RA.toFixed(0)} → ${Math.abs(FM[kDia]).toFixed(2)} kN T`,'am2']]);
 // real life: a train crosses
 if(t>52.2&&t<57.2){train(lerp(-3,SPAN+9,lin(52.6,57.0,t)),sm(52.4,52.8,t)*(1-sm(56.8,57.2,t)))}
 // your turn
 const qa=sm(59.0,59.6,t)*(1-sm(61.6,62,t));if(qa>0){chip([cutX+.2,YS+HT+.35],'F<sub>top</sub> = ?','wh big',qa,0)}
 if(t>57.3&&t<62){const a=sm(57.3,57.7,t)*(1-sm(61.6,62,t));OV.push(`<div id="q" style="top:440px;opacity:${a}">Cut one panel right:<br>F<sub>top</sub> = <span>?</span></div>`)}
 OV.unshift(`<div id="top" style="opacity:${t<62?1:0}"><span>TRUSS · METHOD OF SECTIONS</span></div>`);
 OV.push(caption(t));hook(t);
 sticker(t,3.0,'THE IDEA');sticker(t,31.6,'THE MATH');sticker(t,52.2,'REAL LIFE');sticker(t,57.0,'YOUR TURN');
 wipe(t,32);wipe(t,52.2);wipe(t,57);
 if(t>=25.0&&t<25.7){const p=proj([cutX,YS+HT/2]);burst(p[0],p[1],25.0,t,'#FF5A2A')}
 if(t>=36.8&&t<37.5)burst(420,500,36.8,t,'#3df0d8');if(t>=42.8&&t<43.5)burst(420,640,42.8,t,'#ffc244');if(t>=48.2&&t<48.9)burst(420,700,48.2,t,'#ffc244');
 OV.push(`<div id="prog" style="width:${clamp(t/T_END)*1080}px"></div>`);
 const e=sm(62,62.8,t);document.getElementById('gl').style.filter=e>0?`blur(${e*14}px) brightness(${1-e*.45})`:'none';
 if(e>0)OV.push(`<div id="end" style="opacity:${e};transform:translateY(${(1-e)*60}px)"><div class="phone"><div class="scr">
  <div class="hd">Engineering Guide<br>by IQRA<small>STRUCTURAL ANALYSIS I · LESSON</small></div>
  <div class="card"><h3>Truss: method of sections</h3>
  <svg viewBox="0 0 400 170" width="100%"><g stroke-width="9" stroke-linecap="round"><path d="M30 140 L380 140" stroke="#ff9a1a"/><path d="M75 50 L335 50" stroke="#3d84e0"/>
  <path d="M30 140 L75 50 L120 140 L165 50 L210 140 L255 50 L300 140 L335 50 L380 140" stroke="#9aa3ad" fill="none"/></g><line x1="278" y1="20" x2="278" y2="165" stroke="#ff3b2a" stroke-width="5" stroke-dasharray="10 7"/></svg>
  <div class="sl"></div><div style="font:600 22px Inter;color:#9fb0cc">Cut position x = 8.25 m</div></div>
  <div class="card" style="font:700 30px/1.6 Inter;font-variant-numeric:tabular-nums"><span style="color:#fff">F<sub>top</sub> = <b style="color:#ffb020">?</b></span></div>
  </div></div><div class="cta">Try it in the<br><span>Engineering Guide<br>by IQRA</span> app</div></div>`);
 document.getElementById('ov').innerHTML=OV.join('');document.getElementById('svg').innerHTML=SV.join('');return true}
window.renderAt=render;
