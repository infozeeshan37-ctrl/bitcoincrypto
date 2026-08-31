import { MetadataRoute } from "next";
import { articles } from "@/lib/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.bitcoincrypto.tech";
  const currentDate = new Date().toISOString();

  // Static routes with priorities and change frequency
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 1.0,
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

  // Dynamic research articles
  const blogRoutes: MetadataRoute.Sitemap = articles.map((art) => ({
    url: `${baseUrl}/blog/${art.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
