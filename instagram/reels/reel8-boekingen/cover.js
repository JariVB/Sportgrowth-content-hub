const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'); const F='/home/user/Sportgrowth-content-hub/website/site/fonts';
const f64=p=>'data:font/woff2;base64,'+fs.readFileSync(p).toString('base64');
const img='data:image/jpeg;base64,'+fs.readFileSync(__dirname+'/cover-bron.jpg').toString('base64');
const html=`<style>@font-face{font-family:Rj;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}@font-face{font-family:Pp;src:url(${f64(F+'/poppins-700.woff2')})}
body{margin:0;width:1080px;height:1920px;position:relative;overflow:hidden;background:#0d1b3e;font-family:In}
.bg{position:absolute;inset:0;background:url(${img}) center 0/1080px auto no-repeat}
.sh{position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,27,62,0) 0%,rgba(13,27,62,0) 40%,rgba(13,27,62,.85) 55%,rgba(13,27,62,.95) 75%,#0d1b3e 100%)}
.box{position:absolute;left:70px;right:70px;top:1000px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:30px}
.badge{background:#00d4ff;color:#0d1b3e;font:700 36px/1 In;padding:18px 34px;border-radius:10px;letter-spacing:.06em}
h1{margin:0;font:700 124px/.95 Rj;color:#fff;text-transform:uppercase}h1 span{color:#00d4ff}
p{margin:0;font:600 44px/1.3 In;color:#fff}
.logo{position:absolute;right:52px;bottom:44px;font:700 40px/1 Pp;color:#fff}.logo i{display:block;font:500 14px/1 In;color:#0e8cff;letter-spacing:.42em;text-align:right;margin-top:4px;margin-right:-.42em;font-style:normal}</style>
<div class=bg></div><div class=sh></div><div class=box><div class=badge>CLUBTIP · SPORTCENTRA</div><h1>Zo krijg je<br>meer <span>boekingen</span></h1><p>Niet met een uurrooster, maar met mensen</p></div><div class=logo>SportGrowth<i>MEDIA</i></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:__dirname+'/../covers-nieuw/reel8-boekingen.png'});await b.close();})();
