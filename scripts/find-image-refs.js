import fs from 'fs';
import path from 'path';

function search(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      if (item !== 'node_modules' && item !== '.git') {
        search(full);
      }
    } else if (item.endsWith('.html') || item.endsWith('.js') || item.endsWith('.jsx')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('chennai-skyline-footer-360w.png')) {
        console.log('skyline in:', full);
      }
      if (content.includes('chennai-rents-icon-transparent-112w.png')) {
        console.log('icon in:', full);
      }
    }
  }
}

search('.');
