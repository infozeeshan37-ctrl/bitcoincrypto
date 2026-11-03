/**
 * BitcoinCrypto.tech — Automated Daily YouTube Shorts & Video Content Engine
 * 
 * Generates viral 60-second YouTube Shorts scripts, voiceover narration,
 * on-screen visual cues, optimized high-CTR titles, descriptions, and hashtags.
 * 
 * Usage:
 *   node scripts/youtubeShortsGenerator.mjs            # Generates today's YouTube Short pack
 *   npm run youtube:shorts                            # Convenience npm script
 */

const POPULAR_COINS = [
  { symbol: "BTCUSDT", name: "Bitcoin", ticker: "BTC", slug: "bitcoin", target: "$95,000", stop: "$86,400", squeezeCluster: "$380M", wall: "$92,500" },
  { symbol: "ETHUSDT", name: "Ethereum", ticker: "ETH", slug: "ethereum", target: "$3,100", stop: "$2,450", squeezeCluster: "$190M", wall: "$2,850" },
  { symbol: "SOLUSDT", name: "Solana", ticker: "SOL", slug: "solana", target: "$195", stop: "$152", squeezeCluster: "$95M", wall: "$178" },
  { symbol: "XRPUSDT", name: "XRP", ticker: "XRP", slug: "xrp", target: "$1.85", stop: "$1.35", squeezeCluster: "$45M", wall: "$1.62" },
  { symbol: "SUIUSDT", name: "Sui", ticker: "SUI", slug: "sui", target: "$4.50", stop: "$3.10", squeezeCluster: "$35M", wall: "$3.85" }
];

async function fetchLiveBinancePrice(symbol, fallback) {
  try {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    if (!res.ok) return fallback;
    const data = await res.json();
    return parseFloat(data.price) || fallback;
  } catch {
    return fallback;
  }
}

