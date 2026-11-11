const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const logo = 'data:image/png;base64,' + fs.readFileSync(__dirname + '/flaxx-logo-uit-foto.png').toString('base64');
const css = `@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
body{margin:0;width:1080px;height:1920px;background:transparent;font-family:In;color:#fff}
.c{position:absolute;left:0;right:0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:22px}
.h{font:700 112px/1 In;letter-spacing:-.035em;text-shadow:0 4px 40px rgba(0,0,0,.45)}
.m{font:800 132px/.92 In;letter-spacing:-.04em;text-shadow:0 4px 40px rgba(0,0,0,.5)}
.k{font:500 30px/1 In;letter-spacing:.42em;text-transform:uppercase;color:rgba(255,255,255,.85);text-shadow:0 2px 20px rgba(0,0,0,.6);margin-right:-.42em}
.s{font:400 38px/1.2 In;letter-spacing:.02em;color:rgba(255,255,255,.9);text-shadow:0 2px 20px rgba(0,0,0,.6)}
.line{width:64px;height:3px;background:#e9d2c4}`;
const O = {
 t1: `<div class="c" style="top:860px"><div class="h">Uit vlas.</div></div>`,
 t2: `<div class="c" style="top:860px"><div class="h">Gemaakt<br>in België.</div></div>`,
 t3: `<div class="c" style="top:1360px"><div class="k">Flaxx</div><div class="m">ERGO<br>CONTROL</div><div class="line"></div><div class="s">340–345 g · centrale sweetspot</div></div>`,
 t4: `<div class="c" style="top:1360px"><div class="k">Flaxx</div><div class="m">ERGO<br>POWER</div><div class="line"></div><div class="s">355–360 g · hogere sweetspot</div></div>`,
 t5: `<div class="c" style="top:1460px"><div class="k">NSR</div><div class="s" style="font-size:46px;font-weight:600">Natural Strain Reduction</div></div>`,
 t6: `<div class="c" style="top:1500px"><div class="k">Gelanceerd op</div><div class="s" style="font-size:56px;font-weight:700;letter-spacing:-.01em">Sports NEXT</div></div>`,
 e1: `<div class="c" style="top:820px"><img src="${logo}" style="width:620px"></div>`,
 e2: `<div class="c" style="top:1030px"><div class="s" style="font-size:44px;font-weight:500">Naturally FLAXX.</div></div>`,
 e3: `<div class="c" style="top:1560px"><div class="line"></div><div class="k" style="font-size:26px">De ERGO-lijn</div><div class="s" style="font-size:36px">Schrijf je in op flaxx.be</div></div>`,
};
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [id, html] of Object.entries(O)) {
    await p.setContent(`<style>${css}</style>${html}`);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(100);
    await p.screenshot({ path: `/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/lv/${id}.png`, omitBackground: true });
  }
  await b.close();
})();
