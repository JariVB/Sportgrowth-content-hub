// statische titel-PNG's voor de varianten (animatie gebeurt in ffmpeg)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'); const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const css = `@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
body{margin:0;width:1080px;height:1920px;background:transparent;font-family:In;color:#fff}
.c{position:absolute;left:60px;right:60px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:20px}
.k{font:600 28px/1 In;letter-spacing:.5em;text-transform:uppercase;color:#e9d2c4;margin-right:-.5em;text-shadow:0 2px 20px rgba(0,0,0,.7)}
.q{font:700 84px/1.04 In;letter-spacing:-.035em;text-shadow:0 6px 44px rgba(0,0,0,.6)}
.h{font:800 120px/.95 In;letter-spacing:-.045em;text-shadow:0 6px 50px rgba(0,0,0,.55)}
.s{font:500 40px/1.25 In;color:rgba(255,255,255,.92);text-shadow:0 2px 24px rgba(0,0,0,.75)}
.lt{position:absolute;right:70px;display:flex;gap:22px;text-align:right}
.lt b{display:block;font:700 54px/1.1 In;letter-spacing:-.02em;text-shadow:0 2px 24px rgba(0,0,0,.6)} .lt i{font:500 32px/1.3 In;color:#e9d2c4;font-style:normal}
.bar{width:6px;background:#e9d2c4}
.grad{position:absolute;left:0;right:0;bottom:0;height:900px;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.6) 50%,rgba(0,0,0,.85))}`;
const T = {
 // B · oprichter
 b_tag: `<div class="c" style="top:150px"><div class="k">Panel · Sports NEXT</div></div>`,
 b_q1: `<div class="grad"></div><div class="c" style="top:1240px"><div class="q">We zijn uniek met<br>onze rackets</div></div>`,
 b_q2: `<div class="grad"></div><div class="c" style="top:1240px"><div class="q">Nergens ter wereld<br>geproduceerd in vlas</div></div>`,
 b_q3: `<div class="grad"></div><div class="c" style="top:1240px"><div class="q">We willen die<br>pioniersrol blijven<br>opnemen</div></div>`,
 b_lt: `<div class="lt" style="top:1660px"><div><b>Koen Hubert</b><i>Oprichter Flaxx</i></div><div class="bar"></div></div>`,
 // C · beurs
 c_1: `<div class="c" style="top:820px"><div class="k">Zondag 1 november</div><div class="h">Sports NEXT</div><div class="s">Mechelen</div></div>`,
 c_2: `<div class="grad"></div><div class="c" style="top:1380px"><div class="q">De ERGO-lijn<br>maakt zijn debuut</div></div>`,
 c_3: `<div class="grad"></div><div class="c" style="top:1420px"><div class="q">Uitleg aan<br>de stand</div></div>`,
 c_4: `<div class="grad"></div><div class="c" style="top:1420px"><div class="q">Voelen is geloven</div></div>`,
 c_5: `<div class="grad"></div><div class="c" style="top:1420px"><div class="q">Testen op de beurs</div></div>`,
 c_6: `<div class="c" style="top:1450px"><div class="k">Panel</div><div class="q" style="font-size:72px">Padel · From Hype<br>to Habit</div></div>`,
 c_7: `<div class="grad"></div><div class="c" style="top:1300px"><div class="k">Flaxx over zondag</div><div class="q">“Heel wat positieve<br>reacties”</div></div>`,
 // D · hook
 d_1: `<div class="c" style="top:1450px"><div class="k">Flaxx · ERGO</div><div class="h" style="font-size:110px">Net gelanceerd</div></div>`,
};
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
 for (const [id, h] of Object.entries(T)) { await p.setContent(`<style>${css}</style>${h}`); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: `${OUT}/${id}.png`, omitBackground: true }); }
 await b.close(); })();
