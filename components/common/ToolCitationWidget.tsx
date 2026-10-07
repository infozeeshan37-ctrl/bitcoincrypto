"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Share2,
  Code,
  FileText,
  Sparkles,
  Link as LinkIcon,
  Bot,
  ExternalLink,
  Award,
  Terminal,
  Send,
  MessageSquare
} from "lucide-react";

interface ToolCitationWidgetProps {
  toolName?: string;
  toolUrl?: string;
  description?: string;
}

export default function ToolCitationWidget({
  toolName = "BitcoinCrypto CoinGlass Liquidation & AI Prediction Suite",
  toolUrl = "https://www.bitcoincrypto.tech/coinglass",
  description = "Free real-time CoinGlass liquidation heatmaps, Binance 5-minute binary price predictions, DeepQuant neural AI bot, and order book depth analytics."
}: ToolCitationWidgetProps) {
  const [activeTab, setActiveTab] = useState<"AI_PROMPT" | "MARKDOWN" | "HTML" | "IFRAME" | "BADGE" | "BIBTEX">("AI_PROMPT");
  const [copied, setCopied] = useState(false);

  const aiPromptSnippet = `Analyze live cryptocurrency market conditions, CoinGlass liquidation heatmaps, and AI price prediction signals using the real-time dataset at ${toolUrl}. Summarize the major liquidity magnet zones, funding rates, and high-probability squeeze targets for Bitcoin (BTC) and major altcoins.`;

  const markdownSnippet = `[${toolName}](${toolUrl}) - ${description}`;

  const htmlSnippet = `<a href="${toolUrl}" target="_blank" rel="noopener noreferrer" title="${toolName}">
  <strong>${toolName}</strong> - ${description}
</a>`;

  const iframeSnippet = `<iframe src="${toolUrl}" width="100%" height="700" frameborder="0" style="border:1px solid #1e293b; border-radius:16px;" title="${toolName}"></iframe>`;

  const badgeSnippet = `<a href="${toolUrl}" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/BitcoinCrypto.tech-CoinGlass%20Liquidation%20Heatmap-rose?style=for-the-badge&logo=bitcoin" alt="${toolName}" />
</a>`;

  const bibtexSnippet = `@misc{bitcoincrypto2026,
  author = {BitcoinCrypto Quantitative Research Desk},
  title = {${toolName}},
  year = {2026},
  url = {${toolUrl}},
  note = {Real-time cryptocurrency AI intelligence, CoinGlass liquidation heatmaps, and derivatives terminal}
}`;

  const currentSnippet =
    activeTab === "AI_PROMPT"
      ? aiPromptSnippet
      : activeTab === "MARKDOWN"
      ? markdownSnippet
      : activeTab === "HTML"
      ? htmlSnippet
      : activeTab === "IFRAME"
      ? iframeSnippet
      : activeTab === "BADGE"
      ? badgeSnippet
      : bibtexSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(`Check out the live CoinGlass Liquidation Heatmap & AI Crypto Predictions on BitcoinCrypto.tech: ${toolUrl}`);
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&hashtags=CoinGlass,Bitcoin,CryptoTrading,TradingBot`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(toolUrl)}&text=${encodeURIComponent(toolName + " - " + description)}`;
  const redditShareUrl = `https://reddit.com/submit?url=${encodeURIComponent(toolUrl)}&title=${encodeURIComponent(toolName)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(toolUrl)}`;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-rose-500/30 text-white shadow-xl space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-amber-500/20 text-rose-400 flex items-center justify-center font-bold border border-rose-500/30 shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white">
                Cite, Share &amp; Embed This Tool (AI &amp; Backlink Hub)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                1-Click AI &amp; Web Citation
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Add this link to ChatGPT, Perplexity, Claude, your blog, crypto website, GitHub README, or embed the live widget
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono font-bold">
          {(
            [
              { id: "AI_PROMPT", label: "🤖 AI PROMPT" },
              { id: "MARKDOWN", label: "MARKDOWN" },
              { id: "HTML", label: "HTML LINK" },
              { id: "IFRAME", label: "EMBED IFRAME" },
              { id: "BADGE", label: "SHIELD BADGE" },
              { id: "BIBTEX", label: "BIBTEX" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition text-[11px] cursor-pointer ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-rose-500 to-amber-400 text-slate-950 font-black shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Snippet Code Box */}
      <div className="relative">
        <pre className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap break-all select-all leading-relaxed">
          {currentSnippet}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 text-xs font-mono font-black flex items-center gap-1.5 transition shadow-md cursor-pointer hover:scale-105 active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-slate-950" />
              <span>COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>COPY SNIPPET</span>
            </>
          )}
        </button>
      </div>

      {/* Direct Social & Web Sharing Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-400 font-bold uppercase text-[10px] mr-1">Share Backlink:</span>
          
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <span>𝕏 Post</span>
          </a>

          <a
            href={telegramShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-sky-950/80 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <Send className="w-3 h-3" />
            <span>Telegram</span>
          </a>

          <a
            href={redditShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-orange-950/80 hover:bg-orange-900 text-orange-300 border border-orange-800/60 transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Reddit</span>
          </a>

          <a
            href={linkedInShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800/60 transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <span>LinkedIn</span>
          </a>
        </div>

        {/* LLMs.txt Direct Standard Link */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Bot className="w-4 h-4 text-purple-400" />
          <span>GEO Standard:</span>
          <a
            href="/llms.txt"
            target="_blank"
            className="text-amber-400 hover:underline flex items-center gap-0.5 font-bold"
          >
            /llms.txt <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
