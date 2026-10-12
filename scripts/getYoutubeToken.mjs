/**
 * BitcoinCrypto.tech — YouTube OAuth Token Generator Helper
 * 
 * Run this script to generate your YOUTUBE_REFRESH_TOKEN in 3 easy steps.
 * 
 * Usage:
 *   node scripts/getYoutubeToken.mjs
 */

import readline from "readline";

const SCOPES = "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube";

async function main() {
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  🔑 YouTube OAuth 2.0 Refresh Token Setup Helper");
  console.log("══════════════════════════════════════════════════════════════════════\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  const clientId = process.env.YOUTUBE_CLIENT_ID || await question("👉 Enter your Google Client ID: ");
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET || await question("👉 Enter your Google Client Secret: ");

  if (!clientId || !clientSecret) {
    console.error("❌ Both Client ID and Client Secret are required.");
    rl.close();
    return;
  }

  // Use the standard redirect URI for desktop/testing
  const redirectUri = "https://developers.google.com/oauthplayground";

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId.trim())}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(SCOPES)}&access_type=offline&prompt=consent`;

  console.log("\n──────────────────────────────────────────────────────────────────────");
  console.log("Step 1: Open this URL in your browser and authorize your YouTube channel:");
  console.log("──────────────────────────────────────────────────────────────────────\n");
  console.log(authUrl);
  console.log("\n──────────────────────────────────────────────────────────────────────");
  console.log("Step 2: After clicking 'Allow', copy the 'code' parameter from the URL bar.");
  console.log("──────────────────────────────────────────────────────────────────────\n");

  const code = await question("👉 Paste the authorization code here: ");

  if (!code) {
    console.error("❌ No code provided.");
    rl.close();
    return;
  }

  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: decodeURIComponent(code.trim()),
        client_id: clientId.trim(),
        client_secret: clientSecret.trim(),
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      })
    });

    const data = await res.json();

    if (data.error) {
      console.error("\n❌ Error from Google:", data.error_description || data.error);
    } else {
      console.log("\n══════════════════════════════════════════════════════════════════════");
      console.log("  🎉 SUCCESS! Add these lines to your .env.local file:");
      console.log("══════════════════════════════════════════════════════════════════════\n");
      console.log(`YOUTUBE_CLIENT_ID=${clientId.trim()}`);
      console.log(`YOUTUBE_CLIENT_SECRET=${clientSecret.trim()}`);
      console.log(`YOUTUBE_REFRESH_TOKEN=${data.refresh_token}\n`);
      console.log("══════════════════════════════════════════════════════════════════════");
      console.log("Now you can automatically upload videos by running:");
      console.log("  node scripts/youtubeUploader.mjs --video=./my_video.mp4\n");
    }
  } catch (err) {
    console.error("❌ Network error:", err.message);
  }

  rl.close();
}

main().catch(console.error);
