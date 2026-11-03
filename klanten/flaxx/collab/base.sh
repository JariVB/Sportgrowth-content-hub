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
if [ -z "$HOOK" ] && [ -z "$HOOKANIM" ]; then  # Kling-clip: smash (bron 0,2-0,95) + punch-in op de elleboog (bron 3,0-4,45), watermerk weggesneden
  K=$O/hook-kling-bron.mp4; SH="unsharp=5:5:0.6:5:5:0"
  ffmpeg -nostdin -v error -y -ss 0.2 -t 0.75 -i $K -vf "crop=664:1180:28:0,scale=1080:1920:flags=lanczos,$SH,fps=30,setsar=1,$G,format=yuv420p" $ENC -t 0.75 $S/ha.mp4
  ffmpeg -nostdin -v error -y -ss 3.0 -t 1.45 -i $K -vf "crop=533:948:103:206,scale=1080:1920:flags=lanczos,scale=eval=frame:w='trunc(1080*(1+0.05*t)/2)*2':h=-2,crop=1080:1920,$SH,fps=30,setsar=1,$G,format=yuv420p" $ENC -t 1.45 $S/hb.mp4
  printf "file '$S/ha.mp4'\nfile '$S/hb.mp4'\n" > $S/hl.txt; ffmpeg -nostdin -v error -y -f concat -safe 0 -i $S/hl.txt $ENC $S/a1.mp4
elif [ -n "$HOOK" ]; then v a1 "$HOOK" $HOOKSS 2.2 0.03; else
  ffmpeg -nostdin -v error -y -ss 9.2 -t 2.2 -i $U/c6ceeec3-IMG_2886.mov -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=18,eq=brightness=-0.18:saturation=0.6,fps=30,setsar=1,format=yuv420p" $ENC -t 2.2 $S/a1.mp4; fi
# B · Koen het verhaal 2.2-13.15 (V5 0.0-10.5: 0,28 s rust na de snede)
v b1 $U/6b860131-DJI_20261101_170923_523_video.mov 0.0 10.95 0.006 "$GW"
# C · de zoektocht 13.15-19.0 (B-roll onder V5 11.15-17.0)
VL=$O/vlas-oogst-bron.mov; VC="crop=944:1680:40:340,scale=1080:1920:flags=lanczos"   # schermopname vlasoogst (Mechielsen Oldehove BV), UI weggesneden
cv(){ ffmpeg -nostdin -v error -y -ss $2 -t $3 -i $VL -vf "$VC,scale=eval=frame:w='trunc(1080*(1+$4*t)/2)*2':h=-2,crop=1080:1920,fps=30,setsar=1,$G,format=yuv420p" $ENC -t $3 $S/$1.mp4; }
cv c1 0.2 2.85 0.03
cv c2 3.05 3.0 0.04
# D · het materiaal 19.0-24.3 (Gilles G3 11.35-16.65 doorlopend: "Vlasvezel heeft een unieke combinatie tussen lichtgewicht, stijf en heel goed dempend")
v d1 $U/5c67f1e9-DJI_20261101_164750_697_video.mov 11.35 2.0 0.01 "$GW"
v d2 $U/cbc545d6-IMG_2896.mov 7.95 1.6 0
v d3 $U/084b43ca-IMG_2898.mov 3.6 0.8 0
v d4 $U/c6ceeec3-IMG_2886.mov 9.2 0.9 0.03
# E · de rackets 24.3-28.85 (V4 2.6-6.5: "Omdat Flaxx rackets van mechanische eigenschap een zeer hoge trillingsdemping heeft" · NIET verder: daarna volgt de absolute claim)
v e1 $U/f807067d-IMG_2904.mov 0.0 2.2 0.03
v e2 $U/670c7381-IMG_2905.mov 0.0 2.35 0.03
# F · afsluiter 28.85-33.0 (foto)
ffmpeg -nostdin -v error -y -loop 1 -t 4.15 -i /home/user/Sportgrowth-content-hub/instagram/beeldbank/sports-next-1-11/koen-jari-rackets-1.jpg -vf "scale=-2:2050,crop=1080:1920:(iw-1080)/2:60,scale=eval=frame:w='trunc(1080*(1+0.03*t)/2)*2':h=-2,crop=1080:1920,fps=30,setsar=1,$G,format=yuv420p" $ENC -t 4.15 $S/f1.mp4
cd $S && rm -f l.txt && for x in a1 b1 c1 c2 d1 d2 d3 d4 e1 e2 f1; do echo "file '$x.mp4'" >> l.txt; done
ffmpeg -nostdin -v error -y -f concat -safe 0 -i l.txt -c:v libx264 -crf 16 -preset fast -r 30 -pix_fmt yuv420p base.mp4
# spraak: elk fragment apart, met stilte ervoor (apad/concat i.p.v. adelay), daarna samen
DN="highpass=f=85,afftdn=nf=-28,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,loudnorm=I=-16:TP=-1.5,aresample=48000,aformat=channel_layouts=stereo"
clip(){ # naam bron ss duur plaats fadeout
  ffmpeg -nostdin -v error -y -ss $3 -t $4 -i $2 -vn -af "$DN,afade=in:d=0.05,afade=out:st=$6:d=0.15" -ar 48000 -ac 2 $S/$1.wav
  ffmpeg -nostdin -v error -y -f lavfi -t $5 -i anullsrc=r=48000:cl=stereo -i $S/$1.wav -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1,apad" -t 33 -ar 48000 -ac 2 $S/$1p.wav; }
clip sa $U/6b860131-DJI_20261101_170923_523_video.mov 0.0 10.95 2.2 10.8
clip sb $U/6b860131-DJI_20261101_170923_523_video.mov 11.15 5.85 13.15 5.7
clip sc $U/5c67f1e9-DJI_20261101_164750_697_video.mov 11.35 5.3 19.0 5.15
clip sd $U/dfbf3a94-DJI_20261101_143744_752_video.mov 2.6 3.9 24.3 3.75
ffmpeg -nostdin -v error -y -i $S/sap.wav -i $S/sbp.wav -i $S/scp.wav -i $S/sdp.wav -filter_complex "[0][1][2][3]amix=inputs=4:normalize=0:duration=longest" -t 33 -ar 48000 -ac 2 $S/spraak.wav
ffprobe -v error -show_entries format=duration -of csv=p=0 base.mp4
echo BASEKLAAR
