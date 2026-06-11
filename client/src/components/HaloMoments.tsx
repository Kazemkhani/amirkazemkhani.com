import { motion } from "framer-motion";
import FalconsEpisode from "./FalconsEpisode";

/**
 * HaloMoments — three stage-and-network photos from Falcons of Majlis.
 *
 * Layout:
 *   - Hero callout: pitch-solo photo (Amir mid-pitch, mic on, alone on stage)
 *   - Below: 2-up grid with the networking + side-stage photos
 *
 * Mobile: stacked vertically. Desktop: hero on top + 2-col grid below.
 * NEUTRAL captions only.
 */

type Moment = {
  src: string;
  alt: string;
  caption: string;
  track: string;
};

const heroMoment: Moment = {
  src: "/credibility/amir-falcons-stage-pitch-solo.jpg",
  alt: "Amir Hossein Kazemkhani pitching NOVA Labs on the Falcons of Majlis stage",
  caption: "Pitching NOVA Labs to the Falcons",
  track: "halo_photo_pitch_solo",
};

const sideMoments: Moment[] = [
  {
    src: "/credibility/amir-falcons-stage-shetty-group.jpg",
    alt: "Amir Hossein Kazemkhani networking with Suniel Shetty after Falcons of Majlis",
    caption: "Networking with the Falcons after the show",
    track: "halo_photo_shetty_group",
  },
  {
    src: "/credibility/amir-falcons-stage-shetty-side.jpg",
    alt: "Amir Hossein Kazemkhani on the Falcons of Majlis stage",
    caption: "On the Falcons of Majlis stage",
    track: "halo_photo_shetty_side",
  },
];

const HaloMoments = () => {
  return (
    <section
      id="halo-moments"
      className="relative py-20 md:py-28 surface-elevated"
      aria-labelledby="halo-moments-label"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p id="halo-moments-label" className="section-label mb-4">
            On Stage
          </p>
          <h2 className="font-display text-heading font-bold text-foreground">
            Falcons of <span className="text-gradient-gold">Majlis</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-4 max-w-xl mx-auto">
            Featured on India Today &times; Aaj Tak.
          </p>
          <div className="editorial-divider-center mt-6" />
        </div>

        {/* The episode itself — cinematic lazy YouTube embed, segment at 59:00 */}
        <FalconsEpisode />

        {/* Hero callout — solo pitch */}
        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="mb-10 md:mb-14"
          data-track={heroMoment.track}
        >
          <div className="card-editorial hover-lift rounded-2xl overflow-hidden">
            <div className="aspect-[16/10] md:aspect-[21/9] overflow-hidden bg-secondary">
              <img
                src={heroMoment.src}
                alt={heroMoment.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
            <figcaption className="px-5 md:px-8 py-5 md:py-6">
              <p className="font-display text-lg md:text-xl font-semibold text-foreground">
                {heroMoment.caption}
              </p>
              <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-gold-500 mt-2">
                Falcons of Majlis &middot; 2026
              </p>
            </figcaption>
          </div>
        </motion.figure>

        {/* Side moments — 2-up grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {sideMoments.map((m, i) => (
            <motion.figure
              key={m.track}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.1,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              data-track={m.track}
            >
              <div className="card-editorial hover-lift rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={m.src}
                    alt={m.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="px-5 py-4">
                  <p className="font-display text-base font-semibold text-foreground">
                    {m.caption}
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

export default HaloMoments;
