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
    "website_intro",
    "five_minute_arena",
    "whale_radar",
    "cpi_macro",
    "news_sentiment",
    "technical_fundamental",
    "ai_prediction",
    "coinglass_squeeze",
    "crypto_learn"
  ];

  let chosenCategory = categories[Math.floor(Math.random() * categories.length)];
  if (categoryOverride) {
    const lower = categoryOverride.toLowerCase();
    if (lower === "intro" || lower === "website" || lower === "website_intro") {
      chosenCategory = "website_intro";
    } else if (lower === "five_minute" || lower === "5min" || lower === "five_minute_arena" || lower === "tab_predictions_5min") {
      chosenCategory = "five_minute_arena";
    } else if (lower === "whale" || lower === "whale_radar" || lower === "tab_whale_orders") {
      chosenCategory = "whale_radar";
    } else if (lower === "cpi" || lower === "cpi_macro" || lower === "tab_cpi_macro") {
      chosenCategory = "cpi_macro";
    } else if (lower === "news" || lower === "news_sentiment" || lower === "tab_news_sentiment") {
      chosenCategory = "news_sentiment";
    } else if (lower === "tech" || lower === "technical" || lower === "fundamental" || lower === "technical_fundamental" || lower === "tab_technical_fundamental") {
      chosenCategory = "technical_fundamental";
    } else if (categories.includes(categoryOverride)) {
      chosenCategory = categoryOverride;
    }
  }

  const coin = POPULAR_COINS[Math.floor(Math.random() * POPULAR_COINS.length)];
  const livePrice = await fetchLiveBinancePrice(coin.symbol, 88500);

  let shortPack = {};

  if (chosenCategory === "website_intro") {
    shortPack = {
      category: "Website Introduction & All Tabs Tour",
      title: "🌐 THE ULTIMATE FREE CRYPTO SUITE: Whale Orders, CPI, 5-Min AI & Signals! #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech",
      template: "website_intro",
      visuals: [
        "[0:00 - 0:04] Hook: Holographic 3D Gold Bitcoin with emergency Quant Suite HUD",
        "[0:04 - 0:13] Tab Tour 1: Live Whale Orders limit wall tape, US CPI simulator & News sentiment",
        "[0:13 - 0:22] Tab Tour 2: 5-Minute AI Prediction Arena & Tri-Pillar Technical/Fundamental Bot",
        "[0:22 - 0:28] High-converting Outro card directing viewers to 100% free terminal & bio link"
      ],
      voiceover: "Stop paying for expensive crypto tools. What if you had institutional whale orders, US CPI inflation data, breaking market news, and artificial intelligence predictions all inside one free website? Welcome to BitcoinCrypto dot tech—your complete quantitative trading suite. On the Whale Radar tab, track multi-million dollar institutional buy walls before retail notices. On the CPI tab, run live inflation and Federal Reserve rate cut volatility simulators. On the Predictions tab, check our brand-new Five-Minute Scalp Arena to see exact next-candle targets for Bitcoin and Ethereum with over ninety-four percent quantitative confidence! Plus, get real-time technical indicators, on-chain fundamentals, and unbiased AI long and short signals. Every single tool is one hundred percent free with zero sign-up required. Tap the link in bio right now to explore the full terminal on BitcoinCrypto dot tech!",
      description: `Meet the ultimate free cryptocurrency research & quantitative trading platform: BitcoinCrypto.tech! 🚀
      
Explore all powerhouse tabs 100% free (No signup required):
👉 https://www.bitcoincrypto.tech

🔥 What you can find on BitcoinCrypto.tech:
1. 🐋 Whale Orders & Tape: Track resting $10M+ limit buy walls & dark pool absorption
2. 🏛️ US CPI & Macro Radar: Live inflation countdown & Fed rate cut volatility simulator
3. 📰 Breaking News & Sentiment: Real-time news velocity & ETF institutional flows
4. ⏱️ 5-Minute AI Prediction Arena: High-precision next-candle scalp targets (BTC, ETH, SOL)
5. 🎯 AI Price Predictions Suite: Multi-timeframe trend forecasts & confidence ratings
6. 📊 Technical & Fundamental Analysis: RSI(14), EMA ribbons, MACD & ATR volatility
7. 🤖 AI Trading Bot Terminal: Unbiased LONG & SHORT blueprints with exact SL & TP levels

⚠️ Strictly for educational and informational research purposes only. Not financial advice. Zero gambling.

#Bitcoin #Crypto #CryptoTrading #CryptoNews #CryptoPredictions #Ethereum #Solana #WhaleAlert #CPI #Shorts`,
      tags: ["Crypto Website", "Whale Orders", "CPI Data", "AI Crypto Prediction", "5 Minute Scalping", "Technical Analysis", "Fundamental Analysis", "BitcoinCrypto Tech", "Bitcoin", "Shorts"],
      pinnedComment: `🌐 Explore the full free quantitative crypto terminal (Whales, CPI, 5-Min AI & Signals): 👉 https://www.bitcoincrypto.tech`
    };
  } else if (chosenCategory === "news_sentiment") {
    shortPack = {
      category: "Live Crypto News & Macro Sentiment",
      title: "📰 BREAKING CRYPTO NEWS: How Market Sentiment Moves Bitcoin! #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech/news",
      template: "viral",
      visuals: [
        "[0:00 - 0:03] Hook: Breaking News Cyber Alert with flashing market ticker",
        "[0:03 - 0:09] Live headline scanner with positive/negative sentiment heat scoring",
        "[0:09 - 0:16] Correlation matrix showing news sentiment impact on live Bitcoin price",
        "[0:16 - 0:22] Outro with animated Link In Bio call to action"
      ],
      voiceover: `Breaking crypto news moves billions in seconds, but retail always reacts too late. On the News tab at bitcoincrypto.tech, our live AI sentiment engine scans breaking headlines, ETF flows, and macroeconomic news in real-time. It calculates instant bullish or bearish sentiment scores before the market reacts. Stop getting caught off guard by volatility. Track live institutional crypto news for free on bitcoincrypto.tech. Tap the link in bio!`,
      description: `Track real-time cryptocurrency news sentiment, institutional ETF flow trends, and macroeconomic headlines.
      
Read live breaking crypto news & sentiment for free:
👉 https://www.bitcoincrypto.tech/news

⚠️ Strictly educational analytics. Not financial advice.

#CryptoNews #Bitcoin #Ethereum #CryptoMarket #BreakingNews #MacroEconomics #TradingView #Shorts`,
      tags: ["Crypto News", "Bitcoin News", "Market Sentiment", "Crypto Trading", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `📰 Scan breaking crypto headlines and live AI sentiment scoring for 100% free: 👉 https://www.bitcoincrypto.tech/news`
    };
  } else if (chosenCategory === "technical_fundamental") {
    shortPack = {
      category: "Technical & Fundamental Tri-Pillar Engine",
      title: "📈 Master Technical & Fundamental Analysis in 60 Seconds! #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech/tools",
      template: "viral",
      visuals: [
        "[0:00 - 0:03] Hook: Tri-Pillar quantitative HUD spinning into alignment",
        "[0:03 - 0:09] Technical indicators: Real RSI(14), EMA ribbons, and MACD divergence",
        "[0:09 - 0:16] Fundamental order book flow: Live taker CVD and liquidation magnetic pools",
        "[0:16 - 0:22] Outro with pulsing Link in Bio button"
      ],
      voiceover: `Most crypto traders lose money because they only look at one chart. Pro quantitative traders use Tri-Pillar confluence: technical price action, on-chain order flow, and live fundamentals. On bitcoincrypto.tech, our AI Trading Bot combines real RSI, EMA ribbons, and CoinGlass derivatives to give you completely unbiased LONG and SHORT trade blueprints with exact stop-loss and take-profit targets! Stop guessing. Check the live technical terminal for free on bitcoincrypto.tech. Link in bio!`,
      description: `Learn how the Tri-Pillar AI Trading Engine combines technical indicators, on-chain derivatives order flow, and fundamental sentiment.
      
Explore the free AI Trading Bot & Technical Terminal:
👉 https://www.bitcoincrypto.tech/tools

⚠️ Strictly for educational and informational research purposes only. Not financial advice.

#TechnicalAnalysis #FundamentalAnalysis #TradingStrategy #Bitcoin #CryptoSignals #DayTrading #Shorts`,
      tags: ["Technical Analysis", "Fundamental Analysis", "Crypto Trading", "AI Trading Bot", "Trading Strategy", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `🤖 Access the free Tri-Pillar Technical Analysis & AI Trading Bot Terminal: 👉 https://www.bitcoincrypto.tech/tools`
    };
  } else if (chosenCategory === "five_minute_arena") {
    shortPack = {
      category: "5-Minute AI Prediction Arena & Website Showcase",
      title: "🚨 CAN AI PREDICT THE NEXT 5 MINUTES? New Free Tool! ⏱️ #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech/predictions",
      template: "five_minute",
      visuals: [
        "[0:00 - 0:04] Hook: Emergency Quant Alert with pulsing 5-Minute scalp clock",
        "[0:04 - 0:13] Live 5-Minute Prediction Arena with BTC, ETH, SOL targets and 95% AI confidence",
        "[0:13 - 0:21] Multi-Tab Website Tour: CoinGlass liquidations, whale tape, and AI trading bot",
        "[0:21 - 0:28] High-converting outro with pulsating bio link CTA & domain highlight"
      ],
      voiceover: "Stop trading blind in crypto. What if an artificial intelligence could predict the exact next five-minute price target before the candle even moves? Look at this: on BitcoinCrypto dot tech, our brand-new Five-Minute Prediction Arena calculates live scalp targets for Bitcoin, Ethereum, and Solana with up to ninety-five percent quantitative confidence! It scans real-time volatility, Level-Two order book walls, and whale volume delta every single second. And that is just one tab on the site! You get live liquidation heatmaps, whale dark pools, and real-time AI long and short signals—one hundred percent free with zero signup required. Tap the link in bio right now to test the Five-Minute AI live on BitcoinCrypto dot tech before the next candle prints!",
      description: `Can AI predict the next 5-minute crypto price move? 🚀
      
Explore our brand-new 5-Minute AI Prediction Arena & Free Quant Trading Suite:
👉 https://www.bitcoincrypto.tech/predictions

🔥 What's inside BitcoinCrypto.tech:
1. ⏱️ 5-Minute Prediction Arena (Scalp Targets & ATR Volatility)
2. 🎯 Multi-Timeframe AI Price Targets (5M, 15M, 1H, 4H, 1D)
3. 🔥 CoinGlass Liquidation Heatmaps & Short Squeeze Radar
4. 🐋 Whale Dark Pool & Order Book Depth Scanner
5. 🤖 Autonomous AI Trading Bot (Unbiased LONG & SHORT signals)

⚠️ Strictly for educational and informational research purposes only. Not financial advice. Zero gambling.

#Bitcoin #Crypto #CryptoTrading #CryptoPredictions #Ethereum #Solana #DayTrading #Scalping #TradingView #Shorts`,
      tags: ["Crypto Prediction", "5 Minute Scalping", "AI Trading", "Bitcoin", "Ethereum", "Solana", "Crypto Signals", "BitcoinCrypto Tech", "Order Book", "Shorts"],
      pinnedComment: `⏱️ Test the 5-Minute AI Prediction Arena & Live Institutional Suite for 100% Free: 👉 https://www.bitcoincrypto.tech/predictions`
    };
  } else if (chosenCategory === "ai_prediction") {
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
      title: `🚨 How To Predict Bitcoin Before US CPI Inflation Drops! #Shorts`,
      targetUrl: "https://www.bitcoincrypto.tech/cpi",
      visuals: [
        "[0:00 - 0:03] Hook: Live US BLS inflation countdown clock & historical volatility alerts",
        "[0:03 - 0:09] Website Feature: Live Wall Street consensus & 88% Fed rate cut odds gauge",
        "[0:09 - 0:16] AI Simulator: Bullish +4.8% pump target vs -5.2% liquidation flush projection",
        "[0:16 - 0:22] Outro: Pulsing button directing to free CPI simulator & bio link"
      ],
      voiceover: `Did you know you can predict Bitcoin volatility before the US inflation report drops? Head to the CPI tab on bitcoincrypto.tech. First, track the live countdown clock and the Wall Street consensus. Next, check the AI Scenario Simulator. If inflation cools below expectations, our quantitative model projects an immediate 4.8% Bitcoin breakout rally! If inflation comes in hot, forced liquidations trigger an immediate flush to support. Stop trading macro news blind. Run the free live CPI scenario simulator right now on bitcoincrypto.tech. Tap the link in bio!`,
      description: `Learn how to forecast Bitcoin crypto volatility before the US Bureau of Labor Statistics (BLS) Consumer Price Index (CPI) inflation report drops.
      
Explore the live US CPI scenario simulator & volatility radar for 100% free:
👉 https://www.bitcoincrypto.tech/cpi

⚠️ Strictly educational quantitative research and macroeconomic modeling. Not financial advice.

#CPI #Bitcoin #Crypto #CryptoTrading #Inflation #FederalReserve #MacroEconomics #Shorts`,
      tags: ["CPI", "Bitcoin CPI", "Inflation Crypto", "Crypto Volatility", "Macroeconomics", "Bitcoin Trading", "Federal Reserve", "Shorts"],
      pinnedComment: `🏛️ Run the free real-time US CPI Inflation & Bitcoin Volatility Scenario Simulator: 👉 https://www.bitcoincrypto.tech/cpi`
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
