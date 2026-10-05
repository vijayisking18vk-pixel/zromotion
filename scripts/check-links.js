import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('src/data').filter(f => f.endsWith('LandingPages.js'));
for (const f of files) {
  const content = fs.readFileSync(path.join('src/data', f), 'utf8');
  const links = [...content.matchAll(/href:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const trailing = links.filter(l => l.startsWith('/chennai/') && l.endsWith('/'));
  if (trailing.length > 0) {
    console.log(`${f} has ${trailing.length} internal links with trailing slashes! Sample: ${trailing[0]}`);
  }
}
