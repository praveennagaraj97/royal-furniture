'use client';

import { SlideIn } from '@/components/shared/animations';
import { FC } from 'react';

const ReturnsHero: FC = () => {
  return (
    <section className="relative h-80 md:h-115 flex items-center justify-center overflow-hidden mb-16">
      <div className="absolute inset-0 bg-linear-to-br from-[#0f1c2c] via-[#3a4859] to-[#0f1c2c]" />

      <div className="relative z-10 text-center px-6">
        <SlideIn direction="up">
          <span className="text-pale-blush tracking-[0.3em] uppercase text-xs mb-4 block">
            Royal Manor Concierge
          </span>
        </SlideIn>

        <SlideIn direction="up" delay={0.1}>
          <h1 className="text-white text-4xl md:text-6xl">Returns Policy</h1>
        </SlideIn>

        <SlideIn direction="up" delay={0.2}>
          <div className="mt-6 h-0.5 w-20 bg-deep-maroon mx-auto" />
        </SlideIn>
      </div>
    </section>
  );
};

export default ReturnsHero;
