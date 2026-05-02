const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-[orbDrift1_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gold-500/3 rounded-full blur-3xl animate-[orbDrift2_12s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 lg:pt-0">
        {/* Eyebrow */}
        <p className="section-label mb-8 animate-cinematic-fade">
          Abu Dhabi&nbsp;&middot;&nbsp;Solo AI engineer&nbsp;&middot;&nbsp;9
          agents online
        </p>

        {/* Headline */}
        <h1 className="font-display text-hero font-bold text-foreground mb-6 animate-cinematic-rise leading-tight">
          I let nine Claude agents run my company while I sleep.
        </h1>

        {/* Subhead */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-[fadeIn_0.7s_0.4s_both]">
          I&rsquo;m Amir. I&rsquo;m 22. I ship software for clients in retail,
          gold trading, and SaaS &mdash; most of it written by an agent
          hierarchy I designed on a Mac mini in my apartment.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-[fadeIn_0.7s_0.6s_both]">
          <a
            href="https://signal.novalabs.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gold-500 text-background font-semibold rounded-full hover:bg-gold-400 transition-colors duration-300"
          >
            Read The NOVA Signal &rarr;
          </a>
          <a
            href="/#livestatus"
            className="inline-block px-8 py-3 border border-border text-foreground font-semibold rounded-full hover:border-gold-500/50 hover:text-gold-500 transition-all duration-300"
          >
            See what&rsquo;s running right now &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
