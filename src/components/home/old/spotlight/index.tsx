'use client';

import SectionTitleTag from '@/components/shared/ui/section-title-tag';
import { SubCategoryItem } from '@/types';
import { FC } from 'react';

import { HomeBanner } from '@/types/response/home';
import SpotlightBanner from './banner';
import SpotLightShowcase from './showcase';

interface SpotLightProps {
  items: SubCategoryItem[];
  banners: HomeBanner[];
  title: string;
}

const SpotLight: FC<SpotLightProps> = ({ items, title, banners }) => {
  return (
    <>
      <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 flex flex-col gap-3">
        <SectionTitleTag title={title} className="text-xl font-semibold" />
      </div>

      <SpotlightBanner banners={banners} title={title} />

      {/* Subcategory Showcase */}
      <SpotLightShowcase items={items} />
    </>
  );
};

export default SpotLight;
