#!/bin/bash
# Collab-reel Flaxx × SGM "Het verhaal achter Flaxx" · basisbeeld + spraak
set -e
U=/root/.claude/uploads/0377841e-5e4e-590f-ab4a-00f0b5872ecb
S=/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/collab; mkdir -p $S
O=$(cd "$(dirname "$0")" && pwd)
HOOK=${HOOK:-}   # pad naar het elleboogshot van dinsdag (leeg = tijdelijk beeld)
HOOKSS=${HOOKSS:-0}
G="eq=contrast=1.08:brightness=-0.01:saturation=0.88:gamma=0.98,colorbalance=rs=0.02:bs=-0.03:rh=0.03:bh=-0.02,vignette=PI/4.5"
GW="eq=contrast=1.06:saturation=0.8:gamma=0.98,colorbalance=rs=-0.06:gs=0.0:bs=0.02:rm=-0.06:gm=0.01:bm=0.03,vignette=PI/4.5"   # warm/roze stand-licht bijsturen
ENC="-an -c:v libx264 -crf 16 -preset fast -r 30 -pix_fmt yuv420p"
v(){ n=$1; f=$2; ss=$3; d=$4; z=$5; g=${6:-$G}
  ffmpeg -nostdin -v error -y -ss $ss -t $d -i $f -vf "scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,scale=eval=frame:w='trunc(1080*(1+$z*t)/2)*2':h=-2,crop=1080:1920,fps=30,setsar=1,$g,format=yuv420p" $ENC -t $d $S/$n.mp4; }
# A · hook 0-2.4
if [ -n "$HOOK" ]; then v a1 "$HOOK" $HOOKSS 2.4 0.03; else
  ffmpeg -nostdin -v error -y -ss 9.2 -t 2.4 -i $U/c6ceeec3-IMG_2886.mov -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=18,eq=brightness=-0.18:saturation=0.6,fps=30,setsar=1,format=yuv420p" $ENC -t 2.4 $S/a1.mp4; fi
# B · Koen het verhaal 2.4-12.7 (V5 0.2-10.5)
v b1 $U/6b860131-DJI_20261101_170923_523_video.mov 0.2 10.3 0.006 "$GW"
# C · de zoektocht 12.7-19.0 (B-roll onder V5 10.9-17.2)
v c1 $U/b4980fd9-IMG_2870.mov 2.0 3.3 0.04
v c2 $U/89509846-IMG_2867.mov 1.0 3.0 0.05
# D · het materiaal 19.0-24.3 (Gilles G3 8.65-13.95)
v d1 $U/5c67f1e9-DJI_20261101_164750_697_video.mov 8.65 2.2 0.01 "$GW"
v d2 $U/cbc545d6-IMG_2896.mov 8.0 1.0 0
v d3 $U/084b43ca-IMG_2898.mov 3.6 1.0 0
v d4 $U/c6ceeec3-IMG_2886.mov 9.2 1.1 0.03
# E · de rackets 24.3-28.85 (V4 4.6-9.15)
v e1 $U/f807067d-IMG_2904.mov 0.0 2.2 0.03
v e2 $U/670c7381-IMG_2905.mov 0.0 2.35 0.03
# F · afsluiter 28.85-33.0 (foto)
ffmpeg -nostdin -v error -y -loop 1 -t 4.15 -i /home/user/Sportgrowth-content-hub/instagram/beeldbank/sports-next-1-11/koen-jari-rackets-2-beste.jpg -vf "scale=-2:2050,crop=1080:1920:(iw-1080)/2:60,scale=eval=frame:w='trunc(1080*(1+0.03*t)/2)*2':h=-2,crop=1080:1920,fps=30,setsar=1,$G,format=yuv420p" $ENC -t 4.15 $S/f1.mp4
cd $S && rm -f l.txt && for x in a1 b1 c1 c2 d1 d2 d3 d4 e1 e2 f1; do echo "file '$x.mp4'" >> l.txt; done
ffmpeg -nostdin -v error -y -f concat -safe 0 -i l.txt -c:v libx264 -crf 16 -preset fast -r 30 -pix_fmt yuv420p base.mp4
# spraak: elk fragment op zijn plaats
DN="highpass=f=85,afftdn=nf=-28,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,loudnorm=I=-16:TP=-1.5"
ffmpeg -nostdin -v error -y -ss 0.2 -t 10.3 -i $U/6b860131-DJI_20261101_170923_523_video.mov -ss 10.9 -t 6.3 -i $U/6b860131-DJI_20261101_170923_523_video.mov -ss 8.65 -t 5.3 -i $U/5c67f1e9-DJI_20261101_164750_697_video.mov -ss 4.6 -t 4.55 -i $U/dfbf3a94-DJI_20261101_143744_752_video.mov -filter_complex "[0:a]$DN,afade=in:d=0.05,afade=out:st=10.2:d=0.1,adelay=2400|2400[a];[1:a]$DN,afade=in:d=0.08,afade=out:st=6.1:d=0.2,adelay=12700|12700[b];[2:a]$DN,afade=in:d=0.08,afade=out:st=5.15:d=0.15,adelay=19000|19000[c];[3:a]$DN,afade=in:d=0.05,afade=out:st=4.4:d=0.15,adelay=24300|24300[d];[a][b][c][d]amix=inputs=4:normalize=0,apad=whole_dur=33,atrim=0:33" -ac 2 -ar 48000 spraak.wav
ffprobe -v error -show_entries format=duration -of csv=p=0 base.mp4
echo BASEKLAAR
