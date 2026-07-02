import { Mail } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Invitation — first-person close. Engagement types in prose, one mailto CTA,
 * booking button only when VITE_CAL_URL is configured. Low-key by design.
 */

const InvitationSection = () => {
  const calUrl = import.meta.env.VITE_CAL_URL;

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="section-label mb-4">Invitation</p>
          <h2 className="text-heading font-semibold text-foreground mb-6">
            Work with me
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed mb-10">
            <p>
              Three ways this usually goes: teams bring me in to put{" "}
              <span className="text-foreground/90">voice agents on their
              phone lines</span> through NOVA Labs; founders and operators ask
              me to <span className="text-foreground/90">build AI products
              end to end</span> — architecture through shipped software; and
              events have me{" "}
              <span className="text-foreground/90">speak about voice AI and
              building in the Gulf</span>.
            </p>
            <p>
              If any of that sounds useful, write to me. I read everything.{" "}
              <a href="/work-with-me" className="link-prose" data-track="invitation_work_with_me">
                Engagements and process, in detail →
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:amir@amirkazemkhani.com"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-gold-500 text-background font-semibold rounded-full hover:bg-gold-400 transition-colors duration-150"
              data-track="invitation_email"
            >
              <Mail className="w-4 h-4" />
              amir@amirkazemkhani.com
            </a>
            {calUrl && (
              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-gold-500/40 text-gold-500 font-medium rounded-full hover:border-gold-500 transition-colors duration-150"
                data-track="invitation_booking"
              >
                Book a call
              </a>
            )}
          </div>
          <p className="mt-8 text-sm text-muted-foreground nums">
            Dubai, UAE ·{" "}
            <a
              href="https://linkedin.com/in/amirkazemkhani"
              target="_blank"
              rel="noopener noreferrer"
              className="link-prose"
              data-track="invitation_linkedin"
            >
              LinkedIn
            </a>
            {" · "}
            <a
              href="https://github.com/Kazemkhani"
              target="_blank"
              rel="noopener noreferrer"
              className="link-prose"
              data-track="invitation_github"
            >
              GitHub
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default InvitationSection;
