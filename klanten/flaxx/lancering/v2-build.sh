#!/bin/bash
# Lanceringsvideo Flaxx v2 · premium opbouw (zie README)
set -e
U=/root/.claude/uploads/0377841e-5e4e-590f-ab4a-00f0b5872ecb
S=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/lv
G="eq=contrast=1.10:brightness=-0.015:saturation=0.86:gamma=0.97,colorbalance=rs=0.02:bs=-0.03:rh=0.03:bh=-0.02,vignette=PI/4.5"
# seg n file ss dur zoom(per s, 0=none) [overlay fadein_start]
seg(){ n=$1; f=$2; ss=$3; d=$4; z=$5; ov=$6; st=${7:-0.25}
  if [ "$z" != "0" ]; then SC="scale=eval=frame:w='trunc(1188*(1+$z*t)/2)*2':h=-2,crop=1080:1920"; else SC="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920"; fi
  base="[0:v]scale=1188:2112:force_original_aspect_ratio=increase,$SC,fps=30,setsar=1,$G,format=yuv420p[v]"
  if [ -n "$ov" ]; then
    ffmpeg -nostdin -v error -y -ss $ss -t $d -i $U/$f -loop 1 -t $d -i $S/$ov.png -filter_complex "$base;[1:v]format=rgba,fade=in:st=$st:d=0.35:alpha=1[o];[v][o]overlay=0:0:shortest=1,format=yuv420p" -an -c:v libx264 -crf 17 -preset medium -r 30 $S/v$n.mp4
  else
    ffmpeg -nostdin -v error -y -ss $ss -t $d -i $U/$f -filter_complex "$base" -map "[v]" -an -c:v libx264 -crf 17 -preset medium -r 30 $S/v$n.mp4
  fi; }
black(){ ffmpeg -nostdin -v error -y -f lavfi -i color=c=black:s=1080x1920:r=30:d=$2 -vf format=yuv420p -c:v libx264 -crf 17 $S/v$1.mp4; }
# A · intro
black 01 0.6
seg 02 b4980fd9-IMG_2870.mov 3.0 2.0 0.05 t1 0.3
seg 03 89509846-IMG_2867.mov 1.0 1.6 0.05 t2 0.2
# B · ritme (0.5 s per beeld)
seg 04 cbc545d6-IMG_2896.mov 0.4 0.5 0
seg 05 a7ce10da-IMG_2897.mov 1.0 0.5 0
seg 06 084b43ca-IMG_2898.mov 1.0 0.5 0
seg 07 c6ceeec3-IMG_2886.mov 9.2 0.5 0
seg 08 c6ceeec3-IMG_2886.mov 5.6 0.5 0
seg 09 d1173517-IMG_2885.mov 5.0 0.5 0
seg 10 b4980fd9-IMG_2870.mov 9.0 0.5 0
seg 11 cbc545d6-IMG_2896.mov 2.6 0.5 0.06
# C · hero
seg 12 65801fef-DJI_20261101_134302_293_video.mov 2.0 3.5 0.02 t3 0.3
seg 13 866b3093-DJI_20261101_134158_289_video.mov 2.0 3.5 0.02 t4 0.3
# D · bewijs
seg 14 5a859307-DJI_20261101_133602_589_slowmotion.mov 10.0 2.0 0 t5 0.4
seg 15 4cc2f542-IMG_2859.mov 1.5 1.5 0 t6 0.2
seg 16 3c9027cb-IMG_2857.mov 7.2 1.2 0
# E · eindkaart
ffmpeg -nostdin -v error -y -f lavfi -i color=c=black:s=1080x1920:r=30:d=4.2 -loop 1 -t 4.2 -i $S/e1.png -loop 1 -t 4.2 -i $S/e2.png -loop 1 -t 4.2 -i $S/e3.png -filter_complex "[1:v]format=rgba,fade=in:st=0.3:d=0.6:alpha=1[a];[2:v]format=rgba,fade=in:st=1.0:d=0.5:alpha=1[b];[3:v]format=rgba,fade=in:st=1.6:d=0.5:alpha=1[c];[0:v][a]overlay[x];[x][b]overlay[y];[y][c]overlay,format=yuv420p" -c:v libx264 -crf 17 -r 30 $S/v17.mp4
cd $S && rm -f v2.txt && for i in 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17; do echo "file 'v$i.mp4'" >> v2.txt; done
ffmpeg -nostdin -v error -y -f concat -safe 0 -i v2.txt -vf "noise=alls=5:allf=t,fade=in:st=0:d=0.3" -c:v libx264 -crf 17 -preset medium -r 30 -pix_fmt yuv420p v2-stil.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 v2-stil.mp4
