import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { ValueProposition } from "./ValueProposition";
import { FeaturedContent } from "./FeaturedContent";
import { HowItWorks } from "./HowItWorks";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={onNavigate} />
      <Hero onNavigate={onNavigate} />
      <ValueProposition />
      <FeaturedContent onNavigate={onNavigate} />
      <HowItWorks />
      <FinalCTA onNavigate={onNavigate} />
      <Footer />
    </div>
  );
}
