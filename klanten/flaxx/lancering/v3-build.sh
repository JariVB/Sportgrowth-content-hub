#!/bin/bash
# Lanceringsvideo Flaxx v3 · basisbeeld zonder tekst (motion graphics via v3-motion.js)
set -e
U=/root/.claude/uploads/0377841e-5e4e-590f-ab4a-00f0b5872ecb
S=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/lv
G="eq=contrast=1.10:brightness=-0.015:saturation=0.86:gamma=0.97,colorbalance=rs=0.02:bs=-0.03:rh=0.03:bh=-0.02,vignette=PI/4.5"
# seg n file ss dur zoom(per s, 0=none) [overlay fadein_start]
seg(){ n=$1; f=$2; ss=$3; d=$4; z=$5; ov=$6; st=${7:-0.25}
  if [ "$z" = "p" ]; then SC="scale=eval=frame:w='trunc(1080*(1+0.09*exp(-t*9))/2)*2':h=-2,crop=1080:1920"; elif [ "$z" != "0" ]; then SC="scale=eval=frame:w='trunc(1188*(1+$z*t)/2)*2':h=-2,crop=1080:1920"; else SC="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920"; fi
  base="[0:v]scale=1188:2112:force_original_aspect_ratio=increase,$SC,fps=30,setsar=1,$G,format=yuv420p[v]"
  if [ -n "$ov" ]; then
    ffmpeg -nostdin -v error -y -ss $ss -t $d -i $U/$f -loop 1 -t $d -i $S/$ov.png -filter_complex "$base;[1:v]format=rgba,fade=in:st=$st:d=0.35:alpha=1[o];[v][o]overlay=0:0:shortest=1,format=yuv420p" -an -c:v libx264 -crf 17 -preset medium -r 30 $S/v$n.mp4
  else
    ffmpeg -nostdin -v error -y -ss $ss -t $d -i $U/$f -filter_complex "$base" -map "[v]" -an -c:v libx264 -crf 17 -preset medium -r 30 $S/v$n.mp4
  fi; }
black(){ ffmpeg -nostdin -v error -y -f lavfi -i color=c=black:s=1080x1920:r=30:d=$2 -vf format=yuv420p -c:v libx264 -crf 17 $S/v$1.mp4; }
# A · intro
black 01 0.6
seg 02 b4980fd9-IMG_2870.mov 3.0 2.0 0.05
seg 03 89509846-IMG_2867.mov 1.0 1.6 0.05
# B · ritme (0.5 s per beeld)
seg 04 88da846f-IMG_2863.mov 4.3 0.5 p
seg 05 a7ce10da-IMG_2897.mov 1.0 0.5 p
seg 06 084b43ca-IMG_2898.mov 0.4 0.5 p
seg 07 c6ceeec3-IMG_2886.mov 9.2 0.5 p
seg 08 4cc2f542-IMG_2859.mov 2.5 0.5 p
seg 09 41fc3103-DJI_20261101_150207_235_orig_eis.mov 2.0 0.5 p
seg 10 b4980fd9-IMG_2870.mov 9.0 0.5 p
seg 11 89509846-IMG_2867.mov 5.0 0.5 0.06
# C · hero (geen orbits meer: push-in vanaf het paneel + close-up)
seg 12 f807067d-IMG_2904.mov 0.0 2.1 0.03
seg 12b cbc545d6-IMG_2896.mov 3.6 1.4 0.04
seg 13 670c7381-IMG_2905.mov 0.0 2.1 0.03
seg 13b 084b43ca-IMG_2898.mov 2.0 1.4 0.04
# D · bewijs
# 4: slow motion gestabiliseerd
ffmpeg -nostdin -v error -y -ss 9.5 -t 3.0 -i $U/5a859307-DJI_20261101_133602_589_slowmotion.mov -vf vidstabdetect=shakiness=6:accuracy=15:result=$S/stab.trf -f null -
ffmpeg -nostdin -v error -y -ss 9.5 -t 3.0 -i $U/5a859307-DJI_20261101_133602_589_slowmotion.mov -vf vidstabtransform=input=$S/stab.trf:smoothing=20:zoom=4,unsharp=5:5:0.6 -an -c:v libx264 -crf 14 $S/stab.mp4
U0=$U; U=$S; seg 14 stab.mp4 0.5 2.0 0; U=$U0
seg 15 b00df21f-IMG_2855.mov 3.9 1.5 0
seg 16 3c9027cb-IMG_2857.mov 7.2 1.2 0
# E · eindkaart (motion-track is daar dekkend)
black 17 4.1
# whip-pan tussen CONTROL en POWER (uit 12b naar links, 13 komt van rechts binnen)
ffmpeg -nostdin -v error -y -i $S/v12b.mp4 -vf "scale=1500:-2,crop=1080:1920:x='210+min(1\,max(0\,(t-1.2)/0.2))*210':y=(ih-1920)/2,avgblur=sizeX=36:sizeY=1:enable='gte(t,1.24)'" -c:v libx264 -crf 16 -r 30 $S/v12bw.mp4 && mv $S/v12bw.mp4 $S/v12b.mp4
ffmpeg -nostdin -v error -y -i $S/v13.mp4 -vf "scale=1500:-2,crop=1080:1920:x='210*min(1\,t/0.2)':y=(ih-1920)/2,avgblur=sizeX=36:sizeY=1:enable='lte(t,0.16)'" -c:v libx264 -crf 16 -r 30 $S/v13w.mp4 && mv $S/v13w.mp4 $S/v13.mp4
cd $S && rm -f v2.txt && for i in 01 02 03 04 05 06 07 08 09 10 11 12 12b 13 13b 14 15 16 17; do echo "file 'v$i.mp4'" >> v2.txt; done
ffmpeg -nostdin -v error -y -f concat -safe 0 -i v2.txt -c:v libx264 -crf 16 -preset fast -r 30 -pix_fmt yuv420p v3-base.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 v3-base.mp4
