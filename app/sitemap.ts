import { MetadataRoute } from "next";
import { articles } from "@/lib/blogData";
import { coinPredictions } from "@/lib/coinPredictionsData";
import { conceptGuides } from "@/lib/conceptsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.bitcoincrypto.tech";
  const currentDate = new Date().toISOString();

  // 1. Static Core Landing Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/predictions`,
      lastModified: currentDate,
      changeFrequency: "always",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/markets`,
      lastModified: currentDate,
      changeFrequency: "always",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/coinglass`,
      lastModified: currentDate,
      changeFrequency: "always",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/orderbook`,
      lastModified: currentDate,
      changeFrequency: "always",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/whale-orders`,
      lastModified: currentDate,
      changeFrequency: "always",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/cpi`,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/concepts`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  // 2. Dedicated Programmatic Coin AI Price Prediction Pages (15 Cryptos)
  const predictionRoutes: MetadataRoute.Sitemap = coinPredictions.map((coin) => ({
    url: `${baseUrl}/predictions/${coin.slug}`,
    lastModified: currentDate,
    changeFrequency: "always",
    priority: 0.9,
  }));

  // 3. Dedicated Individual Standalone Tool Pages
  const dedicatedToolSlugs = [
    "trading-bot",
    "chart-terminal",
    "dca-simulator",
    "position-sizer",
    "crypto-converter",
    "liquidation-heatmap",
  ];
  const toolRoutes: MetadataRoute.Sitemap = dedicatedToolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  // 4. Quantitative & Market Structure Concept Guides (8 Guides)
  const conceptRoutes: MetadataRoute.Sitemap = conceptGuides.map((guide) => ({
    url: `${baseUrl}/concepts/${guide.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 5. Macro Research Desk Articles (11 In-Depth Articles)
  const blogRoutes: MetadataRoute.Sitemap = articles.map((art) => ({
    url: `${baseUrl}/blog/${art.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...predictionRoutes,
    ...toolRoutes,
    ...conceptRoutes,
    ...blogRoutes,
  ];
}
