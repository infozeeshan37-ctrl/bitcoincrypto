/**
 * BitcoinCrypto.tech — Snapchat OAuth Refresh Token Generator
 * 
 * Exchanges Snapchat OAuth Authorization Code for a permanent Refresh Token
 * and automatically saves SNAPCHAT_REFRESH_TOKEN to .env.local.
 * 
 * Usage:
 *   node scripts/getSnapchatToken.mjs
 */

import fs from "fs";
import path from "path";
import http from "http";
import readline from "readline";

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

const CLIENT_ID = (process.env.SNAPCHAT_CLIENT_ID || "").trim();
const CLIENT_SECRET = (process.env.SNAPCHAT_CLIENT_SECRET || "").trim();
const PORT = 3000;
const REDIRECT_URI = `http://localhost:${PORT}`;

async function main() {
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  🔑 Snapchat OAuth 2.0 Refresh Token Setup Helper");
  console.log("══════════════════════════════════════════════════════════════════════\n");

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("❌ SNAPCHAT_CLIENT_ID or SNAPCHAT_CLIENT_SECRET missing in .env.local.");
    process.exit(1);
  }

  console.log(`🆔 Client ID:     ${CLIENT_ID}`);
  console.log(`🔒 Client Secret: ${CLIENT_SECRET.slice(0, 6)}...${CLIENT_SECRET.slice(-4)}`);
  console.log(`📍 Redirect URI:  ${REDIRECT_URI}`);
  console.log("\n⚠️ IMPORTANT: Make sure you added http://localhost:3000 to Redirect URIs in your Snap Kit Portal!");

  const scopes = [
    "snapchat-marketing-api",
    "https://auth.snapchat.com/oauth2/api/user.display_name",
    "https://auth.snapchat.com/oauth2/api/user.external_id"
  ].join(" ");

  const authUrl = `https://accounts.snapchat.com/login/oauth2/authorize?client_id=${encodeURIComponent(CLIENT_ID)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(scopes)}`;

  console.log("\n──────────────────────────────────────────────────────────────────────");
  console.log("Step 1: Open this URL in your browser to authorize your Snapchat account:");
  console.log("──────────────────────────────────────────────────────────────────────\n");
  console.log(authUrl);
  console.log("\n──────────────────────────────────────────────────────────────────────");

  // Spin up temporary local server to catch redirect code automatically
  let serverResolve;
  const serverPromise = new Promise((resolve) => { serverResolve = resolve; });

  const server = http.createServer((req, res) => {
    const reqUrl = new URL(req.url, REDIRECT_URI);
    const code = reqUrl.searchParams.get("code");
    if (code) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <div style="font-family:sans-serif; text-align:center; padding:50px;">
          <h1 style="color:#059669;">Authorization Successful!</h1>
          <p>You can close this tab now and return to your terminal.</p>
        </div>
      `);
      serverResolve(code);
    } else {
      res.writeHead(400);
      res.end("No code found.");
    }
  });

  server.listen(PORT, () => {
    console.log(`👂 Listening on ${REDIRECT_URI} for automatic authorization callback...`);
    console.log("   (Or you can paste the authorization code below if you prefer)\n");
  });

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const manualInputPromise = new Promise((resolve) => {
    rl.question("👉 Paste the authorization code here (or wait for automatic capture): ", (code) => {
      resolve(code.trim());
    });
  });

  const code = await Promise.race([serverPromise, manualInputPromise]);
  rl.close();
  server.close();

  if (!code) {
    console.error("❌ No authorization code received.");
    process.exit(1);
  }

  console.log("\n⏳ Exchanging authorization code with Snapchat API...");

  try {
    const tokenRes = await fetch("https://accounts.snapchat.com/login/oauth2/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI
      })
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error("❌ Token exchange failed:", tokenRes.status, err);
      process.exit(1);
    }

    const tokenData = await tokenRes.json();
    console.log("🎉 SUCCESS: Snapchat Tokens received!");
    console.log(`Access Token:  ${tokenData.access_token?.slice(0, 10)}... (valid for ${tokenData.expires_in}s)`);
    console.log(`Refresh Token: ${tokenData.refresh_token?.slice(0, 10)}...`);

    // Save refresh token to .env.local
    const envPath = path.resolve(process.cwd(), ".env.local");
    let envContent = fs.readFileSync(envPath, "utf-8");

    if (envContent.includes("SNAPCHAT_REFRESH_TOKEN=")) {
      envContent = envContent.replace(/SNAPCHAT_REFRESH_TOKEN=.*/, `SNAPCHAT_REFRESH_TOKEN=${tokenData.refresh_token || tokenData.access_token}`);
    } else {
      envContent += `\nSNAPCHAT_REFRESH_TOKEN=${tokenData.refresh_token || tokenData.access_token}\n`;
    }

    fs.writeFileSync(envPath, envContent, "utf-8");
    console.log("💾 Updated .env.local with SNAPCHAT_REFRESH_TOKEN!");
    console.log("══════════════════════════════════════════════════════════════════════");
    console.log("✅ Snapchat integration is now 100% configured via official API!");
    console.log("══════════════════════════════════════════════════════════════════════");

  } catch (err) {
    console.error("❌ Error during Snapchat token exchange:", err.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
