// Deelafbeelding (WhatsApp/Facebook/LinkedIn) 1200x630 -> site/img/og.jpg
const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const S=__dirname+'/../site', F=S+'/fonts';
const f=n=>'data:font/woff2;base64,'+fs.readFileSync(F+'/'+n).toString('base64');
const logo=fs.readFileSync(S+'/favicon.svg','utf8').replace('<svg ','<svg width="100%" height="100%" ');
const st='data:image/jpeg;base64,'+fs.readFileSync(process.argv[2]).toString('base64');
const html=`<style>@font-face{font-family:R;src:url(${f('rajdhani-700.woff2')})}@font-face{font-family:I;src:url(${f('inter-var.woff2')})}
body{margin:0}#o{width:1200px;height:630px;display:flex;background:#0d1b3e;font-family:I;overflow:hidden}
.l{flex:1;padding:58px 50px 50px 64px;display:flex;flex-direction:column;justify-content:space-between;color:#e9eef8}
.k{font:600 19px I;color:#00d4ff;letter-spacing:.06em;text-transform:uppercase}
h1{font:700 64px/1.02 R;margin:14px 0 0;color:#fff}h1 span{color:#00d4ff}
.p{font-size:22px;color:#a8b6d3;margin-top:18px;max-width:30ch;line-height:1.4}
.b{display:flex;align-items:center;gap:14px}.b .m{width:58px;height:58px}.b b{font:700 30px/1 R;display:block}.b i{font:500 10px I;color:#00d4ff;letter-spacing:.42em;font-style:normal}
.r{width:430px;background:url(${st}) center 30%/cover;position:relative}.r:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0d1b3e 0,rgba(13,27,62,0) 30%)}
</style><div id="o"><div class="l"><div><div class="k">Instagram voor sportclubs en sportcentra</div>
<h1>Wij maken de Instagram van <span>jouw club</span></h1><div class="p">Elke sport. Meer leden, sponsors en volle lessen. Wij doen het, jij geeft les.</div></div>
<div class="b"><div class="m">${logo}</div><div><b>SportGrowth</b><i>MEDIA</i></div></div></div><div class="r"></div></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:630}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.locator('#o').screenshot({path:__dirname+'/og.png'});await b.close();})();
