/**
 * BitcoinCrypto.tech — AI Neural Voiceover Synthesizer
 * 
 * Uses Microsoft Edge Neural TTS (edge-tts) to synthesize high-energy,
 * natural human voiceover narration with financial pronunciation tuning.
 */

import { exec } from "child_process";
import fs from "fs";
import path from "path";
import util from "util";

const execPromise = util.promisify(exec);

export async function generateVoiceover(text, outputPath) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Pre-process pronunciation for natural audio flow
  const naturalSpeechText = text
    .replace(/bitcoincrypto\.tech/gi, "Bitcoin Crypto dot tech")
    .replace(/\$([0-9,]+(\.[0-9]+)?)/g, "$1 dollars")
    .replace(/L2/g, "Level 2")
    .replace(/CVD/g, "C V D")
    .replace(/EMA/g, "E M A")
    .replace(/RSI/g, "R S I")
    .replace(/FOMC/g, "F O M C")
    .replace(/CPI/g, "C P I")
    .replace(/BTC/g, "Bitcoin")
    .replace(/ETH/g, "Ethereum")
    .replace(/SOL/g, "Solana")
    .replace(/#Shorts/gi, "")
    .replace(/[#*]/g, "")
    .trim();

  const tempTxtPath = outputPath.replace(/\.[a-z0-9]+$/i, ".txt");
  fs.writeFileSync(tempTxtPath, naturalSpeechText, "utf-8");

  console.log("🎙️ Synthesizing AI Neural Voiceover (en-US-ChristopherNeural)...");

  // Choose confident, high-converting narrator voice
  const voice = "en-US-ChristopherNeural";
  const cmd = `edge-tts --voice ${voice} -f "${tempTxtPath}" --write-media "${outputPath}"`;

  try {
    await execPromise(cmd);

    // Measure exact audio duration via ffprobe
    const probeCmd = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${outputPath}"`;
    const { stdout } = await execPromise(probeCmd);
    const duration = parseFloat(stdout.trim()) || 25;

    // Clean up temporary text file
    if (fs.existsSync(tempTxtPath)) {
      try { fs.unlinkSync(tempTxtPath); } catch (_) {}
    }

    console.log(`✅ Voiceover generated: ${outputPath} (${duration.toFixed(1)}s)`);
    return { audioPath: outputPath, duration };
  } catch (err) {
    if (fs.existsSync(tempTxtPath)) {
      try { fs.unlinkSync(tempTxtPath); } catch (_) {}
    }
    console.error("❌ Voiceover generation failed:", err.message);
    throw err;
  }
}
