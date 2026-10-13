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
  Globe2,
  LineChart
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
  CourseLesson,
  CourseLearningTrack,
  learningTracks,
  fundamentalChapters,
  technicalChapters,
  getChaptersByTrack
} from "@/lib/courseData";

interface CryptoLearnViewProps {
  initialTrack?: CourseLearningTrack;
  canonicalPath?: string;
}

export default function CryptoLearnView({
  initialTrack = "all",
  canonicalPath = "/learn",
}: CryptoLearnViewProps) {
  const [activeTrack, setActiveTrack] = useState<CourseLearningTrack>(initialTrack);
  const [activeChapterId, setActiveChapterId] = useState<string>(() => {
    if (initialTrack === "technical") return technicalChapters[0].id;
    if (initialTrack === "fundamental") return fundamentalChapters[0].id;
    return courseChapters[0].id;
  });
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Modal state
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfInitialMode, setPdfInitialMode] = useState<"chapter" | "fundamental" | "technical" | "all">("chapter");

  // Read URL params on client side if on /learn
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlTrack = params.get("track") || params.get("path");
      if (urlTrack === "technical" || urlTrack === "fundamental") {
        setActiveTrack(urlTrack as CourseLearningTrack);
        if (urlTrack === "technical" && !technicalChapters.some((c) => c.id === activeChapterId)) {
          setActiveChapterId(technicalChapters[0].id);
        } else if (urlTrack === "fundamental" && !fundamentalChapters.some((c) => c.id === activeChapterId)) {
          setActiveChapterId(fundamentalChapters[0].id);
        }
      }
    }
  }, []);

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

  const switchTrack = (newTrack: CourseLearningTrack) => {
    setActiveTrack(newTrack);
    setActiveCategory("all");
    if (newTrack === "technical") {
      if (!technicalChapters.some((c) => c.id === activeChapterId)) {
        setActiveChapterId(technicalChapters[0].id);
      }
    } else if (newTrack === "fundamental") {
      if (!fundamentalChapters.some((c) => c.id === activeChapterId)) {
        setActiveChapterId(fundamentalChapters[0].id);
      }
    }
    // Update browser URL query if on /learn
    if (typeof window !== "undefined" && window.location.pathname === "/learn") {
      const newUrl = newTrack === "all" ? "/learn" : `/learn?path=${newTrack}`;
      window.history.replaceState({}, "", newUrl);
    }
  };

  const trackChapters = useMemo(() => {
    return getChaptersByTrack(activeTrack);
  }, [activeTrack]);

  const activeChapter = useMemo(() => {
    return courseChapters.find((c) => c.id === activeChapterId) || trackChapters[0] || courseChapters[0];
  }, [activeChapterId, trackChapters]);

  const trackArticles = useMemo(() => {
    return allArticles.filter((a) => trackChapters.some((c) => c.id === a.chapterId));
  }, [trackChapters]);

  const totalArticlesCount = trackArticles.length;
  const completedCount = trackArticles.filter((a) => completedLessons[a.id]).length;
  const progressPercent = totalArticlesCount > 0 ? Math.min(100, Math.round((completedCount / totalArticlesCount) * 100)) : 0;

  // Category options scoped by active track
  const categoryOptions = useMemo(() => {
    if (activeTrack === "technical") {
      return [
        { id: "all", label: "All 6 Technical Chapters" },
        { id: "technical", label: "Candlestick Auction & Indicators" },
        { id: "microstructure", label: "Order Flow & Level-2 Depth" },
        { id: "derivatives", label: "Perpetuals & CoinGlass Liquidations" },
        { id: "risk", label: "Mathematical Risk & Kelly Criterion" },
      ];
    }
    if (activeTrack === "fundamental") {
      return [
        { id: "all", label: "All 4 Fundamental Chapters" },
        { id: "fundamentals", label: "Bitcoin, Ethereum & On-Chain" },
        { id: "macro", label: "Macroeconomic Liquidity & Fed Policy" },
      ];
    }
    return [
      { id: "all", label: "All 10 Chapters" },
      { id: "fundamentals", label: "Fundamentals & On-Chain" },
      { id: "macro", label: "Macro & Global Liquidity" },
      { id: "technical", label: "Technical Analysis & Price Action" },
      { id: "microstructure", label: "Microstructure & Order Flow" },
      { id: "derivatives", label: "Derivatives & CoinGlass" },
      { id: "risk", label: "Risk Management Math" },
    ];
  }, [activeTrack]);

  // Category filter
  const filteredChapters = useMemo(() => {
    if (activeCategory === "all") return trackChapters;
    return trackChapters.filter((c) => c.category === activeCategory);
  }, [activeCategory, trackChapters]);

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

  const openPdfForChapter = (chapterId?: string) => {
    if (chapterId) {
      setActiveChapterId(chapterId);
    }
    setPdfInitialMode("chapter");
    setIsPdfModalOpen(true);
  };

  const openPdfForAllChapters = () => {
    setPdfInitialMode("all");
    setIsPdfModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8 sm:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Crypto Learn Academy", href: "/learn" },
            ...(activeTrack === "technical"
              ? [{ label: "Technical Analysis Track", href: "/learn/technical" }]
              : activeTrack === "fundamental"
              ? [{ label: "Fundamental Analysis Track", href: "/learn/fundamental" }]
              : []),
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
                <span>
                  {activeTrack === "technical"
                    ? "Path 1 • Technical Analysis Track (6 Chapters • 60 Lessons)"
                    : activeTrack === "fundamental"
                    ? "Path 2 • Fundamental Analysis Track (4 Chapters • 40 Lessons)"
                    : "BitcoinCrypto Institutional Academy (10 Chapters • 100 Lessons)"}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {activeTrack === "technical"
                  ? "Technical Analysis: Quantitative Trading, Order Flow & Liquidations"
                  : activeTrack === "fundamental"
                  ? "Fundamental Analysis: Protocol Consensus, Macro Liquidity & On-Chain Cycles"
                  : "Crypto Learn: Institutional Cryptocurrency Trading & Valuation Course"}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeTrack === "technical"
                  ? "The quantitative trading methodology for digital asset operators. Master candlestick auction theory, Level-2 order book depth, Cumulative Volume Delta (CVD), technical indicator confluence, HFT exchange microstructure, CoinGlass liquidation cascading mechanics, and Kelly Criterion risk sizing across 60 original human-written lessons."
                  : activeTrack === "fundamental"
                  ? "The institutional grounding in digital asset economics. Master Bitcoin Nakamoto consensus & UTXO mechanics, Ethereum EVM & smart contracts, Federal Reserve macroeconomic liquidity & CPI inflation dynamics, and on-chain valuation cycle ratios (MVRV Z-Score, SOPR, NVT) across 40 original human-written lessons."
                  : "The institutional curriculum for digital asset traders and quantitative analysts. Choose between the Technical Analysis Track (60 Articles) or Fundamental Analysis Track (40 Articles), spanning 100 human-written research articles, interactive live-crosshair diagrams, and downloadable PDF textbooks."}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  {trackChapters.length} Chapters ({trackArticles.length} Articles)
                </span>
                <span className="flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-purple-400" /> Interactive Crosshair Diagrams
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-400" /> Formatted PDF Textbooks
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-cyan-400" /> 100% Free &amp; Open Access
                </span>
              </div>
            </div>

            {/* PROGRESS & SHARING CARD */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 lg:w-80 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase font-bold">
                  {activeTrack === "technical"
                    ? "Technical Progress"
                    : activeTrack === "fundamental"
                    ? "Fundamental Progress"
                    : "Curriculum Progress"}
                </span>
                <span className="text-xs font-mono font-black text-emerald-400">{progressPercent}% Completed</span>
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

              {/* Clean Quick Export Trigger */}
              <button
                onClick={() => {
                  if (activeTrack === "technical") {
                    setPdfInitialMode("technical");
                    setIsPdfModalOpen(true);
                  } else if (activeTrack === "fundamental") {
                    setPdfInitialMode("fundamental");
                    setIsPdfModalOpen(true);
                  } else {
                    openPdfForChapter();
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs font-mono transition shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" />
                <span>
                  {activeTrack === "technical"
                    ? "Export Technical Track (PDF)"
                    : activeTrack === "fundamental"
                    ? "Export Fundamental Track (PDF)"
                    : `Export Chapter ${activeChapter.chapterNumber} (PDF)`}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* 🚀 2 DISTINCT LEARNING PATHS (TECHNICAL ANALYSIS vs FUNDAMENTAL LEARN GATEWAY) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Curriculum Learning Paths
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                Choose Your Educational Path
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
              Select path to filter curriculum &amp; progress
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Path 1: Technical Analysis Track */}
            <div
              onClick={() => switchTrack("technical")}
              className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-4 group ${
                activeTrack === "technical"
                  ? "bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border-emerald-500 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500/20"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Path 1 • Technical Analysis Track</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-500">
                    Ch. 5–10
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition">
                      Technical Analysis (Technical Learn)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                      {learningTracks.technical.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-black text-xl shrink-0">
                    📈
                  </div>
                </div>

                {/* Key topics pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {learningTracks.technical.keyTopics.map((topic, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      ✓ {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">
                  <strong>6 Chapters</strong> • <strong>60 Articles</strong> • {learningTracks.technical.estimatedHours}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 font-bold ${
                    activeTrack === "technical"
                      ? "text-emerald-400"
                      : "text-slate-900 dark:text-white group-hover:text-emerald-500"
                  }`}
                >
                  {activeTrack === "technical" ? "✓ Currently Active" : "Select Technical Path"}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

            {/* Path 2: Fundamental Analysis Track */}
            <div
              onClick={() => switchTrack("fundamental")}
              className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-4 group ${
                activeTrack === "fundamental"
                  ? "bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-950 border-amber-500 shadow-xl shadow-amber-500/10 ring-2 ring-amber-500/20"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-500/50 shadow-sm"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    <Globe2 className="w-3.5 h-3.5" />
                    <span>Path 2 • Fundamental Analysis Track</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-500">
                    Ch. 1–4
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-amber-500 transition">
                      Fundamental Analysis (Fundamental Learn)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                      {learningTracks.fundamental.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-black text-xl shrink-0">
                    🌐
                  </div>
                </div>

                {/* Key topics pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {learningTracks.fundamental.keyTopics.map((topic, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      ✓ {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">
                  <strong>4 Chapters</strong> • <strong>40 Articles</strong> • {learningTracks.fundamental.estimatedHours}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 font-bold ${
                    activeTrack === "fundamental"
                      ? "text-amber-400"
                      : "text-slate-900 dark:text-white group-hover:text-amber-500"
                  }`}
                >
                  {activeTrack === "fundamental" ? "✓ Currently Active" : "Select Fundamental Path"}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* TRACK SWITCHER SEGMENTED BAR */}
        <div className="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => switchTrack("all")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 ${
                activeTrack === "all"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>All 10 Chapters (100 Articles)</span>
            </button>
            <button
              onClick={() => switchTrack("technical")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 ${
                activeTrack === "technical"
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Technical Analysis Track (Ch. 5–10 • 60 Articles)</span>
            </button>
            <button
              onClick={() => switchTrack("fundamental")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 ${
                activeTrack === "fundamental"
                  ? "bg-amber-400 text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-amber-500 hover:bg-amber-500/10"
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Fundamental Analysis Track (Ch. 1–4 • 40 Articles)</span>
            </button>
          </div>

          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 pr-2">
            Active: <strong className="text-slate-900 dark:text-white">
              {activeTrack === "technical" ? "Technical Track (60 Lessons)" : activeTrack === "fundamental" ? "Fundamental Track (40 Lessons)" : "Full Masterclass (100 Lessons)"}
            </strong>
          </div>
        </div>

        {/* 📑 TOP PROFESSIONAL RESEARCH EXPORT BAR (CLEAN & INSTITUTIONAL) */}
        <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-sm block">
                Research Publications &amp; PDF Downloads
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                Download individual chapter research papers or complete track compendiums for offline study.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Quick Chapter Selector Dropdown */}
            <div className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2">
              <span className="text-slate-500 dark:text-slate-400 mr-2 text-[11px]">Chapter:</span>
              <select
                value={activeChapterId}
                onChange={(e) => {
                  setActiveChapterId(e.target.value);
                  openPdfForChapter(e.target.value);
                }}
                className="bg-transparent text-emerald-600 dark:text-emerald-400 font-bold focus:outline-none cursor-pointer text-xs"
              >
                {trackChapters.map((ch) => (
                  <option key={ch.id} value={ch.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    Ch. {ch.chapterNumber}: {ch.title.split(":")[0]}
                  </option>
                ))}
              </select>
            </div>

            {/* Download Selected Chapter PDF */}
            <button
              onClick={() => openPdfForChapter()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold transition border border-slate-200 dark:border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span>Chapter {activeChapter.chapterNumber} PDF</span>
            </button>

            {/* Track-Specific Compendium PDF */}
            {activeTrack === "technical" && (
              <button
                onClick={() => {
                  setPdfInitialMode("technical");
                  setIsPdfModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Technical Track (60 Articles PDF)</span>
              </button>
            )}

            {activeTrack === "fundamental" && (
              <button
                onClick={() => {
                  setPdfInitialMode("fundamental");
                  setIsPdfModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Fundamental Track (40 Articles PDF)</span>
              </button>
            )}

            {activeTrack === "all" && (
              <button
                onClick={openPdfForAllChapters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>All 10 Chapters (Complete 100 Articles)</span>
              </button>
            )}
          </div>
        </section>

        {/* SEARCH BAR & DIRECTORY */}
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
          {categoryOptions.map((cat) => (
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

        {/* CHAPTERS GRID SELECTOR (CLEAN & SOPHISTICATED) */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${
          activeTrack === "fundamental"
            ? "lg:grid-cols-4"
            : activeTrack === "technical"
            ? "lg:grid-cols-6"
            : "lg:grid-cols-5"
        } gap-3.5`}>
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

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">{chapter.lessons.length} Articles</span>
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
                onClick={() => openPdfForChapter()}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs transition border border-slate-200 dark:border-slate-700"
              >
                <Download className="w-4 h-4 text-emerald-500" />
                <span>Download Chapter {activeChapter.chapterNumber} (PDF)</span>
              </button>

              <Link
                href={activeChapter.linkedTool.href}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition shadow-md shadow-amber-400/20"
              >
                <Zap className="w-4 h-4" />
                <span>{activeChapter.linkedTool.actionText}</span>
              </Link>
            </div>
          </div>

          {/* INTERACTIVE LIVE-CURSOR DIAGRAM SECTION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-500" />
                <span>Interactive Concept Diagram</span>
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
              <span className="text-xs font-mono text-slate-400">100% Original Human Analysis</span>
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

          {/* PRIMARY SOURCES & EXTERNAL CITATIONS (E-E-A-T AUTHORITATIVE OUTBOUND LINKS) */}
          {activeChapter.references && activeChapter.references.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                    E-E-A-T Academic &amp; Regulatory Verification
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-emerald-500" />
                    <span>Primary Sources &amp; Authoritative References (External Links)</span>
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">{activeChapter.references.length} Verified Sources</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeChapter.references.map((ref, rIdx) => (
                  <a
                    key={rIdx}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 transition flex flex-col justify-between space-y-2 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                          {ref.type}
                        </span>
                        <span className="text-slate-400">{ref.source}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition line-clamp-2">
                        {ref.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1 group-hover:text-emerald-400 transition">
                      <span className="truncate">{ref.url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* INTEGRATED PREDICTIVE MODELS & REAL-TIME TRADING TOOLS (INTERNAL BACKLINKS) */}
          {activeChapter.relatedInternalLinks && activeChapter.relatedInternalLinks.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    Platform Ecosystem Cross-Links
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Connected Analytical Tools &amp; Predictive Models (Internal Links)</span>
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Live Software Modules</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeChapter.relatedInternalLinks.map((link, lIdx) => (
                  <Link
                    key={lIdx}
                    href={link.href}
                    className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-950/80 dark:to-slate-900/80 hover:border-emerald-500/50 border border-slate-200 dark:border-slate-800 transition flex flex-col justify-between space-y-2 group shadow-sm"
                  >
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px] font-mono">
                        {link.badge}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition line-clamp-2">
                        {link.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {link.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold pt-1">
                      <span>Launch Model</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CHAPTER NAVIGATION & TRACK BRIDGE */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            {/* Previous Chapter */}
            {(() => {
              const currentIdx = trackChapters.findIndex((c) => c.id === activeChapter.id);
              const prevCh = currentIdx > 0 ? trackChapters[currentIdx - 1] : null;
              if (prevCh) {
                return (
                  <button
                    onClick={() => setActiveChapterId(prevCh.id)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition flex items-center justify-center gap-2"
                  >
                    <span>&larr; Previous: Ch. {prevCh.chapterNumber}</span>
                  </button>
                );
              }
              if (activeTrack === "technical") {
                return (
                  <button
                    onClick={() => switchTrack("fundamental")}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold transition flex items-center justify-center gap-2 border border-amber-500/30"
                  >
                    <span>&larr; Fundamental Track (Ch. 1–4)</span>
                  </button>
                );
              }
              return <div />;
            })()}

            {/* Track indicator */}
            <div className="text-slate-400 text-center text-[11px]">
              Chapter {activeChapter.chapterNumber} of {trackChapters.length} in{" "}
              <strong className="text-slate-900 dark:text-white">
                {activeTrack === "technical" ? "Technical Track" : activeTrack === "fundamental" ? "Fundamental Track" : "Full Masterclass"}
              </strong>
            </div>

            {/* Next Chapter or Track Bridge */}
            {(() => {
              const currentIdx = trackChapters.findIndex((c) => c.id === activeChapter.id);
              const nextCh = currentIdx < trackChapters.length - 1 ? trackChapters[currentIdx + 1] : null;
              if (nextCh) {
                return (
                  <button
                    onClick={() => setActiveChapterId(nextCh.id)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Next: Ch. {nextCh.chapterNumber} &rarr;</span>
                  </button>
                );
              }
              if (activeTrack === "fundamental") {
                return (
                  <button
                    onClick={() => switchTrack("technical")}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black transition flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
                  >
                    <span>Begin Technical Track (Ch. 5) &rarr;</span>
                  </button>
                );
              }
              return (
                <button
                  onClick={() => openPdfForAllChapters()}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Curriculum Complete • Download PDF</span>
                </button>
              );
            })()}
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

        {/* CITATION & BACKLINK HUB */}
        <ToolCitationWidget
          toolName={
            activeTrack === "technical"
              ? "Crypto Learn: Technical Analysis & Quantitative Execution Course"
              : activeTrack === "fundamental"
              ? "Crypto Learn: Fundamental Analysis & On-Chain Valuation Course"
              : "Crypto Learn: Institutional Cryptocurrency Trading & Valuation Masterclass"
          }
          toolUrl={
            activeTrack === "technical"
              ? "https://www.bitcoincrypto.tech/learn/technical"
              : activeTrack === "fundamental"
              ? "https://www.bitcoincrypto.tech/learn/fundamental"
              : "https://www.bitcoincrypto.tech/learn"
          }
          description={
            activeTrack === "technical"
              ? "6-Chapter quantitative curriculum spanning 60 human-written articles on candlestick price action, Level-2 order book depth, CVD, indicators, and Kelly Criterion risk management."
              : activeTrack === "fundamental"
              ? "4-Chapter institutional curriculum spanning 40 human-written articles on Bitcoin consensus, Ethereum EVM, macroeconomic liquidity, CPI inflation, and on-chain MVRV Z-Score valuation."
              : "Complete 10-Chapter institutional curriculum spanning 100 human-written articles on fundamental on-chain valuation, market microstructure, derivatives liquidations, and capital preservation."
          }
        />
      </div>

      {/* CHAPTER PDF MODAL */}
      <ChapterPdfModal
        chapter={activeChapter}
        allChapters={courseChapters}
        initialMode={pdfInitialMode}
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </div>
  );
}
