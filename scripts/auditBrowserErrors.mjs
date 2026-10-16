import puppeteer from 'puppeteer-core';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/markets',
  'http://localhost:3000/coinglass',
  'http://localhost:3000/orderbook',
  'http://localhost:3000/predictions',
  'http://localhost:3000/predictions/bitcoin',
  'http://localhost:3000/whale-orders',
  'http://localhost:3000/cpi',
  'http://localhost:3000/tools',
  'http://localhost:3000/tools/liquidation-heatmap',
  'http://localhost:3000/tools/dca-simulator',
  'http://localhost:3000/tools/chart-terminal',
  'http://localhost:3000/tools/funding-rate-screener',
  'http://localhost:3000/tools/fear-greed-index',
  'http://localhost:3000/tools/position-sizer',
  'http://localhost:3000/tools/crypto-converter',
  'http://localhost:3000/blog',
  'http://localhost:3000/news',
  'http://localhost:3000/learn',
  'http://localhost:3000/about',
  'http://localhost:3000/contact',
  'http://localhost:3000/privacy',
  'http://localhost:3000/disclaimer'
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const allErrors = [];

  for (const url of urls) {
    const page = await browser.newPage();
    const pageErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('googlesyndication') && !text.includes('favicon.ico')) {
          pageErrors.push(`[Console Error] ${text}`);
        }
      }
    });

    page.on('pageerror', err => {
      pageErrors.push(`[Page Error] ${err.toString()}`);
    });

    page.on('requestfailed', req => {
      const u = req.url();
      if (!u.includes('googlesyndication') && !u.includes('google-analytics') && !u.includes('doubleclick') && !u.includes('favicon.ico')) {
        pageErrors.push(`[Request Failed] ${u}: ${req.failure()?.errorText}`);
      }
    });

    page.on('response', res => {
      const u = res.url();
      if (res.status() >= 400 && !u.includes('googlesyndication') && !u.includes('doubleclick') && !u.includes('favicon.ico')) {
        pageErrors.push(`[HTTP ${res.status()}] ${u}`);
      }
    });

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      pageErrors.push(`[Nav Error] ${e.message}`);
    }

    if (pageErrors.length > 0) {
      console.log(`❌ Found ${pageErrors.length} errors on ${url}:`);
      pageErrors.forEach(err => console.log('   ', err));
      allErrors.push({ url, errors: pageErrors });
    } else {
      console.log(`✅ ${url} is clean (0 errors)`);
    }

    await page.close();
  }

  await browser.close();

  console.log('\n================================');
  console.log(`SUMMARY: ${allErrors.length} pages had errors.`);
  if (allErrors.length > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
