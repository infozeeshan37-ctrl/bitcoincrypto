import { CourseChapter } from "./types";

export const chapter3: CourseChapter = {
  id: "macroeconomics-liquidity",
  chapterNumber: "03",
  title: "Macroeconomics, Global M2 & Central Bank Liquidity Cycles",
  tagline: "Master global money supply expansions, Fed balance sheet dynamics, DXY inverse beta, and sovereign liquidity regimes.",
  category: "macro",
  level: "Intermediate",
  estimatedTime: "60 mins",
  accentColor: "emerald",
  badge: "Macro Framework",
  diagramType: "halving",
  overview:
    "Cryptocurrency does not trade in a vacuum. Learn how global central bank liquidity (M2), Federal Reserve Quantitative Tightening (QT) vs Quantitative Easing (QE), real interest rates, and foreign exchange currency carry trades dictate macro bull and bear regimes across all digital assets.",
  linkedTool: {
    name: "Macro Battles Dashboard",
    href: "/tools/macro-battles",
    actionText: "Track Macro Economic Indicators →"
  },
  references: [
    { title: "Federal Reserve Economic Data (FRED): M2 Money Supply", url: "https://fred.stlouisfed.org/series/M2SL", source: "Federal Reserve Bank of St. Louis", type: "Government / Fed" },
    { title: "Federal Reserve Balance Sheet Assets (WALCL)", url: "https://fred.stlouisfed.org/series/WALCL", source: "Federal Reserve Board of Governors", type: "Government / Fed" },
    { title: "US Bureau of Labor Statistics: Consumer Price Index (CPI) Datasets", url: "https://www.bls.gov/cpi/", source: "US Bureau of Labor Statistics", type: "Government / Fed" },
    { title: "Bank for International Settlements (BIS) Global Liquidity Indicators", url: "https://www.bis.org/statistics/gli.htm", source: "Bank for International Settlements", type: "Academic" }
  ],
  relatedInternalLinks: [
    { title: "US CPI Inflation AI Predictor & Schedule", href: "/cpi", badge: "AI Forecaster", description: "Real-time CPI consensus predictions, market expectations, and historical BTC volatility impact." },
    { title: "Real-Time Macroeconomic News Wire", href: "/news", badge: "Live Feed", description: "Breaking central bank statements, FOMC rate probabilities, and liquidity alerts." },
    { title: "Spot Market Capitalization Rankings", href: "/markets", badge: "Terminal", description: "Real-time pricing, volume, and market breadth across the entire digital asset ecosystem." }
  ],
  lessons: [
    {
      id: "c3-l1",
      slug: "global-m2-master-driver",
      chapterNumber: "03",
      lessonNumber: 1,
      title: "1. Global M2 Money Supply: The Master Driver of Crypto Bull Markets",
      duration: "6 mins",
      keyConcepts: [
        "Aggregate fiat currency supply (US M2 + Eurozone M2 + PBOC + BOJ)",
        "Correlation between M2 year-over-year rate-of-change and Bitcoin price",
        "Lead-lag relationship: Global liquidity leads asset prices by 60 to 90 days"
      ],
      content: [
        "While retail traders obsess over micro-events like exchange listings or daily candle wicks, macro institutional desks look at one primary variable: the rate of change in Global M2 fiat money supply.",
        "M2 measures broad money in circulation—cash, checking deposits, savings balances, and short-term money market funds across the major central banks (Federal Reserve, European Central Bank, People's Bank of China, and Bank of Japan).",
        "Because Bitcoin has a strictly fixed supply curve of 21 million units, measuring Bitcoin in fiat currency is effectively measuring the denominator (fiat dilution). When global central banks expand M2, excess fiat liquidity overflows into fixed-supply assets, creating explosive multi-month bull runs."
      ],
      formula: {
        name: "Global M2 Aggregate Equation",
        math: "\\Delta M2_{\\text{Global}} = \\Delta M2_{\\text{Fed}} + \\Delta M2_{\\text{ECB}} + \\Delta M2_{\\text{PBOC}} + \\Delta M2_{\\text{BOJ}}",
        explanation: "Converted to USD at spot FX rates. When the year-over-year percentage change in Global M2 breaks above +5%, Bitcoin historically enters parabolic expansion regimes."
      },
      proTip: "Never fight the global liquidity tide. Even with perfect technical chart setups, longing altcoins during aggressive global M2 contractions is swimming upstream against an institutional liquidity vacuum."
    },
    {
      id: "c3-l2",
      slug: "fed-balance-sheet-qt-qe",
      chapterNumber: "03",
      lessonNumber: 2,
      title: "2. Federal Reserve Balance Sheet: Quantitative Easing (QE) vs Tightening (QT)",
      duration: "7 mins",
      keyConcepts: [
        "Open Market Operations and central bank asset purchasing",
        "Systemic reserve drain via Quantitative Tightening (QT)",
        "The Reverse Repo Facility (RRP) as a secondary liquidity shock absorber"
      ],
      content: [
        "The Federal Reserve controls systemic liquidity through its balance sheet. During Quantitative Easing (QE), the Fed buys US Treasuries and Mortgage-Backed Securities from commercial banks, crediting them with newly minted bank reserves.",
        "These reserves lower borrowing costs, compress corporate bond yields, and force yield-seeking asset managers down the risk curve into growth equities and crypto.",
        "Conversely, during Quantitative Tightening (QT), the Fed allows maturing bonds to roll off its balance sheet without reinvesting proceeds, removing billions of dollars in liquidity from the financial system each month."
      ],
      formula: {
        name: "Net Fed Systemic Liquidity",
        math: "\\text{Net Liquidity} = \\text{Fed Balance Sheet Total} - \\text{Treasury General Account (TGA)} - \\text{Reverse Repo (RRP)}",
        explanation: "Real-time dollar liquidity in the banking system. Bitcoin correlates with Net Liquidity with an R-squared coefficient exceeding 0.82."
      },
      proTip: "Track the Treasury General Account (TGA). When the US Treasury rebuilds its checking account after debt-ceiling negotiations, it drains commercial bank liquidity just like QT."
    },
    {
      id: "c3-l3",
      slug: "dxy-us-dollar-index-inverse-beta",
      chapterNumber: "03",
      lessonNumber: 3,
      title: "3. The US Dollar Index (DXY) & High-Beta Inverse Correlation",
      duration: "6 mins",
      keyConcepts: [
        "Trade-weighted basket of foreign currencies vs USD (EUR, JPY, GBP, CAD, SEK, CHF)",
        "Dollar Smile Theory: Why USD rallies in severe panics and strong expansions",
        "DXY breakdown thresholds: The sweet spot for crypto parabolic rallies"
      ],
      content: [
        "The US Dollar Index (DXY) measures the strength of the dollar against a basket of six major foreign currencies, heavily weighted toward the Euro (57.6%) and Japanese Yen (13.6%).",
        "Because worldwide debt and commodities are predominantly denominated in dollars, a surging DXY creates global financial tightening, making dollar debt servicing more expensive and draining speculative liquidity.",
        "Historically, all parabolic crypto bull markets (2017, late 2020, early 2024) coincided with sustained DXY downtrends. When the dollar weakens, foreign capital flows freely into risk-on speculative assets."
      ],
      proTip: "Set an alert on your charts when DXY crosses below its 200-day simple moving average. That cross has marked the start of major crypto rallies in 4 out of the last 5 market cycles."
    },
    {
      id: "c3-l4",
      slug: "real-interest-rates-tips-yields",
      chapterNumber: "03",
      lessonNumber: 4,
      title: "4. Real Interest Rates vs Nominal Rates: Why TIPS Yields Move Bitcoin",
      duration: "6 mins",
      keyConcepts: [
        "Nominal Fed Funds Rate vs Inflation Expectations (Breakevens)",
        "10-Year Treasury Inflation-Protected Securities (TIPS) Real Yield",
        "Opportunity cost of holding zero-yield digital bearer assets"
      ],
      content: [
        "Traders often make the mistake of watching only the headline Fed Funds policy rate. What actually drives institutional capital between cash and gold/crypto is the Real Interest Rate.",
        "The real rate is calculated as the nominal treasury yield minus expected inflation over the same maturity: Real Yield = Nominal Yield - Breakeven Inflation Rate.",
        "When real yields are deeply negative (as in 2020-2021 when inflation outpaced treasury yields), holding cash guarantees wealth destruction. Institutions are forced to park capital in scarce assets like Bitcoin to protect real purchasing power."
      ],
      formula: {
        name: "Fisher Equation for Real Rates",
        math: "r_{\\text{real}} \\approx r_{\\text{nominal}} - \\pi_{\\text{expected}}",
        explanation: "Where r_nominal is the 10-Year Treasury yield and pi_expected is the 10-year breakeven inflation rate. Deep negative real rates create the most aggressive crypto bull runs."
      },
      proTip: "If 10-year real yields climb above +2.0%, bonds provide attractive risk-free real returns, creating headwinds for speculative altcoins."
    },
    {
      id: "c3-l5",
      slug: "treasury-yield-curve-inversion",
      chapterNumber: "03",
      lessonNumber: 5,
      title: "5. Treasury Yield Curve Inversions (2Y/10Y) & Recession Lag Dynamics",
      duration: "7 mins",
      keyConcepts: [
        "The 10-Year minus 2-Year Treasury spread (T10Y2Y)",
        "Inversion mechanism: Why short rates rise above long rates during late cycle",
        "The steepening 'un-inversion' danger zone when central banks panic cut"
      ],
      content: [
        "Under healthy economic conditions, the yield curve slopes upward: investors demand higher yields for locking up capital for 10 years compared to 2 years.",
        "When the 2Y yield rises above the 10Y yield, the curve inverts. This inversion occurs because bond markets anticipate aggressive central bank rate hikes in the near term followed by an eventual economic slump.",
        "Crucially, recessions and major market liquidations do not happen during the inversion itself; they historically hit when the curve rapidly un-inverts (steepens) as the central bank is forced into emergency rate cuts."
      ],
      proTip: "Watch for the 2Y/10Y curve rising back above zero from deeply negative territory. When rate cuts are forced by banking stress rather than orderly disinflation, high-risk assets often experience sharp initial flushes before liquidity rescue kicks in."
    },
    {
      id: "c3-l6",
      slug: "cpi-pce-macro-volatility-releases",
      chapterNumber: "03",
      lessonNumber: 6,
      title: "6. Consumer Price Index (CPI) & PCE: Trading Data Release Volatility",
      duration: "6 mins",
      keyConcepts: [
        "Core CPI (excluding food & energy) vs Headline CPI",
        "Personal Consumption Expenditures (PCE) as the Fed's preferred inflation gauge",
        "Consensus expectations vs actual print: Trading the delta, not the absolute number"
      ],
      content: [
        "Monthly CPI and PCE releases trigger sharp volatility across derivatives order books. Algorithmic news-trading bots execute within microseconds of the Bureau of Labor Statistics (BLS) data drop.",
        "Markets do not care about the absolute inflation rate; they trade purely on the Delta between the consensus forecast and the actual reported figure.",
        "If Core CPI prints 0.2% hotter than expected, interest rate futures instantaneously reprice higher terminal rates, triggering immediate liquidation long sweeps in crypto perpetual futures."
      ],
      proTip: "Avoid opening new leveraged positions 15 minutes before 8:30 AM EST on CPI release days. Spreads widen massively and bid/ask depth thins out, exposing you to severe slippage."
    },
    {
      id: "c3-l7",
      slug: "bitcoin-fastest-horse-debasement",
      chapterNumber: "03",
      lessonNumber: 7,
      title: "7. The Fastest Horse in Monetary Debasement: Comparing BTC, Gold & Equities",
      duration: "6 mins",
      keyConcepts: [
        "Paul Tudor Jones' monetary debasement thesis",
        "Beta to fiat expansion: 3x to 4x multiplier compared to physical commodities",
        "Monetary premium accrual in digital bearer instruments"
      ],
      content: [
        "In May 2020, legendary hedge fund macro trader Paul Tudor Jones published his seminal research paper 'The Great Monetary Inflation', identifying Bitcoin as the 'fastest horse in the race to beat fiat currency debasement'.",
        "While gold has preserved wealth for millennia with a steady ~1.5% annual supply growth, its physical friction makes it ill-suited for modern digital commerce and instantaneous global settlement.",
        "Equities provide productive cash flows, but face regulatory friction, taxation, and dilution through corporate stock offerings. Bitcoin combines pure fixed scarcity with borderless digital mobility, capturing the highest beta to global fiat money expansion."
      ],
      proTip: "In multi-asset portfolio construction, allocating just 2% to 5% of a traditional 60/40 portfolio to Bitcoin significantly enhances the overall portfolio Sharpe ratio due to asymmetric upside capture."
    },
    {
      id: "c3-l8",
      slug: "asian-central-banks-yen-carry-trade",
      chapterNumber: "03",
      lessonNumber: 8,
      title: "8. Asian Liquidity Dynamics & The Japanese Yen Carry Trade Unwind",
      duration: "6 mins",
      keyConcepts: [
        "Bank of Japan (BOJ) zero-interest-rate policy (ZIRP) and yield curve control (YCC)",
        "The Yen carry trade: Borrowing in cheap JPY to buy high-yielding US assets & crypto",
        "Rapid carry trade unwinds: Lessons from August 2024 global flash crashes"
      ],
      content: [
        "Western traders often focus solely on the US Federal Reserve, but Asian central banks—particularly the Bank of Japan (BOJ) and the People's Bank of China (PBOC)—wield massive global liquidity influence.",
        "For decades, the BOJ kept interest rates near zero or negative. Global hedge funds borrowed trillions of Yen virtually free of cost, converted them to USD, and deployed them into US tech stocks, treasuries, and digital assets (the Yen Carry Trade).",
        "When the BOJ unexpectedly raises interest rates or the Yen strengthens sharply, these leveraged trades become unprofitable. Funds are forced to liquidate risk positions across the board to buy back Yen and pay off loans, causing sudden global flash crashes."
      ],
      proTip: "Monitor the USD/JPY exchange pair. Rapid appreciation of the Yen (falling USD/JPY) is an immediate warning signal that global carry trades are unwinding and risk assets face systemic liquidation pressure."
    },
    {
      id: "c3-l9",
      slug: "sovereign-reserves-sanctions-resistance",
      chapterNumber: "03",
      lessonNumber: 9,
      title: "9. Sovereign Treasury Reserves, De-Dollarization & Sanctions Resistance",
      duration: "5 mins",
      keyConcepts: [
        "Freezing of central bank FX reserves (the 2022 turning point)",
        "Shift from paper claims to neutral bearer reserve assets",
        "Nation-state adoption: El Salvador, sovereign wealth funds, and strategic reserves"
      ],
      content: [
        "In 2022, the freezing of over $300 billion in Russian central bank foreign exchange reserves by Western nations marked an irreversible turning point in global monetary history.",
        "For the first time in modern history, sovereign nations realized that foreign currency reserves held in correspondent banks are not true bearer wealth, but liabilities that can be turned off with a stroke of a pen.",
        "This dynamic accelerated global de-dollarization and fueled nation-state interest in neutral, confiscation-resistant monetary assets. Bitcoin operates outside the jurisdiction of any single nation's legal or military apparatus, making it the ultimate neutral reserve candidate."
      ],
      proTip: "Watch legislative developments regarding US Strategic Bitcoin Reserves and sovereign wealth fund allocations. Sovereign competition for finite digital reserves eliminates downside price discovery."
    },
    {
      id: "c3-l10",
      slug: "macro-playbook-portfolio-allocation",
      chapterNumber: "03",
      lessonNumber: 10,
      title: "10. The Macro Playbook: Dynamic Asset Allocation Across Liquidity Regimes",
      duration: "7 mins",
      keyConcepts: [
        "The 4 Macro Regimes: Expansion, Inflation Shock, Contraction, and Deflationary Flush",
        "Adjusting crypto portfolio beta based on macroeconomic indicators",
        "Capital preservation rules during aggressive tightening cycles"
      ],
      content: [
        "To trade profitably over multi-year horizons, an investor must categorize the current market into one of four distinct macroeconomic regimes based on Growth and Central Bank Liquidity trends.",
        "In Regime 1 (Liquidity Expansion / Fed Easing), maximize beta: hold core BTC, ETH, and high-beta altcoins. In Regime 2 (Tightening / Fed Hikes), reduce beta: rotate altcoin profits into BTC, stablecoins, and short-duration cash yields.",
        "The most profitable macro traders do not forecast the future; they systematically monitor leading indicators (M2 delta, TIPS yields, DXY, and credit spreads) and rebalance their exposure before the crowd reacts."
      ],
      proTip: "Create a simple monthly rebalancing checklist. If 3 out of 4 leading macro indicators point to tightening, cap your altcoin exposure at under 15% of your total liquid crypto net worth."
    }
  ],
  quiz: [
    {
      question: "Which macroeconomic indicator historically exhibits the strongest positive correlation with sustained Bitcoin bull runs?",
      options: [
        "Corporate dividend yields in the S&P 500",
        "Global M2 Money Supply year-over-year rate of change",
        "Gold lease rates on the London Bullion Market",
        "Unemployment figures in the European Union"
      ],
      correctIndex: 1,
      explanation: "Global M2 fiat money supply represents the aggregate broad liquidity in the world's major economies. As fiat supply expands against Bitcoin's fixed 21-million unit hard cap, BTC experiences strong multi-month bull expansions."
    },
    {
      question: "What happens during Quantitative Tightening (QT) by the Federal Reserve?",
      options: [
        "The Fed prints new bank reserves and purchases commercial mortgage bonds",
        "The Fed lets maturing government bonds roll off without reinvestment, removing liquidity",
        "The Fed fixes the US Dollar Index at a predetermined pegged exchange rate",
        "The Fed directly distributes cash bonuses to consumer bank accounts"
      ],
      correctIndex: 1,
      explanation: "Quantitative Tightening shrinks the Fed balance sheet by letting maturing bonds expire without replacing them, effectively vacuuming dollar reserves out of the financial system and raising borrowing costs."
    },
    {
      question: "Why does a surging US Dollar Index (DXY) typically create headwinds for digital assets?",
      options: [
        "Because it makes dollar-denominated global debt servicing more expensive and tightens liquidity worldwide",
        "Because Bitcoin's blockchain difficulty automatically doubles when the dollar strengthens",
        "Because cryptocurrency mining pools are legally forced to shut down in high dollar regimes",
        "Because altcoins are chemically bonded to physical fiat currencies"
      ],
      correctIndex: 0,
      explanation: "A strong dollar tightens global financial conditions, drains dollar liquidity from foreign markets, and reduces speculative appetite for risk assets across the board."
    }
  ]
};
