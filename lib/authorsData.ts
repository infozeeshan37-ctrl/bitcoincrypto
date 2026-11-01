export interface Author {
  slug: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  longBio: string[];
  avatarUrl: string;
  credentials: string[];
  areasOfExpertise: string[];
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  };
  articleCount?: number;
}

export const authors: Author[] = [
  {
    slug: "zeeshan-ahmed",
    name: "Zeeshan Ahmed",
    role: "Founder & Lead Quantitative Developer",
    title: "Principal Platform Architect & Algorithmic Systems Engineer",
    bio: "Founder and Lead Quantitative Developer of BitcoinCrypto.tech. Specializes in low-latency exchange data streaming, order book microstructure analytics, and quantitative trading bot architecture.",
    longBio: [
      "Zeeshan Ahmed is the founder and lead quantitative developer behind BitcoinCrypto.tech. With a background in quantitative computer science, software architecture, and distributed financial data systems, Zeeshan engineered the platform's core algorithmic engines—including the sub-second Binance Level-2 order book depth parser, the real-time Cumulative Volume Delta (CVD) telemetry tracker, and the multi-horizon predictive neural model.",
      "Frustrated by the prevalence of opaque trading tools and speculative noise in the retail crypto ecosystem, Zeeshan created BitcoinCrypto.tech as an open-access, educational platform dedicated to empirical mathematical rigor. His work focuses on democratizing institutional-grade market microstructure tools, such as Coinglass-style liquidation cascade mapping and 6-pillar confluence forecasting.",
      "All quantitative models, mathematical formulas, and simulation engines published on BitcoinCrypto.tech are developed and audited under Zeeshan's technical leadership, adhering strictly to non-gambling, educational paper-trading standards."
    ],
    avatarUrl: "/images/authors/zeeshan-ahmed.jpg",
    credentials: [
      "B.S. in Computer Science & Distributed Systems",
      "Lead Architect of BitcoinCrypto.tech Algorithmic Suite",
      "Specialist in High-Frequency Order Flow & WebSocket Streaming",
      "Over 6 years in digital asset engineering & technical market analysis"
    ],
    areasOfExpertise: [
      "Level-2 Order Book Microstructure",
      "WebSocket Real-Time Data Pipelines",
      "Algorithmic Trading Bot Architecture",
      "Average True Range (ATR) & Volatility Corridors",
      "Paper-Trading Simulation Modeling"
    ],
    socialLinks: {
      github: "https://github.com/infozeeshan37-ctrl",
      email: "infozeeshan37@gmail.com",
      twitter: "https://twitter.com/bitcoincrypto"
    }
  },
  {
    slug: "elena-rostova",
    name: "Elena Rostova",
    role: "Chief Macroeconomic Research Lead",
    title: "Senior Monetary Economist & Liquidity Cycle Analyst",
    bio: "Head of Macro Research at BitcoinCrypto.tech. Former institutional macro research analyst specializing in central bank liquidity transmission, US CPI disinflation dynamics, and global debt monetization.",
    longBio: [
      "Elena Rostova leads macroeconomic research at BitcoinCrypto.tech, focusing on the intersection of global sovereign debt management, central bank monetary policy, and digital asset liquidity cycles. With over a decade of experience analyzing international fixed income and currency markets, Elena specializes in deconstructing Treasury debt issuance strategies, Federal Reserve balance sheet operations, and Bank of Japan yield curve control mechanics.",
      "Her published research provides deep institutional breakdowns of how stealth yield curve control, reverse repo drainage, and Treasury General Account (TGA) fluctuations directly dictate Bitcoin's cyclical multi-year bull and bear regimes.",
      "Elena holds a Master's degree in International Monetary Economics and regularly authors comprehensive deep dives analyzing how US Bureau of Labor Statistics CPI releases and FOMC rate probabilities transmit through digital asset markets."
    ],
    avatarUrl: "/images/authors/elena-rostova.jpg",
    credentials: [
      "M.Sc. in International Monetary Economics & Finance",
      "Former Fixed-Income & Macro Research Associate",
      "Lead Author of US CPI & Global Central Bank Liquidity Studies",
      "10+ years specializing in monetary debasement and currency cycles"
    ],
    areasOfExpertise: [
      "Federal Reserve Monetary Policy & FOMC Forecasts",
      "US Treasury Debt Issuance & Yield Curve Control",
      "US CPI Inflation Metrics & Inflation Swap Swaps",
      "Global M2 Money Supply Expansion Transmission",
      "Bitcoin Sovereign Store-of-Value Dynamics"
    ],
    socialLinks: {
      email: "contact@bitcoincrypto.tech",
      twitter: "https://twitter.com/bitcoincrypto"
    }
  },
  {
    slug: "marcus-vance",
    name: "Marcus Vance",
    role: "Senior Market Microstructure & Derivatives Analyst",
    title: "Lead Order Flow Quantitative Analyst",
    bio: "Senior Derivatives Analyst specializing in perpetual futures funding rates, Coinglass liquidation cluster hunting, whale iceberg order detection, and resting limit depth.",
    longBio: [
      "Marcus Vance is the Lead Order Flow Quantitative Analyst at BitcoinCrypto.tech, dedicated to demystifying the hidden mechanics of cryptocurrency derivatives markets. His daily research uncovers the structural imbalances between maker limit liquidity and aggressive taker market orders across Binance, Bybit, Coinbase, and OKX.",
      "Marcus specializes in perpetual swap basis dynamics, annualized funding rate arbitrage, open interest expansion/contraction regimes, and liquidation pool magnet physics. His guides on identifying whale spoofing, iceberg order accumulation, and gamma squeezes are widely utilized by retail and institutional paper-trading analysts alike.",
      "Prior to joining the BitcoinCrypto.tech research desk, Marcus spent several years analyzing electronic futures markets and execution algorithms across Chicago and New York trading venues."
    ],
    avatarUrl: "/images/authors/marcus-vance.jpg",
    credentials: [
      "B.S. in Financial Engineering & Market Microstructure",
      "Specialist in Perpetual Futures Funding Mechanics & Basis Trading",
      "Author of 'The Liquidation Cascades Blueprint' and 'Order Flow Dynamics'",
      "8+ years analyzing electronic derivatives order books"
    ],
    areasOfExpertise: [
      "CoinGlass Liquidation Heatmap Interpretation",
      "Perpetual Futures Funding Rate Regimes",
      "Cumulative Volume Delta (CVD) Divergence",
      "Whale Iceberg & Spoofing Detection",
      "Short Squeeze & Gamma Cascade Mechanics"
    ],
    socialLinks: {
      email: "contact@bitcoincrypto.tech",
      twitter: "https://twitter.com/bitcoincrypto"
    }
  },
  {
    slug: "dr-sarah-chen",
    name: "Dr. Sarah Chen, Ph.D.",
    role: "Senior Quantitative Strategist & Statistical Modeling Lead",
    title: "Head of Mathematical Risk & Volatility Analytics",
    bio: "Ph.D. in Financial Mathematics and Senior Quantitative Strategist. Expert in stochastic volatility modeling, 14-period Wilder RSI smoothing, MVRV Z-Scores, and capital preservation mathematics.",
    longBio: [
      "Dr. Sarah Chen leads quantitative statistical modeling and risk architecture at BitcoinCrypto.tech. Holding a Ph.D. in Financial Mathematics and Applied Probability, Dr. Chen's academic and professional work centers on non-linear price distributions, stochastic calculus, and mathematical capital preservation strategies in highly volatile asset classes.",
      "At BitcoinCrypto.tech, Dr. Chen oversees the statistical calibration of the 6-pillar confluence scoring model, Wilder's smoothed Relative Strength Index (RSI), Average True Range (ATR) dynamic volatility bands, and harmonic-mean dollar-cost averaging formulas.",
      "Dr. Chen is a passionate advocate for financial literacy and mathematical risk management, emphasizing that long-term survival in digital asset markets depends strictly on position sizing formulas (such as the Kelly Criterion and maximum drawdown limits) rather than speculative intuition."
    ],
    avatarUrl: "/images/authors/dr-sarah-chen.jpg",
    credentials: [
      "Ph.D. in Financial Mathematics & Applied Probability",
      "Author of peer-reviewed papers on volatility clustering in digital assets",
      "Architect of the BitcoinCrypto Dynamic Position Sizing Calculator",
      "Lecturer on Quantitative Risk Management & On-Chain Valuation"
    ],
    areasOfExpertise: [
      "Stochastic Volatility & ATR Dynamic Envelopes",
      "MVRV Z-Score & Realized Price Mathematical Modeling",
      "Wilder's RSI & Moving Average Convergence Divergence",
      "Kelly Criterion & Fixed-Fractional Risk Sizing",
      "Behavioral Finance & Harmonic Mean Dollar-Cost Averaging"
    ],
    socialLinks: {
      email: "contact@bitcoincrypto.tech",
      twitter: "https://twitter.com/bitcoincrypto"
    }
  },
  {
    slug: "research-desk",
    name: "BitcoinCrypto Quantitative Research Desk",
    role: "Collaborative Institutional Research Division",
    title: "Institutional Digital Asset Research & Verification Desk",
    bio: "The collaborative research division of BitcoinCrypto.tech comprising quantitative engineers, macroeconomic researchers, and data verification analysts.",
    longBio: [
      "The BitcoinCrypto Quantitative Research Desk is the collective institutional editorial body responsible for platform-wide market intelligence reports, educational masterclass chapters, and real-time algorithmic telemetry audits.",
      "Operating under strict peer-review and fact-checking standards, the Research Desk synthesizes raw data streams from official centralized exchange WebSocket feeds, on-chain public node ledgers, the Federal Reserve Bank of St. Louis (FRED), the US Bureau of Labor Statistics (BLS), and the US Securities and Exchange Commission (SEC).",
      "Every article, guide, and prediction model published under the Research Desk byline undergoes a dual-layer review process: first for mathematical and programmatic accuracy, and second for non-promotional educational integrity."
    ],
    avatarUrl: "/images/authors/research-desk.jpg",
    credentials: [
      "Consortium of quantitative engineers, economists, and data analysts",
      "Maintains the 100-lesson Crypto Learn Masterclass repository",
      "Independent, self-funded, non-sponsored editorial desk",
      "Strict compliance with academic citation standards & non-gambling rules"
    ],
    areasOfExpertise: [
      "Comprehensive Digital Asset Education (Chapters 1–10)",
      "On-Chain Valuation Metrics & Exchange Reserve Outflows",
      "Central Bank Liquidity Transmission & US CPI Analysis",
      "Derivatives Microstructure & Order Book Depth",
      "Empirical Backtesting & Paper-Trading Systems"
    ],
    socialLinks: {
      email: "contact@bitcoincrypto.tech",
      twitter: "https://twitter.com/bitcoincrypto",
      github: "https://github.com/infozeeshan37-ctrl/bitcoincrypto"
    }
  }
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getAllAuthors(): Author[] {
  return authors;
}
