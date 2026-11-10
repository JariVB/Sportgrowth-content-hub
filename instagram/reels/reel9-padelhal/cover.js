const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const F='/home/user/Sportgrowth-content-hub/website/site/fonts';const f64=p=>'data:font/woff2;base64,'+fs.readFileSync(p).toString('base64');
const B=__dirname+'/../../beeldbank/';const j=p=>'data:image/jpeg;base64,'+fs.readFileSync(B+p).toString('base64');
const mk=(id,img,pos,size)=>`<div id="${id}" style="position:relative;width:1080px;height:1920px;overflow:hidden;background:#0d1b3e">
<div style="position:absolute;inset:0;background:url(${j(img)}) ${pos}/${size} no-repeat"></div>
<div style="position:absolute;inset:0;background:linear-gradient(rgba(13,27,62,.15),rgba(13,27,62,.1) 45%,rgba(13,27,62,.85) 70%,#0d1b3e)"></div>
<div style="position:absolute;left:60px;right:60px;top:1180px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:24px">
<div style="font:800 30px/1 In;letter-spacing:.08em;color:#0d1b3e;background:#00d4ff;padding:12px 20px;border-radius:10px">CLUBTIP · PADEL</div>
<div style="font:800 104px/1.02 In;letter-spacing:-.035em;color:#fff">Heb jij een<br>padelhal?</div>
<div style="font:700 46px/1.2 In;color:#ffe14d">5 dingen om elke maand<br>te laten zien</div></div></div>`;
const html=`<style>@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}body{margin:0}</style>${mk('a','padel-net-overdekte-hal.jpg','center 40%','cover')}${mk('b','padel-vol-terras.jpg','center 30%','cover')}`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);
for(const id of ['a','b'])await p.locator('#'+id).screenshot({path:__dirname+`/cover-${id}.png`});await b.close();})();
