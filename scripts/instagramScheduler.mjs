/**
 * BitcoinCrypto.tech — Instagram Reels Scheduled Queue & Automation Engine
 * 
 * Since the Instagram Graph API does not support native scheduled_publish_time
 * on the container API for third parties, this module manages an application-layer
 * scheduling queue:
 *   1. Queues Reels and preserves 4K video files for their future target publication time.
 *   2. Processes the queue automatically when the target release time is reached.
 *   3. Publishes directly to Instagram Reels with full captions, hashtags, and tracking.
 * 
 * Usage:
 *   node scripts/instagramScheduler.mjs --status        # View currently queued and published Reels
 *   node scripts/instagramScheduler.mjs --process-now   # Check queue and publish any due Reels
 *   node scripts/instagramScheduler.mjs --worker        # Run persistent background scheduler worker
 */

import fs from "fs";
import path from "path";
import { uploadReelToInstagram, getInstagramCredentials, verifyInstagramAccount } from "./instagramUploader.mjs";

const QUEUE_FILE = path.resolve(process.cwd(), "logs/instagram_scheduled_queue.json");
const SCHEDULED_DIR = path.resolve(process.cwd(), "tmp_shorts/scheduled");

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

function getQueue() {
  if (!fs.existsSync(QUEUE_FILE)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(QUEUE_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveQueue(queue) {
  const dir = path.dirname(QUEUE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), "utf-8");
}

/**
 * Adds an Instagram Reel to the persistent scheduling queue.
 */
export function queueScheduledReel(videoPath, metadata, scheduledAt) {
  if (!fs.existsSync(videoPath)) {
    console.error(`❌ Cannot queue missing video: ${videoPath}`);
    return null;
  }

  if (!fs.existsSync(SCHEDULED_DIR)) {
    fs.mkdirSync(SCHEDULED_DIR, { recursive: true });
  }

  const fileId = `reel_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const ext = path.extname(videoPath) || ".mp4";
  const persistentVideoPath = path.resolve(SCHEDULED_DIR, `${fileId}${ext}`);

  // Copy video to persistent scheduled folder so it is not deleted prematurely
  fs.copyFileSync(videoPath, persistentVideoPath);

  const item = {
    id: fileId,
    videoPath: persistentVideoPath,
    title: metadata.title,
    category: metadata.category,
    targetUrl: metadata.targetUrl,
    metadata: metadata,
    scheduledAt: scheduledAt,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  const queue = getQueue();
  queue.push(item);
  saveQueue(queue);

  console.log("──────────────────────────────────────────────────────────────────────");
  console.log("📅 [INSTAGRAM REELS QUEUE] Reel successfully scheduled!");
  console.log(`📌 Title:        ${metadata.title}`);
  console.log(`⏰ Scheduled At: ${scheduledAt} (UTC)`);
  console.log(`📁 Saved Video:  ${persistentVideoPath}`);
  console.log("──────────────────────────────────────────────────────────────────────");

  return item;
}

/**
 * Checks queue and publishes any due Instagram Reels.
 */
export async function processScheduledReelsQueue() {
  const queue = getQueue();
  const now = new Date();
  let updated = false;

  console.log(`🔎 Checking Instagram Reels queue at ${now.toISOString()}...`);

  for (const item of queue) {
    if (item.status === "pending") {
      const scheduledTime = new Date(item.scheduledAt);

      if (now >= scheduledTime) {
        console.log(`🚀 [DUE FOR RELEASE] Publishing: "${item.title}" (Scheduled for: ${item.scheduledAt})...`);

        if (!fs.existsSync(item.videoPath)) {
          console.error(`❌ Video file missing on disk: ${item.videoPath}`);
          item.status = "failed_missing_file";
          updated = true;
          continue;
        }

        try {
          const result = await uploadReelToInstagram(item.videoPath, item.metadata);
          if (result && (result.id || result.permalink)) {
            item.status = "published";
            item.publishedAt = new Date().toISOString();
            item.instagramReel = result.permalink || `https://www.instagram.com/reel/${result.id}/`;
            console.log(`🎉 Published Instagram Reel: ${item.instagramReel}`);

            // Clean up temporary scheduled file
            try { fs.unlinkSync(item.videoPath); } catch (_) {}
            updated = true;
          } else {
            console.error(`⚠️ Upload failed for item ${item.id}. Will retry on next tick.`);
          }
        } catch (err) {
          console.error(`❌ Error publishing scheduled Reel ${item.id}:`, err.message);
        }
      } else {
        const diffMinutes = Math.round((scheduledTime.getTime() - now.getTime()) / 60000);
        console.log(`⏳ [SCHEDULED] "${item.title}" will publish in ${diffMinutes} minutes (${item.scheduledAt})`);
      }
    }
  }

  if (updated) {
    saveQueue(queue);
  }
}

/**
 * Background worker loop for continuous execution.
 */
export async function startInstagramWorker(intervalSeconds = 60) {
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  📸 BitcoinCrypto.tech — Instagram Reels Background Scheduler Worker");
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log(`⏱️ Worker Interval: Checking queue every ${intervalSeconds} seconds.`);

  const creds = getInstagramCredentials();
  if (!creds) {
    console.error("❌ Instagram credentials missing in .env.local.");
    process.exit(1);
  }

  const account = await verifyInstagramAccount();
  if (account) {
    console.log(`✅ Connected Profile: @${account.username || "bitcoincrypto.tech"}`);
  }

  // Initial check immediately
  await processScheduledReelsQueue();

  // Polling loop
  setInterval(async () => {
    try {
      await processScheduledReelsQueue();
    } catch (err) {
      console.error("Worker tick error:", err.message);
    }
  }, intervalSeconds * 1000);
}

// CLI handler
async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--worker") || args.includes("-w")) {
    await startInstagramWorker(60);
  } else if (args.includes("--process-now") || args.includes("-p")) {
    await processScheduledReelsQueue();
  } else {
    // Status display
    const queue = getQueue();
    console.log("══════════════════════════════════════════════════════════════════════");
    console.log("  📊 Instagram Reels Scheduled Queue Status");
    console.log("══════════════════════════════════════════════════════════════════════");
    console.log(`Total Items in Queue: ${queue.length}`);
    const pending = queue.filter((i) => i.status === "pending");
    const published = queue.filter((i) => i.status === "published");
    console.log(`  • Pending:   ${pending.length}`);
    console.log(`  • Published: ${published.length}\n`);

    if (pending.length > 0) {
      console.log("⏳ PENDING REELS:");
      pending.forEach((p, idx) => {
        console.log(`  [${idx + 1}] "${p.title}"`);
        console.log(`      ⏰ Scheduled At: ${p.scheduledAt}`);
        console.log(`      📁 Video Path:   ${p.videoPath}`);
      });
    }

    if (published.length > 0) {
      console.log("\n✅ RECENTLY PUBLISHED REELS:");
      published.slice(-5).forEach((p, idx) => {
        console.log(`  [${idx + 1}] "${p.title}"`);
        console.log(`      🔗 Link: ${p.instagramReel}`);
      });
    }
    console.log("══════════════════════════════════════════════════════════════════════");
  }
}

if (process.argv[1] && process.argv[1].endsWith("instagramScheduler.mjs")) {
  main().catch(console.error);
}
