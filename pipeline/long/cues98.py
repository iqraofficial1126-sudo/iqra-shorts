# Cue times for rs98.html. Mode "est": from the text at ~15.5 chars/s. Mode "words": from Scribe word times (words98.json).
import json,re,sys
paras=[re.sub(r'\[[a-z]+\]\s*','',p).strip() for p in open('/home/claude/p3d/scripts/n98long.txt',encoding='utf-8').read().strip().split('\n')]
C={0:{'h_field':'paddy field','h_lake':'lake-ൽ','h_title':'അതാണ് remote'},
1:{'d_def':'Remote sensing എന്നാൽ','d_eye':'നമ്മുടെ കണ്ണും','d_ir':'satellite sensors','d_spec':'Electromagnetic spectrum','d_band':'ഓരോ band'},
2:{'intro':'Remote sensing process'},
3:{'a_need':'Target-ലേക്ക്','a_sun':'മിക്കപ്പോഴും'},
4:{'b_path':'Sun-ൽ നിന്ന്','b_scat':'അവിടെ ചില','b_abs':'ചിലത് absorb','b_win':'Energy നന്നായി'},
5:{'c_ref':'Target-ൽ എത്തുന്ന','c_sig':'ഓരോ material','c_veg':'Healthy vegetation','c_green':'green മാത്രം','c_nir':'near infrared-ൽ വളരെ','c_wat':'Water near','c_soil':'Soil-ന്റെ'},
6:{'d_rec':'Satellite-ലെ sensor','d_pas':'Reflected sunlight','d_act':'Sensor സ്വന്തമായി','d_night':'Active sensor-ന്'},
7:{'e_tx':'Record ചെയ്ത data','e_img':'അവിടെ അത്'},
8:{'f_int':'ആ image','f_lu':'example land use'},
9:{'g_app':'അവസാനം','g_list':'Crop monitoring'},
10:{'sum':'Summary','sum_flow':'Energy sun'},
11:{'yt':'Monsoon','end':'Engineering Guide'}}
mode=sys.argv[1] if len(sys.argv)>1 else 'est'
if mode=='est':
    starts=[];t=0
    for p in paras: starts.append(t); t+=len(p)/15.5+.6
    P=[[starts[i],starts[i]+len(paras[i])/15.5] for i in range(len(paras))];END=t+3
else:
    P=json.load(open('paras98.json'));END=P[-1][1]+3.5
out={'S':[p[0] for p in P]+[END]}
for k,d in C.items():
    s=paras[k];a,b=P[k]
    for key,ph in d.items():
        i=s.find(ph);assert i>=0,(k,ph);out[key]=round(a+(b-a)*i/len(s),2)
if mode=='words':
    W=json.load(open('anchors98.json'))   # exact word times override the estimate
    out.update(W)
json.dump(out,open('cues98.json','w'));print(out['S'])
