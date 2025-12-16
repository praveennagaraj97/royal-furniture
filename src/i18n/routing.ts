import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Only prefix non-default locale in the URL
  // This means: / for English, /ar for Arabic
  localePrefix: 'as-needed',

  // The `pathnames` object holds pairs of internal and
  // external pathnames. Based on the locale, the
  // external pathnames are rewritten to the shared,
  // internal representation.
  pathnames: {
    '/': '/',
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
