import { RefObject, useEffect, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  enabled?: boolean;
}

interface UseIntersectionObserverProps {
  ref: RefObject<Element | null>;
  options?: UseIntersectionObserverOptions;
}

export const useIntersectionObserver = ({
  ref,
  options = {},
}: UseIntersectionObserverProps) => {
  const {
    threshold = 0,
    root = null,
    rootMargin,
    enabled = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        root,
        rootMargin,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin, enabled]);

  return isIntersecting;
};
