export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: 'bitcoin-post-halving-supply-shock',
    title: 'The Bitcoin Supply Shock: How Exchange Reserves Impact Market Structure',
    excerpt: 'Analyzing multi-year trends in liquid Bitcoin exchange balances vs institutional treasury accumulation.',
    category: 'Market Intelligence',
    readTime: '6 min read',
    publishedAt: 'Aug 2026',
    author: 'Research Desk',
    content: [
      'The quadrennial Bitcoin halving is more than just a programmatic reduction in miner subsidies—it fundamentally alters the daily supply equilibrium on spot exchanges.',
      'Historically, the supply shock requires 6 to 12 months to manifest in aggregate spot pricing. As mining pools recalibrate operational efficiency, liquid balances on major exchanges continue to trend downward toward multi-year lows.',
      'Understanding this supply-demand delta is the bedrock of institutional macroeconomic modeling for Bitcoin and digital assets.'
    ]
  },
  {
    slug: 'understanding-order-flow-and-liquidity-clustering',
    title: 'Deconstructing Order Flow: How Market Makers Interact with Liquidity Pools',
    excerpt: 'A structural overview of limit order books, bid-ask depth, and the mechanics of liquidity sweeps.',
    category: 'Trading Methodology',
    readTime: '8 min read',
    publishedAt: 'Aug 2026',
    author: 'Quantitative Team',
    content: [
      'In high-frequency crypto trading, prices do not move purely on random news—they move toward resting liquidity.',
      'Stop-loss orders and liquidation thresholds naturally accumulate above local swing highs and below support zones. Algorithmic market makers utilize liquidity sweeps to fill large position sizes without incurring severe slippage.',
      'By analyzing market depth rather than trailing indicators alone, analysts gain clarity on true directional intent.'
    ]
  },
  {
    slug: 'funding-rate-mechanics-and-market-bias',
    title: 'Perpetual Funding Rates Explained: Decoding Derivatives Sentiment',
    excerpt: 'How funding rate balancing keeps perpetual futures tethered to spot prices and what prolonged extremes signify.',
    category: 'Derivatives Analysis',
    readTime: '5 min read',
    publishedAt: 'Aug 2026',
    author: 'Fintech Analysis',
    content: [
      'Unlike traditional futures that settle on a specific expiry date, perpetual swaps rely on an 8-hour funding mechanism to anchor contract prices to the spot index.',
      'When perpetual prices trade at a premium to spot, funding rates turn positive (longs pay shorts). When perpetuals trade at a discount, funding turns negative (shorts pay longs).',
      'Observing prolonged funding rate skew provides key insights into whether retail leverage is overextended.'
    ]
  }
];
