#!/bin/bash
# Reel 10 v2 · take IMG_3229 (gsm 4K, 10/11) · uitknippen met MODNet-alfamasker (matte.py), geen groen doek
set -e
S=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/r10; mkdir -p $S
O=$(cd "$(dirname "$0")" && pwd); ST=$O/../../studio
F=${SRC:-/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/wt-1110/IMG_3229.mov}
SS=${SS:-0.9}; D=${D:-20.9}; END=2.6
# persoon op 75%, hoofd onder het neonlogo, tafelrand achter het bureau (y 1573)
ffmpeg -nostdin -v error -y -ss $SS -t $D -i "$F" -i $S/alpha.mp4 -loop 1 -i $ST/studio-sgm.png -loop 1 -i $ST/studio-bureau-laag.png -filter_complex "[0:v]scale=1080:1920:flags=lanczos,fps=30,eq=brightness=-0.02:saturation=0.95:contrast=1.04,colorbalance=rs=-0.03:bs=0.04:rh=-0.02:bh=0.03,unsharp=5:5:0.5:5:5:0,format=yuva444p[o];[1:v]format=gray,tmix=frames=3:weights='1 2 1',curves=all='0/0 0.12/0 0.88/1 1/1'[a];[o][a]alphamerge,scale=810:-1:flags=lanczos[pp];[2:v]format=rgba[bg];[bg][pp]overlay=x=135:y=455:shortest=1[c1];[c1][3:v]overlay=0:1573:shortest=1,fps=30,scale=w='trunc(1080*(1+0.05*between(t\,8.66\,9.76))/2)*2':h=-2:eval=frame,crop=1080:1920:(iw-1080)/2:(ih-1920)/2.4,format=yuv420p[v]" -map "[v]" -an -t $D -c:v libx264 -crf 16 -preset fast -r 30 $S/p.mp4
ffmpeg -nostdin -v error -y -loop 1 -t $END -i $ST/studio-sgm.png -loop 1 -t $END -i $ST/studio-bureau-laag.png -filter_complex "[0:v][1:v]overlay=0:1573,fps=30,format=yuv420p" -c:v libx264 -crf 16 -preset fast -r 30 -t $END $S/e.mp4
printf "file '$S/p.mp4'\nfile '$S/e.mp4'\n" > $S/l.txt; ffmpeg -nostdin -v error -y -f concat -safe 0 -i $S/l.txt -c:v libx264 -crf 16 -preset fast -r 30 $S/base.mp4
DN="highpass=f=85,afftdn=nf=-28,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,loudnorm=I=-16:TP=-1.5,aresample=48000,aformat=channel_layouts=stereo"
ffmpeg -nostdin -v error -y -ss $SS -t $D -i "$F" -vn -af "$DN,afade=in:d=0.05,afade=out:st=$(python3 -c "print($D-0.2)"):d=0.2,apad" -t $(python3 -c "print($D+$END)") -ar 48000 -ac 2 $S/spraak.wav
echo BASEKLAAR
