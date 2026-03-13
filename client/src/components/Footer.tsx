import { Github, Linkedin } from 'lucide-react';

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
              AI Engineer &middot; Serial Founder &middot; Dubai
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {['About', 'Projects', 'Wins', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-3">
            <a
              href="https://linkedin.com/in/amirkazemkhani"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-gold-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
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
          </div>
        </div>

        <div className="editorial-divider-center my-8" />

        <p className="text-center text-xs text-muted-foreground/50">
          &copy; {year} Amir Kazemkhani. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
