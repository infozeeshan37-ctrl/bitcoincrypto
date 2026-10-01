"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Shield, Lock, Eye, Cookie, Server, Globe2, AlertCircle, Mail, CheckCircle2, FileText, ArrowRight } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 1, 2026";

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 sm:py-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy", href: "/privacy" },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Privacy &amp; Data Protection Policy</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Privacy Policy &amp; Cookie Disclosure
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            At <strong>BitcoinCrypto.tech</strong>, accessible from <Link href="https://www.bitcoincrypto.tech" className="text-amber-400 hover:underline font-mono">https://www.bitcoincrypto.tech</Link>, one of our top priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by BitcoinCrypto.tech and how we use it, including disclosures for <strong>Google AdSense</strong>, third-party advertising partners, cookies, GDPR, and CCPA.
          </p>
          <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
            <strong>Last Modified:</strong> {lastUpdated} • Effective Immediately for all international visitors.
          </div>
        </div>

        {/* Main Content Body */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">

          {/* Section 1: Consent */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>1. User Consent</span>
            </h2>
            <p>
              By accessing and using our website, platform tools, charts, algorithmic signals, and research articles, you hereby consent to our Privacy Policy and agree to its terms. If you do not agree with any part of this policy, please discontinue use of our site.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-500" />
              <span>2. Information We Collect</span>
            </h2>
            <p>
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
              <li><strong>Direct Communications:</strong> If you contact us directly via our <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">Contact Form</Link> or email, we may receive additional information about you such as your name, email address, phone number, the contents of the message, and any attachments you may send us.</li>
              <li><strong>Simulated Paper Wallet Data:</strong> Our AI prediction tools and DCA simulators use browser local storage (<code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px]">localStorage</code>) on your own device to store virtual demo balances, simulated positions, and custom visual settings. This data never leaves your device and is not stored on our central database.</li>
              <li><strong>Log Files:</strong> Like most standard web servers, BitcoinCrypto.tech follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.</li>
            </ul>
          </section>

          {/* Section 3: Google AdSense & Third-Party Advertising (Critical AdSense Requirement) */}
          <section className="space-y-3 p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Cookie className="w-5 h-5 text-amber-500" />
              <span>3. Google AdSense &amp; Third-Party Advertising Disclosures</span>
            </h2>
            <p>
              Google is one of the third-party vendors on our site. Google uses cookies, known as <strong>DART cookies</strong>, to serve ads to our site visitors based upon their visit to <code className="font-mono text-slate-900 dark:text-white">www.bitcoincrypto.tech</code> and other sites on the internet:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
              <li>
                <strong>Personalized Advertising:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
              </li>
              <li>
                <strong>DoubleClick DART Cookie:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
              </li>
              <li>
                <strong>User Opt-Out Mechanism:</strong> Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center gap-1">Google Ads Settings <ArrowRight className="w-3 h-3" /></a>. Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center gap-1">www.aboutads.info/choices <ArrowRight className="w-3 h-3" /></a> or the <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center gap-1">Network Advertising Initiative Opt-Out Page <ArrowRight className="w-3 h-3" /></a>.
              </li>
              <li>
                <strong>Third-Party Ad Networks:</strong> Other advertising partners and ad networks may also use cookies, JavaScript, or Web Beacons in their respective advertisements and links that appear on BitcoinCrypto.tech, which are sent directly to users&apos; browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
              </li>
            </ul>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              <em>Note: BitcoinCrypto.tech has no access to or control over these cookies that are used by third-party advertisers.</em>
            </p>
          </section>

          {/* Section 4: Cookies and Web Beacons */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-purple-500" />
              <span>4. Cookies and Web Beacons</span>
            </h2>
            <p>
              Like any other website, BitcoinCrypto.tech uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences (such as Light/Dark theme selection, UI accent color, and active trading pairs), and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
            </p>
            <p>
              For detailed information about the specific cookies we use, please consult our dedicated <Link href="/cookie-policy" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">Cookie Policy</Link>.
            </p>
          </section>

          {/* Section 5: GDPR Data Protection Rights (For EEA Users) */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-indigo-500" />
              <span>5. GDPR Data Protection Rights (EEA &amp; UK Residents)</span>
            </h2>
            <p>
              We would like to make sure you are fully aware of all of your data protection rights under the General Data Protection Regulation (GDPR). Every user residing in the European Economic Area (EEA) is entitled to the following:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block">The right to access</strong>
                <span className="text-slate-500 dark:text-slate-400 text-xs">You have the right to request copies of your personal data held by us.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block">The right to rectification</strong>
                <span className="text-slate-500 dark:text-slate-400 text-xs">You have the right to request that we correct any information you believe is inaccurate.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block">The right to erasure</strong>
                <span className="text-slate-500 dark:text-slate-400 text-xs">You have the right to request that we erase your personal data, under certain conditions.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block">The right to data portability</strong>
                <span className="text-slate-500 dark:text-slate-400 text-xs">You have the right to request transfer of the data we have collected to another organization.</span>
              </div>
            </div>
            <p className="pt-2">
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at: <a href="mailto:infozeeshan37@gmail.com" className="text-amber-600 dark:text-amber-400 font-mono font-bold hover:underline">infozeeshan37@gmail.com</a>.
            </p>
          </section>

          {/* Section 6: CCPA / CPRA Privacy Rights (Do Not Sell My Personal Information) */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span>6. CCPA &amp; CPRA Privacy Rights (California Residents)</span>
            </h2>
            <p>
              Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California consumers have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
              <li>Request that a business disclose the categories and specific pieces of personal data collected about consumers.</li>
              <li>Request that a business delete any personal data about the consumer that a business collected.</li>
              <li><strong>Right to Opt-Out of the Sale or Sharing of Personal Data:</strong> BitcoinCrypto.tech does not sell personal data for monetary value. We permit third-party advertising cookies (such as Google AdSense) which may be considered &quot;sharing&quot; under California law for personalized advertising. You may opt out anytime via our Cookie Preferences or Google Ads Settings.</li>
            </ul>
          </section>

          {/* Section 7: Children's Information (COPPA) */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              <span>7. Children&apos;s Information (COPPA Compliance)</span>
            </h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              BitcoinCrypto.tech does not knowingly collect any Personal Identifiable Information from children under the age of 13 (or under 16 in the European Union). If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>
          </section>

          {/* Section 8: External Third-Party Links */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-500" />
              <span>8. Third-Party Websites &amp; Exchange Links</span>
            </h2>
            <p>
              BitcoinCrypto.tech&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers or exchanges (such as Binance, TradingView, CoinMarketCap, Coinglass, or GitHub) for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
          </section>

          {/* Section 9: Contacting Us */}
          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-500" />
              <span>9. Contacting Our Data Protection Officer</span>
            </h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact our editorial and data governance team:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 font-mono text-xs">
              <div><strong>Platform:</strong> BitcoinCrypto.tech</div>
              <div><strong>Primary Inquiries:</strong> <a href="mailto:infozeeshan37@gmail.com" className="text-amber-600 dark:text-amber-400 hover:underline">infozeeshan37@gmail.com</a></div>
              <div><strong>Editorial Office:</strong> <a href="mailto:contact@bitcoincrypto.tech" className="text-amber-600 dark:text-amber-400 hover:underline">contact@bitcoincrypto.tech</a></div>
              <div><strong>Interactive Support:</strong> <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">https://www.bitcoincrypto.tech/contact</Link></div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
