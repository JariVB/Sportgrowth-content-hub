// Highlight-covers in dezelfde stijl als Gratis analyse / Resultaat / Over mij (navy, blauw lijnicoon)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const ic = {
 janstilten: '<circle cx="12" cy="12" r="8.5"/><path d="M5.5 6.5a9 9 0 0 1 0 11"/><path d="M18.5 6.5a9 9 0 0 0 0 11"/>',
 kickstart: '<path d="M12 2c3 2 5 6 5 10l-2 4H9l-2-4c0-4 2-8 5-10z"/><circle cx="12" cy="9" r="1.8"/><path d="M7 12l-3 3 3 1M17 12l3 3-3 1M10 19l2 3 2-3"/>',
 flaxx: '<ellipse cx="14" cy="9" rx="6" ry="6.5" transform="rotate(35 14 9)"/><path d="M9.6 13.6L4 20.5"/><circle cx="12.5" cy="7.5" r=".6"/><circle cx="15.5" cy="8.5" r=".6"/><circle cx="13.5" cy="10.8" r=".6"/>'
};
const page = s => `<body style="margin:0;width:1080px;height:1920px;background:#0d1b3e;display:flex;align-items:center;justify-content:center">
<div style="width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,#14295e,#0d1b3e 70%);border:7px solid #00d4ff;display:flex;align-items:center;justify-content:center">
<svg viewBox="0 0 24 24" width="300" height="300" fill="none" stroke="#00d4ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${s}</svg></div></body>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
for(const k of Object.keys(ic)){await p.setContent(page(ic[k]));await p.screenshot({path:`${__dirname}/highlight-${k}.png`});}
await b.close();})();
