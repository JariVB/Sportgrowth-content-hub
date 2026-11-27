// Visitekaartje SGM: drukklare PDF (91x61 mm met 3 mm afloop) + PNG-voorbeelden
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 344, height: 231 }, deviceScaleFactor: 6 });
  await p.goto('file://' + __dirname + '/kaart.html', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: __dirname + '/visitekaartje-drukklaar-91x61mm.pdf', width: '91mm', height: '61mm', printBackground: true });
  const ks = await p.$$('.k');
  await ks[0].screenshot({ path: __dirname + '/voorkant.png' });
  await ks[1].screenshot({ path: __dirname + '/achterkant.png' });
  await b.close();
})();
