import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CollectionsSection from "@/components/CollectionsSection";
import CraftSection from "@/components/CraftSection";
import HeritageSection from "@/components/HeritageSection";
import ProductShowcase from "@/components/ProductShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CollectionsSection />
      <CraftSection />
      <HeritageSection />
      <ProductShowcase />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
};

export default Index;
