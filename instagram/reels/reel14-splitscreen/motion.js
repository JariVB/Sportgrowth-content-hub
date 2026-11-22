// Reel 14 · split-screen amateur vs pro · motion-track 1080x1920 @30 (transparant)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const img = 'data:image/jpeg;base64,' + fs.readFileSync(__dirname + '/foto-tornooi.jpg').toString('base64');
const logo = fs.readFileSync('/home/user/Sportgrowth-content-hub/website/site/favicon.svg', 'utf8').replace('<svg ', '<svg width="100%" height="100%" ');
const FPS = 30, DUR = 19.7, B = 4.7, C = 13.3, E = 17.3;
// pro-woorden: tijd in clip - 1.6 + B
const pt = x => +(x - 1.6 + B).toFixed(2);
const CH = [[0.2,'Ons tornooi is zaterdag!'],[2.3,'Kom allemaal!'],[3.5,'Link in bio!'],[4.5,null],
 [pt(1.92),'Zaterdag spelen'],[pt(3.2),'64 spelers ons tornooi'],[pt(5.3),null],[pt(5.56),'Dit was vorig jaar'],[pt(7.2),null],[pt(7.56),'Schrijf je in'],[pt(8.5),null],[pt(8.82),'Nog 8 plaatsen'],[pt(10.0),null]];
