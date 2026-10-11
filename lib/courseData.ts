export interface CourseLesson {
  id: string;
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

export interface CourseModule {
  id: string;
  moduleNumber: string;
  title: string;
  tagline: string;
  category: "fundamentals" | "technical" | "microstructure" | "derivatives" | "risk";
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
}

export const courseModules: CourseModule[] = [
  {
    id: "blockchain-fundamentals",
    moduleNumber: "01",
    title: "Blockchain Architecture & Satoshi Mechanics",
    tagline: "Master digital scarcity, Proof-of-Work thermodynamics, and the 4-year halving cycle rhythm.",
    category: "fundamentals",
    level: "Beginner",
    estimatedTime: "35 mins",
    accentColor: "amber",
    badge: "Core Foundation",
    diagramType: "halving",
    overview:
      "Understand the breakthrough of decentralized consensus: how Bitcoin solves the Byzantine Generals Problem without a central authority, why digital scarcity is guaranteed by mathematics, and how the 4-year halving cycle systematically constrains supply against global liquidity expansion.",
    linkedTool: {
      name: "Dollar-Cost Averaging Simulator",
      href: "/tools/dca-simulator",
      actionText: "Simulate Halving DCA Accumulation →"
    },
    lessons: [
      {
        id: "satoshi-consensus",
        title: "1. The Byzantine Generals Problem & Cryptographic Proof",
        duration: "10 mins",
        keyConcepts: [
          "Double-spending prevention without a trusted central counterparty",
          "SHA-256 asymmetric cryptographic hashing",
          "Decentralized ledger state propagation across global peer nodes"
        ],
        content: [
          "Before Bitcoin's whitepaper in 2008, digital money was impossible without a trusted central clearinghouse because digital files can be infinitely copied and duplicated (the double-spend problem).",
          "Satoshi Nakamoto synthesized cryptographic hashing (SHA-256), peer-to-peer gossip networks, and economic incentives into Proof-of-Work (PoW). Miners spend real-world thermodynamic energy to validate blocks, creating an immutable mathematical audit trail that cannot be rewritten without controlling more than 51% of global computing hash power.",
          "Every full node independently validates every single transaction from block 0 (Genesis block in 2009) to the present tip, enforcing the monetary rules of the network without requiring trust in any government, corporation, or bank."
        ],
        formula: {
          name: "Block Hash Invalidation Cost",
          math: "P(\\text{Reorganization}) \\approx \\left(\\frac{q}{p}\\right)^z",
          explanation: "Where q is the attacker's fraction of hashpower, p is honest hashpower, and z is the number of confirmed blocks. As confirmations increase, the probability of an attack drops exponentially to zero."
        },
        proTip:
          "Never confuse a full node with a miner. Miners propose blocks; non-mining full nodes (which anyone can run on a $50 computer) validate and enforce the rules. If miners produce an invalid block, nodes reject it instantaneously."
      },
      {
        id: "halving-dynamics",
        title: "2. The 4-Year Halving Supply Shock & Digital Scarcity",
        duration: "12 mins",
        keyConcepts: [
          "The 21-million hard cap and asymptotic issuance decay",
          "210,000 block cadence (~4 years per epoch)",
          "Stock-to-Flow shift and miner breakeven economics"
        ],
        content: [
          "Bitcoin has an absolute terminal supply cap of 21,000,000 BTC written into its consensus code. Every 210,000 blocks (roughly every four calendar years), the block subsidy awarded to miners cuts in half.",
          "Issuance began at 50 BTC per block in 2009, dropped to 25 BTC in 2012, 12.5 BTC in 2016, 6.25 BTC in 2020, and 3.125 BTC in 2024. By 2140, all 21 million BTC will have been minted, and miners will rely solely on transaction fees.",
          "This programmatic supply contraction creates a predictable supply deficit. When daily newly minted supply cuts in half while structural institutional demand (via Spot ETFs, treasury accumulation, and retail adoption) remains steady or grows, market clearing prices must appreciate to restore balance."
        ],
        formula: {
          name: "Annual Supply Inflation Rate",
          math: "\\text{Inflation Rate} = \\frac{B_{\\text{reward}} \\times 52,560}{\\text{Circulating Supply}} \\times 100\\%",
          explanation: "Following the 2024 halving (3.125 BTC reward), Bitcoin's annual supply inflation dropped to ~0.83%, lower than physical gold (~1.6%), making it the hardest monetary asset in human history."
        },
        proTip:
          "Halving supply shocks do not pump prices overnight. The supply deficit accumulates cumulatively over 6 to 18 months post-halving as daily sell pressure from miners remains structurally curtailed."
      },
      {
        id: "utxo-vs-accounts",
        title: "3. UTXO Model vs Account-Based Ledgers (Bitcoin vs Ethereum)",
        duration: "13 mins",
        keyConcepts: [
          "Unspent Transaction Outputs (UTXO) cash-like privacy",
          "Account-based state machines and EVM smart contracts",
          "Concurrency, scalability tradeoffs, and security surface"
        ],
        content: [
          "Bitcoin utilizes the UTXO (Unspent Transaction Output) model. Similar to physical paper currency notes in your wallet, you do not have a single 'balance' variable; you possess discrete unspent outputs of varying denominations.",
          "When you send 0.5 BTC from a 1.0 BTC UTXO, the transaction consumes the entire 1.0 BTC note, sends 0.5 BTC to the recipient, and returns 0.4998 BTC back to a change address you control, while 0.0002 BTC goes to miners as a fee.",
          "In contrast, Ethereum operates on an Account-based model like a bank account. A global State Trie records account balances and smart contract storage. This allows Turing-complete programmable logic (DeFi, decentralized exchanges, lending pools), but increases state bloat and introduces re-entrancy smart contract risks."
        ],
        proTip:
          "Consolidate your small Bitcoin UTXOs into a single large UTXO during low-fee weekend regimes (e.g. 5-10 sat/vB) to prevent paying massive fees during bull-market fee spikes."
      }
    ],
    quiz: [
      {
        question: "What is the primary purpose of Bitcoin's programmatic 4-year halving?",
        options: [
          "To speed up the transaction confirmation speed across nodes",
          "To reduce newly issued supply by 50% every 210,000 blocks to ensure monetary scarcity",
          "To burn tokens held by inactive centralized exchanges",
          "To adjust the mining difficulty every 2,016 blocks"
        ],
        correctIndex: 1,
        explanation:
          "The halving cuts the block subsidy awarded to miners by 50% every 210,000 blocks, ensuring the 21 million supply cap is reached asymptotically."
      },
      {
        question: "How does the UTXO model differ from an account-based ledger?",
        options: [
          "UTXOs store balances like bank balances that increment or decrement directly",
          "UTXOs act like discrete physical bank notes where the entire output is consumed and change is returned",
          "UTXOs require centralized staking pools to approve transfers",
          "UTXOs can only be transferred using smart contracts"
        ],
        correctIndex: 1,
        explanation:
          "UTXOs function like discrete cash notes: an entire input is spent, outputting the recipient's amount and a new change output."
      }
    ]
  },
  {
    id: "fundamental-analysis",
    moduleNumber: "02",
    title: "Fundamental Analysis & On-Chain Macro Ratios",
    tagline: "Evaluate fair value using MVRV Z-Scores, Realized Price, Global M2, and CPI liquidity cycles.",
    category: "fundamentals",
    level: "Intermediate",
    estimatedTime: "40 mins",
    accentColor: "blue",
    badge: "Valuation Edge",
    diagramType: "mvrv",
    overview:
      "Move beyond speculative sentiment by reading direct on-chain blockchain telemetry and global macroeconomic liquidity. Learn how to pinpoint generational cycle tops and bottoms with MVRV Z-Scores, calculate true cost basis with Realized Price, and forecast crypto volatility from Federal Reserve monetary policies.",
    linkedTool: {
      name: "US CPI Macro Forecaster",
      href: "/cpi",
      actionText: "Open CPI & Macro Liquidity Radar →"
    },
    lessons: [
      {
        id: "mvrv-and-realized-cap",
        title: "1. Realized Cap & MVRV Z-Score: The Generational Cycle Compass",
        duration: "14 mins",
        keyConcepts: [
          "Market Capitalization vs Realized Capitalization",
          "MVRV Ratio: Aggregate market unrealized profit/loss",
          "Z-Score standard deviation bands identifying tops (>6.0) and bottoms (<0.1)"
        ],
        content: [
          "Market Capitalization (Current Price × Circulating Supply) is distorted by lost coins and speculative spikes. Realized Capitalization values each UTXO at the exact price it last moved on-chain, representing the true aggregate aggregate acquisition cost basis of all market participants.",
          "The MVRV Ratio (Market Value to Realized Value) divides Market Cap by Realized Cap. When MVRV is 1.0, the market is breaking even on aggregate. When MVRV is 3.5+, unrealized profits are extreme, incentivizing long-term holders to distribute.",
          "The MVRV Z-Score applies statistical standard deviation normalization. Historically, every major multi-year generational bottom occurred when MVRV Z-Score fell below 0 (undervalued bargain zone, e.g. late 2018 at $3,200, March 2020 at $4,000, and late 2022 at $16,000). Every blowoff mania top coincided with a Z-Score above 6.0 - 8.0."
        ],
        formula: {
          name: "MVRV Z-Score Formula",
          math: "\\text{Z-Score} = \\frac{\\text{Market Value} - \\text{Realized Value}}{\\sigma(\\text{Market Value})}",
          explanation: "Where Realized Value is the aggregate on-chain acquisition cost, and σ is the historical standard deviation of Market Value."
        },
        proTip:
          "When MVRV Z-Score enters the green zone (<0.15), accumulate systematically with high conviction. When it crosses above 5.5, systematically scale out capital into cash or stablecoins regardless of euphoria."
      },
      {
        id: "exchange-reserves-and-whales",
        title: "2. Exchange Reserve Inflows & Whale Wallet Netflows",
        duration: "12 mins",
        keyConcepts: [
          "Exchange balance drainage: Supply illiquidity shock",
          "Whale wallet clusters ($1,000+ BTC entities)",
          "Spot OTC desk accumulation vs centralized exchange dumping"
        ],
        content: [
          "Coins held on centralized exchanges (Binance, Coinbase, OKX) represent active liquid sell-side inventory. When exchange reserves drop persistently over months, it proves investors are withdrawing to cold storage hardware wallets for long-term holding.",
          "Conversely, massive single-day spikes in exchange reserves—especially whale deposits of 5,000+ BTC—frequently precede aggressive spot sell-offs or derivative margin liquidations.",
          "Tracking institutional custody flows (Coinbase Prime cold storage outflows and Spot ETF net creations) provides a leading indicator of institutional accumulation cycles before they reflect on retail spot price charts."
        ],
        proTip:
          "Watch exchange reserves during price pullbacks. If price drops while exchange reserves continue to hit new multi-year lows, the dip is driven by derivative paper leverage, not real spot selling—creating a high-conviction buy opportunity."
      },
      {
        id: "macro-liquidity-and-cpi",
        title: "3. Global M2 Money Supply, US CPI & Federal Reserve Liquidity",
        duration: "14 mins",
        keyConcepts: [
          "Bitcoin as the ultimate pure sensitivity gauge to Global M2",
          "Federal Reserve Quantitative Easing (QE) vs Quantitative Tightening (QT)",
          "US CPI releases, real yields, and the US Dollar Index (DXY) inverse correlation"
        ],
        content: [
          "Bitcoin is the world's most pristine macroeconomic liquidity barometer. It is unencumbered by earnings reports, corporate debt, or supply chain bottlenecks; its price responds almost directly to the rate of global fiat currency debasement.",
          "When major central banks (US Fed, ECB, PBOC, BOJ) expand Global M2 Money Supply, excess liquidity flows first into high-beta digital assets. Historically, Bitcoin's parabolic bull cycles align almost perfectly with year-over-year expansions in global central bank balance sheets.",
          "US CPI inflation prints dictate Federal Reserve interest rate policy. When CPI comes in below consensus expectations, interest rate cut expectations accelerate, driving the US Dollar Index (DXY) and bond yields lower while catapulting risk assets higher."
        ],
        proTip:
          "Track the US Dollar Index (DXY). Sustained DXY breakdowns below its 200-day moving average historically trigger the most aggressive parabolic phases of cryptocurrency bull markets."
      }
    ],
    quiz: [
      {
        question: "What does an MVRV Z-Score below 0 historically indicate for Bitcoin?",
        options: [
          "An extreme cycle top where retail investors should immediately short",
          "A generational market bottom where aggregate price is trading below investor cost basis",
          "A breakdown of the SHA-256 network difficulty algorithm",
          "That miners are earning record high transaction fee revenues"
        ],
        correctIndex: 1,
        explanation:
          "An MVRV Z-Score below 0 indicates market price is below realized on-chain acquisition cost, signaling peak capitulation and generational buy zones."
      },
      {
        question: "Why do decreasing cryptocurrency reserves on centralized exchanges indicate bullish market structure?",
        options: [
          "It shows traders are converting into fiat currency to exit the market",
          "It reduces available liquid sell inventory as assets move into long-term cold custody",
          "It forces exchanges to shut down their order books",
          "It decreases blockchain transaction confirmation times"
        ],
        correctIndex: 1,
        explanation:
          "Withdrawing crypto to private cold storage removes active sell inventory from order books, creating structural supply shortages."
      }
    ]
  },
  {
    id: "technical-analysis-core",
    moduleNumber: "03",
    title: "Technical Analysis Core — Market Structure & Price Action",
    tagline: "Read raw price action: Candlestick psychology, Break of Structure (BOS), and Supply/Demand flips.",
    category: "technical",
    level: "Beginner",
    estimatedTime: "45 mins",
    accentColor: "emerald",
    badge: "Core TA Mastery",
    diagramType: "market-structure",
    overview:
      "Strip away indicator lag and trade directly from pure market structure. Learn how to map institutional order flow through Higher Highs/Lows, identify genuine Breaks of Structure (BOS) versus liquidity traps, master Support & Resistance polarity flips, and identify high-probability Fair Value Gaps (FVGs).",
    linkedTool: {
      name: "TradingView Pro Chart Terminal",
      href: "/tools/chart-terminal",
      actionText: "Practice on Live TradingView Terminal →"
    },
    lessons: [
      {
        id: "candlestick-anatomy",
        title: "1. Candlestick Anatomy & Rejection Psychology",
        duration: "12 mins",
        keyConcepts: [
          "Open, High, Low, Close (OHLC) auction dynamics",
          "Long wicks: Institutional absorption and price rejection",
          "Full-bodied candles: High volume directional initiative"
        ],
        content: [
          "A candlestick is not just a visual shape; it is an auction battle report between aggressive buyers (bids lifting asks) and aggressive sellers (asks hitting bids) across a specific time epoch.",
          "The body reveals where consensus settled between Open and Close. The wicks (shadows) demonstrate price rejection: long lower wicks show aggressive buyers stepping in to absorb every selling limit order, rejecting lower prices and leaving trapped bears behind.",
          "Pin bars (hammer / shooting star) at key horizontal support or resistance levels show rapid rejection of prices outside value, signaling high-probability reversal setups."
        ],
        proTip:
          "Never evaluate a candle until it closes! A massive bullish engulfing candle on the 1-hour chart can reverse into a bearish shooting star pin bar in the final 5 minutes of the hour."
      },
      {
        id: "market-structure-bos-choch",
        title: "2. Market Structure: Higher Highs, BOS & Change of Character (CHoCH)",
        duration: "18 mins",
        keyConcepts: [
          "Bullish structure: Series of Higher Highs (HH) and Higher Lows (HL)",
          "Break of Structure (BOS): Trend continuation confirmation",
          "Change of Character (CHoCH): First structural warning of trend reversal"
        ],
        content: [
          "Market structure is the single most important concept in technical analysis. An uptrend is strictly defined by price creating Higher Highs (HH) and Higher Lows (HL). A downtrend is defined by Lower Lows (LL) and Lower Highs (LH).",
          "A Break of Structure (BOS) occurs when price impulsively breaks and closes beyond a previous swing high in an uptrend, confirming institutional trend continuation.",
          "A Change of Character (CHoCH) occurs when an uptrend fails to make a higher high and instead breaks and closes below the most recent Higher Low (HL). This signals that smart money is distributing and that the trend is shifting from bullish to bearish."
        ],
        formula: {
          name: "Trend Invalidation Rule",
          math: "\\text{Trend Status} = \\begin{cases} \\text{Bullish} & \\text{if } P_{\\text{close}} > \\text{Previous Swing High} \\\\ \\text{Bearish CHoCH} & \\text{if } P_{\\text{close}} < \\text{Protected Swing Low} \\end{cases}",
          explanation: "In an uptrend, the most recent swing low that generated the higher high is the 'Protected Low'. If this level breaks on a candle close, market bias immediately flips bearish."
        },
        proTip:
          "Look for market structure on high timeframes (4-hour and Daily). A 5-minute break of structure is often just noise inside a massive 4-hour bullish continuation pattern."
      },
      {
        id: "support-resistance-flips",
        title: "3. Support/Resistance Polarity Flips & Fair Value Gaps (FVG)",
        duration: "15 mins",
        keyConcepts: [
          "Resistance turning into new structural support (S/R flip)",
          "Fair Value Gaps (FVG): Imbalance 3-candle price inefficiencies",
          "Entry trigger: Confluence retest of broken resistance + FVG fill"
        ],
        content: [
          "Support and resistance levels are not single lines; they are horizontal supply and demand zones where large institutional orders rest. When price breaks through a major resistance level with high volume, that ceiling converts into a new floor (the Polarity Flip).",
          "A Fair Value Gap (FVG) occurs during an aggressive, one-sided market displacement. On a 3-candle sequence, if the high of Candle 1 does not overlap with the low of Candle 3, an unfulfilled liquidity vacuum remains in Candle 2.",
          "Markets are auction-driven and seek efficient two-sided trading. Price frequently pulls back to retest the broken resistance level and fill the Fair Value Gap before resuming the primary trend."
        ],
        proTip:
          "The highest probability trade setup in technical analysis is the 'Break, Retest & FVG Confluence': wait for resistance to break, wait patiently for price to pull back to the level, and enter only when rejection wicks confirm support has held."
      }
    ],
    quiz: [
      {
        question: "What confirms a true Break of Structure (BOS) in an uptrend?",
        options: [
          "A single wick touching the previous high without a candle close",
          "A definitive candle body close above the previous swing high",
          "An RSI reading above 70 on any timeframe",
          "A sudden increase in Twitter sentiment"
        ],
        correctIndex: 1,
        explanation:
          "Wicks alone represent liquidity probes; a full candle body close above the swing high confirms structural acceptance and trend continuation."
      },
      {
        question: "What is a 'Change of Character' (CHoCH) in market structure?",
        options: [
          "When price reaches an all-time high with low volume",
          "The first time price breaks below the previous Higher Low in an uptrend, signaling a potential trend reversal",
          "When a trader switches between dark and light themes",
          "When the funding rate switches from positive to zero"
        ],
        correctIndex: 1,
        explanation:
          "CHoCH is the initial early-warning structural shift where price breaks the protected swing low in an uptrend."
      }
    ]
  },
  {
    id: "oscillators-and-indicators",
    moduleNumber: "04",
    title: "Quantitative Indicators & Divergence Oscillators",
    tagline: "Deploy EMA Ribbons, RSI Bullish/Bearish Divergences, MACD Momentum, and Bollinger Squeezes.",
    category: "technical",
    level: "Intermediate",
    estimatedTime: "40 mins",
    accentColor: "purple",
    badge: "Oscillator Edge",
    diagramType: "rsi-divergence",
    overview:
      "Avoid the trap of 'indicator clutter' by understanding the mathematical purpose of each indicator. Master trend filtering with Exponential Moving Averages (20, 50, 200 EMA), spot hidden reversals with RSI regular & hidden divergences, measure momentum velocity with MACD histograms, and capture volatility breakouts with Bollinger Band squeezes.",
    linkedTool: {
      name: "AI Trading Bot Signals",
      href: "/tools/trading-bot",
      actionText: "Inspect Multi-Indicator Bot Signals →"
    },
    lessons: [
      {
        id: "ema-ribbons",
        title: "1. Exponential Moving Averages (EMA 20, 50, 200) & Golden Crosses",
        duration: "12 mins",
        keyConcepts: [
          "Simple Moving Average (SMA) vs Exponential Moving Average (EMA)",
          "EMA 20/50 as dynamic pullback support in strong trends",
          "The 200 EMA as the macro bull/bear boundary line",
          "Golden Cross (50 EMA crossing above 200 EMA) mechanics"
        ],
        content: [
          "Moving averages smooth out price noise. While SMAs weight all historical days equally, EMAs assign exponential weighting to the most recent price data, making them significantly faster and more responsive to real-time volatility.",
          "In a healthy bull market, the 20 EMA acts as immediate momentum support, while the 50 EMA acts as structural pull-back support. When price stays above a rising 200 EMA on the Daily timeframe, the macro regime is institutional bull territory.",
          "A 'Golden Cross' occurs when the 50-day EMA crosses above the 200-day EMA, signaling that medium-term momentum has eclipsed long-term drag. A 'Death Cross' is the inverse, warning of prolonged macro bear drawdowns."
        ],
        proTip:
          "Never short an asset when price is trading cleanly above a rising 200 EMA on the Daily chart. The trend is your most powerful risk hedge."
      },
      {
        id: "rsi-divergences",
        title: "2. RSI Divergences: Regular vs Hidden Trend Continuation",
        duration: "16 mins",
        keyConcepts: [
          "Relative Strength Index (14-period) velocity math",
          "Regular Bullish Divergence: Lower Low in price with Higher Low on RSI (Reversal)",
          "Regular Bearish Divergence: Higher High in price with Lower High on RSI (Reversal)",
          "Hidden Bullish Divergence: Higher Low in price with Lower Low on RSI (Continuation)"
        ],
        content: [
          "The Relative Strength Index (RSI) measures the internal speed and change of price movements on an index of 0 to 100. While reading >70 as 'overbought' works in sideways ranges, it is disastrous in strong bull runs where RSI can remain above 70 for weeks.",
          "The true mathematical power of RSI lies in Divergences. A Regular Bearish Divergence occurs when price prints a Higher High, but RSI prints a Lower High. This proves that despite the higher nominal price, buying velocity and momentum are exhausting—preceding a sharp correction.",
          "A Regular Bullish Divergence occurs when price prints a Lower Low, but RSI prints a Higher Low. Sellers are running out of steam, and a mean-reversion bounce is mathematically imminent.",
          "Hidden Divergences signal trend continuation: When price makes a Higher Low (bullish structure) but RSI plunges into a Lower Low, it proves the asset has reset its indicator without surrendering price ground, setting up a massive continuation rally."
        ],
        formula: {
          name: "Relative Strength Index (RSI) Formula",
          math: "\\text{RSI} = 100 - \\left[ \\frac{100}{1 + \\frac{\\text{Average Gain}}{\\text{Average Loss}}} \\right]",
          explanation: "Calculated across the preceding 14 candlesticks to quantify internal price momentum relative to historical volatility."
        },
        proTip:
          "Combine an RSI Regular Bullish Divergence with an S/R flip level for an institutional high-confluence entry. Divergence alone is a warning; structural price rejection is the trigger."
      },
      {
        id: "macd-and-bollinger",
        title: "3. MACD Momentum Histograms & Bollinger Band Volatility Squeezes",
        duration: "12 mins",
        keyConcepts: [
          "MACD line (12 EMA - 26 EMA) and Signal line (9 EMA)",
          "Histogram slope: Visualizing acceleration and deceleration",
          "Bollinger Band width contraction (Volatility Squeeze)"
        ],
        content: [
          "The Moving Average Convergence Divergence (MACD) tracks the relationship between two exponential moving averages. The histogram represents the distance between the MACD line and the 9-period Signal line.",
          "When the MACD histogram slope starts rising while still below the zero line, momentum deceleration has commenced, alerting traders to prepare for trend changes before nominal price crosses.",
          "Bollinger Bands place standard deviation bands (+/- 2σ) around a 20-period moving average. Volatility is cyclical: periods of high volatility are always followed by low volatility consolidation, and vice versa.",
          "When the Bollinger Bands pinch tightly together into a narrow corridor (a 'Squeeze'), it signals extreme volatility compression. When the price breaks outside the band with expanding volume, it triggers a powerful multi-week trend expansion."
        ],
        proTip:
          "Wait for the Bollinger Band Squeeze to break out, then confirm with MACD histogram expansion. Fake breakouts occur when price wicks outside the bands but MACD shows zero momentum confirmation."
      }
    ],
    quiz: [
      {
        question: "What constitutes a Regular Bearish RSI Divergence?",
        options: [
          "Price makes a Lower Low while RSI makes a Higher Low",
          "Price makes a Higher High while RSI makes a Lower High",
          "Price and RSI both drop below 30 simultaneously",
          "RSI stays locked exactly at 50 for 24 hours"
        ],
        correctIndex: 1,
        explanation:
          "When price reaches a Higher High but RSI prints a Lower High, price momentum is weakening, signaling an impending bearish reversal."
      },
      {
        question: "What does an extreme Bollinger Band 'Squeeze' indicate?",
        options: [
          "That volatility has died permanently and trading should cease",
          "That volatility is heavily compressed and an explosive breakout move is imminent",
          "That the exchange is running out of USDT liquidity",
          "That trading fees will be eliminated by the exchange"
        ],
        correctIndex: 1,
        explanation:
          "A Bollinger Band Squeeze indicates extreme volatility compression, which historically precedes massive directional trend breakouts."
      }
    ]
  },
  {
    id: "market-microstructure",
    moduleNumber: "05",
    title: "Market Microstructure, Level-2 Depth & Order Flow",
    tagline: "Decode Central Limit Order Books, Bid/Ask wall imbalances, CVD taker aggression, and stop-loss hunts.",
    category: "microstructure",
    level: "Advanced",
    estimatedTime: "45 mins",
    accentColor: "sky",
    badge: "Institutional Edge",
    diagramType: "orderbook",
    overview:
      "Look behind candlestick charts directly into the exchange matching engine. Master the mechanics of Central Limit Order Books (CLOB), understand how market makers spoof liquidity walls, read Cumulative Volume Delta (CVD) to spot institutional absorption, and anticipate where smart money hunts retail stop-losses.",
    linkedTool: {
      name: "Level-2 Order Book Depth Terminal",
      href: "/orderbook",
      actionText: "Launch Live Order Book & CVD Terminal →"
    },
    lessons: [
      {
        id: "clob-and-depth",
        title: "1. Central Limit Order Books (CLOB) & Bid/Ask Wall Imbalance",
        duration: "15 mins",
        keyConcepts: [
          "Limit Orders (passive liquidity) vs Market Orders (aggressive liquidity consumption)",
          "Bid/Ask Spread and price slippage mechanics",
          "Order Book Imbalance (% Bids vs % Asks) and phantom spoof walls"
        ],
        content: [
          "Every modern exchange matches orders using a Central Limit Order Book (CLOB). Limit orders rest passively in the book, providing liquidity at discrete price ticks. Market orders cross the spread and consume resting liquidity immediately.",
          "Price cannot increase by a single cent until every single sell limit order at the Best Ask is completely consumed by aggressive market buying. When large market orders exceed the available depth at the top of the book, price slips to the next tier (market slippage).",
          "Order Book Depth Imbalance measures the ratio of resting bids to resting asks within +/- 2% of the mid-price. If bid depth represents 70% of total book liquidity, institutional market makers are providing strong floor support, making downward price movement significantly more expensive."
        ],
        formula: {
          name: "Order Book Imbalance Ratio (OBI)",
          math: "\\text{OBI} = \\frac{\\sum Q_{\\text{bids}} - \\sum Q_{\\text{asks}}}{\\sum Q_{\\text{bids}} + \\sum Q_{\\text{asks}}} \\times 100\\%",
          explanation: "Values approaching +100% indicate overwhelming buy-side depth support; values approaching -100% indicate heavy overhead sell resistance."
        },
        proTip:
          "Beware of 'Phantom Walls'! Algorithmic high-frequency market makers frequently place massive 500 BTC limit orders 1% away from price to intimidate retail traders, only to cancel them milliseconds before price touches the level (spoofing)."
      },
      {
        id: "cvd-absorption",
        title: "2. Cumulative Volume Delta (CVD) & Institutional Absorption",
        duration: "16 mins",
        keyConcepts: [
          "Volume Delta = Market Buy Volume minus Market Sell Volume",
          "CVD Divergence: Aggressive sellers trapped by passive limit absorption",
          "Spot CVD vs Futures CVD delta divergences"
        ],
        content: [
          "While standard volume charts only tell you how many contracts traded, Volume Delta measures who initiated the trade: aggressive taker buyers lifting offers vs aggressive taker sellers hitting bids.",
          "Cumulative Volume Delta (CVD) sums delta continuously over a trading session. The most powerful order flow signal is CVD Absorption Divergence: when price is making a flat or higher low, but CVD is plunging into aggressive new lows.",
          "This divergence reveals that aggressive market sellers are firing massive market sell orders, but price is refusing to drop because an institutional whale is passively absorbing every sell order with massive limit bids. Once the sellers exhaust their capital, price catapults upward in an explosive short squeeze."
        ],
        proTip:
          "Always compare Spot CVD with Futures CVD. If Futures CVD is surging higher while Spot CVD is flat or falling, the rally is driven by levered paper speculators and is vulnerable to severe liquidation flushes."
      },
      {
        id: "liquidity-sweeps",
        title: "3. Liquidity Sweeps & Stop-Loss Cluster Hunting",
        duration: "14 mins",
        keyConcepts: [
          "Resting retail stop-losses as institutional exit liquidity",
          "Equal Highs (EQH) and Equal Lows (EQL) liquidity pools",
          "The 'Turtle Soup' false breakout setup"
        ],
        content: [
          "Institutional funds trade in sizes of $50M to $500M. They cannot simply hit market buy or sell buttons without causing catastrophic slippage against themselves. To fill their massive orders, they must locate areas with dense resting liquidity.",
          "Retail trading textbooks instruct traders to place stop-losses just above obvious double tops (Equal Highs - EQH) or below obvious double bottoms (Equal Lows - EQL). For institutions, these retail stop-loss clusters are pools of free liquidity.",
          "Institutions intentionally push price just beyond obvious support/resistance levels to trigger millions of dollars in stop-market orders. Once the stop orders flood the matching engine, the institution takes the other side of the trade, absorbing the volume and reversing price aggressively back into the range (a Liquidity Sweep)."
        ],
        proTip:
          "Do not place your stop-loss at obvious swing lows where everyone else does. Place your stop-loss beyond the invalidation level where the institutional thesis itself would be mathematically proven wrong."
      }
    ],
    quiz: [
      {
        question: "What is an Order Flow CVD Absorption Divergence?",
        options: [
          "When price and volume both drop to zero simultaneously",
          "When aggressive sellers push CVD sharply lower, but price holds flat because an institutional limit buyer absorbs every sell order",
          "When an exchange freezes all deposits and withdrawals",
          "When the order book spreads widen to over 5%"
        ],
        correctIndex: 1,
        explanation:
          "CVD absorption occurs when aggressive taker selling fails to lower price because large passive limit orders absorb the flow, creating high-probability reversal conditions."
      },
      {
        question: "Why do institutional market makers hunt retail stop-loss clusters?",
        options: [
          "To force exchanges into bankruptcy",
          "To obtain the deep liquidity required to fill massive institutional orders without suffering extreme slippage",
          "To reduce Ethereum gas fees",
          "To manipulate the Bitcoin mining difficulty adjustment"
        ],
        correctIndex: 1,
        explanation:
          "Large funds require massive counterparty volume to execute nine-figure positions. Triggering resting retail stops generates the necessary volume to fill their orders."
      }
    ]
  },
  {
    id: "derivatives-and-liquidations",
    moduleNumber: "06",
    title: "Derivatives, Perpetual Funding & CoinGlass Liquidations",
    tagline: "Harness 8-hour funding rates, Open Interest expansion, and CoinGlass liquidation squeeze maps.",
    category: "derivatives",
    level: "Advanced",
    estimatedTime: "45 mins",
    accentColor: "rose",
    badge: "Derivatives Edge",
    diagramType: "liquidation-cascade",
    overview:
      "Understand why derivatives and perpetual futures dictate modern cryptocurrency spot prices. Master the 8-hour funding rate mechanism, detect over-leveraged market extremes with Open Interest to Market Cap ratios, and read CoinGlass liquidation heatmaps to profit from violent long and short squeeze cascades.",
    linkedTool: {
      name: "CoinGlass Liquidation Heatmap",
      href: "/coinglass",
      actionText: "Inspect Live CoinGlass Liquidation Heatmap →"
    },
    lessons: [
      {
        id: "perps-and-funding-rates",
        title: "1. Perpetual Futures Mechanics & The 8-Hour Funding Settlement",
        duration: "15 mins",
        keyConcepts: [
          "Perpetual contracts: Futures with no expiry date",
          "The 8-Hour Funding Rate equilibrium payment",
          "Positive funding (longs pay shorts) vs Negative funding (shorts pay longs)"
        ],
        content: [
          "Traditional futures have expiry settlement dates (e.g., quarterly futures). Perpetual futures (perps) have no expiration date, allowing traders to hold levered positions indefinitely.",
          "To prevent perpetual contract prices from permanently disconnecting from the underlying spot index price, exchanges utilize the Funding Rate mechanism. Every 8 hours (at 00:00, 08:00, and 16:00 UTC), a cash settlement transfers directly between long and short traders.",
          "When funding is positive (e.g. +0.03%), perps trade at a premium to spot; aggressive longs must pay shorts to hold their positions. When funding is negative (e.g. -0.05%), perps trade at a discount; aggressive shorts must pay longs.",
          "When funding rates spike to extreme positive levels (>+0.05% per 8h, or >50% annualized APY), the market is dangerously over-leveraged on the long side, setting the stage for a violent long squeeze cascade."
        ],
        formula: {
          name: "Annualized Funding Rate APY",
          math: "\\text{Annualized APY} = \\text{Funding Rate}_{8h} \\times 3 \\times 365",
          explanation: "An 8-hour rate of +0.04% equals an annualized carry cost of +43.8% APY paid by long position holders."
        },
        proTip:
          "Institutional delta-neutral funds execute the 'Cash & Carry Arbitrage': they buy spot Bitcoin and short perpetual futures when funding is heavily positive, collecting 20-50% risk-free APY with zero directional price risk."
      },
      {
        id: "open-interest-and-coinglass",
        title: "2. Open Interest (OI) & The CoinGlass Squeeze Signal Matrix",
        duration: "15 mins",
        keyConcepts: [
          "Open Interest: Total active resting derivative capital in USD",
          "Rising Price + Rising OI = Aggressive new long momentum",
          "Rising Price + Falling OI = Short covering (weak rally)",
          "Falling Price + Rising OI = Aggressive short build-up (squeeze setup)"
        ],
        content: [
          "Open Interest (OI) represents the total number of outstanding derivative contracts that have not been settled or closed. Unlike volume which resets daily, OI tracks the total active leveraged capital parked in the market.",
          "When aggregate CoinGlass Open Interest reaches all-time highs while price consolidates in a tight volatility range, the market is a coiling spring. Huge amounts of borrowed leverage have accumulated on both sides.",
          "The most explosive setup is 'Falling Price + Rising Open Interest + Negative Funding'. This proves that bears are aggressively shorting the breakdown with heavy leverage. When price encounters a major support zone and bounces even 1%, the over-leveraged shorts are forced into stop-market buy orders, triggering a parabolic short squeeze."
        ],
        proTip:
          "Watch CoinGlass Open Interest during breakout attempts. A breakout accompanied by falling Open Interest is a fake move driven by shorts closing, not new buyers entering. It will usually retrace completely."
      },
      {
        id: "liquidation-cascades",
        title: "3. Liquidation Cascades: How Market Makers Harvest Over-Leveraged Stops",
        duration: "15 mins",
        keyConcepts: [
          "Margin liquidation mechanics and exchange liquidation engines",
          "Liquidation waterfalls: Forced market orders triggering lower tiers",
          "Reading CoinGlass Liquidation Heatmaps: Yellow/orange magnetic zones"
        ],
        content: [
          "When a trader utilizes 20x, 50x, or 100x leverage, their position has an exact mathematical liquidation price. If mark price touches that level, the exchange's risk engine takes control of the position and executes a forced market order to close it.",
          "Forced liquidations are indiscriminate market orders. When 5,000 long positions with high leverage have liquidation prices clustered between $92,000 and $91,500, a minor drop into that zone triggers all 5,000 liquidation market sell orders at once.",
          "These forced sell orders instantly consume all resting bids in the order book, driving price into the next tier of 25x and 10x liquidations, creating a self-reinforcing 'Liquidation Waterfall' crash.",
          "CoinGlass Liquidation Heatmaps visualize these exact clusters in bright yellow and orange color intensity bands. These zones act as powerful price magnets: market makers push price toward dense liquidation pools to trigger cascades and fill their counterparty orders."
        ],
        proTip:
          "Never enter trades in the middle of a liquidation cluster. Wait for the CoinGlass Liquidation Heatmap bright yellow zone to be completely swept and cleared, wait for volume delta to absorb, and enter when the squeeze runs out of fuel."
      }
    ],
    quiz: [
      {
        question: "When the 8-hour perpetual funding rate is deeply negative (-0.05%), what does it indicate?",
        options: [
          "Longs are paying shorts an exorbitant fee to hold positions",
          "Short traders are dominating perpetual futures and paying longs a fee to maintain short exposure",
          "The exchange has run out of Bitcoin to trade",
          "The spot price is trading at a premium above perpetual futures"
        ],
        correctIndex: 1,
        explanation:
          "Negative funding means perp prices are below spot index price; short traders must pay funding payments to longs, signaling extreme bearish crowded positioning and ripe short squeeze conditions."
      },
      {
        question: "How do CoinGlass Liquidation Heatmaps act as 'price magnets'?",
        options: [
          "They repel price away from liquidation clusters",
          "Market makers and algorithmic desks deliberately steer price toward high-density liquidation zones to trigger forced market orders and capture liquidity",
          "They automatically execute decentralized swaps",
          "They predict the exact block reward for Bitcoin miners"
        ],
        correctIndex: 1,
        explanation:
          "High-density liquidation clusters contain millions of dollars in forced market orders, making them prime targets for market makers seeking execution liquidity."
      }
    ]
  },
  {
    id: "risk-management-math",
    moduleNumber: "07",
    title: "Risk Management & Mathematical Capital Preservation",
    tagline: "The math of longevity: The 1-2% account rule, position sizing formulas, and drawdown recovery math.",
    category: "risk",
    level: "Beginner",
    estimatedTime: "35 mins",
    accentColor: "emerald",
    badge: "Longevity Core",
    diagramType: "drawdown-matrix",
    overview:
      "A trading strategy with an 80% win rate will still cause total bankruptcy if position sizing is flawed. Master the mathematical reality of risk: the 1% to 2% capital risk rule, exact lot sizing formulas from structural invalidation points, the exponential math of drawdown recovery, and why Dollar-Cost Averaging (DCA) harmonic mean math outperforms lump sum.",
    linkedTool: {
      name: "Institutional Position Sizer",
      href: "/tools/position-sizer",
      actionText: "Calculate Exact Position Size & Stop-Loss →"
    },
    lessons: [
      {
        id: "the-one-percent-rule",
        title: "1. The 1% - 2% Account Risk Rule & Risk-to-Reward Expectancy",
        duration: "12 mins",
        keyConcepts: [
          "Account Risk vs Position Size distinction",
          "Positive Mathematical Expectancy (Win Rate vs R:R ratio)",
          "Why a 40% win rate strategy can make you a fortune with 1:3 R:R"
        ],
        content: [
          "The most common mistake amateur traders make is risking 10% to 20% of their total account on a single idea. In probability theory, even an edge with a 65% win rate will inevitably experience a streak of 6 to 8 consecutive losing trades.",
          "The Golden Rule of quantitative risk management: Never risk more than 1.0% to 2.0% of total portfolio equity on any single trade setup. If you have a $10,000 account, your maximum allowed monetary loss if your stop-loss hits is exactly $100 (1%) to $200 (2%).",
          "Mathematical Expectancy proves that win rate alone does not determine profitability. With a systematic 1:3 Risk-to-Reward profile (risking $100 to make $300), a trader only needs a 30% win rate to achieve positive mathematical expectancy and long-term capital growth."
        ],
        formula: {
          name: "Mathematical Expectancy Formula",
          math: "E = (W \\times R) - (L \\times 1)",
          explanation: "Where W is win probability, R is reward-to-risk ratio, and L is loss probability (1 - W). If E > 0, the strategy has positive expectancy over hundreds of iterations."
        },
        proTip:
          "Never calculate position size based on how much money you want to make. Always calculate position size based on how much money you are willing to lose if your invalidation level is hit."
      },
      {
        id: "position-sizing-formula",
        title: "2. The Mathematical Position Sizing Formula",
        duration: "11 mins",
        keyConcepts: [
          "Deriving position size from account risk and stop-loss distance",
          "Volatility-adjusted position sizing using ATR",
          "Decoupling leverage from capital risk"
        ],
        content: [
          "Your position size is not an arbitrary number. It is mathematically dictated by two variables: your Account Risk Budget in dollars, and the Percentage Distance to your structural Invalidation Stop-Loss.",
          "If your account is $10,000, your risk budget is 1% ($100), and your technical stop-loss is placed 2.5% below entry, your total position size is: $100 / 0.025 = $4,000.",
          "Notice that leverage is merely a tool of capital efficiency, not a determinant of risk. A $4,000 position on a $10,000 account requires 0.4x margin (spot or low leverage). If your stop-loss was 0.5% away (scalp), your position size would be $20,000 ($100 / 0.005), requiring 2x leverage to maintain the exact same $100 dollar risk."
        ],
        formula: {
          name: "Exact Position Size Equation",
          math: "\\text{Position Size ($)} = \\frac{\\text{Account Equity} \\times \\text{Risk \\%}}{\\left|\\frac{\\text{Entry Price} - \\text{Stop-Loss Price}}{\\text{Entry Price}}\\right|}",
          explanation: "Guarantees that regardless of entry price or stop-loss distance, the maximum possible dollar loss never exceeds the intended risk budget."
        },
        proTip:
          "If your trade setup requires a stop-loss distance that results in a position size smaller than the exchange minimum, skip the trade. Do not tighten your stop into random noise just to trade a bigger size."
      },
      {
        id: "drawdown-recovery-math",
        title: "3. The Exponential Math of Drawdown Recovery & Harmonic DCA",
        duration: "12 mins",
        keyConcepts: [
          "Non-linear asymmetric recovery curve (50% loss requires 100% gain)",
          "The ruin point: An 80% loss requires a 400% gain to break even",
          "Dollar-Cost Averaging (DCA): Harmonic mean mathematical advantage"
        ],
        content: [
          "Losses are mathematically asymmetric. If you lose 10% of your account, you need an 11.1% gain to get back to even. If you lose 25%, you need a 33.3% gain. If you lose 50%, you need a 100% gain just to recover your original principal.",
          "If an account suffers an 80% drawdown (common among over-leveraged crypto traders), you must generate a staggering 400% net return simply to break even—a mathematical task that takes years and forces traders into reckless gambling behavior.",
          "Systematic Dollar-Cost Averaging (DCA) leverages the Harmonic Mean. Because you invest a fixed fiat denomination (e.g. $100/week) across volatility cycles, you mathematically buy significantly more units when price crashes and fewer units when price rallies, pulling your effective cost basis below the arithmetic mean price."
        ],
        formula: {
          name: "Drawdown Recovery Requirement",
          math: "\\text{Required Gain} = \\left( \\frac{1}{1 - D} - 1 \\right) \\times 100\\%",
          explanation: "Where D is the percentage drawdown expressed as a decimal (e.g., 0.5 for a 50% loss yields 100% required gain)."
        },
        proTip:
          "Protecting your downside is 10x more important than finding winning trades. Eliminate catastrophic drawdowns from your trading career, and compounding mathematics will take care of the rest."
      }
    ],
    quiz: [
      {
        question: "If an account suffers a 50% capital drawdown, what percentage gain is required to break even?",
        options: [
          "50% gain",
          "75% gain",
          "100% gain",
          "200% gain"
        ],
        correctIndex: 2,
        explanation:
          "If a $10,000 account drops 50% to $5,000, it must gain $5,000 on its remaining $5,000 capital, which is a 100% return."
      },
      {
        question: "With a 1:3 Risk-to-Reward ratio, what win rate is required to achieve positive mathematical expectancy?",
        options: [
          "At least 75% win rate",
          "At least 55% win rate",
          "Greater than 25% win rate",
          "Exactly 100% win rate"
        ],
        correctIndex: 2,
        explanation:
          "At 1:3 R:R, breakeven is 25% (1 / (1 + 3)). Any win rate above 25% produces positive mathematical expectancy and long-term capital growth."
      }
    ]
  }
];

export const courseGlossary = [
  { term: "Central Limit Order Book (CLOB)", category: "Microstructure", def: "The deterministic matching engine where buy and sell limit orders are queued by price and time priority." },
  { term: "Cumulative Volume Delta (CVD)", category: "Microstructure", def: "The running cumulative difference between aggressive taker market buying volume and aggressive taker market selling volume." },
  { term: "MVRV Z-Score", category: "Fundamentals", def: "An on-chain metric comparing market cap to realized acquisition cost, normalized by historical standard deviation to pinpoint cycle tops and bottoms." },
  { term: "Break of Structure (BOS)", category: "Technical", def: "A confirmed candle close breaking through a previous swing high in an uptrend or swing low in a downtrend, validating trend continuation." },
  { term: "Change of Character (CHoCH)", category: "Technical", def: "The initial break of an opposite swing point (e.g. breaking a higher low in an uptrend), providing an early warning of trend reversal." },
  { term: "Perpetual Funding Rate", category: "Derivatives", def: "Periodic 8-hour cash settlements exchanged between long and short contract holders to tether perpetual futures prices to spot index prices." },
  { term: "Liquidation Cascade", category: "Derivatives", def: "A self-reinforcing chain reaction where forced liquidation market orders trigger consecutive price drops, liquidating subsequent leverage tiers." },
  { term: "Mathematical Expectancy", category: "Risk", def: "The average expected return per trade based on historical win rate and risk-to-reward ratio." },
  { term: "Harmonic Mean", category: "Risk", def: "The mathematical average purchase price achieved through Dollar-Cost Averaging, which is always lower than or equal to the arithmetic average." },
  { term: "Fair Value Gap (FVG)", category: "Technical", def: "A 3-candle price imbalance where rapid displacement leaves an unfilled liquidity vacuum between Candle 1 and Candle 3." }
];
