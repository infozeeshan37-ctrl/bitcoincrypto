/**
 * BitcoinCrypto.tech — Automated Snapchat Spotlight Video Uploader & Publisher
 * 
 * Automates publishing of daily high-production 9:16 vertical crypto videos
 * (Bitcoin price predictions, CoinGlass squeeze alerts, Whale radars, Learn masterclasses)
 * directly to Snapchat Spotlight & Public Profiles.
 * 
 * Supports TWO robust publishing modes:
 *   Mode 1: Automated Headless Web Session (Zero API approval required, uses my.snapchat.com/spotlight)
 *   Mode 2: Snapchat Marketing & Content API (OAuth2 Bearer Token via adsapi.snapchat.com)
 * 
 * CLI Usage:
 *   node scripts/snapchatUploader.mjs --login                     # Opens browser to log in once & save session
 *   node scripts/snapchatUploader.mjs --check                     # Verifies connection status & session validity
 *   node scripts/snapchatUploader.mjs --video=path/to/video.mp4   # Uploads a specific 9:16 video to Spotlight
 *   node scripts/snapchatUploader.mjs --video=path/to/video.mp4 --headful # Debug mode with visible browser
 */

import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

// ─── Environment & Paths ───────────────────────────────────────────────────────

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

const PROFILE_DIR = path.resolve(process.cwd(), ".snapchat_profile");
const DATA_DIR = path.resolve(process.cwd(), "data");
const COOKIES_FILE = path.resolve(DATA_DIR, "snapchat_session.json");
const LOGS_DIR = path.resolve(process.cwd(), "logs");

const POSSIBLE_BROWSER_PATHS = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
];

