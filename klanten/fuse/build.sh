#!/bin/bash
# Gratis filmpje voor Fuse pilates studio (Sports NEXT 1/11), 13 s, zonder geluid
set -e
U=/root/.claude/uploads/0377841e-5e4e-590f-ab4a-00f0b5872ecb
S=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/fuse
O=$(cd "$(dirname "$0")" && pwd); node $O/titels.js $S
G="eq=contrast=0.98:brightness=0.015:saturation=0.9:gamma=1.03,colorbalance=rs=0.03:gs=0.01:bs=-0.03:rm=0.03:bm=-0.03:rh=0.02:bh=-0.03,vignette=PI/6"
ENC="-c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p -r 30"
# seg n bron ss dur zoom/s cropY(0..1) titel tstart
seg(){ ffmpeg -nostdin -v error -y -ss $3 -t $4 -i $2 -loop 1 -t $4 -i $S/$7.png -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,scale=eval=frame:w='trunc(1080*($6+$5*t)/2)*2':h=-2,crop=1080:1920:(iw-1080)/2:(ih-1920)*0.4,fps=30,setsar=1,$G[v];[1:v]format=rgba,fade=in:st=$8:d=0.6:alpha=1[o];[v][o]overlay=x=0:y='40*pow(1-min(1\,max(0\,(t-$8)/0.7))\,3)',format=yuv420p" -an $ENC -t $4 $S/$1.mp4; }
seg s1 $U/4d21f680-IMG_2848.mov 0.0 2.4 0.02 1.0 f1 0.2
seg s2 $U/807fb7bf-IMG_2846.mov 0.5 3.6 0.025 1.0 f2 0.4
seg s3 $U/73cb4ab8-IMG_2844.mov 2.0 2.8 0.02 1.35 f3 0.3
seg s4 $U/807fb7bf-IMG_2846.mov 5.0 2.4 0.025 1.08 f4 0.3
ffmpeg -nostdin -v error -y -loop 1 -t 3.6 -i $O/fuse-pilates-stand.jpg -loop 1 -t 3.6 -i $S/f5.png -filter_complex "[0:v]scale=-2:2100,crop=1080:1920,scale=eval=frame:w='trunc(1080*(1+0.035*t)/2)*2':h=-2,crop=1080:1920,fps=30,setsar=1,$G[v];[1:v]format=rgba,fade=in:st=0.5:d=0.6:alpha=1[o];[v][o]overlay=x=0:y='40*pow(1-min(1\,max(0\,(t-0.5)/0.7))\,3)',format=yuv420p" $ENC -t 3.6 $S/s5.mp4
# zachte overgangen (0,4 s)
ffmpeg -nostdin -v error -y -i $S/s1.mp4 -i $S/s2.mp4 -i $S/s3.mp4 -i $S/s4.mp4 -i $S/s5.mp4 -filter_complex "[0][1]xfade=transition=fade:duration=0.4:offset=2.0[a];[a][2]xfade=transition=fade:duration=0.4:offset=5.2[b];[b][3]xfade=transition=fade:duration=0.4:offset=7.6[c];[c][4]xfade=transition=fade:duration=0.5:offset=9.6,fade=in:st=0:d=0.3,fade=out:st=12.6:d=0.6,format=yuv420p" -c:v libx264 -preset medium -b:v 8M -maxrate 9M -bufsize 16M -pix_fmt yuv420p -movflags +faststart $O/fuse-sports-next-zonder-geluid.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $O/fuse-sports-next-zonder-geluid.mp4
F=$O/fuse-sports-next-zonder-geluid.mp4; L=""; for t in 0.8 3.4 6.4 8.8 12.0; do ffmpeg -nostdin -v error -y -ss $t -i $F -frames:v 1 -vf scale=-2:440 $S/p_$t.jpg; L="$L -i $S/p_$t.jpg"; done; ffmpeg -nostdin -v error -y $L -filter_complex hstack=5 $S/sheet.jpg
echo KLAARFUSE
