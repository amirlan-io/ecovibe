import sharp from "sharp";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, "../public/images");

const TARGETS = [
  { file: "before-bathroom.webp", width: 512, height: 320 },
  { file: "after-bathroom.webp", width: 512, height: 320 },
];

for (const { file, width, height } of TARGETS) {
  const source = path.join(imagesDir, file);

  const output = await sharp(source)
    .resize(width, height, { fit: "cover", position: "center" })
    .webp({ quality: 80 })
    .toBuffer();

  await writeFile(source, output);
  console.log(`${file} resized to ${width}x${height} (${output.length} bytes)`);
}
