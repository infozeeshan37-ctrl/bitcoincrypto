/**
 * BitcoinCrypto.tech — YouTube Video Direct Auto-Uploader
 * 
 * Uploads video files (.mp4) directly to your YouTube Channel
 * using the official YouTube Data API v3.
 * 
 * Requirements in .env.local:
 *   YOUTUBE_CLIENT_ID
 *   YOUTUBE_CLIENT_SECRET
 *   YOUTUBE_REFRESH_TOKEN
 * 
 * Usage:
 *   node scripts/youtubeUploader.mjs                       # Generates today's short content & shows status
 *   node scripts/youtubeUploader.mjs --video=./my_clip.mp4  # Uploads the video file to YouTube
 */

import fs from "fs";
import path from "path";
import { generateDailyShort } from "./youtubeShortsGenerator.mjs";

async function getAccessToken() {
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

async function uploadVideoToYouTube(videoPath, metadata) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.log("ℹ️ YouTube API credentials not detected in .env.local.");
    console.log("ℹ️ You can copy the generated metadata and upload manually or configure API keys.");
    return false;
  }

  if (!fs.existsSync(videoPath)) {
    console.error(`❌ Video file not found: ${videoPath}`);
    return false;
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;

  console.log(`🚀 Initiating YouTube API upload for ${videoPath} (${(fileSize / (1024 * 1024)).toFixed(2)} MB)...`);

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
          description: metadata.description,
          tags: metadata.tags,
          categoryId: "27" // Education / Science & Tech
        },
        status: {
          privacyStatus: "public",
          selfDeclaredMadeForKids: false
        }
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

  const fileStream = fs.createReadStream(videoPath);
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Length": fileSize.toString(),
      "Content-Type": "video/mp4"
    },
    body: fileStream,
    duplex: "half"
  });

  if (!uploadRes.ok) {
    console.error("❌ Upload chunk failed:", await uploadRes.text());
    return false;
  }

  const result = await uploadRes.json();
  console.log(`✅ Upload Successful! Video ID: ${result.id}`);
  console.log(`🔗 Watch URL: https://youtube.com/shorts/${result.id}`);
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
    console.log("  ▶️ YouTube Content Generated & Ready for Today");
    console.log("══════════════════════════════════════════════════════════════════════");
    console.log(`Title: ${shortMetadata.title}`);
    console.log(`URL:   ${shortMetadata.targetUrl}`);
    console.log(`\nTo upload an .mp4 video file to YouTube directly via API, run:`);
    console.log(`  node scripts/youtubeUploader.mjs --video=./path_to_video.mp4\n`);
  }
}

if (process.argv[1].endsWith("youtubeUploader.mjs")) {
  main().catch(console.error);
}
