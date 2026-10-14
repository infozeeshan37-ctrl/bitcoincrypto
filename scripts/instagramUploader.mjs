/**
 * BitcoinCrypto.tech — Instagram Reels Auto-Uploader & Publisher
 * 
 * Supports both:
 *   1. Instagram Graph API (Instagram User Tokens: `IGAA...`) via `graph.instagram.com`
 *   2. Meta Facebook Graph API (Page Access Tokens: `EAAB...`) via `graph.facebook.com`
 * 
 * Requirements in .env.local:
 *   - INSTAGRAM_ACCOUNT_ID: Your Instagram Business/Creator Account ID
 *   - INSTAGRAM_ACCESS_TOKEN: Your Instagram Access Token
 * 
 * Usage:
 *   node scripts/instagramUploader.mjs                           # Verify account connection & status
 *   node scripts/instagramUploader.mjs --video=path/to/video.mp4 # Uploads a specific video as an Instagram Reel
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
  const accountId = (process.env.INSTAGRAM_ACCOUNT_ID || "").replace(/[\[\]]/g, "").trim();
  const accessToken = (process.env.INSTAGRAM_ACCESS_TOKEN || "").trim();

  if (!accessToken) {
    return null;
  }

  return { accountId: accountId || "me", accessToken };
}

import { execFile } from "child_process";
import util from "util";

const execFileAsync = util.promisify(execFile);

/**
 * Uploads a local video to a secure high-speed CDN using streaming curl
 * to obtain a direct HTTPS video_url required by the Instagram Graph API.
 */
async function hostVideoTemporarily(videoPath) {
  console.log("🌐 Staging 4K video on high-speed CDN for Instagram download...");
  const absPath = path.resolve(videoPath);

  try {
    const { stdout } = await execFileAsync("curl.exe", [
      "-s",
      "-F", "reqtype=fileupload",
      "-F", `fileToUpload=@${absPath}`,
      "https://catbox.moe/user/api.php"
    ]);

    const directUrl = stdout.trim();
    if (!directUrl.startsWith("http")) {
      throw new Error(`Invalid response from host: ${directUrl}`);
    }

    console.log(`✅ Staged video URL ready: ${directUrl}`);
    return directUrl;
  } catch (err) {
    console.error("❌ Error uploading video to staging CDN:", err.message);
    throw err;
  }
}

/**
 * Verifies that the connected Instagram Account is active and responsive.
 */
export async function verifyInstagramAccount() {
  const creds = getInstagramCredentials();
  if (!creds) return null;

  const isInstagramDirect = creds.accessToken.startsWith("IGAA") || creds.accessToken.startsWith("IGQ");
  const host = isInstagramDirect ? "https://graph.instagram.com" : "https://graph.facebook.com";
  const target = isInstagramDirect ? "me" : creds.accountId;

  try {
    const url = `${host}/v21.0/${target}?fields=id,username,account_type&access_token=${creds.accessToken}`;
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

Live Order Flow, AI Predictions & CoinGlass Heatmaps:
🔗 Link in Bio: bitcoincrypto.tech
👉 Direct Terminal: ${targetUrl}

⚠️ Strictly for educational and quantitative research purposes only. Not financial advice. Zero betting or gambling.

${tags} #CryptoReels #Reels #BitcoinCrypto`;
}

/**
 * Uploads a video file (.mp4) directly to Instagram as a Reel.
 */
export async function uploadReelToInstagram(videoPath, metadata) {
  const creds = getInstagramCredentials();

  if (!creds) {
    console.log("ℹ️ Instagram credentials not configured in .env.local. Skipping Instagram.");
    return null;
  }

  if (!fs.existsSync(videoPath)) {
    console.error(`❌ Video file not found: ${videoPath}`);
    return null;
  }

  const stat = fs.statSync(videoPath);
  const fileSizeMb = (stat.size / (1024 * 1024)).toFixed(2);
  const caption = formatInstagramCaption(metadata);

  console.log("──────────────────────────────────────────────────────────────────────");
  console.log(`📸 Initiating Instagram Reel Publishing (${fileSizeMb} MB)...`);
  console.log("──────────────────────────────────────────────────────────────────────");

  const isInstagramDirect = creds.accessToken.startsWith("IGAA") || creds.accessToken.startsWith("IGQ");
  const host = isInstagramDirect ? "https://graph.instagram.com" : "https://graph.facebook.com";
  const target = isInstagramDirect ? "me" : creds.accountId;

  // Step 1: Stage video on high-speed CDN to obtain direct HTTPS URL for Instagram
  const videoUrl = await hostVideoTemporarily(videoPath);

  // Step 2: Create Reels container on Instagram Graph API
  console.log("📦 Creating Instagram Reels Media Container...");
  const initUrl = `${host}/v21.0/${target}/media`;
  const initRes = await fetch(initUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_token: creds.accessToken,
      media_type: "REELS",
      video_url: videoUrl,
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
  console.log(`📦 Reel Container Created ID: ${containerId}`);

  // Step 3: Poll status until FINISHED
  console.log("⏳ Processing Reel on Instagram servers...");
  let status = "IN_PROGRESS";
  let attempts = 0;
  const maxAttempts = 30; // 30 x 4s = 120s max

  while (attempts < maxAttempts) {
    await new Promise((r) => setTimeout(r, 4000));
    attempts++;

    const statusRes = await fetch(
      `${host}/v21.0/${containerId}?fields=status_code&access_token=${creds.accessToken}`
    );

    if (statusRes.ok) {
      const statusData = await statusRes.json();
      status = statusData.status_code;
      console.log(`  • Status check [${attempts}/${maxAttempts}]: ${status}`);

      if (status === "FINISHED") {
        break;
      } else if (status === "ERROR") {
        console.error("❌ Instagram server processing error on Reel container.");
        return null;
      }
    }
  }

  if (status !== "FINISHED") {
    console.error(`❌ Timed out waiting for Instagram Reel container (status: ${status}).`);
    return null;
  }

  // Step 4: Publish Reel
  console.log("🚀 Publishing container to Instagram Reels feed...");
  const publishUrl = `${host}/v21.0/${target}/media_publish`;
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
      `${host}/v21.0/${mediaId}?fields=id,permalink,media_type,timestamp&access_token=${creds.accessToken}`
    );
    if (mediaRes.ok) {
      const mediaData = await mediaRes.json();
      permalink = mediaData.permalink;
    }
  } catch (_) {}

  const finalUrl = permalink || `https://www.instagram.com/reel/${mediaId}/`;
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("🎉 SUCCESS! Instagram Reel is now LIVE on your profile!");
  console.log(`🆔 Media ID:    ${mediaId}`);
  console.log(`🔗 Reel URL:    ${finalUrl}`);
  console.log("══════════════════════════════════════════════════════════════════════");

  return {
    success: true,
    mediaId,
    permalink: finalUrl,
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
    return;
  }

  console.log("🔑 Checking Instagram credentials...");
  const account = await verifyInstagramAccount();
  if (account) {
    console.log(`✅ Connected Account:   @${account.username || account.name}`);
    console.log(`🆔 Account ID:          ${account.id}`);
    console.log(`💼 Account Type:        ${account.account_type || "Professional"}`);
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
