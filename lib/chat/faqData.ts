import { FAQItem, FAQCategory } from './types';

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'all',
    name: 'All Topics',
    iconName: 'LayoutGrid',
    description: 'Explore all pre-stored guides and answers.',
  },
  {
    id: 'platform',
    name: 'About TradingMomo',
    iconName: 'ShieldCheck',
    description: 'Platform overview, security, institutional tools & account features.',
  },
  {
    id: 'trading',
    name: 'Trading & Derivatives',
    iconName: 'TrendingUp',
    description: 'Leverage, margin modes, liquidation mechanics & order types.',
  },
  {
    id: 'signals',
    name: 'Momo AI Signals & Analytics',
    iconName: 'Bot',
    description: 'AI trend indicators, Coinglass heatmap feeds & backtesting models.',
  },
  {
    id: 'fees',
    name: 'Fees & Liquidity',
    iconName: 'Percent',
    description: 'Maker/Taker tiers, deposit zero-fee policy & funding rates.',
  },
  {
    id: 'security',
    name: 'Security & 2FA',
    iconName: 'Lock',
    description: 'Cold storage proof-of-reserves, multi-sig vaults & withdrawal protection.',
  },
];

export const PRESTORED_FAQS: FAQItem[] = [
  // --- Category: About TradingMomo ---
  {
    id: 'faq-platform-1',
    category: 'platform',
    question: 'What is TradingMomo and what makes it unique for crypto traders?',
    answer: `TradingMomo is a next-generation cryptocurrency market intelligence and execution hub. It integrates real-time institutional order flow mechanics, Coinglass liquidation heatmaps, multi-timeframe AI trend indicators, and deep liquidity aggregation across spot and perpetual futures markets. Traders use TradingMomo to uncover hidden order-book imbalances and trade with unmatched analytical precision.`,
    tags: ['Overview', 'Platform', 'Intelligence', 'Features'],
    quickActions: [
      { label: 'Explore Market Intelligence', actionType: 'open_url', payload: '/markets' },
      { label: 'Chat with Specialist', actionType: 'ask_agent', payload: 'Can you give me a personalized tour of TradingMomo features?' },
    ],
  },
  {
    id: 'faq-platform-2',
    category: 'platform',
    question: 'How do I generate API keys for automated or bot trading on TradingMomo?',
    answer: `You can generate secure API keys with customizable permissions (Read-Only, Trade, or Withdraw) directly in your Account Settings > API Management. We support REST API endpoints and low-latency WebSocket feeds compatible with standard CCXT libraries and custom Python/Node trading algorithms. Always ensure IP Whitelisting is activated for maximum protection.`,
    tags: ['API', 'Algo Trading', 'WebSockets', 'Keys'],
    quickActions: [
      { label: 'View API Docs', actionType: 'open_url', payload: '/tools/dca-calculator' },
      { label: 'Ask API Engineer', actionType: 'ask_agent', payload: 'How do I set up webhooks with TradingMomo API?' },
    ],
  },
  {
    id: 'faq-platform-3',
    category: 'platform',
    question: 'Is TradingMomo licensed and how is customer collateral secured?',
    answer: `TradingMomo prioritizes 1:1 asset backing with verifiable on-chain Merkle-Tree Proof of Reserves (PoR). 98% of user funds are segregated in institutional-grade multi-signature cold storage vaults provided by leading custodians with multi-party computation (MPC) technology. Customer assets are never lent out or rehypothecated.`,
    tags: ['Security', 'Proof of Reserves', 'Cold Storage', 'Safety'],
    quickActions: [
      { label: 'Ask Compliance Lead', actionType: 'ask_agent', payload: 'Tell me more about TradingMomo Proof of Reserves verification.' },
    ],
  },

  // --- Category: Trading & Derivatives ---
  {
    id: 'faq-trading-1',
    category: 'trading',
    question: 'How do Isolated Margin and Cross Margin differ on TradingMomo?',
    answer: `• **Isolated Margin**: Allocates a specific, fixed amount of collateral to an individual position. If the market moves past the liquidation threshold, your maximum loss is strictly limited to that isolated allocation, protecting the rest of your balance.\n\n• **Cross Margin**: Shares your entire available margin balance across all open cross positions. This provides a wider buffer against temporary flash crashes, but exposes your shared account collateral if positions are left unhedged.`,
    tags: ['Isolated Margin', 'Cross Margin', 'Risk', 'Derivatives'],
    quickActions: [
      { label: 'Ask Risk Specialist', actionType: 'ask_agent', payload: 'Which margin mode should I use for swing trading vs scalping?' },
    ],
  },
  {
    id: 'faq-trading-2',
    category: 'trading',
    question: 'How is Liquidation Price calculated and how can I prevent it?',
    answer: `Your liquidation price is triggered when your Position Equity drops below the Maintenance Margin Requirement (MMR). To avoid liquidation:\n1. Use strict Stop-Loss orders immediately upon entering a position.\n2. Keep effective leverage reasonable (e.g., 3x–10x rather than max 50x/100x).\n3. Monitor the live Funding Rate and Liquidation Heatmaps to avoid high-density cascading zones.\n4. Add margin to isolated positions in advance of high-volatility events (like CPI or FOMC).`,
    tags: ['Liquidation', 'Margin', 'Stop-Loss', 'Risk Management'],
    quickActions: [
      { label: 'Open DCA & Risk Calculator', actionType: 'open_url', payload: '/tools/dca-calculator' },
      { label: 'Discuss with Desk', actionType: 'ask_agent', payload: 'How can I calculate my exact maintenance margin threshold?' },
    ],
  },
  {
    id: 'faq-trading-3',
    category: 'trading',
    question: 'What are Perpetual Funding Rates and when are they paid?',
    answer: `Perpetual futures contracts do not have an expiry date. To keep the perpetual contract price anchored to the spot index price, a periodic **Funding Rate** is exchanged directly between long and short traders (every 8 hours at 00:00, 08:00, 16:00 UTC):\n• **Positive Funding**: Longs pay Shorts (bullish sentiment prevailing).\n• **Negative Funding**: Shorts pay Longs (bearish sentiment prevailing).\nTradingMomo charges 0% intermediary fee on funding payments.`,
    tags: ['Funding Rates', 'Perpetuals', 'Basis Arbitrage', 'Derivatives'],
    quickActions: [
      { label: 'Check Live Coinglass Feeds', actionType: 'open_url', payload: '/coinglass' },
    ],
  },
  {
    id: 'faq-trading-4',
    category: 'trading',
    question: 'What advanced order types are supported on TradingMomo?',
    answer: `TradingMomo supports 7 institutional order execution models:\n1. **Limit & Market Orders** (with Post-Only and IOC/FOK flags)\n2. **Stop-Market & Stop-Limit** (triggered via Mark Price or Last Price)\n3. **Trailing Stop** (dynamic trailing delta tracking favorable trend)\n4. **Take-Profit / Stop-Loss (TP/SL)** bracket orders\n5. **TWAP (Time-Weighted Average Price)** algorithmic execution for large sizes\n6. **Iceberg Orders** (hides total visible size in the public order book)\n7. **Reduce-Only** (guarantees order will only close or reduce an existing position).`,
    tags: ['Order Types', 'Stop Loss', 'Trailing Stop', 'TWAP', 'Execution'],
    quickActions: [
      { label: 'Ask Execution Specialist', actionType: 'ask_agent', payload: 'How do Trailing Stop orders execute during high slippage?' },
    ],
  },

  // --- Category: Momo AI Signals ---
  {
    id: 'faq-signals-1',
    category: 'signals',
    question: 'How does the TradingMomo AI Signal Engine generate buy/sell alerts?',
    answer: `The Momo AI Signal Engine analyzes quantitative inputs in real time: multi-timeframe RSI momentum, Bollinger Band volatility squeezes, order book bid/ask delta, open interest divergence, and liquidation cluster levels. When at least 4 out of 5 confluence criteria align with strict statistical significance, the engine issues high-probability Long/Short setups with predetermined Entry, Stop-Loss, and 3 Take-Profit target zones.`,
    tags: ['AI Signals', 'Quantitative', 'Algorithm', 'Confluence'],
    quickActions: [
      { label: 'View Signal Engine Docs', actionType: 'open_url', payload: '/concepts/market-structure' },
      { label: 'Ask Quant Engineer', actionType: 'ask_agent', payload: 'What is the win-rate and risk-reward profile of Momo AI signals?' },
    ],
  },
  {
    id: 'faq-signals-2',
    category: 'signals',
    question: 'How do I interpret Liquidation Heatmap clusters on TradingMomo?',
    answer: `Liquidation Heatmaps visually map estimated liquidation volume across price levels using bright yellow/purple color bands. Highly concentrated bright zones represent 'liquidity pools' where large clusters of stop-outs and forced market orders reside. Smart money and institutional market makers frequently push price toward these clusters to fill large orders (liquidity sweeps) before reversing.`,
    tags: ['Heatmap', 'Liquidity', 'Coinglass', 'Order Flow'],
    quickActions: [
      { label: 'View Coinglass Analytics', actionType: 'open_url', payload: '/coinglass' },
    ],
  },

  // --- Category: Fees & Liquidity ---
  {
    id: 'faq-fees-1',
    category: 'fees',
    question: 'What are the Maker and Taker fee schedules on TradingMomo?',
    answer: `TradingMomo operates on a competitive tiered fee schedule:\n• **Standard Tier**: Spot Maker: 0.08% | Spot Taker: 0.10%\n• **Futures / Derivatives**: Maker: 0.02% | Taker: 0.05%\n• **VIP / High-Volume Traders**: Maker rebates up to -0.005% (you get paid to provide liquidity) and Taker discounts down to 0.015%.\n• **Crypto Deposits**: 100% Free with 0 network surcharge.`,
    tags: ['Fees', 'Maker/Taker', 'VIP Discounts', 'Deposits'],
    quickActions: [
      { label: 'Ask VIP Desk about Discounts', actionType: 'ask_agent', payload: 'How can I qualify for VIP tier fee discounts on TradingMomo?' },
    ],
  },

  // --- Category: Security & 2FA ---
  {
    id: 'faq-security-1',
    category: 'security',
    question: 'How do I enable 2FA and secure my TradingMomo account?',
    answer: `To secure your account:\n1. Go to Account > Security Center and enable Authenticator App 2FA (Google Authenticator, Authy, or YubiKey hardware key).\n2. Enable **Address Whitelisting**: Any new crypto withdrawal address will be locked under a 24-hour safety delay.\n3. Configure **Anti-Phishing Code**: Every official email from TradingMomo will display your secret passcode to prevent spoofing.`,
    tags: ['2FA', 'YubiKey', 'Whitelisting', 'Anti-Phishing'],
    quickActions: [
      { label: 'Ask Security Lead', actionType: 'ask_agent', payload: 'What happens if I lose my 2FA authenticator backup key?' },
    ],
  },
];
