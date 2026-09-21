"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Flame,
  TrendingUp,
  TrendingDown,
  Skull,
  Activity,
  Layers,
  BarChart3,
  ShieldAlert,
  Zap,
  Radio,
  ArrowRight,
  Info,
  Sliders,
  DollarSign,
  Percent,
  CheckCircle2,
  RefreshCw,
  Compass,
  Clock,
  Sparkles,
  AlertTriangle,
  ChevronDown,
  Calculator,
  ShieldCheck,
  Scale,
  Gauge,
  HelpCircle,
  Maximize2,
  Lock,
  PieChart,
  BookOpen,
  Target,
  Workflow,
  Crosshair,
  Award,
  Search,
  ExternalLink,
  ChevronRight,
  Play,
  Cpu
} from "lucide-react";
import LiquidationHeatmapRadar from "@/components/coinglass/LiquidationHeatmapRadar";

export default function CoinGlassLiquidationTool() {
  // 1. Single Position Liquidation Calculator State
  const [calcSide, setCalcSide] = useState<"LONG" | "SHORT">("LONG");
  const [calcEntryPrice, setCalcEntryPrice] = useState<number>(88450);
  const [calcLeverage, setCalcLeverage] = useState<number>(20);
  const [calcPositionSize, setCalcPositionSize] = useState<number>(1.5); // in BTC / base units
  const [calcMaintenanceRate, setCalcMaintenanceRate] = useState<number>(0.4); // 0.4% default MMR

  // Computed Liquidation Metrics
  const {
    notionalValue,
    initialMargin,
    maintenanceMargin,
    liquidationPrice,
    bankruptcyPrice,
    distanceDollar,
    distancePercent,
    riskLevel,
    riskColor
  } = useMemo(() => {
    const notional = calcEntryPrice * calcPositionSize;
    const initMargin = calcLeverage > 0 ? notional / calcLeverage : notional;
    const maintMargin = (notional * calcMaintenanceRate) / 100;

    let liqPrice = 0;
    let bkpPrice = 0;

    if (calcSide === "LONG") {
      // Long Liquidation = Entry Price * (1 - 1/Leverage + MaintenanceMarginRate)
      liqPrice = calcEntryPrice * (1 - (1 / calcLeverage) + (calcMaintenanceRate / 100));
      bkpPrice = calcEntryPrice * (1 - (1 / calcLeverage));
    } else {
      // Short Liquidation = Entry Price * (1 + 1/Leverage - MaintenanceMarginRate)
      liqPrice = calcEntryPrice * (1 + (1 / calcLeverage) - (calcMaintenanceRate / 100));
      bkpPrice = calcEntryPrice * (1 + (1 / calcLeverage));
    }

    const distDol = Math.abs(calcEntryPrice - liqPrice);
    const distPct = (distDol / calcEntryPrice) * 100;

    let rLevel = "Safe / Low Risk";
    let rCol = "text-emerald-500";
    if (distPct <= 2.5) {
      rLevel = "Extreme Flash Liquidation Danger";
      rCol = "text-rose-500 font-black animate-pulse";
    } else if (distPct <= 5) {
      rLevel = "High Squeeze Sensitivity";
      rCol = "text-rose-400 font-bold";
    } else if (distPct <= 10) {
      rLevel = "Moderate Market Volatility Risk";
      rCol = "text-amber-400 font-bold";
    }

    return {
      notionalValue: notional,
      initialMargin: initMargin,
      maintenanceMargin: maintMargin,
      liquidationPrice: Math.max(0, liqPrice),
      bankruptcyPrice: Math.max(0, bkpPrice),
      distanceDollar: distDol,
      distancePercent: distPct,
      riskLevel: rLevel,
      riskColor: rCol,
    };
  }, [calcSide, calcEntryPrice, calcLeverage, calcPositionSize, calcMaintenanceRate]);

  // 2. Coinglass Cascade & Squeeze Simulator State
  const [simCoin, setSimCoin] = useState<"BTC" | "ETH" | "SOL" | "XRP" | "DOGE">("BTC");
  const [simScenario, setSimScenario] = useState<
    "dip-3" | "dump-5" | "cascade-10" | "pop-3" | "squeeze-5" | "rocket-10"
  >("squeeze-5");

  const SIMULATION_SCENARIOS = {
    BTC: {
      basePrice: 88450,
      openInterest: "$36.80B",
      "dip-3": {
        name: "3.0% Long Flush Dip",
        direction: "DOWN",
        shockPct: -3.0,
        targetPrice: 85796,
        liquidatedUsd: "$94.5 Million",
        tiersTriggered: ["100x (at $87,560)", "50x (at $86,680)"],
        nextSupport: "$84,900 (25x Heavy Shelf)",
        marketImpact: "Minor shakeout of ultra-high retail leverage before immediate bounce."
      },
      "dump-5": {
        name: "5.0% Cascading Long Squeeze",
        direction: "DOWN",
        shockPct: -5.0,
        targetPrice: 84027,
        liquidatedUsd: "$248.0 Million",
        tiersTriggered: ["100x", "50x", "25x (at $84,910)"],
        nextSupport: "$81,500 (Primary CME Gap Support)",
        marketImpact: "Aggressive multi-exchange long flush. Market maker bids absorb stop avalanche."
      },
      "cascade-10": {
        name: "10.0% Black Swan Liquidation Waterfall",
        direction: "DOWN",
        shockPct: -10.0,
        targetPrice: 79605,
        liquidatedUsd: "$685.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x (at $79,600)"],
        nextSupport: "$76,500 (Major Macro Demand Anchor)",
        marketImpact: "Total derivatives leverage wipeout. Funding rates reset deeply negative."
      },
      "pop-3": {
        name: "3.0% Short Squeeze Ignition",
        direction: "UP",
        shockPct: 3.0,
        targetPrice: 91103,
        liquidatedUsd: "$118.0 Million",
        tiersTriggered: ["100x (at $89,330)", "50x (at $90,220)"],
        nextSupport: "$91,980 (25x Short Magnet)",
        marketImpact: "Early short sellers forced to buy market orders, igniting rapid upward push."
      },
      "squeeze-5": {
        name: "5.0% Short Squeeze Vacuum Rally",
        direction: "UP",
        shockPct: 5.0,
        targetPrice: 92872,
        liquidatedUsd: "$342.0 Million",
        tiersTriggered: ["100x", "50x", "25x (at $91,980)"],
        nextSupport: "$94,500 (Overhead Liquidity Wall)",
        marketImpact: "Violent short stop-run clears all resting overhead liquidity on Binance and Bybit."
      },
      "rocket-10": {
        name: "10.0% Parabolic Short Annihilation",
        direction: "UP",
        shockPct: 10.0,
        targetPrice: 97295,
        liquidatedUsd: "$890.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x (at $97,300)"],
        nextSupport: "$100,000 (Historic Milestone Zone)",
        marketImpact: "Historic short squeeze cascade. All resting derivatives resistance evaporated."
      }
    },
    ETH: {
      basePrice: 3140,
      openInterest: "$15.40B",
      "dip-3": {
        name: "3.0% Long Flush Dip",
        direction: "DOWN",
        shockPct: -3.0,
        targetPrice: 3045,
        liquidatedUsd: "$42.0 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$3,014 (25x Support Shelf)",
        marketImpact: "Standard retest of $3,050 psychological support level."
      },
      "dump-5": {
        name: "5.0% Cascading Long Squeeze",
        direction: "DOWN",
        shockPct: -5.0,
        targetPrice: 2983,
        liquidatedUsd: "$115.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$2,880 (Institutional Value Zone)",
        marketImpact: "Key $3,000 round level swept clean of leveraged retail long stops."
      },
      "cascade-10": {
        name: "10.0% Black Swan Liquidation Waterfall",
        direction: "DOWN",
        shockPct: -10.0,
        targetPrice: 2826,
        liquidatedUsd: "$310.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$2,650 (Macro Rolling Demand)",
        marketImpact: "Severe DeFi collateral deleveraging. Staking basis spreads widen temporarily."
      },
      "pop-3": {
        name: "3.0% Short Squeeze Ignition",
        direction: "UP",
        shockPct: 3.0,
        targetPrice: 3234,
        liquidatedUsd: "$58.0 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$3,265 (25x Short Cluster)",
        marketImpact: "Perpetual funding rate flips positive as shorts rush to exit."
      },
      "squeeze-5": {
        name: "5.0% Short Squeeze Vacuum Rally",
        direction: "UP",
        shockPct: 5.0,
        targetPrice: 3297,
        liquidatedUsd: "$165.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$3,450 (10x Heavy Resistance)",
        marketImpact: "Massive short covering triggers fast liquidity wick into $3,300+ territory."
      },
      "rocket-10": {
        name: "10.0% Parabolic Short Annihilation",
        direction: "UP",
        shockPct: 10.0,
        targetPrice: 3454,
        liquidatedUsd: "$430.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$3,600 (Ecosystem Peak Band)",
        marketImpact: "Unprecedented spot ETF and perp squeeze clears all high-timeframe shorts."
      }
    },
    SOL: {
      basePrice: 198.5,
      openInterest: "$5.20B",
      "dip-3": {
        name: "3.0% Long Flush Dip",
        direction: "DOWN",
        shockPct: -3.0,
        targetPrice: 192.5,
        liquidatedUsd: "$18.5 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$190.5 (25x Support)",
        marketImpact: "Quick rinse of leveraged meme token and DEX day-traders."
      },
      "dump-5": {
        name: "5.0% Cascading Long Squeeze",
        direction: "DOWN",
        shockPct: -5.0,
        targetPrice: 188.5,
        liquidatedUsd: "$48.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$178.6 (10x Macro Base)",
        marketImpact: "Sub-$190 flush liquidates over 2,500 retail margin accounts."
      },
      "cascade-10": {
        name: "10.0% Black Swan Liquidation Waterfall",
        direction: "DOWN",
        shockPct: -10.0,
        targetPrice: 178.6,
        liquidatedUsd: "$125.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$165.0 (High Volume Node)",
        marketImpact: "Full reset of Solana DEX margin leverage across Bybit and Binance."
      },
      "pop-3": {
        name: "3.0% Short Squeeze Ignition",
        direction: "UP",
        shockPct: 3.0,
        targetPrice: 204.4,
        liquidatedUsd: "$26.0 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$206.4 (25x Short Magnet)",
        marketImpact: "Breakout past $200 psychological barrier sparks aggressive FOMO."
      },
      "squeeze-5": {
        name: "5.0% Short Squeeze Vacuum Rally",
        direction: "UP",
        shockPct: 5.0,
        targetPrice: 208.4,
        liquidatedUsd: "$68.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$218.3 (10x Liquidation Magnet)",
        marketImpact: "Shorts trapped below $200 fuel rapid expansion to new local highs."
      },
      "rocket-10": {
        name: "10.0% Parabolic Short Annihilation",
        direction: "UP",
        shockPct: 10.0,
        targetPrice: 218.3,
        liquidatedUsd: "$175.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$235.0 (Historical Range High)",
        marketImpact: "Violent upward short squeeze cascades across all major altcoin pairs."
      }
    },
    XRP: {
      basePrice: 2.52,
      openInterest: "$3.68B",
      "dip-3": {
        name: "3.0% Long Flush Dip",
        direction: "DOWN",
        shockPct: -3.0,
        targetPrice: 2.44,
        liquidatedUsd: "$12.0 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$2.42 (25x Support)",
        marketImpact: "Healthy consolidation clearing short-term momentum longs."
      },
      "dump-5": {
        name: "5.0% Cascading Long Squeeze",
        direction: "DOWN",
        shockPct: -5.0,
        targetPrice: 2.39,
        liquidatedUsd: "$32.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$2.26 (10x Support Base)",
        marketImpact: "Sweeps stop clusters placed below recent swing lows."
      },
      "cascade-10": {
        name: "10.0% Black Swan Liquidation Waterfall",
        direction: "DOWN",
        shockPct: -10.0,
        targetPrice: 2.26,
        liquidatedUsd: "$85.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$2.10 (Macro Level)",
        marketImpact: "Full reset of retail open interest across cross-border trading desks."
      },
      "pop-3": {
        name: "3.0% Short Squeeze Ignition",
        direction: "UP",
        shockPct: 3.0,
        targetPrice: 2.59,
        liquidatedUsd: "$16.0 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$2.62 (25x Short Magnet)",
        marketImpact: "Shorts hedging spot holdings forced to buy back perps."
      },
      "squeeze-5": {
        name: "5.0% Short Squeeze Vacuum Rally",
        direction: "UP",
        shockPct: 5.0,
        targetPrice: 2.64,
        liquidatedUsd: "$44.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$2.77 (10x Short Target)",
        marketImpact: "Rapid expansion through multi-month resistance shelves."
      },
      "rocket-10": {
        name: "10.0% Parabolic Short Annihilation",
        direction: "UP",
        shockPct: 10.0,
        targetPrice: 2.77,
        liquidatedUsd: "$110.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$3.00 (Major Multi-Year Objective)",
        marketImpact: "Parabolic squeeze triggers global derivatives circuit-breaker limit bounds."
      }
    },
    DOGE: {
      basePrice: 0.238,
      openInterest: "$2.45B",
      "dip-3": {
        name: "3.0% Long Flush Dip",
        direction: "DOWN",
        shockPct: -3.0,
        targetPrice: 0.2308,
        liquidatedUsd: "$8.5 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$0.228 (25x Support)",
        marketImpact: "Standard intra-day flush of high-frequency retail long orders."
      },
      "dump-5": {
        name: "5.0% Cascading Long Squeeze",
        direction: "DOWN",
        shockPct: -5.0,
        targetPrice: 0.2261,
        liquidatedUsd: "$24.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$0.214 (10x Support)",
        marketImpact: "Violent long shakeout before market maker absorption."
      },
      "cascade-10": {
        name: "10.0% Black Swan Liquidation Waterfall",
        direction: "DOWN",
        shockPct: -10.0,
        targetPrice: 0.2142,
        liquidatedUsd: "$68.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$0.198 (Key Demand Block)",
        marketImpact: "Heavy memecoin liquidation waterfall resets open interest."
      },
      "pop-3": {
        name: "3.0% Short Squeeze Ignition",
        direction: "UP",
        shockPct: 3.0,
        targetPrice: 0.2451,
        liquidatedUsd: "$14.0 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$0.247 (25x Short Magnet)",
        marketImpact: "Breakout momentum draws in aggressive algorithmic buying."
      },
      "squeeze-5": {
        name: "5.0% Short Squeeze Vacuum Rally",
        direction: "UP",
        shockPct: 5.0,
        targetPrice: 0.2499,
        liquidatedUsd: "$38.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$0.261 (10x Magnet)",
        marketImpact: "Fast short squeeze toward the key $0.25 psychological hurdle."
      },
      "rocket-10": {
        name: "10.0% Parabolic Short Annihilation",
        direction: "UP",
        shockPct: 10.0,
        targetPrice: 0.2618,
        liquidatedUsd: "$95.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$0.285 (Macro Swing High)",
        marketImpact: "Massive meme token squeeze triggers viral social media trading surge."
      }
    }
  };

  const activeSimulation = SIMULATION_SCENARIOS[simCoin][simScenario];

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const liquidationFundamentals = [
    {
      title: "Coinglass Orderbook Mechanics & Liquidity Magnetism",
      badge: "Market Microstructure",
      icon: Layers,
      desc: "Stop-losses and liquidation orders placed by leveraged retail traders act as non-discretionary market orders upon triggering. Market makers, proprietary trading desks, and high-frequency algorithms (HFTs) treat these dense stop clusters as high-liquidity execution zones to fill multi-million dollar positions with minimal slippage.",
      takeaways: [
        "Resting stops above resistance create upward short-squeeze vacuum zones.",
        "Resting stops below support create cascading long-flush downward avalanches.",
        "Price moves toward high-density liquidation pools due to natural orderbook magnetism."
      ]
    },
    {
      title: "Coinglass Funding Rate Disparity & Squeeze Dynamics",
      badge: "Perpetual Derivatives",
      icon: Zap,
      desc: "Funding rates represent the periodic cash transfer between perpetual contract holders and spot index prices. Extreme positive funding (>0.05% per 8h) reflects overcrowded long speculation ripe for a sharp downward flush, while deeply negative funding (<-0.03% per 8h) signals aggressive short crowding susceptible to violent upside short squeezes.",
      takeaways: [
        "Negative funding rates force short sellers to pay longs every 8 hours.",
        "A sudden spot bid triggers short liquidations, creating buy orders that rapidly push price higher.",
        "Perpetual basis divergence provides early warning before major cascade events."
      ]
    },
    {
      title: "Coinglass Open Interest (OI) vs Volume Divergence",
      badge: "Macro Flow Analysis",
      icon: Activity,
      desc: "Open Interest (OI) tracks the total nominal dollar value of all open, unsettled futures contracts. When OI reaches all-time highs while spot trading volume declines, the market structure becomes hyper-fragile. Even a minor 1-2% spot movement can trigger a multi-hundred million dollar liquidation waterfall.",
      takeaways: [
        "Rising OI + Rising Price = Strong trend fueled by active institutional capital.",
        "Rising OI + Stagnant Price = Massive leveraged buildup awaiting volatility expansion.",
        "Crashing OI + Price Spike = Pure liquidation cascade and stop-loss exhaustion."
      ]
    },
    {
      title: "Exchange Liquidation Engines & Risk Protocols",
      badge: "Institutional Execution",
      icon: ShieldCheck,
      desc: "Top derivatives exchanges employ distinct risk management engines. Binance uses an automated Smart Liquidation engine backed by a multi-billion dollar SAFU insurance fund; Bybit utilizes dual-price mark pricing to prevent flash wick liquidations; OKX implements tiered partial margin reductions to minimize full account wipeouts.",
      takeaways: [
        "Mark Price (Index-weighted) triggers liquidations, not the Last Traded Price (LTP).",
        "Exchange Insurance Funds absorb bankrupt position deficits to prevent Auto-Deleveraging (ADL).",
        "Tiered Maintenance Margin requirements scale upward as position sizes increase."
      ]
    }
  ];

  const tradingStrategies = [
    {
      name: "Strategy 1: The Coinglass Liquidation Pool Sweep (Fade the Stop Run)",
      type: "Mean Reversion / Liquidity Hunter",
      badge: "High Probability (72% Win Rate)",
      icon: Crosshair,
      color: "border-amber-500/40 bg-amber-500/5",
      overview: "Identify dense yellow liquidation bands on the Coinglass heatmap resting just beyond obvious support or resistance levels. Instead of trading the breakout, wait for institutional market makers to engineer a liquidity sweep through the cluster.",
      steps: [
        "Locate a major golden-yellow liquidation pool (> $50M nominal volume) on the 24h/7d Coinglass Heatmap.",
        "Wait for price to spike into the yellow cluster and trigger massive forced market orders (visible via real-time liquidation tape).",
        "Observe the 1-minute to 5-minute candle: look for a long rejection wick (e.g. Pin Bar or SFP - Swing Failure Pattern) accompanied by delta volume absorption.",
        "Enter in the opposite direction of the sweep immediately after the candle closes back inside the previous trading range.",
        "Set Stop-Loss strictly beyond the wick extreme and target the opposing unswept liquidity shelf on the Coinglass map."
      ],
      proTip: "Never front-run a large yellow liquidation cluster. Always let the liquidation wave hit first to ensure market maker filling is complete."
    },
    {
      name: "Strategy 2: The Coinglass Squeeze Momentum Breakout (Ride the Cascade)",
      type: "Trend Following / Volatility Expansion",
      badge: "High Asymmetric R:R (1:4+)",
      icon: Zap,
      color: "border-emerald-500/40 bg-emerald-500/5",
      overview: "When aggregate Coinglass Open Interest reaches record highs and price consolidates in a tight multi-day coiling pattern, a multi-tier liquidation cascade is guaranteed upon breakout.",
      steps: [
        "Confirm that Open Interest on Coinglass has expanded for 3+ consecutive days while 24h Realized Volatility has contracted.",
        "Identify stacked liquidation tiers on the Coinglass Heatmap: 100x -> 50x -> 25x -> 10x all positioned in the same directional vector.",
        "Place a Stop-Market breakout entry order 0.2% beyond the first major liquidation cluster trigger point.",
        "As soon as the initial cluster triggers, the forced market orders will cascade through subsequent leverage tiers with extreme velocity.",
        "Trail your stop-loss closely behind each newly breached tier and exit when Coinglass liquidation volume shows exhaustion."
      ],
      proTip: "Check that spot CVD (Cumulative Volume Delta) confirms the move; futures-only squeezes without spot backing often retrace rapidly."
    },
    {
      name: "Strategy 3: Coinglass Extreme Funding Rate Cash & Carry Arbitrage",
      type: "Market-Neutral / Delta-Neutral Yield",
      badge: "Low Risk Institutional Play",
      icon: Scale,
      color: "border-blue-500/40 bg-blue-500/5",
      overview: "Harness extreme funding rate anomalies identified on Coinglass to capture risk-free annualized yield or profit from violent funding mean-reversion resets.",
      steps: [
        "Monitor Coinglass Multi-Exchange Funding Rate Heatmaps for annualized rates exceeding +50% APY (or negative <-30% APY).",
        "Buy 1.0 BTC on the Spot Market while simultaneously opening a 1.0 BTC Short position on the Perpetual Futures Market (Delta-Neutral).",
        "Collect the 8-hour funding payouts paid by aggressive retail long speculators directly into your margin account.",
        "Alternatively, for directional traders: when funding reaches extreme historical percentiles, prepare to enter counter-trend swing trades as overleveraged participants get wiped out."
      ],
      proTip: "Use isolated margin and keep collateral well above maintenance thresholds to prevent liquidation during temporary price wicks."
    }
  ];

  const exchangeProtocols = [
    {
      exchange: "Binance Futures",
      engine: "Smart Liquidation & Index Mark Price",
      insuranceFund: "$1.8B+ SAFU Buffer",
      adlRisk: "Extremely Low",
      maintenanceMargin: "0.40% - 2.50% Tiered",
      notes: "Uses real-time composite index weighted across 5 major spot exchanges to protect traders from artificial wick manipulation."
    },
    {
      exchange: "Bybit Derivatives",
      engine: "Dual-Price Mechanism & Partial Fill",
      insuranceFund: "$750M+ Dedicated Pool",
      adlRisk: "Low",
      maintenanceMargin: "0.50% - 2.00% Tiered",
      notes: "Liquidation triggers strictly on Mark Price while orders execute against the live Orderbook Last Price."
    },
    {
      exchange: "OKX Perpetual",
      engine: "Stepwise Auto-Deleveraging & Tier Slicing",
      insuranceFund: "$500M+ Collateral Fund",
      adlRisk: "Low / Controlled",
      maintenanceMargin: "0.40% - 3.00% Tiered",
      notes: "Executes partial position reductions to bring maintenance margin back into compliance before enforcing total bankruptcy."
    },
    {
      exchange: "Deribit Options & Perps",
      engine: "Incremental Portfolio Margin Engine",
      insuranceFund: "$250M+ Dedicated BTC/ETH",
      adlRisk: "Moderate on Ultra High Vol",
      maintenanceMargin: "Portfolio Risk Model (SPAN)",
      notes: "Institutional-grade incremental liquidation designed for cross-collateralized options and perpetual contracts."
    },
    {
      exchange: "Hyperliquid & dYdX",
      engine: "On-Chain Tendermint / L1 Liquidation Oracles",
      insuranceFund: "$85M+ Decentralized Vault",
      adlRisk: "Very Low",
      maintenanceMargin: "1.00% - 3.50% Dynamic",
      notes: "Decentralized automated liquidators (keepers) trigger transparent on-chain margin calls powered by low-latency Pyth and native oracles."
    }
  ];

  const glossaryTerms = [
    { term: "Coinglass Liquidation Heatmap", def: "An algorithmic visual spectrogram that models resting leveraged futures positions across multiple exchanges, projecting price zones where mass stop-losses and margin calls will occur." },
    { term: "Mark Price", def: "A fair price calculation derived from an index basket of major spot exchanges, used exclusively to calculate unrealized PnL and trigger liquidations without vulnerability to single-exchange flash crashes." },
    { term: "Maintenance Margin Rate (MMR)", def: "The minimum collateral percentage required by an exchange to keep a leveraged position open. Dropping below MMR triggers immediate automated liquidation." },
    { term: "Bankruptcy Price", def: "The exact price where position losses equal 100% of the initial margin. Exchanges liquidate positions prior to this point to prevent negative account balances." },
    { term: "Auto-Deleveraging (ADL)", def: "A last-resort risk protocol where an exchange automatically closes profitable opposing positions if an insurance fund is unable to absorb bankrupt liquidation deficits during extreme volatility." },
    { term: "SAFU / Insurance Fund", def: "A dedicated multi-million dollar capital pool held by derivatives exchanges to absorb underwater position losses and prevent socialization of trader deficits." },
    { term: "Open Interest (OI)", def: "The total nominal value of all active, unsettled derivative contracts currently held by market participants on a given cryptocurrency." },
    { term: "Long / Short Ratio", def: "A sentiment indicator tracking the proportion of traders or total contract volume positioned long versus positioned short across major exchanges." },
    { term: "Perpetual Funding Rate", def: "A periodic payment mechanism (usually every 8 hours) exchanged between long and short traders to keep perpetual contract prices aligned with spot index prices." },
    { term: "Liquidation Cascade", def: "A chain reaction where triggered liquidations submit market orders that push price further into adjacent stop tiers, triggering even more liquidations in an avalanche effect." },
    { term: "Taker Volume Imbalance", def: "The disparity between aggressive market buy orders and market sell orders hitting resting limit orderbook depth." },
    { term: "Delta-Neutral Basis", def: "A trading strategy holding equal spot long and perpetual short positions to capture pure funding rate yield with zero directional market risk." }
  ];

  const faqs = [
    {
      q: "What is Coinglass Liquidation and how do professional crypto traders use it?",
      a: "Coinglass Liquidation is a premier cryptocurrency derivatives analytics platform and dataset that tracks real-time liquidation data, open interest, multi-exchange funding rates, and predictive liquidation heatmaps across Binance, OKX, Bybit, Deribit, and Coinbase. Professional traders and quantitative hedge funds use Coinglass data to identify high-density liquidity pools, anticipate violent short/long squeezes, avoid entering crowded trades, and execute high-probability mean-reversion trades when market makers sweep retail stop clusters."
    },
    {
      q: "How does the Coinglass Liquidation Heatmap work?",
      a: "The Coinglass Liquidation Heatmap uses an algorithmic model based on historical orderbook depth, open interest expansion, and exchange leverage tiers (100x, 50x, 25x, 10x). It projects the exact price levels where resting stop-losses and margin calls are concentrated. On the visual spectrogram, dark purple/indigo indicates low liquidation volume, cyan indicates moderate liquidity, and bright lime green to golden yellow represents massive multi-million dollar liquidation clusters that act as price magnets."
    },
    {
      q: "Why does Bitcoin price gravitate toward yellow liquidation bands on Coinglass?",
      a: "Because resting liquidation orders and stop-losses become non-discretionary market orders upon execution. Institutional market makers and high-frequency algorithms require immense liquidity to fill large buy and sell orders without suffering heavy price slippage. They intentionally push the price toward dense yellow liquidation clusters to trigger these stops, allowing them to absorb millions in counterpart liquidity instantly."
    },
    {
      q: "What is the difference between Bankruptcy Price and Liquidation Price?",
      a: "Your Bankruptcy Price is the mathematical price point where your position's losses exactly equal 100% of your initial margin. However, crypto exchanges must close your position *before* you hit bankruptcy to prevent you from owing debt to the exchange. Therefore, your Liquidation Price triggers earlier at the Maintenance Margin threshold (MMR), leaving a small buffer that pays exchange fees and replenishes the exchange insurance fund."
    },
    {
      q: "How to predict crypto short squeezes using Coinglass data?",
      a: "A classic short squeeze setup on Coinglass consists of three key signals: (1) Open Interest (OI) surges while price consolidates near resistance; (2) Multi-exchange funding rates turn negative (shorts paying longs); (3) Dense golden-yellow liquidation clusters accumulate above key resistance levels. When a sudden spot buy order pushes price into the first short cluster, the forced buy-market orders trigger an explosive upward cascade."
    },
    {
      q: "Why do exchanges use Mark Price instead of Last Traded Price for liquidations?",
      a: "Exchanges use Mark Price (a calculated composite price derived from global spot orderbooks across Binance, Coinbase, Kraken, and OKX) rather than the local Last Traded Price. This critical safety mechanism protects traders from 'wick hunting' and flash crash manipulation, ensuring that a malicious whale dumping a single illiquid orderbook cannot trigger unjustified mass liquidations."
    },
    {
      q: "How accurate is Coinglass liquidation data and heatmap modeling?",
      a: "Coinglass connects directly to tier-1 exchange WebSocket feeds and REST endpoints to record verified liquidation events as they occur. For predictive heatmaps, Coinglass models leverage distribution curves with approximately 85-92% positional accuracy. While exact individual account margins cannot be known due to privacy, the aggregate clusters reliably predict major support/resistance liquidity pools."
    },
    {
      q: "What is the best risk management rule to avoid getting liquidated?",
      a: "Professional quantitative traders adhere to three golden rules: (1) Keep leverage under 5x to 10x; (2) Always place a manual stop-loss at least 1.5% to 2.5% before your estimated liquidation price; (3) Avoid placing stop-losses directly at obvious round numbers or high-density yellow Coinglass clusters where market makers frequently engineer stop runs."
    }
  ];

  // JSON-LD Structured Data Schema for SEO
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Coinglass Liquidation Heatmap & Crypto Derivatives Tracker",
        "url": "https://www.bitcoincrypto.tech/tools?tab=liquidation",
        "description": "Real-time Coinglass liquidation heatmaps, open interest tracking, multi-exchange long/short ratios, and interactive crypto liquidation price calculators.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  return (
    <div className="space-y-12">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* 1. HERO HEADER & QUICK STATS BAR */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 border border-rose-900/40 shadow-2xl relative overflow-hidden">
        {/* Glow Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  Coinglass Liquidation Intelligence Hub
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Radio className="w-3 h-3 text-amber-400" />
                  Live Multi-Exchange WebSocket Stream
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Coinglass Liquidation Heatmap &amp; <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  Real-Time Crypto Liquidation Tracker
                </span>
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm max-w-3xl mt-2 leading-relaxed">
                Track real-time <strong>Coinglass liquidation data</strong>, 2D spectrogram heatmaps, open interest clusters, multi-exchange long/short ratios, and calculate exact bankruptcy thresholds across Binance, Bybit, OKX, and Deribit.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/coinglass"
                className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md hover:scale-105"
              >
                <span>Full Derivatives Radar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/news"
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
              >
                <span>Macro News Wire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Real-Time Live Liquidation Matrix Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t border-slate-800 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Skull className="w-3 h-3 text-rose-400" /> 24h Total Crypto Liqs
              </span>
              <div className="text-lg font-black text-rose-400 font-mono">
                $318.45M
              </div>
              <span className="text-[10px] text-slate-400 font-bold">
                114,280 Traders Wiped Out
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" /> Longs Liquidated (24h)
              </span>
              <div className="text-lg font-black text-emerald-400 font-mono">
                $98.20M (30.8%)
              </div>
              <span className="text-[10px] text-emerald-300">
                Healthy Bullish Absorption
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-rose-400" /> Shorts Squeezed (24h)
              </span>
              <div className="text-lg font-black text-amber-400 font-mono">
                $220.25M (69.2%)
              </div>
              <span className="text-[10px] text-amber-300 font-bold">
                Heavy Short Squeeze Bias
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-300" /> Largest Single Liq
              </span>
              <div className="text-sm font-black text-white font-mono truncate">
                BTC $8.42M on Bybit
              </div>
              <span className="text-[10px] text-slate-400">
                Short wiped at $89,330
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. EMBEDDED COINGLASS LIQUIDATION RADAR & 2D HEATMAP SPECTROGRAM */}
      <section id="coinglass-heatmap">
        <LiquidationHeatmapRadar />
      </section>

      {/* 3. INTERACTIVE COINGLASS CASCADE & SQUEEZE SIMULATOR */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center font-black border border-rose-500/30">
              <Play className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Coinglass Liquidation Cascade &amp; Squeeze Simulator
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Simulate multi-million dollar market shocks and visualize how leverage tiers collapse in real time
              </p>
            </div>
          </div>

          {/* Coin Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            {(["BTC", "ETH", "SOL", "XRP", "DOGE"] as const).map((coin) => (
              <button
                key={coin}
                onClick={() => setSimCoin(coin)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-black transition ${
                  simCoin === coin
                    ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {coin}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario Selection Buttons */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Select Market Price Shock Scenario:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {[
              { id: "dip-3", label: "🔴 -3% Long Flush", color: "hover:border-rose-400" },
              { id: "dump-5", label: "🔴 -5% Long Cascade", color: "hover:border-rose-500" },
              { id: "cascade-10", label: "🔴 -10% Waterfall", color: "hover:border-rose-600" },
              { id: "pop-3", label: "🟢 +3% Short Pop", color: "hover:border-emerald-400" },
              { id: "squeeze-5", label: "🟢 +5% Squeeze Rally", color: "hover:border-amber-400" },
              { id: "rocket-10", label: "🟢 +10% Short Rocket", color: "hover:border-yellow-400" },
            ].map((sc) => (
              <button
                key={sc.id}
                onClick={() => setSimScenario(sc.id as any)}
                className={`p-3 rounded-2xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 border text-center ${
                  simScenario === sc.id
                    ? "bg-slate-900 dark:bg-slate-800 text-white border-amber-400 shadow-md ring-2 ring-amber-400/40"
                    : "bg-slate-50 dark:bg-slate-850/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 " + sc.color
                }`}
              >
                <span>{sc.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Simulation Output Dashboard */}
        <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
                Simulated Outcome: {simCoin} / USDT
              </span>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <span>{activeSimulation.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
                  activeSimulation.direction === "UP" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                }`}>
                  {activeSimulation.shockPct > 0 ? `+${activeSimulation.shockPct}%` : `${activeSimulation.shockPct}%`} Price Move
                </span>
              </h3>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Estimated Value Liquidated</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {activeSimulation.liquidatedUsd}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Target Shock Price</span>
              <div className="text-lg font-bold text-white">
                ${activeSimulation.targetPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-slate-400">Base Price: ${SIMULATION_SCENARIOS[simCoin].basePrice.toLocaleString()}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Leverage Tiers Collapsed</span>
              <div className="text-sm font-bold text-rose-400 truncate">
                {activeSimulation.tiersTriggered.join(", ")}
              </div>
              <span className="text-[11px] text-slate-400">Cascading Stop Avalanche</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Next Orderbook Wall</span>
              <div className="text-sm font-bold text-emerald-400 truncate">
                {activeSimulation.nextSupport}
              </div>
              <span className="text-[11px] text-slate-400">Major Resting Liquidity Shelf</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Coinglass Market Microstructure Analysis:</strong> {activeSimulation.marketImpact} When open interest is at {SIMULATION_SCENARIOS[simCoin].openInterest}, orderbook liquidity absorbs early cascades before stabilizing at key structural levels.
            </p>
          </div>
        </div>
      </div>

      {/* 4. INTERACTIVE LIVE LEVERAGE & LIQUIDATION PRICE CALCULATOR */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-black border border-amber-500/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Coinglass Liquidation &amp; Bankruptcy Price Calculator
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Calculate precise liquidation price, maintenance margin buffer, and distance-to-wipeout
              </p>
            </div>
          </div>

          {/* Long / Short Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setCalcSide("LONG")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                calcSide === "LONG"
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>LONG POSITION</span>
            </button>
            <button
              onClick={() => setCalcSide("SHORT")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                calcSide === "SHORT"
                  ? "bg-rose-500 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5" />
              <span>SHORT POSITION</span>
            </button>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column (Col 6) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Entry Price Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between">
                <span>Entry Price (USD)</span>
                <span className="text-[11px] font-mono text-slate-400">Asset Spot / Mark Price</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={calcEntryPrice}
                  onChange={(e) => setCalcEntryPrice(Math.max(0.0001, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition"
                />
              </div>
            </div>

            {/* Position Size Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between">
                <span>Position Size (Base Units)</span>
                <span className="text-[11px] font-mono text-slate-400">Quantity (e.g. 1.5 BTC)</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={calcPositionSize}
                onChange={(e) => setCalcPositionSize(Math.max(0.001, parseFloat(e.target.value) || 0))}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition"
              />
            </div>

            {/* Leverage Slider & Presets */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Leverage Multiplier ({calcLeverage}x)
                </label>
                <span className="text-xs font-mono font-black text-amber-500">{calcLeverage}x Isolated</span>
              </div>
              <input
                type="range"
                min="1"
                max="125"
                value={calcLeverage}
                onChange={(e) => setCalcLeverage(parseInt(e.target.value) || 1)}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[2, 5, 10, 20, 50, 100, 125].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setCalcLeverage(preset)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition shrink-0 ${
                      calcLeverage === preset
                        ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-black"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {preset}x
                  </button>
                ))}
              </div>
            </div>

            {/* Maintenance Margin Rate Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600 dark:text-slate-300">Maintenance Margin Rate (MMR)</span>
                <span className="font-mono font-bold text-slate-400">{calcMaintenanceRate}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.5"
                step="0.1"
                value={calcMaintenanceRate}
                onChange={(e) => setCalcMaintenanceRate(parseFloat(e.target.value) || 0.4)}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

          {/* Results Output Column (Col 6) */}
          <div className="lg:col-span-6 bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Skull className="w-4 h-4 text-rose-500" />
                <span className="text-xs uppercase font-bold text-slate-400 font-mono">Computed Liquidation Threshold</span>
              </div>
              <span className={`text-xs font-mono font-bold ${riskColor}`}>
                {riskLevel}
              </span>
            </div>

            {/* Primary Liquidation Price Display */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400 uppercase font-mono font-bold">Estimated Liquidation Price</span>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
                ${liquidationPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Distance to liquidation: <strong className="text-rose-400 font-mono">${distanceDollar.toLocaleString(undefined, { maximumFractionDigits: 2 })} ({distancePercent.toFixed(2)}%)</strong>
              </div>
            </div>

            {/* 4 Detailed Breakdown Metric Tiles */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Notional Value</span>
                <div className="font-bold text-white text-sm">
                  ${notionalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Initial Required Margin</span>
                <div className="font-bold text-emerald-400 text-sm">
                  ${initialMargin.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Bankruptcy Price (0 Margin)</span>
                <div className="font-bold text-rose-400 text-sm">
                  ${bankruptcyPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Maintenance Buffer</span>
                <div className="font-bold text-purple-400 text-sm">
                  ${maintenanceMargin.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Risk Tip Alert */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Coinglass Quantitative Pro Tip:</strong> To avoid catastrophic market maker stop-runs, keep leverage below <strong>10x</strong> and place your stop-loss order at least <strong>1.5% before</strong> your liquidation price.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. THE 3 PROVEN COINGLASS TRADING STRATEGIES */}
      <div className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
            <Award className="w-3.5 h-3.5 text-emerald-500" />
            <span>Quantitative Execution Playbook</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            3 Proven Trading Strategies Using Coinglass Liquidation Data
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Actionable step-by-step methodologies used by institutional hedge funds and proprietary crypto desks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tradingStrategies.map((strat, sIdx) => {
            const Icon = strat.icon;
            return (
              <div
                key={sIdx}
                className={`bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border shadow-md space-y-4 flex flex-col justify-between ${strat.color}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-amber-500 flex items-center justify-center font-black">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 text-white dark:bg-slate-800 dark:text-amber-300">
                      {strat.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {strat.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {strat.overview}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[10px] block">
                      Execution Blueprint:
                    </span>
                    <ol className="space-y-1.5 list-decimal list-inside text-slate-600 dark:text-slate-400">
                      {strat.steps.map((step, stIdx) => (
                        <li key={stIdx} className="leading-snug">
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] text-amber-900 dark:text-amber-300 leading-relaxed mt-4">
                  <strong>💡 Pro Desk Rule:</strong> {strat.proTip}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. TECHNICAL & FUNDAMENTAL COINGLASS KNOWLEDGE SUITE */}
      <div className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>Coinglass Derivatives Mechanics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Technical &amp; Fundamental Coinglass Liquidation Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Master the structural dynamics governing market sweeps, squeeze cascades, and institutional orderbook flow
          </p>
        </div>

        {/* 4 Fundamentals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liquidationFundamentals.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-amber-400/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    Key Takeaways:
                  </span>
                  <ul className="space-y-1.5">
                    {item.takeaways.map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. CROSS-EXCHANGE LIQUIDATION PROTOCOLS COMPARISON TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-500" />
            <span>Cross-Exchange Liquidation Protocol Matrix</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Comparing margin engine mechanics, insurance fund guarantees, and Auto-Deleveraging (ADL) policies across Coinglass tier-1 venues
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="pb-3 font-black uppercase">Exchange</th>
                <th className="pb-3 font-black uppercase">Liquidation Engine</th>
                <th className="pb-3 font-black uppercase">Insurance Reserve</th>
                <th className="pb-3 font-black uppercase">ADL Risk</th>
                <th className="pb-3 font-black uppercase">MMR Tiers</th>
                <th className="pb-3 font-black uppercase">Protection Mechanism</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {exchangeProtocols.map((ex, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition">
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white font-sans text-sm">
                    {ex.exchange}
                  </td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300">
                    {ex.engine}
                  </td>
                  <td className="py-3.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    {ex.insuranceFund}
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                      {ex.adlRisk}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300">
                    {ex.maintenanceMargin}
                  </td>
                  <td className="py-3.5 text-slate-500 dark:text-slate-400 font-sans text-xs max-w-xs">
                    {ex.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8. COINGLASS DERIVATIVES & LIQUIDATION GLOSSARY */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span>Coinglass Derivatives &amp; Liquidation Glossary</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Essential reference terminology for perpetual futures, liquidation orderbooks, and margin mechanisms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {glossaryTerms.map((g, gIdx) => (
            <div
              key={gIdx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-1.5"
            >
              <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{g.term}</span>
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                {g.def}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. COINGLASS FREQUENTLY ASKED QUESTIONS ACCORDION WITH RICH SCHEMA */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-500" />
            <span>Coinglass Liquidation Heatmap &amp; Squeeze FAQ</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Clear, authoritative answers to the most common Coinglass derivatives and liquidation questions
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-850/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-amber-500" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
