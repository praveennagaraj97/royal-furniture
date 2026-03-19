'use client';

import { SlideIn } from '@/components/shared/animations';
import { FC } from 'react';

const CTA: FC = () => {
  return (
    <section className="py-16 md:py-24 text-center">
      <div className="max-w-2xl mx-auto px-6 md:px-8">
        <SlideIn direction="up">
          <h3 className="text-2xl md:text-3xl text-[#1a1c1c] mb-6">
            Need further assistance?
          </h3>
        </SlideIn>

        <SlideIn direction="up" delay={0.1}>
          <p className="text-[#44474c] mb-8 text-sm md:text-base">
            Our concierge team is available for personalized consultations.
          </p>
        </SlideIn>

        <SlideIn direction="up" delay={0.2}>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {/* Primary */}
            <button className="bg-deep-maroon text-white px-6 py-3 hover:opacity-90 transition">
              Contact Boutique
            </button>

            {/* Secondary */}
            <button className="text-[#1a1c1c] px-6 py-3 border-b border-deep-maroon">
              Care Guides
            </button>
          </div>
        </SlideIn>
      </div>
    </section>
  );
};

export default CTA;
