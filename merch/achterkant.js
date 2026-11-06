const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'); const F='/home/user/Sportgrowth-content-hub/website/site/fonts';
const f64=p=>'data:font/woff2;base64,'+fs.readFileSync(p).toString('base64');
const emb=fs.readFileSync(__dirname+'/embleem-donker-textiel.svg','utf8').replace('<svg ','<svg width="100%" height="100%" ');
const emb1=fs.readFileSync(__dirname+'/embleem-1kleur-wit.svg','utf8').replace('<svg ','<svg width="100%" height="100%" ');
const tee=`<path d="M60 40 L110 18 Q150 30 190 18 L240 40 L285 95 L245 120 L232 105 L232 330 L68 330 L68 105 L55 120 L15 95 Z" fill="#141518" stroke="rgba(255,255,255,.12)" stroke-width="2"/><path d="M110 18 Q150 30 190 18" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="3"/>`;
const L=(x,y,w,e=emb)=>`<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${w}px">${e}</div>`;
const T=(x,y,txt,css)=>`<div style="position:absolute;left:${x}px;top:${y}px;transform:translateX(-50%);white-space:nowrap;text-align:center;${css}">${txt}</div>`;
const card=(t,s,inner,u)=>`<div class="card"><div class="art"><svg viewBox="0 0 300 360" width="300" height="360">${tee}</svg>${inner}</div><h3>${t}</h3><div class="sub">${s}</div><ul>${u.map(x=>`<li>${x}</li>`).join('')}</ul></div>`;
const html=`<style>@font-face{font-family:Rj;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
body{margin:0;background:#eef0f4;font-family:In;color:#0d1b3e;width:1600px}.head{padding:40px 60px 0}.head h1{font:700 48px/1 Rj;margin:0;text-transform:uppercase}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:26px;padding:26px 60px 44px}.card{background:#fff;border-radius:18px;padding:22px}
.art{position:relative;width:300px;height:360px;margin:0 auto;background:#e6e9ef;border-radius:12px}h3{font:700 26px/1.1 Rj;text-transform:uppercase;margin:16px 0 4px}.sub{color:#0e8cff;font-weight:700;font-size:15px;margin-bottom:8px}ul{margin:0;padding-left:18px;font-size:15px;line-height:1.45;color:#34405e}</style>
<div class="head"><h1>T-shirt achterkant · 4 opties</h1></div><div class="grid">
${card('A · Leeg','Geen opdruk',``,['Rustigst en goedkoopst','Alle aandacht op het embleem vooraan','Mijn tip als je twijfelt'])}
${card('B · Embleem in de nek','1 kleur wit, 3 cm',L(136,40,28,emb1),['Klein detail onder de kraag','Zie je enkel als je omdraait','Subtiel, zoals bij sportmerken'])}
${card('C · Groot embleem','Midden op de rug, 22 cm',L(85,95,130),['Echt "teamkledij"','Valt op als je op een club filmt of rondloopt','Opvallender, minder zakelijk'])}
${card('D · Woordmerk','Op de schouderbladen',T(150,82,'SPORTGROWTH','font:700 30px/1 Rj;letter-spacing:.12em;color:#e8eaee')+T(150,116,'M E D I A','font:600 11px/1 In;letter-spacing:.5em;color:#00d4ff'),['Groter en steviger dan de vorige versie','Wit met een cyaan accent uit de huisstijl','Leesbaar op foto en video'])}
</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:800}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:__dirname+'/tshirt-achterkant-opties.png',fullPage:true});await b.close();})();
