"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Coins,
  Activity,
  Flame,
  Newspaper,
  BookOpen,
  Compass,
  Info,
  ArrowRight,
  Sparkles,
  Command,
  X,
  TrendingUp,
  Brain,
  Fish,
  LineChart,
  Calculator,
  Sliders,
  Radio,
  Target,
  FileText,
  ShieldCheck,
  Zap,
  BarChart2,
  PieChart,
  Lock,
  Globe,
  HelpCircle,
  Clock,
  Layers,
  Percent
} from "lucide-react";

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Tools" | "Predictions" | "Whale Orders" | "Derivatives" | "Markets" | "Macro & CPI" | "Concepts" | "Research" | "Platform";
  href: string;
  icon: React.ElementType;
  badge?: string;
  keywords: string[];
}

export const ALL_SEARCH_ITEMS: SearchItem[] = [
  // ==========================================
  // 1. CORE PLATFORM & MAIN TERMINALS
  // ==========================================
  {
    id: "home-terminal",
    title: "BitcoinCrypto.tech Platform Home",
    subtitle: "Real-time crypto market intelligence, AI trading signals, and macro analytics hub",
    category: "Platform",
    href: "/",
    icon: Sparkles,
    badge: "HOME",
    keywords: ["home", "main", "dashboard", "bitcoincrypto", "bitcoincrypto.tech", "overview", "terminal", "landing", "start"]
  },
  {
    id: "signals-terminal",
    title: "AI Trading Signals & Copilot Terminal",
    subtitle: "Real-time algorithmic trading setups, momentum indicators, and 98.6% confluence signals",
    category: "Tools",
    href: "/tools/trading-bot",
    icon: Activity,
    badge: "98.6% CONFLUENCE",
    keywords: ["signals", "ai trading bot", "algo signals", "bot", "trading bot", "copilot", "buy sell", "momentum", "alphatrend", "hyperscalp", "grid dca", "signals tab"]
  },
  {
    id: "predictions-hub",
    title: "AI Price Predictions Intelligence Hub",
    subtitle: "Multi-horizon quantitative forecasts (24h, 7d, 30d) for 36+ cryptocurrencies",
    category: "Predictions",
    href: "/predictions",
    icon: Brain,
    badge: "36+ ASSETS",
    keywords: ["predictions", "ai price prediction", "price forecast", "forecast", "target", "ai predictions", "price target", "future price", "projection"]
  },
  {
    id: "whale-orders-radar",
    title: "Whale Orders & Smart Money Flow Radar",
    subtitle: "Real-time sub-second whale block trade tracker, CVD delta, and high-value limit wall heatmap",
    category: "Whale Orders",
    href: "/whale-orders",
    icon: Fish,
    badge: "SUB-SECOND",
    keywords: ["whale", "whale orders", "whales", "smart money", "whale tracker", "block trades", "whale cvd", "whale heatmap", "limit walls", "whale tape", "whale alerts"]
  },
  {
    id: "coinglass-hub",
    title: "CoinGlass Derivatives & Liquidation Hub",
    subtitle: "Aggregated open interest, multi-exchange liquidation heatmaps, funding rates & long/short ratios",
    category: "Derivatives",
    href: "/coinglass",
    icon: Flame,
    badge: "$68B+ OI",
    keywords: ["coinglass", "derivatives", "futures", "perps", "perpetuals", "open interest", "coinglass open interest", "oi", "funding", "coinglass liquidations"]
  },
  {
    id: "spot-markets-hub",
    title: "CoinMarketCap Spot Rankings & Market Depth",
    subtitle: "Live cryptocurrency prices, 24h market cap, volume velocity, and top gainers/losers",
    category: "Markets",
    href: "/markets",
    icon: Coins,
    badge: "50+ COINS",
    keywords: ["markets", "spot", "coinmarketcap", "prices", "crypto prices", "market cap", "top coins", "altcoins", "ranking", "live prices"]
  },
  {
    id: "orderbook-terminal",
    title: "Level-2 Central Limit Order Book (CLOB) Terminal",
    subtitle: "Real-time live multi-exchange L2 orderbook depth, bid/ask walls, and microstructure slippage",
    category: "Derivatives",
    href: "/orderbook",
    icon: Activity,
    badge: "L2 DEPTH",
    keywords: ["orderbook", "order book", "clob", "level 2", "l2", "depth", "bid ask", "spread", "slippage", "microstructure", "binance orderbook"]
  },
  {
    id: "news-cpi-wire",
    title: "US CPI Inflation Tracker & Breaking News Wire",
    subtitle: "Live macroeconomic news, official BLS CPI calendar, and Federal Reserve FOMC rate odds",
    category: "Macro & CPI",
    href: "/news",
    icon: Newspaper,
    badge: "BLS CPI",
    keywords: ["news", "cpi", "inflation", "fed", "fomc", "interest rate", "macro", "bls", "us cpi", "breaking news", "economic calendar"]
  },
  {
    id: "cpi-standalone-page",
    title: "US CPI Inflation & Macro Volatility Calendar",
    subtitle: "Track official BLS Consumer Price Index releases, core inflation, and Bitcoin volatility correlation",
    category: "Macro & CPI",
    href: "/cpi",
    icon: Sparkles,
    badge: "CPI RADAR",
    keywords: ["cpi calendar", "inflation data", "fed rate", "cpi print", "consumer price index", "macro calendar"]
  },
  {
    id: "concepts-academy",
    title: "Trading Concepts Academy & Masterclasses",
    subtitle: "Institutional quantitative curriculum: order flow, funding arbitrage, MVRV, and market structure",
    category: "Concepts",
    href: "/concepts",
    icon: Compass,
    badge: "12 GUIDES",
    keywords: ["concepts", "academy", "learn", "education", "guides", "trading concepts", "masterclass", "tutorials"]
  },
  {
    id: "research-desk",
    title: "Institutional Research Desk & Macro Whitepapers",
    subtitle: "In-depth macroeconomic research, cycle valuation models, and quantitative theses",
    category: "Research",
    href: "/blog",
    icon: BookOpen,
    badge: "WHITEPAPERS",
    keywords: ["blog", "research", "articles", "whitepapers", "theses", "insights", "analysis", "macro research"]
  },

  // ==========================================
  // 2. INSTITUTIONAL TRADING TOOLS (10 TOOLS)
  // ==========================================
  {
    id: "tool-trading-bot",
    title: "AI Trading Signals & Copilot Terminal",
    subtitle: "Autonomous algorithmic momentum detection and risk-adjusted crypto trade setups",
    category: "Tools",
    href: "/tools/trading-bot",
    icon: Activity,
    badge: "TOOL",
    keywords: ["trading-bot", "ai bot", "trading bot tool", "signals tool", "automated trading", "bot signals"]
  },
  {
    id: "tool-chart-terminal",
    title: "TradingView Pro Chart & Technical Radar",
    subtitle: "High-frequency multi-timeframe candlestick terminal with institutional oscillator overlays",
    category: "Tools",
    href: "/tools/chart-terminal",
    icon: LineChart,
    badge: "PRO CHART",
    keywords: ["chart", "chart-terminal", "tradingview", "candlesticks", "technical analysis", "rsi", "macd", "ema", "indicators"]
  },
  {
    id: "tool-dca-simulator",
    title: "Dollar-Cost Averaging (DCA) Multi-Asset Simulator",
    subtitle: "Backtest systematic accumulation schedules against historical market cycles and lump-sum investing",
    category: "Tools",
    href: "/tools/dca-simulator",
    icon: Calculator,
    badge: "BACKTEST",
    keywords: ["dca", "dca simulator", "dca calculator", "dollar cost average", "recurring buy", "accumulation", "dca-simulator"]
  },
  {
    id: "tool-position-sizer",
    title: "Institutional Risk & Position Sizing Calculator",
    subtitle: "Kelly Criterion and Average True Range (ATR) margin and risk management copilot",
    category: "Tools",
    href: "/tools/position-sizer",
    icon: Sliders,
    badge: "RISK DESK",
    keywords: ["position sizer", "position-sizer", "risk calculator", "position size", "margin calculator", "kelly criterion", "atr risk"]
  },
  {
    id: "tool-crypto-converter",
    title: "Real-Time Crypto Currency & Fiat Converter",
    subtitle: "Instant sub-second conversion between 50+ digital assets and global fiat currencies (USD, EUR, GBP, JPY)",
    category: "Tools",
    href: "/tools/crypto-converter",
    icon: Coins,
    badge: "FIAT / CRYPTO",
    keywords: ["converter", "crypto converter", "crypto-converter", "currency converter", "btc to usd", "eth to usd", "fiat exchange rate"]
  },
  {
    id: "tool-liquidation-heatmap",
    title: "CoinGlass Liquidation Heatmap & Squeeze Radar",
    subtitle: "2D spectrogram liquidation heatmap, resting depth ladder, and top 10 squeeze hazard screener",
    category: "Tools",
    href: "/tools/liquidation-heatmap",
    icon: Flame,
    badge: "2D HEATMAP",
    keywords: ["liquidation heatmap", "liquidation-heatmap", "liquidation", "short squeeze", "spectrogram", "liquidation radar", "coinglass heatmap", "wipeouts", "cascades", "bankruptcy price", "liquidation clusters"]
  },
  {
    id: "tool-fear-greed",
    title: "Crypto Fear & Greed Index Live Multi-Asset Sentiment Radar",
    subtitle: "Track real-time market psychology, social volume momentum, and multi-cycle sentiment extremes",
    category: "Tools",
    href: "/tools/fear-greed-index",
    icon: Radio,
    badge: "0-100 GAUGE",
    keywords: ["fear and greed", "fear-greed-index", "fear greed", "sentiment", "market psychology", "extreme fear", "extreme greed"]
  },
  {
    id: "tool-profit-calculator",
    title: "Crypto Profit / Loss & Leverage ROI Calculator",
    subtitle: "Calculate net return on investment, leverage multipliers, maker/taker fees, and target exit prices",
    category: "Tools",
    href: "/tools/profit-calculator",
    icon: Calculator,
    badge: "ROI & FEES",
    keywords: ["profit calculator", "profit-calculator", "pnl", "roi calculator", "leverage profit", "crypto fee calculator", "crypto pnl"]
  },
  {
    id: "tool-funding-screener",
    title: "CoinGlass Perpetual Funding Rate Screener & Basis Arbitrage Radar",
    subtitle: "Scan real-time CoinGlass 8-hour funding rates and basis spreads across Binance, Bybit, OKX, and Deribit",
    category: "Tools",
    href: "/tools/funding-rate-screener",
    icon: Percent,
    badge: "BASIS APY",
    keywords: ["funding rate screener", "funding-rate-screener", "funding rates", "basis arbitrage", "cash and carry", "8h funding", "negative funding"]
  },
  {
    id: "tool-whale-tracker",
    title: "Crypto Whale Orders & Smart Money Flow Radar",
    subtitle: "Scan resting whale limit orders, block trade executions, and institutional CVD delta",
    category: "Tools",
    href: "/tools/whale-tracker",
    icon: Fish,
    badge: "WHALE DESK",
    keywords: ["whale tracker", "whale-tracker", "whale tool", "smart money tool", "large orders", "whale scanner"]
  },

  // ==========================================
  // 3. TOP CRYPTOCURRENCY AI PRICE PREDICTIONS (36 ASSETS)
  // ==========================================
  {
    id: "pred-btc",
    title: "Bitcoin (BTC) AI Price Prediction",
    subtitle: "Quantitative 24h, 7d & 30d forecast targets, post-halving supply shock & institutional ETF model",
    category: "Predictions",
    href: "/predictions/bitcoin",
    icon: Brain,
    badge: "$120K-$150K",
    keywords: ["bitcoin", "btc", "bitcoin prediction", "btc price target", "btc prediction", "bitcoin forecast", "xbt"]
  },
  {
    id: "pred-eth",
    title: "Ethereum (ETH) AI Price Prediction",
    subtitle: "Smart contract settlement layer, Layer-2 rollup gas burns, and institutional ETF inflows",
    category: "Predictions",
    href: "/predictions/ethereum",
    icon: Brain,
    badge: "$4.5K-$5.5K",
    keywords: ["ethereum", "eth", "ethereum prediction", "eth forecast", "ether", "eth price target"]
  },
  {
    id: "pred-sol",
    title: "Solana (SOL) AI Price Prediction",
    subtitle: "High-throughput parallelized execution L1, DEX trading velocity, and institutional expansion",
    category: "Predictions",
    href: "/predictions/solana",
    icon: Brain,
    badge: "$250-$350",
    keywords: ["solana", "sol", "solana prediction", "sol forecast", "sol price target"]
  },
  {
    id: "pred-bnb",
    title: "BNB / Binance Coin (BNB) AI Price Prediction",
    subtitle: "Binance ecosystem utility, quarterly auto-burn mechanics, and BSC DeFi momentum",
    category: "Predictions",
    href: "/predictions/binancecoin",
    icon: Brain,
    badge: "$800+",
    keywords: ["bnb", "binance coin", "binancecoin", "bnb prediction", "bnb forecast"]
  },
  {
    id: "pred-xrp",
    title: "XRP / Ripple (XRP) AI Price Prediction",
    subtitle: "Cross-border institutional liquidity settlement, SEC regulatory resolution, and XRPL adoption",
    category: "Predictions",
    href: "/predictions/ripple",
    icon: Brain,
    badge: "$3.00+",
    keywords: ["xrp", "ripple", "xrp prediction", "ripple prediction", "xrp forecast"]
  },
  {
    id: "pred-doge",
    title: "Dogecoin (DOGE) AI Price Prediction",
    subtitle: "Decentralized peer-to-peer payment currency, liquidity cycles, and social volume velocity",
    category: "Predictions",
    href: "/predictions/dogecoin",
    icon: Brain,
    badge: "$0.40+",
    keywords: ["doge", "dogecoin", "doge prediction", "dogecoin forecast"]
  },
  {
    id: "pred-ada",
    title: "Cardano (ADA) AI Price Prediction",
    subtitle: "Peer-reviewed academic UTXO smart contract architecture and Chang governance expansion",
    category: "Predictions",
    href: "/predictions/cardano",
    icon: Brain,
    badge: "$1.20+",
    keywords: ["cardano", "ada", "cardano prediction", "ada forecast"]
  },
  {
    id: "pred-sui",
    title: "Sui (SUI) AI Price Prediction",
    subtitle: "Move programming language parallel execution engine and next-gen gaming/DeFi throughput",
    category: "Predictions",
    href: "/predictions/sui",
    icon: Brain,
    badge: "$5.00+",
    keywords: ["sui", "sui network", "sui prediction", "sui forecast"]
  },
  {
    id: "pred-avax",
    title: "Avalanche (AVAX) AI Price Prediction",
    subtitle: "Custom Subnet architecture, real-world asset (RWA) tokenization, and institutional subnets",
    category: "Predictions",
    href: "/predictions/avalanche",
    icon: Brain,
    badge: "$55+",
    keywords: ["avalanche", "avax", "avalanche prediction", "avax forecast"]
  },
  {
    id: "pred-link",
    title: "Chainlink (LINK) AI Price Prediction",
    subtitle: "Cross-Chain Interoperability Protocol (CCIP) and global financial institution oracle standard",
    category: "Predictions",
    href: "/predictions/chainlink",
    icon: Brain,
    badge: "$30+",
    keywords: ["chainlink", "link", "chainlink prediction", "link forecast", "ccip"]
  },
  {
    id: "pred-tao",
    title: "Bittensor (TAO) AI Price Prediction",
    subtitle: "Decentralized machine learning intelligence networks and decentralized AI subnets",
    category: "Predictions",
    href: "/predictions/bittensor",
    icon: Brain,
    badge: "AI LEADER",
    keywords: ["bittensor", "tao", "bittensor prediction", "tao forecast", "decentralized ai"]
  },
  {
    id: "pred-near",
    title: "NEAR Protocol (NEAR) AI Price Prediction",
    subtitle: "Nightshade dynamic sharding and user-owned AI infrastructure roadmap",
    category: "Predictions",
    href: "/predictions/near",
    icon: Brain,
    badge: "$10+",
    keywords: ["near", "near protocol", "near prediction", "near forecast"]
  },
  {
    id: "pred-render",
    title: "Render (RENDER) AI Price Prediction",
    subtitle: "Decentralized GPU compute network for 3D rendering, generative AI, and spatial computing",
    category: "Predictions",
    href: "/predictions/render",
    icon: Brain,
    badge: "GPU COMPUTE",
    keywords: ["render", "rndr", "render prediction", "gpu compute"]
  },
  {
    id: "pred-apt",
    title: "Aptos (APT) AI Price Prediction",
    subtitle: "Move language high-frequency Layer 1 with Block-STM parallel execution engine",
    category: "Predictions",
    href: "/predictions/aptos",
    icon: Brain,
    badge: "$18+",
    keywords: ["aptos", "apt", "aptos prediction", "apt forecast"]
  },
  {
    id: "pred-dot",
    title: "Polkadot (DOT) AI Price Prediction",
    subtitle: "Heterogeneous multichain interoperability, Agile Coretime, and Polkadot 2.0 architecture",
    category: "Predictions",
    href: "/predictions/polkadot",
    icon: Brain,
    badge: "$12+",
    keywords: ["polkadot", "dot", "polkadot prediction", "dot forecast"]
  },
  {
    id: "pred-pepe",
    title: "Pepe (PEPE) AI Price Prediction",
    subtitle: "Ethereum native meme coin liquidity giant and retail speculative momentum proxy",
    category: "Predictions",
    href: "/predictions/pepe",
    icon: Brain,
    badge: "MEME GIANT",
    keywords: ["pepe", "pepe prediction", "pepe coin", "pepe forecast"]
  },
  {
    id: "pred-shib",
    title: "Shiba Inu (SHIB) AI Price Prediction",
    subtitle: "Shibarium Layer-2 scaling network and automated token burn mechanisms",
    category: "Predictions",
    href: "/predictions/shiba-inu",
    icon: Brain,
    badge: "SHIBARIUM",
    keywords: ["shiba", "shiba inu", "shib", "shiba prediction"]
  },
  {
    id: "pred-kas",
    title: "Kaspa (KAS) AI Price Prediction",
    subtitle: "BlockDAG GHOSTDAG proof-of-work protocol with instant confirmation velocity",
    category: "Predictions",
    href: "/predictions/kaspa",
    icon: Brain,
    badge: "BLOCKDAG",
    keywords: ["kaspa", "kas", "kaspa prediction", "kas forecast", "ghostdag"]
  },
  {
    id: "pred-ton",
    title: "Toncoin (TON) AI Price Prediction",
    subtitle: "Telegram messaging integration, mini-app ecosystem, and 900M+ global user distribution",
    category: "Predictions",
    href: "/predictions/toncoin",
    icon: Brain,
    badge: "TELEGRAM L1",
    keywords: ["ton", "toncoin", "ton prediction", "telegram crypto"]
  },
  {
    id: "pred-inj",
    title: "Injective (INJ) AI Price Prediction",
    subtitle: "Interoperable decentralized exchange Layer-1 optimized for institutional derivatives trading",
    category: "Predictions",
    href: "/predictions/injective",
    icon: Brain,
    badge: "DEFI PERPS",
    keywords: ["injective", "inj", "injective prediction", "inj forecast"]
  },
  {
    id: "pred-fet",
    title: "Fetch.ai / ASI (FET) AI Price Prediction",
    subtitle: "Artificial Superintelligence Alliance autonomous AI agents and decentralized machine economy",
    category: "Predictions",
    href: "/predictions/fetch-ai",
    icon: Brain,
    badge: "ASI ALLIANCE",
    keywords: ["fetch", "fetch.ai", "fet", "asi", "artificial superintelligence", "fetch prediction"]
  },
  {
    id: "pred-xmr",
    title: "Monero (XMR) AI Price Prediction",
    subtitle: "Privacy-preserving cryptocurrency with RingCT, stealth addresses, and confidential transactions",
    category: "Predictions",
    href: "/predictions/monero",
    icon: Brain,
    badge: "PRIVACY L1",
    keywords: ["monero", "xmr", "monero prediction", "privacy crypto"]
  },
  {
    id: "pred-ltc",
    title: "Litecoin (LTC) AI Price Prediction",
    subtitle: "Proof-of-work transactional silver with 100% historical network uptime and MWEB privacy",
    category: "Predictions",
    href: "/predictions/litecoin",
    icon: Brain,
    badge: "POW SILVER",
    keywords: ["litecoin", "ltc", "litecoin prediction", "ltc forecast"]
  },
  {
    id: "pred-arb",
    title: "Arbitrum (ARB) AI Price Prediction",
    subtitle: "Leading Ethereum Optimistic Rollup with dominant TVL, Nitro execution, and Orbit sub-chains",
    category: "Predictions",
    href: "/predictions/arbitrum",
    icon: Brain,
    badge: "ETH L2",
    keywords: ["arbitrum", "arb", "arbitrum prediction", "ethereum l2"]
  },
  {
    id: "pred-op",
    title: "Optimism (OP) AI Price Prediction",
    subtitle: "OP Stack Superchain framework powering Base, World Chain, and decentralized scaling",
    category: "Predictions",
    href: "/predictions/optimism",
    icon: Brain,
    badge: "SUPERCHAIN",
    keywords: ["optimism", "op", "optimism prediction", "superchain"]
  },
  {
    id: "pred-hbar",
    title: "Hedera (HBAR) AI Price Prediction",
    subtitle: "Hashgraph enterprise distributed consensus technology and Global Governing Council adoption",
    category: "Predictions",
    href: "/predictions/hedera",
    icon: Brain,
    badge: "HASHGRAPH",
    keywords: ["hedera", "hbar", "hedera prediction", "hashgraph"]
  },
  {
    id: "pred-atom",
    title: "Cosmos (ATOM) AI Price Prediction",
    subtitle: "Internet of Blockchains Inter-Blockchain Communication (IBC) protocol and ICS security",
    category: "Predictions",
    href: "/predictions/cosmos",
    icon: Brain,
    badge: "IBC INTEROP",
    keywords: ["cosmos", "atom", "cosmos prediction", "ibc"]
  },
  {
    id: "pred-ftm",
    title: "Fantom / Sonic (FTM) AI Price Prediction",
    subtitle: "Sonic high-speed EVM upgrade delivering 10,000 TPS and sub-second deterministic finality",
    category: "Predictions",
    href: "/predictions/fantom",
    icon: Brain,
    badge: "SONIC EVM",
    keywords: ["fantom", "ftm", "sonic", "fantom prediction"]
  },
  {
    id: "pred-sei",
    title: "Sei (SEI) AI Price Prediction",
    subtitle: "Parallelized EVM Layer-1 optimized for high-speed decentralized exchange trading and orderbooks",
    category: "Predictions",
    href: "/predictions/sei",
    icon: Brain,
    badge: "PARALLEL EVM",
    keywords: ["sei", "sei network", "sei prediction"]
  },
  {
    id: "pred-wld",
    title: "Worldcoin (WLD) AI Price Prediction",
    subtitle: "Proof of Personhood biometric protocol and global human verification network in the AI era",
    category: "Predictions",
    href: "/predictions/worldcoin",
    icon: Brain,
    badge: "WORLD ID",
    keywords: ["worldcoin", "wld", "worldcoin prediction", "proof of personhood"]
  },
  {
    id: "pred-tia",
    title: "Celestia (TIA) AI Price Prediction",
    subtitle: "Modular blockchain data availability (DA) layer powering rollups and sovereign chains",
    category: "Predictions",
    href: "/predictions/celestia",
    icon: Brain,
    badge: "MODULAR DA",
    keywords: ["celestia", "tia", "celestia prediction", "modular crypto"]
  },
  {
    id: "pred-jup",
    title: "Jupiter (JUP) AI Price Prediction",
    subtitle: "Leading Solana DEX liquidity aggregator, perpetual exchange, and launchpad engine",
    category: "Predictions",
    href: "/predictions/jupiter",
    icon: Brain,
    badge: "SOLANA DEX",
    keywords: ["jupiter", "jup", "jupiter prediction", "solana dex"]
  },
  {
    id: "pred-ondo",
    title: "Ondo Finance (ONDO) AI Price Prediction",
    subtitle: "Institutional-grade tokenized US Treasuries and Real World Asset (RWA) liquidity infrastructure",
    category: "Predictions",
    href: "/predictions/ondo",
    icon: Brain,
    badge: "RWA TREASURY",
    keywords: ["ondo", "ondo finance", "ondo prediction", "rwa", "tokenized treasuries"]
  },
  {
    id: "pred-pol",
    title: "Polygon (POL) AI Price Prediction",
    subtitle: "Zero-Knowledge AggLayer multichain aggregation protocol and Polygon PoS scaling",
    category: "Predictions",
    href: "/predictions/polygon",
    icon: Brain,
    badge: "ZK AGGLAYER",
    keywords: ["polygon", "matic", "pol", "polygon prediction", "agglayer"]
  },

  // ==========================================
  // 4. TRADING CONCEPTS & MASTERCLASSES (12 GUIDES)
  // ==========================================
  {
    id: "concept-orderbook",
    title: "Order Book Microstructure & Central Limit Depth",
    subtitle: "Master Level-2 order books, matching engines, resting liquidity walls, and market impact",
    category: "Concepts",
    href: "/concepts/order-book-microstructure-and-depth",
    icon: Compass,
    badge: "MICROSTRUCTURE",
    keywords: ["order book microstructure", "clob guide", "orderbook depth", "limit orders", "bid ask spread", "market depth"]
  },
  {
    id: "concept-funding",
    title: "Perpetual Funding Rates & Basis Trading Strategy",
    subtitle: "How 8-hour funding rates balance spot and perp markets, and how to execute delta-neutral cash-and-carry trades",
    category: "Concepts",
    href: "/concepts/crypto-funding-rates-and-basis-trading",
    icon: Compass,
    badge: "BASIS TRADING",
    keywords: ["funding rate guide", "basis trading", "cash and carry", "perpetual futures", "funding rate arbitrage"]
  },
  {
    id: "concept-dca",
    title: "Dollar-Cost Averaging (DCA) Mathematical Models & Backtests",
    subtitle: "Geometric vs linear accumulation, volatility reduction math, and cycle timing optimizations",
    category: "Concepts",
    href: "/concepts/dollar-cost-averaging-dca-math-and-models",
    icon: Compass,
    badge: "QUANT DCA",
    keywords: ["dca guide", "dollar cost averaging math", "accumulation model", "dca vs lump sum"]
  },
  {
    id: "concept-cpi",
    title: "US CPI Inflation & Crypto Volatility Correlation",
    subtitle: "How Consumer Price Index prints, real yields, and Federal Reserve policy drive Bitcoin liquidity cycles",
    category: "Concepts",
    href: "/concepts/cpi-inflation-crypto-volatility-correlation",
    icon: Compass,
    badge: "MACRO MATH",
    keywords: ["cpi correlation", "inflation crypto", "fed rate impact", "macro liquidity"]
  },
  {
    id: "concept-mvrv",
    title: "On-Chain MVRV Z-Score & Cycle Top/Bottom Timing",
    subtitle: "Market Value to Realized Value (MVRV) standard deviations, SOPR, and institutional distribution zones",
    category: "Concepts",
    href: "/concepts/mvrv-z-score-onchain-cycle-tops-bottoms",
    icon: Compass,
    badge: "ON-CHAIN",
    keywords: ["mvrv z score", "on chain metrics", "cycle tops", "realized cap", "sopr"]
  },
  {
    id: "concept-liquidations",
    title: "Liquidation Heatmaps & Short Squeeze Mechanics",
    subtitle: "Why resting leverage pools act as price magnets and how to position ahead of forced cascading buy/sell market orders",
    category: "Concepts",
    href: "/concepts/liquidation-heatmaps-and-short-squeeze-mechanics",
    icon: Compass,
    badge: "SQUEEZE MATH",
    keywords: ["liquidation guide", "short squeeze mechanics", "liquidation heatmap guide", "stop run", "cascade"]
  },
  {
    id: "concept-ycc",
    title: "Yield Curve Control (YCC) & Bitcoin Liquidity Injections",
    subtitle: "Deconstructing central bank bond buybacks, sovereign debt monetization, and fiat debasement",
    category: "Concepts",
    href: "/concepts/yield-curve-control-and-bitcoin-liquidity",
    icon: Compass,
    badge: "DEBASEMENT",
    keywords: ["yield curve control", "ycc", "fiat debasement", "debt monetization", "central bank balance sheet"]
  },
  {
    id: "concept-poui",
    title: "Proof of Useful Inference (PoUI) & Decentralized AI Compute",
    subtitle: "Transforming cryptographic proof-of-work into verifiable machine learning inference and GPU workloads",
    category: "Concepts",
    href: "/concepts/proof-of-useful-inference-decentralized-ai",
    icon: Compass,
    badge: "AI COMPUTE",
    keywords: ["poui", "proof of useful inference", "decentralized compute", "ai mining"]
  },
  {
    id: "concept-cvd",
    title: "Cumulative Volume Delta (CVD) Divergence Trading Strategy",
    subtitle: "Using taker buy/sell volume delta divergences to spot institutional accumulation and absorption bottoms",
    category: "Concepts",
    href: "/concepts/cumulative-volume-delta-cvd-trading-strategy",
    icon: Compass,
    badge: "CVD DELTA",
    keywords: ["cvd", "cumulative volume delta", "cvd divergence", "order flow delta", "volume delta"]
  },
  {
    id: "concept-fear-greed-math",
    title: "Crypto Fear & Greed Index Mathematical Framework",
    subtitle: "Deconstructing the 6 weighted pillars of sentiment analysis and counter-cyclical entry rules",
    category: "Concepts",
    href: "/concepts/crypto-fear-and-greed-index-math-and-cycle-timing",
    icon: Compass,
    badge: "SENTIMENT",
    keywords: ["fear greed math", "sentiment model", "market psychology formula"]
  },
  {
    id: "concept-stock-to-flow",
    title: "Bitcoin Stock-to-Flow vs Global M2 Liquidity Valuation",
    subtitle: "Comparing commodity scarcity models with central bank fiat money supply expansion",
    category: "Concepts",
    href: "/concepts/bitcoin-stock-to-flow-vs-global-m2-liquidity",
    icon: Compass,
    badge: "M2 LIQUIDITY",
    keywords: ["stock to flow", "s2f", "m2 liquidity", "global money supply", "bitcoin valuation"]
  },
  {
    id: "concept-order-flow-footprint",
    title: "Order Flow Imbalance (OFI) & Footprint Chart Analysis",
    subtitle: "Reading bid/ask diagonal imbalances, trapped traders, and high-frequency delta footprints",
    category: "Concepts",
    href: "/concepts/order-flow-imbalance-and-footprint-charts",
    icon: Compass,
    badge: "FOOTPRINT",
    keywords: ["footprint charts", "order flow imbalance", "ofi", "order flow trading"]
  },

  // ==========================================
  // 5. RESEARCH DESK & MACRO WHITEPAPERS (11 PAPERS)
  // ==========================================
  {
    id: "paper-stealth-ycc",
    title: "The Macro Mechanics of 'Stealth' Yield Curve Control",
    subtitle: "How US Treasury duration manipulation, T-bill issuance, and Yen stabilization ignite crypto liquidity",
    category: "Research",
    href: "/blog/stealth-yield-curve-control-macro-mechanics-crypto",
    icon: BookOpen,
    badge: "ARTHUR HAYES",
    keywords: ["stealth ycc", "arthur hayes", "treasury buybacks", "ycc macro", "yellen liquidity", "yen carry trade"]
  },
  {
    id: "paper-hate-rally",
    title: "The Anatomy of a Bitcoin 'Hate Rally' to $150K",
    subtitle: "Why underallocated institutional capital and cynical market consensus generate violent upward expansion",
    category: "Research",
    href: "/blog/bitcoin-hate-rally-dynamics-150k-target",
    icon: BookOpen,
    badge: "150K TARGET",
    keywords: ["hate rally", "150k bitcoin", "institutional fomo", "underallocated funds", "bitcoin supercycle"]
  },
  {
    id: "paper-eth-coiled-spring",
    title: "Ethereum Coiled Spring Thesis: Asymmetric Rotation Mechanics",
    subtitle: "Why multi-year ETH/BTC compression, Layer-2 fee burn resets, and institutional ETF inflows trigger rapid revaluation",
    category: "Research",
    href: "/blog/ethereum-coiled-spring-thesis-asymmetric-rotation",
    icon: BookOpen,
    badge: "ETH ROTATION",
    keywords: ["eth coiled spring", "eth btc ratio", "ethereum rotation", "layer 2 scaling"]
  },
  {
    id: "paper-ethena-usde",
    title: "Ethena USDe Basis Squeeze & Synthetic Dollar Risk Architecture",
    subtitle: "Evaluating delta-neutral cash-and-carry perpetual yields, negative funding contagion, and reserve fund solvency",
    category: "Research",
    href: "/blog/ethena-usde-basis-squeeze-synthetic-dollar-mechanics",
    icon: BookOpen,
    badge: "ETHENA USDE",
    keywords: ["ethena", "usde", "synthetic dollar", "basis squeeze", "negative funding risk", "delta neutral yield"]
  },
  {
    id: "paper-flop-lab-ai",
    title: "The AI Agentic Economy & Decentralized Compute Networks",
    subtitle: "How autonomous AI agents transact on crypto rails and decentralized GPU compute clusters",
    category: "Research",
    href: "/blog/flop-lab-ai-agentic-economy-decentralized-compute",
    icon: BookOpen,
    badge: "AI AGENTS",
    keywords: ["flop lab", "ai agentic economy", "ai agents crypto", "gpu compute", "decentralized compute"]
  },
  {
    id: "paper-post-halving",
    title: "Bitcoin Post-Halving Supply Shock & ETF Inflows",
    subtitle: "Daily issuance reduction vs institutional Wall Street spot ETF structural accumulation dynamics",
    category: "Research",
    href: "/blog/bitcoin-post-halving-supply-shock",
    icon: BookOpen,
    badge: "SUPPLY SHOCK",
    keywords: ["halving", "post halving", "supply shock", "etf inflows", "miner capitulation"]
  },
  {
    id: "paper-order-flow-clustering",
    title: "Understanding Order Flow & Liquidity Clustering",
    subtitle: "How market makers engineer liquidity sweeps around psychological round numbers and stop clusters",
    category: "Research",
    href: "/blog/understanding-order-flow-and-liquidity-clustering",
    icon: BookOpen,
    badge: "ORDER FLOW",
    keywords: ["liquidity clustering", "market maker sweep", "stop hunting", "order flow paper"]
  },
  {
    id: "paper-funding-mechanics",
    title: "Perpetual Funding Rate Mechanics & Market Maker Bias",
    subtitle: "Mathematical modeling of perpetual price divergence, premium index, and institutional positioning",
    category: "Research",
    href: "/blog/funding-rate-mechanics-and-market-bias",
    icon: BookOpen,
    badge: "PERP BASIS",
    keywords: ["funding rate whitepaper", "premium index", "perp basis", "derivatives bias"]
  },
  {
    id: "paper-volatility-atr",
    title: "Volatility Clustering & Average True Range (ATR) Regimes",
    subtitle: "How volatility compression cycles predict asymmetric directional market expansion",
    category: "Research",
    href: "/blog/volatility-clustering-and-atr-regimes",
    icon: BookOpen,
    badge: "ATR REGIMES",
    keywords: ["volatility clustering", "atr", "volatility compression", "bollinger squeeze"]
  },
  {
    id: "paper-mvrv-sopr",
    title: "On-Chain Valuation Metrics: MVRV, SOPR & Realized Cap",
    subtitle: "Deconstructing spent output profit ratios, realized cap tiers, and long-term holder behavior",
    category: "Research",
    href: "/blog/on-chain-metrics-mvrv-sopr-explained",
    icon: BookOpen,
    badge: "ON-CHAIN METRICS",
    keywords: ["mvrv paper", "sopr", "realized cap", "on chain valuation", "hodler metrics"]
  },
  {
    id: "paper-leverage-risk",
    title: "Institutional Risk Management Architecture in Leverage Trading",
    subtitle: "Mathematical position sizing, ruin probability reduction, and multi-tier liquidation avoidance",
    category: "Research",
    href: "/blog/risk-management-architecture-in-leverage-trading",
    icon: BookOpen,
    badge: "RISK ARCHITECTURE",
    keywords: ["leverage risk", "ruin probability", "position sizing paper", "risk management"]
  },

  // ==========================================
  // 6. WHALE ORDERS & DERIVATIVES SUB-TABS
  // ==========================================
  {
    id: "whale-cvd-flow",
    title: "Whale Cumulative Volume Delta (CVD) Stream",
    subtitle: "Filter large taker buy vs sell market orders across Binance, Coinbase, and OKX",
    category: "Whale Orders",
    href: "/whale-orders",
    icon: Fish,
    badge: "WHALE CVD",
    keywords: ["whale cvd", "whale delta", "smart money delta", "institutional buying"]
  },
  {
    id: "whale-scatter-map",
    title: "Whale Block Trade Scatter Bubble Radar",
    subtitle: "Visual distribution of $100K+ and $1M+ executed block orders by price and volume",
    category: "Whale Orders",
    href: "/whale-orders",
    icon: Fish,
    badge: "BLOCK TRADES",
    keywords: ["whale scatter", "whale bubbles", "block trade radar", "whale executions"]
  },
  {
    id: "coinglass-open-interest",
    title: "CoinGlass Open Interest (OI) Breakdown by Exchange",
    subtitle: "Track live $68B+ aggregate derivatives open interest across Binance, Bybit, OKX, and CME",
    category: "Derivatives",
    href: "/coinglass?tab=open-interest",
    icon: Flame,
    badge: "OPEN INTEREST",
    keywords: ["open interest", "coinglass oi", "exchange open interest", "derivatives depth", "cme open interest"]
  },
  {
    id: "coinglass-long-short",
    title: "CoinGlass Multi-Exchange Long/Short Ratio Radar",
    subtitle: "Top trader long vs short account positioning, retail sentiment, and taker buy volume delta",
    category: "Derivatives",
    href: "/coinglass?tab=long-short",
    icon: Flame,
    badge: "LONG / SHORT",
    keywords: ["long short ratio", "top trader sentiment", "coinglass long short", "trader ratio"]
  },

  // ==========================================
  // 7. PLATFORM LEGAL, MISSION & INFORMATION
  // ==========================================
  {
    id: "page-about",
    title: "About BitcoinCrypto.tech Platform & Research Desk",
    subtitle: "Platform architecture, methodology, institutional data feeds, and open-access mission",
    category: "Platform",
    href: "/about",
    icon: Info,
    badge: "ABOUT US",
    keywords: ["about", "about us", "mission", "methodology", "architecture", "team", "who we are"]
  },
  {
    id: "page-contact",
    title: "Contact & Support Desk",
    subtitle: "Get in touch with the BitcoinCrypto research desk, engineering, and partnerships team",
    category: "Platform",
    href: "/contact",
    icon: HelpCircle,
    badge: "SUPPORT",
    keywords: ["contact", "support", "help", "email", "feedback", "partnerships", "reach us"]
  },
  {
    id: "page-terms",
    title: "Terms of Service",
    subtitle: "Official terms of service, platform usage rules, and intellectual property terms",
    category: "Platform",
    href: "/terms",
    icon: FileText,
    keywords: ["terms", "terms of service", "tos", "legal", "user agreement"]
  },
  {
    id: "page-privacy",
    title: "Privacy Policy",
    subtitle: "Comprehensive privacy policy, data protection, and GDPR/CCPA compliance standards",
    category: "Platform",
    href: "/privacy",
    icon: Lock,
    keywords: ["privacy", "privacy policy", "data protection", "gdpr", "cookies"]
  },
  {
    id: "page-disclaimer",
    title: "Financial Disclaimer & Risk Disclosure",
    subtitle: "Educational disclaimers, high-risk derivatives trading warnings, and non-financial advice notices",
    category: "Platform",
    href: "/disclaimer",
    icon: ShieldCheck,
    keywords: ["disclaimer", "financial disclaimer", "risk disclosure", "not financial advice", "warnings"]
  },
  {
    id: "page-cookie-policy",
    title: "Cookie Policy",
    subtitle: "Cookie management, tracking preferences, and local storage policy",
    category: "Platform",
    href: "/cookie-policy",
    icon: FileText,
    keywords: ["cookie policy", "cookies", "tracking"]
  }
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut & custom event listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (
        e.key === "/" &&
        !isOpen &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    function handleCustomOpen() {
      setIsOpen(true);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSelectedCategory("ALL");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Comprehensive multi-field smart search scoring
  const filtered = useMemo(() => {
    const rawQ = query.trim().toLowerCase();
    const tokens = rawQ.split(/\s+/).filter(Boolean);

    let items = ALL_SEARCH_ITEMS;

    if (selectedCategory !== "ALL") {
      items = items.filter((item) => item.category.toUpperCase() === selectedCategory.toUpperCase());
    }

    if (tokens.length === 0) {
      // Default curated view when search input is blank
      if (selectedCategory === "ALL") {
        return items.slice(0, 14);
      }
      return items;
    }

    return items
      .map((item) => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const subtitleLower = item.subtitle.toLowerCase();
        const catLower = item.category.toLowerCase();
        const hrefLower = item.href.toLowerCase();
        const kwString = item.keywords.join(" ").toLowerCase();

        // Exact match boosts
        if (titleLower === rawQ) score += 100;
        if (titleLower.startsWith(rawQ)) score += 60;
        if (titleLower.includes(rawQ)) score += 35;
        if (kwString.includes(rawQ)) score += 30;
        if (subtitleLower.includes(rawQ)) score += 15;
        if (catLower.includes(rawQ)) score += 10;
        if (hrefLower.includes(rawQ)) score += 20;

        // Token-by-token matching
        let matchesAllTokens = true;
        for (const token of tokens) {
          const hasToken =
            titleLower.includes(token) ||
            subtitleLower.includes(token) ||
            kwString.includes(token) ||
            catLower.includes(token) ||
            hrefLower.includes(token);

          if (!hasToken) {
            matchesAllTokens = false;
            break;
          } else {
            score += 15;
          }
        }

        return { item, score, matchesAllTokens };
      })
      .filter((res) => res.matchesAllTokens || res.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((res) => res.item);
  }, [query, selectedCategory]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const handleKeyDownNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex].href);
    }
  };

  const CATEGORIES = ["ALL", "Tools", "Predictions", "Whale Orders", "Derivatives", "Markets", "Macro & CPI", "Concepts", "Research", "Platform"];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. SEARCH INPUT HEADER */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/30">
            <Search className="w-5 h-5 text-amber-500" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownNav}
            placeholder="Search all 36+ coins, whale orders, 2D heatmaps, AI signals, tools, CPI, concepts..."
            className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="px-2 py-1 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. CATEGORY PILL FILTER BAR */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50/80 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-none text-xs font-mono">
          {CATEGORIES.map((cat) => {
            const isCatActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1 border ${
                  isCatActive
                    ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 border-amber-400 shadow-sm font-black"
                    : "bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* 3. RESULTS STREAM */}
        <div className="overflow-y-auto p-2 sm:p-3 space-y-1.5 flex-1 scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                  No results found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
                  Try searching for <strong className="text-amber-400 font-mono">Whale Orders</strong>, <strong className="text-amber-400 font-mono">Liquidation Heatmap</strong>, <strong className="text-amber-400 font-mono">BTC</strong>, <strong className="text-amber-400 font-mono">SOL Prediction</strong>, <strong className="text-amber-400 font-mono">CPI</strong>, or <strong className="text-amber-400 font-mono">Order Book</strong>.
                </p>
              </div>
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = selectedIndex === index;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl cursor-pointer transition ${
                    isSelected
                      ? "bg-amber-500/10 dark:bg-amber-500/15 border border-amber-400/40 text-slate-950 dark:text-white shadow-sm"
                      : "hover:bg-slate-50 dark:hover:bg-slate-850/60 text-slate-700 dark:text-slate-300 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition ${
                        isSelected
                          ? "bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/30 scale-105"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-extrabold text-xs sm:text-sm truncate text-slate-900 dark:text-white">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[9.5px] font-mono font-black px-2 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 shadow-xs">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xl">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 ml-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hidden sm:inline border border-slate-200 dark:border-slate-700">
                      {item.category}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? "translate-x-1 text-amber-500" : "text-slate-300 dark:text-slate-600"}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 4. FOOTER KEYBOARD SHORTCUTS */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[9px] font-bold">↑↓</kbd> Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[9px] font-bold">↵</kbd> Open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[9px] font-bold">ESC</kbd> Close
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-bold">
            <span>{filtered.length} indexed results</span>
          </div>
        </div>
      </div>
    </div>
  );
}
