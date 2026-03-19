'use client';

import { SlideIn } from '@/components/shared/animations';
import { FC } from 'react';

const PrivacyIntro: FC = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
      <SlideIn direction="up">
        <p className="text-[#44474c] text-base md:text-lg leading-relaxed">
          At Royal Manor, we hold your personal information in the same high
          regard as our masterfully crafted furniture. This policy outlines our
          commitment to your digital privacy.
        </p>
      </SlideIn>
    </section>
  );
};

export default PrivacyIntro;
