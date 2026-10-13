/**
 * BitcoinCrypto.tech — High-Resolution Automated Website Screen Capturer
 * 
 * Captures live, beautiful UI screenshots of bitcoincrypto.tech pages
 * (Order Book, Predictions Arena, CoinGlass Liquidation Heatmap, Crypto Learn)
 * for embedding into vertical 9:16 YouTube Shorts.
 */

import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

export async function captureWebsiteScreen(targetUrl, outputPath, width = 1080, height = 1350) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let browser;
  try {
    console.log(`📸 Capturing live website interface: ${targetUrl}...`);
    browser = await puppeteer.launch({
      executablePath: EDGE_PATH,
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--hide-scrollbars",
        "--force-dark-mode"
      ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1.5 });

    await page.goto(targetUrl, {
      waitUntil: "domcontentloaded",
      timeout: 30000
    });

    // Allow real-time charts/animations to settle
    await new Promise((r) => setTimeout(r, 3500));

    await page.screenshot({ path: outputPath, type: "png" });
    await browser.close();

    console.log(`✅ Captured website UI: ${outputPath}`);
    return outputPath;
  } catch (err) {
    console.warn(`⚠️ Warning: Could not capture live screen (${err.message}). Using fallback.`);
    if (browser) {
      try { await browser.close(); } catch (_) {}
    }
    return null;
  }
}
