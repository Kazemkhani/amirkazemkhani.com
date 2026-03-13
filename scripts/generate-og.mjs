import sharp from 'sharp';

// OG Image: 1200x630, dark background, gold accents, editorial typography
const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a"/>
      <stop offset="100%" style="stop-color:#111111"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#c9a84c"/>
      <stop offset="40%" style="stop-color:#e7bc66"/>
      <stop offset="60%" style="stop-color:#f0d6a0"/>
      <stop offset="100%" style="stop-color:#c9a84c"/>
    </linearGradient>
    <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:transparent"/>
      <stop offset="20%" style="stop-color:#c9a84c"/>
      <stop offset="80%" style="stop-color:#c9a84c"/>
      <stop offset="100%" style="stop-color:transparent"/>
    </linearGradient>
    <radialGradient id="glow1" cx="20%" cy="30%" r="40%">
      <stop offset="0%" style="stop-color:#c9a84c;stop-opacity:0.06"/>
      <stop offset="100%" style="stop-color:#c9a84c;stop-opacity:0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="85%" cy="75%" r="35%">
      <stop offset="0%" style="stop-color:#c9a84c;stop-opacity:0.04"/>
      <stop offset="100%" style="stop-color:#c9a84c;stop-opacity:0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>

  <!-- Ambient glow orbs -->
  <rect width="${width}" height="${height}" fill="url(#glow1)"/>
  <rect width="${width}" height="${height}" fill="url(#glow2)"/>

  <!-- Subtle grid pattern -->
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>
  </pattern>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>

  <!-- Top border line -->
  <rect x="0" y="0" width="${width}" height="2" fill="url(#goldLine)"/>

  <!-- Section label -->
  <text x="80" y="180" font-family="monospace" font-size="13" letter-spacing="6" fill="#c9a84c" text-transform="uppercase">PORTFOLIO</text>

  <!-- Name -->
  <text x="80" y="260" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="72" fill="#ece4d4">Amir</text>
  <text x="80" y="345" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="72" fill="url(#gold)">Kazemkhani</text>

  <!-- Divider -->
  <rect x="80" y="375" width="80" height="1" fill="url(#goldLine)"/>

  <!-- Tagline -->
  <text x="80" y="415" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="rgba(255,255,255,0.5)">AI Engineer · Serial Founder · Hackathon Champion</text>

  <!-- Stats row -->
  <text x="80" y="480" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="28" fill="#c9a84c">9</text>
  <text x="115" y="480" font-family="monospace" font-size="12" letter-spacing="2" fill="rgba(255,255,255,0.35)">PODIUM FINISHES</text>

  <text x="340" y="480" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="28" fill="#c9a84c">$1M</text>
  <text x="410" y="480" font-family="monospace" font-size="12" letter-spacing="2" fill="rgba(255,255,255,0.35)">RAISED AT 21</text>

  <text x="610" y="480" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="28" fill="#c9a84c">35+</text>
  <text x="675" y="480" font-family="monospace" font-size="12" letter-spacing="2" fill="rgba(255,255,255,0.35)">HACKATHONS</text>

  <!-- URL -->
  <text x="80" y="570" font-family="monospace" font-size="14" letter-spacing="1" fill="rgba(255,255,255,0.25)">amirkazemkhani.com</text>

  <!-- Bottom border line -->
  <rect x="0" y="${height - 2}" width="${width}" height="2" fill="url(#goldLine)"/>

  <!-- Corner accent -->
  <rect x="${width - 100}" y="160" width="1" height="60" fill="rgba(201,168,76,0.2)"/>
  <rect x="${width - 130}" y="190" width="60" height="1" fill="rgba(201,168,76,0.2)"/>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ quality: 95 })
  .toFile('client/public/og-image.png');

await sharp(Buffer.from(svg))
  .jpeg({ quality: 90 })
  .toFile('client/public/og-image.jpg');

console.log('✓ Generated og-image.png and og-image.jpg (1200x630)');
