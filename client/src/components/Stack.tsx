const STACK = [
  "Claude",
  "Next.js",
  "Postgres",
  "Tailscale",
  "Vercel",
  "AWS",
  "Postiz",
];

export default function Stack() {
  return (
    <section className="py-12 border-t border-border/50">
      <div className="max-w-4xl mx-auto px-6">
        <p className="section-label text-center mb-8">
          Stack in production today
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {STACK.map((name) => (
            <span
              key={name}
              className="font-mono text-sm text-muted-foreground/60 hover:text-foreground transition-colors duration-200"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
