/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FC } from 'react';

export const CartEmptyState: FC = () => {
  const params = useParams<{ country?: string; locale?: string }>();
  const country = params?.country;
  const locale = params?.locale;
  const homeHref = ['/', country, locale].filter(Boolean).join('/');

  return (
    <div className="section-container flex flex-col items-center justify-center gap-4 py-14 text-center">
      <img
        src="/illustrations/cart-empty.png"
        alt="Empty cart"
        className="h-36 w-auto mx-auto"
        loading="lazy"
      />
      <div className="space-y-2">
        <p className="text-xl font-semibold text-indigo-slate">
          Your cart is empty
        </p>
        <p className="text-sm text-gray-500">
          Browse our collections and add products to see them here.
        </p>
      </div>
      <Link
        href={homeHref || '/'}
        className="inline-flex items-center justify-center rounded-lg bg-deep-maroon px-4 py-2 text-sm font-semibold text-white hover:bg-[#6b0000] transition-colors"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default CartEmptyState;
