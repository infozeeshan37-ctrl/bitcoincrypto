import { CourseChapter } from "./types";

export const chapter9: CourseChapter = {
  id: "derivatives-funding-liquidations",
  chapterNumber: "09",
  title: "Derivatives, Perpetual Funding & CoinGlass Liquidations",
  tagline: "Master institutional leverage: Perpetual funding rates, Open Interest (OI), CoinGlass heatmaps, and squeeze cascades.",
  category: "derivatives",
  level: "Advanced",
  estimatedTime: "60 mins",
  accentColor: "rose",
  badge: "Derivatives Matrix",
  diagramType: "liquidation-cascade",
  overview:
    "Over 75% of daily cryptocurrency trading volume takes place in derivatives markets rather than spot. Master the mechanics of Perpetual Futures: how 8-hour funding rates anchor perp contracts to spot prices, how Open Interest (OI) measures systemic leverage, how CoinGlass liquidation heatmaps reveal institutional liquidity magnets, and how to profit from forced liquidation cascades.",
  linkedTool: {
    name: "CoinGlass Liquidation Heatmap",
    href: "/tools/macro-battles",
    actionText: "View Live Liquidation Heatmaps →"
  },
  lessons: [
    {
      id: "c9-l1",
      slug: "perpetual-futures-funding-mechanics",
      chapterNumber: "09",
      lessonNumber: 1,
      title: "1. Perpetual Futures Mechanics: How Funding Rates Anchor Price Without Expiry",
      duration: "7 mins",
      keyConcepts: [
        "Invention of Perpetual Swaps by BitMEX (Arthur Hayes) in 2016",
        "The 8-hour funding rate mechanism: Peer-to-peer cash flow settlement",
        "Premium Index: Mark Price vs Index Price differential"
      ],
      content: [
        "In traditional finance, futures contracts have a fixed expiration date (quarterly or monthly). As expiration approaches, futures prices naturally converge to the spot price.",
        "In crypto, the dominant instrument is the Perpetual Swap (Perp)—a futures contract that never expires. But without an expiration date, what prevents perpetual futures from trading at $150,000 when spot Bitcoin is only $95,000?",
        "The answer is the Funding Rate: an automatic, peer-to-peer interest payment exchanged between long and short traders every 8 hours. When perp prices trade above spot (positive premium), longs must pay shorts a percentage fee. This economic penalty incentivizes longs to close and shorts to open, forcing the perp price back down in line with spot."
      ],
      formula: {
        name: "Funding Rate Cash Flow",
        math: "\\text{Funding Fee} = \\text{Position Size} \\times \\text{Funding Rate}",
        explanation: "Exchanged directly between traders every 8 hours (00:00, 08:00, 16:00 UTC). When funding is positive, longs pay shorts; when negative, shorts pay longs."
      },
      proTip: "Never hold a massive leveraged long position right before funding settlement if the funding rate is exorbitantly positive (+0.1% or higher). You will bleed thousands of dollars in financing fees every single day."
    },
    {
      id: "c9-l2",
      slug: "open-interest-leverage-buildup",
      chapterNumber: "09",
      lessonNumber: 2,
      title: "2. Open Interest (OI): Tracking Capital Inflow & Systemic Leverage",
      duration: "6 mins",
      keyConcepts: [
        "Open Interest: The total number of open, unsettled derivative contracts",
        "Price Up + OI Up = Healthy, aggressive new capital entering the trend",
        "Price Up + OI Down = Short covering rally (fragile, prone to exhaustion)",
        "OI at all-time highs as a precursor to violent market flushes"
      ],
      content: [
        "Volume measures the total contracts traded over a given time, but Open Interest (OI) measures the total active contracts currently open on exchange balance sheets.",
        "When price is rising and OI is rising rapidly, new money is entering the market aggressively, opening fresh long positions. The trend has strong fuel behind it.",
        "However, when OI climbs to astronomical multi-month records while price moves sideways in a tight consolidation, the market is over-leveraged like a powder keg. A sudden 2% move in either direction will trigger a massive chain-reaction liquidation cascade."
      ],
      formula: {
        name: "Open Interest Matrix",
        math: "\\begin{aligned} \\Delta P > 0, \\Delta \\text{OI} > 0 &\\implies \\text{Aggressive New Longs (Bullish)} \\\\ \\Delta P > 0, \\Delta \\text{OI} < 0 &\\implies \\text{Short Covering (Fragile)} \\\\ \\Delta P < 0, \\Delta \\text{OI} > 0 &\\implies \\text{Aggressive New Shorts (Bearish)} \\\\ \\Delta P < 0, \\Delta \\text{OI} < 0 &\\implies \\text{Long Liquidation Flush (Capitulation)} \\end{aligned}",
        explanation: "The four universal regimes of derivatives market dynamics."
      },
      proTip: "When aggregate Bitcoin Open Interest exceeds 3.5% of total Bitcoin market cap, systemic leverage is dangerously high. Tighten your stop losses—a violent 5% to 8% wick is imminent."
    },
    {
      id: "c9-l3",
      slug: "funding-rate-heatmap-contrarian-signals",
      chapterNumber: "09",
      lessonNumber: 3,
      title: "3. The Funding Rate Heatmap: Extreme Regimes as Contrarian Indicators",
      duration: "6 mins",
      keyConcepts: [
        "Annualized funding rates (e.g., +0.05% per 8h = ~54.7% APR cost of carry)",
        "Extreme positive funding (>+0.05%) signaling retail long euphoria",
        "Negative funding regimes (<-0.02%) indicating aggressive retail short crowding"
      ],
      content: [
        "Baseline neutral funding in crypto is typically +0.01% per 8-hour interval (equivalent to ~10.95% annualized, representing the baseline risk-free fiat interest rate).",
        "When funding rates spike to +0.05% or +0.1% across major exchanges, retail traders are paying up to 100%+ annualized interest just to keep their long positions open. Historically, markets cannot sustain such extreme financing costs for long; an aggressive downward flush inevitably occurs to reset funding back to neutral.",
        "Conversely, when funding turns deeply negative (-0.03% to -0.08%), traders are aggressively shorting the market and paying longs to stay short. This heavy short crowding creates the ideal fuel for a violent upward short squeeze."
      ],
      proTip: "Funding rates are powerful contrarian indicators. When you see universally red negative funding rates across all exchanges while price is holding key support, go long. A short squeeze is imminent."
    },
    {
      id: "c9-l4",
      slug: "long-short-ratios-retail-vs-pros",
      chapterNumber: "09",
      lessonNumber: 4,
      title: "4. Long/Short Ratios: Retail Trader Sentiment vs Top Trader Positioning",
      duration: "5 mins",
      keyConcepts: [
        "Account Long/Short Ratio vs Position Volume Long/Short Ratio",
        "The retail trap: When 80%+ of retail accounts are long, price usually drops",
        "Top Trader Sentiment: Tracking the positioning of top 100 accounts by equity"
      ],
      content: [
        "Exchanges report two different Long/Short ratios: the Account Ratio (the percentage of total user accounts that are net long vs short) and the Position Volume Ratio (the percentage of total dollar capital that is long vs short).",
        "Retail traders are consistently wrong at market turning points. If the Account Long/Short Ratio shows 75% or 80% of accounts are long, retail crowd sentiment is overwhelmingly bullish. But because the majority of retail accounts hold small balances, market makers can easily hunt their liquidation points.",
        "Crucially, watch for a divergence where the retail account ratio is 75% Long, but the Top Trader Position Ratio is 60% Short. This reveals that smart money whales are quietly taking the other side of the trade, betting on a retail liquidation flush."
      ],
      proTip: "Never position with the retail majority when the account ratio reaches extreme 75/25 skews. Always align yourself with the Top Trader positioning."
    },
    {
      id: "c9-l5",
      slug: "coinglass-liquidation-heatmaps",
      chapterNumber: "09",
      lessonNumber: 5,
      title: "5. CoinGlass Liquidation Heatmaps: Identifying High-Density Magnetic Pools",
      duration: "7 mins",
      keyConcepts: [
        "How CoinGlass models liquidation levels from open interest and leverage tiers",
        "Liquidation Heatmap color gradient: Yellow/Purple high-density clusters",
        "The Liquidity Magnet principle: Why price is drawn to large liquidation clusters"
      ],
      content: [
        "CoinGlass Liquidation Heatmaps calculate where traders' liquidation prices are clustered by analyzing real-time order books, open interest changes, and exchange-specific maintenance margin rules.",
        "On the heatmap, price levels with massive concentrations of estimated liquidations light up in bright yellow and neon colors, representing hundreds of millions of dollars in pending forced stop orders.",
        "These high-density liquidation clusters act like powerful gravitational magnets. Institutional market makers and algorithms deliberately push price toward these clusters because triggering them creates massive guaranteed trading volume to fill their own orders."
      ],
      proTip: "Before opening any swing trade, check the CoinGlass Liquidation Heatmap. If there is a massive $300M+ liquidation cluster resting just 1.5% away, price will almost certainly sweep that cluster before making any sustained reversal."
    },
    {
      id: "c9-l6",
      slug: "mechanics-of-a-long-squeeze",
      chapterNumber: "09",
      lessonNumber: 6,
      title: "6. The Mechanics of a Long Squeeze: Forced Market Sells Triggering Cascades",
      duration: "6 mins",
      keyConcepts: [
        "Maintenance margin threshold breach triggering exchange liquidation engines",
        "The Forced Market Sell: Why liquidations execute as aggressive market orders",
        "Cascade dynamics: 100x liquidations triggering 50x, which trigger 25x longs"
      ],
      content: [
        "When an over-leveraged long trader's margin balance drops below the maintenance margin requirement, the exchange's risk engine takes control of the position and executes a Forced Market Sell to protect the exchange from bankruptcy.",
        "Notice the keyword: MARKET SELL. The exchange risk engine does not place a polite limit order; it slams an aggressive market sell into the order book at any price available.",
        "In a Long Squeeze, this forced selling consumes all resting limit bids, driving price lower. This drop pushes the next tier of leveraged traders (50x and 25x margin) below their maintenance threshold, triggering another wave of forced market sells. This self-reinforcing chain reaction causes rapid, multi-thousand-dollar flash crashes within seconds."
      ],
      proTip: "During a long squeeze cascade, do not attempt to catch the falling knife on the first red candle. Wait for total liquidation volume to peak (often above $150M in a 15-minute window) and CVD to flatten out before entering."
    },
    {
      id: "c9-l7",
      slug: "mechanics-of-a-short-squeeze",
      chapterNumber: "09",
      lessonNumber: 7,
      title: "7. The Mechanics of a Short Squeeze: Forced Market Buys Fueling Rallies",
      duration: "6 mins",
      keyConcepts: [
        "Forced Market Buys executing against empty ask order books",
        "The short trap: Bearish sentiment meeting surprise spot demand",
        "Parabolic expansion wicks caused by consecutive liquidation cascades"
      ],
      content: [
        "A Short Squeeze is the inverted mirror image of a long squeeze, and it is often significantly more violent. When short sellers are liquidated, the exchange risk engine executes an aggressive Forced Market Buy to close out their short positions.",
        "When thousands of short sellers are liquidated simultaneously, millions of dollars in automated market buy orders flood the order book at the same microsecond.",
        "Because resting sell limit orders (asks) are typically thin during sudden rallies, these forced market buys slice through resistance levels like a hot knife through butter, sending prices skyrocketing in vertical green candles."
      ],
      proTip: "Short squeezes often occur directly after widespread negative news that everyone expects will crash the market. When bad news fails to push price down, a monster short squeeze is brewing."
    },
    {
      id: "c9-l8",
      slug: "options-implied-volatility-gamma-maxpain",
      chapterNumber: "09",
      lessonNumber: 8,
      title: "8. Options Market Microstructure: Implied Volatility (IV), Gamma & Max Pain",
      duration: "6 mins",
      keyConcepts: [
        "Deribit options open interest and contract expiries (Monthly and Quarterly)",
        "Implied Volatility (DVOL) as an institutional measure of expected variance",
        "Max Pain Theory: The strike price where the highest dollar value of options expire worthless",
        "Dealer Gamma positioning: Long gamma dampens volatility, short gamma accelerates it"
      ],
      content: [
        "While perpetual futures dominate retail trading, institutional hedge funds manage billions in crypto options traded primarily on Deribit and CME.",
        "Max Pain Theory states that as the monthly or quarterly options expiration date approaches (typically the last Friday of every month at 08:00 UTC), market makers have a strong economic incentive to hedge their underlying books such that spot price pins close to the 'Max Pain' strike price, causing the greatest number of call and put options to expire worthless.",
        "Furthermore, monitoring Implied Volatility (IV) tells you whether options are expensive or cheap. When 30-day IV drops below 40%, the market is underpricing future price swings, making long volatility strategies attractive."
      ],
      formula: {
        name: "Max Pain Strike Calculation",
        math: "\\text{Max Pain} = \\arg\\min_{K} \\sum_{i} \\left[ \\text{OI}_{\\text{call}, i} \\times \\max(0, K_i - K) + \\text{OI}_{\\text{put}, i} \\times \\max(0, K - K_i) \\right]",
        explanation: "Where K is the strike price. Market makers systematically push price toward this point on major expiry Fridays."
      },
      proTip: "Check the quarterly options expiry calendar. The 48 hours leading into the final Friday of March, June, September, and December regularly feature spot price pinning toward Max Pain followed by explosive post-expiry trend releases."
    },
    {
      id: "c9-l9",
      slug: "basis-trading-cash-and-carry",
      chapterNumber: "09",
      lessonNumber: 9,
      title: "9. Basis Trading & Cash-and-Carry Arbitrage: Institutional Risk-Free Yield",
      duration: "5 mins",
      keyConcepts: [
        "Basis: The premium of quarterly futures prices over spot price",
        "Cash-and-Carry trade: Buying spot BTC and shorting equal-dollar quarterly futures",
        "Delta-neutral yield: Locking in 8% to 18% annualized USD returns with zero price exposure"
      ],
      content: [
        "Institutional desks (such as Wall Street hedge funds and family offices) rarely gamble on directional price predictions. Instead, they generate billions in risk-free yield through the Cash-and-Carry Basis Trade.",
        "In a bullish market, futures contracts trade at a premium to spot because traders are willing to pay extra for deferred payment. For example, if spot BTC is $95,000, 3-month futures might trade at $98,000 (a $3,000 premium).",
        "An institutional fund buys 10 BTC in spot and simultaneously sells 10 BTC worth of 3-month futures. Because their position is 100% delta-neutral (any drop in spot is exactly offset by gains in the short futures), they bear zero price risk. When the futures contract expires in 3 months, it converges to spot, and the fund pockets the $3,000 spread risk-free."
      ],
      formula: {
        name: "Annualized Basis Yield",
        math: "\\text{Annualized Yield} = \\left( \\frac{P_{\\text{futures}} - P_{\\text{spot}}}{P_{\\text{spot}}} \\right) \\times \\left( \\frac{365}{\\text{Days to Expiration}} \\right) \\times 100\\%",
        explanation: "During peak crypto bull markets, annualized basis yield often surpasses 25% APR on pure delta-neutral capital."
      },
      proTip: "Understanding the basis trade explains why institutional ETF inflows do not always cause immediate spot rallies: hedge funds often buy spot ETFs while simultaneously shorting CME futures to capture the basis yield."
    },
    {
      id: "c9-l10",
      slug: "derivatives-reversal-playbook",
      chapterNumber: "09",
      lessonNumber: 10,
      title: "10. The Derivatives Reversal Playbook: Trading Exhaustion Cascades at Heatmap Pools",
      duration: "7 mins",
      keyConcepts: [
        "The 4-Step Liquidation Flush Reversal Blueprint",
        "Filtering fake breakouts by checking OI drops vs spikes",
        "Entering the V-shape reversal when the liquidation cascade exhausts"
      ],
      content: [
        "Let us synthesize these derivatives metrics into one of the highest-profitability playbooks in digital assets: The Liquidation Exhaustion Reversal.",
        "Step 1: Open CoinGlass and identify a massive cluster of $150M+ long liquidations resting just below a major support level.",
        "Step 2: When price violently dumps through support, DO NOT short. Look at Open Interest: if OI plummets by $200M+ in 15 minutes, you are witnessing a forced liquidation cascade, not organic selling.",
        "Step 3: Watch the liquidation ticker. When liquidation volume hits astronomical peaks (over $50M/minute) and suddenly decelerates, the margin engines have finished flushing out the leveraged longs.",
        "Step 4: As soon as a 5-minute candle closes back above the support level with positive delta, enter LONG. The market has been cleaned of excess leverage, and the lack of remaining sellers will trigger a violent V-shape snap-back rally."
      ],
      proTip: "Place your stop loss just a few ticks below the absolute low of the liquidation wick. If price breaks that wick, the cascade is still ongoing; if it holds, you caught the exact bottom tick with 5R+ upside potential."
    }
  ],
  quiz: [
    {
      question: "What is the primary function of the 8-hour Funding Rate in perpetual futures contracts?",
      options: [
        "To generate tax revenue for national regulatory bodies",
        "To anchor the perpetual futures contract price to the spot index price through peer-to-peer economic incentives",
        "To pay electricity bills for Bitcoin miners",
        "To randomly close 10% of trader accounts every week"
      ],
      correctIndex: 1,
      explanation: "Funding rates incentivize traders to take the opposite side when the perp deviates from spot. Positive funding forces longs to pay shorts, encouraging longs to close and shorts to open, anchoring perp prices to spot without contract expiry."
    },
    {
      question: "What happens when price makes a new high but Open Interest (OI) sharply declines?",
      options: [
        "The rally is driven primarily by short sellers buying back to cover their losses (short covering), which is fragile and prone to exhaustion",
        "Traders are depositing billions of dollars of fresh capital into new long positions",
        "The blockchain has doubled its block confirmation speed",
        "Trading has been permanently banned across all exchanges"
      ],
      correctIndex: 0,
      explanation: "Price rising while OI falls means existing positions are closing rather than new capital entering. The move is a short-covering squeeze, which typically lacks sustained follow-through once the shorts are covered."
    },
    {
      question: "Why do institutional market makers target high-density liquidation clusters on CoinGlass heatmaps?",
      options: [
        "Because forced liquidations execute as aggressive market orders, providing massive guaranteed liquidity to fill institutional limit orders without slippage",
        "Because exchanges give rewards to whoever triggers the most liquidations",
        "Because liquidation clusters contain free Bitcoins that can be claimed by any user",
        "Because options contracts legally require all liquidations to occur at 12:00 PM"
      ],
      correctIndex: 0,
      explanation: "Large institutional players need massive liquidity to fill their size. Triggering forced liquidation market orders creates a guaranteed pool of counterparty volume, allowing institutions to absorb massive size at optimal pricing."
    }
  ]
};
