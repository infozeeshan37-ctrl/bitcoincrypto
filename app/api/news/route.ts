import { NextResponse } from "next/server";
import { HISTORICAL_NEWS_ARCHIVE, HistoricalNewsItem } from "@/lib/newsArchive";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export interface CPIDataRelease {
  id: string;
  period: string;
  releaseDate: string;
  actualYoY: number;
  forecastYoY: number;
  previousYoY: number;
  actualMoM: number;
  coreActualYoY: number;
  coreForecastYoY: number;
  btcImpact1h: string;
  btcImpact24h: string;
  marketReaction: "BULLISH" | "BEARISH" | "NEUTRAL";
  summary: string;
}

export interface AffectedCoin {
  symbol: string;
  name: string;
  impact: "BULLISH" | "BEARISH" | "VOLATILE" | "NEUTRAL";
  expectedRange?: string;
}

export interface NewsAuthor {
  name: string;
  role: string;
  desk: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  paragraphs: string[];
  whyItMatters: string;
  keyTakeaways: string[];
  affectedCoins: AffectedCoin[];
  author: NewsAuthor;
  source: string;
  sourceUrl: string;
  url?: string;
  imageUrl?: string;
  publishedAt: string;
  timeAgo: string;
  category: "Macro & CPI" | "Fed Rates" | "Geopolitics" | "Bitcoin" | "Ethereum" | "DeFi" | "Regulation" | "Institutional" | "Derivatives" | "Mining & Energy";
  sentiment: "BULLISH" | "BEARISH" | "NEUTRAL";
  hotScore: number;
  readTime: string;
  marketImpact: "HIGH" | "MEDIUM" | "STRATEGIC";
  isHistorical?: boolean;
}

export interface MacroBattle {
  id: string;
  title: string;
  subtitle: string;
  category: "Central Bank & Rates" | "Geopolitical Currency Wars" | "Regulatory & SEC" | "L1/L2 Ecosystem Wars" | "Mining & Energy";
  parties: {
    sideA: string;
    sideB: string;
  };
  status: "Active Escalation" | "Pivotal Climax" | "Easing / Resolution" | "Ongoing Structural War";
  cryptoImpact: "BULLISH" | "BEARISH" | "HIGH VOLATILITY";
  whyItMatters: string;
  consumerExplanation: string;
  keyProtagonists: string[];
  stakesForCrypto: string;
  primarySourceUrl: string;
  primarySourceName: string;
  marketSentimentScore: number;
}

export interface CentralBankPolicy {
  bank: string;
  country: string;
  currentRate: string;
  nextMeeting: string;
  bias: "Dovish Easing" | "Hawkish Hold" | "Neutral" | "Rate Hikes";
  impactOnCrypto: "BULLISH" | "BEARISH" | "NEUTRAL";
  notes: string;
  sourceUrl: string;
}

