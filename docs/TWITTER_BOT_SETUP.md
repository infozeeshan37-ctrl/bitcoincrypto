# 🤖 BitcoinCrypto.tech — Twitter/X Automated Bot Setup Guide

This automated Twitter bot dynamically generates high-engagement crypto alerts, live AI trading signals, CoinGlass liquidation updates, US CPI macro countdowns, and coin price predictions with direct links to **https://www.bitcoincrypto.tech** to drive continuous organic audience traffic.

---

## 🔑 Step 1: Get Free Twitter Developer API Keys (5 Minutes)

1. Log into your Twitter/X account and go to the **[Twitter Developer Portal](https://developer.x.com/)**.
2. Click **Sign up for Free Account** or **Create Project / App**.
3. Under **User authentication settings**:
   - Set **App permissions** to: **`Read and Write`** (Required so the bot can post tweets).
   - Set **Type of App** to: **`Web App, Automated App or Bot`**.
4. Go to **Keys and Tokens** tab and generate:
   - `API Key` (Consumer Key)
   - `API Key Secret` (Consumer Secret)
   - `Access Token`
   - `Access Token Secret`

---

## ⚙️ Step 2: Enable 24/7 Automated Posting via GitHub Actions (Zero Server Cost)

Your project already includes an automated scheduler workflow in `.github/workflows/twitter-bot-scheduler.yml` that runs every 4 hours.

To activate it:
1. Go to your GitHub repository: **`https://github.com/infozeeshan37-ctrl/bitcoincrypto`**.
2. Click on **Settings** ➔ **Secrets and variables** ➔ **Actions**.
3. Click **New repository secret** and add the following 4 secrets:

| Secret Name | Value from Twitter Developer Portal |
| :--- | :--- |
| `TWITTER_API_KEY` | Your Twitter API Key |
| `TWITTER_API_SECRET` | Your Twitter API Key Secret |
| `TWITTER_ACCESS_TOKEN` | Your Twitter Access Token |
| `TWITTER_ACCESS_SECRET` | Your Twitter Access Token Secret |

Once added, GitHub Actions will automatically post a new tweet every 4 hours!

You can also manually trigger a tweet anytime:
- Go to **Actions** tab on GitHub ➔ Select **🤖 BitcoinCrypto Twitter Auto-Publisher** ➔ Click **Run workflow**.

---

## 💻 Step 3: Run Locally or Test Dry-Run

You can test the bot locally anytime without publishing:

```bash
# Test tweet generation (Dry run - no keys needed)
node scripts/twitterAutoPublisher.mjs --dry-run

# Test all 6 tweet category templates
node scripts/twitterAutoPublisher.mjs --test-all
```

To publish a live tweet from your local terminal:
1. Add the 4 keys to your `.env.local`:
```env
TWITTER_API_KEY="your_api_key"
TWITTER_API_SECRET="your_api_secret"
TWITTER_ACCESS_TOKEN="your_access_token"
TWITTER_ACCESS_SECRET="your_access_secret"
```
2. Run:
```bash
node scripts/twitterAutoPublisher.mjs
```

---

## 🌐 Step 4: Webhook & Vercel Cron Endpoint

You can also trigger tweets programmatically via the Next.js API route:

- **Endpoint**: `POST https://www.bitcoincrypto.tech/api/cron/tweet`
- **Optional Header**: `Authorization: Bearer <CRON_SECRET>`
- **Query Parameter**: `?dry_run=true` (to preview without posting)

---

## 📊 Rotating Tweet Content Categories

1. **🚨 Live AI Quant Signals**: Real-time Binance spot prices, targets, stop-losses, and squeeze magnets for top pairs (BTC, ETH, SOL, SUI, DOGE, XRP, ADA, PEPE, TAO, KAS).
2. **🏛️ US CPI Macro Countdown**: Live days remaining until the next official BLS CPI inflation report, AI forecast beats, and Fed rate cut probability.
3. **🔥 CoinGlass Derivatives Squeeze**: 24h liquidations total, aggregate Open Interest ($68B+), long/short skew, and 8h funding rates.
4. **🎯 24h / 7d / 30d Coin Predictions**: Rotating deep-dives into 36 cryptocurrency price targets.
5. **💡 Trading Masterclasses**: Microstructure insights on Order Book CVD, Perpetual Basis Arbitrage, and DCA mathematical models.
6. **🛠️ Free Calculators**: Spotlights on the Funding Rate Screener, Position Sizer, and Fear & Greed Radar.
