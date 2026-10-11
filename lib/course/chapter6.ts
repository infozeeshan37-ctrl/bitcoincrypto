import { CourseChapter } from "./types";

export const chapter6: CourseChapter = {
  id: "market-structure-smart-money",
  chapterNumber: "06",
  title: "Market Structure & Smart Money Price Action",
  tagline: "Master institutional mechanics: BOS vs CHoCH, Order Blocks, Fair Value Gaps, Liquidity Sweeps, and OTE entries.",
  category: "technical",
  level: "Advanced",
  estimatedTime: "60 mins",
  accentColor: "emerald",
  badge: "Smart Money Concepts",
  diagramType: "market-structure",
  overview:
    "Institutional market makers do not trade off retail indicators. They trade liquidity. Master the mechanics of Market Structure: defining structural swing points, distinguishing a Break of Structure (BOS) from a Change of Character (CHoCH), pinpointing unmitigated Order Blocks and Fair Value Gaps (FVGs), and identifying engineered liquidity sweeps.",
  linkedTool: {
    name: "TradingView Pro Terminal",
    href: "/tools/chart-terminal",
    actionText: "Map Market Structure on Live Chart →"
  },
  lessons: [
    {
      id: "c6-l1",
      slug: "swing-highs-swing-lows-integrity",
      chapterNumber: "06",
      lessonNumber: 1,
      title: "1. Swing Highs & Swing Lows: Defining True Structural Points",
      duration: "6 mins",
      keyConcepts: [
        "3-candle fractal definition of a valid Swing High and Swing Low",
        "Higher Highs (HH) and Higher Lows (HL) in bullish market structure",
        "Filtering out internal minor noise from external swing structure"
      ],
      content: [
        "Before applying advanced price action concepts, you must objectively define what constitutes a structural high and low. Without objective rules, traders draw arbitrary lines and get trapped.",
        "A valid Swing High is a 3-candle fractal formation where the center candle has the highest high, flanked by a candle with a lower high to its left and a candle with a lower high to its right. A valid Swing Low has the lowest low flanked by higher lows on both sides.",
        "A bullish market structure is defined strictly by a sequence of Higher Highs (HH) and Higher Lows (HL). As long as each pullback forms a Higher Low above the previous swing low, the uptrend remains structurally intact."
      ],
      proTip: "Distinguish between Major External Structure (which defines the overall trend) and Minor Internal Structure (which forms the sub-waves inside a single leg). Always trade in the direction of the External Structure."
    },
    {
      id: "c6-l2",
      slug: "bos-break-of-structure-continuation",
      chapterNumber: "06",
      lessonNumber: 2,
      title: "2. Break of Structure (BOS): Confirming Institutional Trend Continuation",
      duration: "6 mins",
      keyConcepts: [
        "Definition of Break of Structure (BOS) in an established trend",
        "Candle Body Close vs Wick Sweep: Why wicks do not count as a BOS",
        "Protected swing lows: The invalidation level that must hold"
      ],
      content: [
        "A Break of Structure (BOS) occurs when price breaks beyond a prior major swing high in an uptrend (or below a prior major swing low in a downtrend), signaling the continuation of the dominant trend.",
        "Crucially, institutional traders require a full Candle Body Close beyond the prior swing level on the relevant timeframe. If a candle merely pierces the prior high with a wick and closes back inside, it is NOT a BOS—it is a liquidity sweep that often leads to an aggressive reversal.",
        "Each valid BOS establishes a new 'Protected Swing Low'. In an uptrend, this swing low is protected because if smart money is defending their long positions, price should not trade below it."
      ],
      proTip: "Never chase price immediately after a BOS prints. A BOS tells you the trend is continuing, but the optimal entry is to wait for the subsequent pullback into discount pricing."
    },
    {
      id: "c6-l3",
      slug: "choch-change-of-character-reversal",
      chapterNumber: "06",
      lessonNumber: 3,
      title: "3. Change of Character (CHoCH): Detecting Early Trend Reversals",
      duration: "6 mins",
      keyConcepts: [
        "Difference between BOS (continuation) and CHoCH (reversal)",
        "The failure swing: Making a Lower High before breaking the Protected Low",
        "Using lower timeframe CHoCH as early confirmation for higher timeframe entries"
      ],
      content: [
        "While a BOS confirms trend continuation, a Change of Character (CHoCH) is the first structural signal that the trend is reversing.",
        "In an uptrend, a CHoCH occurs when price fails to make a higher high, and subsequently breaks down below the most recent Protected Higher Low with a decisive candle body close.",
        "This structural shift signals that institutional order flow has transitioned from net buying to net selling. What was previously an uptrend has now printed its first Lower Low, warning traders to cease longing and prepare for short setups."
      ],
      proTip: "Look for a CHoCH on the 15-minute chart right after a 4-Hour key resistance level is tagged. This provides an ultra-early confirmation entry with a tight stop loss before the higher timeframe confirms."
    },
    {
      id: "c6-l4",
      slug: "liquidity-pools-stop-runs",
      chapterNumber: "06",
      lessonNumber: 4,
      title: "4. Liquidity Pools & Stop Runs: Understanding Where Orders Cluster",
      duration: "6 mins",
      keyConcepts: [
        "Buy-Side Liquidity (BSL) resting above swing highs",
        "Sell-Side Liquidity (SSL) resting below swing lows",
        "Why institutions need liquidity pools to fill large order volume without slippage"
      ],
      content: [
        "To buy $100 million of Bitcoin without moving the price against themselves, an institutional desk cannot just press 'market buy'. They need an equivalent pool of resting sell orders to absorb their size.",
        "Where do millions of sell orders cluster? Right below prominent swing lows, where retail traders place their stop-loss sell orders and breakout traders place sell-stop entries. This is known as Sell-Side Liquidity (SSL).",
        "Similarly, resting above every prominent swing high sits Buy-Side Liquidity (BSL)—the stop-loss orders of short sellers and breakout buy-stops. Smart money regularly drives price into these liquidity pools to fill their positions before reversing the market."
      ],
      proTip: "Stop asking 'Where will price go next?' and start asking 'Where is the largest pool of trapped retail stop losses?' Price moves toward liquidity like water flowing downhill."
    },
    {
      id: "c6-l5",
      slug: "fair-value-gaps-fvg-imbalances",
      chapterNumber: "06",
      lessonNumber: 5,
      title: "5. Fair Value Gaps (FVG) & Imbalance Inefficiencies: The Magnet Effect",
      duration: "6 mins",
      keyConcepts: [
        "3-candle formation creating an un-auctioned price void",
        "Imbalance between Candle 1 high and Candle 3 low",
        "Mitigation and rebalancing: Why price acts like a magnet to fill FVGs"
      ],
      content: [
        "Under healthy auction conditions, price is delivered efficiently: buyers and sellers interact at every tick. However, when large institutional orders enter the market with extreme aggression, price leaps rapidly in a single direction, leaving an imbalance.",
        "A Bullish Fair Value Gap (FVG) occurs across a 3-candle sequence: when the low of Candle 3 does not overlap with the high of Candle 1. The space between them represents an inefficiency where only buying was offered.",
        "Because markets seek equilibrium, these imbalances act as powerful price magnets. Algorithmic market makers frequently return to 'mitigate' (fill) the FVG before continuing the dominant trend."
      ],
      formula: {
        name: "Bullish FVG Formula",
        math: "\\text{FVG Gap} = \\text{Low}(\\text{Candle}_3) - \\text{High}(\\text{Candle}_1) > 0",
        explanation: "The Consequent Encroachment (CE) of an FVG is its exact 50% midpoint, serving as the highest-probability reaction level."
      },
      proTip: "Draw a line at the 50% midpoint (Consequent Encroachment) of any prominent 4H FVG. When price wicks into this 50% level, it offers an exceptional entry for continuation trades."
    },
    {
      id: "c6-l6",
      slug: "order-blocks-ob-footprints",
      chapterNumber: "06",
      lessonNumber: 6,
      title: "6. Order Blocks (OB): Footprints of Institutional Accumulation",
      duration: "6 mins",
      keyConcepts: [
        "The last down-candle before a violent impulse move that causes a BOS",
        "Mitigation mechanics: Institutions returning to mitigate their own drawdown",
        "High-probability Order Block validation criteria"
      ],
      content: [
        "An Order Block is the specific candle where institutional market makers accumulated or distributed massive volume right before an aggressive displacement move.",
        "A Bullish Order Block is the last bearish (down) candle before an aggressive upward impulse that creates an FVG and breaks market structure (BOS).",
        "When institutions engineered that initial buying wave, their own short hedge positions were temporarily trapped at the lows. When price pulls back to the Order Block, institutions close out those break-even positions and add aggressive longs, causing price to violently bounce."
      ],
      proTip: "An Order Block is only valid if it resulted in an energetic Break of Structure (BOS) and left behind an unmitigated Fair Value Gap. If price just slowly drifted away without momentum, it is not a valid Order Block."
    },
    {
      id: "c6-l7",
      slug: "premium-discount-fibonacci-ote",
      chapterNumber: "06",
      lessonNumber: 7,
      title: "7. Premium vs Discount Pricing: Fibonacci Optimal Trade Entry (OTE)",
      duration: "5 mins",
      keyConcepts: [
        "The 50% Equilibrium line of a structural price range",
        "Discount Zone (<50%): The only zone where institutions buy",
        "Premium Zone (>50%): The only zone where institutions sell",
        "The Optimal Trade Entry (OTE) sweet spot: 0.618 to 0.786 Fibonacci retracement"
      ],
      content: [
        "Smart money operates like any successful merchant: they aim to buy wholesale (at a discount) and sell retail (at a premium).",
        "Measure the current dealing range from the swing low to the swing high with a Fibonacci retracement tool. The 50% level represents Equilibrium. Everything above 50% is in Premium (expensive); everything below 50% is in Discount (cheap).",
        "Never buy in the Premium zone, no matter how bullish the news appears. Patiently wait for price to retrace into Discount, specifically into the Optimal Trade Entry (OTE) zone between the 61.8%, 70.5%, and 78.6% Fibonacci levels."
      ],
      formula: {
        name: "Optimal Trade Entry (OTE) Range",
        math: "\\text{OTE Zone} = [0.618, 0.705, 0.786] \\times (\\text{Swing High} - \\text{Swing Low}) + \\text{Swing Low}",
        explanation: "The 0.705 level represents the exact mathematical sweet spot for asymmetric risk-reward long entries."
      },
      proTip: "Combine an unmitigated Bullish Order Block located inside the Discount OTE zone (0.618 - 0.786). When these two concepts overlap, the setup possesses an institutional win rate exceeding 68%."
    },
    {
      id: "c6-l8",
      slug: "equal-highs-equal-lows-traps",
      chapterNumber: "06",
      lessonNumber: 8,
      title: "8. Equal Highs (EQH) & Equal Lows (EQL): Engineered Retail Traps",
      duration: "5 mins",
      keyConcepts: [
        "Why textbook 'double tops' and 'double bottoms' are engineered liquidity bait",
        "The concentration of stop losses above identical price peaks",
        "Anticipating the sweep: Trading the raid, not the bounce"
      ],
      content: [
        "Retail trading textbooks teach traders that Equal Highs (Double Tops) represent impenetrable resistance, and that Equal Lows (Double Bottoms) represent ironclad support.",
        "Smart money algorithms know this. When you see two or more clean candle wicks touching the exact same dollar price, understand that this is deliberately engineered liquidity. Retail traders place their stop losses just 10 to 20 dollars beyond that level.",
        "Institutions will intentionally push price through those Equal Highs or Equal Lows to trigger all resting stops, collect the liquidity, and instantly reverse the market in the opposite direction."
      ],
      proTip: "Whenever you spot clean Equal Highs on a 1-Hour chart, DO NOT short them. Target them as your take-profit level for a long trade, because price is almost guaranteed to sweep through them."
    },
    {
      id: "c6-l9",
      slug: "inducement-liquidity-sweeps-turtle-soup",
      chapterNumber: "06",
      lessonNumber: 9,
      title: "9. Inducement & Liquidity Sweeps: Trading the 'Turtle Soup' Setup",
      duration: "6 mins",
      keyConcepts: [
        "Inducement: Minor swing highs/lows designed to tempt early traders into the market",
        "The Turtle Soup setup: Piercing a key level with a wick and closing immediately back inside",
        "Execution timing: Entering on the candle close after the sweep"
      ],
      content: [
        "Inducement is a minor structural high or low created by market makers to induce retail traders into opening positions too early, before the true institutional liquidity pool has been reached.",
        "The classic 'Turtle Soup' setup (popularized by Linda Raschke and integrated into Smart Money Concepts) occurs when price violently sweeps beyond a 20-day high or low, runs all resting stops, but fails to maintain acceptance.",
        "The key confirmation is seeing the candle pierce the level with a wick and close back inside the prior range on the higher timeframe. This proves that there were no genuine aggressive buyers at higher prices—only passive absorption."
      ],
      proTip: "When you identify a Turtle Soup sweep of a key swing low, place your buy limit order immediately upon the close of the rejection candle, with your stop loss just a few ticks below the sweep wick."
    },
    {
      id: "c6-l10",
      slug: "complete-smart-money-playbook",
      chapterNumber: "06",
      lessonNumber: 10,
      title: "10. The Smart Money Execution Playbook: A Step-by-Step Trade Walkthrough",
      duration: "7 mins",
      keyConcepts: [
        "The 5-Step Smart Money Algorithm: Context -> Liquidity Sweep -> CHoCH -> Retest of FVG/OB -> Execution",
        "Targeting opposing Buy-Side or Sell-Side Liquidity for minimum 3:1 RRR",
        "Trade management: Moving stops to breakeven after the first internal BOS"
      ],
      content: [
        "Let us tie every concept together into a concrete institutional trade plan: Step 1 (Context): Identify that the 4-Hour chart is bullish, with a sequence of valid BOS structures.",
        "Step 2 (Liquidity Raid): Price pulls back into Discount territory and sweeps Sell-Side Liquidity below a set of Equal Lows into an unmitigated 4H Bullish Order Block.",
        "Step 3 (Lower Timeframe Shift): Drop down to the 15-minute chart and wait for a 15m Change of Character (CHoCH) with a full candle body close, leaving behind a 15m Fair Value Gap.",
        "Step 4 (Execution): Set a limit buy order at the 50% midpoint of that 15m FVG, with the stop loss placed 5 pips below the sweep low.",
        "Step 5 (Target): Set your take-profit target at the opposing 4H Buy-Side Liquidity resting above previous swing highs, capturing an asymmetric 3:1 to 5:1 Risk-to-Reward ratio."
      ],
      proTip: "Once price moves in your favor and prints a new 15m BOS, move your stop loss to break-even. Never let a trade that reached 2R become a losing trade."
    }
  ],
  quiz: [
    {
      question: "What is the critical distinction between a Break of Structure (BOS) and a liquidity sweep?",
      options: [
        "A BOS requires a full candle body close beyond the prior swing level, whereas a sweep merely pokes through with a wick and closes back inside",
        "A BOS only happens on weekends when exchanges are closed",
        "A liquidity sweep always causes the entire blockchain to freeze",
        "There is no difference; both terms mean the exact same thing"
      ],
      correctIndex: 0,
      explanation: "A true BOS requires institutional commitment demonstrated by a decisive candle body close past the swing level. A wick beyond the level that closes back inside is a liquidity raid (sweep)."
    },
    {
      question: "What is a Fair Value Gap (FVG)?",
      options: [
        "A gap in stock prices between the New York and London stock exchanges",
        "A 3-candle imbalance where the space between the high of Candle 1 and low of Candle 3 represents an inefficiency that acts as a price magnet",
        "A government subsidy paid to cryptocurrency miners",
        "A software error in the TradingView charting interface"
      ],
      correctIndex: 1,
      explanation: "An FVG is a 3-candle price imbalance created by aggressive one-sided order flow. The un-auctioned void acts as an equilibrium magnet that price often returns to mitigate."
    },
    {
      question: "Where does institutional 'Smart Money' look to buy in an established dealing range?",
      options: [
        "In the Premium zone above the 50% equilibrium line",
        "At the exact all-time high of the coin",
        "In the Discount zone below the 50% equilibrium line, particularly at the 0.618 - 0.786 OTE Fibonacci retracement",
        "Only when retail sentiment reaches maximum extreme greed"
      ],
      correctIndex: 2,
      explanation: "Smart money operates on wholesale principles: buying exclusively at a discount (below 50% of the range) and selling at a premium (above 50%), focusing on the 0.618 - 0.786 OTE zone."
    }
  ]
};
