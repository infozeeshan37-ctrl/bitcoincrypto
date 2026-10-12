export interface CourseLesson {
  id: string;
  slug: string;
  chapterNumber: string;
  lessonNumber: number;
  title: string;
  duration: string;
  keyConcepts: string[];
  content: string[];
  formula?: {
    name: string;
    math: string;
    explanation: string;
  };
  proTip: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseChapter {
  id: string;
  chapterNumber: string;
  moduleNumber?: string;
  title: string;
  tagline: string;
  category: "fundamentals" | "technical" | "microstructure" | "derivatives" | "risk" | "macro";
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  accentColor: string;
  badge: string;
  diagramType:
    | "halving"
    | "mvrv"
    | "market-structure"
    | "rsi-divergence"
    | "orderbook"
    | "liquidation-cascade"
    | "drawdown-matrix";
  overview: string;
  lessons: CourseLesson[];
  quiz: QuizQuestion[];
  linkedTool: {
    name: string;
    href: string;
    actionText: string;
  };
  references?: {
    title: string;
    url: string;
    source: string;
    type: "Primary Source" | "Academic" | "Government / Fed" | "Exchange Data" | "Regulatory";
  }[];
  relatedInternalLinks?: {
    title: string;
    href: string;
    badge: string;
    description: string;
  }[];
}

export interface CourseGlossaryItem {
  term: string;
  category: string;
  def: string;
}
