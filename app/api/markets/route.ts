import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface CryptoMarketItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  volume24h: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
  rank: number;
  category: string;
  high24h: number;
  low24h: number;
  sparkline: number[];
}

const FALLBACK_COINS: CryptoMarketItem[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 88450.20,
    change1h: 0.24,
    change24h: 3.82,
    change7d: 8.45,
    volume24h: 38450000000,
    marketCap: 1745000000000,
    circulatingSupply: 19820000,
    totalSupply: 21000000,
    rank: 1,
    category: "Layer 1",
    high24h: 89200,
    low24h: 85100,
    sparkline: [85100, 85600, 86200, 87100, 86800, 87900, 88450],
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3120.50,
    change1h: -0.15,
    change24h: 2.65,
    change7d: 5.12,
    volume24h: 18200000000,
    marketCap: 375400000000,
    circulatingSupply: 120400000,
    totalSupply: 120400000,
    rank: 2,
    category: "Layer 1",
    high24h: 3180,
    low24h: 3010,
    sparkline: [3010, 3040, 3075, 3090, 3080, 3110, 3120],
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 184.75,
    change1h: 0.85,
    change24h: 6.42,
    change7d: 14.80,
    volume24h: 6890000000,
    marketCap: 87200000000,
    circulatingSupply: 471900000,
    totalSupply: 588000000,
    rank: 3,
    category: "Layer 1",
    high24h: 188.5,
    low24h: 172.1,
    sparkline: [172, 174, 178, 181, 180, 183, 184.75],
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "BNB",
    price: 642.30,
    change1h: 0.05,
    change24h: 1.45,
    change7d: 3.20,
    volume24h: 1450000000,
    marketCap: 93500000000,
    circulatingSupply: 145600000,
    totalSupply: 145600000,
    rank: 4,
    category: "Exchange",
    high24h: 650,
    low24h: 631,
    sparkline: [631, 634, 638, 640, 639, 641, 642.3],
  },
  {
    id: "ripple",
    symbol: "XRP",
    name: "XRP",
    price: 2.45,
    change1h: -0.40,
    change24h: 4.15,
    change7d: 11.20,
    volume24h: 8120000000,
    marketCap: 139800000000,
    circulatingSupply: 57100000000,
    totalSupply: 100000000000,
    rank: 5,
    category: "Payment",
    high24h: 2.58,
    low24h: 2.31,
    sparkline: [2.31, 2.35, 2.40, 2.48, 2.42, 2.46, 2.45],
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    price: 0.82,
    change1h: 0.12,
    change24h: 3.10,
    change7d: 7.40,
    volume24h: 1340000000,
    marketCap: 29400000000,
    circulatingSupply: 35700000000,
    totalSupply: 45000000000,
    rank: 6,
    category: "Layer 1",
    high24h: 0.85,
    low24h: 0.78,
    sparkline: [0.78, 0.79, 0.80, 0.81, 0.81, 0.83, 0.82],
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.285,
    change1h: 1.15,
    change24h: 7.85,
    change7d: 19.30,
    volume24h: 4520000000,
    marketCap: 41800000000,
    circulatingSupply: 146800000000,
    totalSupply: 146800000000,
    rank: 7,
    category: "Memes",
    high24h: 0.298,
    low24h: 0.261,
    sparkline: [0.261, 0.268, 0.274, 0.280, 0.279, 0.287, 0.285],
  },
  {
    id: "sui",
    symbol: "SUI",
    name: "Sui",
    price: 3.42,
    change1h: 1.45,
    change24h: 9.12,
    change7d: 22.50,
    volume24h: 2150000000,
    marketCap: 9800000000,
    circulatingSupply: 2860000000,
    totalSupply: 10000000000,
    rank: 8,
    category: "Layer 1",
    high24h: 3.55,
    low24h: 3.10,
    sparkline: [3.10, 3.18, 3.25, 3.32, 3.38, 3.45, 3.42],
  },
  {
    id: "avalanche-2",
    symbol: "AVAX",
    name: "Avalanche",
    price: 34.80,
    change1h: -0.20,
    change24h: 2.10,
    change7d: 4.80,
    volume24h: 680000000,
    marketCap: 14200000000,
    circulatingSupply: 408000000,
    totalSupply: 720000000,
    rank: 9,
    category: "Layer 1",
    high24h: 35.6,
    low24h: 33.8,
    sparkline: [33.8, 34.0, 34.2, 34.6, 34.5, 34.9, 34.8],
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    price: 18.90,
    change1h: 0.60,
    change24h: 4.75,
    change7d: 12.10,
    volume24h: 920000000,
    marketCap: 11450000000,
    circulatingSupply: 608000000,
    totalSupply: 1000000000,
    rank: 10,
    category: "DeFi",
    high24h: 19.3,
    low24h: 17.8,
    sparkline: [17.8, 18.0, 18.2, 18.5, 18.6, 19.0, 18.9],
  },
  {
    id: "near",
    symbol: "NEAR",
    name: "NEAR Protocol",
    price: 6.25,
    change1h: 0.90,
    change24h: 5.80,
    change7d: 16.40,
    volume24h: 760000000,
    marketCap: 7600000000,
    circulatingSupply: 1215000000,
    totalSupply: 1215000000,
    rank: 11,
    category: "AI & Big Data",
    high24h: 6.45,
    low24h: 5.85,
    sparkline: [5.85, 5.95, 6.05, 6.18, 6.12, 6.30, 6.25],
  },
  {
    id: "pepe",
    symbol: "PEPE",
    name: "Pepe",
    price: 0.0000142,
    change1h: 2.10,
    change24h: 11.40,
    change7d: 28.50,
    volume24h: 2450000000,
    marketCap: 5980000000,
    circulatingSupply: 420690000000000,
    totalSupply: 420690000000000,
    rank: 12,
    category: "Memes",
    high24h: 0.0000151,
    low24h: 0.0000125,
    sparkline: [0.0000125, 0.0000130, 0.0000135, 0.0000140, 0.0000138, 0.0000145, 0.0000142],
  },
  {
    id: "uniswap",
    symbol: "UNI",
    name: "Uniswap",
    price: 11.85,
    change1h: 0.35,
    change24h: 3.90,
    change7d: 8.90,
    volume24h: 540000000,
    marketCap: 7110000000,
    circulatingSupply: 600000000,
    totalSupply: 1000000000,
    rank: 13,
    category: "DeFi",
    high24h: 12.2,
    low24h: 11.2,
    sparkline: [11.2, 11.4, 11.6, 11.75, 11.70, 11.95, 11.85],
  },
  {
    id: "artificial-superintelligence-alliance",
    symbol: "FET",
    name: "Artificial Superintelligence Alliance",
    price: 1.68,
    change1h: 1.10,
    change24h: 8.20,
    change7d: 18.70,
    volume24h: 420000000,
    marketCap: 4250000000,
    circulatingSupply: 2530000000,
    totalSupply: 2719000000,
    rank: 14,
    category: "AI & Big Data",
    high24h: 1.74,
    low24h: 1.52,
    sparkline: [1.52, 1.56, 1.60, 1.64, 1.62, 1.70, 1.68],
  },
  {
    id: "render-token",
    symbol: "RENDER",
    name: "Render",
    price: 7.45,
    change1h: 0.75,
    change24h: 6.15,
    change7d: 15.30,
    volume24h: 380000000,
    marketCap: 3860000000,
    circulatingSupply: 518000000,
    totalSupply: 532000000,
    rank: 15,
    category: "AI & Big Data",
    high24h: 7.75,
    low24h: 6.95,
    sparkline: [6.95, 7.10, 7.22, 7.35, 7.30, 7.55, 7.45],
  }
];

