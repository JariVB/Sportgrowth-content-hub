const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const R = '/home/user/Sportgrowth-content-hub', F = R + '/website/site/fonts', B = R + '/instagram/beeldbank';
const OUT = R + '/instagram/carrousel-5-tekenen';
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

// 1 COVER
slides.push(page(1, `
<div class="bg" style="background-image:url(file://${B}/tennis-leeg-gravel.jpg)"></div><div class="dim"></div>
<div class="swipe">Tel mee →</div>
<div style="position:absolute;left:70px;right:70px;top:420px;display:flex;flex-direction:column;gap:26px">
<span class="tag" style="align-self:flex-start">HERKENBAAR?</span>
<h1 style="font-size:104px">Jullie club krijgt<br>geen nieuwe leden.<br><span class="c">Omdat jullie<br>deze 5 dingen<br>elke week doen.</span></h1>
<p class="t" style="font-size:44px"><b>Hoeveel herken jij?</b> Wees eerlijk 👀</p>
</div>
<div style="position:absolute;right:70px;top:160px;width:230px;height:230px;border-radius:50%;background:#00d4ff;color:#0d1b3e;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(8deg);box-shadow:0 20px 50px rgba(0,0,0,.4)"><span style="font:700 110px/0.9 Rj">?/5</span><span style="font:800 24px In;letter-spacing:.05em">JOUW SCORE</span></div>
`));

// 2 TEKEN 1: laatste post
slides.push(page(2, `
<div class="num">1</div>
<div class="top"><span class="tag" style="align-self:flex-start">1/5 · HERKEN JE DIT?</span>
<h2>Je laatste post is<br>ouder dan je<br><span class="c">laatste training</span></h2></div>
<div class="phone" style="left:260px;top:560px;height:700px">
${profile({ posts: 38, fol: 412, vg: 87, name: 'Onze Sportclub', bio: 'Welkom bij onze club! 🎾⚽🏐' })}
<div class="grid">${tile('BBQ<br>2025', '#c9b48f')}${tile('UITSLAGEN', '#8fa3c9')}${tile('AFFICHE', '#b9c2d3')}${tile('', '#d5d9e2')}${tile('', '#d5d9e2')}${tile('', '#d5d9e2')}</div>
</div>
<div class="note" style="left:60px;top:1010px">Laatste post:<br>14 weken geleden</div>
<div class="bot" style="bottom:60px;left:70px;right:500px"></div>
`));

// 3 TEKEN 2: prikbord
slides.push(page(3, `
<div class="num">2</div>
<div class="top"><span class="tag" style="align-self:flex-start">2/5 · HERKEN JE DIT?</span>
<h2>Je grid is één<br>groot <span class="c">prikbord</span></h2>
<p class="t">Affiches zeggen <b>wat</b> er gebeurt.<br>Niet <b>hoe het voelt</b>.</p></div>
<div class="phone" style="left:260px;top:620px;height:590px">
<div class="grid" style="margin-top:0">${tile('AFFICHE<br>QUIZ', '#e94f37')}${tile('UITSLAGEN<br>INTERCLUB', '#1f4e9c')}${tile('MEDE-<br>DELING', '#f2b632','#111')}${tile('AFFICHE<br>TORNOOI', '#3a7d44')}${tile('NIEUWS-<br>BRIEF', '#6c4ab6')}${tile('UITSLAGEN', '#1f4e9c')}${tile('AFFICHE<br>BBQ', '#e94f37')}${tile('LEDEN-<br>GELD', '#f2b632','#111')}${tile('AFFICHE', '#3a7d44')}</div>
</div>
<div class="note" style="left:70px;top:900px;transform:rotate(5deg)">Geen enkel<br>gezicht 😶</div>
`));

// 4 TEKEN 3: niemand op
slides.push(page(4, `
<div class="num">3</div>
<div class="top"><span class="tag" style="align-self:flex-start">3/5 · HERKEN JE DIT?</span>
<h2>Je trainers en leden<br>zie je <span class="c">nergens</span></h2>
<p class="t">Mensen kiezen een club om <b>de mensen</b>.<br>Wie geeft er les? Wie staat er aan de bar?</p></div>
<div style="position:absolute;left:70px;right:70px;top:720px;display:grid;grid-template-columns:1fr 1fr;gap:30px">
<div style="background:#16264f;border-radius:28px;padding:30px;display:flex;flex-direction:column;gap:20px;align-items:center">
<div style="width:100%;aspect-ratio:1;border-radius:18px;background:#b9c2d3;display:flex;align-items:center;justify-content:center;color:#0d1b3e;font:800 34px/1.1 In;text-align:center">TRAINING<br>DI 19U</div>
<span style="font:800 32px In;color:#ff8a95">✕ Wat er gebeurt</span></div>
<div style="background:#16264f;border-radius:28px;padding:30px;display:flex;flex-direction:column;gap:20px;align-items:center">
<div style="width:100%;aspect-ratio:1;border-radius:18px;background:url(file://${B}/padel-lachen-aan-net.jpg) center 30%/cover"></div>
<span style="font:800 32px In;color:#00d4ff">✓ Wie je er tegenkomt</span></div>
</div>
`));

