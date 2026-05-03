import React from 'react';

// Import Modular Landing Components
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { DashboardVisual } from '../components/landing/DashboardVisual';
import { Gamification } from '../components/landing/Gamification';
import { BentoFeatures } from '../components/landing/BentoFeatures';
import { Footer } from '../components/landing/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-emerald-500/30 overflow-x-hidden font-sans relative">
      {/* Aceternity-style Grid of Uncertainty Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base Grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `
              linear-gradient(to right, #10b981 1px, transparent 1px),
              linear-gradient(to bottom, #10b981 1px, transparent 1px)
            `,
            backgroundSize: '35px 35px'
          }} 
        />
        
        {/* Large Radial Fade Mask */}
        <div 
          className="absolute inset-0 bg-[#030712]" 
          style={{ 
            maskImage: 'radial-gradient(circle at 50% 50%, transparent 0%, #030712 85%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 0%, #030712 85%)'
          }} 
        />

        {/* Secondary Smaller Grid for Detail */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: `
              linear-gradient(to right, #10b981 1px, transparent 1px),
              linear-gradient(to bottom, #10b981 1px, transparent 1px)
            `,
            backgroundSize: '175px 175px'
          }} 
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <DashboardVisual />
          <Gamification />
          <BentoFeatures />
        </main>
        <Footer />
      </div>
    </div>
  );
}