#!/bin/bash
# motion-track renderen + samenvoegen met basis, spraak en sounddesign
set -e
S=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/collab
O=$(cd "$(dirname "$0")" && pwd); V=${1:-v1}
[ "$2" = "skipmotion" ] || node $O/motion.js $S/mo
python3 $O/../lancering/varianten/sound.py $S/fx.wav 34.8 "2.2,4.0,14.95,18.1,19.85,20.8,22.8,24.4,25.2,26.1,28.35" 30.65
cp $S/spraak.wav $S/spraak33.wav
python3 $O/hooksfx.py $S/hook.wav ${HOOKANIM:+anim}
ffmpeg -nostdin -v error -y -i $S/fx.wav -i $S/hook.wav -filter_complex "[0][1]amix=inputs=2:normalize=0:weights=1 0.9" $S/fx2.wav && mv $S/fx2.wav $S/fx.wav
ffmpeg -nostdin -v error -y -i $S/spraak33.wav -i $S/fx.wav -filter_complex "[1:a]volume=0.32[m];[m][0:a]sidechaincompress=threshold=0.05:ratio=6:attack=20:release=300[md];[0:a][md]amix=inputs=2:normalize=0,alimiter=limit=0.95" -ar 48000 $S/mix.wav
ffmpeg -nostdin -v error -y -i $S/base.mp4 -framerate 30 -i $S/mo/m%04d.png -i $S/mix.wav -filter_complex "[0:v][1:v]overlay=0:0:format=auto,noise=alls=4:allf=t,fade=in:st=0:d=0.2,format=yuv420p[v]" -map "[v]" -map 2:a -c:v libx264 -preset medium -b:v 9M -maxrate 10M -bufsize 18M -c:a aac -b:a 192k -movflags +faststart -shortest $O/flaxx-collab-$V.mp4
F=$O/flaxx-collab-$V.mp4; L=""; for t in 1.2 4.5 10.0 14.0 18.3 20.0 21.6 25.0 27.5 31.5; do ffmpeg -nostdin -v error -y -ss $t -i $F -frames:v 1 -vf scale=-2:400 $S/p_$t.jpg; L="$L -i $S/p_$t.jpg"; done
ffmpeg -nostdin -v error -y $L -filter_complex hstack=10 $S/sheet-$V.jpg
echo RENDERKLAAR
