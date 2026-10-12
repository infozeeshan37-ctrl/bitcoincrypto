import { CourseChapter } from "./types";

export const chapter4: CourseChapter = {
  id: "onchain-valuation-cycles",
  chapterNumber: "04",
  title: "On-Chain Valuation & Market Cycle Metrics",
  tagline: "Decode blockchain ledgers: MVRV Z-Score, Realized Cap, SOPR, NUPL, and Miner Capitulation Ribbons.",
  category: "fundamentals",
  level: "Intermediate",
  estimatedTime: "60 mins",
  accentColor: "blue",
  badge: "On-Chain Edge",
  diagramType: "mvrv",
  overview:
    "Unlike legacy equities where insider order flow is hidden, every single transaction on a public blockchain is auditable in real time. Master the institutional discipline of On-Chain Analysis: tracking investor cost basis, realized profit/loss, long-term holder accumulation, and miner distress to time macro market tops and bottoms with precision.",
  linkedTool: {
    name: "MVRV Z-Score Tracker",
    href: "/tools/macro-battles",
    actionText: "Analyze Live On-Chain Valuation →"
  },
  references: [
    { title: "Glassnode On-Chain Intelligence: Realized Capitalization & MVRV Z-Score", url: "https://insights.glassnode.com", source: "Glassnode Academy", type: "Academic" },
    { title: "CoinMetrics On-Chain Methodology & Network Data Protocols", url: "https://coinmetrics.io/research/", source: "CoinMetrics Research", type: "Primary Source" },
    { title: "Willy Woo: Bitcoin NVT Ratio & Cost Basis Multi-Cycle Models", url: "https://woobull.com/", source: "Woobull Research", type: "Primary Source" },
    { title: "LookIntoBitcoin: Cycle Top & Generational Accumulation On-Chain Metrics", url: "https://www.lookintobitcoin.com/", source: "LookIntoBitcoin", type: "Academic" }
  ],
  relatedInternalLinks: [
    { title: "DCA Multi-Asset Investment Simulator", href: "/tools/dca-simulator", badge: "Simulator", description: "Model strategic on-chain cost basis accumulation across multiple cycle pullbacks." },
    { title: "Whale Orders & Cluster Liquidity Terminal", href: "/whale-orders", badge: "Live Radar", description: "Detect large institutional entity transaction movements and exchange reserve shifts." },
    { title: "Bitcoin 30-Day Machine Learning Valuation", href: "/predictions/bitcoin", badge: "AI Valuation", description: "Compare mathematical on-chain valuation floors with short-term predictive pricing." }
  ],
  lessons: [
    {
      id: "c4-l1",
      slug: "mvrv-zscore-macro-channel",
      chapterNumber: "04",
      lessonNumber: 1,
      title: "1. MVRV Z-Score: Distinguishing Generational Accumulation from Euphoric Peaks",
      duration: "7 mins",
      keyConcepts: [
        "Market Value (spot market cap) vs Realized Value (on-chain cost basis)",
        "Standard deviation normalization (Z-score transformation)",
        "Historical extremes: Z < 0.1 for macro bottoms and Z > 6.0 for mania tops"
      ],
      content: [
        "The MVRV ratio compares the Market Capitalization of Bitcoin to its Realized Capitalization. While Market Cap reflects current marginal price multiplied by total supply, Realized Cap values each UTXO at the exact price when it was last moved on-chain.",
        "The MVRV Z-Score takes this concept further by pulling out the extreme deviations between market value and realized value, scaled by the standard deviation of market value across all historical data.",
        "When MVRV Z-Score drops below 0.1, aggregate investors are in deep underwater pain, with spot prices below average cost basis. Every single time this occurred (2012, 2015, 2018, 2020, 2022), it marked the generational bottom of the bear market."
      ],
      formula: {
        name: "MVRV Z-Score Formula",
        math: "\\text{MVRV Z-Score} = \\frac{\\text{Market Cap} - \\text{Realized Cap}}{\\sigma_{\\text{Market Cap}}}",
        explanation: "Where sigma is the standard deviation of all historical market capitalization data. Z > 6.0 indicates extreme speculative euphoria; Z < 0.1 signals structural undervaluation."
      },
      proTip: "Never try to pick the exact top tick with MVRV. When Z-Score crosses above 5.0, initiate a staged, systematic dollar-cost exit over 6 to 10 weeks to lock in generational profits."
    },
    {
      id: "c4-l2",
      slug: "realized-cap-investor-cost-basis",
      chapterNumber: "04",
      lessonNumber: 2,
      title: "2. Realized Cap: Measuring the Aggregate Capital Invested in Bitcoin",
      duration: "6 mins",
      keyConcepts: [
        "Realized Price: Realized Cap divided by Circulating Supply",
        "Cost basis of the average on-chain participant",
        "Dynamic support: Why price rarely stays below Realized Price for long"
      ],
      content: [
        "Traditional market capitalization is flawed for cryptocurrencies because it treats lost coins (such as Satoshi's estimated 1.1 million unmoved coins) as if they were bought at current market price.",
        "Realized Capitalization fixes this by summing the USD value of each coin at the time of its last on-chain transaction. It represents the true dollar capital deposited into the Bitcoin network by all investors over time.",
        "Dividing Realized Cap by circulating supply gives the Realized Price (the network cost basis). During major bear market capitulations, price dips below Realized Price for only a few weeks or months before strong institutional accumulation absorbs supply."
      ],
      formula: {
        name: "Realized Capitalization",
        math: "\\text{Realized Cap} = \\sum_{i=1}^{N} (\\text{UTXO}_i \\times P_{\\text{last moved}, i})",
        explanation: "Aggregated across all unspent transaction outputs. Dividing by circulating supply gives the network's aggregate break-even price."
      },
      proTip: "The Realized Price acts as an iron-clad macro floor. Buying whenever Bitcoin trades below its Realized Price has yielded a 100% win rate across all historical 2-year holding periods."
    },
    {
      id: "c4-l3",
      slug: "nupl-net-unrealized-profit-loss",
      chapterNumber: "04",
      lessonNumber: 3,
      title: "3. Net Unrealized Profit/Loss (NUPL): Mapping Psychological Phases of the Cycle",
      duration: "6 mins",
      keyConcepts: [
        "Relative unrealized profit vs loss across all active coin holders",
        "The 5 Psychological Zones: Capitulation, Hope, Optimism, Belief, and Euphoria",
        "Historical top threshold: NUPL > 0.75"
      ],
      content: [
        "Net Unrealized Profit/Loss (NUPL) measures the difference between Relative Unrealized Profit and Relative Unrealized Loss. It provides a direct window into the collective psychological state of the market.",
        "When NUPL is below zero (Capitulation), total market unrealized losses outweigh profits. Market participants are in despair and selling at losses—the hallmark of bear market terminal bottoms.",
        "As the market climbs through Hope (0.0 to 0.25), Optimism (0.25 to 0.50), and Belief (0.50 to 0.75), paper profits expand. When NUPL crosses above 0.75 into Euphoria, virtually every holder is sitting on massive paper gains, creating extreme vulnerability to profit taking."
      ],
      formula: {
        name: "Net Unrealized Profit/Loss",
        math: "\\text{NUPL} = \\frac{\\text{Market Cap} - \\text{Realized Cap}}{\\text{Market Cap}}",
        explanation: "Values range from < 0 (Capitulation, red zone) to > 0.75 (Euphoria, blue mania zone)."
      },
      proTip: "In a raging bull run, NUPL can stay in the Euphoria zone (>0.75) for 4 to 8 weeks. Do not panic-short immediately on entry; wait for the first bearish rollover below 0.70 to confirm institutional distribution."
    },
    {
      id: "c4-l4",
      slug: "sopr-spent-output-profit-ratio",
      chapterNumber: "04",
      lessonNumber: 4,
      title: "4. SOPR & Adjusted SOPR: Tracking Seller Profit Realization in Real Time",
      duration: "6 mins",
      keyConcepts: [
        "SOPR = Realized Value / Value at Creation",
        "SOPR = 1.0 as the critical neutral break-even pivot",
        "Adjusted SOPR (aSOPR): Filtering out noise from intra-day UTXO churn"
      ],
      content: [
        "While NUPL tracks paper (unrealized) profits, the Spent Output Profit Ratio (SOPR) tracks actual realized profit and loss from coins that are actively moving on-chain.",
        "A SOPR value greater than 1 indicates that coins moved that day were sold at a profit. A value below 1 indicates coins were sold at a loss.",
        "In a healthy bull market, dips down to SOPR = 1.0 act as formidable support. Investors refuse to sell their coins at a loss and buy the dip at their break-even level. If SOPR breaks cleanly below 1.0 and gets rejected from below on retests, a bear market has begun."
      ],
      formula: {
        name: "SOPR Calculation",
        math: "\\text{SOPR} = \\frac{P_{\\text{spent}}}{P_{\\text{created}}}",
        explanation: "A value of exactly 1.0 represents aggregate breakeven. Bull market pullbacks consistently bounce at SOPR 1.0."
      },
      proTip: "Use a 7-day or 14-day moving average of aSOPR on your daily charts. Bullish resets where aSOPR touches 1.0 and bounces provide optimal low-risk swing long entry triggers."
    },
    {
      id: "c4-l5",
      slug: "lth-sth-supply-dynamics",
      chapterNumber: "04",
      lessonNumber: 5,
      title: "5. Long-Term vs Short-Term Holders (LTH/STH): The Wealth Transfer Cycle",
      duration: "7 mins",
      keyConcepts: [
        "155-day UTXO age threshold dividing smart money from speculative traders",
        "LTH Accumulation vs Distribution regimes",
        "Short-Term Holder Cost Basis as dynamic bull market support"
      ],
      content: [
        "Glassnode on-chain research proved that coins held for more than 155 days have a statistically negligible probability of being spent. Holders of these coins are designated as Long-Term Holders (LTHs)—the smart money, institutions, and core believers.",
        "Coins younger than 155 days belong to Short-Term Holders (STHs)—the speculative retail traders and momentum chasers who buy late in bull runs and panic-sell during corrections.",
        "Market cycles are fundamentally a continuous wealth transfer: LTHs accumulate supply quietly during bear markets when STHs capitulate. As prices surge into mania, LTHs systematically distribute their coins to incoming retail STHs until supply exhaustion causes the market to collapse."
      ],
      proTip: "Bookmark the 'Short-Term Holder Realized Price' chart. Throughout a sustained macro bull run, the STH Realized Price serves as the primary dynamic support floor on every 20% to 30% correction."
    },
    {
      id: "c4-l6",
      slug: "exchange-reserves-inflows-outflows",
      chapterNumber: "04",
      lessonNumber: 6,
      title: "6. Exchange Reserves & Flow Dynamics: Spotting Supply Shock Depletions",
      duration: "6 mins",
      keyConcepts: [
        "Spot exchange balance depletion vs derivative platform deposits",
        "Whale exchange inflow spikes as early warning of impending sell pressure",
        "Netflow spikes: Dissecting OTC desk transfers vs exchange dumps"
      ],
      content: [
        "Coins stored in self-custody cold wallets cannot be instantly dumped on the market. For an investor to sell, they must deposit coins onto a centralized exchange (Coinbase, Binance, Kraken).",
        "Consequently, tracking Centralized Exchange Reserves provides vital insight into available market supply. When exchange reserves consistently decline over months, supply is being locked away into illiquid cold storage, setting up explosive upward supply shocks.",
        "Conversely, massive single-day spikes in Exchange Inflows—especially large transactions exceeding 1,000 BTC—often precede aggressive spot selling by whales and institutional miners."
      ],
      proTip: "Differentiate between spot exchange flows and derivatives exchange flows. Large inflows to derivatives platforms typically signal traders depositing margin for leveraged positioning, not necessarily spot dumping."
    },
    {
      id: "c4-l7",
      slug: "hash-ribbons-miner-capitulation",
      chapterNumber: "04",
      lessonNumber: 7,
      title: "7. Hash Ribbons & Miner Capitulation: Historically Infallible Buy Signals",
      duration: "6 mins",
      keyConcepts: [
        "30-day and 60-day moving averages of Bitcoin Network Hash Rate",
        "Miner distress: When operational costs exceed block reward revenue",
        "The capitulation crossover buy signal and historical 100% win rate"
      ],
      content: [
        "Miners have significant fixed fiat expenses (electricity contracts, hardware amortization, facility hosting). When spot prices collapse, uncompetitive miners operate at a loss, forcing them to liquidate their BTC treasury reserves and shut down mining rigs.",
        "This miner capitulation causes the 30-day moving average of Hash Rate to cross below the 60-day moving average, signaling that mining rigs are being powered down.",
        "Once weak miners are fully flushed out, hash rate recovers. When the 30-day MA crosses back above the 60-day MA alongside a 10-day price momentum recovery, the Hash Ribbon Buy Signal prints. Historically, this has marked the final bottom of every major cycle with zero false macro buy signals."
      ],
      formula: {
        name: "Hash Ribbon Capitulation Trigger",
        math: "\\text{Capitulation Regime}: \\text{SMA}_{30}(\\text{Hashrate}) < \\text{SMA}_{60}(\\text{Hashrate})",
        explanation: "The buy trigger occurs when the 30-day SMA crosses back above the 60-day SMA and the 10-day price SMA turns positive."
      },
      proTip: "Never short when Hash Ribbons are in the middle of a capitulation recovery. Even if price chops sideways for weeks, the structural sell pressure from forced miner dumping has ended."
    },
    {
      id: "c4-l8",
      slug: "puell-multiple-miner-revenue",
      chapterNumber: "04",
      lessonNumber: 8,
      title: "8. Puell Multiple: Gauging Miner Profitability & Structural Sell Pressure",
      duration: "5 mins",
      keyConcepts: [
        "Daily USD coin issuance vs 365-day moving average of issuance value",
        "Miner revenue cycles: Sub-0.5 for bottoms, Above 2.0 for tops",
        "Post-halving revenue compression dynamics"
      ],
      content: [
        "Created by David Puell, the Puell Multiple looks at the supply side of Bitcoin's economy: the miners who receive newly minted coins and must sell a portion to cover operational fiat overhead.",
        "It is calculated by dividing the daily USD value of newly minted coins by the 365-day moving average of daily issuance value.",
        "When the Puell Multiple falls below 0.5, daily miner income is less than half its historical annual average. Miners are starving and cannot sell much supply. Conversely, values above 2.0 indicate miners are earning windfall profits and aggressively selling into market strength."
      ],
      formula: {
        name: "Puell Multiple Formula",
        math: "\\text{Puell Multiple} = \\frac{\\text{Daily USD Issuance Value}}{\\text{SMA}_{365}(\\text{Daily USD Issuance Value})}",
        explanation: "Values under 0.5 highlight generational accumulation zones; values over 2.0 signal macro cycle top profit-taking windows."
      },
      proTip: "Following a halving, the Puell Multiple naturally drops because daily BTC issuance is cut in half. Adjust your expectations accordingly during post-halving transition epochs."
    },
    {
      id: "c4-l9",
      slug: "active-addresses-metcalfe-law",
      chapterNumber: "04",
      lessonNumber: 9,
      title: "9. Active Entity Growth & Metcalfe's Law: Fundamental Network Valuation",
      duration: "5 mins",
      keyConcepts: [
        "Active Entities vs Raw Addresses (clustering algorithms)",
        "Metcalfe's Law: Value is proportional to the square of connected nodes (V ~ n^2)",
        "On-Chain user growth divergences as early market signals"
      ],
      content: [
        "Financial assets are fundamentally valued by the utility and adoption of their underlying networks. For communication and monetary networks, Metcalfe's Law states that network value is proportional to the square of its active users (V = k * n^2).",
        "By using advanced on-chain entity clustering (grouping multiple addresses controlled by the same wallet software), on-chain analysts track the true number of active economic participants.",
        "When Bitcoin's price prints higher highs but active daily entities print lower highs (a bearish adoption divergence), the price rally is being fueled by speculative leverage rather than genuine user adoption, warning of an impending correction."
      ],
      formula: {
        name: "Metcalfe Network Valuation",
        math: "V_{\\text{network}} \\propto N^2",
        explanation: "Where N is the count of active transacting entities. Price expands exponentially relative to linear user adoption growth."
      },
      proTip: "Track the rate of new entity creation. A sharp acceleration in new entities entering the network is the most reliable precursor to a fresh multi-month macro bull run."
    },
    {
      id: "c4-l10",
      slug: "institutional-onchain-dashboard",
      chapterNumber: "04",
      lessonNumber: 10,
      title: "10. The Institutional On-Chain Master Dashboard: Synthesis & Cycle Timing",
      duration: "6 mins",
      keyConcepts: [
        "Constructing a multi-metric composite cycle indicator",
        "Eliminating single-indicator bias through systematic weighting",
        "Executing macro accumulation and distribution tranches"
      ],
      content: [
        "Professional crypto hedge funds never rely on a single metric. They synthesize on-chain metrics into a multi-tiered decision matrix combining MVRV Z-Score, NUPL, STH Cost Basis, Puell Multiple, and Exchange Netflows.",
        "When 4 or more core indicators confirm an undervalued regime (e.g., MVRV < 0.1, NUPL < 0, Hash Ribbons Buy, Puell < 0.5), the probability of positive 12-month returns approaches 100%.",
        "This systematic framework removes human emotion, fear, and social media panic from your trading desk, enabling you to accumulate when the crowd is paralyzed by fear and distribute when retail mania peaks."
      ],
      proTip: "Create a simple monthly scoring rubric from -5 (extreme bear capitulation) to +5 (extreme mania top). Execute pre-planned spot rebalancing whenever the composite score shifts across major threshold bands."
    }
  ],
  quiz: [
    {
      question: "What does an MVRV Z-Score below 0.1 signify in Bitcoin market cycles?",
      options: [
        "Bitcoin is extremely overvalued and about to crash by 90%",
        "Miners have taken over 90% of the nodes on the network",
        "Spot price is below aggregate investor cost basis, marking a historical macro accumulation bottom",
        "All transactions on the blockchain have been paused by core developers"
      ],
      correctIndex: 2,
      explanation: "When MVRV Z-Score drops below 0.1, the market price has fallen below the realized aggregate acquisition cost of holders, putting the majority of participants underwater and historically marking bear market bottoms."
    },
    {
      question: "How does the SOPR (Spent Output Profit Ratio) behave during healthy bull market pullbacks?",
      options: [
        "It bounces repeatedly off the 1.0 break-even line as investors refuse to sell at a loss",
        "It collapses to negative 100.0 immediately",
        "It climbs to infinity within 24 hours",
        "It stays pinned at exactly 0.0 for several months"
      ],
      correctIndex: 0,
      explanation: "In strong bull markets, dips to SOPR = 1.0 act as solid support because investors are reluctant to realize losses on their holdings and accumulate at breakeven."
    },
    {
      question: "What is the primary trigger of the Hash Ribbon Buy Signal?",
      options: [
        "When the US Treasury prints $1 trillion in physical paper cash",
        "When the 30-day moving average of Hash Rate crosses back above the 60-day moving average following miner capitulation",
        "When Ethereum switches from Proof-of-Stake to Proof-of-Work",
        "When exchange reserves increase by more than 50% in a single day"
      ],
      correctIndex: 1,
      explanation: "Hash Ribbons signal the end of miner capitulation when the short-term 30-day MA of hash rate crosses back above the 60-day MA, proving that distressed miners have completed their forced selloffs."
    }
  ]
};
