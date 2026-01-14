'use client';

import { ViewOnce } from '@/components/shared/animations';
import { FC } from 'react';

import FadeSlideshow from '@/components/shared/ui/fade-slideshow';
import { BannerItem } from '@/types/response/home';

interface HeroProps {
  banners: BannerItem[];
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
