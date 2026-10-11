import { AgentPersona, ChatMessage } from './types';

export const DEFAULT_MODELS = [
  'qwen/qwen3.8-27b',
  'openai/gpt-oss-120b',
  'groq/compound',
  'qwen/qwen3.6-27b',
  'openai/gpt-oss-20b',
];

export function buildAgentSystemPrompt(agent: AgentPersona): string {
  return `You are ${agent.name}, the ${agent.title} in the ${agent.department} at BitcoinCrypto.tech.

CRITICAL RESEARCH DESK PERSONA INSTRUCTIONS:
1. You are a live specialist and quantitative researcher at BitcoinCrypto.tech based in ${agent.location}.
2. Tone & Personality: ${agent.tone}. Experience: ${agent.experience}. Specialties: ${agent.specialties.join(', ')}.
3. Communication Style:
   - Provide institutional, clear, educational answers regarding cryptocurrency market data, liquidation heatmaps, order books, DCA mathematics, and economic trends.
   - Use clean Markdown formatting with bold text or bullet points when explaining technical indicators or risk formulas.
   - STRICT COMPLIANCE: BitcoinCrypto.tech is strictly an educational research and market intelligence platform. NEVER promise guaranteed trading returns or claim to offer financial/investment advice. Remind users to practice disciplined risk management (1-2% max account risk).
   - BitcoinCrypto.tech does NOT accept deposits, custody user funds, execute real trades, or charge trading fees. All interactive prediction arenas operate with a simulated $10,000 USDT demo paper wallet.

COMPLETE BITCOINCRYPTO.TECH PLATFORM KNOWLEDGE:
- **Platform Identity**: BitcoinCrypto.tech is a premier digital asset market intelligence, order flow analytics, and quantitative research suite.
- **Pages & Navigation**:
  • / (Home): Real-time crypto ecosystem overview, live market tickers, AI signals copilot, and market intelligence dashboard.
  • /predictions: 5-Minute Binary Price Prediction Arena synchronized with Binance epochs, DeepQuant Neural AI Bot, and a free $10,000 USDT demo paper wallet.
  • /markets: Live spot & perpetual prices, 24h volume, market cap rankings, gainers/losers, and crypto dominance metrics.
  • /orderbook: L2 Central Limit Order Book (CLOB) terminal with live 10-level bid/ask depth, Cumulative Volume Delta (CVD), and micro-tick telemetry.
  • /whale-orders: Whale order flow radar tracking high-value institutional transactions and liquidity walls.
  • /cpi: US CPI AI Predictor, historical inflation releases, FOMC interest rate schedule, and macroeconomic sensitivity analysis.
  • /coinglass: Derivatives analytics hub including:
      - Liquidation Heatmaps: Visualizes clustered stop-loss orders and forced liquidation pools.
      - Open Interest & Volume: Tracks institutional capital flows in perpetuals.
      - Funding Rates: 8-hour funding intervals (00:00, 08:00, 16:00 UTC) across BTC, ETH, SOL.
      - Long/Short Ratios & Order Book Imbalances.
  • /tools: Suite of trading calculators and terminals:
      - Trading Bot Copilot (/tools/trading-bot): Quantitative technical signal scanner.
      - Chart Terminal (/tools/chart-terminal): Advanced TradingView charting suite.
      - DCA Simulator (/tools/dca-simulator): Harmonic mean dollar-cost averaging backtester.
      - Position Sizer (/tools/position-sizer): Kelly Criterion risk calculator.
      - Crypto Converter (/tools/crypto-converter): Live fiat/crypto currency conversion calculator.
      - Liquidation Heatmap Tool (/tools/liquidation-heatmap): Multi-exchange liquidation scanner.
      - Funding Rate Screener (/tools/funding-rate-screener): Multi-exchange basis rate tracker.
  • /concepts: Quantitative masterclasses covering Central Limit Order Books, liquidity sweeps, funding basis, and Kelly Criterion.
  • /blog: In-depth macroeconomic whitepapers, Bitcoin halving cycles, and ETF flow analyses.
  • /news: 24/7 breaking cryptocurrency news and macroeconomic reports.
  • /about: Platform architecture, methodology, research desk credentials, and LLM indexing standard.
  • /privacy, /terms, /disclaimer, /cookie-policy: Comprehensive compliance documentation.

- **Non-Custodial & Educational Model**:
  • 100% Free Access: All tools and articles are free, supported by compliant advertising (Google AdSense).
  • Zero Deposits / Custody: Users never deposit real capital. Demo wallets are local simulated storage only.
  • Non-Financial Advice: Content is solely for educational, analytical, and research purposes.`;
}

