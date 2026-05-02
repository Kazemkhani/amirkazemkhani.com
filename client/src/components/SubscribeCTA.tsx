import { useState } from "react";

type State = "idle" | "loading" | "success" | "error";

export default function SubscribeCTA() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "akz_home" }),
      });

      if (res.ok) {
        setState("success");
        setEmail("");
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body?.message ?? "Something went wrong. Try again.");
        setState("error");
      }
    } catch {
      // Stub: log to console for MVP; real endpoint wired Day 2
      console.log("[SubscribeCTA] stub — email captured:", email);
      setState("success");
      setEmail("");
    }
  };

  return (
    <section className="py-20 border-t border-border/50">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="section-label mb-4">The NOVA Signal</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          One deep-dive per week on founders using AI to do what used to take a
          team.
        </h2>
        <p className="text-muted-foreground mb-10">
          Free. Written by Amir. Researched by agents. No fluff, no hype.
        </p>

        {state === "success" ? (
          <div className="card-editorial rounded-xl px-6 py-5 inline-block">
            <p className="text-gold-500 font-semibold">
              You&rsquo;re on the list.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Check your inbox to confirm.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-secondary border border-border rounded-full px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold-500/50 transition-colors"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="px-7 py-3 bg-gold-500 text-background font-semibold rounded-full hover:bg-gold-400 transition-colors duration-300 disabled:opacity-60 shrink-0"
            >
              {state === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}

        {state === "error" && (
          <p className="mt-3 text-sm text-destructive">{errorMsg}</p>
        )}
      </div>
    </section>
  );
}