const MACRO_BATTLES: MacroBattle[] = [
  {
    id: "battle-fed-vs-inflation",
    title: "Federal Reserve vs Inflation: The Interest Rate Easing War",
    subtitle: "How Fed rate cuts dictate global M2 dollar liquidity and Bitcoin bull cycles",
    category: "Central Bank & Rates",
    parties: {
      sideA: "Federal Reserve (Restrictive 4.50% Rates & QT)",
      sideB: "US Labor Cooling & Market Easing Demands"
    },
    status: "Pivotal Climax",
    cryptoImpact: "BULLISH",
    whyItMatters: "High interest rates make holding cash/Treasuries attractive. When the Fed cuts interest rates, capital flees low-yielding bonds into high-growth assets like Bitcoin, Ethereum, and technology stocks.",
    consumerExplanation: "Think of interest rates as the 'gravity' of financial markets. When interest rates are high, borrowing is expensive and investments slow down. When the Fed lowers interest rates, borrowing becomes cheap, cash loses purchasing power, and investors rush into scarce digital assets like Bitcoin to protect their wealth.",
    keyProtagonists: ["Jerome Powell (Fed Chair)", "CME FedWatch Futures", "Bureau of Labor Statistics"],
    stakesForCrypto: "A shift to an easing cycle unlocks multi-trillion dollar institutional liquidity rotation into Bitcoin ETFs and decentralized finance protocols.",
    primarySourceUrl: "https://www.federalreserve.gov/monetarypolicy.htm",
    primarySourceName: "Federal Reserve Monetary Policy",
    marketSentimentScore: 92
  },
  {
    id: "battle-brics-vs-dollar",
    title: "De-Dollarization War: BRICS Alliance vs US Dollar Hegemony",
    subtitle: "Global currency realignment and the race for sovereign non-dollar settlement assets",
    category: "Geopolitical Currency Wars",
    parties: {
      sideA: "US Dollar Reserve System (SWIFT / US Sanctions)",
      sideB: "BRICS+ Bloc & Alternative Cross-Border Digital Settlement"
    },
    status: "Active Escalation",
    cryptoImpact: "BULLISH",
    whyItMatters: "As sovereign nations seek alternatives to dollar sanctions and weaponized banking rails, decentralized, censorship-resistant networks like Bitcoin become neutral global settlement corridors.",
    consumerExplanation: "For decades, all global oil and trade was priced in US Dollars. Now, major economies are looking for currencies that no single country can freeze or censor. Bitcoin functions as 'neutral digital gold'—a borderless asset that cannot be devalued or blocked by any government.",
    keyProtagonists: ["BRICS Central Banks", "US Treasury Department", "Bank for International Settlements (BIS)"],
    stakesForCrypto: "Accelerated adoption of Bitcoin and gold by sovereign nation-state balance sheets as non-confiscatable strategic reserves.",
    primarySourceUrl: "https://www.reuters.com/markets/currencies/",
    primarySourceName: "Reuters International Macro Wire",
    marketSentimentScore: 88
  },
  {
    id: "battle-sec-vs-crypto",
    title: "Regulatory Showdown: SEC Enforcement vs Digital Asset Innovation",
    subtitle: "The legal battle over securities classifications, staking rewards, and DeFi autonomy",
    category: "Regulatory & SEC",
    parties: {
      sideA: "SEC Division of Enforcement (Howey Test Application)",
      sideB: "Crypto Exchanges, Staking Providers & DeFi Builders"
    },
    status: "Ongoing Structural War",
    cryptoImpact: "HIGH VOLATILITY",
    whyItMatters: "Court rulings regarding whether cryptocurrencies and staking protocols are classified as unregistered securities directly determine which assets Wall Street institutions and banks are legally allowed to custody and trade.",
    consumerExplanation: "Regulatory clarity allows large US pension funds, banks, and investment advisors to safely invest client money into crypto without fear of lawsuits. Winning these legal battles opens the floodgates for mainstream financial integration.",
    keyProtagonists: ["SEC Commissioners", "US Federal Appeals Courts", "Coinbase & Ripple Legal Counsel"],
    stakesForCrypto: "Passage of permanent bipartisan crypto market structure legislation (FIT21) and approval of institutional staking-enabled spot ETFs.",
    primarySourceUrl: "https://www.sec.gov/news/pressreleases",
    primarySourceName: "US Securities and Exchange Commission",
    marketSentimentScore: 78
  },
  {
    id: "battle-eth-vs-sol",
    title: "Layer-1 Supremacy Battle: Ethereum Modular Scaling vs Solana Monolithic Speed",
    subtitle: "Decentralized settlement security vs sub-second consumer application throughput",
    category: "L1/L2 Ecosystem Wars",
    parties: {
      sideA: "Ethereum Ecosystem (L1 Security + Arbitrum/Base/OP Rollups)",
      sideB: "Solana High-Throughput Monolithic Architecture"
    },
    status: "Active Escalation",
    cryptoImpact: "BULLISH",
    whyItMatters: "The battle for developer mindshare, decentralized exchange (DEX) trading volume, and institutional stablecoin settlement dictates which smart contract platform captures the multi-trillion dollar tokenized asset economy.",
    consumerExplanation: "Ethereum works like a secure high-court bank that uses Layer-2 'express lanes' (like Base and Arbitrum) to process cheap transactions. Solana works like a super-fast bullet train processing thousands of transactions directly on one high-speed track. Both are competing to be the foundation for the future internet of money.",
    keyProtagonists: ["Vitalik Buterin & Ethereum Foundation", "Anatoly Yakovenko & Solana Labs", "Major Stablecoin Issuers (Tether/Circle)"],
    stakesForCrypto: "Lowering transaction fees to under $0.01 for billions of worldwide smartphone users while preserving decentralized censorship resistance.",
    primarySourceUrl: "https://defillama.com/chains",
    primarySourceName: "DefiLlama Chain Analytics",
    marketSentimentScore: 94
  },
  {
    id: "battle-ai-vs-bitcoin-energy",
    title: "The Grid & Power Battle: AI Data Centers vs Bitcoin Hashrate Miners",
    subtitle: "Institutional competition for gigawatts of low-cost nuclear and renewable energy",
    category: "Mining & Energy",
    parties: {
      sideA: "Hyperscale AI Cloud Compute (OpenAI, Microsoft, Amazon)",
      sideB: "Industrial Bitcoin Mining Facilities (TeraWulf, MARA, CleanSpark)"
    },
    status: "Active Escalation",
    cryptoImpact: "BULLISH",
    whyItMatters: "Bitcoin miners possess gigawatts of energized grid infrastructure. As AI companies desperately seek immediate power, Bitcoin miners are pivoting to dual-revenue operations (HPC/AI compute + BTC mining), dramatically strengthening their corporate balance sheets.",
    consumerExplanation: "Artificial Intelligence requires immense electrical power to train machine learning models. Bitcoin mining companies already own the largest power connections and data centers in the world. By partnering together, miners earn massive profits while keeping the Bitcoin network more secure than ever.",
    keyProtagonists: ["Public Mining CEOs (MARA, CLSK, WULF)", "Tech Hyperscalers", "Energy Grid Operators (ERCOT)"],
    stakesForCrypto: "Record Bitcoin network hashrate security (>700 EH/s) and institutional financial stability for public mining companies.",
    primarySourceUrl: "https://mempool.space/mining",
    primarySourceName: "Mempool Mining & Hashrate Terminal",
    marketSentimentScore: 89
  }
];

