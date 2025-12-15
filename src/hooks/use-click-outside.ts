import { RefObject, useEffect } from 'react';

interface UseClickOutsideProps {
  ref: RefObject<HTMLElement | null>;
  handler: () => void;
  enabled?: boolean;
}

export const useClickOutside = ({
  ref,
  handler,
  enabled = true,
}: UseClickOutsideProps) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler, enabled]);
};
