#!/bin/bash
# basis + motion-track + geluid samenvoegen tot de finale video's
set -e
D=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/lv
O=$(cd "$(dirname "$0")" && pwd); V=${1:-v3}
python3 $O/v2-sound.py $D/v3-sound.wav
cd $D && ffmpeg -nostdin -v error -y -i v3-base.mp4 -framerate 30 -i mo/m%04d.png -i v3-sound.wav -filter_complex "[0:v][1:v]overlay=0:0:format=auto,noise=alls=5:allf=t,fade=in:st=0:d=0.3,format=yuv420p[v]" -map "[v]" -map 2:a -c:v libx264 -preset medium -b:v 9M -maxrate 10M -bufsize 18M -c:a aac -b:a 192k -movflags +faststart -shortest $O/flaxx-lancering-$V-met-sounddesign.mp4
ffmpeg -nostdin -v error -y -i $O/flaxx-lancering-$V-met-sounddesign.mp4 -map 0:v -c:v copy -an -movflags +faststart $O/flaxx-lancering-$V-zonder-geluid.mp4
for t in 8.6 9.8 10.8 12.2 13.3 14.5; do ffmpeg -nostdin -v error -y -ss $t -i $O/flaxx-lancering-$V-met-sounddesign.mp4 -frames:v 1 -vf scale=-2:480 h_$t.jpg; done
ffmpeg -nostdin -v error -y $(for t in 8.6 9.8 10.8 12.2 13.3 14.5; do echo -i h_$t.jpg; done) -filter_complex hstack=6 sheet4.jpg
echo KLAAR