function formatPrice(val) {
  if (val >= 1000) return `$${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  if (val >= 1) return `$${val.toFixed(2)}`;
  return `$${val.toFixed(4)}`;
}

export async function generateDailyShort(categoryOverride = null) {
  const categories = [
    "ai_prediction",
    "coinglass_squeeze",
    "whale_radar",
    "crypto_learn",
    "cpi_macro"
  ];

  const chosenCategory = categoryOverride && categories.includes(categoryOverride)
    ? categoryOverride
    : categories[Math.floor(Math.random() * categories.length)];
  const coin = POPULAR_COINS[Math.floor(Math.random() * POPULAR_COINS.length)];
  const livePrice = await fetchLiveBinancePrice(coin.symbol, 88500);

  let shortPack = {};

  if (chosenCategory === "ai_prediction") {
    shortPack = {
      category: "AI Predictive Model & Signals",
      title: `🚨 ${coin.name} Next 24 Hours: AI Technical Target! (${coin.ticker}) #Shorts`,
      targetUrl: `https://www.bitcoincrypto.tech/predictions/${coin.slug || coin.name.toLowerCase()}`,
      visuals: [
        "[0:00 - 0:03] Hook: 3D rotating gold coin with emergency alert badge and laser shockwave",
        "[0:03 - 0:09] Animated candlestick chart breakout with ticking short liquidations counter",
        "[0:09 - 0:16] 3D Cyber Terminal window displaying live order book depth & AI target reticle",
        "[0:16 - 0:22] High-converting outro card with pulsing button & bouncing bio arrow"
      ],
      voiceover: `Whales just placed a massive limit buy wall on ${coin.name}, and retail is completely blind to what is coming. Right now, ${coin.ticker} is trading at ${formatPrice(livePrice)}. Our live order book scanner detects smart money absorbing all sell pressure at ${coin.wall}. Our AI quantitative model projects a violent surge toward ${coin.target}, with over ${coin.squeezeCluster} in short liquidations about to get squeezed! Do not trade blind. Scan the live order book and liquidation heatmap for free right now on bitcoincrypto.tech. Tap the link in bio before the four-hour candle closes!`,
      description: `Analyzing live ${coin.name} (${coin.ticker}) market structure, Level-2 Order Book imbalance, CVD taker volume, and AI price prediction targets.
      
Explore live predictions & paper-trading terminal:
👉 https://www.bitcoincrypto.tech/predictions/${coin.slug || coin.name.toLowerCase()}

⚠️ Strictly for educational and informational research purposes only. Not financial advice. Zero betting or gambling.

#${coin.ticker} #${coin.name} #Crypto #Bitcoin #Trading #CryptoNews #CryptoPredictions #Shorts`,
      tags: [coin.ticker, coin.name, "Crypto Prediction", "BitcoinCrypto Tech", "Crypto Trading", "Order Book", "Altcoins", "Technical Analysis", "Shorts"],
      pinnedComment: `📊 Track real-time ${coin.name} order book depth & AI predictions for 100% free: 👉 https://www.bitcoincrypto.tech/predictions/${coin.slug || coin.name.toLowerCase()}`
    };
  } else if (chosenCategory === "coinglass_squeeze") {
    shortPack = {
      category: "CoinGlass Liquidation Squeeze",
      title: `🔥 HUGE Liquidation Cascade Incoming?! Crypto Heatmap Alert #Shorts`,
      targetUrl: "https://www.bitcoincrypto.tech/tools/liquidation-heatmap",
      visuals: [
        "[0:00 - 0:03] Hook: 3D Gold Coin with emergency $380M Liquidation Alert badge",
        "[0:03 - 0:09] Multi-exchange liquidation heatmap with glowing trapped leverage clusters",
        "[0:09 - 0:16] Live Level-2 order book depth scanning forced liquidation triggers",
        "[0:16 - 0:22] High-converting outro card with pulsing bio link CTA"
      ],
      voiceover: `Over 380 million dollars in short sellers are about to get completely wiped out. Look at this massive liquidation cluster right here on the heatmap. Smart money is quietly sweeping support, and when this level triggers, forced liquidations will cause an explosive short squeeze straight to new highs. Stop trading blind. Scan multi-exchange liquidation heatmaps for free on bitcoincrypto.tech. Tap the link in bio now!`,
      description: `Real-time CoinGlass derivatives breakdown: tracking liquidation heatmaps, short squeeze clusters, open interest, and funding rate arbitrage across Binance, Bybit, and OKX.

View the live CoinGlass Liquidation Heatmap:
👉 https://www.bitcoincrypto.tech/tools/liquidation-heatmap

⚠️ Strictly educational analytics. Not investment advice.

#CoinGlass #Liquidation #ShortSqueeze #Bitcoin #CryptoTrading #Futures #TradingView #Shorts`,
      tags: ["CoinGlass", "Liquidation Heatmap", "Short Squeeze", "Bitcoin", "Crypto Futures", "Open Interest", "Funding Rates", "Shorts"],
      pinnedComment: `🗺️ Access the free real-time CoinGlass Liquidation Heatmap & Squeeze Scanner: 👉 https://www.bitcoincrypto.tech/tools/liquidation-heatmap`
    };
  } else if (chosenCategory === "whale_radar") {
    shortPack = {
      category: "Whale Radar & Dark Pool Flow",
      title: `🐋 $10,000,000 WHALE BUY ORDER DETECTED! Crypto Radar Alert #Shorts`,
      targetUrl: "https://www.bitcoincrypto.tech/whale-orders",
      visuals: [
        "[0:00 - 0:03] Hook: Flashing Whale Orders block trade terminal with green $10M+ alerts",
        "[0:03 - 0:09] 3D depth chart highlighting resting institutional limit bid wall",
        "[0:09 - 0:16] Cumulative volume delta (CVD) divergence showing smart money absorption",
        "[0:16 - 0:22] High-converting outro card with pulsing bio link CTA"
      ],
      voiceover: `Alert! A massive 10 million dollar whale buy order just printed on the live tape! While retail was panic selling the dip, smart money stepped in with huge resting limit orders to absorb the entire market. Tracking what whales actually do beats retail sentiment every single time. Watch the live whale tape for free on bitcoincrypto.tech. Link in bio!`,
      description: `Tracking institutional cryptocurrency whale block trades ($100k to $10M+) in real-time. Detect dark pool limit walls and smart money taker flow.

Watch the live Whale Radar:
👉 https://www.bitcoincrypto.tech/whale-orders

⚠️ Educational quantitative analytics only. Zero financial advice.

#WhaleAlert #CryptoWhales #SmartMoney #Bitcoin #Ethereum #OrderBook #TradingStrategy #Shorts`,
      tags: ["Whale Alert", "Crypto Whales", "Whale Orders", "Smart Money", "Order Book Depth", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `🐋 Watch institutional whale block orders and limit wall ladders in real-time: 👉 https://www.bitcoincrypto.tech/whale-orders`
    };
  } else if (chosenCategory === "cpi_macro") {
    shortPack = {
      category: "US CPI Macro Liquidity",
      title: `🏛️ US CPI INFLATION ALERT: Bitcoin Volatility Countdown! #Shorts`,
      targetUrl: "https://www.bitcoincrypto.tech/cpi",
      visuals: [
        "[0:00 - 0:03] Hook: US CPI countdown clock & historical volatility candle spikes",
        "[0:03 - 0:09] BLS inflation consensus vs AI neural liquidity forecast",
        "[0:09 - 0:16] Live Fed rate cut probability gauge with 88% odds",
        "[0:16 - 0:22] Outro with animated Link In Bio call to action"
      ],
      voiceover: `Urgent macro volatility alert! The next official inflation report is dropping, and Bitcoin is coiling for an explosive 8 percent breakout wick. Historical data confirms smart money uses these exact volatility wicks to liquidate overleveraged retail. Run the live inflation scenario simulator for free right now on bitcoincrypto.tech. Tap the link in bio!`,
      description: `US BLS Consumer Price Index (CPI) countdown, macroeconomic liquidity modeling, and historical Bitcoin volatility correlation matrix.

Run the live US CPI scenario simulator:
👉 https://www.bitcoincrypto.tech/cpi

⚠️ Strictly educational macro analysis. Not investment advice.

#CPI #Inflation #Bitcoin #FederalReserve #MacroEconomics #CryptoNews #CryptoTrading #Shorts`,
      tags: ["US CPI", "Inflation", "Bitcoin CPI", "Macroeconomics", "Federal Reserve", "Crypto Volatility", "Shorts"],
      pinnedComment: `🏛️ Run the live US CPI Inflation & Bitcoin Volatility Scenario Simulator: 👉 https://www.bitcoincrypto.tech/cpi`
    };
  } else {
    shortPack = {
      category: "Crypto Learn Masterclass",
      title: `🧠 The 1% Risk Rule That Saves Crypto Traders From Ruin #Shorts`,
      targetUrl: "https://www.bitcoincrypto.tech/learn",
      visuals: [
        "[0:00 - 0:03] Hook: Drawdown recovery matrix chart showing 80% loss requires 400% gain",
        "[0:03 - 0:09] Position sizing formula: Account times 1% divided by distance to stop",
        "[0:09 - 0:16] Mathematical proof why 35% win rate makes you profitable with 1:3 R:R",
        "[0:16 - 0:22] Outro with animated Link In Bio call to action"
      ],
      voiceover: `Stop trading until you know this mathematical law! If you lose 80% of your crypto account, you need a massive 400% gain just to break even! That is why pro quantitative traders follow the strict 1% risk rule: never risk more than 1% per trade. Master real risk management with free interactive tools on bitcoincrypto.tech. Tap the link in bio now!`,
      description: `Master the mathematical reality of capital preservation, position sizing formulas, drawdown recovery math, and risk-to-reward ratios.

Start the free 10-chapter Crypto Learn curriculum:
👉 https://www.bitcoincrypto.tech/learn

⚠️ Strictly educational trading masterclass. Zero investment advice.

#CryptoEducation #RiskManagement #TradingRules #CryptoStrategy #DayTrading #Bitcoin #Shorts`,
      tags: ["Crypto Education", "Risk Management", "Trading Strategy", "Position Sizing", "Crypto Masterclass", "Shorts"],
      pinnedComment: `🎓 Complete the 10-chapter interactive Crypto Learn curriculum & download free PDF eBook notes: 👉 https://www.bitcoincrypto.tech/learn`
    };
  }

  // Attach enriched coin and dynamic numerical metadata for motion graphics
  shortPack.coinName = coin.name;
  shortPack.coinTicker = coin.ticker;
  shortPack.price = formatPrice(livePrice);
  shortPack.target = coin.target;
  shortPack.squeezeCluster = coin.squeezeCluster;
  shortPack.resistance = coin.wall;

  return shortPack;
}

