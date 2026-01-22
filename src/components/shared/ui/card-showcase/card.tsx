'use client';

import { StaggerItem } from '@/components/shared/animations';
import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { ResponsiveImages } from '@/types/response';
import { FC } from 'react';

export interface CardShowcaseCardProps {
  images?: ResponsiveImages;
  alt?: string;
  label: string;
}

const CardShowcaseCard: FC<CardShowcaseCardProps> = ({
  images,
  alt = '',
  label,
}) => {
  return (
    <StaggerItem
      type="slideUp"
      distance={30}
      duration={0.6}
      className="flex flex-col w-full min-w-50 sm:min-w-60 md:min-w-70 lg:min-w-[320px] xl:min-w-90"
    >
      {/* Card Image Container */}
      <div className="relative w-full aspect-3/5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all duration-300">
        <ResponsiveImage
          images={images}
          alt={alt}
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Label Text Below Card */}
      <div className="mt-2 text-center">
        <h3 className="text-black text-base sm:text-lg font-semibold">
          {label}
        </h3>
      </div>
    </StaggerItem>
  );
};

export default CardShowcaseCard;
