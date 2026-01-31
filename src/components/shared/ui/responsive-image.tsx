/* eslint-disable @next/next/no-img-element */
'use client';

import { ResponsiveImages } from '@/types/response';
import { motion } from 'framer-motion';
import { FC, useCallback, useMemo, useState } from 'react';
import NoImage from './no-image';

interface ResponsiveImageProps {
  images?: ResponsiveImages;
  alt?: string;
  className?: string;
  shouldFill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' | 'initial';
  enableFadeTransition?: boolean;
  layoutId?: string;
}

const ResponsiveImage: FC<ResponsiveImageProps> = ({
  images,
  alt = '',
  className = '',
  shouldFill = false,
  objectFit = 'initial',
  enableFadeTransition = true,
  layoutId,
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
    <motion.div
      className={`relative overflow-hidden ${className}`}
      layoutId={layoutId}
    >
      <div className="relative w-full h-full">
        {/* Blur Placeholder or Loading Skeleton */}
        {blurUrl ? (
          <img
            src={blurUrl}
            alt=""
            aria-hidden="true"
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 pointer-events-none ${
              isLoaded ? 'opacity-0' : 'opacity-100 animate-pulse'
            }`}
            style={{
              objectFit,
              zIndex: 1,
            }}
          />
        ) : (
          <div
            className={`absolute top-0 left-0 w-full h-full bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 transition-opacity duration-700 pointer-events-none ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ objectFit, zIndex: 1 }}
          />
        )}
        <motion.picture
          layoutId={layoutId ? `picture-${layoutId}` : undefined}
          initial={{ opacity: enableFadeTransition ? 0 : 1 }}
          animate={{
            opacity:
              isLoaded && enableFadeTransition
                ? 1
                : enableFadeTransition
                  ? 0
                  : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{ objectFit, position: 'relative', zIndex: 2 }}
        >
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
            className={`$${
              shouldFill ? 'absolute inset-0' : ''
            } w-full h-full transition-opacity duration-700 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </motion.picture>
      </div>
    </motion.div>
  );
};

export default ResponsiveImage;
