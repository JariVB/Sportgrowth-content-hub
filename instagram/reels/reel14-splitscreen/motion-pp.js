// Reel 14 v5 · pingpong amateur vs pro · motion-track 1080x1920 @30 (transparant)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const J = JSON.parse(fs.readFileSync(process.argv[3]));
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const img = 'data:image/jpeg;base64,' + fs.readFileSync(__dirname + '/foto-tornooi.jpg').toString('base64');
const logo = fs.readFileSync('/home/user/Sportgrowth-content-hub/website/site/favicon.svg', 'utf8').replace('<svg ', '<svg width="100%" height="100%" ');
const FPS = 30, DUR = J.DUR, Q = J.Q, E = J.E, TL = J.timeline;
// ondertitels per spreker: [start, einde, kant, tekst]
const CAP = [[0.15,1.12,'A','Ons tornooi'],[1.12,2.07,'A','is zaterdag!'],
 [2.19,3.45,'P','Zaterdag spelen'],[3.45,4.6,'P','64 spelers'],[4.6,5.47,'P','ons tornooi'],
 [5.55,6.23,'A','Kom allemaal!'],
 [6.33,7.05,'P','Dit was'],[7.05,7.85,'P','vorig jaar'],
 [7.95,8.93,'A','Link in bio!'],
 [9.03,10.3,'P','Schrijf je in'],[10.3,11.39,'P','Nog 8 plaatsen']];
