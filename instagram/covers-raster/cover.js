// Raster-veilige covers voor studioreels: titel in de zone die zichtbaar blijft in het profielraster (3:4, y 240-1680).
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const img = p => 'data:image/png;base64,' + fs.readFileSync(p).toString('base64');
const C = [
 ['affiches', 'Mening', ['Sportclubs,', 'stop met'], 'affiches!', true],
 ['proefles', 'Clubtip · leden', ['Waarom komt hij'], 'nooit meer terug?', false],
 ['december', 'Clubtip · december', ['Welke 4 posts', 'vergeet je club'], 'in december?', false],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [n, tag, lines, cy, topfade] of C) {
    const html = `<style>@font-face{font-family:R;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:I;src:url(${f64(F+'/inter-var.woff2')})}
    body{margin:0}#c{position:relative;width:1080px;height:1920px;overflow:hidden;background:url(${img('bg-'+n+'.png')}) center/cover}
    .tf{position:absolute;left:0;right:0;top:0;height:470px;background:linear-gradient(#0c1118 0,#0c1118 70%,rgba(12,17,24,0))}
    .bf{position:absolute;left:0;right:0;top:1100px;bottom:0;background:linear-gradient(rgba(10,18,38,0),rgba(10,18,38,.88) 32%,rgba(10,18,38,.95))}
    .t{position:absolute;left:56px;right:56px;bottom:290px}
    .tag{display:inline-block;font:700 30px I;letter-spacing:3px;text-transform:uppercase;background:#00d4ff;color:#0a1226;padding:8px 18px;border-radius:10px;margin-bottom:18px}
    h1{margin:0;font:700 118px/0.95 R;text-transform:uppercase;color:#fff}h1 span{color:#3fe0ff;display:block}</style>
    <div id="c">${topfade?'<div class="tf"></div>':''}<div class="bf"></div><div class="t"><div class="tag">${tag}</div><h1>${lines.join('<br>')}<span>${cy}</span></h1></div></div>`;
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.locator('#c').screenshot({ path: `cover-${n}.png` });
  }
  await b.close();
})();
