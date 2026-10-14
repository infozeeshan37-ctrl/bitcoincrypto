/**
 * BitcoinCrypto.tech — Instagram Reels Auto-Uploader & Publisher
 * 
 * Uploads 9:16 vertical 4K videos directly to Instagram as Reels using
 * the official Meta Graph API v21.0 Resumable Upload protocol.
 * 
 * Requirements in .env.local:
 *   - INSTAGRAM_ACCOUNT_ID: The Instagram Business or Creator Account ID
 *   - INSTAGRAM_ACCESS_TOKEN: A Meta Graph API Access Token with `instagram_content_publish`
 * 
 * Usage:
 *   node scripts/instagramUploader.mjs                           # Check authentication & account status
 *   node scripts/instagramUploader.mjs --video=path/to/video.mp4 # Uploads video as an Instagram Reel
 */

import fs from "fs";
import path from "path";

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

export function getInstagramCredentials() {
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accountId || !accessToken) {
    return null;
  }

  return { accountId, accessToken };
}

/**
 * Verifies that the Instagram Business / Creator account is accessible.
 */
export async function verifyInstagramAccount() {
  const creds = getInstagramCredentials();
  if (!creds) return null;

  try {
    const url = `https://graph.facebook.com/v21.0/${creds.accountId}?fields=name,username,profile_picture_url,followers_count&access_token=${creds.accessToken}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.text();
      console.error("❌ Failed to verify Instagram Account:", err);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ Error verifying Instagram account:", err.message);
    return null;
  }
}

/**
 * Formats metadata into an Instagram Reel caption with high-ranking hashtags & bio callout.
 */
export function formatInstagramCaption(metadata) {
  const title = (metadata.title || "Crypto Alert")
    .replace(/#Shorts/gi, "")
    .replace(/[#*]/g, "")
    .trim();

  const targetUrl = metadata.targetUrl || "https://www.bitcoincrypto.tech";
  const tags = (metadata.tags || ["Crypto", "Bitcoin", "Trading", "Reels"])
    .map((t) => `#${t.replace(/[^a-zA-Z0-9]/g, "")}`)
    .slice(0, 15)
    .join(" ");

  return `${title} 🚀

Explore real-time order books, AI predictions, and CoinGlass heatmaps:
🔗 Link in Bio: bitcoincrypto.tech
👉 Direct Terminal: ${targetUrl}

⚠️ Strictly for educational and quantitative analytics. Not financial advice. Zero betting or gambling.

${tags} #CryptoReels #Reels #BitcoinCrypto`;
}

/**
 * Uploads a video file (.mp4) to Instagram Reels using the Meta Graph API Resumable Protocol.
 */
export async function uploadReelToInstagram(videoPath, metadata) {
  const creds = getInstagramCredentials();

  if (!creds) {
    console.log("ℹ️ Instagram credentials (INSTAGRAM_ACCOUNT_ID, INSTAGRAM_ACCESS_TOKEN) not set in .env.local.");
    console.log("   Skipping Instagram Reel publication. (See docs for 1-click Instagram setup).");
    return null;
  }

  if (!fs.existsSync(videoPath)) {
    console.error(`❌ Video file not found: ${videoPath}`);
    return null;
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const caption = formatInstagramCaption(metadata);

  console.log("──────────────────────────────────────────────────────────────────────");
  console.log(`📸 Initiating Instagram Reel Upload via Meta Graph API v21.0...`);
  console.log(`📁 File Size: ${(fileSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`🆔 Target Account ID: ${creds.accountId}`);
  console.log("──────────────────────────────────────────────────────────────────────");

  // Step 1: Create Resumable Reels Media Container on Meta Graph API
  const initUrl = `https://graph.facebook.com/v21.0/${creds.accountId}/media`;
  const initRes = await fetch(initUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_token: creds.accessToken,
      media_type: "REELS",
      upload_type: "resumable",
      caption: caption,
      share_to_feed: true
    })
  });

  if (!initRes.ok) {
    const errText = await initRes.text();
    console.error("❌ Failed to create Instagram Reels container:", errText);
    return null;
  }

  const initData = await initRes.json();
  const containerId = initData.id;
  const uploadUri = initData.uri;

  console.log(`📦 Reel Container Created: ${containerId}`);
  console.log(`🌐 Streaming video binary to Meta rupload endpoint...`);

  // Step 2: Stream raw binary buffer to Meta's rupload endpoint
  const fileBuffer = fs.readFileSync(videoPath);
  const uploadRes = await fetch(uploadUri, {
    method: "POST",
    headers: {
      Authorization: `OAuth ${creds.accessToken}`,
      Offset: "0",
      file_size: fileSize.toString(),
      "Content-Type": "application/octet-stream"
    },
    body: fileBuffer
  });

  if (!uploadRes.ok) {
    const uploadErr = await uploadRes.text();
    console.error("❌ Failed to stream video binary to Instagram:", uploadErr);
    return null;
  }

  console.log("✅ Video streamed to Meta servers. Waiting for server-side processing...");

  // Step 3: Poll Meta container status until FINISHED
  let status = "IN_PROGRESS";
  let attempts = 0;
  const maxAttempts = 30; // 30 x 4s = 120s max timeout

  while (attempts < maxAttempts) {
    await new Promise((r) => setTimeout(r, 4000));
    attempts++;

    const statusRes = await fetch(
      `https://graph.facebook.com/v21.0/${containerId}?fields=status_code&access_token=${creds.accessToken}`
    );

    if (statusRes.ok) {
      const statusData = await statusRes.json();
      status = statusData.status_code;
      console.log(`⏳ Processing status [Attempt ${attempts}/${maxAttempts}]: ${status}`);

      if (status === "FINISHED") {
        break;
      } else if (status === "ERROR") {
        console.error("❌ Meta processing error on Reels container.");
        return null;
      }
    }
  }

  if (status !== "FINISHED") {
    console.error(`❌ Timed out waiting for Instagram Reel container processing (status: ${status}).`);
    return null;
  }

  // Step 4: Publish Reel
  console.log("🚀 Publishing container to Instagram Reels feed...");
  const publishUrl = `https://graph.facebook.com/v21.0/${creds.accountId}/media_publish`;
  const publishRes = await fetch(publishUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_token: creds.accessToken,
      creation_id: containerId
    })
  });

  if (!publishRes.ok) {
    const pubErr = await publishRes.text();
    console.error("❌ Failed to publish Instagram Reel:", pubErr);
    return null;
  }

  const publishData = await publishRes.json();
  const mediaId = publishData.id;

  // Retrieve permalink
  let permalink = null;
  try {
    const mediaRes = await fetch(
      `https://graph.facebook.com/v21.0/${mediaId}?fields=permalink&access_token=${creds.accessToken}`
    );
    if (mediaRes.ok) {
      const mediaData = await mediaRes.json();
      permalink = mediaData.permalink;
    }
  } catch (_) {}

  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("🎉 SUCCESS! Instagram Reel is now LIVE!");
  console.log(`🆔 Media ID:    ${mediaId}`);
  if (permalink) {
    console.log(`🔗 Reel URL:    ${permalink}`);
  }
  console.log("══════════════════════════════════════════════════════════════════════");

  return {
    success: true,
    mediaId,
    permalink: permalink || `https://www.instagram.com/reel/${mediaId}/`,
    platform: "instagram"
  };
}

