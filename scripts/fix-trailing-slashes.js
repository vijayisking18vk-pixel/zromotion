import fs from 'fs';
import path from 'path';

const files = [
  'src/data/chromepetLandingPages.js',
  'src/data/omrLandingPages.js',
  'src/data/perungudiLandingPages.js',
  'src/data/tambaramLandingPages.js',
  'src/data/taramaniLandingPages.js',
  'src/data/thiruvanmiyurLandingPages.js',
  'src/data/thoraipakkamLandingPages.js',
];

for (const relPath of files) {
  const fullPath = path.resolve(relPath);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace canonical: 'https://www.chennairents.in/chennai/.../' with slashless
  const updated = content.replace(/(canonical:\s*['"]https:\/\/www\.chennairents\.in\/chennai\/[^'"]+?)\/(['"])/g, '$1$2');
  
  if (updated !== content) {
    fs.writeFileSync(fullPath, updated, 'utf8');
    console.log(`Updated canonicals in ${relPath}`);
  } else {
    console.log(`No changes needed in ${relPath}`);
  }
}
