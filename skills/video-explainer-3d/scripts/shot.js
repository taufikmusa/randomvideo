const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+__dirname+'/thumb.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
await p.screenshot({path:__dirname+'/thumbnail.jpg',type:'jpeg',quality:95});await b.close();})();
