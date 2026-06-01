import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { DashboardVisual } from '../components/landing/DashboardVisual';
import { Gamification } from '../components/landing/Gamification';
import { BentoFeatures } from '../components/landing/BentoFeatures';
import { Footer } from '../components/landing/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] selection:bg-emerald-500/30 overflow-x-hidden font-sans relative transition-colors duration-500">
      <div className="fixed inset-0 z-0 pointer-events-none transform-gpu will-change-transform">
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--accent-color) 1px, transparent 1px),
              linear-gradient(to bottom, var(--accent-color) 1px, transparent 1px)
            `,
            backgroundSize: '35px 35px'
          }}
        />

        <div
          className="absolute inset-0 bg-[var(--bg-color)]"
          style={{
            maskImage: 'radial-gradient(circle at 50% 50%, transparent 0%, var(--bg-color) 85%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 0%, var(--bg-color) 85%)'
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--accent-color) 1px, transparent 1px),
              linear-gradient(to bottom, var(--accent-color) 1px, transparent 1px)
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