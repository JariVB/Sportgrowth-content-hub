const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const F='/home/user/Sportgrowth-content-hub/website/site/fonts';const f64=p=>'data:font/woff2;base64,'+fs.readFileSync(p).toString('base64');
const html=`<style>@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}body{margin:0;background:transparent}
#t{width:1080px;height:1920px;position:relative}
.box{position:absolute;left:60px;right:60px;top:620px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:26px}
h1{margin:0;font:800 104px/1.02 In;letter-spacing:-.035em;color:#fff;text-shadow:0 6px 40px rgba(0,0,0,.55)}
.s{font:700 50px/1.2 In;color:#ffe14d;text-shadow:0 4px 26px rgba(0,0,0,.7)}
.c{font:600 42px/1 In;color:#fff;background:rgba(13,27,62,.75);padding:16px 28px;border-radius:40px}</style>
<div id="t"><div style="position:absolute;left:0;right:0;top:480px;height:760px;background:radial-gradient(70% 50% at 50% 50%,rgba(13,27,62,.7),rgba(13,27,62,0))"></div><div class="box"><h1>Heb jij een<br>padelhal?</h1><div class="s">Deze 5 dingen moet je<br>elke maand laten zien.</div><div class="c">Lees de caption 👇</div></div></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.locator('#t').screenshot({path:__dirname+'/tekst.png',omitBackground:true});await b.close();})();
