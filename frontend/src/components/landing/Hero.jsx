import React from 'react';
import ThreeDMarqueeDemo from './ThreeDMarqueeDemo';

export const Hero = () => (
  <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
    {/* Full Screen 3D Marquee Background - SCALE ADJUSTED FOR WIDTH */}
    <div className="absolute inset-0 z-10 opacity-100 scale-[1.2] lg:scale-[1.4] translate-y-[-5%]">
      <ThreeDMarqueeDemo />
    </div>


  </section>
);
