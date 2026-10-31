import fs from 'fs';
import path from 'path';

function scan(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) files = files.concat(scan(full));
    else if (f.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const htmlFiles = scan('public');
console.log('Total public html files:', htmlFiles.length);
const noindex = [];
for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  if (/noindex/i.test(content)) {
    const match = content.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
    noindex.push({ file: f, robots: match ? match[1] : 'found noindex' });
  }
}
console.log('Pages with noindex in public:', noindex.length);
noindex.forEach(n => console.log(n.file, '=>', n.robots));
