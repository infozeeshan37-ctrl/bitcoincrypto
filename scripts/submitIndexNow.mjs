import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const HOST = "www.bitcoincrypto.tech";
const INDEXNOW_KEY = "c839f4d1e2a7b605893e4120df71ac95";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

// Import all URLs from sitemap logic
const baseUrls = [
  `https://${HOST}`,
  `https://${HOST}/predictions`,
  `https://${HOST}/markets`,
  `https://${HOST}/coinglass`,
  `https://${HOST}/orderbook`,
  `https://${HOST}/whale-orders`,
  `https://${HOST}/cpi`,
  `https://${HOST}/tools`,
  `https://${HOST}/news`,
  `https://${HOST}/concepts`,
  `https://${HOST}/learn`,
  `https://${HOST}/learn/technical`,
  `https://${HOST}/learn/fundamental`,
  `https://${HOST}/blog`,
  `https://${HOST}/about`,
  `https://${HOST}/contact`,
  `https://${HOST}/editorial-policy`,
  `https://${HOST}/privacy`,
];

const toolSlugs = [
  "trading-bot",
  "chart-terminal",
  "dca-simulator",
  "position-sizer",
  "crypto-converter",
  "liquidation-heatmap",
  "fear-greed-index",
  "profit-calculator",
  "funding-rate-screener",
  "whale-tracker",
];

const toolUrls = toolSlugs.map((s) => `https://${HOST}/tools/${s}`);

async function submitToIndexNow() {
  console.log("🚀 Gathering URLs for Instant IndexNow Ping...");

  const allUrls = [
    ...baseUrls,
    ...toolUrls,
    `https://${HOST}/predictions/bitcoin`,
    `https://${HOST}/predictions/ethereum`,
    `https://${HOST}/predictions/solana`,
    `https://${HOST}/predictions/ripple`,
    `https://${HOST}/predictions/dogecoin`,
    `https://${HOST}/learn/what-is-bitcoin-monetary-revolution`,
    `https://${HOST}/learn/bitcoin-halving-supply-shock`,
    `https://${HOST}/learn/coinglass-liquidation-heatmaps`,
    `https://${HOST}/learn/order-book-depth-bid-ask-spread`,
    `https://${HOST}/learn/mvrv-z-score-valuation`,
    `https://${HOST}/learn/cpi-inflation-fomc-crypto`,
    `https://${HOST}/learn/kelly-criterion-position-sizing`,
  ];

  console.log(`📡 Submitting ${allUrls.length} priority URLs to IndexNow...`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: allUrls,
  };

  const endpoints = [
    "https://api.indexnow.org/IndexNow",
    "https://www.bing.com/IndexNow",
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`📤 Pinging ${endpoint}...`);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });

      console.log(`✅ ${endpoint} responded with HTTP ${res.status}: ${res.statusText}`);
    } catch (err) {
      console.error(`❌ Failed to ping ${endpoint}:`, err.message);
    }
  }

  console.log("🎉 IndexNow ping complete! Search engines notified for immediate crawl.");
}

submitToIndexNow();
