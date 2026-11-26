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
 ['Jullie doen wat je goed kan:', 'een club <c>runnen</c>.']
];
const css = `@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
*{box-sizing:border-box}body{margin:0;background:#000}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;background:#0d1b3e}
.h{position:absolute;left:0;width:1080px;height:675px;background-size:cover;background-position:center}
.h.t{top:0}.h.b{top:675px}
.line{position:absolute;left:0;right:0;top:672px;height:6px;background:#0d1b3e;z-index:2}
.cap{position:absolute;left:36px;width:500px;bottom:40px;text-align:left;font:800 46px/1.15 In;color:#fff;
 background:rgba(13,27,62,.82);padding:18px 24px 20px;border-radius:18px;border-left:6px solid #00d4ff;box-shadow:0 10px 30px rgba(0,0,0,.35)}
.cap c{color:#00d4ff}
.chip{position:absolute;right:36px;top:36px;font:800 28px In;color:#0d1b3e;background:#00d4ff;padding:12px 22px;border-radius:40px;z-index:3}
.cta{position:absolute;left:36px;top:40px;font:800 38px In;color:#0d1b3e;background:#00d4ff;padding:16px 30px;border-radius:44px;white-space:nowrap;box-shadow:0 10px 30px rgba(0,0,0,.45)}
.lg{position:absolute;right:30px;bottom:30px;width:70px;height:70px;border-radius:50%;z-index:3;box-shadow:0 0 0 3px rgba(255,255,255,.25)}
.pg{position:absolute;left:36px;top:36px;font:700 24px In;color:#fff;background:rgba(13,27,62,.75);padding:8px 16px;border-radius:30px;z-index:3}`;
const html = `<html><head><style>${css}</style></head><body>` + S.map(([a, b], i) => {
  const n = i + 1;
  return `<div class="s" id="s${n}">
  <div class="h t" style="background-image:url(${img(n+'a')})"><div class="cap">${a}</div></div>
  <div class="line"></div>
  <div class="h b" style="background-image:url(${img(n+'b')})"><div class="cap">${b}</div>${n===8?'<div class="cta">Reageer ANALYSE 👇</div>':''}</div>
  ${n===1?'<div class="chip">Swipe →</div>':`<div class="pg">${n}/8</div>`}
  <img class="lg" src="${logo}"></div>`;
}).join('') + '</body></html>';
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.setContent(html); await p.evaluate(() => document.fonts.ready);
  for (let i = 1; i <= 8; i++) await p.locator('#s' + i).screenshot({ path: `${__dirname}/slide0${i}.png` });
  await b.close(); })();