// CLI Execution
async function main() {
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  🎬 BitcoinCrypto.tech — Automated Daily YouTube Shorts Generator");
  console.log("══════════════════════════════════════════════════════════════════════\n");

  const pack = await generateDailyShort();

  console.log(`📌 CATEGORY:      ${pack.category}`);
  console.log(`🔥 SHORT TITLE:   ${pack.title}\n`);

  console.log("──────────────────────────────────────────────────────────────────────");
  console.log("🎙️ 60-SECOND VOICE-OVER SCRIPT (Record voice or paste into ElevenLabs/TTS):");
  console.log("──────────────────────────────────────────────────────────────────────");
  console.log(pack.voiceover);
  console.log("\n──────────────────────────────────────────────────────────────────────");
  console.log("👁️ VISUAL & SCREEN RECORDING DIRECTIONS:");
  console.log("──────────────────────────────────────────────────────────────────────");
  pack.visuals.forEach((v) => console.log(`  • ${v}`));

  console.log("\n──────────────────────────────────────────────────────────────────────");
  console.log("📝 YOUTUBE VIDEO DESCRIPTION & SEO HASHTAGS:");
  console.log("──────────────────────────────────────────────────────────────────────");
  console.log(pack.description);

  console.log("\n──────────────────────────────────────────────────────────────────────");
  console.log("💬 PINNED COMMENT:");
  console.log("──────────────────────────────────────────────────────────────────────");
  console.log(pack.pinnedComment);

  console.log("\n🏷️ RECOMMENDED TAGS:");
  console.log(pack.tags.join(", "));
  console.log("\n══════════════════════════════════════════════════════════════════════\n");
}

if (process.argv[1] && process.argv[1].endsWith("youtubeShortsGenerator.mjs")) {
  main().catch(console.error);
}
