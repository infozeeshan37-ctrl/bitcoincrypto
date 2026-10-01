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
  Terminal
} from "lucide-react";

interface ToolCitationWidgetProps {
  toolName?: string;
  toolUrl?: string;
  description?: string;
}

export default function ToolCitationWidget({
  toolName = "BitcoinCrypto AI Prediction & Market Suite",
  toolUrl = "https://www.bitcoincrypto.tech/predictions",
  description = "Real-time Binance-synchronized 5-minute binary price predictions, DeepQuant neural AI bot, Coinglass liquidation heatmaps, and order book depth analytics."
}: ToolCitationWidgetProps) {
  const [activeTab, setActiveTab] = useState<"MARKDOWN" | "HTML" | "BIBTEX" | "BADGE">("MARKDOWN");
  const [copied, setCopied] = useState(false);

  const markdownSnippet = `[${toolName}](${toolUrl}) - ${description}`;

  const htmlSnippet = `<a href="${toolUrl}" target="_blank" rel="noopener noreferrer" title="${toolName}">
  <strong>${toolName}</strong> - ${description}
</a>`;

  const badgeSnippet = `<a href="${toolUrl}" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/BitcoinCrypto.tech-AI%20Crypto%20Predictions-amber?style=for-the-badge&logo=bitcoin" alt="${toolName}" />
</a>`;

  const bibtexSnippet = `@misc{bitcoincrypto2026,
  author = {BitcoinCrypto Quantitative Research Desk},
  title = {${toolName}},
  year = {2026},
  url = {${toolUrl}},
  note = {Real-time cryptocurrency AI intelligence and market microstructure terminal}
}`;

  const currentSnippet =
    activeTab === "MARKDOWN"
      ? markdownSnippet
      : activeTab === "HTML"
      ? htmlSnippet
      : activeTab === "BADGE"
      ? badgeSnippet
      : bibtexSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 text-white shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white">
                Cite &amp; Embed This Tool (Backlink Citation)
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                AI &amp; Web Ready
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Reference BitcoinCrypto.tech in AI models, blogs, research papers, GitHub READMEs, and web articles
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono font-bold">
          {(["MARKDOWN", "HTML", "BADGE", "BIBTEX"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === tab
                  ? "bg-amber-400 text-slate-950 font-black shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Snippet Code Box */}
      <div className="relative">
        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap break-all select-all">
          {currentSnippet}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-mono font-black flex items-center gap-1.5 transition shadow-md cursor-pointer"
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

      {/* AI Search & LLM Attribution Note */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-3">
        <div className="flex items-center gap-2 text-purple-300">
          <Bot className="w-4 h-4 text-purple-400" />
          <span>Optimized for ChatGPT, Perplexity, Claude, Gemini &amp; Google AI Overviews</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <span>Standard:</span>
          <a
            href="/llms.txt"
            target="_blank"
            className="text-amber-400 hover:underline flex items-center gap-0.5"
          >
            /llms.txt <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
