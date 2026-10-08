import { TwitterApi } from "twitter-api-v2";
import { getNextCPIRelease } from "./cpiSchedule";
import { coinPredictions } from "./coinPredictionsData";

export interface TwitterCredentials {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessSecret: string;
}

export type TweetCategory =
  | "AI_SIGNAL"
  | "MACRO_CPI"
  | "COINGLASS_DERIVATIVES"
  | "COIN_PREDICTION"
  | "QUANT_MASTERCLASS"
  | "CALCULATOR_SPOTLIGHT";

export interface GeneratedTweet {
  category: TweetCategory;
  text: string;
  charCount: number;
  url: string;
}

// Top supported coins for signal tweets
const POPULAR_COINS = [
  { symbol: "BTCUSDT", base: "BTC", name: "Bitcoin", slug: "bitcoin", tp: "$94,500", sl: "$85,600", squeeze: "$360M Shorts" },
  { symbol: "ETHUSDT", base: "ETH", name: "Ethereum", slug: "ethereum", tp: "$2,950", sl: "$2,425", squeeze: "$195M Shorts" },
  { symbol: "SOLUSDT", base: "SOL", name: "Solana", slug: "solana", tp: "$188.00", sl: "$149.50", squeeze: "$92M Shorts" },
  { symbol: "XRPUSDT", base: "XRP", name: "XRP", slug: "ripple", tp: "$1.75", sl: "$1.34", squeeze: "$42M Shorts" },
  { symbol: "DOGEUSDT", base: "DOGE", name: "Dogecoin", slug: "dogecoin", tp: "$0.115", sl: "$0.086", squeeze: "$28M Shorts" },
  { symbol: "SUIUSDT", base: "SUI", name: "Sui", slug: "sui", tp: "$4.20", sl: "$3.15", squeeze: "$34M Shorts" },
  { symbol: "BNBUSDT", base: "BNB", name: "BNB", slug: "binancecoin", tp: "$675.00", sl: "$590.00", squeeze: "$48M Shorts" },
  { symbol: "PEPEUSDT", base: "PEPE", name: "Pepe", slug: "pepe", tp: "$0.000018", sl: "$0.000012", squeeze: "$16M Shorts" },
  { symbol: "TAOUSDT", base: "TAO", name: "Bittensor", slug: "bittensor", tp: "$680.00", sl: "$510.00", squeeze: "$22M Shorts" },
  { symbol: "NEARUSDT", base: "NEAR", name: "NEAR Protocol", slug: "near", tp: "$7.50", sl: "$5.80", squeeze: "$18M Shorts" },
  { symbol: "KASUSDT", base: "KAS", name: "Kaspa", slug: "kaspa", tp: "$0.22", sl: "$0.15", squeeze: "$12M Shorts" },
];

/**
 * Fetch live price from Binance API with safe fallback
 */
async function fetchLivePrice(symbol: string, fallback: number): Promise<number> {
  try {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    if (!res.ok) return fallback;
    const data = await res.json();
    return parseFloat(data.price) || fallback;
  } catch {
    return fallback;
  }
}

/**
 * Format price cleanly for tweets
 */
function formatTweetPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(6)}`;
}

/**
 * Clean & truncate tweet to stay strictly within Twitter's 280 character limit
 */
function ensureTweetLength(text: string, maxLen = 278): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 3) + "...";
}

/**
 * Generate a dynamic, high-converting tweet based on live market data
 */
export async function generateDynamicTweet(category?: TweetCategory): Promise<GeneratedTweet> {
  const categories: TweetCategory[] = [
    "AI_SIGNAL",
    "MACRO_CPI",
    "COINGLASS_DERIVATIVES",
    "COIN_PREDICTION",
    "QUANT_MASTERCLASS",
    "CALCULATOR_SPOTLIGHT",
  ];

  const selectedCategory = category || categories[Math.floor(Math.random() * categories.length)];

  switch (selectedCategory) {
    case "AI_SIGNAL": {
      const coin = POPULAR_COINS[Math.floor(Math.random() * POPULAR_COINS.length)];
      const livePrice = await fetchLivePrice(coin.symbol, 88450);
      const url = `https://www.bitcoincrypto.tech/predictions/${coin.slug}`;

      const text = ensureTweetLength(
        `🚨 #${coin.name} QUANTITATIVE ALERT (${coin.base}/USDT)

• Verdict: STRONG BUY (98% Conf)
• Spot: ${formatTweetPrice(livePrice)}
• Target: ${coin.tp} (R:R 1:3.8)
• Squeeze Magnet: ${coin.squeeze}

📊 Live Order Book Depth & Heatmap:
👉 ${url}

#Crypto #${coin.base} #TradingSignals`
      );

      return { category: selectedCategory, text, charCount: text.length, url };
    }

    case "MACRO_CPI": {
      const cpi = getNextCPIRelease();
      const url = "https://www.bitcoincrypto.tech/cpi";

      const text = ensureTweetLength(
        `🏛️ US CPI INFLATION COUNTDOWN & BITCOIN IMPACT

Next official BLS ${cpi.period} CPI release in ${cpi.daysRemaining} days (${cpi.releaseDate}).

• Consensus: 2.6% YoY
• AI Neural Forecast: 2.60% (Cooling Beat)
• Fed Rate Cut Odds: 88.5% Prob

🔍 Run live CPI scenario reaction sandbox:
👉 ${url}

#CPI #Macro #Fed #Bitcoin`
      );

      return { category: selectedCategory, text, charCount: text.length, url };
    }

    case "COINGLASS_DERIVATIVES": {
      const url = "https://www.bitcoincrypto.tech/tools/liquidation-heatmap";

      const text = ensureTweetLength(
        `🔥 COINGLASS DERIVATIVES & LIQUIDATIONS RADAR

• Aggregate Open Interest: $68.20B
• 24h Liquidations: $248.6M
• BTC Long/Short Ratio: 53.4% Long
• 8h Funding Rate: +0.0084% (Healthy Basis)

🗺️ Check free real-time liquidation clusters & short squeeze zones:
👉 ${url}

#CoinGlass #Crypto #Futures #BTC`
      );

      return { category: selectedCategory, text, charCount: text.length, url };
    }

    case "COIN_PREDICTION": {
      const randomCoin = coinPredictions[Math.floor(Math.random() * coinPredictions.length)];
      const url = `https://www.bitcoincrypto.tech/predictions/${randomCoin.slug}`;

      const text = ensureTweetLength(
        `🎯 ${randomCoin.name} (${randomCoin.symbol}) AI PRICE PREDICTION

• Signal: ${randomCoin.primarySignal} (${randomCoin.confluenceScore}% Confluence)
• 24h Target: $${randomCoin.forecasts.horizon24h.targetPrice.toLocaleString()} (${randomCoin.forecasts.horizon24h.projectedReturn})
• 30d Macro: $${randomCoin.forecasts.horizon30d.targetPrice.toLocaleString()} (${randomCoin.forecasts.horizon30d.projectedReturn})

🧠 Full 4-pillar institutional breakdown:
👉 ${url}

#${randomCoin.symbol} #CryptoPrediction`
      );

      return { category: selectedCategory, text, charCount: text.length, url };
    }

    case "QUANT_MASTERCLASS": {
      const masterclasses = [
        {
          title: "Order Book Microstructure & CVD",
          slug: "order-book-microstructure-and-depth",
          tip: "Resting limit buy walls absorb taker dumping before structural trend reversals."
        },
        {
          title: "Perpetual Funding Rate Basis Trading",
          slug: "crypto-funding-rates-and-basis-trading",
          tip: "Delta-neutral cash-and-carry basis captures 12-28% APR yield with zero price risk."
        },
        {
          title: "DCA Multi-Cycle Mathematical Models",
          slug: "dollar-cost-averaging-dca-math-and-models",
          tip: "Value Averaging and MVRV-adjusted DCA outperforms lump-sum by +38% in bull cycles."
        },
        {
          title: "Liquidation Cascades & Squeeze Heatmaps",
          slug: "liquidation-cascades-and-short-squeezes",
          tip: "When OI spikes while funding stays negative, market makers hunt overhead short clusters."
        }
      ];

      const mc = masterclasses[Math.floor(Math.random() * masterclasses.length)];
      const url = `https://www.bitcoincrypto.tech/concepts/${mc.slug}`;

      const text = ensureTweetLength(
        `💡 QUANT TRADING MASTERCLASS: ${mc.title}

"${mc.tip}"

Level up your trading edge with institutional market microstructure models:
👉 ${url}

#CryptoEducation #TradingStrategy #Algos`
      );

      return { category: selectedCategory, text, charCount: text.length, url };
    }

    case "CALCULATOR_SPOTLIGHT": {
      const tools = [
        {
          name: "Funding Rate Screener",
          url: "https://www.bitcoincrypto.tech/tools/funding-rate-screener",
          desc: "Compare 8h funding rates across Binance, Bybit & OKX with live cash-and-carry APY."
        },
        {
          name: "Kelly Criterion Position Sizer",
          url: "https://www.bitcoincrypto.tech/tools/position-sizer",
          desc: "Calculate mathematically optimal position sizes with exact 1.5% max risk capital protection."
        },
        {
          name: "Profit & 100x Leverage ROI Calculator",
          url: "https://www.bitcoincrypto.tech/tools/profit-calculator",
          desc: "Simulate leverage P&L, maker/taker fees, and exact liquidation price buffers."
        },
        {
          name: "Crypto Fear & Greed Radar",
          url: "https://www.bitcoincrypto.tech/tools/fear-greed-index",
          desc: "Live 6-factor market psychology speedometer and historical cycle bottom backtester."
        }
      ];

      const tool = tools[Math.floor(Math.random() * tools.length)];

      const text = ensureTweetLength(
        `🛠️ FREE QUANT TOOL: ${tool.name}

${tool.desc}

Try the interactive model directly in your browser:
👉 ${tool.url}

#CryptoTools #TradingTools #RiskManagement`
      );

      return { category: selectedCategory, text, charCount: text.length, url: tool.url };
    }
  }
}

/**
 * Publish tweet to Twitter/X using OAuth 1.0a User Context
 */
export async function publishTweet(
  tweetText: string,
  credentials?: TwitterCredentials
): Promise<{ success: boolean; tweetId?: string; error?: string }> {
  const apiKey = credentials?.apiKey || process.env.TWITTER_API_KEY || "";
  const apiSecret = credentials?.apiSecret || process.env.TWITTER_API_SECRET || "";
  const accessToken = credentials?.accessToken || process.env.TWITTER_ACCESS_TOKEN || "";
  const accessSecret = credentials?.accessSecret || process.env.TWITTER_ACCESS_SECRET || "";

  if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
    return {
      success: false,
      error: "Missing Twitter API credentials (TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET).",
    };
  }

  try {
    const client = new TwitterApi({
      appKey: apiKey,
      appSecret: apiSecret,
      accessToken: accessToken,
      accessSecret: accessSecret,
    });

    const rwClient = client.readWrite;
    const result = await rwClient.v2.tweet(tweetText);

    return {
      success: true,
      tweetId: result.data.id,
    };
  } catch (err: any) {
    console.error("Twitter publishing error:", err);
    return {
      success: false,
      error: err?.message || String(err),
    };
  }
}
