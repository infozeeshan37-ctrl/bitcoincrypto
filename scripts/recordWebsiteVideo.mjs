/**
 * BitcoinCrypto.tech — Pro 4K UHD Cinematic Website Recorder
 * 
 * Features:
 *   - Localhost 0ms Sub-Frame Acceleration: Loads from localhost:3000 with 0ms latency
 *   - 3-Second Viral Hook Card: High-contrast alert badge at 0s-3.2s
 *   - Butter-Smooth Cubic Lerp Scrolling: Continuous requestAnimationFrame gliding
 *   - Dynamic Target Reticle: Real-time scanline highlighting live candlestick chart & order book
 *   - Live Top Progress Bar: Neon progress bar tracking video time
 */

import puppeteer from "puppeteer-core";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

export async function recordWebsiteVideo(targetUrl, targetDuration = 25, outputPath = "./tmp_shorts/screen_recording.mp4", metadata = null) {
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const framesDir = path.resolve(outputDir, `frames_${Date.now()}`);
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });

  const isCpi = (metadata?.category || "").toLowerCase().includes("cpi") || (metadata?.targetUrl || "").includes("/cpi");
  const cpiTemplate = path.resolve(process.cwd(), "scripts/templates/cpiFeatureShort.html");
  const defaultTemplate = path.resolve(process.cwd(), "scripts/templates/viralShortTemplate.html");
  const templatePath = (isCpi && fs.existsSync(cpiTemplate)) ? cpiTemplate : defaultTemplate;
  const useProTemplate = fs.existsSync(templatePath);

  console.log(`🎥 Initiating Pro 4K Motion-Graphics Recording (${targetDuration.toFixed(1)}s, True 4K UHD)...`);

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

  if (useProTemplate) {
    const fileUrl = "file://" + templatePath.replace(/\\/g, "/");
    console.log(`🎬 Loading Pro 4K Motion-Graphics Studio: ${fileUrl}...`);
    await page.goto(fileUrl, { waitUntil: "domcontentloaded", timeout: 20000 });

    await page.evaluate((meta, dur) => {
      window.__RECORDING_CONTROL = true;
      if (window.__INIT_METADATA) {
        window.__INIT_METADATA({
          coinName: meta?.coinName || "Solana",
          coinTicker: meta?.coinTicker || "SOL",
          price: meta?.price || "$184.50",
          target: meta?.target || "$195.00",
          squeezeCluster: meta?.squeezeCluster || "$380M",
          resistance: meta?.resistance || "$188.00",
          hookTitle: meta?.title || "WHALES JUST DROPPED $400M",
          category: meta?.category || "AI QUANT PREDICTION",
          duration: dur
        });
      }
      if (window.__renderFrame) {
        window.__renderFrame(0);
      }
    }, metadata, targetDuration);

    await new Promise((r) => setTimeout(r, 600));
  } else {
    // Map to local Next.js server for instant 0ms latency rendering if available
    let navigationUrl = targetUrl;
    if (navigationUrl.includes("bitcoincrypto.tech")) {
      try {
        const urlObj = new URL(navigationUrl);
        const localCandidate = `http://localhost:3000${urlObj.pathname}${urlObj.search}`;
        const res = await fetch("http://localhost:3000", { signal: AbortSignal.timeout(800) }).catch(() => null);
        if (res && res.status < 500) {
          navigationUrl = localCandidate;
        } else {
          console.log(`⚠️ Local server not responding, falling back to production URL: ${navigationUrl}`);
        }
      } catch (_) {}
    }

    console.log(`🌐 Loading page with sub-millisecond local latency...`);
    await page.goto(navigationUrl, { waitUntil: "domcontentloaded", timeout: 25000 });
    await new Promise((r) => setTimeout(r, 1800));
  }

  // Inject High-Impact Razor-Sharp Hook, Cyber HUD, White Flash Transition & Lerp Engine (Fallback mode only)
  if (!useProTemplate) {
    await page.evaluate(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        text-rendering: optimizeLegibility !important;
      }
      @keyframes scanline {
        0% { transform: translateY(-100%); opacity: 0; }
        25% { opacity: 1; }
        75% { opacity: 1; }
        100% { transform: translateY(400%); opacity: 0; }
      }
      @keyframes pulseGlow {
        0%, 100% {
          box-shadow: 0 0 35px rgba(0, 255, 200, 0.7), inset 0 0 20px rgba(0, 255, 200, 0.3);
          border-color: #00ffc8;
        }
        50% {
          box-shadow: 0 0 55px rgba(255, 200, 0, 0.9), inset 0 0 30px rgba(255, 200, 0, 0.5);
          border-color: #ffc800;
        }
      }
      @keyframes pulseDot {
        from { opacity: 0.4; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1.35); }
      }
      @keyframes hookExplode {
        0% { transform: translate(-50%, -50%) scale(0.7); opacity: 0; }
        12% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
        22% { transform: translate(-50%, -50%) scale(1.0); }
        84% { transform: translate(-50%, -50%) scale(1.0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; filter: brightness(2.0); pointer-events: none; }
      }
      @keyframes flashFade {
        0% { opacity: 0; }
        20% { opacity: 0.85; }
        100% { opacity: 0; }
      }
      @keyframes bounceArrow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(12px); }
      }
      .cyber-hook-card {
        position: fixed;
        top: 44%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 92%;
        max-width: 980px;
        background: #080c16;
        border: 4px solid #ff0055;
        border-radius: 28px;
        box-shadow: 0 0 65px rgba(255, 0, 85, 0.85), 0 30px 80px rgba(0,0,0,0.95);
        padding: 36px 24px;
        text-align: center;
        z-index: 99999999;
        animation: hookExplode 3.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .cyber-flash-overlay {
        position: fixed;
        inset: 0;
        background: #ffffff;
        pointer-events: none;
        z-index: 999999999;
        opacity: 0;
        transition: opacity 0.25s ease-out;
      }
      .cyber-target-box {
        position: fixed;
        top: 28%;
        left: 4%;
        width: 92%;
        height: 250px;
        border: 3px solid #00ffc8;
        border-radius: 22px;
        background: rgba(8, 14, 25, 0.75);
        animation: pulseGlow 2.2s infinite ease-in-out;
        z-index: 99999;
        pointer-events: none;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 18px 24px;
        transition: top 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
      }
      .cyber-scanline {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: linear-gradient(90deg, transparent, #00ffc8, #ffc800, #ff0055, transparent);
        box-shadow: 0 0 20px #00ffc8;
        animation: scanline 2.0s infinite linear;
      }
      .cyber-hud-top {
        position: fixed;
        top: 14px;
        left: 18px;
        right: 18px;
        height: 52px;
        background: #090e1c;
        border: 1.5px solid rgba(0, 255, 200, 0.45);
        border-radius: 30px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.85);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 22px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #fff;
        font-size: 15px;
        font-weight: 800;
      }
      .cyber-live-dot {
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: #00ff88;
        box-shadow: 0 0 16px #00ff88;
        margin-right: 10px;
        animation: pulseDot 0.8s infinite alternate;
      }
      .cyber-progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 6px;
        background: linear-gradient(90deg, #00ffc8, #ffc800, #ff0055);
        z-index: 9999999;
        width: 0%;
        box-shadow: 0 0 18px rgba(0, 255, 200, 1.0);
      }
      .cyber-cta-card {
        position: fixed;
        bottom: 80px;
        left: 5%;
        width: 90%;
        background: #090d1a;
        border: 3.5px solid #ffe600;
        border-radius: 28px;
        box-shadow: 0 0 60px rgba(255, 230, 0, 0.8), 0 20px 60px rgba(0,0,0,0.9);
        padding: 24px 20px;
        text-align: center;
        z-index: 9999999;
        opacity: 0;
        transform: translateY(60px);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    // 1. Add White Flash Transition Overlay
    const flashOverlay = document.createElement("div");
    flashOverlay.className = "cyber-flash-overlay";
    flashOverlay.id = "cyberFlashOverlay";
    document.body.appendChild(flashOverlay);

    // 2. Add Razor-Sharp Hook Card (3.2s visual hook)
    const hookCard = document.createElement("div");
    hookCard.className = "cyber-hook-card";
    hookCard.id = "cyberHookCard";
    hookCard.innerHTML = `
      <div style="display:inline-flex;align-items:center;gap:8px;background:#ff0055;color:#ffffff;padding:7px 20px;border-radius:30px;font-size:16px;font-weight:900;letter-spacing:1.5px;margin-bottom:14px;box-shadow:0 0 25px rgba(255,0,85,0.9);">
        <span style="font-size:18px;">🚨</span> CRITICAL VOLATILITY WARNING
      </div>
      <div style="color:#ffffff;font-size:44px;font-weight:900;letter-spacing:-0.5px;line-height:1.15;margin-bottom:12px;font-family:'Segoe UI', system-ui, sans-serif;text-shadow:0 4px 20px rgba(0,0,0,0.95);">
        24-HOUR BREAKOUT IMMINENT
      </div>
      <div style="display:flex;justify-content:center;gap:12px;margin-bottom:10px;">
        <span style="color:#ffe600;font-size:18px;font-weight:900;font-family:monospace;background:rgba(255,230,0,0.18);border:1.5px solid #ffe600;padding:5px 14px;border-radius:12px;">⚡ AI ACCURACY: 98.4%</span>
        <span style="color:#00ffc8;font-size:18px;font-weight:900;font-family:monospace;background:rgba(0,255,200,0.18);border:1.5px solid #00ffc8;padding:5px 14px;border-radius:12px;">🎯 TARGET: LOCKED</span>
      </div>
      <div style="color:#00ff88;font-size:15px;font-weight:800;letter-spacing:1px;font-family:monospace;">
        INSTITUTIONAL ORDER FLOW CONFLUENCE CONFIRMED
      </div>
    `;
    document.body.appendChild(hookCard);

    // 3. Add Top Progress Bar
    const progressBar = document.createElement("div");
    progressBar.className = "cyber-progress-bar";
    progressBar.id = "cyberProgressBar";
    document.body.appendChild(progressBar);

    // 4. Add Top Cyber HUD
    const hud = document.createElement("div");
    hud.className = "cyber-hud-top";
    hud.innerHTML = `
      <div style="display:flex;align-items:center;">
        <span class="cyber-live-dot"></span>
        <span style="color:#00ff88;letter-spacing:1px;font-weight:800;">LIVE QUANT TERMINAL</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="background:rgba(0,255,200,0.18);color:#00ffc8;padding:4px 12px;border-radius:14px;border:1.5px solid #00ffc8;font-size:13px;font-weight:800;">AI ACCURACY: 98.4%</span>
        <span style="color:#ffd700;font-weight:800;font-size:14px;">bitcoincrypto.tech</span>
      </div>
    `;
    document.body.appendChild(hud);

    // 5. Add Pulsing Target Reticle
    const targetBox = document.createElement("div");
    targetBox.className = "cyber-target-box";
    targetBox.id = "cyberTargetBox";
    targetBox.innerHTML = `
      <div class="cyber-scanline"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span id="targetHeader" style="color:#00ffc8;font-size:14px;font-weight:800;letter-spacing:1px;font-family:monospace;">[ ⚡ AI BREAKOUT TARGET DETECTED ]</span>
        <span id="targetSub" style="color:#ffc800;font-size:13px;font-weight:800;font-family:monospace;">ORDER BOOK: ABSORPTION</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;">
        <span id="targetMain" style="color:#fff;font-size:19px;font-weight:900;letter-spacing:0.5px;font-family:sans-serif;">QUANT TARGET LOCKED 🎯</span>
        <span id="targetMeta" style="color:#00ff88;font-size:14px;font-weight:800;font-family:monospace;">CVD TAKER DELTA: ▲ STRONG</span>
      </div>
    `;
    document.body.appendChild(targetBox);

    // 6. Add End Call to Action Overlay
    const ctaCard = document.createElement("div");
    ctaCard.className = "cyber-cta-card";
    ctaCard.id = "cyberCtaCard";
    ctaCard.innerHTML = `
      <div style="font-size:20px;font-weight:900;color:#ffe600;margin-bottom:6px;letter-spacing:0.5px;">
        👇 ACCESS LIVE TERMINAL NOW 👇
      </div>
      <div style="font-size:36px;font-weight:900;color:#ffffff;letter-spacing:1px;font-family:'Segoe UI',sans-serif;margin-bottom:6px;">
        bitcoincrypto.tech
      </div>
      <div style="display:inline-block;background:#00ff88;color:#000000;font-size:16px;font-weight:900;padding:6px 18px;border-radius:20px;">
        FREE LINK IN BIO & PINNED COMMENT ⚡
      </div>
    `;
    document.body.appendChild(ctaCard);

    // 5. In-Page requestAnimationFrame Smooth Cubic Lerp Engine
    let currentY = 0;
    let targetY = 0;
    window.__setScrollTarget = (y) => { targetY = y; };

    function smoothScrollStep() {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.5) {
        currentY += diff * 0.085; // Butter-smooth cubic interpolation
        window.scrollTo(0, Math.round(currentY));
      }
      requestAnimationFrame(smoothScrollStep);
    }
    requestAnimationFrame(smoothScrollStep);
  });
  }

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

  // Capture frames at native 4K dimensions (2160x3840) with 98 quality
  await client.send("Page.startScreencast", {
    format: "jpeg",
    quality: 98,
    maxWidth: 2160,
    maxHeight: 3840,
    everyNthFrame: 1
  });

  console.log("🎬 Recording cinematic camera motion, smooth scrolling & scanning HUD...");

  const startTime = Date.now();
  const totalMs = targetDuration * 1000;

  // CapCut / Filmora dynamic scene choreography
  const hookDuration = 3.0;
  const outroDuration = 4.2;
  const contentDuration = Math.max(8.0, targetDuration - hookDuration - outroDuration);
  const tChartEnd = hookDuration + contentDuration * 0.50;
  const tOrderBookEnd = hookDuration + contentDuration * 0.95;

  while (Date.now() - startTime < totalMs) {
    const elapsed = (Date.now() - startTime) / 1000;

    if (useProTemplate) {
      try {
        await page.evaluate((sec) => {
          if (window.__renderFrame) {
            window.__renderFrame(sec);
          }
        }, elapsed);
      } catch (_) {}
      await new Promise((r) => setTimeout(r, 33));
    } else {
      const progressPct = Math.min(100, (elapsed / targetDuration) * 100);

      // Dynamic camera target calculations
      let targetScrollPosition = 0;

      if (elapsed < hookDuration) {
        targetScrollPosition = 0;
      } else if (elapsed < tChartEnd) {
        targetScrollPosition = 360;
      } else if (elapsed < tOrderBookEnd) {
        targetScrollPosition = 760;
      } else {
        targetScrollPosition = 1180;
      }

      // Execute state updates inside the page
      try {
        await page.evaluate((pct, sec, scrollTarget, duration, tChart, tBook, tHook) => {
          // Update top progress bar
          const p = document.getElementById("cyberProgressBar");
          if (p) p.style.width = pct + "%";

          // Command smooth lerp scroll
          if (window.__setScrollTarget) {
            window.__setScrollTarget(scrollTarget);
          }

          // CapCut White Flash Transition 1 at hook transition (3.0s)
          const flash = document.getElementById("cyberFlashOverlay");
          if (flash) {
            if ((sec >= tHook - 0.15 && sec < tHook + 0.25) || (sec >= tChart - 0.15 && sec < tChart + 0.15)) {
              flash.style.opacity = "0.85";
            } else {
              flash.style.opacity = "0";
            }
          }

          // CapCut Punch-in Camera Zoom Transitions (Dynamic perspective changes)
          if (sec < tHook) {
            document.body.style.transform = "scale(1.0)";
          } else if (sec >= tHook && sec < tChart) {
            document.body.style.transform = "scale(1.18)";
            document.body.style.transformOrigin = "50% 28%";
            document.body.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
          } else if (sec >= tChart && sec < tBook) {
            document.body.style.transform = "scale(1.10)";
            document.body.style.transformOrigin = "50% 46%";
            document.body.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
          } else if (sec >= tBook && sec < duration - 4.2) {
            document.body.style.transform = "scale(1.15)";
            document.body.style.transformOrigin = "50% 58%";
          } else {
            document.body.style.transform = "scale(1.0)";
          }

          // Trigger End Call To Action Card in final 4.2 seconds
          const cta = document.getElementById("cyberCtaCard");
          if (cta) {
            if (sec >= duration - 4.2) {
              cta.style.opacity = "1";
              cta.style.transform = "translateY(0)";
            } else {
              cta.style.opacity = "0";
              cta.style.transform = "translateY(60px)";
            }
          }

          // Choreograph Target Reticle
          const box = document.getElementById("cyberTargetBox");
          const h = document.getElementById("targetHeader");
          const m = document.getElementById("targetMain");

          if (box && h && m) {
            if (sec < tHook) {
              box.style.top = "28%";
              h.innerText = "[ ⚡ AI BREAKOUT TARGET DETECTED ]";
              m.innerText = "QUANT TARGET LOCKED 🎯";
            } else if (sec < tChart) {
              box.style.top = "33%";
              h.innerText = "[ 📈 LIVE CANDLESTICK AUCTION THEORY ]";
              m.innerText = "AI RESISTANCE BREAKOUT ZONE ⚡";
            } else if (sec < tBook) {
              box.style.top = "40%";
              h.innerText = "[ 🔥 INSTITUTIONAL LIQUIDATION POOL ]";
              m.innerText = "$380M SHORT SQUEEZE ZONE 💥";
            } else if (sec < duration - 4.2) {
              box.style.top = "32%";
              h.innerText = "[ 📊 CUMULATIVE VOLUME DELTA (CVD) ]";
              m.innerText = "AGGRESSIVE BUY ABSORPTION ▲";
            } else {
              box.style.opacity = "0";
            }
          }
        }, progressPct, elapsed, targetScrollPosition, targetDuration, tChartEnd, tOrderBookEnd, hookDuration);
      } catch (_) {}

      await new Promise((r) => setTimeout(r, 45));
    }
  }

  isRecording = false;
  try {
    await client.send("Page.stopScreencast");
  } catch (_) {}
  try {
    await browser.close();
  } catch (_) {}

  console.log(`📸 Captured ${frameCount} total frames. Stitching into 4K UHD video via FFmpeg...`);

  if (frameCount === 0) {
    throw new Error("No frames captured from website screencast.");
  }

  // Calculate actual framerate so all frames distribute across the exact duration
  const exactFps = (frameCount / targetDuration).toFixed(4);
  const relFramesPattern = path.relative(process.cwd(), path.join(framesDir, "frame_%06d.jpg")).replace(/\\/g, "/");

  // 4K UHD Filter with smooth 30fps resampling & unsharp mask for razor-sharp fidelity
  const vf = `scale=2160:3840:flags=lanczos,fps=30,unsharp=3:3:0.6:3:3:0.2`;

  const ffmpegArgs = [
    "-framerate", `${exactFps}`,
    "-i", relFramesPattern,
    "-vf", vf,
    "-r", "30",
    "-c:v", "libx264",
    "-preset", "fast",
    "-pix_fmt", "yuv420p",
    "-crf", "20",
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
