#!/bin/bash
set -e
S=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/r10
O=$(cd "$(dirname "$0")" && pwd); V=${1:-v1}
[ "$2" = "skipmotion" ] || { rm -rf $S/mo; node $O/motion.js $S/mo; }
python3 $O/sfx.py $S/fx.wav
ffmpeg -nostdin -v error -y -i $S/spraak.wav -i $S/fx.wav -filter_complex "[1:a]volume=0.28[m];[m][0:a]sidechaincompress=threshold=0.05:ratio=5:attack=15:release=250[md];[0:a][md]amix=inputs=2:normalize=0,alimiter=limit=0.95" -ar 48000 $S/mix.wav
ffmpeg -nostdin -v error -y -i $S/base.mp4 -framerate 30 -i $S/mo/m%04d.png -i $S/mix.wav -filter_complex "[0:v][1:v]overlay=0:0:format=auto,format=yuv420p[v]" -map "[v]" -map 2:a -c:v libx264 -preset medium -b:v 10M -maxrate 12M -bufsize 20M -c:a aac -b:a 192k -movflags +faststart -shortest $O/reel10-affiches-$V.mp4
echo RENDERKLAAR
