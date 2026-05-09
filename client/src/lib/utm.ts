/**
 * UTM helper — appends a consistent campaign tag to outbound links.
 *
 * Default campaign: falcons-of-majlis-2026-05
 *
 * Usage:
 *   <a href={withUtm('https://novalabs.ae', 'hero')}>NOVA Labs</a>
 *   <a href={withUtm('https://linkedin.com/in/amirkazemkhani', 'footer')}>LinkedIn</a>
 *
 * Internal anchors / hash links / mailto / tel are returned unchanged.
 */

const CAMPAIGN = "falcons-of-majlis-2026-05";
const SOURCE = "amirkazemkhani.com";

export type UtmMedium =
  | "hero"
  | "pitch_wall"
  | "halo_moments"
  | "tv_ribbon"
  | "footer"
  | "header"
  | "cta"
  | "social_follow";

export function withUtm(
  url: string,
  medium: UtmMedium = "hero",
  campaign: string = CAMPAIGN,
): string {
  if (!url) return url;
  // Skip non-http schemes and pure-fragment anchors
  if (
    url.startsWith("#") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("/")
  ) {
    return url;
  }
  try {
    const u = new URL(url);
    // Don't double-tag if utm_source is already present
    if (u.searchParams.has("utm_source")) return url;
    u.searchParams.set("utm_source", SOURCE);
    u.searchParams.set("utm_medium", medium);
    u.searchParams.set("utm_campaign", campaign);
    return u.toString();
  } catch {
    return url;
  }
}

export const UTM_CAMPAIGN = CAMPAIGN;
