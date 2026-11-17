import sys
js=open(sys.argv[1]).read();out=sys.argv[2]
open(out,'w').write(open('base.html').read()+js.rstrip('\n')+'\n\n</script></body></html>')
