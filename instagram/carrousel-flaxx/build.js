const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const R = '/home/user/Sportgrowth-content-hub', F = R + '/website/site/fonts', B = R + '/instagram/beeldbank';
const OUT = __dirname; const H = __dirname;
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
const img = f => i64(H + '/' + f);
// 1 COVER
S.push(page(1, `
<div class="bg" style="background-image:${img('koen-jari-stand-2.jpg')};background-size:auto 1350px;background-position:48% 0"></div>
<div class="dim" style="background:linear-gradient(180deg,rgba(13,27,62,.05) 0%,rgba(13,27,62,.05) 35%,rgba(13,27,62,.92) 62%,#0d1b3e 100%)"></div>
<div class="swipe">Swipe →</div>
<div class="col" style="top:800px;gap:18px">
<span class="tag">RESULTAAT · COLLAB</span>
<h1 style="font-size:96px;line-height:.95">Eén reel samen<br>met een merk.<br><span class="c">Dit leverde het op.</span></h1>
</div>`));
// 2 HET VERHAAL
S.push(page(2, `
<div class="bg" style="background-image:${img('reel-still.jpg')};background-size:1080px auto;background-position:center 0"></div>
<div class="dim" style="background:linear-gradient(180deg,rgba(13,27,62,.0) 0%,rgba(13,27,62,.15) 34%,rgba(13,27,62,.95) 56%,#0d1b3e 100%)"></div>
<div class="col" style="top:740px;gap:24px">
<span class="tag">HET IDEE</span>
<p class="t"><b>FLAXX</b> maakt padelrackets uit vlas, in België. Op Sports NEXT lanceerden ze hun nieuwe ERGO-lijn.</p>
<p class="t">Wij filmden de lancering en maakten <b>samen één reel</b>: het verhaal van de oprichter, het vlas en het racket.</p>
</div>`));
// 3 CIJFER 1
S.push(page(3, `
<div class="num">1</div>
<div class="col" style="top:280px;gap:30px">
<span class="tag">BEREIK</span>
<div style="font:700 330px/.85 Rj;color:#00d4ff;letter-spacing:-6px">2x</div>
<h2 style="font-size:84px">zoveel bereik</h2>
<p class="t">als een gewone reel op ons account. <b>1.307 weergaven</b>, en het blijft groeien.</p>
<p class="t" style="font-size:34px">❤️ 67 likes · 💬 8 reacties · 🔖 5x bewaard. Allemaal <b>boven ons gemiddelde</b>.</p>
</div>`));
// 4 CIJFER 2
S.push(page(4, `
<div class="num">2</div>
<div class="col" style="top:300px;gap:30px">
<span class="tag">NIEUW PUBLIEK</span>
<div style="font:700 300px/.85 Rj;color:#00d4ff;letter-spacing:-6px">85%</div>
<h2 style="font-size:84px">nieuwe mensen</h2>
<p class="t">Bijna iedereen die keek, <b>kende ons of FLAXX nog niet</b>. De helft is tussen 35 en 54: de mensen die beslissen.</p>
</div>`));
// 5 VOOR FLAXX
S.push(page(5, `
<div class="bg" style="background-image:${img('koen-in-gesprek-bezoeker.jpg')};background-size:1080px auto;background-position:center 20%"></div>
<div class="dim" style="background:linear-gradient(180deg,rgba(13,27,62,.1) 0%,rgba(13,27,62,.2) 35%,rgba(13,27,62,.95) 60%,#0d1b3e 100%)"></div>
<div class="col" style="top:690px;gap:22px">
<span class="tag">VOOR FLAXX · NA 3 DAGEN</span>
<div style="font:700 170px/.85 Rj;color:#00d4ff">+12</div>
<h2 style="font-size:70px">volgers en meer vragen<br>via Instagram</h2>
<p class="t" style="font-size:30px">Volgens oprichter Koen, 3 dagen na de post.</p>
<p class="t">Ook over sponsoring. Het merk <b>"krijgt meer body"</b>.</p>
</div>`));
// 6 WAAROM HET WERKTE
S.push(page(6, `
<div class="col" style="top:170px;gap:34px">
<span class="tag">WAAROM HET WERKTE</span>
<h2>3 dingen</h2>
<p class="t"><b class="c">1.</b> <b>Twee publieken.</b> Samen posten bereikt de volgers van allebei.</p>
<p class="t"><b class="c">2.</b> <b>Een verhaal, geen reclame.</b> Waarom bestaat dit racket? Wie zit erachter?</p>
<p class="t"><b class="c">3.</b> <b>Echte beelden.</b> De beurs, de oprichter, het vlas. Geen stockfoto's.</p>
</div>`));
// 7 QUOTE
S.push(page(7, `
<div class="bg" style="background-image:${img('koen-jari-rackets-2-beste.jpg')};background-size:1080px auto;background-position:center 18%;opacity:.35"></div>
<div class="col" style="top:330px;gap:40px">
<span class="tag">KOEN, OPRICHTER FLAXX</span>
<div class="q">"Alles was heel goed georganiseerd, de voorbereiding verliep vlot en ook de communicatie was top. Je voelt dat je er met veel enthousiasme en professionaliteit tegen aan gaat."<small>@flaxx_rackets</small></div>
</div>`));
// 8 CTA
S.push(page(8, `
<div class="col" style="top:250px;gap:34px">
<span class="tag">EN JULLIE CLUB?</span>
<h2>Een sponsor,<br>een partner,<br><span class="c">een buurclub.</span></h2>
<p class="t">Eén reel samen bereikt <b>twee keer zoveel mensen</b>. Wij maken hem, van het filmen tot het inplannen.</p>
<div style="margin-top:20px;align-self:flex-start;background:#00d4ff;color:#0d1b3e;font:800 40px/1 In;padding:26px 34px;border-radius:16px">Stuur ons een DM 📩</div>
<p class="t" style="font-size:32px">voor een gratis analyse van jullie Instagram</p>
</div>`));
const html = `<html><head><style>${css}</style></head><body>${S.join('')}</body></html>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.setContent(html); await p.evaluate(() => document.fonts.ready);
  for (let i = 1; i <= 8; i++) await p.locator('#s' + i).screenshot({ path: `${OUT}/slide0${i}.png` });
  await b.close();
})();
