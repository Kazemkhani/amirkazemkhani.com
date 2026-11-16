import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocation } from "wouter";
const navLinks = [
  { href: "/#work", label: "The work" },
  { href: "/#proof", label: "In the world" },
  { href: "/#writing", label: "Field notes" },
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <a href="/" className="site-wordmark" aria-label="Amir Kazemkhani home">
        amir<span>kazemkhani.</span>
        <i />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
        <a className="nav-contact" href="/work-with-me">
          Let’s talk
          <ArrowUpRight size={13} />
        </a>
      </nav>
      <button
        className="mobile-menu-button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {[...navLinks, { href: "/work-with-me", label: "Let’s talk" }].map(
            (l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
                <ArrowUpRight size={16} />
              </a>
            ),
          )}
        </nav>
      )}
    </header>
  );
}
