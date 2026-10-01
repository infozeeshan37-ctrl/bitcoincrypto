import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | BitcoinCrypto.tech",
  description:
    "Learn about our privacy practices, Google AdSense cookie usage, third-party advertising disclosures, GDPR and CCPA compliance, and how your data is protected on BitcoinCrypto.tech.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | BitcoinCrypto.tech",
    description:
      "Comprehensive Privacy Policy detailing cookie disclosures, Google AdSense advertising, GDPR and CCPA user rights, and data protection practices.",
    url: "https://www.bitcoincrypto.tech/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
