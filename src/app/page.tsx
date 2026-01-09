import { routing } from '@/i18n/routing';

import { redirect } from 'next/navigation';

/**
 * Root page that redirects to default country and locale
 * This handles the case when users visit the root URL "/"
 */
export default function RootPage() {
  // Redirect to default country and locale
  const defaultLocale = routing.defaultLocale;
  const defaultCountry = 'ae';

  redirect(`/${defaultCountry}/${defaultLocale}`);
}
