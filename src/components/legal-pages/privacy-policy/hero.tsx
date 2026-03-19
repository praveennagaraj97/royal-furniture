'use client';

import { SlideIn } from '@/components/shared/animations';
import { FC } from 'react';

const PrivacyHero: FC = () => {
  return (
    <section className="relative h-75 md:h-100 flex items-center justify-center bg-[#0f1c2c] overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-[#0f1c2c] via-[#3a4859] to-[var(--color-deep-maroon)] opacity-40" />

      <div className="relative z-10 text-center px-6">
        <SlideIn direction="up">
          <span className="text-pale-blush uppercase tracking-[0.4em] text-xs mb-4 block">
            Royal Commitment
          </span>
        </SlideIn>

        <SlideIn direction="up" delay={0.1}>
          <h1 className="text-white text-4xl md:text-6xl mb-2">
            Privacy Policy
          </h1>
        </SlideIn>

        <SlideIn direction="up" delay={0.2}>
          <div className="w-12 h-0.5 bg-deep-maroon mx-auto mt-4" />
        </SlideIn>
      </div>
    </section>
  );
};

export default PrivacyHero;
