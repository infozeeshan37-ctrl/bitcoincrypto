/**
 * BitcoinCrypto.tech — Exchange Authorization Code for Refresh Token
 * 
 * Usage:
 *   node scripts/exchangeCode.mjs "4/0A..."
 */

import fs from "fs";
import path from "path";

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID || "";
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET || "";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

async function main() {
  let code = process.argv[2];

  if (!code) {
    console.log("Usage: node scripts/exchangeCode.mjs <authorization_code>");
    return;
  }

  // Clean up if user pasted entire URL
  if (code.includes("code=")) {
    const match = code.match(/code=([^&]+)/);
    if (match) code = decodeURIComponent(match[1]);
  }

  console.log("🔄 Exchanging authorization code with Google OAuth2...");

  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: code.trim(),
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code"
      })
    });

    const data = await res.json();

    if (data.error) {
      console.error("❌ Google Exchange Error:", data.error_description || data.error);
      return;
    }

    console.log("\n🎉 SUCCESS! Generated matching tokens:");
    console.log("Refresh Token:", data.refresh_token);
    console.log("Access Token: ", data.access_token ? "Generated ✅" : "None");

    // Automatically save into .env.local
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath) && data.refresh_token) {
      let content = fs.readFileSync(envPath, "utf-8");
      content = content.replace(/YOUTUBE_REFRESH_TOKEN=.*/, `YOUTUBE_REFRESH_TOKEN=${data.refresh_token}`);
      fs.writeFileSync(envPath, content);
      console.log("✅ Automatically updated .env.local!");
    }
  } catch (err) {
    console.error("❌ Network error:", err.message);
  }
}

main().catch(console.error);
