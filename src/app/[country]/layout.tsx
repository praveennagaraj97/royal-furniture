import { SUPPORTED_COUNTRIES } from '@/utils/generated';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

export function generateStaticParams() {
  return SUPPORTED_COUNTRIES.map((country) => ({ country }));
}

export default async function CountryLayout({
  children,
  params,
}: {
  children: ReactNode;
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

  // Simply pass through to the [locale] layout
  return children;
}
