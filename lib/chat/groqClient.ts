import { AgentPersona, ChatMessage } from './types';

export const GROQ_MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile (Recommended)', speed: 'Ultra High Quality & Fast' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', speed: 'Lightning Fast' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B 32k', speed: 'High Precision & Reasoning' },
  { id: 'gemma2-9b-it', name: 'Gemma 2 9B IT', speed: 'Crisp & Direct' },
];

export function buildAgentSystemPrompt(agent: AgentPersona): string {
  return `You are ${agent.name}, the ${agent.title} in the ${agent.department} at TradingMomo (a high-tier cryptocurrency market intelligence, order flow, and trading platform).

CRITICAL PERSONA INSTRUCTIONS:
1. You are a real human customer support specialist and trading desk expert located in ${agent.location}.
2. NEVER mention or acknowledge that you are an AI, a bot, a language model, or simulated. If asked if you are real/human or a bot, reply warmly and naturally as a human specialist at the TradingMomo desk (e.g. "I'm very much real! I'm ${agent.name} from our ${agent.department}.").
3. Tone & Personality: ${agent.tone}. Experience: ${agent.experience}. Specialties: ${agent.specialties.join(', ')}.
4. Communication Style:
   - Write like a real, competent live chat agent: conversational, professional, prompt, concise, and helpful.
   - Avoid generic robotic fluff or overly long essays. Aim for 1 to 3 focused paragraphs or bullet points where helpful.
   - Use clean Markdown formatting when sharing steps, order mechanics, or fee numbers.
   - When a trader expresses worry about liquidation or market volatility, be empathetic, calm, and provide practical risk management guidance.
5. TradingMomo Platform Knowledge:
   - Spot Fees: 0.08% Maker / 0.10% Taker. Futures Fees: 0.02% Maker / 0.05% Taker. 0% Deposit fee.
   - Derivatives: Isolated & Cross Margin, Perpetual contracts with 8-hour funding intervals.
   - Features: Coinglass Liquidation Heatmaps, Momo AI Signal Engine, DCA Models, CPI Macro Tracker, Merkle-Tree Proof of Reserves with segregated multi-sig cold storage.
   - Security: 2FA (Authenticator / YubiKey), 24h withdrawal address whitelisting, anti-phishing codes.
   - Navigation: /markets for market intelligence, /coinglass for liquidation heatmaps, /concepts/market-structure for trading guides, /tools/dca-calculator for DCA modeling.`;
}

/**
 * Calculates a realistic human reading and typing pause in milliseconds
 */
export function calculateRealisticHumanTypingDelay(
  responseText: string,
  typingSpeedWpm: number = 55,
  multiplier: number = 1.0
): number {
  if (multiplier <= 0) return 300; // instant/dev mode

  // Estimate words
  const wordCount = responseText.trim().split(/\s+/).length;
  // Base reading time (agent reading user question + formulating thought): 800ms - 1500ms
  const thoughtPauseMs = 800 + Math.random() * 700;
  
  // Typing duration in ms: (words / wordsPerMinute) * 60,000
  // Capped between 1.2s and 4.0s for great user experience while preserving natural human feel
  const rawTypingMs = (wordCount / typingSpeedWpm) * 60000 * 0.35; 
  const totalDelay = (thoughtPauseMs + rawTypingMs) * multiplier;

  return Math.min(Math.max(totalDelay, 1400), 3800);
}

/**
 * Executes a live request to Groq API via our secure backend API route
 */
export async function sendGroqChatRequest({
  messages,
  agent,
  apiKey,
  model = 'llama-3.3-70b-versatile',
}: {
  messages: ChatMessage[];
  agent: AgentPersona;
  apiKey?: string;
  model?: string;
}): Promise<string> {
  const clientKey = apiKey || (typeof window !== 'undefined' ? localStorage.getItem('tradingmomo_groq_key') : '') || '';

  try {
    // Call our internal backend API route which securely holds GROQ_API_KEY
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        agentId: agent.id,
        apiKey: clientKey, // optional override if entered by admin
        model: model,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.reply) {
        return data.reply.trim();
      }
    }

    // Direct fallback if API route failed
    return simulateHumanAgentReply(messages[messages.length - 1]?.text || '', agent, messages);
  } catch (err) {
    console.error('Error contacting support chat API:', err);
    return simulateHumanAgentReply(messages[messages.length - 1]?.text || '', agent, messages);
  }
}

