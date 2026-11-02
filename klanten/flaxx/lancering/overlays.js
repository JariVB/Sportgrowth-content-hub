const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const T = [
 ['o1', 'Net gelanceerd op', 'Sports NEXT'],
 ['o4', 'ERGO', 'POWER'],
 ['o5', 'ERGO', 'CONTROL'],
 ['o6', 'BIOFIBIX® Hypermat', 'Flax Fiber'],
 ['o7', 'Innovatie', 'uit België'],
 ['o8', 'Meld je aan', 'via de link in bio'],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [id, a, c] of T) {
    await p.setContent(`<style>@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
    body{margin:0;width:1080px;height:1920px;background:transparent;font-family:In}
    .w{position:absolute;left:0;right:0;top:1380px;display:flex;justify-content:center}
    .b{background:rgba(18,52,44,.9);border-radius:22px;padding:26px 44px;text-align:center;color:#fff}
    .a{font:500 44px/1.15 In;letter-spacing:.04em;color:#e9d2c4}
    .c{font:800 76px/1.05 In;letter-spacing:-.01em}</style>
    <div class="w"><div class="b"><div class="a">${a}</div><div class="c">${c}</div></div></div>`);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: id + '.png', omitBackground: true });
  }
  await b.close();
})();
