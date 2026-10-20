import fs from 'fs';
import path from 'path';

// Let's read prerender.js routes by extracting or inspecting the generated dist files
const distDir = './dist';

function scanHtmlFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(scanHtmlFiles(fullPath));
    } else if (file === 'index.html') {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = scanHtmlFiles(distDir);
console.log('Total index.html files:', htmlFiles.length);

let overlong = [];
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) {
    const title = titleMatch[1];
    // Unescape &amp; etc for character length check if needed, or check raw string length
    const rawLen = title.length;
    // In search engines, Google measures pixel width or character count of rendered string
    const decoded = title.replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    if (decoded.length > 60) {
      overlong.push({ file, title, len: decoded.length });
    }
  }
}

console.log('Overlong titles in dist (decoded > 60):', overlong.length);
overlong.forEach((o, i) => {
  console.log(`${i+1}. [${o.len}] ${o.file}: "${o.title}"`);
});
