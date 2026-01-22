/* eslint-disable @next/next/no-img-element */
'use client';

import { ResponsiveImages } from '@/types/response';
import { FC, useCallback, useMemo, useState } from 'react';
import NoImage from './no-image';

interface ResponsiveImageProps {
  images?: ResponsiveImages;
  alt?: string;
  className?: string;
  shouldFill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' | 'initial';
}

const ResponsiveImage: FC<ResponsiveImageProps> = ({
  images,
  alt = '',
  className = '',
  shouldFill = false,
  objectFit = 'initial',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { mobile, ipad, web, defaultVariant, blurUrl } = useMemo(() => {
    const mobile = images?.mobile;
    const ipad = images?.ipad;
    const web = images?.web;

    const defaultVariant = web || ipad || mobile; // largest as base
    const blurUrl = mobile?.blur_url || ipad?.blur_url || web?.blur_url;

    return { mobile, ipad, web, defaultVariant, blurUrl };
  }, [images]);

  const handleImgRef = useCallback((img: HTMLImageElement | null) => {
    if (!img) return;

    if (img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (!defaultVariant?.url) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <NoImage className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur Placeholder */}
      {blurUrl && (
        <img
          src={blurUrl}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ filter: 'blur(20px)', transform: 'scale(1.1)', objectFit }}
        />
      )}

      <picture style={{ objectFit }}>
        {/* Desktop */}
        {web?.url && (
          <source
            srcSet={web.url}
            media="(min-width: 1024px)"
            width={web.width}
            height={web.height}
            style={{ objectFit }}
          />
        )}

        {/* Tablet */}
        {ipad?.url && (
          <source
            srcSet={ipad.url}
            media="(min-width: 768px)"
            width={ipad.width}
            height={ipad.height}
            style={{ objectFit }}
          />
        )}

        {/* Mobile */}
        {mobile?.url && (
          <source
            srcSet={mobile.url}
            media="(max-width: 767px)"
            width={mobile.width}
            height={mobile.height}
            style={{ objectFit }}
          />
        )}

        {/* Fallback should be largest */}
        <img
          ref={handleImgRef}
          src={defaultVariant.url}
          alt={alt}
          width={defaultVariant.width}
          height={defaultVariant.height}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          style={{ objectFit }}
          className={`${
            shouldFill ? 'absolute inset-0' : ''
          } w-full h-full transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </picture>
    </div>
  );
};

export default ResponsiveImage;
