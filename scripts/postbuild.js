const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

const outDir = path.resolve(__dirname, '../out');
const publicDir = path.resolve(__dirname, '../public');

if (fs.existsSync(outDir)) {
  copyFolderSync(outDir, publicDir);
  console.log('Successfully copied all out/ static files to public/ for Vercel compatibility.');
}
