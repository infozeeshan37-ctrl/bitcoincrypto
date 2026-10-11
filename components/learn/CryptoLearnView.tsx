"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Zap,
  ChevronRight,
  Bookmark,
  Share2,
  Check,
  RotateCcw,
  Download,
  Search,
  FileText,
  Sliders,
  ExternalLink,
  BookMarked
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";
import CourseDiagrams from "./CourseDiagrams";
import ChapterPdfModal from "./ChapterPdfModal";
import {
  courseChapters,
  allArticles,
  courseGlossary,
  CourseChapter,
  CourseLesson
} from "@/lib/courseData";

export default function CryptoLearnView() {
  const [activeChapterId, setActiveChapterId] = useState<string>(courseChapters[0].id);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [pdfModalChapter, setPdfModalChapter] = useState<CourseChapter | null>(null);

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

  const activeChapter = useMemo(() => {
    return courseChapters.find((c) => c.id === activeChapterId) || courseChapters[0];
  }, [activeChapterId]);

  const totalArticlesCount = allArticles.length;
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalArticlesCount) * 100));

  // Category filter
  const filteredChapters = useMemo(() => {
    if (activeCategory === "all") return courseChapters;
    return courseChapters.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  // Global search across all 100 articles
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allArticles.filter((article) => {
      const matchTitle = article.title.toLowerCase().includes(query);
      const matchConcepts = article.keyConcepts.some((k) => k.toLowerCase().includes(query));
      const matchContent = article.content.some((c) => c.toLowerCase().includes(query));
      return matchTitle || matchConcepts || matchContent;
    });
  }, [searchQuery]);

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    const key = `${activeChapter.id}_q${qIdx}`;
    setQuizAnswers((prev) => ({ ...prev, [key]: optIdx }));
  };

  const handleSubmitQuiz = (qIdx: number) => {
    const key = `${activeChapter.id}_q${qIdx}`;
    setQuizSubmitted((prev) => ({ ...prev, [key]: true }));
  };

  const handleCopyCourseLink = () => {
    navigator.clipboard.writeText("https://www.bitcoincrypto.tech/learn");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleOpenPdf = (chapter: CourseChapter) => {
    setPdfModalChapter(chapter);
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
                Crypto Learn: 100 Authentic Articles &amp; Downloadable Chapter eBooks
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                The institutional masterclass for digital asset traders and researchers. Spanning 10 core chapters and 100 human-written research articles, master on-chain valuation ratios, market structure price action, Level-2 order book depth, CoinGlass liquidation squeeze cascades, and mathematical risk management with live interactive cursor charts.
              </p>

              {/* ACTION BUTTONS IN HERO */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleOpenPdf(activeChapter)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-black text-xs font-mono transition shadow-lg shadow-emerald-500/25"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Chapter {activeChapter.chapterNumber} PDF Book</span>
                </button>

                <a
                  href="#pdf-library"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs font-mono transition border border-white/10"
                >
                  <BookMarked className="w-4 h-4 text-amber-400" />
                  <span>Browse All 10 PDF Books ↓</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-400" /> 10 Chapters (100 Articles)
                </span>
                <span className="flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-amber-400" /> Individual Chapter PDF eBooks
                </span>
                <span className="flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-purple-400" /> Live-Cursor Trendline Charts
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-cyan-400" /> 100% Free &amp; Open Access
                </span>
              </div>
            </div>

            {/* PROGRESS & PDF TRIGGER CARD */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 lg:w-80 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase font-bold">Course Progress</span>
                <span className="text-xs font-mono font-black text-emerald-400">{progressPercent}% Done</span>
              </div>

              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>{completedCount} of {totalArticlesCount} Articles</span>
                <button
                  onClick={handleCopyCourseLink}
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition"
                  title="Share Course"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Copied" : "Share"}</span>
                </button>
              </div>

              {/* DEDICATED HIGH-CONTRAST DOWNLOAD BUTTON */}
              <button
                onClick={() => handleOpenPdf(activeChapter)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs font-mono transition shadow-lg shadow-emerald-500/20 group"
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>📥 Download Chapter {activeChapter.chapterNumber} PDF</span>
              </button>
            </div>
          </div>
        </section>

        {/* 📚 DEDICATED CHAPTER PDF EBOOK DOWNLOAD LIBRARY (UNMISSABLE QUICK-ACCESS) */}
        <section id="pdf-library" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-emerald-500/30 text-white shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Download className="w-3.5 h-3.5" />
                <span>OFFLINE EBOOK LIBRARY (10 BOOKS)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Download Individual Chapter PDF Books
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Save any of the 10 course chapters to your device as a formatted A4 PDF book for offline reading. Zero ads, complete mathematical formulas, and full study notes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {courseChapters.map((ch) => (
              <div
                key={ch.id}
                className="p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold text-amber-400">Chapter {ch.chapterNumber}</span>
                    <span className="text-slate-400">{ch.badge}</span>
                  </div>
                  <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                    {ch.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono block mt-1">
                    {ch.lessons.length} Articles • {ch.estimatedTime}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenPdf(ch)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[11px] font-mono transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SEARCH BAR & ARTICLE DIRECTORY */}
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search across all 100 articles (e.g. MVRV, Funding Rate, BOS, Liquidations, Halving)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-xs font-mono text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* SEARCH RESULTS DROPDOWN */}
          {searchQuery && (
            <div className="mt-3 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
                <span>Found {searchResults.length} matching articles</span>
                <span>Click article to jump</span>
              </div>
              {searchResults.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400 py-3 text-center">
                  No articles matched your search query. Try searching for "CVD", "SOPR", "Fibonacci", or "Margin".
                </p>
              ) : (
                <div className="space-y-2">
                  {searchResults.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => {
                        setActiveChapterId(a.chapterId);
                        setSearchQuery("");
                      }}
                      className="w-full text-left p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800/60 transition flex items-center justify-between group"
                    >
                      <div className="space-y-1 pr-3">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-amber-600 dark:text-amber-400">
                          <span>Chapter {a.chapterNumber}</span>
                          <span>•</span>
                          <span>{a.chapterBadge}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition">
                          {a.title}
                        </h4>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
          {[
            { id: "all", label: "All 10 Chapters (100 Articles)" },
            { id: "fundamentals", label: "Fundamentals & On-Chain" },
            { id: "macro", label: "Macro & Global Liquidity" },
            { id: "technical", label: "Technical Analysis & Price Action" },
            { id: "microstructure", label: "Microstructure & Order Flow" },
            { id: "derivatives", label: "Derivatives & CoinGlass" },
            { id: "risk", label: "Risk Management Math" },
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

        {/* CHAPTERS GRID SELECTOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {filteredChapters.map((chapter) => {
            const isSelected = chapter.id === activeChapterId;
            const completedInChapter = chapter.lessons.filter((l) => completedLessons[l.id]).length;
            const isChapterFinished = completedInChapter === chapter.lessons.length && chapter.lessons.length > 0;

            return (
              <div
                key={chapter.id}
                onClick={() => setActiveChapterId(chapter.id)}
                className={`p-4 rounded-3xl text-left border transition-all duration-200 flex flex-col justify-between space-y-3 group cursor-pointer ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/20"
                    : "bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-black text-amber-600 dark:text-amber-400">
                      Ch. {chapter.chapterNumber}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-[10px]">
                      {chapter.level}
                    </span>
                  </div>

                  <h3 className={`font-black text-xs sm:text-sm tracking-tight leading-snug transition line-clamp-2 ${
                    isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white group-hover:text-emerald-500"
                  }`}>
                    {chapter.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {chapter.tagline}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-[10px] font-mono">
                  {/* DIRECT PDF DOWNLOAD ON EACH CARD */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenPdf(chapter);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[10px] transition shadow-sm"
                    title={`Download Chapter ${chapter.chapterNumber} PDF`}
                  >
                    <Download className="w-3 h-3" />
                    <span>PDF</span>
                  </button>

                  {isChapterFinished ? (
                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Done
                    </span>
                  ) : (
                    <span className="text-slate-400">{completedInChapter}/{chapter.lessons.length}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ACTIVE CHAPTER DISPLAY CONTAINER */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-10">
          
          {/* Chapter Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                <span>CHAPTER {activeChapter.chapterNumber}</span>
                <span>•</span>
                <span className="text-slate-400">{activeChapter.badge}</span>
                <span>•</span>
                <span className="text-slate-400">{activeChapter.estimatedTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {activeChapter.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                {activeChapter.overview}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
              <button
                onClick={() => handleOpenPdf(activeChapter)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-black text-xs font-mono transition shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Download Chapter {activeChapter.chapterNumber} PDF eBook</span>
              </button>

              <Link
                href={activeChapter.linkedTool.href}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs transition border border-slate-200 dark:border-slate-700"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>{activeChapter.linkedTool.actionText}</span>
              </Link>
            </div>
          </div>

          {/* INTERACTIVE LIVE-CURSOR DIAGRAM SECTION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-500" />
                <span>Live Interactive Trendline Diagram</span>
              </h3>
              <span className="text-[11px] font-mono text-emerald-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Hover Active
              </span>
            </div>
            <CourseDiagrams type={activeChapter.diagramType} />
          </div>

          {/* DETAILED HUMAN-WRITTEN ARTICLES (10 ARTICLES IN THIS CHAPTER) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <span>Chapter {activeChapter.chapterNumber} Articles ({activeChapter.lessons.length} Total)</span>
              </h3>
              <button
                onClick={() => handleOpenPdf(activeChapter)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download this chapter as PDF eBook</span>
              </button>
            </div>

            <div className="space-y-6">
              {activeChapter.lessons.map((lesson, lIdx) => {
                const isDone = Boolean(completedLessons[lesson.id]);

                return (
                  <article
                    key={lesson.id}
                    id={lesson.slug}
                    className="p-6 sm:p-7 rounded-3xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-5 scroll-mt-20"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                          ARTICLE {lIdx + 1} OF {activeChapter.lessons.length}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                          {lesson.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => handleOpenPdf(activeChapter)}
                          className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-xs font-black transition flex items-center gap-1.5 shadow-sm"
                          title="Download Chapter PDF eBook"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF Book</span>
                        </button>

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
                        Core Conceptual Framework:
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
                    <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
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
                  </article>
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
                  Chapter {activeChapter.chapterNumber} Knowledge Check
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">{activeChapter.quiz.length} Questions</span>
            </div>

            <div className="space-y-6">
              {activeChapter.quiz.map((q, qIdx) => {
                const key = `${activeChapter.id}_q${qIdx}`;
                const selectedOpt = quizAnswers[key];
                const isSubmitted = Boolean(quizSubmitted[key]);
                const isCorrect = selectedOpt === q.correctIndex;

                return (
                  <div
                    key={qIdx}
                    className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-4"
                  >
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {qIdx + 1}. {q.question}
                    </h4>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        let optionStyle =
                          "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300";

                        if (isSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optionStyle =
                              "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold";
                          } else if (isChosen && !isCorrect) {
                            optionStyle =
                              "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 line-through";
                          }
                        } else if (isChosen) {
                          optionStyle =
                            "bg-amber-50 dark:bg-amber-950/30 border-amber-400 text-amber-900 dark:text-amber-200 font-bold";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isSubmitted}
                            onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                            className={`w-full text-left p-3.5 rounded-2xl border text-xs transition flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {!isSubmitted ? (
                        <button
                          disabled={selectedOpt === undefined}
                          onClick={() => handleSubmitQuiz(qIdx)}
                          className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          Check Answer
                        </button>
                      ) : (
                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex-1">
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* GLOSSARY SECTION */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
              Institutional Encyclopedia
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              Trading &amp; Valuation Terminology Reference
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseGlossary.map((item, gIdx) => (
              <div
                key={gIdx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                    {item.category}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                  {item.term}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.def}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CITATION & DISCLAIMER */}
        <ToolCitationWidget
          toolName="Crypto Learn Masterclass"
          description="Complete 10-Chapter institutional curriculum spanning 100 human-written articles on fundamental on-chain valuation, market microstructure, derivatives liquidations, and capital preservation."
        />
      </div>

      {/* FLOATING ACTION PILL: ALWAYS VISIBLE AS USER SCROLLS */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <button
          onClick={() => handleOpenPdf(activeChapter)}
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-black text-xs font-mono shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all border-2 border-white/20"
        >
          <Download className="w-4 h-4 animate-bounce" />
          <span>Download Chapter {activeChapter.chapterNumber} PDF</span>
        </button>
      </div>

      {/* CHAPTER PDF MODAL */}
      {pdfModalChapter && (
        <ChapterPdfModal
          chapter={pdfModalChapter}
          isOpen={Boolean(pdfModalChapter)}
          onClose={() => setPdfModalChapter(null)}
        />
      )}
    </div>
  );
}
