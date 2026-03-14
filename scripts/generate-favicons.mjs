import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'client', 'public');

// The signature SVG in gold on dark bg
const svgTemplate = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c9a84c" />
      <stop offset="50%" stop-color="#e7bc66" />
      <stop offset="100%" stop-color="#c9a84c" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="#0a0a0a"/>
  <path
    d="M 140 390
       C 100 280, 110 140, 220 90
       C 310 50, 400 80, 380 180
       C 365 260, 260 310, 200 290
       C 160 275, 190 230, 240 250
       C 290 270, 340 320, 410 380"
    fill="none"
    stroke="url(#gold)"
    stroke-width="14"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'logo192.png', size: 192 },
  { name: 'logo512.png', size: 512 },
];

for (const { name, size } of sizes) {
  const svg = Buffer.from(svgTemplate(512));
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(join(publicDir, name));
  console.log(`Generated ${name} (${size}x${size})`);
}

console.log('All favicons generated!');
