'use client';

import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import { useEffect, useRef } from 'react';

// Configure NProgress for faster response
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.08,
  easing: 'ease',
  speed: 400,
});

export default function ProgressBar() {
  const pathname = usePathname();
  const isNavigatingRef = useRef(false);
  const pathnameRef = useRef(pathname);
  const completionTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Track if this is the initial mount
    const isInitialMount = pathnameRef.current === pathname;

    // On any pathname change after the initial mount, ensure the progress
    // bar is completed. This covers programmatic navigations that may
    // start NProgress without setting the local isNavigating flag.
    if (!isInitialMount) {
      // Clear any existing timer
      if (completionTimerRef.current) {
        clearTimeout(completionTimerRef.current);
      }

      // Complete progress bar after a short delay to ensure smooth transition
      completionTimerRef.current = setTimeout(() => {
        NProgress.done();
        isNavigatingRef.current = false;
      }, 150);
    }

    pathnameRef.current = pathname;

    return () => {
      if (completionTimerRef.current) {
        clearTimeout(completionTimerRef.current);
      }
    };
  }, [pathname]);

  useEffect(() => {
    // Intercept all link clicks to start progress bar immediately
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor) {
        const href = anchor.getAttribute('href');
        const targetAttr = anchor.getAttribute('target');

        // Only intercept internal links without target="_blank"
        if (
          href &&
          !targetAttr &&
          !href.startsWith('http') &&
          !href.startsWith('mailto:') &&
          !href.startsWith('tel:') &&
          !anchor.hasAttribute('download')
        ) {
          // Start progress bar immediately on click
          isNavigatingRef.current = true;
          NProgress.start();
        }
      }
    };

    // Handle browser back/forward navigation
    const handlePopState = () => {
      isNavigatingRef.current = true;
      NProgress.start();
    };

    // Add event listeners with capture phase for early interception
    document.addEventListener('click', handleLinkClick, true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleLinkClick, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
}
