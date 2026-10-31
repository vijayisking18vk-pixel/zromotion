async function testUrl(url) {
  console.log('\n--- Testing URL:', url);
  let curr = url;
  for (let i = 0; i < 8; i++) {
    try {
      const res = await fetch(curr, { redirect: 'manual' });
      const loc = res.headers.get('location');
      console.log(`Hop ${i + 1}: Status ${res.status} | Location: ${loc || '(none - final body)'}`);
      if (!loc) {
        break;
      }
      curr = new URL(loc, curr).href;
    } catch (e) {
      console.log(`Hop ${i + 1} Error:`, e.message);
      break;
    }
  }
}

async function run() {
  const urls = [
    'https://chennairents.in/',
    'https://chennairents.in/flats-for-rent-in-adyar-chennai',
    'https://chennairents.in/bachelor-rentals-in-chennai',
    'https://www.chennairents.in/flats-for-rent-in-valasaravakkam-chennai',
    'https://www.chennairents.in/chennai/perungudi/3bhk-flats-for-rent-in-perungudi/',
    'https://www.chennairents.in/1-bhk-house-for-rent-in-chennai/',
    'https://www.chennairents.in/stories/gated-vs-standalone/',
    'https://www.chennairents.in/methodology/',
    'https://www.chennairents.in/author/vijayrajkumar',
    'https://chennairents.in/author/vijayrajkumar'
  ];
  for (const u of urls) {
    await testUrl(u);
  }
}

run();
