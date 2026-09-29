import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Because we're using "type": "module" in package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the posts data
import { POSTS } from './src/data/posts.js';

const DOMAIN = 'https://chennairents.in';

function generateSitemap() {
  const currentDate = new Date().toISOString();

  // Static routes
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' }
  ];

  // Dynamic routes from posts
  const dynamicRoutes = POSTS.map(post => {
    const prefix = post.type === 'guide' ? 'guide' : 'rent';
    return {
      url: `/${prefix}/${post.slug}`,
      priority: '0.9',
      changefreq: 'weekly'
    };
  });

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${DOMAIN}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write to public directory
  const publicPath = path.resolve(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, sitemapContent, 'utf8');
  console.log(`✅ Sitemap successfully generated at public/sitemap.xml with ${allRoutes.length} URLs!`);
}

generateSitemap();
