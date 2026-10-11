"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  BarChart2,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  Compass,
  Cpu,
  Zap,
  Target,
  Flame,
  ChevronRight,
  Bookmark,
  Share2,
  Check,
  RotateCcw
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";
import CourseDiagrams from "./CourseDiagrams";
import { courseModules, courseGlossary, CourseModule } from "@/lib/courseData";

export default function CryptoLearnView() {
  const [activeModuleId, setActiveModuleId] = useState<string>(courseModules[0].id);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  // Restore progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("btc_learn_progress");
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const updated = { ...prev, [lessonId]: !prev[lessonId] };
      try {
        localStorage.setItem("btc_learn_progress", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const activeModule = courseModules.find((m) => m.id === activeModuleId) || courseModules[0];

  const totalLessons = courseModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  const filteredModules = activeCategory === "all"
    ? courseModules
    : courseModules.filter((m) => m.category === activeCategory);

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    const key = `${activeModule.id}_q${qIdx}`;
    setQuizAnswers((prev) => ({ ...prev, [key]: optIdx }));
  };

  const handleSubmitQuiz = (qIdx: number) => {
    const key = `${activeModule.id}_q${qIdx}`;
    setQuizSubmitted((prev) => ({ ...prev, [key]: true }));
  };

  const handleCopyCourseLink = () => {
    navigator.clipboard.writeText("https://www.bitcoincrypto.tech/learn");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8 sm:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Crypto Learn Academy", href: "/learn" },
          ]}
        />

        {/* HERO HEADER */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 border border-emerald-500/20 p-6 sm:p-12 shadow-2xl text-white">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>BitcoinCrypto Institutional Academy</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Crypto Learn: Complete Fundamental &amp; Technical Analysis Course
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                The institutional masterclass for digital asset traders and researchers. Master on-chain valuation ratios, market structure price action, Level-2 order book depth, CoinGlass liquidation squeeze cascades, and mathematical risk management with interactive charts and real-time simulators.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-400" /> 7 Comprehensive Modules
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-400" /> 4.5 Hours Curriculum
                </span>
                <span className="flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-purple-400" /> 7 Interactive SVG Diagrams
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-amber-400" /> 100% Free &amp; Open Access
                </span>
              </div>
            </div>

            {/* PROGRESS CARD */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 lg:w-80 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase font-bold">Course Progress</span>
                <span className="text-xs font-mono font-black text-emerald-400">{progressPercent}% Completed</span>
              </div>

              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>{completedCount} of {totalLessons} Lessons Finished</span>
                <button
                  onClick={handleCopyCourseLink}
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition"
                  title="Share Course"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Copied" : "Share"}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
          {[
            { id: "all", label: "All 7 Modules" },
            { id: "fundamentals", label: "1. Fundamentals & Macro" },
            { id: "technical", label: "2. Technical Analysis (TA)" },
            { id: "microstructure", label: "3. Order Flow & Level-2" },
            { id: "derivatives", label: "4. Derivatives & Liquidations" },
            { id: "risk", label: "5. Risk Management Math" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl whitespace-nowrap font-bold transition ${
                activeCategory === cat.id
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* MODULE CAROUSEL SELECTOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredModules.map((m) => {
            const isSelected = m.id === activeModuleId;
            const completedInModule = m.lessons.filter((l) => completedLessons[l.id]).length;
            const isModuleFinished = completedInModule === m.lessons.length && m.lessons.length > 0;

            return (
              <button
                key={m.id}
                onClick={() => setActiveModuleId(m.id)}
                className={`p-5 rounded-3xl text-left border transition-all duration-200 flex flex-col justify-between space-y-4 group ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/20"
                    : "bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-black text-amber-600 dark:text-amber-400">
                      Module {m.moduleNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold">
                      {m.level}
                    </span>
                  </div>

                  <h3 className={`font-black text-sm tracking-tight leading-snug transition ${
                    isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white group-hover:text-emerald-500"
                  }`}>
                    {m.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {m.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono">
                  <span className="text-slate-400">{m.estimatedTime}</span>
                  {isModuleFinished ? (
                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : (
                    <span className="text-slate-400">{completedInModule}/{m.lessons.length} done</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE MODULE CONTAINER */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-10">
          
          {/* Module Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                <span>MODULE {activeModule.moduleNumber}</span>
                <span>•</span>
                <span className="text-slate-400">{activeModule.level}</span>
                <span>•</span>
                <span className="text-slate-400">{activeModule.estimatedTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {activeModule.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                {activeModule.overview}
              </p>
            </div>

            {/* Direct Tool Link */}
            <Link
              href={activeModule.linkedTool.href}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition shadow-md shadow-amber-400/20 shrink-0 self-start md:self-auto"
            >
              <Zap className="w-4 h-4" />
              <span>{activeModule.linkedTool.actionText}</span>
            </Link>
          </div>

          {/* INTERACTIVE DIAGRAM SECTION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-500" />
                <span>Interactive Masterclass Concept Diagram</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">SVG Interactive Engine</span>
            </div>
            <CourseDiagrams type={activeModule.diagramType} />
          </div>

          {/* DETAILED LESSONS */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span>Curriculum Lessons ({activeModule.lessons.length} Modules)</span>
            </h3>

            <div className="space-y-6">
              {activeModule.lessons.map((lesson, lIdx) => {
                const isDone = Boolean(completedLessons[lesson.id]);

                return (
                  <div
                    key={lesson.id}
                    className="p-6 sm:p-7 rounded-3xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                          LESSON {lIdx + 1} OF {activeModule.lessons.length}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                          {lesson.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-slate-400">{lesson.duration}</span>
                        <button
                          onClick={() => toggleLessonComplete(lesson.id)}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                            isDone
                              ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isDone ? "text-emerald-500" : "text-slate-400"}`} />
                          <span>{isDone ? "Completed" : "Mark as Done"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Key takeaways bullet box */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                        Key Conceptual Takeaways:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {lesson.keyConcepts.map((kc, kIdx) => (
                          <li key={kIdx} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{kc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Lesson Paragraphs */}
                    <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {lesson.content.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {/* Mathematical Formula Box if present */}
                    {lesson.formula && (
                      <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs border border-slate-800 space-y-2">
                        <span className="text-[10px] text-amber-400 uppercase font-bold block">
                          Mathematical Formulation: {lesson.formula.name}
                        </span>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-amber-300 font-bold overflow-x-auto">
                          {lesson.formula.math}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {lesson.formula.explanation}
                        </p>
                      </div>
                    )}

                    {/* Institutional Pro Tip */}
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                      <strong>Institutional Pro Tip:</strong> {lesson.proTip}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* KNOWLEDGE CHECK QUIZ */}
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                  Self-Assessment Checkpoint
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  Module {activeModule.moduleNumber} Knowledge Check
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">{activeModule.quiz.length} Questions</span>
            </div>

            <div className="space-y-6">
              {activeModule.quiz.map((q, qIdx) => {
                const key = `${activeModule.id}_q${qIdx}`;
                const selectedOpt = quizAnswers[key];
                const isSubmitted = Boolean(quizSubmitted[key]);
                const isCorrect = selectedOpt === q.correctIndex;

                return (
                  <div
                    key={qIdx}
                    className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-4"
                  >
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Q{qIdx + 1}. {q.question}
                    </h4>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300";
                        if (isSubmitted) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold";
                          } else if (selectedOpt === optIdx) {
                            btnStyle = "bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200 font-bold";
                          }
                        } else if (selectedOpt === optIdx) {
                          btnStyle = "bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-amber-900 dark:text-amber-200 font-bold";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isSubmitted}
                            onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                            className={`w-full text-left p-3.5 rounded-2xl border text-xs transition flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && optIdx === q.correctIndex && (
                              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {!isSubmitted ? (
                      <button
                        disabled={selectedOpt === undefined}
                        onClick={() => handleSubmitQuiz(qIdx)}
                        className="py-2 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-mono text-xs font-bold disabled:opacity-40 transition"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <div className={`p-4 rounded-2xl text-xs space-y-1 ${
                        isCorrect
                          ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                          : "bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200"
                      }`}>
                        <strong>{isCorrect ? "✓ Correct!" : "✗ Incorrect."}</strong>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </section>

        {/* GLOSSARY QUICK DIRECTORY */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                Reference Compendium
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                Institutional Cryptocurrency Trading Glossary
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">10 Core Definitions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseGlossary.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                    {item.term}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.def}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 1-CLICK CITATION WIDGET */}
        <ToolCitationWidget
          toolName="BitcoinCrypto Institutional Crypto Learn Academy"
          toolUrl="https://www.bitcoincrypto.tech/learn"
          description="Complete 7-module cryptocurrency trading and valuation masterclass covering on-chain fundamentals, technical price action, order book depth, CoinGlass liquidations, and risk management."
        />

      </div>
    </div>
  );
}
