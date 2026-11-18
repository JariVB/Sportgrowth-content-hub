// Proefreel variant A: 2,5 s intro (gsm scrolt door een feed vol affiches) vóór de affiches-reel
const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const F='/home/user/Sportgrowth-content-hub/website/site/fonts', OUT=process.argv[2], BG=process.argv[3];
fs.mkdirSync(OUT,{recursive:true});
const f64=p=>'data:font/woff2;base64,'+fs.readFileSync(p).toString('base64');
const src=fs.readFileSync(__dirname+'/motion.js','utf8');
const i=src.indexOf('const FL = ['), j=src.indexOf('];',i)+2; eval(src.slice(i,j).replace('const FL','globalThis.FL'));
const css=(src.match(/\.post\{[^}]*\}[^`]*?\.fi\{/)||[''])[0].replace(/\.fi\{$/,'');
const PH=470;
const feed=FL.map((f,i)=>`<div class="post" style="top:${i*PH}px"><div class="ph"><div class="av">TC</div><b>tc.deklaver</b><span>•••</span></div><div class="img" style="background:${f.bg};color:${f.c}"><div class="ft">${f.t}</div>${f.l.map(x=>`<div class="fl">${x}</div>`).join('')}</div><div class="ic">♡ &nbsp;💬 &nbsp;➤<span>🔖</span></div><div class="lk">${f.lk} vind-ik-leuks</div><div class="cp"><b>tc.deklaver</b> ${f.cap}</div></div>`).join('');
const bg='data:image/png;base64,'+fs.readFileSync(BG).toString('base64');
const html=`<style>@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}@font-face{font-family:Rj;src:url(${f64(F+'/rajdhani-700.woff2')})}
body{margin:0}#c{width:1080px;height:1920px;position:relative;overflow:hidden;background:url(${bg}) center/cover}
#c:before{content:"";position:absolute;inset:0;background:rgba(5,10,25,.55);backdrop-filter:blur(10px)}
.t{position:absolute;left:50px;right:50px;top:150px;text-align:center;font:700 100px/0.98 Rj;color:#fff;text-transform:uppercase;text-shadow:0 8px 30px rgba(0,0,0,.6)}.t span{color:#3fe0ff}
.phone{position:absolute;left:225px;top:520px;width:630px;height:1220px;border-radius:80px;background:#0b0b0d;padding:20px;box-shadow:0 40px 90px rgba(0,0,0,.7),0 0 0 4px #2c2f36}
.scr{width:100%;height:100%;border-radius:62px;overflow:hidden;position:relative;background:#000}
.zoom{position:absolute;left:0;top:0;width:330px;transform:scale(1.787);transform-origin:0 0}
${css}</style>
<div id="c"><div class="t">Dit is de Instagram van<br><span>bijna elke sportclub 👀</span></div>
<div class="phone"><div class="scr"><div class="zoom"><div style="position:absolute;top:0;left:0;right:0;height:44px;z-index:2;background:#000;color:#fff;font:700 20px/44px 'Comic Sans MS',In;padding-left:14px;font-style:italic">Instagram</div><div id="feed" style="position:absolute;left:0;right:0;top:44px">${feed}</div></div></div></div></div>
<script>window.r=t=>{const y=-Math.max(0,t-.25)*560;document.getElementById('feed').style.transform='translateY('+Math.max(y,-${PH}*2.6)+'px)';
const k=Math.min(1,t/.2);document.querySelector('.t').style.transform='scale('+(1.15-.15*k)+')';document.querySelector('.phone').style.transform='translateY('+(1-Math.min(1,t/.25))*160+'px)'}</script>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);
for(let n=0;n<75;n++){await p.evaluate(t=>r(t),n/30);await p.locator('#c').screenshot({path:`${OUT}/i${String(n).padStart(3,'0')}.png`});}await b.close();})();
