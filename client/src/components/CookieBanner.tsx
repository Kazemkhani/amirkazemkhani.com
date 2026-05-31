import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Minimal cookie banner — required only because the LinkedIn Insight Tag sets
 * a tracking cookie. Plausible is cookieless, so this banner gates ONLY the
 * LinkedIn pixel.
 *
 * Brand rules:
 *   - No modal. No takeover. Sits at the bottom of the viewport.
 *   - Decline persists; "Continue" persists; default is no-pixel until consent.
 *   - GDPR + UAE PDPL compliant by virtue of explicit opt-in.
 *
 * To read consent elsewhere: useConsent() hook below.
 */

const STORAGE_KEY = "amirk_consent_v1";

type Consent = "granted" | "declined";

export function useConsent(): Consent | null {
  const [consent, setConsent] = useState<Consent | null>(() => {
    if (typeof window === "undefined") return null;
    return (window.localStorage.getItem(STORAGE_KEY) as Consent | null) ?? null;
  });
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        setConsent((e.newValue as Consent | null) ?? null);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return consent;
}

/**
 * Fire the LinkedIn Insight Tag iff consent is granted and the partner ID is
 * configured. Called once from main.tsx after consent updates.
 */
export function maybeLoadLinkedInPixel(): void {
  if (typeof window === "undefined") return;
  const partnerId = import.meta.env.VITE_LINKEDIN_PARTNER_ID as
    | string
    | undefined;
  if (!partnerId) return;
  const consent = window.localStorage.getItem(STORAGE_KEY);
  if (consent !== "granted") return;
  if (document.getElementById("li-insight-tag")) return;
  // LinkedIn Insight Tag — standard snippet, minified.
  const w = window as unknown as {
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
  };
  w._linkedin_partner_id = partnerId;
  w._linkedin_data_partner_ids = w._linkedin_data_partner_ids ?? [];
  w._linkedin_data_partner_ids.push(partnerId);
  const s = document.createElement("script");
  s.id = "li-insight-tag";
  s.async = true;
  s.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  document.head.appendChild(s);
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent | null>(() => {
    if (typeof window === "undefined") return null;
    return (window.localStorage.getItem(STORAGE_KEY) as Consent | null) ?? null;
  });

  // If there's no LinkedIn pixel configured, don't show the banner at all —
  // Plausible alone doesn't need consent.
  const hasPixel = Boolean(import.meta.env.VITE_LINKEDIN_PARTNER_ID);
  if (!hasPixel) return null;
  if (consent !== null) return null;

  function persist(value: Consent) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* private-browsing — accept the loss */
    }
    setConsent(value);
    if (value === "granted") maybeLoadLinkedInPixel();
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
        className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50"
      >
        <div className="bg-background/95 backdrop-blur-md border border-border rounded-2xl px-5 py-4 shadow-lg">
          <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed mb-3">
            This site uses a single LinkedIn cookie for ad attribution. Page
            stats are cookieless. Your call.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => persist("granted")}
              className="text-xs sm:text-sm px-4 py-1.5 bg-gold-500 text-background font-semibold rounded-full hover:bg-gold-400 transition-colors"
              data-track="consent_grant"
            >
              Continue
            </button>
            <button
              onClick={() => persist("declined")}
              className="text-xs sm:text-sm px-4 py-1.5 border border-border text-foreground/70 rounded-full hover:text-foreground hover:border-foreground/40 transition-colors"
              data-track="consent_decline"
            >
              Decline
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
