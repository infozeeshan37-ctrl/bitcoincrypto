/**
 * BitcoinCrypto.tech — Autonomous Daily YouTube Shorts Creator & Publisher
 * 
 * Generates and automatically posts an institutional-quality 9:16 vertical
 * YouTube Short directly to your authorized YouTube channel every day.
 * 
 * Usage:
 *   node scripts/autoPostDailyShort.mjs             # Generates video & uploads to YouTube
 *   node scripts/autoPostDailyShort.mjs --dry-run   # Generates video only, skips upload
 *   npm run youtube:auto                           # Convenience script
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
  fs.writeFileSync(logFile, JSON.stringify(history.slice(0, 50), null, 2), "utf-8");
}

export async function runAutoShortPipeline() {
  const isDryRun = process.argv.includes("--dry-run");

  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  🚀 BitcoinCrypto.tech — Autonomous Daily YouTube Short Engine");
  console.log("══════════════════════════════════════════════════════════════════════");

  // Step 1: Authentication Check
  const token = await getAccessToken();
  if (!token) {
    console.error("❌ YouTube OAuth credentials missing or invalid in .env.local.");
    console.error("   Ensure YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN are set.");
    process.exit(1);
  }

  const channel = await verifyChannel(token);
  console.log(`📺 Channel:       ${channel?.snippet?.title || "Connected YouTube Channel"}`);
  console.log(`🆔 Channel ID:    ${channel?.id || "N/A"}`);
  console.log("──────────────────────────────────────────────────────────────────────");

  // Step 2: Content Generation
  console.log("🧠 Generating today's quantitative Short topic & script...");
  const metadata = await generateDailyShort();
  console.log(`📌 Category:      ${metadata.category}`);
  console.log(`🔥 Title:         ${metadata.title}`);
  console.log(`🔗 Target URL:    ${metadata.targetUrl}`);
  console.log("──────────────────────────────────────────────────────────────────────");

  // Step 3: Video Rendering (1080x1920 9:16)
  console.log("🎬 Synthesizing 1080x1920 vertical video via FFmpeg & ASS engine...");
  const videoPath = await generateShortVideo(metadata);
  const fileSizeMb = (fs.statSync(videoPath).size / (1024 * 1024)).toFixed(2);
  console.log(`📁 Rendered Video: ${videoPath} (${fileSizeMb} MB)`);
  console.log("──────────────────────────────────────────────────────────────────────");

  if (isDryRun) {
    console.log("⚠️ DRY RUN MODE: Video generated successfully. Upload skipped.");
    console.log(`👉 Video saved at: ${videoPath}`);
    return { success: true, mode: "dry-run", videoPath, metadata };
  }

  // Step 4: Direct Upload to YouTube
  console.log("🚀 Uploading Short to YouTube API...");
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

    // Cleanup video file after successful upload to save disk space
    try {
      if (!process.argv.includes("--keep-video")) {
        fs.unlinkSync(videoPath);
      }
    } catch (_) {}

    return { success: true, videoId: uploadResult.id, watchUrl, metadata };
  } else {
    console.error("❌ Upload failed. Video file preserved at:", videoPath);
    return { success: false, videoPath, metadata };
  }
}

if (process.argv[1].endsWith("autoPostDailyShort.mjs")) {
  runAutoShortPipeline().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