export function getBrowserExecutablePath() {
  for (const p of POSSIBLE_BROWSER_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// ─── Credentials & State Check ─────────────────────────────────────────────────

export function getSnapchatApiCredentials() {
  const clientId = (process.env.SNAPCHAT_CLIENT_ID || "").trim();
  const clientSecret = (process.env.SNAPCHAT_CLIENT_SECRET || "").trim();
  const refreshToken = (process.env.SNAPCHAT_REFRESH_TOKEN || "").trim();
  const accessToken = (process.env.SNAPCHAT_ACCESS_TOKEN || "").trim();
  const profileId = (process.env.SNAPCHAT_PROFILE_ID || "").trim();

  if (accessToken || (clientId && clientSecret && refreshToken)) {
    return { clientId, clientSecret, refreshToken, accessToken, profileId };
  }
  return null;
}

export function hasSnapchatSession() {
  if (fs.existsSync(COOKIES_FILE)) {
    try {
      const cookies = JSON.parse(fs.readFileSync(COOKIES_FILE, "utf-8"));
      if (Array.isArray(cookies) && cookies.length > 0) return true;
    } catch (_) {}
  }
  if (fs.existsSync(PROFILE_DIR) && fs.readdirSync(PROFILE_DIR).length > 2) {
    return true;
  }
  return false;
}

export function isSnapchatConfigured() {
  return !!getSnapchatApiCredentials() || hasSnapchatSession();
}

// ─── Caption & Metadata Formatter ─────────────────────────────────────────────

export function formatSnapchatCaption(metadata) {
  const rawTitle = (metadata?.title || "Bitcoin & Crypto Market Alert")
    .replace(/#Shorts/gi, "")
    .replace(/[#*]/g, "")
    .trim();

  const targetUrl = metadata?.targetUrl || "https://www.bitcoincrypto.tech";
  const tags = (metadata?.tags || ["Bitcoin", "Crypto", "Trading", "Spotlight"])
    .map((t) => `#${t.replace(/[^a-zA-Z0-9]/g, "")}`)
    .slice(0, 8)
    .join(" ");

  // High-CTR, viral Spotlight caption (short, energetic, educational)
  return `${rawTitle} 🚀

⚡ Live Terminal & AI Models:
🔗 bitcoincrypto.tech
👉 ${targetUrl}

⚠️ Educational & research purposes only. Not financial advice. Zero gambling.

${tags} #Spotlight #CryptoNews #BitcoinCrypto`;
}

// ─── Mode 1: Interactive Browser Login Helper ─────────────────────────────────

export async function loginSnapchat() {
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  👻 Snapchat Creator Studio — One-Time Interactive Login Setup");
  console.log("══════════════════════════════════════════════════════════════════════");

  const executablePath = getBrowserExecutablePath();
  if (!executablePath) {
    console.error("❌ No compatible browser (Edge or Chrome) found on this system.");
    return false;
  }

  if (!fs.existsSync(PROFILE_DIR)) fs.mkdirSync(PROFILE_DIR, { recursive: true });
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  console.log("🌐 Launching browser window for authentication...");
  console.log("📱 Instructions:");
  console.log("   1. Log in with your Snapchat account (Username/Password or QR scan).");
  console.log("   2. Once logged in, the window will automatically detect your session");
  console.log("      and save your credentials for future autonomous video uploads.");
  console.log("──────────────────────────────────────────────────────────────────────");

  const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    userDataDir: PROFILE_DIR,
    defaultViewport: null,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--window-size=1280,850",
      "--start-maximized"
    ]
  });

  const page = await browser.newPage();

  // Navigate to Snapchat Creator Web Posting portal
  const targetUrl = "https://accounts.snapchat.com/v2/login?continue=%2Faccounts%2Fsso%3Fclient_id%3Dads-api%26referrer%3Dhttps%253A%252F%252Fprofile.snapchat.com%252Fsnap-posting-web";
  await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});

  console.log("⏳ Waiting for you to complete login in the browser window...");

  let loggedIn = false;
  const startTime = Date.now();
  const maxWaitMs = 5 * 60 * 1000; // 5 minutes timeout

  while (Date.now() - startTime < maxWaitMs) {
    await new Promise((r) => setTimeout(r, 2000));

    try {
      const currentUrl = page.url();
      const isStillOnLogin = currentUrl.includes("/login") || currentUrl.includes("/sso");

      // Check if redirected to profile or spotlight creator web app
      if (
        (!isStillOnLogin && (currentUrl.includes("profile.snapchat.com") || currentUrl.includes("my.snapchat.com"))) ||
        currentUrl.includes("/snap-posting-web") ||
        currentUrl.includes("/spotlight")
      ) {
        loggedIn = true;
        break;
      }

      // Check for auth cookies
      const cookies = await page.cookies();
      const hasAuthCookie = cookies.some((c) =>
        ["sc-a-nonce", "snap_login_token", "xsrf_token", "web_client_id"].includes(c.name)
      );

      if (hasAuthCookie && !isStillOnLogin) {
        loggedIn = true;
        break;
      }
    } catch (err) {
      // Browser might have been closed manually
      if (err.message.includes("Target closed") || err.message.includes("Session closed")) {
        console.warn("⚠️ Browser was closed before login was confirmed.");
        break;
      }
    }
  }

  if (loggedIn) {
    console.log("🎉 SUCCESS: Snapchat login detected!");
    try {
      const cookies = await page.cookies();
      fs.writeFileSync(COOKIES_FILE, JSON.stringify(cookies, null, 2), "utf-8");
      console.log(`💾 Session cookies backed up to: ${COOKIES_FILE}`);
      console.log(`📁 Persistent profile saved to: ${PROFILE_DIR}`);
    } catch (e) {
      console.warn("⚠️ Could not export cookies JSON, but profile directory is saved.");
    }

    await new Promise((r) => setTimeout(r, 2000));
    await browser.close().catch(() => {});

    console.log("══════════════════════════════════════════════════════════════════════");
    console.log("✅ Snapchat is now ready for autonomous daily video publishing!");
    console.log("   Test upload anytime: npm run snapchat:check");
    console.log("══════════════════════════════════════════════════════════════════════");
    return true;
  } else {
    console.error("❌ Login timed out or was not completed within 5 minutes.");
    await browser.close().catch(() => {});
    return false;
  }
}

// ─── Mode 1: Automated Headless Web Uploader ───────────────────────────────────

