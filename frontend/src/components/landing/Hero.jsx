import React from 'react';
import ThreeDMarqueeDemo from './ThreeDMarqueeDemo';

export const Hero = () => (
  <section className="relative h-[80vh] sm:h-[100vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
    {/* Hero Content Layer */}
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <ThreeDMarqueeDemo />
    </div>


  </section>
);