async function main() {
  const args = process.argv.slice(2);
  const videoArg = args.find((a) => a.startsWith("--video="));
  const videoPath = videoArg ? videoArg.split("=")[1] : null;

  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  📸 BitcoinCrypto.tech — Instagram Reels Publisher Check");
  console.log("══════════════════════════════════════════════════════════════════════");

  const creds = getInstagramCredentials();
  if (!creds) {
    console.log("⚠️ Instagram credentials not detected in .env.local.");
    console.log("To enable automatic Instagram Reels publishing, add the following to .env.local:");
    console.log("  INSTAGRAM_ACCOUNT_ID=your_instagram_business_account_id");
    console.log("  INSTAGRAM_ACCESS_TOKEN=your_meta_graph_api_access_token");
    console.log("\nSee docs/INSTAGRAM_SETUP.md for complete step-by-step instructions.");
    return;
  }

  console.log("🔑 Checking Meta Graph API credentials...");
  const account = await verifyInstagramAccount();
  if (account) {
    console.log(`✅ Connected Instagram Account: @${account.username || account.name}`);
    console.log(`🆔 Account ID:                  ${account.id}`);
    if (account.followers_count !== undefined) {
      console.log(`👥 Followers:                   ${account.followers_count.toLocaleString()}`);
    }
  }

  if (videoPath) {
    const dummyMetadata = {
      title: "Bitcoin Breakout Alert",
      targetUrl: "https://www.bitcoincrypto.tech/predictions",
      tags: ["Crypto", "Bitcoin", "Trading", "Reels"]
    };
    await uploadReelToInstagram(videoPath, dummyMetadata);
  }
}

if (process.argv[1] && process.argv[1].endsWith("instagramUploader.mjs")) {
  main().catch(console.error);
}
