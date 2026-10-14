/**
 * BitcoinCrypto.tech — 4K UHD Viral YouTube Shorts Video Synthesizer
 * 
 * Features:
 *   - Native 4K UHD Resolution: 2160 x 3840 (9:16 vertical)
 *   - Recorded Live Website Video: Smooth kinetic screencast of bitcoincrypto.tech in action
 *   - Clean, Uncluttered Screen: NO giant static text blocks covering the website
 *   - Viral Dynamic Subtitles: 3-5 word punchy animated captions in sync with speech (Hormozi style)
 *   - Real AI Neural Voiceover: High-energy financial narrator (en-US-ChristopherNeural)
 *   - End Callout: Directs viewers to the clickable link in pinned comments & description
 */

import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { generateVoiceover } from "./generateVoiceover.mjs";
import { recordWebsiteVideo } from "./recordWebsiteVideo.mjs";

function formatAssTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const cs = Math.floor((seconds % 1) * 100);
  return `0:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}

/**
 * Builds viral dynamic captions: breaks narration into punchy 3-5 word cards
 * synchronized across the audio duration.
 */
function createViral4kAssScript(metadata, duration) {
  const title = (metadata.title || "Crypto Alert").replace(/#Shorts/gi, "").trim();
  const category = (metadata.category || "AI Technical Model").toUpperCase();
  const durationSec = Math.ceil(duration);

  // Parse voiceover into punchy 3-5 word chunks
  const voiceoverText = metadata.voiceover || metadata.description || "";
  const cleanedText = voiceoverText
    .replace(/#Shorts/gi, "")
    .replace(/[#*]/g, "")
    .replace(/bitcoincrypto\.tech/gi, "bitcoincrypto.tech")
    .trim();

  const words = cleanedText.split(/\s+/).filter(Boolean);
  const wordsPerChunk = 4;
  const chunks = [];
  for (let i = 0; i < words.length; i += wordsPerChunk) {
    chunks.push(words.slice(i, i + wordsPerChunk).join(" "));
  }

  // Allocate caption timing (start at 3s to let top hook shine, end 4s before finish for final CTA)
  const captionStartTime = 3.0;
  const captionEndTime = Math.max(captionStartTime + 5, duration - 4.5);
  const totalCaptionTime = captionEndTime - captionStartTime;
  const chunkDuration = totalCaptionTime / Math.max(1, chunks.length);

  const captionEvents = chunks.map((chunk, idx) => {
    const start = captionStartTime + (idx * chunkDuration);
    const end = start + chunkDuration;
    const safeText = chunk.toUpperCase().replace(/\n/g, " ");
    return `Dialogue: 1,${formatAssTime(start)},${formatAssTime(end)},ViralCaption,,0,0,0,,{\\fad(120,120)}${safeText}`;
  }).join("\n");

  const finalCtaStart = formatAssTime(Math.max(0, duration - 4.5));
  const finalCtaEnd = formatAssTime(durationSec);

  return `[Script Info]
ScriptType: v4.00+
PlayResX: 2160
PlayResY: 3840
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
; Subtle top-corner watermark (never blocks content)
Style: Watermark,Arial,48,&H60FFFFFF,&H00000000,&H00000000,&H60000000,1,0,0,0,100,100,2,0,1,3,0,9,80,80,120,1
; 3-second opening hook alert badge (fades out at 3s)
Style: TopHook,Arial,72,&H0000FFFF,&H00000000,&H00000000,&HB0000000,1,0,0,0,100,100,3,0,1,7,3,8,80,80,180,1
; Viral dynamic captions in lower-third (bold neon yellow with thick outline)
Style: ViralCaption,Arial Black,94,&H0000FFFF,&H00000000,&H00000000,&HD0000000,1,0,0,0,100,100,2,0,1,9,4,2,80,80,340,1
; Final call-to-action directing to clickable pinned link
Style: FinalCta,Arial Black,86,&H0000D7FF,&H00000000,&H00000000,&HE0000000,1,0,0,0,100,100,2,0,1,9,4,2,80,80,320,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
; Discreet branding in top-right corner
Dialogue: 0,0:00:00.00,0:00:${durationSec}.00,Watermark,,0,0,0,,bitcoincrypto.tech

; 3-second opening hook alert (Disappears after 3 seconds so the full website is seen!)
Dialogue: 2,0:00:00.00,0:00:03.20,TopHook,,0,0,0,,{\\fad(200,300)}🚨 ${category} 🚨

; Dynamic fast-moving subtitles matching the voice
${captionEvents}

; Final CTA guiding viewers to clickable link in description & comments
Dialogue: 2,${finalCtaStart},${finalCtaEnd},FinalCta,,0,0,0,,{\\fad(300,200)}👇 CLICK LINK IN PINNED COMMENT! 👇\\N\\N🔗 bitcoincrypto.tech
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

  // Step 2: Record Live Website Screen Video in 4K UHD
  const targetUrl = metadata.targetUrl || "https://www.bitcoincrypto.tech/predictions";
  await recordWebsiteVideo(targetUrl, duration, rawVideoPath);

  // Step 3: Generate 4K Dynamic Viral Subtitles (No static text clutter)
  const assContent = createViral4kAssScript(metadata, duration);
  fs.writeFileSync(assPath, assContent, "utf-8");

  const relRawVideo = path.relative(process.cwd(), rawVideoPath).replace(/\\/g, "/");
  const relVoice = path.relative(process.cwd(), voicePath).replace(/\\/g, "/");
  const relAss = path.relative(process.cwd(), assPath).replace(/\\/g, "/");

  console.log(`🎬 Mastering 4K UHD Viral Short (${duration.toFixed(1)}s, 2160x3840)...`);

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
    "-crf", "20",
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
      // Clean up intermediate raw recording and subtitle files
      try {
        if (fs.existsSync(voicePath)) fs.unlinkSync(voicePath);
        if (fs.existsSync(rawVideoPath)) fs.unlinkSync(rawVideoPath);
        if (fs.existsSync(assPath)) fs.unlinkSync(assPath);
      } catch (_) {}

      if (code === 0 && fs.existsSync(outputPath)) {
        const mb = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
        console.log(`✅ Mastered 4K Viral Short: ${outputPath} (${mb} MB, 2160x3840)`);
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
