import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-semibold text-foreground">
              Amir<span className="text-gold-500">K</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Solo AI engineer &middot; Abu Dhabi
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a
              href="/#livestatus"
              className="hover:text-foreground transition-colors"
            >
              Live Status
            </a>
            <a
              href="/#projects"
              className="hover:text-foreground transition-colors"
            >
              Projects
            </a>
            <a
              href="https://signal.novalabs.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              NOVA Signal
            </a>
            <a
              href="mailto:amir@novalabs.ae"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Social */}
          <div className="flex gap-3">
            <a
              href="https://x.com/amirhkazemkhani"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-gold-500 transition-colors"
              aria-label="X / Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/Kazemkhani"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-gold-500 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/amirhkazemkhani"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-gold-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="editorial-divider-center my-8" />

        <p className="text-center text-xs text-muted-foreground/50">
          &copy; 2026 Amir Hossein Kazemkhani. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
