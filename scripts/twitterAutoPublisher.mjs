/**
 * BitcoinCrypto.tech — Automated Twitter/X Content Publisher
 * 
 * Usage:
 *   node scripts/twitterAutoPublisher.mjs             # Publishes live tweet if keys are in env
 *   node scripts/twitterAutoPublisher.mjs --dry-run   # Generates & tests tweet without publishing
 */

import { TwitterApi } from "twitter-api-v2";

const POPULAR_COINS = [
  { symbol: "BTCUSDT", base: "BTC", name: "Bitcoin", slug: "bitcoin", tp: "$94.5K", sl: "$85.6K", squeeze: "$360M" },
  { symbol: "ETHUSDT", base: "ETH", name: "Ethereum", slug: "ethereum", tp: "$2,950", sl: "$2,425", squeeze: "$195M" },
  { symbol: "SOLUSDT", base: "SOL", name: "Solana", slug: "solana", tp: "$188", sl: "$149", squeeze: "$92M" },
  { symbol: "XRPUSDT", base: "XRP", name: "XRP", slug: "ripple", tp: "$1.75", sl: "$1.34", squeeze: "$42M" },
  { symbol: "DOGEUSDT", base: "DOGE", name: "Dogecoin", slug: "dogecoin", tp: "$0.115", sl: "$0.086", squeeze: "$28M" },
  { symbol: "SUIUSDT", base: "SUI", name: "Sui", slug: "sui", tp: "$4.20", sl: "$3.15", squeeze: "$34M" },
  { symbol: "BNBUSDT", base: "BNB", name: "BNB", slug: "binancecoin", tp: "$675", sl: "$590", squeeze: "$48M" },
  { symbol: "PEPEUSDT", base: "PEPE", name: "Pepe", slug: "pepe", tp: "$0.000018", sl: "$0.000012", squeeze: "$16M" },
  { symbol: "TAOUSDT", base: "TAO", name: "Bittensor", slug: "bittensor", tp: "$680", sl: "$510", squeeze: "$22M" },
  { symbol: "NEARUSDT", base: "NEAR", name: "NEAR", slug: "near", tp: "$7.50", sl: "$5.80", squeeze: "$18M" },
  { symbol: "KASUSDT", base: "KAS", name: "Kaspa", slug: "kaspa", tp: "$0.22", sl: "$0.15", squeeze: "$12M" },
];

async function fetchLivePrice(symbol, fallback) {
  try {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    if (!res.ok) return fallback;
    const data = await res.json();
    return parseFloat(data.price) || fallback;
  } catch {
    return fallback;
  }
}

function formatTweetPrice(price) {
  if (price >= 1000) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(6)}`;
}

export async function generateTweet(categoryIndexOverride) {
  const categoryIndex = typeof categoryIndexOverride === "number" ? categoryIndexOverride : Math.floor(Math.random() * 6);

  if (categoryIndex === 0) {
    // 1. AI Quantitative Signal (~220 chars)
    const coin = POPULAR_COINS[Math.floor(Math.random() * POPULAR_COINS.length)];
    const price = await fetchLivePrice(coin.symbol, 88450);
    return `🚨 #${coin.name} QUANT SIGNAL (${coin.base})

• Verdict: STRONG BUY (98% Conf)
• Spot: ${formatTweetPrice(price)}
• Target: ${coin.tp} | Squeeze: ${coin.squeeze}

📊 Live Order Book & Squeeze Heatmap:
👉 https://www.bitcoincrypto.tech/predictions/${coin.slug}

