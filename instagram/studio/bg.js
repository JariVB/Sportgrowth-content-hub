const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const B=__dirname+'/../beeldbank/';const i64=f=>'data:image/jpeg;base64,'+fs.readFileSync(B+f).toString('base64');
const logo=fs.readFileSync(__dirname+'/../../website/site/favicon.svg','utf8').replace('<svg ','<svg width="100%" height="100%" ').replace(/<circle cx="50" cy="50" r="48" fill="#0d1b3e"\/>/,'');
const mk=(name,img,pos,extra)=>`<div id="${name}" style="position:relative;width:1080px;height:1920px;overflow:hidden;background:#0d1b3e">
<div style="position:absolute;inset:-40px;background:url(${i64(img)}) ${pos}/cover;filter:blur(14px) brightness(.55) saturate(.9)"></div>
<div style="position:absolute;inset:0;background:radial-gradient(70% 45% at 50% 55%,rgba(14,140,255,.18),rgba(13,27,62,.55))"></div>${extra}</div>`;
const glow=`<div style="position:absolute;right:90px;top:330px;width:230px;height:230px;filter:drop-shadow(0 0 30px #00d4ff) drop-shadow(0 0 60px rgba(0,212,255,.6))">${logo}</div>`;
const html=`<style>body{margin:0}</style>${mk('a','padel-net-overdekte-hal.jpg','center 55%',glow)}${mk('b','padel-vol-terras.jpg','center 40%',glow)}`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});await p.setContent(html);
for(const id of ['a'])await p.locator('#'+id).screenshot({path:__dirname+`/achtergrond-${id}.jpg`,quality:90,type:'jpeg'});await b.close();})();
