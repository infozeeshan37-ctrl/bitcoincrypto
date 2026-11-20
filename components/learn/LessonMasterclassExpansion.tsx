import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  HelpCircle,
  TrendingUp,
  Scale,
  ShieldCheck,
  Layers,
  Cpu,
  Target,
  BarChart2
} from "lucide-react";
import { CourseArticle, CourseChapter } from "@/lib/courseData";

interface LessonMasterclassExpansionProps {
  article: CourseArticle;
  chapter?: CourseChapter;
}

export default function LessonMasterclassExpansion({
  article,
  chapter
}: LessonMasterclassExpansionProps) {
  const category = chapter?.category || "fundamentals";
  const level = article.chapterLevel || "Beginner";

  // Category-specific pedagogical content generator
  const getCategoryPedagogy = () => {
    switch (category) {
      case "derivatives":
        return {
          themeColor: "rose",
          domainName: "Derivatives & Perpetual Futures",
          whyItMatters:
            "Derivatives markets account for more than 75% of total cryptocurrency transaction volume. Without mastering perpetual swap funding rates, open interest dynamics, and CoinGlass liquidation clusters, an analyst is flying blind. Price movements in modern crypto are predominantly driven by forced liquidations and mechanical margin cascades rather than organic spot spot accumulation.",
          practicalSteps: [
            {
              title: "Step 1: Check Open Interest (OI) Expansion",
              desc: "Determine whether systemic leverage is entering or leaving the market. Rising OI accompanied by rising price signals aggressive long leverage buildup."
            },
            {
              title: "Step 2: Inspect 8-Hour Funding Rates",
              desc: "Calculate whether long or short traders are paying the premium. Extreme positive funding (>0.03% per 8h) signals dangerously crowded long trades prone to a squeeze."
            },
            {
              title: "Step 3: Map Liquidation Heatmap Clusters",
              desc: "Locate where high-density leverage pools reside on CoinGlass spectrograms. These bright clusters function as liquidity magnets for market makers."
            },
            {
              title: "Step 4: Formulate Invalidation & Sizing",
              desc: "Never enter a derivatives position without calculating your exact liquidation price. Keep leverage strictly below 2x–3x to withstand 15% normal market flushes."
            }
          ],
          retailTraps: [
            "Overleveraging at cycle tops: Retail traders mistakenly believe 20x or 50x leverage increases profits, when in reality a 2% adverse wick guarantees 100% account bankruptcy.",
            "Shorting high negative funding blindly: When funding is negative, shorts pay longs. Retail traders assume this means price must fall, only to get annihilated in a vicious short squeeze.",
            "Ignoring the CoinGlass liquidation magnet: Placing stop-losses right where millions of dollars in liquidations rest, making your order the exact exit liquidity whales seek."
          ],
          faqs: [
            {
              q: `How does ${article.title.replace(/^\d+\.\s*/, "")} impact everyday spot and derivatives traders?`,
              a: "Understanding this mechanism allows traders to anticipate forced market moves before they happen. When leveraged participants are overextended, the market naturally sweeps their liquidation levels to generate the liquidity needed for institutional order execution."
            },
            {
              q: "Can paper traders practice derivatives analysis without financial risk?",
              a: "Yes! BitcoinCrypto.tech provides interactive simulators, including the CoinGlass liquidation heatmap radar and position sizer, allowing learners to test leverage theories in a simulated demo environment with zero real-money risk."
            },
            {
              q: "What is the single most important metric to monitor alongside this concept?",
              a: "Always monitor Cumulative Volume Delta (CVD) alongside perpetual funding rates. If funding is deeply positive but CVD is declining, it indicates that aggressive buyers are exhausted and limit sellers are absorbing volume."
            }
          ]
        };

      case "macro":
        return {
          themeColor: "emerald",
          domainName: "Macroeconomics & Central Bank Monetary Cycles",
          whyItMatters:
            "Cryptocurrency does not trade in an isolated vacuum. Bitcoin operates as the world's most sensitive liquidity sponge for global fiat debasement. When central banks expand global M2 money supply, execute stealth yield curve control, or cut benchmark policy rates, digital assets absorb excess capital rapidly. Mastering macroeconomics prevents you from fighting the Federal Reserve.",
          practicalSteps: [
            {
              title: "Step 1: Track Global M2 Expansion",
              desc: "Monitor aggregated central bank balance sheets (Fed, ECB, BoJ, PBOC). Bitcoin cycles exhibit an 80%+ historical correlation with year-over-year global M2 expansion."
            },
            {
              title: "Step 2: Parse BLS CPI & PCE Reports",
              desc: "Dissect monthly inflation prints into headline vs core components. Cooler core inflation increases Federal Reserve rate cut probabilities, weakening the US Dollar."
            },
            {
              title: "Step 3: Monitor the US Dollar Index (DXY)",
              desc: "Track the DXY currency index for inverse beta movements. A breakdown in DXY below key technical support historically unleashes aggressive crypto bull runs."
            },
            {
              title: "Step 4: Position Ahead of FOMC Cycles",
              desc: "Analyze Fed funds futures and the CME FedWatch tool to assess whether rate cuts or quantitative easing cycles are fully priced in by bond markets."
            }
          ],
          retailTraps: [
            "Trading the initial 8:30 AM CPI knee-jerk: High-frequency algorithms frequently print violent fakeout wicks in both directions within the first 5 minutes of a macro data release.",
            "Ignoring the US Dollar Index (DXY): Buying altcoins aggressively while the US Dollar is undergoing a parabolic safe-haven flight.",
            "Believing Bitcoin is purely an inflation hedge: Bitcoin does not react to backward-looking consumer price indices; it reacts to forward-looking central bank liquidity and monetary debasement."
          ],
          faqs: [
            {
              q: `Why is ${article.title.replace(/^\d+\.\s*/, "")} fundamental to long-term digital asset valuation?`,
              a: "Because Bitcoin has a mathematically fixed supply of 21 million units, its price is determined by the denominator—the trillions of rapidly expanding fiat currency units circulating worldwide. Macroeconomics measures the supply of that denominator."
            },
            {
              q: "How does the Federal Reserve balance sheet impact crypto liquidity?",
              a: "When the Fed engages in Quantitative Easing (QE) or Treasury bond buybacks, commercial bank reserves swell, driving yields lower and forcing capital into higher-yielding digital risk assets."
            },
            {
              q: "Where can learners inspect live macroeconomic data on this platform?",
              a: "Visit our dedicated US CPI Macro Intelligence Terminal (/cpi) to view live release schedules, consensus estimates, and historical Bitcoin volatility reactions."
            }
          ]
        };

      case "microstructure":
      case "technical":
        return {
          themeColor: "blue",
          domainName: "Market Microstructure & Order Flow",
          whyItMatters:
            "Traditional technical analysis teaches static chart patterns like triangles and flags. However, modern markets are executed electronically by algorithms operating on the Central Limit Order Book (CLOB). By learning how passive limit orders interact with aggressive market taker orders, students understand the true mechanical physics of price discovery.",
          practicalSteps: [
            {
              title: "Step 1: Analyze Level-2 Order Book Depth",
              desc: "Examine resting limit buy orders (bids) and limit sell orders (asks). Identify where large resting walls create structural support or overhead resistance."
            },
            {
              title: "Step 2: Calculate Cumulative Volume Delta (CVD)",
              desc: "Track the running net difference between market buy volume and market sell volume to detect whether aggressive buyers or sellers dominate execution."
            },
            {
              title: "Step 3: Spot Institutional Absorption",
              desc: "Look for zones where intense aggressive taker volume fails to move the price. This reveals that an institutional limit wall is absorbing all supply."
            },
            {
              title: "Step 4: Verify Order Book Imbalance (OBI)",
              desc: "Compute the ratio of bid depth to ask depth within a 2% price corridor. Asymmetry greater than +0.30 indicates strong upward structural pressure."
            }
          ],
          retailTraps: [
            "Mistaking total volume for buyer strength: A massive volume bar can represent retail buyers eagerly market-buying directly into a massive institutional limit sell wall.",
            "Falling for spoof walls: Assuming a 1,000 BTC buy wall is genuine support, only to watch the whale cancel it milliseconds before price touches the level.",
            "Chasing breakout wicks: Buying green candle tops after price has already swept liquidity, leaving retail traders holding the bag as price mean-reverts."
          ],
          faqs: [
            {
              q: `How can beginners apply ${article.title.replace(/^\d+\.\s*/, "")} on real charts?`,
              a: "Beginners should practice on our Level-2 Order Book Terminal (/orderbook). Watch how the live bid/ask queue shifts during active volatility and observe how CVD reacts to price retests."
            },
            {
              q: "What is the difference between passive makers and aggressive takers?",
              a: "Makers place limit orders that rest in the queue and provide liquidity, paying lower fees. Takers cross the spread to execute immediately with market orders, consuming liquidity and driving price movement."
            },
            {
              q: "Why do market makers sweep resting liquidity before initiating a trend?",
              a: "Large institutions cannot fill multi-million-dollar orders without suffering massive slippage. By driving price into dense clusters of retail stop-losses, they trigger the market orders needed to fill their position."
            }
          ]
        };

      case "risk":
        return {
          themeColor: "amber",
          domainName: "Mathematical Risk Architecture & Position Sizing",
          whyItMatters:
            "In financial markets, you do not control the outcome of any individual trade; you control only how much capital you risk. The mathematics of capital preservation prove that recovering from a 50% drawdown requires a 100% gain, while a 90% loss requires an impossible 900% gain. Risk management is the non-negotiable prerequisite for multi-year survival.",
          practicalSteps: [
            {
              title: "Step 1: Cap Maximum Risk at 1% of Equity",
              desc: "Never risk losing more than 1.0% to 1.5% of total portfolio capital on any single setup, regardless of how confident you feel."
            },
            {
              title: "Step 2: Identify Structural Invalidation",
              desc: "Find the exact price level on the chart where your educational thesis is proven mathematically false. This is your mandatory stop-loss."
            },
            {
              title: "Step 3: Calculate Position Size Backward",
              desc: "Position Size = Dollar Risk / (Entry Price - Stop Loss Price). Sizing must be dictated by stop distance, never by arbitrary hunch."
            },
            {
              title: "Step 4: Require Minimum 1:2 Risk-to-Reward",
              desc: "Ensure projected take-profit targets offer at least twice the potential gain compared to the capital placed at risk."
            }
          ],
          retailTraps: [
            "Moving stop-losses backward: The fatal psychological error of dragging stop-losses further away when price moves against you, turning a small 1% loss into a 25% catastrophe.",
            "Revenge trading after a loss: Doubling down on leverage immediately after being stopped out in an emotional attempt to win back lost capital.",
            "Neglecting asymmetric drawdown math: Failing to realize that losing 50% of your account cuts your position sizing capacity in half, compounding the difficulty of recovery."
          ],
          faqs: [
            {
              q: `What is the core takeaway of ${article.title.replace(/^\d+\.\s*/, "")}?`,
              a: "The core lesson is that long-term profitability is a function of geometric mean compounding and drawdown minimization, not win-rate percentage."
            },
            {
              q: "How does the Kelly Criterion help crypto analysts?",
              a: "The Kelly Criterion calculates the mathematically optimal capital allocation fraction based on win rate and payoff ratio. In volatile crypto markets, using a conservative Half-Kelly model prevents catastrophic ruin."
            },
            {
              q: "Where can I test position sizing calculations?",
              a: "Use our interactive Position Sizing & Risk Calculator (/tools/position-sizer) to model exact contract quantities, stop distances, and margin allocations for free."
            }
          ]
        };

      default:
        return {
          themeColor: "amber",
          domainName: "Blockchain Fundamentals & Digital Scarcity",
          whyItMatters:
            "Understanding foundational blockchain architecture—Satoshi consensus, thermodynamic Proof-of-Work, UTXO ledgers, and the 21-million hard cap—is what separates serious quantitative analysts from speculative gamblers. Digital scarcity is not a marketing term; it is a breakthrough in distributed computer science and game theory.",
          practicalSteps: [
            {
              title: "Step 1: Understand Nakamoto Consensus",
              desc: "Study how Proof-of-Work couples thermodynamic computational energy with game-theoretic economic incentives to solve the Byzantine Generals problem."
            },
            {
              title: "Step 2: Analyze the UTXO Accounting Model",
              desc: "Unlike account-based bank balances, Bitcoin transactions consume unspent transaction outputs (UTXOs) like discrete currency notes, enabling auditable on-chain verification."
            },
            {
              title: "Step 3: Model the 4-Year Halving Cycle",
              desc: "Track how programmatic 50% cuts to miner block subsidies reduce newly minted daily supply, creating structural deficits against growing global liquidity."
            },
            {
              title: "Step 4: Verify Network Hashrate & Security",
              desc: "Inspect the total computational energy securing the blockchain. A rising hashrate confirms that the network is thermodynamically impregnable."
            }
          ],
          retailTraps: [
            "Confusing token price with market capitalization: Assuming a coin priced at $0.001 is 'cheaper' than Bitcoin without checking total circulating supply.",
            "Ignoring the security trilemma: Believing high-throughput blockchains that sacrifice decentralized node validation are superior to Bitcoin's robust settlement layer.",
            "Failing to understand Proof-of-Work thermodynamics: Overlooking that real-world energy expenditure is what prevents history from being rewritten at zero cost."
          ],
          faqs: [
            {
              q: `Why is ${article.title.replace(/^\d+\.\s*/, "")} essential for digital asset literacy?`,
              a: "Because without understanding the computer science and cryptographic primitives of distributed consensus, investors cannot properly evaluate counterparty risk, central points of failure, or long-term monetary viability."
            },
            {
              q: "How does the 21 million hard cap enforce programmatic scarcity?",
              a: "The issuance algorithm is hardcoded in the Bitcoin Core client and enforced by tens of thousands of independent full nodes worldwide. Any miner producing an invalid block is rejected by the entire network."
            },
            {
              q: "Where can I simulate systematic Bitcoin accumulation?",
              a: "Test our free Dollar-Cost Averaging Simulator (/tools/dca-simulator) to backtest weekly and monthly accumulation schedules across previous 4-year halving cycles."
            }
          ]
        };
    }
  };

  const pData = getCategoryPedagogy();

  return (
    <div className="space-y-10 pt-6 border-t border-slate-200 dark:border-slate-800 transition-colors">
      
      {/* 1. Teacher's Deep Pedagogical Breakdown */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60">
          <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
          <span>Masterclass Curriculum • In-Depth Teacher&apos;s Guide</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Teacher&apos;s Breakdown: Understanding the Core Mechanics of {article.title.replace(/^\d+\.\s*/, "")}
        </h2>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            When teaching digital asset analysis to university students and market researchers, we emphasize that <strong>{article.title.replace(/^\d+\.\s*/, "")}</strong> is not an abstract theoretical puzzle. It is an active, living mechanism operating continuously across global decentralized networks and electronic limit order books.
          </p>
          <p>
            {pData.whyItMatters}
          </p>
          <p>
            By breaking this topic down into verifiable empirical principles, learners transition from relying on speculative social media commentary to developing independent, quantitative market literacy. Below is the four-stage practical framework utilized by quantitative researchers to evaluate this concept.
          </p>
        </div>
      </section>

      {/* 2. Step-by-Step Practical Application Framework */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-500" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Practical 4-Stage Execution &amp; Verification Framework
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pData.practicalSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs"
            >
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-mono font-black flex items-center justify-center text-xs shrink-0">
                  {idx + 1}
                </span>
                <span>{step.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-8">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Costly Misconceptions & Retail Traps to Avoid */}
      <section className="p-6 sm:p-8 rounded-3xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-4">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base sm:text-lg">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
          <span>Common Retail Misconceptions &amp; Costly Pitfalls</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          More than 90% of retail market participants lose capital because they fall victim to superficial interpretations of {pData.domainName}. Avoid these three structural traps:
        </p>

        <ul className="space-y-3 pt-1">
          {pData.retailTraps.map((trap, tIdx) => (
            <li
              key={tIdx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-rose-200/80 dark:border-rose-900/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
              <span className="leading-relaxed">{trap}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Classroom Review & Frequently Asked Student Questions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Student Q&amp;A: Key Conceptual Clarifications
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Chapter {article.chapterNumber} • Level: {level}
          </span>
        </div>

        <div className="space-y-3">
          {pData.faqs.map((faq, fIdx) => (
            <div
              key={fIdx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs"
            >
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-start gap-2.5">
                <span className="text-amber-500 font-mono font-black text-xs mt-0.5">Q{fIdx + 1}:</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Educational Purpose Only Notice */}
      <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Educational Instruction Notice • Non-Financial Advice</span>
        </div>
        <p className="leading-relaxed text-[11.5px]">
          All educational materials, code samples, mathematical equations, and interactive exercises in Chapter {article.chapterNumber} of the BitcoinCrypto.tech Masterclass are provided strictly for <strong>pedagogical instruction, economic research, and paper-trading simulation</strong>. BitcoinCrypto.tech does not offer financial advisory, brokerage execution, or custodial services. Always conduct independent research before committing capital to digital assets.
        </p>
      </div>

    </div>
  );
}
