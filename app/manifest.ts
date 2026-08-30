import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BitcoinCrypto.tech | Cryptocurrency Intelligence & Trading Tech",
    short_name: "BitcoinCrypto",
    description: "Modern, transparent cryptocurrency market intelligence, order flow mechanics, Coinglass derivatives, DCA models, and macroeconomic CPI analysis.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0F19",
    theme_color: "#F7931A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
