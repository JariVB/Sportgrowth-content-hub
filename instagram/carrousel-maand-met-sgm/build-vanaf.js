const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const R = '/home/user/Sportgrowth-content-hub', F = R + '/website/site/fonts', IMG = R + '/website/site/img';
const OUT = __dirname;
const N = 8;
const css = `
@font-face{font-family:Rj;src:url(file://${F}/rajdhani-700.woff2)}
@font-face{font-family:In;src:url(file://${F}/inter-var.woff2)}
@font-face{font-family:Pp;src:url(file://${F}/poppins-700.woff2)}
*{box-sizing:border-box}body{margin:0;background:#000}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;background:#0d1b3e;color:#fff;font-family:In,'Noto Color Emoji'}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.dim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,27,62,.15) 0%,rgba(13,27,62,.25) 35%,rgba(13,27,62,.92) 66%,#0d1b3e 100%)}
.logo{position:absolute;right:56px;bottom:48px;font:700 34px/1 Pp;color:#fff}
.logo i{display:block;font:500 12px/1 In;color:#0e8cff;letter-spacing:.42em;text-align:right;margin-top:4px;margin-right:-.42em;font-style:normal}
.pg{position:absolute;left:60px;bottom:52px;display:flex;gap:10px}.pg b{width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,.25)}.pg b.on{background:#00d4ff}
.swipe{position:absolute;right:60px;top:60px;font:700 30px/1 In;color:#0d1b3e;background:#00d4ff;padding:16px 26px;border-radius:40px}
.tag{display:inline-block;font:800 30px/1 In;letter-spacing:.08em;color:#0d1b3e;background:#00d4ff;padding:14px 22px;border-radius:10px;align-self:flex-start}
h1{font:700 112px/.95 Rj;margin:0;text-transform:uppercase}
h2{font:700 96px/.98 Rj;margin:0;text-transform:uppercase}
.c{color:#00d4ff}
p.t{font:500 42px/1.38 In;color:#c9d4ee;margin:0}p.t b{color:#fff}
.num{position:absolute;right:-20px;top:-110px;font:700 620px/1 Rj;color:transparent;-webkit-text-stroke:4px rgba(0,212,255,.22)}
.top{position:absolute;left:70px;right:70px;top:90px;bottom:130px;display:flex;flex-direction:column;justify-content:center;gap:36px}
.card{background:#fff;color:#0d1b3e;border-radius:28px;padding:30px 34px;box-shadow:0 30px 70px rgba(0,0,0,.4)}
.row{display:flex;align-items:center;gap:22px;font:600 40px/1.3 In}
.dot{width:26px;height:26px;border-radius:50%;flex:none}
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:10px}
.d{aspect-ratio:1;border-radius:14px;background:#eef2f8;position:relative;font:600 22px In;color:#7a879e;padding:8px}
.d i{position:absolute;left:50%;top:58%;transform:translate(-50%,-50%);width:26px;height:26px;border-radius:50%}
.hd{font:700 22px In;color:#7a879e;text-align:center}
.wa{background:#e7ffdb;color:#111;border-radius:22px;padding:26px 30px;font:500 38px/1.35 In;align-self:flex-start;max-width:760px}
.wa.me{background:#fff;align-self:flex-end}
.kpi{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.k{background:#fff;color:#0d1b3e;border-radius:24px;padding:26px 28px}.k b{display:block;font:700 76px/1 Rj;color:#0d1b3e}.k span{font:600 32px/1.3 In;color:#56627a}.k{padding:34px 32px}
.pk{display:flex;flex-direction:column;gap:16px}
.p{background:#fff;color:#0d1b3e;border-radius:22px;padding:24px 30px;display:flex;justify-content:space-between;align-items:center}
.p{padding:30px 34px}.p b{font:700 64px/1 Rj}.p span{font:500 31px/1.3 In;color:#56627a;max-width:600px;text-align:right}
`;
const pg = n => `<div class="pg">${Array.from({length:N},(_,i)=>`<b class="${i+1===n?'on':''}"></b>`).join('')}</div>`;
const page = (n, inner) => `<section class="s" id="s${n}">${inner}${pg(n)}<div class="logo">SportGrowth<i>MEDIA</i></div></section>`;
const C = {post:'#00d4ff', reel:'#ff4d5e', story:'#f2b632'};
const days = ['ma','di','wo','do','vr','za','zo'];
// oktober-achtige maand, 4 weken: post ma, reel di + do, stories ma-za
const plan = {1:'post',2:'reel',4:'reel',8:'post',9:'reel',11:'reel',15:'post',16:'reel',18:'reel',22:'post',23:'reel',25:'reel'};
const cal = `<div class="cal">${days.map(d=>`<div class="hd">${d}</div>`).join('')}${Array.from({length:28},(_,i)=>{const t=plan[i+1];return `<div class="d">${i+1}${t?`<i style="background:${C[t]}"></i>`:''}</div>`}).join('')}</div>`;
const S = [];
S.push(page(1, `<div class="bg" style="background-image:url(file://${IMG}/jari-padelterrein.jpg);background-position:center 30%"></div><div class="dim"></div>
<div class="swipe">Swipe →</div>
<div style="position:absolute;left:70px;right:70px;top:640px;display:flex;flex-direction:column;gap:28px">
<span class="tag">ZO WERKT SGM</span>
<h1>Zo ziet een maand<br>Instagram eruit<br>als <span class="c">wij</span> het<br>voor je doen</h1></div>`));
S.push(page(2, `<div class="num">0</div><div class="top"><span class="tag">VOOR WE STARTEN</span>
<h2>Eerst kijken<br>we <span class="c">gratis</span><br>mee</h2>
<p class="t">We bekijken jullie Instagram en vragen wat jullie willen: <b>meer leden, meer boekingen, sponsors of een vol kamp</b>.</p>
<p class="t">Daar bouwen we de hele maand rond.</p></div>`));
S.push(page(3, `<div class="num">1</div><div class="top"><span class="tag">STAP 1 · HET PLAN</span>
<h2>Een maand<br>op <span class="c">één scherm</span></h2>
<div class="card">${cal}
<div style="display:flex;gap:30px;margin-top:22px;font:600 26px In;color:#56627a"><span><i class="dot" style="display:inline-block;vertical-align:middle;background:${C.post}"></i> post</span><span><i class="dot" style="display:inline-block;vertical-align:middle;background:${C.reel}"></i> reel</span><span>+ elke week stories</span></div></div>
<p class="t">Afgestemd op <b>jullie seizoen</b>: lesreeksen, kampen, tornooien en de uren die je vol wil.</p></div>`));
S.push(page(4, `<div class="num">2</div><div class="top"><span class="tag">STAP 2 · DE CONTENT</span>
<h2>Jullie <span class="c">sfeer</span>,<br>onze montage</h2>
<div class="card" style="display:flex;flex-direction:column;gap:22px">
<div class="row"><i class="dot" style="background:${C.post}"></i>Jullie sturen foto's en filmpjes van de week</div>
<div class="row"><i class="dot" style="background:${C.reel}"></i>Of wij komen 1 keer per maand filmen</div>
<div class="row"><i class="dot" style="background:${C.story}"></i>Wij maken er reels, posts en stories van, in jullie stijl</div></div>
<p class="t">Echte mensen op jullie terreinen. <b>Geen affiches, geen uurroosters.</b></p></div>`));
S.push(page(5, `<div class="num">3</div><div class="top"><span class="tag">STAP 3 · POSTEN</span>
<h2>Jij keurt goed,<br><span class="c">wij posten</span></h2>
<div class="card" style="background:#f0f2f5;display:flex;flex-direction:column;gap:16px">
<div class="wa me">Deze week: reel van de jeugdtraining + post over de lesreeks. Goed zo? 👍</div>
<div class="wa">Top! 🙌</div></div>
<p class="t">Wij plannen alles in op de momenten dat jullie leden online zijn. <b>Jij hoeft er niet aan te denken.</b></p></div>`));
S.push(page(6, `<div class="num">4</div><div class="top"><span class="tag">STAP 4 · HET RAPPORT</span>
<h2>Elke maand<br>zie je <span class="c">wat het oplevert</span></h2>
<div class="kpi"><div class="k"><b>bereik</b><span>hoeveel mensen jullie zagen</span></div><div class="k"><b>volgers</b><span>nieuwe mensen uit de buurt</span></div>
<div class="k"><b>berichten</b><span>vragen over lessen of boekingen</span></div><div class="k"><b>wat werkt</b><span>daar doen we meer van</span></div></div></div>`));
S.push(page(7, `<div class="bg" style="background-image:url(file://${IMG}/jan-stilten-na.jpg);background-position:center 20%;opacity:.12;filter:blur(6px)"></div>
<div class="top"><span class="tag">RESULTAAT</span>
<h2>Jan Stilten<br>Padel Academy</h2>
<div class="kpi"><div class="k"><b>3.367</b><span>mensen bereikt in 6 weken</span></div><div class="k"><b>€0</b><span>aan advertenties</span></div></div>
<p class="t">En de maandagsles zat <b>bijna vol</b>.</p></div>`));
S.push(page(8, `<div class="top"><span class="tag">WAT KOST HET?</span>
<h2>Kies een pakket,<br>wij doen <span class="c">de rest</span></h2>
<div class="pk"><div class="p"><b>Mini</b><span>posts + stories</span></div>
<div class="p"><b>Starter</b><span>posts, reels + stories</span></div>
<div class="p"><b>Growth</b><span>meer reels + elke dag stories</span></div></div>
<div style="font:700 64px/1 Rj;color:#fff">vanaf <span class="c">€249</span> per maand</div>
<div style="background:#00d4ff;color:#0d1b3e;border-radius:26px;padding:30px 36px;display:flex;flex-direction:column;gap:8px">
<span style="font:700 76px/1 Rj">STUUR EEN DM</span><span style="font:600 32px/1.3 In">voor een gratis analyse van jullie Instagram</span></div></div>`));
const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${S.join('')}</body></html>`;
fs.writeFileSync(OUT + '/c.html', html);
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.goto('file://' + OUT + '/c.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(700);
  for (let i = 1; i <= N; i++) await p.locator('#s' + i).screenshot({ path: `${OUT}/${i===8?'slide08-vanaf':'slide0'+i}.png` });
  await b.close(); })();
