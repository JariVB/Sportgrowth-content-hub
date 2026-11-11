const { chromium } = require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:3000,height:3000}});
for(const f of ['embleem-donker-textiel','embleem-1kleur-wit']){const s=fs.readFileSync(__dirname+'/'+f+'.svg','utf8').replace('<svg ','<svg width="3000" height="3000" ');
await p.setContent(`<style>body{margin:0;background:transparent}</style>${s}`);await p.screenshot({path:__dirname+'/'+f+'-3000px.png',omitBackground:true});}
await b.close();})();
