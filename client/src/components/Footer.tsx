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
            <p className="text-lg font-semibold text-foreground">
              Amir<span className="text-gold-500">K</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Voice AI Founder &middot; NOVA Labs &middot; Dubai
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {[
              { label: "Work", href: "/#work" },
              { label: "Proof", href: "/#proof" },
              { label: "Writing", href: "/#writing" },
              { label: "Articles", href: "/articles" },
              { label: "Work with me", href: "/work-with-me" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-foreground transition-colors duration-150"
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
              className="p-2 text-muted-foreground hover:text-gold-500 transition-colors duration-150"
              aria-label="LinkedIn"
              data-track="footer_linkedin"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={withUtm("https://github.com/Kazemkhani", "footer")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-gold-500 transition-colors duration-150"
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
          Today &times; Aaj Tak) &middot; Building{" "}
          <a
            href={withUtm("https://novalabs.ae", "footer")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-500/90 hover:text-gold-500 transition-colors duration-150"
            data-track="footer_nova_link"
          >
            NOVA Labs
          </a>{" "}
          from Dubai
        </p>

        <p className="text-center text-xs text-muted-foreground/50 mt-4 nums">
          &copy; {year} Amir Kazemkhani &middot;{" "}
          <a href="/privacy" className="hover:text-muted-foreground transition-colors duration-150">
            Privacy
          </a>
          {" · "}
          <a href="/terms" className="hover:text-muted-foreground transition-colors duration-150">
            Terms
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
