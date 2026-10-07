import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

interface SubscriberRecord {
  id: string;
  email: string;
  topics: string[];
  subscribedAt: string;
  ipHash?: string;
  userAgent?: string;
  status: "ACTIVE" | "UNSUBSCRIBED";
}

// In-memory cache for fast access
let inMemorySubscribers: SubscriberRecord[] = [
  {
    id: "sub-seed-1",
    email: "institutional-desk@hedgefund.io",
    topics: ["Macro Research", "Whale Alerts", "AI Signals"],
    subscribedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: "ACTIVE",
  },
  {
    id: "sub-seed-2",
    email: "quant-trader@algotrading.com",
    topics: ["Macro Research", "AI Signals"],
    subscribedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: "ACTIVE",
  }
];

const SUBSCRIBERS_FILE_PATH = path.join(process.cwd(), "data", "newsletter_subscribers.json");

// Helper to ensure persistence
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
    const { email, topics = ["Macro Research", "Whale Alerts", "AI Signals"], source = "homepage_cta" } = body;

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

    // 2. Load existing subscribers
    const currentSubscribers = loadPersistedSubscribers();
    const existingIndex = currentSubscribers.findIndex((s) => s.email === cleanEmail);

    const nowIso = new Date().toISOString();

    if (existingIndex !== -1) {
      // Already subscribed, update topics & activate if was unsubscribed
      currentSubscribers[existingIndex].topics = Array.from(new Set([...currentSubscribers[existingIndex].topics, ...topics]));
      currentSubscribers[existingIndex].status = "ACTIVE";
      saveSubscribers(currentSubscribers);

      return NextResponse.json({
        success: true,
        isExisting: true,
        message: "You are already subscribed to the BitcoinCrypto Research Desk. Preferences have been updated!",
        subscriber: {
          id: currentSubscribers[existingIndex].id,
          email: cleanEmail,
          topics: currentSubscribers[existingIndex].topics,
          subscribedAt: currentSubscribers[existingIndex].subscribedAt,
        },
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
      topics: topics.length > 0 ? topics : ["Macro Research", "Whale Alerts", "AI Signals"],
      subscribedAt: nowIso,
      status: "ACTIVE",
    };

    currentSubscribers.unshift(newSubscriber);
    saveSubscribers(currentSubscribers);
    inMemorySubscribers = currentSubscribers;

    return NextResponse.json({
      success: true,
      isExisting: false,
      message: "Subscription confirmed! Welcome to the BitcoinCrypto Institutional Research Desk.",
      subscriber: {
        id: newSubscriber.id,
        email: cleanEmail,
        topics: newSubscriber.topics,
        subscribedAt: newSubscriber.subscribedAt,
      },
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

export async function GET() {
  const subscribers = loadPersistedSubscribers();
  return NextResponse.json({
    success: true,
    totalSubscribers: 4280 + subscribers.length,
    activeSubscribers: 4280 + subscribers.filter((s) => s.status === "ACTIVE").length,
    frequency: "Every Tuesday & Friday at 08:00 UTC",
    categories: [
      "Institutional Macro & Liquidity Cycles",
      "Binance & CME Whale Block Orderflow",
      "5-Minute DeepQuant Neural Signals Digest",
      "CoinGlass Liquidation Squeeze Radar"
    ]
  });
}
