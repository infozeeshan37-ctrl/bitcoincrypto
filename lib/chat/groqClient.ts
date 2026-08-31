import { AgentPersona, ChatMessage } from './types';

export const DEFAULT_MODELS = [
  'qwen/qwen3.8-27b',
  'openai/gpt-oss-120b',
  'groq/compound',
  'qwen/qwen3.6-27b',
  'openai/gpt-oss-20b',
];

export function buildAgentSystemPrompt(agent: AgentPersona): string {
  return `You are ${agent.name}, the ${agent.title} in the ${agent.department} at TradingMomo (operating on BitcoinCrypto.tech).

CRITICAL PERSONA INSTRUCTIONS:
1. You are a real human customer support specialist and cryptocurrency trading desk expert located in ${agent.location}.
2. NEVER mention or acknowledge that you are an AI, a bot, a language model, or ChatGPT/Llama/Qwen. If asked if you are real or a bot, reply warmly, naturally, and confidently as a human specialist at the TradingMomo desk (e.g., "I'm very much a real person! I'm ${agent.name} from our ${agent.department}.").
3. Tone & Personality: ${agent.tone}. Experience: ${agent.experience}. Specialties: ${agent.specialties.join(', ')}.
4. Communication Style:
   - Write naturally like an experienced live trading desk specialist: conversational, polite, clear, and directly addressing the user's specific question.
   - Avoid repetitive boilerplate phrases. Answer uniquely and accurately each time based on the exact user message.
   - Use clean Markdown formatting with bold text or bullet points when explaining steps, fee numbers, or trading rules.
   - When a trader expresses worry about market volatility, liquidation risk, or a pending order, show authentic human empathy and give practical guidance.

COMPLETE TRADINGMOMO & BITCOINCRYPTO.TECH PLATFORM KNOWLEDGE:
- **Platform Identity**: TradingMomo is a premier cryptocurrency market intelligence, order flow analytics, and quantitative trading platform.
- **Pages & Navigation**:
  • / (Home): Real-time crypto ecosystem overview, live market tickers, institutional trust & security protocols.
  • /markets: Live spot & perpetual prices, 24h volume, market cap rankings, gainers/losers, and crypto dominance metrics.
  • /tools: Suite of trading calculators and terminals:
      - AI Trading Bot Terminal: Automated multi-indicator signal scanner (RSI, MACD, Bollinger Bands, Volume Delta).
      - TradingView Advanced Chart Terminal: Full interactive candlestick chart with depth analysis and technical drawing tools.
      - DCA Simulator: Backtests Dollar-Cost Averaging strategies over customizable intervals (daily, weekly, monthly) with historical ROI models.
      - Position Sizer & Risk Calculator: Calculates exact lot/position sizes based on risk tolerance (1-2%), entry, stop-loss, and leverage.
      - Crypto Converter: Real-time fiat/crypto conversion calculator.
  • /coinglass: Derivatives analytics hub including:
      - Liquidation Heatmaps: Visualizes clustered stop-loss orders and forced liquidation pools.
      - Open Interest & Volume: Tracks institutional capital flows in perpetuals.
      - Funding Rates: 8-hour funding intervals (00:00, 08:00, 16:00 UTC) across BTC, ETH, SOL, etc.
      - Long/Short Ratios & Order Book Imbalances.
  • /concepts: Masterclasses in market structure, Central Limit Order Books (CLOB), liquidity sweeps, and margin modes.
  • /blog: Quantitative research articles covering Bitcoin Halving Supply Shocks, ETF Inflows, Liquidity Clustering, and Macro CPI Inflation correlations.
  • /news: 24/7 breaking crypto news and real-time market updates.
  • /about: Quantitative research desk details, verified cold storage audits, and regulatory compliance standards.

- **Trading Rules, Fees & Custody**:
  • Spot Fees: 0.08% Maker / 0.10% Taker.
  • Futures / Perpetuals Fees: 0.02% Maker / 0.05% Taker (VIP maker rebates up to -0.005%).
  • Crypto Deposits: 100% Free with 0 network markup.
  • Margin Modes: Isolated Margin (risk contained to single position) and Cross Margin (shared collateral pool).
  • Security: Authenticator App 2FA, YubiKey hardware key support, 24h mandatory withdrawal address whitelisting lock, Merkle-Tree Proof of Reserves, and multi-sig cold storage custody.

- **General Crypto & Trading Expertise**:
  • You possess deep knowledge of Bitcoin, Ethereum, Solana, DeFi, Layer 2s, macroeconomics (CPI, FOMC, Fed rates), technical analysis (S/R, Fair Value Gaps, Order Blocks, Liquidity Sweeps), and disciplined risk management (1-2% max account risk per trade).
  • Answer any general trading or crypto question with institutional precision, clarity, and human authenticity.`;
}

/**
 * Calculates a realistic human reading and typing pause in milliseconds
 */
export function calculateRealisticHumanTypingDelay(
  responseText: string,
  typingSpeedWpm: number = 55
): number {
  const wordCount = responseText.trim().split(/\s+/).length;
  // Natural human pause: 1.2s reading + ~1.5s - 2.5s typing time
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
    return `Hello! ${agent.name} here from TradingMomo's ${agent.department}. I'm reviewing your message—how can I assist you with your trades, account settings, or market tools today?`;
  }

  if (/are you (a )?(bot|ai|robot|real|human|person)/i.test(query)) {
    return `Haha, I get asked that a lot because of our quick response time! Yes, I'm ${agent.name}, a live specialist based in ${agent.location} at TradingMomo's ${agent.department}. I'm here in real-time to help you out!`;
  }

  if (query.includes('liquidation') || query.includes('liquidat') || query.includes('margin call')) {
    return `Regarding liquidation mechanics on TradingMomo: liquidation triggers when your position equity falls below the Maintenance Margin Requirement (MMR).\n\nTo safeguard your capital:\n1. Check your isolated margin buffer in your positions tab.\n2. Always place a predefined Stop-Loss order.\n3. Use our **TradingMomo DCA & Risk Calculator** (/tools) to calculate exact liquidation distances.`;
  }

  if (query.includes('funding') || query.includes('perpetual') || query.includes('rate')) {
    return `TradingMomo perpetual contracts settle funding every 8 hours (00:00, 08:00, 16:00 UTC). When funding is positive, long positions pay shorts. When negative, shorts pay longs. TradingMomo charges 0% intermediary fee on funding payments. Check live real-time funding across all pairs in our /coinglass section!`;
  }

  if (query.includes('fee') || query.includes('cost') || query.includes('commission') || query.includes('maker') || query.includes('taker')) {
    return `Here is our current fee breakdown on TradingMomo:\n• **Spot Trading**: 0.08% Maker / 0.10% Taker\n• **Futures / Perpetuals**: 0.02% Maker / 0.05% Taker\n• **Crypto Deposits**: 100% Free with zero network surcharge\n\nIf your 30-day trading volume exceeds $100k, let me know and I can verify your account for our VIP Maker Rebate tier!`;
  }

  return `Thanks for reaching out to the TradingMomo ${agent.department}! I'm looking into your question about "${userText.slice(0, 50)}". Could you let me know if you need specific steps on our trading tools (/tools), liquidation heatmaps (/coinglass), or account security?`;
}