// 5 TEKEN 4: bio
slides.push(page(5, `
<div class="num">4</div>
<div class="top"><span class="tag" style="align-self:flex-start">4/5 · HERKEN JE DIT?</span>
<h2>Je bio begint met<br><span class="c">"Welkom bij"</span></h2>
<p class="t">Een nieuw lid wil 3 dingen weten:<br><b>wat, waar, en hoe word ik lid?</b></p></div>
<div style="position:absolute;left:70px;right:70px;top:740px;display:flex;flex-direction:column;gap:26px">
<div style="background:#fff;color:#111;border-radius:24px;padding:30px 34px;font:400 36px/1.4 In;position:relative;opacity:.9">
<div style="font:800 26px In;color:#ff4d5e;margin-bottom:8px">✕ NU</div>Welkom bij onze club! 🎾<br>Sinds 1978 💙</div>
<div style="background:#fff;color:#111;border-radius:24px;padding:30px 34px;font:400 36px/1.4 In;border:6px solid #00d4ff">
<div style="font:800 26px In;color:#0e8cff;margin-bottom:8px">✓ BETER</div>🎾 Tennis en padel voor jong en oud<br>📍 Sportlaan 1, jouw gemeente<br>👇 Stuur ons een bericht om lid te worden</div>
</div>
`));

// 6 TEKEN 5: DM
slides.push(page(6, `
<div class="num">5</div>
<div class="top"><span class="tag" style="align-self:flex-start">5/5 · HERKEN JE DIT?</span>
<h2>Een nieuw lid stuurt<br>een bericht... <span class="c">en wacht</span></h2></div>
<div class="phone" style="left:260px;top:520px;height:720px;background:#fff">
<div style="padding:30px;border-bottom:2px solid #eee;font:800 26px In;display:flex;align-items:center;gap:16px"><div class="av" style="width:60px;height:60px;font-size:18px">LOGO</div>Onze Sportclub</div>
<div style="padding:40px 30px;display:flex;flex-direction:column;gap:22px;align-items:flex-end">
<div style="background:#3d7bfd;color:#fff;font:500 28px/1.35 In;padding:22px 26px;border-radius:30px 30px 6px 30px;max-width:420px">Hoi! Hoe kan ik lid worden? Mijn dochter wil graag padel leren 😊</div>
<div style="font:500 22px In;color:#888">Gezien · 5 dagen geleden</div>
</div></div>
<div class="note" style="left:60px;top:1000px;background:#ff4d5e">Geen antwoord =<br>een lid voor een<br>andere club</div>
`));

// 7 DIT DOEN WIJ
slides.push(page(7, `
<div class="bg" style="background-image:url(file://${B}/padel-vol-terras.jpg);background-position:center 40%"></div>
<div class="dim" style="background:linear-gradient(180deg,rgba(13,27,62,.5) 0%,rgba(13,27,62,.85) 45%,#0d1b3e 75%)"></div>
<div style="position:absolute;left:70px;right:70px;top:300px;display:flex;flex-direction:column;gap:34px">
<span class="tag" style="align-self:flex-start">GEEN TIJD?</span>
<h2>Dit doen <span class="c">wij</span><br>voor jullie club</h2>
<div style="display:flex;flex-direction:column;gap:22px;font:600 40px/1.25 In">
<div>📸 Jullie sturen beeld, of wij komen filmen</div>
<div>🎬 Wij maken posts, reels en stories</div>
<div>📅 Wij posten elke week, in jullie stijl</div>
<div>💬 Jullie bio, highlights en DM's op orde</div>
</div>
<div style="font:700 44px/1.2 In;color:#00d4ff;margin-top:10px">Jullie hoeven bijna niets te doen.</div>
</div>
`));

// 8 SCORE + AUDIT
slides.push(page(8, `
<div style="position:absolute;inset:0;background:#00d4ff"></div>
<div style="position:absolute;left:70px;right:70px;top:120px;display:flex;flex-direction:column;gap:30px;color:#0d1b3e">
<h2 style="font-size:110px">Jullie score?</h2>
<div style="display:flex;flex-direction:column;gap:18px">
<div style="background:#0d1b3e;color:#fff;border-radius:22px;padding:26px 32px;display:flex;gap:26px;align-items:center;font:600 36px/1.25 In"><span style="font:700 64px Rj;color:#00d4ff;min-width:120px">0-1</span>Goed bezig. Hou het zo ✅</div>
<div style="background:#0d1b3e;color:#fff;border-radius:22px;padding:26px 32px;display:flex;gap:26px;align-items:center;font:600 36px/1.25 In"><span style="font:700 64px Rj;color:#f2b632;min-width:120px">2-3</span>Er liggen nieuwe leden te wachten ⚠️</div>
<div style="background:#0d1b3e;color:#fff;border-radius:22px;padding:26px 32px;display:flex;gap:26px;align-items:center;font:600 36px/1.25 In"><span style="font:700 64px Rj;color:#ff4d5e;min-width:120px">4-5</span>Tijd om er iets aan te doen 🚨</div>
</div>
<div style="font:700 40px/1.3 In">Zet jullie score in de reacties 👇</div>
<div style="background:#0d1b3e;color:#fff;border-radius:26px;padding:34px 40px;display:flex;flex-direction:column;gap:10px;margin-top:6px">
<span style="font:700 76px/1 Rj">STUUR <span class="c">AUDIT</span></span>
<span style="font:500 34px/1.3 In;color:#c9d4ee">in een DM en wij bekijken gratis de Instagram van jullie club</span></div>
</div>
`, { nopg: false }));

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
