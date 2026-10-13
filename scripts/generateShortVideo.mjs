/**
 * BitcoinCrypto.tech — Automated 9:16 YouTube Shorts Video Synthesizer
 * 
 * Uses ffmpeg + ASS Subtitle Engine to generate institutional-quality,
 * 1080x1920 (9:16) vertical crypto shorts with cyber grid, high-CTR typography,
 * animated cards, and tech ambient audio.
 */

import { spawn } from "child_process";
import fs from "fs";
import path from "path";

/**
 * Builds an Advanced SubStation Alpha (.ass) subtitle file
 * with custom typography, glowing colors, and smooth fade transitions.
 */
function createAssScript(slides, durationSeconds = 24) {
  // Styles in ASS format (Colors in &HAABBGGRR format)
  // Gold/Amber: &H0000D7FF, Cyan: &H00E6D800, White: &H00FFFFFF, Dark Gray: &H002A2016
  return `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: BrandHeader,Arial,38,&H0000D7FF,&H00000000,&H00000000,&H80000000,1,0,0,0,100,100,2,0,1,2,0,8,40,40,90,1
Style: BadgeTag,Arial,34,&H00E6D800,&H00000000,&H00000000,&H80000000,1,0,0,0,100,100,1,0,1,2,0,8,40,40,160,1
Style: MainHook,Arial,72,&H00FFFFFF,&H00000000,&H00000000,&H90000000,1,0,0,0,100,100,1,0,1,4,3,5,60,60,30,1
Style: AccentText,Arial,66,&H0000D7FF,&H00000000,&H00000000,&H90000000,1,0,0,0,100,100,1,0,1,4,3,5,60,60,30,1
Style: BodyText,Arial,52,&H00E2E8F0,&H00000000,&H00000000,&H90000000,1,0,0,0,100,100,1,0,1,3,2,5,70,70,30,1
Style: FooterCta,Arial,42,&H0000D7FF,&H00000000,&H00000000,&HA0000000,1,0,0,0,100,100,1,0,1,3,1,2,40,40,140,1
Style: FooterSub,Arial,34,&H00A0AEC0,&H00000000,&H00000000,&HA0000000,0,0,0,0,100,100,0,0,1,2,0,2,40,40,85,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
; Permanent Top Branding Header
Dialogue: 0,0:00:00.00,0:00:${durationSeconds}.00,BrandHeader,,0,0,0,,{\\fad(300,300)}BITCOINCRYPTO.TECH • QUANT RESEARCH
Dialogue: 0,0:00:00.00,0:00:${durationSeconds}.00,BadgeTag,,0,0,0,,{\\fad(300,300)}[ LIVE QUANTITATIVE INTELLIGENCE ]

; Permanent Bottom Call-to-Action
Dialogue: 0,0:00:00.00,0:00:${durationSeconds}.00,FooterCta,,0,0,0,,{\\fad(400,400)}👉 FREE LIVE TERMINAL & 100 LESSONS
Dialogue: 0,0:00:00.00,0:00:${durationSeconds}.00,FooterSub,,0,0,0,,{\\fad(400,400)}Link Pinned in Description & Comments

${slides.map((s, idx) => {
  const startStr = formatTime(s.start);
  const endStr = formatTime(s.end);
  const safeText = s.text.replace(/\n/g, "\\N");
  return `Dialogue: 1,${startStr},${endStr},${s.style},,0,0,0,,{\\fad(350,350)}${safeText}`;
}).join("\n")}
`;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const cs = Math.floor((seconds % 1) * 100);
  return `0:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}

/**
 * Synthesizes dynamic slide content from short metadata
 */
export function extractSlidesFromMetadata(metadata) {
  const category = metadata.category || "Crypto Intelligence";
  const title = (metadata.title || "Bitcoin Market Alert").replace(/#Shorts/gi, "").trim();

  // Create 4 engaging visual scenes (total 24 seconds)
  const slides = [
    {
      start: 0,
      end: 6,
      style: "MainHook",
      text: `🚨 ${title.toUpperCase()} 🚨`
    },
    {
      start: 6,
      end: 12,
      style: "AccentText",
      text: `📊 REAL-TIME ORDER FLOW & CVD\\N\\N${metadata.category.toUpperCase()}`
    },
    {
      start: 12,
      end: 18,
      style: "BodyText",
      text: `⚡ INSTITUTIONAL LIQUIDITY\\N\\NOrder Book Imbalance\\nCoinglass Liquidation Clusters`
    },
    {
      start: 18,
      end: 24,
      style: "AccentText",
      text: `🎓 MASTER 100 LESSONS & TOOLS\\N\\N100% Free • Zero Betting\\nbitcoincrypto.tech/learn`
    }
  ];

  return slides;
}

/**
 * Generates an MP4 video file (1080x1920, 9:16 vertical)
 */
export async function generateShortVideo(metadata, outputDir = "./tmp_shorts") {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = Date.now();
  const assPath = path.resolve(outputDir, `sub_${timestamp}.ass`);
  const outputPath = path.resolve(outputDir, `short_${timestamp}.mp4`);

  const duration = 24;
  const slides = extractSlidesFromMetadata(metadata);
  const assContent = createAssScript(slides, duration);

  fs.writeFileSync(assPath, assContent, "utf-8");

  // Use relative path with forward slashes so ffmpeg does not see Windows drive letter colon (C:)
  const relAssPath = path.relative(process.cwd(), assPath).replace(/\\/g, "/");
  const vf = `drawgrid=w=90:h=90:t=1:c=0x1E293B@0.45,ass='${relAssPath}'`;

  console.log(`🎬 Rendering 9:16 vertical short (${duration}s, 1080x1920)...`);

  const ffmpegArgs = [
    "-f", "lavfi",
    "-i", `color=c=0x0B0F19:s=1080x1920:d=${duration}`,
    "-f", "lavfi",
    "-i", `sine=f=120:d=${duration}`,
    "-vf", vf,
    "-c:v", "libx264",
    "-preset", "fast",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "96k",
    "-af", "volume=0.08",
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
      // Clean up temporary ASS file
      if (fs.existsSync(assPath)) {
        try { fs.unlinkSync(assPath); } catch (_) {}
      }

      if (code === 0 && fs.existsSync(outputPath)) {
        console.log(`✅ Video generated successfully: ${outputPath}`);
        resolve(outputPath);
      } else {
        console.error("❌ FFmpeg error:", stderr.slice(-400));
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });

    proc.on("error", (err) => {
      if (fs.existsSync(assPath)) {
        try { fs.unlinkSync(assPath); } catch (_) {}
      }
      reject(err);
    });
  });
}
