import { CourseChapter } from "./types";

export const chapter10: CourseChapter = {
  id: "risk-management-capital-preservation",
  chapterNumber: "10",
  title: "Risk Management Math & Capital Preservation",
  tagline: "Master institutional survival: Mathematical ruin models, 1% risk rule, Kelly Criterion, RRR expectancy, and position sizing.",
  category: "risk",
  level: "Advanced",
  estimatedTime: "55 mins",
  accentColor: "emerald",
  badge: "Capital Preservation",
  diagramType: "drawdown-matrix",
  overview:
    "Risk management is the single factor that separates surviving professionals from bankrupt amateurs. A trader with a 40% win rate and strict mathematical risk controls will outperform a trader with an 80% win rate who risks too much on a single trade. Master the mathematics of asymmetric drawdowns, position sizing equations, positive mathematical expectancy, and psychological discipline.",
  linkedTool: {
    name: "Position Sizer & Risk Calculator",
    href: "/tools/position-sizer",
    actionText: "Calculate Mathematical Position Size →"
  },
  references: [
    { title: "A New Interpretation of Information Rate: The Kelly Criterion", url: "https://archive.org/details/bstj35-4-917", source: "John L. Kelly Jr. (Bell System Technical Journal)", type: "Academic" },
    { title: "The Kelly Capital Growth Investment Criterion: Mathematical Proofs", url: "https://www.edwardothorp.com/", source: "Dr. Edward O. Thorp", type: "Academic" },
    { title: "The Mathematics of Money Management: Risk Analysis Techniques for Traders", url: "https://www.wiley.com/en-us/The+Mathematics+of+Money+Management-p-9780471547389", source: "Ralph Vince (John Wiley & Sons)", type: "Academic" },
    { title: "Statistical Consequences of Fat Tails: Asymmetric Payoff Mathematics", url: "https://arxiv.org/abs/2001.10488", source: "Nassim Nicholas Taleb Research", type: "Academic" }
  ],
  relatedInternalLinks: [
    { title: "Mathematical Position Sizer & Risk Tool", href: "/tools/position-sizer", badge: "Risk Engine", description: "Calculate exact contract sizing based on dollar risk and structural stop loss." },
    { title: "Profit & Compound ROI Calculator", href: "/tools/profit-calculator", badge: "Calculator", description: "Model risk-to-reward expectancy, commission impact, and compounding returns." },
    { title: "Dollar-Cost Averaging (DCA) Multi-Asset Simulator", href: "/tools/dca-simulator", badge: "Simulator", description: "Model asymmetric drawdown survival and harmonic mean advantages." }
  ],
  lessons: [
    {
      id: "c10-l1",
      slug: "mathematics-of-ruin-asymmetric-drawdown",
      chapterNumber: "10",
      lessonNumber: 1,
      title: "1. The Mathematics of Ruin: Why Asymmetric Drawdowns Destroy Accounts",
      duration: "6 mins",
      keyConcepts: [
        "The non-linear, exponential curve of required recovery gains",
        "A 50% loss requires a 100% gain; a 90% loss requires a 900% (10x) gain to break even",
        "Risk of Ruin probability models and sequence-of-returns risk"
      ],
      content: [
        "In trading, gains and losses are mathematically asymmetric. If your account begins with $10,000 and you lose 10% ($1,000), your balance is $9,000. To get back to your original $10,000, you need an 11.1% gain.",
        "However, as losses deepen, the math turns exponentially hostile: A 20% loss requires a 25% gain. A 50% loss cuts your capital in half and requires a 100% gain (doubling your money) just to break even. A 75% loss requires a 300% gain (a 4x return). An 80% loss requires a 400% gain (a 5x return). A 90% loss requires a 900% gain (a 10x return).",
        "Once a trader suffers a 60%+ drawdown, recovering through disciplined trading becomes nearly impossible. Psychological panic sets in, leading to revenge trading, excessive leverage, and total account liquidation."
      ],
      formula: {
        name: "Required Break-Even Gain Equation",
        math: "\\text{Required Recovery Gain} = \\left( \\frac{1}{1 - L} - 1 \\right) \\times 100\\%",
        explanation: "Where L is the percentage account loss in decimal form. The curve goes asymptotic toward infinity as loss approaches 100%."
      },
      proTip: "Protect your capital at all costs. Your primary job as a trader is not to make money; it is to prevent large drawdowns so you survive long enough to exploit high-probability opportunities."
    },
    {
      id: "c10-l2",
      slug: "one-percent-capital-risk-rule",
      chapterNumber: "10",
      lessonNumber: 2,
      title: "2. The 1% to 2% Capital Risk Rule: Surviving Inevitable Losing Streaks",
      duration: "6 mins",
      keyConcepts: [
        "Dollar Risk vs Position Size: The distinction that saves accounts",
        "Limiting loss on any single trade to strictly 1.0% (or max 2.0%) of total account equity",
        "Surviving a 10-trade losing streak with 90%+ of capital intact"
      ],
      content: [
        "The cornerstone rule of institutional risk management is the 1% Rule: Never risk more than 1% of your total account equity on any individual trade setup.",
        "Notice the critical distinction: This does NOT mean you only buy $100 worth of Bitcoin on a $10,000 account. It means that if your stop loss is hit, the total dollar loss to your account balance will be exactly $100 (1%).",
        "Why is 1% the mathematical magic number? Even the most successful trading algorithms and hedge funds occasionally experience a streak of 8 to 10 consecutive losses. If you risk 10% per trade, 10 consecutive losses will destroy 65% of your account. If you risk 1% per trade, 10 consecutive losses reduces your account by just 9.5%—leaving you fully capitalized to recover."
      ],
      proTip: "If your account is under $10,000, you can risk up to 1.5% or 2.0% per trade. Once your account exceeds $50,000, drop your risk to 0.75% or 1.0% per trade to protect wealth."
    },
    {
      id: "c10-l3",
      slug: "mathematical-position-sizing-formula",
      chapterNumber: "10",
      lessonNumber: 3,
      title: "3. Mathematical Position Sizing: Dollar Risk Divided by Stop Loss Distance",
      duration: "6 mins",
      keyConcepts: [
        "The core mathematical equation for determining exact contract size",
        "Adjusting position size dynamically based on chart structure width",
        "Decoupling leverage from risk: Why 10x leverage can have the exact same risk as 1x"
      ],
      content: [
        "Amateur traders pick their position size based on emotion: 'I feel really confident in this trade, so I will buy 2 BTC'. Professional traders calculate their exact position size using mathematical formulas.",
        "The formula is simple and unyielding: Position Size = Dollar Risk / Stop Loss Distance (in dollars).",
        "For example: Suppose your account equity is $10,000 and your risk rule is 1% ($100 max risk). You want to buy Bitcoin at $95,000 with a structural stop loss at $93,000. The stop loss distance is $2,000 ($95,000 - $93,000). Your mathematical position size is: $100 / $2,000 = 0.05 BTC. No matter what leverage you select on the exchange, your dollar risk is locked at exactly $100."
      ],
      formula: {
        name: "Universal Position Sizing Formula",
        math: "\\text{Position Size} = \\frac{\\text{Account Equity} \\times \\text{Risk \\%}}{|\\text{Entry Price} - \\text{Stop Loss Price}|}",
        explanation: "This formula ensures that regardless of how wide or tight your stop loss is, you lose precisely your intended dollar amount if stopped out."
      },
      proTip: "Never adjust your stop loss to fit a larger position size. Identify where the stop loss belongs based on market structure first, then calculate your position size using the formula."
    },
    {
      id: "c10-l4",
      slug: "rrr-expectancy-winrate-formula",
      chapterNumber: "10",
      lessonNumber: 4,
      title: "4. Risk-to-Reward Ratio (RRR) & Mathematical Expectancy: The 40% Win-Rate Secret",
      duration: "7 mins",
      keyConcepts: [
        "Risk-to-Reward Ratio (RRR): Potential reward divided by potential risk",
        "Breakeven win rate formula: Breakeven Win Rate = 1 / (1 + RRR)",
        "Mathematical Expectancy: The average dollar return per dollar risked"
      ],
      content: [
        "Retail traders are conditioned by society to believe that success requires an 80% or 90% score. In financial trading, aiming for a high win rate is often a trap that leads traders to hold losing trades and cut winners quickly.",
        "Consider the math: If your average trade has a 3:1 Risk-to-Reward Ratio (meaning you risk $100 to make $300), your breakeven win rate is only 25%! If you win just 40% of your trades with a 3:1 RRR, you are extraordinarily profitable.",
        "Mathematical Expectancy measures your edge: E = (Win Rate x Average Win) - (Loss Rate x Average Loss). As long as your Expectancy is positive, the law of large numbers guarantees long-term capital expansion."
      ],
      formula: {
        name: "Mathematical Expectancy Equation",
        math: "E = (W \\times R_{\\text{win}}) - (L \\times R_{\\text{loss}})",
        explanation: "Where W is win probability, L is loss probability (1 - W), and R_win / R_loss are average payoffs. A positive expectancy proves a sustainable statistical edge."
      },
      proTip: "Never take a trade setup with a Risk-to-Reward Ratio below 2:1. By enforcing a minimum 2:1 RRR across all trades, you can be wrong more than half the time and still consistently grow your account."
    },
    {
      id: "c10-l5",
      slug: "kelly-criterion-optimal-capital-allocation",
      chapterNumber: "10",
      lessonNumber: 5,
      title: "5. The Kelly Criterion: Optimal Capital Allocation Without Overbetting",
      duration: "6 mins",
      keyConcepts: [
        "John L. Kelly Jr.'s 1956 mathematical formula for optimal bet sizing",
        "Maximizing the geometric growth rate of wealth",
        "The danger of Full Kelly: Why professional traders use Fractional Kelly (Quarter Kelly)"
      ],
      content: [
        "Developed by Bell Labs scientist John Kelly in 1956, the Kelly Criterion calculates the mathematically optimal fraction of bankroll to risk on a wager given an established win rate and payoff ratio.",
        "While Full Kelly maximizes the theoretical long-term growth rate of capital, it produces extreme equity volatility and stomach-churning 50%+ drawdowns that human psychology cannot endure.",
        "Consequently, institutional quantitative desks use 'Fractional Kelly'—typically Half Kelly or Quarter Kelly (dividing the Kelly percentage by 2 or 4). This captures 75% to 85% of the optimal compounding growth rate while reducing drawdown volatility by up to 70%."
      ],
      formula: {
        name: "The Kelly Formula",
        math: "K\\% = W - \\left( \\frac{1 - W}{R} \\right)",
        explanation: "Where W is your historical win rate and R is your average reward-to-risk ratio. For trading, always use Quarter Kelly (K% / 4) to protect against unexpected regime shifts."
      },
      proTip: "If your Kelly calculation produces a negative number, stop trading immediately. A negative Kelly percentage means your trading strategy has a negative mathematical edge and will inevitably bankrupt you."
    },
    {
      id: "c10-l6",
      slug: "volatility-adjusted-atr-sizing",
      chapterNumber: "10",
      lessonNumber: 6,
      title: "6. Volatility-Adjusted Sizing: Scaling Contracts with Average True Range (ATR)",
      duration: "5 mins",
      keyConcepts: [
        "Market volatility is dynamic, not constant",
        "Equalizing dollar volatility across high-beta altcoins and low-beta Bitcoin",
        "The ATR Volatility Scalar: Sizing positions inversely to market volatility"
      ],
      content: [
        "Buying $5,000 worth of Bitcoin is not the same risk as buying $5,000 worth of a micro-cap meme token. The meme token might move 30% in an hour, while Bitcoin moves 1.5%.",
        "To build a balanced, resilient portfolio, you must equalize volatility risk across all positions using Average True Range (ATR).",
        "By sizing each position inversely proportional to its ATR, every asset in your portfolio contributes an equal dollar risk. If Solana is twice as volatile as Bitcoin, your Solana position size should be half the dollar size of your Bitcoin position."
      ],
      proTip: "Use ATR-based sizing when trading altcoins. It prevents a single volatile altcoin from wiping out all the steady gains made on your core Bitcoin swing positions."
    },
    {
      id: "c10-l7",
      slug: "stop-loss-discipline-slippage-mitigation",
      chapterNumber: "10",
      lessonNumber: 7,
      title: "7. Stop-Loss Discipline: Hard Stops vs Mental Stops & Slippage Mitigation",
      duration: "5 mins",
      keyConcepts: [
        "The fatal fallacy of the 'Mental Stop Loss'",
        "Exchange-side Stop-Market vs Stop-Limit orders",
        "Slippage risk during high-volatility flash crashes"
      ],
      content: [
        "Traders who use 'mental stop losses' tell themselves: 'If price closes below $90,000, I will manually press sell'. In reality, when price hits $90,000, human psychology takes over: hope, denial, and cognitive dissonance freeze the trader, and they hold all the way down to $75,000.",
        "Always use Hard Stop-Loss orders placed directly on the exchange server at the moment of entry. The market does not care about your feelings, but a hard stop order will ruthlessly execute and protect your capital.",
        "Understand order types: A Stop-Limit order might not fill if price gaps violently through your limit price during a flash crash. For risk protection, use a Stop-Market order—you might suffer a tiny fraction of slippage, but your exit is 100% guaranteed."
      ],
      proTip: "Never, under any circumstances, move a stop loss further away from your entry once the trade is live. Moving your stop loss wider is the definitive sign of emotional gambling."
    },
    {
      id: "c10-l8",
      slug: "managing-winners-scaling-trailing-stops",
      chapterNumber: "10",
      lessonNumber: 8,
      title: "8. Managing Winning Positions: Scaling Out, Trailing Stops & Letting Runners Run",
      duration: "6 mins",
      keyConcepts: [
        "The psychological difficulty of holding winning trades",
        "The 50/50 Scale-Out Rule: Taking partial profit at 2R and moving stop to breakeven",
        "Trailing stops behind Higher Lows to capture parabolic macro trends"
      ],
      content: [
        "Novice traders cut their winners quickly out of fear of losing paper profits, but let their losers run in hope of a reversal. To build true wealth in crypto, you must invert this behavior: cut losers immediately and let winners run.",
        "Use the 50/50 Scale-Out Rule: When your trade reaches a 2:1 Risk-to-Reward ratio (2R), take profit on 50% of your position. Simultaneously, move your stop loss on the remaining 50% to your exact entry price (breakeven).",
        "You now have a completely risk-free 'free roll' trade: even if price reverses back to your entry, you locked in a 1R net profit. You can now trail your stop loss behind key 4-Hour swing lows on the remaining 50% 'runner' to capture multi-thousand-dollar macro expansions."
      ],
      proTip: "The biggest winners in your trading career will come from that 50% runner that you let ride for weeks during a parabolic bull market trend."
    },
    {
      id: "c10-l9",
      slug: "portfolio-correlation-altcoin-beta",
      chapterNumber: "09",
      lessonNumber: 9,
      title: "9. Portfolio Correlation & Beta Exposure: The Altcoin Overconcentration Trap",
      duration: "5 mins",
      keyConcepts: [
        "Correlation matrix: Why holding 10 different altcoins is often holding 1 single trade",
        "Beta to Bitcoin: Altcoins acting as high-beta derivatives of BTC",
        "Maximum portfolio risk exposure: Capping aggregate risk at 4% to 6%"
      ],
      content: [
        "A trader might believe they are well-diversified because they own 8 different cryptocurrencies across gaming, DeFi, and AI. But when Bitcoin drops 5%, all 8 altcoins drop 15% to 25% simultaneously.",
        "In crypto, altcoin correlation to Bitcoin regularly exceeds 0.85 during market selloffs. Holding multiple altcoins is not diversification; it is simply taking on magnified, leveraged beta exposure to Bitcoin.",
        "Enforce a Portfolio Risk Cap: The sum total of dollar risk across all your open positions should never exceed 4% to 6% of your total account equity. If you have 4 open positions each risking 1%, you are at your 4% risk limit and cannot open a 5th trade until one is closed or moved to breakeven."
      ],
      proTip: "If Bitcoin looks ready to break down, do not buy altcoins, no matter how bullish the altcoin's individual chart appears. When Bitcoin sneezes, the altcoin market catches pneumonia."
    },
    {
      id: "c10-l10",
      slug: "institutional-trading-journal-sharpe-ratio",
      chapterNumber: "10",
      lessonNumber: 10,
      title: "10. The Institutional Trading Journal: Tracking Expectancy, Sharpe & Discipline",
      duration: "6 mins",
      keyConcepts: [
        "What gets measured gets managed: The professional trading journal",
        "Key performance metrics: Profit Factor, Average R-Multiple, Maximum Drawdown, Sharpe Ratio",
        "Emotional state logging: Identifying tilt triggers before they cost you capital"
      ],
      content: [
        "If you do not maintain a detailed trading journal, you are not running a trading business; you are gambling. Every elite proprietary trading desk in the world mandates daily journaling for its portfolio managers.",
        "Your journal must record: Date/Time, Asset, Direction (Long/Short), Timeframe, Strategy Setup Name, Planned Entry, Planned Stop, Planned Target, Actual Entry, Actual Exit, Realized R-Multiple, and Screenshots of the chart at entry and exit.",
        "Crucially, record your psychological and emotional state: Were you tired? Did you FOMO in because of social media? Tracking these variables allows you to calculate your Profit Factor (Total Gross Profit / Total Gross Loss) and systematically eliminate the behavioral mistakes that drain your capital."
      ],
      formula: {
        name: "Profit Factor",
        math: "\\text{Profit Factor} = \\frac{\\sum \\text{Gross Profits}}{\\sum \\text{Gross Losses}}",
        explanation: "A Profit Factor above 1.75 indicates a solid trading strategy; above 2.5 represents world-class institutional performance."
      },
      proTip: "Review your journal every Sunday evening. Identifying just one recurring mistake (like trading while sleepy or revenge trading after a loss) and eliminating it can double your net annual returns."
    }
  ],
  quiz: [
    {
      question: "Why does an 80% portfolio loss require a 400% gain to break even?",
      options: [
        "Because drawdowns are mathematically non-linear and asymmetric; as capital shrinks, the percentage gain on the remaining balance must be exponentially larger to regain the lost principal",
        "Because cryptocurrency exchanges take a 400% fee on all losing trades",
        "Because the government imposes an automatic 400% penalty on bankrupt accounts",
        "Because Bitcoin's supply automatically decreases by 80%"
      ],
      correctIndex: 0,
      explanation: "Losing 80% on a $10,000 account leaves $2,000. To recover the $8,000 loss from a $2,000 base requires a 400% gain ($2,000 x 4 = $8,000), illustrating the brutal math of asymmetric drawdowns."
    },
    {
      question: "What is the correct Position Size equation to guarantee you never risk more than your intended dollar amount?",
      options: [
        "Position Size = Account Balance x 100",
        "Position Size = Dollar Risk / Stop Loss Distance (in dollars)",
        "Position Size = 1 BTC regardless of the stop loss",
        "Position Size = Whatever leverage the exchange allows"
      ],
      correctIndex: 1,
      explanation: "Position Size = Dollar Risk / Stop Loss Distance. This mathematical formula ensures that regardless of the asset's price or where your stop loss is located, you will lose exactly your planned dollar risk if stopped out."
    },
    {
      question: "Can a trader with a 40% win rate be extraordinarily profitable in the financial markets?",
      options: [
        "No, you must have at least an 85% win rate to survive as a trader",
        "Yes, if their average winning trade is 3x to 4x larger than their average losing trade (high Risk-to-Reward Ratio), resulting in strong positive mathematical expectancy",
        "Only if they trade without any stop loss whatsoever",
        "Only during years with a Bitcoin halving"
      ],
      correctIndex: 1,
      explanation: "Win rate alone does not determine profitability. A 40% win rate with a 3:1 Risk-to-Reward Ratio generates massive long-term profitability because total gains far outweigh total losses."
    }
  ]
};
