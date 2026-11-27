// Carrousel CLUBCHECK · fictieve club "TC De Klaver" · voor/na profiel · 8 slides 1080x1350
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const R = '/home/user/Sportgrowth-content-hub', F = R + '/website/site/fonts', B = R + '/instagram/beeldbank';
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const i64 = p => `url(data:image/${p.endsWith('.png')?'png':'jpeg'};base64,${fs.readFileSync(p).toString('base64')})`;
const J = __dirname + '/studio-jari.png';
const css = `
@font-face{font-family:Rj;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}@font-face{font-family:Pp;src:url(${f64(F+'/poppins-700.woff2')})}
*{box-sizing:border-box}body{margin:0;background:#000}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;background:#0d1b3e;color:#fff;font-family:In,'Noto Color Emoji'}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.logo{position:absolute;right:56px;bottom:48px;font:700 34px/1 Pp;color:#fff}.logo i{display:block;font:500 12px/1 In;color:#0e8cff;letter-spacing:.42em;text-align:right;margin-top:4px;margin-right:-.42em;font-style:normal}
.pg{position:absolute;left:60px;bottom:52px;display:flex;gap:10px}.pg b{width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,.25)}.pg b.on{background:#00d4ff}
.swipe{position:absolute;right:60px;top:60px;font:700 30px/1 In;color:#0d1b3e;background:#00d4ff;padding:16px 26px;border-radius:40px}
.tag{display:inline-block;align-self:flex-start;font:800 30px/1 In;letter-spacing:.08em;color:#0d1b3e;background:#00d4ff;padding:14px 22px;border-radius:10px}
.tag.r{background:#ff4d4d;color:#fff}.tag.g{background:#19d38a}
h1{font:700 118px/.93 Rj;margin:0;text-transform:uppercase}h2{font:700 88px/.96 Rj;margin:0;text-transform:uppercase}.c{color:#00d4ff}
p.t{font:500 38px/1.38 In;color:#c9d4ee;margin:0}p.t b{color:#fff}
.col{position:absolute;left:70px;right:70px;display:flex;flex-direction:column;gap:26px}
.ph{position:absolute;width:520px;height:960px;border-radius:64px;background:#0b0b0d;padding:16px;box-shadow:0 40px 90px rgba(0,0,0,.6),0 0 0 3px #2c2f36}
.scr{width:100%;height:100%;border-radius:50px;overflow:hidden;background:#fff;color:#111;position:relative}
.top{padding:26px 26px 0;display:flex;gap:22px;align-items:center}.av{width:110px;height:110px;border-radius:50%;flex:none;background:#2d6a3e;color:#fff;display:flex;align-items:center;justify-content:center;font:800 40px In}
.nm{font:800 26px In}.st{display:flex;gap:18px;font:600 20px In;color:#333;margin-top:8px}.st b{display:block;font:800 24px In;color:#111}
.bio{padding:18px 26px 0;font:500 21px/1.35 In;color:#222;min-height:90px}.bio a{color:#0a58d0;font-weight:700}
.hl{display:flex;gap:16px;padding:16px 26px 0}.hl div{width:76px;text-align:center;font:600 15px In;color:#333}.hl i{display:block;width:70px;height:70px;border-radius:50%;margin:0 auto 6px;border:3px solid #ddd;background:#f1f3f6;font-style:normal;font-size:30px;line-height:64px}
.gr{position:absolute;left:0;right:0;bottom:0;display:grid;grid-template-columns:repeat(3,1fr);gap:3px;height:560px}
.gr div{background-size:cover;background-position:center;position:relative;display:flex;align-items:center;justify-content:center;text-align:center;font:900 20px/1.05 Rj;text-transform:uppercase;padding:8px}
.pin:after{content:"📌";position:absolute;right:6px;top:4px;font-size:18px}
.x{display:flex;gap:26px;align-items:flex-start}.x b{flex:none;width:76px;height:76px;border-radius:50%;background:#ff4d4d;color:#fff;font:800 44px/76px In;text-align:center}.x.ok b{background:#19d38a}
.x div{font:500 40px/1.35 In;color:#c9d4ee}.x div strong{display:block;color:#fff;font:800 48px/1.2 In;margin-bottom:6px}
.box{border-radius:24px;padding:32px 34px;font:500 40px/1.45 In}.box.bad{background:rgba(255,77,77,.12);border:3px solid #ff4d4d;color:#f3c9c9}.box.good{background:rgba(25,211,138,.12);border:3px solid #19d38a;color:#fff}
.lbl{font:800 26px In;letter-spacing:.08em;margin-bottom:12px}.bad .lbl{color:#ff8080}.good .lbl{color:#19d38a}
.mini{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:440px;height:440px}.mini div{background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;text-align:center;font:900 22px/1 Rj;text-transform:uppercase;padding:6px;border-radius:4px}
`;
const page = (n, inner) => `<section class="s" id="s${n}">${inner}<div class="pg">${[1,2,3,4,5,6,7,8].map(i=>`<b class="${i===n?'on':''}"></b>`).join('')}</div><div class="logo">SportGrowth<i>MEDIA</i></div></section>`;
const AF = [['#e94b3c','Kerstdrink<br>20/12'],['#2b5cab','Uitslagen<br>interclub'],['#f2b134','Algemene<br>vergadering'],['#3a8d5a','Lidgeld<br>2027'],['#e94b3c','Uitslagen<br>week 46'],['#7a4bd1','Tornooi<br>inschrijven'],['#2b5cab','Gesloten<br>1/11'],['#f2b134','Mosselfeest'],['#3a8d5a','Uitslagen<br>week 45']];
const badGrid = AF.map(([c,t])=>`<div style="background:${c};color:#fff">${t}</div>`).join('');
const P = [2,1,3,5,7,4,9,6,8].map(i=>__dirname+'/mensen/m'+i+'.jpg');
const goodGrid = (pins) => P.map((p,i)=>`<div class="${pins&&i<3?'pin':''}" style="background-image:${i64(p)}">${pins&&i<3?['','',''][i]:''}</div>`).join('');
const phone = (x, y, bio, hl, grid, sc=1) => `<div class="ph" style="left:${x}px;top:${y}px;transform:scale(${sc});transform-origin:top left"><div class="scr">
<div class="top"><div class="av">TC</div><div><div class="nm">tcdeklaver</div><div class="st"><span><b>${sc?'412':''}</b>volgers</span><span><b>88</b>posts</span></div></div></div>
<div class="bio">${bio}</div>${hl}<div class="gr">${grid}</div></div></div>`;
const S = [];
// 1 COVER
S.push(page(1, `<div class="bg" style="background-image:${i64(J)};background-size:1080px auto;background-position:50% -330px"></div>
<div class="bg" style="background:linear-gradient(180deg,rgba(13,27,62,0) 0%,rgba(13,27,62,0) 46%,rgba(13,27,62,.93) 64%,#0d1b3e 100%)"></div>
<div class="swipe">Swipe →</div>
<div class="col" style="top:740px;gap:20px"><span class="tag">CLUBCHECK</span>
<h1 style="font-size:94px">Deze club heeft<br>300 leden.<br><span class="c">Op Instagram zie<br>je er niets van.</span></h1></div>`));
// 2 VOOR
S.push(page(2, `<div class="col" style="top:80px;gap:16px"><span class="tag r">VOOR</span><h2 style="font-size:72px">Zo ziet hun profiel eruit</h2><div style="font:600 26px In;color:#8fa3cc">Fictieve club, echte fouten.</div></div>
${phone(280,330,'Tennis- en padelclub sinds 1978 🎾<br>Lid worden? Mail het secretariaat.','',badGrid)}
`));
// 3 3 SECONDEN
S.push(page(3, `<div class="col" style="top:150px;gap:44px"><span class="tag r">WAT EEN NIEUW LID ZIET</span><h2>In 3 seconden<br><span class="c">haakt hij af</span></h2>
<div class="x"><b>✕</b><div><strong>Geen gezichten</strong>Alleen affiches. Je ziet niet wie er speelt of hoe het voelt.</div></div>
<div class="x"><b>✕</b><div><strong>Geen oproep</strong>"Mail het secretariaat." Niemand mailt.</div></div>
<div class="x"><b>✕</b><div><strong>Uitslagen en praktische info</strong>Interessant voor leden, niet voor wie lid wil worden.</div></div></div>`));
// 4 FIX 1 BIO
S.push(page(4, `<div class="col" style="top:130px;gap:34px"><span class="tag g">FIX 1 · DE BIO</span><h2>Zeg wat je bent.<br><span class="c">En wat ze moeten doen.</span></h2>
<div class="box bad"><div class="lbl">VOOR</div>Tennis- en padelclub sinds 1978 🎾<br>Lid worden? Mail het secretariaat.</div>
<div class="box good"><div class="lbl">NA</div>🎾 Tennis &amp; padel in Lokeren · 300 leden<br>🆓 Gratis proefles elke zaterdag<br>👇 Boek in 1 klik</div></div>`));
// 5 FIX 2 PINS
S.push(page(5, `<div class="col" style="top:130px;gap:34px"><span class="tag g">FIX 2 · VASTGEZETTE POSTS</span><h2>3 posts die<br><span class="c">overtuigen</span></h2>
<p class="t">Wie je profiel opent, ziet eerst deze 3. Maak ze <b>voor wie nog geen lid is</b>.</p>
<div style="display:flex;gap:20px">${[['Zo verloopt<br>een proefles',P[0]],['Leden aan<br>het woord',P[2]],['Lid worden<br>in 2 stappen',P[1]]].map(([t,p])=>`<div style="flex:1;height:360px;border-radius:20px;background:linear-gradient(180deg,rgba(13,27,62,0) 30%,rgba(13,27,62,.9)),${i64(p)};background-size:cover;background-position:center;display:flex;align-items:flex-end;padding:20px;font:700 40px/1 Rj;text-transform:uppercase;position:relative">${t}<span style="position:absolute;right:12px;top:10px;font-size:30px">📌</span></div>`).join('')}</div></div>`));
// 6 FIX 3 GEZICHTEN
S.push(page(6, `<div class="col" style="top:110px;gap:26px"><span class="tag g">FIX 3 · GEZICHTEN</span><h2>Toon wie er<br><span class="c">speelt</span></h2>
<p class="t">Mensen worden lid van <b>mensen</b>, niet van een affiche.</p></div>
<div style="position:absolute;left:70px;top:640px;display:flex;gap:40px;align-items:center">
<div><div class="lbl" style="font:800 26px In;color:#ff8080;margin-bottom:12px">VOOR</div><div class="mini" style="width:420px;height:420px">${AF.map(([c,t])=>`<div style="background:${c};color:#fff">${t}</div>`).join('')}</div></div>
<div style="font:700 80px Rj;color:#00d4ff">→</div>
<div><div class="lbl" style="font:800 26px In;color:#19d38a;margin-bottom:12px">NA</div><div class="mini" style="width:420px;height:420px">${P.map(p=>`<div style="background-image:${i64(p)}"></div>`).join('')}</div></div></div>`));
// 7 NA
S.push(page(7, `<div class="col" style="top:80px;gap:16px"><span class="tag g">NA · 1 UUR WERK</span><h2 style="font-size:72px">Dit wil je bekijken</h2></div>
${phone(280,300,'🎾 Tennis &amp; padel in Lokeren · 300 leden<br>🆓 Gratis proefles elke zaterdag<br>👇 <a>Boek in 1 klik</a>','<div class="hl"><div><i>🎾</i>Proefles</div><div><i>👥</i>Leden</div><div><i>🏆</i>Tornooien</div><div><i>📍</i>Info</div></div>',goodGrid(true))}`));
// 8 CTA
S.push(page(8, `<div class="bg" style="background-image:${i64(J)};background-size:1080px auto;background-position:50% 8%;opacity:.35"></div>
<div class="bg" style="background:linear-gradient(180deg,rgba(13,27,62,.5),#0d1b3e 70%)"></div>
<div class="col" style="top:330px;gap:34px"><span class="tag">JULLIE CLUB</span><h1 style="font-size:104px">Hoe scoort<br><span class="c">jullie profiel?</span></h1>
<p class="t">Stuur ons een <b>DM</b>. Wij bekijken de Instagram van jullie club <b>gratis</b> en sturen je de 3 grootste verbeterpunten.</p>
<div style="align-self:flex-start;font:700 64px/1 Rj;color:#0d1b3e;background:#00d4ff;padding:22px 36px 14px;border-radius:22px">STUUR EEN DM 📩</div></div>`));
const html = `<html><head><style>${css}</style></head><body>${S.join('')}</body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);
for(let i=1;i<=8;i++){await p.locator('#s'+i).screenshot({path:`${__dirname}/slide0${i}.png`});}await b.close();})();
