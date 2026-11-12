// Reel 10 · transparante motion-track (titel, animaties, ondertitels, eindkaart) · 1080x1920 @30
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const F = '/home/user/Sportgrowth-content-hub/website/site/fonts', B = __dirname + '/../../beeldbank/';
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const j64 = p => 'data:image/jpeg;base64,' + fs.readFileSync(p).toString('base64');
const logo = fs.readFileSync(__dirname + '/../../../website/site/favicon.svg', 'utf8').replace('<svg ', '<svg width="100%" height="100%" ');
const FPS = 30, DUR = 21.6;
// ondertitels (tijd na trim), 3-6 woorden, geen leestekens behalve ?
const CH = [[0.25,'Sportclubs'],[1.15,'stop met affiches op Instagram'],[3.15,null],[3.81,'Niemand stopt met scrollen'],[5.19,'voor tien regels tekst'],[6.29,'met een datum'],[7.5,null],[7.95,'Wat wel werkt?'],[8.8,null],[9.19,'Een filmpje van tien seconden'],[10.65,null],[11.31,'De mensen'],[12.21,'de sfeer'],[13.15,'het terras'],[13.7,null],[14.15,'Laat zien hoe het voelt'],[15.37,'om erbij te horen'],[16.4,null],[16.87,'Geen tijd om het zelf te filmen?'],[19.03,'Wij doen het voor jullie'],[20.4,null]];
// take v2 (IMG_3229): animaties van v1 via tijdvervorming op de nieuwe spraak (oud -> nieuw)
const WARP = [[0,0],[1.5,1.15],[3.65,3.15],[5.1,3.81],[8.45,7.5],[9.55,7.95],[10.7,9.19],[12.1,10.65],[12.9,11.31],[13.75,12.21],[14.8,13.15],[15.45,13.7],[16.05,14.15],[17.2,16.87],[18.45,19.03],[19.6,20.4],[22.2,21.6]]; // v10: take 12/11
const LEAD = 0.1;
const SUBS = []; if (!process.env.NOSUB) for (let i = 0; i < CH.length - 1; i++) if (CH[i][1]) SUBS.push([CH[i][0] - LEAD, CH[i + 1][0], CH[i][1]]);
const FL = [ // fictieve club: posts die allemaal affiches zijn
 {bg:'#f4ead2',c:'#c9302c',t:'KERSTDRINK',l:['Zaterdag 20 december · 19u','Clubhuis · iedereen welkom','Inschrijven vóór 15/12','Tombola · DJ · hapjes'],lk:7,cap:'📢 Vergeet niet in te schrijven!'},
 {bg:'#ffffff',c:'#1d4e9e',t:'ALGEMENE LEDENVERGADERING',l:['Vrijdag 9 januari · 20u','Agenda: verslag, financiën,','verkiezing bestuur, varia','Volmacht? Mail het secretariaat'],lk:3,cap:'Belangrijk voor alle leden'},
 {bg:'#fff3b0',c:'#222',t:'LIDGELD 2027',l:['Volwassenen € 185','Jeugd -18 € 95','Gezin € 390','Betalen vóór 31/01 op BE12 3456 ...'],lk:4,cap:'Lidgeld is betaalbaar vanaf nu'},
 {bg:'#e9f4ff',c:'#0b5d3b',t:'DUBBELTORNOOI',l:['14 tot 22 februari','Reeksen H/D/GD','Inschrijven aan de bar','of via de website'],lk:9,cap:'Schrijf je in! 🎾'},
 {bg:'#fde0d8',c:'#8a2a12',t:'MOSSELFEEST',l:['Zondag 8 maart · 12u','Mosselen of vol-au-vent','Kaarten aan de bar € 24','Kinderen € 12'],lk:5,cap:'Smakelijk 🦪'},
 {bg:'#ffffff',c:'#333',t:'NIEUWE UREN BAR',l:['Ma-vr 17u - 23u','Za 10u - 23u','Zo 10u - 20u','Gesloten op feestdagen'],lk:2,cap:'Aangepaste openingsuren'}];
