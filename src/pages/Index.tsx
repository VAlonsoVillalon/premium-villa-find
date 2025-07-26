import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { DestinationsSection } from "@/components/destinations-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { TrustSection } from "@/components/trust-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <DestinationsSection />
      <HowItWorksSection />
      <TrustSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;