#!/bin/bash
# v11: verbeterpunten ronde 2 + eerste 0,6 s eraf
set -e
S=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/lv; O=$(cd "$(dirname "$0")" && pwd)
$O/v3-build.sh
node $O/v3-motion.js $S/mo
$O/v3-render.sh v11tmp
ffmpeg -nostdin -v error -y -ss 0.6 -i $O/flaxx-lancering-v11tmp-met-sounddesign.mp4 -c:v libx264 -preset medium -b:v 9M -maxrate 10M -bufsize 18M -pix_fmt yuv420p -c:a aac -b:a 192k -af "afade=in:d=0.05" -movflags +faststart $O/flaxx-lancering-v11-met-sounddesign.mp4
ffmpeg -nostdin -v error -y -i $O/flaxx-lancering-v11-met-sounddesign.mp4 -map 0:v -c:v copy -an -movflags +faststart $O/flaxx-lancering-v11-zonder-geluid.mp4
rm -f $O/flaxx-lancering-v11tmp-*.mp4
F=$O/flaxx-lancering-v11-met-sounddesign.mp4; L=""
for t in 0.1 0.5 4.3 8.6 14.8 17.4 22.5; do ffmpeg -nostdin -v error -y -ss $t -i $F -frames:v 1 -vf scale=-2:420 $S/w11_$t.jpg; L="$L -i $S/w11_$t.jpg"; done
ffmpeg -nostdin -v error -y $L -filter_complex hstack=7 $S/sheet11.jpg
ffprobe -v error -show_entries format=duration -of csv=p=0 $F
echo KLAAR11
