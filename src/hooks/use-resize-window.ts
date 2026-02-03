import { DependencyList, useEffect } from 'react';

/**
 * Hook to handle window resize events
 * @param callback - Function to call on window resize
 * @param deps - Optional dependency array for the callback
 */
export const useResizeWindow = (
  callback: () => void,
  deps: DependencyList = [],
) => {
  useEffect(() => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
