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
  Cpu,
  History,
  LineChart,
  Network,
  Binary
} from "lucide-react";
import LiquidationHeatmapRadar from "@/components/coinglass/LiquidationHeatmapRadar";

export default function CoinGlassLiquidationTool() {
  // 1. Single Position Liquidation Calculator State
  const [calcSide, setCalcSide] = useState<"LONG" | "SHORT">("LONG");
  const [calcMarginMode, setCalcMarginMode] = useState<"ISOLATED" | "CROSS">("ISOLATED");
  const [calcEntryPrice, setCalcEntryPrice] = useState<number>(88450);
  const [calcLeverage, setCalcLeverage] = useState<number>(20);
  const [calcPositionSize, setCalcPositionSize] = useState<number>(1.5); // in BTC / base units
  const [calcMaintenanceRate, setCalcMaintenanceRate] = useState<number>(0.4); // 0.4% default MMR
  const [calcWalletBalance, setCalcWalletBalance] = useState<number>(10000); // For Cross Margin

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

    if (calcMarginMode === "ISOLATED") {
      if (calcSide === "LONG") {
        // Long Isolated Liq = Entry Price * (1 - 1/Leverage + MaintenanceMarginRate)
        liqPrice = calcEntryPrice * (1 - (1 / calcLeverage) + (calcMaintenanceRate / 100));
        bkpPrice = calcEntryPrice * (1 - (1 / calcLeverage));
      } else {
        // Short Isolated Liq = Entry Price * (1 + 1/Leverage - MaintenanceMarginRate)
        liqPrice = calcEntryPrice * (1 + (1 / calcLeverage) - (calcMaintenanceRate / 100));
        bkpPrice = calcEntryPrice * (1 + (1 / calcLeverage));
      }
    } else {
      // Cross Margin Calculation
      if (calcSide === "LONG") {
        // Long Cross Liq = Entry Price - (WalletBalance - MaintenanceMargin) / PositionSize
        liqPrice = calcEntryPrice - (calcWalletBalance - maintMargin) / calcPositionSize;
        bkpPrice = calcEntryPrice - calcWalletBalance / calcPositionSize;
      } else {
        // Short Cross Liq = Entry Price + (WalletBalance - MaintenanceMargin) / PositionSize
        liqPrice = calcEntryPrice + (calcWalletBalance - maintMargin) / calcPositionSize;
        bkpPrice = calcEntryPrice + calcWalletBalance / calcPositionSize;
      }
    }

    const effectiveLiq = Math.max(0, liqPrice);
    const effectiveBkp = Math.max(0, bkpPrice);
    const distDol = Math.abs(calcEntryPrice - effectiveLiq);
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
      rLevel = "Moderate Volatility Exposure";
      rCol = "text-amber-400 font-bold";
    }

    return {
      notionalValue: notional,
      initialMargin: initMargin,
      maintenanceMargin: maintMargin,
      liquidationPrice: effectiveLiq,
      bankruptcyPrice: effectiveBkp,
      distanceDollar: distDol,
      distancePercent: distPct,
      riskLevel: rLevel,
      riskColor: rCol,
    };
  }, [calcSide, calcMarginMode, calcEntryPrice, calcLeverage, calcPositionSize, calcMaintenanceRate, calcWalletBalance]);

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
        nextSupport: "$76,200 (Macro Monthly S/R)",
        marketImpact: "Systemic deleveraging event triggering exchange auto-deleveraging (ADL) buffers."
      },
      "pop-3": {
        name: "3.0% Short Squeeze Ignition",
        direction: "UP",
        shockPct: 3.0,
        targetPrice: 91103,
        liquidatedUsd: "$112.0 Million",
        tiersTriggered: ["100x (at $89,330)", "50x (at $90,220)"],
        nextSupport: "$91,980 (25x Primary Magnet)",
        marketImpact: "Forced buy-stop execution pushes price swiftly through local resistance bands."
      },
      "squeeze-5": {
        name: "5.0% Short Squeeze Vacuum Rally",
        direction: "UP",
        shockPct: 5.0,
        targetPrice: 92872,
        liquidatedUsd: "$310.5 Million",
        tiersTriggered: ["100x", "50x", "25x (at $91,980)"],
        nextSupport: "$95,000 (Major Round Psychological Level)",
        marketImpact: "Aggressive short squeeze triggering automated delta-hedging by option dealers."
      },
      "rocket-10": {
        name: "10.0% Parabolic Short Annihilation",
        direction: "UP",
        shockPct: 10.0,
        targetPrice: 97295,
        liquidatedUsd: "$780.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x (at $97,300)"],
        nextSupport: "$100,000 (Institutional Gamma Flip Level)",
        marketImpact: "Full-scale market maker short squeeze cascading toward $100k all-time milestones."
      }
    },
    ETH: {
      basePrice: 3140,
      openInterest: "$15.40B",
      "dip-3": {
        name: "3.0% Long Flush Dip",
        direction: "DOWN",
        shockPct: -3.0,
        targetPrice: 3045.8,
        liquidatedUsd: "$45.0 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$3,000 (Psychological Support)",
        marketImpact: "High-frequency stop hunting in tight consolidation band."
      },
      "dump-5": {
        name: "5.0% Cascading Long Squeeze",
        direction: "DOWN",
        shockPct: -5.0,
        targetPrice: 2983.0,
        liquidatedUsd: "$118.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$2,920 (Macro Trendline Support)",
        marketImpact: "Breaks key $3k handle, causing DeFi lending liquidations on Maker & Aave."
      },
      "cascade-10": {
        name: "10.0% Black Swan Liquidation Waterfall",
        direction: "DOWN",
        shockPct: -10.0,
        targetPrice: 2826.0,
        liquidatedUsd: "$340.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$2,750 (Value Area Low)",
        marketImpact: "DeFi debt collateral auctions spike on-chain gas fees and flash liquidations."
      },
      "pop-3": {
        name: "3.0% Short Squeeze Ignition",
        direction: "UP",
        shockPct: 3.0,
        targetPrice: 3234.2,
        liquidatedUsd: "$52.0 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$3,265 (25x Magnet)",
        marketImpact: "Quick burst above previous 4h high creates short squeeze momentum."
      },
      "squeeze-5": {
        name: "5.0% Short Squeeze Vacuum Rally",
        direction: "UP",
        shockPct: 5.0,
        targetPrice: 3297.0,
        liquidatedUsd: "$145.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$3,400 (Daily Resistance)",
        marketImpact: "Massive short liquidations drive rapid mean reversion against bear trend."
      },
      "rocket-10": {
        name: "10.0% Parabolic Short Annihilation",
        direction: "UP",
        shockPct: 10.0,
        targetPrice: 3454.0,
        liquidatedUsd: "$390.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$3,650 (Major Golden Pocket Resistance)",
        marketImpact: "Shorts completely wiped across all major perpetual exchanges."
      }
    },
    SOL: {
      basePrice: 185.5,
      openInterest: "$5.80B",
      "dip-3": {
        name: "3.0% Long Flush Dip",
        direction: "DOWN",
        shockPct: -3.0,
        targetPrice: 179.9,
        liquidatedUsd: "$22.0 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$176.0 (25x Support)",
        marketImpact: "Fast retail leverage wipe on high-beta Solana ecosystem."
      },
      "dump-5": {
        name: "5.0% Cascading Long Squeeze",
        direction: "DOWN",
        shockPct: -5.0,
        targetPrice: 176.2,
        liquidatedUsd: "$58.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$170.0 (Key Demand Zone)",
        marketImpact: "Triggers cascade in DEX perpetuals and meme coin margin pools."
      },
      "cascade-10": {
        name: "10.0% Black Swan Liquidation Waterfall",
        direction: "DOWN",
        shockPct: -10.0,
        targetPrice: 166.9,
        liquidatedUsd: "$165.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$158.0 (Macro Range Low)",
        marketImpact: "Broad market panic leads to heavy systemic deleveraging."
      },
      "pop-3": {
        name: "3.0% Short Squeeze Ignition",
        direction: "UP",
        shockPct: 3.0,
        targetPrice: 191.0,
        liquidatedUsd: "$28.0 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$194.0 (25x Magnet)",
        marketImpact: "Fast push back towards $200 psychological barrier."
      },
      "squeeze-5": {
        name: "5.0% Short Squeeze Vacuum Rally",
        direction: "UP",
        shockPct: 5.0,
        targetPrice: 194.7,
        liquidatedUsd: "$74.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$205.0 (Breakout Zone)",
        marketImpact: "Violent short covering accelerates buying volume."
      },
      "rocket-10": {
        name: "10.0% Parabolic Short Annihilation",
        direction: "UP",
        shockPct: 10.0,
        targetPrice: 204.0,
        liquidatedUsd: "$195.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$220.0 (All-Time Target)",
        marketImpact: "Full short liquidation run breaking multi-month resistance."
      }
    },
    XRP: {
      basePrice: 1.15,
      openInterest: "$2.10B",
      "dip-3": {
        name: "3.0% Long Flush Dip",
        direction: "DOWN",
        shockPct: -3.0,
        targetPrice: 1.115,
        liquidatedUsd: "$8.5 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$1.08 (25x Shelf)",
        marketImpact: "Cleans out early retail breakout longs."
      },
      "dump-5": {
        name: "5.0% Cascading Long Squeeze",
        direction: "DOWN",
        shockPct: -5.0,
        targetPrice: 1.092,
        liquidatedUsd: "$24.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$1.02 (Major Order Block)",
        marketImpact: "Cascading stops test the $1.00 psychological support line."
      },
      "cascade-10": {
        name: "10.0% Black Swan Liquidation Waterfall",
        direction: "DOWN",
        shockPct: -10.0,
        targetPrice: 1.035,
        liquidatedUsd: "$65.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$0.95 (Macro Support)",
        marketImpact: "Heavy retail flush resets derivatives leverage across all pairs."
      },
      "pop-3": {
        name: "3.0% Short Squeeze Ignition",
        direction: "UP",
        shockPct: 3.0,
        targetPrice: 1.184,
        liquidatedUsd: "$11.0 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$1.21 (25x Magnet)",
        marketImpact: "Fast short covering on volume surge."
      },
      "squeeze-5": {
        name: "5.0% Short Squeeze Vacuum Rally",
        direction: "UP",
        shockPct: 5.0,
        targetPrice: 1.207,
        liquidatedUsd: "$32.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$1.28 (10x Magnet)",
        marketImpact: "Breakout above multi-week range squeezes persistent bears."
      },
      "rocket-10": {
        name: "10.0% Parabolic Short Annihilation",
        direction: "UP",
        shockPct: 10.0,
        targetPrice: 1.265,
        liquidatedUsd: "$82.0 Million",
        tiersTriggered: ["100x", "50x", "25x", "10x"],
        nextSupport: "$1.35 (Multi-Year Resistance)",
        marketImpact: "Explosive short wipeout on massive global spot & perp volume."
      }
    },
    DOGE: {
      basePrice: 0.238,
      openInterest: "$1.85B",
      "dip-3": {
        name: "3.0% Long Flush Dip",
        direction: "DOWN",
        shockPct: -3.0,
        targetPrice: 0.2308,
        liquidatedUsd: "$10.5 Million",
        tiersTriggered: ["100x", "50x"],
        nextSupport: "$0.225 (25x Shelf)",
        marketImpact: "Flushes high-leverage meme coin scalpers."
      },
      "dump-5": {
        name: "5.0% Cascading Long Squeeze",
        direction: "DOWN",
        shockPct: -5.0,
        targetPrice: 0.2261,
        liquidatedUsd: "$28.0 Million",
        tiersTriggered: ["100x", "50x", "25x"],
        nextSupport: "$0.215 (High Volume Node)",
        marketImpact: "Quick flush of retail longs opens liquidity gap below."
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

  // 3. Historical Cascade Timeline State
  const [selectedEventId, setSelectedEventId] = useState<string>("may-2021");

  const HISTORICAL_CASCADES = [
    {
      id: "march-2020",
      title: "March 12-13, 2020: Black Thursday Liquidation Spiral",
      date: "March 12-13, 2020",
      totalLiq: "$3.20 Billion",
      priceDrop: "-50.4% in 24h",
      btcLow: "$3,850",
      oiDrop: "-68%",
      catalyst: "Global COVID-19 pandemic liquidity shock and BitMEX liquidation engine death loop.",
      anatomy: "BitMEX held over 60% of all global Bitcoin derivatives open interest. When BTC plunged from $8,000 to $4,000, BitMEX's automated liquidation engine submitted billions in market sell orders into an empty limit orderbook. The engine was submitting sells faster than miners could broadcast transactions, pushing BTC to $3,800 until BitMEX went offline for 'hardware maintenance', which halted the death spiral and marked the exact generational bottom.",
      lessons: "Never rely on a single exchange. When order books empty out, liquidation engines become market-destroying feedback loops. Mark price index protections are vital."
    },
    {
      id: "may-2021",
      title: "May 19, 2021: The Great Crypto Deleveraging Waterfall",
      date: "May 19, 2021",
      totalLiq: "$9.85 Billion (Record High)",
      priceDrop: "-31.2% in 12h",
      btcLow: "$30,066",
      oiDrop: "-52%",
      catalyst: "China mining ban announcements paired with massive retail leverage buildup across Binance & Huobi.",
      anatomy: "Over $9.85 Billion in long positions were liquidated in a single 24-hour window. As Bitcoin cracked below $40,000, Binance, Coinbase, and Kraken experienced massive API latency and UI freezes. Overleveraged traders could not add margin collateral. Decentralized lending protocols (Aave & MakerDAO) triggered hundreds of millions in automated collateral auctions, spiking Ethereum gas fees to >1,500 Gwei.",
      lessons: "High leverage during structural market distribution guarantees massive liquidation cascades. When exchanges freeze, stop-losses execute with extreme negative slippage."
    },
    {
      id: "dec-2021",
      title: "December 4, 2021: The Weekend Overnight Flash Crash",
      date: "December 4, 2021",
      totalLiq: "$2.45 Billion",
      priceDrop: "-21.5% in 4h",
      btcLow: "$42,000",
      oiDrop: "-38%",
      catalyst: "Thin weekend orderbook liquidity combined with institutional macro risk-off sentiment.",
      anatomy: "Occurred at 05:00 UTC on a Saturday when institutional spot market makers were offline. A relatively modest $300M spot sell order triggered a cascade of 50x and 100x long stops. Within 45 minutes, price dropped from $53,000 to $42,000, liquidating over 400,000 retail trading accounts in hours.",
      lessons: "Weekend trading liquidity is significantly thinner than weekday volume. Placing aggressive leverage on Friday night exposes accounts to predatory stop-hunting."
    },
    {
      id: "nov-2022",
      title: "November 8-10, 2022: FTX & Alameda Insolvency Collapse",
      date: "November 8-10, 2022",
      totalLiq: "$4.50 Billion",
      priceDrop: "-27.8% in 48h",
      btcLow: "$15,476",
      oiDrop: "-44%",
      catalyst: "Coindesk balance sheet reveal, Binance sale of FTT, and insolvency of FTX / Alameda Research.",
      anatomy: "FTX customer withdrawals halted while Alameda's massive market-making positions were forcibly unwound. The systemic fear triggered cross-market contagion, bankrupting lenders (BlockFi, Genesis, Celsius aftermath). Bitcoin collapsed to cycle lows of $15.5k and Solana plummeted from $38 to $8 in cascading forced liquidations.",
      lessons: "Counterparty risk is the ultimate liquidation vector. Storing funds on unverified custodial exchanges exposes traders to 100% loss regardless of trade direction."
    },
    {
      id: "aug-2023",
      title: "August 17, 2023: SpaceX Rumor & China Real Estate Flash Dump",
      date: "August 17, 2023",
      totalLiq: "$1.05 Billion",
      priceDrop: "-12.4% in 2h",
      btcLow: "$25,166",
      oiDrop: "-28%",
      catalyst: "SpaceX Bitcoin writedown reports combined with multi-month volatility compression breakout.",
      anatomy: "Bitcoin had coiled in an ultra-tight $29k range with 30-day realized volatility at multi-year lows. When price broke below the $28.5k consolidation floor, it triggered a rapid succession of long liquidation tiers down to $25.2k in under 90 minutes. It was the largest single-day open interest flush of 2023.",
      lessons: "Extreme volatility compression always resolves into an explosive liquidation cascade. Never mistake low volatility for safety."
    },
    {
      id: "aug-2024",
      title: "August 5, 2024: Global Yen Carry Trade Unwind Black Monday",
      date: "August 5, 2024",
      totalLiq: "$1.20 Billion",
      priceDrop: "-18.2% in 24h",
      btcLow: "$49,120",
      oiDrop: "-31%",
      catalyst: "Bank of Japan unexpected interest rate hike triggering multi-trillion dollar global yen carry trade unwinds.",
      anatomy: "Global equity markets (Nikkei -12%) crashed, forcing macro hedge funds to liquidate liquid crypto assets to meet traditional margin calls. BTC plummeted from $60,000 to $49,000 and ETH crashed -22% to $2,100 within hours. Jump Trading actively dumped hundreds of millions in staked ETH. However, spot ETFs and institutional buyers absorbed the entire flush, sparking an aggressive V-shaped recovery back to $60k within 72 hours.",
      lessons: "External macroeconomic liquidity shocks create instant crypto derivatives flushes that often present the highest-probability institutional buying opportunities."
    },
    {
      id: "etf-era-2025-2026",
      title: "2025-2026 Institutional Spot ETF Hyper-Squeezes",
      date: "2025-2026 Era",
      totalLiq: "$850M - $1.4B / Cascade",
      priceDrop: "+15% to +25% Upside Squeezes",
      btcLow: "N/A (Upward Cascades)",
      oiDrop: "-22% Short Flush",
      catalyst: "Consistent institutional Spot Bitcoin and Ethereum ETF daily inflows absorbing resting OTC liquidity.",
      anatomy: "Unlike previous retail-dominated cycles, the ETF era features persistent institutional spot buying. When derivative traders heavily short resistance levels with negative funding rates, ETF market-on-close orders absorb all available spot supply. This creates high-velocity upside short squeezes where hundreds of millions in short leverage are annihilated within 30-minute windows.",
      lessons: "Never short into sustained institutional spot ETF accumulation. Perpetual shorts face unlimited upside liquidation risk when physical spot supply is locked."
    }
  ];

  const activeHistoricalEvent = HISTORICAL_CASCADES.find((e) => e.id === selectedEventId) || HISTORICAL_CASCADES[1];

  // 4. Cumulative Liquidation Delta (CLD) State
  const [cldWindow, setCldWindow] = useState<"1H" | "4H" | "24H" | "7D">("24H");

  const CLD_DATA = {
    "1H": {
      longLiq: "$4.20M",
      shortLiq: "$18.60M",
      netDelta: "-$14.40M",
      bias: "Heavy Short Squeeze Velocity",
      divergence: "Bullish Absorption Spike",
      cvdStatus: "Spot CVD Aggressive Buyer Inflow",
      airPocketZone: "$91,800 - $93,400 (Thin Depth)"
    },
    "4H": {
      longLiq: "$16.50M",
      shortLiq: "$54.20M",
      netDelta: "-$37.70M",
      bias: "Strong Upward Liquidation Magnetism",
      divergence: "Short Squeeze Continuation",
      cvdStatus: "Perp CVD Leading Spot",
      airPocketZone: "$92,500 - $94,200 (Low Resistance)"
    },
    "24H": {
      longLiq: "$98.20M",
      shortLiq: "$220.25M",
      netDelta: "-$122.05M",
      bias: "Asymmetric Bear Capitulation",
      divergence: "Macro Trend Expansion",
      cvdStatus: "Synchronized Spot & Perp Inflows",
      airPocketZone: "$89,500 - $95,000 (Multi-Tier Clearance)"
    },
    "7D": {
      longLiq: "$412.00M",
      shortLiq: "$785.40M",
      netDelta: "-$373.40M",
      bias: "Structural Upward Cascade Cycle",
      divergence: "Institutional Liquidity Accumulation",
      cvdStatus: "Institutional ETF Allocation Dominant",
      airPocketZone: "$86,000 - $98,000 (Expansion Runway)"
    }
  };

  const activeCld = CLD_DATA[cldWindow];

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
    },
    {
      name: "Strategy 4: Peak Liquidation Exhaustion Mean-Reversion Fade (The Capitulation Entry)",
      type: "Contrarian Capitulation Reversal",
      badge: "Institutional Sniping (1:5+ R:R)",
      icon: Target,
      color: "border-purple-500/40 bg-purple-500/5",
      overview: "When a multi-hundred million dollar liquidation waterfall exhausts all available stop-orders and encounters massive institutional limit buy orders, an explosive V-shaped mean-reversion bounce is mathematically imminent.",
      steps: [
        "Monitor Coinglass Real-Time Liquidation Tape for a massive spike (> $80M in a single 15-minute bar).",
        "Verify on the Coinglass Heatmap that the entire yellow liquidity shelf has been 100% wiped clean with no further dense clusters below.",
        "Look for Cumulative Volume Delta (CVD) divergence: price prints a lower low while CVD prints a higher low, proving institutional absorption of retail forced selling.",
        "Enter long immediately on the first 5-minute bullish market structure break (MSB) candle close.",
        "Place your Stop-Loss 0.3% below the capitulation wick low, targeting the mid-point of the pre-cascade trading range (50% Fibonacci retracement)."
      ],
      proTip: "This strategy catches the exact cycle and local bottoms (such as March 2020 at $3.8k and August 2024 at $49k) with minimal drawdown risk."
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
    { term: "Cumulative Liquidation Delta (CLD)", def: "The net difference between aggregate long liquidation volume and short liquidation volume over a specific time window, signaling which side of the market is experiencing capitulation." },
    { term: "Mark Price", def: "A fair price calculation derived from an index basket of major spot exchanges, used exclusively to calculate unrealized PnL and trigger liquidations without vulnerability to single-exchange flash crashes." },
    { term: "Maintenance Margin Rate (MMR)", def: "The minimum collateral percentage required by an exchange to keep a leveraged position open. Dropping below MMR triggers immediate automated liquidation." },
    { term: "Bankruptcy Price", def: "The exact price where position losses equal 100% of the initial margin. Exchanges liquidate positions prior to this point to prevent negative account balances." },
    { term: "Auto-Deleveraging (ADL)", def: "A last-resort risk protocol where an exchange automatically closes profitable opposing positions if an insurance fund is unable to absorb bankrupt liquidation deficits during extreme volatility." },
    { term: "Liquidity Air Pocket", def: "A thin zone in the orderbook with virtually no resting limit bids or asks, located immediately between dense liquidation shelves, causing high-speed price slippage." },
    { term: "SAFU / Insurance Fund", def: "A dedicated multi-million dollar capital pool held by derivatives exchanges to absorb underwater position losses and prevent socialization of trader deficits." },
    { term: "Open Interest (OI)", def: "The total nominal value of all active, unsettled derivative contracts currently held by market participants on a given cryptocurrency." },
    { term: "Market Maker Gamma Inversion", def: "A quantitative condition where option market makers become net short gamma, forcing them to sell into falling prices and buy into rising prices, accelerating liquidation cascades." },
    { term: "Perpetual Funding Rate", def: "A periodic payment mechanism (usually every 8 hours) exchanged between long and short traders to keep perpetual contract prices aligned with spot index prices." },
    { term: "Liquidation Cascade", def: "A chain reaction where triggered liquidations submit market orders that push price further into adjacent stop tiers, triggering even more liquidations in an avalanche effect." }
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
      q: "What is Cumulative Liquidation Delta (CLD) and how do I trade it?",
      a: "Cumulative Liquidation Delta (CLD) measures the net difference between total Long Liquidations and Short Liquidations over a rolling window. When CLD spikes heavily into positive territory (massive long wipeouts) while price stabilizes at key support, it indicates sellers have exhausted their leverage and a strong counter-trend reversal rally is mathematically favorable."
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
      q: "What happens during an Auto-Deleveraging (ADL) event?",
      a: "Auto-Deleveraging (ADL) is an exchange safety mechanism triggered only during extreme black-swan market volatility when an exchange's insurance fund is completely drained and cannot cover the deficits of bankrupt liquidated traders. In this scenario, the exchange automatically force-closes the most profitable leveraged traders on the opposite side of the market at the bankruptcy price to balance the books."
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
        "url": "https://www.bitcoincrypto.tech/coinglass?tab=liquidations",
        "description": "Institutional-grade Coinglass liquidation heatmaps, open interest tracking, multi-exchange long/short ratios, historical cascade timelines, and interactive crypto liquidation price calculators.",
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
                  Coinglass Institutional Liquidation Intelligence Hub
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
                Track real-time <strong>Coinglass liquidation data</strong>, 2D spectrogram heatmaps, open interest clusters, cumulative liquidation delta (CLD), multi-exchange long/short ratios, and calculate exact bankruptcy thresholds across Binance, Bybit, OKX, and Deribit.
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

      {/* 3. CUMULATIVE LIQUIDATION DELTA (CLD) & ORDER BOOK FOOTPRINT */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-500 flex items-center justify-center font-black border border-purple-500/30">
              <LineChart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Cumulative Liquidation Delta (CLD) &amp; Order Book Footprint
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Track real-time delta between long and short wipeouts to spot institutional exhaustion and absorption
              </p>
            </div>
          </div>

          {/* Time Window Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            {(["1H", "4H", "24H", "7D"] as const).map((win) => (
              <button
                key={win}
                onClick={() => setCldWindow(win)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-black transition ${
                  cldWindow === win
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {win} Window
              </button>
            ))}
          </div>
        </div>

        {/* CLD Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/70 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Long Liquidation Vol ({cldWindow})</span>
            <div className="text-xl font-black text-rose-500 font-mono">
              {activeCld.longLiq}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Forced market sells executed</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/70 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Short Liquidation Vol ({cldWindow})</span>
            <div className="text-xl font-black text-emerald-500 font-mono">
              {activeCld.shortLiq}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Forced market buys executed</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/70 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Net Cumulative Delta (CLD)</span>
            <div className="text-xl font-black text-purple-600 dark:text-purple-400 font-mono">
              {activeCld.netDelta}
            </div>
            <span className="text-[11px] text-purple-500 font-bold">{activeCld.bias}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/70 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Order Book Air Pocket Zone</span>
            <div className="text-sm font-black text-amber-500 font-mono truncate">
              {activeCld.airPocketZone}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">High-speed slippage channel</span>
          </div>
        </div>

        {/* 3 Deep Dive Architecture Footprint Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-black text-white">CLD vs CVD Divergence</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When <strong>Cumulative Volume Delta (CVD)</strong> rises while price falls, institutional limit buyers are actively absorbing the market sell orders generated by long liquidations. This bullish divergence reliably signals market bottoms.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-black text-white">Liquidity Air Pockets</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Between dense yellow liquidation shelves lies a vacuum of resting limit orders called an <strong>Air Pocket</strong>. Once the first stop tier is breached, price slides through the air pocket with near-zero friction until the next shelf is reached.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <Binary className="w-4 h-4 text-rose-400" />
              <h4 className="text-sm font-black text-white">Market Maker Gamma Inversion</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Derivatives market makers running delta-neutral books become <strong>Short Gamma</strong> near heavy strike strikes. To hedge their risk, they must aggressively sell into market selloffs and buy into rallies, magnifying liquidation cascades.
            </p>
          </div>
        </div>
      </div>

      {/* 4. HISTORICAL MULTI-BILLION DOLLAR LIQUIDATION CASCADE TIMELINE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center font-black border border-rose-500/30">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Historical Multi-Billion Dollar Liquidation Cascades
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Interactive case studies of legendary crypto deleveraging wipeouts, market maker mechanics, and risk lessons
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Event Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {HISTORICAL_CASCADES.map((ev) => (
            <button
              key={ev.id}
              onClick={() => setSelectedEventId(ev.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 flex items-center gap-2 border ${
                selectedEventId === ev.id
                  ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 border-amber-400 shadow-md font-black"
                  : "bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{ev.date}</span>
            </button>
          ))}
        </div>

        {/* Selected Historical Case Study Detail Card */}
        <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
                Case Study Analysis • {activeHistoricalEvent.date}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {activeHistoricalEvent.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                <strong>Primary Trigger:</strong> {activeHistoricalEvent.catalyst}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Total Nominal Liquidated</span>
              <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">
                {activeHistoricalEvent.totalLiq}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Price Move Magnitude</span>
              <div className="text-lg font-bold text-amber-400">
                {activeHistoricalEvent.priceDrop}
              </div>
              <span className="text-[11px] text-slate-400">Trough / Peak: {activeHistoricalEvent.btcLow}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Open Interest Wiped</span>
              <div className="text-lg font-bold text-rose-400">
                {activeHistoricalEvent.oiDrop} Total Flush
              </div>
              <span className="text-[11px] text-slate-400">Systemic leverage reset</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Protocol Status</span>
              <div className="text-lg font-bold text-emerald-400">
                Insurance Absorbed
              </div>
              <span className="text-[11px] text-slate-400">SAFU Buffers Activated</span>
            </div>
          </div>

          {/* Anatomy Breakdown */}
          <div className="space-y-2 text-xs leading-relaxed text-slate-300">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Workflow className="w-4 h-4 text-amber-400" />
              <span>Microstructure Anatomy &amp; Engine Mechanics:</span>
            </h4>
            <p className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 text-slate-300">
              {activeHistoricalEvent.anatomy}
            </p>
          </div>

          {/* Key Quantitative Takeaway */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Quantitative Trader Rule:</strong> {activeHistoricalEvent.lessons}
            </p>
          </div>
        </div>
      </div>

      {/* 5. MACRO DERIVATIVES CONTAGION & LEVERAGE SATURATION */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30">
            <Network className="w-3.5 h-3.5 text-blue-500" />
            <span>Macro Contagion Architecture</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Macro Derivatives Contagion &amp; Leverage Saturation Index
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            How systemic leverage saturation triggers multi-asset cascading liquidations across CEXs and DeFi lending protocols
          </p>
        </div>

        {/* Systemic Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Derivatives Leverage Saturation Ratio</span>
            <div className="text-2xl font-black text-amber-500 font-mono">2.85%</div>
            <span className="text-[11px] text-emerald-500 font-bold">Optimal / Non-Saturated (&lt;3.2%)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Multi-Exchange Funding Regime</span>
            <div className="text-2xl font-black text-emerald-500 font-mono">+0.0094% / 8h</div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Moderate Bullish Expansion</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Cross-Margin Contagion Risk</span>
            <div className="text-2xl font-black text-blue-500 font-mono">Low - Controlled</div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Healthy collateral reserves</span>
          </div>
        </div>

        {/* Multi-Step Contagion Chain Diagram */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-black uppercase text-slate-800 dark:text-slate-200 tracking-wider">
            The 5-Stage Cross-Market Liquidation Contagion Chain:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-amber-500">Stage 1</span>
              <div className="font-bold text-slate-900 dark:text-white">Spot Shock</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">A macro catalyst triggers a sudden 2-3% spot price drop.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-rose-500">Stage 2</span>
              <div className="font-bold text-slate-900 dark:text-white">100x & 50x Flushed</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">High-leverage stops trigger forced market sell orders.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-purple-500">Stage 3</span>
              <div className="font-bold text-slate-900 dark:text-white">Cross-Margin Breach</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Traders collateral (ETH/SOL) is automatically liquidated.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-blue-500">Stage 4</span>
              <div className="font-bold text-slate-900 dark:text-white">DeFi Vault Auctions</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Maker & Aave liquidators auction collateral via DEX swaps.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-emerald-500">Stage 5</span>
              <div className="font-bold text-slate-900 dark:text-white">Capitulation Bottom</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Limit buyers absorb the exhaustion wave; V-shape bounce forms.</p>
            </div>
          </div>
        </div>

        {/* Funding Rate Regime Forward 7-Day Alpha Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="pb-3 font-black uppercase">Funding Regime</th>
                <th className="pb-3 font-black uppercase">8h Rate Range</th>
                <th className="pb-3 font-black uppercase">Annualized APY</th>
                <th className="pb-3 font-black uppercase">Forward 7d Long Win Rate</th>
                <th className="pb-3 font-black uppercase">Expected Institutional Play</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                <td className="py-3 font-bold text-rose-500">Extreme Euphoria / Overleveraged Longs</td>
                <td className="py-3 text-slate-700 dark:text-slate-300">&gt; +0.0500%</td>
                <td className="py-3 text-slate-700 dark:text-slate-300">&gt; +54.7% APY</td>
                <td className="py-3 text-rose-500 font-bold">31.4% (High Flush Risk)</td>
                <td className="py-3 text-slate-500 dark:text-slate-400 font-sans">Cash & Carry Arbitrage or Hedge Spot</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                <td className="py-3 font-bold text-emerald-500">Neutral / Sustainable Equilibrium</td>
                <td className="py-3 text-slate-700 dark:text-slate-300">0.0050% to 0.0150%</td>
                <td className="py-3 text-slate-700 dark:text-slate-300">5.5% - 16.4% APY</td>
                <td className="py-3 text-emerald-500 font-bold">58.2% (Trend Aligned)</td>
                <td className="py-3 text-slate-500 dark:text-slate-400 font-sans">Trend Following Breakout Continuation</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                <td className="py-3 font-bold text-amber-500">Extreme Fear / Overcrowded Shorts</td>
                <td className="py-3 text-slate-700 dark:text-slate-300">&lt; -0.0300%</td>
                <td className="py-3 text-slate-700 dark:text-slate-300">&lt; -32.8% APY</td>
                <td className="py-3 text-emerald-500 font-bold">78.6% (Extreme Squeeze Edge)</td>
                <td className="py-3 text-slate-500 dark:text-slate-400 font-sans">Aggressive Long Mean-Reversion Entry</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. INTERACTIVE COINGLASS CASCADE & SQUEEZE SIMULATOR */}
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

      {/* 7. INTERACTIVE LIVE LEVERAGE & LIQUIDATION PRICE CALCULATOR */}
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
                Calculate precise liquidation price, maintenance margin buffer, and distance-to-wipeout across Isolated &amp; Cross Margin
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Margin Mode Selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setCalcMarginMode("ISOLATED")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  calcMarginMode === "ISOLATED"
                    ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-black"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                ISOLATED
              </button>
              <button
                onClick={() => setCalcMarginMode("CROSS")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  calcMarginMode === "CROSS"
                    ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-black"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                CROSS
              </button>
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
                <span>LONG</span>
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
                <span>SHORT</span>
              </button>
            </div>
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

            {/* Wallet Balance Input for Cross Margin */}
            {calcMarginMode === "CROSS" && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between">
                  <span>Account Cross Collateral Balance (USD)</span>
                  <span className="text-[11px] font-mono text-slate-400">Total Futures Equity</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    value={calcWalletBalance}
                    onChange={(e) => setCalcWalletBalance(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition"
                  />
                </div>
              </div>
            )}

            {/* Leverage Slider & Presets (for Isolated Margin) */}
            {calcMarginMode === "ISOLATED" && (
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
            )}

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
                <span className="text-xs uppercase font-bold text-slate-400 font-mono">Computed Liquidation Threshold ({calcMarginMode})</span>
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

      {/* 8. THE 4 PROVEN COINGLASS TRADING STRATEGIES */}
      <div className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
            <Award className="w-3.5 h-3.5 text-emerald-500" />
            <span>Quantitative Execution Playbook</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            4 Proven Trading Strategies Using Coinglass Liquidation Data
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Actionable step-by-step methodologies used by institutional hedge funds and proprietary crypto desks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* 9. TECHNICAL & FUNDAMENTAL COINGLASS KNOWLEDGE SUITE */}
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

      {/* 10. CROSS-EXCHANGE LIQUIDATION PROTOCOLS COMPARISON TABLE */}
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

      {/* 11. COINGLASS DERIVATIVES & LIQUIDATION GLOSSARY */}
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

      {/* 12. COINGLASS FREQUENTLY ASKED QUESTIONS ACCORDION WITH RICH SCHEMA */}
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
