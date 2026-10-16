/**
 * BitcoinCrypto.tech — 4K UHD Pro-Level Cinematic Live Website Recorder
 * 
 * Features:
 *   - Native 4K UHD Resolution: 2160 x 3840 (9:16 vertical, deviceScaleFactor: 2)
 *   - Pro Cyber Trading HUD: Injected glassmorphic header with live status & confidence
 *   - Pulsing Animated Target Reticle: High-tech laser scanline highlighting key charts & order books
 *   - Animated Top Progress Bar: Real-time progress bar across the screen
 *   - Kinetic Camera Dynamics: Smooth zoom-ins on tickers, kinetic gliding through order books & heatmaps
 */

import puppeteer from "puppeteer-core";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

export async function recordWebsiteVideo(targetUrl, targetDuration = 25, outputPath = "./tmp_shorts/screen_recording.mp4") {
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const framesDir = path.resolve(outputDir, `frames_${Date.now()}`);
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });

  console.log(`🎥 Initiating 4K UHD Pro Cinematic Screen Recording of ${targetUrl}...`);
  console.log(`⏱️ Target Duration: ${targetDuration.toFixed(1)} seconds`);

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--force-dark-mode",
      "--disable-dev-shm-usage",
      "--high-dpi-support=1",
      "--device-scale-factor=2"
    ]
  });

  const page = await browser.newPage();
  // 1080x1920 with deviceScaleFactor: 2 renders native 2160x3840 (True 4K UHD)
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 2 });

  // Suppress popups and force dark mode
  await page.evaluateOnNewDocument(() => {
    try {
      localStorage.setItem("btc_cookie_consent", "all");
      localStorage.setItem("btc_theme_mode", "dark");
      localStorage.setItem("btc_theme_accent", "amber");
    } catch (_) {}
  });

  console.log(`🌐 Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 35000 });

  // Hide scrollbars & style body
  await page.addStyleTag({
    content: `
      ::-webkit-scrollbar { display: none !important; }
      body { -ms-overflow-style: none; scrollbar-width: none; overflow-x: hidden; }
    `
  }).catch(() => {});

  // Allow real-time charts and WebSockets to load
  await new Promise((r) => setTimeout(r, 2600));

  // Inject High-Tech Cyber Trading HUD, Target Reticle, and Top Progress Bar
  await page.evaluate(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes scanline {
        0% { transform: translateY(-100%); opacity: 0; }
        20% { opacity: 1; }
        80% { opacity: 1; }
        100% { transform: translateY(400%); opacity: 0; }
      }
      @keyframes pulseGlow {
        0%, 100% {
          box-shadow: 0 0 25px rgba(0, 255, 200, 0.45), inset 0 0 15px rgba(0, 255, 200, 0.2);
          border-color: #00ffc8;
        }
        50% {
          box-shadow: 0 0 45px rgba(255, 200, 0, 0.75), inset 0 0 25px rgba(255, 200, 0, 0.35);
          border-color: #ffc800;
        }
      }
      @keyframes pulseDot {
        from { opacity: 0.4; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1.3); }
      }
      .cyber-target-box {
        position: fixed;
        top: 26%;
        left: 4%;
        width: 92%;
        height: 240px;
        border: 2.5px solid #00ffc8;
        border-radius: 20px;
        background: rgba(10, 18, 30, 0.45);
        backdrop-filter: blur(8px);
        animation: pulseGlow 2.4s infinite ease-in-out;
        z-index: 99999;
        pointer-events: none;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 16px 20px;
        transition: top 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
      }
      .cyber-scanline {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, transparent, #00ffc8, #ffc800, transparent);
        box-shadow: 0 0 16px #00ffc8;
        animation: scanline 2.2s infinite linear;
      }
      .cyber-hud-top {
        position: fixed;
        top: 14px;
        left: 18px;
        right: 18px;
        height: 48px;
        background: rgba(11, 15, 25, 0.88);
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 28px;
        backdrop-filter: blur(14px);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 18px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #fff;
        font-size: 13.5px;
        font-weight: 700;
        box-shadow: 0 8px 30px rgba(0,0,0,0.6);
      }
      .cyber-live-dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #00ff88;
        box-shadow: 0 0 14px #00ff88;
        margin-right: 9px;
        animation: pulseDot 1s infinite alternate;
      }
      .cyber-progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 5px;
        background: linear-gradient(90deg, #00ffc8, #ffc800, #ff0055);
        z-index: 9999999;
        width: 0%;
        box-shadow: 0 0 14px rgba(0, 255, 200, 0.9);
        transition: width 0.1s linear;
      }
    `;
    document.head.appendChild(style);

    // Add Top Progress Bar
    const progressBar = document.createElement("div");
    progressBar.className = "cyber-progress-bar";
    progressBar.id = "cyberProgressBar";
    document.body.appendChild(progressBar);

    // Add Top Cyber HUD
    const hud = document.createElement("div");
    hud.className = "cyber-hud-top";
    hud.innerHTML = `
      <div style="display:flex;align-items:center;">
        <span class="cyber-live-dot"></span>
        <span style="color:#00ff88;letter-spacing:1px;font-weight:800;">LIVE QUANT TERMINAL</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="background:rgba(0,255,200,0.15);color:#00ffc8;padding:3px 10px;border-radius:12px;border:1px solid rgba(0,255,200,0.3);font-size:12px;font-weight:700;">AI ACCURACY: 98.4%</span>
        <span style="color:#ffd700;font-weight:800;">bitcoincrypto.tech</span>
      </div>
    `;
    document.body.appendChild(hud);

    // Add Pulsing Target Reticle
    const targetBox = document.createElement("div");
    targetBox.className = "cyber-target-box";
    targetBox.id = "cyberTargetBox";
    targetBox.innerHTML = `
      <div class="cyber-scanline"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span id="targetHeader" style="color:#00ffc8;font-size:13px;font-weight:800;letter-spacing:1px;font-family:monospace;">[ ⚡ AI LIQUIDITY TARGET DETECTED ]</span>
        <span id="targetSub" style="color:#ffc800;font-size:12px;font-weight:700;font-family:monospace;">ORDER BOOK: ABSORPTION</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;">
        <span id="targetMain" style="color:#fff;font-size:17px;font-weight:900;letter-spacing:0.5px;font-family:sans-serif;">QUANT TARGET LOCKED 🎯</span>
        <span id="targetMeta" style="color:#00ff88;font-size:13.5px;font-weight:800;font-family:monospace;">CVD TAKER DELTA: ▲ STRONG</span>
      </div>
    `;
    document.body.appendChild(targetBox);
  });

  const client = await page.target().createCDPSession();

  let frameCount = 0;
  let isRecording = true;

  client.on("Page.screencastFrame", async (event) => {
    if (!isRecording) return;
    frameCount++;
    const frameBuffer = Buffer.from(event.data, "base64");
    const frameFile = path.join(framesDir, `frame_${String(frameCount).padStart(6, "0")}.jpg`);
    fs.writeFileSync(frameFile, frameBuffer);
    try {
      await client.send("Page.screencastFrameAck", { sessionId: event.sessionId });
    } catch (_) {}
  });

  // Capture frames at native 4K dimensions (2160x3840)
  await client.send("Page.startScreencast", {
    format: "jpeg",
    quality: 94,
    maxWidth: 2160,
    maxHeight: 3840,
    everyNthFrame: 1
  });

  console.log("🎬 Recording pro kinetic camera motion, smooth scrolling & scanning HUD...");

  const startTime = Date.now();
  const totalMs = targetDuration * 1000;

  // Kinetic camera & scrolling loop
  while (Date.now() - startTime < totalMs) {
    const elapsed = (Date.now() - startTime) / 1000;
    const progressPct = Math.min(100, (elapsed / targetDuration) * 100);

    // Update Progress Bar
    await page.evaluate((pct, sec) => {
      const p = document.getElementById("cyberProgressBar");
      if (p) p.style.width = pct + "%";

      const box = document.getElementById("cyberTargetBox");
      const h = document.getElementById("targetHeader");
      const m = document.getElementById("targetMain");

      if (box && h && m) {
        if (sec < 4) {
          // Hook: Locked on top price and sentiment
          box.style.top = "24%";
          h.innerText = "[ ⚡ AI LIQUIDITY TARGET DETECTED ]";
          m.innerText = "EXPLOSIVE 24H BREAKOUT 🎯";
        } else if (sec < 16) {
          // Candlestick Chart Inspection
          box.style.top = "36%";
          h.innerText = "[ 📈 LIVE CANDLESTICK AUCTION THEORY ]";
          m.innerText = "AI RESISTANCE BREAKOUT ZONE ⚡";
        } else if (sec < 28) {
          // L2 Order Book & Liquidation Squeeze
          box.style.top = "42%";
          h.innerText = "[ 🔥 INSTITUTIONAL LIQUIDATION POOL ]";
          m.innerText = "$380M SHORT SQUEEZE CLUSTER 💥";
        } else if (sec < 38) {
          // CVD Taker Delta & Order Flow
          box.style.top = "30%";
          h.innerText = "[ 📊 CUMULATIVE VOLUME DELTA (CVD) ]";
          m.innerText = "AGGRESSIVE BUY ABSORPTION ▲";
        } else {
          // Fade out for closing Call to Action
          box.style.opacity = "0";
        }
      }
    }, progressPct, elapsed);

    // Kinetic Scrolling & Smooth Camera Motion
    if (elapsed < 3.5) {
      // Hold on top hero banner & ticker for 3.5s
      await new Promise((r) => setTimeout(r, 65));
    } else if (elapsed < 16) {
      // Glide smoothly to the Candlestick chart
      await page.evaluate(() => window.scrollBy({ top: 12, behavior: "auto" }));
      await new Promise((r) => setTimeout(r, 35));
    } else if (elapsed < 20) {
      // Pause to inspect chart and indicators
      await new Promise((r) => setTimeout(r, 70));
    } else if (elapsed < 32) {
      // Glide down to Order Book & Liquidation Heatmap
      await page.evaluate(() => window.scrollBy({ top: 16, behavior: "auto" }));
      await new Promise((r) => setTimeout(r, 35));
    } else if (elapsed < 36) {
      // Pause on order book walls
      await new Promise((r) => setTimeout(r, 70));
    } else {
      // Glide smoothly down to interactive demo terminal
      await page.evaluate(() => window.scrollBy({ top: 14, behavior: "auto" }));
      await new Promise((r) => setTimeout(r, 35));
    }
  }

  isRecording = false;
  try {
    await client.send("Page.stopScreencast");
  } catch (_) {}
  await browser.close();

  console.log(`📸 Captured ${frameCount} total frames. Stitching into 4K UHD video via FFmpeg...`);

  if (frameCount === 0) {
    throw new Error("No frames captured from website screencast.");
  }

  // Calculate actual framerate
  const fps = Math.max(14, Math.round(frameCount / targetDuration));
  const relFramesPattern = path.relative(process.cwd(), path.join(framesDir, "frame_%06d.jpg")).replace(/\\/g, "/");

  // 4K UHD Filter with subtle unsharp mask for razor-sharp fidelity
  const vf = `scale=2160:3840:flags=lanczos,unsharp=3:3:0.5:3:3:0.2`;

  const ffmpegArgs = [
    "-framerate", `${fps}`,
    "-i", relFramesPattern,
    "-vf", vf,
    "-c:v", "libx264",
    "-preset", "fast",
    "-pix_fmt", "yuv420p",
    "-crf", "21",
    "-t", `${targetDuration}`,
    outputPath,
    "-y"
  ];

  return new Promise((resolve, reject) => {
    const proc = spawn("ffmpeg", ffmpegArgs);
    let stderr = "";
    proc.stderr.on("data", (chunk) => { stderr += chunk.toString(); });

    proc.on("close", (code) => {
      // Clean up frames directory
      try {
        const files = fs.readdirSync(framesDir);
        for (const f of files) fs.unlinkSync(path.join(framesDir, f));
        fs.rmdirSync(framesDir);
      } catch (_) {}

      if (code === 0 && fs.existsSync(outputPath)) {
        const mb = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
        console.log(`✅ Pro 4K Screen Recording generated: ${outputPath} (${mb} MB, 2160x3840)`);
        resolve(outputPath);
      } else {
        console.error("❌ FFmpeg error:", stderr.slice(-400));
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });

    proc.on("error", (err) => {
      reject(err);
    });
  });
}
