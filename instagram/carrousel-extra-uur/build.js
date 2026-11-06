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
<div class="bg" style="background-image:${i64(B2 + '/jari-tennis-lacht.jpg')};background-size:1700px auto;background-position:-40px -560px"></div>
<div class="dim" style="background:linear-gradient(180deg,rgba(13,27,62,.15) 0%,rgba(13,27,62,.1) 30%,rgba(13,27,62,.9) 56%,#0d1b3e 100%)"></div>
<div class="swipe">Swipe →</div>
<div class="col" style="top:560px;gap:20px">
<span class="tag">ZO WERKT SGM · VERHUUR</span>
<div style="font:700 220px/.85 Rj;color:#00d4ff;letter-spacing:-4px">€2.496</div>
<h1 style="font-size:78px;line-height:.98">Zoveel levert één<br>extra boeking<br>per week je op</h1>
</div>`));
// 2 HERKENNING · leeg terrein, foto vol beeld
S.push(page(2, `
<div class="bg" style="background-image:${i64(B2 + '/padel-net-overdekte-hal.jpg')};background-position:center 60%"></div>
<div class="dim" style="background:linear-gradient(180deg,rgba(13,27,62,.85) 0%,rgba(13,27,62,.2) 38%,rgba(13,27,62,.2) 60%,rgba(13,27,62,.92) 85%)"></div>
<div class="col" style="top:110px;gap:18px">
<div style="font:700 44px/1 In;color:#00d4ff;letter-spacing:.04em">DINSDAG · 15:00</div>
<h2 style="font-size:118px">Terrein 3<br>is leeg.</h2>
</div>
<div style="position:absolute;left:50%;top:640px;transform:translate(-50%,-50%) rotate(-12deg);border:10px solid #ff4d4d;color:#ff4d4d;font:700 150px/1 Rj;padding:6px 40px 0;border-radius:18px;letter-spacing:6px;background:rgba(13,27,62,.35)">LEEG</div>
<div class="col" style="bottom:140px;gap:0">
<p class="t" style="font-size:44px"><b>Het kost je niets.<br>Het levert je ook niets op.</b></p>
</div>`));
// 3 REKENSOM als kassaticket
S.push(page(3, `
<div class="col" style="top:80px;gap:10px"><h2 style="font-size:80px">De rekensom</h2></div>
<div style="position:absolute;left:150px;right:150px;top:230px;background:#f7f4ec;color:#1b1b1b;padding:46px 54px 60px;font:600 38px/1.5 'Courier New',monospace;transform:rotate(-2deg);box-shadow:0 30px 60px rgba(0,0,0,.45);clip-path:polygon(0 0,100% 0,100% 96%,95% 100%,90% 96%,85% 100%,80% 96%,75% 100%,70% 96%,65% 100%,60% 96%,55% 100%,50% 96%,45% 100%,40% 96%,35% 100%,30% 96%,25% 100%,20% 96%,15% 100%,10% 96%,5% 100%,0 96%)">
<div style="text-align:center;font-weight:800;font-size:40px">JOUW CLUB</div>
<div style="text-align:center;font-size:28px;opacity:.6;margin-bottom:22px">*** 1 extra boeking per week ***</div>
<div style="display:flex;justify-content:space-between"><span>Terrein 3 · 1u30</span><span>€48</span></div>
<div style="display:flex;justify-content:space-between;font-size:28px;opacity:.6"><span>4 spelers × €12</span><span></span></div>
<div style="display:flex;justify-content:space-between"><span>× 52 weken</span><span></span></div>
<div style="border-top:4px dashed #1b1b1b;margin:26px 0 18px"></div>
<div style="display:flex;justify-content:space-between;font-weight:800;font-size:54px"><span>TOTAAL</span><span>€2.496</span></div>
<div style="text-align:center;font-size:28px;opacity:.6;margin-top:22px">per terrein, per jaar</div>
</div>`));
// 4 VIER TERREINEN · terreinen die oplichten
const court = (n) => `<div style="background:linear-gradient(180deg,#1d5fd1,#0e3c8f);border:4px solid #fff;border-radius:14px;height:300px;position:relative;display:flex;align-items:center;justify-content:center">
<div style="position:absolute;left:0;right:0;top:50%;border-top:4px dashed rgba(255,255,255,.8)"></div>
<div style="position:absolute;left:50%;top:12%;bottom:12%;border-left:3px solid rgba(255,255,255,.5)"></div>
<div style="position:relative;background:#00d4ff;color:#0d1b3e;font:700 52px/1 Rj;padding:12px 18px;border-radius:12px">+€2.496</div>
<div style="position:absolute;left:14px;top:12px;font:700 26px/1 In">T${n}</div></div>`;
S.push(page(4, `
<div class="col" style="top:80px;gap:14px"><h2 style="font-size:84px">4 terreinen?</h2><p class="t" style="font-size:38px">Elk terrein <b>1 boeking per week</b> extra</p></div>
<div style="position:absolute;left:70px;right:70px;top:340px;display:grid;grid-template-columns:1fr 1fr;gap:26px">${[1,2,3,4].map(court).join('')}</div>
<div style="position:absolute;left:70px;right:70px;top:1020px;display:flex;align-items:baseline;gap:22px">
<span style="font:700 150px/.9 Rj;color:#00d4ff">€9.984</span><span style="font:600 38px/1.2 In">per jaar.<br>Zonder te bouwen.</span></div>`));
// 5 LESSEN · foto + chips
S.push(page(5, `
<div class="bg" style="background-image:${i64(B2 + '/padel-lachen-aan-net.jpg')};background-position:center 30%"></div>
<div class="dim" style="background:linear-gradient(180deg,rgba(13,27,62,.1) 0%,rgba(13,27,62,.15) 35%,rgba(13,27,62,.92) 58%,#0d1b3e 100%)"></div>
<div class="col" style="top:720px;gap:24px">
<h2 style="font-size:88px">Geef je <span class="c">lessen?</span></h2>
<div style="display:flex;gap:16px;flex-wrap:wrap">
${['👥 5 leerlingen extra','💶 €15 per les','📅 30 lessen'].map(x=>`<span style="background:rgba(255,255,255,.12);border:2px solid rgba(255,255,255,.35);border-radius:40px;padding:14px 24px;font:600 34px/1 In">${x}</span>`).join('')}
</div>
<div style="font:700 130px/.9 Rj">= <span class="c">€2.250</span></div>
</div>`));
// 6 WAAR KOMEN ZE VANDAAN · gsm met story
S.push(page(6, `
<div class="col" style="top:80px;gap:10px"><h2 style="font-size:78px">Zo vullen we<br>dat <span class="c">lege terrein</span></h2></div>
<div style="position:absolute;left:300px;top:330px;width:480px;height:930px;border-radius:64px;background:#000;padding:16px;box-shadow:0 40px 80px rgba(0,0,0,.5)">
<div style="width:100%;height:100%;border-radius:50px;overflow:hidden;position:relative;background-image:${i64(B2 + '/padel-net-overdekte-hal.jpg')};background-size:cover;background-position:center">
<div style="position:absolute;left:18px;right:18px;top:18px;display:flex;gap:6px">${[1,2,3].map(i=>`<b style="flex:1;height:5px;border-radius:3px;background:${i==1?'#fff':'rgba(255,255,255,.4)'}"></b>`).join('')}</div>
<div style="position:absolute;left:30px;right:30px;top:330px;background:#fff;color:#0d1b3e;border-radius:22px;padding:22px 24px;text-align:center;font:800 40px/1.15 In;transform:rotate(-3deg)">Donderdag 20u<br>nog 1 terrein vrij 🎾</div>
<div style="position:absolute;left:70px;right:70px;bottom:120px;background:#fff;color:#0e8cff;border-radius:16px;padding:16px;text-align:center;font:700 32px/1 In">🔗 Boek hier</div>
</div></div>
<div style="position:absolute;left:60px;top:560px;width:220px;font:700 30px/1.3 In;color:#00d4ff">1 · Reel van<br>een vol terrein</div>
<div style="position:absolute;right:50px;top:700px;width:230px;font:700 30px/1.3 In;color:#00d4ff;text-align:right">2 · Story:<br>"nog vrij"</div>
<div style="position:absolute;left:60px;top:1020px;width:220px;font:700 30px/1.3 In;color:#00d4ff">3 · Eén tik<br>en geboekt</div>`));
// 7 SGM
S.push(page(7, `
<div class="bg" style="background-image:${i64(B2 + '/padel-vol-terras.jpg')};background-position:center 40%"></div>
<div class="dim" style="background:linear-gradient(180deg,rgba(13,27,62,.15) 0%,rgba(13,27,62,.2) 30%,rgba(13,27,62,.93) 55%,#0d1b3e 100%)"></div>
<div class="col" style="top:640px;gap:26px">
<h2 style="font-size:84px">Dat doen <span class="c">wij</span><br>voor jullie</h2>
<div style="display:flex;flex-direction:column;gap:14px;font:600 36px/1.3 In"><div>🎬 Filmen, monteren, posten</div><div>📈 Elke maand: wat leverde het op?</div></div>
<div style="display:flex;align-items:center;gap:22px;background:#00d4ff;color:#0d1b3e;border-radius:22px;padding:24px 30px">
<span style="font:700 70px/1 Rj">€249</span><span style="font:600 32px/1.25 In">per maand. Dat is<br><b>±1 extra boeking</b> per week.</span></div>
</div>`));
// 8 DM
S.push(page(8, `
<div style="position:absolute;inset:0;background:#00d4ff"></div>
<div class="col" style="top:150px;gap:40px;color:#0d1b3e">
<div style="font:700 220px/.8 Rj">?</div>
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
