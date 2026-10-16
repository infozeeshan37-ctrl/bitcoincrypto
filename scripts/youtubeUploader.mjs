/**
 * BitcoinCrypto.tech — YouTube Video Direct Auto-Uploader & Scheduler
 * 
 * Uploads video files (.mp4) directly to your YouTube Channel
 * using the official YouTube Data API v3 with scheduled release & comments support.
 */

import fs from "fs";
import path from "path";
import { execSync, spawnSync } from "child_process";
import { generateDailyShort } from "./youtubeShortsGenerator.mjs";

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

export async function getAccessToken() {
  const clientId = process.env.YOUTUBE_CLIENT_ID;
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
  const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token"
      })
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("❌ Failed to refresh YouTube OAuth token:", err);
      return null;
    }

    const data = await res.json();
    return data.access_token;
  } catch (error) {
    console.error("❌ Error fetching YouTube access token:", error.message);
    return null;
  }
}

export async function verifyChannel(accessToken) {
  try {
    const res = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.items && data.items.length > 0 ? data.items[0] : null;
  } catch {
    return null;
  }
}

export async function postPinnedComment(accessToken, videoId, commentText) {
  if (!commentText) return null;
  try {
    const res = await fetch("https://www.googleapis.com/youtube/v3/commentThreads?part=snippet", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        snippet: {
          videoId: videoId,
          topLevelComment: {
            snippet: {
              textOriginal: commentText
            }
          }
        }
      })
    });
    if (res.ok) {
      const data = await res.json();
      console.log(`💬 Clickable pinned link comment posted: https://youtube.com/shorts/${videoId}`);
      return data;
    } else {
      const err = await res.text();
      console.log("ℹ️ Note on comment posting:", err.includes("disabled") ? "Comments disabled or restricted" : "Skipped");
      return null;
    }
  } catch (_) {
    return null;
  }
}

export async function uploadVideoToYouTube(videoPath, metadata) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.log("ℹ️ YouTube API credentials not detected in .env.local.");
    return false;
  }

  if (!fs.existsSync(videoPath)) {
    console.error(`❌ Video file not found: ${videoPath}`);
    return false;
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;

  const isScheduled = !!metadata.publishAt;
  console.log(`🚀 Initiating YouTube API upload for ${videoPath} (${(fileSize / (1024 * 1024)).toFixed(2)} MB)...`);
  if (isScheduled) {
    console.log(`⏰ Scheduled Public Release Time: ${metadata.publishAt}`);
  }

  // Format description with clickable link at the very top
  const formattedDescription = `🔥 CLICKABLE DIRECT LINK TO THIS TOOL:\n👉 ${metadata.targetUrl || "https://www.bitcoincrypto.tech"}\n(Tap link above to open free live terminal!)\n\n${metadata.description}`;

  const statusPayload = isScheduled
    ? {
        privacyStatus: "private",
        publishAt: metadata.publishAt,
        selfDeclaredMadeForKids: false
      }
    : {
        privacyStatus: "public",
        selfDeclaredMadeForKids: false
      };

  const initialRes = await fetch(
    "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
        "X-Upload-Content-Length": fileSize.toString(),
        "X-Upload-Content-Type": "video/mp4"
      },
      body: JSON.stringify({
        snippet: {
          title: metadata.title,
          description: formattedDescription,
          tags: metadata.tags,
          categoryId: "27" // Education / Science & Tech
        },
        status: statusPayload
      })
    }
  );

  if (!initialRes.ok) {
    console.error("❌ Failed to initiate resumable upload:", await initialRes.text());
    return false;
  }

  const uploadUrl = initialRes.headers.get("location");
  if (!uploadUrl) {
    console.error("❌ No upload URL received from YouTube.");
    return false;
  }

  console.log(`📡 Streaming video binary (${(fileSize / (1024 * 1024)).toFixed(2)} MB) to YouTube resumable pipeline...`);
  let result = null;

  try {
    // Attempt via curl.exe spawnSync (immune to shell escaping & undici headersTimeout)
    const curlProc = spawnSync(
      "curl.exe",
      ["-s", "-S", "-X", "PUT", "-H", "Content-Type: video/mp4", "-T", videoPath, uploadUrl],
      { maxBuffer: 50 * 1024 * 1024, timeout: 300000 }
    );
    const stdout = curlProc.stdout ? curlProc.stdout.toString("utf-8") : "";
    if (stdout && stdout.includes('"id":')) {
      result = JSON.parse(stdout);
    } else if (curlProc.stderr && curlProc.stderr.length > 0) {
      console.log(`ℹ️ curl info: ${curlProc.stderr.toString("utf-8").trim()}`);
    }
  } catch (curlErr) {
    console.log(`ℹ️ curl upload notice: ${curlErr.message}. Trying fetch fallback...`);
  }

  if (!result) {
    const fileBuffer = fs.readFileSync(videoPath);
    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Length": fileSize.toString(),
        "Content-Type": "video/mp4"
      },
      body: fileBuffer
    });

    if (!uploadRes.ok) {
      console.error("❌ Upload chunk failed:", await uploadRes.text());
      return false;
    }
    result = await uploadRes.json();
  }
  console.log(`✅ Upload Successful! Video ID: ${result.id}`);
  console.log(`🔗 Watch URL: https://youtube.com/shorts/${result.id}`);
  if (isScheduled) {
    console.log(`📅 Status: Scheduled to publish at ${metadata.publishAt}`);
  }

  // Post clickable link in comments
  if (metadata.pinnedComment) {
    await postPinnedComment(accessToken, result.id, metadata.pinnedComment);
  }

  return result;
}

async function main() {
  const args = process.argv.slice(2);
  const videoArg = args.find((a) => a.startsWith("--video="));
  const videoPath = videoArg ? videoArg.split("=")[1] : null;

  const shortMetadata = await generateDailyShort();

  if (videoPath) {
    await uploadVideoToYouTube(videoPath, shortMetadata);
  } else {
    console.log("══════════════════════════════════════════════════════════════════════");
    console.log("  ▶️ YouTube Automation Status & Content Preview");
    console.log("══════════════════════════════════════════════════════════════════════");

    const token = await getAccessToken();
    if (token) {
      console.log("🔑 YouTube OAuth Status: ✅ Authenticated & Connected!");
      const channel = await verifyChannel(token);
      if (channel) {
        console.log(`📺 Connected Channel:    ${channel.snippet?.title || "Your Channel"}`);
        console.log(`🆔 Channel ID:            ${channel.id}`);
      }
    }
  }
}

if (process.argv[1] && process.argv[1].endsWith("youtubeUploader.mjs")) {
  main().catch(console.error);
}
