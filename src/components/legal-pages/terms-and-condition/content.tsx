'use client';

import { FC } from 'react';

import { SlideIn } from '@/components/shared/animations';
import TermsAccordion from './ccordian';

const TermsContent: FC = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="mb-12">
        <SlideIn direction="up">
          <h2 className="text-2xl md:text-3xl text-[#1a1c1c] mb-4">
            Master Service Agreement
          </h2>
        </SlideIn>

        <SlideIn direction="up" delay={0.1}>
          <p className="text-[#44474c] leading-relaxed max-w-2xl">
            By accessing and using our platform, you agree to the following
            terms and conditions governing all services and transactions.
          </p>
        </SlideIn>

        <SlideIn direction="up" delay={0.2}>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-0.5 w-10 bg-deep-maroon" />
            <span className="text-deep-maroon text-xs uppercase tracking-widest">
              Effective January 2024
            </span>
          </div>
        </SlideIn>
      </div>

      <TermsAccordion />

      {/* Contact Section */}
      <div className="mt-16 md:mt-24 bg-[#0f1c2c] text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl md:text-2xl mb-2">Legal Consultation</h3>
          <p className="text-sm opacity-70">
            Need clarification on our terms? Our team is available.
          </p>
        </div>

        <button className="bg-deep-maroon px-6 py-3 text-sm uppercase tracking-wider">
          Contact Boutique
        </button>
      </div>
    </section>
  );
};

export default TermsContent;
