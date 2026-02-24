import { RefObject, useEffect, useState } from 'react';

export function useStickyVisibility(ref: RefObject<HTMLElement | null>) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!ref.current) return;

    const checkVisibility = () => {
      const rect = ref.current!.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Element considered visible if at least partially in viewport
      const visible = rect.top < viewportHeight && rect.bottom > 0;

      setIsVisible(visible);
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [ref]);

  return isVisible;
}
