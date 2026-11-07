const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+__dirname+'/collab-analyse.html');await p.evaluate(()=>document.fonts.ready);await p.pdf({path:__dirname+'/flaxx-collab-analyse.pdf',format:'A4',preferCSSPageSize:true,printBackground:true});await b.close();})();
