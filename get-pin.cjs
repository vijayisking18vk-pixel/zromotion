const https = require('https');
const fs = require('fs');

const url = 'https://in.pinterest.com/pin/1141310730602191120/';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
  let html = '';
  res.on('data', (chunk) => html += chunk);
  res.on('end', () => {
    const match = html.match(/<meta property="og:image" content="([^"]+)"/i) ||
                  html.match(/<meta name="og:image" content="([^"]+)"/i) ||
                  html.match(/https:\/\/i\.pinimg\.com\/originals\/[a-zA-Z0-9\/._-]+/i) ||
                  html.match(/https:\/\/i\.pinimg\.com\/736x\/[a-zA-Z0-9\/._-]+/i) ||
                  html.match(/https:\/\/i\.pinimg\.com\/[a-zA-Z0-9\/._-]+/i);
    
    if (match) {
      const imgUrl = match[1] || match[0];
      console.log('FOUND IMAGE URL:', imgUrl);
      
      // Download the image
      const file = fs.createWriteStream('public/assets/images/zromotion-logo.png');
      https.get(imgUrl, (imgRes) => {
        imgRes.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('LOGO DOWNLOADED SUCCESSFULLY to public/assets/images/zromotion-logo.png');
        });
      });
    } else {
      console.log('No image match found. HTML snippet:', html.slice(0, 500));
    }
  });
}).on('error', (err) => {
  console.error('Error fetching pin:', err);
});
