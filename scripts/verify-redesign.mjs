import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true, pipe:true, args:['--no-sandbox','--disable-setuid-sandbox','--disable-gpu'] });
try {
const page = await browser.newPage();
const errors=[]; page.on('pageerror', error=>errors.push(error.message));
await page.setViewport({width:1440,height:1000,deviceScaleFactor:1});
await page.goto('http://127.0.0.1:5174',{waitUntil:'domcontentloaded'});
await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:'screenshot-redesign-desktop.png',fullPage:true});
assert.equal(await page.$$eval('.project', nodes=>nodes.length),6);
await page.click('.filters button:nth-child(3)');
assert.equal(await page.$$eval('.project', nodes=>nodes.length),2);
await page.click('.project-cover');
assert.ok(await page.$eval('dialog',d=>d.open));
await page.keyboard.press('Escape');
assert.equal(await page.$('dialog'),null);
await page.click('.filters button:first-child');
await page.click('.hero-actions button');
assert.ok(await page.$eval('dialog',d=>d.open));
await page.keyboard.press('Escape');
await page.click('button[aria-label="Pause particle field"]');
assert.equal(await page.$eval('.field-heading .tiny-label',el=>el.textContent),'100 PARTICLES · PAUSED');
await page.click('.field-modes button:nth-child(2)');
assert.equal(await page.$eval('.field-modes button:nth-child(2)',el=>el.getAttribute('aria-pressed')),'true');
await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{window.copiedEmail=value;}}}));
await page.click('button[aria-label="Copy email address"]');
assert.equal(await page.evaluate(()=>window.copiedEmail),'ludvig@berglie.dev');
assert.equal(await page.$eval('[role=status]',el=>el.textContent),'Email copied');
for(const width of [375,390,768,1024,1440]) {
await page.setViewport({width,height:900,deviceScaleFactor:1});
const bounds=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
assert.ok(bounds.scroll<=bounds.width,`Overflow at ${width}: ${bounds.scroll}`);
}
await page.setViewport({width:390,height:844,deviceScaleFactor:1});
await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
await page.screenshot({path:'screenshot-redesign-mobile.png',fullPage:true});
await page.click('.mobile-menu');
assert.equal(await page.$eval('#navigation',el=>getComputedStyle(el).display),'flex');
await page.click('#navigation a[href="#about"]');
assert.equal(await page.$eval('.mobile-menu',el=>el.getAttribute('aria-expanded')),'false');
assert.equal(errors.length,0,errors.join('\n'));
console.log('PASS: desktop/mobile layout, 6 projects, filtering, project/profile dialogs, Escape, animation pause, navigation, no overflow at 5 widths, no runtime errors.');
} finally { await browser.close(); }


