const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (file.endsWith('.html')) {
      files.push(name);
    }
  }
  return files;
}

const htmlFiles = getFiles('.next/server/app');
console.log('Total HTML files found:', htmlFiles.length);

let missingTitle = 0;
let missingH1 = 0;
let missingViewport = 0;
let missingCanonical = 0;
let imagesWithoutAlt = 0;
let thinPages = 0;
const problematicPages = [];

htmlFiles.forEach((file) => {
  const rel = path.relative('.next/server/app', file).replace(/\\/g, '/');
  // Skip internal next files and 404
  if (rel === '_not-found.html' || rel.startsWith('_not-found')) return;

  const content = fs.readFileSync(file, 'utf-8');

  // Check Title
  const hasTitle = /<title>[^<]+<\/title>/.test(content);
  if (!hasTitle) {
    missingTitle++;
    problematicPages.push({ file: rel, issue: 'Missing Title' });
  }

  // Check H1
  const hasH1 = /<h1[^>]*>/.test(content);
  if (!hasH1) {
    missingH1++;
    problematicPages.push({ file: rel, issue: 'Missing H1' });
  }

  // Check Viewport
  const hasViewport = /<meta[^>]*name=["']viewport["']/.test(content);
  if (!hasViewport) {
    missingViewport++;
    problematicPages.push({ file: rel, issue: 'Missing Viewport' });
  }

  // Check Canonical
  const hasCanonical = /<link[^>]*rel=["']canonical["']/.test(content);
  if (!hasCanonical) {
    missingCanonical++;
  }

  // Check Images without alt
  const imgMatches = content.match(/<img[^>]*>/g) || [];
  imgMatches.forEach((img) => {
    if (!/alt=["'][^"']*["']/.test(img)) {
      imagesWithoutAlt++;
      problematicPages.push({ file: rel, issue: 'Image missing alt: ' + img.slice(0, 50) });
    }
  });

  // Estimate word count of visible text
  const text = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const wordCount = text.split(/\s+/).length;
  if (wordCount < 250) {
    thinPages++;
    problematicPages.push({ file: rel, issue: `Thin content (${wordCount} words)` });
  }
});

console.log('--- AUDIT RESULTS ---');
console.log('Missing Title:', missingTitle);
console.log('Missing H1:', missingH1);
console.log('Missing Viewport:', missingViewport);
console.log('Missing Canonical:', missingCanonical);
console.log('Images Missing Alt:', imagesWithoutAlt);
console.log('Thin Pages (<250 words):', thinPages);
console.log('Problematic pages count:', problematicPages.length);

if (problematicPages.length > 0) {
  console.log('Sample Problematic Pages:', JSON.stringify(problematicPages.slice(0, 15), null, 2));
}
