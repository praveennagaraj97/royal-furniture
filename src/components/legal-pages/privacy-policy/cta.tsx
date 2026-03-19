'use client';

import { SlideIn } from '@/components/shared/animations';
import { FC } from 'react';

const PrivacyCTA: FC = () => {
  return (
    <section className="py-16 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <SlideIn direction="up">
          <h3 className="text-2xl md:text-3xl mb-4 text-[#1a1c1c]">
            Questions of Protocol?
          </h3>
        </SlideIn>

        <SlideIn direction="up" delay={0.1}>
          <p className="text-[#44474c] mb-6">
            Contact our team regarding data privacy and policies.
          </p>
        </SlideIn>

        <SlideIn direction="up" delay={0.2}>
          <button className="bg-deep-maroon text-white px-6 py-3 hover:opacity-90 transition">
            Contact Boutique
          </button>
        </SlideIn>
      </div>
    </section>
  );
};

export default PrivacyCTA;
