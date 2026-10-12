import fs from 'fs';
import path from 'path';

function checkDir(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (entry !== 'node_modules' && entry !== '.git' && entry !== 'dist-ssr' && entry !== 'dist') {
        checkDir(full);
      }
    } else if (entry.endsWith('.html') || entry.endsWith('.jsx') || entry.endsWith('.js') || entry.endsWith('.xml') || entry.endsWith('.json')) {
      if (full.includes('test-gsc-urls.js') || full.includes('check-trailing-slash-links.js') || full.includes('audit-inbound-links.js')) continue;
      const content = fs.readFileSync(full, 'utf8');
      
      // Match URLs that actually END with a trailing slash (excluding root 'https://www.chennairents.in/')
      // e.g. https://www.chennairents.in/chennai/adyar/
      const matchesTrailing = [...content.matchAll(/["'](https:\/\/www\.chennairents\.in\/[a-zA-Z0-9_\-\/]+?\/)["']/g)];
      for (const m of matchesTrailing) {
        const u = m[1];
        if (u !== 'https://www.chennairents.in/') {
          console.log(`${path.relative('.', full)} has URL ending with trailing slash: ${u}`);
        }
      }

      // Check relative links ending with trailing slash
      // e.g. href="/chennai/adyar/"
      const matchesRelTrailing = [...content.matchAll(/(?:href|to)=["'](\/[a-zA-Z0-9_\-\/]+?\/)["']/g)];
      for (const m of matchesRelTrailing) {
        const u = m[1];
        if (u !== '/' && !u.startsWith('//') && !u.startsWith('/assets/') && !u.startsWith('/images/')) {
          console.log(`${path.relative('.', full)} has relative link ending with trailing slash: ${u}`);
        }
      }

      // Check for non-www chennairents.in
      const matchesNonWww = [...content.matchAll(/["'](https:\/\/chennairents\.in[a-zA-Z0-9_\-\/]*)["']/g)];
      for (const m of matchesNonWww) {
        const u = m[1];
        console.log(`${path.relative('.', full)} has non-www URL: ${u}`);
      }
    }
  }
}

console.log('--- Checking for URLs ending with trailing slash or non-www ---');
checkDir('.');
console.log('--- Check complete ---');
