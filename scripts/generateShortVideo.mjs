/**
 * BitcoinCrypto.tech — Pro 4K UHD Viral Video Synthesizer
 * 
 * Features:
 *   - Native 4K UHD Resolution: 2160 x 3840 (9:16 vertical)
 *   - Kinetic Live Website Screen: Smooth camera glides with High-Tech Cyber Trading HUD
 *   - Pro Active-Word Karaoke Subtitles: Word-by-word neon yellow/green highlighting (Hormozi / CapCut style)
 *   - Sound Design: Real driving electronic tech beat (BGM) + cinematic transition whooshes + signal chime
 *   - Visual Grade: OLED contrast enhancement + subtle vignette focusing viewer attention
 *   - High-CTR Callout: Closing animated direction to Bio & Pinned Comment
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

function getWordEmoji(word) {
  const upper = word.toUpperCase();
  if (/BREAKOUT|PUMP|SURGE|MOON|SKYROCKET/.test(upper)) return "🚀";
  if (/LIQUIDATION|WIPED|SQUEEZE|FLUSH|CASCADE/.test(upper)) return "🔥";
  if (/TARGET|GOAL|LEVEL|ZONE|ACCURACY/.test(upper)) return "🎯";
  if (/WHALE|INSTITUTIONAL|SMART/.test(upper)) return "🐋";
  if (/MONEY|DOLLAR|PROFIT|CAPITAL|FUNDS/.test(upper)) return "💰";
  if (/WARNING|ALERT|DANGER|RISK/.test(upper)) return "🚨";
  if (/DATA|ORDER|BOOK|ALGORITHM|AI/.test(upper)) return "⚡";
  if (/UPWARD|BULLISH|HIGHER|GROWTH/.test(upper)) return "📈";
  if (/DOWN|BEARISH|DROP|DIP/.test(upper)) return "📉";
  if (/FREE|TEST|DEMO|LEARN/.test(upper)) return "✨";
  return "";
}

/**
 * Builds pro active-word karaoke subtitles:
 * 2-3 word cards where each spoken word lights up in glowing neon green/yellow in real time.
 */
