// Split-carrousel "Tijdsprobleem" · 8 slides 1080x1350, per slide 2 beelden (boven/onder) met de zin die doorloopt
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const R = '/home/user/Sportgrowth-content-hub', F = R + '/website/site/fonts';
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const img = id => 'data:image/jpeg;base64,' + fs.readFileSync(__dirname + '/beelden/' + id + '.jpg').toString('base64');
const logo = 'data:image/png;base64,' + fs.readFileSync(R + '/instagram/beeldbank/logo-sgm-1080.png').toString('base64');
const S = [
 ['De meeste clubs hebben geen Instagram‑probleem.', 'Ze hebben een <c>tijdsprobleem</c>.'],
 ['Iedereen weet dat een filmpje beter werkt', 'dan een affiche.'],
 ['Maar de vrijwilliger die het moet doen', 'werkt al <c>40 uur</c> per week.'],
 ['Dus wordt het om <c>23u</c>', 'nog snel een affiche in Canva.'],
 ['En dan zegt het bestuur:', '“Instagram werkt niet voor ons.”'],
 ['Instagram werkt wel.', 'Er is gewoon <c>niemand</c> die er tijd voor heeft.'],
 ['Dat is precies wat <c>wij</c> overnemen.', 'Wij filmen, maken en posten.'],
 ['Jullie doen wat je goed kan:', 'een club runnen.<span class="sub">Reageer ANALYSE voor een gratis check 👇</span>']
];
const css = `@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
*{box-sizing:border-box}body{margin:0;background:#000}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;background:#000}
.h{position:absolute;left:0;width:1080px;height:675px;background-size:cover;background-position:center}
.h.t{top:0}.h.b{top:675px}
.h:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(0,0,0,.18) 70%,rgba(0,0,0,.42) 100%)}
.cap{position:absolute;left:70px;right:70px;bottom:44px;text-align:center;font:650 48px/1.14 In;letter-spacing:-.5px;color:#fff;z-index:2;
 text-shadow:0 2px 10px rgba(0,0,0,.55),0 1px 2px rgba(0,0,0,.6);text-wrap:balance}
.cap c{color:#fff}
.sub{display:block;margin-top:14px;font:600 34px/1.2 In;color:rgba(255,255,255,.9)}`;
const html = `<html><head><style>${css}</style></head><body>` + S.map(([a, b], i) => {
  const n = i + 1;
  return `<div class="s" id="s${n}">
  <div class="h t" style="background-image:url(${img(n+'a')})"><div class="cap">${a}</div></div>
  
  <div class="h b" style="background-image:url(${img(n+'b')})"><div class="cap">${b}</div></div>
  </div>`;
}).join('') + '</body></html>';
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.setContent(html); await p.evaluate(() => document.fonts.ready);
  for (let i = 1; i <= 8; i++) await p.locator('#s' + i).screenshot({ path: `${__dirname}/slide0${i}.png` });
  await b.close(); })();
