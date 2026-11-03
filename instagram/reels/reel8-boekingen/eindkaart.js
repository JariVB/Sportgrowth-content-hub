// Eindkaart SGM (zonder stem): logo + "Geen tijd om dit zelf te doen?" + "Stuur een DM"
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'); const F = '/home/user/Sportgrowth-content-hub/website/site/fonts';
const f64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const logo = 'data:image/png;base64,' + fs.readFileSync('/home/user/Sportgrowth-content-hub/instagram/beeldbank/logo-sgm-1080.png').toString('base64');
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const css = `@font-face{font-family:Rj;src:url(${f64(F+'/rajdhani-700.woff2')})}@font-face{font-family:In;src:url(${f64(F+'/inter-var.woff2')})}@font-face{font-family:Pp;src:url(${f64(F+'/poppins-700.woff2')})}
body{margin:0;width:1080px;height:1920px;background:transparent;font-family:In;color:#fff}
.c{position:absolute;left:70px;right:70px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:22px}
.h{font:700 96px/1 Rj;text-transform:uppercase}.h b{color:#00d4ff}
.s{font:600 44px/1.3 In;color:#c9d4ee}
.cta{background:#00d4ff;color:#0d1b3e;border-radius:28px;padding:34px 60px;display:flex;flex-direction:column;align-items:center;gap:10px}
.cta b{font:700 92px/1 Rj;text-transform:uppercase}.cta span{font:600 36px In}
.lg{font:700 40px/1 Pp}.lg i{display:block;font:500 14px/1 In;color:#0e8cff;letter-spacing:.42em;text-align:center;margin-top:6px;font-style:normal}`;
const T = {
 bg: `<div style="position:absolute;inset:0;background:radial-gradient(90% 60% at 50% 40%,#16285a,#0d1b3e 60%,#081230)"></div>`,
 e1: `<div class="c" style="top:300px"><img src="${logo}" style="width:300px;height:300px;border-radius:50%"><div class="lg">SportGrowth<i>MEDIA</i></div></div>`,
 e2: `<div class="c" style="top:830px"><div class="h">Geen tijd om dit<br><b>zelf</b> te doen?</div><div class="s">Wij doen het voor jullie club</div></div>`,
 e3: `<div class="c" style="top:1230px"><div class="cta"><b>Stuur een DM 📩</b><span>voor een gratis analyse</span></div></div>`,
};
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
 for (const [k, h] of Object.entries(T)) { await p.setContent(`<style>${css}</style>${h}`); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(100); await p.screenshot({ path: `${OUT}/${k}.png`, omitBackground: k !== 'bg' }); }
 await b.close(); })();
