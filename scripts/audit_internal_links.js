const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) getFiles(full, files);
    else if (f.endsWith('.html')) files.push(full);
  }
  return files;
}

const htmlFiles = getFiles('.next/server/app');
const existingRoutes = new Set();
htmlFiles.forEach((f) => {
  let rel = path.relative('.next/server/app', f).replace(/\\/g, '/').replace('.html', '');
  if (rel.endsWith('/index')) rel = rel.replace('/index', '');
  if (rel === 'index') rel = '';
  existingRoutes.add('/' + rel);
});

console.log('Total routes found in build:', existingRoutes.size);

const deadLinks = [];
htmlFiles.forEach((f) => {
  const content = fs.readFileSync(f, 'utf-8');
  const matches = content.matchAll(/href=["'](\/[a-zA-Z0-9_\-\/]+)["']/g);
  for (const match of matches) {
    let target = match[1].split('?')[0].split('#')[0];
    if (target.endsWith('/') && target.length > 1) target = target.slice(0, -1);

    // Ignore api and static files
    if (target.startsWith('/api/') || target.startsWith('/_next') || target.includes('.')) continue;

    if (!existingRoutes.has(target)) {
      deadLinks.push({ from: path.relative('.next/server/app', f).replace(/\\/g, '/'), target });
    }
  }
});

console.log('Dead internal links count:', deadLinks.length);
if (deadLinks.length > 0) {
  const seen = new Set();
  const uniqueDead = deadLinks.filter((d) => {
    const key = d.from + ' -> ' + d.target;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  console.log('Unique Dead internal links:');
  uniqueDead.forEach(u => console.log(`  ${u.from} -> ${u.target}`));
}