#Crypto #${coin.base}`;
  } else if (categoryIndex === 1) {
    // 2. Macro CPI Inflation & Fed Watch (~220 chars)
    return `🏛️ US CPI COUNTDOWN & BTC VOLATILITY

Next official BLS CPI inflation report.

• Consensus: 2.6% YoY
• AI Neural Forecast: 2.60% Beat
• Fed Cut Odds: 88.5%

🔍 Run live CPI scenario matrix:
👉 https://www.bitcoincrypto.tech/cpi

#CPI #Macro #Bitcoin`;
  } else if (categoryIndex === 2) {
    // 3. CoinGlass Derivatives & Liquidations (~220 chars)
    return `🔥 COINGLASS DERIVATIVES RADAR

• Open Interest: $68.20B
• 24h Liquidations: $248.6M
• Long/Short: 53.4% Long
• 8h Funding: +0.0084%

🗺️ Live liquidation clusters & heatmaps:
👉 https://www.bitcoincrypto.tech/tools/liquidation-heatmap

#CoinGlass #Crypto #Futures`;
  } else if (categoryIndex === 3) {
    // 4. Coin Prediction Deep-Dive (~210 chars)
    const coin = POPULAR_COINS[Math.floor(Math.random() * POPULAR_COINS.length)];
    return `🎯 ${coin.name} (${coin.base}) AI PREDICTION

• Signal: STRONG BUY (98% Conf)
• Tactical Target: ${coin.tp}
• Invalidation Stop: ${coin.sl}

🧠 4-pillar institutional breakdown:
👉 https://www.bitcoincrypto.tech/predictions/${coin.slug}

#${coin.base} #Trading`;
  } else if (categoryIndex === 4) {
    // 5. Quant Masterclass (~220 chars)
    return `💡 QUANT MASTERCLASS: Order Book CVD

"Resting limit buy walls absorb taker dumping before structural reversals."

Master market microstructure:
👉 https://www.bitcoincrypto.tech/concepts/order-book-microstructure-and-depth

#CryptoEducation #Trading`;
  } else {
    // 6. Free Tools Spotlight (~220 chars)
    return `🛠️ FREE QUANT TOOL: Funding Rate Screener

Compare 8h funding rates across Binance & OKX with live basis APY math.

Try the interactive model:
👉 https://www.bitcoincrypto.tech/tools/funding-rate-screener

#CryptoTools #TradingView`;
  }
}

async function main() {
  const isDryRun = process.argv.includes("--dry-run") || process.env.DRY_RUN === "true";
  const testAll = process.argv.includes("--test-all");

  if (testAll) {
    console.log("Testing all 6 tweet category templates:");
    for (let i = 0; i < 6; i++) {
      const text = await generateTweet(i);
      console.log(`\n[Category ${i + 1}] Length: ${text.length} chars (Valid: ${text.length <= 280 ? "✅" : "❌"})`);
      console.log(text);
    }
    return;
  }

  const tweetText = await generateTweet();

  console.log("=========================================");
  console.log("🤖 BitcoinCrypto.tech Twitter Auto-Publisher");
  console.log("=========================================");
  console.log(`Character count: ${tweetText.length} / 280 (Valid: ${tweetText.length <= 280 ? "✅" : "❌"})`);
  console.log("-----------------------------------------");
  console.log(tweetText);
  console.log("-----------------------------------------");

  if (isDryRun) {
    console.log("✅ [DRY RUN] Tweet generated successfully (No network post made).");
    return;
  }

  const apiKey = process.env.TWITTER_API_KEY;
  const apiSecret = process.env.TWITTER_API_SECRET;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;
  const accessSecret = process.env.TWITTER_ACCESS_SECRET;

  if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
    console.warn("⚠️  Twitter API keys not found in environment variables.");
    console.warn("    To publish live, configure TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET.");
    console.log("✅ Simulation finished.");
    return;
  }

  try {
    const client = new TwitterApi({
      appKey: apiKey,
      appSecret: apiSecret,
      accessToken: accessToken,
      accessSecret: accessSecret,
    });

    const rwClient = client.readWrite;
    const res = await rwClient.v2.tweet(tweetText);
    console.log(`🚀 Live Tweet Published Successfully! ID: ${res.data.id}`);
  } catch (err) {
    console.error("❌ Failed to publish tweet to X/Twitter:", err);
    process.exit(1);
  }
}

main();
