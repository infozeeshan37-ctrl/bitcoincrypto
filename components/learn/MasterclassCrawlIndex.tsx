import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, GraduationCap, CheckCircle2 } from "lucide-react";
import { CourseChapter } from "@/lib/courseData";

interface MasterclassCrawlIndexProps {
  chapters: CourseChapter[];
  title?: string;
  description?: string;
}

export default function MasterclassCrawlIndex({
  chapters,
  title = "Complete Cryptocurrency Masterclass Curriculum (100 Articles)",
  description = "Explore all comprehensive, human-written research lessons covering on-chain valuation, market microstructure, Level-2 order book depth, CoinGlass liquidation cascades, and quantitative risk management.",
}: MasterclassCrawlIndexProps) {
  const totalLessons = chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);

  return (
    <section className="bg-slate-50/70 dark:bg-slate-950/80 py-16 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Curriculum Index • {totalLessons} Standalone Lessons</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {chapters.map((ch) => (
            <div
              key={ch.id}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm hover:border-amber-400/40 dark:hover:border-amber-500/30 transition"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Chapter {ch.chapterNumber} • {ch.level}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {ch.lessons.length} Lessons • {ch.estimatedTime}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {ch.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {ch.overview}
                </p>
              </div>

              <ul className="space-y-1.5 pt-2">
                {ch.lessons.map((lesson, lIdx) => (
                  <li key={lesson.slug}>
                    <Link
                      href={`/learn/${lesson.slug}`}
                      className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition text-xs font-medium text-slate-700 dark:text-slate-300"
                      title={lesson.title}
                    >
                      <span className="truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                        {lIdx + 1}. {lesson.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                        {lesson.duration}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
