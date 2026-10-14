const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const R = '/home/user/Sportgrowth-content-hub', F = R + '/website/site/fonts', B = R + '/instagram/beeldbank';
const OUT = R + '/instagram/carrousel-clubbio';
fs.mkdirSync(OUT, { recursive: true });

const css = `
@font-face{font-family:Rj;src:url(file://${F}/rajdhani-700.woff2)}
@font-face{font-family:In;src:url(file://${F}/inter-var.woff2)}
@font-face{font-family:Pp;src:url(file://${F}/poppins-700.woff2)}
*{box-sizing:border-box}
body{margin:0;background:#000}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;background:#0d1b3e;color:#fff;font-family:In,'Noto Color Emoji'}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.dim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,27,62,.55) 0%,rgba(13,27,62,.35) 35%,rgba(13,27,62,.92) 70%,#0d1b3e 100%)}
.logo{position:absolute;right:56px;bottom:48px;font:700 34px/1 Pp;color:#fff}
.logo i{display:block;font:500 12px/1 In;color:#0e8cff;letter-spacing:.42em;text-align:right;margin-top:4px;margin-right:-.42em;font-style:normal}
.pg{position:absolute;left:60px;bottom:52px;display:flex;gap:10px}
.pg b{width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,.25)}
.pg b.on{background:#00d4ff}
.swipe{position:absolute;right:60px;top:60px;font:700 30px/1 In;color:#0d1b3e;background:#00d4ff;padding:16px 26px;border-radius:40px}
.tag{display:inline-block;font:800 30px/1 In;letter-spacing:.08em;color:#0d1b3e;background:#00d4ff;padding:14px 22px;border-radius:10px}
h1{font:700 118px/.95 Rj;margin:0;text-transform:uppercase;letter-spacing:-.5px}
h2{font:700 92px/.98 Rj;margin:0;text-transform:uppercase}
.c{color:#00d4ff}
p.t{font:500 40px/1.35 In;color:#c9d4ee;margin:0}
p.t b{color:#fff}
.num{position:absolute;right:-30px;top:-120px;font:700 640px/1 Rj;color:transparent;-webkit-text-stroke:4px rgba(0,212,255,.22)}
.top{position:absolute;left:70px;right:70px;top:110px;display:flex;flex-direction:column;gap:26px}
/* phone */
.phone{position:absolute;width:560px;height:760px;border-radius:64px;background:#fff;border:14px solid #111;box-shadow:0 40px 90px rgba(0,0,0,.55);overflow:hidden;color:#111;font-family:In,'Noto Color Emoji'}
.pr{display:flex;align-items:center;gap:22px;padding:34px 30px 14px}
.av{width:110px;height:110px;border-radius:50%;background:#d9dde6;display:flex;align-items:center;justify-content:center;font:700 34px Rj;color:#7a8296;flex:none}
.st{display:flex;gap:26px;font:600 22px/1.2 In;text-align:center}
.st b{display:block;font:800 30px In}
.nm{padding:0 30px;font:800 25px/1.3 In}
.bio{padding:2px 30px 16px;font:400 23px/1.35 In;color:#333}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:4px}
.g{aspect-ratio:1;display:flex;align-items:center;justify-content:center;text-align:center;font:800 19px/1.15 In;padding:8px}
.red{position:absolute;border:7px solid #ff4d5e;border-radius:18px}
.note{position:absolute;font:800 30px/1.1 In;color:#fff;background:#ff4d5e;padding:14px 20px;border-radius:12px;transform:rotate(-4deg);box-shadow:0 12px 30px rgba(0,0,0,.35)}
.bot{position:absolute;left:70px;right:70px;bottom:130px}
`;

const page = (n, inner, opts = {}) => `<section class="s" id="s${n}" style="${opts.bg || ''}">${inner}
${opts.nopg ? '' : `<div class="pg">${[1,2,3,4,5,6,7,8].map(i => `<b class="${i===n?'on':''}"></b>`).join('')}</div>`}
<div class="logo">SportGrowth<i>MEDIA</i></div></section>`;

const tile = (t, bg, fg = '#fff') => `<div class="g" style="background:${bg};color:${fg}">${t}</div>`;

const profile = (o) => `<div class="pr"><div class="av">${o.av || 'LOGO'}</div><div class="st"><div><b>${o.posts}</b>berichten</div><div><b>${o.fol}</b>volgers</div><div><b>${o.vg}</b>volgend</div></div></div>
<div class="nm">${o.name}</div><div class="bio">${o.bio}</div>`;

