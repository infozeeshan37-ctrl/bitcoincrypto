import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy & Tracking Technologies | BitcoinCrypto.tech",
  description:
    "Learn about how BitcoinCrypto.tech uses cookies, Google AdSense DoubleClick cookies, web beacons, and local storage to improve user experience.",
  alternates: {
    canonical: "/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | BitcoinCrypto.tech",
    description:
      "Cookie Policy detailing essential cookies, analytical tracking, and Google AdSense advertising cookie preferences.",
    url: "https://www.bitcoincrypto.tech/cookie-policy",
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
