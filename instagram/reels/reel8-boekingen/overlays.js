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
const LAB = { l1:'Volle terreinen <b>elke week</b>', l2:'✕ Een <b>uurrooster</b>', l3:'Eén klik <b>vanuit je bio</b>' };
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
 for (const [k, t] of Object.entries(SUB)) { await p.setContent(`<style>${css}</style><div class="s"><span>${t}</span></div>`); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: `${OUT}/${k}.png`, omitBackground: true }); }
 for (const [k, t] of Object.entries(LAB)) { await p.setContent(`<style>${css}</style><div class="l"><span>${t}</span></div>`); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: `${OUT}/${k}.png`, omitBackground: true }); }
const img=f=>'data:image/jpeg;base64,'+fs.readFileSync(__dirname+'/'+f).toString('base64');
 const css2=`.card{position:absolute;left:150px;width:780px;top:250px;background:#fff;border-radius:30px;overflow:hidden;box-shadow:0 30px 90px rgba(0,0,0,.55);font-family:In;color:#111}
 .card .hd{display:flex;align-items:center;gap:16px;padding:20px 24px;font:700 28px In}.card .av{width:58px;height:58px;border-radius:50%;background:#0d1b3e;color:#00d4ff;display:flex;align-items:center;justify-content:center;font:700 22px Rj}
 .card img{display:block;width:780px;height:780px;object-fit:cover}.card .ic{padding:16px 24px 0;font:600 34px In;letter-spacing:6px}.card .tx{padding:8px 24px 26px;font:500 32px/1.35 In}.card .tx b{font-weight:700}
 .ph{position:absolute;left:190px;width:700px;top:130px;height:1240px;border-radius:70px;background:#fff;border:14px solid #111;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.6);font-family:In;color:#111}
 .ph .top{display:flex;gap:26px;align-items:center;padding:70px 34px 20px}.ph .av{width:150px;height:150px;border-radius:50%;background:#0d1b3e;color:#00d4ff;display:flex;align-items:center;justify-content:center;font:700 40px Rj;flex:none}
 .ph .st{display:flex;gap:30px;font:600 24px/1.2 In;text-align:center}.ph .st b{display:block;font:800 32px In}
 .ph .nm{padding:6px 34px;font:800 32px In}.ph .bio{padding:4px 34px;font:400 30px/1.45 In}.ph .lk{display:inline-block;color:#00376b;font-weight:700}
 .ph .btn{margin:28px 34px 0;background:#0095f6;color:#fff;border-radius:14px;text-align:center;font:700 30px/72px In}
 .tap{position:absolute;width:110px;height:110px;border-radius:50%;border:8px solid #00d4ff;background:rgba(0,212,255,.25)}
 .shot{position:absolute;left:190px;width:700px;top:130px;height:1240px;border-radius:70px;border:14px solid #111;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.6);background:#fff center top/cover no-repeat}`;
 const css3=`.sty{position:absolute;left:190px;width:700px;top:130px;height:1240px;border-radius:70px;border:14px solid #111;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.6);background:#000 center/cover no-repeat;font-family:In}
 .sty .bars{position:absolute;left:24px;right:24px;top:40px;display:flex;gap:8px}.sty .bars i{flex:1;height:5px;border-radius:3px;background:rgba(255,255,255,.45)}.sty .bars i:first-child{background:#fff}
 .sty .hd{position:absolute;left:24px;top:62px;display:flex;align-items:center;gap:14px;font:700 26px In;color:#fff;text-shadow:0 1px 8px rgba(0,0,0,.5)}.sty .hd .av{width:54px;height:54px;border-radius:50%;background:#0d1b3e;color:#00d4ff;display:flex;align-items:center;justify-content:center;font:700 20px Rj;border:3px solid #fff}
 .sty .t1{position:absolute;left:40px;right:40px;top:380px;text-align:center}.sty .t1 span{display:inline;font:800 54px/1.35 In;color:#0d1b3e;background:#fff;padding:4px 14px;box-decoration-break:clone;-webkit-box-decoration-break:clone;border-radius:10px}
 .sty .lnk{position:absolute;left:50%;transform:translateX(-50%);top:720px;background:#fff;border-radius:16px;padding:18px 30px;font:700 34px In;color:#0095f6;box-shadow:0 8px 30px rgba(0,0,0,.35);white-space:nowrap}`;
 await p.setContent(`<style>${css}${css3}</style><div class="sty" style="background-image:url(${img('story-foto.jpg')})"><div class="bars"><i></i><i></i><i></i></div><div class="hd"><div class="av">CLUB</div>jouwclub_padel · 2u</div><div class="t1"><span>Donderdag 20u 🎾<br>nog 1 terrein vrij<br>Wie speelt mee?</span></div><div class="lnk">🔗 Boek je terrein</div></div>`); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150); await p.screenshot({ path: `${OUT}/post.png`, omitBackground: true });
 const bio=(tap)=>`<style>${css}${css2}body{background:#0d1b3e}</style><div class="ph"><div class="top"><div class="av">CLUB</div><div class="st"><div><b>214</b>posts</div><div><b>1.380</b>volgers</div><div><b>96</b>volgend</div></div></div><div class="nm">Jouw Padelclub</div><div class="bio">🎾 Padel en tennis · Sint-Niklaas<br>📅 Boek je terrein in 1 klik 👇<br><span class="lk">🔗 playtomic.com/jouwclub</span></div><div class="btn">Volgen</div></div>${tap?'<div class="tap" style="left:405px;top:492px"></div>':''}`;
 await p.setContent(bio(false)); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: `${OUT}/bio.png` });
 await p.setContent(bio(true)); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: `${OUT}/bio-tap.png` });
 await p.setContent(`<style>${css}${css2}body{background:#0d1b3e}</style><div class="shot" style="background-image:url(${img('boeking-scherm.jpg')})"></div>`); await p.waitForTimeout(150); await p.screenshot({ path: `${OUT}/geboekt.png` });
 await b.close(); })();
