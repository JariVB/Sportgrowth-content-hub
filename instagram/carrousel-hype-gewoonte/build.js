const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const R = '/home/user/Sportgrowth-content-hub', F = R + '/website/site/fonts', B = R + '/instagram/beeldbank';
const OUT = __dirname;
const f64 = (p) => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const i64 = (p) => `url(data:image/jpeg;base64,${fs.readFileSync(p).toString('base64')})`;

const css = `
@font-face{font-family:Rj;src:url(${f64(F + '/rajdhani-700.woff2')})}
@font-face{font-family:In;src:url(${f64(F + '/inter-var.woff2')})}
@font-face{font-family:Pp;src:url(${f64(F + '/poppins-700.woff2')})}
*{box-sizing:border-box}
body{margin:0;background:#000}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;background:#0d1b3e;color:#fff;font-family:In,'Noto Color Emoji'}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.dim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,27,62,.55) 0%,rgba(13,27,62,.3) 30%,rgba(13,27,62,.92) 62%,#0d1b3e 100%)}
.logo{position:absolute;right:56px;bottom:48px;font:700 34px/1 Pp;color:#fff}
.logo i{display:block;font:500 12px/1 In;color:#0e8cff;letter-spacing:.42em;text-align:right;margin-top:4px;margin-right:-.42em;font-style:normal}
.pg{position:absolute;left:60px;bottom:52px;display:flex;gap:10px}
.pg b{width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,.25)}
.pg b.on{background:#00d4ff}
.swipe{position:absolute;right:60px;top:60px;font:700 30px/1 In;color:#0d1b3e;background:#00d4ff;padding:16px 26px;border-radius:40px}
.tag{display:inline-block;align-self:flex-start;font:800 30px/1 In;letter-spacing:.08em;color:#0d1b3e;background:#00d4ff;padding:14px 22px;border-radius:10px}
h1{font:700 128px/.93 Rj;margin:0;text-transform:uppercase;letter-spacing:-.5px}
h2{font:700 96px/.96 Rj;margin:0;text-transform:uppercase}
.c{color:#00d4ff}
p.t{font:500 40px/1.38 In;color:#c9d4ee;margin:0}
p.t b{color:#fff}
.num{position:absolute;right:-20px;top:-130px;font:700 640px/1 Rj;color:transparent;-webkit-text-stroke:4px rgba(0,212,255,.22)}
.col{position:absolute;left:70px;right:70px;display:flex;flex-direction:column;gap:28px}
.q{border-left:8px solid #00d4ff;padding:6px 0 6px 34px;font:600 44px/1.3 In;color:#fff}
.q small{display:block;margin-top:18px;font:600 28px/1.2 In;color:#00d4ff;letter-spacing:.02em}
`;

const page = (n, inner) => `<section class="s" id="s${n}">${inner}
<div class="pg">${[1,2,3,4,5,6,7,8].map(i => `<b class="${i===n?'on':''}"></b>`).join('')}</div>
<div class="logo">SportGrowth<i>MEDIA</i></div></section>`;

const S = [];

// 1 COVER
S.push(page(1, `
<div class="bg" style="background-image:${i64(OUT + '/tom-1.jpg')};background-position:center 62%"></div><div class="dim"></div>
<div class="swipe">Swipe →</div>
<div class="col" style="top:560px">
<span class="tag">SPORTS NEXT · PANEL PADEL</span>
<h1>Van 80 naar<br><span class="c">160 leden</span><br>in één jaar</h1>
<p class="t" style="font-size:44px"><b>Padel: van hype naar gewoonte.</b><br>5 lessen voor clubs</p>
</div>`));

// 2 HERKENNING
S.push(page(2, `
<div class="num">?</div>
<div class="col" style="top:200px;gap:40px">
<span class="tag">HERKENBAAR?</span>
<h2>De hype is er.<br>Maar <span class="c">blijven ze</span><br>ook?</h2>
<p class="t">Elke week nieuwe gezichten op de padelterreinen.<br><b>De echte vraag:</b> hoe maak je van een eerste keer een vaste gewoonte?</p>
<p class="t">Op het panel van <b>Sports NEXT</b> vertelde <b>Tom De Sutter</b> (Arenal België) hoe zij het doen.</p>
</div>`));

// 3 LES 1
S.push(page(3, `
<div class="num">1</div>
<div class="col" style="top:110px">
<span class="tag">LES 1/5</span>
<h2>Laat ze eerst<br><span class="c">spelen</span></h2>
<p class="t">Het eerste jaar moest Arenal veel uitleggen. "Is dit squash?" Nee, het is gewoon padel.</p>
</div>
<div style="position:absolute;left:70px;right:70px;top:640px;height:330px;display:flex;align-items:flex-end;gap:60px">
<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:14px"><span style="font:700 80px/1 Rj">80</span><div style="width:100%;height:120px;background:#2a3d6e;border-radius:16px 16px 0 0"></div><span style="font:600 28px In;color:#c9d4ee">jaar 1</span></div>
<div style="font:700 70px/1 Rj;color:#00d4ff;padding-bottom:110px">→</div>
<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:14px"><span style="font:700 80px/1 Rj;color:#00d4ff">160</span><div style="width:100%;height:240px;background:#00d4ff;border-radius:16px 16px 0 0"></div><span style="font:600 28px In;color:#c9d4ee">jaar 2</span></div>
</div>
<div class="col" style="top:1040px"><div class="q">"Iedereen die het speelde, was direct mee in het verhaal."<small>Tom De Sutter · Arenal België</small></div></div>
`));

