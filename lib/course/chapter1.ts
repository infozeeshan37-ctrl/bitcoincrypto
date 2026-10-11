import { CourseChapter } from "./types";

export const chapter1: CourseChapter = {
  id: "bitcoin-foundations",
  chapterNumber: "01",
  title: "Bitcoin Architecture & Satoshi Consensus Foundations",
  tagline: "Master digital scarcity, Proof-of-Work thermodynamics, UTXO mechanics, and the 21-million hard cap.",
  category: "fundamentals",
  level: "Beginner",
  estimatedTime: "55 mins",
  accentColor: "amber",
  badge: "Monetary Base",
  diagramType: "halving",
  overview:
    "Explore the mathematical foundation of digital scarcity. Learn how Satoshi Nakamoto solved the Byzantine Generals problem without a central bank, how Proof-of-Work anchors digital assets to thermodynamic energy, why the UTXO model functions like cash notes, and how the 4-year halving cycle creates programmatic supply deficits.",
  linkedTool: {
    name: "Dollar-Cost Averaging Simulator",
    href: "/tools/dca-simulator",
    actionText: "Simulate Halving DCA Cycles →"
  },
  lessons: [
    {
      id: "c1-l1",
      slug: "satoshi-byzantine-consensus",
      chapterNumber: "01",
      lessonNumber: 1,
      title: "1. The Byzantine Generals Problem & Nakamoto Consensus",
      duration: "7 mins",
      keyConcepts: [
        "Double-spending prevention in distributed networks",
        "Nakamoto Consensus: Combining Proof-of-Work with Longest Chain Rule",
        "Deterministic finality without counterparty trust"
      ],
      content: [
        "For decades, computer scientists grappled with the Byzantine Generals Problem: how can independent actors reach consensus over an adversarial network without trusting a central coordinator?",
        "Satoshi Nakamoto solved this not through cryptography alone, but by coupling cryptography with economic incentives. In Nakamoto Consensus, nodes follow the chain with the most accumulated Proof-of-Work (the 'Longest Chain Rule').",
        "By requiring miners to expend real-world thermodynamic energy, creating an alternative historical ledger becomes exponentially more expensive than cooperating with the network. An attacker attempting to reverse a transaction must outpace the combined computational power of all honest participants worldwide."
      ],
      formula: {
        name: "Double-Spend Reorganization Probability",
        math: "P(\\text{Double-Spend}) = \\sum_{k=0}^{\\infty} \\frac{\\lambda^k e^{-\\lambda}}{k!} \\left(\\frac{q}{p}\\right)^{\\max(z - k, 0)}",
        explanation: "Where q is the attacker's fraction of hash power, p is honest hash power, and z is the confirmation depth. After 6 confirmations, attack success probability approaches zero."
      },
      proTip: "Full nodes do not trust miners. Full nodes enforce consensus rules independently. If a miner produces a block that awards themselves 50 BTC instead of the current 3.125 BTC subsidy, every full node rejects it instantaneously."
    },
    {
      id: "c1-l2",
      slug: "sha256-cryptographic-hashing",
      chapterNumber: "01",
      lessonNumber: 2,
      title: "2. SHA-256 Hashing & One-Way Pre-Image Resistance",
      duration: "6 mins",
      keyConcepts: [
        "Cryptographic properties: Pre-image resistance and collision resistance",
        "Avalanche Effect: 1-bit input flip alters 50% of output bits",
        "The mining target equation and block header hashing"
      ],
      content: [
        "At the core of Bitcoin's security lies the Secure Hash Algorithm 256-bit (SHA-256). Designed by the NSA and published in 2001, SHA-256 is a deterministic mathematical function that converts any arbitrary input into a unique 64-character hexadecimal digest.",
        "Crucially, SHA-256 is computationally irreversible (one-way). Given the output hash, it is mathematically impossible to reverse-engineer the original input text other than by brute-force guessing through 2^256 possibilities—more than the number of atoms in the observable universe.",
        "Miners take an 80-byte block header (containing previous block hash, Merkle root, timestamp, and nonce) and hash it repeatedly until the digest falls below the current network Difficulty Target."
      ],
      proTip: "The Avalanche Effect ensures that changing even a single comma in an entire blockchain history completely alters every downstream block hash, making data tampering instantly noticeable."
    },
    {
      id: "c1-l3",
      slug: "proof-of-work-thermodynamics",
      chapterNumber: "01",
      lessonNumber: 3,
      title: "3. Proof-of-Work: Anchoring Digital Money to Thermodynamic Energy",
      duration: "8 mins",
      keyConcepts: [
        "Energy as an unforgeable physical constraint",
        "ASIC hardware evolution and exahashes per second",
        "Monetizing stranded and curtailment renewable energy"
      ],
      content: [
        "Fiat money can be printed at zero marginal cost by central bankers pressing keys on a keyboard. Proof-of-Work changes this by tying digital monetary issuance to the immutable physical laws of thermodynamics.",
        "Bitcoin miners deploy Application-Specific Integrated Circuits (ASICs) that perform trillions of computations per second. Because electricity costs real capital, miners have a massive financial disincentive to act maliciously.",
        "Furthermore, Bitcoin mining acts as an elastic buyer of last resort for stranded energy—consuming stranded natural gas flares, excess hydro in wet seasons, and geothermal power that would otherwise be wasted due to transmission constraints."
      ],
      proTip: "Miners operate on thin profit margins. When Bitcoin price crashes, inefficient miners shut off machines, lowering network hash rate and triggering a difficulty downward adjustment."
    },
    {
      id: "c1-l4",
      slug: "utxo-model-mechanics",
      chapterNumber: "01",
      lessonNumber: 4,
      title: "4. The UTXO Cash Model vs Account Ledgers",
      duration: "7 mins",
      keyConcepts: [
        "Unspent Transaction Outputs as discrete digital bank notes",
        "Transaction inputs, outputs, and miner change mechanics",
        "Privacy, parallelism, and address reuse hazards"
      ],
      content: [
        "Unlike Ethereum or traditional bank accounts that track balances as single mutable variables, Bitcoin operates on Unspent Transaction Outputs (UTXOs).",
        "When you receive 1.5 BTC, you hold a single 1.5 BTC note locked with your public key script. If you later send 0.5 BTC to a friend, your transaction consumes the entire 1.5 BTC note as an input, pays 0.5 BTC to the recipient, pays 0.0001 BTC to the miner, and generates a brand new 0.9999 BTC change UTXO back to your wallet.",
        "This discrete model enables parallel transaction verification across multi-threaded CPUs and eliminates double-spending race conditions inherent in stateful account ledgers."
      ],
      proTip: "Avoid address reuse! Reusing the same Bitcoin receiving address links all your UTXOs together in blockchain clustering algorithms, permanently destroying your financial privacy."
    },
    {
      id: "c1-l5",
      slug: "halving-cycles-and-supply-shock",
      chapterNumber: "01",
      lessonNumber: 5,
      title: "5. The 4-Year Halving Cycle & Programmatic Supply Deficits",
      duration: "9 mins",
      keyConcepts: [
        "210,000 block epoch cadence (~3.95 years)",
        "Asymptotic approach to the 21,000,000 terminal cap",
        "Stock-to-Flow expansion and post-halving structural supply deficit"
      ],
      content: [
        "Every 210,000 blocks, the consensus code cuts the miner block subsidy by exactly 50%. Starting at 50 BTC in 2009, it dropped to 25 BTC (2012), 12.5 BTC (2016), 6.25 BTC (2020), and 3.125 BTC in April 2024.",
        "Following the 2024 halving, global daily miner issuance plummeted from 900 BTC/day to only 450 BTC/day. At an average price of $90,000, this removes over $14.7 billion per year in structural sell pressure from the market.",
        "Because demand from institutional Spot ETFs, sovereign balance sheets, and retail investors continues to absorb supply, the cumulative deficit compounds over months, consistently sparking multi-quarter bull expansions."
      ],
      proTip: "Halving pumps are never immediate on halving day. Historically, the explosive parabolic price expansion manifests 150 to 450 days after the halving event as exchange inventory dries up."
    },
    {
      id: "c1-l6",
      slug: "difficulty-adjustment-algorithm",
      chapterNumber: "01",
      lessonNumber: 6,
      title: "6. The Difficulty Adjustment Algorithm (DAA): The Market Heartbeat",
      duration: "6 mins",
      keyConcepts: [
        "2,016-block difficulty retarget epoch (precisely two weeks)",
        "Maintaining the 10-minute target block interval",
        "Why increased mining hardware cannot inflate Bitcoin supply"
      ],
      content: [
        "In physical commodities like gold or copper, when price surges, mining companies deploy more capital, extract more metal from the earth, and increase annual supply, pushing prices back down.",
        "Bitcoin prevents this with the Difficulty Adjustment Algorithm (DAA). Every 2,016 blocks (~14 days), the network compares the time it took to mine those blocks against the expected 20,160 minutes.",
        "If more miners join and blocks are found in 8 minutes, the network increases difficulty by up to 300%. If miners leave and blocks take 12 minutes, difficulty drops. This guarantees that block issuance remains strictly tied to clock time regardless of how much computing power attacks the network."
      ],
      proTip: "Hash rate follows price, and difficulty follows hash rate. A rising difficulty metric proves long-term miners are deploying billions of dollars in new capex infrastructure."
    },
    {
      id: "c1-l7",
      slug: "mempool-microstructure-and-fees",
      chapterNumber: "01",
      lessonNumber: 7,
      title: "7. Mempool Microstructure, Fee Bidding & Replace-By-Fee (RBF)",
      duration: "7 mins",
      keyConcepts: [
        "The Mempool as an unconfirmed transaction waiting room",
        "Fee rate measured in satoshis per virtual byte (sat/vB)",
        "Replace-By-Fee (RBF) and Child-Pays-For-Parent (CPFP) acceleration"
      ],
      content: [
        "When you broadcast a Bitcoin transaction, it does not go directly onto the blockchain. It enters the Mempool (memory pool), a local staging queue maintained by every full node.",
        "Miners prioritize transactions based on fee density: satoshis per virtual byte (sat/vB), not the total dollar amount transferred. Transferring $100M with a simple 1-input 2-output transaction costs the exact same fee as transferring $10.",
        "If network congestion spikes and your transaction gets stuck, Replace-By-Fee (RBF) allows you to re-broadcast the same transaction with a higher fee rate to incentivize miners to include it in the next block."
      ],
      proTip: "Check public mempool explorers before sending transactions. Sending non-urgent transactions on Sunday mornings often saves you 80% on network transaction fees compared to volatile weekday US trading hours."
    },
    {
      id: "c1-l8",
      slug: "soft-forks-vs-hard-forks",
      chapterNumber: "01",
      lessonNumber: 8,
      title: "8. Protocol Upgrades: Soft Forks (SegWit, Taproot) vs Hard Forks",
      duration: "7 mins",
      keyConcepts: [
        "Soft Forks: Backward-compatible rule tightening",
        "Hard Forks: Non-backward-compatible chain splits",
        "SegWit (BIP 141) discount and Taproot (Schnorr signatures) efficiency"
      ],
      content: [
        "A Hard Fork introduces rules that older nodes consider invalid, splitting the chain permanently unless 100% of the network upgrades (e.g. the 2017 Bitcoin vs Bitcoin Cash blocksize war).",
        "A Soft Fork tightens rules in a backward-compatible manner. Un-upgraded nodes still validate blocks as legal, avoiding catastrophic network splits.",
        "Major historical soft forks include Segregated Witness (SegWit) in 2017, which separated signature data to effectively increase block capacity and fix transaction malleability, and Taproot in 2021, which introduced Schnorr signatures for enhanced privacy and batch verification."
      ],
      proTip: "Always use native SegWit (bech32 starting with 'bc1q') or Taproot ('bc1p') addresses. They reduce transaction weight by up to 38%, directly slashing your mining fees."
    },
    {
      id: "c1-l9",
      slug: "sovereign-self-custody-mechanics",
      chapterNumber: "01",
      lessonNumber: 9,
      title: "9. Sovereign Self-Custody & Cold Storage Hardware Security",
      duration: "8 mins",
      keyConcepts: [
        "BIP-39 mnemonic seed phrases (12 to 24 words) and entropy",
        "Hierarchical Deterministic (HD) wallets (BIP-32/44)",
        "Hardware Security Modules (HSM) and air-gapped signing"
      ],
      content: [
        "Holding crypto on a centralized exchange means you do not own Bitcoin; you own an unsecured IOU from a corporation. If the exchange suffers insolvency or regulatory seizure (FTX, Mt. Gox, Celsius), your funds vanish.",
        "True cryptocurrency ownership requires sovereign self-custody. A hardware wallet generates 256 bits of cryptographically secure random entropy, mapped to a 24-word BIP-39 seed phrase.",
        "Private keys are permanently isolated inside a tamper-resistant secure element chip and never touch an internet-connected device. Transactions are constructed on your computer, passed to the hardware device via USB or QR code, signed offline, and broadcasted safely."
      ],
      proTip: "Never take a digital photo of your seed phrase, never type it into a computer keyboard, and never save it in a password manager. Stamp your 24 words into physical stainless steel to survive fire and water damage."
    },
    {
      id: "c1-l10",
      slug: "lightning-network-scaling",
      chapterNumber: "01",
      lessonNumber: 10,
      title: "10. The Lightning Network & Layer-2 Payment Channels",
      duration: "6 mins",
      keyConcepts: [
        "Off-chain scaling via 2-of-2 multi-signature payment channels",
        "Hashed Time-Locked Contracts (HTLCs) for multi-hop routing",
        "Instant settlement and sub-penny micro-transactions"
      ],
      content: [
        "Bitcoin's base layer processes ~7 transactions per second, prioritizing decentralization and censorship resistance over raw throughput. Global consumer payments scale via Layer-2: The Lightning Network.",
        "Two parties open a payment channel by locking funds in a 2-of-2 multi-signature output on the Bitcoin blockchain. Once open, they can exchange millions of signed transactions instantaneously off-chain with zero blockchain fees.",
        "Using Hashed Time-Locked Contracts (HTLCs), payments route seamlessly through intermediate nodes across the global Lightning network without requiring trust in any node along the path."
      ],
      proTip: "Use base-layer Bitcoin for large generational wealth settlements ($1,000+) and Lightning Network channels for daily merchant coffees, subscriptions, and cross-border remittances."
    }
  ],
  quiz: [
    {
      question: "Why does an increase in global mining hash rate fail to accelerate the rate of Bitcoin issuance?",
      options: [
        "Because miners automatically burn 50% of mined coins",
        "Because the Difficulty Adjustment Algorithm recalculates every 2,016 blocks to maintain the 10-minute block interval",
        "Because satellite nodes reject blocks mined with new ASICs",
        "Because transactions are capped by centralized clearing exchanges"
      ],
      correctIndex: 1,
      explanation: "Bitcoin's Difficulty Adjustment Algorithm recalculates every 2,016 blocks (~14 days), offsetting hash rate increases by raising mathematical puzzle difficulty to preserve the 10-minute block average."
    },
    {
      question: "What is the primary security advantage of cold storage hardware wallets?",
      options: [
        "They guarantee a 10% annual staking yield on Bitcoin",
        "Private keys remain completely air-gapped inside a secure element chip and never touch an internet-connected operating system",
        "They allow free transactions without paying miner fees",
        "They automatically reverse fraudulent transactions"
      ],
      correctIndex: 1,
      explanation: "Hardware wallets isolate the cryptographic private keys from internet-connected malware, signing transactions offline inside the secure element."
    }
  ]
};
