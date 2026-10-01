import { NextResponse } from "next/server";

export async function GET() {
  const adsTxtContent = `# Google AdSense Authorized Digital Sellers (ads.txt) for BitcoinCrypto.tech
# Replace pub-XXXXXXXXXXXXXXXX with your actual AdSense Publisher ID
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
`;

  return new NextResponse(adsTxtContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
