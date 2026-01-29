import {
  FC,
  ReactNode,
  startTransition,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

interface ImageCarouselProps {
  images: ReactNode[];
  className?: string;
}

// Reusable swipeable image carousel
const ImageSwipeCarousel: FC<ImageCarouselProps> = ({
  images,
  className = '',
}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    startTransition(() => {
      setCurrent(0);
    });
  }, [images]);

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
        setCurrent((prev) => prev + 1);
      } else if (delta < -40 && current > 0) {
        // swipe right
        setCurrent((prev) => prev - 1);
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
      {/* Image count pill at bottom center */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex justify-center w-full pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/70 text-white text-xs font-medium shadow-md">
            {current + 1}/{images.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageSwipeCarousel;
