import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VytreonHero from '@/components/landing/VytreonHero';
import ProductsShowcase from '@/components/landing/ProductsShowcase';
import HowItWorksOS from '@/components/landing/HowItWorksOS';
import EcosystemGrid from '@/components/landing/EcosystemGrid';
import FinalCTAOS from '@/components/landing/FinalCTAOS';

const Index = () => {
  useEffect(() => {
    document.title = "Vytreon OS — The AI Operating System for Autonomous Companies";
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <VytreonHero />
        <ProductsShowcase />
        <HowItWorksOS />
        <EcosystemGrid />
        <FinalCTAOS />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
