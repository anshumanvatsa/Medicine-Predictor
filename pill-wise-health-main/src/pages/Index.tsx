import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import DrugSafetyPredictor from "@/components/DrugSafetyPredictor";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <DrugSafetyPredictor />
      <Footer />
    </div>
  );
};

export default Index;