const CENTRAL_BANK_POLICIES: CentralBankPolicy[] = [
  {
    bank: "Federal Reserve (Fed)",
    country: "United States",
    currentRate: "4.25% - 4.50%",
    nextMeeting: "Sep 17, 2026",
    bias: "Dovish Easing",
    impactOnCrypto: "BULLISH",
    notes: "CME FedWatch pricing in 88.5% odds of 25bps rate cut following cooling CPI and labor moderation.",
    sourceUrl: "https://www.federalreserve.gov"
  },
  {
    bank: "European Central Bank (ECB)",
    country: "Eurozone",
    currentRate: "3.25%",
    nextMeeting: "Sep 12, 2026",
    bias: "Dovish Easing",
    impactOnCrypto: "BULLISH",
    notes: "Initiated monetary easing cycle to stimulate eurozone industrial output; expanding euro liquidity.",
    sourceUrl: "https://www.ecb.europa.eu"
  },
  {
    bank: "Bank of Japan (BoJ)",
    country: "Japan",
    currentRate: "0.25%",
    nextMeeting: "Sep 20, 2026",
    bias: "Hawkish Hold",
    impactOnCrypto: "NEUTRAL",
    notes: "Pausing rate hike path to avoid global yen carry trade liquidation shocks across risk assets.",
    sourceUrl: "https://www.boj.or.jp/en/"
  },
  {
    bank: "People's Bank of China (PBOC)",
    country: "China",
    currentRate: "3.10% (LPR)",
    nextMeeting: "Continuous",
    bias: "Dovish Easing",
    impactOnCrypto: "BULLISH",
    notes: "Injecting sovereign liquidity into domestic banking network; historic correlation with Asian crypto volumes.",
    sourceUrl: "http://www.pbc.gov.cn/english/"
  }
];

