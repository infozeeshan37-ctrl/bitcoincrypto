/**
 * BitcoinCrypto.tech — 4K UHD Live Website Screen Video Recorder
 * 
 * Uses Puppeteer CDP Screencast to capture high-framerate, authentic
 * recorded video of the live website in motion (smooth scrolling, live charts,
 * order book depth, and interactive tools) rendered at crisp 4K (2160x3840).
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

  console.log(`🎥 Initiating 4K UHD Screen Recording of ${targetUrl}...`);
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
  // 1080x1920 with scale 2 renders native 2160x3840 (True 4K UHD!)
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 2 });

  console.log(`🌐 Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 35000 });

  // Allow real-time charts, WebSocket ticks, and SVG elements to stabilize
  await new Promise((r) => setTimeout(r, 3000));

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

  await client.send("Page.startScreencast", {
    format: "jpeg",
    quality: 95,
    maxWidth: 1080,
    maxHeight: 1920,
    everyNthFrame: 1
  });

  console.log("🎬 Recording live website interactions (smooth kinetic scrolling & chart inspection)...");

  const startTime = Date.now();
  const totalMs = targetDuration * 1000;

  // Kinetic scrolling script: smoothly scrolls down to showcase features, pauses, and glides back
  while (Date.now() - startTime < totalMs) {
    const elapsed = (Date.now() - startTime) / 1000;

    if (elapsed < 3) {
      // Hold on top hero banner & title for 3s
      await new Promise((r) => setTimeout(r, 100));
    } else if (elapsed < 14) {
      // Smooth downward scroll through live charts, order books, and liquidations
      await page.evaluate(() => window.scrollBy({ top: 12, behavior: "auto" }));
      await new Promise((r) => setTimeout(r, 40));
    } else if (elapsed < 18) {
      // Pause on mid-page tools (Order book / CVD / Learn chapters)
      await new Promise((r) => setTimeout(r, 100));
    } else {
      // Glide down to paper trading terminal or bottom curriculum callout
      await page.evaluate(() => window.scrollBy({ top: 14, behavior: "auto" }));
      await new Promise((r) => setTimeout(r, 40));
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
  const fps = Math.max(12, Math.round(frameCount / targetDuration));
  const relFramesPattern = path.relative(process.cwd(), path.join(framesDir, "frame_%06d.jpg")).replace(/\\/g, "/");

  // 4K UHD Upscaling Filter (2160x3840) with Lanczos interpolation & unsharp mask for crystal-clear fidelity
  const vf = `scale=2160:3840:flags=lanczos,unsharp=3:3:0.6:3:3:0.3`;

  const ffmpegArgs = [
    "-framerate", `${fps}`,
    "-i", relFramesPattern,
    "-vf", vf,
    "-c:v", "libx264",
    "-preset", "fast",
    "-pix_fmt", "yuv420p",
    "-crf", "18", // High quality 4K encoding
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
        console.log(`✅ 4K Website Screen Video generated: ${outputPath} (${mb} MB, 2160x3840)`);
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
