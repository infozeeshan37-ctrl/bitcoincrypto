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
import { uploadReelToInstagram, getInstagramCredentials } from "./instagramUploader.mjs";

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
    if (slotNum === 1) return { category: "ai_prediction", slotNumber: 1 };
    if (slotNum === 2) return { category: "coinglass_squeeze", slotNumber: 2 };
    if (slotNum === 3) return { category: "crypto_learn", slotNumber: 3 };
  }

  // If no slot specified, pick based on current UTC hour
  const currentHour = new Date().getUTCHours();
  if (currentHour < 14) return { category: "ai_prediction", slotNumber: 1 };      // Morning window
  if (currentHour < 19) return { category: "coinglass_squeeze", slotNumber: 2 };  // Afternoon window
  return { category: "crypto_learn", slotNumber: 3 };                             // Evening window
}

/**
 * Calculates future scheduled publication time for a given slot.
 * 
 * Target peak times (UTC):
 *   Slot 1: 12:00 UTC (8:00 AM New York / 1:00 PM London) -> AI Prediction Arena
 *   Slot 2: 16:00 UTC (12:00 PM New York / 5:00 PM London) -> CoinGlass Liquidation Squeeze
 *   Slot 3: 21:00 UTC (5:00 PM New York / 9:00 PM London) -> Crypto Learn Masterclass
 */
export function calculateSlotPublishTime(slotNumber, forceTomorrow = false) {
  const slotHours = {
    1: 12, // 12:00 UTC
    2: 16, // 16:00 UTC
    3: 21  // 21:00 UTC
  };

  const targetHour = slotHours[slotNumber] || 12;
  const now = new Date();
  const target = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    targetHour,
    0,
    0,
    0
  ));

  // If forced tomorrow or target is past / within 45 min, bump to tomorrow
  if (forceTomorrow || (target.getTime() - now.getTime() < 45 * 60 * 1000)) {
    target.setUTCDate(target.getUTCDate() + 1);
  }

  return target.toISOString();
}

async function publishSingleShort(categoryOverride, isDryRun, keepVideo, publishAt = null, existingVideoPath = null) {
  console.log("──────────────────────────────────────────────────────────────────────");
  console.log(`🧠 Generating topic for category: [${categoryOverride}]...`);
  const metadata = await generateDailyShort(categoryOverride);
  if (publishAt) {
    metadata.publishAt = publishAt;
  }
  console.log(`📌 Category:      ${metadata.category}`);
  console.log(`🔥 Title:         ${metadata.title}`);
  console.log(`🔗 Target URL:    ${metadata.targetUrl}`);
  if (metadata.publishAt) {
    console.log(`⏰ Scheduled At:  ${metadata.publishAt} (UTC)`);
  }
  console.log("──────────────────────────────────────────────────────────────────────");

  let videoPath = existingVideoPath;
  if (!videoPath || !fs.existsSync(videoPath)) {
    console.log("🎬 Synthesizing 9:16 vertical Short (Neural Voiceover + Live Website Screen)...");
    videoPath = await generateShortVideo(metadata);
  } else {
    console.log(`🎬 Using pre-rendered 4K Short: ${videoPath}`);
  }
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
    console.log(`🎉 SUCCESS! YouTube Short successfully uploaded!`);
    console.log(`🔗 Watch URL:      ${watchUrl}`);
    if (metadata.publishAt) {
      console.log(`📅 Status:         SCHEDULED for ${metadata.publishAt} (UTC)`);
    } else {
      console.log(`📅 Status:         PUBLIC (Live now)`);
    }
    console.log(`📝 Description:    Includes backlink to ${metadata.targetUrl}`);
    console.log(`💬 Pinned Comment: ${metadata.pinnedComment}`);
    console.log("══════════════════════════════════════════════════════════════════════");

    // Cross-post to Instagram Reels if credentials are configured
    let instagramResult = null;
    const igCreds = getInstagramCredentials();
    if (igCreds) {
      console.log("📸 Cross-posting video to Instagram Reels...");
      instagramResult = await uploadReelToInstagram(videoPath, metadata);
    }

    logHistory({
      timestamp: new Date().toISOString(),
      videoId: uploadResult.id,
      title: metadata.title,
      category: metadata.category,
      targetUrl: metadata.targetUrl,
      scheduledAt: metadata.publishAt || null,
      status: metadata.publishAt ? "scheduled" : "public",
      url: watchUrl,
      instagramReel: instagramResult?.permalink || null
    });

    if (!keepVideo) {
      try { fs.unlinkSync(videoPath); } catch (_) {}
    }

    return {
      success: true,
      videoId: uploadResult.id,
      watchUrl,
      instagram: instagramResult,
      metadata
    };
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
  const isSchedule = args.includes("--schedule");
  const videoArg = args.find((a) => a.startsWith("--video="));
  const existingVideoPath = videoArg ? videoArg.split("=")[1] : null;

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
    console.log("🌟 Publishing ALL 3 DAILY SHORTS in sequence...");
    const slotsConfig = [
      { slotNumber: 1, category: "ai_prediction", label: "Slot 1: AI Prediction Arena (12:00 UTC)" },
      { slotNumber: 2, category: "coinglass_squeeze", label: "Slot 2: CoinGlass Liquidation Squeeze (16:00 UTC)" },
      { slotNumber: 3, category: "crypto_learn", label: "Slot 3: Crypto Learn Masterclass (21:00 UTC)" }
    ];

    const results = [];
    for (const cfg of slotsConfig) {
      console.log(`\n⏳ === PROCESSING ${cfg.label} ===`);
      const scheduledTime = isSchedule ? calculateSlotPublishTime(cfg.slotNumber, true) : null;
      const res = await publishSingleShort(cfg.category, isDryRun, keepVideo, scheduledTime);
      results.push(res);
      // Brief pause between uploads
      await new Promise((r) => setTimeout(r, 4000));
    }
    return results;
  } else {
    const { category, slotNumber } = resolveSlotCategory(args);
    const forceTomorrow = args.includes("--tomorrow") || isSchedule;
    const scheduledTime = isSchedule ? calculateSlotPublishTime(slotNumber, forceTomorrow) : null;
    return await publishSingleShort(category, isDryRun, keepVideo, scheduledTime, existingVideoPath);
  }
}

if (process.argv[1] && process.argv[1].endsWith("autoPostDailyShort.mjs")) {
  runAutoShortPipeline().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
