import fs from 'fs';
import path from 'path';

function walk(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist-ssr') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

const allFiles = walk('.');
console.log(`Scanning ${allFiles.length} files...`);

const nonWwwMatches = [];
const trailingSlashMatches = [];

for (const file of allFiles) {
  if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webp') || file.endsWith('.ico') || file.endsWith('.zip')) continue;
  try {
    const content = fs.readFileSync(file, 'utf8');
    // Check for http:// or https://chennairents.in (without www)
    const m1 = content.match(/https?:\/\/chennairents\.in[^\s"'`<>]*/g);
    if (m1) {
      nonWwwMatches.push({ file, matches: m1 });
    }
    // Check for internal links with trailing slash (except root '/')
    // e.g. href="/chennai/..." or href="https://www.chennairents.in/.../"
    const m2 = content.match(/href="(\/(?:chennai|guides|stories|about|contact|methodology|verification|corrections|privacy|data-deletion|listings|authors)[^"]*\/)"/g);
    if (m2) {
      trailingSlashMatches.push({ file, matches: m2 });
    }
  } catch (e) {
    // ignore binary/read error
  }
}

console.log('\n--- NON-WWW MATCHES ---');
nonWwwMatches.forEach(m => console.log(`${m.file}:`, m.matches));

console.log('\n--- TRAILING SLASH HREF MATCHES ---');
trailingSlashMatches.forEach(m => console.log(`${m.file}:`, m.matches));
