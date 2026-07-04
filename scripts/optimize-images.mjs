#!/usr/bin/env node
/**
 * optimize-images.mjs — emit AVIF + WebP at 2 widths for every credibility
 * photo and the profile portrait, using the existing sharp devDependency.
 *
 *   node scripts/optimize-images.mjs
 *
 * Output sits next to the source:  photo.jpg → photo-640.avif, photo-640.webp,
 * photo-1120.avif, photo-1120.webp  (widths are capped at the source width —
 * never upscaled; when the source is narrower than a target, the source width
 * is used and named accordingly).
 *
 * Components consume these via <picture> + srcset with explicit
 * width/height. Originals are kept as the <img> fallback and og:image.
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const WIDTHS = [640, 1120];
const SOURCES = [
  ...(await readdir(path.join(root, "client/public/credibility")))
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .map((f) => path.join(root, "client/public/credibility", f)),
  path.join(root, "client/public/assets/images/amir-profile.jpeg"),
];

for (const src of SOURCES) {
  const { width: srcWidth } = await sharp(src).metadata();
  const base = src.replace(/\.(jpe?g|png)$/i, "");
  // Cap at source width, dedupe (a 729px source yields 640 + 729)
  const widths = [...new Set(WIDTHS.map((w) => Math.min(w, srcWidth)))];

  for (const width of widths) {
    const resized = sharp(src).resize({ width, withoutEnlargement: true });
    const [avif, webp] = await Promise.all([
      resized.clone().avif({ quality: 55 }).toFile(`${base}-${width}.avif`),
      resized.clone().webp({ quality: 78 }).toFile(`${base}-${width}.webp`),
    ]);
    console.log(
      `${path.basename(base)} @${width}w  avif ${(avif.size / 1024).toFixed(0)}KB · webp ${(webp.size / 1024).toFixed(0)}KB`,
    );
  }
}
console.log("done.");
