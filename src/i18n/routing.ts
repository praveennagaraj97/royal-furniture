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

  // Note: pathnames is only needed if you want different paths per locale
  // (e.g., /en/about vs /ar/من-نحن). If all locales use the same paths,
  // you can omit it and use dynamic routes freely.
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
