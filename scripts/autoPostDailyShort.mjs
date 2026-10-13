/**
 * BitcoinCrypto.tech — Autonomous Daily YouTube Shorts Creator & Publisher
 * 
 * Generates and automatically posts high-production 9:16 vertical YouTube Shorts
 * with real AI neural voiceover, live website interface screen capture, and
 * direct upload to YouTube Data API v3.
 * 
 * 3 Daily High-Engagement Slots:
 *   - Slot 1: 12:00 UTC (8:00 AM EST)  -> AI Price Predictions & Order Flow
 *   - Slot 2: 16:00 UTC (12:00 PM EST) -> CoinGlass Liquidation Squeeze Alert
 *   - Slot 3: 21:00 UTC (5:00 PM EST)  -> Crypto Learn Masterclass 100-Lesson Series
 * 
 * Usage:
 *   node scripts/autoPostDailyShort.mjs               # Posts 1 short for the current slot
 *   node scripts/autoPostDailyShort.mjs --slot=1      # Forces Slot 1 (AI Prediction)
 *   node scripts/autoPostDailyShort.mjs --slot=2      # Forces Slot 2 (CoinGlass Heatmap)
 *   node scripts/autoPostDailyShort.mjs --slot=3      # Forces Slot 3 (Crypto Learn)
 *   node scripts/autoPostDailyShort.mjs --all-slots   # Generates & uploads all 3 daily shorts
 *   node scripts/autoPostDailyShort.mjs --dry-run     # Generates video only, skips upload
 */

import fs from "fs";
import path from "path";
import { generateDailyShort } from "./youtubeShortsGenerator.mjs";
import { generateShortVideo } from "./generateShortVideo.mjs";
import { uploadVideoToYouTube, getAccessToken, verifyChannel } from "./youtubeUploader.mjs";

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

function logHistory(entry) {
  const logDir = path.resolve(process.cwd(), "logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logFile = path.resolve(logDir, "shorts_history.json");
  let history = [];
  if (fs.existsSync(logFile)) {
    try {
      history = JSON.parse(fs.readFileSync(logFile, "utf-8"));
    } catch {
      history = [];
    }
  }

  history.unshift(entry);
  fs.writeFileSync(logFile, JSON.stringify(history.slice(0, 100), null, 2), "utf-8");
}

function resolveSlotCategory(args) {
  const slotArg = args.find((a) => a.startsWith("--slot="));
  if (slotArg) {
    const slotNum = parseInt(slotArg.split("=")[1], 10);
    if (slotNum === 1) return "ai_prediction";
    if (slotNum === 2) return "coinglass_squeeze";
    if (slotNum === 3) return "crypto_learn";
  }

  // If no slot specified, pick based on current UTC hour
  const currentHour = new Date().getUTCHours();
  if (currentHour < 14) return "ai_prediction";      // Morning window
  if (currentHour < 19) return "coinglass_squeeze";  // Afternoon window
  return "crypto_learn";                             // Evening window
}

async function publishSingleShort(categoryOverride, isDryRun, keepVideo) {
  console.log("──────────────────────────────────────────────────────────────────────");
  console.log(`🧠 Generating topic for category: [${categoryOverride}]...`);
  const metadata = await generateDailyShort(categoryOverride);
  console.log(`📌 Category:      ${metadata.category}`);
  console.log(`🔥 Title:         ${metadata.title}`);
  console.log(`🔗 Target URL:    ${metadata.targetUrl}`);
  console.log("──────────────────────────────────────────────────────────────────────");

  console.log("🎬 Synthesizing 9:16 vertical Short (Neural Voiceover + Live Website Screen)...");
  const videoPath = await generateShortVideo(metadata);
  const fileSizeMb = (fs.statSync(videoPath).size / (1024 * 1024)).toFixed(2);
  console.log(`📁 Video Ready:   ${videoPath} (${fileSizeMb} MB)`);
  console.log("──────────────────────────────────────────────────────────────────────");

  if (isDryRun) {
    console.log("⚠️ DRY RUN MODE: Video generated successfully. Upload skipped.");
    console.log(`👉 Video saved at: ${videoPath}`);
    return { success: true, mode: "dry-run", videoPath, metadata };
  }

  console.log("🚀 Uploading directly to YouTube API...");
  const uploadResult = await uploadVideoToYouTube(videoPath, metadata);

  if (uploadResult && uploadResult.id) {
    const watchUrl = `https://youtube.com/shorts/${uploadResult.id}`;
    console.log("══════════════════════════════════════════════════════════════════════");
    console.log(`🎉 SUCCESS! YouTube Short is now LIVE!`);
    console.log(`🔗 Watch URL:      ${watchUrl}`);
    console.log(`📝 Description:    Includes backlink to ${metadata.targetUrl}`);
    console.log(`💬 Pinned Comment: ${metadata.pinnedComment}`);
    console.log("══════════════════════════════════════════════════════════════════════");

    logHistory({
      timestamp: new Date().toISOString(),
      videoId: uploadResult.id,
      title: metadata.title,
      category: metadata.category,
      targetUrl: metadata.targetUrl,
      url: watchUrl
    });

    if (!keepVideo) {
      try { fs.unlinkSync(videoPath); } catch (_) {}
    }

    return { success: true, videoId: uploadResult.id, watchUrl, metadata };
  } else {
    console.error("❌ Upload failed. Video preserved at:", videoPath);
    return { success: false, videoPath, metadata };
  }
}

export async function runAutoShortPipeline() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const keepVideo = args.includes("--keep-video");
  const allSlots = args.includes("--all-slots");

  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  🚀 BitcoinCrypto.tech — High-Impact Daily YouTube Shorts Publisher");
  console.log("══════════════════════════════════════════════════════════════════════");

  // Step 1: Authentication Check
  const token = await getAccessToken();
  if (!token) {
    console.error("❌ YouTube OAuth credentials missing or invalid in .env.local.");
    console.error("   Ensure YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN are set.");
    process.exit(1);
  }

  const channel = await verifyChannel(token);
  console.log(`📺 Connected Channel: ${channel?.snippet?.title || "Your YouTube Channel"}`);
  console.log(`🆔 Channel ID:        ${channel?.id || "N/A"}`);

  if (allSlots) {
    console.log("🌟 Publishing ALL 3 DAILY SHORTS in sequence (AI Prediction, CoinGlass, Crypto Learn)...");
    const categories = ["ai_prediction", "coinglass_squeeze", "crypto_learn"];
    const results = [];
    for (const cat of categories) {
      const res = await publishSingleShort(cat, isDryRun, keepVideo);
      results.push(res);
      // Brief pause between uploads
      await new Promise((r) => setTimeout(r, 4000));
    }
    return results;
  } else {
    const category = resolveSlotCategory(args);
    return await publishSingleShort(category, isDryRun, keepVideo);
  }
}

if (process.argv[1].endsWith("autoPostDailyShort.mjs")) {
  runAutoShortPipeline().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