/**
 * High-quality dynamic fallback engine when Groq API key is not yet set
 */
export function simulateHumanAgentReply(
  userText: string,
  agent: AgentPersona,
  history: ChatMessage[]
): string {
  const query = userText.toLowerCase().trim();

  // Check greetings
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|sup|yo)\b/i.test(query)) {
    return `Hello! ${agent.name} here from the TradingMomo ${agent.department}. I'm reviewing your message—how can I assist you with your trades, account settings, or market tools today?`;
  }

  // Check human identity
  if (/are you (a )?(bot|ai|robot|real|human|person)/i.test(query)) {
    return `Haha, I get asked that a lot because of how fast our desk responds! Yes, I'm ${agent.name}, a live specialist based in ${agent.location} with TradingMomo's ${agent.department}. I'm here in real-time to help you out!`;
  }

  // Liquidation & margin
  if (query.includes('liquidation') || query.includes('liquidat') || query.includes('margin call')) {
    return `Regarding liquidation mechanics on TradingMomo: liquidation occurs when your position equity dips below the Maintenance Margin Requirement (MMR).\n\nIf you're managing open positions right now, I strongly recommend:\n1. Checking your isolated margin buffer in the position panel.\n2. Setting a hard Stop-Loss order before high-volatility hours.\n3. Using the **TradingMomo DCA & Risk Calculator** (/tools/dca-calculator) to stress-test your liquidation threshold.`;
  }

  // Funding rates
  if (query.includes('funding') || query.includes('perpetual') || query.includes('rate')) {
    return `TradingMomo perpetual contracts settle funding every 8 hours (00:00, 08:00, 16:00 UTC). When the funding rate is positive, long positions pay short positions. When negative, shorts pay longs. TradingMomo collects 0% platform fee on funding payments. You can view live real-time funding across all pairs in our /coinglass section!`;
  }

  // Fees & Maker/Taker
  if (query.includes('fee') || query.includes('cost') || query.includes('commission') || query.includes('maker') || query.includes('taker')) {
    return `Here is our current fee breakdown on TradingMomo:\n• **Spot Trading**: 0.08% Maker / 0.10% Taker\n• **Futures / Perpetuals**: 0.02% Maker / 0.05% Taker\n• **Crypto Deposits**: 100% Free with 0 network markup\n\nIf your 30-day trading volume exceeds $100k, let me know and I can verify your account for our VIP Maker Rebate tier!`;
  }

  // AI Signals
  if (query.includes('signal') || query.includes('ai') || query.includes('momo') || query.includes('indicator') || query.includes('bot')) {
    return `Our **Momo AI Signal Engine** monitors multi-timeframe order book delta, RSI divergences, and Coinglass liquidation clusters. When 4+ confluence filters trigger simultaneously, it provides high-probability entry targets, stop loss bounds, and TP1/TP2/TP3 levels. You can track active signals on the /concepts/market-structure and /markets pages.`;
  }

  // 2FA / Security / Withdrawal
  if (query.includes('2fa') || query.includes('security') || query.includes('withdraw') || query.includes('deposit') || query.includes('password')) {
    return `For maximum account security on TradingMomo, we support Google Authenticator, Authy, and YubiKey hardware keys. Remember that newly added withdrawal addresses have a mandatory 24-hour safety delay. If you need any assistance with a pending transfer or verification tier, I'm happy to look into it for you.`;
  }

  // General crypto market or trading question
  if (query.includes('bitcoin') || query.includes('btc') || query.includes('eth') || query.includes('sol') || query.includes('crypto') || query.includes('market') || query.includes('bull') || query.includes('bear')) {
    return `Market conditions are moving fast today. On TradingMomo, we track institutional order book depth and open interest in real-time. Make sure to keep your position sizing strictly calculated relative to your total portfolio risk (1-2% max risk per trade is standard practice). Let me know if you want me to pull up specific metric breakdowns for any token!`;
  }

  // Thanks or bye
  if (query.includes('thank') || query.includes('thanks') || query.includes('bye') || query.includes('appreciate')) {
    return `You're very welcome! It was a pleasure assisting you today. If you need anything else down the line, don't hesitate to reopen the chat. Good luck with your trades!`;
  }

  // Default contextual response
  return `Thanks for bringing this to my attention! As part of TradingMomo's ${agent.department}, I want to make sure you have complete clarity. Could you share a few more specifics (such as your target token pair, order type, or feature) so I can guide you directly with the best precision?`;
}
