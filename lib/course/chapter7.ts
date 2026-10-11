import { CourseChapter } from "./types";

export const chapter7: CourseChapter = {
  id: "oscillators-quantitative-divergences",
  chapterNumber: "07",
  title: "Oscillators, Indicators & Quantitative Divergences",
  tagline: "Master quantitative momentum: RSI regular & hidden divergences, MACD zero-line crosses, Bollinger squeezes, and Anchored VWAP.",
  category: "technical",
  level: "Intermediate",
  estimatedTime: "55 mins",
  accentColor: "purple",
  badge: "Quantitative Momentum",
  diagramType: "rsi-divergence",
  overview:
    "Indicators are not meant to predict the future; they are mathematical derivatives of price and volume designed to measure momentum velocity, volatility compression, and structural divergences. Master the mechanics of RSI divergences, MACD histogram cycles, Anchored VWAP benchmark anchors, and volatility-adjusted ATR stops.",
  linkedTool: {
    name: "TradingView Pro Terminal",
    href: "/tools/chart-terminal",
    actionText: "Apply Momentum Indicators on Chart Terminal →"
  },
  lessons: [
    {
      id: "c7-l1",
      slug: "rsi-momentum-velocity-thresholds",
      chapterNumber: "07",
      lessonNumber: 1,
      title: "1. Relative Strength Index (RSI 14): Momentum Velocity & Range Shifting",
      duration: "6 mins",
      keyConcepts: [
        "J. Welles Wilder's 14-period RSI mathematical formula",
        "Overbought (70) and Oversold (30) misconceptions in trending markets",
        "Bull Market Range (40 - 80) vs Bear Market Range (20 - 60) range shifting"
      ],
      content: [
        "Created by J. Welles Wilder in 1978, the Relative Strength Index (RSI) measures the speed and change of price movements on a normalized scale from 0 to 100.",
        "A common amateur mistake is blindly shorting whenever RSI crosses above 70 ('overbought'). In a powerful crypto bull run, RSI can stay pinned above 70 for weeks while price multiplies 3x in value. Overbought indicates strong buying momentum, not an automatic sell signal.",
        "Professional traders use Andrew Cardwell's Range Shifting principles: In a bull market, RSI fluctuates between 40 and 80, with pullbacks reliably finding support at 40-50. In a bear market, RSI shifts into a lower band between 20 and 60, with rallies getting rejected at 50-60."
      ],
      formula: {
        name: "Wilder's RSI Formula",
        math: "\\text{RSI} = 100 - \\left( \\frac{100}{1 + \\text{RS}} \\right), \\quad \\text{RS} = \\frac{\\text{Average Gain}_{14}}{\\text{Average Loss}_{14}}",
        explanation: "Where Average Gain and Average Loss are smoothed exponentially across 14 periods."
      },
      proTip: "Use the RSI 50 midline as a rapid trend filter. If price is above the 50 midline on the 4-Hour chart, the bulls are in mathematical control; only look for long setups."
    },
    {
      id: "c7-l2",
      slug: "rsi-regular-vs-hidden-divergences",
      chapterNumber: "07",
      lessonNumber: 2,
      title: "2. Regular vs Hidden RSI Divergences: Trend Reversal vs Continuation",
      duration: "7 mins",
      keyConcepts: [
        "Regular Bearish Divergence: Price Higher High + RSI Lower High (Reversal)",
        "Regular Bullish Divergence: Price Lower Low + RSI Higher Low (Reversal)",
        "Hidden Bullish Divergence: Price Higher Low + RSI Lower Low (Continuation)"
      ],
      content: [
        "Divergences between price action and momentum oscillators provide some of the highest-probability trading signals in technical analysis.",
        "A Regular Divergence signals a Trend Reversal: If price prints a Higher High but RSI prints a Lower High, the velocity of the buying momentum is decaying even though price crept higher. This warns that buyers are exhausted and a reversal is imminent.",
        "Conversely, Hidden Divergences signal Trend Continuation: If price prints a Higher Low (respecting trend structure) while RSI prints a Lower Low, it proves that the oscillator completely reset its momentum while price barely gave up any ground. This indicates immense underlying strength and signals immediate trend resumption."
      ],
      proTip: "Hidden Bullish Divergence in an established uptrend is far more profitable than trying to pick tops with regular bearish divergences. Always align your divergence trades with the dominant macro trend."
    },
    {
      id: "c7-l3",
      slug: "macd-histogram-zero-line-crosses",
      chapterNumber: "07",
      lessonNumber: 3,
      title: "3. MACD: Moving Average Convergence Divergence & Histogram Momentum",
      duration: "6 mins",
      keyConcepts: [
        "12 EMA minus 26 EMA (MACD Line) and 9 EMA Signal Line",
        "The Histogram: Measuring the mathematical distance between MACD and Signal",
        "Zero-line crossovers as macro momentum regime shifts"
      ],
      content: [
        "Developed by Gerald Appel, the MACD is a trend-following momentum indicator that shows the relationship between two exponential moving averages of a security's price.",
        "The MACD Line is calculated by subtracting the 26-period EMA from the 12-period EMA. The Signal Line is a 9-period EMA of the MACD Line. When the MACD line crosses above the Signal Line, bullish momentum is accelerating.",
        "The MACD Histogram plots the difference between the MACD Line and the Signal Line. When the histogram bars begin shrinking back toward the zero line (histogram tick-up or tick-down), momentum is decelerating, providing an early warning days before the actual moving averages cross."
      ],
      formula: {
        name: "MACD Formulation",
        math: "\\text{MACD Line} = \\text{EMA}_{12}(P) - \\text{EMA}_{26}(P), \\quad \\text{Signal Line} = \\text{EMA}_9(\\text{MACD Line})",
        explanation: "Histogram = MACD Line - Signal Line. A positive zero-line cross confirms strong institutional trend acceleration."
      },
      proTip: "Look for histogram divergence: when price prints a lower low but the MACD histogram prints a higher low below the zero line, aggressive selling pressure has dried up."
    },
    {
      id: "c7-l4",
      slug: "bollinger-bands-volatility-squeeze",
      chapterNumber: "07",
      lessonNumber: 4,
      title: "4. Bollinger Bands & The Volatility Squeeze: Explosive Expansion Setups",
      duration: "6 mins",
      keyConcepts: [
        "20-period SMA with upper and lower bands set at 2 standard deviations",
        "Volatility cycles: Low volatility always precedes explosive high volatility",
        "The Bollinger Squeeze: Bandwidth contracting to multi-month historical lows"
      ],
      content: [
        "Created by John Bollinger, Bollinger Bands enclose price within an envelope defined by volatility: an upper band and lower band plotted 2 standard deviations away from a 20-period simple moving average.",
        "Because standard deviation is a pure measure of volatility, the bands widen during volatile periods and contract during quiet consolidation ranges.",
        "The Bollinger Squeeze is one of the most powerful setups in crypto: when the bandwidth contracts to its narrowest level in weeks or months, volatility has been compressed like a coiled spring. An explosive directional breakout is mathematically guaranteed to follow."
      ],
      formula: {
        name: "Bollinger Bands Equation",
        math: "\\text{Upper/Lower} = \\text{SMA}_{20}(P) \\pm (2 \\times \\sigma_{20})",
        explanation: "Statistically, ~95.4% of all price action closes within the 2 standard deviation bands under normal distribution assumptions."
      },
      proTip: "Never guess the direction of a Bollinger Squeeze in advance. Wait for the first candle to close cleanly outside the bands accompanied by a surge in volume, then trade in the direction of the expansion."
    },
    {
      id: "c7-l5",
      slug: "atr-average-true-range-stop-loss",
      chapterNumber: "07",
      lessonNumber: 5,
      title: "5. Average True Range (ATR): Volatility-Adjusted Stop Loss Placement",
      duration: "5 mins",
      keyConcepts: [
        "True Range calculation accounting for overnight price gaps",
        "14-period ATR as a measure of expected daily/hourly dollar movement",
        "The ATR Multiple Rule: Placing stop losses at 1.5x to 2.0x ATR beyond support"
      ],
      content: [
        "Most retail traders fail because they use arbitrary, static stop losses (e.g., 'I will always use a 2% stop loss'). In high-volatility regimes, a 2% stop gets wiped out by normal market noise; in low-volatility regimes, a 2% stop is far too wide.",
        "Average True Range (ATR), designed by J. Welles Wilder, measures the actual volatility of an asset over the past 14 periods by evaluating the greatest distance between the current high, current low, and previous close.",
        "By setting your stop loss at an ATR multiple (such as 1.5x or 2x the 14-period ATR) below your support level, your stop is mathematically calibrated to withstand random noise while protecting your account from true structural failures."
      ],
      formula: {
        name: "True Range Equation",
        math: "\\text{TR} = \\max\\big( (H - L), |H - C_{\\text{prev}}|, |L - C_{\\text{prev}}| \\big)",
        explanation: "ATR is the exponential 14-period smoothed average of True Range, representing the asset's typical price volatility."
      },
      proTip: "When ATR is unusually high, reduce your position size; when ATR is low, you can safely scale up position size while keeping dollar risk constant."
    },
    {
      id: "c7-l6",
      slug: "vwap-anchored-vwap-avwap",
      chapterNumber: "07",
      lessonNumber: 6,
      title: "6. Anchored VWAP (AVWAP): The Institutional Benchmark of True Cost Basis",
      duration: "6 mins",
      keyConcepts: [
        "Volume-Weighted Average Price (VWAP) as institutional execution benchmark",
        "Anchoring VWAP to significant market inflection points (Halving, ETF approval, swing low)",
        "AVWAP as dynamic institutional support and resistance"
      ],
      content: [
        "Institutional asset managers and algorithmic execution algorithms do not look at simple moving averages; they are measured against the Volume-Weighted Average Price (VWAP). If an execution desk buys below VWAP, they beat the market; if they buy above VWAP, they paid a premium.",
        "While standard VWAP resets daily, Anchored VWAP (AVWAP)—championed by Brian Shannon—allows you to anchor the volume-weighted calculation to any critical historical moment: the cycle bottom, the day of a major regulatory announcement, or the start of the year.",
        "The Anchored VWAP from a major market low represents the true average dollar-weighted cost basis of all participants since that event. When price pulls back to that line, it acts as a magnet for institutional buying."
      ],
      formula: {
        name: "Anchored VWAP Formula",
        math: "\\text{AVWAP} = \\frac{\\sum (P_{\\text{typical}} \\times V)}{\\sum V}, \\quad P_{\\text{typical}} = \\frac{H + L + C}{3}",
        explanation: "Summed cumulatively starting strictly from the chosen anchor bar timestamp."
      },
      proTip: "Anchor a VWAP to the exact date of the latest Bitcoin Halving or spot ETF approval date. Watch how perfectly pullbacks respect that AVWAP line as an institutional floor."
    },
    {
      id: "c7-l7",
      slug: "stochastic-rsi-cyclical-exhaustion",
      chapterNumber: "07",
      lessonNumber: 7,
      title: "7. Stochastic RSI: Spotting Rapid Exhaustion in Ranging Consolidations",
      duration: "5 mins",
      keyConcepts: [
        "Applying the Stochastic formula to RSI values rather than price",
        "Ultra-sensitive momentum oscillator scaling between 0 and 100",
        "K and D line crossovers in overbought (>80) and oversold (<20) zones"
      ],
      content: [
        "Standard RSI can sometimes react slowly during sideways ranging markets. To solve this, Tushar Chande and Stanley Kroll created the Stochastic RSI, which calculates the Stochastic oscillator of the RSI itself.",
        "Stoch RSI measures where the current RSI value sits relative to its high-low range over the past 14 periods. Because it is an indicator of an indicator, it moves rapidly between 0 and 100.",
        "When both the %K and %D lines drop below 20 (oversold) and cross upward while price is sitting at a key horizontal support level, it provides an ultra-fast precision trigger for swing traders."
      ],
      proTip: "Only use Stoch RSI during sideways consolidation ranges. In strong trending markets, Stoch RSI produces frequent false signals by getting pinned at 100 or 0 for extended periods."
    },
    {
      id: "c7-l8",
      slug: "ema-ribbons-trend-alignment",
      chapterNumber: "07",
      lessonNumber: 8,
      title: "8. EMA Ribbons & Trend Alignment: Visualizing Multi-Period Momentum",
      duration: "5 mins",
      keyConcepts: [
        "A series of 8 to 12 EMAs (20, 25, 30, 35, 40, 45, 50, 55)",
        "Ribbon expansion: Strong institutional trend velocity",
        "Ribbon twist/compression: Trend exhaustion and consolidation"
      ],
      content: [
        "An Exponential Moving Average (EMA) Ribbon plots a series of consecutive EMAs across short-, medium-, and long-term periods on a single chart.",
        "When all moving averages are neatly stacked in numerical order (20 above 30 above 40 above 50) and fanning out with wide spacing, the market is in full trend expansion. Traders should never fight an expanding ribbon.",
        "When the ribbon compresses tightly and the lines begin twisting around each other, trend velocity has stalled, and price is preparing for either a major reversal or a fresh expansion phase."
      ],
      proTip: "During a strong bull trend, buy dips whenever the price wicks into the middle of the 4H EMA Ribbon. The ribbon acts as dynamic elastic support."
    },
    {
      id: "c7-l9",
      slug: "ichimoku-cloud-all-in-one-framework",
      chapterNumber: "07",
      lessonNumber: 9,
      title: "9. Ichimoku Kinko Hyo: Decoding Cloud Twists & Tenkan-Kijun Crosses",
      duration: "6 mins",
      keyConcepts: [
        "Tenkan-sen (Conversion Line) and Kijun-sen (Base Line)",
        "Senkou Span A & B forming the Kumo Cloud (projected 26 periods into the future)",
        "Chikou Span (Lagging Span) confirming price breakout momentum"
      ],
      content: [
        "Created by Japanese journalist Goichi Hosoda in the 1930s, Ichimoku Kinko Hyo translates to 'One Glance Equilibrium Chart'. It is a comprehensive framework that displays trend, support/resistance, and momentum simultaneously.",
        "When price is trading above the Kumo Cloud, the dominant environment is bullish. When price is below the cloud, it is bearish. When price is inside the cloud, the market is in a noisy, trendless consolidation.",
        "The ultimate bullish Ichimoku setup—known as the 'TK Cross above the Cloud'—occurs when the faster Tenkan-sen crosses above the slower Kijun-sen while price and the cloud are both ascending."
      ],
      proTip: "Watch the Kumo Cloud twist: when Senkou Span A crosses Span B 26 periods ahead, it marks a future zone of low historical resistance where price easily slices through."
    },
    {
      id: "c7-l10",
      slug: "algorithmic-confluence-scoring",
      chapterNumber: "07",
      lessonNumber: 10,
      title: "10. Algorithmic Confluence Scoring: Building a 5-Factor Technical Entry System",
      duration: "7 mins",
      keyConcepts: [
        "Eliminating indicator redundancy (using only one oscillator, one trend tool, one volume metric)",
        "The Confluence Score: Assigning objective point values to each confirmed indicator",
        "Execution rule: Minimum 4 out of 5 points required to initiate trade"
      ],
      content: [
        "The greatest pitfall for intermediate traders is 'indicator overload'—loading 10 different indicators that all measure the same underlying variable (e.g., using RSI, Stoch, and CCI simultaneously, which just repeats momentum).",
        "Instead, build an Orthogonal Confluence Scoring system using completely independent data sources: 1. Trend Direction: Price above Daily 200 SMA (+1 pt). 2. Structural Level: Price at 4H horizontal S/R flip (+1 pt). 3. Benchmark Cost: Price above Anchored VWAP (+1 pt). 4. Momentum: Bullish RSI Divergence (+1 pt). 5. Volume: Volume expansion on trigger candle (+1 pt).",
        "Only when a trade setup scores 4 or 5 out of 5 do you execute. This objective scoring system eliminates guesswork and turns your trading into a systematic, disciplined business."
      ],
      proTip: "Keep a spreadsheet of your last 50 trades with their confluence scores. You will quickly see that trades with a 5/5 confluence score generate 80%+ of your net profits."
    }
  ],
  quiz: [
    {
      question: "What does an RSI Hidden Bullish Divergence indicate in an established uptrend?",
      options: [
        "Price made a Higher Low while RSI made a Lower Low, signaling that momentum reset and the dominant uptrend is ready to resume",
        "The trading exchange has disconnected from the blockchain",
        "Price made a Lower Low while RSI made a Higher Low, signaling a market crash",
        "All momentum indicators must be immediately deleted from the chart"
      ],
      correctIndex: 0,
      explanation: "Hidden Bullish Divergence occurs when price forms a structurally sound Higher Low while RSI drops to a Lower Low, demonstrating that the oscillator reset without price giving up ground, signaling powerful trend continuation."
    },
    {
      question: "Why is Anchored VWAP (AVWAP) considered superior to standard moving averages by institutions?",
      options: [
        "Because it is calculated in Japanese Yen instead of US Dollars",
        "Because it incorporates actual volume traded at each price level starting from a specific event anchor (e.g. cycle low), revealing true average cost basis",
        "Because it eliminates the need to use a stop loss",
        "Because it only updates once every four years during the halving"
      ],
      correctIndex: 1,
      explanation: "Anchored VWAP weights price by volume from a specific user-chosen anchor point, accurately mapping the true dollar-weighted breakeven cost basis of all participating market capital."
    },
    {
      question: "What is the optimal trading rule when Bollinger Bands experience an extreme 'Squeeze'?",
      options: [
        "Immediately buy 100x leverage before any candle closes",
        "Wait for the compression to break with a decisive candle close outside the bands and volume expansion, then trade in that direction",
        "Assume the market will stay flat forever and stop trading",
        "Short the market because squeezes are always bearish"
      ],
      correctIndex: 1,
      explanation: "A Bollinger Squeeze signals severe volatility compression. The proper institutional rule is to wait for the volatility expansion to trigger with a confirmed breakout candle close and volume surge."
    }
  ]
};