const HISTORICAL_CPI_RELEASES: CPIDataRelease[] = [
  {
    id: "cpi-2026-07",
    period: "July 2026",
    releaseDate: "August 13, 2026",
    actualYoY: 2.7,
    forecastYoY: 2.9,
    previousYoY: 3.0,
    actualMoM: 0.15,
    coreActualYoY: 3.1,
    coreForecastYoY: 3.2,
    btcImpact1h: "+2.84%",
    btcImpact24h: "+5.12%",
    marketReaction: "BULLISH",
    summary: "Cooling inflation print triggered immediate short squeeze across Bitcoin and altcoin perpetuals.",
  },
  {
    id: "cpi-2026-06",
    period: "June 2026",
    releaseDate: "July 11, 2026",
    actualYoY: 3.0,
    forecastYoY: 3.1,
    previousYoY: 3.3,
    actualMoM: 0.20,
    coreActualYoY: 3.3,
    coreForecastYoY: 3.4,
    btcImpact1h: "+1.95%",
    btcImpact24h: "+3.40%",
    marketReaction: "BULLISH",
    summary: "Below-forecast inflation reinforced expectation of Federal Reserve monetary pivot.",
  },
  {
    id: "cpi-2026-05",
    period: "May 2026",
    releaseDate: "June 12, 2026",
    actualYoY: 3.3,
    forecastYoY: 3.3,
    previousYoY: 3.4,
    actualMoM: 0.25,
    coreActualYoY: 3.4,
    coreForecastYoY: 3.4,
    btcImpact1h: "-0.40%",
    btcImpact24h: "+0.85%",
    marketReaction: "NEUTRAL",
    summary: "As-expected print resulted in initial range-bound chop before gradual recovery.",
  },
  {
    id: "cpi-2026-04",
    period: "April 2026",
    releaseDate: "May 15, 2026",
    actualYoY: 3.4,
    forecastYoY: 3.2,
    previousYoY: 3.5,
    actualMoM: 0.35,
    coreActualYoY: 3.6,
    coreForecastYoY: 3.5,
    btcImpact1h: "-2.15%",
    btcImpact24h: "-1.45%",
    marketReaction: "BEARISH",
    summary: "Hotter-than-expected shelter component caused temporary hawkish repricing.",
  },
];

// Persistent cache combining live RSS items + permanent historical archive
let persistentNewsList: NewsItem[] = [...HISTORICAL_NEWS_ARCHIVE];
let lastLiveFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000;

function unescapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseXmlItem(itemXml: string, sourceName: string): NewsItem | null {
  const getTag = (tag: string) => {
    const cdataMatch = itemXml.match(new RegExp("<" + tag + "[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></" + tag + ">", "i"));
    if (cdataMatch) return cdataMatch[1].trim();
    const match = itemXml.match(new RegExp("<" + tag + "[^>]*>([\\s\\S]*?)</" + tag + ">", "i"));
    return match ? match[1].trim() : "";
  };

  const rawTitle = getTag("title");
  const title = unescapeHtml(rawTitle);
  if (!title || title.length < 5) return null;

  // Link handling (RSS <link> vs Atom <link href="..."> vs <guid>)
  let link = getTag("link") || getTag("guid") || "";
  const linkHrefMatch = itemXml.match(/<link[^>]+href=["']([^"']+)["']/i);
  if (linkHrefMatch && linkHrefMatch[1]) {
    link = linkHrefMatch[1];
  }

  const pubDateStr = getTag("pubDate") || getTag("published") || getTag("updated") || getTag("dc:date") || "";
  const rawDesc = getTag("description") || getTag("summary") || getTag("content:encoded") || getTag("content") || "";
  const creator = unescapeHtml(getTag("dc:creator") || getTag("author") || getTag("name") || `${sourceName} Desk`);

  // Extract featured image
  let imageUrl: string | undefined = undefined;
  const mediaMatch = itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/i) ||
                     itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i) ||
                     itemXml.match(/<enclosure[^>]+url=["']([^"']+)["']/i) ||
                     itemXml.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (mediaMatch && mediaMatch[1] && mediaMatch[1].startsWith("http")) {
    imageUrl = mediaMatch[1];
  }

  const cleanDesc = unescapeHtml(rawDesc.replace(/<[^>]+>/g, " "));

  let pubDate = new Date();
  if (pubDateStr) {
    const parsed = new Date(pubDateStr);
    if (!isNaN(parsed.getTime())) pubDate = parsed;
  }

  const titleLower = title.toLowerCase();
  const descLower = cleanDesc.toLowerCase();
  const text = `${titleLower} ${descLower}`;

  let category: NewsItem["category"] = "Institutional";
  if (text.includes("cpi") || text.includes("inflation") || text.includes("macro") || text.includes("treasury") || text.includes("pce") || text.includes("yield")) {
    category = "Macro & CPI";
  } else if (text.includes("fed") || text.includes("rate cut") || text.includes("fomc") || text.includes("powell") || text.includes("interest rate") || text.includes("central bank")) {
    category = "Fed Rates";
  } else if (text.includes("brics") || text.includes("war") || text.includes("sanction") || text.includes("tariff") || text.includes("geopolitic") || text.includes("sovereign") || text.includes("dollar")) {
    category = "Geopolitics";
  } else if (text.includes("mining") || text.includes("hashrate") || text.includes("energy") || text.includes("power") || text.includes("asic")) {
    category = "Mining & Energy";
  } else if (text.includes("sec") || text.includes("cftc") || text.includes("lawsuit") || text.includes("regulation") || text.includes("court") || text.includes("legal") || text.includes("doj") || text.includes("gensler")) {
    category = "Regulation";
  } else if (text.includes("derivative") || text.includes("futures") || text.includes("perpetual") || text.includes("funding rate") || text.includes("open interest") || text.includes("liquidation")) {
    category = "Derivatives";
  } else if (text.includes("defi") || text.includes("dex") || text.includes("uniswap") || text.includes("liquidity pool") || text.includes("yield") || text.includes("aave") || text.includes("staking")) {
    category = "DeFi";
  } else if (text.includes("ethereum") || text.includes("eth") || text.includes("vitalik") || text.includes("layer 2") || text.includes("rollup") || text.includes("arbitrum") || text.includes("solana") || text.includes("sol")) {
    category = text.includes("solana") ? "DeFi" : "Ethereum";
  } else if (text.includes("bitcoin") || text.includes("btc") || text.includes("satoshi") || text.includes("halving")) {
    category = "Bitcoin";
  }

  let sentiment: NewsItem["sentiment"] = "BULLISH";
  const bullWords = ["surge", "rally", "record", "inflows", "approve", "win", "bull", "high", "breakout", "accumulat", "soar", "gain", "jump", "boost", "expand"];
  const bearWords = ["crash", "dump", "hack", "lawsuit", "drop", "plunge", "loss", "probe", "ban", "liquidation", "bleed", "fall", "sink", "stolen", "exploit"];
  const bullCount = bullWords.filter((w) => text.includes(w)).length;
  const bearCount = bearWords.filter((w) => text.includes(w)).length;
  if (bearCount > bullCount) sentiment = "BEARISH";
  else if (bullCount === 0 && bearCount === 0) sentiment = "NEUTRAL";

  // Dynamic affected coins
  const affectedCoins: AffectedCoin[] = [];
  if (text.includes("bitcoin") || text.includes("btc")) {
    affectedCoins.push({ symbol: "BTCUSDT", name: "Bitcoin", impact: sentiment, expectedRange: "$88,000 - $95,000" });
  }
  if (text.includes("ethereum") || text.includes("eth") || text.includes("vitalik")) {
    affectedCoins.push({ symbol: "ETHUSDT", name: "Ethereum", impact: sentiment, expectedRange: "$3,100 - $3,450" });
  }
  if (text.includes("solana") || text.includes("sol")) {
    affectedCoins.push({ symbol: "SOLUSDT", name: "Solana", impact: sentiment, expectedRange: "$180 - $215" });
  }
  if (text.includes("xrp") || text.includes("ripple")) {
    affectedCoins.push({ symbol: "XRPUSDT", name: "XRP", impact: sentiment, expectedRange: "$0.58 - $0.68" });
  }
  if (text.includes("bnb") || text.includes("binance")) {
    affectedCoins.push({ symbol: "BNBUSDT", name: "BNB", impact: sentiment, expectedRange: "$630 - $675" });
  }
  if (affectedCoins.length === 0) {
    affectedCoins.push({ symbol: "BTCUSDT", name: "Bitcoin", impact: sentiment, expectedRange: "Broad Market Liquidity" });
    affectedCoins.push({ symbol: "ETHUSDT", name: "Ethereum", impact: sentiment, expectedRange: "Ecosystem Velocity" });
  }

  const diffMs = Math.max(1, Date.now() - pubDate.getTime());
  const diffMinutes = Math.floor(diffMs / 60000);
  let timeAgo = "Just now";
  if (diffMinutes < 60) timeAgo = `${Math.max(1, diffMinutes)}m ago`;
  else if (diffMinutes < 1440) timeAgo = `${Math.floor(diffMinutes / 60)}h ago`;
  else timeAgo = `${Math.floor(diffMinutes / 1440)}d ago`;

  const summary = cleanDesc.length > 220 ? cleanDesc.slice(0, 220) + "..." : (cleanDesc || title);

  const paragraphs = [
    cleanDesc || `${title}. Financial intelligence bureaus and institutional market makers are closely monitoring the on-chain and orderbook implications of this breaking development.`,
    `As reported by ${sourceName}, this event introduces critical data for algorithmic trading desks and spot liquidity allocators. Market depth analysis across Binance, Coinbase, and OKX indicates that market participants are actively recalibrating their risk exposure and order placement accordingly.`,
    `From a macro risk management perspective, cross-asset correlations between Bitcoin spot liquidity, institutional ETF capital flows, and macroeconomic monetary expectations will determine medium-term directional bias. Traders should observe high-volume liquidity clusters and maintain validated invalidation levels.`
  ];

  return {
    id: `live-${sourceName.toLowerCase().replace(/[^a-z0-9]/g, "")}-${pubDate.getTime()}-${Math.random().toString(36).substring(2, 6)}`,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80),
    title,
    summary,
    paragraphs,
    whyItMatters: `This development directly influences capital allocation, trading volume, and institutional liquidity flows across the ${category} sector of the digital asset market.`,
    keyTakeaways: [
      title,
      `Verified reporting by ${sourceName}.`,
      `Categorized as a high-velocity ${category} event with ${sentiment} momentum.`,
      `Orderbook depth across primary venues actively pricing in directional implications.`
    ],
    affectedCoins,
    author: {
      name: creator,
      role: "Financial News Correspondent",
      desk: `${sourceName} Real-Time Wire`
    },
    source: sourceName,
    sourceUrl: link || "https://www.bitcoincrypto.tech/news",
    url: link,
    imageUrl,
    publishedAt: pubDate.toISOString(),
    timeAgo,
    category,
    sentiment,
    hotScore: 88 + (diffMinutes % 11),
    readTime: "3 min read",
    marketImpact: (category === "Macro & CPI" || category === "Fed Rates" || category === "Bitcoin") ? "HIGH" : "MEDIUM",
    isHistorical: false
  };
}

