k=$1; D=$2
node render$k.mjs "[[0,0,$(python3 -c "print(round($D/3,2))")]]" > a$k.log 2>&1 &
node render$k.mjs "[[1,$(python3 -c "print(round($D/3,2))"),$(python3 -c "print(round(2*$D/3,2))")]]" > b$k.log 2>&1 &
node render$k.mjs "[[2,$(python3 -c "print(round(2*$D/3,2))"),$D]]" > c$k.log 2>&1 &
wait
printf "file d${k}_0.mp4\nfile d${k}_1.mp4\nfile d${k}_2.mp4\n" > l$k.txt && ffmpeg -loglevel error -y -f concat -i l$k.txt -c copy v$k.mp4 && ffmpeg -loglevel error -y -i v$k.mp4 -i voice$k.mp3 -i sfx$k.wav -filter_complex "[1:a]aresample=44100,aformat=channel_layouts=stereo,apad[v];[v]asplit[v1][v2];[2:a]volume=0.5[s];[s][v1]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[sd];[sd][v2]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -t $D short${k}_final.mp4 && cd wm && python3 watermark.py ../short${k}_final.mp4 ../short${k}_wm.mp4 && echo DONE $k
