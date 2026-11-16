import sharp from "sharp";

// Use a verified current hero capture so social artwork cannot drift from its claims.
const capture = process.argv[2];
if (!capture)
  throw new Error("Usage: node scripts/generate-og.mjs <hero-screenshot.png>");
const image = sharp(capture).resize(1200, 630, {
  fit: "contain",
  background: "#f8f7f2",
});
await image.clone().png().toFile("client/public/og-image.png");
await image.clone().jpeg({ quality: 90 }).toFile("client/public/og-image.jpg");
console.log("Generated current hero social images (1200x630)");
