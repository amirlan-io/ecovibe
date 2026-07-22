import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, "../public/images");
const reviewsDir = path.join(imagesDir, "reviews");

// Before/after: fixed 512x320 cover-crop, displayed as small as 320x200 on
// mobile — add a proportionally-sized "sm" variant for that breakpoint.
const COVER_TARGETS = [
  { file: "before-bathroom-512.webp", smFile: "before-bathroom-340.webp", width: 340, height: 213 },
  { file: "after-bathroom-512.webp", smFile: "after-bathroom-340.webp", width: 340, height: 213 },
];

for (const { file, smFile, width, height } of COVER_TARGETS) {
  const source = path.join(imagesDir, file);
  const dest = path.join(imagesDir, smFile);
  const output = await sharp(source)
    .resize(width, height, { fit: "cover", position: "center" })
    .webp({ quality: 80 })
    .toBuffer();
  await sharp(output).toFile(dest);
  console.log(`${smFile}: ${width}x${height} (${output.length} bytes)`);
}

// Reviews: object-contain (full screenshot, no cropping), each a different
// aspect ratio — proportional resize to a target width only.
const CONTAIN_TARGETS = [1, 2, 3, 4].map((n) => `review-${n}.webp`);

for (const file of CONTAIN_TARGETS) {
  const source = path.join(reviewsDir, file);
  const smFile = file.replace(".webp", "-340.webp");
  const dest = path.join(reviewsDir, smFile);
  const output = await sharp(source)
    .resize({ width: 340 })
    .webp({ quality: 82 })
    .toBuffer();
  await sharp(output).toFile(dest);
  const meta = await sharp(output).metadata();
  console.log(`${smFile}: ${meta.width}x${meta.height} (${output.length} bytes)`);
}
