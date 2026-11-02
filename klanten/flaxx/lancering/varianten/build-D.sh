#!/bin/bash
# Varianten B (oprichter), C (beurs), D (hook slow motion) van de lanceringsvideo
set -e
U=/root/.claude/uploads/0377841e-5e4e-590f-ab4a-00f0b5872ecb
S=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/lv/var
O=$(cd "$(dirname "$0")" && pwd); V7=$O/../flaxx-lancering-${BASIS:-v7}-met-sounddesign.mp4
G="eq=contrast=1.10:brightness=-0.015:saturation=0.86:gamma=0.97,colorbalance=rs=0.02:bs=-0.03:rh=0.03:bh=-0.02,vignette=PI/4.5,noise=alls=5:allf=t"
ENC="-c:v libx264 -preset medium -b:v 9M -maxrate 10M -bufsize 18M -pix_fmt yuv420p -r 30"
# ov "png:start:end" ... → overlay-keten met fade + kleine opwaartse beweging
mkov(){ local i=1 chain="[v0]" args="" f=""; for o in "$@"; do IFS=: read p a b <<< "$o"; args="$args -loop 1 -t $b -i $S/$p.png"
  f="$f[$i:v]format=rgba,fade=in:st=$a:d=0.4:alpha=1,fade=out:st=$(python3 -c "print(max($a+0.5,$b-0.25))"):d=0.25:alpha=1[o$i];$chain[o$i]overlay=x=0:y='70*pow(1-min(1\,max(0\,(t-$a)/0.5))\,3)':enable='between(t,$a,$b)'[v$i];"; chain="[v$i]"; i=$((i+1)); done
  OVARGS="$args"; OVF="$f"; OVLAST="$chain"; }
# clip n bron ss dur scale cropx cropy [overlays...]
clip(){ n=$1; src=$2; ss=$3; d=$4; sc=$5; cx=$6; cy=$7; shift 7
  if [ "$sc" = "auto" ]; then VF="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920"; else VF="scale=iw*$sc:-2,crop=1080:1920:$cx:$cy"; fi
  mkov "$@"
  ffmpeg -nostdin -v error -y -ss $ss -t $d -i $src $OVARGS -filter_complex "[0:v]$VF,fps=30,setsar=1,$G,format=yuv420p[v0];${OVF}${OVLAST}format=yuv420p[vo]" -map "[vo]" -an $ENC -t $d $S/$n.mp4; }
photo(){ n=$1; img=$2; d=$3; shift 3; mkov "$@"
  ffmpeg -nostdin -v error -y -loop 1 -t $d -i $img $OVARGS -filter_complex "[0:v]scale=-2:2300,crop=1080:1920:'(iw-1080)/2+60*t':'(ih-1920)/2',fps=30,setsar=1,$G,format=yuv420p[v0];${OVF}${OVLAST}format=yuv420p[vo]" -map "[vo]" $ENC -t $d $S/$n.mp4; }
tail7(){ ffmpeg -nostdin -v error -y -ss $2 -i $V7 -map 0:v -an $ENC $S/$1.mp4; ffmpeg -nostdin -v error -y -ss $2 -i $V7 -map 0:a -c:a pcm_s16le -ar 48000 $S/$1.wav; }
cat_v(){ out=$1; shift; rm -f $S/l.txt; for x in "$@"; do echo "file '$S/$x.mp4'" >> $S/l.txt; done; ffmpeg -nostdin -v error -y -f concat -safe 0 -i $S/l.txt -c copy $S/$out.mp4; }

# ---------- D · hook slow motion ----------
clip d1 $U/5a859307-DJI_20261101_133602_589_slowmotion.mov 4.0 2.0 auto 0 0 d_1:0.25:2.0
python3 $O/sound.py $S/d1.wav 2.0 "" 0.0
tail7 d2 0.6
cat_v dv d1 d2
ffmpeg -nostdin -v error -y -i $S/d1.wav -i $S/d2.wav -filter_complex "[0][1]concat=n=2:v=0:a=1" $S/da.wav
ffmpeg -nostdin -v error -y -i $S/dv.mp4 -i $S/da.wav -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest $O/flaxx-lancering-D-hook-slowmotion.mp4

echo KLAARD
