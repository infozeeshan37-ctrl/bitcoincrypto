import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Support Desk | BitcoinCrypto.tech",
  description:
    "Get in touch with the BitcoinCrypto.tech editorial, research, and support team for inquiries, API partnerships, feedback, or technical assistance.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us & Support Desk | BitcoinCrypto.tech",
    description:
      "Contact the BitcoinCrypto.tech quantitative team, editorial office, and technical support desk.",
    url: "https://www.bitcoincrypto.tech/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
