const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const F='/home/user/Sportgrowth-content-hub/website/site/fonts';const f64=p=>'data:font/woff2;base64,'+fs.readFileSync(p).toString('base64');
// 20 cm breed bij 300 dpi = 2362 px; canvas 2400x600
const html=`<style>@font-face{font-family:Rj;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
body{margin:0;background:transparent;width:2600px;height:600px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:56px}
.a{font:700 352px/.8 Rj;letter-spacing:.06em;color:#ffffff;margin-right:-.06em;white-space:nowrap}.b{font:600 150px/1 In;letter-spacing:.45em;color:#00d4ff;margin-right:-.45em}</style><div class=a>SPORTGROWTH</div><div class=b>MEDIA</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:2600,height:600}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);
const w=await p.evaluate(()=>document.querySelector('.a').getBoundingClientRect().width);console.log('breedte',Math.round(w));
await p.screenshot({path:__dirname+'/rug-woordmerk-20cm.png',omitBackground:true});await b.close();})();