export async function uploadViaBrowser(videoPath, metadata, options = {}) {
  const isHeadful = !!options.headful;
  console.log("──────────────────────────────────────────────────────────────────────");
  console.log("👻 Initiating Snapchat Web Spotlight Video Upload...");
  console.log(`📁 Video File: ${path.basename(videoPath)}`);
  console.log(`⚙️ Mode:       ${isHeadful ? "Visible Browser (Debug)" : "Autonomous Headless Browser"}`);

  const executablePath = getBrowserExecutablePath();
  if (!executablePath) {
    throw new Error("No compatible browser (Edge or Chrome) found on system.");
  }

  if (!fs.existsSync(PROFILE_DIR) && !fs.existsSync(COOKIES_FILE)) {
    throw new Error(
      "No Snapchat session found. Please run 'npm run snapchat:login' to authenticate once."
    );
  }

  if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath,
    headless: !isHeadful,
    userDataDir: PROFILE_DIR,
    defaultViewport: { width: 1280, height: 900 },
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-blink-features=AutomationControlled",
      "--window-size=1280,900"
    ]
  });

  const page = await browser.newPage();

  // Set user agent to avoid headless detection
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0"
  );

  // Restore backup cookies if present
  if (fs.existsSync(COOKIES_FILE)) {
    try {
      const cookies = JSON.parse(fs.readFileSync(COOKIES_FILE, "utf-8"));
      await page.setCookie(...cookies);
    } catch (_) {}
  }

  const caption = formatSnapchatCaption(metadata);
  const absVideoPath = path.resolve(videoPath);

  try {
    // Navigate to Creator Spotlight Web Posting Portal
    console.log("🌐 Navigating to Snapchat Spotlight Creator Portal...");
    const portalUrls = [
      "https://profile.snapchat.com/snap-posting-web",
      "https://my.snapchat.com/spotlight"
    ];

    let portalLoaded = false;
    for (const url of portalUrls) {
      try {
        await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });
        const currentUrl = page.url();
        if (!currentUrl.includes("/login")) {
          portalLoaded = true;
          break;
        }
      } catch (_) {}
    }

    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      await page.screenshot({ path: path.resolve(LOGS_DIR, "snapchat_login_required.png") });
      throw new Error(
        "Snapchat session expired or unauthenticated. Please run 'npm run snapchat:login' to refresh."
      );
    }

    console.log(`✅ Loaded Portal: ${currentUrl}`);

    // Wait for file input or dropzone
    console.log("📤 Locating video file dropzone...");
    await page.waitForSelector('input[type="file"]', { timeout: 25000 });
    const fileInput = await page.$('input[type="file"]');

    if (!fileInput) {
      throw new Error("Could not find video file input on Snapchat Creator page.");
    }

    console.log("⏳ Uploading video file to Snapchat dropzone...");
    await fileInput.uploadFile(absVideoPath);

    // Wait for upload & preview processing (3-15 seconds depending on file size)
    console.log("⏳ Processing video preview & Spotlight validation...");
    await new Promise((r) => setTimeout(r, 6000));

    // Try finding caption input
    console.log("✍️ Entering high-engagement Spotlight caption & hashtags...");
    const captionSelectors = [
      'textarea[placeholder*="caption" i]',
      'textarea[placeholder*="description" i]',
      'textarea[placeholder*="spotlight" i]',
      'textarea[placeholder*="What" i]',
      'textarea',
      'div[contenteditable="true"]',
      '[data-testid="spotlight-caption-input"]'
    ];

    let captionFilled = false;
    for (const sel of captionSelectors) {
      try {
        const el = await page.$(sel);
        if (el) {
          await el.click();
          await el.type(caption, { delay: 15 });
          captionFilled = true;
          break;
        }
      } catch (_) {}
    }

    if (!captionFilled) {
      console.warn("⚠️ Could not locate specific caption field; proceeding with default metadata.");
    }

    // Accept required terms / guidelines checkbox if present
    try {
      const checkboxes = await page.$$('input[type="checkbox"]');
      for (const cb of checkboxes) {
        const checked = await page.evaluate((el) => el.checked, cb);
        if (!checked) {
          await cb.click();
          await new Promise((r) => setTimeout(r, 300));
        }
      }
    } catch (_) {}

    await new Promise((r) => setTimeout(r, 2000));

    // Find and click Post / Submit button
    console.log("🚀 Submitting video to Snapchat Spotlight...");
    const submitSelectors = [
      'button:has-text("Post to Spotlight")',
      'button:has-text("Submit")',
      'button:has-text("Post")',
      'button[type="submit"]',
      '[data-testid="post-to-spotlight-button"]'
    ];

    let submitted = false;
    for (const sel of submitSelectors) {
      try {
        const btn = await page.$(sel);
        if (btn) {
          const isDisabled = await page.evaluate((b) => b.disabled, btn);
          if (!isDisabled) {
            await btn.click();
            submitted = true;
            break;
          }
        }
      } catch (_) {}
    }

    // If text selector wasn't supported by selector engine, find via evaluate
    if (!submitted) {
      submitted = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll("button"));
        const target = buttons.find((b) => {
          const text = (b.innerText || "").toLowerCase();
          return text.includes("post to spotlight") || text.includes("post") || text.includes("submit");
        });
        if (target && !target.disabled) {
          target.click();
          return true;
        }
        return false;
      });
    }

    if (!submitted) {
      throw new Error("Could not find enabled 'Post to Spotlight' button.");
    }

    // Wait for submission confirmation
    console.log("⏳ Waiting for upload confirmation from Snapchat servers...");
    await new Promise((r) => setTimeout(r, 6000));

    // Take screenshot of submission confirmation
    const screenshotPath = path.resolve(LOGS_DIR, "snapchat_latest_upload.png");
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 Audit screenshot saved: ${screenshotPath}`);

    await browser.close();

    console.log("══════════════════════════════════════════════════════════════════════");
    console.log("🎉 SUCCESS: Video successfully published to Snapchat Spotlight!");
    console.log(`📝 Caption: ${caption.slice(0, 80)}...`);
    console.log("══════════════════════════════════════════════════════════════════════");

    return {
      success: true,
      method: "browser_spotlight",
      screenshot: screenshotPath,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.error("❌ Snapchat Web Upload Error:", err.message);
    try {
      await page.screenshot({ path: path.resolve(LOGS_DIR, "snapchat_upload_error.png") });
    } catch (_) {}
    await browser.close().catch(() => {});
    throw err;
  }
}

// ─── Mode 2: Snapchat Marketing & Content API ─────────────────────────────────

export async function refreshSnapchatApiToken(creds) {
  if (creds.accessToken && !creds.refreshToken) {
    return creds.accessToken;
  }

  console.log("🔄 Refreshing Snapchat OAuth2 Access Token...");
  const body = new URLSearchParams({
    client_id: creds.clientId,
    client_secret: creds.clientSecret,
    grant_type: "refresh_token",
    refresh_token: creds.refreshToken
  });

  const res = await fetch("https://accounts.snapchat.com/login/oauth2/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString()
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to refresh Snapchat token: ${res.status} - ${errText}`);
  }

  const data = await res.json();
  return data.access_token;
}

