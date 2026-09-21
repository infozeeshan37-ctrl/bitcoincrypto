export interface ConceptGuide {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  lastUpdated: string;
  summary: string;
  keyTakeaways: string[];
  formula?: { name: string; equation: string; explanation: string };
  sections: {
    heading: string;
    paragraphs: string[];
    callout?: { title: string; text: string };
  }[];
  faq: { question: string; answer: string }[];
  relatedTools: { name: string; href: string; description: string }[];
}

export const conceptGuides: ConceptGuide[] = [
  {
    slug: "order-book-microstructure-and-depth",
    title: "Order Book Microstructure & Liquidity Depth: The Quantitative Mechanics of Resting Limits",
    category: "Market Microstructure",
    readTime: "9 min read",
    lastUpdated: "Sep 2026",
    summary: "A mathematical breakdown of Central Limit Order Books (CLOB), cumulative bid/ask depth walls, bid-ask spread elasticity, and how algorithmic market makers hunt resting retail liquidity.",
    keyTakeaways: [
      "Market orders consume liquidity at market prices, while limit orders provide passive liquidity and establish the resting order book depth.",
      "The bid-ask spread reflects the inventory risk and adverse selection costs incurred by automated high-frequency market makers.",
      "Slippage is non-linear: large market orders consume consecutive price tiers in the order book, creating market impact.",
      "Liquidity 'walls' are often illusory—algorithmic market makers cancel resting orders milliseconds before market price arrival (spoofing & phantom depth)."
    ],
    formula: {
      name: "Cumulative Market Impact / Slippage Formula",
      equation: "Slippage = \\frac{\\sum_{i=1}^{k} P_i \\cdot Q_i}{Q_{total}} - P_{best}",
      explanation: "Where P_i is the price of the i-th depth tier, Q_i is the quantity filled at that tier, and P_best is the initial top-of-book best bid/ask.",
    },
    sections: [
      {
        heading: "1. The Anatomy of a Central Limit Order Book (CLOB)",
        paragraphs: [
          "Every modern tier-1 cryptocurrency exchange—including Binance, Coinbase Pro, and OKX—operates on a Central Limit Order Book (CLOB) matching engine. An order book is a continuous, deterministic queue of buy and sell commitments ranked strictly by price priority, then time priority.",
          "Bids represent participants willing to buy at or below a specified price, while asks (offers) represent participants willing to sell at or above a specified price. The highest bid is the Best Bid, and the lowest ask is the Best Ask. The gap between them is the Bid-Ask Spread.",
        ],
        callout: {
          title: "Microstructure Principle",
          text: "Price cannot move higher until every single resting sell limit order at the current best ask is completely absorbed by aggressive market buying orders.",
        },
      },
      {
        heading: "2. Visualizing Market Depth & Cumulative Volume",
        paragraphs: [
          "Cumulative depth charts plot total resting buy liquidity versus total resting sell liquidity across +/- 2%, 5%, and 10% deviations from the mid-price.",
          "When cumulative bid depth exceeds ask depth by a significant margin (e.g., 2.5:1 ratio), market microstructure theory dictates an upward price pressure, as aggressive sellers require substantially more capital to push price down than buyers require to lift price up.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between Level 1, Level 2, and Level 3 order book data?",
        answer: "Level 1 provides only the top best bid and best ask prices and sizes. Level 2 provides aggregated depth across all visible price levels. Level 3 provides full granular queue data showing individual orders in the matching engine.",
      },
      {
        question: "Why do large limit walls disappear right when price touches them?",
        answer: "Market makers utilize algorithmic cancellation scripts to provide passive liquidity for rebate harvesting, but instantly pull resting bids/asks when toxic directional flow threatens to fill them.",
      },
    ],
    relatedTools: [
      { name: "L2 Order Book Depth Radar", href: "/orderbook", description: "Inspect real-time resting bid/ask limit walls and cumulative slippage across exchanges." },
      { name: "Whale Orders & Liquidity Terminal", href: "/whale-orders", description: "Track institutional block orders and dark pool resting liquidity clusters." },
    ],
  },
  {
    slug: "crypto-funding-rates-and-basis-trading",
    title: "Perpetual Funding Rates & Basis Arbitrage: Harnessing Derivatives Imbalances",
    category: "Derivatives & Quant Trading",
    readTime: "11 min read",
    lastUpdated: "Sep 2026",
    summary: "How perpetual futures maintain price parity with spot markets via periodic funding payments, and how institutional hedge funds harvest double-digit cash-and-carry basis yields without directional market risk.",
    keyTakeaways: [
      "Perpetual futures contracts have no expiration date; funding rates act as the mathematical tether forcing perps to track spot prices.",
      "Positive funding rates mean longs pay shorts (bullish leverage bias), while negative funding rates mean shorts pay longs (bearish leverage bias).",
      "Cash-and-carry basis arbitrage captures the funding spread by buying spot and shorting an equal value of perpetual contracts (delta-neutral).",
      "Extreme funding rate spikes (> +0.05% per 8h) frequently signal local cycle tops as over-leveraged long speculators face impending liquidation cascades."
    ],
    formula: {
      name: "Annualized Funding Rate Basis Yield",
      equation: "Annualized\\ Yield = Funding\\ Rate_{8h} \\times 3 \\times 365",
      explanation: "Calculates the annualized percentage yield captured by a delta-neutral basis trader holding spot and shorting perpetual futures.",
    },
    sections: [
      {
        heading: "1. The Funding Rate Mechanism Explained",
        paragraphs: [
          "Unlike traditional commodity futures that expire quarterly and settle via physical delivery or cash reconciliation, crypto perpetual swaps trade indefinitely. To prevent the perpetual contract price from drifting infinitely away from the underlying spot price, exchanges implement an 8-hour funding rate mechanism.",
          "When perps trade at a premium to spot, the funding rate turns positive, requiring long traders to transfer cash directly to short traders. This incentivizes arbitrageurs to sell perps and buy spot, compressing the premium back to zero.",
        ],
      },
      {
        heading: "2. The Delta-Neutral Cash-and-Carry Strategy",
        paragraphs: [
          "Institutional desks utilize funding rate imbalances to generate risk-free dollar yield. By purchasing 1.0 BTC in spot and simultaneously opening a 1.0 BTC short perpetual position, the trader's total portfolio delta is mathematically zero.",
          "Regardless of whether Bitcoin doubles or drops 50%, the portfolio value remains pegged to USD, while collecting the continuous 8-hour funding fee payments paid by levered market speculators.",
        ],
      },
    ],
    faq: [
      {
        question: "How often are crypto funding rates paid?",
        answer: "On most major exchanges (Binance, Bybit, OKX), funding rates are settled every 8 hours (00:00, 08:00, 16:00 UTC).",
      },
      {
        question: "Can funding rates turn negative?",
        answer: "Yes, during aggressive bear markets and panics, perpetual contracts trade at a discount to spot, causing short sellers to pay long holders.",
      },
    ],
    relatedTools: [
      { name: "Coinglass Derivatives Radar", href: "/coinglass", description: "Monitor real-time funding rates, open interest, and long/short trader ratios." },
      { name: "AI Price Prediction Suite", href: "/predictions", description: "Quantitative price projections factoring in derivatives funding bias." },
    ],
  },
  {
    slug: "dollar-cost-averaging-dca-math-and-models",
    title: "Dollar-Cost Averaging (DCA) Mathematical Models: Why Periodic Investing Outperforms Lump Sum in Volatile Regimes",
    category: "Portfolio Management",
    readTime: "8 min read",
    lastUpdated: "Sep 2026",
    summary: "An econometric comparison of Dollar-Cost Averaging (DCA), Value Averaging (VA), and Lump-Sum investing across Bitcoin's historical halving cycles.",
    keyTakeaways: [
      "DCA exploits cryptocurrency volatility by automatically purchasing more units when prices drop and fewer units when prices rise.",
      "The effective average purchase price under DCA is the Harmonic Mean, which is mathematically guaranteed to be lower than or equal to the Arithmetic Mean.",
      "Systematic DCA eliminates behavioral finance failure modes such as FOMO top buying and panic bottom selling.",
      "Dynamic Value Averaging (allocating more cash during oversold RSI/MVRV regimes) historically outperforms static DCA by 18-24%."
    ],
    formula: {
      name: "Harmonic Mean Purchase Price Formula",
      equation: "P_{avg} = \\frac{N}{\\sum_{i=1}^{N} \\frac{1}{P_i}} \\le \\frac{1}{N} \\sum_{i=1}^{N} P_i",
      explanation: "Proves that dividing total capital over equal intervals yields an average price strictly less than the arithmetic average of sampled market prices.",
    },
    sections: [
      {
        heading: "1. The Harmonic Mean Advantage",
        paragraphs: [
          "The mathematical secret behind Dollar-Cost Averaging is the Harmonic Mean. Because an investor commits a fixed dollar amount (e.g., $500 every Monday) rather than a fixed token quantity, the portfolio mathematically acquires a greater volume of tokens during market drawdowns.",
          "Over multi-year volatile cycles, this structural mechanic depresses the investor's break-even threshold significantly below the midpoint of the price channel.",
        ],
      },
    ],
    faq: [
      {
        question: "Is DCA better than Lump Sum for Bitcoin?",
        answer: "In persistent bull runs, lump sum can win by deploying capital earlier; however, in high-volatility sideways or bear-market accumulation phases, DCA significantly reduces drawdown risk and produces superior risk-adjusted Sharpe ratios.",
      },
    ],
    relatedTools: [
      { name: "Interactive DCA Simulator", href: "/tools/dca-simulator", description: "Backtest daily, weekly, and monthly DCA strategies across BTC, ETH, and SOL." },
      { name: "Quantitative Position Sizer", href: "/tools/position-sizer", description: "Calculate risk-to-reward ratios and capital allocation sizes." },
    ],
  },
  {
    slug: "cpi-inflation-crypto-volatility-correlation",
    title: "US CPI Inflation Prints & Crypto Volatility: The Macro Correlation Playbook",
    category: "Macroeconomics",
    readTime: "10 min read",
    lastUpdated: "Sep 2026",
    summary: "How Bureau of Labor Statistics (BLS) Consumer Price Index (CPI) releases trigger high-frequency volatility spikes in Bitcoin and risk assets through interest rate expectations.",
    keyTakeaways: [
      "Lower-than-expected CPI prints increase Federal Reserve interest rate cut probabilities, boosting risk asset liquidity and driving crypto rallies.",
      "Higher-than-expected CPI prints strengthen the US Dollar (DXY) and push Treasury yields higher, triggering localized crypto sell-offs.",
      "Core CPI (excluding food and energy) carries greater weight with FOMC monetary policy than headline CPI.",
      "Institutional algorithms react to BLS releases within milliseconds, creating temporary order book liquidity voids."
    ],
    formula: {
      name: "Real Interest Rate Equation (Fisher Equation)",
      equation: "Real\\ Rate = Nominal\\ Fed\\ Funds\\ Rate - Inflation\\ (CPI)",
      explanation: "When real rates decline or turn negative, capital systematically flows out of fiat cash and into non-debaseable digital assets like Bitcoin.",
    },
    sections: [
      {
        heading: "1. How Inflation Prints Transmit to Crypto Markets",
        paragraphs: [
          "Bitcoin does not trade in isolation; it trades as a high-beta gauge of global monetary conditions. When the US Consumer Price Index is published monthly, market makers instantly recalculate the implied probability of Federal Reserve interest rate hikes or cuts.",
          "Lower interest rates reduce the risk-free rate of return in US Treasuries, driving global liquidity into scarce digital assets.",
        ],
      },
    ],
    faq: [
      {
        question: "What time is US CPI data released?",
        answer: "The US Bureau of Labor Statistics releases CPI data monthly at 8:30 AM Eastern Time (12:30 UTC / 13:30 BST).",
      },
    ],
    relatedTools: [
      { name: "US CPI AI Predictor & Countdown", href: "/cpi", description: "Track neural network inflation predictions and live countdown to the next BLS release." },
      { name: "Macro & CPI News Wire", href: "/news", description: "Real-time updates on FOMC rate odds, inflation releases, and market commentary." },
    ],
  },
  {
    slug: "mvrv-z-score-onchain-cycle-tops-bottoms",
    title: "MVRV Z-Score & On-Chain Valuation: Identifying Macro Tops and Generational Bottoms",
    category: "On-Chain Analytics",
    readTime: "12 min read",
    lastUpdated: "Sep 2026",
    summary: "A quantitative examination of Market Value to Realized Value (MVRV) Z-Score, standard deviation bands, and how on-chain cost basis reveals market cycles.",
    keyTakeaways: [
      "Market Value is the current price multiplied by circulating supply; Realized Value values each UTXO at the price when it last moved on-chain.",
      "MVRV Z-Score normalizes the difference between market cap and realized cap using the historical standard deviation of market value.",
      "Z-Scores above 6.0 have historically marked euphoric macro cycle tops (2013, 2017, 2021).",
      "Z-Scores below 0.1 indicate severe market undervaluation and historical generational accumulation zones."
    ],
    formula: {
      name: "MVRV Z-Score Formula",
      equation: "Z\\text{-}Score = \\frac{Market\\ Cap - Realized\\ Cap}{\\sigma(Market\\ Cap)}",
      explanation: "Measures how many standard deviations the current market capitalization is above or below its aggregate on-chain realized cost basis.",
    },
    sections: [
      {
        heading: "1. Realized Cap: The True Cost Basis of the Network",
        paragraphs: [
          "Traditional financial markets can only calculate market capitalization based on the last traded price. In blockchain networks, public ledger transparency enables analysts to compute 'Realized Cap'—the aggregate purchase price of all circulating coins based on their on-chain movement timestamps.",
          "When Market Cap is far above Realized Cap, aggregate network participants sit on massive unrealized gains, increasing the probability of profit taking.",
        ],
      },
    ],
    faq: [
      {
        question: "What is a healthy MVRV Z-Score for buying Bitcoin?",
        answer: "MVRV Z-Scores between 0.5 and 2.5 represent healthy mid-cycle expansion where buying risk is historically low relative to reward.",
      },
    ],
    relatedTools: [
      { name: "AI Price Prediction Suite", href: "/predictions", description: "Quantitative model incorporating live MVRV Z-Score and on-chain indicators." },
      { name: "Spot Markets Terminal", href: "/markets", description: "Track real-time market capitalizations and volume distributions." },
    ],
  },
  {
    slug: "liquidation-heatmaps-and-short-squeeze-mechanics",
    title: "Liquidation Heatmaps & Short Squeezes: How Market Makers Harvest Over-Leveraged Stops",
    category: "Market Microstructure",
    readTime: "10 min read",
    lastUpdated: "Sep 2026",
    summary: "The mechanics of forced margin liquidation cascades, order book depth gaps, and how institutional market makers engineer short and long squeezes.",
    keyTakeaways: [
      "Margin liquidation occurs when a trader's margin balance falls below the maintenance margin threshold, forcing the exchange to execute an automated market order.",
      "Liquidation clusters act as liquidity magnets: market makers push price into large liquidation pools to fill their own institutional resting limit orders.",
      "A short squeeze occurs when rising prices trigger forced market buy orders from liquidated short sellers, creating vertical upward price expansion.",
      "High open interest combined with tight price consolidation signals an imminent explosive breakout."
    ],
    formula: {
      name: "Isolated Long Liquidation Price Equation",
      equation: "P_{liq} = P_{entry} \\times \\left(1 - \\frac{1}{Leverage} + Maintenance\\ Margin\\ Rate\\right)",
      explanation: "Calculates the exact price point at which an isolated leveraged position will be forcefully closed by the exchange matching engine.",
    },
    sections: [
      {
        heading: "1. Why Liquidation Clusters Act as Price Magnets",
        paragraphs: [
          "In high-leverage derivatives trading, hundreds of millions of dollars in stop-losses and liquidation levels accumulate at obvious technical support and resistance levels.",
          "Because institutional market makers require massive counterparty liquidity to enter large positions without moving the market against themselves, they deliberately drive price into these dense liquidation clusters.",
        ],
      },
    ],
    faq: [
      {
        question: "How can I avoid getting liquidated in crypto trading?",
        answer: "Maintain leverage below 3x, use isolated margin, set explicit stop-loss orders with ATR buffer zones, and never risk more than 1-2% of total portfolio equity on a single trade.",
      },
    ],
    relatedTools: [
      { name: "Coinglass Liquidation Tool", href: "/tools/liquidation-heatmap", description: "Inspect real-time liquidation clusters, open interest, and short squeeze targets." },
      { name: "Position Sizing Calculator", href: "/tools/position-sizer", description: "Calculate exact leverage parameters to stay safe from liquidation." },
    ],
  },
  {
    slug: "yield-curve-control-and-bitcoin-liquidity",
    title: "Yield Curve Control (YCC) & Bitcoin: How Sovereign Debt Refinancing Fuels Digital Scarcity",
    category: "Macroeconomics",
    readTime: "13 min read",
    lastUpdated: "Sep 2026",
    summary: "An analysis of sovereign debt roll-over traps, US Treasury duration management, bond buybacks, and why central bank liquidity interventions drive Bitcoin bull cycles.",
    keyTakeaways: [
      "When sovereign debt interest exceeds tax revenue, governments are mathematically forced to suppress borrowing yields via central bank money printing.",
      "Stealth Yield Curve Control operates by buying back long-duration bonds and issuing short-duration T-bills funded by reverse repo drainage.",
      "Artificially low real yields force institutional capital into scarce, non-debaseable monetary assets.",
      "Bitcoin's 21 million hard supply cap makes it the pure monetary sponge for global fiat debasement."
    ],
    formula: {
      name: "Fiat Debasement Equation",
      equation: "\\Delta Purchasing\\ Power = \\frac{Supply_{initial}}{Supply_{initial} + \\Delta M2\\ Expansion} - 1",
      explanation: "Demonstrates how rapid central bank balance sheet expansion dilutes the real purchasing power of unbacked fiat currency.",
    },
    sections: [
      {
        heading: "1. The Sovereign Debt Refinancing Dilemma",
        paragraphs: [
          "With global sovereign debt surpassing record percentages of GDP, central banks cannot permit long-term bond yields to trade at free-market clearing rates without causing fiscal insolvency.",
          "To keep debt servicing manageable, Treasury departments and central banks orchestrate coordinated yield suppression programs.",
        ],
      },
    ],
    faq: [
      {
        question: "Why does Yield Curve Control help Bitcoin?",
        answer: "Yield Curve Control caps bond yields while inflation remains elevated, guaranteeing negative real yields on government debt and forcing global capital into Bitcoin to preserve purchasing power.",
      },
    ],
    relatedTools: [
      { name: "Research Desk & Blog", href: "/blog", description: "Read in-depth macro essays on stealth yield curve control and global liquidity cycles." },
      { name: "AI Price Prediction Engine", href: "/predictions", description: "Macro-informed cryptocurrency price forecasting." },
    ],
  },
  {
    slug: "proof-of-useful-inference-decentralized-ai",
    title: "Proof of Useful Inference (PoUI): Building the Decentralized Compute Layer for AI Agents",
    category: "Decentralized AI",
    readTime: "11 min read",
    lastUpdated: "Sep 2026",
    summary: "How decentralized GPU compute protocols, verifiable inference consensus, and Bittensor subnets eliminate centralized AI cloud monopolies.",
    keyTakeaways: [
      "Autonomous AI agents require continuous floating-point operations per second (FLOPs) as their primary computational commodity.",
      "Proof of Useful Inference replaces arbitrary cryptographic hashing with verifiable machine learning validation.",
      "Decentralized compute networks allow GPU providers to monetize idle compute while providing developers with censorship-resistant AI inference.",
      "Crypto x AI tokenomics align economic incentives between model creators, validator nodes, and autonomous agents."
    ],
    formula: {
      name: "Decentralized Compute Cost Efficiency",
      equation: "Cost_{Decentralized} = \\frac{P_{hardware} + Energy}{Efficiency_{clustering}} \\ll Cost_{Centralized\\ Cloud}",
      explanation: "Decentralized GPU networks reduce AI inference costs by eliminating corporate cloud markups and utilizing global stranded energy.",
    },
    sections: [
      {
        heading: "1. The AI Agent Metabolic Demand",
        paragraphs: [
          "In the emerging agentic economy, millions of autonomous AI software programs will execute smart contracts, analyze order books, and write software.",
          "These agents cannot function without access to decentralized, permissionless GPU compute clusters that cannot be censored by centralized cloud monopolies.",
        ],
      },
    ],
    faq: [
      {
        question: "How does Bittensor validate AI inference?",
        answer: "Bittensor uses Yuma Consensus where specialized subnet validators evaluate the quality of responses generated by miners and distribute rewards proportionally.",
      },
    ],
    relatedTools: [
      { name: "Bittensor (TAO) Prediction", href: "/predictions/bittensor", description: "AI price forecast and on-chain valuation metrics for Bittensor." },
      { name: "Render Network Prediction", href: "/predictions/render", description: "Decentralized GPU compute price forecast." },
    ],
  },
];
