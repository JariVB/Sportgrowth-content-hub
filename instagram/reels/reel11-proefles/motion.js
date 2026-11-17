// Reel 11 · proefles · motion-track (transparant) 1080x1920 @30. Titel ACHTER Jari zit in comp.py.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const logo = fs.readFileSync('/home/user/Sportgrowth-content-hub/website/site/favicon.svg', 'utf8').replace('<svg ', '<svg width="100%" height="100%" ');
const FPS = 30, SEAM = 9.2, DUR = 16.8;
const CH = [[0.0,'Waarom komt hij'],[1.7,'nooit meer terug?'],[4.0,null],[4.6,'Niet omdat de les'],[5.5,'slecht was'],[6.4,null],[6.7,'Niemand nodigde hem'],[7.9,'nog eens uit'],[8.9,null],
 [SEAM+0,'Tag hem dezelfde avond'],[SEAM+1.5,'in je story'],[SEAM+2.4,'Stuur een berichtje'],[SEAM+3.8,'Zo komt hij'],[SEAM+4.8,'zeker terug'],[SEAM+5.7,null]];
const SUBS = []; for (let i = 0; i < CH.length - 1; i++) if (CH[i][1]) SUBS.push([CH[i][0], CH[i + 1][0], CH[i][1]]);
const html = `<style>
@font-face{font-family:Rj;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
body{margin:0;background:transparent}#c{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:In}
.a{position:absolute;display:none}
.card{background:#fff;border-radius:28px;box-shadow:0 30px 70px rgba(0,0,0,.55);color:#0d1b3e}
#c1{left:660px;top:470px;width:380px;padding:26px 28px}#c1 .l{font:600 26px In;color:#6b7896}#c1 .t{font:800 44px/1.05 In;margin:8px 0 14px}#c1 .s{font:800 34px In;color:#19a35a}
#x{left:600px;top:560px;font:900 120px/1 Rj;color:#ff3b30;border:12px solid #ff3b30;border-radius:20px;padding:6px 26px 0;background:rgba(20,0,0,.12);transform-origin:center}
#ph{left:640px;top:430px;width:360px;height:700px;border-radius:56px;background:#0b0b0d;padding:14px;box-shadow:0 30px 70px rgba(0,0,0,.6),0 0 0 3px #2c2f36}
.scr{width:100%;height:100%;border-radius:44px;overflow:hidden;background:#fff;position:relative;font-family:In}
.top{height:90px;border-bottom:1px solid #e6e9f0;display:flex;align-items:center;gap:14px;padding:0 18px;font:700 24px In;color:#111}.av{width:46px;height:46px;border-radius:50%;background:#cfd8e8}
.b{position:absolute;max-width:250px;padding:16px 20px;border-radius:26px;font:500 24px/1.3 In}
.me{right:18px;background:#3797f0;color:#fff;border-bottom-right-radius:8px}.them{left:18px;background:#eef1f5;color:#111}
.seen{position:absolute;right:22px;font:500 18px In;color:#8b94a7}
#st{left:30px;top:560px;width:400px;height:560px;border-radius:40px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6);background:linear-gradient(160deg,#ff8a00,#e52e71 55%,#5b2bd6)}
#st .tag{position:absolute;left:30px;top:330px;background:#fff;color:#111;font:800 26px In;padding:12px 18px;border-radius:16px;transform:rotate(-4deg)}
#st .txt{position:absolute;left:20px;right:20px;top:120px;text-align:center;font:900 56px/1 Rj;color:#fff;text-transform:uppercase;text-shadow:0 6px 24px rgba(0,0,0,.3)}
#st .bar{position:absolute;left:24px;right:24px;top:24px;height:8px;border-radius:4px;background:rgba(255,255,255,.4)}#st .bar i{display:block;height:100%;width:60%;background:#fff;border-radius:4px}
#ok{left:0;right:0;top:620px;text-align:center}#ok b{display:inline-block;font:900 140px/1 Rj;color:#19c37d;text-shadow:0 6px 30px rgba(0,0,0,.6);-webkit-text-stroke:4px #0b3d24}
#sub{left:60px;right:60px;top:1655px;display:flex;justify-content:center}
#sub span{display:inline-block;font:800 58px/1.15 In;color:#fff;background:rgba(13,27,62,.88);padding:14px 28px 18px;border-radius:18px;text-align:center}
#q{left:60px;right:60px;top:1380px;text-align:center}#q span{display:inline-block;font:800 54px/1.15 In;color:#0d1b3e;background:#00d4ff;padding:18px 30px;border-radius:20px}
#end{inset:0;background:rgba(6,12,28,.85);flex-direction:column;align-items:center;justify-content:center;gap:34px}
#end .em{width:230px;height:230px;filter:drop-shadow(0 0 30px rgba(0,212,255,.6))}#end h2{margin:0;font:800 64px/1.1 In;color:#fff;text-align:center}
#end .dm{font:700 78px/1 Rj;color:#0d1b3e;background:#00d4ff;padding:22px 40px 14px;border-radius:24px}#end .f{font:600 34px In;color:#8fa3cc}
</style><div id="c">
<div id="c1" class="a card"><div class="l">📅 Dinsdag 19u</div><div class="t">Proefles</div><div class="s">✅ Super!</div></div>
<div id="x" class="a">NIET</div>
<div id="ph" class="a"><div class="scr"><div class="top"><div class="av"></div>Club</div>
<div class="b them" style="top:120px">Bedankt voor de proefles! 🙌</div><div class="seen" id="seen" style="top:220px">Gezien</div>
<div class="b me" id="dm" style="top:270px">Hey! Leuk dat je er was. Volgende week weer? 🎾</div></div></div>
<div id="st" class="a"><div class="bar"><i></i></div><div class="txt">Welkom<br>bij de club!</div><div class="tag">@nieuwe_speler 🎾</div></div>
<div id="ok" class="a"><b>✓ TERUG</b></div>
<div id="q" class="a"><span>Doet jullie club dit al? Typ JA of NEE 👇</span></div>
<div id="sub" class="a"><span id="stx"></span></div>
<div id="end" class="a"><div class="em">${logo}</div><h2>Geen tijd om dit<br>zelf te doen?</h2><div class="dm">STUUR EEN DM 📩</div><div class="f">Volg voor wekelijkse clubtips</div></div>
</div><script>
const $=id=>document.getElementById(id),cl=x=>Math.max(0,Math.min(1,x)),p=(t,a,b)=>cl((t-a)/(b-a));
const eo=x=>1-Math.pow(1-cl(x),3),eb=x=>{x=cl(x);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const show=(e,t,a,b)=>{e.style.display=(t>=a&&t<b)?((e.id==='end'||e.id==='sub')?'flex':'block'):'none'};
const SUBS=${JSON.stringify(SUBS)},S=${SEAM};
window.render=function(t){
 show($('c1'),t,0.4,4.0);{const k=eb(p(t,0.4,0.75));$('c1').style.transform='translateX('+(1-k)*500+'px) rotate('+(4-2*k)+'deg)';$('c1').style.opacity=1-p(t,3.7,4.0);}
 show($('x'),t,4.7,6.4);{const k=eo(p(t,4.7,4.85));$('x').style.transform='rotate(-12deg) scale('+(2.2-1.2*k)+')';$('x').style.opacity=Math.min(1,k*1.4)*(1-p(t,6.1,6.4));}
 if(t<9.2){const k=eo(p(t,6.6,6.95));$('ph').style.transform='translateX('+(1-k)*420+'px) rotate(3deg)';$('ph').style.opacity=1-p(t,8.9,9.2);$('dm').style.display='none';$('seen').style.opacity=t>7.4?1:0;}
 show($('st'),t,S+0.1,S+2.4);{const k=eb(p(t,S+0.1,S+0.45));$('st').style.transform='scale('+(.6+.4*k)+') rotate('+(-3+3*k)+'deg)';$('st').style.opacity=Math.min(1,k*2)*(1-p(t,S+2.1,S+2.4));}
 show($('ph'),t,(t<9.2?6.6:S+2.4),(t<9.2?9.2:S+3.8));if(t>=S+2.4&&t<S+3.8){const k=eo(p(t,S+2.4,S+2.75));$('ph').style.transform='translateX('+(1-k)*420+'px) rotate(3deg)';$('ph').style.opacity=1-p(t,S+3.5,S+3.8);$('seen').style.opacity=0;$('dm').style.display=t>S+2.7?'block':'none';}
 show($('ok'),t,S+3.9,S+5.7);{const k=eb(p(t,S+3.9,S+4.2));$('ok').style.transform='scale('+(.5+.5*k)+')';$('ok').style.opacity=Math.min(1,k*2)*(1-p(t,S+5.4,S+5.7));}
 show($('q'),t,S+4.4,S+5.9);{const k=eo(p(t,S+4.4,S+4.7));$('q').style.transform='translateY('+(1-k)*80+'px)';$('q').style.opacity=k;}
 const s=SUBS.find(x=>t>=x[0]-0.05&&t<x[1]);show($('sub'),t,0,S+5.9);$('sub').style.visibility=s?'visible':'hidden';if(s){$('stx').textContent=s[2];$('sub').style.transform='scale('+(.88+.12*eo(p(t,s[0]-.05,s[0]+.1)))+')';}
 show($('end'),t,S+5.9,99);$('end').style.opacity=eo(p(t,S+5.9,S+6.2));
};</script>`;
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
  const arg = process.argv[3]; let frames = [...Array(Math.round(DUR * FPS)).keys()];
  if (arg) frames = arg.split(',').map(Number).map(s => Math.round(s * FPS));
  for (const i of frames) { await pg.evaluate(t => window.render(t), i / FPS); await pg.locator('#c').screenshot({ path: `${OUT}/m${String(i).padStart(4, '0')}.png`, omitBackground: true }); }
  await b.close();
})();
