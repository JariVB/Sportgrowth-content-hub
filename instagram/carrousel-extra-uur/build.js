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
const B2 = B;
// 1 COVER
S.push(page(1, `
<div class="bg" style="background-image:${i64(B2 + '/padel-net-overdekte-hal.jpg')};background-position:center 40%"></div>
<div class="dim" style="background:linear-gradient(180deg,rgba(13,27,62,.35) 0%,rgba(13,27,62,.25) 28%,rgba(13,27,62,.9) 55%,#0d1b3e 100%)"></div>
<div class="swipe">Swipe →</div>
<div class="col" style="top:470px;gap:24px">
<span class="tag">ZO WERKT SGM · VERHUUR</span>
<div style="font:700 250px/.85 Rj;color:#00d4ff;letter-spacing:-4px">€2.080</div>
<h1 style="font-size:84px;line-height:.98">Zoveel levert één<br>extra geboekt uur<br>per week je op</h1>
</div>`));
// 2 HERKENNING
S.push(page(2, `
<div class="col" style="top:170px;gap:44px">
<h2>Dinsdag 15u.<br><span class="c">Terrein 3</span> is leeg.</h2>
<p class="t">Een leeg terrein kost je niet veel. <b>Maar het levert je ook niets op.</b></p>
<p class="t">En zo staan er elke week uren leeg die niemand ziet.</p>
</div>`));
// 3 REKENSOM
S.push(page(3, `
<div class="num">1</div>
<div class="col" style="top:150px;gap:36px">
<h2>De rekensom</h2>
<div style="display:flex;flex-direction:column;gap:22px;font:600 46px/1.25 In">
<div>🎾 1 terrein · €40 per uur <span style="color:#8fa3cc;font-size:32px">(4 spelers × €10)</span></div>
<div>➕ 1 extra uur per week</div>
<div>📅 × 52 weken</div>
</div>
<div style="border-top:4px solid #00d4ff;padding-top:30px;font:700 120px/1 Rj">= <span class="c">€2.080</span> <span style="font-size:60px">per jaar</span></div>
</div>`));
// 4 MEER TERREINEN
S.push(page(4, `
<div class="num">4</div>
<div class="col" style="top:170px;gap:40px">
<h2>Heb je 4 terreinen?</h2>
<p class="t">Elk terrein <b>1 extra uur per week</b> geboekt:</p>
<div style="font:700 190px/.9 Rj;color:#00d4ff">€8.320</div>
<p class="t">per jaar. Zonder één extra terrein te bouwen.</p>
</div>`));
// 5 LESSEN
S.push(page(5, `
<div class="col" style="top:170px;gap:40px">
<h2>Geef je <span class="c">lessen?</span></h2>
<p class="t">Hetzelfde geldt voor een lesreeks, een kamp of een abonnement.</p>
<div style="display:flex;flex-direction:column;gap:20px;font:600 44px/1.3 In">
<div>👥 5 extra leerlingen</div>
<div>💶 €15 per les</div>
<div>📅 30 lessen per jaar</div>
</div>
<div style="border-top:4px solid #00d4ff;padding-top:30px;font:700 120px/1 Rj">= <span class="c">€2.250</span></div>
</div>`));
// 6 WAAR KOMEN ZE VANDAAN
S.push(page(6, `
<div class="col" style="top:150px;gap:36px">
<h2>Waar komen<br>die uren <span class="c">vandaan?</span></h2>
<div style="display:flex;flex-direction:column;gap:24px;font:600 40px/1.3 In">
<div>📱 Mensen die je club nog niet kennen, zien een reel van een vol terrein</div>
<div>⏰ Je story zegt: "Donderdag 20u nog een terrein vrij"</div>
<div>👆 Eén tik naar je boekingslink</div>
</div>
<p class="t"><b>Wie je niet ziet, boekt niet.</b></p>
</div>`));
// 7 SGM
S.push(page(7, `
<div class="col" style="top:170px;gap:40px">
<h2>Dit doen <span class="c">wij</span><br>voor jullie</h2>
<div style="display:flex;flex-direction:column;gap:22px;font:600 40px/1.3 In">
<div>🎬 Filmen, monteren en posten</div>
<div>📅 Elke week online, in jullie stijl</div>
<div>📈 Elke maand: wat leverde het op?</div>
</div>
<div style="background:rgba(0,212,255,.12);border:3px solid #00d4ff;border-radius:22px;padding:30px 36px;font:600 40px/1.35 In">Vanaf <b style="color:#00d4ff">€249 per maand</b>.<br>Minder dan 2 geboekte uren per week.</div>
</div>`));
// 8 DM
S.push(page(8, `
<div style="position:absolute;inset:0;background:#00d4ff"></div>
<div class="col" style="top:170px;gap:40px;color:#0d1b3e">
<h2 style="font-size:100px">Hoeveel uren<br>staan er bij jou<br>elke week leeg?</h2>
<div style="background:#0d1b3e;color:#fff;border-radius:26px;padding:36px 40px;display:flex;flex-direction:column;gap:12px">
<span style="font:700 78px/1 Rj">STUUR <span class="c">EEN DM</span></span>
<span style="font:500 34px/1.3 In;color:#c9d4ee">en wij bekijken gratis de Instagram van jullie club</span></div>
</div>`).replace('class="logo"', 'class="logo" style="color:#0d1b3e"'));

const TMP = '/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/extra-uur.html';
const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${S.join('')}</body></html>`;
fs.writeFileSync(TMP, html);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.goto('file://' + TMP);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600);
  for (let i = 1; i <= 8; i++) await p.locator('#s' + i).screenshot({ path: `${OUT}/slide0${i}.png` });
  await b.close();
})();
