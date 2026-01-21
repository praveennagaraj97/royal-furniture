'use client';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { ResponsiveImages } from '@/types/response';
import { FC, startTransition, useEffect, useRef, useState } from 'react';

interface ResponsiveImageProps {
  images?: ResponsiveImages;
  alt?: string;
  className?: string;
}

const ResponsiveImage: FC<ResponsiveImageProps> = ({
  images,
  alt = '',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionObserver({
    ref: containerRef,
    options: { threshold: 0.1 },
  });

  const webUrl = images?.web?.url || '';
  const ipadUrl = images?.ipad?.url || '';
  const mobileUrl = images?.mobile?.url || '';
  const blurUrl =
    images?.mobile?.blur_url ||
    images?.ipad?.blur_url ||
    images?.web?.blur_url ||
    '';

  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    startTransition(() => {
      if (isVisible) setShouldLoad(true);
    });
  }, [isVisible]);

  useEffect(() => {
    function computeRatio() {
      if (!images) return;

      const vw = typeof window !== 'undefined' ? window.innerWidth : 0;
      let variant = images.mobile;
      if (vw >= 1024) variant = images.web || images.ipad || images.mobile;
      else if (vw >= 768) variant = images.ipad || images.mobile || images.web;

      if (variant && variant.width && variant.height) {
        setAspectRatio(variant.width / variant.height);
      } else {
        setAspectRatio(null);
      }
    }

    computeRatio();
    window.addEventListener('resize', computeRatio);
    return () => window.removeEventListener('resize', computeRatio);
  }, [images]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio: aspectRatio.toString() } : undefined}
    >
      {blurUrl && (
        // low-res blur layer
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={blurUrl}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
        />
      )}

      <picture>
        {webUrl ? <source srcSet={webUrl} media="(min-width:1024px)" /> : null}
        {ipadUrl ? <source srcSet={ipadUrl} media="(min-width:768px)" /> : null}
        {shouldLoad ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mobileUrl || ipadUrl || webUrl}
            alt={alt}
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : null}
      </picture>
    </div>
  );
};

export default ResponsiveImage;
