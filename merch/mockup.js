const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'); const F='/home/user/Sportgrowth-content-hub/website/site/fonts';
const f64=p=>'data:font/woff2;base64,'+fs.readFileSync(p).toString('base64');
const emb=fs.readFileSync(__dirname+'/embleem-donker-textiel.svg','utf8').replace('<svg ','<svg width="100%" height="100%" ');
const emb1=fs.readFileSync(__dirname+'/embleem-1kleur-wit.svg','utf8').replace('<svg ','<svg width="100%" height="100%" ');
const tee=(c)=>`<path d="M60 40 L110 18 Q150 40 190 18 L240 40 L285 95 L245 120 L232 105 L232 330 L68 330 L68 105 L55 120 L15 95 Z" fill="${c}" stroke="rgba(255,255,255,.12)" stroke-width="2"/><path d="M110 18 Q150 52 190 18" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="3"/>`;
const hood=(c,zip)=>`<path d="M70 70 L105 40 Q150 20 195 40 L230 70 L285 230 L250 245 L235 175 L235 340 L65 340 L65 175 L50 245 L15 230 Z" fill="${c}" stroke="rgba(255,255,255,.12)" stroke-width="2"/>${zip?'<path d="M150 50 L150 120" stroke="#9aa3b5" stroke-width="3"/><path d="M115 45 Q150 80 185 45" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="3"/>':'<path d="M105 40 Q150 110 195 40" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="3"/><path d="M95 250 L205 250 L195 300 L105 300 Z" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="2"/><path d="M138 70 L135 120 M162 70 L165 120" stroke="#cfd5df" stroke-width="2"/>'}<rect x="65" y="325" width="170" height="15" fill="rgba(255,255,255,.06)"/>`;
const cap=(c)=>`<path d="M60 170 Q60 70 150 60 Q240 70 240 170 Z" fill="${c}" stroke="rgba(255,255,255,.12)" stroke-width="2"/><path d="M40 170 Q150 150 260 170 Q270 200 230 205 Q150 190 70 205 Q30 200 40 170 Z" fill="${c}" stroke="rgba(255,255,255,.15)" stroke-width="2"/><circle cx="150" cy="62" r="6" fill="${c}" stroke="rgba(255,255,255,.2)"/>`;
const card=(title,sub,svg,logos,specs)=>`<div class="card"><div class="art"><svg viewBox="0 0 300 360" width="300" height="360">${svg}</svg>${logos}</div><h3>${title}</h3><div class="sub">${sub}</div><ul>${specs.map(s=>`<li>${s}</li>`).join('')}</ul></div>`;
const L=(x,y,w,e=emb)=>`<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${w}px">${e}</div>`;
const T=(x,y,txt,size,ls='.25em',col='#e8eaee')=>`<div style="position:absolute;left:${x}px;top:${y}px;transform:translateX(-50%);white-space:nowrap;font:700 ${size}px/1 Rj;letter-spacing:${ls};color:${col}">${txt}</div>`;
const html=`<style>@font-face{font-family:Rj;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
body{margin:0;background:#eef0f4;font-family:In;color:#0d1b3e;width:1600px}
.head{padding:44px 60px 10px}.head h1{font:700 54px/1 Rj;margin:0;text-transform:uppercase}.head p{margin:8px 0 0;color:#55627f;font-size:20px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:26px;padding:26px 60px 50px}
.card{background:#fff;border-radius:18px;padding:22px;box-shadow:0 6px 24px rgba(13,27,62,.08)}
.art{position:relative;width:300px;height:360px;margin:0 auto;background:#e6e9ef;border-radius:12px}
h3{font:700 26px/1.1 Rj;text-transform:uppercase;margin:16px 0 4px}.sub{color:#0e8cff;font-weight:700;font-size:15px;margin-bottom:8px}
ul{margin:0;padding-left:18px;font-size:15px;line-height:1.45;color:#34405e}</style>
<div class="head"><h1>SportGrowth Media · merch</h1><p>Vaste kleur: zwart/antraciet · klein embleem (S / G) · geen grote opdruk · herkenbaar in elke video</p></div>
<div class="grid">
${card('1 · T-shirt','Zwart · voorkant',tee('#141518'),L(176,92,44),['Embleem links op de borst, 8 cm','Geborduurd of zeefdruk (2 kleuren)','Zwaar katoen (±200 g), recht model','In de zomer en voor reels thuis'])}
${card('1b · T-shirt','Zwart · achterkant',tee('#141518'),T(150,70,'SPORTGROWTH MEDIA',13,'.3em'),['Klein in de nek, 1 kleur wit','Geen grote rugprint: rustig en professioneel','Zichtbaar als je filmt op een club'])}
${card('2 · Quarter-zip','Antraciet · mijn tip voor video',hood('#2b2e35',true),L(178,118,40),['Embleem links op de borst, 7 cm, geborduurd','Sportief én verzorgd: past bij een agency','Valt op tegen blauw padel, rood gravel en groen gras'])}
${card('3 · Hoodie','Zwart · voor clubs en shoots',hood('#141518',false),L(172,110,46)+T(150,312,'SGM',14,'.4em','#9aa3b5'),['Embleem links op de borst, 8 cm','Klein "SGM" boven de zoom of op de mouw','Warm voor shoots buiten in de winter'])}
${card('4 · Pet','Zwart · optioneel',cap('#141518'),L(124,92,52),['Embleem voorkant, geborduurd','Herkenbaar zoals Rene en Tyler','Alleen als je graag een pet draagt'])}
${card('Embleem','Voor donkere kledij',`<rect width="300" height="360" fill="#141518"/>`,L(60,90,180),['S en G in lichtgrijs, ring en schuine streep blauw','Bestand: merch/embleem-donker-textiel.svg'])}
${card('Embleem 1 kleur','Voor borduren of goedkope druk',`<rect width="300" height="360" fill="#2b2e35"/>`,L(60,90,180,emb1),['Volledig wit: goedkoopst en altijd scherp','Bestand: merch/embleem-1kleur-wit.svg'])}
${card('Kleuren','Vast palet','<rect x="20" y="20" width="125" height="150" rx="10" fill="#141518"/><rect x="155" y="20" width="125" height="150" rx="10" fill="#2b2e35"/><rect x="20" y="185" width="125" height="150" rx="10" fill="#0d1b3e"/><rect x="155" y="185" width="125" height="150" rx="10" fill="#00d4ff"/>',T(82,175,'ZWART',13,'.15em','#55627f')+T(217,175,'ANTRACIET',13,'.15em','#55627f')+T(82,340,'NAVY (LOGO)',13,'.1em','#55627f')+T(217,340,'CYAAN (ACCENT)',13,'.1em','#55627f'),['Kledij: zwart of antraciet','Logo: navy en cyaan uit de huisstijl','Geen blauwe trui tegen een blauw terrein'])}
</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:1200}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:__dirname+'/merch-ontwerp.png',fullPage:true});await b.close();})();
