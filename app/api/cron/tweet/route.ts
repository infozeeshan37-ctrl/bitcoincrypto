import { NextRequest, NextResponse } from "next/server";
import { generateDynamicTweet, publishTweet } from "@/lib/twitterPublisher";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return handleTweetTrigger(request);
}

export async function POST(request: NextRequest) {
  return handleTweetTrigger(request);
}

async function handleTweetTrigger(request: NextRequest) {
  try {
    // 1. Optional Security Verification using CRON_SECRET or Authorization Header
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid CRON_SECRET" },
        { status: 401 }
      );
    }

    // 2. Check if DRY_RUN mode is requested via query param or env
    const searchParams = request.nextUrl.searchParams;
    const isDryRun = searchParams.get("dry_run") === "true" || process.env.DRY_RUN === "true";

    // 3. Generate dynamic high-converting tweet
    const generated = await generateDynamicTweet();

    if (isDryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        generated,
        message: "Dry run completed. Tweet generated without posting.",
      });
    }

    let reqBody: any = null;
    if (request.method === "POST") {
      try {
        reqBody = await request.json();
      } catch {
        // empty body is acceptable
      }
    }

    const credentials = reqBody?.apiKey
      ? {
          apiKey: reqBody.apiKey,
          apiSecret: reqBody.apiSecret,
          accessToken: reqBody.accessToken,
          accessSecret: reqBody.accessSecret,
        }
      : undefined;

    // 4. Publish tweet via Twitter API v2
    const publishResult = await publishTweet(generated.text, credentials);

    const mask = (v?: string) => (v ? `${v.slice(0, 3)}...${v.slice(-3)} (${v.length} chars)` : "NOT_SET");
    const activeApiKey = credentials?.apiKey || process.env.TWITTER_API_KEY || process.env.TWITTER_CONSUMER_KEY || process.env.X_API_KEY;
    const activeApiSecret = credentials?.apiSecret || process.env.TWITTER_API_SECRET || process.env.TWITTER_API_KEY_SECRET || process.env.TWITTER_CONSUMER_SECRET || process.env.TWITTER_SECRET_KEY || process.env.X_API_SECRET;
    const activeAccessToken = credentials?.accessToken || process.env.TWITTER_ACCESS_TOKEN || process.env.TWITTER_TOKEN || process.env.X_ACCESS_TOKEN;
    const activeAccessSecret = credentials?.accessSecret || process.env.TWITTER_ACCESS_SECRET || process.env.TWITTER_ACCESS_TOKEN_SECRET || process.env.TWITTER_TOKEN_SECRET || process.env.X_ACCESS_SECRET || process.env.X_ACCESS_TOKEN_SECRET;

    const keyDiagnostics = {
      apiKey: mask(activeApiKey),
      apiSecret: mask(activeApiSecret),
      accessToken: mask(activeAccessToken),
      accessSecret: mask(activeAccessSecret),
      usingCustomCredentials: !!credentials,
      buildVersion: "v1.0.4-live-debug",
    };

    if (!publishResult.success) {
      return NextResponse.json(
        {
          success: false,
          generated,
          error: publishResult.error,
          keyDiagnostics,
          hint: "If you receive 401, check that (1) App permissions are set to 'Read and write' in developer.x.com, (2) Access Token was Regenerated AFTER changing permissions to Read and write, and (3) Consumer Key & Secret match Access Token & Secret.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      tweetId: publishResult.tweetId,
      category: generated.category,
      text: generated.text,
      url: generated.url,
      timestamp: new Date().toISOString(),
      keyDiagnostics,
    });
  } catch (error: any) {
    console.error("API Cron Tweet Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || String(error) },
      { status: 500 }
    );
  }
}