const html = `<style>
@font-face{font-family:Rj;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
body{margin:0;background:transparent}#c{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:In}
.a{position:absolute;display:none}
#hd{display:block;left:0;right:0;top:70px;text-align:center}
#hd .k{display:inline-block;font:800 34px In;color:#0d1b3e;background:#fff;padding:8px 18px;border-radius:10px;letter-spacing:.04em}
#hd .r{margin-top:22px;position:relative;height:110px}
#hd .r b{position:absolute;top:10px;width:540px;text-align:center;font:700 80px/1 Rj;text-transform:uppercase;text-shadow:0 6px 22px rgba(0,0,0,.35)}
#ha{left:0;color:#ff3b30}#hp{left:540px;color:#19d38a}#hd .vs{position:absolute;left:490px;top:0;width:100px;height:100px;border-radius:50%;background:#0d1b3e;color:#fff;font:700 50px/100px Rj;text-align:center;z-index:2}
#sp{display:block;top:0;bottom:0;left:534px;width:12px;background:#0d1b3e}
.cap{top:1170px;width:540px;text-align:center}.cap span{display:inline-block;font:800 50px/1.1 In;color:#fff;background:rgba(13,27,62,.9);padding:12px 22px 14px;border-radius:14px}
#cA{left:0}#cP{left:540px}
#af{left:30px;top:1300px;width:470px;padding:20px;background:#fff36b;border:6px dashed #ff2d95;font:900 46px/1.05 'Comic Sans MS',In;color:#e0002b;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,.35)}
#af small{display:block;font:800 28px 'Comic Sans MS',In;color:#0033cc;margin-top:8px}
#st{left:610px;top:1310px;font:800 44px In;color:#0d1b3e;background:#fff;padding:14px 24px;border-radius:18px;box-shadow:0 20px 50px rgba(0,0,0,.4)}
#ph{left:760px;top:1290px;width:310px;background:#fff;border-radius:24px;padding:12px;box-shadow:0 30px 70px rgba(0,0,0,.5)}
#ph .im{height:200px;border-radius:14px;background:url(${img}) center 70%/cover;position:relative}
#ph .im i{position:absolute;left:10px;bottom:10px;font:800 22px In;font-style:normal;color:#fff;background:rgba(0,0,0,.55);padding:5px 10px;border-radius:9px}
#ph .t{font:800 28px In;color:#0d1b3e;padding:10px 6px 2px}
#pl{left:540px;right:0;top:1310px;text-align:center}#pl b{display:inline-block;font:800 44px In;color:#fff;background:#ff6a00;padding:14px 26px;border-radius:18px}
#pl em{display:block;margin:14px auto 0;width:max-content;font:800 38px In;font-style:normal;color:#0d1b3e;background:#00d4ff;padding:12px 24px;border-radius:40px}
#q{left:60px;right:60px;top:1560px;text-align:center}#q span{display:inline-block;font:800 54px/1.2 In;color:#0d1b3e;background:#00d4ff;padding:20px 34px;border-radius:22px;box-shadow:0 20px 50px rgba(0,0,0,.5)}
#end{inset:0;background:rgba(6,12,28,.88);flex-direction:column;align-items:center;justify-content:center;gap:34px}
#end .em{width:230px;height:230px;filter:drop-shadow(0 0 30px rgba(0,212,255,.6))}#end h2{margin:0;font:800 62px/1.15 In;color:#fff;text-align:center}
#end .dm{font:700 78px/1 Rj;color:#0d1b3e;background:#00d4ff;padding:22px 40px 14px;border-radius:24px}#end .f{font:600 34px In;color:#8fa3cc}
</style><div id="c">
<div id="sp" class="a"></div>
<div id="hd" class="a"><span class="k">TORNOOI-POST</span><div class="r"><b id="ha">1 · Amateur</b><span class="vs">VS</span><b id="hp">2 · Pro</b></div></div>
<div id="af" class="a">TORNOOI!!! 🎾🎉🍻<small>zaterdag · iedereen welkom · info volgt</small></div>
<div id="st" class="a">👥 64 spelers</div>
<div id="ph" class="a"><div class="im"><i>📸 Tornooi 2025</i></div><div class="t">Zo zag het eruit</div></div>
<div id="pl" class="a"><b>🔥 Nog 8 plaatsen</b><em>Schrijf je in →</em></div>
<div id="cA" class="a cap"><span id="tA"></span></div><div id="cP" class="a cap"><span id="tP"></span></div>
<div id="q" class="a"><span>Welke zou jij liken?<br>Typ 1 of 2 👇</span></div>
<div id="end" class="a"><div class="em">${logo}</div><h2>Wij maken van<br>jouw tornooi post 2</h2><div class="dm">STUUR EEN DM 📩</div><div class="f">Volg voor wekelijkse clubtips</div></div>
</div><script>
const $=id=>document.getElementById(id),cl=x=>Math.max(0,Math.min(1,x)),p=(t,a,b)=>cl((t-a)/(b-a));
const eo=x=>1-Math.pow(1-cl(x),3),eb=x=>{x=cl(x);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const show=(e,t,a,b)=>{e.style.display=(t>=a&&t<b)?((e.id==='end')?'flex':'block'):'none'};
const CAP=${JSON.stringify(CAP)},TL=${JSON.stringify(TL)},Q=${Q},E=${E};
const pop=(e,t,a,b,s0=.6,r='')=>{show(e,t,a,b);const k=eb(p(t,a,a+.35));e.style.transform=r+' scale('+(s0+(1-s0)*k)+')';e.style.opacity=Math.min(1,k*2)*(1-p(t,b-.25,b));};
window.render=function(t){
 show($('sp'),t,0,E);show($('hd'),t,0,E);
 const seg=TL.find(s=>t>=s[1]&&t<s[2]);const w=seg?seg[0]:null;
 $('ha').style.opacity=(w==='P')?.45:1;$('hp').style.opacity=(w==='A')?.45:1;
 $('ha').style.transform='scale('+(w==='A'?1.06:1)+')';$('hp').style.transform='scale('+(w==='P'?1.06:1)+')';
 pop($('af'),t,1.0,8.93,.4,'rotate(-6deg)');
 pop($('st'),t,3.45,5.47);
 show($('ph'),t,6.6,7.85);{const k=eb(p(t,6.6,6.95));$('ph').style.transform='translateX('+(1-k)*360+'px) rotate('+(4-2*k)+'deg)';$('ph').style.opacity=1-p(t,7.6,7.85);}
 pop($('pl'),t,10.3,Q);
 for(const side of ['A','P']){const c=CAP.find(x=>x[2]===side&&t>=x[0]&&t<x[1]);const e=$('c'+side);show(e,t,0,Q);e.style.visibility=c?'visible':'hidden';if(c){$('t'+side).textContent=c[3];e.style.transform='scale('+(.88+.12*eo(p(t,c[0],c[0]+.12)))+')';}}
 pop($('q'),t,Q+.1,E+.01,.7);
 show($('end'),t,E,99);$('end').style.opacity=eo(p(t,E,E+.3));
};</script>`;
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
  const arg = process.argv[4]; let frames = [...Array(Math.round(DUR * FPS)).keys()];
  if (arg) frames = arg.split(',').map(Number).map(s => Math.round(s * FPS));
  for (const i of frames) { await pg.evaluate(t => window.render(t), i / FPS); await pg.locator('#c').screenshot({ path: `${OUT}/m${String(i).padStart(4, '0')}.png`, omitBackground: true }); }
  await b.close();
})();
