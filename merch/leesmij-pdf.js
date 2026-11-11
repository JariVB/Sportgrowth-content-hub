const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const F='/home/user/Sportgrowth-content-hub/website/site/fonts';
const f64=p=>'data:font/woff2;base64,'+fs.readFileSync(p).toString('base64');
const D=__dirname+'/SGM-merch-voor-drukker/';
const img='data:image/png;base64,'+fs.readFileSync(D+'0-OVERZICHT-plaatsing.png').toString('base64');
const html=`<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:R;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:I;src:url(${f64(F+'/inter-var.woff2')})}
@page{size:A4;margin:14mm 17mm}body{margin:0;font:400 9.4pt/1.38 I,sans-serif;color:#1c2540}
.head{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #00d4ff;padding-bottom:4mm;margin-bottom:6mm}
h1{font:700 20pt/1.1 R;color:#0d1b3e;margin:0;text-transform:uppercase}.logo{font:700 13pt/1 R;color:#0d1b3e;text-align:right}.logo i{display:block;font:500 5.5pt/1 I;color:#0e8cff;letter-spacing:.42em;margin-top:2px;margin-right:-.42em;font-style:normal}
h2{font:700 13pt/1.2 R;color:#0d1b3e;margin:4.5mm 0 1.5mm;text-transform:uppercase}
table{width:100%;border-collapse:collapse;margin:1mm 0 3mm;font-size:9.8pt}th,td{text-align:left;padding:1.4mm 2.2mm;border-bottom:1px solid #e1e7f2;vertical-align:top}th{font:700 8.5pt I;color:#6b7896;text-transform:uppercase}
code{font:600 9pt monospace;background:#f3f6fc;padding:.3mm 1.2mm;border-radius:1mm}
.sw{display:inline-block;width:4mm;height:4mm;border-radius:1mm;vertical-align:-0.7mm;margin-right:1.5mm;border:1px solid #ccd}
.box{background:#f3f6fc;border-left:3px solid #00d4ff;padding:3mm 4mm;margin:2mm 0}
img{width:100%;border:1px solid #e1e7f2;border-radius:2mm}
.brk{break-before:page}</style></head><body>
<div class="head"><h1>Bedrukking t-shirt en hoodie</h1><div class="logo">SportGrowth<i>MEDIA</i></div></div>
<h2>Kledij</h2>
<table><tr><th>Stuk</th><th>Kleur</th><th>Voorbeeld</th></tr>
<tr><td>T-shirt</td><td>zwart</td><td>Stanley/Stella Creator 2.0, Black</td></tr>
<tr><td>Hoodie</td><td>zwart</td><td>Stanley/Stella Cruiser 2.0, Black</td></tr></table>
<h2>1 · T-shirt (map 1-tshirt)</h2>
<table><tr><th>Waar</th><th>Bestand</th><th>Breedte</th><th>Plaats</th></tr>
<tr><td>Voorkant</td><td><code>borst-embleem-kleur-80mm.svg</code></td><td>8 cm</td><td>links op de borst (vanuit de drager), ±18 cm onder de schoudernaad, ±10 cm uit het midden</td></tr>
<tr><td>Achterkant</td><td><code>rug-woordmerk-200mm.svg</code></td><td>20 cm</td><td>gecentreerd, bovenkant ±8 cm onder de kraag</td></tr></table>
<h2>2 · Hoodie (map 2-hoodie)</h2>
<table><tr><th>Waar</th><th>Bestand</th><th>Breedte</th><th>Plaats</th></tr>
<tr><td>Voorkant</td><td><code>borst-embleem-kleur-80mm.svg</code></td><td>8 cm</td><td>links op de borst (vanuit de drager), naast of onder de koordjes</td></tr>
<tr><td>Achterkant</td><td><code>rug-woordmerk-200mm.svg</code></td><td>20 cm</td><td>gecentreerd, bovenkant ±5 cm onder de kap</td></tr></table>
<h2>Kleuren</h2>
<table><tr><th>Waar</th><th>Kleur</th></tr>
<tr><td>Woord SPORTGROWTH</td><td><span class="sw" style="background:#fff"></span>wit #FFFFFF</td></tr>
<tr><td>Woord MEDIA, schuine streep in het embleem</td><td><span class="sw" style="background:#00d4ff"></span>cyaan #00D4FF</td></tr>
<tr><td>Letters S en G</td><td><span class="sw" style="background:#e8eaee"></span>lichtgrijs #E8EAEE</td></tr>
<tr><td>Ring van het embleem</td><td><span class="sw" style="background:linear-gradient(135deg,#0a78ff,#00d4ff)"></span>verloop #0A78FF → #00D4FF (mag ook effen <span class="sw" style="background:#00a8ff"></span>#00A8FF)</td></tr></table>
<div class="box"><b>Drukken in 1 kleur</b> (flex, vinyl of borduren)? Gebruik dan de witte versies: <code>borst-embleem-wit-80mm.svg</code> en <code>rug-woordmerk-wit-200mm.svg</code>.</div>
<h2>Bestanden</h2>
<p><b>.svg</b> = vectorbestand. Alle tekst is al omgezet naar vormen (geen lettertype nodig) en schaalbaar zonder kwaliteitsverlies.<br><b>.png</b> = dezelfde ontwerpen in hoge resolutie met transparante achtergrond, als reserve.</p>
<p>Vragen: Jari Van Boxlaer · SportGrowth Media · sportgrowthmedia.be</p>
<div class="brk"></div><h2>Overzicht plaatsing</h2><img src="${img}">
</body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.setContent(html,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);await p.pdf({path:D+'LEESMIJ-voor-de-drukker.pdf',format:'A4',preferCSSPageSize:true,printBackground:true});await b.close();})();
