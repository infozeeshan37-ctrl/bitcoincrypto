import { FAQItem, FAQCategory } from './types';

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'all',
    name: 'All Topics',
    iconName: 'LayoutGrid',
    description: 'Explore all pre-stored guides, tool methodologies, and platform answers.',
  },
  {
    id: 'platform',
    name: 'About BitcoinCrypto.tech',
    iconName: 'ShieldCheck',
    description: 'Platform mission, DeepQuant AI architecture, educational research desk & compliance.',
  },
  {
    id: 'market_data',
    name: 'Market Feeds & Telemetry',
    iconName: 'TrendingUp',
    description: 'Binance sub-second WebSockets, L2 Central Limit Order Book depth & CVD taker flow.',
  },
  {
    id: 'signals',
    name: 'DeepQuant AI Signals & Models',
    iconName: 'Bot',
    description: 'Binance 5-minute epochs, multi-factor neural scores, backtest benchmarking & risk rules.',
  },
  {
    id: 'derivatives',
    name: 'CoinGlass & Derivatives',
    iconName: 'Percent',
    description: 'Liquidation heatmaps, perpetual open interest, funding rate screener & basis arbitrage.',
  },
  {
    id: 'compliance',
    name: 'Free Access & AdSense Policy',
    iconName: 'Lock',
    description: '100% free open-access, zero funds custody, privacy disclosures, GDPR & AdSense standards.',
  },
];

