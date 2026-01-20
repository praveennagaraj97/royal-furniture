'use client';

import { StaggerItem } from '@/components/shared/animations';
import Image from 'next/image';
import { FC } from 'react';

export interface CardShowcaseCardProps {
  image: string;
  imageAlt: string;
  label: string;
}

const CardShowcaseCard: FC<CardShowcaseCardProps> = ({
  image,
  imageAlt,
  label,
}) => {
  return (
    <StaggerItem
      type="slideUp"
      distance={30}
      duration={0.6}
      className="flex flex-col w-full min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px] xl:min-w-[360px]"
    >
      {/* Card Image Container */}
      <div className="relative w-full aspect-3/5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all duration-300">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
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
