import AppLayout from '@/components/layout';
import ProgressBar from '@/components/shared/ui/progress-bar';
import { VercelToolbarComponent } from '@/components/vercel-toolbar';
import { AuthProvider } from '@/contexts/auth-context';
import { LayoutProvider } from '@/contexts/layout-context';
import { ToastProvider } from '@/contexts/toast-context';
import { UserProvider } from '@/contexts/user-context';
import { routing } from '@/i18n/routing';
import { ecommerceService } from '@/services/api/ecommerce-service';
import { getCountriesWithLocaleParams } from '@/utils/generated';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { Montserrat } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getCountriesWithLocaleParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/logo.png',
      shortcut: '/logo.png',
      apple: '/logo.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Fetch categories with locale and country
  const categories = await ecommerceService.getCategories(locale, country);

  return (
    <html
      style={{ overflowX: 'hidden' }}
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <body className={`${montserrat.variable} antialiased`}>
        <ProgressBar />
        {process.env.NODE_ENV !== 'development' ? (
          <VercelToolbarComponent />
        ) : null}
        <NextIntlClientProvider messages={messages}>
          <ToastProvider>
            <AuthProvider>
              <UserProvider>
                <LayoutProvider categories={categories}>
                  <AppLayout>{children}</AppLayout>
                </LayoutProvider>
              </UserProvider>
            </AuthProvider>
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
