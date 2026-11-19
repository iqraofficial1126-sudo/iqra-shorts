# Cue times for te99.html. "est": from the text (~16.3 chars/s). "words": paragraph times from paras99.json (+ exact anchors99.json).
import json,re,sys
paras=[re.sub(r'\[[a-z]+\]\s*','',p).strip() for p in open('/home/claude/p3d/scripts/n99long.txt',encoding='utf-8').read().strip().split('\n')]
C={0:{'h_right':'അപ്പോൾ ശരിയായ','h_title':'ഇതാണ് Surveying'},
1:{'e_mis':'First, mistakes','e_sys':'Second, systematic','e_acc':'Third, accidental','e_theory':'Theory of errors deal'},
2:{'t_true':'True value എന്നത്','t_err':'True error equals','t_mpv':'most probable value ഉപയോഗിക്കുന്നു','t_res':'Residual error','t_calc':'True error നമുക്ക്'},
3:{'w_def':'ഒരു observation-ന്റെ relative','w_high':'Weight high','w_ex':'Example, ഒരു angle four','w_prop':'Weight, number','w_good':'Good weather'},
4:{'l1':'Law one','l2':'Law two','l3':'Law three','l4':'Law four','l5':'Law five','l6':'Law six','l6ex':'Example, weights two','l7':'Law seven'},
5:{'m_f':'Weighted mean equals','m_ex':'Example, ഒരു angle-ന്റെ seconds','m_sum':'Sigma w x equals','m_sw':'Sigma w equals ten','m_mean':'Weighted mean thirteen','m_res':'Residuals, minus','m_chk':'Weight into residual'},
6:{'ls_def':'Most probable value എന്നത്','ls_eq':'Equal weights','ls_ne':'Unknowns more'},
7:{'x_obs':'x equals twenty four','y_obs':'y equals thirty','s_obs':'x plus y equals fifty four','s_disc':'x-ഉം y-ഉം add','s_sec':'Seconds മാത്രം'},
8:{'n_rule':'Normal equation-ന്റെ rule','n_x':'x-ന്, x equals twenty','n_x1':'two x plus y equals one hundred','n_y':'y-ന്, weight two','n_y1':'x plus three y'},
9:{'v_y':'y equals one hundred minus two x','v_sub':'Second equation-ൽ substitute','v_ysol':'y equals one hundred minus fifty six','v_mpv':'Most probable values, x equals'},
10:{'r_x':'x-ന് twenty minus','r_y':'y-ന് forty minus','r_s':'sum-ന് eighty','r_inv':'Weight high ആയ','r_sum':'Sigma w v squared equals','r_min':'മറ്റേത്'},
11:{'sum':'Summary','sum_app':'Triangulation'},
12:{'end':'Engineering Guide'}}
mode=sys.argv[1] if len(sys.argv)>1 else 'est'
if mode=='est':
    st=[];t=0
    for p in paras: st.append(t); t+=len(p)/16.3+.5
    P=[[st[i],st[i]+len(paras[i])/16.3] for i in range(len(paras))];END=t+4
else:
    P=json.load(open('paras99.json'));END=P[-1][1]+4.5
out={'S':[p[0] for p in P]+[END]}
for k,d in C.items():
    s=paras[k];a,b=P[k]
    for key,ph in d.items():
        i=s.find(ph);assert i>=0,(k,ph);out[key]=round(a+(b-a)*i/len(s),2)
if mode=='words':
    try: out.update(json.load(open('anchors99.json')))
    except FileNotFoundError: pass
json.dump(out,open('cues99.json','w'));print([round(x,1) for x in out['S']])