function createProViralAssScript(metadata, duration) {
  const category = (metadata.category || "AI QUANTITATIVE MODEL").toUpperCase();
  const durationSec = Math.ceil(duration);

  // Parse voiceover into clean words
  const voiceoverText = metadata.voiceover || metadata.description || "";
  const cleanedText = voiceoverText
    .replace(/#Shorts/gi, "")
    .replace(/[#*]/g, "")
    .replace(/bitcoincrypto\.tech/gi, "bitcoincrypto.tech")
    .trim();

  const words = cleanedText.split(/\s+/).filter(Boolean);
  const wordsPerCard = 3;
  const cards = [];

  for (let i = 0; i < words.length; i += wordsPerCard) {
    cards.push(words.slice(i, i + wordsPerCard));
  }

  // Allocate timing: start after 3s opening hook, end 4.5s before video ends for final CTA
  const captionStartTime = 3.2;
  const captionEndTime = Math.max(captionStartTime + 5, duration - 4.2);
  const totalCaptionTime = captionEndTime - captionStartTime;
  const cardDuration = totalCaptionTime / Math.max(1, cards.length);

  const dialogueLines = [];

  cards.forEach((cardWords, cardIdx) => {
    const cardStart = captionStartTime + (cardIdx * cardDuration);
    const cardEnd = cardStart + cardDuration;
    const wordDuration = cardDuration / cardWords.length;

    // For each word in the card, create a sub-event where that specific word is highlighted
    cardWords.forEach((activeWord, wordIdx) => {
      const stepStart = cardStart + (wordIdx * wordDuration);
      const stepEnd = stepStart + wordDuration;

      // Construct line: inactive words are white (&H00FFFFFF), active word is neon yellow (&H0000FFFF) or neon green (&H0000FF88)
      const renderedCard = cardWords.map((w, idx) => {
        const cleanW = w.toUpperCase();
        const emoji = getWordEmoji(cleanW);
        if (idx === wordIdx) {
          const highlightColor = (wordIdx % 2 === 0) ? "&H0000FFFF" : "&H0000FF88"; // Alternate yellow and neon green
          return `{\\c${highlightColor}\\b1}${cleanW}${emoji ? " " + emoji : ""}{\\c&H00FFFFFF\\b0}`;
        } else {
          return `{\\c&H00FFFFFF}${cleanW}{\\c&H00FFFFFF}`;
        }
      }).join(" ");

      dialogueLines.push(
        `Dialogue: 1,${formatAssTime(stepStart)},${formatAssTime(stepEnd)},ViralKaraoke,,0,0,0,,${renderedCard}`
      );
    });
  });

  const finalCtaStart = formatAssTime(Math.max(0, duration - 4.5));
  const finalCtaEnd = formatAssTime(durationSec);

  return `[Script Info]
ScriptType: v4.00+
PlayResX: 2160
PlayResY: 3840
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
; Top discreet watermark
Style: Watermark,Arial,48,&H60FFFFFF,&H00000000,&H00000000,&H60000000,1,0,0,0,100,100,2,0,1,3,0,9,80,80,140,1
; 3-second opening hook alert badge
Style: TopHook,Arial Black,76,&H0000FFFF,&H00000000,&H00000000,&HC0000000,1,0,0,0,100,100,2,0,1,8,4,8,80,80,180,1
; Active word viral karaoke subtitles (Lower-third, ultra-bold, thick black stroke with deep shadow)
Style: ViralKaraoke,Arial Black,104,&H00FFFFFF,&H00000000,&H00000000,&HE0000000,1,0,0,0,100,100,2,0,1,11,6,2,80,80,360,1
; Final Call to Action
Style: FinalCta,Arial Black,88,&H0000D7FF,&H00000000,&H00000000,&HF0000000,1,0,0,0,100,100,2,0,1,10,5,2,80,80,340,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
; Discreet branding in top right
Dialogue: 0,0:00:00.00,0:00:${durationSec}.00,Watermark,,0,0,0,,bitcoincrypto.tech

; 3-second opening hook alert (Disappears after 3.2s)
Dialogue: 2,0:00:00.00,0:00:03.20,TopHook,,0,0,0,,{\\fad(150,250)}🚨 ${category} 🚨

; Active Word Karaoke Events
${dialogueLines.join("\n")}

; Final High-CTR Closing Call to Action
Dialogue: 2,${finalCtaStart},${finalCtaEnd},FinalCta,,0,0,0,,{\\fad(250,150)}👇 CLICK LINK IN BIO & PINNED COMMENT 👇\\N\\N🔥 bitcoincrypto.tech
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

  // Step 2: Record Live Website Screen Video with Pro Cyber Trading HUD
  const targetUrl = metadata.targetUrl || "https://www.bitcoincrypto.tech/predictions";
  await recordWebsiteVideo(targetUrl, duration, rawVideoPath);

  // Step 3: Generate Active-Word Karaoke Subtitles
  const assContent = createProViralAssScript(metadata, duration);
  fs.writeFileSync(assPath, assContent, "utf-8");

  // Step 4: Verify Audio Assets (BGM & SFX)
  const bgmPath = path.resolve(process.cwd(), "assets/audio/bgm_tech.mp3");
  const whooshPath = path.resolve(process.cwd(), "assets/audio/whoosh.mp3");
  const chimePath = path.resolve(process.cwd(), "assets/audio/chime.mp3");

  const hasBgm = fs.existsSync(bgmPath);
  const hasWhoosh = fs.existsSync(whooshPath);
  const hasChime = fs.existsSync(chimePath);

  const relRawVideo = path.relative(process.cwd(), rawVideoPath).replace(/\\/g, "/");
  const relVoice = path.relative(process.cwd(), voicePath).replace(/\\/g, "/");
  const relAss = path.relative(process.cwd(), assPath).replace(/\\/g, "/");

  console.log(`🎬 Mastering Pro 4K UHD Short with Sound Design (${duration.toFixed(1)}s, 2160x3840)...`);

  const ffmpegInputs = [
    "-i", relRawVideo,
    "-i", relVoice
  ];

  let audioInputsCount = 2; // Voice is index 1

  if (hasBgm) {
    const relBgm = path.relative(process.cwd(), bgmPath).replace(/\\/g, "/");
    ffmpegInputs.push("-stream_loop", "-1", "-i", relBgm);
    audioInputsCount++;
  }

  if (hasWhoosh) {
    const relWhoosh = path.relative(process.cwd(), whooshPath).replace(/\\/g, "/");
    ffmpegInputs.push("-i", relWhoosh);
    audioInputsCount++;
  }

  if (hasChime) {
    const relChime = path.relative(process.cwd(), chimePath).replace(/\\/g, "/");
    ffmpegInputs.push("-i", relChime);
    audioInputsCount++;
  }

  // Filter Complex: Video grade (contrast/saturation + vignette) + Subtitles + Multi-track Audio Mix
  let filterComplex = `[0:v]ass='${relAss}',eq=contrast=1.06:saturation=1.12,vignette=PI/5[outv];`;
  filterComplex += `[1:a]volume=1.45[voice];`;

  let mixStreams = "[voice]";
  let currentIdx = 2;

  if (hasBgm) {
    filterComplex += `[${currentIdx}:a]volume=0.10[bgm];`;
    mixStreams += "[bgm]";
    currentIdx++;
  }

  if (hasWhoosh) {
    filterComplex += `[${currentIdx}:a]adelay=100|100,volume=0.55[whoosh];`;
    mixStreams += "[whoosh]";
    currentIdx++;
  }

  if (hasChime) {
    filterComplex += `[${currentIdx}:a]adelay=3500|3500,volume=0.50[chime];`;
    mixStreams += "[chime]";
    currentIdx++;
  }

  const numStreams = (mixStreams.match(/\[/g) || []).length;
  filterComplex += `${mixStreams}amix=inputs=${numStreams}:duration=first:dropout_transition=2[outa]`;

  const ffmpegArgs = [
    ...ffmpegInputs,
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
        console.log(`✅ Mastered Pro 4K Viral Short: ${outputPath} (${mb} MB, 2160x3840)`);
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
