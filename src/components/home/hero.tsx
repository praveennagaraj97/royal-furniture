'use client';

import { ViewOnce } from '@/components/shared/animations';
import Image from 'next/image';
import { FC } from 'react';

import heroImage from '@/assets/hero.png';

const Hero: FC = () => {
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
          src={heroImage}
          alt="Royal Furniture - Premium Home Furnishings"
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
          priority
          quality={90}
        />
      </ViewOnce>
    </div>
  );
};

export default Hero;
