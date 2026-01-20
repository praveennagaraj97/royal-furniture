'use client';

import { BannerItem } from '@/types/response/home';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import VideoPlayer from './video-player';

interface FadeSlideshowProps {
  banners: BannerItem[];
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
  const [isHovered, setIsHovered] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (banners.length <= 1) return;
    if (isHovered) return; // Pause when hovered

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, autoplayDuration);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [banners.length, autoplayDuration, isHovered]);

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio: aspectRatio.toString() } : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {banners.map((banner, index) => {
        const isActive = index === currentIndex;

        if (banner.media_type === 'video') {
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {banner.video && (
                <VideoPlayer
                  src={banner.video}
                  autoplay={isActive}
                  playing={isActive}
                  loop={true}
                  muted={true}
                  linkUrl={banner.link_url}
                />
              )}
            </div>
          );
        }

        return (
          <div
            key={banner.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {banner.link_url ? (
              <Link
                href={banner.link_url}
                className="block w-full h-full relative"
              >
                <Image
                  src={banner.image || banner.video || ''}
                  alt={banner.offer_text || 'Promotional Banner'}
                  fill
                  className="object-cover"
                  priority={index === 0 && imagePriority}
                  sizes="100vw"
                  onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                    if (!aspectRatio) {
                      setAspectRatio(naturalWidth / naturalHeight);
                    }
                  }}
                />
              </Link>
            ) : (
              <div className="block w-full h-full relative">
                <Image
                  src={banner.image || banner.video || ''}
                  alt={banner.offer_text || 'Promotional Banner'}
                  fill
                  className="object-cover"
                  priority={index === 0 && imagePriority}
                  sizes="100vw"
                  onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                    if (!aspectRatio) {
                      setAspectRatio(naturalWidth / naturalHeight);
                    }
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

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