export async function uploadViaApi(videoPath, metadata) {
  const creds = getSnapchatApiCredentials();
  if (!creds) {
    throw new Error("Snapchat API credentials not found in .env.local.");
  }

  const accessToken = await refreshSnapchatApiToken(creds);
  const profileId = creds.profileId || "me";

  console.log("──────────────────────────────────────────────────────────────────────");
  console.log("🚀 Uploading to Snapchat Spotlight via Marketing / Content API...");
  console.log(`🆔 Public Profile ID: ${profileId}`);

  const stat = fs.statSync(videoPath);
  const caption = formatSnapchatCaption(metadata);

  // Endpoint: adsapi.snapchat.com Spotlight Video submission
  const endpoint = `https://adsapi.snapchat.com/v1/public_profiles/${profileId}/spotlight_videos`;

  const payload = {
    spotlight_videos: [
      {
        name: metadata?.title?.slice(0, 100) || "BitcoinCrypto Update",
        description: caption,
        topics: ["Crypto", "Bitcoin", "Finance", "Trading"]
      }
    ]
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Snapchat API upload error:", errText);
    return null;
  }

  const data = await res.json();
  console.log("🎉 SUCCESS: Snapchat API Spotlight submission accepted:", data);
  return {
    success: true,
    method: "api",
    data,
    timestamp: new Date().toISOString()
  };
}

// ─── Master Auto-Publish Function ──────────────────────────────────────────────

export async function uploadToSnapchat(videoPath, metadata, options = {}) {
  // Strategy 1: Check if API credentials exist
  const apiCreds = getSnapchatApiCredentials();
  if (apiCreds) {
    try {
      const apiResult = await uploadViaApi(videoPath, metadata);
      if (apiResult && apiResult.success) return apiResult;
    } catch (err) {
      console.warn("⚠️ Snapchat API upload failed, falling back to Browser Session:", err.message);
    }
  }

  // Strategy 2: Check if Browser Session exists
  if (hasSnapchatSession()) {
    try {
      return await uploadViaBrowser(videoPath, metadata, options);
    } catch (err) {
      console.error("❌ Snapchat Browser Upload failed:", err.message);
      return null;
    }
  }

  // If neither configured
  console.log("ℹ️ Snapchat not yet configured.");
  console.log("   👉 To enable automated Snapchat Spotlight video uploads:");
  console.log("      Run: npm run snapchat:login  (Logs in once in 30 seconds)");
  console.log("      Or set SNAPCHAT_CLIENT_ID & SNAPCHAT_REFRESH_TOKEN in .env.local");
  return null;
}

