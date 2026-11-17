# Independent recalculation of S3 Short examples (textbook formulas), compared with the app's shown values.
from math import *
g=9.81; rho=1000; R=[]
def chk(code,what,mine,app,tol=0.006):
    ok=abs(mine-app)<=tol*max(1,abs(app)); R.append((code,what,round(mine,4),app,'PASS' if ok else 'MISMATCH'))
# Fluid unit 1
chk('den','weight of 1 m3 water kN',rho*g/1000,9.81)
chk('cap','rise mm (sigma .0728,theta 0,d 2mm)',4*.0728/(rho*g*.002)*1000,14.84)
chk('hyd','force kN (a1,H2,b1.5)',rho*g*(1+1)*(2*1.5)/1000,58.86)
A=2*3; hb=1.5+1.5*sin(radians(30)); IG=2*27/12
chk('inc','F kN',rho*g*hb*A/1000,132.44); chk('inc','h* m',hb+IG*sin(radians(30))**2/(A*hb),2.33,0.01)
Fx=rho*g*2.5*2/1000; Fy=rho*g*(1.5*2+pi*4/4)/1000
chk('crv','Fx kN',Fx,49.05); chk('crv','Fy kN',Fy,60.25); chk('crv','F kN',hypot(Fx,Fy),77.69); chk('crv','angle deg',degrees(atan2(Fy,Fx)),50.9,0.01)
P=.5*g*100; W=(3+9)/2*12*2400*g/1000
Wr=3*12*2400*g/1000; Wt=6*12/2*2400*g/1000; Mr=Wr*7.5+Wt*4; Mo=P*10/3
chk('dam','P kN/m',P,491,0.01); chk('dam','W kN/m',W,1695); chk('dam','FoS overturning',Mr/Mo,5.96); chk('dam','FoS sliding',.55*W/P,1.90)
x=(Mr-Mo)/W; e=4.5-x; chk('dam','resultant from toe m',x,4.79); chk('dam','p heel kN/m2',W/9*(1-6*e/9),224,0.01); chk('dam','p toe kN/m2',W/9*(1+6*e/9),153,0.01)
Lg=4/cos(radians(22)); Pl=.5*g*(36-4)*Lg; Rl=Pl/(2*sin(radians(22)))
chk('lck','P kN',Pl,677,0.01); chk('lck','R kN',Rl,904,0.01); chk('lck','Hx kN',Pl*cos(radians(22)),628,0.01); chk('lck','Hz kN',Rl-Pl*sin(radians(22)),650,0.01)
# unit 2
V=.6; BM=(1/12)/V; chk('buo','GM m',BM-(.5-.3),-0.06,0.05); chk('buo','depth m',600/1000,0.60)
Ws=4/3*pi*g; chk('sub','W kN',Ws,41,0.02); chk('sub','couple kNm',Ws*.25*sin(radians(30)),5,0.05)
chk('lag','journey s',(6*10-.4*50)/6,6.7,0.01); chk('lag','accel m/s2',1.5*(6*.4/16),0.225)
chk('con','v1',0.1/(pi*.15**2),1.41,0.01); chk('con','v2',0.1/(pi*.075**2),5.66)
chk('psi','speed',hypot(1.5,1),1.80)
# unit 3
a1=pi*.04/4; a2=pi*.01/4; v1=.06/a1; v2=.06/a2
chk('ber','v1',v1,1.91); chk('ber','v2',v2,7.64); chk('ber','p2 kPa',(100000+rho*(v1**2-v2**2)/2-rho*g*.5)/1000,67.74)
chk('pit','v',.98*sqrt(2*g*.15),1.68)
h=.15*12.6; a1=pi*.04/4; a2=a1/4; Qv=.97*a1*a2*sqrt(2*g*h)/sqrt(a1**2-a2**2)
chk('ven','h m',h,1.89); chk('ven','Q L/s',Qv*1000,47.91); chk('ven','v1',Qv/a1,1.53,0.01); chk('ven','v2',Qv/a2,6.10)
chk('ofm','Q L/s',Qv*.62/.97*1000,30.63)
v=.97*sqrt(2*g*1.5); chk('ori','v',v,5.26); chk('ori','range m',v*sqrt(2*1/g),2.38); chk('ori','Q L/s',.62*pi*.03**2/4*sqrt(2*g*1.5)*1000,2.38)
chk('lrg','free L/s',2/3*.62*1*sqrt(2*g)*(1.4**1.5-1)*1000,1202); chk('lrg','drowned L/s',.62*.4*sqrt(2*g*1.4)*1000,1300)
a=pi*.04**2/4; chk('emp','t s',2*4*(sqrt(3)-sqrt(.5))/(.62*a*sqrt(2*g)),2376)
v=.02/(pi*.01/4); chk('pip','v',v,2.55); chk('pip','Re',v*.1/1e-6,254648,0.002); chk('pip','hf m',.02*200*v*v/(2*g*.1),13.22)
v1=.03/(pi*.01/4); v2=.03/(pi*.04/4); chk('mnr','hL m',(v1-v2)**2/(2*g),0.418)
A1=pi*.09/4; A2=pi*.0225/4; v1=.15/A1; v2=.15/A2; p2=200000+rho*(v1**2-v2**2)/2; t=radians(60)
Fxb=200000*A1-p2*A2*cos(t)+rho*.15*(v1-v2*cos(t)); Fyb=p2*A2*sin(t)+rho*.15*v2*sin(t)
chk('bend','F kN',hypot(Fxb,Fyb)/1000,12.88)
# unit 4,5
Ac=4; Pc=6; Vc=1/.015*(Ac/Pc)**(2/3)*sqrt(.001); chk('chn','V',Vc,1.61); R.append(('chn','Q m3/s and Froude (not shown in app working)',round(Vc*4,3),round(Vc/sqrt(g*1),3),'INFO'))
chk('eco','best P m (rect b=2y, A=8)',4*2,8.00)
Qn=2/3*.62*1*sqrt(2*g)*.3**1.5; chk('not','Q L/s',Qn*1000,300.84); chk('not','Q at 2H L/s',Qn*2**1.5*1000,851,0.01)
chk('trp','rect L/s',2/3*.62*1*sqrt(2*g)*.25**1.5*1000,228.9); chk('trp','half-V pair L/s',8/15*.62*sqrt(2*g)*.5*.25**2.5*1000,22.9)
R.append(('wei','Q without end contractions (script must NOT use)',round(2/3*.62*2*sqrt(2*g)*.4**1.5*1000,1),889,'INFO'))
chk('wei','Q with 2 end contractions (L-0.2H) L/s',2/3*.62*(2-.2*.4)*sqrt(2*g)*.4**1.5*1000,889)
q=2; y=.45; V=q/y; E=y+V*V/(2*g); yc=(q*q/g)**(1/3)
chk('spe','E',E,1.46); chk('spe','yc',yc,.74,0.01); chk('spe','Fr',V/sqrt(g*y),2.12)
lo,hi=yc,5
for _ in range(80):
    m=(lo+hi)/2
    if m+q*q/(2*g*m*m)<E: lo=m
    else: hi=m
