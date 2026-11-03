// Reel 8 boekingen · ondertitels (Rajdhani 64, wit op navy, y≈1405) en labels (Rajdhani 90, navy + cyaan, y≈1110) volgens CONTENTSYSTEEM
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'); const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const css = `@font-face{font-family:Rj;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}
body{margin:0;width:1080px;height:1920px;background:transparent}
.s{position:absolute;left:0;right:0;top:1405px;display:flex;justify-content:center}
.s span{font:700 64px/1.1 Rj;color:#fff;background:rgba(13,27,62,.92);padding:10px 26px 12px;border-radius:14px;max-width:980px;text-align:center}
.l{position:absolute;left:0;right:0;top:1110px;display:flex;justify-content:center}
.l span{font:700 90px/1 Rj;color:#fff;background:rgba(13,27,62,.92);padding:16px 34px 20px;border-radius:18px;text-transform:none}
.l b{color:#00d4ff}
.post{position:absolute;left:110px;right:110px;top:560px;background:#fff;border-radius:34px;padding:34px 38px;box-shadow:0 30px 80px rgba(0,0,0,.45);font-family:In;color:#111}
.post .h{display:flex;align-items:center;gap:18px;font:700 30px In}
.post .av{width:70px;height:70px;border-radius:50%;background:#0d1b3e;color:#00d4ff;display:flex;align-items:center;justify-content:center;font:700 26px Rj}
.post .tx{font:500 40px/1.35 In;margin-top:24px}
.post .tx b{color:#0e8cff}`;
const SUB = {
 s1:'Zo krijg je meer boekingen', s2:'in je sportcentrum', s3:'Niet met een uurrooster', s4:'maar met mensen',
 s5:'Post elke week een kort filmpje', s6:'van een match', s7:'Met één zin erbij', s8:'Donderdag om 20u', s9:'nog een terrein vrij', s10:'Wie speelt mee?',
 s11:'En zet in je bio', s12:'hoe je boekt', s13:'Eén klik · niet drie',
};
const LAB = { l1:'Volle terreinen <b>elke week</b>', l2:'✕ Een <b>uurrooster</b>', l3:'Eén klik <b>en geboekt</b>' };
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
 for (const [k, t] of Object.entries(SUB)) { await p.setContent(`<style>${css}</style><div class="s"><span>${t}</span></div>`); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: `${OUT}/${k}.png`, omitBackground: true }); }
 for (const [k, t] of Object.entries(LAB)) { await p.setContent(`<style>${css}</style><div class="l"><span>${t}</span></div>`); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: `${OUT}/${k}.png`, omitBackground: true }); }
 await p.setContent(`<style>${css}</style><div class="post"><div class="h"><div class="av">CLUB</div>jouwclub_padel</div><div class="tx">🎾 <b>Donderdag 20u</b>: nog 1 terrein vrij.<br>Wie speelt mee? 👇</div></div>`); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: `${OUT}/post.png`, omitBackground: true });
 await b.close(); })();
