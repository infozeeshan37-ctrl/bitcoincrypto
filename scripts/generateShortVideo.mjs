/**
 * BitcoinCrypto.tech — 4K UHD YouTube Shorts Video Synthesizer
 * 
 * Features:
 *   - True 4K UHD Resolution: 2160 x 3840 (9:16 vertical)
 *   - Recorded Live Website Video: Actual kinetic video of bitcoincrypto.tech in action
 *   - Real AI Neural Voiceover: High-energy financial narrator (en-US-ChristopherNeural)
 *   - 4K Typography HUD: Cyber gold & cyan neon overlays, badges, and subtitles
 *   - Audio Mastering: Boosted voice + high-tech ambient pulse
 */

import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { generateVoiceover } from "./generateVoiceover.mjs";
import { recordWebsiteVideo } from "./recordWebsiteVideo.mjs";

function create4kAssScript(metadata, duration) {
  const title = (metadata.title || "Crypto Alert").replace(/#Shorts/gi, "").trim();
  const category = (metadata.category || "AI Technical Model").toUpperCase();
  const durationSec = Math.ceil(duration);

  // Scaled for 4K UHD: 2160 x 3840
  // Gold: &H0000D7FF, Cyan: &H00E6D800, White: &H00FFFFFF
  return `[Script Info]
ScriptType: v4.00+
PlayResX: 2160
PlayResY: 3840
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: HeaderBrand,Arial,76,&H0000D7FF,&H00000000,&H00000000,&HA0000000,1,0,0,0,100,100,3,0,1,6,0,8,80,80,160,1
Style: CategoryBadge,Arial,64,&H00E6D800,&H00000000,&H00000000,&HA0000000,1,0,0,0,100,100,2,0,1,5,0,8,80,80,280,1
Style: HookBanner,Arial,96,&H00FFFFFF,&H00000000,&H00000000,&HC0000000,1,0,0,0,100,100,2,0,1,8,4,8,80,80,390,1
Style: BottomCta,Arial,84,&H0000D7FF,&H00000000,&H00000000,&HC0000000,1,0,0,0,100,100,2,0,1,8,4,2,80,80,300,1
Style: BottomSub,Arial,64,&H00A0AEC0,&H00000000,&H00000000,&HC0000000,1,0,0,0,100,100,1,0,1,5,0,2,80,80,190,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
; Top Brand Watermark
Dialogue: 0,0:00:00.00,0:00:${durationSec}.00,HeaderBrand,,0,0,0,,{\\fad(300,300)}⚡ BITCOINCRYPTO.TECH • 4K LIVE TERMINAL ⚡
Dialogue: 0,0:00:00.00,0:00:${durationSec}.00,CategoryBadge,,0,0,0,,{\\fad(300,300)}[ ${category} ]

; Headline Hook Banner
Dialogue: 0,0:00:00.00,0:00:${durationSec}.00,HookBanner,,0,0,0,,{\\fad(350,350)}${title}

; Bottom Call to Action
Dialogue: 0,0:00:00.00,0:00:${durationSec}.00,BottomCta,,0,0,0,,{\\fad(350,350)}👉 FREE REAL-TIME TERMINAL & 100 LESSONS
Dialogue: 0,0:00:00.00,0:00:${durationSec}.00,BottomSub,,0,0,0,,{\\fad(350,350)}Link Pinned in Description & Comments
`;
}

export async function generateShortVideo(metadata, outputDir = "./tmp_shorts") {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = Date.now();
  const voicePath = path.resolve(outputDir, `voice_${timestamp}.mp3`);
  const rawVideoPath = path.resolve(outputDir, `raw_recording_${timestamp}.mp4`);
  const assPath = path.resolve(outputDir, `sub_${timestamp}.ass`);
  const outputPath = path.resolve(outputDir, `short_4k_${timestamp}.mp4`);

  // Step 1: Synthesize AI Neural Voiceover
  const voiceoverText = metadata.voiceover || metadata.description;
  const { duration } = await generateVoiceover(voiceoverText, voicePath);

  // Step 2: Record Live Website Video in 4K UHD
  const targetUrl = metadata.targetUrl || "https://www.bitcoincrypto.tech/predictions";
  await recordWebsiteVideo(targetUrl, duration, rawVideoPath);

  // Step 3: Generate 4K ASS Subtitles
  const assContent = create4kAssScript(metadata, duration);
  fs.writeFileSync(assPath, assContent, "utf-8");

  const relRawVideo = path.relative(process.cwd(), rawVideoPath).replace(/\\/g, "/");
  const relVoice = path.relative(process.cwd(), voicePath).replace(/\\/g, "/");
  const relAss = path.relative(process.cwd(), assPath).replace(/\\/g, "/");

  console.log(`🎬 Mastering 4K UHD Video (2160x3840, ${duration.toFixed(1)}s)...`);

  const filterComplex = `[0:v]ass='${relAss}'[outv];` +
    `[1:a]volume=1.35[voice];` +
    `[2:a]volume=0.03[bgm];` +
    `[voice][bgm]amix=inputs=2:duration=first[outa]`;

  const ffmpegArgs = [
    "-i", relRawVideo,
    "-i", relVoice,
    "-f", "lavfi",
    "-i", `sine=f=120:d=${duration}`,
    "-filter_complex", filterComplex,
    "-map", "[outv]",
    "-map", "[outa]",
    "-c:v", "libx264",
    "-preset", "fast",
    "-pix_fmt", "yuv420p",
    "-crf", "18", // Crystal-clear 4K UHD
    "-c:a", "aac",
    "-b:a", "192k",
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
      // Clean up intermediate files
      try {
        if (fs.existsSync(voicePath)) fs.unlinkSync(voicePath);
        if (fs.existsSync(rawVideoPath)) fs.unlinkSync(rawVideoPath);
        if (fs.existsSync(assPath)) fs.unlinkSync(assPath);
      } catch (_) {}

      if (code === 0 && fs.existsSync(outputPath)) {
        const mb = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
        console.log(`✅ Mastered 4K Short: ${outputPath} (${mb} MB, 2160x3840)`);
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
