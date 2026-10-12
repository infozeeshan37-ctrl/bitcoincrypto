import { CourseChapter } from "./types";

export const chapter2: CourseChapter = {
  id: "blockchain-architecture",
  chapterNumber: "02",
  title: "Blockchain Architecture & Smart Contract Layer-1s",
  tagline: "Explore EVM state machines, Proof-of-Stake validator slashing, L2 Rollups, and the Blockchain Trilemma.",
  category: "fundamentals",
  level: "Intermediate",
  estimatedTime: "50 mins",
  accentColor: "blue",
  badge: "Smart Contracts",
  diagramType: "mvrv",
  overview:
    "Demystify decentralized compute engines. Learn how the Ethereum Virtual Machine (EVM) executes global state transitions, how Proof-of-Stake economic slashing aligns validator honesty, the difference between Optimistic and Zero-Knowledge Layer-2 rollups, and how to evaluate tokenomics emissions.",
  linkedTool: {
    name: "TradingView Pro Terminal",
    href: "/tools/chart-terminal",
    actionText: "Analyze L1 Assets on Chart Terminal →"
  },
  references: [
    { title: "Ethereum: A Next-Generation Smart Contract & Decentralized Application Platform", url: "https://ethereum.org/en/whitepaper/", source: "Vitalik Buterin", type: "Primary Source" },
    { title: "EIP-1559: Fee Market Change for ETH 1.0 Chain", url: "https://eips.ethereum.org/EIPS/eip-1559", source: "Ethereum Improvement Proposals", type: "Primary Source" },
    { title: "Why Proof of Stake: Economic Cryptoeconomic Security Models", url: "https://vitalik.eth.limo/general/2020/11/06/pos2020.html", source: "Vitalik Buterin Research", type: "Academic" },
    { title: "Solana Proof-of-History Architecture & High-Performance Blockchain Specs", url: "https://docs.solanalabs.com/", source: "Solana Labs", type: "Primary Source" }
  ],
  relatedInternalLinks: [
    { title: "Ethereum (ETH) 30-Day AI Price Prediction & Volatility Corridor", href: "/predictions/ethereum", badge: "AI Forecast", description: "Deep neural net projections, gas burn velocity, and support/resistance for ETH." },
    { title: "Solana (SOL) High-Beta AI Price Projection", href: "/predictions/solana", badge: "AI Forecast", description: "Algorithmic momentum and DeFi TVL correlation models for Solana." },
    { title: "Spot Market Rankings & L1 Comparison Terminal", href: "/markets", badge: "Live Terminal", description: "Real-time market cap, volume, and 24h order flow across top Layer-1 ecosystems." }
  ],
  lessons: [
    {
      id: "c2-l1",
      slug: "evm-state-machine-gas",
      chapterNumber: "02",
      lessonNumber: 1,
      title: "1. The Ethereum Virtual Machine (EVM) & Gas Economics",
      duration: "7 mins",
      keyConcepts: [
        "Turing-complete decentralized world computer state machine",
        "EIP-1559: Base fee burning (deflationary ultrasound money) and priority tips",
        "Deterministic bytecode execution and the Halting Problem"
      ],
      content: [
        "While Bitcoin is a specialized ledger for transferring peer-to-peer monetary value, Ethereum was designed as a Turing-complete global state machine. Every node runs the Ethereum Virtual Machine (EVM), executing decentralized smart contract code.",
        "To prevent infinite loops from freezing the global computer (the Halting Problem), every EVM opcode (such as SSTORE, ADD, SHA3) has an associated cost measured in 'Gas'. Users must pay gas in Ether to compensate nodes for computational work.",
        "Under EIP-1559, the base gas fee required for transaction inclusion is burned permanently, taking ETH out of circulating supply. During high DeFi activity, the burn rate often exceeds new issuance, turning ETH net deflationary."
      ],
      formula: {
        name: "EIP-1559 Transaction Cost Equation",
        math: "\\text{Tx Fee} = \\text{Gas Used} \\times (\\text{Base Fee} + \\text{Priority Tip})",
        explanation: "The Base Fee is burned by protocol consensus, while the Priority Tip is awarded to the block validator."
      },
      proTip: "Track the EIP-1559 burn rate. In heavy bull markets when on-chain meme coins and DEX volumes explode, gas burn rates can hit 10,000+ ETH burned per week."
    },
    {
      id: "c2-l2",
      slug: "proof-of-stake-slashing",
      chapterNumber: "02",
      lessonNumber: 2,
      title: "2. Proof-of-Stake Consensus & Validator Slashing Penalties",
      duration: "6 mins",
      keyConcepts: [
        "Proof-of-Stake: Replacing physical ASICs with locked capital collateral",
        "Slashing conditions: Equivocation (double voting) and surround voting",
        "Liquid Staking Derivatives (LSDs) and centralization vectors"
      ],
      content: [
        "In Proof-of-Stake (PoS), validators lock native capital (e.g. 32 ETH on Ethereum) as economic bond collateral instead of consuming electricity.",
        "If a validator acts maliciously—such as proposing two different blocks for the same slot (equivocation) or double-voting on finalized checkpoints—the protocol consensus automatically burns a portion of their staked capital (Slashing) and forcibly expels them from the network.",
        "While PoS dramatically reduces electricity consumption by 99.9%, it introduces governance risks: holders of the largest token supplies accumulate compound interest over time, concentrating voting power."
      ],
      proTip: "Beware of Liquid Staking de-pegs. During extreme liquidity crunches, tokens like stETH can trade at a temporary discount to spot ETH if secondary markets freeze."
    },
    {
      id: "c2-l3",
      slug: "layer2-rollups-optimistic-zk",
      chapterNumber: "02",
      lessonNumber: 3,
      title: "3. Layer-2 Scaling: Optimistic vs Zero-Knowledge (ZK) Rollups",
      duration: "8 mins",
      keyConcepts: [
        "Execution off-chain with settlement and data availability on Layer-1",
        "Optimistic Rollups: Fraud proofs and 7-day withdrawal challenge delay",
        "Zero-Knowledge Rollups: Cryptographic validity proofs (ZK-SNARKs/STARKs)"
      ],
      content: [
        "Layer-1 blockchains face physical throughput constraints. Layer-2 rollups scale throughput by bundling thousands of transactions off-chain, executing state transitions, and publishing compressed cryptographic proofs back to Layer-1 for final settlement.",
        "Optimistic Rollups (Arbitrum, Optimism, Base) assume transactions are valid by default. If a state transition is fraudulent, observers have a 7-day challenge window to submit a 'Fraud Proof' to revert it. This creates a mandatory 7-day delay for native bridge withdrawals.",
        "Zero-Knowledge (ZK) Rollups (zkSync, Starknet, Scroll) eliminate challenge windows entirely. Every batch includes a mathematical Validity Proof (ZK-SNARK). If the math checks out, Layer-1 finalizes the state instantly with zero fraud dispute window."
      ],
      proTip: "Use third-party liquidity bridges (Across, Stargate) when bridging back from Optimistic rollups to Layer-1 to bypass the native 7-day challenge delay for a small fee."
    },
    {
      id: "c2-l4",
      slug: "blockchain-trilemma-tradeoffs",
      chapterNumber: "02",
      lessonNumber: 4,
      title: "4. The Blockchain Trilemma: Scalability, Security & Decentralization",
      duration: "6 mins",
      keyConcepts: [
        "Vitalik Buterin's Trilemma thesis: You can only maximize 2 of 3 properties",
        "High TPS trade-off: Massive node hardware requirements kill retail decentralization",
        "Modular architecture: Separating execution, settlement, consensus, and data availability"
      ],
      content: [
        "The Blockchain Trilemma states that a decentralized ledger can only optimize two of three pillars simultaneously: Security, Decentralization, and Scalability.",
        "A network claiming 50,000 TPS on Layer-1 usually achieves this by requiring validators to run $10,000 server-grade computers with terabit fiber connections. While fast, ordinary citizens cannot run nodes at home, centralizing the network into a handful of data centers vulnerable to government subpoenas.",
        "Modern modular blockchain architecture addresses this by decoupling the stack: Layer-2 handles high-speed execution, Ethereum handles final settlement, and specialized layers (like Celestia or EigenDA) handle cheap Data Availability."
      ],
      proTip: "Always check node decentralization metrics, not just transactions per second (TPS). A blockchain with 100,000 TPS run by 20 corporate validator nodes is essentially a glorified private database."
    },
    {
      id: "c2-l5",
      slug: "smart-contract-security-reentrancy",
      chapterNumber: "02",
      lessonNumber: 5,
      title: "5. Smart Contract Vulnerabilities: Re-Entrancy, Oracle Manipulation & Hacks",
      duration: "7 mins",
      keyConcepts: [
        "The classic Re-Entrancy exploit (The DAO 2016 hack)",
        "Flash Loan attack vectors: Manipulating DEX spot pool prices",
        "Checks-Effects-Interactions pattern and timelock multisigs"
      ],
      content: [
        "Unlike traditional web applications where bugs can be patched on a central server, smart contracts on public blockchains are immutable: once deployed, vulnerable code cannot be quietly rewritten.",
        "In a Re-Entrancy attack, an attacker contract calls a withdrawal function on a vulnerable contract. Before the vulnerable contract updates its internal balance variable, the attacker's fallback function calls the withdrawal function again recursively, draining the entire pool.",
        "Another major vector is Flash Loan Oracle Manipulation: an attacker borrows $100M uncollateralized from Aave, dumps it into a decentralized liquidity pool to crash an asset's price for a single block, and exploits a lending protocol relying on that spot pool for price quotes."
      ],
      proTip: "Never deposit capital into a DeFi protocol that relies on spot DEX pools for pricing. Protocols must use decentralized, time-weighted oracles (TWAP) like Chainlink with multi-exchange feeds to survive flash loan attacks."
    },
    {
      id: "c2-l6",
      slug: "cross-chain-bridges-liquidity-risks",
      chapterNumber: "02",
      lessonNumber: 6,
      title: "6. Cross-Chain Bridges & Wrapped Asset Counterparty Hazards",
      duration: "6 mins",
      keyConcepts: [
        "Lock-and-Mint bridge mechanics vs Burn-and-Mint",
        "Wrapped tokens (e.g. wBTC, wETH) as synthetic liabilities",
        "Historical bridge hacks (Ronin $625M, Wormhole $320M, Nomad $190M)"
      ],
      content: [
        "Blockchains are isolated state networks; Ethereum cannot read Solana's memory natively. To transfer assets between chains, users rely on Cross-Chain Bridges.",
        "Most bridges utilize 'Lock-and-Mint': you lock 1.0 native BTC on Bitcoin with a custodian or bridge multisig, and the bridge mints 1.0 wrapped BTC (wBTC) on Ethereum. You do not hold real Bitcoin on Ethereum; you hold an IOU redeemable for the locked Bitcoin.",
        "Bridges represent the single most attacked attack vector in crypto history because they centralize hundreds of millions of dollars in locked contract honeypots. If the bridge keys are compromised, the wrapped token becomes worthless overnight."
      ],
      proTip: "Do not hold wrapped assets across multi-year bear markets. Un-bridge your assets back to their native Layer-1 blockchains (native BTC, native ETH) for cold custody."
    },
    {
      id: "c2-l7",
      slug: "solana-sealevel-and-monolithic-chains",
      chapterNumber: "02",
      lessonNumber: 7,
      title: "7. Monolithic High-Throughput Chains: Solana Sealevel & Proof-of-History",
      duration: "6 mins",
      keyConcepts: [
        "Proof-of-History (PoH): Cryptographic clock enabling sub-second slots",
        "Sealevel parallel transaction execution engine",
        "Local fee markets vs global gas price spikes"
      ],
      content: [
        "While Ethereum chose a modular, Layer-2 rollup roadmap, monolithic blockchains like Solana optimize all four layers on a single global base layer.",
        "Solana utilizes Proof-of-History (PoH), an unforgeable Verifiable Delay Function (VDF) clock that proves time has elapsed between events before blocks are even assembled. This allows validators to process transactions without waiting for synchronous network consensus chatter.",
        "Furthermore, Solana's Sealevel runtime executes transactions in parallel across GPU threads by requiring transactions to declare up-front which state accounts they touch, preventing a hot NFT mint from clogging unrelated peer-to-peer transfers."
      ],
      proTip: "Notice Solana's local fee markets: when a specific meme coin trading pool gets congested, gas prices only rise for that specific pool, leaving the rest of the Solana network running at sub-penny fees."
    },
    {
      id: "c2-l8",
      slug: "zero-knowledge-cryptography",
      chapterNumber: "02",
      lessonNumber: 8,
      title: "8. Zero-Knowledge Proofs (ZK-SNARKs & ZK-STARKs): The Privacy & Scaling Frontier",
      duration: "7 mins",
      keyConcepts: [
        "Proving knowledge of a secret without revealing the secret itself",
        "ZK-SNARKs (Succinct Non-Interactive Arguments of Knowledge)",
        "Succinctness: Verifying massive computations in milliseconds"
      ],
      content: [
        "Zero-Knowledge (ZK) cryptography is the most mathematically sophisticated breakthrough in computer science since public-key encryption.",
        "A Zero-Knowledge Proof allows a Prover to prove to a Verifier that a mathematical statement is true without disclosing any information beyond the statement's validity. You can prove you have sufficient funds to buy an asset without revealing your wallet balance.",
        "In scaling, ZK proofs compress thousands of transactions into a proof of just a few hundred bytes. Validating this proof requires almost zero computing power on Layer-1, achieving exponential throughput while inheriting full base layer mathematical security."
      ],
      proTip: "ZK-STARKs require zero trusted setup ceremony and are mathematically resistant to future quantum computing attacks, unlike older elliptic curve systems."
    },
    {
      id: "c2-l9",
      slug: "tokenomics-emissions-and-dilution",
      chapterNumber: "02",
      lessonNumber: 9,
      title: "9. Tokenomics Due Diligence: Circulating Supply, FDV & Venture Unlocks",
      duration: "8 mins",
      keyConcepts: [
        "Circulating Market Cap vs Fully Diluted Valuation (FDV)",
        "Venture Capital (VC) cliff unlocks and structural inflation dumping",
        "Token utility: Fee capture, governance, vs pure speculative meme tokens"
      ],
      content: [
        "A low token unit price (e.g. $0.05) is often a psychological illusion. What matters is the ratio between Circulating Market Cap and Fully Diluted Valuation (FDV = Current Price × Max Total Supply).",
        "Many modern altcoins launch with only 10% of their supply circulating, giving them a modest $200M market cap but a predatory $2 billion FDV. Over the next 3 years, remaining tokens unlock for early venture capital investors at seed prices (often 90% below public market prices).",
        "When massive cliff unlocks occur every month, VCs sell their unlocked tokens to recover principal, creating insurmountable structural sell pressure that grinds token prices down against Bitcoin."
      ],
      formula: {
        name: "FDV Dilution Ratio",
        math: "\\text{Dilution Ratio} = \\frac{\\text{FDV}}{\\text{Market Cap}} = \\frac{\\text{Total Maximum Supply}}{\\text{Circulating Supply}}",
        explanation: "A ratio >3.0 indicates extreme future dilution risk. If the ratio is 10.0, 90% of all tokens are yet to hit the market as sell pressure."
      },
      proTip: "Never invest long-term in an altcoin with a low float and high FDV ratio (>4.0). Check token unlock schedules on token tracking portals before buying."
    },
    {
      id: "c2-l10",
      slug: "decentralized-governance-daos",
      chapterNumber: "02",
      lessonNumber: 10,
      title: "10. Decentralized Autonomous Organizations (DAOs) & On-Chain Governance",
      duration: "6 mins",
      keyConcepts: [
        "Token-weighted voting vs Quadratic voting",
        "Governance proposal lifecycles (EIPs, RFCs, Snapshot, Timelocks)",
        "Voter apathy and whale capture dynamics"
      ],
      content: [
        "Decentralized Autonomous Organizations (DAOs) coordinate open-source software development and treasury allocations without traditional corporate boards.",
        "In token-weighted governance (1 token = 1 vote), token holders submit and vote on improvement proposals. If passed, smart contract timelocks execute changes automatically without administrative intervention.",
        "However, DAOs face structural challenges: retail voter apathy often results in less than 5% participation, allowing venture capital whales and protocol founders to dictate protocol fee distributions and treasury payouts."
      ],
      proTip: "Quadratic Voting squares voting costs (1 vote = 1 credit, 2 votes = 4 credits, 3 votes = 9 credits), curbing the power of billionaire whales and amplifying community consensus."
    }
  ],
  quiz: [
    {
      question: "Under Ethereum's EIP-1559 upgrade, what happens to the transaction Base Fee?",
      options: [
        "It is transferred directly to the block builder",
        "It is permanently burned from circulating supply, creating deflationary pressure",
        "It is converted into USDC and sent to a foundation treasury",
        "It is refunded to the user after 24 hours"
      ],
      correctIndex: 1,
      explanation: "EIP-1559 burns the base fee completely, permanently removing ETH from supply and offsetting validator staking issuance."
    },
    {
      question: "Why does a high Fully Diluted Valuation (FDV) relative to circulating market cap represent significant risk for altcoin buyers?",
      options: [
        "Because it proves the developers have locked the smart contract permanently",
        "Because large future supply unlocks from early investors and team allocations will flood the market with continuous sell pressure",
        "Because high FDV increases transaction gas fees",
        "Because exchanges will delist the token"
      ],
      correctIndex: 1,
      explanation: "A high FDV ratio means the vast majority of tokens have not yet been released. As VC and team vesting cliffs unlock, structural selling typically suppresses price."
    }
  ]
};
