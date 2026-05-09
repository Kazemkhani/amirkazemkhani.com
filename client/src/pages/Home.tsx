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

const Home = () => {
  return (
    <main>
      <HeroSection />
      <PitchWall />
      <AboutSection />
      <SkillsSection />
      <HaloMoments />
      <TimelineSection />
      <ProjectsSection />
      <TestimonialSection />
      <EndorsementsSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
};

export default Home;
