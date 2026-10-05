import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('src/data').filter(f => f.endsWith('LandingPages.js'));
for (const f of files) {
  const content = fs.readFileSync(path.join('src/data', f), 'utf8');
  const slugMatch = content.match(/slug:\s*['"]([^'"]+)['"]/);
  const canMatch = content.match(/canonical:\s*['"]([^'"]+)['"]/);
  console.log(`${f.padEnd(30)} slug: ${(slugMatch ? slugMatch[1] : '').padEnd(35)} can: ${canMatch ? canMatch[1] : ''}`);
}
