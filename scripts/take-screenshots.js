import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Wait 1s for canvas stars & animations to initialize
  await new Promise(r => setTimeout(r, 1000));

  // 1. Hero screenshot
  await page.screenshot({ path: path.join(__dirname, '../screenshot-hero.png') });
  console.log('Hero screenshot captured.');

  // 2. Projects screenshot
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../screenshot-projects.png') });
  console.log('Projects screenshot captured.');

  // 3. Playground screenshot
  await page.evaluate(() => {
    const el = document.getElementById('playground');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../screenshot-playground.png') });
  console.log('Playground screenshot captured.');

  // 4. Skills & Timeline screenshot
  await page.evaluate(() => {
    const el = document.getElementById('skills');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../screenshot-skills.png') });
  console.log('Skills screenshot captured.');

  // 5. Contact screenshot
  await page.evaluate(() => {
    const el = document.getElementById('contact');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../screenshot-contact.png') });
  console.log('Contact screenshot captured.');

  await browser.close();
  console.log('All screenshots captured successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
