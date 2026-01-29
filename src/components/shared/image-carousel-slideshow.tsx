import { FC, ReactNode, TouchEvent, useRef, useState } from 'react';

interface ImageCarouselProps {
  images: ReactNode[];
  onChange?: (index: number) => void;
  initialIndex?: number;
  className?: string;
}

// Reusable swipeable image carousel
const ImageSwipeCarousel: FC<ImageCarouselProps> = ({
  images,
  onChange,
  initialIndex = 0,
  className = '',
}) => {
  const [current, setCurrent] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const delta = touchStartX.current - touchEndX.current;
      if (delta > 40 && current < images.length - 1) {
        // swipe left
        setCurrent((prev) => {
          const next = prev + 1;
          onChange?.(next);
          return next;
        });
      } else if (delta < -40 && current > 0) {
        // swipe right
        setCurrent((prev) => {
          const next = prev - 1;
          onChange?.(next);
          return next;
        });
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className={`relative w-full ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full h-full">{images[current]}</div>
    </div>
  );
};

export default ImageSwipeCarousel;
