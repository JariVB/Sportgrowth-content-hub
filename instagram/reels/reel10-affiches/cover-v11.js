// Cover: leesbare titel BOVEN het hoofd, op een donkere band, + affiche met STOP
const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const F='/home/user/Sportgrowth-content-hub/website/site/fonts';
const r='data:font/woff2;base64,'+fs.readFileSync(F+'/rajdhani-700.woff2').toString('base64');
const bg='data:image/png;base64,'+fs.readFileSync(process.argv[2]).toString('base64');
const html=`<style>@font-face{font-family:R;src:url(${r})}body{margin:0}
#c{width:1080px;height:1920px;position:relative;background:url(${bg}) center/cover}
.t{position:absolute;left:40px;right:40px;top:40px;padding:22px 20px 20px;text-align:center;background:rgba(10,18,40,.82);border:3px solid #3fe0ff;border-radius:22px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.t b{display:block;font:700 86px/0.95 R;color:#fff;text-transform:uppercase;letter-spacing:1px}
.t b span{color:#3fe0ff}
.s{font:700 38px/1.1 R;color:#e9eef8;margin-top:12px;letter-spacing:.5px}
.aff{position:absolute;left:46px;top:760px;width:300px;height:400px;background:#f4ead2;border-radius:8px;transform:rotate(-6deg);box-shadow:0 24px 50px rgba(0,0,0,.6);padding:24px 18px;text-align:center;font:700 22px/1.25 'Comic Sans MS',sans-serif;color:#2a2a2a}
.aff .k{font:900 46px/1 R;color:#c9302c;margin:10px 0}
.st{position:absolute;left:30px;top:880px;width:330px;text-align:center;font:800 104px/1 R;color:#ff3b30;border:11px solid #ff3b30;border-radius:16px;transform:rotate(-14deg);background:rgba(20,0,0,.12);letter-spacing:6px}
</style><div id="c"><div class="t"><b>Sportclubs,<br><span>stop met affiches!</span></b><div class="s">Wat wel werkt, in 20 seconden</div></div>
<div class="aff">TENNISCLUB DE KLAVER<div class="k">KERSTDRINK</div>Zaterdag 20 december om 19u<br>in het clubhuis<br><br>Iedereen welkom!<br>Inschrijven vóór 15/12</div><div class="st">STOP</div></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.locator('#c').screenshot({path:process.argv[3]});await b.close();})();
