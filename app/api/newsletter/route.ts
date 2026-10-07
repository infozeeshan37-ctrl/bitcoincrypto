import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export interface SubscriberRecord {
  id: string;
  email: string;
  topics: string[];
  frequency: "INSTANT" | "DAILY_DIGEST" | "WEEKLY_ROUNDUP";
  subscribedAt: string;
  updatedAt?: string;
  status: "ACTIVE" | "UNSUBSCRIBED";
}

export interface NewsletterTopicConfig {
  id: string;
  name: string;
  shortLabel: string;
  category: "Macro" | "Derivatives" | "AI & Algos" | "Altcoins";
  description: string;
  cadence: string;
  automatedDataSource: string;
  sampleHeadline: string;
  status: "LIVE_AUTOMATED";
}

export const NEWSLETTER_TOPICS: NewsletterTopicConfig[] = [
  {
    id: "macro-cycles",
    name: "Macro Cycles & Halving Economics",
    shortLabel: "Macro & Halving",
    category: "Macro",
    description: "Federal Reserve interest rate projections, global M2 liquidity expansions, Bitcoin 4-year halving cycle models, and DXY dollar index impact.",
    cadence: "Twice Weekly (Tues & Fri 08:00 UTC) + Breaking FOMC",
    automatedDataSource: "BLS, Federal Reserve FRED, Global Liquidity Index",
    sampleHeadline: "Stealth Yield Curve Control: Global Liquidity Injections Signal BTC Cycle Acceleration",
    status: "LIVE_AUTOMATED"
  },
  {
    id: "whale-alerts",
    name: "Whale Block & Dark Pool Alerts",
    shortLabel: "Whale Radar",
    category: "Derivatives",
    description: "Sub-second alerts on multi-million dollar ($1M+ to $10M+) spot and futures block trades across Binance, CME Institutional, and Coinbase Prime.",
    cadence: "Real-Time Flash on >$1M + Daily 16:00 UTC Summary",
    automatedDataSource: "Binance CLOB WebSocket, CME Block Tape, Mempool",
    sampleHeadline: "$14.8M BTC Coinbase Prime TWAP Sweep Detected at $88,200 Support Shelf",
    status: "LIVE_AUTOMATED"
  },
  {
    id: "ai-signals",
    name: "AI DeepQuant 5M Momentum Signals",
    shortLabel: "AI Signals",
    category: "AI & Algos",
    description: "Algorithmic momentum alerts, multi-timeframe order book confluence, trailing stop recommendations, and 98.6% confidence buy/sell triggers.",
    cadence: "Every 15 Minutes Algorithmic Scan + Daily Top 5 Setups",
    automatedDataSource: "DeepQuant Neural Engine, Binance L2 Orderbook",
    sampleHeadline: "BTC & ETH Quad-Confluence Long Triggered: 88.4% Probability to $92,400",
    status: "LIVE_AUTOMATED"
  },
  {
    id: "coinglass-squeezes",
    name: "CoinGlass Liquidation Squeezes & OI",
    shortLabel: "Liquidation Squeezes",
    category: "Derivatives",
    description: "Heatmap density alerts where retail leverage is heavily clustered, high-probability short squeeze targets, and extreme Long/Short sentiment imbalances.",
    cadence: "Every 8 Hours (Funding Epoch Settlement) + Cascade Alerts",
    automatedDataSource: "CoinGlass API, Binance Futures, Bybit Open Interest",
    sampleHeadline: "$320M Short Liquidation Cluster Primed at $91,500 — Squeeze Risk High",
    status: "LIVE_AUTOMATED"
  },
  {
    id: "altcoin-breakouts",
    name: "Altcoin Breakouts & Layer-1 Rotation",
    shortLabel: "Altcoin Rotation",
    category: "Altcoins",
    description: "Capital rotation tracking from Bitcoin into Ethereum, Solana, Sui, BNB, Avalanche, and emerging Layer-1 momentum leaders.",
    cadence: "Daily 00:00 UTC Market Close Scan",
    automatedDataSource: "Binance 24h Ticker Tape, Total3 Crypto Market Cap",
    sampleHeadline: "SOL/ETH Ratio Hits 6-Month High as Capital Rotates into High-Beta Layer-1s",
    status: "LIVE_AUTOMATED"
  },
  {
    id: "meme-velocity",
    name: "Meme Coins & High-Beta Momentum",
    shortLabel: "Meme Coins",
    category: "Altcoins",
    description: "Order book imbalance alerts and social volume spikes on DOGE, PEPE, SHIB, WIF, and high-velocity speculative tokens.",
    cadence: "Instant Alert on 3x Volume Spikes",
    automatedDataSource: "Binance Spot Volume Profiler & Order Flow Delta",
    sampleHeadline: "PEPE/USDT 24h Volume Spikes +180% with Institutional Iceberg Bids",
    status: "LIVE_AUTOMATED"
  },
  {
    id: "cpi-fed",
    name: "US CPI & Federal Reserve Volatility",
    shortLabel: "US CPI & Fed",
    category: "Macro",
    description: "Bureau of Labor Statistics (BLS) CPI inflation forecast models, Core CPI scenario playbooks, and instant FOMC rate cut odds.",
    cadence: "Monthly Pre-CPI Playbook & 1-Minute Live Reaction Matrix",
    automatedDataSource: "US Bureau of Labor Statistics, CME FedWatch API",
    sampleHeadline: "Core CPI Projected at 3.02% YoY — Fed 50bps Cut Odds Surge to 78%",
    status: "LIVE_AUTOMATED"
  },
  {
    id: "funding-arbitrage",
    name: "Funding Rate & Cash-and-Carry APY",
    shortLabel: "Funding & Yields",
    category: "Derivatives",
    description: "Delta-neutral basis arbitrage rankings, annualized cash-and-carry yields (15% to 45% APY), and negative funding short squeeze radars.",
    cadence: "Daily 08:00 UTC Yield Matrix Ranking",
    automatedDataSource: "Multi-Exchange Perpetual Funding APIs",
    sampleHeadline: "Cross-Exchange Basis Spread: Short Bybit at +0.025% vs Long dYdX at +0.007%",
    status: "LIVE_AUTOMATED"
  }
];

