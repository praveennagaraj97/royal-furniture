'use client';

import { PromotionalBanner } from '@/types/response/home-page';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

interface FadeSlideshowProps {
  banners: PromotionalBanner[];
  showDots?: boolean;
  autoplayDuration?: number;
  className?: string;
  imagePriority?: boolean;
}

const FadeSlideshow: FC<FadeSlideshowProps> = ({
  banners,
  showDots = false,
  autoplayDuration = 5000,
  className = '',
  imagePriority = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, autoplayDuration);

    return () => clearInterval(interval);
  }, [banners.length, autoplayDuration]);

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {banner.link_url ? (
            <Link
              href={banner.link_url}
              className="block w-full h-full relative"
            >
              <Image
                src={banner.image}
                alt={banner.title || 'Promotional Banner'}
                fill
                className="object-cover"
                priority={index === 0 && imagePriority}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              />
            </Link>
          ) : (
            <div className="block w-full h-full relative">
              <Image
                src={banner.image}
                alt={banner.title || 'Promotional Banner'}
                fill
                className="object-cover"
                priority={index === 0 && imagePriority}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              />
            </div>
          )}
        </div>
      ))}

      {showDots && banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FadeSlideshow;
