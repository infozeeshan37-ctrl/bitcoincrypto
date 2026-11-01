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
import { uploadToSnapchat, isSnapchatConfigured } from "./snapchatUploader.mjs";

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

export const SIX_SLOT_HOURS = {
  1: 2,   // 02:00 UTC (Asian Morning Market Open)
  2: 6,   // 06:00 UTC (European London Market Open)
  3: 10,  // 10:00 UTC (London Peak Trading Hours)
  4: 14,  // 14:00 UTC (New York Wall Street Open / Macro Data)
  5: 18,  // 18:00 UTC (US Power Hour Squeeze)
  6: 22   // 22:00 UTC (Global Market Close & Masterclass)
};

function resolveSlotCategory(args) {
  const slotArg = args.find((a) => a.startsWith("--slot="));
  if (slotArg) {
    const slotNum = parseInt(slotArg.split("=")[1], 10);
    const map = {
      1: "ai_prediction",
      2: "coinglass_squeeze",
      3: "whale_radar",
      4: "cpi_macro",
      5: "ai_prediction",
      6: "crypto_learn"
    };
    return { category: map[slotNum] || "ai_prediction", slotNumber: slotNum };
  }

  // If no slot specified, pick based on current UTC hour
  const currentHour = new Date().getUTCHours();
  if (currentHour < 5) return { category: "ai_prediction", slotNumber: 1 };
  if (currentHour < 9) return { category: "coinglass_squeeze", slotNumber: 2 };
  if (currentHour < 13) return { category: "whale_radar", slotNumber: 3 };
  if (currentHour < 17) return { category: "cpi_macro", slotNumber: 4 };
  if (currentHour < 21) return { category: "ai_prediction", slotNumber: 5 };
  return { category: "crypto_learn", slotNumber: 6 };
}

/**
 * Calculates future scheduled publication time for a given slot.
 * 
 * 6 Peak Times (UTC):
 *   Slot 1: 02:00 UTC -> Asian Market Open
 *   Slot 2: 06:00 UTC -> London Market Open
 *   Slot 3: 10:00 UTC -> London Mid-Session & Whale Tape
 *   Slot 4: 14:00 UTC -> Wall Street NY Open & Macro Data
 *   Slot 5: 18:00 UTC -> US Power Hour Squeeze
 *   Slot 6: 22:00 UTC -> Global Market Close & Masterclass
 */
export function calculateSlotPublishTime(slotNumber, dayOffset = 1) {
  const targetHour = SIX_SLOT_HOURS[slotNumber] || 12;
  const now = new Date();
  const offsetDays = typeof dayOffset === "number" ? dayOffset : (dayOffset ? 1 : 0);

  const target = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + offsetDays,
    targetHour,
    0,
    0,
    0
  ));

  if (offsetDays === 0 && (target.getTime() - now.getTime() < 45 * 60 * 1000)) {
    target.setUTCDate(target.getUTCDate() + 1);
  }

  return target.toISOString();
}

