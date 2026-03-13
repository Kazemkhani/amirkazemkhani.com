import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-24 lg:py-32 border-t border-border/50">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-4">Contact</p>
          <h2 className="font-display text-heading font-bold text-foreground mb-6">
            Let's build together
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
            Whether it's a hackathon team, startup collaboration, AI project, or speaking opportunity — I'd love to connect.
          </p>
        </motion.div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
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

        {/* Info grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-gold-500/60" />
            <span className="text-sm">Dubai, UAE</span>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          {[
            { icon: Linkedin, href: 'https://linkedin.com/in/amirkazemkhani', label: 'LinkedIn' },
            { icon: Github, href: 'https://github.com/Kazemkhani', label: 'GitHub' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border text-muted-foreground hover:border-gold-500/40 hover:text-gold-500 transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
