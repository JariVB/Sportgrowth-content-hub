# Reel 14 v3: hele reel split-screen. Links amateur (speelt 0-4.7), rechts pro (speelt 4.7-13.3). Daarna beide stil + vraag, eindkaart.
S=$1
CR="crop=600:1920:240:0,crop=540:1920:30:0"
PRO="eq=contrast=1.06:saturation=1.06:brightness=-0.01,colorbalance=rs=0.04:gs=0.01:bs=-0.04:rh=0.03:bh=-0.03,vignette=PI/5,unsharp=5:5:0.4"
ffmpeg -nostdin -v error -y -i $S/am.mp4 -i $S/pr.mp4 -filter_complex "
[0:v]trim=0.5:5.2,setpts=PTS-STARTPTS,$CR,eq=saturation=0.92,tpad=stop_mode=clone:stop_duration=15[L];
[1:v]trim=1.6:1.64,setpts=PTS-STARTPTS,$CR,$PRO,tpad=stop_mode=clone:stop_duration=4.7,trim=0:4.7,setpts=PTS-STARTPTS[R0];
[1:v]trim=1.6:10.2,setpts=PTS-STARTPTS,$CR,$PRO,tpad=stop_mode=clone:stop_duration=8[R1];
[R0][R1]concat=n=2:v=1[R];
[L][R]hstack,trim=0:17.3,setpts=PTS-STARTPTS,fps=30[AB];
[1:v]trim=9.4:9.45,setpts=PTS-STARTPTS,gblur=sigma=30,eq=brightness=-0.25,tpad=stop_mode=clone:stop_duration=2.4,trim=0:2.4,setpts=PTS-STARTPTS[D];
[AB][D]concat=n=2:v=1,fps=30,format=yuv420p[v];
[0:a]atrim=0.5:5.2,asetpts=PTS-STARTPTS[a1];[1:a]atrim=1.6:10.2,asetpts=PTS-STARTPTS[a2];
[a1][a2]concat=n=2:v=0:a=1,apad,atrim=0:19.7[a]" -map "[v]" -map "[a]" -c:v libx264 -crf 16 -preset fast -c:a pcm_s16le -t 19.7 $S/base.mkv
