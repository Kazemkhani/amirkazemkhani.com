import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';

function WordReveal({ text, delay = 0, isInView }: { text: string; delay?: number; isInView: boolean }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: delay + i * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-24 lg:py-32 border-t border-border/50">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="section-label mb-4"
        >
          Contact
        </motion.p>

        <h2 className="font-display text-heading font-bold text-foreground mb-6">
          <WordReveal text="Let's build together" delay={0.15} isInView={isInView} />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Whether it's a hackathon team, startup collaboration, AI project, or speaking opportunity — I'd love to connect.
        </motion.p>

        {/* Email CTA — scale spring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, type: 'spring', stiffness: 150, damping: 14 }}
          className="mb-12"
        >
          <a
            href="mailto:amir@amirkazemkhani.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-background font-semibold rounded-full hover:bg-gold-400 transition-colors duration-300 text-lg"
          >
            <Mail className="w-5 h-5" />
            amir@amirkazemkhani.com
          </a>
        </motion.div>

        {/* Location — fade with icon */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-gold-500/60" />
            <span className="text-sm">Dubai, UAE</span>
          </div>
        </motion.div>

        {/* Social links — spring pop from bottom */}
        <div className="flex justify-center gap-4">
          {[
            { icon: Linkedin, href: 'https://linkedin.com/in/amirkazemkhani', label: 'LinkedIn' },
            { icon: Github, href: 'https://github.com/Kazemkhani', label: 'GitHub' },
          ].map(({ icon: Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.75 + i * 0.08, type: 'spring', stiffness: 200, damping: 12 }}
              className="p-3 rounded-full border border-border text-muted-foreground hover:border-gold-500/40 hover:text-gold-500 transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>

        {/* Editorial divider — line draw */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="editorial-divider-center mt-16"
        />
      </div>
    </section>
  );
};

export default ContactSection;
