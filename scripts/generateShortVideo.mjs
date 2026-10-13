/**
 * BitcoinCrypto.tech — High-Engagement 9:16 YouTube Shorts Video Synthesizer
 * 
 * Features:
 *   - Real AI Neural Voiceover (en-US-ChristopherNeural)
 *   - Live Website Screen Capture (bitcoincrypto.tech interface in center)
 *   - Cyber dark UI backdrop with high-contrast glowing neon typography (ASS)
 *   - Audio mixing (crystal-clear voice + subtle high-tech ambient pulse)
 *   - 1080x1920 (9:16 vertical) resolution
 */

import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { generateVoiceover } from "./generateVoiceover.mjs";
import { captureWebsiteScreen } from "./captureWebsiteScreenshots.mjs";

function createAssScript(metadata, duration) {
  const title = (metadata.title || "Crypto Alert").replace(/#Shorts/gi, "").trim();
  const category = (metadata.category || "AI Technical Model").toUpperCase();
  const durationSec = Math.ceil(duration);

  // Colors in ASS format (&HAABBGGRR)
  // Gold/Amber: &H0000D7FF, Cyan: &H00E6D800, White: &H00FFFFFF
  return `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: HeaderBrand,Arial,38,&H0000D7FF,&H00000000,&H00000000,&HA0000000,1,0,0,0,100,100,2,0,1,3,0,8,40,40,80,1
Style: CategoryBadge,Arial,32,&H00E6D800,&H00000000,&H00000000,&HA0000000,1,0,0,0,100,100,1,0,1,2,0,8,40,40,140,1
Style: HookBanner,Arial,48,&H00FFFFFF,&H00000000,&H00000000,&HB0000000,1,0,0,0,100,100,1,0,1,4,2,8,40,40,195,1
Style: BottomCta,Arial,42,&H0000D7FF,&H00000000,&H00000000,&HB0000000,1,0,0,0,100,100,1,0,1,4,2,2,40,40,150,1
Style: BottomSub,Arial,32,&H00A0AEC0,&H00000000,&H00000000,&HB0000000,1,0,0,0,100,100,0,0,1,2,0,2,40,40,95,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
; Top Brand Watermark
Dialogue: 0,0:00:00.00,0:00:${durationSec}.00,HeaderBrand,,0,0,0,,{\\fad(250,250)}⚡ BITCOINCRYPTO.TECH • LIVE TERMINAL ⚡
Dialogue: 0,0:00:00.00,0:00:${durationSec}.00,CategoryBadge,,0,0,0,,{\\fad(250,250)}[ ${category} ]

; Headline Hook Banner above screenshot
Dialogue: 0,0:00:00.00,0:00:${durationSec}.00,HookBanner,,0,0,0,,{\\fad(300,300)}${title}

; Bottom Call to Action below screenshot
Dialogue: 0,0:00:00.00,0:00:${durationSec}.00,BottomCta,,0,0,0,,{\\fad(300,300)}👉 FREE REAL-TIME TERMINAL & 100 LESSONS
Dialogue: 0,0:00:00.00,0:00:${durationSec}.00,BottomSub,,0,0,0,,{\\fad(300,300)}Link Pinned in Description & Comments
`;
}

export async function generateShortVideo(metadata, outputDir = "./tmp_shorts") {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = Date.now();
  const voicePath = path.resolve(outputDir, `voice_${timestamp}.mp3`);
  const screenPath = path.resolve(outputDir, `screen_${timestamp}.png`);
  const assPath = path.resolve(outputDir, `sub_${timestamp}.ass`);
  const outputPath = path.resolve(outputDir, `short_${timestamp}.mp4`);

  // Step 1: Synthesize AI Voiceover
  const voiceoverText = metadata.voiceover || metadata.description;
  const { duration } = await generateVoiceover(voiceoverText, voicePath);

  // Step 2: Capture live website screenshot of the target URL
  const targetUrl = metadata.targetUrl || "https://www.bitcoincrypto.tech/predictions";
  await captureWebsiteScreen(targetUrl, screenPath, 1080, 1380);

  // Step 3: Generate ASS Subtitle Script
  const assContent = createAssScript(metadata, duration);
  fs.writeFileSync(assPath, assContent, "utf-8");

  // Relative paths for FFmpeg
  const relScreen = path.relative(process.cwd(), screenPath).replace(/\\/g, "/");
  const relVoice = path.relative(process.cwd(), voicePath).replace(/\\/g, "/");
  const relAss = path.relative(process.cwd(), assPath).replace(/\\/g, "/");

  console.log(`🎬 Composing high-production Short via FFmpeg (${duration.toFixed(1)}s)...`);

  // Filter complex:
  // - Dark tech background with cyber grid (drawgrid)
  // - Live website screenshot placed in center (scale to 980 width, Y offset at 270)
  // - Glowing frame border around screenshot
  // - High-contrast ASS typography on top
  // - Voiceover audio boosted to 1.3x volume + subtle ambient synth tone (0.04x)
  const filterComplex = `[0:v]drawgrid=w=80:h=80:t=1:c=0x1E293B@0.4[bg];` +
    `[1:v]scale=980:-1[screen];` +
    `[bg][screen]overlay=(W-w)/2:270[vwithscreen];` +
    `[vwithscreen]ass='${relAss}'[outv];` +
    `[2:a]volume=1.3[voice];` +
    `[3:a]volume=0.03[bgm];` +
    `[voice][bgm]amix=inputs=2:duration=first[outa]`;

  const ffmpegArgs = [
    "-f", "lavfi",
    "-i", `color=c=0x0B0F19:s=1080x1920:d=${duration}`,
    "-i", relScreen,
    "-i", relVoice,
    "-f", "lavfi",
    "-i", `sine=f=120:d=${duration}`,
    "-filter_complex", filterComplex,
    "-map", "[outv]",
    "-map", "[outa]",
    "-c:v", "libx264",
    "-preset", "fast",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "128k",
    "-t", `${duration}`,
    outputPath,
    "-y"
  ];

  return new Promise((resolve, reject) => {
    const proc = spawn("ffmpeg", ffmpegArgs);
    let stderr = "";

    proc.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    proc.on("close", (code) => {
      // Clean up temporary audio, screenshot, and ASS files
      try {
        if (fs.existsSync(voicePath)) fs.unlinkSync(voicePath);
        if (fs.existsSync(screenPath)) fs.unlinkSync(screenPath);
        if (fs.existsSync(assPath)) fs.unlinkSync(assPath);
      } catch (_) {}

      if (code === 0 && fs.existsSync(outputPath)) {
        console.log(`✅ Short video created: ${outputPath}`);
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
