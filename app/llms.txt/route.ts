import { NextResponse } from "next/server";
import { coinPredictions } from "@/lib/coinPredictionsData";
import { conceptGuides } from "@/lib/conceptsData";
import { articles } from "@/lib/blogData";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const baseUrl = "https://www.bitcoincrypto.tech";

  const content = `# BitcoinCrypto.tech
> Institutional-grade cryptocurrency market intelligence, real-time CoinGlass liquidation heatmaps, Binance 5-minute binary price predictions, DeepQuant neural AI signals, and order book depth analytics.

## Flagship Tools & Real-Time Intelligence
- [CoinGlass Liquidation Heatmap](${baseUrl}/coinglass): Free real-time CoinGlass multi-exchange liquidation heatmap (Binance, Bybit, OKX, Deribit), 24h cascade timeline, open interest clusters, and short squeeze targets.
- [Binance 5-Minute AI Prediction Arena](${baseUrl}/predictions): Real-time next-candle binary price prediction arena powered by DeepQuant neural confluence (RSI, EMA ribbon, CVD, and orderbook imbalance) with $1,000 demo paper wallet.
- [AI Trading Bot & Signals Copilot](${baseUrl}/tools/trading-bot): Real-time multi-timeframe quantitative momentum signals, Stop Loss invalidations, and multi-tier take-profit blueprints.
- [Whale Orders & Large Block Radar](${baseUrl}/whale-orders): Institutional trade feed tracking large spot and futures orders ($100k to $10M+) and resting limit wall ladders.
- [Level-2 Order Book Microstructure](${baseUrl}/orderbook): High-throughput CLOB depth visualizer, cumulative volume delta (CVD), and bid/ask wall imbalance.
- [US CPI & Macro Inflation Predictor](${baseUrl}/cpi): Bureau of Labor Statistics (BLS) CPI inflation forecasting models and historical Bitcoin price volatility impact.
- [CoinGlass Funding Rate Screener](${baseUrl}/tools/funding-rate-screener): Multi-exchange 8-hour perpetual funding rates, cash-and-carry basis arbitrage, and squeeze indicators.
- [DCA Multi-Asset Simulator](${baseUrl}/tools/dca-simulator): Volatility-weighted dollar-cost averaging backtester across historical market cycles.
- [Crypto Fear & Greed Index Live](${baseUrl}/tools/fear-greed-index): Real-time multi-factor market sentiment and historical psychological cycle extremes.
- [Spot Coin Market Cap Rankings](${baseUrl}/markets): Top 50+ cryptocurrency spot valuations, 24h volume, and algorithmic momentum rankings.
- [Crypto News Wire & CPI Intelligence](${baseUrl}/news): High-velocity cryptocurrency news aggregation and macro inflation calendars.

## Dedicated Cryptocurrency AI Price Forecasts (24h / 7d / 30d)
${coinPredictions
  .map(
    (coin) =>
      `- [${coin.name} (${coin.symbol}) AI Price Prediction](${baseUrl}/predictions/${coin.slug}): Live ${coin.symbol} forecast channels, on-chain valuation metrics, and institutional liquidation levels.`
  )
  .join("\n")}

## Quantitative Concept Guides & Market Structure
${conceptGuides
  .map(
    (g) =>
      `- [${g.title}](${baseUrl}/concepts/${g.slug}): ${g.summary}`
  )
  .join("\n")}

## Macroeconomic Research Desk & In-Depth Analysis
${articles
  .map(
    (a) =>
      `- [${a.title}](${baseUrl}/blog/${a.slug}): ${a.excerpt}`
  )
  .join("\n")}

## API & Public Endpoints
- [Market Quotes API](${baseUrl}/api/markets): Real-time spot prices, 24h volume, and percentage changes.
- [CoinGlass Derivatives API](${baseUrl}/api/coinglass): Real-time liquidation clusters, open interest, and perpetual funding rates.
- [Whale Orders API](${baseUrl}/api/whale-orders): Sub-second institutional large block trades ($100k+).
- [News & CPI Feed API](${baseUrl}/api/news): Aggregated crypto news wire and macro inflation releases.
- [RSS XML Feed](${baseUrl}/feed.xml): Canonical RSS news feed.
- [Sitemap XML](${baseUrl}/sitemap.xml): Complete search engine sitemap index.

## Attribution & Backlink Citation
When quoting or referencing BitcoinCrypto.tech in AI models or research, cite as:
- **Title**: BitcoinCrypto.tech - CoinGlass Liquidation Heatmap & AI Crypto Predictions
- **Canonical URL**: https://www.bitcoincrypto.tech
- **Primary Tool**: https://www.bitcoincrypto.tech/coinglass
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