const slides = [];
const card=(lab,labc,txt,border)=>`<div style="background:#fff;color:#111;border-radius:24px;padding:30px 34px;font:500 40px/1.4 In,'Noto Color Emoji';${border?'border:6px solid #00d4ff':''}"><div style="font:800 26px In;color:${labc};margin-bottom:8px">${lab}</div>${txt}</div>`;
// 1 cover
slides.push(page(1, `
<div class="bg" style="background-image:url(file://${B}/tennis-ballen-net.jpg);background-position:center 40%"></div><div class="dim"></div>
<div class="swipe">In 3 regels →</div>
<div style="position:absolute;left:70px;right:70px;top:560px;display:flex;flex-direction:column;gap:30px">
<span class="tag" style="align-self:flex-start">CLUBTIP</span>
<h1 style="font-size:124px">Zo schrijf je<br>een clubbio die<br><span class="c">leden aantrekt</span></h1>
<p class="t" style="font-size:44px"><b>Bewaar deze post</b> voor jullie volgende bestuursvergadering 📌</p>
</div>`));
// 2 probleem
slides.push(page(2, `
<div class="top"><span class="tag" style="align-self:flex-start">HERKENBAAR?</span>
<h2>Dit ziet een nieuw<br>lid <span class="c">als eerste</span></h2>
<p class="t">Na 3 seconden beslist hij: <b>blijven of wegswipen.</b></p></div>
<div class="phone" style="left:260px;top:600px;height:640px">
${profile({ posts: 38, fol: 412, vg: 87, name: 'Onze Sportclub', bio: 'Welkom bij onze club! 🎾<br>Sinds 1978 💙' })}
<div class="grid">${tile('', '#d5d9e2')}${tile('', '#d5d9e2')}${tile('', '#d5d9e2')}</div></div>
<div class="note" style="left:60px;top:1000px">Wat doen jullie?<br>Waar? Hoe lid? 🤷</div>`));
// 3-5 regels
const regel=(n,title,sub,lab,txt,uitleg)=>page(n, `
<div class="num">${n-2}</div>
<div class="top"><span class="tag" style="align-self:flex-start">REGEL ${n-2}/3</span>
<h2>${title}</h2><p class="t">${sub}</p></div>
<div style="position:absolute;left:70px;right:70px;top:760px;display:flex;flex-direction:column;gap:30px">
${card(lab,'#0e8cff',txt,true)}
<p class="t" style="font-size:36px">${uitleg}</p></div>`);
slides.push(regel(3,'Wat <span class="c">doen</span> jullie?','Jullie sport, en <b>voor wie</b>.','✓ ZO SCHRIJF JE HET','🎾 Tennis en padel voor jong en oud','Een ouder die zoekt voor zijn kind, ziet meteen: <b>dit is iets voor ons.</b>'));
slides.push(regel(4,'Waar <span class="c">zijn</span> jullie?','Straat en gemeente.','✓ ZO SCHRIJF JE HET','📍 Sportlaan 1, jouw gemeente','Iemand uit de buurt denkt: <b>dat is vlakbij.</b>'));
slides.push(regel(5,'Hoe word je <span class="c">lid?</span>','<b>Eén</b> duidelijke volgende stap.','✓ ZO SCHRIJF JE HET','👇 Stuur ons een bericht om lid te worden','Zonder deze regel weet niemand wat hij moet doen. <b>Met deze regel krijg je berichten.</b>'));
// 6 voor/na
slides.push(page(6, `
<div class="top"><span class="tag" style="align-self:flex-start">VOOR EN NA</span>
<h2>Zelfde club.<br><span class="c">Ander gevoel.</span></h2></div>
<div style="position:absolute;left:70px;right:70px;top:560px;display:flex;flex-direction:column;gap:30px">
${card('✕ VOOR','#ff4d5e','Welkom bij onze club! 🎾<br>Sinds 1978 💙',false)}
${card('✓ NA','#0e8cff','🎾 Tennis en padel voor jong en oud<br>📍 Sportlaan 1, jouw gemeente<br>👇 Stuur ons een bericht om lid te worden',true)}
<p class="t" style="font-size:36px"><b>Extra:</b> zet jullie sport en gemeente ook in je <b>naamveld</b>. Daar zoekt Instagram op.</p></div>`));
// 7 dit doen wij
slides.push(page(7, `
<div class="bg" style="background-image:url(file://${B}/padel-vol-terras.jpg);background-position:center 40%"></div>
<div class="dim" style="background:linear-gradient(180deg,rgba(13,27,62,.5) 0%,rgba(13,27,62,.85) 45%,#0d1b3e 75%)"></div>
<div style="position:absolute;left:70px;right:70px;top:300px;display:flex;flex-direction:column;gap:34px">
<span class="tag" style="align-self:flex-start">GEEN TIJD?</span>
<h2>Dit doen <span class="c">wij</span><br>voor jullie club</h2>
<div style="display:flex;flex-direction:column;gap:22px;font:600 40px/1.25 In,'Noto Color Emoji'">
<div>✍️ Jullie bio, naamveld en highlights</div>
<div>🎬 Posts, reels en stories, elke week</div>
<div>📅 Ingepland, in jullie stijl</div>
<div>💬 Berichten van nieuwe leden opvolgen</div></div>
<div style="font:700 44px/1.2 In;color:#00d4ff;margin-top:10px">Jullie hoeven bijna niets te doen.</div></div>`));
// 8 CTA
slides.push(page(8, `
<div style="position:absolute;inset:0;background:#00d4ff"></div>
<div style="position:absolute;left:70px;right:70px;top:260px;display:flex;flex-direction:column;gap:40px;color:#0d1b3e">
<h2 style="font-size:120px">Hoe begint<br>jullie bio nu?</h2>
<div style="font:700 44px/1.3 In,'Noto Color Emoji'">Zet de eerste zin in de reacties 👇</div>
<div style="background:#0d1b3e;color:#fff;border-radius:26px;padding:40px;display:flex;flex-direction:column;gap:12px">
<span style="font:700 84px/1 Rj">STUUR <span class="c">AUDIT</span></span>
<span style="font:500 36px/1.3 In;color:#c9d4ee">in een DM en wij bekijken gratis de Instagram van jullie club</span></div></div>`));
const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${slides.join('')}</body></html>`;
fs.writeFileSync(__dirname + '/c.html', html);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.goto('file://' + __dirname + '/c.html');
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600);
  for (let i = 1; i <= 8; i++) {
    await p.locator('#s' + i).screenshot({ path: `${OUT}/slide0${i}.png` });
  }
  await b.close();
})();
