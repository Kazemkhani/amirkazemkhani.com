import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { submitNewsletterLead } from "@/lib/leads";
import { trackEvent } from "@/lib/analytics";

/**
 * Editorial-voice newsletter inline form.
 *
 * Brand rules enforced here:
 *   - No modal, no popup, no exit-intent.
 *   - No "sign up to win" — the value prop is the work itself.
 *   - Single-line input → button → success state. Nothing else.
 *   - Failure mode: show error inline, never a toast that auto-dismisses.
 *
 * Wire HubSpot env vars (VITE_HUBSPOT_PORTAL_ID + VITE_HUBSPOT_NEWSLETTER_FORM_ID)
 * before merging this component to production.
 */
export default function NewsletterInline({
  surface = "default",
}: {
  /** Surface tag for Plausible event attribution. */
  surface?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Enter a real email.");
      setState("error");
      return;
    }
    setState("submitting");
    setError(null);
    try {
      await submitNewsletterLead({ email });
      trackEvent("Newsletter Subscribe", { surface });
      setState("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 text-sm text-gold-400"
      >
        <Check className="w-4 h-4" />
        <span>Subscribed. First issue lands the Sunday after next.</span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === "submitting"}
          aria-label="Email address"
          className="flex-1 px-4 py-3 bg-background border border-border rounded-full text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold-500/50 transition-colors disabled:opacity-60"
          data-track={`newsletter_input_${surface}`}
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center gap-2 px-5 py-3 bg-gold-500 text-background font-semibold rounded-full hover:bg-gold-400 transition-colors disabled:opacity-60"
          data-track={`newsletter_submit_${surface}`}
        >
          {state === "submitting" ? "..." : "Subscribe"}
          {state !== "submitting" && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-400/80" role="alert">
          {error}
        </p>
      )}
      <p className="mt-3 text-[11px] text-muted-foreground/70 leading-relaxed">
        The NOVA Signal — voice AI, enterprise CX, what's actually shipping. One
        email every other Sunday. Unsubscribe anytime.
      </p>
    </form>
  );
}
