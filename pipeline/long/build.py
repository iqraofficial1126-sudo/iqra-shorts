import json
h=open('/home/claude/p3d/long/ld81.html').read()
h=h.replace('<script>\nconst CU','<script>\nwindow.CUES='+open('/home/claude/p3d/long/cues.json').read()+';\nconst CU',1)
open('/home/claude/p3d/long/ld81b.html','w').write(h)
