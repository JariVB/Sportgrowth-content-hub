// Reel 13 · "Voetbalclubs, stop met enkel uitslagen posten" · motion-track 1080x1920 @30 (transparant).
// 0-11,4 s Jari in studio (Beeble), 11,4-19,15 s grafisch deel (wazige studio), daarna eindkaart.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const logo = fs.readFileSync('/home/user/Sportgrowth-content-hub/website/site/favicon.svg', 'utf8').replace('<svg ', '<svg width="100%" height="100%" ');
const FPS = 30, DUR = 24.0, P2 = 11.4, E = 20.9;
const CH = [[0.2,'Voetbalclubs'],[1.1,'stop met enkel'],[1.9,'uitslagen posten'],[3.1,null],
 [3.8,'3-1 gewonnen'],[5.2,'0-2 verloren'],[6.2,null],[6.65,'Niemand wordt lid'],[7.7,'van een uitslag'],[8.6,null],
 [9.0,'Wat wel werkt?'],[9.8,null],[10.3,'De warming-up'],[11.3,null],
 [11.6,'De goal in 10 seconden'],[12.6,null],[13.1,'De kantine na de match'],[14.3,null],
 [15.0,'Mensen worden geen lid'],[15.9,'van een club'],[16.6,null],[17.15,'Ze worden lid'],[17.6,'van een sfeer'],[18.5,null]];
