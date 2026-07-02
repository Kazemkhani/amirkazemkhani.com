import HeroSection from "../components/HeroSection";
import WorkSection from "../components/WorkSection";
import ProofSection from "../components/ProofSection";
import WritingSection from "../components/WritingSection";
import InvitationSection from "../components/InvitationSection";
import VerticalRail from "../components/VerticalRail";
import { usePageMeta, SITE_TITLE, SITE_DESCRIPTION } from "../lib/meta";

/**
 * Home — the five-section arc (docs/DESIGN-DOCTRINE.md):
 * identity → work → proof → writing → invitation.
 * The vertical gold rail is the single signature device.
 */

const RAIL_SECTIONS = ["hero", "work", "proof", "writing", "contact"];

const Home = () => {
  usePageMeta(SITE_TITLE, SITE_DESCRIPTION);

  return (
    <main id="main" className="relative">
      <VerticalRail sectionIds={RAIL_SECTIONS} />
      <HeroSection />
      <WorkSection />
      <ProofSection />
      <WritingSection />
      <InvitationSection />
    </main>
  );
};

export default Home;