const SUBS = []; for (let i = 0; i < CH.length - 1; i++) if (CH[i][1]) SUBS.push([CH[i][0], CH[i + 1][0], CH[i][1]]);
const html = `<style>
@font-face{font-family:Rj;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
body{margin:0;background:transparent}#c{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:In}
.a{position:absolute;display:none}
#hk{left:50px;right:50px;top:130px;text-align:center;background:rgba(13,27,62,.92);border:3px solid #3fe0ff;border-radius:28px;padding:34px 20px 30px}#hk h1{margin:0;font:700 104px/.95 Rj;text-transform:uppercase;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.6)}#hk h1 span{color:#3fe0ff}
.lb{left:50px;top:90px;font:800 44px In;padding:12px 26px;border-radius:14px;letter-spacing:.06em}
#la{background:#ff3b30;color:#fff}#lp{background:#19d38a;color:#0a1226}
#af{left:40px;top:330px;width:400px;padding:22px;background:#fff36b;border:6px dashed #ff2d95;transform:rotate(-6deg);font:900 50px/1.05 'Comic Sans MS',In;color:#e0002b;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,.35)}
#af small{display:block;font:800 30px 'Comic Sans MS',In;color:#0033cc;margin-top:10px}
#st{left:640px;top:1130px;font:800 46px In;color:#0d1b3e;background:#fff;padding:16px 26px;border-radius:20px;box-shadow:0 20px 50px rgba(0,0,0,.4)}
#ph{left:670px;top:430px;width:370px;background:#fff;border-radius:26px;padding:14px;box-shadow:0 30px 70px rgba(0,0,0,.5)}
#ph .im{height:300px;border-radius:16px;background:url(${img}) center 70%/cover;position:relative}
#ph .im i{position:absolute;left:12px;bottom:12px;font:800 24px In;font-style:normal;color:#fff;background:rgba(0,0,0,.55);padding:6px 12px;border-radius:10px}
#ph .t{font:800 30px In;color:#0d1b3e;padding:12px 6px 4px}
#pl{left:0;right:0;top:1150px;text-align:center}#pl b{display:inline-block;font:800 54px In;color:#fff;background:#ff6a00;padding:16px 30px;border-radius:20px;box-shadow:0 20px 50px rgba(0,0,0,.4)}
#pl em{display:block;margin:18px auto 0;width:max-content;font:800 40px In;font-style:normal;color:#0d1b3e;background:#00d4ff;padding:14px 26px;border-radius:40px}
.sl{left:30px;font:800 40px In;padding:10px 22px;border-radius:12px}#s1{top:40px;background:#ff3b30;color:#fff}#s2{top:1000px;background:#19d38a;color:#0a1226}
#sp{left:0;right:0;top:952px;height:16px;background:#0d1b3e}
#q{left:60px;right:60px;top:1640px;text-align:center}#q span{display:inline-block;font:800 54px/1.2 In;color:#0d1b3e;background:#00d4ff;padding:20px 34px;border-radius:22px;box-shadow:0 20px 50px rgba(0,0,0,.5)}
#sub{left:60px;right:60px;top:1655px;display:flex;justify-content:center}
#sub span{display:inline-block;font:800 58px/1.15 In;color:#fff;background:rgba(13,27,62,.88);padding:14px 28px 18px;border-radius:18px;text-align:center}
#end{inset:0;background:rgba(6,12,28,.86);flex-direction:column;align-items:center;justify-content:center;gap:34px}
#end .em{width:230px;height:230px;filter:drop-shadow(0 0 30px rgba(0,212,255,.6))}#end h2{margin:0;font:800 62px/1.15 In;color:#fff;text-align:center}
#end .dm{font:700 78px/1 Rj;color:#0d1b3e;background:#00d4ff;padding:22px 40px 14px;border-radius:24px}#end .f{font:600 34px In;color:#8fa3cc}
</style><div id="c">
<div id="hk" class="a"><h1>Zelfde tornooi.<br><span>Welke post vult het?</span></h1></div>
<div id="la" class="a lb">❌ AMATEUR</div><div id="lp" class="a lb">✅ PRO</div>
<div id="af" class="a">TORNOOI!!! 🎾🎉🍻<small>zaterdag · iedereen welkom · info volgt</small></div>
<div id="st" class="a">👥 64 spelers</div>
<div id="ph" class="a"><div class="im"><i>📸 Tornooi 2025</i></div><div class="t">Zo zag het eruit</div></div>
<div id="pl" class="a"><b>🔥 Nog 8 plaatsen</b><em>Schrijf je in →</em></div>
<div id="sp" class="a"></div><div id="s1" class="a sl">1 · AMATEUR</div><div id="s2" class="a sl">2 · PRO</div>
<div id="q" class="a"><span>Welke zou jij liken?<br>Typ 1 of 2 👇</span></div>
<div id="sub" class="a"><span id="stx"></span></div>
<div id="end" class="a"><div class="em">${logo}</div><h2>Wij maken van<br>jouw tornooi post 2</h2><div class="dm">STUUR EEN DM 📩</div><div class="f">Volg voor wekelijkse clubtips</div></div>
</div><script>
const $=id=>document.getElementById(id),cl=x=>Math.max(0,Math.min(1,x)),p=(t,a,b)=>cl((t-a)/(b-a));
const eo=x=>1-Math.pow(1-cl(x),3),eb=x=>{x=cl(x);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const show=(e,t,a,b)=>{e.style.display=(t>=a&&t<b)?((e.id==='end'||e.id==='sub')?'flex':'block'):'none'};
const SUBS=${JSON.stringify(SUBS)},B=${B},C=${C},E=${E};
const pop=(e,t,a,b,s0=.6)=>{show(e,t,a,b);const k=eb(p(t,a,a+.35));e.style.transform=(e._r||'')+' scale('+(s0+(1-s0)*k)+')';e.style.opacity=Math.min(1,k*2)*(1-p(t,b-.25,b));};
window.render=function(t){
 show($('hk'),t,0,2.3);{const k=eo(p(t,0,.3));$('hk').style.opacity=k*(1-p(t,2.0,2.3));$('hk').style.transform='scale('+(1.1-.1*k)+')';}
 show($('la'),t,2.3,B);$('la').style.opacity=eo(p(t,2.3,2.6));
 $('af')._r='rotate(-6deg)';pop($('af'),t,2.4,B,.4);
 show($('lp'),t,B,C);$('lp').style.opacity=eo(p(t,B,B+.3));
 pop($('st'),t,B+1.6,B+3.9);
 pop($('ph'),t,B+3.95,B+5.9,.5);
 pop($('pl'),t,B+5.95,C);
 show($('sp'),t,C,E);show($('s1'),t,C,E);show($('s2'),t,C,E);
 pop($('q'),t,C+.3,E+.01,.7);
 const s=SUBS.find(x=>t>=x[0]-0.05&&t<x[1]);show($('sub'),t,0,C);$('sub').style.visibility=s?'visible':'hidden';if(s){$('stx').textContent=s[2];$('sub').style.transform='scale('+(.88+.12*eo(p(t,s[0]-.05,s[0]+.1)))+')';}
 show($('end'),t,E,99);$('end').style.opacity=eo(p(t,E,E+.3));
};</script>`;
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
  const arg = process.argv[3]; let frames = [...Array(Math.round(DUR * FPS)).keys()];
  if (arg) frames = arg.split(',').map(Number).map(s => Math.round(s * FPS));
  for (const i of frames) { await pg.evaluate(t => window.render(t), i / FPS); await pg.locator('#c').screenshot({ path: `${OUT}/m${String(i).padStart(4, '0')}.png`, omitBackground: true }); }
  await b.close();
})();
