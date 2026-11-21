/**
 * BitcoinCrypto.tech — Automated Daily YouTube Shorts & Video Content Engine
 * 
 * Generates viral 60-second YouTube Shorts scripts, voiceover narration,
 * on-screen visual cues, optimized high-CTR titles, descriptions, and hashtags.
 * 
 * Usage:
 *   node scripts/youtubeShortsGenerator.mjs                         # Generates a random high-converting short
 *   node scripts/youtubeShortsGenerator.mjs --category=how_to_find_predictions # Generates Bitcoin prediction tutorial
 *   node scripts/youtubeShortsGenerator.mjs --category=website_intro # Generates full website & all tabs tour
 *   node scripts/youtubeShortsGenerator.mjs --list                  # Lists all available short categories
 *   node scripts/youtubeShortsGenerator.mjs --all                   # Generates short packs for all categories
 *   npm run youtube:shorts                                         # Convenience npm script
 */

const POPULAR_COINS = [
  { symbol: "BTCUSDT", name: "Bitcoin", ticker: "BTC", slug: "bitcoin", target: "$95,000", stop: "$86,400", squeezeCluster: "$380M", wall: "$92,500" },
  { symbol: "ETHUSDT", name: "Ethereum", ticker: "ETH", slug: "ethereum", target: "$3,100", stop: "$2,450", squeezeCluster: "$190M", wall: "$2,850" },
  { symbol: "SOLUSDT", name: "Solana", ticker: "SOL", slug: "solana", target: "$195", stop: "$152", squeezeCluster: "$95M", wall: "$178" },
  { symbol: "XRPUSDT", name: "XRP", ticker: "XRP", slug: "xrp", target: "$1.85", stop: "$1.35", squeezeCluster: "$45M", wall: "$1.62" },
  { symbol: "SUIUSDT", name: "Sui", ticker: "SUI", slug: "sui", target: "$4.50", stop: "$3.10", squeezeCluster: "$35M", wall: "$3.85" },
  { symbol: "DOGEUSDT", name: "Dogecoin", ticker: "DOGE", slug: "dogecoin", target: "$0.42", stop: "$0.32", squeezeCluster: "$60M", wall: "$0.38" },
  { symbol: "BNBUSDT", name: "BNB", ticker: "BNB", slug: "binancecoin", target: "$720", stop: "$610", squeezeCluster: "$55M", wall: "$660" },
  { symbol: "ADAUSDT", name: "Cardano", ticker: "ADA", slug: "cardano", target: "$0.95", stop: "$0.72", squeezeCluster: "$28M", wall: "$0.84" }
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

export const ALL_SHORT_CATEGORIES = [
  "website_intro",
  "how_to_find_predictions",
  "bitcoin_predictions",
  "five_minute_arena",
  "whale_radar",
  "coinglass_squeeze",
  "cpi_macro",
  "ai_trading_bot",
  "orderbook_depth",
  "crypto_learn",
  "dca_simulator",
  "news_sentiment"
];

export async function generateDailyShort(categoryOverride = null, coinOverride = null) {
  let chosenCategory = ALL_SHORT_CATEGORIES[Math.floor(Math.random() * ALL_SHORT_CATEGORIES.length)];

  if (categoryOverride) {
    const lower = categoryOverride.toLowerCase().trim();
    if (lower === "intro" || lower === "website" || lower === "website_intro" || lower === "tour") {
      chosenCategory = "website_intro";
    } else if (lower === "find" || lower === "how_to_find" || lower === "how_to_find_predictions" || lower === "tutorial") {
      chosenCategory = "how_to_find_predictions";
    } else if (lower === "btc" || lower === "bitcoin" || lower === "bitcoin_predictions") {
      chosenCategory = "bitcoin_predictions";
    } else if (lower === "five_minute" || lower === "5min" || lower === "five_minute_arena" || lower === "arena") {
      chosenCategory = "five_minute_arena";
    } else if (lower === "whale" || lower === "whale_radar" || lower === "tab_whale_orders") {
      chosenCategory = "whale_radar";
    } else if (lower === "cpi" || lower === "cpi_macro" || lower === "tab_cpi_macro" || lower === "macro") {
      chosenCategory = "cpi_macro";
    } else if (lower === "bot" || lower === "trading_bot" || lower === "ai_trading_bot" || lower === "paper_trading") {
      chosenCategory = "ai_trading_bot";
    } else if (lower === "orderbook" || lower === "depth" || lower === "clob" || lower === "orderbook_depth") {
      chosenCategory = "orderbook_depth";
    } else if (lower === "learn" || lower === "masterclass" || lower === "curriculum" || lower === "crypto_learn") {
      chosenCategory = "crypto_learn";
    } else if (lower === "dca" || lower === "dca_simulator" || lower === "simulator") {
      chosenCategory = "dca_simulator";
    } else if (lower === "news" || lower === "news_sentiment" || lower === "tab_news_sentiment") {
      chosenCategory = "news_sentiment";
    } else if (lower === "coinglass" || lower === "squeeze" || lower === "coinglass_squeeze" || lower === "liquidations") {
      chosenCategory = "coinglass_squeeze";
    } else if (ALL_SHORT_CATEGORIES.includes(lower)) {
      chosenCategory = lower;
    }
  }

  let coin = POPULAR_COINS[Math.floor(Math.random() * POPULAR_COINS.length)];
  if (coinOverride) {
    const found = POPULAR_COINS.find(c => c.ticker.toLowerCase() === coinOverride.toLowerCase() || c.slug.toLowerCase() === coinOverride.toLowerCase());
    if (found) coin = found;
  }
  if (chosenCategory === "bitcoin_predictions" || chosenCategory === "how_to_find_predictions") {
    coin = POPULAR_COINS[0]; // Always Bitcoin for BTC specific shorts
  }

  const livePrice = await fetchLiveBinancePrice(coin.symbol, coin.ticker === "BTC" ? 91200 : (coin.ticker === "ETH" ? 3100 : 185));

  let shortPack = {};

  // 1. Full Website & All Tabs Tour
  if (chosenCategory === "website_intro") {
    shortPack = {
      category: "Website Introduction & All Tabs Tour",
      title: "🌐 STOP Paying For Crypto Tools! The Ultimate Free Trading Suite 🚀 #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech",
      template: "website_intro",
      visuals: [
        "[0:00 - 0:04] Hook: Holographic 3D Bitcoin with emergency alert: 'STOP PAYING FOR TRADING TOOLS'",
        "[0:04 - 0:11] Screen Glide: Top navigation showing Whale Orders, CPI Macro, Predictions & Heatmaps",
        "[0:11 - 0:18] Live Demo: Flipping through the 5-Minute Scalp Arena and $10k Paper Trading Bot",
        "[0:18 - 0:24] 100-Lesson Crypto Learn Masterclass preview with zero paywalls",
        "[0:24 - 0:28] High-CTR Outro card: '100% Free • No Signup Required • Link in Bio'"
      ],
      voiceover: "Stop paying fifty dollars a month for crypto trading subscriptions! What if you had institutional whale orders, US CPI inflation forecasts, real-time AI price predictions, and CoinGlass liquidation heatmaps all inside one single website for free? Welcome to BitcoinCrypto dot tech—your complete quantitative crypto terminal. Look at all the tabs at the top: track multi-million dollar whale buy walls, test live scalp predictions in our five-minute arena, run automated AI paper-trading strategies, and study our 100-lesson university curriculum from beginner to quant. Every single tool is one hundred percent free with zero signup required. Tap the link in bio right now to explore BitcoinCrypto dot tech!",
      description: `Meet BitcoinCrypto.tech — the 100% free quantitative cryptocurrency research and intelligence platform! 🚀

Explore all powerhouse tabs completely free (Zero signup required):
👉 https://www.bitcoincrypto.tech

🔥 What you can find on BitcoinCrypto.tech:
1. 🎯 Predictions Tab: AI trend forecasts & 5-Minute Scalp Arena
2. 🐋 Whale Orders Tab: Live tape of $1M-$10M+ block trades & resting walls
3. 🏛️ CPI Tab: US inflation countdown & Fed interest rate volatility simulator
4. 🔥 Heatmap Tab: Multi-exchange CoinGlass liquidation short squeeze clusters
5. 🤖 Trading Bot Tab: DeepQuant Tri-Pillar engine with $10k paper demo money
6. 📚 Learn Tab: Complete 10-chapter, 100-lesson crypto masterclass
7. 📰 News Tab: Breaking crypto news with real-time AI sentiment scoring

⚠️ Strictly for educational and informational research purposes only. Not financial advice. Zero gambling.

#Bitcoin #Crypto #CryptoTrading #CryptoTools #CryptoPredictions #Ethereum #WhaleAlert #DayTrading #Shorts`,
      tags: ["Crypto Website", "Free Crypto Tools", "Bitcoin Predictions", "Whale Orders", "Trading Strategy", "BitcoinCrypto Tech", "Day Trading", "Shorts"],
      pinnedComment: `🌐 Explore the full free quantitative crypto terminal (Whales, CPI, AI & Heatmaps): 👉 https://www.bitcoincrypto.tech`
    };
  }

  // 2. How to Find Bitcoin Predictions Step-by-Step
  else if (chosenCategory === "how_to_find_predictions") {
    shortPack = {
      category: "Step-by-Step Tutorial: How to Find Bitcoin Predictions",
      title: "🎯 How To Find Bitcoin AI Predictions in Under 10 Seconds! 📈 #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech/predictions/bitcoin",
      template: "five_minute",
      visuals: [
        "[0:00 - 0:04] Hook: Finger tapping smartphone screen with neon prompt: 'HOW TO FIND BITCOIN PREDICTIONS'",
        "[0:04 - 0:10] Step 1: Cursor clicks 'Predictions' in the top header menu",
        "[0:10 - 0:16] Step 2: Clicks 'Bitcoin (BTC)' — page smoothly loads live order book & AI target reticle",
        "[0:16 - 0:22] Step 3: Zoom into 5-Minute, 1-Hour & 24-Hour targets, stop-loss and 94% AI confidence score",
        "[0:22 - 0:28] Outro: Animated finger pointing to Link in Bio with pulsing 'Try Free Now' badge"
      ],
      voiceover: "Want to know where Bitcoin is heading before the next candle prints? Here is how to find AI predictions on BitcoinCrypto dot tech in under ten seconds. Step one: open BitcoinCrypto dot tech on your phone or PC. Step two: click the Predictions tab in the top menu. Step three: select Bitcoin. That is it! Right on your screen, our quantitative model calculates the next five-minute, one-hour, and twenty-four-hour price targets, dynamic stop-loss levels, and live order book imbalance scores! You can see whether smart money is accumulating or distributing before retail even notices. Try it completely free right now on BitcoinCrypto dot tech. Link in bio!",
      description: `Step-by-step tutorial: How to find live Bitcoin AI price predictions, next-candle targets, and quantitative confidence scores on BitcoinCrypto.tech! 🎯

Check live Bitcoin AI predictions 100% free:
👉 https://www.bitcoincrypto.tech/predictions/bitcoin

📌 Quick 3-Step Walkthrough:
1. Open https://www.bitcoincrypto.tech
2. Click the "Predictions" tab in the top navigation bar
3. Select "Bitcoin (BTC)" to view 5M, 15M, 1H, 4H, and 24H target levels + Order Book Imbalance!

⚠️ Strictly educational quantitative research. Not financial advice. Zero gambling.

#Bitcoin #BitcoinPrediction #CryptoPrediction #BTC #TradingTips #CryptoTrading #DayTrading #Shorts`,
      tags: ["Bitcoin Prediction", "How to Predict Bitcoin", "Crypto Predictions", "Bitcoin Price Target", "Day Trading", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `🎯 View real-time Bitcoin AI targets, stop-loss zones & confidence scores for free: 👉 https://www.bitcoincrypto.tech/predictions/bitcoin`
    };
  }

  // 3. Bitcoin AI Prediction Deep-Dive
  else if (chosenCategory === "bitcoin_predictions") {
    shortPack = {
      category: "Bitcoin AI Price Forecast & Order Book Imbalance",
      title: `🚨 BITCOIN NEXT CANDLE: AI Signals Massive Move! (${formatPrice(livePrice)}) #Shorts`,
      targetUrl: "https://www.bitcoincrypto.tech/predictions/bitcoin",
      template: "viral",
      visuals: [
        "[0:00 - 0:04] Hook: 3D Gold Bitcoin with emergency flashing HUD: 'CRITICAL TARGET UNLOCKED'",
        "[0:04 - 0:11] Live Bitcoin candlestick chart with order book depth walls absorbing volume",
        "[0:11 - 0:18] AI Model Projection displaying next 24-hour target and short liquidation squeeze zone",
        "[0:18 - 0:25] Order Book Imbalance gauge showing 78% institutional buyer dominance",
        "[0:25 - 0:28] Outro: Pulsing button directing viewers to check live Bitcoin forecast in bio link"
      ],
      voiceover: `Bitcoin is trading right now at ${formatPrice(livePrice)}, and our AI order book model just flagged a massive quantitative signal! Smart money is quietly stacking resting limit buy orders at support, while short sellers have piled over 380 million dollars in liquidations right above current resistance. When price taps this level, forced liquidations will fuel a violent short squeeze cascade toward our next target! Do not trade Bitcoin blind. Head to the Predictions tab on BitcoinCrypto dot tech to see live multi-timeframe targets and confidence scores for free. Tap the link in bio!`,
      description: `Analyzing live Bitcoin (BTC) market structure, Level-2 order book depth, CVD taker volume, and AI price prediction targets.

Check live Bitcoin AI predictions 100% free:
👉 https://www.bitcoincrypto.tech/predictions/bitcoin

⚠️ Strictly educational research and quantitative market modeling. Not financial advice.

#Bitcoin #BTC #BitcoinNews #CryptoPredictions #CryptoTrading #ShortSqueeze #TradingView #Shorts`,
      tags: ["Bitcoin", "BTC", "Bitcoin Prediction", "Crypto Signals", "Order Book", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `📊 Track live Bitcoin next-candle targets and order book imbalance for free: 👉 https://www.bitcoincrypto.tech/predictions/bitcoin`
    };
  }

  // 4. 5-Minute AI Prediction Arena
  else if (chosenCategory === "five_minute_arena") {
    shortPack = {
      category: "5-Minute AI Scalp Arena",
      title: "⏱️ Can AI Predict The Next 5-Minute Candle? Testing Live! 🚨 #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech/predictions",
      template: "five_minute",
      visuals: [
        "[0:00 - 0:04] Hook: Ticking 5-minute digital countdown clock with neon alert: 'CAN AI SCALP CRYPTO?'",
        "[0:04 - 0:12] 5-Minute Arena Interface showing BTC, ETH, SOL scalp targets with 95% AI confidence",
        "[0:12 - 0:19] Real-time ATR volatility band and Level-2 order book micro-flow updates",
        "[0:19 - 0:25] Next-candle breakout verification with exact take-profit execution",
        "[0:25 - 0:28] Outro: High-contrast card: 'Test the 5-Minute Arena Free • Link in Bio'"
      ],
      voiceover: "Can an artificial intelligence predict the next five-minute crypto candle? Let's test it live! On BitcoinCrypto dot tech, open the Predictions tab and scroll down to the brand-new Five-Minute Arena. Every five minutes, our quantitative engine analyzes Level-Two order book imbalance, tick-by-tick taker volume, and ATR volatility to give you ultra-short-term scalp targets for Bitcoin, Ethereum, and Solana with up to ninety-five percent confidence! Whether you are a day trader or just learning market microstructure, this tool is a game changer. Test the Five-Minute AI live for free on BitcoinCrypto dot tech. Link in bio!",
      description: `Can AI predict the next 5-minute crypto move? ⏱️ Test our brand-new 5-Minute AI Prediction Arena for scalp traders!

Test the 5-Minute Scalp Arena 100% free:
👉 https://www.bitcoincrypto.tech/predictions

🔥 What the 5-Minute Arena calculates:
- High-precision next-candle scalp targets (BTC, ETH, SOL)
- Dynamic Average True Range (ATR) volatility channels
- Instant Order Book Imbalance (OBI) directional bias
- Live quantitative confidence ratings

⚠️ Strictly educational quantitative analytics. Not financial advice. Zero gambling.

#Scalping #DayTrading #5MinuteScalp #Bitcoin #Ethereum #CryptoPredictions #CryptoTrading #Shorts`,
      tags: ["5 Minute Scalping", "Crypto Day Trading", "AI Crypto Prediction", "Bitcoin Scalping", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `⏱️ Test the live 5-Minute AI Prediction Arena for free: 👉 https://www.bitcoincrypto.tech/predictions`
    };
  }

  // 5. Whale Radar & Dark Pool Tape
  else if (chosenCategory === "whale_radar") {
    shortPack = {
      category: "Whale Radar & Dark Pool Tape",
      title: "🐋 SPY ON $10,000,000 WHALE ORDERS FOR FREE! (Secret Tool) #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech/whale-orders",
      template: "viral",
      visuals: [
        "[0:00 - 0:04] Hook: Massive flashing radar sweep with green text: '$10M WHALE BUY WALL DETECTED'",
        "[0:04 - 0:11] Live Whale Orders tape displaying real-time block trades over $500,000",
        "[0:11 - 0:18] Order book visualization showing resting institutional iceberg limit orders",
        "[0:18 - 0:24] Cumulative Volume Delta (CVD) divergence showing whales absorbing retail panic selling",
        "[0:24 - 0:28] Outro: Link in Bio CTA card with glowing radar icon"
      ],
      voiceover: "Retail traders look at candlestick charts, but smart money looks at whale orders. Look at this: on the Whale Radar tab at BitcoinCrypto dot tech, you can see multi-million-dollar institutional orders in real time. Just now, a ten million dollar limit buy wall printed on the tape. While retail was panic selling the dip, institutions were quietly placing massive resting orders to absorb all the selling pressure! Stop trading against the whales and start tracking what they actually do. Watch the live whale tape for free on BitcoinCrypto dot tech. Tap the link in bio!",
      description: `Track real-time institutional cryptocurrency whale block trades ($500k to $10M+) and dark pool limit orders.

Watch the live Whale Orders Radar 100% free:
👉 https://www.bitcoincrypto.tech/whale-orders

🐋 Why Whale Orders matter:
- Detect institutional limit bid/ask walls before retail notices
- Spot dark pool absorption during market panics
- Confirm genuine trend reversals with Cumulative Volume Delta (CVD)

⚠️ Strictly educational analytics. Zero financial advice.

#WhaleAlert #CryptoWhales #SmartMoney #Bitcoin #Ethereum #OrderBook #TradingStrategy #Shorts`,
      tags: ["Whale Alert", "Crypto Whales", "Whale Orders", "Smart Money", "Order Book", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `🐋 Watch real-time institutional whale block orders and resting limit walls: 👉 https://www.bitcoincrypto.tech/whale-orders`
    };
  }

  // 6. CoinGlass Liquidation Heatmap & Short Squeeze
  else if (chosenCategory === "coinglass_squeeze") {
    shortPack = {
      category: "CoinGlass Liquidation Heatmap & Short Squeeze",
      title: "🔥 HOW TO PREDICT BITCOIN SHORT SQUEEZES! (Liquidation Heatmap) #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech/coinglass",
      template: "viral",
      visuals: [
        "[0:00 - 0:04] Hook: Neon thermal heatmap glowing bright yellow with alert: '$380M TRAPPED LIQUIDATIONS'",
        "[0:04 - 0:11] Multi-exchange CoinGlass heatmap spectrogram showing dense leverage clusters",
        "[0:11 - 0:18] Price sweeping upward into the bright cluster, triggering forced market buy orders",
        "[0:18 - 0:24] Short squeeze explosion with live profit targets printing on screen",
        "[0:24 - 0:28] Outro: Animated pulsing bio link button"
      ],
      voiceover: "Over three hundred and eighty million dollars in short sellers are about to get liquidated! Look at this bright glowing cluster on the heatmap. In crypto, over seventy-five percent of volume is leveraged perpetual futures. When too many traders short the market with high leverage, their liquidation prices create dense liquidity pools. Market makers love to drive price right into these clusters to trigger forced buy liquidations and spark a massive short squeeze! You can track live liquidation heatmaps across Binance, Bybit, and OKX for free on BitcoinCrypto dot tech. Tap the link in bio now!",
      description: `Learn how to read CoinGlass cryptocurrency liquidation heatmaps to predict explosive short squeeze cascades!

Explore the live CoinGlass Liquidation Heatmap for free:
👉 https://www.bitcoincrypto.tech/coinglass

🔥 Heatmap Secrets:
- Bright yellow/purple spectrogram zones show where leveraged traders get liquidated
- High-density liquidation clusters act as magnets for institutional market makers
- Breaking through clusters triggers cascading forced market orders

⚠️ Strictly educational derivatives research. Not financial advice.

#CoinGlass #LiquidationHeatmap #ShortSqueeze #Bitcoin #CryptoTrading #FuturesTrading #Shorts`,
      tags: ["CoinGlass", "Liquidation Heatmap", "Short Squeeze", "Bitcoin Futures", "Crypto Trading", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `🗺️ Access the free real-time CoinGlass Liquidation Heatmap & Squeeze Scanner: 👉 https://www.bitcoincrypto.tech/coinglass`
    };
  }

  // 7. US CPI Macro Volatility Simulator
  else if (chosenCategory === "cpi_macro") {
    shortPack = {
      category: "US CPI Macro Volatility Simulator",
      title: "🏛️ Predict Bitcoin Volatility Before US CPI Inflation Drops! 🚨 #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech/cpi",
      template: "cpi",
      visuals: [
        "[0:00 - 0:04] Hook: Live US BLS inflation countdown timer ticking down to 00:00:00",
        "[0:04 - 0:11] CPI Dashboard showing Wall Street consensus vs Federal Reserve rate cut odds gauge",
        "[0:11 - 0:18] AI Scenario Simulator: Toggling 'Cool CPI (-0.2%)' showing +5.4% Bitcoin pump forecast",
        "[0:18 - 0:24] Toggling 'Hot CPI (+0.3%)' showing liquidation flush target",
        "[0:24 - 0:28] Outro: Animated card pointing to CPI simulator in bio link"
      ],
      voiceover: "Did you know you can forecast Bitcoin price swings before the US inflation report drops? Head to the CPI tab on BitcoinCrypto dot tech. First, check the live countdown clock to the next Bureau of Labor Statistics release. Next, inspect the Wall Street consensus and Federal Reserve rate cut odds. Then, run our AI Scenario Simulator: if inflation cools below expectations, our model projects an immediate five point four percent Bitcoin breakout as the US Dollar weakens! If inflation prints hot, you see the exact downside support levels. Stop trading macro news blind. Test the free CPI simulator on BitcoinCrypto dot tech. Link in bio!",
      description: `Learn how to forecast Bitcoin volatility before the US Bureau of Labor Statistics (BLS) Consumer Price Index (CPI) inflation report drops.

Explore the live US CPI scenario simulator & volatility radar 100% free:
👉 https://www.bitcoincrypto.tech/cpi

🏛️ Features on the CPI Tab:
- Real-time countdown to next BLS inflation release
- Wall Street consensus forecast & Fed rate cut probability gauge
- Interactive AI Scenario Simulator for bullish vs bearish prints

⚠️ Strictly educational quantitative macroeconomic modeling. Not investment advice.

#CPI #Bitcoin #Inflation #FederalReserve #MacroEconomics #CryptoTrading #CryptoNews #Shorts`,
      tags: ["CPI", "Bitcoin CPI", "Inflation Crypto", "Federal Reserve", "Crypto Volatility", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `🏛️ Run the free real-time US CPI Inflation & Bitcoin Volatility Scenario Simulator: 👉 https://www.bitcoincrypto.tech/cpi`
    };
  }

  // 8. AI Trading Bot & Free $10,000 Paper Trading Demo
  else if (chosenCategory === "ai_trading_bot") {
    shortPack = {
      category: "AI Trading Bot & $10k Paper Trading Demo",
      title: "🤖 Test An AI Crypto Trading Bot With $10,000 FREE Demo Money! #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech/tools/trading-bot",
      template: "viral",
      visuals: [
        "[0:00 - 0:04] Hook: Cyber robotic interface booting up: '10,000 USDT SIMULATED BALANCE READY'",
        "[0:04 - 0:11] AI Trading Bot dashboard showing live LONG and SHORT signal confluence",
        "[0:11 - 0:18] DeepQuant Tri-Pillar Engine breakdown: Technical RSI + Order Book Depth + Macro News",
        "[0:18 - 0:24] Automated paper execution with exact Entry, Stop-Loss, and TP1/TP2 targets",
        "[0:24 - 0:28] Outro: High-converting CTA: 'Test Bot Free • No Real Money • Link in Bio'"
      ],
      voiceover: "Never risk your hard-earned money testing a new crypto strategy! On BitcoinCrypto dot tech, you can test our autonomous AI Trading Bot with a free ten-thousand-dollar simulated paper-trading account. Look at how it works: our DeepQuant Tri-Pillar Engine combines technical momentum indicators, Level-Two order book imbalance, and macroeconomic sentiment to formulate completely unbiased LONG and SHORT trade blueprints with exact stop-loss and take-profit targets! You can practice execution risk-free with zero deposit required. Check out the AI Trading Bot for free on BitcoinCrypto dot tech. Tap the link in bio!",
      description: `Test our DeepQuant Tri-Pillar AI Trading Bot with a free $10,000 simulated paper-trading balance! 🤖

Access the free AI Trading Bot terminal:
👉 https://www.bitcoincrypto.tech/tools/trading-bot

🔥 What the DeepQuant Engine provides:
- Unbiased algorithmic LONG & SHORT trade setups
- Multi-pillar confluence: Technical Indicators + Order Book Flow + Macro Sentiment
- Dynamic Entry, Stop-Loss, and tiered Take-Profit targets (TP1, TP2, TP3)
- 100% Free virtual demo wallet stored locally in your browser

⚠️ Strictly for educational and research simulation purposes. Not financial advice. Zero real money.

#AITrading #TradingBot #PaperTrading #CryptoBot #CryptoTrading #DayTrading #Bitcoin #Shorts`,
      tags: ["AI Trading Bot", "Crypto Trading Bot", "Paper Trading", "Crypto Signals", "Trading Strategy", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `🤖 Test the free DeepQuant AI Trading Bot & $10k virtual paper simulator: 👉 https://www.bitcoincrypto.tech/tools/trading-bot`
    };
  }

  // 9. Level-2 Order Book Depth & CVD
  else if (chosenCategory === "orderbook_depth") {
    shortPack = {
      category: "Level-2 Order Book Depth & CVD Absorption",
      title: "📊 What The Order Book Reveals That Normal Charts HIDE! 👁️ #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech/orderbook",
      template: "viral",
      visuals: [
        "[0:00 - 0:04] Hook: Normal candlestick chart compared side-by-side with Level-2 depth ladder",
        "[0:04 - 0:11] Live bid and ask depth ladder displaying resting orders and real-time spread",
        "[0:11 - 0:18] Cumulative Volume Delta (CVD) indicator showing negative delta while price holds support",
        "[0:18 - 0:24] Institutional absorption revealed: whale limit wall preventing price from falling",
        "[0:24 - 0:28] Outro: Link in Bio card with Order Book icon"
      ],
      voiceover: "Normal candlestick charts only show you what already happened in the past. But the Central Limit Order Book shows you what is about to happen next! On the Order Book tab at BitcoinCrypto dot tech, you can see live resting bids and asks across the market. Look right here: when aggressive market sellers dump millions into the market, but the price refuses to drop, that is institutional absorption! A whale limit wall is eating all the supply before price explodes higher. Master real order flow for free on BitcoinCrypto dot tech. Tap the link in bio!",
      description: `Discover how Central Limit Order Books (CLOB) and Cumulative Volume Delta (CVD) reveal institutional market manipulation and liquidity absorption.

Explore the live Level-2 Order Book Terminal:
👉 https://www.bitcoincrypto.tech/orderbook

📊 Key Order Flow Concepts:
- Passive limit orders (makers) vs Aggressive market orders (takers)
- Cumulative Volume Delta (CVD) divergences
- Spotting fake spoofing walls before they cancel

⚠️ Strictly educational market microstructure research. Not financial advice.

#OrderBook #OrderFlow #CVD #TradingMicrostructure #DayTrading #CryptoTrading #Bitcoin #Shorts`,
      tags: ["Order Book", "Order Flow", "CVD", "Market Microstructure", "Crypto Trading", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `📊 Inspect real-time Level-2 order book depth and CVD absorption for free: 👉 https://www.bitcoincrypto.tech/orderbook`
    };
  }

  // 10. Crypto Learn 100-Lesson Masterclass
  else if (chosenCategory === "crypto_learn") {
    shortPack = {
      category: "Crypto Learn 100-Lesson Masterclass",
      title: "🎓 STOP Buying Courses! Free 100-Lesson Crypto University 📚 #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech/learn",
      template: "website_intro",
      visuals: [
        "[0:00 - 0:04] Hook: Stacks of expensive trading courses with a big red stamp: 'STOP PAYING FOR COURSES'",
        "[0:04 - 0:11] Smooth scroll through the 10 chapters on the /learn curriculum",
        "[0:11 - 0:18] Chapter preview: Satoshi Consensus, Proof-of-Work thermodynamics, and Kelly Criterion risk math",
        "[0:18 - 0:24] Student FAQs and interactive pedagogical breakdowns on every lesson page",
        "[0:24 - 0:28] Outro: Animated graduation cap with '100% Free Forever • Link in Bio'"
      ],
      voiceover: "Crypto influencers charge hundreds of dollars for courses that just teach basic candlestick patterns. We built a complete 10-chapter, 100-lesson quantitative crypto masterclass, and it is one hundred percent free forever! Head to the Learn tab on BitcoinCrypto dot tech. You will master everything from Satoshi consensus and Proof-of-Work thermodynamics to perpetual futures funding rates, order flow CVD analysis, and the Kelly Criterion risk management formula. Every lesson has practical steps, retail trap warnings, and student FAQs. Start learning for free on BitcoinCrypto dot tech. Link in bio!",
      description: `Complete 10-chapter, 100-lesson quantitative cryptocurrency curriculum from beginner fundamentals to advanced derivatives and risk management.

Start the free Crypto Learn curriculum:
👉 https://www.bitcoincrypto.tech/learn

📚 What you will learn:
- Chapter 1: Bitcoin Architecture & Satoshi Consensus
- Chapter 2: Cryptographic Hashing & SHA-256
- Chapter 3: Proof-of-Work Thermodynamics
- Chapters 4-7: Market Microstructure, CVD & Liquidation Cascades
- Chapters 8-10: Macroeconomics, Kelly Criterion & Capital Preservation

⚠️ Strictly educational curriculum. Zero investment advice.

#CryptoEducation #FreeCourse #CryptoTrading #Bitcoin #Blockchain #RiskManagement #Shorts`,
      tags: ["Crypto Education", "Free Crypto Course", "Bitcoin Course", "Blockchain Education", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `🎓 Complete the 100-lesson interactive Crypto Learn curriculum for 100% free: 👉 https://www.bitcoincrypto.tech/learn`
    };
  }

  // 11. Free DCA Accumulation Simulator
  else if (chosenCategory === "dca_simulator") {
    shortPack = {
      category: "DCA Accumulation Simulator",
      title: "💰 The Secret DCA Strategy That Beats 99% Of Day Traders! #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech/tools/dca-simulator",
      template: "website_intro",
      visuals: [
        "[0:00 - 0:04] Hook: Frustrated day trader versus relaxed investor stacking Bitcoin with DCA",
        "[0:04 - 0:11] Interactive DCA Simulator on BitcoinCrypto.tech showing $100/week accumulation curve",
        "[0:11 - 0:18] Historical backtest across previous 4-year halving cycles showing 400%+ compound returns",
        "[0:18 - 0:24] Drawdown comparison proving DCA eliminates emotional timing errors",
        "[0:24 - 0:28] Outro: Link in Bio card with 'Run Free DCA Simulator'"
      ],
      voiceover: "Ninety percent of day traders lose money, but this simple mathematical strategy consistently beats the market over every four-year cycle! It is called Dollar-Cost Averaging, or DCA. On the DCA Simulator tab at BitcoinCrypto dot tech, you can simulate investing fifty or one hundred dollars a week into Bitcoin, Ethereum, or Solana. Watch the backtest: by systematically buying dips without emotional timing, your average cost basis stays protected against wild volatility. Test your own custom accumulation schedule for free on BitcoinCrypto dot tech. Link in bio!",
      description: `Test dollar-cost averaging (DCA) accumulation schedules versus lump-sum investing across Bitcoin's historical 4-year halving cycles.

Run the free interactive DCA Simulator:
👉 https://www.bitcoincrypto.tech/tools/dca-simulator

💰 Why DCA works:
- Removes emotional stress and panic selling
- Automatically buys more coins when prices are depressed
- Maximizes compound geometric growth across multi-year cycles

⚠️ Strictly educational simulation tool. Not financial advice.

#DollarCostAveraging #DCA #Bitcoin #InvestingStrategy #CryptoInvesting #WealthBuilding #Shorts`,
      tags: ["DCA", "Dollar Cost Averaging", "Bitcoin Investing", "Crypto Strategy", "DCA Simulator", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `💰 Run the free interactive Dollar-Cost Averaging (DCA) Simulator: 👉 https://www.bitcoincrypto.tech/tools/dca-simulator`
    };
  }

  // 12. Real-Time News & AI Sentiment Scoring
  else {
    shortPack = {
      category: "Live Crypto News & Macro Sentiment",
      title: "📰 BEAT THE MARKET NEWS: Real-Time AI Sentiment Scoring! 🚨 #Shorts",
      targetUrl: "https://www.bitcoincrypto.tech/news",
      template: "viral",
      visuals: [
        "[0:00 - 0:04] Hook: Breaking News Cyber Alert with flashing market ticker and sentiment meter",
        "[0:04 - 0:11] Live headline scanner with automated green bullish and red bearish sentiment scoring",
        "[0:11 - 0:18] Institutional ETF net inflow tracker showing daily BlackRock and Fidelity flows",
        "[0:18 - 0:24] Correlation matrix showing news sentiment impact on live Bitcoin price moves",
        "[0:24 - 0:28] Outro: Link in Bio call to action with News icon"
      ],
      voiceover: "Breaking crypto news moves billions of dollars in seconds, but retail traders always hear about it too late! On the News tab at BitcoinCrypto dot tech, our real-time AI sentiment engine scans breaking headlines, ETF institutional flows, and macroeconomic releases 24/7. It calculates instant bullish or bearish sentiment heat scores before the market finishes reacting! Stop getting caught off guard by volatility wicks. Track live institutional crypto news and sentiment for free on BitcoinCrypto dot tech. Tap the link in bio!",
      description: `Track real-time cryptocurrency news sentiment, institutional ETF flow trends, and macroeconomic headlines.

Read live breaking crypto news & sentiment for free:
👉 https://www.bitcoincrypto.tech/news

📰 What you can find on the News Tab:
- Instant AI positive/negative sentiment scoring
- Institutional Spot Bitcoin & Ethereum ETF net inflow trackers
- Curated macroeconomic monetary policy headlines

⚠️ Strictly educational analytics. Not financial advice.

#CryptoNews #Bitcoin #Ethereum #CryptoMarket #BreakingNews #MacroEconomics #TradingView #Shorts`,
      tags: ["Crypto News", "Bitcoin News", "Market Sentiment", "Crypto Trading", "ETF Inflows", "BitcoinCrypto Tech", "Shorts"],
      pinnedComment: `📰 Scan breaking crypto headlines and live AI sentiment scoring for 100% free: 👉 https://www.bitcoincrypto.tech/news`
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

// CLI Execution & Argument Parsing
async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--list") || args.includes("-l")) {
    console.log("══════════════════════════════════════════════════════════════════════");
    console.log("  📚 BitcoinCrypto.tech — Available YouTube Shorts Topics (12 Categories)");
    console.log("══════════════════════════════════════════════════════════════════════\n");
    ALL_SHORT_CATEGORIES.forEach((cat, idx) => {
      console.log(`  ${(idx + 1).toString().padStart(2, " ")}. --category=${cat}`);
    });
    console.log("\nUsage examples:");
    console.log("  node scripts/youtubeShortsGenerator.mjs --category=how_to_find_predictions");
    console.log("  node scripts/youtubeShortsGenerator.mjs --category=website_intro");
    console.log("  node scripts/youtubeShortsGenerator.mjs --category=whale_radar");
    console.log("  node scripts/youtubeShortsGenerator.mjs --all\n");
    return;
  }

  if (args.includes("--all")) {
    console.log("══════════════════════════════════════════════════════════════════════");
    console.log("  🎬 Generating Complete 12-Topic YouTube Shorts Pack for BitcoinCrypto.tech");
    console.log("══════════════════════════════════════════════════════════════════════\n");
    for (const cat of ALL_SHORT_CATEGORIES) {
      const pack = await generateDailyShort(cat);
      console.log(`\n======================================================================`);
      console.log(`📌 TOPIC: ${pack.category.toUpperCase()}`);
      console.log(`🔥 TITLE: ${pack.title}`);
      console.log(`🔗 URL:   ${pack.targetUrl}`);
      console.log(`🎙️ VOICEOVER:\n${pack.voiceover}\n`);
    }
    return;
  }

  let catArg = null;
  const foundCat = args.find(a => a.startsWith("--category="));
  if (foundCat) catArg = foundCat.split("=")[1];

  let coinArg = null;
  const foundCoin = args.find(a => a.startsWith("--coin="));
  if (foundCoin) coinArg = foundCoin.split("=")[1];

  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  🎬 BitcoinCrypto.tech — Automated Daily YouTube Shorts Generator");
  console.log("══════════════════════════════════════════════════════════════════════\n");

  const pack = await generateDailyShort(catArg, coinArg);

  console.log(`📌 CATEGORY:      ${pack.category}`);
  console.log(`🔥 SHORT TITLE:   ${pack.title}`);
  console.log(`🌐 TARGET URL:    ${pack.targetUrl}\n`);

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
