import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VytreonHero from '@/components/landing/VytreonHero';
import ProductsShowcase from '@/components/landing/ProductsShowcase';
import HowItWorksOS from '@/components/landing/HowItWorksOS';
import EcosystemGrid from '@/components/landing/EcosystemGrid';
import FinalCTAOS from '@/components/landing/FinalCTAOS';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Vytreon OS — The AI Operating System for Autonomous Companies";
  }, []);

  const handleLaunch = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex flex-col">
      <Navbar onLaunch={handleLaunch} />
      
      <main className="flex-grow">
        <VytreonHero onLaunch={handleLaunch} />
        <ProductsShowcase />
        <HowItWorksOS />
        <EcosystemGrid />
        <FinalCTAOS onLaunch={handleLaunch} />
      </main>
      
      <Footer />

      {showOnboarding && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
    </div>
  );
};

export default Index;