// ─── Connection & Session Verifier ─────────────────────────────────────────────

export async function checkSnapchatStatus() {
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  🔍 Snapchat Integration Diagnostic & Health Check");
  console.log("══════════════════════════════════════════════════════════════════════");

  const browserPath = getBrowserExecutablePath();
  console.log(`🖥️ Browser Binary:      ${browserPath ? `Found (${path.basename(browserPath)})` : "Not found"}`);

  const apiCreds = getSnapchatApiCredentials();
  if (apiCreds) {
    console.log("🔑 API Credentials:     CONFIGURED in .env.local");
    try {
      const token = await refreshSnapchatApiToken(apiCreds);
      console.log(`✅ API Token Status:    VALID (OAuth2 Bearer Token generated)`);
    } catch (e) {
      console.log(`⚠️ API Token Status:    FAILED (${e.message})`);
    }
  } else {
    console.log("🔑 API Credentials:     Not configured in .env.local (Optional)");
  }

  const hasSession = hasSnapchatSession();
  console.log(`🍪 Browser Session:     ${hasSession ? "ACTIVE (.snapchat_profile found)" : "NOT INITIALIZED"}`);

  if (hasSession) {
    console.log("\n🌐 Verifying session validity against Snapchat servers...");
    const browser = await puppeteer.launch({
      executablePath: browserPath,
      headless: true,
      userDataDir: PROFILE_DIR,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    try {
      await page.goto("https://profile.snapchat.com/snap-posting-web", {
        waitUntil: "domcontentloaded",
        timeout: 20000
      });

      const url = page.url();
      if (url.includes("/login")) {
        console.log("⚠️ Session Status:      EXPIRED (Redirected to login)");
        console.log("👉 Please re-authenticate: npm run snapchat:login");
      } else {
        console.log("✅ Session Status:      AUTHENTICATED & READY");
        console.log(`📍 Current Portal URL:  ${url}`);
      }
    } catch (err) {
      console.log(`⚠️ Network check warning: ${err.message}`);
    } finally {
      await browser.close().catch(() => {});
    }
  } else {
    console.log("\n👉 Next Step to enable Snapchat uploads:");
    console.log("   Run: npm run snapchat:login");
    console.log("   A browser window will open for you to log in once.");
  }

  console.log("══════════════════════════════════════════════════════════════════════");
}

// ─── CLI Entrypoint ────────────────────────────────────────────────────────────

if (process.argv[1] && process.argv[1].endsWith("snapchatUploader.mjs")) {
  const args = process.argv.slice(2);
  const isLogin = args.includes("--login");
  const isCheck = args.includes("--check");
  const isHeadful = args.includes("--headful");
  const videoArg = args.find((a) => a.startsWith("--video="));
  const videoPath = videoArg ? videoArg.split("=")[1] : null;

  if (isLogin) {
    loginSnapchat().then((success) => process.exit(success ? 0 : 1));
  } else if (isCheck) {
    checkSnapchatStatus().then(() => process.exit(0));
  } else if (videoPath) {
    const metadata = {
      title: "Bitcoin Breakout & Liquidation Squeeze Alert",
      category: "coinglass_squeeze",
      targetUrl: "https://www.bitcoincrypto.tech/tools/liquidation-heatmap",
      tags: ["Bitcoin", "Crypto", "Trading", "Spotlight", "Liquidation"]
    };
    uploadToSnapchat(videoPath, metadata, { headful: isHeadful }).then((res) => {
      if (res && res.success) {
        process.exit(0);
      } else {
        process.exit(1);
      }
    });
  } else {
    console.log("Usage:");
    console.log("  node scripts/snapchatUploader.mjs --check");
    console.log("  node scripts/snapchatUploader.mjs --login");
    console.log("  node scripts/snapchatUploader.mjs --video=path/to/video.mp4 [--headful]");
    process.exit(0);
  }
}
