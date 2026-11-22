# Reel 14 split-screen: A amateur (0.5-5.2) · B pro (1.6-10.2, warmer + vignet) · C split 4 s · D eindkaart-achtergrond 2.4 s
S=$1
ffmpeg -nostdin -v error -y -i $S/am.mp4 -i $S/pr.mp4 -filter_complex "
[0:v]trim=0.5:5.2,setpts=PTS-STARTPTS,eq=saturation=0.92[A];
[1:v]trim=1.6:10.2,setpts=PTS-STARTPTS,eq=contrast=1.06:saturation=1.06:brightness=-0.01,colorbalance=rs=0.04:gs=0.01:bs=-0.04:rh=0.03:bh=-0.03,vignette=PI/5,unsharp=5:5:0.4[B];
[0:v]trim=0.5:4.5,setpts=PTS-STARTPTS,crop=1080:960:0:430,eq=saturation=0.92[c1];
[1:v]trim=2.0:6.0,setpts=PTS-STARTPTS,crop=1080:960:0:430,eq=contrast=1.06:saturation=1.06,colorbalance=rs=0.04:bs=-0.04,vignette=PI/5[c2];
[c1][c2]vstack[C];
[1:v]trim=9.4:9.45,setpts=PTS-STARTPTS,gblur=sigma=30,eq=brightness=-0.25,tpad=stop_mode=clone:stop_duration=2.4,trim=0:2.4[D];
[A][B][C][D]concat=n=4:v=1,fps=30,format=yuv420p[v];
[0:a]atrim=0.5:5.2,asetpts=PTS-STARTPTS[a1];[1:a]atrim=1.6:10.2,asetpts=PTS-STARTPTS[a2];
[a1][a2]concat=n=2:v=0:a=1,apad,atrim=0:19.7[a]" -map "[v]" -map "[a]" -c:v libx264 -crf 16 -preset fast -c:a pcm_s16le -t 19.7 $S/base.mkv
