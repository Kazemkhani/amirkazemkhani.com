import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * TVBadgeRibbon — slim, persistent, dismissable ribbon at the very top of the page.
 *
 * - Auto-decays 7 days after the broadcast date (no need to remove manually).
 * - Dismissal stored in localStorage under TV_RIBBON_DISMISSED.
 * - Editorial: gold star + small-caps mono, dark surface with bottom hairline.
 * - Sits ABOVE the fixed Header (z-50), so we use z-[60] and add top padding to body via the Header offset (Header is `top-0` fixed; we render this above and let it push into view; visually it stacks at top).
 *
 * NOTE: Captions are NEUTRAL — no "endorsed by".
 */

const STORAGE_KEY = "tv-ribbon-dismissed-falcons-2026-05";
// Broadcast date — adjust as needed. Ribbon hides automatically 7 days after this.
const BROADCAST_DATE = new Date("2026-05-09T00:00:00Z");
const DECAY_MS = 7 * 24 * 60 * 60 * 1000;

const TVBadgeRibbon = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide if past decay window
    const now = Date.now();
    if (now - BROADCAST_DATE.getTime() > DECAY_MS) return;

    // Hide if already dismissed
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // no localStorage (SSR / sandbox) — show by default
    }
    setVisible(true);
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur-md border-b border-gold-500/20 overflow-hidden"
          data-track="tv_ribbon_view"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-3">
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold-500 text-center leading-tight">
              <span className="mr-1">★</span>
              <span className="hidden sm:inline">As featured on </span>
              <span className="sm:hidden">On </span>
              <span className="text-foreground/90">Falcons of Majlis</span>
              <span className="text-muted-foreground">
                {" "}
                &middot; India Today &times; Aaj Tak
              </span>
            </p>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={dismiss}
              data-track="tv_ribbon_dismiss"
              className="absolute right-3 sm:right-6 p-1 text-muted-foreground hover:text-gold-500 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TVBadgeRibbon;
