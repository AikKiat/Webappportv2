// One-shot image optimizer: converts public/images/*.png to .webp
// (max width 1600, quality 80). Run with: node scripts/optimize_images.mjs
import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const dir = new URL("../public/images", import.meta.url).pathname;

for (const file of readdirSync(dir)) {
  if (!file.endsWith(".png")) continue;
  const src = join(dir, file);
  const dest = src.replace(/\.png$/, ".webp");
  const { width } = await sharp(src).metadata();
  let pipeline = sharp(src);
  if (width > 1600) pipeline = pipeline.resize({ width: 1600 });
  await pipeline.webp({ quality: 80 }).toFile(dest);
  const before = statSync(src).size;
  const after = statSync(dest).size;
  console.log(
    `${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${Math.round((1 - after / before) * 100)}% smaller)`
  );
}
