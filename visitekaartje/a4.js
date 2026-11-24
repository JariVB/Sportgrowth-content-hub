const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+__dirname+'/a4-thuis.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.pdf({path:__dirname+'/visitekaartjes-A4-thuis-printen.pdf',format:'A4',printBackground:true,preferCSSPageSize:true});
await p.screenshot({path:'/tmp/claude-0/-home-user-Sportgrowth-content-hub/0377841e-5e4e-590f-ab4a-00f0b5872ecb/scratchpad/a4.png',fullPage:true});await b.close();})();
