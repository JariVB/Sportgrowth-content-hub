// Factuur of opdrachtbevestiging SGM als PDF. Gebruik: node maak.js data/2027-001.json
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const R = path.resolve(__dirname, '../..');
const d = JSON.parse(fs.readFileSync(process.argv[2]));
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const logo = 'data:image/png;base64,' + fs.readFileSync(R + '/instagram/beeldbank/logo-sgm-1080.png').toString('base64');
const eur = n => '€ ' + n.toFixed(2).replace('.', ',');
const isF = d.soort === 'factuur';
const tot = d.lijnen.reduce((s, l) => s + l.aantal * l.prijs, 0);
const html = `<html><head><meta charset="utf-8"><style>
@font-face{font-family:Rj;src:url(${f64(R+'/website/site/fonts/rajdhani-700.woff2')})}
@font-face{font-family:In;src:url(${f64(R+'/website/site/fonts/inter-var.woff2')})}
@page{size:A4;margin:0}*{box-sizing:border-box}
body{margin:0;font:10pt/1.5 In;color:#0d1b3e}
.p{width:210mm;min-height:297mm;padding:18mm 18mm 16mm;position:relative}
.top{display:flex;justify-content:space-between;align-items:flex-start}
.brand{display:flex;gap:10px;align-items:center}.brand img{width:16mm;height:16mm;border-radius:50%}
.brand b{font:700 20pt/1 Rj;display:block}.brand i{font:600 7pt In;font-style:normal;letter-spacing:3pt;color:#0a78ff}
h1{font:700 26pt/1 Rj;margin:0;text-align:right;text-transform:uppercase}
.meta{text-align:right;margin-top:6px;color:#3b4a6b}.meta b{color:#0d1b3e}
.adr{display:grid;grid-template-columns:1fr 1fr;gap:10mm;margin-top:14mm}
.adr h3{font:600 7.5pt In;letter-spacing:1.2pt;text-transform:uppercase;color:#0a78ff;margin:0 0 4px}
table{width:100%;border-collapse:collapse;margin-top:12mm}
th{font:600 7.5pt In;letter-spacing:1pt;text-transform:uppercase;color:#5b6a88;text-align:left;border-bottom:1.5px solid #0d1b3e;padding:6px 4px}
td{padding:8px 4px;border-bottom:1px solid #dbe3f0;vertical-align:top}
td.n,th.n{text-align:right;white-space:nowrap}.sub{color:#5b6a88;font-size:8.5pt}
.tot{margin-left:auto;width:75mm;margin-top:6mm}.tot div{display:flex;justify-content:space-between;padding:4px 4px}
.tot .g{border-top:2px solid #0d1b3e;font:700 13pt Rj;margin-top:4px;padding-top:8px}
.vr{margin-top:6mm;padding:8px 12px;background:#eef4ff;border-radius:6px;font-weight:600}
.pay{margin-top:8mm}.pay h3{font:700 12pt Rj;margin:0 0 4px;text-transform:uppercase}
.txt{margin-top:8mm;white-space:pre-line}
.sign{display:grid;grid-template-columns:1fr 1fr;gap:12mm;margin-top:14mm}.sign div{border-top:1px solid #0d1b3e;padding-top:4px;font-size:8.5pt;color:#5b6a88}
.foot{position:absolute;left:18mm;right:18mm;bottom:12mm;border-top:1px solid #dbe3f0;padding-top:6px;font-size:7.5pt;color:#5b6a88;display:flex;justify-content:space-between}
</style></head><body><div class="p">
<div class="top"><div class="brand"><img src="${logo}"><div><b>SportGrowth</b><i>MEDIA</i></div></div>
<div><h1>${isF?'Factuur':'Opdrachtbevestiging'}</h1><div class="meta">Nummer <b>${d.nummer}</b><br>Datum ${d.datum}${isF?`<br>Vervaldatum <b>${d.verval}</b>`:''}</div></div></div>
<div class="adr"><div><h3>Van</h3><b>SportGrowth Media</b><br>Jari Van Boxlaer<br>${d.van.adres.join('<br>')}<br>Ondernemingsnummer BE 0797.731.753<br>jari@sportgrowthmedia.be · 0479 25 31 13</div>
<div><h3>Aan</h3><b>${d.aan.naam}</b><br>${d.aan.adres.join('<br>')}${d.aan.ondernemingsnummer?`<br>Ondernemingsnummer ${d.aan.ondernemingsnummer}`:''}</div></div>
<table><tr><th>Omschrijving</th><th class="n">Aantal</th><th class="n">Prijs</th><th class="n">Totaal</th></tr>
${d.lijnen.map(l=>`<tr><td><b>${l.wat}</b>${l.detail?`<div class="sub">${l.detail}</div>`:''}</td><td class="n">${l.aantal}</td><td class="n">${eur(l.prijs)}</td><td class="n">${eur(l.aantal*l.prijs)}</td></tr>`).join('')}
</table>
<div class="tot"><div><span>Subtotaal</span><span>${eur(tot)}</span></div><div><span>Btw</span><span>${eur(0)}</span></div><div class="g"><span>Totaal</span><span>${eur(tot)}</span></div></div>
<div class="vr">Bijzondere vrijstellingsregeling kleine ondernemingen</div>
${isF?`<div class="pay"><h3>Betaling</h3>Gelieve ${eur(tot)} te storten op <b>${d.iban}</b> (SportGrowth Media) vóór ${d.verval}, met mededeling <b>${d.nummer}</b>.</div>`:''}
${d.tekst?`<div class="txt">${d.tekst}</div>`:''}
${!isF?`<div class="sign"><div>Voor akkoord: ${d.aan.naam}<br>(naam, datum, handtekening)</div><div>SportGrowth Media<br>Jari Van Boxlaer</div></div>`:''}
<div class="foot"><span>SportGrowth Media · Jari Van Boxlaer · BE 0797.731.753</span><span>sportgrowthmedia.be</span></div>
</div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.setContent(html);await p.evaluate(()=>document.fonts.ready);
const out=process.argv[2].replace(/\.json$/,'.pdf');await p.pdf({path:out,format:'A4',printBackground:true});await b.close();console.log(out);})();
