interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  tech: string;
  href?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Boutique fitness booking app — UAE client",
    description:
      "End-to-end mobile booking platform for a women-only pilates studio in Abu Dhabi. Class scheduling, Stripe payments, push notifications, and an admin dashboard.",
    tags: ["React Native", "Expo", "Supabase", "Stripe"],
    tech: "React Native · Expo · Supabase · Stripe · Vercel",
  },
  {
    id: 2,
    title: "Commodity trading desk — UAE client",
    description:
      "Custom Odoo 18 modules for a gold retail and hedging operation. Real-time inventory, multi-currency pricing, and automated margin calculations.",
    tags: ["Odoo 18", "Python", "ERP"],
    tech: "Odoo 18 · Python · PostgreSQL · Odoo.sh",
  },
  {
    id: 3,
    title: "NOVA Labs — Voice AI for sales",
    description:
      "Autonomous voice agent system for AI-driven lead qualification. 4-agent conversation architecture (Greeting / Discovery / Pitch / Close). 334 automated tests.",
    tags: ["Voice AI", "FastAPI", "Vapi", "Anthropic"],
    tech: "FastAPI · Vapi · Anthropic Claude · Supabase · Docker",
    href: "https://novalabs.ae",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-editorial rounded-xl p-6 flex flex-col">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, i) => (
          <span
            key={tag}
            className={`text-xs px-2.5 py-1 rounded-full ${
              i === 0
                ? "bg-gold-500/15 text-gold-400"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Footer */}
      <div>
        <div className="h-px bg-border/50 mb-3" />
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-mono text-muted-foreground/60 flex-1 truncate">
            {project.tech}
          </p>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-gold-500 hover:text-gold-400 transition-colors shrink-0"
            >
              Visit &rarr;
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 lg:py-32 border-t border-border/50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Production work</p>
          <h2 className="font-display text-heading font-bold text-foreground mb-4">
            Three clients. Three shipped systems.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            All built solo, most of the code written by the agent hierarchy
            running on my Mac mini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
