'use client';

import { LOCALES, SUPPORTED_COUNTRIES } from '@/utils/generated';
import { useLocale } from 'next-intl';
import Link, { LinkProps } from 'next/link';
import { useRouter as useNextRouter, useParams } from 'next/navigation';
import { ReactNode, forwardRef, useCallback } from 'react';

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
        firstSegment
      );
      const isLocale = (LOCALES as string[]).includes(secondSegment);

      if (isCountry && isLocale) {
        return href;
      }

      // Prefix with /[country]/[locale]
      const cleanHref = href === '/' ? '' : href;
      return `/${country}/${locale}${cleanHref}`;
    },
    [country, locale]
  );

  return {
    ...router,
    push: (href: string, options?: Parameters<typeof router.push>[1]) =>
      router.push(formatHref(href), options),
    replace: (href: string, options?: Parameters<typeof router.replace>[1]) =>
      router.replace(formatHref(href), options),
    prefetch: (href: string, options?: Parameters<typeof router.prefetch>[1]) =>
      router.prefetch(formatHref(href), options),
    formatHref,
  };
}

export interface AppLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: ReactNode;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
  title?: string;
  style?: React.CSSProperties;
}

/**
 * Custom Link component that automatically prefixes href with country and locale
 */
export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, children, onClick, ...props }, ref) => {
    const { formatHref } = useAppRouter();
    const finalHref = formatHref(href);

    return (
      <Link ref={ref} href={finalHref} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }
);

AppLink.displayName = 'AppLink';