// 4 LES 2
S.push(page(4, `
<div class="bg" style="background-image:${i64(OUT + '/tom-2.jpg')};background-size:100% auto;background-repeat:no-repeat;background-position:center 420px"></div>
<div class="dim" style="background:linear-gradient(180deg,#0d1b3e 0%,rgba(13,27,62,.9) 40%,rgba(13,27,62,.35) 70%,rgba(13,27,62,.6) 100%)"></div>
<div class="num">2</div>
<div class="col" style="top:110px">
<span class="tag">LES 2/5</span>
<h2>Beleving wint<br>van <span class="c">prijs</span></h2>
<div class="q">"Als je kwaliteit en beleving aanbiedt in je club, gaan mensen dat met veel plezier blijven doen. Ook al betalen ze een euro meer."<small>Tom De Sutter · Arenal België</small></div>
</div>`));

// 5 LES 3
S.push(page(5, `
<div class="bg" style="background-image:${i64(OUT + '/jeugd.jpg')};background-size:100% auto;background-repeat:no-repeat;background-position:center 330px"></div>
<div class="dim" style="background:linear-gradient(180deg,#0d1b3e 0%,#0d1b3e 52%,rgba(13,27,62,.75) 62%,rgba(13,27,62,.1) 78%,rgba(13,27,62,.5) 100%)"></div>
<div class="num">3</div>
<div class="col" style="top:110px">
<span class="tag">LES 3/5</span>
<h2>Bouw aan<br>je <span class="c">jeugd</span></h2>
<p class="t">Ouders kozen vroeger een tenniskamp. Nu schrijven ze hun kind ook in voor <b>padelkampen</b>.</p>
<div class="q">"De jonge sport begint volwassener te worden. Dat is het mooie eraan."<small>Tom De Sutter · Arenal België</small></div>
<div style="align-self:flex-start;background:rgba(0,212,255,.15);border:2px solid #00d4ff;border-radius:14px;padding:16px 22px;font:600 30px/1.3 In">🎾 Ook Tennis en Padel Vlaanderen zet sterk in op de jeugd.</div>
</div>`));

// 6 LES 4
S.push(page(6, `
<div class="bg" style="background-image:${i64(B + '/padel-vol-terras.jpg')};background-position:center 45%"></div>
<div class="dim" style="background:linear-gradient(180deg,#0d1b3e 0%,rgba(13,27,62,.88) 40%,rgba(13,27,62,.25) 68%,rgba(13,27,62,.6) 100%)"></div>
<div class="num">4</div>
<div class="col" style="top:110px">
<span class="tag">LES 4/5</span>
<h2>Padel is<br><span class="c">sociaal</span></h2>
<p class="t">Je speelt altijd met vier. Achteraf drink je <b>samen iets</b>. Zo wordt een match een vriendengroep die elke week terugkomt.</p>
</div>`));

// 7 LES 5 + DIT DOEN WIJ
S.push(page(7, `
<div class="bg" style="background-image:${i64(B + '/padel-lachen-aan-net.jpg')};background-position:center 30%"></div>
<div class="dim" style="background:linear-gradient(180deg,#0d1b3e 0%,rgba(13,27,62,.9) 55%,rgba(13,27,62,.5) 85%,rgba(13,27,62,.7) 100%)"></div>
<div class="num">5</div>
<div class="col" style="top:120px;gap:30px">
<span class="tag">LES 5/5</span>
<h2>Laat het<br><span class="c">zien</span></h2>
<p class="t">Beleving die niemand ziet, trekt niemand aan.</p>
<div style="margin-top:40px;font:700 52px/1.05 Rj;text-transform:uppercase">Dit doen <span class="c">wij</span> voor jullie club</div>
<div style="display:flex;flex-direction:column;gap:20px;font:600 38px/1.28 In">
<div>🎬 Reels van jullie kampen, trainingen en matchen</div>
<div>📸 Stories van het terras en de sfeer na de match</div>
<div>📅 Elke week online, in jullie stijl</div>
</div>
</div>`));

// 8 DM
S.push(page(8, `
<div style="position:absolute;inset:0;background:#00d4ff"></div>
<div class="col" style="top:150px;gap:34px;color:#0d1b3e">
<h2 style="font-size:104px">Hoeveel van<br>de 5 doet jullie<br>club al?</h2>
<div style="font:600 38px/1.35 In">1 · Laat ze eerst spelen<br>2 · Beleving wint van prijs<br>3 · Bouw aan je jeugd<br>4 · Padel is sociaal<br>5 · Laat het zien</div>
<div style="background:#0d1b3e;color:#fff;border-radius:26px;padding:36px 40px;display:flex;flex-direction:column;gap:12px">
<span style="font:700 78px/1 Rj">STUUR <span class="c">EEN DM</span></span>
<span style="font:500 34px/1.3 In;color:#c9d4ee">en wij bekijken gratis de Instagram van jullie club</span></div>
<div style="font:600 26px/1.3 In;opacity:.8">Bedankt Tom De Sutter en Sports NEXT voor het panel</div>
</div>`).replace('class="logo"', 'class="logo" style="color:#0d1b3e"'));

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${S.join('')}</body></html>`;
fs.writeFileSync('/tmp/claude-0/hype.html', html);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.goto('file:///tmp/claude-0/hype.html');
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600);
  for (let i = 1; i <= 8; i++) await p.locator('#s' + i).screenshot({ path: `${OUT}/slide0${i}.png` });
  await b.close();
})();
