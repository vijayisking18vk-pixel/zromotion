import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');

const GSC_REPORTED_URLS = [
  // Page with redirect examples (15 affected)
  'https://www.chennairents.in/chennai/perungudi/3bhk-flats-for-rent-in-perungudi/',
  'https://chennairents.in/',
  'https://www.chennairents.in/1-bhk-house-for-rent-in-chennai/',
  'https://www.chennairents.in/flats-for-rent-in-valasaravakkam-chennai',
  'https://www.chennairents.in/stories/gated-vs-standalone/',
  'https://www.chennairents.in/methodology/',
  'https://www.chennairents.in/stories/metro-access-rent-premiums/',
  'https://www.chennairents.in/guides/how-to-negotiate-rent/',
  'https://www.chennairents.in/guides/checklist-rental-advance/',
  'https://www.chennairents.in/chennai/chromepet/',

  // Crawled - currently not indexed examples
  'https://www.chennairents.in/chennai/perungudi/1rk-for-rent-in-perungudi',
  'https://www.chennairents.in/chennai/perungudi/flats-for-rent-under-15000-in-perungudi',
  'https://www.chennairents.in/chennai/t-nagar',

  // Redirect error examples (11 affected)
  'https://www.chennairents.in/house-for-rent-in-chennai/',
  'https://chennairents.in/bachelor-rentals-in-chennai',
  'https://chennairents.in/flats-for-rent-in-adyar-chennai',
  'https://chennairents.in/independent-house-for-rent-in-chennai',
  'https://chennairents.in/house-for-rent-in-chennai-under-10000',
  'https://chennairents.in/1-bhk-house-for-rent-in-chennai',
  'https://chennairents.in/2-bhk-house-for-rent-in-chennai',
  'https://chennairents.in/house-for-rent-in-chennai-without-brokers',
  'https://chennairents.in/author/vijayrajkumar',
  'https://chennairents.in/chennai/rentals',

  // CSV URLs from validation list
  'https://www.chennairents.in/author/vijayrajkumar',
  'https://www.chennairents.in/bachelor-rentals-in-chennai',
  'https://www.chennairents.in/chennai/1-bhk-for-rent',
  'https://www.chennairents.in/chennai/2-bhk-for-rent',
  'https://www.chennairents.in/chennai/3-bhk-for-rent',
  'https://www.chennairents.in/chennai/adyar/1bhk-flats-for-bachelors-in-adyar',
  'https://www.chennairents.in/chennai/adyar/1bhk-flats-for-rent-in-adyar',
  'https://www.chennairents.in/chennai/adyar/1rk-for-rent-in-adyar',
  'https://www.chennairents.in/chennai/adyar/2bhk-flats-for-bachelors-in-adyar',
  'https://www.chennairents.in/chennai/adyar/2bhk-flats-for-family-in-adyar',
  'https://www.chennairents.in/chennai/adyar/2bhk-flats-for-rent-in-adyar',
  'https://www.chennairents.in/chennai/adyar/3bhk-flats-for-family-in-adyar',
  'https://www.chennairents.in/chennai/adyar/3bhk-flats-for-rent-in-adyar',
  'https://www.chennairents.in/chennai/adyar/co-living-in-adyar',
  'https://www.chennairents.in/chennai/adyar/flats-for-bachelors-in-adyar',
  'https://www.chennairents.in/chennai/adyar/flats-for-family-in-adyar',
  'https://www.chennairents.in/chennai/adyar/flats-for-rent-in-adyar',
  'https://www.chennairents.in/chennai/adyar/flats-for-rent-under-10000-in-adyar',
  'https://www.chennairents.in/chennai/adyar/flats-for-rent-under-15000-in-adyar',
  'https://www.chennairents.in/chennai/adyar/flats-for-rent-under-20000-in-adyar',
  'https://www.chennairents.in/chennai/adyar/furnished-flats-for-rent-in-adyar',
  'https://www.chennairents.in/chennai/adyar/independent-houses-for-rent-in-adyar',
  'https://www.chennairents.in/chennai/adyar/pg-for-men-in-adyar',
  'https://www.chennairents.in/chennai/adyar/pg-for-women-in-adyar',
  'https://www.chennairents.in/chennai/perungudi/3bhk-flats-for-rent-in-perungudi',
  'https://www.chennairents.in/chennai/chromepet',
  'https://www.chennairents.in/chennai/velachery/pg-Afor-women-in-velachery'
];

async function checkLiveUrl(url) {
  try {
    const res = await fetch(url, { redirect: 'manual' });
    const status = res.status;
    const location = res.headers.get('location');
    return { status, location };
  } catch (err) {
    return { status: 'ERR', error: err.message };
  }
}

async function runAudit() {
  console.log(`Auditing ${GSC_REPORTED_URLS.length} URLs from user report...\n`);
  
  for (const url of GSC_REPORTED_URLS) {
    const live = await checkLiveUrl(url);
    
    // Check if canonical file exists in dist
    let relPath = url.replace('https://www.chennairents.in/', '').replace('https://chennairents.in/', '');
    if (relPath.endsWith('/')) relPath = relPath.slice(0, -1);
    
    let distPath = path.join(DIST_DIR, relPath, 'index.html');
    if (!relPath) distPath = path.join(DIST_DIR, 'index.html');
    
    const fileExists = fs.existsSync(distPath);
    let canonical = null;
    let robots = null;
    if (fileExists) {
      const html = fs.readFileSync(distPath, 'utf8');
      const canMatch = html.match(/<link\s+rel="canonical"\s+href="(.*?)"/i);
      canonical = canMatch ? canMatch[1] : 'NONE';
      const robMatch = html.match(/<meta\s+name="robots"\s+content="(.*?)"/i);
      robots = robMatch ? robMatch[1] : 'NONE';
    }

    console.log(`URL: ${url}`);
    console.log(`  Live HTTP: ${live.status} ${live.location ? '-> ' + live.location : ''}`);
    console.log(`  Dist file exists: ${fileExists ? 'YES' : 'NO'}`);
    if (fileExists) {
      console.log(`  Dist canonical: ${canonical}`);
      console.log(`  Dist robots: ${robots}`);
    }
    console.log('');
  }
}

runAudit();
