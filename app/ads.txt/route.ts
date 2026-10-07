import { NextResponse } from "next/server";

export async function GET() {
  // Extract pub-XXXXXXXXXXXXXXXX from NEXT_PUBLIC_ADSENSE_CLIENT_ID (e.g. ca-pub-5486114901283025 -> pub-5486114901283025)
  const rawId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "pub-5486114901283025";
  const pubId = rawId.replace(/^ca-/, "");

  const adsTxtContent = `# Google AdSense Authorized Digital Sellers (ads.txt) for BitcoinCrypto.tech
# Official IAB Tech Lab ads.txt standard record
google.com, ${pubId}, DIRECT, f08c47fec0942fa0
`;

  return new NextResponse(adsTxtContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
