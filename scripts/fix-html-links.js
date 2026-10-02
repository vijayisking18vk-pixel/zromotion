import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LISTINGS_DIR = path.resolve(__dirname, '../public/listings');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      // 1. Replace internal .html links with clean extensionless paths
      content = content.replace(/href=["']\/contact\.html["']/g, 'href="/contact/"');
      content = content.replace(/href=["']\/privacy\.html["']/g, 'href="/privacy/"');
      content = content.replace(/href=["']\/neighbourhood\/([a-z0-9-]+)\.html["']/g, 'href="/chennai/$1/"');
      content = content.replace(/href=["']\/guides\/([a-z0-9-]+)\.html["']/g, 'href="/guides/$1/"');
      content = content.replace(/href=["']\/stories\/([a-z0-9-]+)\.html["']/g, 'href="/stories/$1/"');

      // 2. Window location redirects in JS
      content = content.replace(/window\.location\.href\s*=\s*['"]contact\.html['"]/g, "window.location.href='/contact/'");
      content = content.replace(/window\.location\.href\s*=\s*['"]privacy\.html['"]/g, "window.location.href='/privacy/'");

      // 3. Update canonicals inside static HTML
      content = content.replace(/href=["']https?:\/\/(?:www\.)?chennairents\.in\/contact\.html["']/g, 'href="https://www.chennairents.in/contact/"');
      content = content.replace(/href=["']https?:\/\/(?:www\.)?chennairents\.in\/privacy\.html["']/g, 'href="https://www.chennairents.in/privacy/"');
      content = content.replace(/href=["']https?:\/\/(?:www\.)?chennairents\.in\/neighbourhood\/([a-z0-9-]+)\.html["']/g, 'href="https://www.chennairents.in/chennai/$1/"');
      content = content.replace(/href=["']https?:\/\/(?:www\.)?chennairents\.in\/guides\/([a-z0-9-]+)\.html["']/g, 'href="https://www.chennairents.in/guides/$1/"');
      content = content.replace(/href=["']https?:\/\/(?:www\.)?chennairents\.in\/stories\/([a-z0-9-]+)\.html["']/g, 'href="https://www.chennairents.in/stories/$1/"');

      // 4. Update og:url
      content = content.replace(/content=["']https?:\/\/(?:www\.)?chennairents\.in\/contact\.html["']/g, 'content="https://www.chennairents.in/contact/"');
      content = content.replace(/content=["']https?:\/\/(?:www\.)?chennairents\.in\/privacy\.html["']/g, 'content="https://www.chennairents.in/privacy/"');
      content = content.replace(/content=["']https?:\/\/(?:www\.)?chennairents\.in\/neighbourhood\/([a-z0-9-]+)\.html["']/g, 'content="https://www.chennairents.in/chennai/$1/"');
      content = content.replace(/content=["']https?:\/\/(?:www\.)?chennairents\.in\/guides\/([a-z0-9-]+)\.html["']/g, 'content="https://www.chennairents.in/guides/$1/"');
      content = content.replace(/content=["']https?:\/\/(?:www\.)?chennairents\.in\/stories\/([a-z0-9-]+)\.html["']/g, 'content="https://www.chennairents.in/stories/$1/"');

      // 5. Ensure non-www is normalized to www on canonical/og
      content = content.replace(/https:\/\/chennairents\.in\//g, 'https://www.chennairents.in/');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✓ Cleaned links in ${path.relative(LISTINGS_DIR, fullPath)}`);
      }
    }
  }
}

console.log('🔄 Cleaning .html extensions and normalizing links across public/listings...');
processDirectory(LISTINGS_DIR);
console.log('✅ Finished link normalization.');