const SUBS = []; for (let i = 0; i < CH.length - 1; i++) if (CH[i][1]) SUBS.push([CH[i][0], CH[i + 1][0], CH[i][1]]);
const html = `<style>
@font-face{font-family:Rj;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
body{margin:0;background:transparent}#c{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:In}
.a{position:absolute;display:none}
.sc{left:640px;width:400px;background:#fff;border-radius:26px;box-shadow:0 30px 70px rgba(0,0,0,.55);color:#0d1b3e;padding:20px 24px}
.sc .l{font:600 24px In;color:#6b7896}.sc .r{font:700 74px/1 Rj;margin:6px 0}.sc .h{font:700 26px In;color:#8a94a8}
#s1{top:1060px}#s2{top:1290px}
#x{left:600px;top:1120px;font:900 110px/1 Rj;color:#ff3b30;border:12px solid #ff3b30;border-radius:20px;padding:6px 24px 0;background:rgba(20,0,0,.15)}
#ok{left:0;right:0;top:1180px;text-align:center}#ok b{display:inline-block;font:800 54px In;color:#0a1226;background:#19d38a;padding:16px 30px;border-radius:20px;box-shadow:0 20px 50px rgba(0,0,0,.5)}
.ph{width:300px;height:560px;border-radius:44px;background:#0b0b0d;padding:12px;box-shadow:0 30px 70px rgba(0,0,0,.6),0 0 0 3px #2c2f36}
.ph .s{width:100%;height:100%;border-radius:34px;overflow:hidden;position:relative}
.ph .em{position:absolute;left:0;right:0;top:150px;text-align:center;font-size:130px}
.ph .pl{position:absolute;left:50%;top:330px;width:64px;height:64px;margin-left:-32px;border-radius:50%;background:rgba(255,255,255,.92)}
.ph .pl:after{content:"";position:absolute;left:25px;top:18px;border-left:22px solid #111;border-top:14px solid transparent;border-bottom:14px solid transparent}
.ph .lb{position:absolute;left:16px;right:16px;bottom:70px;font:800 30px/1.1 In;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.5)}
.ph .lk{position:absolute;left:16px;bottom:24px;font:800 28px In;color:#fff}
#p1{left:40px;top:560px}#p2{left:390px;top:500px}#p3{left:740px;top:560px}
#p1 .s{background:linear-gradient(160deg,#ff9a3c,#e8513a)}#p2 .s{background:linear-gradient(160deg,#21c46b,#0b7a43)}#p3 .s{background:linear-gradient(160deg,#6a5cff,#2b1f8f)}
#hd{left:0;right:0;top:330px;text-align:center;font:700 64px Rj;color:#fff;text-transform:uppercase;letter-spacing:1px}#hd span{color:#3fe0ff}
#qt{left:70px;right:70px;top:620px;text-align:center}
#qt .a1{font:800 74px/1.12 In;color:#fff}#qt .a2{font:900 96px/1.05 Rj;color:#3fe0ff;text-transform:uppercase;margin-top:30px;text-shadow:0 0 30px rgba(63,224,255,.45)}
#q{left:60px;right:60px;top:1330px;text-align:center}#q span{display:inline-block;font:800 48px/1.2 In;color:#0d1b3e;background:#00d4ff;padding:18px 30px;border-radius:20px}
#sub{left:60px;right:60px;top:1655px;display:flex;justify-content:center}
#sub span{display:inline-block;font:800 58px/1.15 In;color:#fff;background:rgba(13,27,62,.88);padding:14px 28px 18px;border-radius:18px;text-align:center}
#end{inset:0;background:rgba(6,12,28,.9);flex-direction:column;align-items:center;justify-content:center;gap:34px}
#end .em{width:230px;height:230px;filter:drop-shadow(0 0 30px rgba(0,212,255,.6))}#end h2{margin:0;font:800 64px/1.1 In;color:#fff;text-align:center}
#end .dm{font:700 78px/1 Rj;color:#0d1b3e;background:#00d4ff;padding:22px 40px 14px;border-radius:24px}#end .f{font:600 34px In;color:#8fa3cc}
</style><div id="c">
<div id="s1" class="a sc"><div class="l">⚽ Zaterdag · eerste ploeg</div><div class="r">3 - 1</div><div class="h">Gewonnen · ❤️ 4</div></div>
<div id="s2" class="a sc"><div class="l">⚽ Zondag · U17</div><div class="r">0 - 2</div><div class="h">Verloren · ❤️ 2</div></div>
<div id="x" class="a">0 LEDEN</div>
<div id="ok" class="a"><b>✅ Wat wel werkt</b></div>
<div id="hd" class="a">Toon hoe het <span>voelt</span></div>
<div id="p1" class="a ph"><div class="s"><div class="em">🏃</div><div class="pl"></div><div class="lb">De warming-up</div><div class="lk">❤️ 248</div></div></div>
<div id="p2" class="a ph"><div class="s"><div class="em">⚽</div><div class="pl"></div><div class="lb">De goal in 10 s</div><div class="lk">❤️ 512</div></div></div>
<div id="p3" class="a ph"><div class="s"><div class="em">🍻</div><div class="pl"></div><div class="lb">De kantine na de match</div><div class="lk">❤️ 391</div></div></div>
<div id="qt" class="a"><div class="a1" id="q1">Mensen worden geen lid van een club.</div><div class="a2" id="q2">Ze worden lid van een sfeer.</div></div>
<div id="q" class="a"><span>Wat posten jullie meer?<br>Typ U (uitslagen) of S (sfeer) 👇</span></div>
<div id="sub" class="a"><span id="stx"></span></div>
<div id="end" class="a"><div class="em">${logo}</div><h2>Geen tijd om dat<br>te filmen?</h2><div class="dm">STUUR EEN DM 📩</div><div class="f">Volg voor wekelijkse clubtips</div></div>
</div><script>
const $=id=>document.getElementById(id),cl=x=>Math.max(0,Math.min(1,x)),p=(t,a,b)=>cl((t-a)/(b-a));
const eo=x=>1-Math.pow(1-cl(x),3),eb=x=>{x=cl(x);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const show=(e,t,a,b)=>{e.style.display=(t>=a&&t<b)?((e.id==='end'||e.id==='sub')?'flex':'block'):'none'};
const SUBS=${JSON.stringify(SUBS)},P2=${P2},E=${E};
const slide=(e,t,a,b,dx)=>{show(e,t,a,b);const k=eb(p(t,a,a+0.35));e.style.transform='translateX('+(1-k)*dx+'px) rotate('+(3-2*k)+'deg)';e.style.opacity=1-p(t,b-0.3,b);};
window.render=function(t){
 slide($('s1'),t,3.8,8.9,500); slide($('s2'),t,5.2,8.9,500);
 show($('x'),t,6.65,8.9);{const k=eo(p(t,6.65,6.8));$('x').style.transform='rotate(-12deg) scale('+(2.2-1.2*k)+')';$('x').style.opacity=Math.min(1,k*1.4)*(1-p(t,8.6,8.9));}
 show($('ok'),t,9.0,10.2);{const k=eb(p(t,9.0,9.3));$('ok').style.transform='scale('+(.6+.4*k)+')';$('ok').style.opacity=Math.min(1,k*2)*(1-p(t,9.9,10.2));}
 // warming-up kaart in studio, vliegt bij P2 naar zijn plek als gsm 1
 [['p1',10.3],['p2',11.6],['p3',13.1]].forEach(([id,s])=>{const e=$(id);show(e,t,s,15.0);const k=eb(p(t,s,s+0.4));e.style.transform='translateY('+(1-k)*700+'px) rotate('+((id==='p2'?0:(id==='p1'?-4:4))*k)+'deg)';e.style.opacity=Math.min(1,k*2)*(1-p(t,14.7,15.0));});
 show($('hd'),t,P2,15.0);$('hd').style.opacity=eo(p(t,P2,P2+0.3))*(1-p(t,14.7,15.0));
 show($('qt'),t,15.0,E);$('q1').style.opacity=eo(p(t,15.0,15.3));$('q2').style.opacity=eo(p(t,17.15,17.4));$('q2').style.transform='scale('+(.8+.2*eb(p(t,17.15,17.5)))+')';$('qt').style.opacity=1-p(t,E-0.25,E);
 show($('q'),t,17.4,E);{const k=eb(p(t,17.4,17.7));$('q').style.transform='translateY('+(1-k)*80+'px)';$('q').style.opacity=k*(1-p(t,E-0.25,E));}
 const s=SUBS.find(x=>t>=x[0]-0.05&&t<x[1]);show($('sub'),t,0,E);$('sub').style.visibility=(s&&!(t>=15.0&&t<E))?'visible':'hidden';if(s){$('stx').textContent=s[2];$('sub').style.transform='scale('+(.88+.12*eo(p(t,s[0]-.05,s[0]+.1)))+')';}
 show($('end'),t,E,99);$('end').style.opacity=eo(p(t,E,E+0.3));
};</script>`;
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
  const arg = process.argv[3]; let frames = [...Array(Math.round(DUR * FPS)).keys()];
  if (arg) frames = arg.split(',').map(Number).map(s => Math.round(s * FPS));
  for (const i of frames) { await pg.evaluate(t => window.render(t), i / FPS); await pg.locator('#c').screenshot({ path: `${OUT}/m${String(i).padStart(4, '0')}.png`, omitBackground: true }); }
  await b.close();
})();
