import { NextRequest, NextResponse } from "next/server";
import { articles } from "@/lib/blogData";
import { coinPredictions } from "@/lib/coinPredictionsData";
import { conceptGuides } from "@/lib/conceptsData";

export const dynamic = "force-dynamic";

const INDEXNOW_KEY = "c839f4d1e2a7b605893e4120df71ac95";
const HOST = "www.bitcoincrypto.tech";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

function getAllSiteUrls(): string[] {
  const baseUrl = `https://${HOST}`;

  const staticRoutes = [
    baseUrl,
    `${baseUrl}/predictions`,
    `${baseUrl}/markets`,
    `${baseUrl}/coinglass`,
    `${baseUrl}/orderbook`,
    `${baseUrl}/whale-orders`,
    `${baseUrl}/cpi`,
    `${baseUrl}/tools`,
    `${baseUrl}/news`,
    `${baseUrl}/concepts`,
    `${baseUrl}/learn`,
    `${baseUrl}/blog`,
    `${baseUrl}/about`,
    `${baseUrl}/contact`,
    `${baseUrl}/privacy`,
    `${baseUrl}/terms`,
    `${baseUrl}/disclaimer`,
    `${baseUrl}/cookie-policy`,
  ];

  const predictionRoutes = coinPredictions.map((c) => `${baseUrl}/predictions/${c.slug}`);

  const dedicatedToolSlugs = [
    "trading-bot",
    "chart-terminal",
    "dca-simulator",
    "position-sizer",
    "crypto-converter",
    "liquidation-heatmap",
    "fear-greed-index",
    "profit-calculator",
    "funding-rate-screener",
    "whale-tracker",
  ];
  const toolRoutes = dedicatedToolSlugs.map((slug) => `${baseUrl}/tools/${slug}`);

  const conceptRoutes = conceptGuides.map((g) => `${baseUrl}/concepts/${g.slug}`);

  const blogRoutes = articles.map((a) => `${baseUrl}/blog/${a.slug}`);

  return [
    ...staticRoutes,
    ...predictionRoutes,
    ...toolRoutes,
    ...conceptRoutes,
    ...blogRoutes,
  ];
}

export async function GET(request: NextRequest) {
  return handleIndexNowSubmission();
}

export async function POST(request: NextRequest) {
  return handleIndexNowSubmission();
}

async function handleIndexNowSubmission() {
  const urls = getAllSiteUrls();

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const endpoints = [
    "https://api.indexnow.org/IndexNow",
    "https://www.bing.com/IndexNow",
  ];

  const results: any[] = [];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      results.push({
        endpoint,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });
    } catch (err: any) {
      results.push({
        endpoint,
        error: err?.message || String(err),
      });
    }
  }

  return NextResponse.json({
    success: true,
    totalUrlsSubmitted: urls.length,
    keyLocation: KEY_LOCATION,
    endpoints: results,
    timestamp: new Date().toISOString(),
  });
}
