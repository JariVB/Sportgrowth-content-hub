// Reel 12 · december · motion-track (transparant) 1080x1920 @30. Titel ACHTER Jari zit in comp.py.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const logo = fs.readFileSync('/home/user/Sportgrowth-content-hub/website/site/favicon.svg', 'utf8').replace('<svg ', '<svg width="100%" height="100%" ');
const FPS = 30, DUR = 30.7, T = [4.78, 10.44, 15.6, 20.04], Q = 25.5, E = 29.0;
const CH = [[0.0,'Welke 4 posts'],[1.4,'mag je club in december'],[2.7,'zeker niet vergeten?'],[4.0,null],
 [4.78,'Eén'],[5.7,'je kerstactie of eindejaarsfeest'],[7.75,'met een filmpje'],[8.9,'van vorig jaar'],[9.8,null],
 [10.44,'Twee'],[11.55,'een bedankje aan je'],[12.4,'vrijwilligers en trainers'],[13.5,'met hun gezicht'],[14.7,null],
 [15.6,'Drie'],[16.7,'je mooiste moment'],[17.4,'van het jaar'],[18.0,'in tien seconden'],[19.3,null],
 [20.04,'Vier'],[21.35,'wat er in januari start'],[22.9,'nieuwe lessen'],[23.7,'een proefles'],[24.6,'een tornooi'],[25.3,null],
 [25.55,'Geen tijd om dit'],[26.2,'zelf te maken?'],[27.1,null],[27.9,'Stuur ons een DM'],[29.0,null]];
