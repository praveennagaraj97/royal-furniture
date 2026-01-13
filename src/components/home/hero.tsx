'use client';

import { ViewOnce } from '@/components/shared/animations';
import { FC } from 'react';

import FadeSlideshow from '@/components/shared/ui/fade-slideshow';
import { HomeBanner } from '@/types/response/home';
import Image from 'next/image';

interface HeroProps {
  banners: HomeBanner[];
}

const Hero: FC<HeroProps> = ({ banners }) => {
  return (
    <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3">
      <ViewOnce
        type="scaleUp"
        distance={30}
        initialScale={1.05}
        duration={0.8}
        margin="-100px"
        className="relative w-full aspect-2/1 rounded-lg overflow-hidden"
      >
        <FadeSlideshow banners={banners} showDots={false} />
      </ViewOnce>
    </div>
  );
};

export default Hero;

export const FullWidthBanner: FC<HeroProps> = ({ banners }) => {
  return (
    <ViewOnce
      type="scaleUp"
      distance={30}
      initialScale={1.05}
      duration={0.8}
      margin="-100px"
      className="relative w-full rounded-lg overflow-hidden"
    >
      {banners.map((banner) => (
        <Image
          key={banner.id}
          src={banner.image || ''}
          alt={banner.offer_text || ''}
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
        />
      ))}
    </ViewOnce>
  );
};
