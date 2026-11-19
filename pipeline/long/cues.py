# Works out when each board line appears: paragraph start/end come from the voice (pause detection),
# and inside a paragraph the time is placed by where the cue phrase sits in the narration text.
import json,re,sys
paras=[re.sub(r'\[[a-z]+\]\s*','',p).strip() for p in open('scripts/n81long.txt',encoding='utf-8').read().strip().split('\n')]
P=json.load(open('long/paras.json'))   # [[start,end],...] audio seconds per paragraph
# cue phrases (exact words from the narration) -> ids used in the page
C={
0:{'h_q':'three or four','h_eq':'Statics-ന്റെ','h_title':'consistent deformation method'},
1:{'b_A':'A-യിൽ fixed','b_B':'B-യിൽ ഒരു prop','b_L':'Span L','b_w':'uniformly distributed','b_EI':'Flexural rigidity','b_R':'upward reactions','b_board':'ഇനി board'},
2:{'s1_1':'vertical reaction R A','s1_2':'Total unknowns four','s1_3':'Statics തരുന്നത്','s1_4':'Four minus three'},
3:{'s2_1':'ഇവിടെ redundant','s2_2':'Prop മാറ്റിയാൽ','s2_3':'ഇതിനെ primary'},
4:{'s3_1':'Free end B','s3_2':'right side','s3_3':'So M equals','s3_4':'Minus sign hogging'},
5:{'s4_1':'എല്ലാ external','s4_2':'Redundant ഉണ്ടായിരുന്ന','s4_3':'Same section'},
6:{'s5_1':'Unit load method','s5_2':'Minus five x squared into','s5_3':'Integrate ചെയ്താൽ','s5_4':'x equals six','s5_5':'EI കൊണ്ട്','s5_6':'Minus sign എന്നാൽ'},
7:{'s6_1':'Delta B B equals','s6_2':'x squared integrate','s6_3':'EI കൊണ്ട്','s6_4':'ഇത് L cubed'},
8:{'s7_1':'Actual beam','s7_2':'So delta B zero','s7_3':'Minus eighty one plus','s7_4':'R B equals eighty','s7_5':'ഇതാണ് consistent'},
9:{'s8_1':'Total load','s8_2':'Sum of vertical','s8_3':'Horizontal load','s8_4':'A-യെക്കുറിച്ച്','s8_5':'one hundred eighty'},
10:{'sum':'Degree, redundant','apps':'Balconies'},
11:{'yt':'Prop B','end':'Engineering Guide'},
}
out={'S':[p[0] for p in P]+[P[-1][1]]}
for k,d in C.items():
    s=paras[k];a,b=P[k]
    for key,ph in d.items():
        i=s.find(ph); assert i>=0,(k,ph)
        out[key]=round(a+(b-a)*i/len(s),2)
json.dump(out,open('long/cues.json','w'),indent=0);print(out)
