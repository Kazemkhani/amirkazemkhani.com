import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

/** Back-to-top utility — CSS-only fade, no spring theater. */
const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      onClick={scrollUp}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed bottom-6 right-6 z-50 w-9 h-9 rounded-full border border-border/70 bg-background/85 text-muted-foreground/80 hover:border-gold-500/50 hover:text-gold-500 transition-[opacity,color,border-color] duration-150 flex items-center justify-center ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <ChevronUp className="w-4 h-4" />
    </button>
  );
};

export default BackToTop;
