#!/bin/bash
# Reel 10 · meningsreel "Sportclubs, stop met affiches" · Jari in de SGM-studio (zonder groen doek)
set -e
S=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/r10; mkdir -p $S
O=$(cd "$(dirname "$0")" && pwd); ST=$O/../../studio
F=${SRC:-/root/.claude/uploads/0377841e-5e4e-590f-ab4a-00f0b5872ecb/1e743fbb-DJI_20261109_163536_682_video.mov}
SS=${SS:-0.75}; D=${D:-19.6}; END=2.6
# persoon uitknippen (lage verzadiging + licht = muur), maskers outer/inner, iets koeler, scherper
ffmpeg -nostdin -v error -y -ss $SS -t $D -i "$F" -loop 1 -i $ST/outer.png -loop 1 -i $ST/inner.png -loop 1 -i $ST/studio-sgm.png -loop 1 -i $ST/studio-bureau-laag.png -filter_complex "[0:v]crop=1080:1300:0:0,format=yuv444p,split[o1][o2];[o1]geq=lum='if(lt(abs(cb(X,Y)-128)+abs(cr(X,Y)-128),34)*gt(lum(X,Y),60),0,255)':cb=128:cr=128,format=gray,median=radius=2,boxblur=1[ka];[2:v]format=gray[in];[ka][in]blend=all_mode=lighten[k2];[1:v]format=gray[m];[k2][m]blend=all_mode=multiply,format=gray[a];[o2]eq=brightness=-0.03:saturation=0.92:contrast=1.04,colorbalance=rs=-0.03:bs=0.04:rh=-0.02:bh=0.03,unsharp=5:5:0.7:5:5:0,format=yuva444p[o3];[o3][a]alphamerge[p];[p]scale=1188:-1:flags=lanczos[pp];[3:v]format=rgba[bg];[bg][pp]overlay=x=-54:y=151:shortest=1[c1];[c1][4:v]overlay=0:1573:shortest=1,fps=30,scale=w='trunc(1080*(1+0.05*between(t\,9.55\,10.65))/2)*2':h=-2:eval=frame,crop=1080:1920:(iw-1080)/2:(ih-1920)/2.4,format=yuv420p[v]" -map "[v]" -an -t $D -c:v libx264 -crf 16 -preset fast -r 30 $S/p.mp4
# eindkaart-achtergrond: studio zonder persoon
ffmpeg -nostdin -v error -y -loop 1 -t $END -i $ST/studio-sgm.png -loop 1 -t $END -i $ST/studio-bureau-laag.png -filter_complex "[0:v][1:v]overlay=0:1573,fps=30,format=yuv420p" -c:v libx264 -crf 16 -preset fast -r 30 -t $END $S/e.mp4
printf "file '$S/p.mp4'\nfile '$S/e.mp4'\n" > $S/l.txt; ffmpeg -nostdin -v error -y -f concat -safe 0 -i $S/l.txt -c:v libx264 -crf 16 -preset fast -r 30 $S/base.mp4
# spraak
DN="highpass=f=85,afftdn=nf=-28,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,loudnorm=I=-16:TP=-1.5,aresample=48000,aformat=channel_layouts=stereo"
ffmpeg -nostdin -v error -y -ss $SS -t $D -i "$F" -vn -af "$DN,afade=in:d=0.05,afade=out:st=$(python3 -c "print($D-0.2)"):d=0.2,apad" -t $(python3 -c "print($D+$END)") -ar 48000 -ac 2 $S/spraak.wav
echo BASEKLAAR
