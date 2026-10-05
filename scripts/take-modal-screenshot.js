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
  await new Promise(r => setTimeout(r, 600));

  // Find and click the 'KTH Dossier' button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const dossierBtn = btns.find(b => b.textContent.includes('KTH Dossier'));
    if (dossierBtn) dossierBtn.click();
  });

  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, '../screenshot-resume-modal.png') });
  console.log('Resume modal screenshot captured.');

  // Close modal by clicking close button or pressing Escape
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));

  // Scroll to projects and open Feathercut project modal
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 400));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const caseStudyBtn = btns.find(b => b.textContent.includes('Read case study'));
    if (caseStudyBtn) caseStudyBtn.click();
  });

  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, '../screenshot-project-modal.png') });
  console.log('Project modal screenshot captured.');

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
