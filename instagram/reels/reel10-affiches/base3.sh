#!/bin/bash
# Reel 10 v3 · take IMG_3229 · comp.py (MODNet + muurplaat, echte tafel, neonlogo hoger: studio-sgm-hoog.png)
set -e
S=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/r10; mkdir -p $S
O=$(cd "$(dirname "$0")" && pwd); ST=$O/../../studio
F=${SRC:-/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/wt-1110/IMG_3229.mov}
SS=${SS:-0.9}; D=${D:-20.9}; END=2.6
[ -f $S/p3.mp4 ] || python3.13 $O/comp.py "$F" $SS $D $S/alpha.mp4 $ST/studio-sgm-hoog.png $S/p3.mp4 $S/bg3.png
ffmpeg -nostdin -v error -y -loop 1 -t $END -i $S/bg3.png -vf "fps=30,format=yuv420p" -c:v libx264 -crf 16 -preset fast -r 30 -t $END $S/e.mp4
printf "file '$S/p3.mp4'\nfile '$S/e.mp4'\n" > $S/l.txt; ffmpeg -nostdin -v error -y -f concat -safe 0 -i $S/l.txt -c:v libx264 -crf 16 -preset fast -r 30 $S/base.mp4
DN="highpass=f=85,afftdn=nf=-28,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,loudnorm=I=-16:TP=-1.5,aresample=48000,aformat=channel_layouts=stereo"
ffmpeg -nostdin -v error -y -ss $SS -t $D -i "$F" -vn -af "$DN,afade=in:d=0.05,afade=out:st=$(python3 -c "print($D-0.2)"):d=0.2,apad" -t $(python3 -c "print($D+$END)") -ar 48000 -ac 2 $S/spraak.wav
echo BASEKLAAR
