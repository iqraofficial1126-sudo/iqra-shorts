h=open('/home/claude/p3d/long/te99.html').read()
h=h.replace('<script>\nconst CU','<script>\nwindow.CUES='+open('/home/claude/p3d/long/cues99.json').read()+';\nconst CU',1)
open('/home/claude/p3d/long/te99b.html','w').write(h)
