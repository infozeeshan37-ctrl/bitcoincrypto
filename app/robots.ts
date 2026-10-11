import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.bitcoincrypto.tech";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/ads.txt"],
        disallow: ["/api/"],
      },
      // OpenAI ChatGPT & SearchGPT crawlers
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Anthropic Claude crawlers
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/"],
      },
      // Perplexity AI search crawler
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Google Gemini & Search crawlers
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      // Google AdSense Crawlers
      {
        userAgent: "Mediapartners-Google",
        allow: ["/", "/ads.txt"],
      },
      {
        userAgent: "AdsBot-Google",
        allow: ["/", "/ads.txt"],
      },
      {
        userAgent: "AdsBot-Google-Mobile",
        allow: ["/", "/ads.txt"],
      },
      // Apple & Microsoft / Bing AI crawlers
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Meta & Cohere AI crawlers
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Cohere-ai",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/"],
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/llms.txt`],
    host: "www.bitcoincrypto.tech",
  };
}