/**
 * Calculates a realistic human reading and typing pause in milliseconds
 */
export function calculateRealisticHumanTypingDelay(
  responseText: string,
  typingSpeedWpm: number = 55
): number {
  const wordCount = responseText.trim().split(/\s+/).length;
  const readingPauseMs = 1200 + Math.random() * 600;
  const typingMs = Math.min((wordCount / typingSpeedWpm) * 60000 * 0.25, 2500);
  const totalDelay = readingPauseMs + typingMs;

  return Math.min(Math.max(totalDelay, 2400), 4500);
}

/**
 * Executes a live request to Groq API via our secure backend API route
 */
export async function sendGroqChatRequest({
  messages,
  agent,
}: {
  messages: ChatMessage[];
  agent: AgentPersona;
}): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        agentId: agent.id,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.reply && data.reply.trim().length > 0) {
        return data.reply.trim();
      }
    }

    return simulateHumanAgentReply(messages[messages.length - 1]?.text || '', agent, messages);
  } catch (err) {
    console.error('Error contacting support chat API:', err);
    return simulateHumanAgentReply(messages[messages.length - 1]?.text || '', agent, messages);
  }
}

/**
 * High-quality dynamic fallback engine if offline
 */
export function simulateHumanAgentReply(
  userText: string,
  agent: AgentPersona,
  history: ChatMessage[]
): string {
  const query = userText.toLowerCase().trim();

  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|sup|yo)\b/i.test(query)) {
    return `Hello! ${agent.name} here from BitcoinCrypto.tech's ${agent.department}. How can I assist you with analyzing market data, liquidation heatmaps, or exploring our research tools today?`;
  }

  if (/are you (a )?(bot|ai|robot|real|human|person)/i.test(query)) {
    return `I am ${agent.name}, a specialist at BitcoinCrypto.tech's ${agent.department} based in ${agent.location}. I'm here to assist you with exploring our market intelligence platform and quantitative research!`;
  }

  if (query.includes('liquidation') || query.includes('liquidat') || query.includes('heatmap')) {
    return `Regarding CoinGlass liquidation heatmaps on BitcoinCrypto.tech:\n\n• **Yellow/Bright Zones**: Highlight massive resting stop-loss orders and forced liquidation clusters.\n• **Liquidity Sweeps**: Institutional market makers often drive price into these pools to accumulate or distribute inventory before a reversal.\n• **Tools**: You can inspect real-time maps at [/coinglass](/coinglass) or use our dedicated tool at [/tools/liquidation-heatmap](/tools/liquidation-heatmap).`;
  }

  if (query.includes('funding') || query.includes('perpetual') || query.includes('rate')) {
    return `Perpetual futures settle funding every 8 hours (00:00, 08:00, 16:00 UTC). When funding is positive, long traders pay short traders; when negative, short traders pay longs. You can screen multi-exchange rates across BTC, ETH, and altcoins in our [/tools/funding-rate-screener](/tools/funding-rate-screener).`;
  }

  if (query.includes('prediction') || query.includes('deepquant') || query.includes('signal') || query.includes('bot')) {
    return `Our **DeepQuant AI Prediction Arena** (/predictions) evaluates multi-factor technical indicators (1m/5m EMA, RSI, CVD taker flow) synchronized with Binance 5-minute epochs. It features a free simulated $10,000 USDT demo paper wallet so you can test algorithmic strategies with zero financial risk. Remember, past backtested performance does not guarantee future results!`;
  }

  if (query.includes('fee') || query.includes('cost') || query.includes('pricing') || query.includes('free')) {
    return `BitcoinCrypto.tech is **100% free** to use for traders and researchers worldwide! We do not charge subscription fees, deposit fees, or platform fees. Our operations are supported through compliant digital advertising (including Google AdSense).`;
  }

  return `Thanks for reaching out to the BitcoinCrypto.tech ${agent.department}! I'm looking into your query regarding "${userText.slice(0, 50)}". Feel free to ask about our live order books (/orderbook), liquidation heatmaps (/coinglass), or DCA simulators (/tools/dca-simulator)!`;
}
