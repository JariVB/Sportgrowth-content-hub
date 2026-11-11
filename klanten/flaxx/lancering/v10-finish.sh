#!/bin/bash
# v10: alles opnieuw + eerste 0,6 s (zwart) eraf
set -e
S=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/lv; O=$(cd "$(dirname "$0")" && pwd)
$O/v3-build.sh
node $O/v3-motion.js $S/mo
$O/v3-render.sh v10tmp
ffmpeg -nostdin -v error -y -ss 0.6 -i $O/flaxx-lancering-v10tmp-met-sounddesign.mp4 -c:v libx264 -preset medium -b:v 9M -maxrate 10M -bufsize 18M -pix_fmt yuv420p -c:a aac -b:a 192k -af "afade=in:d=0.05" -movflags +faststart $O/flaxx-lancering-v10-met-sounddesign.mp4
ffmpeg -nostdin -v error -y -i $O/flaxx-lancering-v10-met-sounddesign.mp4 -map 0:v -c:v copy -an -movflags +faststart $O/flaxx-lancering-v10-zonder-geluid.mp4
rm -f $O/flaxx-lancering-v10tmp-*.mp4
F=$O/flaxx-lancering-v10-met-sounddesign.mp4; L=""
for t in 0.1 0.5 4.3 8.6 14.8 17.4 22.5; do ffmpeg -nostdin -v error -y -ss $t -i $F -frames:v 1 -vf scale=-2:420 $S/w10_$t.jpg; L="$L -i $S/w10_$t.jpg"; done
ffmpeg -nostdin -v error -y $L -filter_complex hstack=7 $S/sheet10.jpg
ffprobe -v error -show_entries format=duration -of csv=p=0 $F
echo KLAAR10
