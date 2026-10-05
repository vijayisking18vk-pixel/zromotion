import sharp from 'sharp';

async function check() {
  const skyline = await sharp('public/images/chennai-skyline-footer-360w.png').metadata();
  console.log('chennai-skyline-footer-360w.png metadata:', skyline.width, skyline.height, skyline.format);

  const icon = await sharp('public/chennai-rents-icon-transparent-112w.png').metadata();
  console.log('chennai-rents-icon-transparent-112w.png metadata:', icon.width, icon.height, icon.format);
}

check().catch(console.error);
