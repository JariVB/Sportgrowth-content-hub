// Collab-reel Flaxx × SGM · transparante motion-track (ondertitels, titels, naambanden, flitsen), 33 s @ 30 fps
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const b64 = p => 'data:image/png;base64,' + fs.readFileSync(p).toString('base64');
const L = __dirname + '/../lancering/';
const wm = b64(L + 'off-wordmark-white.png'), sym = b64(L + 'off-emblem-symbool-white.png'), ring = b64(L + 'off-emblem-ring-white.png');
const FPS = 30, DUR = 33.0;
const CLIP = process.env.HOOKANIM ? 0 : 1; // 1 = echte hookclip onder de tekst, 0 = getekende animatie
// ondertitels: [start, eind, [stukken]] → stukken krijgen tijd volgens lengte (3-6 woorden, geen leestekens)
// ondertitels per stuk, gesnapt op de spraakstukken (gemeten op de pauzes), 0,12 s vroeger in beeld
const LEAD = 0.12;
const CH = [
 [2.48, 'Het verhaal achter Flaxx rackets'], [4.20, 'is ontstaan uit de bezorgdheid'], [6.12, 'om de vele blessures'], [6.85, 'van mijn vrouw'], [7.65, null],
 [8.28, 'Ze heeft op hoog niveau getennist'], [10.60, 'en had aan haar arm'], [11.58, 'heel wat blessures'], [13.0, null],
 [13.30, 'Daarvoor zijn we op zoek gegaan'], [14.70, 'naar een weefsel'], [15.22, 'dat heel trillingsdempend werkt'], [16.25, null],
 [16.97, 'Zo zijn we terechtgekomen bij'], [18.05, null],
 [19.10, 'Vlasvezel heeft een unieke combinatie tussen'], [20.95, null],
 ...({A:[[24.45, 'De ERGO CONTROL en de ERGO POWER'], [26.25, 'zijn twee verschillende types rackets'], [28.55, null]],
      B:[[24.35, 'We zijn uniek met onze rackets'], [26.1, null], [26.25, 'En we willen die pioniersrol'], [28.35, 'blijven opnemen'], [29.4, null]]}[process.env.VAR||'A'] || [[24.35, 'Omdat Flaxx rackets'], [25.15, 'van mechanische eigenschap'], [26.45, 'een zeer hoge trillingsdemping heeft'], [28.2, null]]),
];
const SUBS = [];
for (let i = 0; i < CH.length - 1; i++) if (CH[i][1]) SUBS.push([CH[i][0] - LEAD, CH[i + 1][0], CH[i][1]]);
const html = `<!doctype html><html><head><style>
@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
*{box-sizing:border-box;margin:0}
body{width:1080px;height:1920px;background:transparent;font-family:In;color:#fff;overflow:hidden;position:relative}
.a{position:absolute}
.ctr{left:0;right:0;display:flex;flex-direction:column;align-items:center;text-align:center}
.kick{font:600 28px/1 In;letter-spacing:.45em;text-transform:uppercase;color:#e9d2c4;margin-right:-.45em;text-shadow:0 2px 18px rgba(0,0,0,.7)}
.sub{display:inline-block;font:700 54px/1.15 In;letter-spacing:-.01em;background:rgba(14,42,33,.9);padding:14px 26px 16px;border-radius:16px;max-width:960px;box-shadow:0 10px 40px rgba(0,0,0,.35)}
.huge{font:800 260px/.86 In;letter-spacing:-.06em;text-shadow:0 10px 70px rgba(0,0,0,.55)}
.big{font:800 128px/.95 In;letter-spacing:-.045em;text-shadow:0 8px 60px rgba(0,0,0,.55)}
.lt{display:flex;gap:20px;align-items:stretch}
.lt b{display:block;font:700 50px/1.1 In;letter-spacing:-.02em;text-shadow:0 2px 24px rgba(0,0,0,.7)} .lt i{display:block;font:500 30px/1.3 In;color:#e9d2c4;font-style:normal;text-shadow:0 2px 20px rgba(0,0,0,.7)}
.bar{width:6px;background:#e9d2c4}
.blob{background:radial-gradient(closest-side,rgba(0,0,0,.6),rgba(0,0,0,.35) 55%,rgba(0,0,0,0))}
</style></head><body>
<div id="hbg" class="a" style="inset:0;background:radial-gradient(80% 55% at 50% 40%,rgba(8,14,30,.86),rgba(3,6,14,.97))"></div>
<svg id="arm" class="a" style="left:0;top:120px" width="1080" height="1000" viewBox="0 0 1080 1000">
 <defs><filter id="gl"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 <radialGradient id="rg"><stop offset="0" stop-color="#ff3b30" stop-opacity=".95"/><stop offset=".45" stop-color="#ff3b30" stop-opacity=".45"/><stop offset="1" stop-color="#ff3b30" stop-opacity="0"/></radialGradient></defs>
 <g transform="translate(0,190)"><circle id="head" cx="105" cy="245" r="58" fill="none" stroke="#fff" stroke-width="9" filter="url(#gl)"/><path id="pT" d="M150 330 C 165 450, 175 560, 190 720" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" filter="url(#gl)" pathLength="1"/>
 <g id="lineart" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" filter="url(#gl)">
  <path id="pU" d="M150 330 C 260 380, 380 470, 470 560" pathLength="1"/>
  <path id="pF" d="M470 560 C 560 500, 650 420, 730 350" pathLength="1"/>
  <path id="pH" d="M730 350 c 22 -18, 46 -14, 52 6 c 6 18, -10 34, -30 40" pathLength="1"/>
  <path id="pR" d="M760 340 L 800 250" pathLength="1"/><ellipse id="pE" cx="845" cy="125" rx="92" ry="122" transform="rotate(32 845 125)" pathLength="1"/>
 </g>
 <g id="holes" fill="#fff" opacity="0">${[[820,40],[870,70],[790,95],[845,120],[895,135],[815,160],[865,185],[780,145]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9"/>`).join('')}</g>
 <circle id="ball" cx="1150" cy="20" r="26" fill="#d7f15a"/>
 <g id="rings" fill="none" stroke="#00d4ff" stroke-width="5"><circle id="r1" cx="850" cy="110" r="10"/><circle id="r2" cx="850" cy="110" r="10"/></g>
 <path id="wave" fill="none" stroke-width="7" stroke-linecap="round" filter="url(#gl)" d=""/>
 <circle id="glow" cx="470" cy="560" r="150" fill="url(#rg)" opacity="0"/>
 <g id="zap" stroke="#ff3b30" stroke-width="7" stroke-linecap="round" opacity="0"><line x1="470" y1="470" x2="470" y2="430"/><line x1="545" y1="500" x2="575" y2="475"/><line x1="395" y1="500" x2="365" y2="475"/><line x1="560" y1="590" x2="600" y2="600"/><line x1="380" y1="590" x2="340" y2="600"/></g>
