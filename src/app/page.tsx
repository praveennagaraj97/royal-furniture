import { routing } from '@/i18n/routing';
import { DEFAULT_COUNTRY } from '@/utils/generated';
import { redirect } from 'next/navigation';

/**
 * Root page that redirects to default country and locale
 * This handles the case when users visit the root URL "/"
 */
export default function RootPage() {
  // Redirect to default country and locale
  const defaultLocale = routing.defaultLocale;
  const defaultCountry = DEFAULT_COUNTRY;

  redirect(`/${defaultCountry}/${defaultLocale}`);
}