export const PRESTORED_FAQS: FAQItem[] = [
  // --- Category: About BitcoinCrypto.tech ---
  {
    id: 'faq-platform-1',
    category: 'platform',
    question: 'What is BitcoinCrypto.tech and what makes it unique?',
    answer: `BitcoinCrypto.tech is an institutional-grade digital asset market intelligence and quantitative research suite. It unites sub-second Binance Central Limit Order Book telemetry, Coinglass liquidation cluster heatmaps, US CPI macroeconomic simulators, and the DeepQuant Neural AI prediction engine. All tools are open-access, educational, and designed to help researchers and traders analyze market microstructure with mathematical rigor.`,
    tags: ['Overview', 'Platform', 'Intelligence', 'Architecture'],
    quickActions: [
      { label: 'Explore Market Intelligence', actionType: 'open_url', payload: '/markets' },
      { label: 'Chat with Specialist', actionType: 'ask_agent', payload: 'Can you give me a personalized tour of BitcoinCrypto.tech features?' },
    ],
  },
  {
    id: 'faq-platform-2',
    category: 'platform',
    question: 'Does BitcoinCrypto.tech hold customer funds or execute real money trades?',
    answer: `No. BitcoinCrypto.tech is strictly an educational analytics and software intelligence platform. We do not accept fiat currency or cryptocurrency deposits, we do not custody tokens, and we do not operate a brokerage or casino. All interactive simulation modules—including the 5-Minute Prediction Arena—operate with a simulated $10,000 USDT demo paper wallet stored locally in your browser with zero monetary value.`,
    tags: ['Safety', 'Non-Custodial', 'Paper Trading', 'Compliance'],
    quickActions: [
      { label: 'Launch Demo Prediction Arena', actionType: 'open_url', payload: '/predictions' },
      { label: 'Review Financial Disclaimer', actionType: 'open_url', payload: '/disclaimer' },
    ],
  },
  {
    id: 'faq-platform-3',
    category: 'platform',
    question: 'How can developers and AI engines access BitcoinCrypto.tech data and specs?',
    answer: `BitcoinCrypto.tech is engineered for open accessibility. We provide standardized /llms.txt and /llms-full.txt endpoints for LLMs (ChatGPT, Claude, Perplexity), public Schema.org JSON-LD structured data on all pages, and embeddable research citation widgets for academic papers, blogs, and GitHub repositories.`,
    tags: ['API', 'LLMs.txt', 'Developer', 'Citations'],
    quickActions: [
      { label: 'View llms.txt Standard', actionType: 'open_url', payload: '/llms.txt' },
      { label: 'View Methodology Desk', actionType: 'open_url', payload: '/about' },
    ],
  },

  // --- Category: Market Feeds & Telemetry ---
  {
    id: 'faq-data-1',
    category: 'market_data',
    question: 'What data feeds power the real-time order books and charts?',
    answer: `Our platform aggregates direct low-latency WebSocket streams and REST API endpoints from leading centralized exchanges (including Binance, Coinbase, OKX, Bybit) alongside on-chain node telemetry. Central Limit Order Book (CLOB) depth updates in real-time, calculating live Cumulative Volume Delta (CVD) and bid-ask slippage across 10 depth levels.`,
    tags: ['WebSockets', 'Order Book', 'CVD', 'Binance'],
    quickActions: [
      { label: 'Open L2 Order Book Terminal', actionType: 'open_url', payload: '/orderbook' },
      { label: 'Ask Order Flow Analyst', actionType: 'ask_agent', payload: 'How do I read bid-ask imbalance in the L2 terminal?' },
    ],
  },
  {
    id: 'faq-data-2',
    category: 'market_data',
    question: 'What is Cumulative Volume Delta (CVD) and how does it signal market absorption?',
    answer: `Cumulative Volume Delta measures the net difference between market buy volume (taker aggression) and market sell volume over time. When price makes a higher high while CVD makes a lower high, it signals 'bearish CVD divergence'—meaning aggressive market buyers are being passively absorbed by institutional limit sell orders, frequently preceding a sharp pullback.`,
    tags: ['CVD', 'Volume Delta', 'Absorption', 'Market Flow'],
    quickActions: [
      { label: 'Explore Whale Orders Radar', actionType: 'open_url', payload: '/whale-orders' },
    ],
  },

  // --- Category: DeepQuant AI Signals ---
  {
    id: 'faq-signals-1',
    category: 'signals',
    question: 'How does the DeepQuant Neural AI Engine calculate 5-minute price predictions?',
    answer: `The DeepQuant AI Engine synchronizes with global Binance 5-minute epoch rounds. It evaluates multi-factor technical indicators (1m/5m EMA ribbon alignment, RSI oversold/overbought conditions, Bollinger Band squeeze channels), level-2 order book depth imbalance, and taker flow aggression to generate simulated directional probabilities (Call vs Put). All signals are educational mathematical models and do not guarantee future market behavior.`,
    tags: ['DeepQuant', '5-Min Epochs', 'Neural Model', 'Multi-Factor'],
    quickActions: [
      { label: 'Open AI Prediction Arena', actionType: 'open_url', payload: '/predictions' },
      { label: 'Ask Quant Systems Engineer', actionType: 'ask_agent', payload: 'What technical indicators are weighted highest in DeepQuant?' },
    ],
  },
  {
    id: 'faq-signals-2',
    category: 'signals',
    question: 'Are DeepQuant signals financial advice or guaranteed trading profits?',
    answer: `No. DeepQuant signals are mathematical simulations calibrated on historical backtests and technical analysis principles. Digital asset trading involves substantial risk of loss. Past algorithmic backtest results are never a guarantee of future performance. Always practice risk management (e.g. 1–2% max account risk) and consult an independent financial advisor before trading real capital.`,
    tags: ['Risk Warning', 'Educational', 'No Guarantees', 'Disclaimer'],
    quickActions: [
      { label: 'Read Financial Disclaimer', actionType: 'open_url', payload: '/disclaimer' },
      { label: 'Calculate Position Size', actionType: 'open_url', payload: '/tools/position-sizer' },
    ],
  },

  // --- Category: CoinGlass & Derivatives ---
  {
    id: 'faq-derivatives-1',
    category: 'derivatives',
    question: 'How do I interpret Liquidation Heatmap clusters on BitcoinCrypto.tech?',
    answer: `Liquidation Heatmaps visually project estimated liquidation price levels using color intensity bands (from blue/purple up to high-density golden-yellow). Dense golden-yellow bands indicate major pools of resting leveraged stop-orders and forced liquidations. Institutional market makers frequently drive price into these dense liquidity clusters to fill large orders (liquidity sweeps) before initiating sharp counter-trend reversals.`,
    tags: ['CoinGlass', 'Liquidation Heatmap', 'Stop Sweep', 'Liquidity Pools'],
    quickActions: [
      { label: 'View CoinGlass Liquidation Radar', actionType: 'open_url', payload: '/coinglass' },
      { label: 'Ask Derivatives Analyst', actionType: 'ask_agent', payload: 'How do I identify stop runs on the liquidation heatmap?' },
    ],
  },
  {
    id: 'faq-derivatives-2',
    category: 'derivatives',
    question: 'What are Perpetual Funding Rates and how can they be screened?',
    answer: `Perpetual futures contracts utilize an 8-hour Funding Rate mechanism (settling at 00:00, 08:00, 16:00 UTC) to tether the perpetual contract price to the underlying spot index. When funding is positive, long traders pay short traders; when negative, short traders pay longs. Our CoinGlass Funding Rate Screener monitors multi-exchange funding anomalies to identify overleveraged sentiment extremes and delta-neutral cash-and-carry basis opportunities.`,
    tags: ['Funding Rates', 'Perpetuals', 'Basis Arbitrage', 'CoinGlass'],
    quickActions: [
      { label: 'Funding Rate Screener', actionType: 'open_url', payload: '/tools/funding-rate-screener' },
    ],
  },

  // --- Category: Free Access & Compliance ---
  {
    id: 'faq-compliance-1',
    category: 'compliance',
    question: 'Is BitcoinCrypto.tech completely free to use?',
    answer: `Yes! All tools, 5-minute prediction arenas, Coinglass liquidation charts, order book terminals, DCA simulators, and macro research articles are 100% free for users worldwide. We support our infrastructure operations through transparent, compliant advertising (including Google AdSense) that strictly adheres to publisher quality standards.`,
    tags: ['Free Access', 'AdSense Compliant', 'Open Access', 'Transparency'],
    quickActions: [
      { label: 'View About Platform', actionType: 'open_url', payload: '/about' },
      { label: 'Review Privacy Policy', actionType: 'open_url', payload: '/privacy' },
    ],
  },
  {
    id: 'faq-compliance-2',
    category: 'compliance',
    question: 'How does BitcoinCrypto.tech protect user privacy and handle cookies?',
    answer: `BitcoinCrypto.tech adheres to GDPR, CCPA/CPRA, and Google EU User Consent standards. We do not sell personal information. All demo wallet balances and theme preferences are stored locally on your device (localStorage). Third-party advertising partners (such as Google AdSense) use cookies to serve relevant ads; visitors can manage consent or opt out at any time via our Cookie Consent banner or Google Ads Settings.`,
    tags: ['Privacy', 'GDPR', 'Cookies', 'AdSense'],
    quickActions: [
      { label: 'Privacy Policy', actionType: 'open_url', payload: '/privacy' },
      { label: 'Cookie Policy', actionType: 'open_url', payload: '/cookie-policy' },
    ],
  },
];
