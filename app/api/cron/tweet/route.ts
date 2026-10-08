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

    // 4. Publish tweet via Twitter API v2
    const publishResult = await publishTweet(generated.text);

    if (!publishResult.success) {
      return NextResponse.json(
        {
          success: false,
          generated,
          error: publishResult.error,
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
    });
  } catch (error: any) {
    console.error("API Cron Tweet Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || String(error) },
      { status: 500 }
    );
  }
}
