// Hooktitel als transparante PNG, wordt ACHTER Jari gezet (tussen studio en persoon)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const F='/home/user/Sportgrowth-content-hub/website/site/fonts';
const r='data:font/woff2;base64,'+fs.readFileSync(F+'/rajdhani-700.woff2').toString('base64');
const html=`<style>@font-face{font-family:R;src:url(${r})}body{margin:0;background:transparent}
#t{width:1080px;height:1920px;position:relative}
.h{position:absolute;left:0;right:0;top:250px;text-align:center;font:700 150px/0.92 R;color:#fff;letter-spacing:2px;text-transform:uppercase;text-shadow:0 10px 40px rgba(0,0,0,.55),0 0 2px rgba(0,0,0,.4)}
.h span{display:block;color:#3fe0ff;font-size:118px;text-shadow:0 0 24px rgba(63,224,255,.55),0 10px 40px rgba(0,0,0,.55)}</style>
<div id="t"><div class="h">Sportclubs,<span>stop met affiches!</span></div></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.locator('#t').screenshot({path:process.argv[2],omitBackground:true});await b.close();})();
