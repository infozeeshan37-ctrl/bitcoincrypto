"use client";

import { useState } from "react";
import Link from "next/link";
import { articles } from "@/lib/blogData";
import { BookOpen, Clock, ArrowRight, Search, User, Sparkles, TrendingUp } from "lucide-react";

export default function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Research" },
    { id: "Market Intelligence", label: "Market Intelligence" },
    { id: "Trading Methodology", label: "Trading Methodology" },
    { id: "Derivatives Analysis", label: "Derivatives" },
    { id: "Quantitative Math", label: "Quant Math" },
    { id: "On-Chain Metrics", label: "On-Chain" },
    { id: "Risk Management", label: "Risk Strategy" },
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || art.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featured = articles[0];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 border border-amber-200 text-amber-900 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Research Desk & Market Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Institutional Research & Analysis
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            In-depth macroeconomic commentary, on-chain structural breakdowns, and quantitative trading frameworks written by our research fellows.
          </p>
        </div>

        {/* Featured Top Article Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded-lg">
                  FEATURED ANALYSIS
                </span>
                <span className="text-slate-500 font-semibold">{featured.category}</span>
                <span>•</span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {featured.readTime}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 hover:text-amber-600 transition leading-tight">
                <Link href={`/blog/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {featured.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-8">
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-medium uppercase">Author</div>
                <div className="text-sm font-bold text-slate-900">{featured.author}</div>
                <div className="text-xs text-amber-700 font-medium">{featured.authorRole}</div>
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition flex items-center gap-2"
              >
                Read Full Paper <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search research by topic or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCategory === cat.id
                    ? "bg-amber-400 text-slate-950 shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <article
              key={art.slug}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between group hover:border-amber-300 hover:shadow-md transition space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {art.readTime}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-700 transition leading-snug">
                  <Link href={`/blog/${art.slug}`}>
                    {art.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {art.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-50 text-slate-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{art.author}</span>
                <Link
                  href={`/blog/${art.slug}`}
                  className="font-bold text-amber-600 group-hover:text-amber-700 flex items-center gap-1"
                >
                  Read paper <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