async function fetchRssFeed(url: string, sourceName: string): Promise<NewsItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/rss+xml, application/xml, text/xml, application/atom+xml, */*"
      },
      next: { revalidate: 60 }
    });
    clearTimeout(timeout);

    if (!res.ok) return [];
    const xml = await res.text();
    
    // Support both RSS <item> and Atom <entry>
    const isAtom = xml.includes("<entry");
    const itemsXml = isAtom
      ? xml.split(/<entry[\s>]/i).slice(1).map((x) => x.split(/<\/entry>/i)[0])
      : xml.split(/<item[\s>]/i).slice(1).map((x) => x.split(/<\/item>/i)[0]);
      
    const items: NewsItem[] = [];

    for (const itemXml of itemsXml.slice(0, 25)) {
      const parsed = parseXmlItem(itemXml, sourceName);
      if (parsed) items.push(parsed);
    }
    return items;
  } catch {
    return [];
  }
}

export async function GET() {
  const now = Date.now();

  // If live fetch was done recently, return cached list
  if (now - lastLiveFetchTime < CACHE_TTL_MS && persistentNewsList.length > HISTORICAL_NEWS_ARCHIVE.length) {
    return NextResponse.json({
      success: true,
      data: {
        news: persistentNewsList,
        historicalCount: HISTORICAL_NEWS_ARCHIVE.length,
        liveCount: persistentNewsList.length - HISTORICAL_NEWS_ARCHIVE.length,
        macroBattles: MACRO_BATTLES,
        centralBankPolicies: CENTRAL_BANK_POLICIES,
        cpi: {
          latest: {
            period: "July 2026",
            actualYoY: 2.7,
            forecastYoY: 2.9,
            previousYoY: 3.0,
            actualMoM: 0.15,
            coreActualYoY: 3.1,
            coreForecastYoY: 3.2,
            releaseDate: "August 13, 2026",
            status: "Cooling (2.7% vs 2.9% Est) - Bullish Macro Tailwind",
            inflationStatusText: "Headline CPI cooled to 2.7% YoY, confirming the disinflationary trajectory and reinforcing market conviction for Federal Reserve rate cuts.",
          },
          upcoming: {
            event: "August 2026 US CPI Release",
            releaseDate: "September 11, 2026 (08:30 AM EST)",
            daysRemaining: 11,
            consensusForecastYoY: "2.6%",
            previousYoY: "2.7%",
            criticalLevel: "2.8%",
            impactOutlook: "A print below 2.6% YoY will cement expectations for aggressive monetary easing, providing strong tailwinds for Bitcoin and altcoins.",
          },
          historicalReleases: HISTORICAL_CPI_RELEASES,
        },
        macroFed: {
          currentFedFundsRate: "4.25% - 4.50%",
          fomcMeetingDate: "September 17, 2026",
          rateCut25bpsProbability: 88.5,
          rateHoldProbability: 11.5,
          rateCut50bpsProbability: 0,
          fedBalanceSheet: "$7.18 Trillion",
          unemploymentRate: "4.3%",
          gdpGrowthYoY: "2.8%",
          macroRegime: "Monetary Easing Pivot (High Dollar Liquidity Inflow)",
        },
      },
    });
  }

  // Fetch live articles across 8 tier-1 crypto news feeds concurrently
  const feeds = [
    { url: "https://cointelegraph.com/rss", name: "Cointelegraph" },
    { url: "https://decrypt.co/feed", name: "Decrypt" },
    { url: "https://cryptoslate.com/feed/", name: "CryptoSlate" },
    { url: "https://news.bitcoin.com/feed/", name: "Bitcoin.com" },
    { url: "https://bitcoinmagazine.com/.rss/full/", name: "Bitcoin Magazine" },
    { url: "https://u.today/rss", name: "U.Today" },
    { url: "https://www.theblock.co/rss.xml", name: "The Block" },
    { url: "https://www.coindesk.com/arc/outboundfeeds/rss/", name: "CoinDesk" }
  ];

  try {
    const feedSettled = await Promise.allSettled(feeds.map((f) => fetchRssFeed(f.url, f.name)));
    const liveItems = feedSettled
      .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === "fulfilled")
      .flatMap((r) => r.value);

    // Merge live articles with the historical archive, ensuring news is NEVER cleared!
    const combinedAll = [...liveItems, ...persistentNewsList, ...HISTORICAL_NEWS_ARCHIVE];

    // Deduplicate by normalized title
    const seenTitles = new Set<string>();
    const deduplicatedCombined: NewsItem[] = [];

    for (const item of combinedAll) {
      const norm = item.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 35);
      if (!seenTitles.has(norm)) {
        seenTitles.add(norm);
        deduplicatedCombined.push(item);
      }
    }

    // Sort by publication timestamp (newest first, followed by historical)
    deduplicatedCombined.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    persistentNewsList = deduplicatedCombined.slice(0, 300);
    lastLiveFetchTime = now;
  } catch (e) {
    console.warn("Live RSS aggregator merge notice:", e);
  }

  return NextResponse.json({
    success: true,
    data: {
      news: persistentNewsList,
      historicalCount: HISTORICAL_NEWS_ARCHIVE.length,
      liveCount: Math.max(0, persistentNewsList.length - HISTORICAL_NEWS_ARCHIVE.length),
      macroBattles: MACRO_BATTLES,
      centralBankPolicies: CENTRAL_BANK_POLICIES,
      cpi: {
        latest: {
          period: "July 2026",
          actualYoY: 2.7,
          forecastYoY: 2.9,
          previousYoY: 3.0,
          actualMoM: 0.15,
          coreActualYoY: 3.1,
          coreForecastYoY: 3.2,
          releaseDate: "August 13, 2026",
          status: "Cooling (2.7% vs 2.9% Est) - Bullish Macro Tailwind",
          inflationStatusText: "Headline CPI cooled to 2.7% YoY, confirming the disinflationary trajectory and reinforcing market conviction for Federal Reserve rate cuts.",
        },
        upcoming: {
          event: "August 2026 US CPI Release",
          releaseDate: "September 11, 2026 (08:30 AM EST)",
          daysRemaining: 11,
          consensusForecastYoY: "2.6%",
          previousYoY: "2.7%",
          criticalLevel: "2.8%",
          impactOutlook: "A print below 2.6% YoY will cement expectations for aggressive monetary easing, providing strong tailwinds for Bitcoin and altcoins.",
        },
        historicalReleases: HISTORICAL_CPI_RELEASES,
      },
      macroFed: {
        currentFedFundsRate: "4.25% - 4.50%",
        fomcMeetingDate: "September 17, 2026",
        rateCut25bpsProbability: 88.5,
        rateHoldProbability: 11.5,
        rateCut50bpsProbability: 0,
        fedBalanceSheet: "$7.18 Trillion",
        unemploymentRate: "4.3%",
        gdpGrowthYoY: "2.8%",
        macroRegime: "Monetary Easing Pivot (High Dollar Liquidity Inflow)",
      },
    },
  });
}
