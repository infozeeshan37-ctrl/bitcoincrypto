const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const publicDir = path.join(__dirname, '..', 'public');

  // 1. High-Resolution SVG for the Brand Logo Icon
  const svgLogo = `
  <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="128" fill="#0B0F19"/>
    <circle cx="256" cy="256" r="210" fill="url(#grad)" stroke="#F59E0B" stroke-width="12"/>
    <defs>
      <linearGradient id="grad" x1="100" y1="80" x2="420" y2="440" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#F59E0B"/>
        <stop offset="50%" stop-color="#D97706"/>
        <stop offset="100%" stop-color="#B45309"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <text x="256" y="340" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="280" fill="#FFFFFF" text-anchor="middle" filter="url(#glow)">₿</text>
  </svg>
  `;

  // 2. OpenGraph Social Share Preview (1200x630)
  const svgOgImage = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#070A12"/>
    <circle cx="950" cy="150" r="350" fill="#F59E0B" fill-opacity="0.12"/>
    <circle cx="150" cy="500" r="300" fill="#8B5CF6" fill-opacity="0.10"/>
    
    <!-- Logo Badge -->
    <rect x="100" y="90" width="80" height="80" rx="24" fill="#F59E0B"/>
    <text x="140" y="152" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="52" fill="#070A12" text-anchor="middle">₿</text>
    <text x="200" y="148" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="38" fill="#FFFFFF">BitcoinCrypto<tspan fill="#F59E0B">.tech</tspan></text>
    
    <!-- Hero Headline -->
    <text x="100" y="260" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="56" fill="#FFFFFF">Institutional Crypto Intelligence</text>
    <text x="100" y="325" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="56" fill="#F59E0B">&amp; AI Prediction Terminal</text>
    
    <!-- Subtitle -->
    <text x="100" y="400" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="24" fill="#94A3B8">CoinGlass Liquidation Heatmaps • Whale Orders • 98.6% Confluence AI Signals</text>
    
    <!-- Feature Badges -->
    <rect x="100" y="460" width="220" height="48" rx="14" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
    <text x="210" y="491" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="16" fill="#38BDF8" text-anchor="middle">⚡ 2D Heatmap Spectrogram</text>

    <rect x="340" y="460" width="200" height="48" rx="14" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
    <text x="440" y="491" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="16" fill="#34D399" text-anchor="middle">🐋 Whale Orders Tape</text>

    <rect x="560" y="460" width="200" height="48" rx="14" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
    <text x="660" y="491" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="16" fill="#FBBF24" text-anchor="middle">🎯 36+ AI Predictions</text>
    
    <!-- Bottom Domain Bar -->
    <rect x="100" y="550" width="1000" height="1" fill="#334155"/>
    <text x="100" y="585" font-family="-apple-system, BlinkMacSystemFont, monospace" font-weight="700" font-size="18" fill="#F59E0B">https://www.bitcoincrypto.tech</text>
    <text x="1100" y="585" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="16" fill="#64748B" text-anchor="end">Live Multi-Exchange WebSocket Engine</text>
  </svg>
  `;

  const svgBuffer = Buffer.from(svgLogo);

  // Generate 512x512 PNG (public/icon.png)
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon.png'));
  console.log('✓ Created public/icon.png (512x512)');

  // Generate 192x192 PNG (public/icon-192.png)
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('✓ Created public/icon-192.png (192x192)');

  // Generate 180x180 Apple Touch Icon (public/apple-icon.png & public/apple-touch-icon.png)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-icon.png'));
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created public/apple-icon.png (180x180)');

  // Generate 48x48 Favicon ICO (public/favicon.ico)
  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('✓ Created public/favicon.ico (48x48)');

  // Generate public/logo.png (512x512)
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'logo.png'));
  console.log('✓ Created public/logo.png');

  // Generate public/og-image.png (1200x630)
  const ogBuffer = Buffer.from(svgOgImage);
  await sharp(ogBuffer)
    .resize(1200, 630)
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Created public/og-image.png (1200x630)');
}

generateIcons().catch(console.error);
