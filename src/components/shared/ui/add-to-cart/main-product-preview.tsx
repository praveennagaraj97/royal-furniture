'use client';

import ResponsiveImage from '@/components/shared/ui/responsive-image';
import type { ResponsiveImages } from '@/types/response';
import type { FC } from 'react';

interface MainProductPreviewProps {
  images: ResponsiveImages | undefined;
  alt: string;
}

export const MainProductPreview: FC<MainProductPreviewProps> = ({
  images,
  alt,
}) => {
  return (
    <section className="w-full flex justify-center lg:justify-start">
      <div className="w-full max-w-md rounded-2xl border-2 border-deep-maroon bg-white p-3 sm:p-4 md:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        <div className="overflow-hidden rounded-xl bg-gray-50">
          <ResponsiveImage
            images={images}
            alt={alt}
            className="h-full w-full object-cover"
            shouldFill
          />
        </div>
      </div>
    </section>
  );
};
