import HeroSection from "../components/HeroSection";
import PitchWall from "../components/PitchWall";
import HaloMoments from "../components/HaloMoments";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import TimelineSection from "../components/TimelineSection";
import ProjectsSection from "../components/ProjectsSection";
import TestimonialSection from "../components/TestimonialSection";
import EndorsementsSection from "../components/EndorsementsSection";
import BlogSection from "../components/BlogSection";
import ContactSection from "../components/ContactSection";
import { SectionFlourish } from "../components/PathDecor";
import VerticalRail from "../components/VerticalRail";

/** Major sections traced by the vertical gold rail (desktop ≥1280px). */
const RAIL_SECTIONS = [
  "hero",
  "pitch-wall",
  "about",
  "skills",
  "halo-moments",
  "timeline",
  "projects",
  "competitions",
  "endorsements",
  "blog",
  "contact",
];

const Home = () => {
  return (
    <main className="relative">
      <VerticalRail sectionIds={RAIL_SECTIONS} />
      <HeroSection />
      <PitchWall />
      <SectionFlourish />
      <AboutSection />
      <SkillsSection />
      <HaloMoments />
      <SectionFlourish />
      <TimelineSection />
      <ProjectsSection />
      <TestimonialSection />
      <EndorsementsSection />
      <SectionFlourish />
      <BlogSection />
      <ContactSection />
    </main>
  );
};

export default Home;