chk('spe','alternate depth',lo,1.34,0.01)
Fr=6/sqrt(g*.3); y2=.15*(sqrt(1+8*Fr**2)-1); chk('jmp','y2',y2,1.34,0.01); chk('jmp','V2',1.8/y2,1.34,0.01); chk('jmp','EL',(y2-.3)**3/(4*.3*y2),0.70,0.01)
# labs (cm, g=981)
G=981; a1=pi*25/4; a2=pi*6.25/4
for code,hg,t,app_qt,app_cd in [('lvt',5.5,10,1869,.963),('lor',9.2,12,2418,.620)]:
    hw=12.6*hg; Qt=a1*a2*sqrt(2*G*hw)/sqrt(a1**2-a2**2); Qa=1800*10/t
    chk(code,'Qt cm3/s',Qt,app_qt); chk(code,'Cd',Qa/Qt,app_cd)
ap=pi*2.5**2/4; v=600/ap/100; hf=.189
chk('lpf','v m/s',v,1.22); chk('lpf','f',2*g*.025*hf/(2*v*v),.031,0.02); chk('lpf','Chezy C',v/sqrt(.025/4*hf/2),50.3); chk('lpf','Re',v*.025/1e-6,30558,0.003)
Qa=18000/12.9; V1=Qa/(pi*9/4); chk('lfl','V1 cm/s',V1,197); chk('lfl','K',12.6*1.4/(V1**2/(2*G)),.89,0.01)
chk('lnr','Cd',1500/(2/3*10*sqrt(2*G)*4.1**1.5),.612); chk('lnr','K',1500/4.1**1.5,180.7)
chk('lnt','Cd',1500/(8/15*sqrt(2*G)*6.5**2.5),.589); chk('lnt','K',1500/6.5**2.5,13.9,0.01)
chk('lem','Cd',2*pi*100*(sqrt(40)-sqrt(20))/(pi*2.25/4*24.8*sqrt(2*G)),.600)
Qt=pi*sqrt(2*G*40); Qa=9000/16.5; Cv=19.4/(2*sqrt(2.5*40))
chk('ljt','Qt',Qt,880,0.01); chk('ljt','Cd',Qa/Qt,.620); chk('ljt','Cv',Cv,.970); chk('ljt','Cc',(Qa/Qt)/Cv,.639)
GM=250*10/(8500*tan(radians(3.5))); chk('lmh','GM cm',GM,4.81); chk('lmh','K cm',2.11*sqrt(G*GM)/(2*pi),23.1)
Q=1800*15/6.3; y1=3.0; V1=Q/(7.5*y1); Fr=V1/sqrt(G*y1); y2=y1/2*(sqrt(1+8*Fr*Fr)-1)
chk('lhj','Q',Q,4286); chk('lhj','Fr1',Fr,3.51,0.01); chk('lhj','y2 cm',y2,13.5,0.01); chk('lhj','EL cm',(y2-y1)**3/(4*y1*y2),7.1,0.01)
# Structural Analysis I
chk('trs','C kN',20/(2*sin(radians(45))),14.14); chk('trs','T kN',14.14*cos(radians(45)),10)
RB=(40*6+20*9)/12; RA=60-RB; chk('sec','RA',RA,25); chk('sec','RB',RB,35); chk('sec','top chord',RA*6/3,50); chk('sec','diagonal',RA/(3/hypot(1.5,3)),27.95)
EI=2e4; chk('cjb','slope mrad',20*36/(16*EI)*1000,2.25); chk('cjb','defl mm',20*216/(48*EI)*1000,4.50)
chk('uld','defl mm',20*2*3*(2*6*3-9-4)/(6*6*EI)*1000,3.83)
chk('prp','free sag mm',10*6**4/(8*EI)*1000,81); chk('prp','RB',3*10*6/8,22.5); chk('prp','MA',10*36/2-22.5*6,45)
chk('cdm','fBB mm/kN',216/(3*EI)*1000,3.6)
d0=4*(20*216/12)/EI; f11=(2*64/3+16*6)/EI; X=-d0/f11
chk('cdf','delta0 mm',d0*1000,72); chk('cdf','f11 mm/kN',f11*1000,6.9333); chk('cdf','HD',X,-10.38); chk('cdf','MB',X*4,-41.54)
chk('cdt','f mm/kN (EA=1e5)',(2*.64*4+2*.36*3+2*5)/1e5*1000,.1728)
MB=(10*216/4+10*64/4)/20
chk('cnt','MB',MB,35); chk('cnt','RA',30-MB/6,24.17); chk('cnt','RC',20-MB/4,11.25); chk('cnt','RB',100-(30-MB/6)-(20-MB/4),64.58)
chk('sdm','EI thetaB',25/1.25,20); chk('mdm','DF_BA',.5/1.25,.4)
H=5*1600/32; chk('cab','H',H,250); chk('cab','Tmax',hypot(H,100),269.26)
H=30*1e4/80; chk('sus','Tmax',hypot(H,1500),4039,0.01); chk('sus','backstay V',H*tan(radians(30)),2165,0.01); chk('sus','tower',1500+H*tan(radians(30)),3665,0.01)
chk('arc','H',10*900/48,187.5)
chk('inf','ordinate',3*6/10,1.8); chk('inf','max ord',4*6/10,2.4); chk('inf','UDL M',10*.5*10*2.4,120)
RA=(40*5.5+20*8.5)/12; chk('rol','abs max M',RA*6.5-20*3,151.25)
R.append(('rol','heaviest load alone at midspan PL/4 kNm',40*12/4,'-','INFO'))
# Surveying
chk('chs','true slope',140*20.03/20,140.21); chk('chs','horizontal',140.21*cos(radians(3)),140.02)
chk('cps','true bearing',52+2.5,54.5)
chk('sxt','angle',2*32.2-.4,64)
chk('lvd','RL B',100+1.425-2.025,99.4); chk('lvd','distance',100*(1.625-1.225),40)
chk('lvb','check',(1.525+1.38)-(2.64+1.115),-.85)
gx=(103.8-101.4+105.2-102.6)/2/20; gy=(102.6-101.4+105.2-103.8)/2/20; gr=hypot(gx,gy)
chk('ctr','102 on AB m',.6/2.4*20,5); chk('ctr','gradient 1 in',1/gr,7.10)
chk('ctm','1 in',219.3/3.71,59.14,0.003)
chk('thd','error sec',.012/60*206265,41.3)
chk('thi','AP',14*sin(radians(46+20/60))/sin(radians(61+19/60)),11.544,0.001); chk('thi','BP',14*sin(radians(72+21/60))/sin(radians(61+19/60)),15.207,0.001)
chk('thv','height',1.45+60*tan(radians(18)),20.95)
chk('tac','D',100*1.85*cos(radians(8))**2,181.4); chk('tac','V',.5*100*1.85*sin(radians(16)),25.50)
bad=[r for r in R if r[4]=='MISMATCH']
for r in R: print(*r,sep=' | ')
print('\nchecks',len(R),'mismatch',len(bad))
