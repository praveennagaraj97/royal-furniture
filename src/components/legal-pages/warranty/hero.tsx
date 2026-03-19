'use client';

import { SlideIn } from '@/components/shared/animations';
import { FC } from 'react';

import hero from '@/assets/legal-pages/warranty/hero.jpg';
import Image from 'next/image';

const Hero: FC = () => {
  return (
    <section className="relative sm:h-[calc(100vh-180px)] h-[calc(50vh)]  w-full flex items-center overflow-hidden bg-[#0f1c2c]">
      {/* Background */}
      <div className="absolute inset-0 opacity-60">
        <Image src={hero} fill className="object-cover" alt="Luxury interior" />
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0f1c2c] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto px-6 md:px-8 w-full max-w-7xl">
        <div className="max-w-2xl">
          <SlideIn direction="up">
            <span className="text-[#775a19] uppercase tracking-[0.3em] text-xs mb-4 block">
              Our Commitment
            </span>
          </SlideIn>

          <SlideIn direction="up" delay={0.1}>
            <h1 className="text-4xl md:text-7xl text-white mb-6">Warranty</h1>
          </SlideIn>

          <SlideIn direction="up" delay={0.2}>
            <p className="text-[#c4c6cc] text-sm md:text-lg leading-relaxed">
              Investing in Royal Manor is an investment in generations of
              craftsmanship.
            </p>
          </SlideIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
