'use client';

import { AppLink } from '@/hooks/use-navigation';
import { useSearchParams } from 'next/navigation';
import { FiCheck } from 'react-icons/fi';

const DeliverySlotUpdatedPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const trackHref = orderId ? `/user/orders/${orderId}` : '/user/orders';

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-10">
      <section className="w-full max-w-md flex flex-col items-center text-center gap-6">
        <div className="flex items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#E6F9EC]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#1E8449] bg-white text-[#1E8449]">
              <FiCheck className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-[#1E8449]">
            Delivery Slot Updated
          </h1>
          <p className="text-xs text-gray-600">
            Your preferred delivery slot has been updated successfully.
          </p>
        </div>

        <div className="mt-2 w-full space-y-3">
          <AppLink
            href={trackHref}
            className="inline-flex w-full items-center justify-center rounded-md border border-[#1E8449] px-5 py-2.5 text-xs font-medium text-[#1E8449] bg-white hover:bg-[#F0FFF5] transition-colors duration-200"
          >
            Track my order
          </AppLink>
          <AppLink
            href="/user/orders"
            className="inline-flex w-full items-center justify-center rounded-md bg-[#7D0707] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#5c0505] transition-colors duration-200"
          >
            View my order
          </AppLink>
        </div>
      </section>
    </main>
  );
};

export default DeliverySlotUpdatedPage;
