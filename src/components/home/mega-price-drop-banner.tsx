'use client';

import { ViewOnce } from '@/components/shared/animations';
import Image from 'next/image';
import { FC } from 'react';

import megaPriceDropBanner from '@/assets/banner-2.png';

const MegaPriceDropBanner: FC = () => {
  return (
    <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3">
      <ViewOnce
        type="scaleUp"
        distance={30}
        initialScale={1.05}
        duration={0.8}
        margin="-100px"
        className="relative w-full rounded-lg overflow-hidden"
      >
        <Image
          src={megaPriceDropBanner}
          alt="Mega Price Drop - Sustainable Furniture"
          width={1200}
          height={500}
          className="w-full h-auto object-cover"
          quality={90}
          placeholder="blur"
        />
      </ViewOnce>
    </div>
  );
};

export default MegaPriceDropBanner;
