"use client";

import { useState } from "react";
import Link from "next/link";
import { articles } from "@/lib/blogData";
import { BookOpen, Clock, ArrowRight, Search, User, Sparkles, TrendingUp, Zap } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Research" },
    { id: "Macro Economics", label: "Macro & YCC" },
    { id: "Market Psychology & Targets", label: "Market Psychology" },
    { id: "Layer 1 Analysis", label: "Layer 1 & ETH" },
    { id: "DeFi & Derivatives", label: "DeFi & Basis" },
    { id: "AI & Decentralized Compute", label: "AI & Compute" },
    { id: "Market Intelligence", label: "Market Intelligence" },
    { id: "Trading Methodology", label: "Order Flow" },
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
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 sm:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <Breadcrumbs items={[{ label: "Research Desk & Insights", href: "/blog" }]} />

        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-700/80 text-amber-900 dark:text-amber-300 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Institutional Research Desk &amp; Macro Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Institutional Research &amp; Market Analysis
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            In-depth macroeconomic commentary, sovereign debt mechanics, on-chain structural breakdowns, and quantitative trading frameworks.
          </p>
        </div>

        {/* Featured Top Article Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {featured.imageUrl && (
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-video lg:aspect-[4/3] bg-slate-950">
                <img
                  src={featured.imageUrl}
                  alt={featured.imageAlt || featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <div className={`${featured.imageUrl ? "lg:col-span-7" : "lg:col-span-12"} space-y-4`}>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                <span className="bg-amber-400 text-slate-950 font-black px-2.5 py-1 rounded-lg">
                  FEATURED RESEARCH
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-semibold">{featured.category}</span>
                <span>•</span>
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {featured.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition leading-tight">
                <Link href={`/blog/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {featured.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {featured.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Author &amp; Role</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{featured.author} • <span className="text-amber-700 dark:text-amber-400 font-medium">{featured.authorRole}</span></div>
                </div>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="px-5 py-2.5 rounded-xl text-xs font-black bg-slate-950 dark:bg-slate-800 text-amber-400 hover:bg-slate-800 dark:hover:bg-slate-700 transition flex items-center gap-2 border border-slate-800 dark:border-slate-700 self-start sm:self-auto shadow-sm"
                >
                  <span>Read Full Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search research by topic or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCategory === cat.id
                    ? "bg-amber-400 text-slate-950 shadow-sm font-black"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <article
              key={art.slug}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between group hover:border-amber-400 dark:hover:border-amber-400/50 hover:shadow-lg transition-all duration-200 space-y-5"
            >
              <div className="space-y-3.5">
                {art.imageUrl && (
                  <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 aspect-video bg-slate-950">
                    <img
                      src={art.imageUrl}
                      alt={art.imageAlt || art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span className="font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded text-[10px]">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {art.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition leading-snug">
                  <Link href={`/blog/${art.slug}`}>
                    {art.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {art.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium truncate max-w-[150px]">{art.author}</span>
                <Link
                  href={`/blog/${art.slug}`}
                  className="font-bold text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 flex items-center gap-1 shrink-0"
                >
                  <span>Read Paper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
