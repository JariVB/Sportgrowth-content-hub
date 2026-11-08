const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const F='/home/user/Sportgrowth-content-hub/website/site/fonts';
const bg='data:image/png;base64,'+fs.readFileSync(__dirname+'/studio-basis.png').toString('base64');
const X=570, Y=520, R=140; // middelpunt en straal neonring
const neon=`<svg width="1080" height="1920" style="position:absolute;inset:0"><defs>
<filter id="g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="a"/><feGaussianBlur stdDeviation="14" result="b"/><feGaussianBlur stdDeviation="40" result="c"/><feMerge><feMergeNode in="c"/><feMergeNode in="b"/><feMergeNode in="a"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<radialGradient id="w"><stop offset="0" stop-color="#00d4ff" stop-opacity=".28"/><stop offset="1" stop-color="#00d4ff" stop-opacity="0"/></radialGradient></defs>
<circle cx="${X}" cy="${Y}" r="${R*2.3}" fill="url(#w)"/>
<g filter="url(#g)">
<circle cx="${X}" cy="${Y}" r="${R}" fill="none" stroke="#3fe0ff" stroke-width="13"/>
<circle cx="${X}" cy="${Y}" r="${R}" fill="none" stroke="#e9fcff" stroke-width="4"/>
<text x="${X-R*0.44}" y="${Y+R*0.23}" text-anchor="middle" font-family="Arial Narrow,Arial,sans-serif" font-weight="700" font-size="${R*0.66}" fill="#f2fbff">S</text>
<line x1="${X+R*0.1}" y1="${Y-R*0.4}" x2="${X-R*0.1}" y2="${Y+R*0.38}" stroke="#3fe0ff" stroke-width="12" stroke-linecap="round"/>
<line x1="${X+R*0.1}" y1="${Y-R*0.4}" x2="${X-R*0.1}" y2="${Y+R*0.38}" stroke="#e9fcff" stroke-width="4" stroke-linecap="round"/>
<text x="${X+R*0.44}" y="${Y+R*0.23}" text-anchor="middle" font-family="Arial Narrow,Arial,sans-serif" font-weight="700" font-size="${R*0.66}" fill="#f2fbff">G</text>
</g>
<g filter="url(#g)" font-family="Rj" text-anchor="middle">
<text x="${X}" y="${Y+R+95}" font-size="62" letter-spacing="6" fill="#f2fbff" stroke="#3fe0ff" stroke-width="1.5">SPORTGROWTH</text>
<text x="${X}" y="${Y+R+134}" font-size="26" letter-spacing="19" fill="#3fe0ff">MEDIA</text>
</g></svg>`;
const html=`<style>@font-face{font-family:Rj;src:url(data:font/woff2;base64,${fs.readFileSync(F+'/rajdhani-700.woff2').toString('base64')})}body{margin:0}</style><div id="s" style="position:relative;width:1080px;height:1920px;background:url(${bg})">${neon}</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.locator('#s').screenshot({path:__dirname+'/studio-sgm.png'});await b.close();})();
