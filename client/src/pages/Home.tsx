import HeroSection from "../components/HeroSection";
import LiveStatus from "../components/LiveStatus";
import Stack from "../components/Stack";
import ProjectsSection from "../components/ProjectsSection";
import SubscribeCTA from "../components/SubscribeCTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <LiveStatus />
      <Stack />
      <ProjectsSection />
      <SubscribeCTA />
      <Footer />
    </main>
  );
};

export default Home;
