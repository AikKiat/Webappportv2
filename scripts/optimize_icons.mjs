// Shrinks public/icons/*.png in place: icons render at <= 3rem (~48px), so
// 128px wide is plenty. Keeps .png names so no code references change.
// Run with: node scripts/optimize_icons.mjs
import sharp from "sharp";
import { readdirSync, statSync, renameSync } from "fs";
import { join } from "path";

const dir = new URL("../public/icons", import.meta.url).pathname;

for (const file of readdirSync(dir)) {
  if (!file.endsWith(".png")) continue;
  const src = join(dir, file);
  const tmp = src + ".tmp";
  const { width } = await sharp(src).metadata();
  let pipeline = sharp(src);
  if (width > 128) pipeline = pipeline.resize({ width: 128 });
  await pipeline.png({ compressionLevel: 9, palette: true }).toFile(tmp);
  const before = statSync(src).size;
  const after = statSync(tmp).size;
  if (after < before) {
    renameSync(tmp, src);
    console.log(`${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
  } else {
    renameSync(tmp, src + ".skip");
    console.log(`${file}: kept original (${(before / 1024).toFixed(0)}KB)`);
  }
}
