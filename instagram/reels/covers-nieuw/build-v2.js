const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const R='/home/user/Sportgrowth-content-hub', F=R+'/website/site/fonts', I=R+'/website/site/img', B=R+'/instagram/beeldbank', D=process.argv[2], O=R+'/instagram/reels/covers-nieuw';
const css=`@font-face{font-family:Rj;src:url(file://${F}/rajdhani-700.woff2)}@font-face{font-family:In;src:url(file://${F}/inter-var.woff2)}@font-face{font-family:Pp;src:url(file://${F}/poppins-700.woff2)}
body{margin:0;width:1080px;height:1920px;position:relative;overflow:hidden;background:#0d1b3e;font-family:In}
.bg{position:absolute;inset:0;background-size:cover}
.sh{position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,27,62,.1) 0%,rgba(13,27,62,.1) 28%,rgba(13,27,62,.82) 45%,rgba(13,27,62,.9) 75%,rgba(13,27,62,.6) 100%)}
.box{position:absolute;left:70px;right:70px;top:820px;height:600px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:30px}
.badge{background:#00d4ff;color:#0d1b3e;font:700 36px/1 In;padding:18px 34px;border-radius:10px;letter-spacing:.06em}
h1{margin:0;font:700 128px/.95 Rj;color:#fff;text-transform:uppercase}
h1 span{color:#00d4ff}
p{margin:0;font:600 44px/1.3 In;color:#fff}
.logo{position:absolute;right:52px;bottom:44px;font:700 40px/1 Pp;color:#fff}.logo i{display:block;font:500 14px/1 In;color:#0e8cff;letter-spacing:.42em;text-align:right;margin-top:4px;margin-right:-.42em;font-style:normal}
.crop{position:absolute;left:0;right:0;top:240px;height:1440px;outline:4px dashed red}.cnt{position:absolute;left:0;width:360px;top:1460px;height:220px;background:rgba(255,0,0,.3)}`;
const covers={
 'reel1-3-fouten-v2':{img:B+'/tennis-racket-net.jpg',pos:'center 30%',badge:'INSTAGRAM-TIPS',h:'3 fouten op de<br>Instagram van<br><span>tennisclubs</span>'},
 'reel2-sportmens-v2':{img:I+'/jari-smash.jpg',pos:'center 0;background-size:1080px auto;background-repeat:no-repeat',sh:'linear-gradient(180deg,rgba(13,27,62,0) 0%,rgba(13,27,62,0) 38%,rgba(13,27,62,.85) 50%,rgba(13,27,62,.95) 75%,#0d1b3e 100%)',top:900,badge:'OVER MIJ',h:'Ik ben geen<br>marketeer.<br><span>Ik ben een sportmens</span>'},
 'reel-trainers-met-hart':{img:I+'/jari-padelterrein.jpg',pos:'center 0',badge:'TRAINERS',h:'Trainers<br><span>met hart</span>',p:'Niemand ziet ze op Instagram'},
};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
for(const [k,c] of Object.entries(covers)) for(const g of [0,1]){
 const html=`<!doctype html><html><head><meta charset=utf-8><style>${css}</style></head><body><div class=bg style="background-image:url(file://${c.img});background-position:${c.pos}"></div><div class=sh style="${c.sh?`background:${c.sh}`:``}"></div><div class=box style="${c.top?`top:${c.top}px;height:540px`:``}"><div class=badge>${c.badge}</div><h1>${c.h}</h1>${c.p?`<p>${c.p}</p>`:''}</div><div class=logo>SportGrowth<i>MEDIA</i></div>${g?'<div class=crop></div><div class=cnt></div>':''}</body></html>`;
 require('fs').writeFileSync(D+'/c.html',html);
 await p.goto('file://'+D+'/c.html');await p.waitForTimeout(400);
 await p.screenshot({path:g?`${D}/${k}-check.png`:`${O}/${k}.png`});
}
await b.close();})();
