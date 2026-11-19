h=open('/home/claude/p3d/long/rs98.html').read()
h=h.replace('<script>\nconst CU','<script>\nwindow.CUES='+open('/home/claude/p3d/long/cues98.json').read()+';\nconst CU',1)
open('/home/claude/p3d/long/rs98b.html','w').write(h)