export const THREE_DAYS_SCHEDULE = [
  // Day 1 (Tomorrow) - 6 High-Impact 4K Shorts
  { day: 1, slotNumber: 1, category: "ai_prediction", label: "Day 1 - Slot 1 (02:00 UTC): Solana AI Technical Breakout" },
  { day: 1, slotNumber: 2, category: "coinglass_squeeze", label: "Day 1 - Slot 2 (06:00 UTC): CoinGlass Liquidation Squeeze" },
  { day: 1, slotNumber: 3, category: "whale_radar", label: "Day 1 - Slot 3 (10:00 UTC): Whale Radar & Dark Pool Flow" },
  { day: 1, slotNumber: 4, category: "cpi_macro", label: "Day 1 - Slot 4 (14:00 UTC): US CPI Macro Volatility Countdown" },
  { day: 1, slotNumber: 5, category: "ai_prediction", label: "Day 1 - Slot 5 (18:00 UTC): Bitcoin $95,000 Target Surge" },
  { day: 1, slotNumber: 6, category: "crypto_learn", label: "Day 1 - Slot 6 (22:00 UTC): The 1% Risk Management Rule" },

  // Day 2 (Day after tomorrow) - 6 High-Impact 4K Shorts
  { day: 2, slotNumber: 1, category: "coinglass_squeeze", label: "Day 2 - Slot 1 (02:00 UTC): Ethereum Liquidation Cascade" },
  { day: 2, slotNumber: 2, category: "ai_prediction", label: "Day 2 - Slot 2 (06:00 UTC): Sui AI Quantitative Target" },
  { day: 2, slotNumber: 3, category: "cpi_macro", label: "Day 2 - Slot 3 (10:00 UTC): Fed Interest Rate Odds & Bitcoin" },
  { day: 2, slotNumber: 4, category: "whale_radar", label: "Day 2 - Slot 4 (14:00 UTC): $10M Smart Money Accumulation" },
  { day: 2, slotNumber: 5, category: "ai_prediction", label: "Day 2 - Slot 5 (18:00 UTC): XRP Liquidity Resistance Flip" },
  { day: 2, slotNumber: 6, category: "crypto_learn", label: "Day 2 - Slot 6 (22:00 UTC): Drawdown Recovery Mathematics" },

  // Day 3 (3 days from now) - 6 High-Impact 4K Shorts
  { day: 3, slotNumber: 1, category: "whale_radar", label: "Day 3 - Slot 1 (02:00 UTC): Dark Pool Limit Bid Absorption" },
  { day: 3, slotNumber: 2, category: "cpi_macro", label: "Day 3 - Slot 2 (06:00 UTC): Macro Liquidity Volatility Matrix" },
  { day: 3, slotNumber: 3, category: "ai_prediction", label: "Day 3 - Slot 3 (10:00 UTC): Bitcoin L2 Order Book Depth" },
  { day: 3, slotNumber: 4, category: "coinglass_squeeze", label: "Day 3 - Slot 4 (14:00 UTC): Multi-Exchange Short Squeeze" },
  { day: 3, slotNumber: 5, category: "ai_prediction", label: "Day 3 - Slot 5 (18:00 UTC): Ethereum CVD Taker Flow Surge" },
  { day: 3, slotNumber: 6, category: "crypto_learn", label: "Day 3 - Slot 6 (22:00 UTC): Risk-to-Reward Profitability Formula" }
];

