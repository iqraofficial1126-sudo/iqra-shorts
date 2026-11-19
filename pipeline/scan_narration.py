# English-only scan: run on every narration before it is voiced AND again before the Short is posted.
# usage: python3 scan_narration.py narration.txt   (exit code 1 = banned word found: do not voice / do not post)
import sys
BANNED="സമം ഗുണം ഗുണിച്ച് ഗുണിക്കുക ഹരണം ഹരിച്ച് ഹരിക്കുക ഭാഗിച്ച് ഭാഗിക്കുക കൂട്ടി കൂട്ടുക കുറച്ച് കുറയ്ക്കുക പ്രതി ഇരട്ടി മടങ്ങ് വർഗ്ഗം ഒന്ന് രണ്ട് മൂന്ന് നാല് അഞ്ച് ആറ് ഏഴ് എട്ട് ഒമ്പത് പത്ത് നൂറ് ആയിരം പകുതി ഏഴര രണ്ടര ഭാരം സാന്ദ്രത മർദ്ദം ബലം നീളം വീതി ഉയരം ആഴം വിസ്തീർണ്ണം വ്യാപ്തം".split()
bad=0
for f in sys.argv[1:]:
    s=open(f,encoding='utf-8').read()
    hits=[b for b in BANNED if b in s]
    print(f, 'OK' if not hits else 'BANNED: '+', '.join(hits)); bad|=bool(hits)
sys.exit(1 if bad else 0)
