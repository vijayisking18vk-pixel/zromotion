const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const urls = [
    'http://localhost:3000/',
    'http://localhost:3000/listings',
    'http://localhost:3000/listings/index.html',
    'http://localhost:3000/listings/listings.html',
    'http://localhost:3000/listings/list-property.html'
  ];

  for (const url of urls) {
    console.log(`\n=== Testing: ${url} ===`);
    const page = await browser.newPage();
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    page.on('pageerror', err => {
      errors.push(err.toString());
    });

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
      const status = response ? response.status() : 'no response';
      const title = await page.title();
      const bodyText = await page.evaluate(() => document.body.innerText.trim().slice(0, 150));
      const htmlLen = await page.evaluate(() => document.body.innerHTML.length);
      
      console.log(`Status: ${status}`);
      console.log(`Title: ${title}`);
      console.log(`HTML Length: ${htmlLen}`);
      console.log(`Body Snippet: ${bodyText.replace(/\n/g, ' ')}`);
      if (errors.length > 0) {
        console.log(`Errors (${errors.length}):`, errors);
      } else {
        console.log('No console errors.');
      }
    } catch (e) {
      console.log(`Failed to load ${url}:`, e.message);
    }
    await page.close();
  }

  await browser.close();
}

test();
