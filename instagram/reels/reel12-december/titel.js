const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const r='data:font/woff2;base64,'+fs.readFileSync('/home/user/Sportgrowth-content-hub/website/site/fonts/rajdhani-700.woff2').toString('base64');
const html=`<style>@font-face{font-family:R;src:url(${r})}body{margin:0;background:transparent}#t{width:1080px;height:1920px;position:relative}
.h{position:absolute;left:0;right:0;top:130px;text-align:center;font:700 120px/0.95 R;padding:0 40px;color:#fff;text-transform:uppercase;text-shadow:0 10px 40px rgba(0,0,0,.55)}
.h span{display:block;color:#3fe0ff;font-size:96px;text-shadow:0 0 24px rgba(63,224,255,.55),0 10px 40px rgba(0,0,0,.55)}</style>
<div id="t"><div class="h">Welke 4 posts<span>vergeet je club</span><span>in december?</span></div></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.locator('#t').screenshot({path:process.argv[2],omitBackground:true});await b.close();})();
