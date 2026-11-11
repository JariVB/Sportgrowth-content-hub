// SGM-neon in het lege neonkader + klein logo op de hoodie (studio-groot-bron.png -> studio-groot-sgm.png)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const F='/home/user/Sportgrowth-content-hub/website/site/fonts';
const bg='data:image/png;base64,'+fs.readFileSync(__dirname+'/studio-groot-bron.png').toString('base64');
const rj='data:font/woff2;base64,'+fs.readFileSync(F+'/rajdhani-700.woff2').toString('base64');
const html=`<style>@font-face{font-family:Rj;src:url(${rj})}body{margin:0}</style>
<div id="s" style="position:relative;width:941px;height:1672px;background:url(${bg})">
<svg width="941" height="1672" style="position:absolute;inset:0"><defs>
<filter id="g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.2" result="a"/><feGaussianBlur stdDeviation="5" result="b"/><feGaussianBlur stdDeviation="14" result="c"/><feMerge><feMergeNode in="c"/><feMergeNode in="b"/><feMergeNode in="a"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<g filter="url(#g)" font-family="Rj" text-anchor="middle">
<rect x="125" y="465" width="177" height="77" rx="11" fill="none" stroke="#3fe0ff" stroke-width="5"/><rect x="125" y="465" width="177" height="77" rx="11" fill="none" stroke="#e9fcff" stroke-width="1.2"/>
<circle cx="149" cy="503" r="16" fill="none" stroke="#3fe0ff" stroke-width="2.6"/>
<text x="143" y="509" font-size="14" fill="#f2fbff">S</text><line x1="151" y1="494" x2="147" y2="512" stroke="#3fe0ff" stroke-width="2" stroke-linecap="round"/><text x="156" y="509" font-size="14" fill="#f2fbff">G</text>
<text x="230" y="502" font-size="17" letter-spacing="1" fill="#f2fbff" stroke="#3fe0ff" stroke-width=".5">SPORTGROWTH</text>
<text x="230" y="522" font-size="11" letter-spacing="6" fill="#7eeaff">MEDIA</text>
</g>
<g opacity=".85" font-family="Rj" text-anchor="middle"><circle cx="762" cy="608" r="11" fill="none" stroke="#e8eaee" stroke-width="1.6"/><text x="758" y="612" font-size="10" fill="#e8eaee">S</text><text x="767" y="612" font-size="10" fill="#e8eaee">G</text></g>
</svg></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:941,height:1672}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.locator('#s').screenshot({path:__dirname+'/studio-groot-sgm-941.png'});await b.close();})();
