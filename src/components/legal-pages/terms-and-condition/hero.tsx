'use client';

import { SlideIn } from '@/components/shared/animations';
import { FC } from 'react';

const TermsHero: FC = () => {
  return (
    <section className="relative h-75 md:h-100 flex items-center justify-center bg-[#0f1c2c] overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-linear-to-br from-[#0f1c2c] via-[#3a4859] to-[#0f1c2c]" />
      </div>

      <div className="relative z-10 text-center px-6">
        <SlideIn direction="up">
          <span className="text-pale-blush uppercase tracking-[0.3em] text-xs mb-4 block">
            Legal Framework
          </span>
        </SlideIn>

        <SlideIn direction="up" delay={0.1}>
          <h1 className="text-white text-4xl md:text-6xl mb-3">
            Terms & Conditions
          </h1>
        </SlideIn>

        <SlideIn direction="up" delay={0.2}>
          <p className="text-[#e3e2e1] text-sm max-w-md mx-auto">
            Refining trust and transparency for our community.
          </p>
        </SlideIn>
      </div>
    </section>
  );
};

export default TermsHero;
