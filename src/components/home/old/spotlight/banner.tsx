'use client';

import { ViewOnce } from '@/components/shared/animations';
import SectionTitleTag from '@/components/shared/ui/section-title-tag';
import { BannerItem } from '@/types/response/home';
import Image from 'next/image';
import { FC } from 'react';

const SpotlightBanner: FC<{ banners: BannerItem[]; title: string }> = ({
  banners,
  title,
}) => {
  return (
    <div className="max-w-dvw overflow-x-hidden">
      <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 mb-4">
        <SectionTitleTag title={title} className="text-xl font-semibold" />
      </div>
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
    </div>
  );
};

export default SpotlightBanner;
