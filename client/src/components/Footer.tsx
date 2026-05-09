import { Github, Linkedin } from "lucide-react";
import { withUtm } from "../lib/utm";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-semibold text-foreground">
              Amir<span className="text-gold-500">K</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Voice AI Founder &middot; NOVA Labs &middot; Abu Dhabi
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {[
              { label: "About", href: "/#about" },
              { label: "Projects", href: "/#projects" },
              { label: "Wins", href: "/#competitions" },
              { label: "Endorsements", href: "/#endorsements" },
              { label: "Contact", href: "/#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-3">
            <a
              href={withUtm("https://linkedin.com/in/amirkazemkhani", "footer")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-gold-500 transition-colors"
              aria-label="LinkedIn"
              data-track="footer_linkedin"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={withUtm("https://github.com/Kazemkhani", "footer")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-gold-500 transition-colors"
              aria-label="GitHub"
              data-track="footer_github"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="editorial-divider-center my-8" />

        {/* Credibility line */}
        <p className="text-center text-[11px] sm:text-xs text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
          Featured on{" "}
          <span className="text-foreground/90">Falcons of Majlis</span> (India
          Today &times; Aaj Tak) &middot; Conversation partner of Jensen Huang
          at NVIDIA &middot; Building{" "}
          <a
            href={withUtm("https://novalabs.ae", "footer")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-500/90 hover:text-gold-500 transition-colors"
            data-track="footer_nova_link"
          >
            NOVA Labs
          </a>{" "}
          from Abu Dhabi
        </p>

        <p className="text-center text-xs text-muted-foreground/50 mt-4">
          &copy; {year} Amir Kazemkhani. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