const PH = 470;
const feedHTML = FL.map((f,i)=>`<div class="post" style="top:${i*PH}px"><div class="ph"><div class="av">TC</div><b>tc.deklaver</b><span>•••</span></div><div class="img" style="background:${f.bg};color:${f.c}"><div class="ft">${f.t}</div>${f.l.map(x=>`<div class="fl">${x}</div>`).join('')}</div><div class="ic">♡ &nbsp;💬 &nbsp;➤<span>🔖</span></div><div class="lk">${f.lk} vind-ik-leuks</div><div class="cp"><b>tc.deklaver</b> ${f.cap}</div></div>`).join('');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:In;src:url(${f64(F + '/inter-var.woff2')})}@font-face{font-family:Rj;src:url(${f64(F + '/rajdhani-700.woff2')})}
*{box-sizing:border-box}body{margin:0;width:1080px;height:1920px;position:relative;overflow:hidden;background:transparent;font-family:In}
.a{position:absolute}.ctr{left:0;right:0;display:flex;flex-direction:column;align-items:center;text-align:center}
#hook h1{margin:0;font:800 92px/1 In;letter-spacing:-.035em;color:#fff;text-shadow:0 6px 40px rgba(0,0,0,.6)}#hook h1 span{color:#ff4d4d}
#aff{left:36px;top:470px;width:340px;height:480px;background:#f4ead2;border-radius:6px;box-shadow:0 30px 60px rgba(0,0,0,.6);padding:26px 22px;color:#2a2a2a;font:700 24px/1.25 'Comic Sans MS',In;text-align:center;transform-origin:50% 50%}
#aff .t{font:900 46px/1 Rj;color:#c9302c;margin:6px 0 12px}#aff .s{font-size:19px;font-weight:500;color:#444;line-height:1.35}
#stamp{left:12px;top:630px;width:380px;text-align:center;font:800 120px/1 Rj;color:#ff3b30;border:12px solid #ff3b30;border-radius:18px;padding:6px 0 0;background:rgba(20,0,0,.15);letter-spacing:8px}
.phone{width:330px;height:640px;border-radius:52px;background:#0b0b0d;padding:12px;box-shadow:0 30px 70px rgba(0,0,0,.6),0 0 0 3px #2c2f36}
.scr{width:100%;height:100%;border-radius:42px;overflow:hidden;position:relative;background:#111}
.post{position:absolute;left:0;right:0;height:470px;background:#000;color:#f5f5f5;font:400 13px/1.3 In}.ph{display:flex;align-items:center;gap:8px;padding:10px 12px;font:600 13px In}.ph span{margin-left:auto}.av{width:28px;height:28px;border-radius:50%;background:#1a6b3a;color:#fff;font:800 11px Rj;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 2px #000,0 0 0 4px #d62976}.img{height:306px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;font-family:'Comic Sans MS',In}.ft{font:900 30px/1.05 Rj;padding:0 14px;margin-bottom:10px}.fl{font:700 13px/1.2 'Comic Sans MS',In;color:#333}.ic{padding:8px 12px 2px;font-size:20px}.ic span{float:right}.lk{padding:2px 12px;font:600 13px In}.cp{padding:2px 12px;font-size:13px}.fi{position:absolute;left:14px;right:14px;height:300px;border-radius:14px;display:flex;align-items:center;justify-content:center;font:800 40px/1 Rj;color:#fff}
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
<div id="hook" class="a ctr" style="top:1170px"><h1>Jullie affiche op Instagram?<br><span>Niemand leest hem.</span></h1></div>
<div id="aff" class="a"><div class="s">TENNISCLUB DE KLAVER</div><div class="t">KERSTDRINK</div><div class="s">Zaterdag 20 december om 19u<br>in het clubhuis<br><br>Iedereen welkom!<br>Inschrijven via het secretariaat<br>vóór 15 december<br>Gratis drankje voor leden<br>Tombola · DJ · hapjes<br>Meer info op onze website</div></div>
<div id="stamp" class="a">STOP</div>
<div id="ph1" class="a phone" style="left:40px;top:330px"><div class="scr" style="background:#000"><div style="position:absolute;top:0;left:0;right:0;height:44px;z-index:2;background:#000;color:#fff;font:700 20px/44px 'Comic Sans MS',In;padding-left:14px;font-style:italic">Instagram</div><div id="feed" style="position:absolute;left:0;right:0;top:44px">${feedHTML}</div></div></div>
<div id="ph2" class="a phone" style="left:710px;top:330px"><div class="scr"><div id="clip" style="position:absolute;inset:-30px;background:url(${j64(B+'padel-vol-terras.jpg')}) center/cover"></div><div id="tmr" style="position:absolute;right:16px;top:18px;background:rgba(0,0,0,.6);color:#fff;font:700 28px/1 In;padding:8px 14px;border-radius:20px">0:00</div><div style="position:absolute;left:16px;bottom:22px;color:#fff;font:700 26px/1.2 In;text-shadow:0 2px 10px #000">♥ 1.204 · 💬 37</div></div></div>
<div id="c1" class="a card" style="left:50px;background-image:url(${j64(B+'padel-lachen-aan-net.jpg')})"><b>De mensen</b></div>
<div id="c2" class="a card" style="left:390px;background-image:url(${j64(B+'tennis-hal-speler.jpg')})"><b>De sfeer</b></div>
<div id="c3" class="a card" style="left:730px;background-image:url(${j64(B+'padel-vol-terras.jpg')})"><b>Het terras</b></div>
<div id="hearts" class="a" style="inset:0">${[...Array(14)].map((_,i)=>`<div class="heart" id="h${i}">${['❤️','👍','🔥','💬'][i%4]}</div>`).join('')}</div>
<div id="clk" class="a" style="left:70px;top:420px;width:260px;height:260px"><svg viewBox="0 0 100 100" width="260" height="260"><circle cx="50" cy="50" r="44" fill="#fff" stroke="#0d1b3e" stroke-width="5"/><line id="hm" x1="50" y1="50" x2="50" y2="22" stroke="#ff3b30" stroke-width="5" stroke-linecap="round"/><line id="hh" x1="50" y1="50" x2="68" y2="50" stroke="#0d1b3e" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="#0d1b3e"/></svg></div>
<div id="glow" class="a" style="left:356px;top:20px;width:440px;height:440px;border-radius:50%;background:radial-gradient(closest-side,rgba(0,212,255,.55),rgba(0,212,255,0))"></div>
<div id="sub" class="a"><span id="st"></span></div>
<div id="end" class="a ctr" style="justify-content:center;gap:34px"><div class="em">${logo}</div><h2>Geen tijd om dit<br>zelf te doen?</h2><div class="dm">STUUR EEN DM 📩</div><div class="s">voor een gratis analyse</div><div class="f">Volg voor wekelijkse clubtips</div></div>
<script>
const $=id=>document.getElementById(id);const cl=x=>Math.max(0,Math.min(1,x));const p=(t,a,b)=>cl((t-a)/(b-a));
const eo=x=>1-Math.pow(1-cl(x),3), eo5=x=>1-Math.pow(1-cl(x),5), eb=x=>{x=cl(x);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const show=(el,t,a,b)=>{el.style.display=(t>=a&&t<b)?'':'none'};
const SUBS=${JSON.stringify(SUBS)};const PH=${PH};const WARP=${JSON.stringify(WARP)};
window.render=function(T){const W=WARP;let t=W[W.length-1][0];for(let i=1;i<W.length;i++)if(T<=W[i][1]){const a=W[i-1],b=W[i];t=a[0]+(T-a[1])*(b[0]-a[0])/(b[1]-a[1]);break;}
 // hook titel 0-3.6
 show($('hook'),t,0,${process.env.HOOKFRONT?3.65:0});{const k=eo5(p(t,0,.25));$('hook').style.transform=\`scale(\${1.25-.25*k})\`;$('hook').style.opacity=Math.min(k*1.5,1)*(1-p(t,3.4,3.65));}
 // affiche + STOP
 show($('aff'),t,0,4.6);{const k=eb(p(t,0,.22));$('aff').style.transform=\`translateX(\${(1-k)*-500}px) rotate(\${-4+2*k}deg)\`;$('aff').style.opacity=1-p(t,4.3,4.6);}
 show($('stamp'),t,1.5,4.6);{const k=eo5(p(t,1.5,1.65));$('stamp').style.transform=\`rotate(-14deg) scale(\${2.2-1.2*k})\`;$('stamp').style.opacity=Math.min(1,k*1.4)*(1-p(t,4.3,4.6));}
 // gsm feed scrolt
 show($('ph1'),t,5.0,8.6);{const k=eo(p(t,5.0,5.35));$('ph1').style.transform=\`translateX(\${(1-k)*-420}px) rotate(-3deg)\`;$('ph1').style.opacity=1-p(t,8.3,8.6);
  const y=-Math.max(0,(t-5.35))*650;$('feed').style.transform=\`translateY(\${Math.max(y,-PH*4.2)}px)\`;$('feed').style.filter=\`blur(\${t>5.5&&t<7.6?1:0}px)\`;}
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
 const s=SUBS.find(x=>T>=x[0]&&T<x[1]);show($('sub'),t,0,19.6);$('sub').style.visibility=s?'visible':'hidden';if(s){$('st').textContent=s[2];const k=eo5(p(T,s[0],s[0]+.14));$('st').style.transform=\`scale(\${.85+.15*k})\`;}
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
