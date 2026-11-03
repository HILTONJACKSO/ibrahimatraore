import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'public', 'images');

const UPLOADED = {
  standingGreenWall:
    'C:/Users/User/.gemini/antigravity/brain/04f98abb-012c-48e0-835a-4991d03354b8/.user_uploaded/media_1793715206914_233922dc.jpg',
  seatedDesk:
    'C:/Users/User/.gemini/antigravity/brain/04f98abb-012c-48e0-835a-4991d03354b8/.user_uploaded/media_1793715206959_4852a718.jpg',
  standingBrownSuit:
    'C:/Users/User/.gemini/antigravity/brain/04f98abb-012c-48e0-835a-4991d03354b8/.user_uploaded/media_1793715206941_e7cd335d.jpg',
};

const GENERATED_CONTEXT = [
  {
    src: 'C:/Users/User/.gemini/antigravity/brain/04f98abb-012c-48e0-835a-4991d03354b8/sport_world_africa_stadium_png_1793716129193.jpg',
    destBase: 'context-sport-world-africa',
  },
  {
    src: 'C:/Users/User/.gemini/antigravity/brain/04f98abb-012c-48e0-835a-4991d03354b8/kouankan_investment_boardroom_png_1793716152651.jpg',
    destBase: 'context-kouankan-boardroom',
  },
  {
    src: 'C:/Users/User/.gemini/antigravity/brain/04f98abb-012c-48e0-835a-4991d03354b8/spain_europe_corridor_png_1793716171234.jpg',
    destBase: 'context-spain-corridor',
  },
  {
    src: 'C:/Users/User/.gemini/antigravity/brain/04f98abb-012c-48e0-835a-4991d03354b8/partnerships_executive_lounge_png_1793716191562.jpg',
    destBase: 'context-partnerships-lounge',
  },
];

async function main() {
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  const metaStanding = await sharp(UPLOADED.standingGreenWall).metadata();
  const metaSeated = await sharp(UPLOADED.seatedDesk).metadata();

  // 1. Seated Desk Portrait (Hero & Executive Desk)
  await sharp(UPLOADED.seatedDesk)
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(IMAGES_DIR, 'ibrahima-traore-desk.jpg'));
  await sharp(UPLOADED.seatedDesk)
    .webp({ quality: 86 })
    .toFile(path.join(IMAGES_DIR, 'ibrahima-traore-desk.webp'));

  if (metaSeated.width && metaSeated.height) {
    const cropHeight = metaSeated.height;
    const cropWidth = Math.round(cropHeight * (4 / 4.2));
    const left = Math.min(
      metaSeated.width - cropWidth,
      Math.max(0, Math.round(metaSeated.width * 0.6 - cropWidth / 2))
    );
    await sharp(UPLOADED.seatedDesk)
      .extract({ left, top: 0, width: cropWidth, height: cropHeight })
      .resize(800, 840)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(IMAGES_DIR, 'ibrahima-traore-desk-portrait.jpg'));
    await sharp(UPLOADED.seatedDesk)
      .extract({ left, top: 0, width: cropWidth, height: cropHeight })
      .resize(800, 840)
      .webp({ quality: 86 })
      .toFile(path.join(IMAGES_DIR, 'ibrahima-traore-desk-portrait.webp'));
  }

  // 2. Standing Green Wall Portrait
  await sharp(UPLOADED.standingGreenWall)
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(IMAGES_DIR, 'ibrahima-traore-office.jpg'));
  await sharp(UPLOADED.standingGreenWall)
    .webp({ quality: 86 })
    .toFile(path.join(IMAGES_DIR, 'ibrahima-traore-office.webp'));

  if (metaStanding.width && metaStanding.height) {
    const cropHeight = metaStanding.height;
    const cropWidth = Math.round(cropHeight * (4 / 4.5));
    const left = Math.max(0, metaStanding.width - cropWidth - Math.round(metaStanding.width * 0.04));
    await sharp(UPLOADED.standingGreenWall)
      .extract({ left, top: 0, width: cropWidth, height: cropHeight })
      .resize(800, 900)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(IMAGES_DIR, 'ibrahima-traore-office-portrait.jpg'));
    await sharp(UPLOADED.standingGreenWall)
      .extract({ left, top: 0, width: cropWidth, height: cropHeight })
      .resize(800, 900)
      .webp({ quality: 86 })
      .toFile(path.join(IMAGES_DIR, 'ibrahima-traore-office-portrait.webp'));
  }

  // 3. Standing Brown Suit Portrait
  await sharp(UPLOADED.standingBrownSuit)
    .resize(880, 1100, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(IMAGES_DIR, 'ibrahima-traore-leadership.jpg'));
  await sharp(UPLOADED.standingBrownSuit)
    .resize(880, 1100, { fit: 'cover', position: 'top' })
    .webp({ quality: 86 })
    .toFile(path.join(IMAGES_DIR, 'ibrahima-traore-leadership.webp'));

  // 4. Process & Optimize the 4 Contextual Editorial Images
  for (const item of GENERATED_CONTEXT) {
    await sharp(item.src)
      .resize(1280, 800, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(path.join(IMAGES_DIR, `${item.destBase}.jpg`));
    await sharp(item.src)
      .resize(1280, 800, { fit: 'cover', position: 'center' })
      .webp({ quality: 84 })
      .toFile(path.join(IMAGES_DIR, `${item.destBase}.webp`));
    console.log(`✓ Optimized ${item.destBase}.jpg & .webp`);
  }

  console.log('✓ All 7 photographs (3 portraits + 4 contextual images) processed in public/images/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
