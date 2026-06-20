import sharp from "sharp";
import { rename, unlink } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, "../public/images");
const source = path.join(imagesDir, "hero.webp");
const temp = path.join(imagesDir, "hero-optimized.webp");

await sharp(source)
  .resize(351, 427, { fit: "cover", position: "top" })
  .webp({ quality: 82 })
  .toFile(temp);

await unlink(source).catch(() => {});
await rename(temp, source);

console.log("hero.webp resized to 351x427");
