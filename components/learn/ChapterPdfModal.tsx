"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Download,
  X,
  BookOpen,
  CheckCircle2,
  FileText,
  Layers,
  ChevronDown
} from "lucide-react";
import { CourseChapter } from "@/lib/course/types";

interface ChapterPdfModalProps {
  chapter: CourseChapter;
  allChapters?: CourseChapter[];
  initialMode?: "chapter" | "fundamental" | "technical" | "all";
  isOpen: boolean;
  onClose: () => void;
}

export default function ChapterPdfModal({
  chapter,
  allChapters = [],
  initialMode = "chapter",
  isOpen,
  onClose,
}: ChapterPdfModalProps) {
  const [exportMode, setExportMode] = useState<"chapter" | "fundamental" | "technical" | "all">(initialMode);
  const [selectedChapterId, setSelectedChapterId] = useState<string>(chapter.id);
  const printRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setExportMode(initialMode);
    setSelectedChapterId(chapter.id);
  }, [chapter.id, initialMode]);

  if (!isOpen) return null;

  const currentChapter =
    (allChapters.length > 0
      ? allChapters.find((c) => c.id === selectedChapterId)
      : null) || chapter;

  const chaptersToRender =
    exportMode === "all" && allChapters.length > 0
      ? allChapters
      : exportMode === "fundamental" && allChapters.length > 0
      ? allChapters.slice(0, 4)
      : exportMode === "technical" && allChapters.length > 0
      ? allChapters.slice(4, 10)
      : [currentChapter];

  const handlePrint = () => {
    window.print();
  };

  const getExportTitle = () => {
    switch (exportMode) {
      case "all":
        return "Complete 10-Chapter Masterclass Compendium";
      case "fundamental":
        return "Fundamental Analysis Track Compendium (Chapters 1–4)";
      case "technical":
        return "Technical Analysis Track Compendium (Chapters 5–10)";
      case "chapter":
      default:
        return `Chapter ${currentChapter.chapterNumber}: ${currentChapter.title}`;
    }
  };

  const getExportSubtitle = () => {
    switch (exportMode) {
      case "all":
        return "All 10 Chapters • 100 Authentic Articles • A4 Document Format";
      case "fundamental":
        return "4 Chapters • 40 Fundamental Research Articles • A4 Document Format";
      case "technical":
        return "6 Chapters • 60 Quantitative Research Articles • A4 Document Format";
      case "chapter":
      default:
        return "10 Research Articles • Formatted for A4 / PDF Export";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden print:border-none print:shadow-none print:max-h-none print:w-full print:bg-white print:rounded-none">
        
        {/* MODAL CONTROL HEADER (PRINT:HIDDEN) */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white">
                {getExportTitle()}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {getExportSubtitle()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs font-mono transition shadow-lg shadow-emerald-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* EXPORT MODE SELECTOR TOOLBAR (PRINT:HIDDEN) */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono print:hidden">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 text-[11px]">Scope:</span>
            <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800 flex-wrap gap-1">
              <button
                onClick={() => setExportMode("chapter")}
                className={`px-3 py-1.5 rounded-lg font-bold transition text-xs ${
                  exportMode === "chapter"
                    ? "bg-emerald-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Individual Chapter
              </button>
              <button
                onClick={() => setExportMode("technical")}
                className={`px-3 py-1.5 rounded-lg font-bold transition text-xs ${
                  exportMode === "technical"
                    ? "bg-emerald-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Technical Track (60 Articles)
              </button>
              <button
                onClick={() => setExportMode("fundamental")}
                className={`px-3 py-1.5 rounded-lg font-bold transition text-xs ${
                  exportMode === "fundamental"
                    ? "bg-amber-400 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Fundamental Track (40 Articles)
              </button>
              <button
                onClick={() => setExportMode("all")}
                className={`px-3 py-1.5 rounded-lg font-bold transition text-xs ${
                  exportMode === "all"
                    ? "bg-purple-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                All 10 Chapters (100 Articles)
              </button>
            </div>
          </div>

          {exportMode === "chapter" && allChapters.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Select Chapter:</span>
              <select
                value={selectedChapterId}
                onChange={(e) => setSelectedChapterId(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-emerald-400 font-bold px-3 py-1.5 rounded-xl text-xs focus:outline-none cursor-pointer"
              >
                {allChapters.map((c) => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                    Chapter {c.chapterNumber}: {c.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* INSTRUCTION TIP BANNER (PRINT:HIDDEN) */}
        <div className="bg-slate-950/70 border-b border-slate-800 px-4 sm:px-6 py-2 flex items-center justify-between text-[11px] text-slate-400 font-mono print:hidden">
          <span>💡 <strong>Tip:</strong> In the browser print dialog, set <strong>Destination</strong> to <strong>&quot;Save as PDF&quot;</strong>.</span>
          <span className="text-emerald-400 font-bold">
            {exportMode === "all" ? "100 Articles Total" : "10 Articles Selected"}
          </span>
        </div>

        {/* PRINTABLE BOOK CONTENT AREA */}
        <div
          ref={printRef}
          className="flex-1 overflow-y-auto p-6 sm:p-12 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 print:bg-white print:text-black print:p-0 print:overflow-visible space-y-16"
        >
          {/* PRINT-SPECIFIC STYLES */}
          <style jsx global>{`
            @media print {
              body {
                background: white !important;
                color: black !important;
              }
              header, footer, nav, button, .print\\:hidden {
                display: none !important;
              }
              .chapter-divider {
                page-break-before: always;
                break-before: page;
              }
              .article-break {
                page-break-inside: avoid;
                break-inside: avoid;
              }
            }
          `}</style>

          {/* MASTER COVER PAGE IF ALL CHAPTERS */}
          {exportMode === "all" && (
            <div className="border-b-4 border-slate-900 dark:border-white/20 pb-12 space-y-6 print:border-black">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 print:text-gray-600">
                <span className="font-bold tracking-widest uppercase">BitcoinCrypto.tech Masterclass Series</span>
                <span>Complete 10-Chapter Research Edition</span>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono font-black uppercase text-amber-600 dark:text-amber-400 print:text-gray-800">
                  OFFICIAL INSTITUTIONAL CURRICULUM
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white print:text-black tracking-tight leading-tight">
                  Cryptocurrency Valuation &amp; Market Dynamics
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-300 print:text-gray-700 leading-relaxed max-w-3xl">
                  The Complete 100-Article Masterclass Covering On-Chain Fundamentals, Market Structure Price Action, Level-2 Order Flow, Derivatives Cascades, and Capital Preservation Mathematics.
                </p>
              </div>

              {/* Master Table of Contents */}
              <div className="pt-4">
                <h4 className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider mb-3 print:text-gray-600">
                  Master Curriculum Table of Contents (10 Chapters • 100 Articles)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {allChapters.map((ch) => (
                    <div
                      key={ch.id}
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/50 print:bg-gray-100 text-slate-800 dark:text-slate-200 print:text-gray-900 flex items-center justify-between"
                    >
                      <span>Chapter {ch.chapterNumber}: {ch.title}</span>
                      <span className="text-slate-400 shrink-0 ml-2">{ch.lessons.length} Arts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RENDER CHAPTERS */}
          {chaptersToRender.map((currChapter, cIdx) => (
            <div key={currChapter.id} className={exportMode === "all" && cIdx > 0 ? "chapter-divider space-y-12" : "space-y-12"}>
              
              {/* CHAPTER COVER HEADER */}
              <div className="border-b-2 border-slate-900 dark:border-white/20 pb-8 space-y-4 print:border-black">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 print:text-gray-600">
                  <span className="font-bold tracking-widest uppercase">BitcoinCrypto.tech Masterclass</span>
                  <span>Chapter {currChapter.chapterNumber} • {currChapter.badge}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-black uppercase text-amber-600 dark:text-amber-400 print:text-gray-800">
                    RESEARCH CHAPTER
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white print:text-black tracking-tight leading-tight">
                    Chapter {currChapter.chapterNumber}: {currChapter.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 print:text-gray-700 leading-relaxed max-w-3xl">
                    {currChapter.tagline}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300 text-xs text-slate-700 dark:text-slate-300 print:text-gray-800 leading-relaxed">
                  <strong>Executive Summary:</strong> {currChapter.overview}
                </div>

                {/* Chapter Lessons Index */}
                <div className="pt-2">
                  <h4 className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider mb-2 print:text-gray-600">
                    Chapter Articles Index ({currChapter.lessons.length} Articles)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {currChapter.lessons.map((l) => (
                      <div
                        key={l.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-900/50 print:bg-gray-100 text-slate-700 dark:text-slate-300 print:text-gray-800"
                      >
                        <span className="truncate pr-2">{l.title}</span>
                        <span className="text-slate-400 shrink-0">{l.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ALL ARTICLES IN THIS CHAPTER */}
              <div className="space-y-10">
                {currChapter.lessons.map((lesson, lIdx) => (
                  <article
                    key={lesson.id}
                    className="article-break p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 print:border-gray-300 pb-3">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 print:text-gray-600 uppercase">
                          ARTICLE {lIdx + 1} OF {currChapter.lessons.length} • CHAPTER {currChapter.chapterNumber}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white print:text-black mt-0.5">
                          {lesson.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 print:text-gray-500">
                        {lesson.duration}
                      </span>
                    </div>

                    {/* Key Concepts Box */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-200 space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 print:text-gray-600 block tracking-wider">
                        Core Conceptual Framework:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 print:text-gray-800">
                        {lesson.keyConcepts.map((kc, kIdx) => (
                          <li key={kIdx} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{kc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Paragraph Content */}
                    <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 print:text-gray-900 leading-relaxed font-sans">
                      {lesson.content.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {/* Formula Box if present */}
                    {lesson.formula && (
                      <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs border border-slate-800 print:bg-gray-100 print:text-black print:border-gray-300 space-y-2">
                        <span className="text-[10px] text-amber-400 print:text-gray-800 uppercase font-bold block">
                          Mathematical Formulation: {lesson.formula.name}
                        </span>
                        <div className="bg-slate-950 print:bg-white p-3 rounded-xl border border-slate-800 print:border-gray-300 text-amber-300 print:text-black font-bold overflow-x-auto">
                          {lesson.formula.math}
                        </div>
                        <p className="text-[11px] text-slate-400 print:text-gray-700">
                          {lesson.formula.explanation}
                        </p>
                      </div>
                    )}

                    {/* Institutional Pro Tip */}
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 print:bg-gray-50 print:border-gray-300 text-xs text-amber-950 dark:text-amber-200 print:text-black leading-relaxed">
                      <strong>Institutional Pro Tip:</strong> {lesson.proTip}
                    </div>
                  </article>
                ))}
              </div>

              {/* CHAPTER QUIZ REVIEW (FOR STUDY) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-white print:border-gray-300 space-y-5">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 print:text-gray-600 uppercase">
                    Self-Assessment Study Key
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white print:text-black mt-0.5">
                    Chapter {currChapter.chapterNumber} Assessment Answer Key
                  </h4>
                </div>

                <div className="space-y-3">
                  {currChapter.quiz.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-1.5 text-xs">
                      <strong className="text-slate-900 dark:text-white print:text-black block">
                        Q{qIdx + 1}: {q.question}
                      </strong>
                      <div className="p-3 rounded-xl bg-white dark:bg-slate-950 print:bg-gray-50 border border-slate-200 dark:border-slate-800 print:border-gray-200 text-emerald-600 dark:text-emerald-400 print:text-black">
                        <strong>Correct:</strong> {q.options[q.correctIndex]}
                        <p className="text-slate-500 dark:text-slate-400 print:text-gray-600 mt-1">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* BOOK FOOTER SIGN-OFF */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 print:border-gray-300 text-center text-xs font-mono text-slate-500 dark:text-slate-400 print:text-gray-600 space-y-1">
            <p className="font-bold text-slate-900 dark:text-white print:text-black">
              BitcoinCrypto Institutional Masterclass Series
            </p>
            <p>Published by BitcoinCrypto.tech • All Rights Reserved</p>
            <p>Exported for offline personal educational study.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
