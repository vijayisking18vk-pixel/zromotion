import fs from 'fs';
import path from 'path';

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist' && f !== 'dist-ssr') {
        scanDir(full);
      }
    } else if (f.endsWith('.js') || f.endsWith('.jsx')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = [...content.matchAll(/canonical:\s*['"](https:\/\/www\.chennairents\.in[^'"]+)['"]/g)];
      for (const m of matches) {
        const url = m[1];
        if (url !== 'https://www.chennairents.in/' && url.endsWith('/')) {
          console.log(`Trailing slash canonical found in ${full}: ${url}`);
        }
      }
    }
  }
}

scanDir('src');
scanDir('scripts');
scanDir('.');
