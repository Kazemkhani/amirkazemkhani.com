import { useState, useEffect } from "react";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#proof", label: "Proof" },
  { href: "/#writing", label: "Writing" },
  { href: "/articles", label: "Articles" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/50"
          : "bg-background/60 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            Amir<span className="text-gold-500">K</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/work-with-me"
              className="text-sm font-medium px-5 py-2 border border-gold-500/40 text-gold-500 rounded-full hover:bg-gold-500 hover:text-background transition-colors duration-150"
              data-track="header_work_with_me"
            >
              Work with me
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-px bg-current transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
              />
              <span
                className={`block h-px bg-current transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px bg-current transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu — no entrance animation (keyboard-frequency interaction) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/50">
          <nav className="flex flex-col px-6 py-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/work-with-me"
              className="text-lg text-gold-500 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Work with me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
