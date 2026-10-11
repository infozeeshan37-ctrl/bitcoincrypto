"use client";

import React, { useRef } from "react";
import {
  Download,
  Printer,
  X,
  BookOpen,
  CheckCircle2,
  Shield,
  Clock,
  Sparkles,
  Award
} from "lucide-react";
import { CourseChapter } from "@/lib/course/types";

interface ChapterPdfModalProps {
  chapter: CourseChapter;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChapterPdfModal({
  chapter,
  isOpen,
  onClose,
}: ChapterPdfModalProps) {
  const printRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      {/* Top Modal Controls (Hidden in Print) */}
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden print:border-none print:shadow-none print:max-h-none print:w-full print:bg-white print:rounded-none">
        
        {/* MODAL CONTROL HEADER (DO NOT PRINT) */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white">
                Chapter {chapter.chapterNumber} Institutional PDF eBook
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {chapter.lessons.length} Human-Written Research Articles • Formatted for A4 / PDF Export
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs font-mono transition shadow-lg shadow-emerald-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Save / Download PDF</span>
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

        {/* PRINTABLE BOOK CONTENT AREA */}
        <div
          ref={printRef}
          className="flex-1 overflow-y-auto p-6 sm:p-12 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 print:bg-white print:text-black print:p-0 print:overflow-visible space-y-12"
        >
          {/* PRINT-SPECIFIC CSS */}
          <style jsx global>{`
            @media print {
              body {
                background: white !important;
                color: black !important;
              }
              header, footer, nav, button, .print\\:hidden {
                display: none !important;
              }
              .chapter-print-page {
                page-break-after: always;
                break-after: page;
              }
              .article-break {
                page-break-inside: avoid;
                break-inside: avoid;
              }
            }
          `}</style>

          {/* BOOK COVER PAGE / HEADER */}
          <div className="border-b-2 border-slate-900 dark:border-white/20 pb-8 space-y-4 print:border-black">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 print:text-gray-600">
              <span className="font-bold tracking-widest uppercase">BitcoinCrypto.tech Masterclass Series</span>
              <span>Volume #{chapter.chapterNumber} • {chapter.badge}</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-black uppercase text-amber-600 dark:text-amber-400 print:text-gray-800">
                OFFICIAL RESEARCH CHAPTER
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white print:text-black tracking-tight leading-tight">
                Chapter {chapter.chapterNumber}: {chapter.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 print:text-gray-700 leading-relaxed max-w-3xl">
                {chapter.tagline}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300 text-xs text-slate-700 dark:text-slate-300 print:text-gray-800 leading-relaxed">
              <strong>Chapter Executive Summary:</strong> {chapter.overview}
            </div>

            {/* Table of Contents for this Chapter */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider mb-2 print:text-gray-600">
                Chapter Table of Contents ({chapter.lessons.length} Articles)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {chapter.lessons.map((l, idx) => (
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

          {/* ALL 10 ARTICLES FULLY PRINTED */}
          <div className="space-y-12">
            {chapter.lessons.map((lesson, lIdx) => (
              <article
                key={lesson.id}
                className="article-break p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 print:border-gray-300 pb-3">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 print:text-gray-600 uppercase">
                      ARTICLE {lIdx + 1} OF {chapter.lessons.length} • CHAPTER {chapter.chapterNumber}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white print:text-black mt-0.5">
                      {lesson.title}
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 print:text-gray-500">
                    Est. Study: {lesson.duration}
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
                <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 print:text-gray-900 leading-relaxed font-sans">
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
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-white print:border-gray-300 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 print:text-gray-600 uppercase">
                Self-Assessment Study Questions
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white print:text-black mt-0.5">
                Chapter {chapter.chapterNumber} Assessment Answer Key
              </h3>
            </div>

            <div className="space-y-4">
              {chapter.quiz.map((q, qIdx) => (
                <div key={qIdx} className="space-y-2 text-xs">
                  <strong className="text-slate-900 dark:text-white print:text-black block">
                    Q{qIdx + 1}: {q.question}
                  </strong>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-950 print:bg-gray-50 border border-slate-200 dark:border-slate-800 print:border-gray-200 text-emerald-600 dark:text-emerald-400 print:text-black">
                    <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                    <p className="text-slate-500 dark:text-slate-400 print:text-gray-600 mt-1">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOOK FOOTER SIGN-OFF */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 print:border-gray-300 text-center text-xs font-mono text-slate-500 dark:text-slate-400 print:text-gray-600 space-y-1">
            <p className="font-bold text-slate-900 dark:text-white print:text-black">
              BitcoinCrypto Institutional Masterclass Series
            </p>
            <p>Published by BitcoinCrypto.tech • All Rights Reserved</p>
            <p>Downloaded for personal offline educational study.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
