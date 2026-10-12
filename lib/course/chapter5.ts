import { CourseChapter } from "./types";

export const chapter5: CourseChapter = {
  id: "technical-analysis-foundations",
  chapterNumber: "05",
  title: "Technical Analysis Foundations & Candlestick Anatomy",
  tagline: "Master price action fundamentals: OHLC anatomy, S/R flips, Wyckoff phases, multi-timeframe alignment, and VSA.",
  category: "technical",
  level: "Beginner",
  estimatedTime: "55 mins",
  accentColor: "emerald",
  badge: "Price Action Core",
  diagramType: "market-structure",
  overview:
    "Technical analysis is not astrology—it is the study of human and algorithmic supply and demand imbalances mapped visually over time. Learn how to decode candlestick anatomy, identify Wyckoff accumulation and distribution phases, execute multi-timeframe top-down analysis, and leverage Volume Spread Analysis (VSA) to trade in sync with institutional money.",
  linkedTool: {
    name: "TradingView Pro Terminal",
    href: "/tools/chart-terminal",
    actionText: "Practice Technical Charting on Terminal →"
  },
  references: [
    { title: "TradingView Charting Engine & Pine Script Algorithmic Framework", url: "https://www.tradingview.com/", source: "TradingView Financial Data", type: "Primary Source" },
    { title: "CFA Institute: Technical Analysis Principles & Market Behavior", url: "https://www.cfainstitute.org/", source: "CFA Institute Global Curriculum", type: "Academic" },
    { title: "Japanese Candlestick Charting Techniques: Auction Theory", url: "https://www.investopedia.com/terms/c/candlestick.asp", source: "Steve Nison Research", type: "Primary Source" },
    { title: "Wyckoff Method: Accumulation, Distribution & Composite Operator Dynamics", url: "https://school.stockcharts.com/doku.php?id=market_analysis:the_wyckoff_method", source: "Wyckoff Educational Foundation", type: "Academic" }
  ],
  relatedInternalLinks: [
    { title: "TradingView Pro Interactive Chart Terminal", href: "/tools/chart-terminal", badge: "Live Charting", description: "Real-time candlestick charts with multi-timeframe indicators and drawing tools." },
    { title: "AI Trading Signals & Copilot Terminal", href: "/tools/trading-bot", badge: "AI Signals", description: "Algorithmic momentum and multi-timeframe trend confluence execution assistant." },
    { title: "Quantitative Trading Concepts & Educational Guides", href: "/concepts", badge: "Guides", description: "Deep-dive mathematical primers on market structure, liquidity, and indicators." }
  ],
  lessons: [
    {
      id: "c5-l1",
      slug: "candlestick-anatomy-wick-rejections",
      chapterNumber: "05",
      lessonNumber: 1,
      title: "1. Candlestick Anatomy: Decoding OHLC & Wick Rejections",
      duration: "5 mins",
      keyConcepts: [
        "Open, High, Low, and Close (OHLC) auction dynamics",
        "Body size as an indicator of aggressive market momentum",
        "Upper and lower wicks as visible evidence of aggressive price rejection"
      ],
      content: [
        "Originating from 18th-century Japanese rice merchant Munehisa Homma, candlestick charts display four critical data points for any given time interval: the Open, High, Low, and Close (OHLC).",
        "The solid candle body represents the final net price change between the open and the close. A tall, full-bodied green candle proves that aggressive market buyers dominated the entire session without facing substantial limit sell resistance.",
        "The wicks (shadows) represent intra-session extremes where price pushed, encountered opposite liquidity, and was forcefully rejected. A long upper wick at a key resistance level reveals aggressive sellers stepping in to absorb buying volume, indicating potential exhaustion."
      ],
      proTip: "Never trade a candlestick until the candle has officially closed. An intraday candle can look like a massive bullish engulfing with 1 minute remaining, only to turn into a long-wick shooting star right at the close."
    },
    {
      id: "c5-l2",
      slug: "wyckoff-market-phases",
      chapterNumber: "05",
      lessonNumber: 2,
      title: "2. The 3 Universal Market Phases: Accumulation, Markup, and Distribution",
      duration: "6 mins",
      keyConcepts: [
        "Richard Wyckoff's composite operator model",
        "Accumulation ranges: Absorption of retail selling into strong hands",
        "Markup trends, Distribution tops, and Markdown bear phases"
      ],
      content: [
        "Markets never move in straight lines; they transition through four cyclical phases pioneered by legendary tape reader Richard Wyckoff: Accumulation, Markup, Distribution, and Markdown.",
        "During Accumulation, following a brutal bear trend, price trades within a tight, boring range. Smart money institutions quietly absorb available supply from exhausted retail sellers without driving price up.",
        "Once floating supply is locked up, the Markup phase begins: price explodes higher in a sustained trend. At the cycle peak, smart money enters Distribution—unloading their massive positions into exuberant retail buyers who are FOMOing into the market at the top."
      ],
      proTip: "Accumulation takes time and requires patience. The longer a base builds sideways in an accumulation range, the larger the subsequent markup trend will be ('The bigger the base, the higher into space')."
    },
    {
      id: "c5-l3",
      slug: "support-resistance-sr-flips",
      chapterNumber: "05",
      lessonNumber: 3,
      title: "3. Support & Resistance Mechanics: The Power of the S/R Flip",
      duration: "6 mins",
      keyConcepts: [
        "Why prior resistance turns into future support (Role Reversal)",
        "The psychology of trapped traders seeking breakeven exits",
        "Validating S/R flips with volume and retest candle closes"
      ],
      content: [
        "Support is a price level where buying interest is strong enough to overcome selling pressure. Resistance is a ceiling where selling interest overcomes buying pressure.",
        "One of the most reliable phenomena in all of trading is the Support/Resistance Flip (S/R Flip). When price cleanly breaks above a major resistance level, that level flips to act as new support on subsequent pullbacks.",
        "This occurs because traders who shorted at resistance are trapped underwater; when price pulls back to their entry, they rush to buy to cover at breakeven. Meanwhile, breakout traders who missed the initial move use the retest to enter, creating a powerful wall of buy orders."
      ],
      proTip: "Never buy the initial breakout green candle. The highest risk-to-reward entry is almost always the patient limit buy on the subsequent retest of the flipped resistance-turned-support."
    },
    {
      id: "c5-l4",
      slug: "multi-timeframe-analysis-mtf",
      chapterNumber: "05",
      lessonNumber: 4,
      title: "4. Multi-Timeframe Analysis (MTF): The Top-Down Master Workflow",
      duration: "6 mins",
      keyConcepts: [
        "Macro Trend (Weekly / Daily) -> Intermediate Structure (4-Hour) -> Execution (15-Minute / 5-Minute)",
        "The rule of timeframe hierarchy: Higher timeframes always dominate lower ones",
        "Avoiding the retail trap of trading conflicting signals"
      ],
      content: [
        "Amateur traders often get chopped to pieces because they zoom into a 1-minute or 5-minute chart and mistake minor noise for major market shifts.",
        "Professional traders utilize Top-Down Multi-Timeframe Analysis: Start on the Weekly and Daily charts to identify the dominant macro trend, major liquidity zones, and structural highs and lows.",
        "Next, drop down to the 4-Hour chart to locate immediate market structure, swing points, and key levels. Finally, use the 15-Minute or 5-Minute chart purely for execution—pinpointing precise entries with tight, mathematically protected stop losses."
      ],
      proTip: "If the Daily chart is in a confirmed uptrend, only take LONG setups on your 15-minute execution chart. Trading in the direction of the higher timeframe trend dramatically increases your win rate."
    },
    {
      id: "c5-l5",
      slug: "high-probability-candlestick-patterns",
      chapterNumber: "05",
      lessonNumber: 5,
      title: "5. High-Probability Candlestick Patterns: Pinbars, Engulfings & Stars",
      duration: "5 mins",
      keyConcepts: [
        "Bullish and Bearish Engulfing patterns at key structural levels",
        "Hammer and Shooting Star pinbars (exhaustion candles)",
        "Morning Star and Evening Star 3-candle reversal sequences"
      ],
      content: [
        "While memorizing dozens of candlestick patterns is unnecessary, three primary patterns consistently signal decisive shifts in auction dominance when they appear at key support or resistance levels.",
        "A Bullish Engulfing candle occurs when a green candle completely engulfs the entire price range and body of the preceding red candle, signaling that aggressive buyers have completely overwhelmed resting sellers.",
        "A Pinbar (Hammer or Shooting Star) features a small body and a long wick that is at least 2 to 3 times the size of the body. This proves that an attempt to push price in the direction of the wick was met with massive opposite absorption."
      ],
      proTip: "A candlestick pattern floating in the middle of nowhere has zero predictive value. A candlestick pattern printing directly at a Daily S/R level or 200 EMA has high statistical edge."
    },
    {
      id: "c5-l6",
      slug: "trendlines-parallel-channels",
      chapterNumber: "05",
      lessonNumber: 6,
      title: "6. Trendlines & Parallel Channels: Valid Touches vs Retail Traps",
      duration: "5 mins",
      keyConcepts: [
        "The Rule of Three: Requiring at least 3 distinct touches to validate a trendline",
        "Ascending and descending regression channels",
        "Trendline breaks vs liquidity stop runs"
      ],
      content: [
        "A trendline connects a series of higher swing lows in an uptrend or lower swing highs in a downtrend. Two points establish a potential line, but a trendline is only statistically validated after a third distinct touch respects the angle.",
        "Parallel channels take this further by plotting the upper boundary of the trend, illustrating the boundaries of fair value within a persistent trend.",
        "Beware of the 4th and 5th touches on a trendline. As a trendline becomes widely visible to retail traders, it becomes an engineered pool of stop losses, making it an attractive target for smart money to sweep before reversing."
      ],
      proTip: "When drawing trendlines, draw through the candle wicks for precision, but ensure candle bodies are closing above the line. If candle bodies start closing below the trendline on the Daily chart, the trend has weakened."
    },
    {
      id: "c5-l7",
      slug: "classical-chart-patterns",
      chapterNumber: "05",
      lessonNumber: 7,
      title: "7. Classical Chart Patterns: Double Bottoms, Head & Shoulders & Triangles",
      duration: "6 mins",
      keyConcepts: [
        "Reversal patterns: Double Top/Bottom, Head & Shoulders, Inverted H&S",
        "Continuation patterns: Bull/Bear Flags, Ascending/Descending Triangles",
        "Measured move price target calculations based on pattern height"
      ],
      content: [
        "Classical chart patterns represent recurring visual representations of trader psychology across consolidation ranges.",
        "A Head and Shoulders top features a left shoulder, a higher peak (head), and a lower peak (right shoulder), separated by a neckline. The failure of the right shoulder to exceed the head demonstrates exhaustion among buyers, and breaking the neckline triggers a technical selloff.",
        "Measured moves allow you to calculate logical take-profit targets: measure the vertical distance from the neckline to the peak of the head, and project that exact distance downward from the breakout point."
      ],
      proTip: "Always wait for a candle body close outside the neckline. Over 40% of apparent Head and Shoulders patterns in crypto fail and trap early short sellers into violent short squeezes."
    },
    {
      id: "c5-l8",
      slug: "dynamic-moving-averages",
      chapterNumber: "05",
      lessonNumber: 8,
      title: "8. Dynamic Support & Resistance: The 20 EMA, 50 SMA & 200-Day Moving Average",
      duration: "5 mins",
      keyConcepts: [
        "Simple Moving Average (SMA) vs Exponential Moving Average (EMA)",
        "The 200-Day SMA as the institutional dividing line between bull and bear markets",
        "Golden Cross (50 crossing above 200) vs Death Cross (50 crossing below 200)"
      ],
      content: [
        "Unlike horizontal price levels, moving averages provide dynamic support and resistance that shifts as price evolves.",
        "The 20-period EMA is the gold standard for momentum trending: in strong parabolic trends, price rides along the 20 EMA without closing below it. The 50-day SMA represents intermediate trend health.",
        "The 200-day SMA is the single most watched indicator by institutional Wall Street and crypto asset managers. When Bitcoin trades above its 200-day moving average, the market is structurally bullish; trading below it signals a defensive bear regime."
      ],
      formula: {
        name: "Exponential Moving Average Weighting",
        math: "\\text{EMA}_t = \\left(P_t \\times \\frac{2}{N+1}\\right) + \\left(\\text{EMA}_{t-1} \\times \\left(1 - \\frac{2}{N+1}\\right)\\right)",
        explanation: "Where N is the period. EMAs give higher mathematical weighting to recent price data compared to simple SMAs."
      },
      proTip: "During a bull market, the first test of the 200-day SMA after months of trading above it is historically one of the highest-win-rate dip-buying opportunities in crypto."
    },
    {
      id: "c5-l9",
      slug: "volume-spread-analysis-vsa",
      chapterNumber: "05",
      lessonNumber: 9,
      title: "9. Volume Spread Analysis (VSA): Spotting Smart Money Absorption vs Churn",
      duration: "5 mins",
      keyConcepts: [
        "Tom Williams' Volume Spread Analysis methodology",
        "High volume on narrow-spread candles = Hidden institutional absorption",
        "Low volume on wide-spread candles = Lack of institutional participation (Trap)"
      ],
      content: [
        "Price action without volume is only half the story. Volume Spread Analysis (VSA) examines the relationship between the spread (the candle's high-to-low range) and the trading volume.",
        "If price prints a narrow candle with massive volume, something abnormal is happening: aggressive market buyers are hitting the market, but someone with massive size is passively absorbing every single order without letting price move. This indicates institutional accumulation or distribution.",
        "Conversely, if price rallies on tiny, declining volume, institutions are not buying—retail traders are pushing price up in a vacuum. Such rallies are vulnerable to sudden, violent reversals."
      ],
      proTip: "Watch for 'Climax Volume' at the end of a long downtrend: a massive red candle with astronomical volume that closes well off its lows. This signals institutional absorption of panic sellers, often marking the exact bottom."
    },
    {
      id: "c5-l10",
      slug: "technical-execution-checklist",
      chapterNumber: "05",
      lessonNumber: 10,
      title: "10. The Execution Checklist: Validating a High-Confluence Technical Setup",
      duration: "6 mins",
      keyConcepts: [
        "The 4-Factor Confluence Rule: S/R level + Trendline + Candlestick + Volume confirmation",
        "Pre-trade risk calculation before pressing the button",
        "Eliminating emotional impulse trades with objective rules"
      ],
      content: [
        "Trading profitability is not about being right on every single trade; it is about executing only those setups that possess an asymmetric statistical edge.",
        "Before entering any trade, run through the Institutional Execution Checklist: 1. Is the trade aligned with the Daily trend? 2. Is price reacting to a high-timeframe horizontal S/R flip? 3. Has a confirmation candle closed? 4. Does volume support the direction? 5. Is the Risk-to-Reward Ratio at least 2.5:1?",
        "If a trade setup does not meet at least 4 out of these 5 criteria, walk away. Professional trading is the art of extreme patience and disciplined selectivity."
      ],
      proTip: "Write your entry, stop loss, and take profit targets down on paper before you enter the order on the exchange. Once you are in a live position, emotion takes over; pre-commitment protects your capital."
    }
  ],
  quiz: [
    {
      question: "What is an S/R Flip in technical analysis?",
      options: [
        "When an exchange flips its order matching engine into maintenance mode",
        "When a former resistance level breaks and turns into a new support level on subsequent retests",
        "When a coin drops by 90% and then doubles in price",
        "When an investor flips their Bitcoin into a physical gold bar"
      ],
      correctIndex: 1,
      explanation: "An S/R Flip occurs when price breaks cleanly above a key resistance level, which then acts as a dynamic support floor as former short sellers cover and breakout traders buy the retest."
    },
    {
      question: "Why does Multi-Timeframe Analysis emphasize higher timeframes over lower timeframes?",
      options: [
        "Because higher timeframes have fewer colors on the chart",
        "Because higher timeframes represent the dominant institutional order flow and macro trend, filtering out noise",
        "Because cryptocurrency exchanges only allow trading on the 1-day chart",
        "Because lower timeframes use different mathematical equations for price"
      ],
      correctIndex: 1,
      explanation: "Higher timeframes (Daily and Weekly) capture the aggregate capital flows of large institutional participants. Lower timeframe moves are subordinate to higher timeframe structural trends."
    },
    {
      question: "In Volume Spread Analysis (VSA), what does a narrow-spread candle with massive volume indicate?",
      options: [
        "Complete lack of market participation",
        "Hidden institutional absorption where passive limit orders are soaking up aggressive market volume",
        "A system crash in the exchange matching engine",
        "That all traders have switched to trading fiat currencies"
      ],
      correctIndex: 1,
      explanation: "When volume is exceptionally high but price barely moves (narrow spread), a massive entity is passively absorbing all incoming aggressive market orders, signaling strong institutional accumulation or distribution."
    }
  ]
};