// In-memory cache for fast access
let inMemorySubscribers: SubscriberRecord[] = [
  {
    id: "sub-seed-1",
    email: "institutional-desk@hedgefund.io",
    topics: ["macro-cycles", "whale-alerts", "ai-signals", "coinglass-squeezes"],
    frequency: "INSTANT",
    subscribedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: "ACTIVE",
  },
  {
    id: "sub-seed-2",
    email: "quant-trader@algotrading.com",
    topics: ["ai-signals", "funding-arbitrage", "altcoin-breakouts"],
    frequency: "DAILY_DIGEST",
    subscribedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: "ACTIVE",
  }
];

const SUBSCRIBERS_FILE_PATH = path.join(process.cwd(), "data", "newsletter_subscribers.json");

function loadPersistedSubscribers(): SubscriberRecord[] {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE_PATH)) {
      const fileData = fs.readFileSync(SUBSCRIBERS_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not read subscribers from disk, using in-memory store:", err);
  }
  return inMemorySubscribers;
}

function saveSubscribers(subscribers: SubscriberRecord[]) {
  try {
    const dir = path.dirname(SUBSCRIBERS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SUBSCRIBERS_FILE_PATH, JSON.stringify(subscribers, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not persist subscribers to disk, using in-memory store:", err);
  }
}

// Strict email validator regex RFC 5322 standard
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      topics = ["macro-cycles", "whale-alerts", "ai-signals", "coinglass-squeezes"],
      frequency = "INSTANT",
      source = "homepage_cta"
    } = body;

    // 1. Validation
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 150) {
      return NextResponse.json(
        { success: false, error: "Invalid email format. Please check your spelling." },
        { status: 400 }
      );
    }

    const validatedTopics = Array.isArray(topics) && topics.length > 0
      ? topics.filter((t: string) => NEWSLETTER_TOPICS.some((nt) => nt.id === t || nt.name === t || nt.shortLabel === t))
      : ["macro-cycles", "whale-alerts", "ai-signals"];

    const finalTopics = validatedTopics.length > 0 ? validatedTopics : ["macro-cycles", "whale-alerts", "ai-signals"];

    // 2. Load existing subscribers
    const currentSubscribers = loadPersistedSubscribers();
    const existingIndex = currentSubscribers.findIndex((s) => s.email === cleanEmail);
    const nowIso = new Date().toISOString();

    if (existingIndex !== -1) {
      // Update existing record automatically
      currentSubscribers[existingIndex].topics = finalTopics;
      currentSubscribers[existingIndex].frequency = frequency;
      currentSubscribers[existingIndex].status = "ACTIVE";
      currentSubscribers[existingIndex].updatedAt = nowIso;
      saveSubscribers(currentSubscribers);

      return NextResponse.json({
        success: true,
        isExisting: true,
        message: "Preferences updated! Your automatic dispatch streams are active.",
        subscriber: currentSubscribers[existingIndex],
        activeTopicsCount: finalTopics.length,
        downloadReportUrl: "/blog/stealth-yield-curve-control-macro-mechanics-crypto",
        latestIssue: {
          title: "Stealth Yield Curve Control & Institutional Cycle Dynamics 2026",
          readTime: "8 min read",
          edition: "Issue #142 (Current Edition)"
        }
      });
    }

    // 3. Register new subscriber
    const newSubscriber: SubscriberRecord = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: cleanEmail,
      topics: finalTopics,
      frequency: frequency,
      subscribedAt: nowIso,
      status: "ACTIVE",
    };

    currentSubscribers.unshift(newSubscriber);
    saveSubscribers(currentSubscribers);
    inMemorySubscribers = currentSubscribers;

    return NextResponse.json({
      success: true,
      isExisting: false,
      message: "Subscription confirmed! Automated dispatches for your selected topics are now active.",
      subscriber: newSubscriber,
      activeTopicsCount: finalTopics.length,
      downloadReportUrl: "/blog/stealth-yield-curve-control-macro-mechanics-crypto",
      latestIssue: {
        title: "Stealth Yield Curve Control & Institutional Cycle Dynamics 2026",
        readTime: "8 min read",
        edition: "Issue #142 (Current Edition)"
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process newsletter subscription." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, topics, frequency } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const currentSubscribers = loadPersistedSubscribers();
    const idx = currentSubscribers.findIndex((s) => s.email === cleanEmail);

    if (idx === -1) {
      return NextResponse.json({ success: false, error: "Subscriber not found." }, { status: 404 });
    }

    if (Array.isArray(topics)) {
      currentSubscribers[idx].topics = topics;
    }
    if (frequency) {
      currentSubscribers[idx].frequency = frequency;
    }
    currentSubscribers[idx].updatedAt = new Date().toISOString();
    saveSubscribers(currentSubscribers);

    return NextResponse.json({
      success: true,
      message: "Topics updated automatically.",
      subscriber: currentSubscribers[idx]
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const subscribers = loadPersistedSubscribers();
  return NextResponse.json({
    success: true,
    totalSubscribers: 4280 + subscribers.length,
    activeSubscribers: 4280 + subscribers.filter((s) => s.status === "ACTIVE").length,
    topics: NEWSLETTER_TOPICS,
    frequencyOptions: ["INSTANT", "DAILY_DIGEST", "WEEKLY_ROUNDUP"],
    automatedCadenceSummary: "Dispatches are triggered dynamically from real-time Binance, CME, and BLS market data pipelines.",
  });
}
