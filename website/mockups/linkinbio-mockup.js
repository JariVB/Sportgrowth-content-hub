// Mockup: Instagram-bio -> link-in-bio-pagina -> boekingspagina (3 gsm's naast elkaar)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const F='/home/user/Sportgrowth-content-hub/website/site/fonts';
const f64=n=>'data:font/woff2;base64,'+fs.readFileSync(F+'/'+n).toString('base64');
const logo=fs.readFileSync('/home/user/Sportgrowth-content-hub/website/site/favicon.svg','utf8').replace('<svg ','<svg width="100%" height="100%" ');
const days=['ma','di','wo','do','vr','za','zo'];
let cal='';for(let d=1;d<=30;d++){const wd=(d+5)%7;const free=(wd===2&&d>11);cal+=`<div class="d ${free?'f':''} ${d===18?'sel':''}">${d}</div>`;}
const html=`<style>
@font-face{font-family:R;src:url(${f64('rajdhani-700.woff2')})}@font-face{font-family:I;src:url(${f64('inter-var.woff2')})}
*{box-sizing:border-box}body{margin:0;background:#e9eef6;font-family:I}
#mock{width:1500px;padding:50px 40px 40px;display:flex;flex-direction:column;align-items:center;background:linear-gradient(160deg,#eef3fb,#dfe7f3)}
h1{font:700 44px R;color:#0d1b3e;margin:0 0 6px}.sub{color:#4a5878;font-size:18px;margin-bottom:34px}
.row{display:flex;gap:46px;align-items:flex-start}
.col{display:flex;flex-direction:column;align-items:center;gap:18px}
.step{font:700 22px R;color:#0d1b3e;text-transform:uppercase;letter-spacing:.04em}.step b{display:inline-block;width:34px;height:34px;border-radius:50%;background:#00d4ff;color:#0d1b3e;text-align:center;line-height:34px;margin-right:8px}
.ph{width:390px;height:800px;border-radius:52px;background:#05070d;padding:12px;box-shadow:0 30px 70px rgba(13,27,62,.35)}
.sc{width:100%;height:100%;border-radius:42px;overflow:hidden;position:relative}
.cap{width:390px;text-align:center;color:#4a5878;font-size:16px;line-height:1.45}
.arrow{font:700 54px R;color:#00a8ff;align-self:center;margin-top:-60px}
/* instagram */
.ig{background:#000;color:#fff;font-size:14px;padding:54px 18px 0}
.ig .top{font-weight:700;font-size:20px;margin-bottom:18px}
.ig .pr{display:flex;align-items:center;gap:20px}.ig .av{width:86px;height:86px;border-radius:50%;padding:3px;background:linear-gradient(45deg,#f9a03f,#d62976,#4f5bd5)}.ig .av div{width:100%;height:100%;border-radius:50%;background:#0d1b3e;padding:12px;border:3px solid #000}
.ig .st{display:flex;gap:18px;text-align:center}.ig .st b{display:block;font-size:17px}
.ig .nm{font-weight:700;margin:14px 0 4px}.ig p{margin:2px 0;line-height:1.35}
.ig .lk{color:#e0f1ff;font-weight:600;display:flex;align-items:center;gap:6px;margin-top:6px;background:rgba(0,212,255,.18);border:2px solid #00d4ff;border-radius:8px;padding:6px 8px;width:max-content}
.ig .btns{display:flex;gap:6px;margin:16px 0}.ig .btns div{flex:1;background:#262626;border-radius:8px;padding:8px;text-align:center;font-weight:600}
.ig .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin:0 -18px}.ig .grid div{aspect-ratio:4/5;background:linear-gradient(160deg,#13244d,#0a78ff)}
.ig .grid div:nth-child(2n){background:linear-gradient(160deg,#1b2b55,#00b6e0)}
.tap{position:absolute;width:46px;height:46px;border-radius:50%;background:rgba(0,212,255,.35);border:3px solid #00d4ff;left:150px;top:340px}
/* link in bio */
.lb{background:radial-gradient(120% 60% at 50% 0,#173064 0,#0d1b3e 60%);color:#e9eef8;padding:56px 26px 0;text-align:center}
.lb .lg{width:96px;height:96px;margin:0 auto 14px}
.lb h2{font:700 30px R;margin:0;letter-spacing:.02em}.lb h2 i{display:block;font:500 11px I;color:#00d4ff;letter-spacing:.42em;font-style:normal;margin-top:2px}
.lb .tg{color:#a8b6d3;font-size:15px;margin:14px 0 26px}
.lb a{display:flex;align-items:center;gap:14px;text-decoration:none;background:#13244d;border:1px solid #253766;border-radius:14px;padding:16px 18px;margin-bottom:12px;color:#e9eef8;font-weight:600;font-size:16px;text-align:left}
.lb a span{font-size:22px}.lb a small{display:block;font-weight:400;color:#a8b6d3;font-size:12.5px;margin-top:2px}
.lb a.main{background:#00d4ff;color:#0d1b3e;border:0}.lb a.main small{color:#0d1b3e;opacity:.75}
.lb .ft{position:absolute;bottom:22px;left:0;right:0;font-size:12px;color:#6f7fa3}
/* booking */
.bk{background:#fff;color:#0d1b3e;padding:56px 22px 0}
.bk .hd{display:flex;align-items:center;gap:12px;margin-bottom:6px}.bk .hd .m{width:44px;height:44px}
.bk h3{font:700 24px R;margin:6px 0 4px}.bk .meta{color:#4a5878;font-size:14px;margin-bottom:16px}
.bk .mo{display:flex;justify-content:space-between;font-weight:700;margin-bottom:8px}
.bk .wk,.bk .cal{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;text-align:center}.bk .wk div{font-size:11px;color:#8a96b3;text-transform:uppercase}
.bk .d{padding:8px 0;border-radius:8px;font-size:14px;color:#b5bfd4}.bk .d.f{background:#e6f9ff;color:#0e6eff;font-weight:700}.bk .d.sel{background:#0e6eff;color:#fff}
.bk .tm{margin-top:16px;font-weight:700;font-size:14px}.bk .slots{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}
.bk .slots div{border:1.5px solid #0e6eff;color:#0e6eff;border-radius:8px;padding:9px;text-align:center;font-weight:600;font-size:14px}.bk .slots div.on{background:#0e6eff;color:#fff}
.bk .ok{margin-top:16px;background:#0d1b3e;color:#fff;border-radius:10px;padding:13px;text-align:center;font-weight:700}
.note{margin-top:30px;font-size:15px;color:#4a5878}
</style>
<div id="mock"><h1>Zo komt een club bij jou terecht</h1><div class="sub">Voorbeeld · van Instagram naar een gesprek in 3 tikken</div>
<div class="row">
<div class="col"><div class="step"><b>1</b>Instagram-bio</div><div class="ph"><div class="sc ig">
<div class="top">sportgrowth_media</div>
<div class="pr"><div class="av"><div>${logo}</div></div><div class="st"><div><b>62</b>berichten</div><div><b>312</b>volgers</div><div><b>280</b>volgend</div></div></div>
<div class="nm">SportGrowth Media</div>
<p>📈 Instagram voor sportclubs en sportcentra</p><p>💡 Elke week een clubtip</p><p>👇 Gratis analyse van je Instagram</p>
<div class="lk" style="position:relative">🔗 sportgrowthmedia.be/links<div class="tap" style="left:150px;top:-4px"></div></div>
<div class="btns"><div>Volgen</div><div>Bericht</div></div>
<div class="grid">${'<div></div>'.repeat(9)}</div>
</div></div>
<div class="cap">Eén link in je bio, op je eigen website. Een clubbestuurder tikt erop.</div></div>
<div class="arrow">→</div>
<div class="col"><div class="step"><b>2</b>Jouw linkpagina</div><div class="ph"><div class="sc lb">
<div class="lg">${logo}</div><h2>SportGrowth<i>MEDIA</i></h2>
<div class="tg">Instagram voor sportclubs en sportcentra.<br>Wij doen het, jij geeft les.</div>
<a class="main"><span>📩</span><div>Gratis analyse van je Instagram<small>Score op 100 + 3 tips, binnen 48 uur</small></div></a>
<a><span>📅</span><div>Plan een kennismaking (15 min)<small>Kies zelf een moment</small></div></a>
<a><span>🎬</span><div>Bekijk ons werk<small>Reels voor FLAXX, Jan Stilten…</small></div></a>
<a><span>💬</span><div>Stuur een WhatsApp<small>0479 25 31 13</small></div></a>
<a><span>🌐</span><div>Onze website<small>sportgrowthmedia.be</small></div></a>
</div></div>
<div class="cap">In SGM-stijl, op je eigen site. Bovenaan de gratis analyse, daaronder een gesprek plannen.</div></div>
<div class="arrow">→</div>
<div class="col"><div class="step"><b>3</b>Gesprek plannen</div><div class="ph"><div class="sc bk">
<div class="hd"><div class="m">${logo}</div><div><b>Jari Van Boxlaer</b><div style="font-size:13px;color:#4a5878">SportGrowth Media</div></div></div>
<h3>Kennismaking (15 min)</h3><div class="meta">⏱ 15 minuten · 📞 telefoon of Google Meet</div>
<div class="mo"><span>November 2026</span><span style="color:#8a96b3">‹ ›</span></div>
<div class="wk">${days.map(d=>`<div>${d}</div>`).join('')}</div>
<div class="cal"><div></div><div></div><div></div><div></div><div></div><div></div>${cal}</div>
<div class="tm">Woensdag 18 november</div>
<div class="slots"><div>09:30</div><div class="on">10:00</div><div>11:30</div><div>14:00</div></div>
<div class="ok">Afspraak bevestigen</div></div></div>
<div class="cap">De club kiest zelf een vrij moment (enkel op woensdag). Het staat meteen in jouw agenda.</div></div>
</div><div class="note">Voorbeeldontwerp · cijfers en kleuren zijn illustratief</div></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1500,height:1200},deviceScaleFactor:2});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.locator("#mock").screenshot({path:__dirname+'/linkinbio-mockup.png'});await b.close();})();
