import { articles } from "@/lib/blogData";
import { conceptGuides } from "@/lib/conceptsData";

export async function GET() {
  const baseUrl = "https://www.bitcoincrypto.tech";

  const allFeedItems = [
    ...articles.map((art) => ({
      title: art.title,
      link: `${baseUrl}/blog/${art.slug}`,
      description: art.excerpt,
      pubDate: new Date(art.publishedAt).toUTCString(),
      category: art.category,
      guid: `${baseUrl}/blog/${art.slug}`,
    })),
    ...conceptGuides.map((guide) => ({
      title: guide.title,
      link: `${baseUrl}/concepts/${guide.slug}`,
      description: guide.summary,
      pubDate: new Date("2026-09-01T00:00:00Z").toUTCString(),
      category: guide.category,
      guid: `${baseUrl}/concepts/${guide.slug}`,
    })),
  ];

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>BitcoinCrypto.tech | Cryptocurrency Market Intelligence &amp; Quantitative Research</title>
  <link>${baseUrl}</link>
  <description>Real-time cryptocurrency market intelligence, order flow mechanics, Coinglass derivatives, AI price predictions, and macroeconomic CPI analysis.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
  <image>
    <url>${baseUrl}/logo.png</url>
    <title>BitcoinCrypto.tech</title>
    <link>${baseUrl}</link>
  </image>
  ${allFeedItems
    .map(
      (item) => `
  <item>
    <title><![CDATA[${item.title}]]></title>
    <link>${item.link}</link>
    <guid isPermaLink="true">${item.guid}</guid>
    <description><![CDATA[${item.description}]]></description>
    <category><![CDATA[${item.category}]]></category>
    <pubDate>${item.pubDate}</pubDate>
  </item>`
    )
    .join("")}
</channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
