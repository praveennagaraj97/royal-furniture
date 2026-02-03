'use client';

import { LOCALES, SUPPORTED_COUNTRIES } from '@/utils/generated';
import { useLocale } from 'next-intl';
import Link, { LinkProps } from 'next/link';
import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
  useParams,
} from 'next/navigation';
import NProgress from 'nprogress';
import {
  CSSProperties,
  MouseEvent,
  ReactNode,
  forwardRef,
  useCallback,
  useMemo,
} from 'react';

/**
 * Custom hook to handle navigation with country and locale prefixing
 */
export function useAppRouter() {
  const locale = useLocale();
  const params = useParams();
  const router = useNextRouter();

  const country = (params?.country as string) || 'ae';

  const formatHref = useCallback(
    (href: string) => {
      if (typeof href !== 'string') return href;
      if (
        !href.startsWith('/') ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return href;
      }

      // Check if it's already prefixed with country and locale
      const segments = href.split('/').filter(Boolean);
      const firstSegment = segments[0];
      const secondSegment = segments[1];

      const isCountry = (SUPPORTED_COUNTRIES as string[]).includes(
        firstSegment,
      );
      const isLocale = (LOCALES as string[]).includes(secondSegment);

      if (isCountry && isLocale) {
        return href;
      }

      // Prefix with /[country]/[locale]
      const cleanHref = href === '/' ? '' : href;
      return `/${country}/${locale}${cleanHref}`;
    },
    [country, locale],
  );

  const handlePush = useCallback(
    (href: string, options?: Parameters<typeof router.push>[1]) => {
      // Start progress bar immediately for programmatic navigation
      NProgress.start();
      return router.push(formatHref(href), options);
    },
    [router, formatHref],
  );

  const handleReplace = useCallback(
    (href: string, options?: Parameters<typeof router.replace>[1]) => {
      // Start progress bar immediately for programmatic navigation
      NProgress.start();
      return router.replace(formatHref(href), options);
    },
    [router, formatHref],
  );

  return {
    ...router,
    push: handlePush,
    replace: handleReplace,
    prefetch: (href: string, options?: Parameters<typeof router.prefetch>[1]) =>
      router.prefetch(formatHref(href), options),
    formatHref,
  };
}

/**
 * Custom hook to get the current pathname without country and locale prefixes
 */
export function useAppPathName() {
  const pathname = useNextPathname();

  const cleanPathname = useMemo(() => {
    if (!pathname) return '/';

    // Split pathname into segments
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    const secondSegment = segments[1];

    // Check if first segment is a country and second is a locale
    const isCountry = (SUPPORTED_COUNTRIES as string[]).includes(firstSegment);
    const isLocale = (LOCALES as string[]).includes(secondSegment);

    if (isCountry && isLocale) {
      // Remove country and locale segments
      const remainingSegments = segments.slice(2);
      return remainingSegments.length > 0
        ? `/${remainingSegments.join('/')}`
        : '/';
    }

    // If it doesn't match the pattern, return as is
    return pathname;
  }, [pathname]);

  return cleanPathname;
}

export interface AppLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: ReactNode;
  className?: string;
  id?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
  title?: string;
  style?: CSSProperties;
}

/**
 * Custom Link component that automatically prefixes href with country and locale
 */
export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, children, onClick, target, ...props }, ref) => {
    const { formatHref } = useAppRouter();
    const finalHref = formatHref(href);

    const handleClick = useCallback(
      (e: MouseEvent<HTMLAnchorElement>) => {
        // Start progress bar immediately for AppLink navigation
        // Only for internal links without target="_blank"
        if (
          !target &&
          finalHref &&
          !finalHref.startsWith('http') &&
          !finalHref.startsWith('mailto:') &&
          !finalHref.startsWith('tel:')
        ) {
          NProgress.start();
        }

        // Call user's onClick handler if provided
        onClick?.(e);
      },
      [finalHref, target, onClick],
    );

    return (
      <Link
        ref={ref}
        href={finalHref}
        onClick={handleClick}
        target={target}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

AppLink.displayName = 'AppLink';