const SUBS = []; for (let i = 0; i < CH.length - 1; i++) if (CH[i][1]) SUBS.push([CH[i][0], CH[i + 1][0], CH[i][1]]);
const html = `<style>
@font-face{font-family:Rj;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
body{margin:0;background:transparent}#c{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:In}
.a{position:absolute;display:none}
.card{left:620px;top:1060px;width:420px;background:#fff;border-radius:30px;box-shadow:0 30px 70px rgba(0,0,0,.55);color:#0d1b3e;padding:24px 26px 26px}
.n{display:flex;align-items:center;gap:14px;font:700 26px In;color:#6b7896}.n b{width:62px;height:62px;border-radius:50%;background:#0a78ff;color:#fff;font:700 40px Rj;display:flex;align-items:center;justify-content:center}
.dots{display:flex;gap:6px;margin-left:auto}.dots i{width:12px;height:12px;border-radius:50%;background:#d6dde9}.dots i.on{background:#00b8e6}
.t{font:800 38px/1.1 In;margin:16px 0 16px}
.th{height:150px;border-radius:18px;background:linear-gradient(135deg,#1b2a4e,#0d1b3e);position:relative;overflow:hidden}
.th .pl{position:absolute;left:50%;top:50%;width:70px;height:70px;margin:-35px 0 0 -35px;border-radius:50%;background:rgba(255,255,255,.92)}
.th .pl:after{content:"";position:absolute;left:27px;top:20px;border-left:24px solid #0d1b3e;border-top:15px solid transparent;border-bottom:15px solid transparent}
.th .lb{position:absolute;left:14px;bottom:12px;font:700 22px In;color:#fff;background:rgba(0,0,0,.45);padding:5px 12px;border-radius:10px}
.th .tm{position:absolute;right:14px;top:12px;font:800 24px In;color:#0d1b3e;background:#00d4ff;padding:5px 12px;border-radius:10px}
.av{display:flex;align-items:center;gap:-10px}.av i{width:76px;height:76px;border-radius:50%;border:4px solid #fff;margin-right:-16px;display:flex;align-items:center;justify-content:center;font:800 28px In;color:#fff;font-style:normal}
.av span{margin-left:30px;font:800 30px In;color:#e5245a}
.chip{display:block;font:700 30px In;background:#eef3fb;border-radius:14px;padding:12px 16px;margin-top:10px;opacity:0}
#sub{left:60px;right:60px;top:1655px;display:flex;justify-content:center}
#sub span{display:inline-block;font:800 58px/1.15 In;color:#fff;background:rgba(13,27,62,.88);padding:14px 28px 18px;border-radius:18px;text-align:center}
#q{left:60px;right:60px;top:1400px;text-align:center}#q span{display:inline-block;font:800 52px/1.15 In;color:#0d1b3e;background:#00d4ff;padding:18px 30px;border-radius:20px}
#end{inset:0;background:rgba(6,12,28,.85);flex-direction:column;align-items:center;justify-content:center;gap:34px}
#end .em{width:230px;height:230px;filter:drop-shadow(0 0 30px rgba(0,212,255,.6))}#end h2{margin:0;font:800 64px/1.1 In;color:#fff;text-align:center}
#end .dm{font:700 78px/1 Rj;color:#0d1b3e;background:#00d4ff;padding:22px 40px 14px;border-radius:24px}#end .f{font:600 34px In;color:#8fa3cc}
</style><div id="c">
${[1,2,3,4].map(i=>`<div id="k${i}" class="a card"><div class="n"><b>${i}</b>van 4<div class="dots">${[1,2,3,4].map(j=>`<i class="${j<=i?'on':''}"></i>`).join('')}</div></div>`+
 (i==1?`<div class="t">Kerstactie of eindejaarsfeest</div><div class="th"><div class="pl"></div><div class="lb">🎄 Vorig jaar</div></div>`:
  i==2?`<div class="t">Bedankt, vrijwilligers en trainers</div><div class="av"><i style="background:#0a78ff">AN</i><i style="background:#19a35a">TV</i><i style="background:#ff8a00">EL</i><span>❤️ Bedankt!</span></div>`:
  i==3?`<div class="t">Mooiste moment van het jaar</div><div class="th"><div class="pl"></div><div class="tm">0:10</div><div class="lb">🏆 2026</div></div>`:
  `<div class="t">Start in januari</div><div class="chip" id="c1">📅 Nieuwe lessen</div><div class="chip" id="c2">🎾 Proefles</div><div class="chip" id="c3">🏆 Tornooi</div>`)+`</div>`).join('')}
<div id="q" class="a"><span>Welke vergeet jullie club?<br>Typ 1, 2, 3 of 4 👇</span></div>
<div id="sub" class="a"><span id="stx"></span></div>
<div id="end" class="a"><div class="em">${logo}</div><h2>Geen tijd om dit<br>zelf te maken?</h2><div class="dm">STUUR EEN DM 📩</div><div class="f">Volg voor wekelijkse clubtips</div></div>
</div><script>
const $=id=>document.getElementById(id),cl=x=>Math.max(0,Math.min(1,x)),p=(t,a,b)=>cl((t-a)/(b-a));
const eo=x=>1-Math.pow(1-cl(x),3),eb=x=>{x=cl(x);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const show=(e,t,a,b)=>{e.style.display=(t>=a&&t<b)?((e.id==='end'||e.id==='sub')?'flex':'block'):'none'};
const SUBS=${JSON.stringify(SUBS)},T=${JSON.stringify(T)},Q=${Q},E=${E};
const ENDS=[T[1]-0.4,T[2]-0.4,T[3]-0.4,Q-0.1];
window.render=function(t){
 for(let i=0;i<4;i++){const e=$('k'+(i+1)),a=T[i]+0.1,b=ENDS[i];show(e,t,a,b);const k=eb(p(t,a,a+0.4));e.style.transform='translateX('+(1-k)*520+'px) rotate('+(3-2*k)+'deg)';e.style.opacity=1-p(t,b-0.3,b);}
 [[22.98,'c1'],[23.84,'c2'],[24.66,'c3']].forEach(([s,id])=>{const k=eo(p(t,s-0.15,s+0.15));$(id).style.opacity=k;$(id).style.transform='translateX('+(1-k)*40+'px)';});
 show($('q'),t,Q,E);{const k=eb(p(t,Q,Q+0.35));$('q').style.transform='scale('+(.7+.3*k)+')';$('q').style.opacity=Math.min(1,k*2)*(1-p(t,E-0.25,E));}
 const s=SUBS.find(x=>t>=x[0]-0.05&&t<x[1]);show($('sub'),t,0,E);$('sub').style.visibility=s?'visible':'hidden';if(s){$('stx').textContent=s[2];$('sub').style.transform='scale('+(.88+.12*eo(p(t,s[0]-.05,s[0]+.1)))+')';}
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
