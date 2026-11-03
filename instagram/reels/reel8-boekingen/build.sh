#!/bin/bash
# Reel 8 · "Zo krijg je meer boekingen in je sportcentrum" (di 3/11 19u30)
set -e
U=/root/.claude/uploads/0377841e-5e4e-590f-ab4a-00f0b5872ecb
S=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/boek; mkdir -p $S
O=$(cd "$(dirname "$0")" && pwd); R7=$O/../reel7-trainers-ruwe-montage-v5.mp4
node $O/overlays.js $S/ov
TM="zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,tonemap=mobius:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p"
V="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1"
ENC="-an -c:v libx264 -crf 17 -preset fast -r 30 -pix_fmt yuv420p"
hlg(){ ffmpeg -nostdin -v error -y -ss $3 -t $4 -i $U/$2 -vf "$TM,$V" $ENC $S/$1.mp4; }
sdr(){ ffmpeg -nostdin -v error -y -ss $3 -t $4 -i $U/$2 -vf "$V" $ENC $S/$1.mp4; }
hlg a 18040c79-IMG_2714.mov 1.0 2.0          # 0-2 lokbeeld
sdr b 89b116f1-IMG_2743.mov 1.3 5.4          # 2-7.4 K2
hlg c 7fb505d2-IMG_2719.mov 1.0 1.6          # 7.4-9.0 K4 leeg terrein
hlg d1 ecdfb3b5-IMG_2724.mov 1.0 2.6         # 9.0-11.6 K6 langs terreinen
hlg d2 9eca6a17-IMG_2712.mov 1.0 1.7         # 11.6-13.3 actie
ffmpeg -nostdin -v error -y -ss 1.0 -t 3.7 -i $U/d80652a6-IMG_2720.mov -vf "$TM,$V,gblur=sigma=22,eq=brightness=-0.12:saturation=0.8" $ENC $S/d3.mp4   # 13.3-17.0 wazige achtergrond + voorbeeldpost
sdr e 81d2c164-IMG_2746.mov 1.5 5.6          # 17.0-22.6 K3
# 22.6-25.2 bio met link → tik → geboekt (één klik)
ffmpeg -nostdin -v error -y -f lavfi -i color=c=0x0d1b3e:s=1080x1920:r=30:d=2.6 -loop 1 -t 2.6 -i $S/ov/bio.png -loop 1 -t 2.6 -i $S/ov/bio-tap.png -loop 1 -t 2.6 -i $S/ov/geboekt.png -filter_complex "[0][1]overlay=enable='lt(t,1.0)'[a];[a][2]overlay=enable='between(t,1.0,1.45)'[b];[b][3]overlay=enable='gte(t,1.45)',fps=30,format=yuv420p" $ENC -t 2.6 $S/f.mp4
# eindkaart zonder stem (4,5 s) tot er een nieuwe afsluiter gefilmd is
node $O/eindkaart.js $S/ek
ffmpeg -nostdin -v error -y -loop 1 -t 4.5 -i $S/ek/bg.png -loop 1 -t 4.5 -i $S/ek/e1.png -loop 1 -t 4.5 -i $S/ek/e2.png -loop 1 -t 4.5 -i $S/ek/e3.png -filter_complex "[1:v]format=rgba,fade=in:st=0.1:d=0.5:alpha=1[a];[2:v]format=rgba,fade=in:st=0.6:d=0.5:alpha=1[b];[3:v]format=rgba,fade=in:st=1.2:d=0.5:alpha=1[c];[0:v][a]overlay=y='60*pow(1-min(1\,t/0.6)\,3)'[x];[x][b]overlay=y='60*pow(1-min(1\,max(0\,(t-0.6)/0.6))\,3)'[y];[y][c]overlay=y='60*pow(1-min(1\,max(0\,(t-1.2)/0.6))\,3)',fps=30,format=yuv420p" $ENC -t 4.5 $S/g.mp4
# overlays
ov(){ in=$1; out=$2; shift 2; args=""; fc="[0:v]"; i=1; last="[0:v]"; f=""
  for o in "$@"; do IFS=: read png a b <<< "$o"; args="$args -i $S/ov/$png.png"; f="$f$last[$i:v]overlay=enable='between(t,$a,$b)'[o$i];"; last="[o$i]"; i=$((i+1)); done
  ffmpeg -nostdin -v error -y -i $S/$in.mp4 $args -filter_complex "${f}${last}format=yuv420p[vv]" -map "[vv]" $ENC $S/$out.mp4; }
rm -f $S/l.txt; for x in a b c d1 d2 d3 e f; do echo "file '$S/$x.mp4'" >> $S/l.txt; done
ffmpeg -nostdin -v error -y -f concat -safe 0 -i $S/l.txt -c copy $S/main.mp4
ov main mainov l1:0.2:2.0 s1:2.12:3.6 s2:3.6:5.1 s3:5.1:6.55 s4:6.55:7.4 l2:7.5:9.0 s5:9.3:10.95 s6:10.95:11.85 s7:11.85:13.4 post:13.3:17.0 s8:13.4:14.4 s9:14.4:16.1 s10:16.1:17.0 s11:17.25:18.2 s12:18.2:19.7 s13:19.7:21.4 l3:22.6:25.2
# geluid: K2, VO2, K3 op hun plaats (stilte + concat), afsluiter uit reel 7
DN="highpass=f=80,afftdn=nf=-25,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,loudnorm=I=-15:TP=-1.5,aresample=48000,aformat=channel_layouts=stereo"
pl(){ ffmpeg -nostdin -v error -y -ss $3 -t $4 -i $2 -vn -af "$DN,afade=in:d=0.05,afade=out:st=$(python3 -c "print($4-0.15)"):d=0.15" -ar 48000 -ac 2 $S/$1.wav
  ffmpeg -nostdin -v error -y -f lavfi -t $5 -i anullsrc=r=48000:cl=stereo -i $S/$1.wav -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1,apad" -t 25.2 -ar 48000 -ac 2 $S/$1p.wav; }
pl ak2 $U/89b116f1-IMG_2743.mov 1.3 5.4 2.0
pl avo $U/740f9e7c-Rozenstraat_4.m4a 1.9 8.0 9.0
pl ak3 $U/81d2c164-IMG_2746.mov 1.5 5.6 17.0
ffmpeg -nostdin -v error -y -i $S/ak2p.wav -i $S/avop.wav -i $S/ak3p.wav -filter_complex "[0][1][2]amix=inputs=3:normalize=0:duration=longest" -t 25.2 -ar 48000 -ac 2 $S/amain.wav
python3 $O/../../../klanten/flaxx/lancering/varianten/sound.py $S/ag.wav 4.5 "0.6,1.2" 0.0   # zachte slagen onder de eindkaart
ffmpeg -nostdin -v error -y -i $S/amain.wav -i $S/ag.wav -filter_complex "[0][1]concat=n=2:v=0:a=1" $S/aall.wav
rm -f $S/l2.txt; for x in mainov g; do echo "file '$S/$x.mp4'" >> $S/l2.txt; done
ffmpeg -nostdin -v error -y -f concat -safe 0 -i $S/l2.txt -i $S/aall.wav -map 0:v -map 1:a -c:v libx264 -preset medium -b:v 8M -maxrate 9M -bufsize 16M -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart -shortest $O/reel8-boekingen-v1.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $O/reel8-boekingen-v1.mp4
echo KLAAR8