async function publishSingleShort(categoryOverride, isDryRun, keepVideo, publishAt = null, existingVideoPath = null, isInstagramOnly = false, isSnapchatOnly = false) {
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

  if (isSnapchatOnly) {
    console.log("👻 Uploading directly and immediately to Snapchat Spotlight...");
    const snapchatResult = await uploadToSnapchat(videoPath, metadata);

    logHistory({
      timestamp: new Date().toISOString(),
      title: metadata.title,
      category: metadata.category,
      targetUrl: metadata.targetUrl,
      status: "public",
      snapchatSpotlight: snapchatResult?.success ? "published" : null
    });

    if (!keepVideo) {
      try { fs.unlinkSync(videoPath); } catch (_) {}
    }

    return {
      success: !!(snapchatResult && snapchatResult.success),
      snapchat: snapchatResult,
      metadata
    };
  }

  if (isInstagramOnly) {
    console.log("📸 Uploading directly and immediately to Instagram Reels...");
    const instagramResult = await uploadReelToInstagram(videoPath, metadata);

    logHistory({
      timestamp: new Date().toISOString(),
      title: metadata.title,
      category: metadata.category,
      targetUrl: metadata.targetUrl,
      status: "public",
      instagramReel: instagramResult?.permalink || null
    });

    if (!keepVideo) {
      try { fs.unlinkSync(videoPath); } catch (_) {}
    }

    return {
      success: !!instagramResult,
      instagram: instagramResult,
      metadata
    };
  }

  let uploadResult = null;
  const token = await getAccessToken();
  if (!isInstagramOnly && !isSnapchatOnly && token) {
    console.log("🚀 Uploading directly to YouTube API...");
    uploadResult = await uploadVideoToYouTube(videoPath, metadata);

    if (uploadResult && uploadResult.quotaExceeded) {
      console.warn("⚠️ YouTube daily upload quota exceeded.");
      return { success: false, quotaExceeded: true, videoPath, metadata };
    }

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
    }
  } else if (!isInstagramOnly && !isSnapchatOnly) {
    console.log("ℹ️ YouTube upload skipped (Token expired/revoked).");
  }

  // Cross-post to Instagram Reels if credentials are configured
  let instagramResult = null;
  const igCreds = getInstagramCredentials();
  if (igCreds) {
    console.log("📸 Cross-posting video to Instagram Reels (@bitcoincrypto.tech)...");
    instagramResult = await uploadReelToInstagram(videoPath, metadata);
  }

  // Cross-post to Snapchat Spotlight if configured
  let snapchatResult = null;
  if (isSnapchatConfigured()) {
    console.log("👻 Cross-posting video to Snapchat Spotlight (@bitcoincrypto)...");
    snapchatResult = await uploadToSnapchat(videoPath, metadata);
  }

  const success = (uploadResult && uploadResult.id) ||
                  (instagramResult && instagramResult.success) ||
                  (snapchatResult && snapchatResult.success);

  logHistory({
    timestamp: new Date().toISOString(),
    videoId: uploadResult?.id || null,
    title: metadata.title,
    category: metadata.category,
    targetUrl: metadata.targetUrl,
    scheduledAt: metadata.publishAt || null,
    status: metadata.publishAt ? "scheduled" : "public",
    url: uploadResult?.id ? `https://youtube.com/shorts/${uploadResult.id}` : null,
    instagramReel: instagramResult?.permalink || null,
    snapchatSpotlight: snapchatResult?.success ? "published" : null
  });

  if (!keepVideo && success) {
    try { fs.unlinkSync(videoPath); } catch (_) {}
  }

  if (success) {
    return {
      success: true,
      videoId: uploadResult?.id || null,
      watchUrl: uploadResult?.id ? `https://youtube.com/shorts/${uploadResult.id}` : null,
      instagram: instagramResult,
      snapchat: snapchatResult,
      metadata
    };
  } else {
    console.error("❌ Upload failed on all channels. Video preserved at:", videoPath);
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
  const isInstagramOnly = args.includes("--instagram-only") || args.includes("--instagram");
  const isSnapchatOnly = args.includes("--snapchat-only") || args.includes("--snapchat");

  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  🚀 BitcoinCrypto.tech — High-Impact Daily Shorts & Spotlight Publisher");
  console.log("══════════════════════════════════════════════════════════════════════");

  if (isSnapchatOnly) {
    if (!isSnapchatConfigured()) {
      console.warn("⚠️ Snapchat is not configured yet.");
      console.warn("👉 To configure Snapchat, run: npm run snapchat:login");
      process.exit(1);
    }
    console.log("👻 Target Platform:   Snapchat Spotlight (@bitcoincrypto)");
  } else if (isInstagramOnly) {
    const igCreds = getInstagramCredentials();
    if (!igCreds) {
      console.error("❌ Instagram credentials missing in .env.local.");
      process.exit(1);
    }
    console.log("📸 Target Platform:   Instagram Reels (@bitcoincrypto.tech)");
  } else {
    // Step 1: Authentication Check for YouTube
    const token = await getAccessToken();
    if (!token) {
      console.warn("⚠️ YouTube OAuth credentials expired or revoked.");
      console.warn("   (To refresh YouTube token, run: node scripts/getYoutubeToken.mjs)");
      console.warn("   Continuing with auto-generation, Reels & Snapchat Spotlight publishing...");
    } else {
      const channel = await verifyChannel(token);
      console.log(`📺 Connected Channel: ${channel?.snippet?.title || "Your YouTube Channel"}`);
      console.log(`🆔 Channel ID:        ${channel?.id || "N/A"}`);
    }
  }

  const isThreeDays = args.includes("--three-days") || args.includes("--3days") || args.includes("--schedule-3days");
  const isTwoDays = args.includes("--two-days") || args.includes("--2days") || args.includes("--schedule-2days");
  const dayArg = args.find((a) => a.startsWith("--day="));
  const targetDay = dayArg ? parseInt(dayArg.split("=")[1], 10) : null;

  if (isThreeDays || isTwoDays || targetDay) {
    let queue = THREE_DAYS_SCHEDULE;
    if (targetDay) {
      queue = queue.filter((cfg) => cfg.day === targetDay);
      console.log(`🌟 Scheduling 6 HIGH-IMPACT 4K SHORTS for DAY ${targetDay}...`);
    } else if (isTwoDays) {
      queue = queue.filter((cfg) => cfg.day <= 2);
      console.log("🌟 Publishing COMPLETE 2-DAY SCHEDULE (12 High-Impact 4K Shorts) in sequence...");
    } else {
      console.log("🌟 Publishing COMPLETE 3-DAY SCHEDULE (18 High-Impact 4K Shorts — 6 per Day)...");
    }

    const results = [];
    for (const cfg of queue) {
      const scheduledTime = calculateSlotPublishTime(cfg.slotNumber, cfg.day);

      // Check if this slot was already successfully scheduled in logs
      const logFile = path.resolve(process.cwd(), "logs/shorts_history.json");
      if (fs.existsSync(logFile)) {
        try {
          const history = JSON.parse(fs.readFileSync(logFile, "utf-8"));
          const alreadyScheduled = history.find((h) => h.scheduledAt === scheduledTime && h.videoId);
          if (alreadyScheduled) {
            console.log(`⏩ [ALREADY SCHEDULED] ${cfg.label} -> https://youtube.com/shorts/${alreadyScheduled.videoId}`);
            results.push({ success: true, videoId: alreadyScheduled.videoId, skipped: true });
            continue;
          }
        } catch (_) {}
      }

      console.log(`\n⏳ === PROCESSING ${cfg.label} ===`);
      const res = await publishSingleShort(cfg.category, isDryRun, keepVideo, scheduledTime, null, isInstagramOnly, isSnapchatOnly);
      results.push(res);

      if (res && res.quotaExceeded) {
        console.warn("\n🛑 Reached YouTube daily upload quota limit (10,000 units/day).");
        console.log(`✅ Successfully scheduled ${results.filter(r => r?.success).length} videos today.`);
        console.log(`👉 To schedule Day ${cfg.day + 1}, run tomorrow after 08:00 UTC: node scripts/autoPostDailyShort.mjs --schedule --day=${cfg.day + 1}`);
        break;
      }

      await new Promise((r) => setTimeout(r, 4000));
    }
    return results;
  } else if (allSlots) {
    console.log("🌟 Publishing ALL 6 DAILY PEAK SHORTS for Tomorrow...");
    const slotsConfig = [
      { slotNumber: 1, category: "ai_prediction", label: "Slot 1 (02:00 UTC): Asian Open" },
      { slotNumber: 2, category: "coinglass_squeeze", label: "Slot 2 (06:00 UTC): London Open" },
      { slotNumber: 3, category: "whale_radar", label: "Slot 3 (10:00 UTC): London Mid-Session" },
      { slotNumber: 4, category: "cpi_macro", label: "Slot 4 (14:00 UTC): NY Open / Macro" },
      { slotNumber: 5, category: "ai_prediction", label: "Slot 5 (18:00 UTC): US Power Hour" },
      { slotNumber: 6, category: "crypto_learn", label: "Slot 6 (22:00 UTC): Market Close & Masterclass" }
    ];

    const results = [];
    for (const cfg of slotsConfig) {
      console.log(`\n⏳ === PROCESSING ${cfg.label} ===`);
      const scheduledTime = isSchedule ? calculateSlotPublishTime(cfg.slotNumber, 1) : null;
      const res = await publishSingleShort(cfg.category, isDryRun, keepVideo, scheduledTime, null, isInstagramOnly, isSnapchatOnly);
      results.push(res);
      if (res && res.quotaExceeded) {
        console.warn("\n🛑 Reached YouTube daily upload quota limit.");
        break;
      }
      await new Promise((r) => setTimeout(r, 4000));
    }
    return results;
  } else {
    const { category, slotNumber } = resolveSlotCategory(args);
    const forceTomorrow = args.includes("--tomorrow") || isSchedule;
    const scheduledTime = isSchedule ? calculateSlotPublishTime(slotNumber, forceTomorrow) : null;
    return await publishSingleShort(category, isDryRun, keepVideo, scheduledTime, existingVideoPath, isInstagramOnly, isSnapchatOnly);
  }
}

if (process.argv[1] && process.argv[1].endsWith("autoPostDailyShort.mjs")) {
  runAutoShortPipeline().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
