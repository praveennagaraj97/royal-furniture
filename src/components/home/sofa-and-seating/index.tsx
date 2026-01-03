'use client';

import { ViewOnce } from '@/components/shared/animations';
import SectionTitleTag from '@/components/shared/ui/section-title-tag';
import Image from 'next/image';
import { FC } from 'react';

import image from '@/assets/exclusive-offer.png';

const SofaAndSeating: FC = () => {
  return (
    <div className="max-w-dvw overflow-x-hidden">
      <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 mb-4">
        <SectionTitleTag
          title="Sofas & seating"
          className="text-xl font-semibold"
        />
      </div>
      <ViewOnce
        type="scaleUp"
        distance={30}
        initialScale={1.05}
        duration={0.8}
        margin="-100px"
        className="relative w-full rounded-lg overflow-hidden"
      >
        <Image
          src={image}
          alt="Royal Furniture - Promotional Offer"
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
          quality={90}
          placeholder="blur"
        />
      </ViewOnce>
    </div>
  );
};

export default SofaAndSeating;
