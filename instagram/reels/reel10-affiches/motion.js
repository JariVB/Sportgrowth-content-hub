// Reel 10 · transparante motion-track (titel, animaties, ondertitels, eindkaart) · 1080x1920 @30
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const F = '/home/user/Sportgrowth-content-hub/website/site/fonts', B = __dirname + '/../../beeldbank/';
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const j64 = p => 'data:image/jpeg;base64,' + fs.readFileSync(p).toString('base64');
const logo = fs.readFileSync(__dirname + '/../../../website/site/favicon.svg', 'utf8').replace('<svg ', '<svg width="100%" height="100%" ');
const FPS = 30, DUR = 22.2;
// ondertitels (tijd na trim), 3-6 woorden, geen leestekens behalve ?
const CH = [[0.2,'Sportclubs'],[1.5,'stop met affiches op Instagram'],[3.65,null],[5.1,'Niemand stopt met scrollen'],[6.5,'voor tien regels tekst'],[7.35,'met een datum'],[8.45,null],[9.55,'Wat wel werkt?'],[10.15,null],[10.7,'Een filmpje van tien seconden'],[12.1,null],[12.9,'De mensen'],[13.75,'de sfeer'],[14.8,'het terras'],[15.45,null],[16.05,'Laat zien hoe het voelt'],[16.6,'om erbij te horen'],[17.2,'Geen tijd om dat te filmen?'],[18.45,'Dat doen wij voor jullie'],[19.55,null]];
const LEAD = 0.1;
const SUBS = []; for (let i = 0; i < CH.length - 1; i++) if (CH[i][1]) SUBS.push([CH[i][0] - LEAD, CH[i + 1][0], CH[i][1]]);
const feed = [['#e8e1d3','post'],['#c9302c','AFFICHE'],['#2b4a7a','post'],['#7a8b5c','post'],['#e0b23c','post'],['#3c3c3c','post'],['#9a5aa8','post']];
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:In;src:url(${f64(F + '/inter-var.woff2')})}@font-face{font-family:Rj;src:url(${f64(F + '/rajdhani-700.woff2')})}
*{box-sizing:border-box}body{margin:0;width:1080px;height:1920px;position:relative;overflow:hidden;background:transparent;font-family:In}
.a{position:absolute}.ctr{left:0;right:0;display:flex;flex-direction:column;align-items:center;text-align:center}
#hook h1{margin:0;font:800 92px/1 In;letter-spacing:-.035em;color:#fff;text-shadow:0 6px 40px rgba(0,0,0,.6)}#hook h1 span{color:#ff4d4d}
#aff{left:650px;top:430px;width:360px;height:500px;background:#f4ead2;border-radius:6px;box-shadow:0 30px 60px rgba(0,0,0,.6);padding:26px 22px;color:#2a2a2a;font:700 24px/1.25 'Comic Sans MS',In;text-align:center;transform-origin:50% 50%}
#aff .t{font:900 46px/1 Rj;color:#c9302c;margin:6px 0 12px}#aff .s{font-size:19px;font-weight:500;color:#444;line-height:1.35}
#stamp{left:640px;top:600px;width:390px;text-align:center;font:800 120px/1 Rj;color:#ff3b30;border:12px solid #ff3b30;border-radius:18px;padding:6px 0 0;background:rgba(20,0,0,.15);letter-spacing:8px}
.phone{width:330px;height:640px;border-radius:52px;background:#0b0b0d;padding:12px;box-shadow:0 30px 70px rgba(0,0,0,.6),0 0 0 3px #2c2f36}
.scr{width:100%;height:100%;border-radius:42px;overflow:hidden;position:relative;background:#111}
.fi{position:absolute;left:14px;right:14px;height:300px;border-radius:14px;display:flex;align-items:center;justify-content:center;font:800 40px/1 Rj;color:#fff}
.card{width:300px;height:400px;border-radius:22px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.6);border:5px solid #fff;background-size:cover;background-position:center;position:absolute;top:150px}
.card b{position:absolute;left:0;right:0;bottom:0;padding:14px;font:800 34px/1 In;color:#fff;background:linear-gradient(transparent,rgba(13,27,62,.9));text-align:center}
.heart{position:absolute;font-size:64px}
#sub{left:60px;right:60px;top:1655px;display:flex;justify-content:center}
#sub span{display:inline-block;font:800 58px/1.15 In;color:#fff;background:rgba(13,27,62,.88);padding:14px 28px 18px;border-radius:18px;text-align:center;max-width:960px}
#end{inset:0;background:rgba(6,12,28,.82)}
#end .em{width:230px;height:230px;filter:drop-shadow(0 0 30px rgba(0,212,255,.6))}
#end h2{margin:0;font:800 64px/1.1 In;color:#fff;letter-spacing:-.02em}
#end .dm{font:700 78px/1 Rj;color:#0d1b3e;background:#00d4ff;padding:22px 40px 14px;border-radius:24px}
#end .s{font:600 40px/1.2 In;color:#c9d4ee}#end .f{font:600 30px/1 In;color:#8fa3cc;margin-top:20px}
</style></head><body>
<div id="hook" class="a ctr" style="top:120px"><h1>Sportclubs<br><span>stop met affiches!</span></h1></div>
<div id="aff" class="a"><div class="s">TENNISCLUB DE KLAVER</div><div class="t">KERSTDRINK</div><div class="s">Zaterdag 20 december om 19u<br>in het clubhuis<br><br>Iedereen welkom!<br>Inschrijven via het secretariaat<br>vóór 15 december<br>Gratis drankje voor leden<br>Tombola · DJ · hapjes<br>Meer info op onze website</div></div>
<div id="stamp" class="a">STOP</div>
<div id="ph1" class="a phone" style="left:40px;top:330px"><div class="scr"><div id="feed" style="position:absolute;inset:0">${feed.map((f,i)=>`<div class="fi" style="top:${20+i*320}px;background:${f[0]}">${f[1]==='AFFICHE'?'<div style="background:#f4ead2;color:#c9302c;width:80%;height:80%;border-radius:6px;display:flex;align-items:center;justify-content:center;font:900 44px/1 Rj">AFFICHE</div>':''}</div>`).join('')}</div></div></div>
<div id="ph2" class="a phone" style="left:710px;top:330px"><div class="scr"><div id="clip" style="position:absolute;inset:-30px;background:url(${j64(B+'padel-vol-terras.jpg')}) center/cover"></div><div id="tmr" style="position:absolute;right:16px;top:18px;background:rgba(0,0,0,.6);color:#fff;font:700 28px/1 In;padding:8px 14px;border-radius:20px">0:00</div><div style="position:absolute;left:16px;bottom:22px;color:#fff;font:700 26px/1.2 In;text-shadow:0 2px 10px #000">♥ 1.204 · 💬 37</div></div></div>
<div id="c1" class="a card" style="left:50px;background-image:url(${j64(B+'padel-lachen-aan-net.jpg')})"><b>De mensen</b></div>
<div id="c2" class="a card" style="left:390px;background-image:url(${j64(B+'tennis-hal-speler.jpg')})"><b>De sfeer</b></div>
<div id="c3" class="a card" style="left:730px;background-image:url(${j64(B+'padel-vol-terras.jpg')})"><b>Het terras</b></div>
<div id="hearts" class="a" style="inset:0">${[...Array(14)].map((_,i)=>`<div class="heart" id="h${i}">${['❤️','👍','🔥','💬'][i%4]}</div>`).join('')}</div>
<div id="clk" class="a" style="left:70px;top:420px;width:260px;height:260px"><svg viewBox="0 0 100 100" width="260" height="260"><circle cx="50" cy="50" r="44" fill="#fff" stroke="#0d1b3e" stroke-width="5"/><line id="hm" x1="50" y1="50" x2="50" y2="22" stroke="#ff3b30" stroke-width="5" stroke-linecap="round"/><line id="hh" x1="50" y1="50" x2="68" y2="50" stroke="#0d1b3e" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="#0d1b3e"/></svg></div>
<div id="glow" class="a" style="left:330px;top:280px;width:480px;height:480px;border-radius:50%;background:radial-gradient(closest-side,rgba(0,212,255,.55),rgba(0,212,255,0))"></div>
<div id="sub" class="a"><span id="st"></span></div>
<div id="end" class="a ctr" style="justify-content:center;gap:34px"><div class="em">${logo}</div><h2>Geen tijd om dit<br>zelf te doen?</h2><div class="dm">STUUR EEN DM 📩</div><div class="s">voor een gratis analyse</div><div class="f">Volg voor wekelijkse clubtips</div></div>
<script>
const $=id=>document.getElementById(id);const cl=x=>Math.max(0,Math.min(1,x));const p=(t,a,b)=>cl((t-a)/(b-a));
const eo=x=>1-Math.pow(1-cl(x),3), eo5=x=>1-Math.pow(1-cl(x),5), eb=x=>{x=cl(x);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const show=(el,t,a,b)=>{el.style.display=(t>=a&&t<b)?'':'none'};
const SUBS=${JSON.stringify(SUBS)};
window.render=function(t){
 // hook titel 0-3.6
 show($('hook'),t,0,3.65);{const k=eo5(p(t,0,.25));$('hook').style.transform=\`scale(\${1.25-.25*k})\`;$('hook').style.opacity=Math.min(k*1.5,1)*(1-p(t,3.4,3.65));}
 // affiche + STOP
 show($('aff'),t,1.5,4.6);{const k=eb(p(t,1.5,1.85));$('aff').style.transform=\`translateX(\${(1-k)*500}px) rotate(\${4-2*k}deg)\`;$('aff').style.opacity=1-p(t,4.3,4.6);}
 show($('stamp'),t,1.95,4.6);{const k=eo5(p(t,1.95,2.1));$('stamp').style.transform=\`rotate(-14deg) scale(\${2.2-1.2*k})\`;$('stamp').style.opacity=Math.min(1,k*1.4)*(1-p(t,4.3,4.6));}
 // gsm feed scrolt
 show($('ph1'),t,5.0,8.6);{const k=eo(p(t,5.0,5.35));$('ph1').style.transform=\`translateX(\${(1-k)*-420}px) rotate(-3deg)\`;$('ph1').style.opacity=1-p(t,8.3,8.6);
  const y=-((t-5.0)*900)%(320*7);$('feed').style.transform=\`translateY(\${Math.min(0,y)}px)\`;$('feed').style.filter=\`blur(\${t>5.4&&t<8.3?3:0}px)\`;}
 // gsm met filmpje + teller
 show($('ph2'),t,10.6,12.3);{const k=eo(p(t,10.6,10.95));$('ph2').style.transform=\`translateX(\${(1-k)*420}px) rotate(3deg)\`;$('ph2').style.opacity=1-p(t,12.05,12.3);
  const s=Math.min(10,Math.floor(p(t,10.7,12.0)*10));$('tmr').textContent='0:'+String(s).padStart(2,'0');$('clip').style.transform=\`scale(\${1+.12*p(t,10.6,12.3)})\`;}
 // 3 kaarten
 [['c1',12.9],['c2',13.75],['c3',14.8]].forEach(([id,a])=>{show($(id),t,a,15.7);const k=eb(p(t,a,a+.3));$(id).style.transform=\`scale(\${.4+.6*k}) rotate(\${(id==='c2'?0:id==='c1'?-5:5)}deg)\`;$(id).style.opacity=Math.min(1,k*2)*(1-p(t,15.45,15.7));});
 // hartjes
 show($('hearts'),t,16.0,17.4);for(let i=0;i<14;i++){const st=16.0+i*.07,u=p(t,st,st+1.1),x=(i%2?720:60)+((i*97)%240),y=1500-u*900;const h=$('h'+i);h.style.left=x+'px';h.style.top=y+'px';h.style.opacity=(t>=st?1:0)*(1-p(t,st+.8,st+1.1));h.style.transform=\`scale(\${.6+.6*eo(p(t,st,st+.25))})\`;}
 // klok
 show($('clk'),t,17.2,18.5);{const k=eb(p(t,17.2,17.45));$('clk').style.transform=\`scale(\${k})\`;$('clk').style.opacity=1-p(t,18.25,18.5);const r=(t-17.2)*720;$('hm').setAttribute('transform',\`rotate(\${r} 50 50)\`);$('hh').setAttribute('transform',\`rotate(\${r/12} 50 50)\`);}
 // neon flikkert fel aan bij "Dat doen wij"
 show($('glow'),t,18.45,19.6);{const f=[1,.2,1,.4,1,1][Math.min(5,Math.floor((t-18.45)*10))]||1;$('glow').style.opacity=f*(1-p(t,19.3,19.6));}
 // ondertitels
 const s=SUBS.find(x=>t>=x[0]&&t<x[1]);show($('sub'),t,0,19.6);$('sub').style.visibility=s?'visible':'hidden';if(s){$('st').textContent=s[2];const k=eo5(p(t,s[0],s[0]+.14));$('st').style.transform=\`scale(\${.85+.15*k})\`;}
 // eindkaart
 show($('end'),t,19.6,99);{const k=eo(p(t,19.6,19.9));$('end').style.opacity=k;}
};
</script></body></html>`;
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
  const arg = process.argv[3]; let frames = [...Array(Math.round(DUR * FPS)).keys()];
  if (arg) frames = arg.split(',').map(Number).map(s => Math.round(s * FPS));
  for (const i of frames) { await pg.evaluate(t => window.render(t), i / FPS); await pg.screenshot({ path: `${OUT}/m${String(i).padStart(4, '0')}.png`, omitBackground: true }); }
  await b.close();
})();
