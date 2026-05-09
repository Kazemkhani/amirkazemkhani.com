import { motion } from "framer-motion";

/**
 * PitchWall — horizontal-scroll card row showing two credibility-anchor moments.
 *
 * Mobile: snap-scroll horizontally (single card per viewport).
 * Desktop: grid, both cards side-by-side, centered.
 *
 * Captions are NEUTRAL — visual carries the lift.
 *
 * Photos:
 *   - amir-jensen-huang-nvidia.jpg
 *   - amir-suniel-shetty-falcons-of-majlis.jpg
 */

type Card = {
  src: string;
  alt: string;
  caption: string;
  subline: string;
  track: string;
};

const cards: Card[] = [
  {
    src: "/credibility/amir-jensen-huang-nvidia.jpg",
    alt: "Amir Hossein Kazemkhani in conversation with Jensen Huang",
    caption: "In conversation with Jensen Huang",
    subline: "NVIDIA · UAE 2026",
    track: "pitch_wall_jensen",
  },
  {
    src: "/credibility/amir-suniel-shetty-falcons-of-majlis.jpg",
    alt: "Amir Hossein Kazemkhani with Suniel Shetty on Falcons of Majlis",
    caption: "On Falcons of Majlis with Suniel Shetty",
    subline: "India Today × Aaj Tak",
    track: "pitch_wall_falcons",
  },
];

const PitchWall = () => {
  return (
    <section
      id="pitch-wall"
      className="relative py-20 md:py-28"
      aria-labelledby="pitch-wall-label"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p id="pitch-wall-label" className="section-label mb-4">
            Recent Moments
          </p>
          <h2 className="font-display text-heading font-bold text-foreground">
            Where the work has been{" "}
            <span className="text-gradient-gold">seen</span>.
          </h2>
          <div className="editorial-divider-center mt-6" />
        </div>

        {/* Mobile: snap-scroll. Desktop: centered grid. */}
        <div className="flex md:grid md:grid-cols-2 md:gap-10 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-6 md:mx-0 px-6 md:px-0 pb-4 md:pb-0">
          {cards.map((card, i) => (
            <motion.figure
              key={card.track}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="shrink-0 w-[320px] md:w-auto snap-center md:snap-align-none"
              data-track={card.track}
            >
              <div className="card-editorial hover-lift rounded-2xl overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={card.src}
                    alt={card.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="px-5 py-5">
                  <p className="font-display text-base md:text-lg font-semibold text-foreground leading-snug">
                    {card.caption}
                  </p>
                  <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-gold-500 mt-2">
                    {card.subline}
                  </p>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PitchWall;
