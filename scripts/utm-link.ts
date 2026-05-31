#!/usr/bin/env tsx
/**
 * UTM link builder — strict 4-param scheme for every outbound post.
 *
 * Usage:
 *   npx tsx scripts/utm-link.ts \
 *     --path /work-with-me \
 *     --source linkedin \
 *     --medium post \
 *     --campaign demo-bookings-2026Q3 \
 *     --content carousel-voice-ai-cx-2026-05-31
 *
 * Emits the full URL to stdout — paste into Postiz, LinkedIn, X, IG bio, etc.
 *
 * Scheme (canonical — DO NOT improvise):
 *   utm_source   = linkedin | x | instagram | youtube | newsletter | gmail-sig | podcast-{slug}
 *   utm_medium   = post | dm | bio | story | reel | newsletter-cta | signature | guest-mention
 *   utm_campaign = demo-bookings-2026Q3 | newsletter-growth-2026Q3 | hire-2026Q3
 *   utm_content  = carousel-{slug} | post-{slug} | article-{slug} | episode-{slug}
 *
 * First-touch attribution is captured by client/src/lib/utm.ts on landing and
 * passed to HubSpot when the visitor submits the discovery form.
 */

const BASE = "https://amirkazemkhani.com";

const args: Record<string, string> = {};
for (let i = 2; i < process.argv.length; i += 2) {
  const flag = process.argv[i];
  const value = process.argv[i + 1];
  if (!flag?.startsWith("--") || !value) continue;
  args[flag.slice(2)] = value;
}

const required = ["path", "source", "medium", "campaign"] as const;
for (const key of required) {
  if (!args[key]) {
    console.error(`Missing --${key}.`);
    console.error(
      "Required: --path --source --medium --campaign. Optional: --content",
    );
    process.exit(1);
  }
}

const url = new URL(args.path!, BASE);
url.searchParams.set("utm_source", args.source!);
url.searchParams.set("utm_medium", args.medium!);
url.searchParams.set("utm_campaign", args.campaign!);
if (args.content) url.searchParams.set("utm_content", args.content);

console.log(url.toString());
