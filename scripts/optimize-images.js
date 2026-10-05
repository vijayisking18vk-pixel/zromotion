import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

async function generateVariants(relativePath, widths, format = 'webp', quality = 85) {
  const inputPath = path.join(PUBLIC, relativePath);
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️ Not found: ${relativePath}`);
    return;
  }

  const parsed = path.parse(relativePath);
  const meta = await sharp(inputPath).metadata();

  for (const w of widths) {
    if (w > meta.width * 1.5) continue; // don't upscale too much
    const suffix = `-${w}w`;
    const outName = `${parsed.name}${suffix}.${format}`;
    const outRelativePath = path.join(parsed.dir, outName);
    const outPath = path.join(PUBLIC, outRelativePath);

    let pipeline = sharp(inputPath).resize({ width: w, withoutEnlargement: true });
    if (format === 'webp') {
      await pipeline.webp({ quality, effort: 6 }).toFile(outPath);
    } else if (format === 'jpg' || format === 'jpeg') {
      await pipeline.jpeg({ quality, mozjpeg: true }).toFile(outPath);
    } else if (format === 'png') {
      await pipeline.png({ compressionLevel: 9 }).toFile(outPath);
    }
    const sz = fs.statSync(outPath).size;
    console.log(`   ✓ [${format.toUpperCase()}] ${outRelativePath} (${w}px) -> ${(sz / 1024).toFixed(1)} KB`);
  }
}

async function processImage(relativePath, options = {}) {
  const inputPath = path.join(PUBLIC, relativePath);
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️ Not found: ${relativePath}`);
    return;
  }

  const meta = await sharp(inputPath).metadata();
  const originalSize = fs.statSync(inputPath).size;

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
  console.log(`   ✓ WebP Base: ${webpRelativePath} -> ${(newSize / 1024).toFixed(1)} KB (${savings}% savings)`);
}

async function run() {
  console.log('🚀 Generating Responsive Multi-Resolution Assets (WebP & Legacy)...');

  // 1. Chennai Skyline Footer Watermark (Mobile 360w, 480w, Tablet 768w, Desktop 1024w)
  console.log('\n📸 1. Skyline Watermark');
  await processImage('images/chennai-skyline-footer.png', { width: 1024, quality: 80 });
  await generateVariants('images/chennai-skyline-footer.png', [360, 480, 768, 1024], 'webp', 80);
  await generateVariants('images/chennai-skyline-footer.png', [360, 480, 768], 'png');

  if (fs.existsSync(path.join(PUBLIC, 'chennai-skyline-footer.png'))) {
    await processImage('chennai-skyline-footer.png', { width: 1024, quality: 80 });
    await generateVariants('chennai-skyline-footer.png', [360, 480, 768, 1024], 'webp', 80);
    await generateVariants('chennai-skyline-footer.png', [360, 480, 768], 'png');
  }

  // 2. Chennai Rents Logo (1x 42w, 2x 84w, 3x 126w)
  console.log('\n📸 2. Header Logo');
  await processImage('chennai-rents-logo-new.jpg', { width: 320, quality: 88 });
  await generateVariants('chennai-rents-logo-new.jpg', [42, 84, 126], 'webp', 88);
  await generateVariants('chennai-rents-logo-new.jpg', [42, 84, 126], 'jpg', 88);

  // 3. Footer Icon Transparent (1x 112w, 2x 224w)
  console.log('\n📸 3. Footer Icon');
  await processImage('chennai-rents-icon-transparent.png', { width: 128, quality: 90 });
  await generateVariants('chennai-rents-icon-transparent.png', [112, 224], 'webp', 90);
  await generateVariants('chennai-rents-icon-transparent.png', [112, 224], 'png');

  // 4. Official Brand Logo
  console.log('\n📸 4. Official Logos');
  await processImage('chennai-rents-official-logo.jpg', { width: 600, quality: 85 });
  await processImage('chennai-rents-logo.png', { width: 256, quality: 90 });

  // 5. Author photos
  console.log('\n📸 5. Author Photos');
  await processImage('images/authors/vijayrajkumar-r.png', { width: 400, quality: 85 });
  await generateVariants('images/authors/vijayrajkumar-r.png', [120, 240, 400], 'webp', 85);
  await processImage('images/authors/sm-saai-abishek.jpg', { width: 400, quality: 85 });
  await generateVariants('images/authors/sm-saai-abishek.jpg', [120, 240, 400], 'webp', 85);

  console.log('\n✨ All responsive multi-resolution assets generated successfully!');
}

run().catch(console.error);
