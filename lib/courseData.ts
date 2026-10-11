import { CourseChapter, CourseLesson, QuizQuestion, CourseGlossaryItem } from "./course/types";
import { chapter1 } from "./course/chapter1";
import { chapter2 } from "./course/chapter2";
import { chapter3 } from "./course/chapter3";
import { chapter4 } from "./course/chapter4";
import { chapter5 } from "./course/chapter5";
import { chapter6 } from "./course/chapter6";
import { chapter7 } from "./course/chapter7";
import { chapter8 } from "./course/chapter8";
import { chapter9 } from "./course/chapter9";
import { chapter10 } from "./course/chapter10";

export type { CourseChapter, CourseLesson, QuizQuestion, CourseGlossaryItem };
export type CourseModule = CourseChapter;

// Aggregated 10 Comprehensive Chapters (100 Articles total)
export const courseChapters: CourseChapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8,
  chapter9,
  chapter10
].map((c) => ({
  ...c,
  moduleNumber: c.chapterNumber
}));

// Alias for backward compatibility
export const courseModules: CourseChapter[] = courseChapters;

// Flattened catalog of all 100 authentic articles
export const allArticles = courseChapters.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterBadge: chapter.badge,
    chapterCategory: chapter.category,
    chapterLevel: chapter.level
  }))
);

export function getAllArticles() {
  return allArticles;
}

export function getArticleBySlug(slug: string) {
  return allArticles.find((a) => a.slug === slug || a.id === slug);
}

export function getChapterById(id: string) {
  return courseChapters.find((c) => c.id === id);
}

export const courseGlossary: CourseGlossaryItem[] = [
  { term: "Central Limit Order Book (CLOB)", category: "Microstructure", def: "The deterministic electronic matching engine where resting limit buy and sell orders are queued according to strict price-time (FIFO) priority." },
  { term: "Cumulative Volume Delta (CVD)", category: "Microstructure", def: "The running cumulative difference between aggressive taker market buying volume and aggressive taker market selling volume, used to identify absorption." },
  { term: "MVRV Z-Score", category: "Fundamentals", def: "An on-chain metric comparing market cap to realized acquisition cost, normalized by historical standard deviation to pinpoint cycle tops (Z>6) and bottoms (Z<0.1)." },
  { term: "Break of Structure (BOS)", category: "Technical", def: "A confirmed candle body close breaking through a previous swing high in an uptrend or swing low in a downtrend, validating institutional trend continuation." },
  { term: "Change of Character (CHoCH)", category: "Technical", def: "The initial break of a protected opposite swing point (e.g. breaking a higher low in an uptrend), providing an early structural warning of trend reversal." },
  { term: "Perpetual Funding Rate", category: "Derivatives", def: "Periodic 8-hour cash settlements exchanged between long and short contract holders to tether perpetual futures prices to spot index prices without expiration." },
  { term: "Liquidation Cascade", category: "Derivatives", def: "A self-reinforcing chain reaction where forced liquidation market orders trigger consecutive price drops, liquidating subsequent leverage tiers down the order book." },
  { term: "Mathematical Expectancy", category: "Risk", def: "The average expected dollar return per trade based on historical win rate and risk-to-reward ratio: E = (Win% * WinSize) - (Loss% * LossSize)." },
  { term: "Fair Value Gap (FVG)", category: "Technical", def: "A 3-candle price imbalance where rapid displacement leaves an unfilled liquidity vacuum between Candle 1 and Candle 3 that acts as a future price magnet." },
  { term: "Anchored VWAP (AVWAP)", category: "Technical", def: "Volume-Weighted Average Price anchored to a specific historical catalyst (e.g. halving or cycle low), revealing the true aggregate dollar cost basis of participants." },
  { term: "Harmonic Mean", category: "Risk", def: "The mathematical average purchase price achieved through Dollar-Cost Averaging, which is always lower than or equal to the arithmetic average price." },
  { term: "Optimal Trade Entry (OTE)", category: "Technical", def: "The high-probability institutional discount zone between the 0.618 and 0.786 Fibonacci retracement levels within a dealing range." }
];
