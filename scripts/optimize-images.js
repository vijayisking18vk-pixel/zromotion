import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

async function processImage(relativePath, options = {}) {
  const inputPath = path.join(PUBLIC, relativePath);
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️ Not found: ${relativePath}`);
    return;
  }

  const meta = await sharp(inputPath).metadata();
  const originalSize = fs.statSync(inputPath).size;
  console.log(`\n📸 Processing: ${relativePath}`);
  console.log(`   Dimensions: ${meta.width}x${meta.height}, Size: ${(originalSize / 1024).toFixed(1)} KB`);

  // Target WebP filename
  const parsed = path.parse(relativePath);
  const webpRelativePath = path.join(parsed.dir, `${parsed.name}.webp`);
  const webpOutputPath = path.join(PUBLIC, webpRelativePath);

  let pipeline = sharp(inputPath);
  if (options.width && meta.width > options.width) {
    pipeline = pipeline.resize({ width: options.width, withoutEnlargement: true });
  }

  await pipeline
    .webp({ quality: options.quality || 85, effort: 6 })
    .toFile(webpOutputPath);

  const newSize = fs.statSync(webpOutputPath).size;
  const savings = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
  console.log(`   ✓ WebP: ${webpRelativePath} -> ${(newSize / 1024).toFixed(1)} KB (${savings}% savings)`);
}

async function run() {
  console.log('🚀 Optimizing Key Public Assets to Modern WebP Formats...');
  
  // 1. Chennai Skyline Footer Watermark (Max width on web is 1240px)
  await processImage('images/chennai-skyline-footer.png', { width: 1240, quality: 80 });
  if (fs.existsSync(path.join(PUBLIC, 'chennai-skyline-footer.png'))) {
    await processImage('chennai-skyline-footer.png', { width: 1240, quality: 80 });
  }

  // 2. Chennai Rents Logo (Header logo max display height 42px -> ~120px display width, retina 240px)
  await processImage('chennai-rents-logo-new.jpg', { width: 320, quality: 88 });

  // 3. Footer Icon Transparent (Display height 32px -> ~64px retina)
  await processImage('chennai-rents-icon-transparent.png', { width: 128, quality: 90 });

  // 4. Official Brand Logo
  await processImage('chennai-rents-official-logo.jpg', { width: 600, quality: 85 });
  await processImage('chennai-rents-logo.png', { width: 256, quality: 90 });

  // 5. Author photos
  await processImage('images/authors/vijayrajkumar-r.png', { width: 400, quality: 85 });
  await processImage('images/authors/sm-saai-abishek.jpg', { width: 400, quality: 85 });

  console.log('\n✨ Asset optimization complete!');
}

run().catch(console.error);
