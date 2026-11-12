// adsenseHealthCheck.mjs
// Simple health‑check script for AdSense compliance.
// It fetches a few key pages and verifies the presence of essential meta tags
// (title, description, author, structured data) and logs the result.
// Extend this script with more thorough checks (ads.txt, robots.txt, E‑E‑A‑T
// author schema, etc.) as needed.

import fetch from 'node-fetch';
import fs from 'fs';

const urls = [
  'https://www.bitcoincrypto.tech/',
  'https://www.bitcoincrypto.tech/learn',
  'https://www.bitcoincrypto.tech/author-policy',
  'https://www.bitcoincrypto.tech/editorial-policy',
];

async function checkPage(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const hasTitle = /<title>/i.test(html);
    const hasDesc = /<meta\s+name=["']description["']/i.test(html);
    const hasLd = /<script\s+type=["']application\/ld\+json["']>/i.test(html);
    console.log(`${url} → title:${hasTitle} desc:${hasDesc} ld:${hasLd}`);
  } catch (e) {
    console.error(`${url} error:`, e.message);
  }
}

(async () => {
  console.log('AdSense health check started at', new Date().toISOString());
  for (const u of urls) await checkPage(u);
  console.log('Health check completed');
  // Append a log file for audit purposes
  fs.appendFileSync('adsense-health.log', `Run at ${new Date().toISOString()}\n`);
})();
