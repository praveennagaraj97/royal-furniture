import { routing } from '@/i18n/routing';
import { redirect } from 'next/navigation';

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;

  // Redirect to default locale for this country
  const defaultLocale = routing.defaultLocale;

  redirect(`/${country}/${defaultLocale}`);
}
