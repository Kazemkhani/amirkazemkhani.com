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

// ── Inbound UTM (first-touch attribution) ────────────────────────────────────
/**
 * Capture incoming UTM params on page load and persist as first-touch.
 * Called once in main.tsx. Stored values are read by leads.ts at submit time.
 *
 * Why first-touch (not last-touch): for a 90-day enterprise demo funnel, the
 * post that introduced you matters far more than the click immediately before
 * the booking. First-touch survives until they actually book.
 */
const FIRST_TOUCH_KEY = "amirk_first_touch";

export type FirstTouch = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  landed_at: string;
};

export function captureInboundUtm(): void {
  if (typeof window === "undefined") return;
  // Already captured? Don't overwrite — first-touch is sacred.
  if (window.localStorage.getItem(FIRST_TOUCH_KEY)) return;
  const params = new URLSearchParams(window.location.search);
  const utm_source = params.get("utm_source") ?? undefined;
  const utm_medium = params.get("utm_medium") ?? undefined;
  const utm_campaign = params.get("utm_campaign") ?? undefined;
  const utm_content = params.get("utm_content") ?? undefined;
  // Only persist if there's at least one UTM param.
  if (!utm_source && !utm_medium && !utm_campaign && !utm_content) return;
  const payload: FirstTouch = {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    landed_at: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(payload));
  } catch {
    // Quota / private-browsing — accept the loss.
  }
}

export function readFirstTouch(): FirstTouch | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(FIRST_TOUCH_KEY);
    return raw ? (JSON.parse(raw) as FirstTouch) : null;
  } catch {
    return null;
  }
}
