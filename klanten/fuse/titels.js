// titels voor het Fuse-filmpje (Inter, licht en ruim gespatieerd: rustige pilates-look)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'); const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const css = `@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
body{margin:0;width:1080px;height:1920px;background:transparent;font-family:In;color:#fff}
.c{position:absolute;left:60px;right:60px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:18px}
.k{font:500 26px/1 In;letter-spacing:.42em;text-transform:uppercase;margin-right:-.42em;text-shadow:0 2px 18px rgba(0,0,0,.6)}
.h{font:300 92px/1.02 In;letter-spacing:-.02em;text-shadow:0 4px 40px rgba(0,0,0,.5)}
.s{font:400 38px/1.3 In;letter-spacing:.02em;text-shadow:0 2px 22px rgba(0,0,0,.65)}
.line{width:60px;height:2px;background:#f3e6da}
.g{position:absolute;left:0;right:0;bottom:0;height:820px;background:linear-gradient(180deg,rgba(40,25,15,0),rgba(40,25,15,.55) 55%,rgba(40,25,15,.75))}
.gt{position:absolute;left:0;right:0;top:0;height:520px;background:linear-gradient(0deg,rgba(40,25,15,0),rgba(40,25,15,.55))}`;
const T = {
 f1: `<div class="gt"></div><div class="c" style="top:220px"><div class="k">Sports NEXT · Mechelen</div><div class="line"></div></div>`,
 f2: `<div class="g"></div><div class="c" style="top:1360px"><div class="h">Come move<br>with us</div></div>`,
 f3: `<div class="g"></div><div class="c" style="top:1400px"><div class="k">Reformer Pilates</div><div class="s">&amp; strength training</div></div>`,
 f4: `<div class="g"></div><div class="c" style="top:1430px"><div class="s">Live demo's op de beurs</div></div>`,
 f5: `<div class="gt"></div><div class="c" style="top:300px"><div class="h" style="font-size:64px">@fusepilatesstudio</div><div class="line"></div><div class="k" style="font-size:20px;opacity:.8">Beelden · SportGrowth Media</div></div>`,
};
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
 for (const [id, h] of Object.entries(T)) { await p.setContent(`<style>${css}</style>${h}`); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: `${OUT}/${id}.png`, omitBackground: true }); }
 await b.close(); })();