export async function GET() {
  try {
    // 1. Fetch live Fear & Greed Index
    let fearAndGreed = { value: "74", classification: "Greed", timestamp: Date.now() };
    try {
      const fngRes = await fetch("https://api.alternative.me/fng/?limit=1", {
        next: { revalidate: 60 },
      });
      if (fngRes.ok) {
        const fngData = await fngRes.json();
        if (fngData.data && fngData.data[0]) {
          fearAndGreed = {
            value: fngData.data[0].value,
            classification: fngData.data[0].value_classification,
            timestamp: parseInt(fngData.data[0].timestamp) * 1000,
          };
        }
      }
    } catch (e) {
      console.warn("FNG fetch error:", e);
    }

    // 2. Fetch live Binance 24hr tickers for precision prices
    let updatedCoins = [...FALLBACK_COINS];
    try {
      const binanceRes = await fetch("https://api.binance.com/api/v3/ticker/24hr", {
        next: { revalidate: 10 },
      });
      if (binanceRes.ok) {
        const tickers: any[] = await binanceRes.json();
        const map = new Map<string, any>();
        tickers.forEach((t) => map.set(t.symbol, t));

        updatedCoins = updatedCoins.map((coin) => {
          const pair = `${coin.symbol}USDT`;
          const raw = map.get(pair);
          if (raw) {
            const price = parseFloat(raw.lastPrice) || coin.price;
            const change24h = parseFloat(raw.priceChangePercent) || coin.change24h;
            const high24h = parseFloat(raw.highPrice) || coin.high24h;
            const low24h = parseFloat(raw.lowPrice) || coin.low24h;
            const volume24h = parseFloat(raw.quoteVolume) || coin.volume24h;
            const marketCap = price * coin.circulatingSupply;

            return {
              ...coin,
              price,
              change24h,
              high24h,
              low24h,
              volume24h,
              marketCap,
            };
          }
          return coin;
        });
      }
    } catch (e) {
      console.warn("Binance 24hr ticker fetch error:", e);
    }

    // Sort by market cap rank
    updatedCoins.sort((a, b) => b.marketCap - a.marketCap);
    updatedCoins = updatedCoins.map((c, i) => ({ ...c, rank: i + 1 }));

    // Global market aggregations
    const totalMarketCap = updatedCoins.reduce((acc, c) => acc + c.marketCap, 0) * 1.35;
    const totalVolume24h = updatedCoins.reduce((acc, c) => acc + c.volume24h, 0);
    const btcCoin = updatedCoins.find((c) => c.symbol === "BTC");
    const ethCoin = updatedCoins.find((c) => c.symbol === "ETH");
    const solCoin = updatedCoins.find((c) => c.symbol === "SOL");

    const btcDominance = btcCoin ? ((btcCoin.marketCap / totalMarketCap) * 100).toFixed(1) : "56.4";
    const ethDominance = ethCoin ? ((ethCoin.marketCap / totalMarketCap) * 100).toFixed(1) : "13.8";
    const solDominance = solCoin ? ((solCoin.marketCap / totalMarketCap) * 100).toFixed(1) : "3.6";

    // Top Gainers & Losers
    const sortedBy24h = [...updatedCoins].sort((a, b) => b.change24h - a.change24h);
    const topGainers = sortedBy24h.slice(0, 3);
    const topLosers = sortedBy24h.slice(-3).reverse();

    return NextResponse.json({
      success: true,
      data: {
        coins: updatedCoins,
        global: {
          totalMarketCap,
          totalMarketCapFormatted: `$${(totalMarketCap / 1e12).toFixed(2)}T`,
          totalVolume24h,
          totalVolume24hFormatted: `$${(totalVolume24h / 1e9).toFixed(2)}B`,
          btcDominance: `${btcDominance}%`,
          ethDominance: `${ethDominance}%`,
          solDominance: `${solDominance}%`,
          fearAndGreed,
          gasGwei: 14,
          marketCapChange24h: 3.42,
          lastUpdated: new Date().toISOString(),
        },
        topGainers,
        topLosers,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to load market data",
        data: {
          coins: FALLBACK_COINS,
          global: {
            totalMarketCap: 2680000000000,
            totalMarketCapFormatted: "$2.68T",
            totalVolume24h: 98400000000,
            totalVolume24hFormatted: "$98.40B",
            btcDominance: "56.4%",
            ethDominance: "13.8%",
            solDominance: "3.6%",
            fearAndGreed: { value: "74", classification: "Greed" },
            gasGwei: 14,
            marketCapChange24h: 3.42,
            lastUpdated: new Date().toISOString(),
          },
          topGainers: FALLBACK_COINS.slice(0, 3),
          topLosers: FALLBACK_COINS.slice(-3),
        },
      },
      { status: 200 }
    );
  }
}
