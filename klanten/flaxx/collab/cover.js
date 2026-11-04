// cover collab-reel Flaxx × SGM (1080x1920, tekst binnen het rasterkader 1080x1350)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'); const F='/home/user/Sportgrowth-content-hub/website/site/fonts';
const f64=p=>'data:font/woff2;base64,'+fs.readFileSync(p).toString('base64');
const img='data:image/jpeg;base64,'+fs.readFileSync(__dirname+'/cover-bron.jpg').toString('base64');
const wm='data:image/png;base64,'+fs.readFileSync(__dirname+'/../lancering/off-wordmark-white.png').toString('base64');
const html=`<style>@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
body{margin:0;width:1080px;height:1920px;position:relative;overflow:hidden;background:#0e2a21;font-family:In}
.bg{position:absolute;inset:0;background:url(${img}) 85% 100%/1210px auto no-repeat}
.sh{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,24,18,0) 0%,rgba(8,24,18,0) 44%,rgba(8,24,18,.85) 58%,rgba(8,24,18,.97) 70%,#08180f 100%)}
.box{position:absolute;left:70px;right:70px;top:1110px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:26px}
.kick{font:600 26px/1 In;letter-spacing:.42em;color:#e9d2c4;margin-right:-.42em}
.q{font:700 50px/1.15 In;color:#ff6b5e}
h1{margin:0;font:800 118px/.95 In;letter-spacing:-.045em;color:#fff}
.wm{height:96px;margin-top:6px}</style>
<div class=bg></div><div class=sh></div><div class=box><div class=kick>FLAXX × SPORTGROWTH MEDIA</div><div class=q>Last van je elleboog na padel?</div><h1>Het verhaal<br>achter</h1><img class=wm src="${wm}"></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:__dirname+'/cover-collab.png'});await b.close();})();
