import nodemailer from "nodemailer";

export interface SendWelcomeEmailParams {
  recipientEmail: string;
  selectedTopics: string[];
  frequency: string;
}

export function generateWelcomeHtml(email: string, topics: string[], frequency: string): string {
  const topicNames = topics.map((t) => {
    switch (t) {
      case "macro-cycles": return "🌐 Macro Cycles & Halving Economics";
      case "whale-alerts": return "🐋 Whale Block & Dark Pool Radar";
      case "ai-signals": return "⚡ AI DeepQuant 5M Momentum Signals";
      case "coinglass-squeezes": return "🔥 CoinGlass Liquidation Squeezes";
      case "altcoin-breakouts": return "🚀 Altcoin Breakouts & Layer-1 Rotation";
      case "meme-velocity": return "🐶 Meme Coins & High-Beta Momentum";
      case "cpi-fed": return "🏛️ US CPI & Federal Reserve Predictor";
      case "funding-arbitrage": return "📊 Funding Rate & Cash-and-Carry APY";
      default: return t;
    }
  });

  const topicsListHtml = topicNames
    .map(
      (name) =>
        `<li style="padding: 6px 0; color: #f1f5f9; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.08);">
          <strong style="color: #fbbf24;">✓</strong> ${name}
        </li>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to BitcoinCrypto Institutional Research</title>
</head>
<body style="margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #020617; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #0b0f19; border: 1px solid #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7);">
          
          <!-- Header Hero -->
          <tr>
            <td style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%); padding: 36px 30px; text-align: center;">
              <div style="width: 52px; height: 52px; line-height: 52px; background-color: #020617; color: #f59e0b; border-radius: 16px; font-size: 26px; font-weight: 900; margin: 0 auto 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                ₿
              </div>
              <h1 style="margin: 0 0 8px; color: #020617; font-size: 26px; font-weight: 900; letter-spacing: -0.5px;">
                Welcome to BitcoinCrypto Research
              </h1>
              <p style="margin: 0; color: #3f2203; font-size: 14px; font-weight: 700;">
                Institutional Market Intelligence • Quantitative Algorithms • Derivatives Flow
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 30px;">
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #cbd5e1;">
                Hello Analyst,
              </p>
              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #94a3b8;">
                Your subscription to the <strong style="color: #fbbf24;">BitcoinCrypto.tech Research Desk</strong> has been officially confirmed for <span style="color: #f1f5f9; font-family: monospace;">${email}</span>. You now have automated access to our institutional quantitative signals, orderbook tape analysis, and derivatives intelligence.
              </p>

              <!-- Selected Streams Card -->
              <div style="background-color: #111827; border: 1px solid #1f2937; border-radius: 18px; padding: 20px; margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #fbbf24; font-weight: 800; margin-bottom: 10px;">
                  Your Active Automated Research Streams (${topics.length}):
                </div>
                <ul style="margin: 0; padding: 0; list-style: none;">
                  ${topicsListHtml}
                </ul>
                <div style="margin-top: 12px; font-size: 11px; color: #64748b; font-family: monospace;">
                  Cadence: <strong style="color: #38bdf8;">${frequency}</strong> • Powered by real-time Binance & CME WebSocket pipelines
                </div>
              </div>

              <!-- Instant Whitepaper Gift Box -->
              <div style="background: linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(217,119,6,0.05) 100%); border: 1px solid rgba(245,158,11,0.3); border-radius: 18px; padding: 22px; margin-bottom: 26px; text-align: center;">
                <div style="font-size: 10px; font-family: monospace; font-weight: 900; text-transform: uppercase; color: #f59e0b; margin-bottom: 6px;">
                  ★ VIP Subscriber Edition #142 (Included)
                </div>
                <div style="font-size: 16px; font-weight: 900; color: #f1f5f9; margin-bottom: 8px;">
                  Stealth Yield Curve Control & Institutional Cycle Dynamics
                </div>
                <p style="font-size: 12px; color: #94a3b8; margin: 0 0 16px; line-height: 1.5;">
                  Comprehensive 28-page institutional whitepaper examining global M2 expansion, bank reserve mechanics, and post-halving target scenarios.
                </p>
                <a href="https://www.bitcoincrypto.tech/blog/stealth-yield-curve-control-macro-mechanics-crypto" style="display: inline-block; background-color: #f59e0b; color: #020617; font-size: 13px; font-weight: 900; padding: 12px 24px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 14px rgba(245,158,11,0.3);">
                  Read Full Research Report &rarr;
                </a>
              </div>

              <!-- Quick Links to Flagship Live Terminals -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 800; margin-bottom: 12px;">
                  Access Free Institutional Tools:
                </div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="50%" style="padding-right: 6px; padding-bottom: 8px;">
                      <a href="https://www.bitcoincrypto.tech/coinglass" style="display: block; background-color: #111827; border: 1px solid #1e293b; padding: 12px 14px; border-radius: 12px; text-decoration: none; color: #f1f5f9; font-size: 12px; font-weight: 700;">
                        🔥 <span style="color: #fb923c;">CoinGlass Heatmap</span>
                      </a>
                    </td>
                    <td width="50%" style="padding-left: 6px; padding-bottom: 8px;">
                      <a href="https://www.bitcoincrypto.tech/whale-orders" style="display: block; background-color: #111827; border: 1px solid #1e293b; padding: 12px 14px; border-radius: 12px; text-decoration: none; color: #f1f5f9; font-size: 12px; font-weight: 700;">
                        🐋 <span style="color: #818cf8;">Whale Radar ($1M+)</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" style="padding-right: 6px;">
                      <a href="https://www.bitcoincrypto.tech/predictions" style="display: block; background-color: #111827; border: 1px solid #1e293b; padding: 12px 14px; border-radius: 12px; text-decoration: none; color: #f1f5f9; font-size: 12px; font-weight: 700;">
                        🤖 <span style="color: #a855f7;">AI 5M Signals (36 Coins)</span>
                      </a>
                    </td>
                    <td width="50%" style="padding-left: 6px;">
                      <a href="https://www.bitcoincrypto.tech/cpi" style="display: block; background-color: #111827; border: 1px solid #1e293b; padding: 12px 14px; border-radius: 12px; text-decoration: none; color: #f1f5f9; font-size: 12px; font-weight: 700;">
                        🏛️ <span style="color: #38bdf8;">US CPI AI Predictor</span>
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #94a3b8;">The BitcoinCrypto Quantitative Research Desk</strong><br>
                <a href="https://www.bitcoincrypto.tech" style="color: #f59e0b; text-decoration: none;">www.bitcoincrypto.tech</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #080c14; border-top: 1px solid #1e293b; padding: 20px 30px; text-align: center;">
              <p style="margin: 0 0 6px; font-size: 11px; color: #475569;">
                Zero Spam Guarantee. You received this email because you subscribed on bitcoincrypto.tech.
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                <a href="https://www.bitcoincrypto.tech/terms" style="color: #64748b; text-decoration: underline;">Terms of Service</a> •
                <a href="https://www.bitcoincrypto.tech/privacy" style="color: #64748b; text-decoration: underline;">Privacy Policy</a> •
                <a href="https://www.bitcoincrypto.tech/contact" style="color: #64748b; text-decoration: underline;">Contact Desk</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendWelcomeEmail({ recipientEmail, selectedTopics, frequency }: SendWelcomeEmailParams): Promise<{
  success: boolean;
  delivered: boolean;
  transport: string;
  error?: string;
}> {
  const htmlContent = generateWelcomeHtml(recipientEmail, selectedTopics, frequency);
  const textContent = `Welcome to BitcoinCrypto Institutional Research!\n\nYour subscription for ${recipientEmail} is confirmed.\nActive Streams: ${selectedTopics.join(", ")}\nCadence: ${frequency}\n\nAccess your VIP Whitepaper: https://www.bitcoincrypto.tech/blog/stealth-yield-curve-control-macro-mechanics-crypto\n\nVisit BitcoinCrypto: https://www.bitcoincrypto.tech`;

  // 1. Try Resend API if RESEND_API_KEY is available
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.NEWSLETTER_FROM_EMAIL || "BitcoinCrypto Research <research@bitcoincrypto.tech>",
          to: [recipientEmail],
          subject: "Welcome to BitcoinCrypto Research Desk (VIP Access Pass + Issue #142)",
          html: htmlContent,
          text: textContent,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        return { success: true, delivered: true, transport: `resend:${json.id}` };
      }
    } catch (e: any) {
      console.warn("Resend email dispatch warning:", e);
    }
  }

  // 2. Try SMTP Transport (Gmail SMTP, Brevo, SendGrid, Amazon SES, Custom SMTP)
  const smtpHost = process.env.SMTP_HOST || (process.env.GMAIL_USER ? "smtp.gmail.com" : "");
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: process.env.NEWSLETTER_FROM_EMAIL || `"BitcoinCrypto Research" <${smtpUser}>`,
        to: recipientEmail,
        subject: "Welcome to BitcoinCrypto Research Desk (VIP Access Pass + Issue #142)",
        text: textContent,
        html: htmlContent,
      });

      return { success: true, delivered: true, transport: `smtp:${info.messageId}` };
    } catch (e: any) {
      console.warn("SMTP email dispatch warning:", e);
    }
  }

  // 3. Simulated Dispatch (Ready for SMTP config)
  console.log(`[NEWSLETTER DISPATCH ENGINE] Welcome email prepared for ${recipientEmail} with ${selectedTopics.length} topics. To send live network emails directly to Gmail inboxes, set GMAIL_USER & GMAIL_APP_PASSWORD (or RESEND_API_KEY) in .env.local.`);

  return {
    success: true,
    delivered: false,
    transport: "local_dispatch_engine",
    error: "Live email simulated. To send direct network emails to Gmail, configure SMTP credentials in .env.local.",
  };
}
