import { useEffect, useState } from "react";

interface StatusData {
  agents_online: number;
  prs_open: number;
  builds_running: number;
  last_commit_ts: string;
  last_commit_repo: string;
  last_commit_message: string;
  generated_at: string;
}

const FALLBACK: StatusData = {
  agents_online: 9,
  prs_open: 3,
  builds_running: 2,
  last_commit_ts: "2026-05-02T08:00:00Z",
  last_commit_repo: "NOVA-FYP-PRODUCTION",
  last_commit_message: "feat: agent hierarchy update",
  generated_at: "2026-05-02T09:00:00Z",
};

const STALE_THRESHOLD_MS = 10 * 60 * 1000; // 10 minutes

function minutesAgo(ts: string): number {
  return Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
}

function isStale(generatedAt: string): boolean {
  return Date.now() - new Date(generatedAt).getTime() > STALE_THRESHOLD_MS;
}

export default function LiveStatus() {
  const [status, setStatus] = useState<StatusData>(FALLBACK);
  const [stale, setStale] = useState(false);

  // Production: pull from NOVA's existing CloudFront-fronted S3 bucket.
  // Dev (localhost): use the committed /status.json fallback in the repo.
  const PROD_URL = "https://novalabs.ae/akz-status.json";
  const DEV_URL = "/status.json";

  const isProd = () =>
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    !window.location.hostname.startsWith("127.");

  const fetchStatus = async () => {
    const primary = isProd() ? PROD_URL : DEV_URL;
    try {
      const res = await fetch(primary, { cache: "no-store" });
      if (!res.ok) {
        // Prod fetch failed → fall back to repo-committed /status.json
        if (isProd()) {
          const fb = await fetch(DEV_URL, { cache: "no-store" });
          if (fb.ok) {
            const data: StatusData = await fb.json();
            setStatus(data);
            setStale(isStale(data.generated_at));
          }
        }
        return;
      }
      const data: StatusData = await res.json();
      setStatus(data);
      setStale(isStale(data.generated_at));
    } catch {
      // keep fallback
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30_000);
    return () => clearInterval(interval);
  }, []);

  const commitMins = minutesAgo(status.last_commit_ts);

  return (
    <section id="livestatus" className="py-16 border-t border-border/50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="section-label">Live system status</span>
          {stale ? (
            <span className="text-xs font-mono text-muted-foreground/50 ml-2">
              (agents resting)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 ml-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-subtle" />
              <span className="text-xs font-mono text-green-500/80">live</span>
            </span>
          )}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatPill
            value={String(status.prs_open)}
            label="PRs open"
            highlight={status.prs_open > 0}
          />
          <StatPill
            value={String(status.builds_running)}
            label="builds running"
            highlight={status.builds_running > 0}
          />
          <StatPill
            value={`${commitMins} min ago`}
            label="last commit"
            highlight={commitMins < 60}
          />
          <StatPill
            value={String(status.agents_online)}
            label="agents online"
            highlight={true}
          />
        </div>

        {/* Last commit row */}
        <div className="card-editorial rounded-lg px-5 py-3 flex flex-col sm:flex-row sm:items-center gap-2 text-sm font-mono">
          <span className="text-muted-foreground/50 shrink-0">last commit</span>
          <span className="text-gold-500 shrink-0">
            {status.last_commit_repo}
          </span>
          <span className="text-muted-foreground hidden sm:block">&mdash;</span>
          <span className="text-foreground/80 truncate">
            {status.last_commit_message}
          </span>
          <span className="text-muted-foreground/50 shrink-0 sm:ml-auto">
            {commitMins}m ago
          </span>
        </div>
      </div>
    </section>
  );
}

function StatPill({
  value,
  label,
  highlight,
}: {
  value: string;
  label: string;
  highlight: boolean;
}) {
  return (
    <div className="card-editorial rounded-lg px-4 py-3 text-center">
      <div
        className={`text-2xl font-display font-bold mb-0.5 ${
          highlight ? "text-gold-500" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="text-xs font-mono text-muted-foreground tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}
