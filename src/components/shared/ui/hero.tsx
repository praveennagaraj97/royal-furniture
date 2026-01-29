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
    <div className="section-container">
      <ViewOnce
        type="scaleUp"
        distance={30}
        initialScale={1.05}
        duration={0.8}
        margin="-40px"
        className="relative w-full rounded-lg overflow-hidden"
      >
        <FadeSlideshow banners={banners} showDots={false} />
      </ViewOnce>
    </div>
  );
};

export default Hero;
