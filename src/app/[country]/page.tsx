import { routing } from '@/i18n/routing';
import { SUPPORTED_COUNTRIES } from '@/utils/generated';
import { notFound, redirect } from 'next/navigation';

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;

  // Validate that the country code is supported
  if (
    !SUPPORTED_COUNTRIES.includes(
      country as (typeof SUPPORTED_COUNTRIES)[number]
    )
  ) {
    notFound();
  }

  // Redirect to default locale for this country
  const defaultLocale = routing.defaultLocale;

  redirect(`/${country}/${defaultLocale}`);
}
