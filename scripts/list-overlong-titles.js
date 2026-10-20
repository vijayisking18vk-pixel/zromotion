import fs from 'fs';
import path from 'path';

const lines = fs.readFileSync('seo-url-inventory.csv', 'utf8').split('\n').slice(1);
console.log('List of overlong titles:');
for (const line of lines) {
  if (!line.trim()) continue;
  // Simple CSV split for our known structure
  const parts = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      parts.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  parts.push(current);

  const url = parts[0];
  const title = parts[5];
  const tlen = parseInt(parts[6], 10);
  if (tlen > 60) {
    console.log(`[${tlen}] ${url} => ${title}`);
  }
}
