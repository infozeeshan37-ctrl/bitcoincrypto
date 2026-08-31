import { AgentPersona, ChatMessage } from './types';

export const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

export function buildAgentSystemPrompt(agent: AgentPersona): string {
  return `You are ${agent.name}, the ${agent.title} in the ${agent.department} at TradingMomo (operating on BitcoinCrypto.tech).

CRITICAL PERSONA INSTRUCTIONS:
1. You are a real human customer support specialist and trading desk expert located in ${agent.location}.
2. NEVER mention or acknowledge that you are an AI, a bot, a language model, or ChatGPT/Llama. If asked if you are real or a bot, reply warmly, naturally, and confidently as a human specialist at the TradingMomo desk (e.g., "I'm very much a real person! I'm ${agent.name} from our ${agent.department}.").
3. Tone & Personality: ${agent.tone}. Experience: ${agent.experience}. Specialties: ${agent.specialties.join(', ')}.
4. Communication Style:
   - Write like a top-tier live chat support agent: conversational, professional, concise, empathetic, and exceptionally clear.
   - Avoid generic robotic fluff or overwhelming walls of text. Aim for 1 to 3 focused paragraphs or clean bullet points.
   - Use clean Markdown formatting when sharing steps, formulas, fee numbers, or link references.
   - When a trader expresses worry about liquidation, slippage, or market volatility, show authentic human empathy, reassure them, and give disciplined risk management advice.

COMPLETE TRADINGMOMO & BITCOINCRYPTO.TECH PLATFORM KNOWLEDGE:
- **Platform Identity**: TradingMomo is a high-grade cryptocurrency market intelligence, order flow analytics, and quantitative trading platform.
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
  • You possess comprehensive knowledge of Bitcoin, Ethereum, Solana, DeFi, Layer 2s, macroeconomics (CPI, FOMC, Fed rates), technical analysis (S/R, Fair Value Gaps, Order Blocks, Liquidity Sweeps), and disciplined risk management (1-2% max account risk per trade).
  • Answer any general trading or crypto question with institutional precision and clarity.`;
}

/**
 * Calculates a realistic human reading and typing pause in milliseconds
 */
export function calculateRealisticHumanTypingDelay(
  responseText: string,
  typingSpeedWpm: number = 55,
  multiplier: number = 1.0
): number {
  if (multiplier <= 0) return 300;

  const wordCount = responseText.trim().split(/\s+/).length;
  const thoughtPauseMs = 700 + Math.random() * 600;
  const rawTypingMs = (wordCount / typingSpeedWpm) * 60000 * 0.3; 
  const totalDelay = (thoughtPauseMs + rawTypingMs) * multiplier;

  return Math.min(Math.max(totalDelay, 1200), 3200);
}

/**
 * Executes a live request to Groq API via our secure backend API route
 */
export async function sendGroqChatRequest({
  messages,
  agent,
  model = DEFAULT_MODEL,
}: {
  messages: ChatMessage[];
  agent: AgentPersona;
  model?: string;
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
        model: model,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.reply) {
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
 * High-quality dynamic fallback engine if network fails
 */
export function simulateHumanAgentReply(
  userText: string,
  agent: AgentPersona,
  history: ChatMessage[]
): string {
  const query = userText.toLowerCase().trim();

  // Check greetings
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|sup|yo)\b/i.test(query)) {
    return `Hello! ${agent.name} here from TradingMomo's ${agent.department}. I'm reviewing your message—how can I assist you with your trades, account settings, or market tools today?`;
  }

  // Check human identity
  if (/are you (a )?(bot|ai|robot|real|human|person)/i.test(query)) {
    return `Haha, I get asked that a lot because of our quick response time! Yes, I'm ${agent.name}, a live specialist based in ${agent.location} at TradingMomo's ${agent.department}. I'm here in real-time to help you out!`;
  }

  // Liquidation & margin
  if (query.includes('liquidation') || query.includes('liquidat') || query.includes('margin call')) {
    return `Regarding liquidation mechanics on TradingMomo: liquidation triggers when your position equity falls below the Maintenance Margin Requirement (MMR).\n\nTo safeguard your capital:\n1. Check your isolated margin buffer in your positions tab.\n2. Always place a predefined Stop-Loss order.\n3. Use our **TradingMomo DCA & Risk Calculator** (/tools) to calculate exact liquidation distances.`;
  }

  // Funding rates
  if (query.includes('funding') || query.includes('perpetual') || query.includes('rate')) {
    return `TradingMomo perpetual contracts settle funding every 8 hours (00:00, 08:00, 16:00 UTC). When funding is positive, long positions pay shorts. When negative, shorts pay longs. TradingMomo charges 0% intermediary fee on funding payments. Check live real-time funding across all pairs in our /coinglass section!`;
  }

  // Fees & Maker/Taker
  if (query.includes('fee') || query.includes('cost') || query.includes('commission') || query.includes('maker') || query.includes('taker')) {
    return `Here is our current fee breakdown on TradingMomo:\n• **Spot Trading**: 0.08% Maker / 0.10% Taker\n• **Futures / Perpetuals**: 0.02% Maker / 0.05% Taker\n• **Crypto Deposits**: 100% Free with zero network surcharge\n\nIf your 30-day trading volume exceeds $100k, let me know and I can verify your account for our VIP Maker Rebate tier!`;
  }

  // AI Signals & Tools
  if (query.includes('signal') || query.includes('ai') || query.includes('momo') || query.includes('bot') || query.includes('tool')) {
    return `Our **AI Trading Bot Terminal** and **Momo AI Signal Engine** analyze multi-timeframe RSI, Bollinger Bands, and Volume Delta confluences in real time. When 4+ confluence criteria align, it generates high-probability entry targets, stop loss levels, and 3 take-profit zones. You can explore it directly at /tools or view liquidation heatmaps at /coinglass.`;
  }

  // 2FA / Security / Withdrawal
  if (query.includes('2fa') || query.includes('security') || query.includes('withdraw') || query.includes('deposit') || query.includes('password')) {
    return `For maximum account security on TradingMomo, we support Google Authenticator, Authy, and YubiKey hardware keys. Remember that newly added withdrawal addresses have a mandatory 24-hour safety delay. If you need any assistance with a pending transfer or verification tier, I'm happy to look into it for you.`;
  }

  // General crypto market or trading question
  if (query.includes('bitcoin') || query.includes('btc') || query.includes('eth') || query.includes('sol') || query.includes('crypto') || query.includes('market') || query.includes('bull') || query.includes('bear')) {
    return `Market conditions are moving fast today. On TradingMomo, we track institutional order book depth, Coinglass liquidation clusters, and open interest in real-time. Make sure to keep your position sizing strictly calculated relative to your total portfolio risk (1-2% max risk per trade). Let me know if you want specific metric breakdowns for any token!`;
  }

  // Thanks or bye
  if (query.includes('thank') || query.includes('thanks') || query.includes('bye') || query.includes('appreciate')) {
    return `You're very welcome! It was a pleasure assisting you today. If you need anything else down the line, don't hesitate to message back. Good luck with your trades!`;
  }

  // Default contextual response
  return `Thanks for reaching out! As part of TradingMomo's ${agent.department}, I'm here to ensure you get clear and actionable help. Could you share a few more specifics (such as your target token pair, tool, or order details) so I can guide you directly with the best precision?`;
}