</g></svg>
<div id="hook2" class="a ctr" style="top:1290px"><div style="overflow:hidden;padding:0 10px 14px"><div class="big" id="q1" style="font-size:112px">Last van je</div></div><div style="overflow:hidden;padding:0 10px 14px"><div class="big" id="q2" style="font-size:112px;color:#ff5a4e">elleboog</div></div><div style="overflow:hidden;padding:0 10px 18px"><div class="big" id="q3" style="font-size:112px">na padel?</div></div></div>
<div id="hqbg" class="a" style="left:0;right:0;top:1100px;height:820px;background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.55) 45%,rgba(0,0,0,.7))"></div>
<div id="hook" class="a ctr" style="top:1080px"><div class="kick" id="hk"></div>
 <div class="huge" id="h4">4</div><div style="height:10px"></div><div style="overflow:hidden;padding:0 10px 18px"><div class="big" id="hw" style="font-size:104px">elleboog&shy;operaties</div></div></div>
<div id="ltk" class="a lt" style="left:70px;top:300px"><div class="bar" id="ltkb"></div><div style="overflow:hidden"><div id="ltkx"><b>Koen Hubert</b><i>Oprichter Flaxx</i></div></div></div>
<div id="ltg" class="a lt" style="left:70px;top:300px"><div class="bar" id="ltgb"></div><div style="overflow:hidden"><div id="ltgx"><b>Gilles Koolen</b><i>BioFibix · vlasvezel</i></div></div></div>
<div id="vbg" class="a blob" style="left:-80px;right:-80px;top:620px;height:700px"></div>
<div id="vlas" class="a ctr" style="top:790px"><div class="huge" id="vw">VLAS</div></div>
<div id="wbg" class="a blob" style="left:-80px;right:-80px;top:620px;height:700px"></div>
<div id="w" class="a ctr" style="top:850px"><div class="big" id="ww">Lichtgewicht</div></div>
<div id="pl" class="a ctr" style="top:300px"><div class="kick" id="plk">ERGO</div><div style="height:14px"></div><div class="big" id="pln" style="font-size:112px">CONTROL</div></div>
<div id="sub" class="a ctr" style="top:1380px"><div class="sub" id="st"></div></div>
<div id="end" class="a" style="inset:0">
 <div class="a" style="left:0;right:0;top:0;height:560px;background:linear-gradient(180deg,rgba(0,0,0,.75),rgba(0,0,0,0))"></div>
 <div class="a" style="left:0;right:0;bottom:0;height:900px;background:linear-gradient(0deg,rgba(6,20,15,.95),rgba(6,20,15,.75) 45%,rgba(6,20,15,0))"></div>
 <div class="a ctr" style="top:230px"><div class="kick" id="ek">Flaxx × SportGrowth Media</div></div>
 <div class="a" id="emb" style="left:450px;top:1130px;width:180px;height:180px"><img id="er" src="${ring}" class="a" style="inset:0;width:180px"><img id="es" src="${sym}" class="a" style="inset:0;width:180px"></div>
 <div class="a ctr" style="top:1350px"><div id="ewm" style="overflow:hidden;width:420px;height:96px"><img src="${wm}" style="width:420px;display:block"></div></div>
 <div class="a ctr" style="top:1480px"><div id="ecta" style="font:600 42px/1.2 In;text-shadow:0 2px 20px rgba(0,0,0,.7)">Schrijf je in op flaxx.be</div><div style="height:14px"></div><div id="etag" style="font:500 26px/1 In;letter-spacing:.06em;color:#e9d2c4">@flaxx_rackets · @sportgrowth_media</div></div>
