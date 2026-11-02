// Motion graphics lanceringsvideo v3: één transparante overlay-track van 24 s (30 fps), frame per frame gerenderd
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const b64 = f => 'data:image/png;base64,' + fs.readFileSync(__dirname + '/' + f).toString('base64');
const logo = b64('flaxx-logo-uit-foto.png'), sym = b64('emb-symbool.png'), ring = b64('emb-ring.png');
const FPS = 30, DUR = 24.0;
const html = `<!doctype html><html><head><style>
@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
*{box-sizing:border-box;margin:0}
body{width:1080px;height:1920px;background:transparent;font-family:In;color:#fff;overflow:hidden;position:relative}
.a{position:absolute;will-change:transform,opacity}
.ctr{left:0;right:0;display:flex;flex-direction:column;align-items:center;text-align:center}
.mask{overflow:hidden;display:block;padding:0 10px}
.mask>span{display:inline-block}
.big{font:700 120px/1.02 In;letter-spacing:-.04em;text-shadow:0 6px 50px rgba(0,0,0,.45)}
.huge{font:800 210px/.9 In;letter-spacing:-.055em;text-shadow:0 8px 60px rgba(0,0,0,.5)}
.name{font:800 150px/.88 In;letter-spacing:-.045em;text-shadow:0 6px 50px rgba(0,0,0,.5)}
.kick{font:600 28px/1 In;letter-spacing:.5em;text-transform:uppercase;color:#e9d2c4;margin-right:-.5em}
.spec{font:500 40px/1.2 In;color:rgba(255,255,255,.92);text-shadow:0 2px 24px rgba(0,0,0,.7)}
.num{font:700 64px/1 In;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.line{height:3px;background:#e9d2c4}
.outline{font:800 520px/1 In;letter-spacing:-.06em;color:transparent;-webkit-text-stroke:3px rgba(255,255,255,.22)}
.flash{inset:0;background:#fff}
#end{inset:0;background:radial-gradient(120% 70% at 50% 45%,#1b4537 0%,#0e2a21 45%,#06140f 100%)}
.ui{font:500 22px/1 In;letter-spacing:.3em;color:rgba(255,255,255,.75)}
.br{width:56px;height:56px;border-color:rgba(255,255,255,.7);border-style:solid}
</style></head><body>
<div id="l0" class="a line" style="top:958px;left:540px;width:0"></div>
<div id="t1" class="a ctr" style="top:870px"><div class="kick" id="t1k">Flaxx · ERGO</div><div style="height:26px"></div><div class="mask big"><span id="t1w">Uit vlas</span></div></div>
<div id="t2" class="a ctr" style="top:830px"><div class="mask big"><span id="t2a">Gemaakt</span></div><div class="mask big"><span id="t2b">in België</span></div><div style="height:30px"></div>
  <div id="flag" style="display:flex;gap:8px;height:16px;width:0;overflow:hidden;filter:drop-shadow(0 4px 18px rgba(0,0,0,.55))"><i style="flex:1;border-radius:3px;background:#1a1a1a;box-shadow:inset 0 0 0 2px rgba(255,255,255,.55)"></i><i style="flex:1;border-radius:3px;background:#fdda24"></i><i style="flex:1;border-radius:3px;background:#ef3340"></i></div></div>
<div id="w" class="a ctr" style="top:820px"><div class="huge" id="ww">Licht</div></div>
<div id="cnt" class="a ui" style="top:120px;right:80px">01 / 04</div>
<div id="brk" class="a" style="inset:0">
 <div class="br a" style="top:90px;left:70px;border-width:4px 0 0 4px"></div><div class="br a" style="top:90px;right:70px;border-width:4px 4px 0 0"></div>
 <div class="br a" style="bottom:110px;left:70px;border-width:0 0 4px 4px"></div><div class="br a" style="bottom:110px;right:70px;border-width:0 4px 4px 0"></div></div>
<div id="grad" class="a" style="left:0;right:0;bottom:0;height:820px;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.55) 45%,rgba(0,0,0,.82))"></div>
<div id="o1" class="a outline" style="top:-60px;right:-40px">01</div>
<div id="h1" class="a ctr" style="top:1300px"><div class="kick" id="h1k">ERGO</div><div style="height:18px"></div><div class="mask name"><span id="h1n">CONTROL</span></div><div style="height:26px"></div><div class="line" id="h1l" style="width:0"></div><div style="height:26px"></div>
  <div class="spec"><span class="num" id="h1c">0</span><span class="num">&#8239;g</span></div><div style="height:10px"></div><div class="spec" id="h1s">centrale sweetspot</div></div>
<div id="o2" class="a outline" style="top:-60px;right:-40px">02</div>
<div id="h2" class="a ctr" style="top:1300px"><div class="kick" id="h2k">ERGO</div><div style="height:18px"></div><div class="mask name"><span id="h2n">POWER</span></div><div style="height:26px"></div><div class="line" id="h2l" style="width:0"></div><div style="height:26px"></div>
  <div class="spec"><span class="num" id="h2c">0</span><span class="num">&#8239;g</span></div><div style="height:10px"></div><div class="spec" id="h2s">hogere sweetspot</div></div>
<div id="nsr" class="a ctr" style="top:1380px"><div class="outline" id="nsrb" style="font-size:230px;-webkit-text-stroke:3px rgba(255,255,255,.85)">NSR</div><div style="height:6px"></div><div class="spec" id="nsrt" style="font-weight:600;font-size:46px"></div></div>
<div id="sn" class="a ctr" style="top:1440px"><div class="kick" id="snk">Gelanceerd op</div><div style="height:22px"></div><div class="mask big" style="font-size:96px"><span id="snw">Sports NEXT</span></div><div style="height:18px"></div><div class="ui" id="snd">MECHELEN · 01.11.2026</div></div>
<div id="lt" class="a" style="left:70px;top:1500px;display:flex;gap:22px;align-items:stretch">
 <div id="ltb" style="width:6px;background:#e9d2c4"></div><div style="overflow:hidden"><div id="ltx"><div style="font:700 54px/1.1 In;letter-spacing:-.02em;text-shadow:0 2px 24px rgba(0,0,0,.6)">Koen Hubert</div><div style="font:500 32px/1.3 In;color:#e9d2c4;text-shadow:0 2px 20px rgba(0,0,0,.6)">Oprichter Flaxx</div></div></div></div>
<div id="end" class="a" style="opacity:0">
 <div id="glow" class="a" style="width:900px;height:900px;left:90px;top:400px;border-radius:50%;background:radial-gradient(circle,rgba(233,210,196,.16),rgba(233,210,196,0) 65%)"></div>
 <div class="a" id="emb" style="left:300px;top:430px;width:480px;height:480px">
  <img id="ering" src="${ring}" class="a" style="inset:0;width:480px;height:480px">
  <img id="esym" src="${sym}" class="a" style="inset:0;width:480px;height:480px"></div>
 <div class="a ctr" style="top:1010px"><div style="position:relative;width:520px;height:128px;overflow:hidden" id="lgw"><img id="lg" src="${logo}" style="width:520px;display:block"><div id="sweep" class="a" style="top:-40px;width:140px;height:220px;background:linear-gradient(100deg,rgba(255,255,255,0),rgba(255,255,255,.75),rgba(255,255,255,0));mix-blend-mode:overlay"></div></div></div>
 <div class="a ctr" style="top:1190px"><div class="spec" id="tag" style="font-size:44px;font-weight:500;letter-spacing:.01em"></div></div>
 <div class="a ctr" style="top:1560px"><div class="line" id="el" style="width:0"></div><div style="height:26px"></div><div class="kick" id="ek" style="font-size:24px">De ERGO-lijn</div><div style="height:16px"></div><div class="spec" id="eu" style="font-size:38px">Schrijf je in op flaxx.be</div></div>
 <div class="a ctr" style="top:1800px"><div class="ui" id="cr" style="font-size:18px;letter-spacing:.25em;color:rgba(255,255,255,.45)">BEELDEN · SPORTGROWTH MEDIA</div></div>
</div>
<div id="fl" class="a flash" style="opacity:0"></div>
<script>
const $=id=>document.getElementById(id);
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const eo=x=>1-Math.pow(1-cl(x),3);           // ease out cubic
const eo5=x=>1-Math.pow(1-cl(x),5);
const eio=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const p=(t,a,b)=>cl((t-a)/(b-a));
const vis=(el,t,a,b)=>{el.style.display=(t>=a&&t<b)?'':'none'};
// reveal: tekst schuift uit masker omhoog + wordt scherp
function rise(el,t,t0,d=.55){const k=eo5(p(t,t0,t0+d));el.style.transform=\`translateY(\${(1-k)*110}%)\`;el.style.filter=\`blur(\${(1-k)*8}px)\`;}
function out(el,t,t0,d=.25){const k=eio(p(t,t0,t0+d));el.style.opacity=1-k;el.style.transform+=\` translateY(\${-k*30}px)\`;}
function typeon(el,str,t,t0,cps=26){const n=Math.floor(cl((t-t0)*cps,0,str.length));el.textContent=str.slice(0,n);}
window.render=function(t){
 // lijn intro
 vis($('l0'),t,0,.9); {const k=eo(p(t,.1,.6));$('l0').style.width=(k*220)+'px';$('l0').style.left=(540-k*110)+'px';$('l0').style.opacity=1-p(t,.6,.9);}
 // Uit vlas.
 vis($('t1'),t,.6,2.6); rise($('t1w'),t,.75); $('t1k').style.opacity=eo(p(t,1.0,1.4))*.9; $('t1k').style.letterSpacing=(.9-.4*eo(p(t,1.0,1.8)))+'em';
 $('t1').style.opacity=1-p(t,2.35,2.6); $('t1').style.transform=\`scale(\${1+0.04*p(t,.6,2.6)})\`;
 // Gemaakt in België.
 vis($('t2'),t,2.6,4.2); rise($('t2a'),t,2.68); rise($('t2b'),t,2.82); $('flag').style.width=(eo(p(t,3.0,3.5))*330)+'px';
 $('t2').style.opacity=1-p(t,4.0,4.2); $('t2').style.transform=\`scale(\${1+0.04*p(t,2.6,4.2)})\`;
 // woorden op de beat
 const W=['Licht','Stijf','Dempend','Vlas']; vis($('w'),t,4.2,8.2); vis($('cnt'),t,4.2,8.2); vis($('brk'),t,4.2,8.2);
 if(t>=4.2&&t<8.2){const i=Math.min(3,Math.floor(t-4.2)),lt=t-4.2-i;$('ww').textContent=W[i];
   const k=eo5(cl(lt/.22));$('w').style.transform=\`scale(\${1.35-.35*k})\`;$('w').style.opacity=k*(1-p(lt,.82,1));$('ww').style.filter=\`blur(\${(1-k)*10}px)\`;
   $('cnt').textContent='0'+(i+1)+' / 04';
   const b=eo(p(t,4.2,4.5));$('brk').style.opacity=b*.9;$('brk').style.transform=\`scale(\${1.08-.08*b})\`;}
 // donkere onderrand achter de productteksten
 vis($('grad'),t,8.2,15.2); $('grad').style.opacity=eo(p(t,8.2,8.5))*(1-p(t,14.95,15.2));
 // CONTROL
 vis($('h1'),t,8.2,11.7); vis($('o1'),t,8.2,11.7);
 rise($('h1n'),t,8.35,.6); $('h1k').style.opacity=eo(p(t,8.55,8.9)); $('h1k').style.letterSpacing=(1-.5*eo(p(t,8.55,9.4)))+'em';
 $('h1l').style.width=(eo(p(t,8.8,9.3))*90)+'px';
 {const k=eo(p(t,8.9,9.9));$('h1c').textContent=k<1?Math.round(340*k):'340–345';} $('h1s').style.opacity=eo(p(t,9.6,10.0));
 $('o1').style.opacity=eo(p(t,8.3,8.9));$('o1').style.transform=\`translateY(\${(1-eo(p(t,8.3,9.2)))*80}px)\`;
 $('h1').style.opacity=1-p(t,11.45,11.7); $('o1').style.opacity*=1-p(t,11.45,11.7);
 // POWER
 vis($('h2'),t,11.7,15.2); vis($('o2'),t,11.7,15.2);
 rise($('h2n'),t,11.85,.6); $('h2k').style.opacity=eo(p(t,12.05,12.4)); $('h2k').style.letterSpacing=(1-.5*eo(p(t,12.05,12.9)))+'em';
 $('h2l').style.width=(eo(p(t,12.3,12.8))*90)+'px';
 {const k=eo(p(t,12.4,13.4));$('h2c').textContent=k<1?Math.round(355*k):'355–360';} $('h2s').style.opacity=eo(p(t,13.1,13.5));
 $('o2').style.opacity=eo(p(t,11.8,12.4));$('o2').style.transform=\`translateY(\${(1-eo(p(t,11.8,12.7)))*80}px)\`;
 $('h2').style.opacity=1-p(t,14.95,15.2); $('o2').style.opacity*=1-p(t,14.95,15.2);
 // NSR
 vis($('nsr'),t,15.2,17.2); {const k=eo5(p(t,15.3,15.8));$('nsrb').style.opacity=k;$('nsrb').style.letterSpacing=(.3-.36*k)+'em';$('nsrb').style.filter=\`blur(\${(1-k)*12}px)\`;}
 typeon($('nsrt'),'Natural Strain Reduction',t,15.75,30); $('nsr').style.opacity=1-p(t,17.0,17.2);
 // Sports NEXT
 vis($('sn'),t,17.2,18.7); rise($('snw'),t,17.3,.5); $('snk').style.opacity=eo(p(t,17.25,17.6)); $('snd').style.opacity=eo(p(t,17.6,18.0))*.9; $('sn').style.opacity=1-p(t,18.5,18.7);
 // lower third Koen
 vis($('lt'),t,18.7,19.9); $('ltb').style.transform=\`scaleY(\${eo(p(t,18.75,19.0))})\`; $('ltx').style.transform=\`translateX(\${(1-eo5(p(t,18.85,19.25)))*-110}%)\`; $('lt').style.opacity=1-p(t,19.7,19.9);
 // eindkaart
 $('end').style.opacity=t>=19.9?1:0;
 if(t>=19.9){const e=t-19.9;
   $('glow').style.transform=\`translate(\${Math.sin(e*.8)*40}px,\${Math.cos(e*.6)*30}px) scale(\${1+e*.03})\`;
   {const k=eo5(p(e,.1,1.1));$('ering').style.opacity=k;$('ering').style.transform=\`rotate(\${-140*(1-k)+e*7}deg) scale(\${.85+.15*k})\`;}
   {const k=eo5(p(e,.35,1.0));$('esym').style.opacity=k;$('esym').style.transform=\`scale(\${.55+.45*k})\`;$('esym').style.filter=\`blur(\${(1-k)*10}px)\`;}
   $('emb').style.transform=\`scale(\${1.04-.04*eo(p(e,.1,4))})\`;
   const r=eo5(p(e,.9,1.5));$('lgw').style.clipPath=\`inset(0 \${(1-r)*100}% 0 0)\`;$('lg').style.filter=\`blur(\${(1-r)*6}px)\`;
   $('sweep').style.left=(-180+eio(p(e,1.6,2.3))*860)+'px';
   const tg='Naturally FLAXX.';$('tag').innerHTML=tg.split('').map((c,i)=>\`<span style="opacity:\${eo(p(e,1.0+i*.035,1.3+i*.035))}">\${c===' '?'&nbsp;':c}</span>\`).join('');
   $('el').style.width=(eo(p(e,1.8,2.3))*80)+'px'; $('ek').style.opacity=eo(p(e,2.0,2.4)); $('eu').style.opacity=eo(p(e,2.2,2.6)); $('eu').style.transform=\`translateY(\${(1-eo(p(e,2.2,2.7)))*20}px)\`;
   $('cr').style.opacity=eo(p(e,3.0,3.4));}
 // flitsen
 let f=0; for(const [a,s] of [[8.2,.9],[11.7,.5],[15.2,.45],[19.9,1]]) f=Math.max(f,s*(1-eo(p(t,a,a+.35)))*(t>=a?1:0));
 $('fl').style.opacity=f;
};
</script></body></html>`;
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
  const arg = process.argv[3]; let frames = [...Array(Math.round(DUR * FPS)).keys()];
  if (arg && arg.includes('-')) { const [a, z] = arg.split('-').map(Number); frames = frames.filter(i => i >= a && i <= z); }
  else if (arg) frames = arg.split(',').map(Number).map(s => Math.round(s * FPS));
  for (const i of frames) {
    await pg.evaluate(t => window.render(t), i / FPS);
    await pg.screenshot({ path: `${OUT}/m${String(i).padStart(4, '0')}.png`, omitBackground: true });
  }
  await b.close();
})();