</div>
<div id="fl" class="a" style="inset:0;background:#fff;opacity:0"></div>
<script>
const SUBS=${JSON.stringify(SUBS)};
const $=id=>document.getElementById(id);
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), p=(t,a,b)=>cl((t-a)/(b-a));
const eo=x=>1-Math.pow(1-cl(x),3), eo5=x=>1-Math.pow(1-cl(x),5), eio=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const show=(el,t,a,b)=>{el.style.display=(t>=a&&t<b)?'':'none'};
function lt(bar,x,box,t,a,b){show(box,t,a,b);bar.style.transform=\`scaleY(\${eo(p(t,a,a+.25))})\`;bar.style.transformOrigin='top';x.style.transform=\`translateX(\${(1-eo5(p(t,a+.1,a+.5)))*-110}%)\`;box.style.opacity=1-p(t,b-.25,b);}
window.render=function(t){

 // hook-illustratie: bal → impact → trilling door de onderarm → elleboog licht rood op
 show($('arm'),t,0,${CLIP}?0:2.2);
 if(!${CLIP}&&t<2.2){
  const dr=(id,a,b)=>{const k=eo(p(t,a,b));$(id).style.strokeDasharray='1';$(id).style.strokeDashoffset=1-k;};
  dr('pU',0,.35);dr('pT',0,.3);$('head').style.opacity=eo(p(t,0,.2));dr('pF',.05,.38);dr('pH',.1,.4);dr('pR',0,.3);dr('pE',0,.3); $('holes').style.opacity=eo(p(t,.2,.35));
  {const k=p(t,0,.25);$('ball').setAttribute('cx',1150-(1150-905)*k);$('ball').setAttribute('cy',20+(85-20)*k);$('ball').style.opacity=t<.27?1:Math.max(0,1-(t-.27)/.1);}
  {const a=p(t,.25,.7);$('r1').setAttribute('r',10+170*eo(a));$('r1').style.opacity=(t>=.25)*(1-a);const b=p(t,.33,.8);$('r2').setAttribute('r',10+140*eo(b));$('r2').style.opacity=(t>=.33)*(1-b);}
  // trillingsgolf langs de onderarm (van pols 730,350 naar elleboog 470,560)
  {let d='';const ph=t*38, amp=26*Math.max(0,1-Math.abs(t-.6)/.45);
   for(let i=0;i<=60;i++){const u=i/60;const x=730+(470-730)*u, y=350+(560-350)*u; const nx=-(560-350)/335, ny=(470-730)/-335;
     const w=Math.sin(u*22-ph)*amp*Math.min(1,cl((p(t,.28,.75))*1.6-u+.6)); d+=(i?'L':'M')+(x+nx*w).toFixed(1)+' '+(y+ny*w).toFixed(1)+' ';}
   $('wave').setAttribute('d',d); const k=p(t,.3,.9); $('wave').setAttribute('stroke',k<.5?'#00d4ff':'#ff6b5e'); $('wave').style.opacity=(t>=.28)*(1-p(t,1.1,1.4));}
  {const k=eo(p(t,.75,1.0));const pulse=.75+.25*Math.sin((t-.75)*18);$('glow').style.opacity=k*pulse;$('glow').setAttribute('r',120+50*k);$('zap').style.opacity=k*(t%0.16<0.1?1:.35);}
  // arm trilt licht mee na de impact
  {const sh=(t>.25&&t<1.0)?Math.sin(t*90)*6*(1-p(t,.25,1.0)):0;$('lineart').setAttribute('transform',\`translate(\${sh},\${sh*.4})\`);}
  // bij de tekst schuift de tekening iets naar achter
  $('arm').style.opacity=1-.45*eo(p(t,1.0,1.4)); $('arm').style.transform=\`scale(\${1-.04*eo(p(t,1.0,2.2))})\`;
 }
 // hook
 show($('hook'),t,0,${CLIP}?0:2.2); show($('hbg'),t,0,${CLIP}?0:2.2); show($('hook2'),t,0,${CLIP}?2.2:0); show($('hqbg'),t,0,${CLIP}?2.2:0);
 $('hqbg').style.opacity=eo(p(t,.7,.9));
 [['q1',.75],['q2',.87],['q3',.99]].forEach(([id,a])=>{const k=eo5(p(t,a,a+.3));$(id).style.transform=\`translateY(\${(1-k)*110}%)\`;});
 $('q2').style.textShadow=\`0 0 \${30+30*Math.max(0,Math.sin((t-.9)*14))}px rgba(255,59,48,.75),0 8px 60px rgba(0,0,0,.55)\`;
 $('hook2').style.transform=\`scale(\${1+.035*p(t,.75,2.2)})\`;
 {const k=eo5(p(t,1.0,1.25));$('h4').style.transform=\`scale(\${1.6-.6*k})\`;$('h4').style.opacity=k;$('h4').style.filter=\`blur(\${(1-k)*14}px)\`;}
 {const k=eo5(p(t,1.15,1.55));$('hw').style.transform=\`translateY(\${(1-k)*110}%)\`;}
 $('hk').style.opacity=eo(p(t,1.0,1.4)); $('hk').style.letterSpacing=(.8-.35*eo(p(t,1.0,1.9)))+'em';
 $('hook').style.transform=\`scale(\${1+.04*p(t,1.0,2.2)})\`;
 // naambanden
 lt($('ltkb'),$('ltkx'),$('ltk'),t,3.0,7.4); lt($('ltgb'),$('ltgx'),$('ltg'),t,19.25,21.0);
 // VLAS
 show($('vlas'),t,18.05,19.0); show($('vbg'),t,18.05,19.0);
 {const k=eo5(p(t,18.05,18.35));$('vw').style.transform=\`scale(\${1.3-.3*k})\`;$('vw').style.opacity=k*(1-p(t,18.8,19.0));$('vw').style.letterSpacing=(.25-.31*eo(p(t,18.05,18.95)))+'em';$('vbg').style.opacity=k*(1-p(t,18.8,19.0));}
 // woorden Gilles
 const W=[[21.0,22.6,'Lichtgewicht'],[22.6,23.4,'Stijf'],[23.4,24.3,'Heel goed dempend']];
 const cur=W.find(x=>t>=x[0]&&t<x[1]); show($('w'),t,21.0,24.3); show($('wbg'),t,21.0,24.3);
 if(cur){$('ww').textContent=cur[2];$('ww').style.fontSize=cur[2].length>12?'104px':'128px';const k=eo5(cl((t-cur[0])/.2));$('w').style.transform=\`scale(\${1.3-.3*k})\`;$('w').style.opacity=k*(cur[2]==='Heel goed dempend'?1-p(t,24.05,24.3):1);$('wbg').style.opacity=1-p(t,24.05,24.3);}
 // productlabels
 const P=[[24.35,26.5,'CONTROL'],[26.55,28.8,'POWER']]; const pc=P.find(x=>t>=x[0]&&t<x[1]); show($('pl'),t,24.35,28.8);
 if(pc){$('pln').textContent=pc[2];const k=eo5(p(t,pc[0]+.05,pc[0]+.5));$('pln').style.transform=\`translateY(\${(1-k)*40}px)\`;$('pl').style.opacity=k*(1-p(t,pc[1]-.2,pc[1]));$('plk').style.letterSpacing=(.9-.45*eo(p(t,pc[0],pc[0]+.8)))+'em';}
 // ondertitels
 const s=SUBS.find(x=>t>=x[0]&&t<x[1]); $('sub').style.display=s?'':'none';
 if(s){$('st').textContent=s[2];const k=eo(cl((t-s[0])/.12));$('st').style.transform=\`scale(\${.94+.06*k})\`;$('st').style.opacity=k;}
 // eindkaart
 show($('end'),t,28.85,99);
 if(t>=28.85){const e=t-28.85;$('ek').style.opacity=eo(p(e,.2,.6));
   {const k=eo5(p(e,.3,1.1));$('er').style.opacity=k;$('er').style.transform=\`rotate(\${-120*(1-k)+e*8}deg)\`;}
   {const k=eo5(p(e,.45,1.0));$('es').style.opacity=k;$('es').style.transform=\`scale(\${.6+.4*k})\`;}
   {const r=eo5(p(e,.8,1.35));$('ewm').style.clipPath=\`inset(0 \${(1-r)*100}% 0 0)\`;}
   $('ecta').style.opacity=eo(p(e,1.4,1.8));$('ecta').style.transform=\`translateY(\${(1-eo(p(e,1.4,1.9)))*20}px)\`;$('etag').style.opacity=eo(p(e,1.8,2.2));}
 // flitsen
 let f=0; for(const [a,s] of [[2.2,.85],[19.0,.35],[24.3,.4],[28.85,.8]]) f=Math.max(f,s*(1-eo(p(t,a,a+.35)))*(t>=a?1:0));
 $('fl').style.opacity=f;
};
</script></body></html>`;
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
  const arg = process.argv[3]; let frames = [...Array(Math.round(DUR * FPS)).keys()];
  if (arg && arg.includes('-')) { const [a, z] = arg.split('-').map(Number); frames = frames.filter(i => i >= a && i <= z); }
  else if (arg) frames = arg.split(',').map(Number).map(s => Math.round(s * FPS));
  for (const i of frames) { await pg.evaluate(t => window.render(t), i / FPS); await pg.screenshot({ path: `${OUT}/m${String(i).padStart(4, '0')}.png`, omitBackground: true }); }
  await b.close();
})();
